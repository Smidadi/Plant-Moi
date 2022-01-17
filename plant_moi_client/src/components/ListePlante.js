import React, { Component } from 'react';
import '../style.css';
import Plant from './Plant';

class ListePlante extends Component {

  constructor(props) {
    super(props);
    this.state = {
        plantName:'',
        likedPlant:[],
        fav:''
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


  render() {
    return (
        <>
        {this.state.plantName !== "" ? <Plant plantName={this.state.plantName} fav={true}/> : <div></div>}
            
            {
              this.state.likedPlant.map((element) => (
                <Plant plantName={element.namePlant}/>
              ))
            }
        </>
    )
  }  
}

export default ListePlante; 