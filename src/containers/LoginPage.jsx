import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page } from 'react-onsenui'
import LoginForm from '../components/LoginForm'
import * as authActions from '../actions/auth'
import { bindActionCreators } from 'redux';

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickLogin = this.handleClickLogin.bind(this)
        this.state = { username: '', password: '' }
    }
    handleClickLogin(e) {

        const {authActions} = this.props

        authActions.login(this.state)
    }
    handleChange(e) {

        if (e.target.id == 'username')
            this.setState({ username: e.target.value })
        else if (e.target.id == 'password')
            this.setState({ password: e.target.value })
    }
    render() {

        return (<Page>
            <LoginForm handleClickLogin={this.handleClickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} />
        </Page>)
    }

}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
