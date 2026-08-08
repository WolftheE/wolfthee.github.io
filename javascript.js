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

// makes these button toggle the popup
const popupBtn = document.querySelectorAll('#show-popup-btn')

popupBtn.forEach((button) => {
  let textdata = button.getAttribute('data-popuptext')
  button.addEventListener('click', () => showpopup(textdata))
})

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

// makes these button toggle the popup
const artworkpopupBtn = document.querySelectorAll('#show-artwork-btn')

artworkpopupBtn.forEach((button) => {
  button.addEventListener('click', () => artworkpopup())
})

// gets ALL the close buttons and makes them a trigger to close any popups
// makes these button toggle the popup
const closepopupBtn = document.querySelectorAll('.close')

closepopupBtn.forEach((button) => {
  button.addEventListener('click', () => {hidepopup(); closeartwork();})
})


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

// Scrolling effect
window.addEventListener('scroll', function() {
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


// Card effect
function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

function Card3D(card, ev) {
  let img = card.querySelector('.card-element');
  let imgRect = card.getBoundingClientRect();
  let width = imgRect.width;
  let height = imgRect.height;
  let mouseX = ev.offsetX;
  let mouseY = ev.offsetY;
  let rotateY = map(mouseX, 0, 180, -25, 25);
  let rotateX = map(mouseY, 0, 250, 25, -25);
  let brightness = map(mouseY, 0, 250, 1.5, 0.5);
  
  img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  img.style.filter = `brightness(${brightness})`;
}

var cards = document.querySelectorAll('.card3d');

cards.forEach((card) => {
  card.addEventListener('mousemove', (ev) => {
    Card3D(card, ev);
  });
  
  card.addEventListener('mouseleave', (ev) => {
    let img = card.querySelector('.card-element');
    
    img.style.transform = 'rotateX(0deg) rotateY(0deg)';
    img.style.filter = 'brightness(1)';
  });
});