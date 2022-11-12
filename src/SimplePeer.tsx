import { useSimplePeerConnection } from "./useSimplePeerConnection"
import ReactJson from "react-json-view"

export const SimplePeerDemo = () => {
  const {
    peer,
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

      <p style={{ width: `80%` }}>Current Peer: {JSON.stringify(peer)}</p>
      {!ownPeerId && (
        <>
          <button onClick={() => initiateSimplePeer(true)}>Initiator</button>
          <button onClick={() => initiateSimplePeer(false)}>Receiver</button>
        </>
      )}
      <p style={{ width: `80%` }}>Current Peer: {JSON.stringify(ownPeerId)}</p>
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
