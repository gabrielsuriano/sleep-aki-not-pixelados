function getDataFromForm(){
	var nome = $("#txtNome").val();
	var categoria = $("#txtCategoria").val();
	var cor = $("#txtCor").val();
	var sabor = $("#txtSabor").val();
	var eanLSBN = $("#txtEanLsbn").val();
	var departamento = $("#txtDepartamento").val();
	var tipoProduto = $("#txtTipoProduto").val();
	var tamanho = $("#txtTamanho").val();
	var precoDe = $("#txtPrecoDe").val();
	var precoPor = $("#txtPrecoPor").val();
	var subCatN4 = $("#txtSubCatN4").val();
	var descricao = $("#txtDescricao").val();

	var json = {
		"nome": nome,
		"categoria": categoria,
		"cor": cor,
		"sabor": sabor,
		"eanLSBN": eanLSBN,
		"departamento": departamento,
		"tipoProduto": tipoProduto,
		"tamanho": tamanho,
		"precoDe": precoDe,
		"precoPor": precoPor,
		"subCatN4": subCatN4,
		"descricao": descricao
	}
	return json;
}

function getResponse(json){
	$.getJSON('teste.json', json,function(response){
		setResults(response)
	}).fail(function( jqxhr) {
		var request = jqxhr.responseText;
		$("#responseError").html(request);
	});
}

function setResults(response){
	$("#respostaNome").html(response.nome);
	$("#respostaCategoria").html(response.categoria);
	$("#respostaCor").html(response.cor);
	$("#respostaSabor").html(response.sabor);
	$("#respostaEanLsbn").html(response.eanLSBN);
	$("#respostaDepartamento").html(response.departamento);
	$("#respostaTipoProduto").html(response.tipoProduto);
	$("#respostaTamanho").html(response.tamanho);
	$("#respostaPrecoPor").html(response.precoPor);
	$("#respostaSubCatN4").html(response.subCatN4)
	;
	$("#respostaDescricao").html(response.descricao);
}


$("#btnCadastrar").click(function(){
	console.log('btn')
	var json = getDataFromForm();
	getResponse(json);
});