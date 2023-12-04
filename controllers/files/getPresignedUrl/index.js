import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import chalk from 'chalk';
import s3Client from '../../../config/s3client.js';
import { getFolderPath } from '../helpers/getFolderPath.js';

export const getPresignedUrl = async (req, res) => {
  const { fileName, fileType, category } = req.query;
  const folderPath = getFolderPath(category);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${folderPath}${fileName}`,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  });
  console.log(chalk.green('Presigned URL generated successfully'));
  res.json({ url: presignedUrl });
};
