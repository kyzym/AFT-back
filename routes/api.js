import express from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../s3/s3client.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const router = express.Router();

router.get('/s3-presigned-url', async (req, res) => {
  const { fileName, fileType } = req.query;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
  };

  try {
    const command = new PutObjectCommand(params);

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    res.json({ url: presignedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);

    res.status(500).send('Error with pre-signed URL');
  }
});

router.get('/s3-presigned-delete-url', async (req, res) => {
  const { fileName } = req.query;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    res.json({ url: presignedUrl });
  } catch (error) {
    console.error('Error generating presigned delete URL:', error);
    res.status(500).send('Error with pre-signed delete URL');
  }
});

export default router;
