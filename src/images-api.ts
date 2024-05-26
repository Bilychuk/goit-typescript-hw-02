import axios, { AxiosResponse } from 'axios';
import { Image } from './commonTypes';

axios.defaults.baseURL = 'https://api.unsplash.com';

interface ImageData {
  total_pages: number;
  results: Image[];
}

interface ParamsTypes {
  params: {
    orientation: string;
    per_page: number;
    page: number;
    query: string;
    client_id: string;
  };
}
export const fetchImages = async (
  query: string,
  page: number
): Promise<ImageData> => {
  const response: AxiosResponse<any> = await axios.get('/search/photos', {
    params: {
      orientation: 'landscape',
      per_page: 12,
      page: page,
      query: query,
      client_id: 'qVQBOgkZlfAD80jmxA_6ivkJhSd28ZjPXx3b8b1wNfw',
    },
  } as ParamsTypes);
  return {
    total_pages: response.data.total_pages,
    results: response.data.results,
  };
};
