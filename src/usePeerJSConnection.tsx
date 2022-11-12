import Peer from "peerjs"
import { useState } from "react"

export const usePeerJSConnection = () => {
  const [userOnePeerId, setUserOnePeerId] = useState("")

  const connect = (peer: Peer, idToConnect: string) => {
    peer.on("open", id => {
      console.log("Hi I'm a user with Id: " + id)

      console.log("I will now connect to " + idToConnect)
      peer.connect(idToConnect)
    })
  }

  const call = (peer: Peer, idToCall: string) => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(stream => {
        const call = peer.call(idToCall, stream)

        call.on("stream", remoteStream => {
          playStream(remoteStream)
        })
      })
  }

  const host = (peer: Peer) => {
    peer.on("open", id => {
      console.log("Hi i'm a user with Id: " + id)
      setUserOnePeerId(id)
    })

    peer.on("connection", event => {
      console.log("Hi from User 1 to User 2 who connected to me!")
      console.log(event)
    })

    peer.on("call", call => {
      console.log("receiving call")
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then(stream => {
          console.log("answering call")
          call.answer(stream) // Answer the call with an A/V stream.
          call.on("stream", remoteStream => {
            playStream(remoteStream)
          })
        })
    })
  }

  const playStream = (remoteStream: MediaStream) => {
    console.log(remoteStream)
    const audioEl = document.getElementsByTagName("audio")[0]
    audioEl.srcObject = remoteStream
    audioEl.play()
  }

  const getPeerConnection = (): Peer => {
    var peer = new Peer()
    console.log(peer)
    return peer
  }

  return {
    userOnePeerId,
    connect,
    host,
    getPeerConnection,
    call,
  }
}
