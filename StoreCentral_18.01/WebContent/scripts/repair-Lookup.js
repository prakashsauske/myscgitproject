var serviceOrderNo = '';
var vendorNo = '';
var dtlList = [];
var multiSelectList = [];
var orderInfo;
var stockType;
var leaveScreenMsg = 'STOP! Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s. <br><br>Consignment Note Completed?';
var leaveDangerNotes='Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s.';
var completedScreenMsg ='The Service order completed successfully.';
var cancelledScreenMsg ='The Service order cancelled successfully.';
var disclaimerNotes1='The maximum period for which we are able to hold repaired goods or goods left for quotation is six months.';			//Defect_8362 
var disclaimerNotes2='Please collect your property or advise us in regard to its delivery before this period of time has elapsed.';
var disclaimerNotes3='No responsibility will be taken for the delivery of goods left longer than six months.';
var disclaimerNotes4='Property unclaimed within the period specified will be disposed of in order to free storage space and recover any repair expenses.';
var disclaimerNotes5='At Woolworths we respect customers privacy. Any information you give us will only be used for the purpose of managing the repair process. If you do not provide all the information we might not be able to process your repair. If you wish to access your information please contact General Manager Corporate Services, PO Box 8000, Baulkham Hills,NSW 2153 or phone the privacy Helpline on 1300 134 802.';
var disclaimerNotes6='Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s.';
var dueDate;
var status = '';
var repairAgentCode = '';
var currentPage = 1;
var pickChanged = false;
var dueChanged = false;
var storeName;
var storeStreet;
var storeCity;
var storePostalCode;
var storeContactNumber;
var repairAgentName = '';
var formData;
var custName;
var custNo;
var comments;
var articleNumber;
var articleDescription;
var repairAgentContactNumber ='';
var grDate='';
var createDate;
var storeOrCustomer;
var siteNo;
var dangerFlag='';
var articleNum='';
var par1=[];
var par2=[];
var dangerNote;
var imagePathMap = new Object();
var onloadRepairs = true;
var pickupdateRes='';
// Gaps for Goods Summary Report
var repairArticleList = '';
var repairsPostiveMvmt = '542';
var repairsNegativeMvmt = '541';
$(function() {
	
	siteNo=$('#loggedInSite').val();

	// create Display
	$("#dialog-created").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 380
	});

	$("#dialog-cartonCount").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 600,
		width : 400
	});
	
	 $('.two-digits').keyup(function(){
		   if($(this).val().indexOf('.')!=-1){         
		       if($(this).val().split(".")[1].length > 2){                
		           if( isNaN( parseFloat( this.value ) ) ) return;
		           this.value = parseFloat(this.value).toFixed(2);
		       }  
		    }            
		    return this; //for chaining
		 });
	
	$("#dialog-cartonCount").parent().addClass(
			"popupWrapper"); 
	$("#dialog-created").parent().addClass("popupWrapper");

	$("#dialog-created .popupActions label").click(function() {
		window.location.href = "../repair/onPageLoad.htm";
	});
	
	$('#dialog-created').parent().find('.closePopUp').click(function() {
		window.location.href = "../repair/onPageLoad.htm";
	});

	// Code to close
	$(".close").click(function() {
		$(".quickHelpWrapper").addClass('hideBlock');
		$(".pageErrorsWrapper").addClass('hideBlock');
	});

	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	var newYear = today.getFullYear();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}

	var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);
	$('#dateTo').val(presentDate);

	var threeMontsBeforDate = new Date();
	threeMontsBeforDate.setTime(threeMontsBeforDate.getTime()
			- (60 * 60 * 24 * 1000 * 30));

	var newFromDate = threeMontsBeforDate.getDate();
	var newFromMonth = threeMontsBeforDate.getMonth() + 1;

	if (newFromDate < 10) {
		newFromDate = '0' + newFromDate;
	}
	if (newFromMonth < 10) {
		newFromMonth = '0' + newFromMonth;
	}

	var threeMontsBeforeToDate = (newFromDate + "/" + (newFromMonth) + "/" + threeMontsBeforDate
			.getFullYear());
	$('#dateFrom').val(threeMontsBeforeToDate);

	// GO BUTTON CLICK
	$(".goButton").click(function() {
		$(".linkBtn1").trigger('click');
		hideLookupResultsContent();
		var searchText = $('#searchBox').val();
		 if(searchText ==''){
			 if (validateLookup()) {
				 if(onloadRepairs){
					 $('#StatusID').val('OPEN');
					 formData = $('#search').serialize();
					 $('#StatusID').val('');
					 onloadRepairs = false;
				 }else{
					 formData = $('#search').serialize();
				 }
			//"searchText=&dateFrom=23%2F08%2F2016&dateTo=22%2F09%2F2016&status=COMPLETED&customerName=&contactNo=&postCode="//$('#search').serialize();
			 searchServiceOrder(formData, 1, 10);
			 }}

		 if (searchText !=''){	// search order issue
		formData="searchText="+
		$('#searchBox').val()+
		"&dateFrom=&dateTo=&customerName=&contactNo=&postCode=";

		searchServiceOrder(formData, 1, 10);
		}
			 });
	

	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

	// copies -->
	$("#dialog-copies").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 250
	});

	$("#dialog-copies").parent().addClass("popupWrapper");

	/*
	 * $("#printNote").click(function() { $("#dialog-copies").dialog("open");
	 * });
	 */

	$("#dialog-copies .popupActions label").click(function() {
		$("#dialog-copies").dialog("close");
	});

	// Cancel -->
	$("#dialog-cancel").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 600
	});

	$("#dialog-cancel").parent().addClass("popupWrapper");

	$("#cancel").click(function() {
		hideErrorInCnclPop();
		$("#dialog-cancel").dialog("open");
	});

	$("#dialog-cancel .popupActions label").click(function() {
		$("#dialog-cancel").dialog("close");
	});

	// Complete -->
	$("#dialog-complete").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 600
	});

	$("#dialog-complete").parent().addClass("popupWrapper");

	$("#complete").click(function() {
		hideErrorInCompPop();
		/*if($('#salesOrg').val()==1060){
			if(dangerFlag=="Y")
			{
				$.fn.warnPopup('warn',leaveScreenMsg,'Dangerous Article Warning',triggerLeaveDangerArticlePopUpScreenYes,triggerLeaveDangerArticlePopUpScreenNo,'',$(this));
			}
			else
			{
				$("#dialog-complete").dialog("open");	
			}
		
		}
		else*/
		if(stockType == 'REPAIR')
		{
			if(grDate!='' && pickupdateRes != ''){
				$("#dialog-complete").dialog("open");
			}else{
				if(pickupdateRes!='' && grDate==''){
					$.fn.showCustomMsg([ 'Please enter Vendor Goods Return Date.' ],error, 'Service Order');
				}else if(pickupdateRes=='' && grDate!=''){
					$.fn.showCustomMsg([ 'Please enter Goods Pickup Date.' ],error, 'Service Order');
				}else {
					$.fn.showCustomMsg([ 'Please enter Vendor Goods Return Date & Goods Pickup Date.' ],error, 'Service Order');
				}
			}
		}else {
			$("#dialog-complete").dialog("open");
		}
	});

	$(".complete-done").click(function() {
			completeServiceOrder();
	});

	$(".complete-cancel").click(function() {
		$("#completeForm")[0].reset();	
		$("#dialog-complete").dialog("close");
	});
	
	 
	 $(".cancel-done").click(function() {
		 cancelServiceOrder();
		});

		$(".cancel-cancel").click(function() {
			$("#cancelForm")[0].reset();	
			$("#dialog-cancel").dialog("close");
		});

	// Close top message
	$(".messageClose").click(function() {
		$(".actionStatusMessage").fadeOut("fast");
	});

	// Close status message
	$(".pageStatusWrapper a.close").click(function() {
		$(".pageStatusWrapper").addClass("hideBlock");
	});

	// Email Reminder

	/*
	 * $("#email").click(function() { $("#emailSent").removeClass("hideBlock");
	 * });
	 */

	$(".inputDate").datepicker({
		zIndex : 50
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	$(".buttonMenu").menu({
		position : {
			my : "left top",
			at : "left+3 top+23"
		}
	});

	// code for enter key event
	$('body').on('keypress', function(e) {
		var p = e.which;
		if (p == 13) {
			if ($('.lookup').hasClass('currentPage'))
				$(".goButton:first").trigger('click');
		}
	});
	$("#dateFrom").datepicker({
		firstDay : 1,
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		onClose : function(selectedDate) {
			$("#dateTo").focus();
		}

	});

	$("#dateTo").datepicker({
		firstDay : 1,
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});

	// Print
	$("#dialog-print").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 500
	});

	$("#dialog-print").parent().addClass("popupWrapper");

	$("#print").click(function() {
		$("#dialog-print").dialog("open");
	});

	$("#dialog-print .popupActions label").click(function() {
		$("#dialog-print").dialog("close");
	});

	$("#wizard").jWizard();

	$("#dialog-replicate").parent().addClass("popupWrapper");
	$(".jw-button-finish span").text("Print");

	// Multiple actions

	$("#dialog-confirm").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 350
	});

	$("#dialog-confirm").parent().addClass("popupWrapper");

	$("#dialog-confirm .popupActions label").click(function() {
		$("#dialog-confirm").dialog("close");
	});

	// code for multiple actions
	$("#beforeSubmit input").click(function() {
		$("#dropdownSelect").removeClass('hideBlock');
	});

	/*
	 * $(".dropdownLabel").click(function() {
	 * $("#dialog-confirm").dialog("open"); });
	 */

	$(".linkBtn1").click(function() {
		if ($("#dialog-modal").dialog("isOpen"))
			$("#dialog-modal").dialog("close");

	});

	// Code to show and hide filter
	$('#filterOpen').click(function() {
		$("#filterClear").removeClass('hideBlock');
		$(".filterRow").removeClass('hideBlock');
		$(this).addClass('hideBlock');
		// $("#groupByClear").trigger( "click" );
	});

	$('#filterClear').click(function() {
		$("#filterOpen").removeClass('hideBlock');
		$(".filterRow").addClass('hideBlock');
		$(this).addClass('hideBlock');
		$(".tableActionsWrapper").addClass('hideBlock');
	});

	// Checkbox DropDown functions
	$(".selectDropdown .linkBtn1").click(function() {
		$(".selectDropdown").removeClass('active');
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
		} else {
			$(this).parent().addClass('active');
		}
	});

	$('html').click(function() {
		$(".selectDropdown").removeClass('active');
	});

	/*
	 * $('.selectDropdown .linkBtn').click(function(event) {
	 * event.stopPropagation(); });
	 */

	// $("#dialog-modal").parent().addClass("popupWrapper");
	$("#tooManysupplier").click(function() {
		$("#dialog-modal").parent().addClass("popupWrapper");

		$("#dialog-modal").dialog("open");
		$("#searchWarning").removeClass('hideBlock');
		$("#popupSearch").addClass('hideBlock');

	});

	$("#verifySupplier").click(function() {
		$("#dialog-modal").parent().addClass("popupWrapper");
		$("#dialog-modal").dialog("open");
		$("#searchWarning").addClass('hideBlock');
		$("#popupSearch").removeClass('hideBlock');
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// shows advanced search box when advanced search link is clicked
	$("#advLink1")
			.click(
					function() {

						var scroll = $(window).scrollTop();

						var lookupHeight = $('#lookupContainer').height();

						document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
						document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");

						// var lookupBgheight = $("#advDiv").outerHeight() + 20
						// + "px";
						$("#advWrapper").css("height", "220px");

						$("#advDiv").removeClass('advancedParam hideBlock');
						$("#advDiv").addClass('advancedParam');

						$("#advWrapper").removeClass(
								'advancedSearchFormatWrapper hideBlock');
						$("#advWrapper")
								.addClass('advancedSearchFormatWrapper');

						$("#closeLink").removeClass('linkBtn1 hideBlock');
						$("#closeLink").addClass('linkBtn1');

						$("#advLink1").hide();
						$("#value").val("");
						populateStatusList();

					});

	// closes advanced search when close is clicked
	$("#closeLink").click(function() {
		closeAdvSearchClasses();
	});

	// closes advanced search box when windowed are scrolled unless in popup
	// menu
	$(window)
			.scroll(
					function() {
						if ($('#dialog-modal').dialog("isOpen") == true) {
							var scroll = $(window).scrollTop();
							var lookupHeight = $('#lookupContainer').height();
							document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
							document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
						} else {
							closeAdvSearchClasses();
						}
					});

	// closes advanced search box when cotent out side of the box is clicked
	$('.mainWrapper').click(function() {
		closeAdvSearchClasses();
	});

	// disable close box function when lookup box is clicked
	$('#lookupContainer').click(function(event) {
		event.stopPropagation();
	});

	// disable close box function when lookup box is clicked
	$('.popupWrapper').click(function(event) {
		event.stopPropagation();
	});

	// Code for Scrolling
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$('.scrollup').click(function() {
		$("html, body").animate({
			scrollTop : 0
		}, 400);
		return false;
	});

	// hide and show navigation in nav bar
	$('.lookup').click(function() {
		$('.details').removeClass('currentPage').addClass('hideBlock');
		$('.editOrder').removeClass('currentPage').addClass('hideBlock');
		$('.lookup').addClass('currentPage');
		$('.statusWrapper').addClass('hideBlock');
		$('#searchBox').focus();
		hideServiceOrderDetailsPage();
	});
	$('.details').click(function() {
		$('.details').addClass('currentPage').removeClass('hideBlock');
		$('.editOrder').removeClass('currentPage').addClass('hideBlock');
		$('.lookup').removeClass('currentPage');
		$('.statusWrapper').removeClass('hideBlock');
		showServiceOrderDetailsPage();
	});
	$('.editOrder').click(function() {
		$('.details').removeClass('currentPage').removeClass('hideBlock');
		$('.editOrder').addClass('currentPage').removeClass('hideBlock');
		$('.lookup').removeClass('currentPage');
		$('.statusWrapper').removeClass('hideBlock');
		// show edit page
	});
	
$('#pickDate').change(function(){
		if($('#pickDate').val() != '')
			{
		$('#fud').val(Add21Days());
		$('#returnDate').prop('disabled',false);
			}
		else
			{
			$('#returnDate').prop('disabled',true);
			}
});
	
	// Back button navigation from different pages
	$('#backBtn')
			.click(
					function() {

						if ($('#serviceOrderDetailsWrapper').hasClass(
								'hideBlock')
								|| !$('#editServiceOrderWrapper').hasClass(
										'hideBlock')) {
							$('.details').addClass('currentPage').removeClass(
									'hideBlock');
							$('.editOrder').removeClass('currentPage')
									.addClass('hideBlock');
							$('.lookup').removeClass('currentPage');
							showServiceOrderDetailsPage();
						} else if (!$('#serviceOrderDetailsWrapper').hasClass(
								'hideBlock')) {
							$('.details').removeClass('currentPage').addClass(
									'hideBlock');
							$('.editOrder').removeClass('currentPage')
									.addClass('hideBlock');
							$('.lookup').addClass('currentPage');
							$('.statusWrapper').addClass('hideBlock');
							hideServiceOrderDetailsPage();
						}

					});

	$('#editBtn').click(function() {
		$('.details').removeClass('currentPage').removeClass('hideBlock');
		$('.editOrder').addClass('currentPage').removeClass('hideBlock');
		$('.lookup').removeClass('currentPage');
		$('.statusWrapper').removeClass('hideBlock');
		$('#editServiceOrderWrapper').removeClass('hideBlock');
		$('#serviceOrderDetailsWrapper').addClass('hideBlock');
	});

	$('.editCancelBtn').click(function() {
		$('#editServiceOrderWrapper').addClass('hideBlock');
		$('#serviceOrderDetailsWrapper').removeClass('hideBlock');
	});

	$('.updateServiceBtn').click(function() {
		if (validateUpdateForm()) {
			if(stockType == 'SPARES')
			{
			$('.pickUpDate').prop('disabled',false);
			}
			if($('#salesOrg').val()==1060){
				if(dangerFlag=="Y" && (!($('#pickDate').val() == pickupdateRes) || !(grDate == $('#returnDate').val())))
				{
					$.fn.warnPopup('warn',leaveScreenMsg,'Dangerous Article Warning',triggerLeaveDangerArticlePopUpScreenYesUpdate,triggerLeaveDangerArticlePopUpScreenNo,'',$(this));
				}else{
					callServiceForUpdate($('[name="repeirsUpdateForm"]').serialize());
				}
			
			}else{
				callServiceForUpdate($('[name="repeirsUpdateForm"]').serialize());
			}
		}
	});
	
	$('#email').click(function() {
			callServiceForReminderUpdate($('[name="repeirsUpdateForm"]').serialize());
	});

	// allow only numers in contact no and post code
	$('#pcode').onlyNumbers();
	$('#conNum,#contactNum').onlyNumbers();
	$('#searchBox').onlyNumbers();

	/*
	 * $('#pickDate').on('input', function() { if ($('#pickDate').val() != '') {
	 * var errors = ''; if(!isValidDate($('#pickDate').val())) { errors +=
	 * getError("Please enter valid Goods Pickup Date"); pickChanged =true; }
	 * if(!isFutureDate($('#pickDate').val())) { errors += getError("Goods
	 * Pickup Date should be in future"); pickChanged = true; } if (errors ==
	 * '') { } else { showAllErrors(errors); } } });
	 * 
	 * 
	 * $('#fud').on('input', function() { if ($('#fud').val() != '') { var
	 * errors=''; if(!isValidDate($('#fud').val())) { errors += getError("Please
	 * enter valid Due date"); dueChanged=true; }
	 * if(!isFutureDate($('#fud').val())) { errors += getError("Due Date should
	 * be in future"); dueChanged=true; } if (errors == '') { } else {
	 * showAllErrors(errors); } } });
	 */

	addtooltip(
			$('#pickDate'),
			'Please be aware that entry of Goods Pickup date will automatically notify the Repair Agent');

	$(".tooltip").tooltip({
		position : {
			my : "left center",
			at : "right+10 center"
		}
	});
	
	$('#ta').isValidDecimal();
	$('#searchBox').focus();
	$('#ccn').onlyNumbers();
	$('.complete-amount').isValidDecimal();
	$('.cancel-amount').isValidDecimal();
	
	$(".servcieOrderTable").tablesorter({
		dateFormat : "ddmmyyyy",
	    emptyTo: 'top'
	  });
	
	//document.getElementById('date').value= Date();
	
	imagePathMap["woolworths"] = "/images/woolworths/wowLogo.PNG";
	imagePathMap["bigw"] = "/images/bigw/bigw_logo.png";
	imagePathMap["bws"] = "/images/bws/logo.gif";
	imagePathMap["corporate"] = "/images/corporate/logo.gif";
	imagePathMap["countdown"] = "/images/countdown/logo.gif";
	imagePathMap["danmurphy"] = "/images/danmurphy/logo.gif";
	imagePathMap["petrol"] = "/images/danmurphy/logo.gif";
	imagePathMap["thomasdux"] = "/images/thomasdux/logo.gif";
	var orderNo = $('#created-service-order').val();
	if(orderNo!=null && orderNo!='' && orderNo!=undefined){
		 $('#searchBox').val(orderNo);
	}
	$(".goButton:first").trigger('click');
	
});
// method called to close advanced search box in css
function closeAdvSearchClasses() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn1');
	$("#closeLink").addClass('linkBtn1 hideBlock');

	$("#advLink1").show();

	$("#suppName").val("");
	$("#suppNo").val("");
}

function updateSortPlugin() {
	$(".servcieOrderTable").trigger("update");
}
function searchServiceOrder(data, pageNo, recordCount) {
	data += '&pageNo=' + pageNo + '&recordCount=' + recordCount;
	console.log(data);

	var searchList = [];
	var statusMsg = '';
	$.ajax({
		type : "post",
		url : "searchRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			// all related items are in user access.js
			if (response == SessionExpired) {
				sessionExpired();
			} else {
				if (response != '') {
					output = $.parseJSON(response);
					// console.log(response);
					searchList = output.list;
					statusMsg = output.msg;
					if (statusMsg == 'Y') {
						currentPage = 1;
						formLookUpResultsContent(searchList, pageNo);
						if (searchList.length == 1
								&& $('.paginationDivRepair').hasClass(
										'hideBlock'))
							$('.servcieOrderTable tbody tr').trigger('click');
					} else {
						// SHOW ERROR MESSAGE
						hideLookupResultsContent();
						showError(statusMsg);

					}
				} else {
					// SHOW ERROR MESSAGE NO DATA FOUND
					showError("No Data Found.");
				}
			}
			stopLoading();

		},
		error : function(response) {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
		},
	});

}
function formLookUpResultsContent(list, pageNumber) {
	var recordCount = '';
	var flag = false;
	if (list.length > 0 && list != null && list != undefined) {
		flag= true;
		var content = '';
		var k = 1;
		var j = 1;
		recordCount = list[0].msg;
		currentPage = pageNumber;
		for ( var i = 0; i < list.length; i++) {

			list[i].order_no = list[i].order_no != ''
					&& list[i].order_no != null
					&& list[i].order_no != undefined ? list[i].order_no : '';
			list[i].type = list[i].type != '' && list[i].type != null
					&& list[i].type != undefined ? list[i].type : '';
			list[i].article = list[i].article != '' && list[i].article != null
					&& list[i].article != undefined ? list[i].article : '';
			list[i].description = list[i].description != ''
					&& list[i].description != null
					&& list[i].description != undefined ? list[i].description
					: '';
			list[i].supplier = list[i].supplier != ''
					&& list[i].supplier != null
					&& list[i].supplier != undefined ? list[i].supplier : '';
			list[i].repair_agent_code = list[i].repair_agent_code != ''
					&& list[i].repair_agent_code != null
					&& list[i].repair_agent_code != undefined ? list[i].repair_agent_code
					: '';
			list[i].repair_agent_name = list[i].repair_agent_name != ''
					&& list[i].repair_agent_name != null
					&& list[i].repair_agent_name != undefined ? list[i].repair_agent_name
					: '';
			list[i].creationdate = list[i].creationdate != ''
					&& list[i].creationdate != null
					&& list[i].creationdate != undefined ? list[i].creationdate
					: '';
			list[i].duedate = list[i].duedate != '' && list[i].duedate != null
					&& list[i].duedate != undefined ? list[i].duedate : '';
			list[i].status = list[i].status != '' && list[i].status != null
					&& list[i].status != undefined ? list[i].status : '';
			list[i].supplier_name = list[i].supplier_name != ''
					&& list[i].supplier_name != null
					&& list[i].supplier_name != undefined ? list[i].supplier_name
					: '';
			list[i].gr_date = list[i].gr_date != ''
						&& list[i].gr_date != null
						&& list[i].gr_date != undefined ? list[i].gr_date
						: '';
			list[i].stock_type = list[i].stock_type != ''
							&& list[i].stock_type != null
							&& list[i].stock_type != undefined ? list[i].stock_type
							: '';				
					

			content += '<tr id="' + list[i].order_no
					+ '" class="parentTr page-' + k;
			if (j > 10)
				content += ' hideBlock "';

			content += '" >';

			content += '<td class="hideBlock"><input type="checkbox" class="selectedCheckbox"></td>'
					+ '<td>' + list[i].order_no;

			var today = new Date();
			var newDate = today.getDate();
			var newMonth = today.getMonth() + 1;
			var newYear = today.getFullYear();
			if (newDate < 10) {
				newDate = '0' + newDate;
			}
			if (newMonth < 10) {
				newMonth = '0' + newMonth;
			}

			var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);

			if (compareDate(presentDate, list[i].duedate) == 'gt')
				content += '<label class="urgent">&nbsp;</label>';

			content += '</td>' + '<td class="centerValue stockType">'
					+ list[i].type + '</td>' + '<td class="articleNo">'
					+ Number((list[i].article).split('-')[0]) + '</td>'
					+ '<td>' + list[i].description + '</td>'
					+ '<td ><label class="supplier hideBlock">'
					+ list[i].supplier + '</label>' + list[i].supplier_name
					+ '</td>' + '<td ><label class="repairAgentName">'
					+ list[i].repair_agent_name
					+ '</label>(<label class="repairAgentCode">'
					+ list[i].repair_agent_code + '</label>)' + '</td>'
					+ '<td class="centerValue createDate">' + list[i].creationdate
					+ '</td>' + '<td class="centerValue dueDate">'
					+ list[i].duedate + '</td>'
					+ '<td class="lastColumn centerValue "><label class="status">'
					+ list[i].status + '</label><label class="hideBlock grDate">'+list[i].gr_date+'</label><label class="hideBlock storeOrCustomer">'+list[i].stock_type+'</label></td></tr>';
			if (j % 10 == 0) {
				k++;
			}
			j++;
		}
		$('.totalCount').text(recordCount);
		$('.servcieOrderTable tbody').html('');
		$('.servcieOrderTable tbody').append(content);
		$('.serviceOrderTablewrapper').removeClass('hideBlock');
		bindLookupResultEvents();
	}
	if(flag){
		updateSortPlugin();
		setTimeout(function(){
			if(!($('.servcieOrderTable').hasClass('tablesorter'))){
				$.tablesorter.destroy( $('.servcieOrderTable'), true, function(table){
					console.log('done');
					});
				$('.servcieOrderTable').tablesorter({
					dateFormat : "ddmmyyyy",
				    emptyTo: 'top'
				  });
			}
			
			// set sorting column and direction, this will sort on the first 
		    var sorting = [[8,0]]; 
		    // sort on the first column 
		    $('.servcieOrderTable').trigger("sorton",[sorting]);
		},30);
		}

	if (recordCount > 10) {
		showPaginatedContent(recordCount);
		$('.paginationWrapper').removeClass('hideBlock');

	} else {
		$('.serviceOrderTablewrapper').removeClass('hideBlock');
		$('.paginationWrapper').addClass('hideBlock');
	}
}

function getServiceOrderDetail(serviceOrderNo) {
	var statusMsg = '';

	$.ajax({
		type : "post",
		url : "getServiceOrderDetails.htm",
		data : {
			serviceOrderNo : serviceOrderNo
		},
		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
		

			// all related items are in user access.js
			if (response == SessionExpired) {
				sessionExpired();
			} else {
				if (response != '') {
					output = $.parseJSON(response);
					// console.log(response);
					
					dtlList = output.list;
					statusMsg = output.msg;
					if (statusMsg == 'Y') {
						formRepairDetailsContent(dtlList[0]);
						formRepairDetailsContentForEdit(dtlList[0]);
						securityMatrix();
					} else {
						// SHOW alert MESSAGE
						showError(statusMsg);
					}
					
				} else {
					showError("No Data Found.");
				}
			}
			
			 stopLoading();
		},
		error : function(response) {
			// showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
}

function bindLookupResultEvents() {
	$('.servcieOrderTable tbody tr').click(function() {
		var rowObj = $(this).closest('tr');
		serviceOrderNo = rowObj.attr('id');
		getServiceOrderDetail(serviceOrderNo);
		createDate=rowObj.find('.createDate').text();
		stockType = rowObj.find('.stockType').text();
		articleNum=rowObj.find('.articleNo').text()
		dueDate = rowObj.find('.dueDate').text();
		vendorNo = rowObj.find('.supplier').text().split('-')[0].trim();
		status = rowObj.find('.status').text();
		grDate = rowObj.find('.grDate').text().trim();
		repairAgentCode = rowObj.find('.repairAgentCode').text();
		repairAgentName = rowObj.find('.repairAgentName').text();
		storeOrCustomer= rowObj.find('.storeOrCustomer').text().trim();
		$('#serviceAggrementLoadedFlag').val('false');
	});
	$('.selectedCheckbox')
			.click(
					function(e) {
						e.stopPropagation();
						if ($('.selectedCheckbox').is(':checked')) {
							var rowObj = $(this).closest('tr');
							multiSelectList.push(rowObj.attr('id'));
							if ($("#dropdownSelect").hasClass('hideBlock'))
								$("#dropdownSelect").removeClass('hideBlock');
						} else if ($('.selectedCheckbox:visible').length == $('.selectedCheckbox:visible:not(:checked)').length) {
							$("#dropdownSelect").addClass('hideBlock');
						}
					});
}

function formRepairDetailsContent(obj) {
	
	$('.serviceOrderNo').text(serviceOrderNo);
	$('.serviceOrderNo').val(serviceOrderNo);
	$('.lookup').removeClass('currentPage');
	$('#orderStatus').text(status);
	/*if(status == "OPEN")
		{
		showActionButtons();
		}
	else
		{
		hideActionButtons();
		}*/
	if(status == "OPEN")
		{
		showActionButtons();
		}
	else if(status == "COMPLETED")
		{
		hideActionButtonsForClosedStatus();
		}
	else 
	    {
	    hideActionButtonsForCancelledStatus();
	    }
	
	$('.details').addClass('currentPage').removeClass('hideBlock');
	$('.statusWrapper').removeClass('hideBlock');
	
	
	getCartonLabelForServiceOrder(obj);
	
	$('#dialog-complete').parent().find('.ui-dialog-title').text(
			'Complete Service Order #' + serviceOrderNo);
	$('#dialog-cancel').parent().find('.ui-dialog-title').text(
			'Cancel Service Order #' + serviceOrderNo);
	
	
}

function completeServiceOrder() {

	var closureActCode = $('.complete-closure-act-code').val();
	var remarks = $('.complete-remarks').val();
	var consignementNote = "";//$('.complete-dcr').val();
	var serviceFeedBack = $('.complete-feedback').val();
	var hdrText = '';
	var articleUom = '';
	var totalAmount = "0.01";//$('.complete-amount').val();
	var createDate=$('.complete-date').val();
	var userId=$('.complete-user').val();
if( closureActCode != '' && remarks != '' &&
 totalAmount != '' && totalAmount != '0')
	{
	var data = {
		serviceOrderNo : serviceOrderNo,
		customerName :  custName,
		contactNumber : custNo,
		closureActCode : closureActCode,
		remarks : remarks,
		consignementNote : consignementNote,
		serviceFeedBack : serviceFeedBack,
		articleNo : articleNumber,
		articleDesc : articleDescription,
		hdrText : hdrText,
		articleUom : articleUom,
		totalAmount : totalAmount
	};
	callServiceForComplete(data);
	return true;
}
else
	{
	$("#dialog-complete").dialog("open");
	if(closureActCode == '') 
		showErrorInCompPop('Please Enter Closure Action Code');
	else if( remarks == '' ) 
		showErrorInCompPop('Please Enter Remarks');	
	else if(totalAmount == '')
		showErrorInCompPop('Please Enter Total Amount');
	else if(totalAmount == '0')
		showErrorInCompPop('Please Enter valid Total Amount');
	/*else if( consignementNote == '') 
		showErrorInCompPop('Please Enter DCR');*/
	/*else if(serviceFeedBack == '')
		showErrorInCompPop('Please Enter Service Feedback');*/
	
	return false;
	}
}
function cancelServiceOrder() {

	var closureActCode = $('.cancel-closure-act-code').val();
	var remarks = $('.cancel-remarks').val();
	var cancelReason = $('.cancel-reason').val();
	//var authorisationCode = $('.cancel-auth-code').val();
	var articleUom = '';
	var totalAmount = $('.cancel-amount').val();
if(closureActCode != '' && cancelReason != '')
	{
	var data = {
		serviceOrderNo : serviceOrderNo,
		customerName :  custName,
		contactNumber : custNo,
		closureActCode : closureActCode,
		remarks : remarks,
		cancelReason : cancelReason,
		//authorisationCode : authorisationCode,
		articleNo : articleNumber,
		articleUom : articleUom,
		totalAmount : totalAmount
	};
	if(stockType == 'REPAIR' && storeOrCustomer == 'STORE' && repairArticleList!=null && repairArticleList.length>0
			 && (grDate == '' && pickupdateRes !='')
			 ){
		var param = {
				"iv_article" : repairArticleList[0].article,
				"iv_sub_category_no": repairArticleList[0].sub_category_no
			};

			console.log(validateSTInprogress + ' ' + JSON.stringify(param));
				$.ajax({
					type : "POST",
					url : validateSTInprogress,
					data : JSON.stringify(param),
					beforeSend : function() {
						startLoading();
					}
				}).done(
						function(response) {
							if (checkResult(response,'msg_type','Repair Service Order')) {
								if (response[0].msg_type == 'S') {
									callServiceForCancel(data);
								}else{
									if (response[0].msg != undefined
											&& response[0].msg != '') {
										$.fn.showCustomMsg([ response[0].msg ], error,
												'Repair Service Order');
									}else{
										$.fn.showCustomMsg([ 'The Repair Service Order creation failed' ], error,
										'Repair Service Order');
									}
									stopLoading();
								}
							}
					//stopLoading();
				}).fail(function() {
					$.fn.showCustomMsg([ mobiSerErrCode ], error);
					stopLoading();
				});
	}else{
		callServiceForCancel(data);
	}
	return true;
	}
else
	{
	$("#dialog-cancel").dialog("open");
	if(closureActCode == '') 
		showErrorInCnclPop('Please Enter Closure Action Code');
	else( cancelReason == '')  
		showErrorInCnclPop('Please Enter Cancel Reason');
	/*else if(authorisationCode == '')
		showErrorInCnclPop('Please Enter Authorisation Code');
	else if( remarks == '' ) 
		showErrorInCnclPop('Please Enter Remarks');	*/
	return false;
	}
}

function callServiceForComplete(data) {

	$.ajax({
		type : "POST",
		url : "completeRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideErrorInCompPop();
			startLoading();
		},
		success : function(response) {
			var message = '';
			var result = '';
			result = $.parseJSON(response);
			message = result.msg;
			if (message == '') {
				$.fn.warnPopup('',completedScreenMsg,'Service Order complete','','',serviceOrderPopUpScreenYes,$(this));
			/*	$("#dialog-complete").dialog("close");
			window.location.href="../repair/onPageLoad.htm";*/
			} else {
				$("#dialog-complete").dialog("open");
				showErrorInCompPop(message);
				stopLoading();
			}
			stopLoading();

		},
		error : function(response) {
			showErrorInCompPop('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}

function callServiceForCancel(data) {

	$.ajax({
		type : "POST",
		url : "cancelRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideErrorInCnclPop();
			startLoading();
		},
		success : function(response) {
			var message = '';
			var result = '';
			result = $.parseJSON(response);
			message = result.msg;
			if (message == '') {
				// Gaps for Goods Summary Report, Stocktake defect 11256
				if(stockType == 'REPAIR' && storeOrCustomer == 'STORE' && repairArticleList!=null && repairArticleList.length>0){
					var articleNo = orderInfo.article;
					var uom = repairArticleList[0].base_uom;
 					if(grDate == '' && pickupdateRes !=''){
						adjustLocalSOH(articleNo,uom,repairsPostiveMvmt,"1",serviceOrderNo,true,'C');
 					}else{
 						$.fn.warnPopup('',cancelledScreenMsg,'Service Order Cancel','','',serviceOrderPopUpScreenYes,$(this));
 					}
				}else{
					$.fn.warnPopup('',cancelledScreenMsg,'Service Order Cancel','','',serviceOrderPopUpScreenYes,$(this));
				}
			} else {
				$("#dialog-cancel").dialog("open");
				showErrorInCnclPop(message);
				stopLoading();
			}
			stopLoading();

		},
		error : function(response) {
			showErrorInCnclPop('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}

function formArticleInfoWrapperContentForDetailsPage(obj) {
	var content = '';
	content += '<div class="articleInfoWrapper"><p class="secondaryInfo"><label class="articlePriceLabel">'
			+ 'Create Date: <strong>'
			+ obj.createdate
			+ '</strong></label><label class="articlePriceLabel">|</label><label class="articlePriceLabel">'
			+ 'Follow-up Date: <strong>'
			+ dueDate
			+ '</strong></label><label class="articlePriceLabel">|</label><label class="articlePriceLabel">'
			+ 'Expected Resolution Date: <strong>'
			+ obj.resoldate
			+ '</strong></label><label class="fyi">Last reminder was sent on '
			+ obj.remainderdate + '</label></p></div>';
	return content;
}

function formCustomerDetailsContentForDetailsPage(obj) {
	var content = '';
	custName= obj.name;
	custNo= obj.contactnumber;
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Customer Details</td></tr>'
			+ '<tr class=""><td class="keyInfo">Name:</td><td class="valueInfo">'
			+ obj.name
			+ '</td><td class="keyInfo">Contact Number:</td><td class="valueInfo">'
			+ obj.contactnumber
			+ '</td><td class="keyInfo noDivider">Email ID:</td><td class="valueInfo lastColumn">'
			+ obj.customer_email + '</td></tr>'
			+ '<tr class="lastRow"><td class="keyInfo">Address:</td>'
			+ '<td class="valueInfo lastColumn" colspan="5">' + obj.address + ((obj.post_code||'')!='' ? (' - '+obj.post_code||'') : '')
			+ '</td></tr></table></div>';
	return content;
}

function formPurchaseAndRepairContentForDetails(obj) {
	var content = '';
	articleNumber = obj.article;
	articleDescription = obj.art_desc;
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Purchase & Repair Details</td></tr><tr>'
			+ '<td class="keyInfo">Article:</td><td class="valueInfo lastColumn" colspan="5	">'
			+ obj.article
			+ ' - '
			+ obj.art_desc
			+ '</td></tr><tr class="lastRow"><td class="keyInfo" >Fault Description:</td><td class="valueInfo">'
			+ obj.fault_description
			+ '</td><td class="keyInfo">Date of Purchase:</td><td class="valueInfo">'
			+ obj.purchase_date
			+ '</td><td class="keyInfo">Proof of Purchase:</td><td class="valueInfo lastColumn">'
			+ obj.purchase_proof + '</td></tr></table></div>';
	return content;
}

function formChargeDetailsContentForDetailsPage(obj) {
	var content = '';
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+ '<td class="subTitle" colspan="6">Charges Details</td></tr>'
			+ '<tr><td class="keyInfo">Amount Payable:</td><td class="valueInfo">'
			+ '$'
			+ (obj.total_amount<=0.01 ? "0" :obj.total_amount)
			+ '</td><td class="keyInfo">Article Under:</td><td class="valueInfo">'
			+ obj.article_service
			+ '</td><td class="keyInfo">Freight Cost:</td><td class="valueInfo lastColumn">'
			+ Number(obj.freight_cost)
			+ '</td></tr><tr class="lastRow"><td class="keyInfo">Comments:</td>'
			+ '<td class="valueInfo lastColumn" colspan="5">' + obj.comments
			+ '</td></tr></table></div>';
	return content;

}

function formRepairAgentContentForDetailsPage(obj) {
	var content = '';
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Repair Agent Details</td></tr><tr class="">'
			+ '<td class="keyInfo">Repair Agent:</td><td class="valueInfo">'
			+ repairAgentName
			+ '('
			+ repairAgentCode
			+ ')'
			+ '</td><td class="keyInfo">Contact Number:</td><td class="valueInfo">'
			+ repairAgentContactNumber
			+ '</td><td class="keyInfo noDivider"></td><td class="valueInfo lastColumn"></td></tr>';
			if(stockType == 'SPARES' || storeOrCustomer == 'STORE'){
				content += '<tr class="lastRow"><td class="keyInfo">Authorisation Code:</td><td class="valueInfo">'
				+ obj.auth_code
				+ '</td><td class="keyInfo">Authority Name:</td><td class="valueInfo">'
				+ obj.authority_name
				+ '</td><td class="keyInfo noDivider"></td><td class="valueInfo lastColumn">'
				+ '</td></tr>';
			}
			content +='</table></div>';
	return content;
}

function formDispatchContentForDetailsPage(obj) {
	var content = '';
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Despatch Details</td></tr>'
			+ '<tr class=""><td class="keyInfo">Goods Pickup Date:</td><td class="valueInfo">'
			+ obj.pickupdate
			+ '</td><td class="keyInfo">Carrier:</td><td class="valueInfo">'
			+ obj.carrier
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class=" lastColumn">&nbsp;</td></tr>'
			+ '<tr class=""><td class="keyInfo">Follow-up Date:</td><td class="valueInfo">'
			+ dueDate
			+ '</td><td class="keyInfo">Contact Number:</td><td class="valueInfo">'
			+ obj.contact_number
			+ '</td><td class="keyInfo noDivider"></td><td class="valueInfo lastColumn"></td></tr>'
			+ '<tr class="lastRow"><td class="keyInfo">Consignment Note:</td><td class="valueInfo">'
			+ obj.consignment_note
			+ '</td><td class="keyInfo noDivider"></td><td class="valueInfo noDivider"></td>'
			+ '<td class="keyInfo noDivider"></td><td class="valueInfo lastColumn"></td></tr>'
			+ '</table></div>';
	return content;
}

function showServiceOrderDetailsPage() {
	$('#repairLookUpWrapper').addClass('hideBlock');
	$('#serviceOrderDetailsWrapper').removeClass('hideBlock');
	$('#editServiceOrderWrapper').addClass('hideBlock');
}
function hideServiceOrderDetailsPage() {
	$('#repairLookUpWrapper').removeClass('hideBlock');
	$('#serviceOrderDetailsWrapper').removeClass('hideBlock').addClass(
			'hideBlock');
	$('#editServiceOrderWrapper').addClass('hideBlock');

}
function hideLookupResultsContent() {
	$('.serviceOrderTablewrapper').addClass('hideBlock');
}
function showError(msg) {
	$('#errorMsgDiv').addClass('hideBlock').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}
function showErrorEdit(msg) {
	$('#errorMsgDivEdit').addClass('hideBlock').removeClass('hideBlock');
	$('#errorMsgDivEdit').addClass('errorDiv').find('#errorMsg').text(msg);
}
function showErrorInCompPop(msg) {
	$('#errorMsgDivCompPop').addClass('hideBlock').removeClass('hideBlock');
	$('#errorMsgDivCompPop').addClass('errorDiv').find('#errorMsgCompPop').text(msg);
}
function showErrorInCnclPop(msg) {
	$('#errorMsgDivCnclPop').addClass('hideBlock').removeClass('hideBlock');
	$('#errorMsgDivCnclPop').addClass('errorDiv').find('#errorMsgCnclPop').text(msg);
}
function hideErrorInCompPop() {
	$('#errorMsgDivCompPop').removeClass('hideBlock').addClass('hideBlock');
}
function hideErrorInCnclPop() {
	$('#errorMsgDivCnclPop').removeClass('hideBlock').addClass('hideBlock');
}
function hideError() {
	$('#errorMsgDiv').removeClass('hideBlock').addClass('hideBlock');
}
function validateLookup() {
	hideError();
	var postcode = $('#pcode').val();
	var contactNumber = $('#conNum').val();
	var customerName = $('#custName').val();
	var dateFrom = $('#dateFrom').val();
	var dateTo = $('#dateTo').val();
	var searchText = $('#searchBox').val();
	if (postcode == '' && contactNumber == '' && customerName == ''
			&& dateFrom == '' && dateTo == '' && searchText == '') {
		showError("Please enter service order no or any other Input");
		return false;
	} else if ((dateFrom != '' && dateTo == '')
			|| (dateFrom == '' && dateTo != '')) {
		showError("Please select Date Range.");
		return false;
	} else if (dateFrom != '' && dateTo != '') {
		return validateDatesInLookup();
	}
	return true;
}

function formRepairDetailsContentForEdit(obj) {
	orderInfo = obj;
	pickupdateRes = obj.pickupdate;
	var ed = $('#editServiceOrderWrapper');

	ed.find('.articleNo').text(parseInt(obj.article));
	ed.find('.article').val(parseInt(obj.article));
	ed.find('.articleDesc').text(obj.art_desc);
	ed.find('.articleDesc').val(obj.art_desc);
	ed.find('.stockType').text(stockType);
	ed.find('.stockType').val(stockType);
	if(stockType=='REPAIR')
	{
	ed.find('.stockType').text(storeOrCustomer);
	ed.find('.stockType').val(storeOrCustomer);
	}
	ed.find('.customerName').val(obj.name);
	ed.find('.address').val(obj.address);
	//try {
		//var index = obj.address.spilt('|').length - 1;
		ed.find('.postcode').val(obj.post_code||'');
	//} catch (err) {
		//ed.find('.postCode').val('');
	//}
	ed.find('.contactNumber').val(obj.contactnumber);
	ed.find('.email').val(obj.customer_email);
	ed.find('.dateOfPurchase').val(obj.purchase_date);
	ed.find('.proofOfPurchase').val(obj.purchase_proof);
	ed.find('.faultDescription').val(obj.fault_description);
	ed.find('input[name="service"][value=' + obj.article_service + ']').prop(
			'checked', true);
	ed.find('.totalAmount').val((obj.total_amount<=0.01 ? "0" :obj.total_amount));
	ed.find('.comments').val(obj.comments);
	ed.find('.authorisationCode').val(obj.auth_code);
	ed.find('.authorityName').val(obj.authority_name);
	if(stockType == 'SPARES')
		ed.find('.pickUpDate').val(createDate);
	else
		ed.find('.pickUpDate').val(obj.pickupdate);
	ed.find('.vendorReturnDate').val(grDate);
	ed.find('.dueDate').val(dueDate);
	ed.find('.consignementNote').val(obj.consignment_note);
	ed.find('.carrierName').val(obj.carrier);
	ed.find('.carrierContact').val(obj.contact_number);
	if ($('#serviceAggrementLoadedFlag').val() != 'true') {
		getArticleServiceAggrement(Number(obj.article));
	}
	if($('.pickUpDate').val() == '')
		{
		$('#returnDate').prop('disabled',true);
		}
	else
		{
		$('#fud').val(Add21Days());
		$('#returnDate').prop('disabled',false);
		}
	if(stockType == 'SPARES')
		{
		$('.pickUpDate').prop('disabled',true);
		$('.pickUpDate').removeClass('inputDate');
		}
	else
		{
		
		$('.pickUpDate').prop('disabled',false);
		$('.pickUpDate').removeClass('inputDate').addClass('inputDate');
		
		}
		
		if(stockType=="SPARES" || storeOrCustomer=="STORE")
		{
		ed.find('.customerDetails').addClass('hideBlock');
		ed.find('.purchaseProof').addClass('hideBlock');
		}else{
			ed.find('.customerDetails').removeClass('hideBlock');
			ed.find('.purchaseProof').removeClass('hideBlock');
		}
	   if(stockType=='REPAIR' && storeOrCustomer=="CUSTOMER" )
		{
		ed.find('.VendorOrRepairAgentDetails').removeClass('hideBlock');	//Defect_9305
		}
		
}

function getArticleServiceAggrement(articleNo) {
	// console.log('articleNo '+articleNo);
	param = {
		"articleNo" : articleNo
	};
	var flag = false;
	$
			.ajax({
				type : "POST",
				url : "getArticleServiceAggrement.htm",
				data : param,

				beforeSend : function() {
					hideError();
					startLoading();
				},
				success : function(response) {
					// console.log(response);
					var message = '';
					var output = $.parseJSON(response);
					message = output.msg;
					serviceAgreementList = output.list;
					if (message == 'Y') {
						if (serviceAgreementList.length > 1) {
							for ( var i = 0; i < serviceAgreementList.length; i++) {
								if (!flag
										&& vendorNo == serviceAgreementList[i].main_vendor) {
									formServiceAgreementContent(
											serviceAgreementList, i);
									flag = true;
								}
							}
							if (!flag) {
								$('#serviAgreement').html(
										"Service Agreement not found for the article("
												+ articleNo + ")");
							}
						} else if (serviceAgreementList.length == 1) {
							formServiceAgreementContent(serviceAgreementList, 0);
						}

					} else {
						$('#serviAgreement').html(
								"Service Agreement not found for the article("
										+ articleNo + ")");
						stopLoading();
					}
					stopLoading();

				},
				error : function(response) {
					$('#serviAgreement').html(
							'Sorry, Some technical issue occured.');
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});

}

function formServiceAgreementContent(serviceAgreementList, i) {
	var list = serviceAgreementList[i];
	var content = '';
	content += '<p class="notes"><strong>Service Agreement </strong></p>'
			+ '<div class="parameter">'
			+ '<table width="100%" class="plainTable">'
			+ '<tr><td>Repair Agent:</td><td>'
			+ list.repair_agent_name
			+ '('
			+ list.repair_agent
			+ ')'
			+ '</td></tr>'
			+'<tr><td>Address:</td><td>'
			+ list.zagent_street+' ,<br>'
			+list.zagent_city1+' ,'
			+list.zagent_post_code1+' .'
			+'</tr>'
			+ '</td></tr><tr><td>Contact:</td><td>'
			+ list.zztelf1
			+ '</td></tr><tr><td>Can raise repair request?</td><td>'
			+ (list.zzrepairorders != '' && list.zzrepairorders != null
					&& list.zzrepairorders != undefined
					&& list.zzrepairorders == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Can raise claim?</td><td>'
			+ (list.zzraiseclaim != '' && list.zzraiseclaim != null
					&& list.zzraiseclaim != undefined
					&& list.zzraiseclaim == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Need repair authorisation?</td><td>'
			+ (list.zzraforclaim != '' && list.zzraforclaim != null
					&& list.zzraforclaim != undefined
					&& list.zzraforclaim == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Under warranty?</td><td>'
			+ (list.zzwarranty != '' && list.zzwarranty != null
					&& list.zzwarranty != undefined
					&& list.zzwarranty == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Warranty Period:</td><td>'
			+ list.zzwrntypd + ' '+ list.zzwrntypdind 
			+ '</td></tr><tr><td colspan="2">&nbsp;</td></tr>'
			+ '<tr><td>Replacement packaging?</td><td>'
			+ (list.zzreplacepkg != '' && list.zzreplacepkg != null
					&& list.zzreplacepkg != undefined
					&& list.zzreplacepkg == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Contact Number:</td><td>'
			+ list.zztelf3
			+ '</td></tr><tr><td colspan="2">&nbsp;</td></tr>'
			+ '<tr><td>Spare parts?</td><td>'
			+ (list.zzspareparts != '' && list.zzspareparts != null
					&& list.zzspareparts != undefined
					&& list.zzspareparts == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Contact Number:</td><td>'
			+ list.zztelf2
			+ '</td></tr><tr><td colspan="2">&nbsp;</td></tr>'
			+ '<!--<tr><td>S&D markdown?</td><td>'
			+ 'Yes / No'
			+ '</td></tr>--><tr><td>Valid From:</td><td>'
			+(list.datab != '' && list.datab != null
					&& list.datab != undefined  ? (list.datab).replace('.','/').replace('.','/').replace('.','/')
							: '')
			+ '</td></tr><tr><td>Special Communications:</td><td>'
			+ list.zzspecialcomments + '</td></tr>'
			+'<tr><td>Markdown Flag:</td><td>'
			+"Y" + '</td></tr></table></div>';
	$('#serviAgreement').html('');
	$('#serviAgreement').append(content);
	$('#serviceAggrementLoadedFlag').val('true');
}
function validateDatesInLookup() {
	
	var fromDate = formateDate($('#dateFrom').val());
	var toDate = formateDate($('#dateTo').val());
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth();
	var newYear = today.getFullYear();
	var curDate = new Date(newYear, newMonth, newDate);
	var date1 = new Date();

	var parts = fromDate.split('/');
	var partsLen = parts.length;
	var date1Len = fromDate.length;
	date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
	var newTime = Number(date1.getTime());

	var dateComFrom = new Date(fromDate.split('/')[2],
			fromDate.split('/')[1]-1, fromDate.split('/')[0]);
	var dateComTo = new Date(toDate.split('/')[2], toDate
			.split('/')[1]-1, toDate.split('/')[0]);
	var toYear = dateComTo.getFullYear();
	var fromYear = dateComFrom.getFullYear();
	var toMonth = dateComTo.getMonth();
	var fromMonth = dateComFrom.getMonth();
	var toDay = dateComTo.getDate();
	var fromDay = dateComFrom.getDate();
	var rangeDate = new Date(toDate.split('/')[2],
			toDate.split('/')[1]-1, toDate.split('/')[0]);

	var date2 = new Date();
	var part = toDate.split('/');
	var partLen = part.length;
	var date2Len = toDate.length;
	date2.setFullYear(part[2], part[1] - 1, part[0]);

	var splittedDate = formateDate($('#dateTo').val(),
			$('#dateTo').val().split('/').length)
			.split('/');
	var splittedTwo = splittedDate[0] + splittedDate[1]
			+ splittedDate[2];

	newTime = Number(newTime)
			+ Number(24 * 60 * 60 * 1000 * 90);

	if (fromDate == "") {
		showError('Please enter From Date.');
		return false;
	} else if (toDate == "") {
		showError('Please enter To Date.');
		return false;
	} else if (partsLen != 3 || date1Len != 10
			|| fromDate.split('/')[0] > 31
			|| fromDate.split('/')[1] > 12
			|| fromDate.split('/')[2].length != 4) {
		showError('Invalid From Date.');
		return false;
	} else if (partLen != 3 || date2Len != 10
			|| toDate.split('/')[0] > 31
			|| toDate.split('/')[1] > 12
			|| toDate.split('/')[2].length != 4) {
		showError('Invalid To Date.');
		return false;
	} else if (date1.getTime() > date2.getTime()) {
		showError('To Date should not be lesser than the From Date');
		return false;
	}

	else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
			|| isNaN(splittedTwo)) {

		showError("Invalid Date Format");
		return false;
	}
	else if (rangeDate > curDate) {
		console.log("rangeDate"+rangeDate);
		console.log("curDate"+curDate);
		showError("Future Dates are not allowed for To Date.");
		return false;
	}

	else if ((toYear - fromYear) == 1) {
		if (((toMonth - fromMonth) + 12) > 1) {
			showError('Date difference should not be greater than 30 days');
			return false;
		} else if ((((toMonth - fromMonth) + 12) == 1)
				&& (((toDay - fromDay) + 30) > 30)) {
			showError('Date difference should not be greater than 30 days');
			return false;
		} else {
			return true;
		}
	} else if (toYear - fromYear == 0) {
		if ((toMonth - fromMonth) > 1) {
			showError('Date difference should not be greater than 30 days');
			return false;
		} else if (((toMonth - fromMonth) == 1)
				&& (((toDay - fromDay)) > 30)) {
			showError('Date difference should not be greater than 30 days');
			return false;
		} else {
			return true;
		}
	} else if ((toYear - fromYear) >= 1) {
		showError('Date difference should not be greater than 30 days');
		return false;
	}


return true;

}
function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}

function validateUpdateForm() {

	var errors = '';
	if ($('#ta').val() == '')
	{
		errors += getError("Please enter Total Amount Payable.");
	}
	if ($('#pickDate').val() != '' && $('#prevPickDate').val() != $('#pickDate').val())
		{
		if (!isValidDate($('#pickDate').val())) {
			errors += getError("Please enter valid Pick Up date.");
		}
		if (compareDate($('#pickDate').val(),createDate) == 'lt') {
			errors += getError("Pick Up date Should Be In Future.");
		}
		}
	if ($('#fud').val() != '')
		{
		if (!isValidDate($('#fud').val())) {
			errors += getError("Please enter valid Due date.");
		}
		}
	 if($('#returnDate').val() != '') 
		 if(!isValidDate($('#returnDate').val())) { 
		 errors += getError("Please enter valid Vendor Goods Return date."); 
	  }
	if(!$('#returnDate').is(':disabled') && $('#returnDate').val() != '')
		{
	 if(compareDate($('#pickDate').val(), $('#returnDate').val()) == 'gt')
		 {
		 errors += getError("Vendor Goods Return Date Should Be Gretaer Than Pickup Date"); 
		 }
		}
	if (pickChanged && dueChanged) {
		if ($('#pickDate').val() != '' && $('#fud').val() != '') {
			console.log("Date differe : --@@@@@ :"
					+ diff($('#pickDate').val(), $('#fud').val()));
			if (diff($('#pickDate').val(), $('#fud').val()) < 0)
				errors += getError("Due date should be greater than Pickup Date");
		}
	}
	//defect 2400
	/*if(stockType == 'REPAIR' && storeOrCustomer == 'CUSTOMER' && $('#proof').val().trim() == ''){
		errors += getError("Please enter proof of purchase");
	}*/
	if (errors == '') {
		return true;
	} else {
		showAllErrors(errors);
		return false;
	}

}
// Gaps for Goods Summary Report, Stocktake defect 11256
function callServiceForUpdate(data) {
	if(stockType == 'REPAIR' && storeOrCustomer == 'STORE' && repairArticleList!=null && repairArticleList.length>0
			 && ((grDate == '' && $('#returnDate').val() != '') || (pickupdateRes == '' && $('#pickDate').val() != ''))){
		var param = {
				"iv_article" : repairArticleList[0].article,
				"iv_sub_category_no": repairArticleList[0].sub_category_no
			};

			console.log(validateSTInprogress + ' ' + JSON.stringify(param));
				$.ajax({
					type : "POST",
					url : validateSTInprogress,
					data : JSON.stringify(param),
					beforeSend : function() {
						startLoading();
					}
				}).done(
						function(response) {
							if (checkResult(response,'msg_type','Repair Service Order')) {
								if (response[0].msg_type == 'S') {
									callSerivceOrderUpdateInfo(data);
								}else{
									if (response[0].msg != undefined
											&& response[0].msg != '') {
										$.fn.showCustomMsg([ response[0].msg ], error,
												'Repair Service Order');
									}else{
										$.fn.showCustomMsg([ 'The Repair Service Order creation failed' ], error,
										'Repair Service Order');
									}
									stopLoading();
								}
							}
					//stopLoading();
				}).fail(function() {
					$.fn.showCustomMsg([ mobiSerErrCode ], error);
					stopLoading();
				});
	}else{
		callSerivceOrderUpdateInfo(data);
	}
}

function callSerivceOrderUpdateInfo(data){
	if(stockType == 'SPARES')
	{
	$('.pickUpDate').prop('disabled',true);
	}
	$.ajax({
		type : "POST",
		url : "updateRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			var message = '';
			var result = '';
			result = $.parseJSON(response);
			message = result.msg;
			if (message == 'Y') {
				// Gaps for Goods Summary Report
				var serviceNo = result.list[0].IV_SERVICE_ORD_NO;
				if(stockType == 'REPAIR' && storeOrCustomer == 'STORE' && repairArticleList!=null && repairArticleList.length>0){
					var articleNo = orderInfo.article;
					var uom = repairArticleList[0].base_uom;
 					if(grDate == '' && $('#returnDate').val() != '' /*&& $('#returnDate').val() != grDate*/){
						adjustLocalSOH(articleNo,uom,repairsPostiveMvmt,"1",serviceNo,false,'R');
 					}else if(pickupdateRes == '' && $('#pickDate').val() != '' /*&& pickupdateRes != $('#pickDate').val()*/){
						adjustLocalSOH(articleNo,uom,repairsNegativeMvmt,"-1",serviceNo,false,'P');
 					}else{
						$('#dialog-created').parent().find('.ui-dialog-title').text('Service Request Update');
						$("#dialog-created").dialog("open");
						$("#dialog-created").parent()
								.find('.serviceOrderNoText strong').text(serviceNo);
 					}
				}else{
					$('#dialog-created').parent().find('.ui-dialog-title').text('Service Request Update');
					$("#dialog-created").dialog("open");
					$("#dialog-created").parent()
							.find('.serviceOrderNoText strong').text(serviceNo);
				}
			} else {
				showErrorEdit(message);
				$('.scrollup').trigger('click');
				stopLoading();
			}
			stopLoading();

		},
		error : function(response) {
			showErrorEdit('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
}
function callServiceForReminderUpdate(data) {

	$.ajax({
		type : "POST",
		url : "remindRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			var message = '';
			var result = '';
			result = $.parseJSON(response);
			message = result.msg;
			if (message == 'Y') {
				var serviceNo = result.list[0].IV_SERVICE_ORD_NO;
				showSuccessMessage("Reminder email sent to the Repair /Spare Agent.");
				stopLoading();
			} else {				
				showFailMessage(getError(message));
				stopLoading();
			}
			stopLoading();

		},
		error : function(response) {
			showFailMessage('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}
function printReminderLetter(obj,dtlObj) {
	var content = '';
	var printHead = '<div class="width100" style=""><div class="bigwLogo"><label style="padding-left: 315px;"><strong>A Division Of Woolworths Limited</strong></label></br><label style="padding-left: 315px;"><strong>A.B.N. '+obj.zabn_number+'</strong></label>';
	var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	content += '<div class="styleForDiv"><table style="{width : 75%; !important}">'
		+ '<tr  rowspan="11" >' + '<td colspan="4" >' + '<div class="right-align">'
		+ 'Date:' 
		+ obj.zorder_date
		+ '</br>' + ''
		+ obj.zstore_name1
		+ '</br>'
		//+ '                                                                          '
		+ obj.zstore_street
		+ '</br>'
		//+ '                                                                          '
		+ obj.zstore_city1
		+ ' '
		+ obj.zstore_post_code
		+ '</br>'
		//+ '                                                                          '
		+ obj.zstore_tel_number
		+ '</div>'
		+ '</td>'
		+ '</tr><tr><td colspan="4">'
		+ '</br>'
		//+ '                                                                          '
		+'The Service Manager'
		+ '</br>'
		+ obj.zagent_name1
		+ '</br>'
		+ obj.zagent_street
		+ '</br>'
		//+ '          '
		+ obj.zagent_city1
		+ ' '
		+ obj.zagent_post_code1
		+ '</td></tr></br><tr><td></br>'
		+ 'Dear Sir/Madam </br>'
		+'</br>'
		+ 'We are concerned that goods sent to your Company for assessment or repair had not been returned or assessment outcome has not been provided. Please refer to the Trading Terms which specify our agreed position on product returns</br></br>' 
		+ 'Details of specific products are listed below.</br></br>' 
		+ 'Please contact us promptly to provide the outcome of the assessment/repair.</br></br>' 
		+ 'If the assessment or repaired goods are not received within 5 days, action will be taken which may result in goods being returned for our customer and claim to cover the value of the goods being passed to the manufacturer or their authorised Repair Agent under Australian Consumer Law.</br></br>' 
		+ 'Yours faithfully.</br>_______________</br></br>' 
		+ obj.zstore_name1
		+ '</td></tr>'	
		+ '</table></br>';
	content +='<table id="goods" width="100%" align="left"><tr class="goods"><td class="table-header">Despatched</td><td class="table-header">Repair Order No.</td><td class="table-header">Goods</td></tr><tr><td>'
		+dtlObj.pickupdate
		+'</td><td>'
		+serviceOrderNo
		+'</td><td>'
		+dtlObj.article+' '+dtlObj.art_desc
		+'</td></tr></table>'
	    +'</br></br></br><label class="">Please reply on this form and return by Fax on: <strong>'+obj.zfax_number+'</strong></label>';
	$('#printbodyForRemLtr')
	.html('')
	.append(printHead+content)
	.append(
			'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');
}
function printAcceptanceNote(obj) {
	var content = '';
	content += '<div>&nbsp;</div><div class="styleForDiv" ><label class="">'
			+ ' Service Request No: <strong>'
			+ serviceOrderNo
			+ '</strong></label><label class="separator">|</label><label class="">'
			+ 'Date Of Purchase: <strong>' + obj.purchase_date
			+ '</strong></label></div><div>&nbsp;</div>';
	content += '<table><tr><td><strong> Customer Details</strong></td><td></td><td><strong>Service Request Details</strong></td></tr>'
			+ '<tr><td><strong>'
			+ obj.name
			+ '</strong><br>'
			+ obj.address
			+ '</td><td></td><td><strong>'
			+ obj.art_desc
			+ '</strong><br> Article No : '
			+ obj.article
			+ '</td></tr><tr><td><strong> Phone Number</strong><br>'
			+ obj.contactnumber
			+ '</td><td></td><td><strong> Fault Description</strong><br>'
			+ obj.fault_description
			+ '</td></tr><tr><td><strong> Email ID</strong><br>'
			+ obj.customer_email
			+ '</td><td></td><td><strong> Article Service</strong><br>'
			+ obj.article_service
			+ '</td></tr><tr><td></td><td></td><td><strong> Amount Payable</strong><br>'
			+ (obj.total_amount<=0.01 ? "0" :obj.total_amount)
			+ '</td></tr><tr><td></td><td></td><td></td></tr></table>';

	content += '<div class="styleForNote"><label>Note: Expected Resolution Date is '
			+ obj.resoldate + '</label></div>';
	var printHead = '<div class="width100" style=""><div class="bigwLogo"><div class="posFixed"><label><label class="bigFont"><strong>'
			+ storeName
			+ '</strong></label><br>'
			+ storeStreet
			+ '<br>'
			+ storeCity
			+ ' '
			+ storePostalCode
			+ '</label><label class=" boxed center">Goods Acceptance Note</label><br>'
			+ '<label><strong>Phone Number </strong><br>'
			+ storeContactNumber
			+ '</label></div> </div>	<div class="width70 margin5 margontopnone inline-block"> </div></div>';
	var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	$('#printbodyForAcpNot')
			.html('')
			.append(printHead + content + printFoot)
			.append(
					'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');

}
function printServiceOrder(obj) {
	var content = '';
	content += '<div class="margin5 margontopnone"><label class="articlePriceLabel">'
			+ 'Create Date: <strong>'
			+ obj.createdate
			+ '</strong></label><label class="separator">|</label><label class="articlePriceLabel">'
			+ 'Follow-up Date: <strong>'
			+ dueDate
			+ '</strong></label><label class="separator">|</label><label class="articlePriceLabel">'
			+ 'Expected Resolution Date: <strong>'
			+ obj.resoldate
			+ '</strong></label>'
			+ '</div><div>&nbsp;</div>';

	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+ '<td class="subTitle" colspan="6">' + obj.article + ' - '
			+ obj.art_desc + '</td></tr><tr><td></td></tr>' + '</table></div>';

	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+ '<td class="subTitle" colspan="6">Charges Details</td></tr>'
			+ '<tr><td class="keyInfo">Amount Payable:</td><td class="valueInfo">'
			+ '$'
			+ (obj.total_amount<=0.01 ? "0" :obj.total_amount)
			+ '</td><td class="keyInfo">Article Service:</td><td class="valueInfo">'
			+ obj.article_service
			+ '</td><td class="keyInfo">Freight Cost:</td><td class="valueInfo lastColumn">'
			+ Number(obj.freight_cost)
			+ '</td></tr><tr class="lastRow"><td class="keyInfo">Comments:</td>'
			+ '<td class="keyInfo lastColumn" colspan="5">' + obj.comments
			+ '</td></tr></table></div><div>&nbsp;</div>';
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Supplier or Repair Agent Details</td></tr><tr class="">'
			+ '<td class="keyInfo">Repair Agent:</td><td class="valueInfo">'
			+ repairAgentName
			+ '('
			+ repairAgentCode
			+ ')'
			+ '</td><td class="keyInfo">Contact Number:</td><td class="valueInfo">'
			+ repairAgentContactNumber
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class="valueInfo lastColumn">&nbsp;</td></tr>'
			+ '<tr class="lastRow"><td class="keyInfo">Authorisation Code:</td><td class="valueInfo">'
			+ obj.auth_code
			+ '</td><td class="keyInfo">Authority Name:</td><td class="valueInfo">'
			+ obj.authority_name
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class="valueInfo lastColumn">'
			+ '&nbsp;</td></tr></table></div><div>&nbsp;</div>';
	content += '<div class="articleDetails multiple">'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tr><td class="subTitle" colspan="6">Despatch Details</td></tr>'
			+ '<tr class=""><td class="keyInfo">Goods Pickup Date:</td><td class="valueInfo">'
			+ obj.pickupdate
			+ '</td><td class="keyInfo">Carrier:</td><td class="valueInfo">'
			+ obj.carrier
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class=" lastColumn">&nbsp;</td></tr>'
			+ '<tr class=""><td class="keyInfo">Follow-up Date:</td><td class="valueInfo">'
			+ dueDate
			+ '</td><td class="keyInfo">Contact Number:</td><td class="valueInfo">'
			+ obj.contact_number
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class="valueInfo lastColumn">&nbsp;</td></tr>'
			+ '<tr class="lastRow"><td class="keyInfo">Consignment Note:</td><td class="valueInfo">'
			+ obj.consignment_note
			+ '</td><td class="keyInfo noDivider">&nbsp;</td><td class="valueInfo noDivider">&nbsp;</td>'
			+ '<td class="keyInfo noDivider">&nbsp;</td><td class="valueInfo lastColumn">&nbsp;</td></tr>'
			+ '</table></div><div>&nbsp;</div>';

	var printHead = '<div class="width100" style=""><div class="width70 reportName bold inline-block">Repair Service Request# '
			+ serviceOrderNo
			+ '</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"> </div></div>';
	var printFoot = '<br><br><br><br><br><br><br><div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	$('#printbodyForSerOdr')
			.html('')
			.append(printHead + content + printFoot)
			.append(
					'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');

}
function printCartonLabel(obj, dtlObj) {
	par1=obj;
	par2=dtlObj;
	storeName = obj.zstore_name1;
	storeStreet = obj.zstore_street;
	storeCity = obj.zstore_city1;
	storePostalCode = obj.zstore_post_code;
	storeContactNumber = obj.zstore_tel_number;
	repairAgentContactNumber= obj.zagent_tel_number;
	content = '';
	content += '<table style="{width : 75%; !important}">'
			+ '<tr  rowspan="11" >' + '<td colspan="4" >' + '<strong><label class="font13">'
			+ 'Send To:</label><br><div class="cartonLabelFix font16">' + '         '
			+repairAgentCode.replace(/^0+/, '')+'<br>'
			+ (obj.zagent_name1).toUpperCase()
			+ '</strong><br>'
			+ obj.zagent_street.toUpperCase()
			+ '<br>'
			+ obj.zagent_city1.toUpperCase()
			+ ' '
			+ obj.zagent_post_code1.toUpperCase()
			+ '<br>'
			+ 'Phone: '
			+ obj.zagent_tel_number.toUpperCase()
			+ '</div><br><br>'
			+ '<strong><label class="font13">Attention:</label><br><div class="cartonLabelFix">'
			+ '        '
			+ obj.zagent_name1.toUpperCase()
			+ '</div></strong>'
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<th class="italicFont font13" colspan="3">Claim No </th>'
			+ '<th class="italicFont font13">No of Cartons</th>'
			+ '</tr>'
			+ '<tr><td class="fixedTD">'
			+ obj.zra_reference
			+ '</td><td class="fixedTD"></td><td class="fixedTD"></td><td class="fixedTD" rowspan="2" align="center"  style="vertical-align: middle;">'
			+'1 OF 1</td></tr>'
			+ '<tr><td class="fixedTD">&nbsp;</td><td class="fixedTD"></td><td class="fixedTD"></td></tr>'
			+ '<tr  rowspan="11" >'
			+ '<td colspan="4" class="bottomFix">'
			+ '<strong><label class="font13">'
			+ 'From:</label></strong><br><br>'
			+ '<div class="leftDiv"><label class="bigFont">BIG<strong>W</strong></label></div><div class="cartonLabelFixFrom"><strong>'
			+siteNo.replace(/^0+/, '')+' '
			+ obj.zstore_name1.toUpperCase()
			+'</strong><br><label class="font11">'
			+ obj.zstore_street
			+ '<br>'
			+ obj.zstore_city1
			+ ' '
			+ obj.zstore_post_code
			+ '<br>'
			+ 'Phone: '
			+ obj.zstore_tel_number
			+ '</label></div><br>'
			+ '<label class="rightItalic font11">'
			+ obj.zorder_date + '</label></td>' + '</tr>' + '</table>';
	$('#printbodyForCtnLbl')
			.html('')
			.append(content)
			.append(
					'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');
	printReminderLetter(obj,dtlObj);
	printAcceptanceNote(dtlObj);
	printServiceOrder(dtlObj);
	appendContentToDetailsPage(dtlObj);
}

function showAllErrors(content) {
	$('#errorWrapper').find('.pageErrorsTitle .description').text("Repairs service Failed.");
//	$('#errorWrapper').find('.content.title')[1].text("Reason for failure.");
	$('#errorWrapper').removeClass('hideBlock');
	$('#validateErrors').html(content);
}
function getError(msg) {
	return "<li>" + msg + "</li>";
}

function showSuccessMessage(content) {
	$('#emailSent').removeClass('hideBlock');
//	$('#emailSent').find('.title').text(content);	
}
function showFailMessage(content) {
	$('#errorWrapper').find('.pageErrorsTitle .description').text("Failed to send reminder.");
//	$('#errorWrapper').find('.content.title')[1].text("Reason for failure.");
	$('#errorWrapper').removeClass('hideBlock');
	$('#validateErrors').html(content);	
}
function getCartonLabelForServiceOrder(dtlObj) {
	// var statusMsg='';
	
	var articleNo=articleNum;
	var articleNoFlag = "Y";
	var descFlag = "";
	var gtinFlag = "";
	var srcOfSupplyInd;
	var supplierNo;
    var itemList=[];
		srcOfSupplyInd = "";
		supplierNo = "";
		nodeLevel = "";
		nodeId = "";
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" :articleNoFlag ,
		"iv_gtin" : gtinFlag,
		"iv_article" : articleNo,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : supplierNo,
		"iv_src_supply" : srcOfSupplyInd,
		"iv_ranged" : "N",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : $('#posSite').val(),
		"iv_node_id" : nodeId,
		"iv_node_level" : nodeLevel,
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : "",
		"iv_auto_stockR_flag" : "N",
		"iv_uom_flag" : "Y",
		"iv_delisted_flag":"N",
		"iv_deleted_flag":"N"
	};
	console.log(packBreakArticleSearch + ' ' + JSON.stringify(param));
	
	$.ajax({
		type : "POST",
		url : packBreakArticleSearch,
		data : JSON.stringify(param),

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			/*var message = '';
			output = $.parseJSON(response);
			message = output.msg;*/
			// Gaps for Goods Summary Report
			if(response!=undefined && response!=null && response.length >0 ){
				repairArticleList = response;
			if(response[0].dangerous_goods_flag!=undefined)	{		
			dangerFlag=response[0].dangerous_goods_flag;
			}
			}
		
	$.ajax({
		type : "post",
		url : "getCartonLabelForServiceOrder.htm",
		data : {
			serviceOrderNo : serviceOrderNo,
			vendorNo : repairAgentCode
		},
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response != '') {
				output = $.parseJSON(response);
				console.log(response);
				var cartonDtlList = output.list;
				statusMsg = output.msg;
				if (statusMsg == 'Y') {
					printCartonLabel(cartonDtlList[0], dtlObj);
				}
				//var dtlObj=dtlList[0];
				var carObj=cartonDtlList[0];
				if(dangerFlag=="Y"){
				var dangerNote=leaveDangerNotes;
				}
				else{
				var dangerNote="";
				}
				var carCount = 3;				
		if((carCount) != ''){
			//getCartonLabelForServiceOrder(area, itmList, carCount, moveBackFlag);
			$("#dialog-cartonCount").dialog("close");
			var cartonCount = Number(carCount);
	for(var i=1; i <= cartonCount; i++){
		item = {
				"claimNo" :(carObj.zra_reference),
				"cartonCount" :  i,
				"totalCount"  :  cartonCount
		};
		
		itemList.push(item);
	}
	if(dangerFlag=="Y"){
		disclaimerNotes6='Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s.';
	}else{
		disclaimerNotes6 ='';
	}
	
	var obj={	
	       // reportResult		: itemList,
			supplier			:  '',
			supplierName		: carObj.zagent_name1,
			supplierStreet		: carObj.zagent_street.toUpperCase(),
			supplierCity		: carObj.zagent_city1.toUpperCase() + ' ' 	+ carObj.zagent_post_code1.toUpperCase(),
			supplierPhone		: carObj.zagent_tel_number.toUpperCase(),
			fromSite			: siteNo.replace(/^0+/, '')	+ ' ' + carObj.zstore_name1.toUpperCase(),
			fromSiteStreet		: carObj.zstore_street,
			fromSiteCity		: carObj.zstore_city1 + ' ' + carObj.zstore_post_code,
			fromSitePhone		: carObj.zstore_tel_number,			
			dangerNotes         :dangerNote,
			requestType         :stockType,
			attention           :'',
			comments            :dtlObj.comments,
			disclaimerNotes1    :disclaimerNotes1,
			disclaimerNotes2    :disclaimerNotes2,
			disclaimerNotes3    :disclaimerNotes3,
			disclaimerNotes4    :disclaimerNotes4,
			disclaimerNotes5    :disclaimerNotes5,
			disclaimerNotes6    :disclaimerNotes6,
			storeName : carObj.zstore_name1,
			storeStreet: carObj.zstore_street,
			storeCity :carObj.zstore_city1 + ' ' + carObj.zstore_post_code,			
			storeContactNumber : carObj.zstore_tel_number,
			repairAgentContactNumber: carObj.zagent_tel_number +'     '+ carObj.zfax_number,
			serviceOrderNo: serviceOrderNo,			
			purchaseDate: dtlObj.purchase_date	,		
			customerName: dtlObj.name,			
			 custAdress:dtlObj.address,			
			custPostCode: (dtlObj.post_code||''),		
			 articleDesc: dtlObj.art_desc,		
			article: dtlObj.article	,		
			contactNo:dtlObj.contactnumber,			
			faultDesc:dtlObj.fault_description	,	
            email: dtlObj.customer_email,			
			service: dtlObj.article_service	,		
			 amount: "$"+(dtlObj.total_amount<=0.01?"0":dtlObj.total_amount),				
			resolutionDate: dtlObj.resoldate,
			articleQuantity:dtlObj.quantity,
			createdDate:dtlObj.createdate,			 
			repairAgentCity:carObj.zagent_city1 +'  '+ carObj.zagent_post_code1,				
	        repairAgentStreet:carObj.zagent_street,
	        imagePath: imagePathMap[globalUserImgLoc],
	        cartonCount			: cartonCount,				
			claimNo             :carObj.zra_reference,
			repairAgentNo	: repairAgentCode,
			repairAgentName	: repairAgentName 
			};
					$.ajax({
	                 url: "../claimsPrint/acceptanceNoteParam.htm",
	                type: "POST",
	                  dataType: "json",
					contentType:"application/json",
					data:JSON.stringify(obj),
					cache: false,    //This will force requested pages not to be cached by the browser  
					processData:false, //To avoid making query String instead of JSON
					beforeSend: function() {
                    startLoading();
                           },
		            success : function(response) {
			
			       //stopLoading();

		          },
		        error : function(response) {
			    showErrorInCompPop('Sorry, Some technical issue occured.');
			    stopLoading();
			// stopLoading();// goToLogin();
		    },
	            });
				stopLoading();
			}
		}
		}
	});
	},
		error : function(response) {
			// showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
	

}
function showPaginatedContent(recordCount) {

	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNo) {
			searchServiceOrder(formData, pageNo, 10);
		}

	});

}

function appendContentToDetailsPage(obj)
{
	var content = '';
	$('input.articleNo').val(parseInt(obj.article));
	var articleInfocontent = formArticleInfoWrapperContentForDetailsPage(obj);
	if(stockType!="SPARES" && storeOrCustomer!="STORE"){
	content += formCustomerDetailsContentForDetailsPage(obj);
	}
	content += formPurchaseAndRepairContentForDetails(obj);
	content += formChargeDetailsContentForDetailsPage(obj);
	content += formRepairAgentContentForDetailsPage(obj);
	content += formDispatchContentForDetailsPage(obj);
	
	$('.articleInfoWrapper').remove();
	$('.articleActionBtns').after(articleInfocontent);
	
	$('.articleContentInner').html('');
	$('.articleContentInner').append(content);
	
	showServiceOrderDetailsPage();	
}
function DateFromString(str){ 
    str = str.split(/\D+/);
    str = new Date(str[2],str[1]-1,(parseInt(str[0])+21));
    return MMDDYYYY(str);
}

function Add21Days() {
    var date = $('#pickDate').val();
    var ndate = DateFromString(date);
    return ndate;
}
function MMDDYYYY(str) {
  	var mon;
    var ndateArr = str.toString().split(' ');
    var Months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec';var mo = parseInt((Months.indexOf(ndateArr[1])/4)+1); 
    if(mo<10){
    	mon = "0"+mo;
    }else{
    	mon = mo;
    }

    return (ndateArr[2]+'/'+mon)+'/'+ndateArr[3];
}
function showActionButtons()
{
	$('.RRE,.ERSO,.CORSO,.CARSO,.PRNT').removeClass('brudcrumHide');
	$('.acceptancePrint,.cartonPrint,.reminderPrint').removeClass('brudcrumHide');
}
function hideActionButtons()
{
	$('.RRE,.ERSO,.CORSO,.CARSO,.PRNT').addClass('brudcrumHide');	
}
function hideActionButtonsForClosedStatus()
{
	$('.RRE,.ERSO,.CORSO,.CARSO').addClass('brudcrumHide');
   // $('.PRNT').removeClass('hideBlock');	
	$('.acceptancePrint,.cartonPrint,.reminderPrint').addClass('brudcrumHide');
}

function hideActionButtonsForCancelledStatus()
{
	$('.RRE,.ERSO,.CORSO,.CARSO,.PRNT').addClass('brudcrumHide');	
}

var triggerLeaveDangerArticlePopUpScreenYes = function(e)
{
var $elem = e.data.msg;
$elem.dialog('close');
$("#dialog-complete").dialog("open");

};
var triggerLeaveDangerArticlePopUpScreenYesUpdate = function(e)
{
var $elem = e.data.msg;
$elem.dialog('close');
callServiceForUpdate($('[name="repeirsUpdateForm"]').serialize());
};
var triggerCartonPrintYes = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
	triggerCartonPrintFollowup();
};
var serviceOrderPopUpScreenYes = function(e)
{
var $elem = e.data.dialog;
$elem.dialog('close');
$("#dialog-complete").dialog("close");
window.location.href="../repair/onPageLoad.htm";
};

var triggerLeaveDangerArticlePopUpScreenNo = function(e)
{
	var $elem = e.data.msg;
$elem.dialog('close');
};
	
function populateStatusList() {
	var content = '';
	content += '<option value="">Select</option>'
	   +'<option value="OPEN" name="status">OPEN</option>'
	   +'<option value="COMPLETED" name="status">COMPLETED</option>'
	    +'<option value="CANCELLED" name="status">CANCELLED</option>';
	//$('#StatusID').html(content);
	//$('#StatusID').append(content);
		
}


function callCartonLblJasperPrints(){	
	carObj=par1;
	dtlObj=par2;
	var item = {};
	var itemList = [];
	var dangerNotes='';
	$('#dialog-cartonCount').find('#cartonCount').val('');
	$('#dialog-cartonCount').find('#Attention').val('');
	$('#dialog-cartonCount').find('#cartonCount').onlyNumbers();
	if(dangerFlag=="Y"){
		$.fn.warnPopup('warn',leaveScreenMsg,'Dangerous Article Warning',triggerCartonPrintYes,triggerLeaveDangerArticlePopUpScreenNo,'',$(this));
	}else{
		triggerCartonPrintFollowup();
	}
}
function triggerCartonPrintFollowup(){
	$('#dialog-cartonCount').dialog('open');
	$('#dialog-cartonCount').find('.secondaryActionBtn').unbind('click');
	$("#dialog-cartonCount").find('.secondaryActionBtn').click(function() {
		$('#dialog-cartonCount').dialog('close');
	});
	$("#dialog-cartonCount").find('.actionBtn').unbind('click');	
	$("#dialog-cartonCount").find('.actionBtn').click(function() {
		var carCount = $("#dialog-cartonCount").find('#cartonCount').val();
		var attention=$('#dialog-cartonCount').find('#Attention').val();
		if(dangerFlag=='Y'){				
			dangerNote="Consignment Note Completed Yes/No Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s. ";			 	 
		}else{
			dangerNote='';
		}
		if((carCount) != ''){
			$("#dialog-cartonCount").dialog("close");
			var cartonCount = Number(carCount);
			$('#attention').val(attention);
			$('#carCount').val(carCount);
			$('#search').attr('method','get');
			$('#search').attr("action", "../claimsPrint/downloadCartonLblNewPdf.pdf"); //carCount
			$('#search').attr('target','_blank');
			$('#search').submit();
			stopLoading();
		}else{
			$("#dialog-cartonCount").find('#cartonCount').error('Carton Pick Up Qty is Mandatory');
		}	
	});
}
function acceptanceJasperPrint(){
	$('#search').attr("action", "../claimsPrint/downloadAcceptancePrintNewPdf.pdf");
	$('#search').attr('target','_blank');
	$('#search').attr('method','get');
	$('#search').unbind('submit').submit();
    stopLoading();
}
// Gaps for Goods Summary Report
function adjustLocalSOH(articleNo,uom,mvmt_type,multiplicationFactor,serviceNo,cancelOrUpdate,flag) {
	var param = {
		"iv_article" : articleNo,
		"iv_uom" : uom,
		"iv_mvmt_type" : mvmt_type,
		"iv_multiplication_factor" : multiplicationFactor,
		"iv_order": serviceNo,
		"iv_user_id": $('#loginUserId').val(),
		"iv_qty":"1",
		"iv_vkorg":$('#salesOrg').val(),
		"iv_site": $('#posSite').val(),
		"iv_flag": flag
	};

	console.log(adjustLocalSohForRepairs + ' ' + JSON.stringify(param));
		$.ajax({
			type : "POST",
			url : adjustLocalSohForRepairs,
			data : JSON.stringify(param),
			beforeSend : function() {
				startLoading();
			}
		}).done(
				function(response) {
					if (checkResult(response,'msg_type','Repair Service Order')) {
						if (response[0].msg_type != 'S') {
							 if (response[0].msg != undefined
									&& response[0].msg != '') {
								$.fn.showCustomMsg([ response[0].msg ], error,
										'The Repair Service Order failed');
							}else{
								$.fn.showCustomMsg([ 'Stock Adjustment Failed' ], error,
								'Repair Service Order');
							}
						}
					}
					if(cancelOrUpdate){
						$.fn.warnPopup('',cancelledScreenMsg,'Service Order Cancel','','',serviceOrderPopUpScreenYes,$(this));
					}else{
						$('#dialog-created').parent().find('.ui-dialog-title').text('Service Request Update');
						$("#dialog-created").dialog("open");
						$("#dialog-created").parent()
								.find('.serviceOrderNoText strong').text(serviceNo);
					}
			stopLoading();
		}).fail(function() {
			$.fn.showCustomMsg([ mobiSerErrCode ], error);
			stopLoading();
		});
}