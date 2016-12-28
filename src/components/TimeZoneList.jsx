import React, { Component } from 'react'
import { LazyList, ListItem } from 'react-onsenui'
import { platform } from 'onsenui'

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }
  renderRow(index) {
    const {timezone, filterTimezones, handleChange} = this.props

    const filteredTimezones = timezone.data.filter(filterTimezones)

    return (
      <ListItem key={index} data-timezone={filteredTimezones[index]} onClick={handleChange} tappable>
        {filteredTimezones[index]}
      </ListItem>
    )
  }
  render() {
    const {filterTimezones, timezone} = this.props
    const filteredTimezones = timezone.data.filter(filterTimezones)
    return (
      <LazyList
        length={filteredTimezones.length}
        renderRow={this.renderRow}
        calculateItemHeight={() => platform.isAndroid() ? 48 : 44}
        />
    )

  }

}