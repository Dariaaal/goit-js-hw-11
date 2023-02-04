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

    imagesEl.fetchImages(inputValue).then(image=>{})
}

function createImageCard() {
    
}