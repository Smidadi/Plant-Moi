import React, { Component } from 'react';

class Authentification extends Component {

  constructor(props) {
    super(props);
  }

  callAPI() {
      /*fetch("http://localhost:9000/testAPI/buttonClicked")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);*/
  }

  render() {
    return (
        <div class="col-3 connexion"> 
            <img src="img/connexion.png" width="90px" height="90px"/>
        </div>
    )
  }
}

export default Authentification;