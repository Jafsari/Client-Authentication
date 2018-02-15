import axios from 'axios'
import browserHistory from 'react-router';
import {AUTH_USER,AUTH_ERROR} from './types'

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