import React, { Component } from 'react'
import { connect } from 'react-redux'
import { notification } from 'onsenui'
import { Page, Toolbar, ToolbarButton, Icon, Navigator, Dialog, List, ListItem, ProgressCircular } from 'react-onsenui'
import Textarea from 'react-textarea-autosize'
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
        this.openSocialAccountSelector = this.openSocialAccountSelector.bind(this)
        this.onlySelected = this.onlySelected.bind(this)
        this.popPage = this.popPage.bind(this)
        this.logout = this.logout.bind(this)
        this.hideDialogCamera = this.hideDialogCamera.bind(this)
        this.snapPicture = this.snapPicture.bind(this)
        this.choosePicture = this.choosePicture.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.removePicLink = this.removePicLink.bind(this)
        this.addLink = this.addLink.bind(this)
        this.addPic = this.addPic.bind(this)
        this.changeLinkPreviewText = this.changeLinkPreviewText.bind(this)
        this.state = {
            dialogCameraShown: false,
            isUploading: false,
            picturePreview: '',
            postData: {
                type: 'text',
                message: '',
                picture: '',
                link: ''
            }
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





    snapPicture() {
        const {postActions, post} = this.props
        helpers.snapPicture().then((imageData) => {
            console.log(imageData)
            postActions.postDataChanged({
                isUploading: true,
                picturePreview: imageData,
                postData: {
                    ...post.postData,
                    ...{ type: 'picture' }
                }
            })
            postActions.uploadFile(imageData).then((response) => {
                postActions.postDataChanged({
                    isUploading: false,
                    postData: {
                        ...post.postData,
                        ...{ picture: response.url }
                    }
                })
            })
        }).catch((error) => {

        })

    }
    choosePicture() {
        const {postActions, post} = this.props
        helpers.choosePicture().then((imageData) => {
            console.log(imageData)
            const d = new Date()
            let timestamp = d.getTime()
            postActions.postDataChanged({
                isUploading: true,
                picturePreview: `${imageData}?v=${timestamp}`,
                postData: {
                    ...post.postData,
                    ...{ type: 'picture' }
                }
            })
            postActions.uploadFile(imageData).then((response) => {

                postActions.postDataChanged({
                    isUploading: false,
                    postData: {
                        ...post.postData,
                        ...{ picture: response.url }
                    }
                })
            })
        }).catch((error) => {

        })

    }
    setMessage(e) {

        const {postActions, post} = this.props
        postActions.postDataChanged({
            postData: {
                ...post.postData,
                ...{ message: e.target.value }
            }
        })
    }
    removePicLink(e) {
        const {postActions, post} = this.props
        postActions.postDataChanged({
            postData: {
                ...this.state.postData,
                ...{
                    type: 'text',
                    picture: '',
                    link: '',
                    linkname: '',
                    linkdescription: '',
                    linkcaption: '',
                    linkpicture: ''
                }
            }
        })
    }

    addPic(e) {
        const {postData} = this.props.post

        if (postData.type == 'link' || postData.type == 'customlink') {

            notification.confirm('Are you sure want to replace the link attachment with a media?').then((c) => {
                if (c > 0) {
                    this.hideDialogCamera()
                }
            })
        } else {

            this.hideDialogCamera()
        }
    }

    addLink(e) {
        const {postActions, post} = this.props
        const {postData} = post
        notification.prompt('Add a link attachment', {
            title: '',
            placeholder: 'https://sociocaster.com',
            inputType: 'url',
            defaultValue: ''
        }).then((data) => {
            console.log(data)
            if (data && (data.indexOf('http://') > -1 || data.indexOf('https://') > -1)) {
                let shouldAddLink = false
                if (postData.type == 'picture') {
                    notification.confirm('Are you sure want to replace the media with this link attachment?').then((c) => {
                        if (c > 0) {
                            shouldAddLink = true
                        }
                    })
                } else if (postData.type == 'link' || postData.type == 'customlink') {
                    notification.confirm('Are you sure want to replace your current link attachment with this one?').then((c) => {
                        if (c > 0) {
                            shouldAddLink = true
                        }
                    })
                } else {
                    shouldAddLink = true

                }

                if (shouldAddLink) {
                    postActions.getLinkPreview(data)
                }
            } else {
                notification.alert('Please enter a valid url', { title: 'Ups!' })
            }
        })
    }

    changeLinkPreviewText(e) {
        const {postActions, post} = this.props
        let data = {}
        data[e.target.id] = e.target.value

        postActions.postDataChanged({
            postData: {
                ...post.postData,
                ...data
            }
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
        const {postData} = post
        const onlySelected = socialaccount.data.items.filter(this.onlySelected)
        const dataDialogCamera = ['camera', 'album']


        return (

            <Page>
                <section className='page__post-creator'>
                    <div className='post-creator'>
                        <div className='post-creator__header'>
                            <h3 className='post-creator__label'>Create Post</h3>
                            <a href="#" className='post-creator__close' onClick={this.popPage}><Icon icon='fa-times-circle' /></a>
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

                            <Textarea className='post-creator__textarea' value={postData.message} onChange={this.setMessage} placeholder='What would you like to share?'></Textarea>


                            {postData.type == 'picture' &&
                                <div className='post-creator__image-preview-wrap'>
                                    <img className='post-creator__image-preview' src={post.picturePreview} />
                                    <a href="#" onClick={this.removePicLink} className='remove-pic'>
                                        <Icon className='remove-pic__icon' icon='fa-times-circle' />
                                    </a>

                                    {post.isUploading &&
                                        <div className='loading-wrap'>
                                            <ProgressCircular className='loading-wrap__icon' indeterminate />
                                        </div>
                                    }
                                </div>
                            }
                            {postData.type == 'customlink' &&
                                <div className='post-box post-box__in-creator'>
                                    <a href="#" className='post-box__close' onClick={this.removePicLink}><Icon icon='fa-times' /></a>
                                    <div className='post-box__link'>
                                        <div className='post-box__link-wrap'>
                                            <img className='post-box__link-picture' src={postData.linkpicture} alt='' />
                                            <div className='post-box__hover'>
                                                <a className='post-box__hover-link' href="#"><Icon icon='fa-camera' className='post-box__hover-icon' /></a>
                                            </div>
                                        </div>
                                        <input className='post-box__link-name' id='linkname' onChange={this.changeLinkPreviewText} value={postData.linkname} />
                                        <textarea className='post-box__link-description' id='linkdescription' onChange={this.changeLinkPreviewText} value={postData.linkdescription} ></textarea>
                                        <input className='post-box__link-caption' id='linkcaption' onChange={this.changeLinkPreviewText} value={postData.linkcaption} />
                                    </div>

                                    {post.isUploading &&
                                        <div className='loading-wrap'>
                                            <ProgressCircular className='loading-wrap__icon' indeterminate />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className='post-creator__footer'>
                            <a href="#" className='post-creator__link' onClick={this.addPic}><Icon icon='fa-camera' /></a>
                            <a href="#" className='post-creator__link' onClick={this.addLink}><Icon icon='fa-link' /></a>
                            <a href="#" className='post-creator__link' onClick={this.addLink}><Icon icon='fa-calendar' /></a>
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
                        <List
                            dataSource={dataDialogCamera}
                            renderRow={(data, index) => (
                                <ListItem
                                    key={data}
                                    data-filter={data}
                                    onClick={(e) => {
                                        if (data == 'camera') {
                                            this.snapPicture()
                                        } else {
                                            this.choosePicture()
                                        }
                                        this.hideDialogCamera()
                                        //changePostFilter(e.currentTarget.dataset.filter)
                                    } }
                                    tappable>
                                    <div className='left'>
                                        <Icon icon={data == 'camera' ? 'fa-camera' : 'fa-photo'} />
                                    </div>
                                    <div className='center'>
                                        {helpers.capitalizeFirstLetter(data)}
                                    </div>
                                </ListItem>
                            )}

                            />
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
