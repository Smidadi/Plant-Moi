import React, { Component } from 'react';
import logo from "../img/logo.png"

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { researchPlant: 'Rechercher une plante'};
  }

  render() {
    return (
        <div class="research">
            <img src={logo} width="40px" height="40px"/> Plant&Moi
            <input type="text" id="searchbar" name="search" placeholder={this.state.researchPlant}/>
        </div>
    )
  }
}

export default Research;