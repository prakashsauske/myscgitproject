var recordCount;
/*----------------******  Department change function   *****--------------- */
$(document)
		.ready(
				function() {
					$("#accordion").accordion({
						header : "h3.mainAccordion",
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
					$('.print').click(function() {
						printReport();
					});
					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});

					/*
					 * Code to - Close accordion when report is generated - Show
					 * results
					 * 
					 * Need to write a code by developer to handle a case when
					 * there is no data. The accordion in this case should
					 * remain open
					 */

					$("#generateReport").click(function() {
						hideError();
						if (!$('.department').is(':checked')) {
							showError('Please select department');
						} else {
							generateReport($('#plannedOrder').serialize(), 1);
						}
					});

					/*
					 * $("#generateReport").click(function(){
					 * $(".ContentTableWrapper").removeClass('hideBlock');
					 * $('#accordion').accordion({active : true }); });
					 */

					$("#tabs").tabs();
					/** ***********code for back button click********* */
					$('#backBtn').click(function() {
						window.location.href = "../login/goingHome.htm";
					});
					/** ***********end of code for back button click********* */

					/** ********code for close button click*********** */
					$('#closeLink').click(function() {
						hideError();
						closeAccordian();
					});
					/*----------------******  Department Click function   *****--------------- */
					$("#deptLstCnt").text($("#deptlst li").size());
					deptFlag = "Null";
					var nodeDesc = 0;
					$('.department')
							.on(
									'click',
									function() {
										hideError();
										$("#segmentLst").addClass('hideBlock');
										$("#segmentBtn").addClass('hideBlock');
										$("#subCategoryLst").addClass(
												'hideBlock');
										$("#segment").removeClass('hideBlock');
										$("#subCat").removeClass('hideBlock');
										$("#noSelectionCat").addClass(
												'hideBlock');
										$("#segmentLst").addClass('hideBlock');
										$("#subCategoryLst").addClass(
												'hideBlock');
										// my line
										$("#subCatTotal").addClass('hideBlock');
										$("#segmentTotal")
												.addClass('hideBlock');

										$("#categoryLst").removeClass(
												'hideBlock');
										$("#categoryLst").empty();
										$("#categoryLstCnt").text('');
										$("#subTotal").text('');
										$("#segmentTotalCnt").text('');
										$('input[name="subCat"]').val('');
										$('input[name="segme"]').val('');
										$('input[name="category"]').val('');//added for defect 14623
										var selectedValue = this.id.toString();
										var selectedValueId = "#" + this.id;
										var departmentStr = "";
										var i = 1;

										if (deptFlag != selectedValue) {
											var deptHierarchyId = parseInt($(
													selectedValueId).attr(
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

									});
					/*----------------******  End Department Click function   *****--------------- */

					/*----------------******  End Department change function   *****--------------- */

				});
function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						hideError();

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
						$('input[name="subCat"]').val('');
						$('input[name="segme"]').val('');//added for defect 14623
						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var categoryStr = "";
						var i = 1;
						if (catFlag != selectedValue) {
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

					});
	/*----------------******  End Category Click function   *****--------------- */
}
function subCategory() {
	/*----------------******  SubCategory Click function   *****---------------- */
	subCatFlag = "Null";
	$(".subCat")
			.click(
					function() {
						hideError();

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
						if (subCatFlag != selectedValue) {
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
											});

						}
					});// subcat
	/*----------------******  End SubCategory Click function   *****--------------- */
}
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function iterateResult(response, pageNumber) {
	var output = $.parseJSON(response);

	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		recordCount = descList[0].count;
		currentPage = pageNumber;
		var myDate=new Date();
		var dayOne=new Date();
		var dayTwo =new Date();
		var dayThree =new Date();
		var dayFour=new Date();
		var dayFive =new Date();
		var daySix =new Date();
		dayOne.setDate(dayOne.getDate()+1);
		dayTwo.setDate(dayTwo.getDate()+2);
		dayThree.setDate(dayThree.getDate()+3);
		dayFour.setDate(dayFour.getDate()+4);
		dayFive.setDate(dayFive.getDate()+5);
		daySix.setDate(daySix.getDate()+6);
		
		var content = '<tr><th class="header">Article #</th><th class="header">Description</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', myDate)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayOne)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayTwo)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayThree)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFour)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFive)+'</th><th class="lastColumn centerValue header">'+$.datepicker.formatDate('dd/mm', daySix)+'</th></tr>';
		// $('.appended').remove();
		
		$.each(descList, function(i, item) {
			item.day1Qty=(item.day1Qty!=null && item.day1Qty!=undefined)? item.day1Qty :'';
			item.day2Qty=(item.day2Qty!=null && item.day2Qty!=undefined)? item.day2Qty :'';
			item.day3Qty=(item.day3Qty!=null && item.day3Qty!=undefined)? item.day3Qty :'';
			item.day4Qty=(item.day4Qty!=null && item.day4Qty!=undefined)? item.day4Qty :'';
			item.day5Qty=(item.day5Qty!=null && item.day5Qty!=undefined)? item.day5Qty :'';
			item.day6Qty=(item.day6Qty!=null && item.day6Qty!=undefined)? item.day6Qty :'';
			item.day7Qty=(item.day7Qty!=null && item.day7Qty!=undefined)? item.day7Qty :'';
			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.articleNo + ' ('+item.articleUom+')</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.day1Qty
					+ '</td>' + '<td class="centerValue">' + item.day2Qty
					+ '</td>' + '<td class="centerValue">' + item.day3Qty
					+ '</td>' + '<td class="centerValue">' + item.day4Qty
					+ '</td>' + '<td class="centerValue">' + item.day5Qty
					+ '</td>' + '<td class="centerValue">' + item.day6Qty
					+ '</td>' + '<td class="centerValue">' + item.day7Qty
					+ '</td> </tr>';
			// console.log(item.articleNo);

		});
		$('.ContentTable.actionRows').html('');
		$('.ContentTable.actionRows').html(content);
		hideContent();
		if (recordCount > 20) {
			showPaginatedContent(recordCount);
		} else {
			showContent(recordCount);
		}
	}
	stopLoading();

}
function printResult(response) {

	var output = $.parseJSON(response);

	if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		// recordCount = descList[0].msg;
		// currentPage = pageNumber;
		var myDate=new Date();
		var dayOne=new Date();
		var dayTwo =new Date();
		var dayThree =new Date();
		var dayFour=new Date();
		var dayFive =new Date();
		var daySix =new Date();
		dayOne.setDate(dayOne.getDate()+1);
		dayTwo.setDate(dayTwo.getDate()+2);
		dayThree.setDate(dayThree.getDate()+3);
		dayFour.setDate(dayFour.getDate()+4);
		dayFive.setDate(dayFive.getDate()+5);
		daySix.setDate(daySix.getDate()+6);
		var content = '<tr><th class="header">Article #</th><th class="header">Description</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', myDate)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayOne)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayTwo)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayThree)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFour)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFive)+'</th><th class="lastColumn centerValue header">'+$.datepicker.formatDate('dd/mm', daySix)+'</th></tr>';
		// $('.appended').remove();
		$.each(descList, function(i, item) {

			item.day1Qty=(item.day1Qty!=null && item.day1Qty!=undefined)? item.day1Qty :'';
			item.day2Qty=(item.day2Qty!=null && item.day2Qty!=undefined)? item.day2Qty :'';
			item.day3Qty=(item.day3Qty!=null && item.day3Qty!=undefined)? item.day3Qty :'';
			item.day4Qty=(item.day4Qty!=null && item.day4Qty!=undefined)? item.day4Qty :'';
			item.day5Qty=(item.day5Qty!=null && item.day5Qty!=undefined)? item.day5Qty :'';
			item.day6Qty=(item.day6Qty!=null && item.day6Qty!=undefined)? item.day6Qty :'';
			item.day7Qty=(item.day7Qty!=null && item.day7Qty!=undefined)? item.day7Qty :'';
			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.article + ' ('+item.articleUom+')</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.day1Qty
					+ '</td>' + '<td class="centerValue">' + item.day2Qty
					+ '</td>' + '<td class="centerValue">' + item.day3Qty
					+ '</td>' + '<td class="centerValue">' + item.day4Qty
					+ '</td>' + '<td class="centerValue">' + item.day5Qty
					+ '</td>' + '<td class="centerValue">' + item.day6Qty
					+ '</td>' + '<td class="centerValue">' + item.day7Qty
					+ '</td> </tr>';
			// console.log(item.articleNo);

		});
		$('.ContentTable.actionRowPrint').html('');
		$('.ContentTable.actionRowPrint').html(content);
		// hideContent();
		// if (recordCount > 20) {
		// showPaginatedContent(recordCount);
		// } else {
		// showContent(recordCount);
		// }
		var a = window.open();
		a.document.write(document.getElementById('printData').innerHTML);
		$("#printReport").hide();
		a.document.close();
		a.focus();
		a.print();
		a.close();
		return false;
	}
	stopLoading();

}

function generateReport(data, pageNumber) {

	$.ajax({
		type : "get",
		url : "generateReport.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateResult(response, pageNumber);
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});

}
function printReport() {
	$.ajax({
		type : "get",
		url : "printReport.htm",
		data : "",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			printResult(response);
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});

}
function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			generateReport({
				pageNo : pageNumber
			}, pageNumber);

		}

	});
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('.paginationWrapper').show();
	closeAccordian();
	$('.print').parent().parent().addClass('hideBlock');
}

function showContent(count) {
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
	$('.print').parent().parent().addClass('hideBlock');
}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
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