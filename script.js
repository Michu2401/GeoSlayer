// Przejscie na obiekty
const config = {
  baseHP: 80,
  heroBaseHp: 10,
  hpGrowth: 1.15,
  cooldownTime: 500,
  enemyCooldownTime: 1000,
  maxEnemyWave: 5,
  dmg: 30,
  enemyBaseDmg: 1,
  enemyGrowthDmg: 1.15,
  heroRespawnTime: 400,
};
const state = {
  enemyNumber: 1,
  stage: 1,
  enemyHp: config.baseHP,
  enemyMaxHp: config.baseHP,
  enemyDmg: config.enemyBaseDmg,
  heroHp: config.heroBaseHp,
  heroMaxHp: config.heroBaseHp,
  isCoolingDown: false,
  isDefeated: false,
  dontShowAgain: false,
};
const ui = {
  clickReceiver: document.querySelector(".arena"),
  hero: document.querySelector(".hero"),
  hpStatus: document.querySelector(".hp-status"),
  hpNumber: document.querySelector(".hp-number"),
  enemyWaveNumber: document.querySelector(".enemy-wave"),
  enemy: document.querySelector(".enemy"),
  stageNumber: document.querySelector(".enemy-stage"),
  heroHpStatus: document.querySelector(".hero-hp .hp-status"),
  heroHpNumber: document.querySelector(".hero-hp .hp-number"),
  okButton: document.querySelector(".komunikat-ok"),
  check: document.querySelector(".komunikat-check"),
  komunikat: document.querySelector(".komunikat")
};
// Start Gry
updateHpStatus();
updateWaveNumber();
updateStage();
updateHeroHp();
setInterval(enemyAttack, config.enemyCooldownTime)

ui.clickReceiver.addEventListener("click", () => {
  if (state.isCoolingDown || state.isDefeated) {
    return;
  }
  ui.hero.classList.add("hero-attack-animation");
  ui.enemy.classList.add("enemy-hit");
  state.enemyHp = state.enemyHp - config.dmg;
  state.enemyHp = Math.max(0, state.enemyHp);
  showDmg(config.dmg);
  updateHpStatus();

  if (state.enemyHp <= 0) {
    ui.enemy.classList.add("enemy-defeated");
    state.isCoolingDown = true;

    setTimeout(() => {
      nextEnemy();
      state.isCoolingDown = false;
    }, config.cooldownTime);
  }
});

ui.hero.addEventListener("animationend", (event) => {
  if (event.animationName === "hero-attack") {
    ui.hero.classList.remove("hero-attack-animation");
    ui.enemy.classList.remove("enemy-hit");
  }

  if (event.animationName === "hero-exit") {
    if (state.dontShowAgain) {
      setTimeout(respawnHero, config.heroRespawnTime);
    } else {
      ui.komunikat.classList.remove("komunikat-hidden");
    }
  }

  if (event.animationName === "hero-return") {
    ui.hero.classList.remove("hero-return");
    state.isDefeated = false;
  }
});

ui.okButton.addEventListener("click", () => {
  state.dontShowAgain = ui.check.checked;
  ui.komunikat.classList.add("komunikat-hidden")
  respawnHero();
})

function updateHpStatus() {
  drawBar(ui.hpStatus, ui.hpNumber, state.enemyHp, state.enemyMaxHp);
}
function updateHeroHp() {
  drawBar(ui.heroHpStatus, ui.heroHpNumber, state.heroHp, state.heroMaxHp);
}
function nextEnemy() {
  ui.enemy.classList.remove("enemy-defeated");
  state.enemyNumber = state.enemyNumber + 1;
  state.enemyHp = state.enemyMaxHp;
  if (state.enemyNumber > config.maxEnemyWave) {
    state.enemyNumber = 1;
    state.stage++;
    state.enemyMaxHp = calcEnemyMaxHp(state.stage);
    state.enemyHp = state.enemyMaxHp;
    state.enemyDmg = roundTo2(calcEnemyDmg(state.stage));
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

function calcEnemyMaxHp(stage) {
  return Math.floor(config.baseHP * Math.pow(config.hpGrowth, stage - 1));
}

function calcEnemyDmg(stage) {
  return roundTo2(config.enemyBaseDmg * Math.pow(config.enemyGrowthDmg, stage - 1));
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

function enemyAttack() {
  if (state.isCoolingDown || state.isDefeated) { return; }
  state.heroHp = roundTo2(state.heroHp - state.enemyDmg);
  state.heroHp = Math.max(0, state.heroHp);
  updateHeroHp();
  if (state.heroHp <= 0) {
  heroDefeated();
}
}

function drawBar(fillEl, textEl, current, max) {
  const percent = (current / max) * 100;
  fillEl.style.width = percent + "%";
  textEl.textContent = current;
}

function roundTo2(value) {
  return Math.round(value*100) / 100;
}

function resetStage(){
  state.enemyNumber = 1;
  state.enemyMaxHp = calcEnemyMaxHp(state.stage)
  state.enemyHp = state.enemyMaxHp;
  state.heroHp = state.heroMaxHp;
  ui.enemy.classList.remove("enemy-hit");
  ui.enemy.classList.remove("enemy-defeated");
  updateHeroHp();
  updateHpStatus();
  updateWaveNumber();
}

function heroDefeated() {
  state.isDefeated = true;
  ui.hero.classList.remove("hero-attack-animation");
  ui.hero.classList.add("hero-exit");
}

function respawnHero() {
  ui.hero.classList.remove("hero-exit");
  ui.hero.classList.add("hero-return");
  resetStage();
}