import React, { Component, useEffect } from 'react';
import MapWrapper from '../components/MapWrapper';
import '../style.css';
import like from "../img/like.png"
import is_liked from "../img/is_liked.png"
import love from "../img/love.png"
import is_loved from "../img/is_loved.png"

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
            latlng:[]
        }
    }

    componentDidMount = () => {
        fetch("https://api.gbif.org/v1/species/match?name=Pilea").then((res) => res.json()).then((json) => {
            let scName = json.scientificName;
            if(scName === "" || scName === undefined)
                scName = json.acceptedScientificName
            this.setState({
                key:json.usageKey,
                name:json.canonicalName, 
                scientificName:scName,               
                family:json.family
            }); 
        })

        fetch("https://api.gbif.org/v1/occurrence/search?taxonKey=2984417").then((res) => res.json()).then((json) => {
            this.setState({
                statePlant:json.results[1].stateProvince,
                img:json.results[11].media[0].identifier,
                latlng:[json.results[0].decimalLatitude, json.results[0].decimalLongitude]
            }); 
            console.log(json.results[0])
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
                <div className="row"> <img src={this.state.img} width="50%" height="50%"/> </div>
            </div>
            <div className="plantInfo col-6"> 
                <div className="row">
                <MapWrapper LatLong={this.state.latlng}/>
                </div>
            </div>
            </>
        )
      }
    }

export default Api;