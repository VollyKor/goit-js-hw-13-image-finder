import './styles.css';
import ref from './js/refs'
import fetchApi from './js/apiService'
import template from './templates/gallery-template.hbs'
import modalTemplate from './templates/modal.hbs'
import btnState from './js/btn-state'
import {notFoundNotice, someError} from './js/notofications'
import debounce from 'lodash.debounce'
// var debounce = require('lodash.debounce');
<<<<<<< HEAD
<<<<<<< Updated upstream
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
// const basicLightbox = require('basiclightbox')
import infiniteLoading from './js/infiniteScroll';
=======
=======
>>>>>>> parent of 4dc4e33... es6 import
import 'basiclightbox/dist/basicLightbox.min.css'
// import basicLightbox from 'basiclightbox' // не работает !!!
const basicLightbox = require('basiclightbox')
import infiniteLoading from './js/infiniteScroll'
<<<<<<< HEAD
import "./js/mansory"
>>>>>>> Stashed changes
=======
>>>>>>> parent of 4dc4e33... es6 import

preventDefaultForm()
searchImg()

ref.loadMoreBtn.addEventListener('click', () => {
    ref.loadMoreBtn.classList.add('is-hidden')
    searchMore()
})

ref.container.addEventListener('click', (event) => {
    const originalImgSrc = event.target.dataset.fullsize
    
    if (event.target.nodeName === 'IMG') {
        showModal()

        const modalImg = document.querySelector('.modal-img');
        modalImg.src = originalImgSrc
    }
})

function searchImg() {
    ref.input.addEventListener('input', debounce(() => {
        const inputValue = ref.input.value;

        createGallery(inputValue)
    }, 1000));
}

function createGallery(searchName) {
    ref.container.innerHTML = '';

    fetchApi.page = 1;
    fetchApi.search = searchName;

    fetchApi.fetchImg()
        .then(data => {
            const arrayLength = data.hits.length

            if (arrayLength === 0){
                notFoundNotice()
                btnState.hide()
            }
            
            if (arrayLength > 0){
            createMarkup(data)
            btnState.show()
            }

            if (arrayLength < 12){
            btnState.hide()
            }
        })
        .catch(error => {
            console.log(error)
            someError()
        })
}

function searchMore() {
    fetchApi.pageIncrement()
    btnState.loading()

    fetchApi.fetchImg()
        .then(data => {
            createMarkup(data)
            btnState.loaded()
           if (data.hits.length === 12){
            infiniteLoading(ref.container.lastElementChild, searchMore)
           }
            // window.scrollTo({
            //     top: document.documentElement.offsetHeight,
            //     behavior: 'smooth'
            // })
        })
        .catch(error => console.log(error))
}

function createMarkup(data) {
    const markup = template(data.hits)
    ref.container.insertAdjacentHTML('beforeend', markup)
}

function preventDefaultForm() {
    ref.form.addEventListener('submit', (e) => e.preventDefault())
}

function showModal(){
    return basicLightbox.create(modalTemplate()).show()
}

