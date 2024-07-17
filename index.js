import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var arr = [];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("index.ejs",{data:arr});
})

app.get("/add_post",(req,res)=>{
    res.render("add_post.ejs");
})

app.post("/post",(req,res)=>{
    if(req.query.number!=undefined){
        const x = req.query.number;
        arr[x] = req.body;
    }
    else{
        arr.push(req.body);
    }
    res.redirect("/");
})

app.post("/del",(req,res)=>{
    const x = req.query.number;
    delete arr[x];
    arr = arr.filter(item => item !== undefined);
    res.redirect("/");
})

app.post("/update",(req,res)=>{
    const x = req.query.number;
    var item = arr[x];
    res.render("update.ejs",{data:item,index:x});
})



app.get("/article",(req,res)=>{
    const x = req.query.number;
    res.render("article.ejs",{data:arr[x]});
})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})



app.listen(port,()=>{
    console.log("Sever running in "+port+".");
})


