
var connection = new WebSocket('ws://localhost:9090');

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
    }
}

connection.onerror = function (error) {
    console.log(error);
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
            },
            function (error) {
                console.log(error);
            });
    }
}

var clientName;
var url_string = window.location.href;
var url = new URL(url_string);
var username = url.searchParams.get("username");
var local_video = document.querySelector("#local-video");

var connectedUser;
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

