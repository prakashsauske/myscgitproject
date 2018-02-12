var report_dg_name = 'Report_DG';
var report_dg_title = '';
var rfGunPrint = '';
var mobilePrint = '';
var totalRecords = '';

function loadDGPrint(){
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
	
	 $("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	 });  
	
	
		//$('#accordion').accordion({active : true });					
		callReportDGService();					
		$(".ContentTableWrapper").removeClass('hideBlock'); 
		
	
			
}
/**
 * Invokes report service
 */
function callReportDGService(){	
	console.log(reportDeviceLogUrl + ' ' + JSON.stringify(''));	
	$.post(reportDGUrl).done(function(response) {
	console.log(JSON.stringify(response));	
	if(response != undefined && response.length > 0 && response[0].v_article_no != undefined){
		totalRecords = response.length;
		$("#noRecords").html(totalRecords);//Sets the no of records
		frameReportDG(response);
		//document
		var a = window.open();
		$("#printDataForDG").show();
		a.document
				.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
		a.document
				.write(document
						.getElementById('printDataForDG').innerHTML);

		$("#printDataForDG").hide();
		a.focus();

		
		// call print
		$(a).ready(function(){
			 //a.close();   
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });	

	} else {
		if(response != undefined && response.length <= 0 ){
			$.fn.showCustomMsg(['Sorry, No records found.'],success,'DG Report');
		}else{
			$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'DG Report');
		}
	}			
	});
}

/**
 * Frames print screen content
 * @param data
 */
function frameReportDG(data){
	var content = '';
	var headerContent = '';
	headerContent = '<label><strong>Dangerous & Hazardous Goods Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div><div style="float:right"><label class="subtitle">Executed by'
		+$("#firstName").val()+' '+$("#lastName").val()+'('+$("#loginUserId").val()+') on </label><label class="currentDate subtitle"></label></br></br>'
		+'<label class="subtitle-bold">List of Articles ( <strong id="noRecords">'+totalRecords+'</strong> ) </label></br>';
	
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;page-break-before:always" class="printDeviceLogTable"><tr>'
		+'<th>Article</th>'
		+'<th align="left">Description</th>'
		+'<th align="left">Class</th>'
		+'<th>Packaging </br> Group</th>'
		+'<th>UN </br>  Number</th>'
		+'<th>Unit </br> Volume</th>'
		+'<th>Max </br> Units</th>'
		+'<th>Max Vol </br> Held</th>'
		+'<th>MSDS </br> Expiry Date</th>'
		+'<th>DG</th>'
		+'<th>HAZ</th></tr>';
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
	var count = 0;var rowHt = 0;
	var v_max_units =''; var v_max_vol_held = '';
	for ( var i = 0; i < data.length; i++) {
		v_max_units ='';v_max_vol_held = '';
		data[i].v_hazard_class =(data[i].v_hazard_class!=null && data[i].v_hazard_class!= undefined)?data[i].v_hazard_class:'';
		data[i].v_hazard_pck_grp =(data[i].v_hazard_pck_grp!=null && data[i].v_hazard_pck_grp!= undefined)?data[i].v_hazard_pck_grp:'';
		data[i].v_hazard_unit =(data[i].v_hazard_unit!=null && data[i].v_hazard_unit!= undefined)?data[i].v_hazard_unit:'';
		//Max Units : When v_soh < v_shelf_capacity, then display v_shelf_capacity, else v_soh		
		if(data[i].v_soh < data[i].v_shelf_capacity){
			v_max_units =  data[i].v_shelf_capacity;
		}else {
			v_max_units =  data[i].v_soh;
		}
		//Max Volume Held : Max Units * v_hazard_unit_vol
		v_max_vol_held = v_max_units * data[i].v_hazard_unit_vol;
		
		content += '<tr class="border_bottom">'
				+ '<td style="width:10%" align="center">' + data[i].v_article_no
				+ '</td><td style="width:70%" align="left">' + data[i].v_article_desc
				+ '</td><td  align="left">' + data[i].v_hazard_class
				+ '</td><td  align="left">' + data[i].v_hazard_pck_grp
				+ '</td><td  align="left">' + data[i].v_hazard_unit
				+ '</td><td  align="left">' + data[i].v_hazard_unit_vol
				+ '</td><td  align="left">' + v_max_units
				+ '</td><td  align="left">' + v_max_vol_held
				+ '</td><td  align="left">' + data[i].v_hazard_exp
				+ '</td><td  align="left">' + data[i].v_danger_ind
				+ '</td><td  align="left">' + data[i].v_hazard_ind
				+ '</td></tr>';
		rowHt++;
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 19;
		if(data[i].v_article_desc.length >= 22){
			count = count + 0.5*(data[i].v_article_desc.length/27);
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
		
	
		$('#printbodyForDG')
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