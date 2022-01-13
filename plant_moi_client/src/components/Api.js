import React, { Component, useEffect } from 'react';
import '../style.css';
import plus from "../img/plus.png"

class Api extends Component {
    constructor(props){
        super(props)
        this.state = {
            key:'',
            name:'',
            scientificName:'',
            family:'',
            statePlant:'',
            img:'',
            url:'http://purl.org/dc/terms/identifier'
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
                statePlant:json.results[1].stateProvince,
                img:json.results[11].media[0].identifier
            }); 
        })
    }

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
                fetch("https://api.gbif.org/v1/occurrence/search?taxonKey=" + this.state.key)
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        statePlant:json.results[1].stateProvince,
                        img:json.results[11].media[0].identifier
                    }); 
                })  
            })
        }     
    }


    /* A regler ici : si pas d'images -> ne pas l'afficher ; si plante pas dans l'api : ne rien mettre dans les champs ou message d'erreur ; mettre un bouton favoris pour l'ajouter dans la page de profil ; mettre un bouton add pour la mettre dans notre liste de plante dans profil */

    render() {
        return (
            <>
            <div className="plantInfo col-10"> 
                <div className="row"> <div className="structInfo">Nom :&nbsp;</div>{this.state.name} </div>
                <div className="row"> <div className="structInfo">Nom scientifique :&nbsp;</div>{this.state.scientificName} </div>
                <div className="row"> <div className="structInfo">Famille :&nbsp;</div> {this.state.family} </div>
                <div className="row"> <div className="structInfo">Province :&nbsp;</div>{this.state.statePlant} </div>
            </div>
            <div className="plantInfo col-2">
                <button type="button" className="btn"><img src={plus} width="50px" height="50px"/></button> <button type="button">AIME MOI</button> 
            </div>
            
            <div className="plantInfo"> 
                <div className="col-6"> 
                    <div className="row"> <img src={this.state.img}width="50%" height="50%"/> </div>
                </div>
                <div className="col-6"> 
                    <div className="row">
                        {/*TODO : map*/}
                    </div>
                </div>
            </div>
            </>
        )
      }
    }

export default Api;