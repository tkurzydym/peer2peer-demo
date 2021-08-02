import { useState } from "react"
import "./App.css"
import { PeerJS } from "./PeerJS"
import { SimplePeer } from "./SimplePeer"

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
        {!isPeerJS && <SimplePeer />}
      </header>
    </div>
  )
}

export default App
