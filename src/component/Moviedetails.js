import React from "react";
import "../styles.css"
var _ = require('lodash');

export default function Moviedetails(props){
    console.log("inside movie details")
    console.log("the props is: ",props)
    const directorArr=[];
    const castArr=[];
    for(var i=0;i<props.castInfo.crew.length;i++){
        if(props.castInfo.crew[i].job && props.castInfo.crew[i].job=="Director"){
            directorArr.push(props.castInfo.crew[i].name)
        }
    }
    for(var i=0;i<props.castInfo.cast.length;i++){
        castArr.push(props.castInfo.cast[i].name)
    }
    var directors=directorArr.join(', ');
    var casts=castArr.join(', ');
    console.log("all the cast is: ",castArr);
    console.log("all the director: ",directorArr)
    var minutes=props.movieInfo.runtime%60;
    var hours=(props.movieInfo.runtime-minutes)/60
    var totalRunTime=(hours < 10 ? "0" : "") + hours.toString() + ":" + (minutes < 10 ? "0" : "") + minutes.toString();
    return(
    <div className="main-cont">
        <div className="fir-cont">
            <img src={`https://image.tmdb.org/t/p/original/${props.movieInfo.poster_path}`} className="movie-details-img"  alt={`${props.movieInfo.title}_Poster`}/>
        </div>
        <div className="sec-cont">
            <h3>{props.movieInfo.title} <span className="rating">({props.movieInfo.vote_average==0?"NA":`${_.round(props.movieInfo.vote_average,1)}★`})</span></h3>
            <p>{props.movieInfo.release_date.substr(0,4)} | {props.movieInfo.runtime!=0?totalRunTime:"NA"} | {directors.length?directors:"NA"}</p>
            <p className="castName">Cast: {casts.length?casts:"NA"}</p>
            <p>Description:{props.movieInfo.overview.length==0?"NA":props.movieInfo.overview}</p>
        </div>
    </div>
    )
}
