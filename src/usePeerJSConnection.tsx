import ClickTrack from "click-track"
import Peer, { DataConnection } from "peerjs"
import { useState } from "react"

export const usePeerJSConnection = () => {
  const [myPeer, setMyPeer] = useState<Peer>()
  const [userOnePeerId, setUserOnePeerId] = useState("")
  const [otherPeerId, setOtherPeerId] = useState("")
  const [conn, setConnectionId] = useState<DataConnection>()
  const [metronome, setMetronome] = useState<ClickTrack>()

  // Receiver / Caller:
  const connect = (peer: Peer, idToConnect: string) => {
    peer.on("open", id => {
      console.log("Hi I'm a user with Id: " + id)
      setUserOnePeerId(id)
      console.log("I will now connect to " + idToConnect)

      const conn = peer.connect(idToConnect)
      setConnectionId(conn)
      setOtherPeerId(idToConnect)
    })
  }

  const call = (peer: Peer, idToCall: string) => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: {
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
        },
      })
      .then(stream => {
        const call = peer.call(idToCall, stream, {
          sdpTransform: (sdp: any) => {
            console.log("sdp of caller: ")
            console.log(sdp)
          },
        })

        call.on("stream", remoteStream => {
          playStream(remoteStream)
        })
      })
  }

  // Initiator:
  const host = (peer: Peer) => {
    peer.on("open", id => {
      console.log("Hi i'm a user with Id: " + id)
      setUserOnePeerId(id)
    })

    peer.on("connection", connection => {
      console.log("Hi from User 1 to User 2 who connected to me!")
      console.log(connection)
      setOtherPeerId(connection.peer)

      connection.on("open", () => {
        connection.on("data", data => {
          console.log("Received!", data)
          const track: ClickTrack = JSON.parse(data.track)
          console.log(track)
          const newTrack = new ClickTrack({
            timerSource: undefined,
            cues: [1, 3, 5, 7],
            autostart: false,
          })
          newTrack.on("beat", e => {
            console.log(e.beat)
          })
          executeAtGivenTime(data.startAt, newTrack)
        })
      })
    })

    peer.on("call", call => {
      console.log("receiving call")
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: false,
            latency: 0,
            noiseSuppression: false,
            sampleRate: 48000,
            sampleSize: 16,
          },
        })
        .then(stream => {
          console.log("answering call")
          call.answer(stream, {
            sdpTransform: (sdp: any) => {
              console.log("sdp of answer: ")
              console.log(sdp)
            },
          }) // Answer the call with an A/V stream.
          call.on("stream", remoteStream => {
            playStream(remoteStream)
          })
        })
    })
  }

  // Infra
  const playStream = (remoteStream: MediaStream) => {
    console.log(remoteStream)
    const audioEl = document.getElementsByTagName("audio")[0]
    audioEl.srcObject = remoteStream
    audioEl.play()
  }

  const getPeerConnection = (): Peer => {
    if (myPeer instanceof Peer) {
      return myPeer
    } else {
      var peer = new Peer({
        host: "minecraft.andreaswillems.dev",
        port: 9000,
        path: "/myapp",
        secure: true,
        key: "peerjs",
      })

      setMyPeer(peer)
      return peer
    }
  }

  const startMetronome = () => {
    console.log("reqeuest to start metronome")

    const firstTrack = new ClickTrack({
      timerSource: undefined,
      cues: [1, 3, 5, 7],
      autostart: false,
    })

    firstTrack.on("beat", e => {
      console.log(e.beat)
    })

    setMetronome(firstTrack)

    const tenSecondsInFuture = Date.now() + 10000

    const object = {
      track: JSON.stringify(firstTrack),
      startAt: tenSecondsInFuture,
    }
    console.log(object)
    conn?.send(object)

    executeAtGivenTime(tenSecondsInFuture, firstTrack)
  }

  const startMetronomeNow = () => {
    console.log("start metronome")

    const track = new ClickTrack({
      timerSource: undefined,
      cues: [1, 3, 5, 7],
      autostart: true,
    })

    track.on("beat", e => {
      console.log(e.beat)
    })
  }

  const stopMetronome = () => {
    console.log("reqeuest to stop metronome")
    metronome?.deconstruct()
  }

  function executeAtGivenTime(date: number, track: ClickTrack) {
    var now = Date.now()
    var delay = date - now
    setTimeout(function () {
      track.start()
      console.log("STARTED METRO")
    }, delay)
  }

  return {
    userOnePeerId,
    otherPeerId,
    connect,
    host,
    getPeerConnection,
    call,
    startMetronome,
    stopMetronome,
    startMetronomeNow,
  }
}
