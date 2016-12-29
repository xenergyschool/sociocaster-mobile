import React, { Component } from 'react'

import { Page, Icon } from 'react-onsenui'
import { notification } from 'onsenui'

import * as images from '../images'

export default class NoSocialAccountsPage extends Component {

    render() {

        const {reloadSocialaccounts, logout, user} = this.props
        return (
            <Page className='thank-you'>
                <div className='page-wrapper'>
                    <div className='page-inner'>
                        <a className='goback' onClick={logout}><Icon icon='fa-sign-out' /></a>
                        <img className='sclogo' src={images.logoBlue} alt="" />
                        <h3 className='thank-you__title'>You do not have any connected social accounts yet.</h3>
                        <p className='thank-you__msg'>  You can add your social accounts to Sociocaster on web version.</p>

                        <a
                            className='thank-you__link'
                            href='#'
                            onClick={(e) => {
                                window.open('https://sociocaster.com/posts/connect', '_system', '')
                            }
                            }
                            className='blueBtn'
                            >
                            Connect Social Accounts
                             </a>
                        <a
                            className='thank-you__link'
                            href='#'
                            onClick={reloadSocialaccounts}
                            className='blueBtn'
                            >
                            Reload Social Accounts
                             </a>
                        <a
                            className='thank-you__link'
                            href='#'
                            onClick={logout}
                            className='blueBtn'
                            >
                            {`Sign Out (${user.username})`}
                        </a>

                    </div>
                </div>

            </Page>
        )

    }


}



