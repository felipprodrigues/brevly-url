import { env } from '@/env';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '../config/r2';

export async function testR2Connection() {
  const testKey = 'r2-connection-test.txt';
  const testContent = 'Cloudflare R2 connection test: ' + new Date().toISOString();

  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_BUCKET,
    Key: testKey,
    Body: testContent,
    ContentType: 'text/plain',
  });

  try {
    await r2.send(command);
    console.log('✅ Successfully uploaded test file to R2:', testKey);
    console.log('URL:', `${env.CLOUDFLARE_PUBLIC_URL}/${testKey}`);
  } catch (err) {
    console.error('❌ Failed to upload test file to R2:', err);
  }
}
