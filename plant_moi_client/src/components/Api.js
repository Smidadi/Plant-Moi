import React, { Component } from 'react';
import '../style.css';
import not_like from "../img/heart.png"
import is_liked from "../img/heart_full.png"
import not_love from "../img/star.png"
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
            like:not_like,
            love:not_love,
            latlng:[0, 0],
            notFirstTime:false
        }
    }

    /**
     * fonction qui recupere les valeurs a afficher pour la Pilea
     * Affichage page d'accueil
     */
    componentDidMount = () => {
        if(this.state.name !== this.props.inputValue && this.state.notFirstTime===false){
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
            this.setState({notFirstTime:true})
        }     
    }

    /**
     * Recupere le nom de la plante a chercher dans l'API
     */
    componentDidUpdate = () => {
        if(this.state.name !== this.props.inputValue){
            fetch("https://api.gbif.org/v1/species/match?name="+ this.props.inputValue)
            .then((res) =>res.json())
            .then((json) => {
                if(json.matchType === "NONE") {
                    alert("Cette plante n'existe pas !")
                    return
                }

                fetch("http://localhost:5000/user/likedPlant/"+localStorage.getItem('username')+'/'+json.canonicalName)
                .then(response => {
                    response.text().then(text => {
                        if(text === 'Liked')
                            this.setState({like: is_liked});
                        else
                            this.setState({like: not_like});
                    })
                })

                fetch("http://localhost:5000/user/favPlant/"+localStorage.getItem('username'))
                .then(response => {
                    response.text().then(text => {
                        if((JSON.parse(text)).namePlant == this.state.name)
                            this.setState({love: is_loved});
                        else
                            this.setState({love: not_love});
                    })
                })
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
        if(localStorage.getItem('connected') === 'true'){

            if(this.state.like === not_like){
                
                fetch('http://localhost:5000/user/likedPlant/'+localStorage.getItem('username')+'/'+this.state.name,{
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(response => {
                    response.text().then(text => {
                        if(text == 'Done'){
                            this.setState({like: is_liked})
                        }
                    })
                    
                    
                })
            }else{
                fetch('http://localhost:5000/user/likedPlant/'+localStorage.getItem('username')+'/'+this.state.name,{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => {
                    response.text().then(text => {
                        if(text == 'Done')
                            this.setState({like: not_like});
                    });
                });
            }
        }
        else {
            alert("Pour liker cette plante, inscris-toi ou connecte-toi !")
        }
    }

    changeLove = () => { 
        if(localStorage.getItem('connected') == 'true'){

            if(this.state.love == not_love){
                fetch('http://localhost:5000/user/favPlant/'+localStorage.getItem('username')+'/'+this.state.name,{
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => {
                    response.text().then(text => {
                        if(text == 'Done')
                            this.setState({love: is_loved})
                    })
                })
            }else{
                fetch('http://localhost:5000/user/favPlant/'+localStorage.getItem('username'),{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => {
                    response.text().then(text => {
                        if(text == 'Done')
                            this.setState({love: not_love})
                    })
                })
            }
        }
        else {
            alert("Pour aimer cette plante, inscris-toi ou connecte-toi !")
        }
        
    }

    render() {
        console.log("state",this.state)
        return (
            <>
            <div className="plantInfo col-11 marge_left"> 
                <div className="row"> <div className="structInfo">Nom :&nbsp;</div>{this.state.name} </div>
                <div className="row"> <div className="structInfo">Nom scientifique :&nbsp;</div>{this.state.scientificName} </div>
                <div className="row"> <div className="structInfo">Famille :&nbsp;</div> {this.state.family} </div>
                <div className="row"> <div className="structInfo">Province :&nbsp;</div>{this.state.statePlant} </div>
            </div>
            <div className="plantInfo col-1">
                <button type="button" className="like_and_love" onClick={() => this.changeLove()} ><img src={this.state.love} width="50px" height="50px"/></button> 
                <button type="button" className="like_and_love" onClick={() => this.changeLike()} ><img src={this.state.like} width="50px" height="50px"/></button> 
            </div>
            
            <div className="plantInfo col-6 marge_left"> 
                <div className="row"> {this.state.img === undefined ? <div className="noImage"><span>Pas d'image pour cette plante</span></div> :<img id="resizeImg" src={this.state.img} width="auto" max-height="auto"/>} </div>
            </div>
            <div className="plantInfo col-6 marge_right"> 
                <div className="row">
                <SimpleMap LatLong={{lat: this.state.latlng[0],lng: this.state.latlng[1]}} zoom={4}/>
                </div>
            </div>
            </>
        )
      }
    }

export default Api;