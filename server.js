//API framework
const express=require('express');
//cross origin resource sharing
const cors=require('cors');
//environment variables
require('dotenv').config();

//database connection
const db=require('./config/db');
//routes
const routes=require('./routes');

//utilization of express
const app=express();
//middle ware
//moment
const moment = require('moment');
//notification
const logger = (req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} - ${moment().format()}`);
    next();
} 
app.use(logger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //this will allow us to read the URL body tags

//use routes
app.use('/api',routes)

//server listening
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});