var grpTableFooter = '<tfoot><tr class="groupByTr1"><td colspan="15" class=""><div class="pageActions " style="padding:10px 0px">' + '<label><strong>Total Ordered Qty.: <i class="totalGroupCarton">0</i> </strong></label>'
  // + '<label class="actionBtn " id="editAction"><a ><label
  // class=""></label></a></label>'
  + '<label class="actionBtn validateAll" id="validateAll"><a ><label class="validate">Validate All</label></a></label>'
  + '<label class="actionBtn submitAll" id="createOrder"><a ><label class="thumbUp">Create All</label></a></label>'
  + '</div>' + '</td>' + '</tr></tfoot>';
var grpTableFooterForFilter = '<tfoot><tr class="groupByTr1"><td colspan="15" class=""><div class="pageActions " style="padding:10px 0px">' + '<label><strong>Total Ordered Qty.: <i class="totalGroupCarton">0</i> </strong></label>'
+ '<label class="actionBtn saveAll" id="editAction"><a ><label class="saveBtn">Save</label></a></label>' 
+ '<label class="actionBtn validateAll" id="validateAll"><a ><label class="validate">Validate All</label></a></label>'
+ '<label class="actionBtn submitAll" id="createOrder"><a ><label class="thumbUp">Create All</label></a></label>'
+ '</div>' + '</td>' + '</tr></tfoot>';
var popupHeader = content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th class="centerValue">Supplier</th><th width="40px" class="centerValue lastColumn">Select</th></tr>'
var groupHeader = '<table id="datatable" class="groupedTable ContentTable drilldownTable tableSorter treetab">' + '<tbody class="grpTbody"></tbody><tfoot><tr class="groupByTr1"><td colspan="15" class=""><div class="pageActions " style="padding:10px 0px"><label><strong>Total Ordered Qty.: <i class="totalGroupCarton">51</i> </strong></label><label class="actionBtn validateAll" id="validateAll"><a><label class="validate">Validate All</label></a></label><label class="actionBtn submitAll" id="createOrder"><a><label class="thumbUp">Create All</label></a></label></div></td></tr></tfoot></table>'
var ordersHeader = '<table id="datatable" class="groupedTable ContentTable drilldownTable  treetab">' + '<thead class="groupByTr1 table-sort-hdr"> <th class="noSort expander" width="15px" colspan="1">' + '<span class="indenter"><a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>' + '<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>' + '</span></th> <th data_prop="article">Article</th>' + ' <th data_prop="article_desc">Description</th> <th data_prop="soh"  class="centerValue title" title="Stock on Hand">SOH</th> <th data_prop="qty" class="centerValue" width="75px">Order Qty.</th>'
+ ' <th data_prop="om" class="centerValue title" title="Order Multiple" width="50px">OM</th> <th data_prop="total_qty" class="centerValue">Total Units Ordered</th> <th data_prop="delivery_date" class="centerValue">Delivery Date</th> <th data_prop="status" class="centerValue">Status</th>' + ' <th class="lastColumn centerValue noSort">Actions</th> <tr class="filterRow hideBlock drillsOpenDefault"><td>&nbsp;</td>' + '<td><input  class="textbox Filter" data-filterfor="articleNo"></td><td><input  class="textbox Filter" data-filterfor="article_desc"></td>' + '<td class="columnDivider"><input class="textbox Filter" data-filterfor="soh"></td><td><input  class="textbox  Filter"' + ' data-filterfor="qty" id=""></td><td><input  class="textbox  Filter" data-filterfor="om" placeholder=""' + ' id="om"></td><td><input class="textbox Filter" data-filterfor="total_qty"></td><td ><input' + ' class="textbox inputDate Filter" placeholder="dd/mm/yyyy" data-filterfor="delivery_date"></td><td><input class="textbox Filter" data-filterfor="status"></td><td>&nbsp;</td></tr></thead>' + grpTableFooterForFilter + '<tbody class="grpTbody"></tbody></table>';
var ordersHeaderIfGreenlifeArticleExist ='<table id="datatable" class="groupedTable ContentTable drilldownTable  treetab">'+ '<thead class="groupByTr1 table-sort-hdr"> <th class="noSort expander" width="15px" colspan="1">'+ '<span class="indenter"><a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>'+ '<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>'+ '</span></th> <th data_prop="article">Article</th>'+ ' <th data_prop="article_desc">Description</th> <th data_prop="soh"  class="centerValue title" title="Stock on Hand">SOH</th> <th data_prop="qty" class="centerValue" width="75px">Order Qty.</th>'+ '<th data_prop="cost_price" class="centerValue title" title="Cost Price">Cost Price</th>'+ ' <th data_prop="om" class="centerValue title" width="50px" title="Order Multiple">OM</th> <th data_prop="total_qty" class="centerValue">Total Units Ordered</th> <th data_prop="delivery_date" class="centerValue">Delivery Date</th>' + ' <th class="lastColumn centerValue noSort">Actions</th> <tr class="filterRow hideBlock drillsOpenDefault"><td>&nbsp;</td>' + '<td><input  class="textbox Filter" data-filterfor="articleNo"></td><td><input  class="textbox Filter" data-filterfor="article_desc"></td>' + '<td class="columnDivider"><input class="textbox Filter" data-filterfor="soh"></td><td><input  class="textbox  Filter"' + ' data-filterfor="qty" id=""></td><td><input  class="textbox Filter" data-filterfor="cost_price"></td><td><input  class="textbox  Filter" data-filterfor="om" placeholder=""' + ' id="om"></td><td><input class="textbox Filter" data-filterfor="total_qty"></td><td ><input' + ' class="textbox inputDate Filter" placeholder="dd/mm/yyyy" data-filterfor="delivery_date"></td><td>&nbsp;</td></tr></thead>' + grpTableFooterForFilter + '<tbody class="grpTbody"></tbody></table>'; 
var isGrouped = true;
var delDateFormat;
var globalData = [];
var itemsOnPage = 10;
var deptNo = '';
var category = '';
var subCategory = '';
var segment = '';
var toDeleteUpdate = [];
var limitOrderQty;
var limitOrderCount = 50;
var currentPageInOnOrder = 1;
var recordCountInOnOrder;
var articleNumber;
var currentPageInCurrent = 1;
var currentPageInFuture = 1;
var submitAll='submitAll';
var submit = 'submit';
var validateAll='validateAll';
var validateRoaster = 'validateRoaster';
var currentSooArticleNo='';
var currentAltArticleNo='';
var currentPromoArticleNo='';
var currentAlloArticleNo='';
var currentFrcstArticleNo='';
var allOrderGrpDefault = 'user';
var myOrderGrpDefault = 'deliveryDate';
var opt = true;
// changing the working from medium to high Defect_6851
var msgOrderReviewMediumQunatiy='Please review High quantities.';
var groupConfirmedMap = {};
var finalDraftList = [];
var delivDateCheckBoxResult = [];
var delivDateCheckBoxResTemp = [];
var maxCostPriceUpdate= "";
var isAlertNoDel= true;
var createOdrHandleMsg = true;
var validateMethodMsgDisplayMap = {
		'nearestDDMsg' : '1',
		'vendorEmerDDMsg' : '2',
		'whEmerDDMsg' : '3',
		'VendorNoRoasterDDMsg' : '4',
		'whNoRoasterDDMsg' : '5'
	};
var validateMethodMsgDisplayKeyMap = {
		'1' : 'nearestDDMsg',
		'2' : 'vendorEmerDDMsg',
		'3' : 'whEmerDDMsg',
		'4' : 'VendorNoRoasterDDMsg',
		'5' : 'whNoRoasterDDMsg'
	};
var executeVndorEmr = true;
var executeNoRstrVndorEmr = true;
var nearestDDMsg = "No roster available for Expected delivery date. Please select the available delivery date to proceed or press cancel to edit";

var vendorEmerDDMsg = 'No rosters exists for the expected delivery date. Are you sure you want to create an emergency order or select a future delivery date?';
//Msg changes confirmed by BA
//var whEmerDDMsg = 'No rosters exists for the expected delivery date. Please select from one of the below delivery dates or call Order Room to create rosters to proceed further.';
var whEmerDDMsg = 'No rosters exist for the selected delivery date. Please select an available delivery date below or follow the Emergency Rush Order process if required';

var VendorNoRoasterDDMsg = 'No roster available for the Expected delivery date. Do you want to create an emergency order?';
// Msg changes confirmed by BA
//var whNoRoasterDDMsg = 'No roster exists for the Expected delivery date. Please call Order Room to create roster to proceed further';
var whNoRoasterDDMsg = 'No roster exists for the Expected delivery date. Please follow the Emergency Rush Order process if required';
var $supp_tbl = '';
function bindOnloadEventsForCreateOrders() {
	loggedInSalesOrg  = $('#salesOrg').val();
	$("#submitAll-dialog").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 600,
		width : 515
	});
	$('#cancelButton').click(function(){
		$("#submitAll-dialog").dialog('close');
	});
	$("#submitAll-dialog").parent().addClass("popupWrapper");
	//getSAPPwd({option : submit});
	$("#dialog-delivery-result").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 515
	}).parent().addClass("popupWrapper");
  $('#qty')
    .within999();
  $('input.textbox').unbind('focus');
  $('input.textbox').focus(function() { $(this).select(); } );
  $(".filterTabs")
    .tabs();
  $("#dialog-alertBox")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 120,
      maxHeight: 800,	
      width: 480
    });
  $("#dialog-alertBox")
    .parent()
    .addClass('popupWrapper');
  $("#dialog-confirmation")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      maxHeight: 800,
      width: 480
    });
  $("#dialog-alt-pricing")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 110,
      maxHeight: 600,
      width: 800
    });
  $("#dialog-openOrders")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 200,
      maxHeight: 600,
      width: 700
    });
  $("#dialog-openOrders")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-modal-promo")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 200,
      maxHeight: 600,
      width: 800
    });
  $("#dialog-modal-promo")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-modal-his")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 200,
      maxHeight: 600,
      width: 800
    });
  $("#dialog-modal-his")
    .parent()
    .addClass("popupWrapper");
  createAutoSuggest($('#searchBox'));
 
  $("#dialog-allo")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      width: 920
    });
  $("#dialog-allo")
    .parent()
    .addClass("popupWrapper");
  // bind tab styles and event
  $('.tabs')
    .tabs();
  $('#create-order')
    .tabs();
  $('.treetab')
    .treetable({
      expandable: true
    });
  $('.popupActions .actionBtn')
    .click(function() {
      clearAllErrors();
      $("#dialog-modal-his")
        .dialog("close");
      $("#dialog-openOrders")
        .dialog("close");
      $("#dialog-modal-promo")
        .dialog("close");
      $("#dialog-allo")
        .dialog("close");
      $('#dialog-alt-pricing')
        .dialog('close');
    });
  $('#myDrafts')
    .find('#ordersList')
    .html('');
  $('#allDrafts')
    .find('#ordersList')
    .html('');
  $('#mo_groupByForm')
    .hide();
  // Add article Event
  $('#md_addActionBtn')
    .unbind('click');
  $('#md_addActionBtn')
    .click(function() {
      clearAllErrors();
      if (!$('tr[data-tt-id]')
        .hasClass('rowHighlight')) {
        $('#md_groupByClear')
          .trigger('click');
        $('#md_filterClear')
          .trigger('click');
      }
      if (!$("#md_groupByClear")
        .hasClass('hideBlock')) {
        $('#md_groupByClear')
          .trigger('click');
      }
      resetSearchFieldsInCreateOrders($('#myDrafts'));
      clearAllErrors();
      $('#articleSearchFormForCreate')
        .show();
      $('#mo_groupByForm')
        .hide();
      $('#articleSearchDivForCreate')
        .show();
      if (!$('tr[data-tt-id]')
        .hasClass('rowHighlight')) {
        delDateFormat = false;
        var data = [];
        $("#ordersList")
          .find('tr[fromdraft]')
          .each(function() {
            data.push($(this)
              .data('obj'));
          });
        $('#ordersList')
          .html('');
        if (data != null && data != undefined && data.length > 0) addAriclesFromDraft(data, $('#ordersList'), 'deliveryDate');
      }
    });
  $('.closeLink')
    .click(function() {
      // $('#articleSearchFormForCreate').slideToggle(100);
      // $('#articleSearchDivForCreate').hide();
      $('#articleSearchFormForCreate')
        .hide();
      $('#mo_groupByForm')
        .hide();
      $('#articleSearchDivForCreate')
        .hide();
    });
  $('#md_filterOpen')
    .unbind('click');
  $('#md_filterOpen').click(function() {
      clearAllErrors();
      $("#md_filterClear").removeClass('hideBlock');
      //$('.filterWrapper').removeClass('hideBlock').fadeIn(50);
      $.fn.showInformationMsg();
      $(this).addClass('hideBlock');
      $('#articleSearchFormForCreate').hide();
      $('#mo_groupByForm').hide();
      $('#articleSearchDivForCreate').hide();
      if ($('#md_groupByClear').is(':visible')) {
        $('#md_groupByClear').trigger('click');
      }
      delDateFormat = false;
      var data = [];
      $("#ordersList").find('tr[fromdraft]').each(function() {
          data.push($(this).data('obj'));
        });
      $('#ordersList').html('');
      if (data != null && data != undefined && data.length > 0) {
        formFilterContent(data, $('#ordersList'), 'fromdraft');
        $('.filterRow ')
          .removeClass('hideBlock');
      }
    });
  $('#md_filterClear').unbind('click');
  $('#md_filterClear').click(function() {
      clearAllErrors();
      $('.Filter').val('');
      $("#md_filterOpen").removeClass('hideBlock');
      $('.filterWrapper').fadeOut(50);
      $(this).addClass('hideBlock');
      $('.filterRow ').addClass('hideBlock');
      $('#articleSearchFormForCreate').hide();
      $('#mo_groupByForm').hide();
      $('#ordersList .grpTbody tr[mainrow]').removeClass('hideBlock');
      $('#articleSearchDivForCreate').hide();
    });
  $('#md_groupByOpen').unbind('click');
  $('#md_groupByOpen').click(function() {
      clearAllErrors();
      $("#md_groupByClear").removeClass('hideBlock');
      $(this).addClass('hideBlock');
      if ($('#md_filterClear').is(':visible')) {
        $('#md_filterClear').trigger('click');
      }
      $('#articleSearchFormForCreate').hide();
      $('#mo_groupByForm').show();
      $('#articleSearchDivForCreate').show();
      //$("#myDrafts").find('#del').prop('checked', true);
      var chec = 'del';
      var grp = (opt ? myOrderGrpDefault : allOrderGrpDefault);
      if(grp == 'user'){
    	  chec = 'user';
      }else if(grp == 'department'){
    	  chec = 'deptName';
      }else if(grp == 'deliveryDate'){
    	  chec = 'del';
      }else if(grp == 'supplier'){
    	  chec = 'supp';
      }
      $("#myDrafts").find('#'+chec).prop('checked', true);
      delDateFormat = false;
      var data = [];
      $("#ordersList")
        .find('tr[fromdraft]')
        .each(function() {
          data.push($(this)
            .data('obj'));
        });
      $('#ordersList')
        .html('');
      if (data != null && data != undefined && data.length > 0){
    	  globalData = data;
    	  addAriclesFromDraft(data, $('#ordersList'), (opt ? myOrderGrpDefault : allOrderGrpDefault));
      }
    });
  $('#md_groupByClear')
    .unbind('click');
  $('#md_groupByClear')
    .click(function() {
      clearAllErrors();
      $("#md_groupByOpen")
        .removeClass('hideBlock');
      $(this)
        .addClass('hideBlock');
      $('#articleSearchFormForCreate')
        .hide();
      $('#mo_groupByForm')
        .hide();
      $('#articleSearchDivForCreate')
        .hide();
      delDateFormat = false;
      var data = [];
      $("#ordersList")
        .find('tr[fromdraft]')
        .each(function() {
          data.push($(this)
            .data('obj'));
        });
      $('#ordersList')
        .html('');
      if (data != null && data != undefined && data.length > 0) formFilterContent(data, $('#ordersList'), 'fromdraft');
    });
  $('#myDrafts')
    .find('#searchAndAdd')
    .unbind('click');
  $('#myDrafts')
    .find('#searchAndAdd')
    .click(function() {
      clearAllErrors();
      if (validateBeforeSearch($('#myDrafts'))) {
        var formData = $('#myDrafts')
          .find('#articleSearchFormForCreate')
          .getJSON();
        var area = $('#myDrafts')
          .find('#ordersList');
        searchAricleForCreateOrders(formData, area);
      }
    });
  $('#myDrafts')
    .find('input[type="radio"]')
    .unbind('click');
  $('#myDrafts')
    .find('input[type="radio"]')
    .click(function() {
      clearAllErrors();
      $('.supplierSource')
        .find('span')
        .addClass('hideBlock');
      var linkItem = $(this)
        .attr('linkItem');
      $('#myDrafts')
        .find('#' + linkItem)
        .removeClass('hideBlock');
      $('#myDrafts')
        .find('#' + linkItem)
        .find('input,select')
        .focus();
    });
  $('#myDrafts')
    .find('#vendorText')
    .unbind('change');
  $('#myDrafts')
    .find('#vendorText')
    .on("change", function() {
      $('#isVerified')
        .val(false);
    });
  $('.userOption')
    .addClass('hideBlock');
  $('#myOrdersBtn')
    .on("click", function() {
    	allOrderGrpDefault = 'user';
      resetSearchFieldsInCreateOrders($("#myDrafts"));
      clearAllErrors();
      hideErrorInDraft();
      globalData = [];
      $('#md_addActionBtn')
        .removeClass('hideBlock');
      $("#md_filterClear")
        .trigger('click');
      $('#md_groupByClear')
        .trigger('click');
      $('.userOption')
        .addClass('hideBlock');
      $('#articleSearchFormForCreate')
        .show();
      $('#ordersList')
        .html('');
      $("#myDrafts")
        .find('#del')
        .prop('checked', true);
      var userId = $('#loginUserId')
        .val();
      loadDraft(userId, $('#ordersList'));
    });
  $('#allOrdersBtn')
    .click(function() {
      clearAllErrors();
      hideErrorInDraft();
      myOrderGrpDefault = 'deliveryDate';
      $('#md_addActionBtn')
        .addClass('hideBlock');
      $("#md_filterClear")
        .trigger('click');
      $('#md_groupByClear')
        .trigger('click');
      $('.userOption')
        .removeClass('hideBlock');
      $('#articleSearchFormForCreate')
        .hide();
      $('#ordersList')
        .html('');
      $("#myDrafts")
        .find('#user')
        .prop('checked', true);
      var userId = $('#loginUserId')
        .val();
      loadDraft("all", $('#ordersList'));
    });
  $('#myDrafts')
    .find('#verifySupplier1')
    .unbind('click');
  $('#myDrafts')
    .find('#verifySupplier1')
    .click(function() {
      clearAllErrors();
      hideErrorInDraft();
      var vendorNo = '';
      var vendorName = '';
      if ($(this)
        .attr('id') == 'verifySupplier1') {
        vendorNo += $('#vendorText')
          .val()
          .split("-")[0];
        /*
         * vendorName += $('#vendorText') .val().split("-")[1];
         */
      } else {
        $('#vendorText')
          .val();
      }
      if ($(this)
        .attr('id') == 'goButtonSample1') {
        vendorNo += $('#vendorDesc')
          .val()
          .split("-")[0];
        vendorName += $('#vendorDesc')
          .val()
          .split("-")[1];
      }
      if ($('#vendorText')
        .val() != '') {
        vendorTextBox = $('#vendorText');
    	isVendorChecked =$("#isVerified");
    	getVendorLookup(vendorNo,vendorTextBox,isVendorChecked);
        
      } else {
    	  var errors = [];
    	  errors.push(enter_supp_msg);
        showAllErrors(errors);
        showToolTipAndfocus($('#vendorText'), 'Please fill supplier field');
      }
    });
  $("#myDrafts")
    .find('[name="groupByOptions"]')
    .click(function() {
      var groupByOp = $(this)
        .val();
      hideErrorInDraft();
      clearAllErrors();
      // if(groupByOp=='userName') groupBy='created_user';
      // else if(groupByOp=='deptName') groupBy='department';
      // else if(groupByOp=='deliveryDate') groupBy='delivery_date';
      // else if(groupByOp=='supplier') groupBy='supplier';
      delDateFormat = false;
      if (globalData.length == 0) $("#ordersList")
        .find('tr[fromdraft]')
        .each(function() {
          globalData.push($(this)
            .data('obj'));
        });
      $('#ordersList')
        .html('');
      addAriclesFromDraft(globalData, $('#ordersList'), groupByOp);
    });
  $('#warehouse1')
    .click(function() {
      hideErrorInDraft();
      clearAllErrors();
      $("#warehouseField1")
        .removeClass('hideBlock');
      $("#vendorField1")
        .addClass('hideBlock');
      $("#allField1")
        .addClass('hideBlock');
      $('#vendorText')
        .val('');
    });
  $('#vendor1')
    .click(function() {
      hideErrorInDraft();
      clearAllErrors();
      $("#vendorField1")
        .removeClass('hideBlock');
      $("#warehouseField1")
        .addClass('hideBlock');
      $("#allField1")
        .addClass('hideBlock');
      $('#mo_wareHouseDropDown')
        .val('');
    });
  $('#all1')
    .click(function() {
      hideErrorInDraft();
      clearAllErrors();
      $("#allField1")
        .removeClass('hideBlock');
      $("#warehouseField1")
        .addClass('hideBlock');
      $("#vendorField1")
        .addClass('hideBlock');
      $('#mo_wareHouseDropDown')
        .val('');
      $('#vendorText')
        .val('');
    });
  $(".popupActions .actionBtn, .popupActions .secondaryActionBtn")
    .click(function() {
      clearAllErrors();
      $("#dialog-mulipleArticles")
        .dialog("close");
    });
  $('#curActTabF,#futActTabF')
    .val('0');
  $('#myOrdersBtn')
    .trigger('click');
  $("#delDate")
    .datepicker({
      zIndex: 50
    });
  $("#openOrders")
    .tabs();
  $('#mo_wareHouseDropDown').html($('#warehouseField #warehouseDrpdwn').html());
  
  //Order on receipt functions init() 
  if(!$('#orderOnReceipt-tab-link a').hasClass(loaded)){
	  	loadOrderOnReceiptContent();
	  	$('#orderOnReceipt-tab-link a').addClass(loaded);
  }
   
  $('#orderOnReceipt-tab-link a').click(function(e){
		var $orderOnReceiptLink =  $(this);
		if($orderOnReceiptLink.hasClass(loaded)){
			
		}else{
			loadOrderOnReceiptContent();
			$orderOnReceiptLink.addClass(loaded);
		}
	});
  
  $('input.inputDate.hasDatepicker').change(function()
		  {
	  $(this).val(formateDate($(this).val()));
		  });
  $('#fromDate,#toDate').datepicker('destroy').datepicker({
	    zIndex: 50
  });
  securityMatrix();// to handle create order on receipt tab
  if($("#on_rece_vendor").hasClass("hideBlock") && 
			$("#on_receipt_tab_store").hasClass("hideBlock")){
		$('#tableCreateAction').addClass('hideBlock');
		$('#orderOnReceipt-tab-link').addClass('hideBlock');
	}
}

function loadOrderOnReceiptContent(followUpObj){
	var $elem = $('#ordersReceipt');
	$.ajax({
	    type: "get",
	    url: 'getOrderOnReceiptContent.htm',
	    data: {},
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  appendOrderOnReceiptContent($elem,data);
		  securityMatrix();
	  }).fail(function(data) {
		  if(data.status == 404)
			  window.location.replace(homeLink);
		  $.fn.showCustomMsg([ngboSessErrCode],error);
		  stopLoading();
	  }).always(function() {
		  bindEventsForOrderOnReceipt();
		  if(followUpObj!=undefined && followUpObj!=''){
			  onLoadTrigger(followUpObj);
		  }else{
			stopLoading();
		  }
		  
	  });
}

function appendOrderOnReceiptContent($elem,data){
	$elem.addClass('hideBlock');
	$elem.html(data);
	if(!$elem.hasClass('.ui-tabs')){
		$elem.tabs();
	}
	$elem.removeClass('hideBlock');
	loadOrderOnReceiptJs();
}

function validateBeforeSearch(area) {
  hideErrorInDraft();
  var flag = true;
  var errors = [];
  if (area.find('#searchBox')
    .val()
    .trim() == '' && area.find('#all1')
    .is(':checked')) {
    errors.push('Please enter Article keyword to lookup');
    showToolTipAndfocus(area.find('#searchBox'), 'Please enter Article keyword to lookup');
    flag = false;
  }
  if (area.find('#searchBox')
    .val()
    .trim() != '' && area.find('#all1')
    .is(':checked')) {
    var searchText = area.find('#searchBox')
      .val()
      .trim();
    if (isNaN(searchText) && !(searchText.length > 2)) {
      errors.push('Please input a minimum of 3 characters.');
      showToolTipAndfocus(area.find('#searchBox'), 'Please input a minimum of 3 characters.');
      flag = false;
    }
  }
  if (area.find('[name="deliveryDate"]')
    .val() != '') {
    if (!isValidDate(area.find('[name="deliveryDate"]')
        .val())) {
      errors.push('Please enter valid Delivery date.');
      showToolTipAndfocus(area.find('[name="deliveryDate"]'), 'Please enter valid Delivery date.');
      flag = false;
    }
    if (isValidDate(area.find('[name="deliveryDate"]')
        .val())) {
      if (isPastDate(area.find('[name="deliveryDate"]')
          .val())) {
        errors.push('Delivery date should be in future.');
        showToolTipAndfocus(area.find('[name="deliveryDate"]'), 'Delivery date should be in future.');
        flag = false;
      }
    }
  }
  if (area.find('#warehouse1')
    .is(":checked")) {
    if (area.find('#mo_wareHouseDropDown')
      .val() == 0) {
      errors.push('Please select a warehouse from the dropdown');
      showToolTipAndfocus(area.find('#mo_wareHouseDropDown'), 'Please select a warehouse from the dropdown');
      flag = false;
    }
  }
  if (area.find('#vendor1')
    .is(":checked")) {
    if (area.find('#vendorText')
      .val()
      .trim() == '') {
      errors.push('Please specify a vendor');
      showToolTipAndfocus(area.find('#vendorText'), 'Please specify a vendor');
      flag = false;
    } else {
      if (area.find('#isVerified')
        .val() == 'false') {
        errors.push('Please click on "verify" before lookup the article');
        showToolTipAndfocus(area.find('#vendorText'), 'Please click on "verify" before lookup the article');
        flag = false;
      }
    }
  }
  if (!flag) {
    showAllErrors(errors);
  }
  return flag;
}

function searchAricleForCreateOrders(formData, area, nodeLevel, nodeId, srcInd, supplierNum) {
  hideErrorInDraft();
  var articleNoFlag = "";
  var descFlag = "";
  var gtinFlag = "";
  var srcOfSupplyInd='';
  var supplierNo='';
  var blockReason = '';
  var blockedArticle = '';
  if ($('#all1')
    .is(':checked')) {
    srcOfSupplyInd = "";
    supplierNo = "";
  } else if ($('#warehouse1')
    .is(':checked') && $('#mo_wareHouseDropDown')
    .val() != '0') {
    srcOfSupplyInd = "2";
    supplierNo = $('#mo_wareHouseDropDown')
      .val();;
  } else if ($('#vendor1')
    .is(':checked')) {
    srcOfSupplyInd = "1";
    supplierNo = $('#vendorText')
      .val()
      .split('-')[0];
  }
  formData.iv_article  = formData.iv_article.trim();
  if (isNaN((formData.iv_article)
      .split('-')[0])) descFlag = "Y";
  else if (!isNaN((formData.iv_article)
      .split('-')[0]) && (formData.iv_article)
    .split('-')[0].length <= 7) articleNoFlag = "Y";
  else if (!isNaN((formData.iv_article)
      .split('-')[0]) && (formData.iv_article)
    .split('-')[0].length > 7) gtinFlag = "Y";
  if (area != undefined) {
    if (area.find('#all1')
      .is(':checked')) {
      srcOfSupplyInd = "";
      supplierNo = "";
    } else if (area.find('#warehouse1')
      .is(':checked') && area.find('#mo_wareHouseDropDown')
      .val() != '0') {
      srcOfSupplyInd = "2";
      supplierNo = area.find('#mo_wareHouseDropDown')
        .val();;
    } else if (area.find('#vendor1')
      .is(':checked')) {
      srcOfSupplyInd = "1";
      supplierNo = area.find('#vendorText')
        .val()
        .split('-')[0];
    }
    if (isNaN((formData.iv_article)
        .split('-')[0])) descFlag = "Y";
    else if (!isNaN((formData.iv_article)
        .split('-')[0]) && (formData.iv_article)
      .split('-')[0].length <= 7) articleNoFlag = "Y";
    else if (!isNaN((formData.iv_article)
        .split('-')[0]) && (formData.iv_article)
      .split('-')[0].length > 7) gtinFlag = "Y";
  }
  if (nodeLevel == undefined && nodeId == undefined) {
    nodeLevel = "";
    nodeId = "";
  }
  var url = packBreakArticleSearchDraft;
  if(descFlag != "Y"){
  var param = {
    "iv_desc": descFlag,
    "iv_article_no": articleNoFlag,
    "iv_gtin": gtinFlag,
    "iv_article": (formData.iv_article)
      .split('-')[0],
    "iv_sales_org": $('#salesOrg')
      .val(),
    "iv_supplier": supplierNo,
    "iv_src_supply": srcOfSupplyInd,
    "iv_ranged": "Y",
    "iv_session_id": "",
    "iv_barcode": "",
    "iv_site": $('#posSite')
      .val(),
    "iv_node_id": nodeId,
    "iv_node_level": nodeLevel,
    "iv_barcode_flag": "",
    "iv_prime_vendor": "",
    "iv_uom_flag": "N",
    "iv_auto_stockr_flag": "",
    "iv_delisted_flag" : "N",
    "iv_deleted_flag" : "N"
  };
  console.log(url + ' ' + JSON.stringify(param));
  }else{
	  var param = {
			  "iv_article"	: (formData.iv_article)
			  .split('-')[0],
			  "iv_site"		: siteVal,
			  "iv_sales_org"	: $("#salesOrg").val(),
			  "iv_supplier"	: supplierNo,
			  "iv_src_supply"	: srcOfSupplyInd,
			  "iv_ranged"		: "Y",
			  "iv_session_id"	: "",
			  "iv_barcode"	: "",
			  "iv_node_level"	: nodeLevel,
			  "iv_node_id"	:  nodeId,
			  "iv_desc"		:descFlag,
			  "iv_article_no"	: articleNoFlag,
			  "iv_gtin"		: gtinFlag,
			  "iv_barcode_flag":"",
			  "iv_auto_stockr_flag":"",
			  "iv_style": "",
			  "iv_colour": "",
			  "iv_article_size": ""
	  };
  url = articleHeaderBasicUrl;
  console.log(url + ' ' + JSON.stringify(param));
  }
  $.ajax({
    type: "post",
    url: url,
    data: JSON.stringify(param),
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
    	formData.param=param;
    	if(descFlag){
    		if(response !="" && response !=undefined){
    		  showArticleSelectPopupNew(response, area, formData);
              resetSearchFieldsInCreateOrders(area);
    		}else {
    			$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
    			stopLoading();	
    		}
    	}
    	else if (checkResult(response,'article') ) {
    		//Defect_12197
    		if(response.length == 1 && (response[0].supplier||'').trim()==''){
    			$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);
    		}else{
    			addAriclesToOrderCreation(response, '', area, formData);
          		resetSearchFieldsInCreateOrders(area);
    		}
      }else if(($('#vendor1').is(':checked') || $('#warehouse1').is(':checked')) && (response == '' || response.length==0)){
			$.fn.showCustomMsg(["Article is not supplied by the selected vendor/warehouse, Please try different article."],error);
		}
      stopLoading();
    },
    error: function() {
      showAllErrors([mobiSerErrMsg], area);
      stopLoading();
      // stopLoading();// goToLogin();
    },
  });
}

function showBlockArticlePopup(msg,anotherMsg) {
  try {
	  if(msg != '')
		{ 
    $("#dialog-confirmation")
      .parent()
      .addClass("popupWrapper");
    $("#dialog-confirmation")
      .dialog("open");
    $("#dialog-confirmation")
      .find('#message')
      .html(msg);
    $("#dialog-confirmation")
      .parent()
      .find('.ui-dialog-title')
      .text('Information');
    $("#dialog-confirmation")
      .find('#ok')
      .removeClass('hideBlock');
    $("#dialog-confirmation")
      .find('#cancel')
      .addClass('hideBlock');
    $("#dialog-confirmation")
      .find('#ok')
      .unbind('click');
    $("#dialog-confirmation")
      .find('#ok')
      .click(function() {

  		if(anotherMsg == undefined || anotherMsg == '')
  		{
  		$("#dialog-confirmation").parent().removeClass("popupWrapper");
  		$("#dialog-confirmation").dialog("close");
  	}
  		else if(anotherMsg != '')
  			{
  			showBlockArticlePopup(anotherMsg,'');
  			}
      });
  }
	  else
		{
		if(anotherMsg != '')
		showInformation(anotherMsg,'');
		}
  } catch (err) {
    showDeletedArticlePopup(msg,anotherMsg);
  }
}


var triggerOrderOnReceipt =function(e){
	var $elem = e.data.msg;
	var saveObj = e.data.cache;
	console.log(saveObj);
	//formCreateOrderArticlData(saveObj.response, saveObj.obj, saveObj.area, saveObj.formData);
	$elem.dialog('close');
	$('#orderOnReceipt-tab-link a').trigger('click');	
	saveObj.obj.qty = saveObj.formData.orderQty||'0';
	//INC02229435 - Fix
	if($('#ordersReceipt')== ''){
		loadOrderOnReceiptContent(saveObj.obj);
	}else{
		  bindEventsForOrderOnReceipt();
		  if(saveObj.obj!=undefined && saveObj.obj!=''){
			  onLoadTrigger(saveObj.obj);
		  }else{
			stopLoading();
		  }
	}
};

var triggerCreateOrder =function(e){
	
	var $elem = e.data.msg;
	var saveObj = e.data.cache;
	console.log(saveObj);
	formCreateOrderArticlData(saveObj.response, saveObj.obj, saveObj.area, saveObj.formData); //Defect 9439
	$elem.dialog('close');
	//Commenting for Order Redesign Changes
	/*if(saveObj.obj.unscheduled_vendor_f != 'Y')
	$.fn.warnPopup('warn','You have selected today\'s date as delivery. Do you want to submit an Emergency Order?','Create Order',triggerOrderEmergency,triggerOrderNotEmergency,'',{obj: saveObj.obj,area:saveObj.area,formData:saveObj.formData,response:saveObj.response},'');*/
};

var triggerOrderEmergency =function(e){
	var $elem = e.data.msg;
	var saveObj = e.data.cache;
	console.log(saveObj);
	//formCreateOrderArticlData(saveObj.response, saveObj.obj, saveObj.area, saveObj.formData);
	saveObj.obj.next_delivery_date = formatDateMobi(getDesiredFutureDate(1));
	formCreateOrderArticlData(saveObj.response, saveObj.obj, saveObj.area, saveObj.formData);
	$elem.dialog('close');
};

var triggerOrderNotEmergency =function(e){
	var $elem = e.data.msg;
	var saveObj = e.data.cache;
	console.log(saveObj);
	saveObj.obj.delivery_date =formatDateMobi(saveObj.obj.next_delivery_date);
	formCreateOrderArticlData(saveObj.response, saveObj.obj, saveObj.area, saveObj.formData);
	$elem.dialog('close');
};


function addAriclesToOrderCreation(response, obj, area, formData) {	
	var errorMsg = [];
	if(response.length == 1)
	{
		errorMsg = validateArticleforOrder(response, true, formData);
		if(errorMsg != undefined && errorMsg != '')
		{
    	//showBlockArticlePopup(errorMsg,'');
		showAllErrors(errorMsg);
    	return false;
		}      
	}
	
  if ((response.length == 1 && (response[0].article != undefined || response[0].article_no != undefined)) 
		  || (obj != '' && response == '' && (obj.article != undefined || obj.article_no != undefined))) {
    if (response.length == 1 && response != '') obj = response[0];
    if (formData.deliveryDate != undefined && formData.deliveryDate != '') {
	    if (obj.delivery_date != null && obj.delivery_date != undefined && obj.delivery_date != "") 
	    	obj.next_delivery_date = obj.delivery_date;
	    obj.delivery_date = formData.deliveryDate;
	}
    else if((obj.greenlife_flag=='Y')
    		&&(formData.deliveryDate != null && formData.deliveryDate != undefined && formData.deliveryDate != '')) {
    	if (obj.delivery_date != null && obj.delivery_date != undefined && obj.delivery_date != "") 
	    	obj.next_delivery_date = obj.delivery_date;
		var glDelDate = new Date();
		var numberOfDaysToAdd = Number(obj.lead_time);
		glDelDate.setDate(glDelDate.getDate() + numberOfDaysToAdd);
		console.log(convertDateToString(glDelDate)+", "+obj.delivery_date);
    	obj.delivery_date = convertDateToString(glDelDate);
    }
    else if (obj.delivery_date != '' && obj.delivery_date != null && obj.delivery_date != undefined) {
	      obj.delivery_date = (obj.delivery_date)
	        .replace(/-/g, '/');
	      obj.next_delivery_date = obj.delivery_date;
	      obj.delivery_date = formatDateMobi(obj.delivery_date);
	      obj.delivery_date = obj.delivery_date.replace(/\s/g, '');
	}
    if ((formData.deliveryDate != null && formData.deliveryDate != undefined && formData.deliveryDate != '' &&
    		/*obj.delivery_date*/formData.deliveryDate == getCurentDateTxt()) && ((obj.source != undefined && obj.source != null && obj.source == '1')
			|| (obj.source_of_supply != undefined && obj.source_of_supply != null && obj.source_of_supply == '1'))) {
    	if($('#orderOnReceipt-tab-link').is(':visible')){
    		$.fn.warnPopup('warn','Do you wish to use "Create Order on Receipt" function?','Create Order',triggerOrderOnReceipt,triggerCreateOrder,'',{obj: obj,area:area,formData:formData,response:response},'');
    	}
    	//Commenting for Order Redesign changes
    	/*else{    	    	
		if(obj.unscheduled_vendor_f != 'Y')
    		$.fn.warnPopup('warn','You have selected today\'s date as delivery. Do you want to submit an Emergency Order?','Create Order',triggerOrderEmergency,triggerOrderNotEmergency,'',{obj: obj,area:area,formData:formData,response:response},'');
    	}*/
    }
    //Commenting for Order Redesign changes
    /*else if (obj.delivery_date == getCurentDateTxt() && ((obj.source != undefined && obj.source != null && obj.source == '2')//defect no 5590
			|| (obj.source_of_supply != undefined && obj.source_of_supply != null && obj.source_of_supply == '2')))
    	{
    	$.fn.warnPopup('alert','You must obtain approval from the warehouse and National Order Room prior to submitting this order.','Create Order','','',triggerRushOrderOk,'');
    	}
    	*/
    else{
    	formCreateOrderArticlData(response, obj, area, formData);
    }
  } else if (response.length > 1) {
    showArticleSelectPopup(response, area, formData);
  }
}

var triggerRushOrderOk = function(e){
	e.data.dialog.dialog('close');	
};

function formCreateOrderArticlData(response, obj, area, formData){
	if (response == '' && obj != '') {
	      response = [];
	      response.push(obj);
	    }
	    if (area.html() == '') {
	      if (formData.tmpFlag != undefined) {
	        area.html(getOrdersHeaderContent($('#loginUserId')
	          .val()),obj);
	        area.find('tfoot')
	          .remove();
	      }
	      bindEventForHeader(area);
	    }
	    var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	    var supplierNo = obj.supplier == undefined ? (obj.supplier_no) : (obj.supplier);
	    if (obj.article_uom == null) obj.article_uom = "";
	    var id = articleNo + '_' + supplierNo;
	    var tmpqty = removeExistingRow(response, area);
	    /*if (formData.deliveryDate != undefined && formData.deliveryDate != '') {
	      if (obj.delivery_date != null && obj.delivery_date != undefined && obj.delivery_date != "") obj.next_delivery_date = obj.delivery_date;
	      obj.delivery_date = formData.deliveryDate;
	    } else if (obj.delivery_date != '' && obj.delivery_date != null && obj.delivery_date != undefined) {
	      obj.delivery_date = (obj.delivery_date)
	        .replace(/-/g, '/');
	      obj.next_delivery_date = obj.delivery_date;
	      obj.delivery_date = formatDateMobi(obj.delivery_date);
	      obj.delivery_date = obj.delivery_date.replace(/\s/g, '');
	    }*/
	    //else{
	    if ((obj.delivery_date == '' || obj.delivery_date == null) 
	    		&& ((obj.source != undefined && obj.source != null && obj.source == '1')
	    				|| (obj.source_of_supply != undefined && obj.source_of_supply != null && obj.source_of_supply == '1')) ) {
	    	obj.delivery_date=getDesiredFutureDate(1);
	    	if(obj.next_delivery_date == null || obj.next_delivery_date == undefined){
	    		obj.next_delivery_date= formatDateMobi(getDesiredFutureDate(1));
	    	}	
	    	obj.roster_date=formatDateToMDY(getDesiredFutureDate(0));
	      }
	    if (formData != undefined && formData.orderQty != undefined) {
	      obj.qty = Number(formData.orderQty) + Number(tmpqty||'');
	    }
	    var rowContent = getOrdersAsHTML(obj);
	    area.find('.ordersTable')
	      .treetable('destroy');
	    area.find('.ordersTable')
	      .find('.expandTd')
	      .html('<span class="indenter">&nbsp;</span>');
	    var isExists = false;
	    var isDelDateEmpty = false;
	    var inAllTab = false;
	    if (obj.delivery_date == '' || obj.delivery_date == null) {
	      isDelDateEmpty = true;
	    }
	    var groupBy = '';;
	    area.find('#datatable tr.rowHighlight')
	      .each(function() {
	        if (!isExists) {
	          if ($(this)
	            .find('td.groupedBy')
	            .text()
	            .split(':')[0].trim() == 'Delivery By') {
	        	  var ttttt =  $(this)
	              .find('td.groupedBy')
	              .text()
	              .split(':')[1].trim();
	        	  var deliverydt = ttttt.substring(0, 10);
	        	  //console.log("obj.article :: "+obj.article+", date :: "+obj.delivery_date+", dfsgd :: "+ttttt);
	            if (obj.delivery_date ==deliverydt) {
	              if($(this).hasClass("greenLifeCls") && (obj.greenlife_flag=="Y")) {
		              isExists = true;
	              }
	              else if(!$(this).hasClass("greenLifeCls") && (obj.greenlife_flag==undefined || obj.greenlife_flag==null || obj.greenlife_flag=="N")) {
		              isExists = true;
	              }
	              groupBy = 'deliveryDate';
	            } else if (isDelDateEmpty) {
	              obj.is_empty = 'default';
	              groupBy = 'empty';
	              if ($('#ordersList')
	                .find('tr[data-tt-id="default"]')
	                .length == 1) isExists = true;
	            }
	          } else if ($(this)
	            .find('td.groupedBy')
	            .text()
	            .split(':')[0].trim() == 'Created By') {
	            obj.created_user = (obj.created_user == undefined || obj.created_user == null) ? $('#loginUserId')
	              .val() : obj.created_user;
	            if (obj.created_user == $(this)
	              .find('td.groupedBy')
	              .text()
	              .split(':')[1].trim()) {
	              if($(this).hasClass("greenLifeCls") && ((obj.greenlife_flag=="Y"))) {
		              isExists = true;
	              }
	              else if(!$(this).hasClass("greenLifeCls") && (obj.greenlife_flag=="N")) {
		              isExists = true;
	            }
	              groupBy = 'user';
	            }
	          } else if ($(this)
	            .find('td.groupedBy')
	            .text()
	            .split(':')[0].trim() == 'Department') {
	            if (obj.dept_dtls == $(this)
	              .find('td.groupedBy')
	              .text()
	              .split(':')[1].trim()) {
	              if($(this).hasClass("greenLifeCls") && ((obj.greenlife_flag!=undefined && obj.greenlife_flag!=null && obj.greenlife_flag=="Y"))) {
		              isExists = true;
	              }
	              else if(!$(this).hasClass("greenLifeCls") && (obj.greenlife_flag==undefined || obj.greenlife_flag==null || obj.greenlife_flag=="N")) {
		              isExists = true;
		              }
	              groupBy = 'department';
	            }
	          } else if ($(this)
	            .find('td.groupedBy')
	            .text()
	            .split(':')[0].trim() == 'Supplier') {
	            if ((obj.supplier == undefined ? obj.supplier_no : obj.supplier) == $(this)
	              .find('td.groupedBy')
	              .text()
	              .split(':')[1].trim()) {
	              if($(this).hasClass("greenLifeCls") && ((obj.greenlife_flag!=undefined && obj.greenlife_flag!=null && obj.greenlife_flag=="Y"))) {
		              isExists = true;
	              }
	              else if(!$(this).hasClass("greenLifeCls") && (obj.greenlife_flag==undefined || obj.greenlife_flag==null || obj.greenlife_flag=="N")) {
		              isExists = true;
		              }
	              groupBy = 'supplier';
	            }
	          } else if (area.find('#ordersList')
	            .find('tr[data-tt-id="default"]')
	            .length == 1 || area.find('tr[data-tt-id="default"]')
	            .length == 1) {
	            if (isDelDateEmpty) {
	              obj.is_empty = 'default';
	              if($(this).hasClass("greenLifeCls") && ((obj.greenlife_flag=="Y"))) {
		              isExists = true;
	              }
	              else if(!$(this).hasClass("greenLifeCls") && (obj.greenlife_flag==undefined || obj.greenlife_flag==null || obj.greenlife_flag=="N")) {
		              isExists = true;
	            	  }
	              groupBy = 'empty';
	            } else {
	              groupBy = 'deliveryDate';
	            }
	          }
	        }
	      });
	    if (!isExists) {
	      if (formData.tmpFlag != undefined) {
	        area.find('.ordersTable .tbody')
	          .append(rowContent);
	      } else {
	        if ($('#myOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active') && $('#ordersList')
	          .find('.rowHighlight:first')
	          .find('td.groupedBy')
	          .text()
	          .split(':')[0].trim() == 'Delivery By') {
	          if (!isDelDateEmpty) groupBy = 'deliveryDate';
	          else groupBy = 'empty';
	        } else if ($('#myOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active') && $('#ordersList')
	          .find('.rowHighlight:first')
	          .find('td.groupedBy')
	          .text()
	          .split(':')[0].trim() == 'Department') groupBy = 'department';
	        else if ($('#myOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active') && $('#ordersList')
	          .find('.rowHighlight:first')
	          .find('td.groupedBy')
	          .text()
	          .split(':')[0].trim() == 'Supplier') groupBy = 'supplier';
	        else if ($('#allOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active') && !$('#md_groupByClear')
	          .hasClass('hideBlock')) {
	          inAllTab = true;
	          area.find('.ordersTable .tbody')
	            .append(rowContent);
	        } else if ($('#md_groupByClear')
	          .hasClass('hideBlock') && $('#allOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active')) {
	          inAllTab = false;
	          groupBy = 'user';
	        } else if ($('#myOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active') && $('#ordersList')
	          .find('.rowHighlight:first')
	          .length == 0) {
	          if (!isDelDateEmpty) groupBy = 'deliveryDate';
	          else {
	            obj.is_empty = 'default';
	            groupBy = 'empty';
	          }
	        }
	        if (!inAllTab) addAriclesFromSearch(response, area, groupBy);
	      }
	    } else {
	      if (groupBy == 'deliveryDate') {
	    	  
	        var delDate = obj.delivery_date;
	        var newId = ((obj.greenlife_flag=="Y")) ? "gl"+delDate.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '' ): delDate.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '' );
	        area.find('#datatable_' + newId + ' .tbody')
	          .append(rowContent);
	        formTotalCatonValue(area.find('#datatable_' + newId));
	      } else if (groupBy == 'user') {
	        area.find('#datatable_' + obj.created_user + ' .tbody')
	          .append(rowContent);
	      } else if (groupBy == 'department') {
	        var newDept = obj.dept_dtls || (obj.dept_no_name||'');
	        var newId = newDept.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
	        area.find('#datatable_' + newId + ' .tbody')
	          .append(rowContent);
	        formTotalCatonValue(area.find('#datatable_' + newId));
	      } else if (groupBy == 'supplier') {
	        var supplierNo = obj.supplier == undefined ? (obj.supplier_no) : (obj.supplier);
	        area.find('#datatable_' + supplierNo + ' .tbody')
	          .append(rowContent);
	        formTotalCatonValue(area.find('#datatable_' + supplierNo));
	      } else if (groupBy == 'empty') {
	        area.find('#datatable_default .tbody')
	          .append(rowContent);
	        formTotalCatonValue(area.find('#datatable_default'));
	      }
	    }
	    if (formData != undefined && formData.newSearch != undefined) obj.newSearch = true;
	    if (formData != undefined && formData.newSearch != undefined) formTotalCatonValue(area.find('.ordersTable'));
	    area.find('.ordersTable .tbody')
	      .find('[data-tt-id="' + id + '"]')
	      .data("obj", obj);
	    area.find('.ordersTable')
	      .treetable({
	        expandable: true
	      });
	    /*if(Number(tmpqty||'') > 0 && Number(obj.qty)>0){
	    	obj.qty = Number(obj.qty) - Number(tmpqty||'');
	    }*/// commentted as the sum qty should be sent to draft
	    var tempArea = area.find('.ordersTable .tbody')
	      .find('[data-tt-id="' + id + '"]').closest('table');
	    bindEventForOrders(obj, tempArea, 'fromSearch');
	    addToDraft(response, area);
	    resetSearchFieldsInCreateOrders(area);
	    bindAccordionClickEvent();
	    if($('#create-tab').tabs('option').active == 1 && $('#ordersList tbody tr').length == 0){
	    	$('#allOrdersBtn').trigger('click');
	    }
	  //}
}
function addAriclesToGroupTD(response, area, key, dataBind, groupBy, from) {
  if (dataBind == undefined) dataBind = 'fromdraft';
  var obj  = response[0];
  if (area.html() == '') {
    var searchHeader = '';
    if ($('#allOrdersBtn')
      .parent()
      .hasClass('ui-state-active', 'ui-tabs-active')) {
			      searchHeader = '<div id="ordersList"><div class="tableActionsBtnsWrapper"><div class="lookupActionWrapper newLookupActionWrapper">&nbsp; &nbsp;<div class="errorDiv draftErrorDivGrp hideBlock">'
					+ '<label id="draftErrorMsgGrp">No article found for <strong>3234</strong>.Please try a different number.</label>'
					+ ' <label class="closeMessage" >&nbsp;</label></div></div></div>'
					+ ' <div class="tableActionsWrapper" id="articleSearchDivForCreate" ><form method="POST" action="" class="articleForm"'
					+ ' data-map="obj"id="articleSearchFormForCreate" data-groupBy="'
					+ groupBy
					+ '" data-groupBy-value="'
					+ key
					+ '">'
					+ ' <div class="formWrapper"><div class="parameter"><label class="" for="searchBox">Article</label> <input data-item="iv_article" name="iv_article"'
					+ ' type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="searchBox">'
					+ ' <input type="hidden" data-item="iv_site" name="iv_site" /><input type="hidden" data-item="iv_ranged" name="iv_ranged" value="Y"/></div>'
					+ '<div class="parameter"><label class="" for="qty" >Order Qty.</label> <input type="#" data-item="orderQty" name="oredrQty"'
					+ ' tabindex="2" id="qty" class="textbox  numberBox"></div>'
					+ '<div class="parameter"><label class="" for="">Delivery Date</label> <input data-item="deliveryDate" name="deliveryDate"'
					+ ' type="#" class="textbox textboxDefaultText inputDate" placeholder="dd/mm/yyyy" maxlength="10" id=""></div>'
					+ '<div class="parameter"><label for="sourceOfSupply" class="">Source of Supply</label><input type="radio" name="iv_src_supply" value="" id="all1"'
					+ 'checked tabindex="3" linkItem="allField1"><label for="all" class="labelText">All</label> <input type="radio" '
					+ 'name="iv_src_supply" value="warehouse" id="warehouse1" linkItem="warehouseField1" tabindex="4"><label for="warehouse" class="labelText">Warehouse</label>'
					+ '<input type="radio" name="iv_src_supply" value="vendor" linkItem="vendorField1" id="vendor1" tabindex="5"><label for="vendor" class="labelText">Direct Vendor</label>'
					+ '<div class="parameter supplierSource"><span id="allField1" class="options"> <label>Both warehouse and direct vendor</label>'
					+ '</span> <span id="vendorField1" class="hideBlock"> <input type="#" class="textbox mediumbox" name="wareHouse" id="vendorText"'
					+ ' placeholder="Type number or name "> <label class="linkBtn" id="verifySupplier1"><label class="advancedSearch">Verify <input type="hidden" id="isVerified" value="false" /></label></label>'
					+ '</span> <span id="warehouseField1" class="hideBlock"> <select class="selectOptions supplyDrop" name="directVendor" id="mo_wareHouseDropDown" >'
					+ '</select></span></div><!-- End of parameter --></div><!-- End of parameter -->'
					+ '<div class="formActions"><label class="actionBtn" id="searchAndAdd"><a >Search & Add</a></label><!-- <label class="secondaryActionBtn closeLink" id="closeLink"><a >Close</a></label>--></div><!-- End of form actions -->'
					+ '</div><!-- End of content table wrapper --></form></div><input type="hidden" id="nodeLevel"/><input type="hidden" id="nodeId" />'
					+ '<input type="hidden" id="srcIndicator" />';
    }
    area.html(searchHeader + getOrdersHeaderContent(key,obj) + (searchHeader != '' ? '</div>' : ''));
    if ($('#allOrdersBtn')
      .parent()
      .hasClass('ui-state-active', 'ui-tabs-active')) {
      // $(".ordersTable ").css("padding-top", "10px");
     /* $(".tableActionsWrapper")
        .css("padding-bottom", "20px");
      $(".newLookupActionWrapper")
        .css({
          "width": "1264px",
          "height": "15px"
        });*/
    }
    bindEventForHeader(area);
    bindEventsForOpenOrders(area);
    bindDisableFields(area);
  }
  var articleNo = '';
  var supplierNo = '';
  for (var i in response) {
    articleNo = response[i].article == undefined ? response[i].article_no : response[i].article;
    supplierNo = response[i].supplier == undefined ? (response[i].supplier_no) : (response[i].supplier);
    /*
     * source = response[i].source_of_supply != undefined ?
     * response[i].source_of_supply :'';
     */
    
    if(response[i].source_of_supply != undefined &&  response[i].source_of_supply != null && response[i].source_of_supply == '1'){
    	if(response[i].next_delivery_date == null || response[i].next_delivery_date == undefined){
    		response[i].next_delivery_date = formatDateToMDY(getDesiredFutureDate(1));
    	}
    }
    if (response[i].article_uom == null) response[i].article_uom = "";
    if (response[i].qty == null || response[i].qty == '') response[i].qty = "0";
    var id = articleNo + '_' + supplierNo;
    var rowContent = getOrdersAsHTML(response[i], dataBind);
    $('.ordersTable')
      .treetable('destroy');
    $('.ordersTable')
      .find('.expandTd')
      .html('<span class="indenter">&nbsp;</span>');
    area.find('.ordersTable .tbody')
      .append(rowContent);area.find('table').addClass('margin-top0');
    area.find('.ordersTable .tbody')
      .find('[data-tt-id="' + id + '"]')
      .data('obj', response[i]);
    $('.ordersTable')
      .treetable({
        expandable: true
      });
    bindEventForOrders(response[i], area, from);
  }
}

var onLoadTrigger = function(obj) {
	console.log(obj);
    $search = $('#oor_articlesearchBox');
	$search.val(obj.article);
	lockSupplierUsingArticle({"iv_article" : obj.article,"qty":obj.qty});
	resetSearchArea();
};

function addAriclesFromDraft(response, area, groupBy,onPageLoad) {
	if(opt){
		myOrderGrpDefault = groupBy;
	}else{
		allOrderGrpDefault = groupBy;	
	}
  
  if (response[0].article != undefined || response[0].article_no != undefined) {
    var emptyDelDateList = [];
    var emptyDelDateGreenArticlesList = [];
    if (groupBy == 'deliveryDate') {
      for (var i = 0; i < response.length; i++) {
        if (response[i].delivery_date == null || response[i].delivery_date == '' || response[i].delivery_date == 'undefined//undefined') {
          response[i].delivery_date = '';
          if(response[i].greenlife_flag!="Y")
          emptyDelDateList.push(response[i]);
          else if(response[i].greenlife_flag=="Y")
        	  emptyDelDateGreenArticlesList.push(response[i]);
        }
      }
    }
    if (emptyDelDateList.length > 0) {
      addArticleFromDraftWithEmptyDate(emptyDelDateList, area, groupBy);
      response = response.filter(function(el) {
        return emptyDelDateList.indexOf(el) < 0;
      });
    }
    if (emptyDelDateGreenArticlesList.length > 0) {
        addArticleFromDraftWithEmptyDate(emptyDelDateGreenArticlesList, area, groupBy,'emptyGreen');
        response = response.filter(function(el) {
          return emptyDelDateGreenArticlesList.indexOf(el) < 0;
        });
      }
    var myDraftGrp = 	$groupBy(response, function(obj) {
      if (groupBy == 'deliveryDate') {
        if (delDateFormat) obj.delivery_date = formatDateMobi(obj.delivery_date);
        obj.new_del_date = obj.delivery_date.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '')
          .replace(/' '/g, '');
        if((obj.greenlife_flag=="Y")) {
        	return "gl"+obj.new_del_date;
        }
        else{
        return obj.new_del_date;
        }
      } else if (groupBy == 'user') {
        if (delDateFormat) obj.delivery_date = formatDateMobi(obj.delivery_date);
        if((obj.greenlife_flag=="Y")) {
        	return "gl"+obj.created_user;
        }
        else{
        return obj.created_user;
        }
      } else if (groupBy == 'department') {
        if (delDateFormat) obj.delivery_date = formatDateMobi(obj.delivery_date);
        obj.dept_dtls = (obj.dept_dtls != null && obj.dept_dtls != undefined) ? obj.dept_dtls : (obj.dept_no_name||'');
        obj.new_dept = obj.dept_dtls.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
        if((obj.greenlife_flag=="Y")) {
        	return "gl"+obj.new_dept;
        }
        else{
        return obj.new_dept;
        }
      } else if (groupBy == 'supplier') {
        if (delDateFormat) obj.delivery_date = formatDateMobi(obj.delivery_date);
        if(obj.greenlife_flag=="Y"){
        	return "gl"+obj.supplier == undefined ? obj.supplier_no : obj.supplier;
        }
        else{
        return obj.supplier == undefined ? obj.supplier_no : obj.supplier;
        }
      }
    });
    if (area.html() == '') {
      area.html(groupHeader);
      bindEventForGroupHeader(area);
    }
    for (var key in myDraftGrp) {
      if (key != '' && key != null && key != undefined) {
        keyList = myDraftGrp[key];
        var id = 'groupBy_' + key;
        var list = myDraftGrp[key];
        var grpContent = getGroupByContent(key, groupBy, list[0]);
        area.find('.groupedTable')
          .treetable('destroy');
        area.find('.groupedTable')
          .find('.expandTd')
          .html('<span class="indenter">&nbsp;</span>');
        area.find('.groupedTable .grpTbody')
          .append(grpContent);
        addAriclesToGroupTD(keyList, area.find('.groupedTable')
          .find('#' + id), key, 'fromDraft', groupBy);
        area.find('.groupedTable')
          .treetable({
            expandable: true
          });
        var reqTableId = 'datatable_' + key;
        tempSort(reqTableId);
      }
    }
    
    
    bindEventForGroupHeader();
    bindAccordionClickEvent();
    if(onPageLoad != undefined && onPageLoad)
    	{
    	var deliveryDateCount=0;
    	var articlesCount=0;
    	var pastDeliveryDateList=[];
    	for(var i=0;i<response.length;i++)
    		{
    		if(isPastDate(response[i].delivery_date))
    			{
    			pastDeliveryDateList.push(response[i]);
    			}
    		}
    	
    	var newArrayList= $groupBy(pastDeliveryDateList, function(obj) {
    		return obj.delivery_date;
    	});

    	var articleContent=[];
    	
    	for(var key in newArrayList)
    		{
    		var list = newArrayList[key];
    		for(var i=0;i<list.length;i++)
    			{
    			var articleNo=list[i].article == undefined ? list[i].article_no : list[i].article;;
    			var articleDesc=(list[i].article_desc || '');
    			var msg=list[i].delivery_date+' for Article '+articleNo+' - '+articleDesc;
    			articleContent.push(msg);
    			articlesCount++;
    			}
    		deliveryDateCount++;
    		}
    	articleContent.unshift('<b>Total '+deliveryDateCount+' delivery '+(deliveryDateCount == 1 ? 'date' : 'dates')+' for '+articlesCount+(articlesCount == 1 ? ' article' : ' articles')+' needs to be changed</b>');
    	if(deliveryDateCount > 0)
    	$.fn.showCustomMsg(articleContent,information,'Delivery Dates are not valid');
    	
    	}
  }
}

function getGroupByContent(key, groupBy, obj) {
  var msg = '';
  var msg1='Greenlife articles';
  if (groupBy == 'deliveryDate') msg = 'Delivery By: ' + ((obj.delivery_date != undefined && obj.delivery_date != '/undefined/undefined') ? obj.delivery_date.replace(/\s/g, '') : obj.delivery_date.replace(/\s/g, ''));
  else if (groupBy == 'user') msg = 'Created By: ' + (obj.created_user_name || '');
  else if (groupBy == 'department') msg = 'Department: ' + (obj.dept_dtls != undefined ? obj.dept_dtls : obj.dept_no_name);
  else if (groupBy == 'supplier') msg = 'Supplier: ' +  ((obj.supplier_name || '') + ' ('+ (obj.supplier||obj.supplier_no)+')');
  else if(groupBy == 'glempty') msg= '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  var content;
  if((obj.greenlife_flag=="Y")) {
  content = '<tr data-tt-id="' + key + '" class="rowHighlight groupByExpand1 greenLifeCls"><td width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter">&nbsp;</span></td><td class="groupedBy rowSection rowHighlight" colspan="9"><strong>' + msg + '</strong><label class="grnLifeLabel"><strong>' + msg1 + '</strong></label><span class="grnLifeSpan"> </span></td></tr>' + '<tr data-tt-id="' + key + '_sub" data-tt-parent-id="' + key + '"><td colspan="10" class="padright8" id="groupBy_' + key + '"></td></tr>';
  }
  else {
  content = '<tr data-tt-id="' + key + '" class="rowHighlight groupByExpand1"><td width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter">&nbsp;</span></td><td class="groupedBy rowSection rowHighlight" colspan="9"><strong>' + msg + '</strong></td></tr>' + '<tr data-tt-id="' + key + '_sub" data-tt-parent-id="' + key + '"><td colspan="10" class="padright8" id="groupBy_' + key + '"></td></tr>';
  }
  return content;
}

function getOrdersAsHTML(obj, dataBind,greenLifeArticleExists) {
	//obj.alternate_vendor_flag = 'V';
	if(obj.alternate_vendor_flag == 'V'){
		obj.om = '1';
		obj.order_uom = obj.base_uom;
	}
	if (dataBind == undefined) dataBind = 'fromdraft';
  content = '';
  var articleNo = obj.article == undefined ? obj.article_no : obj.article;
  if( articleNo != undefined && articleNo != ""){
  var supplierNo = obj.supplier == undefined ? (obj.supplier_no) : (obj.supplier);
  var stdPrice = obj.standard_sell_price == undefined ? obj.standard_price : obj.standard_sell_price;
  if(stdPrice != undefined && stdPrice != ''){
	  stdPrice = Number(stdPrice).toFixed(2);
  }
  if (obj.article_uom == null) obj.article_uom = "";
  var id = articleNo + '_' + supplierNo;
  /*if(obj.random_wt_flag == 'Y' || obj.weighted_flag == 'Y'){//display in decimals
	  obj.soo = formatTo2DecimalPlaces(obj.soo);  
	  obj.sit = formatTo2DecimalPlaces(obj.sit);  
  }else{//display in whole numbers
	  obj.soo = convertToWholeNumber(obj.soo);  
	  obj.sit = convertToWholeNumber(obj.sit);
  }*/
  var sooContent = (obj.soo == undefined || obj.soo == '' || obj.soo == 0) ? (obj.soo !=null ? obj.soo : 0):('<label class="linkBtn" onclick="showSOO('+(articleNo||'')+')"><a '+ ((obj.soo||'' !='') ? 'class="newWindowAfter"' : '')+'>'+(obj.soo == undefined || obj.soo == '' ? '0':obj.soo)+'</a></label>');
  obj.qty = (obj.qty != undefined && obj.qty != null && !isNaN(obj.qty)) ? obj.qty : 0;
  if((obj.greenlife_flag=="Y"))
	  {
		  content += '<tr mainRow supplier="'
				+ supplierNo
				+ '-'
				+ (obj.supplier_name || '')
				+ '" data-tt-id="'
				+ id
				+ '" class="" '
				+ dataBind
				+ '>'
				+ '<td class="expandTd expander  "><span class="indenter ">&nbsp;</span></td>'
				+ '<td class="articleNo" >'
				+ articleNo
				+ '</td>'
				+ '<td class="article_desc" style="max-width:195px">'
				+ obj.article_desc
				+ '</td>'
				+ '<td class="centerValue soh">'
				+ (obj.soh == null ? '' : deciValues(obj.random_wgt_flg,
						obj.weighted_flag, (obj.linked_article_flag || 'N'),
						(obj.pack_break_down_flag || 'N'), obj.soh, obj.pi_soh,
						obj.article_type, obj.base_uom, false, undefined,
						obj.pi_uom))
				+ '</td>'
				+ '<td  class="centerValue  onEditOnly"><label  class="paddingRight10" ><input type="#" value="'
				+ obj.qty
				+ '" data-om="'
				+ obj.om
				+ '" '
				+ '	class="editNumCell textbox textboxDefaultText orderQty"></label><label class="uom-col">'
				+ (obj.order_uom != null ? obj.order_uom : '')
				+ '<label></td>'
				+ '<td  class="centerValue  onEditOnly"><label  class="paddingRight10" ><input type="#" value="'
				+ Number(obj.cost_price).toFixed(2) //cost price
				+ '" '
				+ '	class="editNumCell textbox textboxDefaultText  costPrice"><input type="hidden" class="maxCostPrice" value="'+obj.greenlife_max_cost+'"></td>'
				+ '<td  class="centerValue qty onViewOnly hideBlock">'
				+ obj.qty
				+ '</td>'
				+ '<td  class="centerValue cost_price onViewOnly hideBlock">'
				+ obj.cost_price
				+ '</td>'
				+ '<td class="centerValue om">'
				 //17.06 ZEA/ZKG OM Value changes  
				+ (obj.om == null || obj.om == undefined ? '' : ((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0)))
				+ ' '
				+ (obj.base_uom != null ? obj.base_uom : '')
				+ '</td>'
				+ '<td class="centerValue total_qty"><strong><b class="totalUnit">'
				+ formatDeciOrWhole(Number(obj.om) * Number(obj.qty))
				+ '</b> '
				+ (obj.base_uom != null ? obj.base_uom : '')
				+ '</strong></td>'
				+ '<td  class="centerValue  onEditOnly"><input type="#" value="'
				+ ((obj.delivery_date != null && obj.delivery_date != undefined
						&& obj.delivery_date != '/undefined/undefined' && obj.delivery_date != 'undefined//undefined') ? obj.delivery_date
						.replace(/\s/g, '')
						: '')
				+ '"'
				+ '	class="textbox textboxDefaultText  inputDate delivery_date_valid editDateCell"'
				+ '	placeholder="dd/mm/yyyy" id="dp'
				+ id
				+ '"></td>'
				+ '<td  class="centerValue delivery_date deliveryDate onViewOnly hideBlock">'
				+ obj.delivery_date
				+ '</td>'
				+ '<td id ="validationStatus" class="validationStatusDraft centerValue onViewOnly">' + "Draft" + '</td>'+ '<td id ="purchaseGroup" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="roasterName" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="maxOrderQnty" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="preqReqId" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="resetValidate" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="supplierFromRC" class="centerValue onViewOnly hideBlock"></td>'
				+ '<td class="padright0 lastColumn centerValue onEditOnly"><label class="linkBtn">'
				+ '		<a ><label class="deleteRecord" id="' + id
				+ '">&nbsp;</label></a>' + '</label></td>' + '</tr>';
		  content += '<tr data-tt-id="' + id + '.1" data-tt-parent-id="' + id + '" class="expandsubrow collapsed "> <td colspan="10"  class="allTimeExpand "> <table cellspacing="0" class="ContentTable allTimeExpand" width="100%"> <tbody> <tr> <td class="keyInfo">Supplier:</td> <td class="valueInfo lastColumn" colspan="5"><label class="'+((obj.alternate_vendor_flag!=undefined && obj.alternate_vendor_flag!=null  && (obj.alternate_vendor_flag=='G' || obj.alternate_vendor_flag=='V') ) ? 'linkBtn editSupplier' : '')+'">' + (obj.supplier_name == null ? '' : obj.supplier_name) + ' (' + supplierNo + ') </label></td> </tr>';
		  content += '<tr> <td width="20%" class="keyInfo">Stock on Order:</td> <td width="13%" class="valueInfo columnDivider">' + sooContent+'</td>';
		  content += '<td width="20%" class="keyInfo">Standard Price:</td> <td width="13%" class="valueInfo columnDivider">' + (stdPrice == null ? '' : stdPrice) + '</td> <td width="20%" class="keyInfo noDivider"></td> <td width="13%" class="valueInfo lastColumn"></td> </tr> <tr> <td class="keyInfo">Stock in Transit:</td> <td class="valueInfo columnDivider">' + (obj.sit == null ? '0' : ((obj.sit != null && obj.sit != undefined && obj.sit != '' && obj.sit.toString().indexOf('.') != -1)?Number(obj.sit).toFixed(3):obj.sit)) + '</td> <td class="keyInfo"></td> <td class="valueInfo columnDivider"></td> <td class="keyInfo noDivider"></td> <td class="valueInfo lastColumn"></td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"><label class="history" onclick="showSales(\''+(articleNo||'')+'\',\''+(obj.pack_break_down_flag || 'N' )+'\',\''+obj.order_uom+'\',\''+(obj.base_uom || '' )+'\')"  >Sales History</label>'+(loggedInSalesOrg == '1015' ? '<label class="history" onclick="showAlterPrice('+(articleNo||'')+')" >Alternate Pricing</label>': '')+'<label class="notpadLink" onclick="showAllocation('+(articleNo||'')+')" >Check Allocations</label><label class="notpadLink " onclick="showPromotion(\''+(articleNo||'')+'\',\'\',\'\',\'\',\'\')" >Check Promotions</label></td> </tr> </tbody> </table> </td> </tr>';
		  
	  }
  else if(greenLifeArticleExists != undefined && greenLifeArticleExists)
	  {
		  content += '<tr mainRow supplier="'+supplierNo+'-'+(obj.supplier_name || '')+'" data-tt-id="' + id + '" class="" ' + dataBind + '>' + '<td class="expandTd expander  "><span class="indenter ">&nbsp;</span></td>' + '<td class="articleNo" >' + articleNo + '</td>' + '<td class="article_desc">' + obj.article_desc + '</td>' + '<td class="centerValue soh">' + (obj.soh == null ? '' : deciValues(obj.random_wgt_flg,obj.weighted_flag,(obj.linked_article_flag||'N'),(obj.pack_break_down_flag||'N'),obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,false,undefined,obj.pi_uom)) + '</td>' + '<td  class="centerValue  onEditOnly"><label  class="paddingRight10" ><input type="#" value="' + obj.qty + '" data-om="' + obj.om + '" ' + '	class="editNumCell textbox textboxDefaultText orderQty"></label><label class="uom-col">' + (obj.order_uom != null ? obj.order_uom : '') + '<label></td>' + '<td  class="centerValue qty onViewOnly hideBlock">' + obj.qty + '</td>' + '<td class="centerValue om">'
		  //17.06 ZEA/ZKG OM Value changes  
		    + (obj.om == null || obj.om == undefined ? '' : ((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))) + ' ' + (obj.base_uom != null ? obj.base_uom : '') + '</td>' + '<td class="centerValue total_qty"><strong><b class="totalUnit">' + formatDeciOrWhole(Number(obj.om) * Number(obj.qty)) + '</b> ' + (obj.base_uom != null ? obj.base_uom : '') + '</strong></td>' + '<td  class="centerValue  onEditOnly"><input type="#" value="' + ((obj.delivery_date != null && obj.delivery_date != undefined && obj.delivery_date != '/undefined/undefined' && obj.delivery_date != 'undefined//undefined') ? obj.delivery_date.replace(/\s/g, '') : '') + '"' + '	class="textbox textboxDefaultText  inputDate delivery_date_valid editDateCell"' + '	placeholder="dd/mm/yyyy" id="dp' + id + '"></td>' + '<td  class="centerValue delivery_date deliveryDate onViewOnly hideBlock">' + obj.delivery_date + '</td>'
		  	+ '<td id ="validationStatus" class="validationStatusDraft centerValue onViewOnly">' + "Draft" + '</td>'+ '<td id ="purchaseGroup" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="roasterName" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="maxOrderQnty" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="preqReqId" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="resetValidate" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="supplierFromRC" class="centerValue onViewOnly hideBlock"></td>'+ '<td class="padright0 lastColumn centerValue onEditOnly"><label class="linkBtn">' + '		<a ><label class="deleteRecord" id="' + id + '">&nbsp;</label></a>' + '</label></td>' +  + '<td class="padright0 lastColumn centerValue onEditOnly"><label class="linkBtn">' + '		<a ><label class="deleteRecord" id="' + id + '">&nbsp;</label></a>' + '</label></td>' + '</tr>';
			content += '<tr data-tt-id="' + id + '.1" data-tt-parent-id="' + id + '" class="expandsubrow collapsed "> <td colspan="10"  class="allTimeExpand "> <table cellspacing="0" class="ContentTable allTimeExpand" width="100%"> <tbody> <tr> <td class="keyInfo">Supplier:</td> <td class="valueInfo lastColumn" colspan="5"><label class="'+((obj.alternate_vendor_flag!=undefined && obj.alternate_vendor_flag!=null  && (obj.alternate_vendor_flag=='G' || obj.alternate_vendor_flag=='V') ) ? 'linkBtn editSupplier' : '')+'">' + (obj.supplier_name == null ? '' : obj.supplier_name) + ' (' + supplierNo + ') </label></td> </tr>';
		 	content += '<tr> <td width="20%" class="keyInfo">Stock on Order:</td> <td width="13%" class="valueInfo columnDivider">' + sooContent+'</td>';
			content += '<td width="20%" class="keyInfo">Standard Price:</td> <td width="13%" class="valueInfo columnDivider">' + (stdPrice == null ? '' : stdPrice) + '</td> <td width="20%" class="keyInfo noDivider"></td> <td width="13%" class="valueInfo lastColumn"></td> </tr> <tr> <td class="keyInfo">Stock in Transit:</td> <td class="valueInfo columnDivider">' +(obj.sit == null ? '0' : ((obj.sit != null && obj.sit != undefined && obj.sit != '' && obj.sit.toString().indexOf('.') != -1)?Number(obj.sit).toFixed(3):obj.sit))+ '</td> <td class="keyInfo"></td> <td class="valueInfo columnDivider"></td> <td class="keyInfo noDivider"></td> <td class="valueInfo lastColumn"></td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"><label class="history" onclick="showSales(\''+(articleNo||'')+'\',\''+(obj.pack_break_down_flag || 'N' )+'\',\''+obj.order_uom+'\',\''+(obj.base_uom || '' )+'\')"  >Sales History</label>'+(loggedInSalesOrg == '1015' ? '<label class="history" onclick="showAlterPrice('+(articleNo||'')+')" >Alternate Pricing</label>': '')+'<label class="notpadLink" onclick="showAllocation('+(articleNo||'')+')" >Check Allocations</label><label class="notpadLink " onclick="showPromotion(\''+(articleNo||'')+'\',\'\',\'\',\'\',\'\')" >Check Promotions</label></td> </tr> </tbody> </table> </td> </tr>';
	  
	  }
	else
	  {
		content += '<tr mainRow supplier="'+supplierNo+'-'+(obj.supplier_name || '')+'" data-tt-id="' + id + '" class="" ' + dataBind + '>' + '<td class="expandTd expander  "><span class="indenter ">&nbsp;</span></td>' + '<td class="articleNo" >' + articleNo + '</td>' + '<td class="article_desc">' + obj.article_desc + '</td>' + '<td class="centerValue soh">' + (obj.soh == null ? '' : deciValues(obj.random_wgt_flg,obj.weighted_flag,(obj.linked_article_flag||'N'),(obj.pack_break_down_flag||'N'),obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,false,undefined,obj.pi_uom)) + '</td>' + '<td  class="centerValue  onEditOnly"><label  class="paddingRight10" ><input type="#" value="' + obj.qty + '" data-om="' + obj.om + '" ' + '	class="editNumCell textbox textboxDefaultText orderQty"></label><label class="uom-col">' + (obj.order_uom != null ? obj.order_uom : '') + '<label></td>' + '<td  class="centerValue qty onViewOnly hideBlock">' + obj.qty + '</td>' + '<td class="centerValue om">'
		//17.06 ZEA/ZKG OM Value changes    
		    + (obj.om == null || obj.om == undefined ? '' : ((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))) + ' ' + (obj.base_uom != null ? obj.base_uom : '') + '</td>' + '<td class="centerValue total_qty"><strong><b class="totalUnit">' + formatDeciOrWhole(Number(obj.om) * Number(obj.qty)) + '</b> ' + (obj.base_uom != null ? obj.base_uom : '') + '</strong></td>' + '<td  class="centerValue  onEditOnly"><input type="#" value="' + ((obj.delivery_date != null && obj.delivery_date != undefined && obj.delivery_date != '/undefined/undefined' && obj.delivery_date != 'undefined//undefined') ? obj.delivery_date.replace(/\s/g, '') : '') + '"' + '	class="textbox textboxDefaultText  inputDate delivery_date_valid editDateCell"' + '	placeholder="dd/mm/yyyy" id="dp' + id + '"></td>' + '<td  class="centerValue delivery_date deliveryDate onViewOnly hideBlock">' + obj.delivery_date + '</td>'
			+ '<td id ="validationStatus" class="validationStatusDraft centerValue onViewOnly">' + "Draft" + '</td>'+ '<td id ="purchaseGroup" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="roasterName" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="maxOrderQnty" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="preqReqId" class="centerValue onViewOnly hideBlock"></td>'+ '<td id ="resetValidate" class="centerValue onViewOnly hideBlock"></td>' + '<td id ="supplierFromRC" class="centerValue onViewOnly hideBlock"></td>' +'<td class="padright0 lastColumn centerValue onEditOnly"><label class="linkBtn">' + '		<a ><label class="deleteRecord" id="' + id + '">&nbsp;</label></a>' + '</label></td>' +  + '<td class="padright0 lastColumn centerValue onEditOnly"><label class="linkBtn">' + '		<a ><label class="deleteRecord" id="' + id + '">&nbsp;</label></a>' + '</label></td>' + '</tr>';
		content += '<tr data-tt-id="' + id + '.1" data-tt-parent-id="' + id + '" class="expandsubrow collapsed "> <td colspan="10"  class="allTimeExpand "> <table cellspacing="0" class="ContentTable allTimeExpand" width="100%"> <tbody> <tr> <td class="keyInfo">Supplier:</td> <td class="valueInfo lastColumn" colspan="5"><label class="'+((obj.alternate_vendor_flag!=undefined && obj.alternate_vendor_flag!=null  && (obj.alternate_vendor_flag=='G' || obj.alternate_vendor_flag=='V') ) ? 'linkBtn editSupplier' : '')+'">' + (obj.supplier_name == null ? '' : obj.supplier_name) + ' (' + supplierNo + ') </label></td> </tr>';
	 	content += '<tr> <td width="20%" class="keyInfo">Stock on Order:</td> <td width="13%" class="valueInfo columnDivider">' + sooContent+'</td>';
		content += '<td width="20%" class="keyInfo">Standard Price:</td> <td width="13%" class="valueInfo columnDivider">' + (stdPrice == null ? '' : stdPrice) + '</td> <td width="20%" class="keyInfo noDivider"></td> <td width="13%" class="valueInfo lastColumn"></td> </tr> <tr> <td class="keyInfo">Stock in Transit:</td> <td class="valueInfo columnDivider">'	+ (obj.sit == null ? '0' : ((obj.sit != null && obj.sit != undefined && obj.sit != '' && obj.sit.toString().indexOf('.') != -1)?Number(obj.sit).toFixed(3):obj.sit)) + '</td> <td class="keyInfo"></td> <td class="valueInfo columnDivider"></td> <td class="keyInfo noDivider"></td> <td class="valueInfo lastColumn"></td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"><label class="history" onclick="showSales(\''+(articleNo||'')+'\',\''+(obj.pack_break_down_flag || 'N' )+'\',\''+obj.order_uom+'\',\''+(obj.base_uom || '' )+'\')"  >Sales History</label>'+(loggedInSalesOrg == '1015' ? '<label class="history" onclick="showAlterPrice('+(articleNo||'')+')" >Alternate Pricing</label>': '')+'<label class="notpadLink" onclick="showAllocation('+(articleNo||'')+')" >Check Allocations</label><label class="notpadLink " onclick="showPromotion(\''+(articleNo||'')+'\',\'\',\'\',\'\',\'\')" >Check Promotions</label></td> </tr> </tbody> </table> </td> </tr>';
	  }
  	}
	  return content;
	}
function formatDeciOrWhole(val){
	val = val!= '' ? (val%1 > 0 ? Number(val).toFixed(3) : val) : val;
	return val;
}
function formatTo2DecimalPlaces(inputString){
	if(inputString == undefined || inputString == ''){
		return '0.00';
	}else{
		var str = Number(inputString).toFixed(2);
		return str;		
	}	
}
function convertToWholeNumber(inputString){
	if(inputString == undefined || inputString == ''){
		return '0';
	}else{
		return Math.round(inputString);	
	}
}


function getRecordOptiosHTML(obj) {
  var articleNo = obj.article == undefined ? obj.article_no : obj.article;
  var supplierNo = obj.supplier == undefined ? (obj.supplier_no) : (obj.supplier);
  if (obj.article_uom == null) obj.article_uom = "";
  var tr = '<tr id="popup-' + articleNo + '_' + obj.article_uom + '_' + supplierNo + '" ><td id="articleNo">' + articleNo + '</td><td id="description">' + obj.article_desc + '</td><td class="centerValue" id="uom" >' + obj.article_uom + '</td><td class="centerValue" id="supplier" >' + (obj.supplier_name != null ? obj.supplier_name : '') + ' (' + supplierNo + ')' + '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
  return tr;
}

function bindEventForHeader() {
  $('.save:visible')
    .click(function() {
      clearAllErrors();
      if (validateFieldValues(this)) {
        if ((this.id)
          .split('_')[1] == $(this)
          .closest('table')
          .attr('id')
          .split('_')[1]) {
          var tableId = $(this)
            .closest('table')
            .attr('id');
          createDraft(tableId, "D", $('#' + tableId)
            .closest('div#ordersList'));
          if (isGrouped) {
            var totalCar = 0;
            $('#' + tableId)
              .find('.orderQty')
              .each(function() {
                totalCar += Number(isNaN($(this)
                    .val()) ? 0 : $(this)
                  .val());
              });
            $('#' + tableId)
              .find('.totalCarton')
              .text(totalCar);
            var totalGrpCar = 0;
            $('.orderQty')
              .each(function() {
                totalGrpCar += Number(isNaN($(this)
                    .val()) ? 0 : $(this)
                  .val());
              });
            $('.totalGroupCarton')
              .text(totalGrpCar);
          }
        }
        if ($('#allOrdersBtn')
          .parent()
          .hasClass('ui-state-active', 'ui-tabs-active')) $('#allOrdersBtn')
          .trigger('click');
        else $('#myOrdersBtn')
          .trigger('click');
      }
    });
  $('.submitAll').unbind('click');//to avoid multiple event binding
  $('.submitAll')
    .click(function() {
    	if(!this.classList.contains('disabled')){ 
      clearAllErrors();
      var submitAll1 = this ;
      var toBeUpdatedList1 = [];
      var uniqueDeliveryDates = [];
      $('#ordersList')
        .find('tr[fromdraft]')
        .each(function() {
          toBeUpdatedList1.push($(this)
            .data("obj"));
        });      
      $.each(toBeUpdatedList1, function( key, value ) {
    	  if(value.greenlife_flag =='Y')
    		  {
    		  if($.inArray(value.delivery_date, uniqueDeliveryDates) === -1)
    		  uniqueDeliveryDates.push(value.delivery_date) ;
    		  }
    	});
      if(uniqueDeliveryDates.length > 1)
    	  {

    	  $("#dialog-confirmation")
    	    .parent()
    	    .addClass("popupWrapper");
    	  $("#dialog-confirmation")
    	    .dialog("open");
    	  $("#dialog-confirmation")
    	    .find('#ok')
    	    .find('label')
    	    .text('Continue');
    	  $("#dialog-confirmation")
    	    .find('#message')
    	    .html("Multiple delivery dates specified. This will create multiple orders");
    	  $("#dialog-confirmation")
    	    .find('#ok')
    	    .unbind('click');
    	  $("#dialog-confirmation")
    	    .find('#ok')
    	    .click(function() {
    	    	
    	    	
    	    	if (validateFieldsInCreateOrders(submitAll1, 'submit')) {
    	      	  //if(user.date == currDate && user.sap_user!='' && user.sap_user!=undefined){
    	      		  submitAllDraft("S", $('#ordersList'));
    	    		/*}else{
    	    			getSAPPwd({option : submitAll});
    	    		}*/
    	         
    	          var totalGrpCar = 0;
    	          $('.orderQty')
    	            .each(function() {
    	              totalGrpCar += Number(isNaN($(this)
    	                  .val()) ? 0 : $(this)
    	                .val());
    	            });
    	          $('.totalGroupCarton')
    	            .text(totalGrpCar);
    	        }else {
    	      	  correctError();
    	        }
    	    });
    	  $("#dialog-confirmation")
    	    .find('#cancel')
    	    .find('label')
    	    .text('Cancel');
    	  $("#dialog-confirmation")
    	    .find('#cancel')
    	    .removeClass('hideBlock');
    	  $("#dialog-confirmation")
    	    .find('#cancel')
    	    .unbind('click');
    	  $("#dialog-confirmation")
    	    .find('#cancel')
    	    .click(function() {
    	      $("#dialog-confirmation")
    	        .parent()
    	        .removeClass("popupWrapper");
    	      $("#dialog-confirmation")
    	        .dialog("close");
    	    });

    	  }
      else
    	  {
      if (validateFieldsInCreateOrders(this, 'submit')) {
    	  //if(user.date == currDate && user.sap_user!='' && user.sap_user!=undefined){
    		  submitAllDraft("S", $('#ordersList'));
    		  /*}else{
  					getSAPPwd({option : submitAll});
  				}*/       
        var totalGrpCar = 0;
        $('.orderQty')
          .each(function() {
            totalGrpCar += Number(isNaN($(this)
                .val()) ? 0 : $(this)
              .val());
          });
        $('.totalGroupCarton')
          .text(totalGrpCar);
      }else {
    	  correctError();
      }
	 // stopLoading();
    }
    	}
    });
   // }
  $('.saveAll')
    .click(function() {
      clearAllErrors();
      if (validateFieldValues(this)) {
        createAllDraft("U");
        var totalGrpCar = 0;
        $('.orderQty')
          .each(function() {
            totalGrpCar += Number(isNaN($(this)
                .val()) ? 0 : $(this)
              .val());
          });
        $('.totalGroupCarton')
          .text(totalGrpCar);
      }
    });
  $('.submit')
    .unbind('click');
  $('.submit')
    .click(function() {
    if(!this.classList.contains('disabled')){ 
      clearAllErrors();
      if (validateFieldsInCreateOrders(this, 'submit')) {
        if ((this.id)
          .split('_')[1] == $(this)
          .closest('table')
          .attr('id')
          .split('_')[1]) {
          var tableId = $(this)
            .closest('table')
            .attr('id');
        	  submitDraft(tableId, "S", $('#' + tableId), $('#' + tableId)
        	            .closest('div#ordersList'));
        }
      }else {
    	  correctError();
      }
    }
    });
	$('.validateAll')
    .unbind('click');
    $('.validateAll')
    .click(function() {    	
    	if(!this.classList.contains('disabled')){    	
    	 clearAllErrors();
    	 if (validateFieldsInCreateOrders(this, 'submit')) {
	      	  //if(user.date == currDate && user.sap_user!='' && user.sap_user!=undefined){
	      		validateAllDraft("S", $('#ordersList'));
	    		/*}else{
	    			getSAPPwd({option : submitAll});
	    		}*/
	    }else {
	    	if(createOdrHandleMsg){
			  	correctError();
    	  	}
	    }
    	}
    });
	$('.validateRoaster')
    .unbind('click');
    $('.validateRoaster')
    .click(function() {
    	if(!this.classList.contains('disabled')){ 
      clearAllErrors();
      if (validateFieldsInCreateOrders(this, 'submit')) {
        if ((this.id)
          .split('_')[1] == $(this)
          .closest('table')
          .attr('id')
          .split('_')[1]) {
          var tableId = $(this)
            .closest('table')
            .attr('id');
        	  validateDraft(tableId, "S", $('#' + tableId), $('#' + tableId)
        	            .closest('div#ordersList'));
        }
      }else {
    	  if(createOdrHandleMsg){
    		  correctError();
    	  }
      }
    	}
    });
  $('.expandAll')
    .click(function() {
      $(this)
        .addClass('hideBlock');
      $(this)
        .next()
        .removeClass('hideBlock');
      var tableId = $(this)
        .closest('table')
        .attr('id');
      $('#' + tableId)
        .treetable('expandAll');
    });
  $('.collapseAll')
    .click(function() {
      $(this)
        .addClass('hideBlock');
      $(this)
        .prev()
        .removeClass('hideBlock');
      var tableId = $(this)
        .closest('table')
        .attr('id');
      $('#' + tableId)
        .treetable('collapseAll');
    });
  
  $('.submitAll').addClass('disabled');
  $('.submit').addClass('disabled'); 
}

function maxOrderQtyValidation(id, area, qtyFrmSer, val){	
	//commenting as handle in validate
	/*var maxFromSer =  ((qtyFrmSer == undefined || qtyFrmSer  == '')? 
			(area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="maxOrderQnty"]').html() == '' || 
					area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="maxOrderQnty"]').html() == undefined ? '50'
			:area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="maxOrderQnty"]').html()): qtyFrmSer);	
	var carQnty = Number(val);
	$('tr[mainrow][data-tt-id="'+id+'"]').parent().find('tr[mainrow]')
	    .each(function() {
	    	var obj = $(this)
	        .data("obj");
	    	if(obj.article != id.split("_")[0])
	    	carQnty += Number(obj.qty);
	    });
    
	 if(Number(maxFromSer) < Number(carQnty)){	
		 //return 'Article '+id.split("_")[0]+' having more Quantity. Ordered Quantity should be less than '+maxFromSer+' for the supplier '+id.split("_")[1];
		 return 'Ordered Quantity should be less than '+maxFromSer+' for the supplier '+id.split("_")[1];
	 }
	else return '';	*/ 
	return '';
}

function bindEventForOrders(obj, area, from) {
  var articleNo = obj.article == undefined ? obj.article_no : obj.article;
  var supplierNo = obj.supplier == undefined ? (obj.supplier_no) : (obj.supplier);
  if (obj.article_uom == null) obj.article_uom = "";
  var id = articleNo + '_' + supplierNo;
  area.find('[data-tt-id="' + id + '"]')
  .find('.orderQty') 
  .unbind('change');
  area.find('[data-tt-id="' + id + '"]')
    .find('.orderQty') 
    .change(function() {
    	var val = isNaN($(this)
    	         .val()) ? 0 : $(this)
    	        .val();
    var maxOrderQtyErrMsg =maxOrderQtyValidation(id, area, '', val);
    /*if(maxOrderQtyErrMsg != ''){
      // $.fn.showCustomMsg([maxOrderQtyErrMsg], error, "Roaster Date Validation");
    	
    }*/
    if(maxOrderQtyErrMsg != ''){  
  	  var treeid = $(this).closest('table').attr('id').split('_')[1];
        $('#datatable').treetable("expandNode",treeid);  
        $(this)
        .addClass(errorFieldClass);
      addtooltip($(this), maxOrderQtyErrMsg);
      $(".tooltip")
        .tooltip({
          position: {
            my: "left center",
            at: "right+10 center"
          }
        });
      //orderErrorExists = true;
    }else{
    	$(this)
        .removeClass(errorFieldClass);
       removetooltip($(this));
    $(this).closest('td').parent().find('td[id="validationStatus"]')
         .html('Draft');
     bindSubmitEnableDisable();     
      var om = isNaN($(this)
          .attr('data-om')) ? 0 : $(this)
        .attr('data-om');
      $(this)
        .parent()
        .parent().parent()
        .find('.totalUnit')
        .text(formatDeciOrWhole(val * om));
      $(this)
        .parent()
        .parent().parent()
        .find('.qty')
        .text(val);
      $(this)
        .closest('tr')
        .data("obj")
        .qty = val;
      $(this)
        .closest('tr')
        .data("obj")
        .total_qty = formatDeciOrWhole(val * om);
      
      //NEED TO CHCK 
      var totalCar= 0;
      var tableArea = $(this)
      .closest('table');
      tableArea.find('.orderQty')
      .each(function() {
        totalCar += Number(isNaN($(this)
            .val()) ? 0 : $(this)
          .val());
      });
      tableArea.find('.totalCarton')
      .text(totalCar);
      
    var totalGrpCar = 0;
    $('.orderQty')
      .each(function() {
        totalGrpCar += Number(isNaN($(this)
            .val()) ? 0 : $(this)
          .val());
      });
    $('.totalGroupCarton')
      .text(totalGrpCar);
    }	   
    });
  area.find('[data-tt-id="' + id + '"]')
  .find('.qty')
  .unbind('change');
  area.find('[data-tt-id="' + id + '"]')
    .find('.qty')  
    .change(function() {
    	/*$(this).closest('td').parent().find('td[id="validationStatus"]')
        .html('Draft');
    	bindSubmitEnableDisable();*/
    	 $('.orderQty')
    	  .unbind('change');
    	  area.find('[data-tt-id="' + id + '"]')
    	    .find('.orderQty').trigger('change');    	    	 
    });
  var val = isNaN(area.find('[data-tt-id="' + id + '"]')
      .find('.orderQty')
      .val()) ? 0 : area.find('[data-tt-id="' + id + '"]')
    .find('.orderQty')
    .val();
  var om = isNaN(area.find('[data-tt-id="' + id + '"]')
      .find('.orderQty')
      .attr('data-om')) ? 0 : area.find('[data-tt-id="' + id + '"]')
    .find('.orderQty')
    .attr('data-om');
  area.find('[data-tt-id="' + id + '"]')
    .find('.orderQty')
    .parent()
    .parent().parent()
    .find('.totalUnit')
    .text(formatDeciOrWhole(val * om));
  obj.total_qty = val * om;
  area.find('[data-tt-id="' + id + '"]')
    .find('.inputDate')
    .unbind('change');
  area.find('[data-tt-id="' + id + '"]')
    .find('.inputDate')
    .on("change", function() {
    	 $(this).closest('td').parent().find('td[id="validationStatus"]')
    	    .html('Draft');
    		bindSubmitEnableDisable();
      $(this)
        .removeClass(errorFieldClass);
      removetooltip($(this));
      var enteredDate = this.value;
      isAlertNoDel = true;
     var prevDateText = $(this).parent().parent().find('.delivery_date_valid').attr('value');		//draft save date will display
      $(this)
        .parent()
        .parent()
        .find('.deliveryDate')
        .text(enteredDate);
      $(this)
        .parent()
        .parent()
        .find('.delivery_date_valid')
        .val(enteredDate);
      var obj = $(this)
        .closest('tr')
        .data("obj");
      $(this)
        .closest('tr')
        .data("obj")
        .prev_entered_delivery_date = obj.delivery_date;
      var prevDate = obj.prev_entered_delivery_date;
      $(this)
        .closest('tr')
        .data("obj")
        .delivery_date = enteredDate;
      var next_avl_del_date = "";
      var source = (obj.source_of_supply == undefined ? (obj.source) : (obj.source_of_supply));
      if (obj.next_delivery_date != null && obj.next_delivery_date != undefined && obj.next_delivery_date != "") next_avl_del_date = obj.next_delivery_date;
      if (enteredDate != "") {
        if (isValidDate(enteredDate)) {
          if (isPastDate(enteredDate)) {
           /* $(this)
              .addClass(errorFieldClass);
            if (next_avl_del_date != "" && next_avl_del_date != null) {
              showAlertForEmergencyOrder("No deliveries for this article on this day. The closest available date is " + formatDateMobi(next_avl_del_date), this.value, $(this),prevDate);
              $(this).parent().parent().find('.delivery_date_valid').val(prevDateText);
              isAlertNoDel = false;
            } else {
              showAlertForEmergencyOrder("No deliveries for this article on this day.", this.value, $(this),prevDate);
            }*/
        	  //Defect 9990
        	  $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Invalid Delivery Date.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
          } /* Commenting since this emergency order confirmation will cover in Ordering Redesign Changes 
          else if ((compareDate(obj.delivery_date, formatDateMobi(obj.next_delivery_date)) == 'lt') && (obj.greenlife_flag!="Y")) {
		  if(obj.unscheduled_vendor_f != 'Y' && source == '1' )
            confirmationForEmergencyOrder(obj, this.value, $(this),prevDate);
          } */else {
            changeDraftDeliveryDate(this.value, $(this),prevDate);
          }
        } else {
          $(this)
            .addClass(errorFieldClass);
          addtooltip($(this), "Invalid Delivery Date.");
          $(".tooltip")
            .tooltip({
              position: {
                my: "left center",
                at: "right+10 center"
              }
            });
        }
      }
    });
  if (from != 'fromSearch') {
    if (isGrouped) {
      var totalCar = 0;
      var tableArea = area.find('[data-tt-id="' + id + '"]').closest('table');
      tableArea.find('.orderQty')
        .each(function() {
          totalCar += Number(isNaN($(this)
              .val()) ? 0 : $(this)
            .val());
        });
      tableArea.find('.totalCarton')
        .text(totalCar);
      var totalGrpCar = 0;
      $('.orderQty')
        .each(function() {
          totalGrpCar += Number(isNaN($(this)
              .val()) ? 0 : $(this)
            .val());
        });
      $('.totalGroupCarton')
        .text(totalGrpCar);
    }
  }
   $(".inputDateInput,.inputDate").datepicker('destroy');
  Date.format = 'dd/mm/yy';
  $(".inputDateInput")
    .datepicker({
      zIndex: 50
    });
  $(".inputDate")
    .datepicker({
      zIndex: 50
    });
  $('.deleteRecord')
    .click(function() {
      clearAllErrors();
      var area = $(this)
        .closest('#ordersList');
      var list = [];
      var obj = $(this)
        .closest('tr')
        .data("obj");
      if(obj.article_uom != obj.order_uom){
    	  obj.article_uom = obj.order_uom;
      }
      list.push(obj);
      var row = $(this)
        .closest('tr')
        .attr('data-tt-id');
      confirmation(list, "X", row, area);
    });
  $('.orderQty')
    .within999();
  
  $('.costPrice')
  .isValidPercentOrDecimal();
  	
  $('input.inputDate.hasDatepicker').change(function()
		  {
	   $(this).val(formateDate($(this).val()));
		  });
  
  area.find('[data-tt-id="' + id + '"]')
  .find('.costPrice')
  .change(function() {
	  
	  var val = isNaN($(this)
	          .val()) ? 0 : Number($(this)
	        .val()).toFixed(2);
	  $(this)
      .parent()
      .parent().parent()
      .find('.cost_price')
      .text(val);
	  
	  $(this)
      .closest('tr')
      .data("obj")
      .cost_price = val;
      
       $(this)
      .val(val);
	  maxCostPriceUpdate = this.getAttribute('value');
	 // var maxCostPrice = $(this).parent().find('.maxCostPrice').val();
	  var enteredPrice = $(this).val();
	  if(Number(enteredPrice) > Number(maxCostPriceUpdate))
		  {
		  $.fn.warnPopup('warn','Cost price is greater than '+maxCostPriceUpdate+'. Is this correct?','Create Order',triggerAcceptCostPrice,triggerDeclineCostPrice,'',{selectedElement: $(this)},'');
		  }
  });
  
  area.find('[data-tt-parent-id="' + id + '"] .editSupplier').unbind('click').bind('click',({data: obj,$elem: area}), function(e) {
	  console.log('click bind' + area);
	  var obj = e.data['data'];
	  var $popUp = $('#dialog-alt-vendors');
	  var $body = $('body');
	  var $popupCont ='';
	  $supp_tbl = $(this);
	  if($popUp == undefined || $popUp.length == 0){
	      $body.append($(dialog_alternate_vendors));
	      $popUp = $('#dialog-alt-vendors');
	      $popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 210,maxHeight: 510,width: 600});
	  }
	  $popupCont = $('#dialog-alt-vendors .popupData');
	  getAlternateSuppliers({'iv_supplier_no':obj.supplier,'iv_article_no':obj.article},$popupCont,$popUp,obj);
	  $('#dialog-alt-vendors').find('.altVendorWarMsgClass').text(altVendorWarMsgOR);
	  return true;
  });
}

var getAlternateSuppliers = function(param,$hold,$dialog,obj){
	console.log(getAlterNateVendor  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url: getAlterNateVendor,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(response) {
		  //response= [{supplier_no: '12344',supplier_name:'sdfssd'}];
		  if(checkResult(response,'supplier_no')){
			  frameAlternateSupplierCont(response,$hold,$dialog,obj);
		  } else {
			  $.fn.showCustomMsg(['There are no alternate suppliers available for this article.'],error,'AlterNative Vendor Selection');
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

var frameAlternateSupplierCont = function(response,$hold,$dialog,obj){
	var confObj = new tblConfObjAlternateSupp(response,obj);
	$hold.loadtbl(confObj);$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');
	$dialog.dialog('open').parent().addClass('popupWrapper');$hold.find('#alternate_supp_tbl_head_page').addClass('paddingtop10');
}

function tblConfObjAlternateSupp(data,obj){
	this.option = 'build';
	this.key = ['supplier_no','supplier_name','select'];
	this.table_name = 'alternate_supp_tbl';
	this.table_title = 'List of alternate suppliers for '+ (obj.article +' - '+obj.article_desc);
	this.table_class = ' ContentTable ';
	this.header_name = {supplier_no:'Vendor #',supplier_name:'Description',select:''},
	this.header_data_type = {supplier_no:'',supplier_name:'',select:''},
	this.header_row_type = {supplier_no:'main',supplier_name:'main',select:''},
	this.header_class = {supplier_no:'',supplier_name:'',select:''},
	this.header_title = {},
	this.header_width = {supplier_no:'',supplier_name:'',select:''},
	this.content_class = {supplier_no:'',supplier_name:'',select:''},
	this.content_title = {},
	this.content_format = {supplier_no:'trim',supplier_name:'trim',select:''},
	this.content_width =  {supplier_no:'',supplier_name:'',select:''},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;
	this.cont_data_function = {};
	this.cont_sort_function = {};
	this.content_bind_event = {};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.header_td_addon = {select:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {select:' '};
	this.content_td_addon = {select:{'.selectItem':{event:{click : onArticleSuppSelect},display: function(){}}}};
	this.content_label = {select:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
}

var onArticleSuppSelect = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var $selectBtn = $('#dialog-alt-vendors').dialog('close');
	if($supp_tbl!=''){
		var toBeUpdatedList = [];
		var tempObj = {};
		var area;
		var updateDraftArea = '';
		var tempObjLockObj = '';
		var fromOOR = $('#oor_articleResultArea').find('tr[mainrow]').is(':visible');
		if(fromOOR && $('#oor_articleResultArea').find('tr[mainrow]') != null
				&& $('#oor_articleResultArea').find('tr[mainrow]') != ''){
			updateDraftArea = $('#oor_articleResultArea').find('tr[mainrow]');
		}else{
			updateDraftArea = $supp_tbl.closest('.expandsubrow').prev();
		}
		updateDraftArea.each(function() {
			tempObj = $(this).data('obj');
			if(tempObj.alternate_vendor_flag != null && tempObj.alternate_vendor_flag != ''
				&& (tempObj.alternate_vendor_flag == 'G' || tempObj.alternate_vendor_flag == 'V')){
				console.log("selected"+tempObj.supplier);
				tempObj.roster_date = formatDateToMDY(getTodayDate());
				tempObj.delivery_date = getDesiredFutureDate(1);
				tempObj.supplier = obj.supplier_no;
				tempObj.alternate_vendor_flag = 'V';
				tempObj.om = '1';
				tempObj.order_uom = tempObj.base_uom;
				tempObj.qty = 0;
				tempObjLockObj = tempObj;
				toBeUpdatedList.push(tempObj);
			}				
		});	
		
		if(!fromOOR){
			tempObjLockObj = '';
			var updateDrafts = frameJSONObject(toBeUpdatedList, "U");
			callCreateDraftOrderService(updateDrafts, $supp_tbl.closest('div#ordersList'));
			if ($('#allOrdersBtn').parent().hasClass('ui-state-active', 'ui-tabs-active')) $('#allOrdersBtn')
	          .trigger('click');
	        else $('#myOrdersBtn')
	          .trigger('click');
		}else {
			var updateDrafts = frameJSONObject(toBeUpdatedList, "U", 'POR');
			callCreateDraftOrderService(updateDrafts, $('#oor_articleResultArea'));
			$('#ordersReceipt').trigger('click');
			lockSupplier(tempObjLockObj);
			lockSupplierUsingVendor();
		}
	}
};

function bindSubmitEnableDisable(){
	var updateDrafts  = [];
	var area = $('#ordersList');
	$('#ordersList')
    .find('tr[fromdraft]')
    .each(function() {
    	updateDrafts.push($(this)
        .data("obj"));
    });
	if(updateDrafts.length >0){
		$('.submitAll').addClass('disabled');	
		$('.validateAll').addClass('disabled');	
		for(var filter = 0; filter<updateDrafts.length; filter++){
			var articleNo = updateDrafts[filter].article == undefined ? updateDrafts[filter].article_no : updateDrafts[filter].article;
			var supplierNo = updateDrafts[filter].supplier == undefined ? (updateDrafts[filter].supplier_no) : (updateDrafts[filter].supplier);
			var id = articleNo + '_' + supplierNo;
			area.find('tr[mainrow][data-tt-id="'+id+'"]').closest('table').find('tfoot div').find('.validateRoaster').addClass('disabled');
			area.find('tr[mainrow][data-tt-id="'+id+'"]').closest('table').find('tfoot div').find('.submit').addClass('disabled');			
		}
		for(var filter = 0; filter<updateDrafts.length; filter++){
		var articleNo = updateDrafts[filter].article == undefined ? updateDrafts[filter].article_no : updateDrafts[filter].article;
		var supplierNo = updateDrafts[filter].supplier == undefined ? (updateDrafts[filter].supplier_no) : (updateDrafts[filter].supplier);
		
			var id = articleNo + '_' + supplierNo;
			var status = area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="validationStatus"]').html();		
			
			if(status == '<label class="success">Verified</label>'){	
				$('.submitAll').removeClass('disabled');				
				area.find('tr[mainrow][data-tt-id="'+id+'"]').closest('table').find('tfoot div').find('.submit').removeClass('disabled');
			}
			if(status == "Draft"){
				$('.validateAll').removeClass('disabled');								
				area.find('tr[mainrow][data-tt-id="'+id+'"]').closest('table').find('tfoot div').find('.validateRoaster').removeClass('disabled');
			}
		}
	}
}
var triggerAcceptCostPrice = function(e)
{
	var $elem = e.data.msg;
	$elem.dialog('close');
};

var triggerDeclineCostPrice = function(e)
{
	var $elem = e.data.msg;
	var saveObj = e.data.cache;
	var $selectedElement = saveObj.selectedElement;
	$selectedElement.val('');
	$elem.dialog('close');
};

function changeDraftDeliveryDate(enteredDate, dateElem,prevDate,triggerOkDirect,selectedSupplier) {
	var supplier = '';
	var supplierDesc = '';
	if(triggerOkDirect)
	  {
	  supplier = selectedSupplier;
	  }
	if(triggerOkDirect == undefined)
	  {
   supplier = dateElem.parent()
    .parent()
    .attr('data-tt-id')
    .split('_')[1];
   supplierDesc = dateElem.parent()
    .parent()
    .attr('supplier'); 
	  }
 // if($("#ordersList tr:contains('"+supplier+"')").length > 3)
	if($("#ordersList tr:contains('"+supplier+"')").find('.ordersTable tr[mainrow]').length > 1)
	  {
	  if(triggerOkDirect == undefined)
	  {
	  //+supplier+' - ' removed as supplier desc itself has supplier no 
  var msg = 'Do you want all articles supplied by ' + supplierDesc + ' to change to "' + enteredDate +'" ?'; //defect 2505
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .find('#message')
    .text(msg);
  $("#dialog-confirmation")
    .find('#ok')
    .find('label')
    .text('Yes');
  $("#dialog-confirmation")
    .parent()
    .find('.ui-dialog-title')
    .text('Information');
	  }
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
      if ($('#allOrdersBtn')
        .parent()
        .hasClass('ui-state-active', 'ui-tabs-active') || ($('#myOrdersBtn')
        .parent()
        .hasClass('ui-state-active', 'ui-tabs-active') && $('.submitAll').is(':visible')) ) {
        $('#ordersList #datatable input.inputDate:not([name="deliveryDate"])')
          .each(function() {
            var toSupplier = $(this)
              .parent()
              .parent()
              .attr('data-tt-id')
              .split('_')[1];
            if (supplier == toSupplier) {
              $(this)
                .val(enteredDate);
              $(this)
                .closest('tr')
                .data("obj")
                .delivery_date = enteredDate;
              if ($(this)
                .hasClass(errorFieldClass)) $(this)
                .removeClass(errorFieldClass)
                .removeAttr('title');
              $(this).parent().closest('tbody tr[mainrow]').find('td[id="validationStatus"]')
              .html('Draft');
              bindSubmitEnableDisable();
            }              
          });
      } else {
        $('#ordersList #datatable input.inputDate')
          .each(function() {
            var toSupplier = $(this)
              .parent()
              .parent()
              .attr('data-tt-id')
              .split('_')[1];
            if (supplier == toSupplier) {
              $(this)
                .val(enteredDate);
              $(this)
                .closest('tr')
                .data("obj")
                .delivery_date = enteredDate;
              if ($(this)
                .hasClass(errorFieldClass)) $(this)
                .removeClass(errorFieldClass)
                .removeAttr('title');
              $(this).parent().closest('tbody tr[mainrow]').find('td[id="validationStatus"]')
              .html('Draft');
              bindSubmitEnableDisable();
            }
          });
      }
      if(triggerOkDirect == undefined)
    	  {
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
    	  }
    });
  $("#dialog-confirmation")
    .find('#cancel')
    .removeClass('hideBlock');
  $("#dialog-confirmation")
    .find('#cancel')
    .find('label')
    .text('No');
  $("#dialog-confirmation")
    .find('#cancel')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#cancel')
    .click(function() {
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
      return false;
    });
	  }
  if(triggerOkDirect)
	  {

      if ($('#allOrdersBtn')
        .parent()
        .hasClass('ui-state-active', 'ui-tabs-active') || ($('#myOrdersBtn')
        .parent()
        .hasClass('ui-state-active', 'ui-tabs-active') && $('.submitAll').is(':visible')) ) {
        $('#ordersList #datatable input.inputDate:not([name="deliveryDate"])')
          .each(function() {
            var toSupplier = $(this)
              .parent()
              .parent()
              .attr('data-tt-id')
              .split('_')[1];
            if (supplier == toSupplier) {
              $(this)
                .val(enteredDate);
              $(this)
                .closest('tr')
                .data("obj")
                .delivery_date = enteredDate;
              if ($(this)
                .hasClass(errorFieldClass)) $(this)
                .removeClass(errorFieldClass)
                .removeAttr('title');
            }
          });
      } else {
        $('#ordersList #datatable input.inputDate')
          .each(function() {
            var toSupplier = $(this)
              .parent()
              .parent()
              .attr('data-tt-id')
              .split('_')[1];
            if (supplier == toSupplier) {
              $(this)
                .val(enteredDate);
              $(this)
                .closest('tr')
                .data("obj")
                .delivery_date = enteredDate;
              if ($(this)
                .hasClass(errorFieldClass)) $(this)
                .removeClass(errorFieldClass)
                .removeAttr('title');
            }
          });
      }
	  }
}

function showArticleSelectPopup(response, area, formData) {
	var searchText = formData.iv_article;
	if(searchText.trim() == '' )
		{
		if(formData != undefined && formData.param != undefined && formData.param.iv_supplier != null && formData.param.iv_supplier != undefined && formData.param.iv_supplier != '')
			searchText = formData.param.iv_supplier;
		}
  $.fn.loadArticlePopUp(response,onSelectInCreateOrder,'',onArticleTdCheckInCreateOrder,checkboxOption,searchText,area,formData);
}

function showArticleSelectPopupNew(response, area, formData) {
	var searchText = formData.iv_article;
	if(searchText.trim() == '' )
		{
		if(formData != undefined && formData.param != undefined && formData.param.iv_supplier != null && formData.param.iv_supplier != undefined && formData.param.iv_supplier != '')
			searchText = formData.param.iv_supplier;
		}
  $.fn.loadArticlePopUpNew(response,onSelectInCreateOrderNew,'',onArticleTdCheckInCreateOrder,checkboxOption,searchText,area,formData);
}

var onSelectInCreateOrderNew = function (event){	
	var area = event.data.reqArea;
	var formData = event.data.searchData;	
	$elem = $(this);
	var list =[];
	list = $elem.data('checkedObj');  
	var artNumList = '';
	 if ($('#all1')
			    .is(':checked')) {
			    srcOfSupplyInd = "";
			    supplierNo = "";
			  } else if ($('#warehouse1')
			    .is(':checked') && $('#mo_wareHouseDropDown')
			    .val() != '0') {
			    srcOfSupplyInd = "2";
			    supplierNo = $('#mo_wareHouseDropDown')
			      .val();;
			  } else if ($('#vendor1')
			    .is(':checked')) {
			    srcOfSupplyInd = "1";
			    supplierNo = $('#vendorText')
			      .val()
			      .split('-')[0];
			  }
	for (var i = 0; i < list.length; i++) {
      var articleNo = list[i].article == undefined ? list[i].article_no : list[i].article;
      artNumList = (artNumList.length >0)? artNumList+",":artNumList;	
      artNumList +=  articleNo;
	}
	if(artNumList != ''){
	// var url = packBreakArticleDescSearch;	 
         var url = packBreakArticleSearchDraft;         
	  var param = {
	    "iv_desc": "Y",
	    "iv_article_no": "Y",
	    "iv_gtin": "N",
	    "iv_article": artNumList,
	    "iv_sales_org": $('#salesOrg')
	      .val(),
	    "iv_supplier": supplierNo,
	    "iv_src_supply": srcOfSupplyInd,
	    "iv_ranged": "Y",
	    "iv_session_id": "",
	    "iv_barcode": "",
	    "iv_site": $('#posSite')
	      .val(),
	    "iv_node_id": "",
	    "iv_node_level": "",
	    "iv_barcode_flag": "",
	    "iv_prime_vendor": "",
	    "iv_uom_flag": "N",
	    "iv_auto_stockr_flag": "",
	    "iv_delisted_flag" : "N",
	    "iv_deleted_flag" : "N"
	  };
	  console.log(url + ' ' + JSON.stringify(param));	 
	  $.ajax({
	    type: "post",
	    url: url,
	    data: JSON.stringify(param),
	    beforeSend: function() {
	      startLoading();
	    },
	    success: function(response) {
	    	formData.param=param;
	      if (checkResult(response,'article')) {
                 addArticlesfromDesc(response,area,formData);
	          resetSearchFieldsInCreateOrders(area);
	      }
	      stopLoading();
	    },
	    error: function() {
	      showAllErrors([mobiSerErrMsg], area);
	      stopLoading();
	      // stopLoading();// goToLogin();
	    },
	  });
	}

};
function addArticlesfromDesc(list,area,formData){
	var res = [];
	var errorMsg = [];
	if(list != undefined && list != null && list.length>0)
	{
		errorMsg = validateArticleforOrder(list, true, formData);
		     
	}
	for(var i=0;i<list.length;i++)
		{
		res.push(list[i]);
		if (res[i] != null && res[i] != undefined && (errorMsg.length == 0)
				||(errorMsg.length >0 &&  !errorMsg.includes(res[i].article))) {
		addAriclesToOrderCreation('',list[i], area, formData);
		}
	}
	if(errorMsg != undefined && errorMsg != '')
	{
	//showBlockArticlePopup(errorMsg,'');
	showAllErrors(errorMsg);
	}
}

var onSelectInCreateOrder = function (event){
	var area = event.data.reqArea;
	//var formData = event.data.searchData;
	var formData = $('#articleSearchFormForCreate').getJSON();
	var res = [];
	$elem = $(this);
	var list =[];
	list = $elem.data('checkedObj');
	var errorMsg = [];
	if(list != undefined && list != null && list.length>0){
		errorMsg = validateArticleforOrder(list, true, formData);		 
		for(var i=0;i<list.length;i++)
		{
			res.push(list[i]);
			if (res[i] != null && res[i] != undefined) {				
				addAriclesToOrderCreation('',list[i], area, formData);
			}
		}	 
		if(errorMsg != undefined && errorMsg != '')
		{		    	
		showAllErrors(errorMsg);
		}
	}

};

var onArticleTdCheckInCreateOrder = function(event){
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

function resetSearchFieldsInCreateOrders(area) {
  try {
    if (area.find('.articleForm')
      .length == 0) area = $("#myDrafts");
    area.find('.articleForm')[0].reset();
    area.find('input[name="iv_article"]')
      .val('').focus();
    area.find('#all1')
      .trigger('click');
  } catch (err) {
    console.log(err);
  }
}

function loadDraft(userid, area) {
  hideErrorInDraft();
  if (userid == "all") userid = "ALL";
  var param = {
    "iv_user_id": userid,
    "iv_session_id": "123",
    "iv_draft_type": "PO,SO", //need to uncomment once service is ready
    //		"iv_draft_type" : "PO",
    "iv_order_type": "PO",
    "iv_supplier": "",
    "iv_site": $('#posSite')
      .val(),
    "iv_sales_org": $('#salesOrg')
      .val()
  };
  var groupBy = "deliveryDate";
  if (userid == "ALL") userid = "all";
  if (userid == "all") {(allOrderGrpDefault!='' ? groupBy = allOrderGrpDefault : groupBy = "user"); opt= false;}else{(myOrderGrpDefault!='' ? groupBy = myOrderGrpDefault : groupBy = "deliveryDate");opt = true;}
  console.log(getOrdersDraftList + ' ' + JSON.stringify(param));
  $.ajax({
    type: "post",
    url: getOrdersDraftList,
    data: JSON.stringify(param),
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      startLoading();
      if (response.length >= 1) {
        delDateFormat = true;
        addAriclesFromDraft(response, area, groupBy,true);
      }
      getLimitQtyFromService();
    },
    error: function() {
    	var errors=[];
    	errors.push(mobiSerErrMsg);
      showAllErrors(errors, area);
      stopLoading();
    },
  });
}

function bindEventForGroupHeader(area) {
  if ($('#ordersList table .tbody tr')
    .length == 0) {
    if ($('#ordersList table tfoot')
      .length == 1) {
      $('#ordersList table tfoot')
        .addClass('hideBlock');
    }
  } else $('#ordersList table tfoot')
    .removeClass('hideBlock');
}

function hideErrorInDraft() {
  $('.draftErrorDiv')
    .addClass('hideBlock');
  $('#draftErrorMsg')
    .text('');
  $('.draftErrorDivGrp')
    .addClass('hideBlock');
  $('#draftErrorMsgGrp')
    .text('');
}

function bindCheckboxevent() {
  $('#addtolist')
    .addClass('hideBlock');
  var size = $('input[name="articlecheckbox"]:checked')
    .length;
  if (size > 0) {
    $('#addtolist')
      .text("Add To List(" + size + ")");
    $('#addtolist')
      .removeClass('hideBlock');
  } else {
    $('#addtolist')
      .text("Add To List");
    $('#addtolist')
      .addClass('hideBlock');
  }
  $('input[name="articlecheckbox"]')
    .change(function() {
      var size = $('input[name="articlecheckbox"]:checked')
        .length;
      if (size > 0) {
        $('#addtolist')
          .text("Add To List(" + size + ")");
        $('#addtolist')
          .removeClass('hideBlock');
      } else {
        $('#addtolist')
          .text("Add To List");
        $('#addtolist')
          .addClass('hideBlock');
      }
      if ($('input[name="articlecheckbox"]')
        .length == size) {
        $('input[name="articlecheckboxSelectAll"]')
          .prop('checked', true);
      } else {
        $('input[name="articlecheckboxSelectAll"]')
          .prop('checked', false);
      }
    });
  $('input[name="articlecheckboxSelectAll"]')
    .change(function() {
      if ($(this)
        .is(':checked')) {
        $('input[name="articlecheckbox"]')
          .prop('checked', true);
      } else {
        $('input[name="articlecheckbox"]')
          .prop('checked', false);
      }
      $('input[name="articlecheckbox"]')
        .trigger('change');
    });
}

function createAllDraft(action, area) {
  var toBeUpdatedList = [];
  var updateDrafts = [];
  $('#ordersList')
    .find('tr[fromdraft]:visible')
    .each(function() {
      toBeUpdatedList.push($(this)
        .data("obj"));
    });
  if (action != 'S') {
    if (toBeUpdatedList.length > 0) updateDrafts = frameJSONObject(toBeUpdatedList, "U");
  } else {
    if (toBeUpdatedList.length > 0) updateDrafts = frameJSONObject(toBeUpdatedList, "S");
  }
  callCreateDraftOrderService(updateDrafts, area);
}

function createDraft(id, action, area) {
  var siteNo = $('#posSite')
    .val();
  var toBeUpdatedList = [];
  var updateDrafts = [];
  var drafts = [];
  $('#' + id)
    .find('tr[fromdraft]')
    .each(function() {
      toBeUpdatedList.push($(this)
        .data("obj"));
    });
  if (toBeUpdatedList.length > 0) updateDrafts = frameJSONObject(toBeUpdatedList, "U");
  callCreateDraftOrderService(updateDrafts, area);
}

function getDraftObj(article, article_uom, createdUser, submittedUser, updatedUser, qty, om, delivery_date, supplier, roster_date, action, draft_type,costPrice,greenLifeArticleFlag,alternate_vendor_flag) {
  var draft;
  
  if(greenLifeArticleFlag==undefined && greenLifeArticleFlag==null || greenLifeArticleFlag == "N")
	  {
  draft= {
    "iv_site": $('#posSite')
      .val(),
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
    "iv_cost_price": ((costPrice != undefined && costPrice !=null) ? costPrice : "") ,
    "iv_greenlife_flag": ((greenLifeArticleFlag != undefined && greenLifeArticleFlag != null) ? greenLifeArticleFlag : ""),
	"iv_alternate_vendor_flag" : (alternate_vendor_flag||'')
  };
  
	  }
  else
	  {
	  
	  draft= {
			    "iv_site": $('#posSite')
			      .val(),
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
// @@@@@@Popup code
function bindEventsForPopups(area, id) {
  area.find('[data-tt-parent-id="' + id + '"]').find('.salesHistory').unbind('click');
  area.find('[data-tt-parent-id="' + id + '"]').find('.salesHistory').click(function() {
      clearAllErrors();
      var obj = area.find('[data-tt-id="' + id + '"]').data("obj");
      var articleNo = obj.article == undefined ? obj.article_no : obj.article;
      var articleDesc = obj.article_desc;
      getSalesHistory(articleNo, articleDesc);
  });
  area.find('[data-tt-parent-id="' + id + '"]').find('.altPricing').unbind('click');
  area.find('[data-tt-parent-id="' + id + '"]').find('.altPricing').click(function() {
      clearAllErrors();
      var obj = area.find('[data-tt-id="' + id + '"]').data("obj");
      var articleNo = obj.article == undefined ? obj.article_no : obj.article;
      if(currentAltArticleNo != articleNo ){
    	  getAlternatePricingInfo(articleNo);
      }
      $('#dialog-alt-pricing').parent().find('.ui-dialog-title').text('Alternate Pricing for the Article');
    $("#dialog-alt-pricing").parent().addClass('popupWrapper');
    $("#dialog-alt-pricing").dialog("open");
      currentAltArticleNo = articleNo;
  });
  area.find('[data-tt-parent-id="' + id + '"]').find('.checkAllocations').unbind('click');
  area.find('[data-tt-parent-id="' + id + '"]').find('.checkAllocations').click(function() {
      clearAllErrors();
      var obj = area.find('[data-tt-id="' + id + '"]').data("obj");
      var articleNo = obj.article == undefined ? obj.article_no : obj.article;
      var deliveryDate = area.find('[data-tt-id="' + id + '"]').find('.delivery_date_valid').val();
       if(currentAlloArticleNo!=articleNo)
      getAllocationDetailsForPopUp(articleNo, deliveryDate);
      $('#dialog-allo').parent().find('.ui-dialog-title').text('Allocations for this Article');
      $("#dialog-allo").dialog("open");
      currentAlloArticleNo=articleNo;
  });
  area.find('[data-tt-parent-id="' + id + '"]').find('.checkPromotions').unbind('click');
  area.find('[data-tt-parent-id="' + id + '"]').find('.checkPromotions').click(function() {
      clearAllErrors();
      $('#curActTabF,#futActTabF').val('0');
      $(".filterTabs").tabs({
          active: 0
        });
      $("#dialog-modal-promo").dialog('open');
      $('#dialog-modal-promo').parent().find('.ui-dialog-title').text('Promotions for this Article');
      var obj = area.find('[data-tt-id="' + id + '"]').data("obj");
      var articleNo = obj.article == undefined ? obj.article_no : obj.article;
      deptNo = obj.department_no;
      category = obj.category_no;
      subCategory = obj.sub_category_no;
      segment = obj.segment_no;
      $('#articleNoHidden').val(articleNo);
      if(currentPromoArticleNo!=articleNo){
      bindEventForPromoTab();
      $('#curActTab').trigger('click');
      }
      currentPromoArticleNo=articleNo;
    });
  area.find('[data-tt-parent-id="' + id + '"]').find('#openOrdersLink').unbind('click');
  area.find('[data-tt-parent-id="' + id + '"]').find('#openOrdersLink').click(function() {
    	$("#openOrders").tabs({
          active: 0
        });
      clearAllErrors();
      var obj = area.find('[data-tt-id="' + id + '"]').data("obj");
      var articleNo = obj.article == undefined ? obj.article_no : obj.article;
      articleNumber = articleNo;
      if(currentSooArticleNo!=articleNo){
    	  getOpenOrdersForTheArticle(articleNo);
      }
      $("#dialog-openOrders").parent().addClass("popupWrapper");
      $("#dialog-openOrders").dialog("open");
      currentSooArticleNo=articleNo;
	  $('#frcstTabInPopUp').click(function() {
	      clearAllErrors();
	      var data = {
	        articleNo: articleNumber,
	        departmentList: deptNo,
	        subCat: category,
	        category: subCategory,
	        segme: segment
	      };
	      if( currentFrcstArticleNo!=articleNumber)
	      getForecastOrders(data);
	      currentFrcstArticleNo=articleNumber;
	    });
    });
}

function bindEventForPromoTab() {
	if(currentPromoArticleNo!=$('#articleNoHidden')
		      .val())
		{
  $('#curActTab')
    .click(function() {
      var flag = $('#curActTabF')
        .val();
      if ($('#curPromContent')
        .html() != '' && flag == '0') {
        $('#curActTabF')
          .val('1');
        getPromoDetails('', '', "Y", 'current', "C");
      }
    });
}
  if(currentPromoArticleNo!=$('#articleNoHidden')
	      .val())
  {
  $('#futActTab')
    .click(function() {
      var flag = $('#futActTabF')
        .val();
      if ($('#futurePromTable')
        .html() != '' && flag == 0) {
        $('#futActTabF')
          .val('1');
        getPromoDetails('', '', "Y", 'future', "F");
      }
    });
}
}

function getPromoDetails(from, to, ranged, tab, flag) {
  var param = {
    "iv_site": $('#posSite')
      .val(),
    "iv_article": $('#articleNoHidden')
      .val(),
    "iv_ranged": ranged,
    "iv_promo_start_date": from,
    "iv_promo_end_date": to,
    "iv_sales_org": $('#salesOrg')
      .val(),
    "iv_department_no": (deptNo != null && deptNo != undefined ? deptNo : ''),
    "iv_category_no": (category != null && category != undefined ? category : ''),
    "iv_sub_category_no": (subCategory != null && subCategory != undefined ? subCategory : ''),
    "iv_segment_no": (segment != null && segment != undefined ? segment : ''),
    "iv_promo_flag": flag,
    "iv_complex_pbd_flag" : "",
    "iv_session_id": ""
  };
  console.log(getOfferDetails + ' ' + JSON.stringify(param));
  $.ajax({
    type: "post",
    url: getOfferDetails,
    data: JSON.stringify(param),
    beforeSend: function() {
      clearAllErrors();
      startLoading();
    },
    success: function(response) {
      if (tab == 'current') {
        var offersArray = response;
        if (offersArray != null && offersArray != undefined && offersArray.length > 0 && offersArray[0].ErrorID == undefined) {
          $('#offerTabF')
            .val('1');
          if ($('#curPromContent')
            .html() != '') {
            if (offersArray.length > 0 && offersArray[0].ErrorID == undefined) {
              $('#curPromoCount')
                .text(offersArray.length);
              $('.currentTitle')
                .removeClass('hideBlock');
              var cur = '<tr><th class="centerValue">Type</th><th class="centerValue">Start Date</th>	<th class="centerValue">End Date</th><th class="">Promo #</th> <th class="">Description</th><th class="centerValue">UOM</th>	<!--<th class="centerValue">Standard Price</th>--><th class="centerValue">Promo Price ($)</th> <th class="centerValue lastColumn">Price Type</th>	</tr>';
              cur += formPromoContent(offersArray);
              $('#curPromContent')
                .html(cur);
              var recordCount = offersArray.length;
              var itemsOnPage = 10;
              $('.paginationDivCurrentPromo')
                .pagination({
                  items: recordCount,
                  itemsOnPage: itemsOnPage,
                  cssStyle: 'compact-theme',
                  currentPage: currentPageInCurrent,
                  onPageClick: function(pageNumber, event) {
                    showPromoPage(pageNumber, 'curPromContent', 'current');
                  }
                });
              if (recordCount / itemsOnPage > 1) {
                $('.paginationDivCurrentPromo')
                  .removeClass('hideBlock');
              } else {
                $('.paginationDivCurrentPromo')
                  .addClass('hideBlock');
              }
            }
          }
        } else {
          $('.currentTitle')
            .addClass('hideBlock');
          var error = '<div class="errorDiv promoError"><label>No Active Promotions Found.</label></div>';
          $('#curPromContent')
            .html(error);
        }
        stopLoading();
      } else if (tab == 'future') {
        var offersArray = response;
        if (offersArray != null && offersArray != undefined && offersArray.length > 0 && offersArray[0].ErrorID == undefined) {
          if (offersArray.length > 0 && offersArray[0].ErrorID == undefined) {
            $('#futurePromoCount')
              .text(offersArray.length);
            $('.futureTitle')
              .removeClass('hideBlock');
            var future = '<tr><th class="centerValue">Type</th><th class="centerValue">Start Date</th>	<th class="centerValue">End Date</th><th class="">Promo #</th> <th class="">Description</th><th class="centerValue">UOM</th>	<!--<th class="centerValue">Standard Price</th>--><th class="centerValue">Promo Price ($)</th> <th class="centerValue lastColumn">Price Type</th>	</tr>';
            future += formPromoContent(offersArray);
            $('#futurePromTable')
              .html(future);
            var recordCount = offersArray.length;
            var itemsOnPage = 10;
            var currentPage = 1;
            $('.paginationDivFuturePromo')
              .pagination({
                items: recordCount,
                itemsOnPage: itemsOnPage,
                cssStyle: 'compact-theme',
                currentPage: currentPageInFuture,
                onPageClick: function(pageNumber, event) {
                  showPromoPage(pageNumber, 'futurePromTable', 'future');
                }
              });
            if (recordCount / itemsOnPage > 1) {
              $('.paginationDivFuturePromo')
                .removeClass('hideBlock');
            } else {
              $('.paginationDivFuturePromo')
                .addClass('hideBlock');
            }
          }
        } else {
          $('.futureTitle')
            .addClass('hideBlock');
          var error = '<div class="errorDiv promoError"><label>No Future Promotions Found.</label></div>';
          $('#futurePromTable')
            .html(error);
        }
        stopLoading();
      }
    },
    error: function() {
      // showError('Sorry, Some technical issue occured.');
      stopLoading();
    },
  });
}

function formPromoContent(offersArr) {
  var content = '';
  for (var i = 0; i < offersArr.length; i++) {
    content += '<tr><td class="centerValue">' + offersArr[i].promo_type + '</td>	<td class="centerValue">' + offersArr[i].promo_start_date + '</td> <td class="centerValue">' + offersArr[i].promo_end_date + '</td><td class="">' + offersArr[i].promo_off_no + '</td>	<td class="">' + offersArr[i].promo_desc + '</td>	<td class="centerValue">' + offersArr[i].uom + '</td><!-- <td class="centerValue">' + offersArr[i].pos_price + '</td>--><td class="centerValue">' + offersArr[i].promo_price + '</td> <td class="centerValue lastColumn">' + offersArr[i].promo_price_type + '</td>	</tr>';
  }
  return content;
}

function getSalesHistory(articleNo, articleDesc) {
  var param = {
    "iv_article": articleNo,
    "iv_site": $('#posSite')
      .val(),
    "iv_ranged": "Y",
    "iv_session_id": "12345",
    "iv_start_date": getDesiredPastDate(22),
    "iv_end_date": getDesiredPastDate(1)
  };
  startLoading();
  /*
   * $.post( getSalesHistoryURL,JSON.stringify(param)) .done(function(
   * response ) {
   */
  $('.articleNoAndName')
    .text(articleNo + ' - ' + articleDesc);
  $('.unitOrCarton')
    .text();
  $('.cartonQty')
    .text();
  var salesHstryList = '';
  var content = '';
  if (salesHstryList != null && salesHstryList != undefined && salesHstryList.length > 0) {
    for (var i = 0; i < salesHstryList.length; i++) {
      var total = Number(salesHstryList[i].day1_sales) + Number(salesHstryList[i].day2_sales) + Number(salesHstryList[i].day3_sales) + Number(salesHstryList[i].day4_sales) + Number(salesHstryList[i].day5_sales) + Number(salesHstryList[i].day6_sales) + Number(salesHstryList[i].day7_sales);
      content += '<tr><td>' + salesHstryList[i].week + '</td><td>' + salesHstryList[i].day1_sales + '</td><td>' + salesHstryList[i].day2_sales + '</td><td>' + salesHstryList[i].day3_sales + '</td><td>' + salesHstryList[i].day4_sales + '</td><td>' + salesHstryList[i].day5_sales + '</td><td>' + salesHstryList[i].day6_sales + '</td><td>' + salesHstryList[i].day7_sales + '</td><td class="sorted lastColumn">' + total + '</td></tr>';
    }
    $('#salesHistContent')
      .html(content);
  } else {
    var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
    $('#salesHistContent')
      .closest('table')
      .html(error);
  }
  stopLoading();
  $("#dialog-modal-his")
    .dialog("open");
  /* }); */
}

function getDesiredPastDate(count) {
  var desiredDate = '';
  var thatDay = new Date(new Date()
    .getTime() - 86400000 * count);
  var newDate = thatDay.getDate();
  var newMonth = thatDay.getMonth() + 1;
  if (newDate < 10) {
    newDate = '0' + newDate;
  }
  if (newMonth < 10) {
    newMonth = '0' + newMonth;
  }
  desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
  return desiredDate;
}

function getDesiredFutureDate(count) {
  var desiredDate = '';
  var thatDay = new Date(new Date()
    .getTime() + 86400000 * count);
  var newDate = thatDay.getDate();
  var newMonth = thatDay.getMonth() + 1;
  if (newDate < 10) {
    newDate = '0' + newDate;
  }
  if (newMonth < 10) {
    newMonth = '0' + newMonth;
  }
  desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
  return desiredDate;
}

function getOrdersHeaderContent(key,obj) {
	var ordersHeaderContent = '';
	  var tableFooter = '<tfoot><tr class="groupByTr1"><td colspan="15" class=""><div class="pageActions " style="padding:10px 0px">' + '<label><strong>Total Ordered Qty.: <b class="totalCarton">0</b></strong></label>' + '<label class="actionBtn save" id="editAction_' + key + '"><a ><label class="saveBtn">Save</label></a></label>'
	  + '<label class="actionBtn validateRoaster" id="validate_' + key + '"><a ><label class="validate">Validate</label></a></label>'
	  + '<label class="actionBtn submit" id="createOrder_' + key + '"><a ><label class="thumbUp">Create</label></a></label>' + '</div>' + '</td>' + '</tr></tfoot>';
	  if(obj.greenlife_flag=="Y") {
		  ordersHeaderContent = '<table id="datatable_' + key + '" class="ContentTable drilldownTable tableSorter treetab ordersTable">' + '<thead class="groupByTr1 table-sort-hdr"> <th class="noSort expander" width="15px" colspan="1"><span class="indenter"><a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>' + '<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>' + '</span></th> <th data_prop="article">Article</th>' + ' <th data_prop="article_desc">Description</th> <th data_prop="soh"  class="centerValue title" title="Stock on Hand">SOH</th> <th data_prop="qty" class="centerValue" width="75px">Order Qty.</th>   <th data_prop="cost_price" class="centerValue">Cost Price</th>'
	  + ' <th data_prop="om" class="centerValue title" title="Order Multiple" width="50px">OM</th> <th data_prop="total_qty" class="centerValue">Total Units Ordered</th> <th data_prop="delivery_date" class="centerValue">Delivery Date</th> <th data_prop="status" class="centerValue">Status</th>' + ' <th class="lastColumn centerValue noSort onEditOnly">Actions</th> </thead>' + tableFooter + '<tbody class="tbody"></tbody></table>';
	  }else {
		  ordersHeaderContent = '<table id="datatable_' + key + '" class="ContentTable drilldownTable tableSorter treetab ordersTable">' + '<thead class="groupByTr1 table-sort-hdr"> <th class="noSort expander" width="15px" colspan="1"><span class="indenter"><a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>' + '<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>' + '</span></th> <th data_prop="article">Article</th>' + ' <th data_prop="article_desc">Description</th> <th data_prop="soh"  class="centerValue title" title="Stock on Hand">SOH</th> <th data_prop="qty" class="centerValue" width="75px">Order Qty</th>' 
	  + ' <th data_prop="om" class="centerValue title" title="Order Multiple" width="50px">OM</th> <th data_prop="total_qty" class="centerValue">Total Units Ordered</th> <th data_prop="delivery_date" class="centerValue">Delivery Date</th> <th data_prop="status" class="centerValue">Status</th>' + ' <th class="lastColumn centerValue noSort onEditOnly">Actions</th> </thead>' + tableFooter + '<tbody class="tbody"></tbody></table>';
	  }
	  return ordersHeaderContent;
	}
function triggerSort(prop, thead, flag, tableId) {
  var toBeSortList = [];
  $('#' + tableId)
    .find('tr[mainrow]')
    .each(function() {
      toBeSortList.push($(this)
        .data("obj"));
    });
  // var supplier = $draftParent.attr('data_supplier_no');
  // var list = ibtMap[supplier];
  sortBasedOnHdr(toBeSortList, prop, thead, flag);
  frameDraftRows(toBeSortList, tableId);
  // frameIBTArticleList(list, 'NEW', flag);
}

function tempSort(id) {
  $('#' + id + ' .table-sort-hdr th')
    .not($('.table-sort-hdr th.noSort'))
    .click(function() {
      var flag = true;
      var tableId = $(this)
        .closest('table')
        .attr('id');
      var supplier = $(this)
        .closest('tr')
        .attr('data_supplier_no');
      /*
       * $draftParent = $(this).closest('tbody').find(
       * '.expand-collapse-add-hdr[data_supplier_no="' +
       * supplier + '"]');
       */
      if ($(this)
        .hasClass('sorted')) {
        if ($(this)
          .hasClass('ascending')) {
          flag = false;
        }
      }
      $(this)
        .closest('tr')
        .find('th')
        .removeClass('sorted')
        .removeClass('ascending')
        .removeClass('descending');
      var prop = $(this)
        .attr('data_prop');
      var thead = $(this);
      if (prop != '' && prop != undefined) {
        triggerSort(prop, thead, flag, id);
      }
    });
}

function sortBasedOnHdr(list, prop, thead, flag) {
  if (!flag) {
    $(thead)
      .addClass('sorted')
      .removeClass('ascending')
      .addClass('descending');
    // flag=false;
  } else {
    $(thead)
      .addClass('sorted')
      .addClass('ascending')
      .removeClass('descending');
    // flag=true;
  }
  $.fn.sortArrOfObjectsByParam(list, prop, flag);
}

function frameDraftRows(response, tableId) {
  var area = $('#myDrafts')
    .find('#ordersList');
  area.find('#' + tableId + ' .tbody')
    .html('');
  for (var i in response) {
    var supplierNo = response[i].supplier == undefined ? (response[i].supplier_no) : (response[i].supplier);
    var articleNo = response[i].article == undefined ? response[i].article_no : response[i].article;
    if (response[i].article_uom == null) response[i].article_uom = "";
    var id = articleNo + '_' + supplierNo;
    var rowContent = getOrdersAsHTML(response[i]);
    $('.ordersTable')
      .treetable('destroy');
    $('.ordersTable')
      .find('.expandTd')
      .html('<span class="indenter">&nbsp;</span>');
    area.find('#' + tableId + ' .tbody')
      .append(rowContent);
    area.find('#' + tableId + ' .tbody')
      .find('[data-tt-id="' + id + '"]')
      .data('obj', response[i]);
    $('.ordersTable')
      .treetable({
        expandable: true
      });
    bindEventForOrders(response[i], area);
  }
  bindAccordionClickEvent();
  area.find('#' + tableId)
    .find('.collapseAll')
    .trigger('click');
}

function callCreateDraftOrderService(drafts, area, from) {
  var param = {
    "ItemArray": drafts
  };
  console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
  $.post(createOrdersDraftList, JSON.stringify(param))
    .done(function(data) {
      console.log('Added to My draft:' + data[0].msg);
      if (data[0].msg_type == 'S') {
    	  var successMsg=[];
    	  successMsg.push(data[0].msg);
        //showStatusContent(successMsg);
    	  bindSubmitEnableDisable();
      } else if (data[0].msg == undefined) {
        showAllErrors([mobiSerErrMsg], area);
        if (drafts[0].iv_action == 'D') {
          for (var i = 0; i < drafts.length; i++) {
            var response = [];
            var reqObject = {
              "article": drafts[i].iv_article,
              "supplier": drafts[i].iv_supplier,
              "article_uom": drafts[i].iv_article_uom
            };
            response.push(reqObject);
            removeExistingRow(response, area);
          }
        }
      }
      /*if(from != undefined && from == 'directAdd')
      	{
      	
      	}*/
    });
}

function deleteDraft(toBeDeletedList, action, area) {
  var siteNo = $('#posSite')
    .val();
  var drafts = [];
  if (toBeDeletedList.length > 0) {
    var article, article_uom, qty, om, delivery_date, supplier, createdUser, updatedUser, updatedUser, roster_date, submittedUser, draft_type;
    draft_type = '';
    for (var count = 0; count < toBeDeletedList.length; count++) {
      var articleNo = toBeDeletedList[count].article == undefined ? toBeDeletedList[count].article_no : toBeDeletedList[count].article;
      var supplierNo = toBeDeletedList[count].supplier == undefined ? (toBeDeletedList[count].supplier_no) : (toBeDeletedList[count].supplier);
      var srcOfSupply = toBeDeletedList[count].source_of_supply == undefined ? toBeDeletedList[count].source : toBeDeletedList[count].source_of_supply;
      if (supplierNo == null) supplierNo = "";
      article = articleNo;
      article_uom = toBeDeletedList[count].article_uom;
      qty = toBeDeletedList[count].qty;
      om = toBeDeletedList[count].om;
      if (toBeDeletedList[count].delivery_date != null && toBeDeletedList[count].delivery_date != "") delivery_date = formatDateToMDY(toBeDeletedList[count].delivery_date);
      else delivery_date = "";
      supplier = supplierNo;
      if (srcOfSupply == '1') {
        draft_type = "PO";
      } else if (srcOfSupply == '2') {
        draft_type = "SO";
      }
      createdUser = toBeDeletedList[count].created_user;
      if (createdUser == undefined) createdUser = $('#loginUserId')
        .val();
      updatedUser = toBeDeletedList[count].updated_user;
      if (updatedUser == '') updatedUser = $('#loginUserId')
        .val();
      if (updatedUser == undefined) updatedUser = $('#loginUserId')
        .val();
      roster_date = toBeDeletedList[count].roster_date;
      if (roster_date == undefined) roster_date = "";
      submittedUser = toBeDeletedList[count].submitted_user;
      if (submittedUser == undefined) submittedUser = "";
      drafts.push(getDraftObj(article, article_uom, createdUser, submittedUser, updatedUser, qty, om, delivery_date, supplier, roster_date, action, draft_type,(toBeDeletedList[count].alternate_vendor_flag||'')));
    }
  }
  callCreateDraftOrderService(drafts, area);
}

function confirmation(obj, action, row, area) {
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .find('#ok')
    .find('label')
    .text('Yes');
  $("#dialog-confirmation")
    .find('#message')
    .html("Are you sure you want to remove the <strong>" + obj[0].article_desc + "</strong> from the order?");
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
      obj.deleteFlag = true;
      toDeleteUpdate.push(obj);
      var dat = $('tr[data-tt-id="' + row + '"]')
        .closest('table')
        .attr('id');
      if ($("#" + dat + ' tbody')
        .length == 2 && $("#datatable .grpTbody .rowHighlight")
        .length == 1) {
        $('#datatable')
          .remove();
      } else if ($("#" + dat + ' tbody')
        .length == 2 && $("#datatable .grpTbody .rowHighlight")
        .length > 1) {
        var trRemove = $('tr[data-tt-id="' + row + '"]')
          .closest('table')
          .attr('id')
          .split("_")[1];
        $('tr[data-tt-id="' + trRemove + '"]')
          .remove();
        $('tr[data-tt-id="' + trRemove + '_sub"]')
          .remove();
        $('tr[data-tt-id=datatable_' + trRemove + ']')
          .remove();
        $('tr[data-tt-id="' + row + '"]')
          .next()
          .remove();
        $('tr[data-tt-id="' + row + '"]')
          .remove();
      } else {
        $('tr[data-tt-id="' + row + '"]')
          .next()
          .remove();
        $('tr[data-tt-id="' + row + '"]')
          .remove();
      }
      if (isGrouped) {
        var totalCar = 0;
        $("#" + dat)
          .find('.orderQty')
          .each(function() {
            totalCar += Number(isNaN($(this)
                .val()) ? 0 : $(this)
              .val());
          });
        $("#" + dat)
          .find('.totalCarton')
          .text(totalCar);
        var totalGrpCar = 0;
        $('.orderQty')
          .each(function() {
            totalGrpCar += Number(isNaN($(this)
                .val()) ? 0 : $(this)
              .val());
          });
        $('.totalGroupCarton')
          .text(totalGrpCar);
      }
      deleteDraft(obj, action, area);
      var articleNo = obj[0].article == undefined ? obj[0].article_no : obj[0].article;
      var supplierNo = obj[0].supplier == undefined ? (obj[0].supplier_no) : (obj[0].supplier);
      if (globalData.length > 0) {
        globalData = $.grep(globalData, function(item) {
          return ((item.article == undefined ? item.article_no : item.article) != articleNo) && ((item.supplier == undefined ? item.supplier_no : item.supplier) != supplierNo);
        });
      }
      if($('#myOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active'))
      {
      if(area.find('#datatable tbody tr').length == 0)
    	  {
    	  area.find('#datatable tfoot ').addClass('hideBlock'); 
    	  }
    }else if($('#allOrdersBtn')
	          .parent()
	          .hasClass('ui-state-active', 'ui-tabs-active'))
    	{
    	if($('#ordersList #datatable tbody tr').length == 0)
  	  {
    		$('#ordersList #datatable tfoot ').addClass('hideBlock'); 
  	  }
    	}
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
    });
  $("#dialog-confirmation")
    .find('#cancel')
    .find('label')
    .text('No');
  $("#dialog-confirmation")
    .find('#cancel')
    .removeClass('hideBlock');
  $("#dialog-confirmation")
    .find('#cancel')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#cancel')
    .click(function() {
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
    });
}




function addAriclesFromSearch(response, area, groupBy) {
  if (response[0].article != undefined || response[0].article_no != undefined) {
    var myDraftGrp = $groupBy(response, function(obj) {
      if (groupBy == 'deliveryDate') {
        obj.new_del_date = obj.delivery_date.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
        if(obj.greenlife_flag=="Y") {
        return "gl"+obj.new_del_date;
        }
        else {
        	return obj.new_del_date;
        }
      } else if (groupBy == 'user') {
        var loggedInUserId = $('#loginUserId')
          .val();
        obj.created_user = (obj.created_user != null && obj.created_user != undefined) ? obj.created_user : loggedInUserId;
        if(obj.greenlife_flag=="Y") {
            return "gl"+obj.created_user;
            }
            else {
            	return obj.created_user;
            }
      } else if (groupBy == 'department') {
        obj.new_dept = (obj.dept_dtls != undefined ? obj.dept_dtls : obj.dept_no_name)
          .replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
        if(obj.greenlife_flag=="Y") {
            return "gl"+obj.new_dept;
            }
            else {
            	return obj.new_dept;
            }
      } else if (groupBy == 'supplier') {
          if(obj.greenlife_flag=="Y") {
              return "gl"+obj.supplier == undefined ? obj.supplier_no : obj.supplier;
              }
              else {
              	return obj.supplier == undefined ? obj.supplier_no : obj.supplier;
              }
      } else if (groupBy == 'empty') {
          if(obj.greenlife_flag=="Y") {
          return "gl"+obj.is_empty;
      }
      else {
      	return obj.is_empty;
      }
      }
    });
    console.log("SERACH"+myDraftGrp);
    if (area.html() == '') {
      area.html(groupHeader);
      bindEventForGroupHeader(area);
    }
    for (key in myDraftGrp) {
      if (key != '' && key != null && key != undefined) {
        keyList = myDraftGrp[key];
        var id = 'groupBy_' + key;
        var list = myDraftGrp[key];
        var grpContent = getGroupByContent(key, groupBy, list[0]);
        area.find('.groupedTable')
          .treetable('destroy');
        area.find('.groupedTable')
          .find('.expandTd')
          .html('<span class="indenter">&nbsp;</span>');
        area.find('.groupedTable .grpTbody')
          .append(grpContent);
        addAriclesToGroupTD(keyList, area.find('.groupedTable')
          .find('#' + id), key, 'fromdraft');
        area.find('.groupedTable')
          .treetable({
            expandable: true
          });
        var reqTableId = 'datatable_' + key;
        tempSort(reqTableId);
      }
    }
    bindEventForGroupHeader();
  }
}

function frameJSONObject(x, action, oorDraft) {
  var drafts = [];
  if (x.length > 0) {
    var article, article_uom, qty, om, delivery_date, supplier, createdUser, updatedUser, updatedUser, roster_date, submittedUser, draft_type,costPrice,greenLifeArticleFlag;
    for (var count = 0; count < x.length; count++) {
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
      qty = x[count].qty;
      if (qty == null) qty = "";
      om = x[count].om;
      if (x[count].delivery_date != null && x[count].delivery_date != undefined && x[count].delivery_date != "") delivery_date = formatDateToMDY(x[count].delivery_date);
      else delivery_date = "";
      // delivery_date=x[count].delivery_date;
      supplier = supplierNo;
      createdUser = $('#loginUserId')
        .val();
      roster_date = roasterDate;
      if (roster_date == undefined || roster_date == null) roster_date = '';
      if (oorDraft == undefined || oorDraft == ''){
    	  if (srcOfSupply == '1') {
    	        draft_type = "PO";
    	      } else if (srcOfSupply == '2') {
    	        draft_type = "SO";
    	      } 
      }else draft_type = "POR";
      drafts.push(getDraftObj(article, article_uom, createdUser, submittedUser, updatedUser, qty, om, delivery_date, supplier, roster_date, action, draft_type,costPrice,greenLifeArticleFlag,(x[count].alternate_vendor_flag||'')));
    }
  }
  return drafts;
}

function validateFieldsInCreateOrders(clickedSave, from, flag) {
	createOdrHandleMsg = true;
  if ((clickedSave.id)
    .split('_')[1] == $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1]) {
	 var focusElem = '';
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    var orderQtyFlag = true;
    var orderErrorExists = false;
    var costPriceFlag = true;
    var costPriceErrorExists = false;
    var orderLimitFlag = false;
    
    //limitOrderQty = 50;
    //var totOrderQty = 0;
    if ((flag == undefined)) {
      $('#' + tableId + ' input.orderQty ')
        .each(function() {
          orderQtyFlag = $(this)
            .preqQtyValid(clickedSave, true, from);
          var maxOrderQtyErrMsg = false;
          //var id = $(this).closest('table').attr('id');
          var id = $(this).parent().closest('tbody tr[mainrow]').attr('data-tt-id');
          maxOrderQtyErrMsg =maxOrderQtyValidation(id, $('#' + id)
  	            .closest('div#ordersList'), '', Number($(this)
                  .val()));
          if (!orderQtyFlag) {
            orderErrorExists = true;
            if(focusElem == ''){
            	focusElem = $(this);
            }
            var treeid = $(this).closest('table').attr('id').split('_')[1];
            $('#datatable').treetable("expandNode",treeid);
          }else if(maxOrderQtyErrMsg != ''){ 
        	  var treeid = $(this).closest('table').attr('id').split('_')[1];
              $('#datatable').treetable("expandNode",treeid);  
              $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), maxOrderQtyErrMsg);
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            orderErrorExists = true;
            }else if (Number($(this).val()) > limitOrderQty && ($(clickedSave).hasClass('validateRoaster') || 
               $(clickedSave).hasClass('validateAll'))) {
            //$(this).error();
            /*$(this)
              .error('Ordered Quantity > '+limitOrderQty+'(limit Quantity)');*/
            orderLimitFlag = true;
          }
       /*   totOrderQty += Number($(this)
            .val());*/
        });
      
      $('#' + tableId + ' input.costPrice ')
      .each(function() {    	  
    	  costPriceFlag = $(this).costPriceValid(clickedSave, true, from);
        if (!costPriceFlag) {
        	costPriceErrorExists = true;          
        }
      });
      	
    }
    if (flag) {
      $('#' + tableId + ' input.orderQty ')
        .each(function() {
          if ($(this)
            .val() == '' || $(this)
            .val() == 0) orderQtyFlag = false;
          if (!orderQtyFlag) {
    	  if(focusElem == ''){
          	focusElem = $(this);
          }
    	  var treeid = $(this).closest('table').attr('id').split('_')[1];
          $('#datatable').treetable("expandNode",treeid);
            orderErrorExists = true;
          }
        });
    }
    //Commenting Since No need of popup - Order Redesign Changes
    if (orderLimitFlag) {
    	createOdrHandleMsg = false;
      orderQtyConfirmation($(this), clickedSave, from);
      return false;
    }
    /* else if (totOrderQty > 999) {
      totalOrderQtyConfirmation($(this), clickedSave, from);
      return false;
    }*/
    var delivryDateFlag1;
    var delivryDateFlag2;
    var delivryDateFlag3;
    //var delivryDateFlag4;
    var deliveryDateErrorExists = false;
    $('#' + tableId + ' input.delivery_date_valid ')
      .each(function() {
        // if (delivryDateFlag)
        var obj = $(this)
          .closest('tr')
          .data("obj");
        var next_avl_del_date = "";
        if (obj.next_delivery_date != null && obj.next_delivery_date != undefined && obj.next_delivery_date != "") next_avl_del_date = obj.next_delivery_date;
        delivryDateFlag1 = $(this)
          .required();
        delivryDateFlag2 = isValidDate($(this)
          .val());
        delivryDateFlag3 = isPastDate($(this)
          .val());
        //Commenting for Order Redesign changes
       /* delivryDateFlag4= isRushOrder($(this)//added for defect 5590
          .val(),obj);
        if (!delivryDateFlag1 || !delivryDateFlag2 || delivryDateFlag3 || delivryDateFlag4) {*/
        if (!delivryDateFlag1 || !delivryDateFlag2 || delivryDateFlag3) {
          if (!delivryDateFlag1) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Delivery date is Mandatory.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          } else if (!delivryDateFlag2) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Invalid Date.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }          
         else if (delivryDateFlag3) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Roster for this delivery date has expired.Next delivery date is " + formatDateMobi(next_avl_del_date) + "");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }
          //Commenting for Order Redesign Changes
         /* else if (delivryDateFlag4) {//added for defect 5590
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "You must obtain approval from the warehouse and National Order Room prior to submitting this order.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
          }*/
          if(focusElem == ''){
          	focusElem = $(this);
          }
          var treeid = $(this).closest('table').attr('id').split('_').length > 2 ? $(this).closest('table').attr('id').split('_')[2] : $(this).closest('table').attr('id').split('_')[1] ;
          $('#datatable').treetable("expandNode",treeid);
        }
      });
    if(focusElem != undefined && focusElem != '')
    focusElem.focus();
    if (!orderErrorExists && !deliveryDateErrorExists && !costPriceErrorExists) return true;
    else return false;
  } else {
    console.log('success');
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    var orderQtyFlag = true;
    $('#' + tableId + ' input.orderQty ')
      .each(function() {
        if (orderQtyFlag) orderQtyFlag = $(this)
          .preqQtyValid(clickedSave, true);
      });
    var delivryDateFlag = $('#' + tableId + ' input.delivery_date_valid ')
      .required();
    var delivryDateFlag2 = isValidDate($('#' + tableId + ' input.delivery_date_valid ')
      .val());
    var delivryDateFlag3 = isPastDate($('#' + tableId + ' input.delivery_date_valid ')
      .val());
    //Commenting Order Redesign Changes
   /* var delivryDateFlag4 = isRushOrder($('#' + tableId + ' input.delivery_date_valid ')//added for defect 5590
      .val(),obj);
     if (delivryDateFlag4) {
            $('#' + tableId + ' input.delivery_date_valid ')
              .addClass(errorFieldClass);
            addtooltip($('#' + tableId + ' input.delivery_date_valid '), "You must obtain approval from the warehouse and National Order Room prior to submitting this order.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
          }
    if (orderQtyFlag && delivryDateFlag && delivryDateFlag3 && delivryDateFlag2 && !delivryDateFlag4) return true;*/
    if (orderQtyFlag && delivryDateFlag && delivryDateFlag3 && delivryDateFlag2) return true;
    else return false;
  }
}

function isRushOrder(delivery_date,obj)//added for defect 5590
{
	if((obj.source != undefined && obj.source != null && obj.source == '2') || (obj.source_of_supply != undefined && obj.source_of_supply != null && obj.source_of_supply == '2'))
		{
		if(obj.next_delivery_date!=null && obj.next_delivery_date!= '' && compareDate(delivery_date,formatDateMobi(obj.next_delivery_date)) == 'lt')
			{
			return true;
			}
		if(compareDate(delivery_date,getDesiredFutureDate(0)) == 'eq')
			{
			return true;
			}
		if((obj.roster_date != undefined && obj.roster_date != null && obj.roster_date != '') || (obj.roaster_date != undefined && obj.roaster_date != null && obj.roaster_date == ''))
			{
			return false;
			}
		else
			return true;
		}
	return false;
}

function validateFieldValues(clickedSave, flag) {
  if ((clickedSave.id)
    .split('_')[1] == $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1] && (clickedSave.id)
    .split('_')[1] != undefined && $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1] != undefined) {
    console.log('success');
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    var orderQtyFlag;
    var orderErrorExists = false;
    if (flag == undefined) {
      $('#' + tableId + ' input.orderQty ')
        .each(function() {
          orderQtyFlag = $(this)
            .preqQtyValid(clickedSave, false);
          var maxOrderQtyErrMsg = false;
          //var id = $(this).closest('table').attr('id');
          var id = $(this).parent().closest('tbody tr[mainrow]').attr('data-tt-id');
          maxOrderQtyErrMsg =maxOrderQtyValidation(id, $('#' + id)
    	            .closest('div#ordersList'), '', Number($(this)
                    .val()));
          if (!orderQtyFlag){
          	 var treeid = $(this).closest('table').attr('id').split('_')[1];
               $('#datatable').treetable("expandNode",treeid);
          	orderErrorExists = true;        
          }else if(maxOrderQtyErrMsg != ''){  
        	  var treeid = $(this).closest('table').attr('id').split('_')[1];
              $('#datatable').treetable("expandNode",treeid);  
              $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), maxOrderQtyErrMsg);
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            orderErrorExists = true;
          }
        });
    }
    var delivryDateFlag;
    var deliveryDateErrorExists = false;
    $('#' + tableId + ' input.delivery_date_valid ')
      .each(function() {
        if (this.value != "") {
          var obj = $(this)
            .closest('tr')
            .data("obj");
          var next_avl_del_date = "";
          if (obj.next_delivery_date != null && obj.next_delivery_date != undefined && obj.next_delivery_date != "") next_avl_del_date = obj.next_delivery_date;
          delivryDateFlag = isValidDate(this.value);
        //Commenting Order Redesign Changes
          var delivryDateFlag3 = isPastDate($(this)
            .val());
         /* var delivryDateFlag4 = isRushOrder($(this)
            .val(),obj);//added for defect 5590*/
          if (!delivryDateFlag) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Invalid Date.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }          
          else if (delivryDateFlag3) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Roster for this delivery date has expired.Next delivery date is " + formatDateMobi(next_avl_del_date) + "");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          } //Commenting Order Redesign Changes
          /*else if (delivryDateFlag4) {//added for defect 5590
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "You must obtain approval from the warehouse and National Order Room prior to submitting this order.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }*/
        }
      });
    if (!orderErrorExists && !deliveryDateErrorExists) return true;
    else {$.fn.showCustomMsg(['Please correct the highlighted fields'],error);return false;}
  } else {
    console.log('success');
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    var orderQtyFlag = true;
    var orderErrorExists = false;
    $('#' + tableId + ' input.orderQty ')
      .each(function() {
        orderQtyFlag = $(this)
          .preqQtyValid(clickedSave, false);
        var maxOrderQtyErrMsg = false;
        maxOrderQtyErrMsg =maxOrderQtyValidation(tableId, $('#' + tableId), $('#' + tableId)
	            .closest('div#ordersList'), '', Number($(this)
                .val()));
        if (!orderQtyFlag){
        	 var treeid = $(this).closest('table').attr('id').split('_')[1];
             $('#datatable').treetable("expandNode",treeid);
        	orderErrorExists = true;        
        }else if(maxOrderQtyErrMsg != ''){
      	 // $.fn.showCustomMsg([maxOrderQtyErrMsg], error, "Roaster Date Validation");  
      	  var treeid = $(this).closest('table').attr('id').split('_')[1];
            $('#datatable').treetable("expandNode",treeid);  
            $(this)
            .addClass(errorFieldClass);
          addtooltip($(this), maxOrderQtyErrMsg);
          $(".tooltip")
            .tooltip({
              position: {
                my: "left center",
                at: "right+10 center"
              }
            });
          orderErrorExists = true;
        }
      });
    var delivryDateFlag;
    var deliveryDateErrorExists = false;
    $('#' + tableId + ' input.delivery_date_valid ')
      .each(function() {
        if (this.value != "") {
          var obj = $(this)
            .closest('tr')
            .data("obj");
          var next_avl_del_date = "";
          if (obj.next_delivery_date != null && obj.next_delivery_date != undefined && obj.next_delivery_date != "") next_avl_del_date = obj.next_delivery_date;
          delivryDateFlag = isValidDate(this.value);
        //Commenting for Order Redesign Changes
          
          var delivryDateFlag3 = isPastDate($(this)
            .val());
          /*   var delivryDateFlag4 = isRushOrder($(this)
            .val(),obj);*/
          if (!delivryDateFlag) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Invalid Date.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }          
          else if (delivryDateFlag3) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "Roster for this delivery date has expired.Next delivery date is " + formatDateMobi(next_avl_del_date) + "");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          } //Commenting for Order Redesign Changes
          /*else if (delivryDateFlag4) {
            $(this)
              .addClass(errorFieldClass);
            addtooltip($(this), "You must obtain approval from the warehouse and National Order Room prior to submitting this order.");
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            deliveryDateErrorExists = true;
          }*/
        }
      });
    if (!orderErrorExists && !deliveryDateErrorExists) return true;
    else {$.fn.showCustomMsg(['Please correct the highlighted fields'],error);return false;}
  }
}

function orderQuantityConfirmationAfterNoClick(clickedSave) {
  if ((clickedSave.id)
    .split('_')[1] == $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1] && (clickedSave.id)
    .split('_')[1] != undefined && $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1] != undefined) {
    console.log('success');
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    $('#' + tableId + ' input.orderQty ')
      .each(function() {
        if (($(this)
            .val()
            .trim() > limitOrderQty)) {
          /*$(this)
            .val('');*/
        }
      });
  } else {
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    $('#' + tableId + ' input.orderQty ')
      .each(function() {
        if (($(this)
            .val()
            .trim() > limitOrderQty)) {
         /* $(this)
            .val('');*/
        }
      });
  }
}

function bindDisableFields(area) {
  var groupByValue = (area.find('#articleSearchFormForCreate')
    .attr('data-groupby-value'));
  var groupBy = (area.find('#articleSearchFormForCreate')
    .attr('data-groupby'));
  if (groupBy == 'department') {
    var nodeId = groupByValue.substring(0, 2);
    area.find('#ordersList')
      .find('#nodeLevel')
      .val('2');
    area.find('#ordersList')
      .find('#nodeId')
      .val(nodeId);
  } else if (groupBy == 'deliveryDate') {
    var day = groupByValue.substring(0, 2);
    var month = groupByValue.substring(2, 4);
    var year = groupByValue.substring(4, 8);
    var formattedDate = (day + '/' + month + '/' + year);
    area.find('[name="deliveryDate"]')
      .val(formattedDate);
    area.find('[name="deliveryDate"]')
      .prop('disabled', true);
    area.find('[name="deliveryDate"]')
      .removeClass('inputDate');
  } else if (groupBy == 'supplier') {
    var supplierLength = groupByValue.trim()
      .length;
    if (supplierLength == 4) {
      area.find('#ordersList')
        .find('select')
        .val(groupByValue);
      area.find('#ordersList')
        .find('input[type="radio"][value="warehouse"]')
        .trigger('click');
      area.find('#ordersList')
        .find('input[type="radio"]')
        .prop('disabled', true);
      area.find('#ordersList')
        .find('select')
        .prop('disabled', true);
      area.find('#ordersList')
        .find('#srcIndicator')
        .val('2');
      area.find('#ordersList')
        .find('select')
        .val(groupByValue);
    } else if (supplierLength > 4) {
      area.find('#ordersList')
        .find('#nodeLevel')
        .val('1');
      area.find('#ordersList')
        .find('input[id="vendorText"]')
        .val(groupByValue);
      area.find('#ordersList')
        .find('input[type="radio"][value="vendor"]')
        .trigger('click');
      area.find('#ordersList')
        .find('input[type="radio"]')
        .prop('disabled', true);
      area.find('#ordersList')
        .find('input[id="vendorText"]')
        .prop('disabled', true);
      area.find('#ordersList')
        .find('label[id="verifySupplier1"]')
        .addClass('hideBlock');
      area.find('#ordersList')
        .find('#vendorText')
        .val(groupByValue);
      area.find('#ordersList')
      .find('#isVerified')
      .val(true);
    } else {
      area.find('#ordersList')
        .find('#nodeLevel')
        .val('');
    }
  }
}

function formFilterContent(response, area, dataBind) {
  if (response.length > 0) {
	  var greenLifeArticleExists = false;
	  for (var i in response)
		  {
		  if(response[i].greenlife_flag=="Y" )
			  {
			  greenLifeArticleExists = true;
			  break;
			  }
		  }
    if (area.html() == '') {
    	if(!greenLifeArticleExists)
    		area.html(ordersHeader);
    	else if(greenLifeArticleExists)
    		area.html(ordersHeaderIfGreenlifeArticleExist);		
      bindEventForHeader();
      bindOnpageFilterEvent();
    }
    for (var i in response) {
      var articleNo = response[i].article == undefined ? response[i].article_no : response[i].article;
      var supplierNo = response[i].supplier == undefined ? (response[i].supplier_no) : (response[i].supplier);
      if (response[i].article_uom == null) response[i].article_uom = "";
      var id = articleNo + '_' + supplierNo;
      var rowContent = getOrdersAsHTML(response[i], dataBind,greenLifeArticleExists);
      area.find('.groupedTable')
        .treetable('destroy');
      area.find('.groupedTable')
        .find('.expandTd')
        .html('<span class="indenter">&nbsp;</span>');
      area.find('.groupedTable .grpTbody')
        .append(rowContent);
      area.find('.groupedTable .grpTbody')
        .find('[data-tt-id="' + id + '"]')
        .data('obj', response[i]);
      // addAriclesToGroupTD(keyList, area.find('.groupedTable').find('#'
      // + id),key,'fromDraft',groupBy);
      area.find('.groupedTable')
        .treetable({
          expandable: true
        });
      bindEventForOrders(response[i], area);
    }
    //var reqTableId = 'datatable';
    bindAccordionClickEvent('filter');
  }
}

function bindOnpageFilterEvent() {
  // NEW selector
  jQuery.expr[':'].Contains = function(a, i, m) {
    return jQuery(a)
      .text()
      .toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
  };
  // OVERWRITES old selecor
  jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a)
      .text()
      .toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
  };
  var filterinput = $('.Filter');
  $('.Filter')
    .trigger('change');
  filterinput.each(function() {
    var filterfor = $(this)
      .attr('data-filterfor');
    // console.log('for filter :' + filterfor);
    var event = 'keyup';
    if ($(this)
      .hasClass('inputDate') || $(this)
      .hasClass('inputDateInput')) {
      event = 'change';
    }
    $(this)
      .unbind(event);
    $(this)
      .on(event, function() {
        var visible = false;
        toFilerList = $('#ordersList .grpTbody tr[mainrow]');
        // get rows from
        // globally;
        filterinput.each(function() {
          var trList;
          var elem = $(this);
          console.log("elem" + elem.val());
          if (elem.val()
            .trim() != '') {
            filterfor = elem.attr('data-filterfor');
            filtertext = $(this)
              .val();
            console.log('for filter :' + filterfor);
            if (!visible) {
              toFilerList.addClass('hideBlock');
              $('#ordersList .grpTbody ')
                .find('.expandsubrow ')
                .hide();
              var toShow = toFilerList.find('.' + filterfor + ':contains(' + filtertext + ')')
                .parent('tr');
              toShow.removeClass('hideBlock');
              toShow.each(function() {
                var id = $(this)
                  .attr('data-tt-id');
                if ($(this)
                  .hasClass('expanded')) $('tr[data-tt-parent-id="' + id + '"]')
                  .show();
              });
            } else {
              trList = $('#ordersList .grpTbody tr[mainrow]:visible .' + filterfor + ':contains(' + filtertext + ')')
                .parent('tr');
              $('#ordersList .grpTbody ')
                .find('.expandsubrow:visible')
                .hide();
              $('#ordersList .grpTbody tr[mainrow]')
                .addClass('hideBlock');
              console.log(trList.length);
              trList.removeClass('hideBlock');
              trList.each(function() {
                var id = $(this)
                  .attr('data-tt-id');
                if ($(this)
                  .hasClass('expanded')) $('tr[data-tt-parent-id="' + id + '"]')
                  .show();
              });
            }
            visible = true;
          }
          if (!visible) {
            toFilerList.removeClass('hideBlock');
            toFilerList.each(function() {
              var id = $(this)
                .attr('data-tt-id');
              if ($(this)
                .hasClass('expanded')) $('tr[data-tt-parent-id="' + id + '"]')
                .show();
            });
          }
        });
      });
  });
}
function addToDraft(response, area) {
  var drafts = frameJSONObject(response, "D");
  callCreateDraftOrderService(drafts, area, 'directAdd');
}
function removeExistingRow(response, area) {
  var articleNo = response[0].article == undefined ? response[0].article_no : response[0].article;
  var supplierNo = response[0].supplier == undefined ? (response[0].supplier_no) : (response[0].supplier);
  if (response[0].article_uom == null) response[0].article_uom = "";
  //var row = articleNo + '_' + supplierNo;
  //changed as part of sea food changes added like search for [data-tt-id to data-tt-id*]
  // Defect_12043
  var row = articleNo + '_';
  var qty = 0;
  var $existRow;
  var dat = $('tr[data-tt-id*="' + row + '"]:first')
    .closest('table')
    .attr('id');
  if ($("#" + dat + ' tbody')
    .length == 2 && $("#datatable .grpTbody .rowHighlight")
    .length == 1) {
    $('#datatable')
      .remove();
  } else if ($("#" + dat + ' tbody')
    .length == 2 && $("#datatable .grpTbody .rowHighlight")
    .length > 1) {
    var trRemove = $('tr[data-tt-id*="' + row + '"]:first')
      .closest('table')
      .attr('id')
      .split("_")[1];
    $existRow = $('tr[data-tt-id*="' + row + '"]:first');
    qty = $existRow.find('.orderQty').val();
    $existRow.next().remove();
    $existRow.remove();
    $('tr[data-tt-id="' + trRemove + '"]')
      .remove();
    $('tr[data-tt-id="' + trRemove + '_sub"]')
      .remove();
    $('tr[data-tt-id=datatable_' + trRemove + ']')
      .remove();
    
  } else {
  	$existRow = $('tr[data-tt-id*="' + row + '"]:first');
  	qty = $existRow.find('.orderQty').val();
    $existRow.next().remove();
    $existRow.remove();
  }
  return qty;
}

function addArticleFromDraftWithEmptyDate(response, area, groupBySelected,isGreenArticle) {
  if (response.length > 0) {
    if (area.html() == '') {
      bindEventForHeader(area);
    }
    for (var i = 0; i < response.length; i++) {
      var articleNo = response[i].article == undefined ? response[i].article_no : response[i].article;
      var supplierNo = response[i].supplier == undefined ? (response[i].supplier_no) : (response[i].supplier);
      if (response[i].article_uom == null) response[i].article_uom = "";
      var id = articleNo + '_' + supplierNo;
      var rowContent = getOrdersAsHTML(response[i]);
      area.find('.ordersTable')
        .treetable('destroy');
      area.find('.ordersTable')
        .find('.expandTd')
        .html('<span class="indenter">&nbsp;</span>');
      var isExists = false;
      var isDelDateEmpty = false;
      var inAllTab = false;
      if (response[i].delivery_date == '' || response[i].delivery_date == null || response[i].delivery_date == '/undefined/undefined') {
        isDelDateEmpty = true;
      }
      var groupBy;
      if (!isExists) {
        if (groupBySelected == 'deliveryDate') {
          if (isDelDateEmpty) {
        	  if(isGreenArticle!=undefined)
        	  {
            response[i].is_empty = 'default';
            groupBy = 'glempty';
            if ($('#ordersList')
              .find('tr[data-tt-id="gldefault"]')
              .length == 1) isExists = true;
          }
        	  else
        		  {
                response[i].is_empty = 'default';
                groupBy = 'empty';
                if ($('#ordersList')
                  .find('tr[data-tt-id="default"]')
                  .length == 1) isExists = true;
        		  }
          }
        }
      }
      if (!isExists) {
        if ($('#myOrdersBtn')
          .parent()
          .hasClass('ui-state-active', 'ui-tabs-active') && groupBySelected == 'deliveryDate') {
          groupBy = 'empty';
          if(isGreenArticle!=undefined)
        	  groupBy = 'glempty';  
        } else if ($('#allOrdersBtn')
          .parent()
          .hasClass('ui-state-active', 'ui-tabs-active') && groupBySelected == 'deliveryDate') {
          groupBy = 'empty';
          if(isGreenArticle!=undefined)
        	  groupBy = 'glempty';
        }
        var newArray = [];
        newArray.push(response[i]);
        addAriclesFromSearch(newArray, area, groupBy);
      } else {
        if (groupBy == 'empty') {
          area.find('#datatable_default .tbody')
            .append(rowContent);
        }
      }
      area.find('.ordersTable .tbody')
        .find('[data-tt-id="' + id + '"]')
        .data("obj", response[i]);
      area.find('.ordersTable')
        .treetable({
          expandable: true
        });
      bindEventForOrders(response[i], area);
    }
  }
}
function validateDraft(id, action, area) {
  var toBeUpdatedList = [];
  var updateDrafts = [];
  $('#' + id)
    .find('tr[fromdraft]')
    .each(function() {
      toBeUpdatedList.push($(this)
        .data("obj"));
    });
  if (toBeUpdatedList.length > 0){
	  var errorMsg = validateArticleforOrder(toBeUpdatedList, false);
	  $.merge(errorMsg, minMaxQtyValidation(toBeUpdatedList, '', false));
	  if(errorMsg  != '' && errorMsg != undefined){
		  showAllErrors(errorMsg);
	  }else{
		 validateRoasterDate(toBeUpdatedList, area); 
	  }
	  
  }
}

function validateAllDraft(action, area) {
  var toBeUpdatedList = [];  
  $('#ordersList')
    .find('tr[fromdraft]')
    .each(function() {
    	if(($(this).find('#validationStatus').text()||'').toUpperCase() == 'DRAFT'){
      		toBeUpdatedList.push($(this)
        		.data("obj"));
    	}
    });
  if (toBeUpdatedList.length > 0){ 
	  var errorMsg = validateArticleforOrder(toBeUpdatedList, false); 
	  $.merge(errorMsg, minMaxQtyValidation(toBeUpdatedList, '', false));
	  if(errorMsg  != '' && errorMsg != undefined){
		  showAllErrors(errorMsg);
	  }else{		  
		 validateRoasterDate(toBeUpdatedList, area); 
	  }
  }
}

function validateRoasterDate(updateDrafts, area){
	var drafts = [];
	drafts = frameJSONObjectForValidate(updateDrafts);
	var param = {
    "site": $('#posSite')
      .val(),
    "sales_org": $('#salesOrg')
      .val(),
    "user_id": $('#loginUserId')
      .val(),
    "sap_id": "",
    "session_id": "",
	"orderLimitQty": "50",
	"requestSource": "S",
    "ITEM_INFO": drafts
  };
  startLoading();
  console.log(getDeliveryDateURL + ' ' + JSON.stringify(param));	
  $.post(getDeliveryDateURL, JSON.stringify(param))
    .done(function(data) {
	var response = data; 
	/*var errorMsg = minMaxQtyValidation(updateDrafts, response, false);
	if(errorMsg  != '' && errorMsg != undefined){
		 showAllErrors(errorMsg);
	  }else{*/		  
		  handleRoasterDateChanges(response, updateDrafts, area);
		  bindSubmitEnableDisable(); 
	  /*}	*/
	stopLoading();
	}).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}

function handleRoasterDateChanges(response, drafts, area){
var errors = [];
delivDateCheckBoxResult =[];
var totQnty = 0;
 if(response != '' && response != undefined && 
		 response.articles != undefined && response.articles != '' && response.articles.length >0){ 
 for (var j = 0; j < drafts.length; j++) {
 totQnty += drafts[j].qty;
  for (var i = 0; i < response.articles.length; i++) {
	var result = response.articles[i];	
	if(drafts[j].article == result.article){
	var notfail = true;
	var noRoastr = false;
	 if(result.returnCode == '0' || result.returnCode == '1')
		 notfail = false;
	 else if(result.returnCode == '' && result.errorDescription == '')
		 notfail = true;
	 
	 if(!notfail && result.errorDescription != '' && result.errormessage != ''){
			if(result.errorDescription == 'NORSTR' && salesOrgVal != bigw_sales_org){
				noRoastr = true;
			}else{
				errors.push("Article "+result.article+" - "+result.errormessage);
			}
	}else if(!notfail && !noRoastr && result.errormessage == ''){
		errors.push('No Error Msg Found');
	}
	 
	 if((notfail || noRoastr)  
			 //&& drafts[j].supplier == result.supplier
			 ){		
		 var ddDate = drafts[j].delivery_date;
		 var id = result.article + '_' + result.supplier;
		 var groupElement = '';
		 /*var supp = area.find('tr[mainrow][data-tt-id="'+id+'"]').attr('supplier').split("-")[1];
		 if(supp == "" || supp == undefined) supp = drafts[j].supplier;*/
		 var supp = (result.supplier != undefined && result.supplier != "")? result.supplier : drafts[j].supplier;
		 var rosDate = result.deliveryDate;
		 var ddcompResult = compareDate(rosDate, ddDate);		 
		 var maxOrderQtyErrMsg =maxOrderQtyValidation(id, area,  response.articles[0].maxOrderQnty, drafts[j].qty);
		 if(maxOrderQtyErrMsg != ''){
			 errors.push(maxOrderQtyErrMsg);
		 }	
		 var isVendor = ((drafts[j].source != undefined && drafts[j].source != '' 
				 && drafts[j].source == '1') || (drafts[j].source_of_supply != undefined && drafts[j].source_of_supply != '' 
						 && drafts[j].source_of_supply == '1')) ? 'Y' : 'N';
		 if(notfail){ 
			 if(ddcompResult == 'lt'){
				 groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'nearestDDMsg'+'_Y_VALID'+'_'+result.article;
				delivDateCheckBoxResult.push(groupElement);				
				groupConfirmedMap[groupElement] = result;
			 }else if(ddcompResult == 'gt'){
	            if(isVendor == 'Y' && salesOrg!='1060'){			
					groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'vendorEmerDDMsg'+'_N_VALID'+'_'+result.article;			
				}else if(isVendor == 'Y' && salesOrg=='1060'){			
					groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'nearestDDMsg'+'_Y_VALID'+'_'+result.article;			
				}else{
					groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'whEmerDDMsg'+'_Y_VALID'+'_'+result.article;				
				}
				delivDateCheckBoxResult.push(groupElement);
				groupConfirmedMap[groupElement] = result;
			 }else if(ddcompResult == 'eq'){		
				mapResultstoSuccess(drafts[j], result, area);
				}
		}else if(noRoastr){
				 if(isVendor == 'Y'){
						groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'VendorNoRoasterDDMsg'+'_Y_INVALID'+'_'+result.article;	
						delivDateCheckBoxResult.push(groupElement);
						groupConfirmedMap[groupElement] = result;
					}else{
						//groupElement = supp+'_'+ddDate+'_'+result.deliveryDate+'_'+'whNoRoasterDDMsg'+'_Y_INVALID'+'_'+result.article;					
						errors.push("Article "+result.article+" - "+whNoRoasterDDMsg);
					}
			}
		}
	}	
  	}
	}
 	if(errors.length>0){
		$.fn.showCustomMsg(errors, error, "Roster Date Validation");
	}
	if(delivDateCheckBoxResult != '' && delivDateCheckBoxResult.length>0){
		   delivDateCheckBoxResult = unique(delivDateCheckBoxResult);
		   showUpdatedDeliveryPopup();  
		   bindDeliveryDateCheckboxEvents();
	}
 } else{	
		$.fn.showCustomMsg([ mobiSerErrMsg ], error, "Roster Date Validation");
 }
}
function mapResultstoSuccess(drafts, response, area, radioOption){
	var id = drafts.article + '_' + drafts.supplier;
	var isVendor = ((drafts.source != undefined && drafts.source != '' 
		 && drafts.source == '1') || (drafts.source_of_supply != undefined && drafts.source_of_supply != '' 
				 && drafts.source_of_supply == '1')) ? 'Y' : 'N';
	
		if(response != '' && response != undefined){
			area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="validationStatus"]').html('<label class="success">Verified</label>');
			area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="purchaseGroup"]').html(response.dcmcsCode);
			area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="roasterName"]').html(response.rosterName);
			area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="maxOrderQnty"]').html(response.orderLimitQty);
			area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="preqReqId"]').html(response.preq_req);
			area.find('tr[mainrow][data-tt-id="'+id+'"]').closest('table').find('tfoot div').find('.submit').removeClass('disabled');
			$('.submitAll').removeClass('disabled');
			
			drafts.preq_type = response.preq_type;
			drafts.order_type = response.orderType;
			drafts.delivery_valid_flag = response.delvery_valid_flag;
            drafts.preq_req = response.preq_req;
            drafts.roaster_date = response.rosterDate;
            area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="supplierFromRC"]')
        	.html(((response.supplier != "" && response.supplier != undefined)? response.supplier : drafts.supplier));
            
            if(radioOption == 'Emergency'){            	
            	if(drafts.delivery_date != undefined && drafts.delivery_date != ""
    	    	  		&& salesOrgVal != bigw_sales_org){	         
    	          if(isVendor == "Y"){
    	        	  if(drafts.preq_type == "ZMW")
    	        		  drafts.preq_type = "ZEW";
    	        	  else if(drafts.preq_type == "ZMP")
    	        		  drafts.preq_type = "ZPE";
    	        	drafts.emergency_flag = 'Y';
    	          	drafts.delivery_valid_flag = "N";
    	          	drafts.roaster_date = currDate();    	          	
    	          	area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="purchaseGroup"]').html("");
    	          	area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="roasterName"]').html("EMERGENCY");
    	          }
    	      }
            }else{
            	drafts.delivery_date = response.deliveryDate;  
            	area.find('tr[mainrow][data-tt-id="'+id+'"]').find('.inputDate').val(drafts.delivery_date);
                changeDelDate(drafts.delivery_date, area.find('tr[mainrow][data-tt-id="'+id+'"]').find('.inputDate'));
            }
            bindSubmitEnableDisable();            
            area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="resetValidate"]').html(Date.now());
            setTimeout(function() {
            	bindResetValidate(id, area);
        	}, 900000);           
	}
}

function bindResetValidate(id, area){
	 var resetValidate = area.find('[data-tt-id="' + id + '"]').find('td[id="resetValidate"]').html();
	  if(resetValidate != ''){
		  var diff = Date.now() - resetValidate;
		  if(diff == '900000' || diff > '900000'){
			  console.log("created Time :"+resetValidate+" Difference"+ diff +" ms");
			  area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="resetValidate"]').html('');
			  area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="validationStatus"]').html('Draft');
			  bindSubmitEnableDisable();
		  }
	  } 
}
function showUpdatedDeliveryPopup(){
	clearAllErrors();
	var cont = '';
	delivDateCheckBoxResTemp = [];
	if(delivDateCheckBoxResult != '' && delivDateCheckBoxResult != undefined && delivDateCheckBoxResult.length>0){
		for (var i = 0; i<delivDateCheckBoxResult.length; i++) {
			delivDateCheckBoxResTemp.push(delivDateCheckBoxResult[i].slice(0, delivDateCheckBoxResult[i].lastIndexOf('_')));
		}
	delivDateCheckBoxResTemp = unique(delivDateCheckBoxResTemp);	
	$('#dialog-delivery-result').parent().find('.ui-dialog-title').text(
			'Select a delivery date to proceed');
	$('#dialog-delivery-result').find('popupActionsWrapper').removeClass(
			'margni-top30');
	cont += '<div id="validateRCPopup" class="pos_prc_cont ContentTableWrapper">'
	cont += '<div class="delMsgInfo nearestDDMsg">'+nearestDDMsg+'</div>'
	cont += '<div class="delMsgInfo vendorEmerDDMsg">'+vendorEmerDDMsg+'</div>'
	cont += '<div class="delMsgInfo whEmerDDMsg">'+whEmerDDMsg+'</div>'
	cont += '<div class="delMsgInfo VendorNoRoasterDDMsg">'+VendorNoRoasterDDMsg+'</div>'
	cont += '<div id="whNoRoasterDDMsg" class="delMsgInfo whNoRoasterDDMsg">'+whNoRoasterDDMsg+'</div>'
	cont += '<table id="delvSupplrRostrTable" style="width:100%" class="ContentTable" width="100%" cellspacing="0"><tbody class="uomRadioTablePopUp">'
	cont += '<tr><th>Supplier</th>'
		+ '<th width="25%">Expected</th>'
		+ '<th class="noRoasterAvailable">Available</th>'
	    + '<th  class="centerValue lastColumn">Select</th></tr>'	
	
	for (var i = 0; i<delivDateCheckBoxResTemp.length; i++) {		
	cont +='<tr class="'+ delivDateCheckBoxResTemp[i].split("_")[3] +'">'
		+ '<td   class="supplier">'
		+ delivDateCheckBoxResTemp[i].split("_")[0]		
		+'</td>'
		+ '<td   class="deliveryDate">'
		+ delivDateCheckBoxResTemp[i].split("_")[1]		
		+'</td>'
		+ '<td   class="roasterDate noRoasterAvailable">'
		+ delivDateCheckBoxResTemp[i].split("_")[2]		
		+'</td>'		
		if(delivDateCheckBoxResTemp[i].split("_")[4] == 'Y'){
			cont += '<td  class="sorted centerValue lastColumn" id="validRostrSeltn"><input type="checkbox" data_index = "'+i+'" name="deliveryDatecheckbox"></td>'
			}
		else{	
			cont += '<td id="noValidRostrSeltn"><input type="radio" data_index = "'+i+'"  class ="deliveryDateRadio" name="deliveryDateRadio'+i+'" value="Available"><label>Available</label>'
			+'<input type="radio" data_index = "'+i+'" class ="deliveryDateRadio" name="deliveryDateRadio'+i+'" value="Emergency"><label>Emergency</label></td>'
		}	
		cont += '<td class="noRoastr hideBlock">'
		+ delivDateCheckBoxResTemp[i].split("_")[5]		
		+'</td>'
		cont += '</tr>'
		}
	
	cont += '</tbody></table></div>'
	var $dialog = $('#dialog-delivery-result');
	$dialog.find('#dialog-delivery-result-content').html(cont);
	$dialog.dialog('open');
	$('#dialog-delivery-result').parent().css('min-width', '450px');
	$('#dialog-delivery-result').parent().css('width', '600px');
	$('#dialog-delivery-result').parent().css('left', '350px');
	$('#dialog-delivery-result').css('min-height', '115px');	
}
}


function bindPrevNext(){
	var currentStep = '';
	for(key in validateMethodMsgDisplayMap){
		if($('.'+key).is(':visible')){
			currentStep = key;
		}
	}
	var currentId = validateMethodMsgDisplayMap[currentStep];
	var prevId = Number(currentId)-1;
	var nextId = Number(currentId)+1;
	$('#previousDD').addClass('hideBlock');
	$('#nextDD').addClass('hideBlock');
	$('#submitDeliveryDateList').addClass('hideBlock');
	for(key in validateMethodMsgDisplayMap){			
		if($('.'+validateMethodMsgDisplayKeyMap[nextId])
				.closest('tr').length > 0){
			$('#nextDD').removeClass('hideBlock');
			break;
		}else{
			nextId = nextId + 1;
		}
	}	
	for(key in validateMethodMsgDisplayMap){			
		if($('.'+validateMethodMsgDisplayKeyMap[prevId])
				.closest('tr').length > 0){
			$('#previousDD').removeClass('hideBlock');
			break;
		}else{
			prevId = prevId - 1;
		}
	}	
	
	if(!$('.nextDD').is(':visible')){
		$('#submitDeliveryDateList').removeClass('hideBlock');
	}
	if(executeVndorEmr && $('.vendorEmerDDMsg').closest('tr').length > 0
			&& $('.deliveryDateRadio') != undefined && $('.deliveryDateRadio') != ""){
		$('.deliveryDateRadio').each(function() {
			if($(this).attr("value") == "Available"){
				$(this).trigger('click');
			}
		});
		executeVndorEmr = false;
	}	

	
	if(executeNoRstrVndorEmr && $('.VendorNoRoasterDDMsg').closest('tr').length > 0
			&& !$('.VendorNoRoasterDDMsg').find('input[name="deliveryDatecheckbox"]').hasClass('Checked')){
		$('.VendorNoRoasterDDMsg').find('input[name="deliveryDatecheckbox"]').trigger('click');
		executeNoRstrVndorEmr = false;
	}	
	
	if($('.VendorNoRoasterDDMsg').is(':visible') 
			&& $('.VendorNoRoasterDDMsg').closest('tr').length > 0){
		$('.noRoasterAvailable').addClass('hideBlock');
	}else{
		$('.noRoasterAvailable').removeClass('hideBlock');
	}
	proceedToCreateCount();
}

function bindNext(){
	$('#nextDD').unbind('click');
	$('#nextDD').click(function() {
		var currentStep = '';
		for(key in validateMethodMsgDisplayMap){
			if($('.'+key).is(':visible')){
				currentStep = key;
			}
		}
		var currentId = validateMethodMsgDisplayMap[currentStep];
		for(key in validateMethodMsgDisplayMap){
			$('.'+key).addClass('hideBlock');
		}
		if($('.'+validateMethodMsgDisplayKeyMap[Number(currentId)+1])
				.closest('tr').length > 0){
			$('.'+validateMethodMsgDisplayKeyMap[Number(currentId)+1]).removeClass('hideBlock');
			bindPrevNext();
		}else{
			$('.'+validateMethodMsgDisplayKeyMap[Number(currentId)+1]).removeClass('hideBlock');
			$('#nextDD').trigger('click');
		}
		
	});
}

function bindPrevious(){
	$('#previousDD').unbind('click');
	$('#previousDD').click(function() {
		var currentStep = '';
		for(key in validateMethodMsgDisplayMap){
			if($('.'+key).is(':visible')){
				currentStep = key;
			}
		}
		var currentId = validateMethodMsgDisplayMap[currentStep];
		for(key in validateMethodMsgDisplayMap){
			$('.'+key).addClass('hideBlock');
		}
		if($('.'+validateMethodMsgDisplayKeyMap[Number(currentId)-1])
				.closest('tr').length > 0){
			$('.'+validateMethodMsgDisplayKeyMap[Number(currentId)-1]).removeClass('hideBlock');
			bindPrevNext();
		}else{
			$('.'+validateMethodMsgDisplayKeyMap[Number(currentId)-1]).removeClass('hideBlock');
			$('#previousDD').trigger('click');
		}
	});	
}

function bindEmerAvailRadioEvents(){
	$('.deliveryDateRadio').unbind('click');
	$('.deliveryDateRadio').click(function(event) {	 
	    event.stopPropagation();		
		$(this).parent().find('input').removeClass('checked');
		$(this).addClass('checked');		
		proceedToCreateCount();
	});
}
function changeDelDate(enteredDate, elem){
	elem
      .parent()
      .parent()
      .find('.deliveryDate')
      .text(enteredDate);
	elem
      .parent()
      .parent()
      .find('.delivery_date_valid')
      .val(enteredDate);
    var obj = elem
      .closest('tr')
      .data("obj");
    elem
      .closest('tr')
      .data("obj")
      .prev_entered_delivery_date = obj.delivery_date;
    elem
      .closest('tr')
      .data("obj")
      .delivery_date = enteredDate;
}
/*function proceedToCreateCount(){
	var list = $('.checked');
	var list = $('.'+currentStep).closest('tr').find('.checked');
	if(list.length == 0){
		$('#submitDeliveryDateList').addClass('disabled');
		$('#submitDeliveryDateList').text('Proceed To Create');
	}else{	    			
		$('#submitDeliveryDateList').text('Proceed To Create ('+(list.length >9 ? list.length : '0'+list.length)+')');
		$('#submitDeliveryDateList').removeClass('disabled');
	}
	return list;		
}*/
function proceedToCreateCount(){
	var currentStep = '';
	for(key in validateMethodMsgDisplayMap){
		if($('.'+key).is(':visible')){
			currentStep = key;
		}
	}	
	var list = $('.'+currentStep).closest('tr').find('.checked');
	if(list.length == 0){
		$('#submitDeliveryDateList').addClass('disabled');
		$('#submitDeliveryDateList').text('Proceed To Create');
	}else{	    			
		$('#submitDeliveryDateList').text('Proceed To Create ('+(list.length >9 ? list.length : '0'+list.length)+')');
		$('#submitDeliveryDateList').removeClass('disabled');
	}
	return list;		
}
function bindDDCheckBoxChangeEvent(){
	$('input[name="deliveryDatecheckbox"]').unbind('click');
	$('input[name="deliveryDatecheckbox"]')
	    .change(function(event) {
	    	event.stopPropagation();
	    	if($(this).hasClass('checked')){
	    		$(this).removeClass('checked');
	    	}else{
	    		$(this).addClass('checked');
	    	}	    	
	    	proceedToCreateCount();		    
	 });
}

function bindSubmitDDValidation(){
$('#submitDeliveryDateList').unbind('click');
	$('#submitDeliveryDateList').click(function() {
		$('#submitDeliveryDateList').removeClass('disabled');
		var list =proceedToCreateCount();    	
		var toBeUpdatedList = [];
		var temp = [];
		$('#ordersList')
	    .find('tr[fromdraft]')
	    .each(function() {
	      toBeUpdatedList.push($(this)
	        .data("obj"));
	   });
		if(groupConfirmedMap != ''){
		$(list).each(function() {
		var index = $(this).attr('data_index');	
		var radioOption = $(this).attr('value');
		for (var i = 0; i < delivDateCheckBoxResult.length; i++) {	
			if(delivDateCheckBoxResTemp[index] == delivDateCheckBoxResult[i].slice(0, delivDateCheckBoxResult[i].lastIndexOf('_')))	{			
				temp = delivDateCheckBoxResult[i];
			    //break;	defect_9333 changes
			}
		
		var response = groupConfirmedMap[temp];
		if(response != undefined)
		for (var j = 0; j < toBeUpdatedList.length; j++) {	
					if(compareDate(temp.split("_")[1], toBeUpdatedList[j].delivery_date) == 'eq'
						&& toBeUpdatedList[j].article == response.article){
						if(temp.split("_")[3] == 'VendorNoRoasterDDMsg'){
							radioOption = 'Emergency';
						}
						mapResultstoSuccess(toBeUpdatedList[j], response, $('#ordersList'), radioOption);
					}			
		}
		}
		});
		var currentStep = getCurrentStep();
		var newList = [];
		for(var i=0; i<delivDateCheckBoxResult.length; i++){
			console.log(delivDateCheckBoxResult[i].split('_')[3]);
			if(delivDateCheckBoxResult[i].split('_')[3] != currentStep){				
				newList.push(delivDateCheckBoxResult[i]);
			}
		}
		delivDateCheckBoxResult = newList;		
		if(delivDateCheckBoxResult != '' && delivDateCheckBoxResult.length>0){
			delivDateCheckBoxResult = unique(delivDateCheckBoxResult);
			showUpdatedDeliveryPopup();  
			bindDeliveryDateCheckboxEvents();
		}else{
			$('#dialog-delivery-result').dialog('close');
		}
		}
	//$('#dialog-delivery-result').dialog('close');
	});
}


function getCurrentStep(){
	var currentStep = '';	
	for(key in validateMethodMsgDisplayMap){
		if($('.'+key).is(':visible')){
			currentStep = key;
		}
	}
	return currentStep;
}

function bindDeliveryDateCheckboxEvents(){
	executeVndorEmr = true;
	executeNoRstrVndorEmr = true;
	$('#submitDeliveryDateList').addClass('disabled');
	$('#previousDD').addClass('hideBlock');
	$('#nextDD').addClass('hideBlock');
	$('#submitDeliveryDateList').addClass('hideBlock');
	
	for(key in validateMethodMsgDisplayMap){
		$('.'+key).addClass('hideBlock');
	}
	$('.nearestDDMsg').removeClass('hideBlock');
	bindDDCheckBoxChangeEvent();
	bindEmerAvailRadioEvents();
	bindSubmitDDValidation();
		
	bindPrevNext();
	bindNext();
	bindPrevious();	
	
	
	if($('.nearestDDMsg').closest('tr').length == 0){
		$('#nextDD').trigger('click');
	}
}
function filterBeforeSubmit(updateDrafts, area){
var filterDraft = [];
if(updateDrafts.length >0){
	for(var filter = 0; filter<updateDrafts.length; filter++){
	var articleNo = updateDrafts[filter].article == undefined ? updateDrafts[filter].article_no : updateDrafts[filter].article;
	var supplierNo = updateDrafts[filter].supplier == undefined ? (updateDrafts[filter].supplier_no) : (updateDrafts[filter].supplier);
		var id = articleNo + '_' + supplierNo;
		//console.log(id);
		var status = area.find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="validationStatus"]').html();		
		//console.log(status);
		if(status == '<label class="success">Verified</label>'){			
			filterDraft.push(updateDrafts[filter]);
		}
	}
 }
 updateDrafts = filterDraft;
 return updateDrafts;
 }


function submitDraft(id, action, area) {
  var toBeUpdatedList = [];
  var updateDrafts = [];
  $('#' + id)
    .find('tr[fromdraft]')
    .each(function() {
      toBeUpdatedList.push($(this)
        .data("obj"));
    });
	
	if (toBeUpdatedList.length > 0){
		var errorMsg = validateArticleforOrder(toBeUpdatedList, false);	
		// $.merge(errorMsg, minMaxQtyValidation(toBeUpdatedList, '', false));
	  if(errorMsg  != '' && errorMsg != undefined){
		  showAllErrors(errorMsg);
	  }else{
	  updateDrafts = filterBeforeSubmit(toBeUpdatedList, area);
		updateDrafts = frameJSONObjectForSubmitNew(updateDrafts, action);
		//validateRoasterDate(updateDrafts, area);
		if (updateDrafts.length > 0){
			//callCreateOrderService(updateDrafts, action, area);
			submitDraftToSAP(updateDrafts, area);
		}else{
			$.fn.showCustomMsg(["Please Validate Articles Before Submit"], error, "Roster Date Validation");
	  }	
	  }
	
  }
}

function submitAllDraft(action, area) {
  var toBeUpdatedList = [];
  var updateDrafts = [];
  $('#ordersList')
    .find('tr[fromdraft]')
    .each(function() {
      toBeUpdatedList.push($(this)
        .data("obj"));
    });
	if (toBeUpdatedList.length > 0){ 
	  var errorMsg = validateArticleforOrder(toBeUpdatedList, false);
	 // $.merge(errorMsg, minMaxQtyValidation(toBeUpdatedList, '', false));
	  if(errorMsg  != '' && errorMsg != undefined){
		  showAllErrors(errorMsg);
	  }else{
		  updateDrafts = filterBeforeSubmit(toBeUpdatedList, area);
			updateDrafts = frameJSONObjectForSubmitNew(updateDrafts, action);  
			console.log(updateDrafts.length);	
			if (updateDrafts.length > 0){
				//callCreateOrderService(updateDrafts, action, area);
				submitDraftToSAP(updateDrafts, area);
			}else{
			$.fn.showCustomMsg(["Please Validate Articles Before Submit"], error, "Roster Date Validation");
		  }
	  }	
  }
}

function callCreateOrderService(drafts, action, area) {
  var param = {
    "site": $('#posSite')
      .val(),
    "sales_org": $('#salesOrg')
      .val(),
    "user_id": $('#loginUserId')
      .val(),
    "sap_id": "",
    "session_id": "",
    "ITEM_INFO": drafts
  };
  console.log(getDeliveryDateURL + ' ' + JSON.stringify(param));
  startLoading();
  $.post(getDeliveryDateURL, JSON.stringify(param))
    .done(function(data) {
      if (data != undefined && data.HeaderDtls != undefined) {
        if (data.HeaderDtls.ItemArray != undefined) {
          console.log('Added to My draft:' + data.HeaderDtls.ItemArray);
          var list = data.HeaderDtls.ItemArray;
          var successList = [];
          var failedList = [];
          var tempRoasterDate = '';
    	  var warehouseArticleErrors = [];
    	  var failedVendorsList = [];
    	  var failedVendorsMap = {};
          for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            for (var j = 0; j < drafts.length;j++)
            	{
            	 if (obj.article == drafts[j].article) 
            		 {
											if (obj.delvery_valid_flag == 'Y'
													&& compareDate(
															formatDateMobi(obj.delivery_date),
															formatDateMobi(drafts[j].delivery_date)) == 'eq') {
												successList.push(obj);
											} else {
												failedList.push(obj);
											}
											break;
										}
            	
          }
          }
          if (successList.length == drafts.length) {
            for (var i = 0; i < drafts.length; i++) {
              for (var j = 0; j < successList.length; j++) {
                if (successList[j].article == drafts[i].article) {
                  // hard coded below line for testing
                  // drafts[i].preq_type = 'ZY';
                  drafts[i].preq_type = successList[j].preq_type;
                  //ADDED THE BELOW LINE FOR BIGW ORDER CREATE GURU
                  //CODE START
                  drafts[i].preq_req = successList[j].preq_req;
                  //CODE END
                  drafts[i].supplier = successList[j].supplier;
                  drafts[i].roaster_date = successList[j].roaster_date;
                  drafts[i].delivery_date = successList[j].delivery_date;
                  break;
                }
              }
            }
//           submitDraftToSAP(drafts, area);//Existing code commented
            submitDraftToSAP(drafts);
          } else {
        	  for (var j = 0; j < drafts.length; j++) {
            for (var i = 0; i < failedList.length; i++) {
            	 if (failedList[i].article == drafts[j].article) {
              var id = failedList[i].article + '_' + failedList[i].supplier;
              var currentObj = area.find('tr[mainrow][data-tt-id="' + id + '"]').data("obj");
              currentObj.preq_type = failedList[i].preq_type;
              currentObj.preq_req = failedList[i].preq_req;
              currentObj.on_emgcy_preq_req = failedList[i].on_emgcy_preq_req;
              currentObj.on_emgcy_preq_type = failedList[i].on_emgcy_preq_type;
              currentObj.next_valid_delivery_date = failedList[i].delivery_date;
              currentObj.next_valid_roster_date = failedList[i].roaster_date;
              currentObj.delivery_valid_flag = failedList[i].delvery_valid_flag;
              currentObj.order_type = failedList[j].order_type;
              currentObj.emergency_flag= failedList[j].emergency_flag;
			  var isVendor = ((currentObj.source != undefined && currentObj.source != null && currentObj.source == '1') || (currentObj.source_of_supply != undefined && currentObj.source_of_supply != null && currentObj.source_of_supply == '1')) ? 'Y' : 'N';;
              if(isVendor == 'Y'  && salesOrg != '1060')
			  {
            	  failedVendorsList.push(failedList[i].supplier);
            	  if(failedVendorsMap[failedList[i].supplier] == undefined)
            		  {
            		  var newArray = [];
            		  newArray.push(currentObj);
            		  failedVendorsMap[failedList[i].supplier] = newArray;
            		  }
            	  else
            		  {
            		  var existingArray = [];
            		  existingArray = failedVendorsMap[failedList[i].supplier];
            		  existingArray.push(currentObj);
            		  failedVendorsMap[failedList[i].supplier] = existingArray;
            		  }
				}
				else if(isVendor == 'N'  || (isVendor == 'Y' && salesOrg == '1060')){				
					warehouseArticleErrors.push('there exists an error');
					var $reqHtml = area.find('tr[mainrow][data-tt-id="' + id + '"]')
	                .find('td input.delivery_date_valid');
					$reqHtml.addClass('errorField');
			addtooltip($reqHtml, "Invalid Delivery Date.");
			$reqHtml.change(function() {
                  $(this)
                    .removeClass('errorField');
                  removetooltip($(this));
                });
              $(".tooltip")
                .tooltip({
                  position: {
                    my: "left center",
                    at: "right+10 center"
                  }
                });
				}
            }
            }
          }
            stopLoading();
          }
          if(warehouseArticleErrors.length > 0)
        	  {
        	  correctError();
        	  }
          if(!warehouseArticleErrors.length > 0)
          {
          if(failedVendorsList.length > 0){
        		  failedVendorsList = unique(failedVendorsList);
        		  getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList);
        	//  correctError();
          }
        }
        }
      } else if (data.HeaderDtls == undefined && data[0].ErrorID != undefined) {
        showAllErrors([mobiSerErrMsg]); 
        stopLoading();
      }
    });
}

function getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList,flag)
{
	if(failedVendorsList.length > 0)
		{
		var currentObj = failedVendorsMap[failedVendorsList[0]][0];
		var id = currentObj.article + '_' + currentObj.supplier;
		var supplierDesc = area.find('tr[mainrow][data-tt-id="' + id + '"]').attr('supplier'); 
		if(currentObj.delivery_valid_flag == 'Y')
			{
			 $.fn.warnPopup('warn','No Delivery available on the date selected for the vendor '+supplierDesc+' . Create Anyway ?','Create Order',triggerOrderCreateWithGivenDeliveryDate,triggerOrderCreateWithDeliveryDateFromService,'',{failedVendorsList : failedVendorsList,area : area,failedVendorsMap : failedVendorsMap,selectedVendor:(failedVendorsList[0]),drafts:drafts,successList:successList},'');
			}
		else
			{
			$.fn.warnPopup('warn','No roster found for the following vendor '+supplierDesc+' , Create emergency order(s) ?','Create Order',triggerOrderCreateEmergencyWithGivenDeliveryDate,triggerOrderNotEmergencyAfterSubmit,'',{failedVendorsList : failedVendorsList,failedVendorsMap : failedVendorsMap,area:area,selectedVendor:(failedVendorsList[0]),drafts:drafts,successList:successList},'');
			}
		}
	else
		{
		if(flag == undefined && flag != 'noRostersNo')
		{
		for (var i = 0; i < drafts.length; i++) {
            for (var j = 0; j < successList.length; j++) {
              if (successList[j].article == drafts[i].article) {
                drafts[i].preq_type = successList[j].preq_type;
                drafts[i].preq_req = successList[j].preq_req;
                drafts[i].supplier = successList[j].supplier;
                drafts[i].roaster_date = successList[j].roaster_date;
                drafts[i].delivery_date = successList[j].delivery_date;
                break;
              }
            }
          }
		var failedList = [];
		for (var vendor in failedVendorsMap) {
			var articleList = failedVendorsMap[vendor];
			for(var i=0;i<articleList.length;i++)
				{
				failedList.push(articleList[i]);
				}
		}
		for (var i = 0; i < drafts.length; i++) {
              for (var j = 0; j < failedList.length; j++) {
                  if (failedList[j].article == drafts[i].article) {
                    drafts[i].preq_type = failedList[j].preq_type;
                    drafts[i].preq_req = failedList[j].preq_req;
                    drafts[i].supplier = (failedList[j].supplier || failedList[j].supplier_no );
                    drafts[i].roaster_date = (failedList[j].roaster_date || failedList[j].roster_date);
                    drafts[i].delivery_date = formatDateToMDY(failedList[j].delivery_date);
                    drafts[i].order_type = failedList[j].order_type;
                    drafts[i].emergency_flag = failedList[j].emergency_flag;
                    
                    if(salesOrg!=1060){
                    
                    if(failedList[j].emergency_flag == 'Y')
                    	{
                    	 drafts[i].preq_req = failedList[i].on_emgcy_preq_req;
                    	 drafts[i].preq_type = failedList[i].on_emgcy_preq_type;
                    	}
                    }
                    break;
                  }
                }
              }
          submitDraftToSAP(drafts);
		}
		}
}

var triggerOrderCreateWithGivenDeliveryDate = function(e)
{
var savedDetails = e.data.cache;
var $elem = e.data.msg;
var failedVendorsList =  savedDetails.failedVendorsList;
var failedVendorsMap = savedDetails.failedVendorsMap;
var area = savedDetails.area;
var selectedVendor = savedDetails.selectedVendor;
var articleList = failedVendorsMap[selectedVendor];
var drafts = savedDetails.drafts;
var successList = savedDetails.successList;
for(var i= 0;i<articleList.length;i++)
{
modifyCurrentObject(articleList[i],area,'withDeliveryYes');
}
$elem.dialog('close');
console.log('before grep withDeliveryYes : '+failedVendorsList.length);
failedVendorsList = jQuery.grep(failedVendorsList, function( n, i ) {
	  return ( n !==  selectedVendor);
	});
console.log('after grep withDeliveryYes : '+failedVendorsList.length);
getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList);
};

var triggerOrderCreateWithDeliveryDateFromService = function(e)
{
var savedDetails = e.data.cache;
var $elem = e.data.msg;
var failedVendorsList =  savedDetails.failedVendorsList;
var failedVendorsMap = savedDetails.failedVendorsMap;
var area = savedDetails.area;
var selectedVendor = savedDetails.selectedVendor;
var articleList = failedVendorsMap[selectedVendor];
var drafts = savedDetails.drafts;
var successList = savedDetails.successList;
for(var i= 0;i<articleList.length;i++)
{
modifyCurrentObject(articleList[i],area,'withDeliveryNo');
}
$elem.dialog('close');	
console.log('before grep withDeliveryNo : '+failedVendorsList.length);
failedVendorsList = jQuery.grep(failedVendorsList, function( n, i ) {
	  return ( n !==  selectedVendor);
	});
console.log('after grep withDeliveryNo : '+failedVendorsList.length);
getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList);
};

var triggerOrderCreateEmergencyWithGivenDeliveryDate = function(e)
{
var savedDetails = e.data.cache;
var $elem = e.data.msg;
var failedVendorsList =  savedDetails.failedVendorsList;
var failedVendorsMap = savedDetails.failedVendorsMap;
var area = savedDetails.area;
var selectedVendor = savedDetails.selectedVendor;
var articleList = failedVendorsMap[selectedVendor];
var drafts = savedDetails.drafts;
var successList = savedDetails.successList;
for(var i= 0;i<articleList.length;i++)
{
modifyCurrentObject(articleList[i],area,'noRostersYes');
}
$elem.dialog('close');	
console.log('before grep noRostersYes : '+failedVendorsList.length);
failedVendorsList = jQuery.grep(failedVendorsList, function( n, i ) {
	  return ( n !==  selectedVendor);
	});
console.log('after grep noRostersYes : '+failedVendorsList.length);
getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList);
};

var triggerOrderNotEmergencyAfterSubmit = function(e)
{
var savedDetails = e.data.cache;
var $elem = e.data.msg;
var failedVendorsList =  savedDetails.failedVendorsList;
var failedVendorsMap = savedDetails.failedVendorsMap;
var area = savedDetails.area;
var selectedVendor = savedDetails.selectedVendor;
var articleList = failedVendorsMap[selectedVendor];
var drafts = savedDetails.drafts;
var successList = savedDetails.successList;
for(var i= 0;i<articleList.length;i++)
{
modifyCurrentObject(articleList[i],area,'noRostersNo');
}
$elem.dialog('close');	
console.log('before grep noRostersNo : '+failedVendorsList.length);
failedVendorsList = jQuery.grep(failedVendorsList, function( n, i ) {
	  return ( n !==  selectedVendor);
	});
console.log('after grep noRostersNo : '+failedVendorsList.length);
delete failedVendorsMap[selectedVendor];
getAcknowledgementFromUser(failedVendorsList,failedVendorsMap,area,drafts,successList,'noRostersNo');
};

function modifyCurrentObject(obj,area,changeFlag)
{
var id = (obj.article || obj.article_no) + '_' + (obj.supplier || obj.supplier_no);
var currentObj = area.find('tr[mainrow][data-tt-id="' + id + '"]').data("obj");
if(changeFlag == 'withDeliveryYes')	
{
obj.delivery_valid_flag = 'Y';
obj.delivery_date = currentObj.delivery_date;
if(obj.roster_date == undefined)
{
obj.roaster_date = obj.next_valid_roster_date;
}
else
{
obj.roster_date =obj.next_valid_roster_date;
}

}
if(changeFlag == 'withDeliveryNo')
{
obj.delivery_date = obj.next_valid_delivery_date;
changeDraftDeliveryDate(formatDateMobi(obj.next_valid_delivery_date), '','',true,(obj.supplier || obj.supplier_no));
area.find('tr[mainrow][data-tt-id="' + id + '"]').find('td input.delivery_date_valid').val(formatDateMobi(obj.next_valid_delivery_date));
obj.delivery_valid_flag = 'Y';
if(obj.roster_date == undefined)
{
obj.roaster_date = obj.next_valid_roster_date;
}
else
{
obj.roster_date =obj.next_valid_roster_date;
}
}
if(changeFlag == 'noRostersYes')
{
if(obj.roster_date == undefined)
{
obj.roaster_date = formatDateToMDY(getDesiredFutureDate(0));
}
else
{
obj.roster_date =formatDateToMDY(getDesiredFutureDate(0));
}
obj.delivery_valid_flag = 'Y';
obj.order_type = "EMERGENCY";
obj.emergency_flag = 'Y'; 
}
if(changeFlag == 'noRostersNo')
{
obj.delivery_date = '';
changeDraftDeliveryDate('', '','',true,(obj.supplier || obj.supplier_no));
area.find('tr[mainrow][data-tt-id="' + id + '"]').find('td input.delivery_date_valid').val('');
obj.delivery_valid_flag = undefined;
}
}

function getDesiredPastDateFromDate(count,date) {
	  var desiredDate = '';
	  var thatDay = new Date(new Date(date)
	    .getTime() - 86400000 * count);
	  var newDate = thatDay.getDate();
	  var newMonth = thatDay.getMonth() + 1;
	  if (newDate < 10) {
	    newDate = '0' + newDate;
	  }
	  if (newMonth < 10) {
	    newMonth = '0' + newMonth;
	  }
	  desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
	  return desiredDate;
};
function frameJSONObjectForValidate(x){
	  var drafts = [];
	  if (x.length > 0) {
	    var article, article_uom, supplier, delivery_date, roster_date, qty, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type,glFlag,costPrice,baseUom,costPriceCurrency;
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
	    for (var count = 0; count < x.length; count++) {
		isUnscheduleVendor = x[count].unscheduled_vendor_f;
	      articleNo = x[count].article == undefined ? x[count].article_no : x[count].article;
	      supplierNo = x[count].supplier == undefined ? (x[count].supplier_no) : (x[count].supplier);
	      roasterDate = x[count].roster_date == undefined ? x[count].roaster_date : x[count].roster_date;
	      if(x[count].greenlife_flag!=undefined || x[count].greenlife_flag != '')
	    	  {
	    	  glFlag = x[count].greenlife_flag;
	    	  }
	      else
	    	  {
	    	  glFlag = '' ;
	    	  }
	      if(x[count].cost_price!= undefined && x[count].cost_price!= '')
		  {
		  costPrice = x[count].cost_price;
		  }
	      if(x[count].base_uom!=undefined && x[count].base_uom!='')
		  {
	    	  baseUom = x[count].base_uom;
		  }
	      if(x[count].cost_price_currency!=undefined && x[count].cost_price_currency!='')
		  {
	    	  costPriceCurrency = x[count].cost_price_currency;
		  }	      
	      rpIndFlag = x[count].rp_ind_flag == undefined ? '' : x[count].rp_ind_flag;
	      if (supplierNo == '' || supplierNo == undefined) supplierNo = "";
	      article = articleNo;
	      article_uom = x[count].order_uom;
	      if (article_uom == '') article_uom = "";
	      supplier = supplierNo;
	      lead_time = x[count].lead_time;
	      article_type = x[count].article_type;
	      isUnscheduleVendor = x[count].unscheduled_vendor_f;
	      if (lead_time == undefined || lead_time == '') lead_time = '';
	      if (article_type == 'ZPRD')
	    	  article_type = 'PRODUCE';
		  else article_type = 'NON PRODUCE';		      
	      order_type = "MANUAL";
		  order_category = "NOT ON RECEIPT";
		      
		  roasterDate = ((roasterDate == undefined || roasterDate == '' )? '' : roasterDate);
	      qty = x[count].qty;
	      preqType = x[count].preq_type == undefined ? '' : x[count].preq_type;
	      preqReq =  x[count].preq_req == undefined ? '' : x[count].preq_req;
	      delivery_valid_flag = x[count].delivery_valid_flag == undefined ? '' :x[count].delivery_valid_flag;
		  var isVendor = ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) ? 'Y' : 'N';
		  delivery_date = formatDateToMDY(x[count].delivery_date);
	      if (roasterDate == undefined || roasterDate == '') roasterDate = '';
	      if (salesOrgVal != undefined && salesOrgVal != null && salesOrgVal == bigw_sales_org) {
	        article_type = 'ALL';
	        order_category = 'ALL';	        
	        if(glFlag!=undefined && glFlag!= "" && glFlag == "Y"){
	        	delivery_valid_flag = "Y";
	        }
	        if ((x[count].source != undefined && x[count].source != '' && x[count].source == '1') 
	        		|| (x[count].source_of_supply != undefined && x[count].source_of_supply != '' && x[count].source_of_supply == '1')) {
	          order_type = 'MANUAL PO';
	        } else {
	          order_type = 'MANUAL STO';
	        }
	        if(rpIndFlag == 'RP')
	    	{
	        	article_type = 'RP';
	        	order_type='STORE';
	    	}	     
	      }
	      if(isUnscheduleVendor == "Y"){
	    	  delivery_valid_flag = "Y";
	    	  roasterDate = formatDateToMDY(currDate());
	      }
	    supplier = ""; // sending supplier empty for Roaster Validation
	    drafts.push(getSubmitDraftObj(article, article_uom, supplier, delivery_date, roasterDate, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preqType, preqReq, "", ""));
	    }
	  }
	  return drafts;
	 
}
	  
function frameJSONObjectForSubmitNew(x) {
  var drafts = [];
  if (x.length > 0) {
    var article, article_uom, supplier, delivery_date, roster_date, qty, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type,glFlag,costPrice,baseUom,costPriceCurrency;
    var isUnscheduleVendor = '';
	emergency_flag = '';
	costPrice = '';
	baseUom ='';
	costPriceCurrency = '';
	delivery_valid_flag = '';
	var articleNo;
	var supplierNo;
	var roasterDate;
	var preqType = '';
	var preqReq = '';
	for (var count = 0; count < x.length; count++) {		    	
	preqType = x[count].preq_type; 
	isUnscheduleVendor = x[count].unscheduled_vendor_f;
	articleNo = x[count].article == undefined ? x[count].article_no : x[count].article;
	supplierNo = x[count].supplier == undefined ? (x[count].supplier_no) : (x[count].supplier);
	var id = articleNo+"_"+supplierNo;
	supplierNo = $('#ordersList').find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="supplierFromRC"]').html();	
	roasterDate = (x[count].roaster_date != "" && x[count].roaster_date != undefined) ? x[count].roaster_date : x[count].roster_date;
	roasterDate = ((roasterDate == undefined || roasterDate == '' )? '' : formatDateToMDY(roasterDate));	
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
      qty = x[count].qty;
      preqReq = x[count].preq_req;
      delivery_valid_flag = x[count].delivery_valid_flag;
      var isVendor = ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) ? 'Y' : 'N';    
      order_category =  x[count].order_category;			 
      delivery_date = formatDateToMDY(x[count].delivery_date);
      order_type =   x[count].order_type;      
      var purchase_group = $('#ordersList').find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="purchaseGroup"]').html();
	  var roster_name = $('#ordersList').find('tr[mainrow][data-tt-id="'+id+'"]').find('td[id="roasterName"]').html();
	  if(isUnscheduleVendor == "Y"){
    	  delivery_valid_flag = "Y";
    	  roasterDate = formatDateToMDY(currDate());
    	  roster_name = "UNSCHEDULED";
    	  purchase_group = "";
      }
      drafts.push(getSubmitDraftObj(article, article_uom, supplier, delivery_date, roasterDate, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preqType, preqReq,roster_name, purchase_group));
    }
  }
  return drafts;
}

	
function frameJSONObjectForSubmit(x, Action) {
  var drafts = [];
  if (x.length > 0) {
    var article, article_uom, supplier, delivery_date, roster_date, qty, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type,glFlag,costPrice,baseUom,costPriceCurrency;
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
    for (var count = 0; count < x.length; count++) {
    	if(Action !='validate')
    	preqType = x[count].preq_type;
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
      if(Action =='validate'){
	      if (article_type == 'ZPRD') article_type = 'PRODUCE';
	      else article_type = 'NON PRODUCE';
      order_type = "MANUAL";
      order_category = "NOT ON RECEIPT";
    	}
      roster_date = roasterDate;
      qty = x[count].qty;
     // preqReq =  $('#ordersList').find('tr[mainrow][data-tt-id="'+articleNo+'_'+supplier+'"]').find('td[id="preqReqId"]').html();
      preqReq = x[count].preq_req;
      delivery_valid_flag = x[count].delivery_valid_flag;
	  var isVendor = ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) ? 'Y' : 'N';
	  //Commented as Order Redesign New RC service will handle this
     /* if (x[count].next_delivery_date != null) {
        if (compareDate(x[count].delivery_date, formatDateMobi(x[count].next_delivery_date)) == 'lt') {
          if ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) {
            emergency_flag = 'Y';
            delivery_valid_flag = 'Y';
            order_type = "EMERGENCY";
          } else {
            emergency_flag = '';
            delivery_valid_flag = '';
            order_type = "";
          }
        } else if (compareDate(x[count].delivery_date, formatDateMobi(x[count].next_delivery_date)) == 'eq') {
          delivery_valid_flag = 'Y';
        } else if (compareDate(x[count].delivery_date, formatDateMobi(x[count].next_delivery_date)) == 'gt') {
          emergency_flag = '';
          delivery_valid_flag = '';
        }
      }*/
      /*else if(x[count].next_delivery_date == null || x[count].next_delivery_date == '')
    	  {
    	  if (compareDate(x[count].delivery_date,getDesiredFutureDate(1)) == 'eq') {
    		  if ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) {
    	            emergency_flag = 'Y';
    	            delivery_valid_flag = 'Y';
    	            order_type = "EMERGENCY";
    	          } else {
    	            emergency_flag = '';
    	            delivery_valid_flag = '';
    	            order_type = "";
    	          }
            } 
    	  }*/
      delivery_date = formatDateToMDY(x[count].delivery_date);
      if (roster_date == undefined || roster_date == null) roster_date = '';
    //Commented as Order Redesign New RC service will handle this
     /* if (emergency_flag == 'Y' )
	  {
	  //&& !(compareDate(formatDateMobi(roster_date),getDesiredFutureDate(0)) == 'eq')) { // changed as discussed with Guru
        roster_date = formatDateToMDY(getDesiredFutureDate(0));
      }*/
	  
      //ADDED FOR BIGW SALES ORG ORDER CREATION GURU
      //CODE START
      if (salesOrgVal != undefined && salesOrgVal != null && salesOrgVal == bigw_sales_org) {
        article_type = 'ALL';
        order_category = 'ALL';
        if ((x[count].source != undefined && x[count].source != null && x[count].source == '1') || (x[count].source_of_supply != undefined && x[count].source_of_supply != null && x[count].source_of_supply == '1')) {
          order_type = 'MANUAL PO';
        } else {
          order_type = 'MANUAL STO';
        }
        
        //New changes for RP ind flag in Bigw MUTHU
        if(rpIndFlag == 'Y' || rpIndFlag == 'RP') 
    	{
    	article_type = 'RP';
    	order_type='STORE';
    	}
      //Commented as Order Redesign New RC service will handle this
        //New changes for Greenlife articles in Bigw MUTHU
        /*if(glFlag == 'Y')
        	{
        	roster_date = formatDateToMDY(getDesiredFutureDate(0));
        	}*/
      }
    //Commented as Order Redesign New RC service will handle this
	  //unschedule vendor change Muthu
	  /*if(isUnscheduleVendor == 'Y' && salesOrgVal != bigw_sales_org )
		{
		delivery_date = formatDateToMDY(x[count].delivery_date);
		order_type = "MANUAL";
		roster_date = formatDateToMDY(getDesiredFutureDate(0));
		delivery_valid_flag = 'Y';
		}*/
      //CODE END
      isUnscheduleVendor = 'N';
      drafts.push(getSubmitDraftObj(article, article_uom, supplier, delivery_date, roster_date, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preqType, preqReq));
    }
  }
  return drafts;
}

function getSubmitDraftObj(article, article_uom, supplier, delivery_date, roaster_date, lead_time, article_type, emergency_flag, delivery_valid_flag, order_category, order_type, qty,isVendor,isUnscheduleVendor,glFlag,costPrice,baseUom,costPriceCurrency, preq_type, preq_req, roster_name, purchase_group) {
  var draft;  
   draft = 
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
	"greenlife_f": ((glFlag!=undefined && glFlag!= "" && glFlag == "Y") ? glFlag : "N"),
	"cost_price":((glFlag!=undefined && glFlag!= "" && glFlag == "Y" && (costPrice != undefined || costPrice != "")) ? costPrice : ""),
	"base_uom":((glFlag!=undefined && glFlag!= "" && glFlag == "Y" && (baseUom != undefined || baseUom != "")) ? baseUom : ""),
	"cost_price_currency":((glFlag!=undefined && glFlag!= "" && glFlag == "Y" && (costPriceCurrency != undefined || costPriceCurrency != "")) ? costPriceCurrency : ""),	
	"price_unit": ((glFlag!=undefined && glFlag!= "" && glFlag == "Y" && baseUom != undefined || baseUom != "") ? baseUom : ""),
	"itemCategory": "U",
	"roster_name": ((roster_name != undefined && roster_name != "") ? roster_name : ""),
	"purchase_group": ((purchase_group != undefined && purchase_group != "") ? purchase_group: "" )	
  };
  return draft;
}
function getAllocationDetailsForPopUp(articleNo, deliveryDate) {
  var fromDate = /*formatDateToMDY*/ (getDesiredFutureDate(allocationStartDay));
  var toDate = /*formatDateToMDY*/ (getDesiredFutureDate(allocationEndDay));
  articleNo = padzero((articleNo),18);
  var param = {
    "IV_SAP": encSapPwd,
    "IV_USER_NAME": $('#loginUserId')
      .val(),
    "articleNo": articleNo,
    "fromDate": fromDate,
    "orderNo": "",
    "siteNo": $('#posSite')
      .val(),
      "dept":"",
    "toDate": toDate
  };
  
  console.log(getAllocationOrderFromSAPURL+' '+JSON.stringify(param));
  var promoAllocation = '';
  var output = '';
  var content = '';
  var msg = '';
  var deptList = [];
  var deptString='';
  startLoading();
  $.post(getAllocationOrderFromSAPURL, JSON.stringify(param))
    .done(function(response) {
      promoAllocation = response.result;
      if (promoAllocation != null && promoAllocation != undefined) msg = promoAllocation[0].MSG;
      content += '<thead class="hdrMain"><tr><th width="15px" style="background-image: none;"><span class="indenter"><a title="Expand All" class="expandAll mainTr" id="expandAll">&nbsp;</a>'
        // + '<a href="#" title="Collapse All"
        // class="collapseAll"
        // id="collapseAll">&nbsp;</a>'
        + '</span></th><th >On Show Date</th><th>Allocation #</th>' + '<th >Allocation Description</th><th >Reason</th> <th class="lastColumn" >Department</th></tr></thead><tbody>';
      if (promoAllocation != null && promoAllocation != undefined && promoAllocation.length > 0 && promoAllocation[0].SHOW_DATE != undefined && msg != undefined && !isNaN(msg)) {
        promoAllocation = formMapFromAllocationList(promoAllocation);
        for (var m in promoAllocation) {
          var list = promoAllocation[m];
          content += '<tr class="collapsed parentTr';
          content += ' " id="parent-' + m + '"><td class="parentTd"><span class="indenter" style="padding-left: 0px;"><a title="Collapse">&nbsp;</a></span></td>' + '<td>' + list[0].SHOW_DATE.replace('.', '/')
            .replace('.', '/') + '</td>' + '<td>' + list[0].ALLOCATION_NO.replace(/^0+/, '') + '</td>' + '<td>' + list[0].ALLOCATION_DESC + '</td>' + '<td>' + list[0].ALLOC_REASON + '</td>' + '<td id="allocDept-' + m + '" class="lastColumn">' + list[0].MSG + '</td></tr>';
          for (var i = 0; i < list.length; i++) {
            var deptNo = (list[i].SEGMENT_NO != null && list[i].SEGMENT_NO != undefined) ? (list[i].SEGMENT_NO)
              .substring(0, 2) : '';
            var deptDesc = '';
            if (departmentMap != '' && departmentMap != null && departmentMap != undefined) {
              for (var key in departmentMap) {
                if (key == deptNo) {
                  var obj = departmentMap[key];
                  deptDesc = obj[0].node_desc;
                }
              }
            }
            if (deptDesc != '') deptList.push(deptDesc);
          }
          if (deptList != '' && deptList != null) deptList = unique(deptList);
          listLength = deptList.length;
          deptString += deptList[0];
          if (listLength > 1) {
            deptString += ", " + deptList[1];
          }
          if ((listLength - 2) > 0) {
            for (var i = 0; i < listLength; i++) {
              paramDeptStr += deptList[i];
              if (i != (listLength - 1)) {
                paramDeptStr += ', ';
              }
            }
            deptString += ', and <a href="#n" onclick="expandDeptString(\'' + m + '\', \'' + paramDeptStr + '\')" class="moreNumber">+' + (listLength - 2) + ' more</a>';
          }
          $('#allocDept-' + m)
            .html(deptString);
          deptList = [];
          deptString = '';
          listLength = '';
          paramDeptStr = '';
        }
        content += '</tbody>';
        $('#allocationTablePopUp')
          .html(content);
      } else {
        var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
        $('#allocationTablePopUp')
          .closest('table')
          .html(error);
      }
      stopLoading();
      
    });
}
function submitDraftToSAP(drafts, area) {
	var map = $groupBy(drafts, function(obj) {
		return obj.supplier + '_' + obj.delivery_date;
	});
	if (drafts.length <= limitOrderCount) {
		var loggedInUserId = $('#loginUserId').val();	
		if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
				&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
			submitDraftToSAPAfterConfirm(drafts, area);
	}else{
		getEncSAPPassword({option:'createOrder', drafts:drafts, area:area});			
		}	
		
	} else {
		$('#maxArticleLimit').text(limitOrderCount);
		showConfirmationPopup(map, area, limitOrderCount);
		stopLoading();
	}
}


function showConfirmationPopup(map,area,limit){
	var content='';
	$('#submitAll-dialog').find('#submitOrderContent').html('');
	var i=0;
	for(var key in map){
		var supplier=key.split('_')[0];
		var deliveryDate=key.split('_')[1];
		if(map[key].length<=limit){
			content='<tr id="submit_'+i+'"><td>'+supplier+'</td><td>'+formatDateMobi(deliveryDate)+'</td><td class="centerValue">'+map[key].length+'</td><td class="centerValue lastColumn"><label class="linkBtn saveRowBtn" id="saveRecord_'+i+'"> <a><label class="saveRecord">&nbsp;</label></a> </label></td></tr>';
			$('#submitAll-dialog').find('#submitOrderContent').append(content);
			$('#submitAll-dialog').find('#saveRecord_'+i).data('obj',map[key]);
			$('#submitAll-dialog').find('#saveRecord_'+i).unbind('click');
			$('#submitAll-dialog').find('#saveRecord_'+i).click(function(){
//				startLoading();
				var drafts=$(this).data('obj');
				var loggedInUserId = $('#loginUserId').val();	
				if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
						&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
					submitDraftToSAPAfterConfirm(drafts,area,$(this));
				}else{
					getEncSAPPassword({option:'createOrder', drafts:drafts, area:area, submitButton:$(this)});			
				}				
			});
		}else{
			var length =map[key].length;
			var noofTime = (length/limit).toString().split('.')[1] != undefined ? (Number((length/limit).toString().split('.')[0])+1): 
				Number((length/limit).toString().split('.')[0]);		
			var start = 0;
			var end = limit;
			var draftsObj=map[key];			
			for(var j=0; j<noofTime; j++){					
			content='<tr id="submit_'+i+j+'"><td>'+supplier+'</td><td>'+formatDateMobi(deliveryDate)+'</td><td class="centerValue">'
				+draftsObj.slice(start, end).length+'</td><td class="centerValue lastColumn"><label class="linkBtn saveRowBtn" id="saveRecord_'+i+j+'"> <a><label class="saveRecord">&nbsp;</label></a> </label></td></tr>';
			$('#submitAll-dialog').find('#submitOrderContent').append(content);
			$('#submitAll-dialog').find('#saveRecord_'+i+j).data('obj',draftsObj.slice(start, end));
			$('#submitAll-dialog').find('#saveRecord_'+i+j).unbind('click');
			$('#submitAll-dialog').find('#saveRecord_'+i+j).click(function(){   //startLoading();
				var draft=$(this).data('obj');				
				var loggedInUserId = $('#loginUserId').val();	
				if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
						&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
					submitDraftToSAPAfterConfirm(draft,area,$(this));
				}else{
					getEncSAPPassword({option:'createOrder', drafts:draft, area:area, submitButton:$(this)});			
				}
			});	
			start = end;
			end = start+limit;
		}
		}		
		i++;
		
	}	
	$('#submitAll-dialog').dialog('open');
	stopLoading();
}

// SUBMIT DRAFT TO SAP
function submitDraftToSAPAfterConfirm(drafts,area,popupElem) {
  var loggedInSiteNo = $('#posSite')
    .val();
  var loggedInUserId = $('#loginUserId')
    .val(); 
  var list = drafts;
  var newList = [];
  var param = '';
  	newList = getItemInfo(list);	
  if(newList.length>0){
	  param = new OrderHdrInfo('', encSapPwd, loggedInSiteNo, '', 
			  loggedInUserId, newList, '', '','','', '','X');	  
	  console.log(JSON.stringify(param));
  submitPREQToSAP(param,area,popupElem);
  }else{
	  $.fn.showCustomMsg(['Technical issue occured'],error);  
  }
}

function getItemInfo(param) {
  var list = [];
  var obj = {};
  var article = '';
  if (param != null && param != undefined && param.length > 0) {
    for (var i = 0; i < param.length; i++) {
      if (param[i].article != undefined && param[i].article != null && param[i].article != '' && param[i].delivery_date != undefined && param[i].delivery_date != '' && param[i].delivery_date != null && param[i].preq_type != undefined && param[i].preq_type != '' && param[i].preq_type != null && param[i].qty != undefined && param[i].qty != '' && param[i].qty != null && param[i].article_uom != undefined && param[i].article_uom != '' && param[i].article_uom != null && param[i].supplier != undefined && param[i].supplier != '' && param[i].supplier != null && param[i].roaster_date != undefined && param[i].roaster_date != '' && param[i].roaster_date != null
    		 ) {
        if (article != param[i].article) {
        	
        	if(param[i].greenlife_f != undefined && param[i].greenlife_f !=null && param[i].greenlife_f != '' && param[i].cost_price != undefined && param[i].cost_price
        			 && param[i].cost_price_currency != undefined && param[i].cost_price_currency !=null && param[i].cost_price_currency != '' )
        	{	        		
          obj = new OrderItemInfoForGL(param[i].roster_name, param[i].purchase_group,param[i].greenlife_f,param[i].cost_price,param[i].cost_price_currency,param[i].base_uom,'I', param[i].article, param[i].article_type, param[i].article_uom, param[i].delivery_date, '', param[i].preq_type, param[i].preq_req, param[i].qty, param[i].roaster_date, param[i].supplier);
        	}
        	else
        		{        		 
        		obj = new OrderItemInfoForGL(param[i].roster_name, param[i].purchase_group, "","","",param[i].base_uom,'I', param[i].article, param[i].article_type, param[i].article_uom, param[i].delivery_date, '', param[i].preq_type, param[i].preq_req, param[i].qty, param[i].roaster_date, param[i].supplier);
        		}
          (param[i]);
          list.push(obj);
        }
        if (article == '') {
          article = param[i].article;
        }
      }
    }
  }
  return list;
}
var succ_create ='Order Created Successfully';
function submitPREQToSAP(param, area,popupElem) {
  console.log('url' + createOrderPreqURL);
  console.log('input' + JSON.stringify(param));
  var list = [];
  var html = [];
  var error = [];
  startLoading();
  var temp_obj = {};
  var flag = false;
  $.post(createOrderPreqURL, JSON.stringify(param)).done(function(data) {
      if (data!=null && data.length > 0 && checkResult(data,'typ')) {
        list = data;
        for (var i = 0; i < list.length; i++) {
          if (list[i].typ == 'S') {
            html.push(removeOrderItem(list[i], area,temp_obj));
        	  flag = true;
          } else if (list[i].typ == 'E' && list[i].msg != '') {
            error.push(showErrorArticleLevel(list[i], area));
          }
        }
        if (flag) {
          showAlert();
          $('#okBtn').trigger('click');
          html= [];
          html.push('Order '+Object.keys(temp_obj).join(',')+' created for the submitted articles');
          if(popupElem!=undefined){
              popupElem.addClass('hideBlock');
              $("#submitAll-dialog").parent().css('top', '325px');
              var list = $('#submitOrderContent').find('.saveRowBtn');
              var display = true;
              $(list).each(function(){	
              	if(!$(this).hasClass('hideBlock')){
              	   display = false;
              	}
              });
              if(display){
            	  $("#submitAll-dialog").dialog('close');
              }         
          }  
          showStatusContent(html,succ_create);
        }
        if (error != '') {
        	showAllErrors(error);
        }
      }else if(data ==  null || data ==  undefined || data.length == 0){
		$.fn.showCustomMsg(['Technical issue occured, Please contact JAVA support.'],error);
      }
      stopLoading();
    }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}

function removeOrderItem(val, area,temp_obj) {
  // var response = val.article_list_info;
  var response = [];
  var html = '';
  if (val.msg != undefined && val.msg != null) {
	//get the order alone if it the msg format is : Orderid - articleNo
	val.msg = val.msg.split('-')[0].trim();
	response.push(val.msg);
    response.push(val.article);
    html = ' Order "' + val.msg + '" Created for Articles ';
    temp_obj[val.msg]=(val.msg);
    response.splice(0, 1);
  }
  var articleNo = '';
  for (var i = 0; i < response.length; i++) {
    articleNo = response[i];
    if (i == 0) html += articleNo;
    else html += ',' + articleNo;
  }
  return html + '';
}

function getAlternatePricingInfo(articleNo) {
  var otherPriceParam = {
    "iv_site": $('#posSite')
      .val(),
    "iv_sales_org": loggedInSalesOrg,
    "iv_article": articleNo,
    "iv_ranged": "Y",
    "iv_session_id": ""
  };
  console.log(getOtherPriceInfoUrl + ' ' + JSON.stringify(otherPriceParam));
  $.ajax({
    type: "post",
    url: getOtherPriceInfoUrl,
    data: JSON.stringify(otherPriceParam),
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      var otherPriceArray = response;
      var otherPriceContent = '';
      if (otherPriceArray != null && otherPriceArray != undefined && otherPriceArray.length > 0 && otherPriceArray[0].price_type_desc != undefined) {
        var content = '';
        otherPriceContent += '<tr class="lastRow">';
        for (var i = 0; i < otherPriceArray.length; i++) {
          if (i == 2) {
            content += '<td width="20%" class="noDivider">' + (otherPriceArray[i].price_type_desc == null ? '' : otherPriceArray[i].price_type_desc) + '(' + (otherPriceArray[i].price_type == null ? '' : otherPriceArray[i].price_type) + '):</td><td width="13%" class="lastColumn ">' + (otherPriceArray[i].sell_price == null ? '' : Number(otherPriceArray[i].sell_price)
              .toFixed(2)) + '</td>';
          } else {
            content += '<td width="20%">' + (otherPriceArray[i].price_type_desc == null ? '' : otherPriceArray[i].price_type_desc) + '(' + (otherPriceArray[i].price_type == null ? '' : otherPriceArray[i].price_type) + '):</td>' + '<td width="13%" class="valueInfo" id="mhdPRC">' + (otherPriceArray[i].sell_price == null ? '' : Number(otherPriceArray[i].sell_price)
              .toFixed(2)) + '</td>';
          }
          if (i == 1 && i == otherPriceArray.length - 1) {
            content += '<td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td>';
          }
        }
        var newContent = otherPriceContent + content + '</tr>';
        $('.otherPriceInfoInPop')
          .html(newContent);
      } else {
        $('.otherPriceInfoInPop')
          .html('');
        $('.otherPriceInfoInPop')
          .html('<div class="errorDiv promoError"><label>No Data Found.</label></div>');
      }
      stopLoading();
      
    },
    error: function() {
      stopLoading();
      // stopLoading();// goToLogin();
    },
  });
}

function orderQtyConfirmation(id, clickedSave, from) {
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .find('#message')
    .text(msgOrderReviewMediumQunatiy);
  $("#dialog-confirmation")
    .find('#ok')
    .find('label')
    .text('Yes');
  $("#dialog-confirmation")
    .parent()
    .find('.ui-dialog-title')
    .text('Information');
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
    	 orderQuantityConfirmationAfterNoClick(clickedSave);
         $("#dialog-confirmation")
           .parent()
           .removeClass("popupWrapper");
         $("#dialog-confirmation")
           .dialog("close");
         $('.' + errorFieldClass+':first').focus();//focus the firs
         return false;
    });
  $("#dialog-confirmation")
    .find('#cancel')
    .removeClass('hideBlock');
  $("#dialog-confirmation")
    .find('#cancel')
    .find('label')
    .text('No');
  $("#dialog-confirmation")
    .find('#cancel')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#cancel')
    .click(function() {     
      if (from != undefined && from == 'submit') {
          if (validateFieldsInCreateOrders(clickedSave, from, true)) submittheArticles(clickedSave);
          else {
        	  correctError();
          }
        } else {
          if (validateFieldValues(clickedSave, true)) saveTheArticlesInTable(clickedSave);
        }
        $("#dialog-confirmation")
          .parent()
          .removeClass("popupWrapper");
        $("#dialog-confirmation")
          .dialog("close");
    });
}

var correctError = function(){
	$.fn.showCustomMsg(['Please correct the highlighted fields'],error);
	var $treeTbl = $('#datatable');
	$treeTbl.find('.rowHighlight.groupByExpand1').each(function(){
	//console.log('[data-tt-id="'+$(this).attr('data-tt-id')+'_sub'+'"]'+$(this).next().find('.errorField').length)
	if($(this).next().find('.errorField').length>0){
	    $treeTbl.treetable('expandNode',$(this).attr('data-tt-id'));
	}
	});
};
function totalOrderQtyConfirmation(id, clickedSave, from) {
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .find('#message')
    .text('Total Order quantity is classified as high value, Proceed?');
  $("#dialog-confirmation")
    .find('#ok')
    .find('label')
    .text('Yes');
  $("#dialog-confirmation")
    .parent()
    .find('.ui-dialog-title')
    .text('Information');
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
      if (from != undefined && from == 'submit') {
        if (validateFieldsInCreateOrders(clickedSave, from, true)) submittheArticles(clickedSave);
        else {
      	  correctError();
        }
      } else {
        if (validateFieldValues(clickedSave, true)) saveTheArticlesInTable(clickedSave);
      }
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
    });
  $("#dialog-confirmation")
    .find('#cancel')
    .removeClass('hideBlock');
  $("#dialog-confirmation")
    .find('#cancel')
    .find('label')
    .text('No');
  $("#dialog-confirmation")
    .find('#cancel')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#cancel')
    .click(function() {
      id.val('');
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
      return false;
    });
}

function showBottomWarning(content) {
  $('#warningWrapper')
    .removeClass('hideBlock');
  $('#warningList')
    .html(content);
}

function clearAllErrors() {
  $('.' + errorFieldClass)
    .each(function() {
    	if($("#dialog-confirmation").dialog('isOpen') && $("#dialog-confirmation").find('#message').text() == msgOrderReviewMediumQunatiy){
    		//dont clear error message.Its is need for users to review    		
    	}else{
    		 $(this)
    	        .removeAttr('title');
    	      $(this)
    	        .removeClass(errorFieldClass);
    	}     
    });
}

function showErrorArticleLevel(val, area) {
  var response = [];
  var html = '';
  var msg = 'Technical issue occurred while creating order';
/*  if (val.msg != undefined && val.msg != null) {
    response = val.msg.replace('-', '')
      .split('-');
    // html = '<li> Order "' + val.msg + '" Created for Articles ';
  }*/
  response.push(val);
  for (var i = 0; i < response.length; i++) {
	  if(response[i].msg != null && response[i].msg != undefined)
		  {
		  var articleNo = (response[i].article != null && response[i].article != undefined)? response[i].article.trim():null;
		  var articleMSg = response[i].msg.trim();
		  if(articleMSg != '')
			html += 'Article ' + articleNo + ': ' + articleMSg + '';
		  else
			  {
			html += 'Article ' + articleNo + ': ' + msg + '';
			  }
		  }
  }
  return (html);
}

function showAlert(msg, id) {
  $('#okBtn')
    .unbind('click');
  $('#okBtn')
    .click(function(e) {
      if ($('#allOrdersBtn')
        .parent()
        .hasClass('ui-state-active', 'ui-tabs-active')) $('#allOrdersBtn')
        .trigger('click');
      else $('#myOrdersBtn')
        .trigger('click');
    });
}

function getOpenOrdersForTheArticle(articleNo) {
  var hdrParam = {
    "iv_article": articleNo,
    "iv_order_no": "",
    "iv_delivery_from": "",
    "iv_delivery_to": "",
    "iv_order_type": "",
    "iv_order_status": "",
    "iv_node_id": "",
    "iv_node_lvl": "",
    "iv_srs_ind": "",
    "iv_supplier_no": "",
    "iv_session_id": "111",
    "iv_site": $('#posSite')
      .val(),
    "iv_sales_org": $('#salesOrg')
      .val(),
    "iv_check_alloc": "",
    "iv_alloc_flag": "Y",
    "iv_tab_code": "OPEN_ORDERS"
  };
  var inputDataForHdr = JSON.stringify(hdrParam);
  console.log(getTabResults + ' ' + inputDataForHdr);
  startLoading();
  $.post(getTabResults, inputDataForHdr)
    .done(function(response) {
      var orderList = response;
      if (orderList != null && orderList != undefined && orderList.length > 0 && orderList[0].order_no != undefined) {
        recordCountInOnOrder = orderList.length;
        var j = 1;
        var k = 1;
        var content = '';
        var tableStart = '<table cellspacing="0" class=" ContentTable " id="onOrderTable"><thead><tr><th class="">Order #</th><th class="centerValue" width="75px">Order Qty.</th>' + '<th class="centerValue">Delivery Date</th><th class="">Supplier</th><th class="">Source</th><th class="lastColumn centerValue">Status</th>' + '</tr></thead><tbody >';
        var tableEnd = '</tbody></table>';
        var list = orderList;
        for (var i = 0; i < list.length; i++) {
          list[i].som_order_no = list[i].som_order_no != null ? list[i].som_order_no : "";
          list[i].order_no = list[i].order_no != null ? list[i].order_no : "";
          list[i].order_status = list[i].order_status != null ? list[i].order_status : "";
          list[i].supplier_name = list[i].supplier_name != null ? list[i].supplier_name : "";
          list[i].supplier_no = list[i].supplier_no != null ? list[i].supplier_no : "";
          list[i].source = list[i].source != null ? list[i].source : "";
          list[i].total_cartons = list[i].total_cartons != null ? list[i].total_cartons : "";
          list[i].total_pallets = list[i].total_pallets != null ? list[i].total_pallets : "";
          list[i].delv_date = list[i].delv_date != null ? list[i].delv_date : "";
          content += '<tr class="page-' + j + ' ';
          if (i > 6) {
            content += 'hideBlock';
          }
          content += '" ><td>';
          if (list[i].som_order_no == "") {
            content += list[i].order_no.replace(/^0+/, '') + '</td>';
          } else if (list[i].som_order_no != list[i].order_no) {
            content += list[i].som_order_no + ' (' + list[i].order_no.replace(/^0+/, '') + ')' + '</td>';
          } else {
            content += list[i].order_no.replace(/^0+/, '') + '</td>';
          }
          content += '<td class="centerValue"></td><td class="centerValue">' + (list[i].delv_date != '' ? formatDateMobi(list[i].delv_date) : '') + '</td>' + '<td class="">';
          if (list[i].supplier_name != '') content += list[i].supplier_name;
          if (list[i].supplier_no != '') content += '(' + list[i].supplier_no + ')';
          content += '</td>' + '<td class="centerValue">' + list[i].source + '</td>' + '<td class="centerValue">' + list[i].order_status + '</td>';
          content += '</tr>';
          if (k % 7 == 0) {
            j++;
          }
          k++;
        }
        $('#orderPopUpCntnt')
          .html(tableStart + content + tableEnd);
        $('.onOrderTitle')
          .removeClass('hideBlock');
        $('#onOrderCount')
          .text(recordCountInOnOrder);
        $('.onOrderPaginationDiv')
          .pagination({
            items: recordCountInOnOrder,
            itemsOnPage: 7,
            cssStyle: 'compact-theme',
            currentPage: currentPageInOnOrder,
            onPageClick: function(pageNumber, event) {
              getOnOrdersForPagination(pageNumber);
            }
          });
        if (recordCountInOnOrder / itemsOnPage > 1) {
          $('.onOrderPaginationDiv')
            .removeClass('hideBlock');
        } else {
          $('.onOrderPaginationDiv')
            .addClass('hideBlock');
        }
      } else {
        $('.onOrderPaginationDiv')
          .addClass('hideBlock');
        $('.onOrderTitle')
          .addClass('hideBlock');
        var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderPopUpErrorTable"></tbody></table>';
        $('#orderPopUpCntnt')
          .html(error);
        $('#orderPopUpErrorTable')
          .html('<div class="errorDiv promoError"><label>No Data Found.</label></div>');
      }
      stopLoading();
    });
}
function getLimitQtyFromService() {
  var loggedInSalesOrg = $('#salesOrg')
    .val();
  var param = {
    "IV_SALES_ORG": loggedInSalesOrg,
    "iv_order_type": "PO"
  };
  $.ajax({
    type: "post",
    url: getLimitQty,
    data: JSON.stringify(param),
    beforeSend: function() {},
    success: function(response) {
      if (response != null && response != undefined
        // && response.length >= 1
        && response.result != undefined && response.result[0].order_limit_qty != undefined) {
        limitOrderQty = response.result[0].order_limit_qty;
        limitOrderCount = response.result[0].rtv_max_article_range;
      } else {
    	  var errors= [];
    	  errors.push('Sorry, Limit Qty not found for the Sales Org.');
    	  showAllErrors(errors);
        limitOrderQty = 99;
      }
      stopLoading();
    },
    error: function() {
    	showAllErrors([mobiSerErrMsg]);
      limitOrderQty = 99;
      stopLoading();
    },
  });
}
function saveTheArticlesInTable(clickedSave) {
  if ((clickedSave.id)
    .split('_')[1] == $(clickedSave)
    .closest('table')
    .attr('id')
    .split('_')[1]) {
    console.log('success');
    var tableId = $(clickedSave)
      .closest('table')
      .attr('id');
    createDraft(tableId, "D", $('#' + tableId)
      .closest('div#ordersList'));
    if (isGrouped) {
      var totalCar = 0;
      $('#' + tableId)
        .find('.orderQty')
        .each(function() {
          totalCar += Number(isNaN($(clickedSave)
              .val()) ? 0 : $(clickedSave)
            .val());
        });
      $('#' + tableId)
        .find('.totalCarton')
        .text(totalCar);
      var totalGrpCar = 0;
      $('.orderQty')
        .each(function() {
          totalGrpCar += Number(isNaN($(clickedSave)
              .val()) ? 0 : $(clickedSave)
            .val());
        });
      $('.totalGroupCarton')
        .text(totalGrpCar);
    }
    if ($('#allOrdersBtn')
      .parent()
      .hasClass('ui-state-active', 'ui-tabs-active')) $('#allOrdersBtn')
      .trigger('click');
    else $('#myOrdersBtn')
      .trigger('click');
  }
}

function confirmationForEmergencyOrder(obj, val, selectedDateField,prevDate) {
	
	var supplierNo = (obj.supplier == undefined) ? (obj.supplier_no) : (obj.supplier);
    var source = (obj.source_of_supply == undefined ? (obj.source) : (obj.source_of_supply));
    
    if (supplierNo.toString()
            .length == 4 && source == "2")
    	{
    	msg = 'You must obtain approval from the warehouse and National Order Room prior to submitting this order.';
          showAlertForEmergencyOrder(msg, val, selectedDateField,prevDate,obj);
    	}
       else if(obj.greenlife_flag==undefined || obj.greenlife_flag==null || obj.greenlife_flag!="Y") {
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .find('#ok')
    .find('label')
    .text('Yes');
  $("#dialog-confirmation")
    .find('#message')
    .text("You have selected a date prior to the next available delivery. Do you want to submit an Emergency Order?");
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
      changeDraftDeliveryDate(val, selectedDateField,prevDate);
    });
  $("#dialog-confirmation")
    .find('#cancel')
    .find('label')
    .text('No');
  $("#dialog-confirmation")
    .find('#cancel')
    .removeClass('hideBlock');
  $("#dialog-confirmation")
    .find('#cancel')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#cancel')
    .click(function() {
      selectedDateField.closest('tr')
        .data("obj")
        .delivery_date = obj.prev_entered_delivery_date;
      selectedDateField.val(obj.prev_entered_delivery_date);
      //selectedDateField.focus();
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
    });
          }
}

function submittheArticles(clickedSubmit) {
  if ((clickedSubmit.id)
    .split('_')[1] == $(clickedSubmit)
    .closest('table')
    .attr('id')
    .split('_')[1]) {
    console.log('success');
    var tableId = $(clickedSubmit)
      .closest('table')
      .attr('id');
    //Defect_9813 - Fix
    validateDraft(tableId, "S", $('#' + tableId), $('#' + tableId)
            .closest('div#ordersList'));
    /*submitDraft(tableId, "S", $('#' + tableId), $('#' + tableId)
      .closest('div#ordersList'));*/
  }
}

function showAlertForEmergencyOrder(msg, val, elem,prevDate,obj) {
  //$('#alertBox').addClass('hideBlock');
  $('#alertBox')
    .html(msg);
  $('#dialog-alertBox')
    .parent()
    .find('.ui-dialog-title')
    .text('Order Enquiry');
  $("#dialog-alertBox")
    .removeClass('hideBlock');
  $("#dialog-alertBox")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-alertBox")
    .dialog("open");
  $('#okBtn')
    .unbind('click');
  $('#okBtn')
    .click(function(e) {
      $("#dialog-alertBox")
        .dialog("close");
      $('#alertBox')
        .text('');
      $('#dialog-alertBox .removableMsg')
        .remove();
      $('#alertBox')
        .removeClass('hideBlock');
      if(obj != undefined)
    	  {
  	var supplierNo = (obj.supplier == undefined) ? (obj.supplier_no) : (obj.supplier);
    var source = (obj.source_of_supply == undefined ? (obj.source) : (obj.source_of_supply));
    
    if (supplierNo.toString()
            .length == 4 && source == "2")
    	elem.val(obj.prev_entered_delivery_date);
    }
   if(obj == undefined && isAlertNoDel){
    	changeDraftDeliveryDate(val, elem,prevDate);
   }
      
      
    });
}

function formatMobiTime(cutofftime) {
  var hours = cutofftime.substring(0, 2);
  var mins = cutofftime.substring(2, 4);
  var secs = cutofftime.substring(4, 6);
  var finaltime = hours + ":" + mins + ":" + secs;
  return finaltime;
}

function formTotalCatonValue(area) {
  if (isGrouped) {
    var totalCar = 0;
    area.find('.orderQty')
      .each(function() {
        totalCar += Number(isNaN($(this)
            .val()) ? 0 : $(this)
          .val());
      });
    area.find('.totalCarton')
      .text(totalCar);
  }
}

function bindPriceUomClick(id) {
  $('input[name="searchByOptionsPrice"]')
    .click(function() {
      $('.priceAndUnitInfo')
        .closest('table')
        .addClass('hideBlock');
      var selectedValue = this.id;
      $('.' + selectedValue)
        .closest('table')
        .removeClass('hideBlock');
    });
}

function formMapFromAllocationList(list) {
  var hdrMap = {};
  for (var i = 0; i < list.length; i++) {
    var key = list[i].ALLOCATION_NO;
    var value = list[i];
    var newList = [];
    if ($(hdrMap)
      .attr(key) != undefined) {
      newList = $(hdrMap)
        .attr(key);
    }
    newList.push(value);
    hdrMap[key] = newList;
  }
  return hdrMap;
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function expandDeptString(m, deptString) {
  $('#allocDept-' + m)
    .text(deptString);
}

function bindEventsForOpenOrders(pr, thisElem, obj) {
  createAutoSuggest(pr.find('#searchBox'));
  pr.find('#mo_groupByForm')
    .hide();
  pr.find('#mo_wareHouseDropDown')
    .html($('#mo_wareHouseDropDown')
      .html());
  pr.find('#md_addActionBtn')
    .unbind('click');
  pr.find('#md_addActionBtn')
    .click(function() {
      clearAllErrors();
      pr.find('#md_filterClear')
        .trigger('click');
      pr.find('#md_groupByClear')
        .trigger('click');
      pr.find('#articleSearchFormForCreate')
        .slideToggle(100);
    });
  pr.find('#md_filterOpen')
    .unbind('click');
  pr.find('#md_filterOpen')
    .click(function() {
      clearAllErrors();
      pr.find("#md_filterClear")
        .removeClass('hideBlock');
      $.fn.showInformationMsg();
      $(this)
        .addClass('hideBlock');
      pr.find('#articleSearchFormForCreate')
        .hide(100);
      if (pr.find('#md_groupByClear')
        .is(':visible')) {
        pr.find('#md_groupByClear')
          .trigger('click');
      }
    });
  pr.find('#md_filterClear')
    .unbind('click');
  pr.find('#md_filterClear')
    .click(function() {
      clearAllErrors();
      pr.find("#md_filterOpen")
        .removeClass('hideBlock');
      $('.filterWrapper').fadeOut(50);
      $(this)
        .addClass('hideBlock');
    });
  pr.find('#md_groupByOpen')
    .unbind('click');
  pr.find('#md_groupByOpen')
    .click(function() {
      clearAllErrors();
      pr.find("#md_groupByClear")
        .removeClass('hideBlock');
      pr.find(this)
        .addClass('hideBlock');
      pr.find('#articleSearchFormForCreate')
        .hide(100);
      if (pr.find('#md_filterClear')
        .is(':visible')) {
        pr.find('#md_filterClear')
          .trigger('click');
      }
      pr.find('#del')
        .trigger('click');
      pr.find('#mo_groupByForm')
        .show();
    });
  pr.find('#md_groupByClear')
    .unbind('click');
  pr.find('#md_groupByClear')
    .click(function() {
      clearAllErrors();
      pr.find("#md_groupByOpen")
        .removeClass('hideBlock');
      $(this)
        .addClass('hideBlock');
      pr.find('#mo_groupByForm')
        .hide();
    });
  pr.find('#ordersList .tbody')
    .html('');
  pr.find('#searchAndAdd')
    .unbind('click');
  pr.find('#searchAndAdd')
    .click(function() {
      clearAllErrors();
      if (validateBeforeSearch(pr)) {
        //pr.find('#isVerified').val(false);
        var formData = pr.find('#articleSearchFormForCreate')
          .getJSON();
        var area = pr.find('#ordersList');
        formData.tmpFlag = true;
        var groupByValue = (area.find('#articleSearchFormForCreate')
          .attr('data-groupby-value'));
        var groupBy = (area.find('#articleSearchFormForCreate')
          .attr('data-groupby'));
        if (groupBy == 'department') {
          var nodeLevel = area.find('#nodeLevel')
            .val();
          var nodeId = area.find('#nodeId')
            .val();
        } else if (groupBy == 'supplier') {
          var srcInd = area.find('#srcIndicator')
            .val();
          var supplierNo = '';
          if (srcInd == '1') {
            supplierNo = area.find('input[id="vendorText"]')
              .val();
          } else if (srcInd == '2') {
            supplierNo = area.find('select')
              .val();
          }
        }
        formData.newSearch = true;
        searchAricleForCreateOrders(formData, area, nodeLevel, nodeId, srcInd, supplierNo);
      }
    });
  pr.find('input[type="radio"]')
    .unbind('click');
  pr.find('input[type="radio"]')
    .click(function() {
      clearAllErrors();
      $('.supplierSource')
        .find('span')
        .addClass('hideBlock');
      var linkItem = $(this)
        .attr('linkItem');
      pr.find('#' + linkItem)
        .removeClass('hideBlock');
      pr.find('#' + linkItem)
        .find('input,select')
        .focus();
      pr.find('#' + linkItem)
        .find('input,select')
        .val('');
    });
  pr.find('#verifySupplier1')
    .unbind('click');
  pr.find('#verifySupplier1')
    .click(function() {
      clearAllErrors();
      if ($(this)
        .hasClass('disabled')) return false;
      hideErrorInDraft();
      var vendorNo = '';
      var vendorName = '';
      if ($(this)
        .attr('id') == 'verifySupplier1') {
        vendorNo += pr.find('#vendorText')
          .val()
          .split("-")[0];
        /*
         * vendorName += $('#vendorText') .val().split("-")[1];
         */
      } else {
        pr.find('#vendorText')
          .val();
      }
      if ($(this)
        .attr('id') == 'goButtonSample1') {
        vendorNo += pr.find('#vendorDesc')
          .val()
          .split("-")[0];
        vendorName += pr.find('#vendorDesc')
          .val()
          .split("-")[1];
      }
      if (pr.find('#vendorText')
        .val() != '') {
    	  
    	  vendorTextBox = pr.find('#vendorText');
	    	isVendorChecked =pr.find("#isVerified");
	    	getVendorLookup(vendorNo,vendorTextBox,isVendorChecked);
      } else {
    	  var errors = [];
    	  errors.push(enter_supp_msg);
        showAllErrors(errors);
        showToolTipAndfocus(pr.find('#vendorText'), 'Please fill supplier field');
      }
    });
  pr.find('#warehouse1')
    .unbind('click');
  pr.find('#warehouse1')
    .click(function() {
      clearAllErrors();
      hideErrorInDraft();
      pr.find("#warehouseField1")
        .removeClass('hideBlock');
      pr.find("#vendorField1")
        .addClass('hideBlock');
      pr.find("#allField1")
        .addClass('hideBlock');
      pr.find('#vendorText')
        .val('');
    });
  pr.find('#vendor1')
    .unbind('click');
  pr.find('#vendor1')
    .click(function() {
      clearAllErrors();
      hideErrorInDraft();
      pr.find("#vendorField1")
        .removeClass('hideBlock');
      pr.find("#warehouseField1")
        .addClass('hideBlock');
      pr.find("#allField1")
        .addClass('hideBlock');
      pr.find('#mo_wareHouseDropDown')
        .val('');
    });
  pr.find('#all1')
    .unbind('click');
  pr.find('#all1')
    .click(function() {
      clearAllErrors();
      hideErrorInDraft();
      pr.find("#allField1")
        .removeClass('hideBlock');
      pr.find("#warehouseField1")
        .addClass('hideBlock');
      pr.find("#vendorField1")
        .addClass('hideBlock');
      pr.find('#mo_wareHouseDropDown')
        .val('');
      pr.find('#vendorText')
        .val('');
    });
  $('.closeMessage')
    .click(function() {
      $(this)
        .parent()
        .addClass("hideBlock");
    });
  if (obj != undefined) {
    if (obj.source != undefined && obj.source == '2') {
      pr.find('#warehouse1')
        .trigger('click');
      pr.find('[name="directVendor"]')
        .val(obj.supplier_no)
        .attr('style', 'background: rgb(217, 217, 217');
      pr.find('[name="directVendor"]')
        .prop('disabled', true);
    } else if (obj.source != undefined && obj.source == '1') {
      pr.find('#vendor1')
        .trigger('click');
      pr.find('[name="iv_src_supply"]')
        .trigger('click');
      pr.find('[name="wareHouse"]')
        .val(obj.supplier_no)
        .attr('style', 'background: rgb(217, 217, 217');
      pr.find('#verifySupplier1')
        .addClass('disabled');
    }
  }
  pr.find('#closeLink')
    .click(function() {
      pr.find('#articleSearchFormForCreate')
        .slideToggle(100);
    });
  pr.find('#vendorText')
    .unbind('change');
  pr.find('#vendorText')
    .on("change", function() {
      pr.find('#isVerified')
        .val(false);
    });
  $('.closeMessage')
    .trigger('click');
}

function bindAccordionClickEvent(from) {
  $('tr[mainrow]')
    .unbind('click');
  if (from != undefined) {
    $('tr[mainrow]')
      .click(function() {
        var tableId = $(this)
          .closest('table')
          .attr('id');
        var expandedRowLength = $('#' + tableId + ' .grpTbody tr[mainrow][class="expanded"]')
          .length;
        var totalRowLength = $('#' + tableId + ' .grpTbody tr[mainrow]')
          .length;
        var collapsedRowLength = $('#' + tableId + ' .grpTbody tr[mainrow][class="collapsed"]')
          .length;
        if (expandedRowLength == totalRowLength) {
          $('.expandAll')
            .addClass('hideBlock');
          $('.expandAll')
            .next()
            .removeClass('hideBlock');
        } else if (collapsedRowLength == totalRowLength) {
          $('.collapseAll')
            .addClass('hideBlock');
          $('.collapseAll')
            .prev()
            .removeClass('hideBlock');
        }
      });
  } else {
    $('tr[mainrow]')
      .click(function() {
        var tableId = $(this)
          .closest('table')
          .attr('id');
        var expandedRowLength = $('#' + tableId + ' .tbody tr[mainrow][class="expanded"]')
          .length;
        var totalRowLength = $('#' + tableId + ' .tbody tr[mainrow]')
          .length;
        var collapsedRowLength = $('#' + tableId + ' .tbody tr[mainrow][class="collapsed"]')
          .length;
        if (expandedRowLength == totalRowLength) {
          $('#' + tableId)
            .find('.expandAll')
            .addClass('hideBlock');
          $('#' + tableId)
            .find('.expandAll')
            .next()
            .removeClass('hideBlock');
        } else if (collapsedRowLength == totalRowLength) {
          $('#' + tableId)
            .find('.collapseAll')
            .addClass('hideBlock');
          $('#' + tableId)
            .find('.collapseAll')
            .prev()
            .removeClass('hideBlock');
        }
      });
  }
}



function showToolTipAndfocus(obj, msg) {
  //	obj.focus();
  obj.addClass('errorField');
  addtooltip(obj, msg);
  obj.change(function() {
    $(this)
      .removeClass(errorFieldClass);
    removetooltip($(this));
  });
  $(".tooltip")
    .tooltip({
      position: {
        my: "left center",
        at: "right+10 center"
      }
    });
}

function showStatusContent(content,title) {
	$.fn.showCustomMsg(content,success,title);
}

function showInformation(msg, flag) {
  $('.confirmation-yesbtn,.confirmation-nobtn')
    .addClass("hideBlock");
  $("#dialog-confirmation")
    .find('#ok')
    .removeClass("hideBlock");
  $("#dialog-confirmation")
    .find('#cancel')
    .addClass('hideBlock');
  $("#dialog-confirmation")
    .parent()
    .addClass("popupWrapper");
  $("#dialog-confirmation")
    .find('#message')
    .html(msg);
  $("#dialog-confirmation")
    .dialog("open");
  $("#dialog-confirmation")
    .parent()
    .find('.ui-dialog-title')
    .text('Information');
  $("#dialog-confirmation")
    .find('#ok')
    .unbind('click');
  $("#dialog-confirmation")
    .find('#ok')
    .click(function() {
      $("#dialog-confirmation")
        .parent()
        .removeClass("popupWrapper");
      $("#dialog-confirmation")
        .dialog("close");
      if (flag) $('#mainBackBtn')
        .trigger('click');
      $('.editRecord')
        .trigger('click');
    });
  // $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function getForecastOrders(data) {
  $.ajax({
    type: "get",
    url: "../article/generateReport.htm",
    data: data,
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
    	console.log('inside forecast ajax');
      iterateResult(response);
      stopLoading();
      //getIntrasitOrders(data);
    },
    error: function() {
      // goToLogin();
    },
  });
}

function iterateResult(response) {
  var output = $.parseJSON(response);
  if ((output.data != null && output.data != undefined && output.data[0].msg != undefined && output.data[0].msg.trim() != '') || (output.msg != null && output.msg.length > 0)) {
    var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderfcstPopUpErrorTable"></tbody></table>';
    $('#frcstOrdersPopUpCntnt')
      .html(error);
    $('#orderfcstPopUpErrorTable')
      .html('<div class="errorDiv promoError"><label>No Data Found.</label></div>');
  } else if (output.data != null && output.data.length > 0) {
    var descList = output.data;
    recordCount = descList[0].count;
    currentPage = pageNumber;
    var myDate = new Date();
    var dayOne = new Date();
    var dayTwo = new Date();
    var dayThree = new Date();
    var dayFour = new Date();
    var dayFive = new Date();
    var daySix = new Date();
    dayOne.setDate(dayOne.getDate() + 1);
    dayTwo.setDate(dayTwo.getDate() + 2);
    dayThree.setDate(dayThree.getDate() + 3);
    dayFour.setDate(dayFour.getDate() + 4);
    dayFive.setDate(dayFive.getDate() + 5);
    daySix.setDate(daySix.getDate() + 6);
    var content = '';
    var tableStart = '<table cellspacing="0" class="ContentTable" id=""><thead><tr><th class="centerValue">3/10</th><th class="centerValue">4/10</th>' + '<th class="centerValue">5/10</th><th class="centerValue">6/10</th><th class="centerValue">7/10</th><th class="centerValue">8/10</th>' + '<th class="lastColumn centerValue">9/10</th></tr></thead><tbody>';
    var tableEnd = '</tbody></table>';
    $.each(descList, function(i, item) {
      content += '<tr class="appended ';
      if (i == descList.length) content += content + ' lastRow ';
      content += '" id=" ' + i + '">' + '<td class="art-no hideBlock">' + item.articleNo + '</td>' + '<td class="hideBlock">' + item.articleDesc + '</td>' + '<td class="centerValue">' + item.day1Qty + '</td>' + '<td class="centerValue">' + item.day2Qty + '</td>' + '<td class="centerValue">' + item.day3Qty + '</td>' + '<td class="centerValue">' + item.day4Qty + '</td>' + '<td class="centerValue">' + item.day5Qty + '</td>' + '<td class="centerValue">' + item.day6Qty + '</td>' + '<td class="centerValue">' + item.day7Qty + '</td> </tr>';
    });
    $('#frcstOrdersPopUpCntnt')
      .html(tableStart + content + tableEnd);
  }
  stopLoading();
}
//# sourceURL=createOrdersNew.js