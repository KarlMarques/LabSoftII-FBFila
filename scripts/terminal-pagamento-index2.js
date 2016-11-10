
var itemKey;


function btnAtendimentoOnClick(){

  firebase.database().ref('users/').once("value", function(snapshot) {
     userDict = snapshot.val();

     itemKey =  Object.keys(userDict)[0];



     firebase.database().ref('users/' + itemKey).remove();
     addCaixa();

  });

}

function btnComprasOnClick(){

	$.getJSON('http://143.107.102.33:8000/carrinho/id=' + id, function(data) {
    //data is the JSON string
	document.getElementById("valor").innerHTML = data.total;
	});


//	var settings = {

	//	"async": true,
		//"crossDomain": true,
	//	"url": "http://143.107.102.33:8000/carrinho/id=3894728582/",
	//	"method": "GET",
//		"headers": {
	//		"cache-control": "no-cache",
		//	"postman-token": "no-token"
//		}
//	}


//	$.ajax(settings).done(function (response){

		
	//});

}

function addCaixa(){

  var refe = firebase.database().ref('caixas/');

  refe.child('caixa_2').set({
    itemKey: itemKey,
    caixa: "2"
  });


}

