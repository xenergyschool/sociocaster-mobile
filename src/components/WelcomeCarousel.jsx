import React from 'react';

import { Carousel, CarouselItem, Button } from 'react-onsenui';

export default class WelcomeCarousel extends React.Component {

    render() {
        const {messages, openLoginPage} = this.props;

        return (
            <div>
                <Carousel fullscreen swipeable autoScroll overscrollable>
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
                        </div>
                    </CarouselItem>
                </Carousel>
                <div style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    position: 'absolute',
                    bottom: '36px',
                    left: '0px',
                    right: '0px'
                }}>
                    <span>m</span>
                </div>
            </div>

        );
    }
}
