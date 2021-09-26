import { getallVases } from "./vases.js";

const searchButton = document.getElementById("search_btn");
const clearSearchButton = document.getElementById("clear_search_btn");
const searchInput = document.getElementById("search_input");
const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_btn");
const cardsContainer = document.getElementById("cards_container");
const cardTemplate = ({ id, name, description, price, volume }) => `
<li id="${id}" class="card">
  <img
    src="https://cb2.scene7.com/is/image/CB2/TrioVasesWhiteSHF16/$web_pdp_main_carousel_xs$/190905021603/3-piece-trio-vase-set.jpg"
    class="card__image" alt="card">
  <div>
    <h5>${name}</h5>
    <p>${description}</p>
    <p>Price: ${price} $.</p>
    <p>Volume: ${volume} liters.</p>
  </div>
</li>`;

let vases = [];

const addCardToPage = ({ _id: id, name, description, price, volume }) => {
  cardsContainer.insertAdjacentHTML(
    "afterbegin",
    cardTemplate({ id, name, description, price, volume })
  );
};

const renderCardsList = (cards) => {
  cardsContainer.innerHTML = "";
  for (const card of cards) {
    addCardToPage(card);
  }
}; 

const refetchallVases = () => {
  const allVases = getallVases();
  vases = allVases.sort((card1,card2) =>card2.name.localeCompare(card1.name));
  renderCardsList(vases);
};

searchButton.addEventListener("click", () => {
  const foundVases = vases.filter(
    (vase) => vase.name.search(searchInput.value) !== -1);
  renderCardsList(foundVases);
});

clearSearchButton.addEventListener("click", () => {
  renderCardsList(vases);
  searchInput.value = "";
});

sortCheckbox.addEventListener("change", function (e) {
    if (this.checked) {
        const sortedVases = vases.sort(
            (card1, card2) => parseFloat(card1.volume) - parseFloat(card2.volume));
        renderCardsList(sortedVases);
    }
    else {
        refetchallVases();
    }
});

countButton.addEventListener("click", () => {
    let sum = vases.map(o => o.price).reduce((a, c) => { return a + c });
    document.getElementById("total-price").innerText = sum;
    console.log(sum);
})

refetchallVases(); 