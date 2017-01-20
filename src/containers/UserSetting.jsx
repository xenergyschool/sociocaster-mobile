import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon, Toolbar, ToolbarButton } from 'react-onsenui'
import { notification } from 'onsenui'
import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux'
import jstz from 'jstz'
import TimeZoneList from '../components/TimeZoneList'
import SearchForm from '../components/SearchForm'
import MenuContainer from './MenuContainer'
import PreLoad from '../components/PreLoad'

class UserSetting extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.popPage = this.popPage.bind(this)
    }

    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
    }
    popPage() {
        const { navigator} = this.props
        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
    }
    renderToolbar() {

        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={this.popPage}>
                        <Icon icon='fa-chevron-left'></Icon>
                    </ToolbarButton>
                </div>
                <div className='center'>User Info</div>
            </Toolbar>
        )
    }

    render() {

        const {auth, timezone } = this.props
        if (auth.isUpdating) {
            return (
                <PreLoad />
            )
        } else {


            return (
                <Page
                    className='page-timezone'
                    >
                    <div className='page-wrapper'>
                        <a href="#" onClick={this.popPage}> <Icon icon='fa-times' /></a>
                        <h3> User Info </h3>
                        <ul>
                            <li key='avatar'><img className='user-avatar' src={auth.user.avatar} alt="" /></li>
                            <li key='username'> Username :  {auth.user.username}</li>
                            <li key='email'> Email :  {auth.user.email}</li>
                            <li key='logout'><a href="#" onClick={this.logout}> Sign Out </a></li>
                        </ul>
                    </div>

                </Page>
            )

        }

    }
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);


