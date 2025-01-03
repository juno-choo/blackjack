// Array containing card values
const cards = ['A', 'J', 'Q', 'K', 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Function to draw a random card from the array
function drawRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

// Function to calculate the total value of the hand
function calculateHandValue(hand) {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
        if (card === 'J' || card === 'Q' || card === 'K') {
            total += 10; // Face cards are worth 10
        } else if (card === 'A') {
            aces += 1; // Count the Ace separately for now
        } else {
            total += card; // Add numeric card value
        }
    });

    // Handle Ace value (1 or 11)
    for (let i = 0; i < aces; i++) {
        if (total + 11 <= 21) {
            total += 11;
        } else {
            total += 1;
        }
    }

    return total;
}

// Game state
let playerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// DOM elements
const playerHandElement = document.getElementById('player-hand');
const playerStatusElement = document.getElementById('player-status');
const dealerHandElement = document.getElementById('dealer-hand');
const dealerStatusElement = document.getElementById('dealer-status');
const hitButton = document.getElementById('hit');
const standButton = document.getElementById('stand');
const startButton = document.getElementById('start');

// Start game
startButton.addEventListener('click', () => {
    playerHand = [drawRandomCard(), drawRandomCard()];
    playerTotal = calculateHandValue(playerHand);
    playerHandElement.textContent = playerHand.join(', ');
    playerStatusElement.textContent = `Total: ${playerTotal}`;

    // Generate dealer's total
    dealerTotal = Math.floor(Math.random() * 7) + 17; // Random number between 17 and 23
    dealerHandElement.textContent = '???'; // Hide dealer's hand until stand
    dealerStatusElement.textContent = 'Hidden';

    // Check for Blackjack
    if (playerTotal === 21) {
        playerStatusElement.textContent = 'Blackjack! You win!';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else {
        hitButton.disabled = false;
        standButton.disabled = false;
    }
});

// Hit action
hitButton.addEventListener('click', () => {
    const newCard = drawRandomCard();
    playerHand.push(newCard);
    playerTotal = calculateHandValue(playerHand);
    playerHandElement.textContent = playerHand.join(', ');
    playerStatusElement.textContent = `Total: ${playerTotal}`;

    // Check for Bust or Blackjack
    if (playerTotal > 21) {
        playerStatusElement.textContent = 'Bust!';
        hitButton.disabled = true;
        standButton.disabled = true;
        dealerHandElement.textContent = dealerTotal;
        dealerStatusElement.textContent = `Total: ${dealerTotal}`;
    } else if (playerTotal === 21) {
        playerStatusElement.textContent = 'Blackjack! You win!';
        hitButton.disabled = true;
        standButton.disabled = true;
        dealerHandElement.textContent = dealerTotal;
        dealerStatusElement.textContent = `Total: ${dealerTotal}`;
    }
});

// Stand action
standButton.addEventListener('click', () => {
    dealerHandElement.textContent = dealerTotal;
    dealerStatusElement.textContent = `Total: ${dealerTotal}`;

    // Determine the result
    if (playerTotal > 21 && dealerTotal > 21) {
        playerStatusElement.textContent = 'Nobody wins!';
    } else if (playerTotal > dealerTotal || dealerTotal > 21) {
        playerStatusElement.textContent = 'You win!';
    } else if (playerTotal === dealerTotal) {
        playerStatusElement.textContent = 'Tie!';
    } else {
        playerStatusElement.textContent = 'You lose!';
    }

    hitButton.disabled = true;
    standButton.disabled = true;
});