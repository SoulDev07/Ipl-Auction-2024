import { Schema, model } from "mongoose";

const teamSchema = new Schema({
    name: {
        type: String,
        required: [true, "Team name required"]
    },
    slot: {
        type: Number,
        required: [true, "Slot required"]
    },
    powercards: [
        {
            name: {
                type: String,
            },
            isUsed: {
                type: Boolean
            }
        }
    ],
    players: [
        {
            type: Schema.ObjectId,
            ref: "Players"
        }
    ],
    budget: {
        type: Number,
        required: [true, "Invaild Team Budget"]
    },
    score: {
        type: Number,
        required: [true, "Team score required"]
    },
    teamImg: {
        type: String
    }
});

export default model("Team", teamSchema);