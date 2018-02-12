var recordCount;
var currentPage;
var curPage;
var headerDesc;
var headerSort;
var headIndex;
var filterFlag;
var totPages;
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="promotionButtonCheck"],select[name="department"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="promoHdn"],input[name="departmentHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="promo"],select[name="department"],input[name="departmentList"]';
$(document).ready(function() {
	$('input[name="depH"]').click(function() {
	    if ($(this).is(':checked')) {
	    	visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="promotionButtonCheck"],input[name="departmentList"]:checked';
	    	hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="promoHdn"],input[name="departmentHide"]';
	        //console.log("Checked");
	    }
	    else {
	    	visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="promotionButtonCheck"],select[name="department"]';
	    	hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="promoHdn"],input[name="departmentHide"]';
	        //console.log("Unchecked");
	    }
		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
	});
    $('input[name="promo"]').click(function() {
    	setPromoCheckStat($(this));
    	checkForInputChange(/*visibleFileds, hiddenFields*/);
    });
    setPromoCheckStat($('input[name="promo"]'));
});
$(function() {

	$('#filter').css('padding-top', '4px').css('width', '18%');
	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		/*onClose : function(selectedDate) {
			$("#timeFrom").focus();
		}*/

	});
	$('#scrollWindow').css('width','1300px');
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("#generateReport").click();
		}
	});
	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		/*onClose : function(selectedDate) {
			$("#timeTo").focus();
		}*/

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

	$("#timeTo, #timeFrom").timepicker({
		hours : {
			starts : 0,
			ends : 23
		},
		minutes : {
			interval : 5
		},
		rows : 4,
		showPeriodLabels : true,
		minuteText : 'Min'
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
			console.log(finalToDate);
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
	 
	 $(document).keypress(function(event) {
			if (event.which == 13) {
				event.preventDefault();
				$('#dateFrom').blur();
				$('#dateTo').blur();
					$('#generateReport').click();
					
			}
			
		});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$("#generateReport")
			.click(
					function() {
						hideError();
						$('#deptFilterOpen').removeClass('hideBlock');
						$('#deptFilterClear').addClass('hideBlock');
						try
						{	hidedeptFillter();
						}
						catch(err){
							console.log(err);
						}
						$('.catPrint').val('');
						$('.scPrint').val('');
						$('.segPrint').val('');
						$('#filter').val('');
						var fromDate = formateDate($('#dateFrom').val());
						var toDate = formateDate($('#dateTo').val());
						var start = $("#dateFrom").datepicker("getDate");
				        var end = $("#dateTo").datepicker("getDate");
				        var days = (end - start) / (1000 * 60 * 60 * 24);
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

						var date2 = new Date();
						var part = toDate.split('/');
						var partLen = part.length;
						var date2Len = toDate.length;
						date2.setFullYear(part[2], part[1] - 1, part[0]);
						
						/*if($('#promo').is(':checked'))
						{
							$('#promotionButtonCheck').val('Y');
						}
						else
						{
							$('#promotionButtonCheck').val('N');
						}*/
							$('.depPrint').text($('#department_1pos').val());
						var splittedDate = formateDate($('#dateTo').val(),
								$('#dateTo').val().split('/').length)
								.split('/');
						var splittedTwo = splittedDate[0] + splittedDate[1]
								+ splittedDate[2];

						newTime = Number(newTime)
								+ Number(24 * 60 * 60 * 1000 * 90);

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
						else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
								|| isNaN(splittedTwo)) {

							showError("Invalid Date Format");
						}
						else if(days >6){
							showError('Date Range is more than one week.');
							callFrom();
						}
						else if (rangeDate > curDate) {
							showError("Future Dates are not allowed for To Date.");
							callTo();
						}
						else if ((toYear - fromYear) == 1) {
							if (((toMonth - fromMonth) + 12) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ((((toMonth - fromMonth) + 12) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							}else if($('#department_1pos').val()=='Select'){
								showError('Please select a department');
							} else {
								salesByArticles($('#salesByArticle')
										.serialize());
							}
						} else if (toYear - fromYear == 0) {
							if ((toMonth - fromMonth) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if (((toMonth - fromMonth) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if($('#department_1pos').val()=='Select'){
								showError('Please select a department');
							}else {
								salesByArticles($('#salesByArticle')
										.serialize());
							}
						} else if ((toYear - fromYear) >= 2) {
							showError('Date difference should not be greater than 3 months');
							callFrom();
						}else if($('#department_1pos').val()=='Select'){
							showError('Please select a department');
						}

						else {
							salesByArticles($('#salesByArticle').serialize());

						}// hideError();

					});

	// code to initialise tree table
	$(".treetable").treetable({
		expandable : true
	});

	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		emptyTo : 'top',
		textSorter : {
			1:function(a, b, direction, table, column) {
		      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			}
		}
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');

	/*$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});

	});*/

	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});


	$("label.toolTip").tooltip({
		position : {
			my : "left top",
			at : "left top-70"
		}
	});
	$("#tabs").tabs();

	$('#closeLink').click(function() {
		hideError();
		closeAccordian();
	});
	$('#depH').click(function() {
		if ($(this).is(':checked')) {
			$("#articleHierarchy").removeClass('hideBlock');
			$('#' + $('#department_1pos').val()).click();
			// $('#department_1pos').val('Select');
			$('#department_1pos').attr('disabled', 'disabled');
		} else {
			$("#articleHierarchy").addClass('hideBlock');
			$('#department_1pos').removeAttr('disabled');
		}
		hideError();
	});
	$('#department_1pos')
	.change(
			function() {
				$(".hierarchyname")
						.val(
								$(
										'#department_1pos option[value="'
												+ $("#department_1pos")
														.val() + '"]')
										.text());

			});
	$('.department').click(
			function() {
				$('#department_1pos option[value="' + $(this).val() + '"]').prop(
						'selected', true);
				
			});
	/*----------------******  Department Click function   *****--------------- */
	$("#deptLstCnt").text($("#deptlst li").size());
	deptFlag = "Null";
	//var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {
						$('.depPrint').text($(this).next().text());
						$('#segmentLst li input').removeProp('checked');
						$('#categoryLst li input').removeProp('checked');
						$('#subCategoryLst li input').removeProp('checked');
						
						$("#segmentLst").addClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#subCategoryLst").addClass('hideBlock');
						$("#segment").removeClass('hideBlock');
						$("#subCat").removeClass('hideBlock');
						$("#noSelectionCat").addClass('hideBlock');
						$("#segmentLst").addClass('hideBlock');
						$("#subCategoryLst").addClass('hideBlock');
						// my line
						$("#subCatTotal").addClass('hideBlock');
						$("#segmentTotal").addClass('hideBlock');

						$("#categoryLst").removeClass('hideBlock');
						$("#categoryLst").empty();
						$("#categoryLstCnt").text('');
						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');
						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var departmentStr = "";
						var i = 1;

						if (deptFlag != selectedValue) {
							var deptHierarchyId = parseInt($(selectedValueId)
									.attr('data-tt-id'));
							var servletUrl = '../article/fetchDetails.htm?iv_parent_node='
									+ selectedValue;
							//var c = 0;
							$
									.getJSON(
											servletUrl,
											function(options) {

												if (options) {
													$
															.map(
																	options.categoryInfoList,
																	function(
																			item) {
																		nodeID = deptHierarchyId
																				+ "."
																				+ i;
																		nodeIdTemp = nodeID
																				+ ".1";
																		departmentStr = '<li><input type="radio" name="category" class="category" data-tt-id="'
																				+ nodeID
																				+ '" data-tt-parent-id="'
																				+ deptHierarchyId
																				+ '" id="'
																				+ item.node
																				+ '" value="'
																				+ item.node
																				+ '"/><label for="'
																				+ item.node
																				+ '" class="lastColumn">'
																				+ item.nodeDesc
																				+ '</label></li>';
																		$(
																				"#categoryLst")
																				.append(
																						departmentStr);
																		i++;
																		deptFlag = selectedValue;
																		$(
																				"#categoryLstTotal")
																				.removeClass(
																						'hideBlock');
																		$(
																				"#categoryLstCnt")
																				.text(
																						$(
																								"#categoryLst li")
																								.size());
																	});
												}
												category();
											});

						}
						bindDynaCtrlInputChange('input[name="category"]','input[name="category"]:checked','input[name="categoryListHdn"]');
					});
	
	
	$('#sortTable').on('click','.sorting',function () {
	    var th = $('#sortTable th').eq($(this).index());
	    $(th).attr('aria-sort');
	    headerDesc = th.text();
	    headIndex=Number($(this).index());
	   // returns [object Object]       
	});

});

function salesByArticles(data) {

	backupInputParams();
	//console.log(data);
	$.ajax({
		type : "get",
		url : "getSalesByArticle.htm",
		data : data,

		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			hideError();
		},
		success : function(response) {

			formSalesByArticleContent(response, '');
			//printResult(response);
			prevRes = response;
			reDOPagination($('.sortTable'));
			//stopLoading();
			bindFilter();
			$.loader('close');
			setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			//stopLoading();
			$.loader('close');
		},
	});

}
function showOldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formSalesByArticleContent(prevRes, '');
}
function updateSortPlugin() {
	$(".sortTable").trigger("update");
	pagenationCallbackMethod(1);
}
function formSalesByArticleContent(response, value) {

	var deptSalesTax = '';
	var msg = '';
	var output = '';
	var k=1;
	var j=1;
	var s=0;
	var noRec = 0;

	var deptArtr='';
	var deptArtd='';
	var deptCat='';
	var deptSub='';
	var deptSeg='';
	var deptRetp='';
	var deptQty='';
	var deptVal='';
	var deptUnit='';
	var totDfrdLyl='';
	if($('.deptFillterHdr')!=undefined && $('.deptFillterHdr').length>0 && !$('.deptFillterHdr').hasClass('hideBlock')){
		deptArtr=$('.deptArtr').val().toUpperCase();
		deptArtd=$('.deptArtd').val().toUpperCase();
		deptCat=$('.deptCat').val().toUpperCase();
		deptSub=$('.deptSub').val().toUpperCase();
		deptSeg=$('.deptSeg').val().toUpperCase();
		deptRetp=$('.deptRetp').val().toUpperCase();
		deptQty=$('.deptQty').val().toUpperCase();
		deptVal=$('.deptVal').val().toUpperCase();
		deptUnit=$('.deptUnit').val().toUpperCase();		
		totDfrdLyl=$('.totDfrdLyl').val().toUpperCase();
	}
	output = $.parseJSON(response);
	deptSalesTax = output.data;
	msg = output.msg;
	var key=output.key;
	currentPage = 1;

	var flag = false;
	if (msg != undefined  && !isNaN(msg) && deptSalesTax != null
			&& deptSalesTax != undefined && !(deptSalesTax.length==1 
					&&  (deptSalesTax[0].article== null || deptSalesTax[0].article==undefined || deptSalesTax[0].article=='') ) ) {
		setReportGenerationFlags();
		recordCount = deptSalesTax.length;
		var content = '';

		if (deptSalesTax != null) {

			var list = deptSalesTax;
			for ( var i = 0; i < list.length; i++) {
				list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article
						: '';
				list[i].articleT = (list[i].articleT != null && list[i].articleT != undefined) ? list[i].articleT
						: '';
				list[i].category = (list[i].category != null && list[i].category != undefined) ? list[i].category.replace(key,'')
								: '';
								
				list[i].subCategory = (list[i].subCategory != null && list[i].subCategory != undefined) ? list[i].subCategory.replace(key,'')
							: '';
				list[i].segment = (list[i].segment != null && list[i].segment != undefined) ? list[i].segment.replace(key,'')
							: '';
							
				list[i].retailPrice = (list[i].retailPrice != null && list[i].retailPrice != undefined) ? Number(list[i].retailPrice).toFixed(2)
				     : '';
				
				
				list[i].qtyOfArticleSold = (list[i].qtyOfArticleSold != null && list[i].qtyOfArticleSold != undefined) ? Number(list[i].qtyOfArticleSold).toFixed(3)
					     : '';
				
				list[i].salesRetailexcT = (list[i].salesRetailexcT != null && list[i].salesRetailexcT != undefined) ? 
						list[i].salesRetailexcT
						: '';
						
				list[i].salesUnit = (list[i].salesUnit != null && list[i].salesUnit != undefined) ? 
								list[i].salesUnit.toUpperCase()
								: '';
								
				list[i].totDeferdLylty = (list[i].totDeferdLylty != null && list[i].totDeferdLylty != undefined) ? 
						Number(list[i].totDeferdLylty).toFixed(2)
						: '';
								
								
				if (list[i].article.toUpperCase().indexOf(deptArtr) != -1
						&& list[i].articleT.toUpperCase().indexOf(deptArtd) != -1
						&& list[i].category.toUpperCase().indexOf(deptCat) != -1
						&& list[i].subCategory.toUpperCase().indexOf(deptSub) != -1
						&& list[i].segment.toUpperCase()
								.indexOf(deptSeg) != -1
						&& Number(list[i].retailPrice).toFixed(2).indexOf(deptRetp) != -1
						&& Number(list[i].qtyOfArticleSold).toFixed(3).indexOf(deptQty) != -1
						&& Number(list[i].salesRetailexcT).toFixed(2).indexOf(deptVal) != -1
						&& list[i].salesUnit.toUpperCase().indexOf(deptUnit) != -1
						&& Number(list[i].totDeferdLylty).toFixed(2).indexOf(totDfrdLyl) != -1) {
					
					if(list[i].salesUnit=='EAC'){
						list[i].salesUnit='EACH';
					}
					
					if($("#deptFilterClear").hasClass("hideBlock")){
						filterFlag=true;
						$(".filterFlag").val(filterFlag);
						
					}
					else
						{
						filterFlag=false;
						$(".filterFlag").val(filterFlag);
						}
					
					if($('#promo').is(':checked')){
						if(!(list[i].promotion!=null && list[i].promotion!=undefined && list[i].promotion.length>0 && list[i].promotion!=0 && list[i].promotion!='#'))
						continue;
						
					}
					noRec++;
					flag = true;
					s++;
					content += '<tr id=' + i + ' class=" parentTr page-' + k;
					if (j > 10)
						content += ' hideBlock "';
					
					content+= '"><td class="leftValue " >';
					//if(filterFlag!= true)content+='<input type="hidden" class="articleNoPrint" name="articleNoPrint" value="'+ list[i].article +'"/>' ;
					
						content+= list[i].article
							+ '</td>' + '<td class="leftValue " >';
					//if(filterFlag!=true)content+='<input type="hidden" class="articleNamePrint" name="articleNamePrint" value="'+ list[i].promotion +'"/>';
					
							content+= list[i].articleT + '</td>'
							+ '<td class="leftValue " >'
							+ list[i].category
							+ '</td>'
							+ '<td class="leftValue " >'
							+ list[i].subCategory 
							+ '</td>'
							+ '<td class="leftValue " >'
							+ list[i].segment 
							+ '</td>'
							+ '<td class="leftValue';
					if(list[i].promotion!=null && list[i].promotion!=undefined && list[i].promotion.length>0 && list[i].promotion!=0 && list[i].promotion!='#')
						content+=' plannerThisPromo ';
						content+='"';
						if(list[i].promotion!=null && list[i].promotion!=undefined && list[i].promotion.length>0 && list[i].promotion!=0 && list[i].promotion!='#')
							content+=' title="'+list[i].promotion+'" ';
						content+=' style="background-position: 93% 52%;">';
						//if(filterFlag!=true)content+='<input type="hidden" class="retailPricePrint" name="retailPricePrint" value="'+ list[i].retailPrice +'"/>';
						
							content+= Number(list[i].retailPrice).toFixed(2) + '</td>'
							+ '<td class="rightValue" >';
						//if(filterFlag!=true)content+='<input type="hidden" class="qtyOfArticleSoldPrint" name="qtyOfArticleSoldPrint" value="'+ list[i].qtyOfArticleSold +'"/>';
						
							content+= Number(list[i].qtyOfArticleSold).toFixed(3) + '</td>'
							+ '</td>' + '<td class="rightValue">'
							+ Number(list[i].salesRetailexcT).toFixed(2)
							+ '<td class="leftValue" >'
							+ list[i].salesUnit
							+ '</td>'
							+ '<td class="rightValue lastColumn" >'
							+ Number(list[i].totDeferdLylty).toFixed(2)
							+ '</td>'
							+ '<td class="leftValue hideBlock promotion">'
							+ list[i].promotion + '</td>' + '</td></tr>';
				}
				if (j % 10 == 0) {
					k++;
				}
				j++;

			}
			
		}
		totPages = Math.ceil(noRec/10);
		$('.sortTable tbody:first').html('');
		$('.sortTable tbody:first').append(content);
		/*$('.scrollWindow:visible').css('width', '1550px');  
		$('.tableScroller:visible').css('display', 'none');*/
		showContentSalesByArticleBlock();
		if($('.sortTable tbody:first').text().length==0){
			if(!$("#deptFilterClear").hasClass("hideBlock")){
				filterFlag=null;
				$(".filterFlag").val(filterFlag);
				//console.log("AFSADF"+filterFlag);
			}
		}
		if($('.sortTable tbody:first').text().length>0 && $("#deptFilterClear").hasClass("hideBlock"))
			{
			showContentSalesByArticleBlock();
			}
		else if(!$("#deptFilterClear").hasClass("hideBlock"))
			{
			showContentSalesByArticleBlock();
			}
		else
		{
			showWarning(NDF);
			}
		
	
			
		updateSortPlugin();
		initialiseTooltip();
		if (flag) {
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ] ];
				// sort on the first column
				$(".sortTable").trigger("sorton");
			}, 30);
		} else{
			$('.paginationDiv ').addClass('hideBlock');
		}
		//closeAccordian();
	} else {
		if (msg == 'null' || msg == NDF)
			showWarning(NDF);
		else if(msg=='' ||(  deptSalesTax!=null && deptSalesTax!=undefined && deptSalesTax.length>0 && (deptSalesTax[0].article== null || deptSalesTax[0].article==undefined || deptSalesTax[0].article=='')))
			showWarning(NDF);
		else
			showError(msg);
	}
	/*if(value!=''){
		$(".sortTable .parentTr").highlight(value);
		$(".sortTable .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".sortTable .parentTr").unhighlight();}*/
}
function bindFilter() {
	var value = '';
	var timeout = '';
	//console.log('search');
	$('.sortTable .textbox').unbind('keyup');
	$('.sortTable .textbox').keyup(function() {
		value = $(this).val().trim();
		//if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		//start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			//your ajax stuff

			/*console.log(value);
			if (value != '') {*/
				formSalesByArticleContent(prevRes, value.toUpperCase());
			/*} else {
				formSalesByArticleContent(prevRes, '');
			}*/

			/*if ($('.parentTr:visible').length == 0) {
				$('.sortTable ').find('tr :first').addClass('hideBlock');
				//$('.totVal').addClass('hideBlock');
			} else {
				$('.sortTable').find('tr :first').removeClass('hideBlock');
				//$('.totVal').removeClass('hideBlock');
			}*/
		}, 500);

	});

}

function showContentSalesByArticleBlock() {
	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');

}
function printResult(newList) {
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

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {

	$('#reportContent,#reportContent,.ContentTable.actionRows').addClass(
			'hideBlock');
	//$('.paginationWrapper').hide();
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

function initialiseTooltip() {
	
	$("input.editNumCell,input.editDateCell").tooltip().off(
			"mouseover mouseout");

	$("td").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});
	$("th").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});
	

}
function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						
						//$('.scPrint').text('');
						$('#segmentLst li input').removeProp('checked');
						//$('#categoryLst li input').removeProp('checked');
						$('#subCategoryLst li input').removeProp('checked');
						
						$("#segmentLst").addClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#segment").removeClass('hideBlock');
						// my line
						$("#segmentTotal").addClass('hideBlock');

						$("#subCategoryLst").empty();
						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');
						$('#subCat').addClass('hideBlock');
						$('#subCategoryLst').removeClass('hideBlock');
						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var categoryStr = "";
						var i = 1;
						var categoryValuePrint = $(selectedValueId)
						.attr('id');
						//console.log($('#'+categoryValuePrint).val());
						$('.catPrint').text($('#'+categoryValuePrint).val());
						//console.log($('.catPrint').text($(this).attr('id')));
						if (catFlag != selectedValue) {
							var catHierarchyId = ($(selectedValueId)
									.attr('data-tt-id'));
							
							var servletUrl = '../article/fetchSubCategoryDetails.htm?iv_parent_node='
									+ selectedValue;
							$
									.getJSON(
											servletUrl,
											function(options) {

												if (options) {
													$
															.map(
																	options.subCategoryInfoList,
																	function(
																			item) {
																		nodeID = catHierarchyId
																				+ "."
																				+ i;
																		nodeIdTemp = nodeID
																				+ ".1";
																		categoryStr = '<li><input type="radio" name="subCat" class="subCat" data-tt-id="'
																				+ nodeID
																				+ '" data-tt-parent-id="'
																				+ catHierarchyId
																				+ '" id="'
																				+ item.node
																				+ '" value="'
																				+ item.node
																				+ '"/><label for="'
																				+ item.node
																				+ '" class="lastColumn">'
																				+ item.nodeDesc
																				+ '</label></li>';
																		$(
																				'#subCategoryLst')
																				.append(
																						categoryStr);
																		i++;
																		catFlag = selectedValue;
																		$(
																				"#subCatTotal")
																				.removeClass(
																						'hideBlock');
																		$(
																				"#subTotal")
																				.text(
																						$(
																								"#subCategoryLst li")
																								.size());
																	});
													$('#segmentBtn')
															.removeClass(
																	'hideBlock');
												}
												subCategory();
											});

						}
						bindDynaCtrlInputChange('input[name="subCat"]','input[name="subCat"]:checked','input[name="subCategoryListHdn"]');
					});
	/*----------------******  End Category Click function   *****--------------- */
}
function subCategory() {
	/*----------------******  SubCategory Click function   *****---------------- */
	subCatFlag = "Null";
	$(".subCat")
			.click(
					function() {
						
							
						
						$('#segment').addClass('hideBlock');
						$('#segmentLst').removeClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#segmentTotalCnt").text('');
						$("#segmentLst").empty();

						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var subCatStr = "";
						//var i = 1;
						var subCatPrint=$(selectedValueId).attr('id');
						$('.scPrint').text($('#'+subCatPrint)
								.val());
						console.log($('#'+subCatPrint)
								.val());
						if (subCatFlag != selectedValue) {
							var subCatHierarchyId = ($(selectedValueId)
									.attr('data-tt-id'));
							var servletUrl = '../article/fetchSegmentDetails.htm?iv_parent_node='
									+ selectedValue;
							$
									.getJSON(
											servletUrl,
											function(options) {
												if (options) {
													$
															.map(
																	options.segmentInfoList,
																	function(
																			item) {

																		subCatStr = '<li><input type="radio" name="segme" class="segment" data-tt-id="" data-tt-parent-id="'
																				+ subCatHierarchyId
																				+ '" id="'
																				+ item.node
																				+ '" value="'
																				+ item.node
																				+ '"/><label for="'
																				+ item.node
																				+ '" class="lastColumn">'
																				+ item.nodeDesc
																				+ '</label></li>';
																		$(
																				'#segmentLst')
																				.append(
																						subCatStr);
																		subCatFlag = selectedValue;

																		$(
																				"#segmentTotal")
																				.removeClass(
																						'hideBlock');
																		$(
																				"#segmentTotalCnt")
																				.text(
																						$(
																								"#segmentLst li")
																								.size());
																	});

													$('#segmentBtn')
															.removeClass(
																	'hideBlock');

												}
												segment();
											});

						}
						bindDynaCtrlInputChange('input[name="segme"]','input[name="segme"]:checked','input[name="segmentListHdn"]');
					});// subcat
	/*----------------******  End SubCategory Click function   *****--------------- */
}

function segment()
{
	$(".segment")

.click(
		function() {
			
				
			var selectedValueId = "#" + this.id;
		
		
			var segmentPrint=$(selectedValueId).attr('id');
			$('.segPrint').text($('#'+segmentPrint)
					.val());
			console.log($('#'+segmentPrint)
					.val());
			
			bindDynaCtrlInputChange();
		});
}

function showWarning(text) {	
	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	
	$('.paginationDiv').addClass('hideBlock');
}
function showdeptFilter(){
	var deptHead='<thead class="deptFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox deptArtr" name="deptArtr"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptArtd" name="deptArtd"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptCat" name="deptCat"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptSub" name="deptSub"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptSeg" name="deptSeg"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptRetp" name="deptRetp"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptQty" name="deptQty"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptVal" name="deptVal"></td>'
		+'<td class="centerValue"><input type="#" class="textbox deptUnit" name="deptUnit"></td>'
		+'<td class="centerValue"><input type="#" class="textbox totDfrdLyl" name="totDfrdLyl"></td>'
		+'</tr></thead>';
		$(deptHead).insertAfter('.sortTable thead:first');
		$(".tablesorter-headerRow ").removeClass('hideBlock');
		bindFilter();
		
}
function hidedeptFillter(){
	$('.deptFillterHdr').remove();
	
	//articleVoidRefund(prevRes, '');
	//formSavedTransactionContent(prevRes, '');
	formSalesByArticleContent(prevRes, '');
	
	$(".tablesorter-headerRow ").removeClass('hideBlock');
}



function salesByArticlePrintJapser() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		if(headIndex !="" && headIndex!= null)
			{
		headerSort = $("#sortTable thead tr th:nth-child("+(Number(headIndex)+1)+")").attr('aria-sort');
			}
		$("#headerDesc").val(headerDesc);
		$("#headerSort").val(headerSort);
		$('#salesByArticle').attr("action", "getSalesByArticletoPDF.pdf");
		$('#salesByArticle').attr('target','_blank');
		$('#salesByArticle').submit();
	}
}


function pagenationCallbackMethod(pageNo) {
	var tot = 0;
	var totDefrdLylt = 0;
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

	$('.sortTable .parentTr')
			.filter(
					function() {

						tot += Number($(this).children(':nth-child(8)')
								.text().trim());
						totDefrdLylt += Number($(this).children(':nth-child(10)')
								.text().trim());
						
					});
	
	$('.sortTable .storeValue').text(tot.toFixed(2));
	$('.sortTable .dfrdLyltTot').text(totDefrdLylt.toFixed(2));
	setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
		

}

function sortTotValPrint() {

	var tot = 0;


	$('.salesTablePrint .parentTrPrint')
			.filter(
					function() {

						tot += Number($(this).children(':nth-child(8)')
								.text().trim());
						
					});
	
	$('.salesTablePrint .storeValuePrint').text(tot.toFixed(2));
		

}
function setPromoCheckStat(promoObj) {
    if (promoObj.is(':checked')) {
		$('#promotionButtonCheck').val('Y');
    }
    else {
		$('#promotionButtonCheck').val('N');
    }
}

$( document ).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#sortTable"), $("#saleByArtSortAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		shiftKeyFunction(tableHeaderObj, $("#saleByArtSortAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		ctrlKeyFunction($("#saleByArtSortAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		clickFunction(tableHeaderObj, $("#saleByArtSortAttr"));
	}
}
$(document).ready(function() {
	$(window).resize(function() {
		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
	});
	$(window).scroll(function() {
		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
	});
});
