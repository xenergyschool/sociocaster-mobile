import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator, Tabbar, Tab } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import * as postActions from '../actions/post'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import PostPage from './PostPage'
import UnreleasedPage from '../components/UnreleasedPage'
import PostCreator from './PostCreator'

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
        this.openPostCreator = this.openPostCreator.bind(this)
        this.state = {
            isMenuOpen: false,
            menuPullState: 'initial',
            index: 2
        }
    }
    switchSocialaccount(e) {
        const {socialaccountActions, socialaccount} = this.props
        const nextId = parseInt(e.currentTarget.dataset.id)
        let nextIndex = socialaccount.data.items.findIndex((item) => (item.id == nextId))
        if (socialaccount.data.items[socialaccount.activeIndex].id !== nextId) {
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

        const {navigator, postActions, post} = this.props
        postActions.postDataChanged({
            creatorMode: 'new',
            isSomethingChange: false,
            postData: {
                ...post.postData,
                ...{
                    type: 'text',
                    message: ''
                }
            }
        })
        navigator.pushPage({ component: PostCreator, key: 'POST_CREATOR' })
    }
    renderTabs() {

        const navigator = this.props.navigator
        const {openPostCreator, showMenu} = this
        const {authActions} = this.props
        return [
            {
                content: <UnreleasedPage title='Top Content' authActions={authActions} showMenu={showMenu} navigator={navigator} key={0} />,
                tab: <Tab icon='fa-newspaper-o' key={0} />,
            },
            {
                content: <UnreleasedPage title='Feeds' authActions={authActions} showMenu={showMenu} navigator={navigator} key={1} />,
                tab: <Tab icon='fa-feed' key={1} />,
            },
            {
                content: <PostPage title='Posts' showMenu={showMenu} navigator={navigator} key={2} />,
                tab: <Tab icon='fa-paper-plane' key={2} />,
            },
            {
                content: <UnreleasedPage title='Content Boxes' authActions={authActions} showMenu={showMenu} navigator={navigator} key={3} />,
                tab: <Tab icon='fa-cloud-download' key={3} />,
            }
        ];
    }


    render() {

        const {navigator, socialaccountActions} = this.props
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
                navigator={navigator}
                socialaccountActions={socialaccountActions}
                >
                <Page>
                    <Tabbar
                        className='tab-menu'
                        index={this.state.index}
                        onPreChange={this.onPreChange}
                        renderTabs={this.renderTabs}
                        position='bottom'
                        />
                    <a className='new-post__trigger' href="#" onClick={this.openPostCreator}><Icon icon='fa-plus-circle' /></a>
                </Page>
            </Menu>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    socialaccount: state.socialaccount,
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    socialaccountActions: bindActionCreators(socialaccountActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
