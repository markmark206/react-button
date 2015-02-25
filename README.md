react-button
============

React Button

## Install

```sh
$ npm install react-button
```

## Usage

```jsx
var Button = require('react-button')

function clicked(){}

<Button onClick={clicked} activeStyle={{position:'relative', top: 1}}>Save as</Button>
<Button>Export</Button>

```

## Properties

 * fn: Function - function to be called when the button is clicked
 * onClick: Function - function to be called when the button is clicked

 * overClassName: String - a css class to be applied when the mouse is over the button
 * activeClassName: String - a css class to be applied when the mouse is pressed on the button (the button is in active state)
 * focusedClassName: String - a css class to be applied when the button is focused
 * disabledClassName: String - a css class to be applied when the button is disabled
 * pressedClassName: String - a css class to be applied when the button is pressed
 * primaryClassName: String - a css class to be applied on primary buttons

 * overStyle
 * activeStyle
 * focusedStyle
 * disabledStyle
 * primaryStyle
 * pressedStyle
 * overPrimaryStyle
 * overPressedStyle

 * primary: Boolean
 * disabled: Boolean
 * pressed: Boolean
 * defaultPressed: Boolean

 * href: String - a href to navigate to when the button is clicked. Defaults to ''
 * onToggle: Function(pressed: boolean)