import React, { Component } from 'react';
import logo from "../img/logo.png"

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      researchPlant: 'Rechercher une plante',
      inputValue: ''
    };
  }

  searchBarValue = (event) => {
    this.setState({
      inputValue: event.target.value
    });
    console.log(this.state.inputValue);
  }

  render() {
    return (
        <div class="research">
            <img src={logo} width="40px" height="40px"/> Plant&Moi
            <input type="text" id="searchbar" name="search" onChange={this.searchBarValue} value={this.state.inputValue} placeholder={this.state.researchPlant}/>
        </div>
    )
  }
}

export default Research;