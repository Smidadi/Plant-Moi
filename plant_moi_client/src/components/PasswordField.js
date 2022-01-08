import React, { Component } from 'react';
import '../style.css';

class PasswordField extends Component {
    constructor(props){
        super(props)
        this.state = {
            password: '',
        }
    }

    passwordInput = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
            <>
                <label>{this.props.text}</label>
                <input type="password" className='form-control' onChange={this.passwordInput}/>
            </>
        )
      }
    }

export default PasswordField;