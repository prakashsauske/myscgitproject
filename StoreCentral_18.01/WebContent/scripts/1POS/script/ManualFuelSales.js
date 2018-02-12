var recordCount;
var currentPage;
var curPage;
var prevRes='';
var totPages;
var NDF="Sorry, no results found for your search criteria. Please try again.";
var error_1pos='<div class="ContentTableWrapper errorCon " style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
	+'<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
var totPages;
$(function() {
		
		
	
	$("#mainTabs").tabs();
	
	//code for table sorter
	//$(".sortTable").tablesort();
		
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				/*onClose: function( selectedDate ) {
					$( "#dateTo" ).focus();
				}*/
				
			});
			
			$("#dateTo").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				
				
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
					}
				  });
			 
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
			
			
			
			$('#reportContentBoth .ContentTableWrapper').removeClass('hideBlock');
			$(".typeBoth tbody:first").html('');
			$(".typeBoth").tablesorter({
				dateFormat : "ddmmyyyy",
				emptyTo : 'top'
			});
			$('#reportContentBoth .ContentTableWrapper').addClass('hideBlock');
			$(".typeBoth").addClass('hideBlock');
			
			$("#generateReport").click(function(){
				$("#manualFuelSaleAttr").val('');
				 hideError();
		
					$('#posFilterOpenBoth').removeClass('hideBlock');
					$('#posFilterClearBoth').addClass('hideBlock');
					
					try{
						hideBothFillter();
					}
					catch(err){
						console.log(err);
					}
				var fromDate = ate($('#dateFrom').val());
				var toDate = ate($('#dateTo').val());
				$('#dateToHide').text(toDate);
				$('#dateFromHide').text(fromDate);
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
				var newTime=Number(date1.getTime());
				
				var dateComFrom = new Date(fromDate.split('/')[2],fromDate.split('/')[1],fromDate.split('/')[0]);
				var dateComTo = new Date(toDate.split('/')[2],toDate.split('/')[1],toDate.split('/')[0]);
				var toYear = dateComTo.getFullYear();
				var fromYear = dateComFrom.getFullYear();
				var toMonth = dateComTo.getMonth();
				var fromMonth = dateComFrom.getMonth();
				var toDay = dateComTo.getDate();
				var fromDay = dateComFrom.getDate();				
				var rangeDate = new Date(toDate.split('/')[2],
						toDate.split('/')[1]-1, toDate.split('/')[0]);
				
				//var toDateTime=dateComTo.getTime();
				//var fromDateTime=dateComFrom.getTime();
				var date2 = new Date();
				var part = toDate.split('/');
				var partLen = part.length;
				var date2Len = toDate.length;
				//var date2Time = Number(date2.getTime());
				date2.setFullYear(part[2], part[1] - 1, part[0]);
				
				var splittedDate = ate($('#dateTo').val(),$('#dateTo').val().split('/').length).split('/');
				var splittedTwo = splittedDate[0]
				+ splittedDate[1] + splittedDate[2];
				
				newTime=Number(newTime)+Number(24*60*60*1000*90);
				
				/* var timeDiff = Math.abs(curDateTime - toDateTime);
				 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));*/
				
				
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
				}else if (date1.getTime() > date2.getTime()) {
					showError('To Date should not be lesser than the From Date');
					callTo();
				}
				/*
				 * else if (date2Time >newTime) { console.log(newTime +'
				 * date2.getTime() '+ date2.getTime()); showError('Date
				 * difference should not be greater than 7 days'); callTo(); }
				 */
				

				else if ((splittedDate[0] > 31
					|| splittedDate[1] > 12 || splittedDate[2] > 9999)
					|| isNaN(splittedTwo)){
				
					showError("Invalid Date Format");
				}
			 /*
				 * else if(fromDateTime > curDateTime ) { showError("Future
				 * Dates not allowed for From Date."); callFrom(); }
				 */
				
				else if(rangeDate > curDate)
					{
					showError("Future Dates are not allowed for To Date.");
							callTo();
							}
						
				else if ((toYear-fromYear) == 1) {
					if(((toMonth - fromMonth)+12)>3){
						showError('Date difference should not be greater than 3 months');		
						callFrom();
					}else if((((toMonth - fromMonth)+12) == 3) && (((toDay - fromDay)+30)>30)){
						showError('Date difference should not be greater than 3 months');		
						callFrom();
					}else{
						manualFuelSales($('#manualFuelSales').serialize());
					}
				}else if(toYear-fromYear == 0){
						if((toMonth - fromMonth)>3){
								showError('Date difference should not be greater than 3 months');		
								callFrom();
					}else if(((toMonth - fromMonth) == 3) && (((toDay - fromDay)+30)>30)){
								showError('Date difference should not be greater than 3 months');		
								callFrom();
					}else{
						manualFuelSales($('#manualFuelSales').serialize());
					}
				}else if((toYear-fromYear) >= 2){
					showError('Date difference should not be greater than 3 months');		
					callFrom();
				}
			
				else{
					manualFuelSales($('#manualFuelSales').serialize());
					
					
					
				}// hideError();
					
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
		});
	
		 function manualFuelSales(data) {
				
				backupInputParams();				
				$.ajax({
					type : "get",
					url : "getManualFuelSales.htm",
					data : data,
					beforeSend : function() {
						
						fullScreenLoader();
						hideError();
					},
					success : function(response) {
						
						prevRes="";
						
						parseManualFuelSales(response);
						prevRes=response;
						//filterBoth();
						
						$.loader('close');
					},
					error : function() {
						showError('Technical issue occurred. Due to service unavailability.');
						
						$.loader('close');
					},
				});
			} 
		 function parseManualFuelSales(response, value)
		 {
			 
			 var salesSummary = '';
				var msg = '';
				var output = '';
		
				var manDate='';
				var manTime='';
				var manTrans='';
				var manPosid='';
				var manOperNm='';
				var manArticle='';
				var manLitreSold='';
				var manTotal='';
				
				var noRec = 0;
				if($('.posFillterHdrBoth')!=undefined && $('.posFillterHdrBoth').length>0 && !$('.posFillterHdrBoth').hasClass('hideBlock')){
					manDate=$('.manDate').val().toUpperCase();
					manTime=$('.manTime').val().toUpperCase();
					manTrans=$('.manTrans').val().toUpperCase();
					manPosid=$('.manPosid').val().toUpperCase();
					manOperNm=$('.manOperNm').val().toUpperCase();
					manArticle=$('.manArticle').val().toUpperCase();
					manLitreSold=$('.manLitreSold').val().toUpperCase();
					manTotal=$('.manTotal').val().toUpperCase();
				}
				if(response!=null && response!=undefined && response!="") {
				output = $.parseJSON(response);
				salesSummary = output.data;
				msg = output.msg;
				}
				currentPage = 1;
				var content = '';
				var cashierName = '';
				

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
							list[i].cashierFirstName = list[i].cashierFirstName != null && list[i].cashierFirstName != undefined ? list[i].cashierFirstName
									: '';
							list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? 
									list[i].cashierLastName
									: '';
							cashierName = list[i].cashierFirstName +' '+list[i].cashierLastName;
							list[i].time = (list[i].time != null && list[i].time != undefined) ? 
									list[i].time
									: '';
							list[i].transNo = (list[i].transNo != null && list[i].transNo != undefined) ? 
									list[i].transNo
									: '';
							list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? 
									list[i].posNumber
									: '';
						    list[i].articleDesc= (list[i].articleDesc != null && list[i].articleDesc_t != null  && list[i].articleDesc != undefined && list[i].articleDesc_t != undefined) ? 
									list[i].articleDesc 
									: '';
						    list[i].litresSold= (list[i].litresSold != null && list[i].litresSold != undefined) ? 
									list[i].litresSold
									: '';
							list[i].total= (list[i].total != null && list[i].total != undefined) ? 
									list[i].total
									: '';
							
							if (convertDate(list[i].date).indexOf(manDate) != -1
									&& cashierName.toUpperCase().indexOf(manOperNm) != -1
									&& convertTime(list[i].time).indexOf(manTime) != -1
									&& list[i].transNo.toUpperCase().indexOf(manTrans) != -1
									&& list[i].posNumber.toUpperCase().indexOf(manPosid) != -1
									&& list[i].articleDesc.toUpperCase().indexOf(manArticle) != -1
									&& list[i].litresSold.toUpperCase().indexOf(manLitreSold) != -1
									&& list[i].total.toUpperCase().indexOf(manTotal) != -1)
							{
								noRec++;
								
								content += '<tr id="' + i + '" class="parentTr page-' + Math.ceil(noRec/10);
								if (noRec > 10)
									content += ' hideBlock ';
								content += '"><td class="rightValue" >'
										+ convertDate(list[i].date)
										+ '</td>'
											+ '<td class="rightValue" >'+ convertTime(list[i].time)
										+ '</td>'
										+ '<td class="rightValue " >'+ list[i].transNo
										+ '</td>'
										+ '<td class="rightValue">'
										+ list[i].posNumber
										+ '</td>'
										+ '<td class="leftValue">'
										+ cashierName
										+ '</td>'
										+ '<td class="leftValue">'
										+ list[i].articleDesc
										+ '</td>'
										+ '<td class="rightValue">'
										+ Number(list[i].litresSold).toFixed(3)
										+ '</td>'
										+ '<td class="rightValue">'
										+ Number(list[i].total).toFixed(2)
										+ '</td>'
										+ '</tr>';
							}
						}
					}
					totPages = Math.ceil(noRec/10);
					$('.typeBoth tbody:first').html('');
					$('.parentTr').remove();
					$('.typeBoth tbody:first').append(content);
					showBoth();
					if (noRec>0) {
						
						bothSortPlugin();
						setTimeout(function() {
							$("#manualFuelSaleAttr").val('date,date,asc,first,time,time,asc,first');
							// set sorting column and direction, this will sort on the first
							var sorting = [[0, 0], [1, 0] ];
							// sort on the first column
							$(".typeBoth").trigger("sorton", [sorting]);
						}, 30);
						
						
					} else {
						$('.paginationDiv').addClass('hideBlock');
						pagenationCallbackMethod();
					}

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
				 $('.sectionTitle').text("Manual Fuel Sales Report");
					$('#mainTabs-1').removeClass('hideBlock');
					$('#reportContentBoth').removeClass('hideBlock');
					$('.typeBoth').removeClass('hideBlock');
					$('  .filterBoth,  .sortTable ').removeClass('hideBlock');
					$('#reportContentBoth,#reportContentBoth .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
					.removeClass('hideBlock');
					$('#errorMsgDiv, #errorMsg').addClass('hideBlock');
					
				}
		  
function printResult(newList) {}
function ate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}

function hideContent() {
	$('#reportContentBoth .ContentTableWrapper')
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
function callTo() {
	setTimeout(function() {
		$('#dateTo').focus();
	}, 200);
}


function bothSortPlugin() {
	$(".typeBoth").trigger("update");
}
function showBothSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		parseManualFuelSales(prevRes, '');
}
function showWarning(text) {
	
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv, #errorMsg').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(text);
	$('#reportContentBoth').addClass('hideBlock');
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
	
				parseManualFuelSales(prevRes, value.toUpperCase());
				
		

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
		+'<tr class="filterRow"><td class="centerValue"><input type="#" name="manDate" class="textbox manDate"></td>'
		+'<td class="centerValue"><input type="#" name="manTime" class="textbox manTime"></td>'
		+'<td class="centerValue"><input type="#" name="manTrans" class="textbox manTrans"></td>'
		+'<td class="centerValue"><input type="#" name="manPosid" class="textbox manPosid"></td>'
		+'<td class="centerValue"><input type="#" name="manOperNm" class="textbox manOperNm"></td>'
		+'<td class="centerValue"><input type="#" name="manArticle" class="textbox manArticle"></td>'
		+'<td class="centerValue"><input type="#" name="manLitreSold" class="textbox manLitreSold"></td>'
		+'<td class="centerValue"><input type="#" name="manTotal" class="textbox manTotal"></td>'
		+'</tr></thead>';
		
		$(posHeadBoth).insertAfter('.typeBoth  thead:first');
		filterBoth();
		
}
function hideBothFillter(){
	$('.posFillterHdrBoth').remove();
	parseManualFuelSales(prevRes, '');
}


function pagenationCallbackMethod(pageNo) {

	var totBoth = 0;
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

			totBoth += Number($(this).children(':nth-child(8)')
					.text().trim());
			
		});

$('.typeBoth .total').text(totBoth.toFixed(2));
}

function manualFuelSalesPrintJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#manualFuelSales').attr("action", "getManualFuelSales.pdf");
		$('#manualFuelSales').attr('target','_blank');
		$('#manualFuelSales').submit();
	}
}
$( document ).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#treeTableBothType"), $("#manualFuelSaleAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		shiftKeyFunction(tableHeaderObj, $("#manualFuelSaleAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		ctrlKeyFunction($("#manualFuelSaleAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treeTableBothType') {
		clickFunction(tableHeaderObj, $("#manualFuelSaleAttr"));
	}
}
