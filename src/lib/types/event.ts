export type EventName =
  | 'selected_country'
  | 'bringing_up_the_current_location'
  | 'load_google_map'
  | 'search_places'
  | 'open_place_detail_window_via_shared_link'
  | 'close_place_detail_window'
  | 'share_place_detail'
  | 'go_to_google_map'
  | 'go_to_naver_blog';

export type EventAction = 'click' | 'fail' | 'load' | 'submit';

export type EventType = 'success' | 'error';

export type SendEvent = {
  name: EventName;
  action: EventAction;
  type?: EventType;
  value?: Record<string, any>;
};
