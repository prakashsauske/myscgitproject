var currPage = '';
var currPageNear = '';
var ibtList = [];
var ibtMap = {};
var ibtObj = {};
var itemParam = {};
var param = {};
var today = '';
var draft_type = 'OADV';
var $currentDraftContent = '';
var currentArticleObj = {};
var articleSearchResult = [];
var $draftParent;
var warehouseMap = {};
var currentPageInOnOrder = 1;
var recordCountInOnOrder;
var ibtItemObj = {};
var supplierMap={};
var roleMap={'MA':'MA'};
var roleId;
var submitParam;
var cntctValidFlag = true;
var submittedSupplier = '';
var recvConfigMap = {};
var dangerousGoodsFlagChk=false;
var isDescChkFirst = false;
var isDescChkTemp = true;
var temperatureDisableFlgIBT = false;

var leaveScreenMsg = 'STOP! Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to despatch of this product/s. <br><br>Consignment Note Completed? ';
$(function() {
	if($('#salesOrg').val() == '1060'){
		ibtOrderType = 'ZUMR';
	}
	getEncSAPPassword();
	checkDisplayULD();
	
	roleId = $('#roleId').val();
	$("#menu").menu({
	    position: {
	      my: "right top",
	      at: "right top+20"
	    }
	  });
	
	$('body')
	.on(
			'keypress',
			function(e) {
				var p = e.which;
				if (p == 13) {
					e.preventDefault();
					if ($('.targetSite').is(':focus')) {
						$('.create-btn').trigger('click');
					} else if ($('#dialog-modal-alertBox').dialog('isOpen')
							&& $('#dialog-modal-alertBox #okBtn')
									.is(':visible')) {
						$('#dialog-modal-alertBox #okBtn').trigger('click');
					} else if ($('#dialog-mulipleArticles').dialog('isOpen')) {
						$('#addtolist').trigger('click');
					} else if ($('.popupActions').is(':visible')) {
						$('.popupActions').find('.actionBtn:visible:first')
								.trigger('click');
					}
				}
			}); 
	
	
	$('.closeMessage').click(function() {
		$('.lookupActionWrapper .errorDiv').addClass('hideBlock');
		$('.lookupActionWrapper .warnDiv').addClass('hideBlock');
	});
	
		$("#dialog-complete").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 600
	});

	$("#dialog-complete").parent().addClass("popupWrapper");
	
	$("#dialog-modal-alertBox").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modal-alertBox").parent().addClass("popupWrapper");

	$("#dialog-modal-alert").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modal-alert").parent().addClass("popupWrapper");
	
	$( "#dialog-tempCheck" ).dialog({	
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 605
		});

	$("#dialog-tempCheck").parent().addClass("popupWrapper");
	
	$("#dialog-stockContactTemp").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 800,
		width : 605
	});

	$("#dialog-stockContactTemp").parent().addClass("popupWrapper");
	
	$("#dialog-stockTempConfirm").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 800,
		width : 605
	});

	$("#dialog-stockTempConfirm").parent().addClass("popupWrapper");
	
	$( "#dialog-stockContact" ).dialog({	
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 605
		});

	$("#dialog-stockContact").parent().addClass("popupWrapper");
	
	$('.verifyStore').click(
			function() {
				hideError();
				hideErrorContent();
				if ($('#multiplePOS input').val().trim() == '') {
					$('#multiplePOS input').focus();
					showErrorContent('Search & Add','Please enter a store number or name');
					//showError('Please enter a store number or name');

				} else {
					var siteVal = $.trim($('#multiplePOS input:first').val()).split('-')[0].trim();
					verifyStore({
						iv_site: siteVal
					}, true);
				}

			});

	loggedInSiteNo = $('#posSite').val();
	loggedInSalesOrg = $('#salesOrg').val();
	loggedInUserId = $('#loginUserId').val();

	$("#timeTo, #timeFrom").timepicker({
		hours : {
			starts : 0,
			ends : 23
		},
		minutes : {
			interval : 5
		},
		rows : 4,
		showPeriodLabels : true,
		minuteText : 'Min'
	});

	$("#dialog-siteSearchPop").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 800
	});
	$("#dialog-siteSearchPop").parent().addClass("popupWrapper");

	$("#dialog-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 800,
		width : 515
	});

	$("#dialog-verify").parent().addClass("popupWrapper");
	// code to open popup on cancel order
	$("#nearby").click(function() {
		restNearbyVal();
		var distance = 10;
		var maxStores = 10;
		var salesOrgList = [];
		salesOrgList.push(loggedInSalesOrg);
		var data = {
			"articleNo"	: "",
			"siteNo" : loggedInSiteNo,
			"salesOrg" : salesOrgList,
			"distance" : distance,
			"maxStores" : maxStores,
			"userId"	: loggedInUserId,
			"sap"	: encSapPwd
		};
		getNearbyStores(data);

	});
	$(".nearby-store-search-btn").click(function() {
		var salesOrg = $('.salesOrgMap').val();
		var distance = $('.nearby-distance').val();
		var maxStores = $('.nearby-max-store').val();
		var salesOrgList = [];
		salesOrgList.push(salesOrg);
		var data = {
				"articleNo"	: "",
				"siteNo" : loggedInSiteNo,
				"salesOrg" : salesOrgList,
				"distance" : distance,
				"maxStores" : maxStores,
				"userId"	: loggedInUserId,
				"sap"	: encSapPwd
			};
		getNearbyStores(data);

	});

	$("#wh").click(function() {
		$("#nblist").addClass('hideBlock');
		$("#mywhlist").removeClass('hideBlock');
		$("#mywhlist").val('0');
		/*
		 * createWareHouseList({ siteNo : loggedInSiteNo });
		 */
		$('.removeStore').trigger('click');
		$('#multiplePOS input').val('');
	});

	createWareHouseList({
		siteNo : loggedInSiteNo
	});
	$("#nearby").click(function() {
		$("#mywhlist").addClass('hideBlock');
		$("#nblist").removeClass('hideBlock');
		$("#warehouse").val('0');
		$('#multiplePOS input').val('');
		$('#isVerified').val('');
		hideError();
		hideErrorContent();
	});
	$(".closeLink").click(function() {
		hideError();
		hideErrorContent();		
		$("#tableCreateAction").addClass('hideBlock');
	});

	$('#dialog-verify #popupSearch .filterWrapper').addClass('hideBlock');
	$('#multiplePOS input').focus();
	$(".inputDate").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,

	});
	var curDate = new Date();
	var day = curDate.getDate();
	var month = (Number(curDate.getMonth()) + 1);
	var year = curDate.getFullYear();
	if (curDate.getDate() < 10) {
		day = '0' + curDate.getDate();
	}
	if ((Number(curDate.getMonth()) + 1) < 10) {
		month = '0' + month;
	}
	today = day + '/' + month + '/' + year;
	$('#dateFrom').val(today);

	$('.addRow').click(function() {
		// $('#tableCreateAction').toggle();
		if ($('#tableCreateAction').hasClass('hideBlock')) {
			$('#tableCreateAction').removeClass('hideBlock');
		} else {
			$('#tableCreateAction').addClass('hideBlock');
		}
		$('#multiplePOS input').focus();
	});

	$('.create-btn').click(function() {

		itemParam = new IBTItemParam();

		if (validateStockTransfer(itemParam)) {
			var tempList = [];
			tempList.push(itemParam);
			param = new IBTParam(tempList, itemParam.iv_supplier);
			createIBTHdrDraftList(param, 'INSERT');
		}
	});
//	loadIBTDraftList();
	$('#addtolist').click(
			function(event) {
				var articleList = [];
				if ($('input[name="articlecheckbox"]:checked').length >= 1) {
					// addArticleToPromoList();
					$('input[name="articlecheckbox"]:checked').filter(
							function() {
								articleList.push(articleSearchResult[$(this)
										.attr('data_index')]);
							});
					triggerDraftList(articleList);
				} else {
					// guru note add pop up msg
					// console.log('Please select an article');
				}
			});

	$('#dialog-siteSearchPop .popupActions .secondaryActionBtn').click(
			function() {
				$('#dialog-siteSearchPop').dialog('close');
			});
	$('#dialog-siteSearchPop #addtolistStore').addClass('hideBlock');

	$('.yesBtn').unbind('click');
	$('.yesBtn').click(function() {
		$('#dialog-modal-alertBox').dialog('close');
		// $('.saveBtn:visible').click();

	});
	$('.noBtn').unbind('click');
	$('.noBtn').click(function() {
		$('#dialog-modal-alertBox').dialog('close');

	});
	$('#warehouse').change(function(){
		$('#multiplePOS input').val('');
		$('#isVerified').val('');
		$('.removeStore').trigger('click');
	});
	$('#multiplePOS .targetSite').on('input', function() {
		$('#isVerified').val('');
		$("#mywhlist #warehouse").val('0');
		$("#nblist .store-list-selected").html('');
	});
	
	$('#openOrders').tabs({
		active : 0
	});

	$("#dialog-openOrders").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 750
	});
	
	$('.popupActions .actionBtn').click(function() {
		$("#dialog-openOrders").dialog("close");
		$('#openOrders').tabs({
			active : 0
		});
	});
	
	$("#dialog-mulipleArticles").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 515
	});
	
	/*$('.temperature2Class').on('keypress', function(e) {
	    var k = String.fromCharCode(e.charCode);
	    var v = this.value;
	    var dp = v.indexOf('.');

	    // reject illegal chars
	    if ((k < '0' || k > '9') && k !== '.' && k !== '-') return false;

	    // reject any input that takes the length
	    // two or more beyond the decimal point
	    if (dp >= 0 && v.length > dp + 3) {
	        return false;
	    }

	    // don't accept >1 decimal point, or as first char
	    if (k === '.' && (dp >= 0 || v.length === 0)) {
	        return false;
	    }

	});
	$('.temperature2Class').on('keyup', function(e) {
	    var k = String.fromCharCode(e.charCode);
	    var v = this.value;
	    var dp = v.indexOf('.');
	    if (this.value >= 1000 || this.value <= -1000)
	    	{this.value='';
	        return false;
	    }

	});
	*/
	$('.temperature1Class,.temperature2Class').on('keypress', function(e) {
	    var k = String.fromCharCode(e.charCode);
	    var v = this.value;
	    var dp = v.indexOf('.');
	    
	    if ((k < '0' || k > '9') && k !== '.' && k !== '-') {
	    	return false;
	    }
	   if (dp >= 0 && v.length > dp + 2) {
	        return false;
	    }

	    // don't accept >1 decimal point, or as first char
	    if (k === '.' && (dp >= 0 || v.length === 0)) {
	        return false;
	    }

	});
	$('.temperature1Class,.temperature2Class').on('keyup', function(e) {
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
	
});

function showErrorContent(title, errorContent) {
	/*title = 'Stock Transfer';
	$('#ibtErrorWrapper').find('#titleContent').html(title);
	$('#ibtErrorWrapper').find('#errorContent').html(errorContent);
	$('#ibtErrorWrapper').removeClass('hideBlock');*/
	
		$.fn.showCustomMsg([errorContent],error,'Stock Transfer');
}

function hideErrorContent() {
	$('#multiplePOS input').removeClass('errorField');
	$('#ibtErrorWrapper').addClass('hideBlock');
	$('#stockStatusWrapper, #stockInfoWrapper').addClass('hideBlock');
}

function hideError() {
	$('#multiplePOS input').removeClass('errorField');
	$('#stockStatusWrapper, #stockInfoWrapper').addClass('hideBlock');
	$('.errorDivition').removeClass('warnDiv').removeClass('errorDiv')
			.addClass('errorDiv').addClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text('');
}

function verifyStore(data, flag) {

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
					hideErrorContent();
					$('#dialog-verify .popupActionsWrapper').addClass(
							'hideBlock');
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</th><th data-sort="string" class="sorted ascending" >Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
					if (res != null && res != undefined && res.length > 0) {
						var list = res;
						var j = 0;
						var k = 1;
						var siteNo = '';
						var siteName = '';
						var alhFlag='';
						siteNo = list[0].site_no;
						siteName = list[0].site_desc;
						alhFlag=list[0].alh_flag;
						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>'
									+ list[i].site_no + '</td><td>'
									+ list[i].site_desc + '</td><td class="hideBlock alhFlag">'+list[i].alh_flag+'</td>';
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
													+ $('#multiplePOS input')
															.val().trim()
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
							bindStoreContent(flag);
						} else {
							if (siteNo != '' && siteName != '') {
								var site = siteNo + '-' + siteName;
								$('#multiplePOS input').val(site);
								$("#isVerified").val(true);
								$("#alhFlag").val(alhFlag);
								$('.removeStore').trigger('click');
								$('#warehouse').val('Select');
							} else {
								showErrorContent('Search & Add','Invalid store Id/Name');
								//showError('Invalid store Id/Name');
							}
						}

					} else {
						showErrorContent('Search & Add','Invalid store Id/Name');
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

function showError(text) {

	$('.errorDivition').removeClass('warnDiv').removeClass('errorDiv')
			.addClass('errorDiv').removeClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text(text);
}

function bindStoreContent(flag, supplierFlag) {
	$(".sortPopUpTbl").tablesort();
	$('.selectStore').unbind('click');
	$('.selectStore').click(
			function() {
				hideError();
				hideErrorContent();
				var site = $(this).parent().parent().parent().find('td:first')
						.text().trim()
						+ '-'
						+ $(this).parent().parent().parent().find(
								'td:nth-child(2)').text().trim();
				$('#multiplePOS input').val(site);
				$("#isVerified").val(true);
				$("#alhFlag").val($(this).parent().parent().parent().find(
				'td:nth-child(3)').text().trim());
				$("#dialog-verify").dialog("close");
				$('.removeStore').trigger('click');
				$('#warehouse').val('Select');
			});

	$('#dialog-verify .textbox ').unbind('keyup');
	$('#dialog-verify .textbox ')
			.keyup(
					function() {
						value = $(this).val();
						$('.verifyContent').removeClass('filltered');
						$('.verifyContent')
								.filter(
										function() {
											$('input[name="articlecheckbox"]')
													.prop('checked', false);
											$(
													'input[name="articlecheckboxSelectAll"]')
													.prop('checked', false);
											$('.add-list').text("Add To List")
													.addClass('hideBlock');
											if (value != '') {
												if (($(this).children(
														':nth-child(1)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1 || $(
														this).children(
														':nth-child(2)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1)) {
													$(this).addClass(
															'filltered');
													$(this).removeClass(
															'hideBlock');
													// //console.log(i++);
												} else {
													$(this).addClass(
															'hideBlock');
													$(this).removeClass(
															'filltered');
												}
											} else {
												$(this)
														.removeClass(
																'hideBlock');
												$(this).addClass('filltered');
											}
										});
						var recCnt = $('.verifyContent.filltered').length;
						currentPage = 1;
						if (recCnt > 9) {
							$('.verifyPagination').removeClass('hideBlock');
							$('.verifyPagination').pagination({
								items : recCnt,
								itemsOnPage : 9,
								cssStyle : 'compact-theme',
								currentPage : currentPage,
								onPageClick : function(pageNumber) {
									showStoreNoPage(pageNumber);

								}

							});
						} else {
							$('.verifyPagination').addClass('hideBlock');
						}

						var i = 0;
						var cnt = 1;
						$('.verifyContent').each(function() {
							var flag = false;
							if ($(this).hasClass('filltered')) {
								$(this).attr('class', '');
								flag = true;
								i = i + 1;
								$(this).addClass('filltered');
							} else {
								$(this).attr('class', '');
								$(this).addClass('hideBlock');
							}

							$(this).addClass('verifyContent');

							if (flag) {
								$(this).addClass('pagNo-' + cnt);
							}
							if (cnt > 1)
								$(this).addClass('hideBlock');

							if (i % 9 == 0) {
								cnt++;
							}

							// //console.log(i++);
						});
					});
	/*
	 * $('.select-article').click( function() {
	 * 
	 * var index = $(this).attr('data_index');
	 * currentArticleObj=articleSearchResult[index];
	 * triggerDraftList(currentArticleObj); });
	 */

	//$('.add-list').addClass('hideBlock');
	// $('#addtolist').addClass('hideBlock');
/*	$('input[name="articlecheckbox"]')
			.change(
					function() {
						var article = $(this).attr('data_article');
						var size = $('input[name="articlecheckbox"]:checked').length;
						if (size > 0) {

							$('.add-list').text("Add To List(" + size + ")")
									.removeClass('hideBlock');
						} else {
							$('.add-list').text("Add To List").addClass(
									'hideBlock');
							$('#dialog-verify [data_article="' + article + '"]')
									.prop('checked', false);
						}
						if ($('.filltered input[name="articlecheckbox"]').length == $('input[name="articlecheckbox"]:checked').length) {
							$('input[name="articlecheckboxSelectAll"]').prop(
									'checked', true);
						} else {
							$('input[name="articlecheckboxSelectAll"]').prop(
									'checked', false);
						}
					});
	$('input[name="articlecheckboxSelectAll"]').change(
			function() {
				if ($(this).is(':checked')) {
					$('.filltered input[name="articlecheckbox"]').prop(
							'checked', true);
				} else {
					$('.filltered input[name="articlecheckbox"]').prop(
							'checked', false);
				}
				$('input[name="articlecheckbox"]').trigger('change');
			});*/

	$('#addtolist').unbind('click');
	$('#addtolist').click(function() {
		var list = $('.filltered input[name="articlecheckbox"]:checked');
		var tempList = [];
		var msg = '';
		var qty = $draftParent.find('#qty').val();
		var errorCd = [];
		var DisplayOrPrepack=[];
		var comp_item_restrict = new Array();
		//Defect_12197
		var errorArray = [];
		$(list).each(function() {
			var index = $(this).attr('data_index');
			var obj = articleSearchResult[index];
			var checkVal = '';
			
			$(this).closest('tr').find('input.ibtUom[type="checkbox"]:checked').each(function(){
				var newObj = {};
				$.extend(true, newObj, obj);
				checkVal = $(this).val();
				newObj.article_uom = (checkVal != undefined && checkVal != null) ? checkVal : newObj.article_uom;
				newObj.qty = qty;
				if((newObj.display_article_flag=="Y") && $('#salesOrg').val()==1060){		//newObj.display_item_ind=="Y" || newObj.prepack_item_ind=="Y" - existing condition
					DisplayOrPrepack.push(newObj.article);
				//Defect_12197
				}else if(!isDescChkFirst && (obj.supplier||'').trim()=='' && supplierFlag == 'W'){
					errorArray.push('Article '+obj.article+ ': No supplier found in Store Central please contact support.')
				}else{
					tempList.push(newObj);
				}
			});
/*			var radioVal = $(this).closest('tr').find('input[type="radio"]:checked').val();
			obj.article_uom = (radioVal != undefined && radioVal != null) ? radioVal : obj.article_uom;*/
			if(supplierFlag == 'W' && obj.link_conversion_flag == 'Y'){
				comp_item_restrict[comp_item_restrict.length] = obj.article;
			}
		});
		
		if(comp_item_restrict.length != 0){
			errorCd.push('Component article ' + comp_item_restrict.join(',') + ' cannot be transferred to DC.');
				$.fn.showCustomMsg(errorCd
							,error,'Stock Transfer');
			$('#dialog-mulipleArticles').dialog('close');
		} else {
			if(isDescChkFirst){
			var articleNum="";
			var articleList=[];
			for (var i=0; i<tempList.length;i++){
				/*articleNum = tempList[i].article_no;
				articleList += articleNum;
				}*/
			 articleNum = tempList[i].article == undefined ? tempList[i].article_no : tempList[i].article;
			 articleList = (articleList.length > 0)? articleList+",":articleList;	
			 articleList +=  articleNum;
			}
			
			var articleinput = $draftParent.find('.searchbox');
			console.log($draftParent);
			var msg = 'Please enter keyword to lookup';
			var articleSearchParam;
			var iv_ibt_desc = "";
			var supplier = $draftParent.attr('data_supplier_no');
			if (articleList == '') {
				$(articleinput).error(msg);
				showErrorContent('Site '+supplier+' - Search & Add',msg);
			}else {
				articleSearchParam = new ArticleSearchParam(articleList);
				articleSearchParam.iv_auto_stockr_flag="";
				articleSearchParam.iv_ranged="";
				articleSearchParam.iv_deleted_flag="Y";
				if(isDesiredRole(roleMap,roleId))
					{
					articleSearchParam.iv_delisted_flag="Y";
					}
				else
					{
					articleSearchParam.iv_delisted_flag="N";
					} 
			
					articleSearchParam.iv_ibt_desc = "Y";
						
			}
			callServiceForArticle(articleSearchParam,articleList);
			
			}
			if (isDescChkFirst){
				isDescChkTemp = false;
				isDescChkFirst = false;
			}else {
				isDescChkTemp = true;
			}
				
			if(isDescChkTemp){
			if (tempList.length > 0) {
				if(errorArray.length>0){
					$.fn.showCustomMsg(errorArray,error);
				}else if(DisplayOrPrepack.length!=0){
					errorCd.push('Display/Prepack articles ' + DisplayOrPrepack.join(',') + ' cannot be added.');
					$.fn.showCustomMsg(errorCd
								,error,'Stock Transfer');
					$('#dialog-mulipleArticles').dialog('close');
				}
				triggerDraftCreate(tempList);
				hideErrorInSearch($draftParent);
				$('#dialog-mulipleArticles').dialog('close');
			}else{
				if(errorArray.length>0){
					$.fn.showCustomMsg(errorArray,error);
				}else if(DisplayOrPrepack.length!=0){
					errorCd.push('Display/Prepack articles ' + DisplayOrPrepack.join(',') + ' cannot be added.');
					$.fn.showCustomMsg(errorCd
								,error,'Stock Transfer');
					$('#dialog-mulipleArticles').dialog('close');
				}
				else{
				$.fn.showCustomMsg(['Please select UOM to transfer'],error,'Stock Transfer');
				}
			}
		}
		}
	});
	
	$('.artCancel').unbind('click');
	$('.artCancel').click(function() {
		$('#dialog-mulipleArticles').dialog('close');
	});
	

	$('#addtolist').addClass('hideBlock');
	$('input[name="articlecheckbox"]').change(
			function() {
				var size = $('input[name="articlecheckbox"]:checked').length;
				if (size > 0) {
					$('#addtolist').text("Add To List(" + size + ")")
							.removeClass('hideBlock');
				} else {
					$('#addtolist').text("Add To List").addClass('hideBlock');
				}
				if($('input[name="articlecheckbox"]').length==size){
					$('input[name="articlecheckboxSelectAll"]').prop('checked',true);
				}else{
					$('input[name="articlecheckboxSelectAll"]').prop('checked',false);
				}
			});
	$('input[name="articlecheckboxSelectAll"]').change(function(){
		if($(this).is(':checked')){
			$('input[name="articlecheckbox"]').prop('checked',true);
		}else{
			$('input[name="articlecheckbox"]').prop('checked',false);
		}
		$('input[name="articlecheckbox"]').trigger('change');
	});

}
function validateArticle(list) {
	// validateStockTransfer
	/*
	 * for(var i=0;i<list.length;i++){ if(){
	 * 
	 * }else if(){
	 * 
	 * }else{ } }
	 */
	return true;
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

function showNearbyStoreNoPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.nearbyVerifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function createWareHouseList(data) {
	var content = '<option value="0">Select</option>';
	if (!$('#mywhlist select').hasClass('loaded')) {
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
							showErrorContent('','No warehouse availalbe for the logged in store');
							//showError('No warehouse availalbe for the logged in store');
						}
						$('#mywhlist select').html(content);
						stopLoading();
					},
					error : function() {
						// goToLogin();
						$('#mywhlist select').html(content); 
						stopLoading();
					}
				});
		$('#mywhlist select').addClass('loaded');
	}
}

function getNearbyStores(data) {
	var tblHdr = '<thead><tr><th>Site No</th><th>Site Name</th><th>Proximity (km)</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
	console.log(nearbyStoreSearchURL+' '+JSON.stringify(data));
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
									+ list[i].site_name + '</td><td>'
									+ list[i].distance + '</td>';
							tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem select-nearby-store">Select</label></label></td></tr>';

							if (j % 9 == 0) {
								k++;
							}

						}
						if (j >= 1) {
							currPageNear = 1;
							$('#dialog-siteSearchPop #searchWarning').addClass(
									'hideBlock');
							$('#dialog-siteSearchPop .tableTitle').removeClass(
									'hideBlock');
							$('#dialog-siteSearchPop .ContentTable')
									.removeClass('hideBlock');
							$('#dialog-siteSearchPop .tableTitle strong').text(
									list.length);
							$('#dialog-siteSearchPop .ContentTable').html('');
							$('#dialog-siteSearchPop .ContentTable').html(
									tblHdr);
							$('#dialog-siteSearchPop .noteLbl').remove();
							$("#dialog-siteSearchPop").dialog("open");
							if (j > 9) {
								$('.nearby-pagination ').removeClass(
										'hideBlock');
								$('.nearby-pagination ').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPageNear,
									onPageClick : function(pageNumber) {
										showNearbyStoreNoPage(pageNumber);

									}

								});
							} else {
								$('.nearby-pagination ').addClass('hideBlock');
							}
							bindNearByStoreContent();

						}

					} else {
						$('#dialog-siteSearchPop .ContentTable').addClass(
								'hideBlock');
						showErrorInpopUp(
								$('#dialog-siteSearchPop #searchWarning'),
								'Sorry , no results found for the search criteria. Please try again.');
						$('.nearby-pagination ').addClass('hideBlock');
						$('#dialog-siteSearchPop .tableTitle').addClass(
								'hideBlock');
						$('#dialog-siteSearchPop').dialog('open');
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
					// $('#mywhlist select').html(content);
					$('#dialog-siteSearchPop .ContentTable').addClass(
							'hideBlock');
					showErrorInpopUp($('#dialog-siteSearchPop #searchWarning'),
							'Sorry , no results found for the search criteria. Please try again.');
					$('.nearby-pagination ').addClass('hideBlock');
					$('#dialog-siteSearchPop .tableTitle')
							.addClass('hideBlock');
					stopLoading();
				}
			});
}
function restNearbyVal() {
	$('.nearby-distance').val('10');
	$('.salesOrgMap').val($('#salesOrg').val());
	$('.nearby-max-store').val('10');
}
function showErrorInpopUp(elem, msg) {
	$(elem).html('<h4>' + msg + '</h4>').removeClass('hideBlock');
}
function bindNearByStoreContent() {
	$('.select-nearby-store').unbind('click');
	$('.select-nearby-store')
			.click(
					function() {
						hideError();
						hideErrorContent();
						var site = '<li><label>'
								+ $(this).parent().parent().parent().find(
										'td:first').text().trim()
								+ '-'
								+ $(this).parent().parent().parent().find(
										'td:nth-child(2)').text().trim()
								+ ' </label><label class="closeMessage removeStore">&nbsp;</label></li>';
						$('.store-list-selected').html(site);
						$("#dialog-siteSearchPop").dialog("close");
						bindRemove();
						$('#warehouse').val('Select');
						$('#multiplePOS input').val('');

					});
}
function bindRemove() {
	$('.removeStore').click(function() {
		$(this).parent().remove();
	});
}

function bindClose() {
	$('.closeMessage').unbind('click');
	$('.closeMessage').click(function() {
		$('.lookupActionWrapper .errorDiv').addClass('hideBlock');
		$('.lookupActionWrapper .warnDiv').addClass('hideBlock');
	});
}

function moveListToMap(param) {
	var list = [];
	var article;
	if (ibtMap.hasOwnProperty(param.iv_site)) {
		list = ibtMap[param.iv_site];
	}

	for ( var i = 0; i < param.tempArticleList.length; i++) {
		article = param.tempArticleList[i];
		list.push(article);
	}
	ibtMap[param.iv_site] = list;

}
function Article(item) {
	this.article = item.iv_article;
	this.supplier = item.iv_supplier;
}

function IBTHdrParam() {
	this.ItemArray = itemArray;
	this.iv_supplier = supplier;
}
function IBTParam(itemArray, supplier) {
	this.ItemArray = itemArray;
	this.iv_supplier = itemArray[0].iv_supplier;
}

function IBTItemParam() {
	this.iv_delivery_date = formatDateMobi(today);
	this.iv_roster_date = formatDateMobi(today);
	this.iv_site = loggedInSiteNo;
	this.iv_session_id = sessionId;
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
	 this.iv_cost_price='';
	 this.iv_greenlife_flag='';
}
function IBTItemParamFromArticle(article, qty, supplier, action, weight, user,
		contactName, contactNo, pickupDate, pickupTime, comments) {
	this.iv_site = loggedInSiteNo;
	this.iv_session_id = sessionId;
	this.iv_article = article.article;
	this.iv_article_uom = article.article_uom;
	this.iv_user = user;
	this.iv_action = action;
	this.iv_qty = qty;
	this.iv_supplier = supplier;
	this.iv_order_type = draft_type;
	this.iv_weight = weight;
	this.iv_contact_name = contactName;
	this.iv_contact_no = contactNo;
	this.iv_pickup_date = formatDateMobi(pickupDate);
	this.iv_pickup_time = pickupTime;
	this.iv_comments = comments;
}
function ArticleParam(userId, draft_type) {
	/* iv_user_id":"xkkyc","":"123","":"PO","iv_order_type":"PO","iv_supplier":"","iv_sales_org":"1005 */
	this.iv_user_id = userId;
	this.iv_order_type = draft_type;
	this.iv_session_id = "";
	this.iv_draft_type = draft_type;
	this.iv_supplier = "";
	this.iv_sales_org = $('#salesOrg').val();
}

function getTableSortHdr(supplier) {
	var main_table_hdr = '<tr class="groupByTr2 table-sort-hdr" data_supplier_no="'
			+ supplier
			+ '"><th class="noSort expander  expand-all-article-hdr" width="20px"><span class="indenter" style="padding-left: 0px;"><a title="Collapse" class="expandAll">&nbsp;</a></span>'
			+ '</th><th data_prop="article">Article</th><th data_prop="article_desc">Description</th><th class="centerValue" data_prop="article_uom">UOM</th>'
			+ '<th class="centerValue title" data_prop="soh" title="Stock on Hand">SOH</th><th class="centerValue" data_prop="qty">Transfer Qty.</th>'
			+ '<th class="centerValue" data_prop="om" title" title="Order Multiple">OM</th><th class="centerValue" data_prop="tot_qty">Total Units </th><th class="lastColumn centerValue noSort">Actions</th>'
			+ '</tr>';
	var actionBtn = '<tr class="groupByTr2 table-action-row" data_supplier_no="'
			+ supplier
			+ '"><td colspan="15" class="">'
			+ '<div class="pageActions " style="padding:10px 0px">'
			+ '<label><strong data_supplier_no="'
			+ supplier
			+ '" class="tot-carton">Total Transfer Qty.: <total_carton></total_carton></strong></label>'
			+ '<label class="actionBtn save-draft" data_supplier_no="'
			+ supplier
			+ '" id="editAction"><a ><label class="saveBtn">Save</label></a></label>'
			+ '<label class="actionBtn submit-draft" data_supplier_no="'
			+ supplier
			+ '" id="createOrder"><a ><label class="thumbUp">Submit</label></a></label></div></td></tr>';
	return main_table_hdr + actionBtn;
}

function getArticleTrContent(obj, index) {
	var supplier = $draftParent.attr('data_supplier_no');
	var omVal = '';
	obj.article_uom = (obj.article_uom != null && obj.article_uom != undefined) ? obj.article_uom
			: '';
	obj.qty = (obj.qty != null && obj.qty != undefined) ? obj.qty : '';
	obj.weight = (obj.weight != null && obj.weight != undefined) ? obj.weight
			: '';
	obj.soh = deciValues(obj.random_wgt_flg,'','',obj.pack_break_down_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,false);
	obj.soo = (obj.soo != null && obj.soo != undefined) ? obj.soo : '0';
	obj.sit = (obj.sit != null && obj.sit != undefined) ? obj.sit : '0';
	/*
	 * obj.new_uom = (obj.new_uom != null && obj.new_uom != undefined) ?
	 * obj.new_uom : '';
	 */
	//17.06 ZEA/ZKG OM Value changes
	//obj.om = (obj.om != null && obj.om != undefined) ? obj.om : '1';
	obj.om = (obj.om != null && obj.om != undefined) ? ((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0)) : '1';
	omVal = obj.om;
	obj.base_uom = (obj.base_uom != null && obj.base_uom != undefined) ? obj.base_uom
			: '1';
	//if(obj.article_uom == obj.order_uom)
	obj.tot_qty = (Number(obj.qty) * Number(obj.om));
	/*else
		obj.tot_qty = Number(obj.qty);*///FOR PBD FIX	
	
	if(obj.random_wgt_flg != undefined && obj.random_wgt_flg != null && $.trim(obj.random_wgt_flg) == 'Y'){
		if( obj.weight == '')
		obj.weight = (Number(obj.qty) * Number(obj.om));
		obj.pi_om = (obj.pi_om != null && obj.pi_om != undefined && obj.pi_om != '0') ? obj.pi_om : '1';
		omVal = obj.base_uom == obj.article_uom ? '1' : obj.pi_om; //for defect 2281
		obj.tot_qty = (Number(obj.qty) * Number(omVal));//for defect 2281
	}
	obj.tot_qty = (obj.tot_qty != null && obj.tot_qty != undefined) ? ((obj.tot_qty.toString().split('.')[1] > 0)?Number(obj.tot_qty).toFixed(3): Number(obj.tot_qty)) : '';
	
	var main_table_content = '<tr mainrow data-tt-id="24" data_index="'
			+ index
			+ '" data_article_row="'
			+ obj.article
			+ '" data_article_uom="'
			+ obj.article_uom
			+ '" data_supplier_no="'
			+ supplier
			+ '" data_order_uom="'
			+ obj.order_uom
			+ '" class="groupByTr2 collapsed article-content-row" style="display: table-row;">'
			+ '<td class="expander expand-article-hdr"><span class="indenter" style="padding-left: 0px;"><a  title="Collapse">&nbsp;</a></span>&nbsp;</td>'
			+ '<td>' + obj.article + '</td>' + '<td class="st_article_desc">' + obj.article_desc
			+ '</td>';
	/*
	 * +'<td class="centerValue single-uom'; if (obj.uomlist == undefined ||
	 * obj.uomlist.length > 0) main_table_content += 'hideBlock ';
	 * 
	 * main_table_content += ' ">' + obj.article_uom + '</td>';
	 */
	main_table_content += '<td data_org_uom="' + obj.article_uom
			+ '" class="centerValue multiple-uom ';
	// if (obj.uomlist != undefined && obj.uomlist.length 1)
	main_table_content += ' ';

	main_table_content += ' ">'
	/*
	 * + '<select class="selectOptions uom-drop" id="uom" value="' +
	 * obj.new_uom + '" name="uom-drop">'
	 */;
	/*
	 * if (obj.uomlist != undefined) main_table_content +=
	 * getUOMList(obj.uomlist); else
	 */
	/*
	 * main_table_content += '<option value="' + obj.article_uom + '">' +
	 * obj.article_uom + '</option>'; main_table_content += '</select>'
	 */
	var sohValueIBT = (obj.perpetual_flag =="N")?"":deciValues(obj.random_wgt_flg,'','',obj.pack_break_down_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,false);
	main_table_content += obj.article_uom
	+ '</td><td class="centerValue ">'
	+ sohValueIBT
	+ '</td>'
	+ '<td class="centerValue "><label class="moreInput';
	if (obj.allow_decimal_adj != 'Y' || obj.weighted_flag == undefined || $.trim(obj.weighted_flag) == ''
		|| obj.weighted_flag == null || obj.weighted_flag.trim() == 'N' ||  obj.article_uom != 'KG') {
		main_table_content += ' hideBlock ';
	}
	main_table_content += '"><strong>'+((obj.allow_decimal_adj == 'Y' && (obj.base_uom != 'L' || obj.base_uom != 'G')) ? 'Total Weight (kg)':'')+'</strong></label><input type="#"  data_org_qty="'
		+ obj.qty
		+ '" value="'
		+ obj.qty
		+ '" class="editNumCell textbox textboxDefaultText qty-input '+(((obj.weighted_flag=='Y' && obj.article_uom == 'KG') ||( obj.allow_decimal_adj == 'Y' && obj.random_wgt_flg !='Y')) ? ' weight ':'')+'" maxlength="3" ><label class="moreInput';
	if (obj.allow_decimal_adj != 'Y' || obj.random_wgt_flg == undefined || $.trim(obj.random_wgt_flg) == ''
		|| obj.random_wgt_flg == null || obj.random_wgt_flg.trim() == 'N') {
		main_table_content += ' hideBlock ';
	}
	main_table_content += '"><strong>Total Weight (kg)</strong></label><input type="#"  maxlength="13" data_org_weight="'
		+ obj.weight
		+ '" value="'
		+ obj.weight
		+ '" class="editNumCell textbox textboxDefaultText wtTextBoxFix weight-input ';
	if (obj.allow_decimal_adj != 'Y' || obj.random_wgt_flg == undefined || $.trim(obj.random_wgt_flg) == ''
		|| obj.random_wgt_flg == null || $.trim(obj.random_wgt_flg) == 'N') {
		main_table_content += ' hideBlock ';
	}
	main_table_content += '">';

	main_table_content += '</td>'
			+ '<td class="centerValue ">'
			+ omVal
			+ ' '
			+ ((obj.random_wgt_flg||'') == 'Y' ? (obj.pi_uom||'EA') : obj.base_uom)
			+ '</td><td class="centerValue "><strong class="tot_qty">'
			+ obj.tot_qty
			+ ' '
			+ ((obj.random_wgt_flg||'') == 'Y' ? (obj.pi_uom||'EA') : obj.base_uom)
			+ '</strong></td><td class="lastColumn centerValue">'
			+ '<label class="linkBtn"><a ><label class="deleteRecord">&nbsp;</label></a></label></td><td class="hideBlock prodRecalled">'+obj.ps_article_status+'</td></tr>';

	var sub_table_content = '<tr class="groupByTr2 collapsed hideBlock article-stock-row" data_supplier_no="'
			+ supplier
			+ '"  data_article_row="'
			+ obj.article
			+ '" data_article_uom="'
			+ obj.article_uom
			+ '" data-tt-id="25" data-tt-parent-id="24" style="display: table-row;">'
			+ '<td colspan="10"><span class="indenter" style="padding-left: 19px;"></span><span class="indenter"></span>'
			+ '<table cellspacing="0" class="ContentTable" width="100%">'
			+ '<tbody><tr><td width="20%" class="keyInfo">Stock on Order:</td><td width="13%" class="valueInfo columnDivider">'
			+ '<label class="linkBtn">';
	if (obj.soo != null && obj.soo != undefined && obj.soo.toString() != '') {
		sub_table_content += '<label article="'+obj.article+'" id="" class="'+((obj.soo != '' &&  obj.soo.toString() != '0') ? 'newWindowAfter openOrdersLink' : '')+'">'
				+ obj.soo + '</label>';
	}
	sub_table_content += '</label></td>'
			+ '<td width="20%" class="keyInfo noDivider"></td><td width="13%" class="valueInfo columnDivider noDivider"></td>'
			+ '<td width="20%" class="keyInfo noDivider"></td><td width="13%" class="valueInfo lastColumn"></td></tr>'
			+ '<tr><td class="keyInfo">Stock in Transit:</td><td class="valueInfo columnDivider">'
			+ ((obj.sit != null && obj.sit != undefined && obj.sit.toString() != '' && obj.sit.toString().indexOf('.') != -1)?Number(obj.sit).toFixed(3):obj.sit)	
			+ '</td>'
			+ '<td class="noDivider"></td><td class="valueInfo noDivider"></td><td class="keyInfo noDivider"></td>'
			+ '<td class="valueInfo lastColumn"></td></tr>'
			+ '</tbody></table></td></tr>';
	return main_table_content + sub_table_content;
}
function getUOMList(list) {
	var content = '';
	if (list != undefined) {
		for ( var i = 0; i < list.length; i++) {
			content += '<option value="' + list[i] + '">' + list[i]
					+ '</option>';
		}
	}
	return content;
}
function showErrorInSearch($draftParent, msg) {
	$draftParent.find('.errorDiv label:first').text(msg);
	$draftParent.find('.errorDiv').removeClass('hideBlock');
}
function hideErrorInSearch($draftParent) {
	$draftParent.find('.errorDiv label:first').text('');
	$draftParent.find('.errorDiv').addClass('hideBlock');
}

function showArticleResult(res, flag,supplierFlag,alh_flag) {
	articleSearchResult = res;
	var radioContent = '';
	var tblHdr = '<tr><th>Article No</th><th>Description</th><th>UOM</th><th width="40px" class="lastColumn">Select</th></tr>';
	if (res != null && res != undefined && res.length > 0) {
		var list = res;
		var cnt = list.length
	/*	var j = 0;
		var k = 1;*/
		/*
		 * var articleNo = ''; var articleName = ''; articleNo =
		 * list[0].article_no; articleName = list[0].article_name;
		 */
		for ( var i = 0; i < list.length; i++) {
			if(alh_flag == 'Y' && ((list[i].pack_break_down_flag||'')  == 'Y' && (list[i].article_uom != list[i].base_uom))){
				// pop the list size
				cnt --;
			}else{
				//j++;
				list[i].order_uom = (list[i].order_uom != null
						&& list[i].order_uom != '' && list[i].order_uom != undefined) ? list[i].order_uom
						: '';
				list[i].base_uom = (list[i].base_uom != null
						&& list[i].base_uom != '' && list[i].base_uom != undefined) ? list[i].base_uom
						: '';
				
				list[i].article_uom = (list[i].article_uom != null
						&& list[i].article_uom != '' && list[i].article_uom != undefined) ? list[i].article_uom
						: '';
				
				if(list[i].order_uom == list[i].article_uom)
					flag = false;
				else
					flag = true;
				if (!flag) {
					if(alh_flag == 'Y'){
						radioContent = '<input type="checkbox" class="baseUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].article_uom
						+ '" checked="checked">' + list[i].article_uom + '</input>';	
					}else{
						if(supplierFlag != 'W'){
							radioContent = '<input type="checkbox" class="baseUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].article_uom
							+ '" checked="checked">' + list[i].article_uom + '</input>';	
						}else if(supplierFlag == 'W'){
							if(list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined){
								radioContent = '<input type="checkbox" class="orderUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].order_uom
								+ '" checked="checked">' + list[i].order_uom + '</input>';
							}
						}else{
							break;
						}
					}
					
				} else if(flag){
					if(alh_flag == 'Y'){
						radioContent = '<input type="checkbox" class="baseUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].article_uom
						+ '" checked="checked">' + list[i].article_uom + '</input>';	
					}else{
						if(supplierFlag == 'W'){
							if(list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined){
									radioContent = '<input type="checkbox" class="orderUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].order_uom
									+ '" checked="checked">' + list[i].order_uom + '</input>';
							}
							//else{
									//break;
								//}
						}else{
							radioContent = ((list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined) ? '<input type="checkbox" class="orderUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].order_uom
							+ '" checked="checked">' + list[i].order_uom + '</input>' : '')
							+'<input type="checkbox" '+((list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined) ? '' :  'checked="checked"')+'class="baseUom ibtUom" id="' + list[i].article + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article + '-' + i+'" value="' + list[i].article_uom
							+ '">' + list[i].article_uom + '</input>';
						}
					}
				}
				tblHdr += '<tr data_index="' + i
						+ '" class="verifyContent filltered';
	/*			if (k > 1) {
					tblHdr += ' hideBlock ';
				}*/
				tblHdr += ' "><td>' + list[i].article + '</td><td>'
						+ list[i].article_desc + '</td><td>' + radioContent
						+ '</td>';
				tblHdr += '<td class="sorted lastColumn"><input data_index="' + i
						+ '" data_article="' + list[i].article
						+ '" data_article_uom="' + list[i].article_uom
						+ '" type="checkbox" name="articlecheckbox"></td></tr>';
	
	/*			if (j % 9 == 0) {
					k++;
				}*/
			}

		}
	/*	if (j > 1) {
			currPage = 1;
			$('#dialog-verify .popupActionsWrapper').removeClass('hideBlock');
			$('#dialog-verify h4')
					.html(
							'Too many search results for <strong>'
									+ $draftParent.find('.searchbox').val()
											.trim()
									+ '</strong>. Please select an article from the list below.');
			$('#dialog-verify').parent().find(
					'.ui-dialog-titlebar .ui-dialog-title').text(
					'Search Article');
			$('#dialog-verify .ContentTable').html('');
			$('#dialog-verify .ContentTable').html(tblHdr);
			$('#dialog-verify .noteLbl').remove();
			$("#dialog-verify").dialog("open");
			$('#dialog-verify .textbox ').attr('placeholder',
					'Enter article no. or name');
			$('#dialog-verify .popupActionsWrapper ').removeClass('hideBlock');
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
			bindStoreContent('');

		}*/
		$('#searchArticleCount').text(cnt);
		return tblHdr;
	}
}

function showArticleResultDesc(res, flag,supplierFlag,alh_flag) {
	articleSearchResult = res;
	var radioContent = '';
	var tblHdr = '<tr><th>Article No</th><th>Description</th><th>UOM</th><th width="40px" class="lastColumn">Select</th></tr>';
	if (res != null && res != undefined && res.length > 0) {
		var list = res;
		var cnt = list.length;
		for ( var i = 0; i < list.length; i++) {
			if(alh_flag == 'Y' && ((list[i].pack_break_down_flag||'')  == 'Y' && (list[i].article_uom != list[i].base_uom))){
				cnt --;
			}else{
				list[i].order_uom = (list[i].order_uom != null
						&& list[i].order_uom != '' && list[i].order_uom != undefined) ? list[i].order_uom
						: '';
				list[i].base_uom = (list[i].base_uom != null
						&& list[i].base_uom != '' && list[i].base_uom != undefined) ? list[i].base_uom
						: '';
				
				list[i].article_uom = (list[i].article_uom != null
						&& list[i].article_uom != '' && list[i].article_uom != undefined) ? list[i].article_uom
						: '';
				
				if(list[i].order_uom == list[i].article_uom)
					flag = false;
				else
					flag = true;
				if (!flag) {
					if(alh_flag == 'Y'){
						radioContent = '<input type="checkbox" class="baseUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].article_uom
						+ '" checked="checked">' + list[i].article_uom + '</input>';	
					}else{
						if(supplierFlag != 'W'){
							radioContent = '<input type="checkbox" class="baseUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].article_uom
							+ '" checked="checked">' + list[i].article_uom + '</input>';	
						}else if(supplierFlag == 'W'){
							if(list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined){
								radioContent = '<input type="checkbox" class="orderUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].order_uom
								+ '" checked="checked">' + list[i].order_uom + '</input>';
							}
						}else{
							break;
						}
					}
					
				} else if(flag){
					if(alh_flag == 'Y'){
						radioContent = '<input type="checkbox" class="baseUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].article_uom
						+ '" checked="checked">' + list[i].article_uom + '</input>';	
					}else{
						if(supplierFlag == 'W'){
							if(list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined){
									radioContent = '<input type="checkbox" class="orderUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].order_uom
									+ '" checked="checked">' + list[i].order_uom + '</input>';
							}
						}else{
							radioContent = ((list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined) ? '<input type="checkbox" class="orderUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].order_uom
							+ '" checked="checked">' + list[i].order_uom + '</input>' : '')
							+'<input type="checkbox" '+((list[i].order_uom != null && list[i].order_uom !='' && list[i].order_uom != undefined) ? '' :  'checked="checked"')+'class="baseUom ibtUom hideBlock" id="' + list[i].article_no + '-' + i +'-uomRadio" name="uomRadioInDraft'+list[i].article_no + '-' + i+'" value="' + list[i].article_uom
							+ '">' + list[i].article_uom + '</input>';
						}
					}
				}
				tblHdr += '<tr data_index="' + i
						+ '" class="verifyContent filltered';
				tblHdr += ' "><td>' + list[i].article_no + '</td><td>'
						+ list[i].article_desc + '</td><td>' + radioContent
						+ '</td>';
				tblHdr += '<td class="sorted lastColumn"><input data_index="' + i
						+ '" data_article="' + list[i].article_no
						+ '" data_article_uom="' + list[i].article_uom
						+ '" type="checkbox" name="articlecheckbox"></td></tr>';
	
			}

		}
		$('#searchArticleCount').text(cnt);
		return tblHdr;
	}
}

function bindSortHdr($draftParent) {
	
	//$('.hdr-qty').within999();
	
	$('.article-content-row').unbind('click');
	$('.article-content-row').click(function() {
//		console.log('clicked');
	});
	$('.expand-all-article-hdr').unbind('click');
	$('.expand-all-article-hdr').click(
			function() {
				// var supplier=$(this).closest('tr').attr('data_supplier_no');
				var $tableRow = $(this).parent();
				if ($(this).find('a').hasClass('collapseAll')) {
					$(this).find('a').removeClass('collapseAll').addClass(
							'expandAll');
					$tableRow.nextUntil('.table-action-row','.article-content-row')
							.removeClass('expanded').addClass('collapsed');
					$tableRow.nextUntil('.table-action-row','.article-content-row').next()
							.addClass('hideBlock');
				} else {
					$(this).find('a').addClass('collapseAll').removeClass(
							'expandAll');
					$tableRow.nextUntil('.table-action-row','.article-content-row')
							.addClass('expanded').removeClass('collapsed');
					$tableRow.nextUntil('.table-action-row','.article-content-row').next()
							.removeClass('hideBlock');
				}
			});

	$('.expand-article-hdr').unbind('click');
	$('.expand-article-hdr').click(
			function() {
				// var supplier=$(this).closest('tr').attr('data_supplier_no');
				/*$(this).closest('tbody').find('.expand-all-article-hdr a')
						.removeClass('collapseAll').addClass('expandAll');*/
				if ($(this).closest('tr').hasClass('collapsed')) {
					$(this).closest('tr').removeClass('collapsed').addClass(
							'expanded');
					$(this).closest('tr').next().removeClass('hideBlock');
				} else {
					$(this).closest('tr').addClass('collapsed').removeClass(
							'expanded');
					$(this).closest('tr').next().addClass('hideBlock');
				}
				bindAccordionClickEvent($(this).parent());
			});
	$('.deleteRecord').unbind('click');
	$('.deleteRecord').click(function() {
		hideError();
		hideErrorContent();
		//$draftParent = $(this).closest('.expand-collapse-add-hdr');
		var elem = $(this);
		showWarn('Are you sure you want to remove the item from draft');
		$('.yesBtn').unbind('click');
		$('.yesBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			// $('.saveBtn:visible').click();
			triggerDraftDelete($(elem));
		});

	});
	
	$('.openOrdersLink').unbind('click');
	$('.openOrdersLink')
	.click(
			function() {

				showSOO($(this).attr('article'));
				/*ibtItemObj = $(this).closest('tr.article-stock-row').data('articleObj');
				var articleNo =$(this).closest('table').closest('tr').prev().attr('data_article_row');
				console.log(articleNo);
				callOnOrderService(articleNo);
				
							$('#orderTabInPopUp').trigger('click');
							$("#dialog-openOrders").parent().addClass(
									"popupWrapper");
							$("#dialog-openOrders").dialog("open");*/
				
							
			});
	
	$('#orderTabInPopUp').click(function() {
		clearAllErrors();
		callOnOrderService(ibtItemObj.article);
	});
	
	$('#frcstTabInPopUp').click(function() {
		var deptList = '';
		if(getEmptyIfNull(ibtItemObj.dept_dtls) != ''){
			deptList = ibtItemObj.dept_dtls.split(',')[0];
		}
		var data = {
			articleNo : getEmptyIfNull(ibtItemObj.article),
			departmentList : deptList,
			subCat : getEmptyIfNull(ibtItemObj.category_no),
			category : getEmptyIfNull(ibtItemObj.sub_category_no),
			segme : getEmptyIfNull(ibtItemObj.segment_no)
		};
		getForecastOrders(data);
	});

	$('.save-draft').unbind('click');
	$('.save-draft').click(function() {
		hideError();
		hideErrorContent();
		triggerDraftUpdate($(this));
		hideErrorInSearch($draftParent);

	});
	$('.submit-draft').unbind('click');
	$('.submit-draft').click(function() {
		hideError();
		hideErrorContent();
		// triggerDraftUpdate($(this));
		submitDraftToSAP($(this));
		hideErrorInSearch($draftParent);

	});
	$('.weight-input').unbind('change');
	$('.weight-input').change(
			function() {
				var weight = $(this).val();
				var decimalWeight = Number(weight).toFixed(3);
				$(this).val(decimalWeight);
				var index = '';
				var elem = $(this).closest('tr');
				var org_qty = $(this).attr('data_org_weight');
				var qty = $(this).val().trim();
				if (qty != org_qty) {
					var supplier = $(elem).attr('data_supplier_no');
					index = $(elem).attr('data_index');
					$(elem).addClass('changed');
					var changedVal = $(this).val().trim();
					if (ibtMap != '' && ibtMap != undefined && ibtMap != null
							&& ibtMap[supplier] != undefined) {
						ibtMap[supplier][index].weight = changedVal;
					}
				}
			});
	$('.qty-input').unbind('change');
	$('.qty-input')
			.change(
					function() {
						var index = '';
						$(this).hasClass('weight') ? $(this).val(Number($(this).val()).toFixed(3)) : '';
						var elem = $(this).closest('tr');
						var org_qty = $(this).attr('data_org_qty');
						var qty = $.trim($(this).val());
						var articleUom = $(elem).attr('data_article_uom');
						var orderUom = $(elem).attr('data_order_uom');
						var supplier = $(elem).attr('data_supplier_no');
						if (qty != org_qty) {
							$(elem).addClass('changed');
							index = $(elem).attr('data_index');
							var changedVal = $.trim($(this).val());
							var tot_qty = '';
							var weight = '';
							if (ibtMap != '' && ibtMap != undefined
									&& ibtMap != null
									&& ibtMap[supplier] != undefined) {
								ibtMap[supplier][index].qty = changedVal;
								if(getEmptyIfNull(ibtMap[supplier][index].random_wgt_flg) == 'Y'){
									if(articleUom == orderUom)
										{
									tot_qty = (Number(changedVal) * Number(getOneIfEmpty(ibtMap[supplier][index].pi_om)));//for defect 2281
									weight = (Number(changedVal) * Number(ibtMap[supplier][index].order_uom_om));
										}
									else
										{
										tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].om));
										weight = (Number(changedVal) * 1);
										}
								} else {
									if(articleUom == orderUom)
									tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].order_uom_om));
									else
										tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].om));
								}	
								tot_qty = (tot_qty != '0' && tot_qty.toString().indexOf('.') != "-1")?
										Number(tot_qty).toFixed(3):(tot_qty == ''?'0':tot_qty);
								ibtMap[supplier][index].tot_qty = (tot_qty);
								ibtMap[supplier][index].weight = (weight);
								$(elem)
										.find('.tot_qty')
										.text(
												tot_qty
														+ ' '
														+ (getEmptyIfNull(ibtMap[supplier][index].random_wgt_flg) == 'Y' ? (ibtMap[supplier][index].pi_uom||'EA') : ibtMap[supplier][index].base_uom));
								$(elem)
								.find('.weight-input').val(weight);
							}
						}
						else
							{
							index = $(elem).attr('data_index');
							var tot_qty = '';
							var weight = '';
							if (ibtMap != '' && ibtMap != undefined
									&& ibtMap != null
									&& ibtMap[supplier] != undefined) {
									var changedVal = org_qty;
									ibtMap[supplier][index].qty = org_qty;
								if(getEmptyIfNull(ibtMap[supplier][index].random_wgt_flg) == 'Y'){
									if(articleUom == orderUom)
										{
									tot_qty = (Number(changedVal) * Number(getOneIfEmpty(ibtMap[supplier][index].pi_om))); //for defect 2281
									weight = (Number(changedVal) * Number(ibtMap[supplier][index].order_uom_om));
										}
									else
										{
										tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].om));
										weight = (Number(changedVal) * 1);
										}
								} else {
									if(articleUom == orderUom)
									tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].order_uom_om));
									else
										tot_qty = (Number(changedVal) * Number(ibtMap[supplier][index].om));
								}	
								ibtMap[supplier][index].tot_qty = (tot_qty);
								ibtMap[supplier][index].weight = (weight);
								$(elem)
										.find('.tot_qty')
										.text(
												tot_qty
														+ ' '
														+ (getEmptyIfNull(ibtMap[supplier][index].random_wgt_flg) == 'Y' ? (ibtMap[supplier][index].pi_uom||'EA') : ibtMap[supplier][index].base_uom));
								$(elem)
								.find('.weight-input').val(weight);
							}
							}
						var list = ibtMap[supplier];
						var tot_ord_qty=0;
						for(var i=0;i<list.length;i++)
							{
							tot_ord_qty+= Number(isNaN(list[i].qty) ? 0 : list[i].qty);
							}
						var carton_elem = $draftParent.parent().find(
								'.table-action-row[data_supplier_no="' + supplier
										+ '"] .tot-carton').find('total_carton');
						tot_ord_qty = Number(tot_ord_qty)%1 > 0 ? Number(tot_ord_qty).toFixed(3) : parseInt(tot_ord_qty);
						$(carton_elem).text(tot_ord_qty);
					});
	$('.uom-drop').unbind('change');
	$('.uom-drop').change(
			function() {
				var index = '';
				var elem = $(this).closest('tr');
				var org_uom = $(elem).attr('data_article_uom');
				var uom = $(this).val().trim();
				if (uom != org_uom) {
					$(elem).addClass('changed');
					var supplier = $(elem).attr('data_supplier_no');
					index = $(elem).attr('data_index');
					// var changedVal = $(this).val().trim();
					if (ibtMap != '' && ibtMap != undefined && ibtMap != null
							&& ibtMap[supplier] != undefined) {
						// ibtMap[supplier][index].new_uom = changedVal;
					}
				}
			});
	bindClose();
}

function frameIBTArticleList(articleList, option, flag) {

	var articleContent = '';
	var tot_carton = 0;
	var qty = $draftParent.find('#qty').val();
	var article = '';
	var article_uom = '';
	var supplier = $draftParent.attr('data_supplier_no');
	var hdr = '';
	var carton_elem = '';
	var newList = [];
	var index = 0;
	var editedFlag = false;
	var lastIndex_elem = '';
//	formatArticleList(articleList, supplier);
	if (ibtMap[supplier] != null
			&& ibtMap[supplier] != undefined
			&& ibtMap[supplier].length > 0
			&& $draftParent != undefined
			&& $draftParent.parent().find(
					'.table-sort-hdr[data_supplier_no="' + supplier + '"]').length == 0) {
		hdr = getTableSortHdr(supplier);
		$draftParent.parent()
				.find(
						'.expand-collapse-add-hdr[data_supplier_no="'
								+ supplier + '"]').after(hdr);
	}

	if (option == 'NEW') {
		$draftParent.parent().find(
				'.article-content-row[data_supplier_no="' + supplier + '"]')
				.remove();
		$draftParent.parent().find(
				'.article-stock-row[data_supplier_no="' + supplier + '"]')
				.remove();
		$(carton_elem).text('0');
	} /*
		 * else { $draftParent.parent().find(
		 * '.article-content-row[data_supplier_no="' + supplier + '"]')
		 * .remove(); $draftParent.parent().find(
		 * '.article-stock-row[data_supplier_no="' + supplier + '"]') .remove(); }
		 */

	carton_elem = $draftParent.parent().find(
			'.table-action-row[data_supplier_no="' + supplier
					+ '"] .tot-carton').find('total_carton');
	lastIndex_elem = $draftParent.parent().find('.table-action-row[data_supplier_no="' + supplier + '"]').
			prevUntil('.table-action-row[data_supplier_no="' + supplier + '"]', 
			'.article-content-row[data_supplier_no="' + supplier + '"]:first');
	if(lastIndex_elem.attr('data_index') != undefined){
		index = Number(lastIndex_elem.attr('data_index')) + 1;
	}	
	var alertMsg = '';

	var tempList = articleList;

	for ( var i = 0; i < tempList.length; i++) {

		// DRAFT ADDITION FROM ARTICLE SEARCH WE NEED QTY OF INPUT FIELD
		if (option == 'INSERT') {
			tempList[i].qty = qty;
			if ($draftParent.parent().find(
					'.article-content-row[data_supplier_no="' + supplier
							+ '"][data_article_row="' + tempList[i].article
							+ '"][data_article_uom="' + tempList[i].article_uom
							+ '"]').length > 0
/*					&& article != tempList[i].article
					&& $draftParent.parent().find(
					'.article-content-row[data_supplier_no="' + supplier
							+ '"]').attr('data_article_uom') == tempList[i].article_uom*/) {
				var val = $(carton_elem).text();
				var org_qty = $draftParent.parent().find(
						'.article-content-row[data_supplier_no="' + supplier
								+ '"][data_article_row="' + tempList[i].article
								+ '"]').find('.qty-input').attr('data_org_qty');
				org_qty = Number(org_qty) != 'NaN' ? Number(org_qty) : 0;
				val = Number(val) != 'NaN' ? Number(val) : 0;
				var tempQty = val - org_qty;
				tempQty = Number(tempQty)%1 > 0 ? Number(tempQty).toFixed(3) : parseInt(tempQty);
				$(carton_elem).text(tempQty);
				$draftParent.parent().find(
						'.article-content-row[data_supplier_no="' + supplier
								+ '"][data_article_row="' + tempList[i].article
								+ '"][data_article_uom="' + tempList[i].article_uom
								+ '"]').find('.qty-input').val(qty);
/*				$draftParent.parent().find(
						'.article-stock-row[data_supplier_no="' + supplier
								+ '"][data_article_row="' + tempList[i].article
								+ '"][data_article_uom="' + tempList[i].article_uom
								+ '"]').remove();
				ibtMap[supplier] = removeObjFromArticleList(ibtMap[supplier], tempList[i]);*/
				editedFlag = true;
			}

			if (tempList[i].department != undefined
					&& tempList[i].department != null
					&& tempList[i].department != '') {
				if (getDeptValidMsg(tempList[i].department))
					;
				if (alertMsg == '') {
					alertMsg += tempList[i].article;
				} else {
					alertMsg += ',' + tempList[i].article;
				}

			}
		}

		// TO CREATE A DROP DOWN FROM THE MULTIPLE DRAFT LIST
		 if (!editedFlag && ((article != tempList[i].article) || 
				 ((article == tempList[i].article) && (article_uom != tempList[i].article_uom)))) {

		articleContent = getArticleTrContent(tempList[i], index);
		$draftParent.parent().find(
				'.table-action-row[data_supplier_no="' + supplier + '"]')
				.before(articleContent);
		$draftParent.parent().find('.article-stock-row[data_supplier_no="' + supplier
				+ '"][data_article_row="' + tempList[i].article
				+ '"][data_article_uom="' + tempList[i].article_uom
				+ '"]').data('articleObj', tempList[i]);
		bindArticleRow($('[data_supplier_no="'+supplier+'"].article-content-row'));
		// TO FIND THE TOTAL CARTONS NEAR SAVE BUTTON
		if (!isNaN(tempList[i].qty)) {
			tot_carton += Number(tempList[i].qty);
		}
		article = tempList[i].article;
		article_uom = tempList[i].article_uom;
		newList.push(tempList[i]);
		index++;
		if (flag == undefined) {
			tempList.uomlist = [];
			// tempList[i].uomlist.push(tempList[i].article_uom);
			// newList[newList.length-1].uomlist.push(tempList[i].article_uom);

			newList[newList.length - 1].uomlist = [];
			newList[newList.length - 1].uomlist.push(tempList[i].article_uom);
		}

		 }
		/*
		 * else { var lastTr = $draftParent.parent() .find(
		 * '.article-content-row[data_article_row="' + article + '"] ');
		 * $(lastTr).find('.multiple-uom').removeClass('hideBlock').find(
		 * 'select').append( '<option value="' + tempList[i].article_uom + '">' +
		 * tempList[i].article_uom + '</option>');
		 * 
		 * $(lastTr).find('.single-uom').addClass('hideBlock'); //
		 * tempList[i].uomlist.push(tempList[i].article_uom);
		 * newList[newList.length - 1].uomlist.push(tempList[i].article_uom); }
		 */$(
				'[data_article_row="'
						+ tempList[i].article
						+ '"] .uom-drop option[value="'
						+ $(
								'[data_article_row="' + tempList[i].article
										+ '"] .uom-drop').attr('value') + '"]')
				.prop('selected', true);
		 editedFlag = false;
	}
	if (option == 'INSERT') {
		tot_carton = tot_carton + Number($(carton_elem).text());
	} else {
		ibtMap[supplier] = newList;
	}
	tot_carton = Number(tot_carton)%1 > 0 ? Number(tot_carton).toFixed(3) : parseInt(tot_carton);
	$(carton_elem).text(tot_carton);

	bindSortHdr($draftParent);
	if (alertMsg != '') {
		warnUser('Only an authorised meat transport vehicle is permitted to transfer the article '
				+ alertMsg);
	}
}
function bindArticleRow($draftParent) {
	//$('.article-content-row').unbind('change');
	$draftParent.find('.weight,.weight-input').attr('maxlength','13').isWithin999Or3Decimal();
	$draftParent.find('.qty-input').not('.weight').within999();
}
function formatArticleList(articleList, supplier) {

	var formattedList = [];
	var supplier = articleList[0].supplier;
	for ( var i = 0; i < articleList.length; i++) {

		if (articleList[i].supplier != null && articleList[i].article != null
				&& articleList[i].supplier != undefined
				&& articleList[i].article != undefined
				&& articleList[i].supplier != ''
				&& articleList[i].article != '') {
			// articleContent+=getArticleTrContent(articleList[i]);
			formattedList.push(articleList[i]);
		}
	}
	
	// formattedList.reverse();
	ibtMap[supplier] = formattedList;
}

function removeObjFromArticleList(articleList, obj){
	var i = articleList.length;
	while(i--){
	       if( articleList[i] 
	           && articleList[i].hasOwnProperty('article')
	           && articleList[i].hasOwnProperty('article_uom')
	           && (articleList[i]['article'] == obj.article)
	           && (articleList[i]['article_uom'] == obj.article_uom)){ 

	    	   articleList.splice(i,1);

	       }
	    }
	return articleList;
}
function loadDraftList(){

	var obj = new ArticleParam(loggedInUserId, draft_type);
	console.log('loadIBTDraftList ' + JSON.stringify(obj));
	$.ajax({
		data : JSON.stringify(obj),
		// data : data,
		url : getIBTDraftHdrList,
		type : 'post',

		beforeSend : function() {
			// console.log("---4");
			startLoading();
		},
		success : function(response) {
			var res = response;
			if (res != null && res != undefined && res != '' && res.length > 0
					&& response[0].ErrorID == undefined) {
				ibtMap = groupByForIBT(res, 'supplier');
				supplierMap = groupByForIBT(res, 'supplier');
				$('#tableCreateAction').next().find('tbody').html('');
				createIBTAccordContent(ibtMap);
				$('.hdr-qty').within999();
				$('.searchbox').each(function(){
				createAutoSuggest($(this), $(this).closest('tr').find('.search-and-add'));
				});
			} else {
				// showError('Technical issue occured while creating the
				// draft');
			}
			stopLoading();
		},
		error : function(err) {
			console.log(err);
			stopLoading();
			showErrorContent('','Network issue occured while fetching the draft');
			//showError('Network issue occured while fetching the draft');
		}
	});

}
// TO GET THE IBT HEADER LIST
function loadIBTDraftList() {
	var obj = new ArticleParam(loggedInUserId, draft_type);
	console.log('loadIBTDraftList ' + JSON.stringify(obj));
	$.ajax({
		data : JSON.stringify(obj),
		// data : data,
		url : getIBTDraftHdrList,
		type : 'post',

		beforeSend : function() {
			// console.log("---4");
			startLoading();
		},
		success : function(response) {
			var res = response;
			if (res != null && res != undefined && res != '' && res.length > 0
					&& response[0].ErrorID == undefined) {
				ibtMap = groupByForIBT(res, 'supplier');
				supplierMap = groupByForIBT(res, 'supplier');
				$('#tableCreateAction').next().find('tbody').html('');
				createIBTAccordContent(ibtMap);
				$('.hdr-qty').within999();
				$('.searchbox').each(function(){
				createAutoSuggest($(this)/*, $(this).closest('tr').find('.search-and-add')*/);
				});
			} else {
				// showError('Technical issue occured while creating the
				// draft');
			}
			stopLoading();
		},
		error : function(err) {
			console.log(err);
			stopLoading();
			showErrorContent('','Network issue occured while fetching the draft');
			//showError('Network issue occured while fetching the draft');
		}
	});
}

// CREATE THE IBT HEADER LIST
function createIBTHdrDraftList(param, option) {
	console.log('createIBTHdrDraftList ' + JSON.stringify(param));
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
			hideErrorContent();
			if (option == 'INSERT') {
				var tempList = [];
				var tempMap = {};
				param.ItemArray[0].alh_flag=$('#alhFlag').val();
				param.ItemArray[0].supplier_flag= $('#warehouse').val() == param.iv_supplier ? 'W' : 'S';
				tempList.push(param.ItemArray[0]);
				tempMap[param.iv_supplier] = tempList;
				ibtMap[param.iv_supplier] = tempList;
				
				createIBTAccordContent(tempMap);
				$('.searchbox').each(function(){
					createAutoSuggest($(this)/*, $(this).closest('tr').find('.search-and-add')*/);
				});
				resetIBTForm();
				$("#isVerified").val('');
			} else if (option == 'DELETE') {
				console.log('delete');
				$('.expand-collapse[data_key="' + supplier + '"]').remove();
				$(
						'.expand-collapse-add-hdr[data_supplier_no="'
								+ supplier + '"]').remove();
			}
			stopLoading();
		},
		error : function(err) {
			console.log(err);
			stopLoading();
			showErrorContent('','Network issue occured while creating the draft');
			//showError('Network issue occured while creating the draft');
		}
	});
}

// CREATE THE IBT ACCORDIAN CONTENT
function createIBTAccordContent(ibtMap) {
	var table_hdr = '';
	var list = [];
	var sub_hdr = '';
	
	for (key in ibtMap) {
		list = ibtMap[key];
		if (list != null && list != undefined && list.length > 0) {
			sub_hdr += getAccordContent(list[0]);
		}
	}
	table_hdr += sub_hdr;
	$('#tableCreateAction').next().find('tbody').prepend(table_hdr);
	bindIBTAccordContents();
	
}

// BIND THE TAB EVENT, SEARCH ADD BUTTON, EXPAND COLLAPSE OF ACCORDIAN
function bindIBTAccordContents() {
	var i = 0;
	$(".textbox").each(function() {
		$(this).attr('tabindex', i++);
	});

	$('.search-and-add').unbind('click');
	$('.search-and-add').click(function() {
		console.log();
		$draftParent = $(this).closest('.expand-collapse-add-hdr');
		// .addClass('hideBlock');
		searchArticle($draftParent);
	});
	
	$('.ibtArticleAdd').unbind('click');
	$('.ibtArticleAdd').click(function() {
		console.log();
		var $tableElem = $(this).parent().parent().siblings('#tableAddIBTAction');
		if ($tableElem.hasClass('hideBlock')) {
			$tableElem.removeClass('hideBlock');
		} else {
			$tableElem.addClass('hideBlock');
		}
		hideErrorInSearch($draftParent);
	});
	
	$('.artCloseLink').unbind('click');
	$('.artCloseLink').click(function() {
		//console.log();
		hideError();
		hideErrorContent();
		$(this).closest('div[id=tableAddIBTAction]').addClass('hideBlock');
		hideErrorInSearch($draftParent);
	});
	
	
	$('.expand-collapse').unbind('click');
	$('.expand-collapse')
			.click(
					function() {
						if ($(this).hasClass('collapsed')) {
							$draftParent = $(this).next();
							$(this).removeClass('collapsed').addClass(
									'expanded');
							$(this).next().removeClass('hideBlock');
							var supplier = $draftParent
									.attr('data_supplier_no');
							$draftParent.parent().find(
									'.table-sort-hdr[data_supplier_no="'
											+ supplier + '"]').removeClass(
									'hideBlock');
							$draftParent.parent().find(
									'.table-action-row[data_supplier_no="'
											+ supplier + '"]').removeClass(
									'hideBlock');
							$draftParent.parent().find(
									'.article-content-row[data_supplier_no="'
											+ supplier + '"]').removeClass(
									'hideBlock');

							if (!$(this).hasClass('added')) {
								$(this).addClass('added');
								var param = new IBTArticleParam(loggedInUserId,
										'', loggedInSiteNo, draft_type);
								param.iv_site = supplier;
								loadAccordArticleContent(param);
							}
							//generateTbIndex();
						} else {
							$(this).removeClass('expanded').addClass(
									'collapsed');
							$(this).next().addClass('hideBlock');
							$draftParent = $(this).next();
							var supplier = $(this).attr('data_key');

							$draftParent.parent().find(
									'.table-sort-hdr[data_supplier_no="'
											+ supplier + '"]').addClass(
									'hideBlock');
							$draftParent.parent().find(
									'.table-sort-hdr[data_supplier_no="'
											+ supplier + '"]').find('a')
									.addClass('expandAll').removeClass(
											'collapseAll');

							$draftParent.parent().find(
									'.table-action-row[data_supplier_no="'
											+ supplier + '"]').addClass(
									'hideBlock');
							$draftParent.parent().find(
									'.article-content-row[data_supplier_no="'
											+ supplier + '"]').addClass(
									'collapsed').removeClass('expanded');
							$draftParent.parent().find(
									'.article-content-row[data_supplier_no="'
											+ supplier + '"]').addClass(
									'hideBlock').addClass('hideBlock');
							$draftParent.parent().find(
									'.article-stock-row[data_supplier_no="'
											+ supplier + '"]').addClass(
									'hideBlock');

						}

					});
}

// GET THE ACCORD HTML
function getAccordContent(obj) {

	obj.supplier = (obj.supplier != null && obj.supplier != undefined) ? obj.supplier
			: "";
	obj.supplier_name = (obj.supplier_name != null && obj.supplier_name != undefined) ? obj.supplier_name
			: "";
	obj.alh_flag = (obj.alh_flag != null && obj.alh_flag != undefined) ? obj.alh_flag
			: "";
	obj.supplier_flag = (obj.supplier_flag != null && obj.supplier_flag != undefined) ? obj.supplier_flag
			: "";
	var accordHdr = '<tr class="collapsed groupByExpand2 expand-collapse" data_key="'
			+ obj.supplier
			+ '"><td width="25px" colspan="1" class="expander rowSection fontWeightFix rowHighlight">'
			+ '<span class="indenter"><a title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>'
			// + '<a title="Collapse All" class="collapseAll"
			// id="collapseAll">&nbsp;</a>'
			+ '</span></td><td colspan="14" class="rowSection alhFlag fontWeightFix rowHighlight" alh_flag="'+obj.alh_flag+'" data_bind="'
			+ obj.supplier +
			'"'+' supplier_flag="'+obj.supplier_flag+'"'
			+' >Site: ' + obj.supplier;
	if (obj.supplier_name != null && obj.supplier_name != undefined
			&& obj.supplier_name != '')
		accordHdr += '-';
	accordHdr += obj.supplier_name + ' </td></tr>';
	
	var addArticleHdr = '<tr class="groupByTr2 hideBlock  expand-collapse-add-hdr" data_supplier_no="'
			+ obj.supplier
			+ '"'+' supplier_flag="'+obj.supplier_flag+'"  alh_flag = "'+obj.alh_flag+'"'
			+'><td colspan="15" class="add-article-row"><div class="tableActionsBtnsWrapper">'
			+ '<div class="lookupActionWrapper"><label class="linkBtn ibtArticleAdd" id="addIBTArticle"><label class="addRow">Add Article</label></label>'
			+ '<div class="errorDiv hideBlock"><label>Error text...</label><label class="closeMessage">&nbsp;</label></div></div></div>'
			+ '<div class="tableActionsWrapper" id="tableAddIBTAction"><div class="formWrapper"><div class="parameter">'
			+ '<label class="" for="searchBox">Article</label>'
			+ '<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="searchBox">'
			+ '</div><div class="parameter"><label class="" for="qty">Transfer Qty.</label><input type="#" maxlength="3" tabindex="2" id="qty" class="textbox hdr-qty  numberBox"></div>'
			+ '<div class="formActions"><label class="actionBtn search-and-add" data_key="'
			+ obj.supplier
			+ '" id="searchAndAdd"><a >Search &amp; Add</a></label>'
			+ '<label class="secondaryActionBtn artCloseLink" id="artCloseLink"><a >Close</a></label></div></div></div>'
			+ '</td></tr>';
	return accordHdr + addArticleHdr;

}

// VALIDATE THE CREATE IBT SCREEN ON CLICK OF CREATE BUTTON
function validateStockTransfer(itemParam) {
	var flag = true;
	var site = getSiteNo();
	var siteNo = site.split('-')[0];
	var siteName = site.split('-')[1];
	var comments = $('#comments').val().trim();
	var pickupTime = $('#timeFrom').val().trim();
	var pickupDate = $('#dateFrom').val().trim();
	var contactNo = $('#contactNo').val().trim();
	var contactName = $('#contactName').val().trim();
	//var warehouse = $('#wh').is(':checked');
	if (siteNo == '') {
		showErrorContent('Create','Please select a Target Site');
		//showError('Please select a Target Site');
		flag = false;
		showToolTipAndfocus($('#multiplePOS input'),'Please select a Target Site');
		
	} else if ($("#isVerified").val() != 'true' && $('#multiplePOS input').val().trim()!='') {
		showErrorContent('Create','Please verify the site before creating draft');
		//showError('Please verify the site before creating draft');
		flag = false;
		showToolTipAndfocus($('#multiplePOS input'),'Please verify the site before creating draft');
	} else if (ibtMap != null && ibtMap != '' && ibtMap != undefined
			&& ibtMap.hasOwnProperty(siteNo)) {
		flag = false;
		showErrorContent('Create','Stock Transfer already exists for the Target Site');
		showToolTipAndfocus($('#multiplePOS input'),'Stock Transfer already exists for the Target Site');
	} else if ((siteNo == loggedInSiteNo)) {
		flag = false;
		showErrorContent('Create','Target Site cannot be same as logged in site');
		showToolTipAndfocus($('#multiplePOS input'),'Target Site cannot be same as logged in site');
	} /*else if (warehouse && !isValidDate($('#dateFrom').val())) {
		flag = false;
		console.log('dateFrom');
		$('#dateFrom').focus();
		showErrorContent('','Please enter a valid Pickup Date');
		//showError('Please enter a valid Pickup Date');
	} else if (warehouse && isPastDate($('#dateFrom').val())) {
		console.log('dateFrompas');
		showErrorContent('Create','Pickup Date cannot be past');
		//showError('Pickup Date cannot be past');
		$('#dateFrom').focus();
		flag = false;
	} else if (warehouse && !isValidTime($('#timeFrom'))) {
		flag = false;
		showErrorContent('Create','Please enter a valid Pickup Time');
		//showError('Please enter a valid Pickup Time');
		$('#timeFrom').focus();
	} else if (comments == '' && warehouse) {
		flag = false;
		console.log('comments');
		showErrorContent('Create','"Warehouse Authority details" including Contact Name and Return Authorisation number');
		//showError('"Warehouse Authority details" including Contact Name and Return Authorisation number');
		$('#comments').focus();
	}*/ else {

		itemParam.iv_action = 'D';
		itemParam.iv_user = loggedInUserId;
		itemParam.iv_supplier = siteNo;
		itemParam.iv_order_type = 'OADV';
		itemParam.iv_contact_name = contactName;
		itemParam.iv_contact_no = contactNo;
		itemParam.iv_pickup_date = formatDateMobi(pickupDate);
		itemParam.iv_pickup_time = pickupTime;
		itemParam.iv_comments = comments;

		// USED TO CUT THE EXTRA SERVICE CALL TO LOAD THE MAP INFO
		itemParam.user = loggedInUserId;
		itemParam.supplier = siteNo;
		itemParam.supplier_name = siteName;
		itemParam.order_type = 'OADV';
		itemParam.contact_name = contactName;
		itemParam.contact_no = contactNo;
		itemParam.pickup_date = formatDateMobi(pickupDate);
		itemParam.pickup_time = pickupTime;
		itemParam.comments = comments;

		flag = true;
	}
	return flag;
}

// TO GET THE SITE NO FROM THE INPUT FIELD
function getSiteNo() {
	var site = '';
	if ($('#multiplePOS input').val().trim() != '') {
		site = $('#multiplePOS input').val().trim();
	} else if ($('.store-list-selected li').length > 0) {
		site = $('.store-list-selected li label:first').text().trim();
	} else if ($('#warehouse').val() != 0 && $('#warehouse').val() != 'Select'
			&& $('option[value="' + $('#warehouse').val() + '"]') != undefined) {
		site = $('option[value="' + $('#warehouse').val() + '"]').text().trim();
	} else {
		site = '';
	}
	return site;
}

// RESET THE INPUT FIELDS AFTER CREATE
function resetIBTForm() {
	$('#comments').val('');
	$('#timeFrom').val('00:00');
	$('#dateFrom').val(today);
	$('#contactNo').val('');
	$('#contactName').val('');
	$('#multiplePOS input').val('');
	$('#nearby,#wh').prop('checked', false);
	$('#warehouse').val('0');$('#mywhlist').addClass('hideBlock');
	$('.store-list-selected').html('');
}

// SEARCH ARTICLE ON CLICKING SEARCH AND ADD BUTTON
function searchArticle($draftParent) {
	var articleinput = $draftParent.find('.searchbox');
	// var supplier = $draftParent.attr('data_supplier_no');
	console.log($draftParent);
	var msg = 'Please enter keyword to lookup';
	var articleSearchParam;
	var iv_ibt_desc = "";
	var supplier = $draftParent.attr('data_supplier_no');

	// new
	// ArticleSearchParam($(articleinput).val().trim());
	if ($(articleinput).val().trim() == '') {
		$(articleinput).error(msg);
		showErrorContent('Site '+supplier+' - Search & Add',msg);
		//showErrorInSearch($draftParent, msg);
	}/*
		 * else if ($('[data_supplier_no="' + supplier + '"][data_article_row="' +
		 * $(articleinput).val().trim() + '"]').length > 0) {
		 * showErrorInSearch($draftParent, 'Article ' +
		 * $(articleinput).val().trim() + ' already exist in the list'); }
		 */else {
		articleSearchParam = new ArticleSearchParam(articleinput.val().trim()
				.split('-')[0]);
		articleSearchParam.iv_auto_stockr_flag="";
		articleSearchParam.iv_ranged="";
		articleSearchParam.iv_deleted_flag="Y";
		if(isDesiredRole(roleMap,roleId))
			{
			articleSearchParam.iv_delisted_flag="Y";
			}
		else
			{
			articleSearchParam.iv_delisted_flag="N";
			} 
		//if(isNaN(articleNo)){
			//articleSearchParam.iv_ibt_desc = "Y";
		//}else {
			articleSearchParam.iv_ibt_desc = "";
		//		}
		
		// $currentDraftContent = $draftParent;
                var articleNo = articleSearchParam.iv_article;
                var supplierFlag = (supplierMap[supplier] != undefined && supplierMap[supplier] !=null) ? 'W' : 'S';
                var alh_flag = "";
                if(isNaN(articleNo)){
                        var param = {
                        		"iv_article"	: articleNo,
                        		"iv_site"		: articleSearchParam.iv_site,
                        		"iv_sales_org"	: articleSearchParam.iv_sales_org,
                        		"iv_supplier"	: articleSearchParam.iv_supplier,
                        		"iv_src_supply"	: articleSearchParam.iv_src_supply,
                        		"iv_ranged"		: "Y",
                        		"iv_session_id"	: "",
                        		"iv_barcode"	: "",
                        		"iv_node_level"	: "",
                        		"iv_node_id"	:  "",
                        		"iv_desc"		:"",
                        		"iv_article_no"	: "Y",
                        		"iv_gtin"		: "N",
                        		"iv_barcode_flag":"",
                        		"iv_auto_stockr_flag":"",
                        		"iv_style": "",
                        		"iv_colour": "",
                        		"iv_article_size": ""
                            
						};
						url = articleHeaderBasicUrl;
						console.log(url+'  '+JSON.stringify(param));
					$.ajax({
					      data: JSON.stringify(param),
					      url: url,
					      type: 'post',
					      beforeSend: function() {
					    	  startLoading();
					      }
					}).done(function(response) {
						isDescChkFirst = true;
							var articleList = response;
                                                if (response != undefined && response != null){
							if (articleList.length >= 1
									&& articleList[0].article_no != null
									&& articleList[0].article_no != undefined) {

								$('#searchText').text(articleNo);
								$('#searchArticleCount').text(articleList.length);
								$('#articleSearchTbody').html(
										showArticleResultDesc(articleList, flag,'',alh_flag));
								$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
								$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text(
								'Select Articles');
								$('#addtolist').parent().parent().removeClass('hideBlock');
								$('#addtolist').text("Add To List");
								if($('#articleSearchTbody tr').length > 1)
								{
									$("#dialog-mulipleArticles").dialog("open");
									bindStoreContent('', supplierFlag);
								}					
							} 
                                                        else
							{
								showErrorContent('Site '+supplier+' - Search & Add',
								'Sorry , no results found for the search criteria. Please try again.');
							}  
                                                }       else
							{
								showErrorContent('Site '+supplier+' - Search & Add',
								'Sorry , no results found for the search criteria. Please try again.');
							}  
					stopLoading();
                                                
					});
                        }else {
                        	isDescChkFirst = false ;
		callServiceForArticle(articleSearchParam,articleinput.val().trim().split('-')[0]);
                }
	}

}
// CALL ARTICLE SEARCH SERVICE TO GET ARTICLE INFO
function callServiceForArticle(articleSearchParam,articleNo) {
	startLoading();
	var supplier = $draftParent.attr('data_supplier_no');
	var supplierFlag = $draftParent.attr('supplier_flag');
	var alh_flag = $draftParent.attr('alh_flag');
	console.log(supplierFlag+' '+alh_flag);
	var source = '';
	if(supplierFlag == 'W') 
		source = 2;
	if(articleSearchParam != undefined ){
	articleSearchParam.iv_src_supply= source;
	}
	var flag = false;
	if (warehouseMap[supplier] != undefined) {
		articleSearchParam.iv_uom_flag = 'N';
		supplierFlag = 'W';
		flag = true;
	}else{
		articleSearchParam.iv_uom_flag = 'Y';
	}
	var str = JSON.stringify(articleSearchParam);
	console.log(getArticleDetailsForIbtUrl + ' ' + str);
	$
			.post(getArticleDetailsForIbtUrl, str)
			.done(
					function(response) {
						hideErrorContent();
						var articleList = response;
						/*if (articleList.length == 1
								&& articleList[0].article != null
								&& articleList[0].article != undefined) {
							if (!flag) {
								articleList[0].article_uom = (articleList[0].order_uom != null
										&& articleList[0].order_uom != '' && articleList[0].order_uom != undefined) ? articleList[0].order_uom
										: '';
							}
							currentArticleObj = articleList[0];
							triggerDraftCreate(articleList);
							hideErrorInSearch($draftParent);
						} else*/ if (articleList.length >= 1
								&& articleList[0].article != null
								&& articleList[0].article != undefined) {
										//Defect_12197
							if(articleList.length == 1 && (articleList[0].supplier||'').trim()=='' && supplierFlag == 'W'){
		    					$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);
		    				}else if((source == '2' && articleList[0].supplier == supplier) || source != '2'){								
							var dataObj=[];
							dataObj.articleList=articleList;
							dataObj.articleNo=articleNo;
							dataObj.supplierFlag=supplierFlag;
							dataObj.alh_flag=alh_flag;
							dataObj.flag=flag;
							dataObj.supplier= supplier;
							if(articleList[0].ps_article_status !=  undefined && articleList[0].ps_article_status != "" && articleList[0].ps_article_status == "08"){								
								$.fn.warnPopup('warn', articleNo +" - "+articleList[0].article_desc+" is a product recalled line. Are you sure to add articles?",'Stock Transfer',triggerAddArticleST,triggerAddArticleSTNo,
										'',dataObj);
								}else if(articleList[0].display_article_flag != undefined && articleList[0].display_article_flag != "" && articleList[0].display_article_flag == "Y"){								
									if(articleList[0].perpetual_flag == "Y"){	
										var data  = {cache : dataObj, msg: ''};
										triggerAddArticleST({data : data});
										}else	
											showErrorContent('Stock Transfer',articleNo +" - "+articleList[0].article_desc+" - Add article function not allowed for Display/Prepack article types.");
									
								}else{	
									var data  = {cache : dataObj, msg: ''};
									triggerAddArticleST({data : data});
								}				
							}else {
								showErrorContent('Site '+supplier+' - Search & Add',
							'Only '+supplier+' warehouse-supplied articles can be transferred to a warehouse.');
							bindClose();
							}
						}else if(source == '2'){
							showErrorContent('Site '+supplier+' - Search & Add',
									'Only warehouse-supplied articles can be transferred to a warehouse.');
							bindClose();
						}else{
							showErrorContent('Site '+supplier+' - Search & Add',
									'Sorry , no results found for the search criteria. Please try again.');
/*							showErrorInSearch($draftParent,
									'Sorry , no results found for the search criteria. Please try again.');*/
							bindClose();
						}
						stopLoading();
					});
}
var triggerAddArticleSTNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};

var triggerAddArticleST = function(e){
	var $elem = e.data.msg;
	var dataObj = e.data.cache;
	$('#searchText').text(dataObj.articleNo);
	$('#searchArticleCount').text(dataObj.articleList.length);
	$('#articleSearchTbody').html(
			showArticleResult(dataObj.articleList, dataObj.flag,dataObj.supplierFlag,dataObj.alh_flag));
	$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
	$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text(
	'Select Articles');
	$('#addtolist').parent().parent().removeClass('hideBlock');
	$('#addtolist').text("Add To List");
	if($('#articleSearchTbody tr').length > 1)
		{
	$("#dialog-mulipleArticles").dialog("open");
	bindStoreContent('', dataObj.supplierFlag);
		}
	else
		{
		showErrorContent('Site '+dataObj.supplier+' - Search & Add',
		'Sorry , no results found for the search criteria. Please try again.');
		}
	//showArticleResult(articleList, flag);
	if($elem != "") $elem.dialog('close');
}
// SUBMITTING ARTICLE TO THE DRAFT LIST
function triggerDraftSubmit(list) {
	var tempParam = {};
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	// var qty = $draftParent.find('#qty').val().trim();
	for ( var i = 0; i < list.length; i++) {
		tempParam = new IBTItemParam();
		tempParam.iv_article = list[i].article;
		tempParam.iv_article_uom = list[i].new_uom;
		tempParam.iv_user = loggedInUserId;
		tempParam.iv_action = 'S';
		tempParam.iv_qty = '';
		tempParam.iv_supplier = supplier;
		tempParam.iv_draft_type = draft_type;
		tempParam.iv_new_uom = list[i].article_uom;
		tempParam.order_type = 'IBT';
		tempParam.iv_platform = 'B';
		tepmParam.iv_expiry_date1= "";
	    tepmParam.iv_expiry_date2= "";
	    tepmParam.iv_expiry_date3= ""; 
	    tepmParam.iv_expiry_date4= ""; 
	    tepmParam.iv_expiry_date5= "";
		tempList.push(tempParam);
	}
	if (validateArticle(tempList)) {
		param = new IBTParam(tempList, supplier);
		param.tempArticleList = list;
		createIBTDraftArticleList(param, 'SUBMIT', '');
	}
}

// ADDING ARTICLE TO THE DRAFT LIST
function triggerDraftCreate(list) {
	var tempParam = {};
	var tempList = [];
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	var qty = $draftParent.find('#qty').val().trim();
	var tot_qty = '';
	var deletedLineFlag = false;
	var deletedLineMsg = [];
	var deletedLineMsgMap = {};
	
	for ( var i = 0; i < list.length; i++) {
		var articleUom = list[i].article_uom;
		var orderUom = list[i].order_uom;
		if(articleUom == orderUom)
			{
			list[i].om = (list[i].order_uom_om != null && list[i].order_uom_om != '' && list[i].order_uom_om != undefined) ? list[i].order_uom_om
				: '0';
			}
		else
		list[i].om = (list[i].om != null && list[i].om != '' && list[i].om != undefined) ? list[i].om
				: '0';
		list[i].random_wgt_flg = (list[i].random_wgt_flg != null
				&& list[i].random_wgt_flg != undefined && list[i].random_wgt_flg
				.trim() != '') ? list[i].random_wgt_flg : '';
		tot_qty = Number(list[i].om) * (qty);
		tempParam = new IBTItemParam();
		tempParam.iv_site = supplier;
		tempParam.iv_delivery_date = formatDateMobi(today);
		tempParam.iv_roster_date = formatDateMobi(today);
		tempParam.iv_article = list[i].article;
		tempParam.iv_article_uom = list[i].article_uom;
		tempParam.iv_user = loggedInUserId;
		tempParam.iv_action = 'D';
		tempParam.iv_qty = qty;
		tempParam.iv_supplier = loggedInSiteNo;
		tempParam.iv_draft_type = draft_type;
		tempParam.iv_new_uom = list[i].article_uom;
		tempParam.iv_om = list[i].om;
		tempParam.iv_tot_qty = tot_qty;
		tempParam.iv_random_wgt_flg = list[i].random_wgt_flg;
		tempParam.order_type = 'IBT';
		tempParam.iv_platform = 'B';
		tempParam.iv_cost_price='';
		tempParam.iv_greenlife_flag=list[i].greenlife_flag;
		if(list[i].alc_status != undefined && list[i].alc_status != null && list[i].alc_status == 'DA'){
			deletedLineFlag = true;
			deletedLineMsgMap[list[i].article] = [];
			deletedLineMsgMap[list[i].article].push('<strong>' + list[i].article_desc + '</strong> is deleted.');
		}
		tempList.push(tempParam);
	}
	if(deletedLineFlag){
		var deletedLineMsg = [];
		for(m in deletedLineMsgMap){
			deletedLineMsg = deletedLineMsg.concat(deletedLineMsgMap[m]);
		}
		if(!isDesiredRole(roleMap,roleId))
		{
			deletedLineMsg.push(' Your role is not permitted to transfer deleted lines.');	  
			showDeletedArticlePopup(deletedLineMsg);
		}
		else
			{
			var dataObj=[];
			dataObj.tempList=tempList;
			dataObj.supplier=supplier;
			dataObj.list=list;
			deletedLineMsg.push(' Continue transfer?');
			$.fn.warnPopup('warn',deletedLineMsg,'Stock Transfer',triggerAddDeletedYes,triggerAddDeletedNo,'',dataObj);
			}
	}else {
		if (validateArticle(tempList)) {
			param = new IBTParam(tempList, loggedInSiteNo);
			param.iv_site = supplier;
			param.tempArticleList = list;
			createIBTDraftArticleList(param, 'INSERT', '');
		}
	}	
}
var triggerAddDeletedYes = function(e){
	var $elem = e.data.msg;
	var dataObj = e.data.cache;
	var tempList = dataObj.tempList;
	var supplier = dataObj.supplier;
	var list= dataObj.list;
	if (validateArticle(tempList)) {
		var param = new IBTParam(tempList, loggedInSiteNo);
		param.iv_site = supplier;
		param.tempArticleList = list;
		createIBTDraftArticleList(param, 'INSERT', '');
	}
	$elem.dialog('close');
};

var triggerAddDeletedNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};

function showDeletedArticlePopup(msg){
	
	$.fn.warnPopup('alert',msg,'Stock Transfer','','',triggerOk,'');
	
}
var triggerOk = function(e){
	e.data.dialog.dialog('close');	
};

// REMOVING ARTICLE TO THE DRAFT LIST
function triggerDraftDelete(elem) {
	var tempParam = {};
	var tempList = [];
	var article = $(elem).closest('tr').attr('data_article_row');
	var article_uom = $(elem).closest('tr').attr('data_article_uom');
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	tempParam = new IBTItemParam();
	tempParam.iv_site = supplier;
	tempParam.iv_article = article;
	tempParam.iv_article_uom = article_uom;
	tempParam.iv_user = loggedInUserId;
	tempParam.iv_action = 'X';
	tempParam.iv_supplier = loggedInSiteNo;
	tempParam.iv_draft_type = draft_type;
	tempParam.iv_delivery_date = formatDateMobi(today);
	tempParam.iv_roster_date = formatDateMobi(today);
	itemParam.iv_platform = 'B';
	tempList.push(tempParam);
	if (validateArticle(tempList)) {
		param = new IBTParam(tempList, loggedInSiteNo);
		createIBTDraftArticleList(param, 'DELETE', elem);
	}
}

// UPDATE ARTICLE TO THE DRAFT LIST
function triggerDraftUpdate(elem) {
	var list = $draftParent.parent().find('.article-content-row');
	var tempParam = {};
	var tempList = [];
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	var qty = '';
	var org_qty = '';
	var weight = '';
	var org_weight = '';
	// var org_uom = '';
	// var changed_uom = '';
	var changedList = [];
	for ( var i = 0; i < list.length; i++) {
		qty = Number($(list[i]).find('.qty-input').val());
		org_qty = Number($(list[i]).find('.qty-input').attr('data_org_qty'));
		weight = Number($(list[i]).find('.weight-input').val());
		org_weight = Number($(list[i]).find('.weight-input').attr(
				'data_org_weight'));
		// org_uom = $(list[i]).find('.multiple-uom').attr('data_org_uom');
		// changed_uom = $(list[i]).find('.uom-drop').val();

		if (qty != org_qty || weight != org_weight /* || changed_uom != org_uom */) {
			tempParam = new IBTItemParam();
			tempParam.iv_site = supplier;
			tempParam.iv_article = $(list[i]).attr('data_article_row');
			tempParam.iv_article_uom = $(list[i]).attr('data_article_uom');
			// tempParam.iv_article_uom = '';
			tempParam.iv_user = loggedInUserId;
			tempParam.iv_action = 'U';
			tempParam.iv_qty = $(list[i]).find('.qty-input').val();
			tempParam.iv_weight = $(list[i]).find('.weight-input').val();
			tempParam.iv_supplier = loggedInSiteNo;
			// tempParam.iv_new_uom = $(list[i]).find('.uom-drop').val();
			tempParam.iv_draft_type = draft_type;
			tempParam.iv_platform = 'B';
			tempParam.iv_delivery_date = formatDateMobi(today);
			tempParam.iv_roster_date = formatDateMobi(today);
			tempParam.iv_new_uom = $(list[i]).attr('data_article_uom');
			tempList.push(tempParam);
			changedList.push($(list[i])[0]);
		}

	}
	if (tempList != null && tempList != undefined && tempList.length > 0) {
		if (validateArticle(tempList)) {
			param = new IBTParam(tempList, supplier);
			createIBTDraftArticleList(param, 'UPDATE', changedList);
		}
	}
}

function createIBTDraftArticleList(param, option, elem) {
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
					if (option == 'INSERT') {
						//loadDraftList();
						moveListToMap(param);
						frameIBTArticleList(param.tempArticleList, 'INSERT');
						$draftParent.find('.searchbox').val('');
						$draftParent.find('#qty').val('');
						$draftParent.prev().removeClass('added').trigger('click');
						$draftParent.prev().trigger('click');
					} else if (option == 'DELETE') {
						var article = $(elem).closest('tr').attr(
								'data_article_row');
						var article_uom = $(elem).closest('tr').attr(
								'data_article_uom');
						var supplier = $(elem).closest('tr').attr(
								'data_supplier_no');
						var tbody = $(elem).closest('tbody');
						var index = $(elem).closest('tr').attr('data_index');
						$(elem).closest('tbody').find(
								'tr[data_article_row="' + article
										+ '"][data_supplier_no="' + supplier
										+ '"][data_article_uom="' + article_uom
										+ '"]').remove();
						if ($(tbody).find(
								'.article-content-row[data_supplier_no="'
										+ supplier + '"]').length == 0) {
							$(tbody).find(
									'.table-sort-hdr[data_supplier_no="'
											+ supplier + '"]').remove();
							$(tbody).find(
									'.table-action-row[data_supplier_no="'
											+ supplier + '"]').remove();
							
							$(tbody).find(
									'.article-stock-row[data_supplier_no="'
											+ supplier + '"]').remove();
							
							//createIBTHdrDraftList(param, 'DELETE') ;
						}
						var list = ibtMap[supplier];
						list.splice(index, 1);
						ibtMap[supplier] = list;
						reIndexArticleRows(supplier);
						//to change the total transfer Qty.
							var list = ibtMap[supplier]; 
							var tot_ord_qty=0;
							for(var i=0;i<list.length;i++)
								{
								tot_ord_qty+= Number(isNaN(list[i].qty) ? 0 : list[i].qty);
								}
							var carton_elem = $draftParent.parent().find(
									'.table-action-row[data_supplier_no="' + supplier
											+ '"] .tot-carton').find('total_carton');
							tot_ord_qty = Number(tot_ord_qty)%1 > 0 ? Number(tot_ord_qty).toFixed(3) : parseInt(tot_ord_qty);
							$(carton_elem).text(tot_ord_qty);
					} else if (option == 'UPDATE') {
						var supplier = $draftParent.attr('data_supplier_no');
						var list = elem;
						var carton_elem = $draftParent.parent().find(
								'.table-action-row[data_supplier_no="'
										+ supplier + '"] .tot-carton').find(
								'total_carton');
						var total_cart = Number($(carton_elem).text()) != 'NaN' ? Number($(
								carton_elem).text())
								: 0;
						var index = 0;
						for ( var i = 0; i < list.length; i++) {
							total_cart += Number($(list[i]).find('.qty-input')
									.val()) != 'NaN' ? Number($(list[i]).find(
									'.qty-input').val()) : 0;
							total_cart -= Number($(list[i]).find('.qty-input')
									.attr('data_org_qty')) != 'NaN' ? Number($(
									list[i]).find('.qty-input').attr(
									'data_org_qty')) : 0;
							$(list[i]).find('.qty-input').attr('data_org_qty',
									$(list[i]).find('.qty-input').val());
							$(list[i]).find('.weight-input').attr(
									'data_org_weight',
									$(list[i]).find('.weight-input').val());
							/*
							 * $(list[i]).find('.multiple-uom').attr(
							 * 'data_org_uom',
							 * $(list[i]).find('.uom-drop').val());
							 */

							index = $(list[i]).attr('data_index');
							ibtMap[supplier][index].qty = $(list[i]).find(
									'.qty-input').val();
							ibtMap[supplier][index].weight = $(list[i]).find(
									'.weight-input').val();
							/*
							 * ibtMap[supplier][index].new_uom =
							 * $(list[i]).find( '.uom-drop').val();
							 */

						}
						//$(carton_elem).text(total_cart);
						$.fn.showCustomMsg(['Draft Saved Successfully'],success,'Stock Transfer');
						//warnUser('Draft Saved Successfully');

					} else if (option == 'SUBMIT') {
						var supplier = $draftParent.attr('data_supplier_no');

						itemParam = new IBTItemParam();
						itemParam.iv_action = 'X';
						itemParam.iv_user = loggedInUserId;
						itemParam.iv_supplier = supplier;
						itemParam.iv_delivery_date = formatDateMobi(today);
						itemParam.iv_roster_date = formatDateMobi(today);
						itemParam.iv_order_type = 'IBT';
						itemParam.iv_platform = 'B';
						delete ibtMap[supplier];

						$(
								'.table-sort-hdr[data_supplier_no="' + supplier
										+ '"]').remove();
						$(
								'.article-content-row[data_supplier_no="'
										+ supplier + '"]').remove();
						$(
								'.table-action-row[data_supplier_no="'
										+ supplier + '"]').remove();
						$(
								'.article-stock-row[data_supplier_no="'
										+ supplier + '"]').remove();

						var tempList = [];
						tempList.push(itemParam);
						param = new IBTParam(tempList, itemParam.iv_supplier);
						// createIBTHdrDraftList(param, 'DELETE');
					}
					// }
					stopLoading();
				},
				error : function(err) {
					console.log(err);
					stopLoading();
					showErrorContent('','Network issue occured while fetching the draft');
					//showError('Network issue occured while fetching the draft');
				}
			});
}

function reIndexArticleRows(supplier){
	var index = 0;
	$draftParent.parent().find(
			'.article-content-row[data_supplier_no="' + supplier + '"]').each(function(){
				$(this).attr('data_index', index);
				index++;
			});
}

function loadAccordArticleContent(param) {
	var scrollPos;
	console.log("loadAccordArticleContent++++" + getOrdersDraftListIBT + ' ' + JSON.stringify(param));
	$.ajax({
		data : JSON.stringify(param),
		url : getOrdersDraftListIBT,
		type : 'post',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			var supplier = $draftParent.attr('data_supplier_no');
			if (supplier != '' && supplier != undefined && supplier != null
					&& ibtMap != null && ibtMap != '' && ibtMap != undefined
					&& ibtMap.hasOwnProperty(supplier)) {

				ibtMap[supplier] = response;
				if (response != null && response != undefined
						&& response.length > 0) {
					frameIBTArticleList(response, 'NEW');
					tempSort();
				}
				else
					{
					//$('.hdr-qty').within999();					
					}
			}
			stopLoading();
			event.preventDefault();
			scrollPos = $draftParent.parent().find('.expand-collapse[data_key="' + supplier + '"]').offset();
			if(scrollPos != undefined && scrollPos.top != undefined){
				$('html, body').animate({
					scrollTop : scrollPos.top
				}, 'fast');
			}	
		},
		error : function(error) {
			console.log(error);
			stopLoading();
		}
	});
}
function tempSort() {
	$('.table-sort-hdr th').not($('.table-sort-hdr th.noSort')).click(
			function() {
				var flag = true;
				var supplier = $(this).closest('tr').attr('data_supplier_no');
				$draftParent = $(this).closest('tbody').find(
						'.expand-collapse-add-hdr[data_supplier_no="'
								+ supplier + '"]');
				if ($(this).hasClass('sorted')) {
					if ($(this).hasClass('ascending')) {
						flag = false;
					}
				}
				$(this).closest('tr').find('th').removeClass('sorted')
						.removeClass('ascending').removeClass('descending');
				var prop = $(this).attr('data_prop');
				var thead = $(this);
				if (prop != '' && prop != undefined) {
					triggerSort(prop, thead, flag);
				}
			});
}
function triggerSort(prop, thead, flag) {
	var supplier = $draftParent.attr('data_supplier_no');
	var list = ibtMap[supplier];
	sortBasedOnHdr(list, prop, thead, flag);
	frameIBTArticleList(list, 'NEW', flag);
}
function sortBasedOnHdr(list, prop, thead, flag) {

	if (!flag) {
		$(thead).addClass('sorted').removeClass('ascending').addClass(
				'descending');
		// flag=false;
	} else {
		$(thead).addClass('sorted').addClass('ascending').removeClass(
				'descending');
		// flag=true;
	}
	$.fn.sortArrOfObjectsByParam(list, prop, flag);

}

// SUBMIT DRAFT
function submitDraft(elem) {
	var list = $draftParent.parent().find('.article-content-row');
	var tempParam = {};
	var tempList = [];
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	// var qty = '';
	// var org_qty = '';
	// var weight = '';
	// var org_weight = '';
	var changedList = [];
	for ( var i = 0; i < list.length; i++) {
		qty = Number($(list[i]).find('.qty-input').val());
		org_qty = Number($(list[i]).find('.qty-input').attr('data_org_qty'));
		weight = Number($(list[i]).find('.weight-input').val());
		org_weight = Number($(list[i]).find('.weight-input').attr(
				'data_org_weight'));

		// if (qty != org_qty || weight != org_weight) {
		tempParam = new IBTItemParam();
		tempParam.iv_article = $(list[i]).attr('data_article_row');
		tempParam.iv_article_uom = $(list[i]).attr('data_article_uom');
		tempParam.iv_user = loggedInUserId;
		tempParam.iv_action = 'S';
		tempParam.iv_qty = $(list[i]).find('.qty-input').val();
		tempParam.iv_weight = $(list[i]).find('.weight-input').val();
		tempParam.iv_supplier = supplier;
		tempParam.iv_draft_type = draft_type;
		tempParam.iv_delivery_date = formatDateMobi(today);
		tempParam.iv_roster_date = formatDateMobi(today);
		tempParam.iv_platform = 'B';
		tempList.push(tempParam);
		changedList.push($(list[i])[0]);
		// }

	}
	if (tempList != null && tempList != undefined && tempList.length > 0) {
		if (validateArticle(tempList)) {
			param = new IBTParam(tempList, supplier);
			createIBTDraftArticleList(param, 'UPDATE', changedList);
		}
	}
}

// SUBMIT DRAFT TO SAP
function submitDraftToSAP(elem) {
	submittedSupplier = elem.attr('data_supplier_no'); 
		//$draftParent.find('.search-and-add').attr('data_key');
	var list = ibtMap[submittedSupplier];
	var flag = true;
	dangerousGoodsFlagChk=false;
	for(var i in list){
	if(list[i].dangerous_goods_flag=="Y"){
	dangerousGoodsFlagChk=true;
	}

	}

	if(dangerousGoodsFlagChk && ($('#salesOrg').val() == '1060'))
	{
	$.fn.warnPopup('warn',leaveScreenMsg,'Dangerous Article Warning',triggerLeaveDangerArticlePopUpScreenYes,triggerLeaveDangerArticlePopUpScreenNo,'',$(this));
	}
else{
if(validateArticleBeforeSubmit(submittedSupplier)) {		
		validateArticleForSOH(submittedSupplier);
	}
}
}
var triggerLeaveDangerArticlePopUpScreenYes = function(e)
{
var $elem = e.data.msg;
$elem.dialog('close');
//$("#dialog-complete").dialog("open");
if(validateArticleBeforeSubmit(submittedSupplier)) {		
		validateArticleForSOH(submittedSupplier);
	}
};

var triggerLeaveDangerArticlePopUpScreenNo = function(e)
{
	var $elem = e.data.msg;
$elem.dialog('close');
};

function validateArticleForSOH(submittedSupplier){
	var flag = true;
	var list = ibtMap[submittedSupplier];
	var articleMap = {};
	var tempList = [];
	for(var i=0; i < list.length; i++){
		if(articleMap[list[i].article]!=undefined){
			tempList = articleMap[list[i].article];
			tempList.push(list[i]);
		}else{
			tempList = [];
			tempList.push(list[i]);
		}
		articleMap[list[i].article] = tempList;
		if(list[i].site == undefined)
			list[i].site=submittedSupplier;
		if(Number(getEmptyIfNull(list[i].tot_qty)) > Number(getEmptyIfNull(list[i].soh))){
			flag = false;
			break;
		}else if(tempList.length >1){
			var tempSoh = tempList[0].soh;
			var tempQty = 0;
			for(var j=0;j<tempList.length;j++){
				tempQty+=tempList[j].tot_qty;
			}
			console.log('tempQty = '+tempQty+'  tempSoh='+tempSoh);
			if((getEmptyIfNull(tempQty)) > Number(getEmptyIfNull(tempSoh))){
				flag = false;
				break;
			}
		}
		
	}
	//checkDisplayULD();
	if(!flag){
		var msg = 'Entered quantity is greater than the article\'s stock on hand <SOH quantity>.';
		showQuantityCheckPopup(msg, list);
	} else{
			validateTempBeforeSubmit(list);
		
	}
}

function showQuantityCheckPopup(msg, list){
	try {
		$("#dialog-stockTempConfirm").dialog("open");
		$("#dialog-stockTempConfirm").find('#message').text(msg);
		$("#dialog-stockTempConfirm").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-stockTempConfirm").find('#okBtnTemp, #cancelBtnTemp').addClass('hideBlock');
		$("#dialog-stockTempConfirm").find('#acceptQty, #changeQty').removeClass('hideBlock');
		$("#dialog-stockTempConfirm").find('#acceptQty').unbind(
				'click');
		$("#dialog-stockTempConfirm").find('#acceptQty').click(
				function() {
					validateTempBeforeSubmit(list);
					$("#dialog-stockTempConfirm").dialog("close");	
				});
		$("#dialog-stockTempConfirm").find('#changeQty').unbind(
				'click');
		$("#dialog-stockTempConfirm").find('#changeQty').click(
				function() {
					$("#dialog-stockTempConfirm").dialog("close");
				});
	} catch (err) {
		showQuantityCheckPopup(msg, list);
	}
}	


//Added as part of ordering (Sprint #5)
function validateTempBeforeSubmit(itemList){
	var tmpObj= {ch: false,
		 	 hd: false,								 
			 ch_temperature_range_min: 0,
			 ch_temperature_range_max: 0,
			 hd_temperature_range_min: 0,
			 hd_temperature_range_max: 0
	};
	
	if(temperatureDisableFlgIBT){
		showContactPopupBeforeSubmit(tmpObj, itemList);
	}else{
		var articleStr = '';
		var list = [];
		for(var i=0; i<(itemList.length - 1); i++){
			articleStr += itemList[i].article + ",";
		}

		articleStr += itemList[itemList.length - 1].article;

		var tempParam = {
				"iv_article_no": articleStr
		};

		console.log(temperatureValidateUrl + ' ' + JSON.stringify(tempParam));
		$.post(temperatureValidateUrl, JSON.stringify(tempParam)).done(function(response) {
			console.log(JSON.stringify(response));

			if(response != undefined && response != null && response.length > 0 && response[0].article_no != undefined){
				list = response;

				for ( var i = 0; i < list.length; i++) {
					if(list[i].temperature_range_code=='CH'){
						tmpObj.ch=true;
						tmpObj.ch_temperature_range_min = list[i].temperature_range_min;
						tmpObj.ch_temperature_range_max = list[i].temperature_range_max;
					}else{
						tmpObj.hd=true;
						tmpObj.hd_temperature_range_min = list[i].temperature_range_min;
						tmpObj.hd_temperature_range_max = list[i].temperature_range_max;
					}
				}

				console.log('temperature object' + tmpObj);
			}
			showContactPopupBeforeSubmit(tmpObj, itemList);
		});	
	}
}

function showContactPopupBeforeSubmit(tmpObj, itemList){
	try {
		var $popArea = $("#dialog-stockContactTemp");		
		clearAllErrors();
		
		if(!temperatureDisableFlgIBT){

			var msg = [];
			var list = ibtMap[itemList[0].site];
			var obj = list[0];
			obj.supplier = (obj.supplier != null && obj.supplier != undefined) ? obj.supplier
					: "";
			obj.supplier_name = (obj.supplier_name != null && obj.supplier_name != undefined) ? obj.supplier_name
					: "";

			if(tmpObj.hd){
				msg.push('Check hard frozen products must be hard frozen before it leaves at your store. This order must be delivered within 30min otherwise <strong>'+obj.supplier
						+' - '+obj.supplier_name+'</strong> will reject delivery.');
			}
			if(tmpObj.ch){
				msg.push('Chilled or frozen article(s) must be delivered within 30min otherwise <strong>'+obj.supplier
						+' - '+obj.supplier_name+'</strong> must reject the delivery.');
			}
			if(checkMeatDepartments(itemList)){
				msg.push('Only an authorised meat transport vehicle is permitted to transfer article(s).');
			}
			if( msg.length > 0){
				$.fn.showCustomMsg(msg,information,'Stock Transfer');
			}
		}
		
		$('.ui-menu-item').removeClass('ui-state-highlight');
		$('li[id="tab-' + 1 + '"]').addClass('ui-state-highlight');
		$('div[id="step-' + 2+ '"]').hide();
		$('div[id="step-' + 1 + '"]').show();
		toggleButtonsDisplay(1);			
		applyULDChanges();		
		initializeSubmitPopup(tmpObj, $popArea);
		bindIbtPopupEvents(tmpObj, $popArea, itemList);
		$popArea.dialog("open");
	} catch (err) {
		//showContactPopupBeforeSubmit(tmpObj, itemList);
		console.log(err);
	}
}
function applyULDChanges(){
	if(!(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')){
		$('#step-2').addClass('hideBlock');
		$('#tab-2').addClass('hideBlock');
		$('#ibtFinishBtn').removeClass('hideBlock');
		$('#ibtNextBtn').addClass('hideBlock');
	}else{
		$('#step-2').removeClass('hideBlock');
		$('#tab-2').removeClass('hideBlock');
		$('#ibtFinishBtn').addClass('hideBlock');
		$('#ibtNextBtn').removeClass('hideBlock');
	}
}

function checkDisplayULD(){
	try {	
	var configParam = {
			"iv_user_id":$('#loginUserId').val(),
			"iv_order_type" : 'IBTI',
			"iv_config_code":"ULD,TMP",
			"iv_session_id":sessionId,
			"iv_sales_org":$('#salesOrg').val()				
	};
	console.log(getReceiveConfigUrl + ' ' + JSON.stringify(configParam));
	  $.post(
				getReceiveConfigUrl,
				JSON.stringify(configParam))
		.done(
				function(
						response) {
					console.log(response);
					if(response != undefined && response != null 
							&& response.length > 0 && response[0].msg != undefined){
						for(var i=0; i<response.length; i++){
							recvConfigMap[response[i].config_code] = (response[i].config_val != undefined && response[i].config_val != null) ? response[i].config_val
									: 'N';
						}
					}else{
						console.log('Empty Response from getReceiveConfigUrl Service. Hiding ULD detail as default');
						recvConfigMap['ULD'] = 'N';
						recvConfigMap['TMP'] = 'N';
					}
				
				}).fail(function() {
						console.log('getReceiveConfigUrl Service Failure. Hiding ULD detail as default');
						recvConfigMap['ULD'] = 'N';
						recvConfigMap['TMP'] = 'N';
				 }).always(function() {
					 	temperatureDisableFlgIBT = recvConfigMap['TMP'] == 'Y' ? true: false;			
						loadIBTDraftList();			// after config response loadIBTDraftList call 
				});;
	}catch(err){	
		recvConfigMap['ULD'] = 'N';
		recvConfigMap['TMP'] = 'N';
		temperatureDisableFlgIBT = recvConfigMap['TMP'] == 'Y' ? true: false;			
		loadIBTDraftList();			
		console.log(err);
	}
}

var triggerExitYes = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
	var $popArea = $("#dialog-stockContactTemp");
	$popArea.dialog("close");
};

var triggerExitNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};

function checkMeatDepartments(list){
	var flag = false;
	var dept = '';
	
	for(var i=0; i<list.length; i++){
		if(getEmptyIfNull(list[i].dept_dtls) != ''){
			dept = list[i].dept_dtls.split(',')[0];
		} else if(getEmptyIfNull(list[i].dept_no_name) != ''){
			dept = list[i].dept_no_name.split(',')[0];
		}
		if (dept == '30' || dept == '25' || dept == '55') {
			flag = true;
		}
	}	
	
	return flag;
}

function initializeSubmitPopup(tmpObj, $popArea){
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	/*var tempWarning = '<label>Stock transfer contains refrigerated articles.' 
		+ 'Ensure proper food safety handling procedures are followed otherwise '
		+ supplier+ ' will reject the delivery.</label>';*/
	if(supplier in warehouseMap){
		$popArea.find('#nameLabel, #authNoLabel').addClass('mandatoryNew');
	}else{
		$popArea.find('#nameLabel, #authNoLabel').removeClass('mandatoryNew');
	}
	
	if(tmpObj.ch==true){
		$popArea.find('#temperature1').parent().removeClass('hideBlock');
	}else{
		$popArea.find('#temperature1').parent().addClass('hideBlock');
	}
	
	if(tmpObj.hd==true){
		$popArea.find('#temperature2').parent().removeClass('hideBlock');
	}else{
		$popArea.find('#temperature2').parent().addClass('hideBlock');
	}
	
	if((temperatureDisableFlgIBT) || (!tmpObj.ch && !tmpObj.hd)){
		$popArea.find('#stockTempDiv, #tempNote').addClass("hideBlock");
	} else{
		$popArea.find('#stockTempDiv, #tempNote').removeClass("hideBlock");
		$popArea.find('.warningMessage').text('Stock transfer contains refrigerated articles. Ensure proper food safety handling procedures are followed otherwise #ReceivingStorenName will reject the delivery.');
	}
	
	$popArea.find('#contactName').focus();
	$popArea.find('#warehouseAuthNo, #contactNo, #contactName, #rego').onlyAlphaNumericCharacters();
	$popArea.find('#temperature1, #temperature2').temperatureChk();
	$popArea.find('#dateFrom').val(getCurentDateTxt());
	$popArea.find('#timeFrom').val('00:00');
	$popArea.find('.clearText').val('');
	$popArea.find('#uldSearchArea').find('#req').onlyNumbers();
	$popArea.find('#addULDTable').find('thead').addClass('hideBlock');
	$popArea.find('#addULDTable').find('tbody').html('');
	$popArea.find('#tempWarning').html('');
	$popArea.find('#tempWarning').addClass('hideBlock');
	$popArea.find('#temperature1').unbind('change');
	/*$popArea.find('#temperature1').change(function() {
	        var integerValue = $(this).val();
	        $(this).val(Number(integerValue).toFixed(2));
	    });
	$popArea.find('#temperature2').unbind('change');
	$popArea.find('#temperature2').change(function() {
	        var integerValue = $(this).val();
	        $(this).val(Number(integerValue).toFixed(2));
	    });*/
	
	clearULDSearchArea($popArea.find('#uldSearchArea'));
	bindDateTimeEvents($popArea);
}

function bindDateTimeEvents(area){
	area.find('#dateFrom').on(
			'change',
			function() {
				setTimeout(function() {
					if (!area.find('#dateFrom').isValidDate()) {
						area.find('#dateFrom').error('Pickup Date is invalid');
						cntctValidFlag = false;
					} else if (area.find('#dateFrom').isPast()) {
						area.find('#dateFrom').error(
								'Pickup Date should not be in past');
						cntctValidFlag = false;
					} else {
						cntctValidFlag = true;
					}
				}, 100);
			});
	

		area.find('#timeFrom').on('change', function() {
		setTimeout(function() {
			if (!isValidTime(area.find('#timeFrom'))) {
				area.find('#timeFrom').error('Pickup Time is invalid');
				cntctValidFlag = false;
			} else {
				cntctValidFlag = true;
			}
		}, 100);
	});
}

function validateContactDetails(area, tmpObj){
	var flag = true;
	var content = '';
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	var	chTemp = Number(getEmptyIfNull(area.find('#temperature1').val()));
	var hdTemp = Number(getEmptyIfNull(area.find('#temperature2').val()));
	
	if(supplier in warehouseMap){
		if (area.find('#contactName').is(':visible')
				&& area.find('#contactName').val().trim() == '') {
			area.find('#contactName').error('Contact Name is Mandatory');
			flag = false;
		}
		if (area.find('#warehouseAuthNo').is(':visible')
				&& area.find('#warehouseAuthNo').val().trim() == '') {
			area.find('#warehouseAuthNo').error('Warehouse Authority Number is Mandatory');
			flag = false;
		}
	} 
	
	if(area.find('#temperature1').is(':visible') 
			&& area.find('#temperature1').val() == ''){
		content = '<label>Please enter Chilled Temperature</label>';
		area.find('#temperature1').error('Chilled Temperature is Mandatory');
		flag = false;
	} else if(area.find('#temperature1').is(':visible') 
			&& ((getEmptyIfNull(tmpObj.ch_temperature_range_min) != '' && chTemp < Number(tmpObj.ch_temperature_range_min)) 
			|| (getEmptyIfNull(tmpObj.ch_temperature_range_max) != '' && chTemp > Number(tmpObj.ch_temperature_range_max)))){
			content = '<label>Unable to stock transfer due to incorrect temperature</label>';
			area.find('#temperature1').error('Chilled Temperature is out of range');
			flag = false;
	} else if(area.find('#temperature2').is(':visible')
			&& area.find('#temperature2').val() == ''){
			content = '<label>Please enter Hard Frozen Temperature</label>';
			area.find('#temperature2').error('Hard Frozen Temperature is Mandatory');
			flag = false;
	} else if(area.find('#temperature2').is(':visible')
			&& ((getEmptyIfNull(tmpObj.hd_temperature_range_min) != '' && hdTemp < Number(tmpObj.hd_temperature_range_min)) 
			|| (getEmptyIfNull(tmpObj.hd_temperature_range_max) != '' && hdTemp > Number(tmpObj.hd_temperature_range_max)))){
			content = '<label>Unable to stock transfer due to incorrect temperature</label>';
			area.find('#temperature2').error('Hard Frozen Temperature is out of range');
			flag = false;
	}
	
	if(content != ''){
		area.find('.errorDiv').removeClass('hideBlock');
		area.find('.errorDiv').html(content);
	}
	
	return flag;
}

function callSubmitDraftToSAP(list, uldList, elem){
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	var newList = [];
	var param = '';
	var alhFlag = $draftParent.prev().find('.alhFlag').attr('alh_flag');
	var supplier_flag = $draftParent.prev().find('.alhFlag').attr('supplier_flag');
	newList = getItemInfo(list);
	param = new OrderHdrInfo('', encSapPwd, supplier, '', loggedInUserId,
			newList,'','',alhFlag,supplier_flag);
	param.supplier = supplier;
	param.supplierName = $draftParent.prev().find('.alhFlag').html().split('-')[1];
	
	param = setIbtContactInfo(param);
	param.iv_uld_info = uldList;
	param.iv_delivery_doc_id = '';
	submitIBTToSAP(param, elem);
}

function validateArticleBeforeSubmit(supplier){
	var flag = true;
	var content = [];;
	var warningContent = [];
	$draftParent.parent().find(
			'.article-content-row[data_supplier_no="' + supplier + '"]').each(function() {

			if ($.trim($(this).find('.qty-input').val()) == '') {
				content.push('Article : ' + $(this).attr('data_article_row') +' Transfer Quantity is Mandatory');
			$(this).find('.qty-input').error('Transfer Quantity is Mandatory');
			flag = false;
			} else if(($.trim($(this).find('.qty-input').val()) != '')
					&& Number($(this).find('.qty-input').val()) == 0) {
				content.push('Article : ' + $(this).attr('data_article_row') + ' Transfer Quantity should be greater than zero');
				$(this).find('.qty-input').error('Transfer Quantity should be greater than zero');
				flag = false;
			}else if($(this).find('.weight-input')!=undefined && $(this).find('.weight-input').is(':visible') && ($.trim($(this).find('.weight-input').val()) == '' || ($.trim($(this).find('.weight-input').val()) != '')
					&& Number($(this).find('.weight-input').val()) == 0)) {
				content.push('Article : ' + $(this).attr('data_article_row') + ' Transfer Weight should be greater than zero');
				$(this).find('.weight-input').error('Transfer Weight should be greater than zero');
				flag = false;
			}else if($(this).find('.qty-input').val() > 999){//>999 donet allow
				content.push('Article : ' + $(this).attr('data_article_row') + ' Transfer Quantity cannot be greater than 999.');
				$(this).find('.qty-input').error('Transfer Quantity cannot be greater than 999.');
				flag = false;
			}else if($(this).find('.qty-input').val() <= 150 && $(this).find('.qty-input').val() > 99){//<150 and >99, warn 99
				warningContent.push('Article : ' + $(this).attr('data_article_row') + ' Transfer Quantity is greater than 99.');
				flag = false;
			}else if($(this).find('.qty-input').val() > 150){//>150, warn 150
				warningContent.push('Article : ' + $(this).attr('data_article_row') + ' Transfer Quantity is greater than 150.');
				flag = false;
			}else if($(this).attr('data_article_row') != "" && $(this).find('.prodRecalled').html() != "" &&
					$(this).find('.prodRecalled').html() != undefined &&  $(this).find('.prodRecalled').html() == "08"){
				warningContent.push('Article : ' + $(this).attr('data_article_row') +' - '+$(this).find('.st_article_desc').html()+ ' is a product recalled line.<br>');
				flag = false;
			}
			
			if ($(this).find('.weight-input').is(':visible')
					&& $.trim($(this).find('.weight-input').val()) == '') {
				content.push('Article : ' + $(this).attr('data_article_row')+' Total Weight is Mandatory');
				$(this).find('.weight-input').error('Total Weight is Mandatory');
				flag = false;
			}
	});
	
	if(!flag && (content.length > 0)){
		$.fn.showCustomMsg(content,error,'Stock Transfer');
	}else if(!flag && warningContent.length > 0){
		warningContent.push('<br>Do you wish to continue?');
		$.fn.warnPopup('warn',warningContent,'Stock Transfer',triggerYesSubmit,triggerNoSubmit,'',supplier);
	}	
	
	return flag;			
}
var triggerYesSubmit = function(e){
	var $elem = e.data.msg;
	validateArticleForSOH(submittedSupplier);	
	$elem.dialog('close');
};
var triggerNoSubmit = function(e){
	var $elem = e.data.msg;
	
	$elem.dialog('close');
};

function setIbtContactInfo(param){
   var area = $('#dialog-stockContactTemp');
   param.iv_contact_name = getEmptyIfNull(area.find('#contactName').val());
   param.iv_contact_no	 = getEmptyIfNull(area.find('#contactNo').val());
   param.iv_comments	 = getEmptyIfNull(area.find('#comments').val());
   param.iv_pickup_date	 = getEmptyIfNull(convertDateStringToMMDDYYYY(area.find('#dateFrom').val()));
   param.iv_pickup_time	 = getEmptyIfNull(area.find('#timeFrom').val());
   param.iv_auth_number	 = getEmptyIfNull(area.find('#warehouseAuthNo').val());
   param.iv_auth_date	 = area.find('#dateFrom').val()!= '' && area.find('#dateFrom').val() != null ? formatDateToMDY(area.find('#dateFrom').val()) : '';
   param.iv_courier	 = getEmptyIfNull(area.find('#car').val());
   param.iv_rego_number	 = getEmptyIfNull(area.find('#rego').val());
   param.iv_chilled_temperature	 = getEmptyIfNull(area.find('#temperature1').val());
   param.iv_frozen_temperature	 = getEmptyIfNull(area.find('#temperature2').val());
   
   return param;
}


function validateTransferQuantity(list){
	var flag = true;
	
	for(var i=0; i < list; i++){
		if(Number(getEmptyIfNull(list[i].qty)) > Number(getEmptyIfNull(list[i].soh))){
			flag = false;
			break;
		}
	}
	
	if(!flag){
		var msg = 'Unable to stock transfer due to incorrect temperature';
		$.fn.showCustomMsg([msg],error,'Stock Transfer');
	}
	
	return flag;
}
//Added as part of ordering (Sprint #5)

function getItemInfo(param) {
	var list = [];
	var obj = {};
	// var article = '';
	if (param != null && param != undefined && param.length > 0) {
		for ( var i = 0; i < param.length; i++) {
			if (param[i].article != undefined && param[i].article != null
					&& param[i].article != ''
					&& param[i].article_uom != undefined
					&& param[i].article_uom != ''
					&& param[i].article_uom != null
					&& param[i].qty != undefined && param[i].qty !== ''
					&& param[i].qty != null) {
				param[i].delvery_date = today.split('/')[1] + '/'
						+ today.split('/')[0] + '/' + today.split('/')[2];
				// if (article != param[i].article) {
				obj = new OrderItemInfo('', param[i].article,
						param[i].article_type, param[i].article_uom,
						param[i].delvery_date, ibtOrderType, '','', param[i].qty,
						param[i].roaster_date, loggedInSiteNo,param[i].weight,param[i].pi_uom,param[i].base_uom,param[i].random_wgt_flg,param[i].pi_om,param[i].cost_price,param[i].sub_category_no);
				list.push(obj);
				// }
				// if (article == '') {
				// article = param[i].article;
				// }
			}

		}
	}
	return list;

}
function submitIBTToSAP(param, elem) {
	console.log('url' + createOrderSAP);
	console.log('input' + JSON.stringify(param));
	var supplier = '';
	var list = [];
	var html = [];
	var temp_obj = {};
	var errors = [];
	$
			.ajax({
				data : JSON.stringify(param),
				//data	: param,
				url : createOrderSAP,
				type : 'post',
				//contentType : "application/json",
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					//response = $.parseJSON(response);
					hideError();
					hideErrorContent();
					if (response != null && response != undefined
							&& response.length > 0  && checkResult(response,'typ')) {
						list = response;
						for ( var i = 0; i < list.length; i++) {
							if (list[i].typ == 'S') {
								html.push(removeOrderItem(list[i], temp_obj));								
							} else if (list[i].typ == 'E' && list[i].msg != '') {
								errors.push(showErrorArticleLevel(list[i]));
							} else {
								errors.push('Technical issue occured while creating stock transfer order');
							}
						}						
						if (html.length > 0) {
							//to reload the page so that HDR is removed
							loadIBTDraftList();
							 html= [];
					         html.push('Stock Transfer '+Object.keys(temp_obj).join(',')+' created for the submitted articles');
							$.fn.showCustomMsg(html,success,'Stock Transfer');
							submitParam = param;
							if($('#salesOrg').val() == '1060'){
								$.fn.warnPopup('warn','Do you want to print Pallet Control Docket Copy?','Confirmation',triggerPrintYes,triggerPrintNo,'',elem);
							}	
						}
						//var newErrors=getUniqueList(errors);
						if (errors.length > 0) {
							$.fn.showCustomMsg(errors, error,'Stock Transfer');							
						}
					}else if(response ==  null || response ==  undefined || response.length == 0){
						$.fn.showCustomMsg(['Technical issue occured, Please contact JAVA support.'],error);
				    }else {
				    	checkResult(response,'');
				    }
					 /*else {
							$.fn.showCustomMsg(['Technical issue occured while creating order'],error,'Stock Transfer');
						}*/
					stopLoading();
				},
				error : function(err) {
					console.log(err);
					stopLoading();
					showErrorContent('','Network issue occured while fetching the draft');
					//showError('Network issue occured while fetching the draft');
				}
			});
}

function getArticleNoStr(list) {
	var success = '';
	for ( var i = 0; i < list.length; i++) {
		if (success == '') {
			success += list[i].article_no;
		} else {
			success += ',' + list[i].article_no;
		}
	}
	return success;
}
function showWarn(msg) {
	$('#dialog-modal-alertBox').dialog('open');
	$('#dialog-modal-alertBox #alertBox').text(msg);
	$('#okBtn').addClass('hideBlock');
	$('.yesBtn,.noBtn').removeClass('hideBlock');
}
function warnUser(msg) {
	$('.alert-text').removeClass('hideBlock');
	$('#dialog-modal-alert').dialog('open');
	$('#dialog-modal-alert .alert-text').text(msg);
	$('#ok-btn-alert').removeClass('hideBlock');
	$('#ok-btn-alert').unbind('click');
	$('#ok-btn-alert').click(function() {
		$('#dialog-modal-alert').dialog('close');
		// focusFirstErrorField();
	});
}

function showAlert(msg) {
	$('.alert-text').addClass('hideBlock');
	$('.alert-text').after(msg);
	// $('#dialog-alertBox').parent().find('.ui-dialog-title').text('Order
	// Enquiry');
	$('#dialog-modal-alert').removeClass('hideBlock');
	$('#dialog-modal-alert').parent().addClass("popupWrapper");
	$('#dialog-modal-alert').dialog("open");
	// $('#okBtn').unbind('click');
	$('#ok-btn-alert').click(function(e) {
		$('#dialog-modal-alert').dialog("close");
		$('#dialog-modal-alert .removableMsg').remove();
		$('.alert-text').removeClass('hideBlock');
	});

}
function getDeptValidMsg(dept) {
	if (dept == '30' || dept == '25' || dept == '55') {
		return true;
	} else {
		return false;
	}
}
function showBottomWarning(content) {
	$('#warningWrapper').removeClass('hideBlock');
	$('#warningList').html(content);
}

function clearAllErrors() {
	$('#errorMsgDiv').addClass('hideBlock');
	$('.errorDiv').addClass('hideBlock');
	$('.' + errorFieldClass).each(function() {
		$(this).removeAttr('title');
		$(this).removeClass(errorFieldClass);
	});

}
/*function showErrorArticleLevel(val, area) {
	var response = val.article_list_info;
	var msg = val.msg;
	var html = '';
	//for ( var i = 0; i < response.length; i++) {
//		html += '<li>'+ msg + '</li>';
	//}
	if(response !=undefined && response.length >= 0){
		html =  msg;
	}else if(msg != ''){
		html =  msg;
	}
	return (html);
}*/
function showErrorArticleLevel(val, area) {
	  var response = [];
	  var html = '';
	  var msg = 'Technical issue occurred in stock transfer';
	  response.push(val);
	  for (var i = 0; i < response.length; i++) {
		  if(response[i].msg != null && response[i].msg != undefined)
			 {			  
			  var articleNo = (response[i].article != null && response[i].article != undefined)? response[i].article.trim():null;
			  var articleMSg = response[i].msg.trim();
			  if(articleMSg != '' && articleNo != '' && articleNo != null)
				html += 'Article ' + articleNo + ': ' + articleMSg + '';
			  else if(articleMSg != '')
				  {
				html +=  articleMSg;
				}else{
					  html += msg; 
			}
		 }
	  }
	  return (html);
}

function removeOrderItem(val, temp_obj) {
	  // var response = val.article_list_info;
	  var response = [];
	  var html = '';
	  var supplier = $draftParent.attr('data_supplier_no');
	  var currList = ibtMap[supplier];
		itemParam = new IBTItemParam();
		itemParam.iv_action = 'X';
		itemParam.iv_user = loggedInUserId;
		itemParam.iv_supplier = supplier;
		itemParam.iv_delivery_date = formatDateMobi(today);
		itemParam.iv_roster_date = formatDateMobi(today);
		itemParam.iv_order_type = 'IBT';
		itemParam.iv_platform = 'B';
	  if (val.msg != undefined && val.msg != null) {
		//get the order alone if it the msg format is : Orderid - articleNo
		val.msg = val.msg.split('-')[0].trim();
		response.push(val.msg);
	    response.push(val.article);
	    var html = 'Stock Transfer "' + val.msg + '" Created for Articles ';
	    temp_obj[val.msg]=(val.msg);
	    response.splice(0, 1);
	    var tblArea = $('#viewModeTable3');
	    tblArea.find(
				'.article-content-row[data_supplier_no="' + supplier
						+ '"][data_article_row="' + val.article
						//+ '"][data_article_uom="' + actList[i].article_uom
						+ '"]').remove();
		tblArea.find(
				'.article-stock-row[data_supplier_no="' + supplier
						+ '"][data_article_row="' + val.article
						//+ '"][data_article_uom="' + actList[i].article_uom
						+ '"]').remove();
		if (tblArea.find('.article-content-row[data_supplier_no="' + supplier+ '"]').length == 0 
				&& tblArea.find('.article-stock-row[data_supplier_no="' + supplier+ '"]').length == 0) {
			tblArea.find('.table-sort-hdr[data_supplier_no="' + supplier + '"]').remove();
			tblArea.find('.article-content-row[data_supplier_no="' + supplier + '"]').remove();
			tblArea.find('.table-action-row[data_supplier_no="' + supplier + '"]').remove();
			tblArea.find('.article-stock-row[data_supplier_no="' + supplier + '"]').remove();
			ibtMap[supplier] = [];
		}	
		var tempList = [];
		tempList.push(itemParam);
		param = new IBTParam(tempList, itemParam.iv_supplier);
	  }
	  var articleNo = '';
	  for (var i = 0; i < response.length; i++) {
	    articleNo = response[i];
	    if (i == 0) html += articleNo;
	    else html += ',' + articleNo;
	  }
	  return html + '';
	}
function groupByForIBT(array, predicate) {
	var grouped = {};
	var tempList = [];
	for ( var i = 0; i < array.length; i++) {
		var groupKey = (array[i][predicate]);
		if (groupKey != '' && groupKey != undefined && groupKey != null
				&& grouped[groupKey] != null && grouped[groupKey] != undefined
				&& grouped[groupKey] != '' && grouped[groupKey].length > 0) {
			tempList = grouped[groupKey];
			tempList.push(array[i]);
		} else {
			tempList=[];
			tempList.push(array[i]);
		}
		grouped[groupKey]=tempList;
	}

	return grouped;
};
function bindAccordionClickEvent(obj)
{
			var $tableRow = obj.prevUntil('tr.expand-collapse-add-hdr','tr.table-sort-hdr');
			var expandedTrLength=$tableRow.nextUntil('.table-action-row','.article-content-row.expanded').length;
			var totalTrLength=$tableRow.nextUntil('.table-action-row', '.article-content-row').length;
			var collapsedTrLength=$tableRow.nextUntil('.table-action-row','.article-content-row.collapsed').length;
			if( expandedTrLength == totalTrLength)
			{
				$tableRow.find('.expandAll').removeClass('expandAll').addClass('collapseAll');
			}
			else if(collapsedTrLength == totalTrLength)
				{
				$tableRow.find('a').removeClass('collapseAll').addClass(
				'expandAll');
				}
		
}
function callOnOrderService(articleNo) {
		var hdrParam = {

			"iv_article" : articleNo,
			"iv_order_no" : "",
			"iv_delivery_from" : "",
			"iv_delivery_to" : "",
			"iv_order_type" : "",
			"iv_order_status" : "",
			"iv_node_id" : "",
			"iv_node_lvl" : "",
			"iv_srs_ind" : "",
			"iv_supplier_no" : "",
			"iv_session_id" : "111",
			"iv_site" : $('#posSite').val(),
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_check_alloc" : "",
			"iv_alloc_flag" : "Y",
			"iv_tab_code" : "OPEN_ORDERS"
		};
		var inputDataForHdr = JSON.stringify(hdrParam);
console.log(getTabResults + ' '+inputDataForHdr);
		startLoading();

		$
				.post(getTabResults, inputDataForHdr)
				.done(
						function(response) {

							var orderList = response;
							if (orderList != null && orderList != undefined
									&& orderList.length > 0
									&& orderList[0].order_no != undefined) {
								recordCountInOnOrder = orderList.length;
								var j=1;
								var k = 1;
								var content = '';
								
								var tableStart = '<table cellspacing="0" class=" ContentTable " id="onOrderTable"><thead><tr><th class="">Order #</th><th class="centerValue">Order Qty.</th>'
										+ '<th class="centerValue">Delivery Date</th><th class="">Supplier</th><th class="">Source</th><th class="lastColumn centerValue">Status</th>'
										+ '</tr></thead><tbody >';
								var tableEnd = '</tbody></table>';
								var list = orderList;
								for ( var i = 0; i < list.length; i++) {
									list[i].som_order_no = list[i].som_order_no != null ? list[i].som_order_no
											: "";
									list[i].order_no = list[i].order_no != null ? list[i].order_no
											: "";
									list[i].order_status = list[i].order_status != null ? list[i].order_status
											: "";
									list[i].supplier_name = list[i].supplier_name != null ? list[i].supplier_name
											: "";
									list[i].supplier_no = list[i].supplier_no != null ? list[i].supplier_no
											: "";
									list[i].source = list[i].source != null ? list[i].source
											: "";
									list[i].total_cartons = list[i].total_cartons != null ? list[i].total_cartons
											: "";
									list[i].total_pallets = list[i].total_pallets != null ? list[i].total_pallets
											: "";
									list[i].delv_date = list[i].delv_date != null ? list[i].delv_date
											: "";
									content += '<tr class="page-' + j + ' ';
									if (i > 6)
										{
										content += 'hideBlock';
										
										}
									content +='" ><td>';
									if (list[i].som_order_no == "") {
										content += list[i].order_no.replace(
												/^0+/, '')
												+ '</td>';
									} else if (list[i].som_order_no != list[i].order_no) {
										content += list[i].som_order_no
												+ ' ('
												+ list[i].order_no.replace(
														/^0+/, '') + ')'
												+ '</td>';
									} else {
										content += list[i].order_no.replace(
												/^0+/, '')
												+ '</td>';
									}
									content += '<td class="centerValue"></td><td class="centerValue">'
											+ (list[i].delv_date != '' ? formatDateMobi(list[i].delv_date)
													: '')
											+ '</td>'
											+ '<td class="">';
									if (list[i].supplier_name != '')
										content += list[i].supplier_name;
									if (list[i].supplier_no != '')
										content += '(' + list[i].supplier_no
												+ ')';
									content += '</td>'
											+ '<td class="centerValue">'
											+ list[i].source + '</td>'
											+ '<td class="centerValue">'
											+ list[i].order_status + '</td>';
									content += '</tr>';
									
									if(k % 7 == 0)
									{
									j++;
									}
								k++;
									
								}
								$('#orderPopUpCntnt').html(
										tableStart + content + tableEnd );
								$('.onOrderTitle').removeClass('hideBlock');
								$('#onOrderCount').text(recordCountInOnOrder);
								$('.onOrderPaginationDiv').pagination({
									items : recordCountInOnOrder,
									itemsOnPage : 7,
									cssStyle : 'compact-theme',
									currentPage : currentPageInOnOrder,
									onPageClick : function(pageNumber, event) {
										getOnOrdersForPagination(pageNumber);
									}
								});
								if (recordCountInOnOrder / 7 > 1) {
									$('.onOrderPaginationDiv').removeClass('hideBlock');
								} else {
									$('.onOrderPaginationDiv').addClass('hideBlock');
								}

							} else {
								$('.onOrderPaginationDiv').addClass('hideBlock');
								$('.onOrderTitle').addClass('hideBlock');
								var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderPopUpErrorTable"></tbody></table>';
								$('#orderPopUpCntnt').html(error);
								$('#orderPopUpErrorTable')
										.html(
												'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
							}
							stopLoading();

						});
}
function getOnOrdersForPagination(pageNo)
{
	var pageClass = 'page-' + pageNo;
	$('#onOrderTable  tbody tr').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
		currentPageInOnOrder = pageNo;

}
function showToolTipAndfocus(obj,msg)
{
	obj.focus();
	obj.addClass('errorField');
	addtooltip(obj,msg);
	obj.unbind('change');
	obj.change(function() {
		$(this).removeClass(errorFieldClass);
		removetooltip($(this));
	});
	$(".tooltip").tooltip({
		position : {
			my : "left center",
			at : "right+10 center"
		}
	});	
}

function iterateResult(response) {
	var output = $.parseJSON(response);

	if ((output.data != null && output.data != undefined
			&& output.data[0].msg != undefined && output.data[0].msg.trim() != '')
			|| (output.msg != null && output.msg.length > 0)) {
		var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderfcstPopUpErrorTable"></tbody></table>';
		$('#frcstOrdersPopUpCntnt').html(error);
		$('#orderfcstPopUpErrorTable')
				.html(
						'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
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
		var tableStart = '<table cellspacing="0" class="ContentTable" id=""><thead><tr><th class="centerValue">3/10</th><th class="centerValue">4/10</th>'
				+ '<th class="centerValue">5/10</th><th class="centerValue">6/10</th><th class="centerValue">7/10</th><th class="centerValue">8/10</th>'
				+ '<th class="lastColumn centerValue">9/10</th></tr></thead><tbody>';
		var tableEnd = '</tbody></table>';
		$.each(descList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no hideBlock">'
					+ item.articleNo + '</td>' + '<td class="hideBlock">'
					+ item.articleDesc + '</td>' + '<td class="centerValue">'
					+ item.day1Qty + '</td>' + '<td class="centerValue">'
					+ item.day2Qty + '</td>' + '<td class="centerValue">'
					+ item.day3Qty + '</td>' + '<td class="centerValue">'
					+ item.day4Qty + '</td>' + '<td class="centerValue">'
					+ item.day5Qty + '</td>' + '<td class="centerValue">'
					+ item.day6Qty + '</td>' + '<td class="centerValue">'
					+ item.day7Qty + '</td> </tr>';

		});
		$('#frcstOrdersPopUpCntnt').html(tableStart + content + tableEnd);

	}
	stopLoading();
}
function getForecastOrders(data) {
	if ($('#frcstOrdersPopUpCntnt').html() == '') {
		$.ajax({
			type : "get",
			url : "../article/generateReport.htm",
			data : data,
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				iterateResult(response);
				stopLoading();
				//getIntrasitOrders(data);
			},
			error : function() {
				// goToLogin();
			},
		});
	}

}
function isDesiredRole(obj,key)
{
    return obj.hasOwnProperty(key);
}

function bindIbtPopupEvents(tmpObj, area, itemList){
	area.find('#ibtNextBtn').unbind('click').bind('click', function(e) {
		
		if (validateContactDetails(area, tmpObj) && cntctValidFlag) {
			/*var currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
			var nextId = currentId + 1;*/
			var currentId = 1;
			var nextId = 2;
			
			navigateToStep(currentId, nextId);
			
			populateULDDropdown($('#dialog-stockContactTemp'));
			
			$('#uldAdd').unbind('click');
			$('#uldAdd').click(function() {
				var toAddArea = $('#addULDTable');
				var srArea = $('#uldSearchArea');
				addULDRow(srArea, toAddArea);
			});
		}	
	});
	
	area.find('#ibtBackBtn').unbind('click').bind('click', function(e) {
		var currentId = 2;
		var prevId = 1;
		
		navigateToStep(currentId, prevId);
	});
	
	area.find('.tabAnchor').unbind('click').bind('click', function(e) {
		var currentId = 2;
		var prevId = 1;
		
		navigateToStep(currentId, prevId);
	});
	
	area.find('#ibtFinishBtn').unbind('click');
	area.find('#ibtFinishBtn').click(function() {
		if((recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y') || 
				(!(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y') && validateContactDetails(area, tmpObj) && cntctValidFlag)){		
			var uldList = prepareULDList(area);
			var loggedInUserId = $('#loginUserId').val();	
			if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
					&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
				callSubmitDraftToSAP(itemList, uldList, $(this));
			}else{
				getEncSAPPassword({option:'ibtCreateOrder', itemList:itemList, uldList:uldList, finishButton:$(this)});			
			}
			
			area.dialog("close");
		}
	});
	area.find('#ibtCancelBtn').unbind('click');
	area.find('#ibtCancelBtn').click(function() {
		var msg = 'You are about to exit from the stock transfer screen ?';
		$.fn.warnPopup('warn',msg,'Stock Transfer',triggerExitYes,triggerExitNo,'','');
	});
	
	area.find(".addRow").unbind('click');
	
	area.find("#addULDRow").click(function(){ 
		area.find("#uldSearchArea").removeClass('hideBlock');
	});
	area.find("#closeLink").click(function(){ 
		area.find("#uldSearchArea").addClass('hideBlock');
	});
}

function navigateToStep(currentId, stepId){
	$('.ui-menu-item').removeClass('ui-state-highlight');
	$('li[id="tab-' + stepId + '"]').addClass('ui-state-highlight');
	$('div[id="step-' + currentId+ '"]').toggle(100);
	$('div[id="step-' + stepId + '"]').toggle(100);
	toggleButtonsDisplay(stepId);
}

//This method manages the display of Next, Back & Finish Buttons in each step
function toggleButtonsDisplay(selectedId) {
	$('#dialog-stockContactTemp').find('.actionBtn , .secondaryActionBtn').removeClass('hideBlock');
	(selectedId == 2) ? ($('#ibtNextBtn').addClass('hideBlock'))
			: ($('#ibtBackBtn, #ibtFinishBtn').addClass('hideBlock'));
}

function populateULDDropdown(area){
	var masterParam = {
			"iv_user_id" : $('#loginUserId').val(),
			"iv_pwd" : "",
			"iv_session_id" : "111",
			"iv_site_no" : $('#posSite').val(),
			"iv_sales_org": $('#salesOrg').val()
		};

	console.log(getULDMasterInfoUrl+' '+JSON.stringify(masterParam));
	
	var options = '';
	area.find('#typeSelect').html('');
	
	$.ajax({
	    type: "POST",
	    url: getULDMasterInfoUrl,
	    data: JSON.stringify(masterParam),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(data) {
		  if(checkResult(data,'uld_id','Stock Transfer')){
			  var response = data;
				for ( var i = 0; i < response.length; i++) {
					//Defect_12500
					options += '<option plt_type="'+(response[i].plt_type||'')+'" value="'
							+ $.trim(response[i].uld_id) + '">'
							+ $.trim(response[i].uld_desc) + '</options>';
				}
				area.find('#typeSelect').html(options);
			}
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  stopLoading();
	  });
}


function addULDRow(srArea, toAddArea) {
	if (validateULDSearch(srArea, toAddArea)) {
		if(toAddArea.find('tbody tr').length == 0){
			toAddArea.find('thead').removeClass('hideBlock');
		}
		addToULDTable(srArea, toAddArea);
	}
}

function validateULDSearch(srArea, toAddArea) {
	if (srArea.find('#typeSelect').val().trim() == '') {
		srArea.find('#typeSelect').error('ULD Type is mandatory.');
		return false;
	} else if (srArea.find('#req').val().trim() == '') {
		srArea.find('#req').error('Transferred Quantity is mandatory.');
		return false;
	}
	return true;
}

function addToULDTable(srArea, toAddArea) {
	var tempTr = '';
	var selectedElem = srArea.find('#typeSelect').children(':selected');
	var uldId = selectedElem.val();
	var recQty = srArea.find('#req').val();
	//Defect_12500
	var plt_type = selectedElem.attr('plt_type');	
	if (toAddArea.find('tbody').find('tr[id="row-' + uldId + '"]').length >= 1) {
		if (recQty != undefined && recQty != null && recQty != '') {
			toAddArea.find('tbody').find('tr[id="row-' + uldId + '"]').find(
					'.recQty').val(recQty);
		}
	} else {
//Defect_12500
		tempTr = '<tr plt_type="'+plt_type+'" id="row-' + uldId + '"><td class="ibtUldColumn uldType">' + selectedElem.text()
				+ '</td><td class="centerValue ibtUldColumn"><input type="#" class="textbox xsmallbox recQty" value="'+recQty+'">'
				+ '</td><td class="centerValue ibtUldColumn">'
				+ '<label class="linkBtn" id="deleteULD-1"><label id="delete-'
				+ uldId + '" class="deleteRecord">Delete</label>'
				+ '</label></td></tr>';

		toAddArea.find('tbody').append(tempTr);
		toAddArea.removeClass('hideBlock');
		toAddArea.find('.recQty').onlyNumbers();
		bindDeleteULDEvent(toAddArea, uldId);
	}
	
	clearULDSearchArea(srArea);
	
}

function bindDeleteULDEvent(toAddArea, id) {
	var btnId = 'delete-' + id;
	toAddArea.find('#' + btnId).unbind('click');
	toAddArea.find('#' + btnId).click(function() {
		toAddArea.find('#' + btnId).closest('tr').detach();
	});
}

function prepareULDList(area){
	var uldList = [];
	var uldItem;
	
	area.find('#addULDTable').find('tbody tr').each(function(){
		if($(this).find('td').length > 0){
			uldItem = {
					"iv_uld_id"	: getEmptyIfNull($(this).attr('id').split("-")[1]),
					"iv_uld_recv_qty" :  '0',
					"iv_uld_return_qty" : getEmptyIfNull($(this).find('.recQty').val()),
					"uld_type"	: getEmptyIfNull($(this).find('.uldType').html()),
					//Defect_12500
					"iv_plt_type": getEmptyIfNull($(this).attr('plt_type'))
			};
						
			uldList.push(uldItem);
		}	
	});
	
	return uldList;
}

function clearULDSearchArea(area){
	area.find('#typeSelect').val(area.find('#typeSelect').find('options:first').val());
	area.find('#req').val('');
}

var triggerPrintYes = function(e){
	var $popUp = e.data.msg;
	var elem = e.data.cache;
	
	callULDJasperPrint(submitParam);
	$popUp.dialog('close');
};

var triggerPrintNo = function(e){
	var $elem = e.data.msg;
	clearAllErrors();
	$elem.dialog('close');
};

function callULDJasperPrint(submitParam)
{	
	var obj={			
			reportResult	: submitParam.iv_uld_info,
			pcdId			: getEmptyIfNull(submitParam.iv_pcd_id),
			storeNo 		: submitParam.supplier,
			storeName 		: submitParam.supplierName,
			supplierNo		: $('#posSite').val(),
			supplierName	: $('#posSiteName').val(),
			carrierNo		: getEmptyIfNull(submitParam.iv_courier.split('-')[0]),
			carrierName		: getEmptyIfNull(submitParam.iv_courier.split('-')[1]),
			regoNo			: submitParam.iv_rego_number,
			consignNo		: submitParam.iv_auth_number,
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
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	if(response.data == 'success')
		{
		$('#stockTransferForm').attr("action", "../uldSweep/downloadPCDCopyPdf.pdf");
		$('#stockTransferForm').attr('target','_blank');
		$('#stockTransferForm').attr('method','get');
		$('#stockTransferForm').submit();
		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	}
	});
}

var showSOO = function(article){
	var param = new orderParam(article,'','','','','','','','','',"SOO",'Y');
	$.fn.loadArticleSooPopUp(param);
};
function orderParam(article, orderNo, fromDate,toDate,orderType,orderStatus,nodeId,nodeLvl,srcInd,supplier,tab_code,article_filter){
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
	this.iv_ranged= 'Y';
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