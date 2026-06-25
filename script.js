const cat = document.getElementById('cat');
const heartsContainer = document.getElementById('hearts');
const petCountEl = document.getElementById('petCount');
const happinessBar = document.getElementById('happinessBar');
const happinessVal = document.getElementById('happinessVal');
const moodEl = document.getElementById('mood');

let pets = 0;
let happiness = 50;
let happyTimer = null;
let blinkInterval = null;

const moods = [
  { min: 0,  max: 20,  msg: 'The cat ignores you completely.' },
  { min: 20, max: 40,  msg: 'The cat flicks its tail.' },
  { min: 40, max: 60,  msg: 'The cat looks at you curiously...' },
  { min: 60, max: 80,  msg: 'Purrrr... the cat is warming up to you!' },
  { min: 80, max: 101, msg: 'The cat is overjoyed! 😻 Purrrrrr!!!' },
];

function getMood(h) {
  return moods.find(m => h >= m.min && h < m.max)?.msg ?? '';
}

function updateStats() {
  happiness = Math.min(100, Math.max(0, happiness));
  happinessBar.style.width = happiness + '%';
  happinessVal.textContent = happiness + '%';
  moodEl.textContent = getMood(happiness);
}

function spawnHeart(x, y) {
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.textContent = ['❤️', '🧡', '💛', '💜'][Math.floor(Math.random() * 4)];
  heart.style.left = (x + (Math.random() * 40 - 20)) + 'px';
  heart.style.top  = (y + (Math.random() * 20 - 10)) + 'px';
  heartsContainer.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function petCat(e) {
  pets++;
  happiness = Math.min(100, happiness + 8);
  petCountEl.textContent = pets;
  updateStats();

  // Position hearts relative to the wrapper
  const rect = heartsContainer.getBoundingClientRect();
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
  const y = (e.clientY ?? rect.top  + rect.height / 2) - rect.top;

  const count = happiness > 70 ? 3 : 1;
  for (let i = 0; i < count; i++) spawnHeart(x, y);

  // Happy state
  cat.classList.add('happy');
  clearTimeout(happyTimer);
  happyTimer = setTimeout(() => {
    cat.classList.remove('happy');
    happiness = Math.max(0, happiness - 5);
    updateStats();
  }, 2000);
}

// Blink randomly
function startBlinking() {
  blinkInterval = setInterval(() => {
    if (cat.classList.contains('happy')) return;
    cat.classList.add('blinking');
    setTimeout(() => cat.classList.remove('blinking'), 150);
  }, 3000 + Math.random() * 3000);
}

// Slowly lose happiness over time
setInterval(() => {
  if (!cat.classList.contains('happy')) {
    happiness = Math.max(0, happiness - 1);
    updateStats();
  }
}, 4000);

cat.addEventListener('click', petCat);
startBlinking();
updateStats();
