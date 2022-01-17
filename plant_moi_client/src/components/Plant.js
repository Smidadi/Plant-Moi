import React, { Component } from 'react';
import '../style.css';

class Plant extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      plantName: ''
    }
  }

  render() {
    return (
        <>
            <div className="row tablePlant">
                {this.props.plantName}
                {this.state.plantName}
            </div>
        </>
    )
  }  
}

export default Plant; 