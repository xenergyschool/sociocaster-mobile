import React from 'react';

import { Carousel, CarouselItem, Button, Icon } from 'react-onsenui';

export default class WelcomeCarousel extends React.Component {

    render() {
        const {messages, openLoginPage, openSignUpPage, setIndex, activeIndex} = this.props;
        console.log(activeIndex)


        return (

            <div className='welcome-wrap'>
                <Carousel onPostChange={setIndex} index={activeIndex} fullscreen swipeable autoScroll overscrollable>
                    <div className='skipme'>
                        <a className='skipme__link' href='#'>Skip</a>
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
                        <div style={{ marginTop: '50%', textAlign: 'center' }}>
                            <Button onClick={openLoginPage}>Sign in</Button>
                            <p>or</p>
                            <Button onClick={openSignUpPage}>Sign Up</Button>
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
