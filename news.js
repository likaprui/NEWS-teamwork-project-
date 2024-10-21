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

const displayNews = (data) => {
    const articles = data.articles.slice(0, 22); // Get the first 18 articles
    const gridItems = document.querySelectorAll('.grid-container .item'); // Select all grid items
    
    // Clear grid items
    gridItems.forEach(gridItem => {
        gridItem.innerHTML = ''; // Clear content before displaying new results
    });
    
    articles.forEach((article, index) => {
        const gridItem = gridItems[index]; // Select the corresponding grid item for each article

        // Create HTML content for each article
        gridItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; height: auto;">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
    });
}

// Fetch and display news for the default location (Georgia) on page load
NewsApi()
    .then(displayNews)
    .catch(() => {
        console.log('Fetching error')
    });

// Event listener for the "Get News" button
document.getElementById('fetch-location-news-btn').addEventListener('click', () => {
    const locationInput = document.getElementById('location-news').value.trim();

    if (locationInput) {
        // Fetch and display news based on user input
        NewsApi(locationInput)
            .then(displayNews)
            .catch(() => {
                console.log('Fetching error')
            });
    } else {
        // If the input is empty, show a message or handle accordingly
        console.log('Please enter a valid location');
    }
});
