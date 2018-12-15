import uglify from 'uglify-js';

const minify = (source)=> {
  const {error, code} = uglify.minify(source);
  if (error) {
    throw error;
  }
  return code;
};

export default minify;
