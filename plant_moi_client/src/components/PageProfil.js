import React, { Component } from 'react';
import '../style.css';
import ResearchUser from './ResearchUser';
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

  getDisplay = (val) => {
    this.setState({toDisplay:val})
  }


  sendToBDD = () => {
    fetch("http://localhost:5000/user/note/" + localStorage.getItem("username") + "/" + this.state.toDisplay , {
      method:"PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        note:this.state.text
        })
    })
    .then(response => {
      console.log("res", response)
      response.text().then(text => {
        console.log("ici", text)
      })
  })
    //console.log("send", this.state.text)
  }

  getNoteFromBDD = () => {
    fetch("http://localhost:5000/user/note/" + localStorage.getItem("username") + "/" + this.state.toDisplay)
    .then(response => {
      console.log(response)
      response.text().then(text => {
        this.setState({text:text})
      })
  })
  }

  render() {
    return (
        <div className="container-fluid">
            <div className="row bar"> 
                <div className="container">
                    <div className="row">
                      <ResearchUser inputValue={this.state.inputValue} searchBarValue={this.searchBarValue} placeholder={this.state.researchPlant}/>
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
            {false/*this.state.toDisplay !== ''*/ ?
            <div className="row">
                <textarea className="form-control z-depth-1 textarea" id="exampleFormControlTextarea6" rows="10" placeholder="Petite note pour cette plante"></textarea>
                <button className="submit" onClick={this.sendToBDD}>SUBMIT</button>
            </div>
            : <div className="row"></div>}
        </div>
    )
  }  
}

export default PageProfil; 