var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.querySelector(".date").value = today;
document.querySelector(".date").min = today;
document.querySelector(".username").value = window.localStorage.getItem('username');
var data;

//POSSIBILITA' DI AGGIUNGERE CHE DOPO LA SCADENZA DELLA PRENOTAZIONE VENGA AUTOMATICAMENTE RIMOSSA



async function requestService(){
    if(document.querySelector(".username").value != null && verifyDisponibility()){
        var response = await fetch("http://127.0.0.1:8081/addService",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		    method: "POST",
		    headers:{
			    "Content-type":"application/json"
		    },
		    body: JSON.stringify(
			    {
				    service:{
					    username: document.querySelector(".username").value,
					    service: document.querySelector(".services").value,
                        place: document.querySelector(".places").value,
                        date: document.querySelector(".date").value
				    }
			    }
		    )
	    })
		if(response.status == 200){
			var text = '<p>SERVIZIO AGGIUNTO CORRETTAMENTE</p>';
			document.getElementById("message").innerHTML = text;
			let newService = {username: document.querySelector(".username").value,service: document.querySelector(".services").value ,place: document.querySelector(".places").value, date: document.querySelector(".date").value};
    		data.services.push(newService);
        }else{
            console.log(response.status)
        }
       
    }else{

		var textsecondario = '<p>SERVIZIO NON PRENOTABILE IN QUEL GIORNO</p>';
		document.getElementById("message").innerHTML = textsecondario;
    }
    
}

async function loadServices(){
    var response = await fetch("http://127.0.0.1:8081/getServices",{
		method: "GET",
		headers:{
			"Content-type":"application/json"
		}
	})
	if(response.status == 200){
		console.log("DATI CARICATI CORRETTAMENTE")
		data = await response.json() // await del json
		console.log(data.services)
		

		
	}else{
		console.log(response.status)
	}
}


function verifyDisponibility(){
    for(service of data.services){
		console.log(service.service + " " + document.querySelector(".services").value + " " + service.place + " " + document.querySelector(".places").value + " "  + service.date + " " + document.querySelector(".date").value)
        if(service.service == document.querySelector(".services").value && service.place == document.querySelector(".places").value && service.date == document.querySelector(".date").value){
            return false;
        }
    }
    return true;
}

function getServices(){
	document.querySelector(".ViewOfServices").innerHTML = '';
	for(service of data.services){
		if(service.username == document.querySelector(".username").value){
			document.querySelector(".ViewOfServices").innerHTML += `
			<div class="reservation">
				<div>Prenotazione</div>
				<div>${service.service}</div>
				<div>${service.place} </div>
				<div>${service.date} </div>
			</div>
			`
		}
	}
}