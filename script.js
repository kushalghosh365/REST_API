const express = require("express");
const { console } = require("inspector");
const methodOverride = require("method-override"); 
const app = express();
const path = require("path");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}) );

app.set("view engine","ejs");

app.set("views", path.join(__dirname,"views"));

app.set(express.static(path.join(__dirname,"public")));





let posts = [
    {id:1, name: "kushal Ghosh", age:21, contant:"hello i am Kushal Ghosh"},
    {id:2, name: "Raju Ghosh", age:21, contant:"hello i am Kushal Ghosh"}
];

let id = 2;

app.get("/",(req, res)=>{
    res.send("<h1>Go to the /posts page</h1>");
});


app.get("/posts",(req, res)=>{
    res.render("posts", {posts});
});

app.post("/posts/add",(req, res)=>{

  let {name, age, contant} = req.body;

  id=id+1;
    
    posts.push({id, name, age, contant});
    res.send(`<h1>ADD succesfull</h1> <form action="/posts"> <button type="submit">Go to Home</button></form>`);
})


app.get("/posts/views/:id",(req,res)=>{
    let {id} = req.params;
    let post=posts.find((p)=>id==p.id);
    console.log(post);
    res.render("show",{post});
})



app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post=posts.find((p)=>id==p.id);
    console.log(post);
    res.render("edit",{post});
});


app.patch("/posts/:id", (req, res)=>{ 
    let {id}= req.params; 
    let newContent = req.body.contant; 
    let post = posts.find((p)=>id == p.id); 
    post.contant = newContent; 
    console.log(post); 
    res.send(`<h1>EDIT succesfull</h1> <form action="/posts"> <button type="submit">Go to Home</button></form>`);
});

app.delete("/posts/:id", (req, res)=>{
    let {id}= req.params;
    posts = posts.filter((p) =>id != p.id); 

    res.redirect("/posts")
})


/*app.use((req, res)=>{
    res.status(404).send(`<img src="https://support.heberjahiz.com/hc/article_attachments/21013076295570">`)
})*/



app.listen(3000,()=>{console.log("listing to port: 3000")});
