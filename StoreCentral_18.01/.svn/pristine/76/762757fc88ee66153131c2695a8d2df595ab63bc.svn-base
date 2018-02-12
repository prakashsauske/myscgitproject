var requestParam = '';	
var report_name = 'Report_OOC';
var report_title = '';
var tabIndex = 0;
var data ='';
var totalLen = 0;
var totalLines = 0;
var headerContent = '';
var responseTodayTab = '';
var responseDaterangeTab = '';
var responseSecondTab = '';
var responseTodayTabPrint ='';
var responseSecondTabPrint = '';
var responseO = '';
var allInputs = '';
var deptNoPrint ='';
var catNoPrint='';
var subCatNoPrint='';
var segmentPrint='';
var nodelevel='';
var dateFrom = '';
var dateTo = '';
$(function() {
			//$('head').append('<link rel="stylesheet" href="../../styles/woolworths.css" type="text/css" />'); 
			// Code for profile menu
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

			$("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
			});
				//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			

			$("#closeLink").click(function(){				
				$('#accordion').accordion({active : true });			
			});
			
			
			$("#generateReport").click(function(){
				$(".reportContent").addClass("hideBlock");
				if(buildReqParam()){
					callReportService();
				}
			});
			
			
			
			// Code for calendar
			
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
			/*$("#dateTo").val(getTodayDateForOOC(1));
			$("#dateFrom").val(subDays(1,27));*/

			$("#dateFrom").val(getTodayDateForOOC(1));//from date= current date
			$("#dateTo").val(addDays(1,27));//to date = current date +27 days
			
			
			// Code to show and hide article heirarchy
			
			
			
			
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
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			
			$("input[name='categoryList']").click(function() {	
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
				//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='subCatList']").click(function() {	
				//$("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeIn(400);
								
				$("#segDiv").find(".noSelection").addClass('hideBlock');
				$("#segDiv").find("ul").removeClass('hideBlock');
				$("#segDiv").find(".totalCount").removeClass('hideBlock');	
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='segmentList']").click(function() {	
				//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);
					
				//$("#segDiv").find(".heirachyAction").removeClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeIn(400);
			});
			
			
			$("#tabs").tabs({                                                               
		        activate:function(event,ui){ //Tab click event		        		
	        		tabIndex = ui.newTab.index();
	                if(tabIndex == 0){	
	                	 $("#tabs-1").removeClass("hideBlock");
				    	 $("#tabs-2").addClass("hideBlock");
				    	 $("#reportContent2").empty();
				    	//1st tab today	
						loadTableForToday();							
	                }else if(tabIndex == 1){
	                	 $("#tabs-2").removeClass("hideBlock");
				    	 $("#tabs-1").addClass("hideBlock"); 
				    	 $("#reportContent1").empty();
				    	//2nd tab date
						loadTableFor28();
	                } 
	                loadCommonFunctionFot2Tabs();
		        }                                                                          
			});
			
			
			$('#depH').click(function() {		
				if($(this).is(':checked'))
					$("#articleHierarchy").removeClass('hideBlock');
				else
					$("#articleHierarchy").addClass('hideBlock');
			});
			
			//bindPrint();
			
			//Close Button
			$("#closeLink").click(function(){
				$('#accordion').accordion({active : true });	
			});
			
			/*$("#dateFrom").val(dateFromformat());
			$("#dateTo").val(dateToformat());*/
			
						
			

			//Checkbox DropDown functions
			$("#dropdownDoneBtn").click(function() {
				$(".selectDropdown").removeClass('active');
			});

			// Checkbox DropDown functions
			$(".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn")
					.click(function() {
						$(".selectDropdown").removeClass('active');
			});


			$("#ds").click(function() {
				if ($('#pds').hasClass('active')) {
					$("#pds").removeClass('active');
				} else {
					$("#pds").addClass('active');
				}
			});

			$('html').click(function() {
				$(".selectDropdown").removeClass('active');
			});

			$('.selectDropdown').click(function(event) {
				event.stopPropagation();
			});
			
			bindAllDeptCheckBox();
			populateDepartmentDropDown();
			populateDepartmentForOOC("checkbox");//populates the value in article hierarchy area
		
			
		});

		

/**
 * Populates contents of department drop down
 */

function bindAllDeptCheckBox() {
	// Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function() {
		if ($("#allDeptChkBox").is(':checked')) {// Select all
			$("#deptDropDwnLabel").html('All Departments');
			$('.depDropDown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		} else { // unselect all
			$("#deptDropDwnLabel").html('Select Departments');
			$('.depDropDown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$("#deptSelectAll").prop('checked', false);
		}
	});
}
function getCheckedDropdownNameList(){
	var deptLblList = '';
	var list = $('#deptlst').find('input[name="departmentList"]:checked');
	list.each(
			function() {
				if(deptLblList !='')  deptLblList  += ", ";
				deptLblList +=  $(this).parent().find('.deptLbl').html();
				
	});
}
function bindAfterDepDrpDwnReady() {	
	$('#depDropDwnList').find("li input[type=checkbox]")
			.change(
					function() {
						if ($(this).attr('id') != "allDeptChkBox") {
							onChangeDeptDropDown();
							if ($(this).is(':checked')) {
								$(
										'#deptlst :input[value="'
												+ $(this).attr('id') + '"]')
										.prop('checked', true);
							} else {
								$(
										'#deptlst :input[value="'
												+ $(this).attr('id') + '"]')
										.prop('checked', false);
							}
						}
					});
//	$("#allDeptChkBox").trigger('click');
	selectDefPrimaryDepts();

}
function selectDefPrimaryDepts() {
	// Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if (userPrimaryDepts == undefined) {
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if (userPrimaryDepts != undefined && userPrimaryDepts.length > 0) {
                $("#allDeptChkBox").trigger('click');
		for ( var i = 0; i < userPrimaryDepts.length; i++) {
			$("#depDropDwnList").find("#" + userPrimaryDepts[i]).prop(
					'checked', true);// To check the drop down
			$('#deptlst').find("#" + userPrimaryDepts[i]).prop('checked', true);
		}
	}

	setDeptLblBasedOnDefPrimaryDept();
	onChangeDeptDropDown();

}
function setDeptLblBasedOnDefPrimaryDept() {
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if (userPrimaryDepts == undefined) {
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if (userPrimaryDepts == undefined || userPrimaryDepts.length == 0 || userPrimaryDepts.length <= 0 ) {
	$("#deptDropDwnLabel").html('Select Departments');
	}		
	else if (userPrimaryDepts.length == 1) {
		if($('.dropdown').find("#" + userPrimaryDepts[0]).parent().find(
		'label').html()!=undefined){
	$("#deptDropDwnLabel").html(
				$('.dropdown').find("#" + userPrimaryDepts[0]).parent().find(
						'label').html());}
		else{
			
			$("#deptDropDwnLabel").html('All Departments');
			$('.depDropDown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		}
	} else if (userPrimaryDepts.length == $(".depDrpDwnChkBx").length) {
		$("#deptDropDwnLabel").html('All Departments');
	} else {
		$("#deptDropDwnLabel").html('Multiple Departments');
	}
	if ($(".depDrpDwnChkBx").length == '1'){
		$("#deptDropDwnLabel").html('All Departments');
}
}

function onChangeDeptDropDown() {

	/*//For Defect 7448
	if ($('.dropdownLabel:checked').length==0) {
			$("#allDeptChkBox").prop("checked", false);
		}*/
if ($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length) {
	$("#allDeptChkBox").prop("checked", true);
	$("#deptSelectAll").prop('checked', true);
	$("#deptDropDwnLabel").html('All Departments');// Department drop down
													// value displayed
	if($("#allDeptChkBox").is(':checked')){
		$('#deptlst').find("input[type=checkbox]").each(function() {
			$(this).prop('checked', true);
		});
		}
	
}
else if ($('.depDrpDwnChkBx:checked').length == 0) {
	$("#deptDropDwnLabel").html('Select Departments');// Department drop
														// down value
														// displayed
	$("#allDeptChkBox").prop("checked", false);			//
	$("#deptSelectAll").prop('checked', false);
	// $("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department
	// drop down value displayed
} else if ($('.depDrpDwnChkBx:checked').length == 1) {
	$("#deptDropDwnLabel").html(
			$('.depDrpDwnChkBx:checked').parent().find('label').html());
} else {
	$("#allDeptChkBox").prop("checked", false);
	$("#deptSelectAll").prop('checked', false);
	$("#deptDropDwnLabel").html('Multiple Departments');// Department drop
														// down value
														// displayed
}
}
function populateDepartmentDropDown() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$.ajax({
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
										//'<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a >Done</a></label><label class="secondaryActionBtn"><a >Cancel</a></label></li>');
			'<div class="done-cancel-btn"><li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn" id="deptdropdownCancelBtn"><a href="#">Cancel</a></label></li></div>');
						$("#dropdownDoneBtn").on("click", function() {// DOne button inside dept dropdown	
							 var scroll = $(window).scrollTop();
							$("#pds").removeClass('active');
							//$(window).scrollTop(661);
							//$("html, body").animate({ scrollTop: 661 }, 0);
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dept dropdown																		
							//$("#pds").removeClass('active');
							//if($("#allDeptChkBox").prop('checked') == false){
								 var scroll = $(window).scrollTop();
									$("#pds").removeClass('active');//
							//	$("#allDeptChkBox").trigger('click');//to select all user by default
							//}
							//bindAfterDepDrpDwnReady();	//defect_8672						
							
						});
						bindAfterDepDrpDwnReady();
						if (($("#salesOrg").val() == "1010") || ($("#salesOrg").val() == "1015")){      //For Defect 7448
							
							//$( "#allDeptChkBox" ).trigger('click');
						}

					}
				},
				error : function(response) {
				},
			});

}
function toController(){
	var reportResultArray = [];			
	reportResultArray = formatOOCResult(responseO);
	callOOCJasperPrint(reportResultArray); 	
}

function formatOOCResult(reportResultArray){
	var resu = [];
	if(reportResultArray!=null && reportResultArray!=undefined && reportResultArray.length > 0){
		var groupCont = $groupBy(reportResultArray,function(obj){
			return obj.tab_name;
			});

			var todayCont = groupCont['today'];
			var date_range = groupCont['date_range'];

			if(todayCont!=undefined && todayCont.length>0 && date_range !=null && date_range.length>0){
				var grouptodayCont  = $groupBy(todayCont ,function(obj){
					return obj.article_no;
				});
				for(var i =0;i< date_range.length;i++){
					if(grouptodayCont[date_range[i].article_no]!=undefined){
					date_range[i].tab_name = "today";
					}
				}
				var groupDateRangeCont  = $groupBy(date_range ,function(obj){
					return obj.article_no;
				});
				var tempList = [];
				for(var i =0;i< todayCont.length;i++){
					if(groupDateRangeCont[todayCont[i].article_no] == undefined){
						tempList.push(todayCont[i]);
					}
				}
				tempList = date_range.concat(tempList);
				resu = tempList;
			}else if(todayCont!=undefined && todayCont.length>0){
				resu = todayCont;
			}else if(date_range!=undefined && date_range.length>0){
				resu = date_range;
			}else{
				resu = [];
			}
	}
	try{
		$.fn.sortArrOfObjectsByParam(resu, 'aisle_location',
				true,function(val){return (val||'');},'','');
	}catch(err){
		console.log(err);
	}
	return resu;
}

/**
 * Binds print click event
 */
function bindPrint() {
	$("#printReport").unbind('click');
	$("#printReport").on('click',function() {
		/*var reportResultArray = [];			
		reportResultArray = responseO;
		callOOCJasperPrint(reportResultArray); */
		$('#OOCReportForm').attr("action", "downloadOOCReportPdf.pdf");
		$('#OOCReportForm').attr('target','_blank');
		$('#OOCReportForm').attr('method','get');
		$('#OOCReportForm').submit();
										
						/*frameReport28();
						
						
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
								});
								a.print();
							}, 1000);
							return true;
						});*/
					});
}
/**
 * Builds the request parameters to invoke the service
 * Sets the request parameters
 */
function buildReqParam(){
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();
	var rtnFlag = true;
	headerContent = '';
	
	var deptNoArray = new Array();
	
	dateFrom = $("#dateFrom").val();
	dateTo = $("#dateTo").val();
	var valid = validateDates(dateFrom,dateTo);
	valid = valid ? validatePeriodForOOC(dateFrom,dateTo) : valid;
	var deptVal=$('#deptDropDwnLabel').html();
	var checkDept;
	if(valid){
	checkDept=validateDeptartment(deptVal);
	}
	var dataValid=valid && checkDept;
	if(dataValid){	
		
		if($("#depH").is(':checked')){
			
			//Department selection
			$( "input[name='departmentList']" ).each(function(){
				if($(this).is(':checked')){
					deptArray[deptArray.length] = $(this).val();
					//deptNoArray[deptNoArray.length] =$(this).attr('id');
					//nodelevel ='2';
				}
			});
			//Category
			$( "input[name='category']" ).each(function(){
				if($(this).is(':checked')){
					catArray[catArray.length] = $(this).val();
					deptNoArray = new Array();
					//deptNoArray[deptNoArray.length] =$(this).attr('depid');
					//nodelevel ='3';
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
					deptNoArray = new Array();
					//deptNoArray[deptNoArray.length] =$(this).attr('catid');
					//nodelevel ='4';
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
					deptNoArray = new Array();
					//deptNoArray[deptNoArray.length] =$(this).attr('scatid');
					//nodelevel ='5';
					var index = subCatArray.indexOf($(this).attr('scatid'));
					if(index > -1){
						subCatArray.splice(index, 1);
					}
				}
			});
		}else{
			if($("#allDeptChkBox").is(':checked')){
				$(".depDrpDwnChkBx").each ( function() {
					if($(this).val() != "All Department"){
						//nodelevel ='2';
						deptArray[deptArray.length] = $(this).val();
					//	deptNoArray[deptNoArray.length] =$(this).attr('id');
					}					
				});
			}else{
				$('#hierDrp .depDrpDwnChkBx').each(function(){
					if($(this).is(':checked')){
						deptArray[deptArray.length] = $(this).val();
						//nodelevel ='2';
						//deptNoArray[deptNoArray.length] =$(this).attr('id');
					}
				});
			}			
		}
		
		var dateFromArray = dateFrom.split("/");
		var dateToArray = dateTo.split("/");
		
		deptNoPrint = '';		// clearing all the dept,cat, sub-cat, seg.
		catNoPrint = '';
		subCatNoPrint = '';
		segmentPrint = '';
		
		if(deptArray.length > 0){
			deptNoPrint = deptArray.join(",");
			}
		if(catArray.length > 0){
			catNoPrint = catArray.join(",");
			}
		
		if(subCatArray.length > 0){
			subCatNoPrint = subCatArray.join(",");
			}
		
		if(segArray.length > 0){
			segmentPrint = segArray.join(",");
			}
		
		
			requestParam = {
					"iv_dept_list"		:deptArray.join(","),
					"iv_cat_list"       :catArray.join(","),
					"iv_sub_cat_list"   :subCatArray.join(","),
					"iv_seg_list"       :segArray.join(","),
				    "iv_from_date"		:dateFromArray[1]+"/"+dateFromArray[0]+"/"+dateFromArray[2],
				    "iv_to_date"		:dateToArray[1]+"/"+dateToArray[0]+"/"+dateToArray[2]
					};		
		
		console.log('OOC Report Request- '+requestParam);
		
		//Framing header content for print
		//Department
		var deptNamePrint = '';
		var dateFromPrint = '';
		var dateToPrint = '';
		
		deptArray = new Array();
		//deptNoArray = new Array();
		if($("#depH").is(':checked')){
			
			if($("#deptSelectAll").is(':checked')){				
				deptArray[deptArray.length] = "ALL DEPARTMENTS";
				//deptNoArray[deptNoArray.length] = "ALL DEPARTMENTS";	
			}else{
			$( "input[name='departmentList']" ).each(function(){
				if($(this).is(':checked')){
					deptArray[deptArray.length] = $(this).parent().find('.deptLbl').html();
					//deptNoArray[deptNoArray.length] = $(this).parent().find('.deptLbl').attr('for');
				}			
			});
			};
		}else {
			if($("#allDeptChkBox").is(':checked')){				
				deptArray[deptArray.length] = "ALL DEPARTMENTS";		
			//	deptNoArray[deptNoArray.length] = "ALL DEPARTMENTS";	
			}else{
				//deptArray[deptArray.length] = $('[value = "'+$('#deptSelectOptions').val()+'"').html();
				$('#hierDrp .depDrpDwnChkBx').each(function(){
					if($(this).is(':checked')){
						deptArray[deptArray.length] = $(this).parent().find('.dropdownLabel').html();
						//deptNoArray[deptNoArray.length] = $(this).parent().find('.dropdownLabel').attr('for');
					}
				});
			}	
		}
			
	/*	if ($("#depH").is(':checked')) {
			$("input[name='departmentList']").each(function() {
				if ($(this).is(':checked')) {
					deptArray[deptArray.length] = $(this).val();
				}
			});

			// Category
			$("input[name='category']").each(function() {
				if ($(this).is(':checked')) {
					catArray[catArray.length] = $(this).val();
					var index = deptArray.indexOf($(this).attr('depid'));
					if (index > -1) {
						deptArray.splice(index, 1);
					}
				}
			});

			// Sub Category
			$("input[name='subCat']").each(function() {
				if ($(this).is(':checked')) {
					subCatArray[subCatArray.length] = $(this).val();
					var index = catArray.indexOf($(this).attr('catid'));
					if (index > -1) {
						catArray.splice(index, 1);
					}
				}
			});

			// Segment
			$("input[name='segmentList']").each(function() {
				if ($(this).is(':checked')) {
					segArray[segArray.length] = $(this).val();
					var index = subCatArray.indexOf($(this).attr('scatid'));
					if (index > -1) {
						subCatArray.splice(index, 1);
					}
				}
			});
		} else {
			$('#depDropDwnList').find("input[type=checkbox]:checked").each(
					function() {
						if ($(this).attr('id') != "allDeptChkBox") {
							deptArray[deptArray.length] = $(this).val();
						}
					});
		}*/
		if(dateFrom.length > 0){
			dateFromPrint = "Date from: "+dateFrom + " | ";
		}
		if(dateTo.length > 0){
			dateToPrint = "Date to: "+dateTo + " | ";
		} 
		if(deptArray.length > 0){
			deptNamePrint = "Department: "+deptArray.join(",");
		}
		
		
		allInputs = dateFromPrint;
		allInputs += dateToPrint;
		allInputs += deptNamePrint;
		
		
		
		
	
	}
	return dataValid;
}	
/**
 * Invokes report service
 * @param recvParam
 */
function callReportService() {
	var $tblhold ='';
	console.log(reportOOCUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportOOCUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseO = response;
		  bindPrint();
		 /* response = [{
				  'article_no': '161814',
					  'article_desc': 'Bread Roll Cheese and Bacon Single',
					  'soh': '0',
					  'expiry_date': '12/16/2015-Friday',
					  'aisle_no': 'aisle no',
					  'aisle_no': 'aisle aifhdifhkjhnj'
					  }];*/
			if (response != undefined && response.length > 0 && response[0].article_no != undefined) {
				data = response;
				$(".reportContent").removeClass("hideBlock");				
				totalRecords = response.length;					
				$("#tabs").removeClass('hideBlock'); 
				reframeResponseForTodayTab(response);
				$("#tab1").html("Action Today ("+responseTodayTab.length+")");
				$("#tab2").html($("#dateFrom").val()+"-"+$("#dateTo").val()+"("+responseDaterangeTab.length+")");
				//1st tab today	
				loadTableForToday();				
				//2nd tab date
				loadTableFor28();				
				loadCommonFunctionFot2Tabs();
				toController();
			} else {
				if(response != undefined && response.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'OOC Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured'],error,'OOC Report');
				}
				stopLoading();
		}
	  }).fail(function() {
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured'],error,'OOC Report');
		  stopLoading();
	  }).always(function() {
		  
	  });
}
function loadTableForToday(){
	if(tabIndex == 0){
		if(responseTodayTab.length > 0){
			$tblhold = $("#reportContent1");
			loadReportContentTbl1(responseTodayTab, $tblhold);
			totalRecords = responseTodayTab.length;
			$("#noRecords").html(totalRecords);// Sets the no of records
			$("#todayTabLbl").html("List of articles expiring today");
		}else{
			$("#todayTabLbl").html('');
			$.fn.showCustomMsg(['Sorry, No records found for Today tab.'],success,'OOC Report');
		}
	}
}
function loadTableFor28(){
	if(tabIndex == 1){
		$tblhold = $("#reportContent2");
		loadReportContentTbl2(responseDaterangeTab, $tblhold);
		totalRecords = responseDaterangeTab.length;
		$("#noRecords").html(totalRecords);// Sets the no of records
		$("#secondTabLbl").html("List of articles expiring "+$("#dateFrom").val()+"-"+$("#dateTo").val());
	}
}
function loadCommonFunctionFot2Tabs(){
	 $(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
	 $(".groupByClear").parent().parent().addClass("hideBlock");//Clear By
}
/**
 * Reconstructs the response so as to suit for the first tab
 */
function reframeResponseForTodayTab(response){	
	var object = {};
	var todayArray = [];
	var daterangeArray = [];
	//var todayDate = getTodayDateForOOC(2);
	//var urgentDatesArray = getUrgentIndicatorDates();
	for ( var i = 0; i < response.length; i++) {
		object = {};
		object.article_no = response[i].article_no;
		object.article_desc = response[i].article_desc;
		if(response[i].soh != null){
			if(response[i].soh.split(" ")[1].trim() == "EA"){
				object.soh = Number(response[i].soh.split(" ")[0].trim()).toFixed(0)+" "+response[i].soh.split(" ")[1].trim();
			}
			else{
				object.soh = Number(response[i].soh.split(" ")[0].trim()).toFixed(3)+" "+response[i].soh.split(" ")[1].trim();	
			}
		}
		
		object.base_uom = response[i].base_uom;
		object.aisle_no = response[i].aisle_no;	
		object.expiry_date = response[i].expiry_date;	
		if(response[i].tab_name == "today"){
			//if(determineUrgentIndicator(response[i],urgentDatesArray) == '&#935;'){				
			todayArray.push(object);
			//}
		}else if(response[i].tab_name == "date_range"){
			daterangeArray.push(object);
		}		
	}
	responseTodayTab = todayArray;	
	responseDaterangeTab = daterangeArray;
	console.log("Reframed response for today tab");
	console.log(responseTodayTab);
}
/**
 * Defines the report content load area
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl1(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= new tblReport1(data);	
	$tblhold.loadtbl(confObj);
}

/**
 * Configuration for the creation of PLU report's table
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReportPLU}
 */
function tblReport1(data){
	this.option = 'build';
	this.key = ['article_no','article_desc','soh'];
	this.table_name = report_name;
	this.table_title = report_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {article_no:'Article',article_desc:'Description',soh:'Stock On Hand'},
	this.header_data_type = {article_no:'char',article_desc:'char',soh:'char'},
	this.header_row_type = {article_no:'main',article_desc:'main',soh:'main'},
	this.header_class = {article_no:'centerValue',article_desc:'',soh:''},
	this.header_title = {},
	this.header_width = {article_no:'7%',article_desc:'',soh:'12%'},
	this.content_class = {article_no:'rightValue',article_desc:'',soh:''},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',soh:'removeNull'},
	this.cont_data_function =  '',
	this.content_width =  {article_no:'7%',article_desc:'',soh:'12%'},
	this.content =  data;
	this.pagination = true;
	this.default_groupbyColumn = [ 'aisle_no' ];
	this.groupbyColumn = {'aisle_no' : 'Asile Location'};
	this.group_cont_function = {aisle_no : getAsileGrpHead};
	this.groupby = true;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	//this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}
var showSOHDetails = function(obj){	//to retrun only the number if .00 is after decimal which has  no value
	var str = Number(obj.soh).toFixed(2);
	if(obj.base_uom !="EA"){
		if( str.substr(str.length-3, str.length) == ".00"){
		return obj.soh +" "+ obj.base_uom;
	}else{
		return str+" "+ obj.base_uom;
	}
	}
	else{
		return Number(obj.soh).toFixed(0) +" "+ obj.base_uom;
	}
	
};
/**
 * Defines the report content load area
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl2(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= new tblReport2(data);	
	$tblhold.loadtbl(confObj);
	bindPrint();
}

/**
 * Configuration for the creation of PLU report's table
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReportPLU}
 */
function tblReport2(data){
	this.option = 'build';
	this.key = ['article_no','article_desc','expiry_date','soh'];
	this.table_name = report_name;
	this.table_title = report_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {article_no:'Article',article_desc:'Description',expiry_date:'Expiry',soh:'Stock On Hand'},
	this.header_data_type = {article_no:'char',article_desc:'char',expiry_date:'char',soh:'char'},
	this.header_row_type = {article_no:'main',article_desc:'main',expiry_date:'main',soh:'main'},
	this.header_class = {article_no:'centerValue',article_desc:'',expiry_date:'',soh:''},
	this.header_title = {},
	this.header_width = {article_no:'7%',article_desc:'',expiry_date:'12%',soh:'7%'},
	this.content_class = {article_no:'rightValue',article_desc:'',expiry_date:'',soh:''},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',expiry_date:'removeNull',soh:'removeNull'},
	this.content_width =  {article_no:'7%',article_desc:'',expiry_date:'12%',soh:'7%'},
	this.content =  data;
	this.pagination = true;
	this.default_groupbyColumn = [ 'aisle_no' ];
	this.groupbyColumn = {'aisle_no' : 'aisle_no'};
	this.group_cont_function = {aisle_no : getAsileGrpHead};
	this.cont_data_function = {expiry_date:showNoDays};
	this.cont_sort_function = {expiry_date:getShowNoDays};
	this.groupby = true;
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}
/**
 * Customizes the type value
 */
var showNoDays = function(obj){
	var expDateArray = new Array();
	var currentDayArray = dateformat().split("/");
	var currentDay = new Date(currentDayArray[2],currentDayArray[1]-1,currentDayArray[0]);
	expDateArray = obj.expiry_date.split(",");
	var leastDateArray = expDateArray[0].split("-")[0].split("/");
	var leastDate = new Date(leastDateArray[2],leastDateArray[0]-1,leastDateArray[1]);
	for(var i=0; i < expDateArray.length; i++){
		var tempDateArray =  expDateArray[i].split("-")[0].split("/");
		var tempDate =  new Date(tempDateArray[2],tempDateArray[0]-1,tempDateArray[1]);
		if(leastDate > tempDate){
			leastDate = tempDate;
		}
	}

	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

	var diffDays = Math.round(((leastDate.getTime() - currentDay.getTime())/(oneDay)));	
	(diffDays = (diffDays==1 || diffDays == 0) ? diffDays+" day" : diffDays+" days");
	 return diffDays;
};

/**
 * Determins the type sorting order
 */
var getShowNoDays = function(){
	return 'expiry_date';
};
/**
 * Group by department header
 */
var getAsileGrpHead = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">Aisle '
				+ (obj.aisle_no || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Frames the content for print screen
 * @param data
 */
function frameReport28(){	
	headerContent = '<label><strong>Out of Code Articles Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle">'+ allInputs
	+'</label></br></br><label class="subtitle"><strong>List of articles expiring ('+data.length+')</strong></label></br></br>';
	
	var content = '';
	var dateHeaderArray = new Array();
	var dayHeaderArray = new Array();
	var headerLbl = '';
	var dateArray = new Array();
	var dateDayArray = new Array();
	var newDate = '';
	
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;" class="printDeviceLogTable">'
		+'<tr><th align="left" class="smallText">Article</th>'
		+'<th align="left" class="smallText">Description</th>'
		+'<th align="left" class="smallText"  style="width: 40px !important;">SOH</th>'
		+'<th align="left" class="smallText centerValue">Urgent</th>';
	
	
	 var fromDate = getDate($("#dateFrom").val(),0);
	 var toDate = getDate($("#dateTo").val(),0);
	 var n = 0;
	 while(addDateForOOC(fromDate,n) <= addDateForOOC(toDate,0)) {
		newDate = addDateForOOC(fromDate,n);
		dateDayArray = getFormatteddateForOOC(newDate,0).split("-");
		dateHeaderArray[dateHeaderArray.length] = dateDayArray[0];
		dayHeaderArray[dayHeaderArray.length] = getDay(dateDayArray[1]);
		n++;
	}
	for(var i=0;i<dateHeaderArray.length;i++){
		dateArray = dateHeaderArray[i].split("/");
		headerLbl = dayHeaderArray[i]+"</br><span style='font-weight: normal !important;'>"+dateArray[1]+"/"+dateArray[0]+"</span>";
		printHeadInnerTable += '<th align="centerValue" class="smallText">'+headerLbl+'</th>';
	}
	
	content += printHeadInnerTable;
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
	var firstpagecreated = false;
	var map = $groupBy(data, function(obj) {
		return obj.aisle_no;
	});
	totalLen = 0;totalLines=0;
	for ( var m in map) {
		totalLen++;
		for ( var i = 0; i < map[m].length; i++) {
			totalLen++;
			if(map[m][i].article_desc.length >= 15){
				totalLen = totalLen + 0.5*(map[m][i].article_desc.length/15);
			}
		}
	}
	var urgentDatesArray = getUrgentIndicatorDates();
	for ( var m in map) {
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="'+dateHeaderArray.length+1+'" style="font-weight:bold;background-color: lightgray;">Aisle '
				+ m + '</td></tr>';
		count = count+1;totalLines++;
		for ( var i = 0; i < map[m].length; i++) {
			/*var soh = Number(map[m][i].soh).toFixed(2);
			if(soh.substr(soh.length-3, soh.length) == ".00"){
				soh = map[m][i].soh;
			}*/
			
			content += '<tr class="border_bottom"><td  align="left" style="width: 50px !important;">' +  map[m][i].article_no
			+ '</td><td  align="left" style="width: 120px !important;">' + map[m][i].article_desc
			+ '</td><td style="padding-left: 6px !important;">' + map[m][i].soh;
			
			content += '<td class="centerValue smallText">'+determineUrgentIndicator(map[m][i],urgentDatesArray)+'</td>';
			
			for(var x=0;x<dateHeaderArray.length;x++){
				var status = '';
				if(map[m][i].expiry_date.indexOf(dateHeaderArray[x]) > -1){
					status = '&#935;';//Cross mark
				}
				content += '<td class="centerValue smallText">'+status+'</td>';
			}
			//Split Pages - Starts		
			var firstPageRecords = 11;
			var otherPageRecords = 15;
			totalLines++;
			if(map[m][i].article_desc.length >= 15){
				count = count + 0.5*(map[m][i].article_desc.length/15);
				totalLines = totalLines + 0.5*(map[m][i].article_desc.length/15);
			}
			if (totalLines >= (totalLen)){
				content += '</tbody></table>';
				content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
			}
			if(totalLines>=firstPageRecords && !firstpagecreated){
				count =0;
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;		
				firstpagecreated = true;
			}else {
				if (totalLines >= (totalLen)){
						if(count != otherPageRecords && totalLines > firstPageRecords){
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
					content += '</tbody></table>' + printFoot + '</div>';					
				}
				else if(count >= otherPageRecords){
					count = 0;					
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable;
				}
				
			}
			count++;
			//Split Pages - Ends
		}
	}
			
	
		$('#printbodyForReport')
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
/**
 * Frames the content for print screen
 * @param data
 */
function frameReportToday(){
	var content = '';
	
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;" class="printDeviceLogTable">'
		+'<tr><th align="left">Article</th>'
		+'<th align="left">Description</th>'
		+'<th align="left">Stock On Hand</th>';
	content += printHeadInnerTable;
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

		+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
		+ ' <label class="bold">Printed on: </label>'
		+ '<label class="currentDate"></label>'
		+ '<label class="separator"> </label>'
		+ '<label class="currentTime"></label>'
		+ '</div>'
		+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
		+ '<div class="width35  inline-block right">'
		+ '<div class=" lineheight15 margin5 text-align-right ">Page'

		+ '<label class="currentPagePrint">1</label> of '

		+ '<label class="totalPage">1</label>'

		+ ' </div>' + '</div>' + '</div>';
	var count = 0;
	var firstpagecreated = false;
	var map = $groupBy(responseTodayTab, function(obj) {
		return obj.aisle_no;
	});
	totalLen = 0;totalLines=0;
	for ( var m in map) {
		totalLen++;
		for ( var i = 0; i < map[m].length; i++) {
			totalLen++;
			if(map[m][i].article_desc.length >= 15){
				totalLen = totalLen + 0.5*(map[m][i].article_desc.length/15);
			}
		}
	}
	
	for ( var m in map) {
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
				+ m + '</td></tr>';
		count = count+1;totalLines++;
		for ( var i = 0; i < map[m].length; i++) {
			content += '<tr class="border_bottom"><td  align="left">' +  map[m][i].article_no
			+ '</td><td  align="left">' + map[m][i].article_desc
			+ '</td><td class="centerValue">' + map[m][i].soh;
			//Split Pages - Starts		
			var firstPageRecords = 11;
			var otherPageRecords = 15;
			totalLines++;
			if(map[m][i].article_desc.length >= 15){
				count = count + 0.5*(map[m][i].article_desc.length/15);
				totalLines = totalLines + 0.5*(map[m][i].article_desc.length/15);
			}
			if (totalLines >= (totalLen)){
				content += '</tbody></table>';
				content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
			}
			if(totalLines>=firstPageRecords && !firstpagecreated){
				count =0;
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;		
				firstpagecreated = true;
			}else {
				if (totalLines >= (totalLen)){
						if(count != otherPageRecords && totalLines > firstPageRecords){
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
					content += '</tbody></table>' + printFoot + '</div>';					
				}
				else if(count >= otherPageRecords){
					count = 0;					
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable;
				}
				
			}
			count++;
			//Split Pages - Ends
		}
	}
			
	
		$('#printbodyForReport')
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
function determineUrgentIndicator(data,urgentDatesArray){
	var urgentIndicator = '';
	for(var i = 0;i<urgentDatesArray.length;i++){
		if(data.expiry_date.indexOf(urgentDatesArray[i]) > -1){
			urgentIndicator = '&#935;';//Cross mark
		}
	}
	return urgentIndicator;
}
function getUrgentIndicatorDates(){
	//3 days past+current date+tomorrow date
	var urgentArray = new Array();
	var currentDate = getTodayDateForOOC(2);
	urgentArray[urgentArray.length] = currentDate;//adding current date
	//Add past three days
	urgentArray[urgentArray.length] = subDays(2,1);
	urgentArray[urgentArray.length] = subDays(2,2);
	urgentArray[urgentArray.length] = subDays(2,3);
	//Add tomorrw date
	urgentArray[urgentArray.length] = addDays(2,1);
	return urgentArray;
}
/**
 * Adds days to the date
 * @param date1
 * @param addCount
 * @returns {Date}
 */
function addDateForOOC(date1,addCount) {
    //var tt = document.getElementById('txtDate').value;

    var date = new Date(date1);
    var newdate = new Date(date);

    newdate.setDate(newdate.getDate() + addCount);
    return newdate;
}
/**
 * Retunrns formatted date
 */
function getFormatteddateForOOC(date1,addCount) {

    var date = new Date(date1);
    var newdate = new Date(date);

    newdate.setDate(newdate.getDate() + addCount);
    
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();

    var someFormattedDate = mm + '/' + dd + '/' + y;
    return someFormattedDate+"-"+newdate.getDay();
   // document.getElementById('follow_Date').value = someFormattedDate;
}
function validatePeriodForOOC(dateFrom,dateTo){
	var valid = true;
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var dateFromArray = dateFrom.split("/");
	var dateToArray = dateTo.split("/");
	var newdateFrom = new Date(dateFromArray[2],dateFromArray[1]-1,dateFromArray[0]);
	var newdateTo = new Date(dateToArray[2],dateToArray[1]-1,dateToArray[0]);

	var diffDays = Math.round(Math.abs((newdateTo.getTime() - newdateFrom.getTime())/(oneDay)));
	if(isPastDate(dateFrom)){				//Defect_10196
		valid = false;
		$.fn.showCustomMsg(['Start Date should not be a past date.'],error,'OOC Report');
	}else if(isPastDate(dateTo)){
		valid = false;
		$.fn.showCustomMsg(['End Date should not be a past date.'],error,'OOC Report');
	}else if(diffDays > 27){
		valid = false;
		$.fn.showCustomMsg(['Date range should not exceed 28 days.'],error,'OOC Report');
	}

	
	return valid;	
}

function validateDeptartment(deptVal){
	var checkValue=true;
	if(deptVal=="Select Departments"){	
		checkValue = false;
		$.fn.showCustomMsg(['Please select any department and proceed.'],error,'OOC Report');
	}
	return checkValue;
}
/**
 * Return day string based on the index
 * @param index
 * @returns {String}
 */
function getDay(index){
	if(index == 0){
		return "Sun";
	}else if(index == 1){
		return "Mon";
	}else if(index == 2){
		return "Tue";
	}else if(index == 3){
		return "Wed";
	}else if(index == 4){
		return "Thu";
	}else if(index == 5){
		return "Fri";
	}else if(index == 6){
		return "Sat";
	}
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
/**
 * Returns today date
 * @returns {String}
 */
function getTodayDateForOOC(format)
{
	var todayDate = new Date();
	//todayDate.setDate(todayDate.getDate());
	day=todayDate.getDate();
	month=todayDate.getMonth()+1;
	year=todayDate.getFullYear();
	if(format == 2){
		return (month<10?("0"+month):month)+"/"+(day<10?("0"+day):day)+"/"+(year<10?("0"+year):year);
	}else if(format ==1){
		return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
	}
	
}
/**
 * Subs the diff and returns the date
 * @returns {String}
 */
function subDays(format,diff)
{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() - diff);
	day=todayDate.getDate();
	month=todayDate.getMonth()+1;
	year=todayDate.getFullYear();
	if(format == 2){
		return (month<10?("0"+month):month)+"/"+(day<10?("0"+day):day)+"/"+(year<10?("0"+year):year);
	}else if(format ==1){
		return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
	}
	
}
/**
 * ADDS the diff and returns the date
 * @returns {String}
 */
function addDays(format,diff)
{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + diff);
	day=todayDate.getDate();
	month=todayDate.getMonth()+1;
	year=todayDate.getFullYear();
	if(format == 2){
		return (month<10?("0"+month):month)+"/"+(day<10?("0"+day):day)+"/"+(year<10?("0"+year):year);
	}else if(format ==1){
		return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
	}
	
}
/**
 * Paste date to set date from value
 * @returns {String}
 */
function dateFromformat()
{
	var x = 1; //or whatever offset
	var pastDate = new Date();
	pastDate.setMonth(pastDate.getMonth() - x);	
	day=pastDate.getDate();
	month=pastDate.getMonth()+1;
	year=pastDate.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
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
function callOOCJasperPrint(reportResultArray){
	var obj={			
			reportResult	: reportResultArray,
			reportFor		: allInputs,
			deptNo			: deptNoPrint,
			catNo 			: catNoPrint,
			subCatNo		: subCatNoPrint,
			segment			: segmentPrint,
			nodelevel       : nodelevel,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val(),
			dateFrom	 	: dateFrom,
			dateTo			: dateTo
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "printReportOOCPDF.htm",
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
		/*$('#OOCReportForm').attr("action", "downloadOOCReportPdf.pdf");
		$('#OOCReportForm').attr('target','_blank');
		$('#OOCReportForm').attr('method','get');
		$('#OOCReportForm').submit();*/
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	},
	complete: function(){
		stopLoading();
	}
	});
}

function populateDepartmentForOOC(depType) {      //seperating this method from reporthierarchy.js for defect 
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
							content += '<li >	<input class="department" '+ (defaultOption ? "checked" : "")+ ' type="'+depType+'" name="departmentList" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label class="labelText deptLbl">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('#deptlst').html(content);
						selectDefPrimaryDepts();
						//$("#deptLstCnt").text(temList.length);
						if(typeof selectDefPrimaryDeptList === "function"){
							//selectDefPrimaryDeptList();
							setDeptLblBasedOnDefPrimaryDept();
						}
						bindDepartmentSelectEvent();
					}
				},
				error : function(response) {
				},
			});

}