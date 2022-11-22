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
  // if the key exists, DON'T FETCH and get data from localstorage instead
  // if the key doesn't exist, fetch from the API and store the results in localstorage
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
      error.textContent = `ERROR: ${err.message}`;
      error.classList.remove('hidden');
    });
}
