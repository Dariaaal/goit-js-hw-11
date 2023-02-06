import axios from 'axios';

let imagePage = 1;
let inputValue = '';
const API = 'https://pixabay.com/api/';
const KEY = '33379348-ee229b2ba87d6e51820269182';

async function fetchImages(inputValue){
    const response = await axios.get(`${API}?key=${KEY}&q=${inputValue}&image_type=photo$orientation=horizontal&safesearch=true&per_page=40&page=${imagePage}`);
    return response.data.hits;
}

export default {imagePage, inputValue, fetchImages};