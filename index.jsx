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

        function validate(value){
            return value + '' !== ''
        }

        // <Field placeholder="x" style={style} label='First Name' value={VALUE} onChange={this.onChange}/>

        return (
            <div className="App" style={{padding: 10}}>
                <Button overClassName="over">hello
                </Button>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))