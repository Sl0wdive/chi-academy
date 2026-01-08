// 1. Шаблони проєктування:

class Transport {
  ride() {
    throw new Error("ride() not implemented");
  }
  stop() {
    throw new Error("stop() not implemented");
  }
}

class Car extends Transport {
  constructor() {
    super();
    this.type = "Car";
  }
  ride() {
    console.log(`The ${this.type} is riding`);
  }
  stop() {
    console.log(`The ${this.type} is stopping`);
  }
}

class Bike extends Transport {
  constructor() {
    super();
    this.type = "Bike";
  }
  ride() {
    console.log(`The ${this.type} is riding`);
  }
  stop() {
    console.log(`The ${this.type} is stopping`);
  }
}

class TransportFactory {
  static createTransport(type) {
    switch (type) {
      case "car":
        return new Car();
      case "bike":
        return new Bike();
      default:
        throw new Error("Unknown transport type");
    }
  }
}

const myCar = TransportFactory.createTransport("car");
myCar.ride();
myCar.stop();

const myBike = TransportFactory.createTransport("bike");
myBike.ride();
myBike.stop();

//2. Робота з DOM:

const list = document.getElementById("characterList");
const status = document.getElementById("status");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;

async function fetchCharacters(page) {
  status.textContent = "Loading…";
  list.innerHTML = "";

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();

  renderCharacters(data.results);
  updatePagination(data.info);

  status.textContent = "";
}

function renderCharacters(characters) {
  characters.forEach((character) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <span>${character.name}</span>
    `;

    list.appendChild(li);
  });
}

function updatePagination(info) {
  prevBtn.disabled = info.prev === null;
  nextBtn.disabled = info.next === null;

  if (info.next) {
    const url = new URL(info.next);
    pageNumber.textContent = url.searchParams.get("page") - 1;
    currentPage = Number(pageNumber.textContent);
  } else {
    pageNumber.textContent = info.pages;
    currentPage = info.pages;
  }
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    fetchCharacters(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  fetchCharacters(currentPage + 1);
});

fetchCharacters(1);
