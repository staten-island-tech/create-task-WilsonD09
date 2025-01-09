import "../CSS/style.css";
import { deck } from "./deck";

console.log(deck);

function createCards(list) {
  const cardList = [];
  list.forEach((el, index) => {
    cardList.push(`<div class="card" id="card-${index}"><h3>${el.number} of ${el.suit}</h3>
            <img class="img" src=${el.imageURL} alt="${el.altText}"></div>`);
  });
  console.log(cardList);
}
createCards(deck);

let allCards = [];
deck.forEach((el) => allCards.push(`${el.number} of ${el.suit}`));
console.log(allCards);

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function evaluateHand(cards) {
  const rankCounts = {};
  cards.forEach((card) => {
    if (rankCounts[card.rank]) {
      rankCounts[card.rank]++;
    } else {
      rankCounts[card.rank] = 1;
    }
  });

  let handValue = 0;
  let hasPair = false;
  let hasThreeOfAKind = false;

  cards.forEach((el) => {
    const count = rankCounts[el.rank];
    if (count === 2) hasPair = true;
    if (count === 3) hasThreeOfAKind = true;
    handValue += el.rank * count;
  });

  if (hasThreeOfAKind === true) {
    handValue += 50;
  }
  if (hasPair === true) {
    handValue += 25;
  }

  return handValue;
}

function dealCards(deck) {
  const dealtcards = [
    deck.pop(),
    deck.pop(),
    deck.pop(),
    deck.pop(),
    deck.pop(),
  ];

  return dealtcards;
}

function renderCards(dealtcards) {
  dealtcards.slice(0, 2).forEach((card) => {
    document.querySelector("#left-container").insertAdjacentHTML(
      "beforeend",
      `<p>${card.number} of ${card.suit}</p>
      <div class="card"><h3>${card.number} of ${card.suit}</h3>
            <img class="img" src=${card.imageURL} alt="${card.altText}"></div>`
    );
  });
  dealtcards.slice(2, 4).forEach((card) => {
    document.querySelector("#right-container").insertAdjacentHTML(
      "beforeend",
      `<p>${card.number} of ${card.suit}</p>
      <div class="card"><h3>${card.number} of ${card.suit}</h3>
            <img class="img" src=${card.imageURL} alt="${card.altText}"></div>`
    );
  });
  dealtcards.slice(4, 5).forEach((card) => {
    document.querySelector("#center-container").insertAdjacentHTML(
      "beforeend",
      `<p>${card.number} of ${card.suit}</p>
      <div class="card"><h3>${card.number} of ${card.suit}</h3>
            <img class="img" src=${card.imageURL} alt="${card.altText}"></div>`
    );
  });
}

function playGame() {
  let shuffleddeck = shuffleDeck(deck);

  const dealtcards = dealCards(shuffleddeck);
  console.log(dealtcards);

  renderCards(dealtcards);

  const player1HandValue = evaluateHand([
    dealtcards[0],
    dealtcards[1],
    dealtcards[4],
  ]);
  const player2HandValue = evaluateHand([
    dealtcards[2],
    dealtcards[3],
    dealtcards[4],
  ]);

  console.log("Player 1's Hand Value:", player1HandValue);
  console.log("Player 2's Hand Value:", player2HandValue);
  console.log(dealtcards[4].number);

  let result;
  if (player1HandValue > player2HandValue) {
    result = "Player 1 wins!";
  } else if (player2HandValue > player1HandValue) {
    result = "Player 2 wins!";
  } else {
    result = "It's a tie!";
  }

  console.log(result);
}

playGame();
