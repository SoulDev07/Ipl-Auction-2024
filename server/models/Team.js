const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Team name required"]
    },
    slot:{
        type:Number,
        required:[true,"Slot required"]
    },
    powercards:[
        {
            name:{
                type:String,
            },
            isUsed:{
                type:Boolean
            }
        }
    ],
    players:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Players"
        }
    ],
    budget:{
        type:Number,
        required:[true,"Invaild Team Budget"]
    },
    score:{
        type:Number,
        required:[true,"Team score required"]
    },
    teamImg:{
        type:String
    }
})

module.exports = mongoose.model("Team",teamSchema)