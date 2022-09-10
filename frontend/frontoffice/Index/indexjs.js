const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// parte login
//PRIMO LOGIN NON FUNZIONA
document.getElementById("login").addEventListener("click",async ()=>{

	var user = document.getElementById("usernameLogin").value
	var pwd = document.getElementById("passwordLogin").value

	var response = await fetch("http://127.0.0.1:8081/login",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		method: "POST",
		headers:{
			"Content-type":"application/json"
		},
		body: JSON.stringify(
			{
				user:{
					username: user,
					password: pwd
				}
			}
		)
	})
	if(response.status == 200){
		console.log("LOGIN EFFETTUATO CORRETTAMENTE")
		var data = await response.json() // await del json
		console.log(data)
		window.localStorage.setItem('username',user);
		if(data.type=="normal"){
			window.location.href="../Logged/logged.html"  //redirect
		}
		else if (data.type=="admin"){
			window.location.href="../../backoffice/Back-Office/BackOffice.html"  //redirect
		}	
	}else{
		document.getElementById("error").innerHTML = "Dati non corretti o form non completo";
	}
})

document.getElementById("register").addEventListener("click",async ()=>{

	var user = document.getElementById("usernameRegister").value
	var eml = document.getElementById("emailRegister").value
	var pwd = document.getElementById("passwordRegister").value
	if(user!="" && eml !="" && pwd !=""){
		var response = await fetch("http://127.0.0.1:8081/register",{
			method: "POST",
			headers:{
				"Content-type":"application/json"
			},
			body: JSON.stringify(
				{
					user:{
						username: user,
						email: eml,
						password: pwd
					}
				}
			)
		})
		if(response.status == 200){
			console.log("REGISTRAZIONE EFFETTUATA CORRETTAMENTE")
			window.location.href="../Logged/logged.html"  //redirect
			window.localStorage.setItem('username',user);	
		}else{
			document.getElementById("errorRegister").innerHTML = "Dati gia' utilizzati";
		}
	}else{
		document.getElementById("errorRegister").innerHTML = "Form non completo";
	}
})