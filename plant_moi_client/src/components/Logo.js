import React, { Component } from 'react';
import logo from "../img/logo.png"

class Logo extends Component {

  render() {
    return (
        <>
            <img src={logo} alt="logo plant&moi" width="40px" height="40px"/> &nbsp; Plant&Moi
        </>
    )
  }  
}

export default Logo;