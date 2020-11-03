import * as cloudinary from 'cloudinary';

let configured = false;
/**
 * Returns configured Cloudinary instance
 */
export function getCloudinaryInstance(): typeof cloudinary.v2 {
  if (!configured) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDDINARY_API_SECRET
    });
    configured = true;
    console.log('connected to Cloudinary instance');
  }
  return cloudinary.v2;
}

/**
 * function to upload to cloudinary, returning its public_id
 * @param source photo containing its base64
 * @param folderPath folder where media should be uploaded to, base path is /careeers
 */
export async function uploadPhotoToCloudinary(
  source: string,
  folderPath: string
): Promise<string | void> {
  let cloudinaryId;
  await cloudinary.v2.uploader.upload(
    source,
    { folder: `careeers/${folderPath}`, use_filename: true },
    function (error, result) {
      if (error) {
        console.log({ error });
        return;
      }
      cloudinaryId = result.public_id;
    }
  );
  return cloudinaryId;
}

/**
 * function to delete photo from cloudinary
 * @param source cloudinary id of the photo
 */
export async function deletePhotoFromCloudinary(source: string): Promise<void> {
  cloudinary.v2.uploader.destroy(source, function (error, result) {
    if (error) {
      console.log({ error });
      return;
    }
    console.log({ result });
  });
}
