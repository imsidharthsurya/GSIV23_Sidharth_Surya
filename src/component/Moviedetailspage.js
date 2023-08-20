import React,{useEffect,useState} from "react";
import Moviedetails from "./Moviedetails";
import LoadingSpinner from "./LoadingSpinner";
import Moviedetailsheader from "./Moviedetailsheader";
import { useParams } from "react-router-dom";   //to get the id of the movie from the endpoint


//two api call & then pass those data as params to movie details & fire those whenver movie id changes

export default function Moviedetailspage(){
    const movieId = useParams().id;
    console.log("movie id is: ",movieId)
    const [allMovieDetails,setAllMovieDetails]=useState({})

    const [allCastDetails,setAllCastDetails]=useState({})
    const [loadingDetails,setLoadingDetails]=useState(true)

    async function getAllMovieDetails(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const res1=await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, requestOptions);
        var data1=await res1.json();
        console.log("data1 ",data1);
        const res2=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, requestOptions);
        var data2=await res2.json();
        console.log("data2 ",data2)
        setAllMovieDetails(data1)  
        setAllCastDetails(data2) 
        console.log("all movie details is: ",allMovieDetails);
        
        console.log("all cast details is: ",allCastDetails)
        setLoadingDetails(false);
    }

    useEffect(()=>{
        getAllMovieDetails();
    },[movieId])
    return (
        <div>
            <Moviedetailsheader/>
            {loadingDetails?<LoadingSpinner/>:<Moviedetails movieInfo={allMovieDetails} castInfo={allCastDetails}/>}
        </div>
    )
}