import {
  AddressGeometry, Place, PlaceDetailsResponseData, PlaceReview,
} from '@googlemaps/google-maps-services-js';

interface Review extends PlaceReview {
  original_language?: string;
}

export interface PlaceResult extends Place {
  geometry: AddressGeometry;
  place_id: string;
  name: string;
  thumbnail?: string;
  reviews?: Review[];
}

export interface PlaceDetail extends PlaceDetailsResponseData {
  result: PlaceResult;
}

type AuthorAttribution = {
  displayName: string;
  uri: string;
  photoUri: string;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

type PlacePhoto = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
};

type LocalizedText = {
  text: string;
  languageCode: string;
};

type AddressComponent = {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
};

type NewReview = {
  name: string;
  relativePublishTimeDescription: string;
  text: LocalizedText;
  originalText: LocalizedText;
  rating: number;
  authorAttribution: PlacePhoto;
  publishTime: string
};

type PlaceDate = {
  year: number;
  month: number;
  day: number;
};

type BusinessStatus =
  | 'BUSINESS_STATUS_UNSPECIFIED'
  | 'OPERATIONAL'
  | 'CLOSED_TEMPORARILY'
  | 'CLOSED_PERMANENTLY';

type FuelType =
  | 'FUEL_TYPE_UNSPECIFIED'
  | 'DIESEL'
  | 'REGULAR_UNLEADED'
  | 'MIDGRADE'
  | 'PREMIUM'
  | 'SP91'
  | 'SP91_E10'
  | 'SP92'
  | 'SP95'
  | 'SP95_E10'
  | 'SP98'
  | 'SP99'
  | 'SP100'
  | 'LPG'
  | 'E80'
  | 'E85'
  | 'METHANE'
  | 'BIO_DIESEL'
  | 'TRUCK_DIESEL';

type PriceLevel =
  | 'PRICE_LEVEL_UNSPECIFIED'
  | 'PRICE_LEVEL_FREE'
  | 'PRICE_LEVEL_INEXPENSIVE'
  | 'PRICE_LEVEL_MODERATE'
  | 'PRICE_LEVEL_EXPENSIVE'
  | 'PRICE_LEVEL_VERY_EXPENSIVE';

type SecondaryHoursType =
  | 'SECONDARY_HOURS_TYPE_UNSPECIFIED'
  | 'DRIVE_THROUGH'
  | 'HAPPY_HOUR'
  | 'DELIVERY'
  | 'TAKEOUT'
  | 'KITCHEN'
  | 'BREAKFAST'
  | 'LUNCH'
  | 'DINNER'
  | 'BRUNCH'
  | 'PICKUP'
  | 'ACCESS'
  | 'SENIOR_HOURS'
  | 'ONLINE_SERVICE_HOURS';

type OpeningHours = {
  periods: {
    open: {
      date: PlaceDate;
      truncated: boolean;
      day: number;
      hour: number;
      minute: number;
    },
    close: {
      date: PlaceDate;
      truncated: boolean;
      day: number;
      hour: number;
      minute: number;
    }
  }[],
  weekdayDescriptions: string[],
  secondaryHoursType: SecondaryHoursType;
  specialDays: {
    date: PlaceDate;
  }[];
  openNow: boolean;
};

export interface NewPlace {
  name: string;
  id: string;
  displayName: LocalizedText;
  types: string[];
  primaryType: string;
  primaryTypeDisplayName: LocalizedText;
  nationalPhoneNumber: string;
  internationalPhoneNumber: string;
  formattedAddress: string;
  shortFormattedAddress: string;
  addressComponents: AddressComponent[];
  plusCode: {
    globalCode: string;
    compoundCode: string;
  };
  location: LatLng;
  viewport: {
    low: LatLng;
    high: LatLng;
  };
  rating: number;
  googleMapsUri: string;
  websiteUri: string;
  reviews: NewReview[];
  regularOpeningHours: OpeningHours;
  photos: PlacePhoto[];
  adrFormatAddress: string;
  businessStatus: BusinessStatus;
  priceLevel: PriceLevel;
  attributions: {
    provider: string;
    providerUri: string;
  }[],
  iconMaskBaseUri: string;
  iconBackgroundColor: string;
  currentOpeningHours: OpeningHours;
  currentSecondaryOpeningHours: OpeningHours[];
  regularSecondaryOpeningHours: OpeningHours[];
  editorialSummary: LocalizedText;
  paymentOptions: {
    acceptsCreditCards: boolean;
    acceptsDebitCards: boolean;
    acceptsCashOnly: boolean;
    acceptsNfc: boolean
  };
  parkingOptions: {
    freeParkingLot: boolean
    paidParkingLot: boolean;
    freeStreetParking: boolean;
    paidStreetParking: boolean;
    valetParking: boolean;
    freeGarageParking: boolean;
    paidGarageParking: boolean;
  };
  subDestinations: {
    name: string;
    id: string;
  }[],
  fuelOptions: {
    fuelPrices: [
      {
        type: FuelType;
        price: {
          currencyCode: string;
          units: string;
          nanos: number;
        };
        updateTime: string;
      },
    ]
  };
  utcOffsetMinutes: number;
  userRatingCount: number;
  takeout: boolean;
  delivery: boolean;
  dineIn: boolean;
  curbsidePickup: boolean;
  reservable: boolean;
  servesBreakfast: boolean;
  servesLunch: boolean;
  servesDinner: boolean;
  servesBeer: boolean;
  servesWine: boolean;
  servesBrunch: boolean;
  servesVegetarianFood: boolean;
  outdoorSeating: boolean;
  liveMusic: boolean;
  menuForChildren: boolean;
  servesCocktails: boolean;
  servesDessert: boolean;
  servesCoffee: boolean;
  goodForChildren: boolean;
  allowsDogs: boolean;
  restroom: boolean;
  goodForGroups: boolean;
  goodForWatchingSports: boolean;
  accessibilityOptions: {
    wheelchairAccessibleParking: boolean;
    wheelchairAccessibleEntrance: boolean;
    wheelchairAccessibleRestroom: boolean;
    wheelchairAccessibleSeating: boolean;
  }
}
