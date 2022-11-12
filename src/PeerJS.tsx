import { useState } from "react"
import { usePeerJSConnection } from "./usePeerJSConnection"

export const PeerJS = () => {
  const {
    userOnePeerId,
    otherPeerId,
    connect,
    host,
    getPeerConnection,
    call,
    startMetronome,
    stopMetronome,
    startMetronomeNow,
  } = usePeerJSConnection()

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
      <span>Other Connection Id: {otherPeerId}</span>
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

      <button
        onClick={() => {
          call(getPeerConnection(), connectToId)
        }}
      >
        Call!
      </button>

      <button
        onClick={() => {
          startMetronome()
        }}
      >
        Start Metronome!
      </button>

      <button
        onClick={() => {
          stopMetronome()
        }}
      >
        Stop Metronome!
      </button>

      <button
        onClick={() => {
          startMetronomeNow()
        }}
      >
        Immediate Metronome!
      </button>

      <audio controls></audio>
    </>
  )
}