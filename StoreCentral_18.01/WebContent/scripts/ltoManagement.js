var edit_lto_location_dialog = '<div id="dialog-edit-lto-location" title="Edit" class="visible-hide"><div class="popupContent"><div id="pop-up-cont" class="ContentTableWrapper"></div><div class="popupActionsWrapper"><span class="popupActions"><label id="saveLTOChanges" class="actionBtn"><label class="thumbUp">Save</label></label><label id="cancelLTOChanges" class="secondaryActionBtn"><a>Cancel</a></label></span></div></div></div>';
var aisleList =[];
var salesorgName = '';
var dataObj='';
var categoryList = [];
var AddOrEditLocation = 'AC_LAEL';
var DeleteLocation = 'AC_LDEL';
var fixtureList=[];
var ltoIDArray=[];
var bigwBanner = 'bigw';
var no_lto_locations;
var ltoList=[];
$(document).ready(function() {
			salesorgName = $('#salesorgName').val();
			$("#addUser").click(function(){ 
				$("#tableSearchAction").addClass('hideBlock');
				$("#tableAddAction").toggleClass('hideBlock');
			});
			
			
			$(".closeLink").click(function(){ 
				$("#tableAddAction").addClass('hideBlock');
				$("#tableSearchAction").addClass('hideBlock');
			});
			
			//checks radio buttons in store, single or multiple
			$('#single').click(function(){
				$("#singleStore").removeClass('hideBlock');
				$("#multipleStore").addClass('hideBlock');				
			});
			
			$('#multiple').click(function(){
				$("#multipleStore").removeClass('hideBlock');
				$("#singleStore").addClass('hideBlock');				
			});
			
			
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			//Date
			
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				onClose: function( selectedDate ) {
					$( "#dateTo" ).focus();
				}
				
			});
			
			$("#dateTo").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50
				
			});		
			$("input[name='departmentList']").click(function() {				
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');

			
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			getExistingLTOLocations();
			
			$('#ltoSaveAndAdd').click(function()
					{
				if(validateSave())
					{
					callCreateOrEditLTOLocationService('create');
					$('#ltoCreateForm')[0].reset();
					ltoList=[];
					$('#ltoCreateForm').find('#ltoCatDrpDwnLabelDept').html('Select Department');
					$('#ltoCreateForm').find('#ltoCatDrpDwnLabelSubCate').html('Select Sub-Category');
					$('#ltoCreateForm').find('#ltoCatDrpDwnLabel').html('Select Category');					
					$('#ltoCatDrpDwnDivSub #ltoSelectCancel').trigger('click');					
					$('#ltoCatDrpDwnDivDept #ltoSelectCancel').trigger('click');
					$('#ltoCatDrpDwnDiv #ltoSelectCancel').trigger('click');
					$('.ltoBarcode').attr('checked', false);
					}
				
					});
			
			if(salesorgName != 'bigw' && salesorgName != 'bws' && salesorgName != 'danmurphy') {
				$('.bigwDiv').addClass('hideBlock');	
				$('.otherDiv').removeClass('hideBlock');
			} else {
				$('.otherDiv').addClass('hideBlock');	
				$('.bigwDiv').removeClass('hideBlock');
			}
			
			
		});

function validateSave()
{
	var errorsArray = [];
	if($('#ltoFixtureType').val() == 'Select')
		{
		errorsArray.push('Please select a Fixture type.');
		}
	if($('input[name="pos"]').is(':visible') && $('input[name="pos"]:checked').length == 0)
		{
		errorsArray.push('Please select atleast 1 aisle.');
		}
	if($('#ltoCatDrpDwnDiv').is(':visible') && $('input[name="catDrpDwnChkBx"]:checked').length == 0)//for defect 7167
	{
	errorsArray.push('Please select atleast 1 category.');
	}
	if($('#ltoCatDrpDwnDivSub').is(':visible') && $('input[name="catDrpDwnChkBx"]:checked').length == 0)//for defect 7167
	{
	errorsArray.push('Please select atleast 1 sub-category.');
	}
	if($('#ltoCatDrpDwnDivDept').is(':visible') && $('input[name="catDrpDwnChkBx"]:checked').length == 0)//for defect 7167
	{
	errorsArray.push('Please select atleast 1 deptartment.');
	}
	if(errorsArray.length == 0)
		return true;
	else
		{
		$.fn.showCustomMsg(errorsArray,error,'LTO Management');
		return false;
		
		}
}
		
function getExistingLTOLocations(from)
{
	
	var url = getLTOLocations;
	var param={
			"iv_lto_barcode": '',
			"iv_sales_org" : salesOrgVal,
			"iv_site_no" : siteVal,
			"iv_session_id" : '000'
	};
	
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		if(checkResult(response,'aisle_name','LTO Management')){			
			var confObj = new getLTOLocationResultTableConfObj('lto_locations',response);
			 printLTO(response);
			 ltoList=[]; //defect_10996
			no_lto_locations=response.length;
			for(var i=0;i<no_lto_locations;i++){
				ltoList.push(response[i].lto_id);
			}
			$('#ltoLocationList').loadtbl(confObj);
			$('.moreNumber').tooltip({
				tooltipClass : 'tmptooltipClass'
			});
		}
		if($('#salesOrg').val()!=1060){
			$('.printBtn').addClass('hideBlock');
		}
		if(from == undefined)
		getFixtureTypes();
		else
			{// for  defect 7167
			$('#ltoSelectDone').trigger('click');
			$("#ltoCatDrpDwnLabel").html('Select Category');
	}
		
		securityMatrix();
		if(true){
		$('#ltoLocationList').prepend('<div style="margin-top: 3px;float: right;"><label class=" printButtonFix actionBtn"><label id="printButton" class="print" onClick=printLTODetails(); name="print">Print</label></label></div>');
		}
		}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'LTO Management');
		stopLoading();
	});

}

function getLTOLocationResultTableConfObj(title,data)
{
	this.option = 'build';
/*	if(true)
		{
		this.key = ['new_location_name','fixture_type','lto_status','aisle_name','total_articles','action','select_LTO'];
		}
	else
		{
		this.key = ['new_location_name','fixture_type','lto_status','category_name','total_articles','action'];// added for defect 7168
		}*/
		var columnName = '';
	   if($('#salesOrg').val() == '1060'){
			columnName = 'Department'; 
			this.key = ['new_location_name','fixture_type','lto_status','category_name','total_articles','action','select_LTO'];
		}else if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			columnName = 'Sub-Category'; 
			this.key = ['new_location_name','fixture_type','lto_status','category_name','total_articles','action','select_LTO'];
		}else{
			columnName = 'Category'; 
			this.key = ['new_location_name','fixture_type','lto_status','aisle_name','total_articles','action','select_LTO'];
		}
	
	this.table_name = title;
	this.table_title = '';
	this.table_class = 'ContentTable actionRows';
	this.header_tr_class = 'collapsed ';
	this.header_name = {new_location_name:'Location',fixture_type:'Fixture Type',category_name:columnName,lto_status:'Status',aisle_name:'Aisles',total_articles:'No. of Articles',action:'Actions',select_LTO:'Select_LTO'};
	this.header_data_type = {new_location_name:'char',fixture_type:'char',category_name:'char',lto_status:'char',aisle_name:'char',total_articles:'number',action:'',select_LTO:''};
	this.header_row_type = {new_location_name:'main',fixture_type:'main',category_name:'main',lto_status:'main',aisle_name:'main',total_articles:'main',action:'',select_LTO:''};
	this.header_class = {new_location_name:'',fixture_type:'',category_name:'',lto_status:'centerValue',aisle_name:'',total_articles:'',action:'centerValue ',select_LTO:'lastColumn'};
	this.header_title = {},
	this.header_width = {new_location_name:'',fixture_type:'',category_name:'',lto_status:'',aisle_name:'',total_articles:'',action:'',select_LTO:''};
	this.content_tr_class = '';
	this.content_class = {new_location_name:'',fixture_type:'',category_name:'',lto_status:'centerValue',aisle_name:'',total_articles:'',action:'centerValue ',select_LTO:'centerValue lastColumn'};
	this.content_title = {};
	this.content_format = {fixture_type:'removeNull',category_name:'removeNull',lto_status:'removeNull',aisle_name:'removeNull',total_articles:'removeNull'};
	this.content_width =  {new_location_name:'',fixture_type:'',category_name:'',lto_status:'',aisle_name:'',total_articles:'',action:'',select_LTO:'lastColumn'};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.add_option = false; 
	this.curr_page= 1;
	this.sort=true;
	this.sort_done = {sort_done: callTooltip};this.page_done = {page_done: callTooltip};
	this.cont_data_function = {category_name:showCategory,lto_status:showLtoStatus,new_location_name:getNew_location_name,f_location_name:getNew_location_name, aisle_name:showAisles};
	this.cont_sort_function = {new_location_name:showLocation,aisle_name:showAisles/*,category_name:showCategory*/};
	this.tr_id= ['lto_id'];
	this.content_bind_event = {click: ''};
	this.header_td_label = {action:'Actions',new_location_name: 'Location',select_LTO:'<label><input class="selectAllLTO" type="checkbox"></input></label>'};
	this.content_label = {action:'<label class="linkBtn" title="Edit Details"><a><label class="editRecord '+AddOrEditLocation+'">&nbsp;</label></a></label>'
			+($('#salesOrg').val()==1060? '':""),select_LTO:'<input class="ltoBarcode" type="checkbox"></input>'};
	this.content_td_addon = {action:{'.editRecord':{event:{click : editLTOLocationDetails},display: function(){}},'.printRecord':{event:{click : printRecord},display: function(){}}},select_LTO:{'.ltoBarcode':{event:{click : selectLTO},display: function(){}}}};
	this.column_sort_function = {f_location_name: sortLocation};
	this.header_td_addon={select_LTO:{'.selectAllLTO':{event:{click : selectLTO},display: function(){}}}};
}
var sortLocation = function(data1, data2, flag,obj1,obj2,sort_function) {
	var result = 0;
	var data1 = obj1.fixture_type;
	var data2 = obj2.fixture_type;
	if (flag) {
		if(data1 > data2)
			result = 1;
		else if(data1 < data2)
			result = -1;
		else 
			result = 0;
	} else {
		if(data1 < data2)
			result = 1;
		else if(data1 > data2)
			result = -1;
		else
			result = 0;
	}
	
	if(result == 0){
		if (flag) {
			result = Number(obj1.f_location_name||'') - Number(obj2.f_location_name||'');
		} else {
			result = Number(obj2.f_location_name||'') - Number(obj1.f_location_name||'');
		}
	}
	return result;
};

var showLocation = function(){
	return 'f_location_name';
};

var getNew_location_name = function(obj){
	obj.f_location_name = (obj.loc_short_name.split(' ')[obj.loc_short_name.split(' ').length-1]);
	return obj.location_name;
};
var callTooltip = function()
{
	$('.moreNumber').tooltip({
				tooltipClass : 'tmptooltipClass'
			});
	if($('#ltoLocationList .selectAllLTO').prop('checked')){
		$('#ltoLocationList .ltoBarcode').prop('checked', true);
	}
	
	if($('#lto_locations_table tbody tr').each(function(){
	if(jQuery.inArray($(this).closest('tr').attr('id'), ltoIDArray)!=-1){
		$(this).find('.ltoBarcode').prop('checked', true);	
	}	
	}));
	securityMatrix();
};
var showCategory = function(obj)
{
	var catList = obj.category_name.split(',');
	var content = '';
	if (catList.length > 0) {
		
		content += catList[0];

		if (catList.length > 1) {
			content += '<a class="moreNumber moredept" title="';
			for ( var k = 1; k < catList.length; k++) {
				content += '&#13;'
						+ catList[k];
			}
			content += '" > + '
					+ (catList.length - 1)
					+ 'more</a>';
		}
	}
	return content;
};
var showAisles = function(obj)
{
	var aislesList = obj.aisle_name.split(',');
	var content = '';
	if (aislesList.length > 0) {
		
		content += aislesList[0];

		if (aislesList.length > 1) {
			content += '<a class="moreNumber moredept" title="';
			for ( var k = 1; k < aislesList.length; k++) {
				content += '&#13;'
						+ aislesList[k];
			}
			content += '" > + '
					+ (aislesList.length - 1)
					+ 'more</a>';
		}
	}
	return content;};

var editLTOLocationDetails = function(e){
	var dataObj = $(this).closest('tr').data('obj');
	var dialog= createEditLTOLocationDialog();
	dialog.find('#pop-up-cont').html(frameEditLTOContent(dataObj));
	dialog.parent().find('.ui-dialog-title').text(
			'Edit '+ dataObj.location_name +' Details');
	dialog.find('#pop-up-cont').data('selectedObj',dataObj);
	dialog.find('#saveLTOChanges').data('editObj',dataObj);
	dialog.find('#saveLTOChanges').unbind('click').bind('click',saveLTOChanges);
	dialog.find('#cancelLTOChanges').unbind('click').bind('click',cancelLTOChanges);
	bindSelectClickEventsInEdit();
	dialog.find('#pop-up-cont').find('.tableFooter').addClass('hideBlock');
	dialog.dialog('open');
	if(salesorgName == 'bigw' || salesorgName == 'bws' || salesorgName == 'danmurphy') 
	bindAfterCategoryEditDrpDwnReady();
	securityMatrix();
	
};

function bindSelectClickEventsInEdit()
{
	$('#ltoSelectDoneEdit').on( 'click', function() {//DOne btn inside drop down
		if($('#salesOrg').val() == '1010'  || $('#salesOrg').val() == '1015'){
		$('#ltoCatDrpDwnDivEditSubCate').removeClass('active');
		}else if($('#salesOrg').val() == '1060'){
		$('#ltoCatDrpDwnDivEditDept').removeClass('active');
		}else{
		$('#ltoCatDrpDwnDivEdit').removeClass('active');
		}
	});
	$('#ltoSelectCancelEdit').on('click', function() {//cancel button inside dropdown
		if($('#salesOrg').val() == '1010'  || $('#salesOrg').val() == '1015'){
			$('#ltoCatDrpDwnDivEditSubCate').removeClass('active');
			}else if($('#salesOrg').val() == '1060'){
			$('#ltoCatDrpDwnDivEditDept').removeClass('active');
			}else{
			$('#ltoCatDrpDwnDivEdit').removeClass('active');
			}
		//$('#ltoCatDrpDwnDivEdit').removeClass('active');
	});
	
	$('#ltoCatDrpDwnActiveIdEdit').click(function(){ 
		if( $('#ltoCatDrpDwnDivEdit').hasClass('active')){
			$('#ltoCatDrpDwnDivEdit').removeClass('active');
		} else {
			$('#ltoCatDrpDwnDivEdit').addClass('active');
		}
	});
	
	$('#ltoCategoryDrpDwn').find("li input[type=checkbox]").change(function() {
		onChangeDeptDropDown();	
	});	

	
	
	
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		$('#ltoCatDrpDwnDivEditSubCate #ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
			$('#ltoCatDrpDwnDivEditSubCate').removeClass('active');
		});
		$('#ltoCatDrpDwnDivEditSubCate #ltoSelectCancel').on('click', function() {//cancel button inside dropdown
			$('#ltoCatDrpDwnDivEditSubCate').removeClass('active');
		});
		$('#ltoCatDrpDwnActiveIdEditSubCate').click(function(){ 
			if( $('#ltoCatDrpDwnDivEditSubCate').hasClass('active')){
				$('#ltoCatDrpDwnDivEditSubCate').removeClass('active');
			} else {
				$('#ltoCatDrpDwnDivEditSubCate').addClass('active');
			}
		});
	}else if ($('#salesOrg').val() == '1060'){
		$('#ltoCatDrpDwnDivEditDept #ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
			$('#ltoCatDrpDwnDivEditDept').removeClass('active');
		});
		$('#ltoCatDrpDwnDivEditDept #ltoSelectCancel').on('click', function() {//cancel button inside dropdown
			$('#ltoCatDrpDwnDivEditDept').removeClass('active');
		});
		$('#ltoCatDrpDwnActiveIdEditDept').click(function(){ 
			if( $('#ltoCatDrpDwnDivEditDept').hasClass('active')){
				$('#ltoCatDrpDwnDivEditDept').removeClass('active');
			} else {
				$('#ltoCatDrpDwnDivEditDept').addClass('active');
			}
		});
	}else{
		$('#ltoCatDrpDwnDivEdit #ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
		$('#ltoCatDrpDwnDivEdit').removeClass('active');
	});
	$('#ltoCatDrpDwnDivEdit #ltoSelectCancel').on('click', function() {//cancel button inside dropdown
		$('#ltoCatDrpDwnDivEdit').removeClass('active');
	});
	$('#ltoCatDrpDwnActiveIdEdit').click(function(){ 
		if( $('#ltoCatDrpDwnDivEdit').hasClass('active')){
			$('#ltoCatDrpDwnDivEdit').removeClass('active');
		} else {
			$('#ltoCatDrpDwnDivEdit').addClass('active');
		}
	});
	}
	
	
		
}

/**
 * onCahnge of department drop down invoke this method in Create Stocktake page
 */
function onChangeDeptDropDown(){
	

	if ($('input[name="catDrpDwnChkBx"]:checked').length == $('input[name="catDrpDwnChkBx"]').length) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('All Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('All Department');
		}else{
		$("#ltoCatDrpDwnLabel").html('All Category');
		}
	} else if ($('input[name="catDrpDwnChkBx"]:checked').length == 0) {
		
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('Select Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('Select Department');
		}else{
		$("#ltoCatDrpDwnLabel").html('Select Category');
		}
						
	} else if ($('input[name="catDrpDwnChkBx"]:checked').length == 1) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html($('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html($('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		}else
		$("#ltoCatDrpDwnLabel").html(
				$('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		
	} else {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('Multiple Sub-Categories');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('Multiple Departments');
		}else{
		$("#ltoCatDrpDwnLabel").html('Multiple Categories');
		}
	}

	
	/*
if($('#salesOrg').val())
	 if($('.depDrpDwnChkBx:checked').length == 0){
		$("#ltoCatDrpDwnLabel").html('Select Deparments');//Department drop down value displayed
		//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
	}	else{
		$("#ltoCatDrpDwnLabel").html('Multiple Categories');//Department drop down value displayed
	}	*/	
}

var createEditLTOLocationDialog = function(){
	var dialog = $('#dialog-edit-lto-location');
	if((dialog||'') == '' || dialog.length == 0){
		$('body').append(edit_lto_location_dialog);
		dialog = $('#dialog-edit-lto-location');
		dialog.dialog({ autoOpen : false, modal : true, resizable : false, minHeight : 200, width : 450 }).removeClass('visible-hide').parent().addClass("popupWrapper");
	}
	return dialog;
};

var saveLTOChanges = function(e)
{
	if(validateEditDetails())
		{
		if($('input[name="deleteLto"]:checked').length == 0)
			callCreateOrEditLTOLocationService('edit');
		else
			callCreateOrEditLTOLocationService('delete');
		
		var $elem = $('#dialog-edit-lto-location');
		$elem.dialog('close');
		}
};

function validateEditDetails() // for Defect_7167
{
	var errorsArray = [];
	if ($('#ltoFixtureTypeInDialog').val() == 'Select')
		{
		errorsArray.push('Please select a Fixture type.');
		}
	
	if(salesorgName != 'bigw' && salesorgName != 'bws'  && salesorgName != 'danmurphy'){
	if($('input[name="editAisle"]:checked').length == 0 )
		{
		errorsArray.push('Please select atleast 1 aisle.');
		}}
	else{
	if($('input[name="catDrpDwnChkBxEdit"]:checked').length == 0)
		{
		errorsArray.push('Please select atleast 1 Category.');
		}}
	if(errorsArray.length == 0)
		return true;
	else
		{
		$.fn.showCustomMsg(errorsArray,error,'LTO Management');
		return false;
		
		}

}
var cancelLTOChanges = function(e)
{
	var $elem = $('#dialog-edit-lto-location');
	$elem.dialog('close');
};

function frameEditLTOContent(obj)
{
	var hideClassForOther='';
	var hideClassForBigw='hideBlock';
	if(salesorgName == 'bigw' || salesorgName == 'bws'  || salesorgName == 'danmurphy')  // defect no 6929
		{
		hideClassForOther='hideBlock';
		hideClassForBigw='';
		}
	var content = '';
	
	content+='<div class="formWrapper"><div class="parameter clearfix" id=""><label for="article" class="">Fixture Type:</label>'
	+'<select id="ltoFixtureTypeInDialog" class="selectOptions"><option value="Select">Select</option>';
	for(var i=0;i<fixtureList.length;i++)
	{
	content+='<option fixture_id="'+fixtureList[i].fixture_id+'" fixture_type="'+fixtureList[i].fixture_type+'" ';
	if(fixtureList[i].fixture_type == obj.fixture_type)
		content += ' selected ';
	content+= ' >'+fixtureList[i].fixture_type+'</option>';
	}
	content +='</select></div>';
		
	content += '<div class="parameter"><table width="100%" class="plainTable"><tbody><tr class="'+hideClassForOther+'">'
			+'<td>Aisles</td><td><span class="parameterOptionsRadio">';	
	var locationAisleList = obj.aisle_name.split(',');
	var count = 0;
	var innerContent= '';
	for(var i=0;i<aisleList.length;i++)
		{
		
		count++;
		if(count == 11)
			innerContent+='<span>';
		innerContent+='<input type="checkbox" ';
		if($.inArray( aisleList[i], locationAisleList ) != -1)
			{
			innerContent+=' checked ';
			}
		innerContent+=' name="editAisle" value="'+aisleList[i]+'"><label for="'+aisleList[i]+'" class="labelText">'+aisleList[i]+'</label>';
		if(i==aisleList.length-1)
			innerContent+='</span>';
		if(count%8 == 0)
			innerContent+='<br>';
		
		}
	
	content+=innerContent+'</span></td></tr>';
	
	var categoryContent='';
	if(hideClassForBigw == '')
	{
			var catList = obj.category_name.split(',');
					
			if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
				categoryContent+='<tr class="'+hideClassForBigw+'"><td>Sub-Category</td><td style="height: 130px;"><div id="ltoCatDrpDwnDivEditSubCate" class="selectDropdown"><label id="ltoCatDrpDwnActiveIdEditSubCate" class="selectLabel">';
				categoryContent += '<a id="ltoCatDrpDwnLabelEditSubCate">';
				}else if($('#salesOrg').val() == '1060'){
				categoryContent+='<tr class="'+hideClassForBigw+'"><td>Department</td><td style="height: 130px;"><div id="ltoCatDrpDwnDivEditDept" class="selectDropdown"><label id="ltoCatDrpDwnActiveIdEditDept" class="selectLabel">';
				categoryContent += '<a id="ltoCatDrpDwnLabelEditDept">';
				}else{
				categoryContent+='<tr class="'+hideClassForBigw+'"><td>Category</td><td style="height: 130px;"><div id="ltoCatDrpDwnDivEdit" class="selectDropdown"><label id="ltoCatDrpDwnActiveIdEdit" class="selectLabel">';
				categoryContent += '<a id="ltoCatDrpDwnLabelEdit">';
				}
		if(catList.length == 1) {       // For Defect_7167
			categoryContent+=obj.category_name;
		}else if(catList.length > 1){
			if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
				categoryContent+='Multiple Sub-Categories';
			}else if($('#salesOrg').val() == '1060'){
				categoryContent+='Multiple Departments';
			}else{
				categoryContent+='Multiple Categories';
			}
		}else{
			if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
				categoryContent+='Select Sub-Category';
			}else if($('#salesOrg').val() == '1060'){
				categoryContent+='Select Department';
			}else{
				categoryContent+='Select Category';	
			}
		}

		if($('#salesOrg').val() == '1010'  || $('#salesOrg').val() == '1015'){
			categoryContent+='</a></label><ul class="dropdown" id="ltoCategoryDrpDwnEditSubCate"><div class="inner-drop-down">';
		}else if($('#salesOrg').val() == '1060'){
			categoryContent+='</a></label><ul class="dropdown" id="ltoCategoryDrpDwnEditDept"><div class="inner-drop-down">';
		}else{
			categoryContent+='</a></label><ul class="dropdown" id="ltoCategoryDrpDwnEdit"><div class="inner-drop-down">';
		}

		for ( var i = 0; i < categoryList.length; i++) {
			categoryContent += '<li><input class="pointerFix" name="catDrpDwnChkBxEdit" type="checkbox" ';

			if($.inArray( (categoryList[i].category_name).toString(), catList ) != -1)  // For Defect_7167
			{
				categoryContent+=' checked ';
			}
			categoryContent+= 'value="'
				+ categoryList[i].category_id
				+ '" id="'
				+ categoryList[i].category_id
				+ '">'
				+ '<label class="dropdownLabel">'
				+ categoryList[i].category_name + '</label></li>';							
		}
	categoryContent+='</div><div class="done-cancel-btn"><li class="selectDropdownActions">'
								+'<label id="ltoSelectDoneEdit" class="actionBtn"><a>Done</a></label>'
								+'<label id="ltoSelectCancelEdit" class="secondaryActionBtn"><a>Cancel</a></label></li></div>';
	
	categoryContent+='</ul></div></td></tr>';
}
	
	content+=categoryContent+'<tr><td colspan="2"><hr class="sectionDivider clearfix"></td></tr><tr>'
			+'<td colspan="2" class="'+DeleteLocation+'"><span class="parameterOptionsRadio"><input type="checkbox" id="active1" value="active" name="deleteLto">'
			+'<label class="labelText" for="active1">Delete this location</label></span>'
			+'</td></tr></tbody></table></div> <!-- End of parameter --></div>';
	return content;
}

var printRecord = function(e)
{
	e.preventDefault();
	dataObj = $(this).closest('tr').data('obj');
	triggerPrintBarcodeJasper();
	var printBarcodeMsg='Are you sure you want to print the barcode for <strong>'+dataObj.location_name+'</strong> ?';
	$.fn.warnPopup('warn',printBarcodeMsg,'Print Barcode Confirmation',triggerPrintBarcodeYes,triggerPrintBarcodeNo,'',$(this));
};

var selectLTO=function(e)
{
	var ltoID;	
	
	if($(this).hasClass('selectAllLTO')){
		if($(this).prop('checked')){
			ltoIDArray=ltoList;
			$('.ltoBarcode').prop('checked', true);	
			//$('.ltoBarcode').addClass('selected');
			/*$('#lto_locations_table tbody tr').each(function(){
				ltoIDArray.push(this.id); });*/
		}else{
			$('.ltoBarcode').prop('checked', false);
			//$('.ltoBarcode').removeClass('selected');
			/*$('#lto_locations_table tbody tr').each(function(){
				ltoID = $(this).closest('tr').attr('id');
				var index = ltoIDArray.indexOf(ltoID);
				if (index > -1) {
					ltoIDArray.splice(index, 1);
				}
				});*/
			ltoIDArray=[];
		}	
		
	}else{
		if($(this).prop('checked')){
			//$(this).addClass('selected');
			//ltoID = $(this).closest('tr').attr('id');
			//ltoIDArray.push(ltoID);
			//ltoIDArray=[];
			/*$('#lto_locations_table tbody tr').each(function(){
				if($(this).find('.ltoBarcode').prop('checked')){
					ltoIDArray.push(this.id); 	
				}
				});*/
			ltoIDArray.push($(this).closest('tr').attr('id'));
			if(ltoIDArray.length==no_lto_locations){
				$('.selectAllLTO').prop('checked', true)
			}
		}else{
			ltoID = $(this).closest('tr').attr('id');
			 //$(this).find('.ltoBarcode').removeClass('selected');
			var index = ltoIDArray.indexOf(ltoID);
			if (index > -1) {
				ltoIDArray.splice(index, 1);
			}
			
			if(ltoIDArray.length!=no_lto_locations){
				$('.selectAllLTO').prop('checked', false)
			}
		}
		
	}
	
};
var triggerPrintBarcodeYes = function(e)
{
	var $elem = e.data.msg;
	$elem.dialog('close');
	triggerLTOPrint();
};
var triggerPrintBarcodeJasper = function(){
	//var $elem = e.data.msg;
	//$elem.dialog('close');
	var Aisle=dataObj.aisle_name;
	var Category=dataObj.category_name;
	var locationDesc=dataObj.location_name;
	var barcode=dataObj.lto_id;
	var location=dataObj.lto_id;
	var ltoId=dataObj.lto_id;
	var RC=dataObj.loc_short_name;
	var barcodeText=dataObj.lto_id;
	var barcodelen=barcode.toString();
	var barcodeTextlen=barcodeText.toString();
	if(barcodelen.length<7){
	 	barcode=addLeadingZeros (barcode,7);
	}
	
	if(barcodeTextlen.length<7){
	 	barcodeText=addLeadingZeros (barcodeText,7);
	}
	
	
	var s = Aisle;			//For Defect_7203
	var c = Category;
	var AC = "";
	if (salesorgName == 'bws' || salesorgName == 'bigw'  || salesorgName == 'danmurphy'){
		barcodeText=(locationDesc);
		AC = ("Location"+" "+location);
		location= (""+""+Category);
	}
	else {
		var firstAisle = s.split(',').slice(0,1); 
		barcodeText=(RC+"."+ltoId+"."+firstAisle);
		AC = ("Aisle"+" "+Aisle);
		location=("Location"+" "+location);
	}
	
	locationDesc=(locationDesc+" "+ltoId);
	
	if(dataObj.sub_category_name!=undefined || dataObj.sub_category_name!=null )
		subCategory=dataObj.sub_category_name;
	else{
		subCategory="";
	}
	if (salesorgName == 'bigw'){
	locationDesc=dataObj.loc_name_to_sort;
	splitLocDesc=locationDesc.split("|");
	locationDesc=splitLocDesc[0]+" "+splitLocDesc[1];
	//if(Category.indexOf(',')!=-1){
		//Category=Category.split(',')[0];
	//}
	if(splitLocDesc.length >1)
		Category= splitLocDesc[2]
	}
	
	callLTOJasperPrint( AC,locationDesc,barcode,location,barcodeText, RC, firstAisle, ltoId,  salesorgName,Category); 
};

var triggerPrintBarcodeNo = function(e)
{
	var $elem = e.data.msg;
	$elem.dialog('close');
};

var showLtoStatus = function(obj)
{
	if(obj.lto_status == 'IN_USE')
		{
		return '<label class="success">In use</label>';
		}
	else 
		{
		return '<label class="deactive">Not in use</label>';
		}
};

function getFixtureTypes()
{
	var url = getLTOFixtureTypes;
	var param={
			"iv_sales_org" : salesOrgVal,
			"iv_session_id" : '000'
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post'
	}).done(function(response) {
		if(checkResult(response,'fixture_type','Stock Adjustment')){
			$('#ltoFixtureType').html(populateFixtureType(response));
		}
		if(salesorgName == 'bigw' || salesorgName == 'bws' || salesorgName == 'danmurphy')		// defect no 6928
			getCategoriesList();
		else
			getAisleInfo();		
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'LTO Management');
		stopLoading();
	});

}

function populateFixtureType(list)
{
	var content = '<option value="Select">Select</option>';
	fixtureList = list;
for(var i=0;i<list.length;i++)
	{
	content+='<option fixture_id="'+list[i].fixture_id+'" fixture_type="'+list[i].fixture_type+'" >'+list[i].fixture_type+'</option>';
	}
return content;
}

function getCategoriesList()
{
	var url = getLTOCategories;
	var param={
			"iv_sales_org" : salesOrgVal,
			"iv_session_id" : '000'
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		if(checkResult(response,'category','LTO Management')){
			getCategoryDetails(response[0]);
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'LTO Management');
		stopLoading();
	});


}

function getCategoryDetails(obj)
{
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		$('.subCateg').removeClass('hideBlock');
		$('.categ').addClass('hideBlock');
		$('.deptmnts').addClass('hideBlock');
	}else if(($('#salesOrg').val() == '1060')){
		$('.subCateg').addClass('hideBlock');
		$('.categ').addClass('hideBlock');
		$('.deptmnts').removeClass('hideBlock');
	}else{
		$('.subCateg').addClass('hideBlock');
		$('.categ').removeClass('hideBlock');
		$('.deptmnts').addClass('hideBlock');
	}
	var catList = [];
	var tempList = obj.category.split(',');
	
	for(var i=0;i<tempList.length;i++)
		{
		var categoryObj= {};
		categoryObj['category_id']=tempList[i].split('|')[0].trim();// for defect Defect - 7256
		categoryObj['category_name']=tempList[i].split('|')[1].trim(); // for defect Defect - 7256
		catList.push(categoryObj);
		}
	
	categoryList = catList;
	var content = '<div class="inner-drop-down">';
	for ( var i = 0; i < catList.length; i++) {
		content += '<li >	<input class="pointerFix" name="catDrpDwnChkBx" type="checkbox" '
				+ 'value="'
				+ catList[i].category_id
				+ '" id="'
				+ catList[i].category_id
				+ '">'
				+ '<label class="dropdownLabel">'
				+ catList[i].category_name + '</label></li>';							
	}
	content+='</div><div class="done-cancel-btn"><li class="selectDropdownActions">'
								+'<label id="ltoSelectDone" class="actionBtn"><a>Done</a></label>'
								+'<label id="ltoSelectCancel" class="secondaryActionBtn"><a>Cancel</a></label></li></div>';
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
	$('#ltoCategoryDrpDwnSubCate').html(content);
	}
	if($('#salesOrg').val() == '1060'){
		$('#ltoCategoryDrpDwnDept').html(content);
	}else{
	$('#ltoCategoryDrpDwn').html(content);
	}
	bindSelectClickEvents();
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		$("#ltoCatDrpDwnLabelSubCate").html('Select Sub-Category');
	}else if($('#salesOrg').val() == '1060'){
		$("#ltoCatDrpDwnLabelDept").html('Select Department');
	}
	else{
	$("#ltoCatDrpDwnLabel").html('Select Category');// for defect 7167
	}
	bindAfterCategoryDrpDwnReady();
}

function bindSelectClickEvents()
{
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		$('#ltoCategoryDrpDwnSubCate #ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
			$('#ltoCatDrpDwnDivSub').removeClass('active');
		});
		$('#ltoCategoryDrpDwnSubCate #ltoSelectCancel').on('click', function() {//cancel button inside dropdown
			$('#ltoCatDrpDwnDivSub').removeClass('active');
		});
		$('#ltoCatDrpDwnActiveIdSubCate').click(function(){ 
			if( $('#ltoCatDrpDwnDivSub').hasClass('active')){
				$('#ltoCatDrpDwnDivSub').removeClass('active');
			} else {
				$('#ltoCatDrpDwnDivSub').addClass('active');
			}
		});
	}else if ($('#salesOrg').val() == '1060'){
		$('#ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
			$('#ltoCatDrpDwnDivDept').removeClass('active');
		});
		$('#ltoSelectCancel').on('click', function() {//cancel button inside dropdown
			$('#ltoCatDrpDwnDivDept').removeClass('active');
		});
		$('#ltoCatDrpDwnActiveIdDept').click(function(){ 
			if( $('#ltoCatDrpDwnDivDept').hasClass('active')){
				$('#ltoCatDrpDwnDivDept').removeClass('active');
			} else {
				$('#ltoCatDrpDwnDivDept').addClass('active');
			}
		});
	}else{
		$('#ltoSelectDone').on( 'click', function() {//DOne btn inside drop down
		$('#ltoCatDrpDwnDiv').removeClass('active');
	});
	$('#ltoSelectCancel').on('click', function() {//cancel button inside dropdown
		$('#ltoCatDrpDwnDiv').removeClass('active');
	});
	$('#ltoCatDrpDwnActiveId').click(function(){ 
		if( $('#ltoCatDrpDwnDiv').hasClass('active')){
			$('#ltoCatDrpDwnDiv').removeClass('active');
		} else {
			$('#ltoCatDrpDwnDiv').addClass('active');
		}
	});
	}
	
}

function getAisleInfo()
{
	
	var url = getLTOAisleInfo;
	var param={
			"iv_site_no" : siteVal,
			"iv_session_id" : '000'
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		if(checkResult(response,'aisle_id','LTO Management')){
			$('#ltoAisleDetails').html(getAisleDetails(response[0]));
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'LTO Management');
		stopLoading();
	});

}
function getAisleDetails(obj)
{
	var list = obj.aisle_id.split(',');
	aisleList=list;
	var content = '';
	var count=0;
	for(var i=0;i<list.length;i++)
		{
		count++;
		if(count == 11)
			content+='<span>';
		content+='<input type="checkbox" name="pos" value="'+list[i]+'"><label for="'+list[i]+'" class="labelText">'+list[i]+'</label>';
		if(i==list.length-1)
			content+='</span>';
		if(count%10 == 0)
			content+='<br>';
		}
return content;	
}
function  callCreateOrEditLTOLocationService(from)
{
	if(from != undefined)
	{
	var url = createOrEditLTOLocation;
	var fixtureId='';
	var aisleList='';
	var categoryList='';
	var ltoId='';
	var actionFlag='';
	var editObj=$('#saveLTOChanges').data('editObj');
	console.log(editObj);
	if(from == 'create')
		{
		fixtureId=$('#ltoFixtureType').find(":selected").attr('fixture_id');
		var selectedAisleArray =[];
		$('input[name="pos"]:checked').each(function()
		{
		selectedAisleArray.push($(this).val());
		});
		var selectedCategoryArray =[];
		$('input[name="catDrpDwnChkBx"]:checked').each(function()
		{
			selectedCategoryArray.push($(this).val());
		});
		categoryList = convertArrayToCommaSeparatedString(selectedCategoryArray);
		aisleList = convertArrayToCommaSeparatedString(selectedAisleArray);
		actionFlag='C';
		}
	else if(from == 'edit')
		{
		fixtureId=$('#ltoFixtureTypeInDialog').find(":selected").attr('fixture_id');
		var obj = $('#dialog-edit-lto-location').find('#pop-up-cont').data('selectedObj');
		ltoId = obj.lto_id.toString();
		var selectedAisleArray =[];
		$('input[name="editAisle"]:checked').each(function()
		{
		selectedAisleArray.push($(this).val());
		});
		var selectedCategoryArray =[];
		$('input[name="catDrpDwnChkBxEdit"]:checked').each(function()
		{
			selectedCategoryArray.push($(this).val());
		});
		categoryList = convertArrayToCommaSeparatedString(selectedCategoryArray);
		aisleList = convertArrayToCommaSeparatedString(selectedAisleArray);
		actionFlag='E';
		}
	else if(from == 'delete')
		{
		fixtureId=editObj.fixture_id;
		var obj = $('#dialog-edit-lto-location').find('#pop-up-cont').data('selectedObj');
		ltoId = obj.lto_id.toString();
		var selectedAisleArray =[];
		$('input[name="editAisle"]:checked').each(function()
		{
		selectedAisleArray.push($(this).val());
		});
		var selectedCategoryArray =[];
		$('input[name="catDrpDwnChkBxEdit"]:checked').each(function()
		{
			selectedCategoryArray.push($(this).val());
		});
		categoryList = convertArrayToCommaSeparatedString(selectedCategoryArray);
		aisleList = convertArrayToCommaSeparatedString(selectedAisleArray);
		actionFlag='D';
		}
	
	var param={
			"iv_sales_org": salesOrgVal,
			"iv_site_no": siteVal,
			"iv_fixture_id":fixtureId,
			"iv_aisle_lst":aisleList,
			"iv_cat_lst":categoryList,
			"iv_lto_id":ltoId,
			"iv_user_id":userId,
			"iv_action_flag":actionFlag,
			"iv_session_id" : '000'
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'lto_id','LTO Management')){
			
			if(response[0].msg.toLowerCase().indexOf("success") >= 0)
				{
				$.fn.showCustomMsg([response[0].msg],success,'LTO Management');
				getExistingLTOLocations(from);
				}
			else
				{
				$.fn.showCustomMsg([response[0].msg],error,'LTO Management');
				}
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'LTO Management');
		stopLoading();
	});
}
}

function convertArrayToCommaSeparatedString(input)
{
	return input+'';
}

function callLTOJasperPrint(Aisle,locationDesc,barcode,location,barcodeText, RC, firstAisle, ltoId, ltoBarcodeBanner,Category)
{	
	var obj={					
			aisle		: Aisle,
			locationDesc 		: locationDesc,
			barcode	: barcode,
			location 		: ""+location,
			barcodeText		:barcodeText,
			RC :RC,
			firstAisle :""+firstAisle,
			ltoId :""+ltoId,
			banner :ltoBarcodeBanner,
			Category:Category
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../ltoBarcode/printLTOReportPDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	if(response.data == 'success')
		{
		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	}
	});
}
function triggerLTOPrint(){
	$('#ltoCreateForm').attr("action", "../ltoBarcode/downloadLTOReportPdf.pdf");
	$('#ltoCreateForm').attr('target','_blank');
	$('#ltoCreateForm').attr('method','get');
	$('#ltoCreateForm').submit();
}
function addLeadingZeros (n, length)
{
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}
function onChangeCategoryDropDown() {
	if($("#ltoCategoryDrpDwnDept #ALL DEPARTMENTS").is(':checked')){
		$("#ltoCategoryDrpDwnDept .pointerFix").prop('checked', true);
		
	}
	
	if ($('input[name="catDrpDwnChkBx"]:checked').length == $('input[name="catDrpDwnChkBx"]').length) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('All Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('All Department');
		}else{
		$("#ltoCatDrpDwnLabel").html('All Category');
		}
	} else if ($('input[name="catDrpDwnChkBx"]:checked').length == 0) {
		
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('Select Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('Select Department');
		}else{
		$("#ltoCatDrpDwnLabel").html('Select Category');
		}
						
	} else if ($('input[name="catDrpDwnChkBx"]:checked').length == 1) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html($('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html($('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		}else
		$("#ltoCatDrpDwnLabel").html(
				$('input[name="catDrpDwnChkBx"]:checked').parent().find('label').html());
		
	} else {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelSubCate").html('Multiple Sub-Categories');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelDept").html('Multiple Departments');
		}else{
		$("#ltoCatDrpDwnLabel").html('Multiple Categories');
		}
	}
}
function bindAfterCategoryDrpDwnReady() {
	var bindArea = '';
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		bindArea = $('#ltoCatDrpDwnDivSub');
	}else if($('#salesOrg').val() == '1060') {
		bindArea = $('#ltoCatDrpDwnDivDept.selectDropdown #ltoCategoryDrpDwnDept');
	}else{
		bindArea = $('#ltoCatDrpDwnDiv.selectDropdown #ltoCategoryDrpDwn');
	}
	
	bindArea.find("li input[type=checkbox]").change(function() {
		onChangeCategoryDropDown();
	});

}
function onChangeCategoryEditDropDown() {
	/*if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == $('input[name="catDrpDwnChkBxEdit"]').length) {
		if($('#salesOrg').val() == '1010'){
			$("#ltoCatDrpDwnLabelEdit").html('All Sub-Category');
		}else{
		$("#ltoCatDrpDwnLabelEdit").html('All Category');
		}
	} else if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == 0) {
		if($('#salesOrg').val() == '1010'){
			$("#ltoCatDrpDwnLabelEdit").html('Select Sub-Category');
			}else{
				$("#ltoCatDrpDwnLabelEdit").html('Select Category');
			}
	} else if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == 1) {
		$("#ltoCatDrpDwnLabelEdit").html(
				$('input[name="catDrpDwnChkBxEdit"]:checked').parent().find('label').html());
	} else {
		if($('#salesOrg').val() == '1010'){
			$("#ltoCatDrpDwnLabelEdit").html('Multiple Sub-Categories');
		}else{
		$("#ltoCatDrpDwnLabelEdit").html('Multiple Categories');
		}
	}*/
	
	if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == $('input[name="catDrpDwnChkBxEdit"]').length) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelEditSubCate").html('All Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelEditDept").html('All Department');
		}else{
		$("#ltoCatDrpDwnLabelEdit").html('All Category');
		}
	} else if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == 0) {
		
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelEditSubCate").html('Select Sub-Category');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelEditDept").html('Select Department');
		}else{
		$("#ltoCatDrpDwnLabelEdit").html('Select Category');
		}
						
	} else if ($('input[name="catDrpDwnChkBxEdit"]:checked').length == 1) {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelEditSubCate").html($('input[name="catDrpDwnChkBxEdit"]:checked').parent().find('label').html());
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelEditDept").html($('input[name="catDrpDwnChkBxEdit"]:checked').parent().find('label').html());
		}else
		$("#ltoCatDrpDwnLabelEdit").html(
				$('input[name="catDrpDwnChkBxEdit"]:checked').parent().find('label').html());
		
	} else {
		if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
			$("#ltoCatDrpDwnLabelEditSubCate").html('Multiple Sub-Categories');
		}else if($('#salesOrg').val() == '1060'){
			$("#ltoCatDrpDwnLabelEditDept").html('Multiple Departments');
		}else{
		$("#ltoCatDrpDwnLabelEdit").html('Multiple Categories');
		}
	}
	
}
function bindAfterCategoryEditDrpDwnReady() {
		
	var bindArea = '';
	if($('#salesOrg').val() == '1010' || $('#salesOrg').val() == '1015'){
		bindArea = $('#ltoCategoryDrpDwnEditSubCate');
	}else if($('#salesOrg').val() == '1060') {
		bindArea = $('#ltoCategoryDrpDwnEditDept');
	}else{
		bindArea = $('#ltoCategoryDrpDwnEdit');
	}
	
	bindArea.find("li input[type=checkbox]").change(function() {
		onChangeCategoryEditDropDown();
	});

}

function printLTO(response){
	
	for(var i=0;i<response.length;i++){	
				
		var Category=response[i].category_name;
		
		var AC = "";
		if (salesorgName == 'bws' || salesorgName == 'bigw' || salesorgName == 'danmurphy'){
			
			AC = ("Location"+" "+response[i].lto_id);
			response[i].location= (""+""+response[i].category_name);
			splitLocDesc=response[i].loc_name_to_sort.split("|");
			response[i].loc_name_to_sort=splitLocDesc[0]+" "+splitLocDesc[1];
			response[i].loc_short_name=response[i].loc_name_to_sort;
			
		}		
		
		if(response[i].sub_category_name!=undefined || response[i].sub_category_name!=null )
			response[i].subCategory=response[i].sub_category_name;
		else{
			response[i].subCategory="";
		}
		
		var splitLocDesc;
		if (salesorgName == 'bigw'){
			
			if(splitLocDesc.length >1){	
				response[i].category_name = response[i].category_name == '' ? splitLocDesc[2] : response[i].category_name;
				}
			}else{
				response[i].loc_name_to_sort=(response[i].lto_id);
			}
		
		response[i].total_articles=""+response[i].total_articles;
		response[i].lto_id=""+response[i].lto_id;
		
		var firstAisle = response[i].aisle_name.split(',').slice(0,1); 
		if (salesorgName == 'bws'  || salesorgName == 'danmurphy'){
			response[i].aisle_name=(response[i].category_name);	
		
			response[i].loc_short_name=(response[i].loc_short_name);
		}else{
				response[i].loc_short_name=(response[i].loc_short_name+"."+response[i].lto_id+"."+firstAisle);	}
		
		if(response[i].lto_id.length<7){
			response[i].lto_id=addLeadingZeros(response[i].lto_id,7);
		};
		
		
		
	}
	
		var obj={					
				reportResult:response,
				banner :salesorgName
				};
		//console.log(JSON.stringify(obj));
		$.ajax({
		url: "../ltoBarcode/printLTOReportPDF.htm", //printMultipleLTOReportPDF
		type: "POST",
		dataType: "json",
		contentType:"application/json",
		data:JSON.stringify(obj),
	    cache: false,    //This will force requested pages not to be cached by the browser  
	    processData:false, //To avoid making query String instead of JSON
	    beforeSend: function() {
	        startLoading();
	    },
		success: function(response, textStatus ){
		//console.log(response.data);
		if(response.data == 'success')
			{
			stopLoading();
			}
		//console.log("success");
		},
		error: function(xhr, textStatus, errorThrown){
		console.log('request failed'+errorThrown);
		}
		});
	
}

function printLTODetails(){
	if(ltoIDArray.length>=1){

		var obj={					
				reportResult:ltoIDArray

		};
//		console.log(JSON.stringify(obj));
		$.ajax({
			url: "../ltoBarcode/printLTOBarcodeReportPDF.htm", //printMultipleLTOReportPDF
			type: "POST",
			dataType: "json",
			contentType:"application/json",
			data:JSON.stringify(obj),
			cache: false,    //This will force requested pages not to be cached by the browser  
			processData:false, //To avoid making query String instead of JSON
			beforeSend: function() {
				startLoading();

			},

			success: function(response, textStatus ){ 
//				console.log(response.data);
				if(response.data == 'success')
				{
					stopLoading();
					var printBarcodeMsg='Are you sure you want to print the barcode for selected locations?';
					$.fn.warnPopup('warn',printBarcodeMsg,'Print Barcode Confirmation',triggerPrintBarcodeYes,triggerPrintBarcodeNo,'',$(this));
					//triggerLTOPrint();
				}
//				console.log("success");
			},
			error: function(xhr, textStatus, errorThrown){
				console.log('request failed'+errorThrown);
			}
		});


	}
	else{

		$.fn
		.showCustomMsg(
				[ 'Please select LTO print content.' ],
				error,
		'LTO Management');

	}
}
