import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'


export default class PostItem extends Component {

    render() {
        const {postItem} = this.props

        return (

            <div>
                <p > {postItem.message}</p>
            </div>

        )
    }

}





