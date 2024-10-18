// // import { v2 as cloudinary } from 'cloudinary'

// const cloudinary = require('cloudinary').v2;

// const fs = require('fs');
// const { google } = require('googleapis');
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const path = require("path")
// const cors = require('cors');
// // Load your service account credentials
// const serviceAccount = require('./gapi.json');
// require("dotenv").config()

// const app = express();
// const PORT = 4000;
// app.use(cors());

// // Configure Multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Configure OAuth2 client for the service account
// const auth = new google.auth.GoogleAuth({
//     keyFile: './gapi2.json',
//     scopes: ['https://www.googleapis.com/auth/drive.file'],
// });
// // const auth = new google.auth.GoogleAuth({
// //     keyFile: './gapi.json',
// //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
// // });


// const drive = google.drive({ version: 'v3', auth });

// app.use(bodyParser.json());

// async function countImagesInFolder(folderId) {
//     try {
//         // Query to get all image files in the specified folder
//         const response = await drive.files.list({
//             q: `'${folderId}' in parents and mimeType contains 'image/'`, // Filter for image files
//             fields: 'files(id, name)',
//             pageSize: 1000, // Adjust the page size as needed
//         });

//         // Count the number of image files
//         const imageCount = response.data.files.length;

//         console.log(`Number of images in folder: ${imageCount}`);
//         return imageCount;
//     } catch (error) {
//         console.error('Error retrieving files:', error);
//         throw error;
//     }
// }
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// });


// const uploadFile = async (filepath) => {
//     try {
//         const result = cloudinary.uploader.upload(filepath);
//         return result;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }


// // app.post('/upload', upload.single('image'), async (req, res) => {
// //     console.log("image path", req.file)
// //     const imagePath = req.file.path; // This is the path where Multer saved the image
// //     fs.readFile(imagePath, (err, data) => {
// //         if (err) {
// //             return res.status(500).send('Error reading the file.');
// //         }
// //         console.log("image path ")
// //         console.log(imagePath)
// //         // Optionally send the file data as a response
// //         // res.send(`File uploaded and read successfully: ${file.originalname}`);
// //     });
// //     if (!req.file) {
// //         return res.status(400).send('No file uploaded');
// //     }
// //     const filePath = req.file.path
// //     // const filePath = "https://drive.google.com/file/d/1aPiIcjEZZWtXg_H2vmidDtDAqidNO4f9/view?usp=sharing"
// //     // const filePath = path.resolve("./pic.jpg")
// //     const fileName = req.file.originalname;

// //     console.log(fileName)
// //     console.log(filePath)

// //     if (!fs.existsSync(filePath)) {
// //         console.error('File not found:', filePath);
// //         return res.status(400).send('Error: File not found');
// //     }
// //     const imageURL = await uploadFile(filePath)
// //     console.log("url is here")
// //     console.log(imageURL)
// // })


// // Endpoint to upload files
// app.post('/upload', upload.single('image'), async (req, res) => {


//     // const count = countImagesInFolder("1_aLuoeBKgHSrLNsfz99JifUhiZzRPsQz")
//     // console.log("count is here")
//     // console.log(count)
//     // Expect 'image' field
//     console.log("req is here");
//     console.log(req.file);  // Log the uploaded file details
//     const imagePath = req.file.path; // This is the path where Multer saved the image
//     fs.readFile(imagePath, (err, data) => {
//         if (err) {
//             return res.status(500).send('Error reading the file.');
//         }
//         console.log("image path ")
//         console.log(imagePath)
//         // Optionally send the file data as a response
//         // res.send(`File uploaded and read successfully: ${file.originalname}`);
//     });
//     if (!req.file) {
//         return res.status(400).send('No file uploaded');
//     }
//     const filePath = req.file.path
//     // const filePath = "https://drive.google.com/file/d/1aPiIcjEZZWtXg_H2vmidDtDAqidNO4f9/view?usp=sharing"
//     // const filePath = path.resolve("./pic.jpg")
//     const fileName = req.file.originalname;

//     console.log(fileName)
//     console.log(filePath)

//     if (!fs.existsSync(filePath)) {
//         console.error('File not found:', filePath);
//         return res.status(400).send('Error: File not found');
//     }

//     try {
//         const fileMetadata = {
//             name: fileName,
//             parents: ['1ZP7GvcS2qKK8xeJwI7i2r7Iozop-Cpyl'], // Add the Google Drive folder ID
//         };
//         const media = {
//             mimeType: req.file.mimetype,
//             body: fs.createReadStream(filePath),
//         };

//         const response = await drive.files.create({
//             resource: fileMetadata,
//             media: media,
//             fields: 'id, webViewLink',
//         });

//         // Return the Google Drive file link
//         console.log("look at here")
//         // const fileLink = response.data.webViewLink;
//         const fileLink = response.data;
//         console.log("fileLink", fileLink)
//         res.send({ message: 'File uploaded successfully', link: fileLink });
//     } catch (error) {
//         // Enhanced error logging
//         console.error('Error uploading to Google Drive:', error.response ? error.response.data : error);
//         res.status(500).send('File upload failed');
//     } finally {
//         // Clean up the uploaded file
//         try {
//             fs.unlinkSync(filePath);
//         } catch (err) {
//             console.error('Error cleaning up file:', err);
//         }
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
