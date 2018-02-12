var report_deviceLog_name = 'Report_Device_Log_Table';
var report_deviceLog_title = '';
var rfGunPrint = '';
var mobilePrint = '';
var totalRecords = '';
var responseO = '';

$( document ).ready(function() {			// for Defect_7130
	$( "#rfGunCheckBox" ).prop( "checked", true );
	$( "#mobileCheckBox" ).prop( "checked", true );
});

$(function() {	
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			/* Autocomplete Off */
			document.forms[0].autocomplete="off";
			
			//Registers back button click event
			 $("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
			});  			 
			
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
				var rfGun = $('#rfGunCheckBox').is(':checked')?'Y':'N';
				var mobile = $('#mobileCheckBox').is(':checked')?'Y':'N';
				var param = {
						"iv_rfgun_type"			:rfGun,
						"iv_mobile_type"		:mobile
						};
				if($("#rfGunCheckBox").is(":not(:checked)") && $("#mobileCheckBox").is(":not(:checked)")){
	                $.fn.showCustomMsg(['Please select any of the option(s)'],error,'Device Log Report');
	            }
	            else{

				callReportDeviceLogService(param);	
	                }
				//console.log("Report Device Log Param"+param);
				if(rfGun == 'Y' && mobile == 'Y'){
					rfGunPrint = "RFGun,";
					mobilePrint = " Mobile";
				}else if(rfGun == 'N' && mobile == 'N'){
					rfGunPrint = "";
					mobilePrint = "";
				}else if(rfGun == 'Y' && mobile == 'N'){
					rfGunPrint = "RFGun";
					mobilePrint = "";
				}else if(rfGun == 'N' && mobile == 'Y'){
					rfGunPrint = "";
					mobilePrint = "Mobile";
				}
			});
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });			
				
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
			//Close Button
			$("#closeLink").click(function(){
				$('#accordion').accordion({active : true });	
			});
		});
/**
 * Invokes Report Device Log service
 * @param recvParam
 */
function callReportDeviceLogService(recvParam){	
	console.log(reportDeviceLogUrl + ' ' + JSON.stringify(recvParam));
	$(".ContentTableWrapper").addClass('hideBlock'); 
	$.ajax({
	    type: "POST",
	    url: reportDeviceLogUrl,
	    data: JSON.stringify(recvParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseO = response;
			//console.log(JSON.stringify(responseO));	
			if(responseO != undefined && responseO.length > 0 && responseO[0].userid != undefined ){
				$(".ContentTableWrapper").removeClass('hideBlock'); 
				$('#accordion').accordion({active : true });	
				var $tblhold = $("#reportDeviceLogContent");
				loadReportContentTbl(response,$tblhold);
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
			}else{
				if(responseO != undefined && responseO.length <= 0 ){
					//$("#noRecFoundDiv").removeClass("hideBlock");
					$.fn.showCustomMsg(['Sorry no results found'],error,'Device Log Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured'],error,'Device Log Report');
					$("#noRecFoundDiv").addClass("hideBlock");
				}
			}	
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Device Log Report');
	  }).always(function() {
		  stopLoading();
	  });
}
/**
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= new tblReport(data);	
	$tblhold.loadtbl(confObj);
}

/**
 * Generate Report's table configuration
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReport(data){
	this.option = 'build';
	this.key = ['userid','user_name','device_id','device_name','logon_date','logoff_date','duration'];
	this.table_name = report_deviceLog_name;
	this.table_title = report_deviceLog_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {userid:'User ID',user_name:'Name',device_id:'Device ID',device_name:'Type',logon_date:'Log-on Date',logoff_date:'Log-off Date',duration:'Session Duration'},
	this.header_data_type = {userid:'char',user_name:'char',device_id:'char',device_name:'char',logon_date:'date',logoff_date:'date',duration:'number'},
	this.header_row_type = {userid:'main',user_name:'main',device_id:'main',device_name:'main',logon_date:'main',logoff_date:'main',duration:'main'},
	this.header_class = {userid:'',user_name:'',device_id:'',device_name:'',logon_date:'',logoff_date:'  ',duration:' lastColumn '},
	this.header_title = {},
	this.header_width = {userid:'7%',user_name:'15%',device_id:'7%',device_name:'7%',logon_date:'7%',logoff_date:'7%',duration:'7%'},
	this.content_class = {userid:'',user_name:'',device_id:'',logon_date:'',dept_name:'',logoff_date:'',duration:' lastColumn '},
	this.content_title = {},
	this.content_format = {userid:'removeNull',user_name:'removeNull',device_id:'removeNull',device_name:'removeNull',logon_date:'removeNull',logoff_date:'removeNull',duration:'removeNull'},
	this.content_width =  {userid:'7%',user_name:'15%',device_id:'7%',device_name:'7%',logon_date:'7%',logoff_date:'7%',duration:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.cont_data_function = {duration:showSessionDuration};
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
	this.legend = '<div class="legend">Legend: Log-off date blank indicates user has not signed out of the device.</label></div>'; //Mail sub:  UI Issues with respect to Device Log Report
}
var showSessionDuration = function(obj){
	return convertSECtoHHMMSS(obj.duration);
};
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
 * Date Format
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
 * Displays error message
 * @param msg
 * @param title
 */
function showReportErrorMsg(msg, title) {
	var errorContent = '<li><ol><li>' + msg + '</li></ol></li>';
	$('#reportErrorWrapper').find('#titleContent').html(title);
	$('#reportErrorWrapper').find('#errorContent').html(errorContent);
	$('#reportErrorWrapper').removeClass('hideBlock');
}	