const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
require('./db/connection');
const userRoutes=require('./routes/user');
const ImageRoutes=require('./routes/images')


const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

app.use(userRoutes);
app.use(ImageRoutes);


const port = process.env.PORT || 8064;

app.listen(port,()=>{
    console.log('Listening on port '+port);
})





