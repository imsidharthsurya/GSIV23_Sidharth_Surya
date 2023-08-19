import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from "react-router-dom";
export default function Moviedetailsheader(){
    return (
        <div className="header-cont">
            
            <div><NavLink to="/"style={{textDecoration:"none"}}><h3>Movie Details</h3></NavLink></div>
            <div><NavLink to="/"><HomeIcon/></NavLink></div>
        </div>
    )
}