// The code exports a Multer object upload with diskStorage to save uploaded files to a temp directory with their original filenames.
// Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})