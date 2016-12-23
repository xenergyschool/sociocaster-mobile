import 'react-datetime/css/react-datetime.css'

import React, { Component } from 'react'
import { Page } from 'react-onsenui'
import moment from 'moment'
import Datetime from 'react-datetime'

const yesterday = Datetime.moment().subtract(1, 'day')

export default class DateTimePicker extends Component {
    onDateChange(m) {
        console.log(m)
    }
    validateDate(currentDate, selectedDate) {
        return currentDate.isAfter(yesterday)
    }
    render() {
        const minDate = moment()
        return (
            <Page>
                <Datetime
                    input={false}
                    defaultValue={minDate}
                    dateFormat='YYYY-MM-DD'
                    timeFormat='HH:mm:ss'
                    isValidDate={this.validateDate}
                    onChange={this.onDateChange}
                    />
            </Page>
        )
    }
}