localStorage.clear();
var dataForPagination = "";
var currentPage = 1;
var recordCount;
var currPage=1;
$(document)
		.ready(
				function() {
					$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
					$('#tblExport').parent().css('width','1004px');
					$('#next-column').click(function(event){
						event.preventDefault();
						$('.scrollTableContainer').animate({scrollLeft:'+=150'}, 'fast');
					});
					$('#previous-column').click(function(event){
						event.preventDefault();
						$('.scrollTableContainer').animate({scrollLeft:'-=150'}, 'fast');
					});
					setTimeout(function() {
						$('#deptlst li:first input').click();
					}, 200);
					$(".btnExport").click(function() {
						$("#tblExport").btechco_excelexport({
							containerid : "tblExport",
							datatype : $datatype.Table
						});
					});
					/*
					 * $("#generateReport").click(function() {
					 * $("#reportContent").removeClass('hideBlock');
					 * $('#accordion').accordion({ active : true }); });
					 */

					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							$('#generateReport').click();
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

					$("#dialog-modal2").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-modal2").parent().addClass("popupWrapper");
					$('#article').focus();
					$("#generateReport")
							.click(
									function() {
										localStorage.clear();
										hideContent();
										currentPage=1;
										currPage=1;
										articleNo=$('#article').val();
										var artType = $(
												'input:radio[name=articleType]:checked')
												.val();
										var fromDate = formateDate($("#from")
												.val());
										var date1 = new Date();
										var parts = fromDate.split('/');
										var partsLen = parts.length;
										var date1Len = fromDate.length;
										date1.setFullYear(parts[2],
												parts[1] - 1, parts[0]);
										
										if($('input:radio[name=category]:checked').length== 0) // validation code for making region selection as mandatory--defect 14593
											showError('Please select any state');
											
										else if($('input:radio[name=subCat]:checked').length== 0)
											showError('Please select any region');
										
										else if ($('#article').val() == "") {
											showError('Please enter article number.');
											$('#article').focus();
										}else if ($('#from').val() == ""
												&& $('#to').val() != "") {
											showError('Date should not be empty.');
											callFrom();
										}else if ($('#number').is(':checked')
												&& isNaN($('#article').val())) {
											showError('Please enter valid article number.');
											$('#article').focus();
										}
										else if (fromDate != ""
												&& (partsLen != 3
														|| date1Len != 10
														|| fromDate.split('/')[0] > 31
														|| fromDate.split('/')[1] > 12 || fromDate
														.split('/')[2].length != 4)) {
											showError('Invalid From Date.');
											callFrom();
										}
										else {
											$("[name='subCat']:checked").val($("[name='subCat']:checked").next().text()); //CR modification (search by area name and region name)
											if($('input:radio[name=subCat]:checked').length!= 0)
												{
												$("[name='segme']:checked").val($("[name='segme']:checked").next().text());
												}
											var data = $('#promArticleReview')
													.serialize();
											console.log(data);
											getPromoArticleReview(data);
										}
									});

					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});

					// Code for accordion
					$("#accordion").accordion({
						header : "h3.mainAccordion",
						collapsible : true,
						heightStyle : "content"
					});

					// Code for tooltip
					$('.rowMoreInfo').tooltip();

					// Code for profile menu
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					$('#closeLink').click(function() {
						closeAccordian();
					});
					$('#number,#description,#reference').click(function() {

						setTimeout(function() {
							$('#article').focus();
						}, 500);
					});
					/*----------------******  Department Click function   *****--------------- */
					$("#deptLstCnt").text($("#deptlst li").size());
					deptFlag = "Null";
					var nodeDesc = 0;
					$('.department')
							.on(
									'click',
									function() {
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
											var servletUrl = 'fetchDistricts.htm?iv_parent_node='
													+ selectedValue;
											var c = 0;
											$
													.getJSON(
															servletUrl,
															function(options) {

																if (options) {
																	$
																			.map(
																					options.districtList,
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
																								+ item.code
																								+ '" value="'
																								+ item.code
																								+ '"/><label for="'
																								+ item.code
																								+ '" class="lastColumn">';
																						if(item.description!=null && item.description!=undefined)
																						departmentStr+= item.description
																						departmentStr+=	'</label></li>';
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
				});
function closeAccordian() {
	$('#accordion').accordion({
		active : true
	});
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

function getPromoArticleReview(data) {

	$.ajax({
		type : "get",
		url : "getPromoArticleReview.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

			successPromoAudit(response);
		},
		error : function() {
			// goToLogin();
		},
	});

}
function showWarning(text) {
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$('#reportContent').removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.resultContent').addClass("hideBlock");
	// $('.ContentTable').remove();
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass('hideBlock');
	$('.paginationDiv').hide();
}
function showError(text) {
	$('#errorMsg').text(text);
	$('.resultContent').addClass("hideBlock");
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('#reportContent').removeClass('hideBlock');
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass("hideBlock");
	$('.paginationDiv').hide();
}
function paginatedResult() {
	// $(".paginationWrapper").removeClass('hideBlock');
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getPromoDetailForPagination({
				pageNo : pageNumber
			}, pageNumber);

		}

	});

	$(".tableFooter,.totalRecord").removeClass('hideBlock');
	$('.paginationDiv').show();
}
function selectItem(id, article, uom) {
	$('#dialog-modal2').dialog('close');
	var data = $('#promArticleReview').serialize();
	data = data + '&index=' + id;
	$.ajax({
		type : "get",
		url : "getPromoArticleReview.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			successSelectItem(response, data);

		},
		error : function() {
			// goToLogin();
		},
	});

}
function getPromoDetailForPagination(data, pageNumber) {
	if (localStorage.getItem(pageNumber))
		successPagination(localStorage.getItem(pageNumber), data, pageNumber);
	else {
		currentPage = pageNumber;
		$.ajax({
			type : "get",
			url : "getPromoArticleReview.htm",
			data : data,
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {

				var string = '{"data":[';
				var length = response.replace('{"data":[{', '').replace('}]}',
						'').split('},{').length;
				var records = response.replace('{"data":[{', '').replace('}]}',
						'').split('},{');
				countPage = pageNumber;
				for ( var i = 1; i <= length; i++) {
					if (i % 20 != 0 && i != length)
						string = string + "{" + records[i - 1] + "},";
					else {
						string = string + "{" + records[i - 1] + "}]}";
						console.log(countPage + '-----' + string);
						localStorage.setItem(countPage, string);
						string = '{"data":[';
						countPage++;
					}
				}
				successPagination(localStorage.getItem(pageNumber), data,
						pageNumber);

			},
			error : function() {
				// goToLogin();
			},
		});
	}
}
function successSelectItem(response, data) {
	var output = $.parseJSON(response);
	var content = "";
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null && output.data[0].msg.trim() == ''
			) {
		var auditList = output.data;
		var pageNo=1;
		var count=0;
		$('.appended').remove();
		$.each(auditList, function(i, item) {
			count++;
			item.site=(item.site!=null && item.site!=undefined) ? item.site: '';
			item.storeName=(item.storeName!=null && item.storeName!=undefined) ? item.storeName: '';
			item.promoWeek=(item.promoWeek!=null && item.promoWeek!=undefined) ? item.promoWeek: '';
			item.totalNoOfWeeks=(item.totalNoOfWeeks!=null && item.totalNoOfWeeks!=undefined) ? item.totalNoOfWeeks: '';
			item.promoPrice=(item.promoPrice!=null && item.promoPrice!=undefined) ?  (!isNaN(Number(item.promoPrice)) ? Number(item.promoPrice).toFixed(2) : ''): '';
			item.promoSavings=(item.promoSavings!=null && item.promoSavings!=undefined) ? (!isNaN(Number(item.promoSavings)) ? Number(item.promoSavings).toFixed(2) : ''): '';
			item.displayType=(item.displayType!=null && item.displayType!=undefined) ? item.displayType: '';
			item.mediaType=(item.mediaType!=null && item.mediaType!=undefined) ? item.mediaType: '';
			item.articleUom=(item.articleUom!=null && item.articleUom!=undefined) ? item.articleUom: '';
			item.om=(item.om!=null && item.om!=undefined) ? item.om: '';
			
			// CR modifications for build and display qty round off
			item.promoForecast=(item.promoForecast!=null && item.promoForecast!=undefined) ? ((Number(item.promoForecast)/Number(item.om))!='NaN' ?(Number(item.promoForecast)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined) ? ((Number(item.oldDemandQty)/Number(item.om))!='NaN' ?(Number(item.oldDemandQty)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined) ? ((Number(item.oldDisplayQty)/Number(item.om))!='NaN' ?(oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om))) :"") : '';
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined) ? ((Number(item.oldBuildQty)/Number(item.om))!='NaN' ?(oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om))) :"") : '';

			item.oldDeliveryDate=(item.oldDeliveryDate!=null && item.oldDeliveryDate!=undefined) ? item.oldDeliveryDate: '';
			
			item.suppNo=(item.suppNo!=null && item.suppNo!=undefined) ? item.suppNo: '';
			
			item.siteDesc=(item.siteDesc!=null && item.siteDesc!=undefined) ? item.siteDesc: '';
			item.articleDesc=(item.articleDesc!=null && item.articleDesc!=undefined) ? item.articleDesc: '';
			
			item.promoStartDate=(item.promoStartDate!=null && item.promoStartDate!=undefined) ? item.promoStartDate: '';
			
			item.promoStartAndEndDay=(item.promoStartAndEndDay!=null && item.promoStartAndEndDay!=undefined) ? item.promoStartAndEndDay: '';
			
			
			content += '<tr class="appended pageContent pagNo-'+pageNo;
			if(pageNo>1)
			content+=' hideBlock ';  
			content+='">'						
				+'<td>'
				+item.site +' - '+ item.siteDesc
				+'</td>'
				+'<td class="centerValue">'
				+ item.promoWeek +' of '+item.totalNoOfWeeks 
				+'</td>'
				+'<td class="centerValue promoDays">'
				+ item.promoStartAndEndDay
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoPrice
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoSavings
				+'</td>'
				/*+'<td class="columnDivider">'
				+ item.details
				+'</td>'*/
				+'<td class="centerValue">'
				+ item.displayType
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.mediaType
				+'</td>'
				+'<td class="centerValue">'
				+ item.articleUom
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.om
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.promoForecast
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDemandQty
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDisplayQty
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.oldBuildQty
				+'</td>'
				+'<td>'
				+ item.suppNo
				+'</td>'
				+'<td>'
				+ item.oldDeliveryDate
				+'</td></tr>';
			if(count%10==0){
				pageNo++;
			}
		});
		$('#totalRecord').text(auditList.length);
		$(content).insertAfter('.auditContent');
		$('.searchString').text(
				auditList[0].article + '-' + auditList[0].articleDesc);
		popDays(auditList[0].promoStartDate);
		showContent(auditList.length);
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}

	stopLoading();
}
function successPagination(response, data, pageNumber) {
	console.log("Response" + pageNumber + "=====" + response);
	var output = $.parseJSON(response);
	var content = "";
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null && output.data[0].msg.trim() == '') {
		var auditList = output.data;
		var pageNo=1;
		var count=0;
		$('.appended').remove();
		$.each(auditList, function(i, item) {
			count++;
			item.site=(item.site!=null && item.site!=undefined) ? item.site: '';
			item.storeName=(item.storeName!=null && item.storeName!=undefined) ? item.storeName: '';
			item.promoWeek=(item.promoWeek!=null && item.promoWeek!=undefined) ? item.promoWeek: '';
			item.totalNoOfWeeks=(item.totalNoOfWeeks!=null && item.totalNoOfWeeks!=undefined) ? item.totalNoOfWeeks: '';
			item.promoPrice=(item.promoPrice!=null && item.promoPrice!=undefined) ?  (!isNaN(Number(item.promoPrice)) ? Number(item.promoPrice).toFixed(2) : ''): '';
			item.promoSavings=(item.promoSavings!=null && item.promoSavings!=undefined) ? (!isNaN(Number(item.promoSavings)) ? Number(item.promoSavings).toFixed(2) : ''): '';
			item.displayType=(item.displayType!=null && item.displayType!=undefined) ? item.displayType: '';
			item.mediaType=(item.mediaType!=null && item.mediaType!=undefined) ? item.mediaType: '';
			item.articleUom=(item.articleUom!=null && item.articleUom!=undefined) ? item.articleUom: '';
			item.om=(item.om!=null && item.om!=undefined) ? item.om: '';
			
			// CR modifications for build and display qty round off
			item.promoForecast=(item.promoForecast!=null && item.promoForecast!=undefined) ? ((Number(item.promoForecast)/Number(item.om))!='NaN' ?(Number(item.promoForecast)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined) ? ((Number(item.oldDemandQty)/Number(item.om))!='NaN' ?(Number(item.oldDemandQty)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined) ? ((Number(item.oldDisplayQty)/Number(item.om))!='NaN' ?(oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om))) :"") : '';
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined) ? ((Number(item.oldBuildQty)/Number(item.om))!='NaN' ?(oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om))) :"") : '';

			item.oldDeliveryDate=(item.oldDeliveryDate!=null && item.oldDeliveryDate!=undefined) ? item.oldDeliveryDate: '';
			
			item.suppNo=(item.suppNo!=null && item.suppNo!=undefined) ? item.suppNo: '';
			
			item.siteDesc=(item.siteDesc!=null && item.siteDesc!=undefined) ? item.siteDesc: '';
			item.articleDesc=(item.articleDesc!=null && item.articleDesc!=undefined) ? item.articleDesc: '';
			
			item.promoStartDate=(item.promoStartDate!=null && item.promoStartDate!=undefined) ? item.promoStartDate: '';
			
			item.promoStartAndEndDay=(item.promoStartAndEndDay!=null && item.promoStartAndEndDay!=undefined) ? item.promoStartAndEndDay: '';
			content += '<tr class="appended pageContent pagNo-'+pageNo;
			if(pageNo>1)
			content+=' hideBlock ';  
			content+='">'						
				+'<td>'
				+item.site +' - '+ item.siteDesc
				+'</td>'
				+'<td class="centerValue">'
				+ item.promoWeek +' of '+item.totalNoOfWeeks 
				+'</td>'
				+'<td class="centerValue promoDays">'
				+ item.promoStartAndEndDay
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoPrice
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoSavings
				+'</td>'
				/*+'<td class="columnDivider">'
				+ item.details
				+'</td>'*/
				+'<td class="centerValue">'
				+ item.displayType
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.mediaType
				+'</td>'
				+'<td class="centerValue">'
				+ item.articleUom
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.om
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.promoForecast
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDemandQty
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDisplayQty
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.oldBuildQty
				+'</td>'
				+'<td>'
				+ item.suppNo
				+'</td>'
				+'<td>'
				+ item.oldDeliveryDate
				+'</td></tr>';
			if(count%10==0){
				pageNo++;
			}
		});
		$('#totalRecord').text(auditList.length);
		$(content).insertAfter('.auditContent');
		$('.searchString').text(
				auditList[0].article + '-' + auditList[0].articleDesc);
		popDays(auditList[0].promoStartDate);
		showContent(auditList.length);
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}

	stopLoading();

}
function successPromoAudit(response) {
	var output = $.parseJSON(response);
	var content = "";
	if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null
			&& output.data[0].msg == 'multipleResult') {
		var descList = output.data;
		$('.appended').remove();
		$
				.each(
						descList,
						function(i, item) {

							content += '<tr class="article-list appended" id="'
									+ i
									+ '">'
									+ '<td id="artNo'
									+ i
									+ '" class="art-no">'
									+ (item.articleNo != null && item.articleNo != undefined ? item.articleNo : (item.article || ""))
									+ '</td>'
									+ '<td id="artName'
									+ i
									+ '">'
									+ item.description
									+ '</td>'
									+ '<td id="uom'
									+ i
									+ '">'
									+ (item.uom != null && item.uom != undefined ? item.uom : (item.base_uom || ""))
									+ '</td>'
									+ '<td class="sorted lastColumn"><label class="linkBtn linkBtn2">'
									+ '<label class="selectItem" onclick="selectItem('
									+ i + ',' + (item.articleNo != null && item.articleNo != undefined ? item.articleNo : (item.article || "")) + ',\''
									+ (item.uom != null && item.uom != undefined ? item.uom : (item.base_uom || ""))
									+ '\')">Select</label></label></td>'
									+ '</tr>';
							console.log(item.articleNo);

						});
		$(content).insertAfter('.descContent');
		$('.searchString').text($('#article').val());
		$('#dialog-modal2').dialog('open');
	} else if (output.data != null && output.data.length > 0
			&& output.data[0].msg != null && output.data[0].msg.trim() == '') {
		var auditList = output.data;
		var pageNo=1;
		var count=0;
		$('.appended').remove();
		$.each(auditList, function(i, item) {
			count++;
			item.site=(item.site!=null && item.site!=undefined) ? item.site: '';
			item.storeName=(item.storeName!=null && item.storeName!=undefined) ? item.storeName: '';
			item.promoWeek=(item.promoWeek!=null && item.promoWeek!=undefined) ? item.promoWeek: '';
			item.totalNoOfWeeks=(item.totalNoOfWeeks!=null && item.totalNoOfWeeks!=undefined) ? item.totalNoOfWeeks: '';
			item.promoPrice=(item.promoPrice!=null && item.promoPrice!=undefined) ?  (!isNaN(Number(item.promoPrice)) ? Number(item.promoPrice).toFixed(2) : ''): '';
			item.promoSavings=(item.promoSavings!=null && item.promoSavings!=undefined) ? (!isNaN(Number(item.promoSavings)) ? Number(item.promoSavings).toFixed(2) : ''): '';
			item.displayType=(item.displayType!=null && item.displayType!=undefined) ? item.displayType: '';
			item.mediaType=(item.mediaType!=null && item.mediaType!=undefined) ? item.mediaType: '';
			item.articleUom=(item.articleUom!=null && item.articleUom!=undefined) ? item.articleUom: '';
			item.om=(item.om!=null && item.om!=undefined) ? item.om: '1';
			
			// CR modifications for build and display qty round off
			item.promoForecast=(item.promoForecast!=null && item.promoForecast!=undefined) ? ((Number(item.promoForecast)/Number(item.om))!='NaN' ?(Number(item.promoForecast)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDemandQty=(item.oldDemandQty!=null && item.oldDemandQty!=undefined) ? ((Number(item.oldDemandQty)/Number(item.om))!='NaN' ?(Number(item.oldDemandQty)/Number(item.om)).toFixed(0) :"") : '';
			item.oldDisplayQty=(item.oldDisplayQty!=null && item.oldDisplayQty!=undefined) ? ((Number(item.oldDisplayQty)/Number(item.om))!='NaN' ?(oldDispquantityRoundOff(Number(item.oldDisplayQty),Number(item.om))) :"") : '';
			item.oldBuildQty=(item.oldBuildQty!=null && item.oldBuildQty!=undefined) ? ((Number(item.oldBuildQty)/Number(item.om))!='NaN' ?(oldBuildquantityRoundOff(Number(item.oldBuildQty),Number(item.om))) :"") : '';
			
			item.oldDeliveryDate=(item.oldDeliveryDate!=null && item.oldDeliveryDate!=undefined) ? item.oldDeliveryDate: '';
			item.suppNo=(item.suppNo!=null && item.suppNo!=undefined) ? item.suppNo: '';
			item.siteDesc=(item.siteDesc!=null && item.siteDesc!=undefined) ? item.siteDesc: '';
			item.articleDesc=(item.articleDesc!=null && item.articleDesc!=undefined) ? item.articleDesc: '';
			item.promoStartDate=(item.promoStartDate!=null && item.promoStartDate!=undefined) ? item.promoStartDate: '';
			item.promoStartAndEndDay=(item.promoStartAndEndDay!=null && item.promoStartAndEndDay!=undefined) ? item.promoStartAndEndDay: '';
			item.promoPrice=(item.promoPrice!=null && item.promoPrice!=undefined) ?  (!isNaN(Number(item.promoPrice)) ? Number(item.promoPrice).toFixed(2) : ''): '';
			item.promoSavings=(item.promoSavings!=null && item.promoSavings!=undefined) ? (!isNaN(Number(item.promoSavings)) ? Number(item.promoSavings).toFixed(2) : ''): '';
			content += '<tr class="appended pageContent pagNo-'+pageNo;
			if(pageNo>1)
			content+=' hideBlock ';  
			content+='">'						
				+'<td>'
				+item.site +' - '+ item.siteDesc
				+'</td>'
				+'<td class="centerValue">'
				+ item.promoWeek +' of '+item.totalNoOfWeeks 
				+'</td>'
				+'<td class="centerValue promoDays">'
				+ item.promoStartAndEndDay
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoPrice
				+'</td>'
				+'<td class="numberColumn">'
				+ item.promoSavings
				+'</td>'
				/*+'<td class="columnDivider">'
				+ item.details
				+'</td>'*/
				+'<td class="centerValue">'
				+ item.displayType
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.mediaType
				+'</td>'
				+'<td class="centerValue">'
				+ item.articleUom
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.om
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.promoForecast
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDemandQty
				+'</td>'
				+'<td class="centerValue">'
				+ item.oldDisplayQty
				+'</td>'
				+'<td class="centerValue columnDivider">'
				+ item.oldBuildQty
				+'</td>'
				+'<td>'
				+ item.suppNo
				+'</td>'
				+'<td>'
				+ item.oldDeliveryDate
				+'</td></tr>';
			if(count%10==0){
				pageNo++;
			}
		});
		$('#totalRecord').text(auditList.length);
		$(content).insertAfter('.auditContent');
		$('.searchString').text(
				auditList[0].article + '-' + auditList[0].articleDesc);
		popDays(auditList[0].promoStartDate);
		showContent(auditList.length);
	} else {
		if (output.data != null && output.data[0].msg != null)
			msg = output.data[0].msg;
		else
			msg = 'Technical issue occurred. Please contact technical support.';
		if (msg.trim().toLowerCase() == 'no data found') {
			msg = 'Sorry, no results found for your search criteria. Please try again';
			showWarning(msg);
		} else {
			showError(msg);
		}

	}
	stopLoading();

}
function showContent(j) {
	$("#errorMsgDiv").addClass('hideBlock');
	$('.resultContent ').removeClass('hideBlock');
	$('.tableTitle.totalRecord').removeClass('hideBlock');
	$('.appended').text();
	closeAccordian();
	 if(j>10){
			$('.ar-page').removeClass('hideBlock').show();
		$('.ar-page').pagination({
			items : j,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currPage,
			onPageClick : function(pageNumber) {
				showPageContent(pageNumber);

			}

		});
		}
	 else{
		 $('.ar-page').addClass('hideBlock').hide();
	 }
}
function showPageContent(pageNo){
	currPage=pageNo;
	var pageClass='pagNo-'+pageNo;
	$('.pageContent').filter(function(){
		if($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function hideContent() {
	$("#errorMsgDiv").addClass('hideBlock');
	$('.resultContent ').addClass('hideBlock');
	$('.tableTitle.totalRecord').addClass('hideBlock');
	$('.paginationDiv').hide();

}
function callFrom() {

	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function callTo() {

	setTimeout(function() {
		$('#to').focus();
	}, 200);
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

/*
 * $('#next').click(function(){
 * 
 * });
 */
$('#articleNo').keyup(function() {
	hideError();
});

function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */

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
							var servletUrl = 'fetchRegion.htm?iv_parent_node='
									+ selectedValue+'&banner='+$('#deptlst input:checked').val();
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
																				+ item.code
																				+ '" value="'
																				+ item.code
																				+ '"/><label for="'
																				+ item.code
																				+ '" class="lastColumn">';
																				if(item.description!=null && item.description!=undefined)
																					categoryStr+= item.description
																					categoryStr+=	'</label></li>';
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
													$('#segmentBtn').removeClass('hideBlock');
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
							var servletUrl = 'fetchArea.htm?iv_parent_node='
									+ selectedValue+'&banner='+$('#deptlst input:checked').val()+'&state='+$('#categoryLst input:checked').val();
							$
									.getJSON(
											servletUrl,
											function(options) {
												if (options) {
													var scrollPresent=false;
													$
															.map(
																	options.segmentInfoList,
																	function(
																			item) {

																		subCatStr = '<li><input type="radio" name="segme" class="segment" data-tt-id="" data-tt-parent-id="'
																				+ subCatHierarchyId
																				+ '" id="'
																				+ item.code
																				+ '" value="'
																				+ item.code
																				+ '"/><label for="'
																				+ item.code
																				+ '" class="lastColumn"> <span>';
																				if(item.description!=null && item.description!=undefined)
																					subCatStr+= item.description
																					subCatStr+=	'</span></label></li>';
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
																		if(!scrollPresent){
																			if(($('#segmentLst li label:last').width()<$('#segmentLst li label span:last').width())||($('#segmentLst li:last').before().find('label').width()<$('#segmentLst li:last').before().find('span').width())){
																				$('#segMentDiv').css('width','120%');
																				scrollPresent=true;
																			}else{
																				$('#segMentDiv').css('width','');
																			}
																		}
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

/*function selectItem(a, b, c) {
	$('#dialog-modal2').dialog('close');
	$('#article').val(b + "(" + c + ")");
	$('#articleNumber').val(b);
	$('#articleUom').val(c);
}*/
/*function getPromoAuditDetail(data) {

	$
			.ajax({
				type : "get",
				url : "getPromoAuditDetail.htm",
				data : data,
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					successPromoAudit(response);
					},
				error : function() {
					// goToLogin();
				},
			});

}*/
function popDays(weekStartDate){
setDay(weekStartDate);
// Promo Days Clculation
$('.promoDays').each(
				function() {
					
					var tempStartDay ;
					var tempEndDay ;

					/*if ($(this).parent().next().find('.secondaryTable').length != 0) {
						$(this)
								.parent()
								.next()
								.find('.start-end-day')
								.each(
										function() {
											var a = calDays($(this)
													.text().split('-')[0]
													.trim());
											var b = calDays($(this)
													.text().split('-')[1]
													.trim());

											if (tempStartDay > a) {
												tempStartDay = a;
											}

											if (tempEndDay < b) {
												tempEndDay = b;
											}

										});
					} else {*/
						var a = 0;
						if($(this).text()!='' && $(this).text() !=undefined)
						a = calDays($(this).text()
								.split('-')[0].trim());
						var b =0;
						if($(this).text()!='' && $(this).text()!=undefined 
								&& $(this).text()
								.split('-').length>0)
						b = calDays($(this).text()
								.split('-')[1].trim());
						tempStartDay = a;
						tempEndDay = b;
					//}
					$(this).text((tempEndDay - tempStartDay) + 1);

				});
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

// following methods are for build and display qty round off--- CR modifications
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