import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from 'react-onsenui';
import WelcomeCarousel from '../components/WelcomeCarousel';
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'

class WelcomePage extends Component {
    constructor(props) {
        super(props)
        this.openLoginPage = this.openLoginPage.bind(this)
        this.openSignUpPage = this.openSignUpPage.bind(this)
        this.setIndex = this.setIndex.bind(this)

        this.state = {
            index: 0
        }
    }

    setIndex(e) {
        console.log(e.target.dataset.index)
        this.setState({
            index: typeof e.activeIndex !== 'undefined' ? e.activeIndex : parseInt(e.target.dataset.index)
        })
    }
    openLoginPage(e) {

        const {navigator} = this.props
        navigator.pushPage({ component: LoginPage, key: 'LOGIN_PAGE' })
    }
    openSignUpPage(e) {

        const {navigator} = this.props
        navigator.pushPage({ component: SignUpPage, key: 'SIGNUP_PAGE' })
    }
    render() {
        const {messages, navigator} = this.props
        console.log(this.state)
        console.log(navigator)
        return (<Page>
            <WelcomeCarousel
                messages={messages}
                openLoginPage={this.openLoginPage}
                openSignUpPage={this.openSignUpPage}
                setIndex={this.setIndex}
                activeIndex={this.state.index}
                />
        </Page>);
    }

}

const mapStateToProps = (state, ownProps) => ({
    messages: state.welcome.messages
});

export default connect(mapStateToProps)(WelcomePage);
