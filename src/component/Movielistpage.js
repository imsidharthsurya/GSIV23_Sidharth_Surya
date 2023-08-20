import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import Movielist from "./Movielist";
import "../styles.css"
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LoadingSpinner from "./LoadingSpinner";
import { prepareHeader,getDateRange } from "../utils/utils";
export default function Movielistpage(){

    // console.log("movie list page loading again")
    const [upcomingMovies,setUpcomingMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true)
    const allMovies=upcomingMovies.map((movie)=>{
        return <NavLink to={`/movie/${movie.id}`} style={{textDecoration:"none"}}>
                    <Movielist key={movie.id} movieInfo={movie}/>
                </NavLink>
    })

    //get the upcoming movies or the search movie result
    const getUpcomingMovies=async (url,movieSearch)=>{
        console.log("url inside getupcoming movies is: ",url)
        
        var requestOptions=prepareHeader();
        const res=await fetch(url, requestOptions);
        const data=await res.json();
        //when not movie search means page change then append result if movie search then overwrite result
        if(movieSearch==false){
            console.log("upcoming movies called")
            setUpcomingMovies((oldMovies)=>{
                return [...oldMovies,...data.results]
            })
        }else{
            console.log("movie search called with")
            setUpcomingMovies(data.results)
        }
        //set loading to false since we set the data
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
        //only look for upcoming movies when there is nothing in search array
        if(searchMovieName==""){
            var {lower_date,limit_date}=getDateRange();
            var url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=primary_release_date.desc&primary_release_date.gte=${lower_date}&primary_release_date.lte=${limit_date}&page=${page}`
            //here we can come if we erase search movie name in that case page=1 so if page 1 result overwrite(both case normal ie. 1st time opening or after clearing search movie name) otherwise append
            if(page==1){
                getUpcomingMovies(url,true);
            }else{
                getUpcomingMovies(url,false)
            }
        }else{
            //if we're searching for moving then no need of loading
            setLoading(false)     
        }
    },[page])

    useEffect(()=>{
        window.addEventListener("scroll",handleInfiniteScroll);
    },[])

    //To handle search functionality
    const [searchMovieName,setSearchMovieName]=useState("");
    useEffect(()=>{
        //only search for movies when search movie name has some value and if no search value && page =1 then basic search incase searc for movie then coming
        if(searchMovieName!=""){
           var movieTimer= setTimeout(()=>{
                const searchMovieurl=`https://api.themoviedb.org/3/search/movie?query=${searchMovieName}&include_adult=false&language=en-US&page=1`
                getUpcomingMovies(searchMovieurl,true);
            },800)
            
        }else{
            console.log("search movie becomes empty")
            var movieTimer=setTimeout(()=>{
            var {lower_date,limit_date}=getDateRange();
            
            var url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=primary_release_date.desc&primary_release_date.gte=${lower_date}&primary_release_date.lte=${limit_date}&page=1`
                getUpcomingMovies(url,true)
                console.log("after setting the page in search empty page value is ",page)
            },800)
            
        }
        return ()=>clearTimeout(movieTimer)
    },[searchMovieName])


    return (
        <div>
            <div className="header-cont">
                <div className="temp">
                    <div className="input-wrapper">
                        <SearchIcon id="searchbar"/>
                        <input type="text" placeholder="Search" value={searchMovieName} onChange={(e)=>setSearchMovieName(e.target.value)}/>
                    </div>
                </div>
                <div><NavLink to="/"><HomeIcon/></NavLink></div>
            </div>
            <div className="all-movies-list">
                {allMovies.length==0?<h3 className="no-movie-found">No Movies found!!!</h3>:allMovies}
            </div>
            {(loading && searchMovieName=="")&& <LoadingSpinner/>}
        </div>
    )
}