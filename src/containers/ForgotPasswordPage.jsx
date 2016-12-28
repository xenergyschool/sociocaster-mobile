import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import PreLoad from '../components/PreLoad'

import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux'
import * as images from '../images'

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickReset = this.handleClickReset.bind(this)
        this.popPage = this.popPage.bind(this)
        this.state = { email: '' }
    }
    handleClickReset(e) {
        e.preventDefault()
        const {authActions, navigator} = this.props
        let isError = false

        if (this.state.email.length < 6) {
            isError = true
        }

        if (isError) {
            let errorMessage = 'Please fill all required inputs'

            notification.alert(errorMessage, { title: 'Ups!' })
        } else {
            authActions.resetPassword(this.state).then((response) => {
                navigator.pushPage({ component: ThankYouPage, key: 'THANK_YOU_PAGE' })
            }).catch((response) => {

            })
        }

    }
    handleChange(e) {
        console.log(e.target.id)
        switch (e.target.id) {
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
        if (auth.isResettingPassword) {
            return (<PreLoad />)
        } else {


            return (
                <Page>
                    <div className='page-wrapper'>
                        <div className='page-inner'>
                            <a className='goback' onClick={this.popPage}><Icon icon='fa-times' /></a>
                            <img className='sclogo' src={images.logoBlue} alt="" />
                            <ForgotPasswordForm handleClickReset={this.handleClickReset} handleChange={this.handleChange} email={this.state.email} />
                        </div>

                    </div>

                </Page>
            )
        }

    }
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);


