import axios from 'axios';

const imagePage = 1;
const API = 'https://pixabay.com/api/';
const KEY = '33379348-ee229b2ba87d6e51820269182';

async function fetchImages(name){
    const response = await axios.get(`${API}?key=${KEY}&q=${name}&image_type=photo$orientation=horizontal&safesearch=true&per_page=40&page=${imagePage}`);
    return response.data.hits;
}

export default {fetchImages};