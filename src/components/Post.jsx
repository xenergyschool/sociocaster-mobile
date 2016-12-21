import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page, LazyList, ListItem, ProgressCircular } from 'react-onsenui'

import moment from 'moment-timezone'

let currentDate = '1970-01-01'

export default class Post extends Component {
    constructor(props) {
        super(props)

        this.renderRow = this.renderRow.bind(this)

    }
    renderRow(index) {

        const {post, socialaccount, auth, postActions} = this.props
        let content = (
            <ListItem key={index}>
                {'Fetching..'}
            </ListItem>
        )
        if (index <= post.data.items.length - 1) {
            const socialaccountTimeZone = socialaccount.data.items[socialaccount.activeIndex].scheduleTime.timezone
            const postItem = post.data.items[index]
            const m = moment.unix(postItem.utc_datetime_int).tz(socialaccountTimeZone)

            const dateString = m.format('YYYY-MM-DD')

            let renderDateRow = true
            if (moment(dateString).isSame(currentDate)) {
                renderDateRow = false
            }
            currentDate = dateString
            let dateRowContent = m.calendar(null, {
                sameDay: '[Today], MMMM Do, YYYY',
                nextDay: '[Tomorrow], MMMM Do, YYYY',
                nextWeek: '[Next] dddd, MMMM Do, YYYY',
                lastDay: '[Yesterday], MMMM Do, YYYY',
                lastWeek: '[Last] dddd, MMMM Do, YYYY',
                sameElse: 'dddd, MMMM Do, YYYY',
            })

            console.log(dateString, renderDateRow)

            content = (

                <ListItem key={index} >
                    <div>
                        <p> {postItem.message}</p>
                    </div>
                </ListItem>

            )
            if (renderDateRow) {
                content = (
                    <ListItem key={index}>
                        <div>
                            <h4>{dateRowContent}</h4>
                            <p>{postItem.message}</p>
                        </div>
                    </ListItem>

                )
            }
        }

        console.log(index)


        if (post.data._links.next && index >= (post.data.items.length - 1) && !post.data.isFetchingMore) {
            console.log('fetch new')
            //postActions.getMore()
        }

        return content

    }
    render() {
        const {renderToolbar, post} = this.props


        if (!post.isFetching) {
            let listLength = post.data._meta ? post.data._meta.totalCount : 0
            return (
                <Page renderToolbar={renderToolbar}>
                    <section style={{ margin: '16px' }}>
                        <LazyList
                            length={listLength}
                            renderRow={this.renderRow}
                            calculateItemHeight={() => platform.isAndroid() ? 100 : 96}
                            />
                    </section>
                </Page>
            )
        } else {
            return (
                <Page renderToolbar={renderToolbar}>
                    <section style={{ margin: '16px' }}>
                        <ProgressCircular indeterminate />
                    </section>
                </Page>
            )
        }
    }

}





