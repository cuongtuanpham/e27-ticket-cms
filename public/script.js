//Define function =========================================
var addNewField = function(val){
	var element = [];
	element += "<div class = 'field'>"
	element += "<input type='text' placeholder='name'>";
	element += "<select>";
	element += "<option value='Textbox'>Textbox</option>";
	element += "<option value='Multiple choice'>Multiple choice</option>}";
	element += "</select>";
	element += "<span>Required</span>";
	element += "<input type='checkbox' id='unchecked' class='cbx hidden'/>";
	element += "<label for='unchecked' class='lbl'></label>";
	element += "<i class='material-icons delete'>clear</i>";
	element += "</div>";
	$(val).before(element);
};

var addNewSection = function(val){
	var element = [];
	element += "<div class = 'section'>"
	element += "<input type='text' placeholder='section name'>";
	element += "<div class='field'>";
	element += "</div>"
	element += "<button id='add-field'>Add New Field</button>";
	element += "</div>";
	$(val).before(element);
};

var deleteElement = function(val){
	$(val).closest('div').remove();
};

//=============================================================
//Execute function ============================================
$('.main').on('click', '#add-field', function(){
	addNewField(this);
});

$('.main').on('click', '#add-section', function(){
	addNewSection(this);
});

$('.main').on('click', 'i.delete', function(){
	deleteElement(this);
});