import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from 'react-onsenui';
import WelcomeCarousel from '../components/WelcomeCarousel';

class WelcomePage extends Component {

  render() {
      const {messages} = this.props;
      return (<Page>
            <WelcomeCarousel messages={messages} />
        </Page>);
    }

}

const mapStateToProps = (state, ownProps) => ({
  messages: state.welcome.messages
});

export default connect(mapStateToProps)(WelcomePage);
