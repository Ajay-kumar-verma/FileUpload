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


async function upload(){
try {
    
    const rep = await drive.files.create({
        requestBody:{
            name:"adharcard.jpeg",
            mimeType:'image/jpeg',
        },
   media:{
    mimeType:'image/jpeg',
    body:fs.createReadStream(filePath)  
   }
        
    })
  console.log({rep});  
} catch (error) {
    console.log({error})
}

}

upload();