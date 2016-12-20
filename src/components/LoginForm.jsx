import React, { Component } from 'react'
import { Input, Button } from 'react-onsenui'

export default class LoginForm extends Component {

    render() {
        const {handleClickLogin, handleChange, username, password} = this.props
        return (
            <section style={{ textAlign: 'center' }}>
                <form onSubmit={handleClickLogin}>
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
                            value={password}
                            onChange={handleChange}
                            id='password'
                            type='password'
                            placeholder='Password'
                            required

                            />
                    </p>
                    <p>
                        <button type='submit'>Sign In</button>
                    </p>
                </form>
            </section>
        )

    }

}