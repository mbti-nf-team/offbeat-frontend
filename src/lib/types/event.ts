export type EventName =
  | 'selected_country'
  | 'bringing_up_the_current_location'
  | 'load_google_map';

export type EventAction = 'click' | 'fail' | 'load';

export type EventType = 'success' | 'error';

export type SendEvent = {
  name: EventName;
  action: EventAction;
  type?: EventType;
  value?: Record<string, any>;
};
