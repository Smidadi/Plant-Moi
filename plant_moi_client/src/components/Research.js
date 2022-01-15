import React, { Component } from 'react';
import Logo from './Logo';

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      researchPlant: 'Rechercher une plante',
      inputValue:'',
      propositions:["Pilea","Monstera","Calathea","Alocasia"]
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
    this.suggests()
  }

  suggests = () => {
    fetch("https://api.gbif.org/v1/species/suggest?q=%22" + this.state.inputValue + "%22")
    .then((res) => res.json())
    .then((json) => {
      let tab = []
      for(let i = 0; i<Object.keys(json).length && i<5; ++i)
        tab.push(json[i].canonicalName)
      tab = tab.filter(function(ele , pos){
        return tab.indexOf(ele) === pos;
    })
      this.setState({propositions:tab})
    }) 
  }

  render() {
    return (
        <div className="col-9 research">
            <Logo />
            <input type="text" id="searchbar" name="search" onChange={this.changeInputValue}  onKeyDown= {this.handleKeyDown} placeholder={this.state.researchPlant} list={"propositions"}/>
            <datalist id="propositions">
              {this.state.propositions.map((element, i) => <option value={element}></option>)}
            </datalist>
        </div>
    )
  }  
}

export default Research; 