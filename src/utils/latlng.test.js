import {formatLatLng} from '../utils/latlng';

describe('', ()=> {
  const lat = 46.526805;
  const lng = -80.918705;

  it('should properly convert to decimal lat/lng', ()=> {
    expect(formatLatLng(lat, lng)).toEqual('46.526805, -80.918705');
  });

  it('should properly convert to degrees lat/lng', ()=> {
    expect(formatLatLng(lat, lng, 'dms')).toEqual(`46° 31' 36", -80° 55' 7"`);
  });

  it('should return empty string for invalid lat', ()=> {
    expect(formatLatLng(null, lng, 'dms')).toEqual('');
    expect(formatLatLng(undefined, lng, 'dms')).toEqual('');
  });

  it('should return empty string for invalid lng', ()=> {
    expect(formatLatLng(lat, null, 'dms')).toEqual('');
    expect(formatLatLng(lat, undefined, 'dms')).toEqual('');
  });
});
