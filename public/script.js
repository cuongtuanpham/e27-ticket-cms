//Define function =========================================
//Initialize html
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
	element += '<li class="row obj">';
	element += '<div class="col-sm-12 col-xs-6 col-md-5">';
	element += '<input type="text" placeholder="Type Objective" value="'+val.fieldName+'">';
	element += '</div>';
	element += '<div class="col-sm-12 col-xs-6 col-md-6">';
	element += '<select name="type">';
	element += '<option value="'+i+'">Add Section: Section A</option>';
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-1 col-md-1">';
	element += '<i class="material-icons delete">clear</i>';
	element += '</div>';
	element += '</li>';
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
		$('.main-section ul').append(element);
	}
};

var createSection = function(val){
	var allType = ['Textbox', 'Email', 'Select'];
	var element = [];
	for(var i = 0; i<val.length; i++){
		element += '<div class="row">';
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<h2>'+val[i]+'</h2>';
		element += '</div>';
		element += '</div>';
		element += '<div class="row">';
		element += '<div class="col-sm-12 col-md-6">';
		element += '<input type="text" class="description" placeholder="Type Description">';
		element += '</div>';
		element += '</div>';
		element += '<ul id="section-field-'+val[i].split(' ').join('')+'">';
		element += '<li></li>';
		element += '</ul>';
		$('.sub-section').append(element);
		element = [];
		
		element += '<li>';
		element += '<div class="row">';
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<input type="text" placeholder="Type Name Field">';
		element += '</div>';
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<select name="type">';
		for(var j = 0; j<allType.length; j++){
			element += '<option value="'+j+'">'+allType[j]+'</option>';
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
		$('#section-field-'+val[i].split(' ').join('')).append(element);
		element = [];
	}
	
};

var createRightPanel = function(val){
	var element = [];
	for(var i = 0; i<val.sections.length; i++){
		console.log(val.sections[i]);
		element += '<li>'
		element += '<p>'+val.sections[i]+'</p>'
		element += '</li>'
	};
	$('ol').append(element);
}

//====================================================================
//Add element when click button
var addChoice = function(val){
	var element = [];
	element += '<li class="row obj">';
	element += '<div class="col-sm-12 col-xs-6 col-md-5">';
	element += '<input type="text" placeholder="Type Objective">';
	element += '</div>';
	element += '<div class="col-sm-12 col-xs-6 col-md-6">';
	element += '<select name="type">';
	element += '<option value="0">Add Section: None</option>';
	element += '</select>';
	element += '</div>';
	element += '<div class="col-sm-6 col-xs-1 col-md-1">';
	element += '<i class="material-icons delete">clear</i>';
	element += '</div>';
	element += '</li>';
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
	$('.main-section').find('#main-field').append(element);
};

var addSectionRightPanel = function(val){
	var element = [];
	element += '<li>'
	element += '<p>'+$('.section input').val();+'</p>'
	element += '</li>'
	$('ol').append(element);
}

var deleteElement = function(val){
	$(val).closest('li').remove();
};

//=============================================================
//Execute function ============================================
$(document).ready(function() {
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
		    $( "#main-field" ).sortable();
		    $( "#main-field" ).droppable({
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
		    	connectWith: "#main-field"
		    });
		    $("#pre-list li").draggable({
		    	connectToSortable: '#main-field',
		    	helper: 'clone',
		    	scope: "items"
		    });
		 });
		$('#Objective').closest('li').append('<button id="addChoice">Add Choices</button>');
		$('.main-section').append('<ul><li><div class="row"><div class="col-sm-12"><button id="addField">Add Field</button></div></div></li></ul>');
		
		createSection(response['section'].sections);
		createRightPanel(response['section']);
	});
});

$('.main-section').on('click', '#addChoice', function(){
	addChoice(this);
});

$('.main-section').on('click', '#addField', function(){
	addField(this);
});

$('.main').on('click', 'i.delete', function(){
	deleteElement(this);
});

$('.right-panel').on('click', '#add-right-panel', function(){
	if($('.right-panel input').val() === ''){
		alert("Please enter a valid section name")
	}else{
		addSectionRightPanel(this);
		createSection([$('.right-panel input').val()])
	}
})