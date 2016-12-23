import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'
import LoginForm from '../components/LoginForm'
import PreLoad from '../components/PreLoad'
import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux'
import * as images from '../images'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickLogin = this.handleClickLogin.bind(this)
        this.popPage = this.popPage.bind(this)
        this.state = { username: '', password: '' }
    }
    handleClickLogin(e) {
        e.preventDefault()
        const {authActions} = this.props
        let isError = false
        let errors = []
        if (this.state.username.length < 6) {
            isError = true
            errors = ['Username']
        }
        if (this.state.password.length < 6) {
            isError = true
            errors = [...errors, 'Password']
        }

        if (isError) {
            let errorMessage = ''
            if (errors.length > 1) {
                errorMessage = `${errors.join(' and ')} are required`
            } else {
                errorMessage = `${errors[0]} is required`
            }
            notification.alert(errorMessage, { title: 'Ups!' })
        } else {
            authActions.login(this.state)
        }

    }
    handleChange(e) {

        if (e.target.id == 'username')
            this.setState({ username: e.target.value.trim() })
        else if (e.target.id == 'password')
            this.setState({ password: e.target.value.trim() })
    }

    popPage() {
        const {navigator} = this.props
        navigator.popPage()
    }
    render() {

        const {auth } = this.props
        if (auth.isLoggingIn) {
            return (<PreLoad />)
        } else {


            return (
                <Page>
                    <div className='page-wrapper'>
                        <div className='page-inner'>
                            <a className='goback' onClick={this.popPage}><Icon icon='fa-times' /></a>
                            <img className='sclogo' src={images.logoBlue} alt="" />
                            <LoginForm handleClickLogin={this.handleClickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} />
                        </div>
                    </div>

                </Page>
            )

        }

    }

    const mapStateToProps = (state, ownProps) => ({
        auth: state.auth
    });

    const mapDispatchToProps = (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch)
    });

    export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);


