import React from "react";
import Moviedetails from "./Moviedetails";
import Moviedetailsheader from "./Moviedetailsheader";
import { useParams } from "react-router-dom";   //to get the id of the movie from the endpoint


export default function Moviedetailspage(){
    const movieId = useParams().id;
    console.log("movie id is: ",movieId)
    return (
        <div>
            <Moviedetailsheader/>
            <Moviedetails/>
        </div>
    )
}