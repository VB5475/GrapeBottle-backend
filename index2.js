// const fs = require('fs');
// const { google } = require('googleapis');
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const path = require("path")

// // Load your service account credentials
// const serviceAccount = require('./gapi2.json');

// const app = express();
// const PORT = 4000;

// // Configure Multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Configure OAuth2 client for the service account
// const auth = new google.auth.GoogleAuth({
//     keyFile: './gapi2.json',
//     scopes: ['https://www.googleapis.com/auth/drive.file'],
// });
// // const auth = new google.auth.GoogleAuth({
// //     keyFile: './gapi2.json',
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


// async function imageUpload() {
//     // const count = countImagesInFolder("1_aLuoeBKgHSrLNsfz99JifUhiZzRPsQz")
//     const fileName1 = "pic.jpg"
//     // console.log("count is here")
//     // console.log(count)
//     // Expect 'image' field
//     // console.log("req is here");
//     // console.log(req.file);  // Log the uploaded file details
//     const imagePath = 'pic.jpg'; // This is the path where Multer saved the image

//     try {
//         const fileMetadata = {
//             name: fileName1,
//             parents: ['1_aLuoeBKgHSrLNsfz99JifUhiZzRPsQz'],
//         };

//         // Create a media object using the Buffer data
//         const media = {
//             mimeType: 'application/octet-stream',
//             body: fs.createReadStream(imagePath),
//         };

//         // Upload the file to Google Drive
//         const response = await drive.files.create({
//             resource: fileMetadata,
//             media: media,
//             fields: 'id, webViewLink',
//         });

//         console.log("look at this response")
//         console.log(response)
//         // Clean up: remove the file from the server after upload
//         // fs.unlinkSync(file.path);

//         // Send the link to the uploaded file

//     } catch (error) {
//         console.error('Error uploading to Google Drive:', error);
//     }



// }


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
//         return res.status(400).send('Error: File not found');
//     }

//     try {
//         const fileMetadata = {
//             name: fileName,
//             parents: ['1_aLuoeBKgHSrLNsfz99JifUhiZzRPsQz-Uj8mZ1dZKR'], // Add the Google Drive folder ID
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
//         const fileLink = response.data.webViewLink;
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

// imageUpload()