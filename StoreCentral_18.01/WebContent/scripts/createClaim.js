//Claim Lookup Screen Global Variables
var draftList = [];
var finalisedList = [];
var currentPage = 1;
var inFromDate = '';
var inToDate = '';

$(document)
		.ready(
				function() {
					getEncSAPPassword();
					$("#dialog-verifySupplier").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 700
					});
					
					
					$("#verifySupplier").click(
							function() {
								hideErrorInClaims();
								
								var vendorNo = $('#supplier').val().split("-")[0];
								var vendorName = $('#supplier').val().split("-")[1];
								var sourceSupply = 'vendor';

									if (($('#supplier').val() != '' && $('#supplier')
											.val() != 'Enter supplier no. or name')) {
										$.ajax({
											type : "GET",
											url : vendorLookupServiceURL,
											beforeSend : function() {
												startLoading();
											},
											data : {
												vendorNo : vendorNo,
												sourceSupply : sourceSupply,
												vendorName : vendorName
											},
											success : function(response) {
												var output = $.parseJSON(response);
												var data = output.data;
												$('#popupDataDivEnq').html(formVendorSearchResults(data));
												if ($('#sizeCheck').val() == 0) {
													showAlert('Invalid Supplier.', 'supplier');
												} else if ($('#sizeCheck').val() > 1) {
													if (!$("#dialog-verifySupplier").dialog("isOpen")) {
														$('#vendorDesc').val(
																$('#supplier').val());
														$("#dialog-verifySupplier").parent().addClass(
																"popupWrapper");
														$("#dialog-verifySupplier").removeClass('hideBlock').dialog("open");
														$("#searchWarning").addClass(
																'hideBlock');
														$("#popupSearch").removeClass(
																'hideBlock');
														bindPopUpEvents();
													}
												} else {
													$("#supplier").val(
															$("#suppNo0").text() + "-"
																	+ $("#suppName0").text());
													$("#supplierVerified").val(true);
												}
												stopLoading();
											},
										});
									} else {
										showAlert('Please fill supplier field. ', 'supplier');
									}
							});
					
					// shows advanced search box when advanced search link is clicked
					$("#advLink1").click(function() 
					{                 
						
						var scroll = $(window).scrollTop();
						
						
							var lookupHeight = $('#lookupContainer').height();
							
							document.getElementById("advWrapper").style.marginTop=((lookupHeight - scroll) +"px");
							document.getElementById("advDiv").style.marginTop=(("0" - scroll) +"px");
						
						
						
						
						var lookupBgheight = $("#advDiv").outerHeight() + 20 + "px";
						$("#advWrapper").css("height", "240px");				
						
						
						$("#advDiv").removeClass('advancedParam hideBlock');
						$("#advDiv").addClass('advancedParam');
					   
						$("#advWrapper").removeClass('advancedSearchFormatWrapper hideBlock');
						$("#advWrapper").addClass('advancedSearchFormatWrapper');

						$("#closeLink").removeClass('linkBtn hideBlock');
						$("#closeLink").addClass('linkBtn');
					   
						$("#advLink1").hide();
						$("#value").val("");   

						

						
					});
					
					//closes advanced search when close is clicked
					$("#closeLink").click(function()
					{
						closeAdvSearchClasses();           
					});
					
					// closes advanced search box when windowed are scrolled unless in popup menu 
					$(window).scroll(function()	{    
						if ($('#dialog-modal').dialog( "isOpen" ) == true) {
							var scroll = $(window).scrollTop();
							var lookupHeight = $('#lookupContainer').height();
							document.getElementById("advWrapper").style.marginTop=((lookupHeight - scroll) +"px");
							document.getElementById("advDiv").style.marginTop=(("0" - scroll) +"px");	
						} else {
							closeAdvSearchClasses();
						}
					});
					
					// closes advanced search box when cotent out side of the box is clicked 
					$('.mainWrapper').click(function() 
					{
						closeAdvSearchClasses();
					});
					
					// disable close box function when lookup box is clicked 
					$('#lookupContainer').click(function(event){
						event.stopPropagation();
					});
					
					//disable close box function when lookup box is clicked 
				   $('.popupWrapper').click(function(event){
						  event.stopPropagation();
				   });
				
					
					// Code for Scrolling 
					$(window).scroll(function(){
						if ($(this).scrollTop() > 50) {
							$('.scrollup').fadeIn();
						} else {
							$('.scrollup').fadeOut();
						}
					});
					
					$('.scrollup').click(function(){
						$("html, body").animate({ scrollTop: 0 }, 400);
						return false;
					});
					
					$('#tabs').tabs();
					
					$('.goButton1').click(function(){
						inFromDate = '';
						inToDate = '';
						validateClaimLookupForm(1, 10, true);
					});
					
					$('.goButton').click(function(){
						inFromDate = '';
						inToDate = '';
						callClaimsSummaryService(1, 10, '', true);
					});
					
					//<!-- Multiple actions -->
					
					$( "#dialog-confirm" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 100,
						maxHeight: 600,
						width: 350
					});
					
					
					$("#dialog-confirm").parent().addClass("popupWrapper");	
					
					$("#dialog-confirm .popupActions label").click(function(){ 
						$("#dialog-confirm" ).dialog("close");				
					});
					
					$(".dropdownLabel").click(function(){
						$( "#dialog-confirm" ).dialog( "open" );		
					});
					
					claimsLookupOnPageLoad();
				});

function claimsLookupOnPageLoad()
{
	inFromDate = getDesiredPastDate(30);
	inToDate = getDesiredPastDate(0);
	callClaimsSummaryService(1, 10, 'DRAFT', true);
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}

function showErrorInClaims(msg) {
	
	//$(".filterTabs").addClass('hideBlock');
	$('.claims #errorMsg').text(msg);
	$(".claims #errorMsgDiv").removeClass('tableTitle nodataMessage');
	$(".claims #errorMsgDiv").addClass('tableTitle errorDiv');
	$('.claims .errorDivWrapper').removeClass('hideBlock');
}
function hideErrorInClaims() {
	$('.claims #errorMsg').text('');
	$(".claims #errorMsgDiv").addClass('tableTitle nodataMessage');
	$(".claims #errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.claims .errorDivWrapper').addClass('hideBlock');
}

function validateClaimLookupForm(pageNo, recordCount, callTabsFlag)
{
	var flag = true;
	
	var delvFromDate = $('#fromDate').val().trim();
	var delvToDate = $('#toDate').val().trim();
	
	if(delvFromDate == '' && delvToDate == '')
	{
		showErrorInClaims("Please enter from & to dates");
		flag = false;
	}
	else if(delvFromDate != '' && delvToDate == '')
	{
		showErrorInClaims("Please enter to date");
		flag = false;
	}
	else if(delvFromDate == '' && delvToDate != '')
	{
		showErrorInClaims("Please enter from date");
		flag = false;
	}
	else if(delvFromDate != '' && delvToDate != '')
	{
		flag = validateDatesInLookup();
	}
	else if($('#supplier').val() != '' && $('#supplierVerified').val() == false)
	{
		showErrorInClaims("Please click on search to verify the supplier");
		flag = false;
	}
	
	if(flag)
	{
		closeAdvSearchClasses();
		callClaimsSummaryService(pageNo, recordCount, 'DRAFT', callTabsFlag);
	}
}

function callClaimsSummaryService(pageNo, recordCount, inputStatus, callTabsFlag)
{
	var divId = '';
	var param = formClaimLookupParams(pageNo, recordCount, inputStatus);
	currentPage = pageNo;
	
	console.log(JSON.stringify(param));
	
	$.ajax({data : JSON.stringify(param),
		url : getClaimsLookupInfoUrl,
		type : 'post',
		contentType : "application/json",
		beforeSend : function() {
			startLoading();
		},
		
		success : function(response) {
			console.log(response);
			output = $.parseJSON(response);
			var list = output.d.results;
			var recordCount = list[0].msg;
			console.log(list);
			var listCheck = (list != null && list != undefined && list != ''
					&& list.length > 0 && list[0].order_no != undefined && list[0].order_no != null && list[0].order_no != '');
			if (listCheck) {
				
				$('.claimLookupContentWrapper').removeClass('hideBlock');
/*				//below 2 lines need to be commented
				draftList = list;
				finalisedList = list;
				
				//below line should be uncommented before deploying
				//splitDraftFinalisedLists(list);
*/				
				var content = '';
				var tabDtlContent = '';
			
				if(callTabsFlag)
				{
						tabDtlContent += '<li id="'
							+ 'DRAFT'
							+ '" ><a href="#tabs-2">Draft <label class="total">'
							+ /*(draftList.length) +*/ '</label></a></li>';
						tabDtlContent += '<li id="'
							+ 'FINALISED'
							+ '" ><a href="#tabs-3">Finalised <label class="total">'
							+ /*(finalisedList.length) +*/ '</label></a></li>';
		
					
					if(tabDtlContent != '')
					{
						//$('.tabsNew').remove();
						$('#listOfTabs').html(tabDtlContent);
						bindClickEventForTabs();
					}
				}
				
				if(inputStatus == 'DRAFT')
				{
					divId = '#tabs-2';
				}
				else if(inputStatus == 'FINALISED')
				{
					divId = '#tabs-3';
				}	
				//constructing draft content
				content = formTabContent(list);	
				$(divId+' table tbody').html(content);	
	
			}
			
			if(recordCount > 10)
			{
				if(inputStatus == 'DRAFT')
				{
					showPaginatedContent('paginationDivDraft',recordCount, inputStatus);
					$('#paginationDivDraft').removeClass('hideBlock');
				}
				else if(inputStatus == 'FINALISED')
				{
					showPaginatedContent('paginationDivFinal',recordCount, inputStatus);
					$('#paginationDivFinal').removeClass('hideBlock');
				}
			}
			else
			{
				$('#paginationDivDraft').addClass('hideBlock');
				$('#paginationDivFinal').addClass('hideBlock');
			}
			
			if(!listCheck)
			{
				showErrorInClaims('No Data Found');
				$('.claimLookupContentWrapper').addClass('hideBlock');
			}	
			stopLoading();
		},
		error : function(err) {
			showErrorInClaims('Service Unavailable');
		}
	});
}

function showPaginatedContent(inClass, recordCount, inputStatus) {

	$("."+inClass).pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNo) {
			//callClaimsSummaryService(pageNo, 10, 'DRAFT');
			callClaimsSummaryService(pageNo, 10, inputStatus);
		}

	});
}	

/*function showFinalPaginatedContent(recordCount) {
	$('.paginationDivFinal').pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNo) {
			//callClaimsSummaryService(pageNo, 10, 'FINALISED');
			callClaimsSummaryService(pageNo, 10, '');
		}

	});

}*/

function bindClickEventForTabs() {

	if ($(".tabs").hasClass('ui-tabs-anchor') || $(".tabs").hasClass('ui-tabs'))
	{
		$(".tabs").tabs('destroy');
	}
	$(".tabs").tabs();

	$('#listOfTabs li').unbind('click');
	$('#listOfTabs li ').click(function() {
		callClaimsSummaryService(1, 10, (this.id), false);
	});
}

/*function splitDraftFinalisedLists(list)
{
	if(list[i].source == 'Draft')
	{
		draftList.push(list[i].source);
	}
	else if(list[i].source == 'Finalised')
	{
		finalisedList.push(list[i].source);
	}
}*/

function formTabContent(list)
{
	var supplierNo = '';
	var tabContent = '';
	for( var i = 0; i< list.length; i++)
	{
		if(supplierNo != list[i].supplier_no)
		{
			tabContent += '<tr><td colspan="8" class="groupBy1 rowSection rowHighlight">Supplied By: '+parseInt(getEmptyIfNull(list[i].supplier_no),10)+'</td></tr>';
		}
		tabContent += '<tr><td>'+parseInt(getEmptyIfNull(list[i].order_no),10)+/*'</td><td class="centerValue">'+getEmptyIfNull(list[i].claim_no)+*/'</td><td>'+getSupplierNameAndNo(list[i].supplier_name, list[i].supplier_no)+'</td>'
		+'<td>'+getEmptyIfNull(list[i].source)+'</td><td>'+getEmptyIfNull(list[i].reason)+'</td><td class="centerValue">'+getEmptyIfNull(list[i].creationdate)+'</td><td class="centerValue">'+getEmptyIfNull(list[i].status)+'</td>'
		+'<td class="lastColumn centerValue">'+getEmptyIfNull(list[i].article_count)+'</td></tr>';
		supplierNo = list[i].supplier_no;
	}
	return tabContent;
}

function getSupplierNameAndNo(supplierName, supplierNo)
{
	var supplierNameAndNo = '';
	if(supplierName != undefined)
	{
		supplierNameAndNo += supplierName;
	}
	if(supplierNo != undefined && supplierNo != '')
	{
		supplierNameAndNo += '('+parseInt(supplierNo,10)+')';
	}
	
	return supplierNameAndNo;
}

function formClaimLookupParams(pageNo, recordCount, inputStatus)
{
	var param = '';
	var orderNo = ($('#orderNo').val().trim() != '') ? $('#orderNo').val().trim() : "";
	var fromDate = '';
	var toDate='';
	var createdBy = ($('#createdBy').val().trim() != '') ? $('#createdBy').val().trim() : "";
	var source = ($('#claimSource').val().trim() != '') ? $('#claimSource').val().trim() : "";
	var status = ($('#claimStatus').val().trim() != '') ? $('#claimStatus').val().trim() : "";
	var supplier = ($('#supplier').val().trim() != '') ? $('#supplier').val().split("-")[0] : "";
	
	if(inputStatus != null && inputStatus != undefined && inputStatus != '')
	{
		status = inputStatus;
	}
	else
	{
		status = ($('#claimStatus').val().trim() != '') ? $('#claimStatus').val().trim() : "";
	}
	
	if(inFromDate != null && inFromDate != undefined && inFromDate != '')
	{
		fromDate = inFromDate;
	}
	else
	{
		fromDate = $('#fromDate').val().trim() != '' ? $('#fromDate').val().trim() : "";
	}
	
	if(inToDate != null && inToDate != undefined && inToDate != '')
	{
		toDate = inToDate;
	}
	else
	{
		toDate = $('#toDate').val().trim() != '' ? $('#toDate').val().trim() : "";
	}
	
	param = { "iv_created_by" : createdBy,
			  "iv_from_date" : fromDate,
			  "iv_order_no" : orderNo,
			  "iv_page_no" : pageNo,
			  "iv_records" : recordCount,
			  "iv_site" : "1953",
			  //"iv_site" : siteVal,
			  "iv_source" : source,
			  "iv_status" : status,
			  "iv_supplier" : supplier,
			  "iv_to_date" : toDate,
			  "msg" : null,
			  "pwd" : "1000:f94d4a13eb6c214708d7e40fe31677c6b3ec9ef35f:36e571581050b87a0dec599ad1b84e518b83e15943",
			  "user_id" : "xkkyc"
			};
	
	return param;
}

function validateDatesInLookup() {
	
	var fromDate = formateDate($('#fromDate').val());
	var toDate = formateDate($('#toDate').val());
/*	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth();
	var newYear = today.getFullYear();*/
	//var curDate = new Date(newYear, newMonth, newDate);
	var date1 = new Date();

	var parts = fromDate.split('/');
	var partsLen = parts.length;
	var date1Len = fromDate.length;
	date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
	var newTime = Number(date1.getTime());

/*	var dateComFrom = new Date(fromDate.split('/')[2],
			fromDate.split('/')[1]-1, fromDate.split('/')[0]);
	var dateComTo = new Date(toDate.split('/')[2], toDate
			.split('/')[1]-1, toDate.split('/')[0]);*/
/*	var toYear = dateComTo.getFullYear();
	var fromYear = dateComFrom.getFullYear();
	var toMonth = dateComTo.getMonth();
	var fromMonth = dateComFrom.getMonth();
	var toDay = dateComTo.getDate(); 
	var fromDay = dateComFrom.getDate();
	var rangeDate = new Date(toDate.split('/')[2],
			toDate.split('/')[1]-1, toDate.split('/')[0]);*/

	var date2 = new Date();
	var part = toDate.split('/');
	var partLen = part.length;
	var date2Len = toDate.length;
	date2.setFullYear(part[2], part[1] - 1, part[0]);

	var splittedDate = formateDate($('#toDate').val(),
			$('#toDate').val().split('/').length)
			.split('/');
	var splittedTwo = splittedDate[0] + splittedDate[1]
			+ splittedDate[2];

	newTime = Number(newTime)
			+ Number(24 * 60 * 60 * 1000 * 90);

	if (fromDate == "") {
		showErrorInClaims('Please enter From Date.');
		return false;
	} else if (toDate == "") {
		showErrorInClaims('Please enter To Date.');
		return false;
	} else if (partsLen != 3 || date1Len != 10
			|| fromDate.split('/')[0] > 31
			|| fromDate.split('/')[1] > 12
			|| fromDate.split('/')[2].length != 4) {
		showErrorInClaims('Invalid From Date.');
		return false;
	} else if (partLen != 3 || date2Len != 10
			|| toDate.split('/')[0] > 31
			|| toDate.split('/')[1] > 12
			|| toDate.split('/')[2].length != 4) {
		showErrorInClaims('Invalid To Date.');
		return false;
	} else if (date1.getTime() > date2.getTime()) {
		showErrorInClaims('To Date should not be lesser than the From Date');
		return false;
	}

	else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
			|| isNaN(splittedTwo)) {

		showErrorInClaims("Invalid Date Format");
		return false;
	}
/*	else if (rangeDate > curDate) {
		console.log("rangeDate"+rangeDate);
		console.log("curDate"+curDate);
		showError("Future Dates are not allowed for To Date.");
		return false;
	}

	else if ((toYear - fromYear) == 1) {
		if (((toMonth - fromMonth) + 12) > 3) {
			showError('Date difference should not be greater than 3 months');
			return false;
		} else if ((((toMonth - fromMonth) + 12) == 3)
				&& (((toDay - fromDay) + 30) > 30)) {
			showError('Date difference should not be greater than 3 months');
			return false;
		} else {
			return true;
		}
	} else if (toYear - fromYear == 0) {
		if ((toMonth - fromMonth) > 3) {
			showError('Date difference should not be greater than 3 months');
			return false;
		} else if (((toMonth - fromMonth) == 3)
				&& (((toDay - fromDay) + 30) > 30)) {
			showError('Date difference should not be greater than 3 months');
			return false;
		} else {
			return true;
		}
	} else if ((toYear - fromYear) >= 2) {
		showError('Date difference should not be greater than 3 months');
		return false;
	}*/


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

// method called to close advanced search box in css 
function closeAdvSearchClasses()
{
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');
   
	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');
   
	$("#advLink1").show();

	$("#suppName").val("");
	$("#suppNo").val("");
}

function formVendorSearchResults(list) {
	var content = '';
	var rowContent = '';
	content += '<div class="tableInfo"><div class="tableTitle hideBlock"><h4 class="countTitle">'
			+ 'Total <strong class="titleCount">526</strong> results found for '
			+ '<strong class="searchString"> apple </strong></h4><h4 class="popupError"></h4></div></div>';

	content += '<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0">'
			+ '<tr><th>Vendor #</th><th>Description</th><th>Phone Number</th><th>Fax Number</th>'
			+ '<th>Suburb</th><th>State</th><th>Lead Time</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
	if (list != null && list != undefined && list.length > 0) {
		for ( var i = 0; i < list.length; i++) {

			rowContent += '<tr><td id="suppNo'
					+ i
					+ '">'
					+ list[i].vendor_no
					+ '</td><td id="suppName'
					+ i
					+ '">'
					+ list[i].vendor_name
					+ '</td><td>'
					+ list[i].telephone
					+ '</td><td>'
					+ list[i].fax
					+ '</td><td>'
					+ list[i].city
					+ '</td><td>'
					+ list[i].region
					+ '</td><td>'
					+ list[i].lead_time
					+ '</td><td class="sorted lastColumn"><label class="linkBtn linkBtn1" id="'
					+ i
					+ '"><label class="selectItem">Select</label></label></td></tr>';

		}
	}
	content += rowContent + '</table></div><input type="hidden" value="'
			+ list.length + '" id="sizeCheck" />';
	return content;
}

function bindPopUpEvents() {
	
	var elem=$("#supplier");
	var flagelem=$("#supplierVerified");
	$(".linkBtn1").click(
			function() {
				var id = $(this).attr("id");
				elem.val(
						$("#suppNo" + id + "").text() + "-"
								+ $("#suppName" + id + "").text());
				flagelem.val(true);
				if ($("#dialog-verifySupplier").dialog("isOpen"))
					$("#dialog-verifySupplier").dialog("close");
			});
}