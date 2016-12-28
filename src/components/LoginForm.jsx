import React, { Component } from 'react'
import { Icon } from 'react-onsenui'

export default class LoginForm extends Component {

    render() {
        const {handleClickLogin, openSignUpPage, openForgotPasswordPage, handleChange, username, password} = this.props
        return (
            <section style={{ textAlign: 'center' }}>
                <form onSubmit={handleClickLogin}>
                    <div className='form-inputs'>
                        <div className='input-block'>
                            <input
                                className='sc-inputs'
                                value={username}
                                onChange={handleChange}
                                id='username'
                                type='text'
                                placeholder='Username'
                                autoFocus
                                required

                                />
                            <Icon className='input-icon' icon='fa-user' />
                        </div>
                        <div className='input-block'>
                            <input
                                className='sc-inputs'
                                value={password}
                                onChange={handleChange}
                                id='password'
                                type='password'
                                placeholder='Password'
                                required

                                />
                            <Icon className='input-icon' icon='fa-lock' />
                        </div>
                        <div className='input-block'>
                            <a className='iforgot' href="#" onClick={openForgotPasswordPage}>Lost Your Password?</a>
                        </div>
                        <div className='input-block'>
                            <button type='submit' className='blueBtn'>Sign In</button>
                        </div>
                    </div>
                    <p className='text-small letmein'>Don't have an Account? <a className='letmein__link' href="#" onClick={openSignUpPage}>Sign up</a></p>
                </form>
            </section>
        )

    }

}