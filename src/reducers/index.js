import {
  combineReducers
} from 'redux';
import auth from './auth';
import welcome from './welcome';
import socialaccount from './socialaccount'
import post from './post'
import timezone from './timezone'

const reducers = combineReducers({
  auth,
  welcome,
  socialaccount,
  post,
  timezone
});

export default reducers;
