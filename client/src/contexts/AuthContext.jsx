import { createContext, useReducer, useEffect } from "react";
import axios from 'axios'
import { authReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant.js";
import setAuthToken from '../utils/setAuthToken.js'


export const AuthContext = createContext()


const AuthContextProvider = ({children}) => {

  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null
  })

  //Authenticate
  const loadUser = async () => {
    console.log('run load user')
    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`)
      if(response.data.success){
        dispatch({
          type: 'SET_AUTH',
          payload: {
            authLoading: false,
            isAuthenticated: true,
            user: response.data.user
          } 
        })
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      dispatch({
        type: 'SET_AUTH',
        payload: {
          authLoading: false,
          isAuthenticated: false,
          user: null
        }
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  //Login
  const loginUser = async userForm => {
    try {
      
      const response = await axios.post(`${apiUrl}/auth/login`, userForm)
      console.log(response)
      if(response.data.success){
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
      }

      await loadUser()
      console.log(authState)

      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      else return {
        success: false,
        message: error.message
      }
    }
  }

  //Register
  const registerUser = async userForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm)
      if(response.data.success){
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken) 
      }
      await loadUser()
      return response.data
    } catch (error) {
      if(error.response.data) return error.response.data
      else return {
        success: false,
        message: error.message
      }
    }
  }

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({
      type: 'SET_AUTH',
      payload: {
        isAuthenticated: false,
        authLoading: false,
        user: null
      }
    })
  }


  const authContextData = {loginUser, registerUser, logoutUser, authState}

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider