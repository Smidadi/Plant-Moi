import React, { Component } from 'react';
import '../style.css';

class EmailField extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
    }

    emailInput = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    render() {
        return (
            <>
                <label>Email</label>
                <input type="email" className='form-control' onChange={this.emailInput} placeholder='exemple.email@domaine.com'/>
            </>
        )
      }
    }

export default EmailField;