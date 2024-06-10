const mongoose = require('mongoose');
// this is chat schema
const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        required:true,
    }
});
// this is model of the chat schema.
const Chat = mongoose.model("Chat",chatSchema);
module.exports=Chat;