// Zbieranie klas do tworzenia animacji
const clickReceiver = document.querySelector(".arena")
const mainCharacter = document.querySelector(".hero")
// Zmienne potrzebne do pasku HP i DMG
const baseHP = 80;
let enemyHp = baseHP;
const dmg = 90
let enemyMaxHp = baseHP;
const hpGrowth = 1.15;
const hpStatus = document.querySelector(".hp-status");
const hpNumber = document.querySelector(".hp-number");
// Zmienne o przeciwnikach
let enemyWave = 1;
const maxEnemyWave = 5;
const enemyWaveNumber = document.querySelector(".enemy-wave")
// Zmienne etapów
let stage = 1;
const stageNumber = document.querySelector(".enemy-stage") 
// Start Gry
updateHpStatus();
updateWaveNumber();
updateStage();

clickReceiver.addEventListener("click", () => {
  mainCharacter.classList.add("hero-attack-animation")
  
  enemyHp = enemyHp - dmg;
  enemyHp = Math.max(0,enemyHp);
  if (enemyHp <= 0){
    enemyWave = enemyWave + 1;
    enemyHp = enemyMaxHp;
    if (enemyWave > maxEnemyWave) {
      enemyWave = 1;
      stage ++;
      enemyMaxHp = Math.floor(baseHP * (Math.pow(hpGrowth, stage - 1)));
      enemyHp = enemyMaxHp;
    }
  }
  
  updateHpStatus();
  updateWaveNumber();
  updateStage();
}) 

mainCharacter.addEventListener("animationend", () => {
  mainCharacter.classList.remove("hero-attack-animation");
  
}) 

function updateHpStatus() {
  const percent = (enemyHp/ enemyMaxHp) *  100;
  hpStatus.style.width = percent + "%"
  hpNumber.textContent = enemyHp;
}
function updateWaveNumber() {
  enemyWaveNumber.textContent = "Przeciwnik " + enemyWave + " / " + maxEnemyWave;
}
function updateStage() {
  stageNumber.textContent = "Stage " + stage;
}