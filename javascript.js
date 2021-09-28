// ***************** VARIÁVEIS ***************//


const containerPlay = document.querySelector("#containerPlay")
const torre2Play = document.querySelector("#torre2Play")
const containerRegras = document.querySelector("#regras")
const containerJogada = document.querySelector("#containerJogada")
const containerResultado = document.querySelector("#containerResultado")
const escolha = document.querySelector("#escolha")

// ***************** PLAY BUTTON ***************//


// Escolha da dificuldade
torre2Play.addEventListener("click", dificuldade)

function dificuldade (e) {

   escolha.style.display = "flex"


}
