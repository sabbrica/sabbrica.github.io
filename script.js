let currentPage = 1;

function goToPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page' + n);
  if (page) page.classList.add('active');
  currentPage = n;

  // start/stop game based on page
  if (n === 3) startGame();
  else stopGame();

  // hearts + fireworks for last page
  if (n === 6) {
    createFloatingHearts();
    createFireworks(30);   // extra fireworks on final message
  }
}

// ---------------- PAGE 1 ANIMATIONS (Balloons & Flowers) ----------------

function createPage1Decor() {
  const page1 = document.getElementById('page1');

  for (let i = 0; i < 10; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDelay = (Math.random() * 5) + 's';
    page1.appendChild(b);
  }

  for (let i = 0; i < 10; i++) {
    const f = document.createElement('div');
    f.className = 'flower';
    f.style.left = Math.random() * 100 + 'vw';
    f.style.bottom = '0';
    f.style.animationDelay = (Math.random() * 6) + 's';
    page1.appendChild(f);
  }
}

// ---------------- PAGE 2 – Gift + Fireworks + Bouquet ----------------

let giftOpened = false;

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  const giftBox = document.getElementById('giftBox');
  const giftMsg = document.getElementById('giftMessage');
  const nextBtn = document.getElementById('nextFromGift');
  const bouquet = document.getElementById('bouquet');
  const bouquetText = document.getElementById('bouquetText');

  giftBox.classList.add('glowing');
  giftBox.style.animation = 'shake 0.6s ease';

  setTimeout(() => {
    giftBox.style.animation = '';
    giftMsg.classList.add('show');
    nextBtn.style.display = 'inline-block';

    // 🌸 show bouquet + text
    if (bouquet) {
      bouquet.classList.add('show');
    }
    if (bouquetText) {
      bouquetText.classList.add('show');
    }

    // 🎆 More fireworks + decorations for mystery gift
    createFireworks(30);
    setTimeout(() => createFireworks(30), 500);
    setTimeout(() => createFireworks(30), 1000);
    createGiftDecorations(30);
  }, 700);
}

function createFireworks(count = 12) {
  for (let i = 0; i < count; i++) {
    const fw = document.createElement('div');
    fw.className = 'firework';
    fw.style.left = (Math.random() * 100) + 'vw';
    fw.style.top = (Math.random() * 60) + 'vh';
    fw.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    document.body.appendChild(fw);

    setTimeout(() => fw.remove(), 1200);
  }
}

function createGiftDecorations(count = 20) {
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'gift-decoration';
    d.style.left = (20 + Math.random() * 60) + 'vw';
    d.style.bottom = (5 + Math.random() * 15) + 'vh';
    d.style.background = `radial-gradient(circle at 30% 30%, #fff, hsl(${Math.random()*360},80%,65%))`;
    d.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 4000);
  }
}

// ---------------- PAGE 3 – Simple Balloon Game ----------------

let score = 0;
let gameInterval = null;
const maxScore = 10;

function startGame() {
  const gameArea = document.getElementById('gameArea');
  const winMessage = document.getElementById('winMessage');
  const nextBtn = document.getElementById('nextFromGame');

  score = 0;
  document.getElementById('score').textContent = score;
  gameArea.innerHTML = '';
  winMessage.classList.remove('show');
  nextBtn.style.display = 'none';

  if (gameInterval) clearInterval(gameInterval);

  gameInterval = setInterval(() => {
    if (score >= maxScore) return;
    createGameBalloon();
  }, 800);
}

function stopGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
}

function createGameBalloon() {
  const gameArea = document.getElementById('gameArea');
  const balloon = document.createElement('div');
  balloon.className = 'game-balloon';

  const letters = ['L', 'O', 'V', 'E', '❤', 'H', 'B'];
  balloon.textContent = letters[Math.floor(Math.random() * letters.length)];

  // 🎨 Multi-colored, visible balloons
  const colors = [
    'radial-gradient(circle at 20% 20%, #ffffff, #ff6b6b)',
    'radial-gradient(circle at 20% 20%, #ffffff, #6bc5ff)',
    'radial-gradient(circle at 20% 20%, #ffffff, #6bff95)',
    'radial-gradient(circle at 20% 20%, #ffffff, #ffde59)',
    'radial-gradient(circle at 20% 20%, #ffffff, #c86bff)'
  ];
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

  const areaWidth = gameArea.clientWidth;
  const x = Math.random() * (areaWidth - 55);
  balloon.style.left = x + 'px';
  balloon.style.bottom = '-80px';

  balloon.addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
    balloon.remove();

    if (score >= maxScore) {
      gameWin();
    }
  });

  gameArea.appendChild(balloon);

  // ⏱ Remove sooner so they don't stay too long
  setTimeout(() => balloon.remove(), 4000);
}

function gameWin() {
  const winMessage = document.getElementById('winMessage');
  const nextBtn = document.getElementById('nextFromGame');
  winMessage.classList.add('show');
  nextBtn.style.display = 'inline-block';

  // extra fireworks on winning game
  createFireworks(25);
  setTimeout(() => createFireworks(25), 500);

  stopGame();
}

// ---------------- PAGE 5 – Cake Actions ----------------

let candlesBlown = false;
let cakeCut = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  const candleRow = document.getElementById('candleRow');
  candleRow.classList.add('candles-blown');

  // create smoke for each candle
  candleRow.querySelectorAll('.candle').forEach(candle => {
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    candle.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1000);
  });
}

function cutCake() {
  if (cakeCut) return;
  cakeCut = true;

  const container = document.getElementById('cakeContainer');
  const msg = document.getElementById('cakeMessage');
  const nextBtn = document.getElementById('nextFromCake');

  container.classList.add('cut');
  msg.classList.add('show');
  nextBtn.style.display = 'inline-block';

  // 🎆 Extra fireworks + decorations on cake cutting
  createFireworks(30);
  setTimeout(() => createFireworks(30), 600);
  setTimeout(() => createFireworks(30), 1200);

  createConfetti(90);
  createPetals(40);

  // const sound = document.getElementById('celebrationSound');
  // if (sound) sound.play();
}

function createConfetti(count = 40) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

function createPetals(count = 30) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}

// ---------------- PAGE 6 – Floating Hearts ----------------

function createFloatingHearts() {
  // create a few hearts every time you land on page 6
  for (let i = 0; i < 10; i++) {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDelay = (Math.random() * 5) + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }
}

// ---------------- RESET EVERYTHING ON REPLAY ----------------

function resetAll() {
  // reset gift
  giftOpened = false;
  const giftBox = document.getElementById('giftBox');
  const giftMsg = document.getElementById('giftMessage');
  const nextGift = document.getElementById('nextFromGift');
  const bouquet = document.getElementById('bouquet');
  const bouquetText = document.getElementById('bouquetText');

  giftBox.classList.remove('glowing');
  giftMsg.classList.remove('show');
  nextGift.style.display = 'none';

  if (bouquet) bouquet.classList.remove('show');
  if (bouquetText) bouquetText.classList.remove('show');

  // reset game
  stopGame();
  document.getElementById('score').textContent = '0';
  document.getElementById('gameArea').innerHTML = '';
  document.getElementById('winMessage').classList.remove('show');
  document.getElementById('nextFromGame').style.display = 'none';

  // reset cake
  candlesBlown = false;
  cakeCut = false;
  const candleRow = document.getElementById('candleRow');
  candleRow.classList.remove('candles-blown');
  const cakeContainer = document.getElementById('cakeContainer');
  cakeContainer.classList.remove('cut');
  document.querySelectorAll('.flame').forEach(f => {
    f.style.opacity = 1;
    f.style.animation = 'flicker 0.3s infinite alternate';
  });
  document.getElementById('cakeMessage').classList.remove('show');
  document.getElementById('nextFromCake').style.display = 'none';
}

// Init decorations when page loads
createPage1Decor();
goToPage(1);