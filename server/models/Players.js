import { Schema, model } from "mongoose";

const playerSchema = new Schema({
    playerName: {
        type: String,
        required: [true, "Player name required"]
    },
    country: {
        type: String,
        required: [true, "Invaild Country"]
    },
    type: {
        type: String,
        required: [true, "Type required"]
    },
    basePrice: {
        type: Number,
        required: [true, "Price required"]
    },
    overall: {
        type: Number
    },
    batStat: {
        ppl: {
            type: String
        },
        mo: {
            type: String
        },
        dth: {
            type: String
        }
    },
    bowlStat: {
        ppl: {
            type: String
        },
        mo: {
            type: String
        },
        dth: {
            type: String
        }
    },
    playerChemistry: {
        type: Number
    }
    ,
    iccRanking: {
        type: Number
    }
    ,
    color: {
        primary: {
            type: String
        },
        secondary: {
            type: String
        }
    },
    playerImg: {
        type: String
    },
    flagImg: {
        type: String
    },
    isSold: {
        type: Boolean,
        default: false
    }
});

export default model("Players", playerSchema);