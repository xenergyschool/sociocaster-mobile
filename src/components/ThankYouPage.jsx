import React, { Component } from 'react'

import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'

import * as images from '../images'

export default class ThankYouPage extends Component {
    constructor(props) {
        super(props)
        this.popPage = this.popPage.bind(this)
    }
    popPage() {
        const {navigator} = this.props
        navigator.popPage()
    }
    render() {


        return (
            <Page>
                <div className='page-wrapper'>
                    <div className='page-inner'>
                        <a className='goback' onClick={this.popPage}><Icon icon='fa-times' /></a>
                        <img className='sclogo' src={images.logoBlue} alt="" />
                        Thank You... bla bla bla
                    </div>
                </div>

            </Page>
        )

    }


}



