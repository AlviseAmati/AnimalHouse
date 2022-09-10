function saveNickname(){
    if(document.getElementById("nickname").value){
        window.localStorage.removeItem('username'); //per evitare problemi nel caso rimanesse in memoria dopo essersi sloggato.
        window.localStorage.setItem('name', document.getElementById("nickname").value);
        window.location.href='../GamePage/GamePage.html'; 
        window.localStorage.setItem('scoreQuiz',0);
        window.localStorage.setItem('scoreMemory',0);
        window.localStorage.setItem('scoreCuriosity',0);
    }
    

    
}
