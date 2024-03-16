import Image from 'next/image';

import { checkNumber } from '@nf-team/core';

import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import { ArchiveSolidIcon } from '@/lib/assets/icons';

import styles from './index.module.scss';

// NOTE - 임시 데이터
const mockSavedPlaces = [
  {
    id: 'ChIJaVDnv46RQTURWuJE01tjUGk',
    name: '하카타라멘 신신 텐진본점',
    rating: 4.2,
    user_ratings_total: 5598,
    nation: '일본',
    address: '3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001',
    distance: '5km',
    photoUrls: [
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZC8FXvzKF21twvZieHl8ZHnXyU-kOrGopGj7C4tmbXabX9cdMGSiJh5el-l9NN2GNxkaDcnHIm7oi23yOZBw1jL6ydwteSHguJd5koq-16YN0XOyAypdk6AT6cnkYiqAeEVOUNrl9x_k1EDF8R_Wf0xC57Vw_M8i4STK2yNHkrzOm_&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbWe0tjd-C--ZT-vZhAbSVbTLYB7FauODAdUaB1M6LrTQ-gX8I1X61kfCIkAHoAlFjN8irDkE9a7R9E_rlfcNbosuToo0NsmlKXXvgoL6qfdIlkULdeZwgYdb2uvbNwPZ-vEGHl-Jqzbm1ugevdhRWU53xzQa7ry91mY4AP74wfkDTb&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJay_jbLePKR4uuuhLi7uNpmxH_G1zoMUExg2YRAI1V-8PQWQnIZjy2hSAcKoqsPkM5tnA0ve0VmNhffvYFTjxMz0qHjHXWDKlKugIGjQwMXLBOQpVl_D0V0xhsRAuze8IudCp8pwxQrVVpxtup0eP6QXYIBXaCmuEoCq-md9LP01sU&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJapRNGuJLGDiqAZOoLaj9B6Vx9H9KlLXmgdhpzRGdgWm55Nq5Mu8uYTVHKFQQmARhByly9XMIhXgI_ZCveAlyfamVU2I0ijw3VUyrvJDigRSo6TRioE5vId6joK2KTRGBTCmzx8S7d8_ZdhTLOb0rLUW7C0FQBQAUHiEDyaxTbavWDL&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYBPRRrJTBFBvKwTVkRZERSPRlEnK2lE1ckCXV63WbbbOerg-Mfpb9vHLRSyzKYV6M6P7r0vHjmyHBEzmb2hsBe2GlSLEuP0Ka228FuHEFSMz6T5miiW6Y9Mz8JmjkHSlpNZkQYbKQyXLoK7unkeYBqbGbs5P8JJwMsVa-gBgzs-cs&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbpJQlsYUN7EJGmu5pfx6Ok7Lh2s981wWKUO_oL6Pd6ChApFsk7wA_B0YNaprrVfaHLBNmuu62W1W3lJQyqkaVYMcLVai13OoseveFJRNZfbTtXPslX2QbJ4g2IGVmfyEbREsZtHY0xFLDxbd5yR8akq1xyHJk_mltiXNEQjT7El4zS&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ6m4smpK2kpix1_Ja9EY0Yr8ak4NUT6CjLal238GmDnr7hFLBaPxnS57JNP8S1y-HdgWrRps9-5BDlQPlqDcz8KkaAt5DtfkaXGD9XzHO1Ng6-DQjkjRxcCSSvm0pApkq5lepF-bE82egbw6hVRvPQH6WB0ND_qaJFbaNJOXDxdciw&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbRprvESUMTjVM6OefYgM4Gc0AlixsOJr6ie8Sbe-4TgH_K4d16-L1MLE6SFiRgRP4Rpji_d_jt7-pemM71aARpslu5Q-7oFSqU7p_i4HGvFIYuhopIGsxK0nMddzP2Zt7haREWtQqRJ5-697ab0T-Ap9l--fNnfcw5kQK5cwnvxI1d&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ3QbrQ4HM--SCosdmNG5CSLRuCKcuHTxKGJT3z6id5u_yDigoG2Uj5DC2zgy02HqNBDOYsGUChPkobOGSVer32ygCQsRwpaJQFmHbpA2bF_chsldgezbRm4_vZ4QOBwiOmVTTIneCN6ac0au52T9aGntTStBh_eeBqj9KAmARRE7Df&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYef3EojHmg5Lx6Pk-3QxIIMsgYpxHrG6esj5bM_S_CewOhDojsMcB1mLIJmcsw5vC1XpNZPKOzXISbaAZURP4k7tw-TAsQhKmaN7Gsz2AYYHuyAvDs_ajPyp55RE9AJkw7vsJv2M4r3jYF9spSKyajOr8vvZFEZdoB-UPKidJmf0rX&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
    ],
  },
  {
    id: '2',
    name: '하카타라멘 신신 텐진본점',
    rating: 4.2,
    user_ratings_total: 5598,
    nation: '일본',
    address: '3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001',
    distance: '5km',
    photoUrls: [
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZC8FXvzKF21twvZieHl8ZHnXyU-kOrGopGj7C4tmbXabX9cdMGSiJh5el-l9NN2GNxkaDcnHIm7oi23yOZBw1jL6ydwteSHguJd5koq-16YN0XOyAypdk6AT6cnkYiqAeEVOUNrl9x_k1EDF8R_Wf0xC57Vw_M8i4STK2yNHkrzOm_&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbWe0tjd-C--ZT-vZhAbSVbTLYB7FauODAdUaB1M6LrTQ-gX8I1X61kfCIkAHoAlFjN8irDkE9a7R9E_rlfcNbosuToo0NsmlKXXvgoL6qfdIlkULdeZwgYdb2uvbNwPZ-vEGHl-Jqzbm1ugevdhRWU53xzQa7ry91mY4AP74wfkDTb&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJay_jbLePKR4uuuhLi7uNpmxH_G1zoMUExg2YRAI1V-8PQWQnIZjy2hSAcKoqsPkM5tnA0ve0VmNhffvYFTjxMz0qHjHXWDKlKugIGjQwMXLBOQpVl_D0V0xhsRAuze8IudCp8pwxQrVVpxtup0eP6QXYIBXaCmuEoCq-md9LP01sU&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJapRNGuJLGDiqAZOoLaj9B6Vx9H9KlLXmgdhpzRGdgWm55Nq5Mu8uYTVHKFQQmARhByly9XMIhXgI_ZCveAlyfamVU2I0ijw3VUyrvJDigRSo6TRioE5vId6joK2KTRGBTCmzx8S7d8_ZdhTLOb0rLUW7C0FQBQAUHiEDyaxTbavWDL&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYBPRRrJTBFBvKwTVkRZERSPRlEnK2lE1ckCXV63WbbbOerg-Mfpb9vHLRSyzKYV6M6P7r0vHjmyHBEzmb2hsBe2GlSLEuP0Ka228FuHEFSMz6T5miiW6Y9Mz8JmjkHSlpNZkQYbKQyXLoK7unkeYBqbGbs5P8JJwMsVa-gBgzs-cs&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbpJQlsYUN7EJGmu5pfx6Ok7Lh2s981wWKUO_oL6Pd6ChApFsk7wA_B0YNaprrVfaHLBNmuu62W1W3lJQyqkaVYMcLVai13OoseveFJRNZfbTtXPslX2QbJ4g2IGVmfyEbREsZtHY0xFLDxbd5yR8akq1xyHJk_mltiXNEQjT7El4zS&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ6m4smpK2kpix1_Ja9EY0Yr8ak4NUT6CjLal238GmDnr7hFLBaPxnS57JNP8S1y-HdgWrRps9-5BDlQPlqDcz8KkaAt5DtfkaXGD9XzHO1Ng6-DQjkjRxcCSSvm0pApkq5lepF-bE82egbw6hVRvPQH6WB0ND_qaJFbaNJOXDxdciw&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbRprvESUMTjVM6OefYgM4Gc0AlixsOJr6ie8Sbe-4TgH_K4d16-L1MLE6SFiRgRP4Rpji_d_jt7-pemM71aARpslu5Q-7oFSqU7p_i4HGvFIYuhopIGsxK0nMddzP2Zt7haREWtQqRJ5-697ab0T-Ap9l--fNnfcw5kQK5cwnvxI1d&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ3QbrQ4HM--SCosdmNG5CSLRuCKcuHTxKGJT3z6id5u_yDigoG2Uj5DC2zgy02HqNBDOYsGUChPkobOGSVer32ygCQsRwpaJQFmHbpA2bF_chsldgezbRm4_vZ4QOBwiOmVTTIneCN6ac0au52T9aGntTStBh_eeBqj9KAmARRE7Df&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYef3EojHmg5Lx6Pk-3QxIIMsgYpxHrG6esj5bM_S_CewOhDojsMcB1mLIJmcsw5vC1XpNZPKOzXISbaAZURP4k7tw-TAsQhKmaN7Gsz2AYYHuyAvDs_ajPyp55RE9AJkw7vsJv2M4r3jYF9spSKyajOr8vvZFEZdoB-UPKidJmf0rX&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
    ],
  }, {
    id: '3',
    name: '하카타라멘 신신 텐진본점',
    rating: 4.2,
    user_ratings_total: 5598,
    nation: '일본',
    address: '3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001',
    distance: '5km',
    photoUrls: [
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZC8FXvzKF21twvZieHl8ZHnXyU-kOrGopGj7C4tmbXabX9cdMGSiJh5el-l9NN2GNxkaDcnHIm7oi23yOZBw1jL6ydwteSHguJd5koq-16YN0XOyAypdk6AT6cnkYiqAeEVOUNrl9x_k1EDF8R_Wf0xC57Vw_M8i4STK2yNHkrzOm_&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbWe0tjd-C--ZT-vZhAbSVbTLYB7FauODAdUaB1M6LrTQ-gX8I1X61kfCIkAHoAlFjN8irDkE9a7R9E_rlfcNbosuToo0NsmlKXXvgoL6qfdIlkULdeZwgYdb2uvbNwPZ-vEGHl-Jqzbm1ugevdhRWU53xzQa7ry91mY4AP74wfkDTb&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJay_jbLePKR4uuuhLi7uNpmxH_G1zoMUExg2YRAI1V-8PQWQnIZjy2hSAcKoqsPkM5tnA0ve0VmNhffvYFTjxMz0qHjHXWDKlKugIGjQwMXLBOQpVl_D0V0xhsRAuze8IudCp8pwxQrVVpxtup0eP6QXYIBXaCmuEoCq-md9LP01sU&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJapRNGuJLGDiqAZOoLaj9B6Vx9H9KlLXmgdhpzRGdgWm55Nq5Mu8uYTVHKFQQmARhByly9XMIhXgI_ZCveAlyfamVU2I0ijw3VUyrvJDigRSo6TRioE5vId6joK2KTRGBTCmzx8S7d8_ZdhTLOb0rLUW7C0FQBQAUHiEDyaxTbavWDL&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYBPRRrJTBFBvKwTVkRZERSPRlEnK2lE1ckCXV63WbbbOerg-Mfpb9vHLRSyzKYV6M6P7r0vHjmyHBEzmb2hsBe2GlSLEuP0Ka228FuHEFSMz6T5miiW6Y9Mz8JmjkHSlpNZkQYbKQyXLoK7unkeYBqbGbs5P8JJwMsVa-gBgzs-cs&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbpJQlsYUN7EJGmu5pfx6Ok7Lh2s981wWKUO_oL6Pd6ChApFsk7wA_B0YNaprrVfaHLBNmuu62W1W3lJQyqkaVYMcLVai13OoseveFJRNZfbTtXPslX2QbJ4g2IGVmfyEbREsZtHY0xFLDxbd5yR8akq1xyHJk_mltiXNEQjT7El4zS&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ6m4smpK2kpix1_Ja9EY0Yr8ak4NUT6CjLal238GmDnr7hFLBaPxnS57JNP8S1y-HdgWrRps9-5BDlQPlqDcz8KkaAt5DtfkaXGD9XzHO1Ng6-DQjkjRxcCSSvm0pApkq5lepF-bE82egbw6hVRvPQH6WB0ND_qaJFbaNJOXDxdciw&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJbRprvESUMTjVM6OefYgM4Gc0AlixsOJr6ie8Sbe-4TgH_K4d16-L1MLE6SFiRgRP4Rpji_d_jt7-pemM71aARpslu5Q-7oFSqU7p_i4HGvFIYuhopIGsxK0nMddzP2Zt7haREWtQqRJ5-697ab0T-Ap9l--fNnfcw5kQK5cwnvxI1d&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJZ3QbrQ4HM--SCosdmNG5CSLRuCKcuHTxKGJT3z6id5u_yDigoG2Uj5DC2zgy02HqNBDOYsGUChPkobOGSVer32ygCQsRwpaJQFmHbpA2bF_chsldgezbRm4_vZ4QOBwiOmVTTIneCN6ac0au52T9aGntTStBh_eeBqj9KAmARRE7Df&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=ATplDJYef3EojHmg5Lx6Pk-3QxIIMsgYpxHrG6esj5bM_S_CewOhDojsMcB1mLIJmcsw5vC1XpNZPKOzXISbaAZURP4k7tw-TAsQhKmaN7Gsz2AYYHuyAvDs_ajPyp55RE9AJkw7vsJv2M4r3jYF9spSKyajOr8vvZFEZdoB-UPKidJmf0rX&key=AIzaSyCffnehwypiJPvue78phUakY-w37xoFINw',
    ],
  },
];

function SavedPlaces() {
  return (
    <ul className={styles.savedPlacesWrapper}>
      {mockSavedPlaces.map(({
        id, photoUrls, name, rating, user_ratings_total, nation, address, distance,
      }) => (
        <li key={id} className={styles.savedPlaceItem}>
          <div className={styles.photos}>
            {photoUrls.map((photo, index) => (
              <Image key={photo} src={photo} alt={`${name}-image-${index}`} width={160} height={160} className={styles.photo} />
            ))}
          </div>
          <div className={styles.placeInfoWrapper}>
            <div className={styles.placeName}>
              <div>{name}</div>
              <Button size="small" onlyIcon={<ArchiveSolidIcon />} color="ghost" />
            </div>
            <div className={styles.placeRatingWrapper}>
              <div className={styles.placeRating}>{rating}</div>
              <StarRating rating={rating} type="list" />
              <div className={styles.placeUserRatingsTotal}>{`(${checkNumber(user_ratings_total)})`}</div>
            </div>
            <div className={styles.addressInfo}>
              <div className={styles.nation}>{nation}</div>
              <div>∙</div>
              <div className={styles.address}>{address}</div>
              <div>∙</div>
              <div className={styles.distance}>{distance}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SavedPlaces;
