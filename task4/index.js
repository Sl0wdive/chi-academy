const list = document.getElementById("characterList");
const loadingStatus = document.getElementById("status");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

let currentPage = 1;
const API_URL = "https://rickandmortyapi.com/api/character";
let isLoading = false;
let hasMore = true

async function fetchCharacters(page) {
  if (isLoading || !hasMore) return;
  
  isLoading = true;
  loadingStatus.textContent = "Loading…";

  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();

    renderCharacters(data.results, true);

    currentPage = page;
    hasMore = !!data.info.next;
  } catch (err) {
    console.error(err);
  } finally {
    loadingStatus.textContent = "";
    isLoading = false;
  }
}

function renderCharacters(characters, append = false) {
  const html = characters
    .map(
      (character) => `
      <li class="card" data-action="open-modal" data-id="${character.id}">
        <img src="${character.image}" alt="${character.name}">
        <div class="name">${character.name}</div>
        <div class="status ${character.status.toLowerCase()}">
          ${character.status}
        </div>
      </li>
    `
    )
    .join("");

  if (append) {
    list.innerHTML += html;
  } else {
    list.innerHTML = html;
  }
}

async function openModal(id) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = "Loading...";

  const response = await fetch(`${API_URL}/${id}`);
  const { image, name, status } = await response.json();

  modalBody.innerHTML = `
    <img src="${image}" alt="${name}">
    <h2>${name}</h2>
    <p class="status ${status.toLowerCase()}">${status}</p>
  `;
}

function closeModal() {
  modal.classList.add("hidden");
}

document.body.addEventListener("click", (e) => {
  const card = e.target.closest('[data-action="open-modal"]');

  if (card) {
    openModal(card.dataset.id);
    return;
  }

  if (e.target.dataset.action === "close-modal" || e.target === modal) {
    closeModal();
  }
});

window.addEventListener("scroll", () => {
  if (!isLoading && hasMore && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchCharacters(currentPage + 1);
  }
});


fetchCharacters(1);