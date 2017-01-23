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
import TimeZoneSetting from './TimeZoneSetting'
class UserSetting extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.popPage = this.popPage.bind(this)
        this.openTimezoneSetting = this.openTimezoneSetting.bind(this)
    }

    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
    }
    popPage() {
        const { navigator} = this.props
        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
    }

    openTimezoneSetting() {
        const {navigator} = this.props
        navigator.pushPage({ component: TimeZoneSetting, key: 'USET_TZ_SETTING' })
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
                    className='page-user-setting'
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
                                <li key='username' className='user-info__list-item'>
                                    <span className='user-info__list-label'>Username</span>
                                    <span className='user-info__list-data'>{auth.user.username}</span>
                                </li>
                                <li key='email' className='user-info__list-item'>
                                    <span className='user-info__list-label'>Email</span>
                                    <span className='user-info__list-data'>{auth.user.email}</span>
                                </li>
                                <li key='timezone' className='user-info__list-item' onClick={this.openTimezoneSetting}>
                                    <span className='user-info__list-label'>Timezone</span>
                                    <span className='user-info__list-data'>{auth.user.timezone}</span>
                                </li>
                                <li key='logout' className='user-info__list-item'>
                                    <a className='logmeout' href="#" onClick={this.logout}> Sign Out </a>
                                </li>
                                <li className='user-info__list-item'><span className='user-info__list-data'>&copy; 2017 Sociocaster All rights Reserved</span></li>
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


