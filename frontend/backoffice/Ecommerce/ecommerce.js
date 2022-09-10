async function loadItems(){
    var response = await fetch("http://127.0.0.1:8081/loadEcommerce",{
		method: "GET",
		headers:{
			"Content-type":"application/json"
		}
	})
	if(response.status == 200){
		console.log("DATI CARICATI CORRETTAMENTE")
		var data = await response.json() // await del json
		for(item of data.items){
            const price = parseInt(item.price)
            document.querySelector(".EditCards").innerHTML += `
			<tr id="${item.name}">
				<td class="row" > ${item.name}  </td>
				<td class="row">${item.price}</td>
				<td class="row">${item.description}</td>
				<td class="row">${item.category}</td>
				<td class="row"><button onclick="removeItem('${item.name}')"> Remove Item </button></td>
			</tr>
            `
			
       
		}
		

		
	}else{
		console.log(response.status)
	}
}

async function addItem(){
    if(document.querySelector("#name").value != null && document.querySelector("#description").value != null && document.querySelector("#price").value != null && document.querySelector("#image").value != null){
        var response = await fetch("http://127.0.0.1:8081/addItem",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		    method: "POST",
		    headers:{
			    "Content-type":"application/json"
		    },
		    body: JSON.stringify(
			    {
				    item:{
					    name: document.querySelector("#name").value,
					    description: document.querySelector("#description").value,
                        price: document.querySelector("#price").value,
                        image: document.querySelector("#image").value,
						category: document.querySelector("#category").value
				    }
			    }
		    )
	    })
        if(response.status == 200){
            console.log("ITEM  OTTENUTO CORRETTAMENTE");
			document.querySelector(".cards").innerHTML += `
              <div class="card__data" id="${document.querySelector("#name").value}">
                <div class="card__title">${document.querySelector("#name").value}</div>
                <div class="card__price">$${document.querySelector("#price").value}</div>
                <div class="card__description">${document.querySelector("#description").value}</div>
				<div class="card__category">${document.querySelector("#category").value}</div>
                <button onclick="removeItem('${document.querySelector("#name").value}')"> Remove Item </button>
              </div>
            `       
			cleanLabel();
        }else{
            console.log(response.status)
        }
    }else{
        console.log("riempire i campi");
    }
	
}

async function removeItem(itemName){
	console.log("rimozione");
	var response = await fetch("http://127.0.0.1:8081/removeItem",{ // await fetch aspetta che risponda server e struttura della chiamata che arriva al server
		    method: "DELETE",
		    headers:{
			    "Content-type":"application/json"
		    },
		    body: JSON.stringify(
			    {
				    name: itemName
				}
		    )
	    })
        if(response.status == 200){
            console.log("ITEM  ELIMINATO CORRETTAMENTE");
			const elementToRemove = document.querySelector("#"+itemName);
    		elementToRemove.parentElement.removeChild(elementToRemove); 

        }else{
            console.log(response.status)
        }
}


function cleanLabel(){
	document.querySelector("#name").value = '';
	document.querySelector("#description").value = '';
    document.querySelector("#image").value = '';
	document.querySelector("#price").value = '';
}