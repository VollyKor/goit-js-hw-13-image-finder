import './styles.css';
import ref from './js/refs'
import fetchApi from './js/apiService'
import template from './templates/gallery-template.hbs'
import modalTemplate from './templates/modal.hbs'
import btnState from './js/btn-state'
import {notFoundNotice, someError} from './js/notofications'
var debounce = require('lodash.debounce');
import 'basiclightbox/dist/basicLightbox.min.css'
const basicLightbox = require('basiclightbox')

preventDefaultForm()
searchImg()

ref.loadMoreBtn.addEventListener('click', () => {
    searchMore()
    ref.loadMoreBtn.classList.add('is-hidden')
    lazyLoad(ref.container.lastElementChild)
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


function lazyLoad (element){
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log('click');
                searchMore()
            }
            // io.disconnect
        })
    } )
    io.observe(element)
}