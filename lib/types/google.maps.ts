export interface PlaceResult extends google.maps.places.PlaceResult {
  geometry: google.maps.places.PlaceGeometry;
  place_id: string;
  name: string;
}
