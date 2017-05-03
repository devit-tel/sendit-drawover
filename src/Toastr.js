import React, { Component, PropTypes } from 'react'
import { UniqueId } from 'sendit-utility'
import AppendBodyComponent from './AppendBodyComponent'

export default class Toastr extends AppendBodyComponent {
  constructor (props) {
    super(props)
    this.uniqueId = UniqueId(6)
    this.setAppendElementId(this.uniqueId)
    this.state = {
      isVisible: false,
      timeoutStyle: {},
      timeoutMessage: null,
      toastrStyle: this.props.toastrStyle,
      completeStyle: {},
      completeMessage: null,
      isError: false,
      errorStyle: {},
      errorMessage: null
    }
  }
  componentWillMount () {
    const { isVisible } = this.props
    this.setState({isVisible: isVisible})
  }
  componentDidMount () {
    const { isVisible, timeout, timeoutDelay, timeoutStyle, timeoutMessage } = this.props
    this.updateSelf()
    if ( timeout && isVisible ) {
      if ( timeoutDelay && timeoutStyle && timeoutMessage ) {
        setTimeout( () => {
          this.setState({timeoutStyle: timeoutStyle, timeoutMessage: timeoutMessage})
        }, timeout)
        setTimeout ( () => {
          this.setState({isVisible: false})
          resetState()
        }, timeout + timeoutDelay)
      } else {
        setTimeout( () => {
          this.setState({isVisible: false})
          this.resetState()
        }, timeout)
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {
    const { completeDelay, completeStyle, completeMessage, isError, errorStyle, errorMessage } = this.props
    this.updateSelf()
    if ( nextProps.isVisible == false && this.props.isVisible == true ) {
      if ( nextProps.isError ) {
        this.setState({errorStyle: errorStyle, isError: nextProps.isError, errorMessage: nextProps.errorMessage})
        setTimeout ( () => {
          this.setState({isVisible: false})
          this.resetState()
        }, completeDelay)
      } else {
        console.log('Toastr is going to invisible')
        this.setState({completeStyle: completeStyle, completeMessage: completeMessage})
        setTimeout ( () => {
          this.setState({isVisible: false})
          this.resetState()
        }, completeDelay)
      }
    } if (nextProps.isVisible == true && this.props.isVisible == false) {
      this.setState({isVisible: true})
      console.log('Toastr is going to visible')
    }
  }
  componentDidUpdate () {
    this.updateSelf()
  }
  componentWillUnmount () {
    this.removeAppendElement()
  }
  resetState () {
    setTimeout( () => {
      this._resetState()
    }, 300)
  }
  _resetState () {
    this.setState({ isVisible: false, timeoutStyle: {}, timeoutMessage: null, completeStyle: {}, completeMessage: null, isError: false, errorStyle: {}, errorMessage: null })
  }
  updateSelf () {
    const { isVisible, toastrStyle, timeoutStyle, timeoutMessage, completeStyle, completeMessage, isError, errorStyle, errorMessage } = this.state
    this.updateAppendElement(
      <div key={this.uniqueId} className={'toastr' + (isVisible?' __visible':'')} style={Object.assign(toastrStyle?toastrStyle:{}, timeoutStyle?timeoutStyle:{}, completeStyle?completeStyle:{}, errorStyle?errorStyle:{})} onClick={()=>this._resetState()}>
        <div className={'__container'}>
          {timeoutMessage?timeoutMessage:(isError?errorMessage:(completeMessage?completeMessage:this.props.children))}
        </div>
      </div>
    )
  }
  render() {
    return null
  }
}
Toastr.propTypes = {
  isVisible: PropTypes.bool,
  timeout: PropTypes.number,
  timeoutDelay: PropTypes.number,
  timeoutStyle: PropTypes.object,
  timeoutMessage: PropTypes.string,
  toastrStyle: PropTypes.object,
  completeDelay: PropTypes.number,
  completeStyle: PropTypes.object,
  completeMessage: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorStyle: PropTypes.object
}
Toastr.defaultProps = {
  completeStyle: {
    backgroundColor: '#00A79D',
    color: 'white'
  },
  errorStyle: {
    backgroundColor: '#FB1465',
    color: 'white'
  },
  timeoutStyle: {}
}