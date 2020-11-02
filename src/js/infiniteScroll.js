export default
 function infiniteLoading (element, searchFnc){
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                searchFnc()
                io.unobserve(element)
            }
        })
    } )
    io.observe(element)
} 