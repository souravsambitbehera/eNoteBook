import express from "express";
import User from "../models/User.js";
const router = express.Router(); //importing express router
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/signup", async (req, res) => {
  //it will render on specific routes
  const { name, email, password } = req.body; //data coming from frontend // and i'm destructure thr req.body
  try {
    if (!name || !email || !password) {
      //error will be shown as json if any one of the field is empty
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!email.includes("@")) {
      //if email does not include @ in email field
      return res.status(400).json({ error: "Please enter a valid Email" });
    }

    const user = await User.findOne({ email }); //find user with unique email
    if (user) {
      return res
        .status(400)
        .json({ error: "user already exit, Enter a new Email" });
    }

    //save data into db

    const salt = await bcrypt.genSalt(10); //generate salt
    const hashPassword = await bcrypt.hash(password, salt); //generate hsah password
    const newUser = await User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    console.log(newUser);
    res.status(201).json({ success: "Signup Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
// router.get("/",(req,res)=>{
//     res.send()
// })
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Enter a valid Email" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(400).json({ error: "User not Found" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    console.log(doMatch);
    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).json({ token });
    } else {
      res.status(404).json({ error: "Email and Password not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Error");
  }
});
export default router;
