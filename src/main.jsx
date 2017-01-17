import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';


// Onsen UI Styling and Icons
// require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');
require('./stylus/index.styl');

import App from './containers/App';
import * as authActions from './actions/auth';
import * as postActions from './actions/post';


const logger = createLogger();

const store = createStore(reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
);


store.dispatch(authActions.init())


const rootElement = document.getElementById('app');
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}

document.addEventListener("deviceready", function () {
  StatusBar.backgroundColorByHexString("#216694")

  window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT, function (url) {
    // url is the value of EXTRA_TEXT 

    let state = store.getState()
    if (url.includes('https://') || url.includes('http://')) {

      store.dispatch(postActions.postDataChanged(
        {
          intentSharing: true,
          postData: {
            ...state.post.postData,
            ...{
              type: 'link',
              link: url
            }
          }
        }
      ))

    } else {

      store.dispatch(postActions.postDataChanged(
        {
          intentSharing: true,
          postData: {
            ...state.post.postData,
            ...{
              type: 'text',
              message: url
            }
          }
        }
      ))

    }
  }, function () {
    // There was no extra supplied.

  });

  window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_STREAM, function (url) {

    window.FilePath.resolveNativePath(url, (realUri) => {
      // url is the value of EXTRA_STREAM
      let state = store.getState()
      store.dispatch(postActions.postDataChanged({
        intentSharing: true,
        picturePreview: realUri,
        postData: {
          ...state.post.postData,
          ...{ type: 'picture' }
        }
      }))
    },
      (error) => {

      })

  }, function () {
    // There was no extra supplied.

  });
}, false)
