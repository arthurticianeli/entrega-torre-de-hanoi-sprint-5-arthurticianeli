//*****************************************************************************/
//****************************** VARIÁVEIS GLOBAIS ****************************/ 
//*****************************************************************************/

const containerPlay = document.querySelector("#containerPlay")
const torre2Play = document.querySelector("#torre2Play")
const containerRegras = document.querySelector("#regras")
const containerJogada = document.querySelector("#containerJogada")
const containerResultado = document.querySelector("#containerResultado")
const escolha = document.querySelector("#escolha")
const footer = document.querySelector("footer")
const jogarNovamente = document.querySelector("#jogarNovamente")
const escolher = document.querySelector("#escolherDificuldade")
const fechar = document.querySelector("#regras span")
const jogada = document.querySelector('#containerJogada')
const showClick = document.createElement('span')
const resetJogada = document.createElement('span')
const voltarTelaInicial = document.createElement('span')
let nivelDificuldade = ''
let countClick = 0
let disco = ''
let torre = ''
let mudancas = 0


//*****************************************************************************/
//****************************** REGRAS DO NEGÓCIO ****************************/ 
//*****************************************************************************/


// ****************** REGRA: CRIAÇÃO DAS TORRES POR DOM  *********************//

function geracaoTorreHanoi(n){

    for(let i=0; i<3; i++){
        const torresJogo = document.createElement('div')
        torresJogo.id = `torre${i+1}`
        jogada.appendChild(torresJogo)
    }
    geracaoDisco(n)

}


// ***** REGRA: CRIAÇÃO DOS DISCOS DE ACORDO COM A DIFICULDADE ESCOLHIDA *****//

function geracaoDisco(n){

    makeFooter(mudancas)

    const primeiraTorre = document.getElementById('torre1')

    if(n === 'dificuldade1'){

        for(let i=0; i<3; i++){
            const discosDoJogo = document.createElement('div')
            discosDoJogo.id = `disco${i+1}`
            primeiraTorre.appendChild(discosDoJogo)
            discosDoJogo.classList.add('effectBackground', 'effectButton')
        }
    }else if(n === 'dificuldade2'){
        for(let i=0; i<4; i++){
            const discosDoJogo = document.createElement('div')
            discosDoJogo.id = `disco${i+1}`
            primeiraTorre.appendChild(discosDoJogo)
            discosDoJogo.classList.add('effectBackground', 'effectButton')
        }
    }else if(n === 'dificuldade3'){
        for(let i=0; i<5; i++){
            const discosDoJogo = document.createElement('div')
            discosDoJogo.id = `disco${i+1}`
            primeiraTorre.appendChild(discosDoJogo)
            discosDoJogo.classList.add('effectBackground', 'effectButton')
        }
    }
}

// ***************** REGRA: PASSA A DIFICULDADE ESCOLHIDA ******************//

function mostrarJogada (e){

    escolha.style.display = "none"
    containerPlay.style.display = "none"
    containerJogada.style.display = "flex"
    containerRegras.style.display = "flex"

    nivelDificuldade = e.target.id

    return geracaoTorreHanoi(nivelDificuldade)

}

// ** REGRA: CRIAÇÃO POR DOM DO CONTADOR DE MOVIMENTOS / RESET / ESCOLHER NOVA DIFICULDADE **//

function makeFooter(mudancas) {

    showClick.innerText = "Quantidade de movimentos: " + mudancas
    showClick.id = "contador"

    resetJogada.innerText = "Clique aqui para recomeçar"
    resetJogada.id ="resetButton"
    resetJogada.classList.add("effectButton")
    
    voltarTelaInicial.innerText = "Voltar para a tela inicial"
    voltarTelaInicial.id ="voltarTelaInicial"
    voltarTelaInicial.classList.add("effectButton")

    footer.appendChild(voltarTelaInicial)
    footer.appendChild(resetJogada)
    footer.appendChild(showClick)

}

//****************** REGRA: ATUALIZAÇÃO DO CONTADOR DE MOVIMENTOS *******************//

function atualizaClick(mudancas) {

    showClick.innerText = "Quantidade de movimentos: " + mudancas

    document.querySelector("footer").appendChild(showClick)

}

//***** REGRA: TARGET DO CLICK NA TORRE E VERIFICAÇÃO DA CONDIÇÃO DE VITÓRIA *****//

function selectTower(e) {
    
    if(e.target.tagName === 'DIV'){

        torre = e.target.id 

        if(countClick === 0){
           
            disco = selectDisc(torre) 
            
            if(disco !== null){
                countClick++
            }
    
        } else if(countClick === 1){
       
            changeTower(torre,disco)
            countClick = 0

        }

        win()
    }

}

//********************* REGRA: SELECIONAR O DISCO PELO LASTCHILD **********************//

function selectDisc(id){

    const torreClicada = document.querySelector(`#${id}`)
    const disco = torreClicada.lastElementChild

    if(disco === null){
        return disco
    }

    return disco.id

}

//************************* REGRA: MUDANÇA DOS DISCOS ****************************//

function changeTower(tower, disc){

    const tagTower = document.getElementById(tower)
    const tagDisc = document.getElementById(disc)

    const DiscTowerChange = document.getElementById(selectDisc(tower)) // busca na torre do 'segundo click' o ultimo elemento para validação da regra de negócio

    if (selectDisc(tower) === null){

        tagTower.appendChild(tagDisc)

        mudancas++ 

    } else if (tagDisc.clientWidth < DiscTowerChange.clientWidth){

        tagTower.appendChild(tagDisc)

        mudancas++
    }

    atualizaClick(mudancas)

}


// ***************** REGRA: CONDIÇÃO DE VITÓRIA ***************//

function win(){
    const torre1 = document.querySelector("#torre1")
    const torre2 = document.querySelector("#torre2")

    if (torre1.childElementCount === 0 && torre2.childElementCount === 0) {
        containerResultado.style.display = "flex"
    }
}



//*****************************************************************************************/
//************************************* LISTENERS *****************************************/ 
//*****************************************************************************************/

// ***************** LISTENER: CLICK INICIAL ***************//

torre2Play.addEventListener("click", dificuldade)


function dificuldade (e) {
    
    escolha.style.display = "flex"
     
}

// ***************** LISTENER: ESCOLHA DE DIFICULDADE ***************//

escolha.addEventListener("click", mostrarJogada)



// ***************** LISTENER: FECHAR REGRAS ***************//

fechar.addEventListener("click", close)

function close() {
     containerRegras.style.display = "none"
}

// ***************** LISTENER: JOGADA ***************//

jogada.addEventListener('click', selectTower)


//*****************************************************************************************/
//****************************************** RESETS ***************************************/ 
//*****************************************************************************************/


// ***************** RESET: RESETAR A PARTIDA ***************//

footer.addEventListener("click", resetNow)

function resetNow(e) {

    if (e.target.id === "resetButton") {

    const torre3 = document.querySelector("#torre3")

    torre1.innerHTML = ""
    torre2.innerHTML = ""
    torre3.innerHTML = ""

    footer.innerHTML = ""
    mudancas = 0

    geracaoDisco(nivelDificuldade)

    containerResultado.style.display = "none"
    }

}

// ***************** RESET: JOGAR DE NOVO A MESMA DIFICULDADE ***************//

jogarNovamente.addEventListener("click", reset)

function reset() {

    const torre3 = document.querySelector("#torre3")

    torre3.innerHTML = ""
    footer.innerHTML = ""
    mudancas = 0

    geracaoDisco(nivelDificuldade)

    containerResultado.style.display = "none"

}

// ***************** RESET: VOLTAR PARA A TELA INICIAL ***************//

voltarTelaInicial.addEventListener("click", escolherDificuldade)
escolher.addEventListener("click", escolherDificuldade)

function escolherDificuldade() {
    const torre3 = document.querySelector("#torre3")

    torre3.innerHTML = ""
    footer.innerHTML = ""
    mudancas = 0
    containerJogada.innerHTML = ''

    containerResultado.style.display = "none"
    containerJogada.style.display= "none"
    containerPlay.style.display = "flex"

}


