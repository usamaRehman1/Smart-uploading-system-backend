import cloudinary, { v2 } from "cloudinary";
import { ENV} from "../constant.js"

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
});

export { cloudinary }