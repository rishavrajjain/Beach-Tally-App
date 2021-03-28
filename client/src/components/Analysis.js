import React,{useEffect,useState} from 'react'
import Navbar from './layout/Navbar';
import axios from 'axios';

export default function Analysis(props) {

    const [count,setCount]=useState(0);
    const [objects,setObjects]=useState([]);


    
    const [showCount,setShowCount]=useState(false);
    const [showObjects,setShowObjects]=useState(false);

    const [extras,setExtras]=useState([]);
    const [showExtras,setShowExtras]=useState(false);

    const [url,setUrl]=useState('');
    useEffect(()=>{
        setUrl(props.location.state.url)

        const getData=async()=>{
            const config={
                headers:{
                    'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_OBJECT_DETECTION}`,
                    'Ocp-Apim-Subscription-Region':'westus2',
                    'Content-Type':'application/json'
                }
               
            }
    
            
            const res= await axios.post('https://winhacks.cognitiveservices.azure.com/vision/v3.1/detect',{
                url:props.location.state.url
            },config);
            console.log(res);
    
            const objectsInTheImage=res.data.objects;
            var objs=[];
            var countTemp=0;
            setExtras(objectsInTheImage)
            for(var i=0;i<objectsInTheImage.length;i++){
                objs.push(objectsInTheImage[i].object);
    
                if(objectsInTheImage[i].object === "person"){
                    countTemp++;
                }
            }
            setCount(countTemp);
            objs=[...new Set(objs)];
            setObjects(objs);
            //setLoading(false)
            setShowCount(true);
            setShowObjects(true);
            setShowExtras(true);
        }

        getData();
        
    },[])
    return (
        <div style={{marginTop:'3rem'}}>
            <Navbar/>
            <div className="container">
                <img className="img-fluid" src={props.location.state.url} style={{margin:'auto',alignSelf:'center',justifyContent:'center'}}></img>

                {
                    showCount ? (
                        <div style={{marginTop:'2rem',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                            <h6>The count of people in the Image is {count}</h6>
                        </div>
        
                    ):(
                        <div></div>
                    )
                }
                <h5 style={{marginTop:'2rem'}}>Objects in the Image</h5>
                {
                    showObjects ? (
                        <div>
                        
                        <div className="sidebar" style={{marginTop:'2rem'}}>
                        <div class="sidebar-item tags">
                            <ul>
                            {
                                objects.map((obj)=>{
                                    return(
                                        <li><a href="#">{obj}</a></li>
                                    )   
                                })
                            }
                            
                            
                            </ul>
        
                  </div>
                  </div>
                        </div>
                    ):(
                        <div></div>
                    )
                }
                {
                    showExtras?(
                        <h5>Detailed Analysis and Info</h5>
                    ):(
                        <div></div>
                    )
                }
                {
                    showExtras ?(
                        
                        <div className="row">
                        
                        <br></br>
                        
                    {
                        extras.map((extra)=>{
                            return(
                                <div className="col">
                                    <div className="card" style={{marginTop:'1rem'}}>
                                    <div className="card-body">
                                        <h6 className="card-title">
                                            { extra.object.toUpperCase()}
                                        </h6>
                                        <p className="card-text">
                                            {'Confidence Score : '}{extra.confidence}
                                            <br></br>
                                            {'Position : '}{JSON.stringify(extra.rectangle)}
                                           
                                        </p>
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
    )
}
