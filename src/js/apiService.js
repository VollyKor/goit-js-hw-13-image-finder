const axios = require('axios')

export default {
    apiKey: '18765895-18a10ce9a19270e66dddd4391',
    page: 1,
    search: '', 
     
    fetchImg (){   
       const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=12&key=${this.apiKey}`;
        return axios.get(url)
        .then(({data}) => data)
        .catch(error => {throw error})
    },

    pageIncrement (){
        return this.page +=1;
    }    
}
