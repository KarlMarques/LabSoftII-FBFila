var id = parent.document.URL.substring(parent.document.URL.indexOf('?myVar=') + 7, parent.document.URL.length);

addUserToFirebaseDataBase();


var chave;
function addUserToFirebaseDataBase() {
  
  var ref = firebase.database().ref('users/');

  chave = ref.push().key;

  ref.child(chave).set({
    username: chave,
	ids: id,
    caixa: "0",
    fila: "1"
  });
  

}

var userDict = {};    

function getUserList(){

}

function sairFila(){

  firebase.database().ref('users/' + chave).remove();
  window.location='index.html';

}

function verificaUserRemovido (snapshot) {

firebase.database().ref('users/').once("value", function(snapshot) {
     userDict = snapshot.val();
     var found = "false";
     for(i=0;  i < Object.keys(userDict).length; i++){
          if (Object.keys(userDict)[i] == chave){
          document.getElementById("posicao").innerHTML =  i+1;
          found = "true";
        }
      }
      if (found == "false"){
          window.location="chamadaacliente.html?myVar=" + chave;
      }
     
  });

}



function verificaUserAdicionado (snapshot) {
var valorFila;
firebase.database().ref('users/').once("value", function(snapshot) {
     userDict = snapshot.val();

    valorFila =  Object.keys(userDict).length.toString();
    i = Object.keys(userDict).length-1;
    if (Object.keys(userDict)[i] == chave){
        document.getElementById("posicao").innerHTML =  i+1;
    }

  });
}

function verificaUserDBExiste (snapshot) {
  if(!snapshot){
    window.location="chamadaacliente.html?myVar=" + chave;
  }
}


firebase.database().ref().on('value', verificaUserDBExiste);
firebase.database().ref('users/').on('child_removed', verificaUserRemovido);
firebase.database().ref('users/').on('child_added', verificaUserAdicionado);

firebase.database().ref('/').on("value", function(snapshot) {
     userDict = snapshot.val();

    i = Object.keys(userDict).length-1;
    if (i == 1){
      window.location="chamadaacliente.html?myVar=" + chave;
    }
       
  });
