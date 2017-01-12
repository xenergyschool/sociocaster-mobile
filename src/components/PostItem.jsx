import React, { Component } from 'react'
import { platform } from 'onsenui'
import { Page } from 'react-onsenui'


export default class PostItem extends Component {

    render() {
        const {postItem, time, openActions, currentIndex} = this.props
        let itemContent

        switch (postItem.type) {
            case 'picture':
                itemContent = (
                    <div className='post-box post-box__picture' data-index={currentIndex} onClick={openActions}>
                        <p className='post-box__msg'>{postItem.message}</p>
                        <img className='post-box__picture' src={postItem.picture} alt="" />

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
                                <img className='post-box__link-picture' src={postItem.linkpicture} alt="" />
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
                itemContent = (
                    <div className='post-box post-box__album' data-index={currentIndex} onClick={openActions}>
                        <div className='album-wrap'>
                            <img className='album-wrap__image' src='https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg' alt="" />
                            <div className='album-wrap__desc'>
                                <p className='album-wrap__type'>Album</p>
                                <span className='album-wrap__total'>+100</span>
                            </div>
                        </div>
                        <p className='post-box__msg'>Mereka memang terlalu ke arab-araban, bicaranya aja antum, akhi, ukhti!
Beda dengan kita yang sangat cinta Indonesia walau mengenakan pakaian berbahan jeans, bicara tentang audience, insight, copy writing, target market, save, download, copy, paste, btw, otw dan lain-lainnya.
Bahkan walau kadang manggil koko dan cici pada sebagian dari saudara kami, itu tidak mempengaruhi kecintaan kami terhadap tanah air Indonesia.</p>
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





