let operador = 0;
async function funcaoExibeDetalhe(id) {
  let idClicado = id;
/*   console.log(idClicado); */
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${idClicado}`);
  const data = await req.json();
/*   console.log(data); */

  let namePokemon = document.querySelector('#details-name');
  let imgPokemon = document.querySelector('#img-pokemon');
  let idPokemon = document.querySelector('#id-pokemon');
  let heightPokemon = document.querySelector('#height-pokemon');
  let weightPokemon = document.querySelector('#weight-pokemon');
  let id1 = document.querySelector('#pokemon-id-1');
  let id2 = document.querySelector('#pokemon-id-2');
  let divType = document.querySelector('.pokemon-type');

  namePokemon.innerText = data.name;  
  imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idClicado}.png`;
  idPokemon.innerText = "ID: " + data.id;
  heightPokemon.innerText = "Height: " + data.height;
  weightPokemon.innerText = "Weight: " + data.weight;

  if ((data.types).length === 1 && id2 === null) {    
    id1.innerText = data.types[0].type.name;

  } else if ((data.types).length ===1 && id2 !== null){
    id1.innerText = data.types[0].type.name;
    id2.remove();

  } else if((data.types).length ===2 && id2 === null) {
    id1.innerText = data.types[0].type.name;
    const type2 = document.createElement('h3');
    divType.appendChild(type2);
    type2.setAttribute('id', 'pokemon-id-2');
    let id2 = document.querySelector('#pokemon-id-2');
    id2.innerText = data.types[1].type.name;

  } else if ((data.types).length ===2 && id2 !== null) {
    id1.innerText = data.types[0].type.name;
    let id2 = document.querySelector('#pokemon-id-2');
    id2.innerText = data.types[1].type.name;
  }
  
  const pokeDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idClicado}`);
  const description = await pokeDescription.json(); 
/*   console.log(description); */

  let descriptionPokemon = document.querySelector('#description-pokemon');
  descriptionPokemon.innerText = (description.flavor_text_entries[1].flavor_text);

  while((descriptionPokemon.innerText).includes('\n')) {
    descriptionPokemon.innerText = (descriptionPokemon.innerText).replace('\n', ' ');
  }
  
  while((descriptionPokemon.innerText).includes('\f')) {
    descriptionPokemon.innerText = (descriptionPokemon.innerText).replace('\f', ' ');
  }

}


async function pokeAPI () {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${operador}&limit=50`);
  const data = await response.json();
  /* const pokeDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`);
  const description = await pokeDescription.json(); */

  data.results.forEach(async function(indexName) {
    let pokeName = indexName.name;
    let pokeStats = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    let pokeStatsData = await pokeStats.json();

    document.querySelector('#pokemon-card-collection').insertAdjacentHTML('beforeend', 
    `
    <div class="pokemon-card" onclick="funcaoExibeDetalhe(${pokeStatsData.id})">
      <img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeStatsData.id}.png alt="pokemon icon">
      <h4 id='${pokeName}'>${pokeName}</h4>
      <h4 id="h4-hidden">${pokeStatsData.id}</h4>
    </div>    
    `
    )
        
  }); 
}

pokeAPI();

function loadmore() {
  operador+= 50;
  pokeAPI();
}
