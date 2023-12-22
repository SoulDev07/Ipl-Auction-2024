import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import teamUser from "./models/TeamUsers.js";
import Players from "./models/Players.js";
import Team from "./models/Team.js";
import throwError from "./Error.js";
import ErrorHandler from "./ErrorHandler.js";
import { readFile } from 'fs/promises';

const config = JSON.parse(await readFile("../public/config.json", "utf8"));

const app = express();
const PORT = 9000;
const CONNECTION_URL = config.mongodbUrl;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB Server
mongoose.connect(CONNECTION_URL, { family: 4 })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(() => console.log('No connection'));

// Logging in user
app.post("/login", async (req, res, next) => {
    try {
        const { name, password, slot } = req.body;
        const user = await teamUser.findOne({ name, slot });
        if (user) {
            if (password === user.password) {
                res.send({ messge: "login succesful", user: user });
            } else {
                res.send({ message: "password does not match" });
            }
        } else {
            res.send({ message: "user not registered" });
        }
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Fetching data of all teams
app.get("/team/all", async (req, res, next) => {
    try {
        const { slot } = req.query;
        const teams = await Team.find({ slot }).select("name score");
        res.status(200).json({
            success: true,
            teams
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Fetching all players of specific team
app.get("/team/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const { slot } = req.query;
        const teamDetails = await Team.findOne({ name, slot }).populate("players");
        res.status(200).json({
            success: true,
            teamDetails
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Updating team score
app.put("/score/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const { slot } = req.query;
        await Team.findOneAndUpdate({ name, slot }, { score: req.body.score });
        res.status(200).json({
            success: true,
            message: "Score Updated Successfully"
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Filtering players
app.get("/players", async (req, res, next) => {
    try {
        let players = [];
        const playerName = req.query.playerName ? new RegExp(req.query.playerName, 'i') : null;
        const type = req.query.type ? new RegExp(req.query.type, 'i') : null;

        if (!playerName && !type)
            players = await Players.find();
        else if (playerName && !type)
            players = await Players.find({ playerName: playerName });
        else if (!playerName && type)
            players = await Players.find({ type: type });
        else
            players = await Players.find({ playerName, type });

        res.status(200).json({
            success: true,
            players
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Updating team details --Admin
app.put("/team/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const { playerName, slot, amount } = req.body;
        const team = await Team.findOne({ name, slot });
        if (!team)
            return next(new ErrorHandler(404, "Team not found"));

        const player = await Players.findOne({ playerName }).select("_id");
        if (!player)
            return next(404, "Player not found");
        const p = await Players.findOne({ playerName });
        p.isSold = true;

        const newAmount = team.budget - amount;
        if (newAmount < 0)
            return next(404, `Team ${name} does not have enough budget`);

        team.budget = newAmount;
        team.players.push(player);
        await team.save();

        res.status(200).json({
            success: true,
            message: "Updated Successfully"
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Setting powercards
app.use("/powercard/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const { slot, powerCard, amount } = req.body;
        if (powerCard === null)
            return next(new ErrorHandler(404, "Please select a powercard"));

        const team = await Team.findOne({ name, slot });
        if (!team)
            return next(404, "Team not found");

        team.powercards.push({ name: powerCard, isUsed: false });
        team.budget -= amount;
        await team.save();

        res.status(200).json({
            success: true,
            message: "Powercard added successfully"
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Penalty
app.use("/penalty/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        const { slot, amount } = req.body;
        const team = await Team.findOne({ name, slot });
        if (!team)
            return next(404, "Team not found");

        team.budget -= amount;
        await team.save();

        res.status(200).json({
            success: true,
            message: "Penalty given successfully"
        });
    } catch (error) {
        next(new ErrorHandler());
    }
});

// Middleware for Error
app.use(throwError);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});