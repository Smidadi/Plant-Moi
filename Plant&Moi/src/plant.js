import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Research from './components/Research';
import Authentification from './components/Authentification';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: ''};
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
<div class="container-fluid">
        <div class="row bar"> 
            <div class="container">
                <div class="row">
                    <Research />
                    <Authentication />
                </div>
            </div>
        </div>
        <div class="row"> 

        </div>


    </div>
    )
  }
}

export default App;
