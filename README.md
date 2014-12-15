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

<Button fn={clicked} activeStyle={{position:'relative', top: 1}} >Save as</Button>

```

## Properties

 * fn: Function - function to be called when the button is clicked
 * overClassName: String - a css class to be applied when the mouse is over the button
 * activeClassName: String - a css class to be applied when the mouse is pressed on the button (the button is in active state)
 * focusedClassName: String - a css class to be applied when the button anchor is focused

 * overStyle
 * activeStyle
 * focusedStyle

 * href: String - a href to navigate to when the button is clicked. Defaults to ''