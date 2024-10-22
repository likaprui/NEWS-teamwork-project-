// contact page function

let aContact=document.getElementById("a-contact")
let mainPort=document.getElementsByTagName("main")[0]
let contactPage=document.getElementsByClassName("contact-page")[0]
aContact.addEventListener("click", ()=>{
    contactPage.style.display="flex"
    mainPort.innerHTML=""
    mainPort.appendChild(contactPage)
    console.log("jj")
})











let img = document.getElementById("mainSliderImg")
let i=0
let pics = ["slider-img/ppl.png", "slider-img/office.png", "slider-img/magazine.jpg", "slider-img/social.png"]
let circles = document.getElementsByClassName("balls")

function updateSlider(){
    for(let char of circles){
        char.style.backgroundColor=""
    }
    
    img.src=pics[i]
    circles[i].style.backgroundColor="white"
}
setInterval(function(){
    i=(i+1)%pics.length
    updateSlider()
},2000)
for(let j=0; j<circles.length; j++){
    circles[j].onclick=function(){
        i=j
        updateSlider()
    }
}
updateSlider()


const newsA=document.getElementById("news-a")
const newsTypesList=document.getElementById("news-types")

newsA.addEventListener("click", function(e){
    e.preventDefault();

    if(newsTypesList.classList.contains("show")){
        newsTypesList.classList.remove("show")
        newsA.classList.remove("open")
    }else{
        newsTypesList.classList.add("show")
        newsA.classList.add("open")
    }
})


async function fetchAPI() {
    const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2024-09-21&sortBy=publishedAt&apiKey=69a73cba10144226a49cf73310e98629")
    const data = await response.json()
    get(data)
}


async function main() {
    await fetchAPI()
}
main()

function get(data){
    // console.log(data)
    Design(data);
}

let title=document.getElementsByClassName("h2")
let infoDiv=document.getElementsByClassName("info-boxs")

let title2=document.getElementsByClassName("h22")
let littleBox=document.getElementsByClassName("news-divs")



function Design(data){
    console.log(data)
    for (let i=0; i<title.length; i++){
        console.log(data.articles[i].title)
        if(data.articles[i].title!=""){
            title[i].textContent=data.articles[i].title
            title[i].style.backgroundColor="#fff4e4e1"
            title[i].style.color="#000"
        }
        if(data.articles[i].urlToImage){
            infoDiv[i].style.backgroundImage= `url(${data.articles[i].urlToImage})`
            infoDiv[i].style.backgroundSize="cover";
            infoDiv[i].style.backgroundPosition = "center"
            infoDiv[i].style.cursor="pointer"
        }else{
            infoDiv[i].style.backgroundImage= "url('slider-img/ppl.png')"
        }

        infoDiv[i].addEventListener("click", ()=>{
            window.location.href=data.articles[i].url
        })
    }

    for(i=0; i<title2.length; i++){
        if(data.articles[i+title.length].title){
            title2[i].textContent=data.articles[i+title.length].title
            title2[i].style.backgroundColor="#fff4e4e1"
            title2[i].style.color="#000"
            littleBox[i].style.backgroundImage= `url(${data.articles[i+title.length].urlToImage})`
            littleBox[i].style.backgroundSize="cover";
            littleBox[i].style.backgroundPosition = "center"
            littleBox[i].style.cursor="pointer"
        }
        littleBox[i].addEventListener("click", ()=>{
            window.location.href=data.articles[i+title.length].url
        })
    }

    
}



// menu
let menu=document.getElementById("menu")
let navbar=document.getElementsByTagName("nav")[0]

menu.addEventListener("click", ()=>{
    if(navbar.style.visibility==="hidden"){
        navbar.style.visibility="visible";
    }
    else{
        navbar.style.visibility="hidden"
        
    }
})

window.addEventListener('resize', ()=>{
    if(window.innerWidth>640){
        navbar.style.visibility="visible"
    }else{
        navbar.style.visibility="hidden"
    }
})


