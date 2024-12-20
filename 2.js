function fetchCountry() {
    var country = document.getElementById("countryName").value;
    var url = "https://restcountries.com/v3.1/name/" + country;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            processData(data[0]);
        })
        .catch(function(error) {
            console.log("Error:", error);
            document.getElementById("display").innerHTML = '<<div class="alert alert-danger">Country not found.</div>';
        });
}

function processData(country) {
    var displayDiv = document.getElementById("display");
    displayDiv.innerHTML = "";

    var card = document.createElement("div");
    card.className = "card shadow border-0";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Country flag
    var flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = "Country Flag";
    flag.className = "img-fluid mb-3";
    cardBody.appendChild(flag);

    // Country details
    var name = document.createElement("p");
    name.className = "fw-bold";
    name.innerHTML = "Country: " + country.name.common;
    cardBody.appendChild(name);

    var capital = document.createElement("p");
    capital.innerHTML = "Capital: " + (country.capital ? country.capital[0] : "N/A");
    cardBody.appendChild(capital);

    var population = document.createElement("p");
    population.innerHTML = "Population: " + country.population.toLocaleString();
    cardBody.appendChild(population);

    var region = document.createElement("p");
    region.innerHTML = "Region: " + country.region;
    cardBody.appendChild(region);

    var subregion = document.createElement("p");
    subregion.innerHTML = "Subregion: " + country.subregion;
    cardBody.appendChild(subregion);

    // Currency
    var currencies = [];
    for (var key in country.currencies) {
        var currency = country.currencies[key];
        currencies.push(currency.name + " (" + currency.symbol + ")");
    }
    var currencyInfo = document.createElement("p");
    currencyInfo.innerHTML = "Currency: " + (currencies.length > 0 ? currencies.join(", ") : "N/A");
    cardBody.appendChild(currencyInfo);

    // Languages
    var languages = [];
    for (var langKey in country.languages) {
        languages.push(country.languages[langKey]);
    }
    var languageInfo = document.createElement("p");
    languageInfo.innerHTML = "Languages: " + (languages.length > 0 ? languages.join(", ") : "N/A");
    cardBody.appendChild(languageInfo);

    card.appendChild(cardBody);
    displayDiv.appendChild(card);
}