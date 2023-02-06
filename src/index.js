import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import infiniteScroll from 'infinite-scroll';
import imagesEl from './fetchImages';

const form = document.querySelector('.search-form');
const imagesList = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoadBtnClick);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    imagesEl.inputValue = form.elements.searchQuery.value.trim();

    if (imagesEl.inputValue === ""){
        imagesList.innerHTML = "";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }

    imagesEl.fetchImages(imagesEl.inputValue).then(items=>{
      if (items.length === 0){
        imagesList.innerHTML = "";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }
        console.log(items);
        createImageCard(items);
        loadBtn.classList.remove('hidden');
    })
  };

function onLoadBtnClick(){
  imagesEl.fetchImages(imagesEl.inputValue).then(items=>{
    imagesEl.imagePage += 1;
      console.log(items);
      createImageCard(items);
  })
}

function createImageCard(hits) {
   const markup = hits.map(hit => `<div class="photo-card">
   <a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="400px" height="244px" style="object-fit:cover;"/></a>
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
gallery.refresh();
}

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});