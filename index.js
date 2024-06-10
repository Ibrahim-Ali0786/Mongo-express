const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
main()
.then(()=>{
    console.log("connection is successfull");
})
.catch((error)=>{
    console.log(error);
});
async function main()
{
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
}
app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
});
app.get("/",(req,res)=>{
    res.send("success");
});
app.get('/chats',async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});
app.get('/chat/new',async(req,res)=>{
    res.render('new.ejs');
});
app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let nwchat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    }).save()
    .then((result)=>{
        console.log(result);
        res.redirect("/chats");
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
});
app.post("/edit/:id", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(`${id}`);
    res.render("Edit.ejs",{chat});
});
app.patch("/edit/:id",async (req,res)=>{
    let {id} = req.params;
    let {message} = req.body;
    await Chat.findByIdAndUpdate(`${id}`,{msg:`${message}`});
    res.redirect('/chats');
})
app.delete("/chat/:id/delete", async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(`${id}`);
    res.redirect('/chats');
})