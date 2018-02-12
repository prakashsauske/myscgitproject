var report_name = 'Report_GapScan';
var report_title = '';
var totalRecords = '';
var requestParam = '';
var $tblhold = '';
var reasonType ='';
var responseO = '';
var responseR = new Array();
var responseA = new Array();
var content = '';
var totalLen = 0;
var totalLines = 0;
var headerContent = '';
var tabIndex = 0;
var printHeadInnerTable = '';
var deptArrayDesc = new Array();
var empArrayDesc = new Array();
var time ='';
var selectedDate ='';
$(function() {


	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
	
	$("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	});  

	$("#dateFrom").datepicker({
		dateFormat: "dd/mm/yy",
		//FIX for Defect_6170 - UAT_Browser_1S3_0.26 GAP Scan report will only go back a maximum of 7 days however there is the full calendar available to the user
		minDate: "-6D", 
		maxDate: 0,
		zIndex:50,
		onClose: function( selectedDate ) {
			 
			$( "#timeFrom" ).focus();
		}
		
	});
	
	$("#dateTo").datepicker({
		dateFormat: "dd/mm/yy",
		zIndex:50,
		onClose: function( selectedDate ) {
			$( "#timeTo" ).focus();
		}
		
	});		
	
	
	$("#timeTo, #timeFrom").timepicker({
	   hours: { starts: 0, ends: 23 },
	   minutes: { interval: 5 },
	   rows: 4,
	   showPeriodLabels: true,
	   minuteText: 'Min'
	});		




	
	//Code for accordion
	$("#accordion").accordion({
		header:"h3.mainAccordion",
		collapsible: true, 		
		heightStyle: "content" 
	});
	
	$("#generateReport").click(function(){
		//$("#reportContent").removeClass('hideBlock');
		responseA = '';
		responseR = '';
		$("#mainTabs").addClass("hideBlock");//To hide the table on hitting the service.
		if(buildReqParam()){
			callReportService();
		}			
		//$("#_head").remove();//For Css alignment
		//$("#_foot").remove();//For css alignment
		//$("#action_btn_wrap_").addClass("hideBlock");//For css alignment
	});
	
	$("#closeLink").click(function(){				
		$('#accordion').accordion({active : true });			
	});
			
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	
	
	// code for table sorter 
	$(".actionRows").tablesorter();
	
	$(".actionRows tr th").click(function(){	
		
		$('.actionRows tr td').each(function(){				
			$(this).removeClass("sorted");					
		});			
	});
	
	
	$(".actionRows .subHeader th").click(function(){
		
		$('.actionRows tr td').each(function(){				
			$(this).removeClass("sorted");				
		});	
		
		
		
		col=$(this).parent().children().index($(this));		
		
		//col=$('th.sorted').index();
		
		
		$('.actionRows tr').each(function(){				
			$(this).find('td').eq(col).addClass("sorted");				
		});			
	
	});
	
	//$("label.toolTip").tooltip({ 
	//	position: { 
	//		my: "left top", 
	//		at: "left top-50" 
	//	} 
	//});
	
	
	//Checkbox DropDown functions
	$(".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn").click(function(){ 
		$(".selectDropdown").removeClass('active');
	});
	

	
	$("#ds").click(function(){ 
		$("#pus").removeClass('active');
		if( $('#pds').hasClass('active')){
			$("#pds").removeClass('active');
		} else {
			$("#pds").addClass('active');
		}
	});
	
	$("#us").click(function(){ 
		$("#pds").removeClass('active');
		if( $('#pus').hasClass('active')){
			$("#pus").removeClass('active');
		} else {
			$("#pus").addClass('active');
		}
	});
	
	
	 $('html').click(function() {
		$(".selectDropdown").removeClass('active');
	});

	$('.selectDropdown').click(function(event){
	   event.stopPropagation();
	});
	
	$("#mainTabs").tabs({                                                               
        activate:function(event,ui){ //Tab click event 
        	if(reasonType == "both"){/*	
        		tabIndex = ui.newTab.index();
              //  if(tabIndex == 0){
                	//$("#reportContent2").empty();
                	loadActionRequiredTable();
                	if(responseA == undefined || responseA.length <= 0){
                    	$.fn.showCustomMsg(['Sorry, No records found for "Action Required".'],success,'GapScan Report');
                	}
                }else if(tabIndex == 1){
                	//$("#reportContent1").empty();
					loadReviewOnlyTable();
                	if(responseR == undefined || responseR.length <= 0){
                    	$.fn.showCustomMsg(['Sorry, No records found for "Review Only".'],success,'GapScan Report');
                	}
                }
                loadCommonFunctionsForBoth();
        	*/}        	
        }                                                                          
	});
	
	
	/*$("#actionReqLink").click(function(){//Tab
		$("#mainTabs-1").removeClass("hideBlock");
		$("#mainTabs-2").addClass("hideBlock");
	});
	$("#revOnlyLink").click(function(){//Tab
		$("#mainTabs-1").addClass("hideBlock");
		$("#mainTabs-2").removeClass("hideBlock");
	});*/
	populateEmployeeDropDown();
	populateDepartmentDropDown();
	
		
	$("#depDropDwnList #allDeptChkBox").prop("checked",true);//By default all department to be selected.
	$("#empChkBox #allEmpchkBox").prop("checked",true);//By default all department to be selected.
	$('.depdropdown').find("input[type=checkbox]").each(function() {
		$(this).prop('checked', true);
	});					
	$('#deptlst').find("input[type=checkbox]").each(function() {
		$(this).prop('checked', true);
	});
	
	$("#dateFrom").val(getTodayDate());//Default to today date
});


$(document).ready(function() {
	/*$('#sortTable').filterTable({ // apply filterTable to all tables on this page
			filterSelector: '#filter' // use the existing input instead of creating a new one
	});*///TODO
});

/**
 * Populates department drop down values
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
							content += '<li >	<input checked class="depDrpDwnChkBx" type="checkbox" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label for="'
									+ temList[i].node_id
									+'" class="dropdownLabel">'
									+ temList[i].node_desc + '</label></li>';
						}
						
						$('#depDropDwnList #hierDrp').append(content);
						$('#depDropDwnList')
								.append(
										'<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a >Done</a></label><label class="secondaryActionBtn"><a >Cancel</a></label></li>');
						$("#dropdownDoneBtn").on("click", function() {// DOne button inside dept dropdown	
							 var scroll = $(window).scrollTop();
							$("#pds").removeClass('active');
							//$(window).scrollTop(661);
							//$("html, body").animate({ scrollTop: 661 }, 0);
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dept dropdown																		
							//$("#pds").removeClass('active');
							if($("#allDeptChkBox").prop('checked') == false){
								$("#allDeptChkBox").trigger('click');//to select all user by default
							}
							bindAfterDepDrpDwnReady();
							//bindAllDeptCheckBox();
							
						});
						bindAfterDepDrpDwnReady();
						bindAllDeptCheckBox();

					}
				},
				error : function(response) {
				},
			});

}
/**
 * Populates department drop down values
 */
function populateEmployeeDropDown() {
	var param = {};
	console.log(getUsersGapScanUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getUsersGapScanUrl,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input checked class="empDrpDwnChkBx" type="checkbox" '
									+ 'value="'
									+ temList[i].user_id
									+ '" id="'
									+ temList[i].user_id
									+ '">'
									+ '<label for = "'
									+ temList[i].user_id
									+'"class="dropdownLabel">'
									+ temList[i].user_name + '</label></li>';
						}
						$('#pus #empChkBox #hierDrp'  ).append(content);
						$('#empChkBox')
								.append(
										'<li class="selectDropdownActions"><label id="dropdownDoneBtn1" class="actionBtn"><a >Done</a></label><label class="secondaryActionBtn"><a >Cancel</a></label></li>');
						$("#dropdownDoneBtn1").on("click", function() {// DOne button inside dept dropdown																		
							var scroll = $(window).scrollTop();
							$("#pus").removeClass('active');
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dept dropdown																		
							//$("#pus").removeClass('active');
							if($("#allEmpchkBox").prop('checked') == false){
								$("#allEmpchkBox").trigger('click');//to select all user by default
							}
			
							bindAfterEmpDwnReady();
						});
						bindAfterEmpDwnReady();
						bindAllEmpsCheckBox();

					}
				},
				error : function(response) {
				},
			});

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
			$('.depdropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});					
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		}else{ //unselect all
			$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
			$('.depdropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$("#deptSelectAll").prop('checked', false);
		}
	});
}
/**
 * Binds the department checkbox change event in create stock page.
 */
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
 * onCahnge of department drop down invoke this method in create stock take page
 */
function onChangeDeptDropDown(){
	if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
		$("#allDeptChkBox").prop("checked",true);
		$("#deptSelectAll").prop('checked', true);
		$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
	}else if($('.depDrpDwnChkBx:checked').length == 0){
		$("#deptDropDwnLabel").html('Select Deparments');//Department drop down value displayed
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
 * Binds the click event for All emp checkbox under emp drop down
 * in Create stock take page
 */
function bindAllEmpsCheckBox(){
	//Registers dept dropdown's select 'All departments' event
	$("#allEmpchkBox").click(function(){
		if($("#allEmpchkBox").is(':checked')){//Select all
			$("#empDropDwnLabel").html('All employees');//Emp drop down value displayed
			$('.empdropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});	
		}else{ //unselect all
			$("#empDropDwnLabel").html('Select employees');//Emp drop down value displayed
			$('.empdropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
		}
	});
}
/**
 * Binds the emp checkbox change event in create stock page.
 */
function bindAfterEmpDwnReady()
{
	$('#empChkBox').find("li input[type=checkbox]").change(function() {
		if($(this).attr('id') != "allEmpchkBox"){
			onChangeEmpDropDown();
		}		
	});	
		
}
/**
 * onCahnge of emp drop down invoke this method in create stock take page
 */
function onChangeEmpDropDown(){
	if($('.empDrpDwnChkBx:checked').length == $(".empDrpDwnChkBx").length){
		$("#allEmpchkBox").prop("checked",true);
		$("#empDropDwnLabel").html('All employees');//Emp drop down value displayed
	}else if($('.empDrpDwnChkBx:checked').length == 0){
		$("#empDropDwnLabel").html('Select employees');//EMp drop down value displayed
		//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
		$("#allEmpchkBox").prop("checked",false);
	}else if($('.empDrpDwnChkBx:checked').length == 1){
		$("#empDropDwnLabel").html($('.empDrpDwnChkBx:checked').parent().find('label').html());
	} else{
		$("#allEmpchkBox").prop("checked",false);
		$("#empDropDwnLabel").html('Multiple employees');//Emp drop down value displayed
	}		
}
/**
 * Sets the request parameters
 */
function buildReqParam() {
	deptArrayDesc = new Array();
	empArrayDesc = new Array();
	var deptArray = new Array();
	var empArray = new Array();
	reasonType = $("#reasonTypeRadio input[type=radio]:checked").val();
	selectedDate = $("#dateFrom").val();
	var dateToArray = $("#dateFrom").val().split("/");// Date To
	time = $("#timeRadio input[type=radio]:checked").val();
	if(time == "AM/PM"){
		time = "ALL";
	}
	headerContent = '';
	var reasonTypeForReq = '';
	if(reasonType == "actionReq"){
		reasonTypeForReq = "A";
	}else if(reasonType == "revOnly"){
		reasonTypeForReq = "R";
	}
	var valid = validateDate($("#dateFrom").val(),"GapScan Report");
	if(valid){
		valid = validateDateForGapScan($("#dateFrom").val());
	}
	
	if(valid){
		if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){//If all dep selected
			deptArray[0] = "ALL";
		}else{
			$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
				deptArray[deptArray.length] = $(this).val();
			});
		}
		
		if($('.empDrpDwnChkBx:checked').length == $(".empDrpDwnChkBx").length){//If all emp selected
			empArray[0] = "ALL";
		}else{
			$('#empChkBox').find("input[type=checkbox]:checked").each ( function() {
				empArray[empArray.length] = $(this).val();
			});
		}
		
		
		
		/*requestParam = {
				"iv_reason_type" : reasonTypeForReq,
				"iv_department" : deptArray.join(","),
				"iv_date" : dateToArray[2]+dateToArray[1]+dateToArray[0],
				"iv_time" : time,
				"iv_user" : empArray.join(",")
		};*/
		if(deptArray.length == 0){
			deptArray[0] = "ALL";		
		}
		if(empArray.length == 0){
			empArray[0] = "ALL";		
		}
		requestParam = {//for client visit
				"iv_sales_org":$('#salesOrg').val(),
				"iv_reason_type" : reasonTypeForReq,
				"iv_department" : deptArray.join(","),
				"iv_date" : dateToArray[2]+dateToArray[1]+dateToArray[0],
				"iv_time" : time,
				"iv_user" : empArray.join(",")
		};

		
		/*requestParam = {"iv_reason_type":"",
		"iv_department":"",
		"iv_date":"",
		"iv_time":"",
		"iv_user":"100000"
		};*/
		console.log(requestParam);
		
		//Frames header content for report
		var allInputs = '';
		var reasonTypePrint = '';
		var deptNamePrint = '';
		var empNamePrint = '';
		var datePrint = '';
		var timePrint = '';
		
		
		if(reasonType.length > 0){
			if(reasonType == "actionReq"){
				reasonTypePrint =  "Reason Type: Action Required";
			}else if(reasonType == "revOnly"){
				reasonTypePrint =  "Reason Type: Review Only";
			}else if(reasonType == "both"){
				reasonTypePrint =  "Reason Type: Both";
			}
			
		}
		if(deptArray[0] != "ALL"){
			deptArray = new Array();
			$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
				deptArray[deptArray.length] = $(this).parent().find(".dropdownLabel").html();
				deptArrayDesc[deptArrayDesc.length] = $(this).parent().find(".dropdownLabel").html();
			});
		}
		else
			{
			deptArrayDesc[0] = "ALL";
			}
		
		
		if(empArray[0] != "ALL"){
			empArray = new Array();
			$('#empChkBox').find("input[type=checkbox]:checked").each ( function() {
				empArray[empArray.length] = $(this).parent().find(".dropdownLabel").html();
				empArrayDesc[empArrayDesc.length] = $(this).parent().find(".dropdownLabel").html();
			});
		}	
		else
			{
			empArrayDesc[0] = "ALL";
			}
		
		if(deptArray.length > 0){
			deptNamePrint = "Department: "+deptArray.join(",") + " | ";
		}
		if(empArray.length > 0){
			empNamePrint = "Employee: "+empArray.join(",");
		}
		if($("#dateFrom").val().length > 0){
			datePrint = "Date & Time: "+getLastRxdDate($("#dateFrom").val());
		}
		if(time.length > 0){
			timePrint = " "+$("#timeRadio input[type=radio]:checked").val() +" | ";
		}
		
		
		if(allInputs.length > 0 && reasonTypePrint.length > 0){
			allInputs += " | "+reasonTypePrint;
		}else if(reasonTypePrint.length > 0){
			allInputs += reasonTypePrint;
		}
		if(allInputs.length > 0 && datePrint.length > 0){
			allInputs += " | "+datePrint;
		}else if(datePrint.length > 0){
			allInputs += datePrint;
		}
		if(allInputs.length > 0 && timePrint.length > 0){
			allInputs += timePrint;
		}else if(timePrint.length > 0){
			allInputs += timePrint;
		}
		if(deptNamePrint.length > 0){
			allInputs +=  deptNamePrint;
		}
		if(empNamePrint.length > 0){
			allInputs +=  empNamePrint;
		}
		
		
		headerContent = '<label><strong>Gap Scan Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
		+'Report for:</label></br><label class="subtitle">'+ allInputs;
		}
	return valid;
}

/**
 * Invokes gap scan report service
 * @param recvParam
 */
function callReportService() {
	console.log(reportGapScanUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportGapScanUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  //console.log(JSON.stringify(response));	
		  if(response != undefined && response.length > 0 && response[0].article_number != undefined ){
			responseO = response;
			responseR = new Array();
			responseA = new Array();
			var dateTo = $("#dateFrom").val();// Date To
			var time = $("#timeRadio input[type=radio]:checked").val();
			//$("#dateTimeLbl").html($("#dateFrom").val()+","+$("#timeRadio input[type=radio]:checked").val());
			
				$("#mainTabs").removeClass("hideBlock");
				if(reasonType == "actionReq"){	
					var $tblhold = $("#reportContent1");
					$("#reportContent2").empty();
					loadReportContentTbl(responseO,$tblhold,'actionReq');
					totalRecords = responseO.length;
					$("#noRecords").html(totalRecords);//Sets the no of records

					$(".ui-tabs-nav").addClass("hideBlock");
					//$("#mainTabs-1").removeClass("hideBlock");
					hideActionTab('mainTabs-1',false,0);
					hideActionTab('mainTabs-2',true,0);
					//$("#mainTabs-2").addClass("hideBlock");
					$("#mainTabs-1").css('display','block');
					 $(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
					//$(".groupByClear").parent().parent().addClass("hideBlock");//Clear By
					$("#actionReqLbl").addClass("hideBlock");//Show action required label
				}else if(reasonType == "revOnly"){	
					var $tblhold = $("#reportContent2");
					$("#reportContent1").empty();
					loadReportContentTbl(responseO,$tblhold,'revOnly');
					totalRecords = responseO.length;
					$("#noRecords").html(totalRecords);//Sets the no of records
					
					$(".ui-tabs-nav").addClass("hideBlock");
					 //$("#mainTabs-1").addClass("hideBlock");
					 //$("#mainTabs-2").removeClass("hideBlock");
					hideActionTab('mainTabs-1',true,1);
					hideActionTab('mainTabs-2',false,1);
					$("#mainTabs-2").css('display','block');
					 $(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
					// $(".groupByClear").parent().parent().addClass("hideBlock");//Hide clear Group By option aftr grouping			 
					 $("#reviewOnlyLbl").addClass("hideBlock");//Show Review only Label
				}else if(reasonType == "both"){		
					splitTableRecords(response);
					loadActionRequiredTable();
					loadReviewOnlyTable();
					loadCommonFunctionsForBoth();
					$('#mainTabs').tabs({active: ($('#mainTabs li:visible:first').attr('aria-controls') =='mainTabs-1') ? 0 :1});
				}	
				setToController();
			} else {
				if(response != undefined && response.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'GapScan Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured'],error,'GapScan Report');
				}
				$("#reportContent1").html('');
				$("#reportContent2").html('');
				 stopLoading();
			}		
	  }).fail(function() {
			$.fn.showCustomMsg(['Sorry, Some technical issue occured'],error,'GapScan Report');
			$("#reportContent1").html('');
			$("#reportContent2").html('');
			 stopLoading();
	  }).always(function() {
		 
	  });
}

function setToController(){
	var list1 = [];
	var list2 = [];
	if(reasonType == 'both')
		{
	 list1 = ($('#reportContent1 #Report_GapScanactionReq_table').data('confObj')||'')!='' ? 
			 $('#reportContent1 #Report_GapScanactionReq_table').data('confObj').content : [];
	 list2 = ($('#reportContent2 #Report_GapScanrevOnly_table').data('confObj')||'') !='' ?
			 $('#reportContent2 #Report_GapScanrevOnly_table').data('confObj').content : [];
		}
	else
		{
		if(reasonType == 'actionReq')
			list1 = $('#Report_GapScanactionReq_table').data('confObj').content;
		else
			list2 = $('#Report_GapScanrevOnly_table').data('confObj').content;	
		}
	callGapScanJasperPrint(list1,list2);
}
function loadActionRequiredTable(){
	//if(tabIndex == 0){
		var $tblhold = $("#reportContent1");
		if(responseA != undefined && responseA.length > 0 && responseA[0].article_number != undefined){
			loadReportContentTbl(responseA,$tblhold,'actionReq');
			totalRecords = responseA.length;
			$("#noRecords").html(totalRecords);//Sets the no of records
			hideActionTab('mainTabs-1',false,1);
			$('#mainTabs').tabs('option','active',0);
		}else{
			$.fn.showCustomMsg(['Sorry, No records found for "Action Required".'],success,'GapScan Report');//as this is default tab
			hideActionTab('mainTabs-1',true,1);
			$tblhold.html('');
		}
	//}
}
function loadReviewOnlyTable(){
	//if(tabIndex == 1){
		var $tblhold2 = $("#reportContent2");
		if(responseR != undefined && responseR.length > 0 && responseR[0].article_number != undefined){
			loadReportContentTbl(responseR,$tblhold2,'revOnly');
			totalRecords = responseR.length;
			$("#noRecords").html(totalRecords);//Sets the no of records
			hideActionTab('mainTabs-2',false,0);
			$('#mainTabs').tabs('option','active',1);
		}else{
			$.fn.showCustomMsg(['Sorry, No records found for "Review Only".'],success,'GapScan Report');//as this is default tab
			hideActionTab('mainTabs-2',true,0);
			$('#mainTabs').tabs('option','active',0);
			$tblhold2.html('');
		}	
	//}
}
function loadCommonFunctionsForBoth(){
	 $(".ui-tabs-nav").removeClass("hideBlock");
	 //$("#mainTabs-1").removeClass("hideBlock");
	 //$("#mainTabs-2").removeClass("hideBlock");
	 //hideActionTab('mainTabs-1',false,0);
	 //hideActionTab('mainTabs-2',false,0);
	 
	 $(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
	 $(".groupByClear").parent().parent().addClass("hideBlock");//Hide clear Group By option aftr grouping
	 
	 $("#actionReqLbl").addClass("hideBlock");//Hide action required label
	 $("#reviewOnlyLbl").addClass("hideBlock");//Hide Review Only Label
}
/**
 * Binds print click event
 */
function bindPrint() {
	$("#printReportNew").unbind('click');
	$("#printReportNew").on('click',function() {
						/*var list1 = [];
						var list2 = [];
						if(reasonType == 'both')
							{
						 list1 = ($('#reportContent1 #Report_GapScanactionReq_table').data('confObj')||'')!='' ? 
								 $('#reportContent1 #Report_GapScanactionReq_table').data('confObj').content : [];
						 list2 = ($('#reportContent2 #Report_GapScanrevOnly_table').data('confObj')||'') !='' ?
								 $('#reportContent2 #Report_GapScanrevOnly_table').data('confObj').content : [];
							}
						else
							{
							if(reasonType == 'actionReq')
							 list1 = $('#Report_GapScanactionReq_table').data('confObj').content;
							else
								list2 = $('#Report_GapScanrevOnly_table').data('confObj').content;	
							}
						callGapScanJasperPrint(list1,list2); */
						$('#GapScanReportPdf').attr("action", "downloadGapScanReportPdf.pdf");
						$('#GapScanReportPdf').attr('target','_blank');
						$('#GapScanReportPdf').attr('method','get');
						$('#GapScanReportPdf').submit();
				/*	frameReport();
							// document
						var a = window.open();
						$("#printDataForReport").show();
						a.document
								.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
						a.document
								.write(document
										.getElementById('printDataForReport').innerHTML);

						$("#printDataForReport").hide();
						a.focus();
						// call print
						$(a).ready(function() {
							// a.close();
							setTimeout(function() {
								$(document).unbind('click');
								doc = a;
								$(document).click(function() {
									doc.close();
									doc = '';
									$(document).unbind('click');
								});
								a.print();
							}, 1000);
							return true;
						});*/
					});
}
/**
 * */

function callGapScanJasperPrint(actionReqList,revOnlyList)
{
	var reasonTypeDesc = '';
	if(reasonType == 'both')
		{
		reasonTypeDesc = 'Both';
		}
	else if(reasonType == 'actionReq')
		{
		reasonTypeDesc = 'Action Required';
		}
	else if(reasonType == 'revOnly')
		{
		reasonTypeDesc = 'Review Only';
		}
	var obj={
			actionReqList : actionReqList,
			revOnlyList : revOnlyList,
			reason_type : reasonTypeDesc,
			report_date : selectedDate,
			report_time : time,
			dept : deptArrayDesc.toString(),
			employee : empArrayDesc.toString(),
			StoreNo : $('#posSite').val(),
			StoreName : $('#posSiteName').val(),
			};
//	console.log(JSON.stringify(obj));
	$.ajax({
	url: "printReportGapScanPDF.htm",
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
//		window.open('downloadGapScanReportPdf.pdf');
		
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	},
	complete:function(){
		stopLoading();
	}
	});
}
/**
 * Sets report content area and the content
 */
function loadReportContentTbl(response,$tblhold,tableName) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = (new tblReport(report_name,report_title,response,tableName));
	$tblhold.loadtbl(confObj);
	if(reasonType != 'both')
		{
		var reasonDescription = '';
		if(reasonType == 'actionReq')
			{
			reasonDescription = 'Action Required';
			}
		else
			{
			reasonDescription = 'Review Only';
			}
	$tblhold.find('#action_btn_wrap_Report_GapScan'+reasonType).find('#add_grp_link_btn_Report_GapScan'+reasonType).addClass('hideBlock').removeClass('hideBlock').find('label').removeClass('group').text(reasonDescription);
	$tblhold.find('#action_btn_wrap_Report_GapScan'+reasonType).find('#clr_grp_link_btn_Report_GapScan'+reasonType).addClass('hideBlock');
	$tblhold.find('#action_btn_wrap_Report_GapScan'+reasonType).removeClass('hideBlock');
	$tblhold.find('#action_btn_wrap_Report_GapScan'+reasonType).find('#add_grp_link_btn_Report_GapScan'+reasonType).unbind('click');
	$('#printReportDiv').addClass('hideBlock').html('');
	$tblhold.find('#Report_GapScan'+reasonType+'_head div.tableTitle').after('<label id="printReportNew" class=" printButtonFix actionBtn"><label class="print"><a target="_blank">Print</a></label></label>');
	bindPrint();
		}
	else
		{
		$('#printReportDiv').removeClass('hideBlock');
		$('#printReportDiv').html('<label id="printReportNew" class="actionBtn"><label class="print"><a target="_blank">Print</a></label></label>');
		bindPrint();
		}
}


/**
 * Configuration for generation of table in the page
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReport(table_name, table_title, data,tableName) {
	this.option = 'build';
	if(tabIndex == 1 && reasonType == "both"|| reasonType == "revOnly"){
		this.key = [ 'article_number', 'promo_indicator','article_description', 'lastRxdDetails', 'order_multiple', 'soh','non_lto_fill_units' ,'lto_details','gap_reason_comment'];
	}else{
		this.key = [ 'article_number', 'promo_indicator','article_description', 'lastRxdDetails', 'order_multiple', 'soh','non_lto_fill_units' ,'lto_details','gap_reason_comment','actioned_flag'];
	}
	
	this.table_name = table_name+tableName;
	this.table_title = 'Gap Scan report for <strong> '+selectedDate+' , '+time+'</strong> ';
	this.table_class = ' ContentTable cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {article_number : 'Article',promo_indicator:'Promotion',article_description : 'Description',last_received_date : 'Date',last_received_order_no : 'Order#',last_received_qty :' Qty.',order_multiple : 'OM',	soh : 'SOH',non_lto_fill_units : 'Units To Fill',lto_details:'LTO',gap_reason_comment : 'Comment',actioned_flag:'Actioned'};
	this.header_data_type = {};
	this.header_row_type = {article_number : 'main',promo_indicator:'main',article_description : 'main',lastRxdDetails : 'sub',order_multiple : 'main',	soh : 'main',non_lto_fill_units : 'main',lto_details:'main',gap_reason_comment : 'main',actioned_flag:'main'};
	this.header_sub_rows = {lastRxdDetails : {subKeys : [ 'last_received_date',  'last_received_qty','last_received_order_no']}};
	this.header_class = {article_number : '',promo_indicator:'',article_description : '',lastRxdDetails : ' centerValue columnDivider noSort  ',last_received_date : ' centerValue  ',last_received_order_no : '  centerValue   ',last_received_qty : '  centerValue   ',order_multiple : '  centerValue   ',soh : '  centerValue   ',non_lto_fill_units : '  centerValue   ',lto_details:' centerValue ',gap_reason_comment : '  leftValue   ',actioned_flag: ' centerValue'};
	this.header_width = {article_number : '7%',promo_indicator:'5%',article_description : '10%',last_received_date : '8%',last_received_order_no : '5%',last_received_qty : '5%',order_multiple : '2%',soh : '1%',non_lto_fill_units : '2%',lto_details:'3%',gap_reason_comment : '2%',actioned_flag:'2%'};
	this.content_class = {article_number : '',promo_indicator:' centerValue ',article_description : '',	lastRxdDetails : ' centerValue columnDivider noSort  ',last_received_date : ' centerValue  ',last_received_order_no : ' centerValue',last_received_qty : ' centerValue',order_multiple : 'centerValue',soh : ' centerValue',non_lto_fill_units : ' centerValue',lto_details : ' centerValue',gap_reason_comment : ' leftValue',actioned_flag:' centerValue'};
	this.content_format = {article_number : 'removeNull',promo_indicator:'removeNull',article_description : 'removeNull',last_received_date : 'mobi_date',last_received_order_no : 'removeNull',last_received_qty : 'removeNull',order_multiple : 'removeNull',	soh : 'removeNull',non_lto_fill_units : 'removeNull',lto_details:'removeNull',gap_reason_comment : 'removeNull',actioned_flag:'removeNul'};
	this.content_width = {article_number : '',promo_indicator:'',article_description : '',last_received_date:'',last_received_order_no:'',last_received_qty:'',order_multiple : '',	soh : '',non_lto_fill_units : '',lto_details:'',gap_reason_comment : ''};
	this.header_td_label = {lastRxdDetails : 'Last Received Details',promo_indicator:'Promotion'};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.default_groupbyColumn = [ 'gap_reason_desc' ];
	this.groupbyColumn = {'gap_reason_desc' : 'gap_reason_desc'};
	this.group_cont_function = {gap_reason_desc : getReasonGrpCont};
	this.cont_data_function = {promo_indicator:showPromoIndicator,last_received_qty:showLastRxdQty,non_lto_fill_units:showUnitsToFillDetails,lto_details:showLTODetails,soh:showSOHDetails,last_received_date:showLastRxdDate,actioned_flag:showActionedDetails};
	//this.cont_sort_function = {promo_indicator:getPromoIndicator,last_received_qty:getLastRxdQty};
	this.groupby = true;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = false;
	this.content_bind_event = {click : ''};
	this.content_tr_addon = {click : ''};
	this.content_td_addon = {click : ''};
	this.content_label = {};
	this.legend = '<div class="legend"><label> Legend: * Single Price Promo, # Multibuy, @  In-Store Promo </label></div>';
}
/**
 * Customizes the type value
 */
var showPromoIndicator = function(obj){
	var inpu= "";
	if(obj.promo_indicator == "1"){
		inpu= "*";
	}else if(obj.promo_indicator == "2"){
		inpu= "#";
	}else if(obj.promo_indicator == "3"){
		inpu= "@";
	}
	obj.promo_ind = inpu;
	return (inpu);
};
/**
 * Determins the type sorting order
 */
var getPromoIndicator = function(){
	return 'promo_indicator';
};
var showLastRxdQty = function(obj){
	var qty = "";
	var uom ="";
	if(obj.last_received_qty != undefined && obj.last_received_qty != null){
		qty = obj.last_received_qty;
	}
	if(obj.last_received_uom != undefined && obj.last_received_uom != null){
		uom = obj.last_received_uom;
	}
	if( qty!=null)
		return (qty+" "+((!isNaN(qty) && Number(qty) >0 && uom != "") ? uom :''));
	else
		return ('');
};
var showUnitsToFillDetails = function(obj){
	var rtnValue = '';
	/*if(obj.lto_details != undefined && obj.lto_details != null && obj.lto_details != '' && obj.lto_details.split(',').length > 0){
		rtnValue = obj.lto_details.split(',')[0].split('-')[1].trim();
	}else{
		rtnValue = obj.non_lto_fill_units;
	}*/
	
	if(obj.non_lto_fill_units != undefined && obj.non_lto_fill_units != null && obj.non_lto_fill_units != ""){
		if (obj.base_uom !='KG' && obj.base_uom != 'L' ){
			
			var split = obj.non_lto_fill_units.split(" ");
			var rtn =split[0] ;
			console.log(rtn);
			
			rtnValueReset = Number(rtn).toFixed(0);
			
			rtnValue = rtnValueReset+" "+split[1];
			
		}else {
			
			var split = obj.non_lto_fill_units.split(" ");
			var rtn =split[0] ;
			console.log(rtn);
			
			rtnValueReset = Number(rtn).toFixed(3);
			
			rtnValue = rtnValueReset+" "+split[1];
		}
	}
	else{		
		rtnValue="";
	}

	obj.units_to_fill = rtnValue;
	return rtnValue;
};

var showLTODetails = function(obj)
{
	var array = [];
	var rtnValue = '';
	var tempValue = '';
	if(obj.lto_details != undefined && obj.lto_details != null && obj.lto_details != '' && obj.lto_details.split(',').length > 0){
		array = obj.lto_details.split(',');
		for(var i=0;i<array.length;i++){
			if(i == 0){
				rtnValue =array[i].split('-')[0].trim();
				tempValue =array[i].split('-')[0].trim();
			}else{
				rtnValue += ',</br>'+array[i].split('-')[0].trim();
				tempValue += ','+array[i].split('-')[0].trim();
			}
		}
	obj.lto = tempValue;
	}
	return rtnValue;
};
var showSOHDetails = function(obj){	
	return deciValues('','','','',obj.soh,'','',obj.base_uom,false)+" "+(obj.base_uom  || '');
};
var getLastRxdQty = function(){
	return 'last_received_qty';
};
var showLastRxdDate = function(obj){	
	return getLastRxdDate(obj.last_received_date);
};
var showActionedDetails = function(obj){	
	var rtnVal = '';
	if(obj.actioned_flag == 'Y'){
		rtnVal =  'Yes';
	}else{
		rtnVal =  'No';
	}
	obj.action = rtnVal;
	return rtnVal;
};
function getLastRxdDate(last_received_date){
	var formatedDate = '';//dd/mm/yy
	var formatedDateArray = new Array();
	if(last_received_date != '' && last_received_date != undefined){
		formatedDateArray = last_received_date.split("/");
		formatedDate = formatedDateArray[1]+"/"+formatedDateArray[0]+"/"+formatedDateArray[2].substring(2,4);
	}
	return formatedDate;
}
/**
 * Group by reason content
 */
var getReasonGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.gap_reason_comment_1 || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Frames print screen content
 * @param data
 */
function frameReport() {
	var map = '';
	var groupBy = $(".groupByRadios input[type=radio]:checked").val();// Group By
	var mapA = '';var mapR = '';
																		
	
	//console.log('group by is--' + groupBy);
	
	
	content = '';
	printHeadInnerTable = '';
	
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

			+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator">|</label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page'
			+ '<label class="currentPagePrint">1</label> of '
			+ '<label class="totalPage">1</label>'
			+ ' </div>'
			+ '</div>'
			+ '</div>';
	
	
	if ($('#actionReq').is(':checked')) {	
		
		constructHeaderTbl1();
		content += printHeadInnerTable;
		constructHeaderTbl();
		
		map = $groupBy(responseO, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
			return obj.gap_reason_comment_1;
		});
		totalLen = 0;totalLines=0;
		for ( var m in map) {
			totalLen++;
			for ( var i = 0; i < map[m].length; i++) {
				totalLen++;
				if(map[m][i].article_description.length >= 15){
					totalLen = totalLen + 0.5*(map[m][i].article_description.length/15);
				}
			}
		}
		
		frameTable(printFoot,map, totalLen);
	} else if ($('#revOnly').is(':checked')) {
		
		constructHeaderTbl1();
		content += printHeadInnerTable;
		constructHeaderTbl();
		
		map = $groupBy(responseO, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
			return obj.gap_reason_comment_1;
		});
		totalLen = 0;totalLines=0;
		for ( var m in map) {
			totalLen++;
			for ( var i = 0; i < map[m].length; i++) {
				totalLen++;
				if(map[m][i].article_description.length >= 15){
					totalLen = totalLen + 0.5*(map[m][i].article_description.length/15);
				}
			}
		}
		frameTable(printFoot,map, totalLen);
	} else if ($('#both').is(':checked')) {
		mapA = $groupBy(responseA, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
			return obj.gap_reason_comment_1;
		});
		totalLen = 0;totalLines=0;
		for ( var m in mapA) {
			totalLen++;
			for ( var i = 0; i < mapA[m].length; i++) {
				totalLen++;
				if(mapA[m][i].article_description.length >= 15){
					totalLen = totalLen + 0.5*(mapA[m][i].article_description.length/15);
				}
			}
		}
		var aTotalLen = totalLen;
		mapR = $groupBy(responseR, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
			return obj.gap_reason_comment_1;
		});
		for ( var m in mapR) {
			totalLen++;
			for ( var i = 0; i < mapR[m].length; i++) {
				totalLen++;
				if(mapR[m][i].article_description.length >= 15){
					totalLen = totalLen + 0.5*(mapR[m][i].article_description.length/15);
				}
			}
		}
		
		if(responseA != undefined && responseA.length > 0){
			content = content +'<h4>Action Required</h4>';
			constructHeaderTbl1();
			content += printHeadInnerTable;
			constructHeaderTbl();
			frameTable(printFoot,mapA, aTotalLen);
			content = content+'</tbody></table>';
		}
		if(responseR != undefined && responseR.length > 0){
			content += '</div><h4>Review Only</h4>';//+ printHeadInnerTable;
			constructHeaderTbl1();
			content += printHeadInnerTable;
			constructHeaderTbl();
			frameTable(printFoot,mapR, totalLen);			
		}
			
		
	}
	
	$('#printbodyForReport')
			.html('')
			.append(headerContent + content)
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
function frameTable(printFoot,map, recordLen){
	var count =0;
	var firstpagecreated = false;
	for ( var m in map) {
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
				+ m + '</td></tr>';
		count = count+1;totalLines++;
		for ( var i = 0; i < map[m].length; i++) {
			constructContentTbl(map[m][i]);
			//Split Pages - Starts		
			var firstPageRecords = 10;
			var otherPageRecords = 10;
			totalLines++;
			if(map[m][i].article_description.length >= 15){
				count = count + 0.5*(map[m][i].article_description.length/15);
				totalLines = totalLines + 0.5*(map[m][i].article_description.length/15);
			}
			if (totalLines >= (totalLen)){
				content += '</tbody></table>';
				//content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
				content +='<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: * Single Price Promo, # Multibuy, @  In-Store Promo</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
			}
			if(count>=firstPageRecords && !firstpagecreated){
				count =0;
				if((totalLines + otherPageRecords) >= recordLen){
					constructHeaderTbl2();
				} else{
					constructHeaderTbl();
				}
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;		
				firstpagecreated = true;
			}else {
				if (totalLines >= (totalLen)){
						/*if(count != otherPageRecords && totalLines > firstPageRecords){
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
					}*/
					content += '</tbody></table>' + printFoot + '</div>';					
				}
				else if(count >= otherPageRecords){
					if((totalLines + otherPageRecords) >= recordLen){
						constructHeaderTbl2();
					} else{
						constructHeaderTbl();
					}
					count = 0;					
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable;
				}
				
			}
			count++;
			//Split Pages - Ends

		}
	}
}
function constructHeaderTbl2(){
	printHeadInnerTable =  '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;max-height:780px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="50px">Article</th>'
		+'<th rowspan="2" width="5px"></th>'
		+'<th rowspan="2" class="columnDivider">Description</th>'
		+'<th colspan="3" class="centerValue columnDivider">Last Received Details</th>'
		+'<th rowspan="2" class="centerValue" width="50px">OM</th>'
		+'<th rowspan="2" class="centerValue" width="50px">SOH</th>'
		+'<th rowspan="2" class="centerValue" width="80px">Units to Fill</th>'
		+'<th rowspan="2" class="centerValue" width="100px">LTO</th>'
		+'<th rowspan="2" class="lastColumn leftValue" width="140px">Comment</th>'
		+'</tr><tr class="subHeader">'
		+'<th class="centerValue" width="50px">Date</th>'
		+'<th class="centerValue columnDivider" width="50px">Qty.</th>'
		+'<th class="centerValue" width="50px">Order</th></tr></thead>';
}
/**
 * Builds table header for print
 */
function constructHeaderTbl1() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:580px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="50px">Article</th>'
		+'<th rowspan="2" width="5px"></th>'
		+'<th rowspan="2" class="columnDivider">Description</th>'
		+'<th colspan="3" class="centerValue columnDivider">Last Received Details</th>'
		+'<th rowspan="2" class="centerValue" width="50px">OM</th>'
		+'<th rowspan="2" class="centerValue" width="50px">SOH</th>'
		+'<th rowspan="2" class="centerValue" width="80px">Units to Fill</th>'
		+'<th rowspan="2" class="centerValue" width="100px">LTO</th>'
		+'<th rowspan="2" class="lastColumn leftValue" width="140px">Comment</th>'
		+'</tr><tr class="subHeader">'
		+'<th class="centerValue" width="50px">Date</th>'
		+'<th class="centerValue columnDivider" width="50px">Qty.</th>'
		+'<th class="centerValue" width="50px">Order</th></tr></thead>';																								
	
}
/**
 * Builds table header for print
 */
function constructHeaderTbl() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:700px;max-height:780px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="50px">Article</th>'
		+'<th rowspan="2" width="5px"></th>'
		+'<th rowspan="2" class="columnDivider">Description</th>'
		+'<th colspan="3" class="centerValue columnDivider">Last Received Details</th>'
		+'<th rowspan="2" class="centerValue" width="50px">OM</th>'
		+'<th rowspan="2" class="centerValue" width="50px">SOH</th>'
		+'<th rowspan="2" class="centerValue" width="80px">Units to Fill</th>'
		+'<th rowspan="2" class="centerValue" width="100px">LTO</th>'
		+'<th rowspan="2" class="lastColumn leftValue" width="140px">Comment</th>'
		+'</tr><tr class="subHeader">'
		+'<th class="centerValue" width="50px">Date</th>'
		+'<th class="centerValue columnDivider" width="50px">Qty.</th>'
		+'<th class="centerValue" width="50px">Order</th></tr></thead>';																								
	
}
/**
 * builds table content for print
 * @param data
 */
function constructContentTbl(data) {
	var unitsToFill = 0;
	var promoIndicator = '';
	if(data.lto_details != undefined && data.lto_details != null && data.lto_details.length > 0){
		unitsToFill = data.lto_details.split(',')[0].split('-')[1].trim();
	}else{
		unitsToFill = data.non_lto_fill_units;
	}
	
	if(data.promo_indicator == "1"){
		promoIndicator= "*";
	}else if(data.promo_indicator == "2"){
		promoIndicator= "#";
	}else if(data.promo_indicator == "3"){
		promoIndicator= "@";
	}
	
	content += '<tr class="border_bottom"><td  align="left">' + (data.article_number != null ?  data.article_number: '')
			+ '</td><td class="centerValue">' +  (promoIndicator != null ?  promoIndicator: '')
			+ '</td><td class="centerValue">' +  (data.article_description != null ?  data.article_description: '')
			+ '</td><td class="centerValue">' +   getLastRxdDate(data.last_received_date)
			+ '</td><td class="centerValue">' +  (data.last_received_qty != null ? data.last_received_qty+" "+data.base_uom: '')			
			+ '</td><td class="centerValue">' +  (data.last_received_order_no != null ? data.last_received_order_no: '')
			+ '</td><td class="centerValue">' +  (data.order_multiple != null ? data.order_multiple: '')
			+ '</td><td class="centerValue">' +  (data.soh != null ? data.soh+" "+(data.base_uom  || ''): '')
			+ '</td><td class="centerValue">' +  (unitsToFill != null ? unitsToFill: '')
			+ '</td><td class="centerValue">' +  (data.lto_details != null && data.lto_details != undefined && data.lto_details != '' ?  data.lto_details.split(',')[0].split('-')[0].trim(): '')
			+ '</td><td class="leftValue">' +  (data.gap_reason_comment != null ? data.gap_reason_comment: '');
}
function splitTableRecords(response){
	for(var i=0; i < response.length; i++){
		if(response[i].gap_reason_type == "A"){
			responseA[responseA.length] = response[i];
		}else if(response[i].gap_reason_type == "R"){
			responseR[responseR.length] = response[i];
		}
	}
}
/**
 * Validates the date for gap scan report
 */
function validateDateForGapScan(date){	
	var valid = true;
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var todayDateArray = getTodayDate().split("/");
	var selDateArray = date.split("/");
	var selDate = new Date(selDateArray[2],selDateArray[1]-1,selDateArray[0]);
	var todayDate = new Date(todayDateArray[2],todayDateArray[1]-1,todayDateArray[0]);

	var diffDays = Math.round(Math.abs((todayDate.getTime() - selDate.getTime())/(oneDay)));
	
	if(selDate > todayDate){
		valid = false;
		$.fn.showCustomMsg(['Entered date is greater than today\'s date.'],error,'GapScan Report');
	}else if(diffDays > 6){
		valid = false;
		$.fn.showCustomMsg(['This report is limited to last 7 days. Please choose a valid date.'],error,'GapScan Report');
	}
	return valid;
	
}
/**
 * Time format
 * @returns {String}
 */
function timeformat() {
	var date = new Date();
	if (date.getHours() > 12) {
		hours = (date.getHours()) - 12;
		ampm = "pm";
	} else {
		hours = (date.getHours());
		ampm = "am";
	}
	return (hours < 10 ? ("0" + hours) : hours)
			+ ":"
			+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
					.getMinutes()) + " " + ampm;
}

/**
 * Date format
 * @returns {String}
 */
function dateformat() {
	var date = new Date();
	day = date.getDate();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	return (day < 10 ? ("0" + day) : day) + "/"
			+ (month < 10 ? ("0" + month) : month) + "/"
			+ (year < 10 ? ("0" + year) : year);
}
/**
 * Default date for date to
 * @returns {String}
 */
function dateToformat()
{
	var dayBefore = new Date();
	dayBefore.setDate(dayBefore.getDate() - 1);
	day=dayBefore.getDate();
	month=dayBefore.getMonth()+1;
	year=dayBefore.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
/**
 * Returns today date
 * @returns {String}
 */
function getTodayDate()
{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate());
	day=todayDate.getDate();
	month=todayDate.getMonth()+1;
	year=todayDate.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function hideActionTab(tab,action,active){
	if(action){
	      $("#mainTabs").find('#'+tab+'').addClass('hideBlock');
	      $("#mainTabs").find('[aria-controls="'+tab+'"]').addClass('hideBlock');
	}else{
	      $("#mainTabs").find('#'+tab+'').removeClass('hideBlock');
	      $("#mainTabs").find('[aria-controls="'+tab+'"]').removeClass('hideBlock');
	}
	//$('#mainTabs').tabs({active:active});
}