import axios from 'axios';

import { Config } from '../config';

const Api = axios.create({
  baseURL: Config.baseUrl,
});

// eslint-disable-next-line prettier/prettier
Api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      ts: Config.ts,
      apikey: Config.key,
      hash: Config.hash,
    },
  };
});

export default Api;
