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

class PostPage extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)
        this.logout = this.logout.bind(this)
        this.changePostFilter = this.changePostFilter.bind(this)
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
         
            postActions.get()
        }


    }

    loadMorePosts() {
        const {post, postActions} = this.props
    
        if (!post.isFetchingMore && typeof post.data._links.next !== 'undefined') {
  
            postActions.getMore()
        }
    }
    changePostFilter(filter) {
        const {post, postActions, socialaccount} = this.props
        if (socialaccount.activeIndex > -1) {
            postActions.switchFilter(filter)
            postActions.get()
        }
    }

    render() {
        const {navigator, post, socialaccount,postActions} = this.props

        return (
            <Post
                navigator={navigator}
                post={post}
                socialaccount={socialaccount}
                renderToolbar={this.renderToolbar}
                loadMorePosts={this.loadMorePosts}
                changePostFilter={this.changePostFilter}
                postActions={postActions}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
