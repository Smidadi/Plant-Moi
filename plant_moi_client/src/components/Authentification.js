import React, { Component } from 'react';
import connexionImg from '../img/connexion.png';

class Authentification extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
    return (
        <div class="connexion"> 
            <img src={connexionImg} width="90px" height="90px"/>
        </div>
    )
  }
}

export default Authentification;