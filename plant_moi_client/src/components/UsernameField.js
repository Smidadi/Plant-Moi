import React, { Component } from 'react';
import '../style.css';

class UsernameField extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
    }

    userNameInput = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        return (
            <>
                <label>Nom utilisateur</label>
                <input type="text" className='form-control' onChange={this.userNameInput} placeholder='Nom Utilisateur'/>
            </>
        )
      }
    }

export default UsernameField;