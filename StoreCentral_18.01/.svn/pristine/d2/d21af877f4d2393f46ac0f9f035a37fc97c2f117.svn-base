var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';

$(document).ready(function(){
	//$("#teamPerfFilterDiv").find('.valueCrit').within99();
	$("#teamPerfFilterDiv").find('.valueCrit').isWithin99Or3Decimal(1);
	
	
	$(".check-mpl-sc input[type=radio]").change(function(){
		if(filterApplyClicked){
			$('#teamPerfFilterBtn').trigger('click');
		}else{
			callReportSTTeamPerformanceServiceDefault();
		}
	});
	
	
	
	
	// filter by team performance
	$('#filterOpent').click(function(){
		$("#filterOpent").addClass('hideBlock');
		$("#filterCleart").removeClass('hideBlock');
		$("#teamPerfFilterDiv").removeClass('hideBlock');				
	});
	
	$('#filterCleart').click(function(){
		onFilterClearOrFilterCancelTeamPerf();
		
	});
	
	$('#teamPerfFilterBtn').unbind('click');
	
	$('#teamPerfFilterBtn').click(function(){
		filterApplyClicked = true;
		$("#reportContent4").addClass("hideBlock");
		var param = {};
		param = prepareTeamPerfReportParam($("#teamPerfFilterDiv"));
		callReportSTTeamPerformanceService(param);
		
	});
	
	$('#teamPerfcloseLink').click(function(){
		onFilterClearOrFilterCancelTeamPerf();
	});
});
function onFilterClearOrFilterCancelTeamPerf(){
	filterApplyClicked = false;
	
	defaultTeamPerfFilters();
	fetchTeamPerfReportWithoutFilters();		
}
function clearTeamPerfFilter(){
	$("#filterOpent").removeClass('hideBlock');
	$("#teamPerfFilterDiv").addClass('hideBlock');
	$("#filterCleart").addClass('hideBlock');		
}
function defaultTeamPerfFilters(){
	$(".varianceCrit").each(function(){			
		$(this).find(".criteria").val('LT');
		$(this).find(".valueCrit").val('');
	});
	clearTeamPerfFilter();
}
function fetchTeamPerfReportWithoutFilters(){
	defaultTeamPerfFilters();
	callReportSTTeamPerformanceServiceDefault();
}

/**
 * Invokes report service
 */
function callReportSTTeamPerformanceService(requestParam){	
	if(requestParam == undefined || requestParam == ''){
		requestParam = {"iv_st_id" : $("#reportDetailsStockTakeId").html(),"iv_st_var_typ":"EA","addl_crit_info":[]};
	}
	
	console.log(reportSTTeamPerformanceUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportSTTeamPerformanceUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		  //responseP = [ {'department_name': '149539','cnt':'4564','percentage': '9.4567','cnt_btw_10_29': 'CAR','prcntg_btw_10_29': '14.9539','cnt_btw_30_49':'4564','prcntg_btw_30_49': '78.9867','cnt_btw_50_99': 'CAR','prcntg_btw_50_99': '3.000','cnt_over_99':'4564','tt_prcntg':'200.876','prcntg_over_99':'123.23','ttl_cnt':'100'}];
		  console.log(JSON.stringify(responseP));	
			if(responseP != undefined && responseP.length > 0 && responseP[0].department_name != undefined ){
				$('#mainTabs-6').find('.emptyTable').removeClass('hideBlock');
				$('#mainTabs-6').find('.stDtlActionBtns').removeClass('hideBlock');
				$("#reportContent4").removeClass("hideBlock");
				loadReportContentTbl();
				callStockTakeTeamPerformanceJasperPrint(responseP);
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				bindTeamPerfExport(response);
				$('#Stocktake_TeamPerformance_head').addClass('hideBlock');
			} else {
				
				if(responseP != undefined && responseP.length <= 0 ){
					if(!filterApplyClicked){
						$('#mainTabs-6').find('.emptyTable').addClass('hideBlock');
					} else {
						$('#mainTabs-6').find('.stDtlActionBtns').addClass('hideBlock');
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Team Performance.');	
					}
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Team Performance.');
				}
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Team Performance');
	  }).always(function() {
		  stopLoading();
	  });
}
function callReportSTTeamPerformanceServiceDefault(requestParam){
	if(requestParam == undefined || requestParam == ''){
		requestParam = {"iv_st_id" : $("#reportDetailsStockTakeId").html(),"iv_st_var_typ":$(".check-mpl-sc input[type=radio]:checked").val(),"addl_crit_info":[]};
	}
	
	console.log(reportSTTeamPerformanceDefaultUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportSTTeamPerformanceDefaultUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		 // responseP = [ {'department_name': '149539','cnt':'4564','cnt_upto_pls_or_mns_9':'52','prcntg_upto_pls_or_mns_9':'25','percentage': '9.4567','cnt_btw_10_29': '11','prcntg_btw_10_29': '14.9539','cnt_btw_30_49':'4564','prcntg_btw_30_49': '78.9867','cnt_btw_50_99': '11','prcntg_btw_50_99': '3.000','cnt_over_99':'4564','tt_prcntg':'200.876','prcntg_over_99':'123.23','ttl_cnt':'100'}];
		  console.log(JSON.stringify(responseP));	
			if(responseP != undefined && responseP.length > 0 && responseP[0].department_name != undefined ){
				$('#mainTabs-6').find('.emptyTable').removeClass('hideBlock');
				$('#mainTabs-6').find('.stDtlActionBtns').removeClass('hideBlock');
				$("#reportContent4").removeClass("hideBlock");
				loadReportContentTbl();
				callStockTakeTeamPerformanceJasperPrint(responseP);
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				$('#Stocktake_TeamPerformance_head').addClass('hideBlock');
				bindTeamPerfExport(response);
				$currentPanel.removeClass('hideBlock');
			} else {
				
				if(responseP != undefined && responseP.length <= 0 ){
					if(!filterApplyClicked){
						$('#mainTabs-6').find('.emptyTable').addClass('hideBlock');
					} else {
						$('#mainTabs-6').find('.stDtlActionBtns').addClass('hideBlock');
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Team Performance.');	
					}
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Team Performance.');
				}
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Team Performance');
	  }).always(function() {
		  stopLoading();
	  });
}
function exportToCSVTeamPerf(teamPerfArray, filename) {
	
	var groupedData=$groupBy(teamPerfArray, function(obj) {return obj.department_name;});
	var headersArray =['Department','Up to +/- 9 Count','Up to +/- 9 Percentage','Between 10 and 29 Count','Between 10 and 29 Percentage','Between 30 and 49 Count','Between 30 and 49 Percentage','Between 50 and 99 Count','Between 50 and 99 Percentage','Over 99 Count','Over 99 Percentage','Total Count','Total Percentage'];
	if(filterApplyClicked){
		headersArray =['Department','Value','%'];	
	}
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
		var array=groupedData[groupArray[index]];
		if(array.length > 0){
			if(filterApplyClicked){
				$.each(array, function(i) {
					tableContent+=array[i].department_name;tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].cnt);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].percentage)+"%";tableContent=addColDelim(tableContent);
					
					//tableContent+=formatTo2DecimalPlaces(array[i].ttl_cnt);tableContent=addColDelim(tableContent);
					//tableContent+=formatTo2DecimalPlaces(array[i].tt_prcntg)+"%";tableContent=addColDelim(tableContent);

					tableContent=tableContent+tmpRowDelim;
				});
			}else{
				$.each(array, function(i) {
					tableContent+=array[i].department_name;tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].cnt_upto_pls_or_mns_9);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].prcntg_upto_pls_or_mns_9)+"%";tableContent=addColDelim(tableContent);

					tableContent+=formatTo2DecimalPlaces(array[i].cnt_btw_10_29);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].prcntg_btw_10_29)+"%";tableContent=addColDelim(tableContent);

					tableContent+=formatTo2DecimalPlaces(array[i].cnt_btw_30_49);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].prcntg_btw_30_49)+"%";tableContent=addColDelim(tableContent);

					tableContent+=formatTo2DecimalPlaces(array[i].cnt_btw_50_99);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].prcntg_btw_50_99)+"%";tableContent=addColDelim(tableContent);

					tableContent+=formatTo2DecimalPlaces(array[i].cnt_over_99);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].prcntg_over_99)+"%";tableContent=addColDelim(tableContent);

					tableContent+=formatTo2DecimalPlaces(array[i].ttl_cnt);tableContent=addColDelim(tableContent);
					tableContent+=formatTo2DecimalPlaces(array[i].tt_prcntg)+"%";tableContent=addColDelim(tableContent);

					tableContent=tableContent+tmpRowDelim;
				});
			} 
		}
	});
	var total=calcTotalTeamPerf(teamPerfArray);
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
function calcTotalTeamPerf(array){
	var total ='';
	var totCUpto9 = 0;
	var totPUpto9 = 0;
	var totCBw1029 = 0;
	var totPBw1029 = 0;
	var totCBw3049 = 0;
	var totPBw3049 = 0;
	var totCBw5099 = 0;
	var totPBw5029 = 0;
	var totCOver99 = 0;
	var totPOver99= 0;
	var totC= 0;
	var totP= 0;
	if(array!=undefined && array.length>0){
		if(filterApplyClicked){
			for(var i= 0 ;i<array.length;i++){
				totCUpto9 = getTotalCountForColumTeamPer(totCUpto9,array[i].cnt);
				totPUpto9 = getTotalCountForColumTeamPer(totPUpto9,array[i].percentage);
			}
		}else{
			for(var i= 0 ;i<array.length;i++){
				totCUpto9 = getTotalCountForColumTeamPer(totCUpto9,array[i].cnt_upto_pls_or_mns_9);
				totPUpto9 = getTotalCountForColumTeamPer(totPUpto9,array[i].prcntg_upto_pls_or_mns_9);
				totCBw1029 = getTotalCountForColumTeamPer(totCBw1029,array[i].cnt_btw_10_29);
				totPBw1029 = getTotalCountForColumTeamPer(totPBw1029,array[i].prcntg_btw_10_29);
				totCBw3049 = getTotalCountForColumTeamPer(totCBw3049,array[i].cnt_btw_30_49);
				totPBw3049 = getTotalCountForColumTeamPer(totPBw3049,array[i].prcntg_btw_30_49);
				totCBw5099 = getTotalCountForColumTeamPer(totCBw5099,array[i].cnt_btw_50_99);
				totPBw5029 = getTotalCountForColumTeamPer(totPBw5029,array[i].prcntg_btw_50_99);
				totCOver99 = getTotalCountForColumTeamPer(totCOver99,array[i].cnt_over_99);
				totPOver99= getTotalCountForColumTeamPer(totPOver99,array[i].prcntg_over_99);
				totC= getTotalCountForColumTeamPer(totC,array[i].ttl_cnt);
				totP= getTotalCountForColumTeamPer(totP,array[i].tt_prcntg);
			}
		}
	}
	total+='Total ';total=addColDelim(total);
	total+=Number(totCUpto9);total=addColDelim(total);
	total+=formatTo2DecimalPlaces(totPUpto9)+'%';total=addColDelim(total);
	if(!filterApplyClicked){
		total+=formatTo2DecimalPlaces(totCBw1029);total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totPBw1029)+'%';total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totCBw3049);total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totPBw3049)+'%';total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totCBw5099);total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totPBw5029)+'%';total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totCOver99);total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totPOver99)+'%';total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totC);total=addColDelim(total);
		total+=formatTo2DecimalPlaces(totP)+'%';total=addColDelim(total);
	}
	return total;
}
function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}
function bindTeamPerfExport(response){
    // This must be a hyperlink
	var teamPerfArray=response;
    $("#teamPerfExportBtn").on('click', function (event) {
        // CSV
        exportToCSVTeamPerf.apply(this, [teamPerfArray, 'team_performance_export.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
}
function tblReportTeamPerformanceDefault(data){
	this.option = 'build';
	this.key = ['department_name','upto','bw10','bw30','bw50','over99','total'];
	this.table_name = "Stocktake_TeamPerformance";
	this.table_title = "";
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {department_name:'Department'},
	this.header_data_type = {department_name:'char',cnt_upto_pls_or_mns_9:'number',prcntg_upto_pls_or_mns_9:'number',cnt_btw_10_29:'number',prcntg_btw_10_29:'number',cnt_btw_30_49:'number',prcntg_btw_30_49:'number',cnt_btw_50_99:'number',prcntg_btw_50_99:'number',cnt_over_99:'number',tt_prcntg:'number',prcntg_over_99:'number',ttl_cnt:'number'},
	this.header_row_type = {department_name:'main',upto:'sub',bw10:'sub',bw30:'sub',bw50:'sub',over99:'sub',total:'sub'},
	this.header_sub_rows = {upto : {subKeys : [ 'cnt_upto_pls_or_mns_9', 'prcntg_upto_pls_or_mns_9']},bw10 : {subKeys : [ 'cnt_btw_10_29', 'prcntg_btw_10_29']},bw30 : {subKeys : [ 'cnt_btw_30_49', 'prcntg_btw_30_49']},bw50 : {subKeys : [ 'cnt_btw_50_99', 'prcntg_btw_50_99']},over99 : {subKeys : [ 'cnt_over_99', 'prcntg_over_99']},total : {subKeys : [ 'ttl_cnt', 'tt_prcntg']}};
	this.header_class = {department_name:' leftValue ',upto:' centerValue columnDivider noSort ',cnt_upto_pls_or_mns_9:'',prcntg_upto_pls_or_mns_9:'',bw10:' centerValue columnDivider noSort ',cnt_btw_10_29:'',prcntg_btw_10_29:'',bw30:' centerValue columnDivider noSort ',cnt_btw_30_49:'',prcntg_btw_30_49:'',bw50:' centerValue columnDivider noSort ',cnt_btw_50_99:'',prcntg_btw_50_99:'',over99:' centerValue columnDivider noSort ',cnt_over_99:'',tt_prcntg:'',total:' centerValue columnDivider noSort ',prcntg_over_99:'',ttl_cnt:''},
	this.header_title = {},
	this.header_width = {department_name:'7%',cnt_upto_pls_or_mns_9:'3%',prcntg_upto_pls_or_mns_9:'3%',cnt_btw_10_29:'3%',prcntg_btw_10_29:'3%',cnt_btw_30_49:'3%',prcntg_btw_30_49:'3%',cnt_btw_50_99:'3%',prcntg_btw_50_99:'3%',cnt_over_99:'3%',tt_prcntg:'3%',prcntg_over_99:'3%',ttl_cnt:'3%'},
	this.content_class = {department_name:' leftValue ',upto:' centerValue columnDivider noSort ',cnt_upto_pls_or_mns_9:'rightValue',prcntg_upto_pls_or_mns_9:'rightValue',bw10:' centerValue columnDivider noSort ',cnt_btw_10_29:'rightValue',prcntg_btw_10_29:'rightValue',bw30:' centerValue columnDivider noSort ',cnt_btw_30_49:'rightValue',prcntg_btw_30_49:'rightValue',bw50:' centerValue columnDivider noSort ',cnt_btw_50_99:'rightValue',prcntg_btw_50_99:'rightValue',over99:' centerValue columnDivider noSort ',cnt_over_99:'rightValue',tt_prcntg:'rightValue',total:' centerValue columnDivider noSort ',prcntg_over_99:'rightValue',ttl_cnt:'rightValue'},
	this.content_title = {},
	this.content_format = {department_name:'removeNull',cnt_upto_pls_or_mns_9:'removeNull',prcntg_upto_pls_or_mns_9:'removeNull',cnt_btw_10_29:'removeNull',prcntg_btw_10_29:'removeNull',cnt_btw_30_49:'removeNull',prcntg_btw_30_49:'removeNull',cnt_btw_50_99:'removeNull',prcntg_btw_50_99:'removeNull',cnt_over_99:'removeNull',tt_prcntg:'removeNull',prcntg_over_99:'removeNull',ttl_cnt:'removeNull'},
	this.content_width =  {department_name:'7%',cnt_upto_pls_or_mns_9:'3%',prcntg_upto_pls_or_mns_9:'3%',cnt_btw_10_29:'3%',prcntg_btw_10_29:'3%',cnt_btw_30_49:'3%',prcntg_btw_30_49:'3%',cnt_btw_50_99:'3%',prcntg_btw_50_99:'3%',cnt_over_99:'3%',tt_prcntg:'3%',prcntg_over_99:'3%',ttl_cnt:'3%'},
	this.cont_data_function = {dummy_value_team_per:showDummyDataDetailsTeamPer,cnt_upto_pls_or_mns_9:formatCntUpto9,prcntg_upto_pls_or_mns_9 : formatUpto9, cnt_btw_10_29:formatCntBtwn10And29,prcntg_btw_10_29 : formatBtwn10And29,cnt_btw_30_49:formatCntBtwn30And49, prcntg_btw_30_49 : formatBtwn30And49, cnt_btw_50_99:formatCntBtwn50And99,prcntg_btw_50_99 : formatBtwn50And99, cnt_over_99:formatCntOver99,prcntg_over_99 : formatOver99,ttl_cnt:formatTotalCnt, tt_prcntg : formatTotalPrcntg},
	this.header_td_label = {upto : 'Up to +/- 9',bw10:'Between 10 and 29',bw30:'Between 30 and 49',bw50:'Between 50 and 99',over99:'Over 99',total:'Total'};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.groupbyColumn = {'dummy_value_team_per' : 'Dummy'};
	this.group_done = bindStockTeamPrintCont;
	this.sort_done = bindStockTeamPrintCont;
	this.group_cont_function = {dummy_value_team_per : getDummmyGrpHeadTeamPer};
	this.groupby = true;
	this.default_groupbyColumn = [ 'dummy_value_team_per' ];
	this.grp_tot = true;
	this.group_tot_cont_function = {dummy_value_team_per : getTotalBasedOnDummyTeamPerDefault};//To display total at the end of page alone
}
var formatUpto9 = function(obj){
	return formatTo2DecimalPlaces(obj.prcntg_upto_pls_or_mns_9)+"%";
};
var formatCntUpto9 = function(obj){
	obj.cnt_upto_pls_or_mns_9 = formatTo2DecimalPlaces(obj.cnt_upto_pls_or_mns_9);
	return obj.cnt_upto_pls_or_mns_9;
};
var formatCntBtwn10And29 = function(obj){
	obj.cnt_btw_10_29 = formatTo2DecimalPlaces(obj.cnt_btw_10_29);
	return obj.cnt_btw_10_29;
};
var formatCntBtwn30And49 = function(obj){
	obj.cnt_btw_30_49 = formatTo2DecimalPlaces(obj.cnt_btw_30_49);
	return obj.cnt_btw_30_49;
};
var formatCntBtwn50And99 = function(obj){
	obj.cnt_btw_50_99 = formatTo2DecimalPlaces(obj.cnt_btw_50_99);
	return obj.cnt_btw_50_99;
};
var formatCntOver99 = function(obj){
	obj.cnt_over_99 = formatTo2DecimalPlaces(obj.cnt_over_99);
	return obj.cnt_over_99;
};
var formatTotalCnt = function(obj){
	obj.ttl_cnt = formatTo2DecimalPlaces(obj.ttl_cnt);
	return obj.ttl_cnt;
};
var getTotalBasedOnDummyTeamPerDefault = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	var totCUpto9 = 0;
	var totPUpto9 = 0;
	var totCBw1029 = 0;
	var totPBw1029 = 0;
	var totCBw3049 = 0;
	var totPBw3049 = 0;
	var totCBw5099 = 0;
	var totPBw5029 = 0;
	var totCOver99 = 0;
	var totPOver99= 0;
	var totC= 0;
	var totP= 0;
	//console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			totCUpto9 = getTotalCountForColumTeamPer(totCUpto9,array[i].cnt_upto_pls_or_mns_9);
			totPUpto9 = getTotalCountForColumTeamPer(totPUpto9,array[i].prcntg_upto_pls_or_mns_9);
			totCBw1029 = getTotalCountForColumTeamPer(totCBw1029,array[i].cnt_btw_10_29);
			totPBw1029 = getTotalCountForColumTeamPer(totPBw1029,array[i].prcntg_btw_10_29);
			totCBw3049 = getTotalCountForColumTeamPer(totCBw3049,array[i].cnt_btw_30_49);
			totPBw3049 = getTotalCountForColumTeamPer(totPBw3049,array[i].prcntg_btw_30_49);
			totCBw5099 = getTotalCountForColumTeamPer(totCBw5099,array[i].cnt_btw_50_99);
			totPBw5029 = getTotalCountForColumTeamPer(totPBw5029,array[i].prcntg_btw_50_99);
			totCOver99 = getTotalCountForColumTeamPer(totCOver99,array[i].cnt_over_99);
			totPOver99= getTotalCountForColumTeamPer(totPOver99,array[i].prcntg_over_99);
			totC= getTotalCountForColumTeamPer(totC,array[i].ttl_cnt);
			totP= getTotalCountForColumTeamPer(totP,array[i].tt_prcntg);	
		}
	}
	return '<tr><td class="valueInfo" colspan="0">Total  </td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(Number(totCUpto9))+'</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totPUpto9)+'%</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totCBw1029)+'</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totPBw1029)+'%</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totCBw3049)+'</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totPBw3049)+'%</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totCBw5099)+'</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totPBw5029)+'%</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totCOver99)+'</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totPOver99)+'%</td>'
			+'</td><td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totC)+'</td>'
			+'</td><td class="rightValue lastColumn valueInfo">'+formatTo2DecimalPlaces(totP)+'%</td>'
			+'</tr>';
};
/**
 * Configuration for the creation of stock take team performance report
 * @param data
 * @returns {tblReportStockValuation}
 */
function tblReportTeamPerformance(data){
	this.option = 'build';
	this.key = ['department_name','cnt','percentage'];
	this.table_name = "Stocktake_TeamPerformance";
	this.table_title = "";
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {department_name:'Department',cnt:'Value',percentage:'%'},
	this.header_data_type = {department_name:'char',cnt:'number',percentage:'number'},
	this.header_row_type = {department_name:'main',cnt:'main',percentage:'main'},
	this.header_class = {department_name:' leftValue ',cnt:'rightValue',percentage:'rightValue'},
	this.header_title = {},
	this.header_width = {department_name:'3%',cnt:'3%',percentage:'3%'},
	this.content_class = {department_name:' leftValue ',cnt:'rightValue',percentage:'rightValue'},
	this.content_title = {},
	this.content_format = {department_name:'removeNull',cnt:'removeNull',percentage:'removeNull'},
	this.content_width =  {department_name:'7%',cnt:'3%',percentage:'3%'},
	this.cont_data_function = {dummy_value_team_per:showDummyDataDetailsTeamPer,percentage : formatPercentage},
	this.header_td_label = {};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.groupbyColumn = {'dummy_value_team_per' : 'Dummy'};
	this.group_done = bindStockTeamPrintCont;
	this.sort_done = bindStockTeamPrintCont;
	this.group_cont_function = {dummy_value_team_per : getDummmyGrpHeadTeamPer};
	this.groupby = true;
	this.default_groupbyColumn = [ 'dummy_value_team_per' ];
	this.grp_tot = true;
	this.group_tot_cont_function = {dummy_value_team_per : getTotalBasedOnDummyTeamPer};//To display total at the end of page alone
}
var getDummmyGrpHeadTeamPer = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="DUMMY_TEAM_PER"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr id="DUMMY_TEAM_PER"><td class="rowSection rowHighlight" colspan="4">'
				+ (obj.dummy_value || '') + '</td></tr>';
	}
	return cont;
};
var showDummyDataDetailsTeamPer = function(obj){
	obj.dummy_value_team_per = "DUMMY";
	return obj.dummy_value_team_per;
};
var getTotalBasedOnDummyTeamPer = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	
	var totC= 0;
	var totP= 0;
	//console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			totC= getTotalCountForColumTeamPer(totC,array[i].cnt);
			totP= getTotalCountForColumTeamPer(totP,array[i].percentage);	
		}
	}
	return '<tr><td class="valueInfo" colspan="0">Total  </td>'
			+'<td class="rightValue valueInfo">'+formatTo2DecimalPlaces(totC)+'</td>'
			+'</td><td class="rightValue lastColumn valueInfo">'+formatTo2DecimalPlaces(Number(totP))+'%</td>'
			+'</tr>';
};
function getTotalCountForColumTeamPer(total,curVal){
	total+= curVal!= undefined && curVal != null ? Number(curVal) : 0;
	return total;
}
var formatPercentage = function(obj){
	return formatTo2DecimalPlaces(obj.percentage)+"%";
};

var formatBtwn10And29 = function(obj){
	return formatTo2DecimalPlaces(obj.prcntg_btw_10_29)+"%";
};

var formatBtwn30And49 = function(obj){
	return formatTo2DecimalPlaces(obj.prcntg_btw_30_49)+"%";
};

var formatBtwn50And99 = function(obj){
	return formatTo2DecimalPlaces(obj.prcntg_btw_50_99)+"%";
};

var formatOver99 = function(obj){
	return formatTo2DecimalPlaces(obj.prcntg_over_99)+"%";
};

var formatTotalPrcntg = function(obj){
	return formatTo2DecimalPlaces(obj.tt_prcntg)+"%";
};

/**
 * Frames print screen content
 * @param response
 */
function frameReportSTTeamPerformance(response){
	content = '';
	var headerContent = '<label><strong>Team Performance Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br><label class="subtitle-bold">';
	constructHeaderTblSTTeamPerformance();	
	content += printHeadInnerTable;			
	frameTableSTTeamPerformance(response);
	$('#printbodyForSTTeamPerfromance')
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
function frameTableSTTeamPerformance(response){
	var count = 0;	
	var firstPageCreated = false;
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
	
	for ( var i = 0; i < response.length; i++) {	
		constructContentTblSTTeamPerformance(response[i]);
		
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*if(response[i].dept.length > 35){
			count = count + 0.5*(response[i].dept.length/35);
		}*/
		if (i >= (response.length - 1)){
			content += '</tbody></table>';
			//content +='<table><tbody><tr class="endOfReportMain"><td style="border-bottom: nprcntg_over_99 !important;border-top: nprcntg_over_99 !important;border-left: nprcntg_over_99 !important;border-right: nprcntg_over_99 !important;">End of Report</td></tr></tbody></table>' ;//+ '</div>';
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
function constructHeaderTblSTTeamPerformance() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printWithBordersHeader ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="70px">Department</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Up to +/- 9</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Between 10 and 29</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Between 30 and 49</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Between 50 and 99</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Over 99</th>'
		+'<th colspan="2" width="120px" class="centerValue columnDivider">Total</th>'
		+'</tr></thead>';
}
/**
 * Builds table content for print page
 * @param data
 */
function constructContentTblSTTeamPerformance(data) {
	content += '<tr><td  class="centerValue">' + (data.department_name != null ?  data.prcntg_over_99: '')
	+ '</td><td class="centerValue">' +  (data.cnt != null ?  data.cnt: '')
	+ '</td><td class="centerValue">' +  (data.percentage != null ?  data.percentage: '')
	+ '</td><td class="centerValue">' +  (data.cnt_btw_10_29 != null ?  data.cnt_btw_10_29: '')
	+ '</td><td class="centerValue">' +  (data.prcntg_btw_10_29 != null ?  data.prcntg_btw_10_29: '')
	+ '</td><td class="centerValue">' +  (data.cnt_btw_30_49 != null ?  data.cnt_btw_30_49: '')
	+ '</td><td class="centerValue">' +  (data.prcntg_btw_30_49 != null ?  data.prcntg_btw_30_49: '')
	+ '</td><td class="centerValue">' +  (data.cnt_btw_50_99 != null ?  data.cnt_btw_50_99: '')
	+ '</td><td class="centerValue">' +  (data.prcntg_btw_50_99 != null ?  data.prcntg_btw_50_99: '')
	+ '</td><td class="centerValue">' +  (data.cnt_over_99 != null ?  data.cnt_over_99: '')
	+ '</td><td class="centerValue">' +  (data.prcntg_over_99 != null ?  data.prcntg_over_99: '')
	+ '</td><td class="centerValue">' +  (data.ttl_cnt != null ?  data.ttl_cnt: '')
	+ '</td><td class="centerValue">' +  (data.tt_prcntg != null ?  data.tt_prcntg: '');
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

function prepareTeamPerfReportParam(area){
	var varianceCritList = [];
	
	$(".varianceCrit").each(function(){			
		if ($(this).find(".valueCrit").val() != undefined
				&& $(this).find(".valueCrit").val() != "") {
			varianceCritList.push({iv_criteria: $(this).find(".criteria").val(),iv_value:$(this).find(".valueCrit").val(),"iv_field": "VAL"});
		}
	});
	
	var param = {
			"addl_crit_info" : varianceCritList,
			"iv_st_id" : $("#reportDetailsStockTakeId").html(),
			"iv_st_var_typ":$(".check-mpl-sc input[type=radio]:checked").val()
	};
	if(varianceCritList.length > 0){
		var addCriPrint = "Variance: ";
		for(var i=0;i<varianceCritList.length;i++){
			addCriPrint += varianceCritList[i].iv_field +" "+ varianceCritList[i].iv_criteria +" "+varianceCritList[i].iv_value;
		}
		allInputs = addCriPrint;
	}
	
	
	return param;
}	
var bindStockTeamPrintCont =function($tr,$tbl){
	var applyGroupBy = $tbl.data('confObj').applyGroup;
	var content = $tbl.data('confObj').content;
	if(applyGroupBy){
		content = $tbl.data('confObj').groupedContObj;
	}
	callStockTakeTeamPerformanceJasperPrint(content);
};
function callStockTakeTeamPerformanceJasperPrint(reportResultArray)
{	
	var obj={	
			stockTakePrint  : stockTakePrint,
			reportResult	: reportResultArray,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val(),
			reportFor		: allInputs,
			filterApplyClicked:filterApplyClicked
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../stockTakeTeamPerformanceReport/printReportStockTakeTeamPerformancePDF.htm",
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
		stopLoading();
	console.log('request failed'+errorThrown);
	}
	});
}
function printTeamPerformance(){
	$('#stockTakeForm').attr("action", "../stockTakeTeamPerformanceReport/downloadStockTakeTeamPerformancePdf.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
}