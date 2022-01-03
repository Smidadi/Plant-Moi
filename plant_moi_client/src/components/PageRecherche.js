import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../style.css';
import Research from './Research';
import Authentification from './Authentification';

class PageRecherche extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row bar"> 
                    <div className="container">
                        <div className="row">
                            <Research />
                            <Authentification />
                        </div>
                    </div>
                </div>
            </div>
        )
      }
    }

export default PageRecherche;