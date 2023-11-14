import express from "express"
import User from "../models/User.js"
const router = express.Router() //importing express router

router.post("/",(req,res)=>{ //it will render on specific routes
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send(req.body)
  
})
// router.get("/",(req,res)=>{
//     res.send()
// })
export default router