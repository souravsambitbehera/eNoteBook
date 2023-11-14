import express from "express"

const router = express.Router()

router.get("/notes",(req,res)=>{
    res.send("hello sourav")
})
export default router