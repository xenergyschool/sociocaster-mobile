import React, { Component } from 'react'

import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'

import * as images from '../images'

import LoginPage from '../containers/LoginPage'

export default class ThankYouPage extends Component {
    constructor(props) {
        super(props)
        this.popPage = this.popPage.bind(this)
        this.openLoginPage = this.openLoginPage.bind(this)
    }
    popPage() {
        const {navigator} = this.props
        navigator.popPage()
    }
    openLoginPage() {
        const {navigator} = this.props
        navigator.pushPage({ component: LoginPage, key: 'LOGIN_PAGE' })
    }
    render() {


        return (
            <Page className='thank-you'>
                <div className='page-wrapper'>
                    <div className='page-inner'>
                        <a className='goback' onClick={this.popPage}><Icon icon='fa-times' /></a>
                        <img className='sclogo' src={images.logoBlue} alt="" />
                        <h3 className='thank-you__title'>Thank You for registering with Sociocaster.</h3>
                        <p className='thank-you__msg'>Your Account details have been sent to your e-mail address. Please check your mailbox. If you have not received e-mail within 5 minutes, please check also the ‘Spam’ folder - our message may be classifed as spam by mistake.
                         </p>
                        <a className='thank-you__link' href='#' onClick={this.openLoginPage} className='blueBtn'>Sign in</a>
                    </div>
                </div>

            </Page>
        )

    }


}



