var printBtnPop = '<div class="tableActionBtns"><label class="actionBtn" id="printReportPopUp"><a><label class="print">Print</label></a></label></div>';
var dateT = new Date();
var report_name = 'Report_Stk_Adj';
var pop_report_name = 'rpt_stk_adj_article';
var choose = '';
var addCriPrint = '';
var adjFor = '';
var StockAdjustmentFullLog = 'AC_SAFL';
$(function() {
	getEncSAPPassword();
	//changed to 45 days
	dateT.setTime(new Date().getTime() - (45 * 24 * 60 * 60 * 1000));
	var mon = '00' + (dateT.getMonth() + 1);
	var dat = '00' + (dateT.getDate());
	dateT = (dat.substr((dat.length - 2), dat.length)) + '/' + (mon.substr((mon.length - 2), mon.length))
			+ '/' + dateT.getFullYear();
	$("#dialog-sohFullLog").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 650,
			width : 900
		});
	$("#dialog-sohFullLog").parent().addClass("popupWrapper");
});

/**
 * Invokes report central service call for the exception scenario when only one
 * article is selected in the criteria
 * 
 * @param recvParam
 */
function callReportSAPService(fromDate, toDate, article) {
	var param = {
		"iv_from_date" : fromDate,
		"iv_site" : $('#posSite').val(),
		"iv_to_date" : toDate,
		"msg" : null,
		"pwd" : encSapPwd,
		"user_id" : $('#loginUserId').val(),
		"iv_article" : article,
		"iv_sales_org" : $('#salesOrg').val()
	};

	console.log(reportStockAdjSAPUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : reportStockAdjSAPUrl,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						responseO = response.d.results;
						if (responseO != undefined && responseO.length > 0
								&& responseO[0].article_no != null && responseO[0].article_no != "") {
							// reframeResponseFromSAP(responseO);
							// $(".ContentTableWrapper").removeClass('hideBlock');
							// $('#accordion').accordion({active : true});
							var $tblhold = $("#fullLogTableHolder");
							loadSAPReportContentTbl(responseO, $tblhold,
									fromDate, toDate);
							$tblhold
									.find(
											'#rpt_stk_adj_article_head_page,#rpt_stk_adj_article_head')
									.addClass('padd-top10');
							toControllerPopup();
							bindPrintPop(true);
							// totalRecords = responseO.length;
							// $("#noRecords").html(totalRecords);// Sets the no
							// of
							// records
							$("#dialog-sohFullLog").dialog('open').attr(
									'article', article);
							bindPopupClick($("#dialog-sohFullLog"));
						} else {
							if (responseO != undefined
									&& (responseO[0].article_no == null
									|| responseO[0].article_no == "")) {
								$.fn.showCustomMsg(
										[ 'Sorry, No records found.' ],
										success, 'Adjustment Log Report');
							} else {
								/*
								 * showReportErrorMsg('Sorry, Some technical
								 * issue occured ', 'Adjustment Log Report');
								 */
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured ' ],
												error, 'Adjustment Log Report');
							}
							stopLoading();
						}
					}).fail(
					function() {
						// showReportErrorMsg('Sorry, Some technical issue
						// occured ', 'Adjustment Log Report');
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured ' ],
								error, 'Adjustment Log Report');
						stopLoading();
					}).always(function() {
				
			});
}
function showFullAdjLog(article) {
	adjFor = 'SOH'
	if ($("#dialog-sohFullLog").attr('article') == article) {
		$("#dialog-sohFullLog").dialog('open').attr('article', article);
		bindPopupClick($("#dialog-sohFullLog"));
	} else {
		var loggedInUserId = $('#loginUserId').val();	
		if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
				&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
			callReportSAPService(dateT, dateformat(), article);
		}else{
			getEncSAPPassword({option:'sohFullLog', dateT:dateT, dateformat:dateformat(), article:article});			
		}
		
	}
}
function bindPopupClick(dg){
	dg.parent().find('.submitButton,.closePopUp').click(function(){
		toController();
	});
}
/**
 * Binds generate report click event
 * 
 * @param response
 */
function toController(){
	var reportResultArray = [];
	reportResultArray = $('#' + report_name + '_table').data(
			'confObj').content;
	callStockAdjJasperPrint(reportResultArray, 'normal');
}
function callStockAdjJasperPrint(reportResultArray, src) {
	var dept = '';
	var article = '';
	var deptOrArticle = '';
	var deptArrayDesc = new Array();
	var deptArray = new Array();
	
	if (choose == "depHier") {// Departments
		dept = "true";
		deptOrArticle = "Y";
		if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){//If all dep selected
			deptArray[0] = "ALL";
		}else{
			$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
				deptArray[deptArray.length] = $(this).val();
			});
		}
	} else if (choose == "artList") {// Specified Articles
		deptOrArticle = articleBasicList.join();
	}
	if(deptArray[0] != "ALL"){
		deptArray = new Array();
		$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
			deptArray[deptArray.length] = $(this).parent().find(".dropdownLabel").html();
			deptArrayDesc[deptArrayDesc.length] = $(this).parent().find(".dropdownLabel").html();
		});
	}
	else
		{
		deptArrayDesc[0] = "ALL";
		}
	/*
	 * var resultMPLFacingArray = []; if(adjFor == "M"){ resultMPLFacingArray =
	 * responseMS; }else if(adjFor == "F"){ resultMPLFacingArray = responseF; }
	 */
	var groupBy = "";
	if ($('#' + (src == 'print' ? pop_report_name : report_name) + '_table')
			.data('confObj').applyGroup) {
		groupBy = $('#' + report_name + '_table').data('confObj').cur_gru_col;
		if (groupBy == "article_no" || groupBy == "article") {
			groupBy = "A";
		} else if (groupBy == "reason_desc" || groupBy == "reason_code_name") {
			groupBy = "R";
		} else if (groupBy == "user_name" || groupBy == "changed_by_name") {
			groupBy = "U";
		} else if (groupBy == "adj_date" || groupBy == "date"
				|| groupBy == "date_time_sap") {
			groupBy = "D";
		}
		reportResultArray = $('#Report_Stk_Adj_table').data('confObj').groupedCont;
		securityMatrix();
	}
	var obj = {};
	if (src == 'print') {
		obj = {
			reportResult : reportResultArray,
			reportResultMPLFacings : reportResultArray,
			StoreNo : $('#posSite').val(),
			StoreName : $('#posSiteName').val(),
			totalCount : reportResultArray.length,
			fromDate : dateT,
			toDate : dateformat(),
			deptOrArticle :deptOrArticle,
			dept : deptArrayDesc.join(),
			article : reportResultArray[0].article_no + ' - '
					+ reportResultArray[0].article_desc,
			reason : '',
			users : '',
			addCriteria : addCriPrint,
			groupBy : groupBy,
			userName : '',
			date : "",
			adjFor : adjFor,
			src : 'print'
		};
	} else {
		obj = {
			reportResult : reportResultArray,
			reportResultMPLFacings : reportResultArray,
			StoreNo : $('#posSite').val(),
			StoreName : $('#posSiteName').val(),
			totalCount : reportResultArray.length,
			fromDate : dateFrom,
			toDate : dateTo,
			deptOrArticle : deptOrArticle,
			dept : deptArrayDesc.join(),
			article : reportResultArray[0].article_no + ' - '
			+ reportResultArray[0].article_desc,
			reason : ((reasonArray.length == $('.reasonDropDwn li').length - 2) ? 'ALL' : reasonDescArray.join(",")),
			users : ((userArray.length == $('.userDropDwn li').length - 2) ? 'ALL' : userDescArray.join(",")),
			addCriteria : addCriPrint,
			groupBy : groupBy,
			userName : $("#ui-id-1").val(),
			date : "",
			adjFor : adjFor,
			src : 'normal'
		};
	}

	// console.log(JSON.stringify(obj));
	$.ajax({
		url : "../stockAdjReport/printStockAdjReportPDF.htm",
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(obj),
		cache : false, // This will force requested pages not to be cached by
						// the browser
		processData : false, // To avoid making query String instead of JSON
		beforeSend : function() {
			startLoading();
		},
		success : function(response, textStatus) {
			// console.log(response.data);
			if (response.data == 'success') {
				/*$('#stockAdjReportForm').attr("action",
						"downloadStockAdjReportPdf.pdf");
				$('#stockAdjReportForm').attr('target', '_blank');
				$('#stockAdjReportForm').attr('method', 'get');
				$('#stockAdjReportForm').submit();*/
//				stopLoading();
			}
			// console.log("success");
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log('request failed' + errorThrown);
		},complete:function(){
			stopLoading();
		}
	});

}
function bindPrintPop(sapCallFlag) {
	$('#printReportPopUp').remove();
	$(printBtnPop).insertBefore(
			$('#rpt_stk_adj_article_head').find('.tableTitle'));
	$("#printReportPopUp").unbind('click');
	$("#printReportPopUp").on(
			'click',
			function() {
				/*var reportResultArray = [];
				reportResultArray = $('#' + pop_report_name + '_table').data(
						'confObj').content;
				callStockAdjJasperPrint(reportResultArray, 'print');*/
				$('#stockAdjReportForm').attr("action",
				"../stockAdjReport/downloadStockAdjReportPdf.pdf");
				$('#stockAdjReportForm').attr('target', '_blank');
				$('#stockAdjReportForm').attr('method', 'get');
				$('#stockAdjReportForm').submit();
			});
}

/**
 * Sets the area & table for report generation
 * 
 * @param data
 * @param $tblhold
 */
function loadSAPReportContentTbl(data, $tblhold, dateF, dateT) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;
	var title = 'Article ' + data[0].article_no + ' - ' + data[0].article_desc
			+ ' for duration ' + dateF + ' - ' + dateT;
	var confObj = (new tblReportSTkAdjSAP(data, title));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toControllerPopup();
	});
	$tblhold.find('.groupbyColumns').click(function(){
		startLoading();
		setTimeout(toControllerPopup,100);
	});
}

/**
 * Configuration to generate table
 * 
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportSTkAdjSAP(data, title) {
	this.option = 'build';
	//Release 17.08 - Hiding old, new SOH in SOH Full Log Popup
	this.key = [ 'reason_code_desc', 'date_time_sap', 'user_name', /*'oldSOH',*/
			'adjustment_qty_new', /*'end_soh'*/];
	this.table_name = pop_report_name;
	this.table_title = title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {
		article_no : 'Article </br> Number',
		article_desc : 'Article </br> Description',
		user_name : 'User/System',
		oldSOH : 'Prev </br> SOH',
		std_sell_price : 'Std. Sell </br> Price ($)',
		adjustment_value : 'Stock </br> Value </br> Adjusted ($)',
		end_soh : 'New </br> SOH',
		mvmt_type_desc : 'Additional Info'
	}, this.header_data_type = {
		article_no : 'char',
		article_desc : 'char',
		reason_code_desc : 'char',
		date_time_sap : 'date',
		user_name : 'char',
		oldSOH : 'number',
		adjustment_qty_new : 'number',
		end_soh : 'number',		
		std_sell_price : 'number',
		adjustment_value : 'number',
		mvmt_type_desc : 'char'
	}, this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		reason_code_desc : 'main',
		date_time_sap : 'main',
		user_name : 'main',
		oldSOH : 'main',		
		adjustment_qty_new : 'main',
		end_soh : 'main',
		std_sell_price : 'main',
		adjustment_value : 'main',
		mvmt_type_desc : 'main'
	}, this.header_class = {
		article_no : '',
		article_desc : '',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : 'centerValue',
		oldSOH : 'centerValue',		
		adjustment_qty_new : 'centerValue',
		end_soh : 'centerValue',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.header_title = {}, this.header_width = {
		article_no : '',
		article_desc : '',
		reason_code_desc : '',
		date_time_sap : '17%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		end_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	}, this.content_class = {
		article_no : '',
		article_desc : '',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : 'centerValue',
		oldSOH : '',		
		adjustment_qty_new : 'centerValue',
		end_soh : '',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.content_title = {}, this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		reason_code_desc : 'removeNull',
		date_time_sap : '',
		user_name : 'removeNull',
		oldSOH : 'removeNull',		
		adjustment_qty_new : 'removeNull',
		end_soh : 'removeNull',
		std_sell_price : 'removeNull',
		adjustment_value : 'removeNull',
		mvmt_type_desc : 'removeNull'
	}, this.content_width = {
		article_no : '',
		article_desc : '',
		reason_code_desc : '',
		date_time_sap : '17%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		end_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	};
	this.header_td_label = {
		date_time_sap : 'Date & Time (AEST)',
		reason_code_desc : 'Reason Code & </br> Description',
		adjustment_qty_new : 'Qty. </br> Adjusted',
		oldSOH : 'Prev </br> SOH'
	};
	this.content = data;
	this.pagination = true;
	this.groupby = false;
	this.groupbyColumn = {
		'article_no' : 'Article',
		'reason_code_name' : 'Reason Code',
		'user_name' : 'Users',
		'date_time_sap' : 'Date'
	};
	this.group_cont_function = {
		article_no : getArticleGrpCont,
		reason_code_name : getReasonCodeGrpCont,
		user_name : getUserGrpCont,
		date_time_sap : getAdjDateGrpCont
	};
	this.cont_data_function = {
		user_name : showUserName, 
		oldSOH : showOldSOH,
		date_time_sap : showAdjDateTime,
		reason_code_desc : showReasonDescSAPCall,
		end_soh : showEnd_soh,
		adjustment_qty_new : showAdjustment_qty
	};
	this.cont_sort_function = {
		oldSOH : getOldSOH,
		date_time_sap : getAdjDateTime,
		reason_code_desc : getReasonDesc,
		adjustment_qty_new : getAdjustment_qty
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
		article_no : getTotalStcokAdjValueByArticle,
		reason_code_desc : getTotalStcokAdjValueByReasonSAP,
		user_name : getTotalStcokAdjValueByUser,
		date_time_sap : getTotalStcokAdjValueByDateSAP
	};
	this.default_groupbyColumn = [ 'article_no' ];
}
var showUserName = function(obj){
	if(obj.user_id != '' && obj.user_id != undefined){
		return obj.user_name+"("+obj.user_id+")"; // defect no 9624
	}else{
		return obj.user_name;
	}
};
var showEnd_soh = function(obj)
{
	return Number(obj.end_soh).toFixed(2);// defect no 7289
};
function toControllerPopup(){
	var reportResultArray = [];
	reportResultArray = $('#' + pop_report_name + '_table').data(
			'confObj').content;
	callStockAdjJasperPrint(reportResultArray, 'print');
}

/**
 * Group by article content
 */
var getArticleGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.article_no || '')
				+ '<span class="rowActions tooltip" title="Access complete adjusment log for this article."><label onclick="showFullAdjLog(\''
				+ (obj.article_no || '')
				+ '\')" class="'+StockAdjustmentFullLog+' history"><a>Full Log</a></label></span></td></tr>';
	}
	return cont;
};

/**
 * Group by reason content
 */
var getReasonDescGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.reason_desc || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Group by date content
 */
var getDateGrpCont = function(obj, confObj) {
	var date = obj.adj_date;
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'

				+ (date.substring(6, 8) + "/" + date.substring(4, 6) + "/"
						+ date.substring(0, 4) || '') + '</td></tr>';

	}
	return cont;
};

/**
 * Group by user content
 */
var getUserGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.user_name || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Group by reason content
 */
var getReasonCodeGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.reason_code_name || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Group by date content
 */
var getAdjDateGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.date_time_sap || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Group by date content
 */
var showAdjDateTime = function(obj) {
	var dateTime = '';

	if (obj.adjustment_date != undefined && obj.adjustment_date != '') {// dd.mm.yyyy
		var dateArray = obj.adjustment_date.split(".");
		dateTime = dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];
	}

	if (obj.adjustment_time != undefined && obj.adjustment_time != '') {
		dateTime = dateTime + ' ' + obj.adjustment_time;
	}
	obj.date_time_sap = dateTime;

	return obj.date_time_sap;
};
var showReasonDescSAPCall = function(obj) {
	return ((obj.store_reason_code_long_desc||'') !='' ? obj.store_reason_code_long_desc : obj.mvmt_type_desc)
				+ ((obj.store_reason_code||'')!= '' ? ((obj.store_reason_code || '') != '' && (obj.store_reason_code || '') != '0' ? "(" +obj.store_reason_code+ ")" : '') : ((obj.mvmt_type || '') != '' && (obj.mvmt_type || '') != '0' ? "(" + obj.mvmt_type + ")" : ''));
		
};
var showOldSOH = function(obj) {
	if (obj.end_soh != undefined && obj.adjustment_qty != undefined && obj.shkzg != undefined) {
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'S' )
		obj.oldSOH = Number(obj.end_soh) - Number(obj.adjustment_qty);
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'H' )
			obj.oldSOH = Number(obj.end_soh) + Number(obj.adjustment_qty);	
	} else {
		obj.oldSOH = '';
	}
	return Number(obj.oldSOH).toFixed(2);// defect no 7289
};

var showAdjustment_qty = function(obj)
{
	if (obj.adjustment_qty != undefined && obj.adjustment_qty != null && obj.adjustment_qty != '') {
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'S' ){
			obj.adjustment_qty_new = Math.abs(obj.adjustment_qty);
			return '+'+Number(obj.adjustment_qty).toFixed(2);
		}if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'H' ){
			obj.adjustment_qty_new = -Math.abs(obj.adjustment_qty);
			obj.adjustment_qty = Math.abs(obj.adjustment_qty);
			return '-'+Number(obj.adjustment_qty).toFixed(2);
		}
		
		return Number(obj.adjustment_qty).toFixed(2);
	} 
};

var getAdjDateTime = function() {
	return 'date_time_sap';
};
var getReasonDesc = function() {
	return 'mvmt_type_desc';
};
var getOldSOH = function() {
	return 'oldSOH';
};
var getAdjustment_qty = function()
{
	return 'adjustment_qty_new';
};
var getTotalStcokAdjValueByArticle = function(obj, confObj) {
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
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
var getTotalStcokAdjValueByReason = function(obj, confObj) {
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
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
var getTotalStcokAdjValueByReasonSAP = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
var getTotalStcokAdjValueByUser = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
var getTotalStcokAdjValueByDate = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	//console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
var getTotalStcokAdjValueByDateSAP = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};