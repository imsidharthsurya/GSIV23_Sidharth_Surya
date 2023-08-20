import React from "react";
import "../styles.css"
var _ = require('lodash');
export default function Movielist(props){
    const {title,poster_path,vote_average,overview}=props.movieInfo;
    return(
        <div className="ml-cont">
            <div className="movie-list-img-cont">
                <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} className="movie-list-img" alt={`${title}_Poster`}/>
            </div>
            <div>
                <div className="movie-title">
                    <span className="movie-name"><strong>{title}</strong></span>
                    <span className="movie-rating">({vote_average==0?"NA":`${_.round(vote_average,1)}★`})</span>
                </div>
                <div className="desc">
                    <span className="movie-desc">{overview.length==0?"NA":overview}</span>
                </div>
            </div>
        </div>
    )
}