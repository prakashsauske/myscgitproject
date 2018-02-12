var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';
var allInputs = '';
var stockTakePrint = '';
var selectedMissedSubCat = {};
var selectAllFlag = false;
var cloneMissed = '';
var filterOpenBtnMissed = '<label id="filterOpen2" class="linkBtn filterOpen2Class"><a ><label class="filter">Filters</label></a></label>';
var filterClearBtnMissed = '<label id="filterClear2" class="linkBtn filterClear2Class hideBlock"><a ><label class="negativeFlag">Clear Filters</label></a></label>';
var dataPassGlobel='';
$(document)
		.ready(
				function() {
					// filter by
					// $('#filterOpen2').click(function(){ //Group by and filter
					// in same line changes
					$('body').on(
							'click',
							'#filterOpen2',
							function() {
								$("#clr_grp_link_btn_MissedArticles_report_"+missedArticlesTabIndex)
										.trigger('click');
								$(this).parent().find("#filterOpen2").addClass('hideBlock');
								$(this).parent().find("#filterClear2").removeClass('hideBlock');
								$("#missedArticlesFilterDiv,#missed-dept-cont,#missedArticlescloseLink").removeClass(
										'hideBlock'); // Group by and filter
								// in same line changes

								$('#exDaysChk:visible').onlyNumbers();
								
							});

					// $('#filterClear2').click(function(){ //Group by and
					// filter in same line changes
					$('body').on('click', '#filterClear2', function() {
						onFilterClearOrFilterCancelMissedArticles();
						resetHierarchyDept($('#missedArticleHierarchyId'),"");
					});

					$('#missedArticlescloseLink').unbind('click');

					// $('#missedArticlescloseLink').click(function(){ //Group
					// by and filter in same line changes
					$('body').on('click', '#missedArticlescloseLink',
							function() {
								onFilterClearOrFilterCancelMissedArticles();
							});

					$('#missedArticlesFilterBtn').unbind('click');
								
					

					// $('#missedArticlesFilterBtn').click(function(){ //Group
					// by and filter in same line changes
					$('body').on('click', '#missedArticlesFilterBtn', function() {
						filterApplyClicked = true;
						var $selectedDept;
						var $selectedSubCat;
						var $tempHold;
						var $missedDiv = $('#missed-2');
						var validate_hierarchy =false;
						$tblhold = $missedDiv.find('#reportContent2');
						if(isNationalStocktake){
							$missedDiv.find('.emptyTable,#reportContent2').addClass('hideBlock');
							$tempHold = $missedDiv.find('#missedArticlesFilterDiv:visible');
							$selectedDept = $tempHold.find('[name="departmentList"]:checked');
							$selectedSubCat = $tempHold.find('[name="subCat"]:checked');
							if($selectedDept != undefined && $selectedDept.length>0
								&& $selectedDept.attr('data_fresh_food_flag') == 'N' && $selectedSubCat.length == 0){
									validate_hierarchy =true;
							}
						}else{
							//$tempHold = ((!$tblhold.hasClass('hideBlock')) ? $tblhold.find('#missedArticlesFilterDiv') : $missedDiv.find('#missedArticlesFilterDiv:visible'));
							filterContentMissedArticles = $("#missedArticlesFilterDiv").detach();
							$tempHold = filterContentMissedArticles;
						}
						if(validate_hierarchy){
							$.fn.showCustomMsg([ 'Please select sub category to apply filter.' ],error,'Stocktake-Missed Articles Count Report');
						}else if($tempHold.find('#exDaysChk').val()<=28){
							globalRequestParam = prepareMissedArticlesReportParam($tempHold);// changed
							callReportSTMissedArticlesService(globalRequestParam);
							$('#exDaysChk:visible').onlyNumbers();
						}else{
							$.fn.showCustomMsg([ 'Date should be less or equal to 28 days' ],error,'Stocktake-Missed Articles Count Report');
						}
				});

					//$('#mainTabs-2').find('#exDaysChk').prop('disabled', true);
					
				});


function onFilterClearOrFilterCancelMissedArticles() {
	filterApplyClicked = false;
	if (filterContentMissedArticles != '' && reporttabIndex == 1) {// missed
		// articles
		// //Group
		// by and
		// filter in
		// same line
		// changes
		//$("#tablefilters2").html(filterContentMissedArticles);
	}
	defaultMissedArticlesFilters();
	fetchMissedArticlesReportWithoutFilters();
}
function clearMissedArtFilter(){
	$("#filterOpen2").removeClass('hideBlock');
	$("#missedArticlesFilterDiv").addClass('hideBlock');// //Group by and filter
	// in same line changes
	$("#filterClear2").addClass('hideBlock');
}
function fetchMissedArticlesReportWithoutFilters(isNationalST) {
	defaultMissedArticlesFilters();
	$tblhold.addClass("hideBlock");

	var activeStatus = "";
	var missedNum = "";

	activeStatus = $('#mainTabs-2 .ui-tabs-active').attr('aria-controls')
			.split("missed-")[1];

	if (activeStatus == "1") {
		missedNum = "OPEN";
	} else if (activeStatus == "2") {
		missedNum = "INPROGRESS";
	} else if (activeStatus == "3") {
		missedNum = "CLOSED";
	}
	var reportParam = {
		"iv_st_id" : $("#reportDetailsStockTakeId").html(),
		"iv_dept" : "",
		"iv_cat_id" : "",
		"iv_sub_cat_id" : "",
		"iv_seg_id" : "",
		"iv_ex_art_soh_chk" : "",
		"iv_ex_days_chk" : "",
		"iv_article_no" : "",
		"iv_article_barcode" : "",
		"iv_barcode_flag" : "",
		"iv_field" : "",
		"iv_criteria" : "",
		"iv_value" : "",
		"iv_st_art_sts" : missedNum,
		"iv_article":"",
		"iv_article_barcode":"",
		"iv_barcode_flag":"",
		"iv_userid":""
	};
	if(isNationalStocktake){
		frameMissedArtRpt();
	}else{
		$('#missed-2,#tablefilters2,#missedArticlesFilterDiv,#missedArticleHierarchyId').addClass('hideBlock').find('.articleHead,.orderDetails,.emptyTable,#missed-dept-cont,#missedArticlescloseLink,#filterOpen2').removeClass('hideBlock');
		callReportSTMissedArticlesService(reportParam);
	}
}
function defaultMissedArticlesFilters() {
	$("#missedArticlesallDeptChkBox").prop("checked", false);// select all
	// dept in drop
	// dwon
	$("#missedArticlesallDeptChkBox").trigger('click');

	$("#missedArticleHierarchyId").find(".deptSelectAll").prop("checked", true);// unselect
	// all
	// dep
	// in
	// hier
	// box
	$("#missedArticleHierarchyId").find(".deptSelectAll").trigger('click');

	$("#missedArtilcedepH").prop("checked", true);// uncheck select Select
	// multiple departments or
	// sub-categories check box
	$("#missedArtilcedepH").trigger("click");
	if(isNationalStocktake){
		$("#missedArticleHierarchyId").find("input[type=radio]").prop('checked',false);
	}else{
		$("#missedArticleHierarchyId").find('.deptLstCnt').text($("#missedArticleHierarchyId .deptlst").find("input[type=checkbox]:checked").length);
	}

	$("#exDaysChk").val('');

	$("#exArtSohChk").prop("checked", false);
	clearMissedArtFilter();

}

/*
 * function callMissedArticlesTabService(tabId, tabVal){
 * 
 * var param = { "iv_st_id":$("#reportDetailsStockTakeId").html(),
 * "iv_st_art_sts": tabVal, "iv_userid" : $('#loginUserId').val(), "iv_dept" : "" };
 * //console.log(getSTMissedArticleSummaryDetailsUrl + ' ' +
 * JSON.stringify(param)); $.ajax({ type: "POST", url:
 * getSTMissedArticleSummaryDetailsUrl, data: JSON.stringify(param), beforeSend:
 * function() { startLoading(); } }).done(function(response) { responseP =
 * response; //responseP = [ {'article_number':
 * '149539','scanned_ean':'4564','article_description': 'Chicken Breast Stir Fry
 * Rw','uom': 'CAR','om':'15','soh': '52','sell_price': '45','location_name':
 * 'STIR FRY','base_count': '12','recount_1': '12015','recount_2':
 * '182','recount_3': '182','recount_4': '182','final_count':
 * '182','total_valueue': '182','soh': '182','subcat_name': 'sub1','user':
 * 'user1'}]; //console.log(JSON.stringify(responseP)); if(responseP != undefined &&
 * responseP.length > 0 && responseP[0].stocktake_id != undefined){
 * $(tabId).find('.aisleCol').html('').html(getMoreHyperContent(responseP[0].dept_name));
 * $(tabId).find('.subCatCol').html('').html(getMoreHyperContent(responseP[0].sub_category_name));
 * $(tabId).find('.moreNumber').tooltip({ tooltipClass : 'tmptooltipClass' }); }
 * else { //$.fn.showCustomMsg(['Sorry, Some technical issue
 * occured.'],error,'Stocktake-Missed Articles Count'); } //if(tabVal ==
 * 'COMPLETED'){ fetchMissedArticlesReportWithoutFilters(); //}
 * }).fail(function() { $.fn.showCustomMsg(['Sorry, Some technical issue
 * occured.'],error,'Stocktake-Missed Articles Count'); }).always(function() {
 * stopLoading(); });
 * 
 *  }
 */

/**
 * Invokes report service
 */
function callReportSTMissedArticlesService(requestParam) {
	console.log(getSTMissedArticleSummaryDetailsUrl + ' ' + JSON.stringify(requestParam));
	// var requestParam = {};
	$
			.ajax({
				type : "POST",
				url : getSTMissedArticleSummaryDetailsUrl,
				data : JSON.stringify(requestParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						responseP = response;
						selectedMissedSubCat = {};
						//console.log(JSON.stringify(responseP));
						if (responseP != undefined && responseP.length > 0
								&& responseP[0].article_number != undefined) {
							if (filterContentMissedArticles != ''
									&& filterContentMissedArticles.length != 0
									&& reporttabIndex == 1) {
								//cloneMissed = $("#tablefilters2");
								//$("#tablefilters2").html(filterContentMissedArticles);
								$("#tablefilters2").addClass("hideBlock");
								$tblhold.addClass("hideBlock");
							}
							if (filterButtonDivContentMissedArticle != ''
									&& filterButtonDivContentMissedArticle.length != 0
									&& reporttabIndex == 1) {
								//$("#missedArticleFilterButtonDiv").find(
									//	'.lookupActionWrapper').html(
										//filterButtonDivContentMissedArticle);
								$("#missedArticleFilterButtonDiv").addClass(
										"hideBlock");
							}
							$tblhold.removeClass("hideBlock");
							$('#missed-1').find('.emptyTable').removeClass(
									'hideBlock');
							$('#missed-1').find('.stDtlActionBtns')
									.removeClass('hideBlock');
							$('#missed-2').find('.emptyTable').removeClass(
							'hideBlock');
							$('#missed-2').find('.stDtlActionBtns')
							.removeClass('hideBlock');
							$('#missed-3').find('.emptyTable').removeClass(
							'hideBlock');
							$('#missed-3').find('.stDtlActionBtns')
							.removeClass('hideBlock');
							formatMissedResults(responseP);
							loadReportContentTbl();
							// bindTableAfterLoad();
							$tblhold.find(".tooltip").tooltip({
								position : {
									my : "right top-20",
									at : "right+5 top-10"
								}
							});
							totalRecords = responseP.length;
							$("#noRecords").html(totalRecords);// Sets the no
							// of records
							//bindMissedArticlesExport();
							if (!filterApplyClicked) {
								defaultMissedArticlesFilters();
							}
								bindMissedPrintData();
								bindMissedArticlesExport();
							$currentMissedPanel!=undefined && $currentMissedPanel!='' ? $currentMissedPanel.removeClass('hideBlock') : '';
							
						} else {

							if (responseP != undefined && responseP.length <= 0) {
									if (filterButtonDivContentMissedArticle != ''
										&& filterButtonDivContentMissedArticle.length != 0
										&& reporttabIndex == 1) {
									filterButtonDivContentMissedArticle.appendTo('#missedArticleFilterButtonDiv .lookupActionWrapper');
									$("#missedArticleFilterButtonDiv").removeClass("hideBlock");
								}
								if (filterContentMissedArticles != ''
										&& filterContentMissedArticles.length != 0
										&& reporttabIndex == 1) {
									filterContentMissedArticles.appendTo('#tablefilters2');
									//$("#tablefilters2").html(
										//	filterContentMissedArticles);
									$("#tablefilters2").removeClass("hideBlock");
								}
								
								if (!filterApplyClicked) {
									$('#missed-1').find('.emptyTable').addClass('hideBlock');
									$('#missed-2').find('.emptyTable').addClass('hideBlock');
									$('#missed-3').find('.emptyTable').addClass('hideBlock');
									populateFiltersForMissedArticles();
									bindFilterEventsForMissedArticleReport();
								} else {
									bindDepartmentSelectEvent($("#missedArticleHierarchyId"),false);
									bindCategorySelectEvent($("#missedArticleHierarchyId"),false);
									bindSubCategorySelectEvent($("#missedArticleHierarchyId"),false);
									bindSegmentSelectEvent($("#missedArticleHierarchyId"),false);
									bindFilterEventsForMissedArticleReport();
									
									$('#missed-1').find('.stDtlActionBtns')
											.addClass('hideBlock');
									$('#missed-2').find('.emptyTable,#reportContent2').addClass('hideBlock');
									$('#missed-3').find('.stDtlActionBtns').addClass('hideBlock');
									$.fn
											.showCustomMsg(
													[ 'Sorry, No records found.' ],
													success,
													'Stocktake-Missed Articles Count Report');
									//$tblhold.addClass("hideBlock");
									$('.missMainTable_'+missedArticlesTabIndex+'').addClass("hideBlock");
									$('#reportContent2').find('.legend').addClass("hideBlock");
								}
							} else {
								$('#missed-1').find('.stDtlActionBtns').addClass('hideBlock');
								$('#missed-2').find('.stDtlActionBtns').addClass('hideBlock');
								$('#missed-3').find('.stDtlActionBtns').addClass('hideBlock');
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
												error,
												'Stocktake-Missed Articles Count Report');
							}
						}
						if(isNationalStocktake){
							var $missedCont = $('#missed-2');
							$missedCont.find('#tablefilters2').removeClass('hideBlock');
							$missedCont.find('#filterOpen2').addClass('hideBlock');
							if(responseP.length <= 0){
								$missedCont.find('#reportContent2,.emptyTable').addClass('hideBlock');
							}
						}
					}).fail(
					function() {
						stopLoading();
						showReportErrorMsg(
								'Sorry, Some technical issue occured ',
								'Stocktake-Missed Articles Count Report');
					}).always(function() {
						stopLoading();
			});
}
function frameMissedArtRpt(){
	if (filterButtonDivContentMissedArticle != ''
		&& filterButtonDivContentMissedArticle.length != 0
		&& reporttabIndex == 1) {
		filterButtonDivContentMissedArticle.appendTo('#missedArticleFilterButtonDiv .lookupActionWrapper');
	}
	if (filterContentMissedArticles != ''
			&& filterContentMissedArticles.length != 0
			&& reporttabIndex == 1) {
		filterContentMissedArticles.appendTo('#tablefilters2');
	}else{
		populateFiltersForMissedArticles();
		bindFilterEventsForMissedArticleReport();
	}
	$('#missedArtilcedepH').prop('checked',false).trigger('click');
	$('#missedArticleHierarchyId').find('[name="departmentList"]:first').prop('checked',true).trigger('click');
	$('#missed-2,#tablefilters2,#missedArticlesFilterDiv,#missedArticleHierarchyId,#missedArticleFilterButtonDiv').removeClass('hideBlock').find('.articleHead,.orderDetails,.emptyTable,#missed-dept-cont,#missedArticlescloseLink,#filterOpen2').addClass('hideBlock');
}
function callReportSTMissedArticleRegenerateService() {
	var requestParam = prepareMissedArticleRegenerateServiceParam();
	//console.log(reportSTMissedArticleRegenerateUrl + ' '
			//+ JSON.stringify(requestParam));
	// var requestParam = {};
	$
			.ajax({
				type : "POST",
				url : reportSTMissedArticleRegenerateUrl,
				data : JSON.stringify(requestParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						if (response != undefined && response.length > 0
								&& response[0].msg_typ == "S") {
							handleNoMissedArticleGenerate();// to call the
							// service that
							// fetches report
							// output
						} else {
							$.fn
									.showCustomMsg(
											[ 'Sorry. Missed Article Regeneration was not successful.Please try again.' ],
											error,
											'Stocktake-Missed Articles Count Report');
						}
					})
			.fail(
					function() {
						$.fn
								.showCustomMsg(
										[ 'Sorry, Some technical issue occured.' ],
										error,
										'Stocktake-Missed Articles Count Report');
					}).always(function() {
				stopLoading();
			});
}

function exportToCSVMissedArts(missedArtsArray, filename) {
	
	var groupedData=$groupBy(missedArtsArray, function(obj) {return obj.group_key;});
	var valuesArray = [ 'article_number', 'article_description', 'article_uom', 'om','sell_price', 'soh', 'last_sale_date' ];
	var headersArray = [ 'Article', 'Description','UOM','OM','Value ($)','SOH','Last Sold'];
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
			$.each(array, function(i) {
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
function bindMissedArticlesExport() {
	 callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles(true));
	 $(".missArticleExportBtn").on('click', function (event) {
		 callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles(true));			// on click of export - data pass
	    	$('#stockTakeForm').attr("action", "../stockTakeMissedArticlesCountreport/downloadStockTakeMissedArticleReportExcel.pdf");
	    	$('#stockTakeForm').attr('target','_blank');
	    	$('#stockTakeForm').attr('method','get');
	    	$('#stockTakeForm').submit();
	    });
	 //onLoadclickFunctions();
}

function bindMissedChecBxEvenChange(){/*
	if($('#reportContent1 .groupByClear').hasClass('hideBlock')){
		$('.missedArticleTblLoad').find('.selectAllPrintMissedCont').addClass('hideBlock');
	}else {
		$('.missedArticleTblLoad').find('.selectAllPrintMissedCont').removeClass('hideBlock');
	}

	$('#MissedArticles_report_'+missedArticlesTabIndex+'_table').find('input[name="subChk"]').unbind('change').bind('change',function(){

		if($(this).is(':checked')){
			selectedMissedSubCat[$(this).attr('data-sub-cat')] = 'Y';
		}else{
			if(selectedMissedSubCat[$(this).attr('data-sub-cat')]!=undefined){
				delete selectedMissedSubCat[$(this).attr('data-sub-cat')];
			}
			$('.selectAllPrintMissed').prop('checked',false);
		}
		bindMissedPrintData();
	});

	var reportResultArrayChk = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').data('confObj').groupedContObj;

	if(Object.keys(reportResultArrayChk).length == Object.keys(selectedMissedSubCat).length){
		$('.selectAllPrintMissed').prop('checked', true);
		$('.labelCheckBoxMissed').prop('checked', true);

		callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());

	}else if($(' .selectAllPrintMissed').prop('checked')){
		$('.labelCheckBoxMissed').prop('checked', true);
		for ( var key in reportResultArrayChk) {
			key = key.trim();
			selectedMissedSubCat[key] = 'Y';
		}
	}
	bindCheckBoxMissedArticleEvent();
*/}

function bindCheckBoxMissedArticleEvent(){
	if($('#MissedArticles_report_'+missedArticlesTabIndex+'_table').find('input[type="checkbox"]').length>0){
		$elem = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').find('input[type="checkbox"]');
		$elem.each(function(){
			if(selectedMissedSubCat[$(this).attr('data-sub-cat')]!=undefined){
				$(this).prop('checked',true);
			}
		});
	}
}

/**
 * @param data
 */
function tblReportMissedArticles(data) {
	this.option = 'build';
	this.key = [ /*'label',*/'article_number', 'article_description', 'article_uom', 'om',
			'sell_price'/*,'count'*/,'soh','last_sale_date' ];
	this.table_name = 'MissedArticles_report_'+missedArticlesTabIndex+'_'+data[0].article_number+'';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def missedArticleTblLoad';
	this.header_tr_class = 'collapsed';
	this.header_name = {
	/*	label : '',*/
		article_number : 'Article',
		article_description : 'Description',
		article_uom : 'UOM',
		om : 'OM',
		sell_price : 'Value ($)',	
		/*count:'Count',*/
		soh : 'SOH',
		last_sale_date : 'Last Sold'
	};
	this.header_data_type = {
		/*	label : '',*/
		article_number : 'number',
		article_description : 'char',
		article_uom : 'number',
		om : 'number',
		sell_price : 'number',
	/*	count:'number',*/
		soh : 'number',
		last_sale_date : 'date'
	};
	this.header_row_type = {
		/*	label : 'main',*/
		article_number : 'main',
		article_description : 'main',
		article_uom : 'main',
		om : 'main',
		sell_price : 'main',
	/*	count:'main',*/
		soh : 'main',
		last_sale_date : 'main'
	};
	this.header_class = {
		/*label : 'centerValue selectAllPrintMissed',*/
		article_number : ' leftValue ',
		article_description : ' leftValue ',
		article_uom : ' centerValue ',
		om : ' centerValue ',
		sell_price : ' centerValue ',
	/*	count:'centerValue ',*/
		soh : ' rightValue ',
		last_sale_date : ' rightValue '
	};
	this.header_width = {
		/*	label : '1%',*/
		article_number : '8%',
		article_description : '12%',
		article_uom : '5%',
		om : '5%',
		sell_price : '10%',
	/*	count:'5%',*/
		soh : '5%',
		last_sale_date : '8%'
	};
	this.content_class = {
	/*		label : 'selectAllPrintMissedCont',*/
		article_number : ' leftValue ',
		article_description : ' leftValue ',
		article_uom : ' centerValue ',
		om : ' centerValue ',
		sell_price : ' centerValue ',
	/*	count:'centerValue countClassCnt',*/
		soh : ' rightValue ',
		last_sale_date : ' rightValue '
	};
	this.content_format = {
		/*	label : '',*/
		article_number : 'removeNull',
		article_description : 'removeNull',
		article_uom : 'removeNull',
		om : 'removeNull',
		sell_price : 'removeNull',
	/*	count:'removeNull',*/
		soh : 'removeNull',
		last_sale_date : 'mobi_date'
	};
	this.content_width = {
		/*	label : '1%',*/
		article_number : '8%',
		article_description : '12%',
		article_uom : '5%',
		om : '5%',
		sell_price : '10%',
	/*	count:'5%',*/
		soh : '5%',
		last_sale_date : '8%'
	};
	this.content_title = {}, this.header_title = {};
	this.header_td_label = {/*label:'<label><input class="selectAllPrintMissed" name="MainChk" type="checkbox"></input></label>'*/};
	this.cont_data_function = {soh:showArticleSOHView, /*count:showCountValues,*/article_uom:showUOM,sell_price:getSellPrice,label:showLabel,article_number:getArticleTdclassDispMissed};
	this.content_td_addon = {};
	
	this.data_td_class = {
		article_number : getMissedArticleTdclass
	};
	this.data_tr_class = {
		func_class : getMissedArticleTrclass
	};
	this.default_groupbyColumn = [ 'sub_category_name' ];
	this.groupbyColumn = {
		'sub_category_name' : 'Sub-category'
	};
	this.group_cont_function = {
		sub_category_name : getSubCatContForMissedArticles
	};
	this.groupby = true;
	this.content = data;
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
	
	this.content_label = {};
	//this.legend = '<div class="legend"><label> Legend: <label class="pb">Pack Breakdown</label> <label class="d">Deleted</label><label class="style">Style</label><label class="productRecalled">Product Recalled</label></label></div>';
	this.sort_done = bindMissedPrintData;
	this.group_done = bindMissedPrintData;
	this.page_done = {page_done: bindMissedChecBxEvenChange};
	this.header_td_addon = {/*label:{'.selectAllPrintMissed':{event:{click : bindPrintAllClickMissed},display: function(){}}}*/};
	this.content_td_addon = {/*label:{'.selectAllPrintMissed':{event:{click : bindPrintAllClickMissed},display: function(){}}}*/};
	//this.data_td_class = {count: hideCountPending};			//defect - 9727
}
var showLabel = function(obj, confObj) {
	return '';
};
var bindPrintAllClickMissed =function(e)
{
	var reportResultArrayChk = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').data('confObj').groupedContObj;
	if($(this).hasClass('selectAllPrintMissed')){
		if($(this).prop('checked')){
			$('.labelCheckBoxMissed').prop('checked', true);
			for ( var key in reportResultArrayChk) {
				key = key.trim();
				selectedMissedSubCat[key] = 'Y';
			}
			callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());
		}else{
			$('.labelCheckBoxMissed').prop('checked', false);
			for ( var key in reportResultArrayChk) {
				key = key.trim();
				delete selectedMissedSubCat[key];
			}
		}	
	}else{
		if($(this).prop('checked')){

			if(Object.keys(reportResultArrayChk).length == Object.keys(selectedMissedSubCat).length){
				$('.selectAllPrintMissed').prop('checked', true);
				for ( var key in reportResultArrayChk) {
					selectedMissedSubCat[key] = 'Y';
				}
				callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());
			}
		}else{
			if(Object.keys(reportResultArrayChk).length != Object.keys(selectedMissedSubCat).length){
				$('.selectAllPrintMissed').prop('checked', false);
			}
		}

	}
	bindMissedArticlesExport();
};
/**
 * Group by sub category
 */
var getSubCatContForMissedArticles = function(obj, confObj) {/*
	var cont = '<tr id="none"></tr>';
	console.log("Sub-cate "+obj.sub_category_name);
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="15"><input type="checkbox" data-sub-cat="'+obj.sub_category_name+'"  class="labelCheckBox labelCheckBoxMissed" name = "subChk" id = "chk_'+obj.sub_category_name+'" subnameMissedArticle="'
				+ (obj.sub_category_name || '')
				+ '">'
				+ (obj.sub_category_name || '') + '</td></tr>';
	}
	return cont;
*/};

var hideCountPending = function(obj, $td,$th){
	activeStatus = $('#mainTabs-2 .ui-tabs-active').attr('aria-controls')
	.split("missed-")[1];
	if(activeStatus == "1"){
		$td.addClass('hideBlock');
	}else{
		$td.removeClass('hideBlock');
	}
};
function bindTableAfterLoad(){
	activeStatus = $('#mainTabs-2 .ui-tabs-active').attr('aria-controls')
	.split("missed-")[1];
	if(activeStatus == "1"){
	$('.missedArticleTblLoad').find('.countClassCnt').addClass('hideBlock');
	}else {
		$('.missedArticleTblLoad').find('.countClassCnt').removeClass('hideBlock');
	}
	} 
/*
 * var showMissedArticlesLegend = function(obj){ var colClass = ''; var title =
 * ''; if(obj.pbd_ind == 'Y'){ colClass = 'pb right'; }else
 * if(obj.deleted_line_ind == 'N'){ colClass = 'd right tooltip'; title =
 * 'Article is Deleted'; }
 * 
 * return '<label class="'+colClass+'"
 * title="'+title+'">&nbsp;'+obj.article_number+'</label>'; };
 */

var showArticleSOH = function(obj)
{
	if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y' && obj.perpetual_flag == 'Y')
	{
		return (obj.pi_uom != 'KG' ? Number(obj.pi_soh).toFixed(0) : obj.pi_soh) +' '+obj.pi_uom+' & '+ (obj.article_uom == 'KG' ? Number(obj.soh).toFixed(3) : soh)+' '+obj.article_uom;
	}else if ((obj.random_weight_flg == null || obj.random_weight_flg == "" || obj.random_weight_flg == 'N') && obj.perpetual_flag == 'Y'){
		return obj.soh+' '+obj.article_uom;
	}
	else if(obj.perpetual_flag == 'N' || obj.perpetual_flag == ''){
		obj.soh  = '';
	}
	return (obj.soh || '');
};

var showArticleSOHView = function(obj)
{
	if(obj.perpetual_flag == '' || obj.perpetual_flag == 'N'){
		return	(obj.soh = '');
		}
	return (obj.soh || '');
};

/*var showCountValues = function(obj){

	return checkIfRandomWeightArticle(obj,obj.count,obj.count_qty);
};*/

var showUOM = function(obj){
	return ((obj.article_uom != null && obj.article_uom !='' ) ? obj.article_uom : '');
};

var getSellPrice = function(obj){
	return ((obj.sell_price != null && obj.sell_price !='' ) ? obj.sell_price+' per '+obj.article_uom :'');
};
var getArticleTdclassDispMissed = function(obj,confObj){
	var colClass = [];
	var promo_indicator = [];
	var addingDiv ='';
	if(obj.pbd_indicator == 'Y' || obj.cpbd_flag == 'Y'){
		colClass.push('<div class = "pb right"></div>');
	
	} 
	if(obj.linked_ind == 'Y'){
		colClass.push('<div class = "linked right"></div>');
		
	} 
	if(obj.deleted_indicator == 'Y'){
		colClass.push('<div class ="d right tooltip"></div>');
	}
	if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		colClass.push('<div class = "style right"></div>');
	}
	 if(obj.ps_article_status == '08'){
		colClass.push('<div class = "productRecalled right tooltip"></div>');
	}
	promo_indicator = promo_indicator.join();
	colClass = colClass.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
	addingDiv = (colClass.replace(/,/g, " "));
	
	return obj.article_number+''+addingDiv;
};

var getMissedArticleTdclass = function(obj, $td) {
	var promo_indicator = [];
	if(obj.pbd_indicator == 'Y' || obj.cpbd_flag == 'Y'){
		promo_indicator.push("PB");
	} 
	if(obj.linked_ind == 'Y'){
		promo_indicator.push(" L");
	} 
	if(obj.deleted_indicator == 'Y'){
		promo_indicator.push("D");
		$td.attr('title', 'Article is Deleted');
	}
	if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		promo_indicator.push("S");
	}
	if(obj.ps_article_status == '08'){
		promo_indicator.push("PR");
	}
	promo_indicator = promo_indicator.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
	
	
	/*
	var colClass = '';
	var promo_indicator = '';
	if (obj.pbd_indicator == 'Y') {
		colClass = 'pb right';
		promo_indicator = "PB";
	} else if (obj.deleted_indicator == 'Y') {
		colClass = 'd right tooltip';
		promo_indicator = "D";
		$td.attr('title', 'Article is Deleted');
	}else if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		colClass = 'style right tooltip';
		promo_indicator = "S";
	}else if(obj.ps_article_status == '08'){
		colClass = 'productRecalled right tooltip';
		promo_indicator = "PR";
	}
	obj.promo_indicator = promo_indicator;
	$td.addClass(colClass);

*/};

var getMissedArticleTrclass = function(obj, $td, $tr) {
	if (obj.deleted_indicator == 'Y') {
		$tr.addClass('warningIndicator');
	}
};
/**
 * Frames print screen content
 * 
 * @param response
 */
function frameReportSTMissedArticles(response) {
	content = '';
	var headerContent = '<label><strong>Missed Articles Report</strong></label><div style="float:right"><label class="subtitle">'
			+ $("#posSite").val()
			+ '</label><label class="subtitle">|<label><label class="subtitle">'
			+ $("#posSiteName").val()
			+ '</label></div></br></br><label class="subtitle-bold">'
			+ '</br><label class="subtitle">List of articles (<strong id="noRecords">'
			+ totalRecords + '</strong>)</label></br></br>';
	constructHeaderTblSTMissedArticles();
	content += printHeadInnerTable;
	frameTableSTMissedArticles(response);
	$('#printbodyForSTMissedArticles')
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
function frameTableSTMissedArticles(response) {
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

	// Group By Sub category
	map = $groupBy(response, function(obj) {// Group By - This returns
		// map{key:groupby,value:[obj,obj,obj]}
		return obj.sub;
	});

	for ( var m in map) {
		count++;
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="12" style="font-weight:bold">'
				+ m + '</td></tr>';
		for ( var i = 0; i < map[m].length; i++) {

			constructContentTblSTMissedArticles(response[i]);

			// Split Pages - Starts
			var firstPageRecords = 10;
			var otherPageRecords = 10;
			/*
			 * if(response[i].article_number.length > 35){ count = count +
			 * 0.5*(response[i].article_number.length/35); }
			 */
			if (i >= (response.length - 1)) {
				content += '</tbody></table>';
				content += '<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: PB Pack Breakdown, D Deleted,L Linked, S Style, PR Product Recalled</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>';
			}
			if (count >= firstPageRecords && !firstPageCreated) {
				count = 0;
				firstPageCreated = true;
				content += '</tbody></table>' + printFoot + '</div>'
						+ printHeadInnerTable;
			} else {
				if (i >= (response.length - 1)) {
					/*
					 * if(count != otherPageRecords && i> firstPageRecords){
					 * content += '<table><tbody>'; for(var n=0;n<((otherPageRecords)-count);n++){
					 * content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; }
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
}
/**
 * Builds table header for print page
 */
function constructHeaderTblSTMissedArticles() {
	printHeadInnerTable = '<div class="page"><table cellspacing="0" style="font-size: 15px;height:45%;min-height:510px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable ContentTable">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="centerValue">Article</th>'
			+ '<th class="centerValue">Description</th>'
			+ '<th class="centerValue">UOM</th>'
			+ '<th class="centerValue">OM</th>'
			+ '<th class="centerValue">Value($)</th>'
			+ '<th class="centerValue">SOH</th>'
			+ '<th class="centerValue">Last Sold</th>' + '</tr>' + '</thead>';

}
/**
 * Builds table content for print page
 * 
 * @param data
 */
function constructContentTblSTMissedArticles(data) {
	content += '<tr class="border_bottom"><td  align="left">'
			+ (data.article_number != null ? data.article_number : '')
			+ '</td><td class="centerValue">'
			+ (data.article_description != null ? data.article_description : '')
			+ '</td><td class="centerValue">'
			+ (data.article_uom != null ? data.article_uom : '')
			+ '</td><td class="centerValue">'
			+ (data.om != null ? data.om : '')
			+ '</td><td class="centerValue">'
			+ (data.sell_price != null ? data.sell_price : '')
			+ '</td><td class="centerValue">'
			+ (data.soh != null ? data.soh : '')
			+ '</td><td class="centerValue">'
			+ (data.last_sale_date != null ? data.last_sale_date : '');
}

function formatMissedResults(response){
	var fObj = {};
	if(response!=null && response.length>0){
		for(var i = 0;i<response.length;i++){
			fObj  = response[i];
			if(fObj.article_uom != 'KG'){
				if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
					fObj.soh = '';
				}else{
					fObj.soh = (fObj.soh !=null && fObj.soh !=undefined) ? correctDecimalPostion(fObj.soh) : '';
				}
			}else{
				if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
					fObj.soh = '';
				}else{
					fObj.soh = Number(fObj.soh||'').toFixed(3);
					}
				}
				fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
				fObj.soh = showArticleSOH(fObj);
				fObj.om = correctDecimalPostion(fObj.om||'');
			}
	}
}
function formatMissedResultsForExport(response){
	var fObj = {};
	var fObjArray=[];
	if(response!=null && response.length>0){
		for(var i = 0;i<response.length;i++){
			fObj  = response[i];
				if(fObj.article_uom != 'KG'){
				if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
					fObj.soh = '';
				}else{
					fObj.soh = correctDecimalPostion(fObj.soh||'');
				}
			}else{
				if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
					fObj.soh = '';
				}else{
					fObj.soh = Number(fObj.soh||'').toFixed(3);
				}
			}
				fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
				fObj.soh = showArticleSOH(fObj);
				fObj.om = correctDecimalPostion(fObj.om||'');
				fObjArray.push(fObj);
			}
	}
	return fObjArray;
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

function prepareMissedArticlesReportParam(area) {
	var aisleArray = new Array();
	var bayArray = new Array();
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();

	if (area.find('#missedArtilcedepH').is(':checked')) {
		// Department selection
		area.find("input[name='departmentList']").each(function() {
			if ($(this).is(':checked')) {
				deptArray[deptArray.length] = $(this).val();
			}
		});

		// Category
		area.find("input[name='category']").each(function() {
			if ($(this).is(':checked')) {
				catArray[catArray.length] = $(this).val();
				var index = deptArray.indexOf($(this).attr('depid'));
				if (index > -1) {
					deptArray.splice(index, 1);
				}
			}
		});

		// Sub Category
		area.find("input[name='subCat']").each(function() {
			if ($(this).is(':checked')) {
				subCatArray[subCatArray.length] = $(this).val();
				var index = catArray.indexOf($(this).attr('catid'));
				if (index > -1) {
					catArray.splice(index, 1);
				}
			}
		});

		// Segment
		area.find("input[name='segmentList']").each(function() {
			if ($(this).is(':checked')) {
				segArray[segArray.length] = $(this).val();
				var index = subCatArray.indexOf($(this).attr('scatid'));
				if (index > -1) {
					subCatArray.splice(index, 1);
				}
			}
		});
	} else {
		area.find('#missedArticlesDeptDrpDwnUl').find(
				'.deptDrpDwnChkBx:checked').each(function() {
			deptArray[deptArray.length] = $(this).val();
		});
	}

	if (area.find('#missedArticleAisleH').is(':checked')) {
		// aisle selection
		area.find("input[name='aisleList']").each(function() {
			if ($(this).is(':checked')) {
				aisleArray[deptArray.length] = $(this).val();
			}
		});

		// bay
		area.find("input[name='bay']").each(function() {
			if ($(this).is(':checked')) {
				bayArray[bayArray.length] = $(this).val();
				var index = aisleArray.indexOf($(this).attr('aisleId'));
				if (index > -1) {
					aisleArray.splice(index, 1);
				}
			}
		});
	} else {
		area.find('#missedArticlesAisleDrpDwnUl').find(
				'.ailseDrpDwnChkBx:checked').each(function() {
			aisleArray[aisleArray.length] = $(this).val();
		});
	}
	
	var sohCheck='';
	if($("#exArtSohChk").is(':checked'))	
	{
		sohCheck="Y";
	};

	var activeStatus = "";
		var missedNum = "";

		activeStatus = $('#mainTabs-2 .ui-tabs-active').attr('aria-controls')
				.split("missed-")[1];

		if (activeStatus == "1") {
			missedNum = "OPEN";
		} else if (activeStatus == "2") {
			missedNum = "INPROGRESS";
		} else if (activeStatus == "3") {
			missedNum = "CLOSED";
		}
	var param = {
		"iv_st_id" : $("#reportDetailsStockTakeId").html(),
		"iv_dept" : deptArray.join(","),
		"iv_cat_id" : catArray.join(","),
		"iv_sub_cat_id" : subCatArray.join(","),
		"iv_seg_id" : segArray.join(","),
		"iv_ex_art_soh_chk" :sohCheck,
		"iv_ex_days_chk" : area.find('#exDaysChk').val(),
		"iv_article_no" : "",
		"iv_article_barcode" : "",
		"iv_barcode_flag" : "",
		"iv_field" : "",
		"iv_criteria" : "",
		"iv_value" : "",
		"iv_st_art_sts" : missedNum,
		"iv_article":"",
		"iv_article_barcode":"",
		"iv_barcode_flag":"",
		"iv_userid":""
	};

	allInputs = "Aisles: " + aisleArray.join(",") + "| Sub-categories: "
			+ subCatArray.join(",");
	if(area.find('#exDaysChk').val()!=null && area.find('#exDaysChk').val()!=undefined && area.find('#exDaysChk').val()!=''){
		allInputs+= "| Articles not sold for " + area.find('#exDaysChk').val() + " days";
	}

	return param;
}
function prepareMissedArticleRegenerateServiceParam() {
	var param = {
		"iv_session_id" : "",
		"iv_sales_org" : $("#salesOrg").val(),
		"iv_site_no" : $("#posSite").val(),
		"iv_st_id" : $("#reportDetailsStockTakeId").html(),
		"iv_article_no" : "",
		"iv_barcode_flag" : "",
		"iv_article_barcode" : "",
		"iv_uom" : "",
		"iv_weight" : "",
		"iv_count" : "",
		"iv_st_loc_id" : "",
		"iv_st_loc_no" : "",
		"iv_st_aisle" : "",
		"iv_st_side" : "",
		"iv_st_bay" : "",
		"iv_plano_loc_flg" : "",
		"iv_userid" : $("#loginUserId").val(),
		"iv_sell_price" : "",
		"iv_soh" : "",
		"iv_location_finish" : "",
		"iv_msd_art_flg" : "",
		"iv_count_finish" : "Y",
		"iv_dept_lst" : "",
		"iv_recount_flg" : "",
		"iv_unknown_item_flag" : "",
		"iv_sequence" : "",
		"iv_regenerate_msd" : 'Y',
		"iv_update_exstng_cnt" : "",
		"iv_usr_loc_finish" : "",
		"iv_added_item_flag" : "",
        "iv_art_desc" : "",       
        "iv_base_uom" : "",       
        "iv_om" : "",              
        "iv_ean" : "",              
        "iv_pack_size" : "",       
        "iv_pack_size_base" : "",  
        "iv_rndm_wght_flag" : "",  
        "iv_wght_flag" : "",       
        "iv_dept" : "",             
        "iv_seg" : "" ,             
        "iv_linked_flag" : "" ,     
        "iv_pbd_avl_uoms" : "" ,    
        "iv_order_uom" : "",        
        "iv_pbd_ind" : "",          
        "iv_pi_flag" : "",          
        "iv_pi_om" : "",            
        "iv_cpbd_flag" : "",
        "iv_sap" : encSapPwd
	};
	return param;
}

function callStockTakeMissedArticleCountJasperPrint(reportResultArray) {
	//var applyGroupBy = $('.missMainTable_'+missedArticlesTabIndex+'').data('confObj').applyGroup ? "Y": "";
	var applyGroupBy = $('.printSTMissContent ').is(':visible') ? "Y": "";

	var obj = {
		stockTakePrint : stockTakePrint,
		reportResult : reportResultArray,
		reportFor : allInputs,
		storeNo : $('#posSite').val(),
		storeName : $('#posSiteName').val(),
		totalCount : reportResultArray.length,
		applyGroupby : applyGroupBy
	};
	// //console.log(JSON.stringify(obj));
	$
			.ajax({
				url : "../stockTakeMissedArticlesCountreport/printStockTakeMissedArticleCountReportPDF.htm",
				type : "POST",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(obj),
				cache : false, // This will force requested pages not to be
				// cached by the browser
				processData : false, // To avoid making query String instead
				// of JSON
				beforeSend : function() {
					startLoading();
				},
				success : function(response, textStatus) {
					// //console.log(response.data);
					if (response.data == 'success') {
						
					}
					// //console.log("success");
					stopLoading();
				},
				error : function(xhr, textStatus, errorThrown) {
					//console.log('request failed' + errorThrown);
					stopLoading();
				}
			});
}
var bindMissedPrintData = function(){
	/*if($('.printSTMissContent').is(":visible")){
		$('#reportContent2').find('.tableActionsBtnsWrapper .groupByOpen').addClass('hideBlock');
		$('#reportContent2').find('.tableActionsBtnsWrapper .groupByClear ').removeClass('hideBlock');
		$('#reportContent2').find('.group_cont_table').removeClass('hideBlock');
	} 
	/*$('#reportContent2').find('.noChildNew_missed .group_cont_table').addClass('hideBlock');
	$('#reportContent2').find('.noChildNew_missed ').find('#tablefilters2').addClass('hideBlock');*/
	//$('#reportContent2').find('.noChildNew_missed .group_cont_table').remove();
	//$('#reportContent2').find('.noChildNew_missed ').find('#tablefilters2').remove();
	//bindMissedChecBxEvenChange();
	callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());
};
function getPrintExportDataForMissedArticlesOld(excelFlag) {
	var reportResultArray = [];
	var newArray = [];
	var finalArray = [];
	var selectAllPrint = false;
	//var checkedL=$('#MissedArticles_report_'+missedArticlesTabIndex+'_table').find('input[type="checkbox"]').is(':checked');
	if($('.selectAllPrintMissed').prop('checked')){
		selectAllPrint = true;
	}
	//var applyGroupBy = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').data('confObj').applyGroup;
	var applyGroupBy = $('.missMainTable_'+missedArticlesTabIndex+'').data('confObj').applyGroup;
	
	if (applyGroupBy) {
		//reportResultArray = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').data('confObj').groupedContObj;
		reportResultArray = $('.missMainTable_'+missedArticlesTabIndex+'').data('confObj').groupedContObj;
		if(excelFlag || selectAllPrint){
			for ( var key in reportResultArray) {
					newArray = (reportResultArray[key]);
					for ( var i = 0; i < newArray.length; i++) {
						finalArray.push(newArray[i]);
					}
			}
		}/*else{
		for ( var key in reportResultArray) {
			var keyVal = key.trim();
			if (selectedMissedSubCat[reportResultArray[key][0].sub_category_name]!=undefined) {
				newArray = (reportResultArray[key]);
				for ( var i = 0; i < newArray.length; i++) {
					finalArray.push(newArray[i]);
				}
			}
		}
	}*/
	} else {
		//finalArray = $('#MissedArticles_report_'+missedArticlesTabIndex+'_table').data('confObj').content;
		finalArray = $('.missMainTable_'+missedArticlesTabIndex+'').data('confObj').content;
	}

	return finalArray;
}
function printMissedContent(){
	$('#stockTakeForm')
		.attr(
				"action",
				"../stockTakeMissedArticlesCountreport/downloadStockTakeMissedArticleReportPdf.pdf");
	$('#stockTakeForm').attr('target', '_blank');
	$('#stockTakeForm').attr('method', 'get');
	$('#stockTakeForm').submit();  
}

function pendingTabShow(data){
	$('#missed-1').removeClass('hideBlock');
	$('#missed-1').find('.ContentTableWrapper .articleHead').addClass('hideBlock');
	$('#missed-1').find('.ContentTableWrapper .articleContent').addClass('hideBlock');
	$('#missed-1').find('.ContentTableWrapper .stDtlActionBtns').addClass('hideBlock');
	$('#missed-1').find('.ContentTableWrapper .tableInfo').html('');
	$('#missed-1').find('.ContentTableWrapper .tableInfo').removeClass('hideBlock');
	$('#missed-1').find('#missedArticleFilterButtonDiv').addClass('hideBlock');
	$('#missed-1').find('#tablefilters2').addClass('hideBlock');
	//$('#missed-1').find('.ContentTableWrapper .tableInfo .pendingMissed').find('.ContentTable').html('')
	var dataPass = '';
	var row = '';
	var objDisp = data;
	var allObjArray = new Array();
	if(objDisp != '' && objDisp != null){
		allObjArray = objDisp.split(",");
		if(allObjArray.length > 0){
			console.log(allObjArray.length);
			dataPass = allObjArray;
			dataPassGlobel = dataPass;
			row += '<div class = clearText><Strong style= "font-size: 1.1em">List of all pending missed subcategory</Strong></div><br>';
			row += '<div class = pendingMissed ><table style="width:100%" class="ContentTable ascending"><tbody class="uomRadioTablePopUp"><tr><th class= "actionrows header sorted ascending  " onclick="sortFunction()">Sub-Category Name</th>';
			for (var i=0;i<dataPass.length;i++){
				row += '<tr><td >'+dataPass[i]+'</td></tr>';
			}
			row += '</tbody></table></div>';
		}
	}
	if(dataPass.length >0){
		$('#missed-1').find('.ContentTableWrapper .tableInfo').append(row);
	}
}
function sortFunction(){
	var ascendingChk = $('#missed-1').find('.pendingMissed .ContentTable').hasClass('ascending');
	var decendingChk = $('#missed-1').find('.pendingMissed .ContentTable').hasClass('decending');
	$('#missed-1').find('.ContentTableWrapper .tableInfo ').html('');
	var row = '';
	if(ascendingChk){
		decendingChk = false;
		row += '<div class = clearText><Strong style= "font-size: 1.1em">List of all pending missed subcategory</Strong></div><br>';
		row += '<div class = pendingMissed ><table style="width:100%" class="ContentTable decending"><tbody class="uomRadioTablePopUp"><tr><th class= "actionrows header sorted descending " onclick="sortFunction()";>Sub-Category Name</th>';
		for (var i=dataPassGlobel.length-1;i>= 0;i--){
			row += '<tr><td >'+dataPassGlobel[i]+'</td></tr>';
		}
		row += '</tbody></table></div>';
	}
	if(decendingChk){
		ascendingChk = false;
		row += '<div class = clearText><Strong style= "font-size: 1.1em">List of all pending missed subcategory</Strong></div><br>';
		row += '<div class = pendingMissed ><table style="width:100%" class="ContentTable ascending"><tbody class="uomRadioTablePopUp"><tr><th class= "actionrows header sorted ascending " onclick="sortFunction()";>Sub-Category Name</th>';
		for (var i=0;i<dataPassGlobel.length;i++){
			row += '<tr><td >'+dataPassGlobel[i]+'</td></tr>';
		}
		row += '</tbody></table></div>';
	}
	if(dataPassGlobel.length >0){
		$('#missed-1').find('.ContentTableWrapper .tableInfo').append(row);
	}

}
function tblReportMissedSubCategory(data){
	
	this.option = 'build';
	this.key = ['label','print','subcat'];
	this.table_name = 'missed_rpt_subcat_'+missedArticlesTabIndex;
	this.table_title = '';
	this.table_class = 'drilldownTable ContentTable treetable actionRows missMainTable_'+missedArticlesTabIndex+'';
	this.header_tr_class = 'collapsed';
	this.header_name = {label:'',print:'',subcat:''};
	this.header_data_type = {label:'',print:'',subcat:'char' };
	this.header_row_type = {label:'',print:'',subcat:'main'};
	this.header_class = {label:'showSTMissExpand',print:'noSort',subcat:''};
	this.header_title = {},
	this.header_width = {label:'15px',print:'',subcat:''};
	this.content_tr_class = 'collapsed maintr';
	this.content_class = {label:'showSTMiss',print:'noSort',subcat:''};
	this.content_title = {};
	this.content_format = {label:'',print:'',subcat:'trim'};
	this.content_width =  {label:'15px',print:'15px',subcat:'560px'};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;	
	this.recordPerPage= 10;
	this.group_done = {group_done : function() {groupDone();}};
	this.default_groupbyColumn = ['subcat' ];
	this.groupbyColumn = {'subcat' : 'Sub Category'};
	this.group_cont_function = {subcat : getSubCatgGrpHeadForMissed};
	this.groupby = true;
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	/*this.sort_done = {sort_done:varSortDone};
	this.page_done = {page_done: varPageDone};*/
	this.sort_done = bindMissedPrintData;
	this.group_done = bindMissedPrintData;
	this.page_done = {page_done: bindChecBxEvenChangeMissed};
	this.cont_data_function = {subcat:showsubCat_arrayMissed, print:showPrintMissed};
	this.cont_sort_function = {subcat:getsubCat_arrayMissed};
	this.content_bind_event = {click: expandCollapseEventBindMissed};
	this.content_tr_addon = {click: ''};
	this.legend = '<div class="legend"><label> Legend: <label class="pb">Pack Breakdown</label> <label class="d">Deleted</label><label class="linked">Linked</label><label class="style">Style</label><label class="productRecalled">Product Recalled</label></label></div>';
	this.content_td_addon = {label:{'span':{event:{click : ''},display: function(){}}}};
	this.header_td_addon = {label:{'span':{event:{click : expandAllEventMissed},display: function(){}}},
			print:{'.selectAllPrintMissed':{event:{click : bindPrintAllClickMissed},display: function(){}}}};
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',print:'<input name = "headerChk" class="selectAllPrintMissed noSort" name = "headerChk" type="checkbox" data-sub-cat="printAll">',subcat:'SUB CATEGORY'};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>'/*,print:'<input class="printSTVar noSort" type="checkbox" data-sub-cat="printAll">'*/};
	this.content_tr_addon = {click: ''};
}
	var getSubCatgGrpHeadForMissed = function(obj, confObj) {
	};
	
	function bindChecBxEvenChangeMissed(){
		$('.printSTMissContent').unbind('change').bind('change',function(){
			// Defect_12341
			var $tmpElem = $(this);
			var $tr = $tmpElem.closest('tr');
			if($tr.find('.printSTMissContent').is(':checked')){
				$tr.data('obj').sub_cat_selected = true;
			}else{
				$tr.data('obj').sub_cat_selected = false;
			}
			// Defect_12341
			//if (checkSelectAll($('#missed_rpt_subcat_'+missedArticlesTabIndex+'_table'))){
			if ($('.missMainTable_'+missedArticlesTabIndex+'').find("[name='contentChk']:checked").length  == ($('.missMainTable_'+missedArticlesTabIndex+'').find("[name='contentChk']").length)){
				$('.missMainTable_'+missedArticlesTabIndex+'').find('.selectAllPrintMissed' ).prop('checked', true);
			}else{
				$('.missMainTable_'+missedArticlesTabIndex+'').find('.selectAllPrintMissed' ).prop('checked', false);
			}
			//bindMissedArticlesExport();
		});

	}


	var bindVariancePrintData = function($tr,$tbl){
		bindMissedArticlesExport();
		callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());
	};
	var bindPrintAllClickMissed=function(e)
	{
		var selectAll = false;
		if($(this).hasClass('selectAllPrintMissed')){
			if($(this).prop('checked')){
				$('.printSTMissContent').prop('checked', true);
				selectAll = true;
			}else{
				$('.printSTMissContent').prop('checked', false);			
			}			
		}
		//Defect_12341
		var $selecteTbl = $(this).closest('table');
		var cont = $selecteTbl.data('confObj').content;
		for(var i = 0;i<cont.length;i++){
			cont[i].sub_cat_selected = selectAll;
		}
		$selecteTbl.data('confObj').selectAll = selectAll;
		bindMissedArticlesExport();
	};
	var showPrintMissed = function(obj){
		//Defect_12341
		return '<input name = "contentChk" type="checkbox" '+(obj.sub_cat_selected!=undefined && obj.sub_cat_selected == true ? 'checked' : '')+' name = "contentChk" data-sub-cat="'+obj.sub_category_name+'" class="labelCheckBox printSTMissContent noSort" subnameMissed="'+ (obj.sub_category_name || '') + '">';
	};
	
	var getsubCat_arrayMissed = function(){
		return 'tot_sub_cat';
	};

	var showsubCat_arrayMissed = function(obj){
		var tempArray = obj.sub_cat_array;
		var temp = '';
		var sub_cat_str = '';
		var tempobj = {};
		var key ='';
		var j = -1;
		for(var i=0;i<tempArray.length;i++){
			key = tempArray[i];
			if(tempobj[key]==undefined){
				tempobj[key] = key;
				j++;
				if(j < 2){
					temp += ((j == 1) ? ', ': '') +'<span><strong>'+key+'</strong></span>';
					sub_cat_str += ((j == 1) ? ', ': '')+key;
				}else if(j == 2){
					sub_cat_str += ', '+key;
				}else{
					sub_cat_str += ', '+key;
				}
			}
		}	
		obj.tot_sub_cat = sub_cat_str;
		
		$('.missMainTable_'+missedArticlesTabIndex+'').find('.selectAllPrintMissed' ).prop('checked', false);		// clearing printAll Checkbos on each sorting
		
		return temp.replace('CONTENTMORE',(j-1));
	};

	var varSortDone = function($elem){
		callExpandTrigger($elem);
	};

	var varPageDone = function($elem){
		callExpandTrigger($elem);
	};
	function callExpandTrigger($elem){
		var opt = '';
		if($elem.attr('manualExpand') == 'true' || $elem.attr('autoExpand') == 'true'){
			$elem.addClass(expanded).removeClass(collapsed);
			opt = collapsed;
			triggerExpandAllMissed($elem,opt);
		}else if(($elem.attr('manualExpand') != '' && $elem.attr('manualExpand') == 'false') || ($elem.attr('autoExpand')!= '' && $elem.attr('autoExpand') == 'false')){
			$elem.removeClass(expanded).addClass(collapsed);
			opt = expanded;
			triggerExpandAllMissed($elem,opt);
		}else{
			triggerExpandAllMissed($elem,opt);
		}
	}
	function triggerExpandAllMissed($elem,opt){
		var $tbl = $elem.closest('table');
		var list = [];
		var flag = false;
		var $telem = '';
		if(opt == ''){
			list = $tbl.find('tbody tr.maintr');
			flag = true;
		}else{
			list = $tbl.find('tbody .'+opt+'.maintr');
		}
		for(var i = 0;i<list.length;i++){
			$telem = $(list[i]);
			if(flag){
				if($telem.data('obj').expanded){
					$telem.addClass(collapsed).removeClass(expanded);
					$telem.data('obj').expanded =false;	
					expandCollapseEventMissed({data:{tr:$telem, flag: false}});
				}
			}else{
				expandCollapseEventMissed({data:{tr:$telem, flag: false}});
			}
		}
	}
	function expandCollapseEventBindMissed($elem){
											// Defect_9874
		if($elem.target.nodeName == 'A'){			
			expandCollapseEventMissed($elem);
		}
		// Defect_12342
		var $tmpElem = $($elem.target);
		var $tr = $tmpElem.closest('tr');
		if($tr.find('.printSTMissContent').is(':checked')){
			$tr.data('obj').sub_cat_selected = true;
		}else{
			$tr.data('obj').sub_cat_selected = false;
		}
		// Defect_12342
		//if (checkSelectAll($('#missed_rpt_subcat_'+missedArticlesTabIndex+'_table'))){
		if ($('.missMainTable_'+missedArticlesTabIndex+'').find("[name='contentChk']:checked").length  == ($('.missMainTable_'+missedArticlesTabIndex+'').find("[name='contentChk']").length)){
			$('.missMainTable_'+missedArticlesTabIndex+'').find('.selectAllPrintMissed' ).prop('checked', true);
		}else{
			$('.missMainTable_'+missedArticlesTabIndex+'').find('.selectAllPrintMissed' ).prop('checked', false);
		}
		callStockTakeMissedArticleCountJasperPrint(getPrintExportDataForMissedArticles());
	}

	function expandAllEventMissed($elem){
		
		var $elem = $('.missMainTable_'+missedArticlesTabIndex+' tr:first');
		var $tbl = $elem.closest('table');
		
		var confObj = $tbl.data('confObj');
		$elem.toggleClass(expanded+' '+collapsed);
		var opt = '';
		var flag = true;
		if($elem.hasClass(expanded)){
			$elem.attr(manualExpand,'true');
			confObj.count = confObj.content.length;
			opt = collapsed;
		}else{
			$elem.attr(manualExpand,'false');
			confObj.count = 0;
			opt = expanded;
			flag =  false;
		}
		for(var i= 0;i<confObj.content.length;i++){
			confObj.content[i].expanded = flag;
		}
		triggerExpandAllMissed($elem,opt);
	}

	function expandCollapseEventMissed(e){
		var flag = '';
		var $elem = '';
		if(e==''){
			flag =  false;
			$elem = $(this);
		}else{
			$elem = e.data.tr;
			flag = e.data.flag;
			flag = (flag==undefined) ? true : false;
		}
		$('#reportContent2').find('input[data_key="subcat"]').prop('checked', true);
		var expendedAnchor = '<tr class="noChildNew_missed" style="display: table-row;"><td colspan="6" class="sorted" style="padding-left: 5px; padding-right: 5px"></td></tr>';	
		var $tbl = $elem.closest('table');
		
		var confObj=$tbl.data('confObj');
		var content =  confObj.content;
		var obj =  $elem.data('obj');
		var subCat = obj.article_number;
		var $expanAnc = '';
		var hideFooter = '';
		$elem.toggleClass(expanded+' '+collapsed);
		$expanAnc = $('#missed_rpt_subcat_'+missedArticlesTabIndex+'_'+subCat);
		content.count=(content.count!=undefined ? content.count:0);
		if($elem.hasClass(expanded)){
			if($expanAnc==undefined || $expanAnc.length == 0){
				$expendedAnchor = $(expendedAnchor);
				$expendedAnchor.attr('id','missed_rpt_subcat_'+missedArticlesTabIndex+"_"+subCat);
				$expendedAnchor.insertAfter($elem);
				$expendedAnchor = $('#missed_rpt_subcat_'+missedArticlesTabIndex+"_"+subCat).find('td');
				var confObj = new tblReportMissedArticles(varMap[obj.sub_category_name]);
				$expendedAnchor.loadtbl(confObj);
				$expendedAnchor.find('.tableInfo,.tableActionsBtnsWrapper,.tableActionsWrapper ').addClass('hideBlock');
				$expendedAnchor.find('div:first').addClass('margin-top15');
				hideFooter = varMap[obj.sub_category_name].length;
				if(hideFooter <= 10){
					$expendedAnchor.find('.tableFooter').addClass('hideBlock');
				}else{
					$expendedAnchor.find('.tableFooter').removeClass('hideBlock');
				}
			//	showLocationPopupEvent();
			}else{
				
				$expanAnc.toggle();
			}
			obj.expanded = true;
			if(flag== true){
				content.count=content.count+1;
			}
		
		}else{
			obj.expanded = false;
			$expanAnc!=undefined && $expanAnc.length >0 ? $expanAnc.toggle() : '';
			if(flag== true){
				content.count=content.count-1;
			}
		}
		if(flag== true){
			var $headElem = $tbl.find('thead:first tr');
			if((content.count||'') == (content.length||'')){
				$headElem.addClass(expanded).removeClass(collapsed);
				$headElem.attr(autoexpanded,'true');
			}else if((content.count||'') == 0){
				$headElem.removeClass(expanded).addClass(collapsed);
				$headElem.attr(autoexpanded,'false');
			}
			$headElem.attr('manualExpand','');
		}
		
	}
	function getPrintExportDataForMissedArticles(excelFlag){
		var newArray=[];
		var finalArray=[];
		//Defect_12341
		var $tbl =  $('#missed_rpt_subcat_'+missedArticlesTabIndex+'_table');
		var isSelectAll = $tbl.find('#thead_missed_rpt_subcat_'+missedArticlesTabIndex).find('.selectAllPrint').is(':checked');
		var param = '';
		var confObj = $tbl.data('confObj');
		var cont = confObj.content;
		var subCat = '';
		var subCatAll = '';
		excelFlag = ((excelFlag == undefined || excelFlag == '') ? false : excelFlag);
		for(var i = 0;i<cont.length;i++){
			//if(isSelectAll || cont[i].sub_cat_selected || (excelFlag && !isSelectAll && !cont[i].sub_cat_selected)){
			if(isSelectAll || cont[i].sub_cat_selected){
				 subCat += (subCat != '' ? (','+cont[i].sub_category_name) : cont[i].sub_category_name);
				 finalArray = finalArray.concat(varMap[cont[i].sub_category_name]);
			}else{
				subCatAll += (subCatAll != '' ? (','+cont[i].sub_category_name) : cont[i].sub_category_name);
			}
		}
		callStockTakeMissedArticleCountJasperPrint(finalArray);
		
	return finalArray;
}
function onLoadclickFunctions(){
	var triggerd = false;
	var area = "#reportContent2";
	
	if(!isNationalStocktake && (!$('#reportContent2').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').find('#filterOpen2').is(':visible')) &&( ! $('#reportContent2').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').find('#filterClear2').is(':visible')) ){
		$('#reportContent2').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').append(filterOpenBtnMissed);
		}
	$('#reportContent2').find('#filterOpen2').unbind('click').click(function(){
		$('#reportContent2').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').append(filterClearBtnMissed);
		$('#reportContent2').find('#filterClear2').removeClass('hideBlock');
		$('#reportContent2').find('#filterOpen2').addClass('hideBlock');
		$('#reportContent2').find('.tableActionsWrapper').html('');
		filterContentMissedArticles.appendTo("#tablefilters2");
		if(filterContentMissedArticles.length != 0){
			$('#reportContent2').find('.tableActionsWrapper').appendTo(filterContentMissedArticles);
		}else{
			$('#reportContent2').find('.tableActionsWrapper').append(cloneMissed);
		}
		/*if (!filterApplyClicked) {
			if(isNationalStocktake){
				$("#missedArticleHierarchyId").find("input[type=radio]").prop('checked',false);
			}else{
				$("#missedArticleHierarchyId").find(".deptSelectAll").prop('checked',true);
				$("#missedArticleHierarchyId .deptlst").find("input[type=checkbox]").prop('checked',true);
				$("#missedArticleHierarchyId").find('.deptLstCnt').text($("#missedArticleHierarchyId .deptlst").find("input[type=checkbox]:checked").length);
			}
			$("#missedArticleHierarchyId").find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
			$("#missedArticleHierarchyId").find('.noSelectionCat,.noSelectionSub,.noSelectionSeg').removeClass('hideBlock');
			$("#missedArticleHierarchyId").find('.catLstCnt,.sCatLstCnt,.segLstCnt').text('0');
			$("#missedArticleHierarchyId").find('.sCatSelectAll,.catSelectAll,.segSelectAll').prop('checked',false);
		}*/
		$('#reportContent2').find('.tableActionsWrapper').find('#tablefilters2').removeClass('hideBlock');
    	$('#reportContent2').find('.tableActionsWrapper').find('#tablefilters2').find('#missedArticlesFilterDiv').removeClass('hideBlock');
    	//populateFiltersForMissedArticles();
		//bindFilterEventsForMissedArticleReport();
		
	});
			
	/*$('#reportContent2').find('#filterClear2').unbind('click').click(function(){
		$('#filterClear2').addClass('hideBlock');
		$('#filterOpen2').removeClass('hideBlock');
	});*/
	
	
	/*$(area).find('.groupByClear').click(function(){
		triggerd = true;
		Groupby=false;
		clearGroupByActionMissed(triggerd);		
	});$(area).find('.groupByOpen').click(function(){
		triggerd = true;
		Groupby=true;
		clearGroupByActionMissed(triggerd);
	});*/
}

/*function clearGroupByActionMissed(triggerd){
	var area = "#reportContent2";	

	if(triggerd	&& $('.missMainTable_'+missedArticlesTabIndex+' tr').length > 0){
		$tblhold = $(area); 
		confObj = (new tblReportMissedArticles(responseP));
		$tblhold.loadtbl(confObj);
	}
	else if(triggerd && $('.missMainTable_'+missedArticlesTabIndex+' tr').length == 0){
		$tblhold = $(area);
		groupMissedList(responseP);
		confObj = (new tblReportMissedSubCategory(varList));
		$tblhold.loadtbl(confObj);

	}
	
	if(!Groupby){
		$(area).find('.group_cont_table ').addClass("hideBlock");
		$(area).find('.groupByClear').addClass("hideBlock");			
		$(area).find('.groupByOpen').removeClass("hideBlock");		
	}
	else if(Groupby){
		$(area).find('.group_cont_table ').removeClass("hideBlock");
		$(area).find('.groupByOpen').addClass("hideBlock");
		$(area).find('.groupByClear').removeClass("hideBlock");
	}
	onLoadclickFunctions();
}*/
