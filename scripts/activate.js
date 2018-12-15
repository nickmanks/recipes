import aws, {S3} from 'aws-sdk';
import {basename} from 'path';
import mime from 'mime-types';
import {pkgRelative} from './lib/utils';
import {version, deployEnv, deployPath, artifactPath} from '../build/config';


const versionRegEx = /x-app-version.+"(.+?)"/;

try {
  aws.config.loadFromPath('./aws-config.json');
} catch {
  // ignore
}

const bucketName = deployEnv;


const printCurrentVersion = async (bucket, stdout)=> {
  try {
    const html = await bucket.getObject({Key: `${deployPath}/index.html`});
    const [, currentVersion] = versionRegEx.exec(html.Body) || [];
    stdout.write(`replacing current version ${currentVersion}\n\n`);
  } catch {
    // ignore
  }
};


const getKeys = (data, nonCachableFiles)=> (
  data.Contents
    .filter((item)=> basename(item.Key) !== 'manifest.json')
    .map((item)=> item.Key)
    .sort((key1, key2)=> {
      const fname1 = basename(key1);
      const fname2 = basename(key2);

      if (key1 > key2 || nonCachableFiles.has(fname1)) {
        return 1;
      } else if (key1 < key2 || nonCachableFiles.has(fname2)) {
        return -1;
      }
      return 0;
    })
);

// eslint-disable-next-line max-statements
const main = async ({stdout})=> {
  stdout.write(`\ndeploying ${artifactPath} -> ${bucketName}/${deployPath}\n`);

  const bucket = new S3({params: {Bucket: bucketName}});
  const nonCachableFiles = new Set(['index.html', 'silent_renew.html']);

  await printCurrentVersion(bucket, stdout);

  const objects = await bucket.listObjectsV2({Prefix: artifactPath}).promise();

  for (const srcKey of getKeys(objects, nonCachableFiles)) {
    const isCachable = !nonCachableFiles.has(basename(srcKey));
    const destKey = `${deployPath}/${pkgRelative(artifactPath, srcKey)}`;

    stdout.write(`  copying ${srcKey} ->\n    ${destKey} ...`);

    await bucket.copyObject({
      Key: destKey,
      // if we deploy to another account's bucket we need to make sure
      // we set an object ACL
      // see https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-auth-workflow-object-operation.html
      ACL: 'public-read',
      CopySource: `/${bucketName}/${srcKey}`,
      ContentType: mime.lookup(srcKey),
      CacheControl: isCachable ? null: 'max-age=0, no-cache',
      MetadataDirective: 'REPLACE',
      Expires: isCachable ? '2100-01-01T00:00:00Z': '2000-01-01T00:00:00Z'
    }).promise();
  }

  stdout.write(`deployed ${version} -> ${bucketName}/${deployPath}\n`);
};


if (require.main === module) {
  // we want to fail the process when async calls fail.
  process.on('unhandledRejection', (err)=> throw err);
  main(process);
}
