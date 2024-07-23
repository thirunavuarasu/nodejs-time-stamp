import express from 'express';
import cors from 'cors' // cross origin resource sharing
import fs from 'fs'; // file system default package
import { format } from 'Date-fns';


const App= express();   
App.use (cors())
const PORT = 5000; // .env

App.get('/first',(req,res)=>{
    res.status(200).json({message:'hello'})});

App.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
 
 
 App.get('/writereadfile',(req, res)=>{
 
 let  Today = format (new Date(), "dd-MM-yyyy-HH-mm-ss")//16-07-2024-04-19-28
    console.log(Today);
    const filepath = `TimeStamp/${Today}`

     fs.writeFileSync(filepath, `${Today}`, 'utf8');

     
     try{
       let data= fs.readFileSync (filepath, 'utf8');
        res.status(200).send(data);
     }catch(error){
        console.log(error);
     }

    });

    