const server = "http://localhost:8081"

const formClientCreation = document.getElementById("formClientCreation");
const inputEmail = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const inputUsername = document.getElementById("inputUsername");
const btnProva = document.getElementById("prova");

let emailIN
let usernameIN
let passwordIN

function checkInputs(){
	emailIN = inputEmail.value.trim()
	passwordIN = inputPassword.value.trim()
	usernameIN = inputUsername.value.trim()

	console.log("email: " + emailIN)
	console.log("password: " + passwordIN)
	console.log("username: " + usernameIN)
	
	if(emailIN === ""){
		setErrorFor(inputEmail, "campo obbligatorio")
		emailOK = false
	} else {
		setSuccessFor(inputEmail)
		emailOK = true	
	}
	if(usernameIN === ""){
		setErrorFor(inputUsername, "campo obbligatorio")
		usernameOK = false
	} else {
		setSuccessFor(inputUsername)
		usernameOK = true
	}
	if(passwordIN === ""){
		setErrorFor(inputPassword, "campo obbligatorio")
		passwordOK = false
	} else {
		passwordOK = true
		setSuccessFor(inputPassword)
	}

	let inputsOK = emailOK && passwordOK && usernameOK
	console.log(inputsOK)
	return inputsOK
}


function setErrorFor(input, message){
	const formControl = input.parentElement
	const small = formControl.querySelector("small")
	small.innerText = message
}

function setSuccessFor(input, message){
	const formControl = input.parentElement
	const small = formControl.querySelector("small")
	small.innerText = ""
}

btnProva.addEventListener("click",  async function(){
	console.log("prova clicked")
	let errorNotificator = document.getElementById("errorNotificator")
    errorNotificator.innerText = ""
	inputsOK = checkInputs()
	console.log("inputsOK " + inputsOK)
	if(inputsOK){
		console.log("inputsOK")
		var response = await fetch("http://127.0.0.1:8081/addUser",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
                email: emailIN,
                password: passwordIN,
                username:  usernameIN 
            })
        })
        .then((res) => {
            console.log(res)
            if(res.status == 400){
            	errorNotificator = document.getElementById("errorNotificator")
            	errorNotificator.innerText = "Il cliente e' gia' registrato"
            }
        })
	}
})

