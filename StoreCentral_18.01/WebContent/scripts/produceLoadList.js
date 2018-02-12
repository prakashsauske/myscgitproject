var recordCount;
var currentPage ;
$(function() {
	// document.forms[0].autocomplete="off";
	// Code for accordion
	$("#accordion").accordion({
		header : "h3",
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
	$('#supplier,#storeNo').css('width','45%');
	$("#dialog-verifySupplier").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-alertBox").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 400
	});
	$('.ContentTableWrapper .tableInfo').css('overflow','hidden');
	
	$("#goButtonSample1").click(function() {
		hideErrorInOrder();
		var vendorNo = $('#vendorDesc').val().split("-")[0];
		var vendorName = $('#vendorDesc').val().split("-")[1];
		var sourceSupply = $('input:radio[name=sourceSupply]:checked').val();

		$.ajax({
			type : "GET",
			url : "autocomplete.htm",
			beforeSend : function() {
				startLoading();
			},
			data : {
				vendorNo : vendorNo,
				sourceSupply : sourceSupply,
				vendorName : vendorName
			},
			success : function(response) {
				$('#popupDataDiv').html(response);
				stopLoading();
			},
		});

	});
	/*var totalIssueCost = 0;
	$('.issueCost').filter(function() {
		totalIssueCost = totalIssueCost + Number($(this).text().trim());
	});
	$('.totalIssueCost').text(totalIssueCost.toFixed(2));

	var totalSellPrice = 0;
	$('.sellPrice').filter(function() {
		totalSellPrice = totalSellPrice + Number($(this).text().trim());
	});
	$('.totalSellPrice').text(totalSellPrice.toFixed(2));*/

	var totalOMs = 0;
	$('.qty').filter(function() {
		totalOMs = totalOMs + Number($(this).text().trim());
	});
	$('.totalOMs').text(totalOMs.toFixed(2));
	
/*	var grossProfit = 0;
	if (totalSellPrice != '' && totalSellPrice != undefined
			&& totalSellPrice > 0 && totalIssueCost != ''
			&& totalIssueCost != undefined) {
		grossProfit = ((totalSellPrice -totalIssueCost) / totalSellPrice) * 100;
		$('.grossProfit').text(grossProfit.toFixed(2));
	}*/
	if($('#rosterDate').val()!=undefined && $('#rosterDate').val().trim()==''){
		var date =new Date();
		var month='';if(date.getMonth()+1<10){month=date.getMonth()+1;month='0'+month;}else month=date.getMonth()+1;
		var day='';if(date.getDate()<10){day=date.getDate();day='0'+day;}else day=date.getDate();
		$('#rosterDate').val(day+'/'+month+'/'+date.getFullYear());
		//.val();
	}

	// Code for input box default text handling
	$('.textbox').focus(function() {
		if ($(this).val() == $(this).attr('defaultVal')) {
			$(this).val('');
			$(this).removeClass("textboxDefaultText");
		}
	});

	
	$("#verifySupplier").click(
			function() {
				hideErrorInOrder();
				var radioSelected = "warehouse";
				if (radioSelected == "vendor" || radioSelected == "warehouse"
						|| radioSelected == "store") {
					var vendorNo = $('#supplier').val().split("-")[0];
					var vendorName = $('#supplier').val().split("-")[1];
					var sourceSupply = "warehouse";
				/*	if (sourceSupply == 'store') {

						nearbyStore(vendorNo, vendorName, sourceSupply);
					}*/

					 if (($('#supplier').val() != '' && $('#supplier')
							.val() != 'Enter supplier no. or name')) {
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend : function() {
								startLoading();
							},
							data : {
								vendorNo : vendorNo,
								sourceSupply : sourceSupply,
								vendorName : vendorName
							},
							success : function(response) {
								$('#popupDataDiv').html(response);
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
									}
								} else {
									$("#supplier").val(
											$("#suppNo0").text() + "-"
													+ $("#suppName0").text());
								}
								stopLoading();
							},
						});
					} else {
						showAlert('Please fill supplier field. ', 'supplier');
					}
				}

			});
	$('.textbox').blur(function() {
		if ($(this).val() == '') {
			$(this).val($(this).attr('defaultVal'));
			$(this).addClass("textboxDefaultText");
		}
	});

	// Code for calndar control
	$(".inputDate").datepicker({
		zIndex : 50
	});
	

	/*
	 * Code to - Close accordion when report is generated - Show results
	 * 
	 * Need to write a code by developer to handle a case when there is no data.
	 * The accordion in this case should remain open
	 */
	if ($('#listCount').val() > 0) {
		$('#accordion').accordion({
			active : true
		});
		// $('.ui-accordion-header').click();
	}
	
	if($('#listCount').val() > 10){
		currentPage = $('#currPage').val();
		recordCount = $('#listCount').val();
		showPaginatedContent($('#listCount').val());
		//showPaginatedContent($('#listCount').val());
		showPageNo($('#currPage').val());
		
	}/*else if ($('#listCount').val() > 10) {
		recordCount = $('#listCount').val();
		showPaginatedContent($('#listCount').val());
		//showPage($('#currPage').val());
	}*/
	$("#generateReport")
			.click(
					function() {

						var warehouse = $('#supplier').val();

						var store = $('#storeNo').val();

						var storeOrder = $('#storeOrder').val();

						var rosterDate = $('#rosterDate').val();

						var splittedDate = formateDate($('#rosterDate').val())
								.split('/');

						var splittedTwo = splittedDate[0] + splittedDate[1]
								+ splittedDate[2];

						if ((storeOrder.trim()=='') && ($.trim(warehouse).length == 0
								|| warehouse == "Enter warehouse number")) {

							$('#msg').html("Please enter the warehouse/order number");
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");

						} else if ($.trim(store).length == 0
								|| store == "Enter store number") {

							$('#msg').html(" Please enter the store number");
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");
						} else if (isNaN(store)) {
							$('#msg').html("Please enter valid store number");
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");

						} else if ($.trim(rosterDate).length == 0
								|| rosterDate == 'dd/mm/yyyy'
								|| $('#rosterDate').val() == "") {
							$('#msg')
									.html(
											"Please enter roster date in DD/MM/YYYY format");
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");
						} else if (splittedDate != ""
								&& !(splittedTwo.length == 8 || splittedTwo.length == 6)) {
							$("#msg")
									.html(
											'Please enter roster date in DD/MM/YYYY format');
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");

						} else if (splittedDate != ""
								&& (splittedDate[0] > 31
										|| splittedDate[1] > 12 || splittedDate[2] > 9999)
								|| isNaN(splittedTwo)) {
							$("#msg")
									.html(
											'Please enter roster date in DD/MM/YYYY format');
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");
						}/* else if (isNaN(storeOrder)) {
							$('#msg').html("Please enter valid order number");
							$("#errorMsgDiv").removeClass(
									'tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');
							$('#data').html("");
						} */else {
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							$("#produceLoadListForm").submit();
						}
					});

});

$(document)
		.keypress(
				function(event) {
					if (event.which == 13) {event.preventDefault();
					$("#generateReport")
					.click();}
				});

function navigateToDetail(index) {
	$('#currPage').val(currentPage);
	$('#index').val(index);

	$('#produceLoadListForm')
			.attr('action', 'requestProduceLoadListDetail.htm');
	$('#produceLoadListForm').submit();

}

$("#backBtn").click(function(e) {
	window.location.href = "../login/goingHome.htm";
});

$("#closeLink").click(function(e) {
	$('#accordion').accordion({
		active : true
	});
});

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

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

function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			// console.log(pageNo);
			$('#currPage').val(pageNumber);
			currentPage = pageNumber;
			var pageClass = 'pageNo-' + pageNumber;
			$('.contentTr').filter(function() {
				if ($(this).hasClass(pageClass))
					$(this).removeClass('hideBlock');
				else
					$(this).addClass('hideBlock');

			});
		}

	});
	// showPage(1);
}
function showPageNo(pageNumber) {
	//currentPage = pageNumber;
	var pageClass = 'pageNo-' + pageNumber;
	$('.contentTr').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');

	});
}
function showAlert(msg, id) {
	$('#alertBox').text(msg);
	$('#dialog-alertBox').parent().find('.ui-dialog-title').text('Produce load list');
	$("#dialog-alertBox").removeClass('hideBlock');
	$("#dialog-alertBox").parent().addClass("popupWrapper");
	$("#dialog-alertBox").dialog("open");
	$('#okBtn').click(function(e) {
		$("#dialog-alertBox").dialog("close");
		$("#" + id).focus();
		var temp = $("#" + id).val();
		$("#" + id).val(temp);
	});

}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function showErrorInOrder(msg) {
	$('#msg').html(
			msg);
$("#errorMsgDiv").removeClass(
	'tableTitle nodataMessage');
$("#errorMsgDiv").addClass('tableTitle errorDiv');
	
}
function hideErrorInOrder() {
	
	/*$('#msg').html(
			msg);
$("#errorMsgDiv").removeClass(
	'tableTitle nodataMessage');
$("#errorMsgDiv").addClass('tableTitle errorDiv');*/
}