var report_name = 'Report_RTC';
var report_title = '';
var totalRecords = '';
var requestParam = '';
var printHeadInnerTable = '';
var content = '';
var $tblhold = '';
var responseO = '';
var totalLen = 0;
var totalLines = 0;
var headerContent = '';
var pluArticleMap = {};
var articleRangedFlagMap = {};
var barCodeList = new Array();
var allInputs = '';
var groupByType = 'DEPT';
var dateToBePrinted = '';
var rtcConfiguredDate  = 35;
$(function() {
	defaultOption =  true;
	//$('head').append('<link rel="stylesheet" href="../../styles/woolworths.css" type="text/css" />'); 
	// Code for adding scorllers to the table	
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
	
	 $("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	 }); 
	
	//When opening by default cat,subcat,seg select all to be disabled
	$("#catSelectAll").attr("disabled", true);
	$("#sCatSelectAll").attr("disabled", true);
	$("#segSelectAll").attr("disabled", true);
	
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
		var choose = $(".parameterOptionsRadio input[type=radio]:checked").val();// Choose
		if(choose == "single" && $("#searchBaiscBox").val().length > 0){
			callArticleBasicSearchService($("#searchBaiscBox").val(),true);	
		}else{
			handleGenReport();
		}		
	});
	$('#oldDataDiv').addClass('hideBlock');
	bindPrint();
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
		$("#segDiv").find(".totalCount").addClass('hideBlock');;
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
	$('#multiple').click(function() {
		$(".articleHierarchy").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');

	});

	$('#single').click(function() {
		$(".articleList").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
		$("#articleHierarchy").addClass('hideBlock');
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
		//minDate : -30,
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

		$("#departmentTable").removeClass('hideBlock');
		$("#articleTable").addClass('hideBlock');
		$("#markTable").addClass('hideBlock');

	});

	$('#deptName').click(function() {
		$("#departmentTable").removeClass('hideBlock');
		$("#articleTable").addClass('hideBlock');
		$("#markTable").addClass('hideBlock');
	});

	$('#del').click(function() {
		$("#departmentTable").addClass('hideBlock');
		$("#articleTable").removeClass('hideBlock');
		$("#markTable").addClass('hideBlock');
	});

	$('#supp').click(function() {
		$("#departmentTable").addClass('hideBlock');
		$("#articleTable").addClass('hideBlock');
		$("#markTable").removeClass('hideBlock');
	});

	// Checkbox DropDown functions
	$(
			".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn")
			.click(function() {
				$(".selectDropdown").removeClass('active');
			});

	$("#ds").click(function() {
		if ($('#pds').hasClass('active')) {
			$("#pds").removeClass('active');
		} else {
			$("#pds").addClass('active');
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
						if (event.which == 13) {//Enter key
							 if ($("#searchBaiscBox").val().length > 0) {
								 if($("#searchBaiscBoxList").find("#"+$("#searchBaiscBox").val().split('-')[0]).length > 0){
									 $.fn.showCustomMsg(['Article added already.'],error,'PLU Report');
								 }else{
									 //$("#searchBaiscBoxList").append('<li><label class="articleBasicLabel" id="'+$("#searchBaiscBox").val().split('-')[0]+'">'+$("#searchBaiscBox").val()+'</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
									 callArticleBasicSearchService($("#searchBaiscBox").val().split('-')[0]);
								 }						
								$("#searchBaiscBox").val('');
								/*$(".ui-menu").children().remove();//To hide the list of suggestions displayed
								$(".ui-menu").css("display", "none");//To hide the list of suggestions displayed
		*/						return false;
							} 
						}
					});
	
	populateDepartmentDropDown();

	populateDepartment("checkbox");

	createAutoSuggestChange($('.reportWrapper').find('#searchBaiscBox')); //Auto suggestion for articles
	
	//By default all department to be selected.//TODO 	
	//$('#depDropDwnList').find("input[type=checkbox]").prop('checked', true);
				
	//$('#deptlst').find("input[type=checkbox]").prop('checked', true);
	$("#allDeptChkBox").prop("checked",true);
	$("#deptSelectAll").prop('checked', true);
	$("#ds").html('All Departments');
	
	//On click of Department drop down select all check box
	$("#allDeptChkBox").click(function() {
		if ($("#allDeptChkBox").is(':checked')) {// Select all
			$("#deptSelectAll").trigger('click');
			$('.dropdown').find("input[type=checkbox]").prop('checked', true);
		} else { // unselect all
			$("#deptSelectAll").trigger('click');
			$('.dropdown').find("input[type=checkbox]").prop('checked', false);
		}
	});
	//$("#depDropDwnList #allDeptChkBox").prop("checked",true);
	// on change of Department drop down  check box
	/*$(document)
			.on(
					'change',
					$('.depDrpDwnChkBx').find("input[type=checkbox]"),
					function(e) {
							$('#deptlst').find('#'+$(e.target).prop('id')).prop('checked',$(e.target).prop('checked'));
							if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
								$("#allDeptChkBox").prop("checked",true);
								$("#deptSelectAll").prop('checked', true);
								$("#ds").html('All Departments');//Department drop down value displayed
							}else if($('.depDrpDwnChkBx:checked').length == 0){
								$("#ds").html('Select Deparments');//Department drop down value displayed
								//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
							}else if($('.depDrpDwnChkBx:checked').length == 1){
								$("#ds").html($('.depDrpDwnChkBx:checked').parent().find('label').html());
							}else{
								$("#allDeptChkBox").prop("checked",false);
								$("#deptSelectAll").prop('checked', false);
								$("#ds").html('Multiple Departments');//Department drop down value displayed
							}	
					});*/
	//On chnage of group by option
	$(".groupByRadios input:radio").click(function() {
		loadReportContentTbl();
	});
	
	//Close Button
	$("#closeLink").click(function(){
		$('#accordion').accordion({active : true });	
	});
	
	$("#dateFrom").val(dateFromformat());
	$("#dateTo").val(dateToformat());
	
	/*$(document).on('click', '.paramter input[type=radio]', function(){
		console.log($(this));
		loadReportContentTbl(responseO);
	});*/
	/*$(document).on('click', '.page-link', function(){
		 if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {	//to add hideblock on pagination			
				$.each($("#Report_RTC_table tr.subHeader"), function() { 
			           // $(this).children(":eq(2)").before($(this).children(":eq(0)"));
			            //$(this).children(":eq(0)").before($(this).children(":eq(2)"));
			        });
					$.each($("#Report_RTC_table tr"), function() { 
				          if($(this).attr('id') != undefined && $(this).attr('id') != ''){
				        	  $(this).children(":eq(2)").after($(this).children(":eq(5)"));
				          }
				    });
					
					$(".ContentTable th[data_key='article_no']").addClass("hideBlock");
					$(".ContentTable td[data_key='article_no']").addClass("hideBlock");

					$(".ContentTable th[data_key='article_desc']").addClass("hideBlock");
					$(".ContentTable td[data_key='article_desc']").addClass("hideBlock");

			}
	});
*/
	$('#dateFrom').change(function(){
		var $elem = $(this);
		var val = $elem.val();
		var yesterday = getDesiredPastDate(1);
		if(isValidDate(val) && isDateRangeExceed(val,yesterday, rtcConfiguredDate)){
		   $.fn.showCustomMsg(['You are trying to access very old data, cannot include Article/Hierarchy filter for old records.'],'info','RTC Report','','');
		}
	});
});
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
							
							
						},
						minLength : 2,
						autoFocus : true
					});
	$("#searchBaiscBox").val('');
}
function handleGenReport(){
	var $from = $('#dateFrom');
	var fromVal = $from.val();
	var $to = $('#dateTo');
	var toVal = $to.val();
	var yesterday = getDesiredPastDate(1);
	var onlyPdf = false;
	var bothPdfLocal = false;
	var onlyLocal = false;
	var valid = validateDates(fromVal,toVal,'RTC report');
	if(valid){
		var oldFrmDt = isDateRangeExceed(fromVal,yesterday, rtcConfiguredDate);
		var oldToDt = isDateRangeExceed(toVal,yesterday, rtcConfiguredDate);
		onlyPdf = (oldFrmDt && oldToDt);
		onlyLocal = (!oldFrmDt && !oldToDt);
		bothPdfLocal = !oldToDt;
		if(onlyPdf){
			getAllDates();
			$('#oldDataDiv').removeClass('hideBlock');
		}else if(onlyLocal){
			buildReqParam();
			callReportService(true);
			$('#oldDataDiv').addClass('hideBlock');
		}else if(bothPdfLocal){
			buildReqParam();
			callReportService(false);
			getAllDates();
			$('#oldDataDiv').removeClass('hideBlock');
		}
	}
	/*if(isDateRangeExceed($("#dateFrom").val(),getDesiredPastDate(1), 28)){
		/*if(!isOldDates())
			{
		$.fn.showCustomMsg(['Date range should not exceed 4 weeks'],error,'Reduced To Clear Report');
		$('#oldDataDiv').addClass('hideBlock');
			}
		else
			{
			getAllDates();
			$('#oldDataDiv').removeClass('hideBlock');*/
		//	$('.oldDates').removeClass('hideClass');
	/*}*/
	//} 
	/*else if(buildReqParam()){
		callReportService();
		$('#oldDataDiv').addClass('hideBlock');
	//	$('#oldDataDiv').removeClass('hideBlock').addClass('hideBlock');
	}*/
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
			"iv_style":"",
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
									handleGenReport();
								}
							} else if (response.length > 1) {
								// selectOptionc
								$.fn.loadArticlePopUpForStkAdjReport(response,
										onAddToList, '',
										onArticleTdSelectInStockAdjustReport,
										checkboxOption, $("#searchBaiscBox")
												.val());
							}
							setDataToController();

						} else {
							// articleBasicList[articleBasicList.length] =
							// article;
							if (response != undefined && response.length <= 0) {
								$.fn
										.showCustomMsg(
												[ 'Sorry, No results found for the search criteria. Please try again.' ],
												success,
												'RTC Report');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
												error, 'RTC Report');
							}
							stopLoading();
						}
						
					}).fail(function() {
						stopLoading();
			}).always(function() {
			});
}
function setDataToController(){
	var groupBy = "";
	var conte = [];
	var $rtcTbl = $('#'+report_name+'_table');
	if($rtcTbl.data('confObj').applyGroup){
		conte = $rtcTbl.data('confObj').groupedCont;
		groupBy = $('#'+report_name+'_table').data('confObj').cur_gru_col;
		if(groupBy == "department_name"){
			groupBy = "D";
		}else if(groupBy == "article_no"){
			groupBy = "A";
		}else if(groupBy == "markdown_percentage"){
			groupBy = "M";
		}
	}else{
		conte = $rtcTbl.data('confObj').content;
	}
	var toSend = {'data':conte,'reportFor':allInputs,'groupBy':groupBy};
	console.log(toSend);
	$.ajax({
    type: "POST",
    url: "rtcTablePrint.htm",
    data: JSON.stringify(toSend),
    contentType: "application/json",
    beforeSend: function() {
    	  startLoading();
      }
  }).done(function(response) {
	  console.log("Set to controller:",response);
	 
		/*$('#rtcReportForm').attr("action", "downloadRTCReportPdf.pdf");
		$('#rtcReportForm').attr('target','_blank');
		$('#rtcReportForm').attr('method','get');
		$('#rtcReportForm').submit();
		stopLoading();*/
							
  }).fail(function() {
	  console.log('Sorry, Some technical issue occured.',error,'RTC Report');
  }).always(function() {
	  stopLoading();
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
function removeArticleFromBasicList(parentElem){
	$(parentElem).remove();	
	
}

/*function isOldDates(){
	var dateFrom = $("#dateFrom").val();// Date From
	var dateTo = $("#dateTo").val();// Date To
	
	dateFrom = dateFrom.split("/")[1]+"/"+dateFrom.split("/")[0]+"/"+dateFrom.split("/")[2];
	dateTo = dateTo.split("/")[1]+"/"+dateTo.split("/")[0]+"/"+dateTo.split("/")[2];
	Date.prototype.getWeek = function(start)
	{
	        //Calcing the starting point
	    start = start || 0;
	    var today = new Date(this.setHours(0, 0, 0, 0));
	    var day = today.getDay() - start;
	    var date = today.getDate() - day;

	        // Grabbing Start/End Dates
	    var StartDate = new Date(today.setDate(date));
	    var EndDate = new Date(today.setDate(date + 6));
	    return [StartDate, EndDate];
	};

	// test code
	var Dates = new Date().getWeek();
	var weekStartDate = new Date(Dates[0].toLocaleDateString());
	weekStartDate.setDate(weekStartDate.getDate()-49);
	// test code
	var fromDate = new Date(dateFrom);
	
	if(fromDate < weekStartDate){
		console.log("true");
		return true;
	}else{
		console.log("false");
		return false;
	}
	
	
}*/


function getAllDates(){
	
	var dateFrom = $("#dateFrom").val();// Date From
	var dateTo = $("#dateTo").val();// Date To
	
	dateFrom = dateFrom.split("/")[1]+"/"+dateFrom.split("/")[0]+"/"+dateFrom.split("/")[2];
	dateTo = dateTo.split("/")[1]+"/"+dateTo.split("/")[0]+"/"+dateTo.split("/")[2];
	
	Date.prototype.getWeek = function(start)
	{
	        //Calcing the starting point
	    start = start || 0;
	    var today = new Date(this.setHours(0, 0, 0, 0));
	    var day = today.getDay() - start;
	    var date = today.getDate() - day;

	        // Grabbing Start/End Dates
	    var StartDate = new Date(today.setDate(date));
	    var EndDate = new Date(today.setDate(date + 6));
	    return [StartDate, EndDate];
	};

	// test code
	var Dates = new Date().getWeek();
	var weekStartDate = new Date((Dates[0].getMonth()+1)+'/'+Dates[0].getDate()+'/'+(Dates[0].getFullYear()));
	weekStartDate.setDate(weekStartDate.getDate()-rtcConfiguredDate);
	// test code
	var fromDate = new Date(dateFrom);
	var toDate = new Date(dateTo);
	var dateArray;
	if(fromDate < weekStartDate && toDate < weekStartDate){
		dateArray = getDates(fromDate, toDate);
	}else{
		dateArray = getDates(fromDate, weekStartDate);
	}
	
	var content = '';
	$('.olderDates').html('');
	for (var i = 0; i < dateArray.length; i ++ ) {
		var endDat=(dateArray[i].getMonth()+1)+'/'+dateArray[i].getDate()+'/'+(dateArray[i].getFullYear());
		var endDate=new Date(endDat);
		var strtDate = new Date(endDat);
		
		endDate.setDate(endDate.getDate()+6);
	    content = '<li><a href="#"><label class="newWindowAfter" id="'+convertDate(strtDate)+'">Week'+(i+1)+"_"+convertDate(strtDate)+"_"+convertDate(endDate)+'.pdf</label></a></li>';
	    $('.olderDates').append(content);
	}
	
	$(".newWindowAfter").unbind('click');
	$(".newWindowAfter")
	.click(
			function() {
				
				window.open('rtcPrint.htm?fromDate='+this.id,'_blank');
				
			});
}

function convertDate(inputFormat) {
	  function pad(s) { return (s < 10) ? '0' + s : s; }
	  var d = new Date(inputFormat);
	  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function getDates(startDate, stopDate) {
	
	Date.prototype.addDays = function(days) {
	       var dat = new Date(this.valueOf());
	       dat.setDate(dat.getDate() + days);
	       return dat;
   };
   Date.prototype.getStDate = function() {
       var dat = new Date(this.valueOf());
       dat.setDate(dat.getDate() + (1 - dat.getDay()));
       return dat;
   };
    var dateArray = new Array();
    var currentDate = startDate.getStDate();
    var endDate = stopDate.getStDate();
    while (currentDate <= endDate) {
    	if(currentDate.getDay()===1)
    		dateArray.push(currentDate);
		currentDate = currentDate.addDays(7);
	}
    return dateArray;
  }

/**
 * Sets the request parameters
 */
function buildReqParam() {
	var articleArray = new Array();
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();

	var dateFrom = $("#dateFrom").val();// Date From
	var dateTo = $("#dateTo").val();// Date To
	var choose = $(".parameterOptionsRadio input[type=radio]:checked").val();// Choose
	headerContent = '';
	
	
	//if(valid){
		if(choose == "single"){
			$("#searchBaiscBoxList").find(".articleBasicLabel").each(function(){
				articleArray.push($(this).text().split('-')[0]);
			});
		}else if(choose == "multiple"){
			if ($("#depH").is(':checked')) {

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
				$('.dropdown').find("input[type=checkbox]:checked").each(function() {
					deptArray[deptArray.length] = $(this).val();
				});
			}
		}

		
		var dateFromArray = dateFrom.split("/");
		var dateToArray = dateTo.split("/");
		if (articleArray.length > -1 && articleArray != undefined && articleArray != '') {
			requestParam = {
				"iv_article" : articleArray.join(","),
				"iv_dept_list" : '',
				"iv_cat_list" : '',
				"iv_sub_cat_list" : '',
				"iv_seg_list" : '',
				"iv_from_date":dateFromArray[1]+"/"+dateFromArray[0]+"/"+dateFromArray[2],
			    "iv_to_date":dateToArray[1]+"/"+dateToArray[0]+"/"+dateToArray[2]
			};
		} else {
			requestParam = {
				"iv_article" : '',
				"iv_dept_list" : deptArray.join(","),
				"iv_cat_list" : catArray.join(","),
				"iv_sub_cat_list" : subCatArray.join(","),
				"iv_seg_list" : segArray.join(","),
				"iv_from_date":dateFromArray[1]+"/"+dateFromArray[0]+"/"+dateFromArray[2],
			    "iv_to_date":dateToArray[1]+"/"+dateToArray[0]+"/"+dateToArray[2]
			};
		}
		
		//Header content for print
		allInputs = '';
		var deptNamePrint = '';
		var dateFromPrint = '';
		var dateToPrint = '';
		var datePrint = '';
		var articlesPrint = '';
		deptArray = new Array();
		//Department
		if($("#depH").is(':checked')){
			$( "input[name='departmentList']" ).each(function(){
				if($(this).is(':checked')){
					deptArray[deptArray.length] = $(this).parent().find('.deptLbl').html();
				}
			});
		}else {
			if($("#allDeptChkBox").is(":checked")){
				deptArray[deptArray.length] = "ALL";
			}else{
				$('.dropdown').find("input[type=checkbox]:checked").each ( function() {
					if($(this).attr('id') != "allDeptChkBox"){
						deptArray[deptArray.length] = $(this).parent().find('.dropdownLabel').html();
					}
				});
			}			
		}
		if(deptArray.length > 0){
			deptNamePrint = " | Departments: "+deptArray.join(",");
		}
		
		dateFromPrint = dateFrom;
		dateToPrint = dateTo;
		datePrint = "Date: "+dateFromPrint+" - "+dateToPrint;
		dateToBePrinted = dateFromPrint+" - "+dateToPrint;
		if(articleArray.length > 0){
			articlesPrint = " | Articles: "+ articleArray.join(",");
		}
		//Constructs input values
		allInputs = datePrint;
		if(choose == "single"){
			allInputs += articlesPrint;
		}else if(choose ="multiple"){
			allInputs += deptNamePrint;
		}
		
	//}
	//return valid;
}

/**
 * Invokes report service
 * @param recvParam
 */
function callReportService(canDispError) {
	$("#noRecFoundDiv").addClass("hideBlock");
	$(".ContentTableWrapper").addClass('hideBlock');
	console.log(reportRTCUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
	    type: "POST",
	    url: reportRTCUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseO = response;
			//console.log(JSON.stringify(responseO));	
			if (responseO != undefined && responseO.length > 0 && responseO[0].article_desc != undefined) {
				$("#main-content").removeClass('hideBlock');
				$('#accordion').accordion({
					active : true
				});
				totalRecords = responseO.length;
				$tblhold = $("#reportContent");
				var i;
				for (i=0;i<totalRecords;i++){
					var dateAr = responseO[i].created_date_time;
					 var dateTimeSplit = dateAr.split(' ');
			            var dateSplit = dateTimeSplit[0].split('-');
			            var currentDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];			            		           
			            var currentTime = dateTimeSplit[1].split('.');			         
			            responseO[i].created_date_time=currentDate+' '+currentTime[0];
				}
				formatRecords(responseO);
				loadReportContentTbl(responseO);
				totalRecords = responseO.length;
				$("#noRecords").html(totalRecords);// Sets the no of records
				setDataToController();
			} else {		
				if(responseO != undefined && responseO.length <= 0 && canDispError){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'RTC Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'RTC Report');
				}
				 stopLoading();
			}
			
	  }).fail(function() {
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'RTC Report');
		  stopLoading();
	  }).always(function() {
		 
	  });
}
/**
 * Binds generate report click event
 */
function bindPrint() {
	$("#printReport")
			.click(
					function() {
						/*var groupBy = "";
						var conte = [];
						var $rtcTbl = $('#'+report_name+'_table');
						if($rtcTbl.data('confObj').applyGroup){
							conte = $rtcTbl.data('confObj').groupedCont;
							groupBy = $('#'+report_name+'_table').data('confObj').cur_gru_col;
							if(groupBy == "department_name"){
								groupBy = "D";
							}else if(groupBy == "article_no"){
								groupBy = "A";
							}else if(groupBy == "markdown_percentage"){
								groupBy = "M";
							}
						}else{
							conte = $rtcTbl.data('confObj').content;
						}
						var toSend = {'data':conte,'reportFor':allInputs,'groupBy':groupBy};
						$.ajax({
					    type: "POST",
					    url: "rtcTablePrint.htm",
					    data: JSON.stringify(toSend),
					    contentType: "application/json",
					    beforeSend: function() {
					    	  startLoading();
					      }
					  }).done(function(response) {
						 // console.log(response);
*/						 
							$('#rtcReportForm').attr("action", "downloadRTCReportPdf.pdf");
							$('#rtcReportForm').attr('target','_blank');
							$('#rtcReportForm').attr('method','get');
							$('#rtcReportForm').submit();
							stopLoading();
												
					 /* }).fail(function() {
						  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'RTC Report');
					  }).always(function() {
						  stopLoading();
					  });});*/
});
}
/**
 * Sets the report load area and content
 */
function loadReportContentTbl(data) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = (new tblReport(data));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		setDataToController();
	});
	$tblhold.parent().find('[name="groupByOptions"]').change(function(){
		startLoading();
		setTimeout(setDataToController,200);
	});
}
function formatRecords(responseO){
	var keyobj = responseO; 
	for(var m = 0;m<keyobj.length;m++){
		//key = keyobj[m];
		//if(confObj.cont_data_function!=undefined && confObj.cont_data_function[key]!=undefined){
		showRTCFromDetails(keyobj[m]);
		showStdSellPriceDetails(keyobj[m]);
		showRTCToDetails(keyobj[m]);
		//}
	}
}
/**
 * Configuration to generate table in the page
 * @param datarep
 * @returns {tblReport}
 */
function tblReport(data) {
	this.option = 'build';	
	if (groupByType == 'DEPT') {
		this.key = [ 'article_no', 'article_desc', 'newStdSellPrice', 'markDown', 'user_name' ];
		this.header_sub_rows = {markDown : {subKeys : [ 'rtcFromPrice', 'markdown_price',  'markdown_percentage','no_of_tickets', 'markdown_value', 'markdown_reason_desc','created_date_time' ]	}};
		this.default_groupbyColumn = [ 'department_name' ];
	}else if (groupByType == 'ARTICLE') {
		this.key = [ 'newStdSellPrice', 'markDown', 'user_name' ];
		this.header_sub_rows = {markDown : {subKeys : ['markdown_percentage', 'rtcFromPrice', 'markdown_price','no_of_tickets', 'markdown_value', 'markdown_reason_desc','created_date_time' ]	}};
		this.default_groupbyColumn = [ 'article_no' ];
	}else if (groupByType == 'MARKDOWN'){
		this.key = [ 'article_no', 'article_desc', 'newStdSellPrice', 'markDown', 'user_name' ];
		this.header_sub_rows = {markDown : {subKeys : ['markdown_percentage', 'rtcFromPrice', 'markdown_price','no_of_tickets', 'markdown_value', 'markdown_reason_desc','created_date_time' ]	}};
		this.default_groupbyColumn = [ 'markdown_percentage' ];
	}	
	this.table_name = report_name;
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {article_no : 'Article',	article_desc : 'Description',created_date_time : 'Date',user_name : 'User',markdown_price : 'RTC To<br>Price($)',markdown_percentage : '%',no_of_tickets : 'Tickets<br>Printed',markdown_value : 'Total<br>Markdown<br>Value',markdown_reason_desc : 'Reason',markDown : 'Markdown',rtcFromPrice : 'RTC Price<br>From($)',newStdSellPrice : 'Sell<br>Price($)'};
	this.header_data_type = {article_no : 'number',article_desc : 'char',newStdSellPrice : 'number',user : 'char',rtcFromPrice : 'number',markdown_price : 'number',no_of_tickets : 'number',markdown_percentage : 'number',markdown_value : 'number',markdown_reason_desc : 'char',created_date_time : 'date'};
	this.header_row_type = {article_no : 'main',article_desc : 'main',newStdSellPrice : 'main',user_name : 'main',	markDown : 'sub'};
	
	this.header_class = {article_no : '',article_desc : '',newStdSellPrice : '',user_name : ' leftValue columnDivider  ',markDown : ' centerValue columnDivider noSort  ',markdown_value : ' centerValue',markdown_reason_desc : ' leftValue',created_date_time : ' leftValue'};
	this.header_width = {article_no : '7%',article_desc : '10%',newStdSellPrice : '7%',user_name : '10%',newStdSellPrice : '5%',rtcFromPrice:'5%',markdown_price : '5%',no_of_tickets : '1%',markdown_percentage : '5%',markdown_value : '5%',markdown_reason_desc : '5%',created_date_time : '7%'};
	this.content_class = {article_no : '',article_desc : '',newStdSellPrice : ' centerValue columnDivider  ',	markDown : ' centerValue columnDivider noSort  ',user_name : ' leftValue  ',newStdSellPrice : ' centerValue',markdown_price : ' centerValue',no_of_tickets : 'centerValue',markdown_percentage : ' centerValue',markdown_value : ' centerValue',markdown_reason_desc : ' leftValue',created_date_time : ' leftValue'};
	this.content_format = {article_no : 'removeNull',article_desc : 'removeNull',newStdSellPrice : 'removeNull',user_name:'removeNull',created_date_time : 'removeNull'};
	this.content_width = {article_no : '',newStdSellPrice : '',article_desc : '',user_name : '',newStdSellPrice : '',markdown_price : '',no_of_tickets : '1%',markdown_percentage : '',markdown_value : '',markdown_reason_desc : '',created_date_time : ''};
	this.header_td_label = {markDown : 'Markdown',rtcFromPrice : 'RTC Price<br>From($)',newStdSellPrice : 'Sell<br>Price($)'};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.cont_data_function = {user_name:showUserDetails,newStdSellPrice:showStdSellPriceDetails,rtcFromPrice:showRTCFromDetails,markdown_price:showRTCToDetails, markdown_percentage:showMarDownPerDetails,markdown_value:showValueDetails};
	this.cont_sort_function = {markdown_percentage:getMarkDownPer,rtcFromPrice:getRTCFromSortData,newStdSellPrice:getStdSellPriceSortData};
	this.group_done = {group_done : function() {groupDone();}};
	
	this.groupbyColumn = {'department_name' : 'Department',	'article_no' : 'Article','markdown_percentage' : 'Markdown %'};
	this.group_cont_function = {department_name : getDeptGrpHead,article_no : getArticleGrpHead,markdown_percentage : getMarkDwnGrpHead};
	this.groupby = true;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {click : ''};
	this.content_tr_addon = {click : ''};
	this.content_td_addon = {click : ''};
	this.content_label = {};
	this.grp_tot = true;
	this.group_tot_cont_function = {department_name : getTotalBasedOnDept,article_no : getTotalBasedOnArticle,markdown_percentage : getTotalBasedOnMarkdown};
}
/**
 * Determins the type sorting order
 */
var getMarkDownPer = function(){
	return 'markdown_percentage';
};
var getRTCFromSortData = function(){
	return 'rtcFromPrice';
};
var getStdSellPriceSortData = function(){
	return 'newStdSellPrice';
};
/*var getDateSortData = function(){
	return 'date_sortFormat';
};*/
/**
 * Customizes the user field value
 */
var showUserDetails = function(obj){	
	return obj.user_name+"("+obj.user_id+")";
};
var showStdSellPriceDetails = function(obj){
	obj.newStdSellPrice = getStdSellPriceValue(obj.promo_sell_price,obj.std_sell_price);
	return obj.newStdSellPrice;
};
function getStdSellPriceValue(promo_sell_price,std_sell_price){
	if(Number(promo_sell_price) > 0){
		return Number(promo_sell_price).toFixed(2);//Please display promo sell price as standard sell price if we have promo sell price > 0
	}else{
		return Number(std_sell_price).toFixed(2);
	}
}
var showRTCFromDetails = function(obj){	
	obj.rtcFromPrice = Number(obj.was_price).toFixed(2);//getRTCFromValue(obj.promo_sell_price,obj.std_sell_price);
	return Number(obj.rtcFromPrice).toFixed(2);
};
function getRTCFromValue(promo_sell_price,std_sell_price){
	if(Number(promo_sell_price) == 0){
		return Number(std_sell_price).toFixed(2);
	}else{
		return Number(promo_sell_price).toFixed(2);
	}	
}
var showRTCToDetails = function(obj){	
	obj.markdown_price = Number(obj.markdown_price).toFixed(2);
	return Number(obj.markdown_price).toFixed(2);
};
var showMarDownPerDetails = function(obj){	
	return (obj.markdown_percentage != undefined && obj.markdown_percentage != '')? (Number(obj.markdown_percentage)+"%") : '';
};
var showValueDetails = function(obj){	
	obj.markdown_value = Number(obj.markdown_value).toFixed(2);
	return obj.markdown_value;
};
/*var showDateDetails = function(obj){
	var dateArray = new Array();
	if(obj.created_date_time != '' && obj.created_date_time != undefined){
		sortingDate = obj.created_date_time.split(" ")[0];
		dateArray = sortingDate.split("-");
		obj.date_sortFormat = dateArray[2] + "/"+ dateArray[1] + "/" + dateArray[0];//Setting date in this object for sorting in format dd/mm/yyyy
	}else{
		obj.date_sortFormat= '';
	}
	return obj.created_date_time;//For display both date and time to be displayed.
};*/
/**
 * Dispalys total department in the table
 */
var getTotalBasedOnDept = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	var tot = 0;
	//console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			tot+= array[i].markdown_value!= undefined && array[i].markdown_value!= null ? Number(array[i].markdown_value) : 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="7">Total markdown value by department:  </td><td class="centerValue valueInfo">'+Number(tot).toFixed(2)+'</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
/**
 * Dispalys total articles in the table
 */
var getTotalBasedOnArticle = function(obj,confObj){
	var array = confObj.groupedContObj[obj.group_key+' '];
	var tot = 0;
	//console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			tot+= array[i].markdown_value!= undefined && array[i].markdown_value!= null ? Number(array[i].markdown_value) : 0;
		}
	}
	return '<tr><td class="valueInfo" colspan="7">Total markdown value by article:  </td><td class="centerValue valueInfo">'+Number(tot).toFixed(2)+'</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};
/**
 * Dispalys total markdown in the table
 */
var getTotalBasedOnMarkdown = function(obj,confObj){
	return '';
};

/**
 * Show/Hides the table content based on the gorup by option
 */
function groupDone() {// Trigerred on change of group by option
	if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
		groupByType = 'DEPT';
	}else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
		groupByType = 'ARTICLE';
	}else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')){
		groupByType = 'MARKDOWN';
	}	
	loadReportContentTbl(responseO);
	/*if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
		$(".ContentTable th[data_key='article_no']").removeClass("hideBlock");
		$(".ContentTable td[data_key='article_no']").removeClass("hideBlock");

		$(".ContentTable th[data_key='article_desc']").removeClass("hideBlock");
		$(".ContentTable td[data_key='article_desc']").removeClass("hideBlock");
	} else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
		
		$.each($("#Report_RTC_table tr.subHeader"), function() { 
           // $(this).children(":eq(2)").before($(this).children(":eq(0)"));
            $(this).children(":eq(0)").before($(this).children(":eq(2)"));
        });
		$.each($("#Report_RTC_table tr"), function() { 
	          if($(this).attr('id') != undefined && $(this).attr('id') != ''){
	        	  $(this).children(":eq(2)").after($(this).children(":eq(5)"));
	          }
	    });
		
		$(".ContentTable th[data_key='article_no']").addClass("hideBlock");
		$(".ContentTable td[data_key='article_no']").addClass("hideBlock");

		$(".ContentTable th[data_key='article_desc']").addClass("hideBlock");
		$(".ContentTable td[data_key='article_desc']").addClass("hideBlock");

	} else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')) {
		$(".ContentTable th[data_key='article_no']").removeClass("hideBlock");
		$(".ContentTable td[data_key='article_no']").removeClass("hideBlock");

		$(".ContentTable th[data_key='article_desc']").removeClass("hideBlock");
		$(".ContentTable td[data_key='article_desc']").removeClass("hideBlock");
	}*/
}
/**
 * Group by department header
 */
var getDeptGrpHead = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.department_name || '') + '</td></tr>';
	}
	return cont;
};
/**
 * Group by article header
 */
var getArticleGrpHead = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
				+ (obj.article_no) + ' - ' + (obj.article_desc)
				+ '</td></tr>';
	}
	return cont;
};
/**
 * Group by markdown header
 */
var getMarkDwnGrpHead = function(obj, confObj) {
	// var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">'
			+ (obj.markdown_percentage)
			+ '% Markdown</td></tr>';
	}
	return cont;
};

/**
 * Frames the print screen content
 * @param data
 */
function frameReport() {	
	headerContent = '<label><strong>Reduced to Clear Label Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle">'+ allInputs
	+'</label></br></br><label class="subtitle"><strong>Total '+totalRecords+' Articles </strong></label></br></br>';
	console.log('RTC Report request:' + requestParam);
	
	var map = {};
	var applyGroup = $("#Report_RTC_table").data('confObj').applyGroup;
	if(applyGroup){
		data = responseO;
		// Group By - This return map{key:groupby,value:[obj,obj,obj]}
		if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.department_name;
			});
		} else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.article_no+" - "+obj.article_desc;
			});
		} else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')) {
			map = $groupBy(data, function(obj) {
				return obj.markdown_percentage;
			});
		}
	}else{//Sorting data
		//data = $("#Report_RTC_table").data('confObj').content;
		map["SORT_RESULTS"] = $("#Report_RTC_table").data('confObj').content;
	}
	
	
	
	totalLen = 0;totalLines=0;
	for ( var m in map) {
		totalLen++;totalLen++;//Fro gorup by name and total markdown value by dept.
		for ( var i = 0; i < map[m].length; i++) {
			totalLen++;//for each row
			/*if(map[m][i].article_desc.length >= 15){
				totalLen = totalLen + 0.5*(map[m][i].article_desc.length/15);
			}*/
		}
	}
	
	content = '';
	printHeadInnerTable = '';
	

	// Group By - This return map{key:groupby,value:[obj,obj,obj]}
	if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
		constructGroupByDeptHeaderTbl();
	} else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
		constructGroupByArticleHeaderTbl();
	} else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')) {
		constructGroupByMarkDwnHeaderTbl();
	}
	

	content += printHeadInnerTable;
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;width: 1130px" >'

			+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator"> </label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page '
			+ '<label class="currentPagePrint">1</label> of '
			+ '<label class="totalPage">1</label>'
			+ ' </div>'
			+ '</div>'
			+ '</div>';
	var count =0;
	var firstpagecreated = false;
	for ( var m in map) {
		var totMarkdownbyDept = 0;
		var totMarkdownByArticle = 0;
		if(applyGroup){
				if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
					content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
						+ m + '</td></tr>';
					count = count+1;totalLines++;
				}else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
					content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
						+ m + '</td></tr>';
					count = count+1;totalLines++;
				}else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')) {
					content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
						+ m + '% Markdown</td></tr>';
					count = count+1;totalLines++;
				}				
		}
	
		
		
		for ( var i = 0; i < map[m].length; i++) {			
			if ($('#Report_RTC_department_name__grp_radio').is(':checked')) {
				totMarkdownbyDept += Number(map[m][i].markdown_value);
				constructGroupByDeptContentTbl(map[m][i]);
				if(i==map[m].length-1 && applyGroup){
					content += '<tr style="font-weight: bold;"><td class="valueInfo" colspan="7">Total markdown value by department:  </td><td class="centerValue valueInfo">'+Number(totMarkdownbyDept).toFixed(2)+'</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
					count = count+1;totalLines++;
				}
			} else if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
				totMarkdownByArticle += Number(map[m][i].markdown_value);
				constructGroupByArticleContentTbl(map[m][i]);
				if(i==map[m].length-1 && applyGroup){
					content += '<tr style="font-weight: bold;"><td class="valueInfo" colspan="5">Total markdown value by article:  </td><td class="centerValue valueInfo">'+Number(totMarkdownByArticle).toFixed(2)+'</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
					count = count+1;totalLines++;
				}
			} else if ($('#Report_RTC_markdown_percentage__grp_radio').is(':checked')) {
				constructGroupByMarkDwnContentTbl(map[m][i]);
			}
			
			
			//Split Pages - Starts	
			var firstPageRecords = 9;
			var otherPageRecords = 12;
			if ($('#Report_RTC_article_no__grp_radio').is(':checked')) {
				firstPageRecords = 11;
				otherPageRecords = 14;
			}
		
			totalLines++;
			/*if(map[m][i].article_desc.length >= 30){
				count = count + 0.5*(map[m][i].article_desc.length/30);
				totalLines = totalLines + 0.5*(map[m][i].article_desc.length/30);
			}*/
			if (totalLines >= (totalLen)){
				content += '</tbody></table>';
				content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
			}
			if(totalLines>=firstPageRecords && !firstpagecreated){
				count =0;
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;		
				firstpagecreated = true;
			}else {
				if (totalLines >= (totalLen)){
						if(count != otherPageRecords && totalLines > firstPageRecords){
						content += '<table><tbody>';
						for(var n=0;n<((otherPageRecords)-count);n++){
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					}else{
						content += '<table><tbody>';
						for(var n=0;n < ((firstPageRecords)-count);n++){
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					}
					content += '</tbody></table>' + printFoot + '</div>';					
				}
				else if(count >= otherPageRecords){
					count = 0;					
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable;
				}
				
			}
			count++;
			//Split Pages - Ends
		}
	}
	$('#printbodyForReport')
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
 * Builds group by Department table header for print
 */
function constructGroupByDeptHeaderTbl() {
	//This col group is used for stying the width when table-layout is set as fixed for the subheaders. Without this the width property will not be applied to subrows
	var colgroup = '<colgroup><col style="width: 75px;">'
		+ '<col style="width: 210px;">'
		+ '<col style="width: 75px;">'
		+ '<col style="width: 85px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width: 50px;">'
		+ '<col style="width: 50px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width:110px;">'
		+ '<col style="width:200px;">'
		+ '</colgroup>';
	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable sortTable ContentTable actionRows" id="departmentTable">'
			+ colgroup	
			+ '<thead>'
			+ '<tr class=""><th rowspan="2" style="width: 55px" class="leftValue">Article</th>'
			+ '<th rowspan="2" style="width:100px" class="leftValue">Description</th>'
			+ '<th rowspan="2" class="centerValue" style="width: 55px;"> Sell<br />Price ($)</th>'
			+ '<th colspan="7" class="centerValue columnDivider noSort" style="width: 650px;">Markdown</th>'
			+ '<th rowspan="2" class=" lastColumn noSort" style="width: 100px;">User Name</th></tr>'
			+ '<tr class="subHeader"><th class="centerValue title" title="Reduce to Clear Price From">RTC Price<br />From ($)</th>'
			+ '<th class="centerValue" title="Reduce to Clear Price To">RTC Price<br />To ($)</th>'
			+ '<th class="centerValue">%</th>'
			+ '<th class="centerValue">Tickets<br />Printed</th>'
			+ '<th class="centerValue">Value</th>'
			+ '<th class="">Reason</th>'
			+ '<th class="columnDivider ">Date</th></tr></thead>' + '<tbody>';
}
/**
 * Builds group by Department table content for print
 * @param data
 */
function constructGroupByDeptContentTbl(data) {
	content += '<tr class="border_bottom"><td  align="left">' + data.article_no
			+ '</td><td  align="left">' + data.article_desc
			+ '</td><td class="centerValue">' +  getStdSellPriceValue(data.promo_sell_price,data.std_sell_price)
			+ '</td><td class="centerValue">' +  getRTCFromValue(data.promo_sell_price,data.std_sell_price)
			+ '</td><td class="centerValue">' +  Number(data.markdown_price).toFixed(2)
			+ '</td><td class="centerValue">' + data.markdown_percentage
			+ '</td><td class="centerValue">' + data.no_of_tickets
			+ '</td><td class="centerValue">' + Number(data.markdown_value).toFixed(2)
			+ '</td><td class="centerValue">' + data.markdown_reason_desc
			+ '</td><td class="centerValue">' + data.created_date_time
			+ '</td><td class="centerValue">' + data.user_name+" ("+data.user_id+")";
}
/**
 * Builds group by article table header for print
 */
function constructGroupByArticleHeaderTbl() {
	//This col group is used for stying the width when table-layout is set as fixed for the subheaders. Without this the width property will not be applied to subrows
	var colgroup = '<colgroup><col style="width: 100px;">'
		+ '<col style="width: 75px;"><col style="width: 105px;"><col style="width: 105px;">'
		+ '<col style="width: 90px;"><col style="width: 100px;"><col style="width: 250px;">'
		+ '<col style="width: 150px;"><col style="width: 250px;"></colgroup>';
		
	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable sortTable ContentTable actionRows" id="articleTable">'
			+ colgroup
			+ '<thead><tr class="">	<th rowspan="2" class="centerValue">Sell Price ($)</th>'
			+ '<th colspan="7" class="centerValue columnDivider noSort">Markdown</th>'
			+ '<th rowspan="2" class=" lastColumn noSort">User Name</th></tr>'
			+ '<tr class="subHeader">'
			+ '<th class="centerValue" style="width: 18px;">%</th>'
			+ '<th class="centerValue style="width: 40px;" title" title="Reduce to Clear Price From">RTC Price<br />From ($)</th>'
			+ '<th class="centerValue" style="width: 40px;" title="Reduce to Clear Price To">RTC Price<br />To ($)</th>'
			+ '<th class="centerValue">Tickets<br />Printed</th>'
			+ '<th class="centerValue">Value</th>'
			+ '<th class="">Reason</th>'
			+ '<th class="columnDivider ">Date</th></tr></thead>' + '<tbody>';
}

/**
 * Builds group by article table content for print
 * @param data
 */
function constructGroupByArticleContentTbl(data) {
	content += '<tr class="border_bottom"><td  align="left">' +  getStdSellPriceValue(data.promo_sell_price,data.std_sell_price)
			+ '</td><td  align="left">' +  data.markdown_percentage
			+ '</td><td class="centerValue">' +  getRTCFromValue(data.promo_sell_price,data.std_sell_price)
			+ '</td><td class="centerValue">' + Number(data.markdown_price).toFixed(2)
			+ '</td><td class="centerValue">' + data.no_of_tickets
			+ '</td><td class="centerValue">' + Number(data.markdown_value).toFixed(2)
			+ '</td><td class="centerValue">' + data.markdown_reason_desc
			+ '</td><td class="centerValue">' + data.created_date_time
			+ '</td><td class="centerValue">' + data.user_name+" ("+data.user_id+")";
}
/**
 * Builds group by markdown table header for print
 */
function constructGroupByMarkDwnHeaderTbl() {
	//This col group is used for stying the width when table-layout is set as fixed for the subheaders. Without this the width property will not be applied to subrows
	var colgroup = '<colgroup><col style="width: 75px;">'
		+ '<col style="width: 210px;">'
		+ '<col style="width: 75px;">'
		+ '<col style="width: 50px;">'
		+ '<col style="width: 85px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width: 50px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width: 80px;">'
		+ '<col style="width:110px;">'
		+ '<col style="width:200px;">'
		+ '</colgroup>';

	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable sortTable ContentTable actionRows" id="markTable">'
			+ colgroup
			+ '<thead><tr class=""><th rowspan="2" style="width: 54px;">Article</th>'
			+ '<th rowspan="2" style="width: 100px;">Description</th>'
			+ '<th rowspan="2" class="centerValue">Sell<br />Price ($)</th>'
			+ '<th colspan="7" class="centerValue columnDivider noSort">Markdown</th>'
			+ '<th rowspan="2" class=" lastColumn noSort">User Name</th></tr>'
			+ '<tr class="subHeader">'
			+ '<th class="centerValue" style="width: 40px;">%</th>'
			+ '<th class="centerValue style="width: 40px;" title" title="Reduce to Clear Price From">RTC Price<br />From ($)</th>'
			+ '<th class="centerValue" style="width: 40px;"  title="Reduce to Clear Price To">RTC Price<br />To ($)</th>'
			+ '<th class="centerValue">Tickets<br />Printed</th>'
			+ '<th class="centerValue">Value</th>'
			+ '<th class="">Reason</th>'
			+ '<th class="columnDivider ">Date</th></tr></thead>' + '<tbody>';
}

/**
 * Builds group by markdown table content for print
 * @param data
 */
function constructGroupByMarkDwnContentTbl(data) {
	content += '<tr class="border_bottom"><td  align="left">' + data.article_no
	+ '</td><td  align="left">' + data.article_desc
	+ '</td><td class="centerValue">' +  getStdSellPriceValue(data.promo_sell_price,data.std_sell_price)
	+ '</td><td class="centerValue">' +  data.markdown_percentage
	+ '</td><td class="centerValue">' +  getRTCFromValue(data.promo_sell_price,data.std_sell_price)
	+ '</td><td class="centerValue">' +  Number(data.markdown_price).toFixed(2)
	+ '</td><td class="centerValue">' + data.no_of_tickets
	+ '</td><td class="centerValue">' + Number(data.markdown_value).toFixed(2)
	+ '</td><td class="centerValue">' + data.markdown_reason_desc
	+ '</td><td class="centerValue">' + data.created_date_time
	+ '</td><td class="centerValue">' +  data.user_name+" ("+data.user_id+")";
}

/**
 * Populates department drop down content
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
							content += '<li >	<input  class="depDrpDwnChkBx" checked type="checkbox" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label class="dropdownLabel" for="'+temList[i].node_id+'">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('.dropdown').append(content);
						$('.dropdown')
								.append(
										'<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn"><a href="#">Cancel</a></label></li>');
						$("#dropdownDoneBtn").on("click", function() {// DOne
																		// btn
																		// inside
																		// drop
																		// down
							$(".selectDropdown").removeClass('active');
						});
						$(".secondaryActionBtn").on("click", function() {// cancel
																			// button
																			// inside
																			// dropdown
							$(".selectDropdown").removeClass('active');
						});
						bindDeptDrpDwn();
					}
				},
				error : function(response) {
				},
			});

}
function bindDeptDrpDwn(){
	$('#depDropDwnList').find("input[type=checkbox]").bind('change',
			function(e) {
					$('#deptlst').find('#'+$(e.target).prop('id')).prop('checked',$(e.target).prop('checked'));
					if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
						$("#allDeptChkBox").prop("checked",true);
						$("#deptSelectAll").prop('checked', true);
						$("#ds").html('All Departments');//Department drop down value displayed
					}else if($('.depDrpDwnChkBx:checked').length == 0){
						$("#ds").html('Select Deparments');//Department drop down value displayed
						//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
					}else if($('.depDrpDwnChkBx:checked').length == 1){
						$("#ds").html($('.depDrpDwnChkBx:checked').parent().find('label').html());
					}else{
						$("#allDeptChkBox").prop("checked",false);
						$("#deptSelectAll").prop('checked', false);
						$("#ds").html('Multiple Departments');//Department drop down value displayed
					}

		});
}
/**
 * Time format
 * @returns {String}
 */
function timeformat()
{
	var date=new Date();
	if(date.getHours()>12)
	{
		hours=(date.getHours())-12;
		ampm="pm";
	}
else
	{
	hours=(date.getHours());
		ampm="am";
	}
return (hours<10?("0"+hours):hours)+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+" "+ampm;
}

/**
 * Date format
 * @returns {String}
 */
function dateformat()
{
	var date=new Date();
	day=date.getDate();
	month=date.getMonth()+1;
	year=date.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
/**
 * Paste date to set date from value
 * @returns {String}
 */
function dateFromformat()
{
	//var x = 1; //or whatever offset
	var pastDate = new Date();
	//pastDate.setMonth(pastDate.getMonth() - x);
	pastDate.setDate(pastDate.getDate() - 7);
	day=pastDate.getDate();
	month=pastDate.getMonth()+1;
	year=pastDate.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
/**
 * Default date for date to
 * @returns {String}
 */
function dateToformat()
{
	var dayBefore = new Date();
	dayBefore.setDate(dayBefore.getDate());
	day=dayBefore.getDate();
	month=dayBefore.getMonth()+1;
	year=dayBefore.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}