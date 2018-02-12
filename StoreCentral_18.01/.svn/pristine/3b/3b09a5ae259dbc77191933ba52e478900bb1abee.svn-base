var salesEvent = '';
var warnPopupFlag = false;
var addDtls = '';
var CateDesc = "";
var Index = "";
var lockdownFlag;
var forecastLock;
var subCatIdFlag = "";
var nextAccClick = 'false';
var weekStartDate = '';
var allocDtl = '';
var endDate = '';
var accordOpenFlag = true;
var previousEvent = '';
var prevPageNo = '';
var lockFlagMsg = "Article is locked, value cannot be changed";
var buildLock2DayPriorMsg = "Build Quantity cannot be changed 48hrs prior to the roster date";
var buildFirstWeekLockMsg = "Build Quantity cannot be entered due to promotion starting in previous week";
var autoFrctLockMsg = "Value cannot be changed due to Automated Forecasting";
var lockDownFlagMsg = "Department Locked.Unable to edit";
var multiplePromotions = "Promotion Planning only be able at promotion level";
var $currentlyFocusedItem;
var demandMaxLimit = 9999;
var buildMaxLimit = 9999;
var displayMaxLimit = 9999;
var disp = 'ZDIS';
var comp = 'ZCOM';
var clr = 'ZCLR';
var itemsOnPage = 10;
var deactivated = '<label class="deactive">De-activated</label>';
var instoreDisplayList=[];
var currentPage = 1;

// var tabOpenFlag=true;
$(function() {
	$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if ($('#generateReport').is(':visible')) {
				$("#generateReport").trigger('click');
			}
		}
	});
	
	$(window).resize(function() {
		if ((($(window).width() - 1004) / 2) < 20)
			$('.fixedHeader').addClass('hideBlock').css('left', '20px');
		else
			$('.fixedHeader').css('left', ($(window).width() - 1004) / 2);
	});

	$("#generateReport").click(function() {
		if(validateForm()){
			var data = $('#inStoreDisplay')
			.serialize();
			itemsOnPage = 10;
		inStoreDeptSearch(data);
		}
	});

	function inStoreDeptSearch(data) {
		$.ajax({
			type : "get",
			url : "getInStoreDisplayReportDtls.htm",
			data : data,
			beforeSend : function() {
				startLoading();
				fullScreenLoader();
				hideReportTable();
				hideError();
			},
			success : function(response) {
				var output = $.parseJSON(response);
				var articleList = output.data;
				var msg = output.msg;
				if(msg=='null' && articleList != null && articleList != undefined){
				instoreDisplayList = articleList;
				var resultCount = articleList.length;
				$('.totalRecCount strong').text(instoreDisplayList.length);
				recordCount = articleList.length;
				currentPage = 1;
				if( resultCount <= itemsOnPage)
					itemsOnPage = resultCount;
				articleList = jQuery.grep(articleList, function( n, i ) {
					  return ( i < itemsOnPage);
					});
				iterateArticles(articleList, '');
				printInStoreDisplayResponse(response);
				printDaysCalculation();
				}
				else
					{
					showError(msg);
					}
				stopLoading();
				$.loader('close');
			},
			error : function(response) {
				showError('Technical issue occured.');
				stopLoading();
				$.loader('close');
			},
		});
	}

	$('.department').click(
			function() {
				$('#departmentInDisplayReport option[value="' + $(this).val() + '"]').prop(
						'selected', true);
			});
	
	$("label,option,select").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	$('.hierarchyWrapper input[type=radio]').click(function() {
		$('.hierarchyname').val($(this).next().text());
	});
	
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});

	});

	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	// Code to show and hide article heirarchy
	$('#departmentInDisplayReport')
			.change(
					function() {
						$(".hierarchyname")
								.val(
										$(
												'#departmentInDisplayReport option[value="'
														+ $("#departmentInDisplayReport")
																.val() + '"]')
												.text());

					});
	$('#depH').click(function() {
		if ($(this).is(':checked')) {
			$("#articleHierarchy").removeClass('hideBlock');
			$('#' + $('#departmentInDisplayReport').val()).click();
			$('#departmentInDisplayReport').attr('disabled', 'disabled');
		} else {
			$("#articleHierarchy").addClass('hideBlock');
			$('#departmentInDisplayReport').removeAttr('disabled');
		}
		hideError();
	});

	/* Code for hierarchy */

	$("input[name='departmentList']").click(function() {
		$("#catDiv").find(".noSelection").addClass('hideBlock');
		$("#catDiv").find("ul").removeClass('hideBlock');
		$("#catDiv").find(".totalCount").removeClass('hideBlock');

		$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
		$("#subCatDiv").find("ul").addClass('hideBlock');
		$("#subCatDiv").find(".totalCount").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');

	});

	$("input[name='categoryList']").click(function() {
		$("#subCatDiv").find(".noSelection").addClass('hideBlock');
		$("#subCatDiv").find("ul").removeClass('hideBlock');
		$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
		// $("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');
	});

	$("input[name='subCatList']").click(function() {
		// $("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeIn(400);

		$("#segDiv").find(".noSelection").addClass('hideBlock');
		$("#segDiv").find("ul").removeClass('hideBlock');
		$("#segDiv").find(".totalCount").removeClass('hideBlock');
	});

	// Code for inner tabs to dispay sections
	// Code for accordion in the tab section
	$(".accordionWrapper").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	});


	// Code for tooltip
	$("a").tooltip({
		position : {
			my : "left top",
			at : "left top-40"
		}
	});

	// Code for global menu
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});


	/*----------------******  Department Click function   *****--------------- */
	$("#deptLstCnt").text($("#deptlst li").size());
	deptFlag = "Null";
	var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {
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

						// if (deptFlag != selectedValue) {
						var deptHierarchyId = parseInt($(selectedValueId).attr(
								'data-tt-id'));
						var servletUrl = 'fetchDetails.htm?iv_parent_node='
								+ selectedValue;
						var c = 0;
						$
								.getJSON(
										servletUrl,
										function(options) {

											if (options) {
												$
														.map(
																options.categoryInfoList,
																function(item) {
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

						// }

					});
	/*----------------******  End Department Click function   *****--------------- */


	// added for one department load
	if ($('#departmentInDisplayReport option') != undefined
			&& $('#departmentInDisplayReport option').length == 2) {
		$('#department').val($('#departmentInDisplayReport option:nth-child(2)').val());
	}
	

});
function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						$('#segmentLst li input').removeProp('checked');
						// $('#categoryLst li input').removeProp('checked');
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
						// if (catFlag != selectedValue) {
						var catHierarchyId = ($(selectedValueId)
								.attr('data-tt-id'));
						var servletUrl = 'fetchSubCategoryDetails.htm?iv_parent_node='
								+ selectedValue;
						$
								.getJSON(
										servletUrl,
										function(options) {

											if (options) {
												$
														.map(
																options.subCategoryInfoList,
																function(item) {
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
												$('#segmentBtn').removeClass(
														'hideBlock');
											}
											subCategory();
										});

						// }

					});
	/*----------------******  End Category Click function   *****--------------- */
}
function subCategory() {
	/*----------------******  SubCategory Click function   *****---------------- */
	subCatFlag = "Null";
	$(".subCat")
			.click(
					function() {
						// $('.subCat').click(function() {
						// $(this).removeClass('subCat');

						$('#segment').addClass('hideBlock');
						$('#segmentLst').removeClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#segmentTotalCnt").text('');
						$("#segmentLst").empty();

						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var subCatStr = "";
						var i = 1;
						// if (subCatFlag != selectedValue) {
						var subCatHierarchyId = ($(selectedValueId)
								.attr('data-tt-id'));
						var servletUrl = 'fetchSegmentDetails.htm?iv_parent_node='
								+ selectedValue;
						$
								.getJSON(
										servletUrl,
										function(options) {
											if (options) {
												$
														.map(
																options.segmentInfoList,
																function(item) {

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

												$('#segmentBtn').removeClass(
														'hideBlock');

											}
										});

						// }
					});// subcat
	/*----------------******  End SubCategory Click function   *****--------------- */
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

function getArticlesForPagination(pageNo) {
	
	var actualIndex= pageNo - 1;
	var articleList = '';
	articleList = instoreDisplayList;
	var startIndex = '';
	var endIndex = '';
	if(actualIndex == 0)
		{
		startIndex = 0;
		endIndex = itemsOnPage;
		}
	else if(actualIndex != 0)
		{
		startIndex= actualIndex*itemsOnPage;
		endIndex = pageNo*itemsOnPage;
		}
	articleList = jQuery.grep(articleList, function( n, i ) {
		  return ( i >= startIndex && i < endIndex);
		});
	currentPage=pageNo;
	iterateArticles(articleList, '');
}

function iterateArticles(articleList, subCatId, startIndex, endIndex) {
	
	var content = "";
	if (articleList != null && articleList.length > 0) {
		
		var article = "";
		$
				.each(
						articleList,
						function(i, item) {

							item.article = item.article != null ? item.article
									: "";

							item.promoType = (item.promoType != null && item.promoType != undefined) ? item.promoType
									.toLocaleUpperCase()
									: "";
							item.prom_disp_start_day = item.prom_disp_start_day != null ? item.prom_disp_start_day
									: "";

							item.prom_disp_end_day = item.prom_disp_end_day != null ? item.prom_disp_end_day
									: "";

							item.om = (item.om != null && item.om != 0 && item.om != '') ? item.om
									: 1;
							item.articleDesc = item.articleDesc != null ? item.articleDesc
									: "";
							item.articleUom = item.articleUom != null ? item.articleUom
									: "";
							item.promoPrice = item.promoPrice != null  ? 
									item.promoPrice : "";
							item.promoSavings = (item.promoSavings != null) ? item.promoSavings
									: "";
							item.displayType = item.displayType != null ? (item.in_prom_type == 'C' ? item.displayType
									: 'IS')
									: "";
							item.mediaType = item.mediaType != null ? item.mediaType
									: "";
							item.promoForecast = (item.promoForecast != null && item.promoForecast != '0') ? ((item.promoForecast / item.om) != 'NaN' ? (item.promoForecast / item.om)
									.toFixed(0)
									: "")
									: "";

							item.oldDisplayQty = (item.oldDisplayQty != null ) ? item.oldDisplayQty 
									: "";
							item.orginal_build = (item.orginal_build != null && item.orginal_build != '0') ? ((item.orginal_build / item.om) != 'NaN' ? (item.orginal_build / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_display = (item.orginal_display != null && item.orginal_display != '0') ? ((item.orginal_display / item.om) != 'NaN' ? (item.orginal_display / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_demand = (item.orginal_demand != null && item.orginal_demand != '0') ? ((item.orginal_demand / item.om) != 'NaN' ? (item.orginal_demand / item.om)
									.toFixed(0)
									: "")
									: "";
							item.oldBuildQty = (item.oldBuildQty != null ) ? item.oldBuildQty 
									: "";
							item.demandQtyUpdateFlag = item.demandQtyUpdateFlag != null ? item.demandQtyUpdateFlag
									: "";
							item.displayQtyUpdateFlag = item.displayQtyUpdateFlag != null ? item.displayQtyUpdateFlag
									: "";
							item.buildQtyUpdateFlag = item.buildQtyUpdateFlag != null ? item.buildQtyUpdateFlag
									: "";
							item.buildLockDownFlag = item.buildLockDownFlag != null ? item.buildLockDownFlag
									: "0";
							item.demandLockDownFlag = item.demandLockDownFlag != null ? item.demandLockDownFlag
									: "0";
							item.displayLockDownFlag = item.displayLockDownFlag != null ? item.displayLockDownFlag
									: "0";
							item.baseForecast = (item.baseForecast != null && item.baseForecast != '0') ? ((item.baseForecast / item.om) != 'NaN' ? (item.baseForecast / item.om)
									.toFixed(0)
									: "0")
									: "0";
							item.promoForecast = (item.promoForecast != null
									&& item.promoForecast != '' && item.promoForecast != '0') ? item.promoForecast
									: (item.baseForecast != null && item.baseForecast != '') ? item.baseForecast
											: '0';
							item.oldDemandQty = (item.oldDemandQty != null ) ? item.oldDemandQty 
									: "";
							

							item.totalNoOfWeeks = item.totalNoOfWeeks != null ? item.totalNoOfWeeks
									: "";
							item.promoWeek = item.promoWeek != null ? item.promoWeek
									: "";
							item.oldDeliveryDate = item.oldDeliveryDate != null ? item.oldDeliveryDate
									: "";
							item.suppNo = item.suppNo != null ? item.suppNo
									.replace(/^0+/, '') : "";
							item.supplierName = item.supplierName != null ? item.supplierName
									: "";
							

							item.packBrkArticleNo = item.packBrkArticleNo != null ? item.packBrkArticleNo
									: "";
							item.displayNo = item.displayNo != null ? (item.in_prom_type == 'C' ? item.displayNo
									: '')
									: "";

							item.weekSalesQty = item.weekSalesQty != null ? ((item.weekSalesQty / item.om) != 'NaN' ? (item.weekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.estWeekSalesQty = item.estWeekSalesQty != null ? ((item.estWeekSalesQty / item.om) != 'NaN' ? (item.estWeekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.residual = item.residual != null ? ((item.residual / item.om) != 'NaN' ? (item.residual / item.om)
									.toFixed(0)
									: "")
									: "";
							item.demandMaxLimit = item.demandMaxLimit != null ? item.demandMaxLimit
									: "";
							item.allocationFlag = (item.allocationFlag != null && item.allocationFlag != undefined) ? item.allocationFlag
									: "";

							item.media_desc = item.media_desc != null ? item.media_desc
									: "";

							weekStartDate = item.promoStartDate;
							endDate = item.promoEndDate;
							content += '<tr id="'
									+ i
									+ '" class="defaultExpanded subHeader appendedRow">'
									+ '<td class="centerValue">'
									+ item.article 
									+ '</td> <td class="centerValue" colspan="4">' 
									+ item.articleDesc
									+ '<label class="hideBlock promDate">'
									+ article + '_' + item.promoStartDate
									+ '</label></td>';

							content +='<td class="centerValue" title="UOM"> <span id="pdbArticle-'
									+ item.article
									+ '" class="hideBlock">'
									+ item.packBrkArticleNo
									+ '</span>'
									+ item.articleUom
									+ '</td>'
									+ '<td class="centerValue" title="Week">'
									+ item.promoWeek
									+ ' of '
									+ item.totalNoOfWeeks
									+ '</td>'
									+ '<td class="prom-days numberColumn centerValue'
									+ item.article
									+ item.articleUom
									+ '" title="Days"><span class="start-end-day  hideBlock">'
									+ item.promoStartAndEndDay
									+ '</span></td>'
									+ '<td class="numberColumn centerValue priceMore" title="Price">';
							if(item.promoPrice != null)
							content += '$'+ Number(item.promoPrice).toFixed(2) ;
							else
								content += '';	
							content += '</td>'
									+ '<td class="numberColumn centerValue" title="Savings">';
							if(item.promoSavings != null)
								content += '$'+ Number(item.promoSavings).toFixed(2) ;
								else
									content += '';	
							content +='</td>';

							content += '<td class="centerValue displayMore" title="Display"><label>'
									+ item.displayType;
							if (item.displayNo != '')
								content += '-';
							content += item.displayNo
									+ '</label></td>';
							
									content += '<td class="centerValue columnDivider" title="Promotion">'
									+ item.promoForecast
									+ '</td>';
									content += '<td class="centerValue">';
									if(item.oldDemandQty != null && item.oldDemandQty != '0'){ 
										if((item.oldDemandQty / item.om) != 'NaN' )
										content += (item.oldDemandQty / item.om).toFixed(0);
										else if((item.oldDemandQty / item.om).toFixed(0).trim() == '' )
											content += item.promoForecast;
									}
									else
										{
										content += '0';
										}
										

							content = content + '</td>'
									+ '<td class="centerValue">';
									if(item.oldDisplayQty != null && item.oldDisplayQty != '0'){ 
										if((item.oldDisplayQty / item.om) != 'NaN' )
										content += oldDispquantityRoundOff(item.oldDisplayQty,item.om); // CR modifications for rouding up build and display qty
									}
									else
										{
										content += '0';
										}
									
									
							content = content
									+ '</td>'
									+ '<td class="buildTd centerValue columnDivider">';
									
									if(item.oldBuildQty != null && item.oldBuildQty != '0'){ 
										if((item.oldBuildQty / item.om) != 'NaN' )
										content += oldBuildquantityRoundOff(item.oldBuildQty,item.om); // CR modifications for rouding up build and display qty
									}
									else
										{
										content += '0';
										}
									
							content = content
									+ '</td>'
									+ '<td class="residueTd centerValue currentweek hideBlock columnDivider" title="Residual">'
									+ item.residual
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek hideBlock columnDivider" title="Residual">'
									+ item.residual
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek hideBlock columnDivider wtd" title="WTD">'
									+ item.weekSalesQty
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek  hideBlock columnDivider ewtd" title="Est.WTD">'
									+ item.estWeekSalesQty
									+ '</td>'
									+ '<td class="centerValue" title="'
									+ item.supplierName
									+ '">'
									+ item.suppNo
									+ '</td>'
									+ '<td class="centerValue deliveryDtTd lastColumn">';

							content += item.oldDeliveryDate + '</td></tr>';
							
						});

		
		$('.paginationWrapper').pagination(
				{
					items : recordCount,
					itemsOnPage : itemsOnPage,
					cssStyle : 'compact-theme',
					currentPage : currentPage,
					selectOnClick : false,
					onPageClick : function(pageNumber, event) {

						getArticlesForPagination(pageNumber);
					}
				});
		if (recordCount / itemsOnPage > 1) {

			$('.paginationWrapper').removeClass('hideBlock');
		} else {
			$('.paginationWrapper').addClass('hideBlock');
		}
		setDay(weekStartDate);
		securityMatrix();
		var selectedWeek = $('#promotionWeek option:selected').text();
		var selectedDept=$('#departmentInDisplayReport option:selected').text();
		var selectedCat='';
		var selectedSubCat='';
		var selectedSeg='';
		if($('#depH').is(':checked'))
			{
		selectedCat=$('input[name=category]:checked', '#inStoreDisplay').next('label').text();
		selectedSubCat=$('input[name=subCat]:checked', '#inStoreDisplay').next('label').text();
		selectedSeg=$('input[name=segme]:checked', '#inStoreDisplay').next('label').text();
			}
		$('.todayDate strong').text(setDefaultDate);
		$('.promotionFor strong').text(selectedWeek+', '+weekStartDate+' - '+endDate);
		
		$('#promStartDate').val(weekStartDate);
		$('#promEndDate').val(endDate);
		$('#promoStartDate').val(weekStartDate);
		$('#promoEndDate').val(endDate);
		
		$('.deptPage strong').text(selectedDept);
		$('.catPage strong').text(selectedCat);
		$('.subCatPage strong').text(selectedSubCat);
		$('.segPage strong').text(selectedSeg);
		
		$('.depPrint').text(selectedDept);
		$('.catPrint').text(selectedCat);
		$('.scPrint').text(selectedSubCat);
		$('.segPrint').text(selectedSeg);
		
		if(selectedCat !="" && selectedCat != null && selectedCat != undefined)
		$('.catPage').removeClass('hideBlock');
		else
			$('.catPage').addClass('hideBlock');	
		if(selectedSubCat !="" && selectedSubCat != null && selectedSubCat != undefined)
		$('.subCatPage').removeClass('hideBlock');
		else
			$('.subCatPage').addClass('hideBlock');	
		if(selectedSeg !="" && selectedSeg != null && selectedSeg != undefined)
		$('.segPage').removeClass('hideBlock');
		else
			$('.segPage').addClass('hideBlock');	
		
		$('#instorePromoReportTable tbody').html('');
		$('#instorePromoReportTable tbody').append(content);
		
		addScrollToTable();
		bindScrollBar();
		showReportTable();
		populateDays();

	}

}

var key = '';
var editString = '';

function formateDate(v) {
	if (v.split("/")[2] == 4) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}
function calDays(val) {
	if (val == day1)
		return 1;
	else if (val == day2)
		return 2;
	else if (val == day3)
		return 3;
	else if (val == day4)
		return 4;
	else if (val == day5)
		return 5;
	else if (val == day6)
		return 6;
	else if (val == day7)
		return 7;
}
var day1, day2, day3, day4, day5, day6, day7;
function setDay(startDay) {
	var fromDate = startDay;
	var date = new Date();
	var partsOne = fromDate.split('/');
	date.setFullYear(partsOne[2], partsOne[1] - 1, partsOne[0]);
	date.setTime(date.getTime());
	if (date.getDay() == 0) {
		day1 = 'Sun', day2 = 'Mon', day3 = 'Tue', day4 = 'Wed', day5 = 'Thu',
				day6 = 'Fri', day7 = 'Sat';
	} else if (date.getDay() == 1) {
		day7 = 'Sun', day1 = 'Mon', day2 = 'Tue', day3 = 'Wed', day4 = 'Thu',
				day5 = 'Fri', day6 = 'Sat';
	} else if (date.getDay() == 2) {
		day6 = 'Sun', day7 = 'Mon', day1 = 'Tue', day2 = 'Wed', day3 = 'Thu',
				day4 = 'Fri', day5 = 'Sat';
	} else if (date.getDay() == 3) {
		day5 = 'Sun', day6 = 'Mon', day7 = 'Tue', day1 = 'Wed', day2 = 'Thu',
				day3 = 'Fri', day4 = 'Sat';
	} else if (date.getDay() == 4) {
		day4 = 'Sun', day5 = 'Mon', day6 = 'Tue', day7 = 'Wed', day1 = 'Thu',
				day2 = 'Fri', day3 = 'Sat';
	} else if (date.getDay() == 5) {
		day3 = 'Sun', day4 = 'Mon', day5 = 'Tue', day6 = 'Wed', day7 = 'Thu',
				day1 = 'Fri', day2 = 'Sat';
	} else if (date.getDay() == 6) {
		day2 = 'Sun', day3 = 'Mon', day4 = 'Tue', day5 = 'Wed', day6 = 'Thu',
				day7 = 'Fri', day1 = 'Sat';
	} else {
		day5 = 'Sun', day6 = 'Mon', day7 = 'Tue', day1 = 'Wed', day2 = 'Thu',
				day3 = 'Fri', day4 = 'Sat';
	}
}
function returnDaysVals(a, b) {

	if (b > a) {
		for ( var i = a; i <= b; i++) {
			arrays[arrayLen] = i;
			arrayLen++;
		}
	} else if (a > b) {
		for ( var i = a; i != b; i++) {
			arrays[arrayLen] = i;
			arrayLen++;
			if (i == 7)
				i = 0;
		}
		arrays[arrayLen] = b;
		arrayLen++;
	} else if (a = b) {
		arrays[arrayLen] = a;
		arrayLen++;
	}
	return arrays;
}
var arrays = new Array();
var arrayLen = 0;

function printInStoreDisplayResponse(response) {

	var output = $.parseJSON(response);
	var articleList = output.data;
	var msg = output.msg;
	var printContent = '';

	var printHead = '<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block">Instore Promotions - Display Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	'
			+ '<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label>'
			+ ' </div></div><div class="width100 border"><div class="margin5 margontopnone">'
			+ '<label class="">Promotion From : </label><label class="fromDatePrint" id=""></label><label class="separator">-</label><label class="toDatePrint" id="" ></label><label class="separator">|</label><label class="">Department: </label><label class="trading dept" id=""></label><label class="separator cateHide hideBlock">|</label><label class="cateHide hideBlock" >Category: </label><label class="cateHide printOrdNo cat hideBlock" id="" ></label><label class="hideBlock subcatHide separator">|</label>'
			+ '<label class="subcatHide hideBlock">Sub-Category: </label><label class="reason hideBlock subcatHide subCate" id=""></label><label class="separator receiptHide seg-lab hideBlock" >|</label><label class="receiptHide seg-lab hideBlock" >Segment: </label><label class="emp receiptHide seg" ></label>'
			+ '</div>	<table cellspacing="0" class="sortTable ContentTable actionRowPrint" id="sortTable">';

		var printTableHead ='<thead class="hdrMain"><tr><th rowspan="2" class="">Article #</th>'
			+'<th rowspan="2" class="width30">Description</th>'
			+'<th rowspan="2" class="centerValue columnDivider">UOM</th>'
			+'<th colspan="4" class="centerValue columnDivider">Promotion</th>'
			+'<th rowspan="2" class="centerValue columnDivider">Display</th>'
			+'<th class="centerValue columnDivider">Forecast</th>'
			+'<th colspan="3" class="centerValue columnDivider">Store</th>'		
			+'<th colspan="1" class="centerValue columnDivider">Source</th>'	
			+'<th rowspan="2" class="centerValue lastColumn" width="80px">Delivery Date</th></tr>'
			+'<tr class="subHeader"><th class="centerValue">Week</th>'
			+'<th class="centerValue">Days</th>'
			+'<th class="numberColumn">Price</th>'
			+'<th class="numberColumn columnDivider">Savings</th>'
			+'<th class="centerValue columnDivider">Promo</th>'
			+'<th class="centerValue">Demand</th>'													
			+'<th class="centerValue">Display</th><th class="centerValue columnDivider">Build</th>'
			+'<th class="centerValue lastColumn">Supplier</th>'
			+ '</tr></thead><tbody>';

	var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

	var j = 0;
	//var s = 0;
	printContent= printTableHead;
	if (articleList != null && articleList.length > 0) {
		var article = "";
		$
				.each(
						articleList,
						function(i, item) {

							item.article = item.article != null ? item.article
									: "";

							item.promoType = (item.promoType != null && item.promoType != undefined) ? item.promoType
									.toLocaleUpperCase()
									: "";
							item.prom_disp_start_day = item.prom_disp_start_day != null ? item.prom_disp_start_day
									: "";

							item.prom_disp_end_day = item.prom_disp_end_day != null ? item.prom_disp_end_day
									: "";

							item.om = (item.om != null && item.om != 0 && item.om != '') ? item.om
									: 1;

							item.articleDesc = item.articleDesc != null ? item.articleDesc
									: "";
							item.articleUom = item.articleUom != null ? item.articleUom
									: "";
							item.promoPrice = item.promoPrice != null ? "$"
									+ Number(item.promoPrice).toFixed(2) : "";
							item.promoSavings = (item.promoSavings != null) ? "$"
									+ Number(item.promoSavings).toFixed(2)
									: "";
							item.displayType = item.displayType != null ? (item.in_prom_type == 'C' ? item.displayType
									: 'IS')
									: "";
							item.mediaType = item.mediaType != null ? item.mediaType
									: "";
							item.promoForecast = (item.promoForecast != null && item.promoForecast != '0') ? ((item.promoForecast / item.om) != 'NaN' ? (item.promoForecast / item.om)
									.toFixed(0)
									: "")
									: "";
									
									// CR modifications for rouding up build and display qty
							item.oldDisplayQty = (item.oldDisplayQty != null && item.oldDisplayQty != '0') ? ((item.oldDisplayQty / item.om) != 'NaN' ? (oldDispquantityRoundOff(item.oldDisplayQty,item.om)) :"") : "";
							item.orginal_build = (item.orginal_build != null && item.orginal_build != '0') ? ((item.orginal_build / item.om) != 'NaN' ? (item.orginal_build / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_display = (item.orginal_display != null && item.orginal_display != '0') ? ((item.orginal_display / item.om) != 'NaN' ? (item.orginal_display / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_demand = (item.orginal_demand != null && item.orginal_demand != '0') ? ((item.orginal_demand / item.om) != 'NaN' ? (item.orginal_demand / item.om)
									.toFixed(0)
									: "")
									: "";
							item.oldBuildQty = (item.oldBuildQty != null && item.oldBuildQty != '0') ? ((item.oldBuildQty / item.om) != 'NaN' ? (oldBuildquantityRoundOff(item.oldBuildQty,item.om)) :"") : "";
							item.demandQtyUpdateFlag = item.demandQtyUpdateFlag != null ? item.demandQtyUpdateFlag
									: "";
							item.displayQtyUpdateFlag = item.displayQtyUpdateFlag != null ? item.displayQtyUpdateFlag
									: "";
							item.buildQtyUpdateFlag = item.buildQtyUpdateFlag != null ? item.buildQtyUpdateFlag
									: "";
							item.buildLockDownFlag = item.buildLockDownFlag != null ? item.buildLockDownFlag
									: "0";
							item.demandLockDownFlag = item.demandLockDownFlag != null ? item.demandLockDownFlag
									: "0";
							item.displayLockDownFlag = item.displayLockDownFlag != null ? item.displayLockDownFlag
									: "0";
							item.baseForecast = (item.baseForecast != null && item.baseForecast != '0') ? ((item.baseForecast / item.om) != 'NaN' ? (item.baseForecast / item.om)
									.toFixed(0)
									: "0")
									: "0";
							item.promoForecast = (item.promoForecast != null
									&& item.promoForecast != '' && item.promoForecast != '0') ? item.promoForecast
									: (item.baseForecast != null && item.baseForecast != '') ? item.baseForecast
											: '0';
							item.oldDemandQty = (item.oldDemandQty != null && item.oldDemandQty != '0') ? ((item.oldDemandQty / item.om) != 'NaN' ? (item.oldDemandQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.oldDemandQty = item.oldDemandQty.trim() == '' ? (item.promoForecast)
									: item.oldDemandQty;

							item.totalNoOfWeeks = item.totalNoOfWeeks != null ? item.totalNoOfWeeks
									: "";
							item.promoWeek = item.promoWeek != null ? item.promoWeek
									: "";
							item.oldDeliveryDate = item.oldDeliveryDate != null ? item.oldDeliveryDate
									: "";
							item.suppNo = item.suppNo != null ? item.suppNo
									.replace(/^0+/, '') : "";
							item.supplierName = item.supplierName != null ? item.supplierName
									: "";

							item.packBrkArticleNo = item.packBrkArticleNo != null ? item.packBrkArticleNo
									: "";
							item.displayNo = item.displayNo != null ? (item.in_prom_type == 'C' ? item.displayNo
									: '')
									: "";

							item.weekSalesQty = item.weekSalesQty != null ? ((item.weekSalesQty / item.om) != 'NaN' ? (item.weekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.estWeekSalesQty = item.estWeekSalesQty != null ? ((item.estWeekSalesQty / item.om) != 'NaN' ? (item.estWeekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.residual = item.residual != null ? ((item.residual / item.om) != 'NaN' ? (item.residual / item.om)
									.toFixed(0)
									: "")
									: "";
							item.demandMaxLimit = item.demandMaxLimit != null ? item.demandMaxLimit
									: "";
							item.allocationFlag = (item.allocationFlag != null && item.allocationFlag != undefined) ? item.allocationFlag
									: "";

							item.media_desc = item.media_desc != null ? item.media_desc
									: "";

							weekStartDate = item.promoStartDate;
							endDate = item.promoEndDate;
							printContent += '<tr id="'
								+ i
								+ '" class="defaultExpanded subHeader appendedRow">'
								+ '<td class="centerValue">'
								+ item.article 
								+ '</td> <td class="nowrap">' 
								+ item.articleDesc
								+ '<label class="hideBlock promDate">'
								+ article + '_' + item.promoStartDate
								+ '</label></td>';

							printContent += '<td class="centerValue" title="UOM"> <span id="pdbArticle-'
									+ item.article
									+ '" class="hideBlock">'
									+ item.packBrkArticleNo
									+ '</span>'
									+ item.articleUom
									+ '</td>'
									+ '<td class="centerValue" title="Week">'
									+ item.promoWeek
									+ ' of '
									+ item.totalNoOfWeeks
									+ '</td>'
									+ '<td class="prom-days numberColumn centerValue'
									+ item.article
									+ item.articleUom
									+ '" title="Days"><span class="start-end-day  hideBlock">'
									+ item.promoStartAndEndDay
									+ '</span></td>'
									+ '<td class="numberColumn centerValue priceMore" title="Price">'
									+ item.promoPrice
									+ '</td>'
									+ '<td class="numberColumn centerValue" title="Savings">'
									+ item.promoSavings
									+ '</td>'

									+ '<td class="centerValue displayMore" title="Display"><label>'
									+ item.displayType;
							if (item.displayNo != '')
								printContent += '-';
							printContent += item.displayNo
									+ '</label></td>';
							printContent += '<td class="centerValue columnDivider" title="Promotion">'
									+ item.promoForecast
									// + '9'
									+ '</td>';
							printContent += '<td class="centerValue">'
									+ (item.oldDemandQty || '0');

							printContent = printContent + '</td>'
									+ '<td class="centerValue">'
									+ (item.oldDisplayQty || '0');

							printContent = printContent
									+ '</td>'
									+ '<td class="buildTd centerValue columnDivider">'
									+ (item.oldBuildQty || '0');
							printContent = printContent
									+ '</td>'
									+ '<td class="residueTd centerValue currentweek hideBlock columnDivider" title="Residual">'
									+ item.residual
									// + '9'
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek hideBlock columnDivider" title="Residual">'
									+ item.residual
									// + '9'
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek hideBlock columnDivider wtd" title="WTD">'
									+ item.weekSalesQty
									// + '9'
									+ '</td>'
									+ '<td class="residueTd centerValue futureweek  hideBlock columnDivider ewtd" title="Est.WTD">'
									+ item.estWeekSalesQty
									// + '9'
									+ '</td>'
									+ '<td class="centerValue" title="'
									+ item.supplierName
									+ '">'
									+ item.suppNo
									+ '</td>'
									+ '<td class="centerValue deliveryDtTd lastColumn">';

							printContent += item.oldDeliveryDate + '</td></tr>';
						
			//s= i+j;
			if (j % 14 == 0 && j != (articleList.length - 1) && j != 0)
				printContent += '</tbody></table>' + printFoot + printHead +printTableHead;

			j = i + 1;
		//	j = j + 1;

		});
		//printContent += '</tbody></table>';
		printContent = printHead + printContent + "</tbody></table>"
				+ printFoot;
	}
	$('#printbody').html('').append(printContent).append(
			'<link rel="stylesheet" href="../../styles/printstyle.css" />');
	//populateDays();
	//printDaysCalculation();

}

function validateForm()
{
	
	
if($('#promotionWeek').val() == 'Select')
	{
	showError("Please select Promotion week.");
	return false;
	}
else if($('#departmentInDisplayReport').val() == 'Select')
	{
	showError("Please select Department.");
	return false;
	}

if($("#depH").is(":checked")==true){
	$("#depName").val($("input[name=departmentList]:checked").parent().find('label').text());
	$("#catName").val($("input[name=category]:checked").parent().find('label').text());
	$("#subCatName").val($("input[name=subCat]:checked").parent().find('label').text());
	$("#segName").val($("input[name=segment]:checked").parent().find('label').text());
}else{
	$("#depName").val($("#departmentInDisplayReport option:selected").text());
	$("#catName").val("");
	$("#subCatName").val("");
	$("#segName").val("");
}


return true;
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	hideReportTable();
}
function showReportTable() {
	$(
	'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
	.removeClass('hideBlock');
	closeAccordian();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function hideReportTable() {

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').addClass('hideBlock');
}
function closeAccordian() {
	$('#accordion').accordion({
		active : true
	});
}
function populateDays(){
	$('.subHeader:visible')
	.parent()
	.find('.prom-days')
	.each(
			function() {

				var tempStartDay = 7;
				var tempEndDay = 1;
				try {
						var a = 0;
						if ($(this).find('span').text() != ''
								&& ($(this).find('span').text() != undefined))
							a = calDays($(this).find('span').text()
									.split('-')[0].trim());
						var b = 0;
						if ($(this).find('span').text() != ''
								&& $(this).find('span').text() != undefined
								&& $(this).find('span').text()
										.split('-').length > 0)
							b = calDays($(this).find('span').text()
									.split('-')[1].trim());
						tempStartDay = a;
						tempEndDay = b;
						$(this).attr('title',
								$(this).find('span').text());
					$(this).text((tempEndDay - tempStartDay) + 1);
				} catch (err) {
					console.log(err);
				}

			});
	
}
function printDaysCalculation(){
	$('.actionRowPrint tr')
	//.parent()
	.find('.prom-days')
	.each(
			function() {

				var tempStartDay = 7;
				var tempEndDay = 1;
				try {
						var a = 0;
						if ($(this).find('span').text() != ''
								&& ($(this).find('span').text() != undefined))
							a = calDays($(this).find('span').text()
									.split('-')[0].trim());
						var b = 0;
						if ($(this).find('span').text() != ''
								&& $(this).find('span').text() != undefined
								&& $(this).find('span').text()
										.split('-').length > 0)
							b = calDays($(this).find('span').text()
									.split('-')[1].trim());
						tempStartDay = a;
						tempEndDay = b;
						$(this).attr('title',
								$(this).find('span').text());
					$(this).text((tempEndDay - tempStartDay) + 1);
				} catch (err) {
					console.log(err);
				}

			});


}
function setDefaultDate() {
	var date = new Date();
	var month = '';
	if (date.getMonth() + 1 < 10) {
		month = date.getMonth() + 1;
		month = '0' + month;
	} else
		month = date.getMonth() + 1;
	var day = '';
	if (date.getDate() < 10) {
		day = date.getDate();
		day = '0' + day;
	} else
		day = date.getDate();
	return day + '/' + month + '/' + date.getFullYear();
}
function addScrollToTable()
{
	// Code for adding scorllers to the table

	var tableCols = 0;

	$("#instorePromoReportTable tbody tr").each(function() {
		var currCount = 0;
		$(this).children("td").each(function() {
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

	if (tableCols > 11) {
		width = (tableCols * 45) - 100;
		if (width > 1004)
			document.getElementById("scrollWindow").style.width = width + "px";
		else
			document.getElementById("scrollWindow").style.width = "1004px";
	}	
}
function bindScrollBar(){
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
	$('.bottomPagination ').css('margin-top','10px');
}
//following methods are for build and display qty round off--- CR modifications
function oldDispquantityRoundOff(oldDisplayQty,om)
{
	if (Number(oldDisplayQty) < Number(om) )
		return Math.ceil((Number(oldDisplayQty)/Number(om))).toFixed(0);
	if (Number(oldDisplayQty) >= Number(om) )
		return (Number(oldDisplayQty)/Number(om)).toFixed(0);
}
function oldBuildquantityRoundOff(oldBuildQty,om)
{
	if (Number(oldBuildQty) < Number(om) )
		return Math.ceil((Number(oldBuildQty)/Number(om))).toFixed(0);
	if (Number(oldBuildQty) >= Number(om) )
		return (Number(oldBuildQty)/Number(om)).toFixed(0);
}

function instoreDisplayReportPrintPDF()
{
	$('#instoreDisplayReportPdf').attr("action", "downloadInstoreDisplayBigwReportPDF.pdf");
	$('#instoreDisplayReportPdf').attr('target','_blank');
	$('#instoreDisplayReportPdf').attr('method','get');
	$('#instoreDisplayReportPdf').submit();
}