//dischiarazione variabili
let data;   
const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timerId;
var score = 0;
function flipCard({target: clickedCard}) { //gira e prende valore carta (come parametro hai  html della carta cliccata)
    if(cardOne !== clickedCard && !disableDeck) {//secarta e 1 e carta 2 sono uguali o diversi torno vuoto e si gira
        clickedCard.classList.add("flip");
        if(!cardOne) { //se carta 1 non e nulla fa
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;// secondo giro di ciclo passa qua
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src, //prende le immagini della prima e seconda carta e le passa amtch cards
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) { // verifica che le 2 carte siano giuste
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            if(parseInt(document.getElementById("counter").innerHTML) > score){
               score = parseInt(document.getElementById("counter").innerHTML);
            }
            document.getElementById("counter").innerHTML = "HAI VINTO!";
		    clearInterval(startTimer);
        }
        cardOne.removeEventListener("click", flipCard); //rimuovi gli event aggiunti se no se clicchi ripartono
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => { // shake 400 ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [0,1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; // crea arrey numeri 2  da 7 perche clicchi 2 carte
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //mischia l'array sopra sposta i vari indici avanti o dietro in base al math .random
    cards.forEach((card, i) => { //foreach su tutto oggetti con classe carta in html
        card.classList.remove("flip"); //gira tutte le carte con classe flip
        card.querySelector(".back-view img").src = data[arr[i]].image_link;
        card.addEventListener("click", flipCard); //ogni click fa funzione flip card
    });
    clearInterval(timerId);
    setTimer();
}

    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


async function requestImage(){ //genera e prende da api immagine carte
    
    var response0 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data0 = await response0.json();
    var response1 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data1 = await response1.json();
    var response2 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data2 = await response2.json();
    var response3 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data3 = await response3.json();
    var response4 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data4 = await response4.json();
    var response5 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data5 = await response5.json();
    var response6 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data6 = await response6.json();
    var response7 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data7 = await response7.json();
    
    
    
    data = [data0,data1,data2,data3,data4,data5,data6,data7];
    shuffleCard(); // funzione carte
}

function setTimer(){
	document.getElementById("counter").innerHTML = 60;
	timerId = setInterval(startTimer,1000); //start timer una voplta ogni secondo
}

function startTimer(){
	if(parseInt(document.getElementById("counter").innerHTML) > 0){
		document.getElementById("counter").innerHTML = parseInt(document.getElementById("counter").innerHTML) - 1; // finche counter maggiore 60 decremente 1 al secondo
	}else if(parseInt(document.getElementById("counter").innerHTML) == 0){
		document.getElementById("counter").innerHTML = "HAI PERSO!";
		clearInterval(timerId);
        cards.forEach(card => {
            card.removeEventListener("click", flipCard);
        });
	}
}

document.addEventListener('visibilitychange', function(event) {
    event.preventDefault()
    if (document.visibilityState == 'hidden') { 
        closingCode()
    }
});

async function closingCode(event){ //passi a server nome score e gioco 
    if(score != 0){
        var response = await fetch("http://127.0.0.1:8081/addScore",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    value:{
                        name: window.localStorage.getItem('name'),
                        score: score,
                        type: "memory"
                    }
                }
            )
        })
        if(response.status == 200){
            console.log("DATI AGGIUNTI");
        }else{
            console.log(response.status)
        }
        if(window.localStorage.getItem('username') != null){//se player loggato
            var response = await fetch("http://127.0.0.1:8081/addBestMemoryResult",{
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(
                    {
                        user:{
                            result: score,
                            username: window.localStorage.getItem('username')
                        }
                    }
                )
            })
            if(response.status == 200){
                console.log("DATI AGGIUNTI");
            }else{
                console.log(response.status)
            }
        }     
    }
}

