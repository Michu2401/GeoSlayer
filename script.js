// Zbieranie klas do tworzenia animacji
const clickReceiver = document.querySelector(".arena")
const mainCharacter = document.querySelector(".hero")
// Zmienne potrzebne do pasku HP i DMG
let enemyHp = 100;
const dmg = 30
const enemyMaxHp = 100;
const hpStatus = document.querySelector(".hp-status");
const hpNumber = document.querySelector(".hp-number");
// Zmienne o przeciwnikach
let enemyWave = 1;
const maxEnemyWave = 5;
const enemyWaveNumber = document.querySelector(".enemy-wave")
// Start Gry
updateHpStatus();
updateWaveNumber();

clickReceiver.addEventListener("click", () => {
  mainCharacter.classList.add("hero-attack-animation")
  
  enemyHp = enemyHp - dmg;
  enemyHp = Math.max(0,enemyHp);
  if (enemyHp <= 0){
    enemyWave = enemyWave + 1;
    enemyHp = enemyMaxHp;
    if (enemyWave > maxEnemyWave) {
      enemyWave = 1;
    }
  }
  updateWaveNumber();
  updateHpStatus();
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