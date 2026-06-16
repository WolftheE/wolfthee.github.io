const popupParent = document.getElementById('popupParent');
const popupContent = document.getElementById('popupContent');

const artpopupParent = document.getElementById('artpopupParent');
const artpopupContent = document.getElementById('artpopupContent');

const popupwarningParent = document.getElementById('popupwarningParent');
const popupwarningContent = document.getElementById('popupwarningContent');

function showpopup(newText) {
  document.getElementById('popuptext').innerText = newText;

  popupParent.classList.add('popupparentshown');
  popupContent.classList.add('popupshown');
}

function hidepopup() {
  popupParent.classList.remove('popupparentshown');
  popupContent.classList.remove('popupshown');
}


function closenotification() {
  document.getElementById('notification').style.transform = 'translateX(500px)';
}

// context menu
const menu = document.getElementById('context_menu');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Stop default menu
  //menu.style.visibility = 'visible';
  menu.classList.add('visible-context-menu');
  menu.style.left = `${e.pageX}px`;
  menu.style.top = `${e.pageY}px`;
});

document.addEventListener('click', () => {
  //menu.style.visibility = 'hidden'; // Hide on left click
  menu.classList.remove('visible-context-menu');
});

//art work popup
function artworkpopup() {
  artpopupParent.classList.add('popupparentshown');
  artpopupContent.classList.add('popupshown');

  popupParent.classList.remove('popupparentshown');
  popupContent.classList.remove('popupshown');
}

function closeartwork() {
  artpopupParent.classList.remove('popupparentshown');
  artpopupContent.classList.remove('popupshown');
}

// Image slideshow for my artwork showcase
const imagesList = ['images/artwork/fiat_500_on_track.jpg', 
    'images/artwork/kermit_krack_season_9_compressed.jpg', 
    'images/artwork/protogen_looking_out_the_window_compressed.jpg', 
    'images/artwork/fiat_upclose.jpg',
    'images/artwork/Minecraft_but_in_eevee_next.jpg',
    'images/artwork/ram_sticks.jpg',
    'images/artwork/portal_radio_render.jpg']

const imagesInfo = ["Probaly one of the best ones I've made. It's a close up image of a realistic road with a fiat driving in the background.", 
    'A Minecraft render that I made for my friend! (Yes I have friends)', 
    'An unfinshed attempt of me making a realistic looking protogen looking out a window.', 
    'A close up render of a Fiat 500.',
    "One of my early renders I've made when I was new to blender. It was me simply using Mineways to import my world into blender.", 
    "give me it plz, im broke :(",
    "Another early render I made, Portal themed!"]

let slideindex = 0

function imageslide(direction) {
    slideindex += direction
    console.log(imagesList.length )

    if (slideindex > (imagesList.length - 1)) {
        slideindex = 0;
    } else if (slideindex < 0) {
        slideindex = (imagesList.length -1);
    }

    console.log(imagesList[slideindex])
    document.getElementById('artworkimg').style.backgroundImage = "url(" + imagesList[slideindex] + ")";
    document.getElementById('artworktext').innerText = imagesInfo[slideindex];
}

function fullscreenart() {
    window.open(imagesList[slideindex])
}

// light theme lol
function changetolighttheme() {
    document.getElementById('pfp').src = '/images/synth.png';
    import('./thememode.js')
    .then((theme) => {
      theme.light();
    });
}

// Easter Egg 
let timesOpened = 0;

const messages = ["Warning: This image may contain sensitive content, Continue?",
  "Are you sure?",
  "Are you really really sure?",
  "Are you really really really really really sure?",
  "Are you like 100% sure you want to see it?",
  "Really?",
  "Really really?",
  "So you want to see the image?",
  "So you won't get offended?",
  "Really?",
  "Have you considered the risks?",
  "Are you sure",
  "wow ok ummm, so you pinky promase you wont get mad?",
  "Are you sure?",
  "Last time I had people complain, so are you really sure?",
  "Truely very sure?",
  "So you are not going to get mad?",
  "I mean ok fine, but last question, Do you want to continue?",
  "Ok, I lied this is not the last question, but are you sure?",
  "Not going to get mad?",
  "So do you not want to not see the image?",
  "Wow you really want to see this image, have you considered that this might not even be an image?",
  "Wow ok ig you really want to see the image, welp last warning."]

function showSpoilImages() {
  if (timesOpened > (messages.length - 1)) {
    console.log("Ok")
  }

  document.getElementById('popuptextwarning').innerText = messages[timesOpened];
  document.getElementById('popupwarning').classList.add('popupshown');

  timesOpened += 1;
}

function resettimeOpened() {
  document.getElementById('popupwarning').classList.remove('popupshown');
  timesOpened = 0;
}





function showgame() {
    window.open('godot_game_build/');
}



// Make Wigets move into view
const elements = document.querySelectorAll('.grids-project > widget');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null, 
  threshold: 0.5
});

elements.forEach(el => {
  observer.observe(el);
});



window.addEventListener('scroll', function() {
  //const img = document.getElementById('background');
  //let scrollPos = window.scrollY;
  
  // Calculate new scale: start at 1.5 and decrease as scroll increases
  // Adjust the divisor (1000) to control the speed of the zoom
  //let newScale = 1.05 - (scrollPos / 3500);
  //let opacity = 1 - (scrollPos / 500)
  //let blur = ((scrollPos / 200) * 10)
  
  // Ensure the image doesn't zoom out past its original size (scale 1)
  //if (newScale < 0.95) newScale = 0.95;
  //if (opacity < 0) opacity = 0;
  //if (blur > 32) blur = 0;
  
  //img.style.transform = `scale(${newScale})`;
  //img.style.opacity =  `${opacity}`
  //img.style.filter = `blur(${blur}px)`;

  const topwidget = document.getElementById('topwidget');
  const scroll = document.getElementById('scroll');
  let scrollPos = window.scrollY;

  let transformpos = -(scrollPos / 2 );
  let opacityamount = 1 - (scrollPos / 300);

  if (transformpos < -200) transformpos = -200;

  if (opacityamount < 0) opacityamount = 0;

  topwidget.style.transform = `translateY(${transformpos}px)`
  scroll.style.opacity = opacityamount;
  
});



import('./thememode.js')
  .then((theme) => {
    theme.loadbackground();
    theme.dark();
});
