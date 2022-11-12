import { SetStateAction, useEffect, useState } from "react"
import Peer, { DataConnection } from "peerjs"

export const Connector = () => {

    const [myPeerId, setMyPeerId] = useState("")
    const [connectToId, setConnectToId] = useState("")
    const [connectionToServer, setConnectionToServer] = useState<Peer>()
    const [peers, setPeers] = useState<Set<DataConnection>>(new Set())
    const [outgoingMessage, setOutgoingMessage] = useState("")

    const connectToServer = () => {
        const peer = new Peer({host: 'minecraft.andreaswillems.dev', port: 9000, secure: true, path: "/myapp", key: "peerjs"})
        console.log(peer)
        setConnectionToServer(peer)

        peer.on('open', id => {
            console.log(`Connection to server established, my id is ${id}`)
            setMyPeerId(id)
        })

        peer.on('connection', connectionToPeer => {
            // console.log(`received connection from peer with id ${connectionToPeer.connectionId}`)           
    
            connectionToPeer.on('open', () => {
                console.log(`opened connection to peer ${connectionToPeer.peer}`)

                connectionToPeer.on('data', data => {
                    const ts = Date.now()
                    console.log(`${ts}: received data from`)
                
                    const payload = data as {timestamp: number, type: string}
                    const timestamp = payload.timestamp
                    const type = payload.type
                    const delta = ts - timestamp
                    console.log(`Delta is ${delta}`)
                })

            })
        })
    }

    const handlePeerInput = (event: any) => {
        setConnectToId(event.target.value)
    }

    const connectToPeer = () => {
        const connection = connectionToServer?.connect(connectToId)
        if (connection) {
            let myPeers = peers
            myPeers.add(connection)
            setPeers(myPeers)
        }
    }

    const handleMessageInput = (e: { target: { value: SetStateAction<string> } }) => {
        setOutgoingMessage(e.target.value)
    }

    const sendMessageToPeers = () => {
        console.log(`sending message ${outgoingMessage}`)
        peers.forEach(peerConn => {
            peerConn.send(outgoingMessage)
        })
        setOutgoingMessage("")
    }

    const startTick = () => {
        console.log('starting interval')
        setInterval(() => {
            peers.forEach(peer => {
                const now = Date.now()
                const event = {
                    timestamp: now,
                    type: "tick"
                }
                console.log(`sending event ${event}`)
                peer.send(event)  
            })
        }, 100)
    }

    return (
        <>
        <h1>Peer ID: {myPeerId}</h1>
        <button onClick={connectToServer}>Open Peer</button>
        
        <div>
            <input type="text" value={connectToId} onChange={handlePeerInput} />
        </div>
        <button onClick={connectToPeer}>Connect to Peer</button>
        <div>
            <input type="text" value={outgoingMessage} onChange={handleMessageInput} />
        </div>
        <button onClick={sendMessageToPeers}>Send message</button>
        <button onClick={startTick}>Start tick</button>
        </>
    )
}