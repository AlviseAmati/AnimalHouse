var purchasedItems = [];
var totalPrice = 0;

function loadItems(){
    purchasedItems = JSON.parse(localStorage.getItem("purchasedItems"));
    console.log(purchasedItems);
    for(item of purchasedItems){
        item.name = item.name.replace(/\s+/g, '');
        document.querySelector(".CartContainer").innerHTML += `
            <div class="Cart-Items" id="cart${item.name}">
                <div class="about">
                    <h1 class="title">${item.name}</h1>
                </div>
                <div class="counter">
                    <div class="btn" onclick="addItem('${item.name}')">+</div>
                    <div class="count" id="${item.name}">1</div>
                    <div class="btn" onclick="removeItem('${item.name}')">-</div>
                </div>
                <div class="prices">
                    <div class="amount" id="amount${item.name}">${item.price} $</div>
                    <div class="remove" onclick="remove('${item.name}')"><u>Remove</u></div>
                </div>
            </div>
        `
        totalPrice += item.price; 
    }
    document.querySelector(".CartContainer").innerHTML += `
        <hr> 
   	    <div class="checkout">
   	    <div class="total">
   	 	    <div>
   	 		    <div class="Subtotal">Sub-Total</div>
   	 		    <div class="items">${purchasedItems.length} items</div>
   	 	    </div>
   	 	<div class="total-amount">${totalPrice} $</div>
   	    </div>
   	    <button onclick="Redirect()" class="button">Checkout</button></div>
    `
}

function Redirect() {
    window.location.href = "../Logged/logged.html";
}

function addItem(name){
    console.log(document.querySelector("#"+ name).innerHTML);
    document.querySelector("#"+ name).innerHTML = parseInt(document.querySelector("#"+ name).innerHTML) + 1;
    totalPrice += parseInt(document.querySelector("#amount"+ name).innerHTML);
    document.querySelector(".total-amount").innerHTML = totalPrice + "$";

}

function removeItem(name){
    if(document.querySelector("#"+ name).innerHTML != 0){
        document.querySelector("#"+ name).innerHTML = parseInt(document.querySelector("#"+ name).innerHTML) - 1;
        totalPrice -= parseInt(document.querySelector("#amount"+ name).innerHTML);
        document.querySelector(".total-amount").innerHTML = totalPrice + "$";
    }   
}

function remove(name){
    totalPrice -= parseInt(document.querySelector("#amount"+ name).innerHTML) * parseInt(document.querySelector("#"+ name).innerHTML);
    document.querySelector(".total-amount").innerHTML = totalPrice + "$";
    const elementToRemove = document.querySelector("#cart"+name);
    elementToRemove.parentElement.removeChild(elementToRemove);
    document.querySelector(".items").innerHTML = parseInt(document.querySelector(".items").innerHTML) - 1 + " items"
}
