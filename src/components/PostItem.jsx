import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'
import * as helpers from '../helpers'

export default class PostItem extends Component {

    render() {
        const {postItem, time, openActions, currentIndex} = this.props
        let itemContent

        switch (postItem.type) {
            case 'picture':
                itemContent = (
                    <div className='post-box post-box__pictures' data-index={currentIndex} onClick={openActions}>
                        <p className='post-box__msg'>{postItem.message}</p>
                        <img className='post-box__picture' onError={helpers.imageError} src={postItem.picture} alt="" />

                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'link':
                itemContent = (
                    <div className='post-box post-box__links' data-index={currentIndex} onClick={openActions}>
                        <p className='post-box__link'> {postItem.link}</p>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'customlink':
                itemContent = (
                    <div className='post-box post-box__customlink' data-index={currentIndex} onClick={openActions}>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <a href={postItem.link} className='post-box__link'>
                            <div className='post-box__link-wrap'>
                                <img className='post-box__link-picture' onError={helpers.imageError} src={postItem.linkpicture} alt="" />
                            </div>
                            <span className='post-box__link-name'>{postItem.linkname}</span>
                            <span className='post-box__link-description'> {postItem.linkdescription}</span>
                            <span className='post-box__link-caption'> {postItem.linkcaption}</span>
                        </a>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'album':
                let message = JSON.parse(postItem.message)
                let pictures = JSON.parse(postItem.picture)
                itemContent = (
                    <div className='post-box post-box__album' data-index={currentIndex} onClick={openActions}>
                        <div className='album-wrap'>
                            <img className='album-wrap__image' onError={helpers.imageError} src={pictures[0].thumbnail} alt="" />
                            <div className='album-wrap__desc'>
                                <p className='album-wrap__type'>Album</p>
                                <span className='album-wrap__total'>+{pictures.length - 1}</span>
                            </div>
                        </div>
                        <h3> {message.title}</h3>
                        <p className='post-box__msg'>{message.description}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break
            case 'text':
            default:
                itemContent = (
                    <div className='post-box post-box__text' data-index={currentIndex} onClick={openActions}>
                        <p className='post-box__msg'> {postItem.message}</p>
                        <span className='post-box__time'>{time}</span>
                    </div>
                )
                break

        }
        return itemContent
    }

}





