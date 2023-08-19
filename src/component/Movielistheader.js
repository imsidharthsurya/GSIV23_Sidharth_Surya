import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
export default function Movielistheader(){
    return(
        <div className="header-cont">
            <div className="temp">
                <div className="input-wrapper">
                    <SearchIcon id="searchbar"/>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div><HomeIcon/></div>
        </div>
    )
}