let api = "https://api.apify.com/v2/datasets/3eI0qgUa5tWUjRGhj/items?clean=true&format=json";

let img1 = document.getElementsByClassName("first-div")[0];
let img2 = document.getElementsByClassName("img")[0];
let img3 = document.getElementsByClassName("imgg")[0];

let mainDescription = document.getElementsByClassName("description")[0];
let num = document.getElementsByClassName("number")[0];

let intervalId;
let isRunning = false
let currentIndex = 0
let data = []

function fetchData() {
    return fetch(api)
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            isRunning = true;
            Design(data);
        })
}

function Design(data) {
    console.log(data);
    currentIndex = 0

    intervalId = setInterval(() => {
        if (currentIndex >= data.length) {
            currentIndex = 0
        }

        let obj = data[currentIndex];

        if (Array.isArray(obj.images) && obj.images.length >= 3) {
            console.log(obj);
            let defaultImg = "load.png";

            let imgSrc1 = obj.images[0];
            let imgSrc2 = obj.images[1];
            let imgSrc3 = obj.images[2];

            loadImage(imgSrc1, img1, defaultImg);
            loadImage(imgSrc2, img2, defaultImg);
            loadImage(imgSrc3, img3, defaultImg);

            let description = obj.caption;
            mainDescription.textContent = description;
            num.innerHTML = currentIndex;
            startAnimation();
        }
        currentIndex++; // Move to the next index
    }, 3000);
}

function loadImage(src, element, defaultImg) {
    const img = new Image();

    img.src = src;

    img.onload = function () {
        element.style.backgroundImage = `url(${src})`;
        document.getElementById("loading").style.display="none"

    };
    img.onerror = function () {
        element.style.backgroundImage = `url(${defaultImg})`
        document.getElementById("loading").style.display="none"

    };

    element.style.backgroundSize = "cover"
    element.style.backgroundPosition = "center"
}

function startAnimation() {
    img1.classList.remove('animation');
    img2.parentElement.classList.remove('animation');
    img3.parentElement.classList.remove('animation');

    setTimeout(() => {
        img1.classList.add('animation');
        img2.parentElement.classList.add('animation')
        img3.parentElement.classList.remove('animation')
    });
}

document.getElementById("stop").addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        document.getElementById("stop").querySelector("img").src = "play.png";
    } else {
        isRunning = true
        document.getElementById("stop").querySelector("img").src = "pause.png"
        Design(data);
    }
});
fetchData()



// drop-down ul

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


// contact page function

let aContact=document.getElementById("a-contact")
let mainPort=document.getElementsByTagName("main")[0]
let contactPage=document.getElementsByClassName("contact-page")[0]
aContact.addEventListener("click", ()=>{
    contactPage.style.display="flex"
    contactPage.style.width="90%"
    document.body.style.backgroundColor="#F2EDE6"
    document.body.style.overflow="auto"
    document.body.height="110vh"
    document.querySelector("main").paddingBottom="70px"
    mainPort.innerHTML=""
    mainPort.style.borderRight="1px solid black"
    mainPort.style.borderLeft="1px solid black"

    mainPort.appendChild(contactPage)
    console.log("jj")
    document.body.style.height="auto"
    document.querySelector("main").style.width="80%"
    document.querySelector("header").style.borderBottom="1px solid black"
})