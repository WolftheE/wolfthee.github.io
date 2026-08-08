
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

// configure the tsParticles background
(async () => {
  await tsParticles.load({
    id: "tsparticlesbackground",
    options: {
      particles: {
        number: { value: 80, density: { enable: true } },
        paint: {
          color: "#9dc4d9",
        },
        shape: { type: "circle" },
        opacity: { value: 0.3 },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 150,
          color: "#9dc4d9",
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