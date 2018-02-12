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
							generateReport($('#zeroMPLReport').serialize(), 1);
						}
					});

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
										$('.depPrint').text($(this).next().text());
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
						$('.catPrint').text($(this).next().text());
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
						$('.scPrint').text($(this).next().text());
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
							setTimeout(function(){$(".segment")
								.click(
										function() {
											$('.segPrint').text($(this).next().text());
											
										});},300);
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
function iterateResult(response,pageNumber) {
	var output = $.parseJSON(response);

	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		recordCount = descList[0].msg;
		currentPage = pageNumber;
		var content = '<tr><th class="noSort">Article #</th><th class="noSort">Article Description</th><th class="centerValue noSort">Aisle</th><th class="centerValue noSort">Side</th><th class="centerValue noSort">Bay</th><th class="lastColumn noSort">Plan-O-Gram Category</th></tr>';
		var printHead='<div class="width100 " style=""><div class="width70   reportName bold inline-block">Zero MPL Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Department: </label><label class="trading dept" id=""></label><label class="separator ordHide">|</label><label class="ordHide" >Category: </label><label class="transaction printOrdNo cat" id="" ></label><label class="separator">|</label><label class="">Sub-Category: </label><label class="reason subCate" id="">20</label><label class="separator receiptHide seg-lab hideBlock" >|</label><label class="receiptHide seg-lab hideBlock" >Segment: </label><label class="emp receiptHide seg" ></label></div>	</div><table cellspacing="0" class="ContentTable actionRowPrint"><tr><th class="noSort">Article #</th><th class="noSort">Article Description</th><th class="centerValue noSort">Aisle</th><th class="centerValue noSort">Side</th><th class="centerValue noSort">Bay</th><th class="lastColumn noSort">Plan-O-Gram Category</th></tr>';
		var printFoot='<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
		// $('.appended').remove();
		$.each(descList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.article + '</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.aisle
					+ '</td>' + '<td class="centerValue">' + item.aisleSide
					+ '</td>' + '<td class="centerValue">' + item.bay + '</td>'
					+ '<td>' + item.category + '</td> </tr>';
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

	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		recordCount = descList[0].msg;
		
		var printHead='<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block">Zero MPL Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Department: </label><label class="trading dept" id=""></label><label class="separator cateHide hideBlock">|</label><label class="cateHide hideBlock" >Category: </label><label class="cateHide printOrdNo cat hideBlock" id="" ></label><label class="hideBlock subcatHide separator">|</label><label class="subcatHide hideBlock">Sub-Category: </label><label class="reason hideBlock subcatHide subCate" id=""></label><label class="separator receiptHide seg-lab hideBlock" >|</label><label class="receiptHide seg-lab hideBlock" >Segment: </label><label class="emp receiptHide seg" ></label></div>	</div><table cellspacing="0" class="ContentTable actionRowPrint"><tr><th class="noSort">Article #</th><th class="noSort">Article Description</th><th class="centerValue noSort">Aisle</th><th class="centerValue noSort">Side</th><th class="centerValue noSort">Bay</th><th class="lastColumn noSort">Plan-O-Gram Category</th></tr>';
		var printFoot='<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
		
		printContent=printHead;
		$.each(descList, function(i, item) {

			printContent += '<tr class="appended ';
			if (i == descList.length)
				printContent += printContent + ' lastRow ';
			printContent += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.article + '</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.aisle
					+ '</td>' + '<td class="centerValue">' + item.aisleSide
					+ '</td>' + '<td class="centerValue">' + item.bay + '</td>'
					+ '<td>' + item.category + '</td> </tr>';
			// console.log(item.articleNo);
			if(i%16==0 && i != (descList.length-1) && i!=0)
				printContent+='</table>'+printFoot+printHead;
			if (i == (descList.length-1))
				printContent+='</table>'+printFoot;
		});
		console.log(printContent);
		$('#printbody').html('').append(printContent).append('<link rel="stylesheet" href="../../styles/printstyle.css" />');
		hideContent();
		if (recordCount > 20) {
			showPaginatedContent(recordCount);
		} else {
			showContent(recordCount);
		}
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
			iterateResult(response,pageNumber);
			printReport();
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
}

function showContent(count) {
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
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