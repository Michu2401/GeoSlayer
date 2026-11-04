// Zbieranie klas do tworzenia animacji
const clickReceiver = document.querySelector(".arena");
const mainCharacter = document.querySelector(".hero");
// Zmienne potrzebne do pasku HP i DMG
const baseHP = 80;
let enemyHp = baseHP;
const dmg = 30;
let enemyMaxHp = baseHP;
const hpGrowth = 1.15;
const hpStatus = document.querySelector(".hp-status");
const hpNumber = document.querySelector(".hp-number");
// Zmienne o przeciwnikach
let enemyWave = 1;
const maxEnemyWave = 5;
const enemyWaveNumber = document.querySelector(".enemy-wave");
// Zmienne etapów
let stage = 1;
// Czas miedzy przeciwnikami
const cooldownTime = 500;
let isCoolingDown = false;
// Zmienna przeciwnika
const enemy = document.querySelector(".enemy")
// Zmienna etapu
const stageNumber = document.querySelector(".enemy-stage");
// Zmienne pokazywania obrażeń
// Start Gry
updateHpStatus();
updateWaveNumber();
updateStage();

clickReceiver.addEventListener("click", () => {
  mainCharacter.classList.add("hero-attack-animation");
  enemy.classList.add("enemy-hit")

  if (isCoolingDown) {
    return;
  }

  showDmg(dmg)

  enemyHp = enemyHp - dmg;
  enemyHp = Math.max(0, enemyHp);

  updateHpStatus();

  if (enemyHp <= 0) {
    enemy.classList.add("enemy-defeted")
    isCoolingDown = true;

    setTimeout(() => {
      nextEnemy();
      isCoolingDown = false;
    }, cooldownTime);
  }
});

mainCharacter.addEventListener("animationend", () => {
  mainCharacter.classList.remove("hero-attack-animation");
  enemy.classList.remove("enemy-hit")
});



function updateHpStatus() {
  const percent = (enemyHp / enemyMaxHp) * 100;
  hpStatus.style.width = percent + "%";
  hpNumber.textContent = enemyHp;
}
function nextEnemy() {
  enemy.classList.remove("enemy-defeted")
  enemyWave = enemyWave + 1;
  enemyHp = enemyMaxHp;
  if (enemyWave > maxEnemyWave) {
    enemyWave = 1;
    stage++;
    enemyMaxHp = Math.floor(baseHP * Math.pow(hpGrowth, stage - 1));
    enemyHp = enemyMaxHp;
  }

  updateHpStatus();
  updateWaveNumber();
  updateStage();
}
function updateWaveNumber() {
  enemyWaveNumber.textContent = "Przeciwnik " + enemyWave + "/" + maxEnemyWave;
}
function updateStage() {
  stageNumber.textContent = "Stage " + stage;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function showDmg(dmg) {
  const dmgNumber = document.createElement("div");
  dmgNumber.className = "dmgNumber";
  dmgNumber.textContent = "-" + dmg;
  dmgNumber.style.left = randomBetween(30, 70) + "%";
  dmgNumber.style.top = randomBetween(20, 60) + "%";
  dmgNumber.style.fontSize = randomBetween(14, 22) + "px"
  document.querySelector(".arena").appendChild(dmgNumber);
  
  dmgNumber.addEventListener("animationend", () => {
    dmgNumber.remove();
  })
}