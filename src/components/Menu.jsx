import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterContent, SplitterSide, List, ListItem, ListHeader, PullHook, Modal } from 'react-onsenui'
import MenuList from './MenuList'
const menuDataSource = [{
    title: 'Settings',
    icon: 'ion-ios-settings, material:md-settings'
}]
export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.setModal = this.setModal.bind(this)
        this.state = {
            modalShown: false,
            modalMessage: ''
        }
    }
    setModal(data) {
        this.setState(data)
    }
    render() {
        const {children, isMenuOpen, hideMenu, showMenu, socialaccount, getMenuPullContent, handleMenuPullChange, handleMenuPullLoad, switchSocialaccount, navigator, socialaccountActions} = this.props
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
                    swipeTargetWidth={30}
                    collapse={true}
                    isSwipeable={true}
                    isOpen={isMenuOpen}
                    onClose={hideMenu}
                    onOpen={showMenu}
                    >
                    <Page
                        className='left-menu'
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
                        <PullHook className='pull-left-menu'
                            onChange={handleMenuPullChange}
                            onLoad={handleMenuPullLoad}
                            >
                            {getMenuPullContent()}
                        </PullHook>
                        <MenuList
                            socialaccount={socialaccount}
                            switchSocialaccount={switchSocialaccount}
                            activeSocialaccount={activeSocialaccount}
                            navigator={navigator}
                            socialaccountActions={socialaccountActions}
                            setModal={this.setModal}
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


