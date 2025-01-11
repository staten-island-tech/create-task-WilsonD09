import "../CSS/style.css";
import { deck } from "./deck";

console.log(deck);

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

let player1Money = 1000;

function updateBalanceDisplay() {
  const balanceElement = document.querySelector("#balance-display");
  balanceElement.textContent = `Player 1 Balance: $${player1Money}`;
}
updateBalanceDisplay();
function placeBet(betAmount) {
  if (betAmount > player1Money) {
    alert("Player 1 does not have enough money to bet that amount.");
    return false;
  }
  player1Money -= betAmount;
  updateBalanceDisplay();
  console.log(`Player 1 bets $${betAmount}. Remaining money: $${player1Money}`);
  return betAmount;
}

function resolveBet(betAmount, winner) {
  if (winner === "Player 1") {
    player1Money = player1Money + betAmount * 2;
    console.log(`Player 1 wins the bet! New balance: $${player1Money}`);
  } else if (winner === "The House") {
    console.log("The House wins the bet.");
  } else if (winner === "It's a tie!") {
    player1Money = player1Money + parseInt(betAmount);
    console.log(`It's a tie! Bet refunded. New balance: $${player1Money}`);
  }
  console.log(betAmount);
  updateBalanceDisplay();
}

function playGame() {
  const newDeck = [...deck];
  let shuffleddeck = shuffleDeck(newDeck);

  const dealtcards = dealCards(shuffleddeck);
  console.log(dealtcards);

  renderCards(dealtcards);

  const player1HandValue = evaluateHand([
    dealtcards[0],
    dealtcards[1],
    dealtcards[4],
  ]);
  const houseHandValue = evaluateHand([
    dealtcards[2],
    dealtcards[3],
    dealtcards[4],
  ]);

  const betInput = document.querySelector("#bet-input").value;

  console.log("Player 1's Hand Value:", player1HandValue);
  console.log("The House's Hand Value:", houseHandValue);
  console.log(dealtcards[4].number);

  let result;
  if (player1HandValue > houseHandValue) {
    result = "Player 1";
  } else if (houseHandValue > player1HandValue) {
    result = "The House";
  } else if (houseHandValue === player1HandValue) {
    result = "It's a tie!";
  }
  const betAmount = placeBet(betInput);
  if (betAmount) resolveBet(betInput, result);

  console.log(result);
  console.log(player1Money);
}

document.querySelector("#play-button").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#left-container").innerHTML =
    "<h2>Player 1's Cards:</h2>";
  document.querySelector("#right-container").innerHTML =
    "<h2>The House's Cards:</h2>";
  document.querySelector("#center-container").innerHTML =
    "</div><h2>Facedown Card:</h2>";
  playGame();
});
