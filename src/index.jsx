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

        style: React.PropTypes.object,
        activeStyle: React.PropTypes.object,
        overStyle: React.PropTypes.object,
        focusedStyle: React.PropTypes.object,
        disabledStyle: React.PropTypes.object,

        className       : React.PropTypes.string,
        activeClassName : React.PropTypes.string,
        overClassName   : React.PropTypes.string,
        focusedClassName: React.PropTypes.string,
        disabledClassName: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            color: 'rgb(120, 120, 120)',
            overColor: 'white',

            defaultStyle: {
                display   : 'inline-block',
                userSelect: 'none',
                boxSizing : 'border-box',
                padding  : 5,
                margin   : 3,
                border   : '1px solid rgb(218, 218, 218)',
                cursor   : 'pointer',
                textDecoration: 'none'
            },

            defaultPrimaryStyle: {
                background: 'rgb(103, 175, 233)'
            },

            primaryColor: 'white',

            defaultOverStyle: {
                background: 'rgb(131, 190, 237)'
            },

            defaultPressedStyle: {
                background: 'rgb(90, 152, 202)'
            },

            defaultDisabledPrimaryStyle: {
                background: 'rgb(116, 144, 166)'
            },

            disabledPrimaryColor: 'rgb(190, 190, 190)',
            pressedColor: 'white',

            defaultDisabledStyle: {
                background: 'rgb(221, 221, 221)',
                color: 'rgb(128, 128, 128)',
                cursor: 'default'
            },
            href: ''
        }
    },

    getInitialState: function() {
        return {
            mouseOver: false,
            active: false,
            defaultPressed: this.props.defaultPressed
        }
    },

    render: function(){
        var props = this.prepareProps(this.props, this.state)

        // var defaultAnchorFactory = React.DOM.a
        // var anchorFactory        = props.anchorFactory || defaultAnchorFactory
        // var anchor               = anchorFactory(props.anchorProps)

        // if (anchor === undefined){
        //     anchor = defaultAnchorFactory(props.anchorProps)
        // }

        return <a {...props} />
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        var pressed = props.pressed != null? props.pressed: state.defaultPressed
        if (pressed != null){
            props.pressed = pressed
        }

        props.active    = !!state.active
        props.mouseOver = props.overState == null? !!state.mouseOver: props.overState
        props.focused = !!state.focused

        props.style     = this.prepareStyle(props, state)
        props.className = this.prepareClassName(props, state)

        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
        props.onMouseDown  = this.handleMouseDown.bind(this, props)
        props.onMouseUp    = this.handleMouseUp.bind(this, props)

        var handleClick = this.handleClick.bind(this, props)

        props.onClick = typeof props.interceptClick == 'function'?
                            props.interceptClick.bind(this, handleClick):
                            handleClick

        props.onFocus = this.handleFocus.bind(this, props)
        props.onBlur  = this.handleBlur.bind(this, props)

        // props.anchorProps = this.prepareAnchorProps(props)

        return props
    },

    prepareAnchorProps: function(props) {
        return;
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

    getPressedColorStyle: function(props){
        var style

        if (props.pressed && props.pressedColor){
            style = { color: props.pressedColor }
        }

        return style
    },

    getPrimaryColorStyle: function(props){
        var style

        if (props.primary && props.primaryColor){
            style = { color: props.primaryColor }
        }

        return style
    },

    getDisabledPrimaryColorStyle: function(props){
        var style

        if (props.disabled && props.primary && props.disabledPrimaryColor){
            style = { color: props.disabledPrimaryColor }
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

    prepareClassName: function(props) {

        var className = props.className || ''

        if (props.disabled){
            if (props.disabledClassName){
                className += ' ' + props.disabledClassName
            }
        } else {
            if (props.active && props.activeClassName){
                className += ' ' + props.activeClassName
            }

            if (props.pressed && props.pressedClassName){
                className += ' ' + props.pressedClassName
            }

            if (props.primary && props.primaryClassName){
                className += ' ' + props.primaryClassName
            }

            if (props.mouseOver && props.overClassName){
                className += ' ' + props.overClassName
            }

            if (props.focused && props.focusedClassName){
                className += ' ' + props.focusedClassName
            }
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, this.getColorStyle(props), props.style)

        if (props.disabled){
            assign(style, props.defaultDisabledStyle, this.getDisabledColorStyle(props), props.disabledStyle)

            if (props.primary){
                assign(style, props.defaultDisabledPrimaryStyle, this.getDisabledPrimaryColorStyle(props), props.disabledPrimaryStyle)
            }
        } else {
            if (props.focused){
                assign(style, props.defaultFocusedStyle, this.getFocusedColorStyle(props), props.focusedStyle)
            }

            if (props.pressed){
                assign(style, props.defaultPressedStyle, this.getPressedColorStyle(props), props.pressedStyle)
            }

            if (props.primary){
                assign(style, props.defaultPrimaryStyle, this.getPrimaryColorStyle(props), props.primaryStyle)
            }

            if (props.mouseOver){
                assign(style, props.defaultOverStyle, this.getOverColorStyle(props), props.overStyle)
            }

            if (props.active){
                assign(style, props.defaultActiveStyle, this.getActiveColorStyle(props), props.activeStyle)
            }
        }

        return normalize(style)
    },

    isFocused: function() {
        return this.state.focused
    },

    isActive: function() {
        return !!this.state.active
    },

    handleFocus: function(props, event) {
        if (props.disabled){
            return
        }

        this.setState({
            focused: true
        })
    },

    handleBlur: function(props, event) {
        if (props.disabled){
            return
        }

        this.setState({
            focused: false
        })
    },

    handleClick: function(props, event) {
        if (!props.href || props.disabled){
            event.preventDefault()
        }

        if (props.disabled){
            return
        }

        if (props.pressed != null){
            var newPressed = !props.pressed

            if (this.props.pressed  == null){
                this.setState({
                    pressed: newPressed
                })
            }

            ;(this.props.onToggle || emptyFn)(newPressed, event)
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
        if (props.disabled){
            return
        }

        this.setState({
            active: false
        })

        window.removeEventListener('mouseup', this.handleMouseUp)

        ;(this.props.onMouseUp || emptyFn)(event)
    },

    handleMouseDown: function(props, event) {

        if (props.disabled){
            return
        }

        this.setState({
            active: true
        })

        window.addEventListener('mouseup', this.handleMouseUp)

        ;(this.props.onMouseDown || emptyFn)(event)
    }
})