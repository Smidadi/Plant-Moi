import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import connexionImg from '../img/connexion.png';

import UserProfile from '../UserProfile';

class Authentification extends Component { 

  render() {
    return (
        <div className="col-3 connexion"> 
          <Link to={(ReactSession.get("connected") != true?"/Connexion":"/Profil")}>
            <img src={connexionImg} alt="Logo de connexion" width="90px" height="90px"/>
          </Link>
        </div>
    )
  }
}

export default Authentification;