import React, { Component } from 'react'

import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'


export default class UnreleasedPage extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)

        this.logout = this.logout.bind(this)
    }

    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
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
                    <ToolbarButton onClick={this.logout}>
                        <Icon icon='fa-sign-out'></Icon>
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
                <section>
                    <p>This feature is not available yet.</p>
                </section>
            </Page>
        )
    }

}

