import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator, Tabbar, Tab } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import PostPage from './PostPage'

class MenuContainer extends Component {
    constructor(props) {
        super(props)

        this.showMenu = this.showMenu.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
        this.handleMenuPullChange = this.handleMenuPullChange.bind(this)
        this.handleMenuPullLoad = this.handleMenuPullLoad.bind(this)
        this.getMenuPullContent = this.getMenuPullContent.bind(this)
        this.renderTabs = this.renderTabs.bind(this)
        this.onPreChange = this.onPreChange.bind(this)
        this.switchSocialaccount = this.switchSocialaccount.bind(this)
        this.state = {
            isMenuOpen: false,
            menuPullState: 'initial',
            index: 3
        }
    }
    switchSocialaccount(e) {
        const {socialaccountActions, socialaccount} = this.props
        const nextIndex = parseInt(e.currentTarget.dataset.index)
        if (socialaccount.activeIndex !== nextIndex) {
            socialaccountActions.switchSocialaccount(nextIndex)
            this.setState({ isMenuOpen: false })
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
                    <span><Icon spin icon='fa-refresh' /> Reloading...</span>
                )
        }
    }

    onPreChange(e) {
        if (e.index != this.state.index) {
            this.setState({ index: e.index });
        }
    }
    openPostCreator(e) {
        console.log(e)
    }
    renderTabs() {

        const navigator = this.props.navigator
        const {openPostCreator, showMenu} = this
        return [
            {
                content: <Page key={0} />,
                tab: <Tab icon='fa-newspaper-o' key={0} />,
            },
            {
                content: <Page key={1} />,
                tab: <Tab icon='fa-feed' key={1} />,
            },
            {
                content: <Page key={2} />,
                tab: <Tab icon='fa-plus' onClick={openPostCreator} key={2} />
            },
            {
                content: <PostPage title='Posts' showMenu={showMenu} navigator={navigator} key={3} />,
                tab: <Tab icon='fa-paper-plane' key={3} />,
            },
            {
                content: <Page key={4} />,
                tab: <Tab icon='fa-cloud-download' key={4} />,
            }
        ];
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
                switchSocialaccount={this.switchSocialaccount}
                >
                <Page>
                    <Tabbar
                        index={this.state.index}
                        onPreChange={this.onPreChange}
                        renderTabs={this.renderTabs}
                        position='bottom'
                        />
                </Page>
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
