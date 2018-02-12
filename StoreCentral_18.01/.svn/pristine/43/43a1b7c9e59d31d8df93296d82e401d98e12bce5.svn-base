var report_PLU_name = 'Report_PLU_Table';
var report_PLU_title = '';
var totalRecords = '';
var deptNamePrint = '';
var articleDtlPrint = '';
var includeDelPLUsPrint = '';
var includeDelPLUs = false;
var requestParam = '';
var responseO = '';
var reportForLines = 0;
var articleBasicList = new Array();
var articleRangedFlagMap = {};
var barCodeList = new Array();
var isDefPrimaryDeptSet = false;
var allInputs = '';
$(function() {
	
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			/* Autocomplete Off */
			 
			document.forms[0].autocomplete="off";
			
			$("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
			}); 
			
			//When opening by default cat,subcat,seg select all to be disabled
			$("#catSelectAll").attr("disabled", true);
			$("#sCatSelectAll").attr("disabled", true);
			$("#segSelectAll").attr("disabled", true);
		
			// Code for adding scorllers to the table			
			var tableCols = 0;			
			$("#tableData tbody tr").each(function(){
				var currCount = 0;
				$(this).children("td").each(function(){
					currCount++;
					var colSpan = $(this).attr("colspan");
					if (colSpan > 0) {
						currCount = currCount + (colSpan - 1);
					}
					if (currCount > tableCols)
						tableCols = currCount;
					
				}); // next td
			}); // next tr
			
			
			var width = 0;
			if (tableCols < 12) {
				$("#scrollTable").removeClass('scrollTableContainer');
				$("#scrollWindow").removeClass('scrollWindow');
				$("#scrollBtns").addClass('hideBlock');
			}
			
			if (tableCols > 11){
				width = (tableCols * 45) - 100 ;				
					document.getElementById("scrollWindow").style.width=width + "px"; 
			}
		
			$('#next-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'+=150'}, 'fast');
			});
			
			
			$('#previous-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'-=150'}, 'fast');
			});		
			
			//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			$("#generateReport").click(function(){
				$(".ContentTableWrapper").addClass('hideBlock'); 
				if ($("#searchBaiscBox").val().length > 0) {
					callArticleBasicSearchService($("#searchBaiscBox").val(),true);			
				}else{
					handleGenReport();
				}
			});		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			/* Code for hierarchy  */					
			$("input[name='departmentList']").click(function() {				
				$("#catDiv").find(".noSelection").addClass('hideBlock');
				$("#catDiv").find("ul").removeClass('hideBlock');
				$("#catDiv").find(".totalCount").removeClass('hideBlock');

				$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
				$("#subCatDiv").find("ul").addClass('hideBlock');
				$("#subCatDiv").find(".totalCount").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');				

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			
			$("input[name='categoryList']").click(function() {	
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='subCatList']").click(function() {	
				$("#subCatDiv").find(".heirachyAction").fadeIn(400);
								
				$("#segDiv").find(".noSelection").addClass('hideBlock');
				$("#segDiv").find("ul").removeClass('hideBlock');
				$("#segDiv").find(".totalCount").removeClass('hideBlock');	
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='segmentList']").click(function() {	
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);
					
				$("#segDiv").find(".heirachyAction").fadeIn(400);
			});
			
			// code for table sorter 
			$(".actionRows").tablesorter();
			
			$(".actionRows th").click(function(){
				$('.actionRows tr td').each(function(){				
					$(this).removeClass("sorted");				
				});
				
				col=$(this).parent().children().index($(this));		
				
				$('.actionRows tr').each(function(){				
					$(this).find('td').eq(col).addClass("sorted");				
				});	
			});			
			
			
			// Code to show and hide article heirarchy
			
			$('#depH').click(function(event) {		
				event.stopPropagation();
				if($(this).is(':checked')){
					$("#articleHierarchy").removeClass('hideBlock');									
				}else{
					$("#articleHierarchy").addClass('hideBlock');
				}
					
			});				
			
			
			//Checkbox DropDown functions
			$(".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn").on( "click", function(){ 
				$(".selectDropdown").removeClass('active');
			});		
			
			
			$("#ds").click(function(){ 
				if( $('#pds').hasClass('active')){
					$("#pds").removeClass('active');
				} else {
					$("#pds").addClass('active');
				}				
			});	
						
			 $('html').click(function() {
				$(".selectDropdown").removeClass('active');
			});

			$('.selectDropdown').click(function(event){
			   event.stopPropagation();
			});
			
			 $(document).keypress(function(event) {
				  event.stopPropagation();
				  if (event.which == 13) {	//Enter key				
					 if ($("#searchBaiscBox").val().length > 0) {
						 var tmpVal = $("#searchBaiscBox").val().split('-')[0];
						 if(!isNaN(tmpVal) && $("#searchBaiscBoxList").find("#"+$("#searchBaiscBox").val().split('-')[0]).length > 0){
							 $.fn.showCustomMsg(['Article added already.'],error,'PLU Report');
						 }else{
							 //$("#searchBaiscBoxList").append('<li><label class="articleBasicLabel" id="'+$("#searchBaiscBox").val().split('-')[0]+'">'+$("#searchBaiscBox").val()+'</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
							 callArticleBasicSearchService($("#searchBaiscBox").val().split("-")[0]);
						 }						
						$("#searchBaiscBox").val('');
						/*$(".ui-menu").children().remove();//To hide the list of suggestions displayed
						$(".ui-menu").css("display", "none");//To hide the list of suggestions displayed
*/						return false;
					} 
				  }
			  });
			 
			populateDepartmentDropDown(); //populates values in department drop down

			populateDepartment("checkbox");//populates the value in article hierarchy area
			
			createAutoSuggestChange($('.reportWrapper').find('#searchBaiscBox')); //Auto suggestion for articles			

			bindPrint();
			
			bindAllDeptCheckBox();
			//on change of checkbox under Department drop down
		/*	$(document).on('change', $('#depDropDwnList').find("input[type=checkbox]"), function() {	
				onChangeDeptDropDown();		
			});*/
			
					
			//Close Button
			$("#closeLink").click(function(){
				$('#accordion').accordion({active : true });	
			});
			
		});
function selectDefPrimaryDepts(){
	//Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if(userPrimaryDepts != undefined && userPrimaryDepts.length > 0){
		for(var i=0;i<userPrimaryDepts.length;i++){
			$("#depDropDwnList").find("#"+userPrimaryDepts[i]).prop('checked',true);//To check the drop down
			$('#deptlst').find("#"+userPrimaryDepts[i]).prop('checked',true);//To check dept in article hierarchy
		}
	}
	
}

function selectDefPrimaryDeptList(){
	//Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if(userPrimaryDepts != undefined && userPrimaryDepts.length > 0){
		for(var i=0;i<userPrimaryDepts.length;i++){
			$('#deptlst').find("#"+userPrimaryDepts[i]).prop('checked',true);//To check dept in article hierarchy
		}
	}
	
	$('#deptLstCnt').text($('#deptlst').find('input[name="departmentList"]:checked').length);
}

function setDeptLblBasedOnDefPrimaryDept(){
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if(userPrimaryDepts ==undefined || userPrimaryDepts.length <= 0 ){
		$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
	}else if(userPrimaryDepts.length == 1){
		$("#deptDropDwnLabel").html($('.dropdown').find("#"+userPrimaryDepts[0]).parent().find('label').html());
	}else if(userPrimaryDepts.length == $(".depDrpDwnChkBx").length){
		$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
		$("#allDeptChkBox").prop("checked",true);//defect_9621
		$("#deptSelectAll").prop('checked', true);
	}else{
		$("#deptDropDwnLabel").html('Multiple Departments');//Department drop down value displayed
	}
	
	
	if($("#allDeptChkBox").is(':checked')){	//Select all lable change
		$("#deptDropDwnLabel").html('All Departments');
		}
	
}
/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function bindAllDeptCheckBox(){
	//Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function(){
		if($("#allDeptChkBox").is(':checked')){//Select all
			$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});					
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		}else{ //unselect all
			$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$("#deptSelectAll").prop('checked', false);
		}
	});
}
function bindAfterDepDrpDwnReady()
{
	$('#depDropDwnList').find("li input[type=checkbox]").change(function() {
		if($(this).attr('id') != "allDeptChkBox"){
			onChangeDeptDropDown();	
			if($(this).is(':checked')){
				$('#deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
			}else{
				$('#deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
			}
		}	
	});	
		
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeDeptDropDown(){
	if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
		$("#allDeptChkBox").prop("checked",true);
		$("#deptSelectAll").prop('checked', true);
		$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
	}else if($('.depDrpDwnChkBx:checked').length == 0){
		$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
		//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
	}else if($('.depDrpDwnChkBx:checked').length == 1){
		$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('label').html());
	}else{
		$("#allDeptChkBox").prop("checked",false);
		$("#deptSelectAll").prop('checked', false);
		$("#deptDropDwnLabel").html('Multiple Departments');//Department drop down value displayed
	}		
}
/**
 * Builds the request parameters to invoke the service
 * Sets the request parameters
 */
function buildPLUPReqParam(){
	var articleArray = new Array();
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();
	allInputs = '';
	
	$("#searchBaiscBoxList").find(".articleBasicLabel").each(function(){
		articleArray.push($(this).text().split('-')[0]);
	});
	includeDelPLUs = $('#includeDelPLUs').is(':checked')?'Y':'N';
//	if(articleArray.length <= 0){ //If articles is not selected			//Defect_9621
		if($("#depH").is(':checked')){	
			//Department selection
			$( "input[name='departmentList']" ).each(function(){
				if($(this).is(':checked')){
					deptArray[deptArray.length] = $(this).val();
				}
			});
			//Category
			$( "input[name='category']" ).each(function(){
				if($(this).is(':checked')){
					catArray[catArray.length] = $(this).val();
					var index = deptArray.indexOf($(this).attr('depid'));
					if(index > -1){
						deptArray.splice(index, 1);
					}
				}
			});
			//Sub Category
			$( "input[name='subCat']" ).each(function(){
				if($(this).is(':checked')){
					subCatArray[subCatArray.length] = $(this).val();
					var index = catArray.indexOf($(this).attr('catid'));
					if(index > -1){
						catArray.splice(index, 1);
					}
				}
			});		
			//Segment
			$( "input[name='segmentList']" ).each(function(){
				if($(this).is(':checked')){
					segArray[segArray.length] = $(this).val();
					var index = subCatArray.indexOf($(this).attr('scatid'));
					if(index > -1){
						subCatArray.splice(index, 1);
					}
				}
			});
		}else{
			$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
				deptArray[deptArray.length] = $(this).val();
			});
		}
	//}
	if(includeDelPLUs == 'N'){
		for(var i=0; i<articleArray.length ; i++){
			if(articleRangedFlagMap[articleArray[i] == "N"]){
				articleArray.splice(i, 1);
			}			
		}
	}
	
	
	if(articleArray.length > 0 && articleArray != undefined && articleArray != ''){
		requestParam = {
				"iv_article_list"	:articleArray.join(","),				//Defect_9621
				/*"iv_dept_list"		:'',
				"iv_cat_list"       :'',
				"iv_sub_cat_list"   :'',
				"iv_seg_list"       :'',*/
				"iv_dept_list"		:deptArray.join(","),
				"iv_cat_list"       :catArray.join(","),
				"iv_sub_cat_list"   :subCatArray.join(","),
				"iv_seg_list"       :segArray.join(","),
				"iv_del_plu"        :includeDelPLUs
				};
	}else{
		requestParam = {
				"iv_article_list"	:'',
				"iv_dept_list"		:deptArray.join(","),
				"iv_cat_list"       :catArray.join(","),
				"iv_sub_cat_list"   :subCatArray.join(","),
				"iv_seg_list"       :segArray.join(","),
				"iv_del_plu"        :includeDelPLUs
				};
	}	
	//console.log('PLU Report Request- '+requestParam);
	//Settting data for Print	
	if(articleArray.length > 0){
		articleDtlPrint = "Article: "+articleArray.join(",");
		deptNamePrint = '';
	}else{
		articleDtlPrint = "";
		deptNamePrint = '';
		deptArray = new Array();
		if($("#depH").is(':checked')){			
			$( "input[name='departmentList']" ).each(function(){
				if($(this).is(':checked')){
					deptArray[deptArray.length] = $(this).parent().find('.deptLbl').html();
				}
			});
		}else {
			if($("#allDeptChkBox").is(":checked")){
				deptArray[deptArray.length] = "ALL";
			}else{
				$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
					if($(this).attr('id') != "allDeptChkBox"){
						deptArray[deptArray.length] = $(this).parent().find('.dropdownLabel').html();
					}				
				});
			}
		}

		deptNamePrint = '</br><b>Department: </b>';//+deptArray.slice(0,5)+'</br>'+deptArray.slice(6,20);
		var i =0;
		while(i < deptArray.length){
			if(i ==0){
				deptNamePrint = "Deaprtment: "+deptArray[i];
			}else{
				deptNamePrint = deptNamePrint + "," +deptArray[i];
			}
			i++;
		}	
		
	}
	
	if(includeDelPLUs == 'Y'){
		includeDelPLUsPrint = " | Deleted PLUs Included";
	}else{
		includeDelPLUsPrint = "";
	}
	allInputs = deptNamePrint+articleDtlPrint+includeDelPLUsPrint;
}
function handleGenReport(){
	buildPLUPReqParam();
	callReportPLUService(requestParam);	
}
/**
 * Invokes PLU Report's service
 * @param recvParam
 */
function callReportPLUService(recvParam){	
	
	console.log(reportPLUUrl + ' ' + JSON.stringify(recvParam));	
	$.ajax({
	    type: "POST",
	    url: reportPLUUrl,
	    data: JSON.stringify(recvParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseO = response;
			//console.log(JSON.stringify(responseO));	
			if(responseO != undefined && responseO.length > 0 && responseO[0].plu_code != undefined ){
				$('#accordion').accordion({active : true });
				$(".ContentTableWrapper").removeClass('hideBlock'); 
				var $tblhold = $("#reportPLUContent");
				loadReportContentTbl(responseO,$tblhold);
				totalRecords = responseO.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				toController();
			} else {
				if(responseO != undefined && responseO.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'PLU Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'PLU Report');
				}
				stopLoading();
			}	
	  }).fail(function() {
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'PLU Report');
		  stopLoading();
	  }).always(function() {
		  
	  });

}

function toController(){
	var reportResultArray = [];			
	reportResultArray = $('#'+report_PLU_name+'_table').data('confObj').content;
	callPLUJasperPrint(reportResultArray); 
}
/**
 * Registers 'Generate Report' Click event
 * @param response
 */
function bindPrint(){
	$("#printReportPLU").unbind('click');
	$("#printReportPLU").on('click',function() {
		$('#PLUReportForm').attr("action", "downloadPLUReportPdf.pdf");
		$('#PLUReportForm').attr('target','_blank');
		$('#PLUReportForm').attr('method','get');
		$('#PLUReportForm').submit();
	/*var reportResultArray = [];			
	reportResultArray = $('#'+report_PLU_name+'_table').data('confObj').content;
	callPLUJasperPrint(reportResultArray); */
	/*$("#printReportPLU").click(function(){
		frameReportPLU(responseO);
		//document
		var a = window.open();
		$("#printDataForPLUReport").show();
		a.document
				.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
		a.document
				.write(document
						.getElementById('printDataForPLUReport').innerHTML);

		$("#printDataForPLUReport").hide();
		a.focus();
		// call print
		$(a).ready(function(){
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });	*/	
	});
}
/**
 * Defines the report content load area
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= new tblReportPLU(data);	
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toController();
	});
	bindPrint();
}

/**
 * Configuration for the creation of PLU report's table
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportPLU(data){
	this.option = 'build';
	this.key = ['plu_code','article_no','article_desc','department_name','category_name','sub_category_name','segment_name','article_stat'];
	this.table_name = report_PLU_name;
	this.table_title = report_PLU_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {plu_code:'PLU',article_no:'Article',article_desc:'Description',department_name:'Department',category_name:'Category',sub_category_name:'Sub-category',segment_name:'Segment',article_stat:'Status'},
	this.header_data_type = {plu_code:'char',article_no:'char',article_desc:'char',department_name:'char',category_name:'char',sub_category_name:'char',segment_name:'char',article_stat:'char'},
	this.header_row_type = {plu_code:'main',article_no:'main',article_desc:'main',department_name:'main',category_name:'main',sub_category_name:'main',segment_name:'main',article_stat:'main'},
	this.header_class = {plu_code:'',article_no:'centerValue',article_desc:'',department_name:'',category_name:'',sub_category_name:'',segment_name:'',article_stat:'lastColumn '},
	this.header_title = {},
	this.header_width = {plu_code:'2%',article_no:'2%',article_desc:'9%',department_name:'7%',category_name:'7%',sub_category_name:'7%',segment_name:'5%',article_stat:'7%'},
	this.content_class = {plu_code:'',article_no:'centerValue',article_desc:'',department_name:'',category_name:'',sub_category_name:'',segment_name:'',article_stat:' '},
	this.content_title = {},
	this.content_format = {plu_code:'removeNull',article_no:'removeNull',article_desc:'removeNull',category_name:'removeNull',sub_category_name:'removeNull',segment_name:'removeNull',duration:'removeNull',article_stat:'removeNull'},
	this.content_width =  {plu_code:'2%',article_no:'2%',article_desc:'9%',department_name:'7%',category_name:'7%',sub_category_name:'7%',segment_name:'5%',article_stat:'7%'},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}

/**
 * Frames the content for print screen
 * @param data
 */
function frameReportPLU(data){
	//console.log(data);
	var content = '';
	var headerContent = '';
	var firstPageCreated = false;
	headerContent = '<label><strong>PLU List Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle"> '+deptNamePrint+articleDtlPrint+includeDelPLUsPrint
	+'</label></br></br><label class="subtitle">Total <strong id="noRecords">'+totalRecords+'</strong> records </label>';
	
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;height:90%;min-height:500px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th width="10px">PLU</th><th align="left" width="7px">Article</th><th align="left" width="15px">Description</th><th align="left" width="10px">Department</th><th align="left" width="10px">Category</th><th align="left" width="10px">Sub-cateogry</th><th align="left" width="10px">Segment</th><th align="left" width="10px">Status</th></tr></thead><tbody style="min-height:650px">';
	var printHeadInnerTable1 = '<div class="page"><table style="font-size: 15px;height:45%;min-height:180px;max-height:180px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th width="10px">PLU</th><th align="left" width="7px">Article</th><th align="left" width="15px">Description</th><th align="left" width="10px">Department</th><th align="left" width="10px">Category</th><th align="left" width="10px">Sub-cateogry</th><th align="left" width="10px">Segment</th><th align="left" width="10px">Status</th></tr></thead><tbody style="min-height:650px">';
	if(firstPageCreated){
		content += printHeadInnerTable;
	}else{
		content += printHeadInnerTable1;
	}
	
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

		+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
		+ ' <label class="bold">Printed on: </label>'
		+ '<label class="currentDate"></label>'
		+ '<label class="separator"> </label>'
		+ '<label class="currentTime"></label>'
		+ '</div>'
		+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
		+ '<div class="width35  inline-block right">'
		+ '<div class=" lineheight15 margin5 text-align-right ">Page '

		+ '<label class="currentPagePrint">1</label> of '

		+ '<label class="totalPage">1</label>'

		+ ' </div>' + '</div>' + '</div>';
	var count = 0;
	for ( var i = 0; i < data.length; i++) {
		content += '<tr class="border_bottom">'
				+ '<td style="width:10%" align="center">' + data[i].plu_code
				+ '</td><td  align="left">' + data[i].article_no
				+ '</td><td  align="left">' + data[i].article_desc
				+ '</td><td  align="left">' + data[i].department_name
				+ '</td><td  align="left">' + data[i].category_name
				+ '</td><td  align="left">' + data[i].sub_category_name
				+ '</td><td  align="left">' + data[i].segment_name
				+ '</td><td  align="left">' + data[i].article_stat
				+ '</td></tr>';
		//Split Pages - Starts		
		var firstPageRecords = 5;
		var otherPageRecords = 10;
		if(data[i].article_desc.length > 27){
			count = count + 0.5*(data[i].article_desc.length/27);
		}
		if (i >= (data.length - 1)){
			content += '</tbody></table>';
			content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' + printFoot + '</div>';
		}
		if(i>=firstPageRecords && !firstPageCreated){
			count =0;
			firstPageCreated = true;
			if(firstPageCreated){
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;
			}else{
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable1;
			}
			
		}else {
			if (i >= (data.length - 1)){
					if(count != otherPageRecords && i> firstPageRecords){
					content += '<table><tbody>';
					for(var n=0;n<((otherPageRecords)-count);n++){
						content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
					}
					content += '</tbody></table>';
				}else{
					content += '<table><tbody>';
					for(var n=0;n < ((firstPageRecords)-count);n++){
						content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
					}
					content += '</tbody></table>';
				}
				//content += '</tbody></table>' + printFoot + '</div>';					
			}
			else if(count >= otherPageRecords){
				count = 0;	
				if(firstPageCreated){
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable;
				}else{
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable1;
				}
			}
			
		}
		count++;
		//Split Pages - Ends

	}
			
	
		$('#printbodyForPLUReport')
		.html('')
		.append(headerContent+content)
		.append(
				'<link rel="stylesheet" href="../../styles/reportPrintStyle.css" />');
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
		var len = 0;
		$('.currentPagePrint').each(function() {
			len++;
			$(this).text(len);
		});
		$('.totalPage').text($('.currentPagePrint').length);		
}
function createAutoSuggestChange(elem, elemToBeTriggered, maxAutoListSize) {
	// code for article auto suggest in the text box
	var maxAutoListSize = 10;
	var param = {};
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							param = {
								iv_article : request.term,
								iv_auto_stockR : 'N',
								iv_ranged : 'Y',
								iv_session_id : '',
								iv_auto_stockr_flag : ''
							};
							//changed search length 2 as 3 for better performance
							if (request.term.length == 3) {
								console.log(getarticleguggestions + ' '
										+ JSON.stringify(param));
								// $.ajaxSetup({async: false});
								$
										.post(
												getarticleguggestions,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			if (item.article_no !=undefined || item.article_desc !=undefined){
																			return {
																				value : item.article_no
																						+ '-'
																						+ item.article_desc,
																				text : item.article_no
																						+ '-'
																						+ item.article_desc
																			}; }
																		}));
													}
												});
							} else {
								setTimeout(
										function() {
											if (suggestionList != null
													&& suggestionList != undefined
													&& suggestionList.length > 0) {
												response(sliceFilteredList(
														request,
														suggestionList,
														maxAutoListSize));
											}
										}, 50);
							}
						},
						select : function(event, ui) {

							if ($("#searchBaiscBoxList")
									.find(
											"#"
													+ ui.item.text.toString()
															.split('-')[0]).length > 0) {
								$.fn.showCustomMsg(
										[ 'Article added already.' ], error,
										'LTO Report');
							} else {
								
								/*
								 * articleStdSellPriceMap[response[0].article_no]=response[0].standard_sell_price;
								 * articleAndDescMap[response[0].article_no]=response[0].article_desc;
								 */

								$("#searchBaiscBoxList")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ ui.item.text
																.toString()
																.split('-')[0]
														+ '">'
														+ ui.item.text
																.toString()
														+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
								$("#searchBaiscBox").val('');
								 $(this).val("");
				                   return false;
								 
							}
							
							
						},
						minLength : 2,
						autoFocus : true
					});
	$("#searchBaiscBox").val('');
}

/**
 * Populates value in department drop down
 */
function populateDepartmentDropDown() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input  class="depDrpDwnChkBx" type="checkbox" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label class="dropdownLabel">'
									+ temList[i].node_desc + '</label></li>';							
						}
						$('.dropdown').append(content);
						$('.dropdown').append('<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn"><a href="#">Cancel</a></label></li>');
						$("#dropdownDoneBtn").on( "click", function() {//DOne btn inside drop down
							$(".selectDropdown").removeClass('active');
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dropdown
							//$(".selectDropdown").removeClass('active');
							if($("#allDeptChkBox").prop('checked') == false){
								$("#allDeptChkBox").trigger('click');//to select all user by default
							}
						});
						bindAfterDepDrpDwnReady();
						setDeptLblBasedOnDefPrimaryDept();
						if(!isDefPrimaryDeptSet){
							selectDefPrimaryDepts();
							isDefPrimaryDeptSet = true;
						}
						if($('.depDrpDwnChkBx').is(':checked') == false){
							$("#allDeptChkBox").prop("checked",true);
							if($("#allDeptChkBox").is(':checked')){//Select all
								$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
								$('.dropdown').find("input[type=checkbox]").each(function() {
									$(this).prop('checked', true);
								});					
								$('#deptlst').find("input[type=checkbox]").each(function() {
									$(this).prop('checked', true);
								});
								$("#deptSelectAll").prop('checked', true);
							}
						}
						
					}
				},
				error : function(response) {
				},
			});

}
function callArticleBasicSearchService(article,genReportFlag) {
	var barCodeFlag = (article.length > 7 && !isNaN(article)) ? true : false;
	var reqParamBasicService = '';
	if (barCodeFlag) {
		reqParamBasicService = {
			"iv_article" : article,
			"iv_site" : $("#posSite").val(),
			"iv_sales_org" : $("#salesOrg").val(),
			"iv_supplier" : "",
			"iv_src_supply" : "",
			"iv_ranged" : "N",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_node_level" : "",
			"iv_node_id" : "",
			"iv_desc" : "",
			"iv_article_no" : "N",
			"iv_gtin" : "",
			"iv_barcode_flag" : "Y",
			"iv_auto_stockr_flag" : "",
			"iv_style" : "",
			"iv_colour" : "",
			"iv_article_size" : ""
		};
	} else {
		reqParamBasicService = {
			"iv_article" : article,
			"iv_site" : $("#posSite").val(),
			"iv_sales_org" : $("#salesOrg").val(),
			"iv_supplier" : "",
			"iv_src_supply" : "",
			"iv_ranged" : "N",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_node_level" : "",
			"iv_node_id" : "",
			"iv_desc" : "",
			"iv_article_no" : "Y",
			"iv_gtin" : "",
			"iv_barcode_flag" : "",
			"iv_auto_stockr_flag" : "",
			"iv_style" : "",
			"iv_colour" : "",
			"iv_article_size" : ""
		};
	}
	console.log(articleHeaderBasicUrl + ' '
			+ JSON.stringify(reqParamBasicService));
	$
			.ajax({
				type : "POST",
				url : articleHeaderBasicUrl,
				data : JSON.stringify(reqParamBasicService),
				beforeSend : function() {
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));
						if (response != undefined && response.length > 0
								&& response[0].article_no != undefined) {
							if (response.length == 1) {
								$("#searchBaiscBoxList")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ response[0].article_no
														+ '">'
														+ response[0].article_no+"-"+response[0].article_desc
														+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
								$("#searchBaiscBox").val('');
								if (genReportFlag) {
									handleGenReport();
								}
							} else if (response.length > 1) {
								// selectOption
								$.fn.loadArticlePopUpForStkAdjReport(response,
										onAddToList, '',
										onArticleTdSelectInStockAdjustReport,
										checkboxOption, reqParamBasicService.iv_article);
							}
							toController();

						} else {
							// articleBasicList[articleBasicList.length] =
							// article;
							if (response != undefined && response.length <= 0) {
								$.fn
										.showCustomMsg(
												[ 'Sorry, No results found for the search criteria. Please try again.' ],
												success,
												'PLU Report');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
												error, 'PLU Report');
							}
						}
						stopLoading();
						
					}).fail(function() {
						stopLoading();
			}).always(function() {
				
			});
}
var onAddToList= function (event){
	$elem = $(this);
	var list =[];
	list = Object.keys($elem.data('checkedObj'));
	for(var i=0;i<list.length;i++) {
		if ($("#searchBaiscBoxList").find(
				"#"+ list[i].split('-')[0]).length > 0) {
			  //$.fn.showCustomMsg(['Article added already.'],error,'Create Stocktake');
		}else{
			$("#searchBaiscBox").val(list[i]); 		
			$("#searchBaiscBoxList").append('<li><label class="articleBasicLabel" id="'+$("#searchBaiscBox").val().split('-')[0]+'">'+$("#searchBaiscBox").val()+'</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
			$("#searchBaiscBox").val('');
		}
	}	
};

var onArticleTdSelectInStockAdjustReport = function(event) {event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var len =0;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? {} :checkedObj;
		if($elem.is(':checked')){
			obj.checked = true;
			checkedObj[obj.article_no+'-'+obj.article_desc] = obj;
		}else{
			obj.checked = false;
			delete checkedObj[obj.article_no+'-'+obj.article_desc];
		}
		len = Object.keys(checkedObj).length;
		if(len == 0){
			$selectBtn.text('Add to List').addClass('hideBlock');
		}else{
			$selectBtn.text('Add to List ('+(len >9 ? len : '0'+len)+')').removeClass('hideBlock').data('checkedObj',checkedObj);
		}
	
};
function removeArticleFromBasicList(parentElem){
	$(parentElem).remove();	
	
	//delete articleRangedFlagMap[removeArticle];//delete from map
}
/**
 * Time format
 * @returns {String}
 */
function timeformat()
{
	var date=new Date();
	if(date.getHours()>12)
	{
		hours=(date.getHours())-12;
		ampm="pm";
	}
else
	{
	hours=(date.getHours());
		ampm="am";
	}
return (hours<10?("0"+hours):hours)+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+" "+ampm;
}

/**
 * Date format
 * @returns {String}
 */
function dateformat()
{
	var date=new Date();
	day=date.getDate();
	month=date.getMonth()+1;
	year=date.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
function callPLUJasperPrint(reportResultArray)
{	
	var obj={			
			reportResult	: reportResultArray,
			reportFor		: allInputs,
			storeNo 		: $('#posSite').val(),
			storeName 		: $('#posSiteName').val(),		
			totalCount		: reportResultArray.length
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "printPLUReportPDF.htm",
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
		/*$('#PLUReportForm').attr("action", "downloadPLUReportPdf.pdf");
		$('#PLUReportForm').attr('target','_blank');
		$('#PLUReportForm').attr('method','get');
		$('#PLUReportForm').submit();*/
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	},complete:function(){
		stopLoading();
	}
	});
}