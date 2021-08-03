import { useState } from "react"
import SimplePeer from "simple-peer"
import { useSimplePeerConnection } from "./useSimplePeerConnection"

export const SimplePeerDemo = () => {
  const {
    initiateSimplePeer,
    ownPeerId,
    otherPeerId,
    setOtherPeerId,
    connect,
    send,
  } = useSimplePeerConnection()

  return (
    <>
      <h1>Hello to my Simple Peer Demo!</h1>

      <button onClick={() => initiateSimplePeer(true)}>Initiator</button>

      <button onClick={() => initiateSimplePeer(false)}>Receiver</button>

      <p style={{ width: `80%` }}>Your PeerId: {JSON.stringify(ownPeerId)}</p>

      <input
        type="text"
        value={otherPeerId}
        onChange={event => setOtherPeerId(event.target.value)}
      ></input>

      <button onClick={connect}>connect!</button>
      <button onClick={send}>Send!</button>
    </>
  )
}
