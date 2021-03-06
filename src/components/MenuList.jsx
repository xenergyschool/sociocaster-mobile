
import React, { Component } from 'react'
import { List, ListItem, ListHeader, Icon } from 'react-onsenui'
import * as helpers from '../helpers'
import SocialAccountTZ from '../containers/SocialAccountTZ'
export default class MenuList extends Component {
    constructor(props) {
        super(props)
        this.changeMode = this.changeMode.bind(this)
        this.renderSocialAccounts = this.renderSocialAccounts.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.filterSocialaccounts = this.filterSocialaccounts.bind(this)
        this.changeKeyword = this.changeKeyword.bind(this)
        this.openSocialAccountSetting = this.openSocialAccountSetting.bind(this)
        this.state = {
            mode: 'socialaccount',
            searchKeyword: '',
            imageError: false
        }
    }
    filterSocialaccounts(item) {

        if (this.state.searchKeyword.length <= 0) {

            return true

        } else {
            if (item.displayName.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) > -1) {

                return true
            } else {
                return false
            }

        }

    }
    changeKeyword(e) {
        this.setState({ searchKeyword: e.target.value })
    }
    changeMode(e) {
        this.setState({ mode: this.state.mode == 'socialaccount' ? 'setting' : 'socialaccount' })
    }



    renderSocialAccounts(data, index) {
        const {switchSocialaccount} = this.props
        return (
            <ListItem className='left-menu__list-item' key={data.id} data-id={data.id} onClick={switchSocialaccount} tappable>
                <div className='left'>
                    <img src={data.photoUrl} onError={helpers.avatarError} className='list__item__thumbnail' />
                </div>
                <div className='center'>
                    <span className='user__displayname'>{data.displayName}</span>
                    <span className='user__provider'>{`${data.provider} ${data.type}`}</span>
                </div>
            </ListItem>
        )
    }

    openSocialAccountSetting(e) {
        const {navigator, socialaccountActions, setModal} = this.props
        let pushPage
        switch (e.currentTarget.dataset.menu) {
            case 'Schedule Times':
                break
            case 'Time Zone':
                pushPage = { component: SocialAccountTZ, key: 'SOCIAL_ACCOUNT_TZ' }
                navigator.pushPage(pushPage)
                break
            case 'Refresh Profile Info':
                break
            case 'Delete':
                setModal({ modalShown: true, modalMessage: 'Deleting Socialaccount...' })
                socialaccountActions.remove().then((response) => {
                    console.log(response)
                    this.setState({ mode: 'socialaccount' })
                    setModal({ modalShown: false, modalMessage: '' })
                }).catch((error) => {

                    setModal({ modalShown: false, modalMessage: '' })
                })
                break
        }

    }

    renderSettings(data, index) {
        return (
            <ListItem className='left-menu__list-item' key={index} data-index={index} data-menu={data} onClick={this.openSocialAccountSetting} tappable>
                {data}
            </ListItem>
        )
    }
    render() {
        const {socialaccount, switchSocialaccount, activeSocialaccount} = this.props
        if (socialaccount.data.items && socialaccount.data.items.length > 0) {
            const settings = ['Time Zone', 'Delete']
            let dataSource = this.state.mode == 'socialaccount' ? socialaccount.data.items.filter(this.filterSocialaccounts) : settings
            let renderRow = this.state.mode == 'socialaccount' ? this.renderSocialAccounts : this.renderSettings
            return (
                <List className='left-menu__list'
                    dataSource={dataSource}
                    renderRow={renderRow}
                    renderHeader={() => (
                        <ListHeader className='left-menu__header'>
                            <div className='left-menu__header-top'>
                                <div className='left'>
                                    <img src={activeSocialaccount.photoUrl} onError={helpers.avatarError} className='list__item__thumbnail' />
                                </div>
                                <div className='center'>
                                    <span className='user__displayname'>{activeSocialaccount.displayName}</span>
                                    <span className='user__provider'>{`${activeSocialaccount.provider} ${activeSocialaccount.type}`}</span>
                                </div>
                            </div>
                            <div className='left-menu__setting'>
                                <a className='left-menu__link' href="#" onClick={this.changeMode}><Icon icon={this.state.mode == 'socialaccount' ? 'fa-cog' : 'fa-users'} /></a>
                            </div>
                            {this.state.mode == 'socialaccount' &&
                                <div className='left-menu__searchbox'>
                                    <input className='search-input' type="text" onChange={this.changeKeyword} name="search" placeholder="Search Account" value={this.state.searchKeyword} />
                                </div>}
                        </ListHeader>
                    )}
                    />
            )
        } else {
            return (
                <div>
                    <p>You do not have any connected social accounts yet. You can add your social accounts to Sociocaster on web version.</p>
                    <p><a href='#' onClick={(e) => { window.open('https://sociocaster.com/posts/connect', '_system', '') } }>Connect Social Accounts</a></p>
                </div>
            )
        }
    }
}