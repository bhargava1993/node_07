const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Configure where and how files are saved
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The folder where files will be saved
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the current timestamp and original extension
        console.log("file----",file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Initialize the multer middleware
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: Limit file size to 5MB
});

// 3. Create the upload endpoint (Single file upload)
// 'myFile' matches the 'name' attribute in the HTML form/frontend payload
app.post('/upload-single', upload.single('myFile'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a file to upload.' });
        }
        
        // Detailed information about the uploaded file is available in req.file
        res.status(200).json({
            message: 'File uploaded successfully!',
            fileDetails: req.file
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Create an endpoint for multiple files (Optional)
app.post('/upload-multiple', upload.array('myFiles', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Please select files to upload.' });
        }
        res.status(200).json({
            message: `${req.files.length} files uploaded successfully!`,
            files: req.files
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});