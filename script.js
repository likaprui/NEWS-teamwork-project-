let img = document.getElementById("mainSliderImg")
let i=0
let pics = ["slider-img/ppl.png", "slider-img/office.png", "slider-img/magazine.jpg", "slider-img/social.png"]
let circles = document.getElementsByClassName("balls")

setInterval(() => {
    for(let char of circles){
        char.style.backgroundColor=""
    }
    
    img.src=pics[i]
    circles[i].style.backgroundColor="white"

    if(i<pics.length){
        i++

    }if(i==pics.length){
        i=0
        
    }

}, 2000);