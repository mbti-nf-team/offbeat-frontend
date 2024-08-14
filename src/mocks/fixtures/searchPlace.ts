import { PlaceResult, PlaceType1, PlaceType2 } from '@/lib/types/google.maps';

const FIXTURE_SEARCH_PLACE: PlaceResult = {
  formatted_address: '일본 〒812-0018 Fukuoka, Hakata Ward, Sumiyoshi, 1 Chome−2−22 キャナルシティ博多ノースビル B1F',
  geometry: {
    location: undefined,
    viewport: undefined,
  },
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
  icon_background_color: '#FF9E67',
  icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
  name: '이치란 캐널시티하카타점',
  photoUrls: [],
  photos: [
    {
      height: 4032,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/101607458349991007724">林宗漢</a>',
      ],
      getUrl: jest.fn(),
      photo_reference: 'AcJnMuE7VjwmQqrJAibDyW8Qn34f3bFKVfwesDrPqpkYHkcVFLFAKGrCwtLiF7y4HuaMUc_sqtLOArmOB3gtB8yVNr-iZXzelSPiiEhL9g_Aw-AxLM_HYwyq8nt6NKLc8QJGf8gCDswyRUJYYo_pWpzWR0-GYNE1VJuckf71LAgVwLqXDE7h',
      width: 3024,
    },
  ],
  place_id: 'ChIJaxduH76RQTURRutPwIh-GII',
  plus_code: {
    compound_code: 'HCR6+87 후쿠오카시 일본 후쿠오카현',
    global_code: '8Q5GHCR6+87',
  },
  price_level: 2,
  rating: 4,
  types: [
    PlaceType1.meal_takeaway,
    PlaceType1.restaurant,
    PlaceType2.food,
    PlaceType2.point_of_interest,
    PlaceType2.establishment,
  ],
  user_ratings_total: 1639,
};

export default FIXTURE_SEARCH_PLACE;
