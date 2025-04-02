const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const router = express.Router()

//Sign up
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



module.exports = router