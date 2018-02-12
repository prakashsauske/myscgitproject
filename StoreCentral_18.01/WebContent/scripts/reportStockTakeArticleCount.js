var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';
var allInputs = '';
var stockTakePrint = '';
var isNationalStocktake=false;

$(document).ready(function(){
	// filter by
	//$('#filterOpen').click(function(){	//Group by and filter in same line changes
	$('body').on('click', '#filterOpen', function() {
		//populateFiltersForArticleCount();
		$("#clr_grp_link_btn_Article_Count_Report").trigger('click');
		$("#filterOpen").addClass('hideBlock');
		$("#filterClear").removeClass('hideBlock');
		bindPrintData('',$('#Article_Count_Report_table'));
		$("#groupByClear").addClass('hideBlock');
		$("#tableAddAction").addClass('hideBlock');
		$("#groupByOpen").removeClass('hideBlock');
		$('#basedepH').prop('disabled',false).prop('checked',false);
		$("#baseCountArticleHierarchyId").removeClass('hideBlock');
		bindSelectAllArticleEvents($("#baseCountArticleHierarchyId"));
		populateDepartment($("#baseCountArticleHierarchyId"),"checkbox", false, false);
		$('#baseCountArticleHierarchyId').addClass('hideBlock');
		
		if(baseFilteronLoad){
			baseFilteronLoad = false;
			filterButtonDivContent = (filterButtonDivContent=='' && filterButtonDivContent.length == 0) ? $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().clone() : filterButtonDivContent; 
			$("#add_grp_link_btn_Article_Count_Report").parent().prepend(filterButtonDivContent);
			$("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().remove();
			filterContent = (filterContent=='' && filterContent.length == 0) ? $("#tablefilters").contents().clone() : filterContent;
			$("#grou_cont_Article_Count_Report").after(filterContent);
			$("#tablefilters").contents().remove();
			//Defect_12624 - Fix
			$("#grou_cont_Article_Count_Report").addClass("hideBlock");
			//$("#baseCountFilterButtonDiv").find('#filterOpen').addClass('hideBlock');
		}
		$("#baseCountFilterDiv").removeClass('hideBlock');	
		resetHierarchy();
		$('#action_btn_wrap_Article_Count_Report').find(".groupByOpen").addClass('hideBlock');
		$('#action_btn_wrap_Article_Count_Report').find(".groupByClear").addClass('hideBlock');
	});
	
	//$('#filterClear').click(function(){	//Group by and filter in same line changes
	$('body').on('click', '#filterClear', function() {
		onFilterClearOrFilterCancelArticleCount();		
		
	});
	
	$('#baseCountFilterBtn').unbind('click');
	
	
	//$('#baseCountFilterBtn').click(function(){	//Group by and filter in same line changes
	$('body').on('click', '#baseCountFilterBtn', function() {
		//"SC-526/12014"
		if($('#articleCountLocDrpDwnUl input:checked').length == 0 && $('#articleCountAisleDrpDwnUl input:checked').length == 0 && $('#articleCountUsrDrpDwnUl input:checked').length == 0 
				&& (($('#basedepH').is(':checked') && $('#baseCountArticleHierarchyId .deptlst input:checked').length == 0 && $('#articleCountDeptDrpDwnUl input:checked').length == 0) || (!$('#basedepH').is(':checked') && $('#articleCountDeptDrpDwnUl input:checked').length == 0))){
			$.fn.showCustomMsg(['Please select any one of the search criteria to show articles.'],error);
		}else if(isNationalStocktake &&  $('#baseCountArticleHierarchyId .deptlst input:checked').length != 0 && !$('#baseCountArticleHierarchyId .subCatDiv .subCat').is(':checked')){
			$.fn.showCustomMsg(['Please select sub category to apply filter.'],error);
		}else{
			filterApplyClicked = true;
			filterContent = $("#baseCountFilterDiv").clone();//to have the filters with changed details//Group by and filter in same line changes
			$("#reportContent0").addClass("hideBlock");
			globalRequestParam = prepareBaseCountReportParam($("#baseCountFilterDiv"));
			$("#baseCountFilterDiv").remove();
			callReportSTArticleCountService(globalRequestParam);
		}
	});
	
	//$('#baseCountcloseLink').unbind('click');
	
	//$('#baseCountcloseLink').click(function(){	//Group by and filter in same line changes
	$('body').on('click', '#baseCountcloseLink', function() {
		if(isNationalStocktake){
			resetHierarchy();
			fetchArticleCountReportWithoutFiltersForNSTK();
		}else{
			onFilterClearOrFilterCancelArticleCount();
		}
	});
});
function onFilterClearOrFilterCancelArticleCount(){
	filterApplyClicked = false;
	 if(filterContent != '' && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
	    	$("#tablefilters").html(filterContent);
	  }
	defaultArticleCountFilters();//Group by and filter in same line changes
	fetchArticleCountReportWithoutFilters();
}

function showFilterDefault(){
	$("#filterOpen").removeClass('hideBlock');
	$("#baseCountFilterDiv").addClass('hideBlock');
	$("#filterClear").addClass('hideBlock');
}
function fetchArticleCountReportWithoutFilters(){
	allInputs = "ALL";
	filterApplyClicked = false;
	$("#reportContent0").addClass("hideBlock");
	var reportParam = {
			"iv_dept_id" : "",
			"iv_cat_id" : "",
			"iv_sub_cat_id" : "",
			"iv_seg_id" : "",
			"iv_st_id" : $("#reportDetailsStockTakeId").html(),
			"iv_loc_id" : "",
			"iv_sub_loc_id" : "",
			"iv_aisle" : "",
			"iv_bay" : "",
			"iv_userid" : "",
			"iv_article_no": "",
			"iv_barcode_flag": "",
			"iv_article_barcode": "",
			"iv_st_status": glSTStatus,
			"iv_from_variance_screen" : "N",
			"iv_side":"",
			//"SC-526/12014"
			"iv_plano_loc_fltr_val": "",
			"iv_other_loc_fltr_val" : ""
	};
	callReportSTArticleCountService(reportParam);
}

function fetchArticleCountReportWithoutFiltersForNSTK(){
	allInputs = "ALL";
	filterApplyClicked = true;
	$("#reportContent0").addClass("hideBlock");
	filterButtonDivContent = (filterButtonDivContent=='' && filterButtonDivContent.length == 0) ? $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().clone() : filterButtonDivContent; 
	$("#add_grp_link_btn_Article_Count_Report").parent().prepend(filterButtonDivContent);
	$("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().remove();
	//move the filter div in place of group by data div
	filterContent = (filterContent=='' && filterContent.length == 0) ? $("#tablefilters").contents().clone() : filterContent;
	//reporttabIndex = reporttabIndex;
	$("#grou_cont_Article_Count_Report").after(filterContent);
	//$("#grou_cont_Article_Count_Report").after(filterContent);
	$("#tablefilters").contents().remove();
	$("#grou_cont_Article_Count_Report").addClass("hideBlock");
//	populateFiltersForArticleCount();
//	bindFilterEventsForArticleCountReport();
	$("#baseCountFilterButtonDiv").find('#filterOpen').addClass('hideBlock');
	/*var reportParam = {
			"iv_dept_id" : "",
			"iv_cat_id" : "",
			"iv_sub_cat_id" : "",
			"iv_seg_id" : "",
			"iv_st_id" : $("#reportDetailsStockTakeId").html(),
			"iv_loc_id" : "",
			"iv_sub_loc_id" : "",
			"iv_aisle" : "",
			"iv_bay" : "",
			"iv_userid" : "",
			"iv_article_no": "",
			"iv_barcode_flag": "",
			"iv_article_barcode": "",
			"iv_st_status": glSTStatus,
			"iv_from_variance_screen" : "N",
			"iv_side":""
	};*/
	callReportSTArticleCountServiceForNST();
}

function defaultArticleCountFilters(){
	$("#articleCountallUsrChkBox").prop("checked",false);//select all user in drop dwon
	$("#articleCountallUsrChkBox").trigger('click');
	
	$("#articleCountallAisleChkBox").prop("checked",false);//select all aisle in drop dwon
	$("#articleCountallAisleChkBox").trigger('click');
	
	$("#articleCountallLocChkBox").prop("checked",false);//select all loc in drop dwon
	$("#articleCountallLocChkBox").trigger('click');
	
	$("#articleCountallDeptChkBox").prop("checked",false);//select all dept in drop dwon
	$("#articleCountallDeptChkBox").trigger('click');	
	
	$("#baseBaysHId").find("#aisleSelectAll").prop("checked",true);//unselect all aisle in hier box
	$("#baseBaysHId").find("#aisleSelectAll").trigger('click');
	
	$("#articleCountLocHierarchyId").find(".locSelectAll").prop("checked",true);//unselect all loc in hier box
	$("#articleCountLocHierarchyId").find(".locSelectAll").trigger('click');
	
	$("#baseCountArticleHierarchyId").find(".deptSelectAll").prop("checked",true);//unselect all dep in hier box
	$("#baseCountArticleHierarchyId").find(".deptSelectAll").trigger('click');
	
	$('.baseAisleH').prop('checked',true);//uncheck select bays check box
	$('.baseAisleH').trigger('click');
	
	$("#articleCountLocH").prop("checked",true);//uncheck select sub-locations check box
	$("#articleCountLocH").trigger("click");
	
	$("#basedepH").prop("checked",true);//uncheck select Select multiple departments or sub-categories check box
	$("#basedepH").trigger("click");
	showFilterDefault();
	
}
function callArticleCountTabService(tabId, tabVal){
	
	var param = {
			"iv_st_id":$("#reportDetailsStockTakeId").html(),
			"iv_st_status": tabVal
	};
	console.log(reportSTArticleCountStatusUrl + ' ' + JSON.stringify(param));	
	$.ajax({
	    type: "POST",
	    url: reportSTArticleCountStatusUrl,
	    data: JSON.stringify(param),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		  //responseP = [ {'article_number': '149539','scanned_ean':'4564','article_description': 'Chicken Breast Stir Fry Rw','uom': 'CAR','om':'15','soh': '52','sell_price': '45','location_name': 'STIR FRY','base_count': '12','recount_1': '12015','recount_2': '182','recount_3': '182','recount_4': '182','final_count': '182','total_value': '182','soh': '182','subcat_name': 'sub1','user': 'user1'}];
		  //console.log(JSON.stringify(responseP));	
		  if(responseP != undefined  && responseP.length > 0 && responseP[0].stocktake_id != undefined){
			$(tabId).find('.aisleCol').html('').html(responseP[0].aisles);
			$(tabId).find('.subCatCol').html('').html(getMoreHyperContent(responseP[0].sub_categories));
			$(tabId).find('.userCol').html('').html(getMoreHyperContent(responseP[0].users));
			$(tabId).find('.locCol').html('').html(responseP[0].other_locations);
			$(tabId).find('.moreNumber').tooltip({
				tooltipClass : 'tmptooltipClass'
			});
			allInputs = (responseP[0].aisles!='') ? 'Aisles: '+responseP[0].aisles : '';
			allInputs += (allInputs!='') ? (responseP[0].users!='' ?  (' | Users: '+responseP[0].users) : '') : (responseP[0].users!='' ?  ('Users: '+responseP[0].users) : '');
			allInputs += (allInputs!='') ? (responseP[0].sub_categories!='' ?  (' | Sub-Categories: '+responseP[0].sub_categories) : '') : (responseP[0].sub_categories!='' ?  ('Sub-Categories: '+responseP[0].sub_categories) : '');
			allInputs += (allInputs!='') ? (responseP[0].other_locations!='' ?  (' | Other Locations: '+responseP[0].other_locations) : '') : (responseP[0].other_locations!='' ?  ('Other Locations: '+responseP[0].other_locations) : '');
			if(tabVal == 'COMPLETED'){
				stopLoading();
				fetchArticleCountReportWithoutFilters();
			}else{
				stopLoading();
			}
			$currentCountPanel!=undefined && $currentCountPanel!='' ? $currentCountPanel.removeClass('hideBlock') : '';
		  } else {
			  stopLoading();
		  }		
	  }).fail(function() {	
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Article Count');
		  stopLoading();
	  }).always(function() {
		  
	  });
	
}

/**
 * Invokes report service
 */
function callReportSTArticleCountService(requestParam){	
	console.log(reportSTArticleCountUrl + ' ' + JSON.stringify(requestParam));	
	//var requestParam = {};
	$.ajax({
	    type: "POST",
	    url: reportSTArticleCountUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		  //responseP = [ {'article_number': '149539','scanned_ean':'4564','article_description': 'Chicken Breast Stir Fry Rw','uom': 'CAR','om':'15','soh': '52','sell_price': '45','location_name': 'STIR FRY','base_count': '12','recount_1': '12015','recount_2': '182','recount_3': '182','recount_4': '182','final_count': '182','total_value': '182','soh': '182','subcat_name': 'sub1','user': 'user1'}];
		  //console.log(JSON.stringify(responseP));	
		  if(responseP != undefined  && responseP.length > 0 && responseP[0].article_number != undefined){
		  if(filterContent != '' && filterContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
		    	$("#tablefilters").html(filterContent);
		    	$("#tablefilters").addClass("hideBlock");
		    }
		  if(filterButtonDivContent != '' && filterButtonDivContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
			  $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContent);
			  $("#baseCountFilterButtonDiv").addClass("hideBlock");
	  	    }
			 $("#reportContent0").removeClass("hideBlock");
			 $('#promo-1').find('.emptyTable').removeClass('hideBlock');
			 $('#promo-1').find('.stDtlActionBtns').removeClass('hideBlock');
			// $('#promo-2').find('.emptyTable').removeClass('hideBlock');
			// $('#promo-2').find('.stDtlActionBtns').removeClass('hideBlock');
			 $('#promo-3').find('.emptyTable').removeClass('hideBlock');
			 $('#promo-3').find('.stDtlActionBtns').removeClass('hideBlock');
			formatCountResults(responseP);
			loadReportContentTbl();
			$('#clr_grp_link_btn_Article_Count_Report,#add_grp_link_btn_Article_Count_Report').addClass('hideBlock');
			callStockTakeArticleCountJasperPrint(responseP);
			$tblhold.find(".tooltip").tooltip({
				position : {
					my : "right top-20",
					at : "right+5 top-10"
				}
			});
			totalRecords = responseP.length;
			$("#noRecords").html(totalRecords);//Sets the no of records
			bindArticleCountExport(response);
			$currentCountPanel.removeClass("hideBlock");
		  } else {
			  if(responseP != undefined && responseP.length <= 0 ){
				  if(filterContent != '' && filterContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
					  $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContent);
					  $("#baseCountFilterButtonDiv").removeClass("hideBlock");
				  	}
				  if(filterButtonDivContent != '' && filterButtonDivContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
				    	$("#tablefilters").html(filterContent);
				    	$("#tablefilters").removeClass("hideBlock");
				    }					
					populateFiltersForArticleCount();	//Group by and filter in same line changes
					bindFilterEventsForArticleCountReport();	//Group by and filter in same line changes
					if(!filterApplyClicked){
						$('#promo-1').addClass('hideBlock');
					} else {
						$('#promo-1').find('.stDtlActionBtns').addClass('hideBlock');
						$('#promo-2').find('.stDtlActionBtns').addClass('hideBlock');
						$('#promo-3').find('.stDtlActionBtns').addClass('hideBlock');
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Article Count');	
					}
				}else{
					$('#promo-1').find('.stDtlActionBtns').addClass('hideBlock');
					$('#promo-2').find('.stDtlActionBtns').addClass('hideBlock');
					$('#promo-3').find('.stDtlActionBtns').addClass('hideBlock');
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Article Count');
				}			
		  }		
		  stopLoading(); 
	  }).fail(function() {	
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Article Count');
	  }).always(function() {
	  });
}
function reBindAllClickEvents(){
	bindDepartmentSelectEvent($('#baseCountArticleHierarchyId'),false);
	bindCategorySelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSubCategorySelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSegmentSelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSelectAllArticleEvents($('#baseCountArticleHierarchyId'));
}
function callReportSTArticleCountServiceForNST(){
	  if(filterContent != '' && filterContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
		  $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContent);
		  $("#baseCountFilterButtonDiv").removeClass("hideBlock");
	  	}
	  if(filterButtonDivContent != '' && filterButtonDivContent.length !=0 && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
	    	$("#tablefilters").html(filterContent);
	    	$("#tablefilters").removeClass("hideBlock");
	    	reBindAllClickEvents();
	    }					
		populateFiltersForArticleCount();	//Group by and filter in same line changes
		bindFilterEventsForArticleCountReport();	//Group by and filter in same line changes
		filterApplyClicked=false;
		$('#promo-1').find('.stDtlActionBtns').addClass('hideBlock');
		$('#promo-2').find('.stDtlActionBtns').addClass('hideBlock');
		$('#promo-3').find('.stDtlActionBtns').addClass('hideBlock');
		//Defect_12624 - Fix
		$('#grou_cont_Article_Count_Report').addClass('hideBlock');
		$('#baseCountFilterDiv').removeClass('hideBlock');
		$('#baseCountFilterDiv').find('#articleCountDeptDrpDwnLabel').prop('disabled',true);
		//$('#baseCountFilterDiv').find('#basedepH').prop('checked',true);
		$('#baseCountFilterDiv').find('#basedepH').prop('disabled',false).prop('checked',false);
		$('#baseCountFilterDiv').find('#basedepH').trigger('click');
		$('#baseCountFilterDiv').find('#basedepH').prop('disabled',true);
		$('#baseCountFilterDiv').find('#articleCountDeptDrpDwnDiv').find('[type="checkbox"]').prop('type','radio');
		$('#baseCountFilterDiv').find('#baseCountArticleHierarchyId').find('.deptDiv').find('[type="checkbox"]').prop('type','radio');
		if(onRecordSelect){
			onRecordSelect = false;
			resetHierarchy();
		}
		
}

function formatCountResults(response){
	var fObj = {};
	for(var i = 0;i<response.length;i++){
	fObj  = response[i];
		if(fObj.allow_decimal_adj !='Y'){
			if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
				fObj.soh = '';
			}else{
			fObj.soh = correctDecimalPostion(fObj.soh||'');
			}
			if(fObj.base_uom != 'KG' && fObj.base_uom != 'L'){		//Defect_9896 
			fObj.base_count = correctDecimalPostion(fObj.base_count||'');
			fObj.final_count = correctDecimalPostion(fObj.final_count||'');
			fObj.soh = fObj.soh!=null && fObj.soh!=undefined ? correctDecimalPostion(fObj.soh||'') : '';
			fObj.recount_1 = fObj.recount_1!=null && fObj.recount_1!=undefined ? correctDecimalPostion(fObj.recount_1||'') : '';
			fObj.recount_2 = fObj.recount_2!=null && fObj.recount_2!=undefined ?correctDecimalPostion(fObj.recount_2||'') : '';
			fObj.recount_3 = fObj.recount_3!=null && fObj.recount_3!=undefined ?correctDecimalPostion(fObj.recount_3||'') : '';
			fObj.recount_4 = fObj.recount_4!=null && fObj.recount_4!=undefined ?correctDecimalPostion(fObj.recount_4||'') : '';
			}else {
				fObj.base_count = Number(fObj.base_count||'').toFixed(3);
			fObj.final_count = Number(fObj.final_count||'').toFixed(3);
			fObj.soh = fObj.soh!=null && fObj.soh!=undefined ? Number(fObj.soh||'').toFixed(3) : '';
			fObj.recount_1 = fObj.recount_1!=null && fObj.recount_1!=undefined ? Number(fObj.recount_1||'').toFixed(3) : '';
			fObj.recount_2 = fObj.recount_2!=null && fObj.recount_2!=undefined ?Number(fObj.recount_2||'').toFixed(3) : '';
			fObj.recount_3 = fObj.recount_3!=null && fObj.recount_3!=undefined ?Number(fObj.recount_3||'').toFixed(3) : '';
			fObj.recount_4 = fObj.recount_4!=null && fObj.recount_4!=undefined ?Number(fObj.recount_4||'').toFixed(3) : '';}
		}else{
			if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
				fObj.soh = '';
			}else{
			fObj.soh = Number(fObj.soh||'').toFixed(3);
			}
			fObj.base_count = Number(fObj.base_count||'').toFixed(3);
			fObj.final_count = Number(fObj.final_count||'').toFixed(3);
			fObj.soh = fObj.soh!=null && fObj.soh!=undefined ? Number(fObj.soh||'').toFixed(3) : '';
			fObj.recount_1 = fObj.recount_1!=null && fObj.recount_1!=undefined ? Number(fObj.recount_1||'').toFixed(3) : '';
			fObj.recount_2 = fObj.recount_2!=null && fObj.recount_2!=undefined ?Number(fObj.recount_2||'').toFixed(3) : '';
			fObj.recount_3 = fObj.recount_3!=null && fObj.recount_3!=undefined ?Number(fObj.recount_3||'').toFixed(3) : '';
			fObj.recount_4 = fObj.recount_4!=null && fObj.recount_4!=undefined ?Number(fObj.recount_4||'').toFixed(3) : '';
		}
		fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
		fObj.om = fObj.om!=null && fObj.om!=undefined ?correctDecimalPostion(fObj.om||'') : '';		
		//Defect_12624 - Fix
		fObj.groupByKey = fObj.location_name
		+((fObj.base_count_usr_nm != '' && fObj.base_count_usr_nm != undefined )?("  -  "+fObj.base_count_usr_nm):'')
		+((fObj.base_count_usr != '' && fObj.base_count_usr != undefined )?("  ("+fObj.base_count_usr+")"):'');
	}
}
function formatArtCountResultsExport(response){
	var fObj = [];
	var fObjObj=[];
	for(var i = 0;i<response.length;i++){
	fObj  = response[i];
		if(fObj.allow_decimal_adj !='Y'){
			if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
				fObj.soh = '';
			}else{
			fObj.soh = correctDecimalPostion(fObj.soh||'');
			}
			fObj.base_count = correctDecimalPostion(fObj.base_count||'');
			fObj.final_count = correctDecimalPostion(fObj.final_count||'');
			fObj.soh = fObj.soh!=null && fObj.soh!=undefined ? correctDecimalPostion(fObj.soh||'') : '';
			fObj.recount_1 = fObj.recount_1!=null && fObj.recount_1!=undefined ? correctDecimalPostion(fObj.recount_1||'') : '';
			fObj.recount_2 = fObj.recount_2!=null && fObj.recount_2!=undefined ?correctDecimalPostion(fObj.recount_2||'') : '';
			fObj.recount_3 = fObj.recount_3!=null && fObj.recount_3!=undefined ?correctDecimalPostion(fObj.recount_3||'') : '';
			fObj.recount_4 = fObj.recount_4!=null && fObj.recount_4!=undefined ?correctDecimalPostion(fObj.recount_4||'') : '';
		}else{
			if (fObj.perpetual_flag == 'N' || fObj.perpetual_flag == ''){
				fObj.soh = '';
			}else{
			fObj.soh = Number(fObj.soh||'').toFixed(2);
			}
			fObj.base_count = Number(fObj.base_count||'').toFixed(3);
			fObj.final_count = Number(fObj.final_count||'').toFixed(3);
			fObj.soh = fObj.soh!=null && fObj.soh!=undefined ? Number(fObj.soh||'').toFixed(3) : '';
			fObj.recount_1 = fObj.recount_1!=null && fObj.recount_1!=undefined ? Number(fObj.recount_1||'').toFixed(3) : '';
			fObj.recount_2 = fObj.recount_2!=null && fObj.recount_2!=undefined ?Number(fObj.recount_2||'').toFixed(3) : '';
			fObj.recount_3 = fObj.recount_3!=null && fObj.recount_3!=undefined ?Number(fObj.recount_3||'').toFixed(3) : '';
			fObj.recount_4 = fObj.recount_4!=null && fObj.recount_4!=undefined ?Number(fObj.recount_4||'').toFixed(3) : '';
		}
		fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
		fObj.om = fObj.om!=null && fObj.om!=undefined ?correctDecimalPostion(fObj.om||'') : '';
		fObjObj.push(fObj);
	}
	return fObjObj;
}
function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}

function exportToCSVArtCount(artCountArray, filename) {
		var groupingKey = artCountArray[0].grp_col_key;
		var groupedData=$groupBy(artCountArray, function(obj) {return obj[groupingKey];});
		var valuesArray =['article_number'/*,'scanned_ean'*/,'article_desc_to_display','uom','om','sell_price','location_name','base_count','recount_1', 'recount_2', 'recount_3','recount_4','final_count','total_value','soh'];
		var headersArray=['Article'/*,'EAN / TUN'*/,'Description','UOM','OM','Value ($)','Location','Base Count','Re-Count 1','Re-Count 2','Re-Count 3','Re-Count 4','Final Count','Total Value ($)','SOH'];
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
						if(valuesArray[valuesIndex] == 'recount_1' || valuesArray[valuesIndex] == 'recount_2' ||  valuesArray[valuesIndex] == 'recount_3' ||  valuesArray[valuesIndex] == 'recount_4' ){
							if(array[i][valuesArray[valuesIndex]] ==null || array[i][valuesArray[valuesIndex]] == 0){
								//tableContent= tableContent;
							} else{
								tableContent=  tableContent+array[i][valuesArray[valuesIndex]];
							}
						}else{
						tableContent=array[i][valuesArray[valuesIndex]] == null? tableContent: tableContent+array[i][valuesArray[valuesIndex]];
					}
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
function bindArticleCountExport(response){
    // This must be a hyperlink
	//var artCountArray=formatArtCountResultsExport(response);
    $(".articleCntExportBtn").on('click', function (event) {
    	$('#stockTakeForm').attr("action", "../stockTakeArticleCountreport/downloadStockTakeArticleCountReportExcel.pdf");
    	$('#stockTakeForm').attr('target','_blank');
    	$('#stockTakeForm').attr('method','get');
    	$('#stockTakeForm').submit();
    	
    });
}
/**
 * @param data
 * @returns {tblReportArticleCount}
 */
function tblReportArticleCount(data){
	this.option = 'build';
	this.key = ['article_number','article_desc_to_display','uom','om','sell_price','location_name','base_count','recount','final_count','total_value','soh'];
	this.table_name = 'Article_Count_Report';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {article_number : 'Article',article_desc_to_display : 'Description',uom : 'UOM',om : 'OM',sell_price:'Value ($)',location_name : 'Location',base_count : 'Base </br> Count',recount_1 : '1',recount_2 : '2',recount_3 : '3',recount_4 : '4',final_count : 'Final</br>Count',total_value :'Total</br>Value</br>($)',soh : 'SOH'};
	this.header_data_type = {article_number : 'number',article_desc_to_display : 'char',uom : 'char',om : 'char',sell_price:'number',location_name : 'char',base_count : 'number',recount_1 : 'number',recount_2 : 'number',recount_3 : 'number',recount_4 : 'number',final_count : 'number',total_value :'number',soh : 'number'};
	this.header_row_type = {article_number : 'main',article_desc_to_display : 'main',uom : 'main',om : 'main',sell_price:'main',location_name : 'main',base_count : 'main',recount : 'sub',final_count : 'main',total_value :'main',soh : 'main'};
	this.header_sub_rows = {recount : {subKeys : [ 'recount_1', 'recount_2', 'recount_3','recount_4']}};
	this.header_class = {article_number : 'leftValue',article_desc_to_display : '',uom : ' centerValue ',om : ' centerValue ',sell_price:' centerValue ',location_name : '',base_count : ' rightValue ',recount:'  centerValue columnDivider noSort ',recount_1 : ' centerValue ',recount_2 : ' centerValue ',recount_3 : ' centerValue ',recount_4 : ' centerValue ',final_count : ' centerValue ',total_value :' rightValue ',soh : ' rightValue '};
	this.header_width = {article_number : '7%',article_desc_to_display : '8%',uom : '1%',om : '1%',sell_price:'1%',location_name : '5%',base_count : '2%',recount_1 : '1%',recount_2 : '1%',recount_3 : '1%',recount_4 : '1%',final_count : '3%',total_value :'3%',soh : '3%'};
	this.content_class = {article_number : 'leftValue',article_desc_to_display : '',uom : ' centerValue ',om : ' centerValue ',sell_price:' centerValue ',location_name : '',base_count : ' rightValue ',recount_1 : ' centerValue ',recount_2 : ' centerValue ',recount_3 : ' centerValue ',recount_4 : ' centerValue ',final_count : ' centerValue ',total_value :' rightValue ',soh : ' rightValue ',recount : ' centerValue columnDivider noSort  '};
	this.data_td_class = {article_number:getArticleTdclass};
	this.data_tr_class = {func_class:getArticleTrclass};
	this.content_format = {article_number : 'removeNull',article_desc_to_display : 'removeNull',uom : 'removeNull',om : 'removeNull',sell_price:'removeNull',location_name : 'removeNull',base_count : 'removeNull',recount_1 : 'removeNull',recount_2 : 'removeNull',recount_3 : 'removeNull',recount_4 : 'removeNull',final_count : 'removeNull',total_value :'removeNull',soh : 'removeNull'};
	this.content_width = {article_number : '7%',article_desc_to_display : '8%',uom : '1%',om : '1%',sell_price:'1%',location_name : '5%',base_count : '2%',recount_1 : '1%',recount_2 : '1%',recount_3 : '1%',recount_4 : '1%',final_count : '3%',total_value :'3%',soh : '3%'};
	this.header_td_label = {recount : 'Re-count'};
	this.cont_data_function = {article_number:getArticleTdclassDisp,sell_price:showArticleCountStdSell,total_value:showArticleCountTotalVal,base_count:showBaseCount,recount_1:showReCount1,recount_2:showReCount2,recount_3:showReCount3,recount_4:showReCount4,final_count:showFinalCount,soh:showArticleCountSOH};
	this.content_title = {}, this.header_title = {};
	this.content_td_addon = {};
	this.header_td_addon = {};
	//"SC-526/12014"
	/*if(filterApplyClicked){
		this.default_groupbyColumn =['location_name'];
	}else{
		this.default_groupbyColumn =['subcat_name'];
	}*/
	//Defect_12624 - Fix
	this.default_groupbyColumn =['groupByKey'];
	this.groupbyColumn ={'subcat_name': 'Sub-category','location_name':'Location','base_count_usr_nm':'User', 'groupByKey':'Location_User'};
	this.group_cont_function = {subcat_name : getSubCatContForArticleCount,location_name:getLocContForArticleCount,base_count_usr_nm:getUsrContForArticleCount,groupByKey:getLocUserCntForArticleCount};
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
	//this.isScrollable = 'true';
	this.legend = '<div class="legend"><label> Legend: <label class="pb">Pack Breakdown</label><label class="linked">Linked</label> <label class="d">Deleted</label></label><label class="style">Style</label><label class="productRecalled">Product Recalled</label></label></div>';
	this.sort_done = bindPrintData;
	this.group_done = bindPrintData;
}

var bindPrintData = function($tr,$tbl){
	callStockTakeArticleCountJasperPrint($tbl.data('confObj').content);
};
/**
 * Group by sub category
 */
var getSubCatContForArticleCount = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="15">'
				+ (obj.subcat_name || '') + '</td></tr>';
	}
	return cont;
};
var getLocContForArticleCount = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="15">'
				+ (obj.location_name || '') + '</td></tr>';
	}
	return cont;
};
//Defect_12624 - Fix
var getLocUserCntForArticleCount = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="15">'
			+(obj.groupByKey != '' ? obj.groupByKey : ((obj.location_name || '') +'  ' +(obj.base_count_usr_nm)))+ '</td></tr>';
	}
	return cont;
};
var getUsrContForArticleCount = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="15">'
				+ (obj.base_count_usr_nm || '') + '</td></tr>';
	}
	return cont;
};
var getArticleTdclassDisp = function(obj,confObj){
	var colClass = [];
	var promo_indicator = [];
	var addingDiv ='';
	
	if(obj.pbd_ind == 'Y' || obj.cpbd_flag == 'Y'){
		colClass.push('<div class = "pb right"></div>');
	} 
	if(obj.linked_ind == 'Y'){
		colClass.push('<div class = "linked right"></div>');
		
	} 
	if(obj.deleted_line_ind == 'Y'){
		colClass.push('<div class ="d right tooltip"></div>');
	}
	if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		colClass.push('<div class = "style right"></div>');
	}
	promo_indicator = promo_indicator.join();
	colClass = colClass.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
	addingDiv = (colClass.replace(/,/g, " "));
	
	return obj.article_number+''+addingDiv;
};
var getArticleTdclass = function(obj,$td){
	var promo_indicator = [];
	if(obj.pbd_ind == 'Y' || obj.cpbd_flag == 'Y'){
		promo_indicator.push("PB");
	} 
	if(obj.linked_ind == 'Y'){
		promo_indicator.push(" L");
	} 
	if(obj.deleted_line_ind == 'Y'){
		promo_indicator.push(" D");
		$td.attr('title', 'Article is Deleted');
	}
	if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		promo_indicator.push(" S");
	}
	promo_indicator = promo_indicator.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
};

var getArticleTrclass = function(obj,$td,$tr){
	if(obj.deleted_line_ind == 'Y'){
		$tr.addClass('warningIndicator');
	}
};

var showArticleCountLegend = function(obj){
	/*var colClass = '';
	if(obj.pbd_ind == 'Y'){
		colClass = 'pb right';
	} else if(obj.linked_ind == 'Y'){
		colClass = 'linked right';
	} else if(obj.deleted_line_ind == 'Y'){
		colClass = 'warn-ind d right tooltip';
	}*/
	
	return '<label  class="'+''+'">&nbsp;'+obj.article_number+'</label>';
	
};
var showArticleCountStdSell = function(obj){	
	return (obj.sell_price_to_display != null && obj.sell_price_to_display != undefined ? Number(obj.sell_price_to_display).toFixed(2)+' per '+(obj.pbd_ind == 'Y' ? obj.uom : obj.base_uom)  : ''); // gowri- tenile mail
	
};
var showArticleCountTotalVal = function(obj){	
	return (obj.total_value != null && obj.total_value != undefined ? Number(obj.total_value).toFixed(2) : '');		// gowri- tenile mail
	
};

var showBaseCount = function(obj)
{
	return checkIfRandomWeightArticle(obj,obj.base_count,obj.base_count_qty);
};

var showReCount1 = function(obj)
{
	return checkIfRandomWeightArticleForRecount('recount_1',obj,obj.recount_1,obj.recount_qty_1);
};

var showReCount2 = function(obj)
{
	return checkIfRandomWeightArticleForRecount('recount_2',obj,obj.recount_2,obj.recount_qty_2);
};

var showReCount3 = function(obj)
{
	return checkIfRandomWeightArticleForRecount('recount_3',obj,obj.recount_3,obj.recount_qty_3);
};

var showReCount4 = function(obj)
{
	return checkIfRandomWeightArticleForRecount('recount_4',obj,obj.recount_4,obj.recount_qty_4);
};

var showFinalCount = function(obj)
{	
	var addSplitVal = '';
	var returnval = checkIfRandomWeightArticle(obj,obj.final_count,obj.final_count_qty);
	if(obj.random_weight_flg != 'Y' && Number(obj.final_count) > 0){
		var finalCount = Number(obj.final_count) * Number(obj.pack_size);
		 addSplitVal = ((obj.order_uom != null && obj.order_uom != '' && obj.order_uom != obj.base_uom) ?
				" (" + Math.floor(finalCount / obj.om) + " " + obj.order_uom + " & " + correctDecimalPostion(Math.round((finalCount % obj.om) * 1e3) / 1e3) + " " + obj.base_uom + ")" 
				: '');
	}
	return returnval+" "+addSplitVal;
};

var showArticleCountSOH = function(obj)
{

	if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y' && obj.perpetual_flag == 'Y')
	{
		return Number(obj.pi_soh)+' '+obj.pi_uom+' & '+(obj. base_uom == 'KG' ? Number(obj.soh).toFixed(3) : obj.soh )+' '+obj.base_uom;
	}else if (obj.random_weight_flg != 'Y' && obj.perpetual_flag == 'Y'){
		return obj.soh+' '+obj.base_uom;
	}
	else if(obj.perpetual_flag == '' || obj.perpetual_flag == 'N'){
		obj.soh = '';
	}
	return (obj.soh || '');

};


function checkIfRandomWeightArticleForRecount(recountField,obj,countOrWeightInput,QtyInEachesInput,uom)
{
	
		if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y' && countOrWeightInput != null 
				&& countOrWeightInput != "" && countOrWeightInput!=undefined )
			{
			if (obj.uom !=obj.base_uom){			
				obj.pi_uom_formatted = obj.uom ;
			}else{
				obj.pi_uom_formatted =obj.pi_uom;
			}
			obj.uom_formatted = obj.base_uom;

			return Number(QtyInEachesInput)+' '+obj.pi_uom_formatted+' & '+ (obj.uom_formatted == 'KG' ? Number(countOrWeightInput).toFixed(3) :countOrWeightInput) +' '+(uom == undefined ? obj.uom_formatted : uom);

			//return Number(QtyInEachesInput)+' '+obj.pi_uom+' & '+countOrWeightInput+' '+(uom == undefined ? obj.uom : uom);
		} else {
				if(obj.uom == 'KG' || obj.uom == 'L'){
					return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)?  Number(countOrWeightInput).toFixed(3)+' '+obj.uom : '');
				}else {
				return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)?  correctDecimalPostion(countOrWeightInput || "")+' '+obj.uom : '');
				}
			}  
		if(countOrWeightInput == "0"){
			return 0;
		}
		if (countOrWeightInput == "0" && countOrWeightInput != "") {
			countOrWeightInput = undefined;
		}
		obj[recountField]=countOrWeightInput || '';
		return (countOrWeightInput || '') ;
}

function checkIfRandomWeightArticle(obj,countOrWeightInput,QtyInEachesInput,uom)
{

	if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y' && countOrWeightInput != null 
			&& countOrWeightInput != "" && countOrWeightInput!=undefined /*&& Number(countOrWeightInput) >0*/)
	{
		if (obj.uom !=obj.base_uom){			
			obj.pi_uom_formatted = obj.uom ;
		}else{
			obj.pi_uom_formatted =obj.pi_uom;
		}
		obj.uom_formatted = obj.base_uom;

		return Number(QtyInEachesInput)+' '+obj.pi_uom_formatted+' & '+ (obj.uom_formatted == 'KG' ? Number(countOrWeightInput).toFixed(3) :countOrWeightInput) +' '+(uom == undefined ? obj.uom_formatted : uom);

		//return Number(QtyInEachesInput)+' '+obj.pi_uom+' & '+countOrWeightInput+' '+(uom == undefined ? obj.uom : uom);
	}	else {
		if(obj.uom == 'KG' || obj.uom == 'L'){
			return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)?  Number(countOrWeightInput).toFixed(3)+' '+obj.uom : '');
		}else {
			return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)? correctDecimalPostion(countOrWeightInput || '')+' '+obj.uom : '');
		}
	}
	return (countOrWeightInput || '') ;
}

/**
 * Frames print screen content
 * @param response
 */
function frameReportSTArticleCount(response){
	content = '';
	var headerContent = '<label><strong>Article Count Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br><label class="subtitle-bold">'
		+'</br><label class="subtitle">List of articles (<strong id="noRecords">'+totalRecords+'</strong>)</label></br></br>';
	constructHeaderTblSTArticleCount();	
	content += printHeadInnerTable;			
	frameTableSTArticleCount(response);
	$('#printbodyForSTArticleCount')
	.html('')
	.append(headerContent+content)
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
 * @param response
 */
function frameTableSTArticleCount(response){
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
		constructContentTblSTArticleCount(response[i]);
		
		//Split Pages - Starts		
		var firstPageRecords = 10;
		var otherPageRecords = 10;
		/*if(response[i].article_number.length > 35){
			count = count + 0.5*(response[i].article_number.length/35);
		}*/
		if (i >= (response.length - 1)){
			content += '</tbody></table>';
			content +='<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: PB Pack Breakdown, L Linked, D Deleted, S Style, PR Product Recalled</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
		}
		if(count>=firstPageRecords && !firstPageCreated){
			count =0;
			firstPageCreated = true;			
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;	
		}else {
			if (i >= (response.length - 1)){
					/*if(count != otherPageRecords && i> firstPageRecords){
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
				}*/
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
/**
 * Builds table header for print page
 */
function constructHeaderTblSTArticleCount() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="50px">Article</th>'
		+'<th rowspan="2" width="20px"></th>'
		/*+'<th rowspan="2" width="50px">EAN / TUN</th>'*/
		+'<th rowspan="2" width="150px">Description</th>'
		+'<th rowspan="2" width="50px">UOM</th>'
		+'<th rowspan="2" width="50px">OM</th>'
		+'<th rowspan="2" width="50px">Value ($)</th>'
		+'<th rowspan="2" width="50px">Location</th>'
		+'<th rowspan="2" width="50px">Base</br>Count</th>'
		+'<th colspan="4" class="centerValue columnDivider " width="250px">Re-Count</th>'
		+'<th rowspan="2" class="centerValue" width="50px">Total</br>Count</th>'
		+'<th rowspan="2" class="centerValue" width="50px">Total</br>Value($)</th>'
		+'<th rowspan="2" class="centerValue" width="50px">SOH</th>'
		+'</tr><tr class="subHeader">'
		+'<th class="centerValue" width="50px">1</th>'
		+'<th class="centerValue" width="50px">2</th>'
		+'<th class="centerValue" width="50px">3</th>'
		+'<th class="centerValue" width="50px">4</th></tr></thead>';																						
	
}
/**
 * Builds table content for print page
 * @param data
 */
function constructContentTblSTArticleCount(data) {
	var legend = '';
	if(data.pbd_ind == 'Y'){
		legend = 'PB';
	} else if(data.linked_ind == 'Y'){
		legend = 'L';
	} else if(data.deleted_line_ind == 'Y'){
		legend = 'D';
	}else if(obj.style_ind != '' && obj.style_ind != undefined && obj.style_ind != null){
		colClass = 'style right tooltip';
		promo_indicator = "S";
	}else if(obj.ps_article_status == '08'){
		colClass = 'productRecalled right tooltip';
		promo_indicator = "PR";
		$td.attr('title', 'Product Recalled Article');
	}
	content += '<tr class="border_bottom"><td  align="left">' + (data.article_number != null ?  data.article_number: '')
	+ '</td><td class="centerValue">' +  (legend != null ?  legend: '')
	+ '</td><td class="centerValue">' +  (data.scanned_ean != null ?  data.scanned_ean: '')
	+ '</td><td class="centerValue">' +  (data.article_desc_to_display != null ?  data.article_desc_to_display: '')
	+ '</td><td class="centerValue">' +  (data.uom != null ? data.uom : '')
	+ '</td><td class="centerValue">' +  (data.om != null ? data.om: '')
	+ '</td><td class="centerValue">' +  (data.sell_price != null ? data.sell_price: '')
	+ '</td><td class="centerValue">' +  (data.location_name != null ? data.loc: '')
	+ '</td><td class="centerValue">' +  (data.base_count != null ? data.base_count: '')
	+ '</td><td class="centerValue">' +  (data.recount_1 != null ? data.recount_1: '')
	+ '</td><td class="centerValue">' +  (data.recount_2 != null ? data.recount_2: '')
	+ '</td><td class="centerValue">' +  (data.recount_3 != null ? data.recount_3: '')
	+ '</td><td class="centerValue">' +  (data.recount_4 != null ? data.recount_4: '')
	+ '</td><td class="centerValue">' +  (data.final_count != null ? data.final_count: '')
	+ '</td><td class="centerValue">' +  (data.total_value != null ? data.total_value: '')
	+ '</td><td class="centerValue">' +  (data.soh != null ? data.soh: '');
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
 * Shows error message
 * @param msg
 * @param title
 */
function showReportErrorMsg(msg, title){
	var errorContent = '<li><ol><li>'+msg+'</li></ol></li>';
	$('#reportErrorWrapper').find('#titleContent').html(title);
	$('#reportErrorWrapper').find('#errorContent').html(errorContent);
	$('#reportErrorWrapper').removeClass('hideBlock');
}

function prepareBaseCountReportParam(area){
	var aisleArray = new Array();
	var bayArray = new Array();
	var locArray = new Array();
	var subLocArray = new Array();
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();
	var userArray = new Array();
	var sideArray = new Array();
	var sideValue = "";
	var rightSideFlg = false;
	var leftSideFlg = false;

	if(area.find('#basedepH').is(':checked')){
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
		area.find('#articleCountDeptDrpDwnUl').find('.deptDrpDwnChkBx:checked').each(function(){
			deptArray[deptArray.length] = $(this).val();
		});
	}	
	
	if(area.find('.baseAisleH').is(':checked')){
		// aisle selection
		area.find("input[name='aisleList']").each(function() {
			if ($(this).is(':checked')) {
				aisleArray[aisleArray.length] = $(this).val();
			}
		});
	
		// bay
		area.find("input[name='bay']").each(function() {
			if ($(this).is(':checked')) {
				bayArray[bayArray.length] = "'"+$(this).val()+"'";
				//var index = aisleArray.indexOf($(this).attr('aisleId'));
				//if (index > -1) {
					//aisleArray.splice(index, 1);
				//}
			}
		});
		area.find("input[name='side']").each(function() {
			if ($(this).is(':checked')) {
				//sideArray[sideArray.length] = $(this).val();
				var sideVal = $(this).val();
				if( sideVal == "L"){
					leftSideFlg = true;
				}else if (sideVal == "R"){
					rightSideFlg = true;
				}

			}
		})
	} else {
		area.find('#articleCountAisleDrpDwnUl').find('.ailseDrpDwnChkBx:checked').each(function(){
			aisleArray[aisleArray.length] = $(this).val();
		});
	}
	
	if(area.find('#articleCountLocH').is(':checked')){
		// location selection
		area.find("input[name='locList']").each(function() {
			if ($(this).is(':checked')) {
				locArray[locArray.length] = $(this).val();
			}
		});
	
		// bay
		area.find("input[name='subloc']").each(function() {
			if ($(this).is(':checked')) {
				subLocArray[subLocArray.length] = $(this).val();
				//var index = locArray.indexOf($(this).attr('locId'));
				//if (index > -1) {
					//locArray.splice(index, 1);
				//}
			}
		});
	} else {
		area.find('#articleCountLocDrpDwnUl').find('.locDrpDwnChkBx:checked').each(function(){
			locArray[locArray.length] = $(this).val();
		});
	}
	
	area.find('#articleCountUsrDrpDwnUl').find('.usersDrpDwnChkBx:checked').each(function(){
		userArray[userArray.length] = $(this).val();
	});
	if(leftSideFlg && rightSideFlg){
		sideValue = "L,R";
	}else if(!leftSideFlg && rightSideFlg){
		sideValue = "R";
	}else if (leftSideFlg && !rightSideFlg){
		sideValue = "L";
	}else {
		sideValue = "";
	}
	
	var param = {
			"iv_dept_id" : deptArray.join(","),
			"iv_cat_id" : catArray.join(","),
			"iv_sub_cat_id" : subCatArray.join(","),
			"iv_seg_id" : segArray.join(","),
			"iv_st_id" : $("#reportDetailsStockTakeId").html(),
			"iv_loc_id" : locArray.join(","),
			"iv_sub_loc_id" : subLocArray.join(","),
			"iv_aisle" : aisleArray.join(","),
			"iv_bay" : bayArray.join(","),
			"iv_userid" : userArray.join(","),
			"iv_article_no": "",
			"iv_barcode_flag": "",
			"iv_article_barcode": "",
			"iv_st_status": glSTStatus,
			"iv_from_variance_screen":"N",
			"iv_side":sideValue,
			//"SC-526/12014"
			"iv_plano_loc_fltr_val": aisleArray.join(","),
			"iv_other_loc_fltr_val" : locArray.join(",")
	};
	
	//allInputs="Aisles: "+aisleArray.join(",")+"| Sub-categories: "+subCatArray.join(",")+"|User: "+userArray.join(",");
	allInputs="Aisles: "+aisleArray.join(",")+" | User: "+userArray.join(",");
	return param;
}	

function callStockTakeArticleCountJasperPrint(reportResultArray)
{		
	var groupBy = "";
	if($('#Article_Count_Report_table').data('confObj').applyGroup){
		groupBy = $('#Article_Count_Report_table').data('confObj').cur_gru_col;
		if(groupBy == "subcat_name"){
			groupBy = "S";
		}else if(groupBy == "location_name"){
			groupBy = "L";
		}else if(groupBy == "base_count_usr_nm"){
			groupBy = "U";
		}else if(groupBy == "groupByKey"){
			groupBy = "LU";
		}
		
		reportResultArray = $('#Article_Count_Report_table').data('confObj').groupedCont;
	}
	
	var obj={	
			stockTakePrint  : stockTakePrint,
			reportResult	: reportResultArray,
			reportFor		: allInputs,
			storeNo 		: $('#posSite').val(),
			storeName 		: $('#posSiteName').val(),		
			totalCount		: reportResultArray.length,
			groupBy			: groupBy
			
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../stockTakeArticleCountreport/printStockTakeArticleCountReportPDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	if(response.data == 'success')
		{
		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
		stopLoading();
	console.log('request failed'+errorThrown);
	}
	});
}

function printCountContent(){
	$('#stockTakeForm').attr("action", "../stockTakeArticleCountreport/downloadStockTakeArticleCountReportPdf.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
}
//"SC-526/12014"
function bindCntRptFilterChange(){
	$('#articleCountLocDrpDwnUl input').bind('change',function(){
		console.log('loc');
		$('#articleCountAisleDrpDwnUl input,#articleCountUsrDrpDwnUl input,#articleCountDeptDrpDwnUl input').prop('checked',false);
		$('#articleCountDeptDrpDwnLabel').html('Select Department');
		$('#articleCountAisleDrpDwnLabel').html('Select aisles');
		$('#articleCountUsrDrpDwnLabel').html('Select user');
		resetHierarchyDept($('#baseCountArticleHierarchyId'),'articleCountallDeptChkBox');
	});
	$('#articleCountAisleDrpDwnUl input').bind('change',function(){
		console.log('ais');
		$('#articleCountLocDrpDwnUl input,#articleCountUsrDrpDwnUl input,#articleCountDeptDrpDwnUl input').prop('checked',false);
		$('#articleCountDeptDrpDwnLabel').html('Select Department');
		$('#articleCountLocDrpDwnLabel').html('Select locations');
		$('#articleCountUsrDrpDwnLabel').html('Select user');
		resetHierarchyDept($('#baseCountArticleHierarchyId'),'articleCountallDeptChkBox');
	});
}