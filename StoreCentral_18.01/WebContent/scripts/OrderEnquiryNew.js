﻿﻿var salesOrg = '';
var departmentList = '';
var departmentMap = {};
var allocaMap = {};
var allocaList = [];
var siteNo ='';
var errors = [];
var warehouseMap= {};
var itemInfo = [];
var era_prof='';
var auditFlag='';
var consignmentFlag='';
var supp_invalid_msg ='Invalid supplier.';
var datInvalid = 'Invalid date';
var enter_supp_msg = 'Please fill supplier field.';
var homeLink = '../login/homepage.htm';
var stockTransferLink='../stockTransfer/stockTransferOnPageLoad.htm';
var enter_search_msg = 'Please enter either order number/Article details/delivery date.';
var invalid_del_from_msg ='Please enter a valid delivery from date.';
var invalid_del_to_msg = 'Please enter a valid delivery to date.';
var enter_del_from_msg = 'Please enter a delivery from date.';
var enter_del_to_msg = 'Please enter a delivery to date.';
var supp_invalid_msg ='Invalid supplier.';
var enter_date_valid_msg = 'Please enter a valid delivery date in dd/mm/yyyy format.';
var enter_date_range_msg = 'Delivery from date should not be greater than to date.';
var warehouse_msg = 'Please select warehouse from dropDown.';
var supplier_msg = 'Please specify a vendor.';
var select_dept = 'Please Select a Department From dropdown.';
var verify_supp = 'Please click on "verify" before lookup the article.';
var nodata = 'Sorry , no results found for the search criteria. Please try again.';
var claimMsg = 'Please enter a valid Vendor Claim Authorization number.';
var printMsg='Do you want to Print?';
var orderRealsedMsg = 'Current order has been released. Do you want to create as a new order?';
var onload = 'onload';
var onsearch = 'onsearch';
var FULLY_RECEIVED = 'FULLY_RECEIVED';
var READY_TO_RECEIVE = 'READY_TO_RECEIVE';
var OPEN_ORDERS = 'OPEN_ORDERS';
var NOTIF = 'NOTIF';
var OVERDUE = 'OVERDUE';
var loaded = 'loaded';
var inProgress='Receiving in Progress';
var over_due_title = 'List of Overdue orders';
var over_due_name = 'over_due_tbl';
var ready_to_title = 'List of Authorised and Dispatched orders';
var ready_to_name = 'ready_to_tbl';
var over_due_tab ='over-due-tab-link';
var fully_rece_tab ='fully-rece-tab-link';
var ready_to_rec_tab ='ready-rece-tab-link';
var open_ord_tab ='open-tab-link';
var noti_ord_tab ='noti-tab-link';
var alloc_ord_tab ='alloc-tab-link';
var create_ord_tab ='create-tab-link';
var maxAutoResult = 10;
var article ='article';
var sub ='SUBMITTED';
var articleSearchKey = 'article';
var maxDateRang =28;
var userId = '';
var selectedArticle ='';
var allocation ='alloc';
var orderUpdate ='orderU';
var expanded = 'expanded';
var collapsed = 'collapsed';
var vendorTextBox;
var isVendorChecked;
var submitAll ='submitAll';
var submit = 'submit';
var claimAuth= 'vendorClaim';
var orderOnReceipt ='orderOnReceipt';
var cancelSTOutt = 'cancelSTOut';
var purchaseOrderUpdate = 'purchaseOrderUpdate';
var openStautus = 'OPEN';
var submitStatus = 'SUBMITTED';
var authStatus = 'AUTHORISED';
var receStatus = 'RECEIVED';
var cancelStatus = 'CANCELLED';
var partialStatus = 'PARTIALLY RECEIVED';
var diapatchStatus = 'DISPATCHED';
var source_flag = '';
var fromCreate = '';
var poType = 'VENDOR';
var stoType = 'WAREHOUSE';
var stType = 'STOCK TRANSFER';
var EnterVendorClaimAuthorityNumber = 'AC_EVCA';
var order= 'enq';
var detail= 'dtl';
var receive= 'rec';
var update= 'upd';
var curStatus='';
var removMsg = 'Are you sure you want to remove the item?';
var orderSucceUpdateMsg = 'Order updated Successfully.';//Please view after 15 minutes as it takes time to Transmit.'; Fix for defect no 1305
var orderReceUpdate = 'Order updated Successfully.';
var qtyMsg = 'Please fill the quantity.';
var articleNoMandMsg = 'Please enter article number or description.';
var cancelMsg ='Are you sure you want to exit?';
var redirectMsg='More than '+maxDateRang+' days of orders have been requested. This may take additional time to search.';//defect 2505 
var saveMsg ='Are you sure you want to save the changes?';
var cancelOrderMsg ='Are you sure you want to cancel the order?';
var checkAlloc = 'allocation';
var grSelectMsg = 'Please select a GR Number from the dropdown';
var sugo = 'SUGO';
var emergency = 'EMERGENCY';
var over_under_lay_dialog = '<div id="dialog-over-under-lay" title="Underlay / Overlay Articles" class="visible-hide"><div class="popupContent"><div id="pop-up-cont" class="ContentTableWrapper"></div><div class="popupActionsWrapper"><span class="popupActions"><label class="actionBtn" onclick="$(\'#dialog-over-under-lay\').dialog(\'close\')"><a>OK</a></label></span></div></div></div>';
var over_under_supp_dialog = '<div id="dialog-over-under-supply" title="Under / Over Supply" class="visible-hide"><div class="popupContent"><div id="pop-up-cont" class="ContentTableWrapper"></div><div class="popupActionsWrapper"><span class="popupActions"><label onclick="$(\'#dialog-over-under-supply\').dialog(\'close\')" class="actionBtn"><a>OK</a></label></span></div></div></div>';
var extraAction = '<div class="tableActionsExtra"><span><input type="checkbox" id="changeOmExpDate"><label for="changeOmExpDate">Change order multiple and input expiry date</label></span></div>';
var recei_session = '<div id="receive-session" title="Receiving"><div class="popupContent"><div class="popupData popupTitle" id="message_title"></div><div class="popupActionsWrapper ">'
	+'<span class="popupActions"><label id="yes" class="actionBtn"><a>Accept</a></label><label id="no" class="actionBtn"><a>Reject</a></label></span></div></div></div>';
var updateQtyActionBtn = '<div class="pageActions updateMode" id="editDoneWrap"><label class="actionBtn" id="saveupdateQty_dwn"><a><label class="">Save</label></a></label><label class="secondaryActionBtn" id="cancelUpdateQty_dwn"><a>Cancel</a></label></div>';
var up_qty_cont_wrap = '<div class="ContentTableWrapper  updateContentTableWrap updateMode" id="updateQtyContentWrap"></div>';
var receiveInFull_dataObj;
var receiveInFull_asnNo;
var receiveInFull_sourceFlag;
var receiveInFull_orderNo;
var receiveInFull_retainSessionFlag;
var displayChkFlag=false;
//RECEIVING 
var recvItemInfo;
var recvItemInfo_zero;
var recvConfigMap = {};
var salesOrgConfigMap = {};
var commonOrder='';
var transInfo =[];
var fullObject='';
var seal_flag='';
var orderNoDtl;
var preqTypeSer = '';
var roasterNameSer = '';
var roasterDateSer = '';
var deliveryDateSer = '';
var purchaseReqSer = '';
var vendorConstrainFlag = '';
var componentData='';
var headerObj='';
var cpmntArticle = '';
var receivingFullFlag=false;
var stockTakeFlg = false;
var dialog_open_CmpntArticlesDisplay = '<div id="dialog-com-CmpntArticlesDisplay" title="Component Articles"><div class="popupContent "><div class="popupData contentWrapper "><div id="openCmpntArticlesDisplay"></div></div><div class="popupActionsWrapper"><span class="popupActions"><label onclick="$(\'#dialog-com-CmpntArticlesDisplay\').dialog(\'close\');" class="actionBtn displayComponentOk">OK</label></span></div></div></div>';
var receivePopupTitle = 'Receive Method';
var current_line_count = 0 ;
var temperatureDisableFlg = false;
var errorMsgUPQ = '';
var deliveryList = [];
var validateMethodMap = {
		'1' : 'validateStepOne',
		'2' : 'validateStepTwo',
		'3' : 'validateStepThree',
		'4' : 'validateStepFour',
		'5' : 'skipValidation'
	};
	var recvMethodOrderType = {
		'VENDOR' : 'PO',
		'WAREHOUSE' : 'STO',
		'STOCK TRANSFER' : 'IBTI'
	};
	var recvSuccessMsg = {
		'save' : 'Receiving Draft Details Saved Successfully',
		'submit' : 'Receiving Details Posted Successfully',
		'cancel' : 'Receiving Cancelled Successfully'
	};
	var recvTitle = {
		'save' : 'Save & Continue',
		'submit' : 'Submit',
		'cancel' : 'Cancel Receiving'
	};
var sugoFlag=false;
var manualExpand = 'manualExpand';
var autoexpanded = 'autoexpanded';
var recvSite ;
var containsNotRangedItem = 0;
var notRangedItem = false;
var isCostPriceShow=false;
var defaultMethod ='';
//R18.01 Defect_10319 - Fix
var ssccCartonOrdered = [];
var ssccCartonReceived = [];

//R18.01 Defect_12600 - Fix
var totalCartonsReceivedERA = 0;
var totalArticlesReceivedERA = 0;
var totalCartonsOrderedERA = 0;
var totalArticlesOrderedERA = 0;

var ineDGMSscreen = "false";

$(document).ready(function() {
	salesOrg = $('#salesOrg').val();
	siteNo = $('#posSite').val();
	userId = $('#loginUserId').val();
	getEncSAPPassword();
	$("#menu").menu({
	    position: {
	      my: "right top",
	      at: "right top+20"
	    }
	  });
	
	$('#mainBackBtn').click(function(event) {
		navigate($('#brudCrumCont .currentPage').attr('data_back'));
	});
	
	 $("#dialog-hierarchy").dialog({
		    autoOpen: false,
		    modal: true,
		    resizable: false,
		    minHeight: 200,
		    maxHeight: 600,
		    width: 800
	 });
	 
	 $("#dialog-modal-his").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 200,
			maxHeight : 600,
			width : 800
		});

		$("#dialog-modal-his").parent().addClass("popupWrapper");
	 
	 $("#dialog-verifySupplier").dialog({
		    autoOpen: false,
		    modal: true,
		    resizable: false,
		    minHeight: 120,
		    maxHeight: 600,
		    width: 865
		  });
	  $("#dialog-modal-autho-ngbo").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 150,
		maxHeight : 600,
		width : 430
	});
 
	 $("#dialog-sessionRCV").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 650
		});

	$("#dialog-modal-autho-ngbo, #dialog-sessionRCV").parent().addClass("popupWrapper");
	
	$( "#dialog-editSitePop" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 800
	});
	$("#dialog-editSitePop").parent().addClass("popupWrapper");
	

	$("#dialog-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 800,
		width : 515
	});

	$("#dialog-verify").parent().addClass("popupWrapper");
	
	//content += '<label class="actionBtn transferIbt" id="transferIbt-'+obj.order_no+'-O"><label class="notepad">Transfer</label></label>';
	//content += '<label class="actionBtn transferIbt" id="transferIbt-'+deliveryObj.delv_ref_no+'-D"><label class="notepad">Transfer</label></label>';
	 
	 $("#verifySupplier").click(function() {
			var errors = [];
			var $supplierElem =$('#supplier');
			var $advanceLink = $('#advLink1');
		    var vendorNo = $supplierElem.val().split('-')[0];
		    if (vendorNo != '') {
		    	vendorTextBox = $("#supplier");
		    	isVendorChecked =  $('#vendorCheck');
		    	getVendorLookup(vendorNo,vendorTextBox,isVendorChecked);
		    } else {
			    $advanceLink.trigger('click');
			    errors.push(enter_supp_msg);
			    showAllErrors(errors);
			    $supplierElem.focus();
		    }
	  });
	 $("#vendorPopUpGo").click(function() {
		 var $supplierElem = $('#vendorDesc');
		 var $messHoldElem = $('#error_div');
		 errors =[];
	    if ($supplierElem.val().trim() == '') {
	    	$messHoldElem.addClass('errorDiv');
	    	$messHoldElem.removeClass('warningMessage');
	    	$('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
	      	//$('.error-div').removeClass('hideBlock').text(enter_supp_msg);
	      	$('.verifyVendorContent').parent().addClass('hideBlock');
	      	errors.push(enter_supp_msg);
	        showAllErrors(errors);
	      $supplierElem.focus();
	    } else {
	      getVendorLookup($supplierElem.val(),vendorTextBox,isVendorChecked);
	    }
	  });
	 
	$("#fromDate").datepicker({ zIndex : 50, onClose: function( selectedDate ) { /*$( "#toDate" ).trigger('focus');*/ } }); 
	$("#toDate").datepicker({ zIndex : 50 }); 
	
	
	 $("#depH").click(function() {
		    if ($(this).is(':checked')) {
		      //$('#articleHierarchy').removeClass('hideBlock');
		      $("#dialog-hierarchy").parent().addClass("popupWrapper");
		      $("#dialog-hierarchy").dialog("open").removeClass('visible-hide');
		    } else {
		      $('#articleHierarchy').addClass('hideBlock');
		    }
	  });
	  $('#departmentInEnq').change(function(){
		  $("#depH").prop('checked',false);
	  });
	  $('#deptHieCancel').click(function() {
	    if ($('#departmentInEnq').val() == 'Select') {
	      $('#depH').prop('checked', false);
	    }
	    $("#dialog-hierarchy").dialog("close");
	  });
	  $('#deptHieSelect').click(function() {
	    $("#dialog-hierarchy").dialog("close");
	  });
	  
	  $('#warehouse').click(function() {
		    $("#warehouseField").removeClass('hideBlock');
		    $("#vendorField").addClass('hideBlock');
		    $("#allField").addClass('hideBlock');
		  });
	  $('#vendor').click(function() {
	    $("#vendorField").removeClass('hideBlock');
	    $("#warehouseField").addClass('hideBlock');
	    $("#allField").addClass('hideBlock');
	    $('#warehouseDrpdwn').val('');
	    $('#supplier').focus().val('');
	  });
	  $('#all').click(function() {
	    $("#allField").removeClass('hideBlock');
	    $("#warehouseField").addClass('hideBlock');
	    $("#vendorField").addClass('hideBlock');
	    $('#warehouseDrpdwn').val('');
	  });
	  
	  setTimeout(function() {
		    $('#orderNo').focus();
		  }, 300);
	  $("#advLink1").click(function() {
	    var scroll = $(window).scrollTop();
	    document.getElementById("advWrapper").style.marginTop = (($('#lookupContainer').height() - scroll) + "px");
	    document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
	    $("#advWrapper").css("height", "280px");
	    $("#advDiv").removeClass('advancedParam hideBlock');
	    $("#advDiv").addClass('advancedParam');
	    $("#advWrapper").removeClass('advancedSearchFormatWrapper hideBlock');
	    $("#advWrapper").addClass('advancedSearchFormatWrapper');
	    $("#closeLink").removeClass('linkBtn hideBlock');
	    $("#closeLink").addClass('linkBtn');
	    $("#advLink1").hide();
	    $("#value").val("");
	  });
	  $("#closeLink").click(function() {
	    closeAdvSearchClasses();
	  });
	  
	  $(window).scroll(function() {
	    closeAdvSearch();
	  });
	  $('.mainWrapper').click(function() {
	    closeAdvSearch();
	  });
	  $('#lookupContainer').click(function(event) {
	    event.stopPropagation();
	  });
	  $(".goButton").click(function() {
	    validateTheform();
	  });
	  $('#departmentInEnq').change(function() {
	    if (this.value != 'Select') {
	      $('input[name="departmentList"][value="' + this.value + '"]').trigger('click');
	    }
	    $('#articleHierarchy').addClass('hideBlock');
	  });

  $("#vendorVerify").val(false);
  
  $('.popupActions .actionBtn').click(function() {
		//clearAllErrors();
		
		$("#dialog-modal-his").dialog("close");
  }	);
  
  $(document).keypress(function(event) {
	 // $(".close").trigger('click');
	  event.stopPropagation();
	  if (event.which == 13) {
		if($('#add_table_open_item_tab').is(':visible')){
			/*if($('#src_vn_verify_btn_open_item_tab').is(':visible')){
				$('#src_vn_verify_btn_open_item_tab').trigger('click');
			}else*/ if($('#search_and_add_btn_open_item_tab').is(':visible')){
				$('#search_and_add_btn_open_item_tab').trigger('click');
			}
		}else if($('#dialog-verifySupplier').dialog('isOpen')){
			$('#vendorPopUpGo').trigger('click');
		} else if($('#supplier').is(':focus')){
			$('#verifySupplier').trigger('click');
		} else if ($('#searchBox').is(":focus") || $('#qty').is(":focus")) { // defect no 2505
			$('#myDrafts').find('#searchAndAdd').trigger('click');
		} else if ($('.popupActions').is(':visible')) {
			$('.popupActions').find('.actionBtn:visible:first').trigger('click');
		}else if($('#oor_articlesearchBox').is(":focus") || $('#oor_supplierSearchBox').is(":focus") 
				|| $('#oor_searchBox').is(":focus") ){
		}
		else{
			 validateTheform();
		}
	  }
  });
  ineDGMSscreen = $('#ineDGMSscreen').val();
  if(ineDGMSscreen=='false')
  populateDepartment();
  else
	  getSalesOrgConfigService();
  //filterAllocationContent();
  if($('.order-tabs')!=undefined && $('.order-tabs').length>0){
	  $('.order-tabs').bind('click',orderTabClickEvent);
  }
  orderSmart($('#orderNo'),$($('.goButton')[0]),($('#number').is(':checked') ? order : article),maxAutoResult,true);
  $(':radio[name="searchByOptions"]').change(function(){
	  var $elem = $('#orderNo');
	  $elem.val('').focus();
	  orderSmart($elem,$($('.goButton')[0]),($('#number').is(':checked') ? order : article),maxAutoResult,true);
  });
  if($('#description').is(':checked')){
	  console.log('checked');
  }

  $('#alloc-tab-link').click(function(){
	var $elem = $(this);
	$('#tabs').tabs('option','active',$elem.attr('tab_ind'));
	if(!($elem.hasClass(loaded))){		
			loadAllocService();		
	}
	});
  
  $('#create-tab-link').click(function(){
		var $creatLink =  $(this);
		if($creatLink.hasClass(loaded)){
			
		}else{
			loadCreateOrderContent();
			$creatLink.addClass(loaded);
		}
	});
  
  $("#saveVendorAuthNoInNGBO")
	.click(
			function(e) {
				$('#vendorClaimVal').val(
						$('#vendorAuthNoInNGBO').val());
				if ($('#vendorAuthNoInNGBO').val() == "") {
					$.fn.showCustomMsg([claimMsg],error,'Order Details');
					
				} else {
					var reqObj = $(this).data('obj');
						saveAuthNoInNGBO(reqObj);
				}
			});
  
  $("#cancelVendorAuthNoInNGBO").click(function(e) {
		$("#dialog-modal-autho-ngbo").dialog("close");
	});
  
  $('#fromDate,#toDate').change(function()
		  {
	 $(this).val(formateDate($(this).val()));
	  if($('#fromDate').val() != '' && $('#toDate').val() != '' && $('#fromDate').isValidDate() && $('#toDate').isValidDate())
		  {
	  var actFrom = $('.order').find('#fromDate').val();
	  var fromDate = $('.order').find('#fromDate').val().split('/');
	  var toDate = $('.order').find('#toDate').val().split('/');
	  var date1 = new Date(fromDate[1] + '/' + fromDate[0] + '/' + fromDate[2]);
	  var date2 = new Date();
	  date2.setDate(Number(toDate[0]));
	  date2.setMonth(Number(toDate[1]) - 1);
	  date2.setYear(Number(toDate[2]));
	  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	  //var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
	  var diffDays = diff(actFrom,getTodayDate());	  	 
	  if (diffDays > maxDateRang)
		  {
		  $('.departmentDiv > input, .departmentDiv > select').prop('disabled',true);
		  }
	  else
	  {
	  $('.departmentDiv > input, .departmentDiv > select').prop('disabled',false);
	  }
		  }
	  else
		  {
		  $('.departmentDiv > input, .departmentDiv > select').prop('disabled',false);
		  }
		  });
  		//getSalesOrgConfigService();  
});

function navigate(screen){
	if(ineDGMSscreen=='false')
	{
	var $content = $('.orderWrappers');
	var $brudCrum= $('#brudCrumCont .navigate');
	$content.addClass('hideBlock');$brudCrum.addClass('hideBlock');
	if(screen == order){
		curStatus = '';
		$('#orderLookUp').removeClass('hideBlock');
		$('#brud_order_lookup').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
	}else if(screen == detail){
		$('#order_detail').removeClass('hideBlock');
		$('#receive_order').addClass('hideBlock');
		$('#order_detail .listOfArticles').removeClass('hideBlock');
		$('#order_detail .mainOrderDetails').removeClass('hideBlock');
        $('.commonReceiveOrder').removeClass('hideBlock');
        $('.updateReceivedOrder').removeClass('hideBlock');                
		$('.orderStatus').removeClass('hideBlock');
		$('.receiveOrderStatus:visible').addClass('hideBlock');
		$('#brud_order_lookup').removeClass('hideBlock').removeClass('currentPage').addClass('cursor-pointer');
		$('#brud_order_detail').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
	}else if(screen == receive){
		$('#receive_order:visible').removeClass('hideBlock');
		$('#order_detail').addClass('hideBlock');
		$('#order_detail .listOfArticles').addClass('hideBlock');
		$('#order_detail .mainOrderDetails').addClass('hideBlock');
		$('#brud_order_lookup,#brud_order_detail').removeClass('hideBlock').removeClass('currentPage').addClass('cursor-pointer');
		$('#brud_receive_order').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
	}else if(screen == update){
		$('#update_order').removeClass('hideBlock');
		$('#brud_order_lookup,#brud_order_detail').removeClass('hideBlock').removeClass('currentPage').addClass('cursor-pointer');
		$('#brud_update_order').removeClass('hideBlock').removeClass('cursor-pointer').addClass('currentPage');
	}else{
		//if ($('#brud_order_lookup').is(':visible')) {
			window.location.replace(homeLink);
		//}
	}
}
	else
		{
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
	
}

// Related to supplier verify option
function getVendorLookup(vendor,from,toCheck,fromOrderOnReceipt) {
	
	  startLoading();
	  var param = { "iv_vendor": vendor, "iv_session_id": "" };
	  console.log(vendorLookupServiceURL + ' ' + JSON.stringify(param));
	  errors = [];
	  var $verifyPopup = $("#dialog-verifySupplier");
	  $.post(vendorLookupServiceURL, JSON.stringify(param)).done(function(data) {
	      if (data != undefined && data != null && data.length > 0 && data[0].vendor_no != undefined) {
	        var response = data;
	        var i = 1;
	        var cnt = 1;
	        var content = formVendorContent(response, vendor);
	        var $paginatioDiv = '';
	        var $supplierElem = $('#vendorDesc');
			var $messHoldElem = $('#error_div');
	        $('#popupDataDiv').html('').append(content);
	        var recCnt = response.length;
	        currentPageInPopup = 1;
	        $paginatioDiv = $('.paginationDivVerifyVendorPopup');
	        
	        if (recCnt > 9) {
	        	$paginatioDiv.removeClass('hideBlock').pagination({ 
	        	  items: recCnt,  
	        	  itemsOnPage: 9,  
	        	  cssStyle: 'compact-theme', 
	        	  currentPage: currentPageInPopup, 
	        	  onPageClick: function(pageNumber) {
	                getVendorsForPagination(pageNumber);
	              }
	            });
	        } else {
	        	$paginatioDiv.addClass('hideBlock');
	        }
	       
	        $('.verifyVendorContent tbody tr').each(function() {
	            $(this).attr('class', '');
	            $(this).addClass('verifyContentInPopUp').addClass('pagNo-' + cnt);
	            if (cnt > 1){ 
	            	$(this).addClass('hideBlock'); 
	            }
	            if (i % 9 == 0) {
	              cnt++;
	            }
	            i++;
	          });
	        if ($('#sizeCheck').val() == 0) {
	          if ($verifyPopup.dialog("isOpen")) {
	            $verifyPopup.dialog("close");
	          }
	          if ($verifyPopup.dialog("isOpen")) {
	        	 $messHoldElem.addClass('warningMessage').removeClass('errorDiv');
	            $('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
	            //$('.error-div').removeClass('hideBlock').text(supp_invalid_msg);
	            errors.push(supp_invalid_msg);
		        showAllErrors(errors);
	          } else {
	            errors.push(supp_invalid_msg);
	            from.focus();
	            showAllErrors(errors);
	          }
	        } else if ($('#sizeCheck').val() > 1) {
	          if (!$verifyPopup.dialog("isOpen")) {
	        	$supplierElem.val($('#supplier').val());
	            $verifyPopup.parent().addClass("popupWrapper");
	            $verifyPopup.dialog("open").removeClass('visible-hide');
	            $('.verifyVendorContent').parent().removeClass('hideBlock');
	            $("#searchWarning").addClass('hideBlock');
	            $("#popupSearchVendor").removeClass('hideBlock');
	            $messHoldElem.parent().parent().removeClass('warningMessage').removeClass('errorDiv');
	            $('#message-div,.paginationDivVerifyVendorPopup').removeClass('hideBlock');
	            $('.error-div').addClass('hideBlock');
	          }
	        } else {
	          from.val($("#suppNo0").text() + "-" + $("#suppName0").text());
	          toCheck.val(true);
	          if(fromOrderOnReceipt != undefined && fromOrderOnReceipt)
	        	  {
	        	  loadDraftOOR($("#suppNo0").text());
					lockSupplier({"supplier":$("#suppNo0").text(),"supplier_name":$("#suppName0").text()});
					$('#oor_viewModeTable').removeClass('hideBlock');
	        	  }
	          $verifyPopup.dialog("close");
	        }
	        bindVendorSelect(from,toCheck,fromOrderOnReceipt);
	      } else {
	        if ($verifyPopup.dialog("isOpen")) {
	          //$('#message-div').parent().parent().addClass('errorDiv').removeClass('warningMessage');
	          $('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
	          //$('.error-div').removeClass('hideBlock').text(supp_invalid_msg);
	          $('.verifyVendorContent').parent().addClass('hideBlock');
	          errors.push(supp_invalid_msg);
		      showAllErrors(errors);
	        } else {
	        	errors.push(supp_invalid_msg);
	            showAllErrors(errors);
	        }
	      }
	      stopLoading();
	    });
	}

function getVendorsForPagination(pageNo) {
	  currentPageInPopup = pageNo;
	  var pageClass = 'pagNo-' + pageNo;
	  $('.verifyContentInPopUp').filter(function() {
	      if ($(this).hasClass(pageClass)) { $(this).removeClass('hideBlock');}
	      else { $(this).addClass('hideBlock'); }
	    });
	}

function formVendorContent(list, text) {
	  var content = '';
	  var rowContent = '';
	  content += '<div class="popupSearchWrapper" id="error_div">';
	  content += '<div class="tableInfo "style="display: inline-block;float: left;"><h4 id="message-div">Total <strong>' + list.length + '</strong> results found for <strong class="searchString">"' + text + '"</strong>. Please select a vendor from the list below.</h4></div>' + '<h4 class="error-div"></h4>';
	  content += '<div class="paginationWrapper  paginationDivVerifyVendorPopup paginationDiv hideBlock" id="paginationDiv1">' + '<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>' + '</div></div></div><!-- End of search wrapper --></div>';
	  content += '<div class="ContentTableWrapper"><table class="ContentTable verifyVendorContent" cellspacing="0">' + '<thead><tr><th>Vendor #</th><th>Description</th><th>Phone Number</th><th>Fax Number</th>' + '<th>Suburb</th><th>State</th><th>Lead Time</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead><tbody>';
	  if (list != null && list != undefined && list.length > 0) {
	    for (var i = 0; i < list.length; i++) {
	      rowContent += '<tr><td class="pagNo-';
	      if (i > 9) rowContent += 'hideBlock';
	      rowContent += '" id="suppNo' + i + '">' + list[i].vendor_no + '</td><td id="suppName' + i + '">' + list[i].vendor_name + '</td><td>' + list[i].telephone + '</td><td>' + list[i].fax + '</td><td>' + list[i].city + '</td><td>' + list[i].region + '</td><td>' + (list[i].lead_time != null && list[i].lead_time != undefined ? list[i].lead_time : '') +'</td><td id="eraProfile" class=hideBlock>' + (list[i].era_profile != undefined ? list[i].era_profile : '') + '</td><td class="sorted lastColumn"><label class="linkBtn linkBtn1" id="' + i + '"><label class="selectItem">Select</label></label></td></tr>';
	    }
	  }
	  content += rowContent + '</tbody></table>' + '<div class="tableFooter"><div class="paginationWrapper bottomPagination  paginationDivVerifyVendorPopup paginationDiv hideBlock"' + 'id="paginationDiv2"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>' + '</div></div></div>' + '</div><input type="hidden" value="' + list.length + '" id="sizeCheck" />';
	  return content;
}

function bindVendorSelect(from,toCheck,fromOrderOnReceipt) {
	  $(".linkBtn1").click(function() {
	      //clearAllErrors();
	      var id = $(this).attr("id");
	      from.val($("#suppNo" + id + "").text() + "-" + $("#suppName" + id + "").text());
	      var $elem = $(this);
	      var $tr = $elem.closest('tr');	      	
	  	var eraProfile =$tr.find('#eraProfile').text();
	     toCheck.val(true);
	      eraProfile = (eraProfile == undefined ?'': eraProfile);
			if(salesOrg==1060 && eraProfile=="Y"){
				$.fn
				.warnPopup(
						'alert',
						'Cannot add article',
						'Information',
						'',
						'',
						triggerOkInOR, $(this),'');
					
			}
			else{
	     if(fromOrderOnReceipt != undefined && fromOrderOnReceipt)
	     {
	    	 loadDraftOOR($("#suppNo" + id + "").text());
			lockSupplier({"supplier":$("#suppNo" + id + "").text(),"supplier_name":$("#suppName" + id + "").text()});
			$('#oor_viewModeTable').removeClass('hideBlock');
	     }
	      if ($("#dialog-verifySupplier").dialog("isOpen")) { $("#dialog-verifySupplier").dialog("close"); }
	    
			}
			});
}
// Related to supplier verify option

// Related to hiearachy drop down
function populateDepartment() {
	
	  var param = {  "iv_sales_org": salesOrg, "iv_node_id": "ALL DEPARTMENTS", "iv_session_id": "100" };
	  console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url: gethierarchyDetails,
	    data: JSON.stringify(param)
	  }).done(function(response) {
		  loadDepartment(response);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	  }).always(function() {
		  populateWarehouse();
		  stopLoading();
	  });
}

function loadDepartment(temList){
	var content = '';
    var selectContent = '<option value="Select">Select Department</option>';
    
    // below code is used for reading the department name
    if (temList.length > 0) {
      departmentList = temList;
      departmentMap = $groupBy(departmentList, function(obj) {
        return obj.node_id;
      });
      for (var i = 0; i < temList.length; i++) {
        content += '<li >	<input class="department" type="radio" name="departmentList" ' + 'value="' + temList[i].node_id + '" id="' + temList[i].node_id + '">' + '<label for="' + temList[i].node_id + '" class="labelText">' + temList[i].node_desc + '</label></li>';
        selectContent += '<option value="' + temList[i].node_id + '">' + temList[i].node_desc + '</option>';
      }
      $('#departmentInEnq').html(selectContent);
      $('#deptlst').html(content);
      $("#deptLstCnt").text(temList.length);
      bindDepartmentSelectEvent();
    }
  
}

function bindDepartmentSelectEvent() {
  $('.department').on('click', function() {
	  var $elm = $(this);
	  var selectedValue = this.id.toString();
	  var param = {};
	    if (selectedValue != $('#hierarchyID').val()) {
	      param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
	      $.ajax({
	        type: "POST",
	        url: gethierarchyDetails,
	        data: JSON.stringify(param),
	        beforeSend : function(){ unloadPrevCategory($elm,selectedValue); }
	      }).done(function(response) {
	    	  loadCategory(response,selectedValue);
		  }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }).always(function() {
			  stopLoading();
		  });
	    }
  });
}

function unloadPrevCategory($elm,selectedValue){
	$('#departmentInEnq').val(selectedValue);
    $("#catGo,#subCatGo,#segmentBtn,#segmentLst,#subCategoryLst,#noSelectionCat,#subCatTotal,#segmentTotal").addClass('hideBlock');
    $("#deptGo,#segment,#subCat,#categoryLst").removeClass('hideBlock');
    $("#categoryLstCnt,#subTotal,#segmentTotalCnt").text('');
    $("#categoryLst").empty();
    $('#hierarchyID').val(selectedValue);
    $('#hierarchyLVL').val(2);
}

function loadCategory(temList,selectedValue){
    if (temList.length > 0) {
      var content = '';
      for (var i = 0; i < temList.length; i++) {
        content += '<li><input type="radio" name="category" class="category" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
      }
      $('#categoryLst').html(content);
      $("#categoryLstCnt").text(temList.length);
      $("#categoryLstTotal").removeClass('hideBlock');
      bindCategorySelectEvent();
    }
}

function bindCategorySelectEvent() {
  $(document).on("click", ".category", function() {
	var $elm = $(this);
    var selectedValue = this.id.toString();
    var param = {};
    if (selectedValue != $('#hierarchyID').val()) {
      param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
      $.ajax({
        type: "POST",
        url: gethierarchyDetails,
        data: JSON.stringify(param),
        beforeSend: function(){
        	unloadPrevSubCat($elm,selectedValue);
        }
      }).done(function(response) {
    	  loadSubCat(response,selectedValue);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	  }).always(function() {
		  stopLoading();
	  });
    }
  });
}

function unloadPrevSubCat($elm,selectedValue){
	 $('#selectedCat').text(toTitleCase($elm.next().text()));
     $('.selectedSubCat,#segmentLst,#segmentBtn,#deptGo,#subCatGo,#segmentTotal,#subCat').addClass('hideBlock');
     $("#catGo,#segment,#subCategoryLst").removeClass('hideBlock');
     $("#subCategoryLst").empty();
     $("#subTotal,#segmentTotalCnt,#selectedSubCat").text('');
     $('#hierarchyID').val(selectedValue);
     $('#hierarchyLVL').val(3);
}

function loadSubCat(temList,selectedValue){
	if (temList.length > 0) {
      var content = '';
      for (var i = 0; i < temList.length; i++) {
        content += '<li><input type="radio" name="subCat" class="subCat" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
      }
      $('#subCategoryLst').html(content);
      $("#subTotal").text(temList.length);
      $("#subCatTotal").removeClass('hideBlock');
      bindSubCategorySelectEvent();
    }
}

function bindSubCategorySelectEvent() {
  $(document).on("click", ".subCat", function() {
	var $elm = $(this);
	var selectedValue = this.id.toString();
	var param = {};
    if (selectedValue != $('#hierarchyID').val()) {
      param = { "iv_sales_org": salesOrg, "iv_node_id": selectedValue, "iv_session_id": "100" };
      $.ajax({
        type: "POST",
        url: gethierarchyDetails,
        data: JSON.stringify(param),
        beforeSend: function(){ unLoadPrevSeg($elm,selectedValue); }
      }).done(function(response) {
    	  loadSegment(response,selectedValue);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	  }).always(function() {
		  stopLoading();
	  });
    }
  });
}

function loadSegment(temList,selectedValue){
    if (temList.length > 0) {
      var content = '';
      for (var i = 0; i < temList.length; i++) {
        content += '<li><input type="radio" name="hierarchySearch" class="segment" data-tt-id="' + temList[i].node_id + '" data-tt-parent-id="' + selectedValue + '" id="' + temList[i].node_id + '" value="' + temList[i].node_id + '"/><label for="' + temList[i].node_id + '" class="lastColumn">' + temList[i].node_desc + '</label></li>';
      }
      $('#segmentLst').html(content);
      $("#segmentTotalCnt").text(temList.length);
      $("#segmentTotal").removeClass('hideBlock');
      bindSegmentSelectEvent();
    }
  
}

function unLoadPrevSeg($ele,selectedValue){
	$('#selectedSubCat').text(toTitleCase($ele.next().text()));
    $('.selectedSeg,#segment,#segmentBtn,#catGo,#deptGo').addClass('hideBlock');
    $('.selectedSubCat,#segmentLst,#subCatGo').removeClass('hideBlock');
    $("#segmentTotalCnt,#selectedSeg").text('');
    $("#segmentLst").empty();
    $('#hierarchyID').val(selectedValue);
    $('#hierarchyLVL').val(4);
}

function bindSegmentSelectEvent() {
	  $(document).on("click", ".segment", function() {
	    var selectedValue = this.id.toString();
	    if (selectedValue != $('#hierarchyID').val()) {
	      $('#selectedSeg').text(toTitleCase($(this).next().text()));
	      $('.selectedSeg,#segmentBtn').removeClass('hideBlock');
	      $("#subCatGo").addClass('hideBlock');
	      $('#hierarchyID').val(selectedValue);
	      $('#hierarchyLVL').val(5);
	    }
	  });
}

function toTitleCase(str) {
	  return str.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
}
// Related to hiearachy drop down

// Related to ware house drop down
function populateWarehouse() {
	  var param = { "iv_site": siteNo, "iv_session_id": "100" };
	  var $dropDwnHolder = $('#warehouseField #warehouseDrpdwn');
	  if (!$dropDwnHolder.hasClass(loaded)) {
	    $.ajax({
	      data: JSON.stringify(param),
	      url: warehouseLookupServiceURL,
	      type: 'post',
	      beforeSend: function() {
	      }
		  }).done(function(response) {
	    	loadWareHouse(response,$dropDwnHolder);
		  }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }).always(function() {
			  stopLoading();
			  $dropDwnHolder.addClass(loaded);
			  getSalesOrgConfigService();
			  //trigOrdHeadTabOnFail();$('#order-head').removeClass('hideBlock');
		  });
	  }
}

function loadWareHouse(res,$dropDwnHolder){
	var content = '<option value="0">Select</option>';
    if (res != null && res != undefined && res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        content += '<option value="' + res[i].site_no + '">' + res[i].site_no + '-' + res[i].site_desc + '</option>';
      }
    }
    $dropDwnHolder.html(content);
}

function closeAdvSearchClasses() {
	  $("#advDiv").addClass('advancedParam hideBlock');
	  $("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');
	  $("#closeLink").addClass('linkBtn hideBlock');
	  $("#advLink1").show();
	  $('#supplier').val('');
	  $('#all').click();
	  $('#orderStatus').val('ALL');
	  $('#orderType').val('ALL');
	  $("#fromDate").val("");
	  $("#toDate").val("");
}

function closeAdvSearch() {
  $("#advDiv").addClass('advancedParam hideBlock');
  $("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');
  $("#closeLink").addClass('linkBtn hideBlock');
  $("#advLink1").show();
}

function resetForm(){
	$('.lookupWrapper input,.lookupWrapper select').removeClass(errorFieldClass).removeAttr('title');
}

function validateTheform() {
  hideOrderTabs();
  $('#multipleArticlesSelected').val('');
  errors = [];
  resetForm();
  var $order = $('#orderNo').removeClass('tooltip').removeAttr('title');
  var $from = $('#fromDate').removeClass('tooltip').removeAttr('title');
  var $to = $('#toDate').removeClass('tooltip').removeAttr('title');
  var $suppRadio = $('input:radio[name=sourceSupply]:checked');
  var $warehouse =$('#warehouseDrpdwn').removeClass('tooltip').removeAttr('title');
  var $vendor = $('#supplier').removeClass('tooltip').removeAttr('title');
  var $deptCheck = $('#depH');
  var $dept = $('#departmentInEnq');
  var $advLink =$('#advLink1');
  var $redirectEnq = $('#redirectOrderEnq');
  var $articleRadio = $("#description");
  var all ='all';
  var select = 'Select';
  var warehouse ='warehouse';
  var vendor = 'vendor';
  var orderNo = $articleRadio.is(":checked") ? $order.val().split('-')[0].trim() : $order.val().trim();
 /* if(salesOrg==1060){
  if(orderNo==""){
  orderNo=$("#newSearch").val();
  }
  }*/
  var delFromDate = $from.val().trim();
  var delToDate = $to.val().trim();
  var supplierRadio = $suppRadio.val();
  
  if (delFromDate == '' && delToDate == '' && orderNo == '') {
	  $order.highlight(enter_search_msg);$from.highlight(enter_search_msg);$to.highlight(enter_search_msg);
	  errors.push(enter_search_msg);
  } else if (delFromDate!= '' && !($from.isValidDate())) {
	  $from.highlight(invalid_del_from_msg);
	  errors.push(invalid_del_from_msg);
  } else if (delToDate!= '' && !($to.isValidDate())) {
	  $to.highlight(invalid_del_to_msg);
	  errors.push(invalid_del_to_msg);
  } else if (delFromDate == '' && delToDate != '' ) {
	  $from.highlight(enter_del_from_msg);
	  errors.push(enter_del_from_msg);
  } else if (delFromDate != '' && delToDate == '') {
	  $to.highlight(enter_del_to_msg);
	  errors.push(enter_del_to_msg);
  } else if (delFromDate != '' && delToDate != '' && $from.compDate($to,enter_date_range_msg)) {
	  errors.push(enter_date_range_msg);
  } else if (supplierRadio != all && supplierRadio == warehouse && $warehouse.val() == 0) {
	  $warehouse.highlight(warehouse_msg);
	  errors.push(warehouse_msg);
  } else if (supplierRadio == vendor && $vendor.val().trim() == '') {
	  $vendor.highlight(enter_supp_msg);
	  errors.push(enter_supp_msg);
  } else if($deptCheck.is(':checked') && $dept.val() == select) {
	  $dept.highlight(select_dept);
	  errors.push(select_dept);
  } else {
	  	closeAdvSearch();
	  	if (!$articleRadio.is(":checked") && orderNo != '') {
	  		//var $tblHold = $('#order-no-res-cont');
	  		//loadOrderTabs('',new orderParam('',padzero((orderNo),10),'','','','','','','',''),'',$tblHold);
	  		loadOrderTabs('',new orderParam('',orderNo,'','','','','','','',''));
	  	}else if ($articleRadio.is(":checked") && orderNo != ''){
	  		var param = getOrderSearchRequestParam() ;
	  		if(isNaN(param.iv_article)){
	  			var gtinFlag = "";
                var nodeLevel = "";
                var nodeId= "";
	  			var createParam = {
	  					"iv_article"	: (param.iv_article)
	  					.split('-')[0],
	  					"iv_site"		: siteVal,
	  					"iv_sales_org"	: $("#salesOrg").val(),
	  					"iv_supplier"	:param.supplier,
	  					"iv_src_supply"	: param.srcInd,
	  					"iv_ranged"		: "Y",
	  					"iv_session_id"	: "",
	  					"iv_barcode"	: "",
	  					"iv_node_level"	: nodeLevel,
	  					"iv_node_id"	:  nodeId,
	  					"iv_desc"		:"Y",
	  					"iv_article_no"	: "N",
	  					"iv_gtin"		: gtinFlag,
	  					"iv_barcode_flag":"",
	  					"iv_auto_stockr_flag":"",
	  					"iv_style": "",
	  					"iv_colour": "",
	  					"iv_article_size": "",
	  					"iv_supplier":"",
	  					"iv_src_supply":""
	  			};
	  			url = articleHeaderBasicUrl;

	  			console.log(url + ' ' + JSON.stringify(createParam));
	  			$.ajax({
	  				type: "post",
	  				url: url,
	  				data: JSON.stringify(createParam),
	  				beforeSend: function() {
	  					startLoading();
	  				},
	  				success: function(response) {
	  					if(response.length >0){
	  						data = response;
	  						$.fn.loadArticlePopUpNew(data,onSelectOrderEnqSearch,'',onArticleTdCheckInCreate,checkboxOption,param.iv_article,'','',param);


	  						stopLoading(); }
	  					else {
	  						$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
	  						stopLoading();
	  					}
	  				},
	  				error: function() {
	  					showAllErrors([mobiSerErrMsg], area);
	  					stopLoading();
	  					// stopLoading();// goToLogin();
	  				},

	  			});

	  		}else {

	  		articleSearch(packBreakArticleSearchDraft,getOrderSearchRequestParam(),processArticleResult);
               }
	  	}else if (checkDeliveryDateDuration()) {
			loadOrderTabs('',getOrderSearchRequestParam());
		}else{
			$.fn.warnPopup('warn',redirectMsg,' Date range beyond '+maxDateRang+' days ',triggerOkInEnquiry,triggerDeleteNo,'','',okButtons);
		} 
  }
  if (errors.length>0) {
	  $advLink.trigger('click');
	  showAllErrors(errors);
  }
}
var triggerOkInEnquiry = function(e){
	 var $redirectEnq = $('#redirectOrderEnq');
	$redirectEnq.attr('action', '../allocation/onPageLoad.htm');
	$redirectEnq.attr('method', 'GET');
	$redirectEnq.submit();
	
};

function showAllErrors(content) {
	$.fn.showCustomMsg(content,error);
}

function checkDeliveryDateDuration() {
  var flag = true;
  var actFrom = $('.order').find('#fromDate').val();
  var fromDate = actFrom.split('/');
  var toDate = $('.order').find('#toDate').val().split('/');
  var date1 = new Date(fromDate[1] + '/' + fromDate[0] + '/' + fromDate[2]);
  var date2 = new Date();
  date2.setDate(Number(toDate[0]));
  date2.setMonth(Number(toDate[1]) - 1);
  date2.setYear(Number(toDate[2]));
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var diffDays = diff(actFrom,getTodayDate());
  if (diffDays > maxDateRang) {
    date2.setDate(date2.getDate() - maxDateRang);
    $('#redirectOrderEnq').find('#delvFromDate').val(convertDatetoDDMMYYYY(date1));
    $('#redirectOrderEnq').find('#delvToDate').val(convertDatetoDDMMYYYY(date2));
    flag = false;
  }
  return flag;
}

function convertDatetoDDMMYYYY(date) {
  var desiredDate = '';
  var newDate = date.getDate();
  var newMonth = date.getMonth() + 1;
  if (newDate < 10) {
    newDate = '0' + newDate;
  }
  if (newMonth < 10) {
    newMonth = '0' + newMonth;
  }
  desiredDate = (newDate + "/" + newMonth + "/" + date.getFullYear());
  return desiredDate;
}

function getSalesOrgConfigService() { 
	  var param = {
	    "IV_SALES_ORG": $('#salesOrg').val(),
	    "iv_order_type": "PO"
	  };
	  $.ajax({
	    type: "post",
	    url: getLimitQty,
	    data: JSON.stringify(param),
	    beforeSend: function() {
	    	startLoading();
	    },
	  }).done(function(response) {
	      if (response != null && response != undefined       
	    		  && response.result != undefined && response.result[0] != undefined) {          	
	    	  salesOrgConfigMap['update_recvd_qty'] = response.result[0].update_recvd_qty;    		 
	    	  salesOrgConfigMap['order_limit_qty'] = response.result[0].order_limit_qty;  		
	    	  salesOrgConfigMap['rtv_max_article_range'] = response.result[0].rtv_max_article_range;
	    	  salesOrgConfigMap['temp_disable_flag'] = (response.result[0].temp_disable_flag !=undefined && response.result[0].temp_disable_flag !=null) ? response.result[0].temp_disable_flag : 'N';
	    	  stopLoading();
	      } else {
	    	  salesOrgConfigMap['update_recvd_qty'] = 28;    		 
			  salesOrgConfigMap['order_limit_qty'] = 99;
			  salesOrgConfigMap['temp_disable_flag'] = 'N';
			  stopLoading();
	      }
	  	console.log(response);
	    }).fail(function() {
	    	$.fn.showCustomMsg([mobiSerErrCode],error);			//error display
	    	salesOrgConfigMap['update_recvd_qty'] = 28;    		 
			salesOrgConfigMap['order_limit_qty'] = 99;
			salesOrgConfigMap['temp_disable_flag'] = 'N';
	      stopLoading();
	    }).always(function() {
	    	temperatureDisableFlg = salesOrgConfigMap['temp_disable_flag'] == 'Y' ? true: false;
	    	if(ineDGMSscreen=='false')
			loadOrderTabs(onload);
		});
	}

function loadOrderTabs(loadOption,param){
	var url = (loadOption == onload) ? getOrderTabCodeOnloadUrl : getOrderTabCodeOnsearchUrl;
	param = (param == undefined)? getOrderSearchRequestParam(): param;
	console.log('url '+url+' param '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
    	  hideOrderTabs();
      }
	}).done(function(response) {
		if(checkResult(response,'tab_code')){
			loadTabsBasedOnCode(response,param);
			showOrderTabs();
			securityMatrix();//Fixed defect 9968 
		}else{
			stopLoading();	
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
		trigOrdHeadTabOnFail();
		stopLoading();
	}).always(function() {
		//stopLoading();
	});
}

function trigOrdHeadTabOnFail(){
	var $tabs = $('#tabs');
	if(!($tabs.hasClass('.ui-tabs'))){
		$tabs.tabs();
	}
	hideOrderTabs();
}

function trigOrdHeadTabOnSucc(){
	var $tabs = $('#tabs');
	if($tabs.hasClass('.ui-tabs')){
		$tabs.tabs('destroy');
	}
	$tabs.tabs();
	allignAllocTab();
}

function showOrderTabs(){
	var $tabs = $('#tabs');
	var $orderHead = $('#order-head');
	//var $tabCont = $('.order-tabs-cont');
	$tabs.removeClass('hideBlock'); $orderHead.removeClass('hideBlock');
	//$tabCont.removeClass('hideBlock');
}
function allignAllocTab(){
	$('.high-tab').removeClass('float-left');$('#alloc-tab-link').removeClass('margin-left0');
}
function hideOrderTabs(){
	var $ordertabs = $('.order-tabs');
	//var $tabs = $('#tabs');
	//if(($tabs.hasClass('.ui-tabs')))$tabs.tabs('option','active',7);
	var $tabCont = $('.order-tabs-cont');
	$ordertabs.addClass('hideBlock');
	$tabCont.html('');
	$('.high-tab').addClass('float-left');$('#alloc-tab-link').addClass('margin-left0');
}

function loadTabsBasedOnCode(tabs,param){
	var $over_due =$('#over-due-tab-link');
	var $fully_rec =$('#fully-rece-tab-link');
	var $ready_rec =$('#ready-rece-tab-link');
	var $open =$('#open-tab-link');
	var $noti =$('#noti-tab-link');
	var result = false;
	var $triggerElem ='';
	if(tabs!=undefined && tabs.length>0){
		for(var i=0;i<tabs.length;i++){
			if(Number(tabs[i].tab_count)>0){
				result = true;
				if(tabs[i].tab_code==OVERDUE){
					$triggerElem = $triggerElem == '' ? $over_due: $triggerElem;
					$over_due.removeClass('hideBlock').removeClass(loaded).data('param',param).data('tab_code',tabs[i].tab_code).find('a').html('<label></label>Overdue ('+tabs[i].tab_count+')');
				}else if(tabs[i].tab_code==FULLY_RECEIVED){
					$triggerElem = $triggerElem == '' ? $fully_rec: $triggerElem;
					$fully_rec.removeClass('hideBlock').removeClass(loaded).data('param',param).data('tab_code',tabs[i].tab_code).find('a').html('Fully Received ('+tabs[i].tab_count+')');
				}else if(tabs[i].tab_code==READY_TO_RECEIVE){
					$triggerElem = $triggerElem == '' ? $ready_rec: $triggerElem;
					$ready_rec.removeClass('hideBlock').removeClass(loaded).data('param',param).data('tab_code',tabs[i].tab_code).find('a').html('Ready to Receive ('+tabs[i].tab_count+')');
				}else if(tabs[i].tab_code==OPEN_ORDERS){
					$triggerElem = $triggerElem == '' ? $open: $triggerElem;
					$open.removeClass('hideBlock').removeClass(loaded).data('param',param).data('tab_code',tabs[i].tab_code).find('a').html('Open Orders ('+tabs[i].tab_count+')');
				}else if(tabs[i].tab_code==NOTIF){
					$triggerElem = $triggerElem == '' ? $noti: $triggerElem;
					$noti.removeClass('hideBlock').removeClass(loaded).data('param',param).data('tab_code',tabs[i].tab_code).find('a').html('Notifications ('+tabs[i].tab_count+')');
				}
			}
		}
	}
	if(result){
		trigOrdHeadTabOnSucc();
		$triggerElem.trigger('click');
	}else{
		$.fn.showCustomMsg([nodata],error);
		trigOrdHeadTabOnFail();
		stopLoading();
	}
}

var orderTabClickEvent = function() {
	var $selectedTab = $(this);
	if(!$selectedTab.hasClass(loaded)){
		var param = $selectedTab.data('param');
		param.iv_tab_code = $selectedTab.data('tab_code');
		$('#tabs').tabs('option','active',$selectedTab.attr('tab_ind'));
                if((param.iv_order_no =="" || param.iv_order_no == null )
                                && (param.iv_delivery_from ==""|| param.iv_delivery_from == null)
                                && (param.iv_delivery_to == ""|| param.iv_delivery_to ==null) 
                                && (param.iv_order_status=="" || param.iv_order_status==null)
                                && (param.iv_article=="" || param.iv_article ==null )
                                && (param.iv_desc =="" || param.iv_desc == null )) {
                       loadOrderBasicInfoOnLoad(param,$selectedTab); 
                }else{
		loadOrderBasicInfo(param,$selectedTab);
                }
	}
	var selectTabId = $selectedTab!='' ? $selectedTab.attr('id') :$selectedTab;
};


function loadOrderBasicInfo(param,$selectedTab,$tblHold){
	var url = getOrderHdrBasicInfoUrl;
	console.log('url '+url+' param '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
	
		if(checkResult(response,'order_no')){
			for (var i=0; i< response.length; i++){
				var dateChange = response[i].delivery_date;
				//var dateRoster =  response[i].delivery_date != undefined ?  response[i].delivery_date : "";
				response[i].delivery_date = $.tablebuild.dataparse.mobi_date(dateChange);
				response[i].total_cartons = (response[i].total_cartons != null && response[i].total_cartons != ''
					&& response[i].total_cartons.toString().indexOf('.') != -1)?response[i].total_cartons.toFixed(3):response[i].total_cartons;
			}			
			($selectedTab!= '' && $selectedTab!=undefined) ? $selectedTab.addClass(loaded) :'';
			loadHdrContentTbl(response,$selectedTab,$tblHold);
			bindTableAfterLoad();
			showOrderTabs();
		}else{
			stopLoading();	
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
		stopLoading();
	}).always(function() {
		stopLoading();
	});
}

function loadOrderBasicInfoOnLoad(param,$selectedTab,$tblHold){	
	var url = getOrderHdrBasicInfoUrlOnLoad;
	console.log('url '+url+' param '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
	
		if(checkResult(response,'order_no')){
			for (var i=0; i< response.length; i++){
				var dateChange = response[i].delivery_date;
				//var dateRoster =  response[i].delivery_date != undefined ?  response[i].delivery_date : "";
				response[i].delivery_date = $.tablebuild.dataparse.mobi_date(dateChange);
				//Mail: Issue in Number of digits in order details
				response[i].total_cartons = (response[i].total_cartons != null && response[i].total_cartons != ''
					&& response[i].total_cartons.toString().indexOf('.') != -1)?response[i].total_cartons.toFixed(3):response[i].total_cartons;
			}
			($selectedTab!= '' && $selectedTab!=undefined) ? $selectedTab.addClass(loaded) :'';
			loadHdrContentTbl(response,$selectedTab,$tblHold);
		//	bindTableAfterLoad();			//avoid calling since hendle in this.key 
			showOrderTabs();
		}else{
			stopLoading();	
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
		stopLoading();
	}).always(function() {
		stopLoading();
	});
}
function bindTableAfterLoad(){
	
	if(temperatureDisableFlg){
		$('.temperature').addClass('hideBlock');
	}else{
		$('.temperature').removeClass('hideBlock');
	} 
}


function loadHdrContentTbl(data,$selectedTab,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= createConfObj(data,$selectedTab);
	$tblhold.loadtbl(confObj);	
}

function createConfObj(data,$selectedTab){
	var obj = {};
	var selectTabId = $selectedTab!='' ? $selectedTab.attr('id') :$selectedTab;
	if(selectTabId == over_due_tab) {
		obj =(new tblConfObjOverDue(over_due_name,over_due_title,data));
	}else if(selectTabId == ready_to_rec_tab) {
		obj =(new tblConfObjOverDue(ready_to_name,ready_to_title,data));
	}else if(selectTabId == fully_rece_tab) {
		obj =(new tblConfObjFullRecived(data));		
	}else if(selectTabId == open_ord_tab) {
		obj =(new tblConfObjOpen(data));
	}else if(selectTabId == noti_ord_tab){
		obj =(new tblConfObjNoti(data));
	}else{
		obj =(new tblConfObjOrderNo(data));
	}
	return obj;
}

function articleSearch(url,param,followUp){
	 var glaExists = $('#open_item_tab_table thead th[data_key="cost_price"]').length;
	console.log(url + ' ' + JSON.stringify(param));
	 $.ajax({
		    type: "POST",
		    url: url,
		    data: JSON.stringify(param),
		    beforeSend: function(){
		    	startLoading();
		    }
	  }).done(function(data) {
		  if(checkResult(data,articleSearchKey)){
			  followUp(data,param);
			}else{
			  stopLoading();
		  };
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  
	  });
}

var genArticleSearch =function(e){
	var tableId = e.data.tableId;
	var elem = $(e.data.elem);
	if(validateTheSearchform(elem ,tableId)){
		var article = elem.find('#add_article_input_'+tableId).val();
		var obj = e.data.hdrObj;
		var qty = Number(elem.find('#add_qty_'+tableId).val().trim());
		var srcInd = '';
		var supplier = '';
		srcInd = (isPO(obj.order_type)) ? 1 : ((isSTO(obj.order_type)) ? 2 : '');
		supplier = obj.supplier_no;
		var param = new orderParam(article.split('-')[0],'','','','','','','',srcInd,supplier);
		param.qty = qty;
		param.tableId = tableId;
                var gtinFlag = "";
                var nodeLevel = "";
                var nodeId= "";
                if(isNaN(param.iv_article)){
                 var createParam = {
			  "iv_article"	: (param.iv_article)
			  .split('-')[0],
			  "iv_site"		: siteVal,
			  "iv_sales_org"	: $("#salesOrg").val(),
			  "iv_supplier"	:param.supplier,
			  "iv_src_supply"	: param.srcInd,
			  "iv_ranged"		: "Y",
			  "iv_session_id"	: "",
			  "iv_barcode"	: "",
			  "iv_node_level"	: nodeLevel,
			  "iv_node_id"	:  nodeId,
			  "iv_desc"		:"Y",
			  "iv_article_no"	: "N",
			  "iv_gtin"		: gtinFlag,
			  "iv_barcode_flag":"",
			  "iv_auto_stockr_flag":"",
			  "iv_style": "",
			  "iv_colour": "",
			  "iv_article_size": "",
                          "iv_supplier":"",
                                "iv_src_supply":""
                };
                url = articleHeaderBasicUrl;
                
                console.log(url + ' ' + JSON.stringify(createParam));
                $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(createParam),
                beforeSend: function() {
                startLoading();
                },
                success: function(response) {
                if(response.length >0){
                        data = response;
                        $.fn.loadArticlePopUpNew(data,onSelectOptionUpdate,'',onArticleTdCheckInCreate,checkboxOption,param.iv_article,'','',param);

                  
                stopLoading(); }
                else {
                                $.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
                                stopLoading();
                        }
                },
                error: function() {
                showAllErrors([mobiSerErrMsg], area);
                stopLoading();
                // stopLoading();// goToLogin();
                },

        });

                }else {
		articleSearch(packBreakArticleSearchDraft,param,processArticleResultOpenOrder);
                }
	}
};

function processArticleResult(data,param){
	if(data.length == 1){
		console.log('data ='+data);
		loadOrderTabs('',new orderParam((data[0].article),'','','',$('#orderType').val(),$('#orderStatus').val(),'','','',''));
	}else{
		$.fn.loadArticlePopUp(data,onSelect,'',onArticleTdCheck,checkboxOption,param.iv_article);
		stopLoading();
	}
}

function processArticleResultOpenOrder(data,param){
	var obj ={param:param,data:data,cache : $('#'+param.tableId+'_table')};
	var errorMsg = '';
	if(data.length == 1){
		console.log('data ='+data);
		addOpenObj(obj);
	}else{
		$.fn.loadArticlePopUp(data,onSelectOption,'',onArticleTdCheck,checkboxOption,param.iv_article,'','',param);
	}
	stopLoading();
}

var onSelectOption = function (event){
	$elem = $(this);
	var obj = {};
	obj['param'] = event.data.param;
	obj['data'] = getCheckObj($elem.data('checkedObj'));
	obj['cache'] =$('#'+event.data.param.tableId+'_table');
	addOpenObj(obj);
};
var onSelectOptionUpdate = function (event){
	$elem = $(this);
	var obj = {};
	var artNum = "";
	var artNumList = "";
	var param ="";
	obj['param'] = event.data.param;
	obj['data'] = getCheckObj($elem.data('checkedObj'));
	obj['cache'] =$('#'+event.data.param.tableId+'_table');
	for (var i=0; i < obj.data.length; i++){
		var articleNo = obj.data[i].article_no != undefined ? obj.data[i].article_no : obj.data[i].article;
		artNumList = (artNumList.length > 0)? artNumList+",":artNumList;	
		artNumList +=  articleNo;

	}       
	param = event.data.param;
	param.iv_article = artNumList;
        param.iv_desc = "Y";
        
	var url = packBreakArticleSearchDraft;   
	console.log(url + ' ' + JSON.stringify(param));	 
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify(param),
		beforeSend: function() {
			startLoading();
		},
		success: function(response) {
			if (checkResult(response,'article')) {
				obj.data = response;
				addOpenObj(obj);
			}
			stopLoading();
		}
	});
} 
var getCheckObj  = function(obj){
	var newAr = [];
	for(key in obj){
		newAr.push(obj[key]);
	}
	return newAr;
};

var onArticleTrClick = function(){
	var $elem = $(this);
	var $checkBox = $elem.find('input[type="checkbox"]');
	if($checkBox.is(':checked')){
	$checkBox.prop('checked',false).trigger('change');
	}else{
	$checkBox.prop('checked',true).trigger('change');
	}
};

var onArticleTdCheckInCreate = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var len =0;
	var unChecked;
	var position;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? [] :checkedObj;
		if($elem.is(':checked')){
			obj.checked = true;
			checkedObj.push(obj);
		}else{
			obj.checked = false;
			unChecked = obj,
		    position = checkedObj.indexOf(unChecked);
		if ( ~position ) checkedObj.splice(position, 1);
		}
		len = Object.keys(checkedObj).length;
		if(len == 0){
			$selectBtn.text('Add to List').addClass('hideBlock');
		}else{
			$selectBtn.text('Add to List ('+(len >9 ? len : '0'+len)+')').removeClass('hideBlock').data('checkedObj',checkedObj);
		}
	};

var onSelect = function (event){
	$elem = $(this);
	var list =[];
	var tempArray =[];
	list = Object.keys($elem.data('checkedObj'));
	for(var i=0;i<list.length;i++) tempArray.push(list[i].split('-')[0]);
	selectedArticle = tempArray.join(',');
	loadOrderTabs('',new orderParam(selectedArticle,'','','',$('#orderType').val(),$('#orderStatus').val(),'','','',''));
};

var onSelectOrderEnqSearch = function (event){
	$elem = $(this);
	var list =[];
	var tempArray =[];
	list = Object.keys($elem.data('checkedObj'));

	$elem = $(this);
	var obj = {};
	var artNum = "";
	var artNumList = "";
	var param ="";
	obj['param'] = event.data.param;
	obj['data'] = getCheckObj($elem.data('checkedObj'));
	obj['cache'] =$('#'+event.data.param.tableId+'_table');
	for (var i=0; i < obj.data.length; i++){
		var articleNo = obj.data[i].article_no != undefined ? obj.data[i].article_no : obj.data[i].article;
		artNumList = (artNumList.length > 0 )? artNumList+",":artNumList;	
		artNumList +=  articleNo;

	}       
	param = event.data.param;
	param.iv_article = artNumList;
        param.iv_desc = "Y";
	var url = packBreakArticleSearch;   
	console.log(url + ' ' + JSON.stringify(param));	 
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify(param),
		beforeSend: function() {
			startLoading();
		},
		success: function(response) {
			if (checkResult(response,'article')) {
				list = response;
				for(var i=0;i<list.length;i++) tempArray.push(response[i].article);
				selectedArticle = tempArray.join(',');
				loadOrderTabs('',new orderParam(selectedArticle,'','','',$('#orderType').val(),$('#orderStatus').val(),'','','',''));
				stopLoading();
			}stopLoading();
		}
	});

};

var splitArticle = function(element, index, array){
	tempArray.push(element.split('-')[0]);
};

var onArticleTdCheck = function(event){
event.stopPropagation();
var $elem = $(this);
var $tr =$elem.closest('tr');
var obj =$tr.data('obj');
var len =0;
var $selectBtn = $('#dialog-mulipleArticles #addtolist');
var checkedObj = $selectBtn.data('checkedObj');
checkedObj = checkedObj == undefined ? {} :checkedObj;
	if($elem.is(':checked')){
		obj.checked = true;
		checkedObj[obj.article+'-'+obj.article_uom] = obj;
	}else{
		obj.checked = false;
		delete checkedObj[obj.article+'-'+obj.article_uom];
	}
	len = Object.keys(checkedObj).length;
	if(len == 0){
		$selectBtn.text('Add to List').addClass('hideBlock');
	}else{
		$selectBtn.text('Add to List ('+(len >9 ? len : '0'+len)+')').removeClass('hideBlock').data('checkedObj',checkedObj);
	}
	if(obj[obj['base_uom']||''] != undefined && obj[obj['base_uom']||''] != 'Y' && obj[obj['order_uom']||''] != undefined && obj[obj['order_uom']||''] != 'Y'){
		$.fn.showCustomMsg(['Please select UOM to transfer'],error,'Order on receipt store');
		return false;
	}
};

function loadAllocService(){
	var param = getAllocParam(); 
	console.log(getAllocationOrderFromSAPURL + ' ' + JSON.stringify(param));
	 $.ajax({
		    type: "POST",
		    url: getAllocationOrderFromSAPURL,
		    data: JSON.stringify(param),
		    beforeSend: function(){
		    	startLoading();
		    }
	  }).done(function(data) {
		  frameAllocResult(data);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}

function frameAllocResult(data){
	if(data != undefined && data.result!=undefined){
		  var obj =data.result[0];
		  if(obj.MSG!=undefined && obj.MSG!=null && (!isNaN(obj.MSG.trim()))){
			  var list = data.result;
			  frameAlloc(list);
		  }else if(obj.MSG!=undefined && obj.MSG!=null && obj.MSG.trim().indexOf(' ')>-1){
			  $.fn.showCustomMsg([obj.MSG],error);
		  }else{
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }
	  }else{
		  checkResult(data,'ARTICLE');
	  }
}

function frameAllocList(){
	var allocaList =[];
	
	for(key in allocaMap){
		allocaList.push(allocaMap[key]);
	}
	return allocaList;
}

function frameAlloc(data){
	var $allocTab = $('#alloc-tab');
	groupAllocList(data);
	$allocTab.loadtbl(new tblConfAlloc(allocaList));
	$('#action_btn_wrap_allocation_tab').removeClass('hideBlock');
}

var groupAllocList = function(list){
	allocaList =[];
	allocaMap ={};
	var checkkey ='ALLOCATION_NO';
	var obj = {};
	var tempList =[];
	var tempMap ={};
	for(var i =0; i<list.length;i++){
		obj = list[i];
		key = obj[checkkey];
		if(obj.SEGMENT_NO!=undefined && obj.SEGMENT_NO!=null && departmentMap[obj.SEGMENT_NO.substr(0,2)]!=undefined){
			obj.department_name = (departmentMap[obj.SEGMENT_NO.substr(0,2)][0].node_desc);
			obj.department_no = obj.SEGMENT_NO.substr(0,2);
		}else{
			obj.department_name = '';
			obj.department_no ='';
		}
		if(allocaMap.hasOwnProperty(key)){
			tempList = allocaMap[key];
			tempList.push(obj);
			allocaList[tempMap[key]].dept_array.push(obj.department_name);
		}else{
			tempList = [];
			tempMap[key]= allocaList.length;
			obj.dept_array =[];
			obj.dept_array.push(obj.department_name);
			allocaList.push(obj);
			tempList.push(obj);
		}
		allocaMap[key]= tempList;
	}
  	return true;
 };
function triggerFollowUp(obj){
	if(obj.option == allocation){
	  loadAllocService();
	}else if(obj.option == orderUpdate){
	  updateOpenOrders(obj.param);
	}else if (obj.option == submitAll){
	  submitAllDraft("S", $('#ordersList'));
	}else if(obj.option == checkAlloc){ 
		var param = new allocParam(obj.article,getDesiredFutureDate(0),getDesiredFutureDate(21),'');
		$.fn.loadArticleAllocationPopUp(param);
	}else if(obj.option == orderOnReceipt){
	  finalizeReceive();
	}else if(obj.option == cancelSTOutt){
	  cancelSTOut(obj.orderNo,obj.supplier);
	}else if (obj.option == submit){
		//Do nothing as the drafts needs to be loaded then the loder will gets closed after that ajax - MUTHU
	}else if(obj.option == claimAuth)
		{
		saveAuthNoInNGBO(obj.reqObj);
		}
	else if (obj.option == purchaseOrderUpdate)
		{
		callPurchaseOrderUpdate(obj.param);
		}
	else{
	  stopLoading();
	}
}

var allocSortDone = function($elem){
	callExpandTrigger($elem);
};

var allocPageDone = function($elem){
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
	
	var expendedAnchor = '<tr class="noChild " style="display: table-row;"><td colspan="6" class="sorted"></td></tr>';
	//var $elem = $(this);
	var $tbl = $elem.closest('table');
	var confObj=$tbl.data('confObj');
	var obj =  $elem.data('obj');
	var allocaNo = obj.ALLOCATION_NO;
	var $expanAnc = '';
	$elem.toggleClass(expanded+' '+collapsed);
	$expanAnc = $('#alloc_expand_'+allocaNo);
	confObj.count=(confObj.count!=undefined ? confObj.count:0);
	if($elem.hasClass(expanded)){

		if($expanAnc==undefined || $expanAnc.length == 0){
			$expendedAnchor = $(expendedAnchor);
			$expendedAnchor.attr('id','alloc_expand_'+allocaNo);
			$expendedAnchor.insertAfter($elem);
			$expendedAnchor = $('#alloc_expand_'+allocaNo).find('td');
			$expendedAnchor.loadtbl(new tblConfExpandAlloc(allocaMap[allocaNo]));
			$expendedAnchor.find('.tableFooter,.tableInfo').addClass('hideBlock');
		}else{
			$expanAnc.toggle();
		}
		obj.expanded = true;
		if(flag== true){
			confObj.count=confObj.count+1;
		}
	
	}else{
		obj.expanded = false;
		$expanAnc!=undefined && $expanAnc.length >0 ? $expanAnc.toggle() : '';
		if(flag== true){
			confObj.count=confObj.count-1;
		}
	}

	if(flag== true){
		var $headElem = $tbl.find('thead:first tr');
		if((confObj.count||'') == (confObj.content.length||'')){
			$headElem.addClass(expanded).removeClass(collapsed);
			$headElem.attr(autoexpanded,'true');
		}else if((confObj.count||'') == 0){
			$headElem.removeClass(expanded).addClass(collapsed);
			$headElem.attr(autoexpanded,'false');
		}
		$headElem.attr('manualExpand','');
	}
}

function expandAllEvent(){
	var $elem = $('#thead_allocation_tab tr');
	var confObj = $elem.closest('table').data('confObj');
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

var getOrderDetail = function(hdrObj,flag){
	var $elem = $(this);
	var obj = (flag == true) ? hdrObj : $elem.data('obj');
	startLoading();
	if(isSubmit(obj.order_status)){
		//need to show message for submitted orders
		//formOpenOrderInfo(obj);
		$.fn.showInformationMsg('inOpenTab');
		stopLoading();
	}/*else if(isOpen(obj.order_status)){
		getOrderHdrDetailInfo(new deleiveryInfoParam(obj),{hdrObj:obj,deliveryObj : [],deliveryFlag : false},$elem); // Changed to show on show date in open order detail
	}*/else if(isST(obj.order_status)||isIbtOut(obj) || isOpen(obj.order_status)){
		getOrderHdrDetailInfo(new deleiveryInfoParam(obj),{hdrObj:obj,deliveryObj : [],deliveryFlag : false},$elem);
	}else{
		getOrderDeliveryInfo(obj,$elem);
	}
	console.log('click');
};

var isOpen = function(status){
	return (status == openStautus);
};
var isSubmit = function(status){
	return (status == submitStatus );
};

var isPartiallyReceived = function(status){
	return (status == partialStatus );
};

var isReadyToReceive = function(status){
	return (status == diapatchStatus || status == authStatus || status==partialStatus);
};

var isDispatch = function(status){
	return (status == diapatchStatus);
};

var isAuth = function(status){
	return (status == authStatus);
};

var isReceived = function(status){
	return (status == receStatus);
};
var isSugo = function(source){
	source = (source||'');
	return source.toUpperCase() == sugo;
};
var isPO = function(type){
	return ((type||'').toUpperCase() == poType.toUpperCase());
};

var isSTO = function(type){
	return ((type||'').toUpperCase() == stoType.toUpperCase());
};

var isST = function(type){
	return ((type||'').toUpperCase() == stType.toUpperCase());
};
var isPost = function(flag){
	return ((flag||'') == 'Y');
};
var isEmergency = function(source){
	source = (source||'');
	return source.toUpperCase() == emergency;
};

var isCancelled = function(status){
	return (status == cancelStatus);
};

var isEditable = function(obj){
	var cutOffDate = (obj.cut_off_date || '');
	//var cutOffTime = formatTime(padzero((obj.cut_off_time || ''),6));
	var cutOffTime = (obj.cut_off_time || '');
	var updateTime = new Date();
	var flag = false;
	if(cutOffDate!= '' && cutOffTime!=''){
		updateTime = new Date($.tablebuild.dataparse.mobi_date(cutOffDate)+' '+cutOffTime);
	}
	var currTime = new Date();
	if(currTime < updateTime){
		flag = true;
		//obj.cutOff = $.tablebuild.dataparse.mobi_date(cutOffDate)+' '+cutOffTime;
	}else{
		//obj.cutOff = '';
	}
	return flag;
};

var getSupplierNo = function(name, no){
	return (name ||'')+' '+(((no ||'')!='') ? ('('+no+')'):'');
};

function getOrderDetailMainWrapper(){
	var $orderDtl = $('#order_detail');
	if($orderDtl == undefined || $orderDtl.length==0){
		var orderDtlWrapp = '<div class="contentWrapper orderWrappers hideBlock" id="order_detail" ></div><div id="receive_order" class="contentWrapper hideBlock" ></div>';
		$('#orderLookUpWrapper').append(orderDtlWrapp);
		$orderDtl = $('#orderLookUpWrapper').find('#order_detail');$orderDtl.addClass('dataContHolder');
	}
	return $orderDtl.html('');
}

function formOpenOrderInfo(hdrObj,$elem,dataObj){
	var $contHold = getOrderDetailMainWrapper();
	var param = {};
	source_flag = hdrObj.source_flag;
	dataObj.headerElem =  $elem;
	var content = formOpenOrderHead(hdrObj,dataObj)+formOpenContentInfo(hdrObj.total_cartons,hdrObj.source)+formOpenItemInfo()+formOpenActionBtn();
	$contHold.append(content);
	param = new OrderItemParam(hdrObj.order_no,hdrObj.source_flag);
	getOrderItemInfo(param,dataObj,itemFollowUp);
}

var itemFollowUp = function(dataObj){
	var hdrObj = dataObj.hdrObj;
	var data = dataObj.itemObj;
	setSegHdrInfoDtls(dataObj ,data);
    //calculateUnderSupplyComponents(dataObj);
	$contWrap =$('#order_detail');
	$contWrap.data('contObj',dataObj);
	
	if(dataObj.hdrDtlObj[0].era_audit_flag =='Y' && salesOrg==1060)
	{
		$contWrap.find('#auditCheck').removeClass('hideBlock');
	}
	else
		{
		$contWrap.find('#auditCheck').addClass('hideBlock');
		}
		
	if(dataObj.tempFlag =='Y')
	{       if (temperatureDisableFlg ){
                $contWrap.find('#tempCheckFlag').addClass('hideBlock');
                }else {
		$contWrap.find('#tempCheckFlag').removeClass('hideBlock');
                }
	}
	else
		{
		$contWrap.find('#tempCheckFlag').addClass('hideBlock');
		}
	loadItemTable(hdrObj,data,dataObj,$contWrap);
	$contWrap.find('#editAction').unbind('click');
	$contWrap.find('#editAction').click(function(){
		if($(this).hasClass('disabled')){return false;}
		else{editOrder();showEditMode();}
	});
	$contWrap.find('#cancelOpenOrders').unbind('click');
	$contWrap.find('#cancelOpenOrders').click(function(){
		$.fn.warnPopup('warn',cancelMsg,'Order Details',triggerCancelYes,triggerDeleteNo,'','');
	});
	$contWrap.find('#saveOpenOrders').unbind('click');
	$contWrap.find('#saveOpenOrders').click(function(){
		if(validateTbl($('#open_item_tab_table'),dataObj)){
			$.fn.warnPopup('warn',saveMsg,'Order Details',triggerSaveYes,triggerDeleteNo,'','');
		}
	});
	$contWrap.find('#cancelOrder').unbind('click');
	$contWrap.find('#cancelOrder').click(function(){
		$.fn.warnPopup('warn',cancelOrderMsg,'Order Details',triggerCancelOrderYes,triggerDeleteNo,'','');
	});
	$contWrap.find('#grou_cont_open_item_tab').hide();
	bindOrderDetailCont($contWrap,dataObj);
	navigate(detail);
};

function validateTheSearchform(elem ,tableId) {
      var errors = []; 
	  var $cache = $(elem);
	  var $article = $cache.find('#add_article_input_'+tableId).removeClass(errorFieldClass);
	  var $qty = $cache.find('#add_qty_'+tableId).removeClass(errorFieldClass);
	  //var $all = $cache.find('#src_all_radio_'+tableId).removeClass(errorFieldClass);
	  var $vendor = $cache.find('#src_vn_radio_'+tableId).removeClass(errorFieldClass);
	  var $warehouse = $cache.find('#src_wh_radio_'+tableId).removeClass(errorFieldClass);
	  var $wareDrop= $cache.find('#src_vn_drop_dwn_'+tableId).removeClass(errorFieldClass);
	  var $vendorinput = $cache.find('#src_vn_cont_'+tableId).find('input').removeClass(errorFieldClass);
	  $article.removeClass(errorFieldClass);
	  $qty.removeClass(errorFieldClass);
	  $wareDrop.removeClass(errorFieldClass);
	  $vendorinput.removeClass(errorFieldClass);
	  
	  var flag = false;
	  if ($article.val().trim() == '') {
		  $article.highlight(articleNoMandMsg);
		  errors.push(articleNoMandMsg);
	  } else if ($vendor.is(':checked') && $vendorinput.val().trim()=='') {
		  $vendorinput.highlight(enter_supp_msg);
		  errors.push(enter_supp_msg);
	  }else if ($warehouse.is(':checked') && $wareDrop.val().trim()=='0') {
		  $wareDrop.highlight(warehouse_msg);
		  errors.push(warehouse_msg);
	  }else {
		  flag =true;	
	  }
	  if (errors.length>0) {
		  showAllErrors(errors);
	  }
	return flag;
}

function validateTbl($tbl,dataObj){
	startLoading();
	var isSugoOrder = isSugo(dataObj.hdrObj.source);
	var $tr = $tbl.find('tbody').find('tr.mainTr');
	var flag = true;
	$tr.each(function(){
	   var $td = $(this).find('[data_key="showQty"]');
	   var $qty = $td.find('.editNumCell');
	   $qty.removeClass(errorFieldClass);
	   //changed validation as we are to allow 0 qty or '' for the SUGO orders alone as they cannot delete articles in SUGO orders
	   if($qty.val().trim() == '' || $qty.val().trim()=='0'){if(!isSugoOrder){flag = false; $qty.highlight(qtyMsg );}}
	});
	if(!flag){
		showAllErrors([qtyMsg]);
	}else{
    // if(vendorConstrainFlag != null && vendorConstrainFlag != "" && vendorConstrainFlag == 'Y'){           
		var list = dataObj.itemObj;
		var errorMsg = minMaxQtyValidation(list, '', true);
		if(errorMsg  != '' && errorMsg != undefined){
		  flag = false;
		  showAllErrors(errorMsg);	 
		}
    // }
	}
	stopLoading();
	return flag;
}

var triggerSaveYes =function(e){
	var $elem = e.data.msg;
	updateOpenOrders('update');
	$elem.dialog('close');
};

var triggerCancelOrderYes =function(e){
	var $elem = e.data.msg;
	updateOpenOrders('cancel');
	$elem.dialog('close');
};

var triggerCancelYes =function(e){
	var $elem = e.data.msg;
	$contWrap =$('#order_detail');
	loadItemTable($('#open_item_tab_table').data('hdrObj'),$('#open_item_tab_table').data('oldObj'),'',$contWrap);
	editOrder();showViewMode();
	$elem.dialog('close');
};

function loadItemTable(hdrObj,data,dataObj,$cont){
	var $elem = $cont.find('#openOrderItemHolder');
	var confObj;
	if(data[0] != undefined && data[0] != "" && data[0].greenlife_flag!=undefined && data[0].greenlife_flag!=null && data[0].greenlife_flag == "Y")
		{
		 confObj = new tblConfOpenOrderItem1(data,hdrObj);
		}
	else
		{
		 confObj = new tblConfOpenOrderItem(data,hdrObj);
		}
	var $overLayCount= $cont.find('#open_over_lay_cont');
	$overLayCount.html(((dataObj.over_under_lay_cnt||'' > 0) ? '<label class="linkBtn" id="overlay"><a class="newWindowAfter">'+dataObj.over_under_lay_cnt+' article'+(dataObj.over_under_lay_cnt >1 ?'s' :'')+'</a></label>' :'NA'));
	var $lcont = $cont.find('#open_over_lay_cont').find('#overlay');
	//FOr hiding overlay/underlay if the count is 0
	/*if(dataObj.over_under_lay_cnt <= 0)
		{
		$overLayCount.addClass('lastColumn');
		$overLayCount.prev().addClass('noDivider ').text('');
		}*/
	$cont.find('#openTotArticle').text(data.length);
	if($lcont!=undefined)
		$lcont.unbind('click').bind('click',showOver_under_lay_cont).data('lobj',dataObj.lobj).data('dataObj',dataObj);
	
	$elem.loadtbl(confObj);
	confObj['hdrObj'] = hdrObj;
	$elem.find('#open_item_tab_foot').addClass('hideBlock');
	$elem.find('#open_item_tab_table').data('oldObj',jQuery.extend(true, [], data)).data('hdrObj',hdrObj);
}

var formOpenActionBtn = function(){
	cont = '<div class="pageActions hideBlock" id="editDoneWrap"><label class="actionBtn" id="saveOpenOrders"><a><label class="">Done</label></a></label><label class="secondaryActionBtn" id="cancelOpenOrders"><a>Cancel</a></label></div>';
	return  cont;
};

var formOpenOrderHead = function(obj,dataObj){
	var contentHeader = '';
    //R17.07 - Pay On Scan vendor Ref Display
	var vendorRefNumber = ((obj.vendor_ref != null && obj.vendor_ref != '' && obj.source_flag != 'D') ? '<h2 class="articleTitle venrefLabel">Vendor Reference #'+(obj.vendor_ref ||'')+'</h2>' : '');
	if(consignmentFlag=="C"){
	contentHeader+= '<div class="articleHead" id="orderContentHeader"> <div class="articleHeaderWrapper">'
		+'<h2 class="articleTitle" order_type="'+(obj.order_type || '')+'" >'+'Consignment'+' #'+$.tablebuild.dataparse.trim(obj.order_no ||'')+'</h2>'+vendorRefNumber
		+'</div><div class="articleActionBtns"><label class="positiveStatus hideBlock" id="auditCheck">Audit Check Required</label><label class="positiveStatus hideBlock" id="tempCheckFlag">Temperature Check</label><label class="orderStatus">Status: <strong>'+sentenceCase(obj.order_status ||'')+'</strong></label>';
	}else{	
	contentHeader+= '<div class="articleHead" id="orderContentHeader"> <div class="articleHeaderWrapper">'
		+'<h2 class="articleTitle">'+sentenceCase(obj.order_type ||'')+' Order'+' #'+$.tablebuild.dataparse.trim((obj.order_no ||''))+'</h2>'+vendorRefNumber
		+'</div><div class="articleActionBtns"><label class="positiveStatus hideBlock" id="auditCheck">Audit Check Required</label><label class="positiveStatus hideBlock" id="tempCheckFlag">Temperature Check</label><label class="orderStatus">Status: <strong>'+sentenceCase(obj.order_status ||'')+'</strong></label>';
	}
	if(isEditable(obj) && !isEmergency(obj.source) ){
		contentHeader+='<label class="actionBtn" id="editAction"><a><label class="editBtn">Edit</label></a></label>';
		if(!isSugo(obj.source))
			{
			contentHeader += '<label id="cancelOrder" class="actionBtn"><a><label class="notepadCross">Cancel Order</label></a></label>';
			sugoFlag = false;
			}
		else
			{
			sugoFlag = true;
			}
		
	}


	contentHeader+='</div><div class="articleInfoWrapper ">'
		+'<p class="secondaryInfo"><label class="articlePriceLabel">Supplier: <strong>'+getSupplierNo(obj.supplier_name,obj.supplier_no)+'</strong></label>'
		+'<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Delivery Date: <strong> '+($.tablebuild.dataparse.mobi_date(obj.delivery_date ||''))+' </strong></label>'
		+'<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Cut-off Date before Authorisation: <strong> '+obj.cutOff+' </strong></label>'
		+'<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Source: <strong>'+obj.source+'</strong></label>'+((dataObj.hdrDtlObj[0].created_by_user||'').trim()!='' ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Created By: <strong> '+(dataObj.hdrDtlObj[0].created_by_user||'')
		+' </strong></label>' : '')+'<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Roster Date: <strong> '+$.tablebuild.dataparse.mobi_date((dataObj.hdrDtlObj[0].roster_date ||''))
		+'</strong></label><label class="articlePriceLabel"> | </label><label class="articlePriceLabel">On Show Date: <strong>'+$.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].on_show_date||'')+'</strong></label>'
		+'</p></div></div>';
	return contentHeader;
};

var formOpenContentInfo =function(totalCart,source){
	var content = '<div class="articleContent orderDetails mainOrderDetails"><div class="articleContentInner"><div class="articleDetails">'
		+'<table cellspacing="0" class="ContentTable" width="100%"><tbody><tr><td class="keyInfo" width="20%">Total Articles:</td>'
		+'<td class="valueInfo" width="15%" id="openTotArticle"></td>';
	if(isSugo(source)){
		content+='<td class="keyInfo" width="20%">Underlay / Overlay:</td><td class="valueInfo" id="open_over_lay_cont" width="15%">'
		+'</td><td class="keyInfo noDivider" width="15%"></td><td class="valueInfo lastColumn"></td>';
	}else{
		content+='<td class="keyInfo noDivider" width="20%"></td><td class="valueInfo noDivider" id="" width="15%">'
		+'</td><td class="keyInfo noDivider" width="15%"></td><td class="valueInfo  lastColumn"></td>';
	}
	content+='</tr><tr class="lastRow"><td class="keyInfo">Total Cartons Ordered:</td><td class="valueInfo">'+(totalCart||'')+'</td><td class="keyInfo noDivider">'	
		+'</td><td class="valueInfo noDivider"></td><td class="keyInfo noDivider"></td><td class="valueInfo lastColumn"></td></tr></tbody></table>'
		+'</div></div></div>';
	return content;
};

var formOpenItemInfo =function(){
	var content = '<div class="ContentTableWrapper" id="openOrderItemHolder"></div>';
	return content;
};

function getOrderItemInfo(param,dataObj,followUp){
	// 17.08 Meat Co Vendor Changes
	var tempHdrObj = (dataObj.hdrObj !=undefined && dataObj.hdrObj!=null) ? dataObj.hdrObj : 
		((dataObj.contObj!=undefined && dataObj.contObj!=null) ? (dataObj.contObj.hdrObj) : null);
	var tempHdrDtlObj = (dataObj.hdrDtlObj !=undefined && dataObj.hdrDtlObj!=null) ? dataObj.hdrDtlObj[0] : 
		((dataObj.contObj!=undefined && dataObj.contObj!=null) ? (dataObj.contObj.hdrDtlObj[0]) : null);
	param.iv_order_no = ((isPO(tempHdrObj.order_type)?tempHdrDtlObj.delivery_no:param.iv_order_no)||param.iv_order_no);
	console.log('URL ='+orderItemInfoURL+ ' param '+JSON.stringify(param));
	//var stockTakeFlg = false;
	$.ajax({
	    type: "POST",
	    url: orderItemInfoURL,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	//startLoading();
	    }
	  }).done(function(response) {
		  if(response['LV_QTY']== undefined || response['LV_QTY'].length == 0 || !checkResult(response['LV_QTY'],'article')){
	  			$.fn.showCustomMsg([mobiSerErrCode],error);
	  			stopLoading();
		  }else{
			  var data = response['LV_QTY'];
			  if(data.length !=0){
				 for(var i=0; i < data.length;i++){
					 if(data[i].stock_take_flg != null && data[i].stock_take_flg != undefined){
						  if(data[i].stock_take_flg == "Y"){//indicates stocktake for liquor item in progress
							  stockTakeFlg = true; 
						  }
					  } 
				 }
				 dataObj['itemFlag']= true;
				 dataObj['itemObj']= data;
				 dataObj['itemObj_zero']= response['LV_QTY_ZERO'];
				 itemInfo = data;
			  }else{
				  dataObj['itemFlag'] = false;
				  dataObj['itemObj']= data;
				  dataObj['itemObj_zero']= response['LV_QTY_ZERO'];
			  }
			  var tempHdrObj = (dataObj.hdrObj !=undefined && dataObj.hdrObj!=null) ? dataObj.hdrObj : 
				  ((dataObj.contObj!=undefined && dataObj.contObj!=null) ? (dataObj.contObj.hdrObj) : null);
			  var tempHdrDtlObj = (dataObj.hdrDtlObj !=undefined && dataObj.hdrDtlObj!=null) ? dataObj.hdrDtlObj[0] : 
					((dataObj.contObj!=undefined && dataObj.contObj!=null) ? (dataObj.contObj.hdrDtlObj[0]) : null);
			  var rec_flag = (isReceived(tempHdrObj.order_status) || isPartiallyReceived(tempHdrObj.order_status)) ? 'Y' : 'N';
			  // 17.08 Meat Co Vendor Changes
              getOrderComponentesItemInfo(new OrderItemParam(((isPO(tempHdrObj.order_type)?tempHdrDtlObj.delivery_no:tempHdrObj.order_no)||tempHdrObj.order_no),tempHdrObj.source_flag,'',rec_flag),dataObj,followUp);
			  //followUp(dataObj);			  
			  
			  if(isAuth(tempHdrObj.order_status) && isPO(tempHdrObj.order_type) && dataObj.hdrDtlObj[0].asn_required == 'Y' && isASNDelayed(tempHdrObj)){
				  	$.fn.showCustomMsg(['Unable to receive order - ASN is not available. Contact Support.'],information);// swpped the condition so that when ASN is expected and stocktake in progress-- ASN takes the Priority
			  }/*else if(($(".AC_UPRXQTY").is(":visible") || $(".AC_ROD").is(":visible")) && stockTakeFlg){
				  	$.fn.showCustomMsg(['Stocktake is in progress. Please try to receive this order after the stocktake is finished.'],information);
				  	$(".AC_ROD,.AC_UPRXQTY").addClass("hideBlock");//so hide receive order button 
			  }*/else if(tempHdrObj!=null && tempHdrObj!=undefined && isReceived(tempHdrObj.order_status) && tempHdrObj.received_date != '' 
	                            && tempHdrObj.received_date != undefined  && salesOrgConfigMap != undefined &&
	                            salesOrgConfigMap['update_recvd_qty'] != undefined) {
	                $(".AC_UPRXQTY").addClass("hideBlock");                                
	                if(compareDate(increaseNumberOfDays(formatDateToMDY(tempHdrObj.received_date), 
	                        salesOrgConfigMap['update_recvd_qty']), currDate()) == 'gt'){   
                            $(".AC_UPRXQTY").removeAttr("style");                                
	                        $(".AC_UPRXQTY").removeClass("hideBlock");//so hide update received qty button for smkt
	                }                         
	         }
             if(nationalSTBlockMap != undefined && nationalSTBlockMap['AC_UPRXQTY'] != undefined){
                   $(".AC_UPRXQTY").addClass("hideBlock");
             }
             if(nationalSTBlockMap != undefined && nationalSTBlockMap['AC_POSTSOH'] != undefined){
                   $(".AC_POSTSOH").addClass("hideBlock");
             }
             //stopLoading();
         }
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {

	  });
}

function deleiveryInfoParam(hdrObj,article_filter){
	this.iv_order_no =hdrObj.order_no;
	this.iv_site =siteNo;
	this.iv_session_id = '';
	this.iv_user_id =userId;
	this.iv_article ='';
	this.iv_order_type='';
	this.iv_order_status='';
	this.iv_article_filter =(article_filter||'N');
    this.iv_source_flag=hdrObj.source_flag;	
    this.iv_tab_code = hdrObj.tab_code;
}

function getOrderDeliveryInfo(hdrObj,$elem){
	var param = new deleiveryInfoParam(hdrObj);
	orderType=hdrObj.order_type
	consignmentFlag=hdrObj.source_flag;
	console.log('URL ='+getOrderDeliveryInfoURL+ ' param '+JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: getOrderDeliveryInfoURL,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	//startLoading();
	    }
	  }).done(function(data) {
		  if((data!=undefined && data.length==0) || checkResult(data,'delivery_no')){
			  var dataObj = {};
			  if(data.length !=0){
				  dataObj = {hdrObj:hdrObj,deliveryObj : data,deliveryFlag : true};
			  }else{
				  dataObj = {hdrObj:hdrObj,deliveryObj : data,deliveryFlag : false};
			  }
			  deliveryList= dataObj.deliveryObj;
			  getOrderHdrDetailInfo(param,dataObj,$elem);
		  }else{
			  stopLoading();
		  };
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  //getOrderItemInfo(param,hdrObj);
	  });
}
function getOrderComponentesItemInfo(param, dataObj, followUp){		
	console.log(orderItemInfoMobileURL+' '+JSON.stringify(param));
	$.ajax({
	    type: "post",
	    url: orderItemInfoMobileURL,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(response) {
		  if(response != '' && response.length>0){
			  dataObj['itemCompObjMap'] = '';
              dataObj['itemCompObjMap'] = formComponentsBasedOnDisplay(response, dataObj);
			  dataObj['itemCompObjFlag'] = true;
		  }else{
			  dataObj['itemCompObjMap'] ='';
			  dataObj['itemCompObjFlag'] = false;
		  }
		  (followUp != undefined && followUp != "")?followUp(dataObj):"";
		  stopLoading();
	  }).fail(function() {
		//(followUp != undefined && followUp != "")?followUp(dataObj):"";
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  });
	//stopLoading();
}

function formComponentsBasedOnDisplay(response, dataObj){
componentArtMap = {};
for(var a in response){	
	var proceed = false;
    var tempHdrObj = (dataObj.hdrObj !=undefined && dataObj.hdrObj!=null) ? dataObj.hdrObj : ((dataObj.contObj!=undefined && dataObj.contObj!=null) ? (dataObj.contObj.hdrObj) : null);
	var id = (response[a].sscc_carton_num != "" && response[a].sscc_carton_num != undefined )?
	response[a].display_article+"_"+response[a].sscc_carton_num:response[a].display_article;        
	if(dataObj.itemObj != '' && dataObj.itemObj.length>0){
               for(var b in dataObj.itemObj ){
                     if(dataObj.itemObj[b].article == response[a].display_article)
                     proceed = true;
                     response[a].selected = false;
               }
        }
        //Defect - 12801 Fix
         if((response[a].received_qty == null || response[a].received_qty == '') && !(salesOrg==1060 && era_prof=="Y" && auditFlag  == "Y") 
        		 && !(receiveInFull_retainSessionFlag != "Y") ){
                   response[a].received_qty = (dataObj != '' && tempHdrObj != '' && tempHdrObj.order_status != "" 
                   && tempHdrObj.order_status == diapatchStatus && response[a].dispatched_qty != null
                   && response[a].dispatched_qty != '')?response[a].dispatched_qty:response[a].order_qty;
        }
        if(proceed && (componentArtMap[id] == undefined || componentArtMap[id] == '') 
                && response[a].display_article != "" && response[a].display_article != null){
		var list = [];               
		list.push(response[a]);
		componentArtMap[id]= list;                
        }else if(proceed && response[a].display_article != "" && response[a].display_article != null){ 
    	 componentArtMap[id].push(response[a]);
        }
        
}
return componentArtMap;
}

function getOrderHdrDetailInfo(param,dataObj,$elem){
	commonOrder = dataObj.hdrObj;
	console.log('URL ='+getOrderHdrDetailoUrl+ ' param '+JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: getOrderHdrDetailoUrl,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	//startLoading();
	    }
	  }).done(function(data) {
		  stockTakeFlg = false; 		//Defect_11281 - restting the flag
		  if((data!=undefined && data.length!=0) || checkResult(data,'creation_date')){
			 // era_prof=data[0].era_profile==undefined?'N':data[0].era_profile;
			  if(data.length !=0){
			  era_prof=data[0].era_profile==undefined?'N':data[0].era_profile;
				  dataObj['hdrDtlFlag']= true;
				  dataObj['hdrDtlObj']= data;
                  preqTypeSer = ((data[0].preq_type == '' || data[0].preq_type == undefined)? '' :data[0].preq_type);
                  roasterNameSer = ((data[0].roster_name == '' || data[0].roster_name == undefined)? '' :data[0].roster_name);
                  roasterDateSer = ((data[0].roster_date == '' || data[0].roster_date == undefined)? '' :data[0].roster_date); 
                  deliveryDateSer = ((data[0].delivery_date == '' || data[0].delivery_date == undefined)? '' :data[0].delivery_date);
                  purchaseReqSer = ((data[0].purchasing_group == '' || data[0].purchasing_group == undefined)? '' :data[0].purchasing_group);
                  // vendorConstrainFlag = data[0].vendor_constraint_flag;
                  orderNoDtl=data;	
                  source_flag = dataObj.hdrObj.source_flag;
			  }else{
			  era_prof='';
				  dataObj['hdrDtlFlag'] = false;
				  dataObj['hdrDtlObj']= data;
				  orderNoDtl=data;
			  }
			  if(isPartiallyReceived(dataObj.hdrObj.order_status) || isReceived(dataObj.hdrObj.order_status)){
				  getOrderGRInfo(param,dataObj);
			  }
			  else if(isOpen(dataObj.hdrObj.order_status))
				  {
				  formOpenOrderInfo(dataObj.hdrObj,$elem,dataObj);
				  }
				  else{
				var rec_flag = (isReceived(dataObj.hdrObj.order_status)  || isPartiallyReceived(dataObj.hdrObj.order_status) ) ? 'Y' : 'N';
				dataObj.headerElem =  $elem;				
				getOrderItemInfo(new OrderItemParam(dataObj.hdrObj.order_no,dataObj.hdrObj.source_flag,'',rec_flag),dataObj,deliveryItemInfoFollowUp);
				
			  }
              headerObj=dataObj;
		  }else{
			  stopLoading();
		  };
	  }).fail(function() {
		  era_prof='';
		  dataObj['hdrDtlFlag'] = false;
		  dataObj['hdrDtlObj']= data;
		  orderNoDtl=data;
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  
	  });
}

function getOrderGRInfo(paramGRInfo,dataObj){
	//defect 8552
	if((dataObj.hdrObj.order_type=="VENDOR") && (dataObj.hdrDtlObj[0].order_no!=null || dataObj.hdrDtlObj[0].order_no!=undefined || dataObj.hdrDtlObj[0].order_no!="")){
		paramGRInfo.iv_order_no=dataObj.hdrDtlObj[0].order_no;
                if(paramGRInfo.iv_order_no == undefined || paramGRInfo.iv_order_no == ''){
                       paramGRInfo.iv_order_no =  dataObj.hdrObj.order_no;
                }
	}
	paramGRInfo.iv_order_no = (((dataObj.hdrObj.order_type=="VENDOR")?dataObj.hdrDtlObj[0].asn_no:paramGRInfo.iv_order_no) || paramGRInfo.iv_order_no); // 17.08 Meat Co Vendor Changes
	console.log('URL ='+getOrderGrInfoURL+ ' param '+JSON.stringify(paramGRInfo));
	$.ajax({
	    type: "POST",
	    url: getOrderGrInfoURL,
	    data: JSON.stringify(paramGRInfo),
	    beforeSend: function(){
	    	//startLoading();
	    }
	  }).done(function(data) {
		  if((data!=undefined && data.length==0) || checkResult(data,'gr_no')){
			  if(data.length !=0){
				  dataObj['grFlag']= true;
				  dataObj['grObj']= data;
			  }else{
				  dataObj['grFlag'] = false;
				  dataObj['grObj']= data;
			  }
			  var rec_flag = (isReceived(dataObj.hdrObj.order_status) || isPartiallyReceived(dataObj.hdrObj.order_status)) ? 'Y' : 'N';
			  getOrderItemInfo(new OrderItemParam(dataObj.hdrObj.order_no,dataObj.hdrObj.source_flag,'',rec_flag),dataObj,deliveryItemInfoFollowUp);
		  }else{
			  stopLoading();
		  };
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {

	  });
}

var deliveryItemInfoFollowUp = function (dataObj){
	 var rec_flag = (isReceived(dataObj.hdrObj.order_status) || isPartiallyReceived(dataObj.hdrObj.order_status)) ? 'Y' : 'N';
	var hdrObj = dataObj.hdrObj;
	var deliveryFlag = dataObj.deliveryFlag;
	var $contHold = getOrderDetailMainWrapper();
	var	cont = '';
	var title = 'all';
	//getOrderComponentesItemInfo(new OrderItemParam(dataObj.hdrObj.order_no,dataObj.hdrObj.source_flag,'',rec_flag),dataObj);
	setSegHdrInfoDtls(dataObj,dataObj.itemObj);
    //calculateUnderSupplyComponents(dataObj);
	setTotalPallets(dataObj,dataObj.deliveryObj);
	cont += formOtherOrderHead(hdrObj,deliveryFlag,dataObj);
	if(dataObj.deliveryFlag){
		cont+= formSegmentDetailSection(dataObj);
	}else if(isIbtOut(dataObj.hdrObj)){
		title = '';
		cont+= stockTransOrderHeaderInfo(dataObj)+itemInfoSegOrder('',dataObj);                               
	}else{
		cont+= frameSegCont('',dataObj,'')+itemInfoSegOrder(title,dataObj);
	}
	$contHold.append(cont);
	frameItemCont(dataObj,title);
	//clearCostPrice();;
	bindOrderDetailCont($contHold,dataObj);
	navigate(detail);
	securityMatrix();//added as the vendor authorisation to be hidden or shown based on app settings
     /*     if(stockTakeFlg){
                $(".AC_ROD,.AC_UPRXQTY").addClass('hideBlock');
                }*/
	 if(($(".AC_UPRXQTY").is(":visible") || $(".AC_ROD").is(":visible") || $(".AC_POSTSOH").is(":visible")) && stockTakeFlg){
	  	$.fn.showCustomMsg(['Stocktake is in progress. Please try to receive this order after the stocktake is finished.'],information);
	  	$(".AC_ROD,.AC_UPRXQTY,.AC_POSTSOH").addClass("hideBlock");//so hide receive order button 
	 }
	stopLoading();
};


var stockTransOrderHeaderInfo = function(dataObj){
	var cont ='';
	if(temperatureDisableFlg){
		cont ='<div class="articleContent orderDetails mainOrderDetails"><div class="articleContentInner"><div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%">'
			+'<tbody><tr><td class="keyInfo" width="20%">Total Articles:</td><td class="valueInfo" width="15%">'+(dataObj.tot_art_cnt||'NA')+'</td>'
			+'<td class="keyInfo" width="19%">Total Cartons Transferred:</td><td class="valueInfo" width="20%">'+(dataObj.hdrObj.total_cartons||'NA')+'</td>'
			+'<td class="keyInfo noDivider" width="12%"></td><td class="valueInfo lastColumn"></td></tr></tbody></table></div>';
	}else{
		cont ='<div class="articleContent orderDetails mainOrderDetails"><div class="articleContentInner"><div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%">'
		+'<tbody><tr><td class="keyInfo" width="20%">Total Articles:</td><td class="valueInfo" width="15%">'+(dataObj.tot_art_cnt||'NA')+'</td>'
		+'<td class="keyInfo chilledTempOrdDetInfo" width="15%">Chilled Temperature (sending):</td><td class="valueInfo chilledTempOrdDetInfo" width="20%">'+(dataObj.hdrDtlObj[0].ibt_chilled_temperature||'NA')+'</td>'
		+'<td class="keyInfo noDivider" width="15%"></td><td class="valueInfo lastColumn"></td></tr>'
		+'<tr class="lastRow"><td class="keyInfo">Total Cartons Transferred:</td><td class="valueInfo">'+(dataObj.hdrObj.total_cartons||'NA')+'</td>'
		+'<td class="keyInfo frozenTempOrdDetInfo" width="15%">Frozen Temperature (sending):</td><td class="valueInfo frozenTempOrdDetInfo" width="20%">'+(dataObj.hdrDtlObj[0].ibt_frozen_temperature||'NA')+'</td>'
		+'<td class="keyInfo noDivider" width="15%"></td><td class="valueInfo lastColumn"></td></tr></tbody></table></div>';
	}
	cont+='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr><td class="keyInfo" width="20%">Name:</td>'
		+'<td class="valueInfo" width="15%">'+(dataObj.hdrDtlObj[0].ibt_contact_name||'NA')+'</td><td class="keyInfo " width="19%">Contact:</td><td class="valueInfo " width="20%">'+(dataObj.hdrDtlObj[0].ibt_contact_no||'NA')+'</td>'
		+'<td class="keyInfo " width="15%">Pickup Date &amp; Time:</td><td class="valueInfo lastColumn">'+($.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].ibt_pickup_date||'NA'))+' '+(dataObj.hdrDtlObj[0].ibt_pickup_time||'NA')+'</td></tr><tr class="lastRow">'
		+'<td class="keyInfo">Comments:</td><td class="valueInfo lastColumn" colspan="5">'+(dataObj.hdrDtlObj[0].ibt_comments||'NA')+'</td></tr></tbody></table></div>';
				
	cont+='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr class="lastRow"><td class="keyInfo" width="20%">Authorisation #:</td>'
		+'<td class="valueInfo" width="15%">'+(dataObj.hdrDtlObj[0].ibt_auth_number||'NA')+'</td><td class="keyInfo " width="19%">Carrier:</td><td class="valueInfo " width="20%">'+(dataObj.hdrDtlObj[0].ibt_courier||'NA')+'</td><td class="keyInfo " width="15%">Vehicle Rego:</td>'
		+'<td class="valueInfo lastColumn">'+(dataObj.hdrDtlObj[0].ibt_rego_number||'NA')+'</td></tr></tbody></table></div></div></div>';
	
	return cont;
	
};

function frameSegItemCont(dataObj,$contHold,deliveryNo){
	var $itemHold = $contHold.find('#seg-iteminfo-'+deliveryNo);
	$contHold.data('contObj',dataObj);

		if($itemHold!=undefined && dataObj.itemObj!=undefined && dataObj.itemObj.length>0){
//			$itemHold.loadtbl(new tblConfObjNonSegItemInfo(dataObj.deliveryObj[0].status+'_'+'item_table',dataObj.itemObj,dataObj.deliveryObj[0].status));
			$itemHold.loadtbl(new tblConfObjNonSegItemInfo(dataObj.deliveryObj[0].status+'_'+'item_table'+'_'+dataObj.itemObj[0].segment_no,dataObj.itemObj,dataObj.deliveryObj[0].status));
			$itemHold.find('.tableFooter').addClass('hideBlock');
			$itemHold.find('#action_btn_wrap_'+dataObj.deliveryObj[0].status+'_'+'item_table').removeClass('hideBlock');
                        $itemHold.find('tbody').find('.textbox').unbind('keypress').isWithin999Or3Decimal();
		}
}

function frameItemCont(dataObj,title){
	var $section_tabs = $('#sections-tab');
	var $itemHold ='';
	var $contWrap  = $('#order_detail');
	var confObj = {};
	$contWrap.data('contObj',dataObj);
	$section_tabs!=undefined ? $section_tabs.tabs() :'';
        //var received = (isReceived(status) || isReceived(status));
    if(seal_flag=="Y"){
    	$('.articleDetails').find('.sealClass').addClass('hideBlock');
    	$('.articleDetails').find('.sealId').addClass('hideBlock'); 
	}
	/*for(var i=0; i<dataObj.received_art.length; i++){
		if(dataObj.received_art[i].greenlife_flag == 'Y'){
			isCostPriceShow = true;
			break;
		}
	}*/
	if(dataObj.deliveryFlag || title == 'all'){
		$itemHold = $contWrap.find('#tabs-yet-to-receive');
		if($itemHold!=undefined && $itemHold.length > 0 && dataObj.yet_to_receive_cnt > 0){
			confObj = new tblConfObjNonSegItemInfo('yet_to_received_'+'item_table',dataObj.yet_to_receive_art,dataObj.hdrObj.order_status);
			confObj['hdrObj'] = dataObj.hdrObj;
			$itemHold.loadtbl(confObj);
			$itemHold.find('#yet_to_received_item_table_head').addClass('hideBlock');
			$itemHold.find('#action_btn_wrap_yet_to_received_item_table').removeClass('hideBlock');
			$itemHold.find('tbody').find('.textbox').isWithinOnly3Decimal();
			
			
		}
		$itemHold = $contWrap.find('#tabs-received');
		if($itemHold!=undefined && $itemHold.length > 0 && dataObj.received_cnt > 0){
			confObj = new tblConfObjNonSegItemInfo('received_'+'item_table',dataObj.received_art,dataObj.hdrObj.order_status);
			confObj['hdrObj'] = dataObj.hdrObj;
			$itemHold.loadtbl(confObj);
			$itemHold.find('#received_item_table_head').addClass('hideBlock');
			$itemHold.find('#action_btn_wrap_received_item_table').removeClass('hideBlock');
			$itemHold.find('tbody').find('.textbox').isWithinOnly3Decimal();
			
		}
		($contWrap.find('#over-all-tabs')||'')!= '' ? $contWrap.find('#over-all-tabs').tabs({activate:function(event,ui){$(ui.newPanel.context).find('#filltered-tabs').addClass('hideBlock');}}) :'';
	}else{
		$itemHold = $contWrap.find('#non-seg-iteminfo');
		if($itemHold!=undefined && dataObj.itemObj!=undefined && dataObj.itemObj.length>0){
			confObj = new tblConfObjNonSegItemInfo(dataObj.hdrObj.order_status+'_'+'item_table',dataObj.itemObj,dataObj.hdrObj.order_status);
			confObj['hdrObj'] = dataObj.hdrObj;
			$itemHold.loadtbl(confObj);
			$itemHold.find('#action_btn_wrap_'+dataObj.hdrObj.order_status+'_'+'item_table').removeClass('hideBlock');
			$itemHold.find('tbody').find('.textbox').isWithinOnly3Decimal();  
		}
	}
	
	
}

var formSegmentDetailSection = function(dataObj){
	var tabCont ='<ul><li><a href="#section-overall"><label class="sectionTitle">Overall Info</label><label class="sectionInfo">Total Deliveries: <strong>'+dataObj.deliveryObj.length+'</strong></label></a></li>';
	var tabContDtl = '<div id="section-overall">'+frameSegSubHdr('all',dataObj,dataObj.hdrObj)+frameSegCont('all',dataObj,0)+itemInfoSegOrder('all',dataObj,'')+'</div>';
	var deliveryNo = '';
	for(var i=0;i<dataObj.deliveryObj.length;i++){
		deliveryNo = (dataObj.deliveryObj[i].delivery_no||'');
		if(consignmentFlag=="C"){
		tabCont+='<li data-seg-index="'+i+'" onclick ="frameIndividualDeliveryCont(\''+deliveryNo+'\',$(\'#section-'+deliveryNo+'\'),'+i+')"><a href="#section-'+deliveryNo+'"><label class="sectionTitle">Delivery '+deliveryNo+'</label><label class="sectionInfo">ASN #<strong>'+(dataObj.deliveryObj[i].asn_no||'')+'</strong></label></a></li>';
		}
		else{	
		tabCont+='<li data-seg-index="'+i+'" onclick ="frameIndividualDeliveryCont(\''+deliveryNo+'\',$(\'#section-'+deliveryNo+'\'),'+i+')"><a href="#section-'+deliveryNo+'"><label class="sectionTitle">Delivery '+deliveryNo+'</label><label class="sectionInfo">Segment #<strong>'+(dataObj.deliveryObj[i].segment_no||'')+'</strong></label></a></li>';
		}
		tabContDtl+= '<div id="section-'+deliveryNo+'" class="dataContHolder">'+frameSegSubHdr('',dataObj,dataObj.deliveryObj[i])+'</div>';
	}
	tabCont+= '</ul>'+tabContDtl;
	var cont ='<div class="detailsSections"><div id="sections-tab" class="sectionTabs">'+tabCont+'</div></div>';
	
	return cont;
};

var frameIndividualDeliveryCont = function(deliveryNo,section,seg_index){
	if(!section.hasClass('loaded')){
		var contObj = $('#order_detail').data('contObj');
		var status = contObj.deliveryObj[seg_index].status;
		var rec_flag = (isReceived(status) || isPartiallyReceived(status)) ? 'Y' :'N';
		startLoading();
		getOrderItemInfo(new OrderItemParam(deliveryNo,'D','',rec_flag),{elem:section, contObj:contObj,deliveryNo:deliveryNo,seg_index : seg_index},segmentItemInfoFollowUp);
	}
};

var segmentItemInfoFollowUp = function(obj){
	var deliveryNo = obj.deliveryNo;
	var seg_index = obj.seg_index;
	var contObj = obj.contObj;
	var itemObj = obj.itemObj;
	var hdrObj = contObj.hdrObj;
	var deliveryObj = contObj.deliveryObj[seg_index];
	var dataObj = {hdrObj:hdrObj,hdrDtlObj: contObj.hdrDtlObj,deliveryObj:[deliveryObj], itemObj:itemObj,deliveryFlag:true};
	var $contHold = obj.elem;
	var	cont = '';
	
	setSegHdrInfoDtls(dataObj,itemObj);
   // calculateUnderSupplyComponents(dataObj);
	setTotalPallets(dataObj,[deliveryObj]);
	cont+= frameSegSubHdr('seg',dataObj,deliveryObj)+frameSegCont('seg',dataObj,seg_index)+itemInfoSegOrder('seg',dataObj,deliveryNo);
	
	$contHold.html('').append(cont).addClass('loaded');
	frameSegItemCont(dataObj,$contHold,deliveryNo);
	//clearCostPrice();;
	bindOrderDetailCont($contHold,dataObj);
    /* if(stockTakeFlg){
                $(".AC_ROD,.AC_UPRXQTY,.AC_POSTSOH").addClass('hideBlock');
                }*/
        if(($(".AC_UPRXQTY").is(":visible") || $(".AC_ROD").is(":visible") || $(".AC_POSTSOH").is(":visible")) && stockTakeFlg){
	  	$.fn.showCustomMsg(['Stocktake is in progress. Please try to receive this order after the stocktake is finished.'],information);
	  	$(".AC_ROD,.AC_UPRXQTY,.AC_POSTSOH").addClass("hideBlock");//so hide receive order button 
	}
};

var bindOrderDetailCont = function($hold,dataObj){
	var $lcont = $hold.find('#overlay');
	var $scont = $hold.find('#overSupply');
	var $dcont = $hold.find('#deptMore');
 	var $STCancel = $hold.find('#commonCancelOrder'); 
	var $grpCont = $hold.find('.group_cont_table');
	var $grGoBtn = $hold.find('#showFilterResult');
	var $updateQtyCom = $hold.find('#commonUpdateQty');
	var $updateQtySeg = $hold.find('#update-rec-qty-btn');
	var $STPrint = $hold.find('#commonPrintOrder'); 
	var $POCancel = $hold.find('#cancelOrder');
	var $ULDPrint = $hold.find('.printULD');

	/*if(isCostPriceShow){
		$hold.find('.costClass').removeClass('hideBlock');
	}else{
		$hold.find('.costClass').addClass('hideBlock');
	}*/
        
	if(dataObj .hdrDtlObj[0].era_audit_flag =='Y' && salesOrg==1060){
		$hold.find('#auditCheck').removeClass('hideBlock');
	}else{
		$hold.find('#auditCheck').addClass('hideBlock');
	}
	
	if(dataObj.tempFlag =='Y'){       
		if (temperatureDisableFlg ){
			$hold.find('#tempCheckFlag').addClass('hideBlock');
        }else{
        	$hold.find('#tempCheckFlag').removeClass('hideBlock');
        }
	}
	else{
		$hold.find('#tempCheckFlag').addClass('hideBlock');
	}
	
	if($updateQtyCom != undefined && $updateQtyCom.length>0){
		$updateQtyCom.unbind('click').bind('click',{hold:$hold,dataObj:dataObj},updateReceiveQty);
	}
	if($updateQtySeg != undefined && $updateQtySeg .length>0){
		$updateQtySeg.unbind('click').bind('click',{hold:$hold,dataObj:dataObj},updateReceiveQty);
	}
	
	//MUTHU CODE
	var $POVendorClaim = $hold.find('#commonVendorClaim');
	var $postSOH = $hold.find('#commonPostSohQty');
	var $commonReceive= $hold.find('#commonReceiveOrder');
        var $updateReceivedOrder = $hold.find('#updateReceivedOrder');
	if($lcont!=undefined)
		$hold.find('#overlay').unbind('click').bind('click',showOver_under_lay_cont).data('lobj',dataObj.lobj).data('dataObj',dataObj);
	
	if($scont!=undefined)
		$hold.find('#overSupply').unbind('click').bind('click',showOver_under_supply_cont).data('sobj',dataObj.sobj).data('dataObj',dataObj);
	
	if($STCancel!= undefined && isIbtOut(dataObj.hdrObj))
		$STCancel.unbind('click').bind('click',{orderNo: dataObj.hdrObj.order_no,supplier: dataObj.hdrDtlObj[0].receiving_site},triggerCancelSTOut);
	
	//deefct 2614 added tab code logic
	if($POCancel!= undefined && (dataObj.hdrObj.tab_code == "OVERDUE") && (isAuth(dataObj.hdrObj.order_status) || (isDispatch(dataObj.hdrObj.order_status))) && isPO(dataObj.hdrObj.order_type))
		{
		$hold.find('#cancelOrder').unbind('click').bind('click',{dataObj:dataObj},triggerPOCancel);
		}
	
	if($dcont!= undefined)
		$dcont.unbind('click').bind('click',function(){ $(this).addClass('hideBlock'); $(this).parent().find('.remain-dept').removeClass('hideBlock');});
	
	if($grpCont!=undefined)
		$grpCont.hide();
		
	if($grGoBtn!=undefined)
		$grGoBtn.unbind('click').bind('click',{hdrObj: dataObj.hdrObj,elem:$hold.find('#over-all-tabs')},getGRItemInfo);
	
	//MUTHU CODE
	if($POVendorClaim!= undefined && isPO(dataObj.hdrObj.order_type) && isReceived(dataObj.hdrObj.order_status))
		$POVendorClaim.unbind('click').bind('click',{dataObj:dataObj},triggerVendorClaimAuth);
	
	if($postSOH!= undefined && (isPost(dataObj.hdrObj.post_flag) || isPost(dataObj.hdrDtlObj[0].post_flag)))
		$postSOH.unbind('click').bind('click',{dataObj:dataObj},triggerSOHPost);
	
	if($commonReceive != undefined && isReadyToReceive(dataObj.hdrObj.order_status) && !isIbtOut(dataObj.hdrObj))
		$commonReceive.unbind('click').bind('click',{dataObj:dataObj},triggerReceiveOrder);
        
        if($updateReceivedOrder != undefined && isPartiallyReceived(dataObj.hdrObj.order_status) /*&& !isIbtOut(dataObj.hdrObj)*/)
		$updateReceivedOrder.unbind('click').bind('click',{dataObj:dataObj},triggerUpdateReceivedOrder);
	
	if($STPrint!= undefined && isIbtOut(dataObj.hdrObj))
		$STPrint.unbind('click').bind('click',{dataObj:dataObj},triggerPrintSTOut);
	
	if($ULDPrint.exists())
		$ULDPrint.unbind('click').bind('click',{dataObj:dataObj, orderNo: $ULDPrint.attr('id').split('-')[0]},triggerULDPrint);
	
	$('.transferIbt').unbind('click');
	$('.transferIbt').click({dataObj:dataObj},function(e){
	var area = $('#dialog-editSitePop');
		$('#transferPopUpForm')[0].reset();
		area.find('#siteResults').addClass('hideBlock');		
		var dataObj = e.data.dataObj;
		$('#dialog-verify #popupSearch .filterWrapper').addClass('hideBlock');
		
		area.dialog('open');
		area.find('#pos1').focus();
		createWareHouseList({
			siteNo : $('#posSite').val()
		});
		var elem = $(this);
		bindSitePopupEvents(area, $(this).attr('id').split('-')[1],$(elem),dataObj);
	});
	if (salesOrgVal != undefined && salesOrgVal != null && salesOrgVal == bigw_sales_org) {
                $('.chilledTempOrdDetInfo').addClass("hideBlock");
                $('.frozenTempOrdDetInfo').addClass("hideBlock");
        } 
        $('.showComponentClass').unbind('click').bind('click',function(){
        	var fromUpdate = false;
        	if($(this).closest('table').prop('id') == 'updateQtyTbl_table'){
        		fromUpdate = true;
        	}
            showComponentDisplay($(this).closest('tr').data('obj'), fromUpdate);
        });
               
	bindReceiveSegmentEvents(dataObj);
};
var triggerPrintSTOut = function(e){
	var dataObj = e.data.dataObj;
	printIBT(dataObj);
	//$.fn.warnPopup('warn',printMsg,'Order Details',triggerPrintYes,triggerDeleteNo,'',dataObj,'shiftKeys'); // defect 2505
};
var triggerPrintYes = function(e)
{
	var dataObj = e.data.cache;
	printIBT(dataObj);
	$('#no').trigger('click');
};

var triggerULDPrint = function(e){
	var dataObj = e.data.dataObj;
	var orderNo = e.data.orderNo;
	printULDInfo(dataObj, orderNo);
};

var getGRItemInfo = function(e){
	 var $elem = e.data.elem;
	 var hdrObj = e.data.hdrObj;
	 var $select = $elem.find('#grDrpDwn');
	 var $itemHold = '';
	 var grNo = $select.val();
	 var param = {};
	 if(grNo!='0'){
		$itemHold = $elem.find('#filltered-tabs');
		param = new OrderItemParam(hdrObj.order_no,'',grNo,'Y');
		grItemInfoService(param,$elem,$itemHold);
	 }else{
		$.fn.showCustomMsg([grSelectMsg],error);
	 }
};
function grItemInfoService(param,$elem,$itemHold){
	console.log('URL ='+getOrderGrItemInfoURL+ ' param '+JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: getOrderGrItemInfoURL,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  if(checkResult(data,'article')){
			  frameGrItemInfo(data,$elem,$itemHold);
		  }
		 stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {

	  });
}

var frameGrItemInfo = function(data,$elem,$itemHold){
	var confObj = new tblConfObjGrInfo('gr_item_',data);
	$itemHold.loadtbl(confObj);$itemHold.removeClass('hideBlock');
	$elem.tabs({collapsible: true, active: false, activate:function(event,ui){$(ui.newPanel.context).find('#filltered-tabs').addClass('hideBlock');}});
};

var triggerReceiveOrder = function(e){
	var dataObj = e.data.dataObj;
	showSessionPopUp(dataObj);		
}; 
var triggerUpdateReceivedOrder = function(e){
	var dataObj = e.data.dataObj;
         /*if(dataObj.itemObj != '' && dataObj.itemObj.length>0){
         var items =  dataObj.itemObj ;
         for( var  i in items ){
                 if(items[i].sscc_carton_status== 'NotReceived'){
                        dataObj.itemObj = dataObj.itemObj.splice(i, 1);
                        }
                } 
         }*/
        if(dataObj.itemObj != '' && dataObj.itemObj.length>0)
	showSessionPopUp(dataObj);		
};

var triggerSOHPost = function(e){
	var dataObj = e.data.dataObj;
		callPostSOHService(dataObj);
}; 

var triggerVendorClaimAuth = function(e){
	var dataObj = e.data.dataObj;
	$("#vendorAuthNoInNGBO").val((dataObj.hdrDtlObj[0].ven_claim_auth_no||''));
	$("#dialog-modal-autho-ngbo").dialog("open");
	$('#saveVendorAuthNoInNGBO').data('obj',dataObj);
};

var triggerCancelSTOut = function(e){	
		cancelSTOut(e.data.orderNo,e.data.supplier);	
};

var cancelSTOut = function(orderNo,supplier){
	var param = new STCancelParam(orderNo,supplier);
	var flag = false;
	var errors = [];
	console.log('url ='+cancelIBTUrl+' param = '+ JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: cancelIBTUrl,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  result  = data;
		  if(result!=undefined && result.length > 0){			  
			for(var  i =0; i<result.length; i++){
			if(result[i].typ=='S' || result[i].msg ==''){
				flag = true;				
			}else if(result[i].typ == 'E'){
				errors.push(result[i].msg);				
			}else{
				errors.push(scsSerErrCode);
			}
			  }
			if(flag){
					showUpdateSuccess();
				}
			if(errors.length >0){
				$.fn.showCustomMsg(errors,error);
			}
		  }else{
			if(data!=undefined && data.length == 0){
				$.fn.showCustomMsg([mobiSerErrCode],error);
			}else{
			  checkResult(data,'order_no');
			}
		  };stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
};

var showUpdateSuccess = function(){
	var contObj = $('#order_detail').data('contObj');
	var obj = contObj.hdrObj;
	$('#mainBackBtn').trigger('click');
	$.fn.showCustomMsg([orderSucceUpdateMsg],success);
	obj.order_status = submitStatus;
	contObj.headerElem!=undefined ? (contObj .headerElem.find('[data_key="order_status"]').text(submitStatus)) :'';
};

var isIbtOut = function(obj){
	return (isST(obj.order_type) && ((obj.supplier_no||'') == siteNo));
};

var formOtherOrderHead = function(obj,segment,dataObj){
	salesOrg = $('#salesOrg').val();
	var contentHeader = '';
    //R17.07 - Pay On Scan vendor Ref Display
	var vendorRefNumber = ((obj.vendor_ref != null && obj.vendor_ref != '' && obj.source_flag != 'D') ? '<h2 class="articleTitle venrefLabel">Vendor Reference #'+(obj.vendor_ref ||'')+'</h2>' : '');
	if(consignmentFlag=="C"){
	contentHeader+= '<div class="articleHead" id="orderContentHeader"> <div class="articleHeaderWrapper">'
		+'<h2 class="articleTitle" order_type="'+(obj.order_type || '')+'" >'+'Consignment'+' #'+$.tablebuild.dataparse.trim(obj.order_no ||'')+'</h2>'+vendorRefNumber
		+'</div><div class="articleActionBtns">';
	} else{
	contentHeader+= '<div class="articleHead" id="orderContentHeader"> <div class="articleHeaderWrapper">'
		+'<h2 class="articleTitle" order_type="'+(obj.order_type || '')+'" >'+sentenceCase(obj.order_type ||'')+' Order'+' #'+$.tablebuild.dataparse.trim(obj.order_no ||'')+'</h2>'+vendorRefNumber
		+'</div><div class="articleActionBtns">';
	}
	
	contentHeader+= (dataObj.hdrDtlObj[0] != '' && dataObj.hdrDtlObj.length>0 && dataObj.hdrDtlObj[0].era_audit_flag=="Y" && salesOrg==1060) ? '<label class="positiveStatus" id="auditCheck">Audit Check Required</label>' :'';
	contentHeader+= (dataObj.tempFlag||'' =='Y') ? '<label class="positiveStatus hideBlock" id="tempCheckFlag">Temperature Check</label>' :'';
	
	if(!segment){
		contentHeader+='<label class="orderStatus">Status: <strong id="orderStatus">'+sentenceCase(obj.order_status ||'')+'</strong></label>';
		if((isPartiallyReceived(obj.order_status) || isDispatch(obj.order_status) || 
				(isAuth(obj.order_status) && isSTO(obj.order_type) && dataObj.hdrDtlObj[0].non_disp_flag == 'Y' && dataObj.hdrObj.source_flag == 'D') ||
				(isAuth(obj.order_status) && isPO(obj.order_type))  || (dataObj.hdrDtlObj[0].ibtin_receive_flag == 'Y')) && !isIbtOut(obj)){
			contentHeader+='<label class="orderStatus receiveOrderStatus hideBlock" id="" >Status: <strong >'+(inProgress ||'')+'</strong></label>';
		}
		if(isIbtOut(obj)){
			if(!isCancelled(obj.order_status) && (dataObj.hdrDtlObj[0].alh_recv_site_flag != 'Y') /* && compareDate($.tablebuild.dataparse.mobi_date((dataObj.hdrDtlObj[0].creation_date ||'')),currDate()) == 'eq' */)
			contentHeader+='<label id="commonCancelOrder" class="actionBtn"><a ><label class="notepadCross">Cancel Order</label></a></label>';
			
			contentHeader+='<label id="commonPrintOrder" class="actionBtn" title="Print IBT Order"><a><label class="print">Print</label></a></label>';
		}
		//cancel button for vendor orders defect 2614
		// removed cancel button for dispatched vendor orders, since we will not be able to update them. Checked with vamshi and commented by guru
		if((dataObj.hdrObj.tab_code == "OVERDUE") && (isAuth(obj.order_status) /*|| (isDispatch(obj.order_status))*/) && isPO(obj.order_type))
			{
			contentHeader+='<label id="cancelOrder" class="actionBtn commonReceiveOrder"><a ><label class="notepadCross">Cancel Order</label></a></label>';
			}
		//Defect_11122 Fix
		if((obj.tab_code != undefined && obj.tab_code != 'OPEN_ORDERS')&&((isDispatch(obj.order_status) && dataObj.hdrDtlObj[0].asn_no!='' && dataObj.hdrDtlObj[0].asn_no !=null && dataObj.hdrDtlObj[0].era_profile=="Y" && salesOrg=="1060") 
				|| (/*(dataObj.hdrDtlObj[0].era_profile!="Y") && */(((isPartiallyReceived(obj.order_status) && salesOrg!="1060") || isDispatch(obj.order_status) || 
						(isAuth(obj.order_status) && isSTO(obj.order_type) && dataObj.hdrDtlObj[0].non_disp_flag == 'Y' && dataObj.hdrObj.source_flag == 'D') ||
						(((dataObj.hdrDtlObj[0].era_profile!="Y" && salesOrg=="1060") ||(salesOrg !="1060")) && isAuth(obj.order_status) && isPO(obj.order_type) && dataObj.hdrDtlObj[0].asn_required != 'Y') || (dataObj.hdrDtlObj[0].ibtin_receive_flag == 'Y')) && !isIbtOut(obj))))){
				contentHeader+='<label id="commonReceiveOrder" class="actionBtn commonReceiveOrder AC_ROD"><a ><label class="notepad">Receive Order</label></a></label>';
			}
						
		if(isReceived(obj.order_status) && (isPO(dataObj.hdrObj.order_type) && (dataObj.hdrDtlObj[0].asn_no||'') =='') && salesOrg!="1060"){
			contentHeader+='<label class="actionBtn normalMode AC_UPRXQTY" id="commonUpdateQty"><a ><label class="editBtn">Update Received Qty.</label></a></label>';
		}
		if(isPost(dataObj.hdrDtlObj[0].post_flag)){ // changed as the flag was never in obj.post_flag
			contentHeader+='<label class="actionBtn normalMode AC_POSTSOH" id="commonPostSohQty"><a ><label class="notepad">Post &amp; Update SOH</label></a></label>';
		}
		if(isReceived(obj.order_status)){
			contentHeader+='<label class="actionBtn normalMode transferIbt" id="transFerOrder-'+obj.order_no+'-O"><a ><label class="">Transfer</label></a></label>';
		}
		//NEED TO CONFIRM IF THIS IS THE RIGHT PLACE TO PUT THE FOLLOWING CODE
		if(isPO(obj.order_type) && isReceived(obj.order_status)){
			contentHeader+='<span class="parent"><label id="commonVendorClaim" class=" '+EnterVendorClaimAuthorityNumber+' actionBtn"><a ><label class="notepad">Vendor Authorisation #</label></a></label></span>';
			//added span as when security matrix runs then the parent div gor hidden 
		}		
		if(!isPO(obj.order_type) && isReceived(obj.order_status) && (recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')){
			contentHeader+='<label id="'+obj.order_no+'-O" class="actionBtn printULD" title="Print ULD"><a><label class="print">Print ULD</label></a></label>';
		}
                if((isPartiallyReceived(obj.order_status) && dataObj.hdrDtlObj[0].era_profile=="Y" && salesOrg=="1060")){
			contentHeader+='<label id="updateReceivedOrder" class="actionBtn updateReceivedOrder "><a ><label class="notepad">Update Received Order</label></a></label>';
		}                
	}
	contentHeader+='</div><div class="articleInfoWrapper">'
		+'<p class="secondaryInfo">';
	if(!isST(obj.order_type)){
		contentHeader+= '<label class="articlePriceLabel">Supplier: <strong>'+getSupplierNo(obj.supplier_name,obj.supplier_no)+'</strong></label>';
	}else{
		contentHeader+= '<label class="articlePriceLabel">Receiving Store: <strong>'+getSupplierNo(dataObj.hdrDtlObj[0].receiving_site_name,dataObj.hdrDtlObj[0].receiving_site)+'</strong></label><label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Sending Store: <strong>'+getSupplierNo(obj.supplier_name,obj.supplier_no)+'</strong></label>';
	}


	contentHeader+= (!segment) ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Delivery Date: <strong>'+($.tablebuild.dataparse.mobi_date(obj.delivery_date ||''))+'</strong></label>' : '';
	//contentHeader+= (!segment) ? ((dataObj.deptCont||'' !='') ? ('<label class="articlePriceLabel"> | </label>'+(dataObj.deptCont||'')) :'') :'';
	contentHeader += (isPO(dataObj.hdrObj.order_type) && isReceived(dataObj.hdrObj.order_status)) ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Vendor Claim Authority Number: <strong><label id="vendorClaimAuthNo">'+(dataObj.hdrDtlObj[0].ven_claim_auth_no||'')+'</label></strong><label class="editRecord hideBlock" id="editdDate">&nbsp;</label> </label>' :'';
	contentHeader+= (!segment) ? '<!--<p class="secondaryInfo">--><label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Source: <strong>'+(dataObj.hdrObj.source||'')+'</strong></label>'+((dataObj.hdrDtlObj[0].created_by_user||'').trim()!='' ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Created By: <strong> '+(dataObj.hdrDtlObj[0].created_by_user||'')
	+' </strong></label>': '')+'<!--<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Roster Date: <strong> '+$.tablebuild.dataparse.mobi_date((dataObj.hdrDtlObj[0].roster_date ||''))
	+'</strong></label>-->' : '';
	contentHeader += (!isST(obj.order_type)) ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">On Show Date: <strong>'+$.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].on_show_date||'')+'</strong></label>' : '';
	contentHeader+='</p></div></div>';
		return contentHeader;
}; 

var frameSegSubHdr =function(title,dataObj,data){
	var segHeadInfo = '<div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle" order_type="'+(dataObj.hdrObj.order_type || '')+'" >'+(title =='all' ? 'Overall Info' : ('Delivery '+(data.delivery_no||'')))+' </h2></div>'
		+'<div class="articleActionBtns">';
	if(title !='all'){
		segHeadInfo+= (isReadyToReceive(data.status) && !temperatureDisableFlg && ((dataObj.tempFlag||'') =='Y')) ?'<label class="positiveStatus">Temperature Check</label>' :'';
	}
		segHeadInfo+='<label class="orderStatus">Status: <strong>'+(title == 'all' ? sentenceCase(data.order_status||'') : sentenceCase(data.status||''))+'</strong></label>';
		if(title !='all'){
			if(dataObj.hdrObj.source_flag == 'C'){
				segHeadInfo+= ((isDispatch(data.order_status)  || isDispatch(data.status) || isPartiallyReceived(data.order_status) || isPartiallyReceived(data.status)) && isSTO(dataObj.hdrObj.order_type) && data.receive_asn=='Y') ?
								'<label class="actionBtn AC_ROD receiveSegment" id="'+data.delivery_no+'-'+data.asn_no+'"><label class="notepad">Receive Segment</label></label>' :'';
			}else{
				segHeadInfo+= (isPartiallyReceived(data.order_status) || isDispatch(data.order_status) || isPartiallyReceived(data.status) || isDispatch(data.status) ||
				(isAuth(data.order_status)  || (isAuth(data.status )) && dataObj.hdrDtlObj[0].non_disp_flag == 'Y' && isSTO(dataObj.hdrObj.order_type) && dataObj.hdrObj.source_flag == 'D')
						|| (isAuth(data.order_status)  || (isAuth(data.status )) && isPO (dataObj.hdrObj.order_type))) ?
								'<label class="actionBtn AC_ROD receiveSegment" id="'+data.delivery_no+'-'+data.asn_no+'"><label class="notepad">Receive Segment</label></label>' :'';
			}
			if(isReceived(data.order_status) || isReceived(data.status)){
				segHeadInfo+= '<!-- <label class="actionBtn" id="update-rec-qty-btn"><a ><label class="editBtn">Update Received Qty.</label></a></label>-->'
				+'<label class="actionBtn hideBlock" id="saveupdateQty_up"><a><label class="">Save</label></a></label><label class="secondaryActionBtn hideBlock" id="cancelUpdateQty_up"><a>Cancel</a></label>';
				segHeadInfo+= ((data.post_flag||'') == 'Y') ? '<label class="actionBtn" id="post-soh-btn"><a ><label class="notepad AC_POSTSOH">Post &amp; Update SOH</label></a></label>' :'';
				segHeadInfo+= '<label class="actionBtn transferIbt" id="'+(data.delivery_no || '')+'-D"><a ><label class="">Transfer</label></a></label>';
				segHeadInfo+= '<label id="'+(data.delivery_no || '')+'-D" class="actionBtn printULD" title="Print ULD"><a><label class="print">Print ULD</label></a></label>';
				
			}
			
			
		}
		segHeadInfo+='</div>';
		segHeadInfo+='<div class="articleInfoWrapper"><p class="secondaryInfo">'
		+'<label class="articlePriceLabel">Delivery Date: <strong>'+$.tablebuild.dataparse.mobi_date(dataObj.hdrObj.delivery_date||'')+'</strong></label>';
		segHeadInfo +=(title !='all' && !isST(dataObj.hdrObj.order_type) ) ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">On Show Date: <strong>'+$.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].on_show_date||'')+'</strong></label>' :'';
		segHeadInfo +=(title !='all') ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Total Articles: <strong id="article_cnt_'+(data.delivery_no||'')+'">'+(dataObj.tot_art_cnt||'')+'</strong> </label>' : '';
		segHeadInfo += (isPO(dataObj.hdrObj.order_type) && isReceived(dataObj.hdrObj.order_status)) ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Vendor Claim Authority Number: <strong>'+(dataObj.hdrDtlObj[0].ven_claim_auth_no||'')+'</strong> <label class="editRecord hideBlock" id="editdDate">&nbsp;</label> </label>' :'';
		//segHeadInfo += (dataObj.deptCont||'')!='' ? ('<label class="articlePriceLabel"> | </label>'+dataObj.deptCont) :'';
		segHeadInfo += (title == 'all') ? ('<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Source: <strong>'+dataObj.hdrObj.source+'</strong></label>'+((dataObj.hdrDtlObj[0].created_by_user||'').trim()!='' ? '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Created By: <strong> '+(dataObj.hdrDtlObj[0].created_by_user||'')+' </strong></label>': '')+'<!--<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Roster Date: <strong> '+$.tablebuild.dataparse.mobi_date(dataObj.hdrObj.roster_date||'')+'</strong></label>-->') : '';
		segHeadInfo += '</p></div></div>';
		return segHeadInfo;
};

var frameSegCont = function(title,dataObj,segIndex){
	var segmented = (title =='seg') ? true :false ;
	var tot_pall_receive = '';
	var tot_car_receive = '';
	var tot_weig_receive = '';
	var tot_pall_return = '';
	var over_supply = '';
	var receive_cont ='';
	var temperature_cont =''; 
	var invoice_cont ='';
	var status = '';
	var delObj ={};
	var tot_sscc_car_receive = '';
	var tot_sscc_car_ordered = '';
	
	status = (segmented) ? dataObj.deliveryObj[0].status : dataObj.hdrObj.order_status;
	delObj = (segmented) ? dataObj.deliveryObj[0] : dataObj.hdrDtlObj[0];
	chilled_temp = (segmented || title =='all') ? (dataObj.deliveryObj[0].chilled_temperature): (dataObj.hdrObj.chilled_temp);
	frozen_temp = (segmented || title =='all') ? (dataObj.deliveryObj[0].frozen_temperature) : (dataObj.hdrObj.frozen_temp);
	chilled_temp = (chilled_temp!=null && chilled_temp!=undefined && chilled_temp.toString()!= '') ? chilled_temp:'NA';
	frozen_temp = (frozen_temp!=null && frozen_temp!=undefined && frozen_temp.toString()!= '') ? frozen_temp:'NA';
	//var received = (isReceived(status) || isReceived(status));
        var received = (isReceived(status) || isPartiallyReceived(status));
	var dispatched = (isDispatch(status) || isPartiallyReceived(status));
	var empty_td = '<td class="keyInfo noDivider"></td><td class=" lastColumn"></td>';
	var cont = '<div class="articleContent orderDetails mainOrderDetails normalMode"><div class="articleContentInner"><div class="articleDetails">'
		+'<table cellspacing="0" class="ContentTable" width="100%"><tbody>';
	tot_pall_receive+='<td class="keyInfo" width="20%">Total Pallets:</td><td class="valueInfo" width="15%">'+Number((segmented) ? (dataObj.deliveryObj[0].total_pallets!=null && dataObj.deliveryObj[0].total_pallets!=undefined  && dataObj.deliveryObj[0].total_pallets.toString()!='' ? dataObj.deliveryObj[0].total_pallets : 'NA') : (dataObj.hdrObj.total_pallets!=null && dataObj.hdrObj.total_pallets!=undefined && dataObj.hdrObj.total_pallets.toString()!='' ? dataObj.hdrObj.total_pallets : 'NA'))+'</td>'
			+'<td class="keyInfo " width="15%">Total Articles:</td><td class="valueInfo '+(received ? 'valueInfo lastColumn ':'')+'" width="15%">'+(dataObj.tot_art_cnt!=null && dataObj.tot_art_cnt!=undefined && dataObj.tot_art_cnt.toString() !='' ? dataObj.tot_art_cnt : 'NA')+'</td>';
	tot_car_receive+='<td class="keyInfo ">	Total Dispatched Qty.:</td><td class="valueInfo">'+(dataObj.totDispQty!=null && dataObj.totDispQty!=undefined && dataObj.totDispQty.toString()!='' /*&& isDispatch(status)*/? dataObj.totDispQty : 'NA')+'</td>'
		+((salesOrg!=1060)?'<td class="keyInfo">Total Cartons Ordered:</td><td class="valueInfo ':'<td class="keyInfo">Total Ordered Qty:</td><td class="valueInfo ')+(received ? ' lastColumn ':'')+'" width="15%">'+((segmented) ? (dataObj.totOrderQty) : (dataObj.hdrObj.total_cartons!=null && dataObj.hdrObj.total_cartons!=undefined && dataObj.hdrObj.total_cartons.toString()!=''  ? dataObj.hdrObj.total_cartons : 'NA'))+'</td>';	
	tot_weig_receive+='<td class="keyInfo ">Total Dispatched Weight:</td><td class="valueInfo">'+(dataObj.totWeightDispatched!=null && dataObj.totWeightDispatched!=undefined && dataObj.totWeightDispatched.toString()!='' /*&& isDispatch(status)*/? dataObj.totWeightDispatched:'NA')+'</td>'
		+'<td class="keyInfo sealClass" width="20%">Seal Numbers</td><td class="valueInfo sealId" width="80%">'+(delObj.seal_numbers||'NA')+'</td>'+'<td class="keyInfo noDivider"></td><td class="'+(received ? ' valueInfo lastColumn ':' noDivider ')+'"></td>';
	tot_pall_return+=(isSugo(dataObj.hdrObj.source)) ? ('<td class="keyInfo">Underlay / Overlay:</td><td class="valueInfo">'
		+((dataObj.over_under_lay_cnt||'' > 0) ? '<label class="linkBtn" id="overlay"><a class="newWindowAfter">'+dataObj.over_under_lay_cnt+' article'+(dataObj.over_under_lay_cnt >1 ?'s' :'')+'</a></label>' :'NA')
		+'</td>') : '<td class="keyInfo noDivider"></td><td class=" noDivider "></td>';

	//R18.01 Defect_10319 - Fix
	if(salesOrg==1060 && era_prof=="Y")
	tot_sscc_car_ordered ='<td class="keyInfo" width="20%">Total SSCC Cartons Dispatched:</td><td class="valueInfo" width="15%">'+(dataObj.ssccCartonOrdered || 'NA')+'</td>';
	
	if(received || dispatched){
	over_supply+='<tr class="lastRow"><td class="keyInfo">Under / Over Supply:</td><td class="valueInfo">'
		+ ((dataObj.over_under_supply_cnt||'' > 0) ? '<label class="linkBtn" id="overSupply"><a class="newWindowAfter">'+dataObj.over_under_supply_cnt+' article'+(dataObj.over_under_supply_cnt >1 ?'s' :'')+'</a></label>' :'NA')
		+'</td>'+empty_td+empty_td+'</tr>';
		if(received){
	receive_cont+='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr class="lastRow">'
		+'<td class="keyInfo" width="20%">Received Date:</td><td class="valueInfo" width="15%">'+$.tablebuild.dataparse.mobi_date((delObj.received_date||'NA'))+' '+formatTime(delObj.recv_time||'NA')+'</td>'
		+'<td class="keyInfo " width="15%">Received By:</td><td class="valueInfo " width="20%">'+(delObj.recv_user||'NA')+'</td>'
		+'<td class="keyInfo " width="15%">Receiving Method:</td><td class="valueInfo lastColumn" width="15%">'+(delObj.recv_method || '')+'</td>'
		+'</tr></tbody></table></div>';
	if(!temperatureDisableFlg){
		temperature_cont+='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr class="lastRow">'
			+'<td class="keyInfo" width="20%">Chilled Temperature:</td><td class="valueInfo" width="15%">'+(chilled_temp)+'</td>'
			+'<td class="keyInfo " width="15%">Frozen Temperature:</td><td class="valueInfo " width="20%">'+(frozen_temp)+'</td><td class="keyInfo noDivider" width="20%"></td><td class="valueInfo lastColumn" width="15%"></td>'
			+'</tr></tbody></table></div>';
	}
	invoice_cont+='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr class="lastRow">'
		+'<td class="keyInfo" width="20%">Invoice / Docket Number:</td><td class="valueInfo" width="15%">'+(delObj.invoice_no||'NA')+'</td>'		
		+'<td class="keyInfo" width="15%">Seal Numbers</td><td class="valueInfo" width="55%">'+(delObj.seal_numbers||'NA')+'</td>'
		+'</tr></tbody></table></div>';
	}
	}
	
	if(received){
		tot_pall_receive =('<td class="keyInfo" width="20%">Total Pallets Received:</td><td class="valueInfo" width="15%">'+(dataObj.total_pallets_recvd.toString()== '' ? 'NA' : Number(dataObj.total_pallets_recvd).toFixed(0))+'</td>'+tot_pall_receive);	
		tot_car_receive =(((salesOrg!=1060)?'<td class="keyInfo">Total Cartons Received:</td><td class="valueInfo">'
				:'<td class="keyInfo">Total Received Qty:</td><td class="valueInfo">')+(dataObj.totReceQty.toString()== '' ? 'NA' :
			((dataObj.totReceQty != null && dataObj.totReceQty != '' && dataObj.totReceQty.toString().indexOf('.') != -1)?dataObj.totReceQty.toFixed(3):dataObj.totReceQty))+'</td>'+ tot_car_receive);
		
        tot_weig_receive= ('<td class="keyInfo">Total Weight Received:</td><td class="valueInfo">'+(dataObj.totWeightReceived.toString() == '' ? 'NA' : (dataObj.totWeightReceived))+'</td>'+tot_weig_receive);
		tot_pall_return =('<td class="keyInfo">Total Pallets Returned:</td><td class="valueInfo">'+(dataObj.total_pallets_returned.toString()== '' ? 'NA' : Number(dataObj.total_pallets_returned).toFixed(0))+'</td>'+tot_pall_return+empty_td);
		
		//R18.01 Defect_10319 - Fix
		if(salesOrg==1060 && era_prof=="Y")
		tot_sscc_car_receive =('<td class="keyInfo" width="20%">Total SSCC Cartons Received:</td><td class="valueInfo" width="15%">'+(dataObj.ssccCartonReceived || 'NA')+'</td>');
	}else{
		tot_pall_receive+=empty_td;
		tot_car_receive+=empty_td;
		tot_weig_receive+=empty_td;
		tot_pall_return+=empty_td;
		
		//R18.01 Defect_10319 - Fix
		if(salesOrg==1060 && era_prof=="Y")	tot_sscc_car_receive+=empty_td;
	}
	
	//Alignment issue fix
	tot_pall_receive =(tot_pall_receive.includes('valueInfo'))?'<tr>'+tot_pall_receive+'</tr>':'';
	tot_car_receive =(tot_car_receive.includes('valueInfo'))?'<tr>'+tot_car_receive+'</tr>':'';
	tot_weig_receive=(tot_weig_receive.includes('valueInfo'))?'<tr>'+tot_weig_receive+'</tr>':'';
	//tot_pall_return= (received) ? '<tr>'+tot_pall_return+'</tr>' : '';
	//changed for defect 7491
	tot_pall_return= (tot_pall_return.includes('valueInfo'))?'<tr>'+tot_pall_return+'</tr>':'';
	
	cont += tot_pall_receive+tot_car_receive+tot_weig_receive+tot_pall_return;
	
	if(received || dispatched){
		cont+=over_supply;
	}
	cont+='</tbody></table>';
	cont+='</div>';
	
	//R18.01 Defect_10319 - Fix
	if(salesOrg==1060 && era_prof=="Y")
		cont += (tot_sscc_car_receive.includes('valueInfo') || tot_sscc_car_ordered.includes('valueInfo'))?
			'<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr class="lastRow"><tr>'
			+tot_sscc_car_ordered+tot_sscc_car_receive+empty_td+'</tr></tbody></table></div>':'';	
	seal_flag='';
	//if(isReceived(status)){
        if(received){		
		cont += receive_cont+temperature_cont+invoice_cont;
                seal_flag="Y";
	}
	//cont+=invoice_cont_seal;
	cont+='</div></div>';
	return cont;
};

var showOver_under_lay_cont = function(e){
	var data = $(this).data('lobj');
	var dataObj = $(this).data('dataObj');
	var dialog= createOverUnderLayDialog();
	var obj = new tblOverUnderLay('over_under_lay',data,dataObj);
	dialog.find('#pop-up-cont').loadtbl(obj);
	dialog.find('#pop-up-cont').find('.tableFooter').addClass('hideBlock');
	dialog.dialog('open');
};

var createOverUnderLayDialog = function(){
	var dialog = $('#dialog-over-under-lay');
	if((dialog||'') == '' || dialog.length == 0){
		$('body').append(over_under_lay_dialog);
		dialog = $('#dialog-over-under-lay');
		dialog.dialog({ autoOpen : false, modal : true, resizable : false, minHeight : 200, width : 700 }).removeClass('visible-hide').parent().addClass("popupWrapper");
	}
	return dialog;
};

function tblOverUnderLay(title,data,dataObj){
	this.option = 'build';this.key = ['article','article_desc','base_uom','showSogo','showMSogo','showSDiff'];
	this.table_name = title;this.table_title = 'Total '+((dataObj.over_lay_cnt > 0) ? '<strong>'+dataObj.over_lay_cnt+' underlay</strong>' : '')+(((dataObj.over_lay_cnt > 0) && (dataObj.under_lay_cnt > 0)) ? ' and ' :'')+( (dataObj.under_lay_cnt > 0)  ? '<strong>'+dataObj.under_lay_cnt+' overlay</strong>' : '')+' article'+(((dataObj.over_lay_cnt > 1) || (dataObj.under_lay_cnt > 1) ? 's':'')) +'';
	this.table_class = ' ContentTable '; this.header_tr_class = '';
	this.header_name = {article:'Article',article_desc:'Description',base_uom: 'UOM'};
	this.header_data_type = {article:'',article_desc:'',base_uom:'',showSogo:'',showMSogo:'',showSDiff:''};
	this.header_row_type = {article:'main',article_desc:'main',base_uom:'main',showSogo:'main',showMSogo:'main',showSDiff:'main'};
	this.header_sub_rows = {};
	this.header_class = {article:'',article_desc:'',base_uom:' centerValue ',showSogo:' centerValue ',showMSogo:' centerValue ',showSDiff:' centerValue lastColumn '};
	this.header_width = {article:'',article_desc:'',base_uom:'',showSogo:'',showMSogo:'',showSDiff:'40px'};
	this.content_class = {article:'',article_desc:'',base_uom:' centerValue ',showSogo:' centerValue ',showMSogo:' centerValue ',showSDiff:' centerValue lastColumn '};
	this.content_format = {article:'removeNull',base_uom:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',article_desc:'',base_uom:'',showSogo:'',showMSogo:'',showSDiff:'40px'};
	this.tr_id= ['article','base_uom','article_line'];
	this.header_td_label = {showSogo:'SUGO Order Qty.',showMSogo:'Modified Order Qty.',showSDiff:'Difference'};
	this.content_label = {};
	this.cont_data_function = {showSogo:showSogo,showMSogo:showMSogo,showSDiff:showSDiff};
	this.cont_sort_function = {showSogo:get_showSogo,showMSogo:get_showMSogo,showSDiff:get_showSDiff};
	this.sort_done = {sort_done: ''};this.page_done = {page_done: ''};
	this.content_bind_event = {click: ''};this.content_tr_addon = {click: ''};this.content_title = {},this.header_title = {};
	this.content_td_addon = {}; this.header_td_addon = {};
	this.comp_key_parser = {}; this.content =  data;this.pagination = false;this.groupby= false;this.recordPerPage= 10;this.groupbyColumn =[];this.filter= false;
	this.filterbyColumn ={};this.curr_page= 1;this.sort=false;
}
		// for Defect 7414
var showSogo = function(obj){
	var qty=0;
var suggetedQty = 0;
		suggetedQty= Number (obj.suggested_qty||'');
	
	  if(source_flag =='P')
		{
		
		qty = suggetedQty *Number (obj.om);
		}
	else
		{
		
		 qty = suggetedQty;
		}
	  return ((qty != null && qty != '' && qty.toString().indexOf('.') != -1)?Number(qty).toFixed(3):qty);
};
var showMSogo = function(obj){
	//var base_uom = (obj.base_uom||'');
	var qty = (obj.newOrderTot||'');
	 return ((qty != null && qty != '' && qty.toString().indexOf('.') != -1)?Number(qty).toFixed(3):qty);
};
var showSDiff = function(obj){
	return '<label class="'+(obj.over_or_under_class_lay||'')+'">'+ ((obj.over_under_layQty != null && obj.over_under_layQty != '' && obj.over_under_layQty.toString().indexOf('.') != -1)?Number(obj.over_under_layQty).toFixed(3):(obj.over_under_layQty || ''))+'</label>';
        //(obj.over_under_layQty||'')+'</label>';
};

var get_showSogo = function(){
	return 'suggested_qty';
};
var get_showMSogo = function(){
	return 'newOrderTot';
};
var get_showSDiff = function(){
	return 'over_under_layQty';
};

var showOver_under_supply_cont = function(e){
	var data = $(this).data('sobj');
	var dataObj = $(this).data('dataObj');
	var dialog= createOverUnderSupplyDialog();
	var obj = new tblOverUnderSupply('over_under_supply',data,dataObj);
	dialog.find('#pop-up-cont').loadtbl(obj);
	dialog.find('#pop-up-cont').find('.tableFooter').addClass('hideBlock');
	dialog.dialog('open');
};

var createOverUnderSupplyDialog = function(){
	var dialog = $('#dialog-over-under-supply');
	if((dialog||'') == '' || dialog.length == 0){
		$('body').append(over_under_supp_dialog);
		dialog = $('#dialog-over-under-supply');
		dialog.dialog({ autoOpen : false, modal : true, resizable : false, minHeight : 200, width : 900 }).removeClass('visible-hide').parent().addClass("popupWrapper");
	}
	return dialog;
};

function tblOverUnderSupply(title,data,dataObj){
	this.option = 'build';
        if(dataObj.hdrObj.order_type == "VENDOR"){
              this.key = ['article','article_desc','showDiffTotal','over_or_under_qty'];  
        }
        else{
                this.key = ['article','article_desc','showDiffTotal','over_or_under_qty','reason'];
        }                
	this.table_name = title;this.table_title = 'Total '+((dataObj.over_supply_cnt > 0) ? '<strong>'+dataObj.over_supply_cnt+' over supply</strong>' : '')+(((dataObj.over_supply_cnt > 0) && (dataObj.under_supply_cnt > 0)) ? ' and ' :'')+( (dataObj.under_supply_cnt > 0)  ? '<strong>'+dataObj.under_supply_cnt+' under supply</strong>' : '')+' article'+(((dataObj.over_supply_cnt > 1) || (dataObj.under_supply_cnt > 1)) ? 's': '')+'';
	this.table_class = ' ContentTable '; this.header_tr_class = '';
	this.header_name = {article:'Article',article_desc:'Description', reason :'Reason'};
	this.header_data_type = {article:'',article_desc:'',over_or_under_qty:'',reason:''};
	this.header_row_type = {article:'main',article_desc:'main',showDiffTotal:'sub',over_or_under_qty:'main',reason : 'main'};
	if(dataObj.over_under_supply_reas  == 'D')
		this.header_sub_rows = {showDiffTotal:{subKeys: ['order_tot','disp_tot']}};
	else
	this.header_sub_rows = {showDiffTotal:{subKeys: ['order_tot','disp_tot','rece_tot']}};
	this.header_class = {article:'',article_desc:'',showDiffTotal:' centerValue  ',order_tot:' centerValue  ',disp_tot:' centerValue  ',rece_tot:' centerValue  ',over_or_under_qty:' centerValue  ',reason : ''};
	this.header_width = {article:'',article_desc:'',showDiffTotal:'',order_tot:'',disp_tot:'',rece_tot:'',over_or_under_qty:'40px',reason : ''};
	this.content_class = {article:'',article_desc:'',showDiffTotal:' centerValue  ',order_tot:' centerValue  ',disp_tot:' centerValue  ',rece_tot:' centerValue  ',over_or_under_qty:' centerValue  ',reason : ''};
	this.content_format = {article:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',article_desc:'',showDiffTotal:'',order_tot:'',disp_tot:'',rece_tot:'',over_or_under_qty:'40px',reason : ''};
	this.tr_id= ['article','base_uom','article_line'];
	this.header_td_label = {showDiffTotal:'Total Units',order_tot:'Ordered',disp_tot:'Dispatched',rece_tot:'Received',over_or_under_qty:'Difference',reason :'Reason'};
	this.content_label = {};
	this.cont_data_function = {order_tot:order_tot,disp_tot: disp_tot,rece_tot:rece_tot,over_or_under_qty:over_or_under_qty,reason :reason};
	this.cont_sort_function = {order_tot:get_order_tot,disp_tot: get_disp_tot,rece_tot:get_rece_tot,over_or_under_qty:get_over_or_under_qty,reason :get_reason};
	this.sort_done = {sort_done: ''};this.page_done = {page_done: ''};
    this.default_groupbyColumn =['display_article'];
	this.groupbyColumn ={'display_article': 'Display Article'};	
	this.group_cont_function = {display_article:getOverUnderSuppGrpCont};
	this.content_bind_event = {click: ''};this.content_tr_addon = {click: ''};this.content_title = {},this.header_title = {};
	this.content_td_addon = {}; this.header_td_addon = {};
	this.comp_key_parser = {}; this.content =  data;this.pagination = false;
    this.groupby= dataObj.over_under_supply_comp_flag;
    this.recordPerPage= 10;this.filter= false;
	this.filterbyColumn ={};this.curr_page= 1;this.sort=false;
}
var getOverUnderSuppGrpCont = function(obj,confObj){
	var cont = '<tr id="none"></tr>';
	if(obj!=null && obj!=undefined && obj.group_key != "NONE"){
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">Display Article: '+(obj.display_article||'')+'</td></tr>';
	}
	return cont;
};
var order_tot = function(obj){
	var base_uom = (obj.base_uom||'');
	var qty = (obj.newOrderTot!=null && obj.newOrderTot!=undefined) ? obj.newOrderTot : '';// order_qty
        qty = (qty != null && qty != '' && qty.toString().indexOf('.') != -1)?qty.toFixed(3):qty;
	return qty.toString()!='' ? (qty+' '+base_uom) :'';
};
var disp_tot = function(obj){
    var base_uom = (obj.base_uom||''); //dispatched_qty_uom
	var qty = (obj.newDispTot!=null && obj.newDispTot!=undefined) ? obj.newDispTot : '';// dispatched_qty
        qty = (qty != null && qty != '' && qty.toString().indexOf('.') != -1)?qty.toFixed(3):qty;
	return qty.toString()!='' ? (qty+' '+base_uom) :'';
};
var rece_tot = function(obj){
	var base_uom = (obj.base_uom||''); //received_qty_uom order_uom
	var qty = (obj.newReceTot!=null && obj.newReceTot!=undefined) ? obj.newReceTot : ''; //received_qty
        qty = (qty != null && qty != '' && qty.toString().indexOf('.') != -1)?qty.toFixed(3):qty;
	return qty.toString()!='' ? (qty+' '+base_uom) :'';
};
var over_or_under_qty = function(obj){
	return '<label class="'+(obj.over_or_under_class_sup||'')+'">'+(obj.over_or_under_supply_qty||'')+'</label>';
	
};
var reason = function(obj){
	return ((obj.dispatch_exception_reason!=null && obj.dispatch_exception_reason!=undefined)?obj.dispatch_exception_reason:'');
};

var get_order_tot = function(){
	return 'newOrderTot';
};
var get_disp_tot = function(){
	return 'newDispTot';
};
var get_rece_tot = function(){
	return 'newReceTot';
};
var get_over_or_under_qty = function(){
	return 'over_or_under_supply_qty';
};
var get_reason = function(){
	return 'sup_reason';
};

var itemInfoSegOrder = function(title,dataObj,deliveryNo){
	
	if(title == 'all'){
		return overAllInfoItemTab(dataObj);
	}else if(title == 'seg'){
		return '<div class="ContentTableWrapper itemContentTableWrap normalMode" id="seg-iteminfo-'+deliveryNo+'"></div>';
	}else{
		return '<div class="ContentTableWrapper itemContentTableWrap normalMode" id="non-seg-iteminfo"></div>';
	}
};

var overAllInfoItemTab= function(dataObj){

	var itemTab = '<div class="ContentTableWrapper listOfArticles itemContentTableWrap normalMode">';
	itemTab += (dataObj.tot_art_cnt||'')!='' ? '<div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">List of Articles ('+dataObj.tot_art_cnt+')</h4></div></div>' :'';
	itemTab+='<div id="over-all-tabs" class="filterTabs"><ul class="ui-tabs-nav">';
	var itemCont = '';
	if(dataObj.yet_to_receive_cnt >0) {
		itemTab+='<li><a href="#tabs-yet-to-receive">Yet to Receive ('+(dataObj.yet_to_receive_cnt)+')</a></li>';
		itemCont +='<div id="tabs-yet-to-receive">'
		//+segOrderItemInfo(dataObj.hdrObj.order_status,dataObj.yet_to_receive_art)
		+'</div>';
	}
	if(dataObj.received_cnt >0){
		itemTab+='<li><a href="#tabs-received">Received ('+(dataObj.received_cnt)+')</a></li>';
		itemCont +='<div id="tabs-received">'
		//+segOrderItemInfo(dataObj.hdrObj.order_status,dataObj.received_art)
		+'</div>';
	}
	
	if(dataObj.grFlag == true){
		itemTab+=(frameGRDrop(dataObj.grObj));
		itemCont+= '<div id="filltered-tabs" class="hideBlock"></div>';
	}
	itemTab+='</ul>'+itemCont+'</div></div>';
	// RECEIVE ORDER DIV MUTHU
//	itemTab+='<div id="receive_order" class="contentWrapper hideBlock" ></div>';
	return itemTab;
};

var segOrderItemInfo = function($elem,data){
	$elem.loadTbl('title',data,hdrObj);
};

var frameGRDrop =function(grData){

	var cont= '<li class="filterMenu grnClassHide"><div class="filterMenuOptions"><label class="filterTitle">Received / Amended in GR:</label>'
		+'<select class="selectOptions" id="grDrpDwn"><option value="0">Select GR #</option>';
		for(var i=0;i<grData.length;i++){
			cont+='<option value="'+(grData[i].gr_no||'')+'">'+(grData[i].gr_no||'')+' ('+(grData[i].tot_car_recvd||'')+')</option>';
		}
		cont+='</select><label class="actionBtn" id="showFilterResult">Go</label></div></li>';
	return cont;
};

var setSegHdrInfoDtls = function(dataObj,data){
	
	var tempMap ={};
	var tempArray =[];
	var cont ='';
	var dept ='';
	var temp ='';
	var totOrderQty = '';
	var totDispQty = '';
	var totReceQty = '';
	var receQty = '';
	var yetToReceive = [];
	var received = [];
	var sobj = [];
	var lobj = [];
	var over_lay = [];
	var under_lay = [];
	var over_supply = [];
	var under_supply = [];
	var suggested_qty = 0;
	var demand_qty = 0;
	var over_under_layQty = 0;
	var diff_receive = 0;
	var totWeightReceived = '';
	var totWeightDispatched = '';
	var tot_art_cnt = data.length;
	var totalOrderedUnits = '';
	var totalReceivedUnits = '';
	var totalDispUnits = '';
	var receiveFlag = false;
	var dispFlag = false;
    var compFlag = false;
    isCostPriceShow = false;
    var componentArtMap =  dataObj['itemCompObjMap'];
	dataObj.tot_art_cnt = tot_art_cnt;
	var checkCount= 0;
	 dataObj.over_under_supply_comp_flag  = false;
	var max_line_number = 0;
	
	//R18.01 Defect_10319 - Fix
	ssccCartonOrdered = [];
	ssccCartonReceived = [];
	//R18.01 Defect_12600 - Fix
	totalCartonsReceivedERA = 0;
	totalArticlesReceivedERA = 0;
	totalCartonsOrderedERA = 0;
	totalArticlesOrderedERA = 0;
	
	for(var i =0;i<tot_art_cnt;i++){
		if((data[i].greenlife_flag||'') == 'Y'){
			isCostPriceShow = true;
		}
        suggested_qty += Number(data[i].overlay_qty);
		demand_qty += Number(data[i].demand_qty);
		if(data[i].article_line!=undefined && data[i].article_line!=''){
			max_line_number = ( Number(data[i].article_line) > max_line_number  ? Number(data[i].article_line) : max_line_number);
		}
		var obj = data[i];
		temp ='';
		dept = (data[i]['department_no']||'');
		if(data[i].order_qty!=null && data[i].order_qty!=undefined && data[i].order_qty.toString()!=''){
			order_qty = Number(data[i].order_qty);
			totOrderQty = Number(totOrderQty) + Number(order_qty);
			totalArticlesOrderedERA++;
		}
		if(salesOrg==1060 && era_prof=="Y"){
			//R18.01 Defect_10319 - Fix
			ssccCartonOrdered.includes(data[i].sscc_carton_num)?'':ssccCartonOrdered.push(data[i].sscc_carton_num);
            if(data[i].sscc_carton_status == 'Received'){
        		receQty = Number(data[i].received_qty);
    			totReceQty = Number(totReceQty) + Number(receQty);
    			totalArticlesReceivedERA++;
    			//R18.01 Defect_10319 - Fix
    			ssccCartonReceived.includes(data[i].sscc_carton_num)?'':ssccCartonReceived.push(data[i].sscc_carton_num);
    			receiveFlag = true;
            }else if(data[i].sscc_carton_status == 'NotReceived'){
            	receiveFlag = false;            	            	
            }   
        }else{
			if(data[i].received_qty!=null && data[i].received_qty!=undefined && data[i].received_qty.toString()!=''){
				receQty = Number(data[i].received_qty);
				totReceQty = Number(totReceQty) + Number(receQty);
				totalArticlesReceivedERA++;
				
				receiveFlag = true;
			}else if(data[i].display_article_flag == 'Y' && data[i].article_status == 'Received'){
				receiveFlag = true;
			}else{
	            receiveFlag = false;
	        }
        }                                 
               
		if(data[i].dispatched_qty!=null && data[i].dispatched_qty!=undefined && data[i].dispatched_qty.toString()!=''){
			totDispQty = Number(totDispQty) + Number(data[i].dispatched_qty);
			dispFlag = true;
		}else{
			dispFlag = false;
		}
		
		if(data[i].rnd_wgt!=null && data[i].rnd_wgt!=undefined && data[i].rnd_wgt.toString()!=''){
			totWeightReceived = Number(totWeightReceived) + Number(data[i].rnd_wgt);
		}
		if(data[i].dispathced_wgt!=null && data[i].dispathced_wgt!=undefined && data[i].dispathced_wgt.toString()!=''){
			totWeightDispatched = Number(totWeightDispatched) + Number(data[i].dispathced_wgt);
		}
		(data[i].temperature_range_code||'' =='CH' || data[i].temperature_range_code||''=='HF') ? checkCount++ :'';
                 if(data[i].display_article_flag == 'Y' && !jQuery.isEmptyObject(componentArtMap)){                        
                        
                        for(key in componentArtMap){
                        if(key != '' && componentArtMap[key] != '' && key.split("_")[0] == obj.article){
                        var list = componentArtMap[key];
                        for(var j in list){
                                obj = list[j];
                                underSupplyOverSupplyDet(dataObj, obj, over_supply, under_supply, sobj, lobj, yetToReceive, received, checkCount, true);
                        }
                        }
                        }
                }else{
                       underSupplyOverSupplyDet(dataObj, data[i], over_supply, under_supply, sobj, lobj, yetToReceive, received, checkCount, false);
                }
		if(receiveFlag)
		received.push(data[i]);
		else
		yetToReceive.push(data[i]);
        
		if((data[i].overlay_qty||'') != 0){
			 if(source_flag =='P')    			//for Defect 7414
				{
				
				 over_under_layQty = Number(data[i].overlay_qty)* Number (obj.om);
				}
			else
				{
				
				over_under_layQty = Number(data[i].overlay_qty);
				}
			
			if(over_under_layQty < 0){
				over_lay.push(data[i]);
				dataObj.over_under_lay_flag = true;
				data[i].over_or_under_class_lay = 'valueDown';
				data[i].over_under_layQty = -(over_under_layQty %1 > 0 ? (over_under_layQty).toFixed(3) : over_under_layQty);
				lobj.push(data[i]);
			}else if(over_under_layQty>0){
				under_lay.push(data[i]);
				dataObj.over_under_lay_flag = true;
				data[i].over_or_under_class_lay = 'valueUp';
				data[i].over_under_layQty = (over_under_layQty%1 > 0 ? (over_under_layQty).toFixed(3) : over_under_layQty);
				lobj.push(data[i]);
			}
		}
		if(dept!='' && dept !=undefined && !tempMap.hasOwnProperty(dept)){
			tempMap[dept] = dept;
			if(tempArray.length < 3){
				temp =' <strong>'+(tempArray.length > 0 ? ', ':'')+''+data[i]['department_name']+'</strong> ';
			}else if(tempArray.length == 3){
				temp ='<a  class="moreNumber" id="deptMore">CONTENTMORE more</a><label class="hideBlock remain-dept"><strong>, '+data[i]['department_name']+' </strong>';
			}else{
				temp ='<strong>, '+data[i]['department_name']+' </strong>';
			}
			tempArray.push(temp);
		}
		
		
		
	}
	if(checkCount > 0)
	dataObj.tempFlag = 'Y';
	else
	dataObj.tempFlag = 'N';
	if(tempArray.length>0){
		cont ='<label class="articlePriceLabel">Department:'+ tempArray.join(' ').replace('CONTENTMORE',(tempArray.length-3)) +'</label>';
	}
	dataObj.sobj = sobj;
	dataObj.lobj = lobj;
	
	dataObj.deptCont = cont;
	dataObj.received_cnt = received.length;  
	dataObj.yet_to_receive_cnt = yetToReceive.length;
	dataObj.received_art = received;  
	dataObj.yet_to_receive_art = yetToReceive;
	
	dataObj.over_lay_cnt = over_lay.length;  
	dataObj.under_lay_cnt = under_lay.length;
	dataObj.over_under_lay_cnt = (dataObj.over_lay_cnt + dataObj.under_lay_cnt);
	dataObj.under_lay_art = under_lay;
	dataObj.over_lay_art = over_lay;
	
	dataObj.over_supply_cnt = over_supply.length;  
	dataObj.under_supply_cnt = under_supply.length;
	dataObj.over_under_supply_cnt = (dataObj.over_supply_cnt + dataObj.under_supply_cnt);
	dataObj.over_supply_art = over_supply;
	dataObj.under_supply_art = under_supply;
	
	dataObj.totOrderQty = totOrderQty;
	dataObj.totDispQty = totDispQty;
	dataObj.totReceQty = totReceQty;
	//R18.01 Defect_12600 - Fix
	totalCartonsReceivedERA = totReceQty;
	totalCartonsOrderedERA = totOrderQty;
	
	dataObj.totWeightReceived = (totWeightReceived!= 0 ? Number(totWeightReceived).toFixed(3) : totWeightReceived);
	dataObj.totWeightDispatched = (totWeightDispatched != 0 ? Number(totWeightDispatched).toFixed(3) : totWeightDispatched);
	dataObj.max_line_number = max_line_number;
	current_line_count = max_line_number;
	//dataObj.tot_art = totWeightDispatched;
	
	//R18.01 Defect_10319 - Fix
	dataObj.ssccCartonReceived = (salesOrg==1060 && era_prof=="Y")?ssccCartonReceived.length:'NA';
	dataObj.ssccCartonOrdered =  (salesOrg==1060 && era_prof=="Y")?ssccCartonOrdered.length:'NA';
	
};
function underSupplyOverSupplyDet(dataObj, obj, over_supply, under_supply, sobj, lobj, yetToReceive, received, checkCount, isCompArticle){
        
        var totalOrderedUnits = '';
	var totalReceivedUnits = '';
        var totalDispUnits = '';
	var receiveFlag = false;
	var dispFlag = false;
        var totOrderQty = '';
	var totDispQty = '';
	var totReceQty = '';
	var receQty = '';
        var totWeightReceived = '';
	var totWeightDispatched = '';
        var diff_receive = 0;
	if(obj.order_qty!=null && obj.order_qty!=undefined && obj.order_qty.toString()!=''){
			order_qty = Number(obj.order_qty);
			totOrderQty = Number(totOrderQty) + Number(order_qty);
		}
                
                if(obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty.toString()!=''){
			totDispQty = Number(totDispQty) + Number(obj.dispatched_qty);
			dispFlag = true;
		}else{
			dispFlag = false;
		}
		
		if(obj.rnd_wgt!=null && obj.rnd_wgt!=undefined && obj.rnd_wgt.toString()!=''){
			totWeightReceived = Number(totWeightReceived) + Number(obj.rnd_wgt);
		}
		if(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined && obj.dispathced_wgt.toString()!=''){
			totWeightDispatched = Number(totWeightDispatched) + Number(obj.dispathced_wgt);
		}
		if(salesOrg==1060 && era_prof=="Y" && !isCompArticle){
                if(obj.sscc_carton_status == 'Received'){
			receQty = Number(obj.received_qty);
			totReceQty = Number(totReceQty) + Number(receQty);
			receiveFlag = true;
                }else if(obj.sscc_carton_status == 'NotReceived'){
			receiveFlag = false;
                }   
                }else{
		if(obj.received_qty!=null && obj.received_qty!=undefined && obj.received_qty.toString()!='' && dataObj.hdrObj.order_status == "RECEIVED"){
			receQty = Number(obj.received_qty);
			totReceQty = Number(totReceQty) + Number(receQty);
			receiveFlag = true;
		}else if(obj.display_article_flag == 'Y' && obj.article_status == 'Received'){
			receiveFlag = true;
		}else{
                receiveFlag = false;
                }
                }                                 
               
		
		
		var qty = '';
		var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
		var order_uom = ((obj.order_uom||'')!='' ? obj.order_uom : '');
		var om =  ((obj.om||'')!='' ? obj.om:1);//for defect 2281
		var totalOrdermultiple = (obj.pack_size || 0);
                var totalReceivedmultiple = (obj.recv_om || 0);
                multiple = (order_uom == baseUom) ? 1 : Number(om);
		qty = ((obj.order_qty||'')!='' ? obj.order_qty : 0);
		totalOrderedUnits = qty*totalOrdermultiple;
		//Defect_4554
		//totalOrderedUnits = isST(commonOrder.order_type) && ((obj.ordered_pi_qty||'') != '') ? Number(obj.ordered_pi_qty||'') : totalOrderedUnits;
		if(obj.recv_om != null && obj.recv_om.toString() != "")
		om =(obj.recv_om || '');
		multiple = (order_uom == baseUom) ? 1 : Number(om);		
		qty = ((obj.received_qty||'')!='' ? obj.received_qty : 0);
		totalReceivedUnits = qty*totalReceivedmultiple;
		//Defect_4554
		//totalReceivedUnits = isST(commonOrder.order_type) && ((obj.received_pi_qty||'') != '') ? Number(obj.received_pi_qty||'') : totalReceivedUnits;
		if(obj.dispatched_om != null && obj.dispatched_om.toString() != "" )
		om =(obj.dispatched_om || '');		
		qty = ((obj.dispatched_qty||'')!='' ? obj.dispatched_qty : 0);
		totalDispUnits = ((obj.dispatched_qty||'')!='' ? qty*om : '');
		
		(obj.temperature_range_code||'' =='CH' || obj.temperature_range_code||''=='HF') ? checkCount++ :'';
		if(receiveFlag || dispFlag){

			if(dispFlag){
				diff_receive = (totalOrderedUnits - totalDispUnits);
				dataObj.over_under_supply_reas = 'D';
			}else /*if(receiveFlag)*/{
           // }if(receiveFlag){
				diff_receive = (totalOrderedUnits - totalReceivedUnits);
				dataObj.over_under_supply_reas = 'R';
			}
            diff_receive = (diff_receive != '' && diff_receive != '0' &&
            		diff_receive.toString().indexOf('.') != '-1')?diff_receive.toFixed(3):diff_receive.toFixed(0);
			if(diff_receive < 0){
                        over_supply.push(obj);
                        dataObj.over_under_supply_flag = true;
                        obj.over_or_under_class_sup = 'valueUp';//Defect 2584
                        obj.over_or_under_supply_qty = -(diff_receive);
                        dataObj.over_under_supply_comp_flag  = (isCompArticle)?true:dataObj.over_under_supply_comp_flag; 
                        sobj.push(obj);
			}else if(diff_receive>0){
                        under_supply.push(obj);
                        dataObj.over_under_supply_flag = true;
                        obj.over_or_under_class_sup = 'valueDown';//Defect 2584
                        obj.over_or_under_supply_qty = (diff_receive);
                        dataObj.over_under_supply_comp_flag  = (isCompArticle)?true:dataObj.over_under_supply_comp_flag;
                        sobj.push(obj);
			}
		}
			/*if(receiveFlag && !isCompArticle)
			received.push(obj);
			else if(!isCompArticle)
			yetToReceive.push(obj);
		}else if(!isCompArticle){
			yetToReceive.push(obj);
		};*/
      
		obj.newOrderTot = totalOrderedUnits;
		obj.newDispTot = totalDispUnits;
		obj.newReceTot = totalReceivedUnits;
}

/*

var setSegHdrInfoDtls = function(dataObj,data){
	
	var tempMap ={};
	var tempArray =[];
	var cont ='';
	var dept ='';
	var temp ='';
	var totOrderQty = '';
	var totDispQty = '';
	var totReceQty = '';
	var receQty = '';
	var yetToReceive = [];
	var received = [];
	var sobj = [];
	var lobj = [];
	var over_lay = [];
	var under_lay = [];
	var over_supply = [];
	var under_supply = [];
	var suggested_qty = 0;
	var demand_qty = 0;
	var over_under_layQty = 0;
	var diff_receive = 0;
	var totWeightReceived = '';
	var totWeightDispatched = '';
	var tot_art_cnt = data.length;
	var totalOrderedUnits = '';
	var totalReceivedUnits = '';
	var totalDispUnits = '';
	var receiveFlag = false;
	var dispFlag = false;
    var compFlag = false;
    var componentArtMap =  dataObj['itemCompObjMap'];
	dataObj.tot_art_cnt = tot_art_cnt;
	var checkCount= 0;
	
	for(var i =0;i<tot_art_cnt;i++){
                suggested_qty += Number(data[i].overlay_qty);
		demand_qty += Number(data[i].demand_qty);
		var obj = data[i];
		temp ='';
		dept = (data[i]['department_no']||'');
		if(data[i].order_qty!=null && data[i].order_qty!=undefined && data[i].order_qty.toString()!=''){
			order_qty = Number(data[i].order_qty);
			totOrderQty = Number(totOrderQty) + Number(order_qty);
		}
		if(salesOrg==1060 && era_prof=="Y"){
                if(data[i].sscc_carton_status == 'Received'){
			receQty = Number(data[i].received_qty);
			totReceQty = Number(totReceQty) + Number(receQty);
			receiveFlag = true;
                }else if(data[i].sscc_carton_status == 'NotReceived'){
			receiveFlag = false;
                }   
                }else{
		if(data[i].received_qty!=null && data[i].received_qty!=undefined && data[i].received_qty.toString()!=''){
			receQty = Number(data[i].received_qty);
			totReceQty = Number(totReceQty) + Number(receQty);
			receiveFlag = true;
		}else if(data[i].display_article_flag == 'Y' && data[i].article_status == 'Received'){
			receiveFlag = true;
		}else{
                receiveFlag = false;
                }
                }                                 
               
		if(data[i].dispatched_qty!=null && data[i].dispatched_qty!=undefined && data[i].dispatched_qty.toString()!=''){
			totDispQty = Number(totDispQty) + Number(data[i].dispatched_qty);
			dispFlag = true;
		}else{
			dispFlag = false;
		}
		
		if(data[i].rnd_wgt!=null && data[i].rnd_wgt!=undefined && data[i].rnd_wgt.toString()!=''){
			totWeightReceived = Number(totWeightReceived) + Number(data[i].rnd_wgt);
		}
		if(data[i].dispathced_wgt!=null && data[i].dispathced_wgt!=undefined && data[i].dispathced_wgt.toString()!=''){
			totWeightDispatched = Number(totWeightDispatched) + Number(data[i].dispathced_wgt);
		}
		
		
		var qty = '';
		var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
		var order_uom = ((obj.order_uom||'')!='' ? obj.order_uom : '');
		var om =  ((obj.om||'')!='' ? obj.om:1);//for defect 2281
		var totalOrdermultiple = (obj.pack_size || 0);
                var totalReceivedmultiple = (obj.recv_om || 0);
                multiple = (order_uom == baseUom) ? 1 : Number(om);
		qty = ((obj.order_qty||'')!='' ? obj.order_qty : 0);
		totalOrderedUnits = qty*totalOrdermultiple;
		if(obj.recv_om != null && obj.recv_om.toString() != "")
		om =(obj.recv_om || '');
		multiple = (order_uom == baseUom) ? 1 : Number(om);
		if(obj.received_qty == null && obj.received_qty_uom == null && obj.display_article_flag == "Y"){
		compFlag = true;
		}else{
		qty = ((obj.received_qty||'')!='' ? obj.received_qty : 0);
		totalReceivedUnits = qty*totalReceivedmultiple;	
		}
		
		if(obj.dispatched_om != null && obj.dispatched_om.toString() != "" )
			om =(obj.dispatched_om || '');
		
		qty = ((obj.dispatched_qty||'')!='' ? obj.dispatched_qty : 0);
		totalDispUnits = qty*om;
		
		(data[i].temperature_range_code||'' =='CH' || data[i].temperature_range_code||''=='HF') ? checkCount++ :'';
		if(receiveFlag || dispFlag || compFlag){
		
			//diff_receive = (totalOrderedUnits - totalReceivedUnits);
			if(dispFlag){
				//diff_receive = (totalDispUnits - totalReceivedUnits);
				diff_receive = (totalOrderedUnits - totalDispUnits);
				dataObj.over_under_supply_reas = 'D';
			}else if(receiveFlag){
				diff_receive = (totalOrderedUnits - totalReceivedUnits);
				dataObj.over_under_supply_reas = 'R';
			}
                        diff_receive = diff_receive.toFixed(0);
			if(diff_receive < 0 &&(dispFlag || receiveFlag)){
                        over_supply.push(data[i]);
                        dataObj.over_under_supply_flag = true;
                        data[i].over_or_under_class_sup = 'valueUp';//Defect 2584
                        data[i].over_or_under_supply_qty = -(diff_receive);
                        sobj.push(data[i]);
			}else if(diff_receive>0  &&(dispFlag || receiveFlag)){
                        under_supply.push(data[i]);
                        dataObj.over_under_supply_flag = true;
                        data[i].over_or_under_class_sup = 'valueDown';//Defect 2584
                        data[i].over_or_under_supply_qty = (diff_receive);
                        sobj.push(data[i]);
			}
                       
                        if(compFlag && !jQuery.isEmptyObject(componentArtMap)){
                        
                        
                        for(key in componentArtMap){
                        if(key != '' && componentArtMap[key] != '' && key.split("_")[0] == obj.article){
                        var list = componentArtMap[key];
                        for(var j in list){
                        var totalOrdermultiple = (list[j].pack_size || 0);
                        var totalReceivedmultiple = (list[j].recv_om || 0);                              
                        qty = ((list[j].order_qty||'')!='' ? list[j].order_qty : 0);
                        totalOrderedUnits = qty*totalOrdermultiple;
                        qty = ((list[j].received_qty||'')!='' ? list[j].received_qty : 0);
                        totalReceivedUnits = qty*totalReceivedmultiple;
                        
                       
                        
                        if(obj.dispatched_om != null && obj.dispatched_om.toString() != "" )
                        om =(obj.dispatched_om || '');		
                        qty = ((obj.dispatched_qty||'')!='' ? obj.dispatched_qty : 0);
                        totalDispUnits = qty*om;
                        
                        if(dispFlag){
                        //diff_receive = (totalDispUnits - totalReceivedUnits);
                        diff_receive = (totalOrderedUnits - totalDispUnits);
                        dataObj.over_under_supply_reas = 'D';
                        list[j].over_under_supply_reas = 'D';
                        }else if(receiveFlag || compFlag){
                        diff_receive = (totalOrderedUnits - totalReceivedUnits);
                        dataObj.over_under_supply_reas = 'R';
                        list[j].over_under_supply_reas = 'R';
                        }
                        diff_receive = diff_receive.toFixed(0);
                        if(diff_receive < 0){
                        over_supply.push(list[j]);
                        dataObj.over_under_supply_flag = true;
                        list[j].over_under_supply_flag = true;
                        list[j].over_or_under_class_sup = 'valueUp';//Defect 2584
                        list[j].over_or_under_supply_qty = -(diff_receive);
                        
                        list[j].newOrderTot = totalOrderedUnits;
                        list[j].newDispTot = totalDispUnits;
                        list[j].newReceTot = totalReceivedUnits;
                         sobj.push(list[j]);				
                        }else if(diff_receive>0){
                                under_supply.push(list[j]);
                                dataObj.over_under_supply_flag = true;
                                list[j].over_under_supply_flag = true;
                                list[j].over_or_under_class_sup = 'valueDown';//Defect 2584
                                list[j].over_or_under_supply_qty = (diff_receive);
                                
                                list[j].newOrderTot = totalOrderedUnits;
                        list[j].newDispTot = totalDispUnits;
                        list[j].newReceTot = totalReceivedUnits;
                                sobj.push(list[j]);
                        }
                        
                        }
                        }
                        }
                        }
			
			if(receiveFlag)
			received.push(data[i]);
			else
			yetToReceive.push(data[i]);
		}else{
			yetToReceive.push(data[i]);
		};
      
		data[i].newOrderTot = totalOrderedUnits;
		data[i].newDispTot = totalDispUnits;
		data[i].newReceTot = totalReceivedUnits;
		if((data[i].overlay_qty||'') != 0){
			 if(source_flag =='P')    			//for Defect 7414
				{
				
				 over_under_layQty = Number(data[i].overlay_qty)* Number (obj.om);
				}
			else
				{
				
				over_under_layQty = Number(data[i].overlay_qty);
				}
			
			
			if(over_under_layQty < 0){
				over_lay.push(data[i]);
				dataObj.over_under_lay_flag = true;
				data[i].over_or_under_class_lay = 'valueDown';
				data[i].over_under_layQty = -(over_under_layQty %1 > 0 ? (over_under_layQty).toFixed(3) : over_under_layQty);
				lobj.push(data[i]);
			}else if(over_under_layQty>0){
				under_lay.push(data[i]);
				dataObj.over_under_lay_flag = true;
				data[i].over_or_under_class_lay = 'valueUp';
				data[i].over_under_layQty = (over_under_layQty%1 > 0 ? (over_under_layQty).toFixed(3) : over_under_layQty);
				lobj.push(data[i]);
			}
		}
		if(dept!='' && dept !=undefined && !tempMap.hasOwnProperty(dept)){
			tempMap[dept] = dept;
			if(tempArray.length < 3){
				temp =' <strong>'+(tempArray.length > 0 ? ', ':'')+''+data[i]['department_name']+'</strong> ';
			}else if(tempArray.length == 3){
				temp ='<a  class="moreNumber" id="deptMore">CONTENTMORE more</a><label class="hideBlock remain-dept"><strong>, '+data[i]['department_name']+' </strong>';
			}else{
				temp ='<strong>, '+data[i]['department_name']+' </strong>';
			}
			tempArray.push(temp);
		}
	}
	if(checkCount > 0)
	dataObj.tempFlag = 'Y';
	else
	dataObj.tempFlag = 'N';
	if(tempArray.length>0){
		cont ='<label class="articlePriceLabel">Department:'+ tempArray.join(' ').replace('CONTENTMORE',(tempArray.length-3)) +'</label>';
	}
	dataObj.sobj = sobj;
	dataObj.lobj = lobj;
	
	dataObj.deptCont = cont;
	dataObj.received_cnt = received.length;  
	dataObj.yet_to_receive_cnt = yetToReceive.length;
	dataObj.received_art = received;  
	dataObj.yet_to_receive_art = yetToReceive;
	
	dataObj.over_lay_cnt = over_lay.length;  
	dataObj.under_lay_cnt = under_lay.length;
	dataObj.over_under_lay_cnt = (dataObj.over_lay_cnt + dataObj.under_lay_cnt);
	dataObj.under_lay_art = under_lay;
	dataObj.over_lay_art = over_lay;
	
	dataObj.over_supply_cnt = over_supply.length;  
	dataObj.under_supply_cnt = under_supply.length;
	dataObj.over_under_supply_cnt = (dataObj.over_supply_cnt + dataObj.under_supply_cnt);
	dataObj.over_supply_art = over_supply;
	dataObj.under_supply_art = under_supply;
	
	dataObj.totOrderQty = totOrderQty;
	dataObj.totDispQty = totDispQty;
	dataObj.totReceQty = totReceQty;
	dataObj.totWeightReceived = (totWeightReceived!= 0 ? Number(totWeightReceived).toFixed(3) : totWeightReceived);
	dataObj.totWeightDispatched = (totWeightDispatched != 0 ? Number(totWeightDispatched).toFixed(3) : totWeightDispatched);;
	//dataObj.tot_art = totWeightDispatched;
};*/

var setTotalPallets= function(dataObj,data){
	var total_pallets_recvd = '';
	var total_pallets_returned = '';
	for(var i =0;i<data.length;i++){
		if((data[i].total_pallets_recvd!=null && data[i].total_pallets_recvd!=undefined && data[i].total_pallets_recvd.toString()!=''))
			total_pallets_recvd = Number(total_pallets_recvd) + Number(data[i].total_pallets_recvd);
			
		if((data[i].total_pallets_recvd!=null && data[i].total_pallets_recvd!=undefined && data[i].total_pallets_recvd.toString()!=''))
			total_pallets_returned = Number(total_pallets_returned) +  Number(data[i].total_pallets_returned);
	}
	dataObj.total_pallets_recvd = total_pallets_recvd;
	dataObj.total_pallets_returned = total_pallets_returned;
};

function loadCreateOrderContent(){
	var $elem = $('#create-tab');
	$.ajax({
	    type: "get",
	    url: 'getCreateOrderContent.htm',
	    data: {},
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  appendCreateContent($elem,data);
	  }).fail(function(data) {
		  if(data.status == 404)
			  window.location.replace(homeLink);  
		  $.fn.showCustomMsg([ngboSessErrCode],error);
		  stopLoading();
	  }).always(function() {
		  bindOnloadEventsForCreateOrders();
	  });
}

function appendCreateContent($elem,data){
	$elem.addClass('hideBlock');
	$elem.html(data);
	if(!$elem.hasClass('.ui-tabs')){
		$elem.tabs();
	}
	$elem.removeClass('hideBlock');
	loadCreateJs();
	generateTbIndex();
}

function tblConfObjNoti(data){
	this.option = 'build';
	this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','total_cartons'];
	this.table_name = 'notification_tbl';
	this.table_title = 'List of Stock Transfers (IBT Out) and Cancelled orders';
	this.table_class = ' ContentTable actionRows';
	this.header_tr_class = 'collapsed';
	this.header_name = {order_no:'Order #',delivery_date:'Delivery Date',order_status:'Status',supplier_name:'Supplier',order_type:'Type',total_cartons:'Total Cartons'},
	this.header_data_type = {order_no:'char',delivery_date:'date',order_status:'char',supplier_name:'char',order_type:'char',total_cartons:'number'},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',total_cartons:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',total_cartons:'lastColumn numberColumn '},
	this.header_title = {},
	this.header_width = {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',total_cartons:'7%'},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',total_cartons:' lastColumn numberColumn '},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'mobi_date',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',total_cartons:'removeNull'},
	this.content_width =  {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',total_cartons:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.content =  data;
    this.cont_data_function = {order_no:showOrderNo};
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	if(canViewOrderDetail){
		this.content_bind_event = {click: getOrderDetail};
	}else{
		this.content_bind_event = {click: ''};
	}
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}

var showOrderQty = function(obj,key){
	var qty = '';
	var order_uom = ((obj.order_uom||'')!='' ? obj.order_uom : '');
	if(key== undefined || key =='' || key =='order'){
		qty = ((obj.order_qty!=null && obj.order_qty!=undefined) ? obj.order_qty : '');
		obj.newOrderQty= qty;
	}else if(key == 'disp'){
		qty = ((obj.dispatched_qty!=null && obj.dispatched_qty!=undefined) ? obj.dispatched_qty : '');
		obj.newDispQty = qty;
		order_uom = (obj.dispatched_qty_uom||'');
	}else{ 
		qty = ((obj.received_qty!=null && obj.received_qty!=undefined) ? obj.received_qty : '');
		obj.newReceQty = qty;
		order_uom = (obj.received_qty_uom||'');
	}	
	//return qty.toString()=='' ? 'NA' : ((qty)+' '+order_uom);
	    var returnQty =  qty.toString()=='' ? 'NA' : (((qty.toString().indexOf('.') != "-1")?Number(qty).toFixed(3):qty)+' '+order_uom);	        
	    if(obj.display_article_flag == 'Y' && isAuth(headerObj.hdrObj.order_status)){
        returnQty =(returnQty =='NA'?'':returnQty);        
        return returnQty +'<a class="showComponentClass newWindowDisPre"><label class="linkBtn" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'></label></a>';
        }else  return returnQty;
};

var showOrderTotQty = function(obj,key){
	var qty = '';
	var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
	var order_uom = ((obj.order_uom||'')!='' ? obj.order_uom : '');
	var om = '0';//for defect 2281
	var tot = '';
	var multiple = 1;
	if(obj.recv_om != null && obj.recv_om.toString() != "" && key == 'rece')
		om =(obj.recv_om || '');
	else if(obj.dispatched_om != null && obj.dispatched_om.toString() != "" && key == 'disp')
		om =(obj.dispatched_om || '');
	else if(obj.om != null && obj.om.toString() != "" && (key== undefined || key =='' || key =='order'))
		om =((obj.om!=undefined && obj.om!=null) ? obj.om: '');
	multiple = Number(om);
	if(key== undefined || key =='' || key =='order'){
		qty = ((obj.order_qty!=null && obj.order_qty!=undefined) ? obj.order_qty : '');
		obj.newOrderTot = qty.toString() == '' ? '' : qty*multiple;
	}else if(key == 'disp'){
		qty = ((obj.dispatched_qty!=null && obj.dispatched_qty!=undefined) ? obj.dispatched_qty : '');
		obj.newDispTot = qty.toString() == '' ? '' : qty*multiple;
	}else{ 
		qty = ((obj.received_qty!=null && obj.received_qty!=undefined) ? obj.received_qty : '');
		obj.newReceTot = qty.toString() == '' ? '' : qty*multiple;
		
	}
    //17.06 Random Weight Article Total Units Display Changes
    if(obj.random_wt_flag !=  undefined  && obj.random_wt_flag == 'Y'){ 
    	if(key== undefined || key =='' || key =='order'){
    			var totOrdQtyFromService = multiple * Number(obj.order_qty); 
    			totOrdQtyFromService =(totOrdQtyFromService =='NA'?'':(totOrdQtyFromService.toString().indexOf('.') != "-1")
    					?Number(totOrdQtyFromService).toFixed(3):totOrdQtyFromService);
                var tot_units_ordered =(obj.order_qty!=null && obj.order_qty!="")?(totOrdQtyFromService)+" "+
    	        ((obj.order_qty!=null && obj.order_qty!="" && baseUom!=null && baseUom!="")? baseUom:''):'';
    	        //Defect_4554  Defect_12081 - Fix
    	        var tot_ord_rand_wght_units =  isST(commonOrder.order_type) && ((obj.ordered_pi_qty||'') != '') ?
                    		('<br> ('+ (obj.ordered_pi_qty||'') +' '+ obj.pi_uom +')') : ((obj.pi_om != '' && obj.order_qty != '' &&
        			obj.pi_uom != '')? ('<br> '+ randomWghtTotUnits(obj, obj.order_qty, order_uom)):'');
                return tot_units_ordered.toString() == '' ? 'NA' : ((tot_units_ordered)+' '+tot_ord_rand_wght_units);
    	}else if(key == 'disp'){
                var tot_units_dispatched =(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined)?(Number(obj.dispathced_wgt).toFixed(3))+" "+
    	        ((obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined && baseUom!=null && baseUom!="")? baseUom:''):'NA';
    	        // Defect_12081 - Fix
                var tot_dispt_rand_wght_units = (obj.pi_om != '' && obj.dispatched_qty != null && obj.dispatched_qty != '' &&
    			obj.pi_uom != '')?('<br> '+randomWghtTotUnits(obj, Number(obj.dispatched_qty), obj.dispatched_qty_uom)) :'';
                return tot_units_dispatched.toString() == '' ? 'NA' : ((tot_units_dispatched)+' '+tot_dispt_rand_wght_units);
    	}else{ 
                var tot_recv_rand_wght_units = (obj.rnd_wgt!=null && obj.rnd_wgt!="")?Number(obj.rnd_wgt).toFixed(3)+" "+
                        ((obj.rnd_wgt!=null && obj.rnd_wgt!="" && baseUom!=null && baseUom!="")? baseUom:''):'';
				//Defect_4554,  Defect_12081 - Fix
                var tot_units_recvd = isST(commonOrder.order_type) && ((obj.received_pi_qty||'') != '') ? ('<br> ('+ (obj.received_pi_qty||'') +' '+ obj.pi_uom +')') : ((obj.pi_om != null && obj.pi_om != '' && obj.received_qty != null && obj.received_qty != '' && 
    			obj.pi_uom != '')?('<br> '+ randomWghtTotUnits(obj, Number(obj.received_qty), obj.received_qty_uom) ):'');
       			return (tot_units_recvd.toString() == '') ?((obj.received_qty == '0')?(obj.received_qty+' '+(baseUom)):'NA')
        		:((tot_recv_rand_wght_units)+' '+tot_units_recvd);
    	}			
    }
    //R18.01 - Meat Co - Weighted Article Receiving - Changes
    else if(obj.weight_flag !=  undefined  && obj.weight_flag == 'Y' && key == 'disp'){
    	tot = obj.dispathced_wgt;
        tot = (tot != null && tot != '' && tot.toString().indexOf('.') != -1)?tot.toFixed(3):tot;
        return tot.toString() == '' ? 'NA' : ((tot)+' '+baseUom);
    }else if(obj.weight_flag !=  undefined  && obj.weight_flag == 'Y' && key == 'rece'){
    	tot = (obj.rnd_wgt != '' && obj.rnd_wgt != undefined &&  obj.rnd_wgt.toString()!='')?obj.rnd_wgt : obj.dispathced_wgt;
        tot = (tot != null && tot != '' && tot.toString().indexOf('.') != -1)?tot.toFixed(3):tot;
        return tot.toString() == '' ? 'NA' : ((tot)+' '+baseUom);
    }  
    else{
    	tot = qty.toString() == '' ? '' : qty * multiple;
        tot = (tot != null && tot != '' && tot.toString().indexOf('.') != -1)?tot.toFixed(3):tot;
        return tot.toString() == '' ? 'NA' : ((tot)+' '+baseUom);
    }
};

var showDispQty = function(obj){
        var dispQty = showOrderQty(obj,'disp');
        if(obj.display_article_flag == 'Y' && (isDispatch(headerObj.hdrObj.order_status) || isDispatch(curStatus))){
        dispQty =(dispQty =='NA'?'':dispQty);        
        return dispQty +'<a class="showComponentClass newWindowDisPre"><label class="linkBtn" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'></label></a>';
        }else  return dispQty;	
};

var showOmItem = function(obj){
	var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
	var om = /*((obj.random_wt_flag||'').trim()=='Y' ? ((obj.pi_om||'')!='' ? obj.pi_om:1) : */((obj.om||'')!='' ? obj.om:1)/*)*/;//for defect 2281
	var changedOm = (((obj.recv_om||'')!='' && obj.recv_om != 0) ? obj.recv_om:'');//for defect 2266
	obj.newOm = ((changedOm != '' && changedOm != om) ? changedOm : om); 
	 //17.06 ZEA/ZKG OM Value changes , 12861 - Fix
	//return (obj.newOm+' ' +baseUom);    
	return (((obj.newOm.toString().split('.')[1] > 0)?Number(obj.newOm).toFixed(3): Number(obj.newOm).toFixed(0))+' ' +baseUom
			+ (obj.random_wgt_flg=='Y' ? ('<br>' + (obj.pi_om||'') + ((obj.pi_uom||'')!='' ? (' ('+obj.pi_uom+')') : '')) : ''));
};

var getOmItem =function(){
	return 'newOm';
};
var showDispTotQty = function(obj){
	return showOrderTotQty(obj,'disp');
};

var showReceTotQty = function(obj){
	return showOrderTotQty(obj,'rece');
};

var showReceiveGRQty = function(obj){
	var veiw_label = showOrderQty(obj,'rece');   
	var qty = '<input type="#" value="'+(obj.newReceQty)+'" disabled class="editNumCell textbox textboxDefaultText readonly">';
	var weight = 0;
	var weightCont = '';
	if((obj.random_wt_flag||'').trim()=='Y'){
		weight = obj.rnd_wgt!=null && obj.rnd_wgt!=undefined ? obj.rnd_wgt : (Number((obj.newReceQty||'')) * Number((obj.om||'')));
		obj.tot_weight = weight.toFixed(3);
		weightCont = '<label class="moreInput rece_edit hideBlock"><strong>Total Weight ('+(obj.base_uom||'')+')</strong></label><input type="#" value="'+(obj.tot_weight)+'" class="editNumCell textbox textboxDefaultText">';
	}

	//return '<label class="rece_view">'+veiw_label+'</label><label class="rece_edit hideBlock">'+qty+weightCont+'</label>';
        var grnRecQty = '<label class="rece_view">'+veiw_label+'</label><label class="rece_edit hideBlock">'+qty+weightCont+'</label>';
         if(obj.display_article_flag == 'Y'){
        grnRecQty =(grnRecQty =='NA'?'':grnRecQty);
        /*return receiveQty +'<label class="linkBtn showComponentClass" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'"onclick="showComponentDisplay('+obj.article+')"'><a class="newWindowDisPre"></a></label>';*/
        return grnRecQty +'<label class="linkBtn showComponentClass" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'><a class="newWindowDisPre"></a></label>';
        }        
        else return grnRecQty;
};

//enquiry

var showReceiveQty = function(obj){
    var veiw_label = showOrderQty(obj,'rece');
    if(veiw_label != 'NA'){
    var disabled =''
	var qty = '<input type="#" value="'+(obj.newReceQty)+'"  '+disabled+' class="editNumCell textbox textboxDefaultText readonly">';
	var weight = 0;
	var weightCont = '';
	if((obj.random_wt_flag||'').trim()=='Y'){
		weight = obj.rnd_wgt!=null && obj.rnd_wgt!=undefined ? obj.rnd_wgt : (Number((obj.newReceQty||'')) * Number((obj.om||'')));
		obj.tot_weight = weight.toFixed(3);
		weightCont = '<label class="moreInput rece_edit hideBlock"><strong>Total Weight ('+(obj.base_uom||'')+')</strong></label><input type="#" value="'+(obj.tot_weight)+'" class="editNumCell textbox textboxDefaultText">';
	}
	return '<label class="rece_view">'+veiw_label+'</label><label class="rece_edit hideBlock">'+qty+weightCont+'</label>';
    }else return veiw_label;
};

var showUpdateQtyTextBox = function(obj){     
var receiveQty = '';  
        if(obj.title == 'updateQtyTbl'){
        if(headerObj.hdrObj != "" && headerObj.hdrObj.order_type == "VENDOR"
        && obj.display_article_flag == 'Y'){
            receiveQty =  '';// showReceiveQty(obj);
        }else{
           receiveQty =  showUpdateReceiveQty(obj);    
        } 
        }else{
            receiveQty =  showReceiveQty(obj);    
        }
        if(obj.display_article_flag == 'Y'&&(isReceived(headerObj.hdrObj.order_status) || isPartiallyReceived(headerObj.hdrObj.order_status))){
        receiveQty =(receiveQty =='NA'?'':receiveQty);
        /*return receiveQty +'<label class="linkBtn showComponentClass" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'"onclick="showComponentDisplay('+obj.article+')"'><a class="newWindowDisPre"></a></label>';*/
        return receiveQty +'<a class="showComponentClass newWindowDisPre"><label class="linkBtn" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'></label></a>';
        }        
        else return receiveQty;
}


var getDispQtyData =function(){
	return 'newDispQty';
};
var getDispQtyTotData =function(){
	return 'newDispTot';
};
var getReceQtyData =function(){
	return 'newReceQty';
};
var getReceQtyTotData =function(){
	return 'newReceTot';
};

var getOrderQtyData =function(){
	return 'newOrderQty';
};
var getOrderQtyTotData =function(){
	return 'newOrderTot';
};
function tblConfObjGrInfo(title,data){
	this.option = 'build';this.key = ['article','article_desc','showOmItem','showReceiveGRQty','showReceTotQty'];
	this.table_name = title;this.table_title = '';
	this.table_class = ' ContentTable actionRows';this.header_tr_class = 'collapsed';
	this.header_name = {article:'Article',article_desc:'Description'};
	this.header_data_type = {article:'number',article_desc:'char',showOmItem:'char',showReceiveGRQty:'number',showReceTotQty : 'number'};
	this.header_row_type = {article:'main',article_desc:'main',showOmItem:'main',showReceiveGRQty:'main',showReceTotQty:'main'};
	this.header_sub_rows = {};
	this.header_class = {article:'',article_desc:'',showOmItem:' numberColumn  ',showReceiveGRQty:' numberColumn ',showReceTotQty:' numberColumn  lastColumn '};
	this.header_width = {article:'',article_desc:'',showOmItem:'',showReceiveGRQty:'',showReceiveGRQty:''};
	this.content_class = {article:'',article_desc:'',showOmItem:' numberColumn  ',showReceiveGRQty:' numberColumn ',showReceTotQty:' numberColumn  lastColumn '};
	this.content_format = {article:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',article_desc:'',showOmItem:'',showReceiveGRQty:'',showReceTotQty:''};
	this.tr_id= ['article'];
	this.header_td_label = {showOmItem:'OM',showReceiveGRQty:'Received Qty.',showReceTotQty:'Total Units Received'};
	this.content_label = {};
	this.cont_data_function = {showOmItem:showOmItem,showReceiveGRQty:showReceiveGRQty,showReceTotQty:showReceTotQty};
	this.cont_sort_function = {showOmItem:getOmItem,showReceiveGRQty:showReceiveGRQty,showReceTotQty:getReceQtyTotData};
	this.default_groupbyColumn =['department_no'];
	this.groupbyColumn ={'department_no': 'Department'};
	this.cont_group_data_function = {showQty:showQty};
	this.group_cont_function = {department_no:getOpenItemGrpCont,article:''};
	this.sort_done = {sort_done: orderDetailData};this.page_done = {page_done: orderDetailData};
	this.content_bind_event = {click: ''};this.content_tr_addon = {click: ''};this.content_title = {},this.header_title = {};
	this.content_td_addon = {}; this.header_td_addon = {};
	this.comp_key_parser = {}; this.content =  data;this.pagination = true;this.groupby= false;
	this.recordPerPage= 10;this.groupbyColumn =[];this.filter= false;
	this.filterbyColumn ={article:'article',article_desc:'article_desc',showOmItem:'showOmItem',showReceiveGRQty:'showReceiveGRQty',showReceTotQty:'showReceTotQty'};this.curr_page= 1;this.sort=true;
}

function tblConfObjNonSegItemInfo(title,data,status){
	curStatus=status;
         for(var i =0; i<data.length; i++){
          data[i].title =title;      
        }
	this.option = 'build';
         data.title = title;
    
    if(isCostPriceShow){
    	this.key = ['article','vendor_ref_no','cost_price','article_desc','showOmItem','showOrdQty'];
    }else{
    	this.key = ['article','vendor_ref_no','article_desc','showOmItem','showOrdQty'];
    }
	this.table_name = title/*+'_'+data[0].segment_no*/;this.table_title = 'List of Articles ('+data.length+')';
	this.table_class = ' ContentTable ';this.header_tr_class = 'collapsed';this.content_tr_class = ' mainTr ';
	this.header_name = {article:'Article',vendor_ref_no:'Vendor<br>Ref #',cost_price:'Cost<br>Price',article_desc:'Description'};
	this.header_data_type = {article:'number',vendor_ref_no:'char',cost_price:'number',article_desc:'char',showOmItem:'char',showOrderQty:'number',showOrderTotQty : 'number',showDispQty:'number',showDispTotQty:'number',showReceiveQty:'number',showReceTotQty:'number',newReceiveOm: 'number', newExpDate:'date'};
	this.header_row_type = {article:'main',vendor_ref_no:'main',cost_price:'main',article_desc:'main',showOmItem:'main',showOrdQty:'sub',showDisQty:'sub',showReceQty:'sub',newReceiveOm: 'main', newExpDate:'main'};
	this.header_sub_rows = {showOrdQty:{subKeys: ['showOrderQty','showOrderTotQty']},showDisQty:{colspan : 2, subKeys: ['showDispQty','showDispTotQty']},showReceQty:{colspan : 2, subKeys: ['showReceiveQty','showReceTotQty']}};
	this.header_class = {article:'',vendor_ref_no:'',cost_price:'costClass',article_desc:'',showOmItem:' centerValue columnDivider  ',showOrdQty:' centerValue columnDivider noSort  ',showDisQty:' centerValue columnDivider noSort  ',showReceQty:'  centerValue columnDivider noSort  ',showOrderQty:' centerValue  ',showOrderTotQty : '  centerValue   ',showDispQty:' centerValue  ',showDispTotQty:' centerValue  ',showReceiveQty:' centerValue  ',showReceTotQty:' centerValue  ',newReceiveOm: ' editMode centerValue hideBlock ', newExpDate:' editMode centerValue hideBlock '};
	this.header_width = {article:'',vendor_ref_no:'',cost_price:'',article_desc:'',showOmItem:'',showOrdQty:'',showDisQty:'',showReceQty:'',showOmItem:'',showOrderQty:'',showOrderTotQty : '',showDispQty:'',showDispTotQty:'',showReceiveQty:'',showReceTotQty:'',newReceiveOm: '70px', newExpDate:'70px'};
	this.content_class = {article:'',vendor_ref_no:'',cost_price:'costClass ',article_desc:'',showOmItem:' centerValue columnDivider ',showOrdQty:' centerValue columnDivider noSort  ',showDisQty:' centerValue columnDivider noSort  ',showReceQty:'  centerValue columnDivider noSort  ',showOrderQty:' centerValue  ',showOrderTotQty : '  centerValue  ',showDispQty:' centerValue ',showDispTotQty:' centerValue  ',showReceiveQty:' centerValue ',showReceTotQty:' centerValue  ',newReceiveOm: ' editMode centerValue hideBlock ', newExpDate:' editMode centerValue hideBlock '};
	this.content_format = {article:'removeNull',vendor_ref_no:'removeNull',cost_price:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',vendor_ref_no:'',cost_price:'',article_desc:'',showOmItem:'',showOrdQty:'',showDisQty:'',
        showReceQty:'',showOmItem:'',showOrderQty:'',showOrderTotQty : '',showDispQty:'',showDispTotQty:'',showReceiveQty:'',showReceTotQty:'',newReceiveOm: '', newExpDate:''};
	this.tr_id= ['article','base_uom'];
	this.header_td_label = {showOmItem:'OM',showOrdQty:'Total Units Ordered',showOrdQty:'Ordered',showDisQty:'Dispatched',showReceQty:'Received',showOrderQty:'Qty.',showOrderTotQty:'Total Units',showDispQty:'Qty.',showDispTotQty:'Total Units',showReceiveQty:'Qty.',showReceTotQty:'Total Units',newReceiveOm: 'New OM', newExpDate:'Expiry Date'};	
        if(title == 'received_item_table'){
        this.cont_data_function = {article:articleFunction,newOm:showOmItem,newOrderQty:showOrderQty,newOrderTot:showOrderTotQty,newDispQty:showDispQty,newDispTot:showDispTotQty,newReceQty:showReceiveQty,newReceTot:showReceTotQty,showOmItem:showOmItem,showOrderQty:showOrderQty,showOrderTotQty:showOrderTotQty,showDispQty:showDispQty,showDispTotQty:showDispTotQty
        ,showReceiveQty:showReceiveQtyCmpntDisp,showReceTotQty:showReceTotQtyCmpntDisp,newReceiveOm: newReceiveOm, newExpDate:newExpDate};
	this.cont_sort_function = {showOmItem:getOmItem,showOrderQty:getOrderQtyData,showOrderTotQty:getOrderQtyTotData,showDispQty:getDispQtyData,showDispTotQty:getDispQtyTotData,showReceiveQty:getReceQtyData,showReceTotQty:getReceQtyTotData,newReceiveOm: getNewReceiveOm, newExpDate: getNewExpDate};
        }
        else{
	this.cont_data_function = {article:articleFunction,newOm:showOmItem,newOrderQty:showOrderQty,newOrderTot:showOrderTotQty,newDispQty:showDispQty,newDispTot:showDispTotQty,newReceQty:showReceiveQty,newReceTot:showReceTotQty,showOmItem:showOmItem,showOrderQty:showOrderQty,showOrderTotQty:showOrderTotQty,showDispQty:showDispQty,showDispTotQty:showDispTotQty
        ,showReceiveQty:showUpdateQtyTextBox,showReceTotQty:showReceTotQty,newReceiveOm: newReceiveOm, newExpDate:newExpDate};
        }
	this.cont_sort_function = {showOmItem:getOmItem,showOrderQty:getOrderQtyData,showOrderTotQty:getOrderQtyTotData,showDispQty:getDispQtyData,showDispTotQty:getDispQtyTotData,showReceiveQty:getReceQtyData,showReceTotQty:getReceQtyTotData,newReceiveOm: getNewReceiveOm, newExpDate: getNewExpDate};
       
	if(isDispatch(status)){
		this.key.push('showDisQty');
	}
	if(isReceived(status) || isPartiallyReceived(status) ){
		this.key.push('showDisQty');
		this.key.push('showReceQty');
		this.key.push('newReceiveOm');
		this.key.push('newExpDate');
		this.add_option = true; 
  /*if(isPartiallyReceived(status)){
	$('.articleDetails').find('.sealClass').addClass('hideBlock');
        $('.articleDetails').find('.sealId').addClass('hideBlock'); }*/
	}
	if(salesOrg==1060 && era_prof=="Y" && (status=="DISPATCHED" || status=="RECEIVED" || isPartiallyReceived(status)) )
	{
	this.default_groupbyColumn =['sscc_carton_num'];
	}else
	{
	this.default_groupbyColumn =['department_no'];
	}	
	this.groupbyColumn ={'department_no': 'Department','article':'Article','sscc_carton_num':'SSCC No'};
	this.cont_group_data_function = {showQty:showQty};
	this.group_cont_function = {department_no:getOpenItemGrpCont,article:'',sscc_carton_num:getSSCCItemGrpCont};
	this.sort_done = {sort_done: orderDetailData};this.page_done = {page_done: orderDetailData};
	this.content_bind_event = {click: ''};this.content_tr_addon = {click: ''};this.content_title = {},this.header_title = {};
	this.content_td_addon = {showReceiveQty:{'.receive_qty':{event:{keypress : onlyNumber,change : changeReceiveQty,click : function(){}},display: function(){}},'.receive_weight':{event:{keypress : onlyNumber,change : changeReceiveWgt,click : function(){}},display: function(){}}},newReceiveOm:{'.textbox':{event:{keypress : onlyNumber,change : changeReceOm,click : function(){}},display:function(){}}},newExpDate:{'.inputDate':{event:{keypress : function(){},change : changeExpDate,click : function(){}},display: function(){}},'.moreExp':{event:{keypress : function(){},change : function(){},click : showRemainExp},display: function(){}}}}; this.header_td_addon = {};
	this.comp_key_parser = {}; this.content =  data;this.pagination = true ;this.groupby= true;this.recordPerPage= 10;this.groupbyColumn =[];this.filter= true;
	this.filterbyColumn ={article:'article',vendor_ref_no:'vendor_ref_no',cost_price:'cost_price',article_desc:'article_desc',showOmItem:'showOmItem',showOrderQty:'showOrderQty',showOrderTotQty : 'showOrderTotQty',showDispQty:'showDispQty',showDispTotQty:'showDispTotQty',showReceiveQty:'showReceiveQty',showReceTotQty:'showReceTotQty',newReceiveOm: 'newReceiveOm', newExpDate:'newExpDate'};this.curr_page= 1;this.sort=true;
	this.data_tr_class = {func_class:getArticleTrclass};
	this.data_td_class = {article:getArticleTdclass/*,cost_price:getCostPrice*/};
	this.data_td_class = {article:getArticleTdclassForSeg/*,cost_price:getCostPrice*/};	
}
var articleFunction = function(obj){      
       return article = obj.article;
};

var showComponentDisplay = function(object, fromUpdate){
        var headerData=headerObj;
        //var param = new orderParamForCmpntArticles(headerData.hdrObj.order_no,siteVal,'',headerData.hdrObj.source_flag,'',salesOrg,'',object.article,
        var param = new orderParamForCmpntArticles(((isPO(headerData.hdrObj.order_type) ? headerData.hdrDtlObj[0].delivery_no : headerData.hdrObj.order_no)||headerData.hdrObj.order_no),siteVal,'',headerData.hdrObj.source_flag,'',salesOrg,'',object.article,
        headerObj.hdrObj.order_status, (headerData.itemObj!=undefined && headerData.itemObj.length>0 ? headerData.itemObj[0].order_no : ''));
	$.fn.loadComponentArticlesPopUpDisplay(param, headerObj.hdrObj.order_status, object, fromUpdate);
};
$.fn.loadComponentArticlesPopUpDisplay = function (obj, ordStatus, dispObj, fromUpdate){
		var $popUp = $('#dialog-com-CmpntArticlesDisplay');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_open_CmpntArticlesDisplay));
			$popUp = $('#dialog-com-CmpntArticlesDisplay');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 200,maxHeight: 600,width: 1000});
		}
		$popupCont = $('#dialog-com-CmpntArticlesDisplay .popupData');
               /* var key = (dispObj != "" && dispObj != undefined && dispObj.article != "" && dispObj.sscc_carton_num != ""
                &&  dispObj.sscc_carton_num != null )?dispObj.article+"_"+dispObj.sscc_carton_num:dispObj.article;
                if(fromUpdate && ((key != null && key != "") && componentArtMap[key] != undefined || componentArtMap[key] != '')){
                    var compList = componentArtMap[key];
                    frameCmpntContentDisplay(compList,$popupCont,$popUp, ordStatus, dispObj);     
                }else{*/
                    getCmpntArticlesDisplay(obj,$popupCont,$popUp, ordStatus, dispObj, fromUpdate);              
                //}
                return true;
	};
	
var getCmpntArticlesDisplay = function(param,$hold,$dialog, ordStatus, dispObj, fromUpdate){
	console.log(getcmpntArticlesInfoUrl  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url:  getcmpntArticlesInfoUrl,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(response) {
		  if(checkResult(response,'order_no')){
			  var key = (dispObj != "" && dispObj != undefined && dispObj.article != "" && dispObj.sscc_carton_num != ""
	                &&  dispObj.sscc_carton_num != null )?dispObj.article+"_"+dispObj.sscc_carton_num:dispObj.article;
	                if(response != '' && fromUpdate && ((key != null && key != "") && componentArtMap[key] != undefined || componentArtMap[key] != '')){
	                    componentArtMap[key] = response;
	                   // frameCmpntContentDisplay(compList,$popupCont,$popUp, ordStatus, dispObj);     
	                }
			  frameCmpntContentDisplay(response,$hold,$dialog, ordStatus, dispObj);
		  } 
		  stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  populateWarehouse();
		  stopLoading();
	  });
};
var frameCmpntContentDisplay = function(data,$hold,$dialog, ordStatus, dispObj){
	for(var i =0; i<data.length; i++){
         data[i].confirm_articles ='';      
    }
   if(dispObj.display_article_flag =='Y' && headerObj != '' && headerObj.hdrObj != ''
   &&headerObj.hdrObj.order_type == "WAREHOUSE"&& data != '' && data.length >0){        
        for(var i in data)
        {
                if(data[i].display_article == dispObj.article){                
                        var conversionFactor =  (data[i].order_qty != null && data[i].order_qty != ''
                        && dispObj.order_qty != null &&dispObj.order_qty != '')?Number(data[i].order_qty) /Number(dispObj.order_qty):'';
                        data[i].received_qty = (conversionFactor != '' && dispObj.received_qty != '' && dispObj.received_qty != null)?
                (Number(dispObj.received_qty) * conversionFactor):data[i].received_qty ;
                }
        };
   }
    var obj = new tblCmpntDisplay('componentTable',data, ordStatus);
	$dialog.find('#openCmpntArticlesDisplay').loadtbl(obj);
	$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');	
	$dialog.dialog('open');
	$dialog.dialog('open').parent().addClass('popupWrapper');
	
	/*$dialog.find('#openCmpntArticlesDisplay .receive_qty').within9999();
	$dialog.find('#openCmpntArticlesDisplay .receive_weight').isWithin999Or3Decimal();*/
    //updateBindComponentReceiveCheckBox();
	updateCmpntChngeQty();
};
function updateBindComponentReceiveCheckBox(){
    $('.displayComponentOk').unbind('click');
	$('.displayComponentOk').click(function() {
        $('#openCmpntArticlesDisplay').find('.receive_qty').each(function(){  
        var qty = $(this).closest('tr').find('.receive_qty').val();
        if(headerObj.itemCompObjMap != "" ){
        for(key in headerObj.itemCompObjMap){
           var list = headerObj.itemCompObjMap[key];
           if(list != undefined && list !="")
           for(var i=0; i<list.length; i++){
              if(list[i].article == $(this).closest('tr').find(':first').html()){                   
                  list[i].qty = qty; 
                   list[i].newReceQty = qty;
              }
           }
        }
        }
        });  
        });   
}


function updateCmpntChngeQty(){
 $('#openCmpntArticlesDisplay').find('.receive_qty').on('input', function(){
  var om = 1;
    var totUnits = 0;
    var obj = $(this).closest('tr').data('obj');
    totUnits = Number(obj.om) * Number($(this).closest('tr .receive_qty').val());
    obj.newReceQty= Number($tr.find('.receive_qty').val());   
    $(this).closest('tr').find('.receive_qty input').val($(this).val());
    $(this).closest('tr').find('.recvTotUnits').html('<strong>' + totUnits + '</strong>');   
    return false;
 })
}
/*var getCostPrice = function(obj,$td){
if(isCostPriceShow){
   
	}else{	
    $td.addClass('hideBlock');	
		}
};*/
var getSSCCItemGrpCont = function(obj,confObj){
	//var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if(obj!=null && obj!=undefined){
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">SSCC No: '+(obj.sscc_carton_num||'')+'</td></tr>';
	}
	return cont;
};

var getArticleTrclass = function(obj,$td,$tr){
	if(/*obj.article_life_cycle_info  != 'NA' && obj.article_life_cycle_info  != 'RA' && */obj.article_status_desc != undefined && obj.article_status_desc != ''){
		$tr.addClass('warningIndicator');
	}
};
var getArticleTdclass = function(obj,$td){
	if(/*obj.article_life_cycle_info  != 'NA' && obj.article_life_cycle_info  != 'RA' && */obj.article_status_desc != undefined && obj.article_status_desc != ''){
		$td.attr('title',obj.article_status_desc);
	}	
};

var getArticleTdclassForSeg = function(obj,$td){
	if(/*obj.article_life_cycle_info  != 'NA' && obj.article_life_cycle_info  != 'RA' && */obj.article_status_desc != undefined && obj.article_status_desc != ''){
		$td.attr('title',obj.article_status_desc);
	}	
};


var changeReceiveWgt = function(obj){
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var value = $elem.val().trim();
	if((value||''!='') && ((obj['tot_weight']||'') != value)){
		obj.tot_weight = value;
	}
    //17.06 Random Weight Article Total Units Display Changes
    if(obj.random_wt_flag == 'Y'){
    	 var recvValue =  obj.newReceQty;
    	 var recvWtValue =  $tr.find('.wtTextBoxFix').val();    	
    	 var recvWtRecvBox = (recvWtValue!=null && recvWtValue!="")?Number(recvWtValue).toFixed(3)+" "+
    	    	((recvWtValue!=null && recvWtValue!="" && obj.base_uom!="")? obj.base_uom:''):'NA';
    	 //Defect_12081 - Fix
    	 var totUnitsValue = randomWghtTotUnits(obj, recvValue, obj.received_qty_uom);
         $tr.find('[data_key="showReceTotQty"]').html(recvWtRecvBox+'<br>'+totUnitsValue);
    }       
};

//R18.01 - INC01758736 Defect_12081 - Fix
var randomWghtTotUnits = function(obj, value, uom){
	var randoWghtTotUnits = '';
	if(obj.base_uom == uom){
		randoWghtTotUnits =  (obj.pi_om_base != '' && value != '' && 
	 			obj.pi_uom != '')?'('+ (Number(obj.pi_om_base || '') * Number(value)).toFixed(0) +' '+ obj.pi_uom +')':'';
	}else{
		randoWghtTotUnits = (obj.pi_om != '' && value != '' && 
	 			obj.pi_uom != '')?'('+ (Number(obj.pi_om || '') * Number(value)).toFixed(0) +' '+ obj.pi_uom +')':'';
	}	
 	return randoWghtTotUnits;
};

var showUpdateReceiveQty = function(obj){
	var veiw_label = showOrderQty(obj,'rece');
	var qty = '<input type="#" value="'+(obj.newReceQty)+'" maxlength="14" class="editNumCell textbox textboxDefaultText receive_qty">';
	var weight = 0;
	var weightCont = '';
	if((obj.random_wt_flag||'').trim()=='Y'){
		weight = obj.rnd_wgt!=null && obj.rnd_wgt!=undefined ? obj.rnd_wgt : (Number((obj.newReceQty||'')) * Number((obj.om||'')));
		obj.tot_weight = (obj.tot_weight||'')=='' ? weight.toFixed(3) : obj.tot_weight;
		weightCont = '<label class="moreInput rece_edit"><strong>Total Weight ('+(obj.base_uom||'')+')</strong></label><input type="#" value="'+(obj.tot_weight)+'" class="receive_weight wtTextBoxFix editNumCell textbox textboxDefaultText">';
	}
    return '<label class="rece_edit">'+qty+weightCont+'</label>';
	
};

var changeExpDate = function(e){
	e.stopPropagation();
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var value = $elem.val().trim();
	var data_key = $elem.attr('data_key');
	if((value||''!='') && ((obj[data_key]||'') != value)){
		obj[data_key] = value;
		obj.changed = true;
	}else{
		obj.changed = false;
	}
	if(value== '' && obj.expiry_flag=='Y'){
		$elem.addClass(errorFieldClass).attr('title','Expiry date is mandatory.').tooltip({ position : { my : "left center", at : "right+10 center" } });
		obj.error = true;
	}else if(!(isValidDate(formateDate(value)))){
		$elem.addClass(errorFieldClass).attr('title',datInvalid).tooltip({ position : { my : "left center", at : "right+10 center" } });
		obj.error = true;
	}else{
		removetooltip($elem);
		obj.error = false;
	}
};
var showRemainExp = function(){
	var $elem = $(this);
	var $td = $elem.closest('td');
	var $more = $td.find('.moreExp');
	var $remain = $td.find('.moreExpInput');
	$remain.toggleClass('hideBlock');
	if($remain.hasClass('hideBlock')){
		$more.text('+ more');
	}else{
		$more.text('- less');
	}
};
var changeReceOm = function(){
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var om = obj.newReceOm;
	var value = $elem.val().trim();
	//R18.01 - INC01819616, Defect_12170 - Fix
	if(Number(value) != 0){
	errorMsgUPQ = '';
	var baseuom = obj.base_uom||'';
	var orderuom = obj.order_uom||'';//Added for defect 2583
	var multiple = 1;
	if((baseuom != orderuom))
		{
		if(Number(obj.om) == Number(value))
			{
		multiple =  Number(obj.om);
			}
		else
			multiple =  Number(value);
		}
	
	var tot =(Number(multiple) * obj.newReceQty);
	if((value||''!='') && (om != value)){
		obj.newReceOm = value;
		if(obj.action_code != 'I'){
			var $tbl = $tr.closest('table');
			($tbl.data('confObj').updateObj||'' == '') ? $tbl.data('confObj').updateObj ={} : '';
			$tbl.data('confObj').updateObj[obj.article+'_'+obj.order_uom+'_'+obj.article_line]= obj;
		}
		obj.newReceTot = (tot);
		obj.changed = true;
	}else{
		obj.changed = false;
	}
	tot = (tot != '' && tot.toString().indexOf('.') != -1)?Number(tot).toFixed(3):tot;
	$tr.find('[data_key="showReceTotQty"]').text(tot+' '+baseuom);
	}
	//R18.01 - INC01819616, Defect_12170 - Fix
	else{
		$tr.find('[data_key="newReceiveOm"]').find('input').val(om);
		errorMsgUPQ = 'OM must greater than zero';
		$.fn.showCustomMsg([errorMsgUPQ],error);return false;
	}
	
};

var changeReceiveQty = function(){
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var qty = obj.newReceQty;
	var value = $elem.val().trim();
	var baseuom = obj.base_uom||'';
	var orderuom = obj.order_uom||'';//Added for defect 2583
	var multiple = 1;
	if((baseuom != orderuom))
		{
		if(Number(obj.om) == Number(obj.newReceOm))
			{
		multiple =  Number(obj.om);
			}
		else
			multiple =  Number(obj.newReceOm);
		}
		
	var tot =(Number(value) * multiple);
	if((value||''!='') && (qty != value)){
		obj.newReceQty = value;
		if(obj.action_code != 'I'){
			var $tbl = $tr.closest('table');
			($tbl.data('confObj').updateObj||'' == '') ? $tbl.data('confObj').updateObj ={} : '';
			$tbl.data('confObj').updateObj[obj.article+'_'+obj.order_uom+'_'+obj.article_line]= obj;
		}
		obj.newReceTot = (tot);
		obj.changed = true;
	}else{
		obj.changed = false;
	}
	/*if(obj.random_wt_flag == 'Y') //for defect 2281
		baseuom = 'EA';*/
         //17.06 Random Weight Article Total Units Display Changes
         if(obj.random_wt_flag == 'Y'){
    	 var recvValue = value;
    	 if(recvValue == '0'){
    		 $tr.find('.wtTextBoxFix').val('0');
                 obj.tot_weight = recvValue;
    	 }
    	 var recvWtValue =  $tr.find('.wtTextBoxFix').val();    	
    	 var recvWtRecvBox = (recvWtValue!=null && recvWtValue!="")?Number(recvWtValue).toFixed(3)+" "+
    	    	((recvWtValue!=null && recvWtValue!="" && obj.base_uom!="")? obj.base_uom:''):'NA';
    	 //Defect_12081 - Fix
    	 var totUnitsValue = randomWghtTotUnits(obj, recvValue, obj.received_qty_uom);
        $tr.find('[data_key="showReceTotQty"]').html(recvWtRecvBox+'<br>'+totUnitsValue);
        } else{
        tot = (tot != '' && tot.toString().indexOf('.') != -1)?Number(tot).toFixed(3):tot;
    	$tr.find('[data_key="showReceTotQty"]').text(tot+' '+baseuom);
        }         
         if(obj.display_article != undefined && obj.display_article != '' /*&& isSTO(commonOrder.order_type)*/ && componentArtMap != ''){        
             for(key1 in componentArtMap)
             {
                     if(key1.split("_")[0] == obj.display_article
                             && componentArtMap[key1] != '' && componentArtMap[key1].length >0){
                                     var compList  =  componentArtMap[key1];
                                     for(var i in compList){
                                    	 	if(compList[i].article == obj.article)compList[i] = obj;                                             
                                     }
                             
                     }
             };
         }
};

var getNewExpDate = function(obj){
	return 'newExpDate';
};

var getNewReceiveOm = function(obj){
	return 'newReceOm';
};

var newReceiveOm = function(obj){
	obj.newReceOm = (obj.newReceOm||obj.newOm);
	return '<input type="#" '+((obj.random_wt_flag == 'Y' || obj.order_uom == 'EA' || obj.order_uom == 'KG') ? 'readonly' : '')+' value="'+obj.newReceOm+'" class="editNumCell textbox textboxDefaultText newQty">';
};

var newExpDate = function(obj){
	var newExpDateList = obj.newExpDate;
	var expColumn = '';
	var expLen= 0;
	var expireDateDisable = '';
	if(newExpDateList!=undefined && newExpDateList.length>0){
		expLen = (newExpDateList.length)-1;
		obj.newExpDate = (newExpDateList[0]||'');
		for(var i=0;i<5;i++){
			if(i <= expLen){
				expColumn+='<input type="#" ' + expireDateDisable + ' maxlength="4" placeholder="dd/mm/yyyy" value="'+newExpDateList[i]+'" class="textbox textboxDefaultText inputDate editDateCell exp'+(i+1)+'" data_key="exp'+(i+1)+'">';
			}else{
				expColumn+='<input type="#" ' + expireDateDisable + ' maxlength="4"  placeholder="dd/mm/yyyy" value="" class="textbox textboxDefaultText inputDate editDateCell exp'+(i+1)+'" data_key="exp'+(i+1)+'">';
			}
			if(i==1){
				expColumn+='<label class="linkBtn moreExp"><a class="more">+ more </a></label><span class="more moreExpInput hideBlock">';
			}
			if(i==4){
				expColumn+='</span>';
			}
		}
	}else{
		expColumn+='<input type="#" ' + expireDateDisable + ' maxlength="4"  placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell exp1" data_key="exp1"><label class="linkBtn moreExp"><a class="more">+ more </a></label><span class="more moreExpInput hideBlock"><input maxlength="4"  type="#" ' + expireDateDisable + ' placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell exp2" data_key="exp2">'
		+'<input type="#" ' + expireDateDisable + '  maxlength="4"  placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell exp3" data_key="exp3"><input maxlength="4"  type="#" ' + expireDateDisable + '  placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell exp4" data_key="exp4"><input  maxlength="4"  type="#" ' + expireDateDisable + ' placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell exp5" data_key="exp5"></span>';
	}
	return expColumn;
};
 
var orderDetailData =function($elem){
	//console.log('sort or page');
	/*if($elem!=undefined && $elem.length>0)
		$elem.find('.inputDate').datepicker({ zIndex : 50 });*/
         $('.showComponentClass').unbind('click').bind('click',function(){
                var fromUpdate = false;
        	if($(this).closest('table').prop('id') == 'updateQtyTbl_table'){
        		fromUpdate = true;
        	}
                showComponentDisplay($(this).closest('tr').data('obj'), fromUpdate);
        });
};

function tblConfObjOrderNo(data){
	this.option = 'build';
	this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','source','total_cartons','total_pallets'];
	if(data[0].order_status == openStautus || data[0].order_status == sub){
		key.push('showTime');
	}
	this.table_name = 'open_order_tbl';
	this.table_title = 'List of Open orders to view and update';
	this.table_class = ' ContentTable actionRows';
	this.header_name = {order_no:'Order #',delivery_date:'Delivery Date',order_status:'Status',supplier_name:'Supplier',order_type:'Type',source:'Source',total_cartons:'Total Cartons',total_pallets:'Total Pallets',showTime:'Cut-off Time'},
	this.header_data_type = {order_no:'char',delivery_date:'date',order_status:'char',supplier_name:'char',order_type:'char',source:'char',total_cartons:'number',total_pallets:'number',showTime:'date'},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',source:'main',total_cartons:'main',total_pallets:'main',showTime:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:' numberColumn ',showTime:'lastColumn numberColumn '},
	this.header_title = {},
	this.header_width = {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',showTime:'7%'},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:' numberColumn ',showTime:' lastColumn numberColumn '},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'mobi_date',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',source:'removeNull',total_cartons:'removeNull',total_pallets:'removeNull',showTime:'removeNull'},
	this.content_width =  {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',showTime:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit',showTime:'mobi_data_time'};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.cont_data_function = {showTime:getCuttOff,order_no:showOrderNo};
	this.cont_sort_function = {showTime:getCutOffTime};
	if(canViewOrderDetail){
		this.content_bind_event = {click: getOrderDetail};
	}else{
		this.content_bind_event = {click: ''};
	}
	//this.content_bind_event = {click: getOrderDetail};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}

var getCuttOff = function(obj){
	if(obj.cutOff||'' !='') return obj.cutOff;
	var cutOffDate = (obj.cut_off_date || '');
	//var cutOffTime = formatTime(padzero((obj.cut_off_time || ''),6));
        var cutOffTime = (obj.cut_off_time );
	//var updateTime = new Date();
	obj.cutOff ='';
	obj.updateTime ='';
	if(cutOffDate!= '' && cutOffTime!=''){
		flag = true;
		//obj.cutOff = $.tablebuild.dataparse.mobi_date(cutOffDate)+' '+cutOffTime;
                obj.cutOff = (cutOffDate)+' '+cutOffTime;
		obj.updateTime = cutOffDate+' '+cutOffTime;
	}
	return obj.cutOff;
};

var getCutOffTime = function(){
	return 'updateTime';
};

function tblConfObjFullRecived(data){
	this.option = 'build';
	if(temperatureDisableFlg){
		this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','source','total_cartons','total_pallets'];
	}else{
		this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','source','total_cartons','total_pallets','chilled_temp_t'];
	}
	this.table_name = 'fully_rece_tbl';
	this.table_title = 'List of Fully Received orders';
	this.table_class = ' ContentTable actionRows';
	this.header_name = {order_no:'Order #',delivery_date:'Delivery Date',order_status:'Status',supplier_name:'Supplier',order_type:'Type',source:'Source',total_cartons:'Total Cartons',total_pallets:'Total Pallets',chilled_temp_t:'Temperature'},
	this.header_td_label = {chilled_temp_t:'Temperature'};
	this.header_data_type = {order_no:'char',delivery_date:'date',order_status:'char',supplier_name:'char',order_type:'char',source:'char',total_cartons:'number',total_pallets:'number',chilled_temp_t:'char'},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',source:'main',total_cartons:'main',total_pallets:'main',chilled_temp_t:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:'numberColumn ',chilled_temp_t:' temperature'},
	this.header_title = {},
	this.header_width = {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',chilled_temp_t:'7%'},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:' numberColumn ',chilled_temp_t:' temperature'},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'mobi_date',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',source:'removeNull',total_cartons:'removeNull',total_pallets:'removeNull',chilled_temp_t:'removeNull'},
	this.content_width =  {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',chilled_temp_t:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.cont_data_function = {chilled_temp_t:showChilledTemp, order_no:showOrderNo};
	this.cont_sort_function = {chilled_temp_t:getChilledTemp};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	if(canViewOrderDetail){
		this.content_bind_event = {click: getOrderDetail};
	}else{
		this.content_bind_event = {click: ''};
	}
	//this.content_bind_event = {click: getOrderDetail};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	//this.data_td_class = {chilled_temp_t:hideTempForBigW}; 
}

/*var hideTempForBigW = function(obj,$td){
	if(salesOrg==1060){
		$td.addClass('hideBlock');          
	}
};*/

var showChilledTemp = function(obj){
	
	obj.chilled_temp_t=((obj.chilled_temp==undefined || obj.chilled_temp==null)?'':("Chilled:"+obj.chilled_temp))+'</br>'+((obj.frozen_temp==undefined || obj.frozen_temp==null)?'':("Frozen:"+obj.frozen_temp));
	return obj.chilled_temp_t;
	
	
};

var getChilledTemp = function(){
	
	return 'chilled_temp_t';

};

function tblConfObjOpen(data){
	this.option = 'build';
	this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','source','total_cartons','total_pallets','showTime'];
	this.table_name = 'open_order_tbl';
	this.table_title = 'List of Open orders to view and update';
	this.table_class = ' ContentTable actionRows';
	this.header_name = {order_no:'Order #',delivery_date:'Delivery Date',order_status:'Status',supplier_name:'Supplier',order_type:'Type',source:'Source',total_cartons:'Total Cartons',total_pallets:'Total Pallets',showTime:'Cut-off Time'},
	this.header_data_type = {order_no:'char',delivery_date:'date',order_status:'char',supplier_name:'char',order_type:'char',source:'char',total_cartons:'number',total_pallets:'number',showTime:'date'},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',source:'main',total_cartons:'main',total_pallets:'main',showTime:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:' numberColumn ',showTime:'lastColumn numberColumn '},
	this.header_title = {},
	this.header_width = {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',showTime:'7%'},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:' numberColumn ',showTime:' lastColumn numberColumn '},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'mobi_date',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',source:'removeNull',total_cartons:'removeNull',total_pallets:'removeNull',showTime:'removeNull'},
	this.content_width =  {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%',showTime:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.cont_data_function = {showTime:getCuttOff, order_no:showOrderNo};
	this.cont_sort_function = {showTime:getCutOffTime};
	if(canViewOrderDetail){
		this.content_bind_event = {click: getOrderDetail};
	}else{
		this.content_bind_event = {click: ''};
	}
	//this.content_bind_event = {click: getOrderDetail};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.header_td_label = {showTime:'Cut-off Time'};
	this.content_label = {};
}

function tblConfExpandAlloc(data){
	
	this.option = 'build';
	this.key = ['ARTICLE','ARTICLE_DESC','department_name:department_no','ALLOCATION_QTY','ALLOCATION_STATUS','showAllocOrderNo','ORDER_STATUS'];
	this.table_name = 'allocation_tab_'+data[0].ALLOCATION_NO;
	this.table_title = '';//'List of Articles in '+data[0].ALLOCATION_NO;
	this.table_class = 'secondaryTable width100';
	this.header_tr_class = '';
	this.header_name = {ARTICLE:'Article',ARTICLE_DESC:'Description',department_name:'Department',ALLOCATION_QTY:'Total Qty',ALLOCATION_STATUS:'Allocation Status',WAREHOUSE_ORDER:'Order #','ORDER_STATUS':'Order Status'};
	this.header_data_type = {ARTICLE:'number',ARTICLE_DESC:'char',department_name:'char',ALLOCATION_QTY:'number',ALLOCATION_STATUS:'char',showAllocOrderNo:'number','ORDER_STATUS':'char'};
	this.header_row_type = {ARTICLE:'main',ARTICLE_DESC:'main',department_name:'main',ALLOCATION_QTY:'main',ALLOCATION_STATUS:'main',showAllocOrderNo:'main','ORDER_STATUS':'Order Status'};
	this.header_class = {ARTICLE:'',ARTICLE_DESC:'',department_name:'',ALLOCATION_QTY:'centerValue',ALLOCATION_STATUS:'centerValue',showAllocOrderNo:' centerValue ','ORDER_STATUS':'lastColumn centerValue '};
	this.header_title = {},
	this.header_width = {ARTICLE:'5%',ARTICLE_DESC:'',department_name:'30%',ALLOCATION_QTY:'5%',ALLOCATION_STATUS:'10%',showAllocOrderNo:'5%','ORDER_STATUS':'5%'};
	this.content_tr_class = ' ';
	this.content_class = {ARTICLE:'',ARTICLE_DESC:'',department_name:'',ALLOCATION_QTY:'centerValue',ALLOCATION_STATUS:'centerValue',showAllocOrderNo:' centerValue ','ORDER_STATUS':'lastColumn centerValue '};
	this.content_title = {};
	this.content_format = {ARTICLE:'trim',ARTICLE_DESC:'removeNull',department_name:'removeNull',ALLOCATION_QTY:'removeNull',ALLOCATION_STATUS:'removeNull','ORDER_STATUS':'removeNull'};
	this.content_width =  {ARTICLE:'5%',ARTICLE_DESC:'',department_name:'30%',ALLOCATION_QTY:'5%',ALLOCATION_STATUS:'10%',showAllocOrderNo:'5%','ORDER_STATUS':'5%'};
	this.comp_key_parser = {department_name: 'twoKeySplit'};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.cont_data_function = {showAllocOrderNo:showAllocOrderNo};
	this.cont_sort_function = {showAllocOrderNo:getAllocOrderNo};
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {label:{'input':{event:{click : ''},display: function(){}}},showAllocOrderNo:{'a':{event:{click : showAllocationOrderDetails},display: function(){}}}};
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}};
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',showAllocOrderNo:'Order #'};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>'};
}

function tblConfAlloc(data){

	this.option = 'build';
	this.key = ['label','SHOW_DATE','ALLOCATION_NO','ALLOCATION_DESC','ALLOC_REASON','dept_array_cont'];
	this.table_name = 'allocation_tab';
	this.table_title = 'List of Allocations';
	this.table_class = 'drilldownTable ContentTable treetable actionRows ';
	this.header_tr_class = 'collapsed';
	this.header_name = {label:'',SHOW_DATE:'On Show Date',ALLOCATION_NO:'Allocation #',ALLOCATION_DESC:'Allocation Description',ALLOC_REASON:'Reason'},
	this.header_data_type = {label:'',SHOW_DATE:'date',ALLOCATION_NO:'number',ALLOCATION_DESC:'char',ALLOC_REASON:'char',dept_array_cont:'char'};
	this.header_row_type = {label:'',SHOW_DATE:'main',ALLOCATION_NO:'main',ALLOCATION_DESC:'main',ALLOC_REASON:'main',dept_array_cont:'main'};
	this.header_class = {label:'',SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',dept_array_cont:'lastColumn'};
	this.header_title = {},
	this.header_width = {label:'15px',SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',dept_array_cont:''};
	this.content_tr_class = 'collapsed maintr';
	this.content_class = {label:'',SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',dept_array_cont:'lastColumn'};
	this.content_title = {};
	this.content_format = {label:'',SHOW_DATE:'dotdate',ALLOCATION_NO:'trim',ALLOCATION_DESC:'removeNull',ALLOC_REASON:'removeNull'};
	this.content_width =  {label:'15px',SHOW_DATE:'90px',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',dept_array_cont:''};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= true;
	this.curr_page= 1;
	this.sort=true;
	this.sort_done = {sort_done:allocSortDone};
	this.page_done = {page_done: allocPageDone};
	this.cont_data_function = {dept_array_cont:showdept_array};
	this.cont_sort_function = {dept_array_cont:get_dept_array};
	this.content_bind_event = {click: expandCollapseEvent};
	this.filterbyColumn ={SHOW_DATE:'SHOW_DATE',ALLOCATION_NO:'ALLOCATION_NO',ALLOCATION_DESC:'ALLOCATION_DESC',ALLOC_REASON:'ALLOC_REASON',dept_array_cont:'dept_array_cont'};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {label:{'input':{event:{click : ''},display: function(){}}},dept_array_cont: {'.deptMore':{event:{click:expandRemainDept},display: function(e){}}}};
	this.header_td_addon = {label:{'span':{event:{click : expandAllEvent},display: function(){}}}};
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',dept_array_cont:'Department'};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>'};
}

var showAllocationOrderDetails = function(e){
	var orderNo = $(this).text();
	var param =  new orderParam('',orderNo,'','','','','','','','');
	getOrderBasicDetails(param);
	
};

function getOrderBasicDetails(param)
{

	var url = getOrderHdrBasicInfoUrl;
	console.log('url '+url+' param '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		if(checkResult(response,'order_no')){
			var hdrObj=response[0];
			if(param.followUp!=null && param.followUp!=undefined){
				param.followUp(param,hdrObj);
			}else{
				if(canViewOrderDetail){
					getOrderDetail(hdrObj,true);
				}else{
					//donoting
				}
			}		
		}else{
			$.fn.showCustomMsg([nodata],error);
			stopLoading();	
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error);
		stopLoading();
	}).always(function() {
		
	});

}

var expandRemainDept = function(e){
	e.stopPropagation();
	var $elem = $(this);
	$elem.closest('label').addClass('hideBlock');$elem.closest('td').find('.remain-dept').removeClass('hideBlock');
};
var showdept_array = function(obj){
	var tempArray = obj.dept_array;
	var temp = '';
	var detp_str = '';
	var tempobj = {};
	var key ='';
	var j = -1;
	for(var i=0;i<tempArray.length;i++){
		key = tempArray[i];
		if(tempobj[key]==undefined){
			tempobj[key] = key;
			j++;
			if(j < 2){
				temp += ((j == 1) ? ', ': '') +'<span>'+key+'</span>';
				detp_str += ((j == 1) ? ', ': '')+key;
			}else if(j == 2){
				temp +='<label class="and-option">,and <a  class="moreNumber deptMore" id="">CONTENTMORE more</a></label><span class="hideBlock remain-dept">, '+key+'</span>';
				detp_str += ', '+key;
			}else{
				temp +='<span class="hideBlock remain-dept">, '+key+'</span>';
				detp_str += ', '+key;
			}
		}
	}
	
	obj.tot_dept = detp_str;
	return temp.replace('CONTENTMORE',(j-1));
};

var get_dept_array = function(){
	return 'tot_dept';
};
function tblConfOpenOrderItem(data,hdrObj){
	this.option = 'build';
	this.key = ['label','article','article_desc','order_uom','soh','showQty','showOm','showTot','action'];
	this.table_name = 'open_item_tab';
	this.table_title = 'List of Articles ('+data.length+')';
	this.table_class = 'drilldownTable ContentTable treetable ';
	this.header_tr_class = 'collapsed ';
	this.header_name = {label:'',article:'Article',article_desc:'Description',order_uom:'UOM',soh:'SOH',showQty:'Order Qty.',showOm:'OM',showTot:'Department',action:'Actions'};
	this.header_data_type = {label:'',article:'number',article_desc:'char',order_uom:'char',soh:'number',showQty:'number',showOm:'number',showTot:'number',action:''};
	this.header_row_type = {label:'',article:'main',article_desc:'main',order_uom:'main',soh:'main',showQty:'main',showOm:'main',showTot:'main',action:''};
	this.header_class = {label:'',article:'',article_desc:'',order_uom:'centerValue',soh:'centerValue',showQty:'centerValue',showOm:'centerValue',showTot:'centerValue',action:'centerValue hideBlock editMode lastColumn'};
	this.header_title = {},
	this.header_width = {label:'20px',article:'',article_desc:'',order_uom:'',soh:'',showQty:'',showOm:'',showTot:'',action:''};
	this.content_tr_class = 'collapsed mainTr';
	this.content_class = {label:'',article:'',article_desc:'',order_uom:'centerValue',soh:'centerValue',showQty:'centerValue',showOm:'centerValue',showTot:'centerValue',action:'centerValue hideBlock editMode lastColumn'};
	this.content_title = {};
	this.content_format = {label:'',article:'removeNull',article_desc:'removeNull',order_uom:'removeNull',soh:'removeNull'};
	this.content_width =  {label:'20px',article:'',article_desc:'',order_uom:'',soh:'',showQty:'',showOm:'',showTot:'',action:''};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = false;
	this.groupby= true;
	this.recordPerPage= 10;
	this.default_groupbyColumn =['department_no'];
	this.groupbyColumn ={'department_no': 'Department','article':'Article'};
	this.filterbyColumn ={'article':'article','article_desc':'article_desc','order_uom':'order_uom','soh':'soh','showQty':'showQty','showOm':'showOm','showTot':'showTot'};
	this.filter= true;
	this.add_option = true; 
	this.curr_page= 1;
	this.sort=true;
	this.tr_id= ['article','base_uom'];
	this.sort_done = {sort_done: openItemSortDone};
	this.page_done = {page_done: openItemPageDone};
	this.filter_done = {filter_done: openItemFilterDone};
	//this.group_done = {group_done: function(){}};
	this.content_bind_event = {click: openItemexpandCollapseEvent};
	this.content_tr_addon = {click: ''};
	this.cont_data_function = {soh:sohQty,showQty:showQty,showOm:showOm,showTot:showTot};
	this.cont_sort_function = {soh:sohQty,showQty:getQty,showOm:getOm,showTot:getTot};
	this.cont_group_data_function = {showQty:showQty};
	this.group_cont_function = {department_no:getOpenItemGrpCont,article:''};
	this.content_td_addon = {label:{'input':{event:{click : function(e){e.stopPropagation();}},display: function(){}}},action:{'.deleteRecord':{event:{click : deleteRecord},display: function(){}}},showQty:{'.textbox':{event:{keypress : onlyNumber,change : changeContObj,click : testd},display: function(){}}}};
	this.header_td_addon = {label:{'span':{event:{click : openOrderExpandAllEvent},display: function(){}}}};
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',showQty:'Order Qty.',showOm:'OM',showTot:'Total Units Ordered',action:'Actions'};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',action:'<label class="linkBtn"><a><label class="deleteRecord">&nbsp;</label></a></label>'};
	this.data_tr_class = {func_class:getArticleTrclass};
	this.data_td_class = {article:getArticleTdclass};
}

function tblConfOpenOrderItem1(data,hdrObj){
	this.option = 'build';
	if(isCostPriceShow){
	this.key = ['label','article','article_desc','order_uom','soh','cost_price','showQty','showOm','showTot','action'];
    }else{
    	this.key = ['label','article','article_desc','order_uom','soh','showQty','showOm','showTot','action'];
    }
	this.table_name = 'open_item_tab';
	this.table_title = 'List of Articles ('+data.length+')';
	this.table_class = 'drilldownTable ContentTable treetable ';
	this.header_tr_class = 'collapsed ';
	this.header_name = {label:'',article:'Article',article_desc:'Description',order_uom:'UOM',soh:'SOH',cost_price:'Cost Price',showQty:'Order Qty.',showOm:'OM',showTot:'Department',action:'Actions'};
	this.header_data_type = {label:'',article:'number',article_desc:'char',order_uom:'char',soh:'number',cost_price:'number',showQty:'number',showOm:'number',showTot:'number',action:''};
	this.header_row_type = {label:'',article:'main',article_desc:'main',order_uom:'main',soh:'main',cost_price:'main',showQty:'main',showOm:'main',showTot:'main',action:''};
	this.header_class = {label:'',article:'',article_desc:'',order_uom:'centerValue',soh:'centerValue',cost_price:'centerValue',showQty:'centerValue',showOm:'centerValue',showTot:'centerValue',action:'centerValue hideBlock editMode lastColumn'};
	this.header_title = {},
	this.header_width = {label:'20px',article:'',article_desc:'',order_uom:'',soh:'',cost_price:'',showQty:'',showOm:'',showTot:'',action:''};
	this.content_tr_class = 'collapsed mainTr';
	this.content_class = {label:'',article:'',article_desc:'',order_uom:'centerValue',soh:'centerValue',cost_price:'centerValue',showQty:'centerValue',showOm:'centerValue',showTot:'centerValue',action:'centerValue hideBlock editMode lastColumn'};
	this.content_title = {};
	this.content_format = {label:'',article:'removeNull',article_desc:'removeNull',order_uom:'removeNull',soh:'removeNull',cost_price:'removeNull'};
	this.content_width =  {label:'20px',article:'',article_desc:'',order_uom:'',soh:'',cost_price:'',showQty:'',showOm:'',showTot:'',action:''};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = false;
	this.groupby= true;
	this.recordPerPage= 10;
	this.default_groupbyColumn =['department_no'];
	this.groupbyColumn ={'department_no': 'Department','article':'Article'};
	this.filterbyColumn ={'article':'article','article_desc':'article_desc','order_uom':'order_uom','soh':'soh','cost_price':'cost_price','showQty':'showQty','showOm':'showOm','showTot':'showTot'};
	this.filter= true;
	this.add_option = true; 
	this.curr_page= 1;
	this.sort=true;
	this.tr_id= ['article','base_uom'];
	this.sort_done = {sort_done: openItemSortDone};
	this.page_done = {page_done: openItemPageDone};
	this.filter_done = {filter_done: openItemFilterDone};
	//this.group_done = {group_done: function(){}};
	this.content_bind_event = {click: openItemexpandCollapseEvent};
	this.content_tr_addon = {click: ''};
	this.cont_data_function = {soh:sohQty,showQty:showQty,showOm:showOm,showTot:showTot};
	this.cont_sort_function = {soh:sohQty,showQty:getQty,showOm:getOm,showTot:getTot};
	this.cont_group_data_function = {showQty:showQty};
	this.group_cont_function = {department_no:getOpenItemGrpCont,article:''};
	this.content_td_addon = {label:{'input':{event:{click : function(e){e.stopPropagation();}},display: function(){}}},action:{'.deleteRecord':{event:{click : deleteRecord},display: function(){}}},showQty:{'.textbox':{event:{keypress : onlyNumber,change : changeContObj,click : testd},display: function(){}}}};
	this.header_td_addon = {label:{'span':{event:{click : openOrderExpandAllEvent},display: function(){}}}};
	this.header_td_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',showQty:'Order Qty.',showOm:'OM',showTot:'Total Units Ordered',action:'Actions'};
	this.content_label = {label:'<span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>',action:'<label class="linkBtn"><a><label class="deleteRecord">&nbsp;</label></a></label>'};
	this.data_tr_class = {func_class:getArticleTrclass};
	this.data_td_class = {article:getArticleTdclass};
}
var getOpenItemGrpCont = function(obj,confObj){
	//var obj = value[0];
	var cont = '<tr id="none"></tr>';
	if(obj!=null && obj!=undefined){
		cont = '<tr><td class="rowSection rowHighlight" colspan="12">Department: '+(obj.department_name||'')+'</td></tr>';
	}
	return cont;
};
var onlyNumber = function(e){
	if (e.which != 8
			&& e.which != 0
			&& (e.which < 48 || e.which > 57)
			&& (e.which != 46 || $(this).val().indexOf(
					'.') != -1) && e.which != 37) {
		return false;
	}
};
var testd= function(e){e.stopPropagation();e.preventDefault();console.log('dsfds');};

var deleteRecord = function(e){
	e.stopPropagation();
	var id = this.closest("tr").id;
	var isDeletable = false;
	var $table = $('#open_item_tab_table');
	var confObj = $table.data('confObj');
	var insertObj = confObj.insertObj;
	for(key in insertObj){
		//if(key.substr(0, key.lastIndexOf("_")) == id){
		if(key.split('_')[0] == id.split('_')[0]){
			isDeletable = true;
		}
	}	
    if(fromCreate == undefined || fromCreate == ''){
	if(sugoFlag && !isDeletable)
	{
		var info = 'Article cannot be deleted as this is a SUGO order.';
		$.fn.warnPopup('alert',info,'Order Details','','',triggerOk,'');
	}else{
	var $elem = $(this);
	$.fn.warnPopup('warn',removMsg,'Order Details',triggerDeleteYes,triggerDeleteNo,'',$elem);
	}
        }else{
       e.data.cache = $(this);
       fromCreate = '';
       triggerDeleteYes(e);
    }
};
var addOpenObj = function(obj){
	//e.stopPropagation();
	var newData = obj.data;
	var glaExists = $('#open_item_tab_table thead th[data_key="cost_price"]').length;
	
	var $table = obj.cache;
	var $param = obj.param;
	var qty = $param.qty;
	var confObj = $table.data('confObj');
	var updateFlag = confObj.updateFlag;
	var insertObj =  confObj.insertObj;
	var insertObjDraft = confObj.insertObjDraft;
	var data =  confObj.content;
	insertObj = (insertObj!=undefined) ? insertObj :{};
	insertObjDraft = (insertObjDraft!=undefined) ? insertObjDraft :{};
	confObj.insertObj = insertObj;
	confObj.insertObjDraft = insertObjDraft;
	var blockedArticles = [];
	var errorMsg = [];
	  //if(newData.article_no=="285910")/*data.greenlife_flag!=undefined && data.greenlife_flag!=null && data.greenlife_flag=="Y")*/
        if(data !=undefined && data != '' && data.greenlife_flag!=undefined && data.greenlife_flag!=null && data.greenlife_flag=="Y")
	  {
	  
	  if(glaExists > 0)
		  {
		  openFormReset($('#add_table_'+$param.tableId),$param.tableId);
			filter = (confObj.applyFilter||'');
			filterCont = filter ? confObj.filterCont : [];
			confObj.filterCont = filterCont;
            errorMsg = validateArticleforOrder(newData[i], true);    
            if(newData.length >0 )     {                         
			for(var i =0;i<newData.length;i++){
                if(newData[i].msg_type != 'E'){                        
				isExistCheckAdd($table,data,newData[i],qty,filter,filterCont,$param.tableId,updateFlag);                        
                }
                 else{
                	 blockedArticles.push(newData[i].msg);	
                 }
              }
            }
		  }
	  else
		  {
		  $.fn.showCustomMsg(["Cannot add greenlife artilces to the non greenlife articles order"],error);
		  }
	  
	  }
        else
	  {
	  
	  if(glaExists > 0)
	  {
		  $.fn.showCustomMsg(["Cannot add non greenlife artilces to the greenlife articles order"],error);
	 
	  }
        else
	  {
	  openFormReset($('#add_table_'+$param.tableId),$param.tableId);
		filter = (confObj.applyFilter||'');
		filterCont = filter ? confObj.filterCont : [];
		confObj.filterCont = filterCont;
        errorMsg = validateArticleforOrder(newData, true);  
        if(newData.length >0 )     {           
		for(var i =0;i<newData.length;i++){
		if(newData[i].msg_type != 'E')
			isExistCheckAdd($table,data,newData[i],qty,filter,filterCont,$param.tableId,updateFlag);
        else
			blockedArticles.push('Article '+newData[i].msg);	
        }
        }                
        }
	}
    if(errorMsg.length >0)
        $.merge(blockedArticles, errorMsg);
    
	if(blockedArticles.length > 0)
		{
		$.fn.showCustomMsg(blockedArticles,error);
		}
	 
};

function isExistCheckAdd($tbl,data,obj,qty,filtered,filterCont,tableId,updateFlag){
	console.log(new Date().getTime());
	var tempObj ='';
	var department_name = '';
	/*for(var i=0;i<data.length;i++){
		if(data[i].article+'_'+data[i].base_uom == obj.article+'_'+obj.article_uom){
			data[i].newQty =  qty;
		}else{
			tempObj = new orderItemObj(obj.article,obj.article_desc,obj.base_uom,obj.order_uom,qty,obj.om,obj.piom,obj.random_wgt_flg,'I');
			data.push(tempObj);
			$tbl.data('confObj').insertObj[tempObj.article+'_'+tempObj.base_uom+'_'+tempObj.article_line]= tempObj;
		};
	}
	console.log(new Date().getTime());*/
	
	console.log(new Date().getTime());
	var id = '#'+obj.article+'_'+obj.article_uom;
	if($tbl.find(id)!=undefined && $tbl.find(id).length>0){
		var $elem = $tbl.find(id);
		$elem.find('.textbox').val(qty).focus();$elem.find('.textbox').trigger('change');
	}else{
		department_name =(obj.dept_no_name||'');
		department_name = (department_name.split(',').length >1) ? department_name.split(',')[1] :'';
		var itemArray = $tbl.data('confObj').content;
		var arrayLength = itemArray.length;
		//var lastObj = arrayLength>0 ?  itemArray[arrayLength-1] : '00010';
		// Error Fix - in SC
		//var lineCount = (lastObj.article_line!= undefined ) ? lastObj.article_line : lastObj ;
		/*console.log(lineCount);
			if(lineCount.length == 5)
				lineCount =  lineCount.substring(1, 5);*/
        /*var lineCount = Number(arrayLength)*10;
		lineCount = Number(lineCount)+10;	
		lineCount = padzero(lineCount,5);*/
		var lineCount = current_line_count;
		lineCount = Number(lineCount)+10;
		current_line_count = lineCount;
		lineCount = padzero(lineCount,5);
		if(updateFlag == true){
			tempObj = new orderItemObj(obj.article,obj.article_desc,obj.order_uom,obj.base_uom,'',obj.om,obj.pi_om,obj.pi_uom,obj.pi_om_base,obj.random_wgt_flg,'I',obj.department_no,department_name,obj.vendor_ref_no,qty,lineCount,(obj.soh || '0'), obj.min_order_qty, obj.max_order_qty, obj.min_order_value, obj.max_order_value);
		}else{
			tempObj = new orderItemObj(obj.article,obj.article_desc,obj.order_uom,obj.base_uom,qty,obj.om,obj.pi_om,obj.pi_uom,obj.pi_om_base,obj.random_wgt_flg,'I',obj.department_no,department_name,obj.vendor_ref_no,'',lineCount,(obj.soh || '0'), obj.min_order_qty, obj.max_order_qty, obj.min_order_value, obj.max_order_value);
		}
		tempObj['title'] = $tbl.data('confObj').table_name;
		data.push(tempObj);
		$tbl.data('confObj').insertObj[tempObj.article+'_'+tempObj.order_uom+'_'+tempObj.article_line]= tempObj;
		$tbl.data('confObj').insertObjDraft[tempObj.article+'_'+tempObj.order_uom+'_'+tempObj.article_line]= obj;
		$tbl.find('#'+tempObj.article+'_'+tempObj.order_uom).find('.editNumCell').focus();
		if(filter == true){
			//filterCont.push(tempObj);
			$tbl.find('#filter_row_'+tableId).find('input:first').trigger('keyup');
		}else{
			triggerTable($tbl);
		}
	}
	if(updateFlag == true){
		$('#updateQtyContentWrap').find('#changeOmExpDate').trigger('change');
	}
	console.log(new Date().getTime());
}

function triggerTable($table){
	var confObj = $table.data('confObj');
	var default_groupbyColumn = confObj.cur_gru_col;
	if(confObj.applyGroup ==true && default_groupbyColumn!=undefined){
		/*confObj.content.sort(function(a, b){
		    if(a.department_no < b.department_no) return -1;
		    if(a.department_no > b.department_no) return 1;
		    return 0;
		})*/
		$.tablebuild.groupContObj(confObj,[default_groupbyColumn],confObj.content);
	}
	$.tablebuild.tableTrigger($table);
}
function orderItemObj(article,article_desc,order_uom,base_uom,order_qty,om,piom,pi_uom,pi_om_base,random_flag,action,department_no,dept_no_name,vendor_ref_no,receive_qty,article_line,soh,min_order_qty, max_order_qty, min_order_value, max_order_value){
	this.article = article;
	this.article_desc = article_desc; 
	this.article_line = padzero(article_line,5);
	this.order_qty =order_qty;
	this.order_uom= order_uom;
	this.base_uom = base_uom;
	this.newOm = '';
	this.newQty ='';
	this.newTot = '';
	this.oldQty = '';
	this.om = om;
	this.pi_om = piom;
	this.pi_uom = (pi_uom||'');
	this.pi_om_base = (pi_om_base||'');
	this.random_wt_flag = random_flag;
	this.action_code = action;
	this.soh =soh;
	this.department_no= (department_no||'');
	this.department_name = (dept_no_name||'');
	this.vendor_ref_no = (vendor_ref_no||'');
	this.received_qty = (receive_qty||'');
	this.received_qty_uom = order_uom;
	this.random_wgt_flg = random_flag;
    this.min_order_qty = min_order_qty;
    this.max_order_qty = max_order_qty;
    this.min_order_value = min_order_value;
    this.max_order_value= max_order_value;
}

var triggerDeleteYes = function(e){
	var $elem = e.data.msg;
	var $cache = e.data.cache;
	var $td = $cache.closest('td');
	var $tr = $td.closest('tr');
	var $table= $tr.closest('table');
	var obj = $table.data('confObj');
	var cont = obj.content;
	var filterCont = obj.filterCont;
	var cont_index = $td.attr('cont_index');
	var removeOpenArticle = $tr.data().obj;
	index = cont.indexOf(removeOpenArticle);

	//var index = $td.attr('data_index');
	//index = Number(index);
	var sdata ={}; 
	if((obj.applyFilter||'')){
		cont_index = Number(cont_index);
		spliceData(cont,cont_index,1);
		cont = filterCont;
	}
	sdata= spliceData(cont,index,1);
	var newObj = sdata[0];
	if((newObj.action_code||'') != 'I'){
		if($.isEmptyObject(obj.deletedObj)){obj.deletedObj ={};}
		obj.deletedObj[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line] =newObj;
		if(obj.updateObj!=undefined && obj.updateObj[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line]!=undefined)
		delete obj.updateObj[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line];
	}else{
		if(obj.insertObj!=undefined && obj.insertObj[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line]!=undefined)
		delete obj.insertObj[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line];
        
                if(obj.insertObjDraft!=undefined && obj.insertObjDraft[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line]!=undefined)
                delete obj.insertObjDraft[newObj.article+'_'+newObj.order_uom+'_'+newObj.article_line];
	}
	$tr.remove();
	triggerTable($table);
        if($elem != undefined)
	$elem.dialog('close');
};

var triggerDeleteNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};

function spliceData(array,i,size){
	return array.splice(i,size);
}
function editOrder(){
	$('#editAction').toggleClass('disabled');$('#cancelOrder').toggleClass('disabled');$('#editDoneWrap').toggleClass('hideBlock');
};

function showEditMode(){
	var $tableHold = $('#openOrderItemHolder');
	var $editRows = $tableHold.find('#open_item_tab_table');   
	$tableHold.find('#open_item_tab_head .table_title').text('List of Articles ('+$editRows.data('confObj').content.length+')');
	$editRows.find('.viewMode').addClass('hideBlock');
	$editRows.find('.editMode').removeClass('hideBlock');
	$tableHold.find('#add_table_open_item_tab,#add_art_link_btn_open_item_tab').removeClass('hideBlock');
	$tableHold.find('#grou_cont_open_item_tab').hide();
	openFormReset($tableHold.find('#add_table_open_item_tab'),'open_item_tab');
}

function openFormReset($elem,tableId){
	$elem.find('#add_article_input_'+tableId).val('');
	$elem.find('#add_qty_'+tableId).val('');
	if(!($elem.find('#src_all_radio_'+tableId).is(':disabled'))){
		$elem.find('#src_all_radio_'+tableId).trigger('click');
	}
}

function showViewMode(){
	var $tableHold = $('#openOrderItemHolder');
	var $editRows = $tableHold.find('#open_item_tab_table');
	$tableHold.find('#grou_cont_open_item_tab').hide();
	$editRows.find('.viewMode').removeClass('hideBlock');
	$editRows.find('.editMode').addClass('hideBlock');
	$tableHold.find('#add_table_open_item_tab,#add_art_link_btn_open_item_tab').addClass('hideBlock');
	openFormReset($tableHold.find('#add_table_open_item_tab'));
}

var openItemSortDone = function($elem){
	if($('#editAction').hasClass('disabled')){showEditMode();}
	callOpenItemExpandTrigger($elem);
};

var openItemPageDone = function($elem){
	if($('#editAction').hasClass('disabled')){showEditMode();}
	callOpenItemExpandTrigger($elem);
};

var openItemFilterDone = function($elem){
	if($('#editAction').hasClass('disabled')){showEditMode();}
	callOpenItemExpandTrigger($elem);
};

function callOpenItemExpandTrigger($elem){
	if($elem.attr(expanded) == 'true')
		triggerOpenOrderExandAll($elem);
}
var articlePar= function(article,uom){
	this.iv_article_no = article;
	this.iv_article_uom = uom;
};

function openItemexpandCollapseEvent(){ 
	var $elem = $(this);
	var obj =  $elem.data('obj');
	var expObj = obj.expObj;
	if(expObj!=null && expObj!=undefined && expObj.length>0){
		trigOpenExp(obj,expObj,$($elem));
	}else{
		var articleList = [];
		var article = obj.article;
		var uom = obj.base_uom;
		articleList.push(new articlePar(article,uom));
		var param = {Article_dtls:articleList};
		getOrderItemDetailInfo(param,$elem);
	}
}

function getOrderItemDetailInfo(param,$elem){
	console.log('URL ='+articleStockInfoUrl+ ' param '+JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: articleStockInfoUrl,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  if(checkResult(data,'article_no')){
			  bindExpObj(data,$elem);
		  }
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  //triggerFollowUp(option);
		  stopLoading();
	  });
}

function bindExpObj(data,$elem){
	var map = $groupBy(data,function(obj){
		return obj.article_no+'_'+obj.article_uom;
	});
	var obj ={};
	for(var i= 0;i<$elem.length;i++){
		var $nElem = $($elem[i]);
		obj = $nElem.data('obj');
		obj.expObj = map[obj.article+'_'+obj.base_uom];
		trigOpenExp(obj,obj.expObj,$nElem);
	}
}

function trigOpenExp(obj,data,$elem){
	var confObj=$elem.closest('table').data('confObj');
	var $expanAnc = '';
	var expendedAnchor = '<tr class="noChild" style="display: table-row;"><td colspan="12" class="sorted"></td></tr>';
	var key = obj.article+'_'+obj.base_uom+'_'+obj.article_line;
	$elem.toggleClass(expanded+' '+collapsed);
	$expanAnc = $('#order_item_expand_'+key);
	confObj.count= confObj.count != undefined ? confObj.count : 0;
	if($elem.hasClass(expanded)){
		if($expanAnc==undefined || $expanAnc.length == 0){
			$expendedAnchor = $(expendedAnchor);
			$expendedAnchor.attr('id','order_item_expand_'+key);
			$expendedAnchor.insertAfter($elem);
			$expendedAnchor = $('#order_item_expand_'+key).find('td');
			$expendedAnchor.html(openItemExpCont(data[0],obj));
			$expendedAnchor.find('.tableFooter,.tableInfo').addClass('hideBlock');
		}else{
			$expanAnc.toggle();
		}
		obj.expanded = true;
		var count = Number(confObj.count);
		confObj.count= count+1;
	}else{
		$expanAnc!=undefined && $expanAnc.length >0 ? $expanAnc.toggle() : '';
		obj.expanded = false;
		var count = Number(confObj.count);
		confObj.count= count-1;
	}
	 var $headElem = $('#thead_open_item_tab tr:first');
	if(confObj.groupedCont.length ==Number(confObj.count) || Number(confObj.count) == 0  )
		{
		//$headElem.toggleClass(expanded+' '+collapsed);
		if(confObj.groupedCont.length ==Number(confObj.count))
			{
			$headElem.addClass(expanded).removeClass(collapsed);
			}
		else if (Number(confObj.count) == 0)
			{
			$headElem.removeClass(expanded).addClass(collapsed);
			}
		if($headElem.hasClass(expanded))
			$headElem.attr(expanded,true);
			else
			$headElem.attr(expanded,false);
		}
	$elem.closest('table').data('confObj').count=confObj.count;
}

function getSuppCont(obj){
	return ((obj.supplier_name||'' != '' && obj.supplier_no||'' !='') ? (obj.supplier_name+ ' ('+obj.supplier_no+') ') : (obj.supplier_name||obj.supplier_no));
}

function openItemExpCont(obj,hdrObj){
	var cont = '<table cellspacing="0" class="ContentTable" width="100%" style="margin-top: 0px"><tbody><tr><td class="keyInfo">Supplier:</td>'
		+'<td class="valueInfo lastColumn" colspan="5">'+getSuppCont(obj)+'</td></tr>'
		+'<tr><td width="20%" class="keyInfo">Stock on Order:</td><td width="13%" class="valueInfo columnDivider">'
		+'<label class="linkBtn" onclick="showSOO('+(obj.article_no||'')+')"><a '+ ((obj.soo||'' !='') ? 'class="newWindowAfter"' : '')+'>'+(obj.soo||'')+'</a></label></td><td width="20%" class="keyInfo">Standard Price:</td>'
		+'<td width="13%" class="valueInfo columnDivider">'+(obj.standard_price||'' != '' ? ('$ '+obj.standard_price.toFixed(2)) :'')+'</td><td width="20%" class="keyInfo noDivider">'	
		+'</td><td width="13%" class="valueInfo lastColumn"></td></tr>'
		+'<tr><td class="keyInfo">Stock in Transit:</td><td class="valueInfo columnDivider">'+(obj.sit||'')+'</td><td class="keyInfo">SOH:</td><td class="valueInfo columnDivider">'+(deciValues(obj.random_wt_flag,obj.weighted_flag,'',obj.pbd_flag,obj.soh,obj.pi_soh,'',obj.base_uom,false,undefined,'')||'')+'</td><td class="keyInfo noDivider"></td><td class="valueInfo lastColumn"></td></tr>'
		+'<tr class="lastRow"> <td colspan="6" class="lastColumn"><label class="history" onclick="showSales(\''+(obj.article_no||'')+'\',\''+(obj.pack_break_down_flag || 'N' )+'\',\''+obj.article_uom+'\',\''+(obj.base_uom || '' )+'\')"  >Sales History</label>'+(loggedInSalesOrg == '1015' ? '<label class="history" onclick="showAlterPrice('+(obj.article_no||'')+')" >Alternate Pricing</label>': '')+'<label class="notpadLink" onclick="showAllocation('+(obj.article_no||'')+')" >Check Allocations</label><label class="notpadLink " onclick="showPromotion(\''+(obj.article_no||'')+'\',\'\',\'\',\'\',\'\')" >Check Promotions</label></td> </tr></tbody>';// for defect 6863
	return cont;
}

var showSOO = function(article){
	var param = new orderParam(article,'','','','','','','','','',"SOO",'Y');
	$.fn.loadArticleSooPopUp(param);
};
var showPromotion = function(article,dept,cat,subcat,seg){
	$.fn.loadArticlePromoPopUp({article:article,dept:dept,cat:cat,subcat:subcat,seg:seg,option:'C'});
};

var showSales = function(article,pbdFlag,orderUom,baseUom){
	var articleNo=article;
	var articleDesc=$('.mainTr td:eq(2)').text();
	console.log('article'+article);
	getSalesHistoryNew(articleNo,articleDesc,pbdFlag,orderUom,baseUom);
	$("#dialog-modal-his").dialog("open");
	
};
var showAlterPrice = function(article){
	$.fn.loadArticleAlternatePricePopUp(article);
};
var showAllocation = function(article){
	article = padzero((article),18);
		var param = new allocParam(article,getDesiredFutureDate(0),getDesiredFutureDate(21),'');
		$.fn.loadArticleAllocationPopUp(param);	
};

function openOrderExpandAllEvent(){
	var $elem = $(this).closest('tr');
	$elem.toggleClass(expanded+' '+collapsed);
	triggerOpenOrderExandAll($elem);
}

function triggerOpenOrderExandAll($elem){
	var $tbl =$('#open_item_tab_table');
	var $trList = [];
	if($elem.hasClass(expanded)){
		$trList = $tbl.find('.'+collapsed);
		triggerAll($trList);
		$elem.attr(expanded,true);
	}else{
		$tbl.find('.'+expanded).trigger('click');		
		$elem.attr(expanded,false);
	}
}

function triggerAll($trList){
	var obj = {};
	var expObj = {};
	var articleList =[];
	var param ={};
	var $elemList = [];
	for(var i = 0;i< $trList.length;i++){
		var $nTr = $($trList[i]);
		obj = $nTr.data('obj');
		expObj = obj.expObj;
		expObj == undefined ? (articleList.push(new articlePar(obj.article,obj.base_uom)),$elemList.push($nTr)): '';
	}
	if(articleList.length > 0){
		param = {Article_dtls:articleList};
		getOrderItemDetailInfo(param,$elemList);
	}else{
		$trList.trigger('click');
	}
}

var changeContObj = function(){
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var qty = ((obj.order_qty||'')!='' ? obj.order_qty : 0);
	var value = $elem.val().trim();
	var baseuom = obj.base_uom||'';
	var tot =(Number(value) * obj.newOm);
	if((value||''!='') && (qty != value)){
		obj.newQty = value;
		if(obj.action_code != 'I'){
			var $tbl = $tr.closest('table');
			//Changed as the last modified article alone was sent 
			//($tbl.data('confObj').updateObj||'' == '') ? $tbl.data('confObj').updateObj ={} : '';
			(isEmptyMap($tbl.data('confObj').updateObj||'')) ? $tbl.data('confObj').updateObj ={} : '';
			$tbl.data('confObj').updateObj[obj.article+'_'+obj.order_uom+'_'+obj.article_line]= obj;
		}
		obj.newTot = (tot);
		obj.changed = true;
	}else{
		obj.changed = false;
	}
	$tr.find('[data_key="showTot"]').text(tot+' '+baseuom);
};

var getQty = function(){
	return ('newQty');
};

var getOm = function(){
	return ('newOm');
};

var getTot = function(obj){
	return ('newTot');
};

var showQty = function(obj){
	var qty = (obj.changed||'' =='true') ? (obj.newQty||'') : ((obj.order_qty||'')!='' ? obj.order_qty : 0);
	var inpu= '<span class="order_qty viewMode">'+qty+'</span>'+'<input type="#" maxlength="16" value="'+qty+'" class="editNumCell textbox textboxDefaultText hideBlock editMode">';
	obj.oldQty = qty;
	obj.newQty = qty;
	return (inpu);
};

var sohQty = function(obj){
	return ((obj.soh != null && obj.soh != undefined && obj.soh !='') ? deciValues(obj.random_wt_flag,obj.weighted_flag,'',obj.pbd_flag,obj.soh,obj.pi_soh,'',obj.base_uom,false,undefined,'') :'0');
};
var showOm = function(obj){
	var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
	var om =/* ((obj.random_wt_flag||'').trim()=='Y' ? ((obj.pi_om||'')!='' ? obj.pi_om:1) :*/ ((obj.om||'')!='' ? obj.om:1)/*)*/;//for defect 2281
	var changedOm = ((obj.recv_om||'')!='' ? obj.recv_om:'');//for defect 2266
	obj.newOm = ((changedOm != '' && changedOm != om) ? Number(changedOm) : Number(om)); 
	return ((Number(obj.newOm))+' '+baseUom);
};

var showTot = function(obj){
	var qty = ((obj.newQty||'')!='' ? obj.newQty : ((obj.newQty||obj.order_qty)!='' ? obj.order_qty : 0));
	var baseUom = ((obj.base_uom||'')!='' ? obj.base_uom : '');
	var om = /*((obj.random_wt_flag||'').trim()=='Y' ? ((obj.pi_om||'')!='' ? obj.pi_om:1) :*/ ((obj.om||'')!='' ? obj.om:1)/*)*/;
	var tot = (Number(qty)*Number(om));
	obj.newTot = (tot);
	/*if((obj.random_wt_flag||'').trim()=='Y') //for defect 2281
		baseUom='EA';*/
    tot = (tot != null && tot != '' && tot.toString().indexOf('.') != -1)?tot.toFixed(3):tot;
	return '<strong>'+((tot)+' '+baseUom)+'</strong>';
};

function callOpenOrderUpdate(option, withNew){
	var obj = getOpenOrderUpdateParam(option, withNew);
	console.log(obj.url  + ' ' + JSON.stringify(obj.param));
	
	  $.ajax({
	    type: "POST",
	    url: obj.url,
	    data: JSON.stringify(obj.param),
	    beforeSend : function(){
	    	startLoading();
	    }
	  }).done(function(response) {
		  showOpenOrderUpdateInfo(response);
          stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
          stopLoading();
	  }).always(function() {
		  populateWarehouse();
		  //stopLoading();
	  });
}

/*function showOpenOrderUpdateInfo(response){
	if (response['result'] != undefined) {
		var output = response['result'];
		var responseObj = output[0];
		if (responseObj != undefined) {
	        if (responseObj.typ != undefined && responseObj.typ == 'S') {
	        	showUpdateSuccess();
	        } else {
	        	if (responseObj.msg != undefined && responseObj.msg != '') {
	        		$.fn.showCustomMsg([responseObj.msg],error);
	        	} else {
	        		$.fn.showCustomMsg([mobiSerErrCode],error)(['Order update failed.Please try later.'],error);
	        	}
	        }
	      }
	    } else {
	    	checkResult(response,'');
	    }
}*/
function showOpenOrderUpdateInfo(response){
	if (response != null && response != undefined && response.length > 0 && checkResult(response,'typ')) {
		//var output = response['result'];
		//var responseObj = output[0];
		var errors = [];
		var flag = false;
        for (var i = 0; i < response.length; i++) {
        	var responseObj = response[i];
			if (responseObj != undefined) {
				if (responseObj.typ != undefined && responseObj.typ == 'S') {	        	
					flag  = true;
				} else if(responseObj.typ == 'E'){
					if (responseObj.msg != undefined && responseObj.msg != '') {
						errors.push(responseObj.msg);	        		
					} else {
						errors.push(mobiSerErrCode);	        		
					}
				}
			  }
			}
			if(flag){
				showUpdateSuccess();
			}
			if(errors.length>0){				
				$.fn.showCustomMsg(errors, error, "Edit Order");
			}
	    }else if(response != null && response != undefined && response.length == 0){
	    	$.fn.showCustomMsg(['No Update Found'], error, "Edit Order");
	    }else{
	    	checkResult(response,'');
	    }
}
function updateOpenOrders(option){
		if(option =='update'){
			var $table = $('#open_item_tab_table');
			var confObj = $table.data('confObj');
			var insertObjDraft = confObj.insertObjDraft;
                         var validateCall = false;                        
			if(insertObjDraft != '' && insertObjDraft != undefined && isElementPresent(insertObjDraft)){
			validateRoasterUpdateCheck(option, insertObjDraft, confObj.hdrObj.source);				
			}else{
				callOpenOrderUpdate(option, true);
			}
		}else{
			callOpenOrderUpdate(option, true);
		}
}
var triggerUpdateWithoutNewArticle = function(e){
	var $elem = e.data.msg;
	//callOpenOrderUpdate('update', false);
	$elem.dialog('close');
};

function validateRoasterUpdateCheck(option, insertObjDraft, orderType){	
	startLoading();
	console.log('insertObjDraft  ' + JSON.stringify(insertObjDraft));	
	var drafts = [];
        var flag = '';
	drafts = frameJSONObjectForValidateUpdate(insertObjDraft, orderType);
         var $table = $('#open_item_tab_table');
         var confObj = $table.data('confObj');
        var hdrObj = $table.data('hdrObj');
        var insertObj = confObj.insertObj;
        var insertObjDraft = confObj.insertObjDraft;
	var param = {
            "site": siteNo||'',
            "sales_org": salesOrg,
            "user_id": userId||'',
            "sap_id": "",
            "session_id": "",
                "orderLimitQty": "50",
                "requestSource": "S",
            "ITEM_INFO": drafts
          };
	console.log(getDeliveryDateURL + JSON.stringify(param));
	$.post(getDeliveryDateURL, JSON.stringify(param))
		.done(function(data) {
        flag = handleRoasterDateUpdate(data, insertObjDraft);        
        console.log('flag after validation ' + flag);
        if(flag == 'ERROR'){
                // do nothing but stop loading..
        		stopLoading();
        }else if(insertObjDraft != undefined  && insertObjDraft != "" && isElementPresent(insertObjDraft)){
                console.log(' validation ' + flag);
                $.fn.warnPopup('warn',flag+" : "+orderRealsedMsg,'Order Update Confirmation',
                        callCreateDraftOrderSerUp, triggerUpdateWithoutNewArticle,'',insertObjDraft);          
                stopLoading();
        }else{
                callOpenOrderUpdate(option, true);
        } 
       // stopLoading();
	}).fail(function() {
	 $.fn.showCustomMsg([mobiSerErrCode],error);
	  stopLoading();
	}).always(function() {
	  //stopLoading();
	});       
}

function callCreateDraftOrderSerUp(e) {
  startLoading();  
  var $table = $('#open_item_tab_table');
  var confObj = $table.data('confObj');
  var insertObjDraft = confObj.insertObjDraft;
  var drafts  = frameJSONObjectDraftUp(insertObjDraft, 'D');
  var param = {
    "ItemArray": drafts
  };
  console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
  $.post(createOrdersDraftList, JSON.stringify(param))
    .done(function(data) {
      console.log('Added to My draft:' + data[0].msg);
      var $elem = e.data.msg;
      $elem.dialog('close');
      if (data[0].msg_type == 'S') {
        for (key in insertObjDraft) {                 
               var id  = insertObjDraft[key].article+'_'+insertObjDraft[key].article_uom;
               fromCreate = 'CreateOrderDelete';
              //Delete once moved article to create order draft becoz of slice
               $('#open_item_tab_table tbody tr[id="'+id+'"]').find('.deleteRecord').trigger('click');               
         } 
        $.fn.showCustomMsg([data[0].msg], success, 'Add to Draft'); 
        stopLoading();
      } else if (data[0].msg_type == 'E' && data[0].msg != undefined) {
    	  showAllErrors([data[0].msg]);
    	  stopLoading();
      }else if (data[0].msg == undefined) {
        showAllErrors([mobiSerErrMsg]);
        stopLoading();
      }
    });
    
    
}
function frameJSONObjectDraftUp(x, action) {
  var drafts = [];
  if (x != null && x != '') {
    var article, article_uom, qty, om, delivery_date, supplier, createdUser, updatedUser, updatedUser, roster_date, submittedUser, draft_type,costPrice,greenLifeArticleFlag;
    for (key in x) {
	var count  = key;	
      var articleNo = x[count].article == undefined ? x[count].article_no : x[count].article;
      var supplierNo = x[count].supplier == undefined ? (x[count].supplier_no) : (x[count].supplier);
      var roasterDate = x[count].roster_date == undefined ? x[count].roaster_date : x[count].roster_date;
      var srcOfSupply = x[count].source_of_supply == undefined ? x[count].source : x[count].source_of_supply;
      //BiGW GreenLife
      if(x[count].greenlife_flag!=null)
    	  {
    	  costPrice =x[count].cost_price;
    	  greenLifeArticleFlag = x[count].greenlife_flag;
    	  }
      if (supplierNo == null) supplierNo = "";
      article = articleNo;
      article_uom = x[count].order_uom;
      if (article_uom == null) article_uom = ""; 
      var newQty = $('#open_item_tab_table').data('confObj').insertObj[key].newQty;
      qty = ((newQty == '' || newQty == undefined) ? x[count].qty : newQty);
      if (qty == null) qty = "";
      om = x[count].om;
     // if (x[count].delivery_date != null && x[count].delivery_date != undefined && x[count].delivery_date != "") 
          //delivery_date = x[count].delivery_date;
     // else delivery_date = "";
      roster_date = ((roasterDateSer == '' || roasterDateSer == undefined)? '' :roasterDateSer);
      delivery_date =((deliveryDateSer == '' || deliveryDateSer == undefined)? '' :deliveryDateSer);      
      supplier = supplierNo;
      createdUser = userId||'';
      if (roster_date == undefined || roster_date == null) roster_date = '';
      if (srcOfSupply == '1') {
        draft_type = "PO";
      } else if (srcOfSupply == '2') {
        draft_type = "SO";
      }
      var alternate_vendor_flag = x[count].alternate_vendor_flag;
      drafts.push(getDraftUpObj(article, article_uom, createdUser, submittedUser, updatedUser, qty, om, delivery_date, supplier, roster_date, action, draft_type,alternate_vendor_flag,costPrice,greenLifeArticleFlag));
    }
  }
  return drafts;
}
function getDraftUpObj(article, article_uom, createdUser, submittedUser, updatedUser, qty, om, delivery_date, supplier, roster_date, action, draft_type,alternate_vendor_flag, costPrice,greenLifeArticleFlag) {
  var draft;  
  if(greenLifeArticleFlag==undefined && greenLifeArticleFlag==null)
	  {
  draft= {
    "iv_site": siteNo||'',
    "iv_session_id": "1000",
    "iv_article": article,
    "iv_article_uom": article_uom,
    "iv_action": action,
    "iv_qty": qty,
    "iv_om": om,
    "iv_delivery_date": delivery_date,
    "iv_supplier": supplier,
    "iv_roster_date": roster_date,
    "iv_draft_type": draft_type,
    "iv_user": createdUser,
    "iv_weight": "",
    "iv_new_uom": article_uom,
    "iv_expiry_date1" : "",
    "iv_expiry_date2" : "", 
    "iv_expiry_date3" : "", 
    "iv_expiry_date4" : "", 
    "iv_expiry_date5" : "",
    "iv_platform": "B",
    "iv_alternate_vendor_flag" : (alternate_vendor_flag||'')
  };
  }
  else
{  
draft= {
	"iv_site": siteNo||'',
	"iv_session_id": "1000",
	"iv_article": article,
	"iv_article_uom": article_uom,
	"iv_action": action,
	"iv_qty": qty,
	"iv_om": om,
	"iv_delivery_date": delivery_date,
	"iv_supplier": supplier,
	"iv_roster_date": roster_date,
	"iv_draft_type": draft_type,
	"iv_user": createdUser,
	"iv_weight": "",
	"iv_new_uom": article_uom,
	"iv_expiry_date1" : "",
	"iv_expiry_date2" : "", 
	"iv_expiry_date3" : "", 
	"iv_expiry_date4" : "", 
	"iv_expiry_date5" : "",
	"iv_platform": "B",
	"iv_cost_price":costPrice ,
	"iv_greenlife_flag":greenLifeArticleFlag,
	"iv_alternate_vendor_flag" : (alternate_vendor_flag||'')
	};
	}
  return draft;
}
function frameJSONObjectForValidateUpdate(x, orderType){
	  var drafts = [];
	  if (x !=undefined && x != '') {
		var article = '';
	    var article_uom = '';
	    var supplier = '';
	    var delivery_date= '';
	    var roster_date= '';
	    var qty= '';
	    var lead_time= '';
	    var article_type= '';
	    var emergency_flag= '';
	    var delivery_valid_flag= '';
	    var order_category= '';
	    var order_type= '';
	    var glFlag= '';
	    var costPrice;
	    var baseUom;
	    var costPriceCurrency;
	    var isUnscheduleVendor = '';
	    emergency_flag = '';
	    costPrice = '';
	    baseUom ='';
	    costPriceCurrency = '';
	    delivery_valid_flag = '';
	    var articleNo;
	    var supplierNo;
	    var roasterDate;
	    var rpIndFlag;
	    var preqType = '';
	    var preqReq = '';
	    for (key in x) {
		var count = key;
		isUnscheduleVendor = x[count].unscheduled_vendor_f;
	      articleNo = x[count].article == undefined ? x[count].article_no : x[count].article;
	      supplierNo = x[count].supplier == undefined ? (x[count].supplier_no) : (x[count].supplier);
	      roasterDate = x[count].roster_date == undefined ? x[count].roaster_date : x[count].roster_date;
	      if(x[count].greenlife_flag!=null)
	    	  {
	    	  glFlag = x[count].greenlife_flag;
	    	  }
	      else
	    	  {
	    	  glFlag = '' ;
	    	  }
	      if(x[count].cost_price!=null)
		  {
		  costPrice = x[count].cost_price;
		  }
	      if(x[count].base_uom!=undefined && x[count].base_uom!=null)
		  {
	    	  baseUom = x[count].base_uom;
		  }
	      if(x[count].cost_price_currency!=undefined && x[count].cost_price_currency!=null)
		  {
	    	  costPriceCurrency = x[count].cost_price_currency;
		  }
	      
	      rpIndFlag = x[count].rp_ind_flag == undefined ? '' : x[count].rp_ind_flag;
	      if (supplierNo == null) supplierNo = "";
	      article = articleNo;
	      article_uom = x[count].order_uom;
	      if (article_uom == null) article_uom = "";
	      supplier = supplierNo;
	      lead_time = x[count].lead_time;
	      article_type = x[count].article_type;
	      isUnscheduleVendor = x[count].unscheduled_vendor_f;
	      if (lead_time == undefined || lead_time == null) lead_time = '';
	      // need to uncomment once the details are not null
              if (article_type == 'ZPRD') article_type = 'PRODUCE';
		      else article_type = 'NON PRODUCE';
		      //order_type = (orderType != "" && orderType!= undefined && orderType =="SUGO")?"SUGO":"MANUAL";
              order_type = "MANUAL";
		      order_category = "NOT ON RECEIPT";    	

              roasterDate = ((roasterDateSer == '' || roasterDateSer == undefined)? '' :formatDateToMDY(roasterDateSer));
              delivery_date =((deliveryDateSer == '' || deliveryDateSer == undefined)? '' :deliveryDateSer);
	      qty = x[count].qty;	   
	      preqReq = '';//x[count].preq_req;
	      delivery_valid_flag = 'N';// x[count].delivery_valid_flag;
		  var isVendor = ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) ? 'Y' : 'N';		  
	     if (roster_date == undefined || roster_date == '') roster_date = '';
	      if (salesOrgVal != undefined && salesOrgVal != null && salesOrgVal == bigw_sales_org) {
	        article_type = 'ALL';
	        order_category = 'ALL';
	        if ((x[count].source != undefined && x[count].source != '' && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != '' && x[count].source_of_supply == '1')) {
	          order_type = 'MANUAL PO';
	        } else {
	          order_type = 'MANUAL STO';
	        }	        
	        if(rpIndFlag == 'RP' || rpIndFlag == 'Y')
	    	{
	    	article_type = 'RP';
	    	order_type='STORE';
	    	}	     
	    }
	      supplierNo = ""; //Should be empty for RC Validation
	      drafts.push(getSubmitDraftObjUpdate(article, article_uom, supplierNo, delivery_date, roster_date, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preqType, preqReq));
	    }
	  }
	  return drafts;
	 
}
function isElementPresent(insertObjDraft){
var validateCall = false;
       for (key in insertObjDraft) { 
        validateCall = true;
        break;
      }
      return validateCall;
}
function getSubmitDraftObjUpdate(article, article_uom, supplier, delivery_date, roaster_date, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preq_type, preq_req) {
  var draft = 
   {
    "article": article,
    "article_uom": article_uom,
    "supplier": supplier,
    "delivery_date": delivery_date,
    "roaster_date": roaster_date == "" ? delivery_date : roaster_date,
    "lead_time": lead_time,
    "emergency_flag": emergency_flag,
    "delvery_valid_flag": delivery_valid_flag,
    "preq_type": preq_type,
    "preq_req": preq_req,
    "article_type": article_type,
    "order_category": order_category,
    "order_type": order_type,
    "qty": qty,
    "isVendor" : isVendor,
    "unscheduled_f": ((isUnscheduleVendor == undefined || isUnscheduleVendor == "") ? "" : isUnscheduleVendor),
    "unscheduled_vendor": ((isUnscheduleVendor == undefined || isUnscheduleVendor == "") ? "" : isUnscheduleVendor),
    "greenlife_f": ((glFlag!=undefined && glFlag!= "" && glFlag != "Y") ? glFlag : "N"),
    "cost_price":((glFlag!=undefined && glFlag!="" && glFlag != "Y" && costPrice != undefined || costPrice != "") ? costPrice : ""),
    "base_uom":((glFlag!=undefined && glFlag!="" && glFlag != "Y" && baseUom != undefined || baseUom != "") ? baseUom : ""),
    "cost_price_currency":((glFlag!=undefined && glFlag!="" && glFlag != "Y" && costPriceCurrency != undefined || costPriceCurrency != "") ? costPriceCurrency : ""),	
    "itemCategory": "U"
  }; 
  return draft;
}
function handleRoasterDateUpdate(response, insertObjDraft){
 var insertList = {};
 if(response != null && response.articles != null && 
  response.articles != "" && response.articles != undefined && 
 response.articles.length >0){ 
 var $table = $('#open_item_tab_table');
 var confObj = $table.data('confObj');
 var hdrObj = $table.data('hdrObj');
 var insertObj = confObj.insertObj;
 var supplier = ((confObj.groupedCont != undefined && confObj.groupedCont[0] != undefined
        && confObj.groupedCont[0].supplier_no != undefined && confObj.groupedCont[0].supplier_no != "" ) 
        ? confObj.groupedCont[0].supplier_no : hdrObj.supplier_no);
 var errors = [];
 var success = ''; 
 for (key in insertObjDraft) { 
 for (var i = 0; i < response.articles.length; i++) {
 var result = response.articles[i];
        if((/*result.errorDescription == 'NORSTR' ||*/ result.errorDescription == '')
         && result.errormessage == ''){ 
        var ddcompResult = compareDate(deliveryDateSer, (result.deliveryDate != undefined && result.deliveryDate != null && result.deliveryDate != "" ?formatDateMobi(result.deliveryDate):""));
        var roasterCompResult = compareDate(roasterDateSer, (result.rosterDate != undefined && result.rosterDate != null && result.rosterDate != "" ?formatDateMobi(result.rosterDate):"")); 
        if(insertObjDraft[key].article == result.article) {       
                if(roasterCompResult == 'eq' && (/*roasterNameSer == '' ? true : */result.rosterName == roasterNameSer) &&
                        ddcompResult == 'eq' /*&& result.preq_type == preqTypeSer*/ && result.supplier == supplier 
                        && result.site == siteNo && result.dcmcsCode == purchaseReqSer){               
                        insertList[key] = insertObjDraft[key];                       
                }else{ 
                        if(success !="") success +=  ", ";
                        success += insertObjDraft[key].article;
                        //delete insertObj[key];
                }
        }
        }else{
             /*if(success !="") success +=  ", ";
                 success += insertObjDraft[key].article;            
             delete insertObj[key];*/
             errors.push("Article "+result.article+" - "+result.errormessage);
        }
}
}
if(errors != [] && errors.length>0){
		errors = unique(errors);
        success = 'ERROR';
        insertList = {};
        $.fn.showCustomMsg(errors, error, "Roster Date Validation"); 
}
confObj.insertObj = insertObj;
confObj.insertObjDraft = insertObjDraft;
}else{
        success = 'ERROR';
        insertList = {};
	$.fn.showCustomMsg([mobiSerErrMsg], error, "Roster Date Validation");    
} 
if(insertList != undefined && insertList != "")
for (key in insertList) {        
       delete insertObjDraft[key];
} 
return success;
}


function getOpenOrderUpdateParam(option, withNew){
	var $table = $('#open_item_tab_table');
	var confObj = $table.data('confObj');
	var hdrObj = $table.data('hdrObj');
	var param = {};
	var item =[];
	if(option == 'cancel'){
		var oldObj = $table.data('oldObj');
		if(oldObj!=undefined && oldObj.length>0){iterateOpenOrderParam(item,oldObj,hdrObj,'E');}
	}else {
		var insertObj = confObj.insertObj;
		var updateObj = confObj.updateObj;
		var deletedObj = confObj.deletedObj;
		if(withNew){
			if(insertObj!=undefined){iterateOpenOrderParam(item,insertObj,hdrObj,'I');}
		}
		if(updateObj!=undefined){iterateOpenOrderParam(item,updateObj,hdrObj,'U');}
		if(deletedObj!=undefined){iterateOpenOrderParam(item,deletedObj,hdrObj,'E');}
	}
	param= new orderUpdateHdrParam(hdrObj,item);
	return {url:getOrderUpdateURL(hdrObj),param:param};
}

function iterateOpenOrderParam(param,data,hdrObj,action){

	for(key in data){
		param.push(new orderUpdateItemParam(hdrObj,data[key],(action == 'U' && (data[key].newQty||'0') == '0' ?  'E' : action)));
	}
}

function getOrderUpdateURL(hdrObj){
	var url= '';
	if(hdrObj.source_flag =='P'){
		url = updatePreqURL;
	}else if((hdrObj.source_flag =='O' || hdrObj.source_flag =='D') && !(isST(hdrObj.order_type))){
		url = updatePOURL;
	}else{
		url = cancelIBTUrl;
	}
	return url;
}

function orderUpdateItemParam(hdrObj,obj,action){
	this.action_flag=action||'';
	this.article_no=obj.article||'';
	this.article_type= '';
	this.article_uom =obj.order_uom||'';
	this.delvery_date = hdrObj.delivery_date||'';
	this.po_type="";
	this.preq_type="";
	//this.item_no=obj.article_line||'';
	this.item_no=(obj.article_line != '' && obj.article_line != null)?padzero(Number(obj.article_line),5):'';
	this.qty= (action == 'U' || action == 'I') ? obj.newQty||'' : obj.order_qty||'';	
	this.roaster_date=(roasterDateSer != undefined && roasterDateSer !="")?roasterDateSer:(hdrObj.cut_off_date != undefined || hdrObj.cut_off_date !="")?
			 $.tablebuild.dataparse.mobi_date(hdrObj.cut_off_date):'';
	this.supplier=hdrObj.supplier_no||'';
}

function orderUpdateHdrParam(hdrObj,itemInfo){
	this.preq_no= hdrObj.order_no||'';
    this.po_no= hdrObj.order_no||'';
    this.site_no= siteNo||'';
    this.user_id= userId||'';
    this.pwd= encSapPwd;   
    this.typ = '';
    this.msg = '';
    this.article_list_info = itemInfo||'';
}

var OrderItemParam = function(orderNo,source,grNo,receive_flag){
	this.iv_order_no= orderNo;
	this.iv_site = siteNo;
	this.iv_session_id = '';
	this.iv_user_id = userId;
	this.iv_source_flag = source;
	this.iv_retain_session_flag = 'N';
	this.iv_sales_org = salesOrg;
	this.iv_gr_no = (grNo||'');
	this.iv_receive_flag = (receive_flag||'N');
	this.iv_display_flag='N';
};

var STCancelParam = function(orderNo,supplier){
	this.preq_no = orderNo;
	this.po_no  = orderNo;
	this.site_no = supplier;
	this.user_id = userId;
    this.pwd= encSapPwd;
	this.typ = '';
	this.msg = '';
	this.supplier = siteNo;
	this.article_list_info = [];
};

function getAllocParam(){
	var articleNo = '';
	var $fromElem = $('#fromDate');
	var $toDate =$('#toDate');
	var $dept = $('#departmentInEnq');
	var $articleRadio = $('#description');
	var $hier = $('#hierarchyID');
	var tradingDept ='';
	var fromDate = $fromElem.val() != '' ? $fromElem.val() : getDesiredFutureDate(0);
	var toDate = $toDate.val() != '' ?  $toDate.val() :  getDesiredFutureDate(21);

	if ($dept.val() != 'Select' && $hier.val() != '') tradingDept = $hier.val();
	if ($articleRadio.is(':checked')) {
		if(selectedArticle!='' && selectedArticle.length >0){
			articleNo = selectedArticle;
		}else{
			articleNo = padzero($('#orderNo').val().split('-')[0].trim(),18);
		}
	}
	return new allocParam(articleNo,fromDate,toDate,tradingDept);
}

function allocParam(articleNo,fromDate,toDate,dept){
   this.IV_SAP= encSapPwd;
   this.IV_USER_NAME = userId;
   this.articleNo = articleNo;
   this.fromDate = fromDate;
   this.orderNo = articleNo;
   this.siteNo = siteNo;
   this.dept = dept;
   this.toDate = toDate;
}

function orderParam(article, orderNo, fromDate,toDate,orderType,orderStatus,nodeId,nodeLvl,srcInd,supplier,tab_code,article_filter,ranged){
	this.iv_article =article;
	this.iv_order_no = orderNo;
	this.iv_delivery_from =fromDate;
	this.iv_delivery_to = toDate;
	this.iv_order_type = orderType;
	this.iv_order_status = orderStatus;
	this.iv_node_id = nodeId;
	this.iv_node_lvl =nodeLvl;
	this.iv_node_level =nodeLvl;
	this.iv_srs_ind =srcInd;
	this.iv_src_supply = srcInd;
	this.iv_supplier_no = supplier;
	this.iv_supplier = supplier;
	this.iv_session_id = '';
	this.iv_site = siteNo;
	this.iv_sales_org = salesOrg;
	this.iv_check_alloc ='';
	this.iv_alloc_flag ='Y';
	this.iv_ranged= (ranged == undefined ? 'Y' : 'N');
	this.iv_barcode = '';
	this.iv_desc='';
	this.iv_article_no ='Y';
	this.iv_gtin ='';
	this.iv_barcode_flag ='';
	this.iv_auto_stockr_flag ='N';
	this.iv_prime_vendor = '';
	this.iv_auto_stockr_flag ='N';
	this.iv_delisted_flag ='N';
	this.iv_uom_flag = 'N';
	this.iv_tab_code =(tab_code||'');
	this.iv_article_filter =(article_filter||'N');	
	this.iv_deleted_flag= 'N';
	
};
 function orderParamForCmpntArticles(iv_order_no,iv_site,iv_session_id,iv_source_flag,iv_retain_session_flag,iv_sales_org,iv_receive_flag,iv_display_article,orderStatus,base_order_no){
  {
   // 17.08 Meat Co Vendor Changes	        
   this.iv_order_no = ((isPO(commonOrder.order_type)?orderNoDtl[0].delivery_no:iv_order_no)||iv_order_no);
   // this.iv_order_no = iv_order_no;
   this.iv_site= siteNo;
   this.iv_session_id= "";
   this.iv_source_flag= iv_source_flag;
   this.iv_retain_session_flag= (receiveInFull_retainSessionFlag != undefined && receiveInFull_retainSessionFlag == "Y")?"Y":"N";
   this.iv_sales_org= salesOrg;
   this.iv_receive_flag= ((receiveInFull_retainSessionFlag != undefined && receiveInFull_retainSessionFlag) == "Y"
        || isReceived(orderStatus) || isPartiallyReceived(orderStatus))?"Y":"N";
   this.iv_display_article= iv_display_article; 
   this.iv_base_order_no= base_order_no; 
}	
};

function tblConfObjOverDue(table_name,table_title,data){
	this.option = 'build';
	this.key = ['order_no','delivery_date','order_status','supplier_name:supplier_no','order_type','source','total_cartons','total_pallets'];
	this.table_name = table_name;
	this.table_title = table_title;
	this.table_class = ' ContentTable actionRows';
	this.header_name = {order_no:'Order #',delivery_date:'Delivery Date',order_status:'Status',supplier_name:'Supplier',order_type:'Type',source:'Source',total_cartons:'Total Cartons',total_pallets:'Total Pallets'},
	this.header_data_type = {order_no:'char',delivery_date:'date',order_status:'char',supplier_name:'char',order_type:'char',source:'char',total_cartons:'number',total_pallets:'number'},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',source:'main',total_cartons:'main',total_pallets:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:'lastColumn numberColumn '},
	this.header_title = {},
	this.header_width = {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%'},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:'centerValue',supplier_name:'',order_type:'',source:'',total_cartons:' numberColumn ',total_pallets:'lastColumn numberColumn '},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'mobi_date',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',source:'removeNull',total_cartons:'removeNull',total_pallets:'removeNull'},
	this.content_width =  {order_no:'7%',delivery_date:'7%',order_status:'12%',supplier_name:'',order_type:'12%',source:'7%',total_cartons:'7%',total_pallets:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.content =  data;
	this.cont_data_function = {order_no:showOrderNo};
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.data_td_class = {order_no:getOrderTdclass};
	if(canViewOrderDetail){
		this.content_bind_event = {click: getOrderDetail};
	}else{
		this.content_bind_event = {click: ''};
	}
	//this.content_bind_event = {click: getOrderDetail};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.legend =(salesOrg=="1060")?'<label class="legend"> Legend: <label class="positiveFlag ">AuditFlag</label>':'';
}

var showOrderNo = function(obj)
{
	var orderType=obj.order_type;
	var vendorOrderType = 'VENDOR';
	var vendorRefNo = obj.vendor_ref;
	var sourceFlag = obj.source_flag ;
	var deliveryFlag = 'D';
	if((orderType.toLowerCase() == vendorOrderType.toLowerCase()) 
			&& (vendorRefNo != null && vendorRefNo != '') 
			&& (sourceFlag != null && sourceFlag != '' && sourceFlag.toLowerCase() !=  deliveryFlag.toLowerCase()))
		{
		return obj.order_no+'<br>('+vendorRefNo+')';
		}
	else
		{
		return obj.order_no;
		}
};

var getOrderTdclass = function(obj,$td){
	var colClass = '';
	auditFlag=obj.era_audit_flag;
	if(salesOrg=="1060" && obj.era_audit_flag=="Y"){
		colClass = "positiveFlag";
	}
	$td.addClass(colClass);
};

function getOrderSearchRequestParam() {
	  var param ={};
	  var $order = $('#orderNo');
	  var $from = $('#fromDate');
	  var $to = $('#toDate');
	  var $warehouse =$('#warehouseDrpdwn');
	  var $vendor = $('#supplier');
	  var $deptCheck = $('#depH');
	  var $dept = $('#departmentInEnq');
	  var $hierId = $('#hierarchyID');
	  var select = 'Select';
	  var articleNo = $order.val().split('-')[0].trim();
	  var orderNo = articleNo;
	  var fromDate = $from.val().trim() != '' ? formatDateToMDY($from.val().trim()) : "";
	  var toDate = $to.val().trim() != '' ? formatDateToMDY($to.val().trim()) : "";
	  var orderType = $('#orderType').val();
	  var orderStatus = $('#orderStatus').val();
	  var nodeId = '';
	  var nodeLevel = '';
	  var srcOfSupplyInd = '';
	  var supplierNo = '';
	  
	  if ($dept.val() != 'Select' && !$deptCheck.is(':checked')) {
		  nodeLevel = '2';
	  } else if ($dept.val() != 'Select' && $deptCheck.is(':checked')) {
		  nodeLevel = $('#hierarchyLVL').val();
	  } else {
		  nodeLevel = "";
	  }
	  if ($dept.val() != 'Select' && $hierId.val() != '' && $deptCheck.is(':checked')) {
		  nodeId = $hierId.val();
	  } else if ($dept.val() != select && !$deptCheck.is(':checked')) {
		  nodeId = $dept.val();
	  } else {
		  nodeId = "";
	  }
	  
	  if ($('#all').is(':checked')) {
		srcOfSupplyInd = "";
		supplierNo = "";
	  } else if ($('#warehouse').is(':checked')) {
		srcOfSupplyInd = "2";
		supplierNo = $warehouse.val();
	  } else if ($('#vendor').is(':checked')) {
		srcOfSupplyInd = "1";
		supplierNo = $vendor.val().split('-')[0];
	  }
	  param = new orderParam(articleNo,orderNo,fromDate,toDate,orderType,orderStatus,nodeId,nodeLevel,srcOfSupplyInd,supplierNo,'','','N');
	  return param;
}

var tparam = function(orderNo,action,receiveFlag){
	this.iv_user_id = userId;
	this.iv_delivery_no = orderNo;
	this.iv_platform = 'B';
	this.iv_action = action;
	this.iv_session_id = '',
    this.iv_receive_flag =receiveFlag;     //Release 17.08 - Defect-11022 Fix
};

var updateReceiveQty = function(e){
	var dataObj = jQuery.extend(true, {}, e.data.dataObj);
	var hdrObj = dataObj.hdrObj;
	var deliveryObj = dataObj.deliveryObj;
	var deliveryFlag = dataObj.deliveryFlag;
	var orderNo = (deliveryFlag) ? deliveryObj[0].delivery_no : hdrObj.order_no;
	var param = new tparam(orderNo, 'V', 'U');//Release 17.08 - Defect-11022 Fix
	getReceiveTransId(param,dataObj,frameUpdateQty);
};

function getReceiveTransId(param,dataObj,followup) {
	//Defect 12257 Fix
	param.iv_era_flag = ((dataObj.hdrDtlObj[0] != null && dataObj.hdrDtlObj[0].era_profile=="Y")?"Y":"N");
	console.log('URL ='+getReceivingTransactionUrl +' '+JSON.stringify(param));
	$.ajax({
	    type: "post",
	    url: getReceivingTransactionUrl,
	    data: JSON.stringify(param),
	  }).done(function(data) {
		 if(checkResult(data,'TRANSID')){
			validateTransId(param,data,dataObj,followup);
		 }else{
			stopLoading();
		 }
	  }).fail(function() {
		  $.fn.showCustomMsg([ngboSessErrCode],error);
	  }).always(function() {
		  stopLoading();
	  });
}

var frameUpdateQty = function(contObj,retain_flag){
	var itemObj = contObj.itemObj;
	current_line_count = contObj.max_line_number;
	var $hold= framUpdateCont(contObj);
	frameUpdateQtyItemCont($hold,itemObj,(isPO(contObj.hdrObj.order_type) && (contObj.hdrDtlObj[0].asn_no||'') !=''));
	//clearCostPrice();;
	navigate(update);
};

var frameUpdateQtyItemCont = function($hold,itemObj,poFlag){
	var confObj = new tblConfObjNonSegItemInfo('updateQtyTbl',itemObj,receStatus);
	var $itemHold = $hold.find('#updateQtyContentWrap');
	
	confObj.groupby = false;confObj.filter= false;confObj.default_groupbyColumn =[];confObj.sort =false;
	confObj.table_title = 'List of Articles already Received ('+itemObj.length+')';
	confObj.updateFlag = true;
	/*confObj.cont_data_function.showReceiveQty = ($('#updateQtyTbl_table').is(':visible')  && headerObj.hdrObj != "" && headerObj.hdrObj.order_type == "VENDOR")?
	        showUpdateReceiveQty:showReceiveQty;*/
	$itemHold.loadtbl(confObj);
	$itemHold.find('#updateQtyTbl_foot').addClass('hideBlock');
	if(poFlag){
		$itemHold.find('.addActionBtn').removeClass('hideBlock').find('a').addClass('hideBlock').text('');
	}else{
		$itemHold.find('.addActionBtn').removeClass('hideBlock').find('a').removeClass('hideBlock').find('.addRow').text('Add Missing Articles');
	}
	$itemHold.find('.lookupActionWrapper').append(extraAction).find('#changeOmExpDate').unbind('change').bind('change',changeOmExDate);
	$itemHold.find('#updateQtyTbl_head').addClass('padtop25');
	//$itemHold.find('.rece_view').toggleClass('hideBlock');
	//$itemHold.find('.rece_edit').toggleClass('hideBlock');
	$itemHold.find('.inputDate').datepicker({ zIndex : 50 });
	$("#updateQtyTbl_table").find(".receive_weight").isWithinOnly3Decimal();
        $itemHold.find('.textbox').isWithinOnly3Decimal();	
		//$itemHold.find('.receive_qty').within9999();
        $('.showComponentClass').unbind('click').bind('click',function(){
                var fromUpdate = false;
        	if($(this).closest('table').prop('id') == 'updateQtyTbl_table'){
        		fromUpdate = true;
        	}
                showComponentDisplay($(this).closest('tr').data('obj'), fromUpdate);
        });	
};

var changeOmExDate = function(){
	var $this = $(this);
	var flag = $this.prop('checked');
	var $tbl = $this.closest('#updateQtyContentWrap').find('table');
	var $tr = $tbl.find('.mainTr');
	$tr.each(function(){
	  $elem = $(this);
	  var obj = $(this).data('obj');
	  obj.error = '';	  
	  var baseuom = obj.base_uom||'';//Added for defect 2583
	  var orderuom = obj.order_uom||'';
	  var multiple = 1;
		//if((baseuom != orderuom))
		//{
		if(Number(obj.recv_om) == Number(obj.newOm)){
			multiple =  Number(obj.recv_om);
		}else
			multiple =  Number(obj.newOm);
		//}
	  obj['newReceOm'] = obj.newOm;
	  obj['newReceTot'] = (Number(multiple) * Number(obj.newReceQty));
	  obj['exp1'] = '';  obj['exp2'] = '';  obj['exp3'] = '';  obj['exp4'] = '';  obj['exp5'] = '';
	  obj['pi_om'] = obj.pi_om;
	  obj['newReceTot'] = (obj['newReceTot'] != '' && obj['newReceTot'].toString().indexOf('.') != -1)?Number(obj['newReceTot']).toFixed(3):obj['newReceTot'];
	 // $elem.find('[data_key="showReceTotQty"]').text(obj['newReceTot']+' '+(obj.base_uom||''));
	  $elem.find('[data_key="newReceiveOm"]').find('input').val(obj['newReceOm']||'');
	  $elem.find('[data_key="newExpDate"]').find('input').val('').datepicker({ zIndex : 50 }).removeClass(errorFieldClass).removeClass('tooltip').removeAttr('title');

	  //17.06 Random Weight Article Total Units Display Changes
      if(obj.random_wt_flag == 'Y'){
     var recvValue =  obj.newReceQty;
 	 if(recvValue == '0'){
 		$elem.find('.wtTextBoxFix').val('0');
        obj.tot_weight = recvValue;
 	 }
 	 var recvWtValue =  $elem.find('.wtTextBoxFix').val();    	
 	 var recvWtRecvBox = (recvWtValue!=null && recvWtValue!="")?Number(recvWtValue).toFixed(3)+" "+
 	    	((recvWtValue!=null && recvWtValue!="" && obj.base_uom!="")? obj.base_uom:''):'NA';
 	 //Defect_12081 - Fix
 	 var totUnitsValue = randomWghtTotUnits(obj, recvValue, obj.received_qty_uom);
 			$elem.find('[data_key="showReceTotQty"]').html(recvWtRecvBox+'<br>'+totUnitsValue);
     } else{     	 
    	 var recQtyVal =  ((obj.newReceQty!=null && obj.newReceQty!=undefined)
    			 ?(Number(obj.newOm ||'') * Number(obj.newReceQty)):'NA');
		 //Defect_12636
        if(obj.display_article_flag == 'Y' && obj.received_qty != ''){
	   		recQtyVal = ((obj.recv_om||'') !='' && (obj.received_qty||'')!= '') ? (Number(obj.recv_om)*Number(obj.received_qty)) : recQtyVal;
		}
        if(recQtyVal == 'NA'){
    		 $elem.find('[data_key="showReceTotQty"]').text('NA');
    	}else{
    		 $elem.find('[data_key="showReceTotQty"]').text(recQtyVal+' '+(obj.base_uom||''));
    	}
    	
     }  	  
	  if(flag){
		$elem.find('.editMode').removeClass('hideBlock');
	  }else{
		$elem.find('.editMode').addClass('hideBlock');
	  }
	});
	if(flag){
		$tbl.find('#thead_updateQtyTbl').find('.editMode').removeClass('hideBlock');
	}else{
		$tbl.find('#thead_updateQtyTbl').find('.editMode').addClass('hideBlock');
	}
};

var validateTransId = function(param,data,dataObj,followUp){
	var obj=data[0];
	var usrId = (obj.USER_ID||'');
	var userName = (obj.USER_NAME||'');
	var msg = obj.MSG;
	var transId = (obj.TRANSID||'');
	var info = '';
	if(msg=='N' && transId!=''){
		//Directly redirect to the next page without popup
		dataObj['transId'] = transId;
		followUp(dataObj,true);
	}else if(msg=='S'){
		//Show popup for confirmation
		dataObj['transId'] = transId;
		/*if(usrId != userId){
			info = 'There are few articles in this order are <strong>received by <span>'+getSupplierNo(userName,usrId)+'</strong> in previous session.';
			$.fn.showReceivePop({msg:info,title:'Receiving',text1:'Resume Session',text2:'New Session',text1e:resumeReceSesstion,text2e:newReceSesstion, text1c:'hideBlock actionBtn',text2c: 'actionBtn',dataObj:dataObj});
		}else{
			info = 'There are few articles in this order are <strong>captured as received</strong> in the system.';
			$.fn.showReceivePop({msg:info,title:'Receiving',text1:'Resume Session',text2:'New Session',text1e:resumeReceSesstion,text2e:newReceSesstion,text1c:' actionBtn',text2c: 'actionBtn',dataObj:dataObj});
		}*/
		followUp(dataObj,true);
	}else if(msg=='L'){
		//Alret user
		info = getSupplierNo(userName,usrId)+' is currently updating/receiving this order. Please try again later.';
		$.fn.warnPopup('alert',info,'Order Details','','',triggerOk,'');
	}
};

var triggerOk = function(e){
	e.data.dialog.dialog('close');	
};

$.fn.showReceivePop = function (obj){
	var $popUp = $('#receive-session');
	var $body = $('body');
	var $popupCont ='';
	if($popUp == undefined || $popUp.length == 0){
		$body.append($(recei_session));
		$popUp = $('#receive-session');
		$popUp.attr('title',obj.title);
		$popUp.dialog({	autoOpen: false,modal: true,resizable: false,height: 160,width: 700});
	}else{
		$popUp.parent().find('.ui-dialog-title').text(obj.title);
	}
	$popupCont = $('#receive-session #message_title');
	$popupCont.html('<h4>'+obj.msg+'</h4>');
	$popUp.find('#yes').unbind('click').bind('click',{dataObj: obj.dataObj,dialog:$popUp},obj.text1e).text(obj.text1).removeAttr('class').addClass(obj.text1c);
	$popUp.find('#no').unbind('click').bind('click',{dataObj: obj.dataObj,dialog:$popUp},obj.text2e).text(obj.text2).removeAttr('class').addClass(obj.text2c);
	$popUp.dialog('open').parent().addClass('popupWrapper');

	return true;
};

var newReceSesstion = function(e){
	var dataObj = e.data.dataObj;
	var dialog = e.data.dialog;
	dialog.dialog('close');
	frameUpdateQty(dataObj,false);
};

var resumeReceSesstion = function(e){
	var dataObj = e.data.dataObj;
	var dialog = e.data.dialog;
	dialog.dialog('close');
	frameUpdateQty(dataObj,true);
};

var getUpdateQtyWrap = function(){
	var cont = $('#update_order');
	if(cont ==undefined || cont.length == 0){
		$('#orderLookUpWrapper').append('<div id="update_order" class="contentWrapper orderWrappers "></div>');
		cont = $('#update_order');
	}	
	return cont;
};

var framUpdateCont = function(dataObj){
	var $hold = getUpdateQtyWrap();
	var update_cont = '<div class="ContentTableWrapper"><div><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">Update Received Qty.</h4></div></div></div></div>';
	var updat_action = '<div class="articleActionBtns"><label class="orderStatus">Status: <strong>Received</strong></label><label class="actionBtn" id="saveupdateQty_up"><a><label class="">Save</label></a></label><label class="secondaryActionBtn" id="cancelUpdateQty_up"><a>Cancel</a></label></div>';
	update_cont +='<div class="articleHead">';
	if(dataObj.deliveryFlag){
		update_cont += '<div class="articleHeaderWrapper"><h2 class="articleTitle">Delivery '+(dataObj.deliveryObj[0].delivery_no||'')+' (Segment #'+(dataObj.deliveryObj[0].segment_no||'')+')</h2></div>';
		update_cont+= updat_action+'<div class="articleInfoWrapper"><p class="secondaryInfo">';
		update_cont+= '<label class="articlePriceLabel">'+sentenceCase(dataObj.hdrObj.order_type||'')+' Order #'+$.tablebuild.dataparse.trim((dataObj.hdrObj.order_no||''))+'</strong></label>';
		update_cont+= '<label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Supplier: <strong>'+getSupplierNo(dataObj.hdrObj.supplier_name,dataObj.hdrObj.supplier_no)+'</strong></label>';
	}else{
		update_cont += '<div class="articleHeaderWrapper"><h2 class="articleTitle">'+sentenceCase(dataObj.hdrObj.order_type||'')+' Order #'+$.tablebuild.dataparse.trim((dataObj.hdrObj.order_no||''))+'</h2></div>';
		update_cont+= updat_action+'<div class="articleInfoWrapper"><p class="secondaryInfo">';
		if(!isST(dataObj.hdrObj.order_type)){
			update_cont+= '<label class="articlePriceLabel">Supplier: <strong>'+getSupplierNo(dataObj.hdrObj.supplier_name,dataObj.hdrObj.supplier_no)+'</strong></label>';
		}else{
			update_cont+= '<label class="articlePriceLabel">Receiving Store: <strong>'+getSupplierNo(dataObj.hdrDtlObj[0].receiving_site_name,dataObj.hdrDtlObj[0].receiving_site)+'</strong></label><label class="articlePriceLabel"> | </label><label class="articlePriceLabel">Sending Store: <strong>'+getSupplierNo(dataObj.hdrObj.supplier_name,dataObj.hdrObj.supplier_no)+'</strong></label>';
		}
	}
	update_cont+= '</p></div></div>'+up_qty_cont_wrap+updateQtyActionBtn;
	$hold.html('').append(update_cont);
	bindframUpdateCont($hold,dataObj);
	return $hold;
};

var bindframUpdateCont = function($hold,dataObj){

	var $updateCancelBtn = $hold.find('#cancelUpdateQty_dwn,#cancelUpdateQty_up');
	var $updateSaveBtn = $hold.find('#saveupdateQty_dwn,#saveupdateQty_up');
	
	if($updateCancelBtn!= undefined && $updateCancelBtn.length>0){
		var $itemHold = $hold.find('#updateQtyContentWrap');
		$hold.find('#cancelUpdateQty_dwn,#cancelUpdateQty_up').unbind('click').bind('click',{itemHold:$itemHold,dataObj:dataObj,contHold:$hold},cancelUpdateQty);
	}
	
	if($updateSaveBtn!= undefined && $updateSaveBtn.length>0){
		var $itemHold = $hold.find('#updateQtyContentWrap');
		$hold.find('#saveupdateQty_dwn,#saveupdateQty_up').unbind('click').bind('click',{itemHold:$itemHold,dataObj:dataObj,contHold:$hold},saveUpdateQty);
	}
};

var cancelUpdateQty = function(e){
	console.log('cancel cancelUpdateQty qty');
	var dataObj = e.data.dataObj;
	$.fn.warnPopup('warn',cancelMsg,'Order Update',triggerUpdateCancelYes,triggerDeleteNo,'',dataObj);
};

var saveUpdateQty= function(e){
	console.log('cancel saveUpdateQty qty');
	//R18.01 - INC01819616, Defect_12170 - Fix
	if(errorMsgUPQ == '')
	$.fn.warnPopup('warn',saveMsg,'Order Update',triggerUpdateSaveYes,triggerDeleteNo,'',e.data);
	else
	$.fn.showCustomMsg([errorMsgUPQ],error);return false;
};

var triggerUpdateCancelYes = function(e){
	var dataObj = e.data.cache;
	var hdrObj = dataObj.hdrObj;
	var param = new receiveParam();
	param.iv_order_no = hdrObj.order_no;
	param.iv_trans_id = dataObj.transId;
	param.iv_action_flag = 'X';
	param.iv_order_recv_method = '';
	receiveUpdateOrder(param,dataObj,orderUpdateCancelFollowup,true);
	e.data.msg.dialog('close');
};

var triggerUpdateSaveYes = function(e){
	var cache = e.data.cache;
    var $tbl = cache.itemHold.find('#updateQtyTbl_table');
	var dataObj = cache.dataObj;
	var hdrObj = dataObj.hdrObj;
    var content = $tbl.data('confObj').content;
	var iv_item_info = formReceiveItemObj(content);
	if(iv_item_info!=false){
		var param = new receiveParam();
		var iv_order_type = '';
        var iv_sap_order_type = '';
		if(isPO(hdrObj.order_type)){
			iv_order_type ='PO';
			iv_sap_order_type = 'DGR';
		}else if(isSTO(hdrObj.order_type)){
			iv_order_type ='STO';
			iv_sap_order_type = 'WGR';
		}else{
			iv_order_type ='IBT';
			iv_sap_order_type = 'IRE';
		}
		param.iv_order_no = hdrObj.order_no;
		param.iv_order_type =  iv_order_type;
		param.iv_sap_order_type = iv_sap_order_type;
		param.iv_trans_id = dataObj.transId;
		param.iv_action_flag = 'P';
		param.iv_multi_receipt = '';
		param.iv_item_info = iv_item_info;
		param.iv_order_recv_method = '';
        param.iv_multiple_delivery = ''; // 17.08 Meat Co Vendor Changes
		receiveUpdateOrder(param,dataObj,orderUpdateSuccessFollowup,false);
	}
	e.data.msg.dialog('close');
};

var formReceiveItemObj = function(content){
	var rece_list = [];
	var item = {};
        var components = headerObj.itemCompObjMap;
	for(var i=0;i<content.length;i++){
                if((content[i].display_article_flag == 'Y' &&  headerObj.hdrObj != "" && headerObj.hdrObj.order_type == "WAREHOUSE")|| 
                content[i].display_article_flag != 'Y' ||content[i].display_article_flag == '' ||content[i].display_article_flag == 'N' 
                ||content[i].display_article_flag == 'undefined' && (content[i].newReceQty != '' && content[i].newReceQty != undefined)){
		item = new formRecvItemObj(content[i], content[i].display_article_flag,'');
		if(content[i].error){
			$.fn.showCustomMsg(['Please correct the highlighted fields.'],error,'Update Order');
			return false;
		}
		item.iv_line_no = padzero((item.iv_line_no||''),5);
		if(item.changed){
			rece_list.push(item);
		}
                }
	}        
    if($('#updateQtyTbl_table').is(':visible')  
		&& headerObj.hdrObj != "" && headerObj.hdrObj.order_type == "VENDOR"
			&& components != ''){
        for(key in components){       
	        if(key != '' &&  components[key] != ''){
                var compList  =  components[key];  
                for(var i=0;i<compList.length;i++){
	                item = new formRecvItemObj(compList[i], 'C', compList[i].display_article);                
	                /*if(content[i].error){
                		$.fn.showCustomMsg(['Please correct the highlighted fields.'],error,'Update Order');
            			return false;
	                }*/
	                item.iv_line_no = padzero((item.iv_line_no||''),5);
	                if(item.changed){
	                	rece_list.push(item);
	                }
                }
            }                
        }                
    }       
	return rece_list;
};

var orderUpdateCancelFollowup = function(param,data,dataObj){
	if(data[0].typ == 'S')
		navigate(detail);
	else
		$.fn.showCustomMsg([mobiSerErrCode],error);
};

var orderUpdateSuccessFollowup = function(param,data,dataObj){
	if(data[0].typ == 'S'){
		startLoading();
		getOrderDetail(dataObj.hdrObj,true);
		$.fn.showCustomMsg([orderReceUpdate],success);
	}else
		{
		$.fn.showCustomMsg([mobiSerErrCode],error);
		stopLoading();
		}
};

function receiveUpdateOrder(param,dataObj,followUp,flag){
	console.log('URL ='+addReceivingTransactionUrl +' '+JSON.stringify(param));
	$.ajax({
	    type: "post",
	    url: addReceivingTransactionUrl,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(data) {
		 if(checkResult(data,'typ')){
			followUp(param,data,dataObj);
			if(flag)
			stopLoading();
		 }
	  }).fail(function() {
		  $.fn.showCustomMsg([ngboSessErrCode],error);
		  stopLoading();
	  });
}

var receiveParam = function(){
	this.iv_site_no = siteNo;
	this.iv_user_id = userId;
	this.iv_pwd = '';
	this.iv_session_id = '';
	this.iv_order_no  = '';
	this.iv_action_flag  = '';
	this.iv_order_type  = '';
	this.iv_trans_id  = '';
	this.iv_receive_method  = '';
	this.iv_delivery_date  = '';
	this.iv_invoice_no  = '';
	this.iv_delivery_no  = '';
	this.iv_asn_no  = '';
	this.iv_sap_order_type  = '';
	this.iv_multi_receipt = '';
	this.iv_supplier_no  = '';
	this.iv_cons_freight  = '';
	this.iv_carrier  = '';
	this.iv_rego  = '';
	this.iv_trailer = '';
	this.iv_comments  = '';
	this.iv_chilled_temp  = '';
	this.iv_frozen_temp = '';
	this.iv_delivery_doc_id = '';
	this.iv_item_info = [];
	this.iv_uld_info = [];
	this.iv_platform = 'B';
    this.iv_era_partial_recv_flag = '';
    this.iv_multiple_delivery = ''; // 17.08 Meat Co Vendor Changes
};

function formRecvItemObj(obj, isComponent, dispArt){
    obj.newReceQty = (obj.newReceQty == undefined || obj.newReceQty =='')?obj.received_qty:obj.newReceQty;
    obj.newReceOm = (obj.newReceOm == undefined || obj.newReceOm =='')?obj.recv_om:obj.newReceOm;
    obj.tot_weight = (obj.tot_weight == undefined || obj.tot_weight =='')?obj.rnd_wgt:obj.tot_weight;
	this.iv_article  = (obj.article||'');
	this.iv_uom  = (obj.order_uom||'');
	//this.iv_qty  = (Number(obj.newReceQty) || Number(obj.received_qty));
	this.iv_qty  = Number(obj.newReceQty);
	this.iv_line_no  =  (obj.article_line||'');
	this.iv_new_om  =  (obj.newReceOm||'');
	this.iv_expiry_date1  =  $.tablebuild.dataparse.mobi_date(obj.exp1||'');
	this.iv_expiry_date2  =  $.tablebuild.dataparse.mobi_date(obj.exp2||'');
	this.iv_expiry_date3  =  $.tablebuild.dataparse.mobi_date(obj.exp3||'');
	this.iv_expiry_date4  =  $.tablebuild.dataparse.mobi_date(obj.exp4||'');
	this.iv_expiry_date5  =  $.tablebuild.dataparse.mobi_date(obj.exp5||'');
	this.iv_random_ea_as_uom =  '';
	this.iv_random_wgt_flag =  (obj.random_wt_flag||'');
	if(obj.random_wt_flag  == 'Y'){ 
		this.iv_random_weight_qty =  (obj.newReceTot||'');
		this.iv_random_weight_uom =  (obj.base_uom||'');
		this.iv_random_weight  =  (obj.tot_weight||'');
	}else{
		this.iv_random_weight_qty =  "";
		this.iv_random_weight_uom =  "";
		this.iv_random_weight  =  "";
	}
	this.iv_unknow_ref_flag  =  'N';
	this.iv_tun  = '';
	this.iv_ean  = '';
	this.iv_article_tun_flag = '006';
	this.iv_receive_method = '';


	var adj_qty = '';
	var adj_uom = '';

	var isOMChangedFlag = false;
	var isQTYChangedFlag = false;
	var isWgtChangedFlag = false;
	
	if(obj.newReceQty != obj.received_qty){
		isQTYChangedFlag = true;
		this.changed = true;
	}
	
	if(obj.newReceOm != undefined || obj.newReceOm != ''){
		if(obj.recv_om != obj.newReceOm){
			isOMChangedFlag = true;
			this.changed = true;
		}		
	}

	if(obj.tot_weight != undefined || obj.tot_weight != ''){
		obj.rnd_wgt = formatTo3DecimalPlaces(obj.rnd_wgt);
		if(obj.rnd_wgt != obj.tot_weight){
			isWgtChangedFlag = true;
			this.changed = true;
		}		
	}
	if(obj.random_wgt_flg == 'Y'){//if random weight article
		adj_qty = isWgtChangedFlag ? Number(obj.tot_weight - obj.rnd_wgt) : 0;
		adj_uom = obj.base_uom;
	}else{//if normal article
		if(isOMChangedFlag && isQTYChangedFlag || isOMChangedFlag){//both qty and om changed or only om changed,qty not changed
			adj_qty = (Number(obj.newReceQty) * Number(obj.newReceOm)) - (Number(obj.received_qty) * Number(obj.recv_om));
			adj_uom = obj.base_uom;
		}/*else if(isOMChangedFlag){
			adj_qty = (Number(obj.newReceQty) * Number(obj.order_qty)) - (Number(obj.received_qty) * Number(obj.recv_om));
			adj_uom = obj.base_uom;
		}*/else if(isQTYChangedFlag){//only qty changed,om not changed
			adj_qty = Number(obj.newReceQty) - Number(obj.received_qty);
			adj_uom = obj.received_qty_uom;
		}else{//if no cahnge
			adj_qty = obj.newReceQty;
			adj_uom = obj.received_qty_uom;
			this.changed = false;
		}
	};
	if(obj.action_code=='I'){
		if(obj.random_wgt_flg == 'Y'){
			this.iv_adj_qty = (obj.tot_weight||'');
			this.iv_adj_qty_uom = (obj.base_uom||'');
			this.iv_adj_pi_qty  = Number(obj.newReceQty||'')*Number(obj.pi_om||'');
		}else{
			//this.iv_adj_qty = obj.newReceQty;
			//this.iv_adj_qty_uom = obj.received_qty_uom;
            this.iv_adj_qty = ((isSTO(commonOrder.order_type) || isST(commonOrder.order_type))?(Number(obj.newReceQty) * Number(obj.om)):obj.newReceQty);
            this.iv_adj_qty_uom = ((isSTO(commonOrder.order_type) || isST(commonOrder.order_type))? obj.base_uom:obj.received_qty_uom);   
			this.iv_adj_pi_qty  = 0;
		}
	}else{
		//this.iv_adj_qty = adj_qty;
		//this.iv_adj_qty_uom = adj_uom;
        this.iv_adj_qty = (((isSTO(commonOrder.order_type) || isST(commonOrder.order_type)) && !isWgtChangedFlag)
        		?(Number(adj_qty) * Number(obj.om)):adj_qty);
        this.iv_adj_qty_uom = ((isSTO(commonOrder.order_type) || isST(commonOrder.order_type))? obj.base_uom:adj_uom);
        this.iv_adj_pi_qty  = isQTYChangedFlag ? (obj.random_wgt_flg == 'Y' ? 
				((Number(obj.newReceQty) * Number(obj.pi_om)) - (Number(obj.received_qty) * Number(obj.pi_om))) : 
					//(Number(obj.newReceTot) - (Number(obj.received_qty) * Number(obj.recv_om))))
					 '0') : '0';
        //if(obj.random_wgt_flg == 'Y') {this.iv_adj_qty = isWgtChangedFlag ? Number(obj.tot_weight - obj.rnd_wgt) : this.iv_adj_pi_qty;}
	}
	this.iv_pbd_flag = (obj.pbd_flag||'');
	this.iv_article_cat_id = (obj.article_cat_id||'');
	this.iv_pack_size_base = (obj.pack_size_base||'');
	this.iv_base_uom = (obj.base_uom||'');
	this.iv_exidv = '';
    this.iv_display_ind = (isComponent != ''&&isComponent != undefined)?isComponent:'';
    this.iv_display_article = (dispArt != ''&&dispArt != undefined)?dispArt:'';
    this.iv_base_order_no = (obj.order_no||(headerObj != ''&& headerObj != undefined && headerObj.hdrObj != '' && headerObj.hdrObj != undefined)?(headerObj.hdrObj.order_no) : '');
    this.iv_art_delivery_no = isPO(commonOrder.order_type)?(obj.delivery_no || ''):''; // 17.08 Meat Co Vendor Changes
    this.iv_zero_qty_flag = 'N'; //Defect - 11767 - Indicated as Y only for substitution articles in ADD RECEIVING TRANSACTION
}
	
function saveAuthNoInNGBO(obj) {
		var vendorClaimOrderNo = '';
		var authNo = $('#vendorAuthNoInNGBO')
				.val().trim();
		
		if (obj != '' && obj != null
				&& obj != undefined)
			vendorClaimOrderNo = obj.hdrObj.order_no;
		
		var param ={ 
		"iv_order_no" : vendorClaimOrderNo,
		"iv_pwd" : encSapPwd,
		"iv_session_id" : "111",
		"iv_site_no" : siteNo,
		"iv_user_id" : userId,
		"iv_vendor_auth_no" : authNo
		};
		
		console.log(vendorClaimAuthorisationURL+' '+JSON.stringify(param));
		
		 $.ajax({
		        type: "POST",
		        url: vendorClaimAuthorisationURL,
		        data: JSON.stringify(param),
		        beforeSend : function(){startLoading();}
		      }).done(function(response) {

		    		if(response != undefined && response.typ==undefined){
		    				 $.fn.showCustomMsg([mobiSerErrCode],error);
		    		  }else if(response != undefined && response.typ!=undefined){
				    		  var obj = response;
				    		  if(obj.typ == 'S')
				    			  {
				    			  $.fn.showCustomMsg([obj.msg],success);
				    			  $('#vendorClaimAuthNo').text($('#vendorAuthNoInNGBO').val().trim());
				    			  }
				    		  else if(obj.typ == 'E')
				    			  {
				    			  $.fn.showCustomMsg([obj.msg],error);
				    			  }
		    		  }
		    		stopLoading();	
		    	  $("#dialog-modal-autho-ngbo").dialog("close");
			  }).fail(function() {
				  $.fn.showCustomMsg([mobiSerErrCode],error);
			  }).always(function() {
				  stopLoading();
			  });
		
		
	}
function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode > 31 && (charCode< 48 || charCode >57))
      return false;

   return true;
}	
	
function callPostSOHService(dataObj)
{
	var orderNo = dataObj.hdrObj.order_no;
	var param = {
		"iv_site_no" : siteNo,
		"iv_order_no" : orderNo,
		"iv_session_id" : "100"
	};

	console.log(postReceivedDetailsUrl + ' ' + JSON.stringify(param));

	 $.ajax({
	        type: "POST",
	        url: postReceivedDetailsUrl,
	        data: JSON.stringify(param),
	        beforeSend : function(){startLoading();}
	      }).done(function(response) {

				if (checkResult(response,'typ')) {
					$("#commonPostSohQty").addClass("hideBlock");
					$.fn.showCustomMsg(['Receiving Details Posted Successfully'],success,'Order Details');
				} else {
					$.fn.showCustomMsg([mobiSerErrMsg],error,'Order Details');
				}
	      }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
		  }).always(function() {
			  stopLoading();
		  });
	
}
function getReceiveOrderContent(dataObj,asnNo,orderNo)
{
	var hdrObj = dataObj.hdrObj;
	var deliveryFlag = dataObj.deliveryFlag;
	var $elem = $('#receive_order');
	$.ajax({
	    type: "get",
	    url: 'getReceiveOrderContent.htm',
	    data: {},
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  var content = formOtherOrderHead(hdrObj,deliveryFlag,dataObj);
		  appendReceiveContent($elem,content+data,asnNo,orderNo,dataObj);
	  }).fail(function(data) {
		  if(data.status == 404)
			  window.location.replace(homeLink);
		  $.fn.showCustomMsg([ngboSessErrCode],error);
	  }).always(function() {
		  bindOnPageLoadEventsForReceiveOrder();
                  stopLoading();
	  });

}
function appendReceiveContent($elem,data,asnNo,orderNo,dataObj){
	$elem.addClass('hideBlock');
	$elem.html(data);
	$elem.removeClass('hideBlock');
	loadReceiveOrderJs();
	navigate(receive);
	callReceiveMethodConfigService(dataObj);
	if(temperatureDisableFlg){
		var areaTemp = $('#orderReceiveStep #step-1');
		areaTemp.find('.tempDtl').addClass('hideBlock')
		$('#CHTemp_lbl,#CHTemp_cont').addClass('hideBlock');	
		$('#HFTemp_lbl,#HFTemp_cont').addClass('hideBlock');
		globalTempFlag = false;
	}else{
		validateTemperatureCode(recvItemInfo);
	}
	$('.updateReceivedOrder').addClass('hideBlock');
        $('.commonReceiveOrder').addClass('hideBlock');
	$('.orderStatus').addClass('hideBlock');
	$('.receiveOrderStatus').removeClass('hideBlock');
	$('.orderReceive').find('#asnNo').val(asnNo);
	$('.orderReceive').find('#deliverySegNo').val(orderNo);
	var area = $('.orderReceive');
	area.find('#addULDTable').addClass('hideBlock');
	area.find('#addULDTable tbody').html('');
	if(isFutureDate($.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].on_show_date||'')))
	$('#plRadioDiv').removeClass('hideBlock');
	else
	$('#plRadioDiv').addClass('hideBlock');	
	
}


function callServiceForWizard(orderNo, sourceFlag, asnNo,dataObj) {
	commonOrder = dataObj.hdrObj;
	commonOrder.order_no_new = orderNo;
	 fullObject = dataObj;
	 //deliveryList= dataObj.deliveryObj;
	var data = {
			"iv_user_id":userId,
			"iv_delivery_no":orderNo,
			"iv_platform":"B",
			"iv_action":"V",
			"iv_session_id":"",
            "iv_receive_flag":"R",//Release 17.08 - Defect-11022 Fix
            "iv_era_flag":(dataObj.hdrDtlObj[0] != null && dataObj.hdrDtlObj[0].era_profile=="Y")?"Y":"N" //Defect 12257 Fix
			};
	console.log(getReceivingTransactionUrl + ' '+JSON.stringify(data));
	$.ajax({
	    type: "post",
	    url: getReceivingTransactionUrl,
	    data: JSON.stringify(data),
	    beforeSend: function(){
	    	startLoading();
	    }
	}).done(function(response) {
		if(response !='' && response !=undefined && response[0].MSG == "R"){
			$.fn.showCustomMsg(["Order has already been received. Refresh to view updated status. "],error,'Order Details');
			 stopLoading();
		}else{
			afterGettingReceiveTransactionId(orderNo,response,sourceFlag, asnNo,dataObj);
		}
	}).fail(function() {
		  $.fn.showCustomMsg([ngboSessErrCode],error);
	  }).always(function() {
		//  stopLoading();
	  });

}

function afterGettingReceiveTransactionId(orderNo,response,sourceFlag, asnNo,dataObj)
{

	ordSegNo = orderNo;
	var output=response[0];
	if((response!=undefined && response.length==0) || checkResult(response,'MSG'))
	{	
		transInfo = output;
		var msg = output.MSG;
		var usrId = output.USER_ID;
		var usrName = output.USER_NAME;
		$('.orderReceive').find('#deliverySegNo').val(orderNo);
		//console.log("msg--->"+msg);
		
		var partiallyReceivedByOtherUserMsg="There are few articles in this order are <strong>received by <span class='recei'>"+(usrName|| '')+'('+usrId+')'+" </strong> in previous session.";
		var partiallyReceivedBySameUserMsg="There are few articles in this order are <strong>captured as received</strong> in the system.";
		var currentlyReceivedByOtherUserMsg=(usrName|| '')+'('+usrId+')'+'  is currently updating/receiving this order.';
		
		if(msg=='N'){
			callItemInfoForReceiving('N', orderNo, sourceFlag,dataObj,asnNo);
			//Directly redirect to the next page without popup
		}else if(msg=='S'){
		    //show popup
			if(usrId.toLowerCase() != userId.toLowerCase()){
				$("#dialog-sessionRCV .warningName").html(partiallyReceivedByOtherUserMsg);
				$("#dialog-sessionRCV #resumeSessRCV").addClass('hideBlock');
		}else{
			$("#dialog-sessionRCV .warningName").html(partiallyReceivedBySameUserMsg);
		}
			bindRecvConfirmationEvents(orderNo, sourceFlag,dataObj,asnNo);
			$("#dialog-sessionRCV").dialog("open");
			stopLoading();
		}else if(msg=='L'){
			//Show the  information
			$('.commonReceiveOrder').removeClass('hideBlock');
                        $('.updateReceivedOrder').removeClass('hideBlock');                        
			$.fn.warnPopup('alert',currentlyReceivedByOtherUserMsg,'Order Details','','',triggerOk,'');
			stopLoading();
		}
	}
	
	
}

var triggerOk = function(e)
{
	 $('#dialog-alert-conf').dialog('close');	
};

function showSessionPopUp(dataObj)
{
	 var orderNo = dataObj.hdrObj.order_no;
	 var sourceFlag = dataObj.hdrObj.source_flag;
	 var asnNo = (dataObj.hdrDtlObj[0].asn_no||'');
		callServiceForWizard(orderNo, sourceFlag,asnNo,dataObj);
}

function bindRecvConfirmationEvents(orderNo, sourceFlag,dataObj,asnNo){
	$("#resumeSessRCV").unbind('click');
	$("#resumeSessRCV").click({dataObj:dataObj,asnNo:asnNo},function(e) {
		var dataObj= e.data.dataObj;
		var asnNo = e.data.asnNo;
		//receiveInFull_dataObj=e.data.dataObj;
		callItemInfoForReceiving('Y', orderNo, sourceFlag,dataObj,asnNo);               
	});
	$("#newSessRCV").unbind('click');
	$("#newSessRCV").click({dataObj:dataObj,asnNo:asnNo},function(e) {
		var dataObj = e.data.dataObj;		
		var asnNo = e.data.asnNo;		
		callItemInfoForReceiving('N', orderNo, sourceFlag,dataObj,asnNo);
	});
	
	$("#dialog-sessionRCV").parent().find(".closePopUp").unbind('click');// changed to specific class as it was affecting the default rec popup
	$("#dialog-sessionRCV").parent().find(".closePopUp").click(function(e) {
		$('.commonReceiveOrder').removeClass('hideBlock');
        $('.updateReceivedOrder').removeClass('hideBlock');                
		$('.orderStatus').removeClass('hideBlock');
		$('.receiveOrderStatus').addClass('hideBlock');	 
		$("#dialog-sessionRCV").dialog("close");
		  });
	
}


function callItemInfoForReceiving(retainSessionFlag, orderNo, sourceFlag,dataObj,asnNo){ 
        receiveInFull_retainSessionFlag=retainSessionFlag;
        receiveInFull_dataObj=dataObj;		
		receiveInFull_asnNo=asnNo;
		receiveInFull_sourceFlag=sourceFlag;
		receiveInFull_orderNo=orderNo;  
	var param = {
			// 17.08 Meat Co Vendor Changes
			"iv_order_no" : ((isPO(commonOrder.order_type)?orderNoDtl[0].delivery_no:getEmptyIfNull(orderNo))|| getEmptyIfNull(orderNo)),
			"iv_site" : siteNo,
			"iv_session_id" : "111",
			"iv_user_id" : "",
			"iv_source_flag" : sourceFlag,
			"iv_retain_session_flag" : retainSessionFlag,
			"iv_sales_org" : salesOrg,
			"iv_receive_flag":"",			
            //"iv_receive_flag":retainSessionFlag,			
			"iv_display_flag":"N"
		};
	console.log(orderItemInfoURL+' '+JSON.stringify(param));
	$.ajax({
	    type: "post",
	    url: orderItemInfoURL,
	    data: JSON.stringify(param),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(response) {
		  if(response['LV_QTY']!=undefined && response['LV_QTY'].length>0){
				if(checkResult(response['LV_QTY'],'article')){	                                
					if(dataObj.yet_to_receive_art != '' && dataObj.yet_to_receive_art.length>0 && salesOrg==1060 && era_prof=="Y"){
						recvItemInfo = dataObj.yet_to_receive_art;
					}else{
						recvItemInfo = response['LV_QTY'];        
					}
					recvItemInfo_zero = response['LV_QTY_ZERO'] == undefined ? [] : response['LV_QTY_ZERO'];
					if(recvItemInfo != '' && recvItemInfo.length>0){
						if(retainSessionFlag != 'Y'){
							for(var i =0; i<recvItemInfo.length; i++){
								recvItemInfo[i].received_qty = null;
								recvItemInfo[i].received_qty_uom = null;
								recvItemInfo[i].recv_om = null;
							}
						}
						getOrderComponentesItemInfo(param,dataObj);
						initializeReceiveOrderPage(dataObj,asnNo,orderNo);
					}
				}
		  	}else{
		  		$.fn.showCustomMsg([mobiSerErrCode],error);
		  	}
	}).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  });
	//stopLoading();
}

function callReceiveMethodConfigService(dataObj) {
	var itemCondition = formRecvItemCondition(dataObj);
	
	var param = {
		"iv_user_id" : userId,
		"iv_sales_org" : salesOrg,
		"iv_role_id" :  $('#roleId').val(), //NEED TO REMOVE HARD CODED VALUE
		"iv_order_type" : recvMethodOrderType[commonOrder.order_type],
		"iv_condition" : itemCondition,
		"iv_session_id" : "100"
	};
	
	var configParam = {
			"iv_user_id":$('#loginUserId').val(),
			"iv_sales_org" : salesOrg,
			"iv_order_type" : recvMethodOrderType[commonOrder.order_type],
			"iv_config_code":"VCAU,AMA,PRQ,PRW,URQ,EDOR,ULD",
			"iv_session_id":"100"
	};

	console.log(receiveMethodConfigUrl + ' ' + JSON.stringify(param));

	$.ajax({
	    type: "post",
	    url: receiveMethodConfigUrl,
	    data: JSON.stringify(param),
	  }).done(function(response) {
		  if(response != null  && response.length > 0 && response[0].receive_method != undefined ){
			    receivingFullFlag=false;
				for ( var i = 0; i < response.length; i++) {
					$('.orderReceive .reportRadio').find(
							'.method' + response[i].receive_method)
							.removeClass('hideBlock');
							if(response[i].default_flag == 'Y')
							{
							defaultMethod = response[i].receive_method;
							if(defaultMethod=="RF"){
								receivingFullFlag=true;
								bindReceivingMethodChange();
							}
							$('.orderReceive .reportRadio').find(
							'.method' + response[i].receive_method).find('input[type=radio]:visible:first').prop('checked', true);
							}
							
				}
				if($('.orderReceive').find('.reportRadio').find('input[type=radio]:visible:checked').length == 0)
				$('.orderReceive').find('.reportRadio').find('input[type=radio]:visible:first').prop('checked', true);
			}
		  callServiceToFrameConfigMap(configParam);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	  }).always(function() {
		  //stopLoading();
	  });
	
	
}

function callServiceToFrameConfigMap(configParam)
{
	console.log(getReceiveConfigUrl + ' ' + JSON.stringify(configParam));
	  $.post(
				getReceiveConfigUrl,
				JSON.stringify(configParam))
		.done(
				function(
						response) {
					formRecvConfigMap(response);
					initializeRecvFields();
				}).fail(function() {
					  $.fn.showCustomMsg([mobiSerErrCode],error);
				  });
}

function validateTemperatureCode(itemInfo){
	var chilledFlag = false;
	var hardFrozenFlag = false;
	var area = $('#orderReceiveStep #step-1');
	for(var i=0; i< itemInfo.length; i++){
		if(itemInfo[i].temperature_range_code != null){
			if(itemInfo[i].temperature_range_code == 'CH'){
				chilledFlag = true;
			} else if(itemInfo[i].temperature_range_code == 'HF'){
				hardFrozenFlag = true;
			}
		}
		if(chilledFlag && hardFrozenFlag){
			break;
		}
	}      


	(chilledFlag || hardFrozenFlag) ? area.find('.tempDtl').removeClass('hideBlock') : area.find('.tempDtl').addClass('hideBlock');
	//(chilledFlag) ? area.find('.chilled').removeClass('hideBlock') : area.find('.chilled').addClass('hideBlock');
	//(hardFrozenFlag) ? area.find('.hardFrozen').removeClass('hideBlock') : area.find('.hardFrozen').addClass('hideBlock');
	if(chilledFlag){
		area.find('.chilled').removeClass('hideBlock');
		$('#CHTemp_lbl,#CHTemp_cont').removeClass('hideBlock');	
	}else{
		area.find('.chilled').addClass('hideBlock');
		$('#CHTemp_lbl,#CHTemp_cont').addClass('hideBlock');
	}
	if(hardFrozenFlag){
		area.find('.hardFrozen').removeClass('hideBlock');
		$('#HFTemp_lbl,#HFTemp_cont').removeClass('hideBlock');	
	}else{
		area.find('.hardFrozen').addClass('hideBlock');
		$('#HFTemp_lbl,#HFTemp_cont').addClass('hideBlock');
	}
	bindTemperatureFieldsEvents(area);
}
function initializeReceiveOrderPage(dataObj,asnNo,orderNo){       
	getReceiveOrderContent(dataObj,asnNo,orderNo);
	$("#dialog-sessionRCV").dialog("close");
}
function initializeRecvFields() {
	$('#invoice').onlyAlphaNumericCharacters();
	$('#did').onlyAlphaNumericCharacters();
	$('#temperature1').temperatureChk();
	$('#temperature2').temperatureChk();
	
	if(!(recvConfigMap['AMA'] != null && recvConfigMap['AMA'] == 'Y')){
		$('.orderReceive #step-2').find('#addActionBtn').addClass('hideBlock');
	}
	if(!(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')){	
		$('.orderReceive #tab-4').addClass('ui-state-disabled');
	}
	if(commonOrder.order_type == 'WAREHOUSE' || commonOrder.order_type == 'STOCK TRANSFER' 
		|| era_prof =='Y'){
		$('.orderReceive #step-1').find('.delvDtl').addClass('hideBlock');
	}
	/*if(commonOrder.order_type == 'STOCK TRANSFER'){
		$('.delvDtl').find('.mandatory').removeClass('mandatory');
	}*/
	oldRecvMethod = $('.orderReceive .reportRadio').find('input[type="radio"]:checked').val();
}
//R17.07 - Pay On Scan - Receiving Method Changes
/***************Existing Conditions**************************/
/*
function formRecvItemCondition(dataObj){
	//receive_in_full, asn_required in hdrDtlObj
	var itemCond = '';
	var rangedFlag = false;
	var weightedFlag = false;
	var asnFlag = false;
	notRangedItem = 0;
	for(var i=0; i< recvItemInfo.length; i++){
		rangedFlag = (recvItemInfo[i].ranged_flag == 'Y') ? true : false;
		if(!rangedFlag){
			notRangedItem++;
		}
		weightedFlag = (recvItemInfo[i].random_wt_flag == 'Y') ? true : weightedFlag; //atlease one random weight check
	}
	
	//for(var i=0; i< dataObj.hdrDtlObj.length; i++){
		asnFlag = (getEmptyIfNull(dataObj.hdrDtlObj[0].asn_no) != '') ? true : false;
                if((dataObj.hdrDtlObj[0].non_disp_flag == 'Y' && 
                		commonOrder.order_type == 'WAREHOUSE') 
                        || (salesOrg==1060 && dataObj.hdrDtlObj[0].era_profile =="Y")){
                    asnFlag = false;    
                }
	//}
	
	if(notRangedItem>0){
		itemCond = 'NR';
		containsNotRangedItem = true;
	} else {
		itemCond = 'R';
		containsNotRangedItem = false;
	}
	
	if(weightedFlag){
		itemCond += ',RW';
	}
	if(asnFlag){
		itemCond += ',ASN';
	}
	if(dataObj.hdrDtlObj[0] != undefined && dataObj.hdrDtlObj[0].era_profile == 'Y'){
		if(auditFlag=='Y'){
		itemCond += ',ERA';
	}
	
		if(auditFlag!='Y'){
		itemCond += ',ERWA';
	}
	}
	
	return itemCond;
}*/
/***************Pay On Scan 17.07 New Changes**************************/
function formRecvItemCondition(dataObj){
        
   var sourceFlag = (dataObj != '' && dataObj.hdrObj != '')?dataObj.hdrObj.source_flag:'';
   var asnRequired = (dataObj != '' && dataObj.hdrDtlObj != '' && dataObj.hdrDtlObj.length >0)?dataObj.hdrDtlObj[0].asn_required:'';
   var receiveInFull = (dataObj != '' && dataObj.hdrDtlObj != '' && dataObj.hdrDtlObj.length >0)?dataObj.hdrDtlObj[0].receive_in_full:'';
   var isVirtualDC = ((dataObj != '' && dataObj.hdrDtlObj != '' && dataObj.hdrDtlObj.length >0)
   && ((dataObj.hdrDtlObj[0].non_disp_flag == 'Y' && isSTO(dataObj.hdrObj.order_type)) 
   ))?true:false; //|| (salesOrg==1060 && dataObj.hdrDtlObj[0].era_profile =="Y") // removed era condition as the same is handled in Audit flag
          
   var hasRandomWgt = false;	
   var hasNotRanged = false;	
	
   var itemCond = '';
      
   for(var i=0; i< recvItemInfo.length; i++){
	   hasNotRanged = (recvItemInfo[i].ranged_flag == 'Y') ? hasNotRanged : true; //atlease one ranged article
	   hasRandomWgt = (recvItemInfo[i].random_wt_flag == 'Y') ? true : hasRandomWgt; //atlease one random weight check
	   /*if(temperatureDisableFlg){
		   recvItemInfo[i].temp_chk_flag = 'N';
	   }*/
   }  
   /*if(temperatureDisableFlg){
	   for(var i =0 ; i< recvItemInfo_zero.length;i++){
		   recvItemInfo_zero[i].temp_chk_flag = 'N';
	   }
   }*/
   if(!isVirtualDC && ((isPO(dataObj.hdrObj.order_type) && sourceFlag == 'D' && auditFlag != 'Y') || (isSTO(dataObj.hdrObj.order_type) && sourceFlag == 'D'))){
       itemCond+=  'ASNWA';  
   }   
   if(!isVirtualDC && auditFlag == 'Y' && sourceFlag == 'D'){
       itemCond+=  (itemCond != ''?(','+'ASNA'):'ASNA');
   }   
   if(!isVirtualDC && asnRequired == 'Y' && sourceFlag == 'O'){
       itemCond+=  (itemCond != ''?(','+'ASNND'):'ASNND');  
   }
   if(asnRequired != 'Y' && hasRandomWgt && receiveInFull != 'Y' && (isPO(dataObj.hdrObj.order_type) || isSTO(dataObj.hdrObj.order_type))){
       itemCond+=  (itemCond != ''?(','+'RWWRF'):'RWWRF'); 
   }
   if(asnRequired != 'Y' && hasRandomWgt && receiveInFull == 'Y' && (isPO(dataObj.hdrObj.order_type) || isSTO(dataObj.hdrObj.order_type))){
	   itemCond+=  (itemCond != ''?(','+'RWRF'):'RWRF');  
   }
   if(asnRequired != 'Y' && !hasRandomWgt && receiveInFull != 'Y' && (isPO(dataObj.hdrObj.order_type) || isSTO(dataObj.hdrObj.order_type))
	   || (receiveInFull != 'Y' && !hasNotRanged && isST(dataObj.hdrObj.order_type))){
	   itemCond+=  (itemCond != ''?(','+'PORWRF'):'PORWRF');  
   }
   if((asnRequired != 'Y' && !hasRandomWgt && receiveInFull == 'Y' && (isPO(dataObj.hdrObj.order_type) || isSTO(dataObj.hdrObj.order_type)))
	   || (receiveInFull == 'Y' && !hasNotRanged && isST(dataObj.hdrObj.order_type))){
	   itemCond+=  (itemCond != ''?(','+'PORRF'):'PORRF');  
   }
   if((asnRequired != 'Y' && !hasRandomWgt && receiveInFull != 'Y' && hasNotRanged && (isPO(dataObj.hdrObj.order_type)))
	   ||(receiveInFull != 'Y' && hasNotRanged && (isSTO(dataObj.hdrObj.order_type) || isST(dataObj.hdrObj.order_type)))){
	   itemCond+=  (itemCond != ''?(','+'PONRWRF'):'PONRWRF'); 
   }
   if((asnRequired != 'Y' && !hasRandomWgt && receiveInFull == 'Y' && hasNotRanged && (isPO(dataObj.hdrObj.order_type)))
	   ||(receiveInFull == 'Y' && hasNotRanged && (isSTO(dataObj.hdrObj.order_type) || isST(dataObj.hdrObj.order_type)))){
	   itemCond+=  (itemCond != ''?(','+'PONRRF'):'PONRRF'); 
   }
   containsNotRangedItem = hasNotRanged; 
   return itemCond;
}
function bindTemperatureFieldsEvents(area){
	area.find('.chilled, .hardFrozen').unbind('keyup');
	area.find('.chilled, .hardFrozen').on('keyup', function(){
		globalTempFlag = false;
	});
}
function bindSitePopupEvents($popArea, segmentFlag,elem,dataObj){
	$popArea.find("#pos1").unbind('keypress');
	$popArea.find('#pos1').keypress(function(){
		$popArea.find('input[id="siteSelect"][type="radio"]:checked').prop('checked', false);
		$popArea.find("#pmywhlist #warehouseInPopup").val('0');
	});
	$popArea.find("#verifysite").unbind('click');
	$popArea.find('#verifysite').click(
			function() {
				//hideError();
				//hideErrorContent();
				if ($popArea.find('#pos1').val().trim() == '') {
					$.fn.showCustomMsg(['Please enter a store number or name'],error,'Stock Transfer');
					//$popArea.find('#pos1').error('');
				} else {
					var siteVal = $.trim($('#pos1').val()).split('-')[0].trim();
					verifyStore({
						iv_site: siteVal
					}, true, $popArea);
				}

			});
	$popArea.find("#pwh").unbind('click');
	$popArea.find("#pwh").click(function() {
		$popArea.find("#popupSearch, .errorDiv").addClass('hideBlock');
		$popArea.find("#siteResults").addClass('hideBlock');
		$popArea.find("#pmywhlist").removeClass('hideBlock');
		$popArea.find("#pmywhlist").val('0');
		/*
		 * createWareHouseList({ siteNo : loggedInSiteNo });
		 */
		//$('.removeStore').trigger('click');
		$popArea.find('#pos1').val('');
	});
	$popArea.find("#pnearby").unbind('click');
	$popArea.find("#pnearby").click(function() {
		//restNearbyVal();
		var distance = 10;
		var maxStores = 10;
		var salesOrgList = [];
		salesOrgList.push($('#salesOrg').val());
		$popArea.find('#pos1').val('');
		$popArea.find("#pmywhlist, .errorDiv").addClass('hideBlock');
		$popArea.find("#pmywhlist").val('0');
		var data = {
			"articleNo"	: "",
			"siteNo" : siteNo,//removed hardcoded 0150 value
			"salesOrg" : salesOrgList,
			"distance" : distance,
			"maxStores" : maxStores,
			"userId"	: $('#loginUserId').val(),
			"sap"	: encSapPwd
		};
		getNearbyStores($popArea, data);


	});
	$popArea.find(".nearbyStoreSearchBtn").unbind('click');
	$popArea.find(".nearbyStoreSearchBtn").click(function() {
		salesOrg = $('.salesOrgMap').val();
		var distance = $('#near-by-distance').val();
		var maxStores = $('#near-by-max').val();
		var salesOrgList = [];
		salesOrgList.push(salesOrg);
		$popArea.find('#pos1').val('');
		$popArea.find("#pmywhlist, .errorDiv").addClass('hideBlock');
		$popArea.find("#pmywhlist").val('0');
		var data = {
				"articleNo"	: "",
				"siteNo" : siteNo,// removed hardcoded 0150 value
				"salesOrg" : salesOrgList,
				"distance" : distance,
				"maxStores" : maxStores,
				"userId"	: $('#loginUserId').val(),
				"sap"	: encSapPwd
			};
		getNearbyStores($popArea, data);

	});
	$popArea.find("#ibtProceed").unbind('click');
	$popArea.find('#ibtProceed').click(function(){
		
		var itemParam = new stockItemParam();

		if (validateStockTransfer($popArea, itemParam,dataObj)) {
			var tempList = [];
			tempList.push(itemParam);
			param = new stockParam(tempList, itemParam.iv_supplier);
			createIBTHdrDraftList(param, segmentFlag,elem,dataObj);
		}
		
	});
	$popArea.find("#ibtCancel").unbind('click');
	$popArea.find('#ibtCancel').click(function(){
		
		$popArea.dialog('close');
		
	});
	$popArea.find("#pmywhlist").unbind('change');
	$popArea.find("#pmywhlist").change(function()
			{
		$popArea.find('#pos1').val('');
			});
}

//VALIDATE THE CREATE IBT SCREEN ON CLICK OF CREATE BUTTON
function validateStockTransfer(area, itemParam,dataObj) {
	var flag = true;
	var site = getSiteNo(area);
	var siteNo = site.split('-')[0];
	var siteName = site.split('-')[1];
	var allErrors = [];
	//var warehouse = $('#wh').is(':checked');
	if (siteNo == '') {
		//showErrorContent('Create','Please select a Target Site');
		//showError('Please select a Target Site');
		flag = false;
		allErrors.push('Please select a Target Site');
		//area.find('.errorDiv label').text('Please select a Target Site');
		//area.find('.errorDiv').removeClass('hideBlock');
		
	}  if (area.find("#isVerified").val() != 'true' && area.find('#pos1').val().trim()!='') {
		//showErrorContent('Create','Please verify the site before creating draft');
		//showError('Please verify the site before creating draft');
		flag = false;
		//area.find('#pos1').error('Please verify the site before creating draft');
		allErrors.push('Please verify the site before creating draft.');
	}  if ((siteNo == $('#posSite').val())) {
		flag = false;
		//showErrorContent('Create','Target Site cannot be same as logged in site');
		//area.find('#pos1').error('Target Site cannot be same as logged in site');
		allErrors.push('Target Site cannot be same as logged in site.');
	} if(isPO(dataObj.hdrObj.order_type) && warehouseMap.hasOwnProperty(siteNo))
		{
		if(area.find('#pos1').val().trim()!='')
			{
		//area.find('#pos1').error('Cannot add vendor supplied articles to a warehouse.');
		allErrors.push('Cannot transfer vendor supplied articles to a warehouse.');
		}
		
		if(area.find("#pwh").is(':checked') && area.find('#warehouseInPopup').val() != 0 && area.find('#warehouseInPopup').val() != 'Select'
			&& $('option[value="' + area.find('#warehouseInPopup').val() + '"]') != undefined)
			{
			//area.find('#warehouseInPopup').error('Cannot add vendor supplied articles to a warehouse.');
			allErrors.push('Cannot transfer vendor supplied articles to a warehouse.');
			}
		flag= false;
		}
	if(flag) {

		itemParam.iv_action = 'D';
		itemParam.iv_user = $('#loginUserId').val();
		itemParam.iv_supplier = siteNo;
		itemParam.iv_order_type = 'OADV';
		itemParam.iv_contact_name = '';
		itemParam.iv_contact_no = '';
		itemParam.iv_pickup_date = formatDateMobi(getDesiredPastDate(0));
		itemParam.iv_pickup_time = '00:00';
		itemParam.iv_comments = '';

		// USED TO CUT THE EXTRA SERVICE CALL TO LOAD THE MAP INFO
		itemParam.user = $('#loginUserId').val();
		itemParam.supplier = siteNo;
		itemParam.supplier_name = siteName;
		itemParam.order_type = 'OADV';
		itemParam.contact_name = '';
		itemParam.contact_no = '';
		itemParam.pickup_date = formatDateMobi(getDesiredPastDate(0));
		itemParam.pickup_time = '00:00';
		itemParam.comments = '';

		flag = true;
	}
	
	if(!flag)
		{
		$.fn.showCustomMsg(allErrors,error,'Stock Transfer');
		}
	return flag;
}

// TO GET THE SITE NO FROM THE INPUT FIELD
function getSiteNo(area) {
	var site = '';
	if ($.trim(area.find('#pos1').val()) != '') {
		site = $.trim(area.find('#pos1').val());
	} else if (area.find('input[id="siteSelect"][type="radio"]:checked').length > 0) {
		site = area.find('input[id="siteSelect"][type="radio"]:checked').val();
	} else if (area.find('#warehouseInPopup').val() != 0 && area.find('#warehouseInPopup').val() != 'Select'
			&& $('option[value="' + area.find('#warehouseInPopup').val() + '"]') != undefined) {
		site = $.trim($('option[value="' + area.find('#warehouseInPopup').val() + '"]').text());
	} else {
		site = '';
	}
	return site;
}

function verifyStore(data, flag, $popArea) {
	
	console.log(getSiteDescriptionUrl+' '+JSON.stringify(data));
	$
			.ajax({
				data : JSON.stringify(data),
				url : getSiteDescriptionUrl,
				type : 'post',

				beforeSend : function() {
					// console.log("---4");
					startLoading();
				},
				success : function(response) {
					var res = response;
//					hideErrorContent();
					$('#dialog-verify .popupActionsWrapper').addClass(
							'hideBlock');
					$popArea.find('.errorDiv').addClass('hideBlock');
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</th><th data-sort="string" class="sorted ascending" >Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
					if (res != null && res != undefined && res.length > 0) {
						var list = res;
						var j = 0;
						var k = 1;
						var siteNo = '';
						var siteName = '';
						siteNo = list[0].site_no;
						siteName = list[0].site_desc;
						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>'
									+ list[i].site_no + '</td><td>'
									+ list[i].site_desc + '</td>';
							tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectStore">Select</label></label></td></tr>';

							if (j % 9 == 0) {
								k++;
							}

						}
						if (j > 1) {
							currPage = 1;
							$('#dialog-verify h4')
									.html(
											'Too many search results for <strong>'
													+ $.trim($('#pos1')
															.val())
													+ '</strong>. Please select a store from the list below.');
							$('#dialog-verify').parent().find(
									'.ui-dialog-titlebar .ui-dialog-title')
									.text('Verify Store');
							$('#dialog-verify .ContentTable').html('');
							$('#dialog-verify .ContentTable').html(tblHdr);
							$('#dialog-verify .noteLbl').remove();
							$("#dialog-verify").dialog("open");
							$('#dialog-verify .textbox ').attr('placeholder',
									'Enter store no. or name');
							$('#dialog-verify .popupActionsWrapper ').addClass(
									'hideBlock');
							if (j > 9) {
								$('.verifyPagination').removeClass('hideBlock');
								$('.verifyPagination').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPage,
									onPageClick : function(pageNumber) {
										showStoreNoPage(pageNumber);

									}

								});
							} else {
								$('.verifyPagination').addClass('hideBlock');
							}
							bindVerifyStoreContent($('#dialog-verify'));
							//bindStoreContent(flag);
						} else {
							if (siteNo != '' && siteName != '') {
								var site = siteNo + '-' + siteName;
								$popArea.find('#pos1').val(site);
								$popArea.find("#isVerified").val(true);
								$('.removeStore').trigger('click');
								$popArea.find('#warehouseInPopup').val('Select');
							} else {
								showAllErrors(['Invalid store Id/Name']);
								//showError('Invalid store Id/Name');
							}
						}

					} else {
						showAllErrors(['Invalid store Id/Name']);
						//showError('Invalid store Id/Name');
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
					stopLoading();
				}
			});
}

function bindVerifyStoreContent(storePoparea) {
	var area = $('#dialog-editSitePop');
	storePoparea.find('.selectStore').click(
			function() {
				//hideErrorContent();
				var site = $(this).parent().parent().parent().find('td:first')
						.text().trim()
						+ '-'
						+ $(this).parent().parent().parent().find(
								'td:nth-child(2)').text().trim();
				area.find('#pos1').val(site);
				area.find("#isVerified").val(true);
				storePoparea.dialog("close");
				area.find('.removeStore').trigger('click');
				area.find('#warehouse').val('Select');
			});
}

function showStoreNoPage(pageNo) {
	currentPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}


function createWareHouseList(data) {
	var content = '<option value="0">Select</option>';
	if (!$('#pmywhlist select').hasClass('loaded')) {
		$
				.ajax({
					// data : JSON.stringify(data),
					data : data,
					url : warehouseLookupServiceURL,
					type : 'post',

					beforeSend : function() {
						// console.log("---4");
						startLoading();
					},
					success : function(response) {
						// var res = $.parseJSON(response);
						var res = response;
						if (res != null && res != undefined && res.length > 0
								&& res[0].site_no != undefined) {

							for ( var i = 0; i < res.length; i++) {
								warehouseMap[res[i].site_no] = res[i].site_no;
								content += '<option value="' + res[i].site_no
										+ '">' + res[i].site_no + '-'
										+ res[i].site_desc + '</option>';
							}
						} else {
							showAllErrors(['No warehouse availalbe for the logged in store']);
							//showError('No warehouse availalbe for the logged in store');
						}
						$('#pmywhlist select').html(content);
						stopLoading();
					},
					error : function() {
						// goToLogin();
						$('#pmywhlist select').html(content); 
						stopLoading();
					}
				});
		$('#pmywhlist select').addClass('loaded');
	}
}

function getNearbyStores(area, data) {
	console.log(nearbyStoreSearchURL+' '+JSON.stringify(data));
	var tblHdr = '<thead><tr><th>Site No</th><th>Site Name</th><th width="100px" class="lastColumn centerValue">Select</th></tr></thead>';
	$
			.ajax({
				// data : JSON.stringify(data),
				data : JSON.stringify(data),
				url : nearbyStoreSearchURL,
				type : 'post',

				beforeSend : function() {
					// console.log("---4");
					startLoading();
				},
				success : function(response) {
				//	var res = $.parseJSON(response);
					var res = response;
					
					area.find('#siteResults').removeClass('hideBlock');
					area.find('#popupSearch').removeClass('hideBlock');
					if (res != null && res != undefined && res.data !=null && res.data.length>0 &&  res.data[0].site_no !=null) {
						var list = res.data;
						var j = 0;
						var k = 1;

						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="nearbyVerifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>'
									+ list[i].site_no + '</td><td>'
									+ list[i].site_name + '</td>';
							tblHdr += '<td class="sorted lastColumn centerValue"><input type="radio" id="siteSelect" name="siteSelect" value="'+list[i].site_no+'-'+list[i].site_name+'"></td></tr>';

							if (j % 9 == 0) {
								k++;
							}

						}
						if (j >= 1) {
							currPageNear = 1;
							area.find('#siteResults').removeClass('hideBlock');
							area.find('#siteResults #searchWarning').addClass(
									'hideBlock');
							area.find('#siteResults .tableTitle').removeClass(
									'hideBlock');
							area.find('#siteResults .ContentTable')
									.removeClass('hideBlock');
							area.find('#siteResults .tableTitle strong').text(
									list.length);
							area.find('#siteResults .ContentTable').html('');
							area.find('#siteResults .ContentTable').html(
									tblHdr);
							area.find('#siteResults .noteLbl').remove();
							//$("#dialog-siteSearchPop").dialog("open");
							if (j > 9) {
								area.find('.nearby-pagination ').removeClass(
										'hideBlock');
								area.find('.nearby-pagination ').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPageNear,
									onPageClick : function(pageNumber) {
										showNearbyStoreNoPage(area, pageNumber);

									}

								});
							} else {
								area.find('.nearby-pagination ').addClass('hideBlock');
							}
							//bindNearByStoreContent();

						}

					} else {
						area.find('#siteResults').removeClass('hideBlock');
						area.find('#siteResults .ContentTable').addClass(
								'hideBlock');
						showErrorInpopUp(
								area.find('#siteResults #searchWarning'),
								'Sorry , no results found for the search criteria. Please try again.');
						area.find('.nearby-pagination ').addClass('hideBlock');
						area.find('#siteResults .tableTitle').addClass(
								'hideBlock');
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
					// $('#mywhlist select').html(content);
					area.find('#siteResults').removeClass('hideBlock');
					area.find('#siteResults .ContentTable').addClass(
							'hideBlock');
					showErrorInpopUp(area.find('#siteResults #searchWarning'),
							'Sorry , no results found for the search criteria. Please try again.');
					area.find('.nearby-pagination ').addClass('hideBlock');
					area.find('#siteResults .tableTitle')
							.addClass('hideBlock');
					stopLoading();
				}
			});
}

function showNearbyStoreNoPage(area,pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	area.find('.nearbyVerifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function showErrorInpopUp(elem, msg) {
	$(elem).html('<h4>' + msg + '</h4>').removeClass('hideBlock');
}

function stockParam(itemArray, supplier) {
	this.ItemArray = itemArray;
	this.iv_supplier = itemArray[0].iv_supplier;
}

function stockItemParam() {
	this.iv_delivery_date = formatDateMobi(getDesiredPastDate(0));
	this.iv_roster_date = formatDateMobi(getDesiredPastDate(0));
	this.iv_site = $('#posSite').val();
	this.iv_session_id = '123';
	this.iv_article = '';
	this.iv_article_uom = '';
	this.iv_created_user = '';
	this.iv_created_time = '';
	this.iv_action = '';
	this.iv_submitted_user = '';
	this.iv_submitted_time = '';
	this.iv_updated_user = '';
	this.iv_updated_time = '';
	this.iv_qty = '';
	this.iv_om = '';
	this.iv_delivery_date = '';
	this.iv_supplier = '';
	this.iv_roster_date = '';
	this.iv_order_type = '';
	this.iv_preq_no = '';
	this.iv_weight = '';
	this.iv_contact_name = '';
	this.iv_contact_no = '';
	this.iv_pickup_date = '';
	this.iv_pickup_time = '';
	this.iv_comments = '';
}

//CREATE THE IBT HEADER LIST
function createIBTHdrDraftList(param, segmentFlag,elem,dataObj) {
	console.log(createIBTDraftHdrList+ ' ' + JSON.stringify(param));
	$.ajax({
		data : JSON.stringify(param),
		// data : param,
		url : createIBTDraftHdrList,
		type : 'post',

		beforeSend : function() {
			// console.log("---4");
			startLoading();
		},
		success : function(response) {
			//hideErrorContent();
			triggerStockDraftCreate(param.iv_supplier, segmentFlag,elem,dataObj);
			
		},
		error : function(err) {
			console.log(err);
			stopLoading();
			showAllErrors(['Network issue occured while creating the draft']);
			//showError('Network issue occured while creating the draft');
		}
	});
}

//ADDING ARTICLE TO THE DRAFT LIST
function triggerStockDraftCreate(siteNo, segmentFlag,elem,dataObj) {
	recvSite=siteNo;
	if(segmentFlag == 'D'){
		var deliveryNo= $(elem).attr('id').split('-')[0];
		var contObj = $('#order_detail').data('contObj');
		var seg_index = $('#sections-tab ul:visible li.ui-tabs-active,ui-state-active').attr('data-seg-index');
		var status = contObj.deliveryObj[seg_index].status;
		var rec_flag = (isReceived(status) || isPartiallyReceived(status)) ? 'Y' :'N';
		startLoading();
		getOrderItemInfo(new OrderItemParam(deliveryNo,'D','',rec_flag),dataObj,addArticlesToTransferList);
	} else {
		addArticlesToTransferList();
	}
	
}
var addArticlesToTransferList = function ()
{
	var list;
	var tempParam = {};
	var tempList = [];
	var supplier = $('#posSite').val();
	
		list = itemInfo;
		
		for ( var i = 0; i < list.length; i++) {
		var qty = (list[i].received_qty != null && list[i].received_qty != '' && list[i].received_qty != undefined) ? list[i].received_qty
				: '0';
		var tot_qty = 0;
		list[i].om = (list[i].om != null && list[i].om != '' && list[i].om != undefined) ? list[i].om
				: '0';
		list[i].random_wgt_flg = (list[i].random_wgt_flg != null
				&& list[i].random_wgt_flg != undefined && list[i].random_wgt_flg
				.trim() != '') ? list[i].random_wgt_flg : '';
		tot_qty = Number(list[i].om) * (qty);
		tempParam = new stockItemParam();
		tempParam.iv_site = recvSite;
		tempParam.iv_delivery_date = formatDateMobi(getDesiredPastDate(0));
		tempParam.iv_roster_date = formatDateMobi(getDesiredPastDate(0));
		tempParam.iv_article = list[i].article;
		tempParam.iv_article_uom = (list[i].order_uom || '');
		tempParam.iv_user = $('#loginUserId').val();
		tempParam.iv_action = 'D';
		tempParam.iv_qty = qty;
		tempParam.iv_supplier = supplier;
		tempParam.iv_draft_type = 'OADV';
		tempParam.iv_new_uom = list[i].article_uom;
		tempParam.iv_om = list[i].om;
		tempParam.iv_tot_qty = tot_qty;
		tempParam.iv_random_wgt_flg = list[i].random_wgt_flg;
		tempParam.order_type = 'IBT';
		tempParam.iv_platform = 'B';
		tempParam.iv_cost_price = '0';
		tempParam.iv_greenlife_flag = 'N';
/*		tepmParam.iv_expiry_date1= "";;//defect no 5876
	    tepmParam.iv_expiry_date2= "";
	    tepmParam.iv_expiry_date3= ""; 
	    tepmParam.iv_expiry_date4= ""; 
	    tepmParam.iv_expiry_date5= "";*/
		tempList.push(tempParam);
	}

		param = new stockParam(tempList, supplier);
		param.iv_site = recvSite;
		//param.tempArticleList = list;
		createIBTDraftArticleList(param);
		
};

function createIBTDraftArticleList(param) {
	console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
	$
			.ajax({
				data : JSON.stringify(param),
				url : createOrdersDraftList,
				type : 'post',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					/*
					 * if (response.ErrorID == undefined) { showError('Techincal
					 * issue occured while updating draft'); } else {
					 */
					// }
					if(response != undefined && response != null && response.length > 0 && response[0].msg_type == 'S'){
						$('#dialog-editSitePop').dialog('close');
						$.fn.showCustomMsg(['Stock Transfer Draft Created Successfully'],success,'Order Details');
						window.location.replace(stockTransferLink);
					}else if(response != undefined && response != null && response.length > 0 && response[0].msg_type == 'E')
						{
						$.fn.showCustomMsg([response[0].msg],error,'Order Details');
						}
					else
						{
						$.fn.showCustomMsg(['Network issue occured while creating the draft'],error,'Order Details');
						}
					stopLoading();
				},
				error : function(err) {
					console.log(err);
					stopLoading();
					showAllErrors(['Network issue occured while fetching the draft']);
					//showError('Network issue occured while fetching the draft');
				}
			});
}
function showErrorInpopUp(elem, msg) {
	$(elem).html('<h4>' + msg + '</h4>').removeClass('hideBlock');
}
function bindReceiveSegmentEvents(dataObj){
	$('.receiveSegment').unbind('click');
	$('.receiveSegment').click({dataObj:dataObj},function(e){
		var dataObj= e.data.dataObj;
		var segmentNo = $(this).attr('id').split('-')[0];
		var asnNo = $(this).attr('id').split('-')[1];
		callServiceForWizard(segmentNo, "D", asnNo,dataObj);
	});
}
var doc = '';
function printIBT(dataObj)
{
	var articleList = dataObj.itemObj;
	//sub_category_no
	
	 var articleListBySubCategory = $groupBy(articleList, function(obj) {
	        return obj.sub_category_no;
	    });
	
	var content = '<h1> Stock Transfer Order '
		+ dataObj.hdrObj.order_no
		+' </h1>'
		+'<h4> Created on: '
		+ $.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].creation_date)
		+' | Status: '
		+ sentenceCase(dataObj.hdrObj.order_status)
		+'</h4>'
		+'<table class="firstTable" width="100%">'
		+'<tr><td class="rightBorderCell">'
		+'<strong>From:</strong>'
		+'</td><td>'
		+'<strong>To:</strong>'
		+'</td></tr>'
		+'<tr><td class="rightBorderCell">'
		+getSupplierNo(dataObj.hdrObj.supplier_name,dataObj.hdrObj.supplier_no)
		+'</td><td>'
		+getSupplierNo(dataObj.hdrDtlObj[0].receiving_site_name,dataObj.hdrDtlObj[0].receiving_site)
		+'</td></tr>'
		+'<tr><td class="rightBorderCell">'
//		+
		+'</td><td>'
//		+
		+'</td></tr>';           
        if (!temperatureDisableFlg) {
		content +='<tr><td class="rightBorderCell">'
		+'<strong>Temperature</strong>'
		+'</td><td>'
		+'<strong>Temperature</strong>'
		+'</td></tr>'
		+'<tr><td class="rightBorderCell">'
		+'Chilled '+(dataObj.hdrDtlObj[0].ibt_chilled_temperature||'')+', '+'Frozen '+(dataObj.hdrDtlObj[0].ibt_frozen_temperature||'')
		+'</td><td>'
		+''
		+'</td></tr>';
        }
		content += '<tr><td class="rightBorderCell">'
		+($.tablebuild.dataparse.mobi_date(dataObj.hdrDtlObj[0].ibt_pickup_date||''))+' '+(dataObj.hdrDtlObj[0].ibt_pickup_time||'')
		+'</td><td>'
//		+
		+'</td></tr></table>';
	
	
	for (key in articleListBySubCategory) {
		
		 if (key != '' && key != null && key != undefined) {
		        var list = articleListBySubCategory[key];
		content+='<h4> Sub-Category: '+list[0].sub_category_name+' </h4>'
			+'<table border="1" class="secondTable" width="100%"><thead><tr><th class="leftValue"> Article </th><th class="leftValue"> Description </th>'
			+'<th class="centerValue"> Qty </th><th class="centerValue"> Unit </th><th class="centerValue"> OM </th><th class="centerValue"> Total Weight </th></tr></thead><tbody>';
		for(var i=0;i<list.length;i++)
			{
			content+='<tr><td class="leftValue">'
			+list[i].article
			+' </td><td class="leftValue">'
			+list[i].article_desc
			+' </td><td class="centerValue">'
			+list[i].order_qty
			+' </td><td class="centerValue">'
			+list[i].order_uom
			+' </td><td class="centerValue">'
			+list[i].om+' '+list[i].base_uom
			+' </td><td class="centerValue">'
			+list[i].newOrderTot+' '+list[i].base_uom
			+'  </td></tr>';
		 }
			content+='</tbody></table>';
		 }
	}
		
	dataObj.hdrDtlObj[0].ibt_comments = dataObj.hdrDtlObj[0].ibt_comments != undefined ? dataObj.hdrDtlObj[0].ibt_comments : "";
	dataObj.hdrDtlObj[0].ibt_rego_number = dataObj.hdrDtlObj[0].ibt_rego_number != undefined ? dataObj.hdrDtlObj[0].ibt_rego_number : "";
	dataObj.hdrDtlObj[0].ibt_courier = dataObj.hdrDtlObj[0].ibt_courier != undefined ? dataObj.hdrDtlObj[0].ibt_courier : "";
	dataObj.hdrDtlObj[0].ibt_auth_number = dataObj.hdrDtlObj[0].ibt_auth_number != undefined ? dataObj.hdrDtlObj[0].ibt_auth_number : "";
		content+='<br><br>'
		+'<table border=1; class="thirdTable" width=100%><tr>'
		+'<td> CONSIGNMENT NOTE <br><br>'+dataObj.hdrDtlObj[0].ibt_comments+'<br><br></td>'
		+'<td> COURIERS NAME OR VEHICLE NO <br><br>'+dataObj.hdrDtlObj[0].ibt_courier+(dataObj.hdrDtlObj[0].ibt_courier!='' && dataObj.hdrDtlObj[0].ibt_rego_number!='' ? ' | ':'')+dataObj.hdrDtlObj[0].ibt_rego_number+'<br><br></td>'
		+'<td> WAREHOUSE AUTHORITY NUMBER <br><br>'+dataObj.hdrDtlObj[0].ibt_auth_number+'<br><br></td>'
		+'</tr><tr>'
		+'<td> NUMBER OF PACKAGES <br><br><br><br></td>'
		+'<td> SIGNATURE OF PERSON TAKING GOODS <br><br><br><br></td>'
		+'<td> STORE MANAGER SIGNATURE <br><br><br><br></td></tr><tr><td colspan=3> '
		+'<label><strong>Note</strong></label><ol><li>Sending site forwards this copy with the goods.</li>'
		+'<li>Receiving site must receive this stock transfer using "ORDER NO" as above</li></ol> </td></tr></table>';
	$("#printbodyForIBTOrder").html('');
	$("#printbodyForIBTOrder").append(content).append(
	'<link rel="stylesheet" href="../../styles/printStyleForIBTOrderPrint.css" />');
	var a = window.open();
	$("#printDataForIBTOrder").show();
	a.document
			.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
	a.document
			.write(document
					.getElementById('printDataForIBTOrder').innerHTML);

	$("#printDataForIBTOrder").hide();
	a.focus();
	// call print
	$(a)
			.ready(
					function() {
						// a.close();
						setTimeout(
								function() {
									$(
											document)
											.unbind(
													'click');
									doc = a;
									$(
											document)
											.click(
													function() {
														doc
																.close();
														doc = '';
														$(
																document)
																.unbind(
																		'click');
													});
									a
											.print();
								}, 1000);
						return true;
					});
	
}

function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement);
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
    }
}
function formRecvConfigMap(response){
	if(response != undefined && response != null && response.length > 0 && response[0].msg != undefined){
		recvConfigMap = {};
		for(var i=0; i<response.length; i++){
			recvConfigMap[response[i].config_code] = response[i].config_val;
		}
	}else{
		recvConfigMap = {};
	}
}
var triggerPOCancel = function(e)
{
var dataObj = e.data.dataObj;
var action = 'E';
var itemArray = dataObj.itemObj;
var item =[];
var hdrObj = dataObj.hdrObj;
for(var i=0;i<itemArray.length;i++)
	{
var newObj = new orderUpdateItemParam(hdrObj,itemArray[i],action);
item.push(newObj);
	}
var param= new orderUpdateHdrParam(hdrObj,item);
$.fn.warnPopup('warn',cancelOrderMsg,'Order Details',triggerCancelPurchaseOrderYes,triggerDeleteNo,'',{url:getOrderUpdateURL(hdrObj),param:param});
};
var triggerCancelPurchaseOrderYes = function(e)
{
	var data = e.data.cache;
	var url = data.url;
	var param = data.param;
	callPurchaseOrderUpdate({url:url,param:param});
	var $elem = e.data.msg;
	$elem.dialog('close');
};
function callPurchaseOrderUpdate(obj){
	if((obj.param.pwd == '' || obj.param.pwd == null ))
	obj.param.pwd= encSapPwd;
	console.log(obj.url  + ' ' + JSON.stringify(obj.param));
	
	  $.ajax({
	    type: "POST",
	    url: obj.url,
	    data: JSON.stringify(obj.param),
	    beforeSend : function(){
	    	startLoading();
	    }
	  }).done(function(response) {
		  showOpenOrderUpdateInfo(response);
          stopLoading();
	  }).fail(function() { 
		  $.fn.showCustomMsg([mobiSerErrCode],error);
          stopLoading();
	  }).always(function() {
		  //stopLoading();
	  });	
}

function printULDInfo(dataObj, orderNo){
	var param = {
		 "iv_user_id": $('#loginUserId').val(),
		   "iv_pwd": "",
		   "iv_session_id": "111",
		   "iv_site_no": $('#posSite').val(),
		   "iv_sales_org": $('#salesOrg').val(),
		   //"iv_order_no" : "80456768",
		   "iv_order_no":orderNo,
		   "iv_rec_type":isST(dataObj.order_type) ? "I" : "O"
	};
	
	console.log(getULDReceiveInfoUrl + ' ' + JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: getULDReceiveInfoUrl,
	    data: JSON.stringify(param),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  console.log(JSON.stringify(response));	
		  if(response != undefined  && response.length > 0 && response[0].typ != undefined){
		  		if(response[0].typ == 'S'){
			  		callMasterULDService(dataObj, response);
		  		}else if(response[0].typ == 'E' && response[0].msg != undefined && response[0].msg !=''){
		  			$.fn.showCustomMsg([response[0].msg],error,'ULD Sweep');
		  		}else{
		  			$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'ULD Sweep'); 
		  		}
		  }	else {
			  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'ULD Sweep'); 
		  }
	  }).fail(function() {	
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'ULD Sweep');
	  }).always(function() {
		  stopLoading();
	  });
}

function callMasterULDService(dataObj, uldObj){
	var uldTypeMap = {};
	var uldList = [];
	var uldItem = {};
	
	var masterParam = {
			"iv_user_id" : $('#loginUserId').val(),
			"iv_pwd" : "",
			"iv_session_id" : "111",
			"iv_site_no" : $('#posSite').val(),
			"iv_sales_org" : $('#salesOrg').val()
		};
	
	console.log(getULDMasterInfoUrl+' '+JSON.stringify(masterParam));
	
	$.ajax({
	    type: "POST",
	    url: getULDMasterInfoUrl,
	    data: JSON.stringify(masterParam),
	    beforeSend: function(){
	    	//startLoading();
	    }
	  }).done(function(data) {
		  if(checkResult(data,'uld_id')){
			  var response = data;
				for ( var i = 0; i < response.length; i++) {
					uldTypeMap[response[i].uld_id] = response[i].uld_desc;
				}
			}
		  
		  for ( var i = 0; i < uldObj.length; i++) {
				  uldItem = {
							"iv_uld_recv_qty" : getEmptyIfNull(uldObj[i].recvd_qty),
							"iv_uld_return_qty" : getEmptyIfNull(uldObj[i].return_qty),
							"uld_type" : ((uldTypeMap[uldObj[i].uld_id] != undefined) && (uldTypeMap[uldObj[i].uld_id] != '')) ? uldTypeMap[uldObj[i].uld_id] : uldObj[i].uld_id
						};
					
					uldList.push(uldItem);
			}
		  
		  callJasperPrintForULD(dataObj, uldList);
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}

function callJasperPrintForULD(dataObj, uldList)
{	
	var obj={			
			reportResult	: uldList,
			pcdId			: "",
			storeNo 		: $('#posSite').val(),
			storeName 		: $('#posSiteName').val(),
			supplierNo		: getEmptyIfNull(dataObj.hdrObj.supplier_no),
			supplierName	: getEmptyIfNull(dataObj.hdrObj.supplier_name),
			carrierNo		: "",
			carrierName		: "",
			regoNo			: "",
			consignNo		: getEmptyIfNull(dataObj.hdrDtlObj[0].invoice_no),
			userId			: $('#loginUserId').val()
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../uldSweep/printPCDCopyPDF.htm",
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
	//console.log(response.data);
	if(response.data == 'success')
		{
		$('#orderEnq').attr("action", "../uldSweep/downloadPCDCopyPdf.pdf");
		$('#orderEnq').attr('target','_blank');
		$('#orderEnq').attr('method','get');
		$('#orderEnq').submit();
		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	}
	});
}

$.fn.exists = function () {
    return this.length !== 0;
};

function getSalesHistoryNew(articleNo,articleDesc,pbdFlag,orderUom,baseUom) {
	var param = {
		"iv_article_no" : articleNo,
		"iv_site_no" : $('#posSite').val(),
		"iv_user" : $('#loginUserId').val()
	};
	startLoading();
	console.log(getSalesHistoryURL+' '+JSON.stringify(param));
	  $.post( getSalesHistoryURL,JSON.stringify(param)) .done(function(
	  response ) {
	$('.articleNoAndName').text(articleNo + ' - ' + articleDesc);
	$('.unitOrCarton').text();
	$('.cartonQty').text();
	var salesHstryList = response;
	var tempList = [];
	for ( var i = 0; i < salesHstryList.length; i++) {
		if (salesHstryList[i].base_uom != null)
			tempList.push(salesHstryList[i].base_uom);
	}
	var optionList = unique(tempList);
	
	var radioNamePackSizeMap = {};
	var packBreakInd= pbdFlag;
	if (packBreakInd == 'Y') {
		for ( var i = 0; i < optionList.length; i++) {
		for(  var j = 0; i < salesHstryList.length; i++)
		{
		if(!$.isEmptyObject(radioNamePackSizeMap))
		{
		if(!(salesHstryList[j].base_uom in radioNamePackSizeMap))
			radioNamePackSizeMap[optionList[i]] = salesHstryList[j].pack_size;
		}
		else
		radioNamePackSizeMap[optionList[i]] = salesHstryList[j].pack_size;								
		}
		}
	} else {
		radioNamePackSizeMap[baseUom] = '1';
		if((orderUom||'')!=''){
			radioNamePackSizeMap[orderUom] = salesHstryList[0].pack_size;
			optionList.push(orderUom);
		}
	}
	
	var uomRadioContent = '<p class="notes"><strong>Select UOM:</strong>';
	for(var i=0;i<optionList.length ; i++)
	{
	uomRadioContent += '<input type="radio" ';
	
	uomRadioContent += 'name="searchByOptionsSalesHistPopUp"  onclick="getSalesHistContentByUOM(\''
			+ optionList[i]
			+ '\',\''+packBreakInd+'\');" tabindex="1"><label class="labelText">'
			+ optionList[i]
			+ '</label>';
	}
	uomRadioContent += '</p>';
	$('#uomRadio_salesHist').html('');
	$('#uomRadio_salesHist').html(uomRadioContent);
	var content = '';
	var weekArray = ['This Week','Last Week','Week Before','15 Week Avg.'];
	if (salesHstryList != null && salesHstryList != undefined
			&& salesHstryList.length > 0) {
			var spanClass = "salesHistPopUpUomAll salesHistPopUpUom" ;
	var j=0;
	for ( var i = 0; i < salesHstryList.length; i++) {
		
			content += '<tr class="'+spanClass+salesHstryList[i].base_uom+'">';
			
				content += '<td>' + (weekArray[j]) + '</td>';
			
			
			content += '<td>'+getSalesHistColunCont(salesHstryList[i].day1_promo_ind,
					salesHstryList[i].day1_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day2_promo_ind,
					salesHstryList[i].day2_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day3_promo_ind,
					salesHstryList[i].day3_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day4_promo_ind,
					salesHstryList[i].day4_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day5_promo_ind,
					salesHstryList[i].day5_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day6_promo_ind,
					salesHstryList[i].day6_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day7_promo_ind,
					salesHstryList[i].day7_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td>';
			content += '<td class="sorted lastColumn">'
					+ getSalesHistColunCont('', salesHstryList[i].week_total,
							radioNamePackSizeMap,packBreakInd);
			content += '</td></tr>';
			j++;
			if(j==4){
				j=0;
			}
		
		
	}
	$('#packSizeValueHist').text(' ' + (salesHstryList[0].pack_size || ''));
	$('#salesHistContent').html(content);
	
	
	$('input[name="searchByOptionsSalesHistPopUp"]:first').trigger("click");
	} else {
		var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
		$('#salesHistContent').closest('table').html(error);
	}
	stopLoading();
	}); 

}

function unique(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1)
			result.push(e);
	});
	return result;
}

function getSalesHistColunCont(promoInd, daySales, radioNamePackSizeMap,packBreakInd) {
	var content = '';
	daySales = (daySales || '');
	if (daySales != '' && promoInd != undefined && promoInd != ''
			&& promoInd == 'Y') {
		content += '<span>*</span>';
	}
	if(packBreakInd == "Y"){
		var daySalesByUom = '';
		for ( var m in radioNamePackSizeMap) {
			
			
			if (daySales != '' && radioNamePackSizeMap[m] != undefined
					&& radioNamePackSizeMap[m] != '') {
				daySalesByUom = formatTo3DecimalPlaces(Number(daySales));
			}

			
		}
		content += '<span class="">' + daySalesByUom
		+ '</span>';
	}
	else{
		var daySalesByUom = '';
		for ( var m in radioNamePackSizeMap) {
			
			
			if (daySales != '' && radioNamePackSizeMap[m] != undefined
					&& radioNamePackSizeMap[m] != '') {
				daySalesByUom = formatTo3DecimalPlaces(Number(daySales)
						/ Number(radioNamePackSizeMap[m]));
			}
			content += '<span class="uom_content uom_cont_'+m+' hideBlock">' + daySalesByUom
				+ '</span>';
		}	
	}
	return content;
}

function getSalesHistContentByUOM(uomType,packBreakInd) {
	if(packBreakInd == 'Y'){
		$(".salesHistPopUpUomAll").addClass("hideBlock");
		var uomClass = "salesHistPopUpUom" + uomType;
		$("." + uomClass).removeClass("hideBlock");
	}else{
		$('#dialog-modal-his').find('.uom_content').addClass('hideBlock');
		$('#dialog-modal-his').find('.uom_cont_'+uomType).removeClass('hideBlock');
	}
}
function formatTo3DecimalPlaces(inputString) {
	var str = Number(inputString).toFixed(3);
	if (str.substr(str.length - 4, str.length) == ".000") {
		return str.substr(0, str.length - 4);
	} else {
		return str;
	}
}

/*function clearCostPrice();{
	if(isCostPriceShow){
		
	}else{
		$('.costClass').addClass('hideBlock');	
	}
	
}*/

function tblCmpntDisplay(title,data,status){       
	this.option = 'build';this.key = ['article','vendor_ref_no','article_desc','showOrdQty'];
        if(isDispatch(status)){
		this.key.push('showDisQty');
        }
        if(isReceived(status) || isPartiallyReceived(status)){
		this.key.push('showDisQty');
                if((salesOrg==1060 && era_prof=="Y" && data[0].sscc_carton_status != null && data[0].sscc_carton_status != '' && data[0].sscc_carton_status == 'Received' )
                        || !(salesOrg==1060 && era_prof=="Y"))
		this.key.push('showReceQty');
		this.add_option = true;
        }    
	this.table_name = title/*+'_'+data[0].segment_no*/;this.table_title = 'List of Articles ('+data.length+')';
	this.table_class = ' ContentTable ';
	this.header_tr_class = 'collapsed';this.content_tr_class = ' mainTr ';
	this.header_name = {article:'Article',vendor_ref_no:'Vendor<br>Ref #',article_desc:'Description'};	
	this.header_data_type = {article:'number',vendor_ref_no:'char',article_desc:'char',showOrderQty:'number',
			showOrderTotQty : 'number',showDispQty:'number',showDispTotQty:'number',showReceiveQty:'number',showReceTotQty:'number'},
	this.header_row_type = {article:'main',vendor_ref_no:'main',article_desc:'main',showOrdQty:'sub',showDisQty:'sub',showReceQty:'sub',confirm_articles:'main'},
	this.header_sub_rows = {showOrdQty:{subKeys: ['showOrderQty','showOrderTotQty']},showDisQty:{colspan : 2, subKeys: ['showDispQty','showDispTotQty']},
			showReceQty:{colspan : 2, subKeys: ['showReceiveQty','showReceTotQty']}};
	this.header_class = {article:'',vendor_ref_no:'',article_desc:'',showOrdQty:' centerValue columnDivider noSort  ',showDisQty:' centerValue columnDivider noSort  ',
			showReceQty:'  centerValue columnDivider noSort  ',showOrderQty:' centerValue  ',showOrderTotQty : '  centerValue   ',showDispQty:' centerValue  ',showDispTotQty:' centerValue  ',showReceiveQty:' centerValue  ',showReceTotQty:' centerValue  '};
	this.header_width = {article:'',vendor_ref_no:'',article_desc:'',showOrdQty:'',showDisQty:'',showReceQty:'',showOrderQty:'',showOrderTotQty : '',showDispQty:'',showDispTotQty:'',showReceiveQty:'',showReceTotQty:'',};
	this.content_class = {article:'',vendor_ref_no:'',article_desc:'',showOrdQty:' centerValue columnDivider noSort  ',showDisQty:' centerValue columnDivider noSort  ',showReceQty:'  centerValue columnDivider noSort  ',showOrderQty:' centerValue  ',showOrderTotQty : '  centerValue   ',showDispQty:' centerValue  ',showDispTotQty:' centerValue  ',showReceiveQty:' centerValue  ',showReceTotQty:' centerValue  '};
	this.content_format = {article:'removeNull',vendor_ref_no:'removeNull',cost_price:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',vendor_ref_no:'',article_desc:'',showOrdQty:'',showDisQty:'',showReceQty:'',showOrderQty:'',showOrderTotQty : '',
			showDispQty:'',showDispTotQty:'',showReceiveQty:'',showReceTotQty:''};
	this.tr_id= ['article','base_uom'];
	this.header_td_label = {showOrdQty:'Total Units Ordered',showOrdQty:'Ordered',showDisQty:'Dispatched',showReceQty:'Received',
			showOrderQty:'Qty.',showOrderTotQty:'Total Units',showDispQty:'Qty.',showDispTotQty:'Total Units',showReceiveQty:'Qty.',showReceTotQty:'Total Units'};
	this.cont_data_function = {article:articleFunction,showOrderQty:showOrderQtyCmpntDisp,showOrderTotQty:showOrderTotQtyCmpntDisp,showDispQty:showDispQtyCmpntDisp,
        showDispTotQty:showDispTotQtyCmpntDisp,showReceTotQty:showReceTotQtyCmpntDisp,
        showReceiveQty:($('#updateQtyTbl_table').is(':visible')  && headerObj.hdrObj != "" && headerObj.hdrObj.order_type == "VENDOR")?
        showUpdateReceiveQty:showReceiveQtyCmpntDisp};
	this.cont_sort_function = {showOrderQty:getOrderQtyData,showOrderTotQty:getOrderQtyTotData,showDispQty:getDispQtyData,
        showDispTotQty:getDispQtyTotData,showReceiveQty:getReceQtyData,showReceTotQty:getReceQtyTotData};
	this.cont_group_data_function = {showQty:showQty};
	this.sort_done = {sort_done: orderDetailData};this.page_done = {page_done: orderDetailData};
	this.content_bind_event = {click: ''};this.content_tr_addon = {click: ''};this.content_title = {},this.header_title = {};
	this.content_td_addon = {showReceiveQty:{'.receive_qty':{event:{keypress : onlyNumber,change : changeReceiveQty,click : function(){}},display: function(){}},'.receive_weight':{event:{keypress : onlyNumber,change : changeReceiveWgt,click : function(){}},display: function(){}}},newReceiveOm:{'.textbox':{event:{keypress : onlyNumber ,change : changeReceOm,click : function(){}},display:function(){}}},newExpDate:{'.inputDate':{event:{keypress : function(){},change : changeExpDate,click : function(){}},display: function(){}},'.moreExp':{event:{keypress : function(){},change : function(){},click : showRemainExp},display: function(){}}}}; this.header_td_addon = {};
	this.comp_key_parser = {}; this.content =  data;this.pagination = true ;this.recordPerPage= 10;	
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.data_tr_class = {func_class:getArticleTrclass};
	this.data_td_class = {article:getArticleTdclassForSeg};
}
var getCnfrmTrue=function(obj){
	return '<input class="cmpntFlag" displayArticle="'+obj.display_article+'" cartonNum="'+obj.sscc_carton_num+'" name="cmpntFlag" type="checkbox"></input>';
};
var showOrderQtyCmpntDisp = function(obj,key){
        return (obj.order_qty!=null && obj.order_qty!=undefined)?(obj.order_qty+' '+obj.order_uom):'NA';	
};
var showOrderTotQtyCmpntDisp = function(obj,key){
	return ((obj.order_qty!=null && obj.order_qty!=undefined)?(Number(obj.om || '') * Number(obj.order_qty)):'')+" "+ ((obj.order_qty!=null && obj.order_qty!=undefined && obj.base_uom!=null && obj.base_uom!=undefined)? obj.base_uom:"");	
};
var showDispQtyCmpntDisp = function(obj){
        return (obj.dispatched_qty!=null && obj.dispatched_qty!=undefined)?obj.dispatched_qty+' '+obj.dispatched_qty_uom:'NA';
};
var showDispTotQtyCmpntDisp = function(obj){
	return (obj.dispatched_qty!=null && obj.dispatched_qty!=undefined)?(Number(obj.dispatched_om||obj.om) * Number(obj.dispatched_qty))+" "+
        ((obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty_uom!=null && obj.dispatched_qty_uom!=undefined)? obj.dispatched_qty_uom:''):'NA';
};
var showReceiveQtyCmpntDisp = function(obj){
		//4554 change
        var receiveQty = ((obj.received_qty != null && obj.received_qty != undefined)?correctDecimalPostion(obj.received_qty)+' '+obj.received_qty_uom:'');
        if(obj.display_article_flag == 'Y' &&(isReceived(headerObj.hdrObj.order_status) || isPartiallyReceived(headerObj.hdrObj.order_status))){
        receiveQty =(receiveQty =='NA'?'':receiveQty);
        //return receiveQty +'<label class="linkBtn" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag+'"onclick="showComponentDisplay('+obj.article+')"><a class="newWindowDisPre"></a></label>';
        return receiveQty +'<a class="showComponentClass newWindowDisPre"><label class="linkBtn" displayArticle ="'+obj.article+'"  isDisplayArticle ="'+obj.display_article_flag
        +'></label></a>';
        }else  return receiveQty;
};
var showReceiveQtyDisabledCmpntDisp = function(obj){  
        return ((obj.received_qty != null && obj.received_qty != undefined)?obj.received_qty+' '+obj.received_qty_uom:'NA');
};
var showReceTotQtyCmpntDisp = function(obj){
        //17.06 Random Weight Article Total Units Display Changes
        if(obj.random_wt_flag == 'Y'){
    	 var recvValue =  obj.received_qty;
    	 var recvWtValue =  obj.rnd_wgt;    	
    	 var recvWtRecvBox = (recvWtValue!=null)?((Number(recvWtValue) != '0')?
    			 Number(recvWtValue).toFixed(3) :Number(recvWtValue)) +" "+
    	    	((recvWtValue!=null && obj.base_uom!="")? obj.base_uom:''):
    	        /*'NA'*/((recvValue == '0')?recvValue+' '+obj.base_uom:'NA');
    	    	//Defect_12081 - Fix
    	    	 var totUnitsValue = isST(commonOrder.order_type) && ((obj.received_pi_qty||'') != '') ? ('('+ (obj.received_pi_qty||'') +' '+ obj.pi_uom +')') : randomWghtTotUnits(obj, recvValue, obj.received_qty_uom);
        return (recvWtRecvBox+'<br>'+totUnitsValue);        	        
        }
        //R18.01 - Meat Co - Weighted Article Receiving - Changes
        else if(obj.weight_flag == 'Y'){        	
        	var recQtyVal = obj.rnd_wgt;
            return ((recQtyVal!=null && recQtyVal!='NA' && recQtyVal.toString().indexOf('.') != '-1')?
            recQtyVal.toFixed(3):recQtyVal)+" "+ ((obj.base_uom!=null && obj.base_uom!=undefined)? obj.base_uom:"");
        }
        else{
        var recQtyVal =  ((obj.received_qty!=null && obj.received_qty!=undefined)?(Number(obj.recv_om ||'') * Number(obj.received_qty)):'NA');
        return ((recQtyVal!=null && recQtyVal!='NA' && recQtyVal.toString().indexOf('.') != '-1')?recQtyVal.toFixed(3):recQtyVal)+" "+ 
        ((obj.received_qty!=null && obj.received_qty!=undefined && obj.base_uom!=null && obj.base_uom!=undefined)? obj.base_uom:"");	        
        }
};
function bindReceivingMethodChange(){
	$('input[type=radio][name=type]').change(function() {
		if (receivingFullFlag== true && $('.reportRadio').find('input[type="radio"]:checked').val() != 'MM') {
	           $.fn.warnPopup('warn',"Are you sure you want to change from the default receiving method?",'Receive Method',changeMethodYes,changeMethodNo,'','');
	           $("#dialog-alert-conf").parent().find('.closePopUp').click(function(e) {// changed to specific class as it might affect the rec session popup
	        	 if($(this).parent().find('.ui-dialog-title').html() == receivePopupTitle){
	        		 $('.orderReceive .reportRadio').find('.methodRF').find('input[type=radio]:visible:first').prop('checked', true);
	        	 }
	       	});
		}       
	    });
	
}
var changeMethodYes =function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};
var changeMethodNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');	
	$('.orderReceive .reportRadio').find('.methodRF').find('input[type=radio]:visible:first').prop('checked', true);
};

var isASNDelayed = function(obj){
	var flag = false;
	var delivery_date=(obj.delivery_date ||'');
	var currDate = new Date();
	currDate.setHours(0,0,0,0);
	if(delivery_date!= ''){
		delivery_date = new Date(delivery_date);
		if(currDate >= delivery_date){
			flag = true;
		}
	}
	
	return flag;
};
//Temp too high warning
var triggerReEnter = function(e){
	var $elem = e.data.msg;
 	$('#dialog-alert-conf #yes .actionBtn').text('Yes');
	$('#dialog-alert-conf #no .actionBtn').text('No');
	//Defect_12700
	//$('#receive_order .tempDtl input').val('');
	$elem.dialog('close');
	if(recv_chilledFlag){
		$('#receive_order #step-1 #temperature1').val('').focus();
	}
	if(recv_frozenFlag){
		$('#receive_order #step-1 #temperature2').val('').focus();
	}
	//$('#receive_order .tempDtl input:visible').focus();
	console.log('triggerReEnter');
	
};
//Temp too high warning
var triggerReEnterOOR = function(e){
	var $elem = e.data.dialog;
 	$('#dialog-alert-conf #ok .actionBtn').text('Ok');
	//$('#dialog-receive #temperature1_OOR,temperature2_OOR').val('');
	$elem.dialog('close');
	if(order_chilledFlag){
		$('#dialog-receive #temperature1_OOR').val('').focus();
    }
	if(order_frozenFlag){
        $('#dialog-receive #temperature2_OOR').val('').focus();
    }	
};
//Temp too high warning
var continueToNext = function(e){
	var $elem = e.data.msg;
	$('#dialog-alert-conf #yes .actionBtn').text('Yes');
	$('#dialog-alert-conf #no .actionBtn').text('No');
	$('#receive_order #nextbtn').trigger('click');
	console.log('continueToNext');
	$elem.dialog('close');
};