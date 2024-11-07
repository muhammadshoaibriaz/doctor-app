import axios from "axios";
const CLOUD_NAME = "doyux5mj8";
const API_KEY = "869138434164782";
const API_SECRET = "uOFk1ocUAqFDPRgAxJu3CRd4d4E";
const UPLOAD_PRESET = "my_preset";

export const uploadImageToCloudinary = async (imageUri) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  });
  formData.append("upload_preset", UPLOAD_PRESET);
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
