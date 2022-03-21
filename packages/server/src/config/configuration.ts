export interface Configuration {
  cloudinary: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
}

export default (): Configuration => ({
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
});
