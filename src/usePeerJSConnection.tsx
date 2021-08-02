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

  const host = (peer: Peer) => {
    peer.on("open", id => {
      console.log("Hi i'm a user with Id: " + id)
      setUserOnePeerId(id)
    })

    peer.on("connection", event => {
      console.log("Hi from User 1 to User 2 who connected to me!")
      console.log(event)
    })
  }

  const getPeerConnection = (): Peer => {
    var peer = new Peer({ host: "localhost", port: 9000, path: "/peerdemo" })
    console.log(peer)

    return peer
  }

  return {
    userOnePeerId,
    connect,
    host,
    getPeerConnection,
  }
}
