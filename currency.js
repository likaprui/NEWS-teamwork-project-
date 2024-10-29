// a News tag drop-down
const newsA=document.getElementById("news-a")
const newsTypesList=document.getElementsByClassName("news-types")[0]

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
    mainPort.style.justifyContent="center"
    mainPort.style.alignItems="center"
    mainPort.style.backgroundColor="#F2EDE6"
    mainPort.style.borderLeft="1px solid black"
    mainPort.style.borderRight="1px solid black"
    mainPort.style.width="80%"
    mainPort.style.color="black"
    document.getElementsByClassName("h1")[0].style.color="black"
    mainPort.style.borderColor="#000"
    mainPort.style.marginBottom="50px"
    console.log("jj")

})





let toInput = document.getElementById("to-amount");
let fromInput = document.getElementById("from-amount");

const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");

let btn = document.getElementById("convert-btn");

let apiKey = "7f440e69e404475d66079ce4";

function getCurrencyApi(baseCurrency) {
    console.log(`Fetching API for base currency: ${baseCurrency}`);
    let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    return fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.conversion_rates) {
                const rates = data.conversion_rates;
                convertCurrency(rates); 
            } else {
                console.error('Invalid data received');
            }
        })

}

function convertCurrency(rates) {
    const fromAmount = parseFloat(fromInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    console.log(rates)
    // Get the conversion rate
    // const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const conversionRate=rates[toCurrency]


    // Calculate the converted amount
    const convertedAmount = fromAmount * conversionRate;
    toInput.value = convertedAmount.toFixed(2);
    console.log(`Converted Amount: ${convertedAmount.toFixed(2)}`);
}

// Handle the conversion when the button is clicked
btn.addEventListener("click", () => {
    getCurrencyApi(fromCurrencySelect.value);
});

// Optional: Update conversion when amount is typed
fromInput.addEventListener('input', () => {
    if (fromCurrencySelect.value && toCurrencySelect.value) {
        getCurrencyApi(fromCurrencySelect.value);
    }
});

// Update conversion on currency selection change
fromCurrencySelect.addEventListener('change', () => {
    getCurrencyApi(fromCurrencySelect.value);
});
toCurrencySelect.addEventListener('change', () => {
    if (fromInput.value) {
        getCurrencyApi(fromCurrencySelect.value);
    }
});


// function updateTime() {
//     const now = new Date();
//     const options = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit'
//     };
//     const formattedTime = now.toLocaleDateString('ka-GE', options).replace(',', ' /');
    
//     document.querySelector('#update-time span').textContent = formattedTime;
// }

// updateTime();

// setInterval(updateTime, 60000);

// const exchangeRates = {
//     USD: { rate: 2.8050, country: "აშშ დოლარი" },
//     EUR: { rate: 3.0480, country: "ევრო ზონა" },
//     GBP: { rate: 3.6560, country: "ბრიტანული ფუნტი" },
//     JPY: { rate: 0.019, country: "იაპონური იენი" },
//     RUB: { rate: 0.035, country: "რუსული რუბლი" },
//     CAD: { rate: 2.25, country: "კანადური დოლარი" },
//     AUD: { rate: 1.87, country: "ავსტრალიური დოლარი" },
//     CNY: { rate: 0.44, country: "ჩინური იუანი" },
//     CHF: { rate: 2.78, country: "შვეიცარული ფრანკი" },
//     SEK: { rate: 0.28, country: "შვედური კრონა" },
//     NOK: { rate: 0.27, country: "ნორვეგიული კრონა" },
//     DKK: { rate: 0.41, country: "დანიელი კრონა" },
//     PLN: { rate: 0.69, country: "პოლონური ზლოტი" },
//     TRY: { rate: 0.15, country: "თურქული ლირა" },
//     INR: { rate: 0.034, country: "ინდური რუპია" },
//     MXN: { rate: 0.14, country: "მექსიკური პესო" },
//     BRL: { rate: 0.56, country: "ბრაზილიური რეალი" },
//     SGD: { rate: 2.05, country: "სინგაპურული დოლარი" },
//     GEL: { rate: 1.0, country: "ქართული ლარი" }
// };


// function convertCurrency() {
//     const fromAmount = parseFloat(document.getElementById("from-amount").value);
//     const fromCurrency = document.getElementById("from-currency").value;
//     const toCurrency = document.getElementById("to-currency").value;

//     if (!fromAmount || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
//         alert("გთხოვთ, სწორად შეიყვანეთ მონაცემები");
//         return;
//     }

    
//     let amountInGel = fromAmount * exchangeRates[fromCurrency].rate;
//     let result = amountInGel / exchangeRates[toCurrency].rate;
    
//     document.getElementById("to-amount").value = result.toFixed(2);
// }


// const popularCurrencies = Object.keys(exchangeRates).filter(curr => curr !== 'GEL');
// function populateCurrencies() {
//     const fromCurrencySelect = document.getElementById("from-currency");
//     const toCurrencySelect = document.getElementById("to-currency");

//     popularCurrencies.forEach(currency => {
//         const optionFrom = document.createElement("option");
//         const optionTo = document.createElement("option");

//         optionFrom.value = currency;
//         optionFrom.textContent = `${currency} - ${exchangeRates[currency].country}`;

//         optionTo.value = currency;
//         optionTo.textContent = `${currency} - ${exchangeRates[currency].country}`;

//         fromCurrencySelect.appendChild(optionFrom);
//         toCurrencySelect.appendChild(optionTo);
//     });
// }

// populateCurrencies();
