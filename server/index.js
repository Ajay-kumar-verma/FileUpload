import express from 'express'
import fileUpload from 'express-fileupload' 
import fs from 'fs'
import path from 'path'
import cors from 'cors';
const app =express();

const __dirname = path.resolve("../Files");  

console.log({__dirname})

app.use(cors()); // this is for connection 
app.use(express.json());  // this is body 
app.use(fileUpload());  // this is for file 

const PORT = '4000';

app.get("/",(req,res)=>{
    res.send("Server is live ")
})


app.post('/',(req,res) => {

    console.log(req.files);

const uploadFileName =req.files.screenshot.name;

const Mobile = `8095240976`;
const Name =`Ajay kumar verma`;
    const fileName = `${Name}_${Mobile}_${Date.now()}_${uploadFileName}`;
// // console.log(req.files.image)
const file =req.files.screenshot;
let uploadPath = __dirname+"/"+fileName;

file.mv(uploadPath,er =>console.log({er}));
 res.sendStatus(200);
})


app.listen(PORT,()=>{
console.log(`server is running at port ${PORT}`);
})





