

// import {v2 as cloudinary} from 'cloudinary';

const cloudinary = require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: 'dwdklpted', 
  api_key: '732215915411537', 
  api_secret: 'o63hMgmecJFsuTywdtXNt88iNqI' 
});


module.exports = cloudinary