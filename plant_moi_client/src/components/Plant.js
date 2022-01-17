import React, { Component } from 'react';
import '../style.css';
import is_liked from "../img/heart_full.png"
import is_loved from "../img/star_full.png"

class Plant extends Component {

  sendPlant = () => {
    this.props.getDisplay(this.props.plantName)
  }

  render() {
    return (
        <>
        <div onClick={this.sendPlant}>
            {this.props.fav === true ? 
            <div className="row plant fav">
                <div className="col-9 replaceText">
                    {this.props.plantName} 
                </div>
                <div className="col-3">
                    <img src={is_loved} alt="coeur vide pas like" width="40px" height="40px" />
                </div>
            </div> 
            : 
            <div className="row plant liked">
                <div className="col-9 replaceText">
                    {this.props.plantName} 
                </div>
                <div className="col-3">
                    <img src={is_liked} alt="coeur de like" width="40px" height="40px" />
                </div>
            </div>}
        </div>
        </>
    )
  }  
}

export default Plant; 