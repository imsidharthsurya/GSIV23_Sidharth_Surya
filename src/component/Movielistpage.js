import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import Movielist from "./Movielist";
import "../styles.css"
// import Movielistheader from "./Movielistheader";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LoadingSpinner from "./LoadingSpinner";
export default function Movielistpage(){

    console.log("movie list page loading again")
    const [upcomingMovies,setUpcomingMovies]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true)
    const allMovies=upcomingMovies.map((movie,ind)=>{
        return <NavLink to={`/movie/${movie.id}`} style={{textDecoration:"none"}}>
                    <Movielist key={movie.id} movieInfo={movie}/>
                </NavLink>
    })

    //get the upcoming movies or the search movie result
    const getUpcomingMovies=async (url,movieSearch)=>{
        // console.log("get upcoming movies fn. called after page value changing or serach movie name changing")
        console.log("url inside getupcoming movies is: ",url)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);
        myHeaders.append("accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        const res=await fetch(url, requestOptions);
        const data=await res.json();
        //when not movie search means page change then append result if movie search then overwrite result
        if(movieSearch==false){
            console.log("new upcoming movies called")
            setUpcomingMovies((oldMovies)=>{
                return [...oldMovies,...data.results]
            })
        }else{
            console.log("movie search called with")
            setUpcomingMovies(data.results)
        }
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
            var lower_date="2000-08-01"
            var limit_date=new Date()
            var curr_month=limit_date.getMonth()
            limit_date.setMonth(curr_month+1)
            // console.log("the new date will be: ",limit_date)
            const offset = limit_date.getTimezoneOffset()
            limit_date = new Date(limit_date.getTime() - (offset*60*1000))
            limit_date= limit_date.toISOString().split('T')[0]
            // console.log("Date in yyyy-mm-dd format is: ",limit_date)
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
            },1000)
            
        }else{
            var movieTimer=setTimeout(()=>{
                var lower_date="2000-08-01"
                var limit_date=new Date()
                var curr_month=limit_date.getMonth()
                limit_date.setMonth(curr_month+1)
                // console.log("the new date will be: ",limit_date)
                const offset = limit_date.getTimezoneOffset()
                limit_date = new Date(limit_date.getTime() - (offset*60*1000))
                limit_date= limit_date.toISOString().split('T')[0]
                // console.log("Date in yyyy-mm-dd format is: ",limit_date)
                setPage(1);
                // console.log("the latest value of page is ",page)
                // var url=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=primary_release_date.desc&primary_release_date.gte=${lower_date}&primary_release_date.lte=${limit_date}&page=${page}`
                // getUpcomingMovies(url,true);
                //true since after done with search we want movies of page 1 & that too overwrite not append
            },1000)
            
        }
        return ()=>clearTimeout(movieTimer)
    },[searchMovieName])


    return (
        <div>
            {/* <Movielistheader/> */}
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
                {allMovies}
            </div>
            {(loading && searchMovieName=="")&& <LoadingSpinner/>}
        </div>
    )
}