import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page, LazyList, ListItem, ProgressCircular, Icon } from 'react-onsenui'
import moment from 'moment-timezone'
import PostDateRow from './PostDateRow'
import PostItem from './PostItem'
import Waypoint from 'react-waypoint'

let currentDate = '1970-01-01'
let itemHeights = []


export default class Post extends Component {
    constructor(props) {
        super(props)

        this.renderItems = this.renderItems.bind(this)

    }
    renderItems() {

        const {post, socialaccount, auth, postActions} = this.props

        let items = []
        itemHeights = []
        if (socialaccount.activeIndex > -1) {
            const socialaccountTimeZone = socialaccount.data.items[socialaccount.activeIndex].scheduleTime ? socialaccount.data.items[socialaccount.activeIndex].scheduleTime.timezone : auth.user.timezone
            const postItems = post.data.items
            if (postItems) {
                postItems.forEach((postItem, index) => {


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


                    if (renderDateRow) {

                        items.push(
                            <PostDateRow key={dateString} dateRowContent={dateRowContent} />
                        )
                        itemHeights.push(31)
                        items.push(
                            <PostItem key={index} postItem={postItem} />
                        )
                        itemHeights.push(51)
                    } else {
                        items.push(
                            <PostItem key={index} postItem={postItem} />
                        )
                        itemHeights.push(51)

                    }

                })
            }
        }

        return items

    }

    handleScroll(e) {
        console.log(e)
    }
    render() {
        const {renderToolbar, post, loadMorePosts} = this.props



        if (!post.isFetching) {
            let listLength = post.data._meta ? post.data._meta.totalCount : 0
            const items = this.renderItems()
            console.log(window.innerHeight)

            return (
                <Page renderToolbar={renderToolbar}>
                    <section className='post-wrap'>
                        <a href='#' className='post-wrap__switch-post'>Schedule <Icon icon='fa-caret-down' /></a>
                        {items}
                        <div style={{ height: 20, textAlign: 'center' }}>
                            {!post.isFetchingMore && <Waypoint onEnter={loadMorePosts} />}
                            {post.isFetchingMore && <ProgressCircular indeterminate />}
                        </div>

                    </section>
                </Page>
            )
        } else {
            return (
                <Page renderToolbar={renderToolbar}>
                    <section style={{ margin: '16px', textAlign: 'center' }}>
                        <ProgressCircular indeterminate />
                    </section>
                </Page>
            )
        }
    }

}





