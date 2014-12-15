'use strict';

var React  = require('react')
var assign = require('object-assign')

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'ReactButton',

    propTypes: {
        fn: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        onMouseUp: React.PropTypes.func,

        className: React.PropTypes.string,
        activeClassName: React.PropTypes.string,
        overClassName: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            defaultStyle: {
                display: 'inline-block',
                boxSizing: 'border-box'
            }
        }
    },

    getInitialState: function() {
        return {
            mouseOver: false,
            active: false
        }
    },

    render: function(){
        var props = this.prepareProps(this.props, this.state)

        return <div {...props} />
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        props.active    = !!state.active
        props.mouseOver = !!state.mouseOver

        props.style     = this.prepareStyle(props, state)
        props.className = this.prepareClassName(props, state)

        props.onMouseOver = this.handleMouseOver.bind(this, props)
        props.onMouseOut  = this.handleMouseOut.bind(this, props)
        props.onMouseDown = this.handleMouseDown.bind(this, props)
        props.onMouseUp   = this.handleMouseUp.bind(this, props)

        props.onClick   = this.handleClick.bind(this, props)

        return props
    },

    prepareClassName: function(props) {

        var className = props.className || ''

        className += ' z-button'

        if (props.active){
            className +=' z-active ' + (props.activeClassName || '')
        }

        if (props.mouseOver && props.overClassName){
            className += ' ' + props.overClassName
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        if (props.mouseOver && props.overStyle){
            assign(style, props.overStyle)
        }

        if (props.active && props.activeStyle){
            assign(style, props.activeStyle)
        }

        return style
    },

    handleClick: function() {
        ;(this.props.fn || emptyFn)()
    },

    handleMouseOver: function(event) {
        this.setState({
            mouseOver: true
        })
    },

    handleMouseOut: function(event) {
        this.setState({
            mouseOver: false
        })
    },

    handleMouseUp: function(event) {
        this.setState({
            active: false
        })
    },

    handleMouseDown: function(event) {
        this.setState({
            active: true
        })
    },

    isActive: function() {
        return !!this.state.active
    }
})