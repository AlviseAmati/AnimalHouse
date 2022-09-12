async function getData(){
    var response0 = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand"); //richesta api
    var data0 = await response0.json(); // risposta api
    if(response0.status == 200){
        document.querySelector("body > img").src = data0.image_link;
        document.querySelector("#name1").innerHTML = data0.name;
        document.querySelector("#latinName").innerHTML = data0.latin_name;
        document.querySelector("#type").innerHTML = data0.animal_type;
        document.querySelector("#lengthMax").innerHTML = data0.length_max;
        document.querySelector("#weightMax").innerHTML = data0.weight_max;
        document.querySelector("#diet").innerHTML = data0.diet;
        document.querySelector("#geo").innerHTML = data0.geo_range;
    }
}