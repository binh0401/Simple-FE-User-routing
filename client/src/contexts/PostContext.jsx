import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import {apiUrl} from './constant.js'
import {axios} from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading : true
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
      return error.response.data ? error.response.data : {
        success: false, 
        message: `Can't load posts`
      }
    }
  }




  const postContextData = {getPosts, postState}

  return(
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider



