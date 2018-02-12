var prevRes = '';
var recordCount;
var currentPage;
var warehouseTableContent="";
var NDF = "Sorry, no results found for your search criteria. Please try again.";
var errorNonKrons = '<div class="ContentTableWrapper errorCon " id="errorBreakLoad" style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
		+ '<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
var errorKrons = '<div class="ContentTableWrapper errorCon "  id="errorKronos" style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
		+ '<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
var materialArticle = '';
var supplierArticle = '';
var srcSupplyOption = '';
var optionSearchBy = '';
var data = '';
var extraInfo = '';
var printCombined = '';
var dataFound = false;
var printFlagkron = false;
var printHead = '<div class="width100 pageBreak" style=""><div class="width70  margin5 reportName bold inline-block">Night Fill Labour Plan Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	'
		+ '<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label>'
		+ '</div></div><div class="width100 border"><div class="margin5 margontopnone "><strong>Report for</strong><label class="separator">|</label>'
		+ '<label class="">From Date: </label><label class="fromDatePrint" id=""></label><label class="separator">|</label><label class="catHide" >Department: </label><label class="departmentPrint" id="" ></label><label class="separator">|</label><label class="catHide" >Include: </label><label class="indicatorPrint" id="" ></label>'
		+ '<label class="separator">|</label><label class="">Hours needed to fill: </label><label class="hoursFillHeadPrint"></label>'
		+ '</label> <label class="separator">|</label> <label class="">Hours in Kronos:</label>'
		+ '<label class="grandTotalHeadPrint"></label><label class="separator">|</label><label class=" negValuePrint">'
		+ '</label></label><label class="separator">|</label><label class="catHide">Planned Carton Rate:</label>'
		+ '<label class="plannedCartonRatePrint"></label>';
var reptSumErrorContent = '<div class="ContentTableWrapper errorCon " style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart"><div class="tableTitle msgDiv nodataMessage" id="errorMsgDiv"><h4 id="errorMsg">Sorry, could not retrieve the report summary results. Please try again.</h4></div></div></div>';

var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

var flagBreak = false;
var flagReport = false;
var dateCheckFlag;
var cartonRateHead=0.0;var hoursToFill;var cartonsTot;
$(function() {

	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
	/*
	 * onClose : function(selectedDate) { $("#timeFrom").focus(); }
	 */

	});
	$('#scrollWindow').css('width','40%');
	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
	/*
	 * onClose : function(selectedDate) { $("#timeTo").focus(); }
	 */

	});
	$("#warehouse").attr('disabled', true);
	$('.print').parent().css('float', 'right').css('margin-top', '32px');
	/*
	 * $('#markFilterOpen').click(function() {
	 * $('#markFilterOpen').addClass('hideBlock');
	 * $('#markFilterClear').removeClass('hideBlock'); showmarkFilter(); });
	 * $('#markFilterClear').click(function() {
	 * $('#markFilterOpen').removeClass('hideBlock');
	 * $('#markFilterClear').addClass('hideBlock'); hidemarkFillter(); });
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
	$('#dateTo').val(presentDate);

	var previousDate = new Date();
	previousDate.setTime(previousDate.getTime() - (60 * 60 * 24 * 1000));

	// var newPrevDate = previousDate.getDate();
	var newPrevDate = previousDate.getDate() + 1;
	var newPrevMonth = previousDate.getMonth() + 1;

	if (newPrevDate < 10) {
		newPrevDate = '0' + newPrevDate;
	}
	if (newPrevMonth < 10) {
		newPrevMonth = '0' + newPrevMonth;
	}

	var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate
			.getFullYear());
	$('#dateFrom').val(presentDate);
	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if ($("#dialog-supplier-verify").dialog("isOpen")) {
				$('#goButtonSample1').click();
			} else {
				$('#generateReport').click();
			}

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
	$("#dialog-supplier-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

	$("#dialog-supplier-verify").parent().addClass("popupWrapper");

	$("#dialog-article-search").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

	$("#dialog-article-search").parent().addClass("popupWrapper");

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$("#dialog-modal1").parent().addClass("popupWrapper");
	$('.department').click(
			function() {
				$('#department option[value="' + $(this).val() + '"]').prop(
						'selected', true);
			});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	// Code to show and hide article heirarchy
	$('#department')
			.change(
					function() {
						$(".hierarchyname")
								.val(
										$(
												'#department option[value="'
														+ $("#department")
																.val() + '"]')
												.text());

					});

	$("#generateReport")
			.click(
					function() {
						var data = '';
						var bulkIndicator = "";
						var promotionIndicator = "";
						var advertIndicator = "";
						var jobBuyIndicator = "";

						hideError();
						hideContent();
						var flag = false;
						flag = validate();

						var isCheckedGM = $('#GM').attr('checked') ? true
								: false;
						var isCheckedGroceries = $('#Groceries')
								.attr('checked') ? true : false;
						var isCheckedPerishables = $('#Perishables').attr(
								'checked') ? true : false;

						var isCheckedFS = $('#FS').attr('checked') ? true
								: false;
						var isCheckedPromo = $('#promo').attr('checked') ? true
								: false;
						var isCheckedAdvert = $('#advert').attr('checked') ? true
								: false;
						var isCheckedjobBuy = $('#jobBuy').attr('checked') ? true
								: false;

						var deptGM = '';
						var deptGroceries = '';
						var deptPerishables = '';

						var wareNo = '';
						var wareName = '';
						var warehouseNo = [];
						if(warehouseTableContent != "" && warehouseTableContent != undefined)
						{
							$('#wareHouTable tr').filter(
									function() {

										if ($(this).find($('input:checkbox[name=checkme]')).is(':checked') != false) {

											wareNo = $(this).find($('input:checkbox[name=checkme]')).attr("id");
											console.log(wareNo);
											/*wareName = $(this).text().trim()
													.split("-")[1];*/
											warehouseNo.push(wareNo);
										}
										// if($(this).text().trim()
										// == "#")
										// {
										// posIds.push(hash);
										// }
										/* posIdLength = warehouseNo.length; */
									});
						}	
						
						if (isCheckedGM == true) {
							deptGM = 'W115';
							$("#deptGMHide").val("GENERAL MERCHANDISE");
						} else {
							$("#deptGMHide").val("");
						}
						if (isCheckedGroceries == true) {
							deptGroceries = 'W105';
							$("#deptGroceriesHide").val("GROCERIES");
						} else {
							$("#deptGroceriesHide").val("");
						}
						if (isCheckedPerishables == true) {
							deptPerishables = 'W110';
							$("#deptPerishablesHide").val("PERISHABLES");
						} else {
							$("#deptPerishablesHide").val("");
						}

						if (isCheckedFS == false) {
							bulkIndicator = 'Y';
							$("#bulkIndicatorHide").val("");
						} else {
							$("#bulkIndicatorHide").val("Bulk Load");
						}
						if (isCheckedPromo == false) {
							promotionIndicator = 'Y';
							$("#promotionIndicatorHide").val("");
						} else {
							$("#promotionIndicatorHide").val(
									"Articles on Promotion");
						}
						
						if (isCheckedAdvert == false) {
							advertIndicator = 'Y';
							$("#advertIndicatorHide").val("");
						} else {
							$("#advertIndicatorHide").val("Advert");
						}
						if (isCheckedjobBuy == false) {
							jobBuyIndicator = 'Y';
							$("#jobBuyIndicatorHide").val("");
						} else {
							$("#jobBuyIndicatorHide").val("Job Buy");
						}
						
						var extraInfo = '&bulkIndicator=' + bulkIndicator
								+ '&promotionIndicator=' + promotionIndicator
								+ '&advertIndicator=' + advertIndicator
								+ '&jobBuyIndicator=' + jobBuyIndicator
								+ '&deptGM=' + deptGM + '&deptGroceries='
								+ deptGroceries + '&deptPerishables='
								+ deptPerishables + '&warehouseNo='
								+ warehouseNo;
						data = $('#nightFillLabourPlan').serialize()
								+ encodeURI(extraInfo);
						;
						/* $("#reportContent").removeClass('hideBlock'); */
						/*
						 * $('#accordion').accordion({ active : true });
						 */

						/*
						 * breakLoad(data);
						 * getNightFillLabourData($('#nightFillLabourPlan').serialize());
						 */
						var curDateFirst = new Date();

						var curYear = curDateFirst.getFullYear();
						var curmonth = curDateFirst.getMonth();
						var curdate = curDateFirst.getDate();
						var curDate = new Date();

						curDate = new Date(curYear, curmonth, curdate);
						var year = $("#dateFrom").val().split("/")[2];
						var month = $("#dateFrom").val().split("/")[1];
						var date = $("#dateFrom").val().split("/")[0];

						var givenDate = new Date(year, month - 1, date);
						console.log("CurDate andGivenDATe outer====" + curDate
								+ "__" + givenDate);
						
						
					//Need to comment these three lines if all data are available for valid date range
					/*	dateCheckFlag = true;
						breakLoadFutureDays(data);
						  getNightFillLabourData($('#nightFillLabourPlan')
						  .serialize());*/
						
						  //Condition Check for Date validation(need to uncomment these condition)
						if (flag) {

							if (givenDate.getTime() > curDate.getTime()) {
								//console
										//.log("CurDate andGivenDATe greaterthan===="
												//+ curDate + "__" + givenDate);
								breakLoadFutureDays(data);
								getNightFillLabourData($('#nightFillLabourPlan')
										.serialize());
								dateCheckFlag = true;

							} else if (givenDate.getTime() <= curDate.getTime()) {
								//console.log("CurDate andGivenDATe equals===="
										//+ curDate + "__" + givenDate);
							breakLoad(data);
							getNightFillLabourData($('#nightFillLabourPlan')
									.serialize());
								dateCheckFlag = false;//false
							} else {
								showError("Please enter valid date..");
							}

						}

					});

	// checks radio buttons in Souce of Supply
	$('#warehouse').click(function() {
		$("#warehouseField").removeClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
		$("#allField").addClass('hideBlock');
		$('input:checkbox[name=checkme]').prop('disabled',false);
	});

	$('#all').click(function() {
		$("#allField").removeClass('hideBlock');
		$("#warehouseField").addClass('hideBlock');
		$("#vendorField").addClass('hideBlock');
		$('#supplier').val('');
		$("#supplier").attr('readonly', 'readonly');
		$('input:checkbox[name=checkme]').prop('checked',false);	
		$('input:checkbox[name=checkme]').prop('checked',true);	
		$('input:checkbox[name=checkme]').prop('disabled',true);	
		
	});

	$("#filterTabs").tabs();

	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});

	});

	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	$("#supplier").attr('readonly', 'readonly');
	

	$("#warehouse,#vendor").click(function() {
		$('#supplier').val('');
		$("#supplier").removeAttr('readonly');
		$('#supplier').focus();
	});
	$("#verifySupplier").click(
			function() {
				hideError();
				var radioSelected = getRadioValue('sourceSupply');
				if (radioSelected == "vendor" || radioSelected == "warehouse"
						|| radioSelected == "all") {
					var vendorNo = $('#supplier').val().split("-")[0];
					var vendorName = $('#supplier').val().split("-")[1];
					var sourceSupply = $(
							'input:radio[name=sourceSupply]:checked').val();
					if (sourceSupply == 'all') {

						nearbyStore(vendorNo, vendorName, sourceSupply);
					}

					else if (($('#supplier').val() != '' && $('#supplier')
							.val() != 'Enter supplier no. or name')) {
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend : function() {
								startLoading();
							},
							data : {
								vendorNo : vendorNo,
								sourceSupply : sourceSupply,
								vendorName : vendorName
							},
							success : function(response) {
								$('#popupDataDiv').html(response);
								if ($('#sizeCheck').val() == 0) {
									showAlert('Invalid Supplier.', 'supplier');
								} else if ($('#sizeCheck').val() >= 1) {
									if (!$("#dialog-supplier-verify").dialog(
											"isOpen")) {
										$('#vendorDesc').val(
												$('#supplier').val());
										$("#dialog-supplier-verify").parent()
												.addClass("popupWrapper");
										$("#dialog-supplier-verify")
												.removeClass('hideBlock')
												.dialog("open");
										$("#searchWarning").addClass(
												'hideBlock');
										$("#popupSearch").removeClass(
												'hideBlock');
									}
								} else {
									if (radioSelected == "vendor") {
										$("#supplier").val(
												Number($("#suppNo0").text()));
									} else {
										$("#supplier")
												.val($("#suppNo0").text());
									}
								}
								stopLoading();
							},
						});
					} else {
						showAlert('Please fill supplier field. ', 'supplier');
					}
				}

			});
	$("#goButtonSample1").click(function() {
		hideError();
		var vendorNo = $('#vendorDesc').val().split("-")[0];
		var vendorName = $('#vendorDesc').val().split("-")[1];
		var sourceSupply = $('input:radio[name=sourceSupply]:checked').val();

		$.ajax({
			type : "GET",
			url : "autocomplete.htm",
			beforeSend : function() {
				startLoading();
			},
			data : {
				vendorNo : vendorNo,
				sourceSupply : sourceSupply,
				vendorName : vendorName
			},
			success : function(response) {
				$('#popupDataDiv').html(response);
				stopLoading();
			},
		});

	});

	$('#closeLink').click(function() {
		// hideContent();
		closeAccordian();
	});
	$('.hierarchyWrapper input[type=radio]').click(function() {
		$('.hierarchyname').val($(this).next().text());
	});

});
function removeUser() {
	$('.removeUser').click(function() {
		$(this).parent().remove();
	});
}
function getRadioValue(name) {
	var group = document.getElementsByName(name);

	for ( var i = 0; i < group.length; i++) {
		if (group[i].checked) {
			return group[i].value;
		}
	}

	return '';
}
function printResult(response) {
	var output = $.parseJSON(response);
	var breakLoad = output.breakLoadMap;
	var dropCart = output.dropCartonMap;
	/* var fillCartonMap = output.fillCartonMap; */
	var fillCartonMap = output.fillCartonMap;
	var presentationList = output.presentationList;
	var msg = output.msg;
	var content = '';
	var flag = true;
	var rubbishCartonList = output.rubbishCartonListAgg;
	var reportSummaryList = output.reportSummaryMap;
	var reportSummaryArticleList = output.bulkOrderArticleMap;

	var noCartons = 0;
	var cartRate = 0;
	var noHours = 0;
	var noExcessCarton = 0;
	var noHoursForExcessCarton = 0;
	var deptName = '';
	var reportContent = '';

	var finalTotnoOfCartons = 0;
	var finalTotcartRate = 0;
	var finalTotnoHours = 0;

	var listRubbish = rubbishCartonList;
	var totLoad = 0;
	var totBulk = 0;
	var totPromotion = 0;
	var totCartFilled = 0;
	var totExcessCart = 0;

	var totNoOfJobBuyCartons = 0;
	var totJobBuy = 0;
	var totAdvert = 0;
	var totNoOfAdvertCartons = 0;
	
	
	
	var totalNoOfCartons = 0;
	var totalCartRate = 0;
	var totalNoOfHours = 0;
	var totalNoOfExcessCarton = 0;
	var totalNoOfHoursForExCart = 0;

	var totnoCartonDrop = 0;
	var totcartRateDrop = 0;
	var totnoOfHoursDrop = 0;

	var totnoCartonBreak = 0;
	var totcartRateBreak = 0;
	var totnoOfHoursBreak = 0;

	var sumNoOfCartons = 0;
	var sumCartonRate = 0;
	var sumNoOfHours = 0;

	var breaknoOfCartons = 0;
	var breakcartonRate = 0;
	var breaknoOfHours = 0;

	var rubbishNOOfCartons = 0;
	var rubbishCartRate = 0;
	var rubbishNoOfHours = 0;

	var totCartonOfLoadForecast = 0;
	var totBulkCarton = 0;
	var totNoOfPromoCartons = 0;
	var totcartonsToFiller = 0;
	var totNoOfExcessCartons = 0;

	var finalTotpresentHours = 0;
	var printContent = '';
	var breakContentFirst = '';
	var totList = 0;
	var lBreak = 0;
	var lDrop = 0;
	var lFill = 0;
	var lRubbish = 0;
	var lPresent = 0;
	var lReport = 0;

	var s = 0;
	var k = 0;

	var nextContent = '';

	// markdownDetails = updateMarkMap(markdownDetails);

	breakContentFirst = '<table cellspacing="0" class="sortTable printTable ContentTable actionRowPrint"  id="breakLoadTablePrintFirst"><thead> <tr>'
			+ '<th>&nbsp;</th>'
			+ '<th class="numberColumn columnDivider">No. of Cartons </th>'
			+ '<!--<th class="numberColumn columnDivider">Carton Rate </th>-->'//SC-448
			+ '<th class="numberColumn columnDivider">No. of Hours</th>'
			+ '<th class="numberColumn columnDivider">No. of Excess Cartons </th>'
			+ '<th class="numberColumn columnDivider">No. of Hours for Excess Cartons </th>	'

			+ '</tr></thead><tbody>';

	breakContent = '<table cellspacing="0" class="sortTable ContentTable printTable actionRowPrint"  id="breakLoadTablePrint"><thead> <tr>'
			+ '<th>&nbsp;</th>'
			+ '<th class="numberColumn columnDivider">No. of Cartons </th>'
			+ '<!--th class="numberColumn columnDivider">Carton Rate </th>-->' //SC-448
			+ '<th class="numberColumn columnDivider">No. of Hours</th>'
			+ '<th class="numberColumn columnDivider">No. of Excess Cartons </th>'
			+ '<th class="numberColumn columnDivider">No. of Hours for Excess Cartons </th>	'

			+ '</tr></thead><tbody>';

	reportContent = '<table cellspacing="0" class="sortTable ContentTable printTable actionRowPrint"   style="border: solid 1px #0B0A0B;"id="reportSummaryTablePrint"><tbody>';

	if (reportSummaryList != null && reportSummaryList != "") {

		reportContent += '<tr><td class=" columnDivider" >&nbsp;</td>';
		for ( var m in reportSummaryList) {
			var listReport = reportSummaryList[m];

			lReport = listReport.length;
			/* for ( var i = 0; i < listReport.length; i++) { */
			reportContent += '<td class="numberColumn rightValue columnDivider "  >'
					+ '<strong>'
					+ listReport[0].departmentName
					+ '</strong></td>';
			// }

		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>Total</strong></td></tr>';

		reportContent += '<tr><td class=" columnDivider keyInfo" >Cartons on Loads/Forecast:</td>';

		for ( var m in reportSummaryList) {

			var listReport = reportSummaryList[m];

			totCartonOfLoadForecast = 0;

			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			for ( var i = 0; i < listReport.length; i++) {

				totCartonOfLoadForecast = Number(totCartonOfLoadForecast)
						+ Number(listReport[i].totalCartonsOfLoadForecast);

			}
			reportContent += Number(totCartonOfLoadForecast) + '</td>';
			totLoad = Number(totLoad) + Number(totCartonOfLoadForecast);

		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totLoad + '</strong></td></tr>';
		reportContent += '<tr><td class=" columnDivider keyInfo" >Bulk Cartons:</td>';
		
		
		
		
		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			var listReport = reportSummaryList[m];
			totBulkCarton = 0;

			for ( var i = 0; i < listReport.length; i++) {

				totBulkCarton = Number(totBulkCarton)
						+ Number(listReport[i].noOfBulkCartons);

			}
			reportContent += Number(totBulkCarton) + '</td>';
			totBulk = Number(totBulk) + Number(totBulkCarton);
		}

		reportContent += '<td class="numberColumn columnDivider rightValue valueInfo lastColumn"><strong>'
				+ totBulk + '</strong></td></tr>';
		
		
		
		//Bulk Cartons - Inclusion
	

		/*if (!dateCheckFlag && reportSummaryArticleList != null && reportSummaryArticleList != ""
			&& jQuery.isEmptyObject(reportSummaryArticleList.valueOf()) != true) {
			for (var m in reportSummaryArticleList) {
			
			var listReport = reportSummaryArticleList[m];

				reportContent += '<tr class="bulkChild" ><td class=" keyInfo" style="padding-left: 50px;">';
				reportContent += listReport.article+'-'+ listReport.articleDesc+ '</td>';
				if (listReport.isDeptGroc && Number(listReport.articleGrocVal) != null && Number(listReport.articleGrocVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider rightValue ">' + Number(listReport.articleGrocVal)+ '</td>';
					}else if(listReport.isDeptGroc){
					reportContent += '<td class="numberColumn columnDivider rightValue ">0</td>';
					}
						
					if (listReport.isDeptPer && Number(listReport.articlePerVal) != null && Number(listReport.articlePerVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider rightValue ">' + Number(listReport.articlePerVal)+ '</td>';
					}else if(listReport.isDeptPer){
						reportContent += '<td class="numberColumn columnDivider rightValue ">0</td>';
						}
					if (listReport.isDeptGm && Number(listReport.articleGMVal) != null && Number(listReport.articleGMVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider rightValue ">'+ Number(listReport.articleGMVal)+ '</td>';
					}else if(listReport.isDeptGm){
						reportContent += '<td class="numberColumn columnDivider rightValue">0</td>';
						}
					if (Number(listReport.total) != null && Number(listReport.total) != "0"){
					reportContent += '<td class="numberColumn columnDivider rightValue valueInfo lastColumn"><strong>' + Number(listReport.total)+ '</strong></td></tr>';
					}else{
						reportContent += '<td class="numberColumn columnDivider rightValue valueInfo lastColumn ">0</td>';
						}
					
			}
		}*/
		
		reportContent += '<tr><td class=" columnDivider keyInfo" >Promotional Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			totNoOfPromoCartons = 0;

			var listReport = reportSummaryList[m];

			for ( var i = 0; i < listReport.length; i++) {

				totNoOfPromoCartons = Number(totNoOfPromoCartons)
						+ Number(listReport[i].noOfPromotionalCartons);

			}
			reportContent += Number(totNoOfPromoCartons) + '</td>';
			totPromotion = Number(totPromotion) + Number(totNoOfPromoCartons);
		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totPromotion + '</strong></td></tr>';

		/*reportContent += '<tr><td class=" columnDivider keyInfo" >JobBuy Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			totNoOfJobBuyCartons = 0;
			
			var listReport = reportSummaryList[m];

			for ( var i = 0; i < listReport.length; i++) {

				totNoOfJobBuyCartons = Number(totNoOfJobBuyCartons)
						+ Number(listReport[i].noOfJobBuysCartons);

			}
			reportContent += Number(totNoOfJobBuyCartons) + '</td>';
			totJobBuy = Number(totJobBuy) + Number(totNoOfJobBuyCartons);
		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totJobBuy + '</strong></td></tr>';
		
		
		reportContent += '<tr><td class=" columnDivider keyInfo" >Advert Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			totNoOfAdvertCartons = 0;
			
			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {

				totNoOfAdvertCartons = Number(totNoOfAdvertCartons)
						+ Number(listReport[i].noOfAdvertCartons);

			}
			reportContent += Number(totNoOfAdvertCartons) + '</td>';
			totAdvert = Number(totAdvert) + Number(totNoOfAdvertCartons);
		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totAdvert + '</strong></td></tr>';*/
		reportContent += '<tr><td class=" columnDivider keyInfo" >Cartons to Fill:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider  " >';
			totcartonsToFiller = 0;

			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {

				totcartonsToFiller = Number(totcartonsToFiller)
						+ Number(listReport[i].cartonsToBeFilled);

			}
			reportContent += Number(totcartonsToFiller) + '</td>';
			totCartFilled = Number(totCartFilled) + Number(totcartonsToFiller);
		}
		reportContent += '<td class="numberColumn columnDivider rightValue  lastColumn"><strong>'
				+ totCartFilled + '</strong></td></tr>';

		reportContent += '<tr><td class=" columnDivider keyInfo " >Excess Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider " >';
			totNoOfExcessCartons = 0;
			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {



				if (listReport[i].noOfExcessCartons != null
						&& listReport[i].noOfExcessCartons != undefined
						&& listReport[i].noOfExcessCartons != "") {
					if (!isNaN(totNoOfExcessCartons))
				totNoOfExcessCartons = Number(totNoOfExcessCartons)
						+ Number(listReport[i].noOfExcessCartons);
				} else {
					totNoOfExcessCartons = "-";
				}

			}
			if (!isNaN(totNoOfExcessCartons)) {
			reportContent += Number(totNoOfExcessCartons) + '</td>';
			totExcessCart = Number(totExcessCart)
					+ Number(totNoOfExcessCartons);
			} else {
				reportContent += totNoOfExcessCartons + '</td>';
				totExcessCart = "-";
		}
		}
		reportContent += '<td class="numberColumn columnDivider valueInfo rightValue lastColumn"><strong>'
				+ totExcessCart + '</strong></td></tr>';

	}
	reportContent += '</tbody></table>';
	s = 7;
	if (breakLoad != null && breakLoad != "") {

		s++;
		content = breakContentFirst
				+ '<tr class="bold">'
				+ '<td colspan="6" class="rowSection rowHighlight">Break Load (Sort and split)</td></tr>';
		totnoCartonBreak = 0;
		totcartRateBreak = 0;
		totnoOfHoursBreak = 0;
		lBreak=0;
		for ( var m in breakLoad) {

			breaknoOfCartons = 0;
			breakcartonRate = 0;
			breaknoOfHours = 0;

			var list = breakLoad[m];
			lBreak++;
			for ( var i = 0; i < list.length; i++) {
				list[i].departmentName = (list[i].departmentName != null && list[i].departmentName != undefined) ? list[i].departmentName
						: '';
				list[i].noOfCartons = (list[i].noOfCartons != null && list[i].noOfCartons != undefined) ? list[i].noOfCartons
						: '';
				list[i].cartonRate = (list[i].cartonRate != null && list[i].cartonRate != undefined) ? list[i].cartonRate
						: '';
				list[i].noOfHours = (list[i].noOfHours != null && list[i].noOfHours != undefined) ? list[i].noOfHours
						: '';

				flag = false;

				if (list[i].noOfCartons != null
						&& list[i].noOfCartons != undefined
						&& list[i].noOfCartons != "")
					breaknoOfCartons = Number(breaknoOfCartons)
							+ Number(list[i].noOfCartons);
				else
					breaknoOfCartons = Number(breaknoOfCartons) + Number(0);
				if (list[i].cartonRate != null
						&& list[i].cartonRate != undefined
						&& list[i].cartonRate != "")
					breakcartonRate =  Number(list[0].cartonRate);
				else
					breakcartonRate = Number(breakcartonRate) + Number(0);
				if (list[i].noOfHours != null && list[i].noOfHours != undefined
						&& list[i].noOfHours != "")
					breaknoOfHours = Number(breaknoOfHours)
							+ sumupMin(Number(list[i].noOfHours).toFixed(3));
				else
					breaknoOfHours = Number(breaknoOfHours) + Number(0);

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(breaknoOfHours))) != 0) {
				aggCartRate = Number(breaknoOfCartons)
						/  (minToHour(hoursToMin(Number(breaknoOfHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}	
			s++;
			content += '<tr id="' + i + '" class=" parentTr ';
			content += '"><td class="leftValue" >' + list[0].departmentName
					+ '</td><td class="rightValue" >'
					+ Number(breaknoOfCartons) + '</td>';

			content += '<!-- <td class="rightValue" >'
					+ aggCartRate + '</td> -->' //SC-448
					+ '<td class="rightValue " >'
					+ hoursToMin(Number(breaknoOfHours))
					+ '</td><td class="rightValue">'
					+ '</td><td class="rightValue lastColumn">' + '</td></tr>';

			totnoCartonBreak = Number(totnoCartonBreak)
					+ Number(breaknoOfCartons);

			totnoOfHoursBreak = Number(totnoOfHoursBreak)
					+ Number(breaknoOfHours);
		}
		s++;
		if (minToHour(hoursToMin(Number(totnoOfHoursBreak))) != 0) {
			totcartRateBreak = Number(totnoCartonBreak)
					/  (minToHour(hoursToMin(Number(totnoOfHoursBreak))));
			totcartRateBreak = Number(totcartRateBreak).toFixed(2);
		} else {
			totcartRateBreak = "-";
		}
	
		content += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totnoCartonBreak + '</td>';

		content += '<!--<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totcartRateBreak
				+ '</td>-->' //SC-448
				+ '<td class="rightValue numberColumn columnDivider  valueInfo">'
				+ hoursToMin(totnoOfHoursBreak)
				+ '</td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" ></td>'
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ '</td></tr>';
		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totnoCartonBreak); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totcartRateBreak);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(totnoOfHoursBreak);
	}

	if (dropCart != null && dropCart != "") {

		s++;
		content += '<tr class="bold">'
				+ '<td colspan="6" class="rowSection rowHighlight">Run Cartons on shop floor</td></tr>';
		totnoCartonDrop = 0;
		totcartRateDrop = 0;
		totnoOfHoursDrop = 0;
		lDrop=0;
		for ( var m in dropCart) {

			sumNoOfCartons = 0;
			sumCartonRate = 0;
			sumNoOfHours = 0;
			var listDrop = dropCart[m];

			lDrop++;

			for ( var i = 0; i < listDrop.length; i++) {
				listDrop[i].departmentName = (listDrop[i].departmentName != null && listDrop[i].departmentName != undefined) ? listDrop[i].departmentName
						: '';
				listDrop[i].noOfCartons = (listDrop[i].noOfCartons != null && listDrop[i].noOfCartons != undefined) ? listDrop[i].noOfCartons
						: '';
				listDrop[i].cartonRate = (listDrop[i].cartonRate != null && listDrop[i].cartonRate != undefined) ? listDrop[i].cartonRate
						: '';
				listDrop[i].noOfHours = (listDrop[i].noOfHours != null && listDrop[i].noOfHours != undefined) ? listDrop[i].noOfHours
						: '';

				flag = false;

				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumNoOfCartons = Number(sumNoOfCartons)
							+ Number(listDrop[i].noOfCartons);
				else
					sumNoOfCartons = Number(sumNoOfCartons) + Number(0);
				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumCartonRate = Number(listDrop[0].cartonRate);
				else
					sumCartonRate = Number(sumCartonRate) + Number(0);
				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumNoOfHours = Number(sumNoOfHours)
							+ sumupMin(Number(listDrop[i].noOfHours).toFixed(3));
				else
					sumNoOfHours = Number(sumNoOfHours) + Number(0);

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(sumNoOfHours))) != 0) {
				aggCartRate = Number(sumNoOfCartons)
						/  (minToHour(hoursToMin(Number(sumNoOfHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}
			s++;
			content += '<tr id="' + i + '" class=" parentTr ';
			content += '"><td class="leftValue" >' + listDrop[0].departmentName
					+ '</td><td class="rightValue" >' + Number(sumNoOfCartons)
					+ '</td>';

			content += '<!--<td class="rightValue" >'
					+ aggCartRate + '</td>-->' //SC-448
					+ '<td class="rightValue " >'
					+ hoursToMin(Number(sumNoOfHours))
					+ '</td><td class="rightValue">'
					+ '</td><td class="rightValue lastColumn">' + '</td></tr>';

			totnoCartonDrop = Number(totnoCartonDrop) + Number(sumNoOfCartons);

			totnoOfHoursDrop = Number(totnoOfHoursDrop) + Number(sumNoOfHours);
		}

		if (minToHour(hoursToMin(Number(totnoOfHoursDrop))) != 0) {
			totcartRateDrop = Number(totnoCartonDrop)
					/  (minToHour(hoursToMin(Number(totnoOfHoursDrop))));
			totcartRateDrop = Number(totcartRateDrop).toFixed(2);
		} else {
			totcartRateBreak = "-";
		}
		s++;
		content += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totnoCartonDrop + '</td>';

		content += '<!-- <td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totcartRateDrop
				+ '</td> -->' //SC-448
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ hoursToMin(totnoOfHoursDrop)
				+ '</td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" ></td>'
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ '</td></tr>';

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totnoCartonDrop); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totcartRateDrop);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(totnoOfHoursDrop);
	}
	totList = lBreak + lDrop + 7;
	if (s % 17 == 0 && s != 0) {
		content += '</tbody></table>' + printFoot;
	} else if (s < 17) {
		var lastPageTrLenFirst = 17 - s;

		if (lastPageTrLenFirst != 0) {
			for ( var i = 0; i < lastPageTrLenFirst; i++) {
				content += '<table cellspacing="0" class=" sortTable "><tbody><tr class="height30"><td colspan="11"></td></tr></tbody></table>';
			}
			content += '</tbody></table>' + printFoot;
		}
	}
	if (fillCartonMap != null && fillCartonMap != "") {
		flag = false;
		k++;
		nextContent = printHead
				+ breakContent
				+ '<tr>'
				+ '<td colspan="6" class="rowSection rowHighlight">Filling / Packing</td>'
				+ '</tr>';

		totalNoOfCartons = 0;
		totalCartRate = 0;
		totalNoOfHours = 0;
		totalNoOfExcessCarton = 0;
		totalNoOfHoursForExCart = 0;
		for ( var m in fillCartonMap) {

			noCartons = 0;
			cartRate = 0;
			noHours = 0;
			noExcessCarton = 0;
			noHoursForExcessCarton = 0;
			deptName = '';

			var listFillCarton = fillCartonMap[m];
			lFill = listFillCarton.length;

			var myArr = [];

			flag = false;
			for ( var i = 0; i < listFillCarton.length; i++) {

				listFillCarton[i].departmentName = (listFillCarton[i].departmentName != null && listFillCarton[i].departmentName != undefined) ? listFillCarton[i].departmentName
						: '';
				listFillCarton[i].noOfCartons = (listFillCarton[i].noOfCartons != null && listFillCarton[i].noOfCartons != undefined) ? listFillCarton[i].noOfCartons
						: '';
				listFillCarton[i].cartonRate = (listFillCarton[i].cartonRate != null && listFillCarton[i].cartonRate != undefined) ? listFillCarton[i].cartonRate
						: '';
				listFillCarton[i].noOfHours = (listFillCarton[i].noOfHours != null && listFillCarton[i].noOfHours != undefined) ? listFillCarton[i].noOfHours
						: '';
				listFillCarton[i].noOfExcessCartons = (listFillCarton[i].noOfExcessCartons != null && listFillCarton[i].noOfExcessCartons != undefined) ? listFillCarton[i].noOfExcessCartons
						: '';
				listFillCarton[i].noOfHoursForExcessCartons = (listFillCarton[i].noOfHoursForExcessCartons != null && listFillCarton[i].noOfHoursForExcessCartons != undefined) ? listFillCarton[i].noOfHoursForExcessCartons
						: '';

				if (i == 0) {
					deptName += listFillCarton[i].departmentName;
				}
				if (i != 0) {
					deptName = deptName + ",&nbsp;"
							+ listFillCarton[i].departmentName;
				}
				myArr.push(listFillCarton[i].departmentName);

				if (listFillCarton[i].noOfCartons != null
						&& listFillCarton[i].noOfCartons != undefined
						&& listFillCarton[i].noOfCartons != "")
					noCartons = Number(noCartons)
							+ Number(listFillCarton[i].noOfCartons);
				else
					noCartons = Number(noCartons) + Number(0);
				if (listFillCarton[i].cartonRate != null
						&& listFillCarton[i].cartonRate != undefined
						&& listFillCarton[i].cartonRate != "")
					cartRate =  Number(listFillCarton[0].cartonRate);
				else
					cartRate = Number(cartRate) + Number(0);
				if (listFillCarton[i].noOfHours != null
						&& listFillCarton[i].noOfHours != undefined
						&& listFillCarton[i].noOfHours != "")
					noHours = Number(noHours)
							+ sumupMin(Number(listFillCarton[i].noOfHours)
									.toFixed(3));
				else
					noHours = Number(noHours) + Number(0);
				if (listFillCarton[i].noOfExcessCartons != null
						&& listFillCarton[i].noOfExcessCartons != undefined
						&& listFillCarton[i].noOfExcessCartons != "")
					noExcessCarton = Number(noExcessCarton)
							+ Number(listFillCarton[i].noOfExcessCartons);
				else
					noExcessCarton = Number(noExcessCarton) + Number(0);
				if (listFillCarton[i].noOfHoursForExcessCartons != null
						&& listFillCarton[i].noOfHoursForExcessCartons != undefined
						&& listFillCarton[i].noOfHoursForExcessCartons != "")
					noHoursForExcessCarton = Number(noHoursForExcessCarton)
							+ sumupMin(Number(
									listFillCarton[i].noOfHoursForExcessCartons)
									.toFixed(3));
				else
					noHoursForExcessCarton = Number(noHoursForExcessCarton)
							+ Number(0);

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(noHours))) != 0) {
				aggCartRate = Number(noCartons)
						/  (minToHour(hoursToMin(Number(noHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}	
			
			var newArr = $.unique(myArr.sort()).sort();
			var result = "";
			for ( var i = 0; i < newArr.length; i++) {
				result += newArr[i] + ",";
			}
			result = result.slice(0, -1); // remove last comma

			
			if (dateCheckFlag == false) {
			k++;
				if(m=='#')
				{
			nextContent += '<tr id="' + i + '" class=" parentTr ';
				nextContent += '"><td class="leftValue" ><strong>Unknown Location &nbsp;' 
						+ ':&nbsp;</strong>' + result + '&nbsp;</td>';
				nextContent += '<td class="rightValue" >' + noCartons + '</td>';

				nextContent += '<!--<td class="rightValue" >' + aggCartRate
						+ '</td>-->' //SC-448
						+ '<td class="rightValue " >'
						+ hoursToMin(Number(noHours))
						+ '</td><td class="rightValue">'
						+ Number(noExcessCarton)
						+ '</td><td class="rightValue lastColumn">'
						+ hoursToMin(Number(noHoursForExcessCarton))
						+ '</td></tr>';
				}
				else if(m!='#')	
				{
					nextContent += '<tr id="' + i + '" class=" parentTr ';
					nextContent += '"><td class="leftValue" ><strong>Aisle &nbsp;' + m
						+ ':&nbsp;</strong>' + result + '&nbsp;</td>';
					nextContent += '<td class="rightValue" >' + noCartons + '</td>';

					nextContent += '<!--<td class="rightValue" >' + aggCartRate
					+ '</td>-->' //SC-448
					+ '<td class="rightValue " >'
						+ hoursToMin(Number(noHours))
						+ '</td><td class="rightValue">'
					+ Number(noExcessCarton)
					+ '</td><td class="rightValue lastColumn">'
						+ hoursToMin(Number(noHoursForExcessCarton))
						+ '</td></tr>';
					
				}

			totalNoOfCartons = Number(totalNoOfCartons) + noCartons;

			totalNoOfHours = Number(totalNoOfHours) + Number(noHours);
			totalNoOfExcessCarton = Number(totalNoOfExcessCarton)
					+ Number(noExcessCarton);
			totalNoOfHoursForExCart = Number(totalNoOfHoursForExCart)
					+ Number(noHoursForExcessCarton);
			} else if (dateCheckFlag == true) {
				k++;
				nextContent += '<tr id="' + i + '" class=" parentTr ';
				nextContent += '"><td class="leftValue" >' + result + '&nbsp;</td>';

				nextContent += '<td class="rightValue" >' + noCartons + '</td>';

				nextContent += '<!--<td class="rightValue" >' + cartRate.toFixed(2)
						+ '</td>-->' //SC-448
						+ '<td class="rightValue " >'
						+ hoursToMin(Number(noHours))
						+ '</td><td class="rightValue">'
						+ '-</td><td class="rightValue lastColumn">'
						+ '-</td></tr>';

				totalNoOfCartons = Number(totalNoOfCartons) + noCartons;

				totalNoOfHours = Number(totalNoOfHours) + Number(noHours);

		}
			if (k % 17 == 0 && k != 0) {

				nextContent += '</tbody></table>' + printFoot;
				nextContent += printHead
						+ breakContent;
				k=0;
			} /*else if (k < 17 && k == lFill-1 < 17 && k != 0) {
				var lastPageTrLenFirst = 17 - k;

				if (lastPageTrLenFirst != 0) {
					for ( var i = 0; i < lastPageTrLenFirst; i++) {
						if (i != 0)
							nextContent += '<tr></tr>';
					}
					nextContent += '</tbody></table>' + printFoot;
				}
			}*/
		}
		if (minToHour(hoursToMin(Number(totalNoOfHours))) != 0) {
			totalCartRate = Number(totalNoOfCartons)
					/  (minToHour(hoursToMin(Number(totalNoOfHours))));
			totalCartRate = Number(totalCartRate).toFixed(2);
		} else {
			totalCartRate = "-";
		}
	
		k++;
		nextContent += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totalNoOfCartons + '</td>';

		nextContent += '<!--<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totalCartRate
				+ '</td>-->'//SC-448
				+ '<td class="rightValue  numberColumn columnDivider valueInfo" >'
				+ hoursToMin(Number(totalNoOfHours)) + '</td>';
		if (dateCheckFlag == false) {
			nextContent += '<td class="rightValue numberColumn columnDivider valueInfo">'
				+ Number(totalNoOfExcessCarton)
				+ '</td><td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ hoursToMin(totalNoOfHoursForExCart) + '</td></tr>';

		} else if (dateCheckFlag == true) {
			nextContent += '<td class="rightValue numberColumn columnDivider valueInfo">'
					+ '-</td><td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
					+ '-</td></tr>';

		}
		if (k % 17 == 0 && k != 0) {

			nextContent += '</tbody></table>' + printFoot;
			nextContent += printHead
					+ breakContent;
			k=0;
		}
		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totalNoOfCartons); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totalCartRate);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(totalNoOfHours)+ Number(totalNoOfHoursForExCart);
	}
	/*if (k % 17 == 0 && k != (totList + lFill - 1) && k != 0) {

		nextContent += printFoot;
	}*/
	if (rubbishCartonList != null && rubbishCartonList != "") {
		flag = false;
		//k++;
		//nextContent += '<tr><td colspan="6" class="rowSection rowHighlight">Rubbish Removal</td></tr>';
		rubbishNOOfCartons = 0;
		rubbishCartRate = 0;
		rubbishNoOfHours = 0;
		for ( var i = 0; i < listRubbish.length; i++) {
			listRubbish[i].departmentName = (listRubbish[i].departmentName != null && listRubbish[i].departmentName != undefined) ? listRubbish[i].departmentName
					: '';
			listRubbish[i].noOfCartons = (listRubbish[i].noOfCartons != null && listRubbish[i].noOfCartons != undefined) ? listRubbish[i].noOfCartons
					: '';
			listRubbish[i].cartonRate = (listRubbish[i].cartonRate != null && listRubbish[i].cartonRate != undefined) ? listRubbish[i].cartonRate
					: '';
			listRubbish[i].noOfHours = (listRubbish[i].noOfHours != null && listRubbish[i].noOfHours != undefined) ? listRubbish[i].noOfHours
					: '';

			flag = false;
			
			
			if (listRubbish[i].noOfCartons != null
					&& listRubbish[i].noOfCartons != undefined
					&& listRubbish[i].noOfCartons != "")
				rubbishNOOfCartons = Number(rubbishNOOfCartons)
						+ Number(listRubbish[i].noOfCartons);
			else
				rubbishNOOfCartons = Number(rubbishNOOfCartons) + Number(0);
			if (listRubbish[i].cartonRate != null
					&& listRubbish[i].cartonRate != undefined
					&& listRubbish[i].cartonRate != "")
				rubbishCartRate = Number(listRubbish[0].cartonRate);
			else
				rubbishCartRate = Number(rubbishCartRate) + Number(0);
			if (listRubbish[i].noOfHours != null
					&& listRubbish[i].noOfHours != undefined
					&& listRubbish[i].noOfHours != "")
				rubbishNoOfHours = Number(rubbishNoOfHours)
						+ sumupMin(Number(listRubbish[i].noOfHours).toFixed(3));
			
			else
				rubbishNoOfHours = Number(rubbishNoOfHours)
						+ Number(0).toFixed(3);
			
		}
		if (minToHour(hoursToMin(Number(rubbishNoOfHours))) != 0) {
			rubbishCartRate = Number(rubbishNOOfCartons)
					/  (minToHour(hoursToMin(Number(rubbishNoOfHours))));
			rubbishCartRate = Number(rubbishCartRate).toFixed(2);
		} else {
			rubbishCartRate = "-";
		}
		k++;
		if (k % 17 == 0 && k != 0) {

			nextContent += '</tbody></table>' + printFoot;
			nextContent += printHead
					+ breakContent;
			k=0;
		}

		nextContent += '<tr id="' + i + '" class=" parentTr ';
		nextContent += '"><td class="leftValue valueInfo" >Rubbish Removal'
				+ '</td><td class="numberColumn columnDivider rightValue valueInfo" >'
				+ Number(rubbishNOOfCartons) + '</td>';

		nextContent += '<!--<td class="numberColumn columnDivider rightValue valueInfo" >'
				+ rubbishCartRate
				+ '</td>-->'//SC-448
				+ '<td class="numberColumn columnDivider rightValue valueInfo " >'
				+ hoursToMin(Number(rubbishNoOfHours))
				+ '</td><td class="numberColumn columnDivider valueInfo">'
				+ '</td><td class="numberColumn columnDivider valueInfo lastColumn">'
				+ '</td></tr>';
		
		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(rubbishNOOfCartons); finalTotcartRate =
		 * Number(finalTotcartRate) + Number(rubbishCartRate);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(rubbishNoOfHours);
	}
	if (presentationList != null && presentationList != "") {
		flag = false;
		//k++;
		//nextContent += '<tr><td colspan="6" class="rowSection rowHighlight">Major Fill Flat Stack</td></tr>';
		var listPresent = presentationList;
		var totDepartmentFlag = $('#GM').is(':checked') &&  $('#Groceries').is(':checked') &&  $('#Perishables').is(':checked') ? true : false;
		for ( var i = 0; i < listPresent.length; i++) {

			/*
			 * listRubbish[i].noOfCartons = (listRubbish[i].noOfCartons != null &&
			 * listRubbish[i].noOfCartons != undefined) ?
			 * listRubbish[i].noOfCartons : ''; listRubbish[i].cartonRate =
			 * (listRubbish[i].cartonRate != null && listRubbish[i].cartonRate !=
			 * undefined) ? listRubbish[i].cartonRate : '';
			 */
			
			// when grocery unchecked major fill plat stack hours is set to zero
			if( $('#Groceries').is(':checked')){		
				
				listPresent[i].presentationHours = (listPresent[i].presentationHours != null && listPresent[i].presentationHours != undefined) ? listPresent[i].presentationHours : '';
				} else{
					listPresent[i].presentationHours = 0.00;
				}

			flag = false;
			k++;
			if (k % 17 == 0 && k != 0) {

				nextContent += '</tbody></table>' + printFoot;
				nextContent += printHead
						+ breakContent;
				k=0;
			}
			nextContent += '<tr id="' + i + '" class=" parentTr ';
			// display major fill flat stack hour to Total major fill flat stack
			if(totDepartmentFlag){
				
				nextContent += '"><td class="leftValue valueInfo" >Total Major Fill Flat Stack'
					+ '</td><td class="numberColumn columnDivider valueInfo" >'
					+ '</td>';
				
				} else {					
					nextContent += '"><td class="leftValue valueInfo" >Major Fill Flat Stack'
						+ '</td><td class="numberColumn columnDivider valueInfo" >'
						+ '</td>';					
				}

			nextContent += '<!--<td class="numberColumn columnDivider valueInfo" >'

					+ '</td>-->' //SC-448
					+ '<td class="numberColumn columnDivider rightValue valueInfo " >'
					+ hoursToMin(sumupMin(Number(
							listPresent[i].presentationHours).toFixed(3)))
					+ '</td><td class="numberColumn columnDivider valueInfo">'
					+ '</td><td class="numberColumn columnDivider valueInfo lastColumn">'
					+ '</td></tr>';
			
			finalTotnoHours = Number(finalTotnoHours)
					+ sumupMin(Number(listPresent[i].presentationHours)
							.toFixed(3));

		}

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(rubbishNOOfCartons); finalTotcartRate =
		 * Number(finalTotcartRate) + Number(rubbishCartRate);
		 */

	}
	if (rubbishCartonList == null && rubbishCartonList == ""
			&& breakLoad == null && breakLoad == "" && fillCartonMap == null
			&& fillCartonMap == "" && dropCart == null && dropCart == "") {
		$('#breakLoadTable tbody:first').html('');
		$('#breakLoadTable').addClass('hideBlock');
		$('#tabs-1 .errorCon').remove();
		$('#tabs-1 ').append(errorNonKrons);
		$('#tabs-1 .msgDiv h4').text(NDF);
		$('#tabs-1 .msgDiv ').addClass('nodataMessage');
		$('#tabs-1 .msgDiv ').removeClass('errorDiv');

	} else if (rubbishCartonList != null && rubbishCartonList != ""
			&& breakLoad != null && breakLoad != "" && fillCartonMap != null
			&& fillCartonMap != "" && dropCart != null && dropCart != "") {
		$("#reportContent").removeClass('hideBlock');
		k++;
		nextContent += '<tr class="bold">'
				+ '<td class="rowSection rowHighlight">Total Night Fill Tasks (Including Excess Hours)</td>'
				/*
				 * + '<td class="rowSection numberColumn rightValue rowHighlight columnDivider">' +
				 * finalTotnoOfCartons.toFixed(0) + '</td>' + '<td class="rowSection numberColumn rowHighlight rightValue columnDivider">' +
				 * finalTotcartRate.toFixed(2) + '</td>'
				 */
				+ '<td colspan="2" class="rowSection numberColumn rowHighlight rightValue columnDivider">'//SC-448
				+ hoursToMin(finalTotnoHours) + '</td>'
				+ '<td class="rowSection rowHighlight"></td>'
				+ '<td class="rowSection rowHighlight"> </td>' + '</tr>';
		if (k % 17 == 0 && k != 0) {

			nextContent += '</tbody></table>' + printFoot;
			nextContent += printHead
					+ breakContent;
			k=0;
		} else if (k < 17 && k != 0) {
			var lastPageTrLenFirst = 17 - k;

			if (lastPageTrLenFirst != 0) {
				for ( var i = 0; i < lastPageTrLenFirst; i++) {
					if (i != 0)
						nextContent += '<table cellspacing="0" class=" sortTable "><tbody><tr class="height30"><td colspan="11"></td></tr></tbody></table>';
				}
				nextContent += '</tbody></table>' + printFoot;
			}
		}
		/*
		 * $('#breakLoadTable tbody:first').html(''); $('#breakLoadTable
		 * tbody:first').append(content); showContent();
		 */
		if (reportSummaryList != null && reportSummaryList != "") {
			/*
			 * $('#reportSummaryTable tbody:first').html('');
			 * $('#reportSummaryTable tbody:first').append(reportContent);
			 */
		}
	}

	nextContent += '</tbody></table>';
	// reportContent += '</tbody></table>';
	printContent = printHead + reportContent + content + nextContent;

	$('#printbody').html('').append(printContent + printCombined).append(
			'<link rel="stylesheet" href="../../styles/printstyle.css" />');

	/*
	 * $(".hoursFillHeadPrint").text($('.hoursFillTot').text().replace(".",
	 * ":")); $(".grandTotalHeadPrint").text($('.grandTotal').text());
	 * 
	 * var hourstoMins = 0; var addMinus = 0; var hoursAddedValue = 0; var
	 * minstoSecs = 0; var addMinusMinute = 0; var MinsAddedValue = 0; var
	 * finalVal = 0; var minsCal = 0;
	 * 
	 * if (Number($('.hoursFillTot').text().split(".")[1]) > 59) { minsCal = 60 -
	 * Number($('.hoursFillTot').text().split(".")[1]);
	 * minsCal=Math.abs(minsCal); if (Math.abs(minsCal) < 10) { minsCal = "0" +
	 * Math.abs(minsCal); } $(".hoursFillHeadPrint").text(
	 * Number($('.hoursFillTot').text().split(".")[0]) + 1 + ":" + minsCal); }
	 * 
	 * 
	 * 
	 * if ($('.hoursFillTot').text() != "" && $('.hoursFillTot').text() !=
	 * undefined) { hourstoMins =
	 * Number($('#hoursFillHead').text().split(":")[0]) * 60;
	 * 
	 * if (Number($('#hoursFillHead').text().split(".")[0]) < 0) { addMinus =
	 * Math .abs(Number($('#hoursFillHead').text().split(":")[1])); } else {
	 * addMinus = Math .abs(Number($('#hoursFillHead').text().split(":")[1])); }
	 * hoursAddedValue = hourstoMins + addMinus; } if ($('.grandTotal').text() != "" &&
	 * $('.grandTotal').text() != undefined) { minstoSecs =
	 * Number($('.grandTotal').text().split(":")[0]) * 60;
	 * 
	 * if (Number($('.grandTotal').text().split(".")[0]) < 0) { addMinusMinute =
	 * Math.abs(Number($('.grandTotal').text() .split(":")[1])); } else {
	 * addMinusMinute = Math
	 * .abs(Number($('.grandTotal').text().split(":")[1])); } MinsAddedValue =
	 * minstoSecs + addMinusMinute; }
	 * 
	 * finalVal = hoursAddedValue - MinsAddedValue; var hr; if(finalVal >= 0)
	 * var hr = Math.floor(finalVal / 60).toFixed(0); else var hr =
	 * Math.ceil(finalVal / 60).toFixed(0); var min = Math.abs((finalVal) % 60);
	 * 
	 * if (min < 10) { min = "0" + min; }
	 * 
	 * console.log("hrmm" + hr + "KK" + min);
	 * 
	 * if ($('.hoursFillTot').text() == "") { $(".negValuePrint").text("-" +
	 * $('.grandTotal').text()); } else if ($('.grandTotal').text() == "") {
	 * 
	 * $(".negValuePrint").text( $('.hoursFillHeadPrint').text().replace(".",
	 * ":")); } else if ($('.hoursFillTot').text() != undefined &&
	 * $('.hoursFillTot').text() != "" && $('.grandTotal').text() != undefined &&
	 * $('.grandTotal').text() != "") { $(".negValuePrint").text(hr + ":" +
	 * min); }
	 */

	hoursFillPrint();

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
	newTime = Number(newTime) + Number(24 * 60 * 60 * 1000 * 90);
	var splittedDate = formateDate($('#dateFrom').val(),
			$('#dateFrom').val().split('/').length).split('/');
	var splittedTwo = splittedDate[0] + splittedDate[1] + splittedDate[2];

	var EnteredDate = fromDate;

	var date = EnteredDate.substring(0, 2);
	var month = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);

	var myDate = new Date(year, month - 1, date);

	var futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 15);
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 2);

	if (fromDate == "") {
		showError('Please enter Date.');
		callFrom();
		flag = false;
	} else if (partsLen != 3 || date1Len != 10 || fromDate.split('/')[0] > 31
			|| fromDate.split('/')[1] > 12
			|| fromDate.split('/')[2].length != 4) {
		showError('Invalid Date.');
		callFrom();
		flag = false;
	} else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
			|| isNaN(splittedTwo)) {
 
		showError("Invalid Date Format");
		flag = false;
	} else if (yesterday > myDate) {

		showError('Please enter Date between yesterday and next 15 days.');
		callFrom();
		flag = false;
	} else if (futureDate < myDate) {
		showError('Please enter Date between yesterday and next 15 days.');
		callFrom();
		flag = false;
	} else {
		flag = true;
	}
	return flag;
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

function showContent() {
	/* $('.reportContent .tableInfo .tableTitle h4 strong').text(count); */
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('#breakLoadTable').removeClass('hideBlock');
	$('#errorBreakLoad .ContentTableWrapper .errorCon ').addClass("hideBlock");
	closeAccordian();
}
function hideContent() {

	$(
			'#reportContent,#reportContent .tableInfo ,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').addClass('hideBlock');
	$('.ContentTableWrapper .errorCon ').removeClass('hideBlock');
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#breakLoadTable").addClass('hideBlock');
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function callFrom() {
	setTimeout(function() {
		$('#dateFrom').focus();
	}, 200);
}
function callTo() {
	setTimeout(function() {
		$('#dateTo').focus();
	}, 200);
}

function convertTime() {
	$('.time').filter(
			function() {
				var temp = $(this).text().trim();
				/* var date = new Date(parseInt(temp.substr(6))); */

				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
					var newHour = today.getHours();
					var newMinu = today.getMinutes();
					if (newHour < 10) {
						newHour = '0' + newHour;
					}
					if (newMinu < 10) {
						newMinu = '0' + newMinu;
					}
					$(this).text((newHour + ":" + newMinu));

				}
			});

}

/*
 * function showmarkFilter() { var markHead = '<thead class="markFillterHdr ">' + '<tr class="filterRow"><td class="centerValue"><input
 * type="#" class="textbox markDept"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markPric"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markClea"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markStaf"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markLoya"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markProm"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markTota"></td>' + '</tr></thead>';
 * 
 * $(markHead).insertAfter('.sortTable thead:first'); bindFilter(); } function
 * hidemarkFillter() { $('.markFillterHdr').remove();
 * formMarkdownDetailsContent(prevRes, ''); }
 */
function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.paginationDiv').addClass('hideBlock');
}

function showAlert(msg) {
	$(".errorMsgDiv").addClass('hideBlock');
	$('#dialog-modal').dialog('open');
	$('#alertBox').text(msg);
}

function getArticlesForPage(pageNumber) {
	$('#statusImg').addClass('loading');
	$('#statusImg').removeClass('hideBlock');
	// $('#statusImg').addClass('statusWrapper');

	$('#pageNumber').val(pageNumber);
	$('#generateReport').attr('action', 'requestSearchForPagination.htm');
	$('#generateReport').submit();
}

function breakLoadFutureDays(data) {
	$.ajax({
		type : "get",
		url : "../breakLoadFuture/getNFLPBreakLoadFutureDays.htm",
		data : data,
		beforeSend : function() {
			// startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {

			prevRes = response;

			formBreakLoad(response);

			if (flagBreak == true && flagReport == true) {
				printResult(response);
			}

			// stopLoading();
			$.loader('close');
		},
		error : function(response) {
			showError('Technical issue occured.');
			// stopLoading();
			$.loader('close');
		},
	});
}
function breakLoad(data) {
	$.ajax({
		type : "get",
		url : "getNFLPBreakLoad.htm",
		data : data,
		beforeSend : function() {
			// startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {

			prevRes = response;

			formBreakLoad(response);

			if (flagBreak == true && flagReport == true) {
				printResult(response);
				printBulkOrderArticleData(response);
			}

			// stopLoading();
			$.loader('close');
		},
		error : function(response) {
			showError('Technical issue occured.');
			// stopLoading();
			$.loader('close');
		},
	});
}

function formBreakLoad(response) {

	var output = $.parseJSON(response);
	var breakLoad = output.breakLoadMap;
	var dropCart = output.dropCartonMap;
	/* var fillCartonMap = output.fillCartonMap; */
	var fillCartonMap = output.fillCartonMap;
	var presentationList = output.presentationList;
	var reportSummaryArticleList = output.bulkOrderArticleMap;
	var msg = output.msg;
	var content = '';
	var flag = true;
	var rubbishCartonList = output.rubbishCartonListAgg;
	var reportSummaryList = output.reportSummaryMap;
	
	var warehouseList=output.warehouseList;
	if($('#all').is(':checked')){
		if(warehouseList!=undefined && 	warehouseList!=null)
	{
		$("#warehouse").attr('disabled', false);
		formWarehouseTable(warehouseList);
	}
	}
	

	var noCartons = 0;
	var cartRate = 0;
	var noHours = 0;
	var noExcessCarton = 0;
	var noHoursForExcessCarton = 0;
	var deptName = '';
	var reportContent = '';

	var finalTotnoOfCartons = 0;
	var finalTotcartRate = 0;
	var finalTotnoHours = 0;

	var listRubbish = rubbishCartonList;
	var totLoad = 0;
	var totBulk = 0;
	var totPromotion = 0;
	var totCartFilled = 0;
	var totExcessCart = 0;

	var totalNoOfCartons = 0;
	var totalCartRate = 0;
	var totalNoOfHours = 0;
	var totalNoOfExcessCarton = 0;
	var totalNoOfHoursForExCart = 0;

	var totnoCartonDrop = 0;
	var totcartRateDrop = 0;
	var totnoOfHoursDrop = 0;

	var totnoCartonBreak = 0;
	var totcartRateBreak = 0;
	var totnoOfHoursBreak = 0;

	var sumNoOfCartons = 0;
	var sumCartonRate = 0;
	var sumNoOfHours = 0;

	var breaknoOfCartons = 0;
	var breakcartonRate = 0;
	var breaknoOfHours = 0;

	var rubbishNOOfCartons = 0;
	var rubbishCartRate = 0;
	var rubbishNoOfHours = 0;
	
	var totCartonOfLoadForecast = 0;
	var totBulkCarton = 0;
	var totNoOfPromoCartons = 0;
	var totcartonsToFiller = 0;
	var totNoOfExcessCartons = 0;

	var finalTotpresentHours = 0;
	var deptCnt=0;
	reportContent = '';

	if (reportSummaryList != null && reportSummaryList != ""
			&& jQuery.isEmptyObject(reportSummaryList.valueOf()) != true) {

		reportContent += '<tr><td class=" columnDivider" >&nbsp;</td>';
		for ( var m in reportSummaryList) {
			var listReport = reportSummaryList[m];

			/* for ( var i = 0; i < listReport.length; i++) { */
			reportContent += '<td class="numberColumn columnDivider "  >'
					+ '<strong>' + listReport[0].departmentName
					+ '</strong></td>';
			// }

		}
		reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>Total</strong></td></tr>';

		reportContent += '<tr><td class=" columnDivider keyInfo" >Cartons on Loads/Forecast:</td>';

		for ( var m in reportSummaryList) {
			deptCnt = deptCnt+1;
			var listReport = reportSummaryList[m];

			totCartonOfLoadForecast = 0;

			reportContent += '<td class="numberColumn columnDivider "  >';
			for ( var i = 0; i < listReport.length; i++) {

				totCartonOfLoadForecast = Number(totCartonOfLoadForecast)
						+ Number(listReport[i].totalCartonsOfLoadForecast);

			}
			reportContent += Number(totCartonOfLoadForecast) + '</td>';
			totLoad = Number(totLoad) + Number(totCartonOfLoadForecast);

		}
		cartonsTot=totLoad;
		reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>'
				+ totLoad + '</strong></td></tr>';
		if(!dateCheckFlag){
			reportContent += '<tr><td class=" columnDivider keyInfo" ><label class="linkBtn"> <span class="bulk plus" style="padding-left: 7px;padding-bottom: 1px;"><a class="bulk plus" href="#"></a></span><strong> Bulk Cartons:</strong> <label class="actionBtn" id="printBtn"	onclick="nightFillLabourPlanBulkReportPrint();" style="margin-top:0px!important;"><label	class="print">Print Bulk Orders</label></label>	</label> </td>';
		}else if(dateCheckFlag){
			reportContent += '<tr><td class=" columnDivider keyInfo" >Bulk Cartons:</td>';
		}
		

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn columnDivider "  >';
			var listReport = reportSummaryList[m];
			totBulkCarton = 0;

			for ( var i = 0; i < listReport.length; i++) {

				totBulkCarton = Number(totBulkCarton)
						+ Number(listReport[i].noOfBulkCartons);

			}
			reportContent += Number(totBulkCarton) + '</td>';
			totBulk = Number(totBulk) + Number(totBulkCarton);
		}

		reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>'
				+ totBulk + '</strong></td></tr>';

		//Child Rows : Bulk Order split
		if (!dateCheckFlag && reportSummaryArticleList != null && reportSummaryArticleList != ""
			&& jQuery.isEmptyObject(reportSummaryArticleList.valueOf()) != true) {
			for (var m in reportSummaryArticleList) {
			
			var listReport = reportSummaryArticleList[m];

				reportContent += '<tr class="bulkChild" ><td class=" columnDivider keyInfo" style="padding-left: 50px;">';
				reportContent += listReport.article+'-'+ listReport.articleDesc+ '</td>';
				if(3==3)
					{
					if (listReport.isDeptGroc && Number(listReport.articleGrocVal) != null && Number(listReport.articleGrocVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider ">' + Number(listReport.articleGrocVal)+ '</td>';
					}else if(listReport.isDeptGroc){
					reportContent += '<td class="numberColumn columnDivider ">0</td>';
					}
						
					if (listReport.isDeptPer && Number(listReport.articlePerVal) != null && Number(listReport.articlePerVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider ">' + Number(listReport.articlePerVal)+ '</td>';
					}else if(listReport.isDeptPer){
						reportContent += '<td class="numberColumn columnDivider ">0</td>';
						}
					if (listReport.isDeptGm && Number(listReport.articleGMVal) != null && Number(listReport.articleGMVal) != "0"){
					reportContent += '<td class="numberColumn columnDivider ">'+ Number(listReport.articleGMVal)+ '</td>';
					}else if(listReport.isDeptGm){
						reportContent += '<td class="numberColumn columnDivider ">0</td>';
						}
					if (Number(listReport.total) != null && Number(listReport.total) != "0"){
					reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>' + Number(listReport.total)+ '</strong></td></tr>';
					}else{
						reportContent += '<td class="numberColumn columnDivider ">0</td>';
						}
					}
				
			}
		}
		
		reportContent += '<tr><td class=" columnDivider keyInfo" >Promotional Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn columnDivider "  >';
			totNoOfPromoCartons = 0;

			var listReport = reportSummaryList[m];

			for ( var i = 0; i < listReport.length; i++) {

				totNoOfPromoCartons = Number(totNoOfPromoCartons)
						+ Number(listReport[i].noOfPromotionalCartons);

			}
			reportContent += Number(totNoOfPromoCartons) + '</td>';
			totPromotion = Number(totPromotion) + Number(totNoOfPromoCartons);
		}
		reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>'
				+ totPromotion + '</strong></td></tr>';

		/*reportContent += '<tr><td class=" columnDivider keyInfo" >JobBuy Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			totNoOfJobBuyCartons = 0;
			
			var listReport = reportSummaryList[m];

			for ( var i = 0; i < listReport.length; i++) {

				totNoOfJobBuyCartons = Number(totNoOfJobBuyCartons)
						+ Number(listReport[i].noOfJobBuysCartons);

			}
			reportContent += Number(totNoOfJobBuyCartons) + '</td>';
			totJobBuy = Number(totJobBuy) + Number(totNoOfJobBuyCartons);
		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totJobBuy + '</strong></td></tr>';
		
		
		reportContent += '<tr><td class=" columnDivider keyInfo" >Advert Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn rightValue columnDivider "  >';
			totNoOfAdvertCartons = 0;
			
			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {

				totNoOfAdvertCartons = Number(totNoOfAdvertCartons)
						+ Number(listReport[i].noOfAdvertCartons);

			}
			reportContent += Number(totNoOfAdvertCartons) + '</td>';
			totAdvert = Number(totAdvert) + Number(totNoOfAdvertCartons);
		}
		reportContent += '<td class="numberColumn rightValue columnDivider valueInfo lastColumn"><strong>'
				+ totAdvert + '</strong></td></tr>';*/
		
		reportContent += '<tr><td class=" columnDivider keyInfo" >Cartons to Fill:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn columnDivider  " >';
			totcartonsToFiller = 0;

			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {

				totcartonsToFiller = Number(totcartonsToFiller)
						+ Number(listReport[i].cartonsToBeFilled);

			}
			reportContent += Number(totcartonsToFiller) + '</td>';
			totCartFilled = Number(totCartFilled) + Number(totcartonsToFiller);
		}
		reportContent += '<td class="numberColumn columnDivider  lastColumn"><strong>'
				+ totCartFilled + '</strong></td></tr>';

		reportContent += '<tr><td class=" columnDivider keyInfo " >Excess Cartons:</td>';

		for ( var m in reportSummaryList) {
			reportContent += '<td class="numberColumn columnDivider " >';
			totNoOfExcessCartons = 0;
			var listReport = reportSummaryList[m];
			for ( var i = 0; i < listReport.length; i++) {

				if (listReport[i].noOfExcessCartons != null
						&& listReport[i].noOfExcessCartons != undefined
						&& listReport[i].noOfExcessCartons != "") {
					if (!isNaN(totNoOfExcessCartons))
				totNoOfExcessCartons = Number(totNoOfExcessCartons)
						+ Number(listReport[i].noOfExcessCartons);
				} else {
					totNoOfExcessCartons = "-";
				}

			}
			if (!isNaN(totNoOfExcessCartons)) {
			reportContent += Number(totNoOfExcessCartons) + '</td>';
			totExcessCart = Number(totExcessCart)
					+ Number(totNoOfExcessCartons);
			} else {
				reportContent += totNoOfExcessCartons + '</td>';
				totExcessCart = "-";
		}
		}
		reportContent += '<td class="numberColumn columnDivider valueInfo lastColumn"><strong>'
				+ totExcessCart + '</strong></td></tr>';

	} else if (jQuery.isEmptyObject(reportSummaryList.valueOf()) == true) {

		$('#reportSummaryTable tbody:first').html('');
		$('#reportSummaryTable tbody:first').append(reptSumErrorContent);

	}
	if (breakLoad != null && breakLoad != "") {

		totnoCartonBreak = 0;
		totcartRateBreak = 0;
		totnoOfHoursBreak = 0;

		content += '<tr>'
				+ '<td colspan="6" class="rowSection rowHighlight">Break Load (Sort and split)</td></tr>';
		for ( var m in breakLoad) {

			breaknoOfCartons = 0;
			breakcartonRate = 0;
			breaknoOfHours = 0;

			var list = breakLoad[m];
			for ( var i = 0; i < list.length; i++) {
				list[i].departmentName = (list[i].departmentName != null && list[i].departmentName != undefined) ? list[i].departmentName
						: '';
				list[i].noOfCartons = (list[i].noOfCartons != null && list[i].noOfCartons != undefined) ? list[i].noOfCartons
						: '';
				list[i].cartonRate = (list[i].cartonRate != null && list[i].cartonRate != undefined) ? list[i].cartonRate
						: '';
				list[i].noOfHours = (list[i].noOfHours != null && list[i].noOfHours != undefined) ? list[i].noOfHours
						: '';

				flag = false;

				if (list[i].noOfCartons != null
						&& list[i].cartonRate != undefined
						&& list[i].cartonRate != "")
					breaknoOfCartons = Number(breaknoOfCartons)
							+ Number(list[i].noOfCartons);
				else
					breaknoOfCartons = Number(breaknoOfCartons) + Number(0);

				if (list[i].cartonRate != null
						&& list[i].cartonRate != undefined
						&& list[i].cartonRate != "")
					breakcartonRate =  Number(list[0].cartonRate);
				else
					breakcartonRate = Number(breakcartonRate) + Number(0);
				if (list[i].noOfHours != null && list[i].noOfHours != undefined
						&& list[i].noOfHours != "")
					breaknoOfHours = Number(breaknoOfHours)
							+ sumupMin(Number(list[i].noOfHours).toFixed(3));
				else
					breaknoOfHours = Number(breaknoOfHours) + Number(0);
				
			

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(breaknoOfHours))) != 0) {
				aggCartRate = Number(breaknoOfCartons)
						/  (minToHour(hoursToMin(Number(breaknoOfHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}	
			console.log("sumup total---" + breaknoOfHours);
			content += '<tr id="' + i + '" class=" parentTr ';
			content += '"><td class="leftValue" >' + list[0].departmentName
					+ '</td><td class="rightValue" >'
					+ Number(breaknoOfCartons) + '</td>';

			content += '<!--<td class="rightValue" >'
					+ aggCartRate + '</td>-->'//SC-448
					+ '<td class="rightValue " >'
					+ hoursToMin(Number(breaknoOfHours).toFixed(3))
					+ '</td><td class="rightValue">'
					+ '</td><td class="rightValue lastColumn">' + '</td></tr>';

			totnoCartonBreak = Number(totnoCartonBreak)
					+ Number(breaknoOfCartons);

			totnoOfHoursBreak = Number(totnoOfHoursBreak)
					+ Number(breaknoOfHours);
		}
		if (minToHour(hoursToMin(Number(totnoOfHoursBreak))) != 0) {
			totcartRateBreak = Number(totnoCartonBreak)
					/  (minToHour(hoursToMin(Number(totnoOfHoursBreak))));
			totcartRateBreak = Number(totcartRateBreak).toFixed(2);
		} else {
			totcartRateBreak = "-";
		}
		content += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totnoCartonBreak + '</td>';

		content += '<!--<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totcartRateBreak
				+ '</td>-->'//SC-448
				+ '<td class="rightValue numberColumn columnDivider  valueInfo">'
				+ hoursToMin(totnoOfHoursBreak.toFixed(3))
				+ '</td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" ></td>'
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ '</td></tr>';
		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totnoCartonBreak); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totcartRateBreak);
		 */
		finalTotnoHours = Number(finalTotnoHours)
				+ Number(totnoOfHoursBreak.toFixed(3));
	}

	if (dropCart != null && dropCart != "") {

		totnoCartonDrop = 0;
		totcartRateDrop = 0;
		totnoOfHoursDrop = 0;
		content += '<tr>'
				+ '<td colspan="6" class="rowSection rowHighlight">Run Cartons on shop floor</td></tr>';
		for ( var m in dropCart) {

			sumNoOfCartons = 0;
			sumCartonRate = 0;
			sumNoOfHours = 0;
			var listDrop = dropCart[m];

			for ( var i = 0; i < listDrop.length; i++) {
				listDrop[i].departmentName = (listDrop[i].departmentName != null && listDrop[i].departmentName != undefined) ? listDrop[i].departmentName
						: '';
				listDrop[i].noOfCartons = (listDrop[i].noOfCartons != null && listDrop[i].noOfCartons != undefined) ? listDrop[i].noOfCartons
						: '';
				listDrop[i].cartonRate = (listDrop[i].cartonRate != null && listDrop[i].cartonRate != undefined) ? listDrop[i].cartonRate
						: '';
				listDrop[i].noOfHours = (listDrop[i].noOfHours != null && listDrop[i].noOfHours != undefined) ? listDrop[i].noOfHours
						: '';

				flag = false;

				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumNoOfCartons = Number(sumNoOfCartons)
							+ Number(listDrop[i].noOfCartons);
				else
					sumNoOfCartons = Number(sumNoOfCartons) + Number(0);
				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumCartonRate = Number(listDrop[0].cartonRate);
				else
					sumCartonRate = Number(sumCartonRate) + Number(0);
				if (listDrop[i].noOfCartons != null
						&& listDrop[i].noOfCartons != undefined
						&& listDrop[i].noOfCartons != "")
					sumNoOfHours = Number(sumNoOfHours)
							+ sumupMin(Number(listDrop[i].noOfHours).toFixed(3));
				else
					sumNoOfHours = Number(sumNoOfHours) + Number(0);

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(sumNoOfHours))) != 0) {
				aggCartRate = Number(sumNoOfCartons)
						/  (minToHour(hoursToMin(Number(sumNoOfHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}	
			content += '<tr id="' + i + '" class=" parentTr ';
			content += '"><td class="leftValue" >' + listDrop[0].departmentName
					+ '</td><td class="rightValue" >' + Number(sumNoOfCartons)
					+ '</td>';

			content += '<!--<td class="rightValue" >'
					+ aggCartRate + '</td>-->' //SC-448
					+ '<td class="rightValue " >'
					+ hoursToMin(Number(sumNoOfHours))
					+ '</td><td class="rightValue">'
					+ '</td><td class="rightValue lastColumn">' + '</td></tr>';

			totnoCartonDrop = Number(totnoCartonDrop) + Number(sumNoOfCartons);

			totnoOfHoursDrop = Number(totnoOfHoursDrop) + Number(sumNoOfHours);
		}
		if (minToHour(hoursToMin(Number(totnoOfHoursDrop))) != 0) {
			totcartRateDrop = Number(totnoCartonDrop)
					/  (minToHour(hoursToMin(Number(totnoOfHoursDrop))));
			totcartRateDrop = Number(totcartRateDrop).toFixed(2);
		} else {
			totcartRateBreak = "-";
		}
		
		content += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totnoCartonDrop + '</td>';

		content += '<!--<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totcartRateDrop
				+ '</td>-->'//SC-448
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ hoursToMin(totnoOfHoursDrop)
				+ '</td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" ></td>'
				+ '<td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ '</td></tr>';

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totnoCartonDrop); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totcartRateDrop);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(totnoOfHoursDrop);
	}

	if (fillCartonMap != null && fillCartonMap != "") {
		flag = false;
		totalNoOfCartons = 0;
		totalCartRate = 0;
		totalNoOfHours = 0;
		totalNoOfExcessCarton = 0;
		totalNoOfHoursForExCart = 0;
		content += '<tr>'
				+ '<td colspan="6" class="rowSection rowHighlight">Filling / Packing</td>'
				+ '</tr>';
		for ( var m in fillCartonMap) {

			noCartons = 0;
			cartRate = 0;
			noHours = 0;
			noExcessCarton = 0;
			noHoursForExcessCarton = 0;
			deptName = '';

			var listFillCarton = fillCartonMap[m];

			var myArr = [];

			flag = false;
			for ( var i = 0; i < listFillCarton.length; i++) {

				listFillCarton[i].departmentName = (listFillCarton[i].departmentName != null && listFillCarton[i].departmentName != undefined) ? listFillCarton[i].departmentName
						: '';
				listFillCarton[i].noOfCartons = (listFillCarton[i].noOfCartons != null && listFillCarton[i].noOfCartons != undefined) ? listFillCarton[i].noOfCartons
						: '';
				listFillCarton[i].cartonRate = (listFillCarton[i].cartonRate != null && listFillCarton[i].cartonRate != undefined) ? listFillCarton[i].cartonRate
						: '';
				listFillCarton[i].noOfHours = (listFillCarton[i].noOfHours != null && listFillCarton[i].noOfHours != undefined) ? listFillCarton[i].noOfHours
						: '';
				listFillCarton[i].noOfExcessCartons = (listFillCarton[i].noOfExcessCartons != null && listFillCarton[i].noOfExcessCartons != undefined) ? listFillCarton[i].noOfExcessCartons
						: '';
				listFillCarton[i].noOfHoursForExcessCartons = (listFillCarton[i].noOfHoursForExcessCartons != null && listFillCarton[i].noOfHoursForExcessCartons != undefined) ? listFillCarton[i].noOfHoursForExcessCartons
						: '';

				if (i == 0) {
					deptName += listFillCarton[i].departmentName;
				}
				if (i != 0) {
					deptName = deptName + ",&nbsp;"
							+ listFillCarton[i].departmentName;
				}
				myArr.push(listFillCarton[i].departmentName);

				if (listFillCarton[i].noOfCartons != null
						&& listFillCarton[i].noOfCartons != undefined
						&& listFillCarton[i].noOfCartons != "")
					noCartons = Number(noCartons)
							+ Number(listFillCarton[i].noOfCartons);
				else
					noCartons = Number(noCartons) + Number(0);
				if (listFillCarton[i].cartonRate != null
						&& listFillCarton[i].cartonRate != undefined
						&& listFillCarton[i].cartonRate != "")
					cartRate =  Number(listFillCarton[0].cartonRate);
				else
					cartRate = Number(cartRate) + Number(0);
				if (listFillCarton[i].noOfHours != null
						&& listFillCarton[i].noOfHours != undefined
						&& listFillCarton[i].noOfHours != "")
					noHours = Number(noHours)
							+ sumupMin(Number(listFillCarton[i].noOfHours)
									.toFixed(3));
				else
					noHours = Number(noHours) + Number(0);
				if (listFillCarton[i].noOfExcessCartons != null
						&& listFillCarton[i].noOfExcessCartons != undefined
						&& listFillCarton[i].noOfExcessCartons != "")
					noExcessCarton = Number(noExcessCarton)
							+ Number(listFillCarton[i].noOfExcessCartons);
				else
					noExcessCarton = Number(noExcessCarton) + Number(0);
				if (listFillCarton[i].noOfHoursForExcessCartons != null
						&& listFillCarton[i].noOfHoursForExcessCartons != undefined
						&& listFillCarton[i].noOfHoursForExcessCartons != "")
					noHoursForExcessCarton = Number(noHoursForExcessCarton)
							+ sumupMin(Number(
									listFillCarton[i].noOfHoursForExcessCartons)
									.toFixed(3));
				else
					noHoursForExcessCarton = Number(noHoursForExcessCarton)
							+ Number(0);

			}
			// Aggreagted carton rate
			if (minToHour(hoursToMin(Number(noHours))) != 0) {
				aggCartRate = Number(noCartons)
						/  (minToHour(hoursToMin(Number(noHours))));
				aggCartRate = Number(aggCartRate).toFixed(2);
			} else {
				aggCartRate = "-";
			}	
			var newArr = $.unique(myArr.sort()).sort();
			var result = "";
			for ( var i = 0; i < newArr.length; i++) {
				result += newArr[i] + ",";
			}
			result = result.slice(0, -1); // remove last comma

			if (dateCheckFlag == false) {
				
				if(m=='#')
				{
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="leftValue" ><strong>Unknown Location &nbsp;' 
							+ ':&nbsp;</strong>' + result + '&nbsp;</td>';
					content += '<td class="rightValue" >' + noCartons + '</td>';
	
					content += '<!--<td class="rightValue" >' + aggCartRate
							+ '</td>-->' //SC-448
							+ '<td class="rightValue " >'
							+ hoursToMin(Number(noHours))
							+ '</td><td class="rightValue">'
							+ Number(noExcessCarton)
							+ '</td><td class="rightValue lastColumn">'
							+ hoursToMin(Number(noHoursForExcessCarton))
							+ '</td></tr>';
				}
				else if(m!='#')	
				{
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="leftValue" ><strong>Aisle &nbsp;' + m
						+ ':&nbsp;</strong>' + result + '&nbsp;</td>';
					content += '<td class="rightValue" >' + noCartons + '</td>';
	
					content += '<!--<td class="rightValue" >' + aggCartRate
					+ '</td>-->' //SC-448
					+ '<td class="rightValue " >'
					+ hoursToMin(Number(noHours))
						+ '</td><td class="rightValue">'
						+ Number(noExcessCarton)
					+ '</td><td class="rightValue lastColumn">'
						+ hoursToMin(Number(noHoursForExcessCarton))
						+ '</td></tr>';
				
				}	

			totalNoOfCartons = Number(totalNoOfCartons) + noCartons;

			totalNoOfHours = Number(totalNoOfHours) + Number(noHours);
			totalNoOfExcessCarton = Number(totalNoOfExcessCarton)
			+ Number(noExcessCarton);
			totalNoOfHoursForExCart = Number(totalNoOfHoursForExCart)
					+ Number(noHoursForExcessCarton);
			} else if (dateCheckFlag == true) {
				content += '<tr id="' + i + '" class=" parentTr ';
				content += '"><td class="leftValue" >' + result + '&nbsp;</td>';

				content += '<td class="rightValue" >' + noCartons + '</td>';

				content += '<!--<td class="rightValue" >' + cartRate.toFixed(2)
						+ '</td>-->' //SC-448
						+ '<td class="rightValue " >'
						+ hoursToMin(Number(noHours))
						+ '</td><td class="rightValue">'
						+ '-</td><td class="rightValue lastColumn">'
						+ '-</td></tr>';

				totalNoOfCartons = Number(totalNoOfCartons) + noCartons;

				totalNoOfHours = Number(totalNoOfHours) + Number(noHours);

		}
			}
		if (minToHour(hoursToMin(Number(totalNoOfHours))) != 0) {
			totalCartRate = Number(totalNoOfCartons)
					/  (minToHour(hoursToMin(Number(totalNoOfHours))));
			totalCartRate = Number(totalCartRate).toFixed(2);
		} else {
			totalCartRate = "-";
		}
		content += '<tr><td class="numberColumn columnDivider leftValue valueInfo"><strong>Total</strong></td>'
				+ '<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totalNoOfCartons + '</td>';

		content += '<!--<td class="rightValue numberColumn columnDivider valueInfo" >'
				+ totalCartRate
				+ '</td>-->' //SC-448
				+ '<td class="rightValue  numberColumn columnDivider valueInfo" >'
				+ hoursToMin(Number(totalNoOfHours)) + '</td>';
		if (dateCheckFlag == false) {
			content += '<td class="rightValue numberColumn columnDivider valueInfo">'
				+ Number(totalNoOfExcessCarton)
				+ '</td><td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
				+ hoursToMin(totalNoOfHoursForExCart) + '</td></tr>';

		} else if (dateCheckFlag == true) {
			content += '<td class="rightValue numberColumn columnDivider valueInfo">'
					+ '-</td><td class="rightValue numberColumn columnDivider  valueInfo lastColumn">'
					+ '-</td></tr>';

		}

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(totalNoOfCartons); finalTotcartRate = Number(finalTotcartRate) +
		 * Number(totalCartRate);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(totalNoOfHours)+ Number(totalNoOfHoursForExCart);
	}

	if (rubbishCartonList != null && rubbishCartonList != "") {
		flag = false;
		//content += '<tr><td colspan="6" class="rowSection rowHighlight">Rubbish Removal</td></tr>';

		for ( var i = 0; i < listRubbish.length; i++) {
			listRubbish[i].departmentName = (listRubbish[i].departmentName != null && listRubbish[i].departmentName != undefined) ? listRubbish[i].departmentName
					: '';
			listRubbish[i].noOfCartons = (listRubbish[i].noOfCartons != null && listRubbish[i].noOfCartons != undefined) ? listRubbish[i].noOfCartons
					: '';
			listRubbish[i].cartonRate = (listRubbish[i].cartonRate != null && listRubbish[i].cartonRate != undefined) ? listRubbish[i].cartonRate
					: '';
			listRubbish[i].noOfHours = (listRubbish[i].noOfHours != null && listRubbish[i].noOfHours != undefined) ? listRubbish[i].noOfHours
					: '';

			flag = false;
			if (listRubbish[i].noOfCartons != null
					&& listRubbish[i].noOfCartons != undefined
					&& listRubbish[i].noOfCartons != "")
				rubbishNOOfCartons = Number(rubbishNOOfCartons)
						+ Number(listRubbish[i].noOfCartons);
			else
				rubbishNOOfCartons = Number(rubbishNOOfCartons) + Number(0);
			if (listRubbish[i].cartonRate != null
					&& listRubbish[i].cartonRate != undefined
					&& listRubbish[i].cartonRate != "")
				rubbishCartRate = Number(listRubbish[i].cartonRate);
			else
				rubbishCartRate = Number(rubbishCartRate) + Number(0);
			if (listRubbish[i].noOfHours != null
					&& listRubbish[i].noOfHours != undefined
					&& listRubbish[i].noOfHours != "")
				rubbishNoOfHours = Number(rubbishNoOfHours)
						+ sumupMin(Number(listRubbish[i].noOfHours).toFixed(3));
			else
				rubbishNoOfHours = Number(rubbishNoOfHours)
						+ Number(0).toFixed(3);
	}
		if (minToHour(hoursToMin(Number(rubbishNoOfHours))) != 0) {
			rubbishCartRate = Number(rubbishNOOfCartons)
					/  (minToHour(hoursToMin(Number(rubbishNoOfHours))));
			rubbishCartRate = Number(rubbishCartRate).toFixed(2);
		} else {
			rubbishCartRate = "-";
		}
		content += '<tr id="' + i + '" class=" parentTr ';
		content += '"><td class="rowSection rowHighlight leftValue valueInfo" >Rubbish Removal'
				+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >'
				+ Number(rubbishNOOfCartons) + '</td>';

		content += '<!--<td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >'
				+ rubbishCartRate
				+ '</td>-->' //SC-448
				+ '<td class="rowSection rowHighlight numberColumn columnDivider valueInfo " >'
				+ hoursToMin(Number(rubbishNoOfHours))
				+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo">'
				+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo lastColumn">'
				+ '</td></tr>';

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(rubbishNOOfCartons); finalTotcartRate =
		 * Number(finalTotcartRate) + Number(rubbishCartRate);
		 */
		finalTotnoHours = Number(finalTotnoHours) + Number(rubbishNoOfHours);
	}
	if (presentationList != null && presentationList != "") {
		flag = false;
		//content += '<tr><td colspan="6" class="rowSection rowHighlight">Major Fill Flat Stack</td></tr>';

		var listPresent = presentationList;
		var totDepartmentFlag = $('#GM').is(':checked') &&  $('#Groceries').is(':checked') &&  $('#Perishables').is(':checked') ? true : false;
		for ( var i = 0; i < listPresent.length; i++) {

			/*
			 * listRubbish[i].noOfCartons = (listRubbish[i].noOfCartons != null &&
			 * listRubbish[i].noOfCartons != undefined) ?
			 * listRubbish[i].noOfCartons : ''; listRubbish[i].cartonRate =
			 * (listRubbish[i].cartonRate != null && listRubbish[i].cartonRate !=
			 * undefined) ? listRubbish[i].cartonRate : '';
			 */
			
			//when grocery is unchecked major fill flat stack hours is set to zero			
			if( $('#Groceries').is(':checked')){	
				
				listPresent[i].presentationHours = (listPresent[i].presentationHours != null && listPresent[i].presentationHours != undefined) ? listPresent[i].presentationHours : '';
				} else{
					listPresent[i].presentationHours = 0.00;
				}

			flag = false;

			content += '<tr id="' + i + '" class=" parentTr ';
			
			//if all dept.checked display major fill flat stack hours chnaged to Total major fill flat stack hours 
			if(totDepartmentFlag){
				content += '"><td class="rowSection rowHighlight" >Total Major Fill Flat Stack'
						+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >'
						+ '</td>';
				} else {
					content += '"><td class="rowSection rowHighlight" >Major Fill Flat Stack'
						+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >'
						+ '</td>';
				}

			content += '<!--<td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >'

			+ '</td>-->' //SC-448
			 + '<td class="rowSection rowHighlight numberColumn columnDivider valueInfo" >';
			if (listPresent[i].presentationHours != null
					&& listPresent[i].presentationHours != undefined
					&& listPresent[i].presentationHours != "")
				content += hoursToMin(sumupMin(Number(
						listPresent[i].presentationHours).toFixed(3)));
			else
			//	content += Number(0).toFixed(3);
				content +=  hoursToMin(sumupMin(Number(0).toFixed(3)));
			content += '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo">'
					+ '</td><td class="rowSection rowHighlight numberColumn columnDivider valueInfo">'
					+ '</td></tr>';

			finalTotnoHours = Number(finalTotnoHours)
					+ sumupMin(Number(listPresent[i].presentationHours)
							.toFixed(3));

		}

		/*
		 * finalTotnoOfCartons = Number(finalTotnoOfCartons) +
		 * Number(rubbishNOOfCartons); finalTotcartRate =
		 * Number(finalTotcartRate) + Number(rubbishCartRate);
		 */

	}

	// ------
	/*
	 * $("#reportContent").removeClass('hideBlock'); content += '<tr>' + '<td class="rowSection rowHighlight">Total
	 * Night Fill Tasks</td>' + '<td class="rowSection numberColumn rowHighlight columnDivider">' +
	 * finalTotnoOfCartons.toFixed(0) + '</td>' + '<td class="rowSection numberColumn rowHighlight columnDivider">' +
	 * finalTotcartRate.toFixed(2) + '</td>' + '<td colspan="3" class="rowSection numberColumn rowHighlight columnDivider hoursFillTot">' +
	 * hoursToMin(finalTotnoHours.toFixed(3)) + '</td>' + '<td class="rowSection rowHighlight"></td>' + '<td class="rowSection rowHighlight">
	 * </td>' + '</tr>';
	 * 
	 * $('#breakLoadTable tbody:first').html(''); $('#breakLoadTable
	 * tbody:first').append(content);
	 * 
	 * $('#reportSummaryTable tbody:first').html(''); $('#reportSummaryTable
	 * tbody:first').append(reportContent);
	 */

	// ----
	if (rubbishCartonList == null && rubbishCartonList == ""
			&& breakLoad == null && breakLoad == "" && fillCartonMap == null
			&& fillCartonMap == "" && dropCart == null && dropCart == ""
			&& presentationList == null && presentationList == "") {
		$('#breakLoadTable tbody:first').html('');
		$('#breakLoadTable').addClass('hideBlock');
		$('#tabs-1 #errorBreakLoad').remove();
		$('#tabs-1 ').append(errorNonKrons);
		$('#tabs-1 .msgDiv h4').text(NDF);
		$('#tabs-1 .msgDiv ').addClass('nodataMessage');
		$('#tabs-1 .msgDiv ').removeClass('errorDiv');

		$("#hoursFillHead").text(Number(0));
		$("#grandTotalHead").text(Number(0));
		$("#negValue").text(Number(0));
		
		$("#warehouseSection").addClass('hideBlock');

	} else if (rubbishCartonList != null && rubbishCartonList != ""
			&& breakLoad != null && breakLoad != "" && fillCartonMap != null
			&& fillCartonMap != "" && dropCart != null && dropCart != ""
			&& presentationList != null && presentationList != ""
			&& jQuery.isEmptyObject(rubbishCartonList.valueOf()) != true
			&& jQuery.isEmptyObject(breakLoad.valueOf()) != true
			&& jQuery.isEmptyObject(fillCartonMap.valueOf()) != true
			&& jQuery.isEmptyObject(dropCart.valueOf()) != true
			&& jQuery.isEmptyObject(presentationList.valueOf()) != true) {
		$("#reportContent").removeClass('hideBlock');
		content += '<tr>'
				+ '<td class="rowSection rowHighlight">Total Night Fill Tasks (Including Excess Hours)</td>'
				/*
				 * + '<td class="rowSection numberColumn rowHighlight columnDivider">' +
				 * finalTotnoOfCartons.toFixed(0) + '</td>' + '<td class="rowSection numberColumn rowHighlight columnDivider">' +
				 * finalTotcartRate.toFixed(2) + '</td>'
				 */
				+ '<td colspan="2" class="rowSection numberColumn rowHighlight columnDivider hoursFillTot">' //SC-448
				+ hoursToMin(finalTotnoHours.toFixed(3)) + '</td>'
				+ '<td class="rowSection rowHighlight"></td>'
				+ '<td class="rowSection rowHighlight"> </td>' + '</tr>';

		$('#breakLoadTable tbody:first').html('');
		$('#breakLoadTable tbody:first').append(content);

		flagBreak = true;
		printFlagkron = true;

		showContent();
		if (reportSummaryList != null && reportSummaryList != ""
				&& jQuery.isEmptyObject(reportSummaryList.valueOf()) != true) {
			$('#reportSummaryTable tbody:first').html('');
			$('#reportSummaryTable tbody:first').append(reportContent);
			flagReport = true;
		} else if (reportSummaryList == null && reportSummaryList == ""
				&& jQuery.isEmptyObject(reportSummaryList.valueOf()) == true) {
			$('#reportSummaryTable tbody:first').html('');
			$('#reportSummaryTable tbody:first').append(reptSumErrorContent);
		}
	} else {
		$("#reportContent").removeClass('hideBlock');
		$('#breakLoadTable tbody:first').html('');
		$('#breakLoadTable').addClass('hideBlock');
		$('#tabs-1 #errorBreakLoad').remove();
		$('#tabs-1 ').append(errorNonKrons);
		$('#tabs-1 .msgDiv h4').text(NDF);
		$('#tabs-1 .msgDiv ').addClass('nodataMessage');
		$('#tabs-1 .msgDiv ').removeClass('errorDiv');
		$("#hoursFillHead").text(Number(0));
		$("#negValue").text(Number(0));
		$("#warehouseSection").addClass('hideBlock');
		if (reportSummaryList != null && reportSummaryList != ""
				&& jQuery.isEmptyObject(reportSummaryList.valueOf()) != true) {
			flagReport = true;
			$('#reportSummaryTable tbody:first').html('');
			$('#reportSummaryTable tbody:first').append(reportContent);
		} else if (reportSummaryList == null && reportSummaryList == ""
				& reportSummaryList == undefined
				&& jQuery.isEmptyObject(reportSummaryList.valueOf()) == true) {

			$('#reportSummaryTable tbody:first').html('');
			$('#reportSummaryTable tbody:first').append(reptSumErrorContent);

		}
	}
	// }

	hoursfill();
	hoursFillPrint();
	console.log(hoursToFill);
	console.log(cartonsTot);
	if(!isNaN(hoursToFill) && !isNaN(cartonsTot))
		cartonRateHead=Number(cartonsTot)/Number(minToHour(hoursToMin(finalTotnoHours.toFixed(3))));
	
	if(Number(hoursToFill)==0){
		cartonRateHead=0;
	}
	$("#cartonRateHead").text(Math.round(cartonRateHead.toFixed(2)));
	
	if ($('#breakLoadTable').hasClass('hideBlock')
			&& $('#reportSummaryTable tr').length == 0
			&& $('#kronosTable').hasClass('hideBlock')) {
		$('#printBtn').addClass('hideBlock');
	} else {
		$('#printBtn').removeClass('hideBlock');
	}
	$('.bulkChild').toggle();
	toggleBulkArticles();
}
function sumupMin(val) {

	var temp = val;
	var minsCal = 0;
	var minzro = 0;

	if (temp != "" && temp != undefined) {
		/*
		 * if(Number("0."+temp.split(".")[1]) < 0.100) { minsCal =
		 * (Number(temp.split(".")[0])*60)+Number(((Number("0."+temp.split(".")[1])/100)*60).toFixed(2).split(".")[1]); }
		 * else if(Number("0."+temp.split(".")[1]) > 0.100 ||
		 * Number("0."+temp.split(".")[1]) == 0.100) { minsCal =
		 * (Number(temp.split(".")[0])*60)+Number(temp.split(".")[1]); }
		 */

		minsCal = (Number(temp.split(".")[0]) * 60)
				+ Number(((Number("0." + temp.split(".")[1]) / 100) * 60)
						.toFixed(2).split(".")[1]);
		/*
		 * minsCal =
		 * (Number(temp.split(".")[0])*60)+Number(Number("0."+temp.split(".")[1])/100)*60;
		 */
		/* minsCal = (Number(temp.split(".")[0])*60)+Number(temp.split(".")[1]); */

		//console.log("minsCal------" + minsCal);
		/*
		 * realmin = minsCal % 60; hours = Math.floor(minsCal / 60);
		 * minsCal=Math.floor(minsCal); minsCal=Math.round(minsCal / 10);
		 * 
		 * if(minsCal<10) {minsCal = "0"+minsCal;}
		 */

			return minsCal;
	}
}
function hoursToMin(val) {
	var temp = val;
	var minsCal = 0;
	var hours = 0;
	var realmin = 0;

	if (temp != "" && temp != 0 && temp != undefined) {
		minsCal = temp;
		  realmin = minsCal % 60;
		  hours = Math.floor(minsCal / 60);
		/*
		 * minsCal=Math.floor(minsCal); minsCal=Math.round(minsCal / 10);
		 */

		if (realmin < 10) {
			realmin = "0" + realmin;
	}

		return hours + ":" + realmin;
	} else {
		return 0 + ":" + "00";
		}

}
function minToHour(val) {
	var temp = val;
	var minsCal = 0;
	var totHr = 0;

	if (temp != "" && temp != undefined) {

		minsCal = (Number(temp.split(":")[0]) * 60)
				+ (Number(temp.split(":")[1]));
		totHr=(minsCal/60).toFixed(5);
	
	}
	return totHr;
}
function hoursfill() {
	$("#hoursFillHead").text($('.hoursFillTot').text().replace(".", ":"));
	$("#grandTotalHead").text($('.grandTotal').text());
	
	hoursToFill=	$('.hoursFillTot').text().replace(":", ".");

	var hourstoMins = 0;
	var addMinus = 0;
	var hoursAddedValue = 0;
	var minstoSecs = 0;
	var addMinusMinute = 0;
	var MinsAddedValue = 0;
	var finalVal = 0;
	var minsCal = 0;

	/*
	 * if ($('.hoursFillTot').text() != "") { minsCal =
	 * (Number($('.hoursFillTot').text().split(".")[1])*60)/100;
	 * minsCal=Math.floor(minsCal); minsCal=Math.round(minsCal / 10);
	 * 
	 * if(minsCal<10) {minsCal = "0"+minsCal;} $("#hoursFillHead").text(
	 * Number($('.hoursFillTot').text().split(".")[0]) + ":" + minsCal); }
	 */

	if ($('.hoursFillTot').text() != ""
			&& $('.hoursFillTot').text() != undefined) {
		hourstoMins = Number($('#hoursFillHead').text().split(":")[0]) * 60;

		if (Number($('#hoursFillHead').text().split(".")[0]) < 0) {
			addMinus = Math
					.abs(Number($('#hoursFillHead').text().split(":")[1]));
		} else {
			addMinus = Math
					.abs(Number($('#hoursFillHead').text().split(":")[1]));
		}
		hoursAddedValue = hourstoMins + addMinus;
	}
	if ($('.grandTotal').text() != "" && $('.grandTotal').text() != undefined) {
		minstoSecs = Number($('.grandTotal').text().split(":")[0]) * 60;

		if (Number($('.grandTotal').text().split(".")[0]) < 0) {
			addMinusMinute = Math
					.abs(Number($('.grandTotal').text().split(":")[1]));
		} else {
			addMinusMinute = Math
					.abs(Number($('.grandTotal').text().split(":")[1]));
		}
		MinsAddedValue = minstoSecs + addMinusMinute;
	}

	finalVal = hoursAddedValue - MinsAddedValue;
	var hr;
	if (finalVal >= 0)
		   hr = Math.floor(finalVal / 60).toFixed(0);
		else
		hr = Math.ceil(finalVal / 60).toFixed(0);
	var min = Math.abs((finalVal) % 60);

	if (min < 10) {
		min = "0" + min;
	}

	if ($('.hoursFillTot').text() == "") {
		$("#negValue").text("-" + $('.grandTotal').text());
	} else if ($('.grandTotal').text() == "") {

		$("#negValue").text($('#hoursFillHead').text().replace(".", ":"));

	} else if ($('.hoursFillTot').text() != undefined
			&& $('.hoursFillTot').text() != ""
			&& $('.grandTotal').text() != undefined
			&& $('.grandTotal').text() != "") {
		$("#negValue").text(hr + ":" + min);
	}
	if(finalVal <0){
		document.getElementById("negValue").className = "negativeValue";
	}else if(finalVal >0){
		document.getElementById("negValue").className = "positiveValue";
	}else{
		document.getElementById("negValue").className = "";
		$("#negValue").text("");
	}
}

function hoursFillPrint() {
	$(".hoursFillHeadPrint").text($('.hoursFillTot').text().replace(".", ":"));
	$(".grandTotalHeadPrint").text($('.grandTotal').text());
	$(".plannedCartonRatePrint").text($('#cartonRateHead').text());
	var hourstoMins = 0;
	var addMinus = 0;
	var hoursAddedValue = 0;
	var minstoSecs = 0;
	var addMinusMinute = 0;
	var MinsAddedValue = 0;
	var finalVal = 0;
	var minsCal = 0;

	/*
	 * if ($('.hoursFillTot').text() != "") { minsCal =
	 * (Number($('.hoursFillTot').text().split(".")[1])*60)/100;
	 * minsCal=Math.floor(minsCal); minsCal = Math.round(minsCal / 10);
	 * 
	 * if(minsCal<10) {minsCal = "0"+minsCal;} $(".hoursFillHeadPrint").text(
	 * Number($('.hoursFillTot').text().split(".")[0]) + ":" + minsCal); }
	 */

	if ($('.hoursFillTot').text() != ""
			&& $('.hoursFillTot').text() != undefined) {
		hourstoMins = Number($('#hoursFillHead').text().split(":")[0]) * 60;

		if (Number($('#hoursFillHead').text().split(".")[0]) < 0) {
			addMinus = Math
					.abs(Number($('#hoursFillHead').text().split(":")[1]));
		} else {
			addMinus = Math
					.abs(Number($('#hoursFillHead').text().split(":")[1]));
		}
		hoursAddedValue = hourstoMins + addMinus;
	}
	if ($('.grandTotal').text() != "" && $('.grandTotal').text() != undefined) {
		minstoSecs = Number($('.grandTotal').text().split(":")[0]) * 60;

		if (Number($('.grandTotal').text().split(".")[0]) < 0) {
			addMinusMinute = Math
					.abs(Number($('.grandTotal').text().split(":")[1]));
		} else {
			addMinusMinute = Math
					.abs(Number($('.grandTotal').text().split(":")[1]));
		}
		MinsAddedValue = minstoSecs + addMinusMinute;
	}

	finalVal = hoursAddedValue - MinsAddedValue;
	var hr;
	if (finalVal >= 0)
	  hr = Math.floor(finalVal / 60).toFixed(0);
	else
	  hr = Math.ceil(finalVal / 60).toFixed(0);

	var min = Math.abs((finalVal) % 60);

	if (min < 10) {
		min = "0" + min;
	}

	if ($('.hoursFillTot').text() == "" && $('.grandTotal').text() != "") {
		$(".negValuePrint").text("-" + $('.grandTotal').text());
	} else if ($('.grandTotal').text() == "" && $('.hoursFillTot').text() != "") {

		$(".negValuePrint").text($('.hoursFillTot').text());

	} else if ($('.hoursFillTot').text() != undefined
			&& $('.hoursFillTot').text() != ""
			&& $('.grandTotal').text() != undefined
			&& $('.grandTotal').text() != "") {
		$(".negValuePrint").text(hr + ":" + min);
	}

}
function getNightFillLabourData(data) {
	// alert("getNightFillLabourData---nite.js");

	$
			.ajax({
				type : "get",
				url : "generateReport.htm",
				data : data,

				beforeSend : function() {
					fullScreenLoader();
					hideError();
				},
				success : function(responseKR) {
					formKRONOSContentKR(responseKR);

					if (dataFound)
						printReportKR(responseKR);
					if (printFlagkron != true) {

						$('#printbody')
								.html('')
								.append(printCombined)
								.append(
										'<link rel="stylesheet" href="../../styles/printstyle.css" />');

					}
					// $.loader('close');
				},
				error : function() {

					$('#kronosTable tbody:first').html('');
					$('#kronosTable').addClass('hideBlock');
					$('#tabs-2 #errorKronos').remove();
					$('#kronosTable tr').addClass('hideBlock');
					$('#errorKronos .ContentTableWrapper .errorCon')
							.removeClass('hideBlock');
					$('#tabs-2 ').append(errorKrons);
					$('#tabs-2 .msgDiv .tableTitle').removeClass('hideBlock');
					$('#tabs-2 .msgDiv h4')
							.text(
									'We are facing technical issues to retrieve KRONOS Rosters information, please try again later.');
					$('#tabs-2 .msgDiv ').removeClass('nodataMessage');
					$('#tabs-2 .msgDiv ').addClass('errorDiv');
					$('#tabs-2 .tableInfo .tableInfoError  .tableStart')
							.removeClass('hideBlock');

					// $.loader('close');
				},
			});

}

function formKRONOSContentKR(response) {
	expandedParents = [];
	var m = $.parseXML(response);
	var d = $(m);
	var array = d.find('array');
	var content = '';
	var parentContent = '';
	var childContent = '';
	// -----------------Added on 17-Mar
	var totalWorkingHoursTmp = '00:00';
	var hourTmp = '';
	var minTmp = '';
	var hrinInTmp = '';
	// -----------------Added on 17-Mar
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != ''
			&& $(array).find('record').length > 0) {
		dataFound = true;
		var list = $(array).find('record');
		/*var totalAdjustmentHours = Number(
				d.find('[name=adjustmentHours]').text()).toFixed(2);*/
		var totalAdjustmentHours =Number($('#workHourManager').val()).toFixed(2);
		// ---start-defect change 20-mar-2015

		totalAdjustmentHours = totalAdjustmentHours.toString();
		totalAdjustmentHours = totalAdjustmentHours.replace(
				totalAdjustmentHours.split('.')[1],
				(Number(totalAdjustmentHours.substring(totalAdjustmentHours
						.indexOf('.') + 1,
						totalAdjustmentHours.indexOf('.') + 3)) * 60) / 100);
		totalAdjustmentHours = Math.abs(totalAdjustmentHours).toFixed(2);

		// ---start-defect change 20-mar-2015
		var totalWorkingHours = 0.00;
		var prevParentEmpName = 'blank';
		var parentEmpName = '';
		var srtShift = 'srtShift';
		var endShift = 'endShift';
		var srtShiftTmp = '';
		var endShiftTmp = '';
		var prevSrtShiftTmp = '';
		var prevEndShiftTmp = '';

		var shiftStartTime = '';
		var shiftEndTime = '';

		var totalWorkingHr = '0:00';
		var workHrPrev = '';
		var workHrNext = '';
		var hour = '';
		var min = '';
		var nonWorkingHr = '0';
		var shiftStartTimeTmp = '';
		var shiftEndTimeTmp = '';
		// ////////alert("new.................");
		var childContentTmp = '';
		var x = '';

		var empName = '';
		var shiftStDt = '';
		var shiftStTm = '';
		var shiftEndDt = '';
		var shiftEndTm = '';
		var empStatus = '';
		var breakHr = '';
		var workHr = '';
		var jobName = '';
		var currentEmpDts = '';
		var prevEmpDts = '';

		for ( var i = 0; i < list.length; i++) {
			// for ( var i = 0; i < 8; i++) {
			parentEmpName = $(list[i]).find(":nth-child(1)").text();

			// --------gv--start
			empName = $(list[i]).find(":nth-child(1)").text();
			shiftStDt = $(list[i]).find(":nth-child(2)").text();
			shiftStTm = $(list[i]).find(":nth-child(3)").text();
			shiftEndDt = $(list[i]).find(":nth-child(4)").text();
			shiftEndTm = $(list[i]).find(":nth-child(6)").text();
			empStatus = $(list[i]).find(":nth-child(5)").text();
			breakHr = $(list[i]).find(":nth-child(7)").text();
			workHr = $(list[i]).find(":nth-child(8)").text();
			jobName = $(list[i]).find(":nth-child(9)").text();

			currentEmpDts = empName.toLowerCase() + shiftStDt.toLowerCase()
					+ shiftStTm.toLowerCase() + shiftEndDt.toLowerCase()
					+ shiftEndDt.toLowerCase() + shiftEndTm.toLowerCase()
					+ empStatus.toLowerCase() + breakHr.toLowerCase() + workHr
					+ jobName.toLowerCase();
			if (currentEmpDts != prevEmpDts) {
				// --------gv--end

				if (prevParentEmpName.toLowerCase() == parentEmpName
						.toLowerCase()) {
					workHrPrev = totalWorkingHr;
					workHrNext = $(list[i]).find(":nth-child(8)").text();

					hour = parseInt(workHrPrev.split(':')[0]);
					min = parseInt(workHrPrev.split(':')[1]);
					hour = hour + parseInt(workHrNext.split(':')[0]);
					min = min + parseInt(workHrNext.split(':')[1]);

					if (min > 59) {
						hrinIn = parseInt(min / 60);
						hour = hour + hrinIn;
						min = min - (60 * hrinIn);
					}
					hour = hour + '';
					min = min + '';

					if (hour.toString().length > 1) {
						hour = hour;
					} else {
						hour = '0' + hour;
					}
					if (min.toString().length > 1) {
						min = min;
					} else {
						min = '0' + min;
					}
					totalWorkingHr = hour + ':' + min
					nonWorkingHr = parseInt($(list[i]).find(":nth-child(7)")
							.text());

					var tmpHr1 = $(list[i]).find(":nth-child(3)").text();
					/*
					 * var hrTmp1 = tmpHr1.substring(0, 2); var minTmp1 =
					 * tmpHr1.substring(3, 5);
					 */
					var hrTmp1 = tmpHr1.split(":")[0];
					var minTmp1 = tmpHr1.split(":")[1];
					if (parseInt(hrTmp1) > 12) {
						tmpHr1 = (hrTmp1 - 12) + ':' + minTmp1 + " PM";
					} else if (parseInt(hrTmp1) == 12) {

						tmpHr1 = (hrTmp1) + ':' + minTmp1 + " PM";
					}

					else {
						if (hrTmp1 == '00')
							hrTmp1 = '12';
						tmpHr1 = (hrTmp1) + ':' + minTmp1 + " AM";
					}

					var tmpHr2 = $(list[i]).find(":nth-child(6)").text();
					var hrTmp2 = tmpHr2.split(":")[0];
					var minTmp2 = tmpHr2.split(":")[1];
					if (parseInt(tmpHr2) > 12) {
						tmpHr2 = (hrTmp2 - 12) + ':' + minTmp2 + " PM";
					} else if (parseInt(hrTmp2) == 12) {

						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " PM";
					} else {
						if (hrTmp2 == '00')
							hrTmp2 = '12';
						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " AM";
					}
					if (tmpHr1 == '0 AM')
						tmpHr1 = '12 AM';
					if (tmpHr1 == '0 PM')
						tmpHr1 = '12 PM';
					if (tmpHr2 == '0 AM')
						tmpHr2 = '12 AM';
					if (tmpHr2 == '0 PM')
						tmpHr2 = '12 PM';

					var childNonFill = $(list[i]).find(":nth-child(7)").text();
					if (childNonFill.trim().length == 4)
						childNonFill = "0" + childNonFill;

					// ----------make changes here-----
					childNonFill = childNonFill.toString();
					childNonFill = childNonFill.replace(
							childNonFill.split('.')[1],
							(Number(childNonFill.substring(childNonFill
									.indexOf('.') + 1, childNonFill
									.indexOf('.') + 3)) * 60) / 100);
					childNonFill = Math.abs(childNonFill).toFixed(2);

					var childWorkHr = $(list[i]).find(":nth-child(8)").text();
					if (childWorkHr.trim().length == 4)
						childWorkHr = "0" + childWorkHr;

					childContent = '<tr>' + '<td></td>' + '<td>'
							+ $(list[i]).find(":nth-child(9)").text() + '</td>'
							+ '<td>' + tmpHr1 + ' - ' + tmpHr2 + '</td>'
							+ '<td>' + childWorkHr + '</td>' + '<td>'
							+ childNonFill.replace(".", ":") + '</td>'

							+ '</tr>';
					childContentTmp = childContentTmp + childContent;
					// shiftEndTime=$(list[i]).find(":nth-child(4)").text()+ ''
					// +$(list[i]).find(":nth-child(6)").text();
					shiftEndTime = tmpHr2;
					shiftEndTimeTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();
					nonWorkingHr = prevNonWorkingHr
							+ parseInt($(list[i]).find(":nth-child(7)").text());
				} else {// start of parent loop inside for loop

					shiftStartTime = $(list[i]).find(":nth-child(2)").text()
							+ '####' + $(list[i]).find(":nth-child(3)").text()
							+ '*****';
					// totalWorkingHr=$(list[i]).find(":nth-child(8)").text();
					if (prevParentEmpName.toLowerCase() == 'blank') {
						parentContent = '';
						childContent = '';
						childContentTmp = '';
						shiftStartTimeTmp = $(list[i]).find(":nth-child(2)")
								.text()
								+ ' ' + $(list[i]).find(":nth-child(3)").text();
					} else {

						childContent = childContentTmp + '</td></tr></table>';
						childContentTmp = '';
						var shifhtStartEndTime = shiftEndTime;

						var ShiftTotalWorkingHr = calculate(shiftStartTimeTmp,
								shiftEndTimeTmp);
						var nonWorkingHrTmp = duration(ShiftTotalWorkingHr,
								totalWorkingHr);
						parentContent = parentContent.replace('tmpEndDtTm',
								shifhtStartEndTime);
						parentContent = parentContent.replace('totalWrkHrs',
								totalWorkingHr);
						// parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
						parentContent = parentContent.replace('nonWrkHrs',
								nonWorkingHrTmp);
						content = content + parentContent;
						content = content + childContent;
						parentContent = '';
						childContent = '';

						// -------------------------------------------------------17
						// mar

						hourTmp = parseInt(totalWorkingHoursTmp.split(':')[0]);
						minTmp = parseInt(totalWorkingHoursTmp.split(':')[1]);
						hrinInTmp = '';
						hourTmp = hourTmp
								+ parseInt(totalWorkingHr.split(':')[0]);
						minTmp = minTmp
								+ parseInt(totalWorkingHr.split(':')[1]);

						if (minTmp > 59) {
							hrinInTmp = parseInt(minTmp / 60);
							hourTmp = hourTmp + hrinInTmp;
							minTmp = minTmp - (60 * hrinInTmp);
						}
						hourTmp = hourTmp + '';
						minTmp = minTmp + '';
						// console.log(hourTmp.toString().length+'---'+minTmp.toString().length);
						if (hourTmp.toString().length > 1) {
							hourTmp = hourTmp;
						} else {
							hourTmp = '0' + hourTmp;
						}
						if (minTmp.toString().length > 1) {
							minTmp = minTmp;
						} else {
							minTmp = '0' + minTmp;
						}
						totalWorkingHoursTmp = hourTmp + ':' + minTmp;
						// console.log(totalWorkingHr+"-------"+totalWorkingHoursTmp);
						// -------------------------------------------------------17
						// mar
					}
					parentEmpName = $(list[i]).find(":nth-child(1)").text();

					nonWorkingHr = parseInt($(list[i]).find(":nth-child(7)")
							.text());

					workHrPrev = '0:00';
					workHrNext = $(list[i]).find(":nth-child(8)").text();

					hour = parseInt(workHrPrev.split(':')[0]);
					min = parseInt(workHrPrev.split(':')[1]);
					hour = hour + parseInt(workHrNext.split(':')[0]);
					min = min + parseInt(workHrNext.split(':')[1]);
					if (min > 59) {
						hrinIn = parseInt(min / 60)
						hour = hour + hrinIn;
						min = min - (60 * hrinIn);
					}
					hour = hour + '';
					min = min + '';
					if (hour.toString().length > 1) {
						hour = hour;
					} else {
						hour = '0' + hour;
					}
					if (min.toString().length > 1) {
						min = min;
					} else {
						min = '0' + min;
					}
					totalWorkingHr = hour + ':' + min;
					totalWorkingHours = totalWorkingHours + parseInt(hour);
					prevEndShiftTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();

					shiftStartTimeTmp = $(list[i]).find(":nth-child(2)").text()
							+ ' ' + $(list[i]).find(":nth-child(3)").text();
					var tmpHr1 = $(list[i]).find(":nth-child(3)").text();
					var hrTmp1 = tmpHr1.substring(0, 2);
					var minTmp1 = tmpHr1.substring(3, 5);
					if (parseInt(hrTmp1) > 12) {
						x = hrTmp1 - 12;
						if (x < 10 && x.toString().length < 2)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " PM";
					} else if (parseInt(hrTmp1) == 12) {

						tmpHr1 = (hrTmp1) + ':' + minTmp1 + " PM";
					} else {
						if (hrTmp1 == '00')
							hrTmp1 = '12';
						x = hrTmp1;
						if (x < 10 && x.toString().length < 2)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " AM";
					}

					var tmpHr2 = $(list[i]).find(":nth-child(6)").text();
					var hrTmp2 = tmpHr2.substring(0, 2);
					var minTmp2 = tmpHr2.substring(3, 5);
					if (parseInt(hrTmp2) > 12) {
						x = hrTmp2 - 12;
						if (x < 10 && x.toString().length < 2)
							x = "0" + x;
						tmpHr2 = x + ':' + minTmp2 + " PM";

						// tmpHr2 = (hrTmp2 - 12) + ':' + minTmp2 + " PM"
					}

					else if (parseInt(hrTmp2) == 12) {

						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " PM";
					} else {
						if (hrTmp2 == '00')
							hrTmp2 = '12'

						x = hrTmp2;
						if (x < 10 && x.toString().length < 2) {
							x = "0" + x;
						}
						tmpHr2 = x + ':' + minTmp2 + " AM";

						// tmpHr2 = (hrTmp2) + ':' + minTmp2 + " AM"
					}
					if (tmpHr1 == '0 AM')
						tmpHr1 = '12:'
								+ $(list[i]).find(":nth-child(3)").text()
								+ ' AM';
					if (tmpHr1 == '0 PM')
						tmpHr1 = '12:'
								+ $(list[i]).find(":nth-child(3)").text()
								+ ' PM';
					if (tmpHr2 == '0 AM')
						tmpHr2 = '12 AM';
					if (tmpHr2 == '0 PM')
						tmpHr2 = '12 PM';

					shiftEndTime = tmpHr2;
					var childNonFill = $(list[i]).find(":nth-child(7)").text();
					if (childNonFill.length == 4)
						childNonFill = "0" + childNonFill;
					// ----------make changes here
					childNonFill = childNonFill.toString();
					childNonFill = childNonFill.replace(
							childNonFill.split('.')[1],
							(Number(childNonFill.substring(childNonFill
									.indexOf('.') + 1, childNonFill
									.indexOf('.') + 3)) * 60) / 100);
					childNonFill = Math.abs(childNonFill).toFixed(2);

					var childWorkHr = $(list[i]).find(":nth-child(8)").text();
					if (childWorkHr.trim().length == 4)
						childWorkHr = "0" + childWorkHr;

					shiftEndTimeTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();
					parentContent = parentContent
							+ '<tr class="parentrow collapsed actionRows" id="'
							+ i
							+ '" onclick=showHide(this.id)><td width="20%"><span class="indenter plus" style="padding-left: 7px;padding-bottom: 1px;"><a class="indenter plus" href="#"></a></span>'
							+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
							+ '</td>'
							+ '<td width="20%">'
							+ $(list[i]).find(":nth-child(5)").text()// EMPLOYEE_status
							+ '</td>'
							+ '<td width="20%">'
							+ tmpHr1
							+ ' - '
							+ 'tmpEndDtTm'
							+ '</td>'
							+ '<td width="20%">'
							+ 'totalWrkHrs'
							+ '</td>'
							+ '<td width="20%" colspan="2">'
							+ 'nonWrkHrs'
							+ '</td>'
							// + '<td width="10%"></td>'
							+ '</tr>'
							+ '<tr class="childrow expanded" id="childrow_'
							+ i
							+ '"><td colspan="5" width="100%"><table width="100%"><tr>'// child

							+ '<td width="50%"></td>'
							+ '<th width="37%">Job Name</th>'
							+ '<th width="23%">Shift Time</th>'
							+ '<th width="5%">Work Hours</th>'
							+ '<th width="5%">Non Night Fill Hours</th>'
							+ '<tr>'

							+ '<tr>' + '<td></td>' + '<td>'
							+ $(list[i]).find(":nth-child(9)").text() + '</td>'
							+ '<td>' + tmpHr1 + ' - ' + tmpHr2 + '</td>'
							+ '<td>' + childWorkHr + '</td>' + '<td>'
							+ childNonFill.replace(".", ":") + '</td>'

							+ '</tr>';
					prevParentEmpName = parentEmpName;
					prevNonWorkingHr = nonWorkingHr;
				}// //End of parent loop inside for loop(if else)
			}// -------gv
			prevParentEmpName = parentEmpName;// --------gv
			prevEmpDts = currentEmpDts;
		}// //End of for loop
		var shifhtStartEndTime = shiftEndTime;
		var ShiftTotalWorkingHr = calculate(shiftStartTimeTmp, shiftEndTimeTmp);
		var nonWorkingHrTmp = duration(ShiftTotalWorkingHr, totalWorkingHr);
		parentContent = parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
		parentContent = parentContent.replace('totalWrkHrs', totalWorkingHr);
		// parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
		parentContent = parentContent.replace('nonWrkHrs', nonWorkingHrTmp);
		childContent = childContentTmp + '</td></tr></table>';
		content = content + parentContent;
		content = content + childContent;
		// //////////alert('2---'+content);

		// -------------------------------------------------------17 mar

		hourTmp = parseInt(totalWorkingHoursTmp.split(':')[0]);
		minTmp = parseInt(totalWorkingHoursTmp.split(':')[1]);
		hrinInTmp = '';
		hourTmp = hourTmp + parseInt(totalWorkingHr.split(':')[0]);
		minTmp = minTmp + parseInt(totalWorkingHr.split(':')[1]);

		if (minTmp > 59) {
			hrinInTmp = parseInt(minTmp / 60);
			hourTmp = hourTmp + hrinInTmp;
			minTmp = minTmp - (60 * hrinInTmp);
		}
		hourTmp = hourTmp + '';
		minTmp = minTmp + '';
		// console.log(hourTmp.toString().length+'---'+minTmp.toString().length);
		if (hourTmp.toString().length > 1) {
			hourTmp = hourTmp;
		} else {
			hourTmp = '0' + hourTmp;
		}
		if (minTmp.toString().length > 1) {
			minTmp = minTmp;
		} else {
			minTmp = '0' + minTmp;
		}
		console.log(totalWorkingHr + "-------" + totalWorkingHoursTmp);
		totalWorkingHoursTmp = hourTmp + ':' + minTmp;
		console.log(totalWorkingHr + "-------" + totalWorkingHoursTmp);
		// -------------------------------------------------------17 mar

		if (content != '') {
			// var grandTotal = totalWorkingHours - totalAdjustmentHours;
			var grandTotal = duration(totalWorkingHoursTmp,
					totalAdjustmentHours);
			content += '<tr><td colspan="4" class=""><strong>Total</strong></td><td class="numberColumn columnDivider">'
					+ '<strong>'
					// + Number(totalWorkingHours).toFixed(2)
					+ totalWorkingHoursTmp
					+ '</strong></td>'
					// +'<td colspan="2" class="lastColumn
					// blankCell">&nbsp;</td>'
					+ '</tr><tr>'
					+ '<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'
					+ '<td class="numberColumn columnDivider"><strong>-'
					+ totalAdjustmentHours.replace(".", ":")
					+ '</strong></td>'
					// +'<td colspan="2" class="lastColumn
					// blankCell">&nbsp;</td>'
					+ '</tr>'
					+ '<tr class="lastRow">'
					+ '<td colspan="4" class="valueInfo">Grand Total</td>'
					+ '<td class="numberColumn valueInfo columnDivider grandTotal">'
					// + Number(grandTotal).toFixed(2) + '</td>'
					+ grandTotal + '</td>'
					// +'<td colspan="2" class="lastColumn
					// blankCell">&nbsp;</td>'
					+ '</tr>';
			$('#kronosTable tbody').html('').html(content);
			// $('#reportContent').removeClass('hideBlock');
			$('#kronosTable').removeClass('hideBlock');
			$('#kronosTable tr').removeClass('hideBlock');
			$('.childrow').addClass('hideBlock');
			$('#tabs-2 .msgDiv ').removeClass('nodataMessage');
		}

	} else {
		// error
		if (array != '' && array != undefined && array != null) {
			// showError('No data found');
			$('#kronosTable tbody:first').html('');
			$('#kronosTable').addClass('hideBlock');
			$('#tabs-2 #errorKronos').remove();
			$('#kronosTable tr').addClass('hideBlock');
			$('#errorKronos .ContentTableWrapper .errorCon').removeClass(
					'hideBlock');
			$('#tabs-2 ').append(errorKrons);
			$('#tabs-2 #errorMsgDiv .tableTitle').removeClass('hideBlock');
			$('#tabs-2 .msgDiv ').removeClass('hideBlock');
			$('#tabs-2 .msgDiv h4').text(NDF);
			$('#tabs-2 .msgDiv ').addClass('nodataMessage');
			/*
			 * $('#reportContent,#reportContent .tableInfo ,#reportContent
			 * .tableInfo .tableActionBtns,.ContentTable.actionRows')
			 * .removeClass('hideBlock');
			 */
			$('#tabs-2 .msgDiv ').removeClass('errorDiv');
			$('#tabs-2 .tableInfo .tableInfoError  .tableStart').removeClass(
					'hideBlock');

		} else if (response != '') {
			$('#kronosTable tbody:first').html('');
			$('#kronosTable').addClass('hideBlock');
			$('#kronosTable tr').addClass('hideBlock');
			$('#errorKronos .ContentTableWrapper .errorCon').removeClass(
					'hideBlock');
			$('#tabs-2 #errorKronos').remove();
			$('#tabs-2 #errorMsgDiv .tableTitle').removeClass('hideBlock');
			$('#tabs-2 ').append(errorKrons);
			$('#tabs-2 .msgDiv ').removeClass('hideBlock');
			/*
			 * $('#reportContent,#reportContent .tableInfo ,#reportContent
			 * .tableInfo .tableActionBtns,.ContentTable.actionRows')
			 * .removeClass('hideBlock');
			 */
			$('#tabs-2 .msgDiv h4')
					.text(
							'We are facing technical issues to retrieve KRONOS Rosters information, please try again later.');
			$('#tabs-2 .msgDiv ').removeClass('nodataMessage');
			$('#tabs-2 .msgDiv ').addClass('errorDiv');
			$('#tabs-2 .tableInfo .tableInfoError  .tableStart').removeClass(
					'hideBlock');

		} else {
			$('#kronosTable tbody:first').html('');
			$('#kronosTable').addClass('hideBlock');
			$('#kronosTable tr').addClass('hideBlock');
			$('#tabs-2 #errorKronos').remove();
			$('#errorKronos .ContentTableWrapper .errorCon').removeClass(
					'hideBlock');
			$('#tabs-2 ').append(errorKrons);
			$('#tabs-2 #errorMsgDiv .tableTitle').removeClass('hideBlock');
			$('#tabs-2 .msgDiv h4').text(NDF);
			$('#tabs-2 .msgDiv ').addClass('nodataMessage');
			$('#tabs-2 .tableInfo .tableInfoError  .tableStart').removeClass(
					'hideBlock');
			$('#tabs-2 .msgDiv ').removeClass('hideBlock');
			$('#tabs-2 .msgDiv ').removeClass('errorDiv');
		}
	}

}

function printReportKR(response) {
	// alert("printReportKR...");
	dataFound = false;
	var m = $.parseXML(response);
	var d = $(m);/**/
	var array = d.find('array');

	var printContent = '';
	var printKRONOSContent = '';
	var empName = '';
	var shiftStDt = '';
	var shiftStTm = '';
	var shiftEndDt = '';
	var shiftEndTm = '';
	var empStatus = '';
	var breakHr = '';
	var workHr = '';
	var jobName = '';
	var currentEmpDts = '';
	var prevEmpDts = '';
	printCombined = '';
	var printTableHeadKRONOS = '<thead>'
			+ '<tr>		'
			+ '<th colspan="5" class="centerValue columnDivider" width="67%">Night Fill Team</th>'
			+ '<!-- <th rowspan="2" class="centerValue columnDivider blankCell" width="6%">&nbsp;</th> -->'
			+ '<!-- <th colspan="2" class="centerValue"  width="27%">Suggested Available Staff</th>-->'
			+ '</tr>'
			+ '<tr class="subHeader">'
			+ '<th width="20%">Employee</th>'
			+ '<th width="20%">Employee Status</th>'
			+ '<th class="" width="20%" >Shift Time</th>'
			+ '<th class="leftValue" width="20%" >Hours in Kronos</th>'
			+ '<th class="numberColumn rightValue" colspan="2" width="20%" >Non Night Fill Hours</th>'
			// + '<th class="numberColumn columnDivider rightValue"></th>'
			+ '<!-- <th>Employee</th>'
			+ '<th class="centerValue lastColumn">Time</th> -->' + '</tr>'
			+ '</thead>' + '<tbody>';

	var printHeadKron = '<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block"><span class="reportTitleType"></span>Night Fill Labour Plan</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><!--<label class="">Created on: </label><label class="currentDate"></label>--> </div></div><div class="width100 border">'
		    + '<div class="width70 margin5">Report for:  KRONOS Rosters '
		    + '<label class="separator">|</label><label class="">  Date: </label><label class="fromDatePrint" id=""></label>'
			+ '<label class="separator">|</label><label class="">Hours needed to fill: </label><label class="hoursFillHeadPrint"></label>'
			+ '<label class="separator">|</label><label class="">Hours in Kronos: </label><label class="grandTotalHeadPrint"></label>'
			+ '<label class="separator">|</label><label class=" negValuePrint"></label>'
			+ '<label class="separator">|</label><label class="">Planned Carton Rate: </label><label class="plannedCartonRatePrint"></label>'			
			+ '</div></div><table cellspacing="0"  class="  KRONOSactionRowPrint  printTable actionRowPrint NFTable" id="">';

	var printFootKRONOS = '<div style="height: 30px !important" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div>'
			+ '<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

	var n = 0;
	// -----------------Added on 17-Mar
	var totalWorkingHoursTmp = '00:00';
	var hourTmp = '';
	var minTmp = '';
	var hrinInTmp = '';
	// -----------------Added on 17-Mar
	if (array != null && array != '' && array != undefined
			&& $(array).find('record') != undefined
			&& $(array).find('record') != ''
			&& $(array).find('record').length > 0) {
		var list = $(array).find('record');
		// var totalAdjustmentHours = d.find('[name=adjustmentHours]').text();
		/*var totalAdjustmentHours = Number(
				d.find('[name=adjustmentHours]').text()).toFixed(2);*/
		
		var totalAdjustmentHours =Number($('#workHourManager').val()).toFixed(2);
		totalAdjustmentHours = totalAdjustmentHours.toString();
		totalAdjustmentHours = totalAdjustmentHours.replace(
				totalAdjustmentHours.split('.')[1],
				(Number(totalAdjustmentHours.substring(totalAdjustmentHours
						.indexOf('.') + 1,
						totalAdjustmentHours.indexOf('.') + 3)) * 60) / 100);
		totalAdjustmentHours = Math.abs(totalAdjustmentHours).toFixed(2);
		var content = '';
		var totalWorkingHours = 0.00;
		var prevParentEmpName = 'blank';
		var parentEmpName = '';
		var srtShift = 'srtShift';
		var endShift = 'endShift';
		var srtShiftTmp = '';
		var endShiftTmp = '';
		var prevSrtShiftTmp = '';
		var prevEndShiftTmp = '';

		var shiftStartTime = '';
		var shiftEndTime = '';

		var totalWorkingHr = '0:00';
		var workHrPrev = '';
		var workHrNext = '';
		var hour = '';
		var min = '';
		var nonWorkingHr = '0';
		var shiftStartTimeTmp = '';
		var shiftEndTimeTmp = '';
		var childContentTmp = '';
		for ( var i = 0; i < list.length; i++) {

			parentEmpName = $(list[i]).find(":nth-child(1)").text();
			empName = $(list[i]).find(":nth-child(1)").text();
			shiftStDt = $(list[i]).find(":nth-child(2)").text();
			shiftStTm = $(list[i]).find(":nth-child(3)").text();
			shiftEndDt = $(list[i]).find(":nth-child(4)").text();
			shiftEndTm = $(list[i]).find(":nth-child(6)").text();
			empStatus = $(list[i]).find(":nth-child(5)").text();
			breakHr = $(list[i]).find(":nth-child(7)").text();
			workHr = $(list[i]).find(":nth-child(8)").text();
			jobName = $(list[i]).find(":nth-child(9)").text();

			currentEmpDts = empName.toLowerCase() + shiftStDt.toLowerCase()
					+ shiftStTm.toLowerCase() + shiftEndDt.toLowerCase()
					+ shiftEndDt.toLowerCase() + shiftEndTm.toLowerCase()
					+ empStatus.toLowerCase() + breakHr.toLowerCase() + workHr
					+ jobName.toLowerCase();
			if (currentEmpDts != prevEmpDts) {
				// start of child loop inside for loop
				if (prevParentEmpName.toLowerCase() == parentEmpName
						.toLowerCase()) {
					workHrPrev = totalWorkingHr;
					workHrNext = $(list[i]).find(":nth-child(8)").text();

					hour = parseInt(workHrPrev.split(':')[0]);
					min = parseInt(workHrPrev.split(':')[1]);
					hour = hour + parseInt(workHrNext.split(':')[0]);
					min = min + parseInt(workHrNext.split(':')[1]);

					if (min > 59) {
						hrinIn = parseInt(min / 60);
						hour = hour + hrinIn;
						min = min - (60 * hrinIn);
					}
					hour = hour + '';
					min = min + '';
					if (hour.toString().length > 1) {
						hour = hour;
					} else {
						hour = '0' + hour;
					}
					if (min.toString().length > 1) {
						min = min;
					} else {
						min = '0' + min
					}
					totalWorkingHr = hour + ':' + min
					nonWorkingHr = parseInt($(list[i]).find(":nth-child(7)")
							.text());

					var tmpHr1 = $(list[i]).find(":nth-child(3)").text();
					var hrTmp1 = tmpHr1.substring(0, 2);
					var minTmp1 = tmpHr1.substring(3, 5);
					if (parseInt(hrTmp1) > 12) {

						x = hrTmp1 - 12;
						if (x < 10)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " PM";
					} else if (parseInt(hrTmp1) == 12) {

						tmpHr1 = (hrTmp1) + ':' + minTmp1 + " PM";
					} else {
						if (hrTmp1 == '00')
							hrTmp1 = '12';

						x = hrTmp1;
						if (x < 10)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " AM";
					}

					var tmpHr2 = $(list[i]).find(":nth-child(6)").text();
					var hrTmp2 = tmpHr2.substring(0, 2);
					var minTmp2 = tmpHr2.substring(3, 5);
					if (parseInt(tmpHr2) > 12) {
						tmpHr2 = (hrTmp2 - 12) + ':' + minTmp2 + " PM";
					} else if (parseInt(hrTmp2) == 12) {

						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " PM";
					} else {
						if (hrTmp2 == '00')
							hrTmp2 = '12';
						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " AM";
					}
					if (tmpHr1 == '0 AM')
						tmpHr1 = '12 AM';
					if (tmpHr1 == '0 PM')
						tmpHr1 = '12 PM';
					if (tmpHr2 == '0 AM')
						tmpHr2 = '12 AM';
					if (tmpHr2 == '0 PM')
						tmpHr2 = '12 PM';

					var nonWrHr = $(list[i]).find(":nth-child(7)").text();
					if (nonWrHr.trim().length == 4)
						nonWrHr = "0" + nonWrHr;

					nonWrHr = nonWrHr.toString();
					nonWrHr = nonWrHr.replace(nonWrHr.split('.')[1],
							(Number(nonWrHr.substring(nonWrHr.indexOf('.') + 1,
									nonWrHr.indexOf('.') + 3)) * 60) / 100);
					nonWrHr = Math.abs(nonWrHr).toFixed(2);

					var childWorkHr = $(list[i]).find(":nth-child(8)").text();
					if (childWorkHr.trim().length == 4)
						childWorkHr = "0" + childWorkHr;

					/*childContent = '<tr id=' + i + "  " + (n++) + ' >'
							+ '<td></td>' + '<td>'
							+ $(list[i]).find(":nth-child(9)").text() + '</td>'
							+ '<td>' + tmpHr1 + ' - ' + tmpHr2 + '</td>'
							+ '<td>' + childWorkHr + '</td>' + '<td>'
							+ nonWrHr.replace(".", ":") + '</td>'

							+ '</tr>';*/
					
					var s = n;
					if (n % 16 == 0) {

						content += '</tbody></table>' + printFoot
								+ printHeadKron;

					}
					if ((n - 1) != 16 && (n - 1) != 15) {
						if (n % 17 == 0) {
							content += '</tbody></table>' + printFoot
									+ printHeadKron;
						}
					}
					if ((n - 1) != 18 && (n - 1) != 17) {
						if (n % 19 == 0)

						{
							content += '</tbody></table>' + printFoot
									+ printHeadKron;
						}
					}

					childContentTmp = childContentTmp + childContent;
					/*
					 * if(i%11==0 && i != (list.length)-1 && i!=0)
					 * childContentTmp+='</tbody></table>'+printFoot+printHeadKron;
					 */
					shiftEndTime = tmpHr2
					shiftEndTimeTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();

					nonWorkingHr = prevNonWorkingHr
							+ parseInt($(list[i]).find(":nth-child(7)").text());

				} else {

					// start of parent loop inside for loop
					shiftStartTime = $(list[i]).find(":nth-child(2)").text()
							+ '####' + $(list[i]).find(":nth-child(3)").text()
							+ '*****';
					if (prevParentEmpName.toLowerCase() == 'blank') {
						parentContent = '';
						childContent = '';
						childContentTmp = '';

						shiftStartTimeTmp = $(list[i]).find(":nth-child(2)")
								.text()
								+ ' ' + $(list[i]).find(":nth-child(3)").text()
					} else {

						// ---childContent = childContentTmp
						// +'</td></tr></table>';
						childContent = childContentTmp;
						childContentTmp = '';
						var shifhtStartEndTime = shiftEndTime;

						var ShiftTotalWorkingHr = calculate(shiftStartTimeTmp,
								shiftEndTimeTmp);

						var nonWorkingHrTmp = duration(ShiftTotalWorkingHr,
								totalWorkingHr);

						parentContent = parentContent.replace('tmpEndDtTm',
								shifhtStartEndTime);
						parentContent = parentContent.replace('totalWrkHrs',
								totalWorkingHr);

						parentContent = parentContent.replace('nonWrkHrs',
								nonWorkingHrTmp);
						content = content + parentContent;
						//content = content + childContent;// /appending One
															// parent and
															// Child...

						parentContent = '';
						childContent = '';

						// -------------------------------------------------------17
						// mar

						hourTmp = parseInt(totalWorkingHoursTmp.split(':')[0]);
						minTmp = parseInt(totalWorkingHoursTmp.split(':')[1]);
						hrinInTmp = '';
						hourTmp = hourTmp
								+ parseInt(totalWorkingHr.split(':')[0]);
						minTmp = minTmp
								+ parseInt(totalWorkingHr.split(':')[1]);

						if (minTmp > 59) {
							hrinInTmp = parseInt(minTmp / 60);
							hourTmp = hourTmp + hrinInTmp;
							minTmp = minTmp - (60 * hrinInTmp);
						}
						hourTmp = hourTmp + '';
						minTmp = minTmp + '';
						// console.log(hourTmp.toString().length+'---'+minTmp.toString().length);
						if (hourTmp.toString().length > 1) {
							hourTmp = hourTmp;
						} else {
							hourTmp = '0' + hourTmp;
						}
						if (minTmp.toString().length > 1) {
							minTmp = minTmp;
						} else {
							minTmp = '0' + minTmp;
						}
						totalWorkingHoursTmp = hourTmp + ':' + minTmp;
						// console.log(totalWorkingHr+"-------"+totalWorkingHoursTmp);
						// -------------------------------------------------------17
						// mar
					}
					parentEmpName = $(list[i]).find(":nth-child(1)").text();

					nonWorkingHr = parseInt($(list[i]).find(":nth-child(7)")
							.text());

					workHrPrev = '0:00';
					workHrNext = $(list[i]).find(":nth-child(8)").text();

					hour = parseInt(workHrPrev.split(':')[0]);
					min = parseInt(workHrPrev.split(':')[1]);
					hour = hour + parseInt(workHrNext.split(':')[0]);
					min = min + parseInt(workHrNext.split(':')[1]);
					if (min > 59) {
						hrinIn = parseInt(min / 60);
						hour = hour + hrinIn;
						min = min - (60 * hrinIn);
					}
					hour = hour + '';
					min = min + '';
					if (hour.toString().length > 1) {
						hour = hour;
					} else {
						hour = '0' + hour;
					}
					if (min.toString().length > 1) {
						min = min;
					} else {
						min =  '0' + min;
					}
					totalWorkingHr = hour + ':' + min;
					totalWorkingHours = totalWorkingHours + parseInt(hour);
					prevEndShiftTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();

					shiftStartTimeTmp = $(list[i]).find(":nth-child(2)").text()
							+ ' ' + $(list[i]).find(":nth-child(3)").text();

					var tmpHr1 = $(list[i]).find(":nth-child(3)").text();
					var hrTmp1 = tmpHr1.substring(0, 2);
					var minTmp1 = tmpHr1.substring(3, 5);
					if (parseInt(hrTmp1) > 12) {

						x = hrTmp1 - 12;
						if (x < 10)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " PM";
					} else if (parseInt(hrTmp1) == 12) {

						tmpHr1 = (hrTmp1) + ':' + minTmp1 + " PM";
					} else {
						if (hrTmp1 == '00')
							hrTmp1 = '12';

						x = hrTmp1;
						if (x < 10)
							x = "0" + x;

						tmpHr1 = x + ':' + minTmp1 + " AM";
					}

					var tmpHr2 = $(list[i]).find(":nth-child(6)").text();
					var hrTmp2 = tmpHr2.substring(0, 2);
					var minTmp2 = tmpHr2.substring(3, 5);
					if (parseInt(tmpHr2) > 12) {
						tmpHr2 = (hrTmp2 - 12) + ':' + minTmp2 + " PM";
					}

					else if (parseInt(hrTmp2) == 12) {

						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " PM";
					} else {
						if (hrTmp2 == '00')
							hrTmp2 = '12';
						tmpHr2 = (hrTmp2) + ':' + minTmp2 + " AM";
					}

					if (tmpHr1 == '0 AM')
						tmpHr1 = '12:'
								+ $(list[i]).find(":nth-child(3)").text()
								+ ' AM';
					if (tmpHr1 == '0 PM')
						tmpHr1 = '12:'
								+ $(list[i]).find(":nth-child(3)").text()
								+ ' PM';
					if (tmpHr2 == '0 AM')
						tmpHr2 = '12 AM';
					if (tmpHr2 == '0 PM')
						tmpHr2 = '12 PM';

					shiftEndTime = tmpHr2;

					var nonWrHr = $(list[i]).find(":nth-child(7)").text();
					if (nonWrHr.trim().length == 4)
						nonWrHr = "0" + nonWrHr;

					shiftEndTimeTmp = $(list[i]).find(":nth-child(4)").text()
							+ ' ' + $(list[i]).find(":nth-child(6)").text();

					var nonWrHr = $(list[i]).find(":nth-child(7)").text();
					if (nonWrHr.trim().length == 4)
						nonWrHr = "0" + nonWrHr;

					nonWrHr = nonWrHr.toString();
					nonWrHr = nonWrHr.replace(nonWrHr.split('.')[1],
							(Number(nonWrHr.substring(nonWrHr.indexOf('.') + 1,
									nonWrHr.indexOf('.') + 3)) * 60) / 100);
					nonWrHr = Math.abs(nonWrHr).toFixed(2);
					var childWorkHr = $(list[i]).find(":nth-child(8)").text();
					if (childWorkHr.trim().length == 4)
						childWorkHr = "0" + childWorkHr;

					parentContent = parentContent
							+ '<tr class="parentrow collapsed" id="' + i + "  "
							+ (n++) + '" ' + '><td width="20%">'
							+ $(list[i]).find(":nth-child(1)").text()// EMPLOYEE_NAME
							+ '</td>'
							+'<td width="20%">'
							+ $(list[i]).find(":nth-child(5)").text()// EMPLOYEE_STATUS
							+ '</td>'
							+ '<td width="20%">'
							// +$(list[i]).find(":nth-child(2)").text()+'
							// '+$(list[i]).find(":nth-child(3)").text()+'
							// '+'tmpEndDtTm'
							+ tmpHr1 + ' - ' + 'tmpEndDtTm' + '</td>'
							+ '<td width="20%">' + 'totalWrkHrs' + '</td>'
							+ '<td width="20%" colspan="2">' + 'nonWrkHrs'
							+ '</td>'
							// + '<td width="10%"></td>'
							+ '</tr>';
						/*	+ '<tr class="childrow collapsed" id="childrow_'
							+ i + "  " + (n++) + '">';

					// ---+'<td colspan="5" width="100%"><table width="100%"><tr
					// '
					// --- +' >'// child
					parentContent = parentContent + '<th width="26%"></th>'
							+ '<th width="31.8%">Job Name</th>'
							+ '<th width="16%">Shift Time</th>'
							+ '<th width="15.8%">Work Hours</th>'
							+ '<th width="11%">Non Night Fill Hours</th>'
							+ '</tr>' + '<tr id=' + i + "  " + (n++) + '>'
							+ '<td></td>' + '<td>'
							+ $(list[i]).find(":nth-child(9)").text() + '</td>'
							+ '<td>' + tmpHr1 + ' - ' + tmpHr2 + '</td>'
							+ '<td>' + childWorkHr + '</td>' + '<td>'
							+ nonWrHr.replace(".", ":") + '</td>';*/

					// ---+ '</tr>';
					prevParentEmpName = parentEmpName;
					prevNonWorkingHr = nonWorkingHr;

					var s = n;

					if (n % 16 == 0) {

						content += '</tbody></table>' + printFoot
								+ printHeadKron;

					}
					if ((n - 1) != 16 && (n - 1) != 15) {
						if (n % 17 == 0) {
							content += '</tbody></table>' + printFoot
									+ printHeadKron;
						}
					}
					if ((n - 1) != 18 && (n - 1) != 17) {
						if (n % 19 == 0)

						{
							content += '</tbody></table>' + printFoot
									+ printHeadKron;
						}
					}
					/*
					 * n++; s=s+2;
					 */
					/*
					 * if(i%17==0 && i != (list-1) && i!=0) parentContent+='</tbody></table>'+printFoot+printHead;
					 */
				}// //End of parent loop inside for loop(if else)

			}
			prevParentEmpName = parentEmpName;
			prevEmpDts = currentEmpDts;

		}// //End of for loop
		var shifhtStartEndTime = shiftEndTime;
		var ShiftTotalWorkingHr = calculate(shiftStartTimeTmp, shiftEndTimeTmp);
		var nonWorkingHrTmp = duration(ShiftTotalWorkingHr, totalWorkingHr);
		parentContent = parentContent.replace('tmpEndDtTm', shifhtStartEndTime);
		parentContent = parentContent.replace('totalWrkHrs', totalWorkingHr);
		// parentContent=parentContent.replace('nonWrkHrs',nonWorkingHr);
		parentContent = parentContent.replace('nonWrkHrs', nonWorkingHrTmp);
		childContent = childContentTmp + '</td></tr>';
		content = content + parentContent;
		content = content + childContent;

		// -------------------------------------------------------17 mar

		hourTmp = parseInt(totalWorkingHoursTmp.split(':')[0]);
		minTmp = parseInt(totalWorkingHoursTmp.split(':')[1]);
		hrinInTmp = '';
		hourTmp = hourTmp + parseInt(totalWorkingHr.split(':')[0]);
		minTmp = minTmp + parseInt(totalWorkingHr.split(':')[1]);

		if (minTmp > 59) {
			hrinInTmp = parseInt(minTmp / 60);
			hourTmp = hourTmp + hrinInTmp;
			minTmp = minTmp - (60 * hrinInTmp);
		}
		hourTmp = hourTmp + '';
		minTmp = minTmp + '';
		// console.log(hourTmp.toString().length+'---'+minTmp.toString().length);
		if (hourTmp.toString().length > 1) {
			hourTmp = hourTmp;
		} else {
			hourTmp = '0' + hourTmp;
		}
		if (minTmp.toString().length > 1) {
			minTmp = minTmp;
		} else {
			minTmp =  '0' + minTmp;
		}

		totalWorkingHoursTmp = hourTmp + ':' + minTmp;

		// -------------------------------------------------------17 mar

		printKRONOSContent = content;
		if (printKRONOSContent != '') {
			// var grandTotal = totalWorkingHours - totalAdjustmentHours;
			var grandTotal = duration(totalWorkingHoursTmp,
					totalAdjustmentHours);
			printKRONOSContent += '<tr><td colspan="4" class=""><strong>Total </strong></td><td class="numberColumn rightValue columnDivider">'
					+ '<strong>'
					// + Number(totalWorkingHours).toFixed(2)
					+ totalWorkingHoursTmp
					+ '</strong></td>'

					+ '</tr><tr>'
					+ '<td colspan="4"><strong>Adjustment for admin work by Night Fill Manager</strong></td>'
					+ '<td class="numberColumn rightValue columnDivider"><strong>-'
					+ totalAdjustmentHours.replace(".", ":")
					+ '</strong></td>'

					+ '</tr>'
					+ '<tr class="lastRow">'
					+ '<td colspan="4" class="valueInfo"><strong>Grand Total</strong></td>'
					+ '<td class="numberColumn valueInfo rightValue columnDivider"><strong>'
					+ grandTotal + '</strong></td>'

					+ '</tr>';

		}
		printKRONOSContent += '</table>';
		printContent = printHeadKron + printTableHeadKRONOS
				+ printKRONOSContent + printFootKRONOS;

		printCombined = printCombined + printContent;

		/*
		 * $('#printbody').html('').append(printContent).append( '<link
		 * rel="stylesheet" href="../../styles/printstyle.css" />');
		 */

	}

}
function navigateToDetail(index) {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');

	$('tr td').addClass('cursorProgress');
	$('#index').val(index);
	if ($('input:checkbox[name=ranged]:checked').val() != undefined
			|| $('input:checkbox[name=ranged]:checked').val() == 'Y') {
		$('#rangedFlag').val('Y');
	} else {
		$('#rangedFlag').val('N');
	}

	$('#generateReport').attr('action', 'requestArticleDetail.htm');
	$('#generateReport').submit();

}

function showHide(id) {
	var i = id;
	// alert("showHide...");
	var chileId = '#childrow_' + id;
	id = "#kronosTable" + "  #" + id;
	$(chileId).toggleClass('hideBlock');
	if ($(id).find('span.indenter').hasClass("plus") == false) {

		// alert("min");
		removeItem(i);
	} else {
		expandedParents.push(i);
		// alert("expand");
	}

	if ($(id).find('span.indenter').hasClass("plus") == true) {
		$(id).find('span.indenter').addClass("minus");
		$(id).find('span.indenter').removeClass("plus");
	} else {
		$(id).find('span.indenter').addClass("plus");
		$(id).find('span.indenter').removeClass("minus");
	}
}

function removeItem(j) {
	for ( var i = 0; i < expandedParents.length; i++) {
		if (expandedParents[i] == j) {
			expandedParents.splice(i, 1);
			i--; // Prevent skipping an item
		}
	}

	// document.getElementById("demo").innerHTML = fruits;
}

function p(i) {
	return Math.floor(i / 10) + "" + i % 10;
}

function trunc(i) {
	var j = Math.round(i * 100);
	return Math.floor(j / 100) + (j % 100 > 0 ? "." + p(j % 100) : "");
}
function calculate(date11, date22) {
	var date1 = new Date();
	var date2 = new Date();
	date1.setDate(date11.substring(0, 2));
	date1.setMonth(date11.substring(3, 5));
	date1.setYear(date11.substring(6, 10));
	date1.setHours(date11.substring(11, 13));
	date1.setMinutes(date11.substring(14, 16));

	date2.setDate(date22.substring(0, 2));
	date2.setMonth(date22.substring(3, 5));
	date2.setYear(date22.substring(6, 10));
	date2.setHours(date22.substring(11, 13));
	date2.setMinutes(date22.substring(14, 16));

	var dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
	var dateNow = new Date();

	dateFuture = date2;
	dateNow = date1;

	var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);

	if (parseInt(days) > 0) {
		var hoursTmp = hours;
		hoursTmp = hoursTmp - (days * 24);
		minutes = minutes - (days * 24 * 60) - (hoursTmp * 60);
		seconds = seconds - (days * 24 * 60 * 60) - (hoursTmp * 60 * 60)
				- (minutes * 60);
	} else {
		hours = hours - (days * 24);
		minutes = minutes - (days * 24 * 60) - (hours * 60);
		seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60)
				- (minutes * 60);
	}

	return hours + ":" + minutes;
}
function calculateoLd(date11, date22) {
	var date1 = new Date();
	var date2 = new Date();

	date1.setDate(date11.substring(0, 2));
	date1.setMonth(date11.substring(3, 5));
	date1.setYear(date11.substring(6, 10));
	date1.setHours(date11.substring(11, 13));
	date1.setMinutes(date11.substring(14, 16));

	date2.setDate(date22.substring(0, 2));
	date2.setMonth(date22.substring(3, 5));
	date2.setYear(date22.substring(6, 10));
	date2.setHours(date22.substring(11, 13));
	date2.setMinutes(date22.substring(14, 16));

	var sec = date2.getTime() - date1.getTime();
	if (isNaN(sec)) {
		// ////////alert("Input data is incorrect!");
		return;
	}
	if (sec < 0) {
		// ////////alert("The second date ocurred earlier than the first one!");
		return;
	}

	var second = 1000, minute = 60 * second, hour = 60 * minute, day = 24 * hour;

	// form.result_h.value = trunc(sec / hour);
	// form.result_m.value = trunc(sec / minute);
	// form.result_s.value = trunc(sec / second);

	var days = Math.floor(sec / day);
	sec -= days * day;
	var hours = Math.floor(sec / hour);
	sec -= hours * hour;
	sec -= hours;
	var minutes = Math.floor(sec / minute);
	sec -= minutes * minute;
	var seconds = Math.floor(sec / second);
	var finelValue = days + " day" + (days != 1 ? "s" : "") + ", " + hours
			+ " hour" + (hours != 1 ? "s" : "") + ", " + minutes + " minute"
			+ (minutes != 1 ? "s" : "") + ", " + seconds + " second"
			+ (seconds != 1 ? "s" : "");
	if (hours == '0')
		hours = '24';

	if (hours.toString().length > 1) {
		hours = hours;
	} else {
		hours = '0' + hours;
	}
	if (minutes.toString().length > 1) {
		minutes = minutes;
	} else {
		minutes = '0' + minutes;
	}
	return hours + ':' + minutes;
}

function Converttimeformat(time1, time2) {

	var time = time1;

	var hrs = Number(time.match(/^(\d+)/)[1]);

	var mnts = Number(time.match(/:(\d+)/)[1]);

	var format = time.match(/\s(.*)$/)[1];

	if (format == "PM" && hrs < 12)
		hrs = hrs + 12;

	if (format == "AM" && hrs == 12)
		hrs = hrs - 12;

	var hours = hrs.toString();

	var minutes = mnts.toString();

	if (hrs < 10)
		hours = "0" + hours;

	if (mnts < 10)
		minutes = "0" + minutes;

	// //////////alert(hours + ":" + minutes);

	var date1 = new Date();

	date1.setHours(hours);

	date1.setMinutes(minutes);

	// //////////alert(date1);

	var time = time2;

	var hrs = Number(time.match(/^(\d+)/)[1]);

	var mnts = Number(time.match(/:(\d+)/)[1]);

	var format = time.match(/\s(.*)$/)[1];

	if (format == "PM" && hrs < 12)
		hrs = hrs + 12;

	if (format == "AM" && hrs == 12)
		hrs = hrs - 12;

	var hours = hrs.toString();

	var minutes = mnts.toString();

	if (hrs < 10)
		hours = "0" + hours;

	if (mnts < 10)
		minutes = "0" + minutes;

	// //////////alert(hours+ ":" + minutes);

	var date2 = new Date();

	date2.setHours(hours);

	date2.setMinutes(minutes);

	// //////////alert(date2);

	var diff = date2.getTime() - date1.getTime();

	var hours = Math.floor(diff / (1000 * 60 * 60));

	diff -= hours * (1000 * 60 * 60);

	var mins = Math.floor(diff / (1000 * 60));

	diff -= mins * (1000 * 60);

	// ////////alert( hours + " hours : " + mins + " minutes : " );
	var returnVal = hours + ":" + mins;
	return returnVal;

}

function calculateNonWorkingHr() {
	var totalWorkingHr = a.substring(0, 2);
	var totalWorkingMin = a.substring(3, 5);
	var nonWorkingHr = b.substring(0, 2);
	var nonWorkingMin = b.substring(3, 5);
	var date1 = new Date(2000, 0, 1, totalWorkingHr, totalWorkingMin);
	var date2 = new Date(2000, 0, 1, nonWorkingHr, nonWorkingMin);

	if (date2 < date1) {
		date2.setDate(date2.getDate() + 1);
	}

	var diff = date2 - date1;
	var msec = diff;
	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	var mm = Math.floor(msec / 1000 / 60);
	return hh + ":" + mm;
}

function duration(x, y) {
	x = x.replace(".", ":");
	y = y.replace(".", ":");
	var t = parseInt(x.split(':')[0] * 60) + parseInt(x.split(':')[1]);

	var w = parseInt(y.split(':')[0] * 60) + parseInt(y.split(':')[1]);
	var d = t - w;
	var dH = Math.floor(d / 60);

	var dM = d - (dH * 60);

	if (dH < 10)
		dH = "0" + dH;

	if (dM < 10)
		dM = "0" + dM;

	return dH + ":" + dM;

}

function formWarehouseTable(warehouseList)
{

	warehouseTableContent="<table class='warehouseTablecss'  id='wareHouTable'><th></th><th>Site</th> <tbody>";
	for ( var i=0;i< warehouseList.length;i++) 
	{
		
		warehouseTableContent+="<tr><td><input type='checkbox' name='checkme' onclick='isCheckbox(id)' id='"+warehouseList[i].warehouseNumber+"'  /></td><td>"+warehouseList[i].warehouseNumber+"-"+warehouseList[i].warehouseName+"</td> <tr>";
	}
	warehouseTableContent+="</tbody><table>";
	$("#warehouseSection").removeClass('hideBlock');
	
	$('#warehouseSection').html('').append(warehouseTableContent);
	$('input:checkbox[name=checkme]').prop('checked',false);	
	$('input:checkbox[name=checkme]').prop('checked',true);	
	$('input:checkbox[name=checkme]').prop('disabled',true);
	
}
function toggleBulkArticles(){
	$('.bulk').click(function(){
		if($('.bulk').hasClass('minus')){
			$('.bulk').removeClass('minus');
			$('.bulk').addClass('plus');
		}else{
			$('.bulk').removeClass('plus');
			$('.bulk').addClass('minus');
		}
		$('.bulkChild').toggle();
	});
}
function isCheckbox(id) {
	var isChecked = $('#' + id).attr('checked') ? true : false;
	if (isChecked)
		$('#' + id).removeAttr('checked');
	else
		$('#' + id).attr('checked', 'checked');
}

function checkCurrOrFuture(){
	var curDateFirst = new Date();

	var curYear = curDateFirst.getFullYear();
	var curmonth = curDateFirst.getMonth();
	var curdate = curDateFirst.getDate();
	var curDate = new Date();
	curDate = new Date(curYear, curmonth, curdate);
	var year = $("#dateFrom").val().split("/")[2];
	var month = $("#dateFrom").val().split("/")[1];
	var date = $("#dateFrom").val().split("/")[0];

	var givenDate = new Date(year, month - 1, date);
	console.log("CurDate andGivenDATe outer====" + curDate
			+ "__" + givenDate);
	if (givenDate.getTime() > curDate.getTime()) {
		$("#advert").hide();
		$("#jobBuy").hide();
		$("#advertLabel").hide();
		$("#jobBuyLabel").hide();
	}else{
		$("#advert").show();
		$("#jobBuy").show();
		$("#advertLabel").show();
		$("#jobBuyLabel").show();
	}
}
function printBulkOrderArticleData(response){
	var output = $.parseJSON(response);
	var bulkOrderArticleList = output.bulkOrderArticleMap;
	var reportSummaryList = output.reportSummaryMap;
	var row='';	
	var s=0;
	var rowHeader='';
	var pageCnt=0;
	var pageConstant=17;
	var rem =0;
	var bulkOrderArticleListSize=0;
	if (bulkOrderArticleList != null && bulkOrderArticleList != ""
		&& jQuery.isEmptyObject(bulkOrderArticleList.valueOf()) != true) {
		for (var m in bulkOrderArticleList) {
			bulkOrderArticleListSize++;
		}
	}
	pageCnt = Math.floor(bulkOrderArticleListSize/pageConstant);
	rem=bulkOrderArticleListSize % pageConstant;
	
	if(rem >0){
		pageCnt=pageCnt+1;
	}
	
	var content="";
	var curPage = 0;
	var printArticleAisleHead = '<div id="printbody"><div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block">Night Fill Labour Plan Report - Bulk Orders</div>'
			+ '<div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	'
			+ '<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate">'+dateformat()+'</label></div></div> ';
			
	

  if (bulkOrderArticleList != null && bulkOrderArticleList != ""
		&& jQuery.isEmptyObject(bulkOrderArticleList.valueOf()) != true) {
	for (var m in bulkOrderArticleList) {
		s++;
		var listReport = bulkOrderArticleList[m];
				
							row += '<tr><td class=" keyInfo" style="padding-left: 50px;">';
							row += listReport.article+'-'+ listReport.articleDesc+ '</td>';
						
							if (listReport.isDeptGroc && Number(listReport.articleGrocVal) != null && Number(listReport.articleGrocVal) != "0"){
								row += '<td class="numberColumn columnDivider rightValue ">' + Number(listReport.articleGrocVal)+ '</td>';
							}else if(listReport.isDeptGroc){
								row += '<td class="numberColumn columnDivider rightValue ">0</td>';
							}
								
							if (listReport.isDeptPer && Number(listReport.articlePerVal) != null && Number(listReport.articlePerVal) != "0"){
								row += '<td class="numberColumn columnDivider rightValue ">' + Number(listReport.articlePerVal)+ '</td>';
							}else if(listReport.isDeptPer){
								row += '<td class="numberColumn columnDivider rightValue ">0</td>';
								}
							if (listReport.isDeptGm && Number(listReport.articleGMVal) != null && Number(listReport.articleGMVal) != "0"){
								row += '<td class="numberColumn columnDivider rightValue ">'+ Number(listReport.articleGMVal)+ '</td>';
							}else if(listReport.isDeptGm){
								row += '<td class="numberColumn columnDivider rightValue">0</td>';
								}
							if (Number(listReport.total) != null && Number(listReport.total) != "0"){
								row += '<td class="numberColumn columnDivider rightValue valueInfo lastColumn"><strong>' + Number(listReport.total)+ '</strong></td></tr>';
							}else{
								row += '<td class="numberColumn columnDivider rightValue valueInfo lastColumn ">0</td></tr>';
								}
					
						
					  if(s%pageConstant==0){
						  curPage++;
								rowHeader += '<tr><td class=" columnDivider rightValue" >Article(s)</td>';
								for ( var m in reportSummaryList) {
									var listReport = reportSummaryList[m];
									rowHeader += '<td class="numberColumn rightValue columnDivider "  >'
											+ '<strong>' + listReport[0].departmentName
											+ '</strong></td>';
								}
								rowHeader += '<td class="numberColumn columnDivider valueInfo rightValue lastColumn"><strong>Total</strong></td></tr>';
								var printArticleAisleContent='<table cellspacing="0" class="sortTable ContentTable printTable actionRowPrint" style="border: solid 1px #0B0A0B;" id="reportSummaryTablePrint"><thead>'
									+rowHeader+'</tr></thead><tbody>'+row+'</tbody></table></div></div>';
								var printArticleAisleFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width55 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate">'+dateformat()+'</label> <label class="separator">|</label> <label class="currentTime">'+timeformat()+'</label></div><div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint1">'+curPage+'</label> of <label class="totalPage1">'+pageCnt+'</label></div></div></div>';
								content += printArticleAisleHead+printArticleAisleContent+printArticleAisleFoot;
								row="";
								rowHeader="";
					        }
					
		}
	if(s%pageConstant!=0 && s%pageConstant<pageConstant && s>0 ){
		
	var extraTrCnt = pageConstant-s%pageConstant;
	var extraRow="";	
	for ( var i = 0; i < extraTrCnt; i++) {
			if (i != 0)
				extraRow += '<table cellspacing="0" class=" sortTable "><tbody><tr class="height30"><td colspan="11"></td></tr></tbody></table>';	
	}
		
		  curPage++;
				rowHeader += '<tr><td class=" columnDivider rightValue" >Article(s)</td>';
				for ( var m in reportSummaryList) {
					var listReport = reportSummaryList[m];
					rowHeader += '<td class="numberColumn rightValue columnDivider "  >'
							+ '<strong>' + listReport[0].departmentName
							+ '</strong></td>';
				}
				rowHeader += '<td class="numberColumn columnDivider valueInfo rightValue lastColumn"><strong>Total</strong></td></tr>';
				var printArticleAisleContent='<table cellspacing="0" class="sortTable ContentTable printTable actionRowPrint" style="border: solid 1px #0B0A0B;" id="reportSummaryTablePrint"><thead>'
					+rowHeader+'</tr></thead><tbody>'+row+'</tbody></table></div></div>';
				var printArticleAisleFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width55 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint1">'+curPage+'</label> of <label class="totalPage1">'+pageCnt+'</label></div></div></div>';
				content += printArticleAisleHead+printArticleAisleContent+extraRow+printArticleAisleFoot;
	        }
	}
$('#printBulkOrdersData').html('').append(content).append(
'<link rel="stylesheet" href="../../styles/printstyle.css" />');
}