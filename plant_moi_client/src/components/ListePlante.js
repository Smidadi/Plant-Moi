import React, { Component } from 'react';
import '../style.css';
import Plant from './Plant';

class ListePlante extends Component {

  constructor(props) {
    super(props);
    this.state = {
        plantName:'',
        likedPlant:[],
        fav:'',
        toDisplay:''
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

  getDisplay = (val) => {
    this.setState({toDisplay:val})
    this.props.getDisplay(val)
  }


  render() {
    return (
        <>
        {this.state.plantName !== "" ? <Plant getDisplay={this.getDisplay} plantName={this.state.plantName} fav={true}/> : <div></div>}
            {
              this.state.likedPlant.map((element) => (
                <Plant getDisplay={this.getDisplay} plantName={element.namePlant}/>
              ))
            }
        </>
    )
  }  
}

export default ListePlante; 