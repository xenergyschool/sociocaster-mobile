import React, { Component } from 'react'
import { Input, Button } from 'react-onsenui'

export default class LoginForm extends Component {

    render() {
        const {handleClickLogin, handleChange, username, password} = this.props
        return (
            <section style={{ textAlign: 'center' }}>

                <p>
                    <Input
                        value={username}
                        onChange={handleChange}
                        modifier='underbar'
                        inputId='username'
                        float
                        placeholder='Username'
                        autofocus
                        required
                        />
                </p>
                <p>
                    <Input
                        value={password}
                        onChange={handleChange}
                        modifier='underbar'
                        inputId='password'
                        type='password'
                        float
                        placeholder='Password'
                        required

                        />
                </p>
                <p>
                    <Button onClick={handleClickLogin}>Sign in</Button>
                </p>

            </section>
        )

    }

}