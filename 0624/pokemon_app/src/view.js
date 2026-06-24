const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");

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

export const renderPokemon = (data, jpName) => {
  console.log(data);
  const displayName = jpName ?? data.name;
  card.innerHTML = `
    <h2>${displayName} <small>(${data.name})</small></h2>
    <img src="${data.sprites.front_default}" alt="${displayName}">
  `;
  card.hidden = false;
  errorEl.hidden = true;
};
