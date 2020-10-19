const axios = require('axios')

// let currentPage= '1'
// const searchName = 'cat'

function fetchImg (currentPage=1, searchName){
    const ApiKey = '18765895-18a10ce9a19270e66dddd4391'
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchName}&page=${currentPage}&per_page=12&key=${ApiKey}`

    return axios.get(url)
    .then(({data}) => data)
}

export default fetchImg