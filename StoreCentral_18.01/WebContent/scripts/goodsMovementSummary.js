var requestParam = '';
var dateFrom = '';
var dateTo = '';
var salesOrg = '';
var article_or_hier = false;
var articleBasicDescList = [];
var choose = 'artList';
var printBtn = '<div class="tableActionBtns"><label class="actionBtn" id="printReportStockAdj"><a href="#"><label class="print">Print</label></a></label></div>';
$(function() {
	$('.mainWrapper > .contentWrapper').css('max-width','1028px');
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	
	/* Autocomplete Off */
	document.forms[0].autocomplete = "off";

	// on click of back button
	$("#backBtn").click(function(e) {
		window.location.href = "../login/homepage.htm";
	});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$("#generateReport,#segmentBtn").click(function() {
		$(".ContentTableWrapper").addClass('hideBlock');
		
		if (choose == "artList" && $("#searchBaiscBox").val().length > 0) {
			callArticleBasicSearchService($("#searchBaiscBox").val(),true);	
		}else {
			handleGenReportClick();
		}
		
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// Code to show and hide article heirarchy
	$('#depHier').click(function() {
		if ($(this).is(':checked'))
			$("#articleHierarchy").removeClass('hideBlock');
		else
			$("#articleHierarchy").addClass('hideBlock');
	});

	$('#searchBaiscBox').focus();
	
	// checks radio buttons for location and include
	$('#depHier').click(function() {
		$(".articleHierarchy").removeClass('hideBlock');
		$(".articleListInput").addClass('hideBlock');
		$('#searchBaiscBoxList').html('');
		$('#searchBaiscBox').val('');
		choose = 'depHier';
	});

	$('#artList').click(function() {
		$(".articleListInput").removeClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
		$('#deptlst').find('input').prop('checked',false);
		$('#searchBaiscBox').focus();
		$("#segmentLst,#subCategoryLst,#noSelectionCat,#subCatTotal,#segmentTotal,#categoryLstTotal").addClass('hideBlock');
		$("#deptGo,#segment,#subCat,#categoryLst,#noSelectionCat").removeClass('hideBlock');
		$("#categoryLstCnt,#subTotal,#segmentTotalCnt").text('');
		$("#categoryLst").empty();
		choose = 'artList';
	});

	// Code for calendar

	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		onClose : function(selectedDate) {
			$("#dateTo").focus();
		}

	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});

	$('html').click(function() {
		$(".selectDropdown").removeClass('active');
	});

	$('.selectDropdown').click(function(event) {
		event.stopPropagation();
	});

	$(document)
			.keypress(
					function(event) {
						event.stopPropagation();
						if (event.which == 13) {// on click of enter key
							if ($("#searchBaiscBox").val().length > 0) {
								if ($("#searchBaiscBoxList").find(
										"#"
												+ $("#searchBaiscBox").val()
														.split('-')[0]).length > 0) {
									$.fn.showCustomMsg(
											[ 'Article added already.' ],
											error, 'Goods Movement Summary');
								} else {
									callArticleBasicSearchService($(
											"#searchBaiscBox").val().split('-')[0]);
								}
								return false;
							}else{
								handleGenReportClick();
							}
						}
					});

	populateDepartment();

	createAutoSuggestChange($('.reportWrapper').find('#searchBaiscBox'));

	var today = new Date();
	var tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	$("#dateFrom").val(dateFromformat());
	$("#dateTo").val(dateToformat());

	
	// Close Button
	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});
	});
});

function handleGenReportClick(){
	//adjFor = $(".reportRadio input[type=radio]:checked").val();// Adjustment
	if (buildReqParam()){
		callGoodsMovementSummaryService(requestParam);
	}
}

function callArticleBasicSearchService(article,genReportFlag) {
	
	var barCodeFlag = article.length > 7 ? true : false;
	var reqParamBasicService = '';
	if (barCodeFlag) {
		reqParamBasicService = {
			"iv_article" : "",
			"iv_site" : $("#posSite").val(),
			"iv_sales_org" : $("#salesOrg").val(),
			"iv_supplier" : "",
			"iv_src_supply" : "",
			"iv_ranged" : "N",
			"iv_session_id" : "",
			"iv_barcode" : article,
			"iv_node_level" : "",
			"iv_node_id" : "",
			"iv_desc" : "",
			"iv_article_no" : "N",
			"iv_gtin" : "",
			"iv_barcode_flag" : "Y",
			"iv_auto_stockr_flag" : "",
			"iv_style":"", //including fields for DEFECT - 8595
			"iv_colour":"",
			"iv_article_size":""
		};
	} else {
		reqParamBasicService = {
			"iv_article" : article,
			"iv_site" : $("#posSite").val(),
			"iv_sales_org" : $("#salesOrg").val(),
			"iv_supplier" : "",
			"iv_src_supply" : "",
			"iv_ranged" : "N",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_node_level" : "",
			"iv_node_id" : "",
			"iv_desc" : "",
			"iv_article_no" : "Y",
			"iv_gtin" : "",
			"iv_barcode_flag" : "",
			"iv_auto_stockr_flag" : "",
			"iv_style":"", //including fields for DEFECT - 8595
			"iv_colour":"",
			"iv_article_size":""
		};
	}
	console.log(articleHeaderBasicUrl + ' '
			+ JSON.stringify(reqParamBasicService));
	$
			.ajax({
				type : "POST",
				url : articleHeaderBasicUrl,
				data : JSON.stringify(reqParamBasicService),
				beforeSend : function() {
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));
						if (response != undefined && response.length > 0
								&& response[0].article_no != undefined) {
							if (response.length == 1) {
								$("#searchBaiscBoxList")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ response[0].article_no
														+ '">'
														+ response[0].article_no+"-"+response[0].article_desc
														+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
								$("#searchBaiscBox").val('');
								if (genReportFlag) {
									handleGenReportClick();
								}
							} else if (response.length > 1) {
								// selectOption
								$.fn.loadArticlePopUpForStkAdjReport(response,
										onAddToList, '',
										onArticleTdSelectInStockAdjustReport,
										checkboxOption, $("#searchBaiscBox")
												.val());
							}

						} else {
							// articleBasicList[articleBasicList.length] =
							// article;
							if (response != undefined && response.length <= 0) {
								$.fn
										.showCustomMsg(
												[ 'Sorry, No results found for the search criteria. Please try again.' ],
												success,
												'Goods Movement Summary');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
												error, 'Goods Movement Summary');
							}
						}
					}).fail(function() {
			}).always(function() {
			});
}

var onAddToList= function (event){
	$elem = $(this);
	var list =[];
	list = Object.keys($elem.data('checkedObj'));
	for(var i=0;i<list.length;i++) {
		if ($("#searchBaiscBoxList").find(
				"#"+ list[i].split('-')[0]).length > 0) {
			  //$.fn.showCustomMsg(['Article added already.'],error,'Create Stocktake');
		}else{
			$("#searchBaiscBox").val(list[i]); 		
			$("#searchBaiscBoxList").append('<li><label class="articleBasicLabel" id="'+$("#searchBaiscBox").val().split('-')[0]+'">'+$("#searchBaiscBox").val()+'</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
			$("#searchBaiscBox").val('');
		}
	}	
};

var onArticleTdSelectInStockAdjustReport = function(event) {event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var len =0;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? {} :checkedObj;
		if($elem.is(':checked')){
			obj.checked = true;
			checkedObj[obj.article_no+'-'+obj.article_desc] = obj;
		}else{
			obj.checked = false;
			delete checkedObj[obj.article_no+'-'+obj.article_desc];
		}
		len = Object.keys(checkedObj).length;
		if(len == 0){
			$selectBtn.text('Add to List').addClass('hideBlock');
		}else{
			$selectBtn.text('Add to List ('+(len >9 ? len : '0'+len)+')').removeClass('hideBlock').data('checkedObj',checkedObj);
		}
};

function removeArticleFromBasicList(parentElem) {
	$(parentElem).remove();	
}
/**
 * Sets the request parameters for the service
 */

function buildReqParam() {

	var dateFrom = $("#dateFrom").val();// Date From
	var dateTo = $("#dateTo").val();// Date To
	var valid = true;
	article_or_hier = $('#artList').is(':checked');
	articleBasicList = [];
	valid = validateDates(dateFrom,dateTo,'Goods Movement Summary');
	
	if (valid) {
		requestParam = {						
			"iv_site": $('#posSite').val(),
			"iv_sales_org": $("#salesOrg").val(),
			"iv_session_id": "",
			"iv_dept_list": "",
			"iv_cat_list": "",
			"iv_sub_cat_list": "",
			"iv_seg_list": "",
			"iv_from_date": formatDateMobi(dateFrom),
			"iv_to_date": formatDateMobi(dateTo),
			"iv_include_gr": $('#goodsReceipt').is(':checked')?'Y':'N',
			"iv_include_sales": $('#sales').is(':checked')?'Y':'N',
			"iv_include_nonpi": $('#pi').is(':checked')?'Y':'N',
			"iv_article": ""
		};
		
		if(article_or_hier){
			 if($("#searchBaiscBoxList").find(".articleBasicLabel").length == 0 ){
					valid = false;
					$.fn.showCustomMsg([ 'Please enter article(s).' ], error,
							'Goods Movement Summary');
			 }else{
				articleBasicList = new Array();
				articleBasicDescList = new Array();
					$("#searchBaiscBoxList").find(".articleBasicLabel").each(function(){
					articleBasicList.push($(this).text().split('-')[0]);
					articleBasicDescList.push($(this).text());
				});
				requestParam.iv_article= articleBasicList.join(",");
			 }
		}else{
			 if(!($('#segmentLst').find('input').is(':checked'))){
					valid = false;
					$.fn.showCustomMsg([ 'Please select till segment.' ], error,
							'Goods Movement Summary');
			 }else{
				 requestParam.iv_seg_list=$('#segmentLst').find('input:checked').val();
			 }
		}
	}
	return valid;
}

/**
 * Invokes report service
 * 
 * @param recvParam
 */
function callGoodsMovementSummaryService() {
	console.log(getStoreSohLogDetailsURL + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : getStoreSohLogDetailsURL,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(responseO) {
				//responseO = response.d.results;
				if (responseO != undefined && responseO.length > 0
						&& responseO[0].article_no != undefined && responseO[0].article_no != '') {
					$(".ContentTableWrapper").removeClass('hideBlock');
					var $tblhold = $("#goodsMovementSummaryContent");
					formatRecords(responseO);
					loadGMSummaryContentTbl(responseO, $tblhold);
					bindPrintGM(false);
					$("#noRecords").html(responseO.length);
					toControllerGM();
				} else {
					$(".ContentTableWrapper").addClass('hideBlock');
					if (responseO != undefined && responseO.length <= 0) {
							$.fn.showCustomMsg([ 'Sorry, no records found ' ],
									error, 'Goods Movement Summary');	
					} else {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured ' ],
								error, 'Goods Movement Summary');
					}
					stopLoading();
				}
			}).fail(
			function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured ' ],
						error, 'Goods Movement Summary');
				stopLoading();
			}).always(function() {
		
	});
}

function bindPrintGM(sapCallFlag) {
	$('#printReportStockAdj').remove();
	$(printBtn).insertAfter($('#goodsMovementSummaryContent').find('.tableTitle'));
	$("#printReportStockAdj").unbind('click');
	$("#printReportStockAdj").click(function(){
		$('#GoodsMovementSummaryForm').attr("action",
		"downloadGoodsMovementSummaryPdf.pdf");
		$('#GoodsMovementSummaryForm').attr('target', '_blank');
		$('#GoodsMovementSummaryForm').attr('method', 'get');
		$('#GoodsMovementSummaryForm').submit();
	});
}


function toControllerGM() {
	var deptOrArticle = '';
	report_name = "goodsMovementSummary";
	reportResultArray = $('#goodsMovementSummary_table').data('confObj').content;
	var title = '';
	if (article_or_hier) {
		deptOrArticle = 'N';
		title = '';
	} else {
		deptOrArticle = "Y";
		title = $('#segmentLst').find('input:checked').next().html();
	}

	var obj = {
		reportResult : reportResultArray,
		StoreNo : $('#posSite').val(),
		StoreName : $('#posSiteName').val(),
		totalCount : reportResultArray.length,
		fromDate : $('#dateFrom').val(),
		toDate : $('#dateTo').val(),
		deptOrArticle :deptOrArticle,
		dept : title,
		article : reportResultArray[0].article_no + ' - '
				+ reportResultArray[0].article_desc,
		src : 'print'
	};
	$.ajax({
		url : "../goodMovement/printGoodsMovementSummaryReportPDF.htm",
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(obj),
		cache : false,
		processData : false,
		beforeSend : function() {
			startLoading();
		},
		success : function(response, textStatus) {
			if (response.data == 'success') {
				console.log("success");
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log('request failed' + errorThrown);
		},complete:function(){
			$('#accordion').accordion({active:false});
			stopLoading();
		}
	});
}
/**
 * Sets the area & table for report generation
 * 
 * @param data
 * @param $tblhold
 */
function loadGMSummaryContentTbl(data, $tblhold) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;	
	var confObj = (new tblGoodsMovementSummary(data, title));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toControllerGM();
	});
	bindPrintGM();
}

/**
 * Configuration to generate table
 * 
 * @param data
 * @returns {tblGoodsMovementSummary}
 */
function tblGoodsMovementSummary(data, title){
	var len = data.length;
	this.option = 'build';
	this.key = ['article_no', 'article_desc', 'reason_code_desc', 'date_time_sap', 'user_name', 'uom','oldSOH',
			 'new_soh', 'adjustment_qty_new'];
	this.table_name = "goodsMovementSummary";
	this.table_title = 'Total <strong id="noRecords">' + len
	+ '</strong> Results found ';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {
		article_no : 'Article </br> Number',
		article_desc : 'Article </br> Description',
		uom : 'UOM',
		user_name : 'User/System',
		oldSOH : 'Prev </br> SOH',		
		std_sell_price : 'Std. Sell </br> Price ($)',
		adjustment_value : 'Stock </br> Value </br> Adjusted ($)',
		new_soh : 'New </br> SOH',
		mvmt_type_desc : 'Additional Info'
	}, this.header_data_type = {
		article_no : 'char',
		article_desc : 'char',
		uom : 'char',
		reason_code_desc : 'char',
		date_time_sap : 'date',
		user_name : 'char',
		oldSOH : 'number',
		adjustment_qty_new : 'number',
		new_soh : 'number',		
		std_sell_price : 'number',
		adjustment_value : 'number',
		mvmt_type_desc : 'char'
	}, this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		uom : 'main',
		reason_code_desc : 'main',
		date_time_sap : 'main',
		user_name : 'main',
		oldSOH : 'main',		
		adjustment_qty_new : 'main',
		new_soh : 'main',
		std_sell_price : 'main',
		adjustment_value : 'main',
		mvmt_type_desc : 'main'
	}, this.header_class = {
		article_no : '',
		article_desc : '',
		uom : 'centerValue',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : '',
		oldSOH : 'centerValue',		
		adjustment_qty_new : 'centerValue',
		new_soh : 'centerValue',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.data_td_class = {/*article_no:getArticleTdclass*/},
	this.header_title = {}, this.header_width = {
		article_no : '13%',
		article_desc : '15%',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '13%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		new_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	}, this.content_class = {
		article_no : '',
		article_desc : '',
		uom : 'centerValue',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : '',
		oldSOH : 'rightValue',		
		adjustment_qty_new : 'rightValue',
		new_soh : 'rightValue',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.content_title = {}, this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		uom : 'removeNull',
		reason_code_desc : 'removeNull',
		date_time_sap : '',
		user_name : 'removeNull',
		oldSOH : 'removeNull',		
		adjustment_qty_new : 'removeNull',
		new_soh : 'removeNull',
		std_sell_price : 'removeNull',
		adjustment_value : 'removeNull',
		mvmt_type_desc : 'removeNull'
	}, this.content_width = {
		article_no : '13%',
		article_desc : '15%',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '13%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		new_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	};
	this.header_td_label = {
		date_time_sap : 'Date & Time',
		reason_code_desc : 'Reason Code & </br> Description',
		adjustment_qty_new : 'Qty. </br> Adjusted',
		oldSOH : 'Prev </br> SOH',
		uom : 'UOM',
		user_name : 'User/System'
	};
	this.content = data;
	this.pagination = true;
	this.groupby = false;
	this.groupbyColumn = {
		'article_no' : 'Article',
		'dept_id' : 'Sub Category'
	};
	this.group_cont_function = {
		article_no : getGMSArticleGrpCont,
		dept_id : getGMSSubCatGrpCont
	};
	this.cont_data_function = {
		article_no: getArticleTdClassMulti,
		user_name : showGMSUserName, 
		uom:showGMUOM,
		oldSOH : showGMSOldSOH,
		date_time_sap : showAdj_date_time_f,
		reason_code_desc : showGMSReasonDescSAPCall,
		new_soh : showGMSEnd_soh,
		adjustment_qty_new : showGMSAdjustment_qty
	};
	this.cont_sort_function = {
		oldSOH : getGMSOldSOH,
		date_time_sap : getDateAndTime,
		reason_code_desc : getGMSReasonDesc,
		adjustment_qty_new : getGMSAdjustment_qty,
		new_soh :getGMSEnd_soh
	};
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {
		click : ''
	};
	this.content_tr_addon = {
		click : ''
	};
	this.content_td_addon = {
		click : ''
	};
	this.content_label = {};
	this.grp_tot = true;
	this.group_tot_cont_function = {
		article_no : getGMSTotalStcokAdjValueByArticle/*,
		reason_code_desc : getTotalStcokAdjValueByReasonSAP,
		user_name : getTotalStcokAdjValueByUser,
		date_time_sap : getTotalStcokAdjValueByDateSAP*/
	};
	this.default_groupbyColumn = [ 'article_no' ];
	this.legend = '<div class="legend"> Legend: <label class="pb">Pack Breakdown</label><label class="pi">Perpetual Inventory</label> </div>';
}
var getArticleTdClassMulti = function(obj){
	var colClass = [];
	var promo_indicator = [];
	var addingDiv ='';
		
	if(obj.pbd_ind == 'Y'){
		colClass.push(' <div class = "pb right"></div>');
	}
	if(obj.perpetual_flag == 'Y'){
		colClass.push(' <div class = "pi right"></div>');
	}
	promo_indicator = promo_indicator.join();
	colClass = colClass.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
	addingDiv = (colClass.replace(/,/g, " "));
	
	return obj.article_no+''+addingDiv;
	
}

var showGMUOM = function(obj){
	obj.uom = obj.meinh;
	if((obj.random_weight_flag||'') == 'Y' && (obj.pi_uom) != null && (obj.pi_uom) != undefined){
		return '<div>'+(obj.meinh)+'</div>'+'</br>'+'<div >'+(obj.pi_uom)+'</div>';
	}
	return obj.meinh;
};

/**
 * Group by article content
 */
var getGMSArticleGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.article_no || '')
				+ '</td></tr>';
	}
	return cont;
};
/**
 * Group by article content
 */
var getGMSSubCatGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.sub_cat_name || '')
				+ '</td></tr>';
	}
	return cont;
};

var showGMSUserName = function(obj){		//Defect_11419
	/*if(obj.user_id != '' && obj.user_id != undefined && obj.user_id != null){
		return (obj.user_name ||'')+" ("+obj.user_id+")"; // defect no 9624
	}else{*/
		return( obj.user_name||'');
	//}
};
var showGMSEnd_soh = function(obj){
	obj.new_soh = Number(obj.end_soh).toFixed(3);//Number(obj.end_soh) - Number(obj.adjustment_qty);
	if(obj.perpetual_flag !="" && obj.perpetual_flag !=null && obj.perpetual_flag == "N"){
		return "-";
	}else if((obj.random_weight_flag||'') == 'Y' && (obj.new_soh_pi) != null && (obj.new_soh_pi) != undefined){
		return '<div>'+(obj.new_soh)+'</div>'+'</br>'+'<div>'+(obj.new_soh_pi)+'</div>';
	}
	return (obj.new_soh);
};

var showGMSAdjDateTime = function(obj) {
	return obj.adjustment_time;
};

var showGMSReasonDescSAPCall = function(obj) {
	obj.reason_code_name = obj.adj_type;
	return obj.adj_type;
};
var showGMSOldSOH = function(obj) {
	obj.oldSOH = Number(obj.current_soh).toFixed(3);//Number(obj.end_soh) - Number(obj.adjustment_qty);
	if(obj.perpetual_flag !="" && obj.perpetual_flag !=null && obj.perpetual_flag == "N"){
		return "-";
	}else if((obj.random_weight_flag||'') == 'Y' && (obj.current_soh_pi) != undefined && (obj.current_soh_pi) != null){
		return '<div>'+(obj.oldSOH)+'</div>'+'</br>'+'<div>'+(obj.current_soh_pi)+'</div>';
	}
	return (obj.oldSOH);// defect no 7289
};

var showGMSAdjustment_qty = function(obj){
		if(obj.sign != undefined && obj.sign != null && obj.sign !='' && obj.sign == '-1' ){
			obj.adjustment_qty_with_sign = '-'+Number(obj.adjustment_qty).toFixed(3);
			obj.adjustment_qty_pi_with_sign = '-'+(obj.adj_qty_pi);
			if((obj.random_weight_flag||'') == 'Y' && (obj.adj_qty_pi) != null && (obj.adj_qty_pi) != undefined){
				return '<div>'+(obj.adjustment_qty_with_sign)+'</div>'+'</br>'+'<div>'+(obj.adjustment_qty_pi_with_sign)+'</div>';
			}
		}if(obj.sign != undefined && obj.sign != null && obj.sign !='' && obj.sign == '+1' ){
			obj.adjustment_qty_with_sign = '+'+Number(obj.adjustment_qty).toFixed(3);
			obj.adjustment_qty_pi_with_sign = '+'+(obj.adj_qty_pi);
			if((obj.random_weight_flag||'') == 'Y' && (obj.adj_qty_pi) != null && (obj.adj_qty_pi) != undefined){
				return '<div>'+(obj.adjustment_qty_with_sign)+'</div>'+'</br>'+'<div>'+(obj.adjustment_qty_pi_with_sign)+'</div>';
			}
		}
	return (obj.adjustment_qty_with_sign);
};


var getGMSAdjDateTime = function() {
	return 'date_time_sap';
};
var getGMSReasonDesc = function() {
	return 'reason_code_name';
};
var getGMSOldSOH = function() {
	return 'oldSOH';
};
var getGMSAdjustment_qty = function()
{
	return 'adjustment_qty_with_sign';
};
var getGMSEnd_soh = function()
{
	return 'new_soh';
};
var getGMSTotalStcokAdjValueByArticle = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	// console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '';
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(3)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
function bindsecuritymatrix(){
	securityMatrix();
}


var showAdj_date_time_f = function(obj) {
	obj.getDateAndTime = getFormattedMobiDate(obj.adjustment_time);
	return obj.getDateAndTime;
};

var getDateAndTime = function(){
	return 'getDateAndTime';
};

function formatRecords(responseO){
	var keyobj = responseO; 
	for(var m = 0;m<keyobj.length;m++){

		//keyobj[m].pi_uom = 'EA';
		//keyobj[m].random_weight_flag = 'Y';
		//key = keyobj[m];
		//if(confObj.cont_data_function!=undefined && confObj.cont_data_function[key]!=undefined){
			showAdj_date_time_f(keyobj[m]);
			showGMSOldSOH(keyobj[m]);
			showGMSAdjustment_qty(keyobj[m]);
			showGMSReasonDescSAPCall(keyobj[m]);
			showGMUOM(keyobj[m]);
			showGMSEnd_soh(keyobj[m]);
		//}
	}
}
var getFormattedMobiDate = function(date){
	if(date!=null && date!='' && date!=undefined && date.split('-').length>2){
		var datePart = date.split(' ')[0].split('-');
		var timePart = date.split(' ')[1];
		if(timePart.split(':').length>1){
			var timePartAr = timePart.split(':');
			timePart = timePartAr[0]+':'+timePartAr[1];
		}
		return datePart [2]+'/'+datePart [1]+'/'+datePart [0]+' '+timePart;
	}
	return date;
};

var showStdSellPrice = function(obj) {
	return roundDecimal(obj.std_sell_price, 2);// defect 6936
};
function roundDecimal(value, noOfDigits) {
	var str = Number(value).toFixed(noOfDigits);
		return str;
}

function createAutoSuggestChange(elem, elemToBeTriggered, maxAutoListSize) {
	// code for article auto suggest in the text box
	var maxAutoListSize = 10;
	var param = {};
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							param = {
								iv_article : request.term,
								iv_auto_stockR : 'N',
								iv_ranged : 'Y',
								iv_session_id : '',
								iv_auto_stockr_flag : ''
							};
							//changed search length 2 as 3 for better performance
							if (request.term.length == 3) {
								console.log(getarticleguggestions + ' '
										+ JSON.stringify(param));
								// $.ajaxSetup({async: false});
								$
										.post(
												getarticleguggestions,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			return {
																				value : item.article_no
																						+ '-'
																						+ item.article_desc,
																				text : item.article_no
																						+ '-'
																						+ item.article_desc
																			};
																		}));
													}
												});
							} else {
								setTimeout(
										function() {
											if (suggestionList != null
													&& suggestionList != undefined
													&& suggestionList.length > 0) {
												response(sliceFilteredList(
														request,
														suggestionList,
														maxAutoListSize));
											}
										}, 50);
							}
						},
						select : function(event, ui) {

							if ($("#searchBaiscBoxList")
									.find(
											"#"
													+ ui.item.text.toString()
															.split('-')[0]).length > 0) {
								$.fn.showCustomMsg(
										[ 'Article added already.' ], error,
										'Goods Movement Summary');
							} else {
								
								$("#searchBaiscBoxList")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ ui.item.text
																.toString()
																.split('-')[0]
														+ '">'
														+ ui.item.text
																.toString()
														+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
								$("#searchBaiscBox").val('');
								 $(this).val("");
				                   return false;
								 
							}
							
							
						},
						minLength : 2,
						autoFocus : true
					}).keypress(function(e){
						if(e.which == 13){
							 $(this).autocomplete( "close" );
						}
					});
	$("#searchBaiscBox").val('');
}


//Related to hiearachy drop down
function populateDepartment() {
	salesOrg =$('#salesOrg').val();
	var param = {  "iv_sales_org": salesOrg, "iv_node_id": "ALL DEPARTMENTS", "iv_session_id": "100" };
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$.ajax({
		type: "POST",
	    url: gethierarchyDetails,
	    data: JSON.stringify(param)
	}).done(function(response) {
		loadDepartment(response);
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
	}).always(function() {
		stopLoading();
	});
}

function loadDepartment(temList){
	var content = '';
	 // below code is used for reading the department name
	if (temList.length > 0) {
		departmentList = temList;
		departmentMap = $groupBy(departmentList, function(obj) {
			return obj.node_id;
		});
		for (var i = 0; i < temList.length; i++) {
			content += '<li >	<input class="department" type="radio" name="departmentList" ' + 'value="' + temList[i].node_id + '" id="' + temList[i].node_id + '">' + '<label for="' + temList[i].node_id + '" class="labelText">' + temList[i].node_desc + '</label></li>';
		}
		$('#deptlst').html(content);
		$("#deptLstCnt").text(temList.length);
		bindDepartmentSelectEvent();
	 }
}

function bindDepartmentSelectEvent() {
	$('.department').on('click', function() {
		  var $elm = $(this);
		  var selectedValue = this.id.toString();
		  var param = {};
	      param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
	      $.ajax({
	        type: "POST",
	        url: gethierarchyDetails,
	        data: JSON.stringify(param),
	        beforeSend : function(){ unloadPrevCategory($elm,selectedValue); }
	      }).done(function(response) {
	    	  loadCategory(response,selectedValue);
		  }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }).always(function() {
			  stopLoading();
		  });
	});
}

function unloadPrevCategory($elm,selectedValue){
	$('#departmentInEnq').val(selectedValue);
	$("#catGo,#subCatGo,#segmentBtn,#segmentLst,#subCategoryLst,#noSelectionCat,#subCatTotal,#segmentTotal").addClass('hideBlock');
	$("#deptGo,#segment,#subCat,#categoryLst").removeClass('hideBlock');
	$("#categoryLstCnt,#subTotal,#segmentTotalCnt").text('');
	$("#categoryLst").empty();
	$('#hierarchyID').val(selectedValue);
	$('#hierarchyLVL').val(2);
}

function loadCategory(temList,selectedValue){
 if (temList.length > 0) {
   var content = '';
   for (var i = 0; i < temList.length; i++) {
     content += '<li><input type="radio" name="category" class="category" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
   }
   $('#categoryLst').html(content);
   $("#categoryLstCnt").text(temList.length);
   $("#categoryLstTotal").removeClass('hideBlock');
   bindCategorySelectEvent();
 }
}

function bindCategorySelectEvent() {
	$(document).on("click", ".category", function() {
		var $elm = $(this);
	 var selectedValue = this.id.toString();
	 var param = {};
	   param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
	   $.ajax({
	     type: "POST",
	     url: gethierarchyDetails,
	     data: JSON.stringify(param),
	     beforeSend: function(){
	     	unloadPrevSubCat($elm,selectedValue);
	     }
	   }).done(function(response) {
	 	  loadSubCat(response,selectedValue);
		  }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }).always(function() {
			  stopLoading();
		  });
	});
}

function unloadPrevSubCat($elm,selectedValue){
	 $('#selectedCat').text(toTitleCase($elm.next().text()));
  $('.selectedSubCat,#segmentLst,#segmentBtn,#deptGo,#subCatGo,#segmentTotal,#subCat').addClass('hideBlock');
  $("#catGo,#segment,#subCategoryLst").removeClass('hideBlock');
  $("#subCategoryLst").empty();
  $("#subTotal,#segmentTotalCnt,#selectedSubCat").text('');
  $('#hierarchyID').val(selectedValue);
  $('#hierarchyLVL').val(3);
}

function loadSubCat(temList,selectedValue){
	if (temList.length > 0) {
   var content = '';
   for (var i = 0; i < temList.length; i++) {
     content += '<li><input type="radio" name="subCat" class="subCat" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
   }
   $('#subCategoryLst').html(content);
   $("#subTotal").text(temList.length);
   $("#subCatTotal").removeClass('hideBlock');
   bindSubCategorySelectEvent();
 }
}

function bindSubCategorySelectEvent() {
$(document).on("click", ".subCat", function() {
	var $elm = $(this);
	var selectedValue = this.id.toString();
	var param = {};
   param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
   $.ajax({
     type: "POST",
     url: gethierarchyDetails,
     data: JSON.stringify(param),
     beforeSend: function(){ unLoadPrevSeg($elm,selectedValue); }
   }).done(function(response) {
 	  loadSegment(response,selectedValue);
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
	}).always(function() {
		  stopLoading();
	});
});
}

function loadSegment(temList,selectedValue){
 if (temList.length > 0) {
   var content = '';
   for (var i = 0; i < temList.length; i++) {
     content += '<li><input type="radio" name="hierarchySearch" class="segment" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
   }
   $('#segmentLst').html(content);
   $("#segmentTotalCnt").text(temList.length);
   $("#segmentTotal").removeClass('hideBlock');
   bindSegmentSelectEvent();
 }

}

function unLoadPrevSeg($ele,selectedValue){
	$('#selectedSubCat').text(toTitleCase($ele.next().text()));
 $('.selectedSeg,#segment,#segmentBtn,#catGo,#deptGo').addClass('hideBlock');
 $('.selectedSubCat,#segmentLst,#subCatGo').removeClass('hideBlock');
 $("#segmentTotalCnt,#selectedSeg").text('');
 $("#segmentLst").empty();
 $('#hierarchyID').val(selectedValue);
 $('#hierarchyLVL').val(4);
}

function bindSegmentSelectEvent() {
	  $(document).on("click", ".segment", function() {
	    var selectedValue = this.id.toString();
	      $('#selectedSeg').text(toTitleCase($(this).next().text()));
	      $('.selectedSeg,#segmentBtn').removeClass('hideBlock');
	      $("#subCatGo").addClass('hideBlock');
	      $('#hierarchyID').val(selectedValue);
	      $('#hierarchyLVL').val(5);
	  });
}


/**
 * Date format
 * 
 * @returns {String}
 */
function dateformat() {
	var date = new Date();
	day = date.getDate();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	return (day < 10 ? ("0" + day) : day) + "/"
			+ (month < 10 ? ("0" + month) : month) + "/"
			+ (year < 10 ? ("0" + year) : year);
}
/**
 * Returns today date
 * 
 * @returns {String}
 */
function getTodayDate(format) {
	var todayDate = new Date();
	// todayDate.setDate(todayDate.getDate());
	day = todayDate.getDate();
	month = todayDate.getMonth() + 1;
	year = todayDate.getFullYear();
	if (format == 2) {
		return (month < 10 ? ("0" + month) : month) + "/"
				+ (day < 10 ? ("0" + day) : day) + "/"
				+ (year < 10 ? ("0" + year) : year);
	} else if (format == 1) {
		return (day < 10 ? ("0" + day) : day) + "/"
				+ (month < 10 ? ("0" + month) : month) + "/"
				+ (year < 10 ? ("0" + year) : year);
	}

}
/**
 * Paste date to set date from value
 * 
 * @returns {String}
 */
function dateFromformat() {
	return addDays(1, -6);// Defect_3657Apply a date range- default is 7 days
}
/**
 * Default date for date to
 * 
 * @returns {String}
 */
function dateToformat() {
	return getTodayDate(1);
}
/**
 * ADDS the diff and returns the date
 * 
 * @returns {String}
 */
function addDays(format, diff) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + diff);
	day = todayDate.getDate();
	month = todayDate.getMonth() + 1;
	year = todayDate.getFullYear();
	if (format == 2) {
		return (month < 10 ? ("0" + month) : month) + "/"
				+ (day < 10 ? ("0" + day) : day) + "/"
				+ (year < 10 ? ("0" + year) : year);
	} else if (format == 1) {
		return (day < 10 ? ("0" + day) : day) + "/"
				+ (month < 10 ? ("0" + month) : month) + "/"
				+ (year < 10 ? ("0" + year) : year);
	}

}

function validateDates(dateFrom,dateTo,reportName){
		
	var rtnFlag = true;
		
	if(dateFrom == undefined || dateFrom == '' || dateFrom.length <= 0){
		$.fn.showCustomMsg(['Date From is mandatory.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if(dateTo == undefined || dateTo == '' || dateTo.length <= 0){
		$.fn.showCustomMsg(['Date To is mandatory.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	
	var jDateFromArray = dateFrom.split("/");
	var jDateToArray = dateTo.split("/");
	
	
	if(jDateFromArray.length != 3 || jDateFromArray[0] <= 0 || jDateFromArray[0] > 31 || jDateFromArray[1] <= 0 || jDateFromArray[1] > 12 
			|| jDateFromArray[2] < 0 || jDateFromArray[2] > 9999){
		$.fn.showCustomMsg(['Date From is not valid.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if(jDateToArray.length != 3 || jDateToArray[0] <= 0 || jDateToArray[0] > 31 || jDateToArray[1] <= 0 || jDateToArray[1] > 12 
			|| jDateToArray[2] < 0 || jDateToArray[2] > 9999){
		$.fn.showCustomMsg(['Date To is not valid.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}

	var jDateFrom =  new Date(jDateFromArray[2],jDateFromArray[1]-1,jDateFromArray[0]);
	var jDateTo =  new Date(jDateToArray[2],jDateToArray[1]-1,jDateToArray[0]);	

			
	if(jDateFrom > jDateTo){
		$.fn.showCustomMsg(['From date should be lesser than To date.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if (diff(dateFrom, dateTo) > 6) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Maximum date range should be 7 days.' ], error,reportName);
		return rtnFlag;

	}
	
	return rtnFlag;
}

var getArticleTdclass = function(obj,$td){
	var colClass = '';
	 if(obj.pbd_ind == 'Y'){
		colClass = 'pb right';
	} else if(obj.perpetual_flag == 'Y'){
		colClass = 'pi right';
	}
	$td.addClass(colClass);
};
function toTitleCase(str) {
	  return str.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
}