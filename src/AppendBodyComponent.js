import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

const appenedElements = {}

if (!document.querySelector('#DrawOver')) {
  const DrawOverElem = document.createElement('div')
  DrawOverElem.setAttribute('id', 'DrawOver')
  document.body.appendChild(DrawOverElem)
}
const appendElementContainer = document.querySelector('#DrawOver')

const getAppendedElements = () => {
  const elements = []
  const keys = Object.keys(appenedElements)
  const length = keys.length
  if (length > 0) {
    keys.forEach((key) => {
      elements.push(appenedElements[key])
    })
  }
  return elements
}
export default class AppendBodyComponent extends Component {
  constructor(props) {
    super(props)
    this.appendElementContainer = appendElementContainer
  }
  setAppendElementId(id) {
    this.appendElementId = id
  }
  updateAppendElement(content) {
    appenedElements[this.appendElementId] = content
    this.updateAppendElements()
  }
  updateAppendElements() {
    ReactDOM.render(<div className={'DrawOver'}>{getAppendedElements()}</div>, appendElementContainer)
  }
  removeAppendElement() {
    delete appenedElements[this.appendElementId]
    this.updateAppendElements()
  }
}