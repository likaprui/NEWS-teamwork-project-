let api = "https://api.apify.com/v2/datasets/DYdfkga9FjIqv8ATm/items?clean=true&format=json";

let img1=document.getElementsByClassName("first-div")[0]
let img2=document.getElementsByClassName("img")[0]
let img3=document.getElementsByClassName("imgg")[0]

let mainDescription=document.getElementsByClassName("description")[0]
let num=document.getElementsByClassName("number")[0]

function fetchData(){
  fetch(api)
    .then(response => {
      return response.json();
    })
  .then(data => {
    Design(data);
  });
}


function Design(data){  
    console.log(data)
    
    let index=0

    
    const asyncFunc = setInterval( () => {
      let obj = data[index]

        if(Array.isArray(obj.images) && obj.images.length>=3){
            console.log(obj)

            let imgSrc1=obj.images[0]
            let imgSrc2=obj.images[1]
            let imgSrc3=obj.images[2]

            img1.style.backgroundImage=`url(${imgSrc1})`
            img2.style.backgroundImage=`url(${imgSrc2})`
            img3.style.backgroundImage=`url(${imgSrc3})`

            img1.style.backgroundSize="cover"
            img2.style.backgroundSize="cover"
            img3.style.backgroundSize="cover"

            img1.style.backgroundPosition="cover"
            img2.style.backgroundPosition="cover"
            img3.style.backgroundPosition="cover"

            let description=obj.caption
            mainDescription.textContent=description
            num.innerHTML=index

            startAnimation()
        }
        index= (index+1) % data.length;
    }, 3000)
        
  }
    
function startAnimation(){
  img1.classList.remove('animation')
  img2.parentElement.classList.remove('animation')
  img3.parentElement.classList.remove('animation')

  setTimeout(()=>{
    img1.classList.add('animation')
    img2.parentElement.classList.add('animation')
    img3.parentElement.classList.remove('animation')
  })
}
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
    mainPort.innerHTML=""
    mainPort.appendChild(contactPage)
    console.log("jj")
    document.body.style.height="auto"
    document.querySelector("main").style.width="80%"
    document.body.style.backgroundColor="#F2EDE6"
    document.body.style.overflow="auto"
    document.querySelector("main").paddingBottom="70px"

})