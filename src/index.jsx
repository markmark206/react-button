'use strict';

var React  = require('react')
var assign = require('object-assign')

function emptyFn(){}

function NAV(href){
    window.location.href = href
}

module.exports = React.createClass({

    displayName: 'ReactButton',

    propTypes: {
        fn: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        onMouseUp: React.PropTypes.func,

        className       : React.PropTypes.string,
        activeClassName : React.PropTypes.string,
        overClassName   : React.PropTypes.string,
        focusedClassName: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            defaultStyle: {
                display  : 'inline-block',
                boxSizing: 'border-box',
                padding  : 5,
                border   : '1px solid gray',
                color    : 'blue',
                cursor   : 'pointer'
            },

            defaultAnchorStyle: {
                textDecoration: 'none'
            },

            href: ''
        }
    },

    getInitialState: function() {
        return {
            mouseOver: false,
            active: false
        }
    },

    render: function(){
        var props         = this.prepareProps(this.props, this.state)
        var anchorFactory = props.anchorFactory || React.DOM.a

        return <div {...props}>
            {anchorFactory(props.anchorProps)}
        </div>
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        props.active    = !!state.active
        props.mouseOver = !!state.mouseOver
        props.focused = !!state.focused

        props.style     = this.prepareStyle(props, state)
        props.className = this.prepareClassName(props, state)

        props.onMouseOver = this.handleMouseOver.bind(this, props)
        props.onMouseOut  = this.handleMouseOut.bind(this, props)
        props.onMouseDown = this.handleMouseDown.bind(this, props)
        props.onMouseUp   = this.handleMouseUp.bind(this, props)
        props.onClick     = this.handleClick.bind(this, props)

        props.anchorProps = this.prepareAnchorProps(props)

        return props
    },

    prepareAnchorProps: function(props) {
        var anchorProps = {}

        assign(anchorProps, {
            children   : props.children,
            style      : this.prepareAnchorStyle(props),
            href: props.href
        })

        anchorProps.onClick = this.handleAnchorClick.bind(this, props)
        anchorProps.onFocus = this.handleAnchorFocus.bind(this, props)
        anchorProps.onBlur = this.handleAnchorBlur.bind(this, props)

        return anchorProps
    },

    prepareAnchorStyle: function(props) {
        var colorStyle = props.style.color?
                            {color: props.style.color }:
                            null

        var style = assign({}, props.defaultAnchorStyle, colorStyle, props.anchorStyle)

        if (props.mouseOver && props.overAnchorStyle){
            assign(style, props.overAnchorStyle)
        }

        if (props.active && props.activeAnchorStyle){
            assign(style, props.activeAnchorStyle)
        }

        if (props.focused && props.focusedAnchorStyle){
            assign(style, props.focusedAnchorStyle)
        }

        return style
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

        if (props.focused && props.focusedClassName){
            className += ' ' + props.focusedClassName
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        if (props.focused && props.focusedStyle){
            assign(style, props.focusedStyle)
        }

        if (props.mouseOver && props.overStyle){
            assign(style, props.overStyle)
        }

        if (props.active && props.activeStyle){
            assign(style, props.activeStyle)
        }

        return style
    },

    navigate: function(props) {
        if (props.href){
            ;(props.navigate || NAV)(props.href)
        }
    },

    isFocused: function() {
        return this.state.focused
    },

    handleAnchorFocus: function(props, event) {
        this.setState({
            focused: true
        })
    },

    handleAnchorBlur: function(props, event) {
        this.setState({
            focused: false
        })
    },

    handleAnchorClick: function(props, event) {
        if (!props.href){
            event.preventDefault()
        }
    },

    handleClick: function(props, event) {
        if (props.href && (event.target && event.target.tagName !== 'A')){
            this.navigate(props)
        }

        ;(this.props.onClick || emptyFn)(event)
        ;(this.props.fn || emptyFn)()
    },

    handleMouseOver: function(props, event) {
        this.setState({
            mouseOver: true
        })
    },

    handleMouseOut: function(props, event) {
        this.setState({
            mouseOver: false
        })
    },

    handleMouseUp: function(props, event) {
        this.setState({
            active: false
        })

        window.removeEventListener('mouseup', this.handleMouseUp)

    },

    handleMouseDown: function(props, event) {

        event.preventDefault()

        this.setState({
            active: true
        })

        window.addEventListener('mouseup', this.handleMouseUp)
    },

    isActive: function() {
        return !!this.state.active
    }
})