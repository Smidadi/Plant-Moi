import React, { Component } from 'react';

class Research extends Component {

  constructor(props) {
    super(props);
    this.state = { researchPlant: 'Rechercher une plante'};
  }

  callAPI() {
      /*fetch("http://localhost:9000/testAPI/buttonClicked")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);*/
  }

  render() {
    return (
        <div class="col-9 research">
            <img src="img/logo.png" width="40px" height="40px"/> Plant\u0026Moi
            <input type="text" id="searchbar" name="search" placeholder={this.state.researchPlant}/>
        </div>
    )
  }
}

export default Research;