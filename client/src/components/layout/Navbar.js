import React,{ useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom';


import './navbar.css'









const Navbar = (props) => {

    
    
    

    


    
    

    

   

    

      

    const openRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top text-light portfolio-navbar">
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Beach Tally</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"><i class="fa fa-bars" style={{color:'#fff'}}></i></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/">Home</a></li>
                   
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/dashboard">Upload Image</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/admin">Admin</Link></li>
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    );

    
    return openRoutes
}

export default Navbar;