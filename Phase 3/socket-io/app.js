let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})
funfact=["Cut and Paste was invented in 1981.","First programmers were women","There are currently over 700 computer languages", "The term ‘bug’ came from a moth", "It's all about 1s and 0s" ];
var x = 0;
io.on("connection",(socket)=> {
    socket.emit("client","Welcome, you are connected.");
    socket.on("obj",(msg)=> {
        if(msg.search("hello")!=-1){
            socket.emit("client","Hello I am a chat bot.")
        }
        else if(msg.search("fun fact")!=-1){
            socket.emit("client",funfact[x])
            x= x+1;
        }
        else{
            socket.emit("client","Seems like you have a question I can not answer at the moment.")
        }
    })
})

http.listen(9090,()=>console.log("Server running on port number 9090"));