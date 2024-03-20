const multer = require('multer');
const cloudinary = require('cloudinary');

          
cloudinary.config({ 
  cloud_name: 'dpdmnodil', 
  api_key: '141219417299186', 
  api_secret: 'PdC6OqRQuWzAd8ruSm_aQCTThIk' 
});

  function uploadToCloudinary(fileBuffer, fileType, resUrl = true) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: fileType }, (error, result) => {
          if (!error && result.secure_url) {
            return resUrl ? resolve(result.secure_url) : resolve(result);
          } else {
            return reject(error);
          }
        })
        .end(fileBuffer);
    });
  }


  
const storageTest = multer.memoryStorage(); 
const uploadTest = multer({ storage: storageTest });

  module.exports = {
    uploadToCloudinary,
    uploadTest
  }