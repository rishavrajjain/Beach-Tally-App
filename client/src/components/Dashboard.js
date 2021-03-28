import React,{useState} from 'react';
import './dashboard.css';
import axios from 'axios';
import Navbar from './layout/Navbar';
import Cookies from 'universal-cookie';

export default function Dashboard() {

    const [file,setFile]=useState();
    const [count,setCount]=useState(0);
    const [objects,setObjects]=useState([]);


    const cookies= new Cookies();
    const [showCount,setShowCount]=useState(false);
    const [showObjects,setShowObjects]=useState(false);

    const onFileChange=(e)=>{
        var files=e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);

        console.log(filesArr.length)
        setFile(filesArr[0]);

        

       

    }

    const  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            //console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const getUrlfrombase64 = async(base64)=>{
        const data=new FormData();
        data.append('image',base64)
        try{
            const res=await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_CLIENT_API_KEY}`,
                data
            )
            console.log(res);
            return res.data.data.url;
        }catch(err){
            console.log(err);
        }
        
        
    }

    const submit =async()=>{
        try{
        var base64 = await getBase64(file);
        base64=base64.toString();
        console.log(base64)
        const index=base64.search("base64,")
        const image=base64.slice(index+7);

        console.log(image)
        console.log(typeof(image))
        const url=await getUrlfrombase64(image);
        const token= cookies.get('beach-tally-app-token')
        
        const configSave={
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        }

        const saveImage = await axios.post('https://beach-tally.herokuapp.com/saveimage',{
            imageUrl:url
        },configSave);

        if(saveImage.status === 200){
            console.log('done')
        }

        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_OBJECT_DETECTION}`,
                'Ocp-Apim-Subscription-Region':'westus2',
                'Content-Type':'application/json'
            }
           
        }

        
        const res= await axios.post('https://winhacks.cognitiveservices.azure.com/vision/v3.1/detect',{
            url:url
        },config);
        console.log(res);

        const objectsInTheImage=res.data.objects;
        var objs=[];
        var countTemp=0;
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
        
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div>
        <Navbar/>
        <div className="container">
        
        <div className="container" style={{marginTop :'5rem'}}>

        <label>Upload Photo or Take Photo</label>
        <br></br>
        <div style={{alignItems:'center',justifyContent:'center',textAlign:'center',border:'3px dotted #8fd9ea',height:'200px',backgroundColor:'#d3e7ff'}}>
            <i class="fa fa-cloud-upload fa-4x" aria-hidden="true" style={{marginTop:'60px'}}></i>
            <br></br>
            <input style={{marginTop:'30px'}} type="file"  multiple onChange={onFileChange} ></input>
        </div>
        <button className="btn btn-block btn-success" style={{marginTop:'2rem'}} onClick={submit}>Submit</button>
        
        </div>
        {
            showCount ? (
                <div style={{marginTop:'2rem',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                    <h6>The count of people in the Image is {count}</h6>
                </div>

            ):(
                <div></div>
            )
        }
        <h6 style={{marginTop:'2rem'}}>Objects in the Image</h6>
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
        </div>
        </div>
       
    )
}
