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
  const player1 = [deck.pop(), deck.pop()];
  const player2 = [deck.pop(), deck.pop()];
  const facedownCard = deck.pop();
  console.log(player1, player2, facedownCard);
  return { player1, player2, facedownCard };
}

function renderCards(player1, player2) {
  const container = document.querySelector(".container");
  player1.forEach((card) => {
    container.insertAdjacentElement(
      "beforeend",
      `<h2>Player 1's Cards:</h2>
      <p>${card.number} of ${card.suit}).join(", ")}</p>
      <div class="card"><h3>${card.number} of ${card.suit}</h3>
            <img class="img" src=${card.imageURL} alt="${card.altText}"></div>`
    );
  });
  player2.forEach((card) => {
    container.insertAdjacentElement(
      "beforeend",
      `<h2>Player 2's Cards:</h2>
      <p>${card.number} of ${card.suit}).join(", ")}</p>
      <div class="card"><h3>${card.number} of ${card.suit}</h3>
            <img class="img" src=${card.imageURL} alt="${card.altText}"></div>`
    );
  });

  /* `<h2>Player 2's Cards:</h2>
  <p>${player2.map((card) => `${card.number} of ${card.suit}`).join(", ")}</p>`);
   */
}

function playGame() {
  let shuffleddeck = shuffleDeck(deck);

  const { player1, player2, facedownCard } = dealCards(shuffleddeck);

  renderCards(player1, player2, facedownCard);

  const player1HandValue = evaluateHand([...player1, facedownCard]);
  const player2HandValue = evaluateHand([...player2, facedownCard]);

  console.log("Player 1's Hand Value:", player1HandValue);
  console.log("Player 2's Hand Value:", player2HandValue);
  console.log(facedownCard.number);

  if (player1HandValue > player2HandValue) {
    console.log("Player 1 wins!");
  } else if (player2HandValue > player1HandValue) {
    console.log("Player 2 wins!");
  } else {
    console.log("It's a tie!");
  }
}

if (typeof document !== "undefined") {
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  document.body.appendChild(gameContainer);
}

playGame();
