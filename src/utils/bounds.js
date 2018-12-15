export const getBoundsCenter = (bounds)=> ({
  lat: (bounds.south + bounds.north) / 2,
  lng: (bounds.west + bounds.east) / 2
});
