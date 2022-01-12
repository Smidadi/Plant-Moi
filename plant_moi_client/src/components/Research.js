import React, { Component } from 'react';
import Logo from './Logo';

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      researchPlant: 'Rechercher une plante',
      inputValue:''
    }
  }

  changeInputValue = (event) => {
    this.setState({inputValue:event.target.value});
  }

  handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      this.props.searchBarValue(this.state.inputValue);
    }
  }

  render() {
    return (
        <div className="col-9 research">
            <Logo />
            <input type="text" id="searchbar" name="search" onChange={this.changeInputValue}  onKeyDown= {this.handleKeyDown} placeholder={this.state.researchPlant}/>
        </div>
    )
  }  
}

export default Research; 