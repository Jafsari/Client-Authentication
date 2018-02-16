import axios from 'axios'
import browserHistory from 'react-router';
import {AUTH_USER,AUTH_ERROR,UNAUTH_USER} from './types'

const API_URL = 'http://localhost:3090'

export function Signin({email,password}){
	return function(dispatch){
    axios.post(`${API_URL}/signin`,{ email, password })
    .then(response => {
      dispatch({type:AUTH_USER}) // Changing the state
      localStorage.setItem('token',response.data.token) // saving the token that was sent back from
      // the api to local storage
    	browserHistory.push('/feature') // Pushing the user to the next page
    })
    .catch(() => {
      dispatch(authError('Wrong Email or password'))
    })
	}
}

export function authError(error){
 return{
  type:AUTH_ERROR,
  payload:error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER

  }
}

export function signupUser({ email,password }){
  return function(dispatch){
    axios.post(`${API_URL}/signin`,{ email, password })
    .then(response => {
      dispatch({type:AUTH_USER}) // Changing the state
      localStorage.setItem('token',response.data.token) // saving the token that was sent back from
      // the api to local storage
      browserHistory.push('/feature') // Pushing the user to the next page
    })
    .catch(() => {
      dispatch(response => dispatch(authError(response.data.error)))
    })
  }
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(API_URL,{
      headers:{ authorization: localStorage.getItem('token')}
    }).then(response => {
      dispatch({
        type:FETCH_MESSAGE,
        payload:response.data.message
      })
    })
    .catch(() => {
      dispatch(response => dispatch(authError(response.data.error)))
    })
  }
}