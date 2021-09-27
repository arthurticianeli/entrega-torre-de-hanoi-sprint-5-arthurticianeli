
const jogada = document.querySelector('#containerJogada')

jogada.addEventListener('click', selectTower)

let countClick = 0
let disco = ''
let torre = ''

function selectTower(e) {
    
    torre = e.target.id
    //torre = e.target
    console.log(torre)

    if(countClick === 0){
        disco = selectDisc(torre)
        //disco = torre.lastElementChild
        console.log(disco)
        countClick++
        console.log(countClick)

    }else if(countClick === 1){

        //torre.appendChild(disco)
        //console.log(torre, disco)
        changeTower(torre,disco)
        countClick = 0

    }
}


function changeTower(tower, disc){

    document.getElementById(tower).appendChild(document.getElementById(disc))

}

function selectDisc(id){
    const torre2 = document.querySelector(`#${id}`)
    const disco = torre2.lastElementChild

    return disco.id
}
