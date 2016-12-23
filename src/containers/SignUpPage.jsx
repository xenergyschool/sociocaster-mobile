import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'
import SignUpForm from '../components/SignUpForm'
import PreLoad from '../components/PreLoad'
import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux'
import * as images from '../images'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickSignUp = this.handleClickSignUp.bind(this)
        this.popPage = this.popPage.bind(this)
        this.state = { username: '', email: '', password: '' }
    }
    handleClickSignUp(e) {
        e.preventDefault()
        const {authActions} = this.props
        let isError = false
        let errors = []
        if (this.state.username.length < 6) {
            isError = true

        }
        if (this.state.password.length < 6) {
            isError = true

        }
        if (this.state.email.length < 6) {
            isError = true
        }

        if (isError) {
            let errorMessage = 'Please fill all required inputs'

            notification.alert(errorMessage, { title: 'Ups!' })
        } else {
            authActions.signup(this.state)
        }

    }
    handleChange(e) {
        console.log(e.target.id)
        switch (e.target.id) {
            case 'username':
                this.setState({ username: e.target.value.trim() })
                break
            case 'password':
                this.setState({ password: e.target.value.trim() })
                break
            case 'email':
                this.setState({ email: e.target.value.trim() })
                break
        }

    }
    popPage() {
        const {navigator} = this.props
        navigator.popPage()
    }
    render() {

        const {auth } = this.props
        if (auth.isRegistering) {
            return (<PreLoad />)
        } else {


            return (<Page>
                <div className='page-wrapper'>
                    <div className='page-inner'>
                        <a className='goback' onClick={this.popPage}><Icon icon='fa-times' /></a>
                        <img className='sclogo' src={images.logoBlue} alt="" />
                        <SignUpForm handleClickSignUp={this.handleClickSignUp} handleChange={this.handleChange} username={this.state.username} email={this.state.email} password={this.state.password} />
                    </div>

                </div>

            </Page>)
        }

    }
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);


