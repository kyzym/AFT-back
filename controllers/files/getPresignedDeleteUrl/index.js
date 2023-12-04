import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import chalk from 'chalk';
import s3Client from '../../../config/s3client.js';

export const getPresignedDeleteUrl = async (req, res) => {
  const { fileName } = req.query;

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 120,
  });
  console.log(chalk.green('Presigned delete URL generated successfully'));
  res.json({ url: presignedUrl });
};
