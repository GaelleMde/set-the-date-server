const express = require("express")
const router = express.Router()

// Import model
const User = require ("../models/User.model");

// List of all the favorites tournaments of one user  ➜  GET "api/user/favorite"
router.get("/favorite", async (req,res, next) => {
    console.log("prueba")
    res.status(200).json({ message: "Ça fonctionne !" });
})

module.exports = router