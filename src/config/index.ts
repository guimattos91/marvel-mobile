import { API_BASE_URL, API_HASH, API_KEY, API_TS } from '@env';

export const Config = {
  baseUrl: API_BASE_URL || 'https://gateway.marvel.com/v1/public',
  hash: API_HASH,
  key: API_KEY,
  ts: API_TS,
};
