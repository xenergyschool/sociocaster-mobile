import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterContent, SplitterSide, List, ListItem, ListHeader, PullHook } from 'react-onsenui'

const menuDataSource = [{
    title: 'Settings',
    icon: 'ion-ios-settings, material:md-settings'
}]
export default class Menu extends Component {

    render() {
        const {children, isMenuOpen, hideMenu, showMenu, socialaccount, getMenuPullContent, handleMenuPullChange, handleMenuPullLoad, switchSocialaccount} = this.props
        let activeSocialaccount = { photoUrl: '', displayName: '' }
        if (socialaccount.activeIndex > -1) {
            activeSocialaccount = socialaccount.data.items[socialaccount.activeIndex]
        }
        return (
            <Splitter>
                <SplitterSide
                    style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                    }}
                    side='left'
                    width={280}
                    collapse={true}
                    isSwipeable={true}
                    isOpen={isMenuOpen}
                    onClose={hideMenu}
                    onOpen={showMenu}
                    >
                    <Page className='left-menu'>
                        <PullHook
                            onChange={handleMenuPullChange}
                            onLoad={handleMenuPullLoad}
                            >
                            {getMenuPullContent()}
                        </PullHook>
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
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    {children}
                </SplitterContent>
            </Splitter >
        )
    }

}


