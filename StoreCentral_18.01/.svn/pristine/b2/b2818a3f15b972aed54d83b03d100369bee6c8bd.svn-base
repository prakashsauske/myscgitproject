var report_title = '';
var deptNamePrint = '';
var catNamePrint = '';
var scatNamePrint = '';
var segNamePrint = '';
var articleDtlPrint = '';
var responseO = '';
var requestParam = '';
var allInputs = '';
var dateFrom = '';
var dateTo = '';
var reasonArray = new Array();
var userArray = new Array();
var userDescArray = [];
var reasonDescArray = [];
var articleBasicList = new Array();
var articleStdSellPriceMap = {};
var articleAndDescMap = {};
var mplFacingsMap = {};
var responseM = '';
var triggeredAllDept=false;
var responseS = '';
var responseF = '';
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

	// By default select all checkbox of car,sub-cat,seg to be disabled
	$("#catSelectAll").attr("disabled", true);
	$("#sCatSelectAll").attr("disabled", true);
	$("#segSelectAll").attr("disabled", true);

	$("#dialog-email").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 450
	});

	$("#dialog-email").parent().addClass("popupWrapper");

	$(".email").click(function() {
		$("#dialog-email").dialog("open");
	});

	$("#dialog-email .popupActions label").click(function() {
		$("#dialog-email").dialog("close");
	});

	// Code for adding scorllers to the table

	var tableCols = 0;

	$("#tableData tbody tr").each(function() {
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
		document.getElementById("scrollWindow").style.width = width + "px";

	}

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

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$("#generateReport").click(function() {
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
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});

	$("input[name='categoryList']").click(function() {
		$("#subCatDiv").find(".noSelection").addClass('hideBlock');
		$("#subCatDiv").find("ul").removeClass('hideBlock');
		$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});

	$("input[name='subCatList']").click(function() {
		$("#subCatDiv").find(".heirachyAction").fadeIn(400);

		$("#segDiv").find(".noSelection").addClass('hideBlock');
		$("#segDiv").find("ul").removeClass('hideBlock');
		$("#segDiv").find(".totalCount").removeClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});

	$("input[name='segmentList']").click(function() {
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".heirachyAction").fadeIn(400);
	});

	// code for table sorter
	$(".actionRows").tablesorter();

	$(".actionRows th").click(function() {
		$('.actionRows tr td').each(function() {
			$(this).removeClass("sorted");
		});
		col = $(this).parent().children().index($(this));
		$('.actionRows tr').each(function() {
			$(this).find('td').eq(col).addClass("sorted");
		});
	});

	// Code to show and hide article heirarchy

	$('#depH').click(function() {
		if ($(this).is(':checked'))
			$("#articleHierarchy").removeClass('hideBlock');
		else
			$("#articleHierarchy").addClass('hideBlock');
	});

	// checks radio buttons for location and include
	$('#depHier').click(function() {
		$(".articleHierarchy").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleListInput").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
		choose = 'depHier';
	});

	$('#artList').click(function() {
		$(".articleListInput").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
		$('#depH').prop('checked', false);
		choose = 'artList';
	});

	$('#plano').click(function() {
		$(".planoLoc").removeClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
	});

	$('#nonplano').click(function() {
		$(".otherLoc").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
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

	// group by
	$('#groupByOpen1').click(function() {
		$("#groupByOpen1").addClass('hideBlock');
		$("#tableAddAction").removeClass('hideBlock');
		$("#groupByClear1").removeClass('hideBlock');

	});

	$('#groupByClear1').click(function() {
		$("#groupByOpen1").removeClass('hideBlock');
		$("#tableAddAction").addClass('hideBlock');
		$("#groupByClear1").addClass('hideBlock');

		$("#defaultTable").removeClass('hideBlock');
		$("#articleTable").addClass('hideBlock');
		$("#reasonTable").addClass('hideBlock');
		$("#userTable").addClass('hideBlock');
		$("#dateTable").addClass('hideBlock');

	});

	$('#del').click(function() {
		$("#articletTable").removeClass('hideBlock');

		$("#defaultTable").addClass('hideBlock');
		$("#reasonTable").addClass('hideBlock');
		$("#userTable").addClass('hideBlock');
		$("#dateTable").addClass('hideBlock');
	});

	$('#supp').click(function() {
		$("#reasonTable").removeClass('hideBlock');

		$("#defaultTable").addClass('hideBlock');
		$("#articletTable").addClass('hideBlock');
		$("#userTable").addClass('hideBlock');
		$("#dateTable").addClass('hideBlock');
	});

	$('#useropt').click(function() {
		$("#userTable").removeClass('hideBlock');

		$("#defaultTable").addClass('hideBlock');
		$("#articletTable").addClass('hideBlock');
		$("#reasonTable").addClass('hideBlock');
		$("#dateTable").addClass('hideBlock');
	});

	$('#dateOpt').click(function() {
		$("#dateTable").removeClass('hideBlock');

		$("#defaultTable").addClass('hideBlock');
		$("#articletTable").addClass('hideBlock');
		$("#userTable").addClass('hideBlock');
		$("#reasonTable").addClass('hideBlock');
	});

	// Checkbox DropDown functions
	$("#dropdownDoneBtn").click(function() {
		$(".selectDropdown").removeClass('active');
	});

	// Checkbox DropDown functions
	$(
			".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn")
			.click(function() {
				$(".selectDropdown").removeClass('active');
			});

	$("#as").click(function() {
		if ($('#pas').hasClass('active')) {
			$("#pas").removeClass('active');
		} else {
			$("#pas").addClass('active');
		}
	});

	$("#ds").click(function() {
		if ($('#pds').hasClass('active')) {
			$("#pds").removeClass('active');
		} else {
			$("#pds").addClass('active');
		}
	});

	$("#us").click(function() {
		if ($('#pus').hasClass('active')) {
			$("#pus").removeClass('active');
		} else {
			$("#pus").addClass('active');
		}
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
											error, 'Adjustment Log Report');
								} else {
									callArticleBasicSearchService($(
											"#searchBaiscBox").val().split('-')[0]);
								}
								// $("#searchBaiscBox").val('');
								//$(".ui-menu").children().remove();// To hide
																	// the list
																	// of
																	// suggestions
																	// displayed
								//$(".ui-menu").css("display", "none");// To
																		// hide
																		// the
																		// list
																		// of
																		// suggestions
																		// displayed
								return false;
							}
						}
					});

	populateDepartmentDropDown();
	bindAllDeptCheckBox();

	populateUserDropDown("SOH");
	bindAllUserCheckBox();

	populateDepartment("checkbox");

	createAutoSuggestChange($('.reportWrapper').find('#searchBaiscBox'));

	// bindPrint();

	var today = new Date();
	var tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	$("#dateFrom").val(dateFromformat());
	$("#dateTo").val(dateToformat());

	$("#addParameter")
			.on(
					"click",
					".addRow",
					function() {
						if ($("#addParameter").find('.linkBtn').length <= 4) {
							$(this).removeClass("addRow");
							$(this).addClass("hideRow");
							$(this).html("Remove Row");
							addRow();
						} else {
							$(this).addClass("addRow");
							$(this).removeClass("hideRow");
							$(this).html("Add More");
							$.fn
									.showCustomMsg(
											[ 'Maximum number of allowed "Additonal Criteria" is 5.' ],
											information,
											'Adjustment Log Report');
						}
					});

	$("#addParameter")
			.on(
					"click",
					".hideRow",
					function() {
						$(this).parent().parent().parent().parent().remove();
						if ($("#addParameter").find('#addCriteriaLabel').length == 0) {
							$(
									"<label for='addi' id='addCriteriaLabel'>Additional Criteria</label>")
									.prependTo(
											$("#addParameter")
													.find(
															".parameterOptionsInputBox .parameterRow")
													.eq(0));
						}
					});
	// Close Button
	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});
	});
	getEncSAPPassword();
	getReasonCode();
	bindAllReasonCheckBox();

	$('.valueCrit').onlyNumbersIncNegative();
	$(".valueCrit").on('change', function() {
		$(this).val(Number($(this).val()).toFixed("0"));
	});
	// Defect_3717 - By default categories and sub categories are not set to
	// "All". BR-4
	$("#catSelectAll").prop("disabled", false);
	$("#catSelectAll").prop("checked", true);
	$("#sCatSelectAll").prop("disabled", false);
	$("#sCatSelectAll").prop("checked", true);

	$(".reportRadio input[type=radio]").change(function() {
		if ($(this).val() == "SOH") {
			$("#reasonCodeDiv").removeClass("hideBlock");
			populateUserDropDown("SOH");
		} else if ($(this).val() == "F") {
			$("#reasonCodeDiv").addClass("hideBlock");
			populateUserDropDown("FAC");
		} else if ($(this).val() == "M") {
			$("#reasonCodeDiv").addClass("hideBlock");
			populateUserDropDown("MPLSC");
		}
		bindAllUserCheckBox();
	});

	if ($("#salesOrg").val() == "1060") {// only for bigw
		$("#facings").removeClass("hideBlock");
		$("[for='facings']").removeClass("hideBlock");
		$("#standard").addClass("hideBlock");
		$("[for='standard']").addClass("hideBlock");
	}

});

function handleGenReportClick(){
	adjFor = $(".reportRadio input[type=radio]:checked").val();// Adjustment
	if (adjFor == "M") {
		if (validateInputs() && buildReqParam("M")) {
			callMPLSCService("M");// prev and new MPL
		}
	} else if (adjFor == "F") {
		if (validateInputs() && buildReqParam("F")) {
			callMPLSCService("F");// prev and new MPL
		}
	} else if (validateInputs() && buildReqParam("S")) {				
		callReportService(requestParam);
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
												'Adjustment Log Report');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
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
};

function removeArticleFromBasicList(parentElem) {
	$(parentElem).remove();
	
}
/**
 * Sets the request parameters for the service
 */
function buildReqParam(reportType) {
	// var articles = new Array();
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();
	var addCritArray = [];
	var addCritList = [];
	addCriPrint = '';

	dateFrom = $("#dateFrom").val();// Date From
	dateTo = $("#dateTo").val();// Date To
	adjFor = $(".reportRadio input[type=radio]:checked").val();// Adjustment
	choose = $(".parameterOptionsRadio input[type=radio]:checked").val();// Choose
	var deptDrpDwn = $("#deptSelectOptions").val();

	$(".parameterOptionsInputBox").each(
			function() {
				if ($(this).find(".filter").val() != undefined
						&& $(this).find(".filter").val() != "Select filter") {
					addCritArray.push({
						iv_field : $(this).find(".filter").val(),
						iv_criteria : $(this).find(".criteria").val(),
						iv_value : $(this).find(".valueCrit").val()
					});
					addCritList.push({
						iv_field : $(this).find(".filter").val(),
						iv_criteria : $(this).find(".criteria").val(),
						iv_value : $(this).find(".valueCrit").val()
					});
				}
			});
	var fieldValues = [ "QTY_ADJUSTED", "SELL_PRICE", "SOH", "MPL", "CAP",
			"FACINGS" ];
	var valid = validateAddCrit(fieldValues, addCritArray,
			"Adjustment Log Report");
	if (valid) {
		if (choose == "depHier") {// Departments
			// Start date and end date not mandatory
		} else if (choose == "artList") {// Specified Articles
			// Start date and end date mandatory
			valid = validateDates(dateFrom, dateTo);
		}
	}
	if (valid) {

		/*
		 * $(".parameterOptionsListBlock").find(".articleLabel").each(function()
		 * {// Articles articles[articles.length] =
		 * $(this).text().split('-')[0]; });
		 */
		$( document ).ready(function() {			// for Defect_7130
			$( ".dropdownLabel" ).prop( "checked", true );
			});

		// includeDelPLUs = $('#includeDelPLUs').is(':checked') ? 'Y' : 'N';
		deptArray = new Array();
		if ($("#depH").is(':checked')) { // If Select multiple dept or sub
											// cat is checked
			// Department selection
			
			
			$("input[name='departmentList']").each(function() {
				if ($(this).is(':checked')) {
					deptArray[deptArray.length] = $(this).val();
				}
			});

			// Category
			$("input[name='category']").each(function() {
				if ($(this).is(':checked')) {
					catArray[catArray.length] = $(this).val();
					var index = deptArray.indexOf($(this).attr('depid'));
					if (index > -1) {
						deptArray.splice(index, 1);
					}
				}
			});

			// Sub Category
			$("input[name='subCat']").each(function() {
				if ($(this).is(':checked')) {
					subCatArray[subCatArray.length] = $(this).val();
					var index = catArray.indexOf($(this).attr('catid'));
					if (index > -1) {
						catArray.splice(index, 1);
					}
				}
			});

			// Segment
			$("input[name='segmentList']").each(function() {
				if ($(this).is(':checked')) {
					segArray[segArray.length] = $(this).val();
					var index = subCatArray.indexOf($(this).attr('scatid'));
					if (index > -1) {
						subCatArray.splice(index, 1);
					}
				}
			});
		} else {
			$('#depDropDwnList').find("input[type=checkbox]:checked").each(
					function() {
						if ($(this).attr('id') != "allDeptChkBox") {
							deptArray[deptArray.length] = $(this).val();
						}
					});
		}

		reasonArray = new Array();
		reasonDescArray = new Array();
		$('.reasonDropDwn').find("input[type=checkbox]:checked").each(
				function() {
					if ($(this).attr('id') != "allReasonChckBox") {
						reasonArray[reasonArray.length] = $(this).attr('id');
						reasonDescArray[reasonDescArray.length] = $(this).parent().find('label').text();
					}
				});

		userArray = new Array();
		userDescArray = new Array();
		$('.userDropDwn').find("input[type=checkbox]:checked").each(function() {
			if ($(this).attr('id') != "allUserChckBox") {
				userArray[userArray.length] = $(this).attr('id');
				userDescArray[userDescArray.length] = $(this).parent().find('label').text();
			}
		});
		
		articleBasicList = new Array();
		$("#searchBaiscBoxList").find(".articleBasicLabel").each(function(){
			articleBasicList.push($(this).text().split('-')[0]);
		});

		sohChkBox = $('#all').is(':checked') ? 'Y' : 'N';
		mplChkBox = $('#standard').is(':checked') ? 'Y' : 'N';
		facingsChkBox = $('#facings').is(':checked') ? 'Y' : 'N';
		if (choose == "artList"
				&& (articleBasicList == undefined || articleBasicList.length == 0)) {
			valid = false;
			$.fn.showCustomMsg([ 'Please enter article(s).' ], error,
					'Adjustment Log Report');
		} else if (choose == "depHier"
				&& !(deptArray.length > 0 || catArray.length > 0
						|| subCatArray.length > 0 || segArray.length > 0)) {
			valid = false;
			$.fn.showCustomMsg([ 'Please select department(s).' ], error,
					'Adjustment Log Report');
		}
		if (reportType == "M" || reportType == "F" && valid) {// MPL SC
			if (choose == "artList" && articleBasicList.length > 0) {
				requestParam = {
					"iv_site" : $('#posSite').val(),
					"iv_sales_org" : $("#salesOrg").val(),
					"iv_session_id" : '',
					"iv_article" : articleBasicList.join(","),
					"iv_dept_list" : '',
					"iv_cat_list" : '',
					"iv_sub_cat_list" : '',
					"iv_seg_list" : '',
					"iv_from_date" : convertDatetoYYYYMMDD(dateFrom),
					"iv_to_date" : convertDatetoYYYYMMDD(dateTo),
					"iv_user_id" : userArray.join(","),
					"addl_crit_info" : addCritList,
					"iv_facing_flag" : reportType == "F" ? "Y" : "N"
				};
			} else if (choose == "depHier") {
				requestParam = {
					"iv_site" : $('#posSite').val(),
					"iv_sales_org" : $("#salesOrg").val(),
					"iv_session_id" : '',
					"iv_article" : '',
					"iv_dept_list" : deptArray.join(','),
					"iv_cat_list" : catArray.join(','),
					"iv_sub_cat_list" : subCatArray.join(','),
					"iv_seg_list" : segArray.join(','),
					"iv_from_date" : convertDatetoYYYYMMDD(dateFrom),
					"iv_to_date" : convertDatetoYYYYMMDD(dateTo),
					"iv_user_id" : userArray.join(","),
					"addl_crit_info" : addCritList,
					"iv_facing_flag" : reportType == "F" ? "Y" : "N"
				};
			}
		} else if (reportType == "S" && valid) {// SOH
			if (choose == "artList" && articleBasicList.length > 0) {
				requestParam = {
					"iv_site" : $('#posSite').val(),
					"iv_sales_org" : $("#salesOrg").val(),
					"iv_session_id" : '',
					"iv_history_days" : '',
					"iv_article" : articleBasicList.join(","),
					"iv_dept_list" : '',
					"iv_cat_list" : '',
					"iv_sub_cat_list" : '',
					"iv_seg_list" : '',
					"iv_from_date" : convertDatetoYYYYMMDD(dateFrom),
					"iv_to_date" : convertDatetoYYYYMMDD(dateTo),
					"iv_reason_code" : reasonArray.join(","),
					"iv_user_id" : userArray.join(","),
					"iv_soh_flag" : sohChkBox,
					"iv_mpl_sc_flag" : mplChkBox,
					"iv_facing_flag" : facingsChkBox,
					"addl_crit_info" : addCritList
				};
			} else if (choose == "depHier") {
				requestParam = {
					"iv_site" : $('#posSite').val(),
					"iv_sales_org" : $("#salesOrg").val(),
					"iv_session_id" : '',
					"iv_history_days" : '',
					"iv_article" : '',
					"iv_dept_list" : deptArray.join(','),
					"iv_cat_list" : catArray.join(','),
					"iv_sub_cat_list" : subCatArray.join(','),
					"iv_seg_list" : segArray.join(','),
					"iv_from_date" : convertDatetoYYYYMMDD(dateFrom),
					"iv_to_date" : convertDatetoYYYYMMDD(dateTo),
					"iv_reason_code" : reasonArray.join(","),
					"iv_user_id" : userArray.join(","),
					"iv_soh_flag" : sohChkBox,
					"iv_mpl_sc_flag" : mplChkBox,
					"iv_facing_flag" : facingsChkBox,
					"addl_crit_info" : addCritList
				};
			}

			if (choose == "artList" && articleBasicList.length > -1
					&& articleBasicList != undefined && articleBasicList != '') {
				requestParam.iv_article = articleBasicList.join(',');

			} else {
				requestParam.iv_dept_list = deptArray.join(',');
				requestParam.iv_cat_list = catArray.join(',');
				requestParam.iv_sub_cat_list = subCatArray.join(',');
				requestParam.iv_seg_list = segArray.join(',');
			}
			console.log('Adjustment Log Report soh Request- ' + requestParam);
		}

		// Settting data for Print
		if (addCritArray.length > 0) {
			addCriPrint = '';
			var $hold = $('#newParameter');
			for ( var i = 0; i < addCritArray.length; i++) {
				if (addCriPrint == '') {
					addCriPrint += $hold.find(
							'option[value="' + addCritArray[i].iv_field + '"]')
							.text()
							+ " "
							+ $hold.find(
									'option[value="' + addCritArray[i].iv_criteria
											+ '"]').text()
							+ " "
							+ addCritArray[i].iv_value;
				} else {
					addCriPrint += ','
							+ $hold.find(
									'option[value="' + addCritArray[i].iv_field
											+ '"]').text()
							+ " "
							+ $hold.find(
									'option[value="' + addCritArray[i].iv_criteria
											+ '"]').text() + " "
							+ addCritArray[i].iv_value;
				}
			}
		}
	}

	if (articleBasicList.length > 0) {
		articleDtlPrint = articleBasicList.join(",");
	} else {
		articleDtlPrint = "";
		if ($("#depH").is(':checked')) {
			depArray = new Array();
			catArray = new Array();
			subCatArray = new Array();
			segArray = new Array();
			deptNamePrint = $('#deptSelectOptions').val();// +deptArray.slice(0,5)+'</br>'+deptArray.slice(6,20);

			// reportForLines++;//space for departments

			catArray = new Array();
			$("input[name='category']").each(
					function() {
						if ($(this).is(':checked')) {
							catArray[catArray.length] = $(this).val().substr(
									$(this).attr('depid').length);
						}
					});

			if (catArray.length > 0 && deptArray.length > 0) {
				catNamePrint = '</br><b>Category: </b>';
				// reportForLines++;
				var i = 0;
				while (i < catArray.length) {
					catNamePrint += catArray.slice(i, i + 40);
					catNamePrint += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					i += 40;
					// reportForLines++;
				}
			}

			subCatArray = new Array();
			$("input[name='subCat']").each(
					function() {
						if ($(this).is(':checked')) {
							subCatArray[subCatArray.length] = $(this).val()
									.substr($(this).attr('catid').length);
						}
					});

			if (subCatArray.length > 0
					&& (deptArray.length > 0 || catArray.length > 0)) {
				scatNamePrint = '</br><b>Sub-category: </b>';
				// reportForLines++;
				var i = 0;
				while (i < subCatArray.length) {
					scatNamePrint += subCatArray.slice(i, i + 30);
					scatNamePrint += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					i += 30;
					// reportForLines++;
				}
			}

			segArray = new Array();
			$("input[name='segmentList']").each(
					function() {
						if ($(this).is(':checked')) {
							segArray[segArray.length] = $(this).val().substr(
									$(this).attr('scatid').length);
						}
					});

			if (segArray.length > 0
					&& (deptArray.length > 0 || catArray.length > 0 || subCatArray.length > 0)) {
				segNamePrint = '</br><b>Segment: </b>';
				// reportForLines++;
				var i = 0;
				while (i < segArray.length) {
					segNamePrint += segArray.slice(i, i + 40);
					segNamePrint += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					i += 40;
					// reportForLines++;
				}
			}
		}
	}

	return valid;
}

function reframeResponseForMPLFacings(mplFlag) {
	var obj = {};
	var mplSCArray = [];
	var facingsArray = [];
	if (mplFlag == "M") {
		for ( var i = 0; i < responseO.length; i++) {
			obj = {};
			obj = responseO[i];
			obj.article = responseO[i].article_no;
			obj.date_time = responseO[i].adj_date_time;
			obj.changed_by_name = responseO[i].user_name;
			if (obj.mpl_or_cap == "MPL") {
				obj.prev_mpl = responseO[i].prev_value;
				obj.new_mpl = responseO[i].new_value;
				obj.prev_sc = '';
				obj.new_sc = '';
				obj.def_mpl = responseO[i].default_value;
				obj.def_sc = '';
				obj.def_fac = '';
			} else if (obj.mpl_or_cap == "CAP") {
				obj.prev_mpl = '';
				obj.new_mpl = '';
				obj.prev_sc = responseO[i].prev_value;
				obj.new_sc = responseO[i].new_value;
				obj.def_mpl = '';
				obj.def_sc = responseO[i].default_value;
				obj.def_fac = '';
			}
			mplSCArray.push(obj);
		}
		responseO = mplSCArray;
	} else if (mplFlag == "F") {
		for ( var i = 0; i < responseO.length; i++) {
			obj = {};
			obj = responseO[i];
			obj.article = responseO[i].article_no;
			obj.date_time = responseO[i].adj_date_time;
			obj.changed_by_name = responseO[i].user_name;
			if (obj.mpl_or_cap == "FAC") {
				obj.prev_facings = responseO[i].prev_value;
				obj.new_facings = responseO[i].new_value;
				obj.def_mpl = '';
				obj.def_sc = '';
				obj.def_fac = responseO[i].default_value;
			}
			facingsArray.push(obj);
		}
		responseO = facingsArray;
	}
}

/**
 * Invokes report service
 * 
 * @param recvParam
 */
function callReportService() {
	console.log(reportStockAdjUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : reportStockAdjUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				responseO = response;
				if (responseO != undefined && responseO.length > 0
						&& responseO[0].user_id != undefined) {
					$(".ContentTableWrapper").removeClass('hideBlock');
					$('#accordion').accordion({
						active : true
					});
					var $tblhold = $("#reportStockAdjContent");
					formatRecords(responseO);

					loadReportContentTbl(responseO, $tblhold);
					$('#Report_Stk_Adj_head').css('padding-top','5px');
					bindPrint(false);
					totalRecords = responseO.length;
					$("#noRecords").html(totalRecords);// Sets the no of
					toController();
					// records
				} else {
					if (response != undefined && response.length <= 0) {
						if (choose == "artList")
						$.fn.showCustomMsg([ 'Sorry, no records found, check SOH Full Log on Product Details screen for more history' ],
								error, 'Adjustment Log Report');
						else
							$.fn.showCustomMsg([ 'Sorry, no records found ' ],
									error, 'Adjustment Log Report');	
					} else {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured ' ],
								error, 'Adjustment Log Report');
					}
					stopLoading();
				}
			}).fail(
			function() {
				// showReportErrorMsg('Sorry, Some technical issue occured ',
				// 'Device Log Report');
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured ' ],
						error, 'Adjustment Log Report');
				stopLoading();
			}).always(function() {
		
	});
}

function formatRecords(responseO){
	var keyobj = responseO; 
	for(var m = 0;m<keyobj.length;m++){
		//key = keyobj[m];
		//if(confObj.cont_data_function!=undefined && confObj.cont_data_function[key]!=undefined){
			showAdj_date_time_f(keyobj[m]);
		//}
	}
}
function callMPLSCService(reportType) {
	console.log(reportStockAdjMPLSCUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : reportStockAdjMPLSCUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				responseO = response;
				if (responseO != undefined && responseO.length > 0
						&& responseO[0].user_id != undefined) {
					reframeResponseForMPLFacings(reportType);
					$(".ContentTableWrapper").removeClass('hideBlock');
					$('#accordion').accordion({
						active : true
					});
					var $tblhold = $("#reportStockAdjContent");
					loadReportMPLFacingsContentTbl(responseO, $tblhold,
							reportType);
					bindPrint(false);
					totalRecords = responseO.length;
					$("#noRecords").html(totalRecords);// Sets the no of
					toController();
				} else {
					if (response != undefined && response.length <= 0) {
						$.fn.showCustomMsg([ 'Sorry, no records found ' ],
								error, 'Adjustment Log Report');
					} else {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured ' ],
								error, 'Adjustment Log Report');
					}
					stopLoading();
				}
			}).fail(
			function() {
				// showReportErrorMsg('Sorry, Some technical issue occured ',
				// 'Device Log Report');
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured ' ],
						error, 'Adjustment Log Report');
				stopLoading();
			}).always(function() {
		
	});
}

function reframeResponseFromSAP(response) {
	for ( var i = 0; i < response.length; i++) {
		if (articleStdSellPriceMap[response[i].article_no] != undefined) {
			response[i].std_sell_price = articleStdSellPriceMap[response[i].article_no];
		} else {
			response[i].std_sell_price = '';
		}
	}
	responseO = response;
}

function addRow() {
	// $("#addActionBtn").addClass('hideBlock');
	$("#newParameter").find(".parameterOptionsInputBox").removeClass(
			'hideBlock');
	$("#addParameter").append($("#newParameter").html());
	$("#newParameter").find(".parameterOptionsInputBox").addClass('hideBlock');

	$(".valueCrit").unbind('change');
	$(".valueCrit").on('change', function() {
		$(this).val(Number($(this).val()).toFixed("0"));
	});
	$('.valueCrit').onlyNumbersIncNegative();

	toggleAdditionalFilter($(".reportRadio input[type=radio]:checked").val());
}

function bindPrint(sapCallFlag) {
	$('#printReportStockAdj').remove();
	$(printBtn).insertAfter($('#reportStockAdjContent').find('.tableTitle'));
	$("#printReportStockAdj").unbind('click');
	$("#printReportStockAdj").on(
			'click',
			function() {
				/*var reportResultArray = [];
				reportResultArray = $('#' + report_name + '_table').data(
						'confObj').content;
				callStockAdjJasperPrint(reportResultArray, 'normal');*/
				$('#stockAdjReportForm').attr("action",
				"downloadStockAdjReportPdf.pdf");
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
function loadReportContentTbl(data, $tblhold) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = (new tblReportStkAdj(data));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toController();
	});
	$tblhold.find('.groupbyColumns').click(function(){
		startLoading();
		setTimeout(toController,100);
	});
	bindPrint();
}
function loadReportMPLFacingsContentTbl(data, $tblhold, mplFlag) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = (new tblReportMPLFacingsStkAdj(data, mplFlag));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toController();
	});
	$tblhold.find('.groupbyColumns').click(function(){
		startLoading();
		setTimeout(toController,100);
	});
	bindPrint();
}

/**
 * Configuration to generate table
 * 
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportStkAdj(data) {
	this.option = 'build';
	this.key = [ 'article_no', 'article_desc', 'reason_desc', 'adj_date_time_f',
			'user_name', 'soh_original', 'new_soh', 'soh_adjusted_new',
			'std_sell_price', 'stk_adj_value', 'additional_info' ];
	this.table_name = report_name;
	this.table_title = 'Total <strong id="noRecords">' + data.length
			+ '</strong> articles found ';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_td_label=  {
			adj_date_time_f : 'Date & Time',
			soh_adjusted_new : 'Qty. </br> Adjusted'
	},
	this.header_name = {
		article_no : 'Article </br> Number',
		article_desc : 'Article </br> Description',
		reason_desc : 'Reason Code & </br> Description',
		adj_date_time_f : 'Date & Time',
		user_name : 'User/System',
		soh_original : 'Prev </br> SOH',
		new_soh : 'New </br> SOH',
		std_sell_price : 'Std. Sell </br> Price ($)',
		stk_adj_value : 'Stock </br> Value </br> Adjusted ($)',
		additional_info : 'Additional Info'
	}, this.header_data_type = {
		article_no : 'char',
		article_desc : 'char',
		reason_desc : 'char',
		adj_date_time_f : 'date',
		user_name : 'char',
		soh_original : 'number',
		new_soh : 'number',
		soh_adjusted_new : 'number',
		std_sell_price : 'char',
		stk_adj_value : 'char',
		additional_info : 'char'
	}, this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		reason_desc : 'main',
		adj_date_time_f : 'main',
		user_name : 'main',
		soh_original : 'main',
		new_soh : 'main',
		soh_adjusted_new : 'main',
		std_sell_price : 'main',
		stk_adj_value : 'main',
		additional_info : 'main'
	}, this.header_class = {
		article_no : '',
		article_desc : '',
		reason_desc : '',
		adj_date_time_f : '',
		user_name : '',
		soh_original : 'centerValue',
		new_soh : 'centerValue',
		soh_adjusted_new : 'centerValue',
		std_sell_price : 'centerValue',
		stk_adj_value : 'centerValue',
		additional_info : 'centerValue lastColumn'
	}, this.header_title = {}, this.header_width = {
		article_no : '',
		article_desc : '',
		reason_desc : '',
		adj_date_time_f : '',
		user_name : '',
		soh_original : '',
		new_soh : '',
		soh_adjusted_new : '',
		std_sell_price : '',
		stk_adj_value : '',
		additional_info : ''
	}, this.content_class = {
		article_no : '',
		article_desc : '',
		reason_desc : '',
		adj_date_time_f : '',
		user_name : '',
		soh_original : 'centerValue',
		new_soh : 'centerValue',
		soh_adjusted_new : 'centerValue',
		std_sell_price : 'centerValue',
		stk_adj_value : 'centerValue',
		additional_info : 'centerValue lastColumn'
	}, this.content_title = {}, this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		reason_desc : 'removeNull',
		adj_date_time_f : '',
		user_name : 'removeNull',
		soh_original : 'removeNull',
		new_soh : 'removeNull',
		soh_adjusted_new : 'removeNull',
		std_sell_price : 'removeNull',
		stk_adj_value : 'removeNull',
		additional_info : 'removeNull'
	}, this.content_width = {
		article_no : '',
		article_desc : '',
		reason_desc : '',
		adj_date_time_f : '',
		user_name : '',
		soh_original : '',
		new_soh : '',
		soh_adjusted_new : '',
		std_sell_price : '',
		stk_adj_value : '',
		additional_info : ''
	};
	this.cont_data_function = {
		reason_desc : showReasonDesc,
		soh_original : showPrevSOH,
		new_soh : showNewSOH,
		soh_adjusted_new : showQtyAdjusted,
		std_sell_price : showStdSellPrice,
		stk_adj_value : showStockValueAdjusted,
		adj_date_time_f : showAdj_date_time_f,
		getDateAndTime : showAdj_date_time_f
	};
	this.cont_sort_function = {
		adj_date_time_f : getDateAndTime,
		soh_adjusted_new : getAdjustedQty
	};
	this.content = data;
	this.pagination = true;
	this.groupby = true;
	this.groupbyColumn = {
		'article_no' : 'Article',
		'reason_desc' : 'Reason Code',
		'user_name' : 'Users',
		'adj_date' : 'Date'
	};
	this.group_cont_function = {
		article_no : getArticleGrpCont,
		reason_desc : getReasonDescGrpCont,
		user_name : getUserGrpCont,
		adj_date : getDateGrpCont
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
		reason_desc : getTotalStcokAdjValueByReason,
		user_name : getTotalStcokAdjValueByUser,
		adj_date : getTotalStcokAdjValueByDate
	};
	this.default_groupbyColumn = [ 'article_no' ];
	// this.isScrollable = 'true';
	this.page_done = {page_done: bindsecuritymatrix};
}
function bindsecuritymatrix(){
	securityMatrix();
	}
function tblReportMPLFacingsStkAdj(data, mplFlag) {
	this.option = 'build';
	if (mplFlag == "M") {
		this.key = [ 'article', 'article_desc', 'uom', 'date_time',
				'changed_by_name', 'def_mpl', 'prev_mpl', 'new_mpl', 'def_sc',
				'prev_sc', 'new_sc' ];
	} else if (mplFlag == "F") {
		this.key = [ 'article', 'article_desc', 'uom', 'date_time',
				'changed_by_name', 'def_fac', 'prev_facings', 'new_facings' ];
	}
	this.table_name = report_name;
	this.table_title = report_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {
		article : 'Article </br> Number',
		article_desc : 'Article </br> Description',
		uom : 'UOM',
		date_time : 'Date & Time',
		changed_by_name : 'User/System',
		def_mpl : 'Default </br> MPL',
		prev_mpl : 'Prev. </br> MPL',
		new_mpl : 'New </br> MPL',
		def_sc : 'Default </br> Capacity',
		prev_sc : 'Prev. </br> Capacity',
		new_sc : 'New </br> Capacity',
		def_fac : 'Default </br> Facings',
		prev_facings : 'Prev. </br> Facings',
		new_facings : 'New </br> Facings'
	}, this.header_data_type = {
		article : 'char',
		article_desc : 'char',
		uom : 'char',
		date_time : 'date',
		changed_by_name : 'char',
		def_mpl : 'number',
		prev_mpl : 'number',
		new_mpl : 'number',
		def_sc : 'number',
		prev_sc : 'number',
		new_sc : 'number',
		def_fac : 'number',
		prev_facings : 'number',
		new_facings : 'number'
	}, this.header_row_type = {
		article : 'main',
		article_desc : 'main',
		reason_desc : 'main',
		date_time : 'main',
		changed_by_name : 'main',
		def_mpl : 'main',
		prev_mpl : 'main',
		new_mpl : 'main',
		def_sc : 'main',
		prev_sc : 'main',
		new_sc : 'main',
		def_fac : 'main',
		prev_facings : 'main',
		new_facings : 'main'
	}, this.header_class = {
		article_ : '',
		article_desc : '',
		uom : '',
		date_time : '',
		changed_by_name : '',
		def_mpl : 'centerValue',
		prev_mpl : 'centerValue',
		new_mpl : 'centerValue',
		def_sc : 'centerValue',
		prev_sc : 'centerValue',
		new_sc : 'centerValue',
		def_fac : 'centerValue',
		prev_facings : 'centerValue',
		new_facings : 'centerValue lastColumn'
	}, this.header_title = {}, this.header_width = {
		article_ : '',
		article_desc : '',
		uom : '',
		date_time : '',
		changed_by_name : '',
		prev_mpl : '',
		new_mpl : '',
		prev_sc : '',
		new_sc : '',
		prev_facings : '',
		new_facings : '',
		def_mpl : '',
		def_sc : '',
		def_fac : ''

	}, this.content_class = {
		article : '',
		article_desc : '',
		uom : '',
		date_time : '',
		changed_by_name : '',
		prev_mpl : 'centerValue',
		new_mpl : 'centerValue',
		prev_sc : 'centerValue',
		new_sc : 'centerValue',
		prev_facings : 'centerValue',
		new_facings : 'centerValue lastColumn',
		def_mpl : 'centerValue',
		def_sc : 'centerValue',
		def_fac : 'centerValue'
	}, this.content_title = {}, this.content_format = {
		article : 'removeNull',
		article_desc : 'removeNull',
		uom : 'removeNull',
		date_time : 'mobi_date',
		changed_by_name : 'removeNull',
		prev_mpl : 'removeNull',
		new_mpl : 'removeNull',
		prev_sc : 'removeNull',
		new_sc : 'removeNull',
		prev_facings : 'removeNull',
		new_facings : 'removeNull',
		def_mpl : 'removeNull',
		def_sc : 'removeNull',
		def_fac : 'removeNull'

	}, this.content_width = {
		article_ : '',
		article_desc : '',
		uom : '',
		date_time : '',
		changed_by_name : '',
		prev_mpl : '',
		new_mpl : '',
		prev_sc : '',
		new_sc : '',
		prev_facings : '',
		new_facings : '',
		def_mpl : '',
		def_sc : '',
		def_fac : ''
	};
	this.cont_data_function = {
		date_time : showDateMPLFacings
	};
	this.cont_sort_function = {
		date_time : showDateMPLFacingsSort
	};
	this.header_td_label = {
		date_time : 'Date & Time'
	};
	this.content = data;
	this.pagination = true;
	this.groupby = true;
	this.groupbyColumn = {
		'article' : 'Article',
		'changed_by_name' : 'Users',
		'adj_date' : 'Date'
	};
	this.group_cont_function = {
		article : getArticleGrpContMPLFacings,
		changed_by_name : getUserGrpContMPLFacings,
		adj_date : getDateGrpContMPLFacings
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
	// this.grp_tot = true;
	// this.group_tot_cont_function = {article :
	// getTotalStcokAdjValueByArticle,changed_by_name:getTotalStcokAdjValueByUser,date:getTotalStcokAdjValueByDate};
	this.default_groupbyColumn = [ 'article' ];
}
var showDateMPLFacingsSort = function() {
	return 'date_time';
};
var showDateMPLFacings = function(obj) {
	/*
	 * var time =
	 * obj.time_of_change.substring(0,2)+":"+obj.time_of_change.substring(2,4)+":"+obj.time_of_change.substring(4,6);
	 * obj.date_time = obj.date +" "+time;
	 */
	return obj.date_time;
};
var getArticleGrpContMPLFacings = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">' + (obj.article || '')
				+ '</td></tr>';
	}
	return cont;
};
var getUserGrpContMPLFacings = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.changed_by_name || '') + '</td></tr>';
	}
	return cont;
};
var getDateGrpContMPLFacings = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">' + (obj.adj_date || '')
				+ '</td></tr>';
	}
	return cont;
};
var showReasonDesc = function(obj) {
	// return obj.reason_code + " - "+obj.reason_desc;
	return (obj.reason_desc || '')
			+ (((obj.reason_desc || '') != '' && (obj.reason_code || '') != '') ? '('
					+ obj.reason_code + ')'
					: '');
};
var showPrevSOH = function(obj) {
	return roundDecimal(obj.soh_original, 2);// Defect_7289
};
var showNewSOH = function(obj) {
	return roundDecimal(obj.new_soh, 2);//Defect_7289
};
var showQtyAdjusted = function(obj) {
	var symbol = '';
	if(Number(obj.soh_original) > (Number(obj.new_soh)))
		{
		symbol='-';
		obj.soh_adjusted_new = -Math.abs(obj.soh_adjusted);
		obj.soh_adjusted = -Math.abs(obj.soh_adjusted);
		return Number(obj.soh_adjusted).toFixed(2);//Defect_7289
		}
	else if(Number(obj.soh_original) < (Number(obj.new_soh)))
		{
		symbol='+';
	obj.soh_adjusted_new = Math.abs(obj.soh_adjusted);
	return symbol+Number(obj.soh_adjusted).toFixed(2);//Defect_7289
		}
};
var showStockValueAdjusted = function(obj) {
	return roundDecimal(obj.stk_adj_value, 2);// defect 6936
};

var showAdj_date_time_f = function(obj) {
	obj.getDateAndTime = getFormattedMobiDate(obj.adj_date_time);
	return obj.getDateAndTime;
};

var getDateAndTime = function(){
	return 'getDateAndTime';
};
var getAdjustedQty = function()
{
	return 'soh_adjusted_new';
};

var getFormattedMobiDate = function(date){
	if(date!=null && date!='' && date!=undefined && date.split('/').length>2){
		var datePart = date.split(' ')[0].split('/');
		var timePart = date.split(' ')[1];
		return datePart [1]+'/'+datePart [0]+'/'+datePart [2]+' '+timePart;
	}
	return date;
};

var showStdSellPrice = function(obj) {
	return roundDecimal(obj.std_sell_price, 2);// defect 6936
};
function roundDecimal(value, noOfDigits) {
	var str = Number(value).toFixed(noOfDigits);
	/*if (str.substr(str.length - 4, str.length) == ".000") {
		return value;
	/*} else {*/
		return str;
	//}// Defect_7289
}

/**
 * Frames the print screen content
 * 
 * @param data
 */
/*
 * function frameReportStkAdj(data) { var content = ''; var headerContent = '';
 * headerContent = '<label><strong>Adjustment Log Report</strong></label><div
 * style="float:right"><label class="subtitle">' + $("#posSite").val() + '</label><label
 * class="subtitle">|<label><label class="subtitle">' +
 * $("#posSiteName").val() + '</label></div></br></br><label
 * class="subtitle-bold">' + 'Report for:</label></br><label
 * class="subtitle">Department: ' + deptName + '|' + articleDtlPrint + '|Deleted
 * PLUs Included' + '</label></br></br><label class="subtitle">Total <strong
 * id="noRecords">' + totalRecords + '</strong> records </label>';
 * 
 * var printHeadInnerTable = '<table style="font-size: 15px;"
 * class="printDeviceLogTable"><tr><th>User ID</th><th align="left">Name</th><th align="left">Device
 * ID</th><th align="left">Type</th><th align="left">Logon Date</th><th align="left">Log-off
 * Date</th><th align="left">Duration</th></tr>'; content +=
 * printHeadInnerTable; var printFoot = '<div style="height: 30px
 * !important;margin-top:10px;font-size: 15px;" class="width98">'
 *  + ' <div class="width35 margin5 left inline-block" style="float:left;">' + '
 * <label class="bold">Printed on: </label>' + '<label class="currentDate"></label>' + '<label
 * class="separator">|</label>' + '<label class="currentTime"></label>' + '</div>' + '<div
 * class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End
 * of Report</strong></div></div>' + '<div class="width35 inline-block
 * right">' + '<div class=" lineheight15 margin5 text-align-right ">Page'
 *  + '<label class="currentPagePrint">1</label> of '
 *  + '<label class="totalPage">1</label>'
 *  + ' </div>' + '</div>' + '</div>'; var count = 0; for ( var i = 0; i <
 * data.length; i++) { content += '<tr class="border_bottom">' + '<td style="width:10%" align="center">' +
 * data[i].userid + '</td><td  align="left">' + data[i].user_name + '</td><td  align="left">' +
 * data[i].device_id + '</td><td  align="left">' + data[i].device_name + '</td><td  align="left">' +
 * data[i].logon_date + '</td><td  align="left">' + data[i].logoff_date + '</td><td  align="left">' +
 * data[i].duration + '</td></tr>'; if (i == 13) { count = 0; content += '</tbody></table>' +
 * printFoot + printHeadInnerTable; } else { if (i == (data.length - 1)) { if
 * (count != 19) { for ( var n = 0; n < (18 - count); n++) { content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; } }
 * content += '</tbody></table>' + printFoot; } else if (count == 19) { count =
 * 0; content += '</tbody></table>' + printFoot + '</br>' +
 * printHeadInnerTable; }
 *  } count++; }
 * 
 * $('#printbodyForStockAdj') .html('') .append(headerContent + content)
 * .append( '<link rel="stylesheet" href="../../styles/reportPrintStyle.css"
 * />'); $('.currentDate').text(dateformat());
 * $('.currentTime').text(timeformat()); var len = 0;
 * $('.currentPagePrint').each(function() { len++; $(this).text(len); });
 * $('.totalPage').text($('.currentPagePrint').length);
 * $('.endOfReport:last').removeClass('hideBlock');// To show in the last page. }
 */

/**
 * Frames the content for print screen
 * 
 * @param data
 */
function frameReportStkAdj(sapCallFlag) {
	var content = '';
	var headerContent = '';
	var map = '';
	var firstpagecreated = false;
	data = responseO;

	headerContent = '<label><strong>Adjustment Log Report</strong></label><div style="float:right"><label class="subtitle">'
			+ $("#posSite").val()
			+ '</label><label class="subtitle">|<label><label class="subtitle">'
			+ $("#posSiteName").val()
			+ '</label></div></br></br><label class="subtitle-bold">'
			+ 'Report for:</label></br><label class="subtitle"> '
			+ deptNamePrint
			+ catNamePrint
			+ scatNamePrint
			+ segNamePrint
			+ articleDtlPrint
			+ '</label></br></br><label class="subtitle">Total <strong id="noRecords">'
			+ totalRecords + '</strong> records </label>';

	// Group By - This return map{key:groupby,value:[obj,obj,obj]}
	if (sapCallFlag) {
		if ($('#Report_Stk_Adj_article_no__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.article_no;
			});
		} else if ($('#Report_Stk_Adj_reason_desc__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.reason_desc;
			});
		} else if ($('#Report_Stk_Adj_adj_date__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.adj_date;
			});
		} else if ($('#Report_Stk_Adj_user_name__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.user_name;
			});
		} else {
			map = {
				"InitialPageLoad" : data
			};
		}

	} else {
		if ($('#Report_Stk_Adj_article_no__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.article_no;
			});
		} else if ($('#Report_Stk_Adj_reason_code__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.reason_code_name;
			});
		} else if ($('#Report_Stk_Adj_adjustment_date__grp_radio').is(
				':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.date_time_sap;
			});
		} else if ($('#Report_Stk_Adj_user_name__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.user_name;
			});
		} else {
			map = {
				"InitialPageLoad" : data
			};
		}
	}

	totalLen = 0;
	totalLines = 0;
	for ( var m in map) {
		totalLen++;
		for ( var i = 0; i < map[m].length; i++) {
			totalLen++;
			if (map[m][i].article_desc.length >= 15) {
				totalLen = totalLen + 0.5
						* (map[m][i].article_desc.length / 15);
			}
		}
	}

	content = '';
	var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;height:90%;min-height:500px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th width="10px">Article</th><th align="left" width="7px">Description</th><th align="left" width="15px">Reason</th><th align="left" width="10px">Date & Time</th><th align="left" width="10px">User</th><th align="left" width="10px">Qty. Adjusted</th><th align="left" width="10px">Std. Sell Price ($)</th><th align="left" width="10px">Stock Adjusted Value ($)</th><th align="left" width="10px">Additional Info</th></tr></thead><tbody style="min-height:650px">';
	var printHeadInnerTable1 = '<div class="page"><table style="font-size: 15px;height:70%;min-height:250px;max-height:250px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th width="10px">Article</th><th align="left" width="7px">Description</th><th align="left" width="15px">Reason</th><th align="left" width="10px">Date & Time</th><th align="left" width="10px">User</th><th align="left" width="10px">Qty. Adjusted</th><th align="left" width="10px">Std. Sell Price ($)</th><th align="left" width="10px">Stock Adjusted Value ($)</th><th align="left" width="10px">Additional Info</th></tr></thead><tbody style="min-height:650px">';
	if (firstpagecreated) {
		content += printHeadInnerTable;
	} else {
		content += printHeadInnerTable1;
	}

	/*
	 * var printHeadInnerTable = '<div class="page"><table style="font-size:
	 * 15px;height:90%;min-height:500px;table-layout: fixed; width: 1100px;"
	 * class="printDeviceLogTable"><thead><tr><th width="9%">Article</th><th align="left" width="10%">Description</th><th align="left" width="6%">Reason</th><th align="left" width="10%">Date &
	 * Time</th><th align="left" width=9%">User</th><th align="left" width="9%">Qty.
	 * Adjusted</th><th align="left" width="9%">Std. Sell Price ($)</th><th align="left" width="19%">Stock
	 * Adjusted Value ($)</th><th align="left" width="15%">Additional Info</th></tr></thead><tbody
	 * style="min-height:650px">';
	 * 
	 * content += printHeadInnerTable;
	 */
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

			+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator">|</label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page'
			+ '<label class="currentPagePrint">1</label> of '
			+ '<label class="totalPage">1</label>'
			+ ' </div>'
			+ '</div>'
			+ '</div>';
	var count = 0;

	for ( var m in map) {
		if (m != 'InitialPageLoad') {
			content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
					+ m + '</td></tr>';
			count = count + 1;
			totalLines++;
		}
		for ( var i = 0; i < map[m].length; i++) {
			if (sapCallFlag) {
				content += constructReportRowFromSap(map[m][i]);
			} else {
				content += constructReportRow(map[m][i]);
			}
			// Split Pages - Starts
			var firstPageRecords = 13;
			var otherPageRecords = 15;
			totalLines++;
			if (map[m][i].article_desc.length >= 15) {
				count = count + 0.5 * (map[m][i].article_desc.length / 15);
				totalLines = totalLines + 0.5
						* (map[m][i].article_desc.length / 15);
			}
			if (totalLines >= (totalLen)) {
				content += '</tbody></table>';
				content += '<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
			}
			if (totalLines >= firstPageRecords && !firstpagecreated) {
				count = 0;
				content += '</tbody></table>' + printFoot + '</div>'
						+ printHeadInnerTable;
				firstpagecreated = true;
			} else {
				if (totalLines >= (totalLen)) {
					if (count != otherPageRecords
							&& totalLines > firstPageRecords) {
						content += '<table><tbody>';
						for ( var n = 0; n < ((otherPageRecords) - count); n++) {
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					} else {
						content += '<table><tbody>';
						for ( var n = 0; n < ((firstPageRecords) - count); n++) {
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					}
					content += '</tbody></table>' + printFoot + '</div>';
				} else if (count >= otherPageRecords) {
					count = 0;
					content += '</tbody></table>' + printFoot + '</div>';

					if (firstpagecreated) {
						content += printHeadInnerTable;
					} else {
						content += printHeadInnerTable1;
					}
				}

			}
			count++;
			// Split Pages - Ends
		}
	}
	$('#printbodyForStockAdj')
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

function constructReportRow(obj) {
	var reportRow = '<tr class="border_bottom"><td  align="left">'
			+ obj.article_no + '</td><td  align="left">' + obj.article_desc
			+ '</td><td class="centerValue">' + obj.reason_desc
			+ '</td><td class="centerValue">' + obj.adj_date_time
			+ '</td><td class="centerValue">' + obj.user_name
			+ '</td><td class="centerValue">' + obj.adjustment_value
			+ '</td><td class="centerValue">' + obj.std_sell_price
			+ '</td><td class="centerValue">' + obj.stk_adj_value
			+ '</td><td class="centerValue">' + obj.additional_info
			+ '</td></tr>';
	return reportRow;
}

function constructReportRowFromSap(obj) {
	var reportRow = '<tr class="border_bottom"><td  align="left">'
			+ obj.article_no + '</td><td  align="left">' + obj.article_desc
			+ '</td><td class="centerValue">' + obj.reason_code_name
			+ '</td><td class="centerValue">' + obj.date_time_sap
			+ '</td><td class="centerValue">' + obj.user_name
			+ '</td><td class="centerValue">' + obj.adjustment_qty
			+ '</td><td class="centerValue">' + obj.std_sell_price
			+ '</td><td class="centerValue">' + obj.adjustment_value
			+ '</td><td class="centerValue">' + obj.mvmt_type_desc
			+ '</td></tr>';
	return reportRow;
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
										'Adjustment Log Report');
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

/**
 * Populates value in department drop down
 */
function populateDepartmentDropDown() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input  class="depDrpDwnChkBx" type="checkbox" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label for="'
									+ temList[i].node_id
									+ '" class="dropdownLabel">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('#depDropDwnList #hierDrp').append(content);
						$('#depDropDwnList ')
								.append(
										'<div class="done-cancel-btn"><li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn" id="deptdropdownCancelBtn"><a href="#">Cancel</a></label></li></div>')
								.removeClass('muliple-checkbox');
						$("#dropdownDoneBtn").on("click", function() {// DOne
																		// btn
																		// inside
																		// drop
																		// down
							$(".selectDropdown").removeClass('active');
						});
						$("#deptdropdownCancelBtn").on("click", function() {// cancel
																			// button
																			// inside
																			// dropdown
							$(".selectDropdown").removeClass('active');		
							bindAfterDepDrpDwnReady();
						});
						bindAfterDepDrpDwnReady();
						if (($("#salesOrg").val() == "1010") || ($("#salesOrg").val() == "1015")){      //For Defect 7448
							
						$( "#allDeptChkBox" ).trigger('click');
						}
					}
				},
				error : function(response) {
				},
			});

}
/**
 * Binds the click event for All departments checkbox under Departments drop
 * down in Create stock take page
 */

function bindAllDeptCheckBox() {
	// Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function() {
		if ($("#allDeptChkBox").is(':checked')) {// Select all
			$("#deptDropDwnLabel").html('All Departments');// Department drop
															// down value
															// displayed
			$('.depDropDown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		} else { // unselect all
			$("#deptDropDwnLabel").html('Select Departments');// Department
			$('#depDropDwnList').find('.depDrpDwnChkBx').prop('checked', false);													// drop down
																// value
																// displayed
			$('.depDropDown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$("#deptSelectAll").prop('checked', false);
		}
		
		
	});
	
}
function bindAfterDepDrpDwnReady() {
		
	$('#depDropDwnList').find("li input[type=checkbox]")
			.change(
					function() {
						if ($(this).attr('id') != "allDeptChkBox") {
							onChangeDeptDropDown();
							if ($(this).is(':checked')) {
								$(
										'#deptlst :input[value="'
												+ $(this).attr('id') + '"]')
										.prop('checked', true);
							} else {
								$(
										'#deptlst :input[value="'
												+ $(this).attr('id') + '"]')
										.prop('checked', false);
							}
						}
					});
	// $("#allDeptChkBox").trigger('click');//to sel all dept by default
	selectDefPrimaryDepts();

}
function selectDefPrimaryDepts() {
	// Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if (userPrimaryDepts != undefined && userPrimaryDepts.length > 0) {
		for ( var i = 0; i < userPrimaryDepts.length; i++) {
			$("#depDropDwnList").find("#" + userPrimaryDepts[i]).prop(
					'checked', true);// To check the drop down
			$('#deptlst').find("#" + userPrimaryDepts[i]).prop('checked', true);// To
																				// check
																				// dept
																				// in
																				// article
																				// hierarchy
		}
	}

	setDeptLblBasedOnDefPrimaryDept();
	onChangeDeptDropDown();

}
function selectDefPrimaryDeptList() {
	// Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if (userPrimaryDepts != undefined && userPrimaryDepts.length > 0) {
		for ( var i = 0; i < userPrimaryDepts.length; i++) {
			$('#deptlst').find("#" + userPrimaryDepts[i]).prop('checked', true);// To
																				// check
																				// dept
																				// in
																				// article
																				// hierarchy
		}
	}

	$('#deptLstCnt').text(
			$('#deptlst').find('input[name="departmentList"]:checked').length);
}

function setDeptLblBasedOnDefPrimaryDept() {
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	triggeredAllDept=false;
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	
		if (userPrimaryDepts == undefined || userPrimaryDepts.length == 0 || userPrimaryDepts.length <= 0 ) {
		$("#deptDropDwnLabel").html('Select Departments');
		$('#depDropDwnList').find('.depDrpDwnChkBx').prop('checked', false);		// Department drop
															// down value
															// displayed
	}
		
		else if (userPrimaryDepts.length == 1) {
		$("#deptDropDwnLabel").html(
				$('.dropdown').find("#" + userPrimaryDepts[0]).parent().find(
						'label').html());
	} else if (userPrimaryDepts.length == $(".depDrpDwnChkBx").length) {
		
		$("#deptDropDwnLabel").html('All Departments');// Department drop down
														// value displayed
	} else {
		$("#deptDropDwnLabel").html('Multiple Departments');// Department drop
															// down value
															// displayed
	}
		if ($(".depDrpDwnChkBx").length == '1'){		// For defect 7448
			
			$("#deptDropDwnLabel").html('All Departments');
}

		if($('#depDropDwnList').find('.depDrpDwnChkBx:checked').length==0){
			$("#allDeptChkBox").prop("checked", true);
			triggeredAllDept=true;
				$('#depDropDwnList').find('.depDrpDwnChkBx').prop('checked', true);		
				$("#deptDropDwnLabel").html('All Departments');
				}
		if(triggeredAllDept){
			if($('#depDropDwnList').find('.depDrpDwnChkBx:checked').length==0){
				$("#allDeptChkBox").prop("checked", true);
				$("#deptSelectAll").prop("checked", true);
					$('#depDropDwnList').find('.depDrpDwnChkBx').prop('checked', true);	
					$("input[name=departmentList]").prop('checked', true);	
					$("#deptDropDwnLabel").html('All Departments');
					}
		}
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeDeptDropDown() {

		//For Defect 7448
		if ($('.dropdownLabel:checked').length==0) {
				$("#allDeptChkBox").prop("checked", false);
			}
	if ($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length) {
		$("#allDeptChkBox").prop("checked", true);
		$("#deptSelectAll").prop('checked', true);
		$("#deptDropDwnLabel").html('All Departments');// Department drop down
														// value displayed
	}
	else if ($('.depDrpDwnChkBx:checked').length == 0) {
		$("#deptDropDwnLabel").html('Select Departments');// Department drop
															// down value
															// displayed
		// $("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department
		// drop down value displayed
	} else if ($('.depDrpDwnChkBx:checked').length == 1) {
		$("#deptDropDwnLabel").html(
				$('.depDrpDwnChkBx:checked').parent().find('label').html());
	} else {
		$("#allDeptChkBox").prop("checked", false);
		$("#deptSelectAll").prop('checked', false);
		$("#deptDropDwnLabel").html('Multiple Departments');// Department drop
															// down value
															// displayed
	}
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
	return addDays(1, -7);// Defect_3657Apply a date range- default is 7 days
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
function validateInputs() {
	var rtnFlag = true;
	if ($("#dateFrom").val() != '') {
		if (isFutureDate($("#dateFrom").val())) {
			rtnFlag = false;
			$.fn.showCustomMsg([ 'From date cannot be a future date.' ], error,
					'Adjustment Log Report');
			return rtnFlag;

		}
	}
	if ($("#dateTo").val() != '') {
		if (isFutureDate($("#dateTo").val())) {
			rtnFlag = false;
			$.fn.showCustomMsg([ 'To date cannot be a future date.' ], error,
					'Adjustment Log Report');
			return rtnFlag;
		}
	}
	return rtnFlag;
}

function getReasonCode() {
	var param = {
		"iv_reason_code" : "ALL",
		"iv_site" : $("#posSite").val(),
		"iv_sales_org" : ""
	};

	console.log(reportReasonCodeUrl + ' ' + JSON.stringify(param));

	$
			.post(reportReasonCodeUrl, JSON.stringify(param), function() {
				startLoading();
			})
			.done(
					function(response) {
						var reasonStr = '';
						for ( var i = 0; i < response.length; i++) {
							reasonStr += '<li><input class="reasonDrpDwnChkBx" type="checkbox" id="'
									+ response[i].reason_code
									+ '" name="'
									+ response[i].reason_code
									+ '"><label class="dropdownLabel" for="'
									+ response[i].reason_code
									+ '">'
									+ response[i].long_desc + '</label></li>';
						}
						$('#pas .dropdown .inner-drop-down').append(reasonStr);
						$('#pas .dropdown')
								.append(
										'<div class="done-cancel-btn"><li class="selectDropdownActions"><label id="reasondropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn" id="reasondropdownCancelBtn"><a href="#">Cancel</a></label></li></div>');
						bindAfterReasonDrpDwnReady();
						$("#allReasonChckBox").trigger('click');
						$("#reasondropdownDoneBtn").on("click", function() {// DOne
																			// btn
																			// inside
																			// drop
																			// down
							$("#pas").removeClass('active');
						});
						$("#reasondropdownCancelBtn")
								.on(
										"click",
										function() {// cancel button inside
													// dropdown
											// $("#pas").removeClass('active');
											if ($("#allReasonChckBox").prop(
													'checked') == false) {
												$("#allReasonChckBox").trigger(
														'click');// to select
																	// all user
																	// by
																	// default
											}
											bindAfterReasonDrpDwnReady();
										});
						console.log("success");
					})
			.fail(
					function() {
						$.fn
								.showCustomMsg(
										[ 'Unable to establish connection with local DB.' ],
										error, 'Adjustment Log Report');
					}).always(function() {
				stopLoading();
			});
}
function populateUserDropDown(reportType) {
	var param = {
		"iv_report_type" : reportType
	};
	$('#pus .dropdown .inner-drop-down').html('');
	$('#pus .dropdown .inner-drop-down')
			.append(
					'<li><input type="checkbox" id="allUserChckBox"><label class="dropdownLabel">All users</label></li>');
	console.log(getStockAdjUsers + ' ' + JSON.stringify(param));

	$
			.post(getStockAdjUsers, JSON.stringify(param), function() {
				startLoading();
			})
			.done(
					function(response) {
						var reasonStr = '';
						for ( var i = 0; i < response.length; i++) {
							reasonStr += '<li><input class="userDrpDwnChkBx" type="checkbox" id="'
									+ response[i].usr_id
									+ '" name="'
									+ response[i].usr_id
									+ '"><label class="dropdownLabel" for="'
									+ response[i].usr_id
									+ '">'
									+ response[i].usr_name + '</label></li>';
						}

						$('#pus .dropdown .inner-drop-down').append(reasonStr);
						if ($('#pus .dropdown').find('#userdropdownDoneBtn').length == 0)
							$('#pus .dropdown')
									.append(
											'<div class="done-cancel-btn"><li class="selectDropdownActions"><label id="userdropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn" id="userdropdownCancelBtn"><a href="#">Cancel</a></label></li></div>');
						bindAfterUserDrpDwnReady();
						$("#allUserChckBox").trigger('click');// to select all
																// user by
																// default
						$("#userdropdownDoneBtn").on("click", function() {// DOne
																			// btn
																			// inside
																			// drop
																			// down
							$("#pus").removeClass('active');
						});
						$("#userdropdownCancelBtn").on("click", function() {// cancel
																			// button
																			// inside
																			// dropdown
							// $("#pus").removeClass('active');
							if ($("#allUserChckBox").prop('checked') == false) {
								$("#allUserChckBox").trigger('click');// to
																		// select
																		// all
																		// user
																		// by
																		// default
							}
							bindAfterUserDrpDwnReady();

						});
						console.log("success");
					})
			.fail(
					function() {
						$.fn
								.showCustomMsg(
										[ 'Unable to establish connection with local DB.' ],
										error, 'Adjustment Log Report');
					}).always(function() {
				stopLoading();
			});
}
function bindAfterReasonDrpDwnReady() {
	$('#reasonDropDwnList').find("li input[type=checkbox]").change(function() {
		if ($(this).attr('id') != "allReasonChckBox") {
			onChangeReasonDropDown();
		}
	});

}
function bindAllReasonCheckBox() {
	// Registers dept dropdown's select 'All departments' event
	$("#allReasonChckBox").click(function() {
		if ($("#allReasonChckBox").is(':checked')) {// Select all
			$("#reasonDropDwnLabel").html('All reasons');// Department drop
															// down value
															// displayed
			$('.reasonDropDwn').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});

		} else { // unselect all
			$("#reasonDropDwnLabel").html('Select reasons');// Department drop
															// down value
															// displayed
			$('.reasonDropDwn').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
		}
	});
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeReasonDropDown() {
	if ($('.reasonDrpDwnChkBx:checked').length == $(".reasonDrpDwnChkBx").length) {
		$("#allReasonChckBox").prop("checked", true);
		$("#reasonDropDwnLabel").html('All reasons');// Department drop down
														// value displayed
	} else if ($('.reasonDrpDwnChkBx:checked').length == 0) {
		$("#reasonDropDwnLabel").html('Select reasons');// Department drop down
														// value displayed
		// $("#userDropDwnLabel").html($('.reasonDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department
		// drop down value displayed
	} else if ($('.reasonDrpDwnChkBx:checked').length == 1) {
		$("#reasonDropDwnLabel").html(
				$('.reasonDrpDwnChkBx:checked').parent().find('label').html());
	} else {
		$("#allReasonChckBox").prop("checked", false);
		$("#reasonDropDwnLabel").html('Multiple reasons');// Department drop
															// down value
															// displayed
	}
}
function bindAfterUserDrpDwnReady() {
	$('#userDropDwnList').find("li input[type=checkbox]").change(function() {
		if ($(this).attr('id') != "allUserChckBox") {
			onChangeUserDropDown();
		}
	});

}
function bindAllUserCheckBox() {
	// Registers dept dropdown's select 'All departments' event
	$("#allUserChckBox").click(function() {
		if ($("#allUserChckBox").is(':checked')) {// Select all
			$("#userDropDwnLabel").html('All users');// Department drop down
														// value displayed
			$('.userDropDwn').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});

		} else { // unselect all
			$("#userDropDwnLabel").html('Select users');// Department drop down
														// value displayed
			$('.userDropDwn').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
		}
	});
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeUserDropDown() {
	if ($('.userDrpDwnChkBx:checked').length == $(".userDrpDwnChkBx").length) {
		$("#allUserChckBox").prop("checked", true);
		$("#userDropDwnLabel").html('All users');// Department drop down
													// value displayed
	} else if ($('.userDrpDwnChkBx:checked').length == 0) {
		$("#userDropDwnLabel").html('Select users');// Department drop down
													// value displayed
		// $("#userDropDwnLabel").html($('.userDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department
		// drop down value displayed
	} else if ($('.userDrpDwnChkBx:checked').length == 1) {
		$("#userDropDwnLabel").html(
				$('.userDrpDwnChkBx:checked').parent().find('label').html());
	} else {
		$("#allUserChckBox").prop("checked", false);
		$("#userDropDwnLabel").html('Multiple users');// Department drop down
														// value displayed
	}
}

$.fn.isWithin99 = function() {
	this.each(function() {
		$(this).keypress(
				function(e) {
					// console.log(e.which);
					// if the letter is not digit then display error
					// and don't type anything
					if (e.which != 8 && e.which != 0
							&& (e.which < 48 || e.which > 57)) {
						// display error message
						return false;
					}

					if (parseInt($(this).val()) > 99) {
						return false;
					}

				});
	});

};
function toggleAdditionalFilter(flag) {
	var $option = $('#addParameter').find('.multipleOptions .filter');
	//$option.val('Select filter');
	$option.find('option').removeClass('hideBlock');
	if (flag == 'SOH') {
		$option.find('option.onlyPlanOGram').addClass('hideBlock');
		$option.find('option.onlyFacing').addClass('hideBlock');
	} else if (flag == 'M') {
		$option.find('option').addClass('hideBlock');
		$option.find('option.onlyPlanOGram').removeClass('hideBlock');
	} else {
		$option.find('option').addClass('hideBlock');
		$option.find('option.onlyFacing').removeClass('hideBlock');
	}
}
