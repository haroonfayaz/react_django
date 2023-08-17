import './App.css';
import Navbar from "./Navbar";
import React from 'react';
import {useRoutes} from 'react-router-dom';
import Student from './Student';
import Employee from './Employee';
import Department from './Department';


function App() {
  const routes = useRoutes([

    {
        path:"/students",
        element:<Student/>
    },
    {
        path:"/employee",
        element:<Employee/>
    },
    {
        path:"/department",
        element:<Department/>
    },

]);
return(
    <>
    <Navbar/> 
    {routes}      
    </>);
}

export default App;
