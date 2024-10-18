// import { v2 as cloudinary } from 'cloudinary'

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cors = require('cors');
const path = require("path")
require("dotenv").config()

const app = express();
const PORT = 4000;
app.use(cors());

const configPath = path.join(__dirname, "gapi2.json")
console.log("path is here")
console.log(configPath)
const gapiConfig = {
    "type": process.env.GAPI_TYPE,
    "project_id": process.env.GAPI_PROJECT_ID,
    "private_key_id": process.env.GAPI_PRIVATE_KEY_ID,
    "private_key": process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace \\n with actual newlines
    "client_email": process.env.GAPI_CLIENT_EMAIL,
    "client_id": process.env.GAPI_CLIENT_ID,
    "auth_uri": process.env.GAPI_AUTH_URI,
    "token_uri": process.env.GAPI_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.GAPI_AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.GAPI_CLIENT_CERT_URL,
    "universe_domain": process.env.GAPI_UNIVERSE_DOMAIN
};


fs.writeFileSync(configPath, JSON.stringify(gapiConfig, null, 2), 'utf8');




const auth = new google.auth.GoogleAuth({
    keyFile: configPath,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});


// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });
const drive = google.drive({ version: 'v3', auth });



// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Function to upload the file to Cloudinary
const uploadFile = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const driveUpload = async (fileName, imagePath) => {
    try {
        const fileMetadata = {
            name: fileName,
            parents: ['1_aLuoeBKgHSrLNsfz99JifUhiZzRPsQz'],
        };

        // Create a media object using the Buffer data
        const media = {
            mimeType: 'application/octet-stream',
            body: fs.createReadStream(imagePath),
        };

        // Upload the file to Google Drive
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
        });

        // console.log("look at this response")
        // console.log(response.data.webViewLink)

        return response.data.webViewLink
        // Clean up: remove the file from the server after upload
        // fs.unlinkSync(file.path);

        // Send the link to the uploaded file

    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
    }
}



// Route to handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {

    console.log("req came")
    console.log(req)

    // if (req.body.image) res.send({ message: 'File uploaded successfully', url: req.body.image });

    try {
        const fileName = req.file.originalname
        console.log("file name here")
        console.log(fileName)
        const imagePath = req.file.path; // This is the path where Multer saved the image
        console.log("Image path:", imagePath);

        const gDriveURL = await driveUpload(fileName, imagePath)
        console.log(gDriveURL)
        // Check if file exists
        if (!fs.existsSync(imagePath)) {
            console.error('File not found:', imagePath);
            return res.status(400).send('Error: File not found');
        }

        // Upload the file to Cloudinary
        const imageResult = await uploadFile(imagePath);
        console.log("Cloudinary URL:", imageResult.url);
        console.log("g drive URL:", gDriveURL)


        // Send the Cloudinary URL back to the client
        res.send({ message: 'File uploaded successfully', urls: { cloudinaryURL: imageResult.url, gDriveURL: gDriveURL } });

        fs.unlinkSync(imagePath);

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
