import {
  combineReducers
} from 'redux';
import auth from './auth';
import welcome from './welcome';

const reducers = combineReducers({
  auth,
  welcome
});

export default reducers;
