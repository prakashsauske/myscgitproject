var presentDate;
var pageResults;
var currentPage=1;
var maxRecords=20;

$(function() {

	/*$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
	});*/
	$('#scrollWindow').css('width','40%');
/*	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
	});*/
	$("#warehouse").attr('disabled', true);
	$('.print').parent().css('float', 'right').css('margin-top', '32px');

	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	
	$('#dateFrom').val(presentDate);
	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if ($("#dialog-supplier-verify").dialog("isOpen")) {
				$('#goButtonSample1').click();
			} else {
				$('#generateReport').click();
			}

		}
	});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	// Code to show and hide article heirarchy

	$("#filterTabs").tabs();

	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});

	});

	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	
	$('#generateReport').click(function(){
		currentPage=1;
		$('#reportContent').addClass('hideBlock');
		hideError();
		var val=validateDate();
		if(val){
			$.ajax({
				type : "get",
				url : "getSUGOReports.htm",
				data : {
					fromDate : $("#dateFrom").val(),
					storeNumber : $('.siteNoName').text().split("|")[0].trim()
				},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if(response!=null && response!=""){
						console.log(response);
						var result=$.parseJSON(response);
						pageResults=result.orderReports;
						if(result.msg==null){
							$('#deliveryDate').text(result.deliveryDate);
							$('#reviewByTime').text(result.reviewTime);
							$('#rosterDate').text(result.rosterDate);
							constructSearchResults(pageResults,currentPage);
							$('#reportContent').removeClass('hideBlock');
							$("#closeLink").trigger("click");
							bindPagination(pageResults);
						}else{
							showError(result.msg);
						}
					}else{
						showError("No data to display ...!");
					}
					stopLoading();
				},
				error : function(response) {
					console.log(response);
				},
			});
		}
		else{
			$("#dateFrom").addClass('errorField');
		}
		
	});
});

function bindPagination(orderReports){
	
	if(orderReports.length>maxRecords){
		$('.sugoPaginationArea')
		.pagination(
				{
					items :orderReports.length ,
					itemsOnPage : maxRecords,
					cssStyle : 'compact-theme',
					currentPage : currentPage,
					onPageClick : function(
							pageNumber) {
						constructSearchResults(orderReports,pageNumber);

					}

				});
		$('.sugoPaginationArea').removeClass('hideBlock');
	}else{
		$('.sugoPaginationArea').addClass('hideBlock');
	}
}

function validateDate(){
	var check=true;
	try{
		$.datepicker.parseDate("dd/mm/yy",$("#dateFrom").val());
	}catch(err){
		showError("Please enter a valid delivery Date");
		check=false;
	}
	if(($.datepicker.parseDate("dd/mm/yy",presentDate) > $.datepicker.parseDate("dd/mm/yy",$("#dateFrom").val())) || ($.datepicker.parseDate("dd/mm/yy",presentDate)  < $.datepicker.parseDate("dd/mm/yy",$("#dateFrom").val())))
	{   
	 showError("Delivery date cannot be past or future date");
	 check=false;
	}
	return check;
}
function constructSearchResults(orderReports,pageNo){
	if(orderReports!=null){
		$("#totalRecords").text(pageResults.length);
		var articleLine='';
		var limit=((pageNo*maxRecords)<orderReports.length)?(pageNo*maxRecords):orderReports.length;
		var index=pageNo==1?0:((pageNo-1)*maxRecords);
		for(var i=index;i<limit;i++){
			articleLine+='<tr><td class="">'+orderReports[i].supplier+'</td><td class="numberColumn columnDivider">'+orderReports[i].articleNo+'</td><td class=" columnDivider">'+orderReports[i].articleUOM+'</td><td class="columnDivider">'+orderReports[i].description+'</td><td class="numberColumn columnDivider">'+orderReports[i].OM+'</td><td class="numberColumn columnDivider">'+orderReports[i].soosit+'</td><td class="numberColumn columnDivider">'+orderReports[i].MPL+'</td><td class="numberColumn columnDivider">'+orderReports[i].SUGOQty1+'</td><td class="numberColumn columnDivider">'+orderReports[i].SUGOQty2+'</td><td class="numberColumn columnDivider">'+orderReports[i].OrderQty1+'</td><td class="numberColumn columnDivider">'+orderReports[i].OrderQty2+'</td></tr>';
		}
		$('#searchResults').html('');
		$('#searchResults').html(articleLine);
		
	}else{
		showError("No data to display ...!");
	}
	
}
function showError(message){
	$('#errorMsg').text(message);
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
}
function hideError(){
	$("#dateFrom").removeClass('errorField');
	$('#errorMsg').text("");
	$('.ContentTableWrapperError').addClass('hideBlock');
}
