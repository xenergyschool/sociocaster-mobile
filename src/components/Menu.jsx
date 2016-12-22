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
                    <Page>
                        <PullHook
                            onChange={handleMenuPullChange}
                            onLoad={handleMenuPullLoad}
                            >
                            {getMenuPullContent()}
                        </PullHook>
                        <List
                            dataSource={socialaccount.data.items}
                            renderRow={(data) => (

                                <ListItem key={data.id} onClick={switchSocialaccount} tappable>
                                    <div className='left'>
                                        <img src={data.photoUrl} className='list__item__thumbnail' />
                                    </div>
                                    <div className='center'>
                                        {data.displayName}
                                    </div>
                                </ListItem>
                            )}
                            renderHeader={() => (
                                <ListHeader >
                                    <div className='left'>
                                        <img src={activeSocialaccount.photoUrl} className='list__item__thumbnail' />
                                    </div>
                                    <div className='center'>
                                        {activeSocialaccount.displayName}
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


