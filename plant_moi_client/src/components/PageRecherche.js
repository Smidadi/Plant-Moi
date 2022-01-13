import React, { Component } from 'react';
import '../style.css';
import Research from './Research';
import Authentification from './Authentification';
import Api from './Api';

class PageRecherche extends Component {
    constructor(props){
        super(props)
        this.state = {
            resultResearch:'',
            inputValue:'Pilea',
            submit: false
        }
    }

    searchBarValue = (value) => {
        this.setState({
          inputValue: value
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row bar"> 
                    <div className="container">
                        <div className="row">
                            <Research inputValue={this.state.inputValue} searchBarValue={this.searchBarValue}/>
                            <Authentification />
                        </div>
                    </div>  
                </div>
                <div className="row">
                    <Api inputValue={this.state.inputValue} searchBarValue={this.searchBarValue}/>
                </div>
            </div>
        )
      }
    }

export default PageRecherche;