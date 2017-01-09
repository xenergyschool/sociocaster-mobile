import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon, Toolbar, ToolbarButton, BackButton } from 'react-onsenui'
import { notification } from 'onsenui'
import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import { bindActionCreators } from 'redux'

import SocialAccountList from '../components/SocialAccountList'
import SearchForm from '../components/SearchForm'
import MenuContainer from './MenuContainer'
import PreLoad from '../components/PreLoad'

class SocialAccountSelector extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.filterSocialAccounts = this.filterSocialAccounts.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.popPage = this.popPage.bind(this)
        const timezone = props.socialaccount.data.items[props.socialaccount.activeIndex].scheduleTime.timezone
        this.state = {
            searchKeyword: ''
        }
    }

    handleChange(e) {
        const index = e.currentTarget.dataset.index
        const {socialaccountActions} = this.props

        socialaccountActions.selectSocialAccount(index)
    }
    handleSearch(e) {
        this.setState({ searchKeyword: e.target.value })
    }

    filterSocialAccounts(item) {

        if (this.state.searchKeyword.length <= 0) {

            return true

        } else {
            if (item.displayName.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) > -1) {

                return true
            } else {
                return false
            }

        }

    }

    popPage(e) {
        const {navigator} = this.props

        navigator.popPage()
    }
    renderToolbar() {

        return (
            <Toolbar>
                <div className='left'>

                    <ToolbarButton onClick={this.popPage}>
                        <Icon icon='fa-arrow-left'></Icon>
                    </ToolbarButton>
                </div>
                <div className='center'>Choose Social Accounts</div>

            </Toolbar>
        )
    }

    render() {

        const {socialaccount } = this.props


        return (
            <Page
                className='page-timezone'
                renderToolbar={this.renderToolbar}
                >
                <div className='page-wrapper'>
                    <SearchForm
                        handleSearch={this.handleSearch}
                        searchKeyword={this.state.searchKeyword}
                        />
                    <SocialAccountList
                        handleChange={this.handleChange}
                        socialaccount={socialaccount}
                        filterSocialAccounts={this.filterSocialAccounts}
                        />
                </div>

            </Page>
        )



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

export default connect(mapStateToProps, mapDispatchToProps)(SocialAccountSelector);


