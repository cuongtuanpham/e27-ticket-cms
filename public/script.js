//Define function =========================================
var add = function(element, val){
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<input type="text" id="'+val.fieldName+'" value="'+val.fieldName+'" placeholder="Type Name Field">';
		element += '</div>';
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<select name="type">';
		for(var i = 0; i<val.type.length; i++){
			element += '<option value="'+i+'">'+val.type[i]+'</option>';
		};
		element += '</select>';
		element += '</div>';
		element += '<div class="col-sm-6 col-xs-10 col-md-3">';
		element += '<select name="require">';
		element += '<option value="1">Required</option>';
		element += '</select>';
		element += '</div>';
		element += '<div class="col-sm-6 col-xs-1 col-md-1">';
		element += '<i class="material-icons delete">clear</i>';
		element += '</div>';
	return element;
};

var createObjective = function(i, val){
	var element = [];
	element += '<div class="row objective">';
	element += '<div class="col-sm-12 col-xs-6 col-md-5">';
	element += '<input type="text" placeholder="Type Objective" value="'+val.fieldName+'">';
	element += '</div>';
	element += '<div class="col-sm-12 col-xs-6 col-md-6">';
	element += '<select name="type">';
	element += '<option value="'+i+'">Add Section: Section A</option>';
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-1 col-md-1">';
	element += '<i class="material-icons">clear</i>';
	element += '</div>';
	element += '</div>';
	$('#Objective').closest('li').append(element);
};

var createField = function(val){
	var element = [];
	if(val.require === "true"){
		element += '<li class="field">';
		element += '<div class="row">';
		element += add(element, val);
		element += '</div>';
		element += '</li>';
		$('.each-field ul').append(element);
	}
};

var addChoice = function(val){
	var element = [];
	element += '<div class="row objective">';
	element += '<div class="col-sm-12 col-xs-6 col-md-5">';
	element += '<input type="text" placeholder="Type Objective">';
	element += '</div>';
	element += '<div class="col-sm-12 col-xs-6 col-md-6">';
	element += '<select name="type">';
	element += '<option value="0">Add Section: None</option>';
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-1 col-md-1">';
	element += '<i class="material-icons">clear</i>';
	element += '</div>';
	element += '</div>';
	$(val).before(element);
};

var addField = function(val){
	var allType = ['Textbox', 'Email', 'Select'];
	var element = [];
	element += '<li class="field">';
	element += '<div class="row">';
	element += '<div class="col-sm-12 col-xs-6 col-md-4">';
	element += '<input type="text" placeholder="Type Name Field">';
	element += '</div>';
	element += '<div class="col-sm-12 col-xs-6 col-md-4">';
	element += '<select name="type">';
	for(var i = 0; i<allType.length; i++){
		element += '<option value="'+i+'">'+allType[i]+'</option>';
	};
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-10 col-md-3">';
	element += '<select name="require">';
	element += '<option value="1">Required</option>';
	element += '<option value="2">Optional</option>';
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-1 col-md-1">';
	element += '<i class="material-icons delete">clear</i>';
	element += '</div>';
	element += '</div>';
	element += '</li>';
	$('.each-field').find('#sort-field').append(element);
};

var deleteElement = function(val){
	$(val).closest('li').remove();
};



//=============================================================
//Execute function ============================================
$(document).ready(function() {
	// $('select').material_select();
	$.ajax({
		url: "/data",
		method: "GET"
	}).done(function(response){
		console.log(response);
		for (var key in response) {
		  if (response.hasOwnProperty(key)) {
		    createField(response[key]);
		    if(response[key].fieldName === "Objective"){
		    	for(var i = 0; i<response[key].options.length; i++){
		    		createObjective(i, response[key].options[i]);
		    	}
		    }
		  }
		};
		$(function() {
		    $( "#sort-field" ).sortable();
		    $( "#sort-field" ).droppable({
		    	drop: function(event,ui){
				    var id = ui.draggable.find('p').attr('id');
				    for (var key in response) {
					  if (response.hasOwnProperty(key)) {
					    if(response[key].id === id){
					    	var element = [];
							element = add(element, response[key]);
							console.log(element);
							$(ui.draggable.find('.each-prebuild')).replaceWith(element);
							$(ui.draggable.find('input')).val(response[key].fieldName);
							$(ui.draggable.closest('li')).css({
								width: 'inherit',
								height: 'inherit'
							});
					    }
					  }
					};
		        }
		    });
		    $( "#pre-list" ).sortable({
		    	connectWith: "#sort-field"
		    });
		    $("#pre-list li").draggable({
		    	connectToSortable: '#sort-field',
		    	helper: 'clone',
		    	scope: "items"
		    });
		 });
		$('#Objective').closest('li').append('<button id="addChoice">Add Choices</button>');
		$('.each-field').append('<ul><li><div class="row"><div class="col-sm-12"><button id="addField">Add Field</button></div></div></li></ul>')
	});
});

$('.each-field').on('click', '#addChoice', function(){
	addChoice(this);
});

$('.each-field').on('click', '#addField', function(){
	addField(this);
});

$('.main').on('click', 'i.delete', function(){
	deleteElement(this);
});