import React from "react";
import Moviedetailspage from "./component/Moviedetailspage"
import Movielistpage from "./component/Movielistpage"
import Errorpage from "./component/Errorpage";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
export default function App(){
    
    return (
        // <Moviedetailspage/>
        // <Movielistpage/>
        <Router>
        <Routes>
                <Route path='/' element={<Movielistpage />}></Route>
                <Route path='/movie/:id' element={<Moviedetailspage />}></Route>
                <Route path='*' element={<Errorpage />}></Route>
        </Routes>
    </Router>
    )
}