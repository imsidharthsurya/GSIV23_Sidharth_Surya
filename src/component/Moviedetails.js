import React from "react";
import imgsrc from "../img/pic1.jpg"
import "../styles.css"
import Moviedetailsheader from "./Moviedetailsheader";

export default function Moviedetails(){
    return(
    <div className="main-cont">
        <div className="fir-cont">
            <img src={imgsrc} className="movie-details-img"/>
        </div>
        <div className="sec-cont">
            <h3>Movie Title <span className="rating">(Rating)</span></h3>
            <p>Year | Length | Director </p>
            <p>Cast: Actor 1, Actor 2</p>
            <p>Description: Lorem ipsum dolor sit amet. Qui laborum atque non voluptatem quia est aliquam nostrum. Et totam numquam eos deleniti tempore aut Quis illo ea facere animi ut galisum corrupti sed suscipit veniam et voluptas voluptatem.</p>
        </div>
    </div>
    )
}