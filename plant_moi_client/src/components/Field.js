import React, { Component } from 'react';
import '../style.css';

class Field extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: '',
            text: '',
            type: ''
        }
    }

    componentDidMount = () => {
        let text = '';
        let type = ''
        switch(this.props.type){
            case 'password':
                text = 'Mot de passe';
                type = 'password';
                break;
            case 'username':
                text = 'Nom utilisateur';
                type = 'text';
                break;
            case 'passwordConfirm' :
                text = 'Confirmer mot de passe';
                type = 'password';
                break;
            default :
                text = 'Email';
                type = 'email   ';
                break;
        }

        this.setState({
            text: text,
            type: type
        })
    }

    takeInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    componentDidUpdate = () => {
        if(this.props.submit){
            this.props.updateUserInfo(this.props.type,this.state.inputValue);
        }
    }
    
    render() {
        return (
            <>
                <label>{this.state.text}</label>
                <input type={this.state.type} className='form-control' onChange={this.takeInputValue}/>
            </>
        )
    }
}


export default Field;