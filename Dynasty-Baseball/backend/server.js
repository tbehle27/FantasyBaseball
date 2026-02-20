require("dotenv").config();
const port = process.env.PORT || 3000;
const db = require("../db/queries");

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("hello wrold!"));


app.listen(port, (error) => {
    if(error) {
        throw error;
    }
    console.log(`my first app listening on port ${port} !`);
    const usernames = db.getAllUsernames()
        .then((usernames) => console.log("USERNAMES", usernames))
        .catch(console.error);
});