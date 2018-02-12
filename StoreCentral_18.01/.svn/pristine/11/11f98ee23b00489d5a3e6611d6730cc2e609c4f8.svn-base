var dataFound = false;
$(function() {

	/* Function to activate only few dates */
	var availableDates = [ "8-10-2014", "9-10-2014", "10-10-2014",
			"11-10-2014", "12-10-2014", "13-10-2014", "14-10-2014",
			"15-10-2014", "16-10-2014", "17-10-2014", "18-10-2014",
			"19-10-2014", "20-10-2014", "21-10-2014", "22-10-2014",
			"23-10-2014" ];
	function available(date) {
		dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-"
				+ date.getFullYear();
		if ($.inArray(dmy, availableDates) != -1) {
			return [ true, "", "Available" ];
		} else {
			return [ false, "", "unAvailable" ];
		}
	}

	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,

	});

	// Code for accordionnightFillReport
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$('#closeLink').click(function() {
		$('#accordion').accordion({
			active : true
		});
	});

	$('#backBtn').click(function() {
		window.location.href = "../login/goingHome.htm";
	});

	$("#generateReport").click(function() {
		//alert("---121121");
		/*$("#reportContent").removeClass('hideBlock'); 
		$('#accordion').accordion({active : true });*/
		var flag = false;
		flag = validate();
		if (flag) {
			getNightFillLabourDataSC($('#nightFillReport').serialize());
		}

	});
	$("#generateReportSC").click(function() {
		/*$("#reportContent").removeClass('hideBlock'); 
		$('#accordion').accordion({active : true });*/
		var flag = false;
		flag = validate();
		if (flag) {
			getNightFillLabourDataSC($('#nightFillReport').serialize());
		}

	});
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// checks radio buttons in Souce of Supply
	$('#warehouse').click(function() {
		$("#warehouseField").removeClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
		$("#allField").addClass('hideBlock');
	});

	$('#all').click(function() {
		$("#allField").removeClass('hideBlock');
		$("#warehouseField").addClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
	});

	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	var newYear = today.getFullYear();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}

	var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);
	$('#dateFrom').val(presentDate);

	$("#filterTabs").tabs();

	//store change Popup 
	$("#dialog-selectStore").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 320
	});

	$("#dialog-selectStore").parent().addClass("popupWrapper");

	// End			

	// code to open store change
	$("#selectStore, .store").click(function() {
		$("#dialog-selectStore").dialog("open");
	});

	// code to close store change
	$(".popupActions .actionBtn, .popupActions .secondaryActionBtn ").click(
			function() {
				$("#dialog-selectStore").dialog("close");
			});
	
	$('.parentrow').click(
			function() {
				if ($(this).parent().hasClass('collapsed')) {
					$(this).parent().removeClass('collapsed').addClass('expanded');
					$(showAccord($(this).parent().attr('id').trim(), $(this).parent()))
							.insertAfter($(this).parent());
				} else {
					$(this).parent().removeClass('expanded').addClass('collapsed');
					if ($(this).parent().next().hasClass('childTr')) {

						$(this).parent().next().remove();
					}
				}
			});

});

function formKRONOSContent(response) {
	var m = $.parseXML(response);
	var d = $(m);
	var array = d.find('array');
	var content = '';
	var parentContent='';
	var childContent='';
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != '' && $(array).find('record').length > 0) {
		dataFound = true;
		var list = $(array).find('record');
		var totalAdjustmentHours = Number(d.find('[name=adjustmentHours]').text()).toFixed(2);
		var totalWorkingHours = 0.00;
		var prevParentEmpName='blank';
		var parentEmpName='';
		var srtShift='srtShift';
		var endShift='endShift';
		var srtShiftTmp='';
		var endShiftTmp='';
		var prevSrtShiftTmp='';
		var prevEndShiftTmp='';
		
		var shiftStartTime='';
		var shiftEndTime='';
		
		var totalWorkingHr='0:00';
		var workHrPrev='';
		var workHrNext='';
		var hour = '';
		var min = '';
		var nonWorkingHr='0';
		for ( var i = 0; i < list.length; i++) {
		
			parentEmpName=$(list[i]).find(":nth-child(1)").text();
			//alert(prevParentEmpName+'===='+parentEmpName)
			if(prevParentEmpName.toLowerCase()==parentEmpName.toLowerCase()){
			//	alert("child");
				workHrPrev=totalWorkingHr;
				workHrNext=$(list[i]).find(":nth-child(8)").text();
				
				hour = parseInt( workHrPrev.split(':')[0]);
				min = parseInt( workHrPrev.split(':')[1]);
				hour =hour+ parseInt( workHrNext.split(':')[0]);
				min = min+parseInt( workHrNext.split(':')[1]);
				
				if(min>60){
					hrinIn=parseInt(min/60)
					hour=hour+hrinIn;
					min=min-60;
				}
				totalWorkingHr=hour+':'+min
				nonWorkingHr=parseInt($(list[i]).find(":nth-child(7)").text());
				var tmpHr1=parseInt($(list[i]).find(":nth-child(3)").text());
				if(tmpHr1>12){
					tmpHr1=tmpHr1-12+" PM"
				}else{
					tmpHr1=tmpHr1+" AM"
				}
				var tmpHr2=parseInt($(list[i]).find(":nth-child(6)").text());
				if(tmpHr2>12){
					tmpHr2=tmpHr2-12+" PM"
				}else{
					tmpHr2=tmpHr2+" AM"
				}
				childContent='<tr>'
							+'<td></td>'
							+'<td>'
							+$(list[i]).find(":nth-child(9)").text()
							+'</td>'
							+'<td>'
							+tmpHr1
							+' - '
							+tmpHr2
							+'</td>'
							+'<td>'
							+$(list[i]).find(":nth-child(8)").text()
							+'</td>'
							+'<td>'
							+$(list[i]).find(":nth-child(7)").text()
							+'</td>'
							
							+'</tr>'
						//	shiftEndTime=$(list[i]).find(":nth-child(4)").text()+ '' +$(list[i]).find(":nth-child(6)").text();
							shiftEndTime=tmpHr2
				nonWorkingHr=prevNonWorkingHr+parseInt($(list[i]).find(":nth-child(7)").text());
			}else{
				
			//	alert("parent");
				shiftStartTime=$(list[i]).find(":nth-child(2)").text()+'####' +$(list[i]).find(":nth-child(3)").text()+'*****';
				//totalWorkingHr=$(list[i]).find(":nth-child(8)").text();
				if(prevParentEmpName.toLowerCase()=='blank'){
					parentContent='';
					childContent='';
					//parentContent='<tr>'
					//	alert("blank");
						
				}else{
					//alert("not blank");
					//parentContent='</tr></table><tr>'
					childContent=childContent+'</td></tr></table>'
					var shifhtStartEndTime=shiftEndTime;
					//var z=calculate('13/02/2016 20:00','14/02/2016 03:00');
					//var z=calculate();
				//	alert(shiftEndTime);
					parentContent=parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
					parentContent=parentContent.replace('totalWrkHrs',totalWorkingHr);
					parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
					content=content+parentContent;
					content=content+childContent;
					//alert('1---'+content);
					parentContent='';
					childContent='';
				}
				parentEmpName=$(list[i]).find(":nth-child(1)").text();
				
				
				nonWorkingHr=parseInt($(list[i]).find(":nth-child(7)").text());
				
				workHrPrev='0:00';
				workHrNext=$(list[i]).find(":nth-child(8)").text();
				
				hour = parseInt( workHrPrev.split(':')[0]);
				min = parseInt( workHrPrev.split(':')[1]);
				hour =hour+ parseInt( workHrNext.split(':')[0]);
				min = min+parseInt( workHrNext.split(':')[1]);
				if(min>60){
					hrinIn=parseInt(min/60)
					hour=hour+hrinIn;
					min=min-60;
				}
				totalWorkingHr=hour+':'+min
				totalWorkingHours=totalWorkingHours+parseInt(hour);
				prevEndShiftTmp=$(list[i]).find(":nth-child(4)").text()+ ' '+$(list[i]).find(":nth-child(6)").text();
				
				
			
				
				var tmpHr1=parseInt($(list[i]).find(":nth-child(3)").text());
				if(tmpHr1>12){
					tmpHr1=tmpHr1-12+" PM"
				}else{
					tmpHr1=tmpHr1+" AM"
				}
				var tmpHr2=parseInt($(list[i]).find(":nth-child(6)").text());
				if(tmpHr2>12){
					tmpHr2=tmpHr2-12+" PM"
				}else{
					tmpHr2=tmpHr2+" AM"
				}
				
				parentContent=parentContent	+'<tr class="parentrow collapsed" id="'+i+'" onclick=showHide(this.id)><td width="20%">'
					+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
					+'</td>'
					+'<td width="30%">'
					//+$(list[i]).find(":nth-child(2)").text()+' '+$(list[i]).find(":nth-child(3)").text()+' '+'tmpEndDtTm'
					+tmpHr1+' - '+'tmpEndDtTm'
					+'</td>'
					+'<td width="30%">'
					+'totalWrkHrs'
					+'</td>'
					+'<td width="10%">'
					+'nonWrkHrs'
					+'</td>'
					+'<td width="10%"></td>'
					+'</tr>'
					+'<tr class="childrow expanded" id="childrow_'+i+'"><td colspan="5" width="100%"><table width="100%"><tr>'//child content also in parent
					
					    +'<td width="20%"></td>'
					    +'<th width="30%">Job Name</th>'
						+'<th width="30%">Shift Time</th>'
						+'<th width="10%">Work Hours</th>'
						+'<th width="10%">Non Night Fill Hours</th>'
						+'<tr>'
						
						+'<tr>'
						+'<td></td>'
						+'<td>'
						+$(list[i]).find(":nth-child(9)").text()
						+'</td>'
						+'<td>'
						+tmpHr1
						+' - '
						+tmpHr2
						+'</td>'
						+'<td>'
						+$(list[i]).find(":nth-child(8)").text()
						+'</td>'
						+'<td>'
						+$(list[i]).find(":nth-child(7)").text()
						+'</td>'
					
						+'</tr>'
						prevParentEmpName=parentEmpName;
				prevNonWorkingHr=nonWorkingHr;
			}
			
			prevParentEmpName=parentEmpName;
		}
		var shifhtStartEndTime=shiftEndTime;
		parentContent=parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
		parentContent=parentContent.replace('totalWrkHrs',totalWorkingHr);
		parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
		 
		childContent=childContent+'</td></tr></table>'
		content=content+parentContent;
		content=content+childContent;
		//alert('2---'+content);
		
		
		
		if (content != '') {
			console.log('totalWorkingHours::'+totalWorkingHours);
			console.log('totalAdjustmentHours::'+totalAdjustmentHours);
			var grandTotal = totalWorkingHours - totalAdjustmentHours;
			content += '<tr><td colspan="4" class=""><strong>Total</strong></td><td class="numberColumn columnDivider">'
				+'<strong>'+Number(totalWorkingHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr><tr>'											
				+'<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'			
				+'<td class="numberColumn columnDivider"><strong>-'+totalAdjustmentHours+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'
			+'<tr class="lastRow">'											
				+'<td colspan="4" class="valueInfo">Grand Total</td>'			
				+'<td class="numberColumn valueInfo columnDivider">'+Number(grandTotal).toFixed(2)+'</td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'; 
			$('#kronosTable tbody').html('').html(content);
			$('#reportContent').removeClass('hideBlock');
			$('.childrow').addClass('hideBlock');
		}

	}else{
		//error
		if(array!='' && array != undefined){
			showError('No data found');
		}else if(response!=''){
			showError('We are facing technical issues to retrieve KRONOS Rosters information, please try again later.');
		}else{
			showError('No data found');	
		}
	}

}
function formKRONOSContent1(response) {
	var m = $.parseXML(response);
	var d = $(m);
	var array = d.find('array');
	var content = '';
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != '' && $(array).find('record').length > 0) {
		dataFound = true;
		var list = $(array).find('record');
		var totalAdjustmentHours = Number(d.find('[name=adjustmentHours]').text()).toFixed(2);
		var totalWorkingHours = 0.00;
		for ( var i = 0; i < list.length; i++) {
			/*console.log($(list[i]).find(":nth-child(1)").text());
			console.log($(list[i]).find(":nth-child(2)").text());
			console.log($(list[i]).find(":nth-child(3)").text());
			console.log($(list[i]).find(":nth-child(4)").text());
			console.log($(list[i]).find(":nth-child(5)").text());*/
			content += '<tr><td>'
					+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
					+ '</td>'
					+ '<td class="">'
					+ $(list[i]).find(":nth-child(2)").text()//EMPLOYEE_STATUS
					+ '</td><td class="centerValue">'
					+ $(list[i]).find(":nth-child(3)").text() +' - '+ $(list[i]).find(":nth-child(4)").text()//SHIFT_START_TIME - SHIFT_END_TIME
					+ '</td>'
					+ '<td class="numberColumn rightValue">'
					+ $(list[i]).find(":nth-child(5)").text()//BREAK_HOURS
					+ '</td><td class="numberColumn columnDivider rightValue">'
					+ $(list[i]).find(":nth-child(6)").text()//WORK_HOURS
					+ '</td>'
					+ '</tr>';
			totalWorkingHours += Number($(list[i]).find(":nth-child(6)").text());
		}
		
		if (content != '') {
			var grandTotal = totalWorkingHours - totalAdjustmentHours;
			content += '<tr><td colspan="4" class=""><strong>Total</strong></td><td class="numberColumn columnDivider">'
				+'<strong>'+Number(totalWorkingHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr><tr>'											
				+'<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'			
				+'<td class="numberColumn columnDivider"><strong>-'+totalAdjustmentHours+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'
			+'<tr class="lastRow">'											
				+'<td colspan="4" class="valueInfo">Grand Total</td>'			
				+'<td class="numberColumn valueInfo columnDivider">'+Number(grandTotal).toFixed(2)+'</td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'; 
			$('#kronosTable tbody').html('').html(content);
			$('#reportContent').removeClass('hideBlock');
		}

	}else{
		//error
		if(array!='' && array != undefined){
			showError('No data found');
		}else if(response!=''){
			showError('We are facing technical issues to retrieve KRONOS Rosters information, please try again later.');
		}else{
			showError('No data found');	
		}
	}

}

function validate() {
	var flag = false;
	var fromDate = formateDate($('#dateFrom').val());
	$('#dateFromHide').text(fromDate);
	var date1 = new Date();

	var parts = fromDate.split('/');
	var partsLen = parts.length;
	var date1Len = fromDate.length;
	date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
	var newTime = Number(date1.getTime());
	newTime = Number(newTime)
			+ Number(24 * 60 * 60 * 1000 * 90);
	var splittedDate = formateDate($('#dateFrom').val(),
			$('#dateFrom').val().split('/').length)
			.split('/');
	var splittedTwo = splittedDate[0] + splittedDate[1]
			+ splittedDate[2];
	if (fromDate == "") {
		showError('Please enter Date.');
		callFrom();
		flag = false;
	}else if (partsLen != 3 || date1Len != 10
			|| fromDate.split('/')[0] > 31
			|| fromDate.split('/')[1] > 12
			|| fromDate.split('/')[2].length != 4) {
		showError('Invalid Date.');
		callFrom();
		flag = false;
	}else if ((splittedDate[0] > 31
			|| splittedDate[1] > 12 || splittedDate[2] > 9999 )
			|| isNaN(splittedTwo)) {

		showError("Invalid Date Format");
		flag = false;
	} 
		else
			{
			flag = true;
			}
	return flag;
}

function getNightFillLabourData(data) {

	$.ajax({
		type : "get",
		url : "generateReportSC.htm",
		data : data,

		beforeSend : function() {
			fullScreenLoader();
			hideError();
		},
		success : function(response) {
			formKRONOSContent(response);
			if(dataFound)
			printReport(response);
			$.loader('close');
		},
		error : function() {
			showError("No Data Found.");
			$.loader('close');
		},
	});

}
function getNightFillLabourDataSC(data) {

	$.ajax({
		type : "get",
		url : "generateReportSC.htm",
		data : data,

		beforeSend : function() {
			fullScreenLoader();
			hideError();
		},
		success : function(response) {
			formKRONOSContent(response);
			if(dataFound)
			printReport(response);
			$.loader('close');
		},
		error : function() {
			showError("No Data Found.");
			$.loader('close');
		},
	});

}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');

	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
	$('.ContentTableWrapperError errorcon').addClass('hideBlock');
}
function hideContent() {

	$('#reportContent,#reportContent,.ContentTable.actionRows').addClass(
			'hideBlock');
	//$('.paginationWrapper').hide();
}
function printReport(response)
{
	dataFound = false;
	var m = $.parseXML(response);
	var d = $(m);/**/
	var array = d.find('array');
	
	var printContent = '';
	var printKRONOSContent='';
	var printHeadKRONOS='<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block"><span class="reportTitleType"></span>Night Fill Labour Plan</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><!--<label class="">Created on: </label><label class="currentDate"></label>--> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Date: </label><label class="fromDatePrint" id=""></label><!--<label class="separator">|</label><label class="cateHide" >To Date: </label><label class="toDatePrint" id="" ></label><label class="separator">|</label><label class="cateHide" >Type: Staff</label><label class="type" id="" ></label></label><label class="separator">|</label><label class="cateHide" >Service Team Action Report - POS Operator Performance: Scanning Rate</label><label class="type" id="" ></label>--></div><div class="width70 margin5 bold ">KRONOS Rosters</div></div><table cellspacing="0" class=" ContentTable KRONOSactionRowPrint  printTable actionRowPrint" id="sortTable">'
		+'<thead>'
		+'<tr>		'									
		+'<th colspan="5" class="centerValue columnDivider" width="67%">Night Fill Team</th>'
		+'<!-- <th rowspan="2" class="centerValue columnDivider blankCell" width="6%">&nbsp;</th> -->'
		+'<!-- <th colspan="2" class="centerValue"  width="27%">Suggested Available Staff</th>-->'
		+'</tr>'
		+'<tr class="subHeader">'											
		+'<th>Employee</th>'
		+'<th class="">Shift Time</th>'
		+'<th class="centerValue">Work Hours</th>'
		+'<th class="numberColumn rightValue">Non Night Fill Hours</th>'
		+'<th class="numberColumn columnDivider rightValue"></th>'
		+'<!-- <th>Employee</th>'												
		+'<th class="centerValue lastColumn">Time</th> -->'
		+'</tr>'
		+'</thead>'
		+'<tbody>';
	
	var printFootKRONOS		='<div style="height: 30px !important" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div>'
	+'<div class="inline-block margin5 hideBlock kronos endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != '' && $(array).find('record').length > 0) {
		var list = $(array).find('record');
		var totalAdjustmentHours = d.find('[name=adjustmentHours]').text();
		var totalWorkingHours = 0;
		var totalWorkingHours = 0.00;
		var prevParentEmpName='blank';
		var parentEmpName='';
		var srtShift='srtShift';
		var endShift='endShift';
		var srtShiftTmp='';
		var endShiftTmp='';
		var prevSrtShiftTmp='';
		var prevEndShiftTmp='';
		
		var shiftStartTime='';
		var shiftEndTime='';
		
		var totalWorkingHr='0:00';
		var workHrPrev='';
		var workHrNext='';
		var hour = '';
		var min = '';
		var nonWorkingHr='0';
		var content='';
		for ( var i = 0; i < list.length; i++) {
		
			parentEmpName=$(list[i]).find(":nth-child(1)").text();
			//alert(prevParentEmpName+'===='+parentEmpName)
			if(prevParentEmpName.toLowerCase()==parentEmpName.toLowerCase()){
			//	alert("child");
				workHrPrev=totalWorkingHr;
				workHrNext=$(list[i]).find(":nth-child(8)").text();
				
				hour = parseInt( workHrPrev.split(':')[0]);
				min = parseInt( workHrPrev.split(':')[1]);
				hour =hour+ parseInt( workHrNext.split(':')[0]);
				min = min+parseInt( workHrNext.split(':')[1]);
				
				if(min>60){
					hrinIn=parseInt(min/60)
					hour=hour+hrinIn;
					min=min-60;
				}
				totalWorkingHr=hour+':'+min
				nonWorkingHr=parseInt($(list[i]).find(":nth-child(7)").text());
				
				var tmpHr1=parseInt($(list[i]).find(":nth-child(3)").text());
				if(tmpHr1>12){
					tmpHr1=tmpHr1-12+" PM"
				}else{
					tmpHr1=tmpHr1+" AM"
				}
				var tmpHr2=parseInt($(list[i]).find(":nth-child(6)").text());
				if(tmpHr2>12){
					tmpHr2=tmpHr2-12+" PM"
				}else{
					tmpHr2=tmpHr2+" AM"
				}
				
				
				childContent='<tr>'
							+'<td></td>'
							+'<td>'
							+$(list[i]).find(":nth-child(9)").text()
							+'</td>'
							+'<td>'
							+tmpHr1
							+' - '
							+tmpHr2
							+'</td>'
							+'<td>'
							+$(list[i]).find(":nth-child(8)").text()
							+'</td>'
							+'<td>'
							+$(list[i]).find(":nth-child(7)").text()
							+'</td>'
							
							+'</tr>'
							//shiftEndTime=$(list[i]).find(":nth-child(4)").text()+ ' ' +$(list[i]).find(":nth-child(6)").text();
							shiftEndTime=tmpHr2;
				nonWorkingHr=prevNonWorkingHr+parseInt($(list[i]).find(":nth-child(7)").text());
			}else{
				
			//	alert("parent");
				shiftStartTime=$(list[i]).find(":nth-child(2)").text()+'####' +$(list[i]).find(":nth-child(3)").text()+'*****';
				//totalWorkingHr=$(list[i]).find(":nth-child(8)").text();
				if(prevParentEmpName.toLowerCase()=='blank'){
					parentContent='';
					childContent='';
					//parentContent='<tr>'
					//	alert("blank");
						
				}else{
					//alert("not blank");
					//parentContent='</tr></table><tr>'
					childContent=childContent+'</td></tr></table>'
					var shifhtStartEndTime=shiftEndTime;
				//	alert(shiftEndTime);
					parentContent=parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
					parentContent=parentContent.replace('totalWrkHrs',totalWorkingHr);
					parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
					content=content+parentContent;
					content=content+childContent;
					//alert('1---'+content);
					parentContent='';
					childContent='';
				}
				parentEmpName=$(list[i]).find(":nth-child(1)").text();
				
				
				nonWorkingHr=parseInt($(list[i]).find(":nth-child(7)").text());
				
				workHrPrev='0:00';
				workHrNext=$(list[i]).find(":nth-child(8)").text();
				
				hour = parseInt( workHrPrev.split(':')[0]);
				min = parseInt( workHrPrev.split(':')[1]);
				hour =hour+ parseInt( workHrNext.split(':')[0]);
				min = min+parseInt( workHrNext.split(':')[1]);
				if(min>60){
					hrinIn=parseInt(min/60)
					hour=hour+hrinIn;
					min=min-60;
				}
				totalWorkingHr=hour+':'+min
				totalWorkingHours=totalWorkingHours+parseInt(hour);
				prevEndShiftTmp=$(list[i]).find(":nth-child(4)").text()+ ' '+$(list[i]).find(":nth-child(6)").text();
				
				
				

				var tmpHr1=parseInt($(list[i]).find(":nth-child(3)").text());
				if(tmpHr1>12){
					tmpHr1=tmpHr1-12+" PM"
				}else{
					tmpHr1=tmpHr1+" AM"
				}
				var tmpHr2=parseInt($(list[i]).find(":nth-child(6)").text());
				if(tmpHr2>12){
					tmpHr2=tmpHr2-12+" PM"
				}else{
					tmpHr2=tmpHr2+" AM"
				}
				
				parentContent=parentContent	+'<tr class="parentrow collapsed" id="'+i+'" onclick=showHide(this.id)><td width="20%">'
					+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
					+'</td>'
					+'<td width="30%">'
					//+$(list[i]).find(":nth-child(2)").text()+' '+$(list[i]).find(":nth-child(3)").text()+' '+'tmpEndDtTm'
					+tmpHr2+' - '+'tmpEndDtTm'
					+'</td>'
					+'<td width="30%">'
					+'totalWrkHrs'
					+'</td>'
					+'<td width="10%">'
					+'nonWrkHrs'
					+'</td>'
					+'<td width="10%"></td>'
					+'</tr>'
					+'<tr class="childrow expanded" id="childrow_'+i+'"><td colspan="5" width="100%"><table width="100%"><tr>'//child content also in parent
					
					    +'<td width="20%"></td>'
					    +'<th width="30%">Job Name</th>'
						+'<th width="30%">Shift Time</th>'
						+'<th width="10%">Work Hours</th>'
						+'<th width="10%">Non Night Fill Hours</th>'
						+'<tr>'
						
						+'<tr>'
						+'<td></td>'
						+'<td>'
						+$(list[i]).find(":nth-child(9)").text()
						+'</td>'
						+'<td>'
						+tmpHr1
						+' - '
						+tmpHr2
						+'</td>'
						+'<td>'
						+$(list[i]).find(":nth-child(8)").text()
						+'</td>'
						+'<td>'
						+$(list[i]).find(":nth-child(7)").text()
						+'</td>'
					
						+'</tr>'
						prevParentEmpName=parentEmpName;
				prevNonWorkingHr=nonWorkingHr;
			}
			
			prevParentEmpName=parentEmpName;
		}
		var shifhtStartEndTime=shiftEndTime;
		parentContent=parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
		parentContent=parentContent.replace('totalWrkHrs',totalWorkingHr);
		parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
		 
		childContent=childContent+'</td></tr></table>'
		content=content+parentContent;
		content=content+childContent;
		//alert('2---'+content);
		
		
		
		printKRONOSContent=content;
		
		if (printKRONOSContent != '') {
			var grandTotal = totalWorkingHours - totalAdjustmentHours;
			printKRONOSContent += '<tr><td colspan="4" class=""><strong>Total</strong></td><td class="numberColumn rightValue columnDivider">'
				+'<strong>'+Number(totalWorkingHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr><tr>'											
				+'<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'			
				+'<td class="numberColumn rightValue columnDivider"><strong>-'+Number(totalAdjustmentHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'
			+'<tr class="lastRow">'											
				+'<td colspan="4" class="valueInfo"><strong>Grand Total</strong></td>'			
				+'<td class="numberColumn valueInfo rightValue columnDivider"><strong>'+Number(grandTotal).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'; 
		}
		
		printContent=printHeadKRONOS+printKRONOSContent+"</tbody></table>"+printFootKRONOS;
		
		$('#printbody').html('').append(printContent).append('<link rel="stylesheet" href="../../styles/printstyle.css" />');

	}

	
}

function printReport1(response)
{
	dataFound = false;
	var m = $.parseXML(response);
	var d = $(m);/**/
	var array = d.find('array');
	
	var printContent = '';
	var printKRONOSContent='';
	var printHeadKRONOS='<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block"><span class="reportTitleType"></span>Night Fill Labour Plan</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><!--<label class="">Created on: </label><label class="currentDate"></label>--> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Date: </label><label class="fromDatePrint" id=""></label><!--<label class="separator">|</label><label class="cateHide" >To Date: </label><label class="toDatePrint" id="" ></label><label class="separator">|</label><label class="cateHide" >Type: Staff</label><label class="type" id="" ></label></label><label class="separator">|</label><label class="cateHide" >Service Team Action Report - POS Operator Performance: Scanning Rate</label><label class="type" id="" ></label>--></div><div class="width70 margin5 bold ">KRONOS Rosters</div></div><table cellspacing="0" class=" ContentTable KRONOSactionRowPrint  printTable actionRowPrint" id="sortTable">'
		+'<thead>'
		+'<tr>		'									
		+'<th colspan="5" class="centerValue columnDivider" width="67%">Night Fill Team</th>'
		+'<!-- <th rowspan="2" class="centerValue columnDivider blankCell" width="6%">&nbsp;</th> -->'
		+'<!-- <th colspan="2" class="centerValue"  width="27%">Suggested Available Staff</th>-->'
		+'</tr>'
		+'<tr class="subHeader">'											
		+'<th>Employee</th>'
		+'<th class="">Employee Status</th>'
		+'<th class="centerValue">Shift Time</th>'
		+'<th class="numberColumn rightValue">Break Hours</th>'
		+'<th class="numberColumn columnDivider rightValue">Work Hours</th>'
		+'<!-- <th>Employee</th>'												
		+'<th class="centerValue lastColumn">Time</th> -->'
		+'</tr>'
		+'</thead>'
		+'<tbody>';
	
	var printFootKRONOS		='<div style="height: 30px !important" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div>'
	+'<div class="inline-block margin5 hideBlock kronos endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != '' && $(array).find('record').length > 0) {
		var list = $(array).find('record');
		var totalAdjustmentHours = d.find('[name=adjustmentHours]').text();
		var totalWorkingHours = 0;
		for ( var i = 0; i < list.length; i++) {
			
			printKRONOSContent += '<tr><td>'
					+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
					+ '</td>'
					+ '<td class="">'
					+ $(list[i]).find(":nth-child(2)").text()//EMPLOYEE_STATUS
					+ '</td><td class="centerValue">'
					+ $(list[i]).find(":nth-child(3)").text() +' - '+ $(list[i]).find(":nth-child(4)").text()//SHIFT_START_TIME - SHIFT_END_TIME
					+ '</td>'
					+ '<td class="numberColumn rightValue">'
					+ $(list[i]).find(":nth-child(5)").text()//BREAK_HOURS
					+ '</td><td class="numberColumn columnDivider rightValue">'
					+ $(list[i]).find(":nth-child(6)").text()//WORK_HOURS
					+ '</td>'
					+ '</tr>';
			totalWorkingHours += Number($(list[i]).find(":nth-child(6)").text());
		}
		
		if (printKRONOSContent != '') {
			var grandTotal = totalWorkingHours - totalAdjustmentHours;
			printKRONOSContent += '<tr><td colspan="4" class=""><strong>Total</strong></td><td class="numberColumn rightValue columnDivider">'
				+'<strong>'+Number(totalWorkingHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr><tr>'											
				+'<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'			
				+'<td class="numberColumn rightValue columnDivider"><strong>-'+Number(totalAdjustmentHours).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'
			+'<tr class="lastRow">'											
				+'<td colspan="4" class="valueInfo"><strong>Grand Total</strong></td>'			
				+'<td class="numberColumn valueInfo rightValue columnDivider"><strong>'+Number(grandTotal).toFixed(2)+'</strong></td>'												
				//+'<td colspan="2" class="lastColumn blankCell">&nbsp;</td>'											
			+'</tr>'; 
		}
		
		printContent=printHeadKRONOS+printKRONOSContent+"</tbody></table>"+printFootKRONOS;
		
		$('#printbody').html('').append(printContent).append('<link rel="stylesheet" href="../../styles/printstyle.css" />');

	}

	
}
function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}
function showHide(id)
{
	
	//$(id).find(id);
	console.log(id);
	var chileId='#childrow_'+id;
	$(chileId).toggleClass('hideBlock');
	console.log(chileId);
	//console.log($(id).find(this.id));
	}


function p (i)
{
	return Math.floor(i / 10) + "" + i % 10;
}



function trunc (i)
{
	var j = Math.round(i * 100);
	return Math.floor(j / 100) + (j % 100 > 0 ? "." + p(j % 100) : "");
}

function calculate (d1,d2)
{
	
//alert(d1+'calculate ()'+d2);
	var date1 = new Date('13/02/2015 20:00');
	var date2 = new Date('14/02/2015 03:00');
	console.log(date1);
	console.log(date2);
	//alert(date1);
	//alert(date2);
	//alert(date1.getTime());
	//alert(date2.getTime());
	
	var sec = date2.getTime() - date1.getTime();
	//alert(sec);
	if (isNaN(sec))
	{
		//alert("Input data is incorrect!");
		return;
	}
	if (sec < 0)
	{
		//alert("The second date ocurred earlier than the first one!");
		return;
	}

	var second = 1000, minute = 60 * second, hour = 60 * minute, day = 24 * hour;

	//form.result_h.value = trunc(sec / hour);
	//form.result_m.value = trunc(sec / minute);
	//form.result_s.value = trunc(sec / second);

	var days = Math.floor(sec / day);
	sec -= days * day;
	var hours = Math.floor(sec / hour);
	sec -= hours * hour;
	var minutes = Math.floor(sec / minute);
	sec -= minutes * minute;
	var seconds = Math.floor(sec / second);
	var finelValue = days + " day" + (days != 1 ? "s" : "") + ", " + hours + " hour" + (hours != 1 ? "s" : "") + ", " + minutes + " minute" + (minutes != 1 ? "s" : "") + ", " + seconds + " second" + (seconds != 1 ? "s" : "");
	return hours+":"+minutes;
}