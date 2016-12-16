import React from 'react';
import { connect } from 'react-redux';
import { Tabbar, Tab, Navigator } from 'react-onsenui';

import WelcomePage from './WelcomePage';

class App extends React.Component {

  renderPage(route, navigator) {
    return <route.component key={route.key} navigator={navigator} />
  }
  render() {

    const {isLoggedIn} = this.props.auth

    let initialRoute = { component: WelcomePage, key: 'WELCOME_PAGE' }
    if (isLoggedIn) {
      initialRoute = { component: WelcomePage, key: 'MAIN_PAGE' }
    }
    return (

      <Navigator
        renderPage={this.renderPage}
        initialRoute={initialRoute}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ auth: state.auth })

export default connect(mapStateToProps)(App)
