/*class preloader {
    dots_;
    counter_;
    timerId_;
    preloader_;
    constructor() {
        this.dots_ =  document.querySelectorAll('.preloader__dot');
        this.preloader_ = document.querySelector('.preloader');
        this.counter_ = 0;
    }
    start() {
        this.timerId_ = setInterval(() => {
            this.dots_[this.counter_ % this.dots_.length].classList.toggle('active');
            this.counter_++;
        }, 80);
        this.preloader_.style.display = 'flex';
    }
    stop(){
        clearInterval(this.timerId_);
        this.preloader_.style.display = 'none';

    }
}*/
//let k = new preloader();

const BASE  = 'https://swapi.co/api/';
let curPage = 1;



async function getFilmCharactersApi(film) {

    //k.start();
    const info = await axios.get(BASE + `films/${film}/`);
   return info.data.characters;
}

async function getCharacter(value){
    return await axios.get(value);
}

async function getCharacters(apis) {
    //let result = [];
    const container = document.querySelector('.container');
    apis.forEach(api => {
        getCharacter(api).then(value => {
            const divUser = document.createElement('div');
            divUser.className = 'character';
            divUser.innerHTML = `
     <p>name: ${value.data.name} <br>
        birth: ${value.data.birth_year}<br>
        male: ${value.data.gender}
        </p>`;
            container.append(divUser);
        });
    });
}




const getInfoBtn = document.querySelector('.info__btn').addEventListener("click",function () {
    const inputFilm = document.querySelector('.film__input');
    document.querySelector('.container').innerHTML = '';
    let value = inputFilm.value;
    inputFilm.value = '';
    if(parseInt(value)>0 && parseInt(value)<=7) {
        getFilmCharactersApi(value)
            .then(getCharacters);

            //.then(renderCharacters);
    }else {
        alert('film out of range');
    }

});




async function getPlanets(page = '1') {
    let config = {
        params :{
            'page' : page
        }
    };
 const planets = await axios.get("https://swapi.co/api/planets/",config);
 return planets.data.results
}
function renderPlanets(planets){
    const container = document.querySelector('.planets__list');
    let i = 1;
    container.innerHTML = '';
    for (const value of planets) {
        let spanPlanet = document.createElement('span');
        spanPlanet.innerText = `${i}. ${value.name}`;
        container.append(spanPlanet);
        i++;
    }
    curPage++;
}

getPlanets().then(renderPlanets);


function arrowList(index) {

    curPage+=index;
    getPlanets(curPage).then(renderPlanets);
}

const nextList = document.querySelector('.right');

    nextList.addEventListener('click',function () {
            nextList.classList.add('active');
            setTimeout(() => {
                nextList.classList.remove('active');
            }, 300);
        if(curPage<=6) {
            arrowList(1);
        }else alert('list out of range')
});
const previousList = document.querySelector('.left');

previousList.addEventListener('click',function () {
    previousList.classList.add('active');
    setTimeout(() => {
        previousList.classList.remove('active');
    }, 300);
    if(curPage>=2) {
        arrowList(-2);
    }else alert('list out of range')
});






