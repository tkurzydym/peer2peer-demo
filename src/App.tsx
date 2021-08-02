import "./App.css"
import { usePeerJSConnection } from "./usePeerJSConnection"

function App() {
  const {
    userOnePeerId,
    connectToPeerId,
    connect,
    host,
    getPeerConnection,
    setConnectToPeerId,
  } = usePeerJSConnection()

  const handlePeerInput = (event: any) => {
    setConnectToPeerId(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
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
            value={connectToPeerId}
            onChange={handlePeerInput}
          ></input>
        </div>

        <button
          onClick={() => {
            connect(getPeerConnection())
          }}
        >
          Connect!
        </button>
      </header>
    </div>
  )
}

export default App
