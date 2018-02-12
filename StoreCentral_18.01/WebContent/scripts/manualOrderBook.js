function showPrint(){
		if (!$('.category:visible').is(':checked')) {
			showError('Please select till Category.');
		} else {
			var a = "";
			
//			a.document.write('<h2 class="wait">We are processing your request, please wait....</h2>');
			var department=$("input[name=departmentList]:checked").parent().find('label').text();
			$('#depName').val(department);
			var category=$("input[name=category]:checked").parent().find('label').text();
			$('#catName').val(category);
			var subcategory=[];
			$("input[name=subCat]:checked").each(function(i){
				subcategory[i] = $(this).parent().find('label').text();
		      });
			$('#subcatName').val(subcategory);
			generateReport($('#orderBook').serialize(), 1,'print',a);
		}
		

	
}


$(function() {
	
	$("#dialog-modal1").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 350
	});
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});
	/*$('#deptlst li').filter(function(){
		if($(this).find('input').attr('id')!='25' && $(this).find('input').attr('id')!='45')
		$(this).addClass('hideBlock');
		});*/
	if($('#deptlst li input').length==0){
		$('#accordion').addClass('hideBlock');
		showError('Manual Order Book Report is not available to your Store.');
		}

	$("#dialog-modal1").parent().addClass("popupWrapper");
	$('#department').change(
			function() {
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				$("#category").empty();
				$("#subcategory").empty();
				$("#segment").empty();
				$("#category").append('<option>Select</option>');
				$("#subcategory").append('<option>Select</option>');
				$("#segment").append('<option>Select</option>');
				var selectedValue = $(this).val().trim();
				var departmentStr = "";

				if ('' != selectedValue) {
					var servletUrl = 'fetchCategoryDetails.htm';
					var data = $('#orderBook').serialize();
					$.ajax({
						url : servletUrl,
						data : data,
						method : "get",
						success : function(response) {
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');
							if (response) {
								$.map(response.categoryInfoList,
										function(item) {
											// nodeID=deptHierarchyId+"."+i;
											// nodeIdTemp=nodeID+".1";
											departmentStr = '<option id="'
													+ item.node + '" value="'
													+ item.node + '">'
													+ item.nodeDesc
													+ '</option>';
											$("#category")
													.append(departmentStr);
											/*
											 * $("#categoryLstTotal").removeClass('hideBlock');
											 * $("#categoryLstCnt").text($("#categoryLst
											 * li").size());
											 */
										});
							}
						},

					});

				}
				
			});
	
	
	

	/*----------------******  End Department change function   *****--------------- */

	/*----------------******  Category change function   *****--------------- */
	catFlag = "Null";
	$('#category').change(
			function() {

				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				$("#subcategory").empty();
				$("#subcategory").empty();
				$("#segment").empty();
				$("#subcategory").append('<option>Select</option>');
				$("#segment").append('<option value="Select">Select</option>');

				var selectedValue = $(this).val().trim();
				var categoryStr = "";

				if ('' != selectedValue) {

					var servletUrl = 'fetchSubCategoryDetails.htm';
					var data = 'category=' + selectedValue;
					$.getJSON(servletUrl, data, function(options) {
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');
						if (options) {
							$.map(options.subCategoryInfoList, function(item) {

								categoryStr = '<option id="' + item.node
										+ '" value="' + item.node + '">'
										+ item.nodeDesc + '</option>';
								$('#subcategory').append(categoryStr);

							});

						}
					});
				}

			});
	/*----------------******  End Category change function   *****--------------- */
	/*----------------******  SubCategory change function   *****---------------- */

	$(".backBtn").click(function(e) {

		window.location.href = "../login/goingHome.htm";

	});

	// Code for adding scorllers to the table

	var tableCols = 0;

	$("#tableData tbody tr").each(function() {
		var currCount = 0
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

	

	// Code for accordion

	/*----------------******  Department Click function   *****--------------- */
	$("#deptLstCnt").text($("#deptlst li:visible").size());
	deptFlag = "Null";
	var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {
						$('.depPrint').text($(this).next().text());
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

						//if (deptFlag != selectedValue) {
							var deptHierarchyId = parseInt($(selectedValueId)
									.attr('data-tt-id'));
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
																		if(item.nodeDesc!=''){
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
																		}
																	});
												}
												category();
											});

						//}

					});
	$('#deptlst li:first input').click();
	//$('.department').trigger('click');
	/*----------------******  End Department Click function   *****--------------- */

	/*
	 * $('#next').click(function(){
	 * });
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
		if (!$('.category:visible').is(':checked')) {
			showError('Please select till Category.');
		} else {
			var department=$("input[name=departmentList]:checked").parent().find('label').text();
			$('#depName').val(department);
			var category=$("input[name=category]:checked").parent().find('label').text();
			$('#catName').val(category);
			var subcategory=[];
			$("input[name=subCat]:checked").each(function(i){
				subcategory[i] = $(this).parent().find('label').text();
		      });
			$('#subcatName').val(subcategory);
			generateReport($('#orderBook').serialize(), 1,'noprint','');
		}
	});

	// code to open popup on Receive Order
	$("#receiveOrder").click(function() {

		$("#dialog-modal").dialog("open");
	});

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

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

});
$("#treetable").treetable({
	expandable : true
});
subCatFlag = "Null";

function calWeek() {
	var date1 = new Date();
	if (date1.getDay() == '0') {
		date1.setTime(date1.getTime() + (86400000));
	} else if (date1.getDay() == '1') {
		date1.setTime(date1.getTime());
	} else if (date1.getDay() == '2') {
		date1.setTime(date1.getTime() - (86400000));
	} else if (date1.getDay() == '3') {
		date1.setTime(date1.getTime() - (86400000 * 2));
	} else if (date1.getDay() == '4') {
		date1.setTime(date1.getTime() - (86400000 * 3));
	} else if (date1.getDay() == '5') {
		date1.setTime(date1.getTime() - (86400000 * 4));
	} else if (date1.getDay() == '6') {
		date1.setTime(date1.getTime() - (86400000 * 5));
	}
	var weekOne = date1;
	var weekTwo = date1;
	var weekThree = date1;
	var weekFour = date1;

	var newDate = date1.getDate();
	var newMonth = date1.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}

	$('.crntWeek').text(newDate + ", " + monthString(newMonth) + " (Current)");
	$('.fromDate').text(
			newDate + '/' + (newMonth + 1) + '/' + date1.getFullYear());

	weekOne.setTime(weekOne.getTime() + (86400000 * 7));
	var newDate = weekOne.getDate();
	var newMonth = weekOne.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	$('.weekOne').text(newDate + ", " + monthString(newMonth));

	weekOne.setTime(weekOne.getTime() + (86400000 * 7));
	var newDate = weekOne.getDate();
	var newMonth = weekOne.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	$('.weekTwo').text(newDate + ", " + monthString(newMonth));

	weekOne.setTime(weekOne.getTime() + (86400000 * 7));
	var newDate = weekOne.getDate();
	var newMonth = weekOne.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	$('.weekThree').text(newDate + ", " + monthString(newMonth));

	weekOne.setTime(weekOne.getTime() + (86400000 * 7));
	var newDate = weekOne.getDate();
	var newMonth = weekOne.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	$('.weekFour').text(newDate + ", " + monthString(newMonth));

	weekOne.setTime(weekOne.getTime() + (86400000 * 6));
	var newDate = weekOne.getDate();
	var newMonth = weekOne.getMonth();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	$('.toDate').text(
			newDate + '/' + (newMonth + 1) + '/' + weekOne.getFullYear());

}
function monthString(number) {
	if (number == 0)
		return 'Jan';
	else if (number == 1)
		return 'Feb';
	else if (number == 2)
		return 'Mar';
	else if (number == 3)
		return 'Apr';
	else if (number == 4)
		return 'May';
	else if (number == 5)
		return 'Jun';
	else if (number == 6)
		return 'Jul';
	else if (number == 7)
		return 'Aug';
	else if (number == 8)
		return 'Sep';
	else if (number == 9)
		return 'Oct';
	else if (number == 10)
		return 'Nov';
	else if (number == 11)
		return 'Dec';

}

function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						$('.catPrint').text($(this).next().text());
						$('.scPrint').text('');
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
						//if (catFlag != selectedValue) {
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
																		if(item.nodeDesc!=''){
																		nodeID = catHierarchyId
																				+ "."
																				+ i;
																		nodeIdTemp = nodeID
																				+ ".1";
																		categoryStr = '<li><input type="checkbox" checked name="subCat" class="subCat" data-tt-id="'
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
																		}
																	});
													$('#segmentBtn')
															.removeClass(
																	'hideBlock');
												}
												//subCategory();
											});
							setTimeout(function(){$(".subCat")
								.click(
										function() {
											$('.scPrint').text($(this).next().text());
											
										});},300);

						//}

					});
	$('.category:visible:first').click();
	/*----------------******  End Category Click function   *****--------------- */
}
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function iterateResult(response,pageNumber,option,a) {
	
	var output = $.parseJSON(response);

	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
		$.loader('close');
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		if(pageNumber == 1)// added for defect no 14598
		recordCount = descList[0].msg;
		currentPage = pageNumber;
		var content = '';
		var finalContent = '';
		var printContent = '<div class="articleHead hideBlock"><div class="articleHeaderWrapper"><h2 class="articleTitle">Order Book</h2></div><div class="articleActionBtns"><label class="actionBtn" onclick="printJasperReport();"><label class="print">Print</label></label></div></div>';
		//<p><label class="articlePriceLabel">From: <strong class="fromDate"></strong></label> <label class="articlePriceLabel">|</label> <label class="articlePriceLabel">To: <strong class="toDate"></strong></label></p>
		//var supplyContent = '<div class="tableActionsBtnsWrapper"><div class="lookupActionWrapper"><label class="linkBtn">'+1986 - Sydney RDC - Produce+'</label><label>&nbsp;[Contact: '+xxxxxxx+'] </label></div></div>';
		var articleHeaderDiv='<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">List of Articles</h4></div> <div class="articleActionBtns rightAlign"><label class="actionBtn" onclick="printJasperReport();"><label class="print">Print</label></label></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div> </div><div id="scrollBtns" class="tableScroller"><ul><li id="previous-column" class="scrollLeft"><a href="#"></a></li><li id="next-column" class="scrollRight"><a href="#"></a></li></ul></div><div id="scrollTable" class="scrollTableContainer"><div id="scrollWindow" class="scrollWindow">';
		var articleHeader='<table cellspacing="0" class="ContentTable tableDataMob" id="tableData"><tr><th rowspan="2">Barcode</th>'+
		'<th rowspan="2">Article</th><th rowspan="2">Order Multiple</th><th rowspan="2" class="columnDivider hideBlock">Cost Price</th><th rowspan="2" class="columnDivider">Qty.</th><th colspan="7" class="columnDivider crntWeek">WC:&nbsp;</th><th colspan="7" class="columnDivider weekOne">WC:&nbsp;</th><th colspan="7" class="columnDivider weekTwo">WC:&nbsp;</th><th colspan="7" class="columnDivider weekThree">WC:&nbsp;</th><th colspan="7" class="lastColumn weekFour">WC:&nbsp;</th></tr><tr class="subHeader"><th class="centerValue">M</th><th class="centerValue">T</th>'
		+'<th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th>'
		+'<th class="centerValue columnDivider">S</th><th class="centerVale">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue lastColumn">S</th></tr>';
		
		var articleBody='';
		
		var suppNo='';
		$.each(descList, function(i, item) {
			item.pack_base_uom!=null ?item.pack_base_uom=item.pack_base_uom :item.pack_base_uom='';
			item.supplier=(item.supplier.replace(/^0+/, '')!='')?item.supplier.replace(/^0+/, ''):' ';
			if(suppNo!=item.supplier.replace(/^0+/, '') )
			{
				//console.log('New Supp Screen: '+item.supplier.replace(/^0+/, ''));
				content='<div class="tableActionsBtnsWrapper"><div class="lookupActionWrapper"><label class="linkBtn">'+item.supplier.replace(/^0+/, '');
				if(item.supplier.replace(/^0+/, '').trim()!='' && item.name!='')content+=' - ';
				content+= item.name 
			+'</label><label>&nbsp;';
			if(item.phone!='')
				content+='[Contact: '+item.phone+']';
			content+='</label></div></div>';
				suppNo=item.supplier.replace(/^0+/, '');
			}else{
				content='';
			}
			
				articleBody+='<tr><td colspan="41" class="lastColumn valueInfo">'+item.articleDesc+'</td></tr><tr>';
				
				//$("#barcode6").JsBarcode("12100001601475",{format:"ITF14",displayValue:true,fontSize:20});
				
				if(item.barcode.length==14) {
					//articleBody+=	'<td rowspan="2" class="barcode-area-14">'+ item.barcode+'<img id="'+item.barcode+'-barcode-area-14"/></td>';
					articleBody+=	'<td rowspan="2" class="barcode-area-14" ean14="'+item.barcode+'"><img id="'+item.barcode+'-barcode-area-14"/></td>';
				}else{
					articleBody+=	'<td rowspan="2" class="barcode-area">'+ item.barcode+'</td>';
				}
				
				
				articleBody+='<td rowspan="2">'+item.article.replace(/^0+/, '')+'</td>'
			
			+'<td rowspan="2">'+item.packSize +' '+item.pack_base_uom
			//+'</td>'
			//+'<td rowspan="2">'+item.price;
			//if(item.currency!='' && item.currency!=null) articleBody+=' ('+ item.currency +') ';
			//articleBody+='</td>'
			+'<td class="columnDivider">ORD</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td>	<td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td>	<td class="lastColumn"></td></tr>'
			+'<tr><td class="columnDivider">SOH</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="lastColumn"></td></tr>';

		if(i==0 && content!='')
		{
			finalContent+=articleHeaderDiv+content+articleHeader+articleBody;
		}
		else if(i!=0 && content!=''){
			finalContent+='<tr><td colspan="41" class="columnDivider&nbsp;vaueInfo" style="background: #f6f6f6;"><label class="linkBtn">'+item.supplier.replace(/^0+/, '')+' - '+ item.name +'</label><label>&nbsp;[Contact: '+item.phone+'] </label></td></tr>'+articleBody;
			}
		else{
			 finalContent+=articleBody;
		}
		
		articleBody='';
		if(i==descList.length-1){
			 finalContent+='</table></div></div></div><div class="paginationWrapper bottomPagination paginationDiv"	id="paginationDiv2"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>';
		}
		
		});
		
		$('#reportContent').html('');
		if(option!='print'){
			//finalContent=finalContent.replace('$STC$','');
		$('#reportContent,.printContent').html(printContent+finalContent);
		}else{
			$('#reportContent,.printContent').html(printContent);
		}
		
		$('.barcode-area').each(function(){
			$(this).barcode($(this).text().trim(), "ean13",{barWidth:1, barHeight:30});
		});
		
		$('.barcode-area-14').each(function(){
			//$(this).barcode($(this).text().trim(), "ean13",{barWidth:1, barHeight:30});
			
		//	$(this).JsBarcode($(this).text().trim(),{format:"ITF14",displayValue:true,fontSize:20});
			//$('#'+$(this).text().trim()+'-barcode-area-14').JsBarcode($(this).text().trim(),{format:"ITF14",displayValue:true,fontSize:12});
		//	$('#'+$(this).attr('ean14').trim()+'-barcode-area-14').JsBarcode($(this).attr('ean14').trim(),{format:"ITF14",displayValue:true,fontSize:12});
			$('#'+$(this).attr('ean14').trim()+'-barcode-area-14').JsBarcode($(this).attr('ean14').trim(),{format:"ITF14",displayValue:true,fontSize:12});
			//$(this).text('');
		});
		//hideContent();
		if(option!='print'){
		if (recordCount > 9) {
			showPaginatedContent(recordCount);
		} else {
			showContent(recordCount);
		}
		$.loader('close');
		}
		if(option=='print')
			printJasperReport();
		$.loader('close');
		//printReport(option,a);
	}
	//$.loader('close');//stopLoading();

}
function printResult(response,option,a) {
	//console.log(response);
	var output = $.parseJSON(response);

	if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		recordCount = descList[0].msg;
		//currentPage = pageNumber;
		var content = '';
		var printBody='';
		var finalContent = '';
		var printContent = '<div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle">Order Book</h2><p><label class="articlePriceLabel">From: <strong class="fromDate"></strong></label> <label class="articlePriceLabel">|</label> <label class="articlePriceLabel">To: <strong class="toDate"></strong></label></p></div><div class="articleActionBtns"><label class="actionBtn" onclick="printReport();"><label class="print">Print</label></label></div></div>';
		//var supplyContent = '<div class="tableActionsBtnsWrapper"><div class="lookupActionWrapper"><label class="linkBtn">'+1986 - Sydney RDC - Produce+'</label><label>&nbsp;[Contact: '+xxxxxxx+'] </label></div></div>';
		var articleHeaderDiv='<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">List of Articles</h4></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div> </div><div id="scrollBtns" class="tableScroller"><ul><li id="previous-column" class="scrollLeft"><a href="#"></a></li><li id="next-column" class="scrollRight"><a href="#"></a></li></ul></div><div id="scrollTable" class="scrollTableContainer"><div id="scrollWindow" class="scrollWindow">';
		var articleHeader='<table cellspacing="0" class="ContentTable tableDataMob" id="tableData"><tr><th rowspan="2" style="padding: 8px 50px;">Barcode</th>'+
		'<th rowspan="2">Article</th><th rowspan="2">PLU</th><th rowspan="2">Order Multiple</th><th rowspan="2" class="columnDivider">Cost</br> Price</th><th rowspan="2" class="columnDivider">Qty.</th><th colspan="7" class="columnDivider crntWeek manuAllignLeft">WC:&nbsp;</th><th colspan="7" class="columnDivider weekOne manuAllignLeft">WC:</th><th colspan="7" class="columnDivider weekTwo manuAllignLeft">WC:</th><th colspan="7" class="columnDivider weekThree manuAllignLeft">WC:</th><th colspan="7" class="lastColumn weekFour manuAllignLeft">WC:</th></tr><tr class="subHeader"><th class="centerValue">M</th><th class="centerValue">T</th>'
		+'<th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th>'
		+'<th class="centerValue columnDivider">S</th><th class="centerVale">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue lastColumn">S</th></tr>';
		var tableHead='<tr><th rowspan="2"  style="padding: 8px 50px;">Barcode</th>'+
		'<th rowspan="2">Article</th><th rowspan="2">PLU</th><th rowspan="2">Order Multiple</th><th rowspan="2" class="columnDivider hideBlock">Cost</br> Price</th><th rowspan="2" class="columnDivider">Qty.</th><th colspan="7" class="columnDivider crntWeek manuAllignLeft">WC:&nbsp;</th><th colspan="7" class="columnDivider weekOne manuAllignLeft">WC:</th><th colspan="7" class="columnDivider weekTwo manuAllignLeft">WC:</th><th colspan="7" class="columnDivider weekThree manuAllignLeft">WC:</th><th colspan="7" class="lastColumn weekFour manuAllignLeft">WC:</th></tr><tr class="subHeader"><th class="centerValue">M</th><th class="centerValue">T</th>'
		+'<th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th>'
		+'<th class="centerValue columnDivider">S</th><th class="centerVale">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue columnDivider">S</th><th class="centerValue">M</th><th class="centerValue">T</th><th class="centerValue">W</th><th class="centerValue">T</th><th class="centerValue">F</th><th class="centerValue">S</th><th class="centerValue lastColumn">S</th></tr>';
		var printFoot='<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="width25 inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
		var reportContent='';
		var tabEnd='</table>';
		var articlePrintBody='';
		var suppNo='';
		var j=1;
		var k=1;
		$.each(descList, function(i, item) {
			item.pack_base_uom!=null ?item.pack_base_uom=item.pack_base_uom :item.pack_base_uom='';
			item.plu!=null ?item.plu=item.plu :item.plu='';
			item.supplier=item.supplier.replace(/^0+/, '').trim()!=''?item.supplier.replace(/^0+/, ''):' ';
			if(suppNo!=item.supplier.replace(/^0+/, ''))
			{
				reportContent='<div class="width100 pageBreak" style="margin-top:-5px"><div class="width70   reportName mob bold inline-block">Manual Order Book Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div style="width: 55%" class="margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div><div style="width: 40%" class=" right"><div class=" margin5 text-align-right ">Contact: '+item.phone+' | Supplier: '+item.supplier.replace(/^0+/, '');
				if(item.name.trim()!='' && item.supplier.replace(/^0+/, '').trim()!='')
				reportContent+=' - ';
				reportContent+=item.name+'</div></div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">Department: </label><label class="trading dept" id=""></label><label class="separator ordHide">|</label><label class="ordHide" >Category: </label><label class="transaction printOrdNo cat" id="" ></label><label class="separator">|</label><label class="">Sub-Category: </label><label class="reason subCate" id="">20</label><label class="separator receiptHide seg-lab hideBlock" >|</label><label class="receiptHide seg-lab hideBlock" >Segment: </label><label class="emp receiptHide seg" ></label></div>	</div><table style="width:100%;margin-top:10px" border="1" cellspacing="0" class="ContentTable print printContent" id="mobPrintTable">'+tableHead;
				suppNo=item.supplier.replace(/^0+/, '');
				if(k!=1){
					for(var r=0;r<=(7-j);r++)
						articlePrintBody+='<tr class="height90"></tr>';
					articlePrintBody+=tabEnd+printFoot+reportContent;
					j=1;
				}
				else
					articlePrintBody+=reportContent;
			}
			
			
				articlePrintBody+='<tr><td colspan="41" class="lastColumn valueInfo">'+item.articleDesc+'</td></tr><tr>';
				
				//+'<td rowspan="2" class="barcode-area">'+ item.barcode+'</td>'
				
				if(item.barcode.length==14) {
				//	articlePrintBody+=	'<td rowspan="2" class="barcode-area-14">'+ item.barcode+'<img id="'+item.barcode+'-barcode-area-14"/></td>';
					articlePrintBody+=	'<td rowspan="2" class="barcode-area-14-print" ean14="'+item.barcode+'"><img id="'+item.barcode+'-barcode-area-14-print"/></td>';
				}else{
					articlePrintBody+=	'<td rowspan="2" class="barcode-area">'+ item.barcode+'</td>';
				}
				
				
				articlePrintBody+='<td rowspan="2">'+item.article.replace(/^0+/, '')+'</td>'
			+'<td rowspan="2">'+item.plu+'</td>'
			+'<td rowspan="2">'+item.packSize +' '+item.pack_base_uom+'</td>'
			//+'<td rowspan="2">'+item.price;
			//if(item.currency!='' && item.currency!=null) articlePrintBody+=' ('+ item.currency +') ';
			//articlePrintBody+='</td>'
			+'<td class="columnDivider">ORD</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td></tr>'
			+'<tr><td class="columnDivider">SOH</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="columnDivider"></td></tr>';
if(j==7 && i!=descList.length-1){
		articlePrintBody+='</table>'+printFoot+reportContent;
		j=1;
		}
else
	j++; 

		
k++;	
		});
		printBody=articlePrintBody+'</table>'+printFoot;
		//console.log(printBody);
		$('#printbody').html(printBody).append('<link rel="stylesheet" href="../../styles/printstyle.css" />');

		 printBody='';
	
		
		$('.barcode-area').each(function(){
			$(this).barcode($(this).text().trim(), "ean13",{barWidth:1, barHeight:30});
		});
		$('.barcode-area-14-print').each(function(){
			//$(this).barcode($(this).text().trim(), "ean13",{barWidth:1, barHeight:30});
			//$("#barcode6").JsBarcode("12100001601475",{format:"ITF14",displayValue:true,fontSize:20})
		//	$('#'+$(this).text().trim()+'-barcode-area-14').JsBarcode($(this).text().trim(),{format:"ITF14",displayValue:true,fontSize:12});
			$('#'+$(this).attr('ean14').trim()+'-barcode-area-14-print').JsBarcode($(this).attr('ean14').trim(),{format:"ITF14",displayValue:true,fontSize:12});
			
			//var selectedCat = $(this).attr('ean14');
			//$(this).text('');
		});
		//hideContent();
		/*if (recordCount > 9) {
			showPaginatedContent(recordCount);
		} else {
			showContent(recordCount);
		}*/
		if(option=='print'){
			//setTimeout(function(){
				manualOrderBookPrint(a);
				a.focus();
				}
				//},1000);
			//$('#reportContent .print').parent().click();
	}
	stopLoading();
	
}

function generateReport(data, pageNumber,option,a) {
console.log('data' + data);
	$.ajax({
		type : "get",
		url : "generateReport.htm",
		data : data,
		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
		},
		success : function(response) {
			iterateResult(response,pageNumber,option,a);
			//stopLoading();
		},
		error : function() {
			// goToLogin();
			$.loader('close');
			//if(option=='print')
				//closeDoc(a);
			
		},
	});

}
function closeDoc(a){
	try{
	if(a!=undefined)
	{
		a.close();
	}
	}catch(err){
		console.log(err);
	}
}
function printReport(option,a) {
	$.ajax({
		type : "get",
		url : "printReport.htm",
		data : "",
		beforeSend : function() {
			//startLoading();
		},
		success : function(response) {
			printResult(response,option,a);
			$.loader('close');//stopLoading();
		},
		error : function() {
			// goToLogin();
			$.loader('close');
			closeDoc(a);
		},
	});

}

function printJasperReport() {
	$('#manualOrderBookReportPdf').attr("action", "downloadManualOrderBookPdf.pdf");
	$('#manualOrderBookReportPdf').attr('target','_blank');
	$('#manualOrderBookReportPdf').attr('method','get');
	$('#manualOrderBookReportPdf').submit();
}

function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 9,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			generateReport({
				pageNo : pageNumber
			}, pageNumber,'noprint','');

		}

	});
	$(
	'#reportContent')
	.removeClass('hideBlock');
	bindScrollBar();
	$('.paginationWrapper').show();
	closeAccordian();
}

function showContent(count) {
	//$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent')
			.removeClass('hideBlock');
	bindScrollBar();
	closeAccordian();
}
function hideContent() {
	$(
			'#reportContent')
			.addClass('hideBlock');
	$('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	//$('#errorMsgDiv,.tableTitle.errorDiv').removeClass('hideBlock');
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