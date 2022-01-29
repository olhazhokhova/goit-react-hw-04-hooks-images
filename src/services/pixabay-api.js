const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24372714-1e07211a49a3cb54d7764ff43';

function fetchImages(query, page) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

export default fetchImages;
