import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34608361-47fad47221650f74f55826075';

export default async function ImagesApiService(query, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;

  return await axios.get(url).then(response => response.data);
}
