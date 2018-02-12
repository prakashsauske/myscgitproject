var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';

/**
 * Invokes service and frame print page
 */
function loadSTAuditSummaryPrint() {
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	/* Autocomplete Off */

	document.forms[0].autocomplete = "off";

	$("#backBtn").click(function(e) {
		window.location_name.href = "../login/homepage.htm";
	});

	callReportSTAuditSummaryService();
}
/**
 * Invokes report service
 */
function callReportSTAuditSummaryService() {
	var requestParam = {
		"iv_st_id" : $("#reportDetailsStockTakeId").html()
	};
	console.log(reportSTAuditSummaryUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : reportSTAuditSummaryUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (response != undefined && response.length > 0
						&& response[0].article_number != undefined) {
					$("#reportContent3_audit").removeClass("hideBlock");
					$('#mainTabs-4').find('.emptyTable').removeClass(
							'hideBlock');
					$("#auditSummaryTotalCount").removeClass('hideBlock');
					$("#auditSummaryTotalCount").html(
							"List of articles audited (" + response.length
									+ ")");// sets total records
					responseP = response;
					loadReportContentTbl();
					callStockTakeAuidtSummaryJasperPrint(responseP);
					totalRecords = response.length;
					$("#noRecords").html(totalRecords);// Sets the no of
														// records
					bindAuditSummaryExport(response);
					$currentPanel.removeClass('hideBlock');
				} else {
					$("#auditSummaryTotalCount").addClass('hideBlock');
					$('#mainTabs-4').find('.emptyTable').addClass('hideBlock');
					if (response != undefined && response.length <= 0) {
						// $.fn.showCustomMsg(['Sorry, No records
						// found.'],success,'Stocktake-Audit Summary');
					} else {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured.' ],
								error, 'Stocktake-Audit Summary');
					}
				}
			}).fail(
			function() {
				showReportErrorMsg('Sorry, Some technical issue occured ',
						'Stock Fil Report');
			}).always(function() {
		stopLoading();
	});
}

function bindAuditSummaryExport(response) {
	// This must be a hyperlink
	var auditSummaryArray = response;
	$("#auditExportBtn").on(
			'click',
			function(event) {
				// CSV
				exportToCSVAuditSummary.apply(this, [ auditSummaryArray,
						'audit_export.csv' ]);

				// IF CSV, don't do event.preventDefault() or return false
				// We actually need this to be a typical hyperlink
			});
}

function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}

function exportToCSVAuditSummary(artCountArray, filename) {
	
		var groupedData=$groupBy(artCountArray, function(obj) {return obj.counted_user;});
		var valuesArray =['article_number','article_description','location_name','counted_user','user_count','auditor','auditor_count','difference','action_flag'];
		var headersArray =['Article','Description','Location','User Name','User Count','Auditor Name','Auditor Count','Difference','Action'];
		var headerContent ='';
		var tableContent='';
		var groupArray=[];
		var csv='';
        var colDelim = '","';
        var rowDelim = '"\r\n"';
        $.each(headersArray,function(headerIndex){
        	headerContent+=headersArray[headerIndex];
        	headerContent=addColDelim(headerContent);
        });
        headerContent=headerContent+tmpRowDelim;
        headerContent=headerContent+tmpRowDelim;
		$.each(groupedData, function( key) {
			groupArray.push(key);
		  });
		$.each(groupArray, function(index) {
			tableContent+=(groupArray[index]);
			tableContent=addColDelim(tableContent)+tmpRowDelim;
			var array=groupedData[groupArray[index]];
			if(array.length > 0){ 
				$.each( array, function(i) {
					$.each(valuesArray, function(valuesIndex) {
					tableContent=array[i][valuesArray[valuesIndex]] == null? tableContent: tableContent+array[i][valuesArray[valuesIndex]];
					tableContent=addColDelim(tableContent);
				});
					tableContent=tableContent+tmpRowDelim;
			}); 
			}
		});
		
		csv = headerContent+tableContent;
		csv=csv.split(tmpRowDelim).join(rowDelim)
        .split(tmpColDelim).join(colDelim).replace('"',"") ;
        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this)
        .attr({
        'download': filename,
            'href': csvData,
            'target': '_blank'
    });
}
/**
 * Configuration to generate table
 * 
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportAuditSummary(data) {
	this.option = 'build';
	this.key = [ 'article_number', 'article_description', 'location_name',
			'user', 'auditor_both', 'difference', 'action_flag' ];
	this.table_name = 'audit_summary_rpt';
	this.table_title = '';
	this.table_class = ' ContentTable action_flagRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {
		article_number : 'Article',
		article_description : 'Description',
		location_name : 'Location',
		counted_user : 'Name',
		user_count : 'Count',
		auditor : 'Name',
		auditor_count : 'Count',
		difference : 'Difference',
		action_flag : 'Action'
	};
	this.header_data_type = {
		article_number : 'number',
		article_description : 'char',
		location_name : 'char',
		counted_user : 'char',
		user_count : 'number',
		auditor : 'char',
		auditor_count : 'number',
		difference : 'char',
		action_flag : 'char'
	};
	this.header_row_type = {
		article_number : 'main',
		article_description : 'main',
		location_name : 'main',
		user : 'sub',
		auditor_both : 'sub',
		difference : 'main',
		action_flag : 'main'
	};
	this.header_sub_rows = {
		user : {
			subKeys : [ 'counted_user', 'user_count' ]
		},
		auditor_both : {
			subKeys : [ 'auditor', 'auditor_count' ]
		}
	};
	this.header_class = {
		article_number : '',
		article_description : '',
		location_name : '',
		user : ' centerValue columnDivider noSort  ',
		counted_user : '',
		user_count : 'centerValue',
		auditor_both : ' centerValue columnDivider noSort  ',
		auditor : '',
		auditor_count : 'centerValue',
		difference : 'centerValue',
		action_flag : 'centerValue lastColumn'
	};
	this.header_width = {
		article_number : '7%',
		article_description : '14%',
		location_name : '14%',
		counted_user : '10%',
		user_count : '4%',
		auditor : '10%',
		auditor_count : '4%',
		difference : '9%',
		action_flag : '9%'
	};
	this.content_class = {
		article_number : '',
		article_description : '',
		location_name : '',
		user : ' centerValue columnDivider noSort  ',
		counted_user : '',
		user_count : 'centerValue',
		auditor_both : ' centerValue columnDivider noSort  ',
		auditor : '',
		auditor_count : 'centerValue',
		difference : 'centerValue',
		action_flag : 'centerValue lastColumn'
	};
	this.content_format = {
		article_number : 'removeNull',
		article_description : 'removeNull',
		location_name : 'removeNull',
		counted_user : 'removeNull',
		user_count : 'removeNull',
		auditor : 'removeNull',
		auditor_count : 'removeNull',
		difference : 'removeNull',
		action_flag : 'removeNull'
	};
	this.content_width = {
		article_number : '7%',
		article_description : '14%',
		location_name : '14%',
		counted_user : '10%',
		user_count : '4%',
		auditor : '10%',
		auditor_count : '4%',
		difference : '9%',
		action_flag : '9%'
	};
	this.header_td_label = {
		user : 'User',
		auditor_both : 'Auditor'
	};
	this.data_td_class = {
		difference : getDifferenceTdclass
	};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.cont_data_function = {
		difference : showdifferenceDetails,
		action_flag : showaction_flagDetails,
		user_count : showuser_countDetails,
		auditor_count : showauditor_countDetails
	};
	this.group_done = bindAuditPrintCont;
	this.sort_done = bindAuditPrintCont;
	this.default_groupbyColumn = [ 'counted_user' ];
	this.groupbyColumn = {
		'counted_user' : 'User'
	};
	this.group_cont_function = {
		counted_user : getUserGrpHead
	};
	this.groupby = true;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true; //sorting changes
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
	// this.grp_tot = true;
	// this.group_tot_cont_function = {department_name :
	// getTotalBasedOnDept,article_number :
	// getTotalBasedOnArticle,markdown_percentage : getTotalBasedOnMarkdown};
}

var bindAuditPrintCont =function($tr,$tbl){
	var applyGroupBy = $tbl.data('confObj').applyGroup;
	var content = $tbl.data('confObj').content
	if(applyGroupBy){
		content = $tbl.data('confObj').groupedContObj;
	}
	callStockTakeAuidtSummaryJasperPrint(content);
};
var getDifferenceTdclass = function(obj, $td, $tr) {
	$td.addClass('valueInfo');
};
var showdifferenceDetails = function(obj) {
	var rtnLabel = '';
	if (obj.auditor_count > obj.user_count) {
		rtnLabel = '<label class="valueUp upDownArrow">' + checkIfRandomWeightArticle(obj,(obj.difference || ''),obj.difference_qty)
				+ '</label>';
	} else if (obj.auditor_count < obj.user_count) {
		rtnLabel = '<label class="valueDown upDownArrow">' + checkIfRandomWeightArticle(obj,(obj.difference || ''),obj.difference_qty)
				+ '</label>';
	} else if (obj.auditor_count == obj.user_count) {
		rtnLabel = '<label class="valueEqual">' + checkIfRandomWeightArticle(obj,(obj.difference || ''),obj.difference_qty) + '</label>';
	}
	return rtnLabel;
};
var showaction_flagDetails = function(obj) {
	var rtnLabel = '';
	if (obj.action_flag == "A") {
		obj.action_flag = "Accepted";
		rtnLabel = '<label class="success">Accepted</label>';
	} else if (obj.action_flag == "R") {
		obj.action_flag = "Rejected";
		rtnLabel = '<label class="failed">Rejected</label>';
	}
	return rtnLabel;
};

var showuser_countDetails = function(obj)
{
return checkIfRandomWeightArticle(obj,(obj.user_count || ''),obj.auditor_count_qty);
};

var showauditor_countDetails = function(obj)
{
return checkIfRandomWeightArticle(obj,(obj.auditor_count || ''),obj.auditor_count_qty);
};

// checkIfRandomWeightArticle function alredy available in reportstocktakearticlecount . js
/**
 * Group by article content
 */
// Commented the below method to remove sub category from group by as per
// requirement
/*
 * var getSubCatgGrpHead = function(obj, confObj) { var cont = '<tr id="none"></tr>';
 * if (obj != null && obj != undefined) { cont = '<tr><td class="rowSection rowHighlight" colspan="13">' +
 * (obj.subcat_name || '') + '</td></tr>'; } return cont; };
 */
/**
 * Group by User
 */
var getUserGrpHead = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="13">'
				+ (obj.counted_user || '') + '</td></tr>';
	}
	return cont;
};

/**
 * Frames print screen content
 * 
 * @param response
 */
function frameReportSTAuditSummary(response) {
	content = '';
	var headerContent = '<label><strong>Audit Summary Report</strong></label><div style="float:right"><label class="subtitle">'
			+ $("#posSite").val()
			+ '</label><label class="subtitle">|<label><label class="subtitle">'
			+ $("#posSiteName").val()
			+ '</label></div></br></br><label class="subtitle-bold">'
			+ '</br><label class="subtitle">List of articles audited (<strong id="noRecords">'
			+ totalRecords + '</strong>)</label></br></br>';
	constructHeaderTblSTAuditSummary();
	content += printHeadInnerTable;
	frameTableSTAuditSummary(response);
	$('#printbodyForSTAuditSummary')
			.html('')
			.append(headerContent + content)
			.append(
					'<link rel="stylesheet" href="../../styles/reportPrintStyle.css" />');
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var len = 0;
	$('.currentPagePrint').each(function() {
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
}
/**
 * Frames report table
 * 
 * @param response
 */
function frameTableSTAuditSummary(response) {
	var count = 0;
	var firstPageCreated = false;
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

			+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator"> </label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page'

			+ '<label class="currentPagePrint">1</label> of '

			+ '<label class="totalPage">1</label>'

			+ ' </div>' + '</div>' + '</div>';

	for ( var i = 0; i < response.length; i++) {
		constructContentTblSTAuditSummary(response[i]);

		// Split Pages - Starts
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*
		 * if(response[i].article_number.length > 35){ count = count +
		 * 0.5*(response[i].article_number.length/35); }
		 */
		if (i >= (response.length - 1)) {
			content += '</tbody></table>';
			content += '<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: <b>Accepted </b>Auditor Count Considered, <b>Rejected</b> User Count Considered</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';// +
																																																																		// '</div>';
		}
		if (count >= firstPageRecords && !firstPageCreated) {
			count = 0;
			firstPageCreated = true;
			content += '</tbody></table>' + printFoot + '</div>'
					+ printHeadInnerTable;
		} else {
			if (i >= (response.length - 1)) {
				/*
				 * if(count != otherPageRecords && i> firstPageRecords){ content += '<table><tbody>';
				 * for(var n=0;n<((otherPageRecords)-count);n++){ content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; }
				 * content += '</tbody></table>'; }else{ content += '<table><tbody>';
				 * for(var n=0;n < ((firstPageRecords)-count);n++){ content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; }
				 * content += '</tbody></table>'; }
				 */
				content += '</tbody></table>' + printFoot + '</div>';
			} else if (count >= otherPageRecords) {
				count = 0;
				content += '</tbody></table>' + printFoot + '</div>'
						+ printHeadInnerTable;
			}

		}
		count++;
		// Split Pages - Ends

	}
}
/**
 * Builds table header for print page
 */
function constructHeaderTblSTAuditSummary() {
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
			+ '<thead><tr><th rowspan="2" width="50px">Article</th>'
			+ '<th rowspan="2" width="150px">Description</th>'
			+ '<th rowspan="2" width="50px">Location</th>'
			+ '<th colspan="2" class="centerValue columnDivider" width="250px">User</th>'
			+ '<th colspan="2" class="centerValue columnDivider" width="250px">Auditor</th>'
			+ '<th rowspan="2" class="centerValue" width="50px">Difference</th>'
			+ '<th rowspan="2" class="centerValue" width="60px">Action</th>'
			+ '</tr><tr class="subHeader">'
			+ '<th class="centerValue" width="50px">Name</th>'
			+ '<th class="centerValue" width="50px">Count</th>'
			+ '<th class="centerValue" width="50px">Name</th>'
			+ '<th class="centerValue" width="50px">Count</th></tr></thead>';

}
/**
 * Builds table content for print page
 * 
 * @param data
 */
function constructContentTblSTAuditSummary(data) {
	var action = '';
	if (data.action_flag == "A") {
		action = "Accepted";
	} else if (data.action_flag == "R") {
		action = "Rejected";
	}
	content += '<tr class="border_bottom"><td  align="left">'
			+ (data.article_number != null ? data.article_number : '')
			+ '</td><td class="centerValue">'
			+ (data.article_description != null ? data.article_description : '')
			+ '</td><td class="centerValue">'
			+ (data.location_name != null ? data.location_name : '')
			+ '</td><td class="centerValue">'
			+ (data.counted_user != null ? data.counted_user : '')
			+ '</td><td class="centerValue">'
			+ (data.user_count != null ? data.user_count : '')
			+ '</td><td class="centerValue">'
			+ (data.auditor != null ? data.auditor : '')
			+ '</td><td class="centerValue">'
			+ (data.auditor_count != null ? data.auditor_count : '')
			+ '</td><td class="centerValue">'
			+ (data.difference != null ? data.difference : '')
			+ '</td><td class="centerValue">' + (action != null ? action : '');
}
/**
 * Time format
 * 
 * @returns {String}
 */
function timeformat() {
	var date = new Date();
	if (date.getHours() > 12) {
		hours = (date.getHours()) - 12;
		ampm = "pm";
	} else {
		hours = (date.getHours());
		ampm = "am";
	}
	return (hours < 10 ? ("0" + hours) : hours)
			+ ":"
			+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
					.getMinutes()) + " " + ampm;
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
 * Shows error message
 * 
 * @param msg
 * @param title
 */
function showReportErrorMsg(msg, title) {
	var errorContent = '<li><ol><li>' + msg + '</li></ol></li>';
	$('#reportErrorWrapper').find('#titleContent').html(title);
	$('#reportErrorWrapper').find('#errorContent').html(errorContent);
	$('#reportErrorWrapper').removeClass('hideBlock');
}
function callStockTakeAuidtSummaryJasperPrint(reportResultArray) {
	var applyGroupBy = $('#audit_summary_rpt_table').data('confObj').applyGroup ? "Y"
			: "";
	var obj = {
		stockTakePrint : stockTakePrint,
		reportResult : reportResultArray,
		StoreNo : $('#posSite').val(),
		StoreName : $('#posSiteName').val(),
		applyGroupby : applyGroupBy
	};
	// console.log(JSON.stringify(obj));
	$
			.ajax({
				url : "../stockTakeAuditSummaryReport/printReportStockTakeAuditSummaryPDF.htm",
				type : "POST",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(obj),
				cache : false, // This will force requested pages not to be
								// cached by the browser
				processData : false, //To avoid making query String instead of JSON
				beforeSend : function() {
					startLoading();
				},
				success : function(response, textStatus) {
					//console.log(response.data);
					if (response.data == 'success') {
						stopLoading();
					}
				},
				error : function(xhr, textStatus, errorThrown) {
					console.log('request failed' + errorThrown);
					stopLoading();
				}
			});
}
function printAuditContent() {
	$('#stockTakeForm')
			.attr("action",
					"../stockTakeAuditSummaryReport/downloadStockTakeAuditSummaryPdf.pdf");
	$('#stockTakeForm').attr('target', '_blank');
	$('#stockTakeForm').attr('method', 'get');
	$('#stockTakeForm').submit();
}