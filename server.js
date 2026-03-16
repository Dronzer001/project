const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

/* DATABASE CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/backendDemo")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* USER MODEL */

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

/* ROUTES */

app.get("/", (req, res) => {
    res.send("Backend + Database Working 🚀");
});

/* REGISTER */

app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    const user = new User({
        username,
        email,
        password
    });

    await user.save();

    res.json({
        message: "User registered successfully"
    });

});

/* LOGIN */

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if(user){
        res.json({
            message: "Login successful",
            user
        });
    }else{
        res.json({
            message: "Invalid credentials"
        });
    }

});

/* GET USERS */

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
