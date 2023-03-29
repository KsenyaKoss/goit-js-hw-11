const URL = 'https://pixabay.com/api/';
const API_KEY = '34776987-31260d6b6ec62d4f22854ea75';
const axios = require('axios/dist/browser/axios.cjs');

export default async function fetchPictures(searchQuery, page, perPage) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
