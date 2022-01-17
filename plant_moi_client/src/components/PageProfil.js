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
      toDisplay:'',
      text:''
    }
  }

  getDisplay = (val, text) => {
    this.setState({toDisplay:val, text:text})
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
                <div className="row api">
                  {this.state.toDisplay !== '' ? <Api inputValue={this.state.toDisplay}/> : <div></div>}
                </div>
              </div>
            </div>
            <div className="row">
                <textarea class="form-control z-depth-1 textarea" id="exampleFormControlTextarea6" rows="10" placeholder="Write something here..."></textarea>
            </div>
        </div>
    )
  }  
}

export default PageProfil; 