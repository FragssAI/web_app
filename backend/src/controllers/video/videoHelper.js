import { S3Client, PutObjectCommand, ListObjectsV2Command,
GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import logger from '../../utils/logger.js';
import config from '../../utils/config.js';

const s3 = new S3Client({
  region: config.S3_REGION,
  credentials: {
    accessKeyId: config.S3_ACCESS,
    secretAccessKey: config.S3_SECRET
  }
})

export const uploadVideo = async (user, videoFile) => {
  if (!videoFile) {
    logger.error("Video file is missing in the request");
    throw new Error("No video file provided.");
  }
  const baseKey = `${user.id}/uploads/${videoFile.originalname.replace(" ", "_")}`; // Use the Clerk user ID as the base key - Direct to upload folder - Go to the original name of the video file

  const params = {
    Bucket: config.S3_BUCKET,
    Key: baseKey,
    Body: videoFile.buffer,
    ContentType: videoFile.mimetype,
    CacheControl: "3600"
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)

  const videoUrl = `https://${config.S3_BUCKET}.s3.${config.S3_REGION}.amazonaws.com/${baseKey}`;
  return videoUrl

};

export const fetchVideos = async (user) => {
  const params = {
    Bucket: config.S3_BUCKET,
    Key: `${user.id}/uploads/`, // Use the Clerk user ID as the base key - Direct to upload folder
  }

  const command = new ListObjectsV2Command(params)

  const { Contents: videos } = await s3.send(command)

  return videos;
};

export const fetchSpecificVideo = async (user, videoName) => {
  const params = {
    Bucket: config.S3_BUCKET,
    Key: `${user.id}/uploads/${videoName}`
  };

  const command = new GetObjectCommand(params);
  const data = await s3.send(command);
  return { body: data.Body, contentType: data.ContentType };
};

export const deleteVideo = async (user, videoName) => {
  const key = `${user.id}/uploads/${videoName}`;
  const params = {
    Bucket: config.S3_BUCKET,
    Key: key
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
