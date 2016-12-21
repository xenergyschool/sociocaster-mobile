import {
  combineReducers
} from 'redux';
import auth from './auth';
import welcome from './welcome';
import socialaccount from './socialaccount'
import post from './post'
const reducers = combineReducers({
  auth,
  welcome,
  socialaccount,
  post
});

export default reducers;
