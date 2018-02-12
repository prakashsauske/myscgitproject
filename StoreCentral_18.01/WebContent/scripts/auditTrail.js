localStorage.clear();
var dataForPagination = "";
var currentPage=1;
var recordCount;
var omCommonVal=1;
$(document)
		.ready(
				function() {
					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							$('#generateReport').click();
						}
					});
					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-modal").parent().addClass("popupWrapper");

					$("#dialog-modal2").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-modal2").parent().addClass("popupWrapper");
					$('#article').focus();
					$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
					$("#generateReport")
							.click(
									function() {
										localStorage.clear();
										hideContent();

										var fromDate = formateDate($("#from")
												.val());
										var toDate = formateDate($("#to").val());
										var date1 = new Date();
										var parts = fromDate.split('/');
										var partsLen = parts.length;
										var date1Len = fromDate.length;
										date1.setFullYear(parts[2],
												parts[1] - 1, parts[0]);

										var date2 = new Date();
										var part = toDate.split('/');
										var partLen = part.length;
										var date2Len = toDate.length;
										date2.setFullYear(part[2], part[1] - 1,
												part[0]);
										if ($('#article').val().trim() == "") {
											showError('Please enter article number.');
											$('#article').focus();
										} else if ($('#number').is(':checked')
												&& isNaN($('#article').val())) {
											showError('Please enter valid article number.');
											$('#article').focus();
										}

										else if (fromDate != ""
												&& (partsLen != 3
														|| date1Len != 10
														|| fromDate.split('/')[0] > 31
														|| fromDate.split('/')[1] > 12 || fromDate
														.split('/')[2].length != 4)) {
											showError('Invalid From Date.');
											callFrom();
										} else if (toDate != ""
												&& (partLen != 3
														|| date2Len != 10
														|| toDate.split('/')[0] > 31
														|| toDate.split('/')[1] > 12 || toDate
														.split('/')[2].length != 4)) {
											showError('Invalid To Date.');
											callTo();
										} else if ($('#from').val() != ""
												&& $('#to').val() == "") {
											showError('To Date should not be empty.');
											callTo();
										} else if ($('#from').val() == ""
												&& $('#to').val() != "") {
											showError('From Date should not be empty.');
											callFrom();
										} else if (date1.getTime() > date2
												.getTime()) {
											showError('To Date should not be lesser than the From Date');
											callTo();
										} else {
											var data = $('#auditTrail')
													.serialize();
											getPromoAuditDetail(data);
										}
									});

					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});

					// Code for accordion
					$("#accordion").accordion({
						header : "h3",
						collapsible : true,
						heightStyle : "content"
					});

					// Code for tooltip
					$('.rowMoreInfo').tooltip();

					// Code for profile menu
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					$('#closeLink').click(function() {
						closeAccordian();
					});
					$('#number,#description,#reference').click(function() {

						setTimeout(function() {
							$('#article').focus();
						}, 500);
					});
				});
function closeAccordian() {
	$('#accordion').accordion({
		active : true
	});
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function hideError() {
	$("#errorMsgDiv").addClass('hideBlock');
}


function getPromoAuditDetail(data) {
		//omCommonVal=1;
	$
			.ajax({
				type : "get",
				url : "getPromoAuditDetail.htm",
				data : data,
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					
successPromoAudit(response);
					},
				error : function() {
					// goToLogin();
				},
			});

}
function showWarning(text) {
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$('#reportContent').removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.resultContent').addClass("hideBlock");
	// $('.ContentTable').remove();
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass('hideBlock');
	$('.paginationDiv').addClass('hideBlock');
}
function showError(text) {
	$('#errorMsg').text(text);
	$('.resultContent').addClass("hideBlock");
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('#reportContent').removeClass('hideBlock');
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass("hideBlock");
	$('.paginationDiv').addClass('hideBlock');
}
function paginatedResult() {
	// $(".paginationWrapper").removeClass('hideBlock');
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getPromoDetailForPagination({pageNo:pageNumber},pageNumber);
					
			}

		});
	
	$(".tableFooter,.totalRecord").removeClass('hideBlock');
	$('.paginationDiv').removeClass('hideBlock');
}
function selectItem(id, article, uom) {
	$('#dialog-modal2').dialog('close');
	var data = $('#auditTrail').serialize();
	data = data + '&index=' + id ;
	$
			.ajax({
				type : "get",
				url : "getPromoAuditDetail.htm",
				data : data,
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
successSelectItem(response,data);
					
					
				},
				error : function() {
					// goToLogin();
				},
			});

}
function getPromoDetailForPagination(data,pageNumber){
	if(localStorage.getItem(pageNumber))
		successPagination(localStorage.getItem(pageNumber),data,pageNumber);
	else
	{
	currentPage=pageNumber;
	$
	.ajax({
		type : "get",
		url : "getPromoAuditDetail.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			
			var string='{"data":['; 
			var length=response.replace('{"data":[{','').replace('}]}','').split('},{').length;
			var records=response.replace('{"data":[{','').replace('}]}','').split('},{');
			countPage=pageNumber;
			for(var i=1;i<=length;i++){
			if( i%20!=0 && i!=length) 
			string=string+"{"+records[i-1]+"},";
			else{
			string=string+"{"+records[i-1]+"}]}";
			console.log(countPage +'-----'+string);
			localStorage.setItem(countPage,string);
			string='{"data":[';
			countPage++;
			}
			}
				successPagination(localStorage.getItem(pageNumber),data,pageNumber);
			
	},
		error : function() {
			// goToLogin();
		},
	});
}
}
function successSelectItem(response,data){
	var output = $.parseJSON(response);
	var content = "";
	var auditList="";
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null
			&& output.data[0].msg.trim() == '') {
		auditList= output;
		if (output.data[0].recordCount != null
				&& output.data[0].recordCount != ""
				&& parseInt(output.data[0].recordCount) > 20) {
			
			//Split Json
			var string='{"data":['; 
			var length=response.replace('{"data":[{','').replace('}]}','').split('},{').length;
			var records=response.replace('{"data":[{','').replace('}]}','').split('},{');
			countPage=1;
			for(var i=1;i<=length;i++){
				if( i%20!=0 && i!=length) 
				string=string+"{"+records[i-1]+"},";
				else{
				string=string+"{"+records[i-1]+"}]}";
			console.log(countPage +'-----'+string);
			localStorage.setItem(countPage,string);
			string='{"data":[';
			countPage++;
			}
			}
			//dataForPagination = data;
			$('#totalRecord').text(output.data[0].recordCount);
			currentPage = 1;
			recordCount = output.data[0].recordCount;
			paginatedResult();

		}
		if(localStorage.getItem(1)){
			auditList=$.parseJSON(localStorage.getItem(1));
		}
		$('.appended').remove();
		$.each(auditList.data, function(i, item) {
			if(i==0)
			om=(item.om!=null && item.om!=undefined && item.om.trim()!='')? item.om: "1";
			
			if(i==0){
				omCommonVal = (item.om!=null && item.om!=undefined && item.om.trim()!='')? item.om: "1";
			}
			item.om=om;
			omCommonVal=om;
			

			//CR modifications for rounding off build and display qty
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined) ? (Number(item.oldDemandQty)/Number(item.om)).toFixed(0): "";
			item.newDemandQty=(item.newDemandQty!=null && item.newDemandQty!=undefined) ? (Number(item.newDemandQty)/Number(item.om)).toFixed(0): "";
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined) ? oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om)): "";
			item.newDisplayQty=(item.newDisplayQty!=null && item.newDisplayQty!=undefined) ? newDispquantityRoundOff(Number(item.newDisplayQty),Number(item.om)): "";
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined) ? oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om)): "";
			item.newBuildQty=(item.newBuildQty!=null && item.newBuildQty!=undefined) ? newBuildquantityRoundOff(Number(item.newBuildQty),Number(item.om)): "";
			item.updatedUser=item.updatedUser!=null? item.updatedUser: "";
			item.updatedUserName=item.updatedUserName!=null? item.updatedUserName: "";
			item.updatedDate=item.updatedDate!=null? item.updatedDate: "";
			item.updatedTime=item.updatedTime!=null? item.updatedTime: "";
			content += '<tr class="appended dateRecords">'
					+ '<td class="columnDivider">'
					+ item.promStartDate
					+ '</td>'
					+ '<td>'
					+ item.oldDemandQty
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.newDemandQty
					+ '</td>'
					+ '<td>'
					+ item.oldDisplayQty
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.newDisplayQty
					+ '</td>'
					+ '<td>'
					+ item.oldBuildQty
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.newBuildQty
					+ '</td>'
					+ '<td>'
					+ item.updatedUser
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.updatedUserName
					+ '</td>'
					+ '<td>'
					+ item.updatedDate
					+ ' '
					+ item.updatedTime
					+ '</td>' + '</tr>';
		});
		$('#totalRecord').text(output.data[0].recordCount);
		
		$(content).insertAfter('.auditContent');
		$('.searchString').text(
				output.data[0].articleNo + '-'
						+ output.data[0].articleDesc);
		showContent();
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}
	resetAuditTrailDateTimeToLocalTimeZone();
	stopLoading();
}
function successPagination(response,data,pageNumber){
	console.log("Response"+pageNumber+"====="+response);
	var output = $.parseJSON(response);
	var content = "";
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null
			&& output.data[0].msg.trim() == '') {
		var auditList = output.data;
		$('.appended').remove();
		$.each(auditList, function(i, item) {
			if(i==0)
				om=(item.om!=null && item.om!=undefined && item.om.trim()!='')? item.om: "1";
			//item.om=om;
			
			item.om=omCommonVal;
			
		  //CR modifications for rounding off build and display qty
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined && item.oldDemandQty!='' ) ? (Number(item.oldDemandQty)/Number(item.om)).toFixed(0): "";
			item.newDemandQty=(item.newDemandQty!=null && item.newDemandQty!=undefined && item.newDemandQty!='') ? (Number(item.newDemandQty)/Number(item.om)).toFixed(0): "";
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined && item.oldDisplayQty!='') ? oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om)): "";
			item.newDisplayQty=(item.newDisplayQty!=null && item.newDisplayQty!=undefined && item.newDisplayQty!='') ? newDispquantityRoundOff(Number(item.newDisplayQty),Number(item.om)): "";
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined && item.oldBuildQty!='') ? oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om)): "";
			item.newBuildQty=(item.newBuildQty!=null && item.newBuildQty!=undefined && item.newBuildQty!='') ? newBuildquantityRoundOff(Number(item.newBuildQty),Number(item.om)): "";
			
			item.updatedUser=item.updatedUser!=null? item.updatedUser: "";
			item.updatedUserName=item.updatedUserName!=null? item.updatedUserName: "";
			item.updatedDate=item.updatedDate!=null? item.updatedDate: "";
			item.updatedTime=item.updatedTime!=null? item.updatedTime: "";
			
			content += '<tr class="appended dateRecords"><td class="columnDivider">'
					+ item.promStartDate
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldDemandQty)?'':item.oldDemandQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newDemandQty)?'':item.newDemandQty)
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldDisplayQty)?'':item.oldDisplayQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newDisplayQty)?'':item.newDisplayQty)
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldBuildQty)?'':item.oldBuildQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newBuildQty)?'':item.newBuildQty)
					+ '</td>'
					+ '<td>'
					+ item.updatedUser
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.updatedUserName
					+ '</td>'
					+ '<td>'
					+ item.updatedDate
					+ ' '
					+ item.updatedTime
					+ '</td></tr>';
		});
		$(content).insertAfter('.auditContent');
		$('.appended').text();
		/*$('#totalRecord').text(output.data[0].length);
		$('.searchString').text(
				output.data[0].articleNo + '-'
						+ output.data[0].articleDesc);*/
		showContent();
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}
	resetAuditTrailDateTimeToLocalTimeZone();
	stopLoading();

}
function successPromoAudit(response){
	var output = $.parseJSON(response);
	var auditList = '';
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null
			&& output.data[0].msg == 'multipleResult') {
		var descList = output.data;
		var content = "";
		$('.appended').remove();
		$
				.each(
						descList,
						function(i, item) {

							content += '<tr class="article-list appended" id="'
									+ i
									+ '">'
									+ '<td id="artNo'
									+ i
									+ '" class="art-no">'
									+ (item.articleNo != null && item.articleNo != undefined ? item.articleNo : (item.article || "")) 
									+ '</td>'
									+ '<td id="artName'
									+ i
									+ '">'
									+ item.description
									+ '</td>'
									+ '<td id="uom'
									+ i
									+ '">'
									+ (item.uom != null && item.uom != undefined ? item.uom : (item.base_uom || ""))
									+ '</td>'
									+ '<td class="sorted lastColumn"><label class="linkBtn linkBtn2">'
									+ '<label class="selectItem" onclick="selectItem('
									+ i
									+ ','
									+ (item.articleNo != null && item.articleNo != undefined ? item.articleNo : (item.article || "")) 
									+ ',\''
									+ (item.uom != null && item.uom != undefined ? item.uom : (item.base_uom || ""))
									+ '\')">Select</label></label></td>'
									+ '</tr>';
							console.log(item.articleNo);

						});
		$(content).insertAfter('.descContent');
		$('.searchString').text($('#article').val());
		$('#dialog-modal2').dialog('open');
	} else if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null
			&& output.data[0].msg.trim() == '') {
		auditList=output;
		if (output.data[0].recordCount != null
				&& output.data[0].recordCount != ""
				&& parseInt(output.data[0].recordCount) > 20) {
			
			//Split Json
			var string='{"data":['; 
			var length=response.replace('{"data":[{','').replace('}]}','').split('},{').length;
			var records=response.replace('{"data":[{','').replace('}]}','').split('},{');
			countPage=1;
			for(var i=1;i<=length;i++){
				if( i%20!=0 && i!=length) 
				string=string+"{"+records[i-1]+"},";
				else{
				string=string+"{"+records[i-1]+"}]}";
			console.log(countPage +'-----'+string);
			localStorage.setItem(countPage,string);
			string='{"data":[';
			countPage++;
			}
			}
			//dataForPagination = data;
			$('#totalRecord').text(output.data[0].recordCount);
			recordCount = output.data[0].recordCount;
			$('.appended').text();
			paginatedResult();
		}
		if(localStorage.getItem(1)){
			auditList=$.parseJSON(localStorage.getItem(1));
		}
		$('.appended').remove();
		content='';
		$.each(auditList.data, function(i, item) {
			if(i==0)
				om=(item.om!=null && item.om!=undefined && item.om.trim()!='')? item.om: "1";
				item.om=om;
			//item.om=omCommonVal;
			omCommonVal=om;
			//CR modifications for rounding off build and display qty
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined && item.oldDemandQty!='' ) ? (Number(item.oldDemandQty)/Number(item.om)).toFixed(0): "";
			item.newDemandQty=(item.newDemandQty!=null && item.newDemandQty!=undefined && item.newDemandQty!='') ? (Number(item.newDemandQty)/Number(item.om)).toFixed(0): "";
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined && item.oldDisplayQty!='') ? oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om)): "";
			item.newDisplayQty=(item.newDisplayQty!=null && item.newDisplayQty!=undefined && item.newDisplayQty!='') ? newDispquantityRoundOff(Number(item.newDisplayQty),Number(item.om)): "";
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined && item.oldBuildQty!='') ? oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om)): "";
			item.newBuildQty=(item.newBuildQty!=null && item.newBuildQty!=undefined && item.newBuildQty!='') ? newBuildquantityRoundOff(Number(item.newBuildQty),Number(item.om)): "";
			
			item.updatedUser=item.updatedUser!=null? item.updatedUser: "";
			item.updatedUserName=item.updatedUserName!=null? item.updatedUserName: "";
			item.updatedDate=item.updatedDate!=null? item.updatedDate: "";
			item.updatedTime=item.updatedTime!=null? item.updatedTime: "";
			
			content += '<tr class="appended dateRecords"><td class="columnDivider">'
					+ item.promStartDate
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldDemandQty)?'':item.oldDemandQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newDemandQty)?'':item.newDemandQty)
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldDisplayQty)?'':item.oldDisplayQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newDisplayQty)?'':item.newDisplayQty)
					+ '</td>'
					+ '<td>'
					+ (isNaN(item.oldBuildQty)?'':item.oldBuildQty)
					+ '</td>'
					+ '<td class="columnDivider">'
					+ (isNaN(item.newBuildQty)?'':item.newBuildQty)
					+ '</td>'
					+ '<td>'
					+ item.updatedUser
					+ '</td>'
					+ '<td class="columnDivider">'
					+ item.updatedUserName
					+ '</td>'
					+ '<td>'
					+ item.updatedDate
					+ ' '
					+ item.updatedTime
					+ '</td></tr>';
			
		});
		$('#totalRecord').text(output.data[0].recordCount);
		$(content).insertAfter('.auditContent');
		$('.searchString').text(
				output.data[0].articleNo + '-'
						+ output.data[0].articleDesc);
		showContent();
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}
	resetAuditTrailDateTimeToLocalTimeZone();
	stopLoading();

}
function showContent() {
	$("#errorMsgDiv").addClass('hideBlock');
	$('.resultContent ').removeClass('hideBlock');
	$('.tableTitle.totalRecord').removeClass('hideBlock');
	$('.appended').text();
	closeAccordian();
}
function hideContent() {
	$("#errorMsgDiv").addClass('hideBlock');
	$('.resultContent ').addClass('hideBlock');
	$('.tableTitle.totalRecord').addClass('hideBlock');
	$('.paginationDiv').addClass('hideBlock');

}
function callFrom() {

	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function callTo() {

	setTimeout(function() {
		$('#to').focus();
	}, 200);
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
function resetAuditTrailDateTimeToLocalTimeZone() {

	var localTimeZone = "";
	var latti = $('#latitude').val();
	var longi = $('#longitude').val();
	
	
	if(latti.indexOf("-")!=-1){
		if(latti.indexOf("-")!=0){

			latti="-"+latti.replace("-","");

		}
	}
	
	if(longi.indexOf("-")!=-1){
		if(longi.indexOf("-")!=0){

			longi="-"+longi.replace("-","");

		}
	}
	
	if(latti.trim()!=undefined && latti.trim()!="" && longi.trim()!=undefined && longi.trim()!=""){
			$.ajax({
				type : "GET",
				url : "https://maps.googleapis.com/maps/api/timezone/json",
				beforeSend : function() {
				},
				data : {
					location : latti + "," + longi,
					timestamp : Math.round((new Date().getTime()) / 1000),
					sensor : "false"
				},
				success : function(response) {
					var newjson = JSON.stringify(response);
					var parsedJson = $.parseJSON(newjson);
					localTimeZone = parsedJson.timeZoneId;
		
					$('tr.dateRecords').each(
							function() {
								var date = $(this).find('td').eq(9).text().substring(0, 10);
								var res = date.split("/")[2] + "-" + date.split("/")[1]+ "-" + date.split("/")[0];
								// res+"T"+$(this).find('td').eq(4).text()+":00" );
		
								var m = moment.tz(res + "T" + $(this).find('td').eq(9).text().trim().split('\ ')[1] + ":00", "Australia/Sydney");
		
								var localdate = m.tz(localTimeZone).format();
		
								var newTime = localdate.substring(11, 16);
								var newDate = localdate.substring(0, 10).split("-")[2] + "/" + localdate.substring(0, 10).split("-")[1] + "/" + localdate.substring(0, 10).split("-")[0];
		
								$(this).find('td').eq(9).text(newDate+" "+newTime);
							});
				},
			});
	}
}

//following methods are used for rouding off the build and display qty values---CR modifications
function oldDispquantityRoundOff(oldDisplayQty,om)
{
	if (Number(oldDisplayQty) < Number(om) )
		return Math.ceil((Number(oldDisplayQty)/Number(om))).toFixed(0);
	if (Number(oldDisplayQty) >= Number(om) )
		return (Number(oldDisplayQty)/Number(om)).toFixed(0);
}

function newDispquantityRoundOff(newDisplayQty,om)
{
	if (Number(newDisplayQty) < Number(om) )
		return Math.ceil((Number(newDisplayQty)/Number(om))).toFixed(0);
	if (Number(newDisplayQty) >= Number(om) )
		return (Number(newDisplayQty)/Number(om)).toFixed(0);
}
function oldBuildquantityRoundOff(oldBuildQty,om)
{
	if (Number(oldBuildQty) < Number(om) )
		return Math.ceil((Number(oldBuildQty)/Number(om))).toFixed(0);
	if (Number(oldBuildQty) >= Number(om) )
		return (Number(oldBuildQty)/Number(om)).toFixed(0);
}
function newBuildquantityRoundOff(newBuildQty,om)
{
	if (Number(newBuildQty) < Number(om) )
		return Math.ceil((Number(newBuildQty)/Number(om))).toFixed(0);
	if (Number(newBuildQty) >= Number(om) )
		return (Number(newBuildQty)/Number(om)).toFixed(0);
	
}
