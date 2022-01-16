import React, { Component } from 'react';
import { Link } from "react-router-dom";
import connexionImg from '../img/user.png';
import deco from '../img/se-deconnecter.png'

class Authentification extends Component { 
  
  deco = () => {
    alert("Vous êtes déconnecté")
    localStorage.setItem("connected", "false")
    localStorage.setItem("username", "")
    window.location.href = "/"
  }
  render() {
    return (
        <div className="col-3 connexion">
          <Link to={(localStorage.getItem("connected") === "true") ? "/Profil" : "/Connexion"}>
            <img src={connexionImg} alt="Logo de connexion" className="user" width="40px" height="40px"/>
          </Link>
          {localStorage.getItem("connected") === "true" ? <button className="btnclick user" onClick={this.deco}><img src={deco} width="50px"></img></button> : <div></div>}
          
        </div>
        
    )
  }
}

export default Authentification;