async function addFavouriteAnimals(){
    if(document.querySelector(".f1").value != '' && document.querySelector(".f2").value != '' && document.querySelector(".f3").value != ''){
        var response = await fetch("http://127.0.0.1:8081/addFavouriteAnimals",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    user:{
                        a1: document.querySelector(".f1").value,
                        a2: document.querySelector(".f2").value,
                        a3: document.querySelector(".f3").value,
                        username: window.localStorage.getItem('username')
                    }
                }
            )
        })
        if(response.status == 200){
            document.getElementById("message").innerHTML = "Operazione eseguita con successo";
        }
    }else{
        document.getElementById("message").innerHTML = "Form non completo";
    }
}

