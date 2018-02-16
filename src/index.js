import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth'
import reduxThunk from 'redux-thunk'
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

// this beautiful code is checking if their is a token in the local storage
// dispatch the AUTH USER action so, if the user ever does leave the application
// They can come back authenticated
if (token){
  store.dispatch({type:AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
  <Route path="/" component={App}>
  <IndexRoute component={Welcome}/>
   <Route path="signin" component={Signin}/>
   <Route path="signout"component={Signout}/>
   <Route path="signup" component={Signup}/>
   <Route path="feature" component={RequireAuth(feature)}/>
  </Route>
  </Router>
  </Provider>
  , document.querySelector('.container'));
