function getNickname(){
    if(window.localStorage.getItem('username') != null){
        window.localStorage.setItem('name', window.localStorage.getItem('username'));
    }
    document.getElementById("nickname").innerHTML += window.localStorage.getItem('name');

}

function returnBack(){
    if(window.localStorage.getItem('username') != null){
        window.location.href='../logged/logged.html';
    }else{
        window.location.href='../nickname/nickname.html';
    }
}