import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import chalk from 'chalk';
import s3Client from '../../../config/s3client.js';
import { getFolderPath } from '../helpers/getFolderPath.js';
// import { hasAccessToCategory } from '../helpers/hasAccessToCategory.js';

export const getPresignedDeleteUrl = async (req, res) => {
  const { fileName, category } = req.query;
  // const userRoles = Object.keys(req.roleIds);

  // if (!hasAccessToCategory(userRoles, category)) {
  //   return res.status(403).json({ message: 'Access denied for this category' });
  // }

  const folderPath = getFolderPath(category);
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${folderPath}${fileName}`,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 120,
  });
  console.log(chalk.green('Presigned delete URL generated successfully'));
  res.json({ url: presignedUrl });
};
