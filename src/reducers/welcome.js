const defaultState = {
  messages: [
      {
        title: 'Welcome 1',
        description: 'Welcome 1 description',
        picture: '',
        backgroundColour: '#85C1E9'
      },
      {
        title: 'Welcome 2',
        description: 'Welcome 2 description',
        picture: '',
        backgroundColour: '#73C6B6'
      },
      {
        title: 'Welcome 3',
        description: 'Welcome 3 description',
        picture: '',
        backgroundColour: '#F1948A'
      }
    ]
};

const welcome = (state = defaultState, action) => {
  switch (action.type) {
      default: return state;
    }
};

export default welcome;
