import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import infiniteScroll from 'infinite-scroll';
import imagesEl from './fetchImages';

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const searchBtn = document.querySelector('button');
const imagesList = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.value;

    imagesEl.fetchImages(inputValue).then(items=>{
        console.log(items);
        createImageCard(items);
    })
}

function createImageCard(hits) {
   const markup = hits.map(hit => `<div class="photo-card">
   <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="400px"/>
   <div class="info">
     <p class="info-item">
       <b>Likes ${hit.likes}</b>
     </p>
     <p class="info-item">
       <b>Views ${hit.views}</b>
     </p>
     <p class="info-item">
       <b>Comments ${hit.comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads ${hit.downloads}</b>
     </p>
   </div>
 </div>`).join('');

imagesList.innerHTML = markup;
}