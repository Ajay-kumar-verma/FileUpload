import  fs from  'fs';
import  {google}   from  'googleapis'

const google_Folder_Api= '1ynBlK82IFjk950U0KZTde9mmfPoX3Wxk';


async function uploadFile(){

    try {
        const auth = new google.auth.GoogleAuth({ 
        keyFile:'./image.json',
        scopes :['https://www.googleapis.com/auth/drive'] 

        }) 

    const drive = google.drive({
        version:'v3',
        auth
    })    

  const fileName = {
    name:'image.jpeg',
     parents:[google_Folder_Api]
  }   
  
  const media = {
    MimeType : 'imgae/jpg',
    body:fs.createReadStream('./image.jpeg')
  }

  const resp = await drive.files.create({
    resource:fileName,
    media,
    field:'id'
  })

return resp.data;
} catch (error) {
     console.log({error})   
    }
} 
uploadFile().then(res=>console.log({res}));

// `https://drive.google.com/uc?export=view&id=1OSq6iIRDs8TyIEBXrbOqZKwzPnNZUbmu` 


