import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'


export default class PostItem extends Component {

    render() {
        const {postItem} = this.props
        let itemContent
        let time = '09:02'
        switch (postItem.type) {
            case 'picture':
                itemContent = (
                    <div className='post-box'>
                        <p className='post-box__picture'> {postItem.picture}</p>
                        <p className='post-box__msg'>{postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'link':
                itemContent = (
                    <div className='post-box'>
                        <p className='post-box__link'> {postItem.link}</p>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'customlink':
                itemContent = (
                    <div className='post-box'>
                        <p className='post-box__link'> {postItem.link}</p>
                        <p className='post-box__link-name'> {postItem.linkname}</p>
                        <img className='post-box__link-picture' src={postItem.linkpicture} alt="" />
                        <p className='post-box__link-description'> {postItem.linkdescription}</p>
                        <p className='post-box__link-caption'> {postItem.linkcaption}</p>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'album':
                itemContent = (
                    <div className='post-box'>
                        <p className='post-box__picture'> {postItem.picture}</p>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'text':
            default:
                itemContent = (
                    <div className='post-box'>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break

        }
        return itemContent
    }

}





