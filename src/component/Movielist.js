import React from "react";
import "../styles.css"
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
                    <span className="movie-rating">({vote_average==0?"NA":`${vote_average}★`})</span>
                </div>
                <div className="desc">
                    <span className="movie-desc">{overview}</span>
                </div>
            </div>
        </div>
    )
}