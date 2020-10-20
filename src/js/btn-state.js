import ref from './refs'

export default {
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