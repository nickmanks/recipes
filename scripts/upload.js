import aws, {S3} from 'aws-sdk';
import {readFile} from 'fs';
import mime from 'mime-types';
import walk from './lib/walk';
import {pkgRelative, pkgDir, promised} from './lib/utils';

import {deployEnv, artifactPath} from '../build/config';


try {
  aws.config.loadFromPath('./aws-config.json');
} catch {
  // ignore
}

const bucketName = deployEnv;
const bucket = new S3({params: {Bucket: bucketName}});


const main = async ({stdout})=> {
  stdout.write(`\nuploading package to ${bucketName}/${artifactPath}\n\n`);

  for await (const file of walk(pkgDir)) {
    const data = await promised(readFile)(file);

    const bucketKey = `${artifactPath}/${pkgRelative(pkgDir, file)}`;

    stdout.write(`  uploading ${file} -> \n    ${bucketKey} ...`);

    const upload = bucket.upload({
      Key: bucketKey,
      ACL: 'bucket-owner-full-control',
      Body: data,
      ContentType: mime.lookup(file),
      MetadataDirective: 'REPLACE',
      Expires: '2100-01-01T00:00:00Z'
    });

    upload.on('httpUploadProgress', ()=> stdout.write('.'));

    await upload.promise();

    stdout.write('done\n');
  }

  stdout.write('package uploaded\n');
};


if (require.main === module) {
  // we want to fail the process when async calls fail.
  process.on('unhandledRejection', (err)=> throw err);
  main(process);
}
