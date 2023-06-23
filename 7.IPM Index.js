
/* 
rooms unlock cost :


smelters unlock
free - 50K - 500K - 10M - 5B - 100B - 50T - 1q - 500q - 10Q

crafters unlock
free - 1M - 100M - 50B - 1T - 500T - 10q - 5Q - 100Q - 50S

*/

const body = document.querySelector("body")
const info = document.querySelector("#info")
const left = document.querySelector("#left")
const right = document.querySelector("#right")

const infoTitle = "Idle Planet Miner Infos" 
info.innerHTML = infoTitle

let projectPop = undefined

addLeftButton({label:"Faq",clickFunction:clickFaqs})
addLeftButton({label:"Planets",clickFunction:clickPlanets})
addLeftButton({label:"Items",clickFunction:clickItems})
addLeftButton({label:"Projects",clickFunction:clickProjects})
addLeftButton({label:"Station",clickFunction:clickStation})
addLeftButton({label:"Rooms",clickFunction:clickRooms})
addLeftButton({label:"Process",clickFunction:clickProcess})
addLeftButton({label:"Stars",clickFunction:clickStars})

window.onload = firstContact()

console.log("Last up 06/21 00:30")

let loopfork = 0

function myRound(val,multi){
    let calc = val*multi
    let res = undefined
    let calc2 = calc - (calc % 1)
    if (calc % 1 > 0.5) 
        {res = 1}
    else
        {res = 0}


    return calc + " > " + (calc2+res)
}
