import fs from 'fs';
import {join} from 'path';


export default (src)=> {
  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, src);
  const source = fs.readFileSync(filePath, 'utf8');
  return source;
};
