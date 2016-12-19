import React, { Component } from 'react'
import { Page, ProgressCircular } from 'react-onsenui'

export default class PreLoad extends Component {
    render() {

        return (
            <Page>
                <div style={{ marginTop: '50%', textAlign: 'center' }}>
                    <ProgressCircular indeterminate />
                </div>
            </Page>
        )
    }
}