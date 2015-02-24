'use strict';

var React  = require('react')
var assign = require('object-assign')
var normalize = require('react-style-normalizer')

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
            color: 'rgb(120, 120, 120)',
            overColor: 'white',
            defaultStyle: {
                display  : 'inline-block',
                boxSizing: 'border-box',
                padding  : 5,
                margin   : 3,
                border   : '1px solid rgb(218, 218, 218)',
                cursor   : 'pointer'
            },

            defaultOverStyle: {
                background: 'rgb(103, 175, 233)'
            },

            defaultDisabledStyle: {
                background: 'rgb(221, 221, 221)',
                color: 'rgb(128, 128, 128)',
                cursor: 'default'
            },
            defaultDisabledAnchorStyle: {
                cursor: 'default'
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

        var defaultAnchorFactory = React.DOM.a
        var anchorFactory        = props.anchorFactory || defaultAnchorFactory
        var anchor               = anchorFactory(props.anchorProps)

        if (anchor === undefined){
            anchor = defaultAnchorFactory(props.anchorProps)
        }

        return <div {...props}>
            {anchor}
        </div>
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        props.active    = !!state.active
        props.mouseOver = props.overState == null? !!state.mouseOver: props.overState
        props.focused = !!state.focused

        props.style     = this.prepareStyle(props, state)
        props.className = this.prepareClassName(props, state)

        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave  = this.handleMouseLeave.bind(this, props)
        props.onMouseDown = this.handleMouseDown.bind(this, props)
        props.onMouseUp   = this.handleMouseUp.bind(this, props)

        var handleClick = this.handleClick.bind(this, props)

        props.onClick = typeof props.interceptClick == 'function'?
                            props.interceptClick.bind(this, handleClick):
                            handleClick

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
        anchorProps.onBlur  = this.handleAnchorBlur.bind(this, props)

        return anchorProps
    },

    getActiveColorStyle: function(props){
        var style

        if (props.active && props.activeColor){
            style = { color: props.activeColor }
        }

        return style
    },

    getOverColorStyle: function(props){
        var style

        if (props.mouseOver && props.overColor){
            style = { color: props.overColor }
        }

        return style
    },

    getFocusedColorStyle: function(props){
        var style

        if (props.focused && props.focusedColor){
            style = { color: props.focusedColor }
        }

        return style
    },

    getDisabledColorStyle: function(props){
        var style

        if (props.disabled && props.disabledColor){
            style = { color: props.disabledColor }
        }

        return style
    },

    getColorStyle: function(props){
        var style

        if (props.color){
            style = { color: props.color }
        }

        return style
    },

    prepareAnchorStyle: function(props) {
        var style = assign({}, props.defaultAnchorStyle, this.getColorStyle(props), props.anchorStyle)

        if (props.mouseOver){
            assign(style, props.defaultOverAnchorStyle, this.getOverColorStyle(props), props.overAnchorStyle)
        }

        if (props.active){
            assign(style, props.defaultActiveAnchorStyle, this.getActiveColorStyle(props), props.activeAnchorStyle)
        }

        if (props.focused){
            assign(style, props.defaultFocusedAnchorStyle, this.getFocusedColorStyle(props), props.focusedAnchorStyle)
        }

        if (props.disabled){
            assign(style, props.defaultDisabledAnchorStyle, this.getDisabledColorStyle(props), props.disabledAnchorStyle)
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

        if (props.disabled && props.disabledClassName){
            className += ' ' + props.disabledClassName
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, this.getColorStyle(props), props.style)

        if (props.focused){
            assign(style, props.defaultFocusedStyle, this.getFocusedColorStyle(props), props.focusedStyle)
        }

        if (props.mouseOver){
            assign(style, props.defaultOverStyle, this.getOverColorStyle(props), props.overStyle)
        }

        if (props.active){
            assign(style, props.defaultActiveStyle, this.getActiveColorStyle(props), props.activeStyle)
        }

        if (props.disabled){
            assign(style, props.defaultDisabledStyle, this.getDisabledColorStyle(props), props.disabledStyle)
        }

        return normalize(style)
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
        if (props.disabled){
            return
        }

        this.setState({
            focused: true
        })
    },

    handleAnchorBlur: function(props, event) {
        if (props.disabled){
            return
        }

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
        if (props.disabled){
            return
        }

        if (props.href && (event.target && event.target.tagName !== 'A')){
            this.navigate(props)
        }

        ;(this.props.onClick || emptyFn)(event)
        ;(this.props.fn || emptyFn)(props, event)
    },

    handleMouseEnter: function(props, event) {
        if (props.disabled){
            return
        }

        this.setState({
            mouseOver: true
        })

        ;(this.props.onMouseEnter || emptyFn)(event)
    },

    handleMouseLeave: function(props, event) {
        if (props.disabled){
            return
        }

        this.setState({
            mouseOver: false
        })

        ;(this.props.onMouseLeave || emptyFn)(event)
    },

    handleMouseUp: function(props, event) {
        this.setState({
            active: false
        })

        window.removeEventListener('mouseup', this.handleMouseUp)

        ;(this.props.onMouseUp || emptyFn)(event)
    },

    handleMouseDown: function(props, event) {

        event.preventDefault()

        if (props.disabled){
            return
        }

        this.setState({
            active: true
        })

        window.addEventListener('mouseup', this.handleMouseUp)

        ;(this.props.onMouseDown || emptyFn)(event)
    },

    isActive: function() {
        return !!this.state.active
    }
})