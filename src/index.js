import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import infiniteScroll from 'infinite-scroll';
import imagesEl from './fetchImages';

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const imagesList = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value.trim();

    if (inputValue === ""){
        imagesList.innerHTML = "";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }

    imagesEl.fetchImages(inputValue).then(items=>{
      if (items.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }
        console.log(items);
        createImageCard(items);
    })
}

function createImageCard(hits) {
   const markup = hits.map(hit => `<div class="photo-card">
   <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="300px" height="144px" style="object-fit:cover;"/>
   <div class="info">
     <p class="info-item">
       <b>Likes <br>${hit.likes}</b>
     </p>
     <p class="info-item">
       <b>Views <br>${hit.views}</b>
     </p>
     <p class="info-item">
       <b>Comments <br>${hit.comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads <br>${hit.downloads}</b>
     </p>
   </div>
 </div>`).join('');

imagesList.innerHTML = markup;
}