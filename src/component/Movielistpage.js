import React from "react";
import { NavLink } from "react-router-dom";
import Movielist from "./Movielist";
import "../styles.css"
import Movielistheader from "./Movielistheader";
export default function Movielistpage(){
    return (
        <div>
            <Movielistheader/>
            <div className="all-movies-list">
                <NavLink to="/movie/sanket" style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket2"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket3"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket4"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket5"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket6"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket7"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket8"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket9"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
                <NavLink to="/movie/sanket10"style={{textDecoration:"none"}}>
                    <Movielist/>
                </NavLink>
            
            
            </div>
        </div>
    )
}