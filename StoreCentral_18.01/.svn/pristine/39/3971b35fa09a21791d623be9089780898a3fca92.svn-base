var recordCount;
var orderTypeAllocation = 'ALC';
var orderTypeVendorOrders = 'VENDOR';
var orderTypeWarehouseOrders = 'WAREHOUSE';
var orderTypeIBTIn = 'IBT IN';
var orderTypeIBTOut = 'IBT OUT';
var orderTypeIBTAll = 'IBT ALL';
var orderTypePlannedOrders = 'PLO';
var openStautus = 'OPEN';
var submitStatus = 'SUBMITTED';
var authStatus = 'AUTHORISED';
var receStatus = 'RECEIVED';
var cancelStatus = 'CANCELLED';
var partialStatus = 'PARTIALLY RECEIVED';
var diapatchStatus = 'DISPATCHED';
var orderTypePReq = 'ZY';
var flag = true;
var commonOrderList;
var commonOrder='';
var headerObj='';
var commonPreqList;
var inputData;
var orderPage = 1;
var preqPage = 1;
var orderPageFlag = true;
var preqPageFlag = true;
var preqData;
var oldData;
var currentPage = 1;
var totalPallets = '';
var somOrderNoExists = false;
var deliveryList;
var allItemList;
var segmentOrderList;
var Summary_Bar = 'Summary of all combined purchase orders for the selected criteria selection.';
var Plus_Symbol = 'Allows user to expand a menu of more information for the selected purchase order.';
var inv_Order = 'Purchase Order Number';
var GRN_Date = 'Date when Purchase Order is received';
var GRN_Entered_By = 'Username who received the goods';
var GRN_Doc = 'Goods Received Document Number in SAP';
var Total_GRN_Amount = 'Total value of Goods Received';
var Total_INV_Amount = 'Total Invoice Amount';
var inv_Discrepancy = 'Difference between goods received and invoice amount';
var inv_Comments = '4 reasons '
		+ ' 1.Invoice Not Yet Received = Invoice not yet in the system'
		+ ' 2.Matched = NO difference between Goods Received and Invoice amounts '
		+ ' 3.Overcharged = Invoice is higher than the GR'
		+ ' 4.Undercharged = Invoice is lower than the GR';
var Invoice_Not_Yet_Received = 'Invoice from vendor has not been sent to store.';
var inv_Matched = 'Transactions fully match in Store Central.';
var inv_Overcharged = 'The invoice amount is higher than the GR outside & within tolerance.';
var inv_Undercharged = 'The invoice amount is lower than the GR outside & within tolerance.';

var rec_tab = 'Shows user all receipts related to the selected purchase order';
var rec_Date = 'Date when goods receipt /adjustment was made';
var rec_GRN_Entered_By = 'Username who received / amended the goods received';
// Defect_12397 removed 'Note' word and ISIS
var rec_GRN_Doc = 'Goods Received Document number in SAP';
var rec_GRN = 'Goods Received number created';
var rec_Total_GRN_Amount_Incl = 'Total value of goods received or adjustment made on the receipt';
var rec_GRN_Type = '2 Types: '
		+ '1. Receipt '
		+ '2. Adjustment - may mean subsequent receipt or amendment made on the receipt';

var in_tab = 'Shows user Invoices including amount due to Claims from Vendor (credit) or Additional payable to vendor (debit)';
var in_Date = 'Date when invoice is received by the system.';
var in_Entered_By = 'Username who entered the invoice into the system';
var in_Document = 'Invoice Document number in SAP';
var in_Reference = 'Invoice�s vendor document reference number';
var in_Total_Amount = 'Invoice Amount per document';
var in_Total_GST = 'Invoice GST Amount';

var sum_tab = 'Shows user total summary of Goods Receipts and Invoices including additional payment (debit) and claims (credit)';
// Defect_12397
var sum_Total_Amount_Including = 'Summary of all Goods Received Including GST for the selected purchase order';
var sum_GRN_Amount = 'Total value of all Goods Received for the selected purchase order';
var sum_Invoice_Amount = 'Total of all invoice amount for the selected purchase order';
var sum_Additional_Payable = 'Total debit amount in addition to the invoice';
var sum_Claims = 'Total credit amount against the invoice';
var sum_Net_Payable = 'Total Invoice Amount plus Additional Payable minus Claims';

var tot_gst_tab = 'Summary of all GST values for the selected purchase order';
// Defect_12397
var tot_gst_GRN_Amount = 'Total GST value of all Goods Received for the selected purchase order';
var tot_gst_Invoice_Amount = 'Total GST value of all Goods Received for the selected purchase order';
var tot_gst_Additional_Payable = 'Total GST value of all Additional Payments plus Claim Reversals for the selected purchase order';
var tot_gst_Claims = 'Total GST of all Claims and Additional Claims for the selected purchase order';
var tot_gst_Net_Payable = 'Total GST value we will pay/receive to/from the vendor for the selected purchase order';

var Inv_Department = 'Allows user to select all departments or select a specific department to review.';
var Inv_Order = 'Allows user to select all, or enter a specific purchase order to review.';
var Inv_Discrepancy = 'This value determines the return of discrepancies you review, this value is defaulted to $20.00';
var Inv_GRN_Date = 'Goods Received date allows user to select From and To date to review.';
var Inv_Receipt_with_No_Invoice = 'A filter allowing users to only review Purchase Orders received with no invoice.';
var Inv_Receipt_with_Adjustments = 'A filter allowing users to only review Purchase Orders that contain adjustments.';

var securityGrs = 'AC_GRS';
var EnterVendorClaimAuthorityNumber = 'AC_EVCA';

/*----SC-608 changes begin-----*/

var articleSearchKey = 'article';
var stockTransferLink='../stockTransfer/stockTransferOnPageLoad.htm';
var cancelMsg ='Are you sure you want to cancel?';
var saveMsg ='Are you sure you want to save the changes?';
var over_under_lay_dialog = '<div id="dialog-over-under-lay" title="Underlay / Overlay Articles" class="visible-hide"><div class="popupContent"><div id="pop-up-cont" class="ContentTableWrapper"></div><div class="popupActionsWrapper"><span class="popupActions"><label class="actionBtn" onclick="$(\'#dialog-over-under-lay\').dialog(\'close\')"><a>OK</a></label></span></div></div></div>';
var over_under_supp_dialog = '<div id="dialog-over-under-supply" title="Under / Over Supply" class="visible-hide"><div class="popupContent"><div id="pop-up-cont" class="ContentTableWrapper"></div><div class="popupActionsWrapper"><span class="popupActions"><label onclick="$(\'#dialog-over-under-supply\').dialog(\'close\')" class="actionBtn"><a>OK</a></label></span></div></div></div>';
var extraAction = '<div class="tableActionsExtra"><span><input type="checkbox" id="changeOmExpDate"><label for="changeOmExpDate">Change order multiple and input expiry date</label></span></div>';
var recei_session = '<div id="receive-session" title="Receiving"><div class="popupContent"><div class="popupData popupTitle" id="message_title"></div><div class="popupActionsWrapper ">'
	+'<span class="popupActions"><label id="yes" class="actionBtn"><a>Accept</a></label><label id="no" class="actionBtn"><a>Reject</a></label></span></div></div></div>';
var updateQtyActionBtn = '<div class="pageActions updateMode" id="editDoneWrap"><label class="actionBtn" id="saveupdateQty_dwn"><a><label class="">Save</label></a></label><label class="secondaryActionBtn" id="cancelUpdateQty_dwn"><a>Cancel</a></label></div>';
var up_qty_cont_wrap = '<div class="ContentTableWrapper  updateContentTableWrap updateMode" id="updateQtyContentWrap"></div>';
var update= 'upd';
var warehouseMap= {};
var article ='article';
var detail= 'dtl';
var orderEnq= 'enq';// for Defect_14718
var isCostPriceShow=false;
var poType = 'VENDOR';
var stoType = 'WAREHOUSE';
var stType = 'STOCK TRANSFER';
var sugo = 'SUGO';
var inProgress='Receiving in Progress';
var emergency = 'EMERGENCY';
var salesOrgConfigMap = {};
var stockTakeFlg = false;
var curStatus='';

/*----SC-608 changes end-----*/

/*----------------******  Department change function   *****--------------- */
$(document)
		.ready(
				function() {
					
					salesOrg = $('#salesOrg').val();
					siteNo = $('#posSite').val();
					userId = $('#loginUserId').val();
					if($("#ngboPilotStore").val().trim()=='Y')
					getEncSAPPassword();
					$("#accordion").accordion({
						header : "h3",
						collapsible : true,
						heightStyle : "content"
					});

					$('#discrpAmt').val(20);

					$("#dialog-cancelOrder").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-alertBox").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 500
					});
					// Code for profile menu
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$("#dialog-verify").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 800,
						width : 515
					});

					$("#dialog-verify").parent().addClass("popupWrapper");
					
					
					$( "#dialog-editSitePop" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 800
					});
					$("#dialog-editSitePop").parent().addClass("popupWrapper");
					
					$('.dtlPage').click(function() {
						hideError();
						backToInvoice();
					});
					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});

					$("#confirmYES").click(function() {
						hideError();
						$('#orderNo').val('');
						$('#discrpAmt').val('');
						$('#dialog-cancelOrder').dialog('close');
						oldData = $('#reconReport').serialize();
						generateReport($('#reconReport').serialize(), 1);
					});

					$(document)
							.on(
									'click',
									".more",
									function() {
										var selectedId = $(this).attr("id")
												.split('-')[1];
										if (selectedId == 0) {
											selectedId = 'overAll';
										}

										if ($(
												'#section-'
														+ selectedId
														+ ' #deliveryStatusDetails'
														+ ((selectedId == 'overAll') ? 0
																: selectedId)
														+ ' tbody').html() == "") {
											fullScreenLoader();
											var deliveryStatusDtlHTML = formDeliverStatusDtl(
													commonOrder,
													deliveryList,
													((selectedId == 'overAll') ? 0
															: selectedId),
													allItemList,
													segmentOrderList);
											$(
													'#section-'
															+ selectedId
															+ ' #deliveryStatusDetails'
															+ ((selectedId == 'overAll') ? 0
																	: selectedId)
															+ ' tbody')
													.html('');
											$(
													'#section-'
															+ selectedId
															+ ' #deliveryStatusDetails'
															+ ((selectedId == 'overAll') ? 0
																	: selectedId)
															+ ' tbody').html(
													deliveryStatusDtlHTML);
											$.loader('close');
										}

										$(
												'#section-'
														+ selectedId
														+ ' #deliveryStatusDetails'
														+ ((selectedId == 'overAll') ? 0
																: selectedId)
														+ '').removeClass(
												'hideBlock');
										if (selectedId == 'overAll')
											selectedId = 0;
										$(
												'#section-' + selectedId
														+ '-lessDetails')
												.removeClass('hideBlock');
										$(
												'#section-' + selectedId
														+ '-moreDetails')
												.addClass('hideBlock');
									});

					$(document)
							.on(
									'click',
									".less",
									function() {
										var selectedId = $(this).attr("id")
												.split('-')[1];
										if (selectedId == 0) {
											selectedId = 'overAll';
										}
										$(
												'#section-'
														+ selectedId
														+ ' #deliveryStatusDetails'
														+ ((selectedId == 'overAll') ? 0
																: selectedId)
														+ '').addClass(
												'hideBlock');
										if (selectedId == 'overAll')
											selectedId = 0;
										$(
												'#section-' + selectedId
														+ '-lessDetails')
												.addClass('hideBlock');
										$(
												'#section-' + selectedId
														+ '-moreDetails')
												.removeClass('hideBlock');
									});

					$("#generateReport").click(function() {
						currentPage = 1;
						hideError();
						$('#noData').text('');
						showError('');
						$('.searchResults').hide();
						$(".ContentTableWrapper").removeClass('hideBlock');
						validateReconcilation();
					});
					$('.deptLbl').attr('title', Inv_Department);
					$('.grnLbl').attr('title', Inv_GRN_Date);
					$('.ordLbl').attr('title', Inv_Order);

					$('.disLbl').attr('title', Inv_Discrepancy);
					$('.noiLbl').attr('title', Inv_Receipt_with_No_Invoice);
					$('.adjLbl').attr('title', Inv_Receipt_with_Adjustments);

					$("label,option,select").tooltip({
						position : {
							my : "top center-40",
							at : "top center"
						}
					});
					$('.dtl a').click(
							function() {
								$('.dtl').addClass('hideBlock');
								$('.enq').removeClass('hideBlock');
								$('.vari').addClass('hideBlock');
								$('.contentWrapper.orders').removeClass(
										'hideBlock');
								$('.contentWrapper.tabbedOrderDetail')
										.addClass('hideBlock');
								$('.contentWrapper.varianceRpt').addClass(
										'hideBlock');
							});

					$("#dialog-modal-autho").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 150,
						maxHeight : 600,
						width : 430
					});

					$("#dialog-modal-autho").parent().addClass("popupWrapper");

					$("#cancelVendorAuthNo").click(function(e) {
						$("#dialog-modal-autho").dialog("close");
					});
					
					$("#dialog-modal-autho-ngbo").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 150,
						maxHeight : 600,
						width : 430
					});
					
					$("#dialog-modal-autho-ngbo").parent().addClass("popupWrapper");
					
					$("#cancelVendorAuthNoNgbo").click(function(e) {
						$("#dialog-modal-autho-ngbo").dialog("close");
					});
					
					 $("#saveVendorAuthNoNgbo")
						.click(
								function(e) {
									$('#vendorClaimVal').val(
											$('#vendorAuthNoNgbo').val());
									if ($('#vendorAuthNoNgbo').val() == "") {
										$.fn.showCustomMsg([claimMsg],error,'Order Details');
										
									} else {
										var reqObj = $(this).data('obj');
										saveAuthNoInNGBO(reqObj);
									}
								});

					$("#saveVendorAuthNo")
							.click(
									function(e) {
										$('#vendorClaimVal').val(
												$('#vendorAuthNo').val());
										if ($('#vendorAuthNo').val() == "") {
											showAlert(
													'Please enter a valid Vendor Claim Authorization number.',
													'vendorAuthNo');
											// $( "#dialog-modal" ).dialog(
											// "open" );

										} else {

											var vendorClaimOrderNo = '';
											var authNo = $('#vendorAuthNo')
													.val().trim();
											if (commonOrder != ''
													&& commonOrder != undefined)
												vendorClaimOrderNo = commonOrder.orderNo;
											saveAuthNo({
												authNo : authNo,
												vendorClaimOrderNo : vendorClaimOrderNo
											});

										}
									});
					
					var ngbo1S3StoreFlag = $('#ngbo1S3StoreFlag').val();
					if(ngbo1S3StoreFlag == 'Y')
						{
						var jsVersion = $('#jsVersion').val();
						$('head').append('<script src="../../scripts/OrderEnquiryNew.js?version='+jsVersion+'">');
						}
					
					/** ***********code for back button click********* */
					$('#backBtn')
							.click(
									function() {
										hideError();
										if (!$('.contentWrapper.tabbedOrderDetail')
												.hasClass('hideBlock') || ($('#order_detail')
														.is(':visible'))) {
											if(ngbo1S3StoreFlag == 'Y')
												navigate(orderEnq);// for Defect_14718
												else
													navigateInSC(orderEnq);
										} else if ($('#update_order')
												.is(':visible')) {
											if(ngbo1S3StoreFlag == 'Y')
												navigate(detail);
												else
													navigateInSC(detail);
										} 
										else {
											window.location.href = "../login/goingHome.htm";
										}
									
										
										
									});
					/** ***********end of code for back button click********* */

					/** ********code for close button click*********** */
					$('#closeLink').click(function() {
						hideError();
						closeAccordian();
					});

					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							hideError();
							$('#noData').text('');
							showError('');
							$('.searchResults').hide();
							$(".ContentTableWrapper").removeClass('hideBlock');
							validateReconcilation();
						}
					});

				});

function navigateInSC(screen){
	var $content = $('.orders');
	var $brudCrum= $('#brudCrumCont .navigate');
	$content.addClass('hideBlock');$brudCrum.removeClass('hideBlock').addClass('hideBlock');
	 if(screen == detail){
		$('#order_detail').removeClass('hideBlock');
		$('#receive_order').addClass('hideBlock');
		$('#update_order').addClass('hideBlock');
		$('#order_detail .listOfArticles').removeClass('hideBlock');
		$('#order_detail .mainOrderDetails').removeClass('hideBlock');
		$('.commonReceiveOrder').removeClass('hideBlock');
		$('.orderStatus').removeClass('hideBlock');
		$('.receiveOrderStatus:visible').addClass('hideBlock');
		$('#brud_order_lookup').removeClass('hideBlock').removeClass('currentPage').addClass('cursor-pointer');
		$('#brud_update_order').addClass('hideBlock').removeClass('cursor-pointer').removeClass('currentPage');
		$('#brud_order_detail').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
	}else if(screen == update){
			$('#update_order').removeClass('hideBlock');
			$('#order_detail').addClass('hideBlock');
			$('#brud_order_lookup,#brud_order_detail').removeClass('hideBlock').removeClass('currentPage').addClass('cursor-pointer');
			$('#brud_update_order').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
		}else if(screen == orderEnq)// for Defect_14718
			{
			curStatus = '';
			$('.dtl').addClass('hideBlock');
			$('.enq').removeClass('hideBlock');
			$('.vari').addClass('hideBlock');
			$('.contentWrapper.orders')
					.removeClass('hideBlock');
			$(
					'.contentWrapper.tabbedOrderDetail')
					.addClass('hideBlock');
			$('.contentWrapper.varianceRpt')
					.addClass('hideBlock');
			$('#update_order').addClass('hideBlock');
			$('#order_detail').addClass('hideBlock');
			$('#brud_order_lookup').removeClass('hideBlock').addClass('currentPage').removeClass('cursor-pointer');
			$('#brud_order_detail').addClass('hideBlock').removeClass('currentPage');
			$('#brud_update_order').addClass('hideBlock').removeClass('cursor-pointer').removeClass('currentPage');
			}
}


function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function iterateResult(response, pageNumber) {
	var output = $.parseJSON(response);
	console.log(output);
	if (output.msg != null && output.msg.length > 0) {
		showError(output.msg);
	} else if (output.data != null && output.data != undefined) {
		// CONTENT INFO FORMING

		var content = '<tr class="noSort"><th width="15px"><span class="indenter">'
				+ '</span></th><th title="'
				+ inv_Order
				+ '">Order #</th><th title="'
				+ GRN_Date
				+ '">GR Date</th><th title="'
				+ GRN_Entered_By
				+ '">GR Entered by</th><th title="'
				+ GRN_Doc
				+ '">GR Doc #</th><th class="numberColumn columnDivider" title="'
				+ Total_GRN_Amount
				+ '">Total GR Amount</br>Incl. GST</th>'
				+ '<th class="numberColumn" title="'
				+ Total_INV_Amount
				+ '">'
				+ 'Total INV Amount</br>Incl. GST</th><th class="numberColumn" title="'
				+ inv_Discrepancy
				+ '">Discrepancy</br>Incl. GST</th>'
				+ '<th class="lastColumn">Comments</th></tr>';
		var storeMap = output.data;
		var j = 1;
		var k = 0;
		var overCharge = '';
		var underCharge = '';
		var articleHead = '';
		for ( var m in storeMap) {

			k++;
			var list = storeMap[m];

			content += '<tr data-tt-id="' + k
					+ '" class="add-info-img contentTr pageNo-' + j;
			if (k > 10)
				content += ' hideBlock ';
			// <td title="'+Plus_Symbol+'">'
			content += '"><td>'
					+ '<img id="promo-trigger" class="" src="../../images/woolworths/iconOpenAccordion.png"/>'
					+ '</td><td><a href="#"  onclick="navigateOrderDetail('
					+ "'" + list[0].purchaseOrder.replace(/^0+/, '') + "'"
					+ ')" class="navigate detail">'
					+ list[0].purchaseOrder.replace(/^0+/, '') + '</a></td>'
					+ '<td>'
					+ list[0].grPostingDate.replace('.', '/').replace('.', '/')
					+ '</td>' + '<td>' + list[0].grUserName;
			if (list[0].grUserId != '')
				content += '( ' + list[0].grUserId + ' )';
			content += '</td>'
					+ '<td>'
					+ list[0].grNo
					+ '</td>'
					+ '<td class="numberColumn columnDivider">'
					+ (Number(list[0].totGrAmt) + Number(list[0].totGrGst))
							.toFixed(2) + '</td>' + '<td class="numberColumn">'
					// + Number((list[0].totInvAmt -
					// list[0].totInvTax)).toFixed(2) + '</td>'
					+ Number((list[0].netPayable)).toFixed(2) + '</td>'
					+ '<td class="numberColumn">'
					+ Number((list[0].disAmtExclGst)).toFixed(2) + '</td>'
					+ '<td class="lastColumn"';
			/*
			 * if(list[0].comments=='Matched'){ content+='
			 * title="'+inv_Matched+'" '; }else
			 * if(list[0].comments=='Overcharged'){ content+='
			 * title="'+inv_Overcharged+'" '; }else
			 * if(list[0].comments=='Undercharged'){ content+='
			 * title="'+inv_Undercharged+'" '; }else{ content+='
			 * title="'+Invoice_Not_Yet_Received+'" '; }
			 */
			content += '>' + list[0].comments + '</td>' + '</tr>';
			if (k % 10 == 0) {
				j++;
			}
			if (k == 1) {
				overCharge = list[0].overChrgTot;
				underCharge = list[0].underChrgTot;
				recordCount = list[0].msg.trim();
			}

			// RECEIPT CONTENT
			content += '<tr data-tt-id="'
					+ k
					+ ''
					+ j
					+ '" data-tt-parent-id="'
					+ k
					+ '" class="noChild hideBlock additionalPromos"><td colspan="10">'
					+ '<div id="tabs" class="tabs"><ul><li title="'
					+ rec_tab
					+ '"><a href="#tabs-1">Receipts</a></li><li title="'
					+ in_tab
					+ '"><a href="#tabs-2">Invoices</a></li>'
					+ '<li title="'
					+ sum_tab
					+ '"><a href="#tabs-3">Summary</a></li></ul><div id="tabs-1"><div class="ContentTableWrapper">'
					+ '<table class="secondaryTable" cellspacing="0" width="100%">';

			var recieptFlag = false;
			for ( var i = 0; i < list.length; i++) {

				if (list[i].grNo != '') {
					if (!recieptFlag) {
						recieptFlag = true;
						content += '<tr><th width="10%" title="'
								+ rec_Date
								+ '">Date</th><th width="30%" title="'
								+ rec_GRN_Entered_By
								+ '">GR Entered by</th>'
								+ '<th width="15%" title="'
								+ rec_GRN_Doc
								+ '">GR Doc # (SAP)</th><th width="15%" title="'
								+ rec_GRN
								+ '">GR #</th><th width="15%" class="numberColumn" title="'
								+ rec_Total_GRN_Amount_Incl
								+ '">Total GR Amount</br>Incl. GST</th><th width="20%" class="lastColumn" title="'
								+ rec_GRN_Type + '">GR Type</th>' + '</tr>';
					}
					content += '<tr><td>'
							+ list[i].grPostingDate.replace('.', '/').replace(
									'.', '/') + '</td>' + '<td>'
							+ list[i].grUserName;
					if (list[i].grUserId != '')
						content += '( ' + list[i].grUserId + ' )';
					content += '</td><td>'
							+ list[i].grNo
							+ '</td>'
							+ '<td class="">'
							+ list[i].grHdrTxt
							+ '</td><td class="numberColumn">'
							+ Number(
									Number(list[i].grAmount)
											+ Number(list[i].grTaxAmt))
									.toFixed(2)
							+ '</td><td class="lastColumn ">' + list[i].grnType
							+ '</td></tr>';

				}

			}
			if (!recieptFlag) {
				content += '<tr><th width="10%" colspan="6">No Receipt found.</th></tr>';
			}
			content += '</table></div> <!-- End of content table wrapper --></div> <!-- End of tab - 1  -->';

			// INVOICE CONTENT

			content += '<div id="tabs-2"><div class="ContentTableWrapper"><table class="secondaryTable" cellspacing="0" width="100%">';

			var invoiceFlag = false;
			for ( var i = 0; i < list.length; i++) {

				if (list[i].invoiceNo != '') {
					if (!invoiceFlag) {
						invoiceFlag = true;
						content += '<tr><th width="10%" title="'
								+ in_Date
								+ '">Date</th><th width="30%"title="'
								+ in_Entered_By
								+ '">Entered by</th><th width="15%" title="'
								+ in_Document
								+ '">Document # (SAP)</th><th width="15%" title="'
								+ in_Reference
								+ '">Reference #</th>'
								+ '<th width="10%" class="numberColumn" title="'
								+ in_Total_Amount
								+ '">Total Amount</br>Incl. GST</th><th width="15%" class="lastColumn numberColumn" title="'
								+ in_Total_GST + '">Total GST</th>' + '</tr>';
					}
					content += '<tr><td>'
							+ list[i].invPostingDate.replace('.', '/').replace(
									'.', '/') + '</td>' + '<td>'
							+ list[i].invUserName;
					if (list[i].grUserId != '')
						content += '( ' + list[i].grUserId + ' )';
					content += '</td><td>' + list[i].sapInvNo + '</td><td>'
							+ list[i].invoiceNo
							+ '</td><td class="numberColumn">'
							+ Number((list[i].invAmount)).toFixed(2) + '</td>'
							+ '<td class="lastColumn numberColumn">'
							+ Number((list[i].invTax)).toFixed(2)
							+ '</td></tr>';
				}

			}
			if (!invoiceFlag) {
				content += '<tr><th width="10%" colspan="6">No Invoice found.</th></tr>';
			}

			content += '</table></div> <!-- End of content table wrapper --></div> <!-- End of tab - 2 -->';

			// NETPAYABLE CONTENT
			content += '<div id="tabs-3"><div class="ContentTableWrapper"><div class="tableTitle">'
					+ '<h4 class="secondaryTableTitle" title="'
					+ sum_Total_Amount_Including
					+ '">Total Amount Incl. GST</h4></div> <!-- End of table title --><table class="secondaryTable" cellspacing="0" width="100%">'
					+ '<tr class="subHeader"><th class="numberColumn" title="'
					+ sum_GRN_Amount
					+ '">GR Amount</th><th class="numberColumn" title="'
					+ sum_Invoice_Amount
					+ '">Invoice Amount</th><th class="numberColumn" title="'
					+ sum_Additional_Payable
					+ '">Additional Payable</th>'
					+ '<th class="numberColumn" title="'
					+ sum_Claims
					+ '" >Claims</th>'
					+ '<th class="numberColumn" title="'
					+ sum_Net_Payable + '">Net Payable</th></tr>';

			content += '<tr class="lastRow"><td class="numberColumn">'
					+ (Number(list[0].totGrAmt) + Number(list[0].totGrGst))
							.toFixed(2) + '</td><td class="numberColumn">'
					+ Number((list[0].totInvAmt)).toFixed(2)
					+ '</td><td class="numberColumn">'
					// + Number((list[0].addPaymentsAmt)).toFixed(2) + '</td>'
					// +
					// (Number(list[0].totalAdditionalPayments)+Number(list[0].totalClaimsReversal)).toFixed(2)
					// + '</td>'
					+ Number((list[0].additionalPayable)).toFixed(2) + '</td>'
					+ '<td class="numberColumn">'
					// + Number((list[0].claimsAmt)).toFixed(2)
					// +
					// (Number(list[0].totalClaims)+Number(list[0].totalAdditionalClaims)).toFixed(2)
					// + '</td>'
					+ Number((list[0].totalClaimsValue)).toFixed(2)
					// + '</td><td class="numberColumn">' +
					// Number((list[0].claimsRevAmt)).toFixed(2)
					// + '</td><td class="numberColumn">'
					// +Number((list[0].addClaims)).toFixed(2)
					+ '</td><td class="numberColumn lastColumn">'
					+ Number((list[0].netPayable)).toFixed(2) + '</td>'
					+ '</tr></table>';
			// content += '<div class="tableTitle"><h4
			// class="secondaryTableTitle" title="'+tot_gst_tab+'"><br />GST
			// Value</h4></div> <!-- End of table title -->';
			//
			// content += '<table class="secondaryTable" cellspacing="0"
			// width="100%"><tr class="subHeader"><th class="numberColumn"
			// title="'+tot_gst_GRN_Amount+'">GRN Amount</th>'
			// + '<th class="numberColumn"
			// title="'+tot_gst_Invoice_Amount+'">Invoice Amount</th><th
			// class="numberColumn"
			// title="'+tot_gst_Additional_Payable+'">Additional Payable</th><th
			// class="numberColumn" title="'+tot_gst_Claims+'">Claims</th>'
			// //+ '<th class="numberColumn">Claims Reversal</th><th
			// class="numberColumn">Additional Claims</th>'
			// + '<th class="numberColumn" title="'+tot_gst_Net_Payable+'">Net
			// Payable</th></tr>';

			content += '<div class="tableTitle"><h4 class="secondaryTableTitle"><br />GST Value</h4></div> <!-- End of table title -->';

			content += '<table class="secondaryTable" cellspacing="0" width="100%"><tr class="subHeader"><th class="numberColumn" >GR Amount</th>'
					+ '<th class="numberColumn" >Invoice Amount</th><th class="numberColumn" >Additional Payable</th><th class="numberColumn" >Claims</th>'
					// + '<th class="numberColumn">Claims Reversal</th><th
					// class="numberColumn">Additional Claims</th>'
					+ '<th class="numberColumn" >Net Payable</th></tr>';

			content += '<tr class="lastRow"><td class="numberColumn">'
					+ Number((list[0].totGrGst)).toFixed(2)
					+ '</td><td class="numberColumn">'
					+ Number((list[0].totInvTax)).toFixed(2)
					+ '</td><td class="numberColumn">'
					// + Number((list[0].addPayGst)).toFixed(2)
					// +
					// (Number(list[0].totalAdditionalPayments)+Number(list[0].totalClaimsReversal)).toFixed(2)
					// + '</td>'
					+ Number((list[0].additionalPayableGST)).toFixed(2)
					+ '</td>'
					+ '<td class="numberColumn">'
					// + Number((list[0].claimsGst)).toFixed(2)
					// +
					// (Number(list[0].totalClaimsGst)+Number(list[0].totalAdditionalClaimsGst)).toFixed(2)
					+ Number((list[0].totalClaimsGSTValue)).toFixed(2)
					// + '</td><td class="numberColumn">'
					// + Number((list[0].claimsRevGst)).toFixed(2)
					// + '</td><td class="numberColumn">'
					// + Number((list[0].addClaimsGst)).toFixed(2)
					+ '</td><td class="numberColumn lastColumn">'
					+ Number((list[0].netPayGst)).toFixed(2)
					+ '</td>'
					+ '</tr></table></div> <!-- End of content table wrapper --></div> <!-- End of tab 3 --></div> <!-- End of tabs --></td></tr>';
		}
		// console.log(k);

		$('.ContentTable.actionRows').html('');
		$('.ContentTable.actionRows').addClass('drilldownTable').html(content);

		// ARTICLE HEADER INFO FORMING
		var articleHead = '';
		// if(){
		articleHead += '<div class="articleHead"><div class="articleHeaderWrapper" title="'
				+ Summary_Bar + '">';
		if (overCharge != '' && underCharge != '') {
			articleHead += '<h2 class="articleTitle">Overcharge: $ '
					+ overCharge;
			if (overCharge != '' && underCharge != '')
				articleHead += ' | ';
			articleHead += ' Undercharge: $ ' + underCharge + ' </h2>';
		}
		articleHead += '<p>' + '<label class="articlePriceLabel">';
		if ($('#fromDateGrn').val() != '')
			articleHead += 'GR Date: <strong>' + $('#fromDateGrn').val() + ' - '
					+ $('#toDateGrn').val() + '</strong> </label>';
		else
			articleHead += 'Order No: <strong>' + $('#orderNo').val()
					+ '</strong> </label>';

		if ($('#discrpAmt').val().trim() != '') {
			articleHead += '<label class="articlePriceLabel">|</label><label class="articlePriceLabel">';
			articleHead += 'Discrepancy ($): <strong>&gt;= +/- '
					+ $('#discrpAmt').val() + '</strong></label>';
			articleHead += '</p></div><div class="articleActionBtns hideBlock"><label class="actionBtn"><label class="print">Print</label></label></div></div>';
		}

		$('.orders .articleHead').remove();
		$('#reportContent').prev().after(articleHead);
		// }

		// hideContent();
		bindContent();
		if (recordCount > 10) {
			showPaginatedContent(recordCount);
		} else {
			showContent(recordCount);
		}
	}
	// stopLoading();

}
function bindContent() {
	$(".tabs").tabs();
	$('.detail').click(function(e) {
		hideError();
		e.stopPropagation();
	});
	/*
	 * if(!($(".ContentTable.actionRows").hasClass('treeTable'))){
	 * $(".ContentTable.actionRows").removeClass('treeTable').treetable({
	 * expandable: true }); }
	 */
	$("h4,th,td,div").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	$('.add-info-img')
			.click(
					function() {
						hideError();
						if ($(this).find('img').attr('src') == "../../images/woolworths/iconOpenAccordion.png") {

							$(this)
									.find('img')
									.attr('src',
											'../../images/woolworths/iconCloseAccordion.png');
							$(this).next().removeClass('hideBlock');
							$(this).addClass('expanded');
						}

						else {
							$(this)
									.find('img')
									.attr('src',
											'../../images/woolworths/iconOpenAccordion.png');
							$(this).next().addClass('hideBlock');
							$(this).removeClass('expanded');
						}
					});
}
function generateReport(data, pageNumber) {
	if (pageNumber == 1) {
		data = $('#reconReport').serialize();
		// data+="&pageNo="+1;
	} else {
		data = oldData;
		data += "&pageNo=" + pageNumber;
	}
	$.ajax({
		type : "get",
		url : "generateReport.htm",
		data : data,
		beforeSend : function() {
			// startLoading();
			fullScreenLoader();
		},
		success : function(response) {
			iterateResult(response, pageNumber);
			$.loader('close');
		},
		error : function() {
			// goToLogin();
		},
	});

}

function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			currentPage = pageNumber;/*
										 * //console.log(pageNo);
										 * closeAccordian();
										 * currentPage=pageNumber; var
										 * pageClass='pageNo-'+pageNumber;
										 * $('.contentTr').filter(function(){
										 * if($(this).hasClass(pageClass))
										 * $(this).removeClass('hideBlock');
										 * else $(this).addClass('hideBlock');
										 * 
										 * });
										 */
			generateReport(oldData, pageNumber);
		}

	});
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('.paginationWrapper').show();
	closeAccordian();
	// showPage(1);
}

function showContent(count) {

	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,.ContentTable.actionRows,.articleHead')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows,.articleHead')
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

function validateReconcilation() {

	var fromDate = formateDate($('#fromDateGrn').val(), $('#fromDateGrn').val()
			.split('/').length);
	var toDate = formateDate($('#toDateGrn').val(),
			$('#toDateGrn').val().split('/').length);
	var crntDate = new Date();

	var date = new Date();
	var partsOne = fromDate.split('/');
	date.setFullYear(partsOne[2], partsOne[1] - 1, partsOne[0]);
	date.setTime(date.getTime());

	var splittedOne = partsOne[0] + partsOne[1] + partsOne[2];

	var date1 = new Date();
	var partsTwo = toDate.split('/');
	var splittedTwo = partsTwo[0] + partsTwo[1] + partsTwo[2];
	date1.setFullYear(partsTwo[2], partsTwo[1] - 1, partsTwo[0]);
	date1.setTime(date1.getTime());

	if ($('#orderNo').val() == "" && $('#fromDateGrn').val() == ""
			&& $('#toDateGrn').val() == "") {
		showError('Please enter details to generate a report');
	} else if ($('#orderNo').val().trim() != "") {
		hideError();
		$('#invoice,#ranged').prop('checked', false);
		$('#discrpAmt').val('');
		$('#fromDateGrn,#toDateGrn').val('');
		$('#rangedHidden,#invoiceHidden').val('Off');
		$('#department options[value="Select"]').prop('selected', true);
		oldData = $('#reconReport').serialize();
		generateReport($('#reconReport').serialize(), 1);
	} else if ($('#orderNo').val() == "" && $('#fromDateGrn').val() == ""
			&& $('#toDateGrn').val() != "") {
		showError('Please enter GR from date');
	} else if ($('#orderNo').val() == "" && $('#fromDateGrn').val() != ""
			&& $('#toDateGrn').val() == "") {
		showError('Please enter GR to date');

	} else if ($('#fromDateGrn').val() != ""
			&& !(splittedOne.length == 8 || splittedOne.length == 6 || partsOne.length == 3)) {
		showError('Please enter valid GR from date');
	} else if ($('#fromDateGrn').val() != "" && partsOne != ""
			&& (partsOne[0] > 31 || partsOne[1] > 12 || partsOne[2] > 9999)
			|| isNaN(splittedOne)) {
		showError('Please enter valid GR from date');
	} else if ($('#toDateGrn').val() != ""
			&& partsTwo != ""
			&& !(partsTwo.length == 3 || splittedTwo.length == 8 || splittedTwo.length == 6)) {
		showError('Please enter valid GR to date');

	} else if ($('#toDateGrn').val() != "" && partsTwo != ""
			&& (partsTwo[0] > 31 || partsTwo[1] > 12 || partsTwo[2] > 9999)
			|| isNaN(splittedTwo)) {
		showError('Please enter valid GR to date');

	} else if ($('#fromDateGrn').val() != "" && $('#toDateGrn').val() != ""
			&& (date1.getTime() - date.getTime()) < 0) {
		showError('GR to date should not be lesser than the from date');

	} else if ($('#fromDateGrn').val() != "" && $('#toDateGrn').val() != ""
			&& date.getTime() < (crntDate.getTime() - (86400000 * 365 * 2))) {
		showError('GR from date should not be before two years from now');

	} else if ($('#fromDateGrn').val() != "" && $('#toDateGrn').val() != ""
			&& date.getTime() > (crntDate.getTime())) {
		showError("GR to date cannot be greater than Today");

	} else if ($('#fromDateGrn').val() != "" && $('#toDateGrn').val() != ""
			&& date1.getTime() > (crntDate.getTime())) {
		showError('GR to date cannot be greater than Today');

	} else if ($('#fromDateGrn').val() != "" && $('#toDateGrn').val() != ""
			&& (date1.getTime() - date.getTime()) > (86400000 * 365)) {
		showError('GR from & to date range should not be greater than twelve months');

	} else if ($('#orderNo').val() != "" && isNaN($('#orderNo').val())) {
		showError('Please enter valid order number');
	} else if ($('#ranged').is(':checked')
			&& (($('#orderNo').val() == "") || ($('#discrpAmt').val() != ""))) {
		// $("#dialog-cancelOrder").parent().addClass("popupWrapper");
		// $("#dialog-cancelOrder").dialog("open");
		$('#orderNo').val('');
		$('#discrpAmt').val('');
		// $('#dialog-cancelOrder').dialog('close');
		oldData = $('#reconReport').serialize();
		generateReport($('#reconReport').serialize(), 1);
	} else {
		hideError();
		oldData = $('#reconReport').serialize();
		generateReport($('#reconReport').serialize(), 1);
	}
}
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}

function isNumberKeyTemp(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
		if (charCode == 46) {
			return true;
		}
		return false;
	}

	return true;
}
function formateDate(v, l) {
	if (v.length == 8 && l == 3) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}
function navigateOrderDetail(orderNo) {
	// console.log(ev);
	// ev.stopPropagation();
	console.log(orderNo);
	var ngbo1S3StoreFlag = $('#ngbo1S3StoreFlag').val();
	if(ngbo1S3StoreFlag == 'Y')
		{
		startLoading();
		navigateToNGBOOrderDetail(orderNo);	
		}
	else
	{
	$.ajax({
		type : "get",
		url : "getOrderDtl.htm",
		data : {
			orderNo : orderNo
		},
		beforeSend : function() {
			// startLoading();
			fullScreenLoader();
		},
		success : function(response) {
			getOrdersList(orderNo);
			// $.loader('close');

		},
		error : function() {
			// goToLogin();
		},
	});
}
}
function showOrderDetail(response) {
	$('.invoicePage').addClass('hideBlock');
	$('.dtlPage').removeClass('hideBlock');
	$('.contentWrapper.reportWrapper').addClass('hideBlock');
	// $('.contentWrapper.reportWrapper').after().remove();
	$(response).insertAfter('.contentWrapper.reportWrapper');
	newFunction();
}
function backToInvoice(response) {
	$('.invoicePage').removeClass('hideBlock');
	$('.dtlPage').addClass('hideBlock');
	$('.contentWrapper.reportWrapper').removeClass('hideBlock');
	$('.contentWrapper.reportWrapper').next().remove();
	// $('.contentWrapper.reportWrapper').after(response);
}

function newFunction() {
	$(".actionBtn, .secondaryActionBtn").bind('click', function() {
		$("#dialog-modal-delivery").dialog("close");

	});

	$('.actionBtn, .secondaryActionBtn').keyup(function(e) {
		if (e.which === 13) { // 13 is the char code for Enter
			clickedId = this.id;
			if (clickedId == 'changeDelivery' || clickedId == 'cancelDelivery')
				$("#dialog-modal-delivery").dialog("close");
		}
	});

	$("#editdDate").click(function() {

		$("#dialog-modal-delivery").dialog("open");
	});

	// checks radio buttons in Invoice Info
	$('#receiveAmount').click(function() {
		$("#invoiceEntry").removeClass('hideBlock');
		$("#docketEntry").addClass('hideBlock');
		$("#invoiceEntryConfirm").removeClass('hideBlock');
		$("#docketEntryConfirm").addClass('hideBlock');

	});

	$('#receiveDocket').click(function() {
		$("#docketEntry").removeClass('hideBlock');
		$("#invoiceEntry").addClass('hideBlock');
		$("#docketEntryConfirm").removeClass('hideBlock');
		$("#invoiceEntryConfirm").addClass('hideBlock');
	});

	$("#dropdownSelect").click(function() {
		if ($('#dropdown').hasClass('active')) {
			$("#dropdown").removeClass('active');
		} else {
			$("#dropdown").addClass('active');
		}
	});

	$('html').click(function() {
		$("#dropdown").removeClass('active');
	});

	$('#dropdownSelect').click(function(event) {
		event.stopPropagation();
	});

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

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// code to initialise tree table
	/*
	 * $(".treetable").treetable({ expandable: true });
	 */

	// Code for Expand and Collapse all
	$('#expandAll').click(function() {
		$("#treetable").treetable('expandAll');
		$("#expandAll").addClass('hideBlock');
		$("#collapseAll").removeClass('hideBlock');
		$('#treetable tr:even').removeClass('expanded');
	});

	$('#collapseAll').click(function() {
		$("#treetable").treetable('collapseAll');
		$("#expandAll").removeClass('hideBlock');
		$("#collapseAll").addClass('hideBlock');
	});

	// Code to expand collapse Delivery status more information

	$("#moreDetails").click(function() {
		$("#deliveryStatusDetails").removeClass('hideBlock');
		$("#lessDetails").removeClass('hideBlock');
		$("#moreDetails").addClass('hideBlock');
	});

	$("#lessDetails").click(function() {
		$("#deliveryStatusDetails").addClass('hideBlock');
		$("#lessDetails").addClass('hideBlock');
		$("#moreDetails").removeClass('hideBlock');
	});

	$("#subTabs").tabs();
	$("#sections").tabs({
		active : 2
	});

	$("#tabs a.ui-tabs-anchor").click(function() {
		$("#FilterResult").css("display", "none");
	});

	// Code to show GRN filter
	$("#showFilterResult").click(
			function() {
				$('#tabs .ui-tabs-active').attr("tabindex", "-1");
				;
				$('#tabs .ui-tabs-active').removeClass(
						'ui-tabs-active ui-state-active');

				$('#tabs .ui-tabs-panel').css("display", "none");
				$("#FilterResult").removeClass('hideBlock');
				$("#FilterResult").css("display", "block");
			});

}
function getOrdersList(orderNo) {

	var orderList = '';
	var msg = '';
	var output = '';
	var count = '';
	// console.log(data);
	$.ajax({
		type : "get",
		url : "../allocation/getPOrderDtl.htm",
		data : {
			orderNo : orderNo
		},
		beforeSend : function() {
			startLoading();
			// if(orderPageFlag)
			// hideOrderTbl();
		},
		success : function(response) {

			output = $.parseJSON(response);

			orderList = output.data;

			msg = output.msg;

			if (msg != undefined && msg != '' && !isNaN(msg)
					&& orderList != null) {

				commonOrderList = orderList;
				getOrderDetails(orderNo, orderList[0]);

			} else {

				showError('Service Unavailable.');
				stopLoading();
				$.loader('close');

			}
			// stopLoading();
		},
		error : function() {
			// goToLogin();
			stopLoading();
			$.loader('close');
		},
	});

}
function getOrderDetails(orderNo, obj) {
	var data = {
		orderNo : orderNo
	};
	var msg = '';
	var output = '';
	var count = '';
	var tabHeader = '';
	var tabSection = '';
	commonOrder = obj;

	$
			.ajax({
				type : "get",
				url : "../allocation/getOrderDetails.htm",
				data : data,
				beforeSend : function() {
					// startLoading();
					// hideOrderTbl();
				},
				success : function(response) {

					output = $.parseJSON(response);
					var deliveryInfo = $.parseJSON(output.data.deliveryInfo);
					var itemInfo = $.parseJSON(output.data.itemInfo);
					//var grInfo = $.parseJSON(output.data.grInfo);
					// var invoiceInfo=$.parseJSON(output.data.invoiceInfo);
					msg = itemInfo.msg;
					deliveryList = deliveryInfo.data;
					var deliveryMsg = deliveryInfo.msg;
					tabHeader = '<div id="sections" class="sectionTabs"><ul>';
					var currentTab = 0;

					if (msg != undefined && msg != '' && !isNaN(msg)
							&& itemInfo.data != null) {
						var grSelect = '';
						var orderStatus=obj.orderStatus;
						/*if (obj.orderStatus == 'RECEIVED'
								|| obj.orderStatus == 'PARTIALLY RECEIVED')
							grSelect = grInfoList(grInfo.data);*/
						var orderHd = orderHead(obj);
						calculateTotalCartonsReceived(itemInfo.data,obj);
						var overAllHdr = formOverAllHeader(obj, deliveryList);
						var invoic = '';// formInvoiceInfo(invoiceInfo.data);
						var deliveCon = formDeliveryContent(obj, deliveryList,
								0);
						var formItem = formItemHdr(itemInfo.data);
						var itemAllList = formAllItemList(itemInfo.data);
						allItemList = itemInfo.data;
						var itemUnsuList = formUnsuppItemList(itemInfo.data);

						if (deliveryList != null && deliveryList != undefined
								&& deliveryList != '' && deliveryMsg != null
								&& deliveryMsg != ''
								&& deliveryMsg != undefined) {
							currentTab = deliveryList.length;
							for ( var j = (deliveryList.length - 1); j >= 0; j--) {
								if (j == 0) {
									tabHeader += '<li class="contentAlignment"><a href="#section-overAll"><label class="sectionTitle ">Overall Info</label>'
											+ '<label class="sectionInfo">';
									if (deliveryList.length != 0
											&& deliveryList.length > 1)
										tabHeader += 'Total Deliveries: <strong>'
												+ (deliveryList.length - 1)
												+ '</strong>';
									else
										tabHeader += '&nbsp';
									tabHeader += '</label></a></li>';
									tabSection += '<div id="section-overAll">'
											+ orderSubHdr(obj, 'overAll',
													'Overall Info')
											+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'
											+ overAllHdr;
									if (obj.portalOrderType == orderTypeVendorOrders)
										tabSection += invoic;
									if (obj.portalOrderType == orderTypeIBTAll
											|| obj.portalOrderType == orderTypeIBTIn
											|| obj.portalOrderType == orderTypeIBTOut)
										tabSection += formStoreContent(obj);
									tabSection += formDeliveryContent(obj,
											deliveryList, j)
											+ '</div></div>'
											+ formItem
											+ '</div></div>';
								} else {
									tabHeader += '<li><a href="#section-'
											+ j
											+ '"><label class="sectionTitle">Delivery-'
											+ j
											+ '</label>'
											+ '<label class="sectionInfo segmentNo-'
											+ j + '">';
									if (obj.portalOrderType == orderTypeVendorOrders)
										tabHeader += 'ASN';
									else
										tabHeader += 'Segment';

									tabHeader += '#: <strong>';

									if (obj.portalOrderType == orderTypeVendorOrders)
										tabHeader += deliveryList[j].delievryNo
												.replace(/^0+/, '');
									else
										tabHeader += deliveryList[j].delievryNo
												.replace(/^0+/, '');
									// asnNo need to confirm

									tabHeader += '</strong></label></a></li>';
									tabSection += '<div id="section-'
											+ j
											+ '">'
											+ orderSubHdr(obj, 'delivery',
													'Delivery-' + j)
											+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'
											+ overAllHdr;
									if (obj.portalOrderType == orderTypeVendorOrders)
										tabSection += invoic;
									if (obj.portalOrderType == orderTypeIBTAll
											|| obj.portalOrderType == orderTypeIBTIn
											|| obj.portalOrderType == orderTypeIBTOut)
										tabSection += formStoreContent(obj);
									tabSection += formDeliveryContent(obj,
											deliveryList, j)
											+ '</div></div></div></div>';
								}

							}
						} else {
							tabHeader += '<li class="contentAlignment"><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
									+ '<label class="sectionInfo">';
							if (deliveryList != null
									&& deliveryList != undefined
									&& deliveryList != ''
									&& deliveryList.length != 0)
								tabHeader += 'Total Deliveries: <strong>'
										+ deliveryList.length + '</strong>';
							else
								tabHeader += '&nbsp';
							tabHeader += '</label></a></li>';

							tabSection += '<div id="section-overAll">'
									+ orderSubHdr(obj, 'overAll',
											'Overall Info')
									+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'
									+ overAllHdr;
							if (obj.portalOrderType == orderTypeVendorOrders)
								tabSection += invoic;
							if (obj.portalOrderType == orderTypeIBTAll
									|| obj.portalOrderType == orderTypeIBTIn
									|| obj.portalOrderType == orderTypeIBTOut)
								tabSection += formStoreContent(obj);
							tabSection += deliveCon + '</div></div>' + formItem
									+ '</div>';
						}
						tabHeader += '</ul>';
						
						bindOrderDtlContent(orderHd, tabHeader, tabSection,
								itemAllList, itemUnsuList, grSelect,
								currentTab, itemInfo);
						if(orderStatus =='RECEIVED' || orderStatus =='PARTIALLY RECEIVED'){
							//$('#verifyGRN').val(orderNo);
							bindDropDownGrEvent(data,orderNo);
						}
					} else {
						if (msg == 'null')
							showError('Service Unavailable.');
						else
							showError(msg);
						// bindOrdersScroll();
					}
					$('#backBtnId').removeClass('hideBlock');
					$.loader('close');
					securityMatrix();
				},
				error : function() {
					// goToLogin();
					$.loader('close');
					stopLoading();
				},
			});

}

function bindDropDownGrEvent(data, orderNo){
	if($('.grnSelect option').length == 0){
	var output = '';
	//var dt={ orderNo : $('#verifyGRN').val()};
	var dt={ orderNo : orderNo};
		$.ajax({
			type : "get",
			url : "../allocation/getGrInfoDetails.htm",
			data : dt,
			beforeSend : function() {
				fullScreenLoader();
			},
			success : function(response) {
					output = $.parseJSON(response);
					var grInfo=$.parseJSON(output.data.grInfo);
					var grSelect='';
					grSelect=grInfoList(grInfo.data);
					$('.grnSelect').html('').empty().html(grSelect);
					$('.grnSelect').val('');
					$.loader('close');
					securityMatrix();
			},
			error : function() {
				// goToLogin();
			},
		});
	}
}

function calculateTotalCartonsReceived(itemList,orderHeader){
	var totalReceivedQty = 0;
	if (itemList != null) {
		for ( var j = 0; j < itemList.length; j++) {
			totalReceivedQty = Math.abs(Number(totalReceivedQty)+ Number(itemList[j].receivedQty));
		}
	}
	if(totalReceivedQty > 0){
		orderHeader.totReceivedQty = totalReceivedQty;
	}
}

function grInfoList(grInfo) {
	var content = '<option>Select GR</option>';

	if (grInfo != null && grInfo != undefined && grInfo != '') {
		var list = grInfo;

		for ( var i = 0; i < list.length; i++) {
			if (list[i].grNo != null && list[i].grNo != undefined
					&& list[i].grNo != ""
					&& parseInt(list[i].totCarReceived) != 0)
				content += '<option id="' + list[i].grNo + '-'
						+ list[i].grDocYear + '" value="' + list[i].grNo
						+ '" class="' + list[i].grNo + '">' + list[i].grNo
						+ '  (' + parseInt(list[i].totCarReceived)
						+ ')</option>';

		}

	}
	return content;
}

function orderHead(obj) {
	var content = '';

	content += '<h2 class="articleTitle orderNumber">Order #';
	if (obj.somOrderNo == "") {
		content += obj.orderNo.replace(/^0+/, '');
		console.log(obj.orderNo);
	} else if (obj.somOrderNo != "") {
		content += obj.somOrderNo + ' (' + obj.orderNo.replace(/^0+/, '') + ')';
		somOrderNoExists = true;
		console.log(obj.somOrderNo);
	}
	content += '</h2><p><label class="articlePriceLabel">' + obj.vendorName;
	if (obj.ventorNo != null && obj.ventorNo != '') {
		content += ' (' + obj.ventorNo.replace(/^0+/, '') + ')';
	}
	content += '</label></p>';
	return content;
}

function orderSubHdr(obj, type, delivery) {
	// <label class="editRecord" id="editAutho">&nbsp;</label>
	var content = '<div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle">'
			+ delivery
			+ '</h2><p>'
			+ '<label class="articlePriceLabel">Delivery Date: <strong>'
			+ obj.delvDate.replace('.', '/').replace('.', '/')
			+ '</strong><label class="editRecord hideBlock" id="editdDate">&nbsp;</label></label>';
	// +'<label class="articlePriceLabel">|</label> <label
	// class="articlePriceLabel">Total Articles: <strong
	// class="totalArticle">100</strong>';
	if (obj.orderStatus == 'RECEIVED' && obj.portalOrderType == 'VENDOR') {
		content += '<label class="articlePriceLabel vendorClaim';
		if (obj.vendorClaimNo == '')
			content += ' hideBlock';
		content += '"> |</label>'
				+ ' <label class="articlePriceLabel vendorClaim ';
		if (obj.vendorClaimNo == '')
			content += ' hideBlock';
		content += '"  style="">Vendor Authorisation # <strong id="headervendorAutho">'
				+ obj.vendorClaimNo + '</strong></label>';
	}
	content += '</p></div>'
			+ '<div class="articleActionBtns"><label class="orderStatus">Status: <strong>'
			+ obj.orderStatus + '</strong></label>'
			+ '<label class="actionBtn hideBlock">'
			+ '<label class="notepadCross">CancelOrder</label></label>';
	if (type == 'overAll'
			&& ((obj.orderStatus == 'RECEIVED' && obj.portalOrderType == 'VENDOR') || (obj.portalOrderType == 'WAREHOUSE'))) {
		content += '<span id="dropdown" class="actionBtn ">';
		if (obj.portalOrderType == 'WAREHOUSE')
			content += '<label class="dropdownLabel varianceRpt">Variance Report</label>';
		if (obj.orderStatus == 'RECEIVED' && obj.portalOrderType == 'VENDOR')
			content += '<label class="notepad vendoerClaim '
					+ EnterVendorClaimAuthorityNumber
					+ '">Vendor Authorisation # </label>';
		content += '</span>';
	}
	content += '</div></div>';
	return content;
	/*
	 * if(type=='overAll' && ( (obj.orderStatus=='RECEIVED' &&
	 * obj.orderType=='Normal PO') ))
	 * 
	 * {content+='<span id="dropdown" class="selectDropdown">' +'<label
	 * class="actionBtn" id="dropdownSelect" tabindex="3"><label
	 * class="createBtn">More</label></label>' +'<ul class="dropdown">'; if(
	 * obj.orderType=='Retail STO') content+='<li><label class="dropdownLabel
	 * varianceRpt">Variance Report</label></li>';
	 * if(obj.orderStatus=='RECEIVED' && obj.orderType=='Normal PO') content+='<li><label
	 * class="dropdownLabel vendoerClaim">Vendor Claims</label></li>';
	 * content+='</ul></span>';
	 */
}

function formOverAllHeader(obj, deliveryList) {
	obj.roasterDate = (obj.roasterDate.replace('.', '/').replace('.', '/') == '00/00/0000' ? ''
			: obj.roasterDate.replace('.', '/').replace('.', '/'));
	obj.receivedDate = ((obj.receivedDate != null && obj.receivedDate != '') ? obj.receivedDate
			: '');
	totalPallets = obj.totPallets;
	var content = '';

	content = '<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+ '<td class="keyInfo" width="20%">Total Cartons:</td><td class="valueInfo" width="15%">'
			+ obj.totCartons
			+ '</td>'
			+ '<td class="keyInfo" width="15%">Roster Date:</td><td class="valueInfo" width="15%">';
	if (obj.roasterDate.length > 7)
		content += obj.roasterDate;
	content += '</td>'
			+ '<td class="keyInfo" width="15%"><!--Trading Dept:-->Total Cartons Received:</td><td class="valueInfo lastColumn"><!--'
			+ obj.department;
	if (obj.department != '' && obj.deptName != '')
		content += ' | ';
	content += obj.deptName
			+ '-->'
			+ obj.totReceivedQty
			+ '</td>'
			+ '</tr><tr><td class="keyInfo">Total Pallets:</td><td class="valueInfo">'
			+ obj.totPallets
			+ '</td><td class="keyInfo">'
			+ 'Creation Date:</td><td class="valueInfo">'
			+ obj.creationDate.replace('.', '/').replace('.', '/')
			+ '</td><td class="keyInfo"><!--Temperature:-->Received Date:</td>'
			+ '<td class="valueInfo"><!--'
			+ obj.temperature
			+ '-->'
			+ obj.receivedDate.replace('.', '/').replace('.', '/')
			+ '</td><td class="lastColumn"></td></tr><!--<tr><td class="keyInfo">Total Cartons Received:</td>'
			+ '<td class="valueInfo">'
			+ obj.totReceivedQty
			+ '</td><td class="keyInfo">Received Date:</td><td class="valueInfo">'
			+ obj.receivedDate.replace('.', '/').replace('.', '/')
			+ '</td><td class="keyInfo">Temperature 2:</td><td class="valueInfo lastColumn">'
			+ obj.temperature2 + '</td></tr>--></table>';
	if (obj.portalOrderType == orderTypeWarehouseOrders
			&& deliveryList.length > 0) {
		content += '<table cellspacing="0" class="ContentTable" width="100%">'
				+ '<tbody><tr><td class="keyInfo" width="20%">Delivery Status:</td>'
				+ '<td class="valueInfo" width="15%">'
				+ obj.deliveryStatus
				+ '</td><td class="lastColumn" width="65%"><label class="linkBtn">'
				+ '<a href="#" class="more" id="moreDetails">+ more </a>'
				+ '<a href="#" class="more hideBlock" id="lessDetails">- less </a>'
				+ '</label></td></tr>' + '</tbody></table>';
		content += '<table cellspacing="0" class="ContentTable hideBlock" width="100%" id="deliveryStatusDetails">'
				+ '<tbody>' + '</tbody></table>';
	}

	content += '</div>';
	/*
	 * var content='<div class="articleDetails"><table cellspacing="0"
	 * class="ContentTable" width="100%"><tr>' +'<td class="keyInfo" width="20%">Total
	 * Cartons:</td><td class="valueInfo" width="15%">'+obj.totCartons+'</td>' +'<td class="keyInfo" width="15%">Roster
	 * Date:</td><td class="valueInfo" width="15%">'+obj.roasterDate.replace('.','/').replace('.','/')+'</td>' +'<td class="keyInfo" width="15%">Trading
	 * Dept:</td><td class="valueInfo lastColumn">'+obj.department;
	 * if(obj.department!='' && obj.deptName!='') content+=' | ';
	 * content+=obj.deptName+'</td>' +'</tr><tr><td class="keyInfo">Total
	 * Pallets:</td><td class="valueInfo">'+obj.totPallets+'</td><td class="keyInfo">'
	 * +'Creation Date:</td><td class="valueInfo">'+obj.creationDate.replace('.','/').replace('.','/')+'</td><td class="keyInfo">Temperature:</td>' +'<td class="valueInfo lastColumn">'+obj.temperature+'</td></tr><tr><td class="keyInfo">Total
	 * Cartons Received:</td>' +'<td class="valueInfo">'+obj.totReceivedQty+'</td><td class="keyInfo">Received
	 * Date:</td><td class="valueInfo">'
	 * +obj.receivedDate.replace('.','/').replace('.','/')+'</td><td class="keyInfo">Temperature
	 * 2:</td><td class="valueInfo lastColumn">'+obj.temperature2+'</td></tr></table></div>';
	 */
	return content;
}

function formDeliverStatusDtl(obj, deliveryList, j, allItemList,
		segmentOrderList) {
	var content = '';
	if (obj.portalOrderType == orderTypeWarehouseOrders && deliveryList != null
			&& deliveryList != "" && deliveryList.length > 0) {

		var sumOfPickReq = 0;
		var sumOfDispQty = 0;
		var sumOffairQty = 0;
		var sumOfRecQty = 0;
		var deliveryStatusDtl = deliveryList;
		if (deliveryStatusDtl != null && deliveryStatusDtl != undefined
				&& deliveryStatusDtl.length > 0) {

			if (allItemList.length > 0 && j == 0) {
				for ( var i = 0; i < allItemList.length; i++) {
					allItemList[i].pick_req_qty = (allItemList[i].pick_req_qty != null && allItemList[i].pick_req_qty != undefined) ? allItemList[i].pick_req_qty
							: '';
					sumOfPickReq += Number(allItemList[i].pick_req_qty);
					allItemList[i].dispatched_qty = (allItemList[i].dispatched_qty != null && allItemList[i].dispatched_qty != undefined) ? (allItemList[i].dispatched_qty)
							: '';
					sumOfDispQty += Number(allItemList[i].dispatched_qty);
					allItemList[i].fair_share_qty = (allItemList[i].fair_share_qty != null && allItemList[i].fair_share_qty != undefined) ? (allItemList[i].fair_share_qty)
							: '';
					sumOffairQty += Number(allItemList[i].fair_share_qty);
					allItemList[i].received_qty = (allItemList[i].received_qty != null && allItemList[i].received_qty != undefined) ? (allItemList[i].received_qty)
							: '';
					sumOfRecQty += Number(allItemList[i].received_qty);
				}
			} else if (segmentOrderList.length > 0 && j != 0) {
				for ( var i = 0; i < segmentOrderList.length; i++) {
					segmentOrderList[i].pick_req_qty = (segmentOrderList[i].pick_req_qty != null && segmentOrderList[i].pick_req_qty != undefined) ? segmentOrderList[i].pick_req_qty
							: '';
					sumOfPickReq += Number(segmentOrderList[i].pick_req_qty);
					segmentOrderList[i].dispatched_qty = (segmentOrderList[i].dispatched_qty != null && segmentOrderList[i].dispatched_qty != undefined) ? (segmentOrderList[i].dispatched_qty)
							: '';
					sumOfDispQty += Number(segmentOrderList[i].dispatched_qty);
					segmentOrderList[i].fair_share_qty = (segmentOrderList[i].fair_share_qty != null && segmentOrderList[i].fair_share_qty != undefined) ? (segmentOrderList[i].fair_share_qty)
							: '';
					sumOffairQty += Number(segmentOrderList[i].fair_share_qty);
					segmentOrderList[ij].received_qty = (segmentOrderList[i].received_qty != null && segmentOrderList[i].received_qty != undefined) ? (segmentOrderList[i].received_qty)
							: '';
					sumOfRecQty += Number(segmentOrderList[i].received_qty);

				}
			}

			deliveryStatusDtl[j].dispatched_date = (deliveryStatusDtl[j].dispatched_date != null && deliveryStatusDtl[j].dispatched_date != undefined) ? (deliveryStatusDtl[j].dispatched_date)
					: '';
			if (deliveryStatusDtl[j].dispatched_date != ''
					&& deliveryStatusDtl[j].dispatched_date != null
					&& deliveryStatusDtl[j].dispatched_date != undefined)
				deliveryStatusDtl[j].dispatched_date = (deliveryStatusDtl[j].dispatched_date
						.replace('.', '/').replace('.', '/') == '00/00/0000' ? ''
						: deliveryStatusDtl[j].dispatched_date
								.replace('.', '/').replace('.', '/'));

			deliveryStatusDtl[j].dispatched_time = (deliveryStatusDtl[j].dispatched_time != null && deliveryStatusDtl[j].dispatched_time != undefined) ? (deliveryStatusDtl[j].dispatched_time)
					.replace(/PT/gi, '').replace(/H/gi, ':')
					.replace(/M/gi, ':').replace(/S/gi, '').substring(0, 5)
					: '';
			if (deliveryStatusDtl[j].dispatched_time == "00:00")
				deliveryStatusDtl[j].dispatched_time = '';

			deliveryStatusDtl[j].pick_list_gen_date = (deliveryStatusDtl[j].pick_list_gen_date != null && deliveryStatusDtl[j].pick_list_gen_date != undefined) ? (deliveryStatusDtl[j].pick_list_gen_date)
					: '';

			if (deliveryStatusDtl[j].pick_list_gen_date != ''
					&& deliveryStatusDtl[j].pick_list_gen_date != null
					&& deliveryStatusDtl[j].pick_list_gen_date != undefined)
				deliveryStatusDtl[j].pick_list_gen_date = (deliveryStatusDtl[j].pick_list_gen_date
						.replace('.', '/').replace('.', '/') == '00/00/0000' ? ''
						: deliveryStatusDtl[j].pick_list_gen_date.replace('.',
								'/').replace('.', '/'));

			deliveryStatusDtl[j].pick_list_gen_time = (deliveryStatusDtl[j].pick_list_gen_time != null && deliveryStatusDtl[j].pick_list_gen_time != undefined) ? (deliveryStatusDtl[j].pick_list_gen_time)
					.replace(/PT/gi, '').replace(/H/gi, ':')
					.replace(/M/gi, ':').replace(/S/gi, '').substring(0, 5)
					: '';
			if (deliveryStatusDtl[j].pick_list_gen_time == "00:00")
				deliveryStatusDtl[j].pick_list_gen_time = '';
			deliveryStatusDtl[j].suggested_qty = (deliveryStatusDtl[j].suggested_qty != null && deliveryStatusDtl[j].suggested_qty != undefined) ? (deliveryStatusDtl[j].suggested_qty)
					: '';

			deliveryStatusDtl[j].ordered_qty = (deliveryStatusDtl[j].ordered_qty != null && deliveryStatusDtl[j].ordered_qty != undefined) ? (deliveryStatusDtl[j].ordered_qty)
					: '';

			deliveryStatusDtl[j].received_date = (deliveryStatusDtl[j].received_date != null && deliveryStatusDtl[j].received_date != undefined) ? (deliveryStatusDtl[j].received_date)
					: '';
			if (deliveryStatusDtl[j].received_date != ''
					&& deliveryStatusDtl[j].received_date != null
					&& deliveryStatusDtl[j].received_date != undefined)
				deliveryStatusDtl[j].received_date = (deliveryStatusDtl[j].received_date
						.replace('.', '/').replace('.', '/') == '00/00/0000' ? ''
						: deliveryStatusDtl[j].received_date.replace('.', '/')
								.replace('.', '/'));

			deliveryStatusDtl[j].allocated_qty = (deliveryStatusDtl[j].allocated_qty != null && deliveryStatusDtl[j].allocated_qty != undefined) ? (deliveryStatusDtl[j].allocated_qty)
					: '';

			content += '<tr><td class="keyInfo" width="20%">PICK Lists Generated:</td><td class="valueInfo" width="15%">'
					+ deliveryStatusDtl[j].pick_list_gen_date
					+ ' '
					+ deliveryStatusDtl[j].pick_list_gen_time
					+ '</td><td class="keyInfo" width="15%">Qty. Suggested:</td><td class="valueInfo" width="15%">'
					+ deliveryStatusDtl[j].suggested_qty
					+ '</td><td class="keyInfo" width="15%">PICK Requested:</td><td class="valueInfo lastColumn">'
					+ sumOfPickReq
					+ '</td></tr>'
					+ '<tr><td class="keyInfo">Dispatched:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].dispatched_date
					+ ' '
					+ deliveryStatusDtl[j].dispatched_time
					+ '</td><td class="keyInfo">Qty. Ordered:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].ordered_qty
					+ '</td><td class="keyInfo">Received:</td><td class="valueInfo lastColumn">'
					+ sumOfRecQty
					+ '</td></tr>'
					+ '<tr><td class="keyInfo">Received:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].received_date
					+ '</td><td class="keyInfo">Qty. Allocated:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].allocated_qty
					+ '</td><td class="keyInfo">Fairshare Qty.</td><td class="valueInfo lastColumn">'
					+ '+ / - '
					+ sumOffairQty
					+ '</td><td class="keyInfo"><!--Received Pallets:</td><td class="valueInfo lastColumn">'
					+ totalPallets
					+ '--></td></tr>'
					+ '<tr><td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;</td>'
					+ '<td class="keyInfo">Qty. Sent:</td><td class="valueInfo">'
					+ sumOfDispQty
					+ '</td><td class="keyInfo"><!--Fairshare Qty.--></td><td class="valueInfo lastColumn">'
					+ '<!--+ / - '
					+ sumOffairQty
					+ '--></td></tr><tr><td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;</td>'
					+ '<td class="keyInfo"><!--Qty. Supplied:--></td><td class="valueInfo">'
					+ '<!--+ / - '
					+ sumOfDispQty
					+ '--></td><td class="keyInfo">&nbsp;</td><td class="valueInfo lastColumn">&nbsp;'
					+ '</td></tr>';

		}
	}
	return content;
}

function formInvoiceInfo(invoiceInfo) {
	var content = '';
	if (invoiceInfo != null && invoiceInfo != undefined && invoiceInfo != '') {
		for ( var i = 0; i < invoiceInfo.length; i++) {
			content += '<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody>'
					+ '<tr><td class="keyInfo" width="20%">Invoice No.:</td>'
					+ '<td class="valueInfo " width="20%" >'
					+ invoiceInfo[i].invoiceNo
					+ '</td>'
					+ '<td class="keyInfo" width="15%">Invoice Total ($):</td>'
					+ '<td class="valueInfo" width="15%">'
					+ invoiceInfo[i].ivoiceTot
					+ '</td>'
					+ '<td class="keyInfo" width="15%">GST ($):</td>'
					+ '<td class="valueInfo lastColumn" width="15%">'
					+ invoiceInfo[i].gst
					+ '</td></tr><tr>'
					+ '<td class="keyInfo" width="20%">Delivery Docket No.:</td><td class="valueInfo" width="20%"></td>'
					+ '<td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;'
					+ '</td><td class="keyInfo lastColumn" colspan="2">&nbsp;</td></tr></tbody></table></div>';
		}
	}

	return content;
}

function formDeliveryContent(obj, deliveryList, j) {
	var content = '';
	var selectedId = '';
	// if(j != 0){
	selectedId = j;
	// }
	if (deliveryList != null && deliveryList != "" && deliveryList.length > 0
			& somOrderNoExists
			&& obj.portalOrderType != orderTypeWarehouseOrders) {
		content += '<table cellspacing="0" class="ContentTable" width="100%">'
				+ '<tbody><tr><td class="keyInfo" width="20%">Delivery Status:</td>'
				+ '<td class="lastColumn valueInfo" width="15%">';
		if (somOrderNoExists && deliveryList.length > 1) {
			for ( var i = 1; i < deliveryList.length; i++) {
				content += deliveryList[i].delievryNo.replace(/^0+/, '');
				if (i != deliveryList.length - 1)
					content += ',';
			}
		} else if (deliveryList.length == 1 && somOrderNoExists)
			content += obj.deliveryStatus;
		content += '</td></tr>' + '</tbody></table>';
	}

	if (obj.portalOrderType == orderTypeWarehouseOrders && deliveryList != null
			&& deliveryList != "" && deliveryList.length > 0) {

		content += '<table cellspacing="0" class="ContentTable" width="100%">'
				+ '<tbody><tr><td class="keyInfo" width="20%">Delivery Status:</td>'
				+ '<td class="valueInfo" width="15%">';
		if (somOrderNoExists && deliveryList.length > 1) {
			for ( var i = 1; i < deliveryList.length; i++) {
				content += deliveryList[i].delievryNo.replace(/^0+/, '');
				if (i != deliveryList.length - 1)
					content += ',';
			}
		} else if (deliveryList.length == 1 && somOrderNoExists)
			content += obj.deliveryStatus;
		else
			content += obj.deliveryStatus;
		content += '</td><td class="lastColumn" width="65%"><label class="linkBtn">'
				+ '<a class="more" id="section-'
				+ selectedId
				+ '-moreDetails">+ more </a>'
				+ '<a class="more less hideBlock" id="section-'
				+ selectedId
				+ '-lessDetails">- less </a>'
				+ '</label></td></tr>'
				+ '</tbody></table>';

		content += '<table cellspacing="0" class="ContentTable hideBlock" width="100%" id="deliveryStatusDetails'
				+ selectedId + '">' + '<tbody>' + '</tbody></table>';
	}

	return content;
}

function formItemHdr(orderList) {

	var content = '<div class="ContentTableWrapper"><div class="tableInfo"><div class="tableTitle">'
			+ '<h4 class="sectionTitle">List of Articles</h4></div> <!-- End of table title -->'
			+ '</div> <!-- End of table info --><div id="itemTabs" class="filterTabs ui-tabs ui-widget ui-widget-content ui-corner-all">'
			+ '<ul>'
			+ '<li class="allTab"><a href="#tabs-all" >All (100)</a></li>'
			+ '<li class"unSupTab"><a href="#tabs-unsup" >Unsupplied (10)</a></li>'
			+ '<li class="filterMenu '
			+ securityGrs
			+ '"><div class="filterMenuOptions"><label class="filterTitle">Received / Amended in GR:</label>'
			+ '<select class="selectOptions grnSelect">'
			+ '</select><label class="actionBtn" id="showFilterResult">Go</label></div> <!-- End of filter menu options -->'
			+ '</li></ul><div id="tabs-all">'
			+ '<table cellspacing="0" class="ContentTable treetable drilldownTable" id="treetable"></table>'
			+ '</div> <!-- End of tabs -1 -->'
			+ '<div id="tabs-unsup" >'
			+ '<table cellspacing="0" class="ContentTable"></table></div> <!-- End of tabs - 2 -->'
			+ '<div id="filterResult" class="hideBlock ui-tabs-panel"></div> <!-- End of tabs --></div>';

	return content;
}

function formItemHdrForSeg(orderList, j) {
	var content = '<div class="ContentTableWrapper segArtList'
			+ j
			+ '"><div class="tableInfo headingFix"><div class="tableTitle">'
			+ '<h4 class="sectionTitle">List of Articles</h4></div> <!-- End of table title -->'
			+ '</div> <!-- End of table info -->'
			+ '<table cellspacing="0" class="ContentTable treetable drilldownTable deliveryTbls-'
			+ j + '" id="treetable">' + segListArticles(orderList) + '</table>'
			// +'<table cellspacing="0"
			// class="ContentTable">'+formUnsuppItemList(orderList)+'</table>'
			+ '</div>';

	return content;
}

function formAllItemList(orderList) {/*
										 * //<th width="15px"><span
										 * class="indenter"><a href="#"
										 * title="Expand All" class="expandAll"
										 * id="expandAll">&nbsp;</a>' //+'<a
										 * href="#" title="Collapse All"
										 * class="collapseAll hideBlock"
										 * id="collapseAll">&nbsp;</a></span></th>
										 * var allTblContent='<tr ><th>Article #</th><th>Description</th>' +'<th>Vendor
										 * Ref. #</th><th class="numberColumn">Order
										 * Qty.</th><th class="numberColumn">Dispatch
										 * Qty.</th>' +'<th class="numberColumn lastColumn">Received
										 * Qty.</th></tr>'; if (orderList !=
										 * null) {
										 * 
										 * for(var j=0;j<orderList.length;j++){
										 * if((null != orderList[j].orderQty &&
										 * orderList[j].orderQty!="") && (null !=
										 * orderList[j].receivedQty &&
										 * orderList[j].receivedQty !="")) {
										 * for(var k=j;k<orderList.length;k++){
										 * if((null != orderList[k].orderQty &&
										 * orderList[k].orderQty!="") && (null !=
										 * orderList[k].receivedQty &&
										 * orderList[k].receivedQty!="")) { var
										 * inner=Math.abs(Number(orderList[k].orderQty)-Number(orderList[k].receivedQty));
										 * var
										 * outter=Math.abs(Number(orderList[j].orderQty)-Number(orderList[j].receivedQty));
										 * if(outter<inner){ var
										 * temp=orderList[j];
										 * orderList[j]=orderList[k];
										 * orderList[k]=temp; } } } } } var list =
										 * orderList; for ( var i = 0; i <
										 * list.length; i++) { //<td><span
										 * class="indenter" style="padding-left:
										 * 0px;"><a href="#"
										 * title="Expand">&nbsp;</a></span></td>
										 * allTblContent += '<tr data-tt-id="1" class="collapsed allItem">' +'<td>'+list[i].article.replace(/^0+/,
										 * '')+'</td>' +'<td>'+list[i].articleDesc+'</td>' +'<td>'+list[i].vendorRefNo.replace(/^0+/,
										 * '')+'</td>' +'<td class="numberColumn">'+list[i].orderQty+'
										 * '+list[i].orderUOM+'</td>' +'<td class="numberColumn">'+list[i].dispatchedQty+'
										 * '+list[i].dispatchedQtyUOM+'</td>' +'<td class="lastColumn numberColumn">'+list[i].receivedQty+'
										 * '+list[i].receivedQtyUOM+'</td>' +'</tr>' +'<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span
										 * class="indenter"></span><table
										 * cellspacing="0" class="ContentTable"
										 * width="100%">' +'<tbody><tr><td class="keyInfo" width="20%">Unsupplied
										 * Quantity:</td><td class="valueInfo">##</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
										 * +'##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated
										 * Quantity:</td>' +'<td class="valueInfo">##</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';
										 *  } } return allTblContent;
										 */

	// <th width="15px"><span class="indenter"><a href="#" title="Expand All"
	// class="expandAll" id="expandAll">&nbsp;</a>'
	// +'<a href="#" title="Collapse All" class="collapseAll hideBlock"
	// id="collapseAll">&nbsp;</a></span></th>
	var allTblContent = '<tr ><th>Article #</th><th>Description</th>'
			+ '<th>Vendor Ref. #</th><th class="numberColumn">Order Qty.</th><th class="numberColumn">Order Multiple (OM)</th>'
			+ '<th class="numberColumn">Dispatch Qty.</th>'
			+ '<th class="numberColumn ">Received Qty.</th><th class="numberColumn">Total Units Received</th></tr>';
	if (orderList != null) {
		for ( var j = 0; j < orderList.length; j++) {
			if ((null != orderList[j].orderQty && orderList[j].orderQty != "")
					&& (null != orderList[j].receivedQty && orderList[j].receivedQty != "")) {
				for ( var k = j; k < orderList.length; k++) {
					if ((null != orderList[k].orderQty && orderList[k].orderQty != "")
							&& (null != orderList[k].receivedQty && orderList[k].receivedQty != "")) {
						var inner = Math.abs(Number(orderList[k].orderQty)
								- Number(orderList[k].receivedQty));
						var outter = Math.abs(Number(orderList[j].orderQty)
								- Number(orderList[j].receivedQty));
						if (outter < inner) {
							var temp = orderList[j];
							orderList[j] = orderList[k];
							orderList[k] = temp;
						}
					}
				}
			}
		}
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			// <td><span class="indenter" style="padding-left: 0px;"><a href="#"
			// title="Expand">&nbsp;</a></span></td>
			allTblContent += '<tr data-tt-id="1" class="collapsed allItem">'
					+ '<td>'
					+ list[i].article.replace(/^0+/, '')
					+ '</td>'
					+ '<td>'
					+ list[i].articleDesc
					+ '</td>'
					+ '<td>'
					+ list[i].vendorRefNo.replace(/^0+/, '')
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].orderQty
					+ ' '
					+ list[i].orderUOM
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].packSize
					+ ' '
					+ list[i].totUnitsUom
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].dispatchedQty
					+ ' '
					+ list[i].dispatchedQtyUOM
					+ '</td>'
					+ '<td class=" numberColumn">'
					+ list[i].receivedQty
					+ ' '
					+ list[i].receivedQtyUOM
					+ '</td>'
					+ '<td class="lastColumn numberColumn">'
					+ list[i].totPackSizeQtyRcvd
					+ ' '
					+ list[i].totPackSizeQtyUom
					+ '</td>'
					+ '</tr>'
					+ '<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span class="indenter"></span><table cellspacing="0" class="ContentTable" width="100%">'
					+ '<tbody><tr><td class="keyInfo" width="20%">Unsupplied Quantity:</td><td class="valueInfo">##</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
					+ '##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated Quantity:</td>'
					+ '<td class="valueInfo">##</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';

		}
	}
	return allTblContent;

}
function segListArticles(orderList) {

	var allTblContent = '<tbody><tr><!--<th width="15px"><span class="indenter">'
			+ '<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>'
			+ '<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>'
			+ '</span></th>--><th>Article #</th><th>Description</th>'
			+ '<th>Vendor Ref. #</th><th class="numberColumn">Order Qty.</th><th class="numberColumn">Order Multiple (OM)</th>'
			+ '<th class="numberColumn">Dispatch Qty.</th>'
			+ '<th class="numberColumn ">Received Qty.</th><th class="numberColumn">Total Units Received</th></tr>';
	if (orderList != null) {
		for ( var j = 0; j < orderList.length; j++) {
			if ((null != orderList[j].orderQty && orderList[j].orderQty != "")
					&& (null != orderList[j].receivedQty && orderList[j].receivedQty != "")) {
				for ( var k = j; k < orderList.length; k++) {
					if ((null != orderList[k].orderQty && orderList[k].orderQty != "")
							&& (null != orderList[k].receivedQty && orderList[k].receivedQty != "")) {
						var inner = Math.abs(Number(orderList[k].orderQty)
								- Number(orderList[k].receivedQty));
						var outter = Math.abs(Number(orderList[j].orderQty)
								- Number(orderList[j].receivedQty));
						if (outter < inner) {
							var temp = orderList[j];
							orderList[j] = orderList[k];
							orderList[k] = temp;
						}
					}
				}
			}
		}
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {

			allTblContent += '<tr data-tt-id="1" class="collapsed allItem">'
					+ '<!--<td><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>-->'
					+ '<td>'
					+ list[i].article.replace(/^0+/, '')
					+ '</td>'
					+ '<td>'
					+ list[i].articleDesc
					+ '</td>'
					+ '<td>'
					+ list[i].vendorRefNo.replace(/^0+/, '')
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].orderQty
					+ ' '
					+ list[i].orderUOM
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].packSize
					+ ' '
					+ list[i].totUnitsUom
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].dispatchedQty
					+ ' '
					+ list[i].dispatchedQtyUOM
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].receivedQty/* +' '+list[i].receivedQtyUOM */
					+ '</td>'
					+ '<td class="lastColumn numberColumn">'
					+ list[i].totPackSizeQtyRcvd
					+ ' '
					+ list[i].totPackSizeQtyUom
					+ '</td>'
					+ '</tr>'
					+ '<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span class="indenter"></span><table cellspacing="0" class="ContentTable" width="100%">'
					+ '<tbody><tr><td class="keyInfo" width="20%">Unsupplied Quantity:</td><td class="valueInfo">'
					+ list[i].unSuppliedQty
					+ '</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
					+ '##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated Quantity:</td>'
					+ '<td class="valueInfo">'
					+ list[i].allocatedQty
					+ '</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';

		}
	}
	return allTblContent;

}
function formUnsuppItemList(orderList) {

	var flag = false;
	var unsuppliedTblContent = '<tr ><th rowspan="2">Article #</th>	<th rowspan="2" class="columnDivider">Description</th><th colspan="2" class="columnDivider centerValue">Order</th>'
			+ '<th colspan="2" class="columnDivider centerValue">Allocation Sent</th><th colspan="2" class="columnDivider centerValue">PICK Request</th>'
			+ '<th colspan="2" class="columnDivider centerValue">Received</th><th colspan="2" class="centerValue lastColumn">Unsupplied</th></tr><tr class="subHeader">'
			+ '<th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th><th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th>'
			+ '<th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th><th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th>'
			+ '<th class="centerValue">Difference</th><!--<th class="lastColumn">Reason</th>--></tr>';
	if (orderList != null) {
		for ( var j = 0; j < orderList.length; j++) {
			if ((null != orderList[j].orderQty && orderList[j].orderQty != "")
					&& (null != orderList[j].receivedQty && orderList[j].receivedQty != "")) {
				for ( var k = j; k < orderList.length; k++) {
					if ((null != orderList[k].orderQty && orderList[k].orderQty != "")
							&& (null != orderList[k].receivedQty && orderList[k].receivedQty != "")) {
						var inner = Math.abs(Number(orderList[k].orderQty)
								- Number(orderList[k].receivedQty));
						var outter = Math.abs(Number(orderList[j].orderQty)
								- Number(orderList[j].receivedQty));
						if (outter < inner) {
							var temp = orderList[j];
							orderList[j] = orderList[k];
							orderList[k] = temp;
						}
					}
				}
			}
		}
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			if (list[i].unSuppliedQty != null
					&& list[i].unSuppliedQty.trim() != ''
					&& parseInt(list[i].unSuppliedQty.trim()) != 0) {

				list[i].orderUOM = (list[i].orderUOM != null && list[i].orderUOM != undefined) ? (list[i].orderUOM)
						: '';
				list[i].orderQty = (list[i].orderQty != null && list[i].orderQty != undefined) ? (list[i].orderQty)
						: '';
				list[i].allocatedQtyUOM = (list[i].allocatedQtyUOM != null && list[i].allocatedQtyUOM != undefined) ? (list[i].allocatedQtyUOM)
						: '';
				list[i].allocatedQty = (list[i].allocatedQty != null && list[i].allocatedQty != undefined) ? list[i].allocatedQty
						: '';
				list[i].pickReqUOM = (list[i].pickReqUOM != null && list[i].pickReqUOM != undefined) ? (list[i].pickReqUOM)
						: '';
				list[i].packReqQty = (list[i].packReqQty != null && list[i].packReqQty != undefined) ? (list[i].packReqQty)
						: '';
				list[i].receivedQtyUOM = (list[i].receivedQtyUOM != null && list[i].receivedQtyUOM != undefined) ? (list[i].receivedQtyUOM)
						: '';
				list[i].receivedQty = (list[i].receivedQty != null && list[i].receivedQty != undefined) ? (list[i].receivedQty)
						: '';
				list[i].unsuppliedDiff = (list[i].unsuppliedDiff != null && list[i].unsuppliedDiff != undefined) ? (list[i].unsuppliedDiff)
						: '';
				list[i].unsuppliedReason = (list[i].unsuppliedReason != null && list[i].unsuppliedReason != undefined) ? (list[i].unsuppliedReason)
						: '';
				unsuppliedTblContent += '<tr class="lastRow unSuppItem">'
						+ '<td>'
						+ list[i].article.replace(/^0+/, '')
						+ '</td><td class="columnDivider">'
						+ list[i].articleDesc
						+ '</td><td class="numberColumn">'
						+ list[i].orderUOM
						+ '</td><td class="columnDivider numberColumn">'
						+ list[i].orderQty
						+ '</td>'
						+ '<td class="numberColumn">'
						+ list[i].allocatedQtyUOM
						+ '</td><td class="columnDivider numberColumn">'
						+ list[i].allocatedQty
						+ '</td>'
						+ '<td class="numberColumn">'
						+ list[i].pickReqUOM
						+ '</td><td class="columnDivider numberColumn">'
						+ list[i].packReqQty
						+ '</td><td class="numberColumn">'
						+ list[i].receivedQtyUOM
						+ '</td><td class="columnDivider numberColumn">'
						+ list[i].receivedQty
						+ '</td><td class="centerValue valueInfo">'
						+ list[i].unSuppliedQty
						+ '</td><!--<td class="lastColumn">'
						+ list[i].unsuppliedReason + '</td>--></tr>';
				flag = true;
			}
		}
	}
	if (flag)
		return unsuppliedTblContent;
	else
		return '';
}

function bindOrderDtlContent(orderHd, tabHeader, tabSection, itemAllList,
		itemUnsuList, grSelect, currentTab, itemInfo) {
	$('.tabbedOrderDetail .articleHead .articleHeaderWrapper').html('').html(
			orderHd);
	// $('.sectionTabs ul').html('').html(tabHeader);
	$('.detailsSections').html('').append(tabHeader + tabSection + '</div>');
	$('.sectionTabs').tabs();
	$('.contentWrapper.orders').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').removeClass('hideBlock');
	$('.articleHead').removeClass('hideBlock');
	$('#tabs-all #treetable').html('').html(itemAllList);
	$('.deliveryTbls').html('').html(itemAllList);
	$('#tabs-unsup .ContentTable').html('').html(itemUnsuList);
	$('#itemTabs').tabs();
	// $('.allTab').text('All ('+$('.allItem').length+')');
	$('li[aria-controls="tabs-all"] a').text(
			'All (' + $('#tabs-all .allItem').length + ')');
	if ($('#tabs-unsup .unSuppItem').length == 0) {
		$('li[aria-controls="tabs-unsup"] ').addClass('hideBlock');
		$('li[aria-controls="tabs-unsup"] a').text(
				'Over / Under Supply (' + $('#tabs-unsup .unSuppItem').length
						+ ')');
	} else {
		$('li[aria-controls="tabs-unsup"] a').text(
				'Over / Under Supply (' + $('#tabs-unsup .unSuppItem').length
						+ ')');
	}
	if (!((commonOrder.orderStatus != 'RECEIVED' && commonOrder.orderStatus == 'PARTIALLY RECEIVED') || (commonOrder.orderStatus == 'RECEIVED' && commonOrder.orderStatus != 'PARTIALLY RECEIVED')))
		$('.filterMenuOptions').addClass('hideBlock');
	$('.grnSelect').html('').html(grSelect);
	$('.enq').addClass('hideBlock');
	$('.dtl').removeClass('hideBlock');
	$("#sections").tabs("option", "active", currentTab - 1);
	$('.totalArticle').text(itemInfo.data.length);
	// setTimeout(function(){$( "#sections" ).tabs( "option",
	// "active",currentTab);},500);
	$(".selectDropdown").click(function() {
		if ($('.selectDropdown').hasClass('active')) {
			$(".selectDropdown").removeClass('active');
			$(".selectDropdown .dropdown").css('opacity', '0');
		} else {
			$(".selectDropdown").addClass('active');
			$(".selectDropdown .dropdown").css('opacity', '1');
		}
	});
	$('.selectDropdown').css('padding-right', '10px');

	$('#showFilterResult')
			.click(
					function() {
						var grNo = $('.grnSelect').val();
						var year = ($('.' + $('.grnSelect').val()).attr('id') != undefined ? ($(
								'.' + $('.grnSelect').val()).attr('id').split(
								'-').length > 0 ? $('.' + $('.grnSelect').val())
								.attr('id').split('-')[1].trim()
								: '')
								: '');
						var data = {
							grNo : grNo,
							year : year
						};
						if ($('.grnSelect').val() == 'All') {
							$('#itemTabs').tabs("option", "active", 0);
							// $('#tabs-all').addClass('ui-tabs-active').addClass('ui-state-active');
							hideFilteredArticle();
						} else {
							getGrAtricles(data);
						}
					});
	$('li[aria-controls="tabs-all"],li[aria-controls="tabs-unsup"]').click(
			function(e) {
				$(this).addClass('ui-tabs-active');
				hideFilteredArticle(e);
			});
	$('.vendoerClaim').click(function() {
		$("#vendorAuthNo").val("");
		$("#dialog-modal-autho").dialog("open");
	});
	$('.varianceRpt').click(function() {
		getWarehouseVariance(commonOrder.orderNo);
	});
	$(".ui-tabs-anchor")
			.click(
					function() {
						var selectedId = $(this).attr("href").split('-')[1];
						if ($('#section-' + selectedId + ' .filterTabs ').length == 0) {
							if (!isNaN(selectedId)) {
								var segDeliveryNo = $(
										'.segmentNo-' + selectedId).text()
										.split(':')[1].trim();
								if ($(
										'#section-' + selectedId
												+ ' .segArtList' + selectedId)
										.html() == undefined) {
									$
											.ajax({
												type : "GET",
												url : "getOrderItemDetails.htm",
												beforeSend : function() {
													startLoading();
												},
												data : {
													orderNo : segDeliveryNo
												},
												success : function(response) {
													var output = $
															.parseJSON(response);
													var segOrderList = output.data;
													segmentOrderList = segOrderList;
													var listOfArticleHTML = formItemHdrForSeg(
															segOrderList,
															selectedId);
													$(
															'#section-'
																	+ selectedId
																	+ ' .filterTabs ')
															.remove();
													$(listOfArticleHTML)
															.insertAfter(
																	'#section-'
																			+ selectedId
																			+ ' .articleContentInner');

													$('#itemTabs').tabs();
													stopLoading();
												},
											});
								}

							}
						}
					});
}
function hideFilteredArticle() {
	$('#filterResult').addClass('hideBlock');
	$('#tabs-all .treetable').removeClass('hideBlock');
	$('#tabs-all .treetable').removeClass('hideBlock');
	$('#tabs-unsup .ContentTable').removeClass('hideBlock');
	// $('#itemTabs .ui-tabs-active').attr("tabindex", "-1");;
	$('#itemTabs .ui-tabs-active').addClass('ui-tabs-active ui-state-active');

	// $('#itemTabs .ui-tabs-panel').css("display","none");
}
function getGrAtricles(data) {
	$.ajax({
		type : "get",
		url : "../allocation/getGrAtricles.htm",
		data : data,
		beforeSend : function() {
			startLoading();
			// hideOrderTbl();
		},
		success : function(response) {

			output = $.parseJSON(response);

			orderList = output.data;

			msg = output.msg;

			if (msg != undefined && msg != '' && !isNaN(msg)
					&& orderList != null) {
				formGrArticles(orderList);
				// count=orderList[0].msg.trim();
				showFilteredArticle();
				// commonOrderList=orderList;
				// bindAllocationContent();
				//bindOrdersScroll();
			} else {
				if (msg == 'null')
					showError('Service Unavailable.');
				else
					showError(msg);
				bindOrdersScroll();
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
}
function showFilteredArticle() {
	$('#filterResult').removeClass('hideBlock');
	$('#tabs-all .treetable').addClass('hideBlock');
	$('#tabs-all .treetable').addClass('hideBlock');
	$('#tabs-unsup .ContentTable').addClass('hideBlock');
	$('#itemTabs .ui-tabs-active').attr("tabindex", "-1");
	;
	$('#itemTabs .ui-tabs-active')
			.removeClass('ui-tabs-active ui-state-active');
	//$('#itemTabs .ui-tabs-panel').css("display","none");
}
function formGrArticles(orderList) {

	var content = '<div class="ContentTableWrapper">'
			+ '<table cellspacing="0" class="sortTable ContentTable  contentRow" id="">'
			+ ' <thead><tr>' + '<th class="">Article #</th>'
			+ '<th class="">Description</th>'
			+ '<th class="centerValue header">Vendor Ref.#</th>'
			+ '<th class="numberColumn">Received Qty.</th>'
			+ '<th class="numberColumn">Order Multiple (OM)</th>'
			+ '<th class="numberColumn">Cost $ per OM</th>'
			+ '<th class="numberColumn">Total Units</th>'
			+ '<th class="numberColumn">Total Cost $</th>' + '</tr></thead>';

	if (orderList != null) {

		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			content += '<tr data-tt-id="1" class="collapsed allItem">' + '<td>'
					+ list[i].article.replace(/^0+/, '') + '</td>' + '<td>'
					+ list[i].articleDesc + '</td>' + '<td>'
					+ list[i].vendorRefNo.replace(/^0+/, '') + '</td>'
					+ '<td class="numberColumn">' + list[i].receivedQty + ' '
					+ list[i].receivedQtyUom + '</td>'
					+ '<td class="numberColumn">' + list[i].packSize + ' '
					+ list[i].totPackSizeQtyUom + '</td>'
					+ '<td class=" numberColumn">' + list[i].packSizeCost
					+ '</td>' + '<td class=" numberColumn">'
					+ list[i].totPackSizeQtyRcvd + ' ' + list[i].totalUnitsUom
					+ '</td>' + '<td class="lastColumn numberColumn">'
					+ list[i].totCostRcvd + '</td>' + '</tr>';
		}

		content += '</table></div>';
		//}
	}
	$('#filterResult').html('');
	$('#filterResult').html(content);
	//bindOrderContent();
}
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}
function saveAuthNo(data) {

	//var data = $('#orderEnq').serialize();

	$.ajax({
		type : "post",
		url : "../allocation/saveVendorClaimAuth.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

			if (response == 'true') {
				showAlert(
						'Vendor claim authority number updated successfully.',
						'vendorAuthNo');
				$('#headervendorAutho').text($('#vendorAuthNo').val().trim());
				$('.vendorClaim ').removeClass('hideBlock');
				$("#dialog-modal-autho").dialog("close");
			} else {
				showAlert(response, 'vendorAuthNo');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
};

function getWarehouseVariance(orderNo) {

	//var data = $('#orderEnq').serialize();

	$.ajax({
		type : "get",
		url : "../allocation/varianceOnPageLoad.htm",
		data : "",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			var option = $("<h4>").html(response).find("#whvReport");
			if (option != '' && option != undefined) {
				showVarianceContent(option, orderNo);

			} else {
				showAlert('Cannot load Warehose variance report.',
						'vendorAuthNo');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
};
function showVarianceContent(option, orderNo) {
	$('.contentWrapper.order').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').after().find('#whvReport').remove();
	$(option).insertAfter('.contentWrapper.tabbedOrderDetail');
	$('.vari,dtl').removeClass('hideBlock');
	$('.currentPage.dtl').addClass('hideBlock');
	$('head').find('.wareHouseJS');
	$("head")
			.append(
					'<script class="wareHouseJS" type="text/javascript" src="../../scripts/wareHouseVarianceReport.js"></script>');
	//setTimeout(function(){$('.formWrapper input[name="orderNo"] :first').val(orderNo).focus();},500);
	$('#orderNo').val(orderNo);
	$('.formWrapper input[name="orderNo"] :first').val(orderNo).focus();
};
function showAlert(msg, id) {
	$('#alertBox').text(msg);
	$('#dialog-alertBox').parent().find('.ui-dialog-title').text(
			'Order Enquiry');
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
function formStoreContent(obj) {
	content = '<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tr><td class="keyInfo" width="20%">'
			+ 'Receiving Store:</td><td class="valueInfo" width="15%">'
			+ obj.receivingStore
			+ '</td><td class="keyInfo" width="15%">Sending Store:</td>'
			+ '<td class="valueInfo" width="15%">'
			+ obj.ventorNo.replace(/^0+/, '')
			+ '</td><td class="keyInfo" width="15%"><!--Value ($):--></td><td class="valueInfo lastColumn"></td></tr></table></div>';

	return content;
}

/*-------- SC-608 changes - Begin-------*/

function navigateToNGBOOrderDetail(orderNo)
{
	var param =  new orderParam('',orderNo,'','','','','','','','');
	getOrderBasicDetails(param);	
}

/* ------- SC-608 chnages - End----------*/