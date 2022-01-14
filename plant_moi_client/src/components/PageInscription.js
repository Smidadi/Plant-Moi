import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import Logo from './Logo';
import Field from './Field';

class PageInscription extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            CPassword: '',
            submit: false
        }
    }

    updateUserInfo = (type,value) => {
        switch(type){
            case 'password':
                this.setState({
                    password: value
                })
                break;
            case 'username':
                this.setState({
                    username: value
                })
                break;
            case 'passwordConfirm' :
                this.setState({
                    CPassword: value
                })
                break;
            default :
                this.setState({
                    email: value
                })
                break;
        }
        this.setState({
            submit:false
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submit:true
        })
    }

    componentDidUpdate = () => {
        if(!this.state.submit){
            fetch('http://localhost:5000/inscription',{
                method: 'post',
                body: {
                    "username": this.state.username,
                    "password": this.state.password,
                    "CPassword": this.state.CPassword,
                    "email": this.state.email
                    }
            })
            .then((res) => console.log(res.json))
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row bar"> 
                    <div className="container">
                        <div className="row research">
                            <Logo />
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <form onSubmit={this.handleSubmit}>
                        <Field submit={this.state.submit} type='username' userInfo={this.state.username} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <Field submit={this.state.submit} type='email' new={true} userInfo={this.state.email} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <Field submit={this.state.submit} type='password' new={true} userInfo={this.state.password} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <Field submit={this.state.submit} type='passwordConfirm' userInfo={this.state.CPassword} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <button type="submit" className="form-control btn btn-primary">Submit</button>
                        <div className="dropdown-divider"></div>
                    </form>
                    <Link to="/Connexion">
                        <p>Déjà inscrit ? Connectes toi !</p>
                    </Link>
                </div>
            </div>
        )
    }
}

export default PageInscription;