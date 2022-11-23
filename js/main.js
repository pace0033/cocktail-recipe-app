import { NetworkError } from './utils.js';

// API Docs: https://www.thecocktaildb.com/api.php
const button = document.getElementById('search');
// set click event listener on button
button.addEventListener('click', handleSearch);

// make search handler
function handleSearch(ev) {
  ev.preventDefault();
  const error = document.querySelector('.error');

  const searchTerm = document
    .getElementById('cocktail')
    .value.trim()
    .toLowerCase();

  if (!searchTerm) {
    error.textContent = 'Please enter a search term.';
    error.classList.remove('hidden');
    return;
  } else {
    error.classList.add('hidden');
  }

  // check localstorage for search key
  const storage = localStorage.getItem(searchTerm);
  if (storage) {
    // we found something in localstorage
    // show the drinks on the screen from our localstorage results
    console.log('found something!');
    console.log(storage);
    const drinks = JSON.parse(storage);
    console.log(drinks);
    showResults(drinks);
  } else {
    // nothing was found, let's FETCH!
    console.log('nothing in localstorage');
    // if the key doesn't exist, fetch from the API and store the results in localstorage
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new NetworkError('Failed API Call', res);
        return res.json();
      })
      .then((data) => {
        console.log(data.drinks);
        showResults(data.drinks);

        // save into localstorage
        const key = searchTerm;
        const value = JSON.stringify(data.drinks);
        localStorage.setItem(key, value);
      })
      .catch((err) => {
        if (err.name === 'NetworkError') {
          console.log('we had a network error!');
        }
        console.error(err);
        error.textContent = `ERROR: ${err.message}`;
        error.classList.remove('hidden');
      });
  }
}

function showResults(drinks) {
  const drinksList = document.querySelector('.drinks');
  const html = drinks
    .map((cocktail) => {
      return `
      <li class="card">${cocktail.strDrink}</li>
    `;
    })
    .join('');
  drinksList.innerHTML = html;
}
