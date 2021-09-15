const { response } = require("express");
let express = require("express");
let app = express();
let port = 9090;

let http = require("http").Server(app);

let io = require('socket.io')(http);

let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
let url = "mongodb://localhost:27017/chatlog";

mongoose.
connect(url).
then((res)=>console.log("connected to database")).
catch((err)=>console.log(err));

let db = mongoose.connection;

let messageSchema = mongoose.Schema({
    _id: Number,
    name: String,
    message: String
})
mongoose.pluralize(null);
let messageModel = mongoose.model("Message",messageSchema);

let messages_count = 0;
messageModel.countDocuments({},(err,count)=>{
    if(err){return handleError(err)}
    messages_count = count;

})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})



let temp_name = "";
let temp_message = "";
io.on("connection",(socket)=>{
    console.log("Client connected");
    socket.on("msg_name",(msg_name)=>{
        temp_name = msg_name;
        
    })
    socket.on("msg_detail",(details)=>{
        temp_message = details;

        let temp_message_in = {"_id": uniqueid(),
        "name":temp_name, "message": temp_message}
        let new_msg = new messageModel(temp_message_in);
        messageModel.insertMany([new_msg],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log("success!")
            }
        })
        
        io.emit("server_msg","Message stored in mongodb succesfully!")      
    })
})
function uniqueid(){
    let max_ids = 200;
    let random_id = 0;
    let num_found = 0;
    do{
        random_id = Math.floor(Math.random()*max_ids);
        messageModel.countDocuments({"_id": random_id},(err,count)=>{
            if(err){return handleError(err)}   
            num_found = count;
        })
    }while (num_found > 0);
    return random_id;
}

http.listen(port,()=>console.log("Server running on port number " + port))