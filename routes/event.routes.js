const express = require("express")
const router = express.Router()
const  {verifyToken, verifyAdmin}  = require("../middlewares/auth.middlewares")


// Import model
const Event = require ("../models/Event.model");

// Create event ➜ POST "api/event"
router.post("/", verifyToken, verifyAdmin, async (req,res,next) => {
    console.log("ruta ok")
    console.log(req.body)

   try {

  await Event.create({
  name: req.body.name,
  location: req.body.location,
  category: req.body.category,
  surface: req.body.surface,
  level: req.body.level,
  country: req.body.country,
  city: req.body.city,
  startDate: req.body.startDate,
  endDate: req.body.endDate,
  prizeMoney: req.body.prizeMoney,
  currentChampion: req.body.currentChampion,
  ImageUrl:req.body.ImageUrl,
})

res.status(201).json({ message: 'Event created'})

   } catch (error) {
    next(error)
   } 
})

// List all the events by date ➜ GET "api/event"
router.get("/", async (req,res,next) => {

try {
const allevents = await Event.find()
.sort({ startDate: 1 })
res.json(allevents)

} catch (error) {
   next(error) 
}
})

// List only upcoming events (starting today or later) ➜ GET "api/event/upcoming"
router.get("/upcoming",  async (req,res,next) => {

try {
   
const today = new Date();
console.log(today)
const allevents = await Event.find({
  $or: [
    { startDate: { $gte: today } },
    {
      $and: [
        { startDate: { $lte: today } },
        { endDate: { $gte: today } }
      ]
    }
  ]
})
.sort({ startDate: 1 })
res.json(allevents)


} catch (error) {
   next(error) 
}
})

// Get the details of one event ➜  GET "api/event/:eventId"
router.get("/:eventId",  async (req, res, next) => {

    
console.log(req.params)

try {
   const eventDetails = await Event.findById(req.params.eventId)
   res.json(eventDetails)
} catch (error) {
    console.log(error)
}


})

// Edit the details of one event ➜  PUT "api/event/:eventId"
router.put("/:eventId", verifyToken, verifyAdmin, async (req, res, next) => {
console.log(req.params)
console.log(req.body)

try {
   const eventEdited = await Event.findByIdAndUpdate(req.params.eventId, req.body, {new:true})
res.status(200).json(eventEdited)

} catch (error) {
   console.log(error)
   next(error)
}
})

// Delete one event ➜  DELETE "api/event/:eventId"
router.delete("/:eventId", verifyToken, verifyAdmin, async (req, res, next) => {
   try {
      await Event.findByIdAndDelete(req.params.eventId)
      res.status(202).json({ message: "Event deleted" });
   } catch (error) {
     next(error)
   }
})

module.exports = router