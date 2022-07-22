import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '21114444-0f8d4403d37e9d68ea7490c66';

export async function fetchImages(searchValue, page) {
  return await axios(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
