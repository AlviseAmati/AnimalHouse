    const server = "http://localhost:8081"
    const clientCardContainer = document.getElementById("clientCardContainer");

    function createClientCard(user){
        const quizGameBestResult = user.quizGameBestResult.toString();
        const memoryGameBestResult = user.memoryGameBestResult.toString();

        let htmlString = 
        
        `<div class= 'card'>
            <div class='clientData'>
            
               <p> Username: <b>` + user.username + `</b></p>
               <p> Email: <b>` + user.email + `</b></p>
            </div>
            <div class='clientFavouriteAnimals'>
            <p>Preferenze Animali:</p>
                <ul>
                    <li>` + user.favouriteAnimals[0] + `</li>
                    <li>` + user.favouriteAnimals[1] + `</li>
                    <li>` + user.favouriteAnimals[2] + `</li>
                </ul>
            </div>
            <div class='clientBestGameResults'>
                <tr>
                    <td> Miglior punteggio Memory: </td>
                    <td><b>` + memoryGameBestResult + `</b></td>
                </tr> <br>
                <tr>
                    <td> Miglior punteggio Quiz: </td>
                    <td><b>` + quizGameBestResult+ `</b></td>
                </tr>
            </div>
        </div> <br>`

        return htmlString
    }


    let userId;
    const btnsActionsOnClient = document.getElementById("btnsActionsOnClient")
    const btnModifyClientPassword = document.getElementById("btnModifyClientPassword")
    const btnRestoreClientPassword = document.getElementById("btnRestoreClientPassword")
    const btnDeleteClientAccount = document.getElementById("btnDeleteClientAccount")
    const backBtn = document.getElementById("backBtn")

    const clientResearchButton = document.getElementById("clientResearchButton")
    clientResearchButton.addEventListener("click",  function(){
        console.log("clientResearchForm submitted")
        userId = document.getElementById("clientIdTextbox").value
        const address = server + "/getUser/?" + new URLSearchParams({
            id: userId
        })
        fetch(address, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            console.log();
            document.getElementById("clientCardContainer").innerHTML = createClientCard(data)
            btnsActionsOnClient.style.visibility = "visible";
            backBtn.style.visibility = "visible";

        })
    })

    function endWithThatClient(){
        btnsActionsOnClient.style.visibility = "hidden";
        backBtn.style.visibility = "hidden";
        document.getElementById("clientCardContainer").innerHTML = "";
    }

    backBtn.addEventListener("click", function(){
        console.log("backBtn clicked")
        endWithThatClient()
    })

    btnDeleteClientAccount.addEventListener("click", function(){
        console.log("btnDeleteClient clicked")
        console.log("userId: "+userId )    
        const address = server + "/deleteUser/?" + new URLSearchParams({
            id: userId
        })
        fetch(address, {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((res) => {
            console.log("btnDeleteClient cliecked - then");
            endWithThatClient()
            }
        )
    })

    const btnExitPasswordModificationPopup = document.getElementById("btnExitPasswordModificationPopup")
    const popupPasswordModificationContainer = document.getElementById("popupPasswordModificationContainer")
    const btnNewPasswordDeliver = document.getElementById("btnNewPasswordDeliver")


    btnModifyClientPassword.addEventListener("click", function(){
        console.log("btnModifyClientPassword clicked")
        popupPasswordModificationContainer.classList.add("show")
    })


    btnExitPasswordModificationPopup.addEventListener("click", function(){
        console.log("btnExitPasswordModificationPopup clicked")
        popupPasswordModificationContainer.classList.remove("show")
    })


    btnNewPasswordDeliver.addEventListener("click", function(){
        console.log("btnNewPasswordDeliver clicked")
        const newPassword = document.getElementById("textBoxNewPassword").value 
        const address = server + "/modifyPassword"
        fetch(address, {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                        id: userId,
                        password: newPassword 
                    })
        })
        .then((res) => {
            console.log(res)
            endWithThatClient()
            popupPasswordModificationContainer.classList.remove("show")
        })
    })

    btnRestoreClientPassword.addEventListener("click", function(){
        console.log("btnRestorePasswordConfirmation clicked")
        const address = server + "/restorePassword"
        fetch(address, {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                        id: userId 
                    })
        })
        .then((res) => {
            console.log(res)
            endWithThatClient()
        })    
    })









