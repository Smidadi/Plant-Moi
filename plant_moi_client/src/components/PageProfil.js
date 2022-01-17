import React, { Component } from 'react';
import '../style.css';
import Research from './Research';
import Authentification from './Authentification';
import ListePlante from './ListePlante';
import Api from './Api';


class PageProfil extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      researchPlant: 'Rechercher un utilisateur',
      inputValue:'',
      toDisplay:''
    }
  }

  getDisplay = (val) => {
    this.setState({toDisplay:val})
    console.log(val)
  }

  render() {
    return (
        <div className="container-fluid">
            <div className="row bar"> 
                <div className="container">
                    <div className="row">
                      <Research inputValue={this.state.inputValue} searchBarValue={this.searchBarValue} placeholder={this.state.researchPlant}/>
                      <Authentification />
                    </div>
                    <div className="row">
                      <div className="col-9"></div>
                      <div className="col-3 replaceUserName">
                        {localStorage.getItem("username")}
                      </div>
                    </div>
                </div>  
            </div>
            <div className="row">
              <div className="col-2 listOfPlants" id="style-15">
                <ListePlante getDisplay={this.getDisplay}/>
              </div>
              <div className="col-10">
                <div className="row">
                  {this.state.toDisplay !== '' ? <Api inputValue={this.state.toDisplay}/> : <div></div>}
                </div>
              </div>
            </div>
        </div>
    )
  }  
}

export default PageProfil; 