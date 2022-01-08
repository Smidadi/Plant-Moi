import React, { Component } from 'react';
import '../style.css';
import Research from './Research';
import Authentification from './Authentification';

class PageRecherche extends Component {

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