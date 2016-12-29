import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'


export default class PostDateRow extends Component {

    render() {
        const {dateRowContent } = this.props
        return (

            <div className='date-row'>
                <h4 className='date-row__label'>{dateRowContent}</h4>
            </div >

        )
    }

}





