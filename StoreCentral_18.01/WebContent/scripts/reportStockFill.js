var report_dg_name = 'Report_DG';
var report_dg_title = '';
var rfGunPrint = '';
var mobilePrint = '';
var totalRecords = '';
var responseL = new Array();//LTO Location
var responseO = new Array();//Other Location
var content = '';
var printHeadInnerTable = '';
var totalLen = 0;
var totalLines = 0;
var headerContent = '';

function loadStockFillPrint(){
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
	
	 $("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	 });  
	
	
		//$('#accordion').accordion({active : true });					
	 callReportStockFillService();					
		$(".ContentTableWrapper").removeClass('hideBlock'); 
			
}
/**
 * Invokes report service
 */
function callReportStockFillService(){	
	
	var requestParam = {
			  "iv_site_no":$("#posSite").val(),
			  "iv_sales_org":$("#salesOrg").val(),
			  "iv_session":"",
			  "iv_barcode":"",
			  "iv_barcode_flag":"",
			  "iv_department":"",
			  "iv_article":"",
			  "iv_lto_barcode":""
			};
	console.log(reportStockFillUrl + ' ' + JSON.stringify('')+JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportStockFillUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  console.log(JSON.stringify(response));	
			if(response != undefined  && response.length > 0 && response[0].article_no != undefined ){
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				splitTableRecordsStockFill(response);
				frameReportStockFill();
				//document
				var a = window.open();
				$("#printDataForStockFill").show();
				a.document
						.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
				a.document
						.write(document
								.getElementById('printDataForStockFill').innerHTML);

				$("#printDataForStockFill").hide();
				a.focus();

				
				// call print
				$(a).ready(function(){
					 //a.close();   
					setTimeout(function(){$(document).unbind('click');
					doc=a;
					$(document).click(function(){
						doc.close();
						doc='';
						$(document).unbind('click');
					});a.print();},1000);
					 return true;
				    });	

			} else {
				if(response != undefined && response.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stock Fil Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stock Fil Report');
				}
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stock Fil Report');
	  }).always(function() {
		  stopLoading();
	  });
}

/**
 * Frames print screen content
 * @param data
 */
function frameReportStockFill(){
	content = '';
	var headerContent = '';
	headerContent = '<label><strong>Stock Fill Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">';
	constructHeaderTblL();
	//printHeadInnerTable = '<div class="page"><table style="font-size: 15px;page-break-before:always" class="printDeviceLogTable"><tr><th>Article</th><th align="left">Description</th><th align="left">Class</th><th align="left">Packaging Group</th><th align="left">UN Number</th><th align="left">Unit Volume</th><th align="left">Max Units</th><th>MSDS Expiry Date</th><th>DG</th><th>HAZ</th></tr>';
	content += printHeadInnerTable;
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
	
		content = content +'<h4>Fill from LTO location</h4>';
		frameTableStockFill("LTO",printFoot);
		constructHeaderTblO();
		content = content+'</tbody></table><h4>Other location</h4>'+ printHeadInnerTable;
		frameTableStockFill("OTHERS",printFoot);
	
		$('#printbodyForStockFill')
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
		//$('.endOfReport:last').removeClass('hideBlock');//To show in the last page.		
}
/**
 * Splits the table records based on the location type
 * @param response
 */
function splitTableRecordsStockFill(response){
	for(var i=0; i < response.length; i++){
		if(response[i].location_type == "LTO"){
			responseL[responseL.length] = response[i];
		}else if(response[i].location_type == "OTHERS"){
			responseO[responseO.length] = response[i];
		}
	}
}	
function frameTableStockFill(tblType,printFoot){
	var count = 0;	
	var firstPageCreated = false;
	printHeadInnerTable = '';response = '';
	if(tblType == "LTO"){
		constructHeaderTblL();
		response = responseL;
	}if(tblType == "OTHERS"){
		constructHeaderTblO();
		response = responseO;
	}
	for ( var i = 0; i < response.length; i++) {
		if(tblType == "LTO"){
			constructContentTblL(response[i]);
		}if(tblType == "OTHERS"){
			constructContentTblO(response[i]);
		}
		
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*if(response[i].article_name.length > 35){
			count = count + 0.5*(response[i].article_name.length/35);
		}*/
		if (tblType == "OTHERS" && i >= (response.length - 1)){
			content += '</tbody></table>';
			content +='<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: * Single Price Promo, # Multibuy, @ In-store Promo</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
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
 * Builds table header for print LTO Location table
 */
function constructHeaderTblL() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;height:60%;min-height:550px;table-layout: fixed; width: 950px;" class="printDeviceLogTable ContentTable">'
		+'<thead>'
		+'<tr>'
		+'<th class="centerValue" width="7px">Article</th>'
		+'<th class="centerValue" width="7px"></th>'
		+'<th class="centerValue" width="15px">Description</th>'
		+'<th class="centerValue" width="5px">OM</th>'
		+'<th class="centerValue" width="5px">SOH</th>'
		+'<th class="centerValue" width="5px">Capacity</th>'
		+'<th class="centerValue" width="5px">LTO Qty.</th>'
		+'<th class="centerValue" width="9px">Cartons to Fill</th>'
		+'<th class="lastColumn" width="15px">LTO Location</th>'
		+'</tr>'
		+'</thead>';																							
	
}
/**
 * builds table content for print
 * @param data
 */
function constructContentTblL(data) {
	content += '<tr class="border_bottom"><td  align="left">' + (data.article_no != null ?  data.article_no: '')
			+ '</td><td class="centerValue">' +  (data.promo_indicator != null ?  data.article_no: '')
			+ '</td><td align="left">' +  (data.article_name != null ?  data.article_name: '')
			+ '</td><td class="centerValue">' +  (data.lto_qty != null ? data.om: '')
			+ '</td><td class="centerValue">' +  (data.soh != null ? data.soh: '')
				+ '</td><td class="centerValue">' +  (data.soh != null ? data.shelf_capacity: '')
			+ '</td><td class="centerValue">' +  (data.lto_qty != null ? data.lto_qty+" "+data.uom: '')
			+ '</td><td class="centerValue">' +  ((data.units_to_fill != null && data.pack_size != null) ? (Number(data.units_to_fill) * Number(data.pack_size)): 0)
			+ '</td><td class="centerValue">' +  (data.lto_name != null ? data.lto_name: '')
			+ '</td></tr>';
}
/**
 * Builds table header for print Other Location table
 */
function constructHeaderTblO() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;height:60%;min-height:600px;table-layout: fixed; width: 950px;" class="printDeviceLogTable ContentTable">'
		+'<thead>'
		+'<tr>'
		+'<th class="centerValue" width="7px">Article</th>'
		+'<th class="centerValue" width="7px"></th>'
		+'<th class="centerValue" width="15px">Description</th>'
		+'<th class="centerValue" width="5px">OM</th>'
		+'<th class="centerValue" width="5px">SOH</th>'
		+'<th class="centerValue" width="5px">Capacity</th>'
		+'<th class="centerValue" width="5px">LTO Qty.</th>'
		+'<th class="centerValue" width="9px">Cartons to Fill</th>'
		+'<th class="lastColumn" width="10px">Promo Location</th>'
		+'</tr>'
		+'</thead>';																								
	
}
/**
 * builds table content for print
 * @param data
 */
function constructContentTblO(data) {
		content += '<tr class="border_bottom"><td  align="left">' + (data.article_no != null ?  data.article_no: '')
		+ '</td><td class="centerValue">' +  (data.promo_indicator != null ?  data.article_no: '')
		+ '</td><td align="left">' +  (data.article_name != null ?  data.article_name: '')
		+ '</td><td class="centerValue">' +  (data.lto_qty != null ? data.om: '')
		+ '</td><td class="centerValue">' +  (data.soh != null ? data.soh: '')
			+ '</td><td class="centerValue">' +  (data.soh != null ? data.shelf_capacity: '')
		+ '</td><td class="centerValue">' +  (data.lto_qty != null ? data.lto_qty: '')
		+ '</td><td class="centerValue">' +  ((data.units_to_fill != null && data.pack_size != null) ? (Number(data.units_to_fill) * Number(data.pack_size)): 0)
		+ '</td><td class="centerValue">' +  (data.lto_name != null ? data.promo_disp_loc: '')
		+'</td></tr>';
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