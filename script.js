let currentPage = 1;


/* =========================================================
   GENERAL PAGE NAVIGATION
========================================================= */

function goToPage(n) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById("page" + n);

  if (page) {
    page.classList.add("active");
  }

  currentPage = n;


  /* PAGE 3 */
  if (n === 3) {
    startGame();
  } else {
    stopGame();
  }


  /* PAGE 4 */
  if (n === 4) {
    startCatchGame();
  } else {
    stopCatchGame();
  }


  /* PAGE 6 */
  if (n === 6) {
    resetCakeForPage();
  }


  /* PAGE 7 */
  if (n === 7) {

    createFloatingHearts();

    createFireworks(30);
  }
}


/* =========================================================
   PAGE 1 DECORATIONS
========================================================= */

function createPage1Decor() {

  const page1 = document.getElementById("page1");


  for (let i = 0; i < 10; i++) {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    balloon.style.left =
      Math.random() * 100 + "vw";

    balloon.style.animationDelay =
      Math.random() * 5 + "s";

    page1.appendChild(balloon);
  }


  for (let i = 0; i < 10; i++) {

    const flower = document.createElement("div");

    flower.className = "flower";

    flower.style.left =
      Math.random() * 100 + "vw";

    flower.style.bottom = "0";

    flower.style.animationDelay =
      Math.random() * 6 + "s";

    page1.appendChild(flower);
  }
}


/* =========================================================
   PAGE 2 – GIFT
========================================================= */

let giftOpened = false;


function openGift() {

  if (giftOpened) return;

  giftOpened = true;


  const giftBox =
    document.getElementById("giftBox");

  const giftMessage =
    document.getElementById("giftMessage");

  const nextButton =
    document.getElementById("nextFromGift");

  const bouquet =
    document.getElementById("bouquet");

  const bouquetText =
    document.getElementById("bouquetText");


  giftBox.classList.add("glowing");

  giftBox.style.animation =
    "shake 0.6s ease";


  setTimeout(() => {

    giftBox.style.animation = "";

    giftMessage.classList.add("show");

    nextButton.style.display =
      "inline-block";


    if (bouquet) {
      bouquet.classList.add("show");
    }

    if (bouquetText) {
      bouquetText.classList.add("show");
    }


    createFireworks(30);

    setTimeout(() => {
      createFireworks(30);
    }, 500);

    setTimeout(() => {
      createFireworks(30);
    }, 1000);


    createGiftDecorations(30);

  }, 700);
}


function createFireworks(count = 12) {

  for (let i = 0; i < count; i++) {

    const firework =
      document.createElement("div");

    firework.className =
      "firework";

    firework.style.left =
      Math.random() * 100 + "vw";

    firework.style.top =
      Math.random() * 60 + "vh";

    firework.style.background =
      `hsl(${Math.random() * 360}, 80%, 60%)`;


    document.body.appendChild(firework);


    setTimeout(() => {
      firework.remove();
    }, 1200);
  }
}


function createGiftDecorations(count = 20) {

  for (let i = 0; i < count; i++) {

    const decoration =
      document.createElement("div");

    decoration.className =
      "gift-decoration";

    decoration.style.left =
      20 + Math.random() * 60 + "vw";

    decoration.style.bottom =
      5 + Math.random() * 15 + "vh";

    decoration.style.background =
      `radial-gradient(
        circle at 30% 30%,
        #fff,
        hsl(${Math.random() * 360},80%,65%)
      )`;

    decoration.style.animationDuration =
      2.5 + Math.random() * 2 + "s";


    document.body.appendChild(decoration);


    setTimeout(() => {
      decoration.remove();
    }, 4000);
  }
}


/* =========================================================
   PAGE 3 – BALLOON GAME
========================================================= */

let score = 0;

let gameInterval = null;

const maxScore = 10;


function startGame() {

  const gameArea =
    document.getElementById("gameArea");

  const winMessage =
    document.getElementById("winMessage");

  const nextButton =
    document.getElementById("nextFromGame");


  score = 0;

  document.getElementById("score")
    .textContent = score;


  gameArea.innerHTML = "";

  winMessage.classList.remove("show");

  nextButton.style.display = "none";


  if (gameInterval) {
    clearInterval(gameInterval);
  }


  gameInterval = setInterval(() => {

    if (score < maxScore) {
      createGameBalloon();
    }

  }, 800);
}


function stopGame() {

  if (gameInterval) {

    clearInterval(gameInterval);

    gameInterval = null;
  }
}


function createGameBalloon() {

  const gameArea =
    document.getElementById("gameArea");


  const balloon =
    document.createElement("div");


  balloon.className =
    "game-balloon";


  const letters =
    ["L", "O", "V", "E", "❤", "H", "B"];


  balloon.textContent =
    letters[
      Math.floor(
        Math.random() * letters.length
      )
    ];


  const colors = [

    "radial-gradient(circle at 20% 20%, #ffffff, #ff6b6b)",

    "radial-gradient(circle at 20% 20%, #ffffff, #6bc5ff)",

    "radial-gradient(circle at 20% 20%, #ffffff, #6bff95)",

    "radial-gradient(circle at 20% 20%, #ffffff, #ffde59)",

    "radial-gradient(circle at 20% 20%, #ffffff, #c86bff)"

  ];


  balloon.style.background =
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ];


  const areaWidth =
    gameArea.clientWidth;


  const x =
    Math.max(
      0,
      Math.random() *
      (areaWidth - 55)
    );


  balloon.style.left =
    x + "px";

  balloon.style.bottom =
    "-80px";


  balloon.addEventListener("click", () => {

    if (score >= maxScore) return;


    score++;


    document.getElementById("score")
      .textContent = score;


    balloon.remove();


    if (score >= maxScore) {
      gameWin();
    }

  });


  gameArea.appendChild(balloon);


  setTimeout(() => {

    if (balloon.isConnected) {
      balloon.remove();
    }

  }, 4000);
}


function gameWin() {

  const winMessage =
    document.getElementById("winMessage");

  const nextButton =
    document.getElementById("nextFromGame");


  winMessage.classList.add("show");

  nextButton.style.display =
    "inline-block";


  createFireworks(25);

  setTimeout(() => {
    createFireworks(25);
  }, 500);


  stopGame();
}


/* =========================================================
   PAGE 4 – CATCH THE HEARTS
========================================================= */

let heartsScore = 0;

let heartsInterval = null;

const heartsTarget = 8;

let basketX = 50;


/* MOBILE MOTION */
let motionEnabled = false;

let lastTiltMove = 0;


/* KEYBOARD */
let keyLeft = false;
let keyRight = false;


function isMobileDevice() {

  return /Android|iPhone|iPad|iPod|Mobile/i
    .test(navigator.userAgent);
}


function startCatchGame() {

  const catchArea =
    document.getElementById("catchArea");

  const winMessage =
    document.getElementById("catchWinMessage");

  const nextButton =
    document.getElementById("nextFromCatch");


  heartsScore = 0;

  document.getElementById("heartsScore")
    .textContent = heartsScore;


  winMessage.classList.remove("show");

  nextButton.style.display =
    "none";


  catchArea
    .querySelectorAll(".heart")
    .forEach(heart => heart.remove());


  basketX = 50;


  const basket =
    document.getElementById("basket");


  basket.style.left =
    basketX + "%";

  basket.style.transform =
    "translateX(-50%)";


  setupCatchControls();


  if (heartsInterval) {
    clearInterval(heartsInterval);
  }


  heartsInterval = setInterval(() => {

    if (heartsScore < heartsTarget) {
      createHeart();
    }

  }, 900);
}


function stopCatchGame() {

  if (heartsInterval) {

    clearInterval(heartsInterval);

    heartsInterval = null;
  }


  const catchArea =
    document.getElementById("catchArea");


  if (catchArea) {

    catchArea
      .querySelectorAll(".heart")
      .forEach(heart => heart.remove());

  }


  stopMotionControls();
}


/* =========================================================
   MOBILE / DESKTOP CONTROLS
========================================================= */

function setupCatchControls() {

  const motionButton =
    document.getElementById("motionButton");

  const desktopHint =
    document.querySelector(".desktop-only");

  const mobileHint =
    document.querySelector(".mobile-only");


  if (isMobileDevice()) {

    motionButton.style.display =
      "inline-block";


    if (desktopHint) {
      desktopHint.style.display =
        "none";
    }


    if (mobileHint) {
      mobileHint.style.display =
        "block";
    }


    setMotionStatus(
      "Tap “Enable Motion Controls” to use phone tilt."
    );

  } else {

    motionButton.style.display =
      "none";


    if (desktopHint) {
      desktopHint.style.display =
        "block";
    }


    if (mobileHint) {
      mobileHint.style.display =
        "none";
    }


    setMotionStatus(
      "Use the ← and → arrow keys to move the basket."
    );
  }
}


function setMotionStatus(message) {

  const status =
    document.getElementById("motionStatus");


  if (status) {
    status.textContent = message;
  }
}


/* =========================================================
   PHONE TILT
========================================================= */

async function enableMotionControls() {

  if (!("DeviceOrientationEvent" in window)) {

    setMotionStatus(
      "Motion controls are not supported on this device/browser."
    );

    return;
  }


  try {

    /*
      iPhone Safari requires permission
      to access motion sensors.
    */

    if (
      typeof DeviceOrientationEvent.requestPermission
      === "function"
    ) {

      const permission =
        await DeviceOrientationEvent.requestPermission();


      if (permission !== "granted") {

        setMotionStatus(
          "Motion permission was not granted. Use the buttons below instead."
        );

        return;
      }
    }


    window.addEventListener(
      "deviceorientation",
      handleDeviceOrientation,
      true
    );


    motionEnabled = true;


    document.getElementById("motionButton")
      .style.display = "none";


    setMotionStatus(
      "✅ Motion controls enabled — tilt your phone left or right."
    );


  } catch (error) {

    console.error(
      "Motion permission error:",
      error
    );


    setMotionStatus(
      "Could not enable motion controls. Use the buttons below."
    );
  }
}


function handleDeviceOrientation(event) {

  if (!motionEnabled) return;

  if (currentPage !== 4) return;


  const tilt =
    event.gamma;


  if (typeof tilt !== "number") {
    return;
  }


  const now =
    Date.now();


  if (
    now - lastTiltMove < 55
  ) {
    return;
  }


  /*
    Negative gamma = phone tilted left
    Positive gamma = phone tilted right
  */

  if (tilt < -8) {

    moveBasket(-1);

    lastTiltMove = now;

  } else if (tilt > 8) {

    moveBasket(1);

    lastTiltMove = now;
  }
}


function stopMotionControls() {

  motionEnabled = false;


  window.removeEventListener(
    "deviceorientation",
    handleDeviceOrientation,
    true
  );
}


/* =========================================================
   LAPTOP ARROW KEYS
========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (currentPage !== 4) {
      return;
    }


    if (event.key === "ArrowLeft") {

      event.preventDefault();

      if (!keyLeft) {

        keyLeft = true;

        moveBasket(-1);
      }
    }


    if (event.key === "ArrowRight") {

      event.preventDefault();

      if (!keyRight) {

        keyRight = true;

        moveBasket(1);
      }
    }

  }
);


document.addEventListener(
  "keyup",
  function(event) {

    if (event.key === "ArrowLeft") {
      keyLeft = false;
    }


    if (event.key === "ArrowRight") {
      keyRight = false;
    }

  }
);


/* =========================================================
   CREATE FALLING HEART
========================================================= */

function createHeart() {

  const catchArea =
    document.getElementById("catchArea");


  if (!catchArea) return;

  if (currentPage !== 4) return;


  const areaRect =
    catchArea.getBoundingClientRect();


  const heart =
    document.createElement("div");


  heart.className =
    "heart";


  const x =
    Math.random() *
    Math.max(
      1,
      areaRect.width - 35
    );


  heart.style.left =
    x + "px";

  heart.style.top =
    "-40px";


  catchArea.appendChild(heart);


  let position = -40;


  const fallSpeed =
    5 + Math.random() * 3;


  const fall =
    setInterval(() => {

      if (
        !heart.isConnected ||
        currentPage !== 4
      ) {

        clearInterval(fall);

        return;
      }


      position += fallSpeed;


      heart.style.top =
        position + "px";


      const heartRect =
        heart.getBoundingClientRect();


      const basket =
        document.getElementById("basket");


      if (!basket) {

        clearInterval(fall);

        return;
      }


      const basketRect =
        basket.getBoundingClientRect();


      const horizontal =
        heartRect.right >
          basketRect.left &&
        heartRect.left <
          basketRect.right;


      const vertical =
        heartRect.bottom >
          basketRect.top &&
        heartRect.bottom <
          basketRect.bottom + 25;


      if (
        horizontal &&
        vertical
      ) {

        clearInterval(fall);


        heart.remove();


        heartsScore++;


        document.getElementById(
          "heartsScore"
        ).textContent =
          heartsScore;


        if (
          heartsScore >=
          heartsTarget
        ) {

          catchWin();
        }


        return;
      }


      if (
        position >
        areaRect.height + 50
      ) {

        clearInterval(fall);


        if (heart.isConnected) {
          heart.remove();
        }
      }

    }, 40);
}


/* =========================================================
   MOVE BASKET
========================================================= */

function moveBasket(direction) {

  const step = 6;


  basketX +=
    direction * step;


  if (basketX < 5) {
    basketX = 5;
  }


  if (basketX > 95) {
    basketX = 95;
  }


  const basket =
    document.getElementById("basket");


  if (!basket) return;


  basket.style.left =
    basketX + "%";


  basket.style.transform =
    "translateX(-50%)";
}


/* =========================================================
   CATCH GAME WIN
========================================================= */

function catchWin() {

  const winMessage =
    document.getElementById(
      "catchWinMessage"
    );


  const nextButton =
    document.getElementById(
      "nextFromCatch"
    );


  winMessage.classList.add("show");

  nextButton.style.display =
    "inline-block";


  createFireworks(25);

  setTimeout(() => {
    createFireworks(25);
  }, 600);


  stopCatchGame();
}


/* =========================================================
   PAGE 6 – CAKE
========================================================= */

let candlesBlown = false;

let cakeCut = false;


/* MICROPHONE VARIABLES */

let audioContext = null;

let analyser = null;

let microphoneStream = null;

let microphoneSource = null;

let micAnimationFrame = null;


/*
  IMPORTANT:
  Your MP3 must be named exactly:
  happy birthday.mp3
*/

const birthdaySong =
  new Audio("happy birthday.mp3");


birthdaySong.preload = "auto";


/* =========================================================
   RESET CAKE
========================================================= */

function resetCakeForPage() {

  candlesBlown = false;

  cakeCut = false;


  stopBlowDetection();


  const candleRow =
    document.getElementById(
      "candleRow"
    );


  const cakeContainer =
    document.getElementById(
      "cakeContainer"
    );


  const cakeMessage =
    document.getElementById(
      "cakeMessage"
    );


  const nextButton =
    document.getElementById(
      "nextFromCake"
    );


  const blowButton =
    document.getElementById(
      "blowButton"
    );


  const cutButton =
    document.getElementById(
      "cutButton"
    );


  const knife =
    document.getElementById(
      "cakeKnife"
    );


  if (candleRow) {
    candleRow.classList.remove(
      "candles-blown"
    );
  }


  if (cakeContainer) {
    cakeContainer.classList.remove(
      "cut"
    );
  }


  if (cakeMessage) {
    cakeMessage.classList.remove(
      "show"
    );
  }


  if (nextButton) {
    nextButton.style.display =
      "none";
  }


  if (blowButton) {

    blowButton.disabled =
      false;

    blowButton.textContent =
      "🎤 Blow Candles";
  }


  if (cutButton) {
    cutButton.disabled = false;
  }


  if (knife) {
    knife.classList.remove(
      "knife-cutting"
    );
  }


  document
    .querySelectorAll(".flame")
    .forEach(flame => {

      flame.style.opacity = "1";

      flame.style.animation =
        "flicker 0.3s infinite alternate";

    });


  setMicStatus(
    'Tap "Blow Candles" and blow toward your microphone.'
  );


  birthdaySong.pause();

  try {
    birthdaySong.currentTime = 0;
  } catch (error) {}
}


/* =========================================================
   START MICROPHONE BLOW DETECTION
========================================================= */

async function startBlowDetection() {

  if (candlesBlown) {
    return;
  }


  const blowButton =
    document.getElementById(
      "blowButton"
    );


  try {

    /*
      Browser must support microphone.
    */

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {

      setMicStatus(
        "Microphone access is not supported here. Open the site through HTTPS or localhost."
      );

      return;
    }


    blowButton.disabled = true;

    blowButton.textContent =
      "🎤 Listening...";


    setMicStatus(
      "Allow microphone access, then blow toward the microphone. 💨"
    );


    microphoneStream =
      await navigator.mediaDevices.getUserMedia({

        audio: {

          echoCancellation: false,

          noiseSuppression: false,

          autoGainControl: false
        }

      });


    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    await audioContext.resume();


    analyser =
      audioContext.createAnalyser();


    analyser.fftSize =
      2048;


    analyser.smoothingTimeConstant =
      0.15;


    microphoneSource =
      audioContext.createMediaStreamSource(
        microphoneStream
      );


    microphoneSource.connect(
      analyser
    );


    detectBlow();


  } catch (error) {

    console.error(
      "Microphone error:",
      error
    );


    blowButton.disabled =
      false;


    blowButton.textContent =
      "🎤 Blow Candles";


    setMicStatus(
      "Microphone permission was denied or unavailable. Try again or use HTTPS/localhost."
    );


    stopBlowDetection();
  }
}


/* =========================================================
   DETECT BLOW
========================================================= */

function detectBlow() {

  if (!analyser) {
    return;
  }


  if (candlesBlown) {
    return;
  }


  const buffer =
    new Uint8Array(
      analyser.fftSize
    );


  analyser.getByteTimeDomainData(
    buffer
  );


  let sum = 0;


  for (
    let i = 0;
    i < buffer.length;
    i++
  ) {

    const value =
      (buffer[i] - 128) / 128;


    sum +=
      value * value;
  }


  const rms =
    Math.sqrt(
      sum / buffer.length
    );


  /*
    Blow threshold.

    If the microphone is very sensitive,
    this can be increased.

    If the microphone does not detect
    blowing, it can be decreased.
  */

  if (rms > 0.055) {

    blowCandles();

    return;
  }


  micAnimationFrame =
    requestAnimationFrame(
      detectBlow
    );
}


/* =========================================================
   BLOW CANDLES
========================================================= */

function blowCandles() {

  if (candlesBlown) {
    return;
  }


  candlesBlown = true;


  const candleRow =
    document.getElementById(
      "candleRow"
    );


  const blowButton =
    document.getElementById(
      "blowButton"
    );


  if (candleRow) {

    candleRow.classList.add(
      "candles-blown"
    );
  }


  document
    .querySelectorAll(".candle")
    .forEach(candle => {

      const smoke =
        document.createElement(
          "div"
        );


      smoke.className =
        "smoke";


      candle.appendChild(smoke);


      setTimeout(() => {

        if (smoke.isConnected) {
          smoke.remove();
        }

      }, 1800);

    });


  if (blowButton) {

    blowButton.textContent =
      "Candles Blown! 💨";
  }


  setMicStatus(
    "✨ Amazing! The candles are blown out. Now cut the cake! 🎂"
  );


  stopBlowDetection();


  createFloatingHearts();
}


/* =========================================================
   STOP MICROPHONE
========================================================= */

function stopBlowDetection() {

  if (micAnimationFrame) {

    cancelAnimationFrame(
      micAnimationFrame
    );

    micAnimationFrame = null;
  }


  if (microphoneSource) {

    try {
      microphoneSource.disconnect();
    } catch (error) {}

    microphoneSource = null;
  }


  if (microphoneStream) {

    microphoneStream
      .getTracks()
      .forEach(track => {
        track.stop();
      });


    microphoneStream = null;
  }


  if (audioContext) {

    try {
      audioContext.close();
    } catch (error) {}


    audioContext = null;
  }


  analyser = null;
}


/* =========================================================
   MICROPHONE STATUS
========================================================= */

function setMicStatus(message) {

  const status =
    document.getElementById(
      "micStatus"
    );


  if (status) {
    status.textContent =
      message;
  }
}


/* =========================================================
   CUT CAKE
========================================================= */

function cutCake() {

  if (cakeCut) {
    return;
  }


  cakeCut = true;


  const container =
    document.getElementById(
      "cakeContainer"
    );


  const message =
    document.getElementById(
      "cakeMessage"
    );


  const nextButton =
    document.getElementById(
      "nextFromCake"
    );


  const cutButton =
    document.getElementById(
      "cutButton"
    );


  const knife =
    document.getElementById(
      "cakeKnife"
    );


  if (container) {

    container.classList.add(
      "cut"
    );
  }


  if (knife) {

    knife.classList.add(
      "knife-cutting"
    );
  }


  if (cutButton) {
    cutButton.disabled = true;
  }


  /*
    Start the birthday song
    after the cut animation begins.
  */

  setTimeout(() => {

    playBirthdaySong();

  }, 500);


  setTimeout(() => {

    if (message) {
      message.classList.add(
        "show"
      );
    }


    if (nextButton) {

      nextButton.style.display =
        "inline-block";
    }


    createFireworks(30);

    setTimeout(() => {
      createFireworks(30);
    }, 600);

    setTimeout(() => {
      createFireworks(30);
    }, 1200);


    createConfetti(90);

    createPetals(40);

  }, 650);
}


/* =========================================================
   PLAY HAPPY BIRTHDAY SONG
========================================================= */

function playBirthdaySong() {

  birthdaySong.currentTime = 0;


  birthdaySong.play()
    .catch(error => {

      console.warn(
        "Audio playback blocked:",
        error
      );


      setMicStatus(
        "Cake cut! 🎂 If the song didn't start, tap the page once and try again."
      );
    });
}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(count = 40) {

  for (let i = 0; i < count; i++) {

    const piece =
      document.createElement(
        "div"
      );


    piece.className =
      "confetti-piece";


    piece.style.left =
      Math.random() * 100 + "vw";


    piece.style.background =
      `hsl(${Math.random() * 360}, 90%, 60%)`;


    piece.style.animationDuration =
      2 + Math.random() * 2 + "s";


    document.body.appendChild(
      piece
    );


    setTimeout(() => {
      piece.remove();
    }, 4000);
  }
}


/* =========================================================
   PETALS
========================================================= */

function createPetals(count = 30) {

  for (let i = 0; i < count; i++) {

    const petal =
      document.createElement(
        "div"
      );


    petal.className =
      "petal";


    petal.style.left =
      Math.random() * 100 + "vw";


    petal.style.animationDuration =
      3 + Math.random() * 3 + "s";


    document.body.appendChild(
      petal
    );


    setTimeout(() => {
      petal.remove();
    }, 5000);
  }
}


/* =========================================================
   PAGE 7 – FLOATING HEARTS
========================================================= */

function createFloatingHearts() {

  for (let i = 0; i < 10; i++) {

    const heart =
      document.createElement(
        "div"
      );


    heart.className =
      "floating-heart";


    heart.style.left =
      Math.random() * 100 + "vw";


    heart.style.animationDelay =
      Math.random() * 5 + "s";


    document.body.appendChild(
      heart
    );


    setTimeout(() => {
      heart.remove();
    }, 9000);
  }
}


/* =========================================================
   RESET EVERYTHING
========================================================= */

function resetAll() {

  /* GIFT */

  giftOpened = false;


  const giftBox =
    document.getElementById(
      "giftBox"
    );


  const giftMessage =
    document.getElementById(
      "giftMessage"
    );


  const nextGift =
    document.getElementById(
      "nextFromGift"
    );


  const bouquet =
    document.getElementById(
      "bouquet"
    );


  const bouquetText =
    document.getElementById(
      "bouquetText"
    );


  if (giftBox) {

    giftBox.classList.remove(
      "glowing"
    );

    giftBox.style.animation = "";
  }


  if (giftMessage) {
    giftMessage.classList.remove(
      "show"
    );
  }


  if (nextGift) {
    nextGift.style.display =
      "none";
  }


  if (bouquet) {
    bouquet.classList.remove(
      "show"
    );
  }


  if (bouquetText) {
    bouquetText.classList.remove(
      "show"
    );
  }


  /* GAME 1 */

  stopGame();


  document.getElementById(
    "score"
  ).textContent = "0";


  document.getElementById(
    "gameArea"
  ).innerHTML = "";


  document.getElementById(
    "winMessage"
  ).classList.remove(
    "show"
  );


  document.getElementById(
    "nextFromGame"
  ).style.display = "none";


  /* GAME 2 */

  stopCatchGame();


  heartsScore = 0;


  const catchArea =
    document.getElementById(
      "catchArea"
    );


  if (catchArea) {

    catchArea.innerHTML =
      '<div id="basket"></div>';
  }


  document.getElementById(
    "heartsScore"
  ).textContent = "0";


  document.getElementById(
    "catchWinMessage"
  ).classList.remove(
    "show"
  );


  document.getElementById(
    "nextFromCatch"
  ).style.display =
    "none";


  /* CAKE */

  resetCakeForPage();


  birthdaySong.pause();


  try {
    birthdaySong.currentTime = 0;
  } catch (error) {}
}


/* =========================================================
   START WEBSITE
========================================================= */

createPage1Decor();

goToPage(1);