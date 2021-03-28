import React,{useContext,useEffect} from 'react';

import Cookies from 'universal-cookie';

import './home.css'


import Navbar from './layout/Navbar';


const Home = (props) => {

 


  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('easy-flight-token');
    if(token ){
      props.history.push('/dashboard');
    }
    
  }, [])

  

    

    const svg='<div class="container"><div class="row"><div class="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center"><div data-aos="zoom-out"><h1><span>Beach Tally</span> </h1><h2></h2><div class="text-center text-lg-left"><a href="#about" class="btn-get-started scrollto">Get Started</a></div></div></div><div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="300"></div></div></div><svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none"><defs><path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></defs><g class="wave1"><use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)"></g><g class="wave2"><use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)"> </g><g class="wave3"><use xlink:href="#wave-path" x="50" y="9" fill="#fff"></g></svg>'

    const home=(
        <div>
        
        <section id="hero" dangerouslySetInnerHTML={{__html: svg }}>

    

    

  </section>
      <div>
      <section id="features" class="features">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Check The Features</p>
        </div>

        <div class="row" data-aos="fade-left">
          <div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i class="fa fa-picture-o" style={{color: '#ffbb2c'}}></i>
              <h3><a href="">Upload Beach Images</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <i class="fa fa-object-group" style={{color: '#5578ff'}}></i>
              <h3><a href="">Get info about Objects in the image</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
              <i class="fa fa-tachometer" style={{color: '#e80368;'}}></i>
              <h3><a href="">Admin - Dashboard</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <i class="fa fa-bar-chart" style={{color: '#e361ff'}}></i>
              <h3><a href="">Get complete analysis of the Image</a></h3>
            </div>
          </div>
          
          
          
          
          
        </div>

      </div>
    </section>

    
        
      
        </div>

        
      
  
    
  
    
    
        

        
            
        </div>
    )

   
  
   

    return (
        <div>
            <Navbar style={{marginBottom:'2rem'}}/>
            {home}
        </div>
    )
}

export default Home;


