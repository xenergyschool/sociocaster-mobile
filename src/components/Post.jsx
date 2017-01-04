import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page, List, ListItem, ListHeader, ProgressCircular, Icon, Dialog, Modal, PullHook } from 'react-onsenui'
import moment from 'moment-timezone'
import PostDateRow from './PostDateRow'
import PostItem from './PostItem'
import Waypoint from 'react-waypoint'
import * as helpers from '../helpers'

let currentDate = '1970-01-01'
let itemHeights = []


export default class Post extends Component {
    constructor(props) {
        super(props)

        this.renderItems = this.renderItems.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.hideDialogPost = this.hideDialogPost.bind(this)
        this.openActions = this.openActions.bind(this)
        this.handleMenuPullChange = this.handleMenuPullChange.bind(this)
        this.handleMenuPullLoad = this.handleMenuPullLoad.bind(this)
        this.getMenuPullContent = this.getMenuPullContent.bind(this)

        this.state = {
            filter: 'scheduled',
            dialogShown: false,
            dialogPostShown: false,
            modalShown: false,
            modalMessage: ''
        }
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

                    const timeString = m.format('HH:mm')

                    console.log(dateString, renderDateRow)


                    if (renderDateRow) {

                        items.push(
                            <PostDateRow key={dateString} dateRowContent={dateRowContent} />
                        )
                        itemHeights.push(31)
                        items.push(
                            <PostItem key={index} currentIndex={index} time={timeString} postItem={postItem} openActions={this.openActions} />
                        )
                        itemHeights.push(51)
                    } else {
                        items.push(
                            <PostItem key={index} currentIndex={index} time={timeString} postItem={postItem} openActions={this.openActions} />
                        )
                        itemHeights.push(51)

                    }

                })
            }
        }

        return items

    }

    openActions(e) {
        const {postActions} = this.props
        postActions.switchIndex(parseInt(e.currentTarget.dataset.index))
        this.hideDialogPost()

    }

    handleScroll(e) {
        console.log(e)
    }
    hideDialog() {
        this.setState({ dialogShown: !this.state.dialogShown })
    }
    hideDialogPost() {
        this.setState({ dialogPostShown: !this.state.dialogPostShown })
    }

    handleMenuPullChange(e) {
        this.setState({ postPullState: e.state })
    }
    handleMenuPullLoad(done) {

        const {postActions} = this.props

        postActions.get('refresh').then(() => {
            this.setState(done)
        })
    }
    getMenuPullContent() {

        switch (this.state.postPullState) {
            case 'action':
                return (
                    <span><Icon spin icon='fa-refresh' /> Reloading...</span>
                )
        }
    }
    render() {
        const {renderToolbar, post, loadMorePosts, changePostFilter, postActions} = this.props



        if (!post.isFetching) {
            let listLength = post.data._meta ? post.data._meta.totalCount : 0
            const items = this.renderItems()

            let dataFilter = ['scheduled', 'published', 'failed', 'queue']
            let postItemActions = ['edit', 'delete']
            return (
                <Page
                    className='post-page'
                    renderToolbar={renderToolbar}
                    renderModal={() => (
                        <Modal
                            isOpen={this.state.modalShown}
                            >
                            <section style={{ margin: '16px' }}>
                                <p style={{ opacity: 0.6 }}>
                                    {this.state.modalMessage}
                                </p>
                            </section>
                        </Modal>
                    )}
                    >
                    <PullHook className='pull-post'
                        onChange={this.handleMenuPullChange}
                        onLoad={this.handleMenuPullLoad}
                        >
                        {this.getMenuPullContent()}
                    </PullHook>
                    <section className='post-wrap'>
                        <a href='#' className='post-wrap__switch-post' onClick={this.hideDialog}> {helpers.capitalizeFirstLetter(post.filter)} <Icon icon='fa-caret-down' /></a>

                        <Dialog
                            isOpen={this.state.dialogShown}
                            isCancelable={true}
                            onCancel={this.hideDialog}>
                            <div className='post-filter'>
                                <List
                                    dataSource={dataFilter}
                                    renderRow={(data, index) => (
                                        <ListItem
                                            key={data}
                                            data-filter={data}
                                            onClick={(e) => {
                                                this.hideDialog()
                                                changePostFilter(e.currentTarget.dataset.filter)
                                            } }
                                            tappable>
                                            {helpers.capitalizeFirstLetter(data)}
                                        </ListItem>
                                    )}
                                    renderHeader={() => (
                                        <h3>Posts Filter</h3>
                                    )}
                                    />

                            </div>
                        </Dialog>
                        <Dialog
                            isOpen={this.state.dialogPostShown}
                            isCancelable={true}
                            onCancel={this.hideDialogPost}>
                            <div style={{ textAlign: 'center', margin: '20px' }}>
                                <List
                                    dataSource={postItemActions}
                                    renderRow={(data, index) => (
                                        <ListItem
                                            key={data}
                                            data-filter={data}
                                            onClick={(e) => {
                                                this.hideDialogPost()
                                                switch (data) {
                                                    case 'delete':
                                                        this.setState({ modalShown: true, modalMessage: 'Deleting...' })
                                                        postActions.remove().then((response) => {
                                                            this.setState({ modalShown: false, modalMessage: '' })
                                                        })
                                                        break
                                                }

                                            } }
                                            tappable>
                                            {helpers.capitalizeFirstLetter(data)}
                                        </ListItem>
                                    )}
                                    renderHeader={() => (
                                        <h3>Actions</h3>
                                    )}
                                    />

                            </div>
                        </Dialog>
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





