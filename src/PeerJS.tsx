import { useState } from "react"
import { usePeerJSConnection } from "./usePeerJSConnection"

export const PeerJS = () => {
  const { userOnePeerId, connect, host, getPeerConnection } =
    usePeerJSConnection()

  const [connectToId, setConnectToId] = useState("")

  const handlePeerInput = (event: any) => {
    setConnectToId(event.target.value)
  }

  return (
    <>
      <h1> Hello to my PeerJS Demo! </h1>

      <button
        onClick={() => {
          host(getPeerConnection())
        }}
      >
        Host!
      </button>

      <span>Your Connection Id: {userOnePeerId}</span>

      <hr></hr>

      <div>
        <input
          type="text"
          value={connectToId}
          onChange={handlePeerInput}
        ></input>
      </div>

      <button
        onClick={() => {
          connect(getPeerConnection(), connectToId)
        }}
      >
        Connect!
      </button>
    </>
  )
}
