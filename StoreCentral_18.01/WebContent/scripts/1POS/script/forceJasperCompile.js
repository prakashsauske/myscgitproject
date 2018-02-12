var recordCount;
var currentPage;
var curPage;
var totPages;
var prevRes='';
var NDF="Sorry, no results found for your search criteria. Please try again.";
var error_1pos='<div class="ContentTableWrapper errorCon " style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
	+'<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
visibleCtrls = 'input[name="dateFrom"],input[name="fromTime"],input[name="toTime"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="timeFromHide"],input[name="timeToHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="fromTime"],input[name="toTime"]';
$(function() {
		
		
	
	$("#mainTabs").tabs();
	
	//code for table sorter
	//$(".sortTable").tablesort();
		
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				onSelect: function( selectedDate ) {
					$( "#timeFrom" ).focus();
				}
				/*onClose: function( selectedDate ) {
					$( "#dateTo" ).focus();
				}*/
				
			});
			
			$("#timeTo, #timeFrom").timepicker({
				   hours: { starts: 0, ends: 23 },
				   minutes: { interval: 5 },
				   rows: 4,
				   showPeriodLabels: true,
				   minuteText: 'Min'/*,
				   onClose: function( selectedTime ) {
					   if($(this).attr('name')=='fromTime') {
						   $("#timeTo").focus();
					   }
				   }*/
				});
			$( "#approved, #rejected, #both" ).on( "click", function() {
				formBoth(prevRes, '');
				});
				
			$('#posFilterOpenBoth').click(function(){
				$('#posFilterOpenBoth').addClass('hideBlock');
				$('#posFilterClearBoth').removeClass('hideBlock');
				showBothFilter();
				});
				$('#posFilterClearBoth').click(function(){
				$('#posFilterOpenBoth').removeClass('hideBlock');
				$('#posFilterClearBoth').addClass('hideBlock');
				hideBothFillter();
				});
				
				
			$("#dateFrom").blur(function(){
				
				   if($('#dateFrom').val().split('/')[2].length != 4)
					{
					var fromYear = parseDate($('#dateFrom').val()).getFullYear();
					var fromDateFYear =$('#dateFrom').val().split('/');
					var finalFromDate=fromDateFYear[0] + '/' + fromDateFYear[1] + '/' + fromYear;
					$('#dateFrom').val(finalFromDate);
					}
				  });
			 
			 
			 $(document).keypress(function(event) {
					if (event.which == 13) {
						event.preventDefault();
						$('#dateFrom').blur();
							$('#generateReport').click();
							
					}
					
				});
			 $('#mainTabs-1 #next-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '+=150'
					}, 'fast');
				});
				$('#mainTabs-1 #previous-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '-=150'
					}, 'fast');
				});
				
				
				$('#mainTabs-2 #next-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '+=150'
					}, 'fast');
				});
				$('#mainTabs-2 #previous-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '-=150'
					}, 'fast');
				});

			
			var previousDate = new Date();
			previousDate.setTime(previousDate.getTime()-(60*60*24*1000));
	
			var newPrevDate =previousDate.getDate();
			var newPrevMonth = previousDate.getMonth() + 1;
			
			if (newPrevDate < 10) {
				newPrevDate = '0' + newPrevDate;
			}
			if (newPrevMonth < 10) {
				newPrevMonth = '0' + newPrevMonth;
			}
			
			var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate.getFullYear());
			$('#dateFrom').val(oneDayBefCurDate);
			
			
			$('.reportWrapper .ContentTableWrapper').css('overflow','visible');
			
			//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			// code for table sorter
			//$('#reportContent').removeClass('hideBlock');
			$('#reportContentPOS .ContentTableWrapper').removeClass('hideBlock');
			$(".typePOS tbody:first").html('');
			$(".typePOS").tablesorter({
				dateFormat : "ddmmyyyy",
				emptyTo : 'top'
			});
			$('#reportContentPOS .ContentTableWrapper').addClass('hideBlock');
			$(".typePOS").addClass('hideBlock');
			
			
			
			$('#reportContentBoth .ContentTableWrapper').removeClass('hideBlock');
			$(".typeBoth tbody:first").html('');
			$(".typeBoth").tablesorter({
				dateFormat : "ddmmyyyy",
				emptyTo : 'top'
			});
			$('#reportContentBoth .ContentTableWrapper').addClass('hideBlock');
			$(".typeBoth").addClass('hideBlock');
			
			$('#reportContentSCO .ContentTableWrapper').removeClass('hideBlock');
			$(".typeSCO tbody:first").html('');
			$(".typeSCO").tablesorter({
				dateFormat : "ddmmyyyy",
				emptyTo : 'top'
			});
			$('#reportContentSCO .ContentTableWrapper').addClass('hideBlock');
			$(".typeSCO").addClass('hideBlock');
			$("#generateReport").click(function(){
				$("#ageVerificationDetailsAttr").val('');
				 hideError();
		
					$('#posFilterOpenBoth').removeClass('hideBlock');
					$('#posFilterClearBoth').addClass('hideBlock');
					
					try{
						hideBothFillter();
					}
					catch(err){
						console.log(err);
					}
				var fromDate = $('#dateFrom').val();
				var fromTime = $('#timeFrom').val();
				var toTime = $('#timeTo').val();
				$('#dateFromHide').text(fromDate);
				if (fromDate == "") {
					showError('Please enter From Date.');
					callFrom();
				} else if (!isValidDate(fromDate) || isFutureDate(fromDate)) {
					showError('Invalid Date.');
					callFrom();
				} else if (daysPastCurrDate(fromDate)>28 && daysPastCurrDate(fromDate)<0) {
					showError('Date cannot be beyond four weeks past');
					callFrom();
				}
				else if(fromTime == "") {
					showError('Please enter From Time.');
					$( "#timeFrom" ).focus();
				}
				else if(toTime == "") {
					showError('Please enter To Time.');
					$( "#timeTo" ).focus();
				}
				else if(!isValidTime_1pos(fromTime)) {
					showError('Please enter Valid From Time.');
					$( "#timeFrom" ).focus();
				}
				else if(!isValidTime_1pos(toTime)) {
					showError('Please enter Valid To Time.');
					$( "#timeTo" ).focus();
				}
				else if(isFromTimeGreaterThanTotime(fromTime, toTime)) {
					showError('From time should be less than or equal to To Time');
					$( "#timeFrom" ).focus();
				}
				else{
					scoSalesSummaryBoth($('#ageVerificationDetails').serialize());
				}
			});
			
			
			
			$("#closeLink").click(function(){				
				$('#accordion').accordion({active : true });			
			});
			
			
			$(".backBtn").click(function(e) {
				window.location.href="../login/goingHome.htm";
			});

					
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			// code for table sorter 
			$(".actionRows").tablesorter();
			
			$(".actionRows tr th").click(function(){	
				
				$('.actionRows tr td').each(function(){				
					$(this).removeClass("sorted");					
				});			
			});
			
			
			$(".actionRows th").click(function(){
				
				$('.actionRows tr td').each(function(){				
					$(this).removeClass("sorted");				
				});	
				
				
				
				col=$(this).parent().children().index($(this));		
				
				//col=$('th.sorted').index();
				
				
				$('.actionRows tr').each(function(){				
					$(this).find('td').eq(col).addClass("sorted");				
				});			
			
			});
			
			$("label.toolTip").tooltip({ 
				position: { 
					my: "left top", 
					at: "left top-70" 
				} 
			});
			
			
			
		
			
			
			

				
			
		});
		
		
		 $(document).ready(function() {
			$('#sortTable').filterTable({ // apply filterTable to all tables on this page
					filterSelector: '#filter' // use the existing input instead of creating a new one
			});
			/*$('html').click(function() {
				console.log('is this triuggered');
			});*/
		});
	
		 function scoSalesSummaryBoth(data) {
				
				
				backupInputParams();
				$.ajax({
					type : "get",
					url : "getAgeVerificationDetail.htm",
					data : data,
					beforeSend : function() {
						
						fullScreenLoader();
						hideError();
					},
					success : function(response) {
						
						prevRes="";
						
						formBoth(response);
						prevRes=response;
						//filterBoth();
						
						$.loader('close');
					},
					error : function() {
						showError('Technical issue occurred. Due to service unavailability.');
						
						$.loader('close');
					}
				});
			} 
		 function formBoth(response, value)
		 {
			 
			 var salesSummary = '';
				var msg = '';
				var output = '';
				var s=0;
				var k=1;
				var j=1;
				var noRec =0;
		
				var ageDate = '';
				var ageName = '';
				var ageTran = '';
				var ageTime = '';
				var agePosi = '';
				var ageKeyd = '';
				var ageResu = '';
				
/*				var posPosi='';
				var posTran='';
				var posArts='';
				var posNets='';
				var posAvet='';
				var posAvgs='';
				var posPerc='';
				var posPere='';
				var posPero='';*/
				
				if($('.posFillterHdrBoth')!=undefined && $('.posFillterHdrBoth').length>0 && !$('.posFillterHdrBoth').hasClass('hideBlock')){
					ageDate=$('.ageDate').val().toUpperCase();
					ageName=$('.ageName').val().toUpperCase();
					ageTran=$('.ageTran').val().toUpperCase();
					ageTime=$('.ageTime').val().toUpperCase();
					agePosi=$('.agePosi').val().toUpperCase();
					ageKeyd=$('.ageKeyd').val().toUpperCase();
					ageResu=$('.ageResu').val().toUpperCase();
				}
				if(response!=null && response!=undefined && response!="") {
				output = $.parseJSON(response);
				salesSummary = output.data;
				msg = output.msg;
				}
				currentPage = 1;
				var content = '';
				var flag = false;

				if (msg != undefined && msg == '' && !isNaN(msg)
						&& salesSummary != null && salesSummary != undefined && salesSummary != "" && !(salesSummary.length==1 
						&&  (salesSummary[0].posNumber== null || salesSummary[0].posNumber==undefined || salesSummary[0].posNumber=='') ) ) {
					setReportGenerationFlags();
					recordCount = salesSummary.length;

					if (salesSummary != null && salesSummary != "") {

						var list = salesSummary;
						for ( var i = 0; i < list.length; i++) {
							list[i].date = (list[i].date != null && list[i].date != undefined) ? 
									list[i].date : '';
							list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
									: '';
							list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
									: '';
							list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? 
									list[i].transactionNumber : '';
							list[i].time = (list[i].time != null && list[i].time != undefined) ? 
									list[i].time : '';
							list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
									list[i].posNumber : '';
							list[i].ageVerificationDateKeyed = (list[i].ageVerificationDateKeyed != null && list[i].ageVerificationDateKeyed != undefined) ? 
									list[i].ageVerificationDateKeyed : '';
							list[i].ageVerificationResult = (list[i].ageVerificationResult != null && list[i].ageVerificationResult != undefined) ? 
									list[i].ageVerificationResult.toUpperCase() : '';
									
							if(list[i].ageVerificationResult=="YES") {
								list[i].ageVerificationResult = "Approved";
							}
							else if(list[i].ageVerificationResult=="NO") {
								list[i].ageVerificationResult = "Rejected";
							}
							
							if (convertDate(list[i].date).indexOf(ageDate) != -1
									&& (list[i].cashierFirstName.toUpperCase() + ' ' + list[i].cashierLastName.toUpperCase()
											).indexOf(ageName) != -1
									&& Number(list[i].transactionNumber).toFixed(0).toUpperCase().indexOf(ageTran) != -1
									&& convertTime(list[i].time).toUpperCase().indexOf(ageTime) != -1
									&& Number(list[i].posNumber).toFixed(0).toUpperCase().indexOf(agePosi) != -1
									&& (list[i].ageVerificationDateKeyed).indexOf(ageKeyd) != -1
									&& list[i].ageVerificationResult.toUpperCase().indexOf(ageResu) != -1
									&& (($('input[name="selectType"]:checked').val()== 'Approved' && list[i].ageVerificationResult == 'Approved')
										|| ($('input[name="selectType"]:checked').val()== 'Rejected' && list[i].ageVerificationResult == 'Rejected')
										|| $('input[name="selectType"]:checked').val()== 'Both'
											)
											)
							{
								noRec++;
								flag = true;
								
								
									s++;
								content += '<tr id="' + i + '" class=" parentTr page-' + k;
								if (j > 10)
									content += ' hideBlock "';
								content += '"><td class="rightValue" >'
										+ list[i].date
										+ '</td>'
											+ '<td class="leftValue" >' + list[i].cashierFirstName
											+ ' ' + list[i].cashierLastName 
										+ '</td>'
										+ '<td class="rightValue " >'+ Number(list[i].transactionNumber).toFixed(0)
										+ '</td>'
										+ '<td class="centerValue">'
										+ list[i].time
										+ '</td>'
										+ '<td class="rightValue">'
										+ Number(list[i].posNumber).toFixed(0)
										+ '</td>'
										+ '<td class="rightValue">'
										+ list[i].ageVerificationDateKeyed
										+ '</td>'
										+ '<td class="rightValue">'
										+ list[i].ageVerificationResult
										+ '</td>'
										/*+ '<td class="rightValue">'
										+ Number(list[i].ofeftTransaction).toFixed(2)+'%'
										+ '</td>'
										+ '<td class="rightValue lastColumn" >'+ Number(list[i].otherTenderTransaction).toFixed(2)+'%'
										+ '</td>'*/
										+ '</tr>';
								
							}
							if (j % 10 == 0) {
								k++;
							}
							j++;
						}
					}
					totPages = Math.ceil(noRec/10);
					$('.typeBoth tbody:first').html('');
					$('.parentTr').remove();
					$('.typeBoth tbody:first').append(content);
					showBoth();
					
					if (flag) {
						
						bothSortPlugin();
						setTimeout(function() {
							$("#ageVerificationDetailsAttr").val('');
							// set sorting column and direction, this will sort on the first
							var dateColIdx = 0;
							var timeColIdx = 3;
							var sorting = [[dateColIdx,0],[timeColIdx,0] ];
							// sort on the first column
							$(".typeBoth").trigger("sorton", [sorting]);
						}, 30);
						
						
					} else {
						$('.paginationDiv').addClass('hideBlock');
					}
					//filterBoth();
				} else {
					if (msg == 'null'  || msg== NDF )
						showWarning(NDF);
					else if(msg=='' ||(  salesSummary!=null && salesSummary!=undefined && salesSummary.length>0  && (salesSummary[0].posNumber== null || salesSummary[0].posNumber==undefined || salesSummary[0].posNumber =='')))
					{
						showWarning(NDF);}
					else
						showError(msg);
				}
				
			}
		  
		
		 
		 
		 function showBoth(){
				// $('.ContentTableWrapperError').addClass('hideBlock');
				 $('#reportContentBoth .ContentTableWrapper').removeClass('hideBlock');
				 $('.sectionTitle').text("Age Verification Detail Report");
					$('#mainTabs-1').removeClass('hideBlock');
					$('#reportContentSCO').addClass('hideBlock');
					$('#reportContentPOS').addClass('hideBlock');
					$('#reportContentBoth').removeClass('hideBlock');
					$('.typeBoth').removeClass('hideBlock');
					$('  .filterBoth,  .sortTable ').removeClass('hideBlock');
					$('#reportContentBoth,#reportContentBoth .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
					.removeClass('hideBlock');
					$('#errorMsgDiv, #errorMsg').addClass('hideBlock');
					
				}
		  

function hideContent() {
	$('#reportContentBoth .ContentTableWrapper')
			.addClass('hideBlock');
	$('#reportContentSCO .ContentTableWrapper')
	.addClass('hideBlock');
	$('#reportContentPOS .ContentTableWrapper')
	.addClass('hideBlock');
	$('.paginationWrapper').addClass('hideBlock');
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv, #errorMsg').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
	
	//$('.ContentTableWrapper').addClass('hideBlock');
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

function bothSortPlugin() {
	$(".typeBoth").trigger("update");
}
function showBothSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formBoth(prevRes, '');
}
function showWarning(text) {
	
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv, #errorMsg').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(text);
	$('#reportContentPOS').addClass('hideBlock');
	$('#reportContentBoth').addClass('hideBlock');
	$('#reportContentSCO').addClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	
	$('.paginationDiv').addClass('hideBlock');
}

function filterBoth() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.typeBoth .textbox').unbind('keyup');
	$('.typeBoth .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
	
				formBoth(prevRes, value.toUpperCase());
				
		

			if ($('.parentTr:visible').length == 0) {
				$('.typeBoth').find('tr :first').addClass('hideBlock');

			} else {
				$('.typeBoth').find('tr :first').removeClass('hideBlock');

			}
		}, 500);

	});
}

function showBothFilter(){
	var posHeadBoth='<thead class="posFillterHdrBoth ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" name="ageDate" class="textbox ageDate"></td>'
		+'<td class="centerValue"><input type="#" name="ageName" class="textbox ageName"></td>'
		+'<td class="centerValue"><input type="#" name="ageTran" class="textbox ageTran"></td>'
		+'<td class="centerValue"><input type="#" name="ageTime" class="textbox ageTime"></td>'
		+'<td class="centerValue"><input type="#" name="agePosi" class="textbox agePosi"></td>'
		+'<td class="centerValue"><input type="#" name="ageKeyd" class="textbox ageKeyd"></td>'
		+'<td class="centerValue"><input type="#" name="ageResu" class="textbox ageResu"></td>'
		//+'<td class="centerValue"><input type="#" class="textbox posPere"></td>'
		//+'<td class="centerValue"><input type="#" class="textbox posPero"></td>'
		+'</tr></thead>';
		
		$(posHeadBoth).insertAfter('.typeBoth  thead:first');
		filterBoth();
		
}
function hideBothFillter(){
	$('.posFillterHdrBoth').remove();
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formBoth(prevRes, '');
}


function pagenationCallbackMethod(pageNo) {

	//var totPOS = 0;
	//var totSCO = 0;
	var ageKeyedCount = 0;
	var tmpDt = '';
	if(pageNo==undefined || pageNo==null) {
		pageNo = 1;
	}
	if(totPages == pageNo) {
		if($('.totVal').hasClass('hideBlock')) {
			$('.totVal').removeClass('hideBlock');
		}
	}
	else {
		if(!$('.totVal').hasClass('hideBlock')) {
			$('.totVal').addClass('hideBlock');
		}
	}

$('.typeBoth .parentTr')
.filter(
		function() {

			tmpDt = $(this).children(':nth-child(6)')
					.text().trim();
			if(tmpDt != undefined && tmpDt != null && tmpDt != '') {
				ageKeyedCount++;				
			}
			
		});

$('.typeBoth .ageKeyed').text(ageKeyedCount);
}

function sortTotValPrint() {

	var totBoth = 0;

$('.typeBothPrint .parentTr')
.filter(
		function() {

			totBoth += Number($(this).children(':nth-child(4)')
					.text().trim());
			
		});

$('.typeBothPrint .netSalesExcl').text(totBoth.toFixed(2));
	  
	

}
$(document).ready(function() {
	$("#forceComp").click(function() {
		console.log("Calling......");
		var dat = $('#forceJasperCompile').serialize();
		$.ajax({
			type : "post",
			url : "compile.htm",
			data : dat,
			beforeSend : function() {
				fullScreenLoader();
				hideError();
			},
			success : function(response) {
				console.log("Response : "+response);
				$("#jasperTxt").text(response);
				//$(".JasperCompileRpt").removeClass("hideBlock");
				$.loader('close');
			},
			error : function() {
				showError('Technical issue occurred. Due to service unavailability.');
				$.loader('close');
			}
		});
	});
});
$( document ).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#treeTableBothType"), $("#ageVerificationDetailsAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		shiftKeyFunction(tableHeaderObj, $("#ageVerificationDetailsAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		ctrlKeyFunction($("#ageVerificationDetailsAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		clickFunction(tableHeaderObj, $("#ageVerificationDetailsAttr"));
	}
}
