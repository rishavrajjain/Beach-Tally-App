import React,{useEffect,useState} from 'react';
import Cookies from 'universal-cookie';






import axios from 'axios';

import LoadingOverlay from 'react-loading-overlay';
import {Link} from 'react-router-dom';






import { ToastContainer, toast } from 'react-toastify';
import Navbar from './layout/Navbar';

export default function Admin(props) {



    const cookies = new Cookies();
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    const [images,setImages]=useState([])
    const [showImages,setShowImages]=useState(false);



    useEffect(()=>{
        const token = cookies.get('beach-tally-app-token');
        if(token){
            setIsAuthenticated(true);
            const token= cookies.get('beach-tally-app-token')
        
            const configSave={
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-type':'application/json'
                }
            }

            axios.get('https://beach-tally.herokuapp.com/viewImages',configSave).then((res)=>{
                console.log(res);
                setImages(res.data.data)
                setShowImages(true);
            }).catch(err=>{
                console.log(err);
            })
        }
    },[])

    const [loading,setLoading]=useState(false);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const onPasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const submit=async(e)=>{
        e.preventDefault();

        if(password === '' || email === ''){
            
            toast.error('❌ Email or Password cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        setLoading(true);
        try{
            const res= await axios.post('https://beach-tally.herokuapp.com/login',{
                email:email,
                password:password
            })

            cookies.set('beach-tally-app-token',res.data.data.token);
            cookies.set('name',res.data.data.name);
            cookies.set('email',res.data.data.email)
            setIsAuthenticated(true);

            setIsAuthenticated(true);
            const token= cookies.get('beach-tally-app-token')
        
            const configSave={
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-type':'application/json'
                }
            }

            axios.get('https://beach-tally.herokuapp.com/viewImages',configSave).then((res)=>{
                console.log(res);
                setImages(res.data.data)
                setShowImages(true);
            }).catch(err=>{
                console.log(err);
            })
            

            toast.success('🦄 Login Successfull !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setLoading(false);
        }catch(err){
            

            if(err.response.status === 401){
                toast.error('❌ Unauthorized.Invalid credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(err.response.status === 500){
                toast.error('❌ Something went wrong.Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            setLoading(false);
        }
        setLoading(false);
        
    }

    const logout=async(e)=>{
        e.preventDefault();

        const token=cookies.get('beach-tally-app-token');
        console.log(token)
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
             }
        };

        try{
            const res = await axios.post('https://beach-tally.herokuapp.com/logout',{},config);

            cookies.remove('beach-tally-app-token');
            cookies.remove('name');
            cookies.remove('email')
            props.history.push('/');
            toast.success('🦄 Logout Successfull !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        }catch(err){
            console.log(err);
            toast.error('❌ Something went wrong.Please try again after clearing cookies and history.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return isAuthenticated ?(
        <div>
        <Navbar/>
        <div className="container">
        
        <div class="card" style={{marginTop:'4rem'}}>
            <div class="card-header" >
                Admin
            </div>
            <div class="card-body">
                <h5 class="card-title">For Research Use</h5>
                <p>Part of a Citizen Science project and will be used to help scientists conduct research.</p>
                
                <button href="#" class="btn btn-success btn-block" onClick={logout}>Logout</button>
            </div>
        </div>
        <div className="row" style={{marginTop:'3rem'}}>
            {
                showImages? (

                    <div className="row">
                        {
                            images.map(image=>{
                                return(
                                        <div className="col">
                                         <div class="card" style={{width: '18rem'}}>
                                         <img class="card-img-top" src={image.imageUrl} alt="Card image cap"/>
                                         <div class="card-body">
                                             
                                             <Link href="#" class="btn btn-primary" to={{
                                                 pathname:`/analysis/${image._id}`,
                                                 state:{
                                                     url:image.imageUrl
                                                 }
                                             }} >View Analysis</Link>
                                         </div>
                                         </div>
                                         </div>
                                        
                                     
                                )
                            })
                        }
                    
                    </div>
                    ):(
                    <div></div>
                )
                
            }
        </div>
        </div>
        </div>
    ):(
        <div >
        <Navbar/>
        <div className="container">
        
        
            
            
            <div className="container" style={{marginTop:'5rem',marginBottom:'2rem',alignContent:'center'}}>
            
                <div class="card" style={{width: '25rem',margin:'auto'}}>
                <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
                <img class="card-img-top" style={{marginTop:'1rem'}} src="https://i.ibb.co/tCQC7TJ/Untitled-design-28.png" alt="Card image cap"/>
                <div class="card-body" style={{margin:'auto',alignContent:'center',alignItems:'center'}}>
                <h5 class="card-title"></h5>
                <p class="card-text" style={{textAlign:'center'}}>Login</p>

                <form onSubmit={submit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(e)=>onEmailChange(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={(e)=>onPasswordChange(e)}class="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>

              <button className="btn btn-block btn-primary">Submit</button>

              

                
                </form>
                
                
                </div>
                
                </LoadingOverlay>
                </div>
                
            </div>
            
            
            
        </div>
        </div>
    )
}
