import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon, Toolbar, ToolbarButton, BackButton } from 'react-onsenui'
import { notification } from 'onsenui'
import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import { bindActionCreators } from 'redux'

import TimeZoneList from '../components/TimeZoneList'
import SearchForm from '../components/SearchForm'
import MenuContainer from './MenuContainer'
import PreLoad from '../components/PreLoad'

class SocialAccountTZ extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.filterTimezones = this.filterTimezones.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.popPage = this.popPage.bind(this)
        const timezone = props.socialaccount.data.items[props.socialaccount.activeIndex].scheduleTime.timezone
        this.state = {
            userTimezone: timezone,
            searchKeyword: timezone
        }
    }
    handleClick(e) {

        e.preventDefault()
        const {socialaccountActions, navigator} = this.props

        socialaccountActions.updateScheduleTimes({ timezone: this.state.userTimezone }).then((response) => {
            navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
        })
        // navigator.popPage()
        //navigator.pushPage({ component: MenuContainer, key: 'MENU_CONTAINER_2' })
    }
    handleChange(e) {
        console.log(e.currentTarget.dataset.timezone)
        this.setState({
            userTimezone: e.currentTarget.dataset.timezone,
            searchKeyword: e.currentTarget.dataset.timezone
        })
    }
    handleSearch(e) {
        this.setState({ searchKeyword: e.target.value })
    }

    filterTimezones(item) {

        if (this.state.searchKeyword.length <= 0) {

            return true

        } else {
            if (item.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) > -1) {

                return true
            } else {
                return false
            }

        }

    }

    popPage(e) {
        const {navigator} = this.props

        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
    }
    renderToolbar() {

        return (
            <Toolbar>
                <div className='left'>

                    <ToolbarButton onClick={this.popPage}>
                        <Icon icon='fa-arrow-left'></Icon>
                    </ToolbarButton>
                </div>
                <div className='center'>Set Time Zone</div>
                <div className='right'>
                    <ToolbarButton onClick={this.handleClick}>
                        <Icon icon='fa-check'></Icon>
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }

    render() {

        const {socialaccount, timezone } = this.props
        if (socialaccount.isUpdating) {
            return (
                <PreLoad />
            )
        } else {


            return (
                <Page
                    className='page-timezone'
                    renderToolbar={this.renderToolbar}
                    >
                    <div className='page-wrapper'>
                        <SearchForm
                            handleSearch={this.handleSearch}
                            searchKeyword={this.state.searchKeyword}
                            placeholder='Search a time zone...'
                            />
                        <TimeZoneList
                            handleChange={this.handleChange}
                            timezone={timezone}
                            filterTimezones={this.filterTimezones}
                            />
                    </div>

                </Page>
            )

        }

    }
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    timezone: state.timezone,
    socialaccount: state.socialaccount
})

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    socialaccountActions: bindActionCreators(socialaccountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialAccountTZ);


