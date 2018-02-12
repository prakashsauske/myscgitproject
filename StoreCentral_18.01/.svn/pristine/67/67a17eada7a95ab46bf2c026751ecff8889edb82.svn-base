$(function() {
	$('.backButton').click(function() {
		window.location.href = "../login/goingHome.htm";
	});
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if($("#dialog-supplier-verify").dialog("isOpen")){
				$('#goButtonSample1').click();
			}else{
				$('#generateReport').click();	
			}
			
		}
	});
	var recordCount;
	var currentPage;
	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modal").parent().addClass("popupWrapper");
	$("#dialog-supplier-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-supplier-verify").parent().addClass("popupWrapper");

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	/**
	 * ********************************ONPAGELOAD DATE IS SET TO TODAYS
	 * DATE*******************************
	 */

	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	$('#to,#from').val(presentDate);

	/** **************************************************************************************************** */

	$('#generateReport')
			.click(
					function() {
						hideContent();
						var fromDate = formateDate($('#from').val());
						console.log(fromDate);
						var date1 = new Date();
						var parts = fromDate.split('/');
						var partsLen = parts.length;
						var date1Len = fromDate.length;
						date1.setFullYear(parts[2], parts[1] - 1, parts[0]);

						var toDate = formateDate($('#to').val());
						var date2 = new Date();
						var part = toDate.split('/');
						var partLen = part.length;
						var date2Len = toDate.length;
						date2.setFullYear(part[2], part[1] - 1, part[0]);
						
						//var oneMonBefore = formateDate($('#to').val());
						var oneMonBefore = new Date();
						oneMonBefore.setTime(today.getTime()-(24*60*60*1000*30));
					
						
						 if (fromDate == "") {
							// $('#alertBox').text('Please enter From Date');
							showError('Please enter From Date.');
							callFrom();
							// $('#okBtn').attr('onclick','callFrom()');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if (toDate == "") {
							// $('#alertBox').text('Please enter To Date');
							showError('Please enter To Date.');
							callTo();
							// $('#okBtn').attr('onclick','callTo()');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if (partsLen != 3 || date1Len != 10
								|| fromDate.split('/')[0] > 31
								|| fromDate.split('/')[1] > 12
								|| fromDate.split('/')[2].length != 4) {
							showError('Invalid From Date.');
							callFrom();
							// $('#alertBox').text('Invalid From Date');
							// $('#okBtn').attr('onclick','callFrom()');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if (partLen != 3 || date2Len != 10
								|| toDate.split('/')[0] > 31
								|| toDate.split('/')[1] > 12
								|| toDate.split('/')[2].length != 4) {
							showError('Invalid To Date.');
							callTo();
							// $('#alertBox').text('Invalid To Date');
							// $('#okBtn').attr('onclick','callTo()');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if (date1 < oneMonBefore) {
							showError('Rosters cannot be searched beyond past one month');
							callFrom();
							// $('#okBtn').attr('onclick','callFrom();');
							// $('#alertBox').text('From Date should not be
							// lesser than Today Date');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if (date1.getTime() > date2.getTime()) {
							showError('To Date should not be lesser than the From Date');
							callTo();
							// $('#okBtn').attr('onclick','callFrom();');
							// $('#alertBox').text('From Date should not be
							// greater than the To Date');
							// $( "#dialog-modal" ).dialog( "open" );
						} else if ((date1.getTime() + (86400000 * 7 * 12)) < date2
								.getTime()) {
							showError('To Date should not be greater than the 12 weeks from From Date.');
							callTo();
							// $('#okBtn').attr('onclick','callTo();');
							// $('#alertBox').text('To Date should not be
							// greater than the 12 weeks from From Date');
							// $( "#dialog-modal" ).dialog( "open" );
						}

						/*
						 * else if (date1.getTime() > date2.getTime()) {
						 * showError('From Date should not be greater than the
						 * To Date.'); callTo();
						 * 
						 * $('#okBtn').attr('onclick','callTo();');
						 * $('#alertBox').text('To Date should not be greater
						 * than the From Date'); $( "#dialog-modal" ).dialog(
						 * "open" );
						 * 
						 *  }
						 */else {
							var formData = $('#orderRosterForm').serialize();
							getOrderRosterReport("getOrderRosterReport.htm",
									formData);
						}

					});

	// Code for tooltip
	$('.rowMoreInfo').tooltip();

	// checks radio buttons in Source of Supply
	$('#warehouse').click(function() {
		hideContent();
		$("#warehouseField").removeClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
		$("#allField").addClass('hideBlock');
		setTimeout(function() {
			$('#supplier').focus();
		}, 500);
	});

	$('#vendor').click(function() {
		hideContent();
		$("#warehouseField").removeClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
		$("#allField").addClass('hideBlock');
		setTimeout(function() {
			$('#supplier').focus();
		}, 500);
	});

	$('#all').click(function() {
		hideContent();
		$("#allField").removeClass('hideBlock');
		$("#warehouseField").addClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
	});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	});

	// Code for profile menu
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// Code for input box default text handling
	$('.textbox').focus(function() {
		if ($(this).val() == $(this).attr('defaultVal')) {
			$(this).val('');
			$(this).removeClass("textboxDefaultText");
		}
	});

	$('.textbox').blur(function() {
		if ($(this).val() == '') {
			$(this).val($(this).attr('defaultVal'));
			$(this).addClass("textboxDefaultText");
		}
	});

	// Code for calndar control
	$(".inputDate").datepicker({
		zIndex : 50
	});

	/*
	 * Code to - Close accordion when report is generated - Show results
	 * 
	 * Need to write a code by developer to handle a case when there is no data.
	 * The accordion in this case should remain open
	 */

	$("#tabs").tabs();
	$("#goButtonSample1").click(function() {
		hideContent();
		$('#supplier').val($('#vendorDesc').val());
		var vendorNo = $('#vendorDesc').val().split("-")[0];
		var vendorName = $('#vendorDesc').val().split("-")[1];
		var sourceSupply = $('input:radio[name=sourceSupply]:checked').val();
if($('#vendorDesc').val().trim()==''){
	$('#dialog-supplier-verify .countTitle').addClass('hideBlock');
	$('#popupDataDiv .ContentTableWrapper').html('');
	$('#dialog-supplier-verify .tableTitle .popupError').text('Please enter Supplier No/Name.').removeClass('popupWarning').removeClass('popupError').addClass('popupError');
}else{
		$.ajax({
			type : "GET",
			url : "autocomplete.htm",
			beforeSend : function() {
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
			},
			data : {
				vendorNo : vendorNo,
				sourceSupply : sourceSupply,
				vendorName : vendorName
			},
			success : function(response) {
				fillPopup(response);
				$('#statusImg').addClass('loading hideBlock');
				$('#statusImg').removeClass('loading');
			},
		});
}

	}

	);
	
	function fillPopup(response){
		
		//$('<h2>').html(response).find('.searchString').text($('#vendorDesc').val());
		//$('<h2>').html(response).find('.titleCount').text($('<h2>').html(response).find('table tr').length-1);
		$('#popupDataDiv').html(response).find('.searchString').text($('#supplier').val());
		$('#dialog-supplier-verify .countTitle').removeClass('hideBlock');
		if($('<h2>').html(response).find('table tr').length-1 ==1){
			$("#supplier").val($("#suppNo0").text() + "-" + $("#suppName0").text());
			$("#dialog-supplier-verify").dialog("close");
		}
		else if($('<h2>').html(response).find('table tr').length-1 !=-1)
			$('.titleCount').text($('<h2>').html(response).find('table tr').length-1);
		
		else{
			$('#dialog-supplier-verify .countTitle').addClass('hideBlock');
			$('#popupDataDiv .ContentTableWrapper').html('');
			$('#dialog-supplier-verify .tableTitle .popupError').text('No records found.').removeClass('popupWarning').removeClass('popupError').addClass('popupError');
		}
		$('#dialog-supplier-verify .tableTitle').removeClass('hideBlock');
		
	}
	$("#verifySupplier").click(
			function() {
				hideContent();
				var radioSelected = $('input:radio[name=sourceSupply]:checked')
						.val();
				if (radioSelected == "vendor" || radioSelected == "warehouse"
						|| radioSelected == "all") {
					var vendorNo = $('#supplier').val().split("-")[0];
					var vendorName = $('#supplier').val().split("-")[1];
					var sourceSupply = $(
							'input:radio[name=sourceSupply]:checked').val();
					if (sourceSupply == 'store') {
						nearbyStore(vendorNo, vendorName, sourceSupply);
					}

					else if (($('#supplier').val() != '')) {
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend : function() {
								hideContent();
								$('#statusImg')
										.removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
							},
							data : {
								vendorNo : vendorNo,
								sourceSupply : sourceSupply,
								vendorName : vendorName
							},
							// data : "vendorNo=" + vendorNo +
							// "&sourceSupply="+sourceSupply +
							// "&vendorName="+vendorName ,
							success : function(response) {
								$('#popupDataDiv').html(response);
								if ($('#sizeCheck').val() == 0) {
									$('#alertBox').text('Invalid supplier');
									$("#dialog-modal").dialog("open");
									$('#okBtn').click(function(e) {
										$("#dialog-modal").dialog("close");
									});
									$('#supplier').focus();
								} else if ($('#sizeCheck').val() > 1) {
									fillPopup(response);
									
									if (!$("#dialog-modal").dialog("isOpen")) {
										$('#vendorDesc').val(
												$('#supplier').val());
										$("#dialog-supplier-verify").parent().addClass(
												"popupWrapper");
										$("#dialog-supplier-verify").dialog("open");
										$("#searchWarning").addClass(
												'hideBlock');
										$("#popupSearch").removeClass(
												'hideBlock');
									}
								} else {
									$("#supplier").val(
											$("#suppNo0").text() + "-"
													+ $("#suppName0").text());
								}
								$('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading');
							},
						});
					} else {
						$('#alertBox').text('Please fill supplier field');
						$("#dialog-modal").dialog("open");
						$('#okBtn').click(function(e) {
							$("#dialog-modal").dialog("close");
						});
						$('#supplier').focus();
					}
				}

			});

	var click = true;
	$('#vendor').click(
			function() {
				hideContent();
				if (click) {
					$('#supplier').val('').attr('placeholder',
							'Enter vendor no. or name');
					click = false;
				}
			});
	$('#warehouse').click(
			function() {
				hideContent();
				if (click == false) {
					$('#supplier').val('').attr('placeholder',
							'Enter warehouse no. or name');
					click = true;
				}
			});
	$('#closeLink').click(function() {
		hideContent();
		closeAccordian();
	});
	

	
});
function getOrderRosterReport(url, data) {
	$
			.ajax({
				data : data,
				url : url,
				type : "post",

				beforeSend : function() {
					hideContent();
					startLoading();
				},
				success : function(response) {
					var option = $("<h4>").html(response).find("#option").val();
					var detail = $("<h4>").html(response).find("#totalResult")
							.val();
					var totalSize = "";
					if (option == 1) {
						totalSize = detail.split('-')[0];
						normalResult(totalSize, response);
						closeAccordian();
					} else if (option == 2) {
						totalSize = detail.split('-')[0];
						currentPage = detail.split('-')[1];
						recordCount = detail.split('-')[2];
						closeAccordian();
						paginatedResult(response, recordCount);

					} else if (option == 4) {
						showError('Technical issue occurred. Please contact technical support.');

					} else {
						showWarning('Sorry, no results found for your search criteria. Please try again');
					}
					
					resetOrderDateTimeToLocalTimeZone();
					stopLoading();
				},
				error : function() {
					// goToLogin();
				}
			});
}
function resetOrderDateTimeToLocalTimeZone() {

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
	
	if(latti.trim()!=undefined && latti.trim()!=""
	&& longi.trim()!=undefined && longi.trim()!=""	
	){
		
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
		
					$('tr.timezone').each(
							function() {
								var date = $(this).find('td').eq(3).text();
								var res = date.split("/")[2] + "-" + date.split("/")[1]
										+ "-" + date.split("/")[0];
								// res+"T"+$(this).find('td').eq(4).text()+":00" );
		
								var m = moment.tz(res + "T"
										+ $(this).find('td').eq(4).text() + ":00",
										"Australia/Sydney");
		
								var localdate = m.tz(localTimeZone).format();
								// Computing the day of the new date 
								var newDay=new Date(localdate.substring(0,10)).toDateString().substring(0,3);
								var newTime = localdate.substring(11, 16);
								var newDate = localdate.substring(0, 10).split("-")[2]
										+ "/"
										+ localdate.substring(0, 10).split("-")[1]
										+ "/"
										+ localdate.substring(0, 10).split("-")[0];
								// Assigning the New Day in the first column
								$(this).find('td').eq(2).text(newDay);
								$(this).find('td').eq(3).text(newDate);
								$(this).find('td').eq(4).text(newTime);
							});
		
				},
			});
	}
}
function callFrom() {
	$('#dialog-modal').dialog('close');
	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function callTo() {
	$('#dialog-modal').dialog('close');
	setTimeout(function() {
		$('#to').focus();
	}, 200);
}
function goToLogin() {
	window.location.href = "../../";
}
function paginatedResult(response, size) {
	$(".paginationWrapper").removeClass('hideBlock');
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getOrderRosterReport("getOrderRosterReportForPagination.htm", {
				pageNo : pageNumber
			});

		}
	});
	$('.ContentTable').remove();
	$('.tableStart').after(response);
	$('#totalRecord').text(size);
	$("#errorMsgDiv").addClass("hideBlock");
	$(".tableStart,.totalRecord,.tableFooter,.legentClass").removeClass(
			"hideBlock");
	$('.paginationDiv').show();
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function noDataFound() {
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorContent").removeClass("hideBlock");
	$('#errorMsg')
			.text(
					'Sorry, no results found for your search criteria. Please try again');
}
function normalResult(size, response) {
	$('.ContentTable').remove();
	$('.tableStart').after(response);
	$('#totalRecord').text(size);
	// $('.paginationDiv').removeClass('simple-pagination');
	$("#errorMsgDiv").addClass("hideBlock");
	$(".tableStart,.totalRecord,.tableFooter,.legentClass").removeClass(
			"hideBlock");
	$('.paginationDiv').hide();
}
function showWarning(text) {
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.ContentTable').remove();
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass('hideBlock');
	$('.paginationDiv').hide();
}
function showError(text) {
	$('#errorMsg').text(text);
	$('.ContentTable').remove();
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass("hideBlock");
	$('.paginationDiv').hide();
}
function hideContent() {
	// $(".tableStart,.tableFooter").addClass('hideBlock');
	$("#errorMsgDiv").addClass('hideBlock');
	// $('.ContentTable').remove();
}
function closeAccordian() {
	$(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
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