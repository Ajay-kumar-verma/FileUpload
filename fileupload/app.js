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

const filePath = path.join(__dirname,'image.jpeg')

async function upload(file){
try {
    

    // uploading in folder 
    // if no parent it upload in main folder 
    const requestBody = {
        name:'NOW',
         parents:['1E-7IhOYPmWhYv4vvVH-cTkw4ox70JSzQ']
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


async function fileList(){
    try {
        // uploading in folder 
        // if no parent it upload in main folder 
        const requestBody = {
         parents:['1E-7IhOYPmWhYv4vvVH-cTkw4ox70JSzQ']
          }   
          
          const media = {
            MimeType : 'imgae/jpg',
            body:fs.createReadStream(filePath)
          }
        
    
        const rep = await drive.files.list({
        //    requestBody,
            // q: 'mimeType=\'image/jpeg\'',
            fileId:'11zfJKdRX407kbxHH4btcubDbwvVZABl5'
            // fields: 'nextPageToken, files(id, name)',
            // id:'11jNmzuoYs5ro6F-nQo-sMZH7kv6akI-3',
            // spaces: 'drive',
            // parents:['1E-7IhOYPmWhYv4vvVH-cTkw4ox70JSzQ']
         
        })
      console.log({rep:rep.data.files});  
    } catch (error) {
        console.log({error})
    }
    
    }
    


const id = '1E-7IhOYPmWhYv4vvVH-cTkw4ox70JSzQ';

async function deleteFile(){
    try {
        
        const rep = await drive.files.delete({
            fileId:id
        })
      console.log({rep});  
    } catch (error) {
        console.log({error})
    }
    
    }


    
    async function generatePublicUrl(){
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
    


   async function createFolder(){
            try {
       
         var fileMetadata = {
          name : 'name',
         mimeType : 'application/vnd.google-apps.folder',
         parents: 'folderIds'
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


export default upload;    

// upload(filePath);
// deleteFile();
// generatePublicUrl();
// createFolder();
// fileList();cd 