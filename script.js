const imageContainer = document.querySelector('.image-container')
const loader = document.querySelector('.loader')

let photosArray = []
let ready = false
let totalImages = 0
let imagesLoaded = 0

//Unsplash API
const count = 10
const apikey = 'WdaarSWgt_ip57lLzCI2fPonFR6xPvnxfVgMr16DtUA'
const apiurl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`



// check if we are ready to load more
function imageLoaded(){
    imagesLoaded++
    if( imagesLoaded == totalImages){
        ready = true
            loader.hidden = true
    }
}


//helper function to set attributes
function setAttributes(element , attributes){
    for(const key in attributes){
        element.setAttribute(key , attributes[key])
    }
}


// make DOM for photos to show them
function displayPhotos(){

    imagesLoaded = 0
    totalImages = photosArray.length 
    photosArray.forEach( (item , index) =>{
        console.log(index)

        // create <a> to link unsplah
        const aTag = document.createElement('a')
        setAttributes(aTag , {
            href : item.links.html,
            target : '_blank'
        })
        // create <img> for photo
        const imgTag = document.createElement('img')
        setAttributes(imgTag , {
            src: item.urls.regular,
            alt : item.alt_description,
            title : item.alt_description
        })

        //check if each pic finished loading
        imgTag.addEventListener('load' , imageLoaded)
        


        // put <img> in <a> then both in image container
        aTag.appendChild(imgTag)
        imageContainer.appendChild(aTag)

    })
}




// get photos from api
async function getPhotos() {

    try {
        const response = await fetch(apiurl)
        photosArray = await response.json()
        console.log(photosArray)
        displayPhotos()
    } catch (error) {
        console.log(error)
    }
}


// load photos if scrolled near the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    console.log('jsadk')
      ready = false;
      getPhotos();
    }
  });



//on load
getPhotos()
