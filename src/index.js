import Notiflix from 'notiflix';
const axios = require('axios/dist/browser/axios.cjs');
import fetchUsers from './fetchPictures';



const URL = 'https://pixabay.com/api/'
const API_KEY = '34776987-31260d6b6ec62d4f22854ea75'
let page = 1;
const quantity = 40;


const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
}
  

refs.form.addEventListener('submit', getPictures)

function getPictures(ev){
  ev.preventDefault()
  refs.input = ev.target.elements[0].value
  fetchUsers(page, quantity);
 
}























// https://pixabay.com/api/?key=34776987-31260d6b6ec62d4f22854ea75&q=yellow+flowers&image_type=photo




// const fetchUsers = async () => {
//   try {
//     const response = await axios.get(
//       'https://jsonplaceholder.typicode.com/users'
//     );
//     const users = await response.json();
//     return users;
//   } catch (error) {}
// };
