import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import Post from '../components/Post'

class MenuContainer extends Component {
    constructor(props) {
        super(props)

        this.showMenu = this.showMenu.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
        this.handleMenuPullChange = this.handleMenuPullChange.bind(this)
        this.handleMenuPullLoad = this.handleMenuPullLoad.bind(this)
        this.getMenuPullContent = this.getMenuPullContent.bind(this)
        this.state = {
            isMenuOpen: false,
            menuPullState: 'initial'
        }
    }



    hideMenu() {
        this.setState({ isMenuOpen: false })
    }
    showMenu() {
        this.setState({ isMenuOpen: true })
    }
    handleMenuPullChange(e) {
        this.setState({ menuPullState: e.state })
    }
    handleMenuPullLoad(done) {

        const {socialaccountActions} = this.props

        socialaccountActions.get('refresh').then(() => {
            this.setState(done)
        })
    }
    getMenuPullContent() {

        switch (this.state.menuPullState) {
            case 'action':
                return (
                    <span><Icon spin icon='ion-ios-loop-strong' /> Reloading...</span>
                )
        }
    }

    render() {

        return (
            <Menu
                hideMenu={this.hideMenu}
                showMenu={this.showMenu}
                isMenuOpen={this.state.isMenuOpen}
                socialaccount={this.props.socialaccount}
                getMenuPullContent={this.getMenuPullContent}
                handleMenuPullLoad={this.handleMenuPullLoad}
                handleMenuPullChange={this.handleMenuPullChange}
                >
                {this.props.children}
            </Menu>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    socialaccount: state.socialaccount
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    socialaccountActions: bindActionCreators(socialaccountActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
