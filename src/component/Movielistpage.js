import React from "react";
import Movielist from "./Movielist";
import "../styles.css"
import Movielistheader from "./Movielistheader";
export default function Movielistpage(){
    return (
        <div>
            <Movielistheader/>
            <div className="all-movies-list">
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            <Movielist/>
            </div>
        </div>
    )
}