import React, { Component } from 'react';
import connexionImg from '../img/connexion.png';

class Authentification extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
    return (
        <div className="col-3 connexion"> 
            <img src={connexionImg} width="90px" height="90px"/>
        </div>
    )
  }
}

export default Authentification;