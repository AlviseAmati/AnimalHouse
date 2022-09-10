var purchasedItems = [];
var count =0;
var data;




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
		console.log(data.items)
		for(item of data.items){
        item.name = item.name.replace(/\s+/g, '');
        const price = parseInt(item.price);
        document.querySelector(".row").innerHTML += `
        <div class="form-group col-lg-4 col-md-4 col-sm-4 cardTotal">
        <div class="card">
          <img src="${item.img}"  class="card__img"> 
          <div class="card__data">
            <h1 class="card__title">${item.name}</h1>
            <span class="card__preci">$${item.price}</span>
            <p class="card__description">${item.description}</p>
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
              </div>
          
            </div>
          </div>
            `
        }
    }
}
