function showmodal(newText) {
    document.getElementById('modaltext').innerText = newText;
    document.getElementById('modal').showModal();
    document.getElementById('modal').classList.add('animated')
}

function closemodal() {
  document.getElementById('modal').close()
  document.getElementById('modal').classList.remove('animated')
}

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
    document.getElementById('artworkimg_popup').src = imagesList[slideindex];
}
function imagepreview() {
    document.getElementById('art_popup').showModal();
    document.getElementById('art_popup').classList.add('animated')
}

// light theme lol
function changetolighttheme() {
    document.getElementById('pfp').src = '/images/synth.png';
    document.getElementById('welcome_message').innerText = "Hi, I'm Celeron"
    document.getElementById('furry_message').innerText = "As you can see I'm a furry (Synth, Beep Boop)"

    //first get the root scene
    var root = document.querySelector(':root');
    root.style.setProperty('--background-color', 'rgb(250, 240, 220)');
    root.style.setProperty('--widget-background', 'rgba(134, 134, 134, 0.2)');
    root.style.setProperty('--button-background', 'rgba(200, 200, 200, 0.2)');
    root.style.setProperty('--font-color', 'black');
    root.style.setProperty('--font-background', 'white');

    root.style.setProperty('--main-color', '#c1951250');
    
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
const elements = document.querySelectorAll('.widget');

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





// Idk I just stole this code from somewhere but I forgot

 // Create particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 60;

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Initial position
    resetParticle(particle);
    
    particlesContainer.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    
    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);
    
    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Animate with GSAP-like timing
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards
        
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        
        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    // Create particles at mouse position
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    
    // Create temporary particle
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Small size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position at mouse
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';
    
    particlesContainer.appendChild(particle);
    
    // Animate outward
    setTimeout(() => {
        particle.style.transition = 'all 1.5s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }, 10);
    
    // Subtle movement of gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    spheres.forEach(sphere => {
        const currentTransform = getComputedStyle(sphere).transform;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});