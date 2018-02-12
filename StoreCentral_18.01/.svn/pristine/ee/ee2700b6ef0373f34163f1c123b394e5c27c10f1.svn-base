var $currentPanel = '';
var $currentCountPanel = '';
var $currentMissedPanel = '';
var $currentVariancePanel = '';
var nullVariance = false;
var mainTabClicked = false;
var modifiedLocPrintMsg = "Do you want to print following changed location?";
var allLocPrintMsg = "Do you want to print All locations?";
var varMap = {};
var varList = [];
var resObjCommon = '';
var aisleSideVaiable = '';
var getVarianceSmryResponse= '';
var noVariance = true;
var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
var filterMandatoryFlag=false;
//"SC-526/12014"
var responseAisleDropDownCntRpt = [];
var responseLocationDropDownCntRpt = [];
$(function() {				
	// Code for profile menu
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });		

	$(".tooltip").tooltip({ 
		position: { 
			my: "left bottom", 
			at: "left top" 
		} 
	});
	$("label,option,select").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	// Code for tooltip
	$("a").tooltip({
		position : {
			my : "left top",
			at : "left top-40"
		}
	});
	$("#mainTabs").tabs({                                                               
        activate:function(event,ui){ //Tab click event 
        	filterApplyClicked = false;
        	mainTabClicked = true;
        	reporttabIndex = ui.newTab.index();
        	ui.newPanel.addClass('hideBlock');
        	$currentPanel = ui.newPanel;
        /*	if(getSTDetailsToAll.stocktake_status == "OPEN"){
        		callGetSTSummaryServiceOnAllTab(getSTDetailsToAll.stocktake_id);
        	}*/
        	handleStocktakeTabChangeEvent();
        }                                                                          
	});
	
	$("#baseCountTabs").tabs({                                                               
        activate:function(event,ui){ //Tab click event 
        	baseCountTabIndex = ui.newTab.index();
        	//console.log($(this));
        	ui.newPanel.addClass('hideBlock');
        	$currentCountPanel = ui.newPanel;
        	//if(ui.newTab.find('a').attr('perc') > 0){
				if(baseCountTabIndex == 0 && !mainTabClicked){	
					onRecordSelect= true;
					resetHierarchy();
					callGetSTArticleCountSummaryService($("#reportDetailsStockTakeId").html(),'#promo-1', 'COMPLETED');
					//callArticleCountTabService('#promo-1', 'COMPLETED');
				}else if(baseCountTabIndex == 1 && ui.newTab.find('a').attr('perc') > 0 && !mainTabClicked){
					callGetSTArticleCountSummaryService($("#reportDetailsStockTakeId").html(),'#promo-2', 'BEING_COUNTED');
					//callArticleCountTabService('#promo-2', 'BEING_COUNTED');
				}else if(baseCountTabIndex == 2 && ui.newTab.find('a').attr('perc') > 0 && !mainTabClicked){
					callGetSTArticleCountSummaryService($("#reportDetailsStockTakeId").html(),'#promo-3', 'READY_TO_COUNT');
					//callArticleCountTabService('#promo-3', 'READY_TO_COUNT');
				}
        	//}
        }                                                                          
	});
	
	$("#missedArticlesTabs").tabs({                                                               
        activate:function(event,ui){ //Tab click event 
        	missedArticlesTabIndex = ui.newTab.index();
        	$currentMissedPanel  = ui.newPanel;
        	$currentMissedPanel.addClass('hideBlock');
        	if(ui.newTab.find('a').attr('perc') > 0){
	            if(missedArticlesTabIndex == 0 && !mainTabClicked){	
	            	$tblhold = $("#reportContent1");
	            	pendingTabShow(resObjCommon);
	            }else if(missedArticlesTabIndex == 1 && !mainTabClicked){
	            	$tblhold = $("#reportContent2");
	            	
	            }else if(missedArticlesTabIndex == 2 && !mainTabClicked){
	            	$tblhold = $("#reportContent3");
	            	if($('#missedArticleCompletedLabel').attr('perc') ==100){
	            		$.fn.showCustomMsg(	[ 'The Missed articles have been completed successfully.' ],
	            				success,
	            		'Stocktake-Missed Articles Count Report');
	            		$tblhold.addClass("hideBlock");
	            	}
	            }
	            if(!mainTabClicked && missedArticlesTabIndex != 0 && missedArticlesTabIndex != 2){
	            	$tblhold = $("#reportContent2");
		            resetHierarchyDept($('#missedArticleHierarchyId'),'');
		            fetchMissedArticlesReportWithoutFilters();
	            }
        	}else if(getSTDetailsToAll.uniq_article_flg == 'Y' && (missedArticlesTabIndex == 1 && !mainTabClicked) && missedPercentage < 100){
        		$tblhold = $("#reportContent2");
        		callGetSTMissedArticleSummaryServiceUnique($("#reportDetailsStockTakeId").html());
        		fetchMissedArticlesReportWithoutFilters();
        	}
        }                                                                          
	});
	
	$("#varianceReportTabs").tabs({                                                               
        activate:function(event,ui){ //Tab click event 
        	varianceReportTabIndex = ui.newTab.index();
        	$currentVariancePanel  = ui.newPanel;
        	$currentVariancePanel.addClass('hideBlock');
        	if(ui.newTab.find('a').attr('perc') > 0){
	            if(varianceReportTabIndex == 0 && !mainTabClicked){
	            	$tblhold = $("#reportContent2_pend");
	            	callReportSTVarianceService(getVarianceReportParam("PENDING"));
	            	resetHierarchyDept($('#varianceReportArticleHierarchyId'),'');
	            }else if(varianceReportTabIndex == 1 && !mainTabClicked){
	            	$tblhold = $("#reportContent2_ip");
	            	callReportSTVarianceService(getVarianceReportParam("INPROGRESS"));
	            }else if(varianceReportTabIndex == 2 && !mainTabClicked){
	            	$tblhold = $("#reportContent2_comp");
	            	callReportSTVarianceService(getVarianceReportParam("COMPLETED"));
	            }
        	}
        	else if(nullVariance )
        		{
        		 if(varianceReportTabIndex == 2)
        			{
        			var areaFinalise = $('#review-3').find('.tableFooter');
        			//$('#review-3').find('.varianceFooter').removeClass('hideBlock')
        			$currentVariancePanel.removeClass('hideBlock');
        			$('#review-3 .articleHead ,#review-3 .orderDetails,#review-3 .emptyTable,#review-3 .displayArea').addClass('hideBlock');
        			$('#review-3').find('.stDtlActionBtns .legend').addClass('hideBlock');
        			$('#review-3').find('.varianceFooter').removeClass('hideBlock');
        			$('#review-3').find('.varianceFooter').find('.pageActions').find('.finaliseStocktakeClass').removeClass('hideBlock');
        			if(glSTStatus == "OPEN"  && noVariance && (missedPercentage == 100 && nullVariance)){
        				noVariance = false;
        				$(areaFinalise).append(pageActComp);
        			}
        			if(glSTStatus == "COMPLETED"){
        				$("#finaliseStocktake").addClass('hideBlock')
        			}else{
        				$("#finaliseStocktake").removeClass('hideBlock')
        			}
        			bindVarianceRptActionBtns();
        			}
        		}
        }                                                                          
	});
		
	
	// group by
	$('#groupByOpen').click(function(){
		$("#groupByOpen").addClass('hideBlock');
		$("#tableAddAction").removeClass('hideBlock');
		$("#groupByClear").removeClass('hideBlock');
		
		$("#tablefilters").addClass('hideBlock');
		$("#filterClear").addClass('hideBlock');
		$("#filterOpen").removeClass('hideBlock');
		
	});
	
	$('#groupByClear').click(function(){
		$("#groupByOpen").removeClass('hideBlock');
		$("#tableAddAction").addClass('hideBlock');
		$("#groupByClear").addClass('hideBlock');			
		
	});
	
	
	
	/*$('body').on('click', '#add_grp_link_btn_Article_Count_Report', function() {//dynamic elem event bind
		$("#filterClear").trigger("click");//to close filter if opened
	});*/
	
	
	
	$("#as").click(function(){ 
		if( $('#pas').hasClass('active')){
			$("#pas").removeClass('active');
		} else {
			$("#pas").addClass('active');
		}
	});
	
	$("#ds").click(function(){ 
		if( $('#pds').hasClass('active')){
			$("#pds").removeClass('active');
		} else {
			$("#pds").addClass('active');
		}
	});
	
	

	
	
			
		
	/* Code for hierarchy  */
			
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
		//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});
	
	
	$("input[name='categoryList']").click(function() {	
		$("#subCatDiv").find(".noSelection").addClass('hideBlock');
		$("#subCatDiv").find("ul").removeClass('hideBlock');
		$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
		//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');	
		//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});
	
	$("input[name='subCatList']").click(function() {	
		//$("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeIn(400);
						
		$("#segDiv").find(".noSelection").addClass('hideBlock');
		$("#segDiv").find("ul").removeClass('hideBlock');
		$("#segDiv").find(".totalCount").removeClass('hideBlock');	
		//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeOut(300);
	});
	
	$("input[name='segmentList']").click(function() {	
		//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);
			
		//$("#segDiv").find(".heirachyAction").removeClass('hideBlock');
		$("#segDiv").find(".heirachyAction").fadeIn(400);
	});
	
	// Code to show and hide bays NOTE TO TECH TEAM: Please write a better javascript than this to manage heirarchy interactions
	
	$('#ab').click(function() {		
		if($(this).is(':checked'))
			$("#baysHierarchy").removeClass('hideBlock');
		else
			$("#baysHierarchy").addClass('hideBlock');
	});			
		
	/* Code for hierarchy  */					
	$("input[name='baysList']").click(function() {				
		$("#baysDiv").find("#baynoSelection").addClass('hideBlock');
		$("#baysDiv").find("ul").removeClass('hideBlock');
		$("#baysDiv").find(".totalCount").removeClass('hideBlock');rea.find("")
	
	});
	
	// code for table sorter 
	$(".actionRows").tablesorter();
	
	$(".actionRows th").click(function(){
		$('.actionRows tr td').each(function(){				
			$(this).removeClass("sorted");				
		});
		
		col=$(this).parent().children().index($(this));		
		
		$('.actionRows tr').each(function(){				
			$(this).find('td').eq(col).addClass("sorted");				
		});			
	
	});
	
	// popup for Compare vakuation summary
	
	$( "#dialog-lay" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		width: 700
	});
	
	$("#dialog-lay").parent().addClass("popupWrapper");	
	
	
	$("#compare").click(function() {									
		$("#dialog-lay" ).dialog("open");
	});
	
	$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
		$("#dialog-lay").dialog("close");			
	});

	$( "#dialog-stocktake" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 500
	});
	
	
	$("#dialog-stocktake").parent().addClass("popupWrapper");	
	
	$("#finaliseStocktake").click(function(){ 
		$("#dialog-stocktake" ).dialog("open");				
	});
	
	$("#dialog-stocktake .popupActions label").click(function(){ 
		$("#dialog-stocktake" ).dialog("close");				
	});

	$( "#dialog-override" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 500
	});			
	
	$("#dialog-override").parent().addClass("popupWrapper");	
	
	$("#ignore").click(function(){ 
		$("#dialog-override" ).dialog("open");				
	});
	
	$("#dialog-override .popupActions label").click(function(){ 
		$("#dialog-override" ).dialog("close");				
	});
	
	
	
	// group by
	$('#groupByOpena').click(function(){
		$("#groupByOpena").addClass('hideBlock');
		$("#tableAddActiona").removeClass('hideBlock');
		$("#groupByCleara").removeClass('hideBlock');
	});
	
	$('#groupByCleara').click(function(){
		$("#groupByOpena").removeClass('hideBlock');
		$("#tableAddActiona").addClass('hideBlock');
		$("#groupByCleara").addClass('hideBlock');				
	});
	
	
			
	
	
	$("#refreshSTReportDetailsId").click(function(){
		startLoading();
		filterApplyClicked = false;
		//callDisplaySTDetailsService($("#reportDetailsStockTakeId").html(),"D");
		handleGetStockTakeReportDetails();
		//handleStocktakeTabChangeEvent();
	});
	
	$("#stockValuationRefreshId").click(function(){	
		$tblhold = $("#reportContent6");
    	callReportSTValuationService();
	});
	
	
	
	//For user performance report
	bindDropDownClick("userPerfUsrDrpDwnDiv","userPerfUsrDrpDwnActiveId");
	bindDropDownClick("userPerfAisleDrpDwnDiv","userPerfAisleDrpDwnActiveId");
	bindDropDownClick("userPerfLocDrpDwnDiv","userPerfLocDrpDwnActiveId");
	bindDropDownClick("userPerfDeptDrpDwnDiv","userPerfDeptDrpDwnActiveId");
	bindAisleHierarchyEventForUserPerformanceReport();
	bindLocHierarchyEventForUserPerformance();
	
	//For team performance report
	$("#addParameter").on("click", ".addRow", function(){
		$(this).remove();
		addRow();
	});
	
	bindPrint();	
	$("#dialog-reduced-print").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 515
	}).parent().addClass("popupWrapper");
		
});
function handleStocktakeTabChangeEvent(){
	//$(".displayArea").empty();//for proper pagination
    if(reporttabIndex == 0){
    	resetHierarchy();
    	loadBaseCountReport();
    	mainTabClicked = false;
    }else if(reporttabIndex == 1){
    	if(missedArticleCompletionFlag == 'G'){//already missed article report geenrated.
    		/*var warningMsg='"Missed Article Report has already been generated. Do you want to generate again?';
			$.fn.warnPopup('warn',warningMsg,'Stocktake-Missed Article',triggerYesMissedArticleGenerate,triggerNoMissedArticleGenerate,'','');
			*/
			handleNoMissedArticleGenerate();			// hided missed article re- generation 
    	}else{
    		handleNoMissedArticleGenerate();
    	}
    	mainTabClicked = false;
    }else if(reporttabIndex == 2){
    
    	if( /*basePercentage == 100 &&*/ missedPercentage > 0){
    		$tblhold = $("#reportContent2_pend");
    		defaultVarainceFilters();
    		callGetSTVarianceSummaryService($("#reportDetailsStockTakeId").html());
    		mainTabClicked = false;
    	}else {
    		stopLoading();
    		$.fn.showInformationSTVarianceTabMsg('Stocktake');
    	}
    }else if(reporttabIndex == 3){
    	$tblhold = $("#reportContent3_audit");
    	callReportSTAuditSummaryService();
    }else if(reporttabIndex == 4){
    	$tblhold = $("#reportContent4");
    	fetchTeamPerfReportWithoutFilters();
    }else if(reporttabIndex == 5){
    	$tblhold = $("#reportContent5");
    	fetchUserPerfReportWithoutFilters();
    	if(!isUserPerformanceReportPopulated){
    		isUserPerformanceReportPopulated = true;
    		populateFiltersForUserPerformanceReport();
    	}       
    	defaultUserPerfFilters();
    	
    }else if(reporttabIndex == 6){
    	$tblhold = $("#reportContent6");
    	allInputs = "ALL";//Prepare data for print.. default selections
    	callReportSTValuationService();
    }
    else if(reporttabIndex == 7){
    	if (typeof callServiceToGetFinaliseStocktakeDetails == 'undefined') {//to check if js loaded or not
    		$('head').append('<script type="text/javascript" src="../../scripts/stocktakeFinalise.js"></script>');
    		bindFinaliseSTTabEvents();
    	}
    	bindFinaliseSTTabEvents();
    	$tblhold = $("#reportContent7");
    	allInputs = "ALL";//Prepare data for print.. default selections
    	callServiceToGetFinaliseStocktakeDetails();
    }
   
}
var triggerYesMissedArticleGenerate = function(e){
	var $elem = e.data.msg;
	handleYesMissedArticleGenerate();	
	$elem.dialog('close');
};
var triggerNoMissedArticleGenerate = function(e){
	var $elem = e.data.msg;
	handleNoMissedArticleGenerate();	
	$elem.dialog('close');
};
function handleNoMissedArticleGenerate(){
	$tblhold = $("#reportContent1");
	defaultMissedArticlesFilters();
	if(getSTDetailsToAll.uniq_article_flg != 'Y'){
		callGetSTMissedArticleSummaryService($("#reportDetailsStockTakeId").html());
	}else {
		$("#missedArticlePendingLabel").html(''+ "% Pending").attr('perc','');
		$("#missedArticleInProgressLabel").html(''+ "% In-progress").attr('perc','');
		$("#missedArticleCompletedLabel").html(''+ "% Completed").attr('perc','');
		$currentMissedPanel = $('#missed-1');
		$currentMissedPanel.addClass('hideBlock');
		$('#missedArticlesTabs').tabs('option','active','0');
		$currentPanel.removeClass('hideBlock');
	}
}
function handleYesMissedArticleGenerate(){
	callReportSTMissedArticleRegenerateService();
}
function bindFilterEventsForArticleCountReport(){
	bindDropDownClick("articleCountUsrDrpDwnDiv","articleCountUsrDrpDwnActiveId");
	bindDropDownClick("articleCountAisleDrpDwnDiv","articleCountAisleDrpDwnActiveId");
	bindDropDownClick("articleCountLocDrpDwnDiv","articleCountLocDrpDwnActiveId");
	bindDropDownClick("articleCountDeptDrpDwnDiv","articleCountDeptDrpDwnActiveId");
	bindAisleHierarchyEvent();
	bindLocHierarchyEventForArticleCount();
	bindArticleHierarchyEventForArticleCount();
	bindDepartmentSelectEvent($('#baseCountArticleHierarchyId'),false);
	bindCategorySelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSubCategorySelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSegmentSelectEvent($('#baseCountArticleHierarchyId'),false);
	bindSelectAllArticleEvents($('#baseCountArticleHierarchyId'));
	if(onRecordSelect && !isNationalStocktake){
		onRecordSelect = false;
		//$('#filterClear').trigger('click');
		filterApplyClicked = false;
		 if(filterContent != '' && reporttabIndex == 0){//basecount	//Group by and filter in same line changes
		    	$("#tablefilters").html(filterContent);
		  }
		defaultArticleCountFilters();//Group by and filter in same line changes
		resetHierarchy();
	}
}
function resetHierarchy(){
	$('#baseCountArticleHierarchyId .parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
	$('#baseCountArticleHierarchyId .noSelectionCat,.noSelectionSub,.noSelectionSeg').removeClass('hideBlock');
	$('#baseCountArticleHierarchyId .catLstCnt,.sCatLstCnt,.segLstCnt').text('0');
	$('#baseCountArticleHierarchyId .sCatSelectAll,.catSelectAll,.segSelectAll').prop('checked',false);
	$('#baseCountArticleHierarchyId .subCatTotal,.categoryLstTotal,.segmentTotal').addClass('hideBlock');
	//"SC-526/12014"
	$('#articleCountallAisleChkBox').prop('checked',true).trigger('click');
	$('#articleCountallLocChkBox').prop('checked',true).trigger('click');
	$('#articleCountallUsrChkBox').prop('checked',true).trigger('click');
	//$('#articleCountallDeptChkBox').prop('checked',true).trigger('click');
	$('#baseAisleH').prop('checked',true).trigger('click');
	$('#articleCountLocH').prop('checked',true).trigger('click');
	$('#articleCountLocHierarchyId .locSelectAll').prop('checked',false).trigger('click');
	$('#aisleSelectAll').prop('checked',true).trigger('click');

}
function bindFilterEventsForMissedArticleReport(){
	bindDropDownClick("missedArticlesAisleDrpDwnDiv","missedArticlesAisleDrpDwnActiveId");
	bindDropDownClick("missedArticlesDeptDrpDwnDiv","missedArticlesDeptDrpDwnActiveId");
	bindAisleHierarchyEventForMissedArticles();
	bindArticleHierarchyEventForMissedArticles();
}
function bindFilterEventsForVarainceReport(){
	//For variance report
	bindDropDownClick("varianceReportDeptDrpDwnDiv","varianceReportDeptDrpDwnActiveId");
	bindArticleHierarchyEventForVarianceReport();
}
function loadBaseCountReport(){
	$tblhold = $("#reportContent0"); 
	defaultArticleCountFilters();
	callGetSTArticleCountSummaryService($("#reportDetailsStockTakeId").html(),'#promo-1', 'COMPLETED');
}
/**
 * Sets report content area and the content
 */
function loadReportContentTbl() {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = '';
	if(reporttabIndex == 0){
		confObj = (new tblReportArticleCount(responseP));
	}else if(reporttabIndex == 1){
		if(missedArticlesTabIndex == 1){
			groupMissedList(responseP);
			confObj = (new tblReportMissedSubCategory(varList));
		}else{
			confObj = (new tblReportMissedArticles(responseP));
		}
	}else if(reporttabIndex == 2){
		groupVarienceList(responseP);
		confObj = (new tblReportVarianceSubCategory(varList));
		//confObj = (new tblReportVariance(responseP));
	}else if(reporttabIndex == 3){
		confObj = (new tblReportAuditSummary(responseP));
	}else if(reporttabIndex == 4){
		if(filterApplyClicked){
			confObj = (new tblReportTeamPerformance(responseP));
		}else{
			confObj = (new tblReportTeamPerformanceDefault(responseP));
		}
		
	}else if(reporttabIndex == 5){
		confObj = (new tblReportUserPerformance(responseP));
	}else if(reporttabIndex == 6){
		confObj = (new tblReportStockValuation(responseP));		
	}else if(reporttabIndex == 7){
		confObj = (new tblFinaliseStocktake(responseP));		
	}
	
	$tblhold.loadtbl(confObj);
	if(reporttabIndex == 0){//Article count
		//Group by and filter in same line changes
		//move the filter button div next to group by
		filterButtonDivContent = $("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().clone();
		$("#add_grp_link_btn_Article_Count_Report").parent().prepend(filterButtonDivContent);
		$("#baseCountFilterButtonDiv").find('.lookupActionWrapper').contents().remove();
		//move the filter div in place of group by data div
		filterContent = $("#tablefilters").contents().clone();
		//reporttabIndex = reporttabIndex;
		$("#grou_cont_Article_Count_Report").after(filterContent);
		$("#tablefilters").contents().remove();
		//Defect_12624 - Fix
		$("#grou_cont_Article_Count_Report").addClass("hideBlock");
		//hiding groupby for Base Count
		$("#action_btn_wrap_Article_Count_Report").find(".groupByOpen").addClass("hideBlock");
		$("#action_btn_wrap_Article_Count_Report").find(".groupByClear").addClass("hideBlock");
		populateFiltersForArticleCount();
		bindFilterEventsForArticleCountReport();
	}else if(reporttabIndex == 1){//Missed articles
		//Group by and filter in same line changes
		//move the filter button div next to group by
		if(!isNationalStocktake){
			filterButtonDivContentMissedArticle = filterButtonDivContentMissedArticle == '' ? $("#missedArticleFilterButtonDiv").find('.lookupActionWrapper').contents().detach() : filterButtonDivContentMissedArticle;
			$("#add_grp_link_btn_missed_rpt_subcat_"+missedArticlesTabIndex).parent().prepend(filterButtonDivContentMissedArticle);
			//$("#missedArticleFilterButtonDiv").find('.lookupActionWrapper').contents().remove();
			//move the filter div in place of group by data div
			filterContentMissedArticles = filterContentMissedArticles == '' ? $("#tablefilters2").contents().detach() : filterContentMissedArticles;
			//reporttabIndex = reporttabIndex;
			$("#grou_cont_missed_rpt_subcat_"+missedArticlesTabIndex).after(filterContentMissedArticles);
			//$("#tablefilters2").contents().remove();		
			$('#grou_cont_missed_rpt_subcat_1,#clr_grp_link_btn_missed_rpt_subcat_1').addClass('hideBlock');
			if(!filterApplyClicked){
				populateFiltersForMissedArticles();
			}else{
				bindDepartmentSelectEvent($("#missedArticleHierarchyId"),false);
				bindCategorySelectEvent($("#missedArticleHierarchyId"),false);
				bindSubCategorySelectEvent($("#missedArticleHierarchyId"),false);
				bindSegmentSelectEvent($("#missedArticleHierarchyId"),false);
			}
			bindFilterEventsForMissedArticleReport();
		}else{
			$('#action_btn_wrap_missed_rpt_subcat_1,#grou_cont_missed_rpt_subcat_1').addClass('hideBlock');
		}
	}else if(reporttabIndex == 2 && varianceReportTabIndex == 0){//Varaince reprot only fr pending tab filters
		//Group by and filter in same line changes
		//move the filter button div next to group by
		filterButtonDivContentVariance = $("#varianceFilterButtonDiv").find('.lookupActionWrapper').contents().clone();
		$("#add_grp_link_btn_variance_rpt_"+varianceReportTabIndex).parent().prepend(filterButtonDivContentVariance);
		$("#varianceFilterButtonDiv").find('.lookupActionWrapper').contents().remove();
		//move the filter div in place of group by data div
		//filterContentVariance= $("#tablefilters3").contents().clone();
		filterContentVariance=  $("#tablefilters3").contents().detach();
		//reporttabIndex = reporttabIndex;
		$("#grou_cont_variance_rpt_"+varianceReportTabIndex).after(filterContentVariance);
		$("#tablefilters3").contents().remove();		
		populateFiltersForVarianceReport();
		bindFilterEventsForVarainceReport();
		//if(reporttabIndex == 2)
	}else if(reporttabIndex == 6){
		$("#grou_cont_Stocktake_valuation").addClass("hideBlock");//hide group by options
		$("#action_btn_wrap_Stocktake_valuation").addClass("hideBlock");//hide group by options
		$("#DUMMY").addClass("hideBlock");//hide dummy group by row
	}
	else if(reporttabIndex == 4){
		$("#grou_cont_Stocktake_TeamPerformance").addClass("hideBlock");//hide group by options
		$("#action_btn_wrap_Stocktake_TeamPerformance").addClass("hideBlock");//hide group by options
		$("#DUMMY_TEAM_PER").addClass("hideBlock");//hide dummy group by row
	}
}
var groupVarienceList = function(list){
	($('.varMainTable_'+varianceReportTabIndex+'').find('.printSTVarContent')).text('');
	$('.varMainTable_'+varianceReportTabIndex+'').find('.printSTVarContent').remove();	//clearing subcategory every time
	varList =[];
	varMap ={};
	var checkkey ='sub_cat_name';
	var obj = {};
	var tempList =[];
	var tempMap ={};
	for(var i =0; i<list.length;i++){
		obj = list[i];
		key = obj[checkkey];
		/*if(obj.stocktake_id!=undefined && obj.sub_cat!=null && obj.sub_cat_name!=null){
			obj.sub_cat_name = (departmentMap[obj.SEGMENT_NO.substr(0,2)][0].node_desc);
			obj.department_no = obj.SEGMENT_NO.substr(0,2);
		}else{
			obj.sub_cat_name = '';
			obj.department_no ='';
		}*/
		if(obj.stocktake_id!=undefined && obj.sub_cat!=undefined && obj.sub_cat_name!=undefined
				&& varMap.hasOwnProperty(key)){
			tempList = varMap[key];
			tempList.push(obj);
			varList[tempMap[key]].sub_cat_array.push(obj.sub_cat_name);
		}else{
			tempList = [];
			tempMap[key]= varList.length;
			obj.sub_cat_array =[];
			obj.sub_cat_array.push(obj.sub_cat_name);
			varList.push(obj);
			tempList.push(obj);
		}
		varMap[key]= tempList;
	}
  	return true;
 };
/**
 * Binds print button click
 */
function bindPrint(){
	var printDataId = '';
	//$("#articleCountPrintBtn").click(function(){//Article Count or Base count
	$(".articleCountPrintBtn").unbind('click');
	$(".articleCountPrintBtn").on('click',function() {	
		//frameReportSTArticleCount(responseP);
		//printDataId = 'printDataForSTArticleCount';		
		/*var reportResultArray = [];		
		reportResultArray = $('#Article_Count_Report_table').data('confObj').content;
		callStockTakeArticleCountJasperPrint(reportResultArray);*/
		printCountContent();
		//openPrintWindow(printDataId);
	});	
	//$("#missedArticlesPrintBtn").click(function(){//Missed articles
		$(".missedArticlesPrintBtn").unbind('click');
		$(".missedArticlesPrintBtn").on('click',function() {	
			//frameReportSTArticleCount(responseP);
			//printDataId = 'printDataForSTArticleCount';		
			var reportResultArray = [];			
			reportResultArray = getPrintExportDataForMissedArticles();
			if(reportResultArray.length == 0){
				$.fn.showCustomMsg(['Please select sub-categorie(s).'],error,'Stocktake-Missed Articles Count');
			}else{
				printMissedContent();
			}
	});
	
		//$("#variancePrintBtn").click(function(){//Missed articles
		
		$(".variancePrintBtn").unbind('click');
		$(".variancePrintBtn").on('click',function() {	
			//frameReportSTArticleCount(responseP);
			printDataId = 'printDataForSTArticleCount';		
			//var reportResultArray = [];			
			//reportResultArray = getPrintExportDataForVaraince();
			//if(reportResultArray.length == 0){
				//$.fn.showCustomMsg(['Please select sub-categorie(s).'],error,'Variance Report');
			//}else{
				printVarianceContent();
			//}	
	});
	$("#auditSummaryPrintBtn").unbind('click');
	$("#auditSummaryPrintBtn").on('click',function() {//Audit summary
		//frameReportSTAuditSummary(responseP);
		//printDataId = 'printDataForSTAuditSummary';
		//openPrintWindow(printDataId);
		/*var reportResultArray = [];			
		reportResultArray = $('#audit_summary_rpt_table').data('confObj').content;
		callStockTakeAuidtSummaryJasperPrint(reportResultArray);*/
		printAuditContent();
	});
	$("#stockValuationPrintBtn").unbind('click');
	$("#stockValuationPrintBtn").on('click',function() {//Stock valuation
		/*frameReportSTValuation(responseP);
		printDataId = 'printDataForSTStockValuation';
		openPrintWindow(printDataId);*/
		/*var reportResultArray = [];			
		reportResultArray = $('#Stocktake_valuation_table').data('confObj').content;
		callStockTakeStockValuationJasperPrint(reportResultArray);*/
		printValuationContent();
	});
	$("#userPerformancePrintBtn").unbind('click');
	$("#userPerformancePrintBtn").on('click',function() {//User performance
		/*frameReportSTUserPerformance(responseP);
		printDataId = 'printDataForSTUserPerformance';
		openPrintWindow(printDataId);*/
		/*var reportResultArray = [];			
		reportResultArray = $('#Stocktake_UserPerformance_table').data('confObj').content;
		callStockTakeUserPerformanceJasperPrint(reportResultArray);*/ 
		printUserPerformance();
	});
	$("#teamPerformancePrintBtn").unbind('click');
	$("#teamPerformancePrintBtn").on('click',function() {//Team performance
		/*frameReportSTTeamPerformance(responseP);
		printDataId = 'printDataForSTTeamPerformance';
		openPrintWindow(printDataId);*/
		/*var reportResultArray = [];			
		reportResultArray = $('#Stocktake_TeamPerformance_table').data('confObj').content;
		callStockTakeTeamPerformanceJasperPrint(reportResultArray);*/
		printTeamPerformance();
	});
}
function openPrintWindow(printDataId){
	//document
	var a = window.open();
	$("#"+printDataId).show();
	a.document
			.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
	a.document
			.write(document
					.getElementById(printDataId).innerHTML);

	$("#"+printDataId).hide();
	a.focus();

	
	// call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });			
}

function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr');

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        var tmpColDelim = String.fromCharCode(11); // vertical tab character
        var tmpRowDelim = String.fromCharCode(0); // null character

        // actual delimiter characters for CSV format
        var colDelim = '","';
        var rowDelim = '"\r\n"';

        // Grab text from table into CSV formatted string
        var csv = '"' + $rows.map(function (i, row) {
            var $row = $(row),
                $cols = $(row).find('th,td');

            return $cols.map(function (j, col) {
                var $col = $(col),
                    text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"';

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
 * To populate the percentage & count for the counted,being counted,not counted base count summary report
 * @param stoktakeId
 */
function callGetSTArticleCountSummaryService(stoktakeId,tabNumber,tabStatus){
	var reqParam = {
			"iv_st_id"	: stoktakeId,
			"iv_plano_flg":""
			};
	
	console.log(getSTArticleStockCountStatus + ' ' + JSON.stringify(reqParam));	
	$.ajax({
	    type: "POST",
	    url: getSTArticleStockCountStatus,
	    data: JSON.stringify(reqParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));
		  msdCompFlag = response[0].msd_comp_flg;
		  $currentPanel = $('#mainTabs-1');
		  if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){				
				$("#articleCountCountedLabel").html(formatTo2DecimalPlaces(response[0].counted_per)+ "% Counted").attr('perc',response[0].counted_per);
				$("#articleCountBeingCountedLabel").html(formatTo2DecimalPlaces(response[0].being_counted_per)+ "% Being Counted").attr('perc',response[0].being_counted_per);
				$("#articleCountNotCountedLabel").html(formatTo2DecimalPlaces(response[0].not_counted_per)+ "% Not Counted").attr('perc',response[0].not_counted_per);
				
				$("#articleCountCountedCount").html("Completed Article Count: "+response[0].counted_art_cnt);
				$("#articleCountBeingCountedCount").html("Articles Being Counted: "+response[0].being_counted_cnt+" (approx.)");
				$("#articleCountNotCountedCount").html("Articles Not Counted: "+response[0].not_counted_cnt+" (approx.)");
				stopLoading();
				$currentCountPanel = $(tabNumber);
				$currentCountPanel.addClass('hideBlock');
				if(tabNumber == "#promo-1"){
					$("#baseCountTabs").tabs("option", "active", 0);
				}
				//if(Number(response[0].counted_per||'') >0 ){
					setLocationDetails(tabNumber, tabStatus,response); //,tabNumber,tabStatus
					//callArticleCountTabService('#promo-1', 'COMPLETED');
				//}
				$currentPanel.removeClass('hideBlock');
			} else{
				$("#articleCountCountedLabel").html("Counted");
				$("#articleCountBeingCountedLabel").html("Being Counted");
				$("#articleCountNotCountedLabel").html("Not Counted");
				
				$("#articleCountCountedCount").html("Completed Article Count:");
				$("#articleCountBeingCountedCount").html("Articles Being Counted:");
				$("#articleCountNotCountedCount").html("Articles Not Counted:");
				$currentPanel.addClass('hideBlock');
				stopLoading();
			}
	  }).fail(function() {
		  stopLoading();
	  }).always(function() {
		 
	  });		
}
function setLocationDetails(tabId, tabVal,responseP){
	if(tabVal == 'COMPLETED'){
		tabVal='COUNTED';
	}
	$(tabId).find('.aisleCol').html('').html(responseP[0][tabVal.toLowerCase()+'_aisles'] == 'No Aisles' ? '' : responseP[0][tabVal.toLowerCase()+'_aisles']);
	$(tabId).find('.subCatCol').html('').html(getMoreHyperContent(responseP[0][tabVal.toLowerCase()+'_sub_cats']));
	$(tabId).find('.userCol').html('').html(getMoreHyperContent(responseP[0][tabVal.toLowerCase()+'_users']));
	$(tabId).find('.locCol').html('').html(responseP[0][tabVal.toLowerCase()+'_locs']);
	$(tabId).find('.moreNumber').tooltip({
		tooltipClass : 'tmptooltipClass'
	});
	allInputs = (responseP[0][tabVal.toLowerCase()+'_aisles']!='') ? 'Aisles: '+responseP[0][tabVal.toLowerCase()+'_aisles'] : '';
	allInputs += (allInputs!='') ? (responseP[0][tabVal.toLowerCase()+'_users']!='' ?  (' | Users: '+responseP[0][tabVal.toLowerCase()+'_users']) : '') : (responseP[0].counted_user!='' ?  ('Users: '+responseP[0][tabVal.toLowerCase()+'_users']) : '');
	allInputs += (allInputs!='') ? (responseP[0][tabVal.toLowerCase()+'_sub_cats']!='' ?  (' | Sub-Categories: '+responseP[0][tabVal.toLowerCase()+'_sub_cats']) : '') : (responseP[0][tabVal.toLowerCase()+'_sub_cats']!='' ?  ('Sub-Categories: '+responseP[0][tabVal.toLowerCase()+'_sub_cats']) : '');
	allInputs += (allInputs!='') ? (responseP[0][tabVal.toLowerCase()+'_locs']!='' ?  (' | Other Locations: '+responseP[0][tabVal.toLowerCase()+'_locs']) : '') : (responseP[0][tabVal.toLowerCase()+'_locs']!='' ?  ('Other Locations: '+responseP[0][tabVal.toLowerCase()+'_locs']) : '');
	stopLoading();
	if(getSTDetailsToAll.uniq_article_flg == 'N'){
			var reqParam = {
					"iv_st_id"	: responseP[0].stocktake_id,
			};
			console.log(getIsFreshfoodFlag + ' ' + JSON.stringify(reqParam));	
			$.ajax({
			    type: "POST",
			    url: getIsFreshfoodFlag,
			    data: JSON.stringify(reqParam),
			    beforeSend: function() {
			    	  startLoading();
			      }
			  }).done(function(response) {
					console.log(JSON.stringify(response));	
					if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){
						if(response[0].freshfood_only_flag=='N'){
							filterMandatoryFlag=true;
							isNationalStocktake=true;
							fetchArticleCountReportWithoutFiltersForNSTK();
							stopLoading();
						}else{
							isNationalStocktake=false;
							filterMandatoryFlag=false;
							fetchArticleCountReportWithoutFilters();
						}
						
					} 
			  }).fail(function() {
			  }).always(function() {
				  //stopLoading();
			  });
	}else{
		filterMandatoryFlag=false;
		fetchArticleCountReportWithoutFilters();
		stopLoading();
	}
	$currentCountPanel!=undefined && $currentCountPanel!='' ? $currentCountPanel.removeClass('hideBlock') : '';
}
/**
 * To populate the percentage for the pending,inprogresss,completed missed article summary report
 * @param stoktakeId
 */
function callGetSTMissedArticleSummaryService(stoktakeId){
	var reqParam = {
			"iv_st_id"	: stoktakeId,
			"iv_st_art_sts":"",
			"iv_userid":"",
			 "iv_dept":"",
			 "iv_field":"",
			"iv_criteria":"",
			"iv_value":"",
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
			};
	
	console.log(getSTMissedArticleSummaryUrl + ' ' + JSON.stringify(reqParam));	
	$.ajax({
	    type: "POST",
	    url: getSTMissedArticleSummaryUrl,
	    data: JSON.stringify(reqParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));	
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){				
				$("#missedArticlePendingLabel").html(decimalOrwholeFormatter(response[0].pending_per)+ "% Pending").attr('perc',decimalOrwholeFormatter(response[0].pending_per));
				$("#missedArticleInProgressLabel").html(decimalOrwholeFormatter(response[0].inprogress_per)+ "% In-progress").attr('perc',decimalOrwholeFormatter(response[0].inprogress_per));
				$("#missedArticleCompletedLabel").html(decimalOrwholeFormatter(response[0].completed_per)+ "% Completed").attr('perc',decimalOrwholeFormatter(response[0].completed_per));
				
				$("#missedArticlePendingCount").html("Missed Articles: "+response[0].pending_cnt);
				$("#missedArticleInProgressCount").html("Subcategory Being Counted: "+response[0].inprogress_cnt+" (approx.)");
				$("#missedArticleCompletedCount").html("Articles Counted: "+response[0].completed_cnt);
				$('#missed-1').find('.subCatCol').html('').html(getMoreHyperContent(response[0].pending_sub_cat));
				$('#missed-1').find('.moreNumber').tooltip({
					tooltipClass : 'tmptooltipClass'
				});
				
				$('#missed-2').find('.subCatCol').html('').html(getMoreHyperContent(response[0].inprogress_sub_cat));
				$('#missed-2').find('.moreNumber').tooltip({
					tooltipClass : 'tmptooltipClass'
				});
				
				$('#missed-3').find('.subCatCol').html('').html(getMoreHyperContent(response[0].completed_sub_cat));
				$('#missed-3').find('.moreNumber').tooltip({
					tooltipClass : 'tmptooltipClass'
				});
				stopLoading();
				$currentMissedPanel = $('#missed-1');
				$currentMissedPanel.addClass('hideBlock');
				$('#missedArticlesTabs').tabs('option','active','0');
				if(Number(response[0].pending_per||'') >0 ){
					//fetchMissedArticlesReportWithoutFilters();
					resObjCommon = response[0].pending_sub_cat;
					pendingTabShow(response[0].pending_sub_cat);
				}
				$currentPanel.removeClass('hideBlock');
			} 
	  }).fail(function() {
		  stopLoading();
	  }).always(function() {
		  
	  });		
}
function callGetSTMissedArticleSummaryServiceUnique(stoktakeId){
	var reqParam = {
			"iv_st_id"	: stoktakeId,
			"iv_st_art_sts":"",
			"iv_userid":"",
			 "iv_dept":"",
			 "iv_field":"",
			"iv_criteria":"",
			"iv_value":"",
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
			};
	console.log(getSTMissedArticleSummaryUrl + ' ' + JSON.stringify(reqParam));	
	$.ajax({
	    type: "POST",
	    url: getSTMissedArticleSummaryUrl,
	    data: JSON.stringify(reqParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));	
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){				
				$("#missedArticleInProgressCount").html("Subcategory Being Counted: "+response[0].inprogress_cnt+" (approx.)");
				$('#missed-2').find('.subCatCol').html('').html(getMoreHyperContent(response[0].inprogress_sub_cat));
				$('#missed-2').find('.moreNumber').tooltip({
					tooltipClass : 'tmptooltipClass'
				});
				stopLoading();
			} 
	  }).fail(function() {
		  stopLoading();
	  }).always(function() {
		  
	  });		
}

function decimalOrwholeFormatter(data){
	if(data!=undefined && data!=null && data!='' && !isNaN(data)){
		data = Number(data);
		data = data%1 == 0 ? data.toFixed(0) : data.toFixed(2);
	}
	return data;
}
/**
 * To populate the percentage for the pending,inprogress,completed variance report
 * @param stoktakeId
 */
function callGetSTVarianceSummaryService(stoktakeId){
	var reqParam = {
			"iv_stocktake_id"	: stoktakeId,
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
			};
	
	console.log(reportSTVarianceSummaryUrl + ' ' + JSON.stringify(reqParam));	
	$.ajax({
	    type: "POST",
	    url: reportSTVarianceSummaryUrl,
	    data: JSON.stringify(reqParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));	
		  	getVarianceSmryResponse = response;
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){
				countedByStUser = (response[0].cntd_by_st_usr||'N') == 'Y';
				if(response[0].msg_type == 'E'){
					$('#varianceReportTabs').addClass('hideBlock');
					if( response[0].msg != ''){
						$.fn.showCustomMsg([response[0].msg],error);
					}else{
						$.fn.showCustomMsg([response[0].msg],error);
					}
				}else{
					nullVariance = false;
					$('#varianceReportTabs').removeClass('hideBlock');
					var area = $('#mainTabs-3');
					area.find("#varaincePendingLabel").html(decimalOrwholeFormatter(response[0].pending_PER)+ "% Pending").attr('perc',decimalOrwholeFormatter(response[0].pending_PER));
					area.find("#varianceInProgressLabel").html(decimalOrwholeFormatter(response[0].inprogress_per)+ "% In-progress").attr('perc',decimalOrwholeFormatter(response[0].inprogress_per));
					area.find("#varianceCompletedLabel").html(decimalOrwholeFormatter(response[0].completed_per)+ "% Completed").attr('perc',decimalOrwholeFormatter(response[0].completed_per));
					if(msdCompFlag == 'Y' && glSTStatus == "OPEN" && response[0].completed_per == 100){ // Defect 5248
						$("#finaliseStocktake").removeClass("hideBlock");
					}else{
						$("#finaliseStocktake").addClass("hideBlock");
					}
					area.find("#variancePendingCount").html("Pending Review - Total Value($): "+response[0].pending_cnt);
					area.find("#varianceInProgressCount").html("Articles Being Counted: "+response[0].inprogress_cnt+" (approx.)");
					area.find("#varianceCompletedCount").html("Sub-categories Completed: "+response[0].completed_cnt);

					area.find('#review-1').find('.summaryDeptStr').html(getEmptyIfNull(response[0].pend_dept_name));
					area.find('#review-1').find('#summaryDeptSec').html(getEmptyIfNull(response[0].pend_sub_cat_name_list));
					area.find('#review-1').find('.deptCol').html(getMoreHyperContent(getEmptyIfNull(response[0].pend_dept_name)));
					area.find('#review-1').find('.subCatCol').html(getMoreHyperContent(getEmptyIfNull(response[0].pend_sub_cat_name_list)));
					area.find('#review-2').find('.deptCol').html(getMoreHyperContent(getEmptyIfNull(response[0].ip_dept_name)));
					area.find('#review-2').find('.subCatCol').html(getMoreHyperContent(getEmptyIfNull(response[0].ip_sub_cat_name_list)));
					area.find('#review-3').find('.deptCol').html(getMoreHyperContent(getEmptyIfNull(response[0].comp_dept_name)));
					area.find('#review-3').find('.subCatCol').html(getMoreHyperContent(getEmptyIfNull(response[0].comp_sub_cat_name_list)));

					area.find('.moreNumber').tooltip({
						tooltipClass : 'tmptooltipClass'
					});
					stopLoading();
					$currentVariancePanel = $('#review-1');
					$currentVariancePanel.addClass('hideBlock');
					$('#varianceReportTabs').tabs('option','active','0');
					if(Number(response[0].pending_PER||'') >0 ){
						callReportSTVarianceService(getVarianceReportParam("PENDING"));
					}
					$currentPanel.removeClass('hideBlock');
				}
			}else{
				nullVariance = true;
				$currentPanel.removeClass('hideBlock');
				$('#varianceReportTabs').removeClass('hideBlock');
				$currentVariancePanel = $('#review-1');
				$currentVariancePanel.addClass('hideBlock');
				$('#varianceReportTabs').tabs('option','active','0');
				stopLoading();
			} 
	  }).fail(function() {	
		  stopLoading();
	  }).always(function() {
		  
	  });		
}
/**
 * To populate the percentage for the pending,inprogresss,completed variance  report
 * @param stoktakeId
 */
function callGetVarianceReportSummaryService(stoktakeId){
	var reqParam = {
			"iv_st_id"	: stoktakeId,
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
			};
	
	console.log(getSTMissedArticleSummaryUrl + ' ' + JSON.stringify(reqParam));	
	$.ajax({
	    type: "POST",
	    url: getSTMissedArticleSummaryUrl,
	    data: JSON.stringify(reqParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));	
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined ){				
				$("#varaincePendingLabel").html(decimalOrwholeFormatter(response[0].pending_per)+ "% Pending");
				$("#varianceInProgressLabel").html(decimalOrwholeFormatter(response[0].inprogress_per)+ "% In-progress");
				$("#varianceCompletedLabel").html(decimalOrwholeFormatter(response[0].completed_per)+ "% Completed");
				
				$("#variancePendingLabel").html("Pending Review - Total Value($): "+response[0].pending_cnt);
				$("#varianceInProgressCount").html("Articles Being Counted "+response[0].inprogress_cnt+" (approx.)");
				$("#varianceCompletedCount").html("Articles Counted "+response[0].completed_cnt);
				
			} 
	  }).fail(function() {		  
	  }).always(function() {
		  stopLoading();
	  });		
}
function bindDropDownClick(divId,labelId){
	if(labelId=='articleCountDeptDrpDwnLabel' && isNationalStocktake){
		$("#"+labelId).unbind('click');
		return;
	}
	$("#"+labelId).unbind('click');
	$("#"+labelId).click(function(e){ 
	//$('body').on('click', "#"+labelId, function() {
		e.stopPropagation();
		if( $('#'+divId).hasClass('active')){
			$("#"+divId).removeClass('active');
		} else {
			$(".selectDropdown").removeClass('active');//to hide all open drop dwon..only one drop down to be open at a time
			$("#"+divId).addClass('active');
		}
	});
}
function populateFiltersForArticleCount(){	
	populateUserDropDown("articleCountUsrDrpDwnUl","articleCountUsrDrpDwnDone","articleCountUsrDrpDwnCancel",
			"articleCountUsrDrpDwnDiv","articleCountallUsrChkBox","articleCountUsrDrpDwnLabel");
	//"SC-526/12014"
	populateAisleDropDownCntRpt("articleCountAisleDrpDwnUl","articleCountAisleDrpDwnDone","articleCountAisleDrpDwnCancel",
			"articleCountAisleDrpDwnDiv","articleCountallAisleChkBox","articleCountAisleDrpDwnLabel",$("#baseBaysHId"));
	//populateLocationDropDownCntRpt("articleCountLocDrpDwnUl","articleCountLocDrpDwnDone","articleCountLocDrpDwnCancel",
			//"articleCountLocDrpDwnDiv","articleCountallLocChkBox","articleCountLocDrpDwnLabel",$("#articleCountLocHierarchyId"));
	populateDeptDropDown("articleCountDeptDrpDwnUl","articleCountDeptDrpDwnDone","articleCountDeptDrpDwnCancel",
			"articleCountDeptDrpDwnDiv","articleCountallDeptChkBox","articleCountDeptDrpDwnLabel");
	
}
function populateFiltersForMissedArticles(){	
	populateAisleDropDown("missedArticlesAisleDrpDwnUl","missedArticlesAisleDrpDwnDone","missedArticlesAisleDrpDwnCancel",
			"missedArticlesAisleDrpDwnDiv","missedArticlesallAisleChkBox","missedArticlesAisleDrpDwnLabel",$("#missedArticleHId"));
	populateDeptDropDown("missedArticlesDeptDrpDwnUl","missedArticlesDeptDrpDwnDone","missedArticlesDeptDrpDwnCancel",
			"missedArticlesDeptDrpDwnDiv","missedArticlesallDeptChkBox","missedArticlesDeptDrpDwnLabel");
}
function populateFiltersForVarianceReport(){	
	populateDeptDropDown("varianceReportDeptDrpDwnUl","varianceReportDeptDrpDwnDone","varianceReportDeptDrpDwnCancel",
			"varianceReportDeptDrpDwnDiv","varianceReportallDeptChkBox","varianceReportDeptDrpDwnLabel");
}
function populateFiltersForUserPerformanceReport(){	
	populateUserDropDown("userPerfUsrDrpDwnUl","userPerfUsrDrpDwnDone","userPerfUsrDrpDwnCancel",
			"userPerfUsrDrpDwnDiv","userPerfallUsrChkBox","userPerfUsrDrpDwnLabel");
	populateAisleDropDown("userPerfAisleDrpDwnUl","userPerfAisleDrpDwnDone","userPerfAisleDrpDwnCancel",
			"userPerfAisleDrpDwnDiv","userPerfallAisleChkBox","userPerfAisleDrpDwnLabel",$("#userPerfAisleHId"));
	populateLocationDropDown("userPerfLocDrpDwnUl","userPerfLocDrpDwnDone","userPerfLocDrpDwnCancel",
			"userPerfLocDrpDwnDiv","userPerfallLocChkBox","userPerfLocDrpDwnLabel",$("#userPerfLocHId"));
}
//User Details Drop Down -beings-----------------------------------------------------------------
/**
 * Populates value in User drop down
 */
function populateUserDropDown(ulId,doneButtonId,cancelButtonId,dropDownDivId,allUserChckBoxId,userDropDownLabel) {
	$('#'+ulId+' .hierDrp').html('');//empty contents
	
	var param = {
			"iv_st_id":$("#reportDetailsStockTakeId").html()
	};
	
	console.log(getUserDetailsUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getUserDetailsUrl,
				data : JSON.stringify(param),
				success : function(response) {
					responseUserDropDown = response;
					formUserDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allUserChckBoxId,userDropDownLabel);
				},
				error : function(response) {
				},
			});
	
	

}
function formUserDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allUserChckBoxId,userDropDownLabel){
	var temList = responseUserDropDown;
	var content = '';
	content += '<li><input type="checkbox" id="'+allUserChckBoxId+'" name="articleCountallUsrChkBox">'
			     +'<label class="dropdownLabel" for="'+allUserChckBoxId+'">All Users</label></li>';
	if (temList.length > 0) {
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input  class="usersDrpDwnChkBx" type="checkbox" '
					+ 'value="'
					+ temList[i].usr_id
					+ '" id="'
					+ temList[i].usr_id+'_'+ulId
					+ '" name="'+temList[i].usr_nm+'">'
					+ '<label class="dropdownLabel" for="'+temList[i].usr_id+'_'+ulId+'">'
					+ temList[i].usr_nm + '</label></li>';							
		}
		$('#'+ulId+' .hierDrp').append(content);
		if($('#'+ulId).find('#'+doneButtonId).length == 0){
			$('#'+ulId).append('<li class="selectDropdownActions">'
					+'<label id="'+doneButtonId+'" class="actionBtn"><a>Done</a></label>'
					+'<label id="'+cancelButtonId+'" class="secondaryActionBtn"><a>Cancel</a></label></li>');	
		}						
		$("#"+doneButtonId).on( "click", function() {//DOne btn inside drop down
			$("#"+dropDownDivId).removeClass('active');
		});
		$("#"+cancelButtonId).on("click", function(e) {//cancel button inside dropdown
			e.stopPropagation();
			//$("#"+dropDownDivId).removeClass('active');
			$("#"+allUserChckBoxId).prop("checked",true);//oN CLICK OF cancel rever to default selection..
			//$("#"+allUserChckBoxId).trigger('click');
			$('#'+ulId).find('input[type="checkbox"]').each(function(e){
				$(this).prop("checked",true);
			});
			$("#"+dropDownDivId).removeClass('active');
			$("#"+allUserChckBoxId).focus();
			onChangeUserDropDown(ulId,allUserChckBoxId,userDropDownLabel);	
		});
		bindAfterUserDrpDwnReady(ulId,allUserChckBoxId,userDropDownLabel);
		bindAllUserCheckBox(ulId,allUserChckBoxId,userDropDownLabel);
		if(filterApplyClicked){
			if($("#"+userDropDownLabel).html() == "All Users"){//based on label trigger click event to avoid the last changes overriddent
				$("#"+allUserChckBoxId).prop('checked',false);
				$("#"+allUserChckBoxId).trigger('click');
			}else{
				if(reporttabIndex == 0 && !$.isEmptyObject(globalRequestParam)){//base count
					var slectedIdsArray = (globalRequestParam !=undefined && globalRequestParam.iv_userid !=undefined && globalRequestParam.iv_userid !='') ? globalRequestParam.iv_userid.split(",") : '';
					if(slectedIdsArray.length > 0){
						$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
							if(jQuery.inArray($(this).attr('value'), slectedIdsArray) != -1){
								$(this).prop("checked",true);
							}
						});
					}									
				}
			}
		}else{//if filter apply not clicked can be reset to default selections
			//"SC-526/12014"
			if(userDropDownLabel == 'articleCountUsrDrpDwnLabel'){
				$("#"+allUserChckBoxId).prop('checked',true);
			}else{
				$("#"+allUserChckBoxId).prop('checked',false);
			}
			$("#"+allUserChckBoxId).trigger('click');
		}
		//"SC-526/12014"
		if(userDropDownLabel == 'articleCountUsrDrpDwnLabel'){
			bindCntRtpUsr();	
		}
	}
}
function bindAfterUserDrpDwnReady(ulId,allUserChckBoxId,userDropDownLabel)
{
	$('#'+ulId).find("li input[type=checkbox]").change(function(e) {
		e.stopPropagation();
		if($(this).attr('id') != allUserChckBoxId){
			onChangeUserDropDown(ulId,allUserChckBoxId,userDropDownLabel);				
		}	
	});		
	$('#'+ulId).find("li input[type=checkbox]").click(function(e) {
		e.stopPropagation();
	});
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeUserDropDown(ulId,allUserChckBoxId,userDropDownLabel){
	if($('#'+ulId+' .usersDrpDwnChkBx:checked').length == $('#'+ulId+' .usersDrpDwnChkBx').length){
		$("#"+allUserChckBoxId).prop("checked",true);
		$("#"+userDropDownLabel).html('All Users');//User drop down value displayed
	}else if($('#'+ulId+' .usersDrpDwnChkBx:checked').length == 0){
		$("#"+userDropDownLabel).html('Select users');//User drop down value displayed
		$("#"+allUserChckBoxId).prop("checked",false);
	}else if($('#'+ulId+' .usersDrpDwnChkBx:checked').length == 1){
		$("#"+userDropDownLabel).html($('#'+ulId+' .usersDrpDwnChkBx:checked').parent().find('label').html());
		if($('#'+ulId+' .usersDrpDwnChkBx').length != 1){//means if total length is not one and checked =1
			$("#"+allUserChckBoxId).prop("checked",false);
		}
	}else{
		$("#"+allUserChckBoxId).prop("checked",false);
		$("#"+userDropDownLabel).html('Multiple users');//User drop down value displayed
	}		
}
/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function bindAllUserCheckBox(ulId,allUserChckBoxId,userDropDownLabel){
	//Registers dept dropdown's select 'All departments' event
	$("#"+allUserChckBoxId).click(function(){
		if($("#"+allUserChckBoxId).is(':checked')){//Select all
			$("#"+userDropDownLabel).html('All Users');//Department drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});				
			
		}else{ //unselect all
			$("#"+userDropDownLabel).html('Select users');//Department drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});			
		}
	});
}
//User Details Drop Down -ends***********************************************************************
// aisle hierarchy functions - beings----------------------------------------------------------------------
/**
 * Populates value in aisle drop down
 */
function populateAisleDropDown(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,hierArea) {
	$('#'+ulId+' .hierDrp').html('');//empty contents
	
	var param = {
	};
	if(responseAisleDropDown == undefined || responseAisleDropDown == ''){
		console.log(getAisleDetailsUrl + ' ' + JSON.stringify(param));
		$
				.ajax({
					type : "POST",
					url : getAisleDetailsUrl,
					data : JSON.stringify(param),
					success : function(response) {
						responseAisleDropDown = response;
						formAisleDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
						populateAisle(hierArea);
					},
					error : function(response) {
					},
				});
	}else{
		formAisleDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
		populateAisle(hierArea);
	}
	

}
//"SC-526/12014"
function populateAisleDropDownCntRpt(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,hierArea) {
	$('#'+ulId+' .hierDrp').html('');//empty contents
	
	var param = {
	};
	if(responseAisleDropDownCntRpt == undefined || responseAisleDropDownCntRpt == ''){
		var param = {"iv_st_id":stockTakeID,"iv_plano_flg":""};
		console.log(getSTCoutedLocation+ '  '+ JSON.stringify(param));
		$.ajax({
			type: "POST",
			url: getSTCoutedLocation,
			data: JSON.stringify(param),
			beforeSend: function() {
				  //startLoading();
			  }
		}).done(function(response) {
		  responseAisleDropDownCntRpt = [];
		  responseLocationDropDownCntRpt = [];
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined){
				for(var i=0;i<response.length;i++){
					if((response[i].plano_flg||'') == 'Y'){
						responseAisleDropDownCntRpt.push(response[i]);
					}else{
						responseLocationDropDownCntRpt.push(response[i]);
					}
				}
				if(responseAisleDropDownCntRpt.length>0){
					formAisleDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,true);
				}else{
					$("#articleCountAisleDrpDwnLabel").html('Select aisles');
				}
				if(responseLocationDropDownCntRpt.length>0){
					formLocationDropDownContent("articleCountLocDrpDwnUl","articleCountLocDrpDwnDone","articleCountLocDrpDwnCancel",
							"articleCountLocDrpDwnDiv","articleCountallLocChkBox","articleCountLocDrpDwnLabel",$("#articleCountLocHierarchyId"),true);
				}else{
					$("#articleCountLocDrpDwnLabel").html('Select locations');
				}
				bindCntRptFilterChange();
			} else if(response != undefined && response.length > 0 && response[0].ErrorMsg!=undefined){
				$.fn.showCustomMsg([frameMobiMsg(response[0])],error,'Base count Report');
			}	
		}).fail(function() {		  
		  		$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Base count Report');
		  		stopLoading();
		})
	}else{
		if(responseAisleDropDownCntRpt.length>0){
			formAisleDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,true);
			bindCntRptFilterChange();
		}else{
			$("#articleCountAisleDrpDwnLabel").html('Select aisles');
		}
		if(responseLocationDropDownCntRpt.length>0){
			formLocationDropDownContent("articleCountLocDrpDwnUl","articleCountLocDrpDwnDone","articleCountLocDrpDwnCancel",
					"articleCountLocDrpDwnDiv","articleCountallLocChkBox","articleCountLocDrpDwnLabel",$("#articleCountLocHierarchyId"),true);
			bindCntRptFilterChange();
		}else{
			$("#articleCountLocDrpDwnLabel").html('Select locations');
		}
		//populateAisle(hierArea);
	}
	

}
function formAisleDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,cntRpt){
	var temList = (cntRpt == undefined) ? responseAisleDropDown: responseAisleDropDownCntRpt;
	var content = '';
	//if(cntRpt == undefined){
		content += '<li><input type="checkbox" id="'+allChckBoxId+'" name="'+allChckBoxId+'">'
				 +'<label class="dropdownLabel" for="">All Aisles</label></li>';
	//}
	
	
	//Defect_12719 - Fix
	/*temList = temList.sort(function(a, b) {
		return (parseInt(a.aisle) > parseInt(b.aisle)) ? 1 : ((parseInt(a.aisle) < parseInt(b.aisle)) ? -1 : 0);
	});*/
	 
	if (temList.length > 0) {
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input  class="ailseDrpDwnChkBx" type="checkbox" '					
					+ 'value="'
					+ (temList[i].other_loc_fltr_val|| temList[i].aisle)
					+ '" id="'
					+ (temList[i].other_loc_fltr_val|| temList[i].aisle)
					+ '">'
					+ '<label class="dropdownLabel">'
					+ (temList[i].aisle||temList[i].location_name) 			
					+ '</label></li>';							
		}
		$('#'+ulId+' .hierDrp').append(content);
		if($('#'+ulId).find('#'+doneButtonId).length == 0){
			$('#'+ulId).append('<li class="selectDropdownActions">'
				+'<label id="'+doneButtonId+'" class="actionBtn"><a>Done</a></label>'
				+'<label id="'+cancelButtonId+'" class="secondaryActionBtn"><a>Cancel</a></label></li>');
		}
		$("#"+doneButtonId).on( "click", function() {//DOne btn inside drop down
			$("#"+dropDownDivId).removeClass('active');
		});
		$("#"+cancelButtonId).on("click", function(e) {//cancel button inside dropdown
			e.stopPropagation();
			//$("#"+dropDownDivId).removeClass('active');
			$("#"+allChckBoxId).prop("checked",false);//oN CLICK OF cancel rever to default selection..
			$('#'+ulId).find('input[type="checkbox"]').each(function(e){
				$(this).prop("checked",false);
			});
			onChangeAisleDropDown(ulId,allChckBoxId,dropDownLabel);
			if(ulId== "articleCountAisleDrpDwnUl"){
				$('#aisleLst').find('input[type="checkbox"]').each(function(e){
					$(this).prop("checked",false);
				});
				$('#aisleSelectAll').prop("checked",false);
				resetAislesHier($('#baseBaysHId'));
				$('#aisleLstCnt').text($('#aisleLst').find('input[type="checkbox"]:checked').length);
			}
			//$("#"+allChckBoxId).trigger('click');
			$("#"+allChckBoxId).focus();
			$("#"+dropDownDivId).removeClass('active');
			$('#aisleSelectAll').prop('checked',true).trigger('click');
		});
		bindAfterAisleDrpDwnReady(ulId,allChckBoxId,dropDownLabel);
		bindAllAisleCheckBox(ulId,allChckBoxId,dropDownLabel);
		bindSelectAllEvents($("#baseBaysHId"));
		
		if(filterApplyClicked){
			if($("#"+dropDownLabel).html() == "All Aisles"){//based on label trigger click event to avoid the last changes overriddent
					$("#"+allChckBoxId).prop("checked",false);
					$("#"+allChckBoxId).trigger('click');
			}else{
				if(reporttabIndex == 0 && !$.isEmptyObject(globalRequestParam)){//base count
					var slectedIdsArray = (globalRequestParam !=undefined && globalRequestParam.iv_aisle !=undefined && globalRequestParam.iv_aisle !='') ? globalRequestParam.iv_aisle.split(",") : '';
					if(slectedIdsArray.length > 0){
						$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
							if(jQuery.inArray($(this).attr('id'), slectedIdsArray) != -1){
								$(this).prop("checked",true);
							}
						});
					}									
				}
			}	
		}else{//if filter apply not clicked can be reset to default selections
			if(cntRpt){
				$("#"+allChckBoxId).prop("checked",false);
				$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
						$(this).prop("checked",false);
				});
				$("#"+dropDownLabel).html('Select Aisles');
			}else{
				$("#"+allChckBoxId).prop("checked",true);
				$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
						$(this).prop("checked",true);
				});
				$("#"+dropDownLabel).html('All Aisles');
			}		
		}	
		
	}
}

function resetAislesHier(area){
	area.find('[id^=bay-]').each(function(){
		$(this).remove();
	});
	area.find('[id^=side-]').each(function(){
		$(this).remove();
	});
	$('#sideSelectAll').prop("checked",false);
	$('#baySelectAll').prop("checked",false);
	$('#sidenoSelection').removeClass('hideBlock');
	$('#baynoSelection').removeClass('hideBlock');
}
function bindAfterAisleDrpDwnReady(ulId,allChckBoxId,dropDownLabel)
{
	$('#'+ulId).find("li input[type=checkbox]").change(function(e) {
		e.stopPropagation();
		if($(this).attr('id') != allChckBoxId){
			onChangeAisleDropDown(ulId,allChckBoxId,dropDownLabel);				
		}	
	});		
	
	$('#'+ulId).find("li input[type=checkbox]").click(function(e) {
		e.stopPropagation();
	});
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeAisleDropDown(ulId,allChckBoxId,dropDownLabel){
	var aisleArraySelect=[];	
	$('#'+ulId+' .ailseDrpDwnChkBx').each(function() 
	{    
	   if($(this).is(':checked'))
		   aisleArraySelect.push($(this).val());
	});
	$("#baseBaysHId").find('#baystDiv #aisleSelectAll').prop('checked',false);
	$("#baseBaysHId").find('#baystDiv .aisle').prop('checked',false);
	$("#baseBaysHId").find('#baystDiv .aisle').each(function() 
	{    
	   
	   if(jQuery.inArray($(this).val(),aisleArraySelect) == -1){
	   	$(this).prop('checked',false);	   	
	   }else{
	   	$(this).prop('checked',true);	
	   }
	   
	});
	if($("#baseBaysHId").find('#baystDiv .aisle:checked').length == $("#baseBaysHId").find('#baystDiv .aisle').length){
	$("#baseBaysHId").find("#"+'aisleSelectAll').prop("checked",true);	
	}
	if($('#'+ulId+' .ailseDrpDwnChkBx:checked').length == $('#'+ulId+' .ailseDrpDwnChkBx').length){
		$("#"+allChckBoxId).prop("checked",true);
		$("#"+dropDownLabel).html('All Aisles');//User drop down value displayed
	}else if($('#'+ulId+' .ailseDrpDwnChkBx:checked').length == 0){
		$("#"+dropDownLabel).html('Select aisles');//User drop down value displayed
	}else if($('#'+ulId+' .ailseDrpDwnChkBx:checked').length == 1){
		$("#"+dropDownLabel).html($('#'+ulId+' .ailseDrpDwnChkBx:checked').parent().find('label').html());
		if($('#'+ulId+' .ailseDrpDwnChkBx').length != 1){//means if total length is not one and checked =1
			$("#"+allChckBoxId).prop("checked",false);
		}
	}else{
		$("#"+allChckBoxId).prop("checked",false);
		$("#"+dropDownLabel).html('Multiple aisles');//User drop down value displayed
	}		
}
/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function bindAllAisleCheckBox(ulId,allChckBoxId,dropDownLabel){
	
	//Registers dept dropdown's select 'All departments' event
	$("#"+allChckBoxId).click(function(){
		if($("#"+allChckBoxId).is(':checked')){//Select all
			$("#"+dropDownLabel).html('All Aisles');//Department drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});				
			
		}else{ //unselect all
			$("#"+dropDownLabel).html('Select aisles');//Department drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});			
		}
		var aisleArraySelect=[];	
		$('#'+ulId+' .ailseDrpDwnChkBx').each(function() 
		{    
		   if($(this).is(':checked'))
			   aisleArraySelect.push($(this).val());
		});
		$("#baseBaysHId").find('#baystDiv #aisleSelectAll').prop('checked',false);
		$("#baseBaysHId").find('#baystDiv .aisle').prop('checked',false);
		$("#baseBaysHId").find('#baystDiv .aisle').each(function() 
		{    
		   
		   if(jQuery.inArray($(this).val(),aisleArraySelect) == -1){
		   	$(this).prop('checked',false);	   	
		   }else{
		   	$(this).prop('checked',true);	
		   }
		   
		});
		if($("#baseBaysHId").find('#baystDiv .aisle:checked').length == $("#baseBaysHId").find('#baystDiv .aisle').length){
		$("#baseBaysHId").find("#"+'aisleSelectAll').prop("checked",true);	
		}
	});
	
}
//Aisle drop down ends **************************************************************************************
//Location drop down begins --------------------------------------------------------------------------------
/**
 * Populates value in aisle drop down
 */
function populateLocationDropDown(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,hierArea) {
	$('#'+ulId+' .hierDrp').html('');//empty contents
	
	var param = {
			"iv_session_id":""
	};
	if(responseLocationDropDown == undefined || responseLocationDropDown == ''){
		console.log(getSTLocationsUrl + ' ' + JSON.stringify(param));
		$
				.ajax({
					type : "POST",
					url : getSTLocationsUrl,
					data : JSON.stringify(param),
					success : function(response) {
						responseLocationDropDown = response;
						formLocationDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
						populateLocations(hierArea);
					},
					error : function(response) {
					},
				});
	}else{
		formLocationDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
		populateLocations(hierArea);
	}
}

function sortAlphaNum(a, b) {
	var AInt = parseInt(a, 10);
	var BInt = parseInt(b, 10);
	if (isNaN(AInt) && isNaN(BInt)) {
		var aA = a.replace(reA, "");
		var bA = b.replace(reA, "");
		if (aA === bA) {
			var aN = parseInt(a.replace(reN, ""), 10);
			var bN = parseInt(b.replace(reN, ""), 10);
			return aN === bN ? 0 : aN > bN ? 1 : -1;
		} else {
			return aA > bA ? 1 : -1;
		}
	} else if (isNaN(AInt)) {
		return 1;
	} else if (isNaN(BInt)) {
		return -1;
	} else {
		return AInt > BInt ? 1 : -1;
	}
}
//"SC-526/12014"
function formLocationDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel,cntRpt){
	var temList = (cntRpt == undefined) ? responseLocationDropDown :responseLocationDropDownCntRpt;
	
	if(cntRpt == undefined){
		temList = temList.sort(function(a, b) {
			 return sortAlphaNum(a.st_location_name, b.st_location_name);
			//return (a.st_location_name > b.st_location_name) ? 1 : ((a.st_location_name < b.st_location_name) ? -1 : 0);
		});
	}
	var content = '';
	//if(cntRpt == undefined){
		content += '<li><input type="checkbox" id="'+allChckBoxId+'" name="'+allChckBoxId+'">'
					 +'<label class="dropdownLabel" for="">All Locations</label></li>';
	//}
	if (temList.length > 0) {
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input  class="locDrpDwnChkBx" type="checkbox" '
					+ 'value="'
					+ (temList[i].plano_loc_fltr_val|| temList[i].st_location_id)
					+ '" id="'
					+ (temList[i].plano_loc_fltr_val|| temList[i].st_location_id)
					+ '">'
					+ '<label class="dropdownLabel">'
					+ (temList[i].location_name||temList[i].st_location_name) + '</label></li>';						
		}
		$('#'+ulId+' .hierDrp').html(content);
		if($('#'+ulId).find('#'+doneButtonId).length == 0){
			$('#'+ulId).append('<li class="selectDropdownActions">'
				+'<label id="'+doneButtonId+'" class="actionBtn"><a>Done</a></label>'
				+'<label id="'+cancelButtonId+'" class="secondaryActionBtn"><a>Cancel</a></label></li>');
		}
		$("#"+doneButtonId).on( "click", function() {//DOne btn inside drop down
			$("#"+dropDownDivId).removeClass('active');
		});
		$("#"+cancelButtonId).on("click", function(e) {//cancel button inside dropdown
			e.stopPropagation();
			//$("#"+dropDownDivId).removeClass('active');
			$("#"+allChckBoxId).prop("checked",true);//oN CLICK OF cancel rever to default selection..
			//$("#"+allChckBoxId).trigger('click');
			$('#'+ulId).find('input[type="checkbox"]').each(function(e){
				$(this).prop("checked",true);
			});
			onChangeLocationDropDown(ulId,allChckBoxId,dropDownLabel);
			if(ulId== "articleCountLocDrpDwnUl"){
				$('.locLst').find('input[type="checkbox"]').each(function(e){
					$(this).prop("checked",true);
				});
				$('.locSelectAll').prop("checked",true);
				$('.locLstCnt').text($('.locLst').find('input[type="checkbox"]:checked').length);
			}
			$("#"+dropDownDivId).removeClass('active');
			$("#"+allChckBoxId).focus();
			$('.locSelectAll').prop('checked',true).trigger('click').trigger('click');
		});
		bindAfterLocationDrpDwnReady(ulId,allChckBoxId,dropDownLabel);
		bindAllLocationCheckBox(ulId,allChckBoxId,dropDownLabel);
		
		if(filterApplyClicked){
			if($("#"+dropDownLabel).html() == "All Locations"){//based on label trigger click event to avoid the last changes overriddent
				$("#"+allChckBoxId).prop("checked",false);
				$("#"+allChckBoxId).trigger('click');
			} else{
				if(reporttabIndex == 0 && !$.isEmptyObject(globalRequestParam)){//base count
					var slectedIdsArray = (globalRequestParam !=undefined && globalRequestParam.iv_loc_id !=undefined && globalRequestParam.iv_loc_id !='') ? globalRequestParam.iv_loc_id.split(",") : '';
					if(slectedIdsArray.length > 0){
						$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
							if(jQuery.inArray($(this).attr('id'), slectedIdsArray) != -1){
								$(this).prop("checked",true);
							}
						});
					}									
				}
			}
		}else{//if filter apply not clicked can be reset to default selections
			if(dropDownLabel == 'articleCountLocDrpDwnLabel'){
				$("#"+allChckBoxId).prop("checked",true);
			}else{
				$("#"+allChckBoxId).prop("checked",false);
			}
			$("#"+allChckBoxId).trigger('click');
		}	
		
	}
}
function bindAfterLocationDrpDwnReady(ulId,allChckBoxId,dropDownLabel)
{
	$('#'+ulId).find("li input[type=checkbox]").change(function(e) {
		e.stopPropagation();
		if($(this).attr('id') != allChckBoxId){
			onChangeLocationDropDown(ulId,allChckBoxId,dropDownLabel);				
		}	
	});		
	
	$('#'+ulId).find("li input[type=checkbox]").click(function(e) {
		e.stopPropagation();
	});
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeLocationDropDown(ulId,allChckBoxId,dropDownLabel){
	if($('#'+ulId+' .locDrpDwnChkBx:checked').length == $('#'+ulId+' .locDrpDwnChkBx').length){
		$("#"+allChckBoxId).prop("checked",true);
		$("#"+dropDownLabel).html('All Locations');// drop down value displayed
	}else if($('#'+ulId+' .locDrpDwnChkBx:checked').length == 0){
		$("#"+dropDownLabel).html('Select locations');// drop down value displayed
	}else if($('#'+ulId+' .locDrpDwnChkBx:checked').length == 1){
		$("#"+dropDownLabel).html($('#'+ulId+' .locDrpDwnChkBx:checked').parent().find('label').html());
		if($('#'+ulId+' .locDrpDwnChkBx').length != 1){//means if total length is not one and checked =1
			$("#"+allChckBoxId).prop("checked",false);
		}
	}else{
		$("#"+allChckBoxId).prop("checked",false);
		$("#"+dropDownLabel).html('Multiple locations');// drop down value displayed
	}		
}
/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function bindAllLocationCheckBox(ulId,allChckBoxId,dropDownLabel){
	//Registers dept dropdown's select 'All departments' event
	$("#"+allChckBoxId).click(function(){
		if($("#"+allChckBoxId).is(':checked')){//Select all
			$("#"+dropDownLabel).html('All Locations');// drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});				
			
		}else{ //unselect all
			$("#"+dropDownLabel).html('Select locations');// drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});			
		}
	});
}
//Location drop down ends **************************************************************************************
//Dept drop down begins --------------------------------------------------------------------------------
/**
 * Populates value in aisle drop down
 */
function populateDeptDropDown(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel) {
	$('#'+ulId+' .hierDrp').html('');//empty contents	
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_platform" : "B",
		"iv_session_id" : "100"
	};
	if(responseDeptDropDown == undefined || responseDeptDropDown == ''){
		console.log(gethierarchyDetailsST + ' ' + JSON.stringify(param));
		$
				.ajax({
					type : "POST",
					url : gethierarchyDetailsST,
					data : JSON.stringify(param),
					success : function(response) {
						responseDeptDropDown = response;
						formDeptDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
						if(ulId == "createSTDeptDrpDwnUl"){//once dept dropdown populated,dept hierarchy should be populated.
							populateDepartment($("#createSTArticleHierarchyId"),"checkbox",false,true);
						}else if(ulId == "editSTDeptDrpDwnUl"){
							setDefaultDepDropDwnValuesForEditST();	
							populateDepartment($("#editSTArticleHierarchyId"),"checkbox", true, false);
						}
					},
					error : function(response) {
					},
				});
	}else{
		formDeptDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel);
		if(ulId == "createSTDeptDrpDwnUl"){//once dept dropdown populated,dept hierarchy should be populated.
			populateDepartment($("#createSTArticleHierarchyId"),"checkbox",false,true);
		}
		else if(ulId == "editSTDeptDrpDwnUl"){
			setDefaultDepDropDwnValuesForEditST();	
			populateDepartment($("#editSTArticleHierarchyId"),"checkbox", true, false);
		}
	}
}
function formDeptDropDownContent(ulId,doneButtonId,cancelButtonId,dropDownDivId,allChckBoxId,dropDownLabel){
	var temList = responseDeptDropDown;
	var content = '';
	content += '<li><input type="checkbox" id="'+allChckBoxId+'" name="'+allChckBoxId+'">'
			     +'<label class="dropdownLabel" for="">All departments</label></li>';
	if (temList.length > 0) {
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input  class="deptDrpDwnChkBx" type="checkbox" '
					+ 'value="'
					+ temList[i].node_id
					+ '" id="'
					+ temList[i].node_id
					+ '">'
					+ '<label class="dropdownLabel">'
					+ temList[i].node_desc + '</label></li>';							
		}
		$('#'+ulId+' .hierDrp').append(content);
		$('#'+ulId+' .hierDrp').addClass("loaded");
		if($('#'+ulId).find('#'+doneButtonId).length == 0){
			$('#'+ulId).append('<div class="done-cancel-btn"><li class="selectDropdownActions">'
				+'<label id="'+doneButtonId+'" class="actionBtn"><a>Done</a></label>'
				+'<label id="'+cancelButtonId+'" class="secondaryActionBtn"><a>Cancel</a></label></li></div>').removeClass('muliple-checkbox');
		}
		$("#"+doneButtonId).on( "click", function() {//DOne btn inside drop down
			$("#"+dropDownDivId).removeClass('active');
		});
		$("#"+cancelButtonId).on("click", function(e) {//cancel button inside dropdown
			e.stopPropagation();
			if(cancelButtonId== "createSTDeptDrpDwnCancel"){//for create stock take page
				selectDefPrimaryDepts("createSTDeptDrpDwnUl",$("#tableAddAction"),"createSTDeptDrpDwnLabel");//to default primary depts
				onChangeDeptDropDown("createSTDeptDrpDwnUl","createSTallDeptChkBox","createSTDeptDrpDwnLabel",$("#tableAddAction"));
			}else if(cancelButtonId== "editSTDeptDrpDwnCancel"){
				setDefaultDepDropDwnValuesForEditST();
			}else if(cancelButtonId== "varianceReportDeptDrpDwnCancel"){
				handleDeptDropDownChangeForVariacneReport('');
				$("#"+allChckBoxId).prop("checked",false);
				$("#"+allChckBoxId).trigger('click');
			}else{
				//if filter apply not clicked can be reset to default selections
					$("#"+allChckBoxId).prop("checked",false);
					if(cancelButtonId = "articleCountDeptDrpDwnCancel"){
						resetHierarchyDept($('#baseCountArticleHierarchyId'),allChckBoxId);
					}else if(cancelButtonId = "missedArticlesDeptDrpDwnCancel"){
						resetHierarchyDept($('#missedArticleHierarchyId'),allChckBoxId);
					}else{
						$("#"+allChckBoxId).trigger('click');	
					}
			}
			$("#"+dropDownDivId).removeClass('active');
		});
		bindAfterDeptDrpDwnReady(ulId,allChckBoxId,dropDownLabel);
		bindAllDeptCheckBox(ulId,allChckBoxId,dropDownLabel);
		//def selection inside drip down
		if(ulId == "createSTDeptDrpDwnUl"){
			selectDefPrimaryDepts("createSTDeptDrpDwnUl",$("#tableAddAction"),"createSTDeptDrpDwnLabel");//to default primary depts
			onChangeDeptDropDown("createSTDeptDrpDwnUl","createSTallDeptChkBox","createSTDeptDrpDwnLabel",$("#tableAddAction"));
		}else{
			if(filterApplyClicked && (!isNationalStocktake || (isNationalStocktake && ulId == 'varianceReportDeptDrpDwnUl'))){
				if($("#"+dropDownLabel).html() == "All departments"){//based on label trigger click event to avoid the last changes overriddent
					if(isNationalStocktake &&  ulId != 'varianceReportDeptDrpDwnUl'){
						$("#"+allChckBoxId).prop('type','radio');
						$("#"+allChckBoxId).prop('disabled',true);
					}else{
						$("#"+allChckBoxId).prop("checked",false);
						$("#"+allChckBoxId).trigger('click');
					}
				}else{
					if((reporttabIndex == 0 || reporttabIndex == 1 || reporttabIndex ==2)&& globalRequestParam!=undefined && globalRequestParam!='' && !$.isEmptyObject(globalRequestParam)){//Group by and filter in same line changes
						var slectedIdsArray = '';
						if(reporttabIndex == 2 && varianceReportTabIndex == 0){
							slectedIdsArray = globalRequestParam.iv_dept.split(",");
						}else{
							slectedIdsArray = globalRequestParam.iv_dept == undefined ? globalRequestParam.iv_dept_id.split(",") :globalRequestParam.iv_dept.split(",");
						}
						
						if(slectedIdsArray.length > 0){
							$('#'+ulId+' .hierDrp').find('input[type="checkbox"]').each(function(){
								if(jQuery.inArray($(this).attr('id'), slectedIdsArray) != -1){
									$(this).prop("checked",true);
								}
							});
						}									
					}
				}	
			}else{
				if(isNationalStocktake && ulId != 'varianceReportDeptDrpDwnUl'){
					$("#"+allChckBoxId).prop('type','radio');
					$("#"+allChckBoxId).prop('disabled',true);
					$("#"+ulId).addClass('hideBlock');
					$("#articleCountDeptDrpDwnLabel").html('Select Department');
				}else{
					$("#"+allChckBoxId).prop("checked",false);
					$("#"+allChckBoxId).trigger('click');
					$("#"+ulId).removeClass('hideBlock');
				}
			}
		}
		//"SC-526/12014"
		bindCntRtpDept();
	}
}
function resetHierarchyDept(area,allChckBoxId){

	area.find( "input[name='departmentList']" ).each(function(){
		$(this).prop('checked', false);
	});
	area.find('.dropdown').find("input[type=checkbox]").each(function() {
		$(this).prop('checked', false);
	});
	area.find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
	area.find('.noSelectionCat,.noSelectionSub,.noSelectionSeg').removeClass('hideBlock');
	area.find('.catLstCnt,.sCatLstCnt,.segLstCnt').text('0');
	area.find('.sCatSelectAll,.catSelectAll,.segSelectAll').prop('checked',false);
	////"SC-526/12014"
	if((allChckBoxId=="missedArticlesallDeptChkBox") ){
		$("#"+allChckBoxId).trigger('click');		// trigger all dept
	}
setDeptCount(area);
}
function bindAfterDeptDrpDwnReady(depDropDownId,allDeptChkBoxId,deptdropdownLblId){
	if(isNationalStocktake && depDropDownId != 'varianceReportDeptDrpDwnUl'){
		articleHierArea.find('.deptlst :input').prop('type','radio');
	}
	$('#'+depDropDownId).find("li input[type=checkbox]").change(function(e) {
		e.stopPropagation();
		if($(this).attr('id') != allDeptChkBoxId){
			onChangeDeptDropDown(depDropDownId,allDeptChkBoxId,deptdropdownLblId,articleHierArea);	
			if($(this).is(':checked')){
				articleHierArea.find('.deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
			}else{
				articleHierArea.find('.deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
			}
		}
		
		if(stocktakePageType == 'CREATE_STOCKTAKE'){
			enableDisableExcludeArticles();
		}
	});		
	
	$('#'+depDropDownId).find("li input[type=checkbox]").click(function(e) {
		e.stopPropagation();
	});
}
function bindAfterArticleHierarchyReady(area,depDropDownId,allDeptChkBoxId,deptdropdownLblId){
	area.find('.deptlst').find("li input[type=checkbox]").change(function() {//To select or unselect dept dropdown
		if($(this).is(':checked')){
			$('#'+depDropDownId+' :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
		}else{
			$('#'+depDropDownId+' :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
		}				
		onChangeDeptDropDown(depDropDownId,allDeptChkBoxId,deptdropdownLblId,area);
	});	
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeDeptDropDown(deptDropDownId,allDeptChkBoxId,deptdropdownLblId,area){
	var fla = false;
	if($('#'+deptDropDownId+' .deptDrpDwnChkBx:checked').length == $('#'+deptDropDownId+' .deptDrpDwnChkBx').length){
		$("#"+allDeptChkBoxId).prop("checked",true);
		$("#"+deptdropdownLblId).html('All Departments');//Department drop down value displayed
		area.find(".deptSelectAll").prop('checked', true);
	}else if($('#'+deptDropDownId+' .deptDrpDwnChkBx:checked').length == 0){
		$("#"+deptdropdownLblId).html('Select Departments');//Department drop down value displayed
		//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
	}else if($('#'+deptDropDownId+' .deptDrpDwnChkBx:checked').length == 1){
		$("#"+deptdropdownLblId).html($('#'+deptDropDownId+' .deptDrpDwnChkBx:checked').parent().find('label').html());
		if($('#'+deptDropDownId+' .deptDrpDwnChkBx').length != 1){//means if total length is not one and checked =1
			$("#"+allDeptChkBoxId).prop("checked",false);
		}
		fla = true;
	}else{
		$("#"+allDeptChkBoxId).prop("checked",false);
		//articleHierArea.find(".deptSelectAll").prop('checked', false);
		$("#"+deptdropdownLblId).html('Multiple Departments');//Department drop down value displayed
	}	
	
	if(deptDropDownId == "varianceReportDeptDrpDwnUl"){
		handleDeptDropDownChangeForVariacneReport(fla ?  $('#'+deptDropDownId+' .deptDrpDwnChkBx:checked').val() :'');
	}
}
function handleDeptDropDownChangeForVariacneReport(selectedDeptID){
	if(selectedDeptID == "28"){//Front of store - def value = 20
		$("#value_gt").val('20');
		$("#om_gt").val('');
	}else if(selectedDeptID == "05"){//Groceries - def value = 50
		$("#value_gt").val('50');
		$("#om_gt").val('');
	}else if(selectedDeptID == "20"){//liquor- def value = 20
		$("#value_gt").val('20');
		$("#om_gt").val('');
	}else if(selectedDeptID == "10"){//Perishables - def OM = 1
		$("#om_gt").val('1');
		$("#value_gt").val('');
	}else{
		$("#value_gt").val('');
		$("#om_gt").val('');
	}
}

/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function bindAllDeptCheckBox(ulId,allChckBoxId,dropDownLabel){
	//Registers dept dropdown's select 'All departments' event
	$("#"+allChckBoxId).click(function(){		
		if(articleHierArea == undefined){
			articleHierArea = ulIdAreaMap[ulId];
		}
		if($("#"+allChckBoxId).is(':checked')){//Select all
			$("#"+dropDownLabel).html('All departments');// drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});	
			articleHierArea.find('.deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			articleHierArea.find(".deptSelectAll").prop('checked', true);
			
		}else{ //unselect all
			$("#"+dropDownLabel).html('Select departments');// drop down value displayed
			$('#'+ulId).find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});	
			
			articleHierArea.find('.deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			articleHierArea.find(".deptSelectAll").prop('checked', false);
		}
		if(allChckBoxId== "varianceReportallDeptChkBox"){
			handleDeptDropDownChangeForVariacneReport('');
		}
	});
}
//Dept drop down ends **************************************************************************************
//Aisle Hierarchy -begins --------------------------------------------------
function bindAisleHierarchyEvent(){
	$('.baseAisleH').click(function() {
		if ($(this).is(':checked')){
			$("#baseBaysHId").removeClass('hideBlock');
			bindSelectAllEvents($("#baseBaysHId"));
		}	
		else {
			$("#baseBaysHId").addClass('hideBlock');
		}	
	});
}
function bindAisleHierarchyEventForMissedArticles(){
	$('.missedArticleAisleH').click(function() {
		if ($(this).is(':checked')){
			$("#missedArticleHId").removeClass('hideBlock');
			bindSelectAllEvents($("#missedArticleHId"));
		}	
		else {
			$("#missedArticleHId").addClass('hideBlock');
		}	
	});
}

function bindAisleHierarchyEventForUserPerformanceReport(){
	$('#userPerfAisleH').click(function() {
		if ($(this).is(':checked')){
			$("#userPerfAisleHId").removeClass('hideBlock');
			bindSelectAllEvents($("#userPerfAisleHId"));
		}	
		else {
			$("#userPerfAisleHId").addClass('hideBlock');
		}	
	});
}
function bindSelectAllEvents(area){
	//Registers Aisle select all event
	area.find("#aisleSelectAll").click(function(event){
		if(area.find('#aisleSelectAll').is(':checked')){
			$("#articleCountAisleDrpDwnLabel").html('All Aisles');
			area.find( "input[name='aisleList']" ).each(function(){
				$(this).prop('checked', true);
			});
			$('#articleCountAisleDrpDwnUl').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
		}else{
			$("#articleCountAisleDrpDwnLabel").html('Select aisles');
			area.find( "input[name='aisleList']" ).each(function(){
				$(this).prop('checked', false);
			});
			$('#articleCountAisleDrpDwnUl').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			
			area.find('[id^=bay-]').each(function(){
				$(this).remove();
			});
			area.find('[id^=side-]').each(function(){
				$(this).remove();
			});
			
			area.find("#baynoSelection").removeClass("hideBlock");
			area.find("#baySelectAll").prop("checked",false);
			area.find("#baySelectAll").attr("disabled",true);
			area.find("#sidenoSelection").removeClass("hideBlock");
			area.find("#sideSelectAll").prop("checked",false);
			area.find("#sideSelectAll").attr("disabled",true);
		}
		
		area.find("#aisleLstCnt").text(area.find('input[name="aisleList"]:checked').length);
		setBayCount(area);
		//sideTotalSelected(area);
	});
	area.find("#sideSelectAll").click(function(event){
		if(area.find('#sideSelectAll').is(':checked')){
			area.find( "input[name='side']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			area.find( "input[name='side']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
				}
			});
		}
		setBayCount(area);
	});
	//Registers segment select all event
	area.find("#baySelectAll").click(function(event){
		if(area.find('#baySelectAll').is(':checked')){
			area.find( "input[name='bay']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			area.find( "input[name='bay']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
				}
			});
		}
		setBayCount(area);
	});
	
}	

/**
 * Populates values in article hierarchy area
 */
function populateAisle(area) {
	if(area.find('#aisleLst').find('input[type="checkbox"]').length == 0){//to avoid repopulaion..so that filters selected will retain
		var param = {
		};
		if(responseAisleDropDown == undefined || responseAisleDropDown == ''){
			console.log(getAisleDetailsUrl + ' ' + JSON.stringify(param));
			$
					.ajax({
						type : "POST",
						url : getAisleDetailsUrl,
						data : JSON.stringify(param),
						success : function(response) {
							responseAisleDropDown = response;
							formAisleHierContent(area);
						},
						error : function(response) {
						},
					});
		}else{
			formAisleHierContent(area);
		}
	}else{
		bindAisleSelectEvent(area);
	}
}
function formAisleHierContent(area){
	var temList = responseAisleDropDown;
	if (temList.length > 0) {
		var content = '';
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input class="aisle" type="checkbox" name="aisleList" '
				+ 'value="'
				+ temList[i].aisle
				+ '" id="'
				+ temList[i].aisle
				+ '">'
				+ '<label class="labelText aisleLbl">'
				+ temList[i].aisle + '</label></li>';
		}
		area.find('#aisleLst').html(content);
		//area.find("#aisleLstCnt").text("0");
		//area.find("#aisleSelectAll").prop('checked',true);
		bindAisleSelectEvent(area);
		area.find('#aisleLst').find('input[type="checkbox"]').each(function(){
			$(this).prop("checked",true);
		});
		area.find("#aisleLstCnt").text(area.find('#aisleLst').find('input[type="checkbox"]:checked').length);
	}
}
/**
 * Binds deparment select event
 */
function bindAisleSelectEvent(area) {
	area.find('.aisle')
	.on(
			'click',
			function() {
				var aisleCount = area.find("[name='aisleList']:checked").length;
				var aisleTotalCount = area.find("[name='aisleList']").length;
				if(aisleCount > 0){
					area.find("#aisleSelectAll").removeAttr("disabled");
				}
				area.find("#aisleLstCnt").text(aisleCount);//Length of Dept List
				var selectedValue = this.id.toString();
				if(aisleCount == aisleTotalCount){
					$("#articleCountAisleDrpDwnLabel").html('All Aisles');
				}else if(aisleCount == 1){
					$("#articleCountAisleDrpDwnLabel").html($('#articleCountAisleDrpDwnUl').find('#'+$(this).attr('id')).val());
				}else if(aisleCount == 0){
					$("#articleCountAisleDrpDwnLabel").html('Select aisles');
				}else{
					$("#articleCountAisleDrpDwnLabel").html('Multiple aisles');
				}
				if($(this).is(':checked')){
					$('#articleCountAisleDrpDwnUl').find('#'+$(this).attr('id')).prop('checked',true);
					//$("#articleCountAisleDrpDwnLabel").html('Select aisles');
					callAisleSideSelectService(area, selectedValue);
					area.find("#sidenoSelection").addClass('hideBlock');
					//area.find("#baynoSelection").addClass('hideBlock');							

				}else{
					$('#articleCountAisleDrpDwnUl').find('#'+$(this).attr('id')).prop('checked',false)
					area.find('#side-'+selectedValue+'').remove();
					area.find('[id^=bay-R-'+selectedValue+']').remove();
					area.find('[id^=bay-L-'+selectedValue+']').remove();
					area.find("#bay-"+selectedValue+" [aisleid='"+selectedValue+"']").prop("checked",false);
					area.find("#baynoSelection").removeClass('hideBlock');	
					area.find("#sidenoSelection").removeClass('hideBlock');	
					//area.find("#sideLst").addClass('hideBlock')
					setBayCount(area);
				}
				area.find(".baysDiv").addClass('hideBlock');
				area.find('.sideDiv').addClass('hideBlock');

				selUnSelTotAisle(area);
				setBayCount(area);
				/*					$('#deptlst').find("li input[type=checkbox]").change(function() {//To select or unselect dept dropdown
						if($(this).is(':checked')){
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
						}else{
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
						}
					});	*/			
			});

	area.find('.aisleLbl')
	.on(
			'click',
			function() {
				
				var $aisle = $(this).siblings('input[type="checkbox"]');

				if($aisle.prop('checked')){
					area.find('#bayDiv').find('.baysDiv').addClass('hideBlock');
					area.find('#sideDiv').find('.sideDiv').addClass('hideBlock');
					if(area.find('#sideDiv').find('#side-' + $aisle.val()).length != 0){
						area.find('#sideDiv').find('#side-' + $aisle.val()).removeClass('hideBlock');
					}else{
						callAisleSideSelectService(area, $aisle.attr('id'));
						
					}
					if(area.find('#bayDiv').find('#bay-' + $aisle.val()).length != 0){
						area.find('#bayDiv').find('#bay-' + $aisle.val()).removeClass('hideBlock');
						selUnSelTotBay(area, $aisle);

					}
					area.find("#sidenoSelection").addClass('hideBlock');
				}else{
					area.find('#bayDiv').find('.baysDiv').addClass('hideBlock');
					area.find('#sideDiv').find('.sideDiv').addClass('hideBlock');
					area.find("#sidenoSelection").removeClass('hideBlock');
					area.find("#baynoSelection").removeClass('hideBlock');
				}
				setBayCount(area);
				aisleClickSide(area,$aisle.attr('id'),'');
			});
	
}
function aisleClickSide(area,selectedAisle,side){
	area.find('.sideLbl')
	.on(
			'click',
			function() {

				var $aisle = $(this).siblings('input[type="checkbox"]');
				if(selectedAisle != $aisle.attr('aisleid') ){
					selectedAisle = $aisle.attr('aisleid');
				}
				var selectedSide = $aisle.attr('id');
				var selectedSidePerA = selectedSide+"-"+selectedAisle;
				if($aisle.prop('checked')){
					area.find('#bayDiv').find('.baysDiv').addClass('hideBlock');
					if(area.find('#bayDiv').find('#bay-' + selectedSidePerA).length != 0){
						area.find('#bayDiv').find('#bay-' + selectedSidePerA).removeClass('hideBlock');
						selUnSelTotBay(area, $aisle);

					}else{
						callAisleSelectService(area, selectedAisle,$aisle.attr('id'));
					}
					area.find("#baynoSelection").addClass('hideBlock');
				}else{
					area.find('#bayDiv').find('.baysDiv').addClass('hideBlock');
					area.find("#baynoSelection").removeClass('hideBlock');
					//area.find("#bayLst").addClass('hideBlock');
					
				}
				//sideTotalSelected(area);
				//bayTotalSelected(area);
				setBayCount(area);
			});
	area.find('.side').on('click',function() {
		var aisleCount = area.find("[name='side']:checked").length;
		if(aisleCount > 0){
			area.find("#sideSelectAll").removeAttr("disabled");
		}
		if(area.find("[name='side']:checked").length!=area.find("[name='side']").length){
			area.find("#sideSelectAll").prop('checked',false);
		}else{
			area.find("#sideSelectAll").prop('checked',true);
		}
		if(aisleCount==0){
			area.find("#sideSelectAll").prop('checked',false);
		}

		area.find("#sideLstCnt").text(aisleCount);//Length of Dept List
		var selectedValue = this.id.toString();

		if($(this).is(':checked')){
			callAisleSelectService(area,selectedAisle, selectedValue);
			area.find("#sidenoSelection").addClass('hideBlock');
			area.find("#baynoSelection").addClass('hideBlock');							

		}else{
			var selectedSideBay =$(this).attr('id')+"-"+$(this).attr('aisleid');
			area.find("#side-"+selectedValue+"[aisleid='"+selectedValue+"']").prop("checked",false);
			//area.find("[name='bay']:visible").prop("checked",false);
			area.find('[id^=bay-'+selectedSideBay+']').remove();
			area.find("#bay-"+selectedValue+" [aisleid='"+selectedValue+"']").prop("checked",false);//To unselect all checkboxes in bay when aisle is unselected.
			area.find("#baynoSelection").removeClass('hideBlock');	
			area.find("#sidenoSelection").removeClass('hideBlock');
			setBayCount(area);
			//bayTotalSelected(area);
		}
		area.find(".baysDiv").addClass('hideBlock');

		selUnSelTotAisle(area);
		//sideTotalSelected(area);
		//bayTotalSelected(area);
		setBayCount(area);
	});
}

/**
 * Invokes service on selection of aisle
 * @param selectedValue
 */
function callAisleSideSelectService(area, selectedValue){
	//area.find('#parentSideDiv').html('');
	area.find('.sideDiv').addClass('hideBlock')
	var no = selectedValue;
	var param = {
			"iv_aisle":no,
	};
	console.log('' + getAisleSideDetailsUrl + ' ' + JSON.stringify(param));
	$
	.ajax({
		type : "POST",
		url : getAisleSideDetailsUrl,
		data : JSON.stringify(param),
		success : function(response) {
			var itemList  = response;
			if(itemList != undefined ){
				area.find("#side-"+no).remove();
				var content = '';
				var headerName = area.find("#"+no).parent().find(".aisleLbl").html();
				content += '<div id="side-'+no+'" class="sideDiv"><ul id="sideLst">';
				content += '<li><label class="titleText aisleGet">'+headerName+'</label></li>';
				for ( var i = 0; i < itemList.length; i++) {
					content += '<li><input type="checkbox" name="side" id= "'+itemList[i].side+'" class="side" data-tt-id="'
							+ itemList[i].side
							+ '" aisleId="'
							+ no
							+ '" id="'
							+ itemList[i].side
							+ '" value="'
							+ itemList[i].side
							+ '"/><label class="sideLbl lastColumns">'
							+ itemList[i].side
							+ '<strong class="number hideBlock" Sidelbl-id="'+itemList[i].side+'"></strong></label></li>';
				}
				content += '</ul></div>';
				area.find('#parentSideDiv').append(content);
				area.find("#sideLstCnt").text(
						itemList.length);
				area.find("#sideLstTotal")
						.removeClass(
								'hideBlock');
				if(area.find('#parentSideDiv').length != 0){
					area.find("#sideSelectAll").removeAttr("disabled");
					area.find('#sideSelectAll').prop('checked',false);//By default should be select all
					area.find('#sideSelectAll').trigger('click');//By default should be select all							
				}
				 area.find(".side").unbind().click(function() {});
				 area.find(".sideLbl").unbind().click(function() {});
				 
				 setBayCount(area);
				// bayTotalSelected(area);
				bindBaySelectEvent(area);
				area.find(".titleText").find('strong').remove();//Removes the number next to titles
			}else {
				aisleSideVaiable = '';
			}
			aisleClickSide(area,no,'');
		}
	});
	
}
function callAisleSelectService(area,selectedAisle, selectedValue){
	
	var no = selectedAisle;
	var side =selectedValue;
	var param = {
			"iv_aisle":no,
			"iv_side":side,
			"iv_st_id":$("#reportDetailsStockTakeId").html()
	};
	console.log('get category' + getBayDetailsUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getBayDetailsUrl,
				data : JSON.stringify(param),
				success : function(response) {
					//console.log(JSON.stringify(response));	
					//var temList = response;
					var events = response;
					var temList = events.reduce(function(memo, e1){
					  var matches = memo.filter(function(e2){
					    return e1.bay == e2.bay && e1.bay == e2.bay
					  })
					  if (matches.length == 0)
					    memo.push(e1)
					    return memo;
					}, []);
				
					if (temList.length > 0) {
						var sideCol = side+"-"+no;
						area.find("#bay-"+sideCol).remove();//Removes the old Div
						var content = '';
						var headerName = area.find("#"+no).parent().find(".aisleLbl").html();
						content += '<div id="bay-'+sideCol+'" class="baysDiv"><ul id="bayLst">';
						content += '<li><label class="titleText">A'+headerName+' '+side+' </label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="bay" class="bay" data-tt-id="'
									+ temList[i].bay
									+ '" aisleId="'
									+ no
									+ '" id="'
									+ temList[i].bay
									+ '" value="'
									+ temList[i].bay
									+ '"/><label class="bayLbl lastColumns">'
									+ temList[i].bay
									+ '<strong class="number hideBlock" lbl-id="'+temList[i].bay+'"></strong></label></li>';
						}
						content += '</ul></div>';
						area.find('#parentBayDiv').append(content);
						area.find("#bayLstCnt").text(
								temList.length);
						area.find("#bayLstTotal")
								.removeClass(
										'hideBlock');
						if(area.find('#parentBayDiv').length != 0){
							area.find("#baySelectAll").removeAttr("disabled");
							area.find('#baySelectAll').prop('checked',false);//By default should be select all
							area.find('#baySelectAll').trigger('click');//By default should be select all							
						}
						 area.find(".bay").unbind().click(function() {});
						 area.find(".bayLbl").unbind().click(function() {});
						 
						setBayCount(area);
						//bayTotalSelected(area);
						bindBaySelectEvent(area);
						area.find(".titleText").find('strong').remove();//Removes the number next to titles
					}
				},
				error : function(response) {

				},
			});
	aisleClickSide(area,no,side);
}

/**
 * Sets total categories selected
 */
function setBayCount(area){
	var bayCount = area.find("[name='bay']:checked:visible").length;	
	var totSideSelected = area.find("[name='side']:checked:visible").length;
	area.find('#sideLstCnt').text(totSideSelected);
	area.find("#bayLstCnt").text(bayCount);  
	
	if(bayCount==0){
		area.find('#baySelectAll').prop('checked',false);
	}
	if(area.find("[name='bay']:checked:visible").length!=area.find("[name='bay']:visible").length){
		area.find('#baySelectAll').prop('checked',false);
	}else{
		area.find('#baySelectAll').prop('checked',true);
	} 
}

/**
 * Binds bay select event
 */
function bindBaySelectEvent(area) {	
	area.find('.bay').on('click',function() {
		selUnSelTotBay(area, $("#"+$(this).attr('aisleId')));
		setBayCount(area);
	});
}

/**
 * Invoked on click of select all side check box
 */
function selUnSelTotSide(area,$aisle){
	var totSide = area.find('#side-'+ $aisle.val()).find('input[type=checkbox]').length;
	var selSide = area.find('#side-'+ $aisle.val()).find('input[type=checkbox]:checked').length;
	if(totSide == selSide){
		$("#sideSelectAll").prop('checked',true);
	}else{
		$("#sideSelectAll").prop('checked',false);
		area.find("#sidenoSelection").removeClass('hideBlock');
	}
	$("[sidelbl-id=" + $aisle.val() + "]").html(selBay);//Number Inclusion
}

/**
 * Invoked on click of select all aisle check box
 */
function selUnSelTotAisle(area){
	var totDep = area.find('#aisleLst').find('input[type=checkbox]').length;
	var selDep = area.find('#aisleLst').find('input[type=checkbox]:checked').length;
	if(totDep == selDep){
		area.find("#aisleSelectAll").prop('checked',true);
	}else{
		area.find("#aisleSelectAll").prop('checked',false);
	}
}

/**
 * Invoked on click of select all aisle check box
 */
function selUnSelTotBay(area, $aisle){
	var totBay = area.find('#bay-' + $aisle.val()).find('input[type=checkbox]').length;
	var selBay = area.find('#bay-' + $aisle.val()).find('input[type=checkbox]:checked').length;
	if(totBay == selBay){
		$("#baySelectAll").prop('checked',true);
	}else{
		$("#baySelectAll").prop('checked',false);
		area.find("#baynoSelection").removeClass('hideBlock');
	}
	$("[lbl-id=" + $aisle.val() + "]").html(selBay);//Number Inclusion
}
//aisle hierarchy functions - ends*****************************************************************************************************
//Location  Hierarchy -begins --------------------------------------------------
function bindLocHierarchyEventForArticleCount(){
	$('#articleCountLocH').click(function() {
		if ($(this).is(':checked')){
			$("#articleCountLocHierarchyId").removeClass('hideBlock');
			bindSelectAllLocEvents($("#articleCountLocHierarchyId"));
		}	
		else {
			$("#articleCountLocHierarchyId").addClass('hideBlock');
		}	
	});
}
function bindLocHierarchyEventForUserPerformance(){
	$('#userPerfLocH').click(function() {
		if ($(this).is(':checked')){
			$("#userPerfLocHId").removeClass('hideBlock');
			bindSelectAllLocEvents($("#userPerfLocHId"));
		}	
		else {
			$("#userPerfLocHId").addClass('hideBlock');
		}	
	});
}
function bindSelectAllLocEvents(area){
	//Registers location select all event
	area.find(".locSelectAll").click(function(event){
		if(area.find('.locSelectAll').is(':checked')){
			area.find( "input[name='locList']" ).each(function(){
				$(this).prop('checked', true);
			});
			area.find('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
		}else{
			area.find( "input[name='locList']" ).each(function(){
				$(this).prop('checked', false);
			});
			area.find('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			
			area.find('[id^=subloc-]').each(function(){
				$(this).remove();
			});
			
			area.find(".sublocnoSelection").removeClass("hideBlock");
			area.find(".sublocSelectAll").prop("checked",false);
			area.find(".sublocSelectAll").attr("disabled",true);
		}
		
		area.find(".locLstCnt").text(area.find('input[name="locList"]:checked').length);
		setSublocCount(area);
	});
	
	//Registers sub-loc select all event
	area.find(".sublocSelectAll").click(function(event){
		if(area.find('.sublocSelectAll').is(':checked')){
			area.find( "input[name='subloc']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			area.find( "input[name='subloc']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
				}
			});
		}
		setSublocCount(area);
	});
}	

/**
 * Populates values in article hierarchy area
 */
function populateLocations(area) {
	if(area.find('.locLst').find('input[type="checkbox"]').length == 0){//to avoid repopulaion..so that filters selected will retain
		var param = {
				"iv_session_id":""
		};
		if(responseLocationDropDown == undefined || responseLocationDropDown == ''){
			console.log(getSTLocationsUrl + ' ' + JSON.stringify(param));
			$
					.ajax({
						type : "POST",
						url : getSTLocationsUrl,
						data : JSON.stringify(param),
						success : function(response) {
							responseLocationDropDown = response;
							formLocationsHierContent(area);
						},
						error : function(response) {
						},
					});
		}else{
			formLocationsHierContent(area);
		}
	}else{
		bindLocSelectEvent(area);
	}
	

}
function formLocationsHierContent(area){
	var temList = responseLocationDropDown;
	if (temList.length > 0) {
		var content = '';
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input class="loc" type="checkbox" checked name="locList" '
					+ 'value="'
					+ temList[i].st_location_id
					+ '" id="'
					+ temList[i].st_location_id
					+ '">'
					+ '<label class="labelText locLbl">'
					+ temList[i].st_location_name + '</label></li>';
		}
		area.find('.locLst').html(content);
		area.find(".locLstCnt").text(temList.length);
		area.find(".locSelectAll").prop('checked',true);
		bindLocSelectEvent(area);
	}
}

/**
 * Binds location select event
 */
function bindLocSelectEvent(area) {
	area.find('.loc')
			.on(
					'click',
					function() {
						var count = area.find("[name='locList']:checked").length;
						if(count > 0){
							 area.find(".locSelectAll").removeAttr("disabled");
						}
						area.find(".locLstCnt").text(count);//Length of loc List
						var selectedValue = this.id.toString();
							
						if($(this).is(':checked')){
							callLocSelectService(area, selectedValue);
							area.find(".sublocnoSelection").addClass('hideBlock');							
													
						}else{
							area.find("#subloc-"+selectedValue+" [locid='"+selectedValue+"']").prop("checked",false);//To unselect all checkboxes in sub-loc when loc is unselected.
							area.find(".sublocnoSelection").removeClass('hideBlock');	
							setSublocCount(area);
						}
					area.find(".sublocsDiv").addClass('hideBlock');
					
					selUnSelTotLoc(area);
/*					$('#deptlst').find("li input[type=checkbox]").change(function() {//To select or unselect dept dropdown
						if($(this).is(':checked')){
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
						}else{
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
						}
					});	*/			

					});
	
	area.find('.locLbl')
	.on(
			'click',
			function() {
							
				var $loc = $(this).siblings('input[type="checkbox"]');
				
				if($loc.prop('checked')){
					area.find('.sublocDiv').find('.sublocsDiv').addClass('hideBlock');
					if(area.find('.sublocDiv').find('#subloc-' + $loc.val()).length != 0){
						area.find('.sublocDiv').find('#subloc-' + $loc.val()).removeClass('hideBlock');
						selUnSelTotSubloc(area, $loc);
						
					}else{
						callLocSelectService(area, $loc.attr('id'));
					}
					area.find(".sublocnoSelection").addClass('hideBlock');
				}else{
					area.find('.sublocDiv').find('.sublocsDiv').addClass('hideBlock');
					area.find(".sublocnoSelection").removeClass('hideBlock');
				}
			});
}

/**
 * Invokes service on selection of loc
 * @param selectedValue
 */

function callLocSelectService(area, selectedValue){
	var no = selectedValue;
	var param = {
			"iv_st_id":$("#reportDetailsStockTakeId").html(),
			"iv_loc_id":no
	};
	console.log('get sublocations' + getSTSubLocationsUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getSTSubLocationsUrl,
				data : JSON.stringify(param),
				success : function(response) {
					/*response = response.sort(function(a, b) {
						return (parseInt(a.aisle) > parseInt(b.aisle)) ? 1 : ((parseInt(a.aisle) < parseInt(b.aisle)) ? -1 : 0);
					});*/
					var events = response;
					var temList = events.reduce(function(memo, e1){
					  var matches = memo.filter(function(e2){
					    return e1.sub_location_id == e2.sub_location_id && e1.sub_location_id == e2.sub_location_id
					  })
					  if (matches.length == 0)
					    memo.push(e1);
					    return memo;
					}, []);
					
					if (temList.length > 0) {
						area.find("#subloc-"+no).remove();//Removes the old Div
						var content = '';
						var headerName = area.find("#"+no).parent().find(".locLbl").html();
						content += '<div id="subloc-'+no+'" class="sublocsDiv"><ul id="sublocLst">';
						content += '<li><label class="titleText">'+headerName+'</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="subloc" class="subloc" data-tt-id="'
									+ temList[i].sub_location_id
									+ '" locId="'
									+ no
									+ '" id="'
									+ temList[i].sub_location_id
									+ '" value="'
									+ temList[i].sub_location_id
									+ '"/><label class="locLbl lastColumns">'
									+ temList[i].sub_location_id
									+ '<strong class="number hideBlock" lbl-id="'+temList[i].sub_location_id+'"></strong></label></li>';
						}
						content += '</ul></div>';
						area.find('.parentSublocDiv').append(content);
						area.find(".sublocLstCnt").text(
								temList.length);
						area.find(".sublocLstTotal")
								.removeClass(
										'hideBlock');
						if(area.find('.parentSublocDiv').length != 0){
							area.find(".sublocSelectAll").removeAttr("disabled");
							area.find('.sublocSelectAll').prop('checked',false);//By default should be select all
							area.find('.sublocSelectAll').trigger('click');//By default should be select all							
						}
						 area.find(".subloc").unbind().click(function() {});
						 area.find(".sublocLbl").unbind().click(function() {});
						 
						 setSublocCount(area);
						bindSublocSelectEvent(area);
						area.find(".titleText").find('strong').remove();//Removes the number next to titles
					}
				},
				error : function(response) {

				},
			});
}

/**
 * Sets total locations selected
 */
function setSublocCount(area){
	var bayCount =$("[name='subloc']:checked").length;	
	area.find("#sublocLstCnt").text(bayCount);//Length of loc List	
}

/**
 * Binds loc select event
 */
function bindSublocSelectEvent(area) {	
	area.find('.subloc').on('click',function() {
		selUnSelTotSubloc(area, $("#"+$(this).attr('locId')));
		setSublocCount(area);
	});
}

/**
 * Invoked on click of select all loc check box
 */
function selUnSelTotLoc(area){
	var totloc = area.find('.locLst').find('input[type=checkbox]').length;
	var selLoc = area.find('.locLst').find('input[type=checkbox]:checked').length;
	if(totloc == selLoc){
		area.find(".locSelectAll").prop('checked',true);
	}else{
		area.find(".locSelectAll").prop('checked',false);
	}
}

/**
 * Invoked on click of select all loc check box
 */
function selUnSelTotSubloc(area, $loc){
	var totSubloc = area.find('#subloc-' + $loc.val()).find('input[type=checkbox]').length;
	var selSubloc = area.find('#subloc-' + $loc.val()).find('input[type=checkbox]:checked').length;
	if(totSubloc == selSubloc){
		$(".sublocSelectAll").prop('checked',true);
	}else{
		$(".sublocSelectAll").prop('checked',false);
		area.find("#baynoSelection").removeClass('hideBlock');
	}
	$("[lbl-id=" + $loc.val() + "]").html(selSubloc);//Number Inclusion
}
//Location hierarchy functions - ends*****************************************************************************************************
//Article hierachy -begins------------------------------------------------------------------------------------------------------------------
function bindArticleHierarchyEventForArticleCount(){
	// Code to show and hide article heirarchy	
	$('#basedepH').unbind('click').bind('click',function() {
		if ($(this).is(':checked')){
			$("#baseCountArticleHierarchyId").removeClass('hideBlock');
			bindSelectAllArticleEvents($("#baseCountArticleHierarchyId"));
			populateDepartment($("#baseCountArticleHierarchyId"),"checkbox", false, false);
		}	
		else {
			$("#baseCountArticleHierarchyId").addClass('hideBlock');
		}	
	});
}
function bindArticleHierarchyEventForMissedArticles(){
	// Code to show and hide article heirarchy	
	$('#missedArtilcedepH').unbind('click').bind('click', function() {
		if ($(this).is(':checked')){
			$("#missedArticleHierarchyId").removeClass('hideBlock');
			bindSelectAllArticleEvents($("#missedArticleHierarchyId"));
			populateDepartment($("#missedArticleHierarchyId"),"checkbox", false, false);
			resetHierInfo($("#missedArticleHierarchyId"));
		}	
		else {
			$("#missedArticleHierarchyId").addClass('hideBlock');
		}	
	});
}
function resetHierInfo(area){
	area.find('.catDiv').find('.catgDiv').addClass('hideBlock');
	area.find('.subCatgDiv,.segmentDiv').addClass('hideBlock');
	area.find(".noSelectionCat,.noSelectionSub,.noSelectionSeg").removeClass('hideBlock');
	area.find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
	setCatCount(area);
	setSCatCount(area);
	setSegCount(area);
}
function bindArticleHierarchyEventForVarianceReport(){
	// Code to show and hide article heirarchy	
	$('#varianceArticleH').unbind('click').bind('click', function() {
		if ($(this).is(':checked')){
			$("#varianceReportArticleHierarchyId").removeClass('hideBlock');
			bindSelectAllArticleEvents($("#varianceReportArticleHierarchyId"));
			populateDepartment($("#varianceReportArticleHierarchyId"),"checkbox", false, false);
		}	
		else {
			$("#varianceReportArticleHierarchyId").addClass('hideBlock');
		}	
	});
}

//Aritlce hier ends******************************************************************************
function addRow(){		//For variance repor
	$("#addActionBtn").addClass('hideBlock');
	$("#newParameter").find(".parameterOptionsInputBox").removeClass('hideBlock');
	$("#addParameter").append($("#newParameter").html());
	$("#newParameter").find(".parameterOptionsInputBox").addClass('hideBlock');
}

function getVarianceReportParam(status){
	var reportParam = {//TODO-to change after service shared.
			"iv_stocktake_id" : $("#reportDetailsStockTakeId").html(),
			"iv_dept" : "",
			"iv_cat" : "",
			"iv_sub_cat" : "",
			"iv_seg" : "",
			"iv_sales_org" : "",
			"iv_user_id" : "",
			"iv_var_status" : status,
			"addl_crit_info" : [],
			"iv_article_no":"", 
			"iv_article_barcode":"", 
			"iv_barcode_flag":"",
			"iv_expand_mode":"Y",
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
			
	};
	
	return reportParam;
}

/**
 * This method will return the content with more hyperlink
 * for ex. dept1, dept2 and more..
 * 
 * @param objStr (param should be separated by comma)
 * @returns {String}
 */
function getMoreHyperContent(objStr){
	var objDisp = '';
	var allObjArray = new Array();
	var hyperlinkValue = '';
	var rtnLabel = '';
	var titleVal = '';
	if(objStr != undefined){
		allObjArray = objStr.split(",");
		if(allObjArray.length == 0){
			rtnLabel = '<label></label>';
		}else if(allObjArray.length == 1){
			objDisp = allObjArray[0];
			rtnLabel = '<label>'+objDisp+'</label>';
		}else if(allObjArray.length == 2){
			depDisp = allObjArray[0]+","+allObjArray[1];
			rtnLabel = '<label>'+depDisp+'</label>';
		}else if(allObjArray.length >2){	
			objDisp = allObjArray[0]+","+allObjArray[1]+" and ";
			hyperlinkValue = allObjArray.length - 2+" more";
			for(var i=2; i<allObjArray.length; i++){
				if(titleVal.length == 0){
					titleVal = allObjArray[i];
				}else{
					titleVal = titleVal + "," + allObjArray[i];
				}
				
			}
			rtnLabel = '<label>'+objDisp+'<a class="moreNumber" href="#n" title="'+titleVal+'">+'+hyperlinkValue+'</a></label>';
		}
	}
	return rtnLabel;
}
function printLocationChanges(){
	console.log("printLocationChanges Loc Print");
	var reducedObjList = [];
	
	$("#stLocTable tbody tr").each(
			function() {
				if(Number($(this).find('.toLocationOnload').html()) > Number($(this).find('.activeTo').val())){
					reducedObjList.push($(this));
				}
			});
	if(reducedObjList != '')	{		
		showUpdatedDeliveryPopup(reducedObjList);
	}
	else
		generateParamforJasper();
	 //$.fn.warnPopup('warn',allLocPrintMsg,'Print Location',allLocPrintYes,allLocPrintNo,'','','');	
}


function showUpdatedDeliveryPopup(reducedObjList){	
	var cont = '';		
	$('#dialog-delivery-result').find('popupActionsWrapper').removeClass(
			'margni-top30');
	cont += '<div class="pos_prc_cont ContentTableWrapper">';
	cont += '<div class="modifiedLocPrintMsg">'+modifiedLocPrintMsg+'</div><br>';
	cont += '<table id="reducedPrintTable" style="width:100%" class="ContentTable" width="100%" cellspacing="0"><tbody class="uomRadioTablePopUp">';
	cont += '<tr><th>Location Name</th>'
		+ '<th class="centerValue">Locations</th>'
		+ '<th class="centerValue">Active From</th>'
	    + '<th class="centerValue">Active To</th><th  class="centerValue lastColumn">Select</th></tr>';	
	for (var i = 0; i<reducedObjList.length; i++) {	
	var obj = reducedObjList[i].data('obj');
	cont +='<tr><td class="stLocName">'
		+ obj.loc_name		
		+'</td><td class="st_location_id hideBlock">'
		+ reducedObjList[i].find('.st_location_id').html()
		+ '</td><td class="locationTotal hideBlock">'
		+ obj.sub_location_id_to_limit	
		+'</td><td  class="centerValue">'
		+ obj.sub_location_id_from+" - "+obj.sub_location_id_to_limit
		+'</td><td   class="locationFrom centerValue">'
		+ obj.sub_location_id_from		
		+'</td><td class="locationTo centerValue">'
		+ reducedObjList[i].find('.activeTo').val()
		+'</td>';
	cont += '<td  class="sorted centerValue lastColumn"><input type="checkbox" data_index = "'+i+'" name="deliveryDatecheckbox"></td>';
	cont += '</tr>';
		}	
	cont += '</tbody></table></div>';
	var $dialog = $('#dialog-reduced-print');
	$dialog.find('#dialog-reduced-print-content').html(cont);
	$dialog.dialog('open');
	$('#dialog-reduced-print').parent().css('min-width', '450px');
	$('#dialog-reduced-print').parent().css('width', '600px');
	$('#dialog-reduced-print').parent().css('top', '95px');
	$('#dialog-reduced-print').css('min-height', '115px');	
	$('#dialog-reduced-print').css('max-height', '250px');	
	
	 $('#yesReducedLocPrint').unbind('click');
	 $('#yesReducedLocPrint').click(function() {
		 modifiedLocPrintYes();
	 });
	 $('#noReducedLocPrint').unbind('click');
	 $('#noReducedLocPrint').click(function() {
		 $('#dialog-reduced-print').dialog('close');
		 $.fn.warnPopup('warn',allLocPrintMsg,'Print Location',allLocPrintYes,allLocPrintNo,'','','');
	 });
	 $('#dialog-reduced-print').find('#reducedPrintTable').find("input").each(function() {			
			$(this).trigger("click");		
	 });
}

function modifiedLocPrintYes(reducedObjList){
	generateEditParamForJasper()
	console.log("modifiled Loc Print");	
	/*var locationDtlParamList = [];
	 $('#dialog-reduced-print').find('#reducedPrintTable').find("input").each(function() {
			if($(this).is(':checked')){
				var $tr = $(this).closest('tr');		
				var activeFrom = $tr.find('.locationFrom').html();
				var activeTo =$tr.find('.locationTo').html();
				for(var i=Number(activeFrom); i<=Number(activeTo); i++){
					var mainId =$tr.find('.st_location_id').html(); 
					var subId = i.toString();
					mainId = "000"+mainId; mainId = mainId.slice(-3);
					subId = "000"+subId; subId = subId.slice(-3);
					var barcode = "1"+mainId+subId;
				var locationObj = {
						iv_barcode : Number(barcode),
						iv_shop_count : i+" of "+ $tr.find('.locationTotal').html(),
						iv_shop_desc : $tr.find('.stLocName').html()
				};
				locationDtlParamList.push(locationObj);	
				}
			}
			});*/
	//printLocations(locationDtlParamList);
	$('#dialog-reduced-print').dialog('close');
	 $.fn.warnPopup('warn',allLocPrintMsg,'Print Location',allLocPrintYes,allLocPrintNo,'','','');
}

var allLocPrintYes =function(e){
	triggerSTLocationPrint();
	e.data.msg.dialog('close');	
	/*console.log("all Loc Print");	
	var locationDtlParamList = [];	
	$("#stLocTable tbody tr").each(
			function() {
				var $tr = $(this);
				var obj = $tr.data('obj');
				var activeFrom = $tr.find('.activeFrom').val();
				var activeTo =$tr.find('.activeTo').val();
				for(var i=Number(activeFrom); i<=Number(activeTo); i++){
					var mainId =$tr.find('.st_location_id').html(); 
					var subId = i.toString();
					mainId = "000"+mainId; mainId = mainId.slice(-3);
					subId = "000"+subId; subId = subId.slice(-3);
					var barcode = "1"+mainId+subId;
				var locationObj = {				
						iv_barcode : Number(barcode),
						iv_shop_count : i+" of "+ obj.sub_location_id_to,
						iv_shop_desc : $tr.find('.stLocName').html()
				};
				locationDtlParamList.push(locationObj);	
				}
			});
	printLocations(locationDtlParamList, e);*/
};

function generateParamforJasper(){
	var locationDtlParamList = [];	
	$("#stLocTable tbody tr").each(
			function() {
				var $tr = $(this);
				var obj = $tr.data('obj');
				var activeFrom = $tr.find('.activeFrom').val();
				var activeTo =$tr.find('.activeTo').val();
				for(var i=Number(activeFrom); i<=Number(activeTo); i++){
					var mainId =$tr.find('.st_location_id').html(); 
					var subId = i.toString();
					mainId = "000"+mainId; mainId = mainId.slice(-3);
					subId = "000"+subId; subId = subId.slice(-3);
					var barcode = "1"+mainId+subId;
				var locationObj = {				
						iv_barcode : Number(barcode),
						iv_shop_count : i+" of "+ obj.sub_location_id_to,
						iv_shop_desc : $tr.find('.stLocName').html()
				};
				locationDtlParamList.push(locationObj);	
				}
			});
	printLocations(locationDtlParamList);
}

function generateEditParamForJasper(){
	var locationDtlParamList = [];
	 $('#dialog-reduced-print').find('#reducedPrintTable').find("input").each(function() {
			if($(this).is(':checked')){
				var $tr = $(this).closest('tr');		
				var activeFrom = $tr.find('.locationFrom').html();
				var activeTo =$tr.find('.locationTo').html();
				for(var i=Number(activeFrom); i<=Number(activeTo); i++){
					var mainId =$tr.find('.st_location_id').html(); 
					var subId = i.toString();
					mainId = "000"+mainId; mainId = mainId.slice(-3);
					subId = "000"+subId; subId = subId.slice(-3);
					var barcode = "1"+mainId+subId;
				var locationObj = {
						iv_barcode : Number(barcode),
						iv_shop_count : i+" of "+ $tr.find('.locationTotal').html(),
						iv_shop_desc : $tr.find('.stLocName').html()
				};
				locationDtlParamList.push(locationObj);	
				}
			}
			});
	 printLocations(locationDtlParamList);
}


function printLocations(locationDtlParamList, e){
	var param = {"locationDtlParamList" : locationDtlParamList };	
	$.ajax({
		url: "../locationBarcode/printLocationBarcode.htm",
		type: "POST",
		dataType: "json",
		contentType:"application/json",
		data:JSON.stringify(param),
	    cache: false,    //This will force requested pages not to be cached by the browser  
	    processData:false, //To avoid making query String instead of JSON
	    beforeSend: function() {
	        startLoading();
	    },
		success: function(response, textStatus ){		
		if(response != undefined && response.data == 'success')
			{
			$.fn.warnPopup('warn',allLocPrintMsg,'Print Location',allLocPrintYes,allLocPrintNo,'','','');
			stopLoading();
			if(e != undefined)
			e.data.msg.dialog('close');	
			else
				$('#dialog-reduced-print').dialog('close');
			}
		},
		error: function(xhr, textStatus, errorThrown){
		console.log('request failed'+errorThrown);
		stopLoading();
		if(e != undefined)
		e.data.msg.dialog('close');	
		else
			$('#dialog-reduced-print').dialog('close');
		}
		});
}
function triggerSTLocationPrint(){
	$('#stockTakeForm').attr("action", "../locationBarcode/downloadLocationBarcode.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
}
var modifiedLocPrintNo =function(e){
	console.log("modifiled Loc Print No");
	$.fn.warnPopup('warn',allLocPrintMsg,'Print Location',allLocPrintYes,allLocPrintNo,'','','');
	e.data.msg.dialog('close');	
};
var allLocPrintNo =function(e){
	console.log("All Loc Print No");
	e.data.msg.dialog('close');	
};

function applyLocationChanges() {
	var reqParam = getLocationChangesParam();
	if (reqParam.location_list.length == 0) {
		$.fn.showCustomMsg([ 'Location is mandatory' ], error,
				'Update Stocktake Locations');
	} else {
		console.log(reportSTUpdateLocationUrl + ' ' + JSON.stringify(reqParam));
		$
				.ajax({
					type : "POST",
					url : reportSTUpdateLocationUrl,
					data : JSON.stringify(reqParam),
					beforeSend : function() {
						startLoading();
					}
				})
				.done(
						function(response) {
							// console.log(JSON.stringify(response));
							if (response != undefined && response.length > 0) {
								if (response[0].msg_typ == "S") {
									$.fn
											.showCustomMsg(
													[ 'Stocktake locations updated successfully.' ],
													success,
													'Update Stocktake Locations');
								} else {
									$.fn.showCustomMsg(
											[ response[0].msg_string ], error,
											'Update Stocktake Locations');
								}
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured' ],
												error,
												'Update Stocktake Locations');
							}
						}).fail(
						function() {
							$.fn.showCustomMsg(
									[ 'Sorry, Some technical issue occured' ],
									error, 'Update Stocktake Locations');
						}).always(function() {
					 stopLoading();
				});
	}
}

function getLocationChangesParam() {
	var locationList = [];
	var subLocStrArray;	 
	$("#stLocTable tbody tr").each(
			function() {
				var $tr = $(this);
				var obj = $tr.data('obj');
				subLocStrArray = new Array();
				var locationObj = {
					iv_st_loc_id : obj.location_id,					
					iv_st_loc_flg : ($tr.find('.activeTo').val() == obj.sub_location_id_to_limit)?"A":"R",
					iv_st_loc_from_no : $tr.find('.activeFrom').val(),
					iv_st_loc_to_no : $tr.find('.activeTo').val(),
					iv_st_loc_no_lst : subLocStrArray.join(","),
					iv_st_loc_status : "ACTIVATE"
				};
				locationList.push(locationObj);
			});
	var param = {
		"location_list" : locationList,
		"iv_st_id" : $('#reportDetailsStockTakeId').html()
		};
	return param;
}
/*
function populateSTLocations(area){
	var param = {
			"iv_session_id":""
	};
	console.log(getSTLocationsUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getSTLocationsUrl,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var tr = '';
						for ( var i = 0; i < temList.length; i++) {	
							activeLocMap = populateSTLocationStatus(temList[i].st_location_id);
							var locationId =temList[i].st_location_id;
							tr = '<tr ><td class="st_location_id hideBlock">'
								+ temList[i].st_location_id
								+ '</td><td class="stLocType hideBlock">'
								+ temList[i].st_location_type
								+'</td><td class="stLocName">'
								+ temList[i].st_location_name
								+ '</td><td>'
								+ temList[i].st_loc_no_from + ' - ' + temList[i].st_loc_no_to
								+ '</td><td><input style="margin-right:5px" class="activeRadio" type="radio" checked=""><label style="margin-right:15px">All</label></input>'
							    + '<label style="margin-right:5px" for="">From</label><input style="margin-right:5px" type="#" class="activeText activeFrom textbox xsmallbox numberBox greyedText" disabled value='+temList[i].st_loc_no_from+'>'
							    + '<label style="margin-right:5px" for="">To</label><input type="#" style="margin-right:5px"id="to0" class="activeText activeTo textbox xsmallbox numberBox" value='+activeLocMap[$('#reportDetailsStockTakeId').html()+"_"+locationId+"_End"]+'>'
								+ '</td><td><input style="margin-right:5px" class="deactiveRadio" type="radio"><label style="margin-right:15px">All</label></input>'
								+ '<label style="margin-right:5px" for="">From</label><input style="margin-right:5px" type="#" class="deactiveText deactiveFrom textbox xsmallbox numberBox"><label style="margin-right:5px" for="">To</label><input type="#" style="margin-right:5px"id="to0" class="deactiveText deactiveTo textbox xsmallbox numberBox">'
								+ '</tr>';
						area.find('#stLocTable tbody').append($(tr).data('obj', temList[i]));
						}
						area.find('.numberBox').onlyNumbers();						
						bindSTLocationEvents(area);
					}
				},
				error : function(response) {
				},
			});
}*/

function populateSTLocations(area){
	$("#dialog-editLocation").find('#stLocTable tbody tr').empty();
	$("#dialog-editLocation").find('#stLocTable tbody').html("");
	var param = {
			"iv_session_id":"",
			 "iv_st_id":$('#reportDetailsStockTakeId').html(),
			"iv_loc_id":""
	};
	console.log(getSTLocationStatusUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : getSTLocationStatusUrl,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if(temList != null && temList != undefined && temList.length ==  1
							&& temList[0].msg_typ!= undefined && temList[0].msg_typ == "F"){
						$.fn.showCustomMsg(['No Location Found'], error, 'Stocktake Locations');
					}
					else if (temList != null && temList != undefined && temList.length > 0) {						
						for ( var i = 0; i < temList.length; i++) {
							if(temList[i].location_status == 'ACTIVATE'){
							tr = '<tr ><td class="st_location_id hideBlock">'
								+ temList[i].location_id
								+ '</td><td class="stLocType hideBlock">'
								+ temList[i].location_type
								+'</td><td class="toLocationOnload hideBlock">'
								+ temList[i].sub_location_id_to
								+'</td><td class="stLocName">'
								+ temList[i].loc_name
								+ '</td><td>'
								+ temList[i].sub_location_id_from + ' - ' + temList[i].sub_location_id_to_limit								
								+ '</td><td><input style="margin-right:5px" class="activeRadio" type="radio" checked=""><label style="margin-right:15px">All</label></input>'
							    + '<label style="margin-right:5px" for="">From</label><input style="margin-right:5px" type="#" class="activeText activeFrom textbox xsmallbox numberBox greyedText" disabled value='
							    +temList[i].sub_location_id_from+'>'
							    + '<label style="margin-right:5px" for="">To</label><input type="#" style="margin-right:5px"id='+temList[i].sub_location_id_to_limit+' class="activeText activeTo textbox xsmallbox numberBox" value='
							    +temList[i].sub_location_id_to+'>'
								+ '</td><td><input style="margin-right:5px" class="deactiveRadio" type="radio"><label style="margin-right:15px">All</label></input>'
								+ '<label style="margin-right:5px" for="">From</label><input style="margin-right:5px" type="#" class="deactiveText deactiveFrom textbox xsmallbox numberBox"><label style="margin-right:5px" for="">To</label><input type="#" style="margin-right:5px"id="to0" class="deactiveText deactiveTo textbox xsmallbox numberBox">'
								+ '</tr>';
							area.find('#stLocTable tbody').append($(tr).data('obj', temList[i]));
							}						
						}						
						area.find('.numberBox').onlyNumbers();
						$("#dialog-editLocation").parent().addClass("popupWrapper");
						$("#dialog-editLocation").dialog("open");
						$("#dialog-editLocation").parent().css('top', '20px');		
						$('#dialog-editLocation').parent().css('margin-top', '15px');
						bindSTLocationEvents(area);
						$("#dialog-editLocation").find('#selectAllActivate').prop('checked', true);
					}
				},
				error : function(response) {
				},
			});
}


function bindSTLocationEvents(area){
	area.find('.activeRadio').unbind('click');
	area.find('.activeRadio').click(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		$tr.find('.deactiveRadio').prop('checked', false);
		$tr.find('.deactiveText').addClass('greyedText').prop('disabled', true).val('');
		$tr.find('.activeText').removeClass('greyedText').prop('disabled', false);
		$tr.find('.activeFrom').val(obj.sub_location_id_from);
		$tr.find('.activeTo').val(obj.sub_location_id_to_limit);
		
			if($('.deactiveRadio:checked').length==$('.deactiveRadio').length){
			$('#selectAllDeactivate').prop('checked', true);	
			}else{
				$('#selectAllDeactivate').prop('checked', false);
			}
			if($('.activeRadio:checked').length==$('.activeRadio').length){
				$('#selectAllActivate').prop('checked', true);	
			}else{
				$('#selectAllActivate').prop('checked', false);
			}
	
	});
	
	area.find('.deactiveRadio').unbind('click');
	area.find('.deactiveRadio').click(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		$tr.find('.activeRadio').prop('checked', false);
		$tr.find('.activeText').addClass('greyedText').prop('disabled', true).val('');
		$tr.find('.deactiveText').removeClass('greyedText').prop('disabled', false);
		$tr.find('.deactiveFrom').val(obj.sub_location_id_from);
		$tr.find('.deactiveTo').val(obj.sub_location_id_to_limit);
	
		if($('.deactiveRadio:checked').length==$('.deactiveRadio').length){
			$('#selectAllDeactivate').prop('checked', true);	
			}else{
				$('#selectAllDeactivate').prop('checked', false);
			}
			if($('.activeRadio:checked').length==$('.activeRadio').length){
				$('#selectAllActivate').prop('checked', true);	
			}else{
				$('#selectAllActivate').prop('checked', false);
			}
		
		
	});
	 $('.activeTo').unbind('change');
	 $('.activeTo').change(function() {
		 var $tr = $(this).closest('tr');
		 var obj = $tr.data('obj');
    	 $tr.find('.deactiveText').addClass('greyedText').prop('disabled', true).val('');
    	 //var activeFromVal = Number($tr.find('.activeFrom').val());
    	 //var locFromVal = obj.sub_location_id_from;
    	 var activeToVal = Number($tr.find('.activeTo').val());	
    	
    	 var deactiveFromVal = (activeToVal == obj.sub_location_id_to_limit)?"":(activeToVal+1);
    	 var deactiveToVal = (activeToVal == obj.sub_location_id_to_limit)?"":(obj.sub_location_id_to_limit);
    	 $tr.find('.deactiveFrom').val(deactiveFromVal);
 		 $tr.find('.deactiveTo').val(deactiveToVal);
    	
     });
	area.find('.activeFrom').keyup(function(){
		var $tr = $(this).closest('tr');
		activeRow=$(this).closest('tr');
		var obj = $tr.data('obj');
		if(Number($(this).val()) == obj.sub_location_id_from && Number($tr.find('.activeTo').val()) == obj.sub_location_id_to_limit){
			$tr.find('.activeRadio').prop('checked', true);
		} else {
			$tr.find('.activeRadio').prop('checked', false);
			$tr.find('.deactiveText').removeClass('greyedText').prop('disabled', false);
		}
	
	});
	
	area.find('.activeTo').keyup(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		if(Number($tr.find('.activeFrom').val()) == obj.sub_location_id_from && Number($(this).val()) == obj.sub_location_id_to_limit){
			$tr.find('.activeRadio').prop('checked', true);
		} else {
			$tr.find('.activeRadio').prop('checked', false);
			$tr.find('.deactiveText').removeClass('greyedText').prop('disabled', false);
		}
		var activeToVal = Number($tr.find('.activeTo').val());	
	   	 if(activeToVal>obj.sub_location_id_to_limit){
	   		 $tr.find('.deactiveText').addClass('greyedText').prop('disabled', true).val(''); 
	   		 $tr.find('.activeTo').val(obj.sub_location_id_to_limit); 
	   		$tr.find('.activeRadio').prop('checked', true);
	   	 }else{
	   	 var deactiveFromVal = (activeToVal == obj.sub_location_id_to_limit)?"":(activeToVal+1);
	   	 var deactiveToVal = (activeToVal == obj.sub_location_id_to_limit)?"":(obj.sub_location_id_to_limit);
	   	 $tr.find('.deactiveFrom').val(deactiveFromVal);
			 $tr.find('.deactiveTo').val(deactiveToVal);
	   	 }
	});
	
	area.find('.deactiveFrom').keyup(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		if(Number($(this).val()) == obj.sub_location_id_from && Number($tr.find('.deactiveTo').val()) == obj.sub_location_id_to_limit){
			$tr.find('.deactiveRadio').prop('checked', true);
		} else {
			$tr.find('.deactiveRadio').prop('checked', false);
			$tr.find('.activeText').removeClass('greyedText').prop('disabled', false);
		}
	});
	
	area.find('.deactiveTo').keyup(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		if(Number($tr.find('.deactiveFrom').val()) == obj.sub_location_id_from && Number($(this).val()) == obj.sub_location_id_to_limit){
			$tr.find('.deactiveRadio').prop('checked', true);
		} else {
			$tr.find('.deactiveRadio').prop('checked', false);
			$tr.find('.activeText').removeClass('greyedText').prop('disabled', false);
		}
		var deactiveToVal = Number($tr.find('.deactiveTo').val());	
	   	 if(deactiveToVal>obj.sub_location_id_to_limit){
	   		 $tr.find('.activeText').addClass('greyedText').prop('disabled', true).val(''); 
	   		 $tr.find('.deactiveTo').val(obj.sub_location_id_to_limit); 
	   	 }else{
	   		$tr.find('.deactiveRadio').prop('checked', false);
			$tr.find('.activeText').removeClass('greyedText').prop('disabled', false);
	   	 }
		
	});
	area.find('.selectAllActivate').keyup(function(){
		var $tr = $(this).closest('tr');
		var obj = $tr.data('obj');
		if(Number($tr.find('.deactiveFrom').val()) == obj.sub_location_id_from && Number($(this).val()) == obj.sub_location_id_to_limit){
			$tr.find('.deactiveRadio').prop('checked', true);
		} else {
			$tr.find('.deactiveRadio').prop('checked', false);
			$tr.find('.activeText').removeClass('greyedText').prop('disabled', false);
		}
	});
	$('input[name="selectAllActivate"]').unbind('click');
	$('input[name="selectAllActivate"]')
	    .change(function(event) {
	    	var check = $(this).is(':checked');
	    	if(check){
	    		$(this).attr('checked', true);
	    		
	    		$("#stLocTable tbody tr").each(
	    				function() {
	    					
	    						$(this).find('.activeRadio').trigger("click");
	    						
	    				});
	    		$("#stLocTable").find('#selectAllDeactivate').attr('checked', false);
	    		$(this).removeClass("unchecked");
	    	}else{
	    		$(this).attr('checked', false);
	    		$("#stLocTable tbody tr").each(
	    				function() {
	    					$('.selectAllDeactivate').attr('checked', true);
	    						$(this).find('.deactiveRadio').trigger("click");
	    						
	    					
	    				});
	    		$("#stLocTable").find('#selectAllDeactivate').attr('checked', true);
	    		$(this).addClass("unchecked");
	    	}
	    	
	    	if($('.deactiveRadio:checked').length==$('.deactiveRadio').length){
				$('#selectAllDeactivate').prop('checked', true);	
				}else{
					$('#selectAllDeactivate').prop('checked', false);
				}
				if($('.activeRadio:checked').length==$('.activeRadio').length){
					$('#selectAllActivate').prop('checked', true);	
				}else{
					$('#selectAllActivate').prop('checked', false);
				}
			
	    		    
	 });
	$('input[name="selectAllDeactivate"]').unbind('click');
	$('input[name="selectAllDeactivate"]')
	    .change(function(event) {
	    	var check = $(this).is(':checked');
	    	if(check){
	    		$(this).attr('checked', true);
	    		
	    		$("#stLocTable tbody tr").each(
	    				function() {
	    					$(this).find('.deactiveRadio').trigger("click"); 
	    					
	    				});
	    		$("#stLocTable").find('#selectAllActivate').attr('checked', false);
	    		$(this).removeClass("unchecked");
	    	}else{
	    		$(this).attr('checked', false);
	    		$("#stLocTable tbody tr").each(
	    				function() {
	    					$(this).find('.activeRadio').trigger("click");
	    					
	    					
	    				});
	    		$("#stLocTable").find('#selectAllActivate').attr('checked', true);
	    		$(this).addClass("unchecked");
	    	}
	    	if($('.deactiveRadio:checked').length==$('.deactiveRadio').length){
				$('#selectAllDeactivate').prop('checked', true);	
				}else{
					$('#selectAllDeactivate').prop('checked', false);
				}
				if($('.activeRadio:checked').length==$('.activeRadio').length){
					$('#selectAllActivate').prop('checked', true);	
				}else{
					$('#selectAllActivate').prop('checked', false);
				}
			
});
}

function validateSTLocations(area){
	var activeFrom = 0;
	var activeTo = 0;
	var deactiveFrom = 0;
	var deactiveTo = 0;
	var locationNameTxt = new Array();
	
	area.find('table tbody tr').each(function(){
		activeFrom = Number($(this).find('.activeFrom').val());
		activeTo = Number($(this).find('.activeTo').val());
		deactiveFrom = Number($(this).find('.deactiveFrom').val());
		deactiveTo = Number($(this).find('.deactiveTo').val());
		
		if(deactiveFrom != 0 && deactiveTo != 0 && activeFrom != 0 && activeTo != 0){
			if(!((deactiveTo < activeFrom) || (deactiveFrom > activeTo))){
				locationNameTxt[locationNameTxt.length] = $(this).find('.stLocName').html();
			}
		}	
	});	
	if(locationNameTxt.length != 0){
		$.fn
				.showCustomMsg(
						[ 'Activate & Deactivate Sub Locations overlap for the locations, '
								+ locationNameTxt.join(",") ], error,
						'Stocktake Locations');
	}	
}
var groupMissedList = function(list){
	($('.varMainTable_'+missedArticlesTabIndex+'').find('.printSTMissContent')).text('');
	$('.varMainTable_'+missedArticlesTabIndex+'').find('.printSTMissContent').remove();	//clearing subcategory every time
	varList =[];
	varMap ={};
	var checkkey ='sub_category_name';
	var obj = {};
	var tempList =[];
	var tempMap ={};
	for(var i =0; i<list.length;i++){
		obj = list[i];
		key = obj[checkkey];
		/*if(obj.stocktake_id!=undefined && obj.sub_cat!=null && obj.sub_cat_name!=null){
			obj.sub_cat_name = (departmentMap[obj.SEGMENT_NO.substr(0,2)][0].node_desc);
			obj.department_no = obj.SEGMENT_NO.substr(0,2);
		}else{
			obj.sub_cat_name = '';
			obj.department_no ='';
		}*/
		if(obj.stocktake_id!=undefined && obj.sub_category_name!=undefined && varMap.hasOwnProperty(key)){
			tempList = varMap[key];
			tempList.push(obj);
			varList[tempMap[key]].sub_cat_array.push(obj.sub_category_name);
		}else{
			tempList = [];
			tempMap[key]= varList.length;
			obj.sub_cat_array =[];
			obj.sub_cat_array.push(obj.sub_category_name);
			varList.push(obj);
			tempList.push(obj);
		}
		varMap[key]= tempList;
	}
  	return true;
 };
 //12342,12341
 function checkSelectAll($tbl){
	    //var $tbl =  $('#missed_rpt_subcat_'+missedArticlesTabIndex+'_table');
	    var confObj = $tbl.data('confObj');
	    var cont = confObj.content;
	    var selected =0;
	    for(var i = 0;i<cont.length;i++){
	        if(cont[i].sub_cat_selected){
	            selected++;
	        }
	    }
	    if(cont.length == selected){
	        return true;
	    }else{
	        return false;
	    }
	}
	
function bindCntRtpDept(){
	$('#baseCountArticleHierarchyId input,#articleCountDeptDrpDwnUl input').bind('change',function(){
		console.log('usr');
		$('#articleCountLocDrpDwnUl input,#articleCountAisleDrpDwnUl input,#articleCountUsrDrpDwnUl input').prop('checked',false);
		$('#articleCountUsrDrpDwnLabel').html('Select users');
		$('#articleCountAisleDrpDwnLabel').html('Select aisles');
		$('#articleCountLocDrpDwnLabel').html('Select locations');
	});
}
function bindCntRtpUsr(){
	$('#articleCountUsrDrpDwnUl input').bind('change',function(){
		console.log('usr');
		$('#articleCountLocDrpDwnUl input,#articleCountAisleDrpDwnUl input,#articleCountDeptDrpDwnUl input').prop('checked',false);
		$('#articleCountDeptDrpDwnLabel').html('Select Department');
		$('#articleCountAisleDrpDwnLabel').html('Select aisles');
		$('#articleCountLocDrpDwnLabel').html('Select locations');
		resetHierarchyDept($('#baseCountArticleHierarchyId'),'articleCountallDeptChkBox');
	});
}