function infoDisplay(){
    var username= window.localStorage.getItem('username');
    console.log("username");
    var text = '<p>Benvenuto in AnimalHouse, '+username+' da qui puoi effettuare e visualizzare i tuoi servizi</p>';
    document.getElementById("text").innerHTML+= text;
}