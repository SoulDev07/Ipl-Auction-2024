import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    slot: {
        type: Number,
        required: [true, "Slot required"],
        min: 1,
        max: 4
    }
});

export default model("teamUser", usersSchema);