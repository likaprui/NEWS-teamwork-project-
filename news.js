// drop-down menu
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

// contact page function
let aContact=document.getElementById("a-contact")
let mainPort=document.getElementsByTagName("main")[0]
let contactPage=document.getElementsByClassName("contact-page")[0]
aContact.addEventListener("click", ()=>{
    contactPage.style.display="flex"
    contactPage.style.width="90%"
    document.body.style.backgroundColor="#F2EDE6"
    mainPort.style.backgroundColor="#F2EDE6"
    document.body.style.overflow="auto"
    document.body.height="110vh"
    document.querySelector("main").paddingBottom="70px"
    mainPort.innerHTML=""
    mainPort.style.display="flex"
    mainPort.style.alignItems="center"
    mainPort.style.borderRight="1px solid black"
    mainPort.style.borderLeft="1px solid black"

    mainPort.appendChild(contactPage)
    console.log("jj")
    document.body.style.height="auto"
    document.querySelector("main").style.width="80%"
    document.querySelector("header").style.borderBottom="1px solid black"


})
// menu
let menu=document.getElementById("menu")
let navbar=document.getElementsByTagName("nav")[0]

menu.addEventListener("click", ()=> {
    navbar.classList.toggle('visible');
})



// news API

let userLocation = "Georgia AND Tbilisi NOT state NOT Atlanta";

function NewsApi(location = "Georgia AND Tbilisi NOT state NOT Atlanta") {
    return new Promise((resolve, reject) => {
        fetch(`https://newsapi.org/v2/everything?q=${location}&apiKey=abf1f6efc6d049bb9429577f97afc4b1`)
            .then((data) => data.json())
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                console.log('Fetching Error');
                reject('Fetching Error');
            });
    });
}

const generateGridTemplateAreas = (batchIndex) => {
    return `
        "item${batchIndex * 22 + 1} item${batchIndex * 22 + 2} item${batchIndex * 22 + 2}"
        "item${batchIndex * 22 + 3} item${batchIndex * 22 + 3} item${batchIndex * 22 + 4}"
        "item${batchIndex * 22 + 5} item${batchIndex * 22 + 6} item${batchIndex * 22 + 7}"
        "item${batchIndex * 22 + 8} item${batchIndex * 22 + 9} item${batchIndex * 22 + 10}"
        "item${batchIndex * 22 + 11} item${batchIndex * 22 + 11} item${batchIndex * 22 + 12}"
        "item${batchIndex * 22 + 13} item${batchIndex * 22 + 14} item${batchIndex * 22 + 14}"
        "item${batchIndex * 22 + 15} item${batchIndex * 22 + 16} item${batchIndex * 22 + 17}"
        "item${batchIndex * 22 + 18} item${batchIndex * 22 + 19} item${batchIndex * 22 + 20}"
        "item${batchIndex * 22 + 21} item${batchIndex * 22 + 22} item${batchIndex * 22 + 22}";`
};

const displayNews = (data) => {
    console.log(data);

    const articles = data.articles;
    const gridContainer = document.querySelector('.grid-container');

    // Clear the existing content
    gridContainer.innerHTML = '';

    // Initialize an empty grid template
    let gridTemplate = '';

    // For each article
    articles.forEach((article, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('news-grid-item', `item-${index + 1}`);

        gridItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; height: auto;" onerror="this.src='https://media.istockphoto.com/id/1313303632/video/breaking-news-template-intro-for-tv-broadcast-news-show-program-with-3d-breaking-news-text.jpg?s=640x640&k=20&c=S0dTZp37XKVcCAnoguMnRatvv4Nkp2cjmA5aYOOrJs8=';">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        gridContainer.appendChild(gridItem);

        // For each batch of 22 items, generate a new grid template
        const batchIndex = Math.floor(index / 22);
        
        // Append the grid template for the new batch
        if (index % 22 === 0) {
            gridTemplate += generateGridTemplateAreas(batchIndex);
        }
    });

    // Apply the full grid-template-areas after all items are added
    gridContainer.style.gridTemplateAreas = gridTemplate;
};

const filterButtons = [
    { id: 'filter-sports-btn', query: 'sports' },
    { id: 'filter-business-btn', query: 'business' },
    { id: 'filter-technology-btn', query: 'technology' },
    { id: 'filter-entertainment-btn', query: 'entertainment' },
    { id: 'filter-health-btn', query: 'health' },
    { id: 'filter-science-btn', query: 'science' },
    { id: 'filter-political-btn', query: 'political' }
];

filterButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
        // Reset userLocation to the default before adding the new filter
        const filteredLocation = `${userLocation} AND ${button.query}`;

        document.getElementById('location-news-div').style.display= "block";
        document.getElementById('usersArticlesSection').style.display= "none";

        NewsApi(filteredLocation)
            .then((data) => {
                displayNews(data);
            })
            .catch(() => {
                console.log('Fetching error');
            });
    });
});

NewsApi()
    .then(displayNews)
    .catch(() => {
        console.log('Fetching error')
    });

function addSpinner(button) {
    button.innerHTML = '<span class="spinner"><i class="fa fa-spinner fa-spin"></span>';
    button.disabled = true;
}

function removeSpinner(button) {
    button.innerHTML = 'Get News';
    button.disabled = false;
}

document.getElementById('fetch-location-news-btn').addEventListener('click', () => {
    const locationInput = document.getElementById('location-news').value.trim();
    const button = document.getElementById('fetch-location-news-btn');

    userLocation = locationInput.toLowerCase() === 'georgia' 
        ? "Georgia AND Tbilisi NOT state NOT Atlanta" 
        : locationInput;

    if (userLocation) {
        addSpinner(button);

        NewsApi(locationInput)
            .then((data) => {
                displayNews(data);
                removeSpinner(button);
            })
            .catch(() => {
                console.log('Fetching error');
                removeSpinner(button);
            });
    } else {
        console.log('Please enter a valid location');
    }

    if (locationInput.toLowerCase() !== "georgia" && locationInput.toLowerCase() !== "tbilisi") {
        document.getElementById("usersArticlesSection").style.display = 'none';
        document.getElementById("openModal").style.display = 'none';
        document.getElementById("usersNews").style.display = 'none';
    } else {
        document.getElementById("usersArticlesSection").style.display = 'block';
        document.getElementById("openModal").style.display = 'block';
        document.getElementById("usersNews").style.display = 'block';
    }
});

// user articles
function saveArticlesToLocalStorage(articles) {
    localStorage.setItem('articles', JSON.stringify(articles));
}

function loadArticlesFromLocalStorage() {
    const articles = JSON.parse(localStorage.getItem('articles')) || []
    return articles
}
// localStorage.clear()

function renderArticles(articles) {
    const articlesContainer = document.getElementById('usersArticlesContainer');
    articlesContainer.innerHTML = ''

    articles.forEach(article => {
        const articleCard = document.createElement('div')
        articleCard.className = 'users-article-card'
        articleCard.innerHTML = `
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="Article Image">` : ''}
            <h3>${article.title}</h3>
            <p>${article.text}</p>
            <p><strong>Author:</strong> ${article.author}</p>
        `;
        articlesContainer.appendChild(articleCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const articles = loadArticlesFromLocalStorage();
    renderArticles(articles);
});

document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('articleModal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('articleModal').style.display = 'none';
});

document.getElementById('saveArticle').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('text').value;
    const imageUrl = document.getElementById('image').value;

    if (!title || !author || !email || !text || !imageUrl) {
        alert('Please fill in all required fields.');
        return
    }

    const articles = loadArticlesFromLocalStorage()

    const newArticle = {
        title,
        author,
        email,
        text,
        imageUrl
    };

    articles.push(newArticle);

    saveArticlesToLocalStorage(articles)

    renderArticles(articles);

    document.getElementById('articleForm').reset()

    document.getElementById('articleModal').style.display = 'none'
});

document.getElementById('usersNews').addEventListener('click', function() {
    document.getElementById('location-news-div').style.display= "none"
    document.getElementById('usersArticlesSection').style.display= "block";

});