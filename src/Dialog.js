import React, { Component, PropTypes } from 'react'
import { UniqueId } from 'sendit-utility'
import AppendBodyComponent from './AppendBodyComponent'

export default class Dialog extends AppendBodyComponent {
  constructor (props) {
    super(props)
    this.uniqueId = UniqueId(6)
    this.setAppendElementId(this.uniqueId)
    this.onOkay = this.onOkay.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.state = {
      isConfirm: false
    }
  }
  componentWillMount () {
    const { title, okayLabel, cancelLabel, onOkay, onCancel } = this.props
    if ( title || okayLabel || cancelLabel || onOkay || onCancel )
      this.setState({ isConfirm: true })
  }
  componentDidMount () {
    this.updateSelf()
  }
  componentDidUpdate () {
    this.updateSelf()
  }
  componentWillUnmount () {
    this.removeAppendElement()
  }
  onOkay () {
    const { onOkay } = this.props
    onOkay()
  }
  onCancel () {
    const { onCancel } = this.props
    onCancel()
  }
  updateSelf () {
    const { isVisible, isBlind, title, okayLabel, cancelLabel } = this.props
    const { isConfirm } = this.state
    this.updateAppendElement(
      <div key={this.uniqueId} className={(isConfirm?'confirm':'dialog') + (isVisible?' __visible':'') + (isBlind?' __blind':'')}>
        {isConfirm?<div className={'__cancelDialog'} onClick={()=>this.onCancel()}></div>:null}
        <div className={'__container'}>
          {title?<div className={'__title'}>{title}</div>:null}
          <div className={'__body'}>
            {this.props.children}
          </div>
          {isConfirm?<div className={'__actionbar'}>
            <button className={'btn-dialog btn-dialog-cancel'} onClick={()=>this.onCancel()}>{cancelLabel?cancelLabel:'Cancel'}</button>
            <button className={'btn-dialog btn-dialog-ok'} onClick={()=>this.onOkay()}>{okayLabel?okayLabel:'OK'}</button>
          </div>:null}
        </div>
      </div>
    )
  }
  render() {
    return null
  }
}
Dialog.propTypes = {
  isVisible: PropTypes.bool,
  isBlind: PropTypes.bool,
  title: PropTypes.string,
  okayLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onOkay: PropTypes.func,
  onCancel: PropTypes.func,
}