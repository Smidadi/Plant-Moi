import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import UsernameField from './UsernameField';
import Logo from './Logo';
import EmailField from './EmailField';
import PasswordField from './PasswordField';

class PageInscription extends Component {

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
                    <EmailField />
                    <br />
                    <PasswordField text='Mot de passe'/>
                    <br />
                    <PasswordField text='Confirmer Mot de passe'/>
                    <br />
                    <button type="submit" className="form-control btn btn-primary">Submit</button>
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