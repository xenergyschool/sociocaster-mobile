const defaultState = {
  isLoggedIn: false,
  jwt: '',
  user: {}
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    default: return state;
  }
};

export default auth;
