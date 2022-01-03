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
            <div class="row">
                <Research />
                <Authentification />
            </div>
        )
      }
    }

export default PageRecherche;