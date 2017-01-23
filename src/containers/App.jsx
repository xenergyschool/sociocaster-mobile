import React from 'react';
import { connect } from 'react-redux';
import { Tabbar, Tab, Navigator } from 'react-onsenui';
import WelcomePage from './WelcomePage';
import PostPage from './PostPage'
import PreLoad from '../components/PreLoad'
import MenuContainer from './MenuContainer'
import TimeZoneSetting from './TimeZoneSetting'
import NoSocialAccountsPage from '../components/NoSocialAccountsPage'
import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'

import { bindActionCreators } from 'redux'
import PostCreator from './PostCreator'


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
        content: <PostPage title='Posts' key={0} />,
        tab: <Tab icon='ion-home,material:md-home' key={0} />,
      }
    ];
  }

  renderPage(route, navigator) {
    return <route.component key={route.key} navigator={navigator} />
  }

  render() {

    console.log('hello')
    const {isLoggedIn, isChecking, user} = this.props.auth
    const {socialaccount, socialaccountActions, authActions, post} = this.props
    console.log('hello--sini')
    if (isLoggedIn) {
      if (socialaccount.isFetching) {
        return (
          <PreLoad />
        )
      } else {
        /*
         <Tabbar
            index={this.state.index}
            onPreChange={this.onPreChange}
            renderTabs={this.renderTabs}
            position='bottom'
            />
        */
        if (!user.timezone) {
          return <TimeZoneSetting />
        } else {

          if (socialaccount.data.items && socialaccount.data.items.length > 0) {
            //console.log('navigator', socialaccount)

            if (post.intentSharing) {
              return (
                <Navigator
                  renderPage={this.renderPage}
                  initialRoute={{ component: PostCreator, key: 'POST_CREATOR' }}
                  />
              )
            } else {
              return (

                <Navigator
                  renderPage={this.renderPage}
                  initialRoute={{ component: MenuContainer, key: 'MENU_CONTAINER' }}
                  />
              )
            }
          } else {
            // console.log('nosocial', socialaccount)
            return (
              <NoSocialAccountsPage
                reloadSocialaccounts={(e) => { socialaccountActions.get() } }
                logout={(e) => { authActions.logout() } }
                user={user}
                />
            )
          }
        }

      }
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


const mapStateToProps = (state, ownProps) => ({ auth: state.auth, socialaccount: state.socialaccount, post: state.post })

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  socialaccountActions: bindActionCreators(socialaccountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
