var currentOrderNo = '';
var globalTempFlag = false;
var recvItemInfo = {};
var ibtRejectMainObj = {};
var order_chilledFlag = false;
var order_frozenFlag = false;
function bindEventsForOrderOnReceipt() {
        invoiceAlphaNumericOrderOnRec();
	$('#orderOnReceipt-tab-link').click(function() {
		$('#oor_articlesearchBox').focus();
	});
	$('#oor_viewModeTable').addClass('hideBlock');
	$('#addOrderOnReceipt').click(function() {
		$('#tableCreateAction').slideToggle(100);
		if ($("#showHideAdd").hasClass('addRow')) {
			$("#showHideAdd").removeClass('addRow');
			$("#showHideAdd").addClass('hideRow');
		} else if ($("#showHideAdd").hasClass('hideRow')) {
			$("#showHideAdd").removeClass('hideRow');
			$("#showHideAdd").addClass('addRow');
		}
	});

	$('#oor_articlesearchBox').keypress(function(event) {
		if (event.which == 13) {
			lockSupplierUsingArticle({
				"iv_article" : $(this).val()
			});
			resetSearchArea();
		}
	});

	$('#oor_supplierSearchBox').keypress(function(event) {
		if (event.which == 13) {
			lockSupplierUsingVendor();
			resetSearchArea();
		}
	});

	$('#oor_searchBox').keypress(function(event) {
		event.stopPropagation();
		if (event.which == 13) {
			console.log('inhere');
			var article = $(this).val();
			var qty = $('#tableIBTActionsWrapper').find('#qty').val();
			var tmpObj = { "iv_article" : article,"qty" : qty};
			if($('#on_rece_store').is(':checked')){
				getArticlesForST(tmpObj);
			}else{
				oorAddArticle(tmpObj);
			}
		}
	});

	$('#oor_closeMessage').click(function() {
		hideOor_err();
	});

	$('#oor_cancelOrder').unbind('click').click(
			function() {
				$('#oor_articlesearchBox').val('');
				$('#oor_articlesearchBox').prop('disabled', false).removeAttr(
						'style');
				$('#oor_supplierSearchBox').prop('disabled', false).removeAttr(
						'style');
				$('#on_receipt_order_no').prop('readonly', false).removeAttr(
				'style');
				$('#on_receipt_store_no').prop('readonly', false).removeAttr(
				'style');
				$('#oor_supplierSearchBox,#on_receipt_order_no,#on_receipt_store_no').val('');
				$('#oor_viewModeTable').addClass('hideBlock');
				$('#oor_listOfArticle').html('List of Articles');
				//$('#checkboxChangeOm').prop('checked', false);
				$('#oor_totalUnits').text('0');
				$('#oor_articleResultArea').find('.tbody').html('');
			});

	$('#oor_addActionBtn,#oor_closeLink').click(function() {
		$('#tableIBTActionsWrapper').slideToggle(100);
	});

	$('#tableIBTActionsWrapper').find('#searchAndAdd').click(function() {
		var article = $('#oor_searchBox').val().split('-')[0].trim();
		var qty = $('#tableIBTActionsWrapper').find('#qty').val();
		var tmpObj = { "iv_article" : article,"qty" : qty};
		if($('#on_rece_store').is(':checked')){
			getArticlesForST(tmpObj);
		}else{
			oorAddArticle(tmpObj);
		}
	});

	$('#checkboxChangeOm').change(
			function() {
				$('#oor_articleListTable').find('.newOm').val('');
				if ($(this).is(':checked')) {
					$('.onCheckOnly').removeClass('hideBlock');
				} else {
					$('.onCheckOnly').addClass('hideBlock');
				}

				$('#oor_articleListTable').find('.orderQty').each(
						function() {
							var om = $(this).attr('data-om');
							if ($(this).parent().parent().find('.newOm')
									.val().trim()!='') {
								om = $(this).parent().parent().find('.newOm')
										.val();
							}
							var val = $(this).val();
							var totVal = Number(om) * Number(val);
							$(this).parent().parent().find('.totalUnit').text(
									(totVal != null && totVal != '' && totVal.toString().indexOf('.') != -1)? totVal.toFixed(3):totVal);

						});

				var allSumUnit = 0;
				$('#oor_articleListTable').find('.tbody').find('.orderQty')
						.each(function() {
							allSumUnit += Number($(this).val());
						});
				$('#oor_totalUnits').text(allSumUnit);

			});
	$('#temperature1_OOR,#temperature2_OOR').on('keypress', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');

	       if ((k < '0' || k > '9') && k !== '.' && k !== '-') return false;

	       // reject any input that takes the length
	       // two or more beyond the decimal point
	       if (dp >= 0 && v.length > dp + 2) {
	           return false;
	       }

	       // don't accept >1 decimal point, or as first char
	       if (k === '.' && (dp >= 0 || v.length === 0)) {
	           return false;
	       }

	   });
	   $('#temperature1_OOR,#temperature2_OOR').on('keyup', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');
	       if (this.value >= 1000 || this.value <= -1000)
	       	{//this.value='';
	        if(this.value.indexOf('-') == 0){
	             this.value= this.value.substr(0, 4);
	        }else {
	             this.value= this.value.substr(0, 3);
	        }
	           return false;
	       }

	   });
	   
	   /* $('#temperature1_OOR').unbind('change');
	    $('#temperature1_OOR').change(function() {
	        var integerValue = $(this).val();
	        $(this).val(Number(integerValue).toFixed(2));
	    });
	    $('#temperature2_OOR').unbind('change');
	    $('#temperature2_OOR').change(function() {
	        var integerValue = $(this).val();
	        $(this).val(Number(integerValue).toFixed(2));
	    });*/
	$('.numberBox').within9999();

	createAutoSuggest($('#tableIBTActionsWrapper').find('#oor_searchBox'));
	createAutoSuggest($('#oor_articlesearchBox'));

	$('#oor_createOrder').unbind('click').click(function() {
		if ($(this).hasClass('disabled'))
			return false;
		if($('#on_rece_vendor').is(':checked')){
			var loggedInUserId = $('#loginUserId').val();
			if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
					&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
				submitOrderOnReceipt();
			}else{
				getEncSAPPassword({option:'orderOnReceipt'});
							
			}
		}else{
			if (validateSubmit()){
				var loggedInUserId = $('#loginUserId').val();	
				if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
						&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
					$.fn.warnPopup('warn','Are you sure you want to submit?','Order on receipt',function(e){var obj = e.data; obj.msg.dialog('close'); finalizeReceive();},function(e){var obj = e.data; obj.msg.dialog('close');},'','');
				}else{
					$.fn.warnPopup('warn','Are you sure you want to submit?','Order on receipt',function(e){var obj = e.data; obj.msg.dialog('close'); getEncSAPPassword({option:'finalizeReceive'});},function(e){var obj = e.data; obj.msg.dialog('close');},'','');
								
				}
			}
			
		}
	});

	$("#dialog-session").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 650
	});

	$("#dialog-receive").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 605
	});

	$("#dialog-receive").parent().addClass("popupWrapper");

	$("#dialog-session").parent().addClass("popupWrapper");

	$('#continueRec').click(function() {
		hideFinError();
		$("#dialog-receive").dialog('open');
		$("#dialog-session").dialog('close');
	});

	$('#cancelRec,#cancelFin').click(function() {
		hideFinError();
		$('#orderOnReceiptDialogForm')[0].reset();
		$('#oor_cancelOrder').trigger('click');
		$("#dialog-session").dialog('close');
		$("#dialog-receive").dialog('close');
	});
	function validateTempCheck() {
		var tempChkFlag = true;
		order_chilledFlag = false;
		order_frozenFlag = false;
		if(!temperatureDisableFlg){
			var temperature = 0;
			var HDtemperature = 0;
			var tempMin = 0;
			var tempMax = 0;
			var HdTempMin = 0;
			var HdTempMax = 0;

			if (recvItemInfo.ch == true) {
				temperature = Number(getEmptyIfNull($("#temperature1_OOR").val().trim()));

				if (recvItemInfo.ch_temperature_range_min != null) {
					tempMin = Number(recvItemInfo.ch_temperature_range_min);
				}
				if (recvItemInfo.ch_temperature_range_max != null) {
					tempMax = Number(recvItemInfo.ch_temperature_range_max);
				}

				if ((getEmptyIfNull(tempMax) != '')) {
					if(Number(temperature) > Number(tempMax)){
						order_chilledFlag= true;
					}
				}
			}
			if (recvItemInfo.hd == true) {
				HDtemperature = Number(getEmptyIfNull($("#temperature2_OOR").val().trim()));

				if (recvItemInfo.hd_temperature_range_min != null) {
					HdTempMin = Number(recvItemInfo.hd_temperature_range_min);
				}
				if (recvItemInfo.hd_temperature_range_max != null) {
					HdTempMax = Number(recvItemInfo.hd_temperature_range_max);
				}
				if ((getEmptyIfNull(HdTempMax) != '')) {
					if(Number(HDtemperature) > Number(HdTempMax)){
						order_frozenFlag  = true;
					}
				}
			}

			console.log(temperature + "==temperature" + tempMin + tempMax);
			console.log(HDtemperature + "==HDtemperature" + HDtemperature + HdTempMax);

			
			if(order_frozenFlag || order_chilledFlag){
				tempChkFlag = false;
			}
			if (recvItemInfo.ch == false && recvItemInfo.hd == false) {
				tempChkFlag = true;
			}
		}else{
			tempChkFlag = true;
		}
		return tempChkFlag;
	}

	$('#proceedFin').unbind('click').click(
					function() {
						hideFinError();
						if (validateFin()) {
							if (validateTempCheck()) {
									getEncSAPPassword();
									finalizeReceive();									
							} else {
							//Temp too high warning Durai change
								$.fn.warnPopup('', 'Temperature out of range.  Some articles have failed temperature check. Please Re-enter the temperature', 'Temperature out of range!', '' ,'',triggerReEnterOOR, '');	
								$('#dialog-alert-conf #ok .actionBtn').text('Re-Enter');
							}

						} else {
							showFinError("Please Enter Mandatory Fields.");
						}
					});

	$('.number').each(function(){
		if($(this).attr('id') != 'temperature2_OOR' && $(this).attr('id') != 'temperature1_OOR'){
			$(this).numbersonly();
		}
	});

	$('#oor_searchArea').find('input').keypress(function(event) {
		event.stopPropagation();
		if (event.which == 13) {
			$('#oor_searchArea').find('#searchAndAdd').trigger('click');
		}
	});

	$('#oor_articleResultArea').find('input').keypress(
			function(event) {
				event.stopPropagation();
				if (event.which == 13) {
					$('#oor_articleResultArea').find('#oor_createOrder')
							.trigger('click');
				}
			});
	$('#checkboxChangeOm').prop('checked',true).parent().addClass('hideBlock');
	
	// vendor radio button change event
	$('#on_rece_vendor').unbind('change').change(function(){
		if($(this).is(':checked')){
			var $elem = $('#tableCreateAction');
			$('#tableCreateAction').removeClass('hideBlock');
			$('#on_receipt_tab_store').addClass('hideBlock');
			$('#oor_viewModeTable').addClass('hideBlock');
			//if(!$elem.find('#oor_articlesearchBox,#oor_articlesearchBox').is(':disabled')){
			$elem.find('#oor_articlesearchBox').prop('disabled', false).removeAttr(
			'style');
			$elem.find('#oor_supplierSearchBox').prop('disabled', false).removeAttr(
			'style');
				$elem.find('#oor_supplierSearchBox').val('');
				$elem.find('#oor_articlesearchBox').val('').focus();
			//}
		}
	});
	// Store radio button change event
	$('#on_rece_store').unbind('change').change(function(){
		if($(this).is(':checked')){
			$elem = $('#on_receipt_tab_store');
			$('#tableCreateAction').addClass('hideBlock');
			$elem.removeClass('hideBlock');
			$('#oor_viewModeTable').addClass('hideBlock');
			//if(!$elem.find('#on_receipt_order_no,#on_receipt_store_no').attr('readonly')){
			$elem.find('#on_receipt_order_no,#on_receipt_store_no').prop('readonly',false);
				$elem.find('#on_receipt_order_no').val('').focus();
				$elem.find('#on_receipt_store_no').val('');
			//}
		}
	});

	// order number smart search
	orderSmart($('#on_receipt_order_no'),[],order,maxAutoResult,true);

	// store number smart search
	createSupplierAutoSuggest($('#on_receipt_store_no'));

	// enter key press event for order number input field
	$('#on_receipt_order_no').unbind('keypress').keypress(function(event) {
		event.stopPropagation();
		if (event.which == 13) {
			getStOrder($(this).val());
		}
	});

	// enter key press event for store number input field
	$('#on_receipt_store_no').unbind('keypress').keypress(function(event) {
		event.stopPropagation();
		if (event.which == 13) {
			var st = $(this).val();
			if(validateStore(st)){
				getStore(st,$(this));
			}
		}
	});
	$('#oor_articlesearchBox').focus();
	loggedInSalesOrg = $('#salesOrg').val();
	
	if($("#on_rece_vendor").hasClass("hideBlock") 
	     && !$("#on_rece_store").hasClass("hideBlock")){
		$('#on_rece_store').trigger('click');
	}
	if($("#on_rece_vendor").hasClass("hideBlock") && 
				$("#on_rece_store").hasClass("hideBlock")){
			$('#tableCreateAction').addClass('hideBlock');
			$('#orderOnReceipt-tab-link').addClass('hideBlock');
	}
}

var lockStOrder = function(response){
	ibtRejectMainObj = response;
	var itemList = [];
	if(response.itemFlag){
		itemList = response['itemObj'];
		for(var i=0;i<itemList.length;i++){
			itemList[i].qty = itemList[i].order_qty;
			addAriclesToOorReceipt(itemList[i], {});
		}
		disableStore(response['hdrObj'].ibt_recv_no+'-'+(response['hdrObj'].ibt_recv_name||''));
	}
};

var disableStore = function(supplier){
	$('#on_receipt_store_no').attr('readonly',true).val(supplier);
	$('#on_receipt_order_no').attr('readonly',true).val('');
	$('#oor_articleListTable .onCheckOnly').addClass('hideBlock');
	$('#on_receipt_store_no,#on_receipt_order_no').autocomplete( "close" );
	resetSearchArea();
};

var validateStore = function(store,response){
	var flag = true;
	if(store == loggedInSiteNo){
		$.fn.showCustomMsg(['Supplier cannot be same as logged in store.'],error);
		flag = false;
	}
	if(response!=undefined){
		// need add ALH validation based on requirement
		// currently hold because requirement not available while developing
	}
	return flag;
};

var validateStOrder = function(param,response){
	if(response!=null && response!=undefined){
		if(isST(response.order_type) && isAuth(response.order_status) && response.supplier_no == $('#posSite').val()){
			getOrderItemInfo(new OrderItemParam(response.order_no,response.source_flag,'',''),{hdrObj:response},lockStOrder);
		}else{
			$.fn.showCustomMsg(['Please enter a valid stock transfer order number.'],error);
			stopLoading();
		}
	}else{
		stopLoading();
	}
};

var lockStore = function(param,response){
	disableStore(supplier);
};

var getStOrder = function(orderNo){
	if(orderNo.trim() == ''){
		$.fn.showCustomMsg(['Please enter a valid order number.'],error);
	}else{
		var param =  new orderParam('',orderNo,'','','','','','','','');
		param.followUp = validateStOrder;
		getOrderBasicDetails(param);
	}
};

var getArticlesForST = function(obj){
	if(obj.iv_article.trim() == ''){
		$.fn.showCustomMsg(['Please enter a valid article number.'],error);
	}else{	
		console.log(getArticleDetailsForIbtUrl + '    '+ JSON.stringify(getArticleSearchParamSt(obj.iv_article)));
		startLoading();
		 $.post(getArticleDetailsForIbtUrl, JSON.stringify(getArticleSearchParamSt(obj.iv_article)), function(data) {
		      if (data != '' && data.length >0 && $.fn.checkMobiResult(data,'article') == '') {
		    	  /*if (data.length == 1 && (data[0]['order_uom']||'') == '') {
		    		  // add article to the list
		    		  addAriclesToOorReceipt(data[0],obj);
		    		  $('#oor_articleListTable .onCheckOnly').addClass('hideBlock');
			      }else{*/
			      		//Defect_12197
		    	  if(data.length == 1 && (data[0].supplier||'').trim()==''){
  					$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);	
		    	  }else{
		    		  frameArticleVerifyPopUp(obj.iv_article,data);
		    	  }
			      /*}*/
		      }else{
		           $.fn.showCustomMsg(['Please enter a valid article number.'],error);
		      }
		}).always(function(){stopLoading();}).fail(function(){$.fn.showCustomMsg([mobiSerErrMsg],error); stopLoading();});
	}
};

var getArticleSearchParamSt = function(searchStr){
	var articleSearchParam = undefined;
	articleSearchParam = new ArticleSearchParam(searchStr.split('-')[0].trim());
	articleSearchParam.iv_auto_stockr_flag="";
	articleSearchParam.iv_ranged="";
	articleSearchParam.iv_deleted_flag="Y";
	articleSearchParam.iv_delisted_flag="Y";
	articleSearchParam.iv_uom_flag = 'Y';
	articleSearchParam.iv_ibt_desc = "";
	return articleSearchParam;
};

var getStore = function(storeNo,$placeHolder){
	if(storeNo.trim() == ''){
		$.fn.showCustomMsg(['Please enter a valid store number.'],error);
	}else{
		storeNo = storeNo.split('-')[0].trim();
		startLoading();
		 $.post(getSupplierSuggestionsUrl, JSON.stringify({iv_vendor : storeNo, iv_sales_org : $('#salesOrg').val()}), function(data) {
		      if (data != '' && data.length >0 && $.fn.checkMobiResult(data,'supplier_no')== '') {
		    	  if (data.length == 1) {
		    		  disableStore(data[0].supplier_no+'-'+data[0].supplier_name);
		    		  showEmptyStore();
			      }else{
			    	  frameStoreVerifyPopUp(storeNo,data,$placeHolder);
			      }
		      }else{
		           $.fn.showCustomMsg(['Please enter a valid store number.'],error);
		      }
		}).always(function(){stopLoading();}).fail(function(){$.fn.showCustomMsg([mobiSerErrMsg],error); stopLoading();});
	}
};

var getArticle_uom_st = function(obj){
	var cont = '';
	if(obj.pack_break_down_flag == 'Y'){
		if((obj.article_uom||'')!='' && (obj.article_uom||'')!=obj.order_uom){
			cont+='<input type="checkbox" uom="'+obj.article_uom+'" class="uom" id="'+(obj.article+'_'+obj.article_uom)+'" name="'+(obj.article+'_'+obj.article_uom)+'" value="'+(obj.article+'_'+obj.article_uom)+'" checked="checked">';
			cont+='<label for="'+(obj.article+'_'+obj.article_uom)+'">'+obj.article_uom+'</label>';
		}else if((obj.order_uom||'')!='' && (obj.base_uom||'')!=obj.order_uom){
			cont+='<input type="checkbox" uom="'+obj.order_uom+'" class="uom" id="'+(obj.article+'_'+obj.order_uom)+'" name="'+(obj.article+'_'+obj.order_uom)+'" value="'+(obj.article+'_'+obj.order_uom)+'" checked="checked">';
			cont+='<label for="'+(obj.article+'_'+obj.order_uom)+'">'+obj.order_uom+'</label>';
		}
	}else{
		if((obj.base_uom||'')!=''){
			cont+='<input type="checkbox" uom="'+obj.base_uom+'" class="uom" id="'+(obj.article+'_'+obj.base_uom)+'" name="'+(obj.article+'_'+obj.base_uom)+'" value="'+(obj.article+'_'+obj.base_uom)+'" checked="checked">';
			cont+='<label for="'+(obj.article+'_'+obj.base_uom)+'">'+obj.base_uom+'</label>';
		}
		if((obj.order_uom||'')!='' && (obj.base_uom||'')!=obj.order_uom){
			cont+='<input type="checkbox" uom="'+obj.order_uom+'" class="uom" id="'+(obj.article+'_'+obj.order_uom)+'" name="'+(obj.article+'_'+obj.order_uom)+'" value="'+(obj.article+'_'+obj.order_uom)+'" checked="checked">';
			cont+='<label for="'+(obj.article+'_'+obj.order_uom)+'">'+obj.order_uom+'</label>';
		}
	}
	return cont;
};
function frameStoreVerifyPopUp(searchText,data,$elem){
	var tmpObj = new verifyPopUp('store_verify_pop_up_tbl',searchText,data,'','',onStoreSelect,'');
	$.fn.loadContentPopUp(new tblConfStore(tmpObj),tmpObj,'','','' );
}

function frameArticleVerifyPopUp(searchText,data,$elem){
	var tmpObj = new verifyPopUp('article_search_result',searchText,data,checkboxOption,'',onArticleTdCheck,onArticleSelect);
	var confObj = new tblConfArticle(searchText,data,checkboxOption,'',onArticleTdCheck);
	confObj.key = ['article','article_desc','article_uom_st','label'];
	confObj.cont_data_function = {article_uom_st:getArticle_uom_st};
	confObj.content_td_addon['article_uom_st'] = {'input':{event:{click : bindClickStCheckBox},display: retainSTCheck}};
	$.fn.loadContentPopUp(confObj,tmpObj,'','','');
}

var bindClickStCheckBox = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var uom = $elem.attr('uom');
	if($elem.is(':checked')){
	    obj[uom] = 'Y';
	}else{
	    obj[uom] = 'N';
	}
};

function retainSTCheck($elem,obj){
	if($elem!=undefined && $elem.length>0){
		for(var i = 0;i<$elem.length;i++){
			$newElem = $($elem[i]);
			var uom = $newElem.attr('uom');
			if($newElem.is(':checked')){
			    obj[uom] = 'Y';
			}else{
			    obj[uom] = 'N';
			}
		}
	}
}

var onStoreSelect = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	disableStore(obj.supplier_no+'-'+obj.supplier_name);
	showEmptyStore();
	$('#dialog-mulipleArticles').dialog('close');
};

var onArticleSelect = function(event){
	$elem = $(this);
	var data = getCheckObj($elem.data('checkedObj'));
	var tmpObj = {qty:$('#oor_searchArea').find('#qty').val().trim()};
	if(data!=undefined && data.length>0){
		var baseUom = '';
		var orderUom = '';
		var pbdUom = '';
				//Defect_12197
		var errorArray = [];
		for(var i = 0;i<data.length;i++){
			if((data[i].supplier||'').trim() == ''){
				errorArray.push('Article '+data[i].article+ ': No supplier found in Store Central please contact support.')
			}else{
				baseUom = (data[i].base_uom||'');
				data[i].qty = (tmpObj.qty||'');
				orderUom = (data[i].order_uom||'');
				pbdUom = (data[i].article_uom||'');
				if(data[i].pack_break_down_flag == 'Y'){
					if(pbdUom!= ''  && data[i][pbdUom]== 'Y'){
						data[i].order_uom = data[i].article_uom;
						addAriclesToOorReceipt(data[i],tmpObj);
					}else if(orderUom!= ''  && data[i][orderUom]== 'Y'){
						addAriclesToOorReceipt(data[i],tmpObj);
					}
				}else{
					data[i].om = (data[i].order_uom_om||'');
					if(baseUom!= ''  && data[i][baseUom]== 'Y'){
						addAriclesToOorReceipt(cloneUomObj(data[i]),tmpObj);
					}
					if(orderUom!= ''  && data[i][orderUom]== 'Y'){
						addAriclesToOorReceipt(data[i],tmpObj);
					}
				}
			}
		}
		resetSearchArea();
		if(errorArray.length>0){
			$.fn.showCustomMsg(errorArray,error);
		}
		$('#oor_articleListTable .onCheckOnly').addClass('hideBlock');
	}
};

var cloneUomObj = function(obj){
	var newObj = jQuery.extend({}, obj);
	newObj['om'] = '1';
	newObj['article_uom'] = newObj['base_uom'];
	newObj['order_uom'] = newObj['base_uom'];
	return newObj;
};


var showEmptyStore = function(){
	$('#oor_listOfArticle').html('List of Articles');
	$('#oor_totalUnits').text('0');
	$('#oor_articleResultArea').find('tbody').html('<tr norecordrow><td colspan="11">No articles added.</td></tr>');
	$('#oor_createOrder').addClass('disabled');
	$('#oor_viewModeTable').removeClass('hideBlock');
};

function validateFin() {        // for Defect_6837
	var flag = true;
	$("#dialog-receive").find('.mandatory:visible').parent().find('input:visible').each(function() {
		flag &= $(this).required();
	});
	return flag;
}

function validateSubmit() {
	var flag = true;
	var moFlag = false;
	var errorHtml = [];

	if ($('#checkboxChangeOm').is(':checked')) {
		moFlag = true;
	}

	$('#dialog-receive').find('.input').val('');

	$('#oor_articleListTable').find('[mainrow]').each(
			function() {
				var obj = $(this).data('obj');

				var articleNo = (obj.article == undefined ? obj.article_no
						: obj.article)
						+ '-' + obj.article_uom;
				var qty = Number($(this).find('.orderQty').val());
				if (qty <= 0) {
					$(this).find('.orderQty').error(
							'Receive quantity should be greater than 0.');
					errorHtml.push(articleNo
							+ ' :Receive quantity should be greater than 0.');
					flag = false;
				}
				if(obj.random_wgt_flg == 'Y'){
					var weight = Number($(this).find('.wgtVal').val());
					if (weight <= 0) {
						$(this).find('.wgtVal').error(
								'Total received weight should be greater than 0.');
						errorHtml.push(articleNo
								+ ' :Total received weight should be greater than 0.');
						flag = false;
					}
				}

				if (moFlag) {
					var newom = (!$(this).find('.newOm').prop('readonly') && $(this).find('.newOm').val().trim()!='') ? Number($(this).find('.newOm').val()) : '';
					if (newom.toString()!= '' && newom <= 0 && obj.random_wgt_flg != 'Y' && obj.order_uom != obj.base_uom) {
						$(this).find('.newOm').error(
								'OM must greater than zero.');
						errorHtml.push(articleNo
								+ ' :OM must greater than zero.');
						flag = false;
					}
					var expFlag = false;
					var expError = true;
					$(this).find('.inputDate').each(function(item){
						$(this).val()!='';
							if ($(this).val()!='') {
								 if(!isValidDate($(this).val())){
									$(this).error(
									'Please enter a valid date.');
									errorHtml.push(articleNo
											+ ' :Please enter a valid date.');
									expError = false;
								}else if(!$(this).noPastValidation()){
									$(this).error(
									'Expiry Date should not be past.');
									errorHtml.push(articleNo
											+ ' :Expiry Date should not be past.');
									expError = false;
								}
								expFlag = true;
							}else if(!expFlag && $(this).hasClass('exp5') && (obj.expiry_flag||'') == 'Y'){
								$(this).closest('td').find('.inputDate:first').error(
								'Please enter expiry date.');
								errorHtml.push(articleNo
										+ ' :Please enter expiry date.');
								expError = false;
							}
					});
					if(!expError){
						$(this).find('.moreLink').trigger('click');
						flag = false;
					}
				}

			});
	if (!flag) {
		showAllErrors(errorHtml);
	}
	return flag;
}

function getFinaliseParam() {

	var items = [];

	$('#oor_articleListTable').find('[mainrow]')
			.each(
					function() {
						var obj = $(this).data('obj');
						var item = {
							"iv_article" : obj.article,
							"iv_article_tun_flag" : "",
							"iv_article_type" : "",
							"iv_expiry_date1" : "",
							"iv_expiry_date2" : "",
							"iv_expiry_date3" : "",
							"iv_expiry_date4" : "",
							"iv_expiry_date5" : "",
							"iv_line_no" : "",
							"iv_new_om" : "",
							"iv_om" : obj.om,
							"iv_qty" : $(this).find('.orderQty').val(),
							"iv_random_ea_as_uom" : "",
							"iv_random_weight" : "",
							"iv_random_weight_qty" : "",
							"iv_random_weight_uom" : "",
							"iv_random_wgt_flag" : (obj.random_wgt_flg !=undefined && obj.random_wgt_flg !=null)?obj.random_wgt_flg :"",
							"iv_receive_method" : "",
							"iv_supplier_no" : $('#oor_supplierSearchBox')
									.val().split('-')[0],
							"iv_temp_ind" : "N",
							"iv_unknow_ref_flag" : "",
							"iv_unknown_ref" : "",
							"iv_uom" : obj.order_uom,
							"iv_tun" : "",
							"iv_ean" : "",
							"article_uom" : obj.article_uom,
							"iv_adj_qty":"",
							"iv_adj_qty_uom":"",
							"iv_adj_pi_qty":"",
							"iv_order_recv_method" : "",
							"iv_exidv" : "",
							"iv_pbd_flag": (obj.pack_break_down_flag||''),
							"iv_article_cat_id": (obj.article_cat_id||''),
							"iv_pack_size_base": (obj.pack_size_base||''),
							"iv_base_uom": (obj.base_uom||''),
							"iv_display_ind":(obj.display_article_flag ||''),
							"iv_display_article":"",
							"iv_base_order_no":"",
							"iv_sub_category_no":obj.sub_category_no,
							"iv_art_delivery_no":"",
							"iv_zero_qty_flag":'N' //Defect - 11767 - Indicated as Y only for substitution articles in ADD RECEIVING TRANSACTION
						};
						//if ($('#checkboxChangeOm').is(':checked')) {
							item.iv_expiry_date1 = ($(this).find('.exp1').val()||'')!='' ? convertDateStringToMMDDYYYY($(this).find('.exp1').val()||'') : '';
							item.iv_expiry_date2 = ($(this).find('.exp2').val()||'')!='' ? convertDateStringToMMDDYYYY($(this).find('.exp2').val()||'') : ''; 
							item.iv_expiry_date3 = ($(this).find('.exp3').val()||'')!='' ? convertDateStringToMMDDYYYY($(this).find('.exp3').val()||'') : '';
							item.iv_expiry_date4 = ($(this).find('.exp4').val()||'')!='' ? convertDateStringToMMDDYYYY($(this).find('.exp4').val()||'') : '';
							item.iv_expiry_date5 = ($(this).find('.exp5').val()||'')!='' ? convertDateStringToMMDDYYYY($(this).find('.exp5').val()||'') : '';
							item.iv_new_om = $(this).find('.newOm').prop('readonly') ? obj.om : ($(this).find('.newOm').val().trim()||obj.om);
						//}
						item.iv_adj_qty = item.iv_qty;
						item.iv_adj_qty_uom = item.iv_uom;
						item.iv_adj_pi_qty = '0';
						if (obj.random_wgt_flg != undefined
								&& obj.random_wgt_flg.trim() != '' 
									&& obj.random_wgt_flg.trim() == 'Y') {
							obj.pi_om = obj.pi_om != null && obj.pi_om != undefined ? obj.pi_om : 0;
							item.iv_random_weight_uom = obj.order_uom;
							item.iv_random_weight_qty = Number($(this).find(
									'.orderQty').val()) * Number(obj.pi_om);
							item.iv_random_weight = $(this).find('.wgtVal')
									.val();
							item.iv_random_weight = (item.iv_random_weight == undefined || 
									item.iv_random_weight == "")?"":item.iv_random_weight;
							//item.iv_adj_qty = item.iv_random_weight_qty;
							item.iv_adj_qty = item.iv_random_weight;
							item.iv_adj_qty_uom = item.iv_random_weight_uom;
							item.iv_adj_pi_qty = item.iv_random_weight_qty;							
						}
						items.push(item);
					});
	var onVendor = $('#on_rece_vendor').is(':checked');
	
	var param = {
		"iv_item_info" : items,
		"iv_action_flag" : "P",
		"iv_asn_no" : "",
		"iv_carrier" : $('#dialog-receive #carr').val(),
		"iv_chilled_temp" : temperatureDisableFlg ? '' : $('#dialog-receive #temperature1_OOR').val(),
		"iv_comments" : "",
		"iv_cons_freight" : $('#dialog-receive #cf').val(),
		"iv_delivery_date" : formatDateToMDY(getCurentDateTxt()),
		"iv_delivery_no" : "",
		"iv_dgms_dept" : $('#dialog-receive #dgms').val(),
		"iv_frozen_temp" : temperatureDisableFlg ? '' : $('#dialog-receive #temperature2_OOR').val(),
		"iv_invoice_no" : $('#dialog-receive #invoice').val(),
		"iv_multi_receipt" : "X",
		"iv_order_no" : "",
		"iv_order_type" : "ZNB",
		"iv_pwd" : encSapPwd,
		"iv_receive_method" : "",
		"iv_rego" : "",
		"iv_roaster_date" : getCurentDateTxt(),
		"iv_sap_order_type" : "DGR",
		"iv_session_id" : "100",
		"iv_site_no" : $('#posSite').val(),
		"iv_supplier_no" : onVendor ? $('#oor_supplierSearchBox').val().split('-')[0] : $('#on_receipt_store_no').val().split('-')[0],		//		ibtRejectMainObj['hdrObj'].ibt_recv_no
		"iv_temp_ind" : "N",
		"iv_trailer" : "",
		"iv_trans_id" : "",
		"iv_user_id" : $('#loginUserId').val(),
		"iv_order_recv_method": "",
		"iv_platform" : "B",
		"iv_era_partial_recv_flag":"",
		"iv_multiple_delivery":""
	};

	return param;
}

function finalizeReceive() {
	var oorReceiveUrl = '';
	var onVendor = $('#on_rece_vendor').is(':checked');
	if(onVendor){
		oorReceiveUrl = orderOnReceiptURL;
	}else{
		oorReceiveUrl = rejectIBTOrderURL;
	}
	var param = getFinaliseParam();

	console.log('url' + oorReceiveUrl);
	console.log('input' + JSON.stringify(param));

	var supplier = '';
	var list = [];
	var html = [];
	var errors = [];
	$
			.ajax({
				data : JSON.stringify(param),
				url : oorReceiveUrl,
				type : 'post',
				// contentType : "application/json",
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					// response = $.parseJSON(response);
					if (response.length == 1
							&& response[0].ErrorMsg != undefined) {
						showInformationInOrderOnReceipt(
								[ 'Sorry, Some technical issue occurred :'
										+ response[0].ErrorMsg ], error,
								'Order On Receipt');
					} else {
						//Defect_12126
						if(!onVendor){
							if (response != null && response != undefined									
									&& response.length > 0 && response[0].typ == 'S') {
								 $.fn.showCustomMsg(['Articles are submitted successfully.'],success);
								$('#oor_cancelOrder').trigger('click');
							}else{
								if(response.length == 1 && response[0].typ == "E" && response[0].msg !=""){
									 $.fn.showCustomMsg([''+response[0].msg+''],error);
								}else{
									 $.fn.showCustomMsg([mobiSerErrCode],error);
								}
							}
						}else{
							if (response != null && response != undefined	
							&& response.length > 0) {
								list = response;	
								var articls ='';
								for ( var i = 0; i < list.length; i++) {
									if (list[i].typ == 'S') {										
										if (i == 0) articls += list[i].article;
									    else articls += ',' + list[i].article;
										/*html.push('Article "' + list[i].article
												+ '" has been received,Ref No:'
												+ list[i].msg + '.');*/															        	  
										 currentOrderNo = list[i].msg;										
										 /*
										 * var drafts=[];
										 * $('#oor_articleListTable').find('[mainrow]').each(function(){
										 * var obj=$(this).data('obj'); var
										 * draft=getDraftObj(obj.article,
										 * obj.article_uom, $('#loginUserId').val(),
										 * $('#loginUserId').val(),
										 * $('#loginUserId').val(), obj.qty, obj.om,
										 * (getCurentDateTxt()), obj.supplier,
										 * formatDateToMDY(getCurentDateTxt()),
										 * "X","POR"); drafts.push(draft); });
										 * updateDrafts(drafts);
										 */
										// Commented to avoid deletion after the
										// successful creation of order on receipt
										// removing the entry from the page
										$('#oor_articleListTable').find('.tbody')
												.html('');
										if ($('#oor_articleListTable').find(
												'.tbody').html().trim() == '') {
											$('#oor_cancelOrder').trigger('click');
										}
									} else if (list[i].typ == 'E'
											&& list[i].msg != '') {
										errors.push('Order receive Failed : "'
												+ list[i].msg + '"');
									} else {
										showInformationInOrderOnReceipt(
												[ 'Technical issue occured while receiving order' ],
												error, 'Order On Receipt');
									}
								}
								if(currentOrderNo != '' && articls != ''){
									html.push('Articles "' + articls
									+ '" has been received,Ref No:'
									+ currentOrderNo + '.');
								}
	
								if (html.length > 0 && errors.length > 0) {
									$("#dialog-receive").dialog('close');
									$('#cancelFin').trigger('click');
									showInformationInOrderOnReceipt(html.push(errors), success,
											'Order On Receipt');
								}
								else if (errors.length > 0 && html.length == 0) {
									showInformationInOrderOnReceipt(errors, error,
											'Order On Receipt');
								}
								else if (html.length > 0 && errors.length == 0) {
									$("#dialog-receive").dialog('close');
									$('#cancelFin').trigger('click');
									showInformationInOrderOnReceipt(html, success,
											'Order On Receipt');
								}
							}
						}
					}
					$('#orderOnReceiptDialogForm')[0].reset();
					stopLoading();
				},
				error : function(err) {
					console.log(err);
					stopLoading();
					showInformationInOrderOnReceipt(
							[ 'Network issue occured while reveiving Order'
									+ err ], error, 'Order On Receipt');
				}
			});
}

function lockSupplierUsingArticle(formData) {
	hideOor_err();
	var articleNoFlag = "";
	var descFlag = "";
	var gtinFlag = "";
	var errors = [];
	var supplierNo = "";
	var srcOfSupplyInd = "";
	if (!isNaN((formData.iv_article).split('-')[0])){
		srcOfSupplyInd = "1,A"
	}
	var salesOrg = $('#salesOrg').val();
	if (formData.iv_article.trim() == '') {
		errors.push('Please enter some text to search.');
		showAllErrors(errors);
		return false;
	}
	if (isNaN((formData.iv_article).split('-')[0]))
		descFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length > 7)
		gtinFlag = "Y";
	var nodeLevel = "";
	var nodeId ="";
	if(isNaN((formData.iv_article).split('-')[0])){
		var createParam = {
				"iv_article"	: formData.iv_article
				.split('-')[0],
				"iv_site"		: siteVal,
				"iv_sales_org"	: $("#salesOrg").val(),
				"iv_supplier"	:supplierNo,
				"iv_src_supply"	: srcOfSupplyInd,
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
			beforeSend : function() {
				startLoading();
			},
			success: function(response) {
				if(response.length > 0){
				showSupplierSelectPopupDesc(response, formData);
				} else {
				//	showAllErrors([ 'Cannot add article. Please check article or Supplier, then try again.' ]);
					$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
					stopLoading();
				}
				stopLoading();
			},error : function() {
				showAllErrors([ mobiSerErrMsg ]);
				stopLoading();
			},
			});
		
	}else{
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" : articleNoFlag,
		"iv_gtin" : gtinFlag,
		"iv_article" : (formData.iv_article).split('-')[0],
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : "",
		"iv_src_supply" : srcOfSupplyInd,
		"iv_ranged" : "Y",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : $('#posSite').val(),
		"iv_node_id" : "",
		"iv_node_level" : "",
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : "",
		"iv_uom_flag" : "Y",
		"iv_auto_stockr_flag" : "",
		"iv_delisted_flag" : "N",
		"iv_deleted_flag" : "N"
	};
	console.log(packBreakArticleSearchDraft + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : packBreakArticleSearchDraft,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {										
					resetSearchArea();
					if (response.length == 1) {
						var eraProfile = (response[0].era_profile == undefined ?'': response[0].era_profile);
						if(salesOrg==1060 && eraProfile=="Y"){
							$.fn
							.warnPopup(
									'alert',
									'Cannot add articles supplied by ERA Vendors',//Defect_8776 Fix
									'Information',
									'',
									'',
									triggerOkInOR, $(this),'');
								
						}
						else{
							var obj = response[0];
							if(obj.ps_article_status == '08'){
							   showAllErrors([ 'Cannot add the article. Article is Recalled.' ]);
							}else if(response.length == 1 && (response[0].supplier||'').trim()==''){
		    					$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);
		    				}else{
								var articleNo = response[0].article == undefined ? response[0].article_no
										: response[0].article;
								var costPrice=response[0].cost_price == undefined ? ''
										: response[0].cost_price;
								var greenLifeFlag=response[0].greenlife_flag == undefined ? ''
										: response[0].greenlife_flag;
								var alternate_vendor_flag = response[0].alternate_vendor_flag == undefined ? ''
										: response[0].alternate_vendor_flag;
								var draft = getDraftObj(
										articleNo,
										obj.order_uom,
										$('#loginUserId').val(),
										$('#loginUserId').val(),
										$('#loginUserId').val(),
										((formData.qty == undefined || formData.qty == '') ? '0'
												: formData.qty), obj.om,
										formatDateToMDY(getCurentDateTxt()),
										obj.supplier,
										formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice,greenLifeFlag,
										alternate_vendor_flag);
								createDrafts([ draft ]);
								loadDraftOOR(obj.supplier);
								// addAriclesToOorReceipt(response[0], formData);
								lockSupplier(response[0]);
							}
						}
					} else if (response.length > 1) {
						showSupplierSelectPopup(response, formData);
					} else {
						showAllErrors([ 'Cannot add article. Please check article or Supplier, then try again.' ]);// Defect
						// no
						// 1923
						stopLoading();
					}
					stopLoading();			
				},
				error : function() {
					showAllErrors([ mobiSerErrMsg ]);
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});
	}
}

var triggerOkInOR = function(e) {
	var $elem = e.data.dialog;
	$elem.dialog('close');	
	
};

function oorAddArticle(formData) {
	hideOor_err();
	hideSROor_err();
	var articleNoFlag = "";
	var descFlag = "";
	var gtinFlag = "";
	var supplierNo = "";
	var srcOfSupplyInd = "";
	if (!isNaN((formData.iv_article).split('-')[0])){
		srcOfSupplyInd = "1,A";
	}
	var nodeLevel ="";
	var nodeId = "";
	if (formData.iv_article.trim() == '') {
		showAllErrors([ 'Please enter some text to search.' ]);
		return false;
	}
	formData.qty = $('#tableIBTActionsWrapper').find('#qty').val();
	if (isNaN((formData.iv_article).split('-')[0]))
		descFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length > 7)
		gtinFlag = "Y";
	if (isNaN((formData.iv_article).split('-')[0])){
		var createParam = {
				"iv_article"	: formData.iv_article
				.split('-')[0],
				"iv_site"		: siteVal,
				"iv_sales_org"	: $("#salesOrg").val(),
				"iv_supplier"	:supplierNo,
				"iv_src_supply"	: srcOfSupplyInd,
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
			beforeSend : function() {
				startLoading();
			},
			success: function(response) {
				if(response.length > 0){
					showSupplierSelectPopupMultiSelectDesc(response, formData);
					resetSearchArea();
				} else {
				//	showAllErrors([ 'Cannot add article. Please check article or Supplier, then try again.' ]);
					$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
					stopLoading();
				}
				stopLoading();
			},error : function() {
				showAllErrors([ mobiSerErrMsg ]);
				stopLoading();
			},
			});
		

	}else {
	
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" : articleNoFlag,
		"iv_gtin" : gtinFlag,
		"iv_article" : (formData.iv_article).split('-')[0],
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : $('#oor_supplierSearchBox').val().split('-')[0],
		"iv_src_supply" : srcOfSupplyInd,
		"iv_ranged" : "Y",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : $('#posSite').val(),
		"iv_node_id" : "",
		"iv_node_level" : "",
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : "",
		"iv_uom_flag" : "Y",
		"iv_auto_stockr_flag" : "",
		"iv_delisted_flag" : "N",
		"iv_deleted_flag" : "N"
	};
	console.log(packBreakArticleSearchDraft + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : packBreakArticleSearchDraft,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if (response.length == 1) {
						response[0].qty = formData.qty;
						var obj = response[0];
						if(obj.ps_article_status == '08'){
							   showAllErrors([ 'Cannot add the article. Article is Recalled.' ]);
							}else{
								var articleNo = (obj.article == undefined ? obj.article_no
										: obj.article);
								var costPrice=response[0].cost_price == undefined ? ''
										: response[0].cost_price;
								var greenLifeFlag=response[0].greenlife_flag == undefined ? ''
										: response[0].greenlife_flag;
								var alternate_vendor_flag = response[0].alternate_vendor_flag == undefined ? ''
										: response[0].alternate_vendor_flag;
								var draft = getDraftObj(
										articleNo,
										obj.order_uom,
										$('#loginUserId').val(),
										$('#loginUserId').val(),
										$('#loginUserId').val(),
										((formData.qty == undefined || formData.qty == '') ? '0'
												: formData.qty), obj.om,
										formatDateToMDY(getCurentDateTxt()),
										obj.supplier,
										formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice, greenLifeFlag,
										alternate_vendor_flag);
								createDrafts([ draft ]);
								addAriclesToOorReceipt(response[0], formData);
								lockSupplier(response[0]);
								resetSearchArea();
							}
					} else if (response.length > 1) {
						showSupplierSelectPopupMultiSelect(response, formData);
						resetSearchArea();
					} else {
						showAllErrors([ 'Cannot add article. Please check article or Supplier, then try again.' ]);// Defect
						// no
						// 1923
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showAllErrors([ mobiSerErrMsg ]);
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});
	}
}

function showSupplierSelectPopupMultiSelect(response, formData) {

	$.fn.loadArticlePopUp(response, onSelectInOrderOnReceipt, '',
			onArticleTdCheckInOrderOnReceipt, checkboxOption,
			formData.iv_article, '', formData);
}
function showSupplierSelectPopupMultiSelectDesc(response, formData) {

	$.fn.loadArticlePopUpNew(response, onSelectInOrderOnReceiptDesc, '',
			onArticleTdCheckInOrderOnReceipt, checkboxOption,
			formData.iv_article, '', formData);
}

var onSelectInOrderOnReceipt = function(event) {
	var formData = event.data.searchData;
	var res = [];
	$elem = $(this);
	var list = [];
	var tempArray = [];
	var drafts = [];
	list = $elem.data('checkedObj');
	for ( var i = 0; i < list.length; i++) {
		res.push(list[i]);
		if (res[0] != null && res[0] != undefined) {
			var obj = res[i];
			var articleNo = obj.article == undefined ? obj.article_no
					: obj.article;
			var costPrice=obj.cost_price == undefined ? ''
					: obj.cost_price;
			var greenLifeFlag=obj.greenlife_flag == undefined ? ''
					: obj.greenlife_flag;
			var alternate_vendor_flag = obj.alternate_vendor_flag == undefined ? ''
					: obj.alternate_vendor_flag;
			var draft = getDraftObj(articleNo, obj.order_uom, $('#loginUserId')
					.val(), $('#loginUserId').val(), $('#loginUserId').val(),
					((obj.qty == undefined || obj.qty == '') ? '0' : obj.qty),
					obj.om, formatDateToMDY(getCurentDateTxt()), obj.supplier,
					formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice,greenLifeFlag,
					alternate_vendor_flag);
			drafts.push(draft);
			addAriclesToOorReceipt(res[i], formData);
		}
	}
	createDrafts(drafts);
};


var onSelectInOrderOnReceiptDesc = function(event) {
	var formData = event.data.searchData;
	var res = [];
	$elem = $(this);
	var list = [];
	var tempArray = [];
	var drafts = [];
	list = $elem.data('checkedObj');
	var articleNo = "";
	
	var artNumList = [];
	var articleNoFlag = "";
	var descFlag = "Y";
	var gtinFlag = "";
	var supplierNo = "";
	var srcOfSupplyInd = "";
	var nodeLevel ="";
	var nodeId = "";
	
	srcOfSupplyInd = "1,A";
	//formData.qty = $('#tableIBTActionsWrapper').find('#qty').val();
	if (isNaN((formData.iv_article).split('-')[0]))
		descFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((formData.iv_article).split('-')[0])
			&& (formData.iv_article).split('-')[0].length > 7)
		gtinFlag = "Y";
	
	for (var i=0; i < list.length; i++){
		var articleNo = list[i].article_no != undefined ?list[i].article_no : list[i].article;
		artNumList = (artNumList.length > 0)? artNumList+",":artNumList;	
		artNumList +=  articleNo;
	}   
	
	var param = {
			"iv_desc" : descFlag,
			"iv_article_no" : articleNoFlag,
			"iv_gtin" : gtinFlag,
			"iv_article" : artNumList,
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_supplier" : $('#oor_supplierSearchBox').val().split('-')[0],
			"iv_src_supply" : srcOfSupplyInd,
			"iv_ranged" : "Y",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_site" : $('#posSite').val(),
			"iv_node_id" : "",
			"iv_node_level" : "",
			"iv_barcode_flag" : "",
			"iv_prime_vendor" : "",
			"iv_uom_flag" : "Y",
			"iv_auto_stockr_flag" : "",
			"iv_delisted_flag" : "N",
			"iv_deleted_flag" : "N"
		};
	var url = packBreakArticleSearchDraft;
		console.log(url + ' ' + JSON.stringify(param));
		$
				.ajax({
					type : "post",
					url : packBreakArticleSearchDraft,
					data : JSON.stringify(param),
					beforeSend : function() {
						startLoading();
					},
					success : function(response) {
					if (response.length >0 ){
						list = response;
						for ( var i = 0; i < list.length; i++) {
							res.push(list[i]);
							if (res[0] != null && res[0] != undefined) {
								var obj = res[i];
								var articleNo = obj.article == undefined ? obj.article_no
										: obj.article;
								var costPrice=obj.cost_price == undefined ? ''
										: obj.cost_price;
								var greenLifeFlag=obj.greenlife_flag == undefined ? ''
										: obj.greenlife_flag;
								var alternate_vendor_flag = obj.alternate_vendor_flag == undefined ? ''
										: obj.alternate_vendor_flag;
								var draft = getDraftObj(articleNo, obj.order_uom, $('#loginUserId')
										.val(), $('#loginUserId').val(), $('#loginUserId').val(),
										((formData.qty == undefined || formData.qty == '') ? '0' : formData.qty),
										obj.om, formatDateToMDY(getCurentDateTxt()), obj.supplier,
										formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice,greenLifeFlag,
										alternate_vendor_flag);
								drafts.push(draft);
								addAriclesToOorReceipt(res[i], formData);
							}
						}
						createDrafts(drafts);
					} else {
						$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
						stopLoading();
					}
					stopLoading();
					}
				});
	
	
};

var onArticleTdCheckInOrderOnReceipt = function(event) {
	event.stopPropagation();
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var len = 0;
	var unChecked;
	var position;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? [] : checkedObj;
	if ($elem.is(':checked')) {
		obj.checked = true;
		checkedObj.push(obj);
	} else {
		obj.checked = false;
		unChecked = obj, position = checkedObj.indexOf(unChecked);
		if (~position)
			checkedObj.splice(position, 1);
	}
	len = Object.keys(checkedObj).length;
	if (len == 0) {
		$selectBtn.text('Add to List').addClass('hideBlock');
	} else {
		$selectBtn.text('Add to List (' + (len > 9 ? len : '0' + len) + ')')
				.removeClass('hideBlock').data('checkedObj', checkedObj);
	}
};

function addAriclesToOorReceipt(obj, formData) {
	if(obj.alternate_vendor_flag == 'V'){
		obj.om = '1';
		obj.order_uom = obj.base_uom;
	}
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var supplierNo = obj.supplier == undefined ? Number(obj.supplier_no)
			: Number(obj.supplier);
	if (obj.order_uom != null && obj.order_uom != '' && obj.article_uom != obj.order_uom)
		obj.article_uom = obj.order_uom;
	var id = articleNo + '_' + supplierNo + '_' + obj.article_uom;

	$('#oor_createOrder').removeClass('disabled');
	$('[norecordrow]').remove();
	var rowContent = getoor_OrdersAsHTML(obj, formData);
	$('#oor_articleListTable').treetable('destroy');
	$('#oor_articleListTable').find('.expandTd').html(
			'<span class="indenter">&nbsp;</span>');
	if (rowContent != '') {
		$('#oor_articleResultArea').find('.tbody').append(rowContent);
		$('[data-tt-id="' + id + '"]').data('obj', obj);
	} else {
		$('[data-tt-id="' + id + '"]').find('.orderQty').val(formData.qty);
		$('[data-tt-id="' + id + '"]').data('obj').qty = formData.qty;
	}
	$('#oor_articleResultArea').find('.newWindowAfter').last().click(
			function() {
				showSOO($(this).attr('article'));
			});

	$('[data-tt-id="' + id + '"]').find('.deleteRecord').click(function() {
		confirmationRemove(id);
	});
	$('[data-tt-id="' + id + '"]').find('.editNumCell').within9999();
	$('[data-tt-id="' + id + '"]').find('.newOm').unbind('keypress').isWithinOnly3Decimal();
	$('[data-tt-id="' + id + '"]').find('.editNumCell.wgtVal').unbind('keypress');
	$('[data-tt-id="' + id + '"]').find('.editNumCell.wgtVal').isWithin999Or3Decimal();

	$('[data-tt-id="' + id + '"]').find(".inputDate").datepicker({
		zIndex : 50
	});

	$('[data-tt-id="' + id + '"]').find('input').keypress(
			function() {
				if (event.which == 13) {
					$('#oor_articleResultArea').find('#oor_createOrder')
							.trigger('click');
				}
			});

	$('[data-tt-id="' + id + '"]').find('.orderQty').keyup(
			function() {
				var om = $(this).attr('data-om');
				if ($('[data-tt-id="' + id + '"]').find('.newOm').val().trim()!='') {
					om = $('[data-tt-id="' + id + '"]').find('.newOm').val();
				}
				var val = $(this).val();
				if ("null" != om && om != undefined) {
					var totVal = Number(om) * Number(val);
					$('[data-tt-id="' + id + '"]').find('.totalUnit').text(
							(totVal != null && totVal != '' && totVal.toString().indexOf('.') != -1)? totVal.toFixed(3):totVal);
				}
				var allSumUnit = 0;
				$('#oor_articleListTable').find('.tbody').find('.orderQty')
						.each(function() {
							allSumUnit += Number($(this).val());
						});
				$('#oor_totalUnits').text(allSumUnit);
			});

	$('[data-tt-id="' + id + '"]').find('.newOm').keyup(
			function() {
				var om = $(this).attr('data-om');
				if ($('[data-tt-id="' + id + '"]').find('.newOm').val().trim()!='') {
					om = $('[data-tt-id="' + id + '"]').find('.newOm').val();
				}
				var val = $('[data-tt-id="' + id + '"]').find('.orderQty')
						.val();
				if ("null" != om && om != undefined) {
					var totVal = Number(om) * Number(val);
					$('[data-tt-id="' + id + '"]').find('.totalUnit').text(
							(totVal != null && totVal != '' && totVal.toString().indexOf('.') != -1)? totVal.toFixed(3):totVal);
				}
				var allSumUnit = 0;
				$('#oor_articleListTable').find('.tbody').find('.orderQty')
						.each(function() {
							allSumUnit += Number($(this).val());
						});
				$('#oor_totalUnits').text(allSumUnit);
			});

	$('[data-tt-id="' + id + '"]').find('.orderQty').trigger('keyup');

	try {
		$('#oor_articleListTable').treetable({
			expandable : true
		});
	} catch (err) {
		$('#oor_articleListTable').treetable({
			expandable : true
		});
	}
	$('#oor_viewModeTable').removeClass('hideBlock');

	if ($('#checkboxChangeOm').is(':checked')) {
		$('.onCheckOnly').removeClass('hideBlock');
	} else {
		$('.onCheckOnly').addClass('hideBlock');
	}
	$('#oor_listOfArticle').html(
			'List of Articles('
					+ $('#oor_articleListTable').find('.tbody').find(
							'[mainRow]').length + ')');
	$('#tableIBTActionsWrapper').find('#oor_searchBox').focus();
	bindExpiryDateMoreEventOrderOnReceipt($('[data-tt-id="' + id + '"]'));
	bindSeaFoodChangeSupplier($('[data-tt-id="' + id + '.1"]'), obj);
}
function bindSeaFoodChangeSupplier(area, obj){
	 area.find('.editSupplierOOR').unbind('click').bind('click',({data: obj,$elem: area}), function(e) {
	//$('.editSupplierOOR').unbind('click').bind('click', function(e) {
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
	  $('#dialog-alt-vendors').find('.altVendorWarMsgClass').text(altVendorWarMsgOOR);
	  return true;
});
}

function getoor_OrdersAsHTML(obj,formData, dataBind) {
	if (dataBind == undefined)
		dataBind = 'fromdraft';
	content = '';
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var supplierNo = obj.supplier == undefined ? Number(obj.supplier_no)
			: Number(obj.supplier);
	// var articleUom = obj.article_uom == '' ? Number(obj.supplier_no) :
	// Number(obj.supplier);
	var stdPrice = obj.standard_sell_price == undefined ? obj.standard_price
			: obj.standard_sell_price;
	obj.qty = (obj.qty != '') ? obj.qty : 0;
	if (obj.article_uom == null)
		obj.article_uom = "";
	var id = articleNo + '_' + supplierNo + '_' + obj.article_uom;

	if ($('[data-tt-id="' + id + '"]').length >= 1)
		return '';

	var wgtTxt = '';

	if (obj.random_wgt_flg != undefined && obj.random_wgt_flg == 'Y') {
		wgtTxt = '<label class="moreInput">            <strong>Total Weight (kg)</strong>            </label><input type="#" value="'
				+ '"	class="editNumCell textbox textboxDefaultText wtTextBoxFix wgtVal">&nbsp;&nbsp;&nbsp;'
				//+ (obj.order_uom != null ? obj.order_uom : '') 
				+ '';
	}

	obj.qty = (obj.qty != undefined ? ((obj.qty != undefined && obj.qty != null && !isNaN(obj.qty)) ? obj.qty
			: 0) : (formData.qty != "" ? formData.qty : '0' ));

	content += '<tr mainRow data-tt-id="'
			+ id
			+ '" class="" '
			+ dataBind
			+ '>'
			+ '<td class="expandTd"><span class="indenter">&nbsp;</span></td>'
			+ '<td class="articleNo" >'
			+ articleNo
			+ '</td>'
			+ '<td class="article_desc">'
			+ obj.article_desc
			+ '</td>'
			+ '<td class="article_desc">'
			+ obj.order_uom
			+ '</td>'
			+ '<td class="centerValue soh">'
			+ (deciValues(obj.random_wgt_flg,obj.weighted_flag,(obj.linked_article_flag||'N'),obj.pack_break_down_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,false,undefined,obj.pi_uom))
			+ '</td>'
			+ '<td  class="centerValue  onEditOnly"><input type="#" value="'
			+ obj.qty
			+ '" data-om="'
			+ ((obj.random_wgt_flg == 'Y'  && obj.order_uom!='KG') ? obj.pi_om : obj.om)
			+ '" '
			+ 'maxlength="3" class="editNumCell textbox textboxDefaultText orderQty">&nbsp;&nbsp;&nbsp;'
			+ (/*obj.order_uom != null ? obj.order_uom :*/ '')
			+ wgtTxt
			+ '</td>'
			+ '<td  class="centerValue qty onViewOnly hideBlock ">'
			+ obj.qty
			+ '</td>'
			+ '<td class="centerValue om">'
			//17.06 ZEA/ZKG OM Value changes
			+ (obj.random_wgt_flg == 'Y'  && obj.order_uom!='KG' ? 
					(obj.pi_om!=null && obj.pi_om!=undefined ? 
					((obj.pi_om.toString().split('.')[1] > 0)?Number(obj.pi_om): Number(obj.pi_om).toFixed(0)) : '') : 
						(((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))||''))
			+ ' '
			+ (obj.random_wgt_flg == 'Y' ? (obj.pi_uom!=null && obj.pi_uom!=undefined ? obj.pi_uom : 'EA') : (obj.base_uom||''))
			+ '</td>'
			+ '<td  class="centerValue  onEditOnly onCheckOnly hideBlock"><input '+((obj.random_wgt_flg =='Y' || obj.order_uom == obj.base_uom) ? 'readonly' : '')+' type="#"	'
			+ 'class="editNumCell textbox textboxDefaultText newOm">&nbsp;&nbsp;&nbsp;'
			+ '</td>'
			+ '<td class="centerValue total_qty"><strong><i class="totalUnit">0</i> '
			+ (obj.random_wgt_flg == 'Y' ? (obj.pi_uom!=null && obj.pi_uom!=undefined ? obj.pi_uom : 'EA') : (obj.base_uom||''))
			+ '</strong></td>'
			+ '<td  class="centerValue onEditOnly onCheckOnly "><input type="#" value="'
			+ '"'
			+ '	exp_flag ="'+(obj.expiry_flag||'N')+'" value="'+(obj.expiry_date1 != null && obj.expiry_date1 != '' ? formatDateMobi(obj.expiry_date1) : '')+'"class="textbox textboxDefaultText exp1 inputDate delivery_date_valid editDateCell"'
			+ '	placeholder="dd/mm/yyyy" id="dp'
			+ id
			+ '"><label class="linkBtn"><a class="more moreLink" >+ more </a></label>' 
			+ '<span class="more moreExpDt hideBlock">'
	        + '<input type="#" ' + '' + ' exp_flag = "'+(obj.expiry_flag||'N')+'" value="' +
            (obj.expiry_date2 != null && obj.expiry_date2 != '' ? formatDateMobi(obj.expiry_date2) : '') +
            '" placeholder="dd/mm/yyyy" class="expiryDt exp2 textbox textboxDefaultText inputDate editDateCell">' +
            '<input type="#" ' + '' + ' exp_flag = "'+(obj.expiry_flag||'N')+'" value="' +
            (obj.expiry_date3 != null && obj.expiry_date3 != '' ? formatDateMobi(obj.expiry_date3) : '') +
            '" placeholder="dd/mm/yyyy" exp_flag = "'+(obj.expiry_flag||'N')+'" class="expiryDt exp3 textbox textboxDefaultText inputDate editDateCell">' +
            '<input type="#" ' + '' + ' value="' +
            (obj.expiry_date4 != null && obj.expiry_date4 != '' ? formatDateMobi(obj.expiry_date4) : '') +
            '" exp_flag = "'+(obj.expiry_flag||'N')+'" placeholder="dd/mm/yyyy" class="expiryDt exp4 textbox textboxDefaultText inputDate editDateCell">' +
            '<input exp_flag = "'+(obj.expiry_flag||'N')+'" type="#" ' + '' + ' value="' +
            (obj.expiry_date5 != null && obj.expiry_date5 != '' ? formatDateMobi(obj.expiry_date5) : '') +
            '" exp_flag = "'+(obj.expiry_flag||'N')+'" placeholder="dd/mm/yyyy" class="expiryDt exp5 textbox textboxDefaultText inputDate editDateCell"></span></td>'
			+ '<td  class="centerValue delivery_date deliveryDate onViewOnly hideBlock">'
			+ '</td>'
			+ '<td class="lastColumn centerValue onEditOnly"><label class="linkBtn">'
			+ '		<a ><label class="deleteRecord" id="' + id
			+ '">&nbsp;</label></a>' + '</label></td>' + '</tr>';
	content += '<tr data-tt-id="'
			+ id
			+ '.1" data-tt-parent-id="'
			+ id
			+ '" ><td colspan="11"  class="allTimeExpand ">';
	content += '<table cellspacing="0" class="ContentTable allTimeExpand" width="100%"> <tbody> <tr> <td class="keyInfo">Supplier:</td> <td class="valueInfo lastColumn" colspan="5"><label class="'
	+((obj.alternate_vendor_flag!=undefined && obj.alternate_vendor_flag!=null  && (obj.alternate_vendor_flag=='G' || obj.alternate_vendor_flag=='V') ) 
			? 'linkBtn editSupplierOOR' : '')+'">' + (obj.supplier_name == null ? '' : obj.supplier_name) + ' (' + supplierNo + ') </label></td> </tr>';	
	content += '<tr> <td width="20%" class="keyInfo">Stock on Order:</td> <td width="13%" class="valueInfo columnDivider"><label class="linkBtn"><label article="'+articleNo+'" id="openOrdersLink" class="newWindowAfter">'
			+ (obj.soo == null ? '' : obj.soo)
			+ '</label></label></td> <td width="20%" class="keyInfo noDivider"></td> <td width="13%" class="valueInfo lastColumn"></td> </tr> <tr> <td class="keyInfo">Stock in Transit:</td> <td class="valueInfo columnDivider">'
			//+ (obj.sit == null ? '0' : obj.sit)
			+(obj.sit == null ? '0' : ((obj.sit != null && obj.sit != undefined && obj.sit != '' && obj.sit.toString().indexOf('.') != -1)?
					Number(obj.sit).toFixed(3):obj.sit))
			+ '</td></tr> </tbody> </table> </td> </tr>';
	return content;
}

function bindExpiryDateMoreEventOrderOnReceipt(area) {

    area.find('.moreLink').unbind('click');
    area.find(".moreLink").click(function() {
    	if($(this).hasClass('more')){
    		//$(this).parent().addClass("hideBlock");
        	$(this).closest('tr').find("span.moreExpDt").removeClass("hideBlock");
        	$(this).removeClass('more').addClass('less');
        	$(this).text('- less');
    	}else{
    		//$(this).parent().removeClass("hideBlock");
        	$(this).closest('tr').find("span.moreExpDt").addClass("hideBlock");
    		$(this).addClass('more').removeClass('less');
    		$(this).text('+ more');
    	}
    });
}

function getArticleRecordOptiosHTML(obj) {
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var supplierNo = obj.supplier == undefined ? Number(obj.supplier_no)
			: Number(obj.supplier);
	if (obj.article_uom == null)
		obj.article_uom = "";
	var tr = '<tr id="popup-'
			+ articleNo
			+ '_'
			+ obj.article_uom
			+ '_'
			+ supplierNo
			+ '" ><td id="articleNo">'
			+ articleNo
			+ '</td><td id="description">'
			+ obj.article_desc
			// + '</td><td class="centerValue" id="uom" >'
			// + obj.article_uom
			+ '</td><td class="centerValue" id="supplier" >'
			+ (obj.supplier_name != null ? obj.supplier_name : '')
			+ ' ('
			+ supplierNo
			+ ')'
			+ '<td class="sorted lastColumn"><label class="linkBtn selectInEnquiry" id="0"><label class="selectItem">Select</label></label></td>';
	return tr;
}

function showSupplierSelectPopup(response, formData) {

	$.fn.loadArticlePopUp(response, '', '', onArticleTdSelectInOrderOnReceipt,
			selectOption, formData.iv_article, '', formData);
}
function showSupplierSelectPopupDesc(response, formData) {

	$.fn.loadArticlePopUpNew(response, '', '', onArticleTdSelectInOrderOnReceiptDesc,
			selectOption, formData.iv_article, '', formData);
}


var onArticleTdSelectInOrderOnReceipt = function(event) {
	event.stopPropagation();
	var formData = [];
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var eraProfile = (obj.era_profile == undefined ?'': obj.era_profile);
	if(salesOrg==1060 && eraProfile=="Y"){
		$.fn
		.warnPopup(
				'alert',
				'Cannot add articles supplied by ERA Vendor',//Defect_8776 Fix
				'Information',
				'',
				'',
				triggerOkInOR, $(this),'');
			
	}	
	else{
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var costPrice=obj.cost_price == undefined ? '': obj.cost_price;
	var greenLifeFlag=obj.greenlife_flag == undefined ? '': obj.greenlife_flag;
	var alternate_vendor_flag = obj.alternate_vendor_flag == undefined ? ''
			: obj.alternate_vendor_flag;
	var draft = getDraftObj(articleNo, obj.order_uom, $('#loginUserId').val(),
			$('#loginUserId').val(), $('#loginUserId').val(),
			((formData.qty == undefined || formData.qty == '') ? '0'
					: formData.qty), obj.om,
			formatDateToMDY(getCurentDateTxt()), obj.supplier,
			formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice,greenLifeFlag,
			alternate_vendor_flag);
	createDrafts([ draft ]);
	loadDraftOOR(obj.supplier);
	lockSupplier(obj);
	$('#dialog-mulipleArticles').dialog('close');
}
};

var onArticleTdSelectInOrderOnReceiptDesc = function(event) {
	event.stopPropagation();
	var formData = [];
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');

	var supplierNo = "";
	var srcOfSupplyInd = "";
	var salesOrg = $('#salesOrg').val();
	if (!isNaN((obj.article_no).split('-')[0])
			&& (obj.article_no).split('-')[0].length > 7)
	var gtinFlag = "Y";
	var nodeLevel = "";
	var nodeId ="";
	
	srcOfSupplyInd = "1,A"
	
	var createParam = {
		    "iv_desc": "Y",
		    "iv_article_no": "Y",
		    "iv_gtin": "N",
		    "iv_article": obj.article_no,
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
	var url = packBreakArticleSearchDraft;
	console.log(url + ' ' + JSON.stringify(createParam));
	$
			.ajax({
				type : "post",
				url : packBreakArticleSearchDraft,
				data : JSON.stringify(createParam),
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {										
					resetSearchArea();
					if (response.length == 1) {
						var eraProfile = (response[0].era_profile == undefined ?'': response[0].era_profile);
						if(salesOrg==1060 && eraProfile=="Y"){
							$.fn
							.warnPopup(
									'alert',
									'Cannot add articles supplied by ERA Vendors',//Defect_8776 Fix
									'Information',
									'',
									'',
									triggerOkInOR, $(this),'');
								
						}	
						
					else{
						var obj = response[0];
						if(obj.ps_article_status == '08'){
						   showAllErrors([ 'Cannot add the article. Article is Recalled.' ]);
						   		//Defect_12197
						}else if(response.length == 1 && (response[0].supplier||'').trim()==''){
	    					$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);
	    				}else{
							var articleNo = response[0].article == undefined ? response[0].article_no
									: response[0].article;
							var costPrice=response[0].cost_price == undefined ? ''
									: response[0].cost_price;
							var greenLifeFlag=response[0].greenlife_flag == undefined ? ''
									: response[0].greenlife_flag;
							var alternate_vendor_flag = response[0].alternate_vendor_flag == undefined ? ''
									: response[0].alternate_vendor_flag;
							var draft = getDraftObj(
									articleNo,
									obj.order_uom,
									$('#loginUserId').val(),
									$('#loginUserId').val(),
									$('#loginUserId').val(),
									((formData.qty == undefined || formData.qty == '') ? '0'
											: formData.qty), obj.om,
									formatDateToMDY(getCurentDateTxt()),
									obj.supplier,
									formatDateToMDY(getCurentDateTxt()), "D", "POR",costPrice,greenLifeFlag,
									alternate_vendor_flag);
							createDrafts([ draft ]);
							loadDraftOOR(obj.supplier);
							lockSupplier(response[0]);
							$('#dialog-mulipleArticles').dialog('close');
						}
					}
					}  else {
						showAllErrors([ 'Cannot add article. Please check article or Supplier, then try again.' ]);
						$('#dialog-mulipleArticles').dialog('close');
						stopLoading();
					}
					stopLoading();			
				},
				error : function() {
					$('#dialog-mulipleArticles').dialog('close');
					showAllErrors([ mobiSerErrMsg ]);
					stopLoading();
				},
			});
};


function lockSupplier(obj) {
	$('#oor_articlesearchBox').val('');
	$('#oor_articlesearchBox').prop('disabled', true).attr('style',
			'background: rgb(217, 217, 217)');
	$('#oor_supplierSearchBox').prop('disabled', true).attr('style',
			'background: rgb(217, 217, 217)');
	$('#oor_supplierSearchBox').val(
			obj.supplier
					+ ((obj.supplier_name == null) ? '' : '-'
							+ obj.supplier_name));
	$('#tableIBTActionsWrapper').find('#oor_searchBox').focus();
	// loadDraftOOR(obj.supplier);
	resetSearchArea();
}

function lockSupplierUsingVendor() {
	area = $('#ordersReceipt');
	$('#oor_articleResultArea').find('tbody').html('');
	verifySupplier(area);
}

function hideOor_err() {
	$('#oor_errorDiv').addClass('hideBlock');
}
function hideSROor_err() {
	$('#oorsr_errorDiv').addClass('hideBlock');
}

function verifySupplier(area) {
	hideOor_err();
	// hideErrorInOrderTab();
	// hideErrorInPreqTab();
	var vendorNo = area.find('#oor_supplierSearchBox').val().split("-")[0];

	var param = {
		"iv_vendor" : vendorNo,
		"iv_session_id" : ""
	};

	if ((area.find('#oor_supplierSearchBox').val() != '' && area.find(
			'#oor_supplierSearchBox').val() != 'Enter supplier no. or name')) {

		vendorTextBox = area.find('#oor_supplierSearchBox');
		isVendorChecked = area.find("#oor_vendorVerify");
		getVendorLookup(vendorNo, vendorTextBox, isVendorChecked, true);

	} else {
		showAllErrors([ supp_invalid_msg ]);
	}
}

function bindCheckboxevent_oorm(area) {
	var size = area.find('input[name="articlecheckbox"]:checked').length;
	if (size > 0) {
		$('#addtolist_oorm').text("Add To List(" + size + ")");
		$('#addtolist_oorm').removeClass("disabled");
	} else {
		$('#addtolist_oorm').text("Add To List");
		$('#addtolist_oorm').addClass("disabled");
	}
	area
			.find('input[name="articlecheckbox"]')
			.change(
					function() {
						var size = area
								.find('input[name="articlecheckbox"]:checked').length;
						if (size > 0) {
							$('#addtolist_oorm').text(
									"Add To List(" + size + ")");
							$('#addtolist_oorm').removeClass("disabled");
						} else {
							$('#addtolist_oorm').text("Add To List");
							$('#addtolist_oorm').addClass("disabled");
						}
						if (area.find('input[name="articlecheckbox"]').length == size) {
							area.find('input[name="articlecheckboxSelectAll"]')
									.prop('checked', true);
						} else {
							area.find('input[name="articlecheckboxSelectAll"]')
									.prop('checked', false);
						}
					});
	area.find('input[name="articlecheckboxSelectAll"]').change(function() {
		if ($(this).is(':checked')) {
			area.find('input[name="articlecheckbox"]').prop('checked', true);
		} else {
			area.find('input[name="articlecheckbox"]').prop('checked', false);
		}
		area.find('input[name="articlecheckbox"]').trigger('change');
	});
}

function resetSearchArea() {
	$('#tableIBTActionsWrapper').find('#oor_searchBox').val('');
	$('#tableIBTActionsWrapper').find('#qty').val('');
}

function confirmationRemove(id) {
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#ok').find('label').text('OK');
	$("#dialog-confirmation").parent().find('.ui-dialog-title').html(
			'Confirmation');
	$("#dialog-confirmation").find('#message').text(
			"Please Confirm to remove article list?");
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation")
			.find('#ok')
			.click(
					function() {
						var obj = $('[data-tt-id="' + id + '"]').data('obj');
						$('[data-tt-id="' + id + '"]').remove();
						$('[data-tt-parent-id="' + id + '"]').remove();
						if ($('#oor_articleListTable').find('.tbody').html()
								.trim() == '') {
							$('#oor_cancelOrder').trigger('click');
						}
						$("#dialog-confirmation").dialog("close");
						$('#oor_listOfArticle')
								.html(
										'List of Articles('
												+ $('#oor_articleListTable')
														.find('.tbody').find(
																'[mainRow]').length
												+ ')');
						var costPrice=obj.cost_price == undefined ? '': obj.cost_price;
						var greenLifeFlag=obj.greenlife_flag == undefined ? '': obj.greenlife_flag;
						var alternate_vendor_flag = obj.alternate_vendor_flag == undefined ? ''
								: obj.alternate_vendor_flag;
						var drafts = getDraftObj(obj.article, obj.order_uom, $(
								'#loginUserId').val(), $('#loginUserId').val(),
								$('#loginUserId').val(), obj.qty, obj.om,
								formatDateToMDY(getCurentDateTxt()),
								obj.supplier,
								formatDateToMDY(getCurentDateTxt()), "X", "POR",costPrice,greenLifeFlag,
								alternate_vendor_flag);
						$('.orderQty').trigger('keyup');
						updateDrafts([ drafts ]);
					});
	$("#dialog-confirmation").find('#cancel').find('label').text('Cancel');
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function() {
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});

}

function submitOrderOnReceipt() {
	if (validateSubmit()) {
		submitIBTToSAP(getIbtParam());
	}
}

function getIbtParam() {

	var items = [];
	var param = {
		"iv_article_no" : ""
	};
	$('#oor_articleListTable').find('[mainrow]').each(function() {
		var obj = $(this).data('obj');
		if (param.iv_article_no == '') {
			param.iv_article_no = obj.article;
		} else {
			param.iv_article_no += ',' + obj.article;
		}
	});

	return param;
}

function submitIBTToSAP(param) {
	var tmpObj = {
			ch : false,
			hd : false,
			ch_temperature_range_min : 0,
			ch_temperature_range_max : 0,
			hd_temperature_range_min : 0,
			hd_temperature_range_max : 0
	};
	if(!temperatureDisableFlg){
		var getTemperatureUrl = temperatureValidateUrl;
		var supplier = '';
		var list = [];
		var html = '';
		var error = '';
		$
		.ajax({
			data : JSON.stringify(param),
			url : getTemperatureUrl,
			type : 'post',
			// contentType : "application/json",
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				console.log(response);
				/*var tmpObj = {
						ch : false,
						hd : false,
						ch_temperature_range_min : 0,
						ch_temperature_range_max : 0,
						hd_temperature_range_min : 0,
						hd_temperature_range_max : 0
				};*/
				// response = $.parseJSON(response);

				if (response != null && response != undefined
						&& response.length > 0
						&& response[0].temperature_range_code != undefined) {
					list = response;

					for ( var i = 0; i < list.length; i++) {
						if (list[i].temperature_range_code == 'CH') {
							tmpObj.ch = true;
							tmpObj.ch_temperature_range_min = list[i].temperature_range_min;
							tmpObj.ch_temperature_range_max = list[i].temperature_range_max;
						} else {
							tmpObj.hd = true;
							tmpObj.hd_temperature_range_min = list[i].temperature_range_min;
							tmpObj.hd_temperature_range_max = list[i].temperature_range_max;
						}
					}
				}
				console.log(tmpObj);

				recvItemInfo = tmpObj;
				console.log(recvItemInfo.length);


				if (tmpObj.ch == true) {
					$('#dialog-receive #temperature1_OOR').parent()
					.removeClass('hideBlock');
				} else {
					$('#dialog-receive #temperature1_OOR').parent().addClass(
					'hideBlock');
				}

				if (tmpObj.hd == true) {
					$('#dialog-receive #temperature2_OOR').parent()
					.removeClass('hideBlock');
				} else {
					$('#dialog-receive #temperature2_OOR').parent().addClass(
					'hideBlock');
				}

				if ($('#dialog-receive #temperature2_OOR').is(':visible')
						|| $('#dialog-receive #temperature2_OOR')
						.is(':visible')) {
					$('#dialog-receive .temperatureHeader').removeClass(
					'hideBlock');
				} else {
					$('#dialog-receive .temperatureHeader').addClass(
					'hideBlock');
				}

				$("#dialog-receive").data('obj', tmpObj);
				$("#dialog-receive").dialog('open');
				// Clear the inputs when opening the dialog
				$('#dialog-receive #invoice').val("");
				$('#dialog-receive #cf').val("");
				$('#dialog-receive #dgms').val("");
				$('#dialog-receive #carr').val("");
				$('#dialog-receive #temperature1_OOR').val("");
				$('#dialog-receive #temperature2_OOR').val("");
				stopLoading();
			},
			error : function(err) {
				console.log(err);
				stopLoading();
				showInformationInOrderOnReceipt(
						[ 'Network issue occured while creating Order'
						  + err ], error, 'Order On Receipt');
			}
		});
	}else{
		recvItemInfo = tmpObj;
		$("#dialog-receive").data('obj', tmpObj);
		$("#dialog-receive").dialog('open');
		$('#dialog-receive #temperature1_OOR').parent()
		.addClass('hideBlock');
		$('#dialog-receive #temperature2_OOR').parent().addClass(
		'hideBlock');
		$('#dialog-receive .temperatureHeader').addClass(
		'hideBlock');
		// Clear the inputs when opening the dialog
		$('#dialog-receive #invoice').val("");
		$('#dialog-receive #cf').val("");
		$('#dialog-receive #dgms').val("");
		$('#dialog-receive #carr').val("");
	}
}

function loadDraftOOR(supplier) {

	//var userid = "ALL";
	var userid = $('#loginUserId').val();	//Defect_9260
	var param = {
		"iv_user_id" : userid,
		"iv_session_id" : "123",
		"iv_draft_type" : "POR",
		"iv_order_type" : "POR",
		"iv_supplier" : supplier,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_site" : $('#posSite').val()
	};
	console.log(getOrdersDraftList + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : getOrdersDraftList,
				data : JSON.stringify(param),
				async : false,
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log("load draft" + response);
					if (response.length > 0 && response[0].base_uom != undefined) {
						if (response.length >= 1) {
							for ( var i=0; i < response.length; i++) {			// for loop changed 
								var obj = response[i];
								addAriclesToOorReceipt(obj, {});
							}

						} else {
							$('#oor_articleResultArea')
									.find('tbody')
									.html(
											'<tr norecordrow><td colspan="11">No articles added.</td></tr>');
							$('#oor_createOrder').addClass('disabled');
						}
					} else {
						$('#oor_articleResultArea')
								.find('tbody')
								.html(
										'<tr norecordrow><td colspan="11">No articles added.</td></tr>');
						$('#oor_createOrder').addClass('disabled');
					}
					stopLoading();
				},
				error : function() {
					showAllErrors([ mobiSerErrMsg ]);
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});
}

function createDrafts(drafts) {
	var param = {
		"ItemArray" : drafts
	};
	console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
	$.ajaxSetup({
		async : false
	});
	$.post(createOrdersDraftList, JSON.stringify(param)).done(function(data) {
		console.log('Added to My draft:' + data[0].msg);
		if (data[0].msg_type == 'S') {
			console.log('Draft Inserted.');

		} else if (data[0].msg == undefined) {
			console.log('Draft Insert failed.');
		}
	});
	$.ajaxSetup({
		async : true
	});
}

function updateDrafts(drafts) {
	var param = {
		"ItemArray" : drafts
	};
	console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
	$.post(createOrdersDraftList, JSON.stringify(param)).done(function(data) {
		console.log('Added to My draft:' + data[0].msg);
		if (data[0].msg_type == 'S') {
			console.log('Draft Inserted.');

		} else if (data[0].msg == undefined) {
			console.log('Draft Insert failed.');
		}
	});
}

function showFinError(msg) {
	$('#finError').removeClass('hideBlock');
	$('#finError').find('label').text(msg);
}

function hideFinError() {
	$('.errorField').removeClass('errorField').removeAttr('title');
	$('#finError').addClass('hideBlock');
}

function showInformationInOrderOnReceipt(content, flag, title) {
	$.fn.showCustomMsg(content, flag, title);
}
//#sourceURL=orderOnReceipt.js
function invoiceAlphaNumericOrderOnRec(){
         $('#invoice').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});
}
//# sourceURL=orderOnReceipt.js