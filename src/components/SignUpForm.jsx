import React, { Component } from 'react'
import { Icon } from 'react-onsenui'

export default class LoginForm extends Component {

    render() {
        const {handleClickSignUp, handleChange, username, email, password} = this.props
        return (
            <section style={{ textAlign: 'center' }}>
                <form onSubmit={handleClickSignUp}>
                    <div className='form-inputs'>
                        <div className='input-block'>
                            <input
                                className='sc-inputs'
                                value={username}
                                onChange={handleChange}
                                minLength='6'
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
                                value={email}
                                onChange={handleChange}

                                id='email'
                                type='email'
                                placeholder='Email'

                                required

                                />
                            <Icon className='input-icon' icon='fa-envelope' />
                        </div>
                        <div className='input-block'>
                            <input
                                className='sc-inputs'
                                value={password}
                                onChange={handleChange}
                                minLength='6'
                                id='password'
                                type='password'

                                placeholder='Password'
                                required

                                />
                            <Icon className='input-icon' icon='fa-lock' />
                        </div>
                        <div className='input-block'>
                            <button className='blueBtn' type='submit'>Sign Up</button>
                        </div>
                    </div>
                </form>
            </section>
        )

    }

}