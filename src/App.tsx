import { useState } from "react"
import "./App.css"
import { PeerJS } from "./PeerJS"
import { SimplePeerDemo } from "./SimplePeer"

function App() {
  const [isPeerJS, togglePeerFramework] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            togglePeerFramework(!isPeerJS)
          }}
        >
          Toggle Peer Framework!
        </button>

        {isPeerJS && <PeerJS />}
        {!isPeerJS && <SimplePeerDemo />}
      </header>
    </div>
  )
}

export default App
