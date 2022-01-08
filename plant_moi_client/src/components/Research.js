import React, { Component } from 'react';
import Logo from './Logo';

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
  }

  render() {
    return (
        <div className="col-9 research">
            <Logo />
            <input type="text" id="searchbar" name="search" onChange={this.searchBarValue} value={this.state.inputValue} placeholder={this.state.researchPlant}/>
        </div>
    )
  }  
}

export default Research;