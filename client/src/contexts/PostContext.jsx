import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {apiUrl} from './constant.js'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading : true
  })
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })


  //Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if(response.data.success){
        dispatch({
          type: 'POST_LOADED_SUCCESS',
          payload: response.data.posts
        })
      }
    } catch (error) {
      dispatch({
        type: 'POST_LOADED_FAIL',
      })
      return error.response.data ? error.response.data : {
        success: false, 
        message: `Can't load posts`
      }
    }
  }

  //Add new post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`,newPost)
      if(response.data.success){
        dispatch({
          type: 'ADD_POST',
          payload: response.data.post
        })
        return response.data
      }
      
    } catch (error) {
      return error.response.data ? error.response.data : {
        success: false,
        message: 'Server internal error'
      }
    }
  }

  //delete post
  const deletePost = async (id)=> {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`)
      if(response.data.success){
        dispatch({
          type: 'DEL_POST',
          payload: id
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  //update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(`${apiUrl}/${updatedPost._id}`, updatedPost)
      if(response.data.success){
        dispatch({
          type: 'UPDATE_POST',
          payload: response.data.post
        })
        return response.data
      }

      
    } catch (error) {
      return error.response.data ? error.response.data : {
        success: false,
        message: 'Server internal error'
      }
    }
  }

  //find post when user clicked
  const findPost = (id) => {
    const post = postState.posts.find(post => post._id === id)
    dispatch({
      type: 'FIND_POST',
      payload: post
    })
  }


  const postContextData = { setShowUpdatePostModal, showUpdatePostModal,findPost,updatePost, getPosts, postState, showAddPostModal, setShowAddPostModal, addPost, showToast, setShowToast, deletePost}

  return(
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider



