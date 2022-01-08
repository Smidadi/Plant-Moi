import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../style.css';
import PasswordField from './PasswordField';
import UsernameField from './UsernameField';
import Logo from './Logo';

class PageConnexion extends Component {
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
                <UsernameField />
                <br />
                <PasswordField text='Mot de passe'/>
                <br />
                <button type="submit" className="form-control btn btn-primary">Submit</button>
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