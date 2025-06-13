const express = require("express")
const router = express.Router()
const  {verifyToken}  = require("../middlewares/auth.middlewares")

//importar modelo 
const Comment = require("../models/Comment.model")

// Create comment ➜ POST "api/comment"
router.post("/",  verifyToken, async (req,res,next) => {

console.log(req.body)

    try {
 await Comment.create ({
    user: req.body.user,
    event: req.body.event, 
    text: req.body.text,
 })

 res.status(201).json({ message: 'Comment created'})
    
 } catch (error) {
    console.log(error)
 }


})

// List all the comments of one event ➜ GET "api/comment"

router.get("/event/:eventId",  verifyToken, async (req,res, next) => {

console.log(req.params.eventId)

try {

   const commentDetails = await Comment
.find({ event: req.params.eventId })
.populate("event")
.populate("user")
res.json(commentDetails) 

} catch (error) {
    console.log(error)
}

    



})


module.exports = router