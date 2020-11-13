import  Masonry from "masonry-layout"
import imagesLoaded from 'imagesloaded' ;
console.log(Masonry);

const galleryRef = document.querySelector('.gallery');

imagesLoaded(galleryRef, useMasonry)



function useMasonry() {
    console.dir(imagesLoaded.complete);
    if (imagesLoaded.complete){
        console.log("pic loaded");
        return new Masonry( '.gallery',)
    }

}