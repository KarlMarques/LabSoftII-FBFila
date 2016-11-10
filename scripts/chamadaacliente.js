
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
		
		document.getElementById("timer").innerHTML =  "Dirija-se ao caixa em no máximo "+minutes+" : "+seconds;

        if (--timer < 0) {
            window.location="timeout.html";
        }
    }, 1000);
}

window.onload = function () {
    var time = 60 * 1,
        display = document.querySelector('#time');
    startTimer(time, display);
};

var chave = parent.document.URL.substring(parent.document.URL.indexOf('myVar=') + 6, parent.document.URL.length);



firebase.database().ref('/').once("value")
  .then(function(snapshot) {

    var firstName = snapshot.child("caixas/caixa_1/caixa").val(); // "Ada"
    var firstname2 = snapshot.child("caixas/caixa_2/caixa").val(); // "Ada"

    var caixa1 = snapshot.child("caixas/caixa_1/itemKey").val();

    if (caixa1 == chave){
      document.getElementById("caixa").innerHTML =  1;
    }else{
      document.getElementById("caixa").innerHTML =  2;
    }
    
  });


function verificarUserNoCaixa (snapshot) {
var valorFila;
var pertence = true;
var caixa1;
var caixa2;
var id;
var userDict;

firebase.database().ref('caixas/').once("value", function(snapshot) {
    userDict = snapshot.val();
    console.log(userDict);
    
    caixa1 =  Object.keys(userDict)[0];
    id = snapshot.child(caixa1).val().itemKey; // "Ada"

    if (chave != id){
      pertence = false;
    }
    console.log(caixa1 + id);

  });

firebase.database().ref('caixas/').once("value", function(snapshot) {
    userDict = snapshot.val();
    console.log(userDict);
    
    caixa2 =  Object.keys(userDict)[1];
    id = snapshot.child(caixa1).val().itemKey; // "Ada"
    console.log(caixa2 + id);

    if (chave != id){
      pertence = false
    }
  });

  if (pertence == false){
    window.location="filaclientefim.html";
    console.log("sai da fila");
  } else {
    console.log("to na fila ainda");
  }
}

firebase.database().ref('caixas/').on('child_changed', verificarUserNoCaixa);

