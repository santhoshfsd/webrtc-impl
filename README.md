# webrtc-impl

## Client app
- navigate the root folder
- run "static" node command to host client app 

## Server app
- node server.js 

## Added Dependencies
- node-static
- wscat -> WebsocketServer


##  EventEmitter
- handlers
    - on
    - once
    - addListener
    - removeListner

- Events
    - connection
    - close
    - error
    - listening
    - message
    - open

HTTPSServer

## WebSocket
- api to handle the socket connection 

## Browser api
- navigator 
    - getUserMedia
        - MediaStreamConstraints  - audio, video 

- webkitRTCPeerConnection
- RTCSessionDescription
- localDescription
- Interactive Connectivity Establishment 
- https://developer.mozilla.org/en-US/docs/Web/API

- Stun server 
https://medium.com/av-transcode/what-is-webrtc-and-how-to-setup-stun-turn-server-for-webrtc-communication-63314728b9d0


## steps 
- get the user media and add its response stream as a track to the webkitRTCPeerConnection