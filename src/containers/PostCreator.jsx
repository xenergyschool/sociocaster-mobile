import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import * as postActions from '../actions/post'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import Post from '../components/Post'
import MenuContainer from './MenuContainer'
import SocialAccountSelector from './SocialAccountSelector'

class PostCreator extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)
        this.openSocialAccountSelector = this.openSocialAccountSelector.bind(this)
        this.popPage = this.popPage.bind(this)
        this.logout = this.logout.bind(this)
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
    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
    }
    popPage() {
        const {navigator} = this.props

        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
    }




    componentWillMount() {


        const {postActions, socialaccount} = this.props
        if (socialaccount.activeIndex > -1) {
            console.log('righ here')
            postActions.get()
        }


    }

    loadMorePosts() {
        const {post, postActions} = this.props
        console.log('here')
        if (!post.isFetchingMore && typeof post.data._links.next !== 'undefined') {
            console.log('inside')
            postActions.getMore()
        }
    }
    snapPicture() {
        navigator.camera.getPicture(
            (imageData) => {
                console.log(imageData);
            },
            (message) => {
                console.log(message)
            },
            {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            })

    }

    openSocialAccountSelector(e) {
        const {navigator} = this.props

        navigator.pushPage({ component: SocialAccountSelector, key: 'SOCIAL_ACCOUNT_SELECTOR' })

    }

    render() {
        const {navigator, post, socialaccount} = this.props

        return (

            <Page>
                <section>
                    <div className='post-creator'>
                        <div className='post-creator__header'>
                            <h3 className='post-creator__label'>Create Post</h3>
                            <a href="#" className='post-creator__close' onClick={this.popPage}><Icon icon='fa-times' /></a>
                        </div>
                        <div className='post-creator__account-wrapper'>
                            <div className='post-creator__account-list'>
                                {
                                    <div className='account-list__item icon__twitter'>
                                        <img src="https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/p160x160/13932920_822573197842425_2459145338769991302_n.jpg?oh=2d157a08dfbc98aabbff29c4e7ed707a&oe=58DC42A7" className='account-list__image' alt="" />
                                        <Icon className='account-list__icon' icon='fa-twitter' />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='account-list__add-account' onClick={this.openSocialAccountSelector}>
                            <Icon className='add-account__icon' icon='fa-plus' />
                        </div>
                        <div className='post-creator__content'>

                            <div className='post-creator__textarea' contentEditable></div>

                        </div>
                        <div className='post-creator__footer'>
                            <a href="#" className='post-creator__link'><Icon icon='fa-camera' /></a>
                            <a href="#" className='post-creator__link'><Icon icon='fa-link' /></a>
                            <span className='pull-right'>
                                <a className='post-creator__link' href="#">Schedule</a>
                                <a className='post-creator__link' href="#">Post Now</a>
                            </span>
                            <div className='clearfix'>
                            </div>
                        </div>
                    </div>
                </section>
            </Page>

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

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
