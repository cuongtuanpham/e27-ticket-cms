//Define function =========================================
var addNewField = function(val){
	var element = [];
	element += "<li>";
	element += "<div class = 'field'>";
	element += "<div class='row'>";
	element += "<div class='col-sm-12 col-md-4'>";
	element += "<input class='field-name' placeholder='Field Name'>";
	element += "</div>";
	element += "<div class='col-sm-12 col-md-3'>"
	element += "<select>";
	element += "<option value='Textbox'>Textbox</option>";
	element += "<option value='Multiple choice'>Multiple choice</option>}";
	element += "</select>";
	element += "</div>";
	element += "<div class='col-sm-12 col-md-3'>";
	element += "<p>Required</p>";
	element += "<div class='switch'>";
	element += "<label><input type='checkbox'><span class='lever'></span></label>";
	element += "</div>";
	element += "<div class='col-sm-12 col-md-2'>";
	element += "<i class='material-icons delete'>clear</i>";
	element += "</div>";
	element += "</div>";
	element += "</div>";
	element += "</li>";
	$(val).siblings('ul').append(element);
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
	$(val).parent('div').parent('div').parent('div').parent('li').remove();
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

$(function() {
    $( ".sort" ).sortable();
    $( "#pre-sort" ).sortable({
    	connectWith: ".sort"
    });
    $(".pre-text").draggable({
    	connectToSortable: '.sort',
    	helper: 'clone'
    });
 });