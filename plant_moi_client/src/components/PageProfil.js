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

  

  changeNote = (event) => {
    this.setState({text:event.target.value});
  } 


  sendToBDD = () => {
    fetch("http://localhost:5000/user/note/" + localStorage.getItem("username") + "/" + this.state.toDisplay , {
      method:"PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        note:this.state.text
        })
    })
  }

  getNoteFromBDD = (val) => {
    console.log(this.state.toDisplay);
    fetch("http://localhost:5000/user/note/" + localStorage.getItem("username") + "/" + val)
    .then(async response => {
      await response.text().then(text => {
        if(text ===" ")
          this.setState({text:" "})
        else
          this.setState({text:text})
      })
    })

  }

  getDisplay = (val) => {
    this.setState({toDisplay:val});
    this.getNoteFromBDD(val);
  }
  

  componentDidMount = async () => {
    await fetch("http://localhost:5000/user/favPlant/"+localStorage.getItem("username"))
    .then(async response => {
      await response.text().then(text => {
        this.setState({toDisplay: JSON.parse(text).namePlant})
        this.getNoteFromBDD(this.state.toDisplay);
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
                <ListePlante getDisplay={this.getDisplay} />
              </div>
              <div className="col-10">
                <div className="row api">
                  {this.state.toDisplay !== '' ? <Api inputValue={this.state.toDisplay} onClick={this.getNoteFromBDD}/> : <div></div>}
                </div>
              </div>
            </div>
            {(this.state.text) === " " ?
            <div className="row">
                <textarea onChange={this.changeNote} className="form-control z-depth-1 textarea" id="exampleFormControlTextarea6" rows="10" placeholder="Petite note pour cette plante"></textarea>
                <button className="submit" onClick={this.sendToBDD}>SUBMIT</button>
            </div>
            : <div className="row">
            <textarea onChange={this.changeNote} className="form-control z-depth-1 textarea" id="exampleFormControlTextarea6" rows="10" value={this.state.text}></textarea>
            <button className="submit" onClick={this.sendToBDD}>SUBMIT</button>
        </div>}
        </div>
    )
  }  
}

export default PageProfil; 