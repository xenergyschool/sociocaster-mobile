import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Icon, Toolbar, ToolbarButton } from 'react-onsenui'
import { notification } from 'onsenui'
import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux'
import jstz from 'jstz'
import TimeZoneList from '../components/TimeZoneList'
import SearchTimeZoneForm from '../components/SearchTimeZoneForm'
import MenuContainer from './MenuContainer'
import PreLoad from '../components/PreLoad'

class TimeZoneSetting extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.filterTimezones = this.filterTimezones.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        const timezone = jstz.determine()

        this.state = {
            userTimezone: timezone.name(),
            searchKeyword: timezone.name()
        }
    }
    handleClick(e) {

        e.preventDefault()
        const {authActions, navigator} = this.props
        /*
             authActions.update({ timezone: this.state.userTimezone }).then((response) => {
     
                 navigator.popPage()
             })
             */
        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER_2' })
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
    renderToolbar() {

        return (
            <Toolbar>

                <div className='center'>Set Your Timezone</div>
                <div className='right'>
                    <ToolbarButton onClick={this.handleClick}>
                        <Icon icon='fa-check'></Icon>
                    </ToolbarButton>
                </div>
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
                    renderToolbar={this.renderToolbar}
                    >
                    <div className='page-wrapper'>

                        <SearchTimeZoneForm userTimezone={this.state.userTimezone} handleSearch={this.handleSearch} searchKeyword={this.state.searchKeyword} />
                        <TimeZoneList handleChange={this.handleChange} timezone={timezone} filterTimezones={this.filterTimezones} />
                    </div>

                </Page>
            )

        }

    }
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    timezone: state.timezone
})

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneSetting);


