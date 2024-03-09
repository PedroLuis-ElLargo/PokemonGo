const listaPokemon = document.querySelector("#listaPokemon");
const btnHeader = document.querySelectorAll(".btn-header");
let URL = " https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 150; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data) => mostrarPokemon(data))
}

function mostrarPokemon(data) {

    let tiposHabilidad = data.types.map( ( type ) => `<p class="${ type.type.name } tipo">${ type.type.name  }</p>` ).join(" ");
    let tipoCapacidad = data.abilities.map( ( type ) => `<p class="capacidad">${ type.ability.name  }</p>` ).join(" ");
    console.log(tipoCapacidad);
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-img">
            <img src="${ data.sprites.other["official-artwork"].front_default }" alt="${  data.name }">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${data.id}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${ tiposHabilidad } 
            </div>
            <div class="pokemon-stats">
                <p class="stat">${ data.height }m</p>
                <p class="stat">${ data.weight }kg</p>
            </div>
            <div class="habilidad">
                ${ tipoCapacidad }
            </div>
        </div>
    `;
    listaPokemon.append( div );

}

btnHeader.forEach( btn => btn.addEventListener('click', ( event ) => {

    listaPokemon.innerHTML = "";
    const filtro = event.currentTarget.id;
    for (let i = 1; i <= 150; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then((data) => {
                if(filtro === "ver-todos"){
                    mostrarPokemon( data );
                }else{
                    const tiposHabilidad = data.types.map(type => type.type.name);
                    if(tiposHabilidad.some(tipo => tipo.includes(filtro))){
                        mostrarPokemon( data );
                    } 
                }
            })
    }

}))
