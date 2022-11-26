console.log("App file is called start ")
const {google} = require('googleapis');

const fs= require('fs');
const path = require('path');

const client_id ='272200006108-dp1oeoi92ud92egg2lr129vur26ab1n5.apps.googleusercontent.com';
const client_secret ='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';
const redirect_uri = 'https://developers.oogle.com/oauthplayground';
const refreshToken='1//04IvUrsfoSEDVCgYIARAAGAQSNwF-L9Ird7eaaAGx17YVTjSSYzpL1kPrqqQHR_DTkc8e7Pzyb3AsPBX74Ihc7I00SaVJ0G-NDIE';


const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri,
)

oauth2Client.setCredentials({refresh_token:refreshToken})

const drive = google.drive({
    version:'v3',
    auth:oauth2Client
});


async function upload(parents,file,name){
try {
    // uploading in folder 
    // if no parent it upload in main folder 
    const requestBody = {
        name,
         parents:[parents]
      }   
      
      const media = {
        MimeType : 'imgae/jpg',
        body:fs.createReadStream(file)
      }
    

    const rep = await drive.files.create({
        requestBody,
      media
    })
  console.log({rep});  
} catch (error) {
    console.log({error})
}

}


async function fileList(id){
    try {
        const rep = await drive.files.list({
        q: `'${id}' in parents and trashed=false`,
         
        })
      console.log({rep:rep.data.files});  
    } catch (error) {
        console.log({error})
    }
    
    }
    


// const id = '1E-7IhOYPmWhYv4vvVH-cTkw4ox70JSzQ';

async function deleteFile(id){
    try {
        
        const rep = await drive.files.delete({
            fileId:id
        })
      console.log({rep});  
    } catch (error) {
        console.log({error})
    }
    
    }


    
    async function generatePublicUrl(id){
        try {
            const rep = await drive.permissions.create({
                fileId:id,
                requestBody:{
                    role:'reader',
                    type:'anyone'
                }
            })
          console.log({rep});  
const result = await drive.files.get({
    fileId:id,
    fields:'webContentLink ,webViewLink'
})

console.log({result});
        } catch (error) {
            console.log({error})
        }
        }
    

  async function createFolder(parents,name){
            try {
       
    //   const requestBody = {
    //   name,
    //   parents:[parents]
    //      }   
                  
         var fileMetadata = {
          name  ,
         mimeType : 'application/vnd.google-apps.folder',
         parents: [parents]
       };
          const rep = await drive.files.create({
          resource: fileMetadata,
          fields: 'id'             
         })

         console.log({rep});  
     } catch (error) {
    console.log({error})
    }
   }


  const aadharcardlocation = '14gehPs16lPgpyDGasWJYlNSzUn_G7H6o';  
  const photoslocation = '1Fu2JqgMQ2FEMhdEq4m_aB7kh_IffHkqN';

createFolder(photoslocation,"zzzzzzz");

//  const filePath = path.join(__dirname,'image.jpeg')
//  upload(aadharcardlocation,filePath,"adharcard");
//  upload(photoslocation,filePath,"adharcard");
//  generatePublicUrl('1PGEc50xQALJYs-hwWZHeFV4TnViM3J7F');

const folderId = '1WWI3KqChM8HafpZGSiUl6O7SOaooBLm9'
// fileList(folderId); 
// module.exports = {upload,deleteFile,generatePublicUrl,createFolder}
console.log("App END ")
// deleteFile();
// createFolder("bhooth");