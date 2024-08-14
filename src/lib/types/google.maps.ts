interface Review extends google.maps.places.PlaceReview {
  original_language?: Language;
  language: Language;
}

export interface PlacePhoto extends google.maps.places.PlacePhoto {
  photo_reference: string;
  height: number;
  html_attributions: string[];
  width: number;
}

interface PlaceResultResponse extends google.maps.places.PlaceResult {
  photos: PlacePhoto[];
}

export interface PlaceResult extends PlaceResultResponse {
  geometry: google.maps.places.PlaceGeometry;
  place_id: string;
  name: string;
  thumbnail?: string;
  reviews?: Review[];
  country?: google.maps.GeocoderAddressComponent;
  photoUrls: string[];
}

export interface PlaceDetail extends ResponseData {
  result: PlaceResult;
  html_attributions: string[];
}

export type LatLngLiteral = {
  lat: number; lng: number;
};

// NOTE - https://developers.google.com/maps/faq?hl=ko#languagesupport
export type Language = 'ko' | 'en' | 'ja';

export type Status =
  | 'OK'
  | 'INVALID_REQUEST'
  | 'MAX_WAYPOINTS_EXCEEDED'
  | 'MAX_ROUTE_LENGTH_EXCEEDED'
  | 'OVER_DAILY_LIMIT'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'UNKNOWN_ERROR'
  | 'ZERO_RESULTS'
  | 'NOT_FOUND';

interface ResponseData {
  status: Status;
  error_message: string;
  html_attributions?: string[];
  next_page_token?: string;
}

export interface PlacesNearbyResponseData extends ResponseData {
  results: PlaceResultResponse[];
}

export interface PlaceDetailsResponseData extends ResponseData {
  result: PlaceResultResponse;
  html_attributions: string[];
}

export interface TextSearchResponseData extends ResponseData {
  results: PlaceResultResponse[];
}

/**
 * Table 1: Types supported in place search and addition
 *
 * You can use the following values in the types filter for place searches and when adding a place.
 *
 * @see https://developers.google.com/places/web-service/supported_types#table1
 */
export enum PlaceType1 {
  accounting = 'accounting',
  /** indicates an airport. */
  airport = 'airport',
  amusement_park = 'amusement_park',
  aquarium = 'aquarium',
  art_gallery = 'art_gallery',
  atm = 'atm',
  bakery = 'bakery',
  bank = 'bank',
  bar = 'bar',
  beauty_salon = 'beauty_salon',
  bicycle_store = 'bicycle_store',
  book_store = 'book_store',
  bowling_alley = 'bowling_alley',
  bus_station = 'bus_station',
  cafe = 'cafe',
  campground = 'campground',
  car_dealer = 'car_dealer',
  car_rental = 'car_rental',
  car_repair = 'car_repair',
  car_wash = 'car_wash',
  casino = 'casino',
  cemetery = 'cemetery',
  church = 'church',
  city_hall = 'city_hall',
  clothing_store = 'clothing_store',
  convenience_store = 'convenience_store',
  courthouse = 'courthouse',
  dentist = 'dentist',
  department_store = 'department_store',
  doctor = 'doctor',
  drugstore = 'drugstore',
  electrician = 'electrician',
  electronics_store = 'electronics_store',
  embassy = 'embassy',
  fire_station = 'fire_station',
  florist = 'florist',
  funeral_home = 'funeral_home',
  furniture_store = 'furniture_store',
  gas_station = 'gas_station',
  gym = 'gym',
  hair_care = 'hair_care',
  hardware_store = 'hardware_store',
  hindu_temple = 'hindu_temple',
  home_goods_store = 'home_goods_store',
  hospital = 'hospital',
  insurance_agency = 'insurance_agency',
  jewelry_store = 'jewelry_store',
  laundry = 'laundry',
  lawyer = 'lawyer',
  library = 'library',
  light_rail_station = 'light_rail_station',
  liquor_store = 'liquor_store',
  local_government_office = 'local_government_office',
  locksmith = 'locksmith',
  lodging = 'lodging',
  meal_delivery = 'meal_delivery',
  meal_takeaway = 'meal_takeaway',
  mosque = 'mosque',
  movie_rental = 'movie_rental',
  movie_theater = 'movie_theater',
  moving_company = 'moving_company',
  museum = 'museum',
  night_club = 'night_club',
  painter = 'painter',
  /** indicates a named park. */
  park = 'park',
  parking = 'parking',
  pet_store = 'pet_store',
  pharmacy = 'pharmacy',
  physiotherapist = 'physiotherapist',
  plumber = 'plumber',
  police = 'police',
  post_office = 'post_office',
  real_estate_agency = 'real_estate_agency',
  restaurant = 'restaurant',
  roofing_contractor = 'roofing_contractor',
  rv_park = 'rv_park',
  school = 'school',
  secondary_school = 'secondary_school',
  shoe_store = 'shoe_store',
  shopping_mall = 'shopping_mall',
  spa = 'spa',
  stadium = 'stadium',
  storage = 'storage',
  store = 'store',
  subway_station = 'subway_station',
  supermarket = 'supermarket',
  synagogue = 'synagogue',
  taxi_stand = 'taxi_stand',
  tourist_attraction = 'tourist_attraction',
  train_station = 'train_station',
  transit_station = 'transit_station',
  travel_agency = 'travel_agency',
  university = 'university',
  veterinary_care = 'veterinary_care',
  zoo = 'zoo',
}

/**
* Table 2: Additional types returned by the Places service
*
* The following types may be returned in the results of a place search,
* in addition to the types in table 1 above.
* For more details on these types, refer to [Address Types](https://developers.google.com/maps/documentation/geocoding/intro#Types)
* in Geocoding Responses.
*
* @see https://developers.google.com/places/web-service/supported_types#table2
*/
export enum PlaceType2 {
  /**
   * indicates a first-order civil entity below the country level. Within the United States,
   *  these administrative levels are states.
   * Not all nations exhibit these administrative levels. In most cases,
   * `administrative_area_level_1` short names will closely match
   * ISO 3166-2 subdivisions and other widely circulated lists; however this is not guaranteed
   * as our geocoding results are based
   * on a variety of signals and location data.
   */
  administrative_area_level_1 = 'administrative_area_level_1',
  /**
   * indicates a second-order civil entity below the country level.
   *  Within the United States, these administrative levels are counties.
   * Not all nations exhibit these administrative levels.
   */
  administrative_area_level_2 = 'administrative_area_level_2',
  /**
   * indicates a third-order civil entity below the country level.
   *  This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  administrative_area_level_3 = 'administrative_area_level_3',
  /**
   * indicates a fourth-order civil entity below the country level.
   * This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  administrative_area_level_4 = 'administrative_area_level_4',
  /**
   * indicates a fifth-order civil entity below the country level.
   * This type indicates a minor civil division.
   * Not all nations exhibit these administrative levels.
   */
  administrative_area_level_5 = 'administrative_area_level_5',
  archipelago = 'archipelago',
  /** indicates a commonly-used alternative name for the entity. */
  colloquial_area = 'colloquial_area',
  continent = 'continent',
  /** indicates the national political entity, and is typically
   * the highest order type returned by the Geocoder. */
  country = 'country',
  establishment = 'establishment',
  finance = 'finance',
  floor = 'floor',
  food = 'food',
  general_contractor = 'general_contractor',
  geocode = 'geocode',
  health = 'health',
  /** indicates a major intersection, usually of two major roads. */
  intersection = 'intersection',
  landmark = 'landmark',
  /** indicates an incorporated city or town political entity. */
  locality = 'locality',
  /** indicates a prominent natural feature. */
  natural_feature = 'natural_feature',
  /** indicates a named neighborhood */
  neighborhood = 'neighborhood',
  place_of_worship = 'place_of_worship',
  plus_code = 'plus_code',
  point_of_interest = 'point_of_interest',
  /** indicates a political entity. Usually, this type indicates
   * a polygon of some civil administration. */
  political = 'political',
  post_box = 'post_box',
  /** indicates a postal code as used to address postal mail within the country. */
  postal_code = 'postal_code',
  postal_code_prefix = 'postal_code_prefix',
  postal_code_suffix = 'postal_code_suffix',
  postal_town = 'postal_town',
  /** indicates a named location, usually a building or
   * collection of buildings with a common name */
  premise = 'premise',
  room = 'room',
  /** indicates a named route (such as "US 101"). */
  route = 'route',
  street_address = 'street_address',
  street_number = 'street_number',
  /**
   * indicates a first-order civil entity below a locality.
   * For some locations may receive one of the additional types:
   * `sublocality_level_1` to `sublocality_level_5`.
   * Each sublocality level is a civil entity. Larger numbers indicate a smaller
   * geographic area.
   */
  sublocality = 'sublocality',
  sublocality_level_1 = 'sublocality_level_1',
  sublocality_level_2 = 'sublocality_level_2',
  sublocality_level_3 = 'sublocality_level_3',
  sublocality_level_4 = 'sublocality_level_4',
  sublocality_level_5 = 'sublocality_level_5',
  /**
   * indicates a first-order entity below a named location,
   * usually a singular building within a collection of buildings with a
   * common name.
   */
  subpremise = 'subpremise',
  town_square = 'town_square',
}
