const pokeInput = document.querySelector('#poke-input');

const pokemonPhoto = document.querySelector('#pokemon-photo');
const pokename = document.querySelector('#pokename');
const skills = document.querySelectorAll('.skill');
const weight = document.querySelector('.weight');
const types = document.querySelectorAll('.types');
const id = document.querySelector('.id')

pokeInput.addEventListener('change', () => {
    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput.value}`);
    promise.then((res) => {
        const json = res.json();

        json.then((body) => {
            resetParams();
            pokeInfo(body, skills);
        });
    });
})

function pokeInfo(res, skills) {

    pokeInput.value = ''
    pokename.textContent = res.name.toUpperCase();
    pokemonPhoto.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.id}.png`;
    weight.textContent = "Weight:  " + res.weight + ' lbs';
    id.textContent = "ID:   " + res.id;

    for (let i = 0; i < skills.length; i++) {
        if (res.abilities[i]) {
            skills[i].textContent = res.abilities[i].ability.name.toUpperCase()
        }
        else {
            skills[i].textContent = ''
            console.log("Skill não encontrada");
            return;
        }
        for (let j = 0; j < types.length; j++) {
            if (res.types[j]) {
                types[j].textContent = res.types[j].type.name.toUpperCase();
            }
            else {
                types[j].textContent = ''
                console.log("Tipo não encontrado");
                return;
            }
        }
    }
}
function resetParams() {
    for (let e = 0; e < types.length; e++) {
        types[e].textContent = ''
    }
    for (let d = 0; d < skills.length; d++) {
        skills[d].textContent = ''
    }

}

