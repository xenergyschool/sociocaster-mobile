import React, { Component } from 'react'
import { Icon } from 'react-onsenui'

export default class SearchForm extends Component {

    render() {
        const {handleSearch, searchKeyword, placeholder} = this.props
        return (
            <section style={{ textAlign: 'center' }}>

                <div className='form-inputs'>

                    <div className='input-block'>
                        <input
                            className='sc-inputs'
                            value={searchKeyword}
                            onChange={handleSearch}

                            type='text'
                            placeholder={placeholder}
                            autoFocus


                            />
                        <Icon className='input-icon' icon='fa-search' />
                    </div>
                </div>

            </section>
        )

    }

}