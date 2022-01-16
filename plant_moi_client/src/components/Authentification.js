import React, { Component } from 'react';
import { Link } from "react-router-dom";
import connexionImg from '../img/connexion.png';
import deco from '../img/se-deconnecter.png'

class Authentification extends Component { 
  
  deco = () => {
    alert("Vous êtes déconnecté")
    localStorage.setItem("connected", "false")
    window.location.href = "/"
  }
  render() {
    return (
        <div className="col-3 connexion">
        {console.log(localStorage.getItem("connected") === "true")}
          <Link to={(localStorage.getItem("connected") === "true") ? "/Profil" : "/Connexion"}>
            <img src={connexionImg} alt="Logo de connexion" width="90px" height="90px"/>
          </Link>
          {localStorage.getItem("connected") === "true" ? <button className="deco" onClick={this.deco}><img src={deco} className="deco" width="50px"></img></button> : <div></div>}
          
        </div>
        
    )
  }
}

export default Authentification;