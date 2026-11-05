// Przejscie na obiekty
const config = {
  baseHP: 80,
  hpGrowth: 1.15,
  cooldownTime: 500,
  maxEnemyWave: 5,
  dmg: 30,
};
const state = {
  enemyNumber: 1,
  stage: 1,
  enemyHp: config.baseHP,
  enemyMaxHp: config.baseHP,
  isCoolingDown: false,
};
const ui = {
  clickReceiver: document.querySelector(".arena"),
  hero: document.querySelector(".hero"),
  hpStatus: document.querySelector(".hp-status"),
  hpNumber: document.querySelector(".hp-number"),
  enemyWaveNumber: document.querySelector(".enemy-wave"),
  enemy: document.querySelector(".enemy"),
  stageNumber: document.querySelector(".enemy-stage"),
};
// Zmienne pokazywania obrażeń
// Start Gry
updateHpStatus();
updateWaveNumber();
updateStage();

ui.clickReceiver.addEventListener("click", () => {
  ui.hero.classList.add("hero-attack-animation");
  ui.enemy.classList.add("enemy-hit");

  if (state.isCoolingDown) {
    return;
  }
  state.enemyHp = state.enemyHp - config.dmg;
  state.enemyHp = Math.max(0, state.enemyHp);
  showDmg(config.dmg);
  updateHpStatus();

  if (state.enemyHp <= 0) {
    ui.enemy.classList.add("enemy-defeted");
    state.isCoolingDown = true;

    setTimeout(() => {
      nextEnemy();
      state.isCoolingDown = false;
    }, config.cooldownTime);
  }
});

ui.hero.addEventListener("animationend", () => {
  ui.hero.classList.remove("hero-attack-animation");
  ui.enemy.classList.remove("enemy-hit");
});

function updateHpStatus() {
  const percent = (state.enemyHp / state.enemyMaxHp) * 100;
  ui.hpStatus.style.width = percent + "%";
  ui.hpNumber.textContent = state.enemyHp;
}
function nextEnemy() {
  ui.enemy.classList.remove("enemy-defeted");
  state.enemyNumber = state.enemyNumber + 1;
  state.enemyHp = state.enemyMaxHp;
  if (state.enemyNumber > config.maxEnemyWave) {
    state.enemyNumber = 1;
    state.stage++;
    state.enemyMaxHp = Math.floor(
      config.baseHP * Math.pow(config.hpGrowth, state.stage - 1),
    );
    state.enemyHp = state.enemyMaxHp;
  }

  updateHpStatus();
  updateWaveNumber();
  updateStage();
}
function updateWaveNumber() {
  ui.enemyWaveNumber.textContent =
    "Przeciwnik " + state.enemyNumber + "/" + config.maxEnemyWave;
}
function updateStage() {
  ui.stageNumber.textContent = "Stage " + state.stage;
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
  dmgNumber.style.fontSize = randomBetween(14, 22) + "px";
  document.querySelector(".arena").appendChild(dmgNumber);

  dmgNumber.addEventListener("animationend", () => {
    dmgNumber.remove();
  });
}
