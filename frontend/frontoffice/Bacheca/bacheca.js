async function getPosts(){
	console.log("richiesta posts");
	var response = await fetch("http://127.0.0.1:8081/getPosts",{ 
		    method: "GET",
		    headers:{
			    "Content-type":"application/json"
		    }
	    })
        if(response.status == 200){
            var data = await response.json();
			for(post of data.posts){
                document.querySelector(".AllPost").innerHTML += `
                <div class="singlePost" id="${post.title}">
                    <h3 class="postTitle">${post.title}</h3>
                    <img class="postImage" src="${post.image}" />
                    <p class="postText">${post.text}</p>
                    <p class="postFooter">${post.username}</p>
                </div>
                `   
            }

        }else{
            console.log(response.status)
        }
}

async function addPost(){
    console.log("text");
    if(document.querySelector(".title").value != null && document.querySelector(".textarea").value != null && document.querySelector(".link").value != null){
        var response = await fetch("http://127.0.0.1:8081/addPost",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		    method: "POST",
		    headers:{
			    "Content-type":"application/json"
		    },
		    body: JSON.stringify(
			    {
				    post:{
					    title: document.querySelector(".title").value,
					    image: document.querySelector(".link").value,
                        text: document.querySelector(".textarea").value,
                        username: window.localStorage.getItem('username')
				    }
			    }
		    )
	    })
        if(response.status == 200){
            document.getElementById("message").innerHTML = "Operazione eseguita con successo";
			document.querySelector(".AllPost").innerHTML += `
            <div class="singlePost">
                <h3 class="postTitle">${document.querySelector(".title").value}</h3>
                <img class="postImage" src="${document.querySelector(".link").value}" />
                <p class="postText">${document.querySelector(".textarea").value}</p>
                <p class="postFooter">${window.localStorage.getItem('username')}</p>
            </div>
            `   

        }else{
            console.log(response.status)
        }
    }else{
        document.getElementById("message").innerHTML = "Form non completo";
    }
	cleanLabel();
}


function cleanLabel(){
	document.querySelector("#title").value = '';
	document.querySelector("#link").value = '';
    document.querySelector("#textarea").value = '';
}