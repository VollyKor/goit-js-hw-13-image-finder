import './styles.css';
import ref from './js/refs'
import fetchImg from './js/apiService'
import template from './templates/gallery-template.hbs'
var debounce = require('lodash.debounce');

ref.loadMoreBtn.addEventListener('click', searchMore)


ref.form.addEventListener('submit', (e) => {
    e.preventDefault();
})

 function  searchImg(){  
    ref.input.addEventListener('input', debounce(() => {
        const inputValue = ref.input.value;
        console.log(inputValue);
        createGallery(inputValue)
    }, 1000));
}

function createGallery(nameToSearch){
    ref.container.innerHTML = ' '

    fetchImg(1, nameToSearch)
    .then(data => {
        const markup = template(data.hits)
        ref.container.insertAdjacentHTML('beforeend', markup)
    })
}

searchImg()

function addPage (page) {
    return page += 1;
       };

function searchMore(){
 const currentSerachName = ref.input.value;

    fetchImg(page, currentSerachName)
    .then(data => {
        console.log(data.hits);
        const markup = template(data.hits)
        ref.container.insertAdjacentHTML('beforeend', markup)
    })
}


