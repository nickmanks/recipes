
/* eslint-env node */
/* global STORYBOOK_IMPORT_ENV */
import {configure} from '@storybook/react';
import {resolve} from 'path';
import {findFiles} from '../scripts/lib/find-files';

let filenames = [];
let doImport = null;
if (STORYBOOK_IMPORT_ENV === 'webpack') {
  const req = require.context('../src', true, /.story.js$/);
  filenames = req.keys();
  doImport = req;
} else if (STORYBOOK_IMPORT_ENV === 'jest') {
  filenames = findFiles(resolve(__dirname, '..', 'src'), /.story.js$/);
  doImport = (file)=> require(file);
} else {
  throw new Error('unknown environment running storybook');
}

function loadStories() {
  filenames.forEach((filename)=> doImport(filename));
}

configure(loadStories, module);
