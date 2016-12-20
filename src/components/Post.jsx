import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'


export default class Post extends Component {

    render() {
        const {renderToolbar} = this.props
        return (


            <Page renderToolbar={renderToolbar}>
                <section style={{ margin: '16px' }}>
                    <p>
                        Swipe right to open the menu.
                            </p>
                </section>
            </Page>
        )
    }

}





