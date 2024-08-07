import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "ddlwhkn3b",
    api_key: "814734539723169",
    api_secret: "TvKlJO5Io-37u0B0PyiJ1WUTA1o",
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'people', // Name of the folder in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'], // Allowed file types
    },
  });
  
  const upload = multer({ storage });
  
  export default upload;