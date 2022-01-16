import React, { Component } from 'react';
import logo from "../img/logo.png"

class Logo extends Component {

  redirect = () => {
    window.location.href = "/"
  }
  render() {
    return (
        <>
            <button onClick={this.redirect} className="btnclick"><img src={logo} className="logo" alt="logo plant&moi" width="40px" height="40px"/> &nbsp; Plant&Moi</button>
        </>
    )
  }  
}

export default Logo;