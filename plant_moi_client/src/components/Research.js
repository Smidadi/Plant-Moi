import React, { Component } from 'react';

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { researchPlant: 'Rechercher une plante'};
  }

  render() {
    return (
        <div class="research">
            <img src='../img/logo.png' width="40px" height="40px"/> Plant&Moi
            <input type="text" id="searchbar" name="search" placeholder={this.state.researchPlant}/>
        </div>
    )
  }
}

export default Research;