import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from 'react-onsenui';
import WelcomeCarousel from '../components/WelcomeCarousel';
import LoginPage from './LoginPage'

class WelcomePage extends Component {
    constructor(props) {
        super(props)
        this.openLoginPage = this.openLoginPage.bind(this)
    }
    openLoginPage(e) {
        console.log('openlogin')
        const {navigator} = this.props
        navigator.pushPage({ component: LoginPage, key: 'LOGIN_PAGE' })
    }
    render() {
        const {messages, navigator} = this.props;
        console.log(navigator)
        return (<Page>
            <WelcomeCarousel messages={messages} openLoginPage={this.openLoginPage} />
        </Page>);
    }

}

const mapStateToProps = (state, ownProps) => ({
    messages: state.welcome.messages
});

export default connect(mapStateToProps)(WelcomePage);
