export function loadbackground() {
  (async () => {
    await loadSlim(tsParticles);
    await tsParticles.load({
      id: "tsparticlesbackground",
      options: {
        particles: {
          number: { value: 1 },
          shape: { type: "circle" },
        },
      },
    });
  })();
}

export function light() {
  var root = document.querySelector(':root');
  root.style.setProperty('--background-color', 'rgb(255, 255, 255)');
  root.style.setProperty('--widget-background', 'rgba(225, 225, 225, 0.75)');
  root.style.setProperty('--button-background', 'rgba(255, 255, 255, 0.5)');
  root.style.setProperty('--popup-background', 'rgba(248, 242, 221, 0.9)');
  root.style.setProperty('--font-color', 'black');
  root.style.setProperty('--font-background', 'white');
  root.style.setProperty('--is-dark', '0');
  root.style.setProperty('--tilebar-bright', '1');
  root.style.setProperty('--widget-border', 'rgba(0,0,0,0.1)');
  root.style.setProperty('--main-color', '#c19512');

  // configure the tsParticles background
  (async () => {
    await tsParticles.load({
      id: "tsparticlesbackground",
      options: {
        particles: {
          number: { value: 80, density: { enable: true } },
          paint: {
            color: "#000000",
          },
          shape: { type: "circle" },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 2 } },
          links: {
            enable: true,
            distance: 200,
            color: "#000000",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "top-right",
            random: true,
          },
        },
      },
    });
  })();
}


export function dark() {
  var root = document.querySelector(':root');
  root.style.setProperty('--background-color', 'rgb(12, 12, 23)');
  root.style.setProperty('--widget-background', 'rgba(10, 20, 25, 0.3)');
  root.style.setProperty('--button-background', 'rgba(177, 177, 177, 0.15)');
  root.style.setProperty('--popup-background', 'rgba(12, 26, 34, 0.6)');
  root.style.setProperty('--font-color', 'rgb(255,255,255)');
  root.style.setProperty('--font-background', 'black');
  root.style.setProperty('--is-dark', '1');
  root.style.setProperty('--tilebar-bright', '6');
  root.style.setProperty('--widget-border', 'rgb(255, 255, 255, 0.1)');
  root.style.setProperty('--main-color', '#1295c1');

  // configure the tsParticles background
  (async () => {
    await tsParticles.load({
      id: "tsparticlesbackground",
      options: {
        particles: {
          number: { value: 80, density: { enable: true } },
          paint: {
            color: "#ffffff",
          },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "top-right",
            random: true,
          },
        },
      },
    });
  })();
}