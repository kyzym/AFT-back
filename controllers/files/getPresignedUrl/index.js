import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import chalk from 'chalk';
import s3Client from '../../../config/s3client.js';
import { getFolderPath } from '../helpers/getFolderPath.js';
import { v4 as uuidv4 } from 'uuid';
// import { hasAccessToCategory } from '../helpers/hasAccessToCategory.js';

export const getPresignedUrl = async (req, res) => {
  const { fileName, fileType, category } = req.query;
  // const userRoles = Object.keys(req.roleIds);

  // if (!hasAccessToCategory(userRoles, category)) {
  //   return res.status(403).json({ message: 'Access denied for this category' });
  // }

  const folderPath = getFolderPath(category);

  const uniqueFileName = `${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${folderPath}${uniqueFileName}`,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  });
  console.log(chalk.green('Presigned URL generated successfully'));
  res.json({ url: presignedUrl });
};
