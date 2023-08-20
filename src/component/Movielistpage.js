import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import Movielist from "./Movielist";
import "../styles.css"
import Movielistheader from "./Movielistheader";
import LoadingSpinner from "./LoadingSpinner";
export default function Movielistpage(){

    const [upcomingMovies,setUpcomingMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true)
    const allMovies=upcomingMovies.map((movie,ind)=>{
        return <NavLink to={`/movie/${movie.id}`} style={{textDecoration:"none"}}>
                    <Movielist key={movie.id} movieInfo={movie}/>
                </NavLink>
    })
    const getUpcomingMovies=async ()=>{
        console.log("get upcoming movies fn. called after page value changing")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var lower_date="2000-08-01"
        var limit_date=new Date()
        var curr_month=limit_date.getMonth()
        limit_date.setMonth(curr_month+1)
        // console.log("the new date will be: ",limit_date)
        const offset = limit_date.getTimezoneOffset()
        limit_date = new Date(limit_date.getTime() - (offset*60*1000))
        limit_date= limit_date.toISOString().split('T')[0]
        // console.log("Date in yyyy-mm-dd format is: ",limit_date)
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=primary_release_date.desc&primary_release_date.gte=${lower_date}&primary_release_date.lte=${limit_date}&page=${page}`, requestOptions);
        const data=await res.json();
        setUpcomingMovies((oldMovies)=>{
           return [...oldMovies,...data.results]
        })
        setLoading(false);
        
    }
    
    const handleInfiniteScroll=async ()=>{
        try{
            if(window.innerHeight+document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
                setLoading(true);
                setPage((oldVal)=>{
                    return oldVal+1
                })
                console.log("new page is called")
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getUpcomingMovies();
    },[page])

    useEffect(()=>{
        window.addEventListener("scroll",handleInfiniteScroll);
    },[])

    return (
        <div>
            <Movielistheader/>
            <div className="all-movies-list">
                {allMovies}
            </div>
            {loading && <LoadingSpinner/>}
        </div>
    )
}