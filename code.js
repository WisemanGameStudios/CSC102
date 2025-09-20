// Starting bankroll
var bankroll = 100;

// Declare page elements
var elBank = document.getElementById("bankrollBar");
var elMsg  = document.getElementById("messages");
var elPC   = document.getElementById("playerCard");
var elDC   = document.getElementById("dealerCard");
var elRes  = document.getElementById("handResult");
var form   = document.getElementById("gameForm");

// Show initial bankroll
renderBankroll();

// Handle form submit (play one hand)
form.onsubmit = function (e) {
  e.preventDefault();
  var bet = parseInt(document.getElementById("bet").value, 10);

  // Validate bet
  if (isNaN(bet)) { elMsg.innerHTML = "Enter a whole number bet."; return; }
  if (bet < 1)    { elMsg.innerHTML = "Minimum bet is 1 credit."; return; }
  if (bet > bankroll) { elMsg.innerHTML = "Not enough credits for that bet."; return; }

  elMsg.innerHTML = "Dealing…";
  playHighCard(bet);
};

// Main game logic
function playHighCard(bet) {
  // Draw random cards for player and dealer
  var pRank = rint(1, 13), dRank = rint(1, 13);
  var pSuit = rint(1, 4), dSuit = rint(1, 4);

  // Show cards
  elPC.innerHTML = formatCard(pRank, pSuit);
  elDC.innerHTML = formatCard(dRank, dSuit);

  // Convert rank (Ace = 14)
  var pVal = (pRank === 1) ? 14 : pRank;
  var dVal = (dRank === 1) ? 14 : dRank;

  // Compare and set result
  var delta = 0, text = "", cls = "";
  if (pVal > dVal) { delta = +bet; text = "You win! +" + bet + " credits."; cls = "win"; }
  else if (pVal < dVal) { delta = -bet; text = "Dealer wins. -" + bet + " credits."; cls = "lose"; }
  else { text = "Push. No credits lost."; cls = "push"; }

  // Update bankroll and show result
  bankroll += delta;
  renderBankroll();
  elRes.innerHTML = '<span class="' + cls + '">' + text + '</span>';

  // Feedback message
  if (bankroll <= 0)      elMsg.innerHTML = "You're out of credits. Thanks for playing!";
  else if (delta > 0)     elMsg.innerHTML = "Nice pull. Play again?";
  else if (delta < 0)     elMsg.innerHTML = "Ouch. Try another hand?";
  else                    elMsg.innerHTML = "Even match. Go again.";
}

// Format card from rank + suit
function formatCard(rank, suit) {
  var faces = {1:"A", 11:"J", 12:"Q", 13:"K"};
  var r = faces[rank] ? faces[rank] : String(rank);
  var s = (suit===1)?" Of Hearts":(suit===2)?" Of Diamonds":(suit===3)?"Of Clubs": "Of Spades";
  return r + s;
}

// Get random integer in range
function rint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update bankroll display
function renderBankroll() {
  elBank.innerHTML = "<strong>Bankroll:</strong> " + bankroll + " credits";
}