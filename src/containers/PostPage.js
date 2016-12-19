import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterContent, SplitterSide, List, ListItem } from 'react-onsenui'

import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux';

class PostPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickLogin = this.handleClickLogin.bind(this)
        this.showMenu = this.showMenu.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.state = { isOpen: false }
    }
    handleClickLogin(e) {

        const {authActions} = this.props

        authActions.login(this.state)
    }
    handleChange(e) {

        if (e.target.id == 'username')
            this.setState({ username: e.target.value })
        else if (e.target.id == 'password')
            this.setState({ password: e.target.value })
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
        );
    }

    hideMenu() {
        this.setState({ isOpen: false })
    }
    showMenu() {
        this.setState({ isOpen: true })
    }

    render() {

        return (
            <Splitter>
                <SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='left'
                    width={200}
                    collapse={true}
                    isSwipeable={true}
                    isOpen={this.state.isOpen}
                    onClose={this.hideMenu}
                    onOpen={this.showMenu}
                    >
                    <Page>
                        <List
                            dataSource={['Profile', 'Followers', 'Settings']}
                            renderRow={(title) => (
                                <ListItem key={title} onClick={this.hide} tappable>{title}</ListItem>
                            )}
                            />
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page renderToolbar={this.renderToolbar}>
                        <section style={{ margin: '16px' }}>
                            <p>
                                Swipe right to open the menu.
                            </p>
                        </section>
                    </Page>
                </SplitterContent>
            </Splitter>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
