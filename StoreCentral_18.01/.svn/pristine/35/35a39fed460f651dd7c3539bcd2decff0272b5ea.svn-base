var requestParam = '';
var responseD = '';
var responseW = '';
var report_name = 'Overstock Report';
var report_title = '';
var responseD = '';
var responseW = '';
var type = '';
var deptArray = '';
var datePrint = '';
var totalLen = 0;
var totalLines = 0;
var salesorgName = '';
var reportNameDaily = 'Overstock_Daily_Report';
var reportNameWeekly= 'Overstock_Daily_Weekly';
var reportForPrint = '';

		$(function() {
			
			salesorgName = $('#salesorgName').val();
			
			$("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
			}); 
		
		
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
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
			
			//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			
			$("#closeLink").click(function(){				
				$('#accordion').accordion({active : true });			
			});
			
			
		
					
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			
			$(".tooltip").tooltip({ 
				position: { 
					my: "left bottom", 
					at: "left top" 
				} 
			});
			
			
			//Checkbox DropDown functions
			$(".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn").click(function(){ 
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
			
			populateDepartmentDropDown();
			
			populateDateDropDown();
			
			//bindPrint();
			
			//Registers dept dropdown's select 'All departments' event
			bindAllDeptCheckBox();
			
			//on change of checkbox under Department drop down - commented for browser version issue
			/*$(document).on('change', $('.depDrpDwnChkBx').find("input[type=checkbox]"), function() {	
				onChangeDeptDropDown();		
			});*/
			
			$("#generateReport").click(function(){	
				//$(".ContentTableWrapper").addClass('hideBlock'); 
				$("#dailyRptDiv").addClass('hideBlock');
				$("#weeklyRptDiv").addClass('hideBlock');
				buildReqParam();		
				callReportService();						
			});
			$("#dateFrom").val(getTodayDate());
			
			$('#all').click(function(){//Weekly radio button click
				$(".datePicker").removeClass('hideBlock');				
				$(".dateDropDwn").addClass('hideBlock');	
			});

			$('#standard').click(function(){//Daily radio button click
				$(".datePicker").addClass('hideBlock');	
				$(".dateDropDwn").removeClass('hideBlock');
			});
			
});
		
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
									+ '<label for="'
									+ temList[i].node_id
									+'" class="dropdownLabel">'
									+ temList[i].node_desc + '</label></li>';							
						}
						$('#depDropDwnList #hierDrp').append(content);
						$('#depDropDwnList').append('<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn"><a href="#">Cancel</a></label></li>');
						$("#dropdownDoneBtn").on( "click", function() {//DOne btn inside drop down
							$(".selectDropdown").removeClass('active');
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dropdown
							//$(".selectDropdown").removeClass('active');
							if($("#allDeptChkBox").prop('checked') == false){
								$("#allDeptChkBox").trigger('click');//to select all user by default
							}		
							bindAfterDepDrpDwnReady();
							
						});
						bindAfterDepDrpDwnReady();
					
					}	//	----- added for defect 
					var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
					var userPrimaryDepts = primaryDepts[$("#posSite").val()];
					if(userPrimaryDepts == undefined ){
						userPrimaryDepts = primaryDepts['NONE'];
					}
					if (userPrimaryDepts != undefined && userPrimaryDepts.length > 0) {
						for ( var i = 0; i < userPrimaryDepts.length; i++) {
							$('#depDropDwnList').find("#" + userPrimaryDepts[i]).prop('checked', true); 
							}
					}
							
					for(var i in userPrimaryDepts){
						$('#depDropDwnList').find('[value="'+userPrimaryDepts[i]+'"]').prop('checked',true);
						$('#depDropDwnList').find('[value="'+userPrimaryDepts[i]+'"]').trigger('change');
					}
					//----- end
					if(temList.length == 1 ) // defect 6948
						{
						$('#depDropDwnList').find('[value="'+temList[0].node_id+'"]').prop('checked',true);
						$('#depDropDwnList').find('[value="'+temList[0].node_id+'"]').trigger('change');
						}
					

					if($('.depDrpDwnChkBx').is(':checked') == false){
						//$("#allDeptChkBox").prop("checked",true);
						$("#allDeptChkBox").trigger('click');
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
					
				},
				error : function(response) {
				},
			});

}
/**
 * Populates value in date drop down
 */
function populateDateDropDown() {
	var date = '';
	var content = '';
	//Current day
	content = '<option class="values" value="'
		+ getTodayDate()										
		+ '">'+getTodayDate()	
		+ '</option>';	
	$('#dateSelectOptions').append(content);
	//past 6 days
	for(var i=1; i<=6; i++){
		date = addDays(1,-i);
		content = '<option class="values" value="'
			+ date										
			+ '">'+date
			+ '</option>';	
		$('#dateSelectOptions').append(content);
	}
}
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
 * Sets the request parameters
 */
function buildReqParam() {
	deptArray = new Array();
	
	$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
		if($(this).attr('id') != "allDeptChkBox"){
			deptArray[deptArray.length] = $(this).val();
		}	
	});
	
	type = $(".wdtypeRadio input[type=radio]:checked").val();
	if(type == "D"){
		dateArray = $("#dateSelectOptions").val().split("/");
		datePrint = $("#dateSelectOptions").val();
		$("#dailyRpLbl").html(datePrint);
		requestParam = {
				"iv_department" : deptArray.join(","),
				"iv_date" : dateArray[2]+dateArray[1]+dateArray[0]			
		};	
	}else if(type == "W"){
		 var dateRadio = $("#dateRadio input[type=radio]:checked").val();
		 var firstday;
		 var lastday;
		 var first;
		 var last; var curr; var dateArray;
		 if(dateRadio == "CW"){
			 dateArray  = getTodayDate().split("/");
			
		 }else if(dateRadio == "LW"){
			 dateArray = getLastWeekDate().split("/");			
		 }
		 curr = new Date(dateArray[2], dateArray[1]-1, dateArray[0], 00, 00, 00, 00); // month-1
		 first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
		 last = first + 6; // last day is the first day + 6
		 firstday = new Date(curr.setDate(first));
		 lastday = new Date(curr.setDate(last));
			 //For print page
			 datePrint = getZeroAppendedValue(firstday.getDate())+"/"+getZeroAppendedValue(firstday.getMonth()+1)+"/"+firstday.getFullYear()
		 		+ "-" + getZeroAppendedValue(lastday.getDate())+"/"+getZeroAppendedValue(lastday.getMonth()+1)+"/"+lastday.getFullYear();
			 
			 //Sets the label for weekly reports Eg: Overstocks report for 16/11/2015-22/11/2015
			 $("#weeklyRpLbl").html(datePrint);
			requestParam = {
					"iv_department":deptArray.join(","),
					"iv_start_date":firstday.getFullYear()+""+getZeroAppendedValue(firstday.getMonth()+1)+""+getZeroAppendedValue(firstday.getDate()),
					"iv_end_date":lastday.getFullYear()+""+getZeroAppendedValue(lastday.getMonth()+1)+""+getZeroAppendedValue(lastday.getDate())
			}; 
		
	}
	
	//console.log(requestParam);
	
	//For print page
	deptArray = new Array();
	var tempArray = new Array();
	if($("#allDeptChkBox").is(":checked")){
		
		$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
			if($(this).attr('id') != "allDeptChkBox"){
				tempArray[tempArray.length] = $(this).parent().find('.dropdownLabel').html();
			}				
		});
		if(tempArray.length == 1)
			{
			deptArray = tempArray;
			}
		else
		deptArray[deptArray.length] = "ALL";
	}else{
		$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
			if($(this).attr('id') != "allDeptChkBox"){
				deptArray[deptArray.length] = $(this).parent().find('.dropdownLabel').html();
			}				
		});
	}
	
}
/**
 * Appends 0 for values 1 to 9
 * @param value
 * @returns
 */
function getZeroAppendedValue(value){
	if(value <= 9){
		 return "0"+value;
	 }else{
		 return value;
	 }
}

/**
 * Invokes PLU Report's service
 * @param recvParam
 */
function callReportService(){	
	if(type == "W"){
		console.log(reportOverstockWeeklyUrl + ' ' + JSON.stringify(requestParam));
		//Weekly Report
		$.ajax({
		    type: "POST",
		    url: reportOverstockWeeklyUrl,
		    data: JSON.stringify(requestParam),
		    beforeSend: function() {
		    	  startLoading();
		      }
		  }).done(function(response) {
			//console.log(JSON.stringify(response));				
			responseW = constructJSONFromResponse(response);	
			if(responseW != undefined && responseW.length > 0 && responseW[0].reason_desc != undefined){
				$("#weeklyRptDiv").removeClass('hideBlock'); 		
				//$(".ContentTableWrapper").removeClass('hideBlock'); 
				$tblhold = $("#reportContentWeekly");
				loadReportContentTbl(responseW,$tblhold);
				totalRecords = responseW.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				setToControllerWeekly();
			} else {
				if(responseW != undefined && responseW.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'Overstock Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Overstock Report');
				}
				 stopLoading();
			}
		  }).fail(function() {
			  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Overstock Report');
			  stopLoading();
		  }).always(function() {
			  
			 
		  });
	}else if(type == "D"){
		console.log(reportOverstockDailyUrl + ' ' + JSON.stringify(requestParam));
		//Daily Report
		$.ajax({
		    type: "POST",
		    url: reportOverstockDailyUrl,
		    data: JSON.stringify(requestParam),
		    beforeSend: function() {
		    	  startLoading();
		      }
		  }).done(function(response) {
			  responseD = response; 
			  //console.log(JSON.stringify(responseD));
				if(responseD != undefined && responseD.length > 0 && responseD[0].article_number != undefined ){
					 $("#dailyRptDiv").removeClass('hideBlock'); 
					//$(".ContentTableWrapper").removeClass('hideBlock'); 
					var $tblhold = $("#reportContentDaily");
					loadReportContentTbl(responseD,$tblhold);
					totalRecords = responseD.length;
					$("#noRecords").html(totalRecords);//Sets the no of records
					$(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
					$(".groupByClear").parent().parent().addClass("hideBlock");//Hide clear Group By option aftr grouping
					setToControllerDaily();
				} else {
					if(responseD != undefined && responseD.length <= 0 ){
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Overstock Report');
					}else{
						$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Overstock Report');
					}
				}	
				 stopLoading();
		  }).fail(function() {
			  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Overstock Report');
			  stopLoading();
		  }).always(function() {
			  
			 
		  });
	}
}
/**
 * Defines the report content load area
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj;
	if(type == "D"){
		confObj = new tblReportD(data);	
		$tblhold.loadtbl(confObj);
		$tblhold.find('thead tr th').not('.noSort').click(function(){
				setToControllerDaily();
		});
	}else if(type == "W"){
		confObj = new tblReportW(data);	
		$tblhold.loadtbl(confObj);
		$tblhold.find('thead tr th').not('.noSort').click(function(){
				setToControllerWeekly();
		});
	}
	
	bindPrint();
}

/**
 * Configuration for the creation of Daily report's table
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportD(data){
	this.option = 'build';
	this.key = ['article_number','promo_indicator','article_description','soh','mpl','capacity'];
	this.table_name = reportNameDaily;
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {article_number:'Article',promo_indicator:'Promotion',article_description:'Description',soh:'SOH',mpl:'MPL',capacity:'SC'},// for defect 6666
	this.header_data_type = {article_number:'number',promo_indicator:'char',article_description:'char',soh:'number',mpl:'number',capacity:'number'},
	this.header_row_type = {article_number:'main',promo_indicator:'main',article_description:'main',soh:'main',mpl:'main',capacity:'main'},
	this.header_class = {article_number:'',article_description:'leftValue',soh:'centerValue',mpl:'centerValue',capacity:'centerValue'},
	this.header_title = {},
	this.header_width = {article_number:'6%',promo_indicator:'3%',article_description:'25%',soh:'5%',mpl:'5%',capacity:'5%'},
	this.content_class = {article_number:'',article_description:'leftValue',soh:'centerValue',mpl:'centerValue',capacity:'centerValue'},
	this.content_title = {},
	this.content_format = {article_number:'removeNull',promo_indicator:'removeNull',article_description:'removeNull',soh:'removeNull',mpl:'removeNull',capacity:'removeNull',segment_name:'removeNull',duration:'removeNull',article_stat:'removeNull'},
	this.content_width =  {article_number:'6%%',promo_indicator:'3%',article_description:'25%',soh:'5%',mpl:'5%',capacity:'5%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.cont_data_function = {soh:showSOHDetails,mpl:showMPLDetails,capacity:showCapacityDetails};
	this.content =  data;
	this.pagination = true;
	this.groupby= true;
	this.default_groupbyColumn = [ 'reason_desc' ];
	this.groupbyColumn = {'reason_desc' : 'reason_desc'};
	this.group_cont_function = {reason_desc : getReasonGrpCont};
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.legend = '<div class="legend"><label> Legend: * Single Price Promo, # Multibuy, @ In-store Promo </label></div>';
	this.content_td_addon = {};
}
var showSOHDetails = function(obj){
	var rtnValue = '';
	if(obj.soh != undefined && obj.soh != null && obj.soh != ''){
		obj.soh = formatTo2DecimalPlaces(obj.soh);
		rtnValue = obj.soh+" "+obj.soh_uom;
	}else{
		obj.soh = formatTo2DecimalPlaces('0');
		rtnValue = obj.soh+" "+obj.soh_uom;
	}
	return rtnValue;
};
var showMPLDetails = function(obj){
	if(obj.mpl != undefined && obj.mpl != null && obj.mpl != ''){
		obj.mpl = formatTo2DecimalPlaces(obj.mpl);
	}else{
		obj.mpl = '';
	}
	return obj.mpl;
};
var showCapacityDetails = function(obj){
	if(obj.capacity != undefined && obj.capacity != null && obj.capacity != ''){
		obj.capacity = formatTo2DecimalPlaces(obj.capacity);
	}else{
		obj.capacity = '';
	}
	return obj.capacity;
};
/**
 * Group by reason content
 */
var getReasonGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.reason_desc || '') + '</td></tr>';
	}
	return cont;
};
/**
 * Configuration for generation of table in the page
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReportW(data) {
	this.option = 'build';
	this.key = [ 'reason_desc', 'monday','tuesday', 'wednesday', 'thursday', 'friday','saturday' ,'sunday','total'];
	this.table_name = reportNameWeekly;
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {reason_desc:'Overstock Reason',mon_count:'Count',mon_prcnt : '%',tue_count:'Count',tue_prcnt : '%',wed_count:'Count',wed_prcnt : '%',thu_count:'Count',thu_prcnt : '%',fri_count:'Count',fri_prcnt : '%',sat_count:'Count',sat_prcnt : '%',sun_count:'Count',sun_prcnt : '%',tot_count:'Count',tot_prcnt : '%'};
	this.header_data_type = {reason_desc : 'number',mon_count:'number',mon_prcnt : 'number',tue_count:'number',tue_prcnt : 'number',wed_count:'number',wed_prcnt : 'number',thu_count:'number',thu_prcnt : 'number',fri_count:'number',fri_prcnt : 'number',sat_count:'number',sat_prcnt : 'number',sun_count:'number',sun_prcnt : 'number',tot_count:'number',tot_prcnt : 'number'};
	this.header_row_type = {reason_desc : 'main',monday:'sub',tuesday : 'sub',wednesday:'sub',thursday : 'sub',friday:'sub',saturday : 'sub',sunday:'sub',total:'sub'};
	this.header_sub_rows = {monday : {subKeys : [ 'mon_count', 'mon_prcnt']},tuesday : {subKeys : [ 'tue_count', 'tue_prcnt']},wednesday : {subKeys : [ 'wed_count', 'wed_prcnt']},thursday : {subKeys : [ 'thu_count', 'thu_prcnt']},friday : {subKeys : [ 'fri_count', 'fri_prcnt']},saturday : {subKeys : [ 'sat_count', 'sat_prcnt']},sunday : {subKeys : [ 'sun_count', 'sun_prcnt']},total : {subKeys : [ 'tot_count', 'tot_prcnt']}};
	this.header_class = {reason_desc : '',monday : ' centerValue columnDivider noSort  ',tuesday : ' centerValue columnDivider noSort  ',wednesday : ' centerValue columnDivider noSort  ',thursday : ' centerValue columnDivider noSort  ',friday : ' centerValue columnDivider noSort  ',saturday : ' centerValue columnDivider noSort  ',sunday : ' centerValue columnDivider noSort  ',total : ' centerValue columnDivider noSort  '};
	this.header_width = {reason_desc:'5%',mon_count:'2%',mon_prcnt:'2%',tue_count:'2%',tue_prcnt : '2%',wed_count:'2%',wed_prcnt : '2%',thu_count:'2%',thu_prcnt : '2%',fri_count:'2%',fri_prcnt : '2%',sat_count:'2%',sat_prcnt : '2%',sun_count:'2%',sun_prcnt : '2%'};
	this.content_class = {reason_desc : '',monday : ' centerValue columnDivider noSort  ',tuesday : ' centerValue columnDivider noSort  ',wednesday : ' centerValue columnDivider noSort  ',thursday : ' centerValue columnDivider noSort  ',friday : ' centerValue columnDivider noSort  ',saturday : ' centerValue columnDivider noSort  ',sunday : ' centerValue columnDivider noSort  ',total : ' centerValue columnDivider noSort  '};
	this.content_format = {reason_desc : 'removeNull',mon_count:'removeNull',mon_prcnt : 'removeNull',tue_count:'removeNull',tue_prcnt : 'removeNull',wed_count:'removeNull',wed_prcnt : 'removeNull',thu_count:'removeNull',thu_prcnt : 'removeNull',fri_count:'removeNull',fri_prcnt : 'removeNull',sat_count:'removeNull',sat_prcnt : 'removeNull',sun_count:'removeNull',sun_prcnt : 'removeNull',tot_count:'removeNull',tot_prcnt : 'removeNull'};
	this.content_width = {reason_desc:'5%',mon_count:'2%',mon_prcnt:'2%',tue_count:'2%',tue_prcnt : '2%',wed_count:'2%',wed_prcnt : '2%',thu_count:'2%',thu_prcnt : '2%',fri_count:'2%',fri_prcnt : '2%',sat_count:'2%',sat_prcnt : '2%',sun_count:'2%',sun_prcnt : '2%',tot_count:'2%',tot_prcnt : '2%'};
	this.header_td_label = {reason_desc:'Overstock Reason',monday : 'Monday',tuesday:'Tuesday',wednesday:'Wednesday',thursday:'Thursday',friday:'Friday',saturday:'Saturday',sunday:'Sunday',total:'Total'};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {click: setToControllerWeekly};/*
	this.default_groupbyColumn = [ 'gap_reason_desc' ];
	this.groupbyColumn = {'gap_reason_desc' : 'gap_reason_desc'};
	this.group_cont_function = {gap_reason_desc : getReasonGrpCont};
	this.cont_data_function = {promo_indicator:showPromoIndicator};
	this.cont_sort_function = {promo_indicator:getPromoIndicator};*/
	this.groupby = false;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {click : ''};
	this.content_tr_addon = {click : ''};
	this.content_td_addon = {click : ''};
	this.content_label = {};
	//this.legend = '<div class="legend"><label> Legend: * Single Price Promo, # Multibuy, @ In-store Promo </label></div>';
}

/**
 * Returns roundd no upto 2 decimal/the number if rounding has.00
 * @param numberToBeRounded
 * @returns
 */
function roundTo2Decimal(numberToBeRounded){
	var roundedNumber = Number(numberToBeRounded).toFixed(2);
	if(roundedNumber.substr(roundedNumber.length-3, roundedNumber.length) == ".00"){
		return numberToBeRounded;
	}else{
		return roundedNumber;
	}
}
/**
 * Process the response and reframes the JSON
 * @param response
 * @returns {Array}
 */
function constructJSONFromResponse(response){
	var map = '';
	var object = {};
	var array = [];
	var tot = 0;
	map = $groupBy(response, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
		return obj.reason_desc;
	});
	
	for ( var m in map) {
		object = {};
		object.reason_desc = '';
		object.mon_count = '';
		object.mon_prcnt = '';
		object.tue_count = '';
		object.tue_prcnt = '';
		object.wed_count = '';
		object.wed_prcnt = '';
		object.thu_count = '';
		object.thu_prcnt = '';
		object.fri_count = '';
		object.fri_prcnt = '';
		object.sat_count = '';
		object.sat_prcnt = '';
		object.sun_count = '';
		object.sun_prcnt = '';
		object.tot_count = '';
		object.tot_prcnt = '';
		for ( var i = 0; i < map[m].length; i++) {
			object.reason_desc = map[m][i].reason_desc;
			if(map[m][i].day_of_week != undefined){				
				if(map[m][i].day_of_week == "MONDAY"){
					object.mon_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.mon_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "TUESDAY"){
					object.tue_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.tue_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "WEDNESDAY"){
					object.wed_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.wed_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "THURSDAY"){
					object.thu_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.thu_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "FRIDAY"){
					object.fri_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.fri_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "SATURDAY"){
					object.sat_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.sat_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}else if(map[m][i].day_of_week == "SUNDAY"){
					object.sun_count = roundTo2Decimal(map[m][i].total_articles_rsn_cd);
					object.sun_prcnt = roundTo2Decimal(map[m][i].article_percentage_rsn_cd);
				}
			}
		}
		object.tot_count = formatTo2DecimalPlaces(Number(object.mon_count)+Number(object.tue_count)+Number(object.wed_count)+Number(object.thu_count)+Number(object.fri_count)+Number(object.sat_count)+Number(object.sun_count));
		object.tot_prcnt = formatTo2DecimalPlaces(Number(Number(object.mon_prcnt)+Number(object.tue_prcnt)+Number(object.wed_prcnt)+Number(object.thu_prcnt)+Number(object.fri_prcnt)+Number(object.sat_prcnt)+Number(object.sun_prcnt))/7);
		tot += Number(object.tot_count);
		array.push(object);
	}
	array = reframeTotCount(array,tot);
	return array;
}

function reframeTotCount(array,tot){
	for(var i=0;i<array.length;i++){
		array[i].tot_prcnt = formatTo2DecimalPlaces((array[i].tot_count/tot)*100);
	}
	return array;
}
function formatTo2DecimalPlaces(inputString){
	var str = Number(inputString).toFixed(2);
	if(str.substr(str.length-3, str.length) == ".00"){
		return str.substr(0 , str.length-3);
	}else{
		return str;
	}
}
/**
 * Binds print click event
 */
function bindPrint() {	
	$("#printReportDaily").unbind('click');
	$("#printReportDaily").on('click',function() {
		/*var reportResultArray = [];			
		reportResultArray = $('#'+reportNameDaily+'_table').data('confObj').content;
		reportForPrint = "Type: Daily (Detailed) | Department: "+deptArray.join(",");
		callOverstockDailyReportJasperPrint(reportResultArray); */
		$('#overstockReportForm').attr("action", "downloadOverstockDailyReportPdf.pdf");
		$('#overstockReportForm').attr('target','_blank');
		$('#overstockReportForm').attr('method','get');
		$('#overstockReportForm').submit();
						/*frameReportDaily();
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
									//doc.close();
									doc = '';
								});
								a.print();
							}, 1000);
							return true;
						});*/
					});
	$("#printReportWeekly").unbind('click');
	$("#printReportWeekly").on('click',function() {
		/*var reportResultArray = [];			
		reportResultArray = $('#'+reportNameWeekly+'_table').data('confObj').content;
		reportForPrint = "Type: Weekly (Summary) | Department: "+deptArray.join(",");
		callOverstockWeeklyReportJasperPrint(reportResultArray); */
		$('#overstockReportForm').attr("action", "downloadOverstockWeeklyReportPdf.pdf");
		$('#overstockReportForm').attr('target','_blank');
		$('#overstockReportForm').attr('method','get');
		$('#overstockReportForm').submit();
						/*frameReportWeekly();
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
									//doc.close();
									doc = '';
								});
								a.print();
							}, 1000);
							return true;
						});*/
					});
}
var loadDaily=true;
var loadWeekly=false;
function setToControllerDaily(){
	 loadDaily=true;
	 loadWeekly=false;
	var reportResultArray = [];			
	reportResultArray = $('#'+reportNameDaily+'_table').data('confObj').content;
	reportForPrint = "Type: Daily (Detailed) | Department: "+deptArray.join(",");
	callOverstockDailyReportJasperPrint(reportResultArray); 
}
function setToControllerWeekly(){
	 loadDaily=false;
	 loadWeekly=true;
	var reportResultArray = [];			
	reportResultArray = $('#'+reportNameWeekly+'_table').data('confObj').content;
	reportForPrint = "Type: Weekly (Summary) | Department: "+deptArray.join(",");
	callOverstockWeeklyReportJasperPrint(reportResultArray);
}
/**
 * Frames the content for print screen
 * @param data
 */
function frameReportDaily(){
	var map = '';
	data = responseD;
	var content = '';
	var headerContent = '';	
	var firstpagecreated = false;
	
	reportForPrint = "Type: Daily (Detailed) | Department: "+deptArray.join(",");
	
	headerContent = '<label><strong>Overstock Investigation Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle"> '+reportForPrint
	+'</label></br></br>';
	
	
	var printHeadInnerTable = '<div class="page"><table class="printDeviceLogTable" style="font-size: 15px;height:45%;min-height:480px;table-layout: fixed; width: 1100px;">'
		+ '<thead><tr><th align="center"  width="10%">Article</th><th align="center"  width="5%"></th><th align="left">Description</th>'
		+ '<th align="center"  width="10%">SOH</th><th align="center"  width="10%">MPL</th><th align="center" width="10%">SC</th></tr></thead>';
	content += printHeadInnerTable;
	/*//Change in min and max height
	printHeadInnerTable = '<div class="page"><table class="printDeviceLogTable" style="font-size: 15px;height:45%;min-height:730px;table-layout: fixed; width: 1100px;">'
		+ '<thead><tr><th align="center"  width="10%">Article</th><th align="center"  width="5%"></th><th align="left">Description</th>'
		+ '<th align="center"  width="10%">SOH</th><th align="center"  width="10%">MPL</th><th align="center" width="10%">SC</th></tr></thead>';*/
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

		+ ' </div>' + '</div>' + '</div>';
	var count = 0;
	map = $groupBy(data, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
		return obj.reason_desc;
	});
	totalLen = 0;totalLines=0;
	for ( var m in map) {
		totalLen++;
		for ( var i = 0; i < map[m].length; i++) {
			totalLen++;
			/*if(map[m][i].article_desc.length >= 15){
				totalLen = totalLen + 0.5*(map[m][i].article_desc.length/15);
			}*/
		}
	}
	//totalLen = 0;totalLines=0;
	for ( var m in map) {
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="6" style="font-weight:bold">'
			+ m + '</td></tr>';
		count = count+1;totalLines++;
		for ( var i = 0; i < map[m].length; i++) {
			content += '<tr class="border_bottom">'
				+ '<td align="center">' + (map[m][i].article_number != null ? map[m][i].article_number: '')
				+ '</td><td  align="center">' + (map[m][i].promo_indicator != null ?  map[m][i].promo_indicator: '')
				+ '</td><td  align="left">' + (map[m][i].article_description != null ?  map[m][i].article_description: '')
				+ '</td><td  align="center">' + (map[m][i].soh != null ?  map[m][i].soh: '0')
				+ '</td><td  align="center">' + (map[m][i].mpl != null ?  map[m][i].mpl: '') 
				+ '</td><td  align="center">' + (map[m][i].capacity != null ?  map[m][i].capacity: '')
				+ '</td></tr>';
			//Split Pages - Starts		
			var firstPageRecords = 15;
			var otherPageRecords = 20;
			totalLines++;
			/*if(map[m][i].article_desc.length >= 15){
				count = count + 0.5*(map[m][i].article_desc.length/15);
				totalLines = totalLines + 0.5*(map[m][i].article_desc.length/15);
			}*/
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
		
		//Sets the footer at a fixed position
		/*var height = 785;
		var heightIncr = 785;
		$('.footDiv').each(function() {
			len++;
			$(this).css({"position": "absolute", "left": "10px","top":height+"px"});
			heightIncr = heightIncr + ((heightIncr*0.5)/100);
			height += heightIncr;
		});		*/
		
		//Alters the min-height and max-height of the last table based on the no of records
		
		/*var lastTblHt = $(".printDeviceLogTable").css('height').replace('%', '')/otherPageRecords;
		$(".printDeviceLogTable:last").css('min-height',lastTblMinHt+'px');
		$(".printDeviceLogTable:last").css('height',lastTblHt+'%');*/
		//$(".footDiv:last").css({'position':'absolute','top':$(".printDeviceLogTable:last").offset().top+1000+'px','left':'8px'});
		
		
		/*$(".printDeviceLogTable:last").css('min-height','');
		$(".printDeviceLogTable:last").css('height','');
		var lastTblMinHt = $(".printDeviceLogTable").css('min-height').replace('px', '')/otherPageRecords;
		var endOfTblHt = $(".printDeviceLogTable").css('min-height').replace('px', '') - (lastTblMinHt*$(".printDeviceLogTable:last tr").length);
		$(".endOfReportTbl").css('min-height',endOfTblHt+'px');*/
}
/**
 * Frames print screen for weekly report
 */
function frameReportWeekly(){
	data = responseW;
	var content = '';
	var headerContent = '';	
	var firstPageRecords = 10;
	var otherPageRecords = 14;
	reportForPrint = "Type: Weekly (Summary) | Department: "+deptArray.join(",");
	
	headerContent = '<label><strong>Overstock Investigation Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle"> '+reportForPrint
	+'</label></br></br>';
	
	var printHeadInnerTable = '<div class="page"><table class="printDeviceLogTable" style="font-size: 15px;height:45%;min-height:600px;max-height:600px;table-layout: fixed; width: 1100px;">'
		+ '<thead><tr>'
		+ '<th rowspan="2" class="columnDivider" width="125px">Overstock Reason</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Monday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Tuesday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Wednesday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Thursday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Friday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Saturday</th>'
		+ '<th colspan="2" class="centerValue columnDivider">Sunday</th>'
		+ '<th colspan="2" class="centerValue lastColumn">Total</th>'		
		+ '</tr>';
	
	printHeadInnerTable += '<tr class="subHeader border_bottom">'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue columnDivider" width="">%</th>'
		+ '<th class="centerValue" width="">Count</th>'
		+ '<th class="centerValue lastColumn" width="">%</th>'																															
		+ '</tr></thead>';
	content += printHeadInnerTable;
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98 footDiv">'

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

		+ ' </div>' + '</div>' + '</div>';
	var count = 0;
	for ( var i = 0; i < data.length; i++) {
		content += '<tr class="border_bottom">'
				+ '<td style="width:10%" align="left">' + data[i].reason_desc
				+ '</td><td  align="center">' + data[i].mon_count
				+ '</td><td  align="center">' + data[i].mon_prcnt
				+ '</td><td  align="center">' + data[i].tue_count
				+ '</td><td  align="center">' + data[i].tue_prcnt
				+ '</td><td  align="center">' + data[i].wed_count
				+ '</td><td  align="center">' + data[i].wed_prcnt
				+ '</td><td  align="center">' + data[i].thu_count
				+ '</td><td  align="center">' + data[i].thu_prcnt
				+ '</td><td  align="center">' + data[i].fri_count
				+ '</td><td  align="center">' + data[i].fri_prcnt
				+ '</td><td  align="center">' + data[i].sat_count
				+ '</td><td  align="center">' + data[i].sat_prcnt
				+ '</td><td  align="center">' + data[i].sun_count
				+ '</td><td  align="center">' + data[i].sun_prcnt
				+ '</td><td  align="center">' + data[i].tot_count
				+ '</td><td  align="center">' + data[i].tot_prcnt
				+ '</td></tr>';
		
		
		
		//Split Pages - Starts		
		
		if(data[i].reason_desc.length > 27){
			count = count + 0.5*(data[i].reason_desc.length/27);
		}
		if (i == (data.length - 1)){
			content += '</tbody></table>';
			content +='<table class="endOfReportTbl"><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
		}
		if(i==firstPageRecords ){
			count =0;
			content += '</tbody></table>' + printFoot+'</div>'
			+ printHeadInnerTable;			
		}else {
			if (i == (data.length - 1)){
					/*if(count != otherPageRecords && i> firstPageRecords){
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
				count = 0;					
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable;
			}
			
		}
		count++;
		//Split Pages - Ends

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
		
		/*$(".printDeviceLogTable:last").css('min-height','');
		$(".printDeviceLogTable:last").css('height','');
		var lastTblMinHt = $(".printDeviceLogTable").css('min-height').replace('px', '')/otherPageRecords;
		var endOfTblHt = $(".printDeviceLogTable").css('min-height').replace('px', '') - (lastTblMinHt*$(".printDeviceLogTable:last tr").length);
		$(".endOfReportTbl").css('min-height',endOfTblHt+'px');*/
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
function callOverstockDailyReportJasperPrint(reportResultArray){
	var obj={			
			reportResult	: reportResultArray,
			reportFor		: reportForPrint,
			reportForDate	: datePrint,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val(),
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "printReportOverstockDailyPDF.htm",
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
		/*$('#overstockReportForm').attr("action", "downloadOverstockDailyReportPdf.pdf");
		$('#overstockReportForm').attr('target','_blank');
		$('#overstockReportForm').attr('method','get');
		$('#overstockReportForm').submit();*/
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
function callOverstockWeeklyReportJasperPrint(reportResultArray){
	var obj={			
			reportResult	: reportResultArray,
			reportFor		: reportForPrint,
			reportForDate	: datePrint,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val(),
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "printReportOverstockWeeklyPDF.htm",
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
		/*$('#overstockReportForm').attr("action", "downloadOverstockWeeklyReportPdf.pdf");
		$('#overstockReportForm').attr('target','_blank');
		$('#overstockReportForm').attr('method','get');
		$('#overstockReportForm').submit();*/
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
function getTodayDate()
{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate());
	day=todayDate.getDate();
	month=todayDate.getMonth()+1;
	year=todayDate.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
function getLastWeekDate(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    day=lastWeek.getDate();
	month=lastWeek.getMonth()+1;
	year=lastWeek.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
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
function bindAllDeptCheckBox(){
	//Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function(){
		if($("#allDeptChkBox").is(':checked')){//Select all
			$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});			
			
		}else{ //unselect all
			$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});			
		}
	});
}