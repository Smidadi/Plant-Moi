import React, { Component } from 'react';
import '../style.css';
import Plant from './Plant';

class ListePlante extends Component {

  constructor(props) {
    super(props);
    this.state = {
        fav:''
    }
  }

  test = () => {
    fetch('http://localhost:5000/user/favPlant/'+ localStorage.getItem("username"))
    .then((res) => res.json())
    .then((json) => console.log(json));
  }

  render() {
    return (
        <>
            <Plant plantName={this.test()}/>
            <Plant />
            <Plant />
        </>
    )
  }  
}

export default ListePlante; 