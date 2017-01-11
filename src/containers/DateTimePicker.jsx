import 'react-datetime/css/react-datetime.css'

import React, { Component } from 'react'
import { Page, Toolbar, ToolbarButton, Icon } from 'react-onsenui'
import moment from 'moment'
import Datetime from 'react-datetime'
import * as postActions from '../actions/post'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const yesterday = Datetime.moment().subtract(1, 'day')

class DateTimePicker extends Component {

    constructor(props) {
        super(props)
        this.onDateChange = this.onDateChange.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.popPage = this.popPage.bind(this)

    }



    popPage(e) {
        const {navigator} = this.props

        navigator.popPage()
    }
    renderToolbar() {
        const {post} = this.props
        return (
            <Toolbar>
                <div className='left'>

                    <ToolbarButton onClick={this.popPage}>
                        <Icon icon='fa-arrow-left'></Icon>
                    </ToolbarButton>
                </div>
                <div className='center'>Pick a date and a time</div>

            </Toolbar>
        )
    }
    onDateChange(m) {
        console.log(m.format())
        const {postActions, post} = this.props

        postActions.postDataChanged({
            postData: {
                ...post.postData,
                ...{
                    datetime: m.format('YYYY-MM-DD HH:mm:ss')
                }
            }
        })
    }
    validateDate(currentDate, selectedDate) {
        return currentDate.isAfter(yesterday)
    }
    render() {

        const {post} = this.props
        const minDate = moment(post.postData.datetime, 'YYYY-MM-DD HH:mm:ss')
        return (
            <Page
                renderToolbar={this.renderToolbar}
                >

                <div>
                    {minDate.format('MMM Do YYYY, HH:mm:ss')}
                </div>
                <Datetime
                    input={false}
                    defaultValue={minDate}
                    dateFormat='MMM Do YYYY'
                    timeFormat='HH:mm:ss'
                    isValidDate={this.validateDate}
                    onChange={this.onDateChange}
                    />


            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

    timezone: state.timezone,
    post: state.post
})

const mapDispatchToProps = (dispatch) => ({
    postActions: bindActionCreators(postActions, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);