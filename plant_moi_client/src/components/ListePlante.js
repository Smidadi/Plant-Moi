import React, { Component } from 'react';
import '../style.css';
import Plant from './Plant';

class ListePlante extends Component {

  constructor(props) {
    super(props);
    this.state = {
        plantName:'',
        likedPlant:[]
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/user/favPlant/'+ localStorage.getItem("username"))
    .then((res) => res.json())
    .then((json) => this.setState({
        plantName: json.namePlant
    }));

    fetch('http://localhost:5000/user/likedPlant/'+ localStorage.getItem("username")).then((res) => res.json())
    .then((json) => this.setState({
        likedPlant: json.slice()
    }));

  }

  test = () => {
    let res;
      for(let i = 0; i < this.state.likedPlant.length; ++i) {
          res += <Plant plantName={this.state.likedPlant[i].namePlant}/>
      }
      return res;
  }

  render() {
    return (
        <>
            <Plant plantName={this.state.plantName}/>
            {test()}
        </>
    )
  }  
}

export default ListePlante; 