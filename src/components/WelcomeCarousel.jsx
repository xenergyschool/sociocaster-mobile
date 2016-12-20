import React from 'react';

import { Carousel, CarouselItem, Button } from 'react-onsenui';

export default class WelcomeCarousel extends React.Component {

    render() {
        const {messages, openLoginPage, openSignUpPage, setIndex, activeIndex} = this.props;
        console.log(activeIndex)
        return (
            <div>
                <Carousel onPostChange={setIndex} index={activeIndex} fullscreen swipeable autoScroll overscrollable>
                    {messages.map((message, index) => (
                        <CarouselItem key={index} style={{ backgroundColor: message.backgroundColour }}>
                            <div style={{ marginTop: '50%', textAlign: 'center' }}>
                                <h3>{message.title}</h3>
                                <p>{message.description}</p>
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
                            <span key={index} style={{ cursor: 'pointer' }} data-index={index} onClick={setIndex}>
                                {activeIndex === index ? '\u25CF' : '\u25CB'}
                            </span>
                        ))}
                    </div>
                }
            </div>

        );
    }
}
