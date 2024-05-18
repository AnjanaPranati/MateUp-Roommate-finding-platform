var mysql=require("mysql");
const express=require("express");
const app=express();
var path=require("path");
var bosyparser=require("body-parser");
app.use(express.json());
app.use(bosyparser.json());
app.use(bosyparser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"assets")));
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Anju@2004",
    database:"signin"
});

con.connect(function(error){
    if(error) throw error;
    console.log("connected successfully");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/indexSign.html");
})

app.post("/",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var mon=req.body.mobile;
    var gender=req.body.gender;
    var sem=req.body.sem;
    
        var sql="INSERT INTO usersign(user_name,user_mail,user_mon,user_gender,user_sem)VALUES('"+name+"','"+email+"','"+mon+"','"+gender+"','"+sem+"')";
        con.query(sql,function(error,result){
            if(error)throw error;
        });
    });


app.listen(4500);