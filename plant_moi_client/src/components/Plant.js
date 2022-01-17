import React, { Component } from 'react';
import '../style.css';
import is_liked from "../img/heart_full.png"
import is_loved from "../img/star_full.png"

class Plant extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      plantName: '',
      fav:''
    }
  }

  render() {
    return (
        <>
            {this.props.fav == true ? 
            <div className="row favPlant">
                <div className="col-9 replaceText">
                    {this.props.plantName} 
                </div>
                <div className="col-3">
                    <img src={is_loved} width="40px" height="40px" />
                </div>
            </div> 
            : 
            <div className="row likedPlants">
                <div className="col-9 replaceText">
                    {this.props.plantName} 
                </div>
                <div className="col-3">
                    <img src={is_liked} width="40px" height="40px" />
                </div>
            </div>}
        </>
    )
  }  
}

export default Plant; 