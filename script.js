const clickReceiver = document.querySelector(".arena")
const mainCharacter = document.querySelector(".hero")

let enemyHp = 100;
const dmg = 30
const enemyMaxHp = 100;
const hpStatus = document.querySelector(".hp-status");
const hpNumber = document.querySelector(".hp-number");

updateHpStatus();

clickReceiver.addEventListener("click", () => {
  mainCharacter.classList.add("hero-attack-animation")
  
  enemyHp = enemyHp - dmg;
  enemyHp = Math.max(0,enemyHp);
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