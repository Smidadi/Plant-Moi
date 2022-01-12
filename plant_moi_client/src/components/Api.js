import React, { Component, useEffect } from 'react';
import '../style.css';


//"https://api.gbif.org/v1/species/match?name=Calathea"
class Api extends Component {
    constructor(props){
        super(props)
        this.state = {
            key:'',
            name:'',
            scientificName:'',
            family:'',
            statePlant:''
        }
    }

    componentDidMount = () => {
        fetch("https://api.gbif.org/v1/species/match?name=Pilea").then((res) => res.json()).then((json) => {
            this.setState({
                key:json.usageKey,
                name:json.canonicalName, 
                scientificName:json.scientificName,               
                family:json.family
            }); 
        })

        fetch("https://api.gbif.org/v1/occurrence/search?taxonKey=2984417").then((res) => res.json()).then((json) => {
            this.setState({
                statePlant:json.results[1].stateProvince
            }); 
        })
    }

    // useEffect = () => {
    //     console.log("here");
    //     fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
    //         this.setState({name:json.canonicalName});            
    //     });
    // }

    componentDidUpdate = () => {
        if(this.state.name != this.props.inputValue){
            fetch("https://api.gbif.org/v1/species/match?name="+ this.props.inputValue)
            .then((res) =>res.json())
            .then((json) => {
                this.setState({
                    key:json.usageKey,
                    name:json.canonicalName,
                    scientificName:json.scientificName,   
                    family:json.family
                });   
            });

            fetch("https://api.gbif.org/v1/occurrence/search?taxonKey=" + this.state.key)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    statePlant:json.results[1].stateProvince
                }); 
            })
        }     
    }
    // componentDidUpdate = () => {
    //     if(this.props.submit) {
    //         this.setState({name:"Calathea"});
    //         fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
    //             this.setState({name:json.canonicalName}); 
                
    //         });
    //     }
        /*this.setState({name:"yo"});
        fetch("https://api.gbif.org/v1/species/match?name="+ this.state.name).then((res) => res.json()).then((json) => {
            this.setState({name:json.canonicalName}); 
        });*/


    render() {
        return (
            <div className="plantInfo"> 
                <div className="row"> <div className="structInfo">Nom :&nbsp;</div>{this.state.name} </div>
                <div className="row"> <div className="structInfo">Nom scientifique :&nbsp;</div>{this.state.scientificName} </div>
                <div className="row"> <div className="structInfo">Famille :&nbsp;</div> {this.state.family} </div>
                <div className="row"> <div className="structInfo">Province :&nbsp;</div>{this.state.statePlant} </div>
            </div>
        )
      }
    }

export default Api;