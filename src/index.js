import './styles.css';
import ref from './js/refs'
import fetchApi from './js/apiService'
import template from './templates/gallery-template.hbs'
import modalTemplate from './templates/modal.hbs'
var debounce = require('lodash.debounce');
const basicLightbox = require('basiclightbox')

ref.form.addEventListener('submit', (e) => e.preventDefault())

const modalImg = basicLightbox.create(
    `<img class="modal-img" src="" alt="">`
    )

ref.loadMoreBtn.addEventListener('click', searchMore)

ref.container.addEventListener('click', (e) => {
    console.dir(e.target);
    if (e.target.nodeName === 'IMG') {
    modalImg.show()
    }
})

searchImg()

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
            createMarkup(data)
            btnState.show()
        })
        .catch(error => console.log(error))
}

function searchMore() {
    fetchApi.pageIncrement()
    btnState.loading()

    fetchApi.fetchImg()
        .then(data => {
            createMarkup(data)
            btnState.loaded()

            // console.log(document.documentElement.offsetHeight);
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

const btnState = {
    loaded() {
        ref.btnText.textContent = 'Load More'
        ref.spinner.classList.add('is-hidden')
    },

    loading() {
        ref.spinner.classList.remove('is-hidden')
        ref.btnText.textContent = 'Loading...'
    },

    show() {
        ref.loadMoreBtn.classList.remove('is-hidden')
    },

    hide() {
        ref.loadMoreBtn.classList.add('is-hidden')
    }
}


// console.log(modalTemplate());