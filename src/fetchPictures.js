const URL = 'https://pixabay.com/api/'
const API_KEY = '34776987-31260d6b6ec62d4f22854ea75'
let page = 1;
const quantity = 40;

//    async function getUser(page, quantity) {
//     try {
//       await axios.get(`${URL}?key=${API_KEY}&q=${refs.input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${quantity}`)
//       .then(response => response.json())
//       then(data => console.log(data));
     
//     } catch (error) {
//       console.error(error);
//     }
//   }

  const fetchUsers = async () => {
    const response = await axios.get(`${URL}?key=${API_KEY}&q=${refs.input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${quantity}`);
    const users = await response.json();
    return users;
  };

  export default fetchUsers;