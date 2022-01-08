import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../style.css';
import Field from './Field';
import Logo from './Logo';

class PageConnexion extends Component {
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
                <Field submit={this.state.submit} type='username'/>
                <br />
                <Field submit={this.state.submit} type='password'/>
                <br />
                <button type="submit" onClick={() => this.setState({submit: true})} className="form-control btn btn-primary">Submit</button>
                <div className="dropdown-divider"></div>
                <Link to="/Inscription">
                    <p>Nouveau ? Inscrit toi !</p>
                </Link>
            </div>
        </div>
        )
      }
    }

export default PageConnexion;