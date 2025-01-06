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

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function evaluateHand(cards) {
  const rankValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 14,
  };

  const rankCounts = {};
  for (const card of cards) {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
  }

  let handValue = 0;
  let hasPair = false;
  let hasThreeOfAKind = false;

  for (const [rank, count] of Object.entries(rankCounts)) {
    if (count === 2) hasPair = true;
    if (count === 3) hasThreeOfAKind = true;
    handValue += rankValues[rank] * count;
  }

  if (hasThreeOfAKind) handValue += 50;
  if (hasPair) handValue += 25;

  return handValue;
}

function dealCards(deck) {
  const player1 = [deck.pop(), deck.pop()];
  const player2 = [deck.pop(), deck.pop()];
  const facedownCard = deck.pop();
  return { player1, player2, facedownCard };
}

function renderCards(player1, player2, facedownCard) {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <h2>Player 1's Cards:</h2>
    <p>${player1.map((card) => `${card.rank} of ${card.suit}`).join(", ")}</p>
    <h2>Player 2's Cards:</h2>
    <p>${player2.map((card) => `${card.rank} of ${card.suit}`).join(", ")}</p>
    <h2>Facedown Card:</h2>
    <p>${facedownCard.rank} of ${facedownCard.suit}</p>
  `;
}

function playGame() {
  let deck = createDeck();
  deck = shuffleDeck(deck);

  const { player1, player2, facedownCard } = dealCards(deck);

  renderCards(player1, player2, facedownCard);

  const player1HandValue = evaluateHand([...player1, facedownCard]);
  const player2HandValue = evaluateHand([...player2, facedownCard]);

  console.log("Player 1's Hand Value:", player1HandValue);
  console.log("Player 2's Hand Value:", player2HandValue);

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
