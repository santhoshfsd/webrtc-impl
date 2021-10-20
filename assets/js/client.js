
var connection = new WebSocket('ws://localhost:9090');

var clientName;
var url_string = window.location.href;
var url = new URL(url_string);
var username = url.searchParams.get("username");
var local_video = document.querySelector("#local-video");
var connectedUser;
var call_button = document.querySelector("#call-btn");
var callToUserName_input = document.querySelector("#username-input");
var myConn;

connection.onopen = function () {
    console.log("Connected to the server");
}

// msg from signaling server
connection.onmessage = function (msg) {
    var data = JSON.parse(msg.data);

    switch (data.type) {
        case "login":
            loginProcess(data.success)
            break;
        case "offer":
            offerProcess(data.offer, data.name)
            break;
    }
}

connection.onerror = function (error) {
    console.log(error);
}

function offerProcess(offer, name) {
    connected_user = name;
    myConn.setRemoteDescription(new RTCSessionDescription(offer))
       alert(name);
    //create answer to an offer or user A.
}

function loginProcess(success) {
    if (success === false) {
        alert("try a different user name")
    } else {
        navigator.getUserMedia(
            { video: true, audio: true },
            function (mystream) {
                stream = mystream;
                local_video.srcObject = stream;

                // peer configuration
            var configuration = {
                "iceServers": [{
                    "url": "stun:stun2.1.google.com:19302"
            }]
            }
            
            myConn = new webkitRTCPeerConnection(configuration);

                // myConn.addTrack(stream)
            },
            function (error) {
                console.log(error);
            });
    }
}


call_button.addEventListener("click", function () {
    callToUser = callToUserName_input.value;
    if (callToUser.length > 0) {
        connectedUser = callToUser;
        myConn.createOffer(function (offer) {
            send({
                type:"offer",
                offer: offer
            })
            myConn.setLocalDescription(offer)
        }, function(error) {
            console.log(error);
        })
    }
})


function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
}

// open connection
setTimeout(() => {
    if (connection.readyState === 1) {
        if (username != null) {
            clientName = username;
            if (clientName.length > 0) {
                send({
                    type: "login",
                    name: clientName
                })
            }
        }

    } else {
        console.log("Connection not publised");
    }
}, 6000);

