var report_name = "Report SUGO3";
var report_title = '';
var requestParam = '';
var deptArray = new Array();
var deliveryDate = '';
var orderNo = '';
var validtnFlag = true;
$(function() {		
	//Code for accordion
	$("#accordion").accordion({
		header:"h3",
		collapsible: true, 		
		heightStyle: "content" 
	});
	
	// Code for profile menu
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	
	 $("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	 }); 
	
	//Code for calndar control
	$(".inputDate").datepicker({
		zIndex:50
	});
	
	$("#generateReport").click(function(){	
		if(buildReqParam()){
			$(".ContentTableWrapper").removeClass('hideBlock'); 
			$('#accordion').accordion({active : true });
			callReportService();
		}
	});	
		
	// Code for tool tips
	$(".title").tooltip({
		position: { my: "left bottom", at: "left-2 top" }
		});
	
	 populateDepartmentDropDown();
		
});

/**
 * Populates contents of department drop down
 */
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
					content += '<option class="values" value="'
							+ temList[i].node_id + '">' + temList[i].node_desc
							+ '</option>';
				}
				$('#deptSelectOptions').append(content);
			}
		},
		error : function(response) {
		},
	});
}
/**
 * Sets the request parameters for the service
 */
function buildReqParam() {
	//Variable declarations
	deptArray = new Array();
	deliveryDate = '';
	orderNo = '';
	validtnFlag = true;
	
	//value assignments
	deliveryDate = $("#date1").val();
	orderNo = $("#on").val();
	var deptDrpDwn = $("#deptSelectOptions").val();
	if (deptDrpDwn == "All Department") {// If all dept selected populate
		// send all values in request
		deptDrpDwn = '';
		$('#deptSelectOptions .values').each(function() {
			deptArray[deptArray.length] = $(this).val();
		});
	}else{
		deptArray[deptArray.length] = deptDrpDwn;
	}
	
	//validations
	if(deliveryDate == ''){
		showReportErrorMsg('Please select Devliery Date','Delivery Date');
		validtnFlag = false;
	}else if(orderNo == ''){
		showReportErrorMsg('Please enter order number','Order No.');
		validtnFlag = false;
	}
	
	//Request parameter
	if(validtnFlag){
		requestParam = {
				"iv_article_list" : deliveryDate,
				"iv_dept_list" : deptArray,
				"iv_cat_list" : orderNo
			};
		console.log('SUGO1 Report Request- ' + requestParam);	
	}
	return validtnFlag;
	
}
/**
 * Calls inventory report service
 * @param recvParam
 */
function callReportService(){	
	console.log(reportInventoryUrl + ' ' + JSON.stringify(requestParam));	
	//$.post(reportInventoryUrl, JSON.stringify(requestParam)).done(function(response) {
	response = [ {
		'article_no' : '149539',
		'article_desc' : 'Chicken Breast Stir Fry Rw',
		'om' : '2',
		'soo' : '8',
		'sit' : '4',
		'soh' : '5',
		'mpl' : '345',
		'date1' : '175',
		'date2' : '182',
		'date3' : '10',
		'date4' : '12',
		'date5' : '13',
		'check' : '15',
		'sugoq1' : '18',
		'sugoq2' : '19',
		'orderq1' : '15',
		'orderq2' : '12',
		'sugoQty' : '56'
	
	} ];
		console.log(JSON.stringify(response));	
		if(response != undefined && response[0].article_no != undefined && response.length > 0){
			var $tblhold = $("#reportContent");
			loadReportContentTbl(response,$tblhold);
			totalRecords = response.length;
			$("#noRecords").html(totalRecords);//Sets the no of records
			
			//Sets order details
			$("#deliveryDateVal").text(deliveryDate);
			$("#revByTimeVal").text(deliveryDate);
			$("#roasterDateValue").text(deliveryDate);
			$("#supplierValue").text(deliveryDate);
			
			bindPrint(response);
		} else {
			showReportErrorMsg('Sorry, Some technical issue occured ', 'SUGO1 Report');
		}			
	//});
}
/**
 * Sets the report content area and the table
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= (new tblReport(report_name,report_title,data));
	$tblhold.loadtbl(confObj);
}

/**
 * Cofiguration to generate the report table
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReport(table_name,table_title,data){

	this.option = 'build';
	this.key = [ 'article_no','article_desc', 'om', 'soo', 'sit', 'soh','mpl','sugoQty', ];
	this.table_name = report_name;
	this.table_title = '';
	this.table_class = ' ContentTable actionRows';
	this.header_tr_class = 'collapsed';
	this.header_name = {article_no : 'Article#',article_desc : 'Article Description',om:'OM',soo:'SOO',sit:'SIT',soh:'SOH',mpl:'MPL',sugoQty:'SUGO Qty.'};
	this.header_data_type = {article_no : 'number',article_desc : 'char',om:'number',soo:'number',sit:'number',soh:'number',mpl:'number',sugoQty:'number'};
	this.header_row_type = {article_no : 'main',article_desc : 'main',om : 'main',soo : 'main',	sit : 'main',soh:'main',mpl:'main',sugoQty:'main'};
	this.header_class = {article_no : '',article_desc : '',om : '  centerValue ',user : ' centerValue columnDivider  ',sugoQty : ' centerValue columnDivider  ',soo : ' centerValue  ',sit : '  centerValue   ',soh : ' centerValue  ',mpl : '  centerValue   '	};
	this.header_width = {article_no : '7%',article_desc : '10%',om:'1%',soo:'1%',sit:'1%',soh:'1%',mpl:'1%',sugoQty:'4%'};
	this.content_class = {article_no : '',article_desc : '',om : ' centerValue columnDivider  ',	sugoQty : ' centerValue columnDivider  '};
	this.content_format = {article_no : 'removeNull',article_desc : 'removeNull',om:'removeNull',soo:'removeNull',sit:'removeNull',soh:'removeNull',mpl:'removeNull',sugoQty:'removeNull'};
	this.content_width = this.content_format = {article_no : '',article_desc : '',om:'',soo:'',sit:'',soh:'',mpl:'',sugoQty:''};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
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
}
/**
 * Binds generate report click event
 * @param response
 */
function bindPrint(response){
	$("#printReport").click(function(){
		frameReport(response);
		//document
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
		$(a).ready(function(){
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });		
	});
}
/**
 * Frames print screen content
 * @param data
 */
function frameReport(data){
	var content = '';
	var headerContent = '';
	headerContent = '<label><strong>PLU Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle">Department: Deleted PLUs Included'
	+'</label></br></br><label class="subtitle">Total <strong id="noRecords">'+totalRecords+'</strong> records </label>';
	
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;" class="printDeviceLogTable"><tr><th>PLU</th><th align="left">Article</th><th align="left">Description</th><th align="left">Department</th><th align="left">Category</th><th align="left">Sub-cateogry</th><th align="left">Segment</th><th align="left">Status</th></tr>';
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
		var firstPageRecords = 9;
		var otherPageRecords = 16;
		if(data[i].article_desc.length > 27){
			count = count + 0.5*(data[i].article_desc.length/27);
		}
		if (i == (data.length - 1)){
			content += '</tbody></table>';
			content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
		}
		if(i==firstPageRecords ){
			count =0;
			content += '</tbody></table>' + printFoot+'</div>'
			+ printHeadInnerTable;			
		}else {
			if (i == (data.length - 1)){
					if(count != otherPageRecords && i> firstPageRecords){
					content += '<table><tbody>';
					for(var n=0;n<((otherPageRecords-2)-count);n++){
						content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
					}
					content += '</tbody></table>';
				}else{
					content += '<table><tbody>';
					for(var n=0;n < ((firstPageRecords-2)-count);n++){
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