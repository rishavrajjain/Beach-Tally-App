const express=require('express');
require('dotenv').config()

const User = require('../models/user');
const Image = require('../models/images')
const jwt=require('jsonwebtoken');

const auth=require('../middleware/auth');

const router=express.Router();







router.get('/viewImages',auth,async(req,res)=>{
    try{
        const images = await Image.find({});
        res.status(200).json({
            data:images
        })
    }catch(err){
        res.status(500).json({
            data:{
                message:'Something went wrong Please try again.'
            }
        })
    }
})

router.post('/saveimage',async(req,res)=>{
    const image= new Image(req.body);
    try{
        await image.save();
        res.status(200).json({
            data:image
        })
    }catch(err){
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})






module.exports=router;