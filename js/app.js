const listaPokemon = document.querySelector("#listaPokemon");
const btnHeader = document.querySelectorAll(".btn-header");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
let currentPage = 1;
const limit = 6;

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

async function cargarPokemones(page) {
  const offset = (page - 1) * limit;
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchData(URL);

  listaPokemon.innerHTML = "";
  for (const pokemon of data.results) {
    const pokemonData = await fetchData(pokemon.url);
    mostrarPokemon(pokemonData);
  }
}

function mostrarPokemon(data) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <div class="pokemon-img">
        <img src="${
          data.sprites.other["official-artwork"].front_default
        }" alt="${data.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${data.id}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${data.types
              .map(
                (type) =>
                  `<p class="${type.type.name} tipo">${type.type.name}</p>`
              )
              .join(" ")}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}m</p>
            <p class="stat">${data.weight}kg</p>
        </div>
        <div class="habilidad">
            ${data.abilities
              .map((type) => `<p class="capacidad">${type.ability.name}</p>`)
              .join(" ")}
        </div>
    </div>
  `;
  listaPokemon.append(div);
}

btnHeader.forEach((btn) =>
  btn.addEventListener("click", async (event) => {
    listaPokemon.innerHTML = "";
    const filtro = event.currentTarget.id;

    if (filtro === "ver-todos") {
      await cargarPokemones(currentPage);
    } else {
      const data = await fetchData(`https://pokeapi.co/api/v2/type/${filtro}`);
      for (const pokemon of data.pokemon.slice(0, limit)) {
        const pokemonData = await fetchData(pokemon.pokemon.url);
        mostrarPokemon(pokemonData);
      }
    }
  })
);

btnNext.addEventListener("click", async () => {
  currentPage++;
  await cargarPokemones(currentPage);
});

btnPrev.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await cargarPokemones(currentPage);
  } else {
    alert("Ya estás en la primera página");
  }
});

cargarPokemones(currentPage);
