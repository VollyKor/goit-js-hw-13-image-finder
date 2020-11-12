import  Masonry from "masonry-layout"
import imagesLoaded from 'imagesloaded' ;
console.log(Masonry);

imagesLoaded('.gallery', useMasonry)

function useMasonry() {
    console.log(imagesLoaded);
    if (imagesLoaded.isLoaded){
        console.log("pic loaded");
        return new Masonry( '.gallery',)
    }

}