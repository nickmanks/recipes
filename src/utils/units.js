import {roundTo} from '../math/rounding';
import {getRiseRun} from '../photos/pitch';

const ToRads = Math.PI / 180;

/* eslint-disable id-length */
/* eslint-disable no-magic-numbers */
const unitConversions = {
  // Lengths
  m: (length)=> roundTo(length, 2),
  km: (length)=> roundTo(length * 0.001, 4),
  ft: (length)=> roundTo(length * 3.2808, 2),
  yd: (length)=> roundTo(length * 1.0936, 2),
  mi: (length)=> roundTo(length * 0.00062137, 4),
  nmi: (length)=> roundTo(length * 0.00053996, 4),

  // Areas
  m2: (area)=> roundTo(area, 2),
  km2: (area)=> roundTo(area * Math.pow(0.001, 2), 4),
  ft2: (area)=> roundTo(area * Math.pow(3.2808, 2), 2),
  yd2: (area)=> roundTo(area * Math.pow(1.0936, 2), 2),
  mi2: (area)=> roundTo(area * Math.pow(0.00062137, 2), 4),
  nmi2: (area)=> roundTo(area * Math.pow(0.00053996, 2), 4),
  a: (area)=> roundTo(area * 0.000247105, 2),
  ha: (area)=> roundTo(area * 0.0001, 2),

  // Angles
  deg: (angle)=> Math.abs(roundTo(angle, 1)),
  rads: (angle)=> roundTo(angle * ToRads, 1),
  mils: (angle)=> roundTo(angle * 17.777778, 1),
  ratio: (angle)=> getRiseRun(angle)
};

export const convert = (value, unit)=> (unitConversions[unit](value));

export const getDefaultLengthUnit = (locale)=>
  (locale && locale === 'en_us' ? 'ft' : 'm');

export const getDefaultAreaUnit = (locale)=>
  (locale === 'en_us' ? 'ft2' : 'm2');

export const getDefaultPitchUnit = (locale)=>
  (locale === 'en_us' ? 'ratio' : 'deg');
