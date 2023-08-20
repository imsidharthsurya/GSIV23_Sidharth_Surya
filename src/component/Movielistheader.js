import React,{useState,useEffect} from "react";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from "react-router-dom";
import "../styles.css"
export default function Movielistheader(){

    const [searchMovieName,setSearchMovieName]=useState("");
    console.log("movie name to search is: ",searchMovieName)
    function movieChange(event){
        setSearchMovieName(event.target.value)
    }
    useEffect(()=>{
        console.log("movie name to search has been changed")
    },[searchMovieName])
    return(
        <div className="header-cont">
            <div className="temp">
                <div className="input-wrapper">
                    <SearchIcon id="searchbar"/>
                    <input type="text" placeholder="Search" value={searchMovieName} onChange={movieChange}/>
                </div>
            </div>
            <div><NavLink to="/"><HomeIcon/></NavLink></div>
        </div>
    )
}