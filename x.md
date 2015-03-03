react-button
============

React Button

## Install

```sh
$ npm install react-button --save
```

## Usage

```jsx
var Button = require('react-button')

function clicked(){}

<Button activeStyle={{position:'relative', top: 1}}>Save as</Button>
<Button onClick={clicked} >Export</Button>
```

`react-button` does not depend on any css files

## Properties

### Actions
 * fn: Function - function to be called when the button is clicked
 * onClick: Function - function to be called when the button is clicked
 * onToggle: Function(pressed: boolean) - called on a button that specifies either `pressed` or `defaultPressed` (as boolean values)
 * onActivate: Function - function called on mousedown over the button - button becomes active
 * onDeactivate: Function - function called on mouseup - button becomes inactive

### Styling with inline styles (preferred)
 * overStyle - style to be applied when the mouse is over the button
 * activeStyle - style to be applied on active button (mousedown over button)
 * focusedStyle - style to be applied to focused button
 * disabledStyle - style to be applied to disabled button
 * primaryStyle
 * pressedStyle

#### Styling combinations
 * pressedPrimaryStyle - style to be applied to a pressed primary toggle button
 * disabledPrimaryStyle - style to be applied to disabled primary button
 * overPrimaryStyle - style to be applied on mouse over a primary button
 * overPressedStyle - style to be applied on mouse over a pressed toggle button

### Styling with CSS classes
 * overClassName: String - a css class to be applied when the mouse is over the button
 * activeClassName: String - a css class to be applied when the mouse is pressed on the button (the button is in active state)
 * focusedClassName: String - a css class to be applied when the button is focused
 * disabledClassName: String - a css class to be applied when the button is disabled
 * pressedClassName: String - a css class to be applied when the button is pressed
 * primaryClassName: String - a css class to be applied on primary buttons

### Other attributes
 * primary: Boolean
 * disabled: Boolean
 * pressed: Boolean
 * defaultPressed: Boolean
 * label - (generally a string) you can specify a label instead of button children. If you specify the label, by default it will be rendered with text-overflow: 'ellipsis'
 * href: String - a href to navigate to when the button is clicked. Defaults to ''
 * align: String - where to align content inside button. Valid values are 'left', 'center', 'right'

## License

#### MIT
## Roadmap