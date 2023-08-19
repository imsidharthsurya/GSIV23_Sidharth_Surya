import React from "react";
import Movielistheader from "./Movielistheader";
import imgsrc from "../img/pic1.jpg"
import "../styles.css"
export default function Movielist(){
    return(
        <div className="ml-cont">
            <div className="movie-list-img-cont">
                <img src={imgsrc} className="movie-list-img" alt="movie-poster"/>
            </div>
            <div>
                <div className="movie-title">
                    <span className="movie-name"><strong>Movie Tjdstle</strong></span>
                    <span className="movie-rating">(Rating)</span>
                </div>
                <div className="desc">
                    <span className="movie-desc">jdks and tha sa dsf ser sae.</span>
                </div>
            </div>
        </div>
    )
}