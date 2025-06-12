const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/auth.middlewares")

// Import model
const User = require ("../models/User.model");



// Add an event to favorite ➜  PATCH "user/favorite/:eventId/add"
router.patch("/favorite/:eventId/add", verifyToken, async (req,res,next) => {

console.log(req.params) // { eventId: '684aba0504a16a3af8ad1fdf' }
console.log(req.payload) // { _id: '684af5d0328c79d9824a7e4d', email: 'rima@rima.com', role: 'user', iat: 1749746509, exp: 1752338509 }

try {
    const addFavorites =  await User.findByIdAndUpdate (req.payload._id, {$addToSet: {favorites: req.params.eventId}}, {new:true}) 
    .populate("favorites")
    res.status(200).json(addFavorites); 

} catch (error) {
    next(error)
}
    
})
module.exports = router

// Remove a event from favorite ➜  PATCH "user/favorite/:eventId/add"
router.patch("/favorite/:eventId/remove", verifyToken, async (req,res,next) => {

try {
    const removeFavorites =  await User.findByIdAndUpdate (req.payload._id, {$pull: {favorites: req.params.eventId}}, {new:true}) 
    .populate("favorites")
    res.status(200).json(removeFavorites); 

} catch (error) {
    next(error)
}
    
})

// List of all the favorites tournaments of one user  ➜  GET "api/user/favorite"
router.get("/favorite", verifyToken, async (req,res, next) => {
    console.log("prueba")
    
try {
   const Favorite = await User.findById(req.payload._id)
   .populate("favorites")
   res.status(200).json(Favorite);

} catch (error) {
    next(error)
}
    
}) 



module.exports = router