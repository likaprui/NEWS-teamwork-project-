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
        userLocation = `Georgia AND Tbilisi NOT state NOT Atlanta AND ${button.query}`;

        NewsApi(userLocation)
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

    if (locationInput) {
        userLocation = locationInput;

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
});