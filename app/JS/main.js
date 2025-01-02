import "../CSS/style.css";
import { deck } from "./deck";

console.log(deck);
function createCards(list) {
  list.forEach((el) => {
    document.querySelector(".container").insertAdjacentHTML(
      "beforeend",
      `<div class="card" id=""><h3>${el.number} of ${el.suit}</h3>
            <img class="img" src=${el.imageURL} alt="${el.altText}">`
    );
  });
}
createCards(deck);

let allCards = [];
deck.forEach((el) => allCards.push(`${el.number} of ${el.suit}`));
console.log(allCards);
