import pic1 from '../images/social.png'
import pic2 from '../images/viral.png'
import pic3 from '../images/dashboard.png'

const defaultState = {
  messages: [
      {
        title: 'Thanks for downloading!',
        description: 'Sociocaster is the easiest way to build your business by using social media.',
        picture: pic1,
        backgroundColour: '#85C1E9'
      },
      {
        title: 'Easily Manage & Schedule Multiple Social Media Accounts',
        description: 'Managing multiple Facebook, Twitter, LinkedIn, Instagram, Pinterest and VK accounts through one simple and easy interface',
        picture: pic2,
        backgroundColour: '#73C6B6'
      }
    ]
};

const welcome = (state = defaultState, action) => {
  switch (action.type) {
      default: return state;
    }
};

export default welcome;
