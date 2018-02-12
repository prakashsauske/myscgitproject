var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';

$(document).ready(function(){
	
	// filter by user tracking
	$('#filterOpenu').click(function(){
		$("#filterOpenu").addClass('hideBlock');
		$("#filterClearu").removeClass('hideBlock');
		$("#tablefiltersu").removeClass('hideBlock');				
	});
	
	$('#filterClearu').click(function(){
		onFilterClearOrFilterCancelUserPerf();		
		
	});	
	
	$('#userPerfcloseLink').unbind('click');
	
	$('#userPerfcloseLink').click(function(){
		onFilterClearOrFilterCancelUserPerf();
	});
	
	$('#userPerfFilterBtn').unbind('click');
	
	$('#userPerfFilterBtn').click(function(){
		filterApplyClicked = true;
		$("#reportContent5").addClass("hideBlock");
		var reportParam = {};
		reportParam = prepareUserPerfReportParam($("#userPerfFilterDiv"));
		callReportSTUserPerformanceService(reportParam);
	});
});
function onFilterClearOrFilterCancelUserPerf(){
	filterApplyClicked = false;
	 /*if(filterContent != '' && filterContentIndex == 0){//basecount
		$("#tablefilters").html(filterContent);
		}*/
	defaultUserPerfFilters();
	fetchUserPerfReportWithoutFilters();
	
}
function clearUserPerfFilter(){
	$("#filterOpenu").removeClass('hideBlock');
	$("#tablefiltersu").addClass('hideBlock');
	$("#filterClearu").addClass('hideBlock');	
}
function fetchUserPerfReportWithoutFilters(){
	allInputs = "ALL";//for default selections
	$("#reportContent5").addClass("hideBlock");
	var reportParam = {
			"iv_users" : "",
			"iv_aisles" : "",
			"iv_bays" : "",
			"iv_loc_ids" : "",
			"iv_sub_loc_ids" : "",
			"iv_st_id"	: $("#reportDetailsStockTakeId").html()
	};
	callReportSTUserPerformanceService(reportParam);
}
function defaultUserPerfFilters(){
	$("#userPerfallAisleChkBox").prop("checked",false);//select all aisle in drop dwon
	$("#userPerfallAisleChkBox").trigger('click');	
	
	$("#userPerfallUsrChkBox").prop("checked",false);//select all user in drop dwon
	$("#userPerfallUsrChkBox").trigger('click');
	
	$("#userPerfallLocChkBox").prop("checked",false);//select all loc in drop dwon
	$("#userPerfallLocChkBox").trigger('click');
	
	$("#userPerfAisleHId").find("#aisleSelectAll").prop("checked",true);//unselect all aisle in hier box
	$("#userPerfAisleHId").find("#aisleSelectAll").trigger('click');
	
	$("#userPerfLocHId").find(".locSelectAll").prop("checked",true);//unselect all loc in hier box
	$("#userPerfLocHId").find(".locSelectAll").trigger('click');	
	
	$("#userPerfAisleH").prop("checked",true);//uncheck select Select bays check box
	$("#userPerfAisleH").trigger("click");
	
	$("#userPerfLocH").prop("checked",true);//uncheck select Select sub-locations check box
	$("#userPerfLocH").trigger("click");
	clearUserPerfFilter();
}
/**
 * Invokes report service
 */
function callReportSTUserPerformanceService(requestParam){	
	console.log(reportSTUserPerformanceUrl + ' ' + JSON.stringify(requestParam));	
	//var requestParam = {};
	$.ajax({
	    type: "POST",
	    url: reportSTUserPerformanceUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  //console.log(JSON.stringify(response));	
		  responseP = response;	
		  //responseP = [ {'start_date': '149539','start_time':'4564','end_time': '40','duration': '50','location_description':'locdesc','no_of_scans':'1','no_of_items_counted':'2','scans_per_min':'3','articles_per_min':'4','adjustments':'5','department_name':'GROCERY','username':'Lakshmi','userid':'xlki1'}];
		  if(responseP != undefined  && responseP.length > 0 && responseP[0].start_date != undefined){
			  	reframeResponseForUserPerformance(responseP);
			  	$('#mainTabs-7').find('.emptyTable').removeClass('hideBlock');
			  	$('#mainTabs-7').find('.stDtlActionsBtns').removeClass('hideBlock');
			    $("#reportContent5").removeClass("hideBlock");
				loadReportContentTbl();
				callStockTakeUserPerformanceJasperPrint(responseP);
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				bindUserPerfExport(response);
				$(".group_cont_table ").addClass("hideBlock");//Hide Group By option aftr grouping
				$(".groupByClear").parent().parent().addClass("hideBlock");//Clear By
				$('#Stocktake_UserPerformance_head').addClass('hideBlock');
				$currentPanel.removeClass('hideBlock');
			} else {
				if(responseP != undefined && responseP.length <= 0 ){
					if(!filterApplyClicked){//if filter not applied and no records found, dont display message as its annoying to user on every tab click
						$('#mainTabs-7').find('.emptyTable').addClass('hideBlock');
					}else{//if filter applied and no records found, display message to user
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-User Performance');
						$('#mainTabs-7').find('.stDtlActionsBtns').addClass('hideBlock');
					}					
				}else{
					$('#mainTabs-7').find('.stDtlActionsBtns').addClass('hideBlock');
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-User Performance');
				}
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-User Performance');
	  }).always(function() {
		  stopLoading();
	  });
}
function reframeResponseForUserPerformance(response){
	var responseP = [];
	var obj ={};
	for(var i=0;i<response.length;i++){
		obj = response[i];
		obj.groupByKey = obj.department_name+"-"+obj.username+"("+obj.userid+")";
		responseP.push(obj);
	}
	return responseP;
}
function exportToCSVUserPerf(userPerfArray, filename) {
	
	var groupedData=$groupBy(userPerfArray, function(obj) {return obj.groupByKey;});
	var valuesArray =['start_date','start_time','end_time','duration','location_description','no_of_scans','no_of_items_counted','scans_per_min','articles_per_min','adjustments'];
	var headersArray =['Start Date','Start Time','End Time','Duration (in Mins)','Location','# of Scans','# of Units Counted','Scans / Min','Articles/Min','Adjustments'];
	var headerContent ='';
	var tableContent='';
	var groupArray=[];
	var csv='';
    var colDelim = '","';
    var rowDelim = '"\r\n"';
    
    $.each(headersArray,function(headerIndex){
    	headerContent+=headersArray[headerIndex];
    	headerContent=addColDelim(headerContent);
    });
    headerContent=headerContent+tmpRowDelim;
    headerContent=headerContent+tmpRowDelim;
	$.each(groupedData, function( key) {
		groupArray.push(key);
	  });
	$.each(groupArray, function(index) {
		tableContent+=(groupArray[index]);
		tableContent=addColDelim(tableContent)+tmpRowDelim;
		var array=groupedData[groupArray[index]];
		if(array.length > 0){
			$.each(array, function(i) {
				$.each(valuesArray, function(valuesIndex) {
					if(valuesArray[valuesIndex] == 'duration')
					{
						var durationTime=convertSECtoHHMMSS(array[i][valuesArray[valuesIndex]]);
						tableContent=tableContent+durationTime;
				}else{
						tableContent=array[i][valuesArray[valuesIndex]] == null? tableContent: tableContent+array[i][valuesArray[valuesIndex]];
					}
					tableContent=addColDelim(tableContent);
			});
				tableContent=tableContent+tmpRowDelim;
		}); 
		}
	});
	var total=calTotalUserPerf(userPerfArray);
	csv = headerContent+tableContent+total;
	csv=csv.split(tmpRowDelim).join(rowDelim)
    .split(tmpColDelim).join(colDelim).replace('"',"") ;
    // Data URI
    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

$(this)
    .attr({
    'download': filename,
        'href': csvData,
        'target': '_blank'
});
}
function calTotalUserPerf(array){
	var total='';
	var totDuration = 0;var totScans = 0;	
	var totCounted = 0; var totScansMin = 0;var totArticlesMin = 0; var totAdj = 0;
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			totDuration+= array[i].duration!= undefined && array[i].duration!= null ? Number(array[i].duration) : 0;
			totScans+= array[i].no_of_scans!= undefined && array[i].no_of_scans!= null ? Number(array[i].no_of_scans) : 0;
			totCounted+= array[i].no_of_items_counted!= undefined && array[i].no_of_items_counted!= null ? Number(array[i].no_of_items_counted) : 0;
			totScansMin+= array[i].scans_per_min!= undefined && array[i].scans_per_min!= null ? Number(array[i].scans_per_min) : 0;
			totArticlesMin+= array[i].articles_per_min!= undefined && array[i].articles_per_min!= null ? Number(array[i].articles_per_min) : 0;
			totAdj+= array[i].adjustments!= undefined && array[i].adjustments!= null ? Number(array[i].adjustments) : 0;
		}
	}
	var totTime = convertSECtoHHMMSS(totDuration);
	total+="User Total: ";total=addColDelim(total);total=addColDelim(total);total=addColDelim(total);
	total+=totTime; total=addColDelim(total); total=addColDelim(total);
	total+= Number(totScans).toFixed(2); total=addColDelim(total);
	total+= Number(totCounted).toFixed(2); total=addColDelim(total);
	total+= ((Number(totScansMin)/(array.length))).toFixed(2); total=addColDelim(total);
	total+= ((Number(totArticlesMin)/(array.length))).toFixed(2); total=addColDelim(total);
	total+= Number(totAdj).toFixed(2); total=addColDelim(total);
	return total;
};
function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}

function bindUserPerfExport(response){
    // This must be a hyperlink
	var userPerfArray=reframeResponseForUserPerformance(response);
    $("#userPerfExportBtn").on('click', function (event) {
        // CSV
        exportToCSVUserPerf.apply(this, [userPerfArray, 'stocktake_user_performance_export.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
}
/**
 * @param data
 * @returns {tblReportUserPerformance}
 */
function tblReportUserPerformance(data){
	this.option = 'build';
	this.key = ['start_date','start_time','end_time','duration','location_description','no_of_scans','no_of_items_counted','scans_per_min','articles_per_min','adjustments'];
	this.table_name = "Stocktake_UserPerformance";
	this.table_title = "";
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {start_date :'Start Date',start_time :'Start Time',end_time:'End Time',duration:'Duration</br>(in Mins)',location_description:'Location',no_of_scans:'# of Scans',no_of_items_counted:'# of Units Counted',scans_per_min:'Scans / Min',articles_per_min:'Articles/Min',adjustments:'Adjustments'},
	this.header_data_type = {start_date :'date',start_time :'number',end_time:'number',duration:'number',location_description:'char',no_of_scans:'number',no_of_items_counted:'number',scans_per_min:'number',articles_per_min:'number',adjustments:'char'},
	this.header_row_type = {start_date :'main',start_time :'main',end_time:'main',duration:'main',location_description:'main',no_of_scans:'main',no_of_items_counted:'main',scans_per_min:'main',articles_per_min:'main',adjustments:'main'},
	this.header_class = {start_date :' centerValue ',start_time :' centerValue ',end_time:' centerValue ',duration:' rightValue ',location_description:' leftValue ',no_of_scans:' rightValue ',no_of_items_counted:' rightValue ',scans_per_min:' rightValue ',articles_per_min:' rightValue ',adjustments:' rightValue '},
	this.header_title = {},
	this.header_width = {start_date :'4%',start_time :'4%',end_time:'4%',duration:'6%',location_description:'8%',no_of_scans:'3%',no_of_items_counted:'4%',scans_per_min:'3%',articles_per_min:'3%',adjustments:'3%'},
	this.content_class = {start_date :' centerValue ',start_time :' centerValue ',end_time:' centerValue ',duration:' rightValue ',location_description:' leftValue ',no_of_scans:' rightValue ',no_of_items_counted:' rightValue ',scans_per_min:' rightValue ',articles_per_min:' rightValue ',adjustments:' rightValue '},
	this.content_title = {},
	this.content_format = {start_date :'mobi_date',start_time :'removeNull',end_time:'removeNull',duration:'removeNull',location_description:'removeNull',no_of_scans:'removeNull',no_of_items_counted:'removeNull',scans_per_min:'removeNull',articles_per_min:'removeNull',adjustments:'removeNull'},
	this.content_width =  {start_date :'4%',start_time :'4%',end_time:'4%',duration:'6%',location_description:'8%',no_of_scans:'3%',no_of_items_counted:'4%',scans_per_min:'3%',articles_per_min:'3%',adjustments:'3%'},
	this.cont_data_function = {start_time:showUserPerfStartTime,end_time:showUserPerfEndTime,duration:showUserPerfDuration,scans_per_min:showScansPerMin,articles_per_min:showArticlesPerMin};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= true;
	this.default_groupbyColumn = [ 'groupByKey' ];
	this.groupbyColumn = {'groupByKey' : 'Department'};
	this.group_done = bindStockUserPerfPrintCont;
	this.sort_done = bindStockUserPerfPrintCont;
	this.group_cont_function = {groupByKey : getDeptGrpHeadForUserPerforamce};
	this.grp_tot = true;
	this.group_tot_cont_function = {groupByKey : getTotalBasedOnDeptForUserPerformance};
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}
var showUserPerfStartTime = function(obj){
	obj.start_time = obj.start_time.substring(0,8);
	return obj.start_time;
};
var showUserPerfEndTime = function(obj){
	obj.end_time = obj.end_time.substring(0,8);
	return obj.end_time;
};
var showUserPerfDuration = function(obj){
	obj.duration_final = convertSECtoHHMMSS(obj.duration);
	return obj.duration_final;
};
var showScansPerMin = function(obj){
	obj.scans_per_min = formatTo2DecimalPlaces(obj.scans_per_min);
	return obj.scans_per_min;
};
var showArticlesPerMin = function(obj){
	obj.articles_per_min = formatTo2DecimalPlaces(obj.articles_per_min);
	return obj.articles_per_min;
};

/**
 * Dispalys total department in the table
 */
var getTotalBasedOnDeptForUserPerformance = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	var totDuration = 0;var totScans = 0;	
	var totCounted = 0; var totScansMin = 0;var totArticlesMin = 0; var totAdj = 0;
	//console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			totDuration+= array[i].duration!= undefined && array[i].duration!= null ? Number(array[i].duration) : 0;
			totScans+= array[i].no_of_scans!= undefined && array[i].no_of_scans!= null ? Number(array[i].no_of_scans) : 0;
			totCounted+= array[i].no_of_items_counted!= undefined && array[i].no_of_items_counted!= null ? Number(array[i].no_of_items_counted) : 0;
			totScansMin+= array[i].scans_per_min!= undefined && array[i].scans_per_min!= null ? Number(array[i].scans_per_min) : 0;
			totArticlesMin+= array[i].articles_per_min!= undefined && array[i].articles_per_min!= null ? Number(array[i].articles_per_min) : 0;
			totAdj+= array[i].adjustments!= undefined && array[i].adjustments!= null ? Number(array[i].adjustments) : 0;
		}
	}
	var totTime = convertSECtoHHMMSS(totDuration);
	return '<tr><td class="valueInfo" colspan="3">User Total:  </td><td class="rightValue valueInfo">'+totTime+'</td>'
			+'<td class=" rightValue valueInfo">&nbsp;</td>'
			+'<td class=" rightValue valueInfo">'+Number(totScans).toFixed(2)+'</td>'
			+'<td class=" rightValue valueInfo">'+Number(totCounted).toFixed(2)+'</td>'
			+'<td class=" rightValue valueInfo">'+((Number(totScansMin)/(array.length))).toFixed(2)+'</td>'
			+'<td class=" rightValue valueInfo">'+((Number(totArticlesMin)/(array.length))).toFixed(2)+'</td>'
			+'<td class=" lastColumn rightValue valueInfo">'+Number(totAdj).toFixed(2)+'</td></tr>';
};
/**
 * Group by department header
 */
var getDeptGrpHeadForUserPerforamce = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.department_name)+'</br>'+obj.username+" ("+obj.userid+")" + '</td></tr>';
	}
	return cont;
};
/**
 * Frames print screen content
 * @param response
 */
function frameReportSTUserPerformance(response){
	content = '';
	var headerContent = '<label><strong>User Performance Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br><label class="subtitle-bold">';
	constructHeaderTblSTUserPerformance();	
	content += printHeadInnerTable;			
	frameTableSTUserPerformance(response);
	$('#printbodyForSTUserPerformance')
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
 * Frames report table
 * @param response
 */
function frameTableSTUserPerformance(response){
	var count = 0;	
	var firstPageCreated = false;
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
	
	for ( var i = 0; i < response.length; i++) {	
		constructContentTblSTUserPerformance(response[i]);
		
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*if(response[i].dept.length > 35){
			count = count + 0.5*(response[i].dept.length/35);
		}*/
		if (i >= (response.length - 1)){
			content += '</tbody></table>';
			content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
		}
		if(count>=firstPageRecords && !firstPageCreated){
			count =0;
			firstPageCreated = true;			
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;	
		}else {
			if (i >= (response.length - 1)){
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
}
/**
 * Builds table header for print page
 */
function constructHeaderTblSTUserPerformance() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th width="60px" style="text-align: center;">Start Date</th>'
		+'<th width="60px" style="text-align: center;">Start Time</th>'
		+'<th width="60px" style="text-align: center;">End Time</th>'
		+'<th width="40px" style="text-align: right;">Duration (in</br> Mins)</th>'
		+'<th width="60px" style="text-align: left;">Location</th>'
		+'<th width="60px" style="text-align: right;"># of Scans</th>'
		+'<th width="70px" style="text-align: right;"># of Units</br>Counted</th>'
		+'<th width="60px" style="text-align: center;">Scans / Min</th>'
		+'<th width="60px" style="text-align: center;">Articles / Min</th>'
		+'<th width="60px" style="text-align: center;">Adjustments</th>'
		+'</tr></thead>';
}
/**
 * Builds table content for print page
 * @param data
 */
function constructContentTblSTUserPerformance(data) {
	content += '<tr class="border_bottom"><td  class="centerValue">' + (data.start_date  != null ?  data.start_date : '')
	+ '</td><td class="centerValue">' +  (data.start_time  != null ?  data.start_time : '')
	+ '</td><td class="centerValue">' +  (data.end_time != null ?  data.end_time: '')
	+ '</td><td style="text-align: right;">' +  (data.duration != null ?  data.duration: '')
	+ '</td><td style="text-align: left;">' +  (data.location_description != null ?  data.location_description: '')
	+ '</td><td style="text-align: right;">' +  (data.no_of_scans != null ?  data.no_of_scans: '')
	+ '</td><td style="text-align: right;">' +  (data.no_of_items_counted != null ?  data.no_of_items_counted: '')
	+ '</td><td style="text-align: right;">' +  (data.scans_per_min != null ?  data.scans_per_min: '')
	+ '</td><td style="text-align: right;">' +  (data.articles_per_min != null ?  data.articles_per_min: '')
	+ '</td><td style="text-align: right;">' +  (data.adjustments != null ?  data.adjustments: '');
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
 * Shows error message
 * @param msg
 * @param title
 */
function showReportErrorMsg(msg, title){
	var errorContent = '<li><ol><li>'+msg+'</li></ol></li>';
	$('#reportErrorWrapper').find('#titleContent').html(title);
	$('#reportErrorWrapper').find('#errorContent').html(errorContent);
	$('#reportErrorWrapper').removeClass('hideBlock');
}

function prepareUserPerfReportParam(area){
	var aisleArray = new Array();
	var bayArray = new Array();
	var locArray = new Array();
	var subLocArray = new Array();
	var userArray = new Array();
	var userNmArray = new Array();
	allInputs = '';
	
	if(area.find('#userPerfAisleH').is(':checked')){
		// aisle selection
		area.find("input[name='aisleList']").each(function() {
			if ($(this).is(':checked')) {
				aisleArray[aisleArray.length] = $(this).val();
			}
		});
	
		// bay
		area.find("input[name='bay']").each(function() {
			if ($(this).is(':checked')) {
				bayArray[bayArray.length] = $(this).val();
				//var index = aisleArray.indexOf($(this).attr('aisleId'));
				//if (index > -1) {
					//aisleArray.splice(index, 1);
				//}
			}
		});
	} else {
		area.find('#userPerfAisleDrpDwnUl').find('.ailseDrpDwnChkBx:checked').each(function(){
			aisleArray[aisleArray.length] = $(this).val();
		});
	}
	
	if(area.find('#userPerfLocH').is(':checked')){
		// location selection
		area.find("input[name='locList']").each(function() {
			if ($(this).is(':checked')) {
				locArray[locArray.length] = $(this).val();
			}
		});
	
		// bay
		area.find("input[name='subloc']").each(function() {
			if ($(this).is(':checked')) {
				subLocArray[subLocArray.length] = $(this).val();
				//var index = locArray.indexOf($(this).attr('locId'));
				//if (index > -1) {
					//locArray.splice(index, 1);
				//}
			}
		});
	} else {
		area.find('#userPerfLocDrpDwnUl').find('.locDrpDwnChkBx:checked').each(function(){
			locArray[locArray.length] = $(this).val();
		});
	}
	
	area.find('#userPerfUsrDrpDwnUl').find('.usersDrpDwnChkBx:checked').each(function(){
		userArray[userArray.length] =  $(this).val();
		userNmArray[userNmArray.length] = $(this).attr('name');
	});
	
	var param = {
			"iv_users" : userArray.join(","),
			"iv_aisles" : aisleArray.join(","),
			"iv_bays" : bayArray.join(","),
			"iv_loc_ids" : locArray.join(","),
			"iv_sub_loc_ids" : subLocArray.join(","),
			"iv_st_id"	: $("#reportDetailsStockTakeId").html()
	};
	//Prepare data for print screen
	if(aisleArray.length > 0){
		allInputs = "Aisles: "+aisleArray.join(",");
	}
	if(allInputs.length > 0){
		allInputs += " | Other Locations: " +locArray.join(",");
	}else{
		allInputs = "Other Locations: " +locArray.join(",");
	}
	if(allInputs.length > 0){
		allInputs += " | Users: " +userNmArray.join(",");
	}else{
		allInputs = "Users: " +userNmArray.join(",");
	}
	
	
	return param;
}	
var bindStockUserPerfPrintCont =function($tr,$tbl){
	var applyGroupBy = $tbl.data('confObj').applyGroup;
	var content = $tbl.data('confObj').content;
	if(applyGroupBy){
		content = $tbl.data('confObj').groupedContObj;
	}
	callStockTakeUserPerformanceJasperPrint(content);
};
function callStockTakeUserPerformanceJasperPrint(reportResultArray)
{	
	var obj={	
			stockTakePrint  : stockTakePrint,
			reportResult	: reportResultArray,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val(),
			reportFor		: allInputs
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../stockTakeUserPerformanceReport/printReportStockTakeUserPerformancePDF.htm",
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
	},
	error: function(xhr, textStatus, errorThrown){
	//console.log('request failed'+errorThrown);
		stopLoading();
	}
	});
}
function printUserPerformance(){
	$('#stockTakeForm').attr("action", "../stockTakeUserPerformanceReport/downloadStockTakeUserPerformancePdf.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
}