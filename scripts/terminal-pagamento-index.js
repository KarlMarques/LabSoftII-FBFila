
var itemKey;
var id;

function btnAtendimentoOnClick(){

  firebase.database().ref('users/').once("value", function(snapshot) {
     userDict = snapshot.val();

     itemKey =  Object.keys(userDict)[0];
	 id = snapshot.child(itemKey).val().ids; // "Ada"
     firebase.database().ref('users/' + itemKey).remove();
     addCaixa();
	 console.log(id);

  });

}

function btnComprasOnClick(){
	
	$.getJSON('https://scan-skip-carrinho.herokuapp.com/id='+id+'/', function(data) {
    //data is the JSON string
	console.log(data.total);
	document.getElementById("valor").innerHTML = data.total;
	});

}


function addCaixa(){

  var refe = firebase.database().ref('caixas/');

  refe.child('caixa_1').set({
    itemKey: itemKey,
    caixa: "123",
	ids: id
  });

}




