const mongoose=require('mongoose');

const imageSchema=mongoose.Schema({
    imageUrl:{
        type:String
    },
    
    
},{
    timestamps:true
})


const Image=mongoose.model('Image',imageSchema);
module.exports=Image;