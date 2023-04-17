import { PlaceResult } from 'lib/types/google.maps';

export const codeToFlag = (code: string): string => String.fromCodePoint(
  ...code.toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0)),
);

export const generateArrayOfNumber = (length: number) => Array.from({ length }, (_, i) => i);

export const checkNumberValue = (value?: number | null): number => {
  if (typeof value === 'number') {
    return value;
  }

  return 0;
};

export const filteredPlaces = (
  places: google.maps.places.PlaceResult[],
) => places.filter((place): place is PlaceResult => [
  place.geometry?.location, place.place_id, place.name,
].some((value) => Boolean(value)));

export const checkEmpty = <T>(value?: T[]): T[] => {
  if (!value || !value.length) {
    return [];
  }

  return value;
};

export function numberWithComma(
  value?: number | null,
  returnZero = true,
): string {
  if (value) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 20 });
  }

  if (returnZero) {
    return '0';
  }

  return '';
}
