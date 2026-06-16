const anglePath = document.getElementById('anglePath');
const arcPath = document.getElementById('arcPath');
const angleParent = document.getElementById('angleSvg');

const hintText = document.getElementById('hintText');
const guessamountText = document.getElementById('guessamountText');
const toolBar = document.getElementById('toolbar');
const inputAngle = document.getElementById('inputGuess');

const compleatePanel = document.getElementById('resaultScreen');
const doneDailyLevelScreen = document.getElementById('doneDailyLevelScreen');

const titleresaultScreen = document.getElementById('titleresaultScreen');
const textresaultScreen = document.getElementById('textresaultScreen');
const finalresultText = document.getElementById('finalresultText');
const guessesplayedText = document.getElementById('guessesplayedText');

const widgetTitle = document.getElementById('widgetTitle');
const guessButton = document.getElementById('guessButton');

const playUnlimitedButton = document.getElementById('playUnlimitedButton');
const dailyshareresaultsButton = document.getElementById('dailyshareresaultsButton');
const playagainButton = document.getElementById('playagainButton');

const popupParent = document.getElementById('popupParent');
const popupContent = document.getElementById('popupContent');

const settingsParent = document.getElementById('settingsParent');
const settingsContent = document.getElementById('settingsContent');
const lightthemeToggle = document.getElementById('lightthemeToggle');


const statsText = document.getElementById('statsText');


const dailyButton = document.getElementById('dailyButton');
const unlimitedButton = document.getElementById('unlimitedButton');

let angle = 1
let currentAngle = 1
let animationId = null;



// For getting the Daily Angled. =========================

// make a daily random number that is the same for every user, used AI for this part
// Simple, lightweight hashing function to simulate a random seed
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) * 4294967296 + (h1 >>> 0);
};

function getDailyRandomNumber(min, max) {
  // Get current date string in UTC format (YYYY-MM-DD) to ensure consistency across timezones
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Hash the date string to get a massive, unique integer
  const hash = cyrb53(todayStr);
  
  // Scale the hash down to your desired [min, max] range
  return (hash % (max - min + 1)) + min;
}


// Count the days since the day this was created to track the daily number, Used AI

function getDaysSince(pastDateString) {
  const today = new Date();
  const pastDate = new Date(pastDateString);
  
  const diffInMs = today - pastDate;
  
  // Convert milliseconds to days and round down
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

// ==============================

// small little anti-cheat when shareing resaults
// works untill you know how it works

function get_random_spaaces() {
  r = Math.floor(Math.random() * (32 - 1) + 1);
  tmp = ""

  for (let i = 1; i <= r; i++) {
    tmp += " "
  }
  return tmp
}

// setting the angle ==================================

// Add animation function to make it look smooth, used AI
function animateTo(targetAngle) {
    const startAngle = currentAngle;
    const duration = 1000; // 1 second
    const startTime = performance.now();

    // Cancel any previous animation to prevent "fighting"
    if (animationId) cancelAnimationFrame(animationId);

    function frame(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: easeOutQuart
        const easedProgress = 1 - Math.pow(1 - progress, 4);

        // Calculate the new intermediate angle
        currentAngle = startAngle + (targetAngle - startAngle) * easedProgress;
        
        drawAngle(currentAngle);

        if (progress < 1) {
            animationId = requestAnimationFrame(frame);
        }
    }

    animationId = requestAnimationFrame(frame);
}

function drawAngle(degrees) {
    const cx = 150, cy = 150, r = 125, ar = 40;
    const rad = (degrees * Math.PI) / 180;
    
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy - r * Math.sin(rad);
    const ax = cx + ar * Math.cos(rad);
    const ay = cy - ar * Math.sin(rad);

    // Large arc flag: 1 if angle > 180, else 0
    const largeArc = degrees > 180 ? 1 : 0;
    document.getElementById('anglePath').setAttribute('d', `M ${cx+r} ${cy} L ${cx} ${cy} L ${x2} ${y2}`);
    document.getElementById('arcPath').setAttribute('d', `M ${cx+ar} ${cy} A ${ar} ${ar} 0 ${largeArc} 0 ${ax} ${ay} L ${cx} ${cy} Z`);
}

// ===========================

// Global Values
let doneDaily = false;
let dailysavescumattemps = 0
let dayplayedon = 0

//check if done daily on tab load
if (getDaysSince("2026-06-01") == localStorage.getItem('didDaily')) doneDaily = true;

//dayplayedon = Number(localStorage.getItem("dayplayon"))

//if (dayplayedon != getDaysSince("2026-06-01")) localStorage.setItem('dailysavescumattemps', 0)

// Values for per game
let attemps = 0;
let hintsGiven = ``; // store all the hints given
let didPlayerLose = false
let doingDaily = false
let showScreen = false // flag for when the thing that shows up when you win or lose

// change the input number when you press the buttons
function changeinputvalue(value) {
    inputAngle.value = Number(inputAngle.value) + Number(value)
}

// Make it so if you click enter it will submit the guess
inputAngle.addEventListener("keydown", function(event) {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      event.preventDefault();

      if (showScreen == true) newGame();
      else document.getElementById("guessButton").click();
    }
});

// when you submit the guess

function submitGuess() {
  if (doingDaily == true) localStorage.setItem('dailysavescumattemps', Number(localStorage.getItem("dailysavescumattemps"))+1)

  if (inputAngle.value < angle) { // When guess number is lower then angle
    if (angle - inputAngle.value <= 3) hintText.innerText = "Higher ↑ So close";
    else hintText.innerText = "Higher ↑";
    hintsGiven += `Higher ↑
`;
    hintText.classList.remove('hinttextscale');
    void hintText.offsetWidth;
    hintText.classList.add('hinttextscale');
    attemps += 1
    updatecounterText()
  }

  else if (inputAngle.value > angle) { // When guess number is higher then angle
    if (inputAngle.value - angle  <= 3) hintText.innerText = "Lower ↓ So close";
    else hintText.innerText = "Lower ↓";
    hintsGiven += `Lower ↓
`;
    hintText.classList.remove('hinttextscale');
    void hintText.offsetWidth;
    hintText.classList.add('hinttextscale');
    attemps += 1
    updatecounterText()
  }


  if (inputAngle.value == angle) { // When you get the number
    win()
  }

  else if (attemps == 6) {// check if its game over
    lose()
  }
}

function win() {
  hintText.innerText = "You got it!"
  compleatePanel.style.transform = `translateY(0)`;
  toolBar.style.opacity = `0`;
  titleresaultScreen.innerText = `Good Job!`;
  textresaultScreen.innerText = `You have solved this Angled.`;

  showScreen = true


  confetti("tsparticles", {
    count: 175,
    position: {x: 50, y: 50 },
  });
  attemps += 1
  guessamountText.innerText = `${attemps}/6 Guesses`
  hintsGiven += `Got it!`;


  finalresultText.innerText = `${attemps}/6 Guesses`;
  guessesplayedText.innerText = hintsGiven;


  localStorage.setItem('wins', Number(localStorage.getItem("wins"))+1)
  localStorage.setItem('gamesPlayed', Number(localStorage.getItem("gamesPlayed"))+1)

  if (attemps == 1) localStorage.setItem("singleGuesses", Number(localStorage.getItem("singleGuesses"))+1)

  if (doingDaily == true) {
    localStorage.setItem('didDaily', getDaysSince("2026-06-01"))
    localStorage.setItem('Daily', Number(localStorage.getItem("Daily"))+1)
    doneDaily = true;
  }
}

function lose() {
  hintText.innerText = "Better Luck Next time!"
  compleatePanel.style.transform = `translateY(0)`;
  toolBar.style.opacity = `0`;
  titleresaultScreen.innerText = `Better luck next time...`;
  textresaultScreen.innerText = `The answer was ${angle}°`;

  finalresultText.innerText = `x/6 Guesses`;
  guessesplayedText.innerText = hintsGiven;
  didPlayerLose = true
  showScreen = true

  localStorage.setItem('gamesPlayed', Number(localStorage.getItem("gamesPlayed"))+1)

  if (doingDaily == true) {
    localStorage.setItem('didDaily', getDaysSince("2026-06-01"))
    localStorage.setItem('Daily', Number(localStorage.getItem("Daily"))+1)
    doneDaily = true;
  }
}

// Start new Game for Daily mode
function dailyGame() {
  //attemps = Number(localStorage.getItem("dailysavescumattemps"));
  //localStorage.setItem("dayplayon", getDaysSince("2026-06-01"))
  updatecounterText()
  angle = getDailyRandomNumber(1, 359);
  hintText.innerText = "Type your guess!";
  finalresultText.innerText = (attemps == 6) ? `x/6 Guesses` : `${attemps}/6 Guesses`;

  widgetTitle.innerText = `Daily Angle. No ${getDaysSince("2026-06-01")}`

  angleParent.style.transform = `rotate(${Math.floor(Math.random() * (359 - 1) + 1)}deg)`;

  compleatePanel.style.transform = `translateY(100%)`;
  toolBar.style.opacity = `1`;
  inputAngle.value = ""
  animateTo(angle);

  didPlayerLose = false
  doingDaily = true
}


// Start new Game for unlimited mode
function newGame() {
    showScreen = false
    angle = Math.floor(Math.random() * (359 - 1) + 1);
    hintText.innerText = "Type your guess!";
    finalresultText.innerText = (attemps == 6) ? `x/6 Guesses` : `${attemps}/6 Guesses`;
    // reset the values
    attemps = 0
    hintsGiven = ``
    updatecounterText()

    widgetTitle.innerText = `Angled. Unlimited!`

    angleParent.style.transform = `rotate(${Math.floor(Math.random() * (359 - 1) + 1)}deg)`;

    compleatePanel.style.transform = `translateY(100%)`;
    toolBar.style.opacity = `1`;
    inputAngle.value = ""
    animateTo(angle);

    didPlayerLose = false
}




function updatecounterText() { // update the counter
    guessamountText.innerText = `${attemps}/6 Guesses`
}



// copy to clipboard to share
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(`Daily Angled. No. ${getDaysSince("2026-06-01")}
---------------------------  
${(didPlayerLose == true) ? `x/6 Guesses` : `${attemps}/6 Guesses`}
${hintsGiven}
${get_random_spaaces()}
Play at: https://wolfthee.github.io/angled`);
    console.log('Text successfully copied!');
    alert("Copied to clipboard!")
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}
// Change the type of Gamemode depending on the tab
let tab = "daily"

function dailyTab() {
  tab = "daily"

  playagainButton.style.display = "none";
  dailyshareresaultsButton.style.display = "inline-block";
  playUnlimitedButton.style.display = "inline-block";

  widgetTitle.innerText = `Daily Angle. No ${getDaysSince("2026-06-01")}`

  // style the button
  dailyButton.style.borderBottom = `1px solid var(--main-color)`;
  unlimitedButton.style.borderBottom = `1px solid color-mix( var(--font-color), transparent)`;

  if (doneDaily == true) {
    doneDailyLevelScreen.style.transform = `translateY(0)`;
    toolBar.style.opacity = `0`;
    angle = getDailyRandomNumber(1, 359);
    animateTo(angle);
  }
  else {dailyGame()}
}

function unlimitedTab() {
  tab = "unlimited"

  newGame()

  unlimitedButton.style.borderBottom = `1px solid var(--main-color)`;
  dailyButton.style.borderBottom = `1px solid color-mix( var(--font-color), transparent)`;

  doneDailyLevelScreen.style.transform = `translateY(100%)`;
  toolBar.style.opacity = `1`;

  dailyshareresaultsButton.style.display = "none";
  playagainButton.style.display = "inline-block";
  playUnlimitedButton.style.display = "none";
}


dailyTab() // set the page when you load the website


// show the popup
function popup(visible) {

  statsText.innerText = `Total Played Games: ${localStorage.getItem("gamesPlayed")}
  Total Wins: ${localStorage.getItem("wins")}
  Perfect Guesses: ${localStorage.getItem("singleGuesses")}
  Daily played: ${localStorage.getItem("Daily")}`;

  if (visible == true) {
    popupParent.classList.add('popupparentshown');
    popupContent.classList.add('popupshown');
  }

  else if (visible == false) {
    popupParent.classList.remove('popupparentshown');
    popupContent.classList.remove('popupshown');
  }
}


// settings menu
function popupSettings(visible) {
  if (visible == true) {
    settingsParent.classList.add('popupparentshown');
    settingsContent.classList.add('popupshown');
  }

  else if (visible == false) {
    settingsParent.classList.remove('popupparentshown');
    settingsContent.classList.remove('popupshown');
  }
}

function lightthemePressed() {
  if (lightthemeToggle.checked == true) {
    localStorage.setItem("lighttheme", true)
    import('/thememode.js')
      .then((theme) => {
        theme.light();
    });
  }
  else {
    localStorage.setItem("lighttheme", false)
      import('/thememode.js')
      .then((theme) => {
        theme.dark();
    });
  }
}


// when page loads

import('/thememode.js')
  .then((theme) => {
    theme.loadbackground();
});


if (localStorage.getItem("lighttheme") == "true") {
  lightthemeToggle.checked = true;
  lightthemePressed();
}

else { 
  import('/thememode.js')
      .then((theme) => {
        theme.dark();
    });
  
}


