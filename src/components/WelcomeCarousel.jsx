import React from 'react';

import { Carousel, CarouselItem, Button, Icon } from 'react-onsenui';
import pic4 from '../images/sc-logo-blue.png'


export default class WelcomeCarousel extends React.Component {


    render() {
        const {messages, openLoginPage, openSignUpPage, setIndex, activeIndex} = this.props;


        return (

            <div className='welcome-wrap'>
                <Carousel onPostChange={setIndex} index={activeIndex} fullscreen swipeable autoScroll overscrollable>
                    <div className='skipme'>
                        {activeIndex < messages.length && <a className='skipme__link' href='#' data-index={messages.length} onClick={setIndex} >Skip</a>}
                    </div> 
                    {messages.map((message, index) => (
                        <CarouselItem key={index}>
                            <div className='welcomeMsg'>
                                <img className='welcomeMsg__img' src={message.picture} alt='' />
                                <h3 className='welcomeMsg__heading'>{message.title}</h3>
                                <p className='welcomeMsg__desc'>{message.description}</p>
                            </div>
                        </CarouselItem>
                    ))}
                    <CarouselItem key={messages.length} >
                        <div className='sign-direction'>
                            <img className='sclogo' src={pic4} alt='' />
                            <p>Sociocaster is the easiest way to FIND, PLAN and POST content that is proven to increase social media engagement on Facebook, Twitter, LinkedIn, Pinterest and Instagram.</p>
                            <p><Button className='signupbtn' onClick={openSignUpPage}>Get Started</Button></p>
                            <small className='text-center'>Already have an account? <Button className='signinbtn' onClick={openLoginPage}>Sign in</Button> </small>

                        </div>
                    </CarouselItem>
                </Carousel>
                {activeIndex < messages.length &&
                    <div style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        position: 'absolute',
                        bottom: '36px',
                        left: '0px',
                        right: '0px'
                    }}>
                        {messages.map((message, index) => (
                            <span className='welcome-bullets' key={index} >
                                {activeIndex === index ? <Icon icon='fa-circle' data-index={index} onClick={setIndex} /> : <Icon icon='fa-circle-o' data-index={index} onClick={setIndex} />}
                            </span>
                        ))}
                    </div>
                }
            </div>

        );
    }
}
