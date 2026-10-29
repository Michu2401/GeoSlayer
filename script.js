const clickReceiver = document.querySelector(".arena")

const ludzik = document.querySelector(".hero")


clickReceiver.addEventListener("click", () => {
  ludzik.classList.add("hero-attack-animation")
  
}) 


ludzik.addEventListener("animationend", () => {
  ludzik.classList.remove("hero-attack-animation") 
  
}) 