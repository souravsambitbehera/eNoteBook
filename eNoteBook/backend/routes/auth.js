import express from "express"
import User from "../models/User.js"
const router = express.Router() //importing express router

router.post("/signup", async(req,res)=>{ //it will render on specific routes
  const {name,email,password}= req.body //data coming from frontend // and i'm destructure thr req.body 
  try {
    if(!name || !email || !password){
        //error will be shown as json if any one of the field is empty
        return res.status(400).json({error:"All fields are required"})

    }
    if(!email.includes("@")){
        //if email does not include @ in email field
        return res.status(400).json({error:"Please enter a valid Email"})
    }

    const user =await User.findOne({email}) //find user with unique email
    if(user){
        return res.status(400).json({error:"user already exit, Enter a new Email"})
    }

    //save data into db
    const newUser = await User({
        name,
        email,
        password,
    })
    await newUser.save()
    console.log(newUser)
    res.status(201).json({success:"Signup Successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
    
  }


  
})
// router.get("/",(req,res)=>{
//     res.send()
// })
export default router