const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
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

let chats = [
    {
        from:'ali',
        to:'akbar',
        msg:'hello brother',
        created_at: new Date()
    },
    {
        from:'fatema',
        to:'insiya',
        msg:'what are you doing',
        created_at: new Date()
    },
    {
        from:'rohit',
        to:'mukesh',
        msg:'i am promoted',
        created_at: new Date()
    },
    {
        from:'dev',
        to:'hozefa',
        msg:'eid mubarak brother',
        created_at: new Date()
    },
    {
        from:'ibrahim',
        to:'ilyas',
        msg:'mar gaya kya',
        created_at: new Date()
    },
    {
        from:'mohammed',
        to:'irfan',
        msg:'i am good',
        created_at: new Date()
    },
    {
        from:'yakoob',
        to:'suleman',
        msg:'i am a bit tired',
        created_at: new Date()
    }
]
Chat.insertMany(chats);