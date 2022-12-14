const pokemon = document.querySelector(".pokemon");
const refreshBtn = document.querySelector(".refresh");

refreshBtn.addEventListener("click", takePoke);

function getPokes() {
  const id = Math.floor(Math.random() * 905 + 1);
  const url = `https://pokeapi.co/api/v2/pokemon/`;
  refreshBtn.textContent = "Another one!";

  return fetch(url + id).then((response) => {
    if (!response.ok) {
      console.log(response.status);
    }
    return response.json();
  });
}

function takePoke() {
  pokemon.innerHTML = "";
  getPokes().then((poke) => {
    const data = {
      name: poke.name,
      ability: poke.abilities[0].ability.name,
      photo: poke.sprites.front_default,
      hp: poke.stats[0].base_stat,
      attack: poke.stats[1].base_stat,
      defence: poke.stats[2].base_stat,
      speed: poke.stats[5].base_stat,
    };
    return createCard(data);
  });
}

function createCard(data) {
  const markup = `<h2 class="health">${data.hp}</h2>
      <img src="${data.photo}" alt="${data.name}" width = "200" height = "200">
      <h1 class="name">${data.name}</h1>
      <h2 class="ability">main skill: ${data.ability}</h2>
      <ul class="stats">
        <li class="attack">Attack: ${data.attack}</li>
        <li class="defence">Defence: ${data.defence}</li>
        <li class="speed">Speed: ${data.speed}</li>
      </ul>`;

  return (pokemon.innerHTML = markup);
}
