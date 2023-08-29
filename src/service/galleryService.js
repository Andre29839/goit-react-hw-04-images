import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '38624276-36ed6cbc10c2af1663e372e7f';

export const per_page = 12;

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    // `q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return data;
};

export const normalizeImages = array => {
  return array.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
};

// https://pixabay.com/api/?q=cat&page=1&key=38624276-36ed6cbc10c2af1663e372e7f&image_type=photo&orientation=horizontal&per_page=12
