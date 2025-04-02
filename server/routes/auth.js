const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const router = express.Router()

//@route GET api/auth
//@desc Check if user is logged in
//@access Public
router.get('/',verifyToken, async(req,res) => {
    try {
      const user = await User.findById(req.user_id).select('-password')

      if(!user){
        return res.status(400).json({
          success: false,
          message: 'You need to log in'
        })
      }
      res.json({
        success: true,
        message: "User is logged in",
        user
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
})


//@route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', async(req, res) => {
  const {username, password} = req.body
  if(!username || !password){
    return res.status(400).json({
      success: false,
      message: 'Missing username or password'
    })
  }

  try {
    //Check existing user
    const user = await User.findOne({username})

    if(user)
      return res.status(400).json({
        success: false,
        message: "Name has been taken"
      })
    
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({
      username, password: hashedPassword
    })
    await newUser.save()

    //Return a access token 
    const accessToken = jwt.sign({user_id: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

    res.json({
      success: true,
      message: "User created successfully",
      accessToken
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
})

//@route POST api/auth/login
//@desc Login
//@access Public
router.post('/login', async(req,res) => {
  const {username, password} = req.body

  if(!username | !password){
    return res.status(400).json({
      success: false,
      message: "Missing username or password"
    })
  }

  try {
    //Check for existing user
    const existingUser = await User.findOne({username})

    if(!existingUser){
      return res.status(400).json({
        success: false,
        message: "User not exist"
      })
    }

    const existingPassword = existingUser.password

    const passwordValid = argon2.verify(existingPassword, password)

    if(!passwordValid){
      return res.status(400).json({
        success: false, 
        message: 'Wrong password'
      })
    }

    const accessToken = jwt.sign({user_id: existingUser._id}, process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).json({
      success: true,
      message: "Log in successfully",
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      accessToken
    })
  }
})


module.exports = router