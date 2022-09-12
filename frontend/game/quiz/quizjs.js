let data;
var score = 0;

async function getData(){
    
    var response0 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data0 = await response0.json();
    var response1 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data1 = await response1.json();
    var response2 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data2 = await response2.json();
    var response3 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand");
    var data3 = await response3.json();
    data = [data0,data1,data2,data3]
    if(response0.status == 200 && response1.status == 200 && response2.status == 200 && response3.status == 200){
        document.querySelector("body > img").src = data0.image_link;
        var random = Math.floor(Math.random() * (3 - 0 + 1) ) + 0; //per posiizonarli in ordine casulae fa random da 0 a 4
        for(var i = 0; i < 4; i++){
            document.querySelector("#label" + random + "").innerHTML = data[i].name;
            document.querySelector("#answer" + random + "").value = data[i].name;
            if(random == 3){
                random = 0;
            }else{
                random++;
            }
        }
    }
    document.querySelector("#result").innerHTML = "";
    uncheckedRadioButtons();
}

function getResult(){ //verifica se risposta e giusta o sbaglaita
    for(radioButton of document.querySelectorAll("input")){
        if(radioButton.checked){
            if(radioButton.value == (data[0].name)){ //controllo nome del primo se sono uguali
                document.querySelector("#result").innerHTML = "RISPOSTA CORRETTA";
                score++;
            }else{
                document.querySelector("#result").innerHTML = "RISPOSTA SBAGLIATA";
            }
        }
    }
}

function uncheckedRadioButtons(){ // svuota radiobutton
    for(radioButton of document.querySelectorAll("input")){
        if(radioButton.checked){
            radioButton.checked = false;
        }
    }
}
    

document.addEventListener('visibilitychange', function(event) { //pezzo codice nascosto che parte quando utente esce da pagina
    event.preventDefault()
    if (document.visibilityState == 'hidden') { 
        closingCode()
    }
});

async function closingCode(){ //invia score al server
    if(score != 0){
        console.log(window.localStorage.getItem('username'));
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
                        type: "quiz"
                    }
                }
            )
        })
        if(response.status == 200){
            console.log("DATI AGGIUNTI");
        }else{
            console.log(response.status)
        }
        if(window.localStorage.getItem('username') != null){
            console.log("add quiz");
            var response = await fetch("http://127.0.0.1:8081/addBestQuizResult",{
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

        return undefined;
    }
}