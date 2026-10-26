
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = 3000;

const uploadDir = path.join(__dirname, 'uploads');

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Generate timestamp-originalfilename.extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = path.basename(file.originalname);
        const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');

        cb(null, `${timestamp}-${safeName}`);
    }
});

// Validate file size
const limits = {
    fileSize: 5 * 1024 * 1024 // 5 MB
};

// Image upload validation
const imageUpload = multer({
    storage,
    limits,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        const validExtension = allowedExtensions.test(file.originalname);
        const validMimeType = allowedMimeTypes.includes(file.mimetype);

        if (validExtension && validMimeType) {
            return cb(null, true);
        }

        cb(new Error('Only JPG, JPEG, PNG, GIF, and WEBP images are allowed.'));
    }
});

// Excel upload validation
const excelUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        const allowedTypes = {
            '.xlsx': [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ],
            '.xls': [
                'application/vnd.ms-excel',
                'application/octet-stream'
            ],
            '.csv': [
                'text/csv',
                'application/csv',
                'application/vnd.ms-excel',
                'text/plain',
                'application/octet-stream'
            ]
        };

        if (
            allowedTypes[ext] &&
            allowedTypes[ext].includes(file.mimetype)
        ) {
            return cb(null, true);
        }

        cb(new Error('Only .xlsx, .xls, and .csv files are allowed.'));
    }
});

// API 1: Upload image only
app.post('/upload-image', (req, res) => {
    imageUpload.single('myFile')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'Please select an image to upload.'
            });
        }

        return res.status(200).json({
            message: 'Image uploaded successfully!',
            fileName: req.file.filename,
            filePath: req.file.path,
            size: req.file.size
        });
    });
});

// API 2: Upload and read Excel file

app.post('/upload-excel', (req, res) => {
    excelUpload.single('myFile')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'Please select an .xlsx, .xls, or .csv file.'
            });
        }

        const filePath = req.file.path;

        try {
            // Read Excel or CSV file
            const workbook = XLSX.readFile(filePath, {
                cellDates: true
            });

            const sheetName = workbook.SheetNames[0];

            if (!sheetName) {
                throw new Error('The file contains no worksheets or data.');
            }

            const worksheet = workbook.Sheets[sheetName];

            const rows = XLSX.utils.sheet_to_json(worksheet, {
                defval: null
            });

            // Delete uploaded file after reading
            await fs.promises.unlink(filePath);

            return res.status(200).json({
                message: 'File uploaded, read, and deleted successfully!',
                fileName: req.file.filename,
                fileType: path.extname(req.file.originalname).toLowerCase(),
                sheetName,
                totalRows: rows.length,
                data: rows
            });

        } catch (error) {
            // Also delete file if reading or processing fails
            try {
                await fs.promises.unlink(filePath);
            } catch (deleteError) {
                if (deleteError.code !== 'ENOENT') {
                    console.error('File deletion failed:', deleteError.message);
                }
            }

            return res.status(400).json({
                error: error.message || 'Unable to read the uploaded file.'
            });
        }
    });
});


// Handle unexpected upload errors
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(400).json({
        error: err.message || 'Upload failed.'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
