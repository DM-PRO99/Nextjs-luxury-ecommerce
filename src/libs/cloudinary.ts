import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER = "nextlogin-products",
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn(
    "[cloudinary] Missing credentials. Image uploads will fail without them."
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string, folder = CLOUDINARY_FOLDER) => {
  if (!file) {
    throw new Error("File payload is required");
  }

  const uploadResult = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [{ width: 1200, crop: "limit" }],
  });

  return {
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

