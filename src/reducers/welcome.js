import pic1 from '../images/viral.png'
import pic2 from '../images/social.png'
import pic3 from '../images/dashboard.png'
const defaultState = {
  messages: [
      {
        title: 'DISCOVER AMAZING CONTENT AND STOP THE GUESS WORK',
        description: 'Proudly managed 4,421,664 posts from 38,263 social media accounts worldwide.',
        picture: pic1,
        backgroundColour: '#85C1E9'
      },
      {
        title: 'Sociocaster is the easiest way to FIND, PLAN and POST',
        description: 'content that is proven to increase social media engagement on Facebook, Twitter, LinkedIn, Pinterest and Instagram.',
        picture: pic2,
        backgroundColour: '#73C6B6'
      },
      {
        title: 'Learn How Sociocaster Can Help Your Business',
        description: 'Power of Viral Content,Social Media Traffic,Social Media Engagement',
        picture: pic3,
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
