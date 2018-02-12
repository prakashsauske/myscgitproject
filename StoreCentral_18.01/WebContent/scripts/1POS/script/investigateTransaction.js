var recordCount;
var currentPage;
var curPage;
var prevRes = '';
var headerDesc;
var headerSort;
var headIndex;
var filterFlag;
var NDF="Sorry, no results found for your search criteria. Please try again.";
var artclSldByDeptTotPages;
var artclSldByDeptCurPageNo;
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],select[name="investigateTypeDrop"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="investypeDropDown"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"],select[name="investigateTypeDrop"]';

$(function() {
	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
		/*onClose : function(selectedDate) {
			$("#dateTo").focus();
		}*/

	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});
	/*$.tablesorter.addParser({
	    id: 'opertorLocCustSort',
	    is: function(s) {
	        return false;
	    },
	    format: function(s, table, cell) {
	    	console.log("Custom value <<< "+$(cell).html());
	        return $(cell).html();
	    },
	    type: 'string'
	});*/
	
	
	$('.navWrapper').hover( function(event){
	    event.stopPropagation();
		
		$('.closeDropdown').blur();
	});

	/*$('.navWrapper').click( function(){
	    $('#closeDropdown').hide();
	});*/
	var invesDrop = $("#invesDrop").val();
	console.log(invesDrop);
	$('#reportType').val(invesDrop);
	/*$('#reportType opti on[value="priceMarkdown"],#reportType option[value="soldOver"]').addClass('hideBlock');*/
	$("#dateFrom").blur(function(){
		
		   if($('#dateFrom').val().split('/')[2].length != 4)
			{
			var fromYear = parseDate($('#dateFrom').val()).getFullYear();
			console.log(fromYear);
			var fromDateFYear =$('#dateFrom').val().split('/');
			var finalFromDate=fromDateFYear[0] + '/' + fromDateFYear[1] + '/' + fromYear;
			$('#dateFrom').val(finalFromDate);
			console.log(finalFromDate);
			}
		  });
	 
	 $("#dateTo").blur(function(){
		
		 if($('#dateTo').val().split('/')[2].length != 4)
			{
			var toYear = parseDate($('#dateTo').val()).getFullYear();
			console.log(toYear);
			var toDateFYear =$('#dateTo').val().split('/');
			var finalToDate=toDateFYear[0] + '/' + toDateFYear[1] + '/' + toYear;
			$('#dateTo').val(finalToDate);
			console.log(finalToDate);
			}
		  });
	 
	 $('#saveTraFilterOpen').click(function(){
			$('#saveTraFilterOpen').addClass('hideBlock');
			$('#saveTraFilterClear').removeClass('hideBlock');
			showsaveTraFilter();
			});
			$('#saveTraFilterClear').click(function(){
			$('#saveTraFilterOpen').removeClass('hideBlock');
			$('#saveTraFilterClear').addClass('hideBlock');
			hidesaveTraFillter();
			});
			
			/*$('#soldFilterOpen').click(function(){
				$('#soldFilterOpen').addClass('hideBlock');
				$('#soldFilterClear').removeClass('hideBlock');
				showsoldFilter();
				});
				$('#soldFilterClear').click(function(){
				$('#soldFilterOpen').removeClass('hideBlock');
				$('#soldFilterClear').addClass('hideBlock');
				hidesoldFillter();
				});*/
			
			/*$('#reportType').val('soldOver');*/
				
			
				$('#nosalesFilterOpen').click(function(){
					$('#nosalesFilterOpen').addClass('hideBlock');
					$('#nosalesFilterClear').removeClass('hideBlock');
					shownosalesFilter();
					});
					$('#nosalesFilterClear').click(function(){
					$('#nosalesFilterOpen').removeClass('hideBlock');
					$('#nosalesFilterClear').addClass('hideBlock');
					hidenosalesFillter();
					});
					
					$('#priceFilterOpen').click(function(){
						$('#priceFilterOpen').addClass('hideBlock');
						$('#priceFilterClear').removeClass('hideBlock');
						showpriceFilter();
						});
						$('#priceFilterClear').click(function(){
						$('#priceFilterOpen').removeClass('hideBlock');
						$('#priceFilterClear').addClass('hideBlock');
						hidepriceFillter();
						});
						$('#deptFilterOpen').click(function(){
							$('#deptFilterOpen').addClass('hideBlock');
							$('#deptFilterClear').removeClass('hideBlock');
							showdeptFilter();
							});
							$('#deptFilterClear').click(function(){
							$('#deptFilterOpen').removeClass('hideBlock');
							$('#deptFilterClear').addClass('hideBlock');
							hidedeptFillter();
							});
					
							$('#priceInquiryFilterOpen').click(function(){
								$('#priceInquiryFilterOpen').addClass('hideBlock');
								$('#priceInquiryFilterClear').removeClass('hideBlock');
								showPriceInquiryFilter();
								});
								$('#priceInquiryFilterClear').click(function(){
								$('#priceInquiryFilterOpen').removeClass('hideBlock');
								$('#priceInquiryFilterClear').addClass('hideBlock');
								hidePriceInquiryFillter();
								});
							
					
			
							$('#operatorLocOpen').click(function(){
								$('#operatorLocOpen').addClass('hideBlock');
								$('#operatorLocClear').removeClass('hideBlock');
								showOperlocFilter();
								});
								$('#operatorLocClear').click(function(){
								$('#operatorLocOpen').removeClass('hideBlock');
								$('#operatorLocClear').addClass('hideBlock');
								hideOperlocFillter();
								});
			
								 if ($('#reportType').val() == 'noReport') {
									 var oper = $('#hiddeninputid').val();
										
										$('#hiddeninputid').val('soldOver');
								}	
	 
	 $(document).keypress(function(event) {
			if (event.which == 13) {
				event.preventDefault();
				$('#dateFrom').blur();
				$('#dateTo').blur();
					$('#generateReport').click();
					
			}
			
		});
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

	var newPrevDate = previousDate.getDate();
	var newPrevMonth = previousDate.getMonth() + 1;

	if (newPrevDate < 10) {
		newPrevDate = '0' + newPrevDate;
	}
	if (newPrevMonth < 10) {
		newPrevMonth = '0' + newPrevMonth;
	}

	var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate
			.getFullYear());
	$('#dateFrom').val(oneDayBefCurDate);

	// $('.reportWrapper .ContentTableWrapper').css('overflow', 'visible');

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});
	
	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$('#next-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#previous-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
	
	$('.nosalesOver #next-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('.soldOver #previous-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
	
	$('#reportContent').removeClass('hideBlock');
	$(".operatorTable").removeClass('hideBlock');
	$(".operatorTable tbody:first").html('');
	$(".operatorTable").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'/*,
        headers: {
	        6: {
	            sorter:'opertorLocCustSort'
	        }
        }*/
	});
	$('#reportContent').addClass('hideBlock');
	$(".operatorTable").addClass('hideBlock');
	
	$('#reportContent').removeClass('hideBlock');
	$(".soldOverTable").removeClass('hideBlock');
	$(".soldOverTable tbody:first").html('');
	$(".soldOverTable").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".soldOverTable").addClass('hideBlock');
	
	$('#reportContent').removeClass('hideBlock');
	$(".savedTransac").removeClass('hideBlock');
	$(".savedTransac tbody:first").html('');
	$(".savedTransac").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".savedTransac").addClass('hideBlock');
	
	
	$('#reportContent').removeClass('hideBlock');
	$(".noSalestrans").removeClass('hideBlock');
	$(".noSalestrans tbody:first").html('');
	$(".noSalestrans").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".noSalestrans").addClass('hideBlock');
	
	$('#reportContent').removeClass('hideBlock');
	$(".deptSalesTable").removeClass('hideBlock');
	$(".deptSalesTable tbody:first").html('');
	$(".deptSalesTable").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".deptSalesTable").addClass('hideBlock');
	
	$('#reportContent').removeClass('hideBlock');
	$(".priceMarkdownTabl").removeClass('hideBlock');
	$(".priceMarkdownTabl tbody:first").html('');
	$(".priceMarkdownTabl").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".priceMarkdownTabl").addClass('hideBlock');
	$(".priceInquiryTable").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});

	
	$("#generateReport")
			.click(
					function() {
						$("#deptSaleTranAttr").val('');
						hideError();
						$('#deptFilterOpen').removeClass('hideBlock');
						$('#deptFilterClear').addClass('hideBlock');
						$('#saveTraFilterOpen').removeClass('hideBlock');
						$('#saveTraFilterClear').addClass('hideBlock');
						$('#nosalesFilterOpen').removeClass('hideBlock');
						$('#nosalesFilterClear').addClass('hideBlock');
						$('#priceFilterOpen').removeClass('hideBlock');
						$('#priceFilterClear').addClass('hideBlock');
						$('#saveTraFilterOpen').removeClass('hideBlock');
						$('#saveTraFilterClear').addClass('hideBlock');
						$('#operatorLocOpen').removeClass('hideBlock');
						$('#operatorLocClear').addClass('hideBlock');
						/*try{
							hideOperlocFillter();
						}catch(err){
						console.log(err);
					}
						try{
						hidedeptFillter();
						}catch(err){
							console.log(err);
						}
						try{
						hidesaveTraFillter();
						}
						catch(err){
							console.log(err);
						}
					
						try{hidenosalesFillter();
						}
						catch(err){
							console.log(err);
						}
					
						try{hidepriceFillter();
						}
						catch(err){
							console.log(err);
						}
						
						try{hidesaveTraFillter();
						}
						catch(err){
							console.log(err);
						}*/
						$('input[type="search"]').val('');
						var fromDate = formateDate($('#dateFrom').val());
						var toDate = formateDate($('#dateTo').val());
						var start = $("#dateFrom").datepicker("getDate");
				        var end = $("#dateTo").datepicker("getDate");
				        var days = (end - start) / (1000 * 60 * 60 * 24);
				        var selectOptions = $('#reportType').val();
						$('#dateToHide').text(toDate);
						var investype = $('#reportType').val();
						$('#investypeDropDown').text(investype);
						
						$('#dateFromHide').text(fromDate);
						//console.log($('#dateFromHide').text(fromDate));
						//console.log($('#dateToHide').text(toDate));
						var today = new Date();
						var newDate = today.getDate();
						var newMonth = today.getMonth();
						var newYear = today.getFullYear();
						var curDate = new Date(newYear, newMonth, newDate);
						var date1 = new Date();

						var parts = fromDate.split('/');
						var partsLen = parts.length;
						var date1Len = fromDate.length;
						date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
						var newTime = Number(date1.getTime());

						var dateComFrom = new Date(fromDate.split('/')[2],
								fromDate.split('/')[1], fromDate.split('/')[0]);
						var dateComTo = new Date(toDate.split('/')[2], toDate
								.split('/')[1], toDate.split('/')[0]);
						var toYear = dateComTo.getFullYear();
						var fromYear = dateComFrom.getFullYear();
						var toMonth = dateComTo.getMonth();
						var fromMonth = dateComFrom.getMonth();
						var toDay = dateComTo.getDate();
						var fromDay = dateComFrom.getDate();
						var rangeDate = new Date(toDate.split('/')[2],
								toDate.split('/')[1]-1, toDate.split('/')[0]);

						var toDateTime = dateComTo.getTime();
						var fromDateTime = dateComFrom.getTime();
						var date2 = new Date();
						var part = toDate.split('/');
						var partLen = part.length;
						var date2Len = toDate.length;
						var date2Time = Number(date2.getTime());
						date2.setFullYear(part[2], part[1] - 1, part[0]);

						var splittedDate = formateDate($('#dateTo').val(),
								$('#dateTo').val().split('/').length)
								.split('/');
						var splittedTwo = splittedDate[0] + splittedDate[1]
								+ splittedDate[2];

						newTime = Number(newTime)
								+ Number(24 * 60 * 60 * 1000 * 90);

						/*
						 * var timeDiff = Math.abs(curDateTime - toDateTime);
						 * var diffDays = Math.ceil(timeDiff / (1000 * 3600 *
						 * 24));
						 */

						if (fromDate == "") {
							showError('Please enter From Date.');
							callFrom();
						} else if (toDate == "") {
							showError('Please enter To Date.');
							callTo();
						} else if (partsLen != 3 || date1Len != 10
								|| fromDate.split('/')[0] > 31
								|| fromDate.split('/')[1] > 12
								|| fromDate.split('/')[2].length != 4) {
							showError('Invalid From Date.');
							callFrom();
						} else if (partLen != 3 || date2Len != 10
								|| toDate.split('/')[0] > 31
								|| toDate.split('/')[1] > 12
								|| toDate.split('/')[2].length != 4) {
							showError('Invalid To Date.');
							callTo();
						} else if (date1.getTime() > date2.getTime()) {
							showError('To Date should not be lesser than the From Date');
							callTo();
						}
						/*
						 * else if (date2Time >newTime) { console.log(newTime +'
						 * date2.getTime() '+ date2.getTime()); showError('Date
						 * difference should not be greater than 7 days');
						 * callTo(); }
						 */

						else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
								|| isNaN(splittedTwo)) {

							showError("Invalid Date Format");
						}
						/*
						 * else if(fromDateTime > curDateTime ) {
						 * showError("Future Dates not allowed for From Date.");
						 * callFrom(); }
						 */

						else if (rangeDate > curDate) {
							console.log("rangeDate"+rangeDate);
							console.log("curDate"+curDate);
							showError("Future Dates are not allowed for To Date.");
							callTo();
						}
						else if (selectOptions  =='operatorHistory' && days > 6) {
							showError('Date Range is more than one week.');
							callFrom();
						} else if (selectOptions == 'priceMarkdown' && days > 6) {
							showError('Date Range is more than one week.');
							callFrom();
						}
						else if (selectOptions == 'noSales' && days > 1) {
							showError('Date Range is more than a day.');
							callFrom();
						}
						else if (selectOptions == 'savedTrans'  && days > 6) {
							showError('Date Range is more than one week.');
							callFrom();
						}
						else if (selectOptions == 'soldOver' && days > 1) {
							showError('Date Range is more than a day.');
							callFrom();
						}else if (selectOptions == 'deptSales' && days > 6)  {
							showError('Date Range is more than one week.');
							callFrom();
						}else if (selectOptions == 'priceInquiry'  && days > 6)  {
							showError('Date Range is more than one week.');
							callFrom();
						}
						else if ((toYear - fromYear) == 1) {
							if (((toMonth - fromMonth) + 12) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ((((toMonth - fromMonth) + 12) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else {
								investigateTrans();
							}
						} else if (toYear - fromYear == 0) {
							if ((toMonth - fromMonth) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if (((toMonth - fromMonth) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else {
								investigateTrans();
							}
						} else if ((toYear - fromYear) >= 2) {
							showError('Date difference should not be greater than 3 months');
							callFrom();
						} else if ($('#reportType option:selected').text() == 'Select') {
							showError('Select any investigate type');
						} else {
							investigateTrans();

						}// hideError();

					});


	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	
	
	$('#sortTableMarkDown ').on('click','.sorting',function () {
	    var th = $('#sortTable th').eq($(this).index());
	    $(th).attr('aria-sort');
	    headerDesc = th.text();
	    headIndex=Number($(this).index());
	   // returns [object Object]       
	});
});


function investigateTrans() {
	$('.reportContent').addClass('hideBlock');
	var selectOptions = $('#reportType').val();
	if (selectOptions == 'noReport') {
		showError('Select any investigate type');
	} else if (selectOptions  =='operatorHistory') {
		operatorLocation($('#investigateTransaction').serialize());
	} else if (selectOptions == 'priceMarkdown') {
		priceMarkdown($('#investigateTransaction').serialize());
	}
	else if (selectOptions == 'noSales') {
		noSales($('#investigateTransaction').serialize());
	}
	else if (selectOptions == 'savedTrans') {
		savedTrans($('#investigateTransaction').serialize());
	}
	else if (selectOptions == 'soldOver') {
		soldOverRestricted($('#investigateTransaction').serialize());
	}else if (selectOptions == 'deptSales')  {
		departSaleTransaction($('#investigateTransaction').serialize());
	}else if (selectOptions == 'priceInquiry')  {
		priceInquiry($('#investigateTransaction').serialize());
	}
	else {
		showError('Select any investigate type');
	}
}
function soldOverRestricted(data) {

	
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getSoldOverRestricted.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {
			setReportGenerationFlags();
				prevRes = response;
				formSoldOverTransacQtyContent(response, '');
				filterSoldOver();
				//printReport();
			

			//stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}
function savedTrans(data) {
	$('.saveTraFillterHdr').remove();
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getSavedTrans.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {
	
			setReportGenerationFlags();
				formSavedTransactionContent(response, '');
				prevRes = response;
				bindFilterSaved();
				//printReport();
			

			//stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}
function priceInquiry(data) {
	//$('.saveTraFillterHdr').remove();
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getPriceInquiry.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {
			console.log("priceInquiry :: report");
			setReportGenerationFlags();
			parsePriceInquiry(response, '');
				prevRes = response;
				filterPriceInquiry();
				//printReport();
			

			//stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}
function formSavedTransactionContent(response, value) {

	var savedTransaction = '';
	var msg = '';
	var output = '';

	var saveTraDate='';
	var saveTraTime='';
	var saveTraTran='';
	var saveTraPoso='';
	var saveTraPosi='';
	var saveTraAmou='';
	
	if($('.saveTraFillterHdr')!=undefined && $('.saveTraFillterHdr').length>0 && !$('.saveTraaFillterHdr').hasClass('hideBlock')){
		saveTraDate=$('.saveTraDate').val().toUpperCase();
		saveTraTime=$('.saveTraTime').val().toUpperCase();
		saveTraTran=$('.saveTraTran').val().toUpperCase();
		saveTraPoso=$('.saveTraPoso').val().toUpperCase();
		saveTraPosi=$('.saveTraPosi').val().toUpperCase();
		saveTraAmou=$('.saveTraAmou').val().toUpperCase();
		
	}
	output = $.parseJSON(response);
	savedTransaction = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var flag = false;

	if (msg != undefined  && !isNaN(msg)
			&& savedTransaction != null && savedTransaction != undefined&& !(savedTransaction.length==1 
			&&  (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber=='') ) ) {
		recordCount = savedTransaction.length;

		if (savedTransaction != null) {

			var list = savedTransaction;
			for ( var i = 0; i < list.length; i++) {
				list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
						: '';
				list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
						: '';
				list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
						list[i].transactionNumber
						: '';
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
						list[i].posNumber : '';
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
						list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
						list[i].cashierLastName
						: '';
				list[i].savedTransAmount = (list[i].savedTransAmount != null && list[i].savedTransAmount != undefined) ? 
						Number(list[i].savedTransAmount).toFixed(2)
						: '';

				if ((convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
						saveTraDate) != -1 
						&& (convertTime(list[i].posTransactionTime)==undefined ? '': convertTime(list[i].posTransactionTime) ).indexOf(
								saveTraTime) != -1
						&& list[i].transactionNumber.toUpperCase().indexOf(
								saveTraTran) != -1
						&& list[i].posNumber.toUpperCase().indexOf(saveTraPosi) != -1
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(saveTraPoso) != -1
						&& list[i].savedTransAmount.toUpperCase().indexOf(saveTraAmou) != -1)

				{
					flag = true;
					if($("#saveTraFilterClear").hasClass("hideBlock")){
						filterFlag=true;
						
						$(".filterFlag").val(filterFlag);
						
					}
					else
						{
						
						filterFlag=false;
						$(".filterFlag").val(filterFlag);
						}
					/*if(list[i].savedTransAmount != 0)
						{*/
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="centerValue" >'
							+ convertDate(list[i].calendarDayTo) 
							+ '</td>';
							if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
								content	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
							+ '</td>';
							else
								content	+= '<td class="centerValue" >&nbsp;'
								+ '</td>';
							content += '<td class="rightValue" >'+ list[i].transactionNumber
							+ '</td>'
							+ '<td class="rightValue " >'+ list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="rightValue " >'+ list[i].savedTransAmount
							+ '</td></tr>';
				//}
					
				}

			}
		}
		$('.savedTransac tbody:first').html('');
		$('.savedTransac tbody:first').append(content);
		showSavedTransacContentBlock();
		// convertDate();
		// convertTime();
		if (flag) {
			savedTransupdateSortPlugin();
			setTimeout(function() {
				$("#savedAttr").val("calendarDayTo,date,asc,first,posTransactionTime,time,asc,first");
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ], [ 1, 0 ] ];
				// sort on the first column
				$(".savedTransac").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.'+$(".savedTransac").attr('data-user_id')).addClass('hideBlock');
		}
	} else {
		if (msg == 'null' || msg == NDF)
			showWarning('Sorry, no results found for your search criteria. Please try again.');
		else if(msg=='' ||(  savedTransaction!=null && savedTransaction!=undefined && savedTransaction.length>0 && (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber =='')))
			showWarning('Sorry, no results found for your search criteria. Please try again.');
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".savedTransac .parentTr").highlight(value);
		$(".savedTransac .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".savedTransac .parentTr").unhighlight();}*/
}


function formSoldOverTransacQtyContent(response, value) {

	var savedTransaction = '';
	var msg = '';
	var output = '';

	/*var soldDate='';
	var soldTime='';
	var soldTran='';
	var soldPoso='';
	var soldPosi='';
	var soldAuth='';
	var soldEan='';
	var soldArtn='';
	var soldArtd='';
	var soldTotq='';
	var soldTot='';
	if($('.soldFillterHdr')!=undefined && $('.soldFillterHdr').length>0 && !$('.soldFillterHdrc').hasClass('hideBlock')){
		soldDate=$('.soldDate').val().toUpperCase();
		soldTime=$('.soldTime').val().toUpperCase();
		soldTran=$('.soldTran').val().toUpperCase();
		soldPoso=$('.soldPoso').val().toUpperCase();
		soldPosi=$('.soldPosi').val().toUpperCase();
		soldAuth=$('.soldAuth').val().toUpperCase();
		soldEan=$('.soldEan').val().toUpperCase();
		soldArtd=$('.soldArtd').val().toUpperCase();
		soldArtn=$('.soldArtn').val().toUpperCase();
		soldTotq=$('.soldTotq').val().toUpperCase();
		soldTot=$('.soldTot').val().toUpperCase();
	}*/
	output = $.parseJSON(response);
	savedTransaction = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var flag = false;

	if (msg != undefined  && !isNaN(msg)
			&& savedTransaction != null && savedTransaction != undefined&& !(savedTransaction.length==1 
			&&  (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber=='') ) ) {
		recordCount = savedTransaction.length;

		if (savedTransaction != null) {

			var list = savedTransaction;
			for ( var i = 0; i < list.length; i++) {
				// DATE
				list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
						: '';
				// TIME
				list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
						: '';
				//Trans#
				list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
				list[i].transactionNumber
				: '';
			
				//POS ID
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
						: '';
				//POS OP NAME
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
						: '';
				list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser : '';
				
				list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article : '';
				
				/*list[i].ean_upc = (list[i].ean_upc != null && list[i].ean_upc != undefined) ? list[i].ean_upc : '';*/
				
				list[i].article_T = (list[i].article_T != null && list[i].article_T != undefined) ? list[i].article_T : '';
				
				list[i].soldOverAmount = (list[i].soldOverAmount != null && list[i].soldOverAmount != undefined) ? Number(list[i].soldOverAmount).toFixed(2) : '';
				
				
				//Total--SoldOverRestricted Qty Amount have to map
				list[i].soldOverQty = (list[i].soldOverQty != null && list[i].soldOverQty != undefined) ? Number(list[i].soldOverQty).toFixed(0): '';


				/*if ((convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
						soldDate) != -1 
						&& (convertTime(list[i].posTransactionTime)==undefined ? '': convertTime(list[i].posTransactionTime) ).indexOf(
								soldTime) != -1 
						&& list[i].transactionNumber.toUpperCase().indexOf(
								soldTran) != -1
						&& list[i].posNumber.toUpperCase().indexOf(
								soldPosi) != -1
										
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(soldPoso) != -1
								
						&& list[i].posAuthoriser.toUpperCase().indexOf(
								soldAuth) != -1
						&& list[i].article.toUpperCase().indexOf(
								soldArtn) != -1
						&& list[i].ean_upc.toUpperCase().indexOf(
								soldEan) != -1
						&& list[i].article_T.toUpperCase().indexOf(
								soldArtd) != -1
						&& list[i].soldOverAmount.toUpperCase().indexOf(
								soldTot) != -1
																
					 && list[i].soldOverQty.toUpperCase().indexOf(soldTotq) != -1
						
						)

				{*/
					
					flag = true;
					/*if(list[i].soldOverQty !=0)
						{*/
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="leftValue" >'
							+ convertDate(list[i].calendarDayTo) 
							+ '</td>';
							if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
								content	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
							+ '</td>';
							else
								content	+= '<td class="centerValue" >&nbsp;'
								+ '</td>';	
							content	+=  '<td class="rightValue" >'+list[i].transactionNumber
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue" >'
							+ list[i].posAuthoriser
							+ '</td>' 
							+ '<td class="centerValue">'
							+ list[i].article
							+ '</td>'
							/*+ '<td class="leftValue" >'+list[i].ean_upc
							+ '</td>'*/
							+ '<td class="leftValue" >'+list[i].article_T
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].soldOverQty
							+ '</td>'
							+ '<td class="rightValue lastColumn" >'+list[i].soldOverAmount
							+ '</td></tr>';

						/*}*/
				//}

			}
		}
		$('.soldOverTable tbody:first').html('');
		$('.soldOverTable tbody:first').append(content);
		showSoldOverQtyContentBlock();
		pagenationCallbackMethod();
		if (flag) {
			soldupdateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 5, 0 ] ];
				// sort on the first column
				$(".soldOverTable").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.'+$(".soldOverTable").attr('data-user_id')).addClass('hideBlock');
		}
	} else {
		if (msg == 'null' || msg == NDF )
			showWarning(NDF);
		else if(msg=='' ||(  savedTransaction!=null && savedTransaction!=undefined && savedTransaction.length>0 && (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber =='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".soldOverTable .parentTr").highlight(value);
		$(".soldOverTable .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".soldOverTable .parentTr").unhighlight();}*/
}

/*
 function printReport() {
 $.ajax({
 type : "get",
 url : "printReport.htm",
 data : "",
 beforeSend : function() {
 startLoading();
 fullScreenLoader();
 },
 success : function(response) {

 printResult(response);
 stopLoading();
 $.loader('close');
 },
 error : function() {
 stopLoading();
 $.loader('close');
 },
 });

 }
 */
function printReportOper() {
	$.ajax({
		type : "get",
		url : "printReportOper.htm",
		data : "",
		beforeSend : function() {
			startLoading();
			fullScreenLoader();
		},
		success : function(response) {

			//printResult(response);
			stopLoading();
			$.loader('close');
		},
		error : function() {
			stopLoading();
			$.loader('close');
		}
	});

}
function priceMarkdownPrintJasper() {
	
	if (isNotJasperPrintValid()) {
		printJasperValMsg();
	}else
		{if(headIndex !="" && headIndex!= null)
		{
			headerSort = $("#sortTableMarkDown thead tr th:nth-child("+(Number(headIndex)+1)+")").attr('aria-sort');
		}
		$("#headerDesc").val(headerDesc);
		$("#headerSort").val(headerSort);
		$('#investigateTransaction').attr("action", "printReportPriceMarkdown.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();}
	

}
function printResult(newList) {
}
function printResult2(newList) {
	var descList = newList;
	recordCount = newList.length;

	var options = $('#reportType').val();

	var printTableContentDST = '';
	var printTableContentNST = '';
	var printTableContentST = '';
	var printTableContentSORQ = '';
	var printTableContentOH = '';
	var printTableContentPM = '';
	var printContent = '';
	console.log(newList.length);

	/*
	 * if (output.msg != null && output.msg.length > 0) { showError(output.msg); }
	 */
	if (descList != null && descList.length > 0) {

		var printHead = '<div class="width100 pageBreak" style=""><div class="width70 reportName bold inline-block"></div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">From Date: </label><label class="fromDatePrint" id=""></label><label class="separator">|</label><label class="cateHide" >To Date: </label><label class="toDatePrint" id="" ></label></div>	</div><table cellspacing="0" class="sortTable deptSalesPrint ContentTable actionRowPrint" id="sortTable">'
				+ '<thead>';
		
		var printHeadSORQ = '<div class="width100 pageBreak" style=""><div class="width70 reportName bold inline-block"></div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">From Date: </label><label class="fromDatePrint" id=""></label><label class="separator">|</label><label class="cateHide" >To Date: </label><label class="toDatePrint" id="" ></label></div>	</div><table cellspacing="0" class="sortTable ContentTable actionRowPrint sortValPrint" id="sortTable">'
			+ '<thead>';
		var dstTabHead = '<tr>	'
			+'<th class="centerValue">Date</th>'
			+'<th class="centerValue">Time</th>'
			+'<th class="centerValue">Trans#</th>'

			+'<th class="centerValue">POS ID#</th>'
			+'<th class="centerValue">POS Operator Name</th>'
			+'<th class="centerValue">Authorised By</th>'
			+'<th class="centerValue">Department</th>'
			+'<th class="numberColumn centerValue lastColumn">Total($)</th>'
				+ '		</tr>' + '</thead> ' + '<tbody>';
		var nstTabHead = '<tr>' 
			
			+'<th class="centerValue">Date</th>'
			+'<th class="centerValue">Time</th>'
			+'<th class="centerValue">Trans#</th>'
			+'<th class="centerValue">POS ID#</th>'
			+'<th class="centerValue">POS Operator Name</th>'		
			+'<th class="lastColumn centerValue">Reason</th>'
				+ '	</tr>' + '</thead> ' + '<tbody>';
		var soqTabHead = '<tr>	'
				+ '				<th class="centerValue">Date</th>'
				+'<th class="centerValue">Time</th>'
				+'<th class="centerValue">Trans. #</th>'
				+'<th class="centerValue">POS ID#</th>'
				+'<th class="centerValue">POS Operator <br/>Name</th>'
				+'<th class="centercValue">Authorised By</th>'
				+'<th class="centerValue">Article No.</th>'
				/*+'<th class="centerValue">EAN</th>'*/
				+'<th class="centerValue">Article <br/>Description</th>'
				+'<th class="numberColumn centerValue">Total Sold <br/>Quantity</th>'
				+'<th class="numberColumn centerValue lastColumn">Total</th>'
				+ '			</tr>' + '</thead> ' + '<tbody>';
		var stTabHead = '<tr>'
				+ '	<th class="header centerValue">Date</th>'
				+ '	<th class="centerValue header">Time </th>'
				+ '	<th class="header centerValue">Trans#</th>'
				+ '	<th class="header centerValue">POS ID#</th>'
				+ '	<th class="header centerValue">POS Operator Name</th>'
				+ '	<th class="numberColumn centerValue lastColumn header">Amount($)</th>	'
				+ '	</tr>' + '</thead> ' + '<tbody>';
		var ohTabHead = '<tr>	' + '<th class="header">Start Date</th>'
				+ '					<th class="centerValue header">Start Time </th>'
				+ '					<th class="header">End Date</th>	'
				+ '					<th class="centerValue header">End Time </th>'
				+ '					<th class="header">POS ID#</th>'
				+ '					<th class="header">POS Operator Name</th>'
				+ '					<th class="header lastColumn">Transaction Number <br> Range</th>'
			/*	+ '					<th class="lastColumn header">Sign Off Type</th>'*/
				+ '				</tr>' + '</thead> ' + '<tbody>';

		var pricMarkHead = '<thead><tr>'
			+'<th class="centerValue">Date</th>'
			+'<th class="centerValue">Time</th>'
			+'<th class="centerValue">Trans#</th>'
			+'<th class="centerValue">POS ID#</th>'
			+'<th class="centerValue">POS Operator Name</th>'
			+'<th class="centerValue">Authorised By</th>'
			+'<th class="centerValue">Article No.</th>'
			+'<th class="centerValue">EAN</th>'
			+'<th class="centerValue" >Article Description</th>'
			+'<th class="centerValue">Qty.</th>'
			+'<th class="centerValue">Reason</th>'
			
			+'<th class="numberColumn centerValue">Retail Price</th>'
			+'<th class="numberColumn centerValue">Total ($) <br/>(Article)</th>'
			+'<th class="numberColumn centerValue">Price <br/>Difference</th>'
			+'<th class="numberColumn lastColumn centerValue">% of <br/>Markdown</th>'
				+ '</tr></thead><tbody>';
		var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
		
		

		if (options == 'operatorHistory') {
			printTableContentOH = '';
			if (descList != null) {

				var list = descList;
				for ( var i = 0; i < list.length; i++) {
					//START DATE
					list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
							: '';
					//START TIME
					list[i].cashierSignInTime = (list[i].cashierSignInTime != null && list[i].cashierSignInTime != undefined) ? list[i].cashierSignInTime
							: '';
					//END DATE
					list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
							: '';
					//END TIME
					list[i].cashierSignOutTime = (list[i].cashierSignOutTime != null && list[i].cashierSignOutTime != undefined) ? list[i].cashierSignOutTime
							: '';
					
				//list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? list[i].transactionNumber
						//	: '';
					//POS ID
					list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
							: '';
					//POS OP NAME
					list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
							: '';
					list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
							: '';
					//TRANSACTION RANGE
					list[i].startOfTransaction = (list[i].startOfTransaction != null && list[i].startOfTransaction != undefined) ? list[i].startOfTransaction
							: '';
					list[i].endOfTransaction = (list[i].endOfTransaction != null && list[i].endOfTransaction != undefined) ? list[i].endOfTransaction
							: '';
					
					/*list[i].cashierSignOffType = (list[i].cashierSignOffType != null && list[i].cashierSignOffType != undefined) ? Number(list[i].cashierSignOffType).toFixed(2)
					: '';
*/

					
					printTableContentOH += '<tr id="' + i + '" class=" parentTr ';
					printTableContentOH += '"><td class="leftValue" >'
							+ convertDate(list[i].calendarDayTo )
								+ '</td>';
					if(list[i].cashierSignInTime!= null && list[i].cashierSignInTime != undefined && list[i].cashierSignInTime != '')
						printTableContentOH += '<td class="centerValue  " >'+convertTime(list[i].cashierSignInTime)
								+ '</td>';
					else
						printTableContentOH	+= '<td class="leftValue  " >  '
						+ '</td>';
					printTableContentOH+= '<td class="leftValue  " >'+ convertDate(list[i].calendarDayTo )
								+ '</td>';
					if(list[i].cashierSignOutTime!= null && list[i].cashierSignOutTime != undefined && list[i].cashierSignOutTime != '')
						printTableContentOH += '<td class="centerValue  " >'+convertTime(list[i].cashierSignOutTime)
								+ '</td>';
					else
						printTableContentOH	+= '<td class="leftValue  " >  '
						+ '</td>';
								
					printTableContentOH	+= '<td class="centerValue" >'
								+ list[i].posNumber
								+ '</td>' 
								+ '<td class="leftValue">'
								+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
								+ '</td>'
								+ '<td class="centerValue" >'
								+ list[i].startOfTransaction + '-'+ list[i].endOfTransaction
								+ '</td></tr>';
								/*+ '<td class="leftValue " >'+list[i].cashierSignOffType
								+ '</td></tr>';*/


					

					if (i % 15 == 0 && i != (list.length - 1) && i != 0)
						printTableContentOH += '</tbody></table>' + printFoot
								+ printHead + ohTabHead;
					if (i == (list.length - 1))
						printTableContentOH += '</tbody></table>';

				}
				printContent = printHead + ohTabHead + printTableContentOH
						+ "</tbody></table>" + printFoot;

			}

		}

		if (options == 'priceMarkdown') {
			var z = 0;
			if (descList != null) {
				var list = descList;
				for ( var i = 0; i < list.length; i++) {
					// DATE
					//list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
					//		: '';
					// TIME
					list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
							: '';
					//Trans#
					list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
					list[i].transactionNumber
					: '';
				
					//POS ID
					list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
							: '';
					//POS OP NAME
					list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
							: '';
					list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
							: '';
					list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser : '';
					
					list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article : '';
					
					list[i].eanupc = (list[i].eanupc != null && list[i].eanupc != undefined) ? list[i].eanupc : '';
					
					list[i].articleT = (list[i].articleT != null && list[i].articleT != undefined) ? list[i].articleT : '';
					
					list[i].markdownQtySuom = (list[i].markdownQtySuom != null && list[i].markdownQtySuom != undefined) ? list[i].markdownQtySuom : '';
					
					
					
					list[i].reason = (list[i].reason != null && list[i].reason != undefined) ? list[i].reason : '';
					list[i].salesRetailInc = (list[i].salesRetailInc != null && list[i].salesRetailInc != undefined) ? Number(list[i].salesRetailInc).toFixed(2) : '';
					list[i].actualSalePrice = (list[i].actualSalePrice != null && list[i].actualSalePrice != undefined) ? Number(list[i].actualSalePrice).toFixed(2) : '';
					list[i].priceDifference = (list[i].priceDifference != null && list[i].priceDifference != undefined) ? list[i].priceDifference : '';
					list[i].perOfMarkdown = (list[i].perOfMarkdown != null && list[i].perOfMarkdown != undefined) ? list[i].perOfMarkdown : '';


			
						z++;
						printTableContentPM += '<tr id="' + i + '" class=" parentTr ';
						printTableContentPM += '"><td class="leftValue" >'
							+ convertDate(list[i].calendarDayT)
							+ '</td>';
							if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined && list[i].posTransactionTime !='#')
								printTableContentPM	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime) 
							+ '</td>';
							else
								printTableContentPM	+= '<td class="centerValue" >&nbsp;'
								+ '</td>';	
							printTableContentPM	+=  '<td class="centerValue" >'+list[i].transactionNumber
							+ '</td>'
							+ '<td class="centerValue" >'+list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue" >'
							+ list[i].posAuthoriser
							+ '</td>' 
							+ '<td class="centerValue">'
							+ list[i].article
							+ '</td>'
							+ '<td class="leftValue" >';
							if(list[i].eanupc != "#" && !isNaN(list[i].eanupc))
							{
								printTableContentPM += Number(list[i].eanupc);
							}
									else
										{
										printTableContentPM += list[i].eanupc;
										}
							printTableContentPM += '</td>'
							+ '<td class="leftValue" >'+list[i].articleT
							+ '</td>'
							+ '<td class="rightValue" >'+ Number(list[i].markdownQtySuom)
							+ '</td>'
							+ '<td class="leftValue" >'+list[i].reason
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].salesRetailInc
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].actualSalePrice
							+ '</td>'
							+ '<td class="rightValue" >'+Number(list[i].priceDifference).toFixed(2)
							+ '</td>'
							
							+ '<td class="rightValue lastColumn" >'+Number(list[i].perOfMarkdown).toFixed(2)
							+ '</td></tr>';

						if (z % 13 == 0 && i != (descList.length - 1) && z != 0)
							printTableContentPM += '</tbody></table>'
									+ printFoot + printHead + pricMarkHead;
						if (z == (descList.length))
							printTableContentPM += '</tbody></table>';
					

				}

				printContent = printHead + pricMarkHead + printTableContentPM
						+ "</tbody></table>" + printFoot;
			}
		}
		if (options == 'deptSales') {
			var s = 0;
			if (descList != null) {
				var list = descList;
				for ( var i = 0; i < list.length; i++) {
					
					list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
							: '';
					list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
							: '';
					list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
							list[i].transactionNumber
							: '';
					list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
							list[i].posNumber : '';
					list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
							list[i].cashierFirstName
							: '';
					list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
							list[i].cashierLastName
							: '';
				    list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? 
									list[i].posAuthoriser
									: '';
					list[i].department = (list[i].department != null && list[i].department != undefined) ? 
											list[i].department
											: '';
					list[i].departmentSale = (list[i].departmentSale != null && list[i].departmentSale != undefined) ? 
							list[i].departmentSale
							: '';
							
				
						
						/*if(list[i].departmentSale != 0)
						{
							*/
							printTableContentDST += '<tr  class=" parentTr "><td class="leftValue" >'
									+ convertDate(list[i].calendarDayTo) 
									+ '</td>';
									if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
										printTableContentDST += '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
									+ '</td>';
									else
										printTableContentDST += '<td class="centerValue" >&nbsp;'
										+ '</td>';
							printTableContentDST += '<td class="rightValue" >'+ list[i].transactionNumber
									+ '</td>'
									+ '<td class="rightValue " >'+ list[i].posNumber
									+ '</td>'
									+ '<td class="leftValue">'
									+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
									+ '</td>'
									+ '<td class="leftValue">'
									+ list[i].posAuthoriser
									+ '</td>'
									+ '<td class="leftValue">'
									+ list[i].department
									+ '</td>'
									+ '<td class="rightValue lastColumn" >'+ Number(list[i].departmentSale).toFixed(2)
									+ '</td></tr>';
							
							
					/*	}*/
						if (i % 16 == 0 && i != (list.length - 1) && i != 0)
							printTableContentDST += '</tbody></table>'
									+ printFoot + printHead + dstTabHead;
						if (i == (list.length ))
							printTableContentDST += '';
					
					

				}
				printTableContentDST += '<tr class=" parentTrPrintVal storeTotVal " >'
					+ '<td class="leftValue valueInfo ">Store Total</td>'
					+ '<td class=" centerValue valueInfo  "></td>'
					+ '<td class=" centerValue valueInfo  "></td>'
					+ '<td class=" centerValue    valueInfo"></td>'
					+ '<td class=" centerValue   valueInfo"></td>'
				
					+ '<td class=" centerValue   valueInfo"></td>'
					+ '<td class=" centerValue   valueInfo"></td>'
					
					
					+ '<td class=" rightValue   lastColumn totalPrint  valueInfo"></td>'
					+ '</tr>';
				
				
				printContent = printHead + dstTabHead + printTableContentDST
						+ "</tbody></table>" + printFoot;

			}
		}

		if (options == 'noSales') {

			if (descList != null) {

				var list = descList;
				for ( var i = 0; i < list.length; i++) {

					printTableContentNST  += '<tr class=" parentTr "><td class="leftValue" >'
						+ convertDate(list[i].calendarDayTo)
						+ '</td>';
					if( list[i].posTransactionTime_T != null)
					
					printTableContentNST += '<td class="centerValue" >'+ convertTime(list[i].posTransactionTime_T) 
						+ '</td>';
						else
							printTableContentNST += '<td class="centerValue" >&nbsp;' 
							+ '</td>';
					printTableContentNST +=  '<td class="rightValue " >'+ list[i].transactionNumber
						+ '</td>'
						+ '<td class="rightValue " >'+list[i].posNumber
						+ '</td>'
						+ '<td class="leftValue">'
						+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
						+ '</td>'
						+ '<td class="leftValue " >'+list[i].reason
						+ '</td></tr>';
					
					
					if (i % 16 == 0 && i != (descList.length - 1) && i != 0)
						printTableContentNST += '</tbody></table>' + printFoot
								+ printHead + nstTabHead;
					if (i == (descList.length - 1))
						printTableContentNST += '</tbody></table>';
				}
				printContent = printHead + nstTabHead + printTableContentNST
						+ "</tbody></table>" + printFoot;

			}
		}
		if (options == 'savedTrans') {
			var sa='';
			printTableContentST = '';
			if (descList != null) {

				var list = descList;
				for ( var i = 0; i < list.length; i++) {
					list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
							: '';
					list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
							: '';
					list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
							list[i].transactionNumber
							: '';
					list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
							list[i].posNumber : '';
					list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
							list[i].cashierFirstName
							: '';
					list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
							list[i].cashierLastName
							: '';
					list[i].savedTransAmount = (list[i].savedTransAmount != null && list[i].savedTransAmount != undefined) ? 
							list[i].savedTransAmount
							: '';

					
					
						flag = true;
						
						/*if(list[i].savedTransAmount != 0)
							{*/
							printTableContentST += '<tr id="' + i + '" class=" parentTr ';
						printTableContentST += '"><td class="centerValue" >'
								+ convertDate(list[i].calendarDayTo) 
								+ '</td>';
								if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
									printTableContentST	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
								+ '</td>';
								else
									printTableContentST	+= '<td class="centerValue" >&nbsp;'
									+ '</td>';
								printTableContentST += '<td class="rightValue" >'+ list[i].transactionNumber
								+ '</td>'
								+ '<td class="rightValue " >'+ list[i].posNumber
								+ '</td>'
								+ '<td class="leftValue">'
								+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
								+ '</td>'
								+ '<td class="rightValue " >'+ Number(list[i].savedTransAmount).toFixed(2)
								+ '</td></tr>';
								
								if (i % 15 == 0 && i != (list.length - 1) && i != 0)
									printTableContentST += '</tbody></table>' + printFoot
											+ printHead + stTabHead;
								if (i == (list.length ))
									printTableContentST += '</tbody></table>'+printFoot;
					//}

					

				}
				printContent = printHead + stTabHead + printTableContentST
						+ "</tbody></table>" + printFoot;

			}

		}

		if (options == 'soldOver') {
			var so = 0;
			if (descList != null) {

				var list = descList;
				for ( var i = 0; i < list.length; i++) {
					
					list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
							: '';
					// TIME
					list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
							: '';
					//Trans#
					list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
					list[i].transactionNumber
					: '';
				
					//POS ID
					list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
							: '';
					//POS OP NAME
					list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
							: '';
					list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
							: '';
					list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser : '';
					
					list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article : '';
					
					/*list[i].ean_upc = (list[i].ean_upc != null && list[i].ean_upc != undefined) ? list[i].ean_upc : '';*/
					
					list[i].article_T = (list[i].article_T != null && list[i].article_T != undefined) ? list[i].article_T : '';
					
					list[i].soldOverAmount = (list[i].soldOverAmount != null && list[i].soldOverAmount != undefined) ? list[i].soldOverAmount : '';
					
					
					//Total--SoldOverRestricted Qty Amount have to map
					list[i].soldOverQty = (list[i].soldOverQty != null && list[i].soldOverQty != undefined) ? list[i].soldOverQty : '';


					
						/*if(list[i].soldOverQty !=0)
							{*/
							so++;
							printTableContentSORQ += '<tr id="' + i + '" class=" parentTr parentTrPrint ';
						printTableContentSORQ += '"><td class="leftValue" >'
								+ convertDate(list[i].calendarDayTo) 
								+ '</td>';
								if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
									printTableContentSORQ	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
								+ '</td>';
								else
									printTableContentSORQ	+= '<td class="centerValue" >&nbsp;'
									+ '</td>';	
								printTableContentSORQ	+=  '<td class="rightValue" >'+list[i].transactionNumber
								+ '</td>'
								+ '<td class="rightValue" >'+list[i].posNumber
								+ '</td>'
								+ '<td class="leftValue">'
								+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
								+ '</td>'
								+ '<td class="leftValue" >'
								+ list[i].posAuthoriser
								+ '</td>' 
								+ '<td class="centerValue">'
								+ list[i].article
								+ '</td>'
								/*+ '<td class="leftValue" >'+list[i].ean_upc
								+ '</td>'*/
								+ '<td class="leftValue" >'+list[i].article_T
								+ '</td>'
								+ '<td class="rightValue" >'+Number(list[i].soldOverQty).toFixed(0)
								+ '</td>'
								+ '<td class="rightValue lastColumn soldOverAmt" >'+Number(list[i].soldOverAmount).toFixed(2)
								+ '</td></tr>';

					
						if (so % 16 == 0 && i != (descList.length - 1)
								&& so != 0)
							printTableContentSORQ += '</tbody></table>'
									+ printFoot + printHead + soqTabHead;
						if (so == (descList.length))
							printTableContentSORQ += '';
						
					//}

				}
				printHead = printHeadSORQ;
				printTableContentSORQ += '<tr class=" parentTrPrintVal storeTotVal ">'
					+ '<td class="centerValue valueInfo "></td>'
					+ '<td class=" centerValue valueInfo  "></td>'
					+ '<td class=" centerValue valueInfo  "></td>'
					+ '<td class=" centerValue    valueInfo"></td>'
					+ '<td class=" centerValue   valueInfo"></td>'
					/*+ '<td class=" centerValue   valueInfo"></td>'*/
					+ '<td class=" centerValue   valueInfo"></td>'
					+ '<td class=" centerValue   valueInfo"></td>'
					+ '<td class=" centerValue   valueInfo"></td>'
					+ '<td class=" leftValue   valueInfo">Total</td>'
					+ '<td class=" rightValue  soldOverTot1 lastColumn valueInfo"></td>'
					+ '</tr>';
				
				printContent = printHead + soqTabHead + printTableContentSORQ
						+ "</tbody></table>" + printFoot;
				

			}
		
		}

		$('#printbody').html('').append(printContent).append(
				'<link rel="stylesheet" href="../../styles/printstyle.css" />');
		
		sortPrintVal();
	}
	
}

function operatorLocation(data, pageNumber) {
	$('.operFilterHdr').remove();

	// var selectOptions = $('#reportType option:selected').text();
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getOperatorLocationHistory.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {
			setReportGenerationFlags();
			prevRes=response;
			formOpeartorLocationContent(response, '');
			//bindOpertorLocFilter();
			//stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}

function priceMarkdown(data, pageNumber) {
	$('.priceFillterHdr').remove();
	// var selectOptions = $('#reportType option:selected').text();
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getPriceMarkDown.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {

			setReportGenerationFlags();
			formPriceMarkdownContent(response, '');
			//printReportPriceMarkdown();
			prevRes = response;
			filterPriceMarkdown();

			//stopLoading();
			$.loader('close');
			setScrollerPosition($("#sortTableMarkDown"), $("#previous-column"), $("#next-column"));
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}

function noSales(data) {
	$('.nosalesFillterHdr').remove();
	// var selectOptions = $('#reportType option:selected').text();
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getNoSales.htm",
		data : data,
		beforeSend : function() {
			startLoading();
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {

			 
			setReportGenerationFlags();
					formnoSalesTransactionContent(response, '');
					prevRes=response;
					filternoSales();
					//printReport();
				
			stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			stopLoading();// goToLogin();
		}
	});

}
function departSaleTransaction(data) {
	$('.deptFillterHdr').remove();
	
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getDepartSaleTransac.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
		//alert('test : ');
			fullScreenLoader();
			// hideAllocationTbl();
		},
		success : function(response) {
			setReportGenerationFlags();
			//$( "#deptFilterClear" ).trigger( "click" );
				formDepartSaleTransacContent(response, '');
			
				filterFunc();
			
				prevRes = response;

				 
			//stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
			//stopLoading();// goToLogin();
		}
	});

}

function formDepartSaleTransacContent(response, value) {

	var savedTransaction = '';
	var msg = '';
	var output = '';
	
	var deptDate='';
	var deptTime='';
	var deptTran='';
	var deptPoso='';
	var deptPosi='';
	var deptAuth='';
	var deptDept='';
	var deptTot='';
	
	if($('.deptFillterHdr')!=undefined && $('.deptFillterHdr').length>0 && !$('.deptaFillterHdr').hasClass('hideBlock')){
		deptDate=$('.deptDate').val().toUpperCase();
		deptTime=$('.deptTime').val().toUpperCase();
		deptTran=$('.deptTran').val().toUpperCase();
		deptPoso=$('.deptPoso').val().toUpperCase();
		deptPosi=$('.deptPosi').val().toUpperCase();
		deptAuth=$('.deptAuth').val().toUpperCase();
		deptDept=$('.deptDept').val().toUpperCase();
		deptTot=$('.deptTot').val().toUpperCase();
		
	}
	output = $.parseJSON(response);
	savedTransaction = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var s=0;
	var j=1;
	var k=1;
	var flag = false;
	var noRec = 0;

	if (msg != undefined && msg != null && !isNaN(msg)
			&& savedTransaction != null && savedTransaction != undefined&& !(savedTransaction.length==1 
			&&  (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber=='') ) ) {
		setReportGenerationFlags();
		recordCount = savedTransaction.length;

		if (savedTransaction != null) {

			var list = savedTransaction;
			for ( var i = 0; i < list.length; i++) {
				list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
						: '';
				list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
						: '';
				list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
						list[i].transactionNumber
						: '';
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
						list[i].posNumber : '';
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
						list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
						list[i].cashierLastName
						: '';
			    list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? 
								list[i].posAuthoriser
								: '';
				list[i].department = (list[i].department != null && list[i].department != undefined) ? 
										list[i].department
										: '';
				list[i].departmentSale = (list[i].departmentSale != null && list[i].departmentSale != undefined) ? 
						list[i].departmentSale
						: '';

				if ((convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
						deptDate) != -1 
						&& (convertTime(list[i].posTransactionTime)==undefined ? '': convertTime(list[i].posTransactionTime) ).indexOf(
								deptTime) != -1
						&& list[i].transactionNumber.toUpperCase().indexOf(
								deptTran) != -1
						&& (Number(list[i].posNumber).toFixed(0).toUpperCase().indexOf(deptPosi) != -1)
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(deptPoso) != -1
						&& list[i].posAuthoriser.toUpperCase().indexOf(deptAuth) != -1
						&& list[i].department.toUpperCase().indexOf(deptDept) != -1
						&& list[i].departmentSale.toUpperCase().indexOf(deptTot) != -1)

				{
					noRec++;
					flag = true;
					s++;
					/*if(list[i].departmentSale != 0)
						{*/
					content += '<tr id="' + i + '" class=" parentTr page-' + k;
					if (j > 10)
						content += ' hideBlock "';
					content += '"><td class="leftValue" >'
							+ convertDate(list[i].calendarDayTo) 
							+ '</td>';
							if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined)
								content	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime)
							+ '</td>';
							else
								content	+= '<td class="centerValue" >&nbsp;'
								+ '</td>';
							content	+= '<td class="rightValue" >'+ list[i].transactionNumber
							+ '</td>'
							+ '<td class="rightValue " >'+ list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].posAuthoriser
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].department
							+ '</td>'
							+ '<td class="rightValue lastColumn" >'+ Number(list[i].departmentSale).toFixed(2)
							+ '</td></tr>';
				/*}*/
					
				}
				
				if (j % 10 == 0) {
					k++;
				}
				j++;

			}
			artclSldByDeptTotPages = Math.ceil(noRec/10);
		}
		var tot ='';
		tot+='<tr class="totVal ">'
		+'<td class="columnDivider valueInfo storeNdsub " colspan="7">Store Total</td>'
		+'<td class="numberColumn lastColumn valueInfo total"></td>'
	+'</tr>';
		$('.deptSalesTable tbody:first').html('');
		$('.deptSalesTable tbody:first').append(content);
		showContentDepartmentSaleBlock();
		// convertDate();
		// convertTime();
		//pagenationCallbackMethod();
		
		/*$('.deptSalesTable tbody tr:last').append('<tr class="totVal ">'
				+'<td class="columnDivider valueInfo storeNdsub " colspan="7">Store Total</td>'
				+'<td class="numberColumn lastColumn valueInfo total"></td>'
			+'</tr>');*/
		
		
		if (flag) {
			deptSalespdateSortPlugin();
			
			setTimeout(function() {
				$("#deptSaleTranAttr").val('');
				// set sorting column and direction, this will sort on the first
				var authorizedByColIdx = 5;
				var sorting = [[ authorizedByColIdx, 0 ] ];
				// sort on the first column
				$(".deptSalesTable").trigger("sorton", [ sorting ]);
				/*var obj = $("#treeTable").children("thead").children("tr");
				var authorizedByCol = obj.children("th:nth-child("+(authorizedByColIdx+1)+")");
				updateSortAtrDtl(authorizedByCol,$("#deptSaleTranAttr"));*/
				
			}, 30);
			
		} else {
			$('.'+$(".deptSalesTable").attr('data-user_id')).addClass('hideBlock');
			pagenationCallbackMethod(1);
		}
		
		
	} else {
		if (msg == 'null'  ||  msg == NDF)
			showWarning(NDF);
		else if(msg=='' ||(  savedTransaction!=null && savedTransaction!=undefined && savedTransaction.length>0 && (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber =='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".deptSalesTable .parentTr").highlight(value);
		$(".deptSalesTable .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".deptSalesTable .parentTr").unhighlight();}*/
}

function formOpeartorLocationContent(response, value) {

	var calendarDayTo='';
	var cashierSignInTime='';
	var calendarDayToEnd='';
	var cashierSignOutTime='';
	var posNumber='';
	var cashierName='';
	var startEndTrans='';
	var cashierSignOffType='';
	
	
	if($('.operFilterHdr')!=undefined && $('.operFilterHdr').length>0 && !$('.operFilterHdr').hasClass('hideBlock')){
		calendarDayTo=$('.calendarDayTo').val().toUpperCase();
		cashierSignInTime=$('.cashierSignInTime').val().toUpperCase();
		calendarDayToEnd=$('.calendarDayToEnd').val().toUpperCase();
		cashierSignOutTime=$('.cashierSignOutTime').val().toUpperCase();
		posNumber=$('.posNumber').val().toUpperCase();
		cashierName=$('.cashierName').val().toUpperCase();
		startEndTrans=$('.startEndTrans').val().toUpperCase();
		//cashierSignOffType=$('.cashierSignOffType').val().toUpperCase();
		
		
	}
	var savedTransaction = '';
	var msg = '';
	var output = '';

	output = $.parseJSON(response);
	savedTransaction = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var flag = false;

	if (msg != undefined && msg != null && !isNaN(msg)
			&& savedTransaction != null && savedTransaction != undefined&& !(savedTransaction.length==1 
			&&  (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber=='') ) ) {
		recordCount = savedTransaction.length;

		if (savedTransaction != null) {

			var list = savedTransaction;
			for ( var i = 0; i < list.length; i++) {
				//START DATE
				list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
						: '';
				//START TIME
				list[i].cashierSignInTime = (list[i].cashierSignInTime != null && list[i].cashierSignInTime != undefined) ? list[i].cashierSignInTime
						: '';
				//END DATE
				//list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
				//		: '';
				//END TIME
				list[i].cashierSignOutTime= (list[i].cashierSignOutTime != null && list[i].cashierSignOutTime != undefined) ? list[i].cashierSignOutTime
						: '';
				
			//list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? list[i].transactionNumber
					//	: '';
				//POS ID
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
						: '';
				//POS OP NAME
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
						: '';
				//TRANSACTION RANGE
				list[i].startOfTransaction = (list[i].startOfTransaction != null && list[i].startOfTransaction != undefined) ? list[i].startOfTransaction
						: '';
				list[i].endOfTransaction = (list[i].endOfTransaction != null && list[i].endOfTransaction != undefined) ? list[i].endOfTransaction
						: '';
				
				/*list[i].cashierSignOffType = (list[i].cashierSignOffType != null && list[i].cashierSignOffType != undefined) ? Number(list[i].cashierSignOffType).toFixed(2)
				: '';*/

					

					if ((convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
							calendarDayTo) != -1 
							&& (convertTime(list[i].cashierSignInTime)==undefined ? '': convertTime(list[i].cashierSignInTime) ).indexOf(
									cashierSignInTime) != -1
									&& (convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
											calendarDayToEnd) != -1 
											
							&& (convertTime(list[i].cashierSignOutTime)==undefined ? '': convertTime(list[i].cashierSignOutTime) ).indexOf(
									cashierSignOutTime) != -1
							&& list[i].posNumber.toUpperCase().indexOf(
									posNumber) != -1
							
							&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(cashierName) != -1
							&& (list[i].startOfTransaction.toUpperCase()+' '+list[i].endOfTransaction.toUpperCase()).indexOf(startEndTrans) != -1)
							/*&& list[i].cashierSignOffType.toUpperCase().indexOf(
									cashierSignOffType) != -1*/
						{
					flag = true;
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="leftValue" >'
						+ convertDate(list[i].calendarDayTo )
							+ '</td>';
							if(list[i].cashierSignInTime!= null && list[i].cashierSignInTime != undefined && list[i].cashierSignInTime != '')
								content += '<td class="centerValue  " >'+convertTime(list[i].cashierSignInTime)
										+ '</td>';
							else
								content	+= '<td class="leftValue  " >  '
								+ '</td>';
					content+= '<td class="leftValue  " >'+ convertDate(list[i].calendarDayTo )
										+ '</td>';
							if(list[i].cashierSignOutTime!= null && list[i].cashierSignOutTime != undefined && list[i].cashierSignOutTime != '')
								content += '<td class="centerValue  " >'+convertTime(list[i].cashierSignOutTime)
										+ '</td>';
							else
								content	+= '<td class="leftValue  " >   '
								+ '</td>';
							content+= '<td class="centerValue" >'
							+ list[i].posNumber
							+ '</td>' 
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="centerValue" >'
							+ list[i].startOfTransaction + '-'+ list[i].endOfTransaction
							+ '</td></tr>';
							/*+ '<td class="leftValue " >'+list[i].cashierSignOffType
							+ '</td></tr>'*/


				}

			}
		}
		$('.operatorTable tbody:first').html('');
		$('.operatorTable tbody:first').append(content);
		showContentOperatorLocationBlock();
		if (flag) {
			operatorupdateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 5, 0 ] ];
				// sort on the first column
				$(".operatorTable").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.'+$(".operatorTable").attr('data-user_id')).addClass('hideBlock');
		}
	} else {
		if (msg == 'null' || msg == NDF)
			showWarning(NDF);
		else if(msg=='' ||(  savedTransaction!=null && savedTransaction!=undefined && savedTransaction.length>0 && (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber =='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".operatorTable .parentTr").highlight(value);
		$(".operatorTable .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".operatorTable .parentTr").unhighlight();}*/
}

function formPriceMarkdownContent(response,value) {

	var savedTransaction = '';
	var msg = '';
	var output = '';

	var priceDate='';
	var priceTime='';
	var priceTran='';
	var pricePoso='';
	var pricePosi='';
	var priceAuth='';
	var priceArtn='';
	/*var priceEan='';*/
	var priceArtd='';
	var priceQty='';
	var priceReas='';
	var priceRetp='';
	var priceTot='';
	var pricePricd='';
	var pricePerc='';
	

	if($('.priceillterHdr')!=undefined && $('.priceFillterHdr').length>0 && !$('.priceFillterHdr').hasClass('hideBlock')){
		priceDate=$('.priceDate').val().toUpperCase();
		priceTime=$('.priceTime').val().toUpperCase();
		priceTran=$('.priceTran').val().toUpperCase();
		pricePoso=$('.pricePoso').val().toUpperCase();
		pricePosi=$('.pricePosi').val().toUpperCase();
		priceAuth=$('.priceAuth').val().toUpperCase();
		priceArtn=$('.priceArtn').val().toUpperCase();
		/*priceEan=$('.priceEan').val().toUpperCase();*/
		priceArtd=$('.priceArtd').val().toUpperCase();
		priceQty=$('.priceQty').val().toUpperCase();
		priceReas=$('.priceReas').val().toUpperCase();
		priceRetp=$('.priceRetp').val().toUpperCase();
		priceTot=$('.priceTot').val().toUpperCase();
		pricePricd=$('.pricePricd').val().toUpperCase();
		pricePerc=$('.pricePerc').val().toUpperCase();
	}
	output = $.parseJSON(response);
	savedTransaction = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var flag = false;

	if (msg != undefined && msg != null && !isNaN(msg)
			&& savedTransaction != null && savedTransaction != undefined&& !(savedTransaction.length==1 
			&&  (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber=='') ) ) {
		recordCount = savedTransaction.length;
		setReportGenerationFlags();

		if (savedTransaction != null) {
			
			var list = savedTransaction;
			for ( var i = 0; i < list.length; i++) {
				// DATE
				list[i].calendarDayT = (list[i].calendarDayT != null && list[i].calendarDayT != undefined) ? list[i].calendarDayT
						: '';
				// TIME
				list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
						: '';
				//Trans#
				list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
				list[i].transactionNumber
				: '';
			
				//POS ID
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
						: '';
				//POS OP NAME
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
						: '';
				list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser : '';
				
				list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article : '';
				
				/*list[i].eanupc = (list[i].eanupc != null && list[i].eanupc != undefined) ? list[i].eanupc : '';*/
				
				list[i].articleT = (list[i].articleT != null && list[i].articleT != undefined) ? list[i].articleT : '';
				
				list[i].markdownQtySuom = (list[i].markdownQtySuom != null && list[i].markdownQtySuom != undefined) ?
						Number(list[i].markdownQtySuom) : '';
				
				
				
				list[i].reason = (list[i].reason != null && list[i].reason != undefined) ? list[i].reason : '';
				list[i].salesRetailInc = (list[i].salesRetailInc != null && list[i].salesRetailInc != undefined) ? Number(list[i].salesRetailInc).toFixed(2) : '';
				list[i].actualSalePrice = (list[i].actualSalePrice != null && list[i].actualSalePrice != undefined) ? Number(list[i].actualSalePrice).toFixed(2) : '';
				list[i].priceDifference = (list[i].priceDifference != null && list[i].priceDifference != undefined) ?
						Number(list[i].priceDifference).toFixed(2) : '';
				list[i].perOfMarkdown = (list[i].perOfMarkdown != null && list[i].perOfMarkdown != undefined) ? 
						Number(list[i].perOfMarkdown).toFixed(2) : '';

				if ((convertDate(list[i].calendarDayT)==undefined ? '': convertDate(list[i].calendarDayT) ).indexOf(
						priceDate) != -1 
						&& (convertTime(list[i].posTransactionTime)==undefined ? '': convertTime(list[i].posTransactionTime) ).indexOf(
								priceTime) != -1 
						&& list[i].transactionNumber.toUpperCase().indexOf(
								priceTran) != -1
						&& list[i].posNumber.toUpperCase().indexOf(
								pricePosi) != -1
										
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(pricePoso) != -1
								
						&& list[i].posAuthoriser.toUpperCase().indexOf(
								priceAuth) != -1
						&& list[i].article.toUpperCase().indexOf(
								priceArtn) != -1
						/*&& list[i].eanupc.toUpperCase().indexOf(
								priceEan) != -1*/
						&& list[i].articleT.toUpperCase().indexOf(
								priceArtd) != -1
						&& list[i].markdownQtySuom.toString().toUpperCase().indexOf(
								priceQty) != -1
																
					  && list[i].reason.toUpperCase().indexOf(priceReas) != -1
					  && list[i].salesRetailInc.toUpperCase().indexOf(priceRetp) != -1
					  && list[i].actualSalePrice.toUpperCase().indexOf(priceTot) != -1
					  && list[i].priceDifference.toUpperCase().indexOf(pricePricd) != -1
					  && list[i].perOfMarkdown.toUpperCase().indexOf(pricePerc) != -1
						
					 
						)

				{
					
					if($("#priceFilterClear").hasClass("hideBlock")){
						filterFlag=true;
						//console.log("FilterFlaginside IF--"+filterFlag);
						$(".filterFlag").val(filterFlag);
						
					}
					else
						{
						//console.log("FilterFlaginside ELSE--"+filterFlag);
						filterFlag=false;
						$(".filterFlag").val(filterFlag);
						}
					
					flag = true;
				
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '">';
					if(list[i].calendarDayT != null && list[i].calendarDayT !=undefined  && list[i].calendarDayT !=" ")
					content += '<td class="leftValue" >';
					/*if(filterFlag!= true)content+='<input type="hidden" class="calPrint" name="calPrint" value="'+ convertDate(list[i].calendarDayT) +'"/>' ;*/
							content+= convertDate(list[i].calendarDayT)
							+ '</td>';
							if(list[i].posTransactionTime != null && list[i].posTransactionTime !=undefined  && list[i].posTransactionTime !="#")
								content	+= '<td class="leftValue" >';
							/*if(filterFlag!= true)content+='<input type="hidden" class="posTransacPrint" name="posTransacPrint" value="'+ convertTime(list[i].posTransactionTime) +'"/>' ;*/
							content+=convertTime(list[i].posTransactionTime) 
							+ '</td>';
							content	+=  '<td class="centerValue" >'+list[i].transactionNumber
							+ '</td>'
							+ '<td class="centerValue" >'+list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue" >'
							+ list[i].posAuthoriser
							+ '</td>' 
							+ '<td class="centerValue">';
							/*if(filterFlag!= true)content+='<input type="hidden" class="articleNoPrint" name="articleNoPrint" value="'+ list[i].article +'"/>' ;*/
							content+= list[i].article
							+ '</td>'
							/*+ '<td class="leftValue" >';
							if(list[i].eanupc != "#" && !isNaN(list[i].eanupc))
							{
								content += Number(list[i].eanupc);
							}
									else
										{
										content += list[i].eanupc;
										}
							content+= '</td>'*/
							+ '<td class="leftValue" >'+list[i].articleT
							+ '</td>'
							+ '<td class="rightValue" >'+ Number(list[i].markdownQtySuom)
							+ '</td>'
							+ '<td class="leftValue" >'+list[i].reason
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].salesRetailInc
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].actualSalePrice
							+ '</td>'
							+ '<td class="rightValue" >'+list[i].priceDifference
							+ '</td>'
							
							+ '<td class="rightValue lastColumn" >'+list[i].perOfMarkdown
							+ '</td></tr>';

						
				}

			}
		}
		$('.priceMarkdownTabl tbody:first').html('');
		$('.priceMarkdownTabl tbody:first').append(content);
		showContentPriceMarkdownBlock();
		if (flag) {
			priceMarkdownupdateSortPlugin();
			setTimeout(function() {
				$("#priceMarkAttr").val("calendarDayT,date,asc,first,posTransactionTime,time,asc,first");
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ] ,[1, 0]];
				// sort on the first column
				$(".priceMarkdownTabl").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.'+$(".priceMarkdownTabl").attr('data-user_id')).addClass('hideBlock');
		}
	} else {
		if (msg == 'null' || msg == NDF)
			showWarning(NDF);
		else if(msg=='' ||(  savedTransaction!=null && savedTransaction!=undefined && savedTransaction.length>0 && (savedTransaction[0].posNumber== null || savedTransaction[0].posNumber==undefined || savedTransaction[0].posNumber =='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".priceMarkdownTabl .parentTr").highlight(value);
		$(".priceMarkdownTabl .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".priceMarkdownTabl .parentTr").unhighlight();}*/
}


function showContentOperatorLocationBlock() {
	$('.operatorHistory').removeClass('hideBlock');
	$('.operatorHistory table').removeClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.operatorTable').find('tr :first').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	
	// $('#resultContent h4 span').html('Total
	// <strong>'+$('.parentTr').length+'</strong> allocation found');
}
function showSoldOverQtyContentBlock() {
	$('.soldOver').removeClass('hideBlock');
	$('.soldOver table').removeClass('hideBlock');
	$('.soldOverTable').find('tr :first').removeClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	// $('#resultContent h4 span').html('Total
	// <strong>'+$('.parentTr').length+'</strong> allocation found');
}
function showSavedTransacContentBlock() {

	$('.savedTrans').removeClass('hideBlock');
	$('.savedTrans table').removeClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.savedTransac').find('tr :first').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	// $('#resultContent h4 span').html('Total
	// <strong>'+$('.parentTr').length+'</strong> allocation found');
}
function showContentPriceInquiryBlock() {
	$('.priceInquiry').removeClass('hideBlock');
	$('.priceInquiry table').removeClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	//$('.operatorHistory table').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.operatorTable').find('tr :first').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	
	// $('#resultContent h4 span').html('Total
	// <strong>'+$('.parentTr').length+'</strong> allocation found');
}

function formnoSalesTransactionContent(response, value) {
	var departSaleTransac = '';
	var msg = '';
	var output = '';
	var content = '';
	
	var nosalesDate='';
	var nosalesTime='';
	var nosalesTran='';
	var nosalesPoso='';
	var nosalesPosi='';
	var nosalesReas='';
	
	if($('.nosalessFillterHdr')!=undefined && $('.nosalesFillterHdr').length>0 && !$('.nosalesFillterHdr').hasClass('hideBlock')){
		nosalesDate=$('.nosalesDate').val().toUpperCase();
		nosalesTime=$('.nosalesTime').val().toUpperCase();
		nosalesTran=$('.nosalesTran').val().toUpperCase();
		nosalesPoso=$('.nosalesPoso').val().toUpperCase();
		nosalesPosi=$('.nosalesPosi').val().toUpperCase();
		nosalesReas=$('.nosalesReas').val().toUpperCase();
		
	}
	output = $.parseJSON(response);
	departSaleTransac = output.data;
	msg = output.msg;

	recordCount = msg;
	currentPage = 1;

	if (msg != undefined && !isNaN(msg) && departSaleTransac != null && departSaleTransac!=undefined&& !(departSaleTransac.length==1 
			&&  (departSaleTransac[0].posNumber== null || departSaleTransac[0].posNumber==undefined || departSaleTransac[0].posNumber=='') ) ) {
		recordCount = departSaleTransac.length;
		if (departSaleTransac != null) {

			var list = departSaleTransac;
			for ( var i = 0; i < list.length; i++) {
				list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
						: '';
				list[i].posTransactionTime_T =(list[i].posTransactionTime_T != null && list[i].posTransactionTime_T != undefined) ? list[i].posTransactionTime_T
						: '';
				list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
						list[i].transactionNumber
						: '';
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
						list[i].posNumber : '';
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
						list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
						list[i].cashierLastName
						: '';
				list[i].reason = (list[i].reason != null && list[i].reason != undefined) ? 
						list[i].reason
						: '';

				if ((convertDate(list[i].calendarDayTo)==undefined ? '': convertDate(list[i].calendarDayTo) ).indexOf(
						nosalesDate) != -1 
						&& (convertTime(list[i].posTransactionTime_T)==undefined ? '': convertTime(list[i].posTransactionTime_T) ).indexOf(
								nosalesTime) != -1
						&& list[i].transactionNumber.toUpperCase().indexOf(
								nosalesTran) != -1
						&& list[i].posNumber.toUpperCase().indexOf(nosalesPosi) == 0
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(nosalesPoso) != -1
						&& list[i].reason.toUpperCase().indexOf(nosalesReas) != -1)

				{
					flag = true;
					
					if($("#nosalesFilterClear").hasClass("hideBlock")){
						filterFlag=true;
						
						$(".filterFlag").val(filterFlag);
						
					}
					else
						{
						
						filterFlag=false;
						$(".filterFlag").val(filterFlag);
						}
					content += '<tr id="' + i + '" class=" parentTr ';
					content += '"><td class="leftValue" >'
							+ convertDate(list[i].calendarDayTo) 
							+ '</td>';
					if(list[i].posTransactionTime_T != null && list[i].posTransactionTime_T !=undefined)
						content	+= '<td class="centerValue" >'+convertTime(list[i].posTransactionTime_T)
					+ '</td>';
					else
						content	+= '<td class="centerValue" >&nbsp;'
						+ '</td>';
							
					content	+='<td class="rightValue" >'+ list[i].transactionNumber
							+ '</td>'
							+ '<td class="rightValue " >'+ list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue " >'+ list[i].reason
							+ '</td></tr>';
				}

			}
		}
		
		$('#treeTableNoSalesTransaction tbody:first').html('');
		$('#treeTableNoSalesTransaction tbody:first').append(content);
		
		showContentNoSalesBlock();
		if (flag) {
			noSalesTransupdateSortPlugin();
			setTimeout(function() {
				$("#noSalesAttr").val("calendarDayTo,string,asc,first,cashierName,string,asc,first");
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ],  [ 4, 0 ] ];
				// sort on the first column
				$(".noSalestrans").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.paginationDiv ').addClass('hideBlock');
		}
	} else {
		if (msg == 'null' || msg == NDF )
			showWarning(NDF);
		else if(msg=='' ||(  departSaleTransac!=null && departSaleTransac!=undefined && departSaleTransac.length>0 && (departSaleTransac[0].posNumber== null || departSaleTransac[0].posNumber==undefined || departSaleTransac[0].posNumber=='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".noSalestrans .parentTr").highlight(value);
		$(".noSalestrans .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".noSalestrans .parentTr").unhighlight();}*/
}
function showContentNoSalesBlock() {
	$('.noSales').removeClass('hideBlock');
	$('.noSales table').removeClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.noSalestrans').find('tr :first').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	// $('#resultContent h4 span').html('Total
	// <strong>'+$('.parentTr').length+'</strong> allocation found');
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

function showContent(count) {
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {
	$('.soldOver').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	//$('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
	hideContent();
	$('.operatorHistory').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
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
function filterOperLocation() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.operatorTable  .textbox').unbind('keyup');
	$('.operatorTable  .textbox').keyup(function() {
		value = $(this).val().trim();
		
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
				formOpeartorLocationContent(prevRes, value.toUpperCase());

			$('.treetable').find('tr :first').removeClass('hideBlock');
		}, 500);

	});
}

function filterPriceMarkdown() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.priceMarkdownTabl  .textbox').unbind('keyup');
	$('.priceMarkdownTabl  .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
				formPriceMarkdownContent(prevRes, value.toUpperCase());
			$('.priceMarkdownTabl ').find('tr :first').removeClass('hideBlock');
		}, 500);

	});
}
function filterPriceInquiry() {
	var value = '';
	var timeout = '';
	//console.log('search');
	$('.priceInquiryTable  .textbox').unbind('keyup');
	$('.priceInquiryTable  .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}
		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			parsePriceInquiry(prevRes, value.toUpperCase());
			$('.priceInquiryTable ').find('tr :first').removeClass('hideBlock');
		}, 500);

	});
}
/*
 * function convertDate() { $('.dates').filter( function() { var temp =
 * $(this).text().trim(); if (temp != '') { var time = temp.replace('/',
 * '').replace('/', '').replace( '(', '').replace(')', '').split('Date')[1]; var
 * today = new Date(); today.setTime(time); // var today = new Date(); var
 * newDate = today.getDate(); var newMonth = today.getMonth() + 1; if (newDate <
 * 10) { newDate = '0' + newDate; } if (newMonth < 10) { newMonth = '0' +
 * newMonth; } $(this).text( (newDate + "/" + (newMonth) + "/" + today
 * .getFullYear()));
 *  } });
 *  }
 */

/*
 * function convertTime() { $('.time').filter( function() { var temp =
 * $(this).text().trim(); var date = new Date(parseInt(temp.substr(6)));
 * 
 * if (temp != '') { var time = temp.replace('/', '').replace('/', '').replace(
 * '(', '').replace(')', '').split('Date')[1]; var today = new Date();
 * today.setTime(time); // var today = new Date(); var newHour =
 * today.getHours(); var newMinu = today.getMinutes(); if (newHour < 10) {
 * newHour = '0' + newHour; } if (newMinu < 10) { newMinu = '0' + newMinu; }
 * $(this).text((newHour + ":" + newMinu));
 *  } });
 *  }
 */

function filterSoldOver() {

	var value = '';
	var timeout = '';
	console.log('search');
	$('.soldOverTable .textbox').unbind('keyup');
	$('.soldOverTable .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			formSoldOverTransacQtyContent(prevRes, value.toUpperCase());
			$('.soldOverTable').find('tr :first').removeClass('hideBlock');
		}, 500);

	});

}

function filterFunc() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.deptSalesTable .textbox').unbind('keyup');
	$('.deptSalesTable .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
				formDepartSaleTransacContent(prevRes, value.toUpperCase());
			$('.deptSalesTable').find('tr :first').removeClass('hideBlock');
		}, 500);

	});
}
function filternoSales() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.noSalestrans .textbox').unbind('keyup');
	$('.noSalestrans .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
				formnoSalesTransactionContent(prevRes, value.toUpperCase());
			$('.noSalestrans').find('tr :first').removeClass('hideBlock');
		}, 500);

	});
}

function showContentDepartmentSaleBlock() {
	$('.ContentTableWrapperError').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.deptSales').removeClass('hideBlock');
	$('.deptSales table').removeClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.deptSalesTable').find('tr :first').removeClass('hideBlock');
}
function showContentPriceMarkdownBlock() {

	$('.soldOver').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');

	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.operatorHistory').addClass('hideBlock');
	$('.priceMarkdown').removeClass('hideBlock');
	$('.priceMarkdown table').removeClass('hideBlock');
	$('.priceInquiry').addClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function convertDate1() {
	$('.dates1').filter(
			function() {
				var temp = $(this).text().trim();
				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
					var newDate = today.getDate();
					var newMonth = today.getMonth() + 1;
					if (newDate < 10) {
						newDate = '0' + newDate;
					}
					if (newMonth < 10) {
						newMonth = '0' + newMonth;
					}
					$(this).text(
							(newDate + "/" + (newMonth) + "/" + today
									.getFullYear()));

				}
			});

}

function convertTime1() {
	$('.time1').filter(
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

function convertOperDate() {
	$('.nullValue').filter(
			function() {
				var temp = $(this).text().trim();
				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
					var newDate = today.getDate();
					var newMonth = today.getMonth() + 1;
					if (newDate < 10) {
						newDate = '0' + newDate;
					}
					if (newMonth < 10) {
						newMonth = '0' + newMonth;
					}
					$(this).text(
							(newDate + "/" + (newMonth) + "/" + today
									.getFullYear()));

				}
			});

}

function convertOperTime() {
	$('.nullValue').filter(
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

function savedTransupdateSortPlugin() {
	$(".savedTransac").trigger("update");
}

function noSalesTransupdateSortPlugin() {
	$(".noSalestrans").trigger("update");
}
function soldupdateSortPlugin() {
	$(".soldOverTable").trigger("update");
}
function deptSalespdateSortPlugin() {
	$(".deptSalesTable").trigger("update");
}
function operatorupdateSortPlugin() {
	$(".operatorTable").trigger("update");
}
function priceMarkdownupdateSortPlugin() {
	$(".priceMarkdownTabl").trigger("update");
}
function priceInquiryupdateSortPlugin() {
	$(".priceInquiryTable").trigger("update");
}

function showSavedTransSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formSavedTransactionContent(prevRes, '');
}
function showNoSalesTransSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formnoSalesTransactionContent(prevRes, '');
}
function showSoldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formSoldOverTransacQtyContent(prevRes, '');
}
function showDeptSalesSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formDepartSaleTransacContent(prevRes, '');
}
function showOperatorSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formOpeartorLocationContent(prevRes, '');
}
function showPriceInquirySearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		parsePriceInquiry(prevRes, '');
}
function bindFilterSaved() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.savedTransac .textbox').unbind('keyup');
	$('.savedTransac .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
				formSavedTransactionContent(prevRes, value.toUpperCase());
			$('.savedTransac').find('tr :first').removeClass('hideBlock');
		}, 500);

	});

}

function parsePriceInquiry(response, value) {
	var priceInquiryData = '';
	var msg = '';
	var output = '';
	
	var priceInqDate='';
	var priceInqTime='';
	var priceInqTran='';
	var priceInqPoso='';
	var priceInqPosi='';
	var priceInqArti='';
	var priceInqArtiDesc='';
	var priceInqArtiStats='';
	
	if($('.priceInquiryFillterHdr')!=undefined && $('.priceInquiryFillterHdr').length>0 && !$('.priceInquiryFillterHdr').hasClass('hideBlock')){
		priceInqDate=$('.priceInqDate').val().toUpperCase();
		priceInqTime=$('.priceInqTime').val().toUpperCase();
		priceInqTran=$('.priceInqTran').val().toUpperCase();
		priceInqPoso=$('.priceInqPoso').val().toUpperCase();
		priceInqPosi=$('.priceInqPosi').val().toUpperCase();
		priceInqArti=$('.priceInqArti').val().toUpperCase();
		priceInqArtiDesc=$('.priceInqArtiDesc').val().toUpperCase();
		priceInqArtiStats=$('.priceInqArtiStats').val().toUpperCase();
		
	}
	output = $.parseJSON(response);
	priceInquiryData = output.data;
	msg = output.msg;
	currentPage = 1;
	var content = '';
	var s=0;
	var j=1;
	var k=1;
	var flag = false;
	var noRec = 0;

	if (msg != undefined && msg != null && !isNaN(msg)
			&& priceInquiryData != null && priceInquiryData != undefined&& !(priceInquiryData.length==1 
			&&  (priceInquiryData[0].posNumber== null || priceInquiryData[0].posNumber==undefined || priceInquiryData[0].posNumber=='') ) ) {
		setReportGenerationFlags();
		recordCount = priceInquiryData.length;

		if (priceInquiryData != null) {

			var list = priceInquiryData;
			for ( var i = 0; i < list.length; i++) {
				list[i].date = (list[i].date != null && list[i].date != undefined) ? list[i].date
						: '';
				list[i].time = (list[i].time != null && list[i].time != undefined) ? list[i].time
						: '';
				list[i].transNo = (list[i].transNo != null && list[i].transNo != undefined) ? 
						list[i].transNo
						: '';
				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
						list[i].posNumber : '';
				list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? 
						list[i].cashierFirstName
						: '';
				list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
						list[i].cashierLastName
						: '';
			    list[i].article = (list[i].article != null && list[i].article != undefined) ? 
								list[i].article
								: '';
				list[i].articleT = (list[i].articleT != null && list[i].articleT != undefined) ? 
										list[i].articleT
										: '';
				list[i].articleStatus = (list[i].articleStatus != null && list[i].articleStatus != undefined) ? 
						list[i].articleStatus
						: '';

				if ((convertDate(list[i].date)==undefined ? '': convertDate(list[i].date) ).indexOf(
						priceInqDate) != -1 
						&& (convertTime(list[i].time)==undefined ? '': convertTime(list[i].time) ).indexOf(
								priceInqTime) != -1
						&& list[i].transNo.toUpperCase().indexOf(
								priceInqTran) != -1
						&& (Number(list[i].posNumber).toFixed(0).toUpperCase().indexOf(priceInqPosi) != -1)
						&& (list[i].cashierFirstName.toUpperCase()+' '+list[i].cashierLastName.toUpperCase()).indexOf(priceInqPoso) != -1
						&& list[i].article.toUpperCase().indexOf(priceInqArti) != -1
						&& list[i].articleT.toUpperCase().indexOf(priceInqArtiDesc) != -1
						&& list[i].articleStatus.toUpperCase().indexOf(priceInqArtiStats) != -1)
				{
					noRec++;
					flag = true;
					s++;
					content += '<tr id="' + i + '" class=" parentTr page-' + k;
					if (j > 10)
						content += ' hideBlock "';
					content += '"><td class="leftValue" >'
							+ convertDate(list[i].date) 
							+ '</td>';
							if(list[i].time != null && list[i].time !=undefined)
								content	+= '<td class="centerValue" >'+convertTime(list[i].time)
							+ '</td>';
							else
								content	+= '<td class="centerValue" >&nbsp;'
								+ '</td>';
							content	+= '<td class="rightValue" >'+ list[i].transNo
							+ '</td>'
							+ '<td class="rightValue " >'+ list[i].posNumber
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].cashierFirstName + ' '+ list[i].cashierLastName
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].article
							+ '</td>'
							+ '<td class="leftValue">'
							+ list[i].articleT
							+ '</td>'
							+ '<td class="rightValue lastColumn" >'+ list[i].articleStatus
							+ '</td></tr>';
				}
				
				if (j % 10 == 0) {
					k++;
				}
				j++;

			}
			artclSldByDeptTotPages = Math.ceil(noRec/10);
		}
		/*var tot ='';
		tot+='<tr class="totVal ">'
		+'<td class="columnDivider valueInfo storeNdsub " colspan="7">Store Total</td>'
		+'<td class="numberColumn lastColumn valueInfo total"></td>'
	+'</tr>';*/
		$('.priceInquiryTable tbody:first').html('');
		$('.priceInquiryTable tbody:first').append(content);
		showContentPriceInquiryBlock();
		// convertDate();
		// convertTime();
		//pagenationCallbackMethod();
		
		/*$('.priceInquiryTable tbody tr:last').append('<tr class="totVal ">'
				+'<td class="columnDivider valueInfo storeNdsub " colspan="7">Store Total</td>'
				+'<td class="numberColumn lastColumn valueInfo total"></td>'
			+'</tr>');*/
		
		
		if (flag) {
			priceInquiryupdateSortPlugin();
			
			setTimeout(function() {
				$("#priceInquiryAttr").val('date,date,asc,first,cashierName,string,asc,first');
				// set sorting column and direction, this will sort on the first
				var dateColIdx = 0;
				var posOprtrColIdx = 4;
				var sortOrdr = 0; // 0 for Ascending and 1 for Descending
				var sorting = [[ dateColIdx, sortOrdr ],[ posOprtrColIdx, sortOrdr ] ];
				// sort on the first column
				$(".priceInquiryTable").trigger("sorton", [ sorting ]);
				/*var obj = $("#treeTable").children("thead").children("tr");
				var authorizedByCol = obj.children("th:nth-child("+(authorizedByColIdx+1)+")");
				updateSortAtrDtl(authorizedByCol,$("#priceInquiryAttr"));*/
				
			}, 30);
			
		} else {
			$('.'+$(".priceInquiryTable").attr('data-user_id')).addClass('hideBlock');
		}
		
		
	} else {
		if (msg == 'null'  ||  msg == NDF)
			showWarning(NDF);
		else if(msg=='' ||(  priceInquiryData!=null && priceInquiryData!=undefined && priceInquiryData.length>0 && (priceInquiryData[0].posNumber== null || priceInquiryData[0].posNumber==undefined || priceInquiryData[0].posNumber =='')))
			showWarning(NDF);
		else
			showError(msg);
	}
}


/*function bindOpertorLocFilter() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('#operatorFilter').unbind('keyup');
	$('#operatorFilter').keyup(function() {
		value = $('#operatorFilter').val();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			// your ajax stuff

			console.log(value);
			if (value != '') {
				formOpeartorLocationContent(prevRes, value.toUpperCase());
			} else {
				formOpeartorLocationContent(prevRes, '');
			}

			if ($('.parentTr:visible').length == 0) {
				$('.operatorTable').find('tr :first').addClass('hideBlock');

			} else {
				$('.operatorTable').find('tr :first').removeClass('hideBlock');

			}
		}, 500);

	});

}*/



/*
function doPagination() {

	var i = 1;
	var cnt = 1;
	$('.parentTr').each(
			function() {
				var flag = false;
				if ($(this).hasClass('actionRows')) {
					flag = true;
				}
				$(this).attr('class', '');
				$(this).addClass('parentTr').addClass('page-' + cnt);

				if (flag) {
					$(this).addClass('actionRows').addClass('contentRow')
							.addClass('collapsed');
				}
				if (cnt > 1)
					$(this).addClass('hideBlock');
				if (i % 10 == 0) {
					cnt++;
				}
				i++;
				// //console.log(i++);
			});
}*/
function changeTbl(table) {
	// table
	return table;

}
/*function convertDate(val) {

	var temp = val;
	try {
		if (temp != '') {
			var time = temp.replace('/', '').replace('/', '').replace('(', '')
					.replace(')', '').split('Date')[1];
			var today = new Date();
			today.setTime(time);
			// var today = new Date();
			var newDate = today.getDate();
			var newMonth = today.getMonth() + 1;
			if (newDate < 10) {
				newDate = '0' + newDate;
			}
			if (newMonth < 10) {
				newMonth = '0' + newMonth;
			}
			return newDate + "/" + (newMonth) + "/" + today.getFullYear();
		}
	} catch (error) {
		return '';
	}

}
function convertTime(val) {

	var newHour ='';
	var newMinu = '';
	var temp = val;
	try {
		if (temp.trim() != '') {
			if(temp.length !=6 && temp.length == 5){
				temp= '0'+temp;
				
			}
			else if(temp.length == 4)
				{
				temp = '00' + temp;
				}
			 newHour =temp.slice(0,2);
			 newMinu = temp.slice(2,4);
			
			return ((newHour + ":" + newMinu));
		}
	} catch (error) {
		return '';
	}

}*/
function pagenationCallbackMethod(pageNo) {

	var soldOverTot = 0;
	if(pageNo==undefined || pageNo==null) {
		pageNo = 1;
	}

	$('.soldOverTable .parentTr:visible')
			.filter(
					function() {

						soldOverTot += Number($(this).children(':nth-child(10)')
								.text().trim());
						
					});
	
	$('.soldOverTot').text(soldOverTot.toFixed(2));
	//console.log('artclSldByDeptTotPages : '+artclSldByDeptTotPages+', pageNo : '+pageNo);
	if(!$('.deptSales').hasClass('hideBlock')) {
		
		if(artclSldByDeptTotPages == pageNo) {
			if($('.deptSaleTot').hasClass('hideBlock')) {
				$('.deptSaleTot').removeClass('hideBlock');
			}
		}
		else {
			if(!$('.deptSaleTot').hasClass('hideBlock')) {
				$('.deptSaleTot').addClass('hideBlock');
			}
		}
	 var total = 0;
		
		artclSldByDeptCurPageNo = pageNo;
	  $('.deptSalesTable  .parentTr')
	    .filter(
	  function() {

		  total += Number($(this)
	      .children(':nth-child(8)').text().trim().replace(',', ''));



	  });
	  // console.log(cnt.toFixed(3));
	  $('.total').text(total.toFixed(2));
	}
	  
	if(!$('.priceMarkdown').hasClass('hideBlock')) {
		setScrollerPosition($("#sortTableMarkDown"), $("#previous-column"), $("#next-column"));
	}


}
function sortPrintVal() {

	
	var soldOverTot1 = 0;
	
	$('.parentTrPrint')
			.filter(
					function() {

		soldOverTot1 += Number($(this).children(':nth-child(10)')
				.text().trim());

					});

	$('.soldOverTot1').text(soldOverTot1.toFixed(2));
	
	var total = 0;

	  $('.deptSalesPrint  .parentTr')
	    .filter(

	  function() {

		  total += Number($(this)
	      .children(':nth-child(8)').text().trim().replace(',', ''));



	  });
	  // console.log(cnt.toFixed(3));
	  $('.totalPrint').text(total.toFixed(2));

}

function showWarning(text) {
	
	$('.operatorHistory').addClass('hideBlock');
	$('.deptSales').addClass('hideBlock');
	$('.savedTrans').addClass('hideBlock');
	$('.noSales').addClass('hideBlock');
	$('.soldOver').addClass('hideBlock');
	$('.priceMarkdown').addClass('hideBlock');
	
	
	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	
	$('.paginationDiv').addClass('hideBlock');
}
function showsaveTraFilter(){
	var saveTraHead='<thead class="saveTraFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox saveTraDate" name="saveTraDate"></td>'
		+'<td class="centerValue"><input type="#" class="textbox saveTraTime" name="saveTraTime"></td>'
		+'<td class="centerValue"><input type="#" class="textbox saveTraTran" name="saveTraTran"></td>'
		+'<td class="centerValue"><input type="#" class="textbox saveTraPosi" name="saveTraPosi"></td>'
		+'<td class="centerValue"><input type="#" class="textbox saveTraPoso" name="saveTraPoso"></td>'
		+'<td class="centerValue"><input type="#" class="textbox saveTraAmou" name="saveTraAmou"></td>'
		+'</tr></thead>';
		
		$(saveTraHead).insertAfter('.savedTransac thead:first');
		bindFilterSaved();
		
}
function hidesaveTraFillter(){
	$('.saveTraFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	formSavedTransactionContent(prevRes, '');
}
/*function showsoldFilter(){
	var soldHead='<thead class="soldFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox soldDate"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldTime"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldTran"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldPosi"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldPoso"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldAuth"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldArtn"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldEan"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldArtd"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldTotq"></td>'
		+'<td class="centerValue"><input type="#" class="textbox soldTot"></td>'
		+'</tr></thead>';
		
		$(soldHead).insertAfter('.soldOverTable  thead:first');
		filterSoldOver();
		
}
function hidesoldFillter(){
	$('.soldFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formSoldOverTransacQtyContent(prevRes, '');
}*/

function shownosalesFilter(){
	var nosalesHead='<thead class="nosalesFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox nosalesDate" name="nosalesDate"></td>'
		+'<td class="centerValue"><input type="#" class="textbox nosalesTime" name="nosalesTime"></td>'
		+'<td class="centerValue"><input type="#" class="textbox nosalesTran" name="nosalesTran" ></td>'
		+'<td class="centerValue"><input type="#" class="textbox nosalesPosi" name="nosalesPosi"></td>'
		+'<td class="centerValue"><input type="#" class="textbox nosalesPoso" name="nosalesPoso"></td>'
		+'<td class="centerValue"><input type="#" class="textbox nosalesReas" name="nosalesReas"></td>'
		+'</tr></thead>';
		
		$(nosalesHead).insertAfter('.noSalestrans  thead:first');
		filternoSales();
		
}
function hidenosalesFillter(){
	$('.nosalesFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formnoSalesTransactionContent(prevRes, '');
}

function showpriceFilter(){
	var priceHead='<thead class="priceFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox priceDate" name="priceDate"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceTime" name="priceTime"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceTran" name="priceTran"></td>'
		+'<td class="centerValue"><input type="#" class="textbox pricePosi" name="pricePosi"></td>'
		+'<td class="centerValue"><input type="#" class="textbox pricePoso" name="pricePoso"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceAuth" name="priceAuth"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceArtn" name="priceArtn"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceArtd" name="priceArtd"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceQty" name="priceQty"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceReas" name="priceReas"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceRetp" name="priceRetp"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceTot" name="priceTot"></td>'
		+'<td class="centerValue"><input type="#" class="textbox pricePricd" name="pricePricd"></td>'
		+'<td class="centerValue"><input type="#" class="textbox pricePerc" name="pricePerc"></td>'
		+'</tr></thead>';
		
		$(priceHead).insertAfter('.priceMarkdownTabl  thead:first');
		filterPriceMarkdown();
		
}
function showPriceInquiryFilter(){
	var priceHead='<thead class="priceInquiryFillterHdr ">'
		+'<tr class="filterRow">'
		+'<td class="centerValue"><input type="#" class="textbox priceInqDate" name="priceInqDate"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqTime" name="priceInqTime"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqTran" name="priceInqTran"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqPosi" name="priceInqPosi"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqPoso" name="priceInqPoso"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqArti" name="priceInqArti"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqArtiDesc" name="priceInqArtiDesc"></td>'
		+'<td class="centerValue"><input type="#" class="textbox priceInqArtiStats" name="priceInqArtiStats"></td>'
		+'</tr>'
		+'</thead>';
		
		$(priceHead).insertAfter('.priceInquiryTable  thead:first');
		filterPriceInquiry();
		
}

function showOperlocFilter(){
	var operFilterHead='<thead class="operFilterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" name="calendarDayTo" class="textbox calendarDayTo"></td>'
		+'<td class="centerValue"><input type="#" name="cashierSignInTime" class="textbox cashierSignInTime"></td>'
		+'<td class="centerValue"><input type="#" name="calendarDayToEnd" class="textbox calendarDayToEnd"></td>'
		+'<td class="centerValue"><input type="#" name="cashierSignOutTime" class="textbox cashierSignOutTime"></td>'
		+'<td class="centerValue"><input type="#" name="posNumber" class="textbox posNumber"></td>'
		+'<td class="centerValue"><input type="#" name="cashierName" class="textbox cashierName"></td>'
		+'<td class="centerValue"><input type="#" name="startEndTrans" class="textbox startEndTrans"></td>'
		/*+'<td class="centerValue"><input type="#" class="textbox cashierSignOffType"></td>'*/
		
		+'</tr></thead>';
		
		$(operFilterHead).insertAfter('.operatorTable  thead:first');
		filterOperLocation();
		
}
function hideOperlocFillter(){
	$('.operFilterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formOpeartorLocationContent(prevRes, '');
}
function hidepriceFillter(){
	$('.priceFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formPriceMarkdownContent(prevRes, '');
}
function hidePriceInquiryFillter(){
	$('.priceInquiryFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	parsePriceInquiry(prevRes, '');
}

function showdeptFilter(){
	var deptHead='<thead class="deptFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input name="deptDate" type="#" class="textbox deptDate"></td>'
		+'<td class="centerValue"><input name="deptTime" type="#" class="textbox deptTime"></td>'
		+'<td class="centerValue"><input name="deptTran" type="#" class="textbox deptTran"></td>'
		+'<td class="centerValue"><input name="deptPosi" type="#" class="textbox deptPosi"></td>'
		+'<td class="centerValue"><input name="deptPoso" type="#" class="textbox deptPoso"></td>'
		+'<td class="centerValue"><input name="deptAuth" type="#" class="textbox deptAuth"></td>'
		+'<td class="centerValue"><input name="deptDept" type="#" class="textbox deptDept"></td>'
		+'<td class="centerValue"><input name="deptTot" type="#" class="textbox deptTot"></td>'
		+'</tr></thead>';
		
		$(deptHead).insertAfter('.deptSalesTable  thead:first');
		filterFunc();
		
}
function hidedeptFillter(){
	$('.deptFillterHdr').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formDepartSaleTransacContent(prevRes, '');
}

function articleSoldByDeptJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getDepartSaleTransac.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
function operatorLocationHistoryJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getOperatorLocationHistory.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
function soldOverRestrictedJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getSoldOverRestjasper.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
function noSalesTransPrint() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getNoSalesTransjasper.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
function savedTransPrint() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getSavedTransjasper.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
function priceInquiryJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#investigateTransaction').attr("action", "getPriceInquiry.pdf");
		$('#investigateTransaction').attr('target','_blank');
		$('#investigateTransaction').submit();
	}

}
$( document ).ready(function() {
//	if(!$('.deptSales').hasClass('hideBlock')) {
		bindTableHeaderClickEvent();
		bindTableSortEndEvent($("#treeTable"), $("#deptSaleTranAttr"));
		bindTableSortEndEvent($("#sortTableMarkDown "), $("#priceMarkAttr"));
		bindTableSortEndEvent($("#treeTableNoSalesTransaction "), $("#noSalesAttr"));
		bindTableSortEndEvent($("#sortTableOperatorLocation"), $("#operatorLocAttr"));
		bindTableSortEndEvent($("#treeTablesavedTransac"), $("#savedAttr"));
		bindTableSortEndEvent($("#treeTablesoldQty"), $("#soldOverAttr"));
		bindTableSortEndEvent($("#priceInquiryTable"), $("#priceInquiryAttr"));
		//	}
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTable') {
		shiftKeyFunction(tableHeaderObj, $("#deptSaleTranAttr"));
	}
	else if(tableIdName == 'sortTableMarkDown') {
		shiftKeyFunction(tableHeaderObj, $("#priceMarkAttr"));
	}
	else if(tableIdName == 'treeTableNoSalesTransaction') {
		shiftKeyFunction(tableHeaderObj, $("#noSalesAttrnoSalesAttr"));
	}
	else if(tableIdName == 'sortTableOperatorLocation') {
		shiftKeyFunction(tableHeaderObj, $("#operatorLocAttr"));
	}
	else if(tableIdName == 'treeTablesavedTransac') {
		shiftKeyFunction(tableHeaderObj, $("#savedAttr"));
	}
	else if(tableIdName == 'treeTablesoldQty') {
		shiftKeyFunction(tableHeaderObj, $("#soldOverAttr"));
	}
	else if(tableIdName == 'priceInquiryTable') {
		shiftKeyFunction(tableHeaderObj, $("#priceInquiryAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTable') {
		ctrlKeyFunction($("#deptSaleTranAttr"));
	}
	else if(tableIdName == 'sortTableMarkDown') {
		ctrlKeyFunction($("#priceMarkAttr"));
	}
	else if(tableIdName == 'treeTableNoSalesTransaction') {
		ctrlKeyFunction($("#noSalesAttr"));
	}
	else if(tableIdName == 'sortTableOperatorLocation') {
		ctrlKeyFunction($("#operatorLocAttr"));
	}
	else if(tableIdName == 'treeTablesavedTransac') {
		ctrlKeyFunction($("#savedAttr"));
	}
	else if(tableIdName == 'treeTablesoldQty') {
		ctrlKeyFunction($("#soldOverAttr"));
	}
	else if(tableIdName == 'priceInquiryTable') {
		ctrlKeyFunction($("#priceInquiryAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTable') {
		clickFunction(tableHeaderObj, $("#deptSaleTranAttr"));
	}
	else if(tableIdName == 'sortTableMarkDown') {
		clickFunction(tableHeaderObj, $("#priceMarkAttr"));
	}
	else if(tableIdName == 'treeTableNoSalesTransaction') {
		clickFunction(tableHeaderObj, $("#noSalesAttr"));
	}
	else if(tableIdName == 'sortTableOperatorLocation') {
		clickFunction(tableHeaderObj, $("#operatorLocAttr"));
	}
	else if(tableIdName == 'treeTablesavedTransac') {
		clickFunction(tableHeaderObj, $("#savedAttr"));
	}
	else if(tableIdName == 'treeTablesoldQty') {
		clickFunction(tableHeaderObj, $("#soldOverAttr"));
	}
	else if(tableIdName == 'priceInquiryTable') {
		clickFunction(tableHeaderObj, $("#priceInquiryAttr"));
	}
		
}

$(document).ready(function(){
	/*console.log("hidCallFrm : "+$("#hidCallFrm").val());
	console.log("hidDateFrmPassd : "+$("#hidDateFrmPassd").val());
	console.log("hidDateToPassd : "+$("#hidDateToPassd").val());*/
	if($("#hidCallFrm").val()=="STAR") {
		$("#dateFrom").val($("#hidDateFrmPassd").val());
		$("#dateTo").val($("#hidDateToPassd").val());
	    setTimeout(function() {
	        $("#generateReport").trigger('click');
	    },10);
		//$("#generateReport").trigger('click');
	}
	$(window).resize(function() {
		if(!$('.priceMarkdown').hasClass('hideBlock')) {
			setScrollerPosition($("#sortTableMarkDown"), $("#previous-column"), $("#next-column"));
		}
	});
	$(window).scroll(function() {
		if(!$('.priceMarkdown').hasClass('hideBlock')) {
			setScrollerPosition($("#sortTableMarkDown"), $("#previous-column"), $("#next-column"));
		}
	});
});

