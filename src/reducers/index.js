import {
  combineReducers
} from 'redux';
import auth from './auth';
import welcome from './welcome';
import socialaccount from './socialaccount'
const reducers = combineReducers({
  auth,
  welcome,
  socialaccount
});

export default reducers;
