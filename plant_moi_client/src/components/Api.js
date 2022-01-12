import React, { Component } from 'react';
import '../style.css';


//"https://api.gbif.org/v1/species/match?name=Calathea"
class Api extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:''
        }
    }

    componentDidMount = () => {
        fetch("https://api.gbif.org/v1/occurrence/3042966788").then((res) => res.json()).then((json) => {
            this.setState({name:json.species}); 
        })
    }

    componentDidUpdate = () => {
        if(this.props.submit) {
            this.setState({name:"Calathea"});
            fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
                this.setState({name:json.canonicalName}); 
            });
        }
        /*this.setState({name:"yo"});
        fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
            this.setState({name:json.canonicalName}); 
        });*/
    }

    /*test = () => {
        if(this.props.submit) {
            this.setState({name:"Calathea"});
            fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
                this.setState({name:json.canonicalName}); 
            });
        }
    }*/

    render() {
        return (
            <div onChange={this.test}>
                {this.state.name} 
            </div>
        )
      }
    }

export default Api;