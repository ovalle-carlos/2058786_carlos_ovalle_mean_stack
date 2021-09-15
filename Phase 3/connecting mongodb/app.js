let express = require("express");
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";

let app = express();
mongoose.pluralize(null);
let courseSchema = mongoose.Schema({
    _id:Number,
    name:String,
    desc:String,
    amount:Number
});


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (request,response)=> {
    response.sendFile(__dirname+"\\Index.html");
});

app.get("/AddCourse", (request,response)=> {
    response.sendFile(__dirname+"\\AddCourse.html");
});

app.get("/UpdateCourse", (request,response)=> {
    response.sendFile(__dirname+"\\UpdateCourse.html");
});

app.get("/DeleteCourse", (request,response)=> {
    response.sendFile(__dirname+"\\DeleteCourse.html");
});

app.get("/FetchCourse", (request,response)=> {
    mongoose.connect(url).then(res=>{}).catch(err=>console.log(err));
    let db = mongoose.connection;

    db.once("open", ()=> {
        let courseModel = mongoose.model("Courses", courseSchema);

        courseModel.find({}, (err,doc)=> {
            if (!err) {
                response.write("<h1>Course List</h1>");
                response.write("<a href='/'>Back</a><br><br>");
                response.write("<table border=1><tr><th>ID</th><th>Course Name</th><th>Description</th><th>Cost</th></tr>");
                doc.forEach(rec=> {
                    response.write("<tr><td>"+rec._id+"</td><td>"+rec.name+"</td><td>"+rec.desc+"</td><td>"+rec.amount+"</td></tr>");
                });
                response.write("</table>");
                response.end();
            }
            else {
                console.log(err);
            }
            mongoose.disconnect();
        });
    });
});

app.get("/insert", (request,response)=> {
    let id = request.query.course_id;
    let name = request.query.course_name;
    let desc = request.query.course_description;
    let amount = request.query.course_amount;
    
    mongoose.connect(url).then(res=>{}).catch(err=>console.log(err));
    let db = mongoose.connection;

    db.once("open", ()=> {
        let courseModel = mongoose.model("Courses", courseSchema);
        let course = new courseModel({_id:id, name:name, desc:desc, amount:amount});

        courseModel.insertMany([course], (err,result)=> {
            if (!err) {
                console.log("course added");
            }
            else {
                console.log(err);
            }
            mongoose.disconnect();
        });
    });
    response.redirect("/AddCourse");
    response.end();
});

app.get("/change", (request,response)=> {
    let id = request.query.course_id;
    let amount = request.query.course_amount;

    mongoose.connect(url).then(res=>{}).catch(err=>console.log(err));
    let db = mongoose.connection;

    db.once("open", ()=> {

        let courseModel = mongoose.model("Courses", courseSchema);

        courseModel.updateOne({_id:id},{$set:{amount:amount}}, (err,result)=> {
            if (!err && (result.modifiedCount>0 || result.matchedCount>0)) {
                console.log("Course updated!");
            }
            else {
                console.log(err);
            }
            mongoose.disconnect();
        });

        response.redirect("/UpdateCourse");
        response.end();
    });
});

app.get("/remove", (request,response)=> {
    let id = request.query.course_id;

    mongoose.connect(url).then(res=>{}).catch(err=>console.log(err));
    let db = mongoose.connection;

    db.once("open", ()=> {
        let courseModel = mongoose.model("Courses", courseSchema);

        courseModel.deleteMany({_id:id}, (err,result)=> {
            if (!err && result.deletedCount>0) {
                console.log("Course deleted successfully.");
            }
            else if (!err) {
                console.log("Cannot find course of id " + id);
            }
            else {
                console.log(err);
            }
            mongoose.disconnect();
        });
    })
    response.redirect("/DeleteCourse");
    response.end();
});

app.listen(9090, ()=>console.log("Server running on port 9090"));