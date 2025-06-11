const router = require("express").Router();
const User = require ("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth.middlewares");

//ROUTES

// POST - "api/auth/signup" ➜ Sign up a new user
router.post("/signup", async (req, res, next) => {
  //recibimos la data
  console.log(req.body);
  const { name, email, password } = req.body;

  //los campos existen y tiene valores?
  if (!name || !email || !password) {
    res.status(400).json({errorMessage: "All fields are required (username, email, password)"});
    return;
  }

  //validaciones de la contraseña(RegEx)
let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
if(regexPassword.test(password) === false) {
    res.status(400).json({errorMessage: "Password must be 6-16 characters, include at least one number and one special character (!@#$%^&*)"}) 
    return;  
}

  try {
    // email unico - llamamos a la base de datos para comprobar
    const foundUser = await User.findOne( {email: email})
    console.log(foundUser)
    if (foundUser !== null) {
        res.status(400).json({errorMessage: "User with this email already exists"}) 
    return; 
    }

    //Cifrado de la contraseña
    const encrypedPassword = await bcrypt.hash(password, 12)

    await User.create({
        name,
        email,
        password: encrypedPassword 
    })
    res.sendStatus(201) 


  } catch (error) {
     console.log(error)
  } 
});




// POST - "api/auth/login" ➜ Authenticate user
router.post("/login", async (req, res, next) => {

 console.log(req.body)   
 const {email, password} = req.body

 //Validar que recimos los datos
 if (!email || !password) {
    res.status(400).json({errorMessage: "All fields are required (email, password)"});
    return;
 }

 try {

    // Validar que el usuario existe
    const foundUser = await User.findOne ({email : email})
    console.log(foundUser)
    if (foundUser === null) {
        res.status(400).json({errorMessage: "User not found"});
    return
    }

    // Validar que la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
        res.status(400).json({errorMessage: "Password is not valid"});
    return
    }
     
    // El cliente está autentificado, le entregamos el token
    const payload = {
        _id: foundUser._id,
        email: foundUser.email, 
        role: foundUser.role,
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256", 
        expiresIn: "30d"
    })

    res.status(200).json({authToken})

 } catch (error) {
    console.log(error)
 }
})




// GET - "/api/auth/verify" ➜ Verify Token Validity

router.get("/verify", verifyToken, (req,res) => {
res.json({payload: req.payload})
})




module.exports = router;
