async function getLeaderboards(){
    var response = await fetch("http://127.0.0.1:8081/getLeaderboards",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		    method: "GET",
		    headers:{
			    "Content-type":"application/json"
		    }
	    })
        if(response.status == 200){
            console.log("LEADERBOARDS OTTENUTE CORRETTAMENTE");
            var data = await response.json() 
            for(value of data.quiz){
                document.querySelector("#tableQuiz").innerHTML +=
                `
                <tr>
                    <td class="scoreboard"> ${value.name}  </td>
                    <td class="scoreboard-score">${value.score}</td>
                </tr>
                `  
            }
            for(value of data.memory){
                document.querySelector("#tableMemory").innerHTML +=
                `
                <tr>
                    <td class="scoreboard">${value.name} </td>
                    <td class="scoreboard-score">${value.score}</td>
                </tr>
                `     
            } 
        }else{
            console.log(response.status)
        }
}