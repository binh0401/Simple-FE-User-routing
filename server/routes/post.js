const express = require('express')
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

const router = express.Router()

//@route POST /api/posts
//@desc Create post
//@access Private
router.post('/', verifyToken ,async(req,res) => {
  const {title, description, url, status} = req.body
  const user = req.user_id
  if(!title){
    return res.status(400).json({
      success: false,
      message: 'Missing title'
    })
  }

  try {
    const newPost = new Post({title,
       description,
       url: (url.startsWith('https://')) ? url : `https://${url}`, status: status || 'TO LEARN',
       user})
    
    await newPost.save()

    res.json({
      success: true,
      message:'Happy learning',
      post: newPost
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message:'Internal server error',
    })
  }
})

//@route GET /api/posts
//@desc Read post
//@access Private
router.get('/', verifyToken, async(req,res) => {
  try {
    const posts = await Post.find({
      user: req.user_id
    }).populate('user', ['username'])

    res.json({
      success: true,
      posts
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
})

//@route PUT /api/posts/:id
//@desc Update post
//@access Private
router.put('/:id', verifyToken, async(req,res) => {
  const {title, description, url, status} = req.body

  if(!title){
    return res.status(400).json({
      success: false,
      message: "Missing title"
    })
  }
  
  
  try {
    let updatedPost = {
      title, 
      description: description || '', 
      url: (url.startWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO LEARN'
    }

    const updateCondition = {
      _id: req.params.id,
      user: req.user_id
    }

    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true})

    if(!updatedPost){
      return res.json(401).json({
        success: false,
        message: 'You are not authorized to update'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress',
      post: updatedPost
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})


//@route DEL /api/posts/:id
//@desc Delete post
//@access Private 

router.delete('/:id', verifyToken, async(req,res) => {
  
  try {
    const post_id = req.params.id
    const user_id = req.user_id

    const deleteCondition = {
      _id: post_id,
      user: user_id
    }

    const deletedPost = await Post.findOneAndDelete(deleteCondition)
    console.log(deletedPost)
    if(!deletedPost){
      return res.json(401).json({
        success: false,
        message: "You can not delete this post"
      })
    }

    res.json({
      success: true,
      message: "Successfully deleted post",
      post: deletedPost
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      
    })
  }
  
  
})

module.exports = router