let countries = [];
let isDarkMode = false;

async function fetchCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countries = await response.json();
    renderCountries(countries);
}

function renderCountries(countryList) {
    const container = document.getElementById("countries-container");
    container.innerHTML = "";

    countryList.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";
        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} bayrog‘i">
            <h3>${country.name.common}</h3>
        `;
        card.onclick = () => showCountryInfo(country);
        container.appendChild(card);
    });
}

function showCountryInfo(country) {
    document.getElementById("city-info").style.display = "block";
    document.getElementById("countries-container").style.display = "none";
    document.getElementById("city-name").textContent = country.name.common;
    document.getElementById("city-flag").src = country.flags.png;
    document.getElementById("city-description").textContent = `Qit'a: ${country.region}, Mintaqa: ${country.subregion}`;
}

document.getElementById("backButton").onclick = () => {
    document.getElementById("city-info").style.display = "none";
    document.getElementById("countries-container").style.display = "block";
};

document.getElementById("countrySearch").oninput = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery));
    renderCountries(filteredCountries);
};

document.getElementById("continentSelect").onchange = (e) => {
    const selectedContinent = e.target.value;
    const filteredCountries = selectedContinent ? countries.filter(country => country.region === selectedContinent) : countries;
    renderCountries(filteredCountries);
};

document.getElementById("darkModeButton").onclick = () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.getElementById("darkModeButton").textContent = isDarkMode ? "Light Mode" : "Dark Mode";
};

fetchCountries();