import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config(); // Make sure this line is present

// Set the AWS credentials (either through environment variables or directly)
AWS.config.update({
    region: process.env.YOUR_REGION,
    credentials: new AWS.Credentials({
      accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
      secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    }),
});

// Create an S3 instance
const s3 = new AWS.S3();

export async function uploadFileToS3(bucketName: string, filePath: string, key: string) {
    console.log({ acces: process.env.YOUR_ACCESS_KEY_ID, sec: process.env.YOUR_SECRET_ACCESS_KEY, rg: process.env.YOUR_REGION });
    console.log({ s3 });


    // Read the file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
    };

    console.log({ params });


    // Uploading files to the bucket
    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully.', data.Location);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}

