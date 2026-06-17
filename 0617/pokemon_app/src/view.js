const card = document.querySelector('.card');
const errorEl = document.querySelector('.error');
const loader = document.querySelector('.loader');

export const renderPokemon = (data) => {
  card.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
  `;
  card.hidden = false;
  errorEl.hidden = true;
};

export const showError = function (message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  card.hidden = true;
};

export function setLoading(isLoading) {
  loader.hidden = !isLoading;
  if (isLoading) {
    card.hidden = true;
    errorEl.hidden = true;
  }
}
