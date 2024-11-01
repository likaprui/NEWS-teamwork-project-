
// menu
let menu = document.getElementById("menu");
let navbar = document.getElementsByTagName("nav")[0];

menu.addEventListener("click", () => {
    if (navbar.style.visibility === "hidden" || navbar.style.visibility === "") {
        navbar.style.visibility = "visible"
        navbar.classList.add('visible')
    } else {
        navbar.style.visibility = "hidden";
        navbar.classList.remove('visible')
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.style.visibility = "visible";
    } else {
        navbar.style.visibility = "hidden";
    }
});
// news drop-down

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



// contact page
let aContact=document.getElementById("a-contact")
let mainPort=document.getElementsByTagName("main")[0]
let contactPage=document.getElementsByClassName("contact-page")[0]
aContact.addEventListener("click", ()=>{
    contactPage.style.display="flex"
    mainPort.innerHTML=""
    mainPort.appendChild(contactPage)
    console.log("jj")
})



let afterDiv=document.getElementsByClassName("after")[0]
let raketa=document.getElementsByClassName("raketa")[0]
let img=document.getElementById("planetimg")
let h1=document.getElementById("h1")
let date =document.getElementById("p1")
let description =document.getElementById("p2")

let flyDiv=document.getElementsByClassName("fly")[0]
raketa.addEventListener('animationend', function(){
    afterDiv.classList.add('show')
    flyDiv.style.display="none"
})

async function fetchNaseApi(){
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=E0LbNVZ71l4YZ2wZZOzwKK943oSWY7yXvh4FGfeT") 
    const data = await response.json()
    design(data)

}
async function main() {
    await fetchNaseApi()
    await nasaInfo()
}
main()
function design(data){
    console.log(data)
    img.style.backgroundImage = `url(${data.url})`
    img.style.backgroundSize = "cover"
    img.style.backgroundPosition = "center"
    date.textContent = data.date
    description.textContent = data.explanation
    h1.textContent = data.title
    
}



async function nasaInfo() {
    const response= await fetch("https://api.nasa.gov/techtransfer/patent/?engine&api_key=CGPCkd1DYaeoHorHcSHA5DX5jYPMrFE0AsS4Bmvi")
    const data= await response.json()
    DesignNasaInfos(data);
}

const sectionss=document.getElementsByClassName("card")
const Details=document.getElementsByClassName("details")[0]
// const h2s=sections[i].querySelectorAll("h2")

let imgForDetalize=document.getElementById("details-img")
let newsDetalizeDiv=document.getElementsByClassName("NewsDetalize")[0]
let moreBtn=document.getElementsByClassName("more")
let info = document.getElementsByClassName("info")



function DesignNasaInfos(data){
    console.log(data)
    for (let i=0; i<sectionss.length; i++){
        sectionss[i].style.backgroundImage=`url(${data.results[i][10]})`
        sectionss[i].style.backgroundSize="cover"
        sectionss[i].style.backgroundPosition="center"
        // Details[i].innerHTML=data.results[i][3]
        sectionss[i].querySelector("h1").innerHTML=data.results[i][2]

        moreBtn[i].setAttribute('data-index', i)

        moreBtn[i].addEventListener("click", ()=>{
            // const index=this.getAttribute('data-index')
            let index=i

            console.log("lllll")
            // newsDetalizeDiv.innerHTML=""
            newsDetalizeDiv.querySelector("h1").innerHTML=data.results[index][2]
            Details.innerHTML=data.results[index][3]
            imgForDetalize.src=data.results[index][10]

        })
    }
}



let search = document.getElementById("Search")

const projects = {
    "Mars Rover": "The Mars Rover program includes several rovers, such as Spirit, Opportunity, Curiosity, and Perseverance. These rovers are equipped with scientific instruments to analyze soil, rock, and atmosphere, searching for signs of water and life. Curiosity has discovered evidence of ancient riverbeds, while Perseverance is collecting samples for future return to Earth.",
    "Apollo": "The Apollo program was one of the most ambitious space missions in history, consisting of 17 missions from 1961 to 1972. Apollo 11 successfully landed astronauts Neil Armstrong and Buzz Aldrin on the Moon on July 20, 1969, marking a significant milestone in human exploration. The program also included the Apollo Lunar Module, which facilitated landing and takeoff from the lunar surface.",
    "Hubble": "The Hubble Space Telescope has provided over 30 years of astronomical data, contributing to discoveries such as the acceleration of the universe's expansion and the identification of exoplanets. Hubble's deep-field images have revealed thousands of galaxies, enhancing our understanding of galaxy formation and evolution.",
    "James Webb": "The James Webb Space Telescope is designed to observe the universe in infrared wavelengths, allowing it to see through dust clouds and study the formation of stars and galaxies. It aims to investigate the atmospheres of exoplanets and explore the origins of the universe, with capabilities far beyond those of Hubble.",
    "Voyager": "The Voyager program, consisting of Voyager 1 and 2, has traveled farther than any human-made objects. Voyager 1 entered interstellar space in 2012, while Voyager 2 followed suit in 2018. Both spacecraft carry the Golden Record, a message to any extraterrestrial life that may encounter them, containing sounds and images representing humanity.",
    "Curiosity": "Curiosity, a car-sized rover, has been exploring Mars since 2012. It has a suite of 10 scientific instruments, including a drill to collect samples and a laser to analyze rock compositions. Curiosity has provided significant insights into Mars' past environment, including the discovery of ancient organic molecules.",
    "Perseverance": "Launched in 2020, Perseverance is equipped with advanced technologies such as the MOXIE experiment, which converts Martian carbon dioxide into oxygen. It is also testing new methods for producing oxygen on Mars, essential for future human missions. Perseverance is actively collecting rock and soil samples for a future mission to bring them back to Earth.",
    "Artemis": "The Artemis program aims to establish a sustainable human presence on the Moon by the end of the decade. It includes the development of the Space Launch System (SLS) and the Orion spacecraft, which will carry astronauts to lunar orbit. Artemis I was an uncrewed test flight, paving the way for future crewed missions.",
    "Lunar Gateway": "The Lunar Gateway will be a small space station orbiting the Moon, serving as a staging ground for lunar landings and deep-space missions. It will facilitate international collaboration and provide support for long-duration human missions to the Moon and Mars, enhancing scientific research capabilities.",
    "Earth Observing System": "The Earth Observing System consists of various satellites, including Terra and Aqua, that monitor Earth's climate and environmental changes. These satellites collect data on atmospheric conditions, land use, and ocean dynamics, providing critical information for climate modeling and disaster response."
}

search.addEventListener("click", function() {
    const input = document.getElementById("projectInput").value
    const infoDiv = document.getElementById("projectInfo")
    infoDiv.innerHTML = ""

    const projectInfo = projects[input]
    if (projectInfo) {
        infoDiv.innerHTML = `<p>${projectInfo}</p>`
        infoDiv.style.display = "block"
    } else {
        infoDiv.innerHTML = "<p>Project not found. Please try another name.</p>"
    }
})
