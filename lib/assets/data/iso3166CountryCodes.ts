// NOTE - https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const ISO_3166_COUNTRY_CODES = [
  {
    code: 'AD',
    koreanName: '안도라',
    englishName: 'Andorra',
  },
  {
    code: 'AE',
    koreanName: '아랍 에미리트',
    englishName: 'United Arab Emirates',
  },
  {
    code: 'AF',
    koreanName: '아프가니스탄',
    englishName: 'Afghanistan',
  },
  {
    code: 'AG',
    koreanName: '앤티가 바부다',
    englishName: 'Antigua and Barbuda',
  },
  {
    code: 'AI',
    koreanName: '앵귈라',
    englishName: 'Anguilla',
  },
  {
    code: 'AL',
    koreanName: '알바니아',
    englishName: 'Albania',
  },
  {
    code: 'AM',
    koreanName: '아르메니아',
    englishName: 'Armenia',
  },
  {
    code: 'AO',
    koreanName: '앙골라',
    englishName: 'Angola',
  },
  {
    code: 'AQ',
    koreanName: '남극',
    englishName: 'Antarctica',
  },
  {
    code: 'AR',
    koreanName: '아르헨티나',
    englishName: 'Argentina',
  },
  {
    code: 'AS',
    koreanName: '미국령 사모아',
    englishName: 'American Samoa',
  },
  {
    code: 'AT',
    koreanName: '오스트리아',
    englishName: 'Austria',
  },
  {
    code: 'AU',
    koreanName: '오스트레일리아',
    englishName: 'Australia',
  },
  {
    code: 'AW',
    koreanName: '아루바',
    englishName: 'Aruba',
  },
  {
    code: 'AX',
    koreanName: '올란드 제도',
    englishName: 'Åland Islands',
  },
  {
    code: 'AZ',
    koreanName: '아제르바이잔',
    englishName: 'Azerbaijan',
  },
  {
    code: 'BA',
    koreanName: '보스니아 헤르체고비나',
    englishName: 'Bosnia and Herzegovina',
  },
  {
    code: 'BB',
    koreanName: '바베이도스',
    englishName: 'Barbados',
  },
  {
    code: 'BD',
    koreanName: '방글라데시',
    englishName: 'Bangladesh',
  },
  {
    code: 'BE',
    koreanName: '벨기에',
    englishName: 'Belgium',
  },
  {
    code: 'BF',
    koreanName: '부르키나 파소',
    englishName: 'Burkina Faso',
  },
  {
    code: 'BG',
    koreanName: '불가리아',
    englishName: 'Bulgaria',
  },
  {
    code: 'BH',
    koreanName: '바레인',
    englishName: 'Bahrain',
  },
  {
    code: 'BI',
    koreanName: '부룬디',
    englishName: 'Burundi',
  },
  {
    code: 'BJ',
    koreanName: '베냉',
    englishName: 'Benin',
  },
  {
    code: 'BL',
    koreanName: '생바르텔레미',
    englishName: 'St Barthelemy',
  },
  {
    code: 'BM',
    koreanName: '버뮤다',
    englishName: 'Bermuda',
  },
  {
    code: 'BN',
    koreanName: '브루나이',
    englishName: 'Brunei Darussalam',
  },
  {
    code: 'BO',
    koreanName: '볼리비아',
    englishName: 'Bolivia',
  },
  {
    code: 'BQ',
    koreanName: '카리브 네덜란드',
    englishName: 'Caribbean NL',
  },
  {
    code: 'BR',
    koreanName: '브라질',
    englishName: 'Brazil',
  },
  {
    code: 'BS',
    koreanName: '바하마',
    englishName: 'Bahamas',
  },
  {
    code: 'BT',
    koreanName: '부탄',
    englishName: 'Bhutan',
  },
  {
    code: 'BV',
    koreanName: '부베 섬',
    englishName: 'Bouvet Island',
  },
  {
    code: 'BW',
    koreanName: '보츠와나',
    englishName: 'Botswana',
  },
  {
    code: 'BY',
    koreanName: '벨라루스',
    englishName: 'Belarus',
  },
  {
    code: 'BZ',
    koreanName: '벨리제',
    englishName: 'Belize',
  },
  {
    code: 'CA',
    koreanName: '캐나다',
    englishName: 'Canada',
  },
  {
    code: 'CC',
    koreanName: '코코스 제도',
    englishName: 'Cocos (Keeling) Islands',
  },
  {
    code: 'CD',
    koreanName: '콩고 민주 공화국',
    englishName: 'Congo, The Democratic Republic of the',
  },
  {
    code: 'CF',
    koreanName: '중앙아프리카 공화국',
    englishName: 'Central African Republic',
  },
  {
    code: 'CG',
    koreanName: '콩고 공화국',
    englishName: 'Congo',
  },
  {
    code: 'CH',
    koreanName: '스위스',
    englishName: 'Switzerland',
  },
  {
    code: 'CI',
    koreanName: '코트디부아르',
    englishName: 'Cote D"Ivoire',
  },
  {
    code: 'CK',
    koreanName: '쿡 제도',
    englishName: 'Cook Islands',
  },
  {
    code: 'CL',
    koreanName: '칠레',
    englishName: 'Chile',
  },
  {
    code: 'CM',
    koreanName: '카메룬',
    englishName: 'Cameroon',
  },
  {
    code: 'CN',
    koreanName: '중국',
    englishName: 'China',
  },
  {
    code: 'CO',
    koreanName: '콜롬비아',
    englishName: 'Colombia',
  },
  {
    code: 'CR',
    koreanName: '코스타 리카',
    englishName: 'Costa Rica',
  },
  {
    code: 'CU',
    koreanName: '쿠바',
    englishName: 'Cuba',
  },
  {
    code: 'CV',
    koreanName: '카보베르데',
    englishName: 'Cape Verde',
  },
  {
    code: 'CW',
    koreanName: '퀴라소',
    englishName: 'Curaçao',
  },
  {
    code: 'CX',
    koreanName: '크리스마스 섬',
    englishName: 'Christmas Island',
  },
  {
    code: 'CY',
    koreanName: '키프로스',
    englishName: 'Cyprus',
  },
  {
    code: 'CZ',
    koreanName: '체코 공화국',
    englishName: 'Czech Republic',
  },
  {
    code: 'DE',
    koreanName: '독일',
    englishName: 'Germany',
  },
  {
    code: 'DJ',
    koreanName: '지부티',
    englishName: 'Djibouti',
  },
  {
    code: 'DK',
    koreanName: '덴마크',
    englishName: 'Denmark',
  },
  {
    code: 'DM',
    koreanName: '도미니카 연방',
    englishName: 'Dominica',
  },
  {
    code: 'DO',
    koreanName: '도미니카 공화국',
    englishName: 'Dominican Republic',
  },
  {
    code: 'DZ',
    koreanName: '알제리',
    englishName: 'Algeria',
  },
  {
    code: 'EC',
    koreanName: '에콰도르',
    englishName: 'Ecuador',
  },
  {
    code: 'EE',
    koreanName: '에스토니아',
    englishName: 'Estonia',
  },
  {
    code: 'EG',
    koreanName: '이집트',
    englishName: 'Egypt',
  },
  {
    code: 'EH',
    koreanName: '서사하라',
    englishName: 'Western Sahara',
  },
  {
    code: 'ER',
    koreanName: '에리트리아',
    englishName: 'Eritrea',
  },
  {
    code: 'ES',
    koreanName: '스페인',
    englishName: 'Spain',
  },
  {
    code: 'ET',
    koreanName: '에티오피아',
    englishName: 'Ethiopia',
  },
  {
    code: 'FI',
    koreanName: '핀란드',
    englishName: 'Finland',
  },
  {
    code: 'FJ',
    koreanName: '피지',
    englishName: 'Fiji',
  },
  {
    code: 'FK',
    koreanName: '포클랜드 제도',
    englishName: 'Falkland Islands (Malvinas)',
  },
  {
    code: 'FM',
    koreanName: '미크로네시아 연방',
    englishName: 'Micronesia, Federated States of',
  },
  {
    code: 'FO',
    koreanName: '페로 제도',
    englishName: 'Faroe Islands',
  },
  {
    code: 'FR',
    koreanName: '프랑스',
    englishName: 'France',
  },
  {
    code: 'GA',
    koreanName: '가봉',
    englishName: 'Gabon',
  },
  {
    code: 'GB',
    koreanName: '영국',
    englishName: 'United Kingdom',
  },
  {
    code: 'GD',
    koreanName: '그레나다',
    englishName: 'Grenada',
  },
  {
    code: 'GE',
    koreanName: '조지아',
    englishName: 'Georgia',
  },
  {
    code: 'GF',
    koreanName: '프랑스령 기아나',
    englishName: 'French Guiana',
  },
  {
    code: 'GG',
    koreanName: '건지',
    englishName: 'Guernsey',
  },
  {
    code: 'GH',
    koreanName: '가나',
    englishName: 'Ghana',
  },
  {
    code: 'GI',
    koreanName: '지브롤터',
    englishName: 'Gibraltar',
  },
  {
    code: 'GL',
    koreanName: '그린란드',
    englishName: 'Greenland',
  },
  {
    code: 'GM',
    koreanName: '감비아',
    englishName: 'Gambia',
  },
  {
    code: 'GN',
    koreanName: '기니',
    englishName: 'Guinea',
  },
  {
    code: 'GP',
    koreanName: '과들루프',
    englishName: 'Guadeloupe',
  },
  {
    code: 'GQ',
    koreanName: '적도 기니',
    englishName: 'Equatorial Guinea',
  },
  {
    code: 'GR',
    koreanName: '그리스',
    englishName: 'Greece',
  },
  {
    code: 'GS',
    koreanName: '사우스조지아 사우스샌드위치 제도',
    englishName: 'South Georgia and the South Sandwich Islands',
  },
  {
    code: 'GT',
    koreanName: '과테말라',
    englishName: 'Guatemala',
  },
  {
    code: 'GU',
    koreanName: '괌',
    englishName: 'Guam',
  },
  {
    code: 'GW',
    koreanName: '기니비사우',
    englishName: 'Guinea-Bissau',
  },
  {
    code: 'GY',
    koreanName: '가이아나',
    englishName: 'Guyana',
  },
  {
    code: 'HK',
    koreanName: '홍콩',
    englishName: 'Hong Kong',
  },
  {
    code: 'HM',
    koreanName: '허드 맥도널드 제도',
    englishName: 'Heard Island and Mcdonald Islands',
  },
  {
    code: 'HN',
    koreanName: '온두라스',
    englishName: 'Honduras',
  },
  {
    code: 'HR',
    koreanName: '크로아티아',
    englishName: 'Croatia',
  },
  {
    code: 'HT',
    koreanName: '아이티',
    englishName: 'Haiti',
  },
  {
    code: 'HU',
    koreanName: '헝가리',
    englishName: 'Hungary',
  },
  {
    code: 'ID',
    koreanName: '인도네시아',
    englishName: 'Indonesia',
  },
  {
    code: 'IE',
    koreanName: '아일랜드',
    englishName: 'Ireland',
  },
  {
    code: 'IL',
    koreanName: '이스라엘',
    englishName: 'Israel',
  },
  {
    code: 'IM',
    koreanName: '맨 섬',
    englishName: 'Isle of Man',
  },
  {
    code: 'IN',
    koreanName: '인도',
    englishName: 'India',
  },
  {
    code: 'IO',
    koreanName: '영국령 인도양 지역',
    englishName: 'British Indian Ocean Territory',
  },
  {
    code: 'IQ',
    koreanName: '이라크',
    englishName: 'Iraq',
  },
  {
    code: 'IR',
    koreanName: '이란',
    englishName: 'Iran, Islamic Republic Of',
  },
  {
    code: 'IS',
    koreanName: '아이슬란드',
    englishName: 'Iceland',
  },
  {
    code: 'IT',
    koreanName: '이탈리아',
    englishName: 'Italy',
  },
  {
    code: 'JE',
    koreanName: '저지',
    englishName: 'Jersey',
  },
  {
    code: 'JM',
    koreanName: '자메이카',
    englishName: 'Jamaica',
  },
  {
    code: 'JO',
    koreanName: '요르단',
    englishName: 'Jordan',
  },
  {
    code: 'JP',
    koreanName: '일본',
    englishName: 'Japan',
  },
  {
    code: 'KE',
    koreanName: '케냐',
    englishName: 'Kenya',
  },
  {
    code: 'KG',
    koreanName: '키르기스스탄',
    englishName: 'Kyrgyzstan',
  },
  {
    code: 'KH',
    koreanName: '캄보디아',
    englishName: 'Cambodia',
  },
  {
    code: 'KI',
    koreanName: '키리바시',
    englishName: 'Kiribati',
  },
  {
    code: 'KM',
    koreanName: '코모로',
    englishName: 'Comoros',
  },
  {
    code: 'KN',
    koreanName: '세인트 키츠 네비스',
    englishName: 'Saint Kitts and Nevis',
  },
  {
    code: 'KP',
    koreanName: '북한',
    englishName: 'Korea, Democratic People"S Republic of',
  },
  {
    code: 'KR',
    koreanName: '대한민국',
    englishName: 'Korea, Republic of',
  },
  {
    code: 'KW',
    koreanName: '쿠웨이트',
    englishName: 'Kuwait',
  },
  {
    code: 'KY',
    koreanName: '케이맨 제도',
    englishName: 'Cayman Islands',
  },
  {
    code: 'KZ',
    koreanName: '카자흐스탄',
    englishName: 'Kazakhstan',
  },
  {
    code: 'LA',
    koreanName: '라오스',
    englishName: 'Lao People"S Democratic Republic',
  },
  {
    code: 'LB',
    koreanName: '레바논',
    englishName: 'Lebanon',
  },
  {
    code: 'LC',
    koreanName: '세인트 루시아',
    englishName: 'Saint Lucia',
  },
  {
    code: 'LI',
    koreanName: '리히텐슈타인',
    englishName: 'Liechtenstein',
  },
  {
    code: 'LK',
    koreanName: '스리 랑카',
    englishName: 'Sri Lanka',
  },
  {
    code: 'LR',
    koreanName: '라이베리아',
    englishName: 'Liberia',
  },
  {
    code: 'LS',
    koreanName: '레소토',
    englishName: 'Lesotho',
  },
  {
    code: 'LT',
    koreanName: '리투아니아',
    englishName: 'Lithuania',
  },
  {
    code: 'LU',
    koreanName: '룩셈부르크',
    englishName: 'Luxembourg',
  },
  {
    code: 'LV',
    koreanName: '라트비아',
    englishName: 'Latvia',
  },
  {
    code: 'LY',
    koreanName: '리비아',
    englishName: 'Libyan Arab Jamahiriya',
  },
  {
    code: 'MA',
    koreanName: '모로코',
    englishName: 'Morocco',
  },
  {
    code: 'MC',
    koreanName: '모나코',
    englishName: 'Monaco',
  },
  {
    code: 'MD',
    koreanName: '몰도바',
    englishName: 'Moldova, Republic of',
  },
  {
    code: 'ME',
    koreanName: '몬테네그로',
    englishName: 'Montenegro',
  },
  {
    code: 'MF',
    koreanName: '생마르탱',
    englishName: 'St Martin (French)',
  },
  {
    code: 'MG',
    koreanName: '마다가스카르',
    englishName: 'Madagascar',
  },
  {
    code: 'MH',
    koreanName: '마셜 제도',
    englishName: 'Marshall Islands',
  },
  {
    code: 'MK',
    koreanName: '마케도니아',
    englishName: 'Macedonia, The Former Yugoslav Republic of',
  },
  {
    code: 'ML',
    koreanName: '말리',
    englishName: 'Mali',
  },
  {
    code: 'MM',
    koreanName: '미얀마',
    englishName: 'Myanmar',
  },
  {
    code: 'MN',
    koreanName: '몽골',
    englishName: 'Mongolia',
  },
  {
    code: 'MO',
    koreanName: '마카오',
    englishName: 'Macao',
  },
  {
    code: 'MP',
    koreanName: '북마리아나 제도',
    englishName: 'Northern Mariana Islands',
  },
  {
    code: 'MQ',
    koreanName: '마르티니크',
    englishName: 'Martinique',
  },
  {
    code: 'MR',
    koreanName: '모리타니',
    englishName: 'Mauritania',
  },
  {
    code: 'MS',
    koreanName: '몬트세랫',
    englishName: 'Montserrat',
  },
  {
    code: 'MT',
    koreanName: '몰타',
    englishName: 'Malta',
  },
  {
    code: 'MU',
    koreanName: '모리셔스',
    englishName: 'Mauritius',
  },
  {
    code: 'MV',
    koreanName: '몰디브',
    englishName: 'Maldives',
  },
  {
    code: 'MW',
    koreanName: '말라위',
    englishName: 'Malawi',
  },
  {
    code: 'MX',
    koreanName: '멕시코',
    englishName: 'Mexico',
  },
  {
    code: 'MY',
    koreanName: '말레이시아',
    englishName: 'Malaysia',
  },
  {
    code: 'MZ',
    koreanName: '모잠비크',
    englishName: 'Mozambique',
  },
  {
    code: 'NA',
    koreanName: '나미비아',
    englishName: 'Namibia',
  },
  {
    code: 'NC',
    koreanName: '누벨칼레도니',
    englishName: 'New Caledonia',
  },
  {
    code: 'NE',
    koreanName: '니제르',
    englishName: 'Niger',
  },
  {
    code: 'NF',
    koreanName: '노퍽 섬',
    englishName: 'Norfolk Island',
  },
  {
    code: 'NG',
    koreanName: '나이지리아',
    englishName: 'Nigeria',
  },
  {
    code: 'NI',
    koreanName: '니카라과',
    englishName: 'Nicaragua',
  },
  {
    code: 'NL',
    koreanName: '네덜란드',
    englishName: 'Netherlands',
  },
  {
    code: 'NO',
    koreanName: '노르웨이',
    englishName: 'Norway',
  },
  {
    code: 'NP',
    koreanName: '네팔',
    englishName: 'Nepal',
  },
  {
    code: 'NR',
    koreanName: '나우루',
    englishName: 'Nauru',
  },
  {
    code: 'NU',
    koreanName: '니우에',
    englishName: 'Niue',
  },
  {
    code: 'NZ',
    koreanName: '뉴질랜드',
    englishName: 'New Zealand',
  },
  {
    code: 'OM',
    koreanName: '오만',
    englishName: 'Oman',
  },
  {
    code: 'PA',
    koreanName: '파나마',
    englishName: 'Panama',
  },
  {
    code: 'PE',
    koreanName: '페루',
    englishName: 'Peru',
  },
  {
    code: 'PF',
    koreanName: '프랑스령 폴리네시아',
    englishName: 'French Polynesia',
  },
  {
    code: 'PG',
    koreanName: '파푸아 뉴기니',
    englishName: 'Papua New Guinea',
  },
  {
    code: 'PH',
    koreanName: '필리핀',
    englishName: 'Philippines',
  },
  {
    code: 'PK',
    koreanName: '파키스탄',
    englishName: 'Pakistan',
  },
  {
    code: 'PL',
    koreanName: '폴란드',
    englishName: 'Poland',
  },
  {
    code: 'PM',
    koreanName: '생피에르 미클롱',
    englishName: 'Saint Pierre and Miquelon',
  },
  {
    code: 'PN',
    koreanName: '핏케언',
    englishName: 'Pitcairn',
  },
  {
    code: 'PR',
    koreanName: '푸에르토 리코',
    englishName: 'Puerto Rico',
  },
  {
    code: 'PS',
    koreanName: '팔레스타인',
    englishName: 'Palestinian Territory, Occupied',
  },
  {
    code: 'PT',
    koreanName: '포르투갈',
    englishName: 'Portugal',
  },
  {
    code: 'PW',
    koreanName: '팔라우',
    englishName: 'Palau',
  },
  {
    code: 'PY',
    koreanName: '파라과이',
    englishName: 'Paraguay',
  },
  {
    code: 'QA',
    koreanName: '카타르',
    englishName: 'Qatar',
  },
  {
    code: 'RE',
    koreanName: '레위니옹',
    englishName: 'Reunion',
  },
  {
    code: 'RO',
    koreanName: '루마니아',
    englishName: 'Romania',
  },
  {
    code: 'RS',
    koreanName: '세르비아',
    englishName: 'Serbia',
  },
  {
    code: 'RU',
    koreanName: '러시아',
    englishName: 'Russian Federation',
  },
  {
    code: 'RW',
    koreanName: '르완다',
    englishName: 'RWANDA',
  },
  {
    code: 'SA',
    koreanName: '사우디 아라비아',
    englishName: 'Saudi Arabia',
  },
  {
    code: 'SB',
    koreanName: '솔로몬 제도',
    englishName: 'Solomon Islands',
  },
  {
    code: 'SC',
    koreanName: '세이셸',
    englishName: 'Seychelles',
  },
  {
    code: 'SD',
    koreanName: '수단',
    englishName: 'Sudan',
  },
  {
    code: 'SE',
    koreanName: '스웨덴',
    englishName: 'Sweden',
  },
  {
    code: 'SG',
    koreanName: '싱가포르',
    englishName: 'Singapore',
  },
  {
    code: 'SH',
    koreanName: '세인트 헬레나',
    englishName: 'Saint Helena',
  },
  {
    code: 'SI',
    koreanName: '슬로베니아',
    englishName: 'Slovenia',
  },
  {
    code: 'SJ',
    koreanName: '스발바르 얀마옌',
    englishName: 'Svalbard and Jan Mayen',
  },
  {
    code: 'SK',
    koreanName: '슬로바키아',
    englishName: 'Slovakia',
  },
  {
    code: 'SL',
    koreanName: '시에라 리온',
    englishName: 'Sierra Leone',
  },
  {
    code: 'SM',
    koreanName: '산마리노',
    englishName: 'San Marino',
  },
  {
    code: 'SN',
    koreanName: '세네갈',
    englishName: 'Senegal',
  },
  {
    code: 'SO',
    koreanName: '소말리아',
    englishName: 'Somalia',
  },
  {
    code: 'SR',
    koreanName: '수리남',
    englishName: 'Suriname',
  },
  {
    code: 'SS',
    koreanName: '남수단',
    englishName: 'South Sudan',
  },
  {
    code: 'ST',
    koreanName: '상투메 프린시페',
    englishName: 'Sao Tome and Principe',
  },
  {
    code: 'SV',
    koreanName: '엘살바도르',
    englishName: 'El Salvador',
  },
  {
    code: 'SX',
    koreanName: '신트 마르턴',
    englishName: 'St Maarten (Dutch)',
  },
  {
    code: 'SY',
    koreanName: '시리아',
    englishName: 'Syrian Arab Republic',
  },
  {
    code: 'SZ',
    koreanName: '스와질랜드',
    englishName: 'Swaziland',
  },
  {
    code: 'TC',
    koreanName: '터크스 케이커스 제도',
    englishName: 'Turks and Caicos Islands',
  },
  {
    code: 'TD',
    koreanName: '차드',
    englishName: 'Chad',
  },
  {
    code: 'TF',
    koreanName: '프랑스령 남방 및 남극',
    englishName: 'French Southern Territories',
  },
  {
    code: 'TG',
    koreanName: '토고',
    englishName: 'Togo',
  },
  {
    code: 'TH',
    koreanName: '타이',
    englishName: 'Thailand',
  },
  {
    code: 'TJ',
    koreanName: '타지키스탄',
    englishName: 'Tajikistan',
  },
  {
    code: 'TK',
    koreanName: '토켈라우',
    englishName: 'Tokelau',
  },
  {
    code: 'TL',
    koreanName: '동티모르',
    englishName: 'Timor-Leste',
  },
  {
    code: 'TM',
    koreanName: '투르크메니스탄',
    englishName: 'Turkmenistan',
  },
  {
    code: 'TN',
    koreanName: '튀니지',
    englishName: 'Tunisia',
  },
  {
    code: 'TO',
    koreanName: '통가',
    englishName: 'Tonga',
  },
  {
    code: 'TR',
    koreanName: '터키',
    englishName: 'Turkey',
  },
  {
    code: 'TT',
    koreanName: '트리니다드 토바고',
    englishName: 'Trinidad and Tobago',
  },
  {
    code: 'TV',
    koreanName: '투발루',
    englishName: 'Tuvalu',
  },
  {
    code: 'TW',
    koreanName: '타이완',
    englishName: 'Taiwan, Province of China',
  },
  {
    code: 'TZ',
    koreanName: '탄자니아',
    englishName: 'Tanzania, United Republic of',
  },
  {
    code: 'UA',
    koreanName: '우크라이나',
    englishName: 'Ukraine',
  },
  {
    code: 'UG',
    koreanName: '우간다',
    englishName: 'Uganda',
  },
  {
    code: 'UM',
    koreanName: '미국령 군소 제도',
    englishName: 'United States Minor Outlying Islands',
  },
  {
    code: 'US',
    koreanName: '미국',
    englishName: 'United States',
  },
  {
    code: 'UY',
    koreanName: '우루과이',
    englishName: 'Uruguay',
  },
  {
    code: 'UZ',
    koreanName: '우즈베키스탄',
    englishName: 'Uzbekistan',
  },
  {
    code: 'VA',
    koreanName: '바티칸 시티',
    englishName: 'Holy See (Vatican City State)',
  },
  {
    code: 'VC',
    koreanName: '세인트 빈센트',
    englishName: 'Saint Vincent and the Grenadines',
  },
  {
    code: 'VE',
    koreanName: '베네수엘라',
    englishName: 'Venezuela',
  },
  {
    code: 'VG',
    koreanName: '영국령 버진아일랜드',
    englishName: 'Virgin Islands, British',
  },
  {
    code: 'VI',
    koreanName: '미국령 버진아일랜드',
    englishName: 'Virgin Islands, U.S.',
  },
  {
    code: 'VN',
    koreanName: '베트남',
    englishName: 'Viet Nam',
  },
  {
    code: 'VU',
    koreanName: '바누아투',
    englishName: 'Vanuatu',
  },
  {
    code: 'WF',
    koreanName: '왈리스 퓌튀나',
    englishName: 'Wallis and Futuna',
  },
  {
    code: 'WS',
    koreanName: '사모아',
    englishName: 'Samoa',
  },
  {
    code: 'YE',
    koreanName: '예멘',
    englishName: 'Yemen',
  },
  {
    code: 'YT',
    koreanName: '마요트',
    englishName: 'Mayotte',
  },
  {
    code: 'ZA',
    koreanName: '남아프리카 공화국',
    englishName: 'South Africa',
  },
  {
    code: 'ZM',
    koreanName: '잠비아',
    englishName: 'Zambia',
  },
  {
    code: 'ZW',
    koreanName: '짐바브웨',
    englishName: 'Zimbabwe',
  },
];

export default ISO_3166_COUNTRY_CODES;
