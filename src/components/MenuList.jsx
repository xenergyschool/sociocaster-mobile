
import React, { Component } from 'react'
import { List, ListItem, ListHeader, Icon } from 'react-onsenui'


export default class MenuList extends Component {
    constructor(props) {
        super(props)
        this.changeMode = this.changeMode.bind(this)
        this.renderSocialAccounts = this.renderSocialAccounts.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.state = {
            mode: 'socialaccount'
        }
    }

    changeMode(e) {
        this.setState({ mode: this.state.mode == 'socialaccount' ? 'setting' : 'socialaccount' })
    }

    renderSocialAccounts(data, index) {
        const {switchSocialaccount} = this.props
        return (
            <ListItem className='left-menu__list-item' key={data.id} data-index={index} onClick={switchSocialaccount} tappable>
                <div className='left'>
                    <img src={data.photoUrl} className='list__item__thumbnail' />
                </div>
                <div className='center'>
                    <span className='user__displayname'>{data.displayName}</span>
                    <span className='user__provider'>{`${data.provider} ${data.type}`}</span>
                </div>
            </ListItem>
        )
    }

    renderSettings(data, index) {
        return (
            <ListItem className='left-menu__list-item' key={index} data-index={index} tappable>
                {data}
            </ListItem>
        )
    }
    render() {
        const {socialaccount, switchSocialaccount, activeSocialaccount} = this.props
        if (socialaccount.data.items && socialaccount.data.items.length > 0) {
            const settings = ['Schedule Times', 'Refresh Profile Info', 'Delete']
            let dataSource = this.state.mode == 'socialaccount' ? socialaccount.data.items : settings
            let renderRow = this.state.mode == 'socialaccount' ? this.renderSocialAccounts : this.renderSettings
            return (
                <List className='left-menu__list'
                    dataSource={dataSource}
                    renderRow={renderRow}
                    renderHeader={() => (
                        <ListHeader className='left-menu__header'>
                            <div className='left-menu__header-top'>
                                <div className='left'>
                                    <img src={activeSocialaccount.photoUrl} className='list__item__thumbnail' />
                                </div>
                                <div className='center'>
                                    <span className='user__displayname'>{activeSocialaccount.displayName}</span>
                                    <span className='user__provider'>{`${activeSocialaccount.provider} ${activeSocialaccount.type}`}</span>
                                </div>
                            </div>
                            <div className='left-menu__setting'>
                                <a className='left-menu__link' href="#" onClick={this.changeMode}><Icon icon={this.state.mode == 'socialaccount' ? 'fa-cog' : 'fa-users'} /></a>
                            </div>
                            <div className='left-menu__searchbox'>
                                <input className='search-input' type="text" name="search" placeholder="Search Account" />
                            </div>
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