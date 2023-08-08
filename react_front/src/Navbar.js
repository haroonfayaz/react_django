import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { NavLink } from 'react-router-dom';
import {FaBars,FaTimes} from 'react-icons/fa';
import { useRef } from "react";

const Navbar =()=>{
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
    return(
             <>
        	<header>
			<h3>Django and React</h3>
			<nav ref={navRef} className='nav'>
				<NavLink to="/students" className='a'>Students</NavLink>
				<NavLink to="/employee"className='a'>Employees</NavLink>
                <NavLink to="/department" className='a'>Departments</NavLink>
           
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
             </>
    )
}
export default Navbar;