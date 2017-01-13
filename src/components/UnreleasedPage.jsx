import React, { Component } from 'react'

import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'
import * as images from '../images'

export default class UnreleasedPage extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.openUserSetting = this.openUserSetting.bind(this)
        this.logout = this.logout.bind(this)
    }

    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
    }



    openUserSetting() {

        const {navigator} = this.props

        navigator.pushPage({ component: UserSetting, key: 'USER_SETTINGS' })
    }

    renderToolbar() {
        const {title, showMenu} = this.props
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={showMenu}>
                        <Icon icon='ion-navicon, material:md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>{title}</div>
                <div className='right'>
                    <ToolbarButton onClick={this.openUserSetting}>
                        <Icon icon='fa-user'></Icon>
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }






    render() {
        const {navigator, post, socialaccount} = this.props

        return (
            <Page

                renderToolbar={this.renderToolbar}
                >
                <section className='page__unreleased'>
                    <Icon className='unreleased__icon' icon='fa-hourglass-start' />
                    <p className='unreleased__msg'>This feature is not available yet.</p>
                </section>
            </Page>
        )
    }

}

