import { useState } from "react"
import SimplePeer from "simple-peer"

export const useSimplePeerConnection = () => {
  const [otherPeerId, setOtherPeerId] = useState("")
  const [ownPeerId, setOwnPeerId] = useState<any>()
  const [peer, setPeer] = useState<any>()

  const initiateSimplePeer = (initiator: boolean) => {
    console.log(navigator.mediaDevices.enumerateDevices())

    const ownPeer = new SimplePeer({
      initiator: initiator,
      trickle: false,
    })

    ownPeer.on("error", err => console.log("error", err))

    ownPeer.on("signal", data => {
      console.log("SIGNAL", JSON.stringify(data))
      setOwnPeerId(data)
    })

    ownPeer.on("connect", () => {
      console.log("CONNECT")
      ownPeer.send("whatever" + Math.random())
    })

    ownPeer.on("data", data => {
      console.log("data: " + data)
    })

    console.log(ownPeer)
    setPeer(ownPeer)
  }

  const connect = () => {
    peer.signal(JSON.parse(otherPeerId))
  }

  const send = () => {
    console.log(peer)
    peer.send("My own Data!")
  }

  return {
    peer,
    ownPeerId,
    otherPeerId,
    setOtherPeerId,
    initiateSimplePeer,
    connect,
    send,
  }
}
