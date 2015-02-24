'use strict';

var React = require('react')
var Button = require('./src')

require('./index.styl')

var VALUE = 'xxx'

var App = React.createClass({

    onChange: function(value){
        VALUE = value
        this.setState({})
    },

    render: function() {

        var style = {
            width: '50%'
        }

        function clicked(e){
            console.log('clicked', e)
        }

        // <Field placeholder="x" style={style} label='First Name' value={VALUE} onChange={this.onChange}/>

        return (
            <div className="App" style={{padding: 10}}>
                <Button onClick={clicked}>
                    hello
                </Button>

                <Button href="#test">world</Button>
                <Button primary={true}>primary</Button>
                <Button primary={true} disabled={true}>primary disabled</Button>
                <Button pressed={true}>pressed</Button>
                <Button disabled={true}>disabled</Button>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))