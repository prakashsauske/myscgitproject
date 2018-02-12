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
$('.print').click(function(){
	warehouseVariancePrint();
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
					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
						/*	if($("#dialog-supplier-verify").dialog("isOpen")){
								$('#goButtonSample1').click();
							}else{*/
								$('#generateReport').click();	
							//}
							
						}
					});
					$("#generateReport").click(function() {
						hideError();
						if ($('.orderNoInput').val().trim()=='') {
							showError('Please enter an order number.');
							$('input[name="orderNo"]').focus();
						}
						/*else if (!$('.department').is(':checked')) {
							showError('Please select department');
						} */
						else {
							generateReport($('#whvReport').serialize(), 1);
						}
					});
					
					
					/*$("#generateReport").click(function(){
						$("#reportContent").removeClass('hideBlock'); 
						$('#accordion').accordion({active : true });			
					});*/

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
function iterateResult(response,pageNumber) {
	var output = $.parseJSON(response);
	var orderNo='';
	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.itemList != null && output.itemList.length > 0) {
		var descList = output.itemList;
		recordCount = output.itemList[0].msg;
		currentPage = pageNumber;
		orderNo=descList[0].orderNo;
		var hdrLbl = '<h2 class="articleTitle">Order #'+descList[0].orderNo+' </h2>'+
		'<p><label class="articlePriceLabel">'+descList[0].dcName+' ( '+descList[0].dc+' )</label>'+
			'<label class="articlePriceLabel">|</label>'+
			'<label class="articlePriceLabel">Delivery: <strong>'+descList[0].deliveryDate.replace('.','/').replace('.','/')+'</strong> </label>'+
			'<label class="articlePriceLabel">|</label>'+
			'<label class="articlePriceLabel">Dispatch: <strong>'+descList[0].despatchedDate.replace('.','/').replace('.','/')+'</strong> </label>'+
			'<label class="articlePriceLabel">|</label>'+
			'<label class="articlePriceLabel">Received: <strong>'+descList[0].receivedDate.replace('.','/').replace('.','/')+'</strong> </label></p>';
		
		var hdrTbl = '<tbody><tr>'
			+'<td class="keyInfo" width="16%">Order Cost:</td><td class="valueInfo">'+Number((descList[0].totOrderCost)).toFixed(2)+'</td>'
			+'<td class="keyInfo" width="16%">Order Sell:</td><td class="valueInfo">'+Number((descList[0].totOrderSell)).toFixed(2)+'</td>'									
			+'<td class="keyInfo" width="16%">Potential Gross Profit (%):</td><td class="valueInfo  lastColumn">'+Number((descList[0].totPotentialPerGp)).toFixed(2)+'</td>'
			+'</tr></tbody>';
		
		
		var content = '<thead><tr><th data-sort="int" class="header">Article #</th>'
			+'<th data-sort="string" class="header">Description</th><th  data-sort="int" class="centerValue header">OM</th><th data-sort="float" class="centerValue header">Dispatch Qty.</th>'						
			+'<th data-sort="float" class="centerValue header">Received Qty.</th>	<th data-sort="float" class="centerValue header">Difference</th>	<th data-sort="float" class="centerValue header">Order Sell($)</th>'
			+'<th data-sort="float" class="lastColumn centerValue header">% GP</th></tr></thead>'; 
	
		// $('.appended').remove();
		$.each(output.itemList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.article.replace(/^0+/, '') + '</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.om
					+ '</td>' + '<td class="centerValue">' + item.despatchedQty
					+ '</td>' + '<td class="centerValue">' + item.receivedQty
					+ '</td>' + '<td class="centerValue">' + item.differenceQty
					+ '</td>' + '<td class="centerValue">' + Number((item.orderSell.replace(/^0+/, ''))).toFixed(2)
					+ '</td>' + '<td class="centerValue">' + Number((item.potentialPerGp)).toFixed(2) + '</td>'
					+ ' </tr>';
			// console.log(item.articleNo);

		});
		$('.hdrLbl').html('');
		$('.hdrLbl').html(hdrLbl);
		
		$('.hdrTbl').html('');
		$('.hdrTbl').html(hdrTbl);
		
		$('.itemTbl').html('');
		$('.itemTbl').html(content);
		
		hideContent();
		if (recordCount > 20) {
			showPaginatedContent(recordCount,orderNo);
		} else {
			showContent(recordCount,orderNo);
			
		}
	}
	stopLoading();
	tableJs();

}
function printResult(response) {
	
	var output = $.parseJSON(response);
	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.itemList != null && output.itemList.length > 0) {
		var descList = output.itemList;
		recordCount = output.itemList[0].msg;
		
		orderNo=descList[0].orderNo;
		var tableHeaderContent = '<thead><tr><th data-sort="int" class="header">Article #</th>'
			+'<th data-sort="string" class="header">Description</th><th  data-sort="int" class="centerValue header">OM</th><th data-sort="float" class="centerValue header">Dispatch Qty.</th>'						
			+'<th data-sort="float" class="centerValue header">Received Qty.</th>	<th data-sort="float" class="centerValue header">Difference</th>	<th data-sort="float" class="centerValue header">Order Sell ($)</th>'
			+'<th data-sort="float" class="lastColumn centerValue header">% GP</th></tr></thead>'; 
		var printHead='<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block">Warehouse Variance Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Order #: </label><label class="" id="">'+descList[0].orderNo+'</label><label class="separator ">|</label><label class="" >Delivery Date: </label><label class="" id="" >'+descList[0].deliveryDate.replace('.','/').replace('.','/')+'</label><label class="separator">|</label><label class="">Dispatched Date: </label><label class="reason " id="">'+descList[0].despatchedDate.replace('.','/').replace('.','/')+'</label><label class="separator" >|</label><label class="" >Received Date: </label><label class="" >'+descList[0].despatchedDate.replace('.','/').replace('.','/')+'</label>'
		+'<label class="separator" >|</label><label class="" >Order Cost: </label><label class="" >'+Number((descList[0].totOrderCost)).toFixed(2)+'</label><label class="separator" >|</label><label class="" >Order Sell: </label><label class="" >'+Number((descList[0].totOrderSell)).toFixed(2)+'</label><label class="separator" >|</label><label class="" >Potential Gross Profit(%): </label><label class="" >'+Number((descList[0].totPotentialPerGp)).toFixed(2)+'</label>'
		+'</div>	</div><table cellspacing="0" class="ContentTable actionRowPrint">'+tableHeaderContent;
		var printFoot='<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

		printContent=printHead;
		$.each(descList, function(i, item) {

			printContent += '<tr class="appended ';
			if (i == descList.length)
				printContent += printContent + ' lastRow ';
			printContent += '" id=" ' + i + '">' + '<td class="art-no">'
					+ item.article.replace(/^0+/, '') + '</td>' + '<td>' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.om
					+ '</td>' + '<td class="centerValue">' + item.despatchedQty
					+ '</td>' + '<td class="centerValue">' + item.receivedQty
					+ '</td>' + '<td class="centerValue">' + item.differenceQty
					+ '</td>' + '<td class="centerValue">' + Number((item.orderSell.replace(/^0+/, ''))).toFixed(2)
					+ '</td>' + '<td class="centerValue">' + Number((item.potentialPerGp)).toFixed(2) + '</td>'
					+ ' </tr>';
			if(i%18==0 && i != (descList.length-1) && i!=0)
				printContent+='</table>'+printFoot+printHead;
			if (i == (descList.length-1))
				printContent+='</table>'+printFoot;

		});
		console.log(printContent);
		$('#printbody').html('').append(printContent).append('<link rel="stylesheet" href="../../styles/printstyle.css" />');
		
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
function showPaginatedContent(count,orderNo) {
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
			'#reportContent')
			.removeClass('hideBlock');
	$('.paginationWrapper').show();
	$('.orderLbl').text(orderNo);
	$('.countLbl').text(count);
	closeAccordian();
	bindFilter();
}

function showContent(count,orderNo) {
	$('.orderLbl').text(orderNo);
	$('.countLbl').text(count);
	$(
			'#reportContent')
			.removeClass('hideBlock');
	closeAccordian();
	bindFilter();
	
}
function hideContent() {
	$(
	'#reportContent')
	.addClass('hideBlock');
	//$('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('.ContentTableWrapperError #errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
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
function bindFilter(){
	var value='';
	$('.searchBox').keyup(function(){
	value=$(this).val();

	$('.appended').filter(function(){
	if( value!=''){
	if(($(this).children(':nth-child(1)').text().trim().toLowerCase().indexOf(value) != -1 || $(this).children(':nth-child(2)').text().trim().toLowerCase().indexOf(value) != -1))
	$(this).removeClass('hideBlock');
	else 
	$(this).addClass('hideBlock');
	}
	else
	{
	$(this).removeClass('hideBlock');
	}
	});
	});
}