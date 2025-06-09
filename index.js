const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,"public")));


let posts= [
    {
        id:uuidv4(),
        username: "Subham",
        email: "subham@gmail.com",
        content: "Today match was nail biting",
        date: new Date(),
    },

    {
        id:uuidv4(),
        username: "Rohan",
        email: "rohan@gmail.com",
        content: "Today match was middddd:(",
        date: new Date(),
    },

    {
        id:uuidv4(),
        username: "Skryy",
        email: "avatar@gmail.com",
        content: "Borrrringgggg!!!!!",
        date: new Date(),
    }


];

app.listen(port,() => console.log(`Listening on port ${port}`));

app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts:posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let  post= posts.find((p) => id === p.id);
    res.render("show.ejs",{post});

})

//we need post request not getreqest for privacy
app.post("/posts", (req, res) => {
    let {username, email,content} = req.body;
    let date = new Date();
    let id= uuidv4()
    posts.push({username,email,content,date,id});
    res.redirect("/posts/");  //to connect all
})

//to update content
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent= req.body.content;
    let  post= posts.find((p) => id === p.id);
    post.content=newcontent;
    res.redirect("/posts/");
})
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let  post= posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

//to delete post
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts= posts.filter((p) => id !== p.id);
    res.redirect("/posts/");

})
