var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';

/**
 * Invokes report service
 */
function callReportSTValuationService(){
	var requestParam = {"iv_stocktake_id" : $("#reportDetailsStockTakeId").html()};	
	console.log(reportSTValuationUrl + ' ' + JSON.stringify(requestParam));	
	
	$.ajax({
	    type: "POST",
	    url: reportSTValuationUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		 /*responseP = [ {'department_name': '149539','ttl_trdng_flr_val':'4564','ttl_rsrv_flr_val': '40','ttl_stock_val': '50'},
		                {'department_name': '1499','ttl_trdng_flr_val':'4561','ttl_rsrv_flr_val': '41','ttl_stock_val': '50'}];*/
		  //console.log(JSON.stringify(responseP));	
			if(responseP != undefined  && responseP.length > 0 && responseP[0].department_name != undefined){
				$('#mainTabs-5').find('.emptyTable').removeClass('hideBlock');
				$("#reportContent6").removeClass("hideBlock");
				loadReportContentTbl();
				callStockTakeStockValuationJasperPrint(responseP);
				totalRecords = responseP.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				bindStockValueExport(response);
				$currentPanel.removeClass('hideBlock');
			} else {
				$('#mainTabs-5').find('.emptyTable').addClass('hideBlock');
				if(responseP != undefined && responseP.length <= 0 ){
					//$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-StocktakeValuation');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
				}	
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
	  }).always(function() {
		  stopLoading();
	  });
}

function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}

function exportTableToCSVStockValue(stockValueArray, filename) {
	
		var groupedData=$groupBy(stockValueArray, function(obj) {return obj.department_name;});
		var valuesArray =['department_name','ttl_trdng_flr_val','ttl_rsrv_flr_val','ttl_stock_val'];
		var headersArray = [ 'Department', 'Trading Floor($)','Reserve Area($)','Total Stock($)'];
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
				$.each( array, function(i) {
					$.each(valuesArray, function(valuesIndex) {
					tableContent=array[i][valuesArray[valuesIndex]] == null? tableContent: tableContent+array[i][valuesArray[valuesIndex]];
					tableContent=addColDelim(tableContent);
				});
					tableContent=tableContent+tmpRowDelim;
			}); 
			}
		});
		var total=calcTotalStockValuation(stockValueArray);
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
function calcTotalStockValuation(array){
	var total = '';
	var totFlr = 0;
	var totResFlr = 0;
	var totStkVal = 0;
	console.log(array);
	if(array!=undefined && array.length>0){
	$.each(array, function(i) {
		totFlr+= array[i].ttl_trdng_flr_val!= undefined && array[i].ttl_trdng_flr_val!= null ? Number(array[i].ttl_trdng_flr_val) : 0;
		totResFlr+= array[i].ttl_rsrv_flr_val!= undefined && array[i].ttl_rsrv_flr_val!= null ? Number(array[i].ttl_rsrv_flr_val) : 0;
		totStkVal+= array[i].ttl_stock_val!= undefined && array[i].ttl_stock_val!= null ? Number(array[i].ttl_stock_val) : 0;
	  });
	}
	total+='Total';
	total=addColDelim(total);
	total+=Number(totFlr).toFixed(2);
	total=addColDelim(total);
	total+=Number(totResFlr).toFixed(2);
	total=addColDelim(total);
	total+=Number(totStkVal).toFixed(2);
	return total;
}
function bindStockValueExport(response){
    // This must be a hyperlink
	var stockValueArray=response;
    $("#stockValueExportBtn").on('click', function (event) {
        // CSV
        exportTableToCSVStockValue.apply(this, [stockValueArray, 'stocktake_valuation_export.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
}
/**
 * Configuration for the creation of stock valuation report's table
 * @param data
 * @returns {tblReportStockValuation}
 */
function tblReportStockValuation(data){
	this.option = 'build';
	this.key = ['department_name','ttl_trdng_flr_val','ttl_rsrv_flr_val','ttl_stock_val'];
	this.table_name = "Stocktake_valuation";
	this.table_title = "";
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {department_name:'Department',ttl_trdng_flr_val:'Trading Floor($)',ttl_rsrv_flr_val:'Reserve Area($)',ttl_stock_val:'Total Stock($)'},
	this.header_data_type = {department_name:'char',ttl_trdng_flr_val:'number',ttl_rsrv_flr_val:'number',ttl_stock_val:'number'},
	this.header_row_type = {department_name:'main',ttl_trdng_flr_val:'main',ttl_rsrv_flr_val:'main',ttl_stock_val:'main'},
	this.header_class = {department_name:' leftValue ',ttl_trdng_flr_val:' rightValue ',ttl_rsrv_flr_val:' rightValue ',ttl_stock_val:' rightValue '},
	this.header_title = {},
	this.header_width = {department_name:'10%',ttl_trdng_flr_val:'10%',ttl_rsrv_flr_val:'10%',ttl_stock_val:'10%'},
	this.content_class = {department_name:' leftValue ',ttl_trdng_flr_val:' rightValue ',ttl_rsrv_flr_val:' rightValue ',ttl_stock_val:' rightValue '},
	this.content_title = {},
	this.content_format = {department_name:'removeNull',ttl_trdng_flr_val:'removeNull',ttl_rsrv_flr_val:'removeNull',ttl_stock_val:'removeNull'},
	this.content_width =  {department_name:'10%',ttl_trdng_flr_val:'10%',ttl_rsrv_flr_val:'10%',ttl_stock_val:'10%'},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.cont_data_function = {dummy_value:showDummyDataDetails,ttl_trdng_flr_val:showTradinFlrVal,ttl_rsrv_flr_val:showRsrVal,ttl_stock_val:showStockVal};
	this.groupbyColumn = {'dummy_value' : 'Dummy'};
	this.group_done = bindStockValPrintCont;
	this.sort_done = bindStockValPrintCont;
	this.group_cont_function = {dummy_value : getDummmyGrpHead};
	this.groupby = true;
	this.default_groupbyColumn = [ 'dummy_value' ];
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.grp_tot = true;
	this.group_tot_cont_function = {dummy_value : getTotalBasedOnDummy};//To display total at the end of page alone
}
var getDummmyGrpHead = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="DUMMY"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr id="DUMMY"><td class="rowSection rowHighlight" colspan="4">'
				+ (obj.dummy_value || '') + '</td></tr>';
	}
	return cont;
};
var showDummyDataDetails = function(obj){
	obj.dummy_value = "DUMMY";
	return obj.dummy_value;
};
var showRsrVal = function(obj){
	obj.ttl_rsrv_flr_val  =  obj.ttl_rsrv_flr_val == undefined || obj.ttl_rsrv_flr_val == '' ? Number(0).toFixed(2):Number(obj.ttl_rsrv_flr_val).toFixed(2);
	return obj.ttl_rsrv_flr_val;
};
var showStockVal = function(obj){
	obj.ttl_stock_val  =  obj.ttl_stock_val == undefined || obj.ttl_stock_val == '' ? Number(0).toFixed(2):Number(obj.ttl_stock_val).toFixed(2);
	return obj.ttl_stock_val;
};
var showTradinFlrVal = function(obj){
	obj.ttl_trdng_flr_val  =  obj.ttl_trdng_flr_val == undefined || obj.ttl_trdng_flr_val == '' ? Number(0).toFixed(2):Number(obj.ttl_trdng_flr_val).toFixed(2);
	return obj.ttl_trdng_flr_val;
};
var getTotalBasedOnDummy = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	var totFlr = 0;
	var totResFlr = 0;
	var totStkVal = 0;
	console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			totFlr+= array[i].ttl_trdng_flr_val!= undefined && array[i].ttl_trdng_flr_val!= null ? Number(array[i].ttl_trdng_flr_val) : 0;
			totResFlr+= array[i].ttl_rsrv_flr_val!= undefined && array[i].ttl_rsrv_flr_val!= null ? Number(array[i].ttl_rsrv_flr_val) : 0;
			totStkVal+= array[i].ttl_stock_val!= undefined && array[i].ttl_stock_val!= null ? Number(array[i].ttl_stock_val) : 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="0">Total  </td><td class="rightValue valueInfo">'+Number(totFlr).toFixed(2)+'</td>'
			+'</td><td class="rightValue valueInfo">'+Number(totResFlr).toFixed(2)+'</td>'
			+'</td><td class="rightValue lastColumn valueInfo">'+Number(totStkVal).toFixed(2)+'</td>'
			+'</tr>';
};
/**
 * Frames print screen content
 * @param response
 */
function frameReportSTValuation(response){	
	content = '';
	var headerContent = '<label><strong>Stock Valuation Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br><label class="subtitle-bold">';
	constructHeaderTblSTValuation();	
	content += printHeadInnerTable;			
	frameTableSTValuation(response);
	$('#printbodyForSTStockValuation')
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
function frameTableSTValuation(response){
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
		constructContentTblSTValuation(response[i]);
		
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*if(response[i].department_name.length > 35){
			count = count + 0.5*(response[i].department_name.length/35);
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
function constructHeaderTblSTValuation() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th width="250px" style="text-align: left;">Department</th>'
		+'<th width="250px" style="text-align: right;">Trading Floor($)</th>'
		+'<th width="250px" style="text-align: right;">Reserved Area($)</th>'
		+'<th width="250px" style="text-align: right;">Total Stock($)</th>'
		+'</tr></thead>';
}
/**
 * Builds table content for print page
 * @param data
 */
function constructContentTblSTValuation(data) {
	content += '<tr class="border_bottom"><td  align="left">' + (data.department_name != null ?  data.department_name: '')
	+ '</td><td style="text-align: right;">' +  (data.ttl_trdng_flr_val != null ?  data.ttl_trdng_flr_val: '')
	+ '</td><td style="text-align: right;">' +  (data.ttl_rsrv_flr_val != null ?  data.ttl_rsrv_flr_val: '')
	+ '</td><td style="text-align: right;">' +  (data.ttl_stock_val != null ? data.ttl_stock_val: '');
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
var bindStockValPrintCont =function($tr,$tbl){
	var applyGroupBy = $tbl.data('confObj').applyGroup;
	var content = $tbl.data('confObj').content;
	if(applyGroupBy){
		content = $tbl.data('confObj').groupedContObj;
	}
	callStockTakeStockValuationJasperPrint(content);
};
function callStockTakeStockValuationJasperPrint(reportResultArray)
{	
	var obj={	
			stockTakePrint  : stockTakePrint,
			reportResult	: reportResultArray,
			StoreNo 		: $('#posSite').val(),
			StoreName 		: $('#posSiteName').val()
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../stockTakeStockValuationReport/printReportStockTakeStockValuationPDF.htm",
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
function printValuationContent(){
	$('#stockTakeForm').attr("action", "../stockTakeStockValuationReport/downloadStockTakeStockValuationPdf.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
}		