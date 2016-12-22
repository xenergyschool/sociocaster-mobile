import React, { Component } from 'react'
import { Input, Button, Icon } from 'react-onsenui'

export default class LoginForm extends Component {

    render() {
        const {handleClickSignUp, handleChange, username, email, password} = this.props
        return (
            <section style={{ textAlign: 'center' }}>
                <form onSubmit={handleClickSignUp}>
                    <p>
                        <input
                            value={username}
                            onChange={handleChange}

                            id='username'
                            type='text'
                            placeholder='Username'
                            autoFocus
                            required

                            />
                    </p>
                    <p>
                        <input
                            value={email}
                            onChange={handleChange}

                            id='email'
                            type='email'
                            placeholder='Email'

                            required

                            />
                    </p>
                    <p>
                        <input
                            value={password}
                            onChange={handleChange}

                            id='password'
                            type='password'

                            placeholder='Password'
                            required

                            />
                    </p>
                    <p>
                        <button type='submit'>Sign Up</button>
                    </p>
                </form>
            </section>
        )

    }

}