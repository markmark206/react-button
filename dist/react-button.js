(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactButton"] = factory(require("React"));
	else
		root["ReactButton"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React     = __webpack_require__(1)
	var assign    = __webpack_require__(2)
	var normalize = __webpack_require__(3)

	function emptyFn(){}

	module.exports = React.createClass({

	    displayName: 'ReactButton',

	    propTypes: {
	        fn: React.PropTypes.func,
	        onClick: React.PropTypes.func,

	        primary: React.PropTypes.bool,
	        disabled: React.PropTypes.bool,
	        pressed: React.PropTypes.bool,
	        defaultPressed: React.PropTypes.bool,

	        href: React.PropTypes.string,

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

	            defaultStyle: {
	                display   : 'inline-block',
	                userSelect: 'none',
	                boxSizing : 'border-box',
	                textDecoration: 'none',
	                cursor   : 'pointer',

	                //theme properties
	                padding  : 5,
	                margin   : 2,
	                border   : '1px solid rgb(218, 218, 218)',
	                color: 'rgb(120, 120, 120)',
	            },

	            defaultPrimaryStyle: {
	                //theme properties
	                background: 'rgb(103, 175, 233)',
	                color: 'white'
	            },

	            defaultOverStyle: {
	                //theme properties
	                background: 'rgb(118, 181, 231)',
	                color: 'white'
	            },

	            defaultPressedStyle: {
	                //theme properties
	                background: 'rgb(90, 152, 202)',
	                color: 'white'
	            },

	            defaultDisabledPrimaryStyle: {
	                //theme properties
	                background: 'rgb(116, 144, 166)',
	                color: 'rgb(190, 190, 190)'
	            },

	            defaultDisabledStyle: {
	                cursor: 'default',

	                //theme properties
	                background: 'rgb(221, 221, 221)',
	                color: 'rgb(128, 128, 128)'
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

	    isFocused: function() {
	        return this.state.focused
	    },

	    isActive: function() {
	        return !!this.state.active
	    },

	    render: function(){
	        var props = this.prepareProps(this.props, this.state)

	        return (props.factory || React.DOM.a)(props)
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

	        props['data-active']  = props.active
	        props['data-over']    = props.mouseOver
	        props['data-focused'] = props.focused
	        props['data-pressed'] = props.pressed
	        props['data-primary'] = props.primary

	        props.style     = this.prepareStyle(props, state)
	        props.className = this.prepareClassName(props, state)

	        var handleClick = this.handleClick.bind(this, props)

	        props.onClick = typeof props.interceptClick == 'function'?
	                            props.interceptClick.bind(this, handleClick):
	                            handleClick

	        props.onFocus      = this.handleFocus.bind(this, props)
	        props.onBlur       = this.handleBlur.bind(this, props)
	        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
	        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
	        props.onMouseDown  = this.handleMouseDown.bind(this, props)
	        props.onMouseUp    = this.handleMouseUp.bind(this, props)

	        return props
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

	            if (this.props.pressed == null){
	                this.setState({
	                    defaultPressed: newPressed
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

	            if (props.mouseOver && props.overClassName){
	                className += ' ' + props.overClassName
	            }

	            if (props.focused && props.focusedClassName){
	                className += ' ' + props.focusedClassName
	            }
	        }

	        if (props.primary && props.primaryClassName){
	            className += ' ' + props.primaryClassName
	        }

	        return className
	    },

	    prepareStyle: function(props) {
	        var style = {}

	        assign(style, props.defaultStyle, props.style)

	        if (props.disabled){
	            assign(style,
	                props.defaultDisabledStyle,
	                props.primary && props.defaultDisabledPrimaryStyle,

	                props.disabledStyle,
	                props.primary && props.disabledPrimaryStyle
	            )

	        } else {
	            assign(style,
	                //DEFAULTS
	                props.focused   && props.defaultFocusedStyle,
	                props.primary   && props.defaultPrimaryStyle,
	                props.mouseOver && props.defaultOverStyle,
	                props.pressed   && props.defaultPressedStyle,
	                props.active    && props.defaultActiveStyle,
	                //combinations
	                props.mouseOver && props.primary && props.defaultOverPrimaryStyle,
	                props.pressed   && props.primary && props.defaultPressedPrimaryStyle,
	                props.mouseOver && props.pressed && props.defaultOverPressedStyle,

	                //NON-DEFAULTS
	                props.focused   && props.focusedStyle,
	                props.primary   && props.primaryStyle,
	                props.mouseOver && props.overStyle,
	                props.pressed   && props.pressedStyle,
	                props.active    && props.activeStyle,
	                //combinations
	                props.mouseOver && props.primary && props.overPrimaryStyle,
	                props.pressed   && props.primary && props.pressedPrimaryStyle,
	                props.mouseOver && props.pressed && props.overPressedStyle
	            )
	        }

	        return normalize(style)
	    }
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(4)
	var getPrefixed = __webpack_require__(5)

	var map      = __webpack_require__(6)
	var plugable = __webpack_require__(7)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){
		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(8)
	var properties       = __webpack_require__(9)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(10)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var getPrefix    = __webpack_require__(12)
	var el           = __webpack_require__(13)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(12)
	var forcePrefixed = __webpack_require__(14)
	var el            = __webpack_require__(13)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (!(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                el.style[prefixed] = ''
	                el.style[prefixed] = prefixedValue

	                if (el.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(13)

	var PREFIX

	module.exports = function(key){

		if (PREFIX){
			return PREFIX
		}

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof el.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	if(!!global.document){
	  	el = global.document.createElement('div')
	}

	module.exports = el
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var getPrefix    = __webpack_require__(12)
	var properties   = __webpack_require__(9)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }
/******/ ])
});
