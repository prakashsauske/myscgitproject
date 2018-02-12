var serviceAgreementList = '';
var isRA = false;
var isCSD = false;
var searchResult=[];
var dtlList=[];
var serviceOrderNo = '';
var serviceAgreementFound = false;
var storeName;
var storeStreet;
var storeCity;
var storePostalCode;
var storeContactNumber;
var vendorNo;
var dangerFlag='';
var requestType='';
var repairAgentName='';
var repairAgentNo='';
var disclaimerNotes1='The maximum period for which we are able to hold repaired goods or goods left for quotation is six months.';		//Defect_8362 
var disclaimerNotes2='Please collect your property or advise us in regard to its delivery before this period of time has elapsed.';
var disclaimerNotes3='No responsibility will be taken for the delivery of goods left longer than six months.';
var disclaimerNotes4='Property unclaimed within the period specified will be disposed of in order to free storage space and recover any repair expenses.';
var disclaimerNotes5='At Woolworths we respect customers privacy. Any information you give us will only be used for the purpose of managing the repair process. If you do not provide all the information we might not be able to process your repair. If you wish to access your information please contact General Manager Corporate Services, PO Box 8000, Baulkham Hills,NSW 2153 or phone the privacy Helpline on 1300 134 802.';
var disclaimerNotes6='Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s.';
var imagePathMap = new Object();
var isServiceDesc = true;
var leaveScreenMsg ='STOP! Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to despatch of this product/s. <br><br>Consignment Note Completed? ';
$(function() {
	createAutoSuggest($('#searchBox'));
	getEncSAPPassword();
	var roleId = $('#roleId').val();
	if (roleId == 'RA') {
		isRA = true;
	}
	if (roleId == 'CSD') {
		isCSD = true;
	}
	
	 $('.two-digits').keyup(function(){
   if($(this).val().indexOf('.')!=-1){         
       if($(this).val().split(".")[1].length > 2){                
           if( isNaN( parseFloat( this.value ) ) ) return;
           this.value = parseFloat(this.value).toFixed(2);
       }  
    }            
    return this; //for chaining
 });
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
		minHeight : 100,
		maxHeight : 600,
		width : 380
	});
	$("#dialog-cartonCount").parent().addClass(
			"popupWrapper"); 
	// Code to close
	$(".close").click(function() {
		$(".quickHelpWrapper").addClass('hideBlock');
		$(".pageErrorsWrapper").addClass('hideBlock');
	});

	// code for setting default parameters for popups
	$("#dialog-mulipleArticles").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 515
	});

	// code for setting default parameters for popups
	$("#dialog-mulipleVendors").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 515
	});
	
  imagePathMap["woolworths"] = "/images/woolworths/wowLogo.PNG";
	imagePathMap["bigw"] = "/images/bigw/bigw_logo.png";
	imagePathMap["bws"] = "/images/bws/logo.gif";
	imagePathMap["corporate"] = "/images/corporate/logo.gif";
	imagePathMap["countdown"] = "/images/countdown/logo.gif";
	imagePathMap["danmurphy"] = "/images/danmurphy/logo.gif";
	imagePathMap["petrol"] = "/images/danmurphy/logo.gif";
	imagePathMap["thomasdux"] = "/images/thomasdux/logo.gif";
   
	$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(
			function() {
				$("#dialog-mulipleArticles").dialog("close");
				$("#dialog-mulipleVendors").dialog("close");
			});

	$(".printOk").click(function(){
                
                $("#dialog-created").dialog("close");
                window.location.href="../repair/onPageLoad.htm?serviceOrderNo="+serviceOrderNo;
        });
        

	$(".submitRequest").click(function() {
		hideError();
		if (validate()) {
			if ($('#MM').is(':checked')){
				requestType="REPAIRS";	
			}
			else{
				requestType="SPARES";	
			}
			if ($('#MF').is(':checked')){
			$('#store').val('SPARES');
			}
			if ($('#MF').is(':checked') || $('#store').is(':checked')){
			$('#custName').val('');
			$('#address').val('');
			$('#code').val('');
			$('#contactNum').val('');
			$('#email').val('');
			}	
		/*	if($('#salesOrg').val()==1060)
				{
				if(dangerFlag=="Y")
				{
						$.fn.warnPopup('warn',leaveScreenMsg,'Dangerous Article Warning',triggerLeaveDangerPopUpScreenYes,triggerLeaveDangerPopUpScreenNo,'',$(this));	
				}
				else
				{
					createServiceOrder($('#createOrder').serialize());
				}
				}
			else	*/
			//Defect_12480
			if($('#searchBox').attr('ranged_flag') == 'Y'){
				createServiceOrder($('#createOrder').serialize());
			}else{
				callServiceToRangeItem($('#searchBox').val().split('-')[0]);
			}
		}
	});

	$("#dialog-created").parent().addClass("popupWrapper");
	
	$("#dialog-created .popupActions label").click(function() {
		//$("#dialog-created").dialog("close");   
        //window.location.href="../repair/onPageLoad.htm";
      });
	
$('#backBtn').click(function()
		{
	if($('#fromPage') == 'navBar')
	window.location.href="../login/goingHome.htm";
	else
	window.location.href="../repair/onPageLoad.htm";
		});
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// code for enter key event
	$('body').on('keypress', function(e) {
		var p = e.which;
		if(!$("#dialog-created").dialog( "isOpen" ) && !$("#dialog-mulipleVendors").dialog( "isOpen" ) && !$("#dialog-mulipleArticles").dialog( "isOpen" )){
		if (p == 13 && $('#searchBox').is(":focus")) {
			searchArticle($('#createOrder').serialize());
		}
		}
	});

	$('#addtolist').click(function(event) {
		var articleNo = "";
		$('input[name="articlecheckbox"]:checked').each(function() {
			var rowObj = $(this).parent().parent();
			articleNo = rowObj.find('#articleNo').text();
		});
		//console.log(articleNo);
		var articleNoFlag = "Y";
		var srcOfSupplyInd = "";
		var supplierNo ="";
		if (!isNaN((articleNo).split('-')[0])
				&& (articleNo).split('-')[0].length <= 7)
			articleNoFlag = "Y";
		else if (!isNaN((articleNo).split('-')[0])
				&& (articleNo).split('-')[0].length > 7)
			var	gtinFlag = "Y";
			nodeLevel = "";
			nodeId = "";
		var param = {
			"iv_desc" : "",
			"iv_article_no" : articleNoFlag,
			"iv_gtin" : gtinFlag,
			"iv_article" : articleNo,
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_supplier" : supplierNo,
			"iv_src_supply" : srcOfSupplyInd,
			"iv_ranged" : "Y",
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
				//isServiceDesc = false;
				var articleList = '';
				articleList = response;
				if (articleList.length == 1 && articleList[0].article != undefined) {
						if(articleList[0].dangerous_goods_flag!= undefined)
						{
						dangerFlag=articleList[0].dangerous_goods_flag;
						}
						addSingleArticleToPromoList(articleList[0]);
					}
					else if(articleList.ErrorID  != undefined){
					showError('Technical issue occurred. Please contact technical support');
					$('#serviAgreement').html('');
					stopLoading();
				}
				else
					{
					showError('No Data Found');
					$('#serviAgreement').html('');
					stopLoading();
				
					}
				stopLoading();

			},
			error : function(response) {
				stopLoading();
			},
		});
	        
	/*
		if ($('input[name="articlecheckbox"]:checked').length >= 1) {
			addArticleToPromoList();
		} else {
			showError('Please select atleast one article to add.');
			event.preventDefault();
		}
	*/

	});

	$('#selectVendor').click(function(event) {
		if ($('input[name="vendorcheckbox"]:checked').length >= 1) {
			addVendorList();
		} else {
			showError('Please select atleast one Vendor.');
			event.preventDefault();
		}

	});
	
	if (isCSD) {
		$('.raDiv').addClass('hideBlock');
		$('#MM').prop('checked', true);
	}
	if (isRA) {
		$('.raDiv').removeClass('hideBlock');

	}
	$('#repairs-comments').removeClass('mandatory');
	$('#MF').click(function() {
		if ($('#MF').is(':checked'))
			$('.spareDiv').addClass('hideBlock');
		$('#store').trigger('click');
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
		$('#pickDate').val(presentDate);
		//defect-8351
		//$('#repairs-comments').addClass('mandatory');
	});
	$('#MM').click(function() {
		if ($('#MM').is(':checked')){
			$('.spareDiv').removeClass('hideBlock');
			$('#repairs-comments').removeClass('mandatory');
		}
	});
	$('#cust').click(function() {
		$('.spareDiv > .parameter').removeClass('hideBlock');
	    //$('.parameter > .spareDiv').remove('hideBlock');
	    $('.spareDiv > .clearfix').removeClass('hideBlock');

		$('.custDiv').removeClass('hideBlock');		//Defect_9305
	});
	$('#store').click(function() {
	    $('.spareDiv > .parameter').addClass('hideBlock');
	    //$('.parameter > .spareDiv').remove('hideBlock');
	    $('.spareDiv > .clearfix').addClass('hideBlock');

		$('.custDiv').removeClass('hideBlock');
		//$('#repairs-comments').removeClass('mandatory');
	});
	
	
	$(".inputDate").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
	});
	
	$('#cust').trigger('click');

	// Code for Auto Complete
	/*
	 * var sampleList = [ "12345 - T-shirt for kids small", "12347 - T-shirt for
	 * kids Med", "12348 - T-shirt for kids Large", "12349 - T-shirt for boys
	 * small", "12350 - T-shirt for boys Med", "12351 - T-shirt for boys Large",
	 * "12352 - T-shirt for men small", "12363 - T-shirt for men Med", "12364 -
	 * T-shirt for men Large" ]; $( "#searchBox" ).autocomplete({ source:
	 * sampleList });
	 */
	
	//allow only numbers in contact no and post code total amount
	$('#contactNum').onlyNumbers();
	$('#code').onlyNumbers(); 
	$('#ta').isValidDecimal();
	 $('#searchBox').focus();	
	 
	 //document.getElementById('date').value= Date()
	 $('#date').val($.datepicker.formatDate('dd/mm/yy', new Date()));
});


function searchArticle(data) {
	data= $('#searchBox').val().split('-')[0].trim();
	
	var articleNoFlag = "";
	var descFlag = "";
	var gtinFlag = "";
	var srcOfSupplyInd = "";
	var supplierNo = "";

	if (isNaN((data).split('-')[0]))
		descFlag = "Y";
	else if (!isNaN((data).split('-')[0])
			&& (data).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((data).split('-')[0])
			&& (data).split('-')[0].length > 7)
		gtinFlag = "Y";
		nodeLevel = "";
		nodeId = "";
		if (isNaN(data)){
			var createParam = {
					"iv_article"	: data
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
					var articleList = '';
					articleList = response;
					if(articleList.length >0){
					if(articleList[0].dangerous_goods_flag!= undefined)
					{
						dangerFlag=articleList[0].dangerous_goods_flag;
					}

					$('#searchText').text($('#searchBox').val());
					$('#searchArticleCount').text(articleList.length);
					$('#articleSearchTbody').html(
							populateSearchResultDesc(articleList));
					$("#dialog-mulipleArticles").parent().addClass(
					"popupWrapper");
					$("#dialog-mulipleArticles").dialog("open");
					$("#dialog-mulipleArticles .ContentTableWrapper table tr:first").next().find('input[type="radio"]').prop('checked',true);
					$("#dialog-mulipleArticles").parent().find(
					'.ui-dialog-title').text('Article Search Result');
					bindRadioevent();
					}else {
						$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
		    			stopLoading();
					}
					stopLoading();
				}
			
			});
		}else {
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" : articleNoFlag,
		"iv_gtin" : gtinFlag,
		"iv_article" : data,
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
				var articleList = '';
				articleList = response;
				if (null!=articleList && articleList.length > 1) {
					
					if(articleList[0].dangerous_goods_flag!= undefined)
						{
						dangerFlag=articleList[0].dangerous_goods_flag;
						}
					
					$('#searchText').text($('#searchBox').val());
					$('#searchArticleCount').text(articleList.length);
					$('#articleSearchTbody').html(
							populateSearchResult(articleList));
					$("#dialog-mulipleArticles").parent().addClass(
							"popupWrapper");
					$("#dialog-mulipleArticles").dialog("open");
					$("#dialog-mulipleArticles .ContentTableWrapper table tr:first").next().find('input[type="radio"]').prop('checked',true);
					$("#dialog-mulipleArticles").parent().find(
							'.ui-dialog-title').text('Article Search Result');
					bindRadioevent();
					stopLoading();
				} else if (articleList!=null && articleList.length == 1 && articleList[0].article != undefined) {
				//for Defect_8166
					if(articleList[0].dangerous_goods_flag!= undefined)
					{
					dangerFlag=articleList[0].dangerous_goods_flag;
					}
					addSingleArticleToPromoList(articleList[0]);
				}else if(articleList!=null && articleList.length == 0){
					doBasicArticleSearch(param);
				}
			/*}*/ else if(articleList.ErrorID  != undefined){
				showError('Technical issue occurred. Please contact technical support');
				$('#serviAgreement').html('');
				stopLoading();
			}
			else
				{
				showError('No Data Found');
				$('#serviAgreement').html('');
				stopLoading();
			
				}

		},
		error : function(response) {
			// showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
        }
}
function doBasicArticleSearch(param){
	param.iv_style = '';
	param.iv_colour = '';
	param.iv_article_size = '';
	param.iv_user_id = $('#loginUserId').val();
	param.iv_sap = encSapPwd;
	console.log(articleHdrInfoServiceURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : articleHdrInfoServiceURL,
		data : JSON.stringify(param),

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			var articleList = '';
			articleList = response;
				dangerFlag='N'
				if (null!=articleList && articleList.length > 1) {
					$('#searchText').text($('#searchBox').val());
					$('#searchArticleCount').text(articleList.length);
					$('#articleSearchTbody').html(populateSearchResult(articleList));
					$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
					$("#dialog-mulipleArticles").dialog("open");
					$("#dialog-mulipleArticles .ContentTableWrapper table tr:first").next().find('input[type="radio"]').prop('checked',true);
					$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text('Article Search Result');
					bindRadioevent();
					stopLoading();
				}else if (articleList!=null && articleList.length == 1 && articleList[0].article_no != undefined) {
					articleList[0].article = articleList[0].article_no
					addSingleArticleToPromoList(articleList[0]);
				}else if(articleList!=null && articleList.ErrorID  != undefined){
					showError('Technical issue occurred. Please contact technical support');
					$('#serviAgreement').html('');
					stopLoading();
			}else{
				showError('No Data Found');
				$('#serviAgreement').html('');
				stopLoading();
			}
		},
		error : function(response) {
			// showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
}
function populateSearchResult(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTr(list[i]);
	}
	return content;
}
function populateSearchResultDesc(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTrDesc(list[i]);
	}
	return content;
}

function populateVendorSearchResult(list) {
	var content = '<tr><th>Vendor</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getVendorTr(list[i], i);
	}
	return content;
}
/*{"linked_art_flag":"N",
 * "gp_percent":null,"gp_value":null,
 * "cur_shelf_capacity":"24.000","default_shelf_capacity":null,
 * "default_mpl":null,"current_mpl":"6.000","future_plan_reason":"",
 * "reason_valid_from":"","reason_valid_to":"","temperature":"","inputQty":null,
 * "isSohGreaterThanZero":null,"deliveryDate":null,"orderDate":null,"cupUnit":null,
 * "orderedQuantity":null,"totalOrdered":null,"saveFlag":null,"uomFlag":null,
 * "grossProfit":null,"gst":"0.00","segment":null,"autostockr":"",
 * "category":null,"mpl":null,"ean11":"9310480333378","numtp":null,"plu":"",
 * "msg":"213","description":"333 Sauce Apple 250g","srt":null,"articleEAN":null,
 * "om":"6.000","soh":"-4.000","uomType":null,"soo":"0.000","gtin":"","sit":"0.000",
 * "doh":null,"piuom":null,"piom":null,"country_origin":"","sub_cat_name":null,"segment_name":null,
 * "shelf_life_period":"Day","shelf_life":"730","pl_type_desc":"New South Wales 1"
 * ,"pl_type":"N1","vendor_sku":null,"iv_records":"0","sales_org":null,
 * "iv_warehouse":null,"iv_s_org":"","recall_flag":"N",
 * "iv_vendor":null,"sales_set_flag":"N","ord_uom":null,
 * "purch_price":null,"curr_mpl":null,"def_mpl":null,
 * "pack_brk_flag":"N","next_del_date":null,"iv_article":"",
 * "iv_dc":"","next_po_item":null,"dept_name":null,"department":null,
 * "stock_on_hand":"-4.000","store_location":null,"for_sale_flag":""
 * ,"base_uom_desc":"each","shelf_capacity":null,"ranged_flag":"Y","sub_category":null,
 * "dist_channel":null,"cat_name":null,"delete_ind":"N","iv_sos":"",
 * "stock_on_order":"0.000","ord_uom_desc":null,
 * "iv_gtin":"","eas_ind":"","stock_in_transit":"0.000","iv_category":"","supp_no":"1979",
 * "iv_desc":"","ord_mul":"6.000","article":"69528","alt_uom":null,"alt_uom_desc":null,"base_uom":"EA",
 * "numtp_desc":null,"supp_name":"Sydney RDC - AutoDC R3B Swiss","site":null,"sales_price":"1.79",
 * "sell_effective_gp":null,"promo_id":"","promo_desc":"","promo_type":"","promo_type_desc":"",
 * "promo_sales_price":"0.00","promo_effective_gp":null,"promo_from_date":"","promo_to_date":"",
 * "scan_description":null,"brand_id":"P","brand_name":"PROPRIETARY","comp_price_unit":"0.72","comp_size_au":"100",
 * "comp_size_au_uom":"G","comp_size_nz":"0","comp_size_nz_uom":"","min_value":"0.00","item_lim":"",
 * "iv_hier_node":"","max_value":"0.00","expiry_period_typ":"","expiry_period":"0","days_on_hand":null,
 * "perpetual_flag":"Y","pi_uom":null,"pi_om":null,"storage_loc":"1000","storage_loc_desc":"Sloc 1000",
 * "src_of_supp":"2","src_of_supp_desc":"Stock Transfer","check_age_proof":"","eft_grp_id":null,
 * "last_del_date":null,"last_ord_qty":null,"last_rcv_qty":null,"next_ord_qty":null,
 * "last_po":null,"next_po":null,"last_po_item":null},*/
function getTr(obj) {
	var tr = '<tr ';
	if (Number(obj.autostockr) > 0) {
		tr += 'data-autoStockR="Y"';
	} else {
		tr += 'data-autoStockR="N"';
	}
	tr += 'data-om="'
			+ obj.om
			+ '" data-supplier="'
			+ obj.supplier
			+ '" ><td id="articleNo">'
			+ obj.article
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ obj.base_uom
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="radio" name="articlecheckbox"></td></tr>';
	return tr;
}
function getTrDesc(obj) {
	var tr = '<tr ';
	if (Number(obj.autostockr) > 0) {
		tr += 'data-autoStockR="Y"';
	} else {
		tr += 'data-autoStockR="N"';
	}
	tr += 'data-om="'
			+ obj.om
			+ '" data-supplier="'
			+ obj.supplier
			+ '" ><td id="articleNo">'
			+ obj.article_no
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ obj.article_uom
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="radio" name="articlecheckbox"></td></tr>';
	return tr;
}
function getVendorTr(obj, i) {
	var tr = '<tr ';
	tr += 'id="'
			+ i
			+ '" ><td>'
			+ obj.main_vendor
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="radio" name="vendorcheckbox"></td></tr>';
	return tr;
}
function showError(msg) {
	$('#errorMsgDiv').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}
function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}
function bindRadioevent() {
	/*
	 * $('input[name="articlecheckbox"]').change(function() { var size =
	 * $('input[name="articlecheckbox"]:checked').length; if (size > 0) {
	 * $('#addtolist').text("Add To List(" + size + ")"); } else {
	 * $('#addtolist').text("Add To List"); } });
	 */
}

function addSingleArticleToPromoList(obj) {

	var articleNo = obj.article;
	// var articleDesc = obj.description;
	var articleDesc = obj.article_desc;
	$('#articleNo').val(articleNo);
	$('#articleDesc').val(articleDesc);
	$('#searchBox').val();
	$('#searchBox').val(articleNo + ' - ' + articleDesc);
	$('#searchBox').attr('ranged_flag',obj.ranged_flag);
	getArticleServiceAggrement($('#createOrder').serialize());

}
function addArticleToPromoList() {

	$('input[name="articlecheckbox"]:checked').each(function() {
		var rowObj = $(this).parent().parent();
		var articleNo = rowObj.find('#articleNo').text();
		var articleDesc = rowObj.find('#description').text();
		$('#articleNo').val(articleNo);
		$('#articleDesc').val(articleDesc);
		$('#searchBox').val();
		$('#searchBox').val(articleNo + ' - ' + articleDesc);

	});
	getArticleServiceAggrement($('#createOrder').serialize());
}
function addVendorList() {
	var listNo = 0;
	$('input[name="vendorcheckbox"]:checked').each(function() {
		var rowObj = $(this).parent().parent();
		listNo = rowObj.attr('id');

	});
	formServiceAgreementContent(serviceAgreementList, listNo);
}
function getArticleServiceAggrement(data) {
	$.ajax({
		type : "POST",
		url : "getArticleServiceAggrement.htm",
		data : data,

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			var message = '';
			var output = $.parseJSON(response);
			message = output.msg;
			serviceAgreementList = output.list;
			if (message == 'Y') {
				if (serviceAgreementList.length > 1) {

					$('#searchArticleText').text($('#searchBox').val());
					$('#searchVendorCount').text(serviceAgreementList.length);
					$('#vendorSearchTbody').html(
							populateVendorSearchResult(serviceAgreementList));
					$("#dialog-mulipleVendors").parent().addClass(
							"popupWrapper");
					$("#dialog-mulipleVendors").dialog("open");
					$("#dialog-mulipleVendors").parent().find(
							'.ui-dialog-title')
							.text('Service Agreement Result');
					$("#dialog-mulipleVendors .ContentTableWrapper table tr:first").next().find('input[type="radio"]').prop('checked',true);
				} else if (serviceAgreementList.length == 1) {
					formServiceAgreementContent(serviceAgreementList, 0);
					var articleNo = $('#articleNo').val();
					var articleDesc = $('#articleDesc').val();
					$('#searchBox').val();
					$('#searchBox').val(articleNo + ' - ' + articleDesc);
					serviceAgreementFound =true;
				}

			} else {
				var articleNo = $('#articleNo').val();
				$('#serviAgreement').html('');
				showError("Service Agreement not found for the article("+articleNo+")");
				stopLoading();
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

function formServiceAgreementContent(serviceAgreementList, i) {
	/*"zzdelflag":"","":"","aedat":"","":"","zztelf1":"","":"","aenam":"","":"","zzraiseullage","":"","":"","":"","":"","zzwrntypdind":"","process":"","zzmode":"","zztelf3":"","":"","crdat":"",,"":"000","zztelf4":"","zztelf2":"","claim_agent":"","crnam":"","datab":"","":""*/
	var list = serviceAgreementList[i];
	var content = '';
	repairAgentName=list.repair_agent_name;
	repairAgentNo=list.repair_agent;
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
			+'<tr><td>Contact:</td><td>'
			+ list.zztelf1
			+ '</td></tr><tr><td>Can raise repair request?</td><td>'
			+ (list.zzrepairorders != '' && list.zzrepairorders != null
					&& list.zzrepairorders != undefined
					&& list.zzrepairorders == 'X' ? 'Yes' : 'No')
			+ '</td></tr><tr><td>Can raise claim?</td><td>'
			+ (list.zzraiseclaim != '' && list.zzraiseclaim != null
					&& list.zzraiseclaim != undefined && list.zzraiseclaim == 'X' ? 'Yes'
					: 'No')
			+ '</td></tr><tr><td>Need repair authorisation?</td><td>'
			+ (list.zzraforclaim != '' && list.zzraforclaim != null
					&& list.zzraforclaim != undefined && list.zzraforclaim == 'X' ? 'Yes'
					: 'No')
			+ '</td></tr><tr><td>Under warranty?</td><td>'
			+ (list.zzwarranty != '' && list.zzwarranty != null
					&& list.zzwarranty != undefined && list.zzwarranty == 'X' ? 'Yes'
					: 'No')
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
					&& list.zzspareparts != undefined && list.zzspareparts == 'X' ? 'Yes'
					: 'No')
			+ '</td></tr><tr><td>Contact Number:</td><td>'
			+ list.zztelf2
			+ '</td></tr><tr><td colspan="2">&nbsp;</td></tr>'
			+ '<!--<tr><td>S&D markdown?</td><td>'
			+ 'Yes / No'
			+ '</td></tr>--><tr><td>Valid From:</td><td>'
			+ (list.datab != '' && list.datab != null
					&& list.datab != undefined  ? (list.datab).replace('.','/').replace('.','/').replace('.','/')
							: '')
			+ '</td></tr><tr><td>Special Communications:</td><td>'
			+ list.zzspecialcomments + '</td></tr>'
			+'<tr><td>Markdown Flag:</td><td>'
			+ "Y" + '</td></tr></table></div>';
	 vendorNo = list.main_vendor;
	var repairAgent = list.repair_agent;
	$('#vendorNo').val(vendorNo);
	$('#repairAgent').val(repairAgent);
	$('#serviAgreement').html('');
	$('#serviAgreement').append(content);
}

function createServiceOrder(data) {

	$.ajax({
		type : "get",
		url : "createRepairServiceOrder.htm",
		data : data,

		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			
			var result = '';
			result = $.parseJSON(response);
			serviceOrderNo = result.msg;
			if ($.isNumeric(serviceOrderNo)) {
				getServiceOrderDetail(serviceOrderNo);
				var successLine = 'The customer service request number is ';
				successLine += serviceOrderNo + '.';
				$("#dialog-created").dialog("open");
				$("#dialog-created").parent().find('.serviceOrderNo strong')
						.text(successLine);
				resetForm();
			} else {
				showError(serviceOrderNo);
				stopLoading();
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
function validate() {
	var errors = '';
	$('#custName').val().toUpperCase();
	if ((!$('#MM').is(':checked')) && (!$('#MF').is(':checked'))) {
		errors += getError("Please select Request type");
	}
	if ($('#searchBox').val() == '') {
		errors += getError("Please enter article number or description,or EAN/TUN/PLU and press Enter");
	}
	if($('#serviAgreement').text().trim() == "")
		{
		errors += getError("Please enter valid article number or description,or EAN/TUN/PLU to see the Service Agreement");
		}
	if ((!$('#cust').is(':checked')) && (!$('#store').is(':checked'))) {
		errors += getError("Please select stock type");
	}
	if ($('#cust').is(':checked') && (!$('#MF').is(':checked'))) {
		errors += validateCustomerDetails();
		errors += validatePurchaseDetails();
	}
	if ($('#store').is(':checked') && (!$('#MF').is(':checked'))) {
		errors += validatePurchaseDetailsforStore();
	}
	if ($('#store').is(':checked') && ($('#MF').is(':checked'))) {
		errors += validateSpareDetails();
	}

	if (errors == '') {
		return true;
	} else {
		showAllErrors(errors);
		return false;
	}

}
function validateCustomerDetails() {
	var errors = '';
	if ($('#custName').val() == '') {
		errors += getError("Please enter Customer Name.");
	}
	if ($('#address').val() == '') {
		errors += getError("Please enter Customer Address.");
	}
	if ($('#code').val() == '') {
		errors += getError("Please enter Post code.");
	}
	if ($('#contactNum').val() == '') {
		errors += getError("Please enter Contact Number.");
	}
	
	if (!$('#warr').is(':checked') && !$('#quot').is(':checked')
			&& !$('#char').is(':checked')) {
		errors += getError("Please Select Article Under Warranty or Quote or Charged.");
	}
	
	//defect-8331
	if ($('#email').val() != '') {	
		
		if(validateEmail($('#email').val())){
			
		}
		else{
			errors += getError("Please enter a valid email.");	
		}
		
	}

	return errors;
}
function validatePurchaseDetails() {
	var errors = '';
	if ($('#pdate').val() == '') {
		errors += getError("Please enter Date of Purchase.");
	}
	if (!isValidDate($('#pdate').val())) {
		errors += getError("Please enter valid Purchase date.");
	}
	// for Defect_8167
	if (!isPastDateRepair($('#pdate').val())) {
		errors += getError("Purchase date should be past.");
	}
	//defect 2400
	/*if ($('#proof').val() == '') {
		errors += getError("Please enter Proof of Purchase.");
	}*/
	//for Defect_8162
	if ($('#fault').val() == '') {
		errors += getError("Please enter Fault Description.");
	}
	//8198 as discussed with muhammad/ram this has been removed
	/*if ($('#ta').val() == '') {
		errors += getError("Please enter Amount Payable.");
	}
	if ($('#ta').val() == '0') {
		errors += getError("Please enter valid Amount Payable.");
	}*/
	return errors;

}
function validatePurchaseDetailsforStore() {
	var errors = '';
	/*		
	if ($('#ta').val() == '') {
		errors += getError("Please enter Amount Payable."); //defect 8198
	}*/
	if ($('#ta').val() == '0') {
		errors += getError("Please enter valid Amount Payable.");
	}
	
	if ($('#fault').val() == '') {
		errors += getError("Please enter Fault Description.");
	}
	return errors;

}
function validateSpareDetails()
{

	var errors = '';
	
	/*if ($('#ta').val() == '') {
		errors += getError("Please enter Amount Payable.");//defect 8198
	}*/
	if ($('#ta').val() == '0') {
		errors += getError("Please enter valid Amount Payable.");
	}
	if ($('#fault').val() == '') {
		errors += getError("Please enter Fault Description.");
	}
	//defect-8351
	/*if ($('#comments').val() == '') {
		errors += getError("Please enter comments.");
	}*/
	/*if ($('#authCode').val() == '') {
		errors += getError("Please enter Authorization Code.");
	}*/
	return errors;

	
}
function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	}
	else {
		return false;
	}
}
function showAllErrors(content) {
	$('#errorWrapper').removeClass('hideBlock');
	$('#validateErrors').html(content);
}
function getError(msg) {
	return "<li>" + msg + "</li>";
}
function resetForm()
{
	$("#createOrder")[0].reset();	
	$('#serviAgreement').html('');
	$('#cust').trigger('click');
}

function getServiceOrderDetail(serviceOrderNo) {
	var statusMsg='';
	
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

				if (response != '') {
					output = $.parseJSON(response);
					//console.log(response);
					dtlList = output.list;
					statusMsg = output.msg;
					if (statusMsg== 'Y') {
						getCartonLabelForServiceOrder(dtlList[0]);
					} else {
						//SHOW alert MESSAGE 
						console.log(statusMsg);
					}
				}else{
					console.log("No Data Found.");
				}
			stopLoading();
		},
		error : function(response) {
			//showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
}
function printAcceptanceNote(obj) {
	var content = '';
content += '<div>&nbsp;</div><div class="styleForDiv" ><label class="">'
	+ ' Service Request No: <strong>'
	+ serviceOrderNo
	+ '</strong></label><label class="separator">|</label><label class="">'
	/*+ 'BIG W Order No: <strong>'
	+ 'bigworderno'
	+ '</strong></label><label class="separator">|</label><label class="">'*/
	+ 'Date Of Purchase: <strong>'
	+ obj.purchase_date
	+ '</strong></label></div><div>&nbsp;</div>';
content +='<table><tr><td><strong> Customer Details</strong></td><td></td><td><strong>Service Request Details</strong></td></tr>'
    +'<tr><td><strong>'
    +obj.name
    +'</strong><br>'
    +obj.address
    +'</td><td></td><td><strong>'
    +obj.art_desc
    +'</strong><br> Article No : '
    +Number(obj.article)
    +'</td></tr><tr><td><strong> Phone Number</strong><br>'
    +obj.contactnumber
    +'</td><td></td><td><strong> Fault Description</strong><br>'
    +obj.fault_description
    +'</td></tr><tr><td><strong> Email ID</strong><br>'
    +obj.customer_email
    +'</td><td></td><td><strong> Article Service</strong><br>'
    +obj.article_service
    +'</td></tr><tr><td></td><td></td><td><strong> Amount Payable</strong><br>'
    +obj.total_amount
    +'</td></tr><tr><td></td><td></td><td></td></tr></table>';

content += '<div class="styleForNote"><label>Note: Expected Resolution Date is '
	+obj.resoldate
	+'</label></div>';
var printHead = '<div class="width100" style=""><div class="bigwLogo"><div class="posFixed"><label ><strong>'+ storeName 
+'</strong><br>'+storeStreet+'<br>'+storeCity+' '+storePostalCode+'</label><label class=" boxed center">Goods Acceptance Note</label><br>'+'<label><strong>Phone Number </strong><br>'+ storeContactNumber
+ '</label></div> </div>	<div class="width70 margin5 margontopnone inline-block"> </div></div>';
var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
$('#printbodyForAcpNot').html('').append(printHead+content+printFoot)
.append(
'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');
	
}
function getCartonLabelForServiceOrder(dtlObj)
{
	//var statusMsg='';
	
	$.ajax({
		type : "post",
		url : "getCartonLabelForServiceOrder.htm",
		data : {
			serviceOrderNo : serviceOrderNo,
			vendorNo : vendorNo
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
				
				var carCount = 3;				
		if((carCount) != ''){
			//getCartonLabelForServiceOrder(area, itmList, carCount, moveBackFlag);
			$("#dialog-cartonCount").dialog("close");
			var cartonCount = Number(carCount);
	/*for(var i=1; i <= cartonCount; i++){
		item = {
				"claimNo" :(carObj.zra_reference),
				"cartonCount" :  i,
				"totalCount"  :  cartonCount
		};
		
		itemList.push(item);
	}*/
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
			dangerNotes         :'',
			requestType         :requestType,
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
			repairAgentContactNumber: carObj.zagent_tel_number +'    '+ carObj.zfax_number,
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
			 amount: "$ "+(Number(dtlObj.total_amount||'') <=0.01 ? '0' : (dtlObj.total_amount)),				
			 resolutionDate: dtlObj.resoldate,
			 articleQuantity:dtlObj.quantity,
			 createdDate:dtlObj.createdate,			 
			 repairAgentCity:carObj.zagent_city1 +'  '+ carObj.zagent_post_code1,				
	         repairAgentStreet:carObj.zagent_street,
	         imagePath: imagePathMap[globalUserImgLoc],
	         cartonCount			: carCount,				
				claimNo             :carObj.zra_reference,
				repairAgentName:repairAgentName,
				repairAgentNo:repairAgentNo
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

	
}
function printCartonLabel(obj,dtlObj)
{
	acceptanceObj=dtlObj;
	 storeName = obj.zstore_name1;
	 storeStreet= obj.zstore_street;
	 storeCity = obj.zstore_city1;
	 storePostalCode = obj.zstore_post_code;
	 storeContactNumber = obj.zstore_tel_number;
	 printAcceptanceNote(dtlObj);
	 printAcceptanceNoteWithoutCustDetails(dtlObj);	
}

var triggerLeaveDangerPopUpScreenYes = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
	//Defect_12480
	if($('#searchBox').attr('ranged_flag') == 'Y'){
		createServiceOrder($('#createOrder').serialize());
	}else{
		callServiceToRangeItem($('#searchBox').val().split('-')[0]);
	}
};

var triggerLeaveDangerPopUpScreenNo = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
};

function  printAcceptanceNoteWithoutCustDetails(obj) {
	var content = '';
content += '<div>&nbsp;</div><div class="styleForDiv" ><label class="">'
	+ ' Service Request No: <strong>'
	+ serviceOrderNo
	+ '</strong></label><label class="separator">|</label><label class="">'
	/*+ 'BIG W Order No: <strong>'
	+ 'bigworderno'
	+ '</strong></label><label class="separator">|</label><label class="">'*/
	+ 'Date Of Purchase: <strong>'
	+ obj.purchase_date
	+ '</strong></label></div><div>&nbsp;</div>';
content +='<table><tr><td><strong>Service Request Details</strong></td></tr>'
    +'<tr><td><strong>'
    +obj.art_desc
    +'</strong><br> Article No : '
    +Number(obj.article)
    +'</td></tr><tr><td><strong> Fault Description</strong><br>'
    +obj.fault_description
    +'</td></tr><tr><td><strong> Article Service</strong><br>'
    +obj.article_service
    +'</td></tr><tr><td><strong> Amount Payable</strong><br>'
    +obj.total_amount
    +'</td></tr><tr></tr></table>';
content += '<div class="styleForNote"><label>Note: Expected Resolution Date is '
	+obj.resoldate
	+'</label></div>';
var printHead = '<div class="width100" style=""><div class="bigwLogo"><div class="posFixed"><label ><strong>'+ storeName 
+'</strong><br>'+storeStreet+'<br>'+storeCity+' '+storePostalCode+'</label><label class=" boxed center">Goods Acceptance Note</label><br>'+'<label><strong>Phone Number </strong><br>'+ storeContactNumber
+ '</label></div> </div>	<div class="width70 margin5 margontopnone inline-block"> </div></div>';
var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
$('#printDataForAcpNote').html('').append(printHead+content+printFoot)
.append(
'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');
	
}

function acceptanceJasperPrint(){
	
	$('#createForm').attr('method','get');
	$('#createForm').attr("action", "../claimsPrint/downloadAcceptancePrintNewPdf.pdf");
	$('#createForm').attr('target','_blank');
	$('#createForm').submit();
    stopLoading();
}
//Defect_12480
function callServiceToRangeItem(articleNo) {
	var param = {
		"iv_article" : articleNo,
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : "111",
		"iv_user_id" : $('#loginUserId').val(),
		"iv_sap" : encSapPwd
	};

	console.log(rangeArticleToSiteURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : rangeArticleToSiteURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (response != null && response != undefined
						&& response.result !=undefined
						&& response.result.length >0 
						&& response.result[0].ErrorId == undefined) {
					response = response.result;
					if (response[0].typ == 'S') {
						createServiceOrder($('#createOrder').serialize());
					} else if (response[0].msg != undefined
							&& response[0].msg != '') {
						$.fn.showCustomMsg([ response[0].msg ], error,
								'The Repair Service Order creation failed');
						stopLoading();
					}
				} else if (response.result[0].ErrorId != undefined) {
					$.fn.showCustomMsg([ mobiSerErrCode ], error);
					stopLoading();
				}
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	});
}