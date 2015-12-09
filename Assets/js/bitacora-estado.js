
$('#btnEstadoHome').click(function () {

	var now = moment().format('YYYY-MM-DD');

	today = new Date();
	yesterday = new Date(today.setDate(today.getDate() - 182));
	var ayer = moment(yesterday).format('YYYY-MM-DD');
	$('#fec_desde_estado').val(ayer);
	$('#fec_hasta_estado').val(now);

	$.ajax({
		'type': 'post',
		'dataType': 'text',
		'data': {
			'Opcion': '1',
			'fec_inicio':ayer,
			'fec_cierre':now 
		},
		'url': 'appController.php'
	}).done(function (response) {

		var food = JSON.parse(response);

		$("#footer_estado").html(' ');
		$.each(food, function (key,value) {
			$("#footer_estado").append('<li class="seletable arrow" onclick="id_estado_VP('+value['id']+');" > <a href="" data-view-section="main_estado_VP"> <strong>'+key+'</strong> <small>'+value['cantidad']+'</small> </a> </li>');
		});
		generarGraficas(food);

	}).fail(function (response) {
		console.log("ocurrio un error " + response)
	});
});

$('#btnEstadoUpdate').click(function () {

	var fec_desde = $('#fec_desde_estado').val();
	var fec_hasta = $('#fec_hasta_estado').val();
	console.log("desde "+fec_desde);
	console.log("hasta "+fec_hasta);


	$.ajax({
		'type': 'post',
		'dataType': 'text',
		'data': {
			'Opcion': '1',
			'fec_inicio':fec_desde,
			'fec_cierre':fec_hasta 
		},
		'url': 'appController.php'
	}).done(function (response) {

		var serverData = JSON.parse(response);

		$("#footer_estado").html(' ');
		$.each(serverData, function (key,value) {
			$("#footer_estado").append('<li class="seletable arrow" onclick="id_estado_VP('+value['id']+');"  > <a href="" data-view-section="main_estado_VP"> <strong>'+key+'</strong> <small>'+value['cantidad']+'</small> </a> </li>');
		});
		generarGraficas(serverData);

	}).fail(function (response) {
		console.log("ocurrio un error " + response)
	});
});

$('#btnEstadoUpdate_VP').click(function () {

	var fec_desde = $('#fec_desde_estado_VP').val();
	var fec_hasta = $('#fec_hasta_estado_VP').val();
	console.log("desde "+fec_desde);
	console.log("hasta "+fec_hasta);


	$.ajax({
		'type': 'post',
		'dataType': 'text',
		'data': {
			'Opcion': '2',
			'id_estado_VP':$('#id_estado_solicitante').val(),
			'fec_inicio':fec_desde,
			'fec_cierre':fec_hasta 
		},
		'url': 'appController.php'
	}).done(function (response) {

		var serverDataVP = JSON.parse(response);

		$("#footer_estado_VP").html(' ');
		$.each(serverDataVP, function (key,value) {
			$("#footer_estado_VP").append('<li class="seletable arrow" onclick="id_estado_VP_lista('+value['id']+');"  > <a href="" data-view-section="main_estado_VP_Lista"> <strong>'+key+'</strong> <small>'+value['cantidad']+'</small> </a> </li>');
		});
		generarGraficasVP(serverDataVP);

	}).fail(function (response) {
		console.log("ocurrio un error " + response)
	});
});




function id_estado_VP (id) {

	var nowVP = moment().format('YYYY-MM-DD');
	$('#id_estado').val(id);
	today = new Date();
	yesterdayVP = new Date(today.setDate(today.getDate() - 182));
	var ayerVP = moment(yesterdayVP).format('YYYY-MM-DD');
	$('#fec_desde_estado_VP').val(ayerVP);
	$('#fec_hasta_estado_VP').val(nowVP);

	$.ajax({
		'type': 'post',
		'dataType': 'text',
		'data': {
			'Opcion': '2',
			'id_estado_VP':id,
			'fec_inicio':ayerVP,
			'fec_cierre':nowVP 
		},
		'url': 'appController.php'
	}).done(function (response) {

		var serverDataVP = JSON.parse(response);
		$("#footer_estado_VP").html(' ');
		$.each(serverDataVP, function (key,value) {
			$("#footer_estado_VP").append('<li class="seletable arrow" onclick="id_estado_VP_lista('+value['id']+');" > <a href="" data-view-section="main_estado_VP_Lista"> <strong>'+key+'</strong> <small>'+value['cantidad']+'</small> </a> </li>');
		});
		generarGraficasVP(serverDataVP);

	}).fail(function (response) {
		console.log("ocurrio un error " + response)
	});
}


function generarGraficas (valorJSON) {
	var datosUno = [];

	$.each(valorJSON, function (key,value) {
		datosUno.push({name:key,y:parseInt(value['porcentaje'])});
	});


	$('#containerGraphics').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: "Porcentaje",
			colorByPoint: true,
			data: datosUno
		}]
	});
}

function generarGraficasVP (valorJSONVP) {
	var datosDos = [];
	$.each(valorJSONVP, function (key,value) {
		datosDos.push({name:key,y:parseInt(value['porcentaje'])});
	});


	$('#containerGraphics_VP').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: "Porcentaje",
			colorByPoint: true,
			data: datosDos
		}]
	});
}

function id_estado_VP_lista (id_solicitante) {

	var fec_desde = $('#fec_desde_estado_VP').val();
	var fec_hasta = $('#fec_hasta_estado_VP').val();
	var id_estado = $('#id_estado').val();
	console.log("desde: "+fec_desde+" hasta "+fec_hasta+" solicitante "+id_solicitante+" estado "+id_estado);
	$.ajax({
		'type': 'post',
		'dataType': 'text',
		'data': {
			'Opcion': '3',
			'idestadoVPLista':id_estado,
			'idsolicitante':id_solicitante,
			'fechainicio':fec_desde,
			'fechacierre':fec_hasta 
		},
		'url': 'appController.php'
	}).done(function (response) {

		var serverDataVPLista = JSON.parse(response);

		$.each(serverDataVPLista, function (key,value) {
			$("#footer_estado_VP_lista").append('<li class="seletable arrow" > <strong>'+value['proyecto']+'</strong> <small> ITPAM '+value['itpam']+'  Avance '+value['avance']+'</small> </li>');
		});


	}).fail(function (response) {
		console.log("ocurrio un error " + response)
	});
}

