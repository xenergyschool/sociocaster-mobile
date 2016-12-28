import {
  AUTH_SUCCESS
} from '../actions/auth'
const defaultState = {
  isChecking: true,
  isLoggedIn: false,
  isRegistering: false,
  isLoggingIn: false,
  isResettingPassword: false,
  isUpdating: false,
  jwt: '',
  user: {}
};

const auth = (state = defaultState, action) => {

  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.data
      }
    default: return state
  }
};

export default auth;