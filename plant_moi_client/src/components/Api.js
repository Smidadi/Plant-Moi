import React, { Component, useEffect } from 'react';
import '../style.css';
import like from "../img/heart.png"
import is_liked from "../img/heart_full.png"
import love from "../img/star.png"
import is_loved from "../img/star_full.png"
import SimpleMap from './SimpleMap';

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
            url:'http://purl.org/dc/terms/identifier',
            like:like,
            love:love,
            latlng:[0, 0]
        }
    }

    componentDidMount = () => {
        if(this.state.name != this.props.inputValue){
            fetch("https://api.gbif.org/v1/species/match?name=Pilea")
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
                    let resultsLen = Object.keys(json.results).length
                    let i = 0
                    while(Object.keys(json.results[i].media).length === 0 && i <= resultsLen){
                        i++
                    }
                    if(i === resultsLen) { //Aucune image dispo
                        this.setState({
                            statePlant:json.results[0].stateProvince,
                            img:undefined
                        });    
                    } else {
                        this.setState({
                            statePlant:json.results[i].stateProvince,
                            img:json.results[i].media[0].identifier,
                            latlng:[json.results[i].decimalLatitude, json.results[i].decimalLongitude]
                        });
                    }

                })  
            })
        }     
    }

    componentDidUpdate = () => {
        if(this.state.name != this.props.inputValue){
            fetch("https://api.gbif.org/v1/species/match?name="+ this.props.inputValue)
            .then((res) =>res.json())
            .then((json) => {
                if(json.matchType === "NONE") {
                    alert("Cette plante n'existe pas !")
                    return
                }
                this.setState({
                    key:json.usageKey,
                    name:json.canonicalName,
                    scientificName:json.scientificName,   
                    family:json.family
                });
                fetch("https://api.gbif.org/v1/occurrence/search?taxonKey=" + this.state.key)
                .then((res) => res.json())
                .then((json) => {
                    let resultsLen = Object.keys(json.results).length
                    let i = 0
                    try {
                        while(Object.keys(json.results[i].media).length === 0 && i <= resultsLen){
                            i++
                        }
                    } catch(error) {}
                    if(i === resultsLen) { //Aucune image dispo
                        this.setState({
                            statePlant:json.results[0].stateProvince,
                            img:undefined
                        });    
                    } else {
                        this.setState({
                            statePlant:json.results[i].stateProvince,
                            img:json.results[i].media[0].identifier,
                            latlng:[json.results[i].decimalLatitude, json.results[i].decimalLongitude]
                        });
                    }

                })  
            })
        }     
    }

    changeLike = () => { 
        if(this.state.like == like)
            this.setState({like: is_liked})
        else 
            this.setState({like: like})
    }

    changeLove = () => { 
        if(this.state.love == love)
            this.setState({love: is_loved})
        else 
            this.setState({love: love})
    }


    /* A regler ici : si pas d'images -> ne pas l'afficher ; si plante pas dans l'api : ne rien mettre dans les champs ou message d'erreur ; mettre un bouton favoris pour l'ajouter dans la page de profil ; mettre un bouton add pour la mettre dans notre liste de plante dans profil */

    render() {
        return (
            <>
            <div className="plantInfo col-11"> 
                <div className="row"> <div className="structInfo">Nom :&nbsp;</div>{this.state.name} </div>
                <div className="row"> <div className="structInfo">Nom scientifique :&nbsp;</div>{this.state.scientificName} </div>
                <div className="row"> <div className="structInfo">Famille :&nbsp;</div> {this.state.family} </div>
                <div className="row"> <div className="structInfo">Province :&nbsp;</div>{this.state.statePlant} </div>
            </div>
            <div className="plantInfo col-1">
                <button type="button" className="like_and_love" onClick={() => this.changeLove()} ><img src={this.state.love} width="50px" height="50px"/></button> 
                <button type="button" className="like_and_love" onClick={() => this.changeLike()} ><img src={this.state.like} width="50px" height="50px"/></button> 
            </div>
            
            <div className="plantInfo col-6"> 
                <div className="row"> {this.state.img === undefined ? <div className="noImage"><span>Pas d'image pour cette plante</span></div> :<img src={this.state.img} width="50%" height="50%"/>} </div>
            </div>
            <div className="plantInfo col-6"> 
                <div className="row">
                <SimpleMap LatLong={{lat: this.state.latlng[0],lng: this.state.latlng[1]}} zoom={3}/>
                </div>
            </div>
            </>
        )
      }
    }

export default Api;