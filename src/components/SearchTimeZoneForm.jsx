import React, { Component } from 'react'
import { Icon } from 'react-onsenui'

export default class ForgotPasswordForm extends Component {

    render() {
        const {handleSearch, userTimezone, searchKeyword} = this.props
        return (
            <section style={{ textAlign: 'center' }}>

                <div className='form-inputs'>

                    <div className='input-block'>
                        <input
                            className='sc-inputs'
                            value={searchKeyword}
                            onChange={handleSearch}

                            id='timezone'
                            type='text'
                            placeholder='Search a time zone...'
                            autoFocus


                            />
                        <Icon className='input-icon' icon='fa-search' />
                    </div>
                </div>

            </section>
        )

    }

}