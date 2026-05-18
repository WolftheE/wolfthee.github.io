function showpopup(newText) {
  document.getElementById('popuptext').innerText = newText;
  document.getElementById('popup').classList.add('popupshown');
}

function hidepopup() {
  document.getElementById('popup').classList.remove('popupshown');
}


function closenotification() {
  document.getElementById('sidepopup').style.transform = 'translateX(500px)';
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
  document.getElementById('artpopup').classList.add('popupshown');
  document.getElementById('popup').classList.remove('popupshown');
}

function closeartwork() {
  document.getElementById('artpopup').classList.remove('popupshown');
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
    //document.getElementById('welcome_message').innerText = "Hi, I'm Celeron"
    //document.getElementById('furry_message').innerText = "As you can see I'm a furry (Synth, Beep Boop)"

    //first get the root scene
    var root = document.querySelector(':root');
    root.style.setProperty('--background-color', 'rgb(255, 255, 255)');
    root.style.setProperty('--widget-background', 'rgba(225, 225, 225, 0.5)');
    root.style.setProperty('--button-background', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--popup-background', 'rgba(227, 220, 195, 0.747)');
    root.style.setProperty('--font-color', 'black');
    root.style.setProperty('--font-background', 'white');

    root.style.setProperty('--is-dark', '0');
    root.style.setProperty('--tilebar-bright', '1');


    root.style.setProperty('--widget-border', 'rgba(0,0,0,0.1)');

    root.style.setProperty('--main-color', '#c19512');

    root.style.setProperty('--background-img', "url('/images/wallpaperlightmode.jpeg')");


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
}
)
    
}

// Easter Egg game - Pissman Jump
function bug() {
  document.getElementById('modal').showModal();
  document.getElementById('modal').classList.add('animated')
  document.getElementById('modaltext').innerText = 'Click click click, I like to click buttons that idk what it does. Maybe I should scroll up.';
  document.getElementById('blob').classList.add('blob_bug')
  document.getElementById('easter-eggs').classList.add('show-bug-widget')
  document.getElementById('main-info-page').remove();
}

function showgamepanel() {
  document.getElementById('blob').classList.add('blob_bug')
  document.getElementById('easter-eggs').classList.add('show-bug-widget')
  document.getElementById('main-info-page').remove();
}

function showgame() {
    window.open('godot_game_build/');
}



// Make Wigets move into view
const elements = document.querySelectorAll('.grids > widget');

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

  if (transformpos < -200) transformpos = -200;

  if (scrollPos != 0) scroll.style.display = `none`;

  topwidget.style.transform = `translateY(${transformpos}px)`;
  
});

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
