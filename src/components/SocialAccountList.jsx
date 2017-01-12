import React, { Component } from 'react'
import { LazyList, ListItem, Icon } from 'react-onsenui'
import { platform } from 'onsenui'
import * as helpers from '../helpers'

export default class SocialAccountList extends Component {
    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
    }
    renderRow(index) {
        const {socialaccount, filterSocialAccounts, handleChange} = this.props

        const filteredSocialAccounts = socialaccount.data.items.filter(filterSocialAccounts)
        const renderedSocialAccount = filteredSocialAccounts[index]
        return (
            <ListItem key={renderedSocialAccount.id} data-index={index} onClick={handleChange} tappable>
                <div className='left'>
                    <img src={renderedSocialAccount.photoUrl} onError={helpers.avatarError} className='list__item__thumbnail' />
                </div>
                <div className='center'>
                    <span className='user__displayname'>{renderedSocialAccount.displayName}</span>
                    <span className='user__provider'>{`${renderedSocialAccount.provider} ${renderedSocialAccount.type}`}</span>
                </div>
                {socialaccount.selectedSocialaccounts.indexOf(renderedSocialAccount.id) > -1 && <div className='right'>
                    <Icon icon='fa-check' />
                </div>}

            </ListItem>
        )
    }
    render() {
        const {socialaccount, filterSocialAccounts, handleChange} = this.props

        const filteredSocialAccounts = socialaccount.data.items.filter(filterSocialAccounts)
        return (
            <LazyList
                className='social-acc-list'
                length={filteredSocialAccounts.length}
                renderRow={this.renderRow}
                calculateItemHeight={() => platform.isAndroid() ? 68 : 64}
                />
        )

    }

}
