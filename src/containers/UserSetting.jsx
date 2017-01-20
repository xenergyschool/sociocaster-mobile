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
                        <div className='user-info'>
                            <a className='closeme' href="#" onClick={this.popPage}> <Icon icon='fa-times' /></a>
                            <h3 className='user-info__label'> User Info </h3>
                            <ul className='user-info__list'>
                                 <li key='avatar' className='user-info__list-item'>
                                    <div className='user-info__avatar-wrap'>
                                        <img className='user-info__avatar' src={`${SC_HOST}${auth.user.avatar}`} alt="" />
                                    </div>
                                </li>
                                 <li key='username' className='user-info__list-item'> Username :  {auth.user.username}</li>
                                 <li key='email' className='user-info__list-item'> Email :  {auth.user.email}</li>
                                 <li key='timezone' className='user-info__list-item'> Timezone :  {auth.user.timezone}</li>
                                 <li key='logout' className='user-info__list-item'><a href="#" onClick={this.logout}> Sign Out </a></li>
                            </ul>  
                        </div>
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


