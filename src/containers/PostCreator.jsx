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

class PostCreator extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)
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

    render() {
        const {navigator, post, socialaccount} = this.props

        return (
           <Page>
           <section>
                <div className='post-creator'>
                    <div className='post-creator__header'>
                        <h3 className='post-creator__label'>Create Post</h3>
                        <a href="#" className='post-creator__close'><Icon icon='fa-times' /></a>
                    </div>
                    <div className='post-creator__account-list'>
                        <div className='account-list__item'>
                            <img src="https://dev.sociocaster.com/posts/safeimage?url=http://pbs.twimg.com/profile_images/378800000583415956/c34e0b405d00ad786a342e88abb664ca.jpeg" className='account-list__image' alt="" />
                            <Icon className='account-list__icon icon-twitter' icon='fa-twitter' />
                        </div>
                        <div className='account-list__item account-list__add-account'>
                            <Icon className='add-account__icon' icon='fa-plus' />
                        </div>
                    </div>
                    <div className='post-creator__content'>
                        <textarea rows="5" className='post-creator__textarea'>Write any description or URL here</textarea>
                    </div>
                    <div className='post-creator__footer'>
                        <a href="#" className='post-creator__link'><Icon icon='fa-camera' /></a>
                        <a href="#" className='post-creator__link'><Icon icon='fa-link' /></a>
                        <span className='text-right'>
                            <a className='post-creator__link' href="#">Schedule</a>
                            <a className='post-creator__link' href="#">Post Now</a>
                        </span>
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
