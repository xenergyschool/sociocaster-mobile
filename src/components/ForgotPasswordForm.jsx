import React, { Component } from 'react'
import { Icon } from 'react-onsenui'

export default class ForgotPasswordForm extends Component {

    render() {
        const {handleClickReset, handleChange, email} = this.props
        return (
            <section style={{ textAlign: 'center' }}>
                <form onSubmit={handleClickReset}>
                    <div className='form-inputs'>

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
                            <button className='blueBtn' type='submit'>Forgot Password</button>
                        </div>
                    </div>
                </form>
            </section>
        )

    }

}