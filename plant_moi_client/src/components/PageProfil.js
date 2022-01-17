import React, { Component } from 'react';
import '../style.css';
import Research from './Research';
import Authentification from './Authentification';
import ListePlante from './ListePlante';


class PageProfil extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      researchPlant: 'Rechercher une plante',
      inputValue:''
    }
  }

  render() {
    return (
        <div className="container-fluid">
            <div className="row bar"> 
                <div className="container">
                    <div className="row">
                      <Research inputValue={this.state.inputValue} searchBarValue={this.searchBarValue}/>
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
            <div className="col-3 listOfPlants">
              <ListePlante />
            </div>
            <div className="col-9">
                
            </div>
        </div>
    )
  }  
}

export default PageProfil; 