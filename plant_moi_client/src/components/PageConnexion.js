import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";
import {ReactSession} from 'react-client-session';
import '../style.css';
import Field from './Field';
import Logo from '../components/Logo'


import UserProfile from '../UserProfile';

class PageConnexion extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            submit: false,
            connected: false
        }
    }

    updateUserInfo = (type,value) => {
        switch(type){
            case 'password':
                this.setState({
                    password: value
                })
                break;
            default :
                this.setState({
                    username: value
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

    componentDidUpdate = async () => {
        if(!this.state.submit){
            await fetch('http://localhost:5000/user/Connexion/'+ this.state.username +"/" + this.state.password)
            .then(async (res) => {
                const response = (await res.text()).toString();
                this.setState({
                    connected: (response === 'In'? true:false)
                });
            })
            .catch(async (res) => await console.log(res));
        }
    }

    render() {
        if(this.state.connected){
            localStorage.setItem("connected", "true")
            localStorage.setItem("username", this.state.username)
            return <Navigate push to="/Profil" />;
        }
        return (
            <div className="container-fluid">
                <div className="row bar"> 
                    <div className="container">
                        <div className="row research">
                                <Logo></Logo>
                        </div>
                    </div>
                </div>
                <div className="container formulaire textColor">
                    <form onSubmit={this.handleSubmit}>
                        <Field submit={this.state.submit} type='username' userInfo={this.state.username} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <Field submit={this.state.submit} type='password' userInfo={this.state.password} updateUserInfo={this.updateUserInfo}/>
                        <br />
                        <button type="submit" onClick={() => this.setState({submit: true})} className="form-control btn btn-success">Submit</button>
                        <div className="dropdown-divider"></div>
                        <Link to="/Inscription">
                            <p className="textColorLink">Nouveau ? Inscrit toi !</p>
                        </Link>
                    </form>
                </div>
        </div>
        )
    }
}

export default PageConnexion;