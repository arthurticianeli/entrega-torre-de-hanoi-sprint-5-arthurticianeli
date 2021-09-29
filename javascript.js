
// Escolha da dificuldade3
/*torre2Play.addEventListener("click", dificuldade)

function dificuldade (e) {

   escolha.style.display = "flex"
}*/

const jogada = document.querySelector('#containerJogada')

let nivelDificuldade = ''

// essa função gera as torres e discos no HTML via DOM
// o parametro N é passado pela função mostrarJogada, onde o usuário escolha o nível de dificuldade
function geracaoTorreHanoi(n){

    // esse laço cria as 3 torres
    for(let i=0; i<3; i++){
        const torresJogo = document.createElement('div')
        torresJogo.id = `torre${i+1}`
        jogada.appendChild(torresJogo)
    }
    geracaoDisco(n)
}

function geracaoDisco(n){
    const primeiraTorre = document.getElementById('torre1') // variavel encontra e armazena a primeira torre

    // cada uma das condições abaixo servem para gerar uma quantidade diferente de discos, elevando a dificuldade do jogo
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



jogada.addEventListener('click', selectTower)


let countClick = 0
let disco = ''
let torre = ''
let mudancas = 0
//console.log(qntsClicks)

const showClik = document.createElement('span')

// a função é responsável atualizar a quantidade de trocas realizadas
// precisa confirmar o local do mostrador de contagem
function atualizaClick (mudancas){

    showClik.innerText = "Quantidade de movimentos: " + mudancas

    document.querySelector("footer").appendChild(showClik)

}

function selectTower(e) {
    
    // a condição abaixo valida se o click foi realizado nas "hastes" da torre
    if(e.target.tagName === 'DIV'){

        torre = e.target.id 
        
        // valida a condição de primeiro click
        if(countClick === 0){
           
            disco = selectDisc(torre) // devolve o id do último 'filho' da torre
            
            // a condição abaixo verifica se o primeiro click foi dado numa torre vazia e caso verdadeiro ele não permite que o click avance para o segundo click
            if(disco !== null){
                countClick++ // incremento para validação do segundo click
            }
            
            // se disco null então countclick igual a zero
    
        } else if(countClick === 1){

       
            changeTower(torre,disco) // chama a função que irá movimentar os discos
            countClick = 0 // zera o incremento, voltando a ser o 'primero click'


        }

        win()
    }

    // ao fim de cada jogada, a função verifica se há a condição de vitória
    //win()
}

// função dedicada a troca dos discos entre as torres
function changeTower(tower, disc){

    const tagTower = document.getElementById(tower) // traz o elemento html específico que irá receber o disco
    const tagDisc = document.getElementById(disc) // traz o elemento html específico que será movimentado

    const DiscTowerChange = document.getElementById(selectDisc(tower)) // busca na torre do 'segundo click' o ultimo elemento para validação da regra de negócio


    // *** validação das regras de negócio ***

    // a condição abaixo verifica se a torre do segundo clique é vazia e permite a troca
    if(selectDisc(tower) === null){

        tagTower.appendChild(tagDisc)

        mudancas++ //#Bonus = implenta a contagem de clicks no jogo. No botão reset, zerar a contagem.
        
        atualizaClick(mudancas) // chama a função que exibe na tela a contagem das trocas

    // a condição abaixo compara os tamanhos do ultimo filho de cada torre e é executada quando o disco do primero click por menor que o disco existe na torre do segundo click
    }else if(tagDisc.clientWidth < DiscTowerChange.clientWidth){

        tagTower.appendChild(tagDisc)

        mudancas++ //#Bonus = implenta a contagem de clicks no jogo. No botão reset, zerar a contagem.
        

        atualizaClick(mudancas) // chama a função que exibe na tela a contagem das trocas
    }

}

// função dedicada a retornar o ID do ultimo filho da torre clicada
function selectDisc(id){
    const torreClicada = document.querySelector(`#${id}`)
    const disco = torreClicada.lastElementChild

    // caso a torre clicada não tenha discos, ele retorna null
    if(disco === null){
        return disco
    }

    return disco.id

}




// ***************** VARIÁVEIS ***************//

const containerPlay = document.querySelector("#containerPlay")
const torre2Play = document.querySelector("#torre2Play")
const containerRegras = document.querySelector("#regras")
const containerJogada = document.querySelector("#containerJogada")
const containerResultado = document.querySelector("#containerResultado")
const escolha = document.querySelector("#escolha")
const rodape = document.querySelector("footer")


const jogarNovamente = document.querySelector("#jogarNovamente")
const escolher = document.querySelector("#escolherDificuldade")
const fechar = document.querySelector("#regras span")


// ***************** PLAY BUTTON ***************//

// Escolha da dificuldade
torre2Play.addEventListener("click", dificuldade)

function dificuldade (e) {
    
    escolha.style.display = "flex"

    //console.log(e.target)

//  CHAMAR FUNÇÃO QUE CRIA OS DISCOS
    
}

// ***************** ESCOLHAS ***************//

escolha.addEventListener("click", mostrarJogada)


function mostrarJogada (e){

    escolha.style.display = "none"
    containerPlay.style.display = "none"
    containerJogada.style.display = "flex"
    containerRegras.style.display = "flex"

    nivelDificuldade = e.target.id

    return geracaoTorreHanoi(nivelDificuldade)


}

// ***************** FECHAR REGRAS ***************//

fechar.addEventListener("click", close)

function close() {
     containerRegras.style.display = "none"

}


// ***************** CONDIÇÃO DE VITÓRIA ***************//

function win(){
    const torre1 = document.querySelector("#torre1")
    const torre2 = document.querySelector("#torre2")

    if (torre1.childElementCount === 0 && torre2.childElementCount === 0) {
        containerResultado.style.display = "flex"
    }
}

// ***************** JOGAR DE NOVO ***************//

jogarNovamente.addEventListener("click", reset) // construtor da torre

function reset() {

    const torre3 = document.querySelector("#torre3")

    torre3.innerHTML = ""
    rodape.innerHTML = ""
    mudancas = 0

    geracaoDisco(nivelDificuldade)

    containerResultado.style.display = "none"

}


// ***************** ESCOLHER DIFICULDADE ***************//

escolher.addEventListener("click", escolherDificuldade)

function escolherDificuldade() {
    const torre3 = document.querySelector("#torre3")

    torre3.innerHTML = ""
    rodape.innerHTML = ""
    mudancas = 0
    containerJogada.innerHTML = ''

    containerResultado.style.display = "none"
    containerJogada.style.display= "none"
    containerPlay.style.display = "flex"

}


