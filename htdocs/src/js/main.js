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
	$.getJSON('/fazMatch', json,function(response){
		setResults(response)
	}).fail(function( jqxhr) {
		var request = jqxhr.responseText;
		$("#responseError").html(request);
	});
}

function setResults(response){
	if (response.nome)
		$("#respostaNome").html(response.nome);
	if (response.categoria)
		$("#respostaCategoria").html(response.categoria);
	if (response.cor)
		$("#respostaCor").html(response.cor);
	if (response.sabor)
		$("#respostaSabor").html(response.sabor);
	if (response.eanLSBN)
		$("#respostaEanLsbn").html(response.eanLSBN);
	if (response.departamento)
		$("#respostaDepartamento").html(response.departamento);
	if (response.tipoProduto)
		$("#respostaTipoProduto").html(response.tipoProduto);
	if (response.tamanho)
		$("#respostaTamanho").html(response.tamanho);
	if (response.precoPor)
		$("#respostaPrecoPor").html(response.precoPor);
	if (response.subCatN4)
		$("#respostaSubCatN4").html(response.subCatN4)
	;
	if (response.descricao)
		$("#respostaDescricao").html(response.descricao);
}


$("#btnCadastrar").click(function(){
	var json = getDataFromForm();
	getResponse(json);
});