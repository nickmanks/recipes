import {convert, getDefaultLengthUnit, getDefaultAreaUnit} from './units';
import {getDefaultPitchUnit} from './units';

const meters = 10;
const kilometers = 0.01;
const miles = 0.0062;
const yards = 10.94;
const feet = 32.81;
const nauticalmiles = 0.0054;
const squaremeters = 1000;
const squarekilometres = 0.001;
const squarefeet = 10763.65;
const squareyards = 1195.96;
const squaremiles = 0.0004;
const squarenauticalmiles = 0.0003;
const acres = 0.25;
const hectares = 0.1;
const degrees = 45;
const ratio = '12 / 12';
const rads = 0.8;
const mils = 800;

describe('convert', ()=> {
  it('should convert from meters to the given unit', ()=> {
    expect(convert(meters, 'km')).toEqual(kilometers);
    expect(convert(meters, 'ft')).toEqual(feet);
    expect(convert(meters, 'yd')).toEqual(yards);
    expect(convert(meters, 'mi')).toEqual(miles);
    expect(convert(meters, 'nmi')).toEqual(nauticalmiles);
  });

  it('should convert from square meters to the given unit', ()=> {
    expect(convert(squaremeters, 'km2')).toEqual(squarekilometres);
    expect(convert(squaremeters, 'ft2')).toEqual(squarefeet);
    expect(convert(squaremeters, 'yd2')).toEqual(squareyards);
    expect(convert(squaremeters, 'mi2')).toEqual(squaremiles);
    expect(convert(squaremeters, 'nmi2')).toEqual(squarenauticalmiles);
    expect(convert(squaremeters, 'a')).toEqual(acres);
    expect(convert(squaremeters, 'ha')).toEqual(hectares);
  });

  it('should convert from deg to the given unit', ()=> {
    expect(convert(degrees, 'ratio')).toEqual(ratio);
    expect(convert(degrees, 'rads')).toEqual(rads);
    expect(convert(degrees, 'mils')).toEqual(mils);
  });
});

describe('getDefaultLengthUnit', ()=> {
  it('returns default unit for each locale', ()=> {
    expect(getDefaultLengthUnit('en_us')).toEqual('ft');
    expect(getDefaultLengthUnit('en_au')).toEqual('m');
  });

  it('returns m if no locale supplied', ()=> {
    expect(getDefaultLengthUnit(null)).toEqual('m');
  });
});

describe('getDefaultAreaUnit', ()=> {
  it('returns default unit for each locale', ()=> {
    expect(getDefaultAreaUnit('en_us')).toEqual('ft2');
    expect(getDefaultAreaUnit('en_au')).toEqual('m2');
  });

  it('returns m2 if no locale supplied', ()=> {
    expect(getDefaultAreaUnit(null)).toEqual('m2');
  });
});

describe('getDefaultPitchUnit', ()=> {
  it('returns default unit for each locale', ()=> {
    expect(getDefaultPitchUnit('en_us')).toEqual('ratio');
    expect(getDefaultPitchUnit('en_au')).toEqual('deg');
  });

  it('returns deg if no locale supplied', ()=> {
    expect(getDefaultPitchUnit(null)).toEqual('deg');
  });
});
