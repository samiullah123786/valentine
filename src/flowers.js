// flowers.js - Hyper-Realistic 3D Flower Generation with Enhanced Beauty

function createFlower(x, y) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  const numPetals = Math.floor(Math.random() * 6) + 7; // 7-12 petals
  const baseHue = Math.random() * 360;

  // Subtle swaying animation for the whole flower
  flower.animate([
    { transform: `translate(-50%, -50%) rotate(0deg)` },
    { transform: `translate(-50%, -50%) rotate(2deg)` }, // Gentle sway
    { transform: `translate(-50%, -50%) rotate(0deg)` }
  ], {
    duration: 8000 + Math.random() * 4000, // Slow and varied
    easing: 'ease-in-out',
    iterations: Infinity,
    direction: 'alternate'
  });


  for (let i = 0; i < numPetals; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const rotation = i * (360 / numPetals);

    petal.style.transform = `rotate(${rotation}deg) rotate3d(1, 0.6, 0, 55deg) translate3d(0, 0, ${Math.random() * 25}px)`;

    const petalColor = `hsl(${baseHue + (i * 5)}, 100%, ${Math.random() * 15 + 65}%)`;
    petal.style.backgroundColor = petalColor;

    // More pronounced dynamic lighting
    petal.style.backgroundImage = `radial-gradient(circle at 30% 10%, ${petalColor}, ${adjustColor(petalColor, -30)} 95%)`;
    petal.style.boxShadow = `0px 0px 20px 8px rgba(0,0,0,0.1)`;

    // Add translucency
    petal.style.opacity = 0.9;

    petal.style.animationDelay = `${i * 0.1}s`; // Increased delay

        petal.animate([
      { transform: petal.style.transform },
      { transform: `${petal.style.transform} rotate3d(1, 0.6, 0, ${55 + (Math.random() * 8 - 4)}deg)` }, // +/- 4 degrees
      { transform: petal.style.transform }
    ], {
      duration: 4000 + Math.random() * 3000,
      easing: 'ease-in-out',
      iterations: Infinity,
      direction: 'alternate'
    });

    const vein = document.createElement('div');
    vein.classList.add('petal-vein');
    vein.style.backgroundColor = adjustColor(petalColor, -15); // Darker vein
    petal.appendChild(vein);

    flower.appendChild(petal);
  }

  const center = document.createElement('div');
  center.classList.add('flower-center');
  flower.appendChild(center);

  const numStamens = Math.floor(Math.random() * 10) + 5;
  for (let i = 0; i < numStamens; i++) {
    const stamen = document.createElement('div');
    stamen.classList.add('stamen');
    const angle = (i / numStamens) * 2 * Math.PI;
    const radius = 8 + Math.random() * 4;
    stamen.style.left = `${Math.cos(angle) * radius + 15}px`;
    stamen.style.top = `${Math.sin(angle) * radius + 15}px`;
    stamen.style.backgroundColor = `hsl(${baseHue + 180}, 100%, 50%)`;
    center.appendChild(stamen);
  }

    const pistil = document.createElement('div');
    pistil.classList.add('pistil');
    center.appendChild(pistil)

  document.getElementById('app').appendChild(flower);

  flower.animate([
    { opacity: 0, transform: `translate(-50%, -50%) scale(0) rotate(0deg)` },
    { opacity: 1, transform: `translate(-50%, -50%) scale(1.1) rotate(360deg)` },
    { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(360deg)` }
  ], {
    duration: 1500,
    easing: 'ease-out',
    iterations: 1
  });
}

// Helper function to adjust color lightness
function adjustColor(color, amount) {
  let usePound = false;
  if (color[0] == "#") {
      color = color.slice(1);
      usePound = true;
  }
  let num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amount;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;
  let g = (num & 0x0000FF) + amount;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export function showFlowers() {
  const numFlowers = 15;
  for (let i = 0; i < numFlowers; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createFlower(x, y);
  }
}
