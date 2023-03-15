import {
  memo, useEffect, useMemo, useState,
} from 'react';

import { InfoWindowF, MarkerF, useGoogleMap } from '@react-google-maps/api';
import { PlaceGeometry } from 'lib/types/google.maps';

type Props = {
  place: PlaceGeometry;
};

function PlaceResultMarker({ place }: Props) {
  const map = useGoogleMap();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [isVisibleInfoWindow, setIsVisibleInfoWindow] = useState<boolean>(false);
  const [
    placeDetailState, setPlaceDetailState,
  ] = useState<google.maps.places.PlaceResult | null>(null);

  console.log(placeDetailState);

  const icon = useMemo(() => ({
    url: place.icon as string,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
  }), [place.icon]);

  useEffect(() => {
    if (isVisibleInfoWindow) {
      const service = new google.maps.places.PlacesService(map as google.maps.Map);

      service.getDetails({
        placeId: place.place_id as string,
      }, (placeDetail, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetailState(placeDetail);
        }
      });
    }
  }, [isVisibleInfoWindow, map, place.place_id]);

  return (
    <>
      <MarkerF
        icon={icon}
        onClick={() => setIsVisibleInfoWindow(true)}
        title={place.name}
        onLoad={(markerF) => setMarker(markerF)}
        onUnmount={() => setMarker(undefined)}
        position={place.geometry?.location as google.maps.LatLng}
      />
      {isVisibleInfoWindow && placeDetailState && (
        <InfoWindowF
          anchor={marker}
          onCloseClick={() => {
            setIsVisibleInfoWindow(false);
            setPlaceDetailState(null);
          }}
        >
          <div style={{
            background: 'white',
            padding: 15,
          }}
          >
            <h1>{placeDetailState.name}</h1>
            <div>{placeDetailState.formatted_address}</div>
            <div>{`별점: ${placeDetailState.rating}`}</div>
            <div>{`평점 수: ${placeDetailState.user_ratings_total}`}</div>
            <div>{`웹사이트: ${placeDetailState.website}`}</div>
            <div>{`구글 맵 이동: ${placeDetailState.url}`}</div>
            <div style={{ marginBottom: '10px' }}>
              <h4>리뷰</h4>
              {placeDetailState.reviews?.map((review) => (
                <a href={review.author_url} key={review.time} style={{ marginBottom: '10px' }}>
                  <div>{`작성자: ${review.author_name}`}</div>
                  <div>{`언어: ${review.language}`}</div>
                  <div>{review.relative_time_description}</div>
                  <div>{review.text}</div>
                </a>
              ))}
            </div>
          </div>
        </InfoWindowF>
      )}
    </>
  );
}

export default memo(PlaceResultMarker);
