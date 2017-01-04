//Define function =========================================
var add = function(element, val){
		element += '<div class="col-sm-12 col-xs-6 col-md-4">';
		element += '<input type="text" id="'+val.fieldName+'" placeholder="Type Name Field">';
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

var addNewField = function(val){
	var element = [];
	if(val.require === "true"){
		element += '<li class="field">';
		element += '<div class="row">';
		element += add(element, val);
		element += '</div>';
		element += '</li>';
		$('.each-field ul').append(element);
		$('#'+val.fieldName).val(val.fieldName);
	}
};

var addNewSection = function(val){
	var element = [];
	element += "<div class = 'section'>"
	element += "<input type='text' placeholder='section name'>";
	element += "<ul class='sort'>";
	element += "</ul>";
	element += "<button id='add-field'>Add New Field</button>";
	element += "</div>";
	$(val).before(element);
};

var deleteElement = function(val){
	$(val).closest('li').remove();
};

var addElement = function(){
	
}

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
		    addNewField(response[key]);
		  }
		};
		$(function() {
		    $( "#sort-field" ).sortable();
		    $( "#sort-field" ).droppable({
		    	drop: function(event,ui){
				    var id = ui.draggable.find('p').attr('id');
				    //ui.draggable.find('.each-prebuild').remove();
				    //console.log(id);
				    for (var key in response) {
					  if (response.hasOwnProperty(key)) {
					    if(response[key].fieldName === id){
					    	var element = [];
					    	console.log(id);
							element = add(element, response[key]);
							console.log(element);
							$(ui.draggable.find('.each-prebuild')).replaceWith(element);
							$(ui.draggable.find('input')).val(id);
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
	});
});

$('.main').on('click', '#add-field', function(){
	addNewField(this);
});

$('.main').on('click', '#add-section', function(){
	addNewSection(this);
});

$('.main').on('click', 'i.delete', function(){
	deleteElement(this);
});



// $(document).on("drop", function(event,ui) {
//     event.preventDefault();  
//     var draggable = ui.draggable;
//     var id = draggable.attr("id");
//     console.log(id);
// });