var totalRecords = '';
var content = '';
var printHeadInnerTable = '';
var headerContent = '';
var allInputs = '';
var selectedSubCat = {};
var tmpColDelim = String.fromCharCode(11); // vertical tab character
var tmpRowDelim = String.fromCharCode(0);
var currentPageInPopup = 1;
var resObj = [];
var expanded = 'expanded';
var collapsed = 'collapsed';
var manualExpand = 'manualExpand';
var autoexpanded = 'autoexpanded';
var locationMap = {};
var finalArray = [];
var responseMap = {};
var Groupby='';
var cloneVariance = '';
var filterValues = '';
var filterOpenBtn = '<label id="filterOpen3" class="linkBtn"><a ><label class="filter">Filters</label></a></label>';
var filterClearBtn = '<label id="filterClear3" class="linkBtn hideBlock"><a ><label class="negativeFlag">Clear Filters</label></a></label>';
var deptChoose = '<div class="parameter clearfix "><label for="dept">Departments  :</label><div id="varianceReportDeptDrpDwnDiv" class="selectDropdown"><label id="varianceReportDeptDrpDwnActiveId" class="selectLabel"><a  id="varianceReportDeptDrpDwnLabel">All departments</a></label><ul class="dropdown" id="varianceReportDeptDrpDwnUl">	<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="varianceReportallDeptChkBox" name="varianceReportallDeptChkBox"><label class="dropdownLabel" for="">All departments</label></li></div>	</ul></div><div class="searchByOptions onlyCheckbox">	</div></div>';
var buttonApply = '<div class="formActions"><label class="actionBtn" id="varianceFilterBtn"><a >Apply</a></label><label class="secondaryActionBtn closeLink" id="varcloseLink"><a >Cancel</a></label></div>';
var deptSelection = '<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="varianceReportallDeptChkBox" name="varianceReportallDeptChkBox"><label class="dropdownLabel" for="">All departments</label></li></div>';
var legend = '<div class="legend"><label> Legend: <label class="pb">Pack Breakdown</label> <label class="linked">Linked</label> <label class="d">Deleted</label><label class="style">Style</label><label class="productRecalled">Product Recalled</label></label></div>';
var pageActComp ='<div class="pageActions "><label id="finaliseStocktake" class="actionBtn actionModeST finaliseStocktakeClass '+finalizeButtonSt+'"><a ><label class="thumbUp">Finalise Stocktake</label></a></label></div>';
var pageActPend = '<div class="pageActions "><label id="acceptVariance" class="actionBtn actionModeST"><a ><label class="thumbUp">Accept Variance</label></a></label></div>';
var varianceRptParam = '';
$(document).ready(function(){
	//$("#varianceFilterDiv").find('.numberBox').onlyNumbers();
	// filter by
	//$('#filterOpen3').click(function(){//Group by and filter in same line changes
	$('body').on('click', '#filterOpen3', function() {
		$("#filterOpen3").addClass('hideBlock');
		$("#filterClear3").removeClass('hideBlock');
		$("#varianceFilterDiv").removeClass('hideBlock');//Group by and filter in same line changes
		$("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx').change(function(){
			if($("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx:checked').length==1){
				if($("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx:checked').val()=='05'){
					$("#varianceFilterDiv").find('.valueCritQty').val('50');
					$("#varianceFilterDiv").find('.valueCritLessQty').val('-50');
				}else if($("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx:checked').val()=='20'){
					$("#varianceFilterDiv").find('.valueCritQty').val('20');
					$("#varianceFilterDiv").find('.valueCritLessQty').val('-20');
				}else if($("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx:checked').val()=='28'){
					$("#varianceFilterDiv").find('.valueCritQty').val('20');
					$("#varianceFilterDiv").find('.valueCritLessQty').val('-20');
				}else if($("#varianceReportDeptDrpDwnUl").find('.deptDrpDwnChkBx:checked').val()=='10'){
					$("#varianceFilterDiv").find('.valueCritOm').val('1');
					$("#varianceFilterDiv").find('.valueCritLessOm').val('-1');
				}else{
					$("#varianceFilterDiv").find('.valueCritOm').val('');
					$("#varianceFilterDiv").find('.valueCritLessOm').val('');
					$("#varianceFilterDiv").find('.valueCritQty').val('');
					$("#varianceFilterDiv").find('.valueCritLessQty').val('');
				}
			}else{
				$("#varianceFilterDiv").find('.valueCritOm').val('');
				$("#varianceFilterDiv").find('.valueCritLessOm').val('');
				$("#varianceFilterDiv").find('.valueCritQty').val('');
				$("#varianceFilterDiv").find('.valueCritLessQty').val('');
			}
		});
		$("#varianceFilterDiv").find('[name="GT"]').keyup(function(){
			if($(this).val()>0)
				$(this).parent().find('[name="LT"]').val($(this).val()*-1);
			else
				$(this).parent().find('[name="LT"]').val('');
		});
		
		$("#varianceFilterDiv").find('[name="LT"]').keyup(function(){
			if($(this).val()<0)
				$(this).parent().find('[name="GT"]').val($(this).val()*-1);
			else
				$(this).parent().find('[name="GT"]').val('');
		});
		bindDepartmentSelectEvent($("#varianceReportArticleHierarchyId"),false);			// bind dept click
	});
	
	//$('#filterClear3').click(function(){//Group by and filter in same line changes
	$('body').on('click', '#filterClear3', function() {
		onFilterClearOrFilterCancelVariance();
		resetHierarchyDept($('#varianceReportArticleHierarchyId'),'');
	});	
	$('#varianceFilterBtn').unbind('click');
	
	//$('#varianceFilterBtn').click(function(){//Group by and filter in same line changes
	
	$('body').on('click', '#varianceFilterBtn', function() {
		filterApplyClicked = true;
		
		$("#reportContent2_pend").addClass("hideBlock");
		globalRequestParam = prepareVarianceReportParam($("#varianceFilterDiv"));//globalrequestapram for //Group by and filter in same line changes
		filterValues = $('.valueCritOm').val() +"|"+ $('.valueCritLessOm').val() +"|"+$('.valueCritQty').val() +"|"+$('.valueCritLessQty').val() +"|"+
							$('.valueCritValue').val() +"|"+$('.valueCritLessValue').val();
		callReportSTVarianceService(globalRequestParam);
		
	});
	
	$('#varcloseLink').unbind('click');
	
	//$('#varcloseLink').click(function(){//Group by and filter in same line changes
	$('body').on('click', '#varcloseLink', function() {
		onFilterClearOrFilterCancelVariance();
	});
	
	bindVarianceRptActionBtns();
	$("#dialog-com-locationsST").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 250,
		maxHeight: 400,
		minWidth: 350,
		width : 550
	});
	$("#dialog-com-locationsST").parent().addClass("popupWrapper");	
	
	$(window).click(function() {
       closeMenuVarianceWarn();
    });
	
	keyPressFunctionVfilter();
});
function keyPressFunctionVfilter(){
	$(".decimalTextBox").on('keypress', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');

	       if ((k < '0' || k > '9') && k !== '.' && k !== '-') return false;
	       
	       if(v != "" && k == "-") return false;
	     
	       if (dp >= 0 && v.length > dp + 2) {
	           return false;
	       }

	       if (k === '.' && (dp >= 0 || v.length === 0)) {
	           return false;
	       }
	   });
	$(".decimalTextBox").on('keyup', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');
	       if (this.value >= 10000 || this.value <= -10000)
	       	{
	        if(this.value.indexOf('-') == 0){
	             this.value= this.value.substr(0, 5);
	        }else {
	             this.value= this.value.substr(0, 4);
	        }
	           return false;
	       }

	   });
}

function onFilterClearOrFilterCancelVariance(){
	filterApplyClicked = false;
	 /*if(filterContent != '' && filterContentIndex == 0){//basecount
	    	$("#tablefilters").html(filterContent);
	  }*/
	defaultVarainceFilters();
	fetchVarianceReportWithoutFilters();
}
function clearVarianceFilter(){
	filterValues = '';
	$("#filterOpen3").removeClass('hideBlock');
	$("#varianceFilterDiv").addClass('hideBlock');//Group by and filter in same line changes
	$("#filterClear3").addClass('hideBlock');
	$('.valueCritOm').val("");
	$('.valueCritQty').val("");	
	$('.valueCritValue').val("");
	$('.valueCritLessOm').val("");
	$('.valueCritLessQty').val("");	
	$('.valueCritLessValue').val("");
	$('.parameterOptionsInputBoxVar').find('.criteria').val("GT");
}
function fetchVarianceReportWithoutFilters(){
	$("#reportContent2_pend").addClass("hideBlock");
	callReportSTVarianceService(getVarianceReportParam("PENDING"));
	keyPressFunctionVfilter();
}
function defaultVarainceFilters(){
	$("#varianceReportallDeptChkBox").prop("checked",false);//select all dept in drop dwon
	$("#varianceReportallDeptChkBox").trigger('click');	
	
	$("#varianceReportArticleHierarchyId").find(".deptSelectAll").prop("checked",true);//unselect all dep in hier box
	$("#varianceReportArticleHierarchyId").find(".deptSelectAll").trigger('click');
	
	$("#varianceArticleH").prop("checked",true);//uncheck select Select multiple departments or sub-categories check box
	$("#varianceArticleH").trigger("click");
	if(isNationalStocktake){
		$("#varianceReportArticleHierarchyId").find("input[type=radio]").prop('checked',false);
	}else{
		$("#varianceReportArticleHierarchyId").find(".deptSelectAll").prop('checked',true);
		$("#varianceReportArticleHierarchyId .deptlst").find("input[type=checkbox]").prop('checked',true);
		$("#varianceReportArticleHierarchyId").find('.deptLstCnt').text($("#varianceReportArticleHierarchyId .deptlst").find("input[type=checkbox]:checked").length);
	}
	
	$("#om_gt").val('');
	$("#qty_gt").val('');
	$("#value_gt").val('');
	$('.valueCritOm').val("");
	$('.valueCritQty').val("");	
	$('.valueCritValue').val("");
	$('.valueCritLessOm').val("");
	$('.valueCritLessQty').val("");	
	$('.valueCritLessValue').val("");
	clearVarianceFilter();
}
function closeMenuVarianceWarn(){
	if($("#submitSTInfo-info-wrapper").is(':visible')){
		$('#mainTabs').click(function(event) {
			$("#submitSTInfo-info-wrapper").fadeOut(50);
			$('#mainTabs').unbind('click'); 
			return false;
		});
		if(event.target.id == 'backBtn'){
			$("#submitSTInfo-info-wrapper").fadeOut(50);
			return false;
		}
		$('.mainWrapper .headWrapper').click(function(event){	//$('.mainWrapper .headWrapper')
			$("#submitSTInfo-info-wrapper").fadeOut(50);
			$('.mainWrapper .headWrapper').unbind('click');
			return false;
			});
	}
}
/**
 * Invokes report service
 */

function callReportSTVarianceService(requestParam){	
	var responseRes = [];
	 locationMap  = {};
	console.log(reportSTSubCatVarianceUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportSTSubCatVarianceUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
			if(response != undefined && response.length > 0 && response[0].stocktake_id != undefined){
				if(filterContentVariance != '' && filterContentVariance.length !=0 && reporttabIndex == 2){//variance report //Group by and filter in same line changes
			    	//$("#tablefilters3").appendTo(filterContentVariance);
					cloneVariance = $("#tablefilters3");
			    	filterContentVariance.appendTo("#tablefilters3");
			    	$("#tablefilters3").addClass("hideBlock");
			    }
				if(filterButtonDivContentVariance != '' && filterButtonDivContentVariance.length !=0 && reporttabIndex == 2){//variance report	//Group by and filter in same line changes
				  $("#varianceFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContentVariance);
				  $("#varianceFilterButtonDiv").addClass("hideBlock");
		  	    }
				
				$('#review-1, #review-2, #review-3').removeClass('hideBlock');
				$('#review-1, #review-2, #review-3').find('.stDtlActionBtns').removeClass('hideBlock');
				$('#reportContent2_pend').find('.lookupActionWrapper').find(".groupByClear ").removeClass('hideBlock');
				$tblhold.removeClass("hideBlock");
				allInputs = "ALL";
				responseP = response;
				//formatVarianceResults(responseP);
				var totalValue = 0;
				var area = $('#mainTabs-3');
				for (var i =0; i< response.length; i++){
					//if(response[i].display_indicator == 'H'){
						totalValue += Number(response[i].final_variance);
						//break;
					//}
				}
				area.find("#variancePendingCount").html("Pending Review - Total Value($): "+ (formatTo2DecimalPlaces(totalValue)));
				//}
				response[0].totalValue = formatTo2DecimalPlaces(totalValue);
				loadReportContentTbl();
				$tblhold.find(".tooltip").tooltip({
					position : {
						my : "right top-20",
						at : "right+5 top-10"
					}
				});		//Defect_8829
				//if(requestParam.iv_var_status == 'PENDING'){
				totalRecords = response.length;
				$("#noRecords").html(totalRecords);//Sets the no of records							
				if(requestParam.iv_var_status == 'PENDING'){
					$holder = $('#review-1');
					$('#varianceReportTabs').tabs("option", "active", 0);
					//var foot = $('.varMainTable').attr("id").replace("_table", "_foot");
					var footer = $('.varMainTable_'+varianceReportTabIndex+'').closest("div").find('.tableFooter');
					if(/*basePercentage == 100 && missedPercentage == 100*/missedPercentage > 0){
						$(footer).html("").append(legend).append(pageActPend);	
						//$("#"+foot).html("").append(legend).append(pageActPend);	
					}else{
						//$("#"+foot).html("").append(legend);
						$(footer).html("").append(legend);
					}
				}else if(requestParam.iv_var_status == 'COMPLETED'){
					$holder = $('#review-3');
					$('#review-3').find('#action_btn_wrap_variance_rpt_subcat_2').addClass('hideBlock');
					$('#review-3').find('.varianceFooter').addClass('hideBlock');
					$('#varianceReportTabs').tabs("option", "active", 2);
					//var foot = $('.varMainTable').attr("id").replace("_table", "_foot");
					//foot = foot.replace("_0_", "_2_");
					var footer = $('.varMainTable_'+varianceReportTabIndex+'').closest("div").find('.tableFooter');
					if( glSTStatus == "OPEN" && ((missedPercentage == 100 && variablePercentage == 100) || (missedPercentage == 100 && nullVariance) )){     // Defect 7801
						//$("#"+foot).html("").append(legend).append(pageActComp);
						$(footer).html("").append(legend).append(pageActComp);						
						$(".finaliseStocktakeClass").removeClass("hideBlock");
					}else{
						//$("#"+foot).	html("").append(legend);
						$(footer).html("").append(legend);
						$(".finaliseStocktakeClass").addClass("hideBlock");
					}
				}else if(requestParam.iv_var_status == 'INPROGRESS'){
					$holder = $('#review-2');
					$('#varianceReportTabs').tabs("option", "active", 1);
				}
				$("#variance_rpt_subcat_"+varianceReportTabIndex+"_table").data('param',requestParam);
				varianceRptParam = requestParam;
				if(!filterApplyClicked){
					defaultVarainceFilters();
				}
				bindVarianceRptActionBtns();
				$("#grou_cont_variance_rpt_subcat_"+varianceReportTabIndex+",#clr_grp_link_btn_variance_rpt_subcat_"+varianceReportTabIndex).addClass('hideBlock');
				//calculateTotal($holder);
				callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince());
				bindVarianceExport();
				$currentVariancePanel!=undefined && $currentVariancePanel!='' ? $currentVariancePanel.removeClass('hideBlock') : '';
			} else {
				
				if(response != undefined && response.length <= 0 ){
					/*if(filterButtonDivContentVariance != '' && filterButtonDivContentVariance .length !=0 && reporttabIndex == 2 && varianceReportTabIndex == 0){//varaince article	//Group by and filter in same line changes
						  $("#varianceFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContentVariance);
						  $("#varianceFilterButtonDiv").removeClass("hideBlock");
					  	}
					  if(filterContentVariance != '' && filterContentVariance.length !=0 && reporttabIndex == 2 && varianceReportTabIndex == 0){//variance article	//Group by and filter in same line changes
						  	filterContentVariance.appendTo("#tablefilters3");//appendTo(filterContentVariance);
					    	$("#tablefilters3").removeClass("hideBlock");
					    }	*/		
					/* Clearing the tables when No records and displaying filter*/	
					$('#reportContent2_pend').removeClass('hideBlock');
					$('#reportContent2_pend').find('.varMainTable_0').html('');
					$('#reportContent2_pend').find('.tableFooter').html('');
					$('#reportContent2_pend').find('.varSubTable').html('');
					$('#reportContent2_pend').find('.lookupActionWrapper').find(".groupByClear ").addClass('hideBlock');
					 
					 // $tblhold.addClass("hideBlock");
					if(!filterApplyClicked){
						$('#review-1, #review-2, #review-3').addClass('hideBlock');
					} else {
						$('#review-1, #review-2, #review-3').find('.stDtlActionBtns').addClass('hideBlock');
						$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Variance Report');
					}	
				}else{
					$('#review-1, #review-2, #review-3').find('.stDtlActionBtns').addClass('hideBlock');
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Variance Report');
				}
			}			
	  }).fail(function() {		
		  //if(response != undefined && response.length <= 0 ){
				if(filterButtonDivContentVariance != '' && filterButtonDivContentVariance .length !=0 && reporttabIndex == 2 && varianceReportTabIndex == 0){//varaince article	//Group by and filter in same line changes
					  $("#varianceFilterButtonDiv").find('.lookupActionWrapper').html(filterButtonDivContentVariance);
					  $("#varianceFilterButtonDiv").removeClass("hideBlock");
				  	}
				  if(filterContentVariance != '' && filterContentVariance.length !=0 && reporttabIndex == 2 && varianceReportTabIndex == 0){//variance article	//Group by and filter in same line changes
					  	filterContentVariance.appendTo("#tablefilters3");//appendTo(filterContentVariance);
				    	$("#tablefilters3").removeClass("hideBlock");
				    }					
				  //populateFiltersForVarianceReport();//Group by and filter in same line changes
				  //bindFilterEventsForVarainceReport();//Group by and filter in same line changes
				  $tblhold.addClass("hideBlock");
				if(!filterApplyClicked){
					$('#review-1, #review-2, #review-3').addClass('hideBlock');
				} else {
					$('#review-1, #review-2, #review-3').find('.stDtlActionBtns').addClass('hideBlock');
					//$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Variance Report');
				}	
			//}
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Variance Report');
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}

function callReportSTVarianceByArticle(requestParam,expendedAnchor,obj,$elem){	
	var responseRes = [];
	requestParam.iv_sub_cat = obj.sub_cat;
	console.log(reportSTVarianceUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: reportSTVarianceUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		 
		  $.each(response, function(i, dataRes) {
			    if (dataRes.display_indicator == 'H') {
			    	responseRes.push(dataRes);	
			    	var id = dataRes.article_no;
			    	 if(responseMap[id] != undefined){
			    		 responseMap[id].push(dataRes);
				      }else{
				    	  var articleList = [];
				    	  articleList.push(dataRes);
				    	  responseMap[id]=articleList;
				      }
			    }else if (dataRes.display_indicator == 'D') {			    	
			    	 var id = dataRes.article_no;		     
				      if(locationMap[id] != undefined){
				    	  locationMap[id].push(dataRes);
				      }else{
				    	  var articleList = [];
				    	  articleList.push(dataRes);
				    	  locationMap[id]=articleList;
				      }
			    }
			});
		  
		  	response= responseRes;
			if(response != undefined && response.length > 0 && response[0].article_no != undefined){
				formatVarianceResults(response);		//format result
				totalRecords = response.length;
				var $expendedAnchor = $(expendedAnchor);
				$expendedAnchor.attr('id','variance_rpt_subcat_'+varianceReportTabIndex+'_'+obj.sub_cat);
				$expendedAnchor.insertAfter($elem);
				$expendedAnchor = $('#variance_rpt_subcat_'+varianceReportTabIndex+'_'+obj.sub_cat).find('td');
				varMap[obj.sub_cat_name] = response;
				$expendedAnchor.loadtbl(new tblReportVariance(response));
				$expendedAnchor.find('.tableInfo,.tableActionsBtnsWrapper,.tableActionsWrapper ').addClass('hideBlock');
				if(totalRecords <= 10){
					$expendedAnchor.find('.tableFooter').addClass('hideBlock');
				}else{
					$expendedAnchor.find('.tableFooter').removeClass('hideBlock');
				}
				showLocationPopupEvent();
				//callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince());
				//bindVarianceExport();
			} else {
				$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-Variance Report');
			}			
		 stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-Variance Report');
		  stopLoading();
	  }).always(function() {
		  //stopLoading();
	  });
}
function addColDelim(str)
{
	str+=tmpColDelim;
	return str;
	}

function exportToCSV(varianceArray, filename) {
		var groupedData=$groupBy(varianceArray, function(obj) {return obj.sub_cat_name;});
		var valuesArray =['article_no','article_desc','sell_price','base_count','count_1','count_2','count_3','count_4','final_count','soh','var_qty','var_value'];
		var headersArray = ['Article','Description','Value ($)','BaseCount','Re-count 1','Re-count 2','Re-count 3','Re-count 4','FinalCount','SOH','Variance Qty','Variance Value'];
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
			tableContent=addColDelim(tableContent);
			var array=groupedData[groupArray[index]];
			if(array.length > 0){ 
				tableContent+='Sub-category Total ($): '+array[0].group_tt;
				tableContent+=tmpRowDelim;
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
function bindVarianceExport(){
	//callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince(true));
	 $(".varianceExportBtn").on('click', function (event) { 
	    	$('#stockTakeForm').attr("action", "../stockTakeVarianceReport/downloadStockTakeVarianceReportExcel.pdf");
	    	$('#stockTakeForm').attr('target','_blank');
	    	$('#stockTakeForm').attr('method','get');
	    	$('#stockTakeForm').submit();
	    });
    //bindChecBxEvenChange();
}
function tblReportVarianceSubCategory(data){
	
	this.option = 'build';
	this.key = ['label','print','subcat','subcatTotal'];
	this.table_name = 'variance_rpt_subcat_'+varianceReportTabIndex;
	this.table_title = '';
	this.table_class = 'drilldownTable ContentTable treetable actionRows varMainTable_'+varianceReportTabIndex+'';
	this.header_tr_class = 'collapsed';
	this.header_name = {label:'',print:'',subcat:'',subcatTotal:''};
	this.header_data_type = {label:'',print:'',subcat:'char', subcatTotal:'char' };
	this.header_row_type = {label:'',print:'main',subcat:'main',subcatTotal:'main'};
	this.header_class = {label:'showSTVarExpand',print:('noSort'),subcat:'',subcatTotal:''};
	this.header_title = {},
	this.header_width = {label:'15px',print:'',subcat:'',subcatTotal:''};
	this.content_tr_class = 'collapsed maintr';
	this.content_class = {label:'showSTVar',print:('noSort'),subcat:'',subcatTotal:'float:right'};
	this.content_title = {};
	this.content_format = {label:'',print:'',subcat:'trim',subcatTotal:'trim'};
	this.content_width =  {label:'15px',print:'17px',subcat:'560px',subcatTotal:''};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;	
	this.recordPerPage= 10;
	this.group_done = {group_done : function() {groupDone();}};
	this.default_groupbyColumn = ['subcat' ];
	this.groupbyColumn = {'subcat' : 'Sub Category'};
	this.group_cont_function = {subcat : getSubCatgGrpHeadForVariance};
	this.groupby = true;
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	/*this.sort_done = {sort_done:varSortDone};
	this.page_done = {page_done: varPageDone};*/
	this.sort_done = {sort_done:varianceSubCatDone};
	this.group_done = '';
	this.page_done = {page_done: bindChecBxEvenChange};
	this.cont_data_function = {subcat:showsubCat_array, print:showPrint,subcatTotal:getSubcatTotal};
	this.cont_sort_function = {subcat:getsubCat_array, subcatTotal:getsubCatTotal_array};
	this.content_bind_event = {click: expandCollapseEventBind};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {label:{'span':{event:{click : ''},display: function(){}}}};
	this.header_td_addon = {label:{'span':{event:{click : expandAllEvent},display: function(){}}},
			print:{'.selectAllPrint':{event:{click : bindPrintAllClick},display: function(){}}}};
	//12497
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',print:'<input name = "headerChk" class="selectAllPrint noSort" name = "headerChk" type="checkbox" data-sub-cat="printAll">',subcat:'SUB CATEGORY',subcatTotal:'Final Variance ($):'+data[0].totalValue};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>'/*,print:'<input class="printSTVar noSort" type="checkbox" data-sub-cat="printAll">'*/};
	this.content_tr_addon = {click: ''};
}
function varianceSubCatDone(){
	 locationMap  = {};
	$("#add_grp_link_btn_variance_rpt_subcat_"+varianceReportTabIndex).addClass('hideBlock');
}
function bindChecBxEvenChange(){
	//finalArray = [];
	$('.printSTVarContent').unbind('change').bind('change',function(){
	/*	if ($('.varMainTable').find("[type='checkbox']:checked").length == 0){
			newArray=(varMap[$(this).attr('subnamevaraince')]);
			for(var i=0;i<newArray.length;i++){		
			finalArray.push(newArray[i]);
			}
		}		*/
		// Defect_12342
		var $tmpElem = $(this);
		var $tr = $tmpElem.closest('tr');
		if($tr.find('.printSTVarContent').is(':checked')){
			$tr.data('obj').sub_cat_selected = true;
		}else{
			$tr.data('obj').sub_cat_selected = false;
		}
		//Defect_12342
		//if (checkSelectAll($('#variance_rpt_subcat_'+varianceReportTabIndex+'_table'))){
		if ($('.varMainTable_'+varianceReportTabIndex+'').find("[name='contentChk']:checked").length  == ($('.varMainTable_'+varianceReportTabIndex+'').find("[name='contentChk']").length)){
			$('.varMainTable_'+varianceReportTabIndex+'').find('.selectAllPrint' ).prop('checked', true);
		}else{
			$('.varMainTable_'+varianceReportTabIndex+'').find('.selectAllPrint' ).prop('checked', false);
		}
    	bindVariancePrintData(getPrintExportDataForVaraince());
	});
	$('#thead_variance_rpt_subcat_'+varianceReportTabIndex +' tr').removeClass('expanded').addClass('collapsed');
}
var bindVariancePrintData = function($tr,$tbl){
	/*if($('.printSTVarContent').is(":visible")){
		$('#reportContent2_pend').find('.tableActionsBtnsWrapper .groupByOpen').addClass('hideBlock');
		$('#reportContent2_pend').find('.tableActionsBtnsWrapper .groupByClear ').removeClass('hideBlock');
		//$('#reportContent2_pend').find('.group_cont_table').removeClass('hideBlock');
	}*/ 
	bindChecBxEvenChange();
	callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince());
};
var bindPrintAllClick=function(e)
{
	var selectAll = false;
	if($(this).hasClass('selectAllPrint')){
		if($(this).prop('checked')){
			$('.printSTVarContent').prop('checked', true);
			selectAll =true;
		}else{
			$('.printSTVarContent').prop('checked', false);
		}			
	}
	var cont = $(this).closest('table').data('confObj').content;
	for(var i = 0;i<cont.length;i++){
		cont[i].sub_cat_selected = selectAll;
	}
	
	
	callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince(true));
};
var showPrint = function(obj){
	return '<input name = "contentChk" type="checkbox" '+(obj.sub_cat_selected!=undefined && obj.sub_cat_selected == true ? 'checked' : '')+' name = "contentChk" data-sub-cat="'+obj.sub_cat+'" class="labelCheckBox printSTVarContent noSort" subnameVaraince="'+ (obj.sub_cat_name || '') + '">';
};
var getSubcatTotal = function(obj){	
	return '<strong>Sub-category Total ($):'+formatTo2DecimalPlaces(obj.final_variance||'')+'</strong>';
};
var getsubCat_array = function(){
	return 'tot_sub_cat';
};
var getsubCatTotal_array = function(){
	return 'total_varinace';
};
var showsubCat_array = function(obj){
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
				//temp +='<label class="and-option">,and <a  class="moreNumber deptMore" id="">CONTENTMORE more</a></label><span class="hideBlock remain-dept"><strong>, '+key+'</strong></span>';
				sub_cat_str += ', '+key;
			}else{
				//temp +='<span class="hideBlock remain-dept"><strong>, '+key+'<strong></span>';
				sub_cat_str += ', '+key;
			}
		}
	}	
	obj.tot_sub_cat = sub_cat_str;
	
	$('.varMainTable_'+varianceReportTabIndex+'').find('.selectAllPrint' ).prop('checked', false);		// clearing printAll Checkbos on each sorting
	
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
		triggerExpandAll($elem,opt);
	}else if(($elem.attr('manualExpand') != '' && $elem.attr('manualExpand') == 'false') || ($elem.attr('autoExpand')!= '' && $elem.attr('autoExpand') == 'false')){
		$elem.removeClass(expanded).addClass(collapsed);
		opt = expanded;
		triggerExpandAll($elem,opt);
	}else{
		triggerExpandAll($elem,opt);
	}
}
function triggerExpandAll($elem,opt){
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
				expandCollapseEvent({data:{tr:$telem, flag: false}});
			}
		}else{
			expandCollapseEvent({data:{tr:$telem, flag: false}});
		}
	}
}
function expandCollapseEventBind($elem){
										// Defect_9874
	if($elem.target.nodeName == 'A'){			
		expandCollapseEvent($elem);
	}/*else{										//Defect_10283 hided as part of defect
		$(this).find(".showSTVar").unbind('click').click(function(e){
		expandCollapseEvent($elem);
	});
	}*/
	// Defect_12342
	var $tmpElem = $($elem.target);
	var $tr = $tmpElem.closest('tr');
	if($tr.find('.printSTVarContent').is(':checked')){
		$tr.data('obj').sub_cat_selected = true;
	}else{
		$tr.data('obj').sub_cat_selected = false;
	}
	//if (checkSelectAll($('#variance_rpt_subcat_'+varianceReportTabIndex+'_table'))){
	if ($('.varMainTable_'+varianceReportTabIndex+'').find("[name='contentChk']:checked").length  == ($('.varMainTable_'+varianceReportTabIndex+'').find("[name='contentChk']").length)){
		$('.varMainTable_'+varianceReportTabIndex+'').find('.selectAllPrint' ).prop('checked', true);
	}else{
		$('.varMainTable_'+varianceReportTabIndex+'').find('.selectAllPrint' ).prop('checked', false);
	}
	callStockTakeVarianceJasperPrint(getPrintExportDataForVaraince());
}

function expandAllEvent($elem){
	
	var $elem = $('.varMainTable_'+varianceReportTabIndex+' tr:first');
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
	triggerExpandAll($elem,opt);
}

function expandCollapseEvent(e){
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
	var expendedAnchor = '<tr class="noChildNew " style="display: table-row;"><td colspan="6" class="sorted" style="padding-left: 5px; padding-right: 5px"></td></tr>';	
	var $tbl = $elem.closest('table');
	
	var confObj=$tbl.data('confObj');
	var content =  confObj.content;
	var obj =  $elem.data('obj');
	var subCat = obj.sub_cat;
	var $expanAnc = '';
	var hideFooter = '';
	var requestParam = $("#variance_rpt_subcat_"+varianceReportTabIndex+"_table").data('param');
	$elem.toggleClass(expanded+' '+collapsed);
	$expanAnc = $('#variance_rpt_subcat_'+varianceReportTabIndex+'_'+subCat);
	content.count=(content.count!=undefined ? content.count:0);
	if($elem.hasClass(expanded)){
		if($expanAnc==undefined || $expanAnc.length == 0){
			callReportSTVarianceByArticle(requestParam,expendedAnchor,obj,$elem);
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
	$('.noChildNew tbody tr td').css('padding-right','5px');
	$('.varMainTable_'+varianceReportTabIndex+' tr td .finalCnt ').css( 'text-align', 'center');
	/*$('.varMainTable_'+varianceReportTabIndex+' tr td').css('padding-right','5px');
	$('.varMainTable_'+varianceReportTabIndex+' tr td').css( 'text-align', 'center');
	$('.varMainTable_'+varianceReportTabIndex+' tr td .articleVar ').css( 'text-align', 'left');
	$('.varMainTable_'+varianceReportTabIndex+' tr td .articleDescVar').css( 'text-align', 'left');
	$('.varMainTable_'+varianceReportTabIndex+' tr td .stVarlocation').css( 'text-align', 'left');*/
}
/**
 * Configuration to generate table
 * @param data
 * @returns {tblReportPLU}
 */
function tblReportVariance(data) {
	this.option = 'build';
	this.key = [ 'article_no', 'article_desc','sell_price', 'loc_name','base_count','reCount','final_count','soh','variance'];
	this.table_name = 'variance_rpt_'+varianceReportTabIndex+'_'+data[0].article_no+'';
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def varSubTable';
	this.header_tr_class = 'collapsed';
	this.header_name = {article_no : 'Article',article_desc : 'Description', sell_price : 'Value ($)', loc_name : 'Locations', base_count : 'Base<br>Count',count_1 : '1', count_2 : '2', count_3 : '3', count_4 : '4',final_count : 'Final<br>Count',soh : 'SOH',var_qty:'Qty',var_value:'$ Value'};
	this.header_data_type = {article_no : 'number', article_desc : 'char', sell_price : 'number',loc_name: 'char',base_count : 'number',count_1 : 'number', count_2 : 'number', count_3 : 'number', count_4 : 'number',final_count : 'number',soh : 'number',var_qty:'number',var_value:'number'};
	this.header_row_type = {article_no : 'main',article_desc : 'main',sell_price : 'main',loc_name : 'main', base_count : 'main',reCount : 'sub',final_count : 'main',soh : 'main',variance : 'sub'};
	this.header_sub_rows = {reCount : {subKeys : [ 'count_1', 'count_2', 'count_3','count_4' ]}, variance : {subKeys : [ 'var_qty', 'var_value' ]	}};
	this.header_class = {article_no : '',article_desc : '', sell_price : 'centerValue tooltip',loc_name : '',base_count : 'numberColumn',reCount : ' centerValue columnDivider noSort  ',count_1 : 'numberColumn', count_2 : 'numberColumn', count_3 : 'numberColumn', count_4 : 'numberColumn',final_count : 'numberColumn',soh : 'tooltip numberColumn',variance : ' centerValue columnDivider noSort',var_qty : 'numberColumn',var_value : 'lastColumn numberColumn'};
	this.header_width = {article_no : '11%', article_desc : '10%',sell_price : '5%',loc_name: '9%',base_count : '5%',count_1 : '1.5%',count_2 : '1.5%',count_3 : '1.5%', count_4 : '1.5%',final_count : '7%',soh : '7%',var_qty:'5%',var_value:'7%'};
	this.content_class = {article_no : 'articleVar',article_desc : 'articleDescVar', sell_price : 'centerValue tooltip',loc_name : 'stVarlocation ', base_count : 'numberColumn',reCount : ' centerValue columnDivider noSort  ',count_1 : 'numberColumn', count_2 : 'numberColumn', count_3 : 'numberColumn', count_4 : 'numberColumn',final_count : 'numberColumn finalCnt',soh : 'tooltip numberColumn',variance : ' centerValue columnDivider noSort',var_qty : 'numberColumn',var_value : 'lastColumn numberColumn'};
	this.content_format = {article_no : 'removeNull', article_desc : 'removeNull',sell_price : 'removeNull',loc_name : 'removeNull',base_count : 'removeNull',count_1 : 'removeNull',count_2 : 'removeNull',count_3 : 'removeNull', count_4 : 'removeNull',final_count : 'removeNull',soh : 'removeNull',var_qty : 'removeNull',var_value:'removeNull'};
	this.content_width = {article_no : '11%', article_desc : '10%',sell_price : '5%',loc_name : '9%',base_count : '5%',count_1 : '1.5%',count_2 : '1.5%',count_3 : '1.5%', count_4 : '1.5%',final_count : '7%',soh : '7%',var_qty:'5%',var_value:'7%'};
	this.header_td_label = {reCount : 'Re-count',variance : 'Variance'};
	this.content_title = {}, this.header_title = {};
	this.cont_data_function = {sell_price:showSellPriceVariance, loc_name:showLocation, var_value:showVarianceValue,base_count:showBaseCountInVariance,count_1:showCount1,count_2:showCount2,count_3:showCount3,count_4:showCount4,final_count:showFinalCountInVariance,soh:showArticleCountSOHInVariance,var_qty:ShowVarianceQty,article_no:getArticleTdclassDispVar};
	this.data_td_class = {article_no:getVarianceArticleTdclass};
	this.data_tr_class = {func_class:getVarianceArticleTrclass};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.group_done = {group_done : function() {groupDone();}};
	this.default_groupbyColumn = ['sub_cat_name' ];
	this.groupbyColumn = {'sub_cat_name' : 'Sub Category'};
	this.group_cont_function = {sub_cat_name : getSubCatgGrpHeadForVariance};
	this.groupby = true;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {click : showLocationPopupEvent};
	this.content_tr_addon = {click : ''};
	this.content_td_addon = {click : ''};
	this.content_label = {};
	this.sort_done = bindVariancePrintData;
	this.group_done = bindVariancePrintData;
	this.page_done = {page_done: bindChecBxEvenChange};
}
var showLocation = function(obj)
{
	var content = '';var location = '';
	var con = '';
	var num = 0;
	var sellableLoc = false;
	var sellableCount = 0;
		if(locationMap != '' && locationMap[obj.article_no] && 
				locationMap[obj.article_no].length >0){
			var list = locationMap[obj.article_no];
			for ( var k = 0; k < list.length; k++) {
				if(list[k].perpetual_flag == 'Y' ){
					if(con =='')con = list[k].loc_name;
					else{
					content += content == ''?list[k].loc_name:(','+list[k].loc_name);
					num = num + 1;
					}
				}else{
					sellableLoc = true;
					var countVal =Number(list[k].final_count);
					sellableCount = Number(sellableCount +countVal);
				}
			}
			location += (con != "")?con:"";
			if(sellableLoc && sellableCount>0 ) {
					if(content == ""){//location += (location == ""?"Sellable":", Sellable");}
						if(location == ""){location += "Sellable";}
						else {content += ", Sellable"; num = num + 1;}
					}else {content += ", Sellable"; num = num + 1;};				
			}			
			if(num >0){
				location += '<a id="'+obj.article_no+'_LocationPopup" class="moreNumber moredept" title="';	
				location += '&#13;'+content;
				location += '" > + '+ (num)+ 'more</a>';
				$('.moreNumber').tooltip({
					tooltipClass : 'tmptooltipClass'
				});
			}
			// 12650 Defect - Fix
			if(location == '')location = (responseMap[obj.article_no] != undefined &&  responseMap[obj.article_no][0].loc_name != ''
				&& responseMap[obj.article_no][0] != undefined)? responseMap[obj.article_no][0].loc_name:'';
		}
		return location;
		};
		
function calculateTotal($holder){
	//if(varianceReportTabIndex == 2){
	$holder =  $holder.find('.ContentTable');
	if($holder.data('confObj')!=null && $holder.data('confObj').groupedContObj!=undefined && $holder.data('confObj').groupedContObj!=null){
		var groupedMap = $holder.data('confObj').groupedContObj;
		for( m in groupedMap ){
		    var array = groupedMap[m];
			var tot = 0;
			if(array!=undefined && array.length>0){
				for(var i= 0 ;i<array.length;i++){
					tot+= array[i].var_value!= undefined && array[i].var_value!= null ? Number(array[i].var_value) : 0;
				}
		        array[0].group_tt = formatTo2DecimalPlaces(tot);
			}
		}
	}
}
function formatVarianceResults(response){
	var fObj = {};
	if(response!=null && response.length>0){
		for(var i = 0;i<response.length;i++){
			fObj  = response[i];
				if(fObj.base_uom != 'KG' && fObj.base_uom != 'L'){
					fObj.soh = correctDecimalPostion(fObj.soh||'');
					fObj.var_qty = correctDecimalPostion(fObj.var_qty||'');
					fObj.final_count = (fObj.final_count!=null && fObj.final_count!=undefined) ? correctDecimalPostion(fObj.final_count||'') : fObj.final_count;
					fObj.base_count = (fObj.base_count!=null && fObj.base_count!=undefined) ? correctDecimalPostion(fObj.base_count||'') : fObj.base_count;
					fObj.count_1 = (fObj.count_1!=null && fObj.count_1!=undefined) ? correctDecimalPostion(fObj.count_1||'') : fObj.count_1;
					fObj.count_2 = (fObj.count_2!=null && fObj.count_2!=undefined) ? correctDecimalPostion(fObj.count_2||'') : fObj.count_2;
					fObj.count_3 = (fObj.count_3!=null && fObj.count_3!=undefined) ? correctDecimalPostion(fObj.count_3||'') : fObj.count_3;
					fObj.count_4 = (fObj.count_4!=null && fObj.count_4!=undefined) ? correctDecimalPostion(fObj.count_4||'') : fObj.count_4;
					fObj.final_count_qty = (fObj.final_count_qty!=null && fObj.final_count_qty!=undefined) ? correctDecimalPostion(fObj.final_count_qty||'') : fObj.final_count_qty;
					fObj.base_count_qty = (fObj.base_count_qty!=null && fObj.base_count_qty!=undefined) ? correctDecimalPostion(fObj.base_count_qty||'') : fObj.base_count_qty;
					fObj.count_qty_1 = (fObj.count_qty_1!=null && fObj.count_qty_1!=undefined) ? correctDecimalPostion(fObj.count_qty_1||'') : fObj.count_qty_1;
					fObj.count_qty_2 = (fObj.count_qty_2!=null && fObj.count_qty_2!=undefined) ? correctDecimalPostion(fObj.count_qty_2||'') : fObj.count_qty_2;
					fObj.count_qty_3 = (fObj.count_qty_3!=null && fObj.count_qty_3!=undefined) ? correctDecimalPostion(fObj.count_qty_3||'') : fObj.count_qty_3;
					fObj.count_qty_4 = (fObj.count_qty_4!=null && fObj.count_qty_4!=undefined) ? correctDecimalPostion(fObj.count_qty_4||'') : fObj.count_qty_4;
					//12067
					fObj.scanned_count = (fObj.scanned_count!=null && fObj.scanned_count!=undefined) ? correctDecimalPostion(fObj.scanned_count||'') : fObj.scanned_count;
				}else{
					fObj.soh = Number(fObj.soh||'').toFixed(3);
					fObj.var_qty = Number(fObj.var_qty||'').toFixed(3);
					fObj.final_count = (fObj.final_count!=null && fObj.final_count!=undefined) ? Number(fObj.final_count||'').toFixed(3) : fObj.final_count;
					fObj.base_count = (fObj.base_count!=null && fObj.base_count!=undefined) ? Number(fObj.base_count||'').toFixed(3) : fObj.base_count;
					fObj.count_1 = (fObj.count_1!=null && fObj.count_1!=undefined) ? Number(fObj.count_1||'').toFixed(3) : fObj.count_1;
					fObj.count_2 = (fObj.count_2!=null && fObj.count_2!=undefined) ? Number(fObj.count_2||'').toFixed(3) : fObj.count_2;
					fObj.count_3 = (fObj.count_3!=null && fObj.count_3!=undefined) ? Number(fObj.count_3||'').toFixed(3) : fObj.count_3;
					fObj.count_4 = (fObj.count_4!=null && fObj.count_4!=undefined) ? Number(fObj.count_4||'').toFixed(3) : fObj.count_4;
					//12067
					fObj.scanned_count = (fObj.scanned_count!=null && fObj.scanned_count!=undefined) ? Number(fObj.scanned_count||'').toFixed(3) : fObj.scanned_count;
				}
				fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
				fObj.var_value = (fObj.var_value!=null && fObj.var_value!=undefined) ? Number(fObj.var_value||'').toFixed(2) : fObj.var_value;
			}
	}
}

function formatVarianceResultsExport(response){
	var fObj = [];
	var fObjObj=[];
	if(response!=null && response.length>0){
		for(var i = 0;i<response.length;i++){
			fObj  = response[i];
				if(fObj.base_uom != 'KG' && fObj.base_uom != 'L'){
					fObj.soh = correctDecimalPostion(fObj.soh||'');
					fObj.var_qty = correctDecimalPostion(fObj.var_qty||'');
					fObj.final_count = (fObj.final_count!=null && fObj.final_count!=undefined) ? correctDecimalPostion(fObj.final_count||'') : fObj.final_count;
					fObj.base_count = (fObj.base_count!=null && fObj.base_count!=undefined) ? correctDecimalPostion(fObj.base_count||'') : fObj.base_count;
					fObj.count_1 = (fObj.count_1!=null && fObj.count_1!=undefined) ? correctDecimalPostion(fObj.count_1||'') : fObj.count_1;
					fObj.count_2 = (fObj.count_2!=null && fObj.count_2!=undefined) ? correctDecimalPostion(fObj.count_2||'') : fObj.count_2;
					fObj.count_3 = (fObj.count_3!=null && fObj.count_3!=undefined) ? correctDecimalPostion(fObj.count_3||'') : fObj.count_3;
					fObj.count_4 = (fObj.count_4!=null && fObj.count_4!=undefined) ? correctDecimalPostion(fObj.count_4||'') : fObj.count_4;
					fObj.final_count_qty = (fObj.final_count_qty!=null && fObj.final_count_qty!=undefined) ? correctDecimalPostion(fObj.final_count_qty||'') : fObj.final_count_qty;
					fObj.base_count_qty = (fObj.base_count_qty!=null && fObj.base_count_qty!=undefined) ? correctDecimalPostion(fObj.base_count_qty||'') : fObj.base_count_qty;
					fObj.count_qty_1 = (fObj.count_qty_1!=null && fObj.count_qty_1!=undefined) ? correctDecimalPostion(fObj.count_qty_1||'') : fObj.count_qty_1;
					fObj.count_qty_2 = (fObj.count_qty_2!=null && fObj.count_qty_2!=undefined) ? correctDecimalPostion(fObj.count_qty_2||'') : fObj.count_qty_2;
					fObj.count_qty_3 = (fObj.count_qty_3!=null && fObj.count_qty_3!=undefined) ? correctDecimalPostion(fObj.count_qty_3||'') : fObj.count_qty_3;
					fObj.count_qty_4 = (fObj.count_qty_4!=null && fObj.count_qty_4!=undefined) ? correctDecimalPostion(fObj.count_qty_4||'') : fObj.count_qty_4;
					//12067
					fObj.scanned_count = (fObj.scanned_count!=null && fObj.scanned_count!=undefined) ? correctDecimalPostion(fObj.scanned_count||'') : fObj.scanned_count;
				}else{
					fObj.soh = Number(fObj.soh||'').toFixed(3);
					fObj.var_qty = Number(fObj.var_qty||'').toFixed(3);
					fObj.final_count = (fObj.final_count!=null && fObj.final_count!=undefined) ? Number(fObj.final_count||'').toFixed(3) : fObj.final_count;
					fObj.base_count = (fObj.base_count!=null && fObj.base_count!=undefined) ? Number(fObj.base_count||'').toFixed(3) : fObj.base_count;
					fObj.count_1 = (fObj.count_1!=null && fObj.count_1!=undefined) ? Number(fObj.count_1||'').toFixed(3) : fObj.count_1;
					fObj.count_2 = (fObj.count_2!=null && fObj.count_2!=undefined) ? Number(fObj.count_2||'').toFixed(3) : fObj.count_2;
					fObj.count_3 = (fObj.count_3!=null && fObj.count_3!=undefined) ? Number(fObj.count_3||'').toFixed(3) : fObj.count_3;
					fObj.count_4 = (fObj.count_4!=null && fObj.count_4!=undefined) ? Number(fObj.count_4||'').toFixed(3) : fObj.count_4;
					//12067
					fObj.scanned_count = (fObj.scanned_count!=null && fObj.scanned_count!=undefined) ? Number(fObj.scanned_count||'').toFixed(3) : fObj.scanned_count;
				}
				fObj.sell_price = Number(fObj.sell_price||'').toFixed(2);
				fObj.var_value = (fObj.var_value!=null && fObj.var_value!=undefined) ? Number(fObj.var_value||'').toFixed(2) : fObj.var_value;
				fObjObj.push(fObj);
			}
	}
	return fObjObj;
}

var showSellPriceVariance = function(obj){
	var sellPrice = obj.sell_price == undefined || obj.sell_price == '' ? Number(0).toFixed(2):Number(obj.sell_price).toFixed(2)+' per '+obj.base_uom;
	return sellPrice;
};

var showVarianceValue = function(obj){
	//obj.var_value  =  obj.var_value == undefined || obj.var_value == '' ? formatTo2DecimalPlaces(0):formatTo2DecimalPlaces(obj.var_value);
	return obj.var_value;
};

/**
 * Group by article content
 */
var getSubCatgGrpHeadForVariance = function(obj, confObj) {/*
	
	var array = confObj.groupedContObj[obj.group_key+' '];
	var tot = 0;
	console.log(array);
	if(array!=undefined && array.length>0){
		for(var i= 0 ;i<array.length;i++){
			tot+= array[i].var_value!= undefined && array[i].var_value!= null ? Number(array[i].var_value) : 0;
		}
	}
	//return '<tr><td class="valueInfo" colspan="12">Sub-category Total ($):  </td><td class="centerValue valueInfo">'+tot+'</td></tr>';
	
	
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="rowSection rowHighlight" colspan="13">'+(varianceReportTabIndex !=2 ? '<input type="checkbox" data-sub-cat="'+obj.sub_cat+'" class="labelCheckBox" subnameVaraince="'+ (obj.sub_cat_name || '') + '">': '')
				+ (obj.sub_cat_name  || '') + '<span style="float:right">Sub-category Total ($): '+formatTo2DecimalPlaces(tot)+'</span></td></tr>';
		obj.group_tt = formatTo2DecimalPlaces(tot);
		
	}
	return cont;
	
*/};
var getArticleTdclassDispVar = function(obj,confObj){
	var colClass = [];
	var promo_indicator = [];
	var addingDiv ='';
	
	if(obj.pbd_ind == 'Y' || obj.cpbd_flag == 'Y'){
		colClass.push(' <div class = "pb right"></div>');
	
	} 
	if(obj.linked_ind == 'Y'){
		colClass.push(' <div class = "linked right"></div>');
		
	} 
	if(obj.del_ind == 'Y'){
		colClass.push(' <div class ="d right tooltip"></div>');
	}
	if(obj.style_ind != null && obj.style_ind != '' && obj.style_ind != undefined){
		colClass.push(' <div class = "style right"></div>');
	}
	else if(obj.ps_article_status == '08'){
		colClass.push(' <div class = "productRecalled right tooltip"></div>');
	}
	promo_indicator = promo_indicator.join();
	colClass = colClass.join();
	obj.promo_indicator = promo_indicator.replace(/,/g, " ");
	addingDiv = (colClass.replace(/,/g, " "));
	
	return obj.article_no+''+addingDiv;
};


var getVarianceArticleTdclass = function(obj,$td){
	var promo_indicator = [];
	if(obj.pbd_ind == 'Y'|| obj.cpbd_flag == 'Y'){
		promo_indicator.push("PB");
	} 
	if(obj.linked_ind == 'Y'){
		promo_indicator.push(" L");
	} 
	if(obj.del_ind == 'Y'){
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
	if(obj.pbd_ind == 'Y'){
		colClass = 'pb right';
		promo_indicator = "PB";
	} else if(obj.linked_ind == 'Y'){
		colClass = 'linked right';
		promo_indicator = "L";
	} else if(obj.del_ind == 'Y'){
		colClass = 'd right tooltip';
		promo_indicator = "D";
		$td.attr('title', 'Article is Deleted');
	}else if(obj.style_ind != '' && obj.style_ind != undefined && obj.style_ind != null){
		colClass = 'style right tooltip';
		promo_indicator = "S";
		//$td.attr('title', 'Styled Article');
	}else if(obj.ps_article_status == '08'){
		colClass = 'productRecalled right tooltip';
		promo_indicator = "PR";
		$td.attr('title', 'Product Recalled Article');
	}
	obj.promo_indicator = promo_indicator;
	$td.addClass(colClass);
	
*/};

var getVarianceArticleTrclass = function(obj,$td,$tr){
	if(obj.del_ind == 'Y'){
		$tr.addClass('warningIndicator');
	}
};

var showBaseCountInVariance = function(obj)
{
	var count  =checkIfRandomWeightArticleVariance(obj,obj.base_count,obj.base_count_qty,obj.base_uom);
	return (count != '' &&  count != undefined )?count: count;
};

var showCount1 = function(obj)
{
	var count = checkIfRandomWeightArticleVariance(obj,obj.count_1,obj.count_qty_1,obj.base_uom);
	return (count != '' &&  count != undefined )?count: count;
};

var showCount2 = function(obj)
{
	var count  =checkIfRandomWeightArticleVariance(obj,obj.count_2,obj.count_qty_2,obj.base_uom);
	return (count != '' &&  count != undefined )?count: count;
};
var showCount3 = function(obj)
{
	var count  =checkIfRandomWeightArticleVariance(obj,obj.count_3,obj.count_qty_3,obj.base_uom);
	return (count != '' &&  count != undefined )?count: count;
};

var showCount4 = function(obj)
{
	var count  =checkIfRandomWeightArticleVariance(obj,obj.count_4,obj.count_qty_4,obj.base_uom);
	return (count != '' &&  count != undefined )?count: count;
};

var showFinalCountInVariance = function(obj)
{
	
	var addSplitVal = '';
	var count  =checkIfRandomWeightArticleVariance(obj,obj.final_count,obj.final_count_qty,obj.base_uom);
	if(obj.random_weight_flg != 'Y' && obj.final_count > 0 && obj.om !=null && obj.om !=''){
		var finalCount = Number(obj.final_count) ;
		 addSplitVal = ((obj.order_uom != null && obj.order_uom != '' && obj.order_uom != obj.base_uom) ?
				" (" + Math.floor(finalCount / obj.om) + " " + obj.order_uom + " & " + correctDecimalPostion(Math.round((finalCount % obj.om) * 1e3) / 1e3) + " " + obj.base_uom + ")" 
				: '');
	}
	//return (count != '' &&  count != undefined )?count: count;
	return count+" "+addSplitVal;
};

function checkIfRandomWeightArticleVariance(obj,countOrWeightInput,QtyInEachesInput,uom)
{

	if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y' && countOrWeightInput != null 
			&& countOrWeightInput != "" && countOrWeightInput!=undefined && countOrWeightInput != null /* Number(countOrWeightInput) >0*/)
	{
		return Number(QtyInEachesInput)+' '+obj.pi_uom+' & '+countOrWeightInput+' '+(uom == undefined ? obj.uom : uom);
	}	else {
		if(obj.base_uom == 'KG' || obj.base_uom == 'L'){
			return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)?  Number(countOrWeightInput).toFixed(3)+' '+obj.base_uom : '');
		}else {
			return ((countOrWeightInput !='' && countOrWeightInput != undefined && countOrWeightInput != null)?  correctDecimalPostion(countOrWeightInput)+' '+obj.base_uom : '');
		}
	}
	return (countOrWeightInput || '') ;
}

var showArticleCountSOHInVariance = function(obj)
{

if(obj.random_weight_flg != null && obj.random_weight_flg != "" && obj.random_weight_flg == 'Y')
		{
		 return Number(obj.pi_soh)+' '+obj.pi_uom+' & '+obj.soh+' '+obj.base_uom;
		}else {
			if(obj.soh !=null && obj.soh !="" && obj.soh!= undefined){
				//var sohVal = (obj.soh);
				var sohDisp = Number(obj.soh).toFixed(3);
			 return ((obj.base_uom =='KG' || obj.base_uom =='L') ? sohDisp+' '+obj.base_uom : obj.soh+' '+obj.base_uom);
			}else{
				obj.soh = '';
			}
		}
	return (obj.soh || '');

};


var ShowVarianceQty = function(obj)
{
	return checkIfRandomWeightArticleVariance(obj,obj.var_qty,obj.var_cnt_qty,obj.base_uom);
};

/**
 * Frames print screen content
 * @param response
 */
function frameReportSTVariance(response){
	content = '';
	var headerContent = '<label><strong>Variance Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'</br><label class="subtitle">List of articles (<strong id="noRecords">'+totalRecords+'</strong>)</label></br></br>';
	constructHeaderTblSTVariance();	
	content += printHeadInnerTable;			
	frameTableSTVariance(response);
	$('#printbodyForSTVarianceReport')
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
function frameTableSTVariance(response){
	var count = 0;	
	var firstPageCreated = false;
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

		+ ' </div>' + '</div>' + '</div>';
	
	//Group By Sub category
	map = $groupBy(response, function(obj) {// Group By - This returns map{key:groupby,value:[obj,obj,obj]}
		return obj.sub_category_name;
	});	
	
	for ( var m in map) {
		count++;
		content += '<tr class="border_bottom"><td class="rowSection rowHighlight" colspan="13" style="font-weight:bold">'
			+ m + '</td></tr>';
		for ( var i = 0; i < map[m].length; i++) {			
			constructContentTblSTVariance(map[m][i]);
			
			//Split Pages - Starts		
			var firstPageRecords = 10;
			var otherPageRecords = 10;
			/*if(response[i].article_no.length > 35){
				count = count + 0.5*(response[i].article_no.length/35);
			}*/
			if (i >= (map[m][i].length - 1)){
				content += '</tbody></table>';
				content +='<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: PB Pack Breakdown, L Linked, D Deleted, S Style , PR Product Recalled</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
			}
			if(count>=firstPageRecords && !firstPageCreated){
				count =0;
				firstPageCreated = true;			
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable;	
			}else {
				if (i >= (map[m][i].length - 1)){
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
}
/**
 * Builds table header for print page
 */
function constructHeaderTblSTVariance() {	
	printHeadInnerTable = '<div class="page"><table cellspacing="0" class="printDeviceLogTable ContentTable" style="font-size: 15px;height:45%;min-height:560px;max-height:580px;table-layout: fixed; width: 1100px;" width="100%">'
		+'<thead><tr><th rowspan="2" width="50px">Article</th>'
		+'<th rowspan="2" width="150px">Description</th>'
		+'<th rowspan="2" width="50px">Value($)</th>'
		//+'<th rowspan="2" width="50px">Location</th>'
		+'<th rowspan="2" width="50px">Base</br>Count</th>'
		+'<th colspan="4" class="centerValue columnDivider" width="250px">Re-Count</th>'
		+'<th rowspan="2" class="centerValue" width="50px">Total</br>Count</th>'
		+'<th rowspan="2" class="centerValue" width="50px">SOH</th>'
		+'<th colspan="2" class="centerValue columnDivider">Variance</th>'
		+'</tr><tr class="subHeader">'
		+'<th class="centerValue" width="25px">1</th>'
		+'<th class="centerValue" width="25px">2</th>'
		+'<th class="centerValue" width="25px">3</th>'
		+'<th class="centerValue" width="25px">4</th>'
		+'<th class="centerValue" width="50px">Qty.</th>'
		+'<th class="centerValue" width="50px">$Value</th></tr></thead>';																						
	
}
/**
 * Builds table content for print page
 * @param data
 */
function constructContentTblSTVariance(data) {
	content += '<tr class="border_bottom"><td  align="left">' + (data.article_no != null ?  data.article_no: '')
	+ '</td><td class="centerValue">' +  (data.article_desc != null ?  data.article_desc: '')
	+ '</td><td class="centerValue">' +  (data.sell_price != null ? data.sell_price: '')
	//+ '</td><td class="centerValue">' +  (data.location != null ? data.location: '')
	+ '</td><td class="centerValue">' +  (data.base_count != null ? data.base_count: '')
	+ '</td><td class="centerValue">' +  (data.count_1 != null ? data.count_1: '')
	+ '</td><td class="centerValue">' +  (data.count_2 != null ? data.count_2: '')
	+ '</td><td class="centerValue">' +  (data.count_3 != null ? data.count_3: '')
	+ '</td><td class="centerValue">' +  (data.count_4 != null ? data.count_4: '')
	+ '</td><td class="centerValue">' +  (data.final_count != null ? data.final_count: '')	
	+ '</td><td class="centerValue">' +  (data.soh != null ? data.soh : '')
	+ '</td><td class="centerValue">' +  (data.var_qty != null ? data.var_qty: '')
	+ '</td><td class="centerValue">' +  (data.var_value != null ? data.var_value: '');
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

function prepareVarianceReportParam(area){
	var deptArray = new Array();
	var catArray = new Array();
	var subCatArray = new Array();
	var segArray = new Array();


	if(area.find('#varianceArticleH').is(':checked')){
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
		area.find('#varianceReportDeptDrpDwnUl').find('.deptDrpDwnChkBx:checked').each(function(){
			deptArray[deptArray.length] = $(this).val();
		});
	}
	var addCritArray =  [];
	//Added R17.06 Filter Changes .. 
	/*if(area.find('#om_gt').val() != undefined && area.find('#om_gt').val() != ''){
		addCritArray.push({ iv_field: "OM",iv_criteria: "GT",iv_value:area.find('#om_gt').val()});
	}
	if(area.find('#qty_gt').val() != undefined && area.find('#qty_gt').val() != ''){
		addCritArray.push({iv_field: "QTY",iv_criteria: "GT",iv_value:area.find('#qty_gt').val()});
	}
	if(area.find('#value_gt').val() != undefined && area.find('#value_gt').val() != ''){
		addCritArray.push({iv_field: "D_VALUE",iv_criteria: "GT",iv_value:area.find('#value_gt').val()});
	}*/
	if($('.valueCritOm').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'OM',
			iv_criteria:  $('.valueCritOm').attr('name'),
			iv_value:$('.valueCritOm').val() });
	}
	if($('.valueCritLessOm').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'OM',
			iv_criteria:  $('.valueCritLessOm').attr('name'),
			iv_value:$('.valueCritLessOm').val() });
	}
	if($('.valueCritQty').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'QTY',
			iv_criteria:  $('.valueCritQty').attr('name'),
			iv_value:$('.valueCritQty').val() });
	}
	if($('.valueCritLessQty').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'QTY',
			iv_criteria:  $('.valueCritLessQty').attr('name'),
			iv_value:$('.valueCritLessQty').val() });
	}
	if($('.valueCritValue').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'D_VALUE',
			iv_criteria:  $('.valueCritValue').attr('name'),
			iv_value:$('.valueCritValue').val() });
	}
	if($('.valueCritLessValue').val().trim()!= ''){		
		addCritArray.push({ 
			iv_field: 'D_VALUE',
			iv_criteria:  $('.valueCritLessValue').attr('name'),
			iv_value:$('.valueCritLessValue').val() });
	}
	
	var param = {
			"iv_dept" : deptArray.join(","),
			"iv_cat" : catArray.join(","),
			"iv_sub_cat" : subCatArray.join(","),
			"iv_seg" : segArray.join(","),
			"iv_stocktake_id" : $("#reportDetailsStockTakeId").html(),
			/*"iv_om_gt" : getEmptyIfNull(area.find('#om_gt').val()),
			"iv_qty_gt" : getEmptyIfNull(area.find('#qty_gt').val()),
			"iv_value_gt" : getEmptyIfNull(area.find('#value_gt').val()),*/
			"iv_sales_org":$("#posSite").val(),
			"iv_user_id":$("#loginUserId").val(),
			"addl_crit_info" : addCritArray,
			"iv_var_status":"PENDING",
			"iv_article_no":"", 
			"iv_article_barcode":"", 
			"iv_barcode_flag":"",
			"iv_expand_mode":"Y",
			"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
	};
	
	return param;
}

function getAcceptVarianceParam(checkObj){
	var articleList = [];
	if(responseP.length > 0 && responseP[0].article_no != undefined){
		for(var i=0; i<responseP.length; i++){
			if(checkObj.hasOwnProperty(responseP[i].sub_cat)){
				articleList.push({
					iv_article_no : responseP[i].article_no,
					iv_var_qty : responseP[i].var_qty,
					iv_var_amt : responseP[i].var_value,
					iv_dept : responseP[i].dept,
					iv_cat : responseP[i].cat,
					iv_sub_cat : responseP[i].sub_cat,
					iv_seg : responseP[i].seg
				});
			}
		}
	}	
	
	var param = {
			"article_list" : articleList,
			"iv_sales_org" : "",
			"iv_user_id" : $('#loginUserId').val(),
			"iv_stocktake_id" : $("#reportDetailsStockTakeId").html()
	};
	
	return param;
}

function getStartStockTakeCountParam(){
	var deptArray = new Array();
	
	if(responseP.length > 0 && responseP[0].article_no != undefined){
		for(var i=0; i<responseP.length; i++){
			deptArray[deptArray.length] = responseP[i].dept;
		}
	}	
	
	var param = {
					"iv_session_id":"",
					"iv_sales_org":$('#salesOrg').val(),
					"iv_site_no":$('#posSite').val(),
					"iv_st_id":$("#reportDetailsStockTakeId").html(),
					"iv_article_no":"",
					"iv_barcode_flag":"",
					"iv_article_barcode":"",
					"iv_uom":"",
					"iv_weight":"",
					"iv_count":"",
					"iv_st_loc_id":"",
					"iv_st_loc_no":"",
					"iv_st_aisle":"",
					"iv_st_side":"",
					"iv_st_bay":"",
					"iv_plano_loc_flg":"",
					"iv_userid":$('#loginUserId').val(),
					"iv_sell_price":"",
					"iv_soh":"",
					"iv_location_finish":"",
					"iv_count_finish":"",
					"iv_dept_finish":"Y",
					"iv_dept_lst":deptArray.join(","),
					"iv_audit_flag":"",
					"iv_audit_action":"",
					"iv_audit_finish":"",
					"iv_msd_art_flg":"",
					"iv_recount_flg":"",
					"iv_unknown_item_flag":"",
					"iv_sequence":"",
					"iv_regenerate_msd":""
		};
	
	//allInputs="Sub-categories: "+subCatArray.join(",")+"|"+iv_om_gt+"/"+iv_qty_gt+"/"+iv_value_gt;
	
	return param;
}

function callStockTakeVarianceJasperPrint(param)
{   var applyGroupBy = 'Y';
	var content = [];
	var obj={	
			stockTakePrint  : stockTakePrint,
			reportResult	: content,
			reportFor		: allInputs,
			storeNo 		: $('#posSite').val(),
			storeName 		: $('#posSiteName').val(),		
			totalCount		: content.length,
			applyGroupby	: applyGroupBy,
			param 			: param
			};
	console.log(JSON.stringify(obj));
	$.ajax({
	url: "../stockTakeVarianceReport/printStockVarianceReportPDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        //startLoading();
    },
	success: function(response, textStatus ){
	if(response.data == 'success')
		{
		//stopLoading();
		}
	},
	error: function(xhr, textStatus, errorThrown){
		stopLoading();
	console.log('request failed'+errorThrown);
	}
	});
}

var printVarianceContent = function(){
	$('#stockTakeForm').attr("action", "../stockTakeVarianceReport/downloadStockTakeArticleCountReportPdf.pdf");
	$('#stockTakeForm').attr('target','_blank');
	$('#stockTakeForm').attr('method','get');
	$('#stockTakeForm').submit();
};

function getPrintExportDataForVaraince(){
	var $tbl =  $('#variance_rpt_subcat_'+varianceReportTabIndex+'_table');
	var isSelectAll = $tbl.find('#thead_variance_rpt_subcat_'+varianceReportTabIndex).find('.selectAllPrint').is(':checked');
	var param = '';
	var confObj = $('#variance_rpt_subcat_'+varianceReportTabIndex+'_table').data('confObj');
	var cont = confObj.content;
	var subCat = '';
	var subCatAll = '';
	for(var i = 0;i<cont.length;i++){
		if(isSelectAll || cont[i].sub_cat_selected){
			 subCat += (subCat != '' ? (','+cont[i].sub_cat) : cont[i].sub_cat);
		}else{
			subCatAll += (subCatAll != '' ? (','+cont[i].sub_cat) : cont[i].sub_cat);
		}
	}
	param = varianceRptParam;
	param.iv_sub_cat = subCat == '' ? subCatAll : subCat;
	return param;
}

function bindVarianceRptActionBtns(){
	$('#acceptVariance').unbind('click').click(function(){
		if(countedByStUser && !isCurrentUserSt){
			$.fn.warnPopup('','You are not authorised to Apply Variance to this stocktake','Accept Variance','','',function(e){e.data.dialog.dialog('close');});
		}else{
			var warningMsg =  "Are you sure you want to accept variance?";
			$.fn.warnPopup('warn',warningMsg,'Confirmation',triggerAcptVarianceYes,triggerAcptVarianceNo,'',$(this));	
		}			
	});
	
	$('.finaliseStocktakeClass').unbind('click').click(function(){
		if(showFinalizeButton){
			var warningMsg =  "Are you sure you want to Finalise StockTake?";
			$.fn.warnPopup('warn',warningMsg,'Confirmation',triggerFinaliseStkTakeYes,triggerFinaliseStkTakeNo,'',$(this));		
		}else {																																		// Defect_10520 
			$.fn.warnPopup('','You are not authorised to Finalise this Stocktake','Stocktake Finalise','','',function(e){e.data.dialog.dialog('close');});
		}
		
		
	});
	clearGroupByVariance();
}
function clearGroupByVariance(){
	var triggerd = false;
	var area = '';
	 area = "#reportContent"+reporttabIndex+"_pend";
	if (varianceReportTabIndex == 0){
	 area = "#reportContent"+reporttabIndex+"_pend";	
	}else if (varianceReportTabIndex == 2){
	 area = "#reportContent"+reporttabIndex+"_comp";
	}	
	$('#reportContent2_pend').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').append(filterOpenBtn);
	$('#reportContent2_pend').find('#filterOpen3').unbind('click').click(function(){
		$('#reportContent2_pend').find('.tableActionsBtnsWrapper').find('.lookupActionWrapper').append(filterClearBtn);
		$('.filterClear3').removeClass('hideBlock');
		$('.filterOpen3').addClass('hideBlock');
		$('#reportContent2_pend').find('.group_cont_table').removeClass('hideBlock');
		$('#reportContent2_pend').find('.tableActionsWrapper').html('');
		filterContentVariance.appendTo("#tablefilters3");
		if(filterContentVariance.length != 0){
			$('#reportContent2_pend').find('.tableActionsWrapper').append($('#tablefilters3'));
		}else{
			$('#reportContent2_pend').find('.tableActionsWrapper').append(cloneVariance);
			loadFilterValues();
		}
		if(!filterApplyClicked){
			if(isNationalStocktake){
				$("#varianceReportArticleHierarchyId").find("input[type=radio]").prop('checked',false);
			}else{
				$("#varianceReportArticleHierarchyId").find('.deptLstCnt').text($("#varianceReportArticleHierarchyId .deptlst").find("input[type=checkbox]:checked").length);
			}
			$("#varianceReportArticleHierarchyId").find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
			$("#varianceReportArticleHierarchyId").find('.noSelectionCat,.noSelectionSub,.noSelectionSeg').removeClass('hideBlock');
			$("#varianceReportArticleHierarchyId").find('.catLstCnt,.sCatLstCnt,.segLstCnt').text('0');
			$("#varianceReportArticleHierarchyId").find('.sCatSelectAll,.catSelectAll,.segSelectAll').prop('checked',false);
		}
		keyPressFunctionVfilter();
		$('#reportContent2_pend').find('.tableActionsWrapper').find('#tablefilters3').removeClass('hideBlock');
    	//$('#reportContent2_pend').find('.tableActionsWrapper').find('#tablefilters3').find('#varianceFilterDiv').removeClass('hideBlock');
    	$('#reportContent2_pend').find('.noChildNew ').find('.group_cont_table').remove();  // to remove unwanted filters intable
		populateFiltersForVarianceReport();
		bindFilterEventsForVarainceReport();
		
	});
	/*$(area).find('.groupByOpen').addClass("hideBlock");
	$(area).find('.groupByClear').removeClass("hideBlock");*/
			
	$('#reportContent2_pend').find('#filterClear3').unbind('click').click(function(){
		$('.filterOpen3').addClass('hideBlock');
		$('.filterOpen3').removeClass('hideBlock');
	});
	
	$(area).find('.groupByClear').unbind('click').click(function(){
		triggerd = true;
		Groupby=false;
		clearGroupByAction(triggerd);	
		$('.varSubTable tr td').css('padding-right','5px');
	});$(area).find('.groupByOpen').unbind('click').click(function(){
		triggerd = true;
		Groupby=true;
		clearGroupByAction(triggerd);
	});
}
function clearGroupByAction(triggerd){
	var area = '';
	 area = "#reportContent"+reporttabIndex+"_pend";	
	if (varianceReportTabIndex == 0){
		 area = "#reportContent"+reporttabIndex+"_pend";	
		}else if (varianceReportTabIndex == 2){
		 area = "#reportContent"+reporttabIndex+"_comp";
		}
	if(triggerd	&& $('.varMainTable_'+varianceReportTabIndex+' tr').length > 0){
		$tblhold = $(area); 
	    confObj = (new tblReportVariance(responseP));
	    $tblhold.loadtbl(confObj);
		}
		else if(triggerd	&& $('.varMainTable_'+varianceReportTabIndex+' tr').length == 0){
		$tblhold = $(area);
		groupVarienceList(responseP);
		confObj = (new tblReportVarianceSubCategory(varList));
	    $tblhold.loadtbl(confObj);
	    
		}
	var footer = $('.varMainTable_'+varianceReportTabIndex+'').closest("div").find('.tableFooter');
	if (varianceReportTabIndex == 0){
		$(footer).html("").append(legend).append(pageActPend);
	}else if(varianceReportTabIndex == 2) {
		if(msdCompFlag == 'Y' && glSTStatus == "OPEN" && ($('#varianceCompletedLabel').attr('perc') == 100)){
			$(footer).html("").append(legend).append(pageActComp);
		}else {
			$(footer).html("").append(legend);
		}
	}
		if(!Groupby){
			$(area).find('.group_cont_table ').addClass("hideBlock")
			$(area).find('.groupByClear').addClass("hideBlock");			
			$(area).find('.groupByOpen').removeClass("hideBlock");		
		}
		else if(Groupby){
			$(area).find('.group_cont_table ').removeClass("hideBlock");
			$(area).find('.groupByOpen').addClass("hideBlock");
			$(area).find('.groupByClear').removeClass("hideBlock");
		}
		clearGroupByVariance();
}
//bind events for stocktake variance report location
function showLocationPopupEvent(){
	$('.stVarlocation').each(function(data){
		$(this).unbind('click');
		$(this).click(function(data){			
			var $dialog = $('#dialog-com-locationsST');			
			resObj = [];
			var sellableCount = 0;			
			var sellable = false;
			var locationCount = 0;
			var detail = $(this).closest('tr');
			var articleNo = detail.find('td:first').html();
			var articleNoIndicator = $(this).closest('tr').find('td:first').html().split(" ")[0];
			var desc = detail.find('td:eq(1)').html();
			var count = detail.find('td:eq(9)').html();
			var value = detail.find('td:eq(12)').html();
			//12067
			var base_uom = (detail.data('obj').base_uom||'');
		    var row = '<strong>Article '+articleNo+' - '+desc+'</strong>';
		    row += '<br> </br>';
			row  += '<strong>  Total Count : '+count+' , Total Value ($) : '+value+'</strong>';
			row += '<br> </br>';
			row += '<div class="paginationWrapper  paginationDivVerifyVendorPopup paginationDiv hideBlock" id="paginationDiv1">' + '<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>';
			row += '<table  style="width:100%" class="ContentTable"><tbody class="uomRadioTablePopUp"><tr><th>Location Name</th><th >Count</th> </tr>';
			if(locationMap[articleNo] == undefined){
				articleNo = articleNoIndicator;
			}else {
				articleNo = articleNo;
			}
			if(locationMap[articleNo].length >0 ){
				var getRes = responseMap[articleNo];
			for ( var k = 0; k < locationMap[articleNo].length; k++) {
				var resObj = locationMap[articleNo];
				if(resObj[k].perpetual_flag == 'Y' ){
					var count = 0;
					//if((getRes[0].base_uom != undefined && getRes[0].base_uom == 'KG') || (getRes[0].base_uom != undefined && getRes[0].base_uom == 'L')){
						//count = 0;
						//12067
					//R18.01 Defect - 12654 - Fix, Defect-12666 - Fix
					count = correctDecimalPostion(resObj[k].scanned_count||'');
					if(getRes[0] != undefined && getRes[0].random_weight_flg != undefined && getRes[0].random_weight_flg == 'Y'){
						row += '<tr><td ><div>'+resObj[k].loc_name+'</td><td><div style="float:left;width:50%;">'
						+(Number(resObj[k].scanned_count_qty).toFixedDown(3)) + ((resObj[k].scanned_pi_uom||'')!='' ? (' '+resObj[k].scanned_pi_uom) : '')
						+' & '+(count) + ((getRes[0].base_uom||'')!='' ? (' '+getRes[0].base_uom) : '')+'</div>';
						if(resObj[k].cpbd_flag != undefined &&  resObj[k].cpbd_flag== 'Y')
						{row +='<div style="float:left;width:50%;">'
						+((resObj[k].cpbd_uom != null && resObj[k].cpbd_uom != '')?resObj[k].cpbd_uom:'MPK')+('('+(resObj[k].complex_pack_brk_base_qty || 0)+')')
						+'</div>';
						}
						row +='</td></tr>';
						locationCount++;
					}else{
						row += '<tr><td >'+resObj[k].loc_name+'</td><td><div style="float:left;width:50%;">'+(count) + (((resObj[k]!= undefined && resObj[k].scanned_uom)||'')!='' ? (' '+resObj[k].scanned_uom) : '')+'</div>';
						if(resObj[k].cpbd_flag != undefined &&  resObj[k].cpbd_flag== 'Y'){
							row +='<div style="float:left;width:50%;">'
							+((resObj[k].cpbd_uom != null && resObj[k].cpbd_uom != '')?resObj[k].cpbd_uom:'MPK')+('('+(resObj[k].complex_pack_brk_base_qty || 0)+')')
							+'</div>';
						}
						row +='</td></tr>';
						locationCount++;
					}
					//}else{
						//count = 0;
						//count = Number(resObj[k].final_count).toFixed(0);
						//row += '<tr><td >'+resObj[k].loc_name+'</td><td>'+(count)+'</td></tr>';	
					//}
				}else {
					sellable = true;
					var countVal =Number(resObj[k].final_count);
					sellableCount = Number(sellableCount +countVal);
				}
			}
			if(sellable && sellableCount>0){
				var countable = 0;
				//if((getRes[0].base_uom != undefined && getRes[0].base_uom == 'KG') || (getRes[0].base_uom != undefined && getRes[0].base_uom == 'L')){
					//countable =Number(sellableCount).toFixed(3);
				//}else{
					countable =correctDecimalPostion(sellableCount);
				//}
				//12067
				//R18.01 Defect - 12654 - Fix cant provided for sellable articles 
				/*if(getRes[k] != undefined && getRes[k].random_weight_flg != undefined && getRes[k].random_weight_flg == 'Y'){
					row += '<tr><td >Sellable</td><td>'
					+(Number(resObj[k].scanned_count_qty).toFixedDown(3)) + ((resObj[k].scanned_uom||'')!='' ? (' '+resObj[k].scanned_uom) : '')
					+' & '+(countable) + ((resObj[k].base_uom||'')!='' ? (' '+resObj[k].base_uom) : '')
					+'</td></tr>';
				}else{
					row += '<tr><td >Sellable</td><td>'+(countable) + ((resObj[k].scanned_uom||'')!='' ? (' '+resObj[k].scanned_uom) : '')+'</td></tr>';
				}	*/
				row += '<tr><td >Sellable</td><td>'+countable + ((base_uom||'')!='' ? (' '+base_uom) : '')+'</td></tr>';	
				}
				row += '</tbody></table>';
				$dialog.find(".ContentTableWrapper").html("");		
				$dialog.find(".ContentTableWrapper").html(row);	
				//Defect_12649, 12650 - Fix
				if(row != '' && row.includes('td') && ((sellable && sellableCount>0)||(locationCount > 1))){
				$dialog.dialog('open');
				paginationforLocations($dialog.find('.uomRadioTablePopUp').find('tr').length-1);
				$dialog.parent().css('top', '800px');
				$dialog.parent().css('left', '450px');
				if($dialog.dialog('open').is(':visible')){
					$('#dialog-com-locationsST').find('.actionBtn').removeClass('hideBlock');
				}else{
					$('#dialog-com-locationsST').find('.actionBtn').addClass('hideBlock');
				}
				}
			}			
		});	
});
}
var correctDecimalPostion = function(val){
	if(val != null && val != '' && val != undefined){
		var negChk = (val < 0 ? (Number(Math.abs(val)%1>0)) :false);		//negative value Chk
		if((Number(val)%1>0)||(negChk)){
			val = Number(val).toFixed(3);
		}else{
			val = Number(val).toFixed(0);
		}
	}
	return val;
}
function paginationforLocations(recCnt){		
    var cnt = 1;
    var $paginatioDiv = '';	
    currentPageInPopup = 1;
    var i = 1;
	$paginatioDiv = $('.paginationDivVerifyVendorPopup');		        
	if (recCnt > 5) {
	$paginatioDiv.removeClass('hideBlock').pagination({ 
	  items: recCnt,  
	  itemsOnPage: 5,  
	  cssStyle: 'compact-theme', 
	  currentPage: currentPageInPopup, 
	  onPageClick: function(pageNumber) {
		  getpageDataforLocations(pageNumber);
      }
    });
	} else {
	$paginatioDiv.addClass('hideBlock');
	}	
	$('#dialog-com-locationsST tbody tr td').parent().each(function() {
            $(this).attr('class', '');
            $(this).addClass('#dialog-com-locationsST').addClass('pagNo-' + cnt);
            if (cnt > 1){ 
            	$(this).addClass('hideBlock'); 
            }
            if (i % 5 == 0) {
              cnt++;
            }
            i++;
          });
}
function getpageDataforLocations(pageNo) {
	  currentPageInPopup = pageNo;
	  var pageClass = 'pagNo-' + pageNo;
	  $('#dialog-com-locationsST tbody tr td').parent().each(function() {
	      if ($(this).hasClass(pageClass)) { $(this).removeClass('hideBlock');}
	      else { $(this).addClass('hideBlock'); }
	    });
	}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
var triggerAcptVarianceYes = function(e)	{
	var $elem = e.data.msg;
	$elem.dialog('close');
	var array = new Array();	
	//var checkObj = {};
	//var selectedContSize = Object.size(selectedSubCat);
	$.each($('.varMainTable_'+varianceReportTabIndex+'').find('.printSTVarContent'), function(){
		if($(this).is(':checked') && $(this).attr('data-sub-cat') != "printAll"){			
			var newArray=(varMap[$(this).attr('subnamevaraince')]);
			if(newArray != "" && newArray.length >0){
				array.push(newArray[0].sub_cat);
			}
			/*for(var i=0;i<newArray.length;i++){		
			finalArray.push(newArray[i]);
			};*/
		};
	});
	if(array.length == 0){
		$.fn.showCustomMsg(['Please select sub category\'s to accept variance.'],error,'Variance Report');
	}else{
		/*for(i in selectedSubCat){
			checkObj[i] = i;
		}
		$.each( selectedSubCat, function( key, value ) {
			array.push(key);
		});*/
		
		var param = {
				"iv_sub_cat" : array.join(","),
				"iv_sales_org" : "",
				"iv_user_id" : $('#loginUserId').val(),
				"iv_stocktake_id" : $("#reportDetailsStockTakeId").html()
		};
		//param = getAcceptVarianceParam(checkObj);
		
		console.log(reportSTAcceptVarianceUrl+' '+JSON.stringify(param));
		
		$.ajax({
		    type: "POST",
		    url: reportSTAcceptVarianceUrl,
		    data: JSON.stringify(param),
		    beforeSend: function() {
		    	  startLoading();
		      }
		  }).done(function(response) {
			  console.log(JSON.stringify(response));	
				if(response != undefined && response.length > 0 && response[0].msg_code != undefined && response[0].msg_code == 'S'){
					$.fn.showCustomMsg(['Variance saved successfully'],success,'Variance Report');
					$('#refreshSTReportDetailsId').trigger('click');
					selectedSubCat = {};
				} else {
					$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
				}			
		  }).fail(function() {		  
			  		$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
		  }).always(function() {
			  stopLoading();
		  });
	}
};

var triggerAcptVarianceNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');	
};
var triggerFinaliseStkTakeNoActive = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');	
};

var triggerFinaliseStkTakeYesActive = function(e)	{
	var $elem = e.data.msg;
	$elem.dialog('close');
	var param =  {"iv_sales_org": $('#salesOrg').val(),"iv_site_no": $("#posSite").val(),"iv_stocktake_id":$("#reportDetailsStockTakeId").html(),"iv_depts":"", "iv_userid":$('#loginUserId').val(),"iv_ignr_actv_locs":"Y","iv_usr_nm":$('#fullName').val()};
	console.log(stocktakeFinaliseUrl+' '+JSON.stringify(param));
	$.ajax({
	type: "POST",
	url: stocktakeFinaliseUrl,
	data: JSON.stringify(param),
	beforeSend: function() {
		  startLoading();
	  }
	}).done(function(response) {
	  console.log(JSON.stringify(response));	
		if(response != undefined && response.length > 0 && response[0].msg_code != undefined){
			if(response[0].msg_code == 'S'){
				selectedSTRow.closest('tr').find('td:eq(6)').html('<label class="success">COMPLETED</label>');//after finalise it ill change to completed status
				glSTStatus = "COMPLETED";
				handleGetStockTakeReportDetails();
				$.fn.showCustomMsg(['Stock Take Finalised Successfully'],success,'Variance Report');
			}else if(response[0].msg_code == 'F'){
				$.fn.showCustomMsg([response[0].msg],error,'Variance Report');
			}else if(response[0].msg_code == 'R'){
				$.fn.showCustomMsg([response[0].msg+". Please refresh to view the variance."],error,'Variance Report');
			}		
		} else {
			$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
		}			
	}).fail(function() {		  
	  		$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
	}).always(function() {
	  stopLoading();
	});
};


var triggerFinaliseStkTakeYes = function(e)	{
	var $elem = e.data.msg;
	$elem.dialog('close');
	var param =  {"iv_sales_org": $('#salesOrg').val(),"iv_site_no": $("#posSite").val(),"iv_stocktake_id":$("#reportDetailsStockTakeId").html(),"iv_depts":"", "iv_userid":$('#loginUserId').val(),"iv_ignr_actv_locs":"N","iv_usr_nm":$('#fullName').val()};
	console.log(stocktakeFinaliseUrl+' '+JSON.stringify(param));
	$.ajax({
	type: "POST",
	url: stocktakeFinaliseUrl,
	data: JSON.stringify(param),
	beforeSend: function() {
		  startLoading();
	  }
	}).done(function(response) {
	  console.log(JSON.stringify(response));	
		if(response != undefined && response.length > 0 && response[0].msg_code != undefined){
			if(response[0].msg_code == 'S'){
				selectedSTRow.closest('tr').find('td:eq(6)').html('<label class="success">COMPLETED</label>');//after finalise it ill change to completed status
				glSTStatus = "COMPLETED";
				handleGetStockTakeReportDetails();
				$.fn.showCustomMsg(['Stock Take Finalised Successfully'],success,'Variance Report');
			}else if(response[0].msg_code == 'F'){
				$.fn.showCustomMsg([response[0].msg],error,'Variance Report');
			}else if(response[0].msg_code == 'L'){
				$.fn.warnPopup('warn',response[0].msg+"?.",'Confirmation',triggerFinaliseStkTakeYesActive,triggerFinaliseStkTakeNoActive,'',$(this));	
			}else if(response[0].msg_code == 'R'){
				$.fn.showCustomMsg([response[0].msg+". Please refresh to view the variance."],error,'Variance Report');
			}				
		} else {
			$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
		}			
	}).fail(function() {		  
	  		$.fn.showCustomMsg(['Sorry, Some technical issue occured '],error,'Variance Report');
	}).always(function() {
	  stopLoading();
	});
};


var triggerFinaliseStkTakeNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');	
};

function loadFilterValues(){
	
	var splitFilterVal = filterValues.split("|"); 
	if(splitFilterVal.length >0){
		$('.valueCritOm').val(splitFilterVal[0]);
		$('.valueCritLessOm').val(splitFilterVal[1]);
		$('.valueCritQty').val(splitFilterVal[2]);
		$('.valueCritLessQty').val(splitFilterVal[3]);
		$('.valueCritValue').val(splitFilterVal[4]);
		$('.valueCritLessValue').val(splitFilterVal[5]);
	}
}