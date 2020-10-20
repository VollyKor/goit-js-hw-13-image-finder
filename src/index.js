import './styles.css';
import ref from './js/refs'
import fetchApi from './js/apiService'
import template from './templates/gallery-template.hbs'
var debounce = require('lodash.debounce');

ref.form.addEventListener('submit', (e) => e.preventDefault())

ref.loadMoreBtn.addEventListener('click', searchMore)

searchImg()

function  searchImg(){  
    ref.input.addEventListener('input', debounce(() => {
        const inputValue = ref.input.value;

        createGallery(inputValue)
    }, 1000));
}

function createGallery(searchName){
    ref.container.innerHTML = '';

    fetchApi.page = 1;
    fetchApi.search = searchName;

    fetchApi.fetchImg()
    .then(data => createMarkup(data))
}

function createMarkup (data){
    const markup = template(data.hits)
    ref.container.insertAdjacentHTML('beforeend', markup)
}

function searchMore(){
    fetchApi.pageIncrement()

    fetchApi.fetchImg()
       .then(data => createMarkup(data))
       .catch(error => console.log(error))
}