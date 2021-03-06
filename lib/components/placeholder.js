
import Portal from 'react-portal'
import React from 'react'
import findDOMNode from '../utils/find-dom-node'

/**
 * Placeholder.
 */

class Placeholder extends React.Component {

  /**
   * Properties.
   */

  static propTypes = {
    children: React.PropTypes.any.isRequired,
    className: React.PropTypes.string,
    node: React.PropTypes.object.isRequired,
    parent: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    style: React.PropTypes.object
  };

  /**
   * Should the component update?
   *
   * @param {Object} props
   * @param {Object} state
   * @return {Boolean}
   */

  shouldComponentUpdate = (props, state) => {
    return (
      props.children != this.props.children ||
      props.className != this.props.className ||
      props.parent != this.props.parent ||
      props.node != this.props.node ||
      props.style != this.props.style
    )
  }

  /**
   * Is the placeholder visible?
   *
   * @return {Boolean}
   */

  isVisible = () => {
    const { onlyFirstChild, node, parent } = this.props
    if (node.text) return false
    if (parent.nodes.size > 1) return false

    const isFirst = parent.nodes.first() === node
    if (isFirst) return true

    return false
  }

  /**
   * On open, update the placeholder element's position.
   *
   * @param {Element} portal
   */

  onOpen = (portal) => {
    const { node } = this.props
    const el = portal.firstChild
    const nodeEl = findDOMNode(node)
    const rect = nodeEl.getBoundingClientRect()
    el.style.pointerEvents = 'none'
    el.style.position = 'absolute'
    el.style.top = `${window.scrollY + rect.top}px`
    el.style.left = `${window.scrollX + rect.left}px`
    el.style.width = `${rect.width}px`
    el.style.height = `${rect.height}px`
  }

  /**
   * Render.
   *
   * If the placeholder is a string, and no `className` or `style` has been
   * passed, give it a default style of lowered opacity.
   *
   * @return {Element} element
   */

  render = () => {
    const isOpen = this.isVisible()
    const { children, className } = this.props
    let { style } = this.props

    if (typeof children === 'string' && style == null && className == null) {
      style = { opacity: '0.333'}
    }

    return (
      <Portal isOpened={isOpen} onOpen={this.onOpen}>
        <span className={className} style={style}>{children}</span>
      </Portal>
    )
  }

}

/**
 * Export.
 */

export default Placeholder
