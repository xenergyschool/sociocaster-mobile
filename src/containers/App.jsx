import React from 'react';
import { connect } from 'react-redux';
import { Tabbar, Tab, Navigator } from 'react-onsenui';
import WelcomePage from './WelcomePage';
import PostPage from './PostPage'
import PreLoad from '../components/PreLoad'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.onPreChange = this.onPreChange.bind(this)
    this.state = {
      index: 0
    }
  }
  onPreChange(e) {
    if (e.index != this.state.index) {
      this.setState({ index: e.index });
    }
  }
  renderTabs() {
    return [
      {
        content: <PostPage title='Posts' key={1} />,
        tab: <Tab label='Posts' icon='md-home' key={1} />,
      }
    ];
  }
  renderPage(route, navigator) {
    return <route.component key={route.key} navigator={navigator} />
  }
  render() {

    const {isLoggedIn, isChecking} = this.props.auth


    if (isLoggedIn) {

      return (
        <Tabbar
          index={this.state.index}
          onPreChange={this.onPreChange}
          renderTabs={this.renderTabs}
          />
      )
    } else {

      if (isChecking) {
        return (
          <PreLoad />
        )

      } else {
        let initialRoute = { component: WelcomePage, key: 'WELCOME_PAGE' }
        return (

          <Navigator
            renderPage={this.renderPage}
            initialRoute={initialRoute}
            />
        );
      }

    }
  }
}


const mapStateToProps = (state, ownProps) => ({ auth: state.auth })

export default connect(mapStateToProps)(App)
