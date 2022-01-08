import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import Logo from './Logo';
import Field from './Field';

class PageInscription extends Component {
    constructor(props){
        super(props);
        this.state = {
            submit: false
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
                    <Field submit={this.state.submit} type='username' new={true}/>
                    <br />
                    <Field submit={this.state.submit} type='email' new={true}/>
                    <br />
                    <Field submit={this.state.submit} type='password' new={true}/>
                    <br />
                    <Field submit={this.state.submit} type='passwordConfirm' new={true}/>
                    <br />
                    <button type="submit" onClick={() => this.setState({submit: true})}className="form-control btn btn-primary">Submit</button>
                    <div className="dropdown-divider"></div>
                    <Link to="/Connexion">
                        <p>Déjà inscrit ? Connectes toi !</p>
                    </Link>
                </div>
            </div>
        )
      }
    }

export default PageInscription;