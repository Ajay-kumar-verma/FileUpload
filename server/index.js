const express = require('express')
const fileUpload = require('express-fileupload'); 
const fs = require('fs')
// const path = require('path')
const cors = require('cors');
const {upload} =  require('./app'); 
// console.log({upload})

const app =express();

// console.log({__dirname})

app.use(cors()); // this is for connection 
app.use(express.json());  // this is body 
app.use(fileUpload());  // this is for file 

const PORT = '4000';

app.get("/",(req,res)=>{
    res.send("Server is live ")
})


app.post('/', async (req,res) => {
    // console.log(req.files);
const uploadFileName =req.files.screenshot.name;
const Mobile = `8095240976`;
const Name =`Ajay kumar verma`;
    const fileName = `${Name}_${Mobile}_${Date.now()}_${uploadFileName}`;
// // console.log(req.files.image)
const file =req.files.screenshot;
console.log({file})

let uploadPath = __dirname+"/"+fileName;
file.mv(uploadPath,async (er) =>{
     if(er)return ;
     await upload(uploadPath);
     try {
         fs.unlinkSync(uploadPath)
         //file removed
       } catch(err) {
         console.error({err})
    }
    
    
    console.log({er})

});

res.sendStatus(200);

})


app.listen(PORT,()=>{
console.log(`server is running at port ${PORT}`);
})





