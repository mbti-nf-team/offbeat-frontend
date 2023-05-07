import {
  memo, useEffect, useMemo, useState,
} from 'react';

import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import useGetPlaceDetails from 'hooks/maps/useGetPlaceDetails';
import { PlaceResult } from 'lib/types/google.maps';

type Props = {
  place: PlaceResult;
};

function PlaceResultMarker({ place }: Props) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [isVisibleInfoWindow, setIsVisibleInfoWindow] = useState<boolean>(false);
  const [placeDetailsState, onGetPlaceDetails, resetPlaceDetails] = useGetPlaceDetails();

  // TODO - 추후 삭제 (콘솔 확인용)
  console.info(placeDetailsState);

  const icon = useMemo(() => ({
    url: place.icon as string,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
  }), [place.icon]);

  useEffect(() => {
    if (isVisibleInfoWindow && place?.place_id) {
      onGetPlaceDetails(place.place_id);
    }
  }, [isVisibleInfoWindow, onGetPlaceDetails, place?.place_id]);

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
      {isVisibleInfoWindow && placeDetailsState && (
        <InfoWindowF
          anchor={marker}
          onCloseClick={() => {
            setIsVisibleInfoWindow(false);
            resetPlaceDetails();
          }}
        >
          <div style={{
            background: 'white',
            padding: 15,
          }}
          >
            <h1>{placeDetailsState.name}</h1>
            <div>{placeDetailsState.formatted_address}</div>
            <div>{`별점: ${placeDetailsState.rating}`}</div>
            <div>{`평점 수: ${placeDetailsState.user_ratings_total}`}</div>
            <div>{`웹사이트: ${placeDetailsState.website}`}</div>
            <div>{`구글 맵 이동: ${placeDetailsState.url}`}</div>
            <div>
              {placeDetailsState.photos?.map((photo) => (
                <img key={photo.getUrl()} src={photo.getUrl()} height="100px" width="100px" alt="이미지" />
              ))}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h4>리뷰</h4>
              {placeDetailsState.reviews?.map((review) => (
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
