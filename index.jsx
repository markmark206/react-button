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

        function fn(value){
            console.log('clicked')
        }

        function clicked(){
        }

        // <Field placeholder="x" style={style} label='First Name' value={VALUE} onChange={this.onChange}/>

        return (
            <div className="App" style={{padding: 10}}>
                <Button onClick={clicked}>
                    hello
                </Button>

                <Button>world</Button>
                <Button>me</Button>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))