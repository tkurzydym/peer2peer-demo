import "./App.css"
import { PeerJS } from "./PeerJS"
import { Connector } from "./Connector"

function App() {
  return (
    <div className="App">
      <header className="App-header">{<Connector />}</header>
    </div>
  )
}

export default App
