var orderTypeAllocation='ALC';
var orderTypeVendorOrders='VENDOR';
var orderTypeWarehouseOrders='WAREHOUSE';
var orderTypeIBTIn='IBT IN';
var orderTypeIBTOut='IBT OUT';
var orderTypeIBTAll='IBT ALL';
var orderTypePlannedOrders='PLO';
var orderTypePReq='ZY';
var flag = true;
var commonOrderList;
var commonOrder;
var commonPreqList;
var inputData;
var orderPage=1;
var preqPage=1;
var orderPageFlag=true;
var preqPageFlag=true;
var preqData;
var securityGrs='AC_GRS';
var EnterVendorClaimAuthorityNumber='AC_EVCA';
var allocationPage=1;
var allocationCnt = '';
var totalPallets = '' ;
var preqFlag = false;
var somOrderNoExists = false;
var deliveryList;
var allItemList;
var segmentOrderList;
$(document).ready(function() {
	$('#advWrapper').css('z-index','2');
	$('#advDiv').css('z-index','12');
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	$('#toDate').val(presentDate);
	$("#fromDate").val("");
	
	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

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
		width : 300
	});

	$("#dialog-tableSettings").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 600
	});

	$("#dialog-savedSearch").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 500
	});
	 $( "#dialog-modal-autho" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 150,
			maxHeight: 600,
			width: 430
		});
		
		$("#dialog-modal-autho").parent().addClass("popupWrapper");
		
	$("#cancelVendorAuthNo").click(function(e) {
		 $( "#dialog-modal-autho" ).dialog( "close" );				
	 });
	 
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		dateFormat : "ddmmyyyy",
	    emptyTo: 'top'
	  });
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');
	
	
	  $("#saveVendorAuthNo").click(function(e) {
		   $('#vendorClaimVal').val($('#vendorAuthNo').val());
		   if($('#vendorAuthNo').val()=="")
			{
			   showAlert('Please enter a valid Vendor Claim Authorization number.','vendorAuthNo');
				//$( "#dialog-modal" ).dialog( "open" );
				
			}else{
				
				var vendorClaimOrderNo='';
				var authNo=$('#vendorAuthNo').val().trim();
				if(commonOrder!='' && commonOrder!=undefined)
					vendorClaimOrderNo=commonOrder.orderNo;
				saveAuthNo({authNo:authNo,vendorClaimOrderNo:vendorClaimOrderNo});
				
			} 
		 });
	$("#tabs").tabs();
	// popup for saved searches
	$("#dialog-savedSearch").parent().addClass("popupWrapper");

	$("#savedSearch").click(function() {
		$("#dialog-savedSearch").parent().addClass("popupWrapper");
		$("#dialog-savedSearch").dialog("open");
	});

	$("#sos").removeClass('hideBlock').css('visibility','hidden');
	
	$("#warehouse").click(function() {
		$("#sos").css('visibility','visible');
	});
	
	$("#vendor").click(function() {
		$("#sos").css('visibility','visible');
	});
	
	$("#All").click(function() {
		$("#sos").css('visibility','hidden');
	});
	$("#dialog-saveSearch").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	// popup for save new search
	$("#dialog-saveSearch").parent().addClass("popupWrapper");

	$("#saveSearch").click(function() {
		$("#dialog-saveSearch").parent().addClass("popupWrapper");
		$("#dialog-saveSearch").dialog("open");
	});

	$("#dialog-siteSearchPop").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 750
	});
	$("#dialog-siteSearchPop").parent().addClass("popupWrapper");
	$("#dialog-hierarchy").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 800
	});
	$("#dialog-modal").parent().addClass("popupWrapper");

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	$(document).on('click', ".actionRows tr th", function() {

		$('.actionRows tr td').each(function() {
			$(this).removeClass("sorted");
			//console.log(this);
		});
	});

	$(document).on('click', ".actionRows th", function() { 

		$('.actionRows tr td').each(function() {
			$(this).removeClass("sorted");
			//console.log(this);
		});

		col = $(this).parent().children().index($(this));
		//console.log("col:::"+ col);
		// col=$('th.sorted').index();

		$('.actionRows tr').each(function() {
			$(this).find('td').eq(col).addClass("sorted");
			//console.log(this);
		});

	});
	
	$(".inputDate").datepicker({
		zIndex : 50
	});

	$(document).on('click', ".more", function() {
		var selectedId= $(this).attr("data-anchor");
		var item =$(this).attr("id").split('-')[1];
		if(selectedId == 0)
			{
			selectedId='overAll';
			}
		
		if($('#section-'+item+' #deliveryStatusDetails'+((selectedId == 'overAll')? 0: item)+' tbody').html() == ""){
				fullScreenLoader();
				var deliveryStatusDtlHTML = formDeliverStatusDtl(commonOrder,deliveryList,((selectedId == 'overAll')? 0: selectedId),allItemList,segmentOrderList,item);
				//selectedId=item;
				$('#section-'+item+' #deliveryStatusDetails'+((selectedId == 'overAll')? 0: item)+' tbody').html('');
				$('#section-'+item+' #deliveryStatusDetails'+((selectedId == 'overAll')? 0: item)+' tbody').html(deliveryStatusDtlHTML);
				$.loader('close');
		}
		
		$('#section-'+item+' #deliveryStatusDetails'+((selectedId == 'overAll')? 0: item)+'').removeClass('hideBlock');
		if(selectedId == 'overAll')
			selectedId=0;
		$('#section-'+item+'-lessDetails').removeClass('hideBlock');
		$('#section-'+item+'-moreDetails').addClass('hideBlock');
	});
	
	$(document).on('click', ".less", function() { 
		var selectedId = $(this).attr("id").split('-')[1];
		if(selectedId == 0)
		{
		selectedId='overAll';
		}
		$('#section-'+selectedId+' #deliveryStatusDetails'+((selectedId == 'overAll')? 0: selectedId)+'').addClass('hideBlock');
		if(selectedId == 'overAll')
			selectedId=0;
		$('#section-'+selectedId+'-lessDetails').addClass('hideBlock');
		$('#section-'+selectedId+'-moreDetails').removeClass('hideBlock');			
	});
	
	$('.orderTable.rowContent').click(function(){
		var index=0;
		if($(this).attr('id').split('-').length>0)
		{
			index=$(this).attr('id').split('-')[1].trim();
		}
		
		if(commonOrderList!='' && commonOrderList!=null && commonOrderList!=undefined)
			var obj=commonOrderList[Number(index)];
		
		getOrderDetails($(this).find('td:first').text().trim(),obj);
		});

	$('.dtl a').click(function(){
		$('.dtl').addClass('hideBlock');
		$('.enq').removeClass('hideBlock');
		$('.vari').addClass('hideBlock');
		$('.contentWrapper.order').removeClass('hideBlock');
		$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
		$('.contentWrapper.varianceRpt').addClass('hideBlock');
		//$('#backBtnId').addClass('hideBlock');
	});
	$('#backBtnId').click(function(){
		if(!($('.enq').hasClass('hideBlock'))){
			if(fromDate != '' && toDate != ''){
				window.location.href='../orderInquiry/onPageLoad.htm';
			}else{
				$('#backBtnId').addClass('hideBlock');
			}
			//window.location.href='../login/goingHome.htm';
		}else if($('.dtl').hasClass('hideBlock')){
			$('.vari').addClass('hideBlock');
			//('.enq').removeClass('hideBlock');
			$('.dtl').removeClass('hideBlock');
			//$('.contentWrapper.order').removeClass('hideBlock');
			$('.contentWrapper.tabbedOrderDetail').removeClass('hideBlock');
			//$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
			$('.contentWrapper.varianceRpt').addClass('hideBlock');
		}else{
			$('.dtl').addClass('hideBlock');
			$('.enq').removeClass('hideBlock');
			$('.vari').addClass('hideBlock');
			$('.contentWrapper.order').removeClass('hideBlock');
			$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
			$('.contentWrapper.varianceRpt').addClass('hideBlock');
			if((fromDate != '' && toDate != '')){
				$('#backBtnId').removeClass('hideBlock');
			}else{
				$('#backBtnId').addClass('hideBlock');
			}
		}
	});
	$('.vari a').click(function(){
		$('.vari').addClass('hideBlock');
		//('.enq').removeClass('hideBlock');
		$('.dtl').removeClass('hideBlock');
		//$('.contentWrapper.order').removeClass('hideBlock');
		$('.contentWrapper.tabbedOrderDetail').removeClass('hideBlock');
		//$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
		$('.contentWrapper.varianceRpt').addClass('hideBlock');
	});
	$('.allocation').addClass('hideBlock');
	$('#orderType')
	.change(
			function() {
				$('#orderStatus').val('All');
				if($('#orderType').val() != 'ALC'){
					$('.allocation').addClass('hideBlock');
					$('.normal').removeClass('hideBlock');
				}else{
					$('.allocation').removeClass('hideBlock');
					$('.normal').addClass('hideBlock');
				}
			
			});


	
	$("#verifySupplier").click(
			function() {
				hideErrorInOrder();
				hideErrorInOrderTab();
				hideErrorInPreqTab();
				var radioSelected = getRadioValue('sourceSupply');
				if (radioSelected == "vendor" || radioSelected == "warehouse"
						|| radioSelected == "store") {
					var vendorNo = $('#supplier').val().split("-")[0];
					var vendorName = $('#supplier').val().split("-")[1];
					var sourceSupply = $(
							'input:radio[name=sourceSupply]:checked').val();
					if (sourceSupply == 'store') {

						nearbyStore(vendorNo, vendorName, sourceSupply);
					}

					else if (($('#supplier').val() != '' && $('#supplier')
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
									$("#vnVendorNumber").val(
											$("#vnSuppNo0").val());
									
									
								}
								stopLoading();
							},
						});
					} else {
						showAlert('Please fill supplier field. ', 'supplier');
					}
				}

			});

	var click = true;
	$('#vendor').click(function() {
		if (click) {
			$('#supplier').val('');
			click = false;
		}
	});
	$('#warehouse').click(function() {
		if (click == false) {
			$('#supplier').val('');
			click = true;
		}
	});

	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			//$('.goButton').click();
			validateTheform();
		}
	});
	// popup for customize columns

	$(".tableSettings").click(function() {

		loadPreferenceSettings();

	});

	
	$('.applyColumnStng').click(
			function() {

				var value = '';
				$('#dialog-tableSettings .ContentTable input:not(:checked)')
						.filter(function() {
							if (value == '')
								value = $(this).val();
							else
								value += ':' + $(this).val();
						});
				console.log(value);

				updatePreferenceSettings(value);

			});

	$('.cancelColumnStng').click(function() {
		$("#dialog-tableSettings").dialog("close");
	});

	$("#samplePopupTest").click(function() {
		$("#dialog-modal").parent().addClass("popupWrapper");
		$("#dialog-modal").dialog("open");
	});
	setTimeout(function() {
		$('#orderNo').focus();
	}, 300);

	calculateScrollWindow();

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	//$(".sortTable").tablesort();
	// added
	$("#All").click(function() {
		$('#supplier').val('');
		$("#supplier").attr('readonly', 'readonly');
	});

	$("#warehouse,#vendor").click(function() {
		// $('#supplier').val('');
		$("#supplier").removeAttr('readonly');
	});

	
	var recordCount = $('#listCount').val();
	var currentPage = $('#pageNumber').val();

	$('#paginationDiv1').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getArticlesForPage(pageNumber);

		}

	});

	$('#paginationDiv2').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getArticlesForPage(pageNumber);

		}

	});
	
	
	$('.tab2').click(function(){
		
		if($('#preqTreeTable tbody tr').length==0)
		getPReqList('','',1);
		
	});
	
	$('.tab1').click(function(){
		
		if($('#orderTreeTable tbody tr').length==0)
		{	
		getOrdersList('','',1);
		}
		
		
	});
	$('.orderTable').click(function(){
		bindContentRow();
		
	});
	$("tr.orderTable").click(function(){
		//alert("hai");
		
	});
	


//	$(".sortTable").tablesort();
	// <!-- shows advanced search box when advanced search link is clicked-->
	$("#advLink1")
			.click(
					function() {
						$('#errorMsg').text('');
						
						var scroll = $(window).scrollTop();
						document.getElementById("advWrapper").style.marginTop = (($('#lookupContainer').height() - scroll) + "px");
						document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
						$("#advWrapper").css("height", "195px");

						$("#advDiv").removeClass('advancedParam hideBlock');
						$("#advDiv").addClass('advancedParam');

						$("#advWrapper").removeClass(
								'advancedSearchFormatWrapper hideBlock');
						$("#advWrapper")
								.addClass('advancedSearchFormatWrapper');

						$("#closeLink").removeClass('linkBtn hideBlock');
						$("#closeLink").addClass('linkBtn');

						$("#advLink1").hide();
						$("#value").val("");

					});

	// <!-- closes advanced search when close is clicked -->
	$("#closeLink").click(function() {
		//hideErrorInOrder(); // Commented the three line for defect no 14589
		//hideErrorInOrderTab();
		//hideErrorInPreqTab();
		closeAdvSearchClasses();
	});

	// <!-- closes advanced search box when windowed are scrolled unless in
	// popup menu -->
	$(window)
			.scroll(
					function() {
						if ($('#dialog-modal').dialog("isOpen") == true) {
							var scroll = $(window).scrollTop();
							var lookupHeight = $('#lookupContainer').height();
							document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
							document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
						} else {
							closeAdvSearch();
						}
					});

	// <!-- closes advanced search box when cotent out side of the box is
	// clicked -->
	$('.mainWrapper').click(function() {
		
		//closeAdvSearchClasses();
		closeAdvSearch();
	});

	// <!-- disable close box function when lookup box is clicked -->
	$('#lookupContainer').click(function(event) {
		event.stopPropagation();
	});

	// <!-- disable close box function when lookup box is clicked -->
	$('.popupWrapper').click(function(event) {
		event.stopPropagation();
	});
	
	$("#goButtonSample1").click(function() {
		hideErrorInOrder();
		hideErrorInOrderTab();
		hideErrorInPreqTab();
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

	$(".goButton")
			.click(
					function() {validateTheform();});
	$('#orderType').change(function(){
		if($(this).val()=="ALC"){
		$("#All").click();
		$('[name="sourceSupply"]').attr('disabled',true);
		}else{
		$('[name="sourceSupply"]').attr('disabled',false);
		}});
if(fromDate != '' && toDate != '')
	loadOldResult();
	else
		{
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	$('#toDate').val(presentDate);
		}
	
});

function loadOldResult(){
	$('.order').find('#fromDate').val(fromDate);
	$('.order').find('#toDate').val(toDate);
	$('#lookupContainer').addClass('hideBlock');
	$('#resultContent').addClass('padding-top35');
	$(".goButton").trigger('click');
	$('#backBtnId').removeClass('hideBlock');
	$('#tabs ul li a:eq(0)').text('Authorised / Dispatched / Received');
	$('#tabs ul li a:eq(1)').text(' Open Orders');
	$('.enq').text('Search Results');
}
//Main method checks the order types
function getOrders() {
	clearAllTable();
	var orderType = $('#orderType').val();
	var orderNo= $('#orderNo').val().trim();
	if (orderNo != '') {
		getOrdersList(orderNo);
		hideAllocationTbl();
		
	} else if (orderType == orderTypeAllocation) {
		getAllocationDtl();
	} else if (orderType == orderTypeVendorOrders) {
		getOrdersList();
		hideAllocationTbl();
	} else if (orderType == orderTypePReq) {
		getPReqList();
		hideAllocationTbl();
		showPReqTab();
	} else if (orderType == orderTypeIBTAll) {
		getOrdersList();
		hideAllocationTbl();
		showOrderTab();
	}else if (orderType == orderTypeIBTIn) {
		getOrdersList();
		hideAllocationTbl();
		showOrderTab();
	}else if (orderType == orderTypeIBTOut) {
		getOrdersList();
		hideAllocationTbl();
		showOrderTab();
	}else {
		getOrdersList();
		hideAllocationTbl();
		
	}

}
function validateTheform(){

	hideErrorInOrder();
	hideErrorInOrderTab();
	hideErrorInPreqTab();
	var flag = true;
	var orderNo = $('#orderNo').val().trim();
	var delFromDate = $('#fromDate').val().trim();
	var delToDate = $('#toDate').val().trim();
	var rosterFromDate = $('#rosterFromDate').val().trim();
	var rosterToDate = $('#rosterToDate').val().trim();
	var supplierRadio = $(
			'input:radio[name=sourceSupply]:checked').val();

	/*if ($("#advDiv").hasClass('hideBlock') && orderNo == '') {
		showErrorInOrder('Please enter a keyword to lookup.');
		flag = false;
	} else*/ if (delFromDate != ''
			&& !validateDate(delFromDate, 'fromDate',
					'delivery')) {
		flag = false;
	} else if (delToDate != ''
			&& !validateDate(delToDate, 'toDate',
					'delivery')) {
		flag = false;
	} /*else if (delFromDate == '' && delToDate != '') {
		showAlert('Please enter a delivery from date',
				'fromDate');
		flag = false;
	}*/ else if (delFromDate != ''
			&& delToDate != ''
			&& !validateDate1(delFromDate, delToDate,
					'fromDate', 'toDate', 'delivery')) {
		flag = false;
	} else if (rosterFromDate != ''
			&& !validateDate(rosterFromDate,
					'rosterFromDate', 'roster')) {
		flag = false;
	} else if (rosterToDate != ''
			&& !validateDate(rosterToDate, 'rosterToDate',
					'roster')) {
		flag = false;
	} else if (rosterFromDate == '' && rosterToDate != '') {
		showAlert('Please enter a roster from date',
				'rosterFromDate');
		flag = false;
	} else if (rosterFromDate != ''
			&& rosterToDate != ''
			&& !validateDate1(rosterFromDate, rosterToDate,
					'rosterFromDate', 'rosterToDate',
					'roster')) {
		flag = false;
	} else if (supplierRadio != 'all'
			&& $('#supplier').val().trim() == "") {
		showAlert('Please enter Supplier. ',
				'supplier');
		flag = false;
	} else if ((delFromDate == '' && delToDate == '')
			//AS Discussed with palani removing roster date mandatory condition
			//&& (rosterFromDate == '' && rosterToDate == '')
			&& !$("#advDiv").hasClass('hideBlock')
			&& orderNo == '') {
		closeAdvSearch();
		showErrorInOrder('Please enter either order number/delivery date.');
		//showErrorInOrder('Please enter either order number/delivery date/roster date.');
		flag = false;
	} else if ((delFromDate != '' && delToDate == '')
			/*|| (rosterFromDate != '' && rosterToDate == '')*/
			|| (delFromDate == '' && delToDate != '')) {

		if (delFromDate != '') {
			populateNewDate(delFromDate, 'toDate');
		}
		/*if (rosterFromDate != '') {
			populateNewDate(rosterFromDate, 'rosterToDate');
		}*/
		if (delToDate != '') {
			//populateNewFromDate(delToDate, 'fromDate');
			populateNewFromDateForPast3Days(delToDate, 'fromDate');
		}
	}

	if (flag) {
		closeAdvSearch();
		console.log(delFromDate);
		console.log(delToDate);
		getOrders();
		
	}


}
function getOrderDetails(orderNo,obj) {
	
	var data = {orderNo:orderNo};
	var msg = '';
	var output = '';
	//var count='';
	var tabHeader='';
	var tabSection='';
	commonOrder=obj;

	$.ajax({
		type : "get",
		url : "getOrderDetails.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
			//hideOrderTbl();
		},
		success : function(response) {
			output = $.parseJSON(response);
			var deliveryInfo=$.parseJSON(output.data.deliveryInfo);
			var itemInfo=$.parseJSON(output.data.itemInfo);
			//var grInfo=$.parseJSON(output.data.grInfo);
			//var invoiceInfo=$.parseJSON(output.data.invoiceInfo);
			msg = itemInfo.msg;
			deliveryList=deliveryInfo.data;
			var deliveryMsg=deliveryInfo.msg;
			tabHeader='<div id="sections" class="sectionTabs"><ul id="over-all">';
			var currentTab=0;
			
			if (msg != undefined && msg!='' && !isNaN(msg) && itemInfo.data != null) {
				var grSelect='';
				var orderStatus=obj.orderStatus;
				// if(obj.orderStatus =='RECEIVED' || obj.orderStatus =='PARTIALLY RECEIVED')
				// grSelect=grInfoList(grInfo.data);
				var orderHd=orderHead(obj);
				calculateTotalCartonsReceived(itemInfo.data,obj);
				var overAllHdr=formOverAllHeader(obj,deliveryList);
				var invoic='';//formInvoiceInfo(invoiceInfo.data);
				var deliveCon=formDeliveryContent(obj,deliveryList,0);
				var formItem=formItemHdr(itemInfo.data);
				var itemAllList=formAllItemList(itemInfo.data);
				allItemList = itemInfo.data;
				var itemUnsuList=formUnsuppItemList(itemInfo.data,obj);
				 
			if(deliveryList!=null && deliveryList!=undefined && deliveryList!=''
				&& deliveryMsg!=null && deliveryMsg!='' && deliveryMsg!=undefined ){
				currentTab=deliveryList.length;
				for(var j=(deliveryList.length-1);j>=0;j--){
					if(j==0){
				tabHeader+='<li><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
					+'<label class="sectionInfo">';
					if(deliveryList.length!=0 && deliveryList.length>1)
						tabHeader+='Total Deliveries: <strong>'+(deliveryList.length-1)+'</strong>';
						else
							tabHeader+='&nbsp';
						tabHeader+='</label></a></li>';
				tabSection+='<div id="section-overAll">'+
				orderSubHdr(obj,'overAll','Overall Info')+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'+overAllHdr;
				if(obj.portalOrderType==orderTypeVendorOrders)
					tabSection+= invoic;
				if(obj.portalOrderType==orderTypeIBTAll || obj.portalOrderType==orderTypeIBTIn || obj.portalOrderType==orderTypeIBTOut)
					tabSection+= formStoreContent(obj);
				tabSection+= formDeliveryContent(obj,deliveryList,j) 
				+'</div></div>'+formItem+'</div></div>';
					}else{
						var refno = '';
						if(deliveryList[j].deliveryRefNo!=null && deliveryList[j].deliveryRefNo!=undefined && deliveryList[j].deliveryRefNo.split('_').length>0){
							refno = (deliveryList[j].deliveryRefNo).split('_')[1];
						}
						tabHeader+='<li><a href="#section-'+refno+'" data-anchor="'+j+'"><label class="sectionTitle">';
						if(obj.portalOrderType==orderTypeVendorOrders)
							tabHeader+='ASN';
						else
							tabHeader+='Segment';
						tabHeader+='#'+refno+'</label><label class="sectionInfo segmentNo-'+refno+'"><strong>';
						
						/*if(obj.portalOrderType==orderTypeVendorOrders)
							tabHeader+=refno+'('+deliveryList[j].delievryNo.replace(/^0+/, '')+')';
						else 
							tabHeader+=refno+'('+deliveryList[j].delievryNo.replace(/^0+/, '')+')';
						*/

						if(obj.portalOrderType==orderTypeVendorOrders)
							tabHeader+=deliveryList[j].delievryNo.replace(/^0+/, '');
						else 
							tabHeader+=deliveryList[j].delievryNo.replace(/^0+/, '');
						//asnNo need to confirm
						
						
						tabHeader+='</strong></label></a></li>';
						tabSection+='<div id="section-'+refno+'">'+
						orderSubHdr(obj,'delivery','Delivery-'+refno)+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'+overAllHdr;
						if(obj.portalOrderType==orderTypeVendorOrders)
							tabSection+= invoic;
						if(obj.portalOrderType==orderTypeIBTAll || obj.portalOrderType==orderTypeIBTIn || obj.portalOrderType==orderTypeIBTOut)
							tabSection+= formStoreContent(obj);
						tabSection+= formDeliveryContent(obj,deliveryList,j,refno) 
						+'</div></div></div></div>';
					}
				
				}
			}else{
				tabHeader+='<li><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
				+'<label class="sectionInfo">';
				if(deliveryList!=null && deliveryList!=undefined && deliveryList!='' && deliveryList.length!=0)
					tabHeader+='Total Deliveries: <strong>'+deliveryList.length+'</strong>';
					else
						tabHeader+='&nbsp';
					tabHeader+='</label></a></li>';
			
				tabSection+='<div id="section-overAll">'+
				orderSubHdr(obj,'overAll','Overall Info')+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'+overAllHdr;
				if(obj.portalOrderType==orderTypeVendorOrders)
					tabSection+= invoic;
				if(obj.portalOrderType==orderTypeIBTAll || obj.portalOrderType==orderTypeIBTIn || obj.portalOrderType==orderTypeIBTOut)
					tabSection+= formStoreContent(obj);
				tabSection+= deliveCon 
				+'</div></div>'+formItem+'</div>';
			}
			tabHeader+='</ul>';
			bindOrderDtlContent(orderHd,tabHeader,tabSection,itemAllList,itemUnsuList,grSelect,currentTab,itemInfo);
			if(orderStatus =='RECEIVED' || orderStatus =='PARTIALLY RECEIVED'){
					$('#verifyGRN').val(orderNo);
					bindDropDownGrEvent(data);
				}
			} else {
				if(msg=='null')
					showErrorInOrder('Service Unavailable.');
				else
				showErrorInOrder(msg);
				//bindOrdersScroll();
			}
			$('#backBtnId').removeClass('hideBlock');
			$.loader('close');
			securityMatrix();
		},
		error : function() {
			// goToLogin();
		},
	});

}

function bindDropDownGrEvent(data){
		if($('.grnSelect option').length == 0){
		var output = '';
		var dt={ orderNo : $('#verifyGRN').val()};
			$.ajax({
				type : "get",
				url : "getGrInfoDetails.htm",
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

function bindOrderDtlContent(orderHd,tabHeader,tabSection,itemAllList,itemUnsuList,grSelect,currentTab,itemInfo){
	$('.tabbedOrderDetail .articleHead .articleHeaderWrapper').html('').html(orderHd);
	//$('.sectionTabs ul').html('').html(tabHeader);
	$('.detailsSections').html('').append(tabHeader+tabSection+'</div>');
	$('.sectionTabs').tabs();
	$('.contentWrapper.order').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').removeClass('hideBlock');
	$('#tabs-all #treetable').html('').html(itemAllList);
	$('.deliveryTbls').html('').html(itemAllList);
	$('#tabs-unsup .ContentTable').html('').html(itemUnsuList);
	$('#itemTabs').tabs();
	//$('.allTab').text('All ('+$('.allItem').length+')');
	$('li[aria-controls="tabs-all"] a').text('All ('+$('#tabs-all .allItem').length+')');
	if($('#tabs-unsup .unSuppItem').length==0)
	{
	$('li[aria-controls="tabs-unsup"] ').addClass('hideBlock');
	$('li[aria-controls="tabs-unsup"] a').text('Over / Under Supply ('+$('#tabs-unsup .unSuppItem').length+')');
	}
	else
		{
		$('li[aria-controls="tabs-unsup"] a').text('Over / Under Supply ('+$('#tabs-unsup .unSuppItem').length+')');
		}
	// $('.grnSelect').html('').html(grSelect);
	$('.enq').addClass('hideBlock');
	$('.dtl').removeClass('hideBlock');
	$( "#sections" ).tabs( "option", "active",currentTab-1);
	$('.totalArticle').text(itemInfo.data.length);
	if(!((commonOrder.orderStatus !='RECEIVED' && commonOrder.orderStatus =='PARTIALLY RECEIVED') || (commonOrder.orderStatus =='RECEIVED' && commonOrder.orderStatus !='PARTIALLY RECEIVED')))
		$('.filterMenuOptions').addClass('hideBlock');
	//setTimeout(function(){$( "#sections" ).tabs( "option", "active",currentTab);},500);
	$(".selectDropdown").click(function(){ 
		if( $('.selectDropdown').hasClass('active')){
			$(".selectDropdown").removeClass('active');
			$(".selectDropdown .dropdown").css('opacity','0');
		} else {
			$(".selectDropdown").addClass('active');
			$(".selectDropdown .dropdown").css('opacity','1');
		}
	});
	$('.selectDropdown').css('padding-right','10px');
	
	$('#showFilterResult').click(function(){
		var grNo=$('.grnSelect').val();
		var year=($('.'+$('.grnSelect').val()).attr('id')!=undefined ? ($('.'+$('.grnSelect').val()).attr('id').split('-').length>0 ?$('.'+$('.grnSelect').val()).attr('id').split('-')[1].trim():''):'');
		var data={grNo:grNo,year:year};
		if($('.grnSelect').val()=='Select GR'){
			$('#itemTabs').tabs( "option", "active",0);
			//$('#tabs-all').addClass('ui-tabs-active').addClass('ui-state-active'); 
			//$('li[aria-controls="tabs-all"],li[aria-controls="tabs-unsup"]').addClass('ui-tabs-active');
			$('li[aria-controls="tabs-all"]').addClass('ui-tabs-active');
			hideFilteredArticle();
		}else{
			getGrAtricles(data);
		}
		});
	$('li[aria-controls="tabs-all"],li[aria-controls="tabs-unsup"]').click(function(){
		hideFilteredArticle();
		$(this).addClass('ui-tabs-active');
	});
	$('.vendoerClaim').click(function(){
		$("#vendorAuthNo").val("");
		$( "#dialog-modal-autho" ).dialog( "open" );
		});
	$('.varianceRpt').click(function(){
		getWarehouseVariance(commonOrder.orderNo);
	});
	$(".ui-tabs-anchor").click(function() {
		var selectedId = $(this).attr("href").split('-')[1];
		var index = $(this).attr("data-anchor");
		if($( '#section-'+selectedId+' .filterTabs ' ).length==0){
		if(!isNaN(selectedId))
			{
			var segDeliveryNo = deliveryList[index].delievryNo;
			if($('#section-'+selectedId+' .segArtList'+selectedId).html() == undefined){
			$.ajax({
				type : "GET",
				url : "getSegmentDeliveryDtls.htm",
				beforeSend : function() {
					startLoading();
				},
				data : {
					orderNo:segDeliveryNo
				},
				success : function(response) {
					var output = $.parseJSON(response);
					var segOrderList = output.data;
					segmentOrderList = segOrderList;
					var listOfArticleHTML = formItemHdrForSeg(segOrderList,selectedId);
					$( '#section-'+selectedId+' .filterTabs ' ).remove();
					$(listOfArticleHTML).insertAfter( '#section-'+selectedId+' .articleContentInner' );
					
					$('#itemTabs').tabs();
					stopLoading();
				},
			});
			}
			
			
			}
		}
	});
	// Code for Expand and Collapse all
	$('#expandAll').click(function(){
		$("#treetable").treetable('expandAll'); 
		$("#expandAll").addClass('hideBlock');
		$("#collapseAll").removeClass('hideBlock');
		$('#treetable tr:even').removeClass('expanded');
	});
	
	$('#collapseAll').click(function(){
		$("#treetable").treetable('collapseAll'); 
		$("#expandAll").removeClass('hideBlock');
		$("#collapseAll").addClass('hideBlock');
	});
	
	securityMatrix();
}
function getGrAtricles(data){
	$.ajax({
		type : "get",
		url : "getGrAtricles.htm",
		data : data,
		beforeSend : function() {
			startLoading();
			//hideOrderTbl();
		},
		success : function(response) {
			
			output = $.parseJSON(response);
			
			orderList = output.data;
			
			msg = output.msg;
			
			if (msg != undefined && msg!='' && !isNaN(msg) && orderList != null) {
				formGrArticles(orderList);
				//count=orderList[0].msg.trim();
				showFilteredArticle();
				//commonOrderList=orderList;
				//bindAllocationContent();
				//bindOrdersScroll();
			} else {
				if(msg=='null'){
					//showErrorInOrder('Service Unavailable.');
				}
				else{
				//showErrorInOrder(msg);
				}
				bindOrdersScroll();
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
}
function showFilteredArticle(){
	$('#filterResult').removeClass('hideBlock');
	$('#tabs-all .treetable').addClass('hideBlock');
	$('#tabs-all .treetable').addClass('hideBlock');
	$('#tabs-unsup .ContentTable').addClass('hideBlock');
	$('#itemTabs .ui-tabs-active').attr("tabindex", "-1");;
	 $('#itemTabs .ui-tabs-active').removeClass('ui-tabs-active ui-state-active');
	 //$('#itemTabs .ui-tabs-panel').css("display","none");
}
function hideFilteredArticle(){
	$('#filterResult').addClass('hideBlock');
	$('#tabs-all .treetable').removeClass('hideBlock');
	$('#tabs-all .treetable').removeClass('hideBlock');
	$('#tabs-unsup .ContentTable').removeClass('hideBlock');
	//$('#itemTabs .ui-tabs-active').attr("tabindex", "-1");;
	 $('#itemTabs .ui-tabs-active').addClass('ui-tabs-active ui-state-active');
	 //$('#itemTabs .ui-tabs-panel').css("display","none");
}
function formGrArticles(orderList) {
	
	var content = '<div class="ContentTableWrapper">'
				+ '<table cellspacing="0" class="sortTable ContentTable  contentRow" id="">'
				+ ' <thead><tr>'
					+ '<th class="">Article #</th>'
					+ '<th class="">Description</th>'
					+ '<th class="centerValue header">Vendor Ref.#</th>'
					+ '<th class="numberColumn">Received Qty.</th>'
					+'<th class="numberColumn">Order Multiple (OM)</th>';
	if(commonOrder.portalOrderType==orderTypeVendorOrders)
	//content	+= '<!--<th class="numberColumn">Cost $ per OM</th>-->';
	content	+='<th class="numberColumn">Total Units</th>';
	if(commonOrder.portalOrderType==orderTypeVendorOrders)
		//content	+='<!--<th class="numberColumn">Total Cost $</th>-->';
			content	+='</tr></thead>';
									

if (orderList != null) {

	
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			content += '<tr data-tt-id="1" class="collapsed allItem">'
				+'<td>'+list[i].article.replace(/^0+/, '')+'</td>'
				+'<td>'+list[i].articleDesc+'</td>'
				+'<td>'+list[i].vendorRefNo.replace(/^0+/, '')+'</td>'						
				+'<td class="numberColumn">'+list[i].receivedQty+' '+list[i].receivedQtyUom+'</td>'
				+'<td class="numberColumn">'+list[i].packSize+' '+list[i].totPackSizeQtyUom+'</td>'	;
				if(commonOrder.portalOrderType==orderTypeVendorOrders)
				//	content	+= '<!--<td class=" numberColumn">'+list[i].packSizeCost+'</td>-->';
				content	+='<td class=" numberColumn">'+list[i].totPackSizeQtyRcvd+' '+list[i].totalUnitsUom+'</td>';
				if(commonOrder.portalOrderType==orderTypeVendorOrders)
				//	content	+='<!--<td class="lastColumn numberColumn">'+list[i].totCostRcvd+'</td>-->';
				content	+='</tr>';
		}

		content += '</table></div>';
	//}
}
$('#filterResult').html('');
$('#filterResult').html(content);	
//bindOrderContent();
}
function orderHead(obj){
	var content='';
	
	content+='<h2 class="articleTitle orderNumber">Order #';
		if(obj.somOrderNo=="")
		{
		content += obj.orderNo.replace(/^0+/, '');
		console.log(obj.orderNo);
		}
		else if(obj.somOrderNo!="" && (obj.somOrderNo != obj.orderNo))
		{
		content +=  obj.somOrderNo+' ('+obj.orderNo.replace(/^0+/, '')+')';
		somOrderNoExists = true;
		console.log(obj.somOrderNo);
		}
		else
			{
			content += obj.orderNo.replace(/^0+/, '');
			console.log(obj.orderNo);
			}
		content += '</h2><p><label class="articlePriceLabel">'+obj.vendorName;
	if(obj.vendorNo!=null && obj.vendorNo!='')
		{content+=' ('+obj.vendorNo.replace(/^0+/, '')+')';}
	content+='</label></p>';
return content;
}

function preqHead(obj){
	var content='<h2 class="articleTitle">Preq #'+obj.purReqNo+' </h2><p><label class="articlePriceLabel">'+obj.vendorName;
	if(obj.vendorNo!=null && obj.vendorNo!='') content+=' ('+obj.vendorNo.replace(/^0+/, '')+')';
	content+='</label></p>';
return content;
}

function orderSubHdr(obj,type,delivery){
	//<label class="editRecord" id="editAutho">&nbsp;</label>
	var content='<div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle">'+delivery+'</h2><p>'
			+'<label class="articlePriceLabel">Delivery Date: <strong>'+obj.delvDate.replace('.','/').replace('.','/')+'</strong><label class="editRecord hideBlock" id="editdDate">&nbsp;</label></label>';
			//+'<label class="articlePriceLabel">|</label> <label	class="articlePriceLabel">Total Articles: <strong class="totalArticle">100</strong>';
			if(obj.orderStatus=='RECEIVED' && obj.portalOrderType=='VENDOR')
			{	
				content+='<label class="articlePriceLabel vendorClaim';
			if(obj.vendorClaimNo=='') content+=' hideBlock';
			content+='"> |</label>'
			+' <label class="articlePriceLabel vendorClaim ';
			if(obj.vendorClaimNo=='') content+=' hideBlock';
			content+='"  style="">Vendor Authorisation # <strong id="headervendorAutho">'
			+obj.vendorClaimNo+'</strong></label>';
			}
	content+='</p></div>'
			+'<div class="articleActionBtns"><label class="orderStatus">Status: <strong>'+obj.orderStatus+'</strong></label>'
			+'<label class="actionBtn hideBlock">'
			+'<label class="notepadCross">CancelOrder</label></label>';
	if(type=='overAll' && (
			(obj.orderStatus=='RECEIVED' && obj.portalOrderType=='VENDOR')
			/*|| ( obj.portalOrderType=='WAREHOUSE')*/))
	{
		content+='<span id="dropdown" class="actionBtn ">';
	/*if( obj.portalOrderType=='WAREHOUSE')*/
		content+='<!--<label class="dropdownLabel varianceRpt">Variance Report</label>-->';
	if(obj.orderStatus=='RECEIVED' && obj.portalOrderType=='VENDOR')
		content+='<label class="notepad vendoerClaim '+EnterVendorClaimAuthorityNumber+'">Vendor Authorisation # </label>';
	content+='</span>';
		}
	content+='</div></div>';
	return content;
	/*if(type=='overAll' && (
			(obj.orderStatus=='RECEIVED' && obj.orderType=='Normal PO')
			))
		
		{content+='<span id="dropdown" class="selectDropdown">'
			+'<label class="actionBtn" id="dropdownSelect" tabindex="3"><label	class="createBtn">More</label></label>'
			+'<ul class="dropdown">';
	if( obj.orderType=='Retail STO')
		content+='<li><label class="dropdownLabel varianceRpt">Variance Report</label></li>';
	if(obj.orderStatus=='RECEIVED' && obj.orderType=='Normal PO')
		content+='<li><label class="dropdownLabel vendoerClaim">Vendor Claims</label></li>';
	content+='</ul></span>';*/
}

function formStoreContent(obj){
	content='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tr><td class="keyInfo" width="20%">'	
			+'Receiving Store:</td><td class="valueInfo" width="15%">'+obj.receivingStore+'</td><td class="keyInfo" width="15%">Sending Store:</td>'
			+'<td class="valueInfo" width="15%">'+obj.vendorNo.replace(/^0+/, '')+'</td><td class="keyInfo" width="15%"><!--Value ($):--></td><td class="valueInfo lastColumn"></td></tr></table></div>';
	
	return content;
}
//vcvfg rdg srtygr 
function formDeliveryContent(obj,deliveryList,j,refno){
	var content= '';
	var selectedId ='';
	//if(j != 0){
		selectedId=j;
	//}
	/*if(deliveryList != null && deliveryList !="" && deliveryList.length >0 & somOrderNoExists && obj.portalOrderType != orderTypeWarehouseOrders){ 
		content += '<table cellspacing="0" class="ContentTable" width="100%">'
			+'<tbody><tr><td class="keyInfo" width="20%">Delivery Status:</td>'
			+'<td class="lastColumn valueInfo" width="15%">';
			if(somOrderNoExists && deliveryList.length > 1)
				{
				for(var i=1; i<	deliveryList.length;i++)
					{
				content += deliveryList[i].delievryNo.replace(/^0+/, '');
				if(i!=deliveryList.length-1)
					content +=',';
					}
				somOrderNoExists = false;
				}
			else if (deliveryList.length == 1 && somOrderNoExists)
				{
				content += obj.orderStatus;
				somOrderNoExists = false;
				}
					content += '</td></tr>'+'</tbody></table>';
	}*/
	
	if (obj.portalOrderType == orderTypeWarehouseOrders && deliveryList != null
			&& deliveryList != "" && deliveryList.length > 0) {

		content += '<table cellspacing="0" class="ContentTable" width="100%">'
				+ '<tbody><tr><td class="keyInfo" width="20%">Delivery Status:</td>'
				+ '<td class="valueInfo" width="15%">';
		/*if (deliveryList.length > 1 && j==0) {
			for ( var i = 1; i < deliveryList.length; i++) {
				content += deliveryList[i].delievryNo.replace(/^0+/, '');
				if (i != deliveryList.length - 1)
					content += ',';
			}
			// somOrderNoExists = false;
		}else if (deliveryList.length == 1 && j==0)
			{
			content += obj.orderStatus;
			// somOrderNoExists = false;
			}
		else*/
			if(j==0)
			content += obj.deliveryStatus;
			if(j!=0)
			content += deliveryList[selectedId].deliveryStatus;// for "Defect_14732"
		if(j!=0){
		content += '</td><td class="lastColumn" width="65%"><label class="linkBtn">'
				+ '<a class="more" data-anchor="'+selectedId+'" id="section-'
				+ refno
				+ '-moreDetails">+ more </a>'
				+ '<a class="more less hideBlock" data-anchor="'+selectedId+'"  id="section-'
				+ refno
				+ '-lessDetails">- less </a>'
				+ '</label></td>' ;
		content += '</tr></tbody></table>';
		}
		
		if(j!=0){
		content += '<table cellspacing="0" class="ContentTable hideBlock" width="100%" id="deliveryStatusDetails'
				+ refno + '">' + '<tbody>'+ '</tbody></table>';
		}
		if(j==0)
		content += '</td><td class="lastColumn" width="65%"></td></tr></tbody></table>';
	}
	
	return content;
}
function formInvoiceInfo(invoiceInfo){
	var content='';
	if(invoiceInfo!=null && invoiceInfo!=undefined && invoiceInfo!=''){
		for(var i=0;i<invoiceInfo.length;i++){
	content +='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody>'	
			+'<tr><td class="keyInfo" width="20%">Invoice No.:</td>'
			+'<td class="valueInfo " width="20%" >'+invoiceInfo[i].invoiceNo+'</td>'
			+'<td class="keyInfo" width="15%">Invoice Total ($):</td>'
				+'<td class="valueInfo" width="15%">'+invoiceInfo[i].ivoiceTot+'</td>'
				+'<td class="keyInfo" width="15%">GST ($):</td>'
				+'<td class="valueInfo lastColumn" width="15%">'+invoiceInfo[i].gst+'</td></tr><tr>'
				+'<td class="keyInfo" width="20%">Delivery Docket No.:</td><td class="valueInfo" width="20%"></td>'
				+'<td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;'
				+'</td><td class="keyInfo lastColumn" colspan="2">&nbsp;</td></tr></tbody></table></div>';
		}
	}
		
	return 	content;
}
function grInfoList(grInfo)
{
var content ='<option value="" >Select GR</option>';
				
				if(grInfo != null && grInfo!=undefined && grInfo!=''){
					var list =grInfo;
					
					for ( var i = 0; i < list.length; i++) {
						if(list[i].grNo != null && list[i].grNo != undefined && list[i].grNo != "" && parseInt(list[i].totCarReceived)!= 0)						
					 content += '<option id="'+list[i].grNo+'-'+list[i].grDocYear+'" value="'+list[i].grNo+'" class="'+list[i].grNo+'">'+list[i].grNo+'  ('+parseInt(list[i].totCarReceived)+')</option>';
					 			
						
					}
					
				}
				return content;
}
function formOverAllHeader(obj,deliveryList){
	obj.roasterDate=(obj.roasterDate.replace('.','/').replace('.','/')=='00/00/0000'? '' :obj.roasterDate.replace('.','/').replace('.','/'));
	obj.receivedDate=((obj.receivedDate!=null && obj.receivedDate!='')? obj.receivedDate :'');
	var content = '' ;
	totalPallets = obj.totPallets;
	content='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+'<td class="keyInfo" width="20%">Total Cartons:</td><td class="valueInfo" width="15%">'+obj.totCartons+'</td>'
			+'<td class="keyInfo" width="15%">Roster Date:</td><td class="valueInfo" width="15%">';
			if(obj.roasterDate.length>7)
				content+=obj.roasterDate;
			content+='</td>'
			+'<td class="keyInfo" width="15%"><!--Trading Dept:-->Total Cartons Received:</td><td class="valueInfo lastColumn"><!--'+obj.department;
			if(obj.department!='' && obj.deptName!='')
				content+=' | ';
				content+=obj.deptName+'-->'+obj.totReceivedQty+'</td>'
			+'</tr><tr><td class="keyInfo">Total Pallets:</td><td class="valueInfo">'+obj.totPallets+'</td><td class="keyInfo">'	
			+'Creation Date:</td><td class="valueInfo">'+obj.creationDate.replace('.','/').replace('.','/')+'</td><td class="keyInfo"><!--Temperature:-->Received Date:</td>'
			+'<td class="valueInfo lastColumn"><!--'+obj.temperature+'-->'+obj.receivedDate.replace('.','/').replace('.','/')+'</td><!--<td class="valueInfo lastColumn"></td>--></tr><!--<tr><td class="keyInfo">Total Cartons Received:</td>'
			+'<td class="valueInfo">'+obj.totReceivedQty+'</td><td class="keyInfo">Received Date:</td><td class="valueInfo">' 
			+obj.receivedDate.replace('.','/').replace('.','/')+'</td><td class="keyInfo">Temperature 2:</td><td class="valueInfo lastColumn">'+obj.temperature2+'</td></tr>--></table>';
				if(!(obj.portalOrderType == orderTypeWarehouseOrders && deliveryList != null && deliveryList !="" && deliveryList.length >0))
				content += '</div>';
	return content;
}

function formDeliverStatusDtl(obj,deliveryList,j,allItemList,segmentOrderList,item)
 {
	var content='';
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
					sumOfPickReq += Number(allItemList[i].pick_req_qty) ;
					allItemList[i].dispatched_qty = (allItemList[i].dispatched_qty != null && allItemList[i].dispatched_qty != undefined) ? (allItemList[i].dispatched_qty)
							: '';
					sumOfDispQty += Number(allItemList[i].dispatched_qty) ;
					allItemList[i].fair_share_qty = (allItemList[i].fair_share_qty != null && allItemList[i].fair_share_qty != undefined) ? (allItemList[i].fair_share_qty)
							: '';
					sumOffairQty += Number(allItemList[i].fair_share_qty) ;
					allItemList[i].received_qty = (allItemList[i].received_qty != null && allItemList[i].received_qty != undefined) ? (allItemList[i].received_qty)
							: '';
					sumOfRecQty +=  Number(allItemList[i].received_qty) ;
				}
			} else if(segmentOrderList.length > 0 && j != 0) {
				for ( var i = 0; i < segmentOrderList.length; i++) {
					segmentOrderList[i].pick_req_qty = (segmentOrderList[i].pick_req_qty != null && segmentOrderList[i].pick_req_qty != undefined) ? segmentOrderList[i].pick_req_qty
							: '';
					sumOfPickReq += Number(segmentOrderList[i].pick_req_qty) ;
					segmentOrderList[i].dispatched_qty = (segmentOrderList[i].dispatched_qty != null && segmentOrderList[i].dispatched_qty != undefined) ? (segmentOrderList[i].dispatched_qty)
							: '';
					sumOfDispQty += Number(segmentOrderList[i].dispatched_qty) ;
					segmentOrderList[i].fair_share_qty = (segmentOrderList[i].fair_share_qty != null && segmentOrderList[i].fair_share_qty != undefined) ? (segmentOrderList[i].fair_share_qty)
							: '';
					sumOffairQty += Number(segmentOrderList[i].fair_share_qty) ;
					segmentOrderList[i].received_qty = (segmentOrderList[i].received_qty != null && segmentOrderList[i].received_qty != undefined) ? (segmentOrderList[i].received_qty)
							: '';
					sumOfRecQty +=  Number(segmentOrderList[i].received_qty) ;
					
				}
			}

			deliveryStatusDtl[j].dispatched_date = (deliveryStatusDtl[j].dispatched_date != null && deliveryStatusDtl[j].dispatched_date != undefined) ? (deliveryStatusDtl[j].dispatched_date)
					: '';
			if(deliveryStatusDtl[j].dispatched_date != '' && deliveryStatusDtl[j].dispatched_date != null && deliveryStatusDtl[j].dispatched_date != undefined)
				deliveryStatusDtl[j].dispatched_date=(deliveryStatusDtl[j].dispatched_date.replace('.','/').replace('.','/')=='00/00/0000'? '' :deliveryStatusDtl[j].dispatched_date.replace('.','/').replace('.','/'));
			
			deliveryStatusDtl[j].dispatched_time = (deliveryStatusDtl[j].dispatched_time != null && deliveryStatusDtl[j].dispatched_time != undefined) ? (deliveryStatusDtl[j].dispatched_time)
					.replace(/PT/gi, '').replace(/H/gi, ':')
					.replace(/M/gi, ':').replace(/S/gi, '').substring(0, 5)
					: '';
			if (deliveryStatusDtl[j].dispatched_time == "00:00")
				deliveryStatusDtl[j].dispatched_time = '';
			
			deliveryStatusDtl[j].pick_list_gen_date = (deliveryStatusDtl[j].pick_list_gen_date != null && deliveryStatusDtl[j].pick_list_gen_date != undefined) ? (deliveryStatusDtl[j].pick_list_gen_date)
					: '';
			
			if(deliveryStatusDtl[j].pick_list_gen_date != '' && deliveryStatusDtl[j].pick_list_gen_date != null && deliveryStatusDtl[j].pick_list_gen_date != undefined)
				deliveryStatusDtl[j].pick_list_gen_date=(deliveryStatusDtl[j].pick_list_gen_date.replace('.','/').replace('.','/')=='00/00/0000'? '' :deliveryStatusDtl[j].pick_list_gen_date.replace('.','/').replace('.','/'));
			
			
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
			if(deliveryStatusDtl[j].received_date != '' && deliveryStatusDtl[j].received_date != null && deliveryStatusDtl[j].received_date != undefined)
			deliveryStatusDtl[j].received_date=(deliveryStatusDtl[j].received_date.replace('.','/').replace('.','/')=='00/00/0000'? '' :deliveryStatusDtl[j].received_date.replace('.','/').replace('.','/'));
			
			deliveryStatusDtl[j].allocated_qty = (deliveryStatusDtl[j].allocated_qty != null && deliveryStatusDtl[j].allocated_qty != undefined) ? (deliveryStatusDtl[j].allocated_qty)
					: '';

			content += '<tr><td class="keyInfo" width="20%">PICK Lists Generated:</td><td class="valueInfo" width="15%">'
					+ deliveryStatusDtl[j].pick_list_gen_date
					+ ' '
					+ deliveryStatusDtl[j].pick_list_gen_time
					+ '</td><td class="keyInfo" width="15%">Qty. Suggested:</td><td class="valueInfo" width="15%">'
					+ deliveryStatusDtl[j].suggested_qty
					+ '</td><td class="keyInfo" width="15%">PICK Requested:</td><td class="valueInfo lastColumn">'
					+ Number(sumOfPickReq).toFixed(3)
					+ '</td></tr>'
					+ '<tr><td class="keyInfo">Dispatched Date:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].dispatched_date
					+ ' '
					+ deliveryStatusDtl[j].dispatched_time
					+ '</td><td class="keyInfo">Qty. Allocated:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].allocated_qty
					+ '</td><!--<td class="keyInfo">Qty. Ordered:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].ordered_qty
					+ '</td>--><td class="keyInfo">Fairshare Qty.</td><td class="valueInfo lastColumn">'
					+ '+ / - '
					+ Number(sumOffairQty).toFixed(3)
					+ '</td><!--<td class="keyInfo">Received:</td><td class="valueInfo lastColumn">'
					+ sumOfRecQty
					+ '</td>--></tr>'
					+ '<tr><td class="keyInfo"><!--Received:--></td><td class="valueInfo"><!--'
					+ deliveryStatusDtl[j].received_date
					+ '--></td><td class="keyInfo">Qty. Dispatched:</td><td class="valueInfo">'
					+ Number(sumOfDispQty).toFixed(3)
					+ '</td><!--<td class="keyInfo">Qty. Allocated:</td><td class="valueInfo">'
					+ deliveryStatusDtl[j].allocated_qty
					+ '</td>--><td class="keyInfo"><!--Fairshare Qty.--></td><td class="valueInfo lastColumn"><!--'
					+ '+ / - '
					+ sumOffairQty
					+ '--></td><td class="keyInfo"><!--Received Pallets:</td><td class="valueInfo lastColumn">'
					+ totalPallets
					+ '--></td></tr>'
					+ '<tr><td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;</td>'
					+ '<td class="keyInfo"><!--Qty. Dispatched:--></td><td class="valueInfo"><!--'
					+ sumOfDispQty
					+ '--></td><td class="keyInfo"><!--Fairshare Qty.--></td><td class="valueInfo lastColumn">'
					+ '<!--+ / - '
					+ sumOffairQty
					+ '--></td></tr><!--<tr><td class="keyInfo">&nbsp;</td><td class="valueInfo">&nbsp;</td>'
					+ '<td class="keyInfo">Qty. Supplied:</td><td class="valueInfo">'
					+ '+ / - '
					+ sumOfDispQty
					+ '</td><td class="keyInfo">&nbsp;</td><td class="valueInfo lastColumn">&nbsp;'
					+ '</td></tr>-->';

		}
	}
	return content;
}

function formOverAllPreqHeader(obj){
	$('#backBtnId').removeClass('hideBlock');
	obj.roasterDate=(obj.roasterDate.replace('.','/').replace('.','/')=='00/00/0000'? '' :obj.roasterDate.replace('.','/').replace('.','/'));
	var content='<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tr>'
			+'<td class="keyInfo" width="20%">Total Cartons:</td><td class="valueInfo" width="15%">'+obj.totCartons+'</td>'
			+'<td class="keyInfo" width="15%">Roster Date:</td><td class="valueInfo" width="15%">';
			if(obj.roasterDate.length>7)
				content+=obj.roasterDate;
			content+='</td>'
			+'<!--<td class="keyInfo" width="15%">Trading Dept:</td><td class="valueInfo lastColumn">'+obj.department+'</td>'
			+'</tr><tr>-->'
			/*+'<td class="keyInfo">Total Pallets:</td><td class="valueInfo">'+obj.totPallets+'</td>'*/
			+'<td class="keyInfo">'	
			+'Creation Date:</td><td class="valueInfo">'+obj.creationDate.replace('.','/').replace('.','/')+'</td>'
			//+'<td class="keyInfo">Temperature:</td>'
			//+'<td class="valueInfo lastColumn">'+obj.temperature+'</td>'
			+'</tr></table></div>';
	
	/*<tr><td class="keyInfo">Total Cartons Received:</td>'
	+'<td class="valueInfo"></td><td class="keyInfo">Received Date:</td><td class="valueInfo">' 
	+'</td><td class="keyInfo">Temperature 2:</td><td class="valueInfo lastColumn">'+obj.temperature2+'</td></tr>
*/	
	return content;
}
function formItemHdr(orderList) {
	
	var content = '<div class="ContentTableWrapper"><div class="tableInfo headingFix"><div class="tableTitle">'
			+'<h4 class="sectionTitle">List of Articles</h4></div> <!-- End of table title -->'
			+'</div> <!-- End of table info --><div id="itemTabs" class="filterTabs ui-tabs ui-widget ui-widget-content ui-corner-all">'
			+'<ul>'
			+'<li class="allTab"><a href="#tabs-all" >All (100)</a></li>'
			+'<li class"unSupTab"><a href="#tabs-unsup" >Unsupplied (10)</a></li>'
			+'<li class="filterMenu '+securityGrs+'"><div class="filterMenuOptions"><label class="filterTitle">Received / Amended in GR:</label>'
			+'<select class="selectOptions grnSelect">'
			+'</select><label class="actionBtn" id="showFilterResult">Go</label><input type="hidden" name="verifyGRN" id="verifyGRN" value="0"></div> <!-- End of filter menu options -->'
			+'</li></ul><div id="tabs-all">'						
			+'<table cellspacing="0" class="ContentTable treetable drilldownTable" id="treetable"></table>'
			+'</div> <!-- End of tabs -1 -->'
			+'<div id="tabs-unsup" >'
			+'<table cellspacing="0" class="ContentTable"></table></div> <!-- End of tabs - 2 -->'
			+'<div id="filterResult" class="hideBlock ui-tabs-panel"></div> <!-- End of tabs --></div>';

return content;
}

function formItemHdrForSeg(orderList,j) {
		var content = '<div class="ContentTableWrapper segArtList'+j+'"><div class="tableInfo headingFix"><div class="tableTitle">'
			+'<h4 class="sectionTitle">List of Articles</h4></div> <!-- End of table title -->'
			+'</div> <!-- End of table info -->'			
			+'<table cellspacing="0" class="ContentTable treetable drilldownTable deliveryTbls-'+j+'" id="treetable">'+segListArticles(orderList)+'</table>'
			//+'<table cellspacing="0" class="ContentTable">'+formUnsuppItemList(orderList)+'</table>'
			+'</div>';

return content;
}

function segListArticles(orderList)
{

var allTblContent='<tbody><tr><!--<th width="15px"><span class="indenter">'
	+'<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>'
	+'<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>'
	+'</span></th>--><th>Article #</th><th>Description</th>'
	+'<th>Vendor Ref. #</th><th class="numberColumn">&nbsp;&nbsp;&nbsp;Order Qty.&nbsp;&nbsp;&nbsp;</th><th class="numberColumn">Order Multiple (OM)</th>'
	+'<th class="numberColumn">Dispatch Qty.</th>'
	+'<th class="numberColumn ">Received Qty.</th><th class="numberColumn">Total Units Received</th></tr>';
if (orderList != null) {
	for(var j=0;j<orderList.length;j++){
		if((null != orderList[j].orderQty && orderList[j].orderQty!="") && 
				(null != orderList[j].receivedQty && orderList[j].receivedQty !="")) {
		for(var k=j;k<orderList.length;k++){
			if((null != orderList[k].orderQty && orderList[k].orderQty!="") && 
					(null != orderList[k].receivedQty && orderList[k].receivedQty!="")) {
			var inner=Math.abs(Number(orderList[k].orderQty)-Number(orderList[k].receivedQty));
			var outter=Math.abs(Number(orderList[j].orderQty)-Number(orderList[j].receivedQty));
			if(outter<inner){
				var temp=orderList[j];
				orderList[j]=orderList[k];
				orderList[k]=temp;
			}
			}
		}
		}
	}
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			
			allTblContent += '<tr data-tt-id="1" class="collapsed allItem">'
				+'<!--<td><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>-->'
				+'<td>'+list[i].article.replace(/^0+/, '')+'</td>'
				+'<td>'+list[i].articleDesc+'</td>'
				+'<td>'+list[i].vendorRefNo.replace(/^0+/, '')+'</td>'						
				+'<td class="numberColumn">'+list[i].orderQty+' '+list[i].orderUOM+'</td>'
				+'<td class="numberColumn">'+list[i].packSize+' '+list[i].totUnitsUom+'</td>'
				+'<td class="numberColumn">'+list[i].dispatchedQty+' '+list[i].dispatchedQtyUOM+'</td>'																
				+'<td class="numberColumn">'+list[i].receivedQty/*+' '+list[i].receivedQtyUOM*/+'</td>'
				+'<td class="lastColumn numberColumn">'+list[i].totPackSizeQtyRcvd+' '+list[i].totPackSizeQtyUom+'</td>'
				+'</tr>'
				+'<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span class="indenter"></span><table cellspacing="0" class="ContentTable" width="100%">'
				+'<tbody><tr><td class="keyInfo" width="20%">Unsupplied Quantity:</td><td class="valueInfo">'+list[i].unSuppliedQty+'</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
				+'##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated Quantity:</td>'
				+'<td class="valueInfo">'+list[i].allocatedQty+'</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';
				
			}
}
return allTblContent;
	
}

function formAllItemList(orderList) {
var allTblContent='<tr ><th>Article #</th><th>Description</th>'
	+'<th>Vendor Ref. #</th><th class="numberColumn">&nbsp;&nbsp;&nbsp;Order Qty.&nbsp;&nbsp;&nbsp;</th><th class="numberColumn">Order Multiple (OM)</th>'
	+'<th class="numberColumn">Dispatch Qty.</th>'
	+'<th class="numberColumn ">Received Qty.</th><th class="numberColumn">Total Units Received</th></tr>';
if (orderList != null) {
	for(var j=0;j<orderList.length;j++){
		if((null != orderList[j].orderQty && orderList[j].orderQty!="") && 
				(null != orderList[j].receivedQty && orderList[j].receivedQty !="")) {
		for(var k=j;k<orderList.length;k++){
			if((null != orderList[k].orderQty && orderList[k].orderQty!="") && 
					(null != orderList[k].receivedQty && orderList[k].receivedQty!="")) {
			var inner=Math.abs(Number(orderList[k].orderQty)-Number(orderList[k].receivedQty));
			var outter=Math.abs(Number(orderList[j].orderQty)-Number(orderList[j].receivedQty));
			if(outter<inner){
				var temp=orderList[j];
				orderList[j]=orderList[k];
				orderList[k]=temp;
			}
			}
		}
		}
	}
		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			//<td><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span></td>
			allTblContent += '<tr data-tt-id="1" class="collapsed allItem">'
				+'<td>'+list[i].article.replace(/^0+/, '')+'</td>'
				+'<td>'+list[i].articleDesc+'</td>'
				+'<td>'+list[i].vendorRefNo.replace(/^0+/, '')+'</td>'						
				+'<td class="numberColumn">'+list[i].orderQty+' '+list[i].orderUOM+'</td>'
				+'<td class="numberColumn">'+list[i].packSize+' '+list[i].totUnitsUom+'</td>'
				+'<td class="numberColumn">'+list[i].dispatchedQty+' '+list[i].dispatchedQtyUOM+'</td>'																
				+'<td class=" numberColumn">'+list[i].receivedQty/*+' '+list[i].receivedQtyUOM*/+'</td>'
				+'<td class="lastColumn numberColumn">'+list[i].totPackSizeQtyRcvd+' '+list[i].totPackSizeQtyUom+'</td>'
				+'</tr>'
				+'<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span class="indenter"></span><table cellspacing="0" class="ContentTable" width="100%">'
				+'<tbody><tr><td class="keyInfo" width="20%">Unsupplied Quantity:</td><td class="valueInfo">##</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
				+'##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated Quantity:</td>'
				+'<td class="valueInfo">##</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';
				
			}
}
return allTblContent;
}
function formPreqItemList(orderList) {
	//<th width="15px"><span class="indenter"><a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>'
	//+'<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a></span></th>
var allTblContent='<tr ><th>Article #</th><th>Description</th>'
	+'<th>Vendor Ref. #</th><th class="numberColumn lastColumn">&nbsp;&nbsp;&nbsp;Order Qty.&nbsp;&nbsp;&nbsp;</th>'
	/*+'<th class="numberColumn">Dispatch Qty.</th>'
	+'<th class="numberColumn ">Received Qty.</th>'*/
	+'</tr>';
if (orderList != null) {

		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			//<td><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span></td>
			allTblContent += '<tr data-tt-id="1" class="collapsed allItem">'
				+'<td>'+list[i].article.replace(/^0+/, '')+'</td>'
				+'<td>'+list[i].articleDesc+'</td>'
				+'<td>'+list[i].vendorRefNo.replace(/^0+/, '')+'</td>'						
				+'<td class="numberColumn lastColumn">'+list[i].orderQty+'</td>'
				/*+'<td class="numberColumn">'+list[i].dispatchedQty+'</td>'																
				+'<td class="lastColumn numberColumn">'+list[i].receivedQty+'</td>'*/
				+'</tr>'
				+'<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;"><td colspan="7"><span class="indenter"></span><table cellspacing="0" class="ContentTable" width="100%">'
				+'<tbody><tr><td class="keyInfo" width="20%">Unsupplied Quantity:</td><td class="valueInfo">##</td><td class="keyInfo" width="20%">SOH:</td><td class="valueInfo">'
				+'##</td><td class="keyInfo" width="20%">SIT:</td><td class="valueInfo lastColumn">##</td></tr><tr class="lastRow"><td class="keyInfo">Allocated Quantity:</td>'
				+'<td class="valueInfo">##</td><td class="keyInfo">SOO:</td><td class="valueInfo">##</td><td class="keyInfo">OM:</td><td class="valueInfo">##</td></tr></tbody></table></td>';
				
			}
}
return allTblContent;
}
function formUnsuppItemList(orderList,obj) {
	//obj.orderStatus 
	var flag=false;
	var unsuppliedTblContent='<tr ><th rowspan="2">Article #</th>	<th rowspan="2" class="columnDivider">Description</th><th colspan="2" class="columnDivider centerValue">Order</th>'
		+'<th colspan="2" class="columnDivider centerValue">Allocation Sent</th><th colspan="2" class="columnDivider centerValue">PICK Request</th>'
		+'<th colspan="2" class="columnDivider centerValue">Dispatch Qty.</th>'
		+'<th colspan="2" class="columnDivider centerValue">Received</th><th colspan="2" class="centerValue lastColumn">Unsupplied</th></tr><tr class="subHeader">'
		+'<th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th><th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th>'					
		+'<th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th><th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th>'
		+'<th class="numberColumn">OM</th><th class="columnDivider numberColumn">Qty.</th><th class="centerValue">Difference</th><!--<th class="lastColumn">Reason</th>--></tr>';
	if (orderList != null) {
		var inner = 0;
		var outter = 0;
		for(var j=0;j<orderList.length;j++){
			if((null != orderList[j].orderQty && orderList[j].orderQty!="") && 
					(null != orderList[j].receivedQty && orderList[j].receivedQty !="")) {
			for(var k=j;k<orderList.length;k++){
				//if(obj.orderStatus == 'RECEIVED'){
				if((null != orderList[k].orderQty && orderList[k].orderQty!="") && 
						(null != orderList[k].receivedQty && orderList[k].receivedQty!="")) {
				 inner=Math.abs(Number(orderList[k].orderQty)-Number(orderList[k].receivedQty));
				 outter=Math.abs(Number(orderList[j].orderQty)-Number(orderList[j].receivedQty));
				if(outter<inner){
					var temp=orderList[j];
					orderList[j]=orderList[k];
					orderList[k]=temp;
						}
					}
				//}
			}
			}
		}
			var list = orderList;
			for ( var i = 0; i < list.length; i++) {
					if(list[i].unSuppliedQty!=null && list[i].unSuppliedQty.trim()!='' && parseInt(list[i].unSuppliedQty.trim())!= 0){
						
						list[i].orderUOM = (list[i].orderUOM != null && list[i].orderUOM != undefined) ? (list[i].orderUOM)
								: '';
						list[i].orderQty = (list[i].orderQty != null && list[i].orderQty != undefined) ? (list[i].orderQty)
								: '';
						list[i].allocatedQtyUOM = (list[i].allocatedQtyUOM != null && list[i].allocatedQtyUOM != undefined) ? (list[i].allocatedQtyUOM)
								: '';
						list[i].allocatedQty = (list[i].allocatedQty != null && list[i].allocatedQty != undefined) ?list[i].allocatedQty
								: '';
						list[i].pickReqUOM = (list[i].pickReqUOM != null && list[i].pickReqUOM != undefined) ? (list[i].pickReqUOM)
								: '';
						list[i].packReqQty = (list[i].packReqQty != null && list[i].packReqQty != undefined) ? (list[i].packReqQty)
								: '';
						list[i].receivedQtyUOM = (list[i].receivedQtyUOM != null && list[i].receivedQtyUOM != undefined) ? (list[i].receivedQtyUOM)
								: '';
						list[i].receivedQty = (list[i].receivedQty != null && list[i].receivedQty != undefined) ? (list[i].receivedQty)
								: '';
						list[i].dispatchedQty = (list[i].dispatchedQty != null && list[i].dispatchedQty != undefined) ? (list[i].dispatchedQty)
								: '';
						list[i].dispatchedQtyUOM = (list[i].dispatchedQtyUOM != null && list[i].dispatchedQtyUOM != undefined) ? (list[i].dispatchedQtyUOM)
								: '';
						list[i].unsuppliedDiff = (list[i].unsuppliedDiff != null && list[i].unsuppliedDiff != undefined) ? (list[i].unsuppliedDiff)
								: '';
						list[i].unsuppliedReason = (list[i].unsuppliedReason != null && list[i].unsuppliedReason != undefined) ? (list[i].unsuppliedReason)
								: '';						
					unsuppliedTblContent+='<tr class="lastRow unSuppItem">'
						+'<td>'+list[i].article.replace(/^0+/, '')+'</td><td class="columnDivider">'+list[i].articleDesc
						+'</td><td class="numberColumn">'+list[i].orderUOM+'</td><td class="columnDivider numberColumn">'+list[i].orderQty+'</td>'
						+'<td class="numberColumn">'+list[i].allocatedQtyUOM+'</td><td class="columnDivider numberColumn">'+list[i].allocatedQty+'</td>'
						+'<td class="numberColumn">'+list[i].pickReqUOM+'</td><td class="columnDivider numberColumn">'+list[i].packReqQty+'</td><td class="numberColumn">'
						+list[i].dispatchedQtyUOM+'</td><td class="columnDivider numberColumn">'+list[i].dispatchedQty	
						+'</td><td class="numberColumn">'
						+list[i].receivedQtyUOM+'</td><td class="columnDivider numberColumn">'+list[i].receivedQty
						+'</td><td class="centerValue valueInfo">'+list[i].unSuppliedQty+'</td><!--<td class="lastColumn">'+list[i].unsuppliedReason+'</td>--></tr>';
					flag=true;
				}
			}
	}
	if(flag)
	return unsuppliedTblContent;
	else
		return '';
	}
function bindOrderContent(){
	if(canViewOrderDetail)// Fix as per discussion with Sahithya for defect 14615
		{
	$('.orderTable.rowContent').click(function(){
		var index=0;
		if($(this).attr('id').split('-').length>0)
		{
			index=$(this).attr('id').split('-')[1].trim();
		}
		var obj='';
		if(commonOrderList!='' && commonOrderList!=null && commonOrderList!=undefined)
			obj=commonOrderList[Number(index)];
		var ordNo = obj.orderNo;
		
		getOrderDetails(ordNo,obj);
		
		});
		}// Fix as per discussion with Sahithya for defect 14615
}

function getOrdersList(orderNo,data,currentPage) {
	if(data==null || data=='' || data==undefined)
	{
		data = $('#orderEnq').serialize();
		inputData=data;
		orderPage=1;
		orderPageFlag=true;
	}
	var orderList = '';
	var msg = '';
	var output = '';
	var count='';
console.log("ORDER DATA :::: "+data);
	$.ajax({
		type : "get",
		url : "getPOrderDtl.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
			if(orderPageFlag)
			hideOrderTbl();
		},
		success : function(response) {
			
			output = $.parseJSON(response);
			
			orderList = output.data;
			
			msg = output.msg;
			
			console.log("msg ::::: " + msg);
			
			if (msg != undefined && msg!='' && !isNaN(msg) && orderList != null) {
				orderListContent(orderList);
				count=orderList[0].msg.trim();
				
				showOrderFound(count,data);
				commonOrderList=orderList;
				//bindAllocationContent();
				bindOrdersScroll();
				console.log("ORDER count :::: "+count);
				if(!preqFlag && $('#orderNo').val().trim() != '')
				{
					showOrderTab();
				}
				else if ($('#orderType').val() == 'ALL' ||$('#orderType').val() == orderTypeVendorOrders)
					showBothTab();
				else if($('#orderType').val() == orderTypeWarehouseOrders)
					showOrderTab();
			} else {
				if(orderNo!='' && orderNo!=undefined){
					
					getPReqList(orderNo,'','');
				}
				else{
				if(msg=='null')
					{
					showErrorInOrder('Service Unavailable.');
					}
				else
					{
					if($('#orderType').val() == 'ALL' && $('#orderNo').val().trim() == '' && !(msg.length > 14))
						{
						showErrorInOrderTab(msg,data);
						showBothTab();
						}
						else
						showErrorInOrder(msg,data);
					}
				bindOrdersScroll();
				console.log("ORDER msg :::: "+msg);
				}
			}
			
			$.loader('close');
		},
		error : function() {
			// goToLogin();
		},
	});

}
function getAllocationDtl() {
	var data = $('#orderEnq').serialize();
	var promoAllocation = '';
	var msg = '';
	var output = '';

	$.ajax({
		type : "get",
		url : "getAllocationDtl.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
			hideAllocationTbl();
		},
		success : function(response) {
			output = $.parseJSON(response);
			promoAllocation = output.data;
			msg = output.msg;
			if (msg != undefined && msg!='' && !isNaN(msg) && promoAllocation != null) {
				formAllocationContent(promoAllocation);
				bindAllocationContent();
				bindAllocScroll();
			} else {
				if(msg=='null')
					showErrorInOrder('Service Unavailable.');
				else
				showErrorInOrder(msg);
				bindAllocScroll();
			}
			$.loader('close');
		},
		error : function() {
			// goToLogin();
		},
	});
	

}

function getPReqList(orderNo,data,currentPage) {
	if(data==null || data=='' || data==undefined)
	{
		data = $('#orderEnq').serialize();
		preqPage=1;
		preqPageFlag=true;
		preqData=data;
	}
	console.log("PREQ DATA :: "+data);
	var preqOrders = '';
	var msg = '';
	var output = '';
	var count='';

	$.ajax({
		type : "get",
		url : "getPReqDetail.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
			if(preqPageFlag)
			hidePReqTbl();
		},
		success : function(response) {
			output = $.parseJSON(response);
			preqOrders = output.data;
			msg = output.msg;
			if (msg != undefined && msg!='' && !isNaN(msg) && preqOrders != null) {
				preqOrderList(preqOrders);
				commonPreqList=preqOrders;
				count=preqOrders[0].msg.trim();
				showPReqTbl(count,data);
				bindPreqScroll();
				securityMatrix();// Fix as per discussion with Sahithya for defect 14615
				bindPreqContent();
				console.log("PREQ count :: "+count);
				preqFlag=true;
				if(preqFlag && $('#orderNo').val().trim() != '')
				{
				showPReqTab();
				}
			} else {
				if(msg=='null')
					showErrorInOrder('Service Unavailable.');
				else
					{
					if($('#orderType').val() == 'ALL' && $('#orderNo').val().trim() == '' && !(msg.length > 14))
						showErrorInPreqTab(msg,data);
					else
				showErrorInOrder(msg);
					}
				bindPreqScroll();
				console.log("PREQ msg :: "+msg);
			}
			
			$.loader('close');
		},
		error : function() {
			// goToLogin();
		},
	});

}
function bindPreqContent(){
	if(canViewOrderDetail)// Fix as per discussion with Sahithya for defect 14615
		{
$('#preqTreeTable tbody tr').click(function(){
	//getPreqDetails(orderNo);
	var index=0;
	if($(this).attr('id').split('-').length>0)
	{
		index=$(this).attr('id').split('-')[1].trim();
	}
	//console.log(index);
	var obj='';
	if(commonPreqList!='' && commonPreqList!=null && commonPreqList!=undefined)
		obj=commonPreqList[Number(index)];
	//console.log($(this).find('td:first').text().trim());
	getPreqDetails($(this).find('td:first').text().trim(),obj);
});
		}
}
function getPreqDetails(orderNo,obj) {
	var data = {orderNo:orderNo};
	var msg = '';
	var output = '';
	var tabHeader='';
	var tabSection='';
	commonOrder=obj;

	$.ajax({
		type : "get",
		url : "getPreqDtls.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
			//hideOrderTbl();
		},
		success : function(response) {
			
			output = $.parseJSON(response);
			//var deliveryInfo=$.parseJSON(output.data.deliveryInfo);
			var itemInfo=$.parseJSON(output.data.itemInfo);
			//var grInfo=$.parseJSON(output.data.grInfo);
			//var invoiceInfo=$.parseJSON(output.data.invoiceInfo);
			
			msg = itemInfo.msg;
			//var deliveryList=deliveryInfo.data;
			//var deliveryMsg=deliveryInfo.msg;
			tabHeader='<div id="sections" class="sectionTabs"><ul id="over-all">';
			
			
			if (msg != undefined && msg!='' && !isNaN(msg) && itemInfo.data != null) {
				
				var orderHd=preqHead(obj);
				var overAllHdr=formOverAllPreqHeader(obj);
				var itemAllList=formPreqItemList(itemInfo.data);
				//var itemUnsuList=formUnsuppItemList(itemInfo.data);
				
			/*if(deliveryList!=null && deliveryList!=undefined && deliveryList!=''
				&& deliveryMsg!=null && deliveryMsg!='' && deliveryMsg!=undefined ){
				currentTab=deliveryList.length;
				for(var j=(deliveryList.length-1);j>=0;j--){
					if(j==0){
				tabHeader+='<li><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
					+'<label class="sectionInfo">Total Deliveries: <strong>'+deliveryList.length+'</strong></label></a></li>';
				tabSection+='<div id="section-overAll">'+
				orderSubHdr(obj,'overAll','Overall Info')+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'+overAllHdr + invoic
				+ formStoreContent(obj) + deliveCon 
				+'</div></div>'+formItem+'</div>';
					}else{*/
						tabHeader+='<li><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
						+'<label class="sectionInfo"><strong>&nbsp</strong></label></a></li>';
						tabSection+='<div id="section-overAll">'+
						orderSubHdr(obj,'delivery','Overall Info')+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'
						+overAllHdr
						+'</div></div><div class="ContentTableWrapper"><div class="tableInfo headingFix"><div class="tableTitle"><h4 class="sectionTitle">'
						+'List of Articles</h4></div></div><table cellspacing="0" class="ContentTable treetable drilldownTable deliveryTbls" id="treetable">'
						+'</table></div></div>';
					//}
				
				//}
			/*}else{
				tabHeader+='<li><a href="#section-overAll"><label class="sectionTitle">Overall Info</label>'
				+'<label class="sectionInfo">Total Deliveries: <strong>2</strong></label></a></li>';
			
				tabSection+='<div id="section-overAll">'+
				orderSubHdr(obj,'overAll','Overall')+ '<div class="articleContent orderDetails "> <div class="articleContentInner">'+overAllHdr + invoic
				+  formStoreContent(obj)  + deliveCon 
				+'</div></div>'+formItem+'</div>';
			}*/
			tabHeader+='</ul>';
			bindPreqDtlContent(orderHd,tabHeader,tabSection,itemAllList,itemInfo);
			} else {
				if(msg=='null')
					showErrorInOrder('Service Unavailable.');
				else
				showErrorInOrder(msg);
				//bindOrdersScroll();
			}
			$.loader('close');
		},
		error : function() {
			// goToLogin();
		},
	});

}

function bindPreqDtlContent(orderHd,tabHeader,tabSection,itemAllList,itemInfo){
	$('.tabbedOrderDetail .articleHead .articleHeaderWrapper').html('').html(orderHd);
	//$('.sectionTabs ul').html('').html(tabHeader);
	$('.detailsSections').html('').append(tabHeader+tabSection+'</div>');
	$('.sectionTabs').tabs();
	$('.contentWrapper.order').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').removeClass('hideBlock');
	$('.deliveryTbls').html('').html(itemAllList);
	
	$('.enq').addClass('hideBlock');
	$('.dtl').removeClass('hideBlock');
	$('.totalArticle').text(itemInfo.data.length);
	
	
}
function showBothTab()
{

	if ($('#tabs').hasClass('ui-tabs'))
		$('#tabs').tabs('destroy');

	$('#tabs').tabs();

	$('li[aria-controls="tabs-1"] ')
			.removeClass('hideBlock');
	$('li[aria-controls="tabs-2"] ')
	.removeClass('hideBlock');
		$("#tabs").tabs("option", "active", 0);

}

function showOrderTab(){
	
	if ($('#tabs').hasClass('ui-tabs'))
		$('#tabs').tabs('destroy');

	$('#tabs').tabs();

	$('li[aria-controls="tabs-1"],li[aria-controls="tabs-2"]')
			.removeClass('hideBlock');
		$("#tabs").tabs("option", "active", 0);
		$('li[aria-controls="tabs-2"]').addClass('hideBlock');

}
function showPReqTab(){
	
	if ($('#tabs').hasClass('ui-tabs'))
		$('#tabs').tabs('destroy');

	$('#tabs').tabs();

	$('li[aria-controls="tabs-1"],li[aria-controls="tabs-2"]')
			.removeClass('hideBlock');
		$("#tabs").tabs("option", "active", 1);
		$('li[aria-controls="tabs-1"]').addClass('hideBlock');

}
function bindContentRow(){
	
	$('.rowContent').click(function(){
		//alert("click1");
		console.log('content');
		});
	
}
function showAllocationTbl(count){
	$('#resultContent .allocationTbl,.allocationTbl, #treetable,.allocationTbl .tableTitle ').removeClass('hideBlock');
	$('#resultContent .tableTitle h4 span').html('Total <strong>'+count+'</strong> allocation found');
	
	/*if(count==1){
		setTimeout(function(){$('#orderTreeTable tbody tr:first').click();},100);
	}else */
	if(count>10)
		{
		//if(orderPageFlag){
		//orderPageFlag=false;
		//inputData=data;
		$('.allocationPage').pagination({
			items : count,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : allocationPage,
			onPageClick : function(pageNumber) {
				allocationPage=pageNumber;
				$('.allocationPage').removeClass('hideBlock');
				$('.mainTr').removeClass('collapseAll').addClass('expandAll');
				$('.childTr').addClass('hideBlock');
				$('.parentTr ').removeClass('expanded').addClass('collapsed');
				showAllocationPage(pageNumber);
				//getOrdersList(orderNo, (inputData+"&pageNo="+pageNumber), pageNumber);

			}

		});
		
		//}
		$('.allocationPage').removeClass('hideBlock');
	}
}
function showOrderFound(count,data){
	//As per Haresh comments changing for NGBO integration
	$('.orderTitle .tableTitle h4').html(fromDate != '' ? 'List of orders for <strong>'+$('input[name="fromDate"]').val()+' - '+$('input[name="toDate"]').val()+'</strong>' : 'List of Orders and PReqs');
	$('#orderTreeTable, .filterTabs,.orderTitle').removeClass('hideBlock');
	$('#tabs-1 .recordsfound').removeClass('hideBlock').css('padding-bottom','10px');
	$('#tabs-1 .recordsfound h4 span').html('Total <strong>'+count+'</strong> Orders found');
	$( "#tabs" ).tabs( "option", "active", 0 );
	$('.orderPagination').addClass('hideBlock');
	if(count==1){
		setTimeout(function(){$('#orderTreeTable tbody tr:first').click();},100);
	}else if(count>10)
		{
		if(orderPageFlag){
		orderPageFlag=false;
		inputData=data;
		$('.orderPagination').pagination({
			items : count,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : orderPage,
			onPageClick : function(pageNumber) {
				orderPage=pageNumber;
				$('.orderPagination').removeClass('hideBlock');
				getOrdersList(orderNo, (inputData+"&pageNo="+pageNumber), pageNumber);

			}

		});
		
		}
		$('.orderPagination').removeClass('hideBlock');
	}
	//else{
		
	//}
}
function showPReqTbl(count,data){
	$('.orderTitle .tableTitle h4').html(fromDate != '' ? 'List of orders for <strong>'+$('input[name="fromDate"]').val()+' - '+$('input[name="toDate"]').val()+'</strong>' : 'List of Orders and PReqs');
	$('#preqTreeTable, .filterTabs,.orderTitle').removeClass('hideBlock');
	$('#tabs-2 .preqrecords').removeClass('hideBlock').css('padding-bottom','10px');
	$('#tabs-2 .preqrecords h4 span').html('Total <strong>'+count+'</strong> Preq found');
	$( "#tabs" ).tabs( "option", "active", 1 );
	$('.preqPagination').addClass('hideBlock');
	if(count==1){
		if(preqPageFlag)
		setTimeout(function(){$('#preqTreeTable tbody tr:first').click();},100);
	}else if(count>10)
		{
		if(preqPageFlag){
			preqPageFlag=false;
		preqData=data;
		$('.preqPagination').pagination({
			items : count,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : preqPage,
			onPageClick : function(pageNumber) {
				preqPage=pageNumber;
				$('.preqPagination').removeClass('hideBlock');
				getPReqList(orderNo, (preqData+"&pageNo="+pageNumber), pageNumber);

			}

		});
		
		}
		$('.preqPagination').removeClass('hideBlock');
	}
	//else{
		
	//}
}
function hideAllocationTbl(){
	$('.allocationTbl,#tabs,#treetable,.orderTitle').addClass('hideBlock');
}
function hideOrderTbl(){
	$('#orderTreeTable,.orderTitle').addClass('hideBlock');
	//$('.orderPagination').addClass('hideBlock');
}
function hidePReqTbl(){
	$('#preqTreeTable tbody tr').html('');
	$('#preqTreeTable,.orderTitle').addClass('hideBlock');
}
function bindAllocationContent(){
	$(".allocationTbl").addClass('actionRows').tablesort();
	$('.mainTr').click(function(e){
		e.stopPropagation();
	if(($(this).hasClass('expandAll')))
		{
		$(this).removeClass('expandAll').addClass('collapseAll');
		$(this).parent().parent().parent().parent().parent().find('tr.parentTr:visible').removeClass('collapsed').addClass('expanded');
		$(this).parent().parent().parent().parent().parent().find('tr.parentTr:visible').next().removeClass('hideBlock');
		}else {
			$(this).removeClass('collapseAll').addClass('expandAll');
			$(this).parent().parent().parent().parent().parent().find('tr.parentTr:visible').removeClass('expanded').addClass('collapsed');
			$(this).parent().parent().parent().parent().parent().find('tr.parentTr:visible').next().addClass('hideBlock');
		}
	});
	$('.hdrMain').click(function(){
		$('.mainTr').removeClass('collapseAll').addClass('expandAll');
		$('.childTr').addClass('hideBlock');
		$('.parentTr ').removeClass('expanded').addClass('collapsed');
	});
	
	$('.parentTr').click(function(){
		if($(this).hasClass('collapsed')){
		$(this).removeClass('collapsed').addClass('expanded');
		$(this).next().removeClass('hideBlock');
		}else{
		$(this).removeClass('expanded').addClass('collapsed');
		$(this).next().addClass('hideBlock');
		}
		});
}
function updateSortPlugin(){
	$(".sortTable").trigger("update"); 
    
}
function formAllocationContent(promoAllocation) {
	var recordList=0;
	var content = '<thead class="hdrMain"><tr><th width="15px" style="background-image: none;"><span class="indenter"><a title="Expand All" class="expandAll mainTr" id="expandAll">&nbsp;</a>'
			//+ '<a href="#" title="Collapse All" class="collapseAll" id="collapseAll">&nbsp;</a>'
			+'</span></th><th data-sort="date">On Show Date</th><th data-sort="int">Allocation #</th>'
			+ '<th class="lastColumn" data-sort="string">Allocation Description</th></tr></thead><tbody>';

	if (promoAllocation != null) {
		var pageNo=1;
		
		for ( var m in promoAllocation) {
			recordList++;
			var list = promoAllocation[m];
			//expanded
			
			content += '<tr class="collapsed parentTr appendedAlloc pageNo-'+pageNo;
			if(pageNo>1)
				content+=' hideBlock ';
			content+=' " id="parent-'+m+'"><td><span class="indenter" style="padding-left: 0px;"><a title="Collapse">&nbsp;</a></span></td>'
					+ '<td>'
					+ list[0].showDate.replace('.','/').replace('.','/')
					+ '</td>'
					+ '<td>'
					+ list[0].allocationNo.replace(/^0+/, '')
					+ '</td>'
					+ '<td class="lastColumn">'
					+ list[0].allocationDesc
					+ '</td></tr>';
			if(recordList%10==0){
				pageNo++;
			}
			content += '<tr  class="childTr noChild  hideBlock" id=child-'+m+'><td colspan="4"><span class="indenter" style="padding-left: 19px;"></span><table class="secondaryTable" cellspacing="0" width="100%"><tr>'
					+ '<th width="5%">Article #</th><th>Description</th><th class="centerValue" width="5%">Total Qty</th><th class="centerValue" width="10%">Allocation Status</th>'
					+ '<th class="centerValue" width="5%">Delivery Date</th><th class="centerValue" width="5%">Order #</th></tr>';
			//<th class="centerValue" width="5%">Segment</th><th class="centerValue lastColumn" width="10%">Order Status</th>
			for ( var i = 0; i < list.length; i++) {
				content += '<tr><td>'
						+ list[i].article.replace(/^0+/, '')
						+ '</td>'
						+ '<td>'
						+ list[i].articleDesc
						+ '</td>'
						+ '<td class="centerValue">'
						+ list[i].allocationQty
						+ '</td>'
						+ '<td class="centerValue">'
						+ list[i].allocationStatus
						+ '</td>'
						+ '<td class="centerValue">'
						+ list[i].deliveryDate.replace('.','/').replace('.','/')
						+ '</td>'
						+ '<td class="centerValue">';
				if(list[i].warehouseOrder!=null && list[i].warehouseOrder!=undefined && list[i].warehouseOrder!='' ){
					if(list[i].warehouseOrder!=undefined && list[i].warehouseOrder.trim()!='')
						content+='<a class="navigate" onclick="getAllocOrdersList(&quot;'+list[i].warehouseOrder.replace(/^0+/, '')+'&quot;,&quot;&quot;,&quot;&quot;)" >'
								+ list[i].warehouseOrder.replace(/^0+/, '')
								+ '</a>';
				}else{
				if(list[i].orderNo!=undefined && list[i].orderNo.trim()!='')
				content+='<a class="navigate" onclick="getAllocOrdersList(&quot;'+list[i].orderNo.replace(/^0+/, '')+'&quot;,&quot;&quot;,&quot;&quot;)" >'
						+ list[i].orderNo.replace(/^0+/, '')
						+ '</a>';
				}
				content+='</td>'
						//+ '<td class="centerValue">&nbsp;</td><td class="centerValue">&nbsp;</td>'
						+'</tr>';
			}

			content += '</table></td></tr>';
		}
	}
	$('#treetable').html('');
	if($('#orderType :selected').val() != 'ALL')
		{
	$('#orderTreeTable tbody:first').html('');
	$('#preqTreeTable tbody:first').html('');
		}
	$('#treetable').html(content);
	showAllocationTbl(recordList);
}
function orderListContent(orderList) {
	var flag = false;
	var content = '';
									

if (orderList != null) {

	//for ( var m in orderList) {

		var list = orderList;
		for ( var i = 0; i < list.length; i++) {
			flag=true;
			list[i].roasterDate=(list[i].roasterDate.replace('.','/').replace('.','/')=='00/00/0000'? '' :list[i].roasterDate.replace('.','/').replace('.','/'));
			content += '<tr class="orderTable rowContent actionRows" id="orderTableRowClick-'+i+'" ><td>';
					if(list[i].somOrderNo=="")
						{
						content += list[i].orderNo.replace(/^0+/, '')
					+ '</td>';
						}
					else if(list[i].somOrderNo != list[i].orderNo)
						{
						content +=  list[i].somOrderNo+' ('+list[i].orderNo.replace(/^0+/, '')+')'
						+ '</td>';
						}
					else
						{
						content += list[i].orderNo.replace(/^0+/, '')
						+ '</td>';
						}
					content +=  '<td>'+ list[i].delvDate.replace('.','/').replace('.','/')
					+ '</td>'
					/*+ '<td>'
					+ list[i].roasterDate.replace('.','/').replace('.','/')
					+ '</td>'*/
					+ '<td>'
					+ list[i].orderStatus
					+ '</td>'
					+ '<td class="">'
					+ list[i].vendorNo.replace(/^0+/, '');
					if(list[i].vendorNo!='' && list[i].vendorName!='') 
						content+=' - ';
						content+= list[i].vendorName
					+ '</td>'
					+ '<td class="centerValue">'
					+ list[i].orderType
					+ '</td>'
					+ '<!--<td class="">'
					+ list[i].deptName
					+ '</td>-->'
					/*+ '<td class="centerValue">'
					+ ''//list[i].department
					+ '</td>'*/
					+ '<td class="centerValue">'
					+ list[i].source
					+ '</td>'
					
					+ '<td class="numberColumn">'
					+ list[i].totCartons
					+ '</td>'
					+ '<td class="numberColumn">'
					+ list[i].totPallets
					+ '</td>';
		}

		content += '<!--</table></td></tr></tbody></div>-->';
	//}
}
$('#orderTreeTable tbody:first').html('');
$('#orderTreeTable tbody:first').html(content);	
securityMatrix();// Fix as per discussion with Sahithya for defect 14615
bindOrderContent();
if(flag){
	updateSortPlugin();
	setTimeout(function(){
		if(!($('#orderTreeTable').hasClass('tablesorter'))){
			$.tablesorter.destroy( $('#orderTreeTable'), true, function(table){
				console.log('done');
				});
			$("#orderTreeTable").tablesorter({
				dateFormat : "ddmmyyyy",
			    emptyTo: 'top'
			  });
		}
		
		// set sorting column and direction, this will sort on the first 
	    var sorting = [[0,0]]; 
	    // sort on the first column 
	    $("#orderTreeTable").trigger("sorton",[sorting]);
	},30);
	}else{
		$('.paginationDiv ').addClass('hideBlock');
	}

}
function preqOrderList(preqOrders) {
	
	var content = '';
	var flag = false;						

if (preqOrders != null) {

//for ( var m in preqOrders) {

var list = preqOrders;
for ( var i = 0; i < list.length; i++) {
	flag = true;
	list[i].roasterDate=(list[i].roasterDate.replace('/','').replace('/','')=='00/00/0000'? '' : list[i].roasterDate.replace('.','/').replace('.','/'));
	content += '<tr class="orderTable contentRow actionRows preqOrderTable" id ="preq-'+i+'" ><td>'
			+ list[i].purReqNo//.replace(/^0+/, '')
			+ '</td>'
			+ '<td>';
			/*if(list[i].roasterDate.length>7)
				content+= list[i].roasterDate;
			content+='</td>'*/
		content+= list[i].delvDate.replace('.','/').replace('.','/')
			+ '</td>'
			+ '<td class="">'
			+ list[i].orderStatus
			+ '</td>'
			+ '<td class="">'
			+list[i].vendorNo.replace(/^0+/, '');
	if(list[i].vendorNo!='' && list[i].vendorName!='') 
		content+=' - ';
		content+= list[i].vendorName
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].orderType
			+ '</td>'
			+ '<!--<td class="">'
			+ list[i].deptName
			+ '</td>-->'
			/*+ '<td class="centerValue">'
			+ ''
			+ '</td>'*/
			+ '<td class="centerValue">'
			+ list[i].source
			+ '</td>'
			
			+ '<td class="centerValue">'
			+ list[i].totCartons
			+ '</td>'
			/*+ '<td class="centerValue">'
			+ list[i].totPallets
			+ '</td>'*/;
}

//content += '</table></td></tr></tbody></div>';
//}
}
$('#preqTreeTable tbody:first').html('');
$('#preqTreeTable tbody:first').html(content);	

if(flag){
	updateSortPlugin();
	setTimeout(function(){
		if(!($('#preqTreeTable').hasClass('tablesorter'))){
			$.tablesorter.destroy( $('#preqTreeTable'), true, function(table){
				console.log('done');
				});
			$("#preqTreeTable").tablesorter({
				dateFormat : "ddmmyyyy",
			    emptyTo: 'top'
			  });
		}
		
		// set sorting column and direction, this will sort on the first 
	    var sorting = [[0,0]]; 
	    // sort on the first column 
	    $("#preqTreeTable").trigger("sorton",[sorting]);
	},30);
	}else{
		$('.paginationDiv ').addClass('hideBlock');
	}

}
function uncheckItems(userList) {
	$.each(userList, function(i, item) {
		$('.' + item.lableId).removeAttr('checked');
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
function closeAdvSearchClasses() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();
	$('#supplier').val('');
	$('#all').click();
	$("#suppName").val("");
	$("#suppName").val("");
	$("#suppNo").val("");
	$('#orderStatus').val('Select');
	$('#orderType').val('All');
	//$("#fromDate").val("");
	//$("#toDate").val("");
	//$("#rosterFromDate").val("");
	//$("#rosterToDate").val("");
	
}
function closeAdvSearch() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();

}
function navigateToDetail(index, type) {

	$('#index').val(index);
	
	$('#statusImg').removeClass('statusWrapper hideBlock');
	$('#statusImg').addClass('statusWrapper');
	if (type == 'PO')
		$('#orderSearchSubmit').attr('action', 'requestOrderDetail.htm');
	else
		$('#orderSearchSubmit').attr('action', 'requestPReqDetail.htm');
	$('#orderSearchSubmit').attr('method', 'POST');
	$('#orderSearchSubmit').submit();

}
function validateDate1(rosDate, delDate, id1, id2, msg) {
	var splittedRosDate = formateDate(rosDate).split('/');
	var splittedDelDate = formateDate(delDate).split('/');
	var actualRosDate = new Date();
	var actualDelDate = new Date();
	var month1 = splittedRosDate[1] - 1;
	var month2 = splittedDelDate[1] - 1;
	actualRosDate.setFullYear(splittedRosDate[2], month1, splittedRosDate[0]);
	actualDelDate.setFullYear(splittedDelDate[2], month2, splittedDelDate[0]);
	var splittedOne = splittedRosDate[0] + splittedRosDate[1]
			+ splittedRosDate[2];
	var splittedTwo = splittedDelDate[0] + splittedDelDate[1]
			+ splittedDelDate[2];

	if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
			|| (splittedOne.length != 8 && splittedOne.length != 6)) {
		showAlert('Please enter a ' + msg + ' date in dd/mm/yyyy format.', id1);
		return false;
	} else if ((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999)
			|| (splittedTwo.length != 8 && splittedTwo.length != 6)) {
		showAlert('Please enter ' + msg + ' date in dd/mm/yyyy format.', id2);
		return false;
	} else if (actualRosDate.getTime() > actualDelDate.getTime()) {
		showAlert('Please enter valid date range for ' + msg
				+ '. To date can not be before ' + rosDate + '.', id2);
		return false;
	} else
		return true;
}
function validateDate(rosDate, id1, msg) {
	if (rosDate.split('/').length == 3) {
		var splittedRosDate = formateDate(rosDate).split('/');
		var actualRosDate = new Date();
		var month1 = splittedRosDate[1] - 1;
		actualRosDate.setFullYear(splittedRosDate[2], month1,
				splittedRosDate[0]);
		var splittedOne = splittedRosDate[0] + splittedRosDate[1]
				+ splittedRosDate[2];

		if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
				|| (splittedOne.length != 8 && splittedOne.length != 6)) {
			showAlert('Please enter ' + msg + ' date in dd/mm/yyyy format.',
					id1);
			return false;
		} else
			return true;
	} else {
		showAlert('Please enter ' + msg + ' date in dd/mm/yyyy format.', id1);
		return false;
	}
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
function getRadioValue(name) {
	var group = document.getElementsByName(name);

	for ( var i = 0; i < group.length; i++) {
		if (group[i].checked) {
			return group[i].value;
		}
	}

	return '';
}
function calculateScrollWindow() {
	var tableCols = $('.sortTable thead tr th:visible').length;

	var width = 0;
	width = (tableCols * 100) - 100;
	if ($('.sortTable thead tr .VNM').is(':visible'))
		width = width + 200;
	if (width < 1004)
		width = 1004;
	$("#scrollWindow").css('width', width);

	if (width <= 1004) {
		$("#scrollTable").removeClass('scrollTableContainer');
		$("#scrollWindow").removeClass('scrollWindow');
		$("#scrollBtns").addClass('hideBlock');
	} else {
		$("#scrollTable").addClass('scrollTableContainer');
		$("#scrollWindow").addClass('scrollWindow');
		$("#scrollBtns").removeClass('hideBlock');
	}

	$('#next-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#previous-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});

	$('#next-column1').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#previous-column1').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
}
function showErrorInOrder(msg) {
	$(".orderTitle").addClass('hideBlock');
	$(".filterTabs").addClass('hideBlock');
	$('.order #errorMsg').text(msg);
	$(".order #errorMsgDiv").removeClass('tableTitle nodataMessage');
	$(".order #errorMsgDiv").addClass('tableTitle errorDiv');
	$('.order .errorDivWrapper').removeClass('hideBlock');
}
function hideErrorInOrder() {
	$('.order #errorMsg').text('');
	$(".order #errorMsgDiv").addClass('tableTitle nodataMessage');
	$(".order #errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.order .errorDivWrapper').addClass('hideBlock');
}
function populateNewDate(delFromDate, id) {

	var fromDate = formateDate(delFromDate);
	var currentDate = new Date();
	var splittedFromDate = fromDate.split('/');
	var actualFromDate = new Date();
	var monthFrom = splittedFromDate[1] - 1;
	actualFromDate.setFullYear(splittedFromDate[2], monthFrom,
			splittedFromDate[0]);

	if (currentDate.getTime() > actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() + (1209600000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		$("#" + id).val(newDelDate);
		console.log("IF"+newDelDate);
	} else if (currentDate.getTime() <= actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() + (1209600000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		$("#" + id).val(newDelDate);
		console.log("ELSE IF"+newDelDate);
	}

}

function populateNewFromDateForPast3Days(delFromDate, id) {

	var fromDate = formateDate(delFromDate);
	var currentDate = new Date();
	var splittedFromDate = fromDate.split('/');
	var actualFromDate = new Date();
	var monthFrom = splittedFromDate[1] - 1;
	actualFromDate.setFullYear(splittedFromDate[2], monthFrom,
			splittedFromDate[0]);

	if (currentDate.getTime() > actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() - (259200000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		$("#" + id).val(newDelDate);
		console.log("FROM IF"+newDelDate);
	} else if (currentDate.getTime() <= actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() - (259200000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		console.log("FROM ELSE"+newDelDate);
		$("#" + id).val(newDelDate);
	}

}
function populateNewFromDate(delFromDate, id) {

	var fromDate = formateDate(delFromDate);
	var currentDate = new Date();
	var splittedFromDate = fromDate.split('/');
	var actualFromDate = new Date();
	var monthFrom = splittedFromDate[1] - 1;
	actualFromDate.setFullYear(splittedFromDate[2], monthFrom,
			splittedFromDate[0]);

	if (currentDate.getTime() > actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() - (1209600000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		$("#" + id).val(newDelDate);
		console.log("FROM IF"+newDelDate);
	} else if (currentDate.getTime() <= actualFromDate.getTime()) {
		var date1 = new Date();
		date1.setTime(actualFromDate.getTime() - (1209600000));
		month3 = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1)
				: (date1.getMonth() + 1);
		var newDate = date1.getDate() < 10 ? "0" + date1.getDate() : date1
				.getDate();
		var newDelDate = newDate + "/" + month3 + "/" + date1.getFullYear();
		console.log("FROM ELSE"+newDelDate);
		$("#" + id).val(newDelDate);
	}

}

function showAlert(msg, id) {
	$('#alertBox').text(msg);
	$('#dialog-alertBox').parent().find('.ui-dialog-title').text('Order Enquiry');
	$("#dialog-alertBox").removeClass('hideBlock');
	$("#dialog-alertBox").parent().addClass("popupWrapper");
	$("#dialog-alertBox").dialog("open");
	$('#okBtn').unbind('click');
	$('#okBtn').click(function(e) {
		$("#dialog-alertBox").dialog("close");
		$("#" + id).focus();
		var temp = $("#" + id).val();
		$("#" + id).val(temp);
	});

}
function loadPreferenceSettings() {
	$.ajax({
		type : "get",
		url : "getPreferenceDetails.htm",
		data : "",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateResult(response);
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
}
function updatePreferenceSettings(value) {
	$
			.ajax({
				type : "get",
				url : "updatePreferenceDetails.htm",
				data : {
					unselectedVal : value
				},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {

					if (response != undefined && response != '')
						$('.settingsMsg').removeClass('popupError')
								.removeClass('popupWarning').addClass(
										'popupWarning').text(response);
					else
						$('.settingsMsg').removeClass('popupError')
								.removeClass('popupWarning').addClass(
										'popupError').text('UpdateFailed.');

					var masterList = $.parseJSON($('#masterList').val());
					if (masterList.masterList.length > 0) {

						$.each(masterList.masterList, function(i, item) {
							$('th.' + item.lableId + ',td.' + item.lableId)
									.removeClass('hideBlock');
						});
					}
					if (value.trim() != '' && value.split(':').length > 0) {
						for ( var i = 0; i < value.split(':').length; i++) {
							$(
									'th.' + value.split(':')[i].split('-')[0]
											+ ',td.'
											+ value.split(':')[i].split('-')[0])
									.addClass('hideBlock');
						}
					}

					stopLoading();
					calculateScrollWindow();
				},
				error : function() {
					// goToLogin();
				},
			});
}
function functionhideBlock()
{
	$(".contentWrapper").addClass('hideBlock');
	$(".contentRow").addClass('hideBlock');
	$(".tableInfo").addClass('hideBlock');
	}
function orderDetailsTable(orderDetails)
{
	functionhideBlock();
	
	var content = '<div class="contentWrapper">'
		+ '<div class="articleHead">'
		+ '<div class="articleHeaderWrapper"><h2 class="articleTitle">Order #10000610 </h2><p><label class="articlePriceLabel">Philip Morris Limited (0002294001) </label>'
		+ '</p></div> <!-- End of article header wrapper --><div class="articleActionBtns hideBlock"><label class="orderStatus">Status: <strong>Open</strong></label>'
		+ '<label class="actionBtn" id="receiveOrder"><label class="notepad">Receive Order</label></label><label class="actionBtn" ><label class="notepadCross">Cancel Order</label></label>'
		+ '<span id="dropdown" class="selectDropdown"><label class="actionBtn" id="dropdownSelect" tabindex="3"><label class="createBtn">More</label></label>'
		+'<ul class="dropdown"><li><label class="dropdownLabel">Variance Report</label></li>'
		+ '</ul></span></div> <!-- End of article action btns --></div> <!-- End of Article head --><div class="detailsSections">'
		+'<div id="sections" class="sectionTabs"><ul><li><a href="#section-2"><label class="sectionTitle">Delivery 2</label>'
		+'<label class="sectionInfo">Segment #<strong></strong></label></a><li>'
		+'<a href="#section-1"><label class="sectionTitle">Delivery 1</label><label class="sectionInfo">Segment #<strong></strong></label>'
		+'</a></a>'		
		+'</li>'
		+'<li>'
		+'<a href="#section-overall">'
		+'<label class="sectionTitle">Overall Info</label>'
		+'<label class="sectionInfo">Total Deliveries: <strong>2</strong></label>'
		+'</a>'
		+'</li>'	
		+'</ul>'
		+'<div id="section-overall"><div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle">Overall Info </h2>'
		+'<p><label class="articlePriceLabel">Delivery Date: <strong>02/12/2012</strong> <label class="editRecord hideBlock" id="editdDate">&nbsp;</label></label>'
		+'<label class="articlePriceLabel">|</label><label class="articlePriceLabel">Total Articles: <strong>100</strong> </label>'
		+'</p></div><div class="articleActionBtns"><label class="orderStatus">Status: <strong>Open</strong></label><label class="actionBtn" ><label class="notepadCross">Cancel Order</label></label>'
		+'<span id="dropdown" class="selectDropdown"><label class="actionBtn" id="dropdownSelect" tabindex="3"><label class="createBtn">More</label></label><ul class="dropdown">'
		+'<li><label class="dropdownLabel">Variance Report</label></li></ul></span></div>'
		+'</div> <!-- End of article head -->';
							

if (orderDetails != null) {

for ( var m in orderList) {

var list = orderList[m];
for ( var i = 0; i < list.length; i++) {
	content += '<tbody class="contentRow"><tr class="orderTable rowContent actionRows" id="orderTableRowClick" ><td>'
			+ list[i].orderNo
			+ '</td>'
			+ '<td>'
			+ list[i].roasterDate.replace('.','/').replace('.','/')
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].vendorName
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].deptName
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].department
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].source
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].orderType
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].totCartonsUOM
			+ '</td>'
			+ '<td class="centerValue">'
			+ list[i].totPallets
			+ '</td>';
}

content += '</tbody></table></td></tr></tbody></div>';
}
}
$('#orderTreeTable').html('');
$('#orderTreeTable').html(content);	
	
}
function iterateResult(response) {

	var output = $.parseJSON(response);
	var content = '';
	if (output.msg != null && output.msg.length > 0) {
		content = output.msg;
		$('#dialog-tableSettings .ContentTable').html('');
		$('.settingsMsg').removeClass('popupError').removeClass('popupWarning')
				.addClass('popupError').text(content);
		$(
				'.applyColumnStng,.cancelColumnStng,#dialog-tableSettings .ContentTableWrapper,#dialog-tableSettings .alertText')
				.addClass('hideBlock');
	} else if (output.masterList != null && output.masterList.length > 0) {
		var descList = output.masterList;
		content = '<tr><th>Default</th><th class="lastColumn">Allocation</th></tr>';
		var rows = '';
		var def = new Array();
		var all = new Array();
		var j = 0, k = 0;
		$
				.each(
						descList,
						function(i, item) {
							if (item.orderType == 'DEF') {
								def[j] = '<td><input type="checkbox" checked="checked" name="defaultList" class="'
										+ item.lableId
										+ '" value="'
										+ item.lableId
										+ '-'
										+ item.orderType
										+ '" id="'
										+ item.lableId
										+ '"><label for="'
										+ item.lableId
										+ '">'
										+ item.lableDesc
										+ '</label></td>';
								j++;
							}
							if (item.orderType == 'ALOC') {
								all[k] = '<td><input type="checkbox" checked="checked" name="defaultList" class="'
										+ item.lableId
										+ '" value="'
										+ item.lableId
										+ '-'
										+ item.orderType
										+ '" id="'
										+ item.lableId
										+ '"><label for="'
										+ item.lableId
										+ '">'
										+ item.lableDesc
										+ '</label></td>';
								k++;
							}
						});
		if (def.length > all.length)
			j = def.length;
		else
			j = all.length;
		for (k = 0; k < j; k++) {
			rows += '<tr>';
			if (k < def.length)
				rows += def[k];
			else
				rows += '<td></td>';
			if (k < all.length)
				rows += all[k];
			else
				rows += '<td></td>';

			rows += '</tr>';
		}
		if (rows != '') {
			content += rows;
		}
		// console.log(content);
		if (output.userList != null && output.userList.length > 0) {
			uncheckItems(output.userList);
		}
		$('#dialog-tableSettings .ContentTable').html('');
		$('#dialog-tableSettings .ContentTable').html(content);
		$(
				'.applyColumnStng,.cancelColumnStng,#dialog-tableSettings .ContentTableWrapper,#dialog-tableSettings .alertText')
				.removeClass('hideBlock');
	}
	stopLoading();

	$('.settingsMsg').removeClass('popupError').removeClass('popupWarning')
			.text('');
	$("#dialog-tableSettings").parent().addClass("popupWrapper");
	// console.log(content);
	if (output.userList != null && output.userList.length > 0) {
		uncheckItems(output.userList);
	}
	$("#dialog-tableSettings").dialog("open");

	
	// code to initialise tree table
$(".treetable").treetable({
	expandable: true
});

/*$('.rowContent').click(function(){
	//alert("click1");
	console.log('content');
	});*/

$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

/*$(selector).pagination({
	items: 100,
	itemsOnPage: 10,
	cssStyle: 'compact-theme'
});	*/	



}
function bindOrdersScroll(){
	var tableCols = 0;

	$("#orderTreeTable tbody tr").each(function() {
		var currCount = 0;
		$(this).children("td").each(function() {
			currCount++;
			var colSpan = $(this).attr("colspan");
			if (colSpan > 0) {
				currCount = currCount + (colSpan - 1);
			}
			if (currCount > tableCols)
				tableCols = currCount;

		}); // next td
	}); // next tr

	
	var width = 0;
	if (tableCols < 12) {
		$("#scrollTable-orders").removeClass('scrollTableContainer');
		$("#scrollWindow-orders").removeClass('scrollWindow');
		$("#scrollBtns-orders").addClass('hideBlock');
	}

	if (tableCols > 11) {
		width = (tableCols * 45) - 100;
		if (width > 1004)
			document.getElementById("scrollWindow-orders").style.width = width + "px";
		else
			document.getElementById("scrollWindow-orders").style.width = "1004px";
	}


	
	$('#next-column-orders').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});

	$('#previous-column-orders').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
}
function bindPreqScroll(){
	var tableCols = 0;

	$("#preqTreeTable tbody tr").each(function() {
		var currCount = 0;
		$(this).children("td").each(function() {
			currCount++;
			var colSpan = $(this).attr("colspan");
			if (colSpan > 0) {
				currCount = currCount + (colSpan - 1);
			}
			if (currCount > tableCols)
				tableCols = currCount;

		}); // next td
	}); // next tr

	var width = 0;
	if (tableCols < 12) {
		$("#scrollTable-preq").removeClass('scrollTableContainer');
		$("#scrollWindow-preq").removeClass('scrollWindow');
		$("#scrollBtns-preq").addClass('hideBlock');
	}


	if (tableCols > 11) {
		width = (tableCols * 45) - 100;
		if (width > 1004)
			document.getElementById("scrollWindow-preq").style.width = width + "px";
		else
			document.getElementById("scrollWindow-preq").style.width = "1004px";
	}



	$('#next-column-preq').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});

	$('#previous-column-preq').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
}
function bindAllocScroll(){
	var tableCols = 0;

	$("#treetable tbody tr").each(function() {
		var currCount = 0;
		$(this).children("td").each(function() {
			currCount++;
			var colSpan = $(this).attr("colspan");
			if (colSpan > 0) {
				currCount = currCount + (colSpan - 1);
			}
			if (currCount > tableCols)
				tableCols = currCount;

		}); // next td
	}); // next tr

	var width = 0;
	if (tableCols < 12) {
		$("#scrollTable-alloc").removeClass('scrollTableContainer');
		$("#scrollWindow-alloc").removeClass('scrollWindow');
		$("#scrollBtns-alloc").addClass('hideBlock');
	}


	if (tableCols > 11) {
		width = (tableCols * 45) - 100;
		if (width > 1004)
			document.getElementById("scrollWindow-alloc").style.width = width + "px";
		else
			document.getElementById("scrollWindow-alloc").style.width = "1004px";
	}



	$('#next-column-alloc').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});

	$('#previous-column-alloc').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
}
function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode > 31 && (charCode< 48 || charCode >57))
      return false;

   return true;
}
function saveAuthNo(data){

	//var data = $('#orderEnq').serialize();

	$.ajax({
		type : "post",
		url : "saveVendorClaimAuth.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			
			if (response=='true') {
				showAlert('Vendor claim authority number updated successfully.','vendorAuthNo');
				$('#headervendorAutho').text($('#vendorAuthNo').val().trim());
				$('.vendorClaim ').removeClass('hideBlock');
				commonOrder.vendorClaimNo=$('#vendorAuthNo').val().trim();
				$( "#dialog-modal-autho" ).dialog( "close" );	
			} else {
				showAlert(response,'vendorAuthNo');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
};

function getWarehouseVariance(orderNo){

	//var data = $('#orderEnq').serialize();
	
	$.ajax({
		type : "get",
		url : "varianceOnPageLoad.htm",
		data : "",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			var option = $("<h4>").html(response).find("#whvReport");
			if(option!='' && option!=undefined){
				showVarianceContent(option,orderNo);
				
			}else {
				showAlert('Cannot load Warehose variance report.','vendorAuthNo');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
};
function showVarianceContent(option,orderNo){
	$('.contentWrapper.order').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').addClass('hideBlock');
	$('.contentWrapper.tabbedOrderDetail').after().find('#whvReport').remove();
	$(option).insertAfter('.contentWrapper.tabbedOrderDetail');
	$('.vari,dtl').removeClass('hideBlock');
	$('.currentPage.dtl').addClass('hideBlock');$('head').find('.wareHouseJS');
	$("head").append('<script class="wareHouseJS" type="text/javascript" src="../../scripts/wareHouseVarianceReport.js"></script>');
	//setTimeout(function(){$('.formWrapper input[name="orderNo"] :first').val(orderNo).focus();},500);
	$('#orderNo').val(orderNo);
	$('.formWrapper input[name="orderNo"] :first').val(orderNo).focus();
};
function showAllocationPage(pageNo){
	//currentPage=pageNo;
	var pageClass='pageNo-'+pageNo;
	$('.appendedAlloc').filter(function(){
		if($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function getAllocOrdersList(orderNo,data,currentPage) {
	
	var orderList = '';
	var msg = '';
	var output = '';
	var count='';
console.log(data);
	$.ajax({
		type : "get",
		url : "getPOrderDtl.htm",
		data : {orderNo:orderNo},
		beforeSend : function() {
			startLoading();
			//if(orderPageFlag)
			//hideOrderTbl();
		},
		success : function(response) {
			
			output = $.parseJSON(response);
			
			orderList = output.data;
			
			msg = output.msg;
			
			if (msg != undefined && msg!='' && !isNaN(msg) && orderList != null) {
				//orderListContent(orderList);
				//count=orderList[0].msg.trim();
				
				//showOrderFound(count,data);
				commonOrderList=orderList;
				//bindAllocationContent();
				getOrderDetails(orderNo,commonOrderList[0]);
				//bindOrdersScroll();
				updateSortPlugin();
			} else{
				showAlert(msg, '');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});

}
function clearAllTable()
{
	$('#treetable').html('');
	$('#orderTreeTable tbody:first').html('');
	$('#preqTreeTable tbody:first').html('');
}
function showErrorInOrderTab(msg,data)
{
	$('#tabs').removeClass('hideBlock');
	//As per Haresh comments changing for NGBO integration
	$('.orderTitle .tableTitle h4').html(fromDate != '' ? 'List of orders for <strong>'+$('input[name="fromDate"]').val()+' - '+$('input[name="toDate"]').val()+'</strong>' : 'List of Orders and PReqs');
	$('.orderTitle').removeClass('hideBlock');
	$('#tabs-1 .recordsfound h4 span').html('');
	$('#orderErrorMsg').text(msg);
	$("#orderErrorDiv").removeClass('tableTitle nodataMessage');
	$("#orderErrorDiv").addClass('tableTitle errorDiv');
	$('.orderErrorDiv').removeClass('hideBlock');

}
function hideErrorInOrderTab()
{
	$('#tabs').addClass('hideBlock');
	$('.orderTitle').addClass('hideBlock');
	$("#orderErrorDiv").addClass('tableTitle nodataMessage');
	$("#orderErrorDiv").removeClass('tableTitle errorDiv');
	$('.orderErrorDiv').addClass('hideBlock');
	$('.orderPagination').addClass('hideBlock');
}

function showErrorInPreqTab(msg,data)
{
	$('#tabs').removeClass('hideBlock');
	//As per Haresh comments changing for NGBO integration
	$('.orderTitle .tableTitle h4').html(fromDate != '' ? 'List of orders for <strong>'+$('input[name="fromDate"]').val()+' - '+$('input[name="toDate"]').val()+'</strong>' : 'List of Orders and PReqs');
	$('.orderTitle').removeClass('hideBlock');
	$('#tabs-2 .preqrecords h4 span').html('');
	$('#preqErrorMsg').text(msg);
	$("#preqErrorDiv").removeClass('tableTitle nodataMessage');
	$("#preqErrorDiv").addClass('tableTitle errorDiv');
	$('.preqErrorDiv').removeClass('hideBlock');

}
function hideErrorInPreqTab()
{
	$('#tabs').addClass('hideBlock');
	$('.orderTitle').addClass('hideBlock');
	$("#preqErrorDiv").addClass('tableTitle nodataMessage');
	$("#preqErrorDiv").removeClass('tableTitle errorDiv');
	$('.preqErrorDiv').addClass('hideBlock');
	$('.preqPagination').addClass('hideBlock');
}