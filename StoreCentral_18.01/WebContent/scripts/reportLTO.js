var ltoType = '';
var groupByDep = false;
$(function() {

	// harish

	bindEnterSpecKeyEvent();

	// Code for accordion
	$("#accordion").accordion({
		header : "h3",
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

	$("#dialog-selectArticle").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 700
	});

	// Code for calndar control
	$(".inputDate").datepicker({
		zIndex : 50
	});

	// Close Button
	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});
	});

	$("#backBtn").click(function(e) {
		window.location.href = "../login/homepage.htm";
	});

	$('input[type=radio][name=overrideOptions]').change(function() {
		if (this.value == 'LTOcount') {
			$("#groupById").removeClass("hideBlock");
		} else if (this.value == 'LTOaudit') {
			$("#groupById").removeClass("hideBlock");
		} else if (this.value == 'LTOlogs') {
			$("#groupById").addClass("hideBlock");
		}
		setDefaultValues();
	});

	$("#generateReport").click(function() {
		$(".reportContent").addClass('hideBlock');
		if ($("#searchBaiscBox").val().length > 0) {
			callArticleBasicSearchService($("#searchBaiscBox").val(),true);			
		}else{
			if (isValidateLTODetials()) {
				buildReqParam();
				callReportService();
			}
		}		
	});

	createAutoSuggestChange($('.reportWrapper').find('#searchBaiscBox'));
	$("#searchBaiscBox").val('');
	setDefaultValues();
});
function setDefaultValues() {
	$("#from,#to").val(currDate()).trigger('change');
	$("#searchBox").val('');
	$('#invoice').prop("checked", true);
}
/**
 * auto suggestion for articles text box
 * 
 * @param elem
 * @param elemToBeTriggered
 * @param maxAutoListSize
 */
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
													if (data != '' ) {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			
																			if (item.article_no !=undefined || item.article_desc !=undefined){
																			return {
																				value : item.article_no
																						+ '-'
																						+ item.article_desc,
																				text : item.article_no
																						+ '-'
																						+ item.article_desc
																			};}
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
										'LTO Report');
							} else {
								
								/*
								 * articleStdSellPriceMap[response[0].article_no]=response[0].standard_sell_price;
								 * articleAndDescMap[response[0].article_no]=response[0].article_desc;
								 */

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
							/*
							 * if ($(".parameterOptionsListBlock") .find( "#" +
							 * ui.item.text.toString() .split('-')[0]).length >
							 * 0) { $.fn.showCustomMsg(['Article added
							 * already.'],error,'LTO Report'); } else {
							 * $(".parameterOptionsListBlock") .append( '<li><label
							 * class="articleLabel" id="' + ui.item.text
							 * .toString() .split('-')[0] + '">' + ui.item.text
							 * .toString() + '</label><label
							 * class="closeMessage"
							 * onclick="$(this).parent().remove()">&nbsp;</label></li>'); }
							 * $(':hidden[id=hdnmedicineid]').val(
							 * ui.item.text.toString());
							 * $(':hidden[id=hdnmedicinenm]').val(
							 * ui.item.value.toString()); if (elemToBeTriggered !=
							 * undefined) { setTimeout(function() {
							 * $(elemToBeTriggered).trigger('click'); }, 10); }
							 */
							
						},
						minLength : 2,
						autoFocus : true
					});
	$("#searchBaiscBox").val('');
}
/**
 * Sets the request parameters
 */
function buildReqParam() {
	ltoType = $("input:radio[name=overrideOptions]:checked").val();
	groupByDep = $('#invoice').is(":checked");
	var reportType = '';
	if (ltoType == "LTOcount") {
		reportType = "count";
	} else if (ltoType == "LTOaudit") {
		reportType = "audit";
	} else if (ltoType == "LTOlogs") {
		reportType = "log";
	}
	// var article = $("#searchBox").val().split('-')[0];
	var fromDateArray = '';
	var toDateArray = '';
	var fromDate = '';
	var toDate = '';

	if ($("#from").val() != undefined && $("#from").val() != '') {
		fromDateArray = $("#from").val().split("/");
		fromDate = fromDateArray[2] + "-" + fromDateArray[1] + "-"
				+ fromDateArray[0];
	}
	if ($("#to").val() != undefined && $("#to").val() != '') {
		toDateArray = $("#to").val().split("/");
		toDate = toDateArray[2] + "-" + toDateArray[1] + "-" + toDateArray[0];
	}

	if (fromDate == '' && toDate == '') {
		$(".dateText").html(getTodayDate(1));

	} else {
		$(".dateText").html($("#from").val() + " - " + $("#to").val());// Sets
		// date
		// in
		// the
		// label
	}
	var articleBasicList = new Array();
	$("#searchBaiscBoxList").find(".articleBasicLabel").each(function(){
		articleBasicList.push($(this).text().split('-')[0]);
	});
	
	requestParam = {
		"iv_session_id" : "",
		"iv_sales_org" : "",
		"iv_site_no" : $("#posSite").val(),
		"iv_report_type" : reportType,
		"iv_dept_id" : "",
		"iv_from_date" : fromDate,
		"iv_to_date" : toDate,
		"iv_loc_id" : "",
		"iv_article_no" : articleBasicList.join(','),
		"iv_dept_grp" : groupByDep ? "Y" : "N"

	};
	// console.log(requestParam);
}
/**
 * Invokes gap scan report service
 * 
 * @param recvParam
 */
function callReportService() {
	console.log(reportLTOUrl + ' ' + JSON.stringify(requestParam));
	$
			.ajax({
				type : "POST",
				url : reportLTOUrl,
				data : JSON.stringify(requestParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));

						if (ltoType == "LTOcount") {
							if (response.lto_count_report != undefined
									&& response.lto_count_report.length > 0
									&& response.lto_count_report[0].location_id != undefined) {
								var $tblhold = $("#reportContentCount");
								loadReportContentTbl(response.lto_count_report,
										$tblhold);
								totalRecords = response.lto_count_report.length;
								$("#noRecords").html(totalRecords);// Sets the
								// no of
								// records

								$(".group_cont_table ").addClass("hideBlock");// Hide
								// Group
								// By
								// option
								// aftr
								// grouping
								$(".groupByClear").parent().parent().addClass(
										"hideBlock");// Clear By
								$("#" + ltoType).removeClass('hideBlock'); // To
								// show
								// the
								// table
								$('#accordion').accordion({
									active : true
								});
							} else {
								if (response != undefined
										&& response.length <= 0) {
									$.fn.showCustomMsg(
											[ 'Sorry, No records found.' ],
											success, 'LTO Report');
								} else {
									$.fn
											.showCustomMsg(
													[ 'Sorry, Some technical issue Occurred.' ],
													error, 'LTO Report');
								}
							}
						} else if (ltoType == "LTOaudit") {
							if (response.lto_audit_report != undefined
									&& response.lto_audit_report.length > 0
									&& response.lto_audit_report[0].uom != undefined) {
								var $tblhold = $("#reportContentAudit");
															
								loadReportContentTbl(response.lto_audit_report,
										$tblhold);
								totalRecords = response.lto_audit_report.length;
								$("#noRecords").html(totalRecords);// Sets the
								// no of
								// records

								$(".group_cont_table ").addClass("hideBlock");// Hide
								// Group
								// By
								// option
								// aftr
								// grouping
								$(".groupByClear").parent().parent().addClass(
										"hideBlock");// Clear By
								$("#" + ltoType).removeClass('hideBlock'); // To
								// show
								// the
								// table
								$('#accordion').accordion({
									active : true
								});
							} else {
								if (response != undefined
										&& response.length <= 0) {
									$.fn.showCustomMsg(
											[ 'Sorry, No records found.' ],
											success, 'LTO Report');
								} else {
									$.fn
											.showCustomMsg(
													[ 'Sorry, Some technical issue Occurred.' ],
													error, 'LTO Report');
								}
							}
						} else if (ltoType == "LTOlogs") {
							if (response.lto_log_report != undefined
									&& response.lto_log_report.length > 0
									&& response.lto_log_report[0].article_no != undefined) {
								var $tblhold = $("#reportContentLogs");
								loadReportContentTbl(response.lto_log_report,
										$tblhold);
								totalRecords = response.lto_log_report.length;
								$("#noRecords").html(totalRecords);// Sets the
								// no of
								// records

								$(".group_cont_table ").addClass("hideBlock");// Hide
								// Group
								// By
								// option
								// aftr
								// grouping
								$(".groupByClear").parent().parent().addClass(
										"hideBlock");// Clear By
								$("#" + ltoType).removeClass('hideBlock'); // To
								// show
								// the
								// table
								$('#accordion').accordion({
									active : true
								});
							} else {
								if (response != undefined
										&& response.length <= 0) {
									$.fn.showCustomMsg(
											[ 'Sorry, No records found.' ],
											success, 'LTO Report');
								} else {
									$.fn
											.showCustomMsg(
													[ 'Sorry, Some technical issue Occurred.' ],
													error, 'LTO Report');
								}
							}
						}

					}).fail(
					function() {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue Occurred.' ],
								error, 'LTO Report');
					}).always(function() {
				stopLoading();
			});
}
/**
 * Sets report content area and the content
 */
function loadReportContentTbl(response, $tblhold) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = '';
	if (ltoType == "LTOcount") {
		confObj = (new tblReportCount(response));
	} else if (ltoType == "LTOaudit") {
		confObj = (new tblReportAudit(response));
	} else if (ltoType == "LTOlogs") {
		confObj = (new tblReportLog(response));
	}
	$tblhold.loadtbl(confObj);
}

/**
 * Configuration for generation of table in the page LTO Count
 * 
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReportCount(data) {
	this.option = 'build';
	this.key = [ 'location_name', 'tot_articles', 'tot_cartons',
			'tot_wgt_articles', 'tot_rdmwgt_articles', 'tot_eaches', 'tot_mpk' ];
	this.table_name = 'LTO_Count';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {
		location_name : 'Location',
		tot_articles : 'Total Articles',
		tot_cartons : 'Total Full Cartons',
		tot_wgt_articles : 'Total Weighted Articles',
		tot_rdmwgt_articles : 'Total Random Weight',
		tot_eaches : 'Total Each',
		tot_mpk : 'Total MPK'
	};
	this.header_data_type = {
		location_name : 'char',
		tot_articles : 'number',
		tot_cartons : 'number',
		tot_wgt_articles : 'number',
		tot_rdmwgt_articles : 'number',
		tot_eaches : 'number',
		tot_mpk : 'number'
	};
	this.header_row_type = {
		location_name : 'main',
		tot_articles : 'main',
		tot_cartons : 'main',
		tot_wgt_articles : 'main',
		tot_rdmwgt_articles : 'main',
		tot_eaches : 'main',
		tot_mpk : 'main'
	};
	this.header_class = {
		location_name : 'leftValue',
		tot_articles : 'centerValue',
		tot_cartons : 'centerValue',
		tot_wgt_articles : 'centerValue',
		tot_rdmwgt_articles : 'centerValue',
		tot_eaches : 'centerValue',
		tot_mpk : 'centerValue'
	};
	this.header_width = {
		location_name : '15%',
		tot_articles : '10%',
		tot_cartons : '10%',
		tot_wgt_articles : '10%',
		tot_rdmwgt_articles : '10%',
		tot_eaches : '10%',
		tot_mpk : '10%'
	};
	this.content_class = {
		location_name : 'leftValue',
		tot_articles : 'centerValue',
		tot_cartons : 'centerValue',
		tot_wgt_articles : 'centerValue',
		tot_rdmwgt_articles : 'centerValue',
		tot_eaches : 'centerValue',
		tot_mpk : 'centerValue'
	};
	this.content_format = {
		location_name : 'removeNull',
		tot_articles : 'removeNull',
		tot_cartons : 'removeNull',
		tot_wgt_articles : 'removeNull',
		tot_rdmwgt_articles : 'removeNull',
		tot_eaches : 'removeNull',
		tot_mpk : 'removeNull'
	};
	this.content_width = {
		location_name : '15%',
		tot_articles : '10%',
		tot_cartons : '10%',
		tot_wgt_articles : '10%',
		tot_rdmwgt_articles : '10%',
		tot_eaches : '10%',
		tot_mpk : '10%'
	};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.groupby = true;
	this.content = data;
	this.pagination = true;
	if (groupByDep) {
		this.default_groupbyColumn = [ 'dept_name' ];
		this.groupbyColumn = {
			'dept_name' : 'dept_name'
		};
		this.group_cont_function = {
			dept_name : getLTOCountDeptGrpName
		};
	}
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
}
var getLTOCountDeptGrpName = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.dept_name || '') + '</td></tr>';
	}
	return cont;
};
/**
 * Configuration for generation of table in the page LTO Audit
 * 
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReportAudit(data) {
	this.option = 'build';
	this.key = [ 'article_no', 'article_desc', 'uom', 'om', 'shelf_capacity',
			'lto_qty', 'audit_qty', 'difference' ];
	this.table_name = 'LTO_Audit';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {
		article_no : 'Article#',
		article_desc : 'Description',
		uom : 'UOM',
		om : 'OM',
		shelf_capacity : 'Shelf Capacity',
		lto_qty : 'LTO Qty.',
		audit_qty : 'Audit Qty.',
		difference : 'Difference'
	};
	this.header_data_type = {
		article_no : 'number',
		article_desc : 'char',
		uom : 'char',
		om : 'number',
		shelf_capacity : 'number',
		lto_qty : 'number',
		audit_qty : 'number',
		difference : 'number'
	};
	this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		uom : 'main',
		om : 'main',
		shelf_capacity : 'main',
		lto_qty : 'main',
		audit_qty : 'main',
		difference : 'main'
	};
	this.header_class = {
		article_no : '',
		article_desc : '',
		uom : ' centerValue ',
		om : ' centerValue ',
		shelf_capacity : ' centerValue ',
		lto_qty : ' centerValue ',
		audit_qty : ' centerValue ',
		difference : ' centerValue '
	};
	this.header_width = {
		article_no : '7%',
		article_desc : '15%',
		uom : '7%',
		om : '7%',
		shelf_capacity : '7%',
		lto_qty : '7%',
		audit_qty : '7%',
		difference : '7%'
	};
	this.content_class = {
		article_no : '',
		article_desc : '',
		uom : ' centerValue ',
		om : ' centerValue ',
		shelf_capacity : ' cneterValue',
		lto_qty : ' rightValue ',
		audit_qty : ' rightValue ',
		difference : ' centerValue valueInfo '
	};
	this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		uom : 'removeNull',
		om : 'removeNull',
		shelf_capacity : 'removeNull',
		lto_qty : 'removeNull',
		audit_qty : 'removeNull',
		difference : 'removeNull'
	};
	this.content_width = {
		article_no : '',
		article_desc : '',
		uom : '',
		om : '',
		shelf_capacity : '',
		lto_qty : '',
		audit_qty : '',
		difference : ''
	};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.groupby = true;
	if (groupByDep) {
		this.default_groupbyColumn = [ 'department_name' ];
		this.groupbyColumn = {
			'department_name' : 'department_name'
		};
		this.group_cont_function = {
			department_name : getDeptGrpName
		};
	}
	this.content = data;
	this.cont_data_function = {
		difference :showDifference,
		uom: showUOM,
		audit_qty : showAuditQty,
		lto_qty : showLtoQty
	};
	this.cont_sort_function = {
		difference : getDifference
	};
	this.pagination = true;
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
}
/**
 * Group by Department content
 */
var getDeptGrpName = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.department_name || '') + '</td></tr>';
	}
	return cont;
};
var showDifference = function(obj) {
	var classes;
	if (obj.lto_qty < obj.audit_qty) {
		classes = " valueUp ";
	} else if (obj.lto_qty > obj.audit_qty) {
		classes = " valueDown ";
	}	
	var inpu = '<label class="' + classes + '">' +(obj.difference != null && obj.difference != undefined && obj.difference.toString().indexOf('.')!=-1? 
			parseFloat(obj.difference).toFixed(3) : (obj.difference || ''))  + '</label>';
	return (inpu);
};

var showUOM = function(obj) {
	
	var inpu='';
	if (obj.random_weight_flg == "Y") {
		inpu = '<label>' + obj.pi_uom + '</label>';
	} else {
		inpu = '<label>' + obj.uom + '</label>';
	}
	
	
	return (inpu);
};

var showAuditQty = function(obj) {	
	var inpu = '<label>' +( obj.audit_qty != null && obj.audit_qty != undefined && obj.audit_qty.toString().indexOf('.')!=-1? 
			parseFloat(obj.audit_qty).toFixed(3) : (obj.audit_qty || ''))  + '</label>';
	return (inpu);
};
var showLtoQty = function(obj) {	
	var input = '<label>' +( obj.lto_qty != null && obj.lto_qty != undefined && obj.lto_qty.toString().indexOf('.')!=-1? 
			parseFloat(obj.lto_qty).toFixed(3) : (obj.lto_qty || ''))  + '</label>';
	return (input);
};
/**
 * Sets the data by which sorting has to be done.
 */
var getDifference = function() {
	return 'difference';
};
/**
 * Configuration for generation of table in the page LTO Logs
 * 
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReportLog(data) {
	this.option = 'build';
	this.key = [ 'article_no', 'article_desc', 'action', 'action_qty', 'uom',
			'userid', 'username', 'modified_on' ];
	this.table_name = 'LTO_Logs';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {
		article_no : 'Article#',
		article_desc : 'Description',
		action : 'Activity',
		action_qty : 'Qty.',
		uom : 'UOM',
		userid : 'User ID',
		username : 'User Name',
		modified_on : 'Modifled On'
	};
	this.header_data_type = {
		article_no : 'number',
		article_desc : 'char',
		action : 'char',
		action_qty : 'number',
		uom : 'char',
		userid : 'number',
		username : 'char',
		modified_on : 'number'
	};
	this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		action : 'main',
		action_qty : 'main',
		uom : 'main',
		userid : 'main',
		username : 'main',
		modified_on : 'main'
	};
	this.header_class = {
		article_no : '',
		article_desc : '',
		action : ' centerValue ',
		action_qty : '',
		uom : '',
		userid : '',
		username : '',
		modified_on : ''
	};
	this.header_width = {
		article_no : '7%',
		article_desc : '15%',
		action : '7%',
		action_qty : '7%',
		userid : '7%',
		uom : '7%',
		uom : '5%',
		username : '10%',
		modified_on : '8%'
	};
	this.content_class = {
		article_no : '',
		article_desc : '',
		action : ' centerValue ',
		action_qty : '',
		userid : '',
		username : '',
		modified_on : ''
	};
	this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		action : 'removeNull',
		action_qty : 'removeNull',
		uom : 'removeNull',
		userid : 'removeNull',
		username : 'removeNull',
		modified_on : 'removeNull'
	};
	this.content_width = {
		article_no : '',
		article_desc : '',
		action : '',
		action_qty : '',
		uom : '',
		userid : '',
		username : '',
		modified_on : ''
	};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.groupby = true;
	this.default_groupbyColumn = [ 'location_name' ];
	this.groupbyColumn = {
		'location_name' : 'location_name'
	};
	this.group_cont_function = {
		location_name : getLocGrpName
	};
	this.content = data;
	this.cont_data_function = {
		action : showActivity,
		uom : showUOM,
		action_qty : showQty
	};
	this.cont_sort_function = {
		action : getActivity
	};
	this.pagination = true;
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
}
/**
 * Group by Location
 */
var getLocGrpName = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.location_name || '') + '</td></tr>';
	}
	return cont;
};
var showQty=function(obj){
	if(obj.uom=="KG" || obj.uom=="L" ){
		obj.action_qty = (obj.action_qty !=null ? Number(obj.action_qty).toFixed(3): "");
	}else{
		obj.action_qty = (obj.action_qty !=null ? obj.action_qty : "");
	}
	return obj.action_qty;
}

/**
 * Customizes the Activity display
 */
var showActivity = function(obj) {
	var classes;
	if (obj.action == "CHECKIN") {
		classes = " success ";
	} else if (obj.action == "CHECKOUT") {
		classes = " deactive ";
	}
	var inpu = '<label class="' + classes + '">' + obj.action + '</label>';
	return (inpu);
};
/**
 * Sets the data by which sorting has to be done.
 */
var getActivity = function() {
	return 'action';
};

/**
 * Binds print click event
 */
function bindPrint() {
	$("#printReport")
			.click(
					function() {

						frameReport();
						// document
						var a = window.open();
						$("#printDataForReport").show();
						a.document
								.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
						a.document
								.write(document
										.getElementById('printDataForReport').innerHTML);

						$("#printDataForReport").hide();
						a.focus();
						// call print
						$(a).ready(function() {
							// a.close();
							setTimeout(function() {
								$(document).unbind('click');
								doc = a;
								$(document).click(function() {
									doc.close();
									doc = '';
								});
								a.print();
							}, 1000);
							return true;
						});
					});
}
function isValidateLTODetials() {
	var rtnFlag = true;
	if(!$('#from').required()){
   		$.fn.showCustomMsg(['Please select from date.'],error);
   		rtnFlag = false;
	}else if(!$('#to').required()){
		$.fn.showCustomMsg(['Please select to date.'],error);
		rtnFlag = false;
	}
	if ($("#from").val() != '' && compareDate(getDesiredPastDate(29),$('#from').val()) != 'lt') {
		$.fn
		.showCustomMsg(
				[ 'Date From should be today\'s date or within past 28 days.' ],
				error, 'LTO Report');
		rtnFlag = false;
	}
	if ($("#to").val() != '' && validateDate($("#to").val(), "LTO Report")) {
		/*var todayDate = new Date();
		var enteredDateArray = $("#to").val().split("/");// dd/mm/yyyy
		var enteredDate = new Date(enteredDateArray[2] + "-"
				+ enteredDateArray[1] + "-" + enteredDateArray[0]);// YYYY-MM-DD
*/		if (compareDate($("#to").val(), getDesiredFutureDate(0)) == 'gt')  {
			rtnFlag = false;
			$.fn.showCustomMsg([ 'Date To cannot be a future date.' ], error,
					'LTO Report');
		}
	}
	if ($("#from").val() != '' && $("#to").val() != '' && rtnFlag) {
		if (!validateDates($("#from").val(), $("#to").val(), 'LTO Report')) {
			rtnFlag = false;
		}
	}

	return rtnFlag;
}
function iswithin28DaysFromToday(enteredDateString) {
	var rtnFlag = true;
	if (validateDate(enteredDateString, "LTO Report")) {
		var todayDate = new Date();
		var datebefore28Days = new Date();
		datebefore28Days.setDate(todayDate.getDate() - 29);
		var enteredDateArray = enteredDateString.split("/");// dd/mm/yyyy
		var enteredDate = new Date(enteredDateArray[2] + "-"
				+ enteredDateArray[1] + "-" + enteredDateArray[0]);// YYYY-MM-DD
		if (!(datebefore28Days <= enteredDate && enteredDate <= todayDate)) {
			rtnFlag = false;
			$.fn
					.showCustomMsg(
							[ 'Date From should be today\'s date or within past 28 days.' ],
							error, 'LTO Report');
		}
	} else {
		rtnFlag = false;
	}

	return rtnFlag;
}
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

function bindEnterSpecKeyEvent() {
	$('#accordion').find('#searchBaiscBox').keypress(function(event) {
		if (event.which == 13) {
			if ($("#searchBaiscBox").val().length > 0) {
				callArticleBasicSearchService($("#searchBaiscBox").val());
				// $("#searchBaiscBox").val('');
				$(".ui-menu").children().remove();// To hide the list of
				// suggestions displayed
				$(".ui-menu").css("display", "none");// To hide the list of
				// suggestions displayed
				return false;
			}
		}

	});
}

function callArticleBasicSearchService(article,genReportFlag) {
	article = article.split('-')[0];
	var barCodeFlag = (article.length > 7 && !isNaN(article)) ? true : false;
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
								if ($("#searchBaiscBoxList").find(
										"#" + response[0].article_no).length > 0) {
									$.fn.showCustomMsg(
											[ 'Article added already.' ],
											error, 'LTO Report');
								} else {
									

									$("#searchBaiscBoxList")
											.append(
													'<li><label class="articleBasicLabel" id="'
															+ response[0].article_no
															+ '">'
															+ response[0].article_no+"-"+response[0].article_desc
															+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
									$("#searchBaiscBox").val('');
									if (genReportFlag && isValidateLTODetials()) {
										buildReqParam();
										callReportService();
									}
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
												'Adjustment Log Report');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue Occurred.' ],
												error, 'Adjustment Log Report');
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
	
	
	
	
	/*event.stopPropagation();
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	if ($elem.is(':checked')) {
		if ($("#searchBaiscBoxList").find("#" + obj.article_no).length > 0) {
			$.fn.showCustomMsg([ 'Article added already.' ], error,
					'LTO Report');
		} else {
			$("#searchBaiscBox").val(obj.article_no);

			articleBasicList[articleBasicList.length] = obj.article_no;
			
			 * articleStdSellPriceMap[obj.article_no]=$tr.find('td:first').find('label').attr('std_sell_price');
			 * articleAndDescMap[obj.article_no]=$tr.find('td:eq(1)').html();
			 
			$("#searchBaiscBoxList")
					.append(
							'<li><label class="articleBasicLabel" id="'
									+ $("#searchBaiscBox").val().split('-')[0]
									+ '">'
									+ $("#searchBaiscBox").val()
									+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
			$("#searchBaiscBox").val('');
		}
	} else {
		var parentElemInBasicList = $("#searchBaiscBoxList").find(
				$("#" + obj.article_no));
		removeArticleFromBasicList(parentElemInBasicList.parent());
	}*/

	// $('#dialog-mulipleArticles').dialog('close');
};
function removeArticleFromBasicList(parentElem) {
	$(parentElem).remove();
	
}