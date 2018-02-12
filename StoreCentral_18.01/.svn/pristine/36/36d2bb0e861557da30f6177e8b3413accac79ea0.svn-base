var salesEvent = '';
var warnPopupFlag = false;
var addDtls = '';
var addDtlsMultiBuy = '';
var CateDesc = "";
var Index = "";
var lockdownFlag;
var forecastLock;
var subCatIdFlag = "";
var nextAccClick = 'false';
var weekStartDate = '';
var allocDtl = '';
var endDate = '';
var accordOpenFlag = true;
var previousEvent = '';
var prevPageNo = '';
var lockFlagMsg = "Article is locked, value cannot be changed";
var buildLock2DayPriorMsg = "Build Quantity cannot be changed 48hrs prior to the roster date";
var buildFirstWeekLockMsg = "Build Quantity cannot be entered due to promotion starting in previous week";
var autoFrctLockMsg = "Value cannot be changed due to Automated Forecasting";
//var weekLockMsg = "0 to 6 weeks Central promotion value cannot be changed";
var weekLockMsg = "Promotional planning locked inside of 6 week from the start of promotion";
var lockDownFlagMsg = "Department Locked.Unable to edit";
var multiplePromotions = "Planning is only available at Promotion Level";// for defect 14650
var $currentlyFocusedItem;
var demandMaxLimit = 99999;//demand limit changes
var buildMaxLimit = 9999;
var displayMaxLimit = 9999;
var demandWarnLimit = 99;
var buildWarnLimit = 99;
var displayWarnLimit = 99;
var disp = 'ZDIS';
var comp = 'ZCOM';
var clr = 'ZCLR';
var ssp = 'ZSSP';
var mkd = 'ZMKD';
var spa = 'ZSPA';
var adt = 'ZADT';
var lom = 'ZLOM';
var weekDisableFlag=false;
var deactivated = '<label class="deactive">De-activated</label>';
var tab = 10;
var articlee="";

function resetScroll(){
	$('.closePopUp,.closeBtn').click(function(){
		$('html').css('overflow','auto');
		});
	
	
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { 
	    	 $('html').css('overflow','auto');
	    }
	});
}

var onlyNumeric = function(event) {
	if (event.shiftKey) {
		event.preventDefault();
	}
	if (event.keyCode == 46 || event.keyCode == 8) {
	} else {
		if (event.keyCode < 95) {
			if (event.keyCode < 48 || event.keyCode > 57) {
				event.preventDefault();
			}
		} else {
			if (event.keyCode < 96 || event.keyCode > 105) {
				event.preventDefault();
			}
		}
	}
};

var expandCollapse = function() {
	var $elem= $(this);
	var $curTrElem = $elem.closest('.line-item');
	var $nextTrElem = $curTrElem.next();
	if ($nextTrElem.hasClass('hideBlock')) {
		$nextTrElem.removeClass('hideBlock');
		$elem.find('span').text('-');
	} else {
		$nextTrElem.addClass('hideBlock');
		$elem.find('span').text('+');
	}
};
var greyOutParent = function() {
	var $elem = $(this);
	var $curTrElem= $elem.closest('.additionalPromos');
	var $prevTrElem= $curTrElem.prev();
	
	if($elem.hasClass('displayQty')){
		if ($prevTrElem.find('.displayQty').attr('readonly') != 'readonly' && $elem.val() != ''){
			$prevTrElem.find('.displayQty').val('').addClass('temp').attr('readonly','readonly').attr('title', multiplePromotions);
		}else{
			if ($prevTrElem.find('.displayQty').hasClass('temp')) {
				$prevTrElem.find('.displayQty').removeClass('temp').removeAttr('readonly').removeAttr('title');
			}
		}
	}else {
		if ($prevTrElem.find('.buildQty').attr('readonly') != 'readonly' && $elem.val() != ''){
			$prevTrElem.find('.buildQty,.deliveryDate').val('').addClass('temp').attr('readonly','readonly').attr('title', multiplePromotions);
		}else{
			if ($prevTrElem.find('.buildQty').hasClass('temp')) {
				$prevTrElem.find('.buildQty').removeClass('temp').removeAttr('readonly').removeAttr('title');
			}
			if ($prevTrElem.find('.deliveryDate').hasClass('temp')) {
				$prevTrElem.find('.deliveryDate').removeClass('temp').removeAttr('readonly').removeAttr('title');
			}
		}
	}
};
var spitVal = function() {
	
	var $elem= $(this);
	var $curTrElem = $elem.closest('.line-item');
	var $nextTrElem = $curTrElem.next();
	var enterVal =$elem.val();
	var notDividable = false;
	var $line_item = $nextTrElem.find('.secondary-line-item');
	var key ='';
	if($elem.hasClass('buildQty')){
		key = 'buildQty';
	}else {
		key = 'displayQty';
	}
	if ($line_item != undefined	&& $line_item.length > 0 
			&& enterVal != ''&& enterVal != undefined
			&& Number(enterVal) > 0) {

		if (Number(enterVal)
				% $line_item.length == 0)
			notDividable = false;
		else
			notDividable = true;

		var i = 0;
		var tempBuildVal = 0;
		$line_item.filter(function() {
				if (i == 0 && notDividable) {
					tempBuildVal = (Math.floor(Number(enterVal)
									/ $line_item.length))
							+ (Math.floor(Number(enterVal) 
									% $line_item.length));
					$(this).find('.'+key)
							.val(tempBuildVal);
				} else
					$(this).find('.'+key)
					.val(Math.floor(Number(enterVal) / $line_item.length));
				i++;
			});
	} else {
		//added the below if condition for the SRS 8672457,8679069
		if($elem.attr('readonly')!='readonly'){
			 $nextTrElem.find('.secondary-line-item .'+key).val('');
		}
	}
};

var copyData = function() {
	var $elem= $(this);
	var $curTrElem = $elem.closest('.line-item');
	var $nextTrElem = $curTrElem.next();
	var enterVal = $(this).val();
	$nextTrElem.find('.secondary-line-item').each(function() {
		$(this).find('.deliveryDate').val(enterVal);
	});
};

var orignalQtyCheck = function() {
	
	var $elem =$(this);
	var dataArrt =$(this).attr('data-td'); 
	if ((dataArrt != '' && dataArrt != undefined
			&& dataArrt.split('-')[2] != undefined 
			&& $elem.val() < Number( dataArrt.split('-')[2]))
			||((dataArrt != undefined && dataArrt.length>0 
					&& dataArrt.split('-')[2] == '') && (dataArrt != ''
					&& dataArrt != undefined
					&& dataArrt.split('-')[1] != undefined 
					&& $elem.val() < Number(dataArrt.split('-')[1])))) {
		$elem.addClass('errorField');
	} else if ($elem.hasClass('storeDemand')) {
		var storeDemandOrg = $elem.parent().parent().find('.hiddenValues').text().trim().split(':')[2].trim();
		var wtd = $elem.parent().parent().find('.wtd:visible').text().trim();
		var baseForecast = $elem.parent().parent().find('.baseForecast:visible').text().trim();
		var demand = $elem.val();
		flag = false;
		if (storeDemandOrg != demand) {
			flag = true;
		}
		$(this).addClass('errorField');
		if (wtd != null && wtd != undefined && wtd != ''
				&& demand < Number(wtd) && flag) {
			$elem.attr('title','Sales wtd used, as the given Store Demand is Lesser than the Sales wtd');
		} else if (baseForecast != null
				&& baseForecast != undefined
				&& baseForecast != ''
				&& demand < Number(baseForecast) && flag) {
			$elem.attr('title','Base Forecast used, as the given Store Demand is Lesser than the Base Forecast');
		} else {
			$elem.removeClass('errorField');
		}
	} else {
		$elem.removeClass('errorField');
	}
};
function applyPopUpFilters(){
	$('.histParent a span').text('+');
	$('.histChild').parent().parent().parent().addClass('hideBlock');
	var month = $('.months').val();
	promoType = $('.selectOptions.promoType').val();
	var now = new Date();
	nowTime = now.getTime();
	beforeTime = now.setTime(nowTime - (86400000 * 30 * month));
	$('.appended').removeClass('hideBlock');
	$('.appended').filter(function() {
						startDate = $(this).find('.start-date').text().trim().substring(0,10);
						endDate = $(this).find('.end-date').text().trim();
						var tempDateOne = new Date();
						var tempDateTwo = new Date();
						startDateObj = tempDateOne.setFullYear(startDate.split('/')[2],startDate.split('/')[1] - 1,startDate.split('/')[0]);
						endDateObj = tempDateTwo.setFullYear(endDate.split('/')[2],endDate.split('/')[1] - 1,endDate.split('/')[0]);
						if ((beforeTime > startDateObj || endDateObj > nowTime  ) || (!$(this).hasClass('C') && promoType == 'C') || (!$(this).hasClass('I') && promoType == 'I'))// sales history issue
							$(this).addClass('hideBlock');
						else
							$(this).removeClass('hideBlock');
					});
}

function appendDivider(event,ele){
	if($(ele) != null && $(ele) != undefined){
		var value = $(ele).val();
		if(value.trim().length > 0){
			var len = value.trim().length;
			if((len == 2 || len == 5) && (event.keyCode != 191 && event.keyCode != 8 && event.keyCode != 46)){
				value=value+'/';
			}
			$(ele).val(value);	
		}
	}
}

function yearFormatter(){
	$(".deldate").each(function(){
	$(this).focusout(function(){
		var v = $(this).val();
		try {
				if (v.length == 8) {
					var finalDate = parseDate(v).getFullYear();
					var splitDate = v.split("/");
					finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
					$(this).val(finalDate);
				} else {
					$(this).val(v);
				}
			} catch (err) {
				$(this).val(v);
			}
	});

	
	});
}
var errorFocused = function() {
	if (!$(this).hasClass('errorField'))
		$(this).removeAttr('title');
};
// var tabOpenFlag=true;
$(function() {
	$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
	/*// Please do not remove this commented part
	// SC - 425 -Promotion Management Navigating from one articles demand and display field to another using keyboards up and down key change
	$(document).keyup(function (e) {
		
		if (e.which == 38) { // up arrow
			var id = e.target.getAttribute('id');
			$("#"+id).closest('tr').prevUntil('tr.noChild:first').find('td:eq(' + $("#"+id).closest('td').index() + ')').find('input').focus();
	        }
		
		if (e.which == 40) { // down arrow
			var id = e.target.getAttribute('id');
			// $("#"+id).closest('tr').nextAll('tr.noChild:first').find('td:eq(' + $("#"+id).closest('td').index() + ')').find('input').focus();
			// $("#"+id).closest('tr').next('tr.noChild.line-item.onlyRows:first').find('td:eq(' + $("#"+id).closest('td').index() + ')').find('input').focus();
			// $("#"+id).closest('tr').next('tr.noChild:first').find('td:eq(' + $("#"+id).closest('td').index() + ')').find('input').focus();
			$("#"+id).closest('tr').nextAll('tr.noChild.line-item.onlyRows:first').find('td:eq(' + $("#"+id).closest('td').index() + ')').find('input').focus();
		}*/
	      });
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if ($('#next').is(':visible')) {
				$('#next').click();
			}
		}  
		
	});

	$("#dialog-verifySupplier").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 700
	});

	$("#dialog-confirmation").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 480
	});
	$("#dialog-confirmation").parent().find(
			'.ui-dialog-titlebar .ui-dialog-title').text(
			'De-activate Promotion');

	$("#supplier").attr('readonly', 'readonly');
	$("#all").click(function() {
		$('#supplier').val('');
		$("#supplier").attr('readonly', 'readonly');
	});

	$("#warehouse,#vendor").click(function() {
		$('#supplier').val('');
		$("#supplier").removeAttr('readonly');
		$('#supplier').focus();
	});
	$(window).resize(function() {
		if ((($(window).width() - 980) / 2) < 20)
			$('.fixedHeader').addClass('hideBlock').css('left', '20px');
		else
			$('.fixedHeader').css('left', ($(window).width() - 980) / 2);
	});
	$("#verifySupplier").click(
			function() {
				hideError();
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
									if (!$("#dialog-verifySupplier").dialog(
											"isOpen")) {
										$('#vendorDesc').val(
												$('#supplier').val());
										$("#dialog-verifySupplier").parent()
												.addClass("popupWrapper");
										$("#dialog-verifySupplier")
												.removeClass('hideBlock')
												.dialog("open");
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
	/*
	 * $('.closePopUp').click(function(){ focusPrevItem(); });
	 */
	$("#goButtonSample1").click(function() {
		hideError();
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
	/*
	 * var click = true; $('#vendor').click(function() { if (click) {
	 * $('#supplier').val(''); click = false; } });
	 * $('#warehouse').click(function() { if (click == false) {
	 * $('#supplier').val(''); click = true; } });
	 */

	$('.department').click(
			function() {
				$('#departmentInPromotions option[value="' + $(this).val() + '"]').prop(
						'selected', true);
			});

	$('label[for="residualQty"]')
			.attr('title',
			//		'Residual Qty = EST. WTD- WTD Overstocks = Display Qty - Residual Qty');
			'Residual Sale Quantity = Estimated Full Weeks Sales minus WTD Sales');
	
	$("label,option,select").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	$('.hierarchyWrapper input[type=radio]').click(function() {
		$('.hierarchyname').val($(this).next().text());
	});
	$('#articleNo').blur(function() {
		$('#articleNo').val($('#articleNo').val().trim());
	});
	$('label[for="residualQty"]').text(
			'Show articles with Display > Residual Qty');
	/*
	 * $("#dialog-modal").dialog({ autoOpen : false, modal : true, resizable :
	 * false, minHeight : 120, maxHeight : 600, width : 350 });
	 * $("#dialog-modal").parent().addClass("popupWrapper");
	 */
	$('#apply').click(function() {
						applyPopUpFilters();
						$('.filtered-count h4 strong').text($('.appended:visible').length);
						if($('.appended:visible').length>11){
							$('#lastEdit').css('width', '25px');
						}else{
							$('#lastEdit').css('width', '39px');
						}
						$('#All').prop("checked", true);
										});
	
	// $('#depH').attr('disabled', true).next().css('opacity', '0.5');
	var max = 100;
	$('textarea').keypress(function(e) {
		if (e.which < 0x20) {
			// e.which < 0x20, then it's not a printable character
			// e.which === 0 - Not a character
			return; // Do nothing
		}
		if (this.value.length == max) {
			e.preventDefault();
		} else if (this.value.length > max) {
			// Maximum exceeded
			this.value = this.value.substring(0, max);
		}
	});

	/*
	 * $('#departmentInPromotions').change(function() { if ($('#departmentInPromotions').val() ==
	 * 'Select') $('#depH').attr('disabled', true).next().css('opacity', '0.5');
	 * else $('#depH').removeAttr('disabled').next().css('opacity', '1'); });
	 */

	$('#promotionWeek')
			.change(
					function() {
						// alert($(this).prop('title'));
						hideError();// added for defect no 14600
						addDtlsMultiBuy='';
						if ($('#promotionWeek').val() != 0
								&& $('#promotionWeek').val() != 'Select') {
							// $('#displayType').val('displayTypeSelect');
							// $('#displayType').attr('disabled', 'disabled');
							$('#residualQtyDiv').addClass('hideBlock');
							$('#residualQty').prop('checked',false);
							$('#displayQty').prop('checked',false);//added for defect no 14600
						/*	$('label[for="residualQty"]') // New fix to include display Qty in Current week as well
									.text(
											'Show articles containing display quantity')
									.attr('title',
											'Allows user to review all articles that contain a display quantity');*/
							$('#sortByOptions')
									.val('Display')
									.attr(
											'title',
											'Only Promotional Articles containing a display quantity will be returned tabbed  Display Type by Display Location');
							// $('#displayType').prev().css('color','#d3d3d3');
							/*
							 * if ($('#sortByOptions').val() == 'Display') {
							 * //$('#minDiscount').attr('disabled', 'disabled');
							 * $('#omVal').attr('disabled', 'disabled');
							 * $('#unit,#perc').attr('disabled','disabled');
							 * $('#minDiscount,#displayType,#omVal').prev().css('color','#d3d3d3'); }
							 * else {
							 */
							// $('#minDiscount').removeAttr('disabled',
							// 'disabled');
							$('#omVal').attr('disabled', 'disabled');
							$('#unit,#perc').attr('disabled', 'disabled');
							$('#omVal').prev().css('color', '#d3d3d3');
							$('#omVal').val('');
							// }
						} else {

							// $('#displayType').val('displayTypeSelect');
							// $('#displayType').removeAttr('disabled',
							// 'disabled');
							hideError();// added for defect no 14600
							$('#sortByOptions')
									.val('Category')
									.attr('title',
											'All Promotional Articles returned tabbed Alphabetically by Sub-Categories');
							;
							// $('#displayType').removeAttr('disabled');
							$('#residualQtyDiv').removeClass('hideBlock');
							$('#displayQty').prop('checked',false);//added for defect no 14600
							/*$('label[for="residualQty"]')// New fix to include display Qty in Current week as well
									.text(
											'Show articles with Display > Residual Qty')
									.attr('title',
										//	'Residual Qty = EST. WTD- WTD Overstocks = Display Qty - Residual Qty');
									'Residual Sale Quantity = Estimated Full Weeks Sales minus WTD Sales');*/
							// $('#displayType').prev().css('color','#222222');
							$('#omVal').removeAttr('disabled', 'disabled');
							$('#unit,#perc').removeAttr('disabled', 'disabled');
							$('#omVal').prev().css('color', '#222222');
						}
						$('#promotionWeek').attr(
								'title',
								$(
										'option[value="'
												+ $('#promotionWeek').val()
												+ '"]').attr('title'));
						$('#sortByOptions').attr(
								'title',
								$(
										'option[value="'
												+ $('#sortByOptions').val()
												+ '"]').attr('title'));

						if ($('#promotionWeek').val() != 'Select') {
							getDisplyTypes();
							$('#displayType').attr(
									'title',
									$(
											'option[value="'
													+ $('#displayType').val()
													+ '"]').attr('title'));
						}
						/*
						 * if ($('#sortByOptions').val() == 'Display') {
						 * $('#minDiscount').attr('disabled', 'disabled');
						 * $('#omVal').attr('disabled', 'disabled');
						 * $('#unit,#perc').attr('disabled','disabled');
						 * $('#minDiscount,#omVal').prev().css('color','#d3d3d3'); }
						 * else {
						 */
						/*
						 * $('#minDiscount').removeAttr('disabled', 'disabled');
						 * $('#omVal').removeAttr('disabled', 'disabled');
						 * $('#unit,#perc').removeAttr('disabled','disabled');
						 * $('#minDiscount,#omVal').prev().css('color','#222222');
						 */
						// }
						if(this.value<7 && $('#salesOrg').val()=="1060"){
						//if(this.value<7 ){
							weekDisableFlag=true;
						}else{
							weekDisableFlag=false;
						}
					});

	$('#displayType').change(
			function() {
				$('#displayType').attr(
						'title',
						$('option[value="' + $('#displayType').val() + '"]')
								.attr('title'));
			});

	$('#sortByOptions').change(
			function() {/*
						 * if (($('#promotionWeek').val() != 0 &&
						 * $('#promotionWeek').val()!='Select') &&
						 * $('#sortByOptions').val() == 'Display') {
						 * $('#minDiscount').attr('disabled', 'disabled');
						 * $('#omVal').attr('disabled', 'disabled');
						 * $('#unit,#perc').attr('disabled','disabled');
						 * $('#minDiscount,#omVal').prev().css('color','#d3d3d3'); }
						 * else { $('#minDiscount').removeAttr('disabled',
						 * 'disabled'); $('#omVal').removeAttr('disabled',
						 * 'disabled');
						 * $('#unit,#perc').removeAttr('disabled','disabled');
						 * $('#minDiscount,#omVal').prev().css('color','#222222'); }
						 */
				$('#sortByOptions').attr(
						'title',
						$('option[value="' + $('#sortByOptions').val() + '"]')
								.attr('title'));
			});
	$('#promotionsDropDown').change(
			function() {

				$('#promotionsDropDown')
						.attr(
								'title',
								$(
										'option[value="'
												+ $('#promotionsDropDown')
														.val() + '"]').attr(
										'title'));
			});
	$('#promoType').change(
			function() {
				$('#promoType').attr(
						'title',
						$('option[value="' + $('#promoType').val() + '"]')
								.attr('title'));
			});
	$("#dialog-modal2").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$(".restrict").keydown(function(event) {
		if (event.shiftKey) {
			event.preventDefault();
		}

		if (event.keyCode == 46 || event.keyCode == 8) {
		} else {
			if (event.keyCode < 95) {
				if (event.keyCode < 48 || event.keyCode > 57) {
					event.preventDefault();
				}
			} else {
				if (event.keyCode < 96 || event.keyCode > 105) {
					event.preventDefault();
				}
			}
		}
	});
	/*
	 * $('#warehouse').click(function() { $('#supplier').val(''); });
	 * $('#vendor').click(function() { // $('#supplier').val('');
	 * $('#supplier').focus();
	 * $('#warehouseDropDown').val('warehouseDropDownSelect'); });
	 */
	$('#perc').click(function() {

		$('#omVal').val('');
		$('#omVal').focus();
		$('.diffOm').attr('title', $('label[for="perc"]').attr('title'));
		$('#omVal').attr('maxlength', '2');
	});
	$('#unit').click(function() {
		$('#omVal').val('');
		$('#omVal').focus();
		$('.diffOm').attr('title', $('label[for="unit"]').attr('title'));
		$('#omVal').removeAttr('maxlength');
	});
	$('input[name=searchByOptions]').click(function() {
		$('#articleNo').focus();
	});
	/*
	 * $("#goButtonSample1").click(function() {
	 * 
	 * var vendorNo = $('#vendorDesc').val().split("-")[0]; var vendorName =
	 * $('#vendorDesc').val().split("-")[1]; var sourceSupply =
	 * $('input:radio[name=sourceSupply]:checked').val();
	 * 
	 * $.ajax({ type : "GET", url : "verifySupplier.htm", beforeSend :
	 * function() { $('#statusImg').removeClass('loading hideBlock');
	 * $('#statusImg').addClass('loading'); }, data : { vendorNo : vendorNo,
	 * sourceSupply : sourceSupply, vendorName : vendorName }, success :
	 * function(response) { $('#popupDataDiv').html(response);
	 * $('#statusImg').addClass('loading hideBlock');
	 * $('#statusImg').removeClass('loading'); }, }); } );
	 * $("#verifySupplier").click( function() {
	 * 
	 * var radioSelected = $('input:radio[name=sourceSupply]:checked') .val();
	 * if (radioSelected == "vendor" || radioSelected == "warehouse" ||
	 * radioSelected == "all") { var vendorNo =
	 * $('#supplier').val().split("-")[0]; var vendorName =
	 * $('#supplier').val().split("-")[1]; var sourceSupply = $(
	 * 'input:radio[name=sourceSupply]:checked').val(); if (sourceSupply ==
	 * 'store') { nearbyStore(vendorNo, vendorName, sourceSupply); }
	 * 
	 * else if (($('#supplier').val() != '')) { $.ajax({ type : "GET", url :
	 * "verifySupplier.htm", beforeSend : function() { // hideContent();
	 * $('#statusImg') .removeClass('loading hideBlock');
	 * $('#statusImg').addClass('loading'); }, data : { vendorNo : vendorNo,
	 * sourceSupply : sourceSupply, vendorName : vendorName }, // data :
	 * "vendorNo=" + vendorNo + // "&sourceSupply="+sourceSupply + //
	 * "&vendorName="+vendorName , success : function(response) {
	 * $('#popupDataDiv').html(response); if ($('#sizeCheck').val() == 0) {
	 * $('#alertBox').text('Invalid supplier');
	 * $("#dialog-modal-alertBox").dialog("open"); $('#okBtn').click(
	 * function(e) { $("#dialog-modal-alertBox") .dialog("close"); });
	 * $('#supplier').focus(); } else if ($('#sizeCheck').val() > 1) { if
	 * (!$("#dialog-modal-alertBox").dialog( "isOpen")) { $('#vendorDesc').val(
	 * $('#supplier').val()); $("#dialog-modal1").parent().addClass(
	 * "popupWrapper"); $("#dialog-modal1").dialog("open");
	 * $("#searchWarning").addClass( 'hideBlock');
	 * $("#popupSearch").removeClass( 'hideBlock'); } } else {
	 * $("#supplier").val( $("#suppNo0").text() + "-" + $("#suppName0").text()); }
	 * $('#statusImg').addClass('loading hideBlock');
	 * $('#statusImg').removeClass('loading'); }, }); } else {
	 * $('#alertBox').text('Please fill supplier field');
	 * $("#dialog-modal-alertBox").dialog("open"); $('#okBtn').click(function(e) {
	 * $("#dialog-modal-alertBox").dialog("close"); }); $('#supplier').focus(); } }
	 * 
	 * }); $("#dialog-modal1").dialog({ autoOpen : false, modal : true,
	 * resizable : false, minHeight : 200, maxHeight : 600, width : 700 });
	 * $("#dialog-modal1").parent().addClass("popupWrapper");
	 */
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
	// code for wizard
	$("#promotionsPlanning").jWizard();

	// code to replace text for finish button
	$('.jw-button-next').html('Load Articles');
	$('.jw-button-finish').html('Next');

	// (Temp - Dev team need to change it) Code to show multiple articles popup

	$(".jw-button-next").click(
			function() {
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				// $("#dialog-mulipleArticles" ).dialog("open");

			/*	setTimeout(function() {
					var weekVal = $(
							'#promotionWeek option[value="'
									+ $("#promotionWeek").val() + '"]').text();
					if ($('#articleNo').val().trim() == "")
						$('.wizardTitle').text(
								weekVal + ' : Promotion Plan for '
										+ $(".hierarchyname").val()
										+ ' Sort By :'
										+ $('#sortByOptions').val());
					else
						$('.wizardTitle').text(
								weekVal + ' : Promotion Plan for  Article '
										+ $('#articleNo').val() + ' Sort By :'
										+ $('#sortByOptions').val());
				}, 800);*/
			});

	// Code to show and hide article heirarchy
	$('#departmentInPromotions')
			.change(
					function() {
						$(".hierarchyname")
								.val(
										$(
												'#departmentInPromotions option[value="'
														+ $("#departmentInPromotions")
																.val() + '"]')
												.text());

					});
	$('#depH').click(function() {
		if ($(this).is(':checked')) {
			$("#articleHierarchy").removeClass('hideBlock');
			$('#' + $('#departmentInPromotions').val()).click();
			// $('#departmentInPromotions').val('Select');
			$('#departmentInPromotions').attr('disabled', 'disabled');
		} else {
			$("#articleHierarchy").addClass('hideBlock');
			$('#departmentInPromotions').removeAttr('disabled');
		}
		hideError();
	});

	/* Code for hierarchy */

	$("input[name='departmentList']").click(function() {
		$("#catDiv").find(".noSelection").addClass('hideBlock');
		$("#catDiv").find("ul").removeClass('hideBlock');
		$("#catDiv").find(".totalCount").removeClass('hideBlock');

		$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
		$("#subCatDiv").find("ul").addClass('hideBlock');
		$("#subCatDiv").find(".totalCount").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');

	});

	$("input[name='categoryList']").click(function() {
		$("#subCatDiv").find(".noSelection").addClass('hideBlock');
		$("#subCatDiv").find("ul").removeClass('hideBlock');
		$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
		// $("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');
	});

	$("input[name='subCatList']").click(function() {
		// $("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeIn(400);

		$("#segDiv").find(".noSelection").addClass('hideBlock');
		$("#segDiv").find("ul").removeClass('hideBlock');
		$("#segDiv").find(".totalCount").removeClass('hideBlock');
	});

	$("input[name='segmentList']").click(function() {

	});

	// checks radio buttons in Souce of Supply
	/*
	 * $('#warehouse').click(function() { $('#supplier').val('');
	 * $("#warehouseField").removeClass('hideBlock');
	 * $("#vendorField").addClass('hideBlock');
	 * $("#allField").addClass('hideBlock'); });
	 * 
	 * $('#vendor').click(function() { $('#warehouseDropDown').val('0');
	 * $("#vendorField").removeClass('hideBlock');
	 * $("#warehouseField").addClass('hideBlock');
	 * $("#allField").addClass('hideBlock'); });
	 * 
	 * $('#all').click(function() { $('#warehouseDropDown').val('0');
	 * $('#supplier').val(''); $("#allField").removeClass('hideBlock');
	 * $("#warehouseField").addClass('hideBlock');
	 * $("#vendorField").addClass('hideBlock'); });
	 */

	// Code for inner tabs to dispay sections
	// Code for accordion in the tab section
	$(".accordionWrapper").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	});

	// Code for display qty. for daily basis
	$(".editNumCell").focus(function() {

		if ($(this).next().hasClass('active')) {
			$(this).next().removeClass('active');
		} else {
			$('.stickyForm').removeClass('active');
			$(this).next().addClass('active');
			event.stopPropagation();
		}

	});

	$('html').click(function(event) {
		if (event.target.className.indexOf('editMode') == -1) {
			$(".stickyForm").removeClass('active');
			event.stopPropagation();
		}
	});

	$('.stickyForm').click(function(event) {
		event.stopPropagation();
	});

	// code for setting default parameters for popups
	$("#dialog-mulipleArticles").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 850
	});

	$("#dialog-salesHistory").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 600,
		width : 950
	});

	$("#dialog-MultiBuy").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 600,
		width : 900
	});

	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 800
	});

	// Code for opening popups

	$("#dialog-salesHistory").parent().addClass("popupWrapper");
	$("#dialog-MultiBuy").parent().addClass("popupWrapper");
	$("#dialog-modal").parent().addClass("popupWrapper");

	$(".popupActions .closeBtn").click(function() {
		$("#dialog-mulipleArticles").dialog("close");
		$("#dialog-salesHistory").dialog("close");
		$("#dialog-MultiBuy").dialog("close");
		$("#dialog-modal").dialog("close");
		focusPrevItem();
	});
	$('.closePopUp')
			.click(
					function() {
						if ($(this).parent().parent().attr('aria-describedby') == 'dialog-modal-alert') {
							focusFirstErrorField();
						} else {
							focusPrevItem();
						}
					});

	// Code for tooltip

	$("input.editNumCell").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});

	$("a").tooltip({
		position : {
			my : "left top",
			at : "left top-40"
		}
	});

	$("input.editNumCell").tooltip().off("mouseover mouseout");

	// Code for tree table

	// Code for table row clicking to activate '+' icon code
	$(".rowSection").click(function(e) {
		// alert(e.target.className);

	});

	$(".rowSubTitle").click(function(e) {
		// alert(e.target.className);
	});

	// Code for Store feedback edit in Promotiona Sales History popup

	// Code for text focus highlight
	/*
	 * $('.textbox').focus(function() { if ($(this).val() ==
	 * $(this).attr('placeHolder')) { $(this).val('');
	 * $(this).removeClass("textboxDefaultText"); } });
	 */

	/*
	 * $('.textbox').blur(function() { if ($(this).val() == '') {
	 * $(this).val($(this).attr('placeHolder'));
	 * $(this).addClass("textboxDefaultText"); } });
	 */

	// Date picker code
	Date.format = 'dd/mm/yy';
	$(".inputDateInput").datepicker({
		zIndex : 50
	});

	$(".inputDate").datepicker({
		zIndex : 50
	});

	// Code for global menu
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	/*
	 * // Code for pagination $(selector).pagination({ items : 100, itemsOnPage :
	 * 10, cssStyle : 'compact-theme' });
	 */

	/*----------------******  Department Click function   *****--------------- */
	$("#deptLstCnt").text($("#deptlst li").size());
	deptFlag = "Null";
	var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {
						$('#segmentLst li input').removeProp('checked');
						$('#categoryLst li input').removeProp('checked');
						$('#subCategoryLst li input').removeProp('checked');

						$("#segmentLst").addClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#subCategoryLst").addClass('hideBlock');
						$("#segment").removeClass('hideBlock');
						$("#subCat").removeClass('hideBlock');
						$("#noSelectionCat").addClass('hideBlock');
						$("#segmentLst").addClass('hideBlock');
						$("#subCategoryLst").addClass('hideBlock');
						// my line
						$("#subCatTotal").addClass('hideBlock');
						$("#segmentTotal").addClass('hideBlock');

						$("#categoryLst").removeClass('hideBlock');
						$("#categoryLst").empty();
						$("#categoryLstCnt").text('');
						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');
						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var departmentStr = "";
						var i = 1;

						// if (deptFlag != selectedValue) {
						var deptHierarchyId = parseInt($(selectedValueId).attr(
								'data-tt-id'));
						var servletUrl = 'fetchDetails.htm?iv_parent_node='
								+ selectedValue;
						var c = 0;
						$
								.getJSON(
										servletUrl,
										function(options) {

											if (options) {
												$
														.map(
																options.categoryInfoList,
																function(item) {
																	nodeID = deptHierarchyId
																			+ "."
																			+ i;
																	nodeIdTemp = nodeID
																			+ ".1";
																	departmentStr = '<li><input type="radio" name="category" class="category" data-tt-id="'
																			+ nodeID
																			+ '" data-tt-parent-id="'
																			+ deptHierarchyId
																			+ '" id="'
																			+ item.node
																			+ '" value="'
																			+ item.node
																			+ '"/><label for="'
																			+ item.node
																			+ '" class="lastColumn">'
																			+ item.nodeDesc
																			+ '</label></li>';
																	$(
																			"#categoryLst")
																			.append(
																					departmentStr);
																	i++;
																	deptFlag = selectedValue;
																	$(
																			"#categoryLstTotal")
																			.removeClass(
																					'hideBlock');
																	$(
																			"#categoryLstCnt")
																			.text(
																					$(
																							"#categoryLst li")
																							.size());
																});
											}
											category();
										});

						// }

					});
	/*----------------******  End Department Click function   *****--------------- */

	/*
	 * $('#next').click(function(){
	 * 
	 * });
	 */
	$('#articleNo').keyup(function() {
		hideError();
	});

	// added for one department load
	if ($('#departmentInPromotions option') != undefined
			&& $('#departmentInPromotions option').length == 2) {
		$('#departmentInPromotions').val($('#departmentInPromotions option:nth-child(2)').val());
	}
	$('.fixedHeader').find("th").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});var focused ='';
	$(document).on('keydown','.tabIndex',function(event) {
		focused = $(this).prop('tabindex');
				if (event.shiftKey && event.keyCode == 9) {
					//var focused = $(this).prop('tabindex');
					focused = focused - 1;
					setTimeout(function() {
						$('input[tabindex=' + focused + ']:visible')
								.focus();
						$currentlyFocusedItem = $('input[tabindex='
								+ focused + ']:visible');
					}, 50);
				} else if (event.which == 9) {
					//var focused = $(this).prop('tabindex');

					focused = focused + 1;
					setTimeout(function() {
						$('input[tabindex=' + focused + ']:visible')
								.focus();
						$currentlyFocusedItem = $('input[tabindex='
								+ focused + ']:visible');
					}, 50);
				}
			});
	$('.headWrapper a').bind("click", function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		if (checkForChange()) {
			if (accordOpenFlag)
				showWarn('Do you want to save changes?');
			$('.yesBtn').unbind('click');
			$('.yesBtn').click(function() {
				$('#dialog-modal-alertBox').dialog('close');
				$('.saveBtn:visible').click();
				try {
					previousEvent = '';
					previousEvent = element;
					// event.preventDefault();
				} catch (err) {
					//console.log(err);
				}
			});
			$('.noBtn').unbind('click');
			$('.noBtn').click(function() {
				window.location.href = href;
			});
		} else {
			window.location.href = href;
		}
	});
	
	$("input:visible,select:visible").change(function() { hideError()});//defect 14600
});
function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						$('#segmentLst li input').removeProp('checked');
						// $('#categoryLst li input').removeProp('checked');
						$('#subCategoryLst li input').removeProp('checked');

						$("#segmentLst").addClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#segment").removeClass('hideBlock');
						// my line
						$("#segmentTotal").addClass('hideBlock');

						$("#subCategoryLst").empty();
						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');
						$('#subCat').addClass('hideBlock');
						$('#subCategoryLst').removeClass('hideBlock');
						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var categoryStr = "";
						var i = 1;
						// if (catFlag != selectedValue) {
						var catHierarchyId = ($(selectedValueId)
								.attr('data-tt-id'));
						var servletUrl = 'fetchSubCategoryDetails.htm?iv_parent_node='
								+ selectedValue;
						$
								.getJSON(
										servletUrl,
										function(options) {

											if (options) {
												$
														.map(
																options.subCategoryInfoList,
																function(item) {
																	nodeID = catHierarchyId
																			+ "."
																			+ i;
																	nodeIdTemp = nodeID
																			+ ".1";
																	categoryStr = '<li><input type="radio" name="subCat" class="subCat" data-tt-id="'
																			+ nodeID
																			+ '" data-tt-parent-id="'
																			+ catHierarchyId
																			+ '" id="'
																			+ item.node
																			+ '" value="'
																			+ item.node
																			+ '"/><label for="'
																			+ item.node
																			+ '" class="lastColumn">'
																			+ item.nodeDesc
																			+ '</label></li>';
																	$(
																			'#subCategoryLst')
																			.append(
																					categoryStr);
																	i++;
																	catFlag = selectedValue;
																	$(
																			"#subCatTotal")
																			.removeClass(
																					'hideBlock');
																	$(
																			"#subTotal")
																			.text(
																					$(
																							"#subCategoryLst li")
																							.size());
																});
												$('#segmentBtn').removeClass(
														'hideBlock');
											}
											subCategory();
										});

						// }

					});
	/*----------------******  End Category Click function   *****--------------- */
}
function subCategory() {
	/*----------------******  SubCategory Click function   *****---------------- */
	subCatFlag = "Null";
	$(".subCat")
			.click(
					function() {
						// $('.subCat').click(function() {
						// $(this).removeClass('subCat');

						$('#segment').addClass('hideBlock');
						$('#segmentLst').removeClass('hideBlock');
						$("#segmentBtn").addClass('hideBlock');
						$("#segmentTotalCnt").text('');
						$("#segmentLst").empty();

						var selectedValue = this.id.toString();
						var selectedValueId = "#" + this.id;
						var subCatStr = "";
						var i = 1;
						// if (subCatFlag != selectedValue) {
						var subCatHierarchyId = ($(selectedValueId)
								.attr('data-tt-id'));
						var servletUrl = 'fetchSegmentDetails.htm?iv_parent_node='
								+ selectedValue;
						$
								.getJSON(
										servletUrl,
										function(options) {
											if (options) {
												$
														.map(
																options.segmentInfoList,
																function(item) {

																	subCatStr = '<li><input type="radio" name="segme" class="segment" data-tt-id="" data-tt-parent-id="'
																			+ subCatHierarchyId
																			+ '" id="'
																			+ item.node
																			+ '" value="'
																			+ item.node
																			+ '"/><label for="'
																			+ item.node
																			+ '" class="lastColumn">'
																			+ item.nodeDesc
																			+ '</label></li>';
																	$(
																			'#segmentLst')
																			.append(
																					subCatStr);
																	subCatFlag = selectedValue;

																	$(
																			"#segmentTotal")
																			.removeClass(
																					'hideBlock');
																	$(
																			"#segmentTotalCnt")
																			.text(
																					$(
																							"#segmentLst li")
																							.size());
																});

												$('#segmentBtn').removeClass(
														'hideBlock');

											}
										});

						// }
					});// subcat
	/*----------------******  End SubCategory Click function   *****--------------- */
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
	$("#newerrorMsgDiv").addClass('hideBlock');//defect 14600
}
function addToList() {
	var strIndex = "";
	var id = "";
	$('.article-list').filter(function() {
		if ($(this).find('.checkbox').is(':checked') == true) {
			id = $(this).attr('id');
			if (strIndex != "")
				strIndex = strIndex + ":" + $(this).attr('id');
			else
				strIndex = $(this).attr('id');
		}
	});
	$('#articleNo').val($('#artNo' + id).text());
	selectedArticles = strIndex;
	//console.log(strIndex);
	$('tr td').addClass('cursorProgress');
	if ($("#dialog-modal2").dialog("isOpen"))
		$("#dialog-modal2").dialog("close");
	$('#next').click();

}

function bindMultipleSelect() {
	$('.unselect').click(function() {
		$('.article-list').filter(function() {
			if ($(this).find('.checkbox').is(':checked') == true)
				$(this).find('.checkbox').click();
		});
		$('.article-list').removeClass('hideBlock');
		$('.list-count,.unselect,.warning,.addToList').addClass('hideBlock');
	});
	$('.searchString').text($('#articleNo').val().trim());
	$('.unselect').css('position', 'relative').css('top', '20px').text(
			'Unselect Article');
	$('.checkbox').click(
			function() {
				if ($(this).is(':checked')) {
					articleNo = $(this).parent().parent().find('.art-no')
							.text().trim();
					$('.unselect').removeClass('hideBlock');
					$('.addToList').removeClass('hideBlock');
					$('.article-list').each(function() {
						if (articleNo != $(this).find('.art-no').text().trim())
							$(this).addClass('hideBlock');
						else
							$(this).removeClass('hideBlock');
					});

				} else {
					var countFlag = false;
					$('.article-list').filter(function() {
						if ($(this).find('.checkbox').is(':checked') == true)
							countFlag = true;
					});
					if (countFlag == false) {
						$('.addToList,.unselect').addClass('hideBlock');
						$('.article-list').removeClass('hideBlock');
					}

				}
				var count = 0;
				$('.article-list').filter(function() {
					if ($(this).find('.checkbox').is(':checked') == true)
						count++;
				});
				if (count == 0)
					$('.list-count').addClass('hideBlock');
				else {
					$('.list-count').text('(' + count + ')');
					$('.list-count').removeClass('hideBlock');
				}

				$('.total-count-list').text(
						$('.article-list').length
								- $('.article-list').filter(":hidden").length);
			});

	$('.total-count-list').text(
			$('.article-list').length
					- $('.article-list').filter(":hidden").length);
	/*
	 * setTimeout( function() { if ($('.article-list').length == 0) { if
	 * ($('#articleNo').val() != undefined) articleNo = $('#articleNo').val();
	 * else articleNo = $('#artEan').val(); var articleType =
	 * $('input[name=articleType]:radio:checked') .val(); if
	 * (($('input[name=ibtSiteType]:radio:checked').val() == "Store" ||
	 * $('input[name=ibtSiteType]:radio:checked').val() == "Warehouse" || $(
	 * 'input[name=sourceSupply]:radio:checked').val() == "2") ||
	 * ($('#supplier-no-ibt').val() != undefined && $( '#supplier-no-ibt').val() !=
	 * "")) msg = "Article(s) of description '<strong>" + articleNo + "</strong>'
	 * are already added to the list"; else if (articleType == "description")
	 * msg = "Article(s) of description '<strong>" + articleNo + "</strong>'
	 * related to the vendor '<strong>" + vendorNo + "</strong>' are already
	 * added to the list"; else if (articleType == "ArticleNumber") msg =
	 * "Article number '<strong>" + articleNo + "</strong>' related to the
	 * vendor '<strong>" + vendorNo + "</strong>' is already added to the
	 * list"; else msg = "Article EAN '<strong>" + articleNo + "</strong>'
	 * related to the vendor '<strong>" + vendorNo + "</strong>' is already
	 * added to the list"; $('.dialog-modal2 .popupData').html('');
	 * $('.dialog-modal2 #popupDataDiv2').css('height', '95px') .html(msg); $(
	 * '.dialog-modal2 .ContentTableWrapper,.dialog-modal2 .secondaryActionBtn')
	 * .addClass('hideBlock'); $('.dialog-modal2
	 * .addToList').removeClass('hideBlock')
	 * .removeAttr('onclick').html('OK').attr('onclick',
	 * '$("#dialog-modal2").dialog("close");'); } }, 50);
	 */
	$('.dialog-modal2 .popupActions').css('width', '170px');
}
function bindContentsOfDetail() {

	// $('#cancel').addClass('hideBlock');
	$('.saveBtn').next().addClass('hideBlock');
	$('.jw-menu li:first').unbind('click');
	$('.jw-menu li:first').click(function() {
		if ($('#prev').is(':visible'))
			$('#prev').click();
	});
	$(".accordionWrapper").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
		active : false,
		beforeActivate : function(event, ui) {
			// $('#jquery-loader').css('top', '326.5px');
			// window.scrollTo(0, 0);
			if (checkForChange()) {
				if (accordOpenFlag) {
					event.preventDefault();
				}
			} else {
			}
		}
	});
	$('.ui-tabs-status-default')
			.click(
					function() {
						$(".accordionWrapper").accordion("option", "active",
								99999);
						$('.ui-accordion-header').removeClass('loaded');
						var id = $(this).attr('aria-controls');
						if (!checkForChange() || !accordOpenFlag) {
							setTimeout(
									function() {
										//console.log($('#' + id).find(
												//'.ui-accordion-header')[0]);
										if ($('#' + id).find(
												'.ui-accordion-content').is(
												':visible') == false)
											if ($('#' + id).find(
													'.ui-accordion-header')[0] != undefined)
												$('#' + id).find(
														'.ui-accordion-header')[0]
														.click();
									}, 10);
						}
					});
	
	if($('#sections ul li:first').text().trim()!='In-Store' && $('#sections ul li:first').text().trim()!='% OFF'){
	$('.ui-tabs-status-default.ui-state-active').click();
	}
	$('.letters').click(
			function() {
				$(".accordionWrapper").accordion("option", "active", 99999);
				$('.ui-accordion-header').removeClass('loaded');
				var id = $(this).parent().attr('aria-controls');
				if (!checkForChange() || !accordOpenFlag) {
					setTimeout(
							function() {
								//console.log($('#' + id).find(
										//'.ui-accordion-header')[0]);
								if ($('#' + id).find('.ui-accordion-content')
										.is(':visible') == false)
									$('#' + id).find('.ui-accordion-header')[0]
											.click();
							}, 10);
				}
			});
	// $('.ui-state-active .letters').click();

	$(".history").click(function() {

	});

}
function callTest(event, ui) {
	// $('.accordionWrapper:visible').accordion('option','active',0);
}
function bindHistoryRadioClickEvents(element){
	applyPopUpFilters();
	if(element=="All"){
		$('.appended:visible').filter(function() {
			$(this).removeClass('hideBlock');
		});
	}else{
		$('.appended:visible').filter(function() {
			if ($(this).hasClass(element) )
				$(this).removeClass('hideBlock');
			else
				$(this).addClass('hideBlock');
		});
	}
	$('.filtered-count h4 strong').text($('.appended:visible').length);
	if($('.appended:visible').length>11){
		$('#lastEdit').css('width', '25px');
	}else{
		$('#lastEdit').css('width', '39px');
	}
}
function getPromoAddtionalDtls(articleNo, flag, id, date, event) {
	//console.log(id);
	salesEvent = event;
	
	if(id != 'offers'){
		if (addDtls != articleNo){
			

		$
				.ajax({
					type : "get",
					url : "getPromoAddtionalDtls.htm",
					data : {
						"articleNo" : articleNo,
						"uom" : "",
						"weekStartDate" : date
					},
					// dataType:"json",
					// async:false,
					beforeSend : function() {
						// startLoading();
						fullScreenLoader();
					},
					success : function(response) {
						addDtls = articleNo;
						// +localStorage.setItem(addDtls,response);
						var msg;
						var om = 1;
						try {
							om = $(salesEvent).next().next().find('.om').text();
						} catch (err) {
							console.log(err);
						}
						om = (om != null && om != '' && om != undefined) ? Number(om)
								: 1;
						gOM=om;
						var promoSaleList = null;
						//	var promoOfferList = null;
						var promoAllocation = null;
						var output = $.parseJSON(response);
						var promoArticlelist = output.data;
						if (promoArticlelist != null
								&& promoArticlelist != undefined) {
							promoSaleList = promoArticlelist[0].promoSalesHistList;
						//		promoOfferList = promoArticlelist[0].promoOfferList;
							promoAllocation = promoArticlelist[0].promoAllocation;
						}
						$('.appended').remove();
						if (promoSaleList != null && promoSaleList != undefined
								&& promoSaleList != ''
								&& promoSaleList.length > 0
								&& promoSaleList[0].msg != null
								&& promoSaleList[0].msg.trim() == '') {
							var list = promoSaleList;
							if(list.length>0){
								var radList=["All"];
								for(var i=0;i<list.length;i++){
										radList.push(list[i].articleUom);
								}
								var radListUniq=[];
								radListUniq=unique(radList);
								if(radListUniq.length>2){
									var radioContent='';
									for(var i=0;i<radListUniq.length;i++){
										radioContent+='<input type="radio" name="searchByOptions" value="'+radListUniq[i]+'" id="'+radListUniq[i]+'"><label for="'+radListUniq[i]+'" class="labelText">'+radListUniq[i]+'</label>';
									}
									$('#radioHistoryContentFilter').html(radioContent);
									$('#All').prop("checked", true);
									$("[name='searchByOptions']").unbind("click");
									$("[name='searchByOptions']").click(function(){ 
										bindHistoryRadioClickEvents($(this).val());
									});
									$('#dialog-salesHistory .filterWrapper').removeClass('hideBlock');
								}else{
									$('#dialog-salesHistory .filterWrapper').addClass('hideBlock');
								}
							}
							var content='<table class="ContentTable" cellspacing="0">';
							var i = 0;
							for ( var j = 0; j < list.length; j++) {

								list[j].qtySold = list[j].qtySold != null ? list[j].qtySold
										: "";
								//list[j].qtySold = (list[j].qtySold != "" && list[j].qtySold != undefined) ? (Number(list[j].qtySold) / om).toFixed(0)
								list[j].qtySold = (list[j].qtySold != "" && list[j].qtySold != undefined) ? Math.ceil(Number(list[j].qtySold) / om)
										: 0;
								list[j].fromDate = list[j].fromDate != null ? list[j].fromDate
										: "";
								list[j].toDate = list[j].toDate != null ? list[j].toDate
										: "";
								list[j].promoMedia = list[j].promoMedia != null ? list[j].promoMedia
										: "";
								list[j].promoPrice = list[j].promoPrice != null ? list[j].promoPrice
										: "";
								list[j].additionalInfo = list[j].additionalInfo != null ? list[j].additionalInfo
										: "";
								list[j].promoPrice = (list[j].promoPrice != null && list[j].promoPrice != undefined) ? Number(
										list[j].promoPrice).toFixed(2)
										: "";
								list[j].savings = (list[j].savings != null && list[j].savings != undefined) ? Number(
										list[j].savings).toFixed(2)
										: "";
								list[j].savings = (list[j].savings < 0) ? '0.00'
										: list[j].savings;
								list[j].promoTypeInd = list[j].promoTypeInd != null ? list[j].promoTypeInd
										: "";
								list[j].displayStartDate = list[j].displayStartDate != null ? list[j].displayStartDate
										: "";
								list[j].promoDisplayNo = list[j].promoDisplayNo != null ? list[j].promoDisplayNo
										: "";
								list[j].promoDisplay = list[j].promoDisplay != null ? list[j].promoDisplay
										: "";
								list[j].displayEndDate = list[j].displayEndDate != null ? list[j].displayEndDate
										: "";

								content += '<tr data-savings="'
										+ list[j].savings + '" data-price="'
										+ list[j].promoPrice + '" data-key="'
										+ list[j].fromDate + '_'
										+ list[j].toDate + '_'
										+ list[j].promoDisplay + '_'
										+ list[j].promoDisplayNo+'_'
										+ list[j].articleUom
										+ '" class="histParent  '
										+ list[j].promoTypeInd+ ' '+list[j].articleUom;
								if (i == 0)
									content = content + ' lastrow ';

								content += ' appended" id="row-' + i + '">'
										+ '<td class="centerValue start-date">'
										+ list[j].fromDate
										+ '<span class="hideBlock">'
										+ list[j].sdate + '</spna></td>'
										+ '<td class="centerValue end-date">'
										+ list[j].toDate + '</td>'
										+ '<td class="centerValue">';
								if (list[j].promoPrice != '')
									content += '$';
								content += list[j].promoPrice + '</td>'
										+ '<td class="numberColumn">';
								if (list[j].savings != '')
									content += '$';
								content += list[j].savings + '</td>'
								// + list[j].savings + '</td>'
								+ '<td class="centerValue">'
										+ list[j].promoDisplay + '</td>'
										+ '<td class="centerValue ">'
										+ list[j].promoDisplayNo + '</td>'
										+ '<td class="centerValue">'
										+ list[j].promoMedia + '</td>'
										+ '<td class="centerValue">'
										+ list[j].qtySold + '</td>'
										+ '<td class="centerValue">'
										+ list[j].additionalInfo + '</td>'
										+ '<td id="feedback-' + i + '">';
								if (list[j].feedback != null)
									content = content + list[j].feedback;
								else
									content = content + '';
								content += '</td>'
										+ '<td id="feedbackEdit-'
										+ i
										+ '" class="hideBlock"><textarea id="feedbackValue-'
										+ i + '">';
								if (list[j].feedback != null)
									content = content + list[j].feedback;
								else
									content = content + '';
								content += '</textarea></td>'
										+ '<td class="centerValue"><label class="linkBtn editRowBtn" id="editRecord-'
										+ i
										+ '">'
										+ '<label class="editRecord">Edit</label></label>'
										+ '<label class="linkBtn saveRowBtn hideBlock" id="saveRecord-'
										+ i
										+ '">'
										+ '<label class="saveRecord">Save</label></label></td><td class="hideBlock article">'
										+ list[j].articleNo + '-'
										+ list[j].articleUom + '</td></tr>';
								i++;

							}
							var tFoot='<tfoot><tr class="subHeader"><th class="centerValue" style="background-color: white; color: white;border-right: white;">From</th><th class="centerValue" style="background-color: white; color: white;border-right: white;">To</th><th class="numberColumn" style="width: 39px; background-color: white; color: white;border-right: white;">Price</th><th class="numberColumn" style="width: 39px; background-color: white; color: white;border-right: white;">Saving</th><th class="centerValue" style="background-color: white; color: white;border-right: white;">Type</th><th class="centerValue" style="background-color: white; color: white;border-right: white;">Number</th><th class="centerValue" style="background-color: white; color: white;border-right: white;">Media</th><th class="centerValue" rowspan="2" style="background-color: white; color: white;border-right: white;">Avg. Qty.</th><th rowspan="2" style=" width: 151px; background-color: white; color: white;border-right: white;">Store Info</th><th width="150px" rowspan="2" style=" width: 151px; background-color: white; color: white;border-right: white;">Store Feedback</th><th class="lastColumn centerValue" width="25px" rowspan="2" style="color: white; border-right-color: white; width: 39px; background-color: white;" id="lastEdit">&nbsp;</th></tr></tfoot>';
							var contentHead = '<table class="ContentTable" cellspacing="0"><tbody><tr class="promoSaleHistoryPopupTr"><th class="centerValue" colspan="4" style=" ">Promotion</th><th class="centerValue" colspan="3">Display</th><th class="centerValue" rowspan="2" style=" width: 10px; ">Avg. Qty.<br>Sold</th><th rowspan="2" style=" width: 150px; ">Store Info</th><th width="150px" rowspan="2">Store Feedback</th><th class="lastColumn centerValue" width="25px" rowspan="2" style=" width: 39px; ">&nbsp;</th></tr><tr class="subHeader"><th class="centerValue" style=" width: 62px; ">From</th><th class="centerValue" style=" width: 62px; ">To</th><th class="numberColumn" style=" width: 39px; ">Price</th><th class="numberColumn" style=" width: 38px; ">Saving</th><th class="centerValue" style=" width: 13px; ">Type</th><th class="centerValue" style=" width: 45px; ">Number</th><th class="centerValue" style=" width: 34px; ">Media</th></tr></tbody></table>';
							content += tFoot+'</table>';
							$('#dialog-salesHistory .popupActionsWrapper .saleHistorySaveBtn,#dialog-salesHistory .ContentTableWrapper, #dialog-salesHistory .filtered-count').show();
							$('#dialog-salesHistory .contentHead').html('').html(contentHead);
							$('#dialog-salesHistory .contentBody').html('').html(content);
							$('#dialog-salesHistory .errorAddtnlDtls').remove();
							$('.selectOptions.promoType').val(""); // added for defect 14652
							$('.months').val("");
							bindSalesHistory();
							$('.months').val(13);
							$('.filtered-count h4 strong').text($('.histParent').length);
							if($('.histParent').length>11){
								$('#lastEdit').css('width', '25px');
							}else{
								$('#lastEdit').css('width', '39px');
							}
						} else {
							$('.selectOptions.promoType').val(""); // added for defect 14652
							$('.months').val("");
							$('#dialog-salesHistory .errorAddtnlDtls').remove();
							$(
									'#dialog-salesHistory .popupActionsWrapper .saleHistorySaveBtn,#dialog-salesHistory .ContentTableWrapper, #dialog-salesHistory .filtered-count')
									.hide();
							$('#dialog-salesHistory .popupData')
									.append(
											'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">Sorry, No results found<h4>');
						}

							bindPopUpContent();
							stopLoading();
							$.loader('close');
							if (flag) {
								if (id == 'notpadLink') {
									$("#dialog-modal").dialog("open");
								} else if (id == 'history') {
									$("#dialog-salesHistory").dialog("open");
									$('html').css('overflow','hidden');
									resetScroll();
								} else {
									$("#dialog-MultiBuy").dialog("open");
								}
							}
						},
						error : function() {
							// goToLogin();
							$.loader('close');
						},
					});
		
		}else if (addDtls == articleNo) {
			if (id == 'notpadLink') {
				$("#dialog-modal").dialog("open");
			} else if (id == 'history') {
				$('.months').val(13);
				$('.selectOptions.promoType').val("A");
				//applyPopUpFilters();
				$('#apply').trigger('click');
				$("#dialog-salesHistory").dialog("open");
				$('html').css('overflow','hidden');
				resetScroll();
				$('.filtered-count h4 strong').text($('.appended:visible').length);
			} /*else if (id == "offers") {
				$("#dialog-MultiBuy").dialog("open");
			}*/
		}
	}
	else{
		
		if (addDtlsMultiBuy != articleNo){

			$
					.ajax({
						type : "get",
						url : "getPromoAddtionalDtlsMultiBuy.htm",
						data : {
							"articleNo" : articleNo,
							"uom" : "",
							"weekStartDate" : date
						},
						// dataType:"json",
						// async:false,
						beforeSend : function() {
							// startLoading();
							fullScreenLoader();
						},
						success : function(response) {
							addDtlsMultiBuy = articleNo;
							// +localStorage.setItem(addDtls,response);
							var msg;
							var om = 1;
							try {
								om = $(salesEvent).next().next().find('.om').text();
							} catch (err) {
								console.log(err);
							}
							om = (om != null && om != '' && om != undefined) ? Number(om)
									: 1;
							gOM=om;
							//var promoSaleList = null;
							var promoOfferList = null;
							var promoAllocation = null;
							var output = $.parseJSON(response);
							var promoArticlelist = output.data;
							if (promoArticlelist != null
									&& promoArticlelist != undefined) {
							//	promoSaleList = promoArticlelist[0].promoSalesHistList;
								promoOfferList = promoArticlelist[0].promoOfferList;
								promoAllocation = promoArticlelist[0].promoAllocation;
							}
							//$('.appended').remove();

						if (promoOfferList != null && promoOfferList.length > 0
								&& promoOfferList[0].msg != null
								&& promoOfferList[0].msg.trim() == '') {

								var offerContent = '<table class="ContentTable" cellspacing="0"><tr class=""><th class="centerValue">Article</th><th class="centerValue">UOM</th><th class="centerValue">Week Start Date</th><th class="centerValue">Promo Start Date</th>'
									+ '<th class="centerValue">Promo End Date</th>'
									+ '<th class="centerValue">Store Info</th>'
									// + '<th class="centerValue">Avg. Qty.
									// Sold</th>'
									// + '<th class="centerValue">Store
									// Info</th>'
									// + '<th width="150px">Store Feedback</th>'
									+ '</tr>';
							$('.offerContent').html('');
							// var option = '<div class="parameter "><span
							// class="">';
							/*
							 * $ .each( promoOfferList, function(i, item) {
							 * 
							 * offerContent += '<input type="radio" name="pos"
							 * class="uomRadio" value="' + item.uom + '" id="' +
							 * item.uom + '"'; if (i == 0) option +=
							 * 'checked="true"';
							 * 
							 * option += '><label id="' + item.uom + '"
							 * class="labelText uomRadio" style="display:
							 * inline;">' + item.uom + '</label>'; //
							 * console.log(item.feedback);
							 * 
							 * });
							 */

							// option += '</span></div>';
							$
									.each(
											promoOfferList,
											function(i, item) {

												if (item.promoInfo.split('---').length > 1) {
													tempItemPromInfo = item.promoInfo
															.split('---')[0]
															+ '</br>'
															+ item.promoInfo
																	.split('---')[1]
																	.replace(
																			/\+/g,
																			'+</br>');
												} else {
													tempItemPromInfo = item.promoInfo
															.split('--')[0]
															+ '</br>'
															+ item.promoInfo
																	.split('--')[1];
												}

												offerContent += '<tr><td class="centerValue" > '
														+ articleNo
														+ '</td><td class="centerValue">'
														+ item.uom
														+ '</td><td class="centerValue">'
														+ weekStartDate
														+ '</td><td class="centerValue">'
														/*+ item.offer_no
														+ '</td><td class="centerValue">'*/
														+ item.offerStartDate
														+ '</td><td class="centerValue">'
														+ item.offerEndDate
														+ '</td><td class="centerValue">'
														+ tempItemPromInfo
														+ '</td>' + '</tr>';

											});
							$('.offerContent').html(offerContent);
								$('#dialog-MultiBuy .saleTotalCount').text(promoOfferList.length);
								$('#dialog-MultiBuy .popupActionsWrapper .saleHistorySaveBtn,#dialog-MultiBuy .ContentTableWrapper, #dialog-MultiBuy .alertText').show();
							$('#dialog-MultiBuy .errorAddtnlDtls').remove();
						} else {
							$('#dialog-MultiBuy .errorAddtnlDtls').remove();
								$('#dialog-MultiBuy .popupActionsWrapper .saleHistorySaveBtn,#dialog-MultiBuy .ContentTableWrapper, #dialog-MultiBuy .alertText').hide();
							$('#dialog-MultiBuy .popupData')
									.append(
											'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">Sorry, No results found<h4>');
						}
						bindPopUpContent();
						stopLoading();
						$.loader('close');
						if (flag) {
							if (id == 'notpadLink') {
								$("#dialog-modal").dialog("open");
							} else if (id == 'history') {
								$("#dialog-salesHistory").dialog("open");
							} else {
								$("#dialog-MultiBuy").dialog("open");
							}
						}
					},
					error : function() {
						// goToLogin();
						$.loader('close');
					},
				});
		
		}else if (addDtlsMultiBuy == articleNo) {
		if (id == 'notpadLink') {
			$("#dialog-modal").dialog("open");
		} else if (id == 'history') {
			$('.months').val(13);
			$('.selectOptions.promoType').val("A");
			//applyPopUpFilters();
			$('#apply').trigger('click');
			$("#dialog-salesHistory").dialog("open");
			$('.filtered-count h4 strong').text($('.appended:visible').length);
		} else if (id == "offers") {
			$("#dialog-MultiBuy").dialog("open");
		}
	}
	}
	
}
function bindPopUpContent() {
	var data = "";
	$(".editRowBtn").unbind("click");
	$(".saveRowBtn").unbind("click");
	$(".saleHistorySaveBtn").unbind("click");
	$(".editRowBtn").click(function() {
		var id = (this.id).split('-')[1];

		$(("#row-").concat(id)).addClass('rowHighlight');

		$(("#feedbackEdit-").concat(id)).removeClass('hideBlock');
		$(("#feedback-").concat(id)).addClass('hideBlock');

		$(("#saveRecord-").concat(id)).removeClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');
	});

	/* when save button is clicked displays input box is disabled */
	$(".saveRowBtn").click(
			function() {
				var id = (this.id).split('-')[1];

				$(("#row-").concat(id)).removeClass('rowHighlight');

				if ($(("#feedback-").concat(id)).text().trim() != $(
						("#feedbackValue-").concat(id)).val().trim()) {
					$(this).addClass('changed');
					/*
					 * if(data!='') {
					 * data=data+','+id+':'+$(("#feedbackValue-").concat(id)).val(); }
					 * else
					 * data=data+id+':'+$(("#feedbackValue-").concat(id)).val();
					 */
				}
				$(("#feedback-").concat(id)).text(
						$(("#feedbackValue-").concat(id)).val());
				$(("#feedbackEdit-").concat(id)).addClass('hideBlock');
				$(("#feedback-").concat(id)).removeClass('hideBlock');

				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
			});
	$('.saleHistorySaveBtn')
			.click(
					function() {
						var data = '';
						$('.changed')
								.filter(
										function() {
											{
												var id = (this.id).split('-')[1];
												if (data != '') {
													data = data
															+ ','
															+ $(
																	("#row-")
																			.concat(id))
																	.find(
																			':first span')
																	.text()
															+ ':'
															+ $(
																	("#feedbackValue-")
																			.concat(id))
																	.val()
															+ ':'
															+ $(
																	("#row-")
																			.concat(id))
																	.find(
																			':last')
																	.text();
												} else
													data = data
															+ $(
																	("#row-")
																			.concat(id))
																	.find(
																			':first span')
																	.text()
															+ ':'
															+ $(
																	("#feedbackValue-")
																			.concat(id))
																	.val()
															+ ':'
															+ $(
																	("#row-")
																			.concat(id))
																	.find(
																			':last')
																	.text();
											}
										});
						//console.log(data);
						if (data.trim() != '') {

							$
									.ajax({
										type : "post",
										url : "saveSaleHistoryStoreComment.htm",
										data : {
											recordsIndex : data
										},
										beforeSend : function() {
											startLoading();
											// showAlert("We are getting data,
											// please wait.");
											/*
											 * $('#okBtn,.closePopUp').addClass(
											 * 'hideBlock');
											 */
											fullScreenLoader();
											$('.yesBtn,.noBtn').addClass(
													'hideBlock');
										},
										success : function(response) {
											if (response == 'true') {
												showAlert(
														"Store comments are updated successfully.",
														'bind');

											} else {
												showAlert(response);
											}
											stopLoading();
											$('#okBtn:first,.closePopUp')
													.removeClass('hideBlock');
											$.loader('close');
										},
										error : function() {
											$.loader('close');
										}
									});
						} else {
							showAlert('Sorry! No chages done.');
							// $('#dialog-salesHistory').dialog('close');
						}
					});

}
function showAlert(msg, event) {
	// $("#errorMsgDiv,.tableStart").addClass('hideBlock');
	// $('.ContentTable').remove();
	// $(".tableFooter,.totalRecord").addClass('hideBlock');
	$('#dialog-modal-alertBox').dialog('open');
	$('#dialog-modal-alertBox #alertBox').text(msg);
	$('#okBtn').removeClass('hideBlock');
	$('.yesBtn,.noBtn').addClass('hideBlock');
	if (event == 'bind') {
		$('#dialog-modal-alertBox #okBtn:first').unbind('mousedown');
		$('#dialog-modal-alertBox #okBtn:first').mousedown(
				function() {
					addDtls = '';
					addDtlsMultiBuy='';
					if (salesEvent != '' && salesEvent != undefined
							&& salesEvent != null)
						$(salesEvent).find('.history').click();
				});
	}
}
function showWarn(msg) {
	// $("#errorMsgDiv,.tableStart").addClass('hideBlock');
	// $('.ContentTable').remove();
	// $(".tableFooter,.totalRecord").addClass('hideBlock');
	$('#dialog-modal-alertBox').dialog('open');
	$('#dialog-modal-alertBox #alertBox').text(msg);
	$('#okBtn').addClass('hideBlock');
	$('.yesBtn,.noBtn').removeClass('hideBlock');
}
function warnUser(msg) {
	$('#dialog-modal-alert').dialog('open');
	$('#dialog-modal-alert .alert-text').text(msg);
	$('#ok-btn-alert').removeClass('hideBlock');
	$('#ok-btn-alert').unbind('click');
	$('#ok-btn-alert').click(function() {
		$('#dialog-modal-alert').dialog('close');
		focusFirstErrorField();
	});
}
function getArticles(cateDesc, index) {

}
function getArticles(element, cateDesc, index, subCatId, pageNo) {
	$('.fixedHeader').addClass('hideBlock');
	if (subCatId == 'tabs') {
		element.removeClass('loaded');
	}
	element.next().find('.line-item').remove();
	if (checkForChange()) {
		if (accordOpenFlag)
			showWarn('Do you want to save changes?');
		$('.yesBtn').unbind('click');
		$('.yesBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			$('.saveBtn:visible').click();
			try {
				previousEvent = '';
				previousEvent = element;
				// event.preventDefault();
			} catch (err) {
				//console.log(err);
			}

		});
		$('.noBtn').unbind('click');
		$('.noBtn').click(
				function() {
					$('#dialog-modal-alertBox').dialog('close');
					// console.log(cateDesc);
					accordOpenFlag = false;
					$('.accordionWrapper:visible').accordion('option',
							'active', Number(index));

					loadArticles(element, cateDesc, index, subCatId, pageNo);

				});
	} else if (!(element.hasClass('loaded'))) {
		// accordOpenFlag=true;
		loadArticles(element, cateDesc, index, subCatId, pageNo);
	} else {
		element.removeClass('loaded');
	}
}
function loadArticles(element, cateDesc, index, subCatId, pageNo) {
	var st=new Date().getTime();
	$.loader('close');
	fullScreenLoader();
	previousEvent = '';
	prevPageNo = '';
	accordOpenFlag = true;
	// accordOpenFlag=false;
	$('.' + subCatId + '.loading').parent().addClass('hideBlock');
	$('.ui-accordion-header').removeClass('loaded');
	// fullScreenLoader();
	$('.pageActions,.paginationWrapper').addClass('hideBlock');
	$('.errorDivProm h4').text('');
	CateDesc = cateDesc;
	Index = index;
	var data = {
		cateDesc : CateDesc,
		index : Index,
		nodeId : subCatId,
		pageNoChange : pageNo
	};
	/*
	 * if($('.subHeader.'+subCatId).nextAll().length==0) {
	 */if (subCatId == 'tabs')
		subCatId = 'default-' + index;
	if (subCatId.split(' ')[1] != undefined) {
		subCatId = subCatId.split(' ')[subCatId.split(' ').length - 1] + '-'
				+ Index;
	}
	
	$
			.ajax({
				url : "getArticles.htm",
				data : data,
				type : "post",
				beforeSend : function() {
					startLodingHeader(subCatId);
					if (($(".accordionWrapper").accordion("option", "active") == false && subCatIdFlag != subCatId)
							|| ($(".accordionWrapper").accordion("option",
									"active") != false && subCatIdFlag != subCatId)) {

						subCatIdFlag = subCatId;
					} else
						subCatIdFlag = "";
				},
				success : function(response) {
					var end=new Date().getTime();
					console.log('Time Taken to get the response from the query= '+ (end-st));
					iterateArticles(response, subCatId);
					element.addClass('loaded');
					yearFormatter();
				},
				error : function() {
					// gotoLogin();
				}
			});

}
function getArticlesForPagination(cateDesc, index, subCatId, pageNo) {
	$('.fixedHeader').addClass('hideBlock');
	if (checkForChange()) {
		showWarn('Do you want to save changes?');
		$('.yesBtn').unbind('click');
		$('.yesBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			$('.saveBtn:visible').click();
			prevPageNo = pageNo;

		});
		$('.noBtn').unbind('click');
		$('.noBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			loadNextPage(cateDesc, index, subCatId, pageNo);
		});
	} else {
		loadNextPage(cateDesc, index, subCatId, pageNo);
	}
}
function loadNextPage(cateDesc, index, subCatId, pageNo) {

	fullScreenLoader();
	$('.pageActions,.paginationWrapper').addClass('hideBlock');
	$('.errorDivProm h4').text('');
	CateDesc = cateDesc;
	Index = index;

	var data = {
		cateDesc : CateDesc,
		index : Index,
		nodeId : subCatId,
		paginationFlag : 'Y',
		pageNoChange : pageNo
	};
	/*
	 * if($('.subHeader.'+subCatId).nextAll().length==0) {
	 */if (subCatId == 'tabs')
		subCatId = 'default-' + index;
	$.ajax({
		url : "getPromoArticleDetails.htm",
		data : data,
		type : "post",
		beforeSend : function() {
			startLodingHeader(subCatId);

		},
		success : function(response) {
			iterateArticles(response, subCatId);
			// $.loader('close');

		},
		error : function() {
			// gotoLogin();
		}
	});
	/* } */
}
function startLodingHeader(nodeId) {
	$('.header.' + nodeId).addClass('hideBlock');
	$('.compactTable.' + nodeId).addClass('hideBlock');
	$('.loading' + nodeId).removeClass('hideBlock');
	// $('.loading'+nodeId).addClass('loading');
}
function stopLodingHeader(nodeId) {
	// $('.'+nodeId).addClass('loading hideBlock');
	$('.header.' + nodeId).removeClass('hideBlock');
	$('.compactTable.' + nodeId).removeClass('hideBlock');
	$('.loading' + nodeId).addClass('hideBlock');
	// $('.'+nodeId).removeClass('loading');
}
function bindArticles() {
	$(".inputDate").datepicker("destroy");
	$(".inputDate").datepicker({
		inline : true,
		zIndex : 50
	});

}
function showErrorHeader(text, nodeId) {
	$('.error.' + nodeId).text(text);
	$('.error.' + nodeId).removeClass('tableTitle nodataMessage');
	$('.error.' + nodeId).addClass('tableTitle errorDiv');
	// $.loader('close');
}
function iterateArticles(response, subCatId) {
	var output = $.parseJSON(response);
	var articleList = output.data;
	//console.log('articleList Json********** :' + articleList);
	var msg = output.msg;
	var content = "";
	var j = 0;
	var cellCount = 0;
	if (articleList == null || articleList == undefined
			|| articleList.length == 0) {
		$('.pageActions.' + subCatId).addClass('hideBlock');
		showErrorHeader("Sorry! no results found", subCatId);
		$.loader('close');
	} else if (articleList != null && articleList.length > 0) {
		var article = "";
		var uomCode = "";
		var promoContent = "";
		var uomCount = 0;
		var lastUom = "";
		var tempprom_disp_start_day = '';
		var tempprom_disp_end_day = '';
		var tempObj = '';
		var temp_deactiveFlag = true;
		var $elem = '';
		var sortOptionFlag = ($('#promotionWeek').val() != '0');
		var start_time=new Date().getTime();
		var $visible_accord='';
		var $visible_tab='';
		var $sub_hdr='';
		var $pdbElem='';
		var $sec_tab_nochild='';
		var inner_elm='';
		var pbdarray='';
		var NewArt ='';
		var packNo = '';
		var packUom = '';
		var temp_elem='';
		
		$.each(articleList,function(i, item) {
                                               		 item.instore_promo_type=item.promoType;
							var displayTableHead = '<tr data-tt-id="10" data-tt-parent-id="8" class=" '
									+ article
									+ '-promo-more noChild additionalPromos"><td colspan="18"><table class="secondaryTable" cellspacing="0" width="100%"><tr><th colspan="4" class="centerValue columnDivider">Promotion</th><th colspan="2" class="centerValue columnDivider">Advertising</th><th colspan="2" class="centerValue columnDivider storeSubHr">Store</th><th colspan="1" class="residueTd centerValue columnDivider">Sales</th><th rowspan="2" class="centerValue lastColumn deliverySubHr" width="100px">Delivery Date</th><th rowspan="2" class="centerValue width2" >&nbsp</th></tr><tr class="subHeader"><th style="width:100px" class="centerValue">Day</th><th style="width:150px" class="centerValue">Date</th><th class="numberColumn centerValue">Price</th><th class="numberColumn columnDivider centerValue">Savings</th><th class="columnDivider centerValue ">Display</th><th class="columnDivider centerValue">Media</th><th class="centerValue displayTd" width="50px">Display</th><th class="centerValue buildTd columnDivider" width="50px">Build</th><th class="residueTd centerValue columnDivider" width="50px">Residual</th></tr>';

							item.article = item.article != null ? item.article
									: "";
							item.update_ind = (item.update_ind != null
									&& item.update_ind != undefined && item.update_ind != "") ? item.update_ind
									.toUpperCase()
									: 'N';

							item.instore_promo_type = (item.instore_promo_type != null && item.instore_promo_type != undefined) ? item.instore_promo_type
									.toLocaleUpperCase()
									: "";

							item.promoType = (item.promoType != null && item.promoType != undefined) ? item.promoType
									.toLocaleUpperCase()
									: "";

							item.promoType = item.promoType.replace(disp, 'I')
									.replace(comp, 'I').replace(clr, 'I').replace(ssp, 'I').replace(mkd, 'I').replace(spa, 'I').replace(adt, 'I').replace(lom, 'I');
							item.prom_disp_start_day = item.prom_disp_start_day != null ? item.prom_disp_start_day
									: "";

							item.prom_disp_end_day = item.prom_disp_end_day != null ? item.prom_disp_end_day
									: "";

							item.om = (item.om != null && item.om != 0 && item.om != '') ? item.om
									: 1;

							item.articleDesc = item.articleDesc != null ? item.articleDesc
									: "";
							item.articleUom = item.articleUom != null ? item.articleUom
									: "";
							item.promoPrice = item.promoPrice != null ? "$"
									+ Number(item.promoPrice).toFixed(2) : "";
							item.promoSavings = (item.promoSavings != null) ? "$"
									+ Number(item.promoSavings).toFixed(2)
									: "";
							item.displayType = item.displayType != null ? (item.in_prom_type == 'C' ? item.displayType
									: 'IS')
									: "";
							item.mediaType = item.mediaType != null ? item.mediaType
									: "";
							item.promoForecast = (item.promoForecast != null && item.promoForecast != '0') ? ((item.promoForecast / item.om) != 'NaN' ? (item.promoForecast / item.om)
									.toFixed(0)
									: "")
									: "";
									
								// CR modifications for rouding up build and display qty
							item.oldDisplayQty = (item.oldDisplayQty != null && item.oldDisplayQty != '0') ? ((item.oldDisplayQty / item.om) != 'NaN' ? (oldDispquantityRoundOff(item.oldDisplayQty,item.om)) :"") : "";
							item.orginal_build = (item.orginal_build != null && item.orginal_build != '0') ? ((item.orginal_build / item.om) != 'NaN' ? (item.orginal_build / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_display = (item.orginal_display != null && item.orginal_display != '0') ? ((item.orginal_display / item.om) != 'NaN' ? (item.orginal_display / item.om)
									.toFixed(0)
									: "")
									: "";
							item.orginal_demand = (item.orginal_demand != null && item.orginal_demand != '0') ? ((item.orginal_demand / item.om) != 'NaN' ? (item.orginal_demand / item.om)
									.toFixed(0)
									: "")
									: "";
							item.oldBuildQty = (item.oldBuildQty != null && item.oldBuildQty != '0') ? ((item.oldBuildQty / item.om) != 'NaN' ? (oldBuildquantityRoundOff(item.oldBuildQty,item.om)) :"") : "";
							item.demandQtyUpdateFlag = item.demandQtyUpdateFlag != null ? item.demandQtyUpdateFlag
									: "";
							item.displayQtyUpdateFlag = item.displayQtyUpdateFlag != null ? item.displayQtyUpdateFlag
									: "";
							item.buildQtyUpdateFlag = item.buildQtyUpdateFlag != null ? item.buildQtyUpdateFlag
									: "";
							item.buildLockDownFlag = item.buildLockDownFlag != null ? item.buildLockDownFlag
									: "0";
							item.demandLockDownFlag = item.demandLockDownFlag != null ? item.demandLockDownFlag
									: "0";
							item.displayLockDownFlag = item.displayLockDownFlag != null ? item.displayLockDownFlag
									: "0";
							item.baseForecast = (item.baseForecast != null && item.baseForecast != '0') ? ((item.baseForecast / item.om) != 'NaN' ? (item.baseForecast / item.om)
									.toFixed(0)
									: "0")
									: "0";
							item.promoForecast = (item.promoForecast != null
									&& item.promoForecast != '' && item.promoForecast != '0') ? item.promoForecast
									: (item.baseForecast != null && item.baseForecast != '') ? item.baseForecast
											: '0';
							item.oldDemandQty = (item.oldDemandQty != null && item.oldDemandQty != '0') ? ((item.oldDemandQty / item.om) != 'NaN' ? (item.oldDemandQty / item.om)
									.toFixed(0)
									: item.oldDemandQty)
									: item.oldDemandQty;
							item.oldDemandQty = (item.oldDemandQty == null || item.oldDemandQty
									.trim() == '') ? (item.promoForecast)
									: item.oldDemandQty;

							item.totalNoOfWeeks = item.totalNoOfWeeks != null ? item.totalNoOfWeeks
									: "";
							item.promoWeek = item.promoWeek != null ? item.promoWeek
									: "";
							item.oldDeliveryDate = item.oldDeliveryDate != null ? item.oldDeliveryDate
									: "";
							item.suppNo = item.suppNo != null ? item.suppNo
									.replace(/^0+/, '') : "";
							item.supplierName = item.supplierName != null ? item.supplierName
									: "";
							recordCount = item.recordCount;

							item.packBrkArticleNo = item.packBrkArticleNo != null ? item.packBrkArticleNo
									: "";
							item.displayNo = item.displayNo != null ? (item.in_prom_type == 'C' ? item.displayNo
									: '')
									: "";

							item.weekSalesQty = item.weekSalesQty != null ? ((item.weekSalesQty / item.om) != 'NaN' ? (item.weekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.estWeekSalesQty = item.estWeekSalesQty != null ? ((item.estWeekSalesQty / item.om) != 'NaN' ? (item.estWeekSalesQty / item.om)
									.toFixed(0)
									: "")
									: "";
							item.residual = item.residual != null ? ((item.residual / item.om) != 'NaN' ? (item.residual / item.om)
									.toFixed(0)
									: "")
									: "";
							item.demandMaxLimit = item.demandMaxLimit != null ? item.demandMaxLimit
									: "";
							item.allocationFlag = (item.allocationFlag != null && item.allocationFlag != undefined) ? item.allocationFlag
									: "";

							item.media_desc = item.media_desc != null ? item.media_desc
									: "";
							var promoEndDte = '';
							var deactiveFlag = true;
							// var temp_deactiveFlag=true;
							var currentDate = new Date();
							var actualDelDate = new Date();
							if (item.psaDisplayEndDate.split('/').length > 1) {
								promoEndDte = item.psaDisplayEndDate;
								var splittedDelDate = promoEndDte.split('/');
								var month2 = splittedDelDate[1] - 1;
								actualDelDate.setFullYear(splittedDelDate[2],
										month2, splittedDelDate[0]);
								if (currentDate.getTime() > actualDelDate
										.getTime())
									deactiveFlag = false;
							}
							lockdownFlag = item.lockFlag;
							forecastLock = item.autoFrctFlag;
							currentPage = item.pageNo;
							lockFlag = 0;// item.lockFlag
							editFlagBuild = false;
							editFlagDisplay = false;
							var currentDate = new Date();
							var actualDelDate = new Date();
							/*if (item.psaDisplayStartDate.split('/').length > 1) {
								promoStrtDate = item.psaDisplayStartDate;
								var splittedDelDate = promoStrtDate.split('/');
								var month2 = splittedDelDate[1] - 1;
								actualDelDate.setFullYear(splittedDelDate[2],
										month2, splittedDelDate[0]);
								if (currentDate.getTime() + (86400000 * 2) < actualDelDate
										.getTime())
									editFlagBuild = false;
							}*/
							// As per new requirement the build qty check is modified as below
							if (item.buildOrderDate!=null && item.buildOrderDate.split('/').length > 1) {
								promoStrtDate = item.buildOrderDate;
								var splittedDelDate = promoStrtDate.split('/');
								var month2 = splittedDelDate[1] - 1;
								actualDelDate.setFullYear(splittedDelDate[2],
										month2, splittedDelDate[0]);
								if (currentDate.getTime() + (86400000 * 2) < actualDelDate.getTime()){
									editFlagBuild = false;
								}else{
									editFlagBuild = true;
								}
									
							}
							if (article != item.article) {
								article = item.article;
								uomCode = "";
								if (uomCount != 0) {
									content += '</table></td></tr>';
									uomCount = 0;
								}
								weekStartDate = item.promoStartDate;
								endDate = item.promoEndDate;
								content += promoContent;
								content += '<tr id="'
										+ i
										+ '" data-tt-id="'
										+ Number(j)
										+ '" class="defaultExpanded appendedRow">'
										+ '<td colspan="18" class="rowSection"><img id="'
										+ article
										+ '-promo-trigger" class="add-info-img hideBlock" src="../../images/woolworths/iconOpenAccordion.png"/>'
										+ item.article + ' - '
										+ item.articleDesc
										+ '<label class="hideBlock promDate">'
										+ article + '_' + item.promoStartDate
										+ '</label>';
								// if (item.salesFlag == 'Y') {
								content += '<label class="history additionalDtls float-rig" onclick="">Promotion Sales History</label>';
								// }

								if (item.offerFlag == 'Y') {
									content += '<label class="offers additionalDtls float-rig" onclick="">Multi-buys / Offers / Deals</label>';
								}

								if (item.allocationFlag == 'Y') {
									content += '<label class="notpadLink additionalDtls float-rig" onclick="">Allocations</label>';
								}
								/*
								 * content += '<label class="actionBtn
								 * deactivatedLabel " id="dropdownSelect"
								 * tabindex="3"><a href="#"><label
								 * class="deactivate">De-activate</label>' + '</a></label>';
								 */

								// content+= '<label class="notpadLink
								// additionalDtls float-rig"
								// onclick="">Allocations</label>'
								content += '<label class="rowSubTitle '
										+ item.article
										+ '"><strong>ISIS Article # : </strong>'
										// + item.packBrkArticleNo
										+ '</label>'
										+ '<label class="errorDivPromoo"></label></td></tr><tr class="hideBlock '
										+ i + '"><td colspan="15"></td></tr>';
							} else if (article == item.article
									&& lastUom != item.articleUom
									&& lastUom != "") {
								uomCode = "";
								$('body').append(
										'<label class="packBD">' + article
												+ ',' + item.packBrkArticleNo
												+ ',' + item.articleUom
												+ '</label>');

							} else {
								uomCode = item.articleUom;
							}

							if (uomCode != item.articleUom) {
								tempObj = item;
								tempPrice = item.promoPrice;
								tempSaving = item.promoSavings;
								tempDisplay = item.displayType;
								tempMedia = item.mediaType;
								tempDisplayNo = item.displayNo;
								tempStoDisp = item.oldDisplayQty;
								tempStoBuild = item.oldBuildQty;
								tempWeekToSales = item.weekSalesQty;
								tempEstWeekToSales = item.estWeekSalesQty;
								tempResidual = item.residual;
								tempDelDate = item.oldDeliveryDate;
								tempWeekCnt = item.promoWeek;
								temppsaDisplayStartDate = item.psaDisplayStartDate;
								temppsaDisplayEndDate = item.psaDisplayEndDate;
								tempdispStartAndEndDay = item.dispStartAndEndDay;
								temppsdDisplayStartDate = item.psdDisplayStartDate;
								tempprom_disp_start_day = item.prom_disp_start_day;
								tempprom_disp_end_day = item.prom_disp_end_day;
								tempprom_disp_end_day;
								temp_deactiveFlag = deactiveFlag;
								tempin_prom_type = item.in_prom_type;
								tempmedia_desc = item.media_desc;
								tempi = i;
								content += '<tr data-tt-id="' + Number(j + 1)
										+ '" class="noChild line-item onlyRows';
								if (item.update_ind == 'Y') {
									content += ' updateRow ';
								}

								content += ' " id="' + i + '">'
										+ '<td class="centerValue" ';
								if (item.update_ind == 'Y') {
									content += 'title ="This article has had a change to a key driver" ';
								} else {
									content += ' title="UOM" ';
								}

								content += '> <span id="pdbArticle-'
										+ item.article
										+ '" class="hideBlock">'
										+ item.packBrkArticleNo
										+ '</span>'
										+ item.articleUom
										+ '</td>'

										+ '<td class="centerValue" title="Week">'
										+ item.promoWeek
										+ ' of '
										+ item.totalNoOfWeeks
										+ '</td>'
										+ '<td class="prom-days numberColumn centerValue '
										+ item.article
										+ item.articleUom
										+ '" title="Days"><span class="hideBlock">'
										+ item.promoStartAndEndDay
										+ '</span></td>'
										+ '<td class="numberColumn centerValue priceMore" title="Price">'
										+ item.promoPrice
										+ '</td>'
										+ '<td class="numberColumn centerValue" title="Savings">'
										+ item.promoSavings
										+ '</td>'

										+ '<td class="centerValue displayMore" title="Display"><label>'
										+ item.displayType;
								if (item.displayNo != '')
									content += '-';
								content += item.displayNo
										+ '</label></td>'
										+ '<td class="centerValue columnDivider" title="'
										+ item.media_desc
										+ '">'
										+ item.mediaType
										+ '</td>'
										+ '<td class="centerValue baseForecast" title="Base">'
										+ item.baseForecast
										// + '10'
										+ '</td>'
										+ '<td class="centerValue columnDivider" title="Promotion">'
										+ item.promoForecast
										// + '9'
										+ '</td>'
										+ '<td class="columnDivider om centerValue" title="Om">';
								//omType = WH OM / OM is achieved by commenting above line and uncommenting below line
									//	+ '<td class="columnDivider om centerValue" title="'+item.omType+'">';
								if (item.om != null)
									content = content + item.om;
								else
									content = content + '';

								content = content
										+ '</td>'
										+ '<td class="residueTd centerValue currentweek columnDivider wtd" title="WTD">'
										+ item.weekSalesQty
										// + '9'
										+ '</td>'
										+ '<td class="residueTd centerValue currentweek columnDivider ewtd" title="Est.WTD">'
										+ item.estWeekSalesQty
										// + '9'
										+ '</td>'
										+ '<td class="centerValue"><input id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '"  type="text"  class="editNumCell demandEdit centerValue tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ ' textbox textboxDefaultText restrict editMode storeDemand" maxlength="5" tabindex="1" onfocus="this.select()" value="'
										+ item.oldDemandQty + '"  ';
								
								 if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								 else if (item.demandLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if (((item.promoType != 'I') && (forecastLock == 'Y' && !sortOptionFlag)))
									content = content
											+ 'readonly="readonly" title="'
											+ autoFrctLockMsg + '" ';
								
								else if (item.demandLockDownFlag == '1') {
									content = content
											+ 'title="Decrease in Demand Quantity not allowed" data-td="'
											+ item.demandLockDownFlag + ' - '
											+ item.promoForecast + '-'
											+ item.orginal_demand + '"';
								}
								else if (item.demandLockDownFlag == '3') {
									content = content
											+ 'title="Increase in Demand Quantity not allowed" data-td="'
											+ item.demandLockDownFlag + ' - '
											+ item.promoForecast + '-'
											+ item.orginal_demand + '"';
								}else
									content = content
											+ ' title="Store Demand" ';

								content = content
										+ '></td>'
										+ '<td class="centerValue"><input  tabindex="2"  id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell centerValue tabIndex  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textbox textboxDefaultText restrict editMode  displayQty" maxlength="4" onfocus="this.select()" value="'
										+ item.oldDisplayQty + '"  ';
								
								if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								else if (item.displayLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y'
										&& item.oldDisplayQty < 1
										&& $('#promotionWeek').val() != '0')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								
								else if (item.displayLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Display Quantity not allowed" data-td="'
											+ item.displayLockDownFlag + ' - '
											+ item.oldDisplayQty + '-'
											+ item.orginal_display + '"';
								}else if (item.displayLockDownFlag == '3') {
									content = content
									+ ' title="Increase in Display Quantity not allowed" data-td="'
									+ item.displayLockDownFlag + ' - '
									+ item.oldDisplayQty + '-'
									+ item.orginal_display + '"';
								}else
									content = content
											+ ' title="Store Display" ';

								content = content
										+ '></td>'
										+ '<td class="buildTd centerValue columnDivider"><input  tabindex="3"  id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell  centerValue tabIndex  textbox  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textboxDefaultText restrict editMode centerValue buildQty" onfocus="this.select()" maxlength="4" value="'
										+ item.oldBuildQty + '"  ';
								//console.log(item.buildLockDownFlag
										//+ "item.buildLockDownFlag");
								
								if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								else if (editFlagBuild == true) {
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg + '" ';
								} else if (item.buildLockDownFlag == '2') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								} else if (item.promoWeek != '1') {
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg + '" ';
								} else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								}
								else if (item.buildLockDownFlag == '1') {
									content = content + 'title="Decrease in Build Quantity not allowed" data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
								}
								else if (item.buildLockDownFlag == '3') {
									content = content + 'title="Increase in Build Quantity not allowed" data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
								}else
									content = content + ' title="Store Build" ';

								content = content
										+ '></td>'
										+ '<td class="residueTd centerValue currentweek columnDivider" title="Residual">'
										+ item.residual
										// + '9'
										+ '</td>'
										+ '<td class="residueTd centerValue futureweek hideBlock columnDivider" title="Residual">'
										+ item.residual
										// + '9'
										+ '</td>'
										+ '<td class="residueTd centerValue futureweek hideBlock columnDivider wtd" title="WTD">'
										+ item.weekSalesQty
										// + '9'
										+ '</td>'
										+ '<td class="residueTd centerValue futureweek  hideBlock columnDivider ewtd" title="Est.WTD">'
										+ item.estWeekSalesQty
										// + '9'
										+ '</td>'
										+ '<td class="centerValue supplier-title" title="'
										+ item.supplierName
										+ '">'
										+ item.suppNo
										+ '</td>'
										+ '<td class="centerValue deliveryDtTd "><input onKeyUp="appendDivider(event,this);" placeholder="dd/mm/yy" onfocus="this.select()" id="" type="text" class="deldate textbox textboxDefaultText centerValue tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  inputDate editDateCell  editMode centerValue deliveryDate" ';
								
								if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								else if (editFlagBuild == true) {
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg
											+ '" disabled="disabled " ';
								} else if (item.buildLockDownFlag == '2') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg
											+ '" disabled="disabled " ';
								} else if (item.promoWeek != '1') {
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg
											+ '" disabled="disabled"';
								} 
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg
											+ '"  disabled="disabled "';
								}
								/*
								 * if ((item.promoType != 'I') && lockdownFlag ==
								 * 'Y') { content += ' readonly="readonly"
								 * disabled="disabled " title="' +
								 * lockDownFlagMsg + '"'; }
								 */
								content += ' value="'
										+ item.oldDeliveryDate
										+ '"><label class="hiddenValues centerValue hideBlock" '
										+ '>20/01/2014:0:'
										+ item.oldDemandQty
										// + ':7'
										+ ':'
										+ item.oldDisplayQty
										+ ':'
										+ item.oldBuildQty
										+ ':'
										+ item.oldDeliveryDate
										+ ':'
										+ item.article
										+ item.articleUom
										+ ':'
										+ item.demandMaxLimit
										+ '</label><label class="hiddenValuesFlag hideBlock" '
										+ '>'
										+ item.demandLockDownFlag
										+ ':'
										+ item.displayLockDownFlag
										+ ':'
										+ item.buildLockDownFlag
										+ ':'
										+ item.om
										+ ':'
										+ item.psaDisplayStartDate
										+ '</label></td><td class="centerValue lastColumn ';
								if ((item.instore_promo_type == disp || item.instore_promo_type == comp || item.instore_promo_type == mkd || item.instore_promo_type == adt || item.instore_promo_type == lom) // for defect 8437
										&& deactiveFlag) {
									content = content + ' deactive-icon ';
								}
								content = content
										+ '" data-deactive="'
										+ i
										+ '"></td><td class="hideBlock in_prom_type">'
										+ item.in_prom_type + '</td></tr>';
								if (uomCount != 0) {
									content = content + '</table></td></tr>';
									uomCount = 0;
								}
							} else if (uomCode == item.articleUom
									&& uomCount == 0) {
								content = content
										+ displayTableHead
										+ '<tr class="secondary-line-item line-item onlyRows fist-sub-row ';
								if (tempObj.update_ind == 'Y') {
									content += ' updateRow ';
								}
								content = content + '" id="' + tempi
										+ '">	<td class="centerValue" ';
								if (tempObj.update_ind == 'Y') {
									content += ' title ="This article has had a change to a key driver" ';
								}
								content += '>'
										+ tempdispStartAndEndDay
										+ '<span class="start-end-day hideBlock">'
										+ tempObj.promoStartAndEndDay
										+ '</span></td>'
										+ '<td class="centerValue duration-data">';
								if (temppsdDisplayStartDate != null)
									content = content
											+ tempprom_disp_start_day
													.split('/')[0]
											+ '/'
											+ tempprom_disp_start_day
													.split('/')[1] + ' - '
											+ tempprom_disp_end_day;
								else
									content = content
											+ tempprom_disp_start_day
													.split('/')[0]
											+ '/'
											+ tempprom_disp_start_day
													.split('/')[1] + ' - '
											+ tempprom_disp_end_day;

								content = content
										+ '</td>'
										+ '<td class="numberColumn centerValue">'
										+ tempPrice
										+ '</td>'
										+ '	<td class="numberColumn columnDivider centerValue">'
										+ tempSaving
										+ '</td>'
										+ '<td class="centerValue displayMore">'
										+ tempDisplay;
								if (tempDisplayNo != '')
									content += '-';
								content += tempDisplayNo
										+ '</td>'
										+ '<td class="centerValue columnDivider" title="'
										+ tempmedia_desc
										+ '">'
										+ tempMedia
										+ '</td>'
										+ '<td class="hideBlock centerValue "><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '"  type="text"  class="editNumCell demandEdit centerValue tabIndex ' // demandEdit class added for increasing demand field length due to increased demand limit variation
										+ (cellCount)
										+ '-'
										+ subCatId
										+ ' textbox textboxDefaultText restrict centerValue editMode storeDemand" maxlength="5"  value="'
										+ tempObj.oldDemandQty + '"  ';
								
								 if((tempObj.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								 else if (tempObj.demandLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if ((tempObj.promoType != 'I')
										&& (forecastLock == 'Y' && !sortOptionFlag))
									content = content
											+ 'readonly="readonly" title="'
											+ autoFrctLockMsg + '" ';
								
								else if (tempObj.demandLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Demand Quantity not allowed" data-td="'
											+ tempObj.demandLockDownFlag
											+ ' - ' + tempObj.promoForecast
											+ '-' + tempObj.orginal_demand
											+ '"';
								}
								else if (tempObj.demandLockDownFlag == '3') {
									content = content
											+ ' title="Increase in Demand Quantity not allowed" data-td="'
											+ tempObj.demandLockDownFlag
											+ ' - ' + tempObj.promoForecast
											+ '-' + tempObj.orginal_demand
											+ '"';
								}
								else
									content = content
											+ ' title="Store Demand" ';

								content = content
										+ '></td>'
										+ '<td class="centerValue centerValue"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textbox textboxDefaultText restrict editMode displayQty displayQty-first"  maxlength="4"  value="'
										+ tempStoDisp + '" ';
								
								 if((tempObj.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								 else if (tempObj.displayLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '"  ';
								else if ((tempObj.promoType != 'I')
										&& lockdownFlag == 'Y'
										&& tempObj.oldDisplayQty < 1
										&& $('#promotionWeek').val() != '0')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '"  ';
								 
								else if (tempObj.displayLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Display Quantity not allowed"  data-td="'
											+ tempObj.displayLockDownFlag
											+ ' - ' + tempStoDisp + '-'
											+ tempObj.orginal_display + '"';
								} 
								else if (tempObj.displayLockDownFlag == '3') {
									content = content
											+ ' title="Increase in Display Quantity not allowed"  data-td="'
											+ tempObj.displayLockDownFlag
											+ ' - ' + tempStoDisp + '-'
											+ tempObj.orginal_display + '"';
								} else
									content = content
											+ ' title="Store Display"  ';

								content = content
										+ '></td>'
										+ '<td class="buildTd centerValue  columnDivider"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  textbox  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textboxDefaultText restrict editMode buildQty" value="'
										+ tempStoBuild + '"  ';
								
								  if((tempObj.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (editFlagBuild == true)
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg + '" ';
								else if (tempObj.buildLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if (tempObj.promoWeek != '1')
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg + '" ';
								else if ((tempObj.promoType != 'I')
										&& lockdownFlag == 'Y')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								
								else if (tempObj.buildLockDownFlag == '1') {
									content = content + ' title="Decrease in Build Quantity not allowed" data-td="'
											+ tempObj.buildLockDownFlag + ' - '
											+ tempObj.oldBuildQty + '-'
											+ tempObj.orginal_build + '"';
									// + tempObj.orginal_build + '"';
								} 
								else if (tempObj.buildLockDownFlag == '3') {
									content = content + ' title="Increase in Build Quantity not allowed" data-td="'
											+ tempObj.buildLockDownFlag + ' - '
											+ tempObj.oldBuildQty + '-'
											+ tempObj.orginal_build + '"';
									// + tempObj.orginal_build + '"';
								}else
									content = content + ' title="Store Build" ';
								content = content
										+ '></td>'
										+ '<td class="residueTd centerValue columnDivider">'
										+ tempResidual
										// + '9'
										+ '</td>'
										+ '<td class="centerValue deliveryDtTd "><input onfocus="this.select()" id="" type="text" class="textbox textboxDefaultText tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  inputDate editDateCell   editMode deliveryDate" ';
								/*
								 * if (tempObj.promoWeek != '1') { content += '
								 * readonly="readonly" disabled="disabled" '; }
								 */

								  if((tempObj.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (editFlagBuild == true)
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg + '" ';
								else if (tempObj.buildLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if (tempObj.promoWeek != '1')
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg + '" ';
								else if ((tempObj.promoType != 'I')
										&& lockdownFlag == 'Y')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								

								/*
								 * if ((tempObj.promoType != 'I') &&
								 * lockdownFlag == 'Y') { content += '
								 * readonly="readonly" disabled="disabled "
								 * title="' + lockDownFlagMsg + '"'; }
								 */
								content += ' value="'
										+ tempDelDate
										+ '"><label class="hiddenValues hideBlock" '
										+ '>20/01/2014:0:'
										+ tempObj.oldDemandQty
										// + ':7'
										+ ':'
										+ tempObj.oldDisplayQty
										+ ':'
										+ tempObj.oldBuildQty
										+ ':'
										+ tempObj.oldDeliveryDate
										+ ':'
										+ tempObj.article
										+ tempObj.articleUom
										+ ':'
										+ tempObj.demandMaxLimit
										+ '</label><label class="hiddenValuesFlag hideBlock" '
										+ '>'
										+ tempObj.demandLockDownFlag
										+ ':'
										+ tempObj.displayLockDownFlag
										+ ':'
										+ tempObj.buildLockDownFlag
										+ ':'
										+ tempObj.om
										+ ':'
										+ tempObj.psaDisplayStartDate
										+ '</label></td><td class="hideBlock in_prom_type">'
										+ tempin_prom_type + '</td>';
								// $$$$$$instore
								if ((tempObj.instore_promo_type == disp || tempObj.instore_promo_type == comp)
										&& temp_deactiveFlag) {// @@@@@
									if (tempObj.isDeactivated) {
										content = content + '<td>'
												+ deactivated + '</td>'
												+ '</tr>';
									} else
										content = content
												+ '<td class="centerValue lastColumn deactive-icon" data-deactive="'
												+ tempi + '"></td>' + '</tr>';
								} else {
									content = content + '<td></td>' + '</tr>';
								}
								content = content
										+ '<tr class="secondary-line-item line-item onlyRows ';
								
								if (item.update_ind == 'Y') {
									content += ' updateRow ';
								}
								
								content = content + '" id="'
										+ i
										+ '"><td class=" centerValue">'

										+ item.dispStartAndEndDay
										+ '<span class="start-end-day hideBlock">'
										+ item.promoStartAndEndDay
										+ '</span></td>'
										+ '<td class="centerValue duration-data">';
								if (item.prom_disp_start_day != null)
									content = content
											+ item.prom_disp_start_day
													.split('/')[0]
											+ '/'
											+ item.prom_disp_start_day
													.split('/')[1] + ' - '
											+ item.prom_disp_end_day;
								// else
								// content = content
								// + item.prom_disp_start_day
								// .split('/')[0]
								// + '/'
								// + item.prom_disp_start_day
								// .split('/')[1] + ' - '
								// + item.prom_disp_end_day;

								content = content
										+ '</td>'

										+ '<td class="numberColumn centerValue">'
										+ item.promoPrice
										+ '</td>'
										+ '	<td class="numberColumn  centerValue columnDivider">'
										+ item.promoSavings
										+ '</td>'
										+ '<td class="centerValue displayMore"><label>'
										+ item.displayType;
								if (item.displayNo != '')
									content += '-';
								content += item.displayNo
										+ '</label></td>'
										+ '<td class="centerValue columnDivider" title="'
										+ item.media_desc
										+ '">'
										+ item.mediaType
										+ '</td>'
										+ '<td class="hideBlock centerValue"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '"  type="text"  class="editNumCell demandEdit tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ ' textbox textboxDefaultText restrict editMode storeDemand" maxlength="5" value="'
										+ item.oldDemandQty + '" ';
							
								  if((item.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (item.demandLockDownFlag == '2')
									content = content
											+ 'readonly="readonly"  title="'
											+ lockFlagMsg + '" ';
								else if ((item.promoType != 'I')
										&& (forecastLock == 'Y' && !sortOptionFlag))
									content = content
											+ 'readonly="readonly"  title="'
											+ autoFrctLockMsg + '" ';
								
								else if (item.demandLockDownFlag == '1') {
									content = content
											+ '  title="Decrease in Demand Quantity not allowed" data-td="'
											+ item.demandLockDownFlag + ' - '
											+ item.promoForecast + '-'
											+ item.orginal_demand + '"';
								}else if (item.demandLockDownFlag == '3') {
									content = content
									+ '  title="Increase in Demand Quantity not allowed" data-td="'
									+ item.demandLockDownFlag + ' - '
									+ item.promoForecast + '-'
									+ item.orginal_demand + '"';
						}
								else
									content = content
											+ '  title="Store Demand" ';

								content = content
										+ '></td>'
										+ '<td class="centerValue"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textbox textboxDefaultText restrict editMode displayQty"  maxlength="4" value="'
										+ item.oldDisplayQty + '"  ';
								
								  if((item.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (item.displayLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y'
										&& item.oldDisplayQty < 1
										&& $('#promotionWeek').val() != '0')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								
								else if (item.displayLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Display Quantity not allowed" data-td="'
											+ item.displayLockDownFlag + ' - '
											+ item.oldDisplayQty + '-'
											+ item.orginal_display + '"';
								} 
								else if (item.displayLockDownFlag == '3') {
									content = content
											+ ' title="Increase in Display Quantity not allowed" data-td="'
											+ item.displayLockDownFlag + ' - '
											+ item.oldDisplayQty + '-'
											+ item.orginal_display + '"';
								} else
									content = content
											+ ' title="Store Display" ';

								content = content
										+ '></td>'
										+ '<td class="buildTd centerValue columnDivider"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  textbox  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textboxDefaultText restrict editMode buildQty" maxlength="4" value="'
										+ item.oldBuildQty + '" ';
								
								 if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								 else if (editFlagBuild == true)
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg + '" ';
								else if (item.buildLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if (item.promoWeek != '1')
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg + '" ';
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y')
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg + '" ';
								 
								else if (item.buildLockDownFlag == '1') {
									content = content + ' title="Decrease in Build Quantity not allowed"  data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
									// + item.orginal_build + '"';
								} 
								else if (item.buildLockDownFlag == '3') {
									content = content + ' title="Increase in Build Quantity not allowed"  data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
									// + item.orginal_build + '"';
								} else
									content = content + ' title="Store Build" ';

								content = content
										+ '></td>'
										+ '<td class="residueTd centerValue columnDivider">'
										+ item.residual
										// + '9'
										+ '</td>'
										+ '<td class="centerValue deliveryDtTd "><input onfocus="this.select()" id="" type="text" class="textbox textboxDefaultText tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  inputDate editDateCell  editMode deliveryDate" ';
								/*
								 * if (item.promoWeek != '1') { content += '
								 * readonly="readonly" disabled="disabled " '; }
								 */
								
								 if((item.promoType != 'I') && weekDisableFlag){
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								}
								 else if (editFlagBuild == true) {
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg
											+ '" disabled="disabled " ';
								} else if (item.buildLockDownFlag == '2') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg
											+ '" disabled="disabled " ';
								} else if (item.promoWeek != '1') {
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg
											+ '" disabled="disabled "';
								} else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg
											+ '"  disabled="disabled "';
								} 
								/*
								 * if ((item.promoType != 'I') && lockdownFlag ==
								 * 'Y') { content += ' readonly="readonly"
								 * disabled="disabled " title="' +
								 * lockDownFlagMsg + '"'; }
								 */
								content += ' value="'
										+ item.oldDeliveryDate
										+ '"><label class="hiddenValues hideBlock" '
										+ '>20/01/2014:0:'
										+ item.oldDemandQty
										// + ':7'
										+ ':'
										+ item.oldDisplayQty
										+ ':'
										+ item.oldBuildQty
										+ ':'
										+ item.oldDeliveryDate
										+ ':'
										+ item.article
										+ item.articleUom
										+ ':'
										+ item.demandMaxLimit
										+ '</label><label class="hiddenValuesFlag hideBlock" '
										+ '>'
										+ item.demandLockDownFlag
										+ ':'
										+ item.displayLockDownFlag
										+ ':'
										+ item.buildLockDownFlag
										+ ':'
										+ item.om
										+ ':'
										+ item.psaDisplayStartDate
										+ '</label></td><td class="hideBlock in_prom_type">'
										+ item.in_prom_type + '</td>';
								// $$$$$$instore
								//console.log(' Prom Type :'+item.instore_promo_type +
										//'  comp :'+ comp +'  deactiveFlag :' + deactiveFlag +' Is deactivated :'+ item.isDeactivated);
								if ((item.instore_promo_type == disp || item.instore_promo_type==comp || item.instore_promo_type == mkd || item.instore_promo_type == adt)
										&& deactiveFlag) {// @@@@@
									//console.log('Is de activated >>>>>>> '+item.isDeactivated);
									if (item.isDeactivated) {
										content = content + '<td>'
												+ deactivated + '</td>'
												+ '</tr>';
									} else
										content = content
												+ '<td class="centerValue lastColumn deactive-icon" data-deactive="'
												+ i + '"></td>' + '</tr>';
								} else {
									content = content + '<td></td>' + '</tr>';
								}
								if ((i + 1) == (articleList.length)) {
									content = content + '</table></td></tr>';
								}
								uomCount++;
							} else if (uomCode == item.articleUom
									&& uomCount != 0) {
								content = content
										+ '<tr class="secondary-line-item line-item onlyRows ';
								if (item.update_ind == 'Y') {
									content += ' updateRow ';
								}
								content = content + '" id="' + i + '" '
										+ 'data-promoOfferNo="'
										+ item.promOfferNo + '" ' + '> '
										+ '<td class=" centerValue duration-data" ';
								if (item.update_ind == 'Y') {
									content += ' title ="This article has had a change to a key driver" ';
								}
								content += '>'
										+ item.dispStartAndEndDay
										+ '<span class="start-end-day hideBlock">'
										+ item.promoStartAndEndDay
										+ '</span></td>'
										+ '<td class="centerValue">';
								if (item.prom_disp_start_day != null)
									content = content
											+ item.prom_disp_start_day
													.split('/')[0]
											+ '/'
											+ item.prom_disp_start_day
													.split('/')[1] + ' - '
											+ item.prom_disp_end_day;
								else
									content = content
											+ item.prom_disp_start_day
													.split('/')[0]
											+ '/'
											+ item.prom_disp_start_day
													.split('/')[1] + ' - '
											+ item.prom_disp_end_day;

								content = content
										+ '</td>'

										+ '<td class="numberColumn centerValue">'
										+ item.promoPrice
										+ '</td>'
										+ '	<td class="numberColumn centerValue columnDivider">'
										+ item.promoSavings
										+ '</td>'
										+ '<td class="centerValue displayMore"><label>'
										+ item.displayType;
								if (item.displayNo != '')
									content += '-';
								content += item.displayNo
										+ '</label></td>'
										+ '<td class="centerValue columnDivider" title="'
										+ item.media_desc
										+ '">'
										+ item.mediaType
										+ '</td>'
										+ '<td class="hideBlock centerValue"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '"  type="text"  class="editNumCell demandEdit tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ ' textbox textboxDefaultText  restrict editMode storeDemand" maxlength="5" value="'
										+ item.oldDemandQty + '"  ';
								 if((item.promoType != 'I') && weekDisableFlag)
									content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								 else if (item.demandLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if ((item.promoType != 'I')
										&& (forecastLock == 'Y' && !sortOptionFlag))
									content = content
											+ 'readonly="readonly" title="'
											+ autoFrctLockMsg + '" ';
								 
								else if (item.demandLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Demand Quantity not allowed" data-td="'
											+ item.demandLockDownFlag + ' - '
											+ item.promoForecast + '-'
											+ item.orginal_demand + '"';
								}
								else if (item.demandLockDownFlag == '3') {
									content = content
											+ ' title="Increase in Demand Quantity not allowed" data-td="'
											+ item.demandLockDownFlag + ' - '
											+ item.promoForecast + '-'
											+ item.orginal_demand + '"';
								}
								else
									content = content + '';

								content = content
										+ '></td>'
										+ '<td class="centerValue"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textbox textboxDefaultText restrict editMode displayQty"  maxlength="4" value="'
										+ item.oldDisplayQty + '"';
								
								  if((item.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (item.displayLockDownFlag == '2')
									content = content
											+ 'readonly="readonly"  title="'
											+ lockFlagMsg + '" ';
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y'
										&& item.oldDisplayQty < 1
										&& $('#promotionWeek').val() != '0')
									content = content
											+ 'readonly="readonly"  title="'
											+ lockDownFlagMsg + '" ';
								
								else if (item.displayLockDownFlag == '1') {
									content = content
											+ ' title="Decrease in Display Quantity not allowed"  data-td="'
											+ item.displayLockDownFlag + ' - '
											+ item.oldDisplayQty + '-'
											+ item.orginal_display + '"';
								}
								else if (item.displayLockDownFlag == '3') {
									content = content
									+ ' title="Increase in Display Quantity not allowed"  data-td="'
									+ item.displayLockDownFlag + ' - '
									+ item.oldDisplayQty + '-'
									+ item.orginal_display + '"';
								}
								else
									content = content
											+ ' title="Store Display" ';

								content = content
										+ '></td>'
										+ '<td class="buildTd centerValue columnDivider"><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="editNumCell tabIndex  textbox  '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  textboxDefaultText restrict editMode buildQty" maxlength="4" value="'
										+ item.oldBuildQty + '"  ';
								
								  if((item.promoType != 'I') && weekDisableFlag)
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  else if (editFlagBuild == true)
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg + '" ';
								else if (item.buildLockDownFlag == '2')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								else if (item.promoWeek != '1')
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg + '" ';
								else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y')
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg + '" ';
								
								else if (item.buildLockDownFlag == '1') {
									content = content + ' title="Decrease in Build Quantity not allowed" data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
								}
								else if (item.buildLockDownFlag == '3') {
									content = content + ' title="Increase in Build Quantity not allowed" data-td="'
											+ item.buildLockDownFlag + ' - '
											+ item.oldBuildQty + '-'
											+ item.orginal_build + '"';
								}else
									content = content + ' title="Store Build" ';

								content = content
										+ '></td>'
										+ '<td class="residueTd centerValue columnDivider">'
										+ item.residual
										// + '9'
										+ '</td>'
										+ '<td class="centerValue deliveryDtTd "><input onfocus="this.select()" id="'
										+ (++cellCount)
										+ '-'
										+ subCatId
										+ '" type="text" class="textbox textboxDefaultText tabIndex '
										+ (cellCount)
										+ '-'
										+ subCatId
										+ '  inputDate editDateCell  editMode deliveryDate" ';
								
								  if((item.promoType != 'I') && weekDisableFlag){
										content = content+ 'readonly="readonly" title="'+ weekLockMsg + '"  disabled="disabled"';
								  }
								  else if (editFlagBuild == true) {
									content = content
											+ 'readonly="readonly" title="'
											+ buildLock2DayPriorMsg
											+ '" disabled="disabled " ';
								} else if (item.buildLockDownFlag == '2') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockFlagMsg
											+ '" disabled="disabled " ';
								} else if (item.promoWeek != '1') {
									content = content
											+ 'readonly="readonly" title="'
											+ buildFirstWeekLockMsg
											+ '" disabled="disabled "';
								} else if ((item.promoType != 'I')
										&& lockdownFlag == 'Y') {
									content = content
											+ 'readonly="readonly" title="'
											+ lockDownFlagMsg
											+ '"  disabled="disabled "';
								}

								/*
								 * if (item.promoWeek != '1') { content += '
								 * readonly="readonly" disabled="disabled " '; }
								 */
								content += 'value="'
										+ item.oldDeliveryDate
										+ '"><label class="hiddenValues hideBlock" '
										+ '>20/01/2014:0:'
										+ item.oldDemandQty
										// + ':7'
										+ ':'
										+ item.oldDisplayQty
										+ ':'
										+ item.oldBuildQty
										+ ':'
										+ item.oldDeliveryDate
										+ ':'
										+ item.article
										+ item.articleUom
										+ ':'
										+ item.demandMaxLimit
										+ '</label><label class="hiddenValuesFlag hideBlock" '
										+ '>'
										+ item.demandLockDownFlag
										+ ':'
										+ item.displayLockDownFlag
										+ ':'
										+ item.buildLockDownFlag
										+ ':'
										+ item.om
										+ ':'
										+ item.psaDisplayStartDate
										+ '</label></td><td class="hideBlock in_prom_type">'
										+ item.in_prom_type + '</td>';
								// $$$$$$instore
								if ((item.instore_promo_type == disp || item.instore_promo_type ==comp || item.instore_promo_type == mkd || item.instore_promo_type == adt)
										&& deactiveFlag) {// @@@@@
									if (item.isDeactivated) {
										content = content + '<td>'
												+ deactivated + '</td>'
												+ '</tr>';
									} else
										content = content
												+ '<td class="centerValue lastColumn deactive-icon" data-deactive="'
												+ i + '"></td>' + '</tr>';
								} else {
									content = content + '<td></td>' + '</tr>';
								}

								if ((i + 1) == (articleList.length)) {
									content = content + '</table></td></tr>';
								}
								uomCount++;
							}
							promoContent = '<tr class="hideBlock ' + article
									+ '-promo" data-tt-id="' + Number(j + 2)
									+ '" data-tt-parent-id="' + Number(j++)
									+ '" class="noChild"><td colspan="15">'
									+ '<label class="hideBlock promDate">'
									+ article + '_' + item.promoStartDate
									+ '</label>';
							// if (item.salesFlag == 'Y') {
							// promoContent += '<label class="history
							// additionalDtls" onclick="">Promotion Sales
							// History</label>';
							promoContent += '<label class="history additionalDtls float-rig" onclick="">Promotion Sales History</label>';
							// }

							if (item.offerFlag == 'Y') {
								promoContent += '<label class="offers additionalDtls" onclick="">Multi-buys / Offers / Deals</label>';
							}
							if (item.allocationFlag == 'Y') {
								promoContent += '<label class="notpadLink additionalDtls" onclick="">Allocations</label>';
							}
							/*
							 * promoContent += '<label class="actionBtn
							 * deactivatedLabel " id="dropdownSelect"
							 * tabindex="3"><a href="#"><label
							 * class="deactivate">De-activate</label>' + '</a></label>';
							 */

							promoContent += '<span class="hideBlock">'
									+ item.packBrkArticleNo
									+ '</span></td></tr>';
							lastUom = item.articleUom;
							if ((i + 1) == (articleList.length)) {
								if (content.split('<table>').length > 1) {
									content += '</table></td></tr>';
								}
								content += promoContent;
								// }

							}
							// '</table></td></tr>'
						});
		
		console.log('Time taken to iterate the 20 records'+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		// content = content + promoContent;
		$visible_accord=$('.accordionWrapper:visible');
		$first_accord=$('.accordionWrapper:first');
		if($visible_accord==undefined || $visible_accord.length== 0){
			$visible_tab=$('.ui-tabs-panel:visible');
		}
		
		if ($visible_accord != undefined
				&& $visible_accord.length > 0) {
			$elem = $visible_accord;
		} else if ($visible_tab != undefined
				&& $visible_tab.length > 0) {
			$elem = $visible_tab;
		} else if($first_accord!= undefined
				&& $first_accord.length > 0){
			$elem = $first_accord;
		}else{
			$elem = '';
		}
		
		//PERFORMANCE FIX
		if($elem!=''){
			$elem_inner=$elem.find('h3.ui-state-focus');
			if($elem_inner!=undefined && $elem_inner.length > 0){
				$elem_inner = $elem_inner.next();
			}else {
				if($elem_inner==undefined || $elem_inner.length == 0){
					$elem_inner=$elem.find('.accordionContentHolder.ui-accordion-content-active');
				}
				if($elem_inner==undefined || $elem_inner.length == 0) {			
					$elem_inner=$elem.find('.accordionContentHolder:visible');
				}
				if($elem_inner==undefined || $elem_inner.length == 0) {	
					$elem_inner =$elem;
				}
			}
			$elem=$elem_inner;
		}
		
		// changed for the prod performance fix
		if ($elem == '') {
			$('.subHeader.' + subCatId).nextAll().remove();
			$(content).insertAfter('.subHeader.' + subCatId);
			$('.recordCount.' + subCatId).text(recordCount);
		} else {
			$sub_hdr=$elem.find('.subHeader:first');
			$sub_hdr_prev=$sub_hdr.prev();
			$sub_hdr.nextAll().detach();
			var $header=$sub_hdr.closest('tbody');
			//var head_second_row=$('<div>').append($sub_hdr_prev.clone()).remove().html();
			//var head_first_row=$('<div>').append($sub_hdr.clone()).remove().html();
			$header.append(content);
			$elem.find('.recordCount').text(recordCount);
			}
		console.log('Time Taken to identify and append the iterated content='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		
		stopLodingHeader(subCatId);
		console.log('bind the save buttons='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		
		if($elem!=undefined && $elem.length>0){// for Defect_14779
			
		$sec_tab_nochild=$elem.find('.secondaryTable .noChild');
		if($sec_tab_nochild!=undefined && $sec_tab_nochild.length>0){
			$elem.find('.secondaryTable .noChild').filter(function() {
			$(this).parent().parent().parent().parent().after($(this));
		});
		}
		}
		$pdbElem=$('.packBD');
		$('body .packBD').remove();
		$pdbElem.filter(function() {
			inner_elm=$(this);
			pbdarray=inner_elm.text().trim().split(',');
			NewArt =pbdarray[0];
			packNo = pbdarray[1];
			packUom = pbdarray[2];
			temp_elem=$('.packBreakDown');
			if(temp_elem!=undefined && temp_elem.length>0){
			$('.packBreakDown').filter(function() {
				var art = $(this).find('.article-pbd').text().trim();
				if (NewArt == art)
					$(this).append(', ' + packUom + ' ' + packNo);
			});
							}
						});
		
		bindActionBtns($elem, subCatId);
		//}
		
		console.log('bind events on iterate methods='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		
		setDay(weekStartDate);
		console.log('day calucuation logic time='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		//$('.jw-steps-wrap .secondaryActionBtn').attr('disabled', 'disabled');
		
		var itemsOnPage = 20;
		var pageEle = '';
		if ($elem == '') {
			pageEle = $('.subHeader.' + subCatId).closest(
					'.ContentTableWrapper').find('.paginationWrapper');
			$elem = $('.subHeader.' + subCatId).closest('.ContentTableWrapper');
		} else {
			pageEle = $elem.find('.paginationWrapper');
		}
		if (recordCount  > 20) {
			$(pageEle).removeClass('hideBlock');
		$(pageEle).pagination(
				{
					items : recordCount,
					itemsOnPage : itemsOnPage,
					cssStyle : 'compact-theme',
					currentPage : currentPage,
					selectOnClick : false,
					onPageClick : function(pageNumber, event) {
						getArticlesForPagination(CateDesc, Index, subCatId,
								pageNumber);
					}
				});
		} else {
			$(pageEle).addClass('hideBlock');
		}
		console.log('time take to trigger pagination='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
	
	$('.' + subCatId + '.loading').parent().removeClass('hideBlock');
		
		$elem.find('.scrollWindow:visible').css('width', '980px');
		$elem.find('.tableScroller').css('display', 'none');
		
	if ($('.subHeader.' + subCatId).next().hasClass('appendedRow')) {
		$.loader('close');
		$('.pageActions').removeClass('hideBlock');
	
		if ($('#promotionWeek').val() == 0) {
			$('.currentweek').removeClass('hideBlock');
			$('.futureweek').remove();
		} else {
			$('.futureweek').removeClass('hideBlock');
			$('.currentweek').remove();
		}
		clearInterval();
	}
		if (recordCount != '' && recordCount != undefined && recordCount != null
				&& currentPage != undefined && currentPage != ''
				&& currentPage != null && recordCount > 20) {

			var start = 1;
			if (currentPage == 1)
				start = 1;
			else
				start = ((Number(currentPage) - 1) * 20) + 1;

			var end = start + 19;
			if (recordCount < end)
				end = recordCount;
			$elem.find('.recordCount').parent().parent().html(
					'<h4>Articles <strong class="recordCount">' + start + '-' + end
							+ '</strong> of <strong>' + recordCount
							+ '</strong></h4>');
		}

		if ($elem!= undefined && $elem.length > 0){
			 //$(document).scrollTop($elem.parent().offset().top);
			 $('body').animate({'scrollTop' : $elem.offset().top});
		}
		console.log('time take to check content is appended='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		
		
		loadSearchDtl();
	allignTheHeader();
		console.log('time take to allign header='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();

		$('.treetable input').click(function() {
			$currentlyFocusedItem = $(this);
		});
		
	bindLockDown($elem, subCatId);
		console.log('time take to bind the lock down='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
		
		
	securityMatrix();
		console.log('time take to initialise security matrix='+(new Date().getTime()-start_time));
		start_time=new Date().getTime();
	
	} else if (msg != null && msg.trim().length > 0) {
		$('.pageActions.' + subCatId).addClass('hideBlock');
		showErrorHeader(msg, subCatId);
		$.loader('close');
	}
}
var key = '';
var editString = '';
function bindActionBtns($ele, subCatId) {
	var $saveBtn='';
	var $accord_hold='';
	var $line_items='';
	var index ='';
	if ($ele == '') {
		$ele = $('.subHeader.' + subCatId).closest('.ContentTableWrapper')
				.parent();
	}
	$saveBtn=$ele.find('.saveBtn');
	$saveBtn.unbind('click');
	key = '';
	
	if($saveBtn!=undefined && $saveBtn.length>0){
			
			$saveBtn.bind('click',function() {
						editString = '';
					$accord_hold=$saveBtn.closest('.ui-accordion-content');
					if($accord_hold== undefined || $accord_hold.length ==0){
						$accord_hold = $saveBtn.closest('.ui-tabs-panel');
					}
					
					$line_items=$accord_hold.find('.line-item');
					
					if($line_items==undefined || $line_items.length==0){
						return false;
					}
					if ($accord_hold.find('.next').hasClass(
								'page-link') == false)
							nextAccClick = "#"
								+ $accord_hold.next().attr('id');
						else
							nextAccClick = 'false';
					index = -1;
						wrngStore = '';
					key = '';
					var buildError =false;
					var demandError =false;
					var displayError =false;
					var deliveryError =false;
					var errorText='';
					var buildWarn ='';
					var demandWarn ='';
					var displayWarn  ='';
					$line_items.filter(
										function() {
										index = (this.id);
										var $curr_elem=$(this);
										var $hiddenValuesFlagElem=$curr_elem.find('.hiddenValuesFlag').text();
										var $hiddenValuesElem=$curr_elem.find('.hiddenValues').text();
										var hiddenValuesFlag=$hiddenValuesFlagElem.split(':');
										var hiddenValues=$hiddenValuesElem.split(':');
										var hiddenValSet=true;
										var hiddenValFlagSet=true;
										
										if(hiddenValues.length == 0)
											hiddenValSet=false;
										if(hiddenValuesFlag.length == 0)
											hiddenValFlagSet=false;
										
										if(hiddenValSet==false || hiddenValFlagSet==false){
											return false;
										}
										buildError =true;
										demandError =true;
										displayError =true;
										deliveryError =true;
											var msgBuild = '';
											var msgStore = '';
											var msgDisp = '';
											var msgDelivery = '';
											var buildValidationFlag = '';
											var displayValidationFlag = '';
											var demandValidationFlag = '';
											var delDteValidationFlag = '';
											var wtd = '';
											var ewtd = '';
											if($curr_elem.find('td span:first-child').attr('id')!=undefined && $curr_elem.find('td span:first-child').attr('id')!=null){
													articlee=$curr_elem.find('td span:first-child').attr('id').split('-')[1];
											}
										var $demand_elem=$curr_elem.find('.storeDemand');
										
										//added to take the recently updated demand when the page is retained
										if($curr_elem.hasClass('secondary-line-item')){
											$demand_elem.val($curr_elem.parent().parent().parent().parent().prev().find('.storeDemand').val());
											hiddenValues[2]=$curr_elem.parent().parent().parent().parent().prev().find('.storeDemand').val();
											var newStr=hiddenValues.toString().split(',').join(':');
											$curr_elem.find('.hiddenValues').text(newStr);
										}
										
										
										var storeDemand = Number($demand_elem.val().trim());
										var $display_elem=$curr_elem.find('.displayQty');
										var displayQty = Number($display_elem.val().trim());
										var $build_elem=$curr_elem.find('.buildQty');
										var buildQty = Number($build_elem.val().trim());
										var $wtd_elem=$curr_elem.find('.wtd');
										var $ewtd_elem=$curr_elem.find('.ewtd');
										var om = Number(hiddenValuesFlag[3]);
										var psaDisplayStartDate = (hiddenValuesFlag[4]);
										var actualPsaDisplayStartDate = createDateObj(psaDisplayStartDate);
										var $base_frct_elem = $curr_elem.find('.baseForecast');
										var $prom_frct_elem = $curr_elem.find('.baseForecast').next();
										var baseForecast = Number($base_frct_elem.text().trim());
										var promForecast = Number($prom_frct_elem.text().trim());
										var promoDate = hiddenValues[0].trim();
										var demandFlag = hiddenValuesFlag[0];
										var displayFlag = hiddenValuesFlag[1];
										var buildFlag = hiddenValuesFlag[2];
										var maxLimit = Number(hiddenValues[7].trim());
										var storeDemandOrg = Number(hiddenValues[2].trim());
										var orginal_display = '';
										var $dis_dat_attr=$display_elem.attr('data-td');
										var dis_dat_attr_spit='';
										var orginal_demand = '';
										var $demand_dat_attr=$demand_elem.attr('data-td');
										var dem_dat_attr_spit='';
										var displayQtyOrg = Number(hiddenValues[3].trim());
										var orginal_build = '';
										var $build_dat_attr=$build_elem.attr('data-td');
										var build_dat_attr_spit='';
										var buildQtyOrg = Number(hiddenValues[4].trim());
										var $delivery_Date =$curr_elem.find('.deliveryDate');
										var deliveryDate =$delivery_Date.val();
										var deliveryDateOrg = hiddenValues[5].trim();
										om = (om != null && om != undefined && om != '') ? om	: 1;
										
										// Start of BigW Cahnge On Max Limit
										var instoreFlag=false;
										var bigwFlag=false;
										var bigwBuildMaxLimit=0;
										var bigwDisplayMaxLimit=0;
										var bigwBuildMaxPercentage=0;
										var bigwDisplayMaxPercentage=0;
										var bigwDemandMaxlimitPercentage=0;
										
										if($('#salesOrg').val()=="1060"){
											bigwFlag=true;
											if($curr_elem.find(".displayMore").text()=="IS"){
												instoreFlag=true;
											}
											bigwBuildMaxLimit=$('#cmpBuildQuantity').val();
											bigwDisplayMaxLimit=$('#cmpDisplayQty').val();
											if(storeDemand!=null && storeDemand!=undefined && storeDemand!="" && storeDemand !=0){
												bigwBuildMaxPercentage=((Number($("#cmpBuildQuantityPer").val())*storeDemand*om)/100);
												bigwDisplayMaxPercentage=((Number($("#cmpDisplayQtyPer").val())*storeDemand*om)/100);
											}
											if(promForecast!=null && promForecast!=undefined && promForecast!="" && promForecast !=0){
												bigwDemandMaxlimitPercentage=(Number($("#cmpStoreDemand").val())+(promForecast*om));
											}else if(baseForecast!=null && baseForecast!=undefined && baseForecast!="" && baseForecast !=0){
												bigwDemandMaxlimitPercentage=(Number($("#cmpStoreDemand").val())+(baseForecast*om));
											}
										}
										
										console.log("OM  ::>"+om+" SO::>"+bigwFlag+" IN Store::>"+instoreFlag+" BuildL::>"+bigwBuildMaxLimit+" BBuild%::>"+bigwBuildMaxPercentage+" DisplayL::>"+bigwDisplayMaxLimit+" Display%::>"+bigwDisplayMaxPercentage+" Demand::>"+bigwDemandMaxlimitPercentage);
										console.log("Build :> "+(buildQty * om)+" Demand ::> "+(storeDemand * om)+" Display ::> "+(storeDemand * om));
										// End of bigW code
										if ($wtd_elem != undefined)
											wtd = Number($wtd_elem.text().trim());

										if ($ewtd_elem != undefined)
											ewtd = Number($ewtd_elem.text().trim());

										if ($demand_elem.attr('readonly') == 'readonly' 
											|| $demand_elem.parent().hasClass('hideBlock')
											|| $demand_elem.is(':disabled')) {
												demandValidationFlag = true;
											} else {
												demandValidationFlag = false;
											}

										if ($demand_dat_attr != undefined){
											dem_dat_attr_spit=$demand_dat_attr.split('-');
											if(dem_dat_attr_spit.length > 0
												&& dem_dat_attr_spit[2] != undefined
												&& dem_dat_attr_spit[2] != null)
											orginal_demand = Number(dem_dat_attr_spit[2]);
										}
										
										if ($display_elem.attr('readonly') == 'readonly'
											|| $display_elem.parent().hasClass('hideBlock')
											|| $display_elem.is(':disabled')) {
												displayValidationFlag = true;
											} else {
												displayValidationFlag = false;
											}
										
										if ($dis_dat_attr != undefined){
											dis_dat_attr_spit=$display_elem.attr('data-td').split('-');
											if(dis_dat_attr_spit.length > 0
											&& dis_dat_attr_spit[2] != undefined
											&& dis_dat_attr_spit[2] != null){
											orginal_display = Number(dis_dat_attr_spit[2]);
											}
										}

										if ($build_elem.attr('readonly') == 'readonly'
											|| $build_elem.parent().hasClass('hideBlock')
											|| $build_elem.is(':disabled')) {
												buildValidationFlag = true;
											} else {
												buildValidationFlag = false;
											}

										if ($build_dat_attr != undefined){

											//build_dat_attr_spit =$build_elem.split('-');
											build_dat_attr_spit = $build_dat_attr.split('-');
										
											

											if(build_dat_attr_spit.length > 0
												&& build_dat_attr_spit[2] != undefined
												&& build_dat_attr_spit[2] != null)
											orginal_build = Number(build_dat_attr_spit[2]);
										}

										if ($delivery_Date.attr('readonly') == 'readonly'
												|| $delivery_Date.parent().hasClass('hideBlock')
												|| $delivery_Date.is(':disabled')
												|| buildQty == 0)
											delDteValidationFlag = true;
										else
											delDteValidationFlag = false;

											if (!buildValidationFlag
													&& buildQty != buildQtyOrg) {
											if ((buildFlag == 1)
													&& ((orginal_build != '' && buildQty < orginal_build)
														|| (orginal_build == '' && buildQty < buildQtyOrg))) {
													msgBuild = 'Decrease in Build Quantity not allowed';
												$build_elem.addClass('errorField').attr('title',msgBuild);
											} 
											else if ((buildFlag == 3)
													&& ((orginal_build != '' && buildQty > orginal_build)
														|| (orginal_build == '' && buildQty > buildQtyOrg))) {
													msgBuild = 'Increase in Build Quantity not allowed';
												$build_elem.addClass('errorField').attr('title',msgBuild);
											}else if ( !bigwFlag && (buildQty * om) > buildMaxLimit) {
													msgBuild = 'Build Quantity not allowed more than '
															+ buildMaxLimit
															+ ' units';
												$build_elem.addClass('errorField').attr('title',msgBuild);
											}else if( bigwFlag && bigwBuildMaxLimit != undefined && bigwBuildMaxLimit != 0 && (buildQty * om) > bigwBuildMaxLimit){
												msgBuild = 'Store Build quantity for article '+articlee+' in OM is not valid, Please enter a value under "'+ bigwBuildMaxLimit+ '" units';
												$build_elem.addClass('errorField').attr('title',msgBuild);
											}else	if( bigwFlag && instoreFlag && bigwBuildMaxPercentage != undefined && bigwBuildMaxPercentage != 0 && (buildQty * om) > bigwBuildMaxPercentage){
												msgBuild = 'Store Build quantity for article '+articlee+' in OM is not valid, Please enter a value under "'+ bigwBuildMaxPercentage+ '" units';
												$build_elem.addClass('errorField').attr('title',msgBuild);
											}else{
												$build_elem.removeClass('errorField').removeAttr('title');
												buildError=false;
												}
											if ((buildQty) >= buildWarnLimit) {
												buildWarn = buildWarn+'warn';
											}
										} else{
											$build_elem.removeClass('errorField').removeAttr('title');
											buildError=false;
										}
										
										
											// Store Demand Validations
											if (!demandValidationFlag
													&& storeDemand != storeDemandOrg) {
												if (storeDemand < baseForecast) {
													msgStore = 'Base Forecast used, as the given Store Demand is Lesser than the Base Forecast';
												$demand_elem.addClass('errorField').attr('title',msgStore);
												$demand_elem.val(baseForecast);
											}else if (storeDemand < wtd) {
													msgStore = 'Sales wtd used, as the given Store Demand is Lesser than the Sales wtd';
												$demand_elem.addClass('errorField').attr('title',msgStore);
												//commenting this out to retain user entered value
											//	$demand_elem.val(baseForecast);
											}else if (hiddenValues[7].trim() != ''
														&& storeDemand > maxLimit) {
													msgStore = 'Qty exceeds the maximum limit';
												$demand_elem.addClass('errorField').removeAttr('title',msgStore);
											}else if ((demandFlag == 2)
														&& storeDemand != storeDemandOrg) {
													msgStore = 'Qty Locked, Store Demand change not allowed';
												$demand_elem.addClass('errorField').attr('title',msgStore);
											} else if (!bigwFlag && (storeDemand * om) > demandMaxLimit) { // 
													msgStore = 'Demand Quantity not allowed more than '
															+ demandMaxLimit
															+ ' units';
												$demand_elem.addClass('errorField').attr('title',msgStore);
											}else if( bigwFlag && instoreFlag && bigwDemandMaxlimitPercentage != undefined && bigwDemandMaxlimitPercentage != 0 && (storeDemand * om) > bigwDemandMaxlimitPercentage){
												msgStore = 'Store Demand quantity for article '+articlee+' in OM is not valid, Please enter a value under "'+ bigwDemandMaxlimitPercentage + '" units';
												$demand_elem.addClass('errorField').attr('title',msgStore);
											}else if ((demandFlag == 1)
														&& ((orginal_demand != '' && storeDemand < orginal_demand) || (orginal_demand == '' && storeDemand < promForecast))) {
													msgStore = 'Decrease in Store Demand not allowed';
												$demand_elem.addClass('errorField').attr('title',msgStore);
											}
											else if ((demandFlag == 3)
													&& ((orginal_demand != '' && storeDemand > orginal_demand) || (orginal_demand == '' && storeDemand > promForecast))) {
												msgStore = 'Increase in Store Demand not allowed';
											$demand_elem.addClass('errorField').attr('title',msgStore);
										} else{
												$demand_elem.removeClass('errorField').removeAttr('title');
												demandError=false;
											}
											if ((storeDemand) >= demandWarnLimit) {
												demandWarn = demandWarn+'warn';
											}
										} else{
											$demand_elem.removeClass('errorField').removeAttr('title');
											demandError=false;
										}
											// Display Qty Validations
											if (!displayValidationFlag
													&& displayQty != displayQtyOrg) {
												if ((displayFlag == 2)
														&& displayQty != displayQtyOrg) {
													msgDisp = 'Qty Locked, Build Qty change not allowed';
												$display_elem.addClass('errorField').attr('title',msgDisp);
											} else if ( !bigwFlag && (displayQty * om) > displayMaxLimit) {
													msgStore = 'Display Quantity not allowed more than '
															+ displayMaxLimit
															+ ' units';
												$display_elem.addClass('errorField').attr('title',msgStore);
											}else if( bigwFlag && bigwDisplayMaxLimit != undefined && bigwDisplayMaxLimit != 0 && (displayQty * om) > bigwDisplayMaxLimit){
												msgStore = 'Store Display quantity for article '+articlee+' in OM is not valid, Please enter a value under "' + bigwDisplayMaxLimit + '" units';
												$display_elem.addClass('errorField').attr('title',msgStore);
											}else	if( bigwFlag && instoreFlag && bigwDisplayMaxPercentage != undefined && bigwDisplayMaxPercentage != 0 && (displayQty * om) > bigwDisplayMaxPercentage){
												msgStore = 'Store Display quantity for article '+articlee+' in OM is not valid, Please enter a value under "' + bigwDisplayMaxPercentage + '" units';
												$display_elem.addClass('errorField').attr('title',msgStore);
											} else if ((displayFlag == 1)
													&& ((orginal_display != '' && displayQty < orginal_display) 
															|| (orginal_display == '' && displayQty < displayQtyOrg))) {
													msgDisp = 'Decrease in Display Qty not allowed';
												$display_elem.addClass('errorField').attr('title',msgDisp);
											} 
											else if ((displayFlag == 3)
													&& ((orginal_display != '' && displayQty > orginal_display) 
															|| (orginal_display == '' && displayQty > displayQtyOrg))) {
													msgDisp = 'Increase in Display Qty not allowed';
												$display_elem.addClass('errorField').attr('title',msgDisp);
											} else{
												$display_elem.removeClass('errorField').removeAttr('title');
												displayError =false;
											}
											if ((displayQty) >= displayWarnLimit) {
												displayWarn = displayWarn+'warn';
											}
										} else{
											$display_elem.removeClass('errorField').removeAttr('title');
											displayError =false;
										}
										
											var currentDate = new Date();
											var actualDelDate = new Date();
											var splittedTwo = '';
											var splittedDelDate = '';
										var month2 ='';
										var finalDate ='';
										var splitDate ='';
										//actualDelDate=createDateObj(deliveryDate);
										if (deliveryDate != '' && deliveryDate!=undefined 
												&& deliveryDate.split('/').length >1) {
											finalDate = parseDate(deliveryDate).getFullYear();
											splitDate = deliveryDate.split("/");
											finalDate = splitDate[0]+ "/" + splitDate[1] + "/" + finalDate;
													deliveryDate = finalDate;
											splittedDelDate = deliveryDate.split('/');
											month2 = splittedDelDate[1] - 1;
											actualDelDate.setFullYear(splittedDelDate[2],month2,splittedDelDate[0]);
											splittedTwo = splittedDelDate[2].length+ splittedDelDate[1].length+ splittedDelDate[0].length;
												}
											if (!delDteValidationFlag
													&& deliveryDate != ''
													&& deliveryDateOrg != deliveryDate) {
												if (buildQty != '') {
												if (((splittedDelDate[0] > 31
															|| splittedDelDate[1] > 12 || splittedDelDate[2] > 9999) || splittedTwo != 8)) {
														msgDelivery = 'Please enter a valid Delivery Date';
													$delivery_Date.addClass('errorField').attr('title',msgDelivery);
												}else if (currentDate
															.getTime() >= actualDelDate
															.getTime()) {
														msgDelivery = 'Delivery date should be future date';
													$delivery_Date.addClass('errorField').attr('title',msgDelivery);
												}else if (actualPsaDisplayStartDate
															.getTime() < actualDelDate
															.getTime()) {
														msgDelivery = 'Delivery date should not be a greater than display start date';
													$delivery_Date.addClass('errorField').attr('title',msgDelivery);
												} else{
													$delivery_Date.removeClass('errorField').removeAttr('title');
													deliveryError =false;
												}
												} else {
													if (deliveryDate != '') {
														msgDelivery = 'Please enter build quantity or remove delivery date';
													$delivery_Date.addClass('errorField').attr('title',msgDelivery);
												} else{
													$delivery_Date.removeClass('errorField').removeAttr('title');
													deliveryError =false;
												}
											}
										} else{
											$delivery_Date.removeClass('errorField').removeAttr('title');
											deliveryError =false;
										}
										if (deliveryError || demandError || displayError || buildError) {
											errorText = errorText+'error';
											//errorTextFlag = true;
										} else {
											$accord_hold.find('.errorDivProm h4').text('');
											//errorTextFlag = false;
										
											if ((deliveryDate == deliveryDateOrg)) {
												ddF = 'null';
											} else {
												if (deliveryDate == '') {
													ddF = 'null';
												} else {
													ddF = deliveryDate;
												}
											}
											if ((storeDemand == storeDemandOrg)) {
												sdF = 'null';
											} else {
												sdF = storeDemand * om;
											}
											if ((displayQty == displayQtyOrg)) {
												dqF = 'null';
											} else {
												dqF = displayQty * om;
											}
											if (displayValidationFlag) {
												dqF = 'null';
											}
											if ((buildQty == buildQtyOrg)) {
												if ((deliveryDate != deliveryDateOrg)
														&& (deliveryDate == '')
														&& buildQty != '') {
													bqF = buildQty  * om; // modified code here
												} else {
													bqF = 'null';
												}
											} else {
												bqF = buildQty * om;
											}
											if (buildValidationFlag) {
												bqF = 'null';
											}
											if (((deliveryDate != deliveryDateOrg && !delDteValidationFlag)
													|| (storeDemand != storeDemandOrg && !demandValidationFlag)
													|| (buildQty != buildQtyOrg && !buildValidationFlag) || (displayQty != displayQtyOrg && !displayValidationFlag))
													&& editString == ""){
												editString = index + ':' + sdF + '_' + dqF + '_' + bqF + '_' + ddF;
											}else if (((deliveryDate != deliveryDateOrg && !delDteValidationFlag)
													|| (storeDemand != storeDemandOrg
															&& storeDemand != 'undefined' && !demandValidationFlag)
													|| (buildQty != buildQtyOrg && !buildValidationFlag) 
													|| (displayQty != displayQtyOrg && !displayValidationFlag))
													&& editString != ""){
												editString = editString + ','
														+ index + ':' + sdF
														+ '_' + dqF + '_' + bqF
														+ '_' + ddF;
											}
										}

										});
					if (errorText=='') {
							if(showLimitWarningMsg(demandWarn,displayWarn,buildWarn)){
							var txt = validationTrue(editString, key);
							if (txt != '')
									$accord_hold.find('.errorDivProm h4').text(txt);
						}
						}else{
							$accord_hold.find('.errorDivProm h4').text('');
							warnUser('Please correct the highlighted fields');
		}

	});
	}

	$ele.find('.additionalDtls').unbind('click');
	$ele.find('.additionalDtls').click(
			function() {
				// if()
				var id = '';
				var date = weekStartDate;
				var articleNo = $(this).parent().find('.promDate').text()
						.split('_')[0];
				if ($(this).hasClass('notpadLink')) {
					// $("#dialog-modal").dialog("open");
					id = 'notpadLink';
				} else if ($(this).hasClass('history')) {
					// $("#dialog-salesHistory").dialog("open");
					id = 'history';
				} else {
					// $("#dialog-MultiBuy").dialog("open");
					id = 'offers';
				}
				if (id != 'notpadLink') {
					getPromoAddtionalDtls(articleNo, true, id, date, $(this)
							.parent().parent());
				} else {
					getPromoAllocationDtls(articleNo, true, id, date, $(this)
							.parent().parent());
				}
			});
}

function checkDemandVal() {
	var msgStore = '';
	$('.saveBtn:visible')
			.parent()
			.parent()
			.find('.line-item')
			.each(
					function() {

						var demandValidationFlag = '';
						var storeDemand = $(this).find('.storeDemand').val();
						var om = Number($(this).find('.hiddenValuesFlag')
								.text().split(':')[3]);
						demandValidationFlag = $(this).find('.storeDemand')
								.parent().hasClass('hideBlock');
						var storeDemandOrg = $(this).find('.hiddenValues')
								.text().trim().split(':')[2].trim();
						if (!demandValidationFlag
								&& storeDemand != storeDemandOrg) {
							if ((storeDemand) >= 99) {
								msgStore = 'Base Forecast used, as the given Store Demand is Lesser than the Base Forecast';
							}
						}
					});
	if (msgStore != '') {
		return true;
	} else {
		return false;
	}
}

function checkDisplayVal() {
	var msgStore = '';
	$('.saveBtn:visible')
			.parent()
			.parent()
			.find('.line-item')
			.each(
					function() {
						var displayValidationFlag = '';
						var displayQty = $(this).find('.displayQty').val();
						var om = Number($(this).find('.hiddenValuesFlag')
								.text().split(':')[3]);
						displayValidationFlag = $(this).find('.displayQty')
								.parent().hasClass('hideBlock');

						var displayQtyOrg = $(this).find('.hiddenValues')
								.text().trim().split(':')[3].trim();

						if (!displayValidationFlag
								&& displayQty != displayQtyOrg) {
							if ((displayQty) >= 99) {
								msgStore = 'Base Forecast used, as the given Store Demand is Lesser than the Base Forecast';
							}
						}
					});
	if (msgStore != '') {
		return true;
	} else {
		return false;
	}
}
function checkBuildVal() {
	var msgStore = '';
	$('.saveBtn:visible')
			.parent()
			.parent()
			.find('.line-item')
			.each(
					function() {

						var buildValidationFlag = '';
						var buildQty = $(this).find('.buildQty').val();
						var om = Number($(this).find('.hiddenValuesFlag')
								.text().split(':')[3]);
						buildValidationFlag = $(this).find('.buildQty')
								.parent().hasClass('hideBlock');
						var buildQtyOrg = $(this).find('.hiddenValues').text()
								.trim().split(':')[4].trim();
						if (!buildValidationFlag && buildQty != buildQtyOrg) {
							if ((buildQty) >= 99) {
								msgStore = 'Base Forecast used, as the given Store Demand is Lesser than the Base Forecast';
							}
						}
					});
	if (msgStore != '') {
		return true;
	} else {
		return false;
	}
}
function formateDate(v) {
	if (v.split("/")[2] == 4) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}
function submitUpdate(data, key) {
	$.ajax({
		type : "post",
		url : "updatePromoArticles.htm",
		data : {
			indexListForUpdate : data
		},
		// async:false,
		beforeSend : function() {
			startLoading();
			fullScreenLoader();
		},
		success : function(response) {
			$.loader('close');
			showUpdateStatus(response, key, data);
			// stopLoading();

		},
		error : function() {
			// goToLogin();
		},
	});
}
function showUpdateStatus(response, key, data) {
	var msgError = "false";
	var output = $.parseJSON(response);
	var articleList = output.data;
	var msg = output.msg;
	if (msg != null && msg.trim() != "") {
		showError(msg);
	} else if (articleList != null && articleList.length > 0) {
		//console.log(key);
		var i = 0;
		var $elem =$('.saveBtn:visible').parent().parent();
		var $lineItem = $elem.find('.line-item');
		$lineItem.filter(function() {
							i = $(this).attr('id');
							var om = $(this).find('.hiddenValuesFlag').text()
									.split(':')[3];
							om = (om != null && om != undefined && om != '') ? om
									: 1;
							var aricleObj = articleList[i];
							if (aricleObj != undefined) {
								if (aricleObj.updateArticleFlag != null
										&& aricleObj.updateArticleFlag == 'Y') {
									{
										if (aricleObj.buildQtyUpdateFlag != null
												&& aricleObj.buildQtyUpdateFlag == 'Y') {
											if (!(aricleObj.buildQtyUpdateStatusFlag != null && aricleObj.buildQtyUpdateStatusFlag == 'Y')) {
												if (!$(this).find('.buildQty')
														.hasClass('hideBlock')
														&& !($(this)
																.find(
																		'.buildQty')
																.attr(
																		'readonly') == 'readonly')
														&& !$(this)
																.find(
																		'.buildQty')
																.is(':disabled')) {
													$(this)
															.find('.buildQty')
															.addClass(
																	'errorField')
															.attr('title',
																	'Build Qty. update failed');
													msgError = "true";
												}

											} else {
												if (aricleObj.newDeliveryDate != ''
														&& aricleObj.newDeliveryDate != null
														&& aricleObj.newDeliveryDate != undefined
														&& aricleObj.newDeliveryDate != $(
																this)
																.find(
																		'.deliveryDate')
																.val()) {
													$(this)
															.find(
																	'.deliveryDate')
															.val(
																	aricleObj.newDeliveryDate);// .attr('title',
													// "Updated with nearest
													// roaster.");
												}
												if (aricleObj.newBuildQty == '0') {
													$(this).find(
															'.deliveryDate')
															.val('');
												}
												if (aricleObj.orginal_build != ''
														&& aricleObj.orginal_build != null
														&& aricleObj.orginal_build != undefined) {
													var dat = $(this).find(
															'.buildQty').attr(
															'data-td');
													var org_qty = (Number(aricleObj.orginal_build) / Number(om))
															.toFixed(0);
													var new_qty = (Number(aricleObj.newBuildQty) / Number(om))
															.toFixed(0);
													if (dat != undefined
															&& dat != ''
															&& dat.split('-').length > 1
															&& org_qty != 'NaN'
															&& new_qty != 'NaN') {

														dat = dat.split('-')[0]
																+ '-' + new_qty
																+ '-' + org_qty;
														$(this)
																.find(
																		'.buildQty')
																.attr(
																		'data-td',
																		dat);
													}

												}
											}
										}

										if (aricleObj.deliveryDateUpdateFlag != null
												&& aricleObj.deliveryDateUpdateFlag == 'Y') {
											if (!(aricleObj.deliveryDateUpdateStatusFlag != null && aricleObj.deliveryDateUpdateStatusFlag == 'Y')) {

												if (!$(this).find(
														'.deliveryDate')
														.hasClass('hideBlock')
														&& !($(this)
																.find(
																		'.deliveryDate')
																.attr(
																		'readonly') == 'readonly')
														&& !$(this)
																.find(
																		'.deliveryDate')
																.is(':disabled')) {
													$(this)
															.find(
																	'.deliveryDate')
															.addClass(
																	'errorField')
															.attr('title',
																	'Delivery Date update failed');
													msgError = "true";
												}
											} else {
												if (aricleObj.newDeliveryDate != ''
														&& aricleObj.newDeliveryDate != null
														&& aricleObj.newDeliveryDate != undefined
														&& aricleObj.newDeliveryDate != $(
																this)
																.find(
																		'.deliveryDate')
																.val()) {
													$(this)
															.find(
																	'.deliveryDate')
															.val(
																	aricleObj.newDeliveryDate);// .attr('title',
													// "Can't able to find
													// nearest roaster.");
												}
											}
										}
										if (aricleObj.demandQtyUpdateFlag != null
												&& aricleObj.demandQtyUpdateFlag == 'Y') {
											if (!(aricleObj.demandQtyUpdateStatusFlag != null && aricleObj.demandQtyUpdateStatusFlag == 'Y')) {
												if (!$(this).find(
														'.storeDemand')
														.hasClass('hideBlock')
														&& !($(this)
																.find(
																		'.storeDemand')
																.attr(
																		'readonly') == 'readonly')
														&& !$(this)
																.find(
																		'.storeDemand')
																.is(':disabled')) {
													$(this)
															.find(
																	'.storeDemand')
															.addClass(
																	'errorField')
															.attr('title',
																	'Demand Qty. update failed');
													msgError = "true";
												}
											} else {
												if (aricleObj.orginal_demand != ''
														&& aricleObj.orginal_demand != null
														&& aricleObj.orginal_demand != undefined) {
													var dat = $(this).find(
															'.storeDemand')
															.attr('data-td');
													var org_qty = (Number(aricleObj.orginal_demand) / Number(om))
															.toFixed(0);
													var new_qty = (aricleObj.promoForecast != null
															&& aricleObj.promoForecast != '' && aricleObj.promoForecast != '0') ? aricleObj.promoForecast
															: (aricleObj.baseForecast != null && aricleObj.baseForecast != '') ? aricleObj.baseForecast
																	: '0';
													if (dat != undefined
															&& dat != ''
															&& dat.split('-').length > 1
															&& org_qty != 'NaN'
															&& new_qty != 'NaN') {

														dat = dat.split('-')[0]
																+ '-' + new_qty
																+ '-' + org_qty;
														$(this)
																.find(
																		'.storeDemand')
																.attr(
																		'data-td',
																		dat);
														console
																.log('storeDemand  '
																		+ dat
																		+ 'new_qty  '
																		+ new_qty);
													}

												}
											}
										}
										if (aricleObj.displayQtyUpdateFlag != null
												&& aricleObj.displayQtyUpdateFlag == 'Y') {
											if (!(aricleObj.displayQtyUpdateStatusFlag != null && aricleObj.displayQtyUpdateStatusFlag == 'Y')) {
												if (!$(this)
														.find('.displayQty')
														.hasClass('hideBlock')
														&& !($(this)
																.find(
																		'.displayQty')
																.attr(
																		'readonly') == 'readonly')
														&& !$(this)
																.find(
																		'.displayQty')
																.is(':disabled')) {
													$(this)
															.find('.displayQty')
															.addClass(
																	'errorField')
															.attr('title',
																	'Display Qty. update failed');
													msgError = "true";
												}
											} else {
												if (aricleObj.orginal_display != ''
														&& aricleObj.orginal_display != null
														&& aricleObj.orginal_display != undefined) {
													var dat = $(this).find(
															'.displayQty')
															.attr('data-td');
													var org_qty = (Number(aricleObj.orginal_display) / Number(om))
															.toFixed(0);
													var new_qty = (Number(aricleObj.newDisplayQty) / Number(om))
															.toFixed(0);
													if (dat != undefined
															&& dat != ''
															&& dat.split('-').length > 1
															&& org_qty != 'NaN'
															&& new_qty != 'NaN') {

														dat = dat.split('-')[0]
																+ '-' + new_qty
																+ '-' + org_qty;
														$(this)
																.find(
																		'.displayQty')
																.attr(
																		'data-td',
																		dat);
														console
																.log('displayQty  '
																		+ dat
																		+ 'new_qty  '
																		+ new_qty);
													}

												}
											}
										}
									}
								}
								i++;
							}

						});
		$elem.find('.secondaryTable .buildQty').each(
				function() {
					if ($(this).val().trim() != ""
							&& !($(this).hasClass('errorField')))
						$(this).parent().parent().parent().parent().parent()
								.parent().prev()
								.find('.buildQty,.deliveryDate').attr(
										'readonly', 'readonly').removeClass(
										'errorField').val('').css('background',
										'#d9d9d9');
				});
		$elem.find('.secondaryTable .displayQty').each(
				function() {
					if ($(this).val().trim() != ""
							&& !($(this).hasClass('errorField')))
						$(this).parent().parent().parent().parent().parent()
								.parent().prev().find(
										'.displayQty,.deliveryDate')
								.removeClass('errorField').val('').attr(
										'readonly', 'readonly').css(
										'background', '#d9d9d9');
				});
		resetHiddenVal(editString);
		if (msgError != 'false')
			warnUser('Please correct the highlighted fields');
		else if (previousEvent != '' || prevPageNo != '') {
			if (previousEvent != '') {
				$(previousEvent).click();
				previousEvent = '';
			}
			if (prevPageNo != '') {
				$('.paginationWrapper:visible').pagination('selectPage',
						prevPageNo);
				prevPageNo = '';
			}
		} else if (nextAccClick == 'false') {
			if ($('.page-link.next:visible') != null
					&& $('.page-link.next:visible') != undefined
					&& $('.page-link.next:visible').length > 0) {
				$('.page-link.next:visible')[0].click();
			}
		} else if (nextAccClick != 'false') {
			if (nextAccClick == '#undefined') {
				$('.saveBtn:visible').parent().parent().prev().click();
			} else {
				$('.saveBtn:visible').parent().parent().next().click();
			}
		}

	}
	initialiseTooltip($('.ContentTableWrapper:visible .scrollTableContainer'));
	// HAVE TO TEST, COMMENTED CONSIDERING NOT USEING ANY WHERE, XGSAA
	/*$('.add-info-img')
			.each(
					function() {
						if (($(this).parent().parent().next().next().find(
								'.errorField').length > 0 || $(this).parent()
								.parent().next().next().next().find(
										'.errorField').length > 0)
								&& $(this).attr('src') == '../../images/woolworths/iconOpenAccordion.png') {//
							// $(this).click();

						}
					});*/
}
function calDays(val) {
	if (val == day1)
		return 1;
	else if (val == day2)
		return 2;
	else if (val == day3)
		return 3;
	else if (val == day4)
		return 4;
	else if (val == day5)
		return 5;
	else if (val == day6)
		return 6;
	else if (val == day7)
		return 7;
}
var day1, day2, day3, day4, day5, day6, day7;
function setDay(startDay) {
	var fromDate = startDay;
	var date = new Date();
	var partsOne = fromDate.split('/');
	date.setFullYear(partsOne[2], partsOne[1] - 1, partsOne[0]);
	date.setTime(date.getTime());
	if (date.getDay() == 0) {
		day1 = 'Sun', day2 = 'Mon', day3 = 'Tue', day4 = 'Wed', day5 = 'Thu',
				day6 = 'Fri', day7 = 'Sat';
	} else if (date.getDay() == 1) {
		day7 = 'Sun', day1 = 'Mon', day2 = 'Tue', day3 = 'Wed', day4 = 'Thu',
				day5 = 'Fri', day6 = 'Sat';
	} else if (date.getDay() == 2) {
		day6 = 'Sun', day7 = 'Mon', day1 = 'Tue', day2 = 'Wed', day3 = 'Thu',
				day4 = 'Fri', day5 = 'Sat';
	} else if (date.getDay() == 3) {
		day5 = 'Sun', day6 = 'Mon', day7 = 'Tue', day1 = 'Wed', day2 = 'Thu',
				day3 = 'Fri', day4 = 'Sat';
	} else if (date.getDay() == 4) {
		day4 = 'Sun', day5 = 'Mon', day6 = 'Tue', day7 = 'Wed', day1 = 'Thu',
				day2 = 'Fri', day3 = 'Sat';
	} else if (date.getDay() == 5) {
		day3 = 'Sun', day4 = 'Mon', day5 = 'Tue', day6 = 'Wed', day7 = 'Thu',
				day1 = 'Fri', day2 = 'Sat';
	} else if (date.getDay() == 6) {
		day2 = 'Sun', day3 = 'Mon', day4 = 'Tue', day5 = 'Wed', day6 = 'Thu',
				day7 = 'Fri', day1 = 'Sat';
	} else {
		day5 = 'Sun', day6 = 'Mon', day7 = 'Tue', day1 = 'Wed', day2 = 'Thu',
				day3 = 'Fri', day4 = 'Sat';
	}
}
function returnDaysVals(a, b) {

	if (b > a) {
		for ( var i = a; i <= b; i++) {
			arrays[arrayLen] = i;
			arrayLen++;
		}
	} else if (a > b) {
		for ( var i = a; i != b; i++) {
			arrays[arrayLen] = i;
			arrayLen++;
			if (i == 7)
				i = 0;
		}
		arrays[arrayLen] = b;
		arrayLen++;
	} else if (a = b) {
		arrays[arrayLen] = a;
		arrayLen++;
	}
	return arrays;
}
function initialiseTooltip(elem) {
	if (elem == '' || elem == undefined && elem == null || $(elem).length == 0) {
		$("input.editNumCell,input.editDateCell").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		$("input.editNumCell,input.editDateCell").tooltip().off(
				"mouseover mouseout");

		$("td").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		$("th").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		$("li").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});

	} else {
		elem.find("input.editNumCell,input.editDateCell").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		/*$(elem).find("input.editNumCell,input.editDateCell").tooltip().off(
				"mouseover mouseout");*/

		$(elem).find("td").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		/*elem.find('td').hover(function(){
			if(!($(this).hasClass('tool-tip-added'))){
				$(this).tooltip({position : {my : "top center-30",at : "top center"}})
				.tooltip('open').addClass('tool-tip-added');
			}
		});*/
		elem.find('td.supplier-title').tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		
		elem.find("th").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});
		
		/*$(elem).find("li").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
	}
		});*/
	}
}
function unique(array) {
	var unique = [];

	array.forEach(function(value) {
		if (unique.indexOf(value) === -1) {
			unique.push(value);
		}
	});

	return unique;
}

function showLimitWarningMsg(checkDemandMsg ,checkDisplayMsg, checkBuildMsg){

			var warnMsg = '';
	/*if (checkDemandMsg!='' && checkDisplayMsg=='') {
		warnMsg = 'demand quantity is greater than or equal to '+demandWarnLimit+' units,';
	} else if (checkDemandMsg=='' && checkDisplayMsg!='') {
		warnMsg = 'display quantity is greater than or equal to '+displayWarnLimit+' units,';
	} else if (checkDemandMsg!='' && checkDisplayMsg!='') {
		warnMsg = 'demand and display quantity is greater than or equal to '+demandWarnLimit+' units,';
	} else if (checkBuildMsg!='') {
			warnMsg = ' build quantity is greater than or equal to 99 units';
	} else{
		warnMsg = '';
	}*/
	if (checkDemandMsg!='' && checkDisplayMsg=='') {
		if (checkBuildMsg!=''){
			warnMsg = 'demand and build quantity is greater than or equal to '+demandWarnLimit+' units,';
		}else{
			warnMsg = 'demand quantity is greater than or equal to '+demandWarnLimit+' units,';
			}
		
	} else if (checkDemandMsg=='' && checkDisplayMsg!='') {
		if (checkBuildMsg!=''){
			warnMsg = 'display and build quantity is greater than or equal to '+displayWarnLimit+' units,';
		}else{
			warnMsg = 'display quantity is greater than or equal to '+displayWarnLimit+' units,';
				}
		
		//warnMsg = 'display quantity is greater than or equal to '+displayWarnLimit+' units,';
	} else if (checkDemandMsg!='' && checkDisplayMsg!='') {
		
		if (checkBuildMsg!=''){
			warnMsg = 'demand, display and build quantity is greater than or equal to '+demandWarnLimit+' units,';
		}else{
			warnMsg = 'demand and display quantity is greater than or equal to '+demandWarnLimit+' units,';
			}
		
		//warnMsg = 'demand and display quantity is greater than or equal to '+demandWarnLimit+' units,';
	} else if (checkBuildMsg!='') {
			warnMsg = ' build quantity is greater than or equal to 99 units';
	} else{
		warnMsg = '';
	}
	
	if(warnMsg!=''){
			showWarn('For some of the articles ' + warnMsg
					+ ' Do you want to save?');
			$('.yesBtn').unbind('click');
			$('.yesBtn').click(function() {
				$('#dialog-modal-alertBox').dialog('close');
				warnPopupFlag = true;
				submitUpdate(editString, key);
			});
			$('.noBtn').unbind('click');
			$('.noBtn').click(function() {
				$('#dialog-modal-alertBox').dialog('close');
			});
		return false;
	}else{
		return true;
		}
}
function validationTrue(editString, key) {
	
	var msg = '';
	if (editString.trim() != '') {
			warnPopupFlag = true;
			submitUpdate(editString, key);

	} else {
		msg = "";
		if (previousEvent != '' || prevPageNo != '') {
			// resetHiddenVal(editString);
			if (previousEvent != '') {
				$(previousEvent).click();
				previousEvent = '';
			}
			if (prevPageNo != '') {
				$('.paginationWrapper:visible').pagination('selectPage',
						prevPageNo);
				prevPageNo = '';
			}
		} else if (nextAccClick == 'false') {
			if ($('.page-link.next:visible') != null
					&& $('.page-link.next:visible') != undefined
					&& $('.page-link.next:visible').length > 0) {
			$('.page-link.next:visible')[0].click();
			}
		} else if (nextAccClick != 'false') {
			if (nextAccClick == '#undefined') {
				$('.saveBtn:visible').parent().parent().prev().click();
			} else {
				$('.saveBtn:visible').parent().parent().next().click();
			}
		}
	}
	return msg;
}
function backValidation() {
	errorTextFlag = true;
	$('.line-item:visible')
			.filter(
					function() {
						// index++;

						var storeDemand = $(this).find('.storeDemand').val();

						demandValidationFlag = $(this).find('.storeDemand')
								.parent().hasClass('hideBlock');

						var storeDemandOrg = $(this).find('.hiddenValues')
								.text().trim().split(':')[2].trim();
						//console.log('*******' + storeDemand + "@@@@@"
								//+ storeDemandOrg);
						var displayQty = $(this).find('.displayQty').val();

						displayValidationFlag = $(this).find('.displayQty')
								.parent().hasClass('hideBlock');

						var displayQtyOrg = $(this).find('.hiddenValues')
								.text().trim().split(':')[3].trim();
						var buildQty = $(this).find('.buildQty').val();

						buildValidationFlag = $(this).find('.buildQty')
								.parent().hasClass('hideBlock');

						var buildQtyOrg = $(this).find('.hiddenValues').text()
								.trim().split(':')[4].trim();

						var deliveryDate = $(this).find('.deliveryDate').val();

						delDteValidationFlag = $(this).find('.deliveryDate')
								.parent().hasClass('hideBlock');

						var deliveryDateOrg = $(this).find('.hiddenValues')
								.text().trim().split(':')[5].trim();
						;

						if (((deliveryDate != deliveryDateOrg)
								|| (storeDemand != storeDemandOrg)
								|| (buildQty != buildQtyOrg) || (displayQty != displayQtyOrg)))
							errorTextFlag = false;

					});
	if (errorTextFlag == false) {
		$("#dialog-saveChanges").dialog('open');
	} else
		window.location.href = '../promoPlanning/onPageLoad.htm';

}
var arrays = new Array();
var arrayLen = 0;
function bindOfferRadio() {
	$('.uomRadio').unbind('click');
	$('.uomRadio').click(
			function() {

				// console.log($(this).prop('id'));
				$('#' + $(this).prop('id')).prop('checked', true);
				$(this).parent().parent().parent().find('.offerDivs').addClass(
						'hideBlock');
				$('.' + $(this).prop('id') + 'text').removeClass('hideBlock');

			});
}
function bindSalesHistory() {
	$('.morePrice').unbind('click');
	$('.histParent').unbind('click');
	$('.morePrice').click(
			function() {

				if ($(this).parent().parent().next().find('td').hasClass(
						'hideBlock')) {
					$(this).parent().parent().next().find('td').removeClass(
							'hideBlock');
					$(this).find('span').text('-');
				} else {
					$(this).parent().parent().next().find('td').addClass(
							'hideBlock');
					$(this).find('span').text('+');
				}

			});
	$('.histParent').filter(
			function() {
				var key = $(this).attr('data-key');
				// console.log(key);
				if ($('[data-key="' + key + '"]') != undefined
						&& $('[data-key="' + key + '"]').length > 1) {
					var $temp = undefined;
					$('[data-key="' + key + '"]').filter(
							function() {
								// console.log($(this).attr('data-savings'));
								if ($temp == '' || $temp == undefined
										|| $temp.length == 0) {
									$temp = $(this);
								} else if ($(this).attr('data-savings') <= $(
										$temp).attr('data-savings')) {
									$(this).remove();
								} else {
									$($temp).remove();
									$temp = $(this);
								}
							});
				}
			});
}

function getPromoAllocationDtls(articleNo, flag, id, date, event) {
	//console.log(id);
	if (allocDtl != articleNo) {
		$.ajax({
			type : "post",
			url : "getPromoAllocationDtls.htm",
			data : {
				"articleNo" : articleNo,
				"uom" : "",
				"fromDate" : date,
				"toDate" : endDate
			},
			beforeSend : function() {
				// startLoading();
				fullScreenLoader();
			},
			success : function(response) {
				allocDtl = articleNo;
				var output = $.parseJSON(response);
				var promoAllocation = output.data;
				formAllocationContent(promoAllocation);
				$("#dialog-modal").dialog("open");
				// stopLoading();
				$.loader('close');
			},
			error : function() {
				// goToLogin();
			},
		});
	} else {
		$("#dialog-modal").dialog("open");
	}

}
function formAllocationContent(promoAllocation) {

	if (promoAllocation != null && promoAllocation.length > 0
			&& !(promoAllocation[0].msg.trim().indexOf(' ') != -1)) {
		$('.allocationRows').remove();
		$.each(promoAllocation, function(i, item) {

			var content = '<tr class=" ';
			if (i == 0)
				content = content + ' lastrow ';

			content += ' allocationRows" id="row-' + i + '">'
					+ '<td class="centerValue">'
					+ item.article.replace(/^0+/, '');
			if (item.uom != '')
				content += ' (' + item.uom + ') ';
			content += '</td>' + '<td class="centerValue">'
					+ item.orderNo.replace(/^0+/, '') + '</td>'
					+ '<td class="centerValue">' + item.allocationQty + '</td>'
					+ '<td class="centerValue">' + item.groupId + '</td>'
					+ '<td class="centerValue">'
					+ item.vendor.replace(/^0+/, '');

			if (item.vendor.trim() != '' && item.vendorName != '')
				content += '-';

			content += item.vendorName + '</td>' + '<td class="centerValue">'
					+ item.allocationStatus + '</td>'
					+ '<td class="centerValue">'
					+ item.deliveryDate.replace('.', '/').replace('.', '/')
					+ '</td>' + '<td class="centerValue">'
					+ item.showDate.replace('.', '/').replace('.', '/')
					+ '</td>' + '</tr>';
			$(content).insertAfter('.allocationContent');
			//console.log(item.feedback);

		});
		$('.allocationCount').text(promoAllocation.length);
		$(
				'#dialog-modal .popupActionsWrapper .saleHistorySaveBtn,#dialog-modal .ContentTableWrapper, #dialog-modal .alertText')
				.show();
		$('#dialog-modal .errorAddtnlDtls').remove();
	} else {
		$('#dialog-modal .errorAddtnlDtls').remove();
		$(
				'#dialog-modal .popupActionsWrapper .saleHistorySaveBtn,#dialog-modal .ContentTableWrapper, #dialog-modal .alertText')
				.hide();
		$('#dialog-modal .popupData')
				.append(
						'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">Sorry, No results found<h4>');
	}
}

function bindLockDown($elem, subCatId) {
	
	if ($elem == '' || $elem == null || $elem == undefined) {
		$elem = $('.subHeader.' + subCatId).closest('.ContentTableWrapper');
	}
	
	if($elem==undefined || $elem.length==0){
		return false;
															}
	
	//CASHING ALL THE VALUES FOR PERFORMANCE FIX XGSAA
	var promoWeek=$('#promotionWeek').val();
	var sortByOption=$('#sortByOptions').val();
	var $lineItem=$elem.find('.line-item');
	var central_promo ='C';
	var instore_promo ='I';
	var parentElem='';
	var promoTypeElem='';
	var prevTrElem='';
	var promoTypeVal='';
	var storeDemandElem='';
	var buildElemPrev='';
	var displayElemPrev='';
	var tempMoreFlag = false;
	var tempDisplayText ='';
	var tempDispArray = [];
	var uniqueDispArray = [];
	var $displayMoreElem ='';
	var $additionPromElem = '';
	var durationFlag = false;
	var editDisplayFlag = false;
	var editBuildFlag = false;
	var buildReadonlyFlag = false;
	var duration = '';
	var $durationElem = '';
	var parentArticle = '';
	var pbdArticle = '';
	var $isisSpan ='';
	var i = 0;
	var tempStartDay = 7;
	var tempEndDay = 1;
	var $tempStartEnd ='';
	var tempStartEndText ='';
	var start_day = '';
	var end_day = '';
	var $promoDays = '';
	var promDaysFlag = false;
	var $promSpan = '';
	if($lineItem==undefined || $lineItem.length==0){
		return false;
															}
	
	//REOMOVED UNWANTED CODE,FOR PERFORMANCE FIX XGSAA
	$lineItem.each(function() {
		i++;
		parentElem=$(this);
		promoTypeElem= parentElem.find('.in_prom_type');
		storeDemandElem=parentElem.find('.storeDemand');
		buildElemCurr=parentElem.find('.buildQty');
		displayElemCurr=parentElem.find('.displayQty');
		$promoDays = parentElem.find('.prom-days');
		
		if(parentElem.hasClass('secondary-line-item')){
			$displayMoreElem = parentElem.find('.displayMore:first');
			$durationElem = parentElem.find('.duration-data');
			$additionPromElem = parentElem.closest('.additionalPromos');
			prevTrElem=$additionPromElem.prev();
			buildElemPrev=prevTrElem.find('.buildQty');
			displayElemPrev=prevTrElem.find('.displayQty');
			
			//PART OF ITERATE METHOD ACTIONS & //PART OF PROMO QTY LOGIC
			if(buildElemCurr!=undefined && buildElemCurr.val().trim()!=''){
				buildElemPrev.attr('readonly','readonly');
				editBuildFlag = true;
			}/*else{
				//PART OF PROMO QTY LOGIC
				editBuildFlag = true;
			}*/
			
			//PART OF PROMO QTY LOGIC XDKN9
			if(buildElemCurr!=undefined && buildElemCurr.attr('readonly') == 'readonly'){
				buildReadonlyFlag = true;
									}
			
			//PART OF ITERATE METHOD ACTIONS & //PART OF PROMO QTY LOGIC
			if(displayElemCurr!=undefined && displayElemCurr.val().trim()!=''){
				displayElemPrev.attr('readonly','readonly');
				editDisplayFlag = true;
			}/*else{
				//PART OF PROMO QTY LOGIC
				editDisplayFlag = true;
			}*/
			 //PART OF PROMO QTY LOGIC
			 if(duration == ''){
				duration = $durationElem.text().trim();
			 }else if(duration != $durationElem.text().trim()){
				 durationFlag = true;
															}
			
			//PART OF EXPAND COLLAPSE OPTION
			if($displayMoreElem!=undefined && $displayMoreElem!=''){
				 tempDispArray.push($displayMoreElem.text().trim());
				 if(tempDisplayText == ''){
					 tempDisplayText = $displayMoreElem.text().trim();
					 uniqueDispArray.push($displayMoreElem.text().trim());
				 }else if(tempDisplayText != $displayMoreElem.text().trim()){
					 tempMoreFlag = true;
					 tempDisplayText = $displayMoreElem.text().trim();
					 uniqueDispArray.push($displayMoreElem.text().trim());
															}
									}
			
			//PART OF TOTAL DAYS CALCULATION
			$tempStartEnd=parentElem.find('.start-end-day');
			if($tempStartEnd!=undefined && $tempStartEnd.length>0){
				tempStartEndText =$tempStartEnd.text();
				start_day = calDays(tempStartEndText.split('-')[0].trim());
				end_day = calDays(tempStartEndText.split('-')[1].trim());
				if (tempStartDay > start_day) {
					tempStartDay = start_day;
								}
				if (tempEndDay < end_day) {
					tempEndDay = end_day;
															}
				promDaysFlag = true;
															}
		}else{
			//PART OF EXPAND COLLAPSE OPTION
			
			//clearing this variable as expand for last multi-promotion article didnt display as expected
			//$additionPromElem = undefined;
			
			if (tempMoreFlag == true && prevTrElem!=undefined && prevTrElem.length>0
					&& uniqueDispArray.length>1) {
				prevTrElem.find('.deactive-icon').removeClass('deactive-icon').unbind('click');
				prevTrElem.find('.thDisplay').attr('width', '277px');
				prevTrElem.find('.displayMore').find('.moreNumber').remove();
				prevTrElem.find('.displayMore')//.css('width', '155px')
				.append('<br><a class="moreNumber moreDisplayBtn" title="More Display Types"><span>-</span> '+ uniqueDispArray.length + '</a>');
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
			} else if(tempDispArray.length > 1 && prevTrElem!=undefined && prevTrElem.length>0){
				prevTrElem.find('.deactive-icon').removeClass('deactive-icon').unbind('click');
				prevTrElem.find('.thDisplay,.thPrice').attr('width', '277px');
				prevTrElem.find('.displayMore').find('.moreNumber').remove();
				prevTrElem.find('.priceMore')//.css('width', '155px')
				.append('<br><a class="moreNumber morePricesBtn" title="More Promotion Prices"><span>-</span> '+ tempDispArray.length + '</a>');
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
			}
			
			// PART OF ISIS NO LOGIC
			$isisSpan=parentElem.find('td:first').find('span');
			if($isisSpan!=undefined && $isisSpan.length>0){
				
				if (parentArticle.trim() == '') {
					parentArticle =$isisSpan.attr('id').split('-')[1].trim();
				}
				if (parentArticle.trim() != ''
						&& parentArticle.trim() == $isisSpan.attr('id').split('-')[1].trim()) {
					if (pbdArticle == '') {
						pbdArticle = $isisSpan.text().trim();
									} else {
						if ($isisSpan.text().trim() != '')
							pbdArticle += ','+ $isisSpan.text().trim();
									}
								} else {
					if (pbdArticle.trim() != '') {
						$('.' + parentArticle + '.rowSubTitle').html('').html('<strong>ISIS Article # : </strong>'+ pbdArticle);
					} else {
						$('.' + parentArticle + '.rowSubTitle').addClass('hideBlock');
															}
					parentArticle = $isisSpan.attr('id').split('-')[1].trim();
					pbdArticle = $isisSpan.text().trim();
															}
									}
			
			//PART OF PROMO DAYS CALCULATION
			if(promDaysFlag  && prevTrElem!=undefined && prevTrElem.length>0){
				$promoDays = prevTrElem.find('.prom-days');
			}else if($promoDays!=undefined && $promoDays.length>0){
				$promSpan =$promoDays.find('span');
				start_day = 0; end_day = 0;
				if ($promSpan != '' && $promSpan != undefined && $promSpan.text() != undefined 
						&& $promSpan.text().split('-').length > 0){
					start_day = calDays($promSpan.text().split('-')[0].trim());
					end_day = calDays($promSpan.text().split('-')[1].trim());
					tempStartDay = start_day;
					tempEndDay = end_day;
					$promoDays.attr('title',$promoDays.text());
								}
															}
			if($promoDays!=undefined && $promoDays.length>0){
			$promoDays.text((tempEndDay - tempStartDay) + 1);
															}
			
			uniqueDispArray = [];
			tempDispArray =[];
			tempDisplayText = '';
			tempMoreFlag = false;
			tempStartDay = 7;
			tempEndDay = 1;
			promDaysFlag = false;
									}
		if ($lineItem.length == i) {
			if (pbdArticle.trim() != '') {
				$('.' + parentArticle + '.rowSubTitle').html('').html('<strong>ISIS Article # : </strong>'+ pbdArticle);
								} else {
				$('.' + parentArticle + '.rowSubTitle').addClass('hideBlock');
															}
			if (tempMoreFlag == true && prevTrElem!=undefined && prevTrElem.length>0
					&& uniqueDispArray.length>1) {
				prevTrElem.find('.deactive-icon').removeClass('deactive-icon').unbind('click');
				prevTrElem.find('.thDisplay').attr('width', '277px');
				prevTrElem.find('.displayMore').find('.moreNumber').remove();
				prevTrElem.find('.displayMore')//.css('width', '155px')
				.append('<br><a class="moreNumber moreDisplayBtn" title="More Display Types"><span>-</span> '+ uniqueDispArray.length + '</a>');
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
			} else if(tempDispArray.length > 1 && prevTrElem!=undefined && prevTrElem.length>0){
				prevTrElem.find('.deactive-icon').removeClass('deactive-icon').unbind('click');
				prevTrElem.find('.thDisplay,.thPrice').attr('width', '277px');
				prevTrElem.find('.displayMore').find('.moreNumber').remove();
				prevTrElem.find('.priceMore')//.css('width', '155px')
				.append('<br><a class="moreNumber morePricesBtn" title="More Promotion Prices"><span>-</span> '+ tempDispArray.length + '</a>');
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
															}
			

			//PART OF PROMO DAYS CALCULATION
			if(promDaysFlag  && prevTrElem!=undefined && prevTrElem.length>0){
				$promoDays = prevTrElem.find('.prom-days');
				if($promoDays!=undefined && $promoDays.length>0){
					$promoDays.text((tempEndDay - tempStartDay) + 1);
									}
			}/*else if($promoDays!=undefined && $promoDays.length>0){
				$promSpan =$promoDays.find('span');
				start_day = 0; end_day = 0;
				if ($promSpan != '' && $promSpan != undefined && $promSpan.text() != undefined 
						&& $promSpan.text().split('-').length > 0){
					start_day = calDays($promSpan.text().split('-')[0].trim());
					end_day = calDays($promSpan.text().split('-')[1].trim());
					tempStartDay = start_day;
					tempEndDay = end_day;
					$promoDays.attr('title',$promoDays.text());
								}
			}*/
			
			
			uniqueDispArray = [];
			tempDispArray =[];
			tempDisplayText = '';
			tempMoreFlag = false;
			tempStartDay = 7;
			tempEndDay = 1;
			promDaysFlag = false;
							}
		if (promoWeek == '0') {
			//PART OF LOCKING
			parentElem.find('.buildQty,.deliveryDate').parent().addClass('hideBlock').attr('readonly', 'readonly');
			
			//PART OF PROMO QTY LOGIC
			if($additionPromElem!= undefined && $additionPromElem.length >0
					&& prevTrElem!=undefined && prevTrElem.length >0
					//SWITCH TO IDENTIFY END OF LOOP
					&& tempDispArray.length == 0){
				$additionPromElem.removeClass('hideBlock');
				prevTrElem.find('.moreNumber span').text('-');
				prevTrElem.find('.displayQty').val('').attr('readonly','readonly').attr('title', multiplePromotions);
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
														}
			
			//PART OF LOCKING
			if (forecastLock == 'Y') {
					if(promoTypeElem !=undefined && promoTypeElem.length>0  
							&&  storeDemandElem!=undefined && storeDemandElem.length>0){
						promoTypeVal=promoTypeElem.text();
						
						if( promoTypeVal == central_promo){
							storeDemandElem.attr('readonly','readonly');
														}
						
						if(prevTrElem !=undefined && prevTrElem.length>0 && promoTypeVal == instore_promo && prevTrElem.prev().prev().find('.promDate').text().split('_')[0].trim() == parentElem.closest('table').parent().parent().attr('class').split('-')[0].trim()){
							prevTrElem.find('.storeDemand').removeAttr('readonly').attr('title', 'Store Demand');
								}
					}
				} 
							} else {
			
			//PART OF LOCKING
			if (lockdownFlag == 'N') {
				if((sortByOption == 'Media' || sortByOption == 'Category'))
					if(prevTrElem !=undefined && prevTrElem.length>0 && promoTypeVal == instore_promo  && prevTrElem.prev().prev().find('.promDate').text().split('_')[0].trim() == parentElem.closest('table').parent().parent().attr('class').split('-')[0].trim()){
						prevTrElem.find('.storeDemand').removeAttr('readonly').attr('title', 'Store Demand');
													}
			} else {
				if(promoTypeElem !=undefined && promoTypeElem.length>0  
						&&  storeDemandElem!=undefined && storeDemandElem.length>0){
					promoTypeVal=promoTypeElem.text();
					
					if( promoTypeVal == central_promo){
						parentElem.find('.buildQty,.storeDemand,.displayQty,.deliveryDate').attr('readonly','readonly');
						parentElem.find('.deliveryDate').attr('disabled','disabled');
													}
					
					if(prevTrElem !=undefined && prevTrElem.length>0 && promoTypeVal == instore_promo  && prevTrElem.prev().prev().find('.promDate').text().split('_')[0].trim() == parentElem.closest('table').parent().parent().attr('class').split('-')[0].trim()){
						prevTrElem.find('.storeDemand').removeAttr('readonly').attr('title', 'Store Demand');
					}
				}
								$('.futureweek').addClass('hideBlock');
							}
			
			//PART OF PROMO QTY LOGIC
			if($additionPromElem!= undefined && $additionPromElem.length >0
					&& prevTrElem!=undefined && prevTrElem.length >0
					//SWITCH TO IDENTIFY END OF LOOP
					&& tempDispArray.length ==0){
				if (durationFlag || editDisplayFlag || editBuildFlag) {
					$additionPromElem.removeClass('hideBlock');
					prevTrElem.find('.moreNumber span').text('-');
					prevTrElem.find('.displayQty').val('').attr('readonly', 'readonly').attr('title',multiplePromotions);
					prevTrElem.find('.buildQty,.deliveryDate').val('').attr('readonly', 'readonly').attr('title',multiplePromotions);
				} else if(buildReadonlyFlag){
					$additionPromElem.removeClass('hideBlock');
					prevTrElem.find('.moreNumber span').text('-');
					prevTrElem.find('.buildQty,.deliveryDate').val('').attr('readonly', 'readonly').attr('title',multiplePromotions);
				} else {
					$additionPromElem.addClass('hideBlock');
					prevTrElem.find('.moreNumber span').text('+');
						}
				prevTrElem.find('.moreNumber').unbind('click').bind('click',expandCollapse);
				buildReadonlyFlag =false;
				durationFlag = false;
				editDisplayFlag =false;
				editBuildFlag = false;
				$additionPromElem = '';
				prevTrElem = '';
			}
		}
		bindInputFieldAction(parentElem);
					});
	
	var $fixHead=$('.fixedHeader');
	//THE BELOW CODE IS USED TO CRETAE THE HEADER
	if (promoWeek == '0') {
		$elem.find('.build,.deliveryDt,.deliverySubHr,.deliveryDtTd,.buildTd').addClass('hideBlock');
		$elem.find('.storeHrd').attr('colspan', '3');
		$elem.find('.storeSubHr').attr('colspan', '1');
		$elem.find('.sourceHdr').attr('colspan', '1');
		$fixHead.find('.build,.deliveryDt').addClass('hideBlock');
		$fixHead.find('.storeHrd').attr('colspan', '3');
		$fixHead.find('.storeSubHr').attr('colspan', '1');
		$fixHead.find('.sourceHdr').attr('colspan', '1');
	}else{
		$elem.find('.residueTd').addClass('hideBlock');
		$elem.find('.extra').addClass('hideBlock');
		$elem.find('.storeHrd').attr('colspan', '3');
		$fixHead.find('.extra').addClass('hideBlock');
		$fixHead.find('.extra').addClass('hideBlock');
		$fixHead.find('.storeHrd').attr('colspan', '3');
	}
	
}
function getDisplyTypes() {
	$.ajax({
		url : "getDisplay.htm",
		data : {
			key : $('#promotionWeek').val()
		},
		type : "get",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response != null && response != undefined && response != '') {
				var output = $.parseJSON(response);
				var list = output.data;
				var temp = "";
				var content = "<option value=" + '0' + ">Select</option>";
				$.each(list, function(i, item) {
					if (temp == '' || item.displayTypeCode != temp) {
						temp = item.displayTypeCode;
						content += '<option value="' + item.displayTypeCode
								+ '" id="' + item.displayTypeCode + '" title="'
								+ item.displayTypeCode;
						if (item.displayTypeDesc != null
								&& item.displayTypeDesc != undefined
								&& item.displayTypeDesc != ''
								&& item.displayTypeCode != null
								&& item.displayTypeCode != ''
								&& item.displayTypeCode != undefined) {
							content += ' - ' + item.displayTypeDesc;
						}
						content += '">' + item.displayTypeCode + '</option>';
					}
				});
				$('#displayType').html('').html(content);
				$('#displayType option[value="null"]').addClass('hideBlock');
			}
			stopLoading();
		},
		error : function() {
			// gotoLogin();
		}
	});
}
function bindISISArticle() {
	var parentArticle = '';
	var pbdArticle = '';
	var i = 0;
	$('.noChild.line-item.onlyRows:visible')
			.filter(
					function() {
						i++;
						if (parentArticle.trim() == '') {
							parentArticle = $(this).find('td:first').find(
									'span').attr('id').split('-')[1].trim();
						}

						if (parentArticle.trim() != ''
								&& parentArticle.trim() == $(this).find(
										'td:first').find('span').attr('id')
										.split('-')[1].trim()) {
							//console.log(parentArticle);
							if (pbdArticle.trim() == '') {
								pbdArticle = $(this).find('td:first').find(
										'span').text().trim();
							} else {
								if ($(this).find('td:first').find('span')
										.text().trim() != '')
									pbdArticle += ','
											+ $(this).find('td:first').find(
													'span').text().trim();
							}
						} else {
							if (pbdArticle.trim() != '') {
								// console.log(parentArticle
								// +'____'+pbdArticle);
								$('.' + parentArticle + '.rowSubTitle')
										.html('').html(
												'<strong>ISIS Article # : </strong>'
														+ pbdArticle);

							} else {
								// console.log('.' + parentArticle +
								// '.rowSubTitle');
								$('.' + parentArticle + '.rowSubTitle')
										.addClass('hideBlock');
							}
							// console.log(parentArticle);
							parentArticle = $(this).find('td:first').find(
									'span').attr('id').split('-')[1].trim();
							pbdArticle = $(this).find('td:first').find('span')
									.text().trim();
						}
						if ($('.noChild.line-item.onlyRows:visible').length == i) {
							if (pbdArticle.trim() != '') {
								// console.log(parentArticle
								// +'____'+pbdArticle);
								$('.' + parentArticle + '.rowSubTitle')
										.html('').html(
												'<strong>ISIS Article # : </strong>'
														+ pbdArticle);

							} else {
								// console.log('.' + parentArticle +
								// '.rowSubTitle');
								$('.' + parentArticle + '.rowSubTitle')
										.addClass('hideBlock');
							}
						}
					});

	$('.update-tool-tip td').tooltip({
		position : {
			my : "left top",
			at : "left top-30"
		}
	});
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
function checkForChange() {
	var editString = '';
	var index = '';
	var $saveBtn ='';
	var $accord_hold='';
	var $line_items='';
	$saveBtn=$('.saveBtn:visible');
	
	if($saveBtn==undefined || $saveBtn.length==0){
		return false;
	}
	//$accord_hold=$saveBtn.closest('.ui-accordion-content');
	//defect 14835
	$accord_hold=$saveBtn.closest('.ui-widget-content');
	$line_items=$accord_hold.find('.line-item');
	$line_items.each(
					function() {
						index = (this.id);
						var $curr_elem=$(this);
						var $hiddenValuesFlagElem=$curr_elem.find('.hiddenValuesFlag').text();
						var $hiddenValuesElem=$curr_elem.find('.hiddenValues').text();
						var hiddenValuesFlag=$hiddenValuesFlagElem.split(':');
						var hiddenValues=$hiddenValuesElem.split(':');
						var hiddenValSet=true;
						var hiddenValFlagSet = true;
						if(hiddenValues.length == 0)
							hiddenValSet=false;
						if(hiddenValuesFlag.length == 0)
							hiddenValFlagSet=false;
						
						if(hiddenValSet==false || hiddenValFlagSet==false){
							return false;
						}
						var $demand_elem=$curr_elem.find('.storeDemand');
						var $display_elem=$curr_elem.find('.displayQty');
						var $build_elem=$curr_elem.find('.buildQty');
						var $delivery_Date =$curr_elem.find('.deliveryDate');
						
						var storeDemand = Number(($demand_elem.attr('readonly') == 'readonly'
								|| $demand_elem.hasClass('hideBlock') 
								|| $demand_elem.is(':disabled')) ? '' 
								: $demand_elem.val());
						var storeDemandOrg = Number(($demand_elem.attr('readonly') == 'readonly'
								|| $demand_elem.hasClass('hideBlock') 
								|| $demand_elem.is(':disabled')) ? ''
								: hiddenValues[2].trim());
						var displayQty = Number(($display_elem.attr('readonly') == 'readonly'
								|| $display_elem.hasClass('hideBlock') 
								|| $display_elem.is(':disabled')) ? ''
								: $display_elem.val());
						var displayQtyOrg = Number(($display_elem.attr('readonly') == 'readonly'
								|| $display_elem.hasClass('hideBlock') 
								|| $display_elem.is(':disabled')) ? ''
									: hiddenValues[3].trim());
						var buildQty = Number(($build_elem.attr('readonly') == 'readonly'
								|| $build_elem.hasClass('hideBlock') 
								|| $build_elem.is(':disabled')) ? '0' 
								: $build_elem.val() == '' ? '0' 
								: $build_elem.val());
						var buildQtyOrg = Number(($build_elem.attr('readonly') == 'readonly'
								|| $build_elem.hasClass('hideBlock') 
								|| $build_elem.is(':disabled')) ? '0'
								: hiddenValues[4].trim() == '' ? '0' 
								: hiddenValues[4].trim());
						var deliveryDate = ($delivery_Date.attr('readonly') == 'readonly'
								|| $delivery_Date.hasClass('hideBlock')
								|| $delivery_Date.is(':disabled')
								|| $build_elem.val().trim() == '0' 
								|| $build_elem.val().trim() == '') ? ''
								: $delivery_Date.val();
						var deliveryDateOrg = ($delivery_Date.attr('readonly') == 'readonly'
								|| $delivery_Date.hasClass('hideBlock')
								|| $delivery_Date.is(':disabled')
								|| $build_elem.val().trim() == '0' 
								|| $build_elem.val().trim() == '') ? ''
								: hiddenValues[5].trim();

						var ddF, sdF, dqF, bqF;

						if ((deliveryDate == deliveryDateOrg))
							ddF = 'null';
						else
							ddF = deliveryDate;
						if ((storeDemand == storeDemandOrg))
							sdF = 'null';
						else {
							sdF = storeDemand;
						}
						if ((displayQty == displayQtyOrg))
							dqF = 'null';
						else {
							dqF = displayQty;
						}
						if ((buildQty == buildQtyOrg))
							bqF = 'null';
						else {
							bqF = buildQty;
						}

						if (((deliveryDate != deliveryDateOrg)
								|| (storeDemand != storeDemandOrg)
								|| (buildQty != buildQtyOrg) || (displayQty != displayQtyOrg))
								&& editString == "")
							editString = index + ':' + sdF + '_' + dqF + '_'
									+ bqF + '_' + ddF;
						else if (((deliveryDate != deliveryDateOrg)
								|| (storeDemand != storeDemandOrg && storeDemand != 'undefined')
								|| (buildQty != buildQtyOrg) || (displayQty != displayQtyOrg))
								&& editString != "")
							editString = editString + ',' + index + ':' + sdF
									+ '_' + dqF + '_' + bqF + '_' + ddF;
					});
	if (editString == '') {
		return false;
	} else {
		return true;
	}

}

function resetHiddenVal(editString) {

	var commStr = '';
	for ( var i = 0; i < editString.split(',').length; i++) {
		if (commStr == '')
			commStr += '?' + editString.split(',')[i].split(':')[0] + '?';
		else
			commStr += '?' + editString.split(',')[i].split(':')[0] + '?';
	}
	var index = -1;
	$('.saveBtn:visible').parent().parent().find('.line-item').each(
			function() {
				index = $(this).attr('id');// ++;

				if (commStr.indexOf('?' + index + '?') != -1)

				{
					var storeDemand = $(this).find('.storeDemand').val();

					// var storeDemandOrg =
					// $(this).find('.hiddenValues').text().trim().split(':')[2].trim();
					var displayQty = $(this).find('.displayQty').val();
					// var displayQtyOrg =
					// $(this).find('.hiddenValues').text().trim().split(':')[3].trim();
					var buildQty = $(this).find('.buildQty').val();
					// var buildQtyOrg =
					// $(this).find('.hiddenValues').text().trim().split(':')[4].trim();
					var deliveryDate = $(this).find('.deliveryDate').val();
					// var deliveryDateOrg =
					// $(this).find('.hiddenValues').text().trim().split(':')[5].trim();
					var om = $(this).find('.hiddenValuesFlag').text()
							.split(':')[3];

					om = (om != null && om != undefined && om != '') ? om : 1;
					var ostr = $(this).find('.hiddenValues').text().trim();
					var cstr = ostr.split(':')[0].trim() + ':'
							+ ostr.split(':')[1].trim() + ':';
					if ($(this).find('.storeDemand').hasClass('errorField')) {
						cstr += ostr.split(':')[2].trim();
					} else {
						cstr += storeDemand;
					}
					cstr += ':';
					if ($(this).find('.displayQty').hasClass('errorField')) {
						cstr += ostr.split(':')[3].trim();
					} else {
						cstr += displayQty;
					}
					cstr += ':';
					if ($(this).find('.buildQty').hasClass('errorField')) {
						cstr += ostr.split(':')[4].trim();
					} else {
						cstr += buildQty;
					}
					cstr += ':';
					if ($(this).find('.deliveryDate').hasClass('errorField')) {
						cstr += ostr.split(':')[5].trim();
					} else {
						cstr += deliveryDate;
					}
					cstr += ':' + ostr.split(':')[6].trim() + ':'
							+ ostr.split(':')[7].trim();

					$(this).find('.hiddenValues').text(cstr);

				}

			});
	editString = '';

}

function beforeActiveTab(event, ui) {

	//console.log('beforeActivate' + ui);

	if (checkForChange()) {
		if (accordOpenFlag) {
			showWarn('Do you want to save changes?');
			try {
				previousEvent = '';
				previousEvent = event.currentTarget;
				event.preventDefault();
			} catch (err) {
				//console.log(err);
			}
		}
		$('.yesBtn').unbind('click');
		$('.yesBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			$('.saveBtn:visible').click();

		});
		$('.noBtn').unbind('click');
		$('.noBtn').click(function() {
			$('#dialog-modal-alertBox').dialog('close');
			accordOpenFlag = false;
			$('#' + ui.newTab.attr('aria-labelledby')).click();
			// accordOpenFlag=true;
		});
	}

}
function loadSearchDtl() {

	var weekVal = $(
			'#promotionWeek option[value="' + $("#promotionWeek").val() + '"]')
			.text();
	if ($('#articleNo').val().trim() == "")

		weekVal += ' : Promotion Plan for ' + $(".hierarchyname").val()
				+ ' Sort By :' + $('#sortByOptions').val();
	else

		weekVal += ' : Promotion Plan for  Article ' + $('#articleNo').val()
				+ ' Sort By :' + $('#sortByOptions').val();

	if ($('input[name="sourceSupply"]:checked').val() == 'warehouse') {
		if ($('#supplier').val().trim() == '')
			weekVal += ' Source of Supply : ' + 'Warehouse ';
		else
			weekVal += ' Source of Supply : '
					+ $('#supplier').val().split('-')[0];
	} else if ($('input[name="sourceSupply"]:checked').val() == 'vendor') {
		if ($('#supplier').val().trim() == '')
			weekVal += ' Source of Supply : ' + 'Vendor ';
		else
			weekVal += ' Source of Supply : '
					+ $('#supplier').val().split('-')[0];
	}
	if ($('#promotionsDropDown').val() != 'All')
		weekVal += ' Promotion : ' + $('#promotionsDropDown').val();

	if ($('#promoType').val() != 'All')
		weekVal += ' Type : '
				+ $('#promoType option[value="' + $('#promoType ').val() + '"]')
						.text();

	if ($('#minDiscount').val() != '') {
		weekVal += ' Min. Discount : ' + $('#minDiscount').val() + ' %';
	}

	if ($('#displayType').val() != '0') {
		weekVal += ' Display Type : '
				+ $(
						'#displayType option[value="'
								+ $('#displayType ').val() + '"]').text();
	}

	if ($('#omVal').val() != '') {
		weekVal += ' Difference in OM : ' + $('#omVal').val()
				+ ($('#unit').is(':checked') ? ' Unit' : '%');
	}

	if ($('#actioned').is(':checked')) {
		weekVal += ' ' + $('#actioned').next().text().trim();
	}

	if ($('#residualQty').is(':checked')) {
		weekVal += ' ' + $('#residualQty').next().text().trim();
	}
	
	if ($('#displayQty').is(':checked')) {
		weekVal += ' ' + $('#displayQty').next().text().trim();
	}
	
	$('.wizardTitle').text(weekVal);
	
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function allignTheHeader() {	
	$(window).unbind('scroll');
	$(window).scroll(function() {
		var $scorollFirstElem=$('#treetable:visible tbody .appendedRow:first');
		var $scorollLastElem=$('#treetable:visible tbody .appendedRow:last');
		var $fixedHdrElem = $('.fixedHeader');
			if (($scorollFirstElem != undefined && $scorollFirstElem.length > 0)
					|| ($scorollLastElem != undefined && $scorollLastElem.length > 0)) {
				if (!(isScrolledIntoView($scorollFirstElem)) 
						&& $(window).scrollTop() > $scorollFirstElem.offset().top) {
					if ($(window).scrollTop() < $scorollLastElem.offset().top){
						$fixedHdrElem.removeClass('hideBlock').css('left',($(window).width() - 980) / 2);
						if($('#depH').is(':checked') && $('#subCategoryLst').find("input[name='subCat']").is(':checked') && $('.supplyDrop').val()== "Category"){
							
							$('.fixedHeader .compactTable ').addClass("cssTblClass");
							$('.fixedHeader .compactTable ').removeClass("changeWidth");
							
						}else{
							$('.fixedHeader .compactTable ').removeClass("cssTblClass");
							$('.fixedHeader .compactTable ').addClass("changeWidth");
						}
						
					}
								else{
						$fixedHdrElem.addClass('hideBlock');
								}
							} else {
					$fixedHdrElem.addClass('hideBlock');
							}
						} else {
				$fixedHdrElem.addClass('hideBlock');
						}
					});
}

function bindArticleCheck() {
	var temp = '';
	var flag = false;
	$('.article-list').filter(function() {

		if (temp == '')
			temp = $(this).find('.art-no').text().trim();

		if (temp != $(this).find('.art-no').text().trim()) {
			flag = true;
			//console.log($(this).find('.art-no').text().trim());
		}
	});
	if (!flag) {
		$('.article-list .lastColumn .checkbox').click();
	}
}
function bindPromoQtyLogic() {

	if ($('#promotionWeek').val() == '0') {
		$('.buildQty,.deliveryDate').attr('readonly', 'readonly').css(
				'background', 'rgb(217, 217, 217)').attr('title',
				multiplePromotions);
		$('.ContentTable:visible').find('.additionalPromos').filter(
				function() {
					
					$(this).removeClass('hideBlock');
					$(this).prev().find('.moreNumber span').text('-');
					$(this).prev().find('.displayQty').val('').attr('readonly',
							'readonly').css('background', 'rgb(217, 217, 217)')
							.attr('title', multiplePromotions);
				});
	} else {

		$('.ContentTable:visible').find('.additionalPromos').filter(
				function() {
					var durationFlag = false;
					var editDisplayFlag = false;
					var editBuildFlag = false;
					var duration = '';
					$(this).find('.secondary-line-item').filter(function() {

						var d = $(this).find(':nth-child(2)')[0];
						if (duration == '')
							duration = $(d).text();
						if (duration != $(d).text()) {
							durationFlag = true;
						}
						if ($(this).find('.displayQty').val().trim() != '') {
							editDisplayFlag = true;
						}
						if ($(this).find('.buildQty').val().trim() != '') {
							editBuildFlag = true;
						}
					});
					// console.log($(this)[0]);
					if (durationFlag || editDisplayFlag || editBuildFlag) {
						$(this).removeClass('hideBlock');
						$(this).prev().find('.moreNumber span').text('-');
						$(this).prev().find('.displayQty').val('').attr(
								'readonly', 'readonly').css('background',
								'rgb(217, 217, 217)').attr('title',
								multiplePromotions);
						$(this).prev().find('.buildQty,.deliveryDate').val('')
								.attr('readonly', 'readonly').css('background',
										'rgb(217, 217, 217)').attr('title',
										multiplePromotions);
					} else {

						$(this).addClass('hideBlock');
						$(this).prev().find('.moreNumber span').text('+');

					}
					if (editDisplayFlag) {
						$(this).prev().find('.displayQty').val('').attr(
								'readonly', 'readonly').css('background',
								'rgb(217, 217, 217)').attr('title',
								multiplePromotions);
					}
					if (editBuildFlag) {
						$(this).prev().find('.buildQty,.deliveryDate').val('')
								.attr('readonly', 'readonly').css('background',
										'rgb(217, 217, 217)').attr('title',
										multiplePromotions);
					}
				});
	}
	$('.secondary-line-item .displayQty')
			.keyup(
					function() {
						var d = $(this).parent().parent().parent().parent()
								.parent().parent();
						// console.log($(this).parent().parent().parent().parent().parent());
						if ($(this).val() != '') {
							if ($(d).prev().find('.displayQty')
									.attr('readonly') != 'readonly')
								$(d).prev().find('.displayQty').val('')
										.addClass('temp').attr('readonly',
												'readonly').css('background',
												'rgb(217, 217, 217)').attr(
												'title', multiplePromotions);
						} else {
							if ($(d).prev().find('.displayQty')
									.hasClass('temp')) {
								$(d).prev().find('.displayQty').removeClass(
										'temp').removeAttr('readonly').css(
										'background', '').removeAttr('title');
							}
						}
					});
	$('.secondary-line-item .buildQty,.secondary-line-item .deliveryDate')
			.keyup(
					function() {
						var d = $(this).parent().parent().parent().parent()
								.parent().parent();
						// console.log($(this).parent().parent().parent().parent().parent());
						if ($(this).val() != '') {
							if ($(d).prev().find('.buildQty').attr('readonly') != 'readonly')
								$(d).prev().find('.buildQty,.deliveryDate')
										.val('').addClass('temp').attr(
												'readonly', 'readonly').css(
												'background',
												'rgb(217, 217, 217)').attr(
												'title', multiplePromotions);
						} else {
							if ($(d).prev().find('.buildQty').hasClass('temp')) {
								$(d).prev().find('.buildQty').removeClass(
										'temp').removeAttr('readonly').css(
										'background', '').removeAttr('title');
							}
							if ($(d).prev().find('.deliveryDate').hasClass(
									'temp')) {
								$(d).prev().find('.deliveryDate').removeClass(
										'temp').removeAttr('readonly').css(
										'background', '').removeAttr('title');
							}
						}
					});
	$('.secondary-line-item .deliveryDate')
			.change(
					function() {
						var d = $(this).parent().parent().parent().parent()
								.parent().parent();
						// console.log($(this).parent().parent().parent().parent().parent());
						if ($(this).val() != '') {
							if ($(d).prev().find('.buildQty').attr('readonly') != 'readonly')
								$(d).prev().find('.buildQty,.deliveryDate')
										.val('').addClass('temp').attr(
												'readonly', 'readonly').css(
												'background',
												'rgb(217, 217, 217)').attr(
												'title', multiplePromotions);
						} else {
							if ($(d).prev().find('.buildQty').hasClass('temp')) {
								$(d).prev().find('.buildQty').removeClass(
										'temp').removeAttr('readonly').css(
										'background', '').removeAttr('title');
							}
							if ($(d).prev().find('.deliveryDate').hasClass(
									'temp')) {
								$(d).prev().find('.deliveryDate').removeClass(
										'temp').removeAttr('readonly').css(
										'background', '').removeAttr('title');
							}
						}
					});
	$('.noChild.line-item .buildQty')
			.keyup(
					function() {
						var sectTbl = $(this).parent().parent().next();
						var enterVal = $(this).val();
						// var calVal;
						var notDividable = false;
						if ($(sectTbl).find('.secondary-line-item') != null
								&& $(sectTbl).find('.secondary-line-item') != undefined
								&& $(sectTbl).find('.secondary-line-item').length > 0
								&& enterVal != null && enterVal != ''
								&& enterVal != undefined
								&& Number(enterVal) > 0) {

							if (Number(enterVal)
									% $(sectTbl).find('.secondary-line-item').length == 0)
								notDividable = false;
							else
								notDividable = true;

							var i = 0;
							var tempBuildVal = 0;
							//console.log('enterVal=' + enterVal);
							$(sectTbl)
									.find('.secondary-line-item')
									.filter(
											function() {
												if (i == 0 && notDividable) {
													tempBuildVal = (Math
															.floor(Number(enterVal)
																	/ $(sectTbl)
																			.find(
																					'.secondary-line-item').length))
															+ (Math
																	.floor(Number(enterVal)
																			% $(
																					sectTbl)
																					.find(
																							'.secondary-line-item').length));
													$(this).find('.buildQty')
															.val(tempBuildVal);
													//console.log('tempBuildVal='
															//+ tempBuildVal);
												} else
													$(this)
															.find('.buildQty')
															.val(
																	Math
																			.floor(Number(enterVal)
																					/ $(
																							sectTbl)
																							.find(
																									'.secondary-line-item').length));
												i++;
											});
						} else {
							$(sectTbl).find('.secondary-line-item .buildQty')
									.val('');
						}
					});

	$('.noChild.line-item .deliveryDate').change(function() {
		var sectTbl = $(this).parent().parent().next();
		var enterVal = $(this).val();
		$(sectTbl).find('.secondary-line-item').filter(function() {

			$(this).find('.deliveryDate').val(enterVal);
		});
	});

	$('.noChild.line-item .displayQty')
			.keyup(
					function() {
						var sectTbl = $(this).parent().parent().next();
						var enterVal = $(this).val();
						// var calVal;
						var notDividable = false;
						if ($(sectTbl).find('.secondary-line-item') != null
								&& $(sectTbl).find('.secondary-line-item') != undefined
								&& $(sectTbl).find('.secondary-line-item').length > 0
								&& enterVal != null && enterVal != ''
								&& enterVal != undefined
								&& Number(enterVal) > 0) {

							if (Number(enterVal)
									% $(sectTbl).find('.secondary-line-item').length == 0)
								notDividable = false;
							else
								notDividable = true;

							var i = 0;
							//console.log('enterVal=' + enterVal);
							tempDispVal = 0;
							$(sectTbl)
									.find('.secondary-line-item')
									.each(
											function() {
												if (i == 0 && notDividable) {
													tempDispVal = (Math
															.floor(Number(enterVal)
																	/ $(sectTbl)
																			.find(
																					'.secondary-line-item').length))
															+ (Math
																	.floor(Number(enterVal)
																			% $(
																					sectTbl)
																					.find(
																							'.secondary-line-item').length));
													$(this).find('.displayQty')
															.val(tempDispVal);

												} else {
													$(this)
															.find('.displayQty')
															.val(
																	Math
																			.floor(Number(enterVal)
																					/ $(
																							sectTbl)
																							.find(
																									'.secondary-line-item').length));
												}

												i++;
											});
						} else {
							$(sectTbl).find('.secondary-line-item .displayQty')
									.val('');
						}

					});

	$('.headWrapper a').bind("click", function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		if (checkForChange()) {
			if (accordOpenFlag)
				showWarn('Do you want to save changes?');
			$('.yesBtn').unbind('click');
			$('.yesBtn').click(function() {
				$('#dialog-modal-alertBox').dialog('close');
				$('.saveBtn:visible').click();
				try {
					previousEvent = '';
					previousEvent = element;
					// event.preventDefault();
				} catch (err) {
					//console.log(err);
				}
			});
			$('.noBtn').unbind('click');
			$('.noBtn').click(function() {
				window.location.href = href;
			});
		} else {
			window.location.href = href;
		}
	});
	if (recordCount != '' && recordCount != undefined && recordCount != null
			&& currentPage != undefined && currentPage != ''
			&& currentPage != null && recordCount > 20) {

		var start = 1;
		if (currentPage == 1)
			start = 1;
		else
			start = ((Number(currentPage) - 1) * 20) + 1;

		var end = start + 19;
		if (recordCount < end)
			end = recordCount;
		$('.recordCount:visible').parent().parent().html(
				'<h4>Articles <strong class="recordCount">' + start + '-' + end
						+ '</strong> of <strong>' + recordCount
						+ '</strong></h4>');
	}
	if ($('.accordionContentHolder:visible') != null
			&& $('.accordionContentHolder:visible') != undefined
			&& $('.accordionContentHolder:visible').length > 0)
		$(document).scrollTop(
				$('.accordionContentHolder:visible').parent().offset().top);

	/*
	 * Parent build readonly when secondary table has any readonly builds -
	 * durai
	 */
	$('.ContentTable:visible').find('.additionalPromos').filter(
			function() {
				buildDisableFlag = false;
				$(this).find('.buildQty').each(function() {
					if ($(this).attr('readonly') == 'readonly') {
						buildDisableFlag = true;
					}
				});
				if (buildDisableFlag == true) {
					$(this).prev().find('.moreNumber').parent().parent().next()
							.removeClass('hideBlock');
					$(this).prev().find('.moreNumber').find('span').text('-');
					$(this).prev().find('.buildQty,.deliveryDate').val('')
							.attr('readonly', 'readonly').css('background',
									'rgb(217, 217, 217)').attr('title',
									multiplePromotions);
				}
			});
}

function focusPrevItem() {
	if ($currentlyFocusedItem != null && $currentlyFocusedItem != ''
			&& $currentlyFocusedItem != undefined) {
		$currentlyFocusedItem.focus();
	}
}
function focusFirstErrorField() {
	var $firstErrorElem=$('.ContentTableWrapper .ContentTable:visible input.errorField:not(readonly):first');
	if ($firstErrorElem != undefined && $firstErrorElem!='' && $firstErrorElem.length>0) {
		$firstErrorElem.focus();
		 $('html').animate({
			 'scrollTop' : $firstErrorElem.offset().top
		 });
	}
}// $$$$$instore
function bindInstoreDeactivate() {
	$('.deactive-icon').attr('title', 'De-activate promotion');
	$('.deactive-icon').unbind('click');
	$('.deactive-icon').click(
			function(event) {
				event.preventDefault();
				var index = $(this).attr('data-deactive');
				askConfirmationAndDeactivate(
						"Are you sure you want to end the promotion?", index,
						$(this), false);
			});
}

function askConfirmationAndDeactivate(msg, index, obj, flag) {
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function() {

		serviceCallForDeactivate(index, obj, flag);
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");

	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function() {
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
}

function serviceCallForDeactivate(index, obj, flag) {
	$
			.ajax({
				type : "post",
				url : "deactivateInstorePromotion.htm",
				data : {
					"index" : index
				},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					//console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Deactivate service call failed.";
					} else {
						message = dataObj;
					}
					if (message == '') {
						removePromotionFromScreen(index, obj, flag);
						showInformation('In-store promotion has been deactivated successfully.');
					} else {
						//console.log(message);
						showInformation(message);
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showInformation('Sorry, Some technical issue occured.');
					stopLoading();
				},
			});

}

function removePromotionFromScreen(index, obj, flag) {
	/*
	 * if (flag) { // var holder = obj.parent().parent(); // $(holder).find if
	 * ($(obj) != undefined && $(obj).length > 0) {
	 * $(obj).closest.find('input').attr('readonly',
	 * 'readonly').attr('disabled', 'disabled').css('background', 'rgb(217, 217,
	 * 217)').attr( 'title', 'Promotiont Deactivated').val('');
	 * $(obj).prev().prev().find('.deactivatedLabel') .addClass('hideBlock'); } //
	 * holder.html(deactivated); } else {
	 */
	// var holder = obj.parent().parent();
	// $(holder).find
	if ($(obj).closest('tr') != undefined && $(obj).closest('tr').length > 0) {
		$(obj).closest('tr').find('input').attr('readonly', 'readonly').attr(
				'disabled', 'disabled').css('background', 'rgb(217, 217, 217)')
				.attr('title', 'Promotiont Deactivated').val('');
		$(obj).closest('tr').find('.deactive-icon')
				.removeClass('deactive-icon').unbind('click');
		$(obj).closest('.treetable').find(
				'.noChild.line-item.onlyRows[id="' + index
						+ '"] .deactive-icon').removeClass('deactive-icon')
				.unbind('click');
		if ($(obj).closest('tr').hasClass('fist-sub-row')) {
			$(obj).closest('tr').closest('table').closest('tr').prev().find(
					'input').attr('readonly', 'readonly').attr('disabled',
					'disabled').css('background', 'rgb(217, 217, 217)').attr(
					'title', 'Promotiont Deactivated').val('');
		}

		/*
		 * } holder.html(deactivated);
		 */
	}
}

function showInformation(msg) {
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").find('#ok').unbind('click');

	$("#dialog-confirmation").find('#ok').click(function() {
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});

	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

// BELOW METHOD NEWLY ADDED DURING THE PERFORMANCE FIX XGSAA
function createDateObj(psaDisplayStartDate){
	var date_split='';
	var actualPsaDisplayStartDate=new Date();
	var mont = '';
	var finalDate = '';
	if (psaDisplayStartDate != '' && psaDisplayStartDate!=undefined) {
		date_split=psaDisplayStartDate.split('/');
		if (date_split.length > 1) {
			finalDate = parseDate(psaDisplayStartDate).getFullYear();
			mont = date_split[1] - 1;
			actualPsaDisplayStartDate=new Date();
			actualPsaDisplayStartDate.setFullYear(finalDate,mont,date_split[0]);
		}
	}
	return actualPsaDisplayStartDate;
}

function bindInputFieldAction($rowElem){
	var $alltheInputElem = $rowElem.find('input');
	var $eachElem ='';
	$alltheInputElem.each(function(){
		$eachElem = $(this);
		if($eachElem.hasClass('inputDate')){
			$eachElem.datepicker({
				inline : true,
				zIndex : 50
			});
			if ($eachElem.hasClass('deliveryDate')){
				$eachElem.change(function(){if(!$eachElem.hasClass('errorField')) $eachElem.removeAttr('title');});
				if ($eachElem.hasClass('secondary-line-item')){
					$eachElem.bind('change',greyOutParent);
				}else{
					$eachElem.bind('change',copyData);
				}
			}
		}
		
		if ($eachElem.hasClass('buildQty')){
			if ($eachElem.hasClass('secondary-line-item')){
				$eachElem.bind('keyup',greyOutParent);
			}else{
				$eachElem.bind('keyup',spitVal);
			}
		}
		if ($eachElem.hasClass('displayQty')){
			if ($eachElem.hasClass('secondary-line-item')){
				$eachElem.bind('keyup',greyOutParent);
			}else{
				$eachElem.bind('keyup',spitVal);
			}
		}
		
		if (($eachElem.is(':visible') || !$eachElem.parent().hasClass('hideBlock') ) && $eachElem.attr('readonly') != 'readonly'){
			$eachElem.prop('tabindex', tab++);
		}
		
		if($eachElem.hasClass('restrict')){
			$eachElem.bind('keydown',onlyNumeric);
		}
		
		$eachElem.tooltip({position : {my : "top center-30",at : "top center"}});
		if($eachElem.hasClass('.editMode.textbox')){
			if($eachElem.is(':visible')){
				$eachElem.unbind('blur').bind('blur',orignalQtyCheck);
			}
		}
	});
		
	$rowElem.find('.deactive-icon').attr('title', 'De-activate promotion').unbind('click').bind('click',deactiv_eve);
	$rowElem.find("td").tooltip({position : {my : "top center-30",at : "top center"}});
		
		/*elem.find('td').hover(function(){
			if(!($(this).hasClass('tool-tip-added'))){
				$(this).tooltip({position : {my : "top center-30",at : "top center"}})
				.tooltip('open').addClass('tool-tip-added');
			}
		});*/
		/*$elem.find('td.supplier-title').tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});*/
		
		/*$elem.find("th").tooltip({
			position : {
				my : "top center-30",
				at : "top center"
			}
		});*/
}
var deactiv_eve = function(event) {
	event.preventDefault();
	var index = $(this).attr('data-deactive');
	askConfirmationAndDeactivate(
			"Are you sure you want to end the promotion?", index,
			$(this), false);
};

//following methods are for build and display qty round off--- CR modifications
function oldDispquantityRoundOff(oldDisplayQty,om)
{
	if (Number(oldDisplayQty) < Number(om) )
		return Math.ceil((Number(oldDisplayQty)/Number(om))).toFixed(0);
	if (Number(oldDisplayQty) >= Number(om) )
		return (Number(oldDisplayQty)/Number(om)).toFixed(0);
}
function oldBuildquantityRoundOff(oldBuildQty,om)
{
	if (Number(oldBuildQty) < Number(om) )
		return Math.ceil((Number(oldBuildQty)/Number(om))).toFixed(0);
	if (Number(oldBuildQty) >= Number(om) )
		return (Number(oldBuildQty)/Number(om)).toFixed(0);
}