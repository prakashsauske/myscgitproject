var recordCount;
var a = '';
var flag = false;
var itemsperPage =10;
var pagNo =1;
/*----------------******  Department change function   *****--------------- */
$(document)
		.ready(
				function() {
					 $('#popupBoxClose').click( function() {            
				          unloadPopupBox();
				      });
					$('.reportContent').on('change','#suggestedForecast',function(){
						flag= true;
						$(this).addClass('ForecastChange');
						changingtableval();
					});
					
					/*$('input').keypress(function(e) {
				        var a = [];
				        var k = e.which;
				    
				        for (i = 48; i < 58; i++)
				            a.push(i);
				    
				        if (!($.inArray(k,a)>=0))
				            e.preventDefault();
				    });*/
					
					$('.reportContent').on('keypress','#required_qty',function(e){
						 var kp = [];
					        var k = e.which;
					    
					        for (i = 48; i < 58; i++)
					        	kp.push(i);
					    
					        if (!($.inArray(k,kp)>=0))
					            e.preventDefault();
					});
					
					
					
					$('.headWrapper a').bind("click", function(e) {
						e.preventDefault();
						var href = $(this).attr('href');
						if(flag)
						{
						$("#dialog-saveChanges").dialog('open');
						$('.popupActionsWrapper').on('click','#okbtn',function(){
							reportnav1(pagNo);
							$('#dialog-saveChanges').dialog('close');
						});
						$('.popupActionsWrapper').on('click','#cancelbtn',function(){
					            /*generateReport( pagNo, '',"");*/
					            $('#dialog-saveChanges').dialog('close');
					            window.location.href = href;
						});
						} else {
							window.location.href = href;
						}
					});
					/*function reportnav()
					{
						var result = "";
						var first = true;
						var str = "";
						$('tr.ForecastChange').each( function(index, element ){
						    alert($(this).find('#artId').text());
						    alert($(this).find('input.required_qty').val());
						    result = $(this).find('#artId').text().concat('-').concat($(this).find('input.required_qty').val());
						    alert(result);
						    if(first) {
						    	str+=result;
						        first=false;
						        alert(str);
						    } else {
						    	str+=","+result;
						    	alert(str);
						    }
						});
						generateReport(1,'noPrint',str);
					}
					function reportnav1()
					{
						var result = "";
						var first = true;
						var str = "";
						$('tr.ForecastChange').each( function(index, element ){
						    alert($(this).eq(0).text());
						    alert($(this).find('input.required_qty').val());
						    result = $(this).eq(0).text().concat('-').concat($(this).find('input.required_qty').val());
						    alert(result);
						    if(first) {
						    	str+=result;
						        first=false;
						        alert(str);
						    } else {
						    	str+=","+result;
						    	alert(str);
						    }
						});
						unloadPopupBox();
						generateReport(1,'noPrint',str);
					}*/
					/*$('.reportContent').on('click','button.actionBtn',reportnav);*/
					$('.reportContent').on('click','#Save',reportnav);
					$("#accordion").accordion({
						header : "h3.mainAccordion",
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

					// Code for input box default text handling
					$('.textbox').focus(function() {
						if ($(this).val() == $(this).attr('defaultVal')) {
							$(this).val('');
							$(this).removeClass("textboxDefaultText");
						}
					});

					$('.textbox').blur(function() {
						if ($(this).val() == '') {
							$(this).val($(this).attr('defaultVal'));
							$(this).addClass("textboxDefaultText");
						}
					});
					$('.print').click(function() {
						/*a = window.open ();
						a.document.write('<h2 class="wait">We are processing your request, please wait....</h2>');*/
						printReport();
					});
					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});
					var Day = new Date().getDay();
					$("#inputDay").val(Day);
					
					$('#daily').click(function(){
						$("#dailySelect").removeClass('hideBlock');
						$("#weeklySelect").addClass('hideBlock');				
					});
					
					$('#weekly').click(function(){
						$("#weeklySelect").removeClass('hideBlock');
						$("#dailySelect").addClass('hideBlock');				
					});

					// Added for the Enter issue - Starts - xspyn 

					$("#article").keypress(function(event){
						 var keycode = event.which;
					    if(keycode == 13)// the enter key code
					        {
					    	 event.preventDefault();
					    	$("#generateReport").click();
					    	return false;
					        }
					});

					// Added for the Enter issue - Ends - xspyn

				
					 $("#generateReport").click(function(){
						 //$('#fetch').submit();
						 
						 generateReport(1,'noPrint',"");
						 pagNo =1;
						 //$(".reportContent").removeClass('hideBlock');
					  $('#accordion').accordion({active : true });
					  });
					 

					$("#tabs").tabs();
					/** ***********code for back button click********* */
					$('#backBtn').click(function() {
						/*window.location.href = "../login/goingHome.htm";*/
						var href = $(this).attr('href');
						if(flag)
						{
						$("#dialog-saveChanges").dialog('open');
						$('.popupActionsWrapper').on('click','#okbtn',function(){
							reportnav1(pagNo);
							$('#dialog-saveChanges').dialog('close');
						});
						$('.popupActionsWrapper').on('click','#cancelbtn',function(){
					            /*generateReport( pagNo, '',"");*/
					            $('#dialog-saveChanges').dialog('close');
						window.location.href = "../login/goingHome.htm";
						});
						} else {
							window.location.href = "../login/goingHome.htm";
						}
					});
					/** ***********end of code for back button click********* */

					/** ********code for close button click*********** */
					$('#closeLink').click(function() {
						hideError();
						closeAccordian();
					});
					/*----------------******  Category Click function   *****--------------- */

					$("#bakeryCategoryDrpDwnActiveId").click(function(){ 
						if( $('#bakeryCategoryDrpDwnDiv').hasClass('active')){
							$("#bakeryCategoryDrpDwnDiv").removeClass('active');
						} else {
							$("#bakeryCategoryDrpDwnDiv").addClass('active');
						}
					});
					
					
					 $('html').click(function() {
						$(".selectDropdown").removeClass('active');
					});

					$('.selectDropdown').click(function(event){
					   event.stopPropagation();
					});
					
					$("#bakeryCategoryDrpDwnDone").on("click", function() {// DOne button inside category dropdown	
						 var scroll = $(window).scrollTop();
						$("#bakeryCategoryDrpDwnDiv").removeClass('active');
					});
					$("#bakeryCategoryDrpDwnCancel").on("click", function() {//cancel button inside category dropdown																		
						if($("#allCatChkBox").prop('checked') == false){
							$("#allCatChkBox").trigger('click');//to select all categories by default
						}
						//$("#bakeryCategoryDrpDwnDiv").removeClass('active'); // for defect 14744
					});
					
				});
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function changingtableval()
{
	$('tr.ForecastChange').each( function(index, element ){
	    
	    
	    
	    var totalArticleReq = 0.0;
	    var totalCuts = 0.0;
	    var totalDoughWt = 0.0;
	    				    
	    totalArticleReq = Math.ceil($(this).find('input.required_qty').val())*($(this).find('#master_size').text());
	    
	    $(this).find('#art_req').text(totalArticleReq);
	    
	    totalCuts = totalArticleReq	/ $(this).find('#itempc').text();
	    
	    if($(this).find('#itempc').text() == 0)
	    	{
	    	$(this).find('#total_cuts').text(0);
	    	}
	    else
	    	{
	    	$(this).find('#total_cuts').text(totalCuts.toFixed(1));
	    	}
	    
	 
	    if($(this).find('#itempc').text() == 0)
    	{
	    	totalDoughWt = 0 * $(this).find('#dowpc').text();
    	}
	    else
    	{
    	 totalDoughWt = totalCuts* $(this).find('#dowpc').text();
    	}
	    
	   
	    
	    $(this).find('#dough_weight').text(totalDoughWt.toFixed(1));
	    
	});	
}




function reportnav()
{
	var result = "";
	
	var first = true;

	var str = "";
		
	$('tr.ForecastChange').each( function(index, element ){
		
		var qty = $(this).find('input.required_qty').val();
		
		if($(this).find('input.required_qty').val() == "" || $(this).find('input.required_qty').val() == null)
			{
				qty = null;
			}
		
	    result = $(this).find('#artId').text().concat('-').concat(qty);
	   
	    if(first) {
	    	str+=result;
	        first=false;
	    } else {
	    	str+=","+result;
	    }
	    
	});
	
	generateReport(pagNo,'noPrint',str);
}



function reportnav1(currentPage)
{
	var result = "";
	
	var first = true;

	var str = "";
		
	$('tr.ForecastChange').each( function(index, element ){
		
		
		var qty = $(this).find('input.required_qty').val();
		
		if($(this).find('input.required_qty').val() == "" || $(this).find('input.required_qty').val() == null)
			{
				qty = null;
			}
		
	    
	    result = $(this).find('#artId').text().concat('-').concat(qty);
	   
	    if(first) {
	    	str+=result;
	        first=false;
	    } else {
	    	str+=","+result;
	    }
	    
	});
	generateReport(currentPage,'noPrint',str);
}






/*$('#popupBoxClose').click( function() {            
    unloadPopupBox();
});






$('.reportContent').on('change','#suggestedForecast',function(){
	flag= true;
	alert("Onchange Method");
	$(this).addClass('ForecastChange');
	
});

function reportnav()
{
	var result = "";
	
	var first = true;

	var str = "";
		
	$('tr.ForecastChange').each( function(index, element ){
		
		
	    alert($(this).find('#artId').text());
	    
	    alert($(this).find('input.required_qty').val());
	    
	    result = $(this).find('#artId').text().concat('-').concat($(this).find('input.required_qty').val());
	    alert(result);
	   
	    if(first) {
	    	str+=result;
	        first=false;
	        alert(str);
	    } else {
	    	str+=","+result;
	    	alert(str);
	    }
	    
	});
	
	generateReport(1,'noPrint',str);
}



function reportnav1()
{
	var result = "";
	
	var first = true;

	var str = "";
		
	$('tr.ForecastChange').each( function(index, element ){
		
		
	    alert($(this).eq(0).text());
	    
	    alert($(this).find('input.required_qty').val());
	    
	    result = $(this).eq(0).text().concat('-').concat($(this).find('input.required_qty').val());
	    alert(result);
	   
	    if(first) {
	    	str+=result;
	        first=false;
	        alert(str);
	    } else {
	    	str+=","+result;
	    	alert(str);
	    }
	    
	});
	unloadPopupBox();
	generateReport(1,'noPrint',str);
}




$('.reportContent').on('click','button.actionBtn',reportnav);*/
	






function loadPopupBox() {    // To Load the Popupbox
    $('#popup_box').fadeIn("slow");
    $("#container").css({ // this is just for style
        "opacity": "0.3"  
    });         
}  

function unloadPopupBox() {    // TO Unload the Popupbox
    $('#popup_box').fadeOut("slow");
    $("#container").css({ // this is just for style        
        "opacity": "1"  
    }); 
}   

function iterateResult(response, pageNumber,print) {
	var output = $.parseJSON(response);
	var selectedDate = '';
	var fromDate = '';
	var toDate = '';
	var department = '';
	var ppSupplierSearchResults = '';
	var ppArticleSearchResults = '';
	var day = '';
	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.data != null) {
		hideError();
		
		if(output.param != null)
			{
				var param = output.param;
				selectedDate = param.selectedDate;
				fromDate = param.fromDate;
				toDate = param.toDate;
				department = param.department;
				day = param.day;
				recordCount = param.recordCount;
			}
		if(department == 'BAKERY')
		{
			 ppSupplierSearchResults = output.data;
		}
		else 
		{
			ppArticleSearchResults = output.data;
			recordCount = ppArticleSearchResults[0].msg;
		}
		
		currentPage = pageNumber;
		var plannerDailyDetailsHead = '';
		var PlannerDailyDetailsBody = '';
		var plannerWeeklyDetailsHead = '';
		var PlannerWeeklyDetailsBody = '';
		var plannerHtml = '';
		var PlannerDetailsBody = '';
		var footer = '<div class="tableFooter"><div class="legend"><label> Legend: <label class="plannerThisPromo">On Promotion</label></label></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div></div>'
		
		if($('input:radio[name=schedule]:checked').val() == 'daily')
			{
				var plannerPrintHead = '';
				plannerPrintHead = '<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">';
				plannerPrintHead = plannerPrintHead + 'Daily Production Schedule for '+selectedDate+','+day+'</h4></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>'; 
				plannerPrintHead = plannerPrintHead + '<div class="tableActionBtns"><label class="actionBtn" onclick="printReport1();"><label class="print">Print</label></label></div></div>';

				if(department == 'BAKERY')
					{
					for (var key in ppSupplierSearchResults) {
						  if (ppSupplierSearchResults.hasOwnProperty(key)) {
						    console.log(key + ' -> ' + ppSupplierSearchResults[key][0].supplier_name);
						    var supplierNo = key ;
						    var supplierName = ppSupplierSearchResults[key][0].supplier_name;
						    plannerDailyDetailsHead = getPlannerDailyDetailsHead(selectedDate ,department,supplierNo,supplierName);
						    PlannerDailyDetailsBody = getPlannerDailyDetailsBody(ppSupplierSearchResults[key],department,recordCount);
						    plannerHtml = plannerHtml + plannerDailyDetailsHead + PlannerDailyDetailsBody;
						  }
						}
					 plannerHtml = plannerPrintHead + plannerHtml + '</div>' ;
					}
				else {
					plannerDailyDetailsHead = getPlannerDailyDetailsHead(selectedDate ,department,'','');
					PlannerDailyDetailsBody = getPlannerDailyDetailsBody(ppArticleSearchResults,department,recordCount);
				
					PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</div>';
					plannerHtml = plannerPrintHead + plannerDailyDetailsHead + PlannerDailyDetailsBody;
				}
				
			}
		else if($('input:radio[name=schedule]:checked').val() == 'weekly'){
				var plannerWeeklyPrintHead = '';
				plannerWeeklyPrintHead = '<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">';
				plannerWeeklyPrintHead = plannerWeeklyPrintHead +'Weekly  Production Schedule from '+fromDate+' to '+toDate +'</h4></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>'; 
				plannerWeeklyPrintHead = plannerWeeklyPrintHead +'<div class="tableActionBtns"><label class="actionBtn" onclick="printReport1();"><label class="print">Print</label></label></div></div>';
				
				if(department == 'BAKERY')
				{
				for (var key in ppSupplierSearchResults) {
					  if (ppSupplierSearchResults.hasOwnProperty(key)) {
					    console.log(key + ' -> ' + ppSupplierSearchResults[key]);
					    var supplierNo = key ;
					    var supplierName = ppSupplierSearchResults[key][0].supplier_name;
					    plannerWeeklyDetailsHead = getPlannerWeeklyDetailsHead(selectedDate ,department,supplierNo,supplierName,fromDate,toDate);
					    PlannerWeeklyDetailsBody = getPlannerWeeklyDetailsBody(ppSupplierSearchResults[key],department);
					    plannerHtml = plannerHtml + plannerWeeklyDetailsHead + PlannerWeeklyDetailsBody;
					  }
					}
				 plannerHtml = plannerWeeklyPrintHead + plannerHtml + '</div>';
				}
			else{
				plannerWeeklyDetailsHead = getPlannerWeeklyDetailsHead(selectedDate ,department,'','',fromDate,toDate);
				PlannerWeeklyDetailsBody = getPlannerWeeklyDetailsBody(ppArticleSearchResults,department);
				PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'</div>';
				plannerHtml = plannerWeeklyPrintHead + plannerWeeklyDetailsHead + PlannerWeeklyDetailsBody;
			}
			
				
		}
	}
	if(print != 'print'){
	$('#reportContent').html('');
	$('#reportContent').html(reportContent).append('<link rel="stylesheet" href="../../styles/common_new.css" media="print" type="text/css" />');
	$('#reportContent').html(plannerHtml+footer);
	$('#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
	.removeClass('hideBlock');
	$('.ContentTableWrapper .ContentTable tr td').css('padding','17px 9px');
	}
	if (recordCount > 10) {
		showPaginatedContent(recordCount);
	} else {
		showContent(recordCount);
	}
	if(print == 'print'){
			plannerHtml = printContent(response,pageNumber);

		$('#printData').html(printData).append('');
		$('#printData').html(plannerHtml);
		//var a = window.open();
		a.document.body.innerHTML = '';
		a.document.write('<link rel="stylesheet" href="../../styles/common_new.css" type="text/css" />');
		a.document.write('<link rel="stylesheet" href="../../styles/printstyle.css" media="print"  type="text/css" />');
		$('#printData .ContentTableWrapper .ContentTable tr td').css('padding','8px 5px');
		$('#printData .ContentTableWrapper .ContentTable tr th').css('padding','8px 5px');
		$('#printData .ContentTableWrapper .ContentTable tr td').css('font-size','13px');
		$('#printData .ContentTableWrapper .ContentTable tr th').css('font-size','13px');
		$('#printData .ContentTableWrapper .ContentTable').css('overflow','hidden');
		$('#printData .ContentTableWrapper').css('overflow','hidden');
		$('.ContentTable').css('page-break-inside','auto');$('.ContentTable tr').css('page-break-inside','avoid');
		if (department == 'BAKERY')
			{
				$('.ContentTable').css('page-break-after','always');
			}
		a.document.write(document.getElementById('printData').innerHTML);
		//console.log(document.getElementById('printData').innerHTML);
		$("#printReport").hide();
		a.document.close();
		a.focus();
		a.print();
		a.close();
		stopLoading();
		return false;
	}
	stopLoading();

}
function getPlannerDailyDetailsHead(selectedDate ,department,supplierNo,supplierName) 
{
	var plannerDailyDetailsHead = '';
	var lastCssClass = '';
	plannerDailyDetailsHead = plannerDailyDetailsHead +'<table cellspacing="0" class="ContentTable"><thead><tr><td class="rowSection rowHighlight" colspan="17">';
	if(department == 'BAKERY')
		{
			lastCssClass = 'lastColumn';
			department = supplierNo + ' ' + supplierName + ' - ' + 'PROPRIETARY ' +department;
	plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th style="width:15%">Article #</th><th style="width:45%">Description</th><th style="width:15%" class="centerValue" >Promo Price<br/>($)</th>';
	plannerDailyDetailsHead = plannerDailyDetailsHead +'<th class="centerValue" style="width:10%">MPL</th><th style="width:15%" class="centerValue'+lastCssClass+'">Planned Req.<br/>(EA)</th>';
		}
	
	if(department == 'MEAT')
	{
			plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article #</th><th>Description</th><th class="centerValue">Promo Price<br/>($)</th>';
			plannerDailyDetailsHead = plannerDailyDetailsHead +'<th class="centerValue">MPL</th><th class="centerValue'+lastCssClass+'">Planned Req.<br/>(EA)</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead +'<th class="centerValue">SOH</th><th class="centerValue">Prod Req. = <br />Planned Req. -SOH</th><th class="centerValue">Quick Win</th>';
			plannerDailyDetailsHead = plannerDailyDetailsHead +'<th class="centerValue">CUT2</th><th class="centerValue">CUT3</th><th class="centerValue lastColumn">Opening<br/>CUT</th>';
	}
	if(department == 'CHICKEN')
		{
			department='HOT FOOD';
			plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article # </th><th>Description </th><th class="centerValue">Forecast Required</th><th class="centerValue">On Show <br/>@ 8am </th>';		
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">On Show <br/>@ 10am</th>';		
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">On Show <br/>@ 12pm </th>';	
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">On Show <br/>@ 2pm</th>';									
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">On Show <br/>@ 4pm</th>	';
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">On Show <br/>@ 6pm</th>';
			plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue lastColumn">On Show <br/>@ 8pm </th>';
		}
	if(department == 'MINCE')
	{
		plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article # </th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th>Description </th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Forecast Packs Required</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Morning </th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">SOH</th>';		
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Actual</th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Afternoon</th>	';								
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">SOH</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue lastColumn">Actual </th>';
	}
	if(department == 'SEAFOOD')
	{
		plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article # </th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th>Description </th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue lastColumn">Forecast Required</th>';
	}
	if(department == 'BAKERY THAW')
	{
		plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article # </th><th>Description </th><th class="centerValue">Forecast Required</th>';		
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue lastColumn">Product Life </th>';
	}
	if(department == 'BAKERY DOUGH')
	{
		plannerDailyDetailsHead = plannerDailyDetailsHead + department + '</td></tr><tr><th>Article # </th><th>Description </th><th class="centerValue">Forecast Packs<br/>Required</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Packs to Make</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Articles<br/>per Pack</th>	';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Total Articles <br/>Required </th>	';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Items<br/>per Cut</th>	';								
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Total Cuts or<br/>Pieces </th>';	
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Dough Weight<br/>Per Cut (kg)</th>';
		plannerDailyDetailsHead = plannerDailyDetailsHead + '<th class="centerValue">Total Dough<br/>Weight (kg) </th>	';
	}
	plannerDailyDetailsHead = plannerDailyDetailsHead +'</tr></thead>';
	return 	plannerDailyDetailsHead;
}

function getPlannerDailyDetailsBody(ppArticleSearchResults,department,recordcn)
{
	var PlannerDailyDetailsBody = '';
	PlannerDailyDetailsBody = '<tbody>';
	$.each(ppArticleSearchResults, function(i, articleInfo) {
		var cssClass = '';
		var lastCssClass = '';
		if(department == 'BAKERY')
		{
			lastCssClass = 'lastColumn';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<tr id="suggestedForecast">';
		if(articleInfo.promoInd == 'Y')
			cssClass = 'plannerThisPromo plannerLeftDaily'; 
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td id="artId" class="';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + cssClass + '">'+articleInfo.article;
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>PLU :</strong>'+ articleInfo.plu+'</label>';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="sorted">'+articleInfo.article_desc;
		if(department == 'MEAT')
		{	
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>Tray :</strong>'+articleInfo.tray_desc+'</label>';
		}
		if(department == 'MEAT'|| department == 'BAKERY')
		{
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +' </td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.promo_price+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.default_mpl+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue'+lastCssClass+'">'+articleInfo.plannedQty+'</td>';
		}
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'CHICKEN')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_8Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_10Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_12Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_2Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_4Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_6Pm+'</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.on_show_8Pm+'</td>';
		}
		if(department == 'MINCE')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_mrng_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_eve_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'SEAFOOD')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';			
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.tot_ForeCast_Req+'</td>';
		}
		if(department == 'BAKERY THAW')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			var prodlife = articleInfo.zzbest_bef_days;
			if(prodlife == '0')
			{
				prodlife = articleInfo.zzuse_by_days;
				prodlife = prodlife.concat(" days UB");
			}else{
				prodlife = prodlife.concat(" days BB");
			}
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+prodlife+'</td>';
		}
		if(department == 'BAKERY DOUGH')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="forecast_req" class="centerValue forecast_req">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue"><input id="required_qty" class="required_qty" value="'+ articleInfo.required_qty+ '" style="text-align: center;" onfocus="this.select();" autofocus/></td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="master_size" class="centerValue master_size">'+articleInfo.articlesPerPack+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="art_req" class="centerValue art_req">'+articleInfo.total_art_req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="itempc" class="centerValue itempc">'+articleInfo.zzitempc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="total_cuts" class="centerValue total_cuts">'+articleInfo.total_cuts+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="dowpc" class="centerValue dowpc">'+articleInfo.zzdowtpc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td id="dough_weight" class="centerValue dough_weight">'+articleInfo.tot_dough_weight+'</td>';
			
			
			
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tr>';
		
	}
	);
	PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tbody></table>';
	
	if(department == 'BAKERY DOUGH')
		{
		
		var noofpag = Math.ceil(recordcn/10);
		
		/*if(recordcn > 10)
			{*/
		/*alert("Numbe of pages" + $('.reportContent > .paginationDiv').pagination('getPagesCount'));
		alert("Current Page" + $('.reportContent > .paginationDiv').pagination('getCurrentPage'));*/
		
		if(pagNo < noofpag)
			{
			var pag=pagNo+1;
			pagNo = pag;
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<button class="actionBtn" id="SaveNext" onClick="reportnav1('+pag+')"><label>Save & Next</label></button>';
			}
		else
			{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<button class="actionBtn" id="Save" ><label>Save</label></button>';
			}
			
			/*}
		else
			{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<button class="actionBtn" id="SaveNext"><label>Save</label></button>';
			}*/
		
		}
	return PlannerDailyDetailsBody;
}
function getPrintPlannerDailyDetailsBody(ppArticleSearchResults,department)
{
	var PlannerDailyDetailsBody = '';
	PlannerDailyDetailsBody = '<tbody>';
	var s=0;
	var j=0;
	$.each(ppArticleSearchResults, function(i, articleInfo) {
		s=s+1;
		var cssClass = '';
		var lastCssClass = '';
		if(department == 'BAKERY')
		{
			lastCssClass = 'lastColumn';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<tr id="suggestedForecast">';
		if(articleInfo.promoInd == 'Y')
			cssClass = 'plannerThisPromo plannerLeftDaily'; 
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td id="artId" class="';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + cssClass + '">'+articleInfo.article;
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>PLU :</strong>'+ articleInfo.plu+'</label>';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="sorted">'+articleInfo.article_desc;
		if(department == 'MEAT')
		{	
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>Tray :</strong>'+articleInfo.tray_desc+'</label>';
		}
		if(department == 'MEAT'|| department == 'BAKERY')
		{
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +' </td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.promo_price+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.default_mpl+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue'+lastCssClass+'">'+articleInfo.plannedQty+'</td>';
		}
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'CHICKEN')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_8Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_10Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_12Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_2Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_4Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_6Pm+'</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.on_show_8Pm+'</td>';
		}
		if(department == 'MINCE')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_mrng_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_eve_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'SEAFOOD')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';			
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.tot_ForeCast_Req+'</td>';
		}
		if(department == 'BAKERY THAW')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			var prodlife = articleInfo.zzbest_bef_days;
			if(prodlife == '0')
			{
				prodlife = articleInfo.zzuse_by_days;
			}
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+prodlife+'</td>';
		}
		if(department == 'BAKERY DOUGH')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.articlesPerPack+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.total_art_req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.zzitempc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.total_cuts+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.zzdowtpc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_dough_weight+'</td>';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tr>';
		
	}
	);
	PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tbody></table>';
	return PlannerDailyDetailsBody;
}

/*function getPrintPlannerDailyDetailsBody(ppArticleSearchResults,department)
{
	var PlannerDailyDetailsBody = '';
	PlannerDailyDetailsBody = '<tbody>';
	var s=0;
	var j=0;
	$.each(ppArticleSearchResults, function(i, articleInfo) {
		s=s+1;
		var cssClass = '';
		var lastCssClass = '';
		if(department == 'BAKERY')
		{
			lastCssClass = 'lastColumn';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<tr>';
		if(articleInfo.promoInd == 'Y')
			cssClass = 'plannerThisPromo plannerLeftDaily'; 
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + cssClass + '">'+articleInfo.article;
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>PLU :</strong>'+ articleInfo.plu+'</label>';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="sorted">'+articleInfo.article_desc;
		if(department == 'MEAT')
		{	
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<label class="rowSubTitle"><strong>Tray :</strong>'+articleInfo.tray_desc+'</label>';
		}
		if(department == 'MEAT'|| department == 'BAKERY')
		{
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +' </td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.promo_price+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">'+articleInfo.default_mpl+'</td>';
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue'+lastCssClass+'">'+articleInfo.plannedQty+'</td>';
		}
		if(department == 'MEAT')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'CHICKEN')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_8Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_10Am+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_12Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_2Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_4Pm+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.on_show_6Pm+'</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.on_show_8Pm+'</td>';
		}
		if(department == 'MINCE')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_mrng_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.mince_eve_data+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">&nbsp;</td>';							
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">&nbsp;</td>';
		}
		if(department == 'SEAFOOD')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';			
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+articleInfo.tot_ForeCast_Req+'</td>';
		}
		if(department == 'BAKERY THAW')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td><td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';							
			var prodlife = articleInfo.zzbest_bef_days;
			if(prodlife == '0')
			{
				prodlife = articleInfo.zzuse_by_days;
			}
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue lastColumn">'+prodlife+'</td>';
		}
		if(department == 'BAKERY DOUGH')
		{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_ForeCast_Req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.articlesPerPack+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.total_art_req+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.zzitempc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.total_cuts+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.zzdowtpc+'</td>';
			PlannerDailyDetailsBody = PlannerDailyDetailsBody + '<td class="centerValue">'+articleInfo.tot_dough_weight+'</td>';
		}
		PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tr>';
		/*if(department == 'MEAT')
		{
		if(s==8 && j==0)
			{
			PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<tr style="height:30px"></tr>';
			j=j+1;
			}
		}*/
	/*}
	);
	PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</tbody></table>';
	if(department == 'BAKERY DOUGH')
	{
	alert("Length of the Search Results" +ppArticleSearchResults.length);
	var searchLength =ppArticleSearchResults.length;
	PlannerDailyDetailsBody = PlannerDailyDetailsBody +'<button class="actionBtn" id="SaveNext"><label>Save & Next</label></button>';
	}
	return PlannerDailyDetailsBody;
}*/


function getPlannerWeeklyDetailsHead(selectedDate ,department,supplierNo,supplierName,fromDate,toDate) 
{
	var plannerWeeklyDetailsHead = '';
	var district = $('#district').val();
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<table cellspacing="0" class="ContentTable">';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<thead> ';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<tr>';
	if(department == 'BAKERY')
	{
		department = supplierNo + ' ' + supplierName + ' - ' + 'PROPRIETARY ' + department;
	}
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<td class="rowSection rowHighlight" colspan="17">'+department+'</td>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'</tr>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<tr>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="columnDivider" rowspan="2">Qty. </th>';
	if(district == 'UNI' || district == 'LNI' || district == 'SI')
	{
		plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Monday</th>';
		plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Tuesday</th>';
		
	}
	
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Wednesday</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Thursday</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Friday</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Saturday</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Sunday</th>';
	
	if(district != 'UNI' && district != 'LNI' && district != 'SI')
	{
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Monday</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue columnDivider" colspan="2">Tuesday</th>';
		
	}
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="centerValue lastColumn" colspan="2">Total</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'</tr>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<tr class="subHeader">';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn columnDivider">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn">Last</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'<th class="numberColumn lastColumn">This</th>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'</tr>';
	plannerWeeklyDetailsHead = plannerWeeklyDetailsHead +'</thead>';
	return 	plannerWeeklyDetailsHead;
}

function getPlannerWeeklyDetailsBody(ppArticleSearchResults,department)
{
	var PlannerWeeklyDetailsBody = '';
	var district = $('#district').val();
	PlannerWeeklyDetailsBody = '<tbody>';
	$.each(ppArticleSearchResults, function(i, articleInfo) {
		var thisTotalCssClass = '';
		var lastTotalCssClass = '';
		var cssClass = '';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + '<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + '<td class="rowSection rowHighlight" colspan="17">';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + articleInfo.article +' - '+ articleInfo.article_desc;
		if(department == 'MEAT')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<label class="rowSubTitle"><strong>PLU :</strong> ';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+ articleInfo.plu +',&nbsp;<strong>Tray :</strong> '+ articleInfo.tray_desc +'</label>';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">Sale </td>';
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
			{
			if(articleInfo.rcResponse.lastMonPromInd != null && articleInfo.rcResponse.lastMonPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastMonSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.monPromInd != null && articleInfo.rcResponse.monPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				thisTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.monSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.lastTuePromInd != null && articleInfo.rcResponse.lastTuePromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastTueSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.tuePromInd != null && articleInfo.rcResponse.tuePromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				thisTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.tueSale +'</td>';
			cssClass= '' ;
		}
		if(articleInfo.rcResponse.lastWedPromInd != null && articleInfo.rcResponse.lastWedPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastWedSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.wedPromInd != null && articleInfo.rcResponse.wedPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider  '+ cssClass+'">'+ articleInfo.rcResponse.wedSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastThuPromInd != null && articleInfo.rcResponse.lastThuPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';		
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastThuSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.thuPromInd != null && articleInfo.rcResponse.thuPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.thuSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastFriPromInd != null && articleInfo.rcResponse.lastFriPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastFriSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.friPromInd != null && articleInfo.rcResponse.friPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.friSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastSatPromInd != null && articleInfo.rcResponse.lastSatPromInd == "Y" )
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastSatSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.satPromInd != null && articleInfo.rcResponse.satPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.satSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastSunPromInd != null && articleInfo.rcResponse.lastSunPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn  '+ cssClass+'">'+ articleInfo.rcResponse.lastSunSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.sunPromInd != null && articleInfo.rcResponse.sunPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider  '+ cssClass+'">'+articleInfo.rcResponse.sunSale +'</td>';
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		cssClass= '' ;
			if(articleInfo.rcResponse.lastMonPromInd != null && articleInfo.rcResponse.lastMonPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastMonSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.monPromInd != null && articleInfo.rcResponse.monPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.monSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.lastTuePromInd != null && articleInfo.rcResponse.lastTuePromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastTueSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.tuePromInd != null && articleInfo.rcResponse.tuePromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.tueSale +'</td>';
			
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ lastTotalCssClass+'"><strong>'+ articleInfo.lastTotSales+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn '+ thisTotalCssClass+'"><strong>'+ articleInfo.thisTotSales +'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">RTC</td>';
		
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastMonRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.monRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastTueRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.tueRTC +'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastWedRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.wedRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastThuRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.thuRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastFriRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.friRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastSatRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.satRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastSunRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.sunRTC +'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastMonRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.monRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastTueRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.tueRTC +'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn"><strong>'+ articleInfo.lastTotRTC+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn"><strong>'+ articleInfo.thisTotRTC+'</strong></td></tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">Dump</td>';
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.mon_last+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.mon_this+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.tue_last+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.tue_this+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.wed_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.wed_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.thu_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.thu_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.fri_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.fri_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.sat_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.sat_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.sun_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.sun_this+'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.mon_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.mon_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.tue_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.tue_this+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn"><strong>'+ articleInfo.lastTotDump+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn"><strong>'+ articleInfo.thisTotDump+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="valueInfo columnDivider">Planned Req.</td>';
		
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.monDemand+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.tueDemand+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.wedDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.thuDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.friDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.satDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.sunDemand+'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.monDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.tueDemand+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.totalDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		
	}
	);
	 PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'</tbody></table>';
	return PlannerWeeklyDetailsBody;
}

function getPrintPlannerWeeklyDetailsBody(ppArticleSearchResults,department)
{
	var  s=0;
	var j=0;
	var PlannerWeeklyDetailsBody = '';
	PlannerWeeklyDetailsBody = '<tbody>';
	$.each(ppArticleSearchResults, function(i, articleInfo) {
		s=s+1;
		var thisTotalCssClass = '';
		var lastTotalCssClass = '';
		var cssClass = '';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + '<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + '<td class="rowSection rowHighlight" colspan="17">';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody + articleInfo.article +' - '+ articleInfo.article_desc;
		if(department == 'MEAT')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<label class="rowSubTitle"><strong>PLU :</strong> ';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+ articleInfo.plu +',&nbsp;<strong>Tray :</strong> '+ articleInfo.tray_desc +'</label>';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">Sale </td>';
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
			{
			if(articleInfo.rcResponse.lastMonPromInd != null && articleInfo.rcResponse.lastMonPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastMonSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.monPromInd != null && articleInfo.rcResponse.monPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				thisTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.monSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.lastTuePromInd != null && articleInfo.rcResponse.lastTuePromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastTueSale +'</td>';
			cssClass= '' ;
			if(articleInfo.rcResponse.tuePromInd != null && articleInfo.rcResponse.tuePromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				thisTotalCssClass = 'plannerThisPromo plannerLeft';
			}
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.tueSale +'</td>';
			cssClass= '' ;
		}
		if(articleInfo.rcResponse.lastWedPromInd != null && articleInfo.rcResponse.lastWedPromInd == "Y")
			{
				cssClass = 'plannerThisPromo plannerLeft'; 
				lastTotalCssClass = 'plannerThisPromo plannerLeft';
			}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastWedSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.wedPromInd != null && articleInfo.rcResponse.wedPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider  '+ cssClass+'">'+ articleInfo.rcResponse.wedSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastThuPromInd != null && articleInfo.rcResponse.lastThuPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';		
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastThuSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.thuPromInd != null && articleInfo.rcResponse.thuPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.thuSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastFriPromInd != null && articleInfo.rcResponse.lastFriPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastFriSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.friPromInd != null && articleInfo.rcResponse.friPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.friSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastSatPromInd != null && articleInfo.rcResponse.lastSatPromInd == "Y" )
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastSatSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.satPromInd != null && articleInfo.rcResponse.satPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.satSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.lastSunPromInd != null && articleInfo.rcResponse.lastSunPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn  '+ cssClass+'">'+ articleInfo.rcResponse.lastSunSale +'</td>';
		cssClass= '' ;
		if(articleInfo.rcResponse.sunPromInd != null && articleInfo.rcResponse.sunPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider  '+ cssClass+'">'+articleInfo.rcResponse.sunSale +'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		cssClass= '' ;
			if(articleInfo.rcResponse.lastMonPromInd != null && articleInfo.rcResponse.lastMonPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+  cssClass+'">'+ articleInfo.rcResponse.lastMonSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.monPromInd != null && articleInfo.rcResponse.monPromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.monSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.lastTuePromInd != null && articleInfo.rcResponse.lastTuePromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			lastTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ cssClass+'">'+ articleInfo.rcResponse.lastTueSale +'</td>';
		cssClass= '' ;
			if(articleInfo.rcResponse.tuePromInd != null && articleInfo.rcResponse.tuePromInd == "Y")
		{
			cssClass = 'plannerThisPromo plannerLeft'; 
			thisTotalCssClass = 'plannerThisPromo plannerLeft';
		}
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider '+ cssClass+'">'+ articleInfo.rcResponse.tueSale +'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn '+ lastTotalCssClass+'"><strong>'+ articleInfo.lastTotSales+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn '+ thisTotalCssClass+'"><strong>'+ articleInfo.thisTotSales +'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">RTC</td>';
		
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastMonRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.monRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastTueRTC +'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.tueRTC +'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastWedRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.wedRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastThuRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.thuRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastFriRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.friRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastSatRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.satRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastSunRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.sunRTC +'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastMonRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.monRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.rcResponse.lastTueRTC +'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.rcResponse.tueRTC +'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn"><strong>'+ articleInfo.lastTotRTC+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn"><strong>'+ articleInfo.thisTotRTC+'</strong></td></tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="columnDivider">Dump</td>';
		
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.mon_last+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.mon_this+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.tue_last+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.tue_this+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.wed_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.wed_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.thu_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.thu_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.fri_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.fri_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.sat_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.sat_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.sun_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.sun_this+'</td>';
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.mon_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.mon_this+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn">'+ articleInfo.tue_last+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn columnDivider">'+ articleInfo.tue_this+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn"><strong>'+ articleInfo.lastTotDump+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn lastColumn"><strong>'+ articleInfo.thisTotDump+'</strong></td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<tr>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="valueInfo columnDivider">Planned Req.</td>';
		
		if(district == 'UNI' || district == 'LNI' || district == 'SI')
		{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.monDemand+'</td>';
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.tueDemand+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.wedDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.thuDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.friDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.satDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.sunDemand+'</td>';
		
		if(district != 'UNI' && district != 'LNI' && district != 'SI')
		{
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.monDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.rcResponse.tueDemand+'</td>';
		}
		
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'<td class="numberColumn valueInfo columnDivider" colspan="2">'+ articleInfo.totalDemand+'</td>';
		PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody+'</tr>';
		if(department == 'MEAT')
			{
		if(s==2 && j==0)
			{
			 PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'<tr style="height:130px;"></tr>';
			 s=0;
			 j=j+1;
			}
		else if(s==3 && j>0)
			{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'<tr style="height:124px;"></tr>';
			 s=0;
			 j=j+1;
			}
			}
		else if(department == 'BAKERY')
			{
			if(s==3 && j>0)
			{
			PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'<tr style="height:160px;"></tr>';
			 s=0;
			 j=j+1;
			}
			else if(s==3 && j==0)
			{
				PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'<tr style="height:80px;"></tr>';
				 s=0;
				 j=j+1;
				}
			}
	}
	);
	j=0;
	PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'</tbody></table>';
	
	return PlannerWeeklyDetailsBody;
}

function generateReport(pageNumber,print,str) {
	hideError();
	
	var categoryList=[];
	$('.catDrpDwnChkBx:checked').each ( function() {
		categoryList.push($(this).val());
	});
	
	if(checkCondition(categoryList))
	{
	$('#updateFlag').val('Search');
	$('#categoryList').val(categoryList);
	$('#pageNumber').val(pageNumber);
	
	if(str=="" || str.length <=0)
	{
	  str ="Search";
	}
	
	$('#requiredQty').val(str);
	
	var data=$('#plannerDetailsFetch').serialize();
	
	var param = {
			article : ($('#article').val() || ""),
			searchByOptions	: $('input:radio[name=searchByOptions]:checked').val(),
			schedule:	($('input:radio[name=schedule]:checked').val()|| ""),
			department: ($( "#departmentId" ).val() || ""),
			siteNo	:	($('#siteNo').val() || ""),
			inputWeek	:	($('#inputWeek').val() || ""),
			siteDistrict : ($('#siteDistrict').val() || ""),
			inputBakeryDay: ($('#inputBakeryDay').val() || ""),
			category : (categoryList|| ""),
			categoryList : (categoryList|| ""),
			pageNumber : (pageNumber || ""),
			requiredQty : (str|| ""),
			updateFlag : "Search"
		};
	
	console.log(param);
	
	console.log("data  :" + data);

	
	$.ajax({
		type : "post",
		url : "fetchDetailsData.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateResult(response, pageNumber,print);
			flag=false;
			stopLoading();
		},
		error : function() {
			flag=false;
			stopLoading();
		},
	});
}
	else
		{
		showError('Please select at least one category');// changed atleast as per suggesstion from Louise
		}
}
function generateReportUpdate(pageNumber,print,req_qty,flag) {
	$.ajax({
		type : "get",
		url : "fetchDetailsData.htm",
		data : {
			article : $('#article').val(),
			searchByOptions	: $('input:radio[name=searchByOptions]:checked').val(),
			schedule:	$('input:radio[name=schedule]:checked').val(),
			department: $( "#department" ).val(),
			siteNo	:	$('#siteNo').val(),
			inputWeek	:	$('#inputWeek').val(),
			siteDistrict : $('#siteDistrict').val(),
			pageNumber : pageNumber,
			requiredQty : jQuery.parseJSON(req_qty),
			updateFlag : flag
		},
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateResult(response, pageNumber,print);
			stopLoading();
		},
		error : function() {
			stopLoading();
		},
	});

}
function printReport() {
	// Changed for the page highlight issue - xspyn - Starts
	/*generateReport(currentPage,'print',"");*/
	// Changed for the page highlight issue - xspyn - Ends
	plannerPrint();
}
function printReport1() {
	/*a = window.open ();
	a.document.write('<h2 class="wait">We are processing your request, please wait....</h2>');
	
	if (currentPage == '0')
		{
			currentPage='1';
		}
	// Changed for the page highlight issue - xspyn - Starts
	generateReport(currentPage,'print',"");
	// Changed for the page highlight issue - xspyn - Ends
*/
	plannerPrint();
	}


function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			pagNo =pageNumber;
			if(flag)
				{
				$("#dialog-saveChanges").dialog('open');
				$('.popupActionsWrapper').on('click','#okbtn',function(){
					reportnav1(pageNumber);
					$('#dialog-saveChanges').dialog('close');
				});
				$('.popupActionsWrapper').on('click','#cancelbtn',function(){
						
			            generateReport( pageNumber, '',"");
			            $('#dialog-saveChanges').dialog('close');
				});
				}
			else
				{
			generateReport( pageNumber, '',"");
				}

		}

	});
	/*function showPaginatedContent(count) {
		$('.paginationDiv').pagination({
			items : recordCount,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			onPageClick : function(pageNumber) {
				if(flag)
					{
					$("#dialog-saveChanges").dialog('open');
					$('.popupActionsWrapper').on('click','#okbtn',function(){
						reportnav1(pageNumber);
						$('#dialog-saveChanges').dialog('close');
					});
					$('.popupActionsWrapper').on('click','#cancelbtn',function(){
							alert("its coming  inside the No Function");
				            generateReport( pageNumber, '',"");
				            $('#dialog-saveChanges').dialog('close');
					});
					}
				else
					{
				generateReport( pageNumber, '',"");
					}
			}
		});*/
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('.paginationWrapper').show();
	closeAccordian();
	//$('.print').parent().parent().addClass('hideBlock');
}

function showContent(count) {
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
	//$('.print').parent().parent().addClass('hideBlock');
}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function unavailable(date)
{
	var today = new Date();
	var currentWeekDate =  today;
		//today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();
	switch (new Date().getDay()) {
	    case 0:
	        day = "Sunday";
	        currentWeekDate = currentWeekDate+3;
	        break;
	    case 1:
	    	currentWeekDate = currentWeekDate+2;
	    	break;
	    case 2:
	    	currentWeekDate = currentWeekDate+1;
	        break;
	    case 3:
	        break;
	    case 4:
	    	currentWeekDate = currentWeekDate-1;
	        break;
	    case 5:
	    	currentWeekDate = currentWeekDate-2;
	        break;
	    case 6:
	    	currentWeekDate = currentWeekDate-3;
	        break;
	}
	  dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
	  var availableDates = [];
	  for (var i=0;i<7;i++)
		  {
			  currentWeekDate = currentWeekDate + i;
			  enableDate= currentWeekDate.getDate() + "-" + (currentWeekDate.getMonth()+1) + "-" + currentWeekDate.getFullYear();
			  availableDates.push(enableDate);
		  }
	  if ($.inArray(dmy, availableDates) > 0) {
		    return [true,"","Available"];
		  } else {
		    return [false,"","Unavailable"];
		  }
	alert(currentWeekDate);

}

function printContent(response, pageNumber)
{
	var output = $.parseJSON(response);
	var ppPrintSupplierSearchResults ='';
	var ppPrintArticleSearchResults ='';
	if (output.data != null) {
		hideError();
	
		if(output.param != null)
			{
				var param = output.param;
				selectedDate = param.selectedDate;
				fromDate = param.fromDate;
				toDate = param.toDate;
				department = param.department;
				day = param.day;
				recordCount = param.recordCount;
			}
		if(department == 'BAKERY')
		{
			 ppPrintSupplierSearchResults = output.data;
		}
		else
		{
			ppPrintArticleSearchResults = output.data;
			recordCount = ppPrintArticleSearchResults[0].msg;
		}
		currentPage = pageNumber;
		var plannerDailyDetailsHead = '';
		var PlannerDailyDetailsBody = '';
		var plannerWeeklyDetailsHead = '';
		var PlannerWeeklyDetailsBody = '';
		var plannerHtml = '';
		var PlannerDetailsBody = '';
		
		if($('input:radio[name=schedule]:checked').val() == 'daily')
		{
			var plannerPrintHead = '';
			plannerPrintHead = '<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">';
			plannerPrintHead = plannerPrintHead + 'Daily Production Schedule for '+selectedDate+','+day+'</h4></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>'; 
			plannerPrintHead = plannerPrintHead + '<div class="tableActionBtns"><label class="actionBtn" onclick="printReport1();"><label class="print">Print</label></label></div></div>';

			if(department == 'BAKERY')
				{
				for (var key in ppPrintSupplierSearchResults) {
					  if (ppPrintSupplierSearchResults.hasOwnProperty(key)) {
					    console.log(key + ' -> ' + ppPrintSupplierSearchResults[key][0].supplier_name);
					    var supplierNo = key ;
					    var supplierName = ppPrintSupplierSearchResults[key][0].supplier_name;
					    plannerDailyDetailsHead = getPlannerDailyDetailsHead(selectedDate ,department,supplierNo,supplierName);
					    PlannerDailyDetailsBody = getPrintPlannerDailyDetailsBody(ppPrintSupplierSearchResults[key],department);
					    plannerHtml = plannerHtml + plannerDailyDetailsHead + PlannerDailyDetailsBody;
					  }
					}
				 plannerHtml = plannerPrintHead + plannerHtml + '</div>' ;
				}
			else{
				plannerDailyDetailsHead = getPlannerDailyDetailsHead(selectedDate ,department,'','');
				PlannerDailyDetailsBody = getPrintPlannerDailyDetailsBody(ppPrintArticleSearchResults,department);
			
				PlannerDailyDetailsBody = PlannerDailyDetailsBody +'</div>';
				plannerHtml = plannerPrintHead + plannerDailyDetailsHead + PlannerDailyDetailsBody;
			}
			
		}
	else if($('input:radio[name=schedule]:checked').val() == 'weekly'){
				var plannerWeeklyPrintHead = '';
				plannerWeeklyPrintHead = '<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">';
				plannerWeeklyPrintHead = plannerWeeklyPrintHead +'Weekly  Production Schedule from '+fromDate+' to '+toDate +'</h4></div><div class="paginationWrapper  paginationDiv" id="paginationDiv1"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div></div></div>'; 
				plannerWeeklyPrintHead = plannerWeeklyPrintHead +'<div class="tableActionBtns"><label class="actionBtn" onclick="printReport1();"><label class="print">Print</label></label></div></div>';
				
				if(department == 'BAKERY')
				{
				for (var key in ppPrintSupplierSearchResults) {
					  if (ppPrintSupplierSearchResults.hasOwnProperty(key)) {
					    var supplierNo = key ;
					    var supplierName = ppPrintSupplierSearchResults[key][0].supplier_name;
					    plannerWeeklyDetailsHead = getPlannerWeeklyDetailsHead(selectedDate ,department,supplierNo,supplierName,fromDate,toDate);
					    PlannerWeeklyDetailsBody = getPrintPlannerWeeklyDetailsBody(ppPrintSupplierSearchResults[key],department);
					    plannerHtml = plannerHtml + plannerWeeklyDetailsHead + PlannerWeeklyDetailsBody;
					  }
					}
				 plannerHtml = plannerWeeklyPrintHead + plannerHtml + '</div>';
				}
			else if(department == 'MEAT'){
				plannerWeeklyDetailsHead = getPlannerWeeklyDetailsHead(selectedDate ,department,'','',fromDate,toDate);
				PlannerWeeklyDetailsBody = getPrintPlannerWeeklyDetailsBody(ppPrintArticleSearchResults,department);
				PlannerWeeklyDetailsBody = PlannerWeeklyDetailsBody +'</div>';
				plannerHtml = plannerWeeklyPrintHead + plannerWeeklyDetailsHead + PlannerWeeklyDetailsBody;
			}
			
				
		}
	}
	return plannerHtml;
}


function disableWeekly(department)
{
	//fix for Defect_14751
	$('#plannerDetailsFetch').find('input[id="article"], select').not("#departmentId,input[type='hidden']").val('');
	$('input[name="searchByOptions"]:first').click();
	hideCategoryDiv();
	if(department == 'MEAT' || department == 'BAKERY')
	{
		document.getElementById("daily").click();//fix for Defect_14751
		document.getElementById("weekly").disabled = false;
		document.getElementById("inputDay").style.display = "block";
		document.getElementById("inputBakeryDay").style.display = "none";
	}
	else if(department == 'BAKERY DOUGH')
	{
		document.getElementById("inputBakeryDay").style.display = "block";
		document.getElementById("inputDay").style.display = "none";
		document.getElementById("weekly").checked = false;
		document.getElementById("weekly").disabled = true;
		document.getElementById("daily").click();
		getCategories(); //uncomment once we get the service
		
	}
	else{
		document.getElementById("inputDay").style.display = "block";
		document.getElementById("inputBakeryDay").style.display = "none";
		document.getElementById("weekly").checked = false;
		document.getElementById("weekly").disabled = true;
		document.getElementById("daily").click();
	}
}
function showWarn(msg) {
	$('#dialog-modal-alertBox').dialog('open');
	$('#dialog-modal-alertBox #alertBox').text(msg);
	$('#okBtn').addClass('hideBlock');
	$('.yesBtn,.noBtn').removeClass('hideBlock');
}
function plannerPrint(){
	hideError();
	/*var article = $('#article').val();
	var searchByOptions	= $('input:radio[name=searchByOptions]:checked').val();
	var schedule = $('input:radio[name=schedule]:checked').val();
	var department = $( "#departmentId" ).val();
	var siteNo	=	$('#siteNo').val();
	var inputWeek = $('#inputWeek').val();
	var siteDistrict = $('#siteDistrict').val();
	var inputBakeryDay = $('#inputBakeryDay').val();
	
	var url = "fetchDetailsData.htm";*/
	
	var categoryList=[];
	$('.catDrpDwnChkBx:checked').each ( function() {
		categoryList.push($(this).val());
	});
	if(checkCondition(categoryList))
		{
	$('#updateFlag').val(' ');
	$('#categoryList').val(categoryList);
	$('#pageNumber').val(0);
	
	//var data=$('#plannerDetailsFetch').serialize();
	
	$('#plannerDetailsFetch').attr("action", "fetchDetailsData.htm");
	$('#plannerDetailsFetch').attr('target','_blank');
	$('#plannerDetailsFetch').attr('method','post');
	$('#plannerDetailsFetch').submit();
}
	else
	{
	showError('Please select at least one category'); // changed atleast as per suggesstion from Louise
	}
	
	//var url = "fetchDetailsData.htm?department="+department+"&siteNo="+siteNo+"&article="+article+"&searchByOptions="+searchByOptions+"&schedule="+schedule+"&inputWeek="+inputWeek+"&siteDistrict="+siteDistrict+"&inputBakeryDay="+inputBakeryDay+"&pageNumber=0&requiredQty=Search&updateFlag= ";
	/*var currentwindow = window;
	newwindow = window.open(url);
	startLoading();
	var unloadEvent = function (e) {// for defect 14710
		try{
			var json = e.currentTarget.document.body.innerHTML;
			var output= $.parseJSON(json);
			if (output.msg != null && output.msg.length > 0) {
				showError(output.msg);
				e.currentTarget.close();
				$(currentwindow).focus();
			}
		}catch(err){
			console.log(err);
			$(currentwindow).focus();
		}
 		stopLoading();
    };
    newwindow.addEventListener("load", unloadEvent); */
}

function hideCategoryDiv()
{
	$('.bakeryDoughDiv').removeClass('hideBlock').addClass('hideBlock');
}

function showCategoryDiv()
{
	$('.bakeryDoughDiv').addClass('hideBlock').removeClass('hideBlock');
}
/**
 * Binds the Category checkbox change event in create stock page.
 */
function bindAfterCatDrpDwnReady()
{
	$('#bakeryCategoryDrpDwnUl').find("li input[type=checkbox]").change(function() {
		if($(this).attr('id') != "allCatChkBox"){
			onChangeCatDropDown();	
		}		
	});	
		
}
/**
 * Binds the click event for All category checkbox under category drop down
 * in Create stock take page
 */
function bindAllCatCheckBox(){
	//Registers dept dropdown's select 'All category' event
	$("#allCatChkBox").click(function(){
		if($("#allCatChkBox").is(':checked')){//Select all
			$("#bakeryCategoryDrpDwnLabel").html('All Categories');//Category drop down value displayed
			$('#bakeryCategoryDrpDwnUl').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});					
		}else{ //unselect all
			$("#bakeryCategoryDrpDwnLabel").html('Select Category');//Category drop down value displayed
			$('#bakeryCategoryDrpDwnUl').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
		}
	});
}
/**
 * onCahnge of category drop down invoke this method
 */
function onChangeCatDropDown(){
	if($('.catDrpDwnChkBx:checked').length == $(".catDrpDwnChkBx").length){
		$("#allCatChkBox").prop("checked",true);
		$("#bakeryCategoryDrpDwnLabel").html('All Categories');//Category drop down value displayed
	}else if($('.catDrpDwnChkBx:checked').length == 0){
		$("#bakeryCategoryDrpDwnLabel").html('Select Category');//Category drop down value displayed
	}else if($('.catDrpDwnChkBx:checked').length == 1){
		$("#bakeryCategoryDrpDwnLabel").html($('.catDrpDwnChkBx:checked').parent().find('label').html());
	}else{
		$("#allCatChkBox").prop("checked",false);
		$("#bakeryCategoryDrpDwnLabel").html('Multiple Categories');//Category drop down value displayed
	}		
}

function getCategories()
{
	if(!$('#bakeryCategoryDrpDwnDiv').hasClass('loaded'))
		{
		$.ajax({
			type : "get",
			url : "fetchBakeryCategories.htm",
			data : {},
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				if(response != null)
				{
				var output = $.parseJSON(response);
				var data = output.data;
				if(data != null)
					{
				frameCategoryDrpDwnContent(data);
				$('#bakeryCategoryDrpDwnDiv').addClass('loaded');
				bindAfterCatDrpDwnReady();
				bindAllCatCheckBox();
					$("#allCatChkBox").trigger('click');//to select all categories by default
				showCategoryDiv();
					}
			}
				else
					{
					showError("Technical issue occurred. Please contact technical support.");
					}
				stopLoading();
			},
			error : function(response) {
				console.log(response);
				flag=false;
				stopLoading();
			},
		});
		}
	else
		{
		showCategoryDiv();
		}
}

function frameCategoryDrpDwnContent(reqList)
{
	var content='';
	for(var i=0;i<reqList.length;i++)
		{
	content+='<li>'
	+'<input class="catDrpDwnChkBx" type="checkbox" value="'+reqList[i].categ_desc+'" id="'+i+'">'
	+'<label for="'+i+'" class="dropdownLabel">'+reqList[i].categ_desc+'</label>'
	+'</li>';
		}
	$('.allChkLi').after(content);  
	
}

function checkCondition(categoryList)
{
	if($( "#departmentId" ).val() == "BAKERY DOUGH" && (categoryList == null || categoryList.length == 0))
		{
			return false;
		}
	else
		{
		return true;
		}
}