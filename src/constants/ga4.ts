export const GA4_EVENT_ACTION = {
  click: 'click',
  fail: 'fail',
  load: 'load',
} as const;

export const GA4_EVENT_NAME = {
  selected_country: 'selected_country',
  bringing_up_the_current_location: 'bringing_up_the_current_location',
  load_google_map: 'load_google_map',
} as const;

export const GA4_EVENT_TYPE = {
  success: 'success',
  error: 'error',
} as const;
