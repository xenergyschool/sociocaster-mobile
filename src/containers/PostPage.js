import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import Post from '../components/Post'
import MenuContainer from './MenuContainer'

class PostPage extends Component {
    constructor(props) {
        super(props)

        this.renderToolbar = this.renderToolbar.bind(this)
        this.renderPage = this.renderPage.bind(this)


    }

    renderPage(route, navigator) {
        return <route.component key={route.key} navigator={navigator} renderToolbar={this.renderToolbar} />
    }
    renderToolbar() {
        const {title } = this.props
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={this.showMenu}>
                        <Icon icon='ion-navicon, material:md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>{title}</div>
            </Toolbar>
        )
    }



    render() {

        return (
            <MenuContainer>
                <Navigator
                    renderPage={this.renderPage}
                    initialRoute={{ component: Post, key: 'POSTS_PAGE' }}
                    />
            </MenuContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
