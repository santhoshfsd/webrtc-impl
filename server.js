var websocketServer = require('ws').Server;

var wss = new websocketServer({
    port: 9090
})


var users = {
}

wss.on('connection', function (connection) {
    console.log("User connected");
    
    connection.on("message", function(message) {
        var data; 
        try {
            data = JSON.parse(message);
            console.log(data);
        }catch(err) {
            console.log("invalid json");
            data= {};
        }

        switch(data.type) {
            case "login":
                if(users[data.name]) {
                    sendToOtherUser(connection, {
                        type:"login",
                        success: false
                    })
                } else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendToOtherUser(connection, {
                        type:"login",
                        success: true
                    })
                }
                break;
        }
    });

    connection.on("close", function(message) {
        console.log("connection closed");
    });

    connection.send("Hello World");
});

function sendToOtherUser(connection, message) {
    connection.send(JSON.stringify(message));
}