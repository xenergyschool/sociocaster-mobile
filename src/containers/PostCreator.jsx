import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, Toolbar, ToolbarButton, Icon, Navigator } from 'react-onsenui'

import * as authActions from '../actions/auth'
import * as socialaccountActions from '../actions/socialaccount'
import * as postActions from '../actions/post'
import { bindActionCreators } from 'redux';
import Menu from '../components/Menu'
import Post from '../components/Post'
import MenuContainer from './MenuContainer'
import SocialAccountSelector from './SocialAccountSelector'
import * as helpers from '../helpers'

class PostCreator extends Component {
    constructor(props) {
        super(props)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)
        this.openSocialAccountSelector = this.openSocialAccountSelector.bind(this)
        this.onlySelected = this.onlySelected.bind(this)
        this.popPage = this.popPage.bind(this)
        this.logout = this.logout.bind(this)
        this.hideDialogCamera = this.hideDialogCamera.bind(this)

        this.state = {
            dialogCameraShown: false
        }
    }
    renderToolbar() {
        const {title, showMenu} = this.props
        return (
            <Toolbar>
                <div className='left'>
                    <ToolbarButton onClick={showMenu}>
                        <Icon icon='ion-navicon, material:md-menu' />
                    </ToolbarButton>
                </div>
                <div className='center'>{title}</div>
                <div className='right'>
                    <ToolbarButton onClick={this.logout}>
                        <Icon icon='fa-sign-out'></Icon>
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }
    logout() {

        const {authActions, navigator} = this.props

        authActions.logout(navigator)
    }
    popPage() {
        const {navigator} = this.props

        navigator.resetPage({ component: MenuContainer, key: 'MENU_CONTAINER' })
    }

    hideDialogCamera() {

        this.setState({
            dialogCameraShown: !this.state.dialogCameraShown
        })
    }


    componentWillMount() {


        const {postActions, socialaccount} = this.props
        if (socialaccount.activeIndex > -1) {
            console.log('righ here')
            postActions.get()
        }


    }

    loadMorePosts() {
        const {post, postActions} = this.props
        console.log('here')
        if (!post.isFetchingMore && typeof post.data._links.next !== 'undefined') {
            console.log('inside')
            postActions.getMore()
        }
    }
    snapPicture() {
        navigator.camera.getPicture(
            (imageData) => {
                console.log(imageData);
            },
            (message) => {
                console.log(message)
            },
            {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            })

    }

    openSocialAccountSelector(e) {
        const {navigator} = this.props

        navigator.pushPage({ component: SocialAccountSelector, key: 'SOCIAL_ACCOUNT_SELECTOR' })

    }
    onlySelected(item) {
        const {socialaccount} = this.props
        let index = socialaccount.selectedSocialaccounts.indexOf(item.id)
        if (index > -1) {
            return true
        } else {
            return false
        }

    }
    render() {
        const {navigator, post, socialaccount} = this.props
        const onlySelected = socialaccount.data.items.filter(this.onlySelected)
        const dataDialogCamera = ['camera', 'album']


        return (

            <Page>
                <section>
                    <div className='post-creator'>
                        <div className='post-creator__header'>
                            <h3 className='post-creator__label'>Create Post</h3>
                            <a href="#" className='post-creator__close' onClick={this.popPage}><Icon icon='fa-times' /></a>
                        </div>
                        <div className='post-creator__account-wrapper'>
                            <div className='post-creator__account-list'>
                                {onlySelected.map((data, index) => {
                                    return (

                                        <div key={data.id} className={`account-list__item icon__${data.provider.toLowerCase()}`} onClick={this.openSocialAccountSelector}>
                                            <img src={data.photoUrl} onError={helpers.avatarError} className='account-list__image' alt={data.displayName} />
                                            <Icon className='account-list__icon' icon={`fa-${data.provider.toLowerCase()}`} />
                                        </div>
                                    )
                                })

                                }
                            </div>
                        </div>
                        <div className='account-list__add-account' onClick={this.openSocialAccountSelector}>
                            <Icon className='add-account__icon' icon='fa-plus' />
                        </div>
                        <div className='post-creator__content'>

                            <div className='post-creator__textarea' contentEditable></div>

                        </div>
                        <div className='post-creator__footer'>
                            <a href="#" className='post-creator__link' onClick={this.hideDialogCamera}><Icon icon='fa-camera' /></a>
                            <a href="#" className='post-creator__link'><Icon icon='fa-link' /></a>
                            <span className='pull-right'>
                                <a className='post-creator__link' href="#">Schedule</a>
                                <a className='post-creator__link' href="#">Post Now</a>
                            </span>
                            <div className='clearfix'>
                            </div>
                        </div>
                    </div>
                    <Dialog
                        isOpen={this.state.dialogCameraShown}
                        isCancelable={true}
                        onCancel={this.hideDialogCamera}>
                        <div className='post-filter'>
                            <List
                                dataSource={dataDialogCamera}
                                renderRow={(data, index) => (
                                    <ListItem
                                        key={data}
                                        data-filter={data}
                                        onClick={(e) => {
                                            //this.hideDialogCamera()
                                            //changePostFilter(e.currentTarget.dataset.filter)
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
                </section>
            </Page>

        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    socialaccount: state.socialaccount,
    post: state.post
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    socialaccountActions: bindActionCreators(socialaccountActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
