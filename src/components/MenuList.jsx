
import React, { Component } from 'react'
import { List, ListItem, ListHeader, Icon } from 'react-onsenui'


export default class MenuList extends Component {

    render() {
        const {socialaccount, switchSocialaccount, activeSocialaccount} = this.props
        if (socialaccount.data.items && socialaccount.data.items.length > 0) {


            return (
                <List className='left-menu__list'
                    dataSource={socialaccount.data.items}
                    renderRow={(data, index) => (

                        <ListItem className='left-menu__list-item' key={data.id} data-index={index} onClick={switchSocialaccount} tappable>
                            <div className='left'>
                                <img src={data.photoUrl} className='list__item__thumbnail' />
                            </div>
                            <div className='center'>
                                <span className='user__displayname'>{data.displayName}</span>
                                <span className='user__provider'>{`${data.provider} ${data.type}`}</span>
                            </div>
                        </ListItem>
                    )}
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
                                <a className='left-menu__link' href="#"><Icon icon='fa-cog' /></a>
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