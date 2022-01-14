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
      let res = this.state.inputValue.toLowerCase();
      res = res.charAt(0).toUpperCase() + res.slice(1);
      this.props.searchBarValue(res);
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