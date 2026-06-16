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

const popUp = document.getElementById('popup');

const settings = document.getElementById('settings');
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

// Example usage:
console.log(getDaysSince("2026-06-01")); 

// ==============================


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

//check if done daily on tab load
if (getDaysSince("2026-06-01") == localStorage.getItem('didDaily')) doneDaily = true;

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
  if (inputAngle.value < angle) { // When guess number is lower then angle
    hintText.innerText = "Higher ↑";
    hintsGiven += `Higher ↑
`;
    hintText.classList.remove('hinttextscale');
    void hintText.offsetWidth;
    hintText.classList.add('hinttextscale');
    attemps += 1
    updatecounterText()
  }

  else if (inputAngle.value > angle) { // When guess number is higher then angle
    hintText.innerText = "Lower ↓";
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

  return
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
    await navigator.clipboard.writeText(`
Daily Angled. No. ${getDaysSince("2026-06-01")}
---------------------------
${(didPlayerLose == true) ? `x/6 Guesses` : `${attemps}/6 Guesses`}
${hintsGiven}
        
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

  if (visible == true) popUp.classList.add('popupvisible');

  else if (visible == false) popUp.classList.remove('popupvisible');
}


// settings menu
function popupSettings(visible) {
  if (visible == true) settings.classList.add('popupvisible');

  else if (visible == false) settings.classList.remove('popupvisible');
}

function lightthemePressed() {
  if (lightthemeToggle.checked == true) {
      localStorage.setItem("lighttheme", true)
      var root = document.querySelector(':root');
      root.style.setProperty('--background-color', 'rgb(255, 255, 255)');
      root.style.setProperty('--widget-background', 'rgba(225, 225, 225, 0.75)');
      root.style.setProperty('--button-background', 'rgba(255, 255, 255, 0.5)');
      root.style.setProperty('--button-background', 'rgba(255, 255, 255, 0.5)');
      root.style.setProperty('--popup-background', 'rgba(227, 220, 195, 0.747)');
      root.style.setProperty('--font-color', 'black');
      root.style.setProperty('--font-background', 'white');

      root.style.setProperty('--is-dark', '0');
      root.style.setProperty('--tilebar-bright', '1');


      root.style.setProperty('--widget-border', 'rgba(0,0,0,0.1)');

      root.style.setProperty('--main-color', '#c19512');

      particlesJS(
{
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#000000"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.4,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 116,
      "color": "#000000",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "top-right",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
  })}
  else {
    localStorage.setItem("lighttheme", false)
    var root = document.querySelector(':root');
    root.style.setProperty('--background-color', 'rgb(12, 12, 23)');
    root.style.setProperty('--widget-background', 'rgba(10, 20, 25, 0.5)');
    root.style.setProperty('--button-background', 'rgba(177, 177, 177, 0.15)');
    root.style.setProperty('--popup-background', 'rgba(8, 18, 24, 0.747)');
    root.style.setProperty('--font-color', 'rgb(255,255,255)');
    root.style.setProperty('--font-background', 'black');

    root.style.setProperty('--is-dark', '1');
    root.style.setProperty('--tilebar-bright', '0');


    root.style.setProperty('--widget-border', 'rgb(255, 255, 255, 0.1)');

    root.style.setProperty('--main-color', '#1295c1');

    particlesJS(
{
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 116,
      "color": "#ffffff",
      "opacity": 0.06,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "top-right",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
)

  }
}


// when page loads
if (localStorage.getItem("lighttheme") == "true") {
  lightthemeToggle.checked = true;
  lightthemePressed();
}






// Particles JS thing

particlesJS(
{
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 116,
      "color": "#ffffff",
      "opacity": 0.06,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "top-right",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
)
