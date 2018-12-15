import uglify from 'uglify-js';
import minify from './minify';


jest.mock('uglify-js', ()=> ({
  minify: jest.fn()
}));


describe('minify()', ()=> {
  it('minifies source', ()=> {
    uglify.minify.mockImplementation(()=> ({code: 'test-code'}));

    const code = minify('const foo = 123;');

    expect(code).toBe('test-code');
    expect(uglify.minify).toHaveBeenCalledWith('const foo = 123;');
  });

  it('throws compilation errors', ()=> {
    uglify.minify.mockImplementation(()=> ({error: 'test-error'}));

    expect(()=> minify('const foo = 123;')).toThrow('test-error');
  });
});
