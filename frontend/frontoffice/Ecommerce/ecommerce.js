var purchasedItems = [];
var count =0;
var data;

//dove ci sono i console log andrebbe aggiunta una label in cui dice quello
function buy(name,price){
    var alreadyAdded = false;
    for(item of purchasedItems){
        if(item.name == name){
            console.log("item already added at the shopping cart");
            alreadyAdded = true;
        }
    }
    if(!alreadyAdded){
        var item = {name: name, price: price};
        console.log(item);
        purchasedItems.push(item);
        console.log("item aggiunto al carrello");
        count ++;
        document.getElementById("itemAdded").innerHTML=count;
    }
}

function purchase(){
    if(purchasedItems.length != 0){
        localStorage.setItem("purchasedItems",JSON.stringify(purchasedItems));
        window.location.href='../Shoppingcart/shoppingcart.html';
    }
}

async function loadItems(){
    var response = await fetch("http://127.0.0.1:8081/loadEcommerce",{
		method: "GET",
		headers:{
			"Content-type":"application/json"
		}
	})
	if(response.status == 200){
		console.log("DATI CARICATI CORRETTAMENTE")
		data = await response.json() // await del json
		for(item of data.items){
        console.log(item.name);
        const price = parseInt(item.price);
        document.querySelector(".row").innerHTML += `
        <div class="form-group col-lg-4 col-md-4 col-sm-4 cardTotal" >
          <div class="card">
            <img src="${item.img}"  class="card__img"> 
        
          
            <div class="card__data">
              <h1 class="card__title">${item.name}</h1>
              <span class="card__preci">$${item.price}</span>
              <p class="card__description">${item.description}</p>
              <a href="#" class="card__button" onclick="buy('${item.name}',${price})">Buy</a>
            </div>
        
          </div>
        </div>
        `
    }

		
	}else{
		console.log(response.status)
	}
}

function getItems(category){
    console.log(category);
    document.querySelector(".row").innerHTML = '';
    for(item of data.items){
        if(item.category == category){
            const price = parseInt(item.price)
            document.querySelector(".row").innerHTML += `
            <div class="form-group col-lg-4 col-md-4 col-sm-4 cardTotal" >
            <div class="card">
              <img src="${item.img}"  class="card__img"> 
          
            
              <div class="card__data">
                <h1 class="card__title">${item.name}</h1>
                <span class="card__preci">$${item.price}</span>
                <p class="card__description">${item.description}</p>
                <a href="#" class="card__button" onclick="buy('${item.name}',${price})">Buy</a>
              </div>
          
            </div>
          </div>
            `
        }
    }
}
