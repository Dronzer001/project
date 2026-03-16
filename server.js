const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (index.html)
app.use(express.static(__dirname));

const PORT = 3000;

/* DATABASE CONNECTION */
mongoose.connect(
  "mongodb+srv://ms3619696_db_user:demo1234@cluster0.ryhcvc0.mongodb.net/backendDemo?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

/* USER MODEL */
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

/* ROUTES */

// Optional: default route (serves index.html automatically)
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

/* REGISTER USER */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch(err) {
    console.log(err);
    res.json({ success: false, message: "Error registering user" });
  }
});

/* LOGIN USER */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if(user){
      res.json({ success: true, message: "Login successful", user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch(err) {
    console.log(err);
    res.json({ success: false, message: "Error during login" });
  }
});

/* GET USERS (Optional) */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
