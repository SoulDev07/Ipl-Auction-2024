const mongoose = require('mongoose');

const users= new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    slot:{
        type:Number,
        required:[true,"Slot required"],
        min:1,
        max:4
    }
})

const teamUser =mongoose.model('teamUser',users);

module.exports = teamUser;