import React, { Component } from 'react';
import { Link } from "react-router-dom";
import connexionImg from '../img/connexion.png';

class Authentification extends Component { 

  render() {
    return (
        <div className="col-3 connexion"> 
          <Link to="/Connexion">
            <img src={connexionImg} alt="Logo de connexion" width="90px" height="90px"/>
          </Link>
        </div>
    )
  }
}

export default Authentification;