var errorFieldClass = 'errorField';
var tooltipClass = '';
var bigwdaylimit = 31;
var supersdaylimit = 183;
var supersotherpromodaylimit = 31;
var maxAutoListSize = 10;
var suggestionList = [];
var carrSuggList = [];
var freshFoodDayLimit=0;
var pastRangeDaysLimit =0;
var errWrapperHtml='<div id="error-warn-wrapper" style ="display: none;" onclick=\'$("#error-warn-wrapper").fadeOut(50);\'><div class="pageErrorsWrapper " id="errorWrapper"><div class="pageErrorsContent"><div class="pageErrorsTitle">'
	+'<h4 class="title">Errors</h4><a class="close" title="Close" onclick=\'$("#error-warn-wrapper").fadeOut(50);\' >Close</a>'
	+'<p class="description" class="err_title" id="error_title">Order Enquiry.</p></div><div class="content">'
	+'<h4 class="err_sub_title" id = "error_sub_title" class="title">Reason for failure</h4>'
	+'<ol class="err_msg" id="error_msg"></ol></div></div></div></div>';
var errWrapperHtmlStockAdjQty='<div id="error-warn-SAQTY-wrapper" style ="display: none;" onclick="handleStockAdjQTYError()"><div class="pageErrorsWrapper " id="errorWrapper"><div class="pageErrorsContent"><div class="pageErrorsTitle">'
	+'<h4 class="title">Errors</h4><a class="close" title="Close" onclick="handleStockAdjQTYError()" >Close</a>'
	+'<p class="description" class="err_title" id="error_title">Order Enquiry.</p></div><div class="content">'
	+'<h4 class="err_sub_title" id = "error_sub_title" class="title">Reason for failure</h4>'
	+'<ol class="err_msg" id="error_msg"></ol></div></div></div></div>';
var successWrapperHtml ='<div id="success-wrapper" style ="display: none;" onclick=\'$("#success-wrapper").fadeOut(50);\'><div class="pageStatusWrapper" id=""><div class="pageStatusContent"><div class="pageStatusTitle"><h4 class="title" class="err_title" id="success_title">STATUS</h4>'
	+'<a class="close" title="Close" onclick=\'$("#success-wrapper").fadeOut(50);\'>Close</a>'
	+'<p class="description err_title" id="error_title">Order Enquiry.</p></div><div class="content">'
	+'<h4 class="err_sub_title hideBlock" id = "error_sub_title" class="title">Reason for failure</h4>'
	+'<ol class="err_msg" id="success_msg"></ol>'
	+'</div></div></div></div>';
	
var helpWrapperHtml = '<div  id="info-wrapper" style ="display: none;" onclick=\'$("#info-wrapper").fadeOut(50);\'><div class="quickHelpWrapper" id=""><div class="quickHelpContent"><div class="quickHelpTitle"><h4 class="title">Filters</h4><a class="close" title="Close" onclick=\'$("#info-wrapper").fadeOut(50);\'>Close</a><p class="description">The filters allow you to minimise the list of records and let you quickly find relevant information.</p></div>'
	+'<div class="content"><h4 class="title">How to use it?</h4><ul><li>Identify the column you want to filter</li><li>Locate the input box in the filter row corresponding to the identified column</li><li>Start typing letters or numbers based on the column values</li><li>The list filters based on every character or number entry</li>'
	+'<li>Click on \'Clear Filters\' to remove filters</li></ul></div></div></div></div>';
var infoWrapperHtml = '<div  id="submit-info-wrapper" style ="display: none;" onclick=\'$("#submit-info-wrapper").fadeOut(50);\'><div class="quickHelpWrapper" id=""><div class="quickHelpContent"><div class="quickHelpTitle"><h4 class="title">Order Enquiry</h4><a class="close" title="Close" onclick=\'$("#submit-info-wrapper").fadeOut(50);\'>Close</a><p class="description">Status : Submitted</p></div>'
	+'<div class="content"><h4 class="title">Note</h4><ul><li>Order with Status Submitted cannot be viewed.</li><li>Kindly try after 15 - 20 minutes for the data to transmit.</li></ul></div></div></div></div>';
var informationWrapperHtml = '<div  id="information-wrapper" style ="display: none;" onclick=\'$("#information-wrapper").fadeOut(50);\'><div class="quickHelpWrapper" id=""><div class="quickHelpContent"><div class="quickHelpTitle"><h4 class="title" id="error_title" >Stock Transfer</h4>'
	+'<a class="close" title="Close" onclick=\'$("#information-wrapper").fadeOut(50);\'>Close</a>'
	+'<p class="description err_title" id="desc_error_title"></p></div><div class="content">'
	+'<h4 class="title">Note</h4><ul class="err_msg" id="info_msg" ></ul>'
	+'</div></div></div></div>';
var mobiSerErrMsg= 'Technical issue occured in SQLA, Please contact SQLA support.';
var scsSerErrMsg= 'Technical issue occured in StoreCentralService, Please contact java support.';
var repSerErrMsg= 'Technical issue occured in ReplenishmentService, Please contact java support.';
var sapSerErrMsg= 'Technical issue occured in SAP, Please contact SAP support.';
var ngboSessErrMsg = 'Session expired, Please login again';

var mobiSerErrCode= 'SQLA';
var scsSerErrCode= 'SCS';
var repSerErrCode= 'REP';
var sapSerErrCode= 'SAP';
var ngboSessErrCode= 'Session';
var error= 'error';
var success= 'success';
var information= 'info';
var pageTitle ='Order Enquiry.';
var width = '';var cls =''; var title = ''; var name = ''; var row_type =''; var $thead ='';var $tbody ='';var $tr = '';var keyobj='';
var data_type ='';
var main = 'main';
var build ='build';
var update ='update';
var head ='_head';
var foot= '_foot';
var footpage ='_foot_page';
var headpage ='_head_page';
var btable ='_table';
var sorted ='sorted';
var ascending ='ascending';
var descending ='descending'; 
var order  ='order';
var articleDescActionButton = '<div class="popupActionsWrapper"><span class="popupActions"> <label class="secondaryActionBtn" onClick ="$(\'#dialog-mulipleArticles\').dialog(\'close\')">Cancel</label><label class="actionBtn" onClick ="$(\'#dialog-mulipleArticles\').dialog(\'close\')" id="addtolist">Add to List</label></span></div>';
var stkAdjOrdersActionButton = '<div class="popupActionsWrapper"><span class="popupActions"> <label class="secondaryActionBtn" onClick ="$(\'#dialog-mulipleOrders\').dialog(\'close\')">Cancel</label><label class="actionBtn" onClick ="$(\'#dialog-mulipleOrders\').dialog(\'close\')" id="addtolist">Add to List</label></span></div>';
var articleDescPopUp = '<div id="dialog-mulipleArticles" class="ui-dialog-content ui-widget-content" title ="Add Articles to List"><div class="popupContent"><div class="popupData"></div></div>';
var stkAdjOrdersPopUp = '<div id="dialog-mulipleOrders" class="ui-dialog-content ui-widget-content" title ="List of Orders"><div class="popupContent"><div class="popupData"></div></div>';
var checkboxOption ='check';
var selectOption = 'select';
var poptable ='<div class= "ContentTableWrapper"></div>';
var confirmationBox = '<div id="dialog-alert-conf" title ="" class="ui-dialog-content ui-widget-content"> <div class="popupContent"> <div class="popupData popupTitle">'
	+'<h4 class="warning" id="message"></h4></div><div class="margni-top30 popupActionsWrapper"><span class="popupActions" id="ok"> <label class="actionBtn">Ok</label>'
	+'</span><span class="popupActions" id="yes"> <label class="actionBtn">Yes</label></span><span class="popupActions" id="no"> <label class="actionBtn">No</label></span</div></div></div>';

var dialog_promotion = '<div id="dialog-com-openPromo" title="Promotions for this Article"><div class="popupContent"><div class="popupData contentWrapper "><div id="mainTabs-7" class="tabContent">'
+'<div id="promo-tabs" class="filterTabs"><ul><li id="active"><a href="#promo-1">Currently Active</a></li><li id="future"><a href="#promo-2">Future</a></li></ul><div id="promo-1"></div><div id="promo-2"></div></div></div></div>'
+'<div class="popupActionsWrapper"><span class="popupActions"><label class="actionBtn" onclick="$(\'#dialog-com-openPromo\').dialog(\'close\');">OK</label></span></div></div></div>';

var altVendorWarMsgOR = "On selecting a supplier, you will need to re-enter the order quantity and check the delivery date. Select a supplier to continue, or press Cancel.";
var altVendorWarMsgOOR = "Supplier change will update all articles. If an article is not supplied by the new supplier, it will be removed.Proceed, or press Cancel.";
var dialog_allocation ='<div id="dialog-com-allocation" title="Allocations for this Article"><div class="popupContent"><div class="popupData popupTitle"></div><div class="popupActionsWrapper"><span class="popupActions"><label class="actionBtn" onclick="$(\'#dialog-com-allocation\').dialog(\'close\');"><a>OK</a></label></span></div></div></div>';

var dialog_open_orders = '<div id="dialog-com-openOrders" title="Orders for this Article"><div class="popupContent "><div class="popupData contentWrapper "><div id="openOrders"></div></div><div class="popupActionsWrapper"><span class="popupActions"><label onclick="$(\'#dialog-com-openOrders\').dialog(\'close\');" class="actionBtn">OK</label></span></div></div></div>';
var dialog_alternate_vendors = '<div id="dialog-alt-vendors" title="Alternate Suppliers"><div class="popupContent "><div class="popupData contentWrapper "><div id="alterSupp"></div></div><div class="popupActionsWrapper"><div class="instructionalText" id="instructionalText1"><label class = "altVendorWarMsgClass">On selecting a supplier, you will need to re-enter the order quantity and check the delivery date. Select a supplier to continue, or press Cancel.</label></div><span class="popupActions"><label onclick="$(\'#dialog-alt-vendors\').dialog(\'close\');" class="secondaryActionBtn">Cancel</label></span></div></div></div>';

var dialog_alter_price = '<div id="dialog-com-alt-pricing" title="Alternate price for this Article"><div class="popupContent"><div class="ContentTableWrapper"><div class="tableTitle"><h4 class="sectionTitle"><strong>Other Price</strong></h4> </div><table class="ContentTable" cellspacing="0"><tbody class="otherPriceInfoInPop"> </tbody></table></div><div class="popupActionsWrapper"> <span class="popupActions"><label onclick="$(\'#dialog-com-alt-pricing\').dialog(\'close\');" class="actionBtn"><a>OK</a></label></span></div></div></div>';
var nodata = 'Sorry , no results found for the search criteria. Please try again.';
var okButtons = 'ok/cancel';
var yesButtons= 'yes/no';
var infoWrapperHtmlST = '<div  id="submitST-info-wrapper" style ="display: none;" onclick=\'$("#submitST-info-wrapper").fadeOut(50);\'><div class="quickHelpWrapper" id=""><div class="quickHelpContent"><div class="quickHelpTitle"><h4 class="title">Stocktake</h4><a class="close" title="Close" onclick=\'$("#submitST-info-wrapper").fadeOut(50);\'>Close</a><p class="description"></p></div>'
	+'<div class="content"><h4 class="title">Note</h4><ul><li>Since the Stocktake modified,It cannot be viewed/update for sometime.</li><li>Kindly try after 15 - 20 minutes for the data to transmit.</li></ul></div></div></div></div>';
var infoWrapperHtmlSTVarianceTab = '<div  id="submitSTInfo-info-wrapper" style ="display: none;" onclick=\'$("#submitSTInfo-info-wrapper").fadeOut(50);\'><div class="quickHelpWrapper" id=""><div class="quickHelpContent"><div class="quickHelpTitle"><h4 class="title">Stocktake</h4><a class="close" title="Close" onclick=\'$("#submitSTInfo-info-wrapper").fadeOut(50);\'>Close</a><p class="description"></p></div>'
	+'<div class="content"><h4 class="title">Note</h4><ul><li>Please complete a subcategory to generate the variance report.</li></ul></div></div></div></div>';
var scrollLeft = function(event) {
	event.preventDefault();
	var $hold = $('#'+event.data.tbl);
	$hold.animate({
		scrollLeft : '-=150'
	}, 'fast');
};
var scrollRight = function(event) {
	event.preventDefault();
	var $hold = $('#'+event.data.tbl);
	$hold.animate({
		scrollLeft : '+=150'
	}, 'fast');
};
var changeScrollerPosition = function(tabName, leftScroller, rightScroller) {
	timeout = setTimeout(function() {
		var ht = 0;
		var winSize = $(window).height();
		var tabStPos = tabName.offset().top;
		tabStPos = tabStPos - $(window).scrollTop();
		var tabHeight = tabName.height();
		var tmpHt = winSize - tabStPos;
		if(tmpHt>=tabHeight) {
			ht = Math.round(tabHeight/2);
		}
		else {
			ht = Math.round(tmpHt/2);
		}
		leftScroller.css( { marginTop : ht+"px"} );
		rightScroller.css( { marginTop : ht+"px"} );
	}, 500);
};

function isValidDate(input) {
	// var validformat=/^\d{2}\/\d{2}\/\d{4}$/ ;// Basic check for format
	// validity
	var returnval = false;
	if (input == undefined || input == '' || input == null) {
		console.log('empty input');
		return false;
	} else if (input.split('/').length != 3) {
		console.log('empty input');
		return false;
	}/*
		 * else if (!validformat.test(input)) console.log("Invalid Date Format.
		 * Please correct and submit again.");
		 */
	else { // Detailed check for valid date ranges
		var dayfield = input.split("/")[0];
		var monthfield = Number(input.split("/")[1]);
		var yearfield = input.split("/")[2];

		if (dayfield == undefined || dayfield == "" || monthfield == undefined
				|| monthfield == "" || yearfield == undefined
				|| yearfield == "" || dayfield > 31 || monthfield > 12) {
			return false;
		}

		var inputNew = formateDate(input);
		if (inputNew.length != 8)
			return validateDateField(inputNew);
		else
			return false;
		/*
		 * dayfield = input.split("/")[0]; monthfield =
		 * Number(input.split("/")[1]); yearfield = input.split("/")[2]; var
		 * dayobj = new Date(yearfield, monthfield - 1, dayfield);
		 * console.log(dayobj); if (dayobj == 'Invalid Date') { return false; }
		 * else { return true; }
		 */
	}
	return returnval;
}

function validateDateField(s) {
	return !!(/\d\d\/\d\d\/\d{4}/.test(s) && parseDMY(s));
}

// Treats 2 digit years as years 0 - 99, not 1900 to 1999
function parseDMY(s) {
	var b = s.split(/\D/);
	var d = new Date();
	d.setHours(0, 0, 0, 0);
	d.setFullYear(b[2], --b[1], b[0]);
	return d.getMonth() == b[1] ? d : NaN;
}

function getDate(dateTxt) {
	try {
		if (dateTxt.split('/').length == 3) {
			dateTxt = formateDate(dateTxt);
			var dd = parseInt(dateTxt.split("/")[0]);
			var mm = parseInt(dateTxt.split("/")[1]);
			var yy = parseInt(dateTxt.split("/")[2]);
			var date = new Date(yy, mm - 1, dd);
			return date;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
		return null;
	}
}

function getUTCDateForSAPPwd() {    
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth()+1;  // months start at zero
    var day = d.getUTCDate();
    return (day > 9 ? day : '0' + day) + '/' + (month > 9 ? month : '0' + month) + '/' + year;
}
function getCurentDateTxt() {
	try {
		var dateTxt = new Date();
		var dd = n(dateTxt.getDate());
		var mm = n(dateTxt.getMonth() + 1);
		var yy = n(dateTxt.getFullYear());
		var date = '' + dd + '/' + mm + '/' + yy + '';
		return date;
	} catch (err) {
		console.log(err);
		return null;
	}
}

//for Defect_8167

function compareDateRepair(from, to) {
	var dtfrom = getDate(from);
	var dto = getDate(to);
	if (dtfrom <= dto) {
		return 'lt';
	} else if (dtfrom > dto) {
		return 'gt';
	} else {
		return 'eq';
	}

}


function isPastDateRepair(inputField) {
	var pickeddate = inputField;
	var todayDate = getCurentDateTxt();
	if (compareDateRepair(pickeddate, todayDate) == 'lt') {
		return true;
	} else {
		return false;
	}
}


function compareDate(from, to) {
	var dtfrom = getDate(from);
	var dto = getDate(to);
	if (dtfrom < dto) {
		return 'lt';
	} else if (dtfrom > dto) {
		return 'gt';
	} else {
		return 'eq';
	}

}

function isPastDate(inputField) {
	var pickeddate = inputField;
	var todayDate = getCurentDateTxt();
	if (compareDate(pickeddate, todayDate) == 'lt') {
		return true;
	} else {
		return false;
	}
}

function isCurrentDate(inputField) {
	var pickeddate = inputField;
	var todayDate = getCurentDateTxt();
	if (compareDate(pickeddate, todayDate) == 'eq') {
		return true;
	} else {
		return false;
	}
}

function isFutureDate(inputField) {
	var pickeddate = inputField;
	var todayDate = getCurentDateTxt();
	if (compareDate(pickeddate, todayDate) == 'gt') {
		return true;
	} else {
		return false;
	}
}

function diff(starttxt, endtxt) {
	var start = getDate(starttxt);
	var end = getDate(endtxt);
	var diff = new Date(end - start);
	var days = diff / 1000 / 60 / 60 / 24;
	return days;
}

// Date Validation plugin for instoreDisplay Promotion

(function($) {
	$.fn.isPast = function() {
		return isPastDate($(this).val());
	};

	$.fn.isToday = function() {
		return isCurrentDate($(this).val());
	};

	$.fn.isFuture = function() {
		return isFutureDate($(this).val());
	};


	$.fn.highlight = function(msg) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), msg);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
	};
	
	$.fn.compDate = function(endDate,msg) {
		if(compareDate($(this).val(), endDate.val()) == 'gt'){
			$(this).addClass(errorFieldClass);
			addtooltip($(this), msg);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return true;
		}
		return false;
	};
	$.fn.noPastValidation = function() {
		if (isPastDate($(this).val())) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Date should not be past.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};

	$.fn.noTodayValidation = function() {
		if (isCurrentDate($(this).val())) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Date should not be present.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};
	
	$.fn.noCurrentDayValidation = function() {
		if (isCurrentDate($(this).val())) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Date should be past.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};
	
	$.fn.noFutureValidation = function() {
		if (isFutureDate($(this).val())) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Date should be past.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};
	function getDesiredDate(count)
	{
	var desiredDate ='';
	var thatDay = new Date(new Date().getTime() - (86400000* count));
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
	function getDesiredDateBigW(count,daysOut)
	{
	var desiredDate ='';
	var thatDay = new Date(new Date().getTime() - (86400000* count) + (daysOut*24*60*60*1000));
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

	$.fn.startEndValidation = function(endDate, hdrOrItem) {
		var flag = true;

		if ($(this).val().trim() != '' && endDate.val().trim() != '') {

			if (!isValidDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Invalid Start date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Start date should not be past.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (!isValidDate(endDate.val())) {
				endDate.addClass(errorFieldClass);
				addtooltip(endDate, "Invalid End date.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (isPastDate(endDate.val())) {
				endDate.addClass(errorFieldClass);
				addtooltip(endDate, "End date should not be past.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (compareDate($(this).val(), endDate.val()) == 'lt'
					|| compareDate($(this).val(), endDate.val()) == 'eq') {
				if (isBigw == 'true'&& hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > bigwdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * bigwdaylimit + " days (" + Number(bigwdaylimit / 30) + "
						 * months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ bigwdaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
					else if(compareDate($(this).val(), getDesiredDateBigW(0,$('#daysOut').val())) == 'lt'){
						$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
						addtooltip($(this), "Start date cannot be less than "+getDesiredDateBigW(0,$('#daysOut').val())+"");// as per comments from Millie
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;	
					}
				} else if ((isSupers || isLiqure)&& hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > supersdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ "6" + " months from Start Date."); // UAT defect Fix
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				} else if (isMetro && hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > supersdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ "6" + " months from Start Date."); // UAT defect Fix
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				}

			} else {
				// $(this).addClass(errorFieldClass);
				endDate.addClass(errorFieldClass);
				// addtooltip($(this), "Invalid start and end date.");
				addtooltip(endDate,
						"End date should not be lesser than start date.");
				endDate.change(function() {
					// $(this).removeClass(errorFieldClass);
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
					// removetooltip($(this));
				});
				flag = false;
			}

			if (flag) {
				$(this).removeClass(errorFieldClass);
				endDate.removeClass(errorFieldClass);
				removetooltip(endDate);
				removetooltip($(this));
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});

			return flag;
		} else if ($(this).val().trim() != '' && endDate.val().trim() == '') {
			if (!isValidDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else if (endDate.val().trim() != '' && $(this).val().trim() == '') {
			if (!isValidDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (isPastDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else {
			return flag;
		}
	};
	
	$.fn.startEndValidationForOtherPromo = function(endDate,hdrOrItem) {
		var flag = true;

		if ($(this).val().trim() != '' && endDate.val().trim() != '') {

			if (!isValidDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Invalid Start date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Start date should not be past.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (!isValidDate(endDate.val())) {
				endDate.addClass(errorFieldClass);
				addtooltip(endDate, "Invalid End date.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (isPastDate(endDate.val())) {
				endDate.addClass(errorFieldClass);
				addtooltip(endDate, "End date should not be past.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (compareDate($(this).val(), endDate.val()) == 'lt'
					|| compareDate($(this).val(), endDate.val()) == 'eq') {
				if (isBigw == 'true' && hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > bigwdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * bigwdaylimit + " days (" + Number(bigwdaylimit / 30) + "
						 * months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ bigwdaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
					else if(compareDate($(this).val(), getDesiredDateBigW(0,$('#daysOut').val())) == 'lt'){
						$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
						addtooltip($(this), "Start date cannot be less than current date plus "+$('#daysOut').val()+"");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;	
					}
				} else if ((isSupers || isLiqure) && hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > supersotherpromodaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ supersotherpromodaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				} else if (isMetro && hdrOrItem!=0) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > supersotherpromodaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ supersotherpromodaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				}
				else
				{
					//R18.01 INC01811283, Defect_12204 - Fix
					if ((Math.trunc(Number(diff($(this).val(), endDate.val()))) > supersotherpromodaylimit-1) && hdrOrItem!=0) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ supersotherpromodaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				
				}

			} else {
				// $(this).addClass(errorFieldClass);
				endDate.addClass(errorFieldClass);
				// addtooltip($(this), "Invalid start and end date.");
				addtooltip(endDate,
						"End date should not be lesser than start date.");
				endDate.change(function() {
					// $(this).removeClass(errorFieldClass);
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
					// removetooltip($(this));
				});
				flag = false;
			}

			if (flag) {
				$(this).removeClass(errorFieldClass);
				endDate.removeClass(errorFieldClass);
				removetooltip(endDate);
				removetooltip($(this));
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});

			return flag;
		} else if ($(this).val().trim() != '' && endDate.val().trim() == '') {
			if (!isValidDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else if (endDate.val().trim() != '' && $(this).val().trim() == '') {
			if (!isValidDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			} else if (isPastDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else {
			return flag;
		}
	};

	$.fn.dlvryDateValidation = function(endDate) {
		var flag = true;

		if ($(this).val().trim() != '' && endDate.val().trim() != '') {

			if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Delivery date should not be past.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			}

			if (isPastDate(endDate.val())) {
				endDate.addClass(errorFieldClass);
				addtooltip($(this), "Start date should not be past.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			}

			if (compareDate($(this).val(), endDate.val()) == 'lt') {
			} else {
				$(this).addClass(errorFieldClass);
				endDate.addClass(errorFieldClass);
				addtooltip($(this),
						"Delivery Date should be less than start date.");
				addtooltip(endDate,
						"Delivery Date should be less than start date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
					removetooltip($(this));
				});
				flag = false;
			}

			if (flag) {
				$(this).removeClass(errorFieldClass);
				endDate.removeClass(errorFieldClass);
				removetooltip(endDate);
				removetooltip($(this));
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else if ($(this).val().trim() != '' && endDate.val().trim() == '') {
			if (!isValidDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			}
			if (isPastDate($(this).val())) {
				$(this).removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else if (endDate.val().trim() != '' && $(this).val().trim() == '') {
			if (!isValidDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Not a valid date");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			}
			if (isPastDate(endDate.val())) {
				endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
				addtooltip($(this), "Should not be a past date.");
				endDate.change(function() {
					endDate.removeClass(errorFieldClass);
					removetooltip(endDate);
				});
				flag = false;
			}
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else {
			return flag;
		}
	};

	$.fn.newPriceValidation = function(standardPrice, promoPrice, range) {
		var flag = true;
		if ($(this).val().trim() != '' && standardPrice.text().trim() != ''
				&& promoPrice.text().trim() != '' && promoPrice.text().trim() != '0') {
			if ($(this).closest('td').find('.per').is(':checked')
					&& $(this).val().indexOf('.') >= 0) {
				$(this).addClass(errorFieldClass);
				addtooltip($(this), "Invalid New Price.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if ($(this).closest('td').find('.per').is(':checked')) {
				if (parseInt($(this).val()) > range) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New price must not exceed "
							+ range + "% off");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseInt($(this).val()) <= range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = stdPriceInt
								- (stdPriceInt * (newPricePercent / 100));
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");
							} catch (err) {
								console.log(err);
							}
							flag = false;
						} else if (newPrice >= promoPriceInt) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be less than Promo price.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				} else if (isNaN(parseInt($(this).val()))) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "Invalid New Price.");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				}
			} else if ($(this).closest('td').find('.dol').is(':checked')) {
				if ($(this).val().indexOf('.') >= 0) {
					if (parseFloat($(this).val()) <= 0.04) {
						$(this).addClass(errorFieldClass);
						addtooltip($(this), "Invalid New Price.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;
					} else if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = newPricePercent;
						// console.log(stdPriceInt+" - "+newPrice);
						// console.log(((stdPriceInt -
						// newPrice)/stdPriceInt)*100);
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");

							} catch (err) {
								console.log(err);
							}
							flag = false;
						} else if (newPrice >= promoPriceInt) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be less than Promo price.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((Math.round(((stdPriceInt - newPrice) / stdPriceInt) * 100)
								 > Number(range))) {

							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New price must not exceed " + range
											+ "% off");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((((stdPriceInt - newPrice) / stdPriceInt) * 100 == 0)) {

							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price Percentange cannot be 0%");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((Math.round(((stdPriceInt - newPrice) / stdPriceInt) * 100) <=  Number(range))) {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				} else if (standardPrice.text().trim() != '') {
					var stdPriceInt = parseFloat(standardPrice.text());
					var promoPriceInt = parseFloat(promoPrice.text());
					var newPricePercent = parseFloat($(this).val());
					var newPrice = newPricePercent;
					if (newPrice > stdPriceInt) {
						$(this).val('');
						$(this).parent().prev().text($(this).val());
						try {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							$(this).focus();
							showInformation("New Price cannot exceed the Standard Price");
						} catch (err) {
							console.log(err);
						}
						flag = false;
					} else if (newPrice > promoPriceInt) {
						$(this).addClass(errorFieldClass);
						addtooltip($(this),
								"New Price should be less than Promo price.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;

					} else if (newPrice == 0) {
						$(this).addClass(errorFieldClass);
						addtooltip($(this),
								"New Price should be greater than 0.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;

					} else {
						$(this).val(Number(newPrice).toFixed(2));
						$(this).parent().prev().text($(this).val());
					}
				}

			} else {
				var stdPriceInt = parseFloat(standardPrice.text());
				if (((parseFloat($(this).val()) * 100) / stdPriceInt) >  Number(range)) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New price must not exceed "
							+ range + "% off");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseFloat($(this).val()) < range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = newPricePercent;
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");
							} catch (err) {
								console.log(err);
							}
							flag = false;
						} else if (newPrice >= promoPriceInt) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be less than Promo price.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						}
						if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				}
			}

			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		} else {
			if((promoPrice.text().trim() == "" || promoPrice.text().trim() == "0") &&(standardPrice.text().trim() != "" && standardPrice.text().trim() != "0"))
				{
			if ($(this).closest('td').find('.per').is(':checked')
					&& $(this).val().indexOf('.') >= 0) {
				$(this).addClass(errorFieldClass);
				addtooltip($(this), "Invalid New Price.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if ($(this).closest('td').find('.per').is(':checked')) {
				if (parseInt($(this).val()) > range) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New price must not exceed "
							+ range + "% off");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseInt($(this).val()) <= range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = stdPriceInt
								- (stdPriceInt * newPricePercent / 100);
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");
							} catch (err) {
								console.log(err);
							}
							flag = false;
						} else if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				} else if (isNaN(parseInt($(this).val()))) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "Invalid New Price.");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				}
			} else if ($(this).closest('td').find('.dol').is(':checked')) {
				if ($(this).val().indexOf('.') >= 0) {
					if (parseFloat($(this).val()) <= 0.04) {
						$(this).addClass(errorFieldClass);
						addtooltip($(this), "Invalid New Price.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;
					} else if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = newPricePercent;
						// console.log(stdPriceInt+" - "+newPrice);
						// console.log(((stdPriceInt -
						// newPrice)/stdPriceInt)*100);
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");

							} catch (err) {
								console.log(err);
							}
							flag = false;
						} else if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((Math.round(((stdPriceInt - newPrice) / stdPriceInt) * 100)
								 > Number(range))) {

							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New price must not exceed " + range
											+ "% off");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((((stdPriceInt - newPrice) / stdPriceInt) * 100 == 0)) {

							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price Percentange cannot be 0%");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else if ((Math.round(((stdPriceInt - newPrice) / stdPriceInt) * 100) <= Number(range))) {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				} else if (standardPrice.text().trim() != '') {
					var stdPriceInt = parseFloat(standardPrice.text());
					var promoPriceInt = parseFloat(promoPrice.text());
					var newPricePercent = parseFloat($(this).val());
					var newPrice = newPricePercent;
					if (newPrice > stdPriceInt) {
						$(this).val('');
						$(this).parent().prev().text($(this).val());
						try {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							$(this).focus();
							showInformation("New Price cannot exceed the Standard Price");
						} catch (err) {
							console.log(err);
						}
						flag = false;
					} else if (newPrice == 0) {
						$(this).addClass(errorFieldClass);
						addtooltip($(this),
								"New Price should be greater than 0.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						flag = false;

					} else {
						$(this).val(Number(newPrice).toFixed(2));
						$(this).parent().prev().text($(this).val());
					}
				}

			} else {
				var stdPriceInt = parseFloat(standardPrice.text());
				if (((parseFloat($(this).val()) * 100) / stdPriceInt) > Number(range)) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New price must not exceed "
							+ range + "% off");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseFloat($(this).val()) < range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseFloat(standardPrice.text());
						var promoPriceInt = parseFloat(promoPrice.text());
						var newPricePercent = parseFloat($(this).val());
						var newPrice = newPricePercent;
						if (newPrice > stdPriceInt) {
							$(this).val('');
							$(this).parent().prev().text($(this).val());
							try {
								$(this).val('');
								$(this).parent().prev().text($(this).val());
								$(this).focus();
								showInformation("New Price cannot exceed the Standard Price");
							} catch (err) {
								console.log(err);
							}
							flag = false;
						}
						if (newPrice == 0) {
							$(this).addClass(errorFieldClass);
							addtooltip($(this),
									"New Price should be greater than 0.");
							$(this).change(function() {
								$(this).removeClass(errorFieldClass);
								removetooltip($(this));
							});
							flag = false;

						} else {
							$(this).val(Number(newPrice).toFixed(2));
							$(this).parent().prev().text($(this).val());
						}
					}
				}
			}

			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return flag;
		}
			else if(standardPrice.text().trim() == "" || standardPrice.text().trim() == "0")
				{
				try {
					$(this).val('');
					$(this).parent().prev().text($(this).val());
					$(this).focus();
					showInformation("Promotion cannot be created as there is no valid Standard price.");
				} catch (err) {
					console.log(err);
				}
				flag = false;
				}
			return flag;
		}

	};

	$.fn.sameDateValidation = function(startDate) {
		if ($(this).val().trim() != '' && startDate.val().trim() != '') {
			var dateDifference = diff(startDate.val(), $(this).val());
			if (dateDifference != 0) {
				$(this).addClass(errorFieldClass);
				addtooltip($(this), "End date should be same as Start date.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				$(".tooltip").tooltip({
					position : {
						my : "left center",
						at : "right+10 center"
					}
				});
				return false;
			}
			else if(dateDifference ==  0)
				{
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
				$(startDate).removeClass(errorFieldClass);
				removetooltip($(startDate));
				return true;
				}
		}
		return true;
	};

	$.fn.freshFoodDateValidation = function (endDate)
	{
		var flag = true;
		if(freshFoodDayLimit != null && freshFoodDayLimit != '')
			{
		//R18.01 INC01811283, Defect_12204 - Fix
		if (Math.trunc(Number(diff($(this).val(), endDate.val()))) > freshFoodDayLimit-1) {
						endDate.addClass(errorFieldClass);
						//R18.01 INC01811283, Defect_12204 - Fix
						if(freshFoodDayLimit == 1){
							addtooltip(endDate, "Promotion duration cannot be greater than "+freshFoodDayLimit+" day.");
						}else{
							addtooltip(endDate, "Promotion duration cannot be greater than "+freshFoodDayLimit+" days.");
						}
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						$(".tooltip").tooltip({
					position : {
						my : "left center",
						at : "right+10 center"
					}
				});
				flag = false;
				}
			}
		return flag;
		
	};
	
	$.fn.pastPromotionDateRangeValidation = function (endDate)
	{
		var flag = true;
		if(pastRangeDaysLimit != null && pastRangeDaysLimit != '')
			{
		if (Math.trunc(Number(diff($(this).val(), endDate))) > pastRangeDaysLimit) {
			$(this).addClass(errorFieldClass);
						addtooltip($(this), "Past Promotion Search Cannot be Greater than "+pastRangeDaysLimit+" Days.");
						$(this).change(function() {
							$(this).removeClass(errorFieldClass);
							removetooltip($(this));
						});
						$(".tooltip").tooltip({
					position : {
						my : "left center",
						at : "right+10 center"
					}
				});
						flag = false;
					}
			}
		return flag;
		
	};
	
	$.fn.onlyAlphaNumericCharacters = function() {
		this.each(function() {
			var alphaNum = /^[a-z\d\-_\s\.]+$/i;
			$(this).keypress(
					function(e) {
						
						var key = e.charCode || e.keyCode || 0;
			            // allow backspace, tab, delete, arrows, letters, numbers and keypad numbers ONLY
			            return (alphaNum.test(String.fromCharCode(key)));
						
					});
		});
	};
	
	$.fn.oneMonthDateValidation = function(startDate,hdrOrItem) {
		if ($(this).val().trim() != '' && startDate.val().trim() != '') {
			var dateDifference = diff(startDate.val(), $(this).val());
			if (dateDifference > 31 && hdrOrItem!=0) {
				$(this).addClass(errorFieldClass);
				addtooltip($(this), "End date is more than 31 days.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				$(".tooltip").tooltip({
					position : {
						my : "left center",
						at : "right+10 center"
					}
				});
				return false;
			}
		}
		return true;
	};

	$.fn.required = function(msg) {
		if (msg == undefined || msg == '') {
			msg = "Mandatory field.";
		}
		if ($(this).val().trim() == '') {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), msg);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};

	$.fn.isValidDate = function() {

		if ($(this).val().trim() == '') {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Please enter valid date.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}

		if (!isValidDate($(this).val())) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Please enter valid date.");
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}
		return true;
	};
	$.fn.numbersonly = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							e.preventDefault();
						}
						// if (parseInt($(this).val()) > 999) {
						// e.preventDefault();
						// }
					});
		});

	};
	
	$.fn.within9999 = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							e.preventDefault();
						}
						 if (parseInt($(this).val()) > 999) {
						 e.preventDefault();
						 }
					});
		});

	};

	$.fn.onlyNumbersIncNegative = function() {
		this.each(function() {
			$(this).keypress(//also allow only 4 digit number/if decimal only 3 decimal digits after "."
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything.
						if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which == 45 && $(this).val().length > 0 || e.which != 45 )
								 && (e.which == 46 && $(this).val().indexOf(".") > -1 || e.which != 46 ) 
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							return false;
						}
						
						if ($(this).val().indexOf(".") > -1) {//if decimal number
							var dotPos = $(this).val().indexOf(".");
							var valueAfterDec = $(this).val().substring(dotPos+1,$(this).val().length);
							var valueBeforeDec = $(this).val().substring(0,dotPos);
							if($(this).val().indexOf("-") > -1){//if -ve no.
								valueBeforeDec = $(this).val().substring(1,dotPos);
							}
							if(valueAfterDec.length == 3){
								return false;
							}							
						}else{//if not decimal number
							if ($(this).val().indexOf("-") > -1){
								if($(this).val().length == 5  && e.which != 46) {
									return false;
								}
							}else{								
								if($(this).val().length == 4 && e.which != 46){
									return false;
								}								
							}
						}
					});
		});

	};
	
	$.fn.onlyNumbers = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0 && e.which != 13
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							return false;
						}
					});
		});

	};

	$.fn.within999 = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0 && e.which != 13 /* allowing enter for defect 2505*/
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							return false;
						}
						if (parseInt($(this).val()) > 99) {
							return false;
						}
					});
		});

	};

	$.fn.within99 = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							return false;
						}
						if (parseInt($(this).val()) > 9) {
							return false;
						}
					});
		});

	};

	$.fn.isNumberOrDecimal = function() {
		this.each(function() {
			$(this).keypress(
					function(e) {
						// if the letter is not digit then display error
						// and don't type anything
						if ($(this).closest('td').find('.dol').is(':checked')) {
							if (e.which != 8
									&& e.which != 0
									&& (e.which < 48 || e.which > 57)
									&& (e.which != 46 || $(this).val().indexOf(
											'.') != -1) && e.which != 37) {
								// display error message
								// console.log('dol selected');
								return false;
							}
							if($(this).val().indexOf('.') == -1 && e.which == 46)
								{
								return true;
								}
/*							if (hasDecimalPlace($(this).val(), 2)) {
								return false;
							}*/
							if (parseInt($(this).val()) > 999) {
								return false;
							}
							 var number = this.value.split('.');
							var caratPos = getSelectionStart(this);
						    var dotPos = $(this).val().indexOf(".");
						    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
						        return false;
						    }
							
							
						} else if ($(this).closest('td').find('.per').is(
								':checked')) {

							// if the letter is not digit then display error and
							// don't type anything
							if (e.which != 8 && e.which != 0
									&& (e.which < 48 || e.which > 57)) {
								// console.log('per selected');
								// display error message
								return false;
							}
							if (parseInt($(this).val()) > 9) {
								return false;
							}

						} else {

							if (e.which != 8
									&& e.which != 0
									&& (e.which < 48 || e.which > 57)
									&& (e.which != 46 || $(this).val().indexOf(
											'.') != -1) && e.which != 37) {
								// display error message
								// console.log('dol selected');
								return false;
							}

						}
					});
		});

	};

	$.fn.isValidPercentOrDecimal = function(dPos) {
		this.each(function(e) {
			$(this).bind('keypress',{dPos:dPos},
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1)
										&& e.which != 37) {
									// display error message
									return false;
								}
								// should not allow percentage as well as dot
								// for same no and allow only two digits after
								// decimal
								var dPos = 2;
								if(e.data.dPos != undefined)
									dPos =e.data.dPos;
									
								if (hasDecimalPlace($(this).val(), dPos)) {
									return false;
								}

							});
		});

	};
	
	$.fn.isValidWeight = function(dPos) {
		this.each(function(e) {
			$(this).bind('keypress',{dPos:dPos},
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& e.which != 37
										&& e.which != 46) {
									// display error message
									return false;
								}
								var dPos = 2;
								if(e.data.dPos != undefined){
									dPos =e.data.dPos;
								}
								if(e.which == 46){
									if($(this).val().indexOf('.') != -1){
										if(parseInt($(this).val()) == 0){
											$(this).val((Number(($(this).val()%1).toFixed(3))*1000).toFixed(3));
											$(this).attr('dotted','Y');
											$(this).attr('decimal','1');
										}
										return false;
									}else{
										$(this).attr('dotted','Y');
										$(this).attr('decimal','1');
									}
								}else if (hasDecimalPlace($(this).val(), dPos)) {
									// should not allow percentage as well as dot for same no and allow only two digits after decimal
									if($(this).attr('dotted')=='Y' && Number($(this).attr('decimal'))!=1000){
										var deciVal = Number($(this).attr('decimal'))*10;
										$(this).val((parseInt($(this).val())+Number(Number($(this).val()%1).toFixed(3))+(Number(String.fromCharCode(e.keyCode))/deciVal)).toFixed(3));
										$(this).attr('decimal',(deciVal));
									}else if($(this).attr('dotted')!='Y'){
										var tempVal = String.fromCharCode(e.keyCode);
										if(tempVal!=0){
											$(this).val(Number((((($(this).val()*1000)+(Number(String.fromCharCode(e.keyCode)/10)))*10)/1000).toFixed(3)));
										}else{
											$(this).val(Number($(this).val()*10).toFixed(3));
										}
									}
									return false;
								}else if($(this).attr('dotted')=='Y'){
									var deciVal = Number($(this).attr('decimal'))*10;
									$(this).attr('decimal',(deciVal));
								}
							});
		});

	};

	$.fn.isValidWeightKeyDwn = function(dPos) {
		this.each(function(e) {
			$(this).bind('keydown',{dPos:dPos},
							function(e) {
								//console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which == 46) {
									// display error message
									$(this).val(((parseInt(($(this).val()*1000)/10))/1000).toFixed(3));
									if(parseInt($(this).val())==0){$(this).attr('dotted','N');$(this).attr('decimal','1');}
									return false;
								}else if(e.which == 8){
                                    $(this).val(((parseInt(($(this).val()*1000)/10))/1000).toFixed(3));
                                    if(parseInt($(this).val())==0){$(this).attr('dotted','N');$(this).attr('decimal','1');}
									return false;
                               }else{
                                  return true;
                              }						
							});
		});

	};

	$.fn.isWithin9999 = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										) {
									// display error message
									return false;
								}

								if (parseInt($(this).val()) > 999) {
									return false;
								}

							});
		});

	};

	$.fn.isWithin9999OrDecimal = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1)) {
									// display error message
									return false;
								}

								// should not allow percentage as well as dot
								// for same no and allow only two digits after
								// decimal
								if (hasDecimalPlace($(this).val(), 2)) {
									return false;
								}

								if (parseInt($(this).val()) > 999) {
									return false;
								}

							});
		});

	};
	$.fn.isWith2Decimal = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1) && e.which != 37) {									
									return false;
								}
								if($(this).val().indexOf('.') == -1 && e.which == 46)
								{
								return true;
								}								
								if($(this).val().indexOf('.') == -1)
									{
									if (parseInt($(this).val()) > 99 || parseInt($(this).val()) > 999) {
										return false;
									}
								}else if($(this).val().indexOf('.') == 0 && $(this).val().length == 1){
									$(this).val('');	
									return false;
								}						
							var number = this.value.split('.');
							var caratPos = getSelectionStart(this);
						    var dotPos = $(this).val().indexOf(".");
						    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
						        return false;
						    }						   
							});
		});

	};	
	$.fn.isWithin999Or3Decimal = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1) && e.which != 37) {
									// display error message
									return false;
								}

								if($(this).val().indexOf('.') == -1 && e.which == 46)
								{
								return true;
								}
/*							if (hasDecimalPlace($(this).val(), 2)) {
								return false;
							}*/
								
								if($(this).val().indexOf('.') == -1)
									{
									if (parseInt($(this).val()) > 99) {
										return false;
									}
									}
								else
									{
									if (parseInt($(this).val()) > 999) {
										return false;
									}
								}
								
							var number = this.value.split('.');
							var caratPos = getSelectionStart(this);
						    var dotPos = $(this).val().indexOf(".");
						    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 2)){
						        return false;
						    }
						   
							});
		});

	};
	$.fn.isWithinOnly3Decimal = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1) && e.which != 37) {
									// display error message
									return false;
								}

								if($(this).val().indexOf('.') == -1 && e.which == 46)
								{
								return true;
								}
/*							if (hasDecimalPlace($(this).val(), 2)) {
								return false;
							}*/
								
								
								
							var number = this.value.split('.');
							var caratPos = getSelectionStart(this);
						    var dotPos = $(this).val().indexOf(".");
						    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 2)){
						        return false;
						    }
						   
							});
		});

	};
	$.fn.isWithin99Or3Decimal = function(dPos) {
		this.each(function() {
			$(this)
					.bind('keypress',{dPos:dPos},
							function(e) {
								// console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1) && e.which != 37) {
									// display error message
									return false;
								}

								if($(this).val().indexOf('.') == -1 && e.which == 46)
								{
								return true;
								}
/*							if (hasDecimalPlace($(this).val(), 2)) {
								return false;
							}*/
								
								if($(this).val().indexOf('.') == -1)
									{
									if (parseInt($(this).val()) > 9) {
										return false;
									}
									}
								else
									{
									if (parseInt($(this).val()) > 99) {
										return false;
									}
								}
								
							var number = this.value.split('.');
							var caratPos = getSelectionStart(this);
						    var dotPos = $(this).val().indexOf(".");
						    var dPos = 2;
							if(e.data!=null && e.data!=undefined && e.data['dPos'] != undefined){
								dPos =e.data.dPos;
							}
							if( caratPos > dotPos && dotPos>-1 && (number[1].length > dPos)){
						        return false;
						    }
						   
							});
		});

	};

	$.fn.error = function(msg) {
		this.each(function() {
			$(this).addClass('tooltip').attr('title', msg);
			$(this).addClass(errorFieldClass);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
		});
	};

	$.fn.addmsg = function(msg) {
		this.each(function() {
			$(this).addClass('tooltip').attr('title', msg);
			$(this).tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
		});
	};

	$.fn.removemsg = function() {
		this.each(function() {
			$(this).removeClass('tooltip').removeAttr('title');
		});
	};

	$.fn.showCustomMsg = function(codeList,error_success,title,subTitle,focusElem) {
		title = ((title||'') == '') ? pageTitle : title;
		var $errElem = $('#error-warn-wrapper');
		var $successElem = $('#success-wrapper');
		var $informationElem=$('#information-wrapper');
		var $stockAdjQtyErrorElem=$('#error-warn-SAQTY-wrapper');
		var $wrapElem ='';
		if(($errElem ==undefined || $errElem.length == 0) && error_success == error){
			$('body').append(errWrapperHtml);
		}else if(($successElem ==undefined || $successElem.length == 0) && error_success == success ){
			$('body').append(successWrapperHtml);
		}else if(($informationElem ==undefined || $informationElem.length == 0) && error_success == information ){
			$('body').append(informationWrapperHtml);
		}else if(($stockAdjQtyErrorElem ==undefined || $stockAdjQtyErrorElem.length == 0) && error_success == 'error-SAQTY' ){
			$('body').append(errWrapperHtmlStockAdjQty);
		}
		$wrapElem = error_success == error ? $('#error-warn-wrapper') : (  error_success == information ? $('#information-wrapper')  : $('#success-wrapper'));
		$wrapElem = error_success == 'error-SAQTY' ? $('#error-warn-SAQTY-wrapper') : $wrapElem;
		$wrapElem.find('#error_title').html(title);
		$wrapElem.find('.err_sub_title').addClass('visible-hide');
		if(subTitle != undefined)
			{
			$wrapElem.find('.err_sub_title').addClass('visible-hide').removeClass('visible-hide');
			$wrapElem.find('.err_sub_title').addClass('hideBlock').removeClass('hideBlock');
			$wrapElem.find('.err_sub_title').html(subTitle);
			}
		$wrapElem.find('.err_msg').html('').html(buildCustomMsg(codeList));
		$wrapElem.fadeIn(50);
		if(focusElem!=undefined){
			$wrapElem.bind('click',function(){focusElem.focus();});
		}
	};
	$.fn.showInformationMsg = function(from) {
		if(from==undefined)
		{
		var $errElem = $('#info-wrapper');
		
		if(($errElem ==undefined || $errElem.length == 0)){
			$('body').append(helpWrapperHtml);
			$errElem = $('#info-wrapper');
		}
		$errElem.fadeIn(50);
	}
		
		if(from!=undefined)
			{
			var $errElem = $('#submit-info-wrapper');
			if(($errElem ==undefined || $errElem.length == 0)){
				$('body').append(infoWrapperHtml);
				$errElem = $('#submit-info-wrapper');
			}
			$errElem.fadeIn(50);
			}
		
	};
	$.fn.showInformationSTMsg = function(from) {
		if(from!=undefined)
			{
			var $errElem = $('#submitST-info-wrapper');
			if(($errElem ==undefined || $errElem.length == 0)){
				$('body').append(infoWrapperHtmlST);
				$errElem = $('#submitST-info-wrapper');
			}
			$errElem.fadeIn(50);
			}
		
	};
	$.fn.showInformationSTVarianceTabMsg = function(from) {
		if(from!=undefined)
			{
			var $errElem = $('#submitSTInfo-info-wrapper');
			if(($errElem ==undefined || $errElem.length == 0)){
				$('body').append(infoWrapperHtmlSTVarianceTab);
				$errElem = $('#submitSTInfo-info-wrapper');
			}
			$errElem.fadeIn(50);
			}
		
	};
	
	$.fn.getJSON = function() {
		var isopenobj = false;
		isopenarray = false;
		var result = '';
		if (this.length > 1) {
			result = '[';
			isopenarray = true;
		}
		var arraySize = this.length;
		var index = 0;

		this
				.each(function() {
					index++;
					if ($(this).attr("data-map") == 'obj') {
						result += '{';
						isopenobj = true;

						var size = $(this).find('[data-item]').length;
						var i = 0;
						$(this)
								.find('[data-item]')
								.each(
										function() {
											i++;
											var val = '';
											if ($(this).attr('type') == "checkbox") {
												val = $(this).is(':checked') ? 1
														: 0;
											} else if ($(this).find(
													'input[type="checkbox"]').length == 1) {
												val = ($(this)
														.find(
																'input[type="checkbox"]')
														.is(':checked') ? 1 : 0);
											} else if ($(this).is('input')) {
												val = $(this).val();
											} else if ($(this).find('input').length == 1) {
												val = $(this).find('input')
														.val();
											} else if ($(this).is('select')) {
												val = $(this).val();
											} else if ($(this).find('select').length == 1) {
												val = $(this).find('select')
														.val();
											} else {
												val = $(this).text();
											}
											result += '"'
													+ $(this).attr('data-item')
													+ '":"' + val + '"';
											if (i != size)
												result += ',';
										});
						if (isopenobj) {
							isopenobj = false;
							result += '}';
						}
						if (index != arraySize)
							result += ',';
					}
				});
		if (isopenarray) {
			isopenarray = false;
			result += ']';
		}
		console.log("result from getJSON(): " + result);

		return $.parseJSON(result);

	};

	$.fn.preqQtyValid = function(clickedSave, flag, from, msg) {
		if (msg == undefined || msg == '') {
			msg = "Mandatory field.";
		}
		if ($(this).val().trim() == '' && flag) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), msg);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		} /*else if ($(this).val().trim() > limitOrderQty) {
			orderQtyConfirmation($(this), clickedSave, from);
			return false;
		}*/else if ($(this).val().trim() == '0' && flag) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), 'Order Qty Should be greater than 0.');
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}

		return true;
	};
	
	$.fn.costPriceValid = function(clickedSave, flag, from, msg) {
		if (msg == undefined || msg == '') {
			msg = "Mandatory field.";
		}
		if ($(this).val().trim() == '' && flag) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), msg);
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		} else if ($(this).val().trim() == '0' && flag) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), 'Cost Price Should be greater than 0.');
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		} /*else if ( ( $(this).val().trim() > $(this).next('input[type="hidden"]').val() ) && flag) {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), 'Cost Price Should be lesser than '+$(this).next('input[type="hidden"]').val());
			$(this).change(function() {
				$(this).removeClass(errorFieldClass);
				removetooltip($(this));
			});
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});
			return false;
		}*/

		return true;
	};
	
	$.fn.isValidDecimal = function() {
		this.each(function() {
			$(this)
					.keypress(
							function(e) {
								console.log(e.which);
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8
										&& e.which != 0
										&& (e.which < 48 || e.which > 57)
										&& (e.which != 46 || $(this).val()
												.indexOf('.') != -1)) {
									// display error message
									return false;
								}

								// should not allow percentage as well as dot
								// for same no and allow only two digits after
								// decimal
								/*if (hasDecimalPlace($(this).val(), 2)) {
									return false;
								}*/

							});
		});

	};
	
	$.extend({
		tablebuild : new function(){
			var tbl = this;
			var removeNull = function(data){
				if(data==undefined || data=== null || data=='null'){
					return '';
				}else {
					return data;
				}
			};
			var padzero = function (num, size) {
			    var s = num+"";
			    while (s.length < size) s = "0" + s;
			    return s;
			};
			var formatTime = function (time) {
			    time = time.substr(0,2)+':'+time.substr(2,2)+':'+time.substr(4,2);
			    return time;
			};
			var trimLeadZero = function(data){
				//if(data!=undefined && data!=null){
					return (removeNull(data)).replace(/^0+/, '');
				//}
			};
			var mobi_date = function(data){
				var fdate = '';
				data= removeNull(data);
				//if(data!=undefined && data!=null){
					if(data.indexOf('-')>-1){
						fdate = data.split('-');
						fdate=  fdate[2]+'/'+fdate[1]+'/'+fdate[0];
					}else if(data.indexOf('/')>-1){
						fdate = data.split('/');
						fdate=  fdate[1]+'/'+fdate[0]+'/'+fdate[2];
					}
				//}
				return fdate;
			};
			var mobi_data_time = function(confObj,key,obj){
				var data ='';
				var bkey= '';
				var skey= '';
				//if(isCompKey(key)){
					bkey= key.split(':')[0];
					skey = key.split(':')[1];
					bkeyVal = tbl.formatKey(confObj,bkey,obj[bkey]);
					skeyVal =tbl.formatKey(confObj,skey,obj[skey]);
					if(skeyVal.length>0){
						skeyVal = padzero(skeyVal,6);
						skeyVal = formatTime(skeyVal);
					}
					if(bkeyVal!='' && skeyVal!=''){
						data= bkeyVal +' '+skeyVal+'';
						}else{
							data = bkeyVal!='' ? bkeyVal : skeyVal;
						}
				//}
				return data;
			};
			var isCompKey = function(data){
				return data!=undefined && data.indexOf(':')>-1;
			};
			var baseKey = function(data){
				return (data!=undefined && data.indexOf(':')>-1 ? data.split(':')[0]:data );
			};
			var twoKeySplit = function(confObj,key,obj){
				var data ='';
				var bkey= '';
				var skey= '';
				//if(isCompKey(key)){
					bkey= key.split(':')[0];
					skey = key.split(':')[1];
					bkeyVal = tbl.formatKey(confObj,bkey,obj[bkey]);
					skeyVal =tbl.formatKey(confObj,skey,obj[skey]);
					if(bkeyVal!='' && skeyVal!=''){
						data= bkeyVal +' ('+skeyVal+')';
						}else{
							data = bkeyVal!='' ? bkeyVal : skeyVal;
						}
				//}
				return data;
			};
			var dotdate=function(data){
				return removeNull(data).replace(/\./g,'/');
			};
			var toFix2 = function(data){
				return Number(data||'').toFixed(2);
			};
			tbl.key_parse = {twoKeySplit:twoKeySplit,mobi_data_time:mobi_data_time};
			tbl.default_page = 1;
			tbl.table_header = '<div class="tableInfo"><div class="tableTitle"><h5 class="sectionTitle"><strong class="table_title"></strong></h5></div></div>';
			tbl.table = '<table cellspacing="0" class=""></table>';
			tbl.table_footer = '<div class="tableFooter"></div>';
			tbl.scroll_table = '<div class="scrollTableContainer"><div class="scrollWindow"></div></div>';
			tbl.scroll_btn = '<div class="tableScroller"><ul><li class="scrollLeft"><a href="#">&nbsp;</a></li><li class="scrollRight"><a href="#">&nbsp;</a></li></ul></div>';
			tbl.pagination = '<div class="paginationWrapper"><div class="pagination-holder clearfix"><div class="compact-theme simple-pagination" id="compact-pagination"></div></div></div>';
			tbl.dataparse = {trim:trimLeadZero,removeNull:removeNull,mobi_date:mobi_date,dotdate: dotdate,toFix2:toFix2};
			tbl.buildHead = function(confObj){
				$tblHead = $(tbl.table_header);
				$tblHead.attr('id',confObj.table_name+head);
				$page = tbl.buildPage(confObj,tbl.default_page);
				(confObj.table_title !=undefined) ? $tblHead.find('.table_title').html(confObj.table_title) : $tblHead.find('.tableTitle').addClass('hideBlock');
				(confObj.pagination) ? $tblHead.append(($page!=undefined && $page!='') ? ($page.attr('id',confObj.table_name+headpage).attr('table_title',confObj.table_name)): '') : $tblHead;
				return $tblHead;
			};
			tbl.buildScrollHead = function($anch,confObj){
				$anch = $anch.append($(tbl.scroll_btn));
				$anch.find('.tableScroller').attr('id','scroll_btn_cont_'+confObj.table_name);
				$anch.find('.scrollLeft').attr('id','scroll_left_'+confObj.table_name).bind('click',{tbl: 'scroll_container_'+confObj.table_name},scrollLeft);
				$anch.find('.scrollRight').attr('id','scroll_right_'+confObj.table_name).bind('click',{tbl: 'scroll_container_'+confObj.table_name},scrollRight);
				$anch.find('.scrollRight').attr('id','scroll_right_'+confObj.table_name);
				$anch = $anch.append($(tbl.scroll_table));
				$anch.find('.scrollTableContainer').attr('id','scroll_container_'+confObj.table_name);
				$anch.find('.scrollWindow').attr('id','scroll_window_'+confObj.table_name);
				return $anch;
			};
			tbl.buildFoot = function(confObj){
				$tblFoot = $(tbl.table_footer);
				$tblFoot.attr('id',confObj.table_name+foot);
				//$tblFoot = (confObj.table_title !=undefined) ? $tblHead.find('.table_title').html(confObj.table_title):$tblHead.find('.tableTitle').addClass('hideBlock');
				(confObj.legend!=undefined) ? $tblFoot.append($(confObj.legend)):'';//To add legends
				$page = tbl.buildPage(confObj,tbl.default_page);
				$tblFoot = (confObj.pagination) ? $tblFoot.append(($page!=undefined && $page!='')? $page.attr('id',confObj.table_name+footpage).attr('table_title',confObj.table_name).addClass('bottomPagination') :'') : $tblFoot;
				return $tblFoot;
				
			};
			tbl.buildTbl = function(confObj,$tblHold){
				var $anch = $('<div></div>');
				$tblHead = tbl.buildHead(confObj);
				$tblFoot = tbl.buildFoot(confObj);
				var cls = (confObj.table_class!=undefined && confObj.table_class!='') ?  confObj.table_class :'';
				var headArray = tbl.loadTblHdr(confObj);
				$anch.append($tblHead);
				
				if(confObj.groupby == true || confObj.filter == true || confObj['add_option'] == true ){
					$anch.append(tbl.buildTableOverAllHeader(confObj));
					if(confObj.default_groupbyColumn!=undefined && confObj.default_groupbyColumn.length>0){
						confObj.applyGroup = true;
						tbl.groupContObj(confObj,confObj.default_groupbyColumn,confObj.content);
					}
				}
				var $table = $(tbl.table);
				if((confObj.isScrollable||'') != ''){
					$anch = tbl.buildScrollHead($anch,confObj);
					$tblCont =  $anch.find('.scrollWindow').append(($table.addClass(cls).attr('id',confObj.table_name+btable)).append(headArray[0]).append(headArray[1]).append(tbl.loadTblContent(confObj))).parent().parent();
				}else{
					$tblCont =  $anch.append(($table.addClass(cls).attr('id',confObj.table_name+btable)).append(headArray[0]).append(headArray[1]).append(tbl.loadTblContent(confObj)));
				}
				$tblCont =  $tblCont.append($tblFoot);
				$tblHold.html('').append($tblCont);
				tbl.bindActionBtns($tblHold,confObj);
				tbl.loadInfo(confObj,$tblHold);
				return true;
			};
			tbl.bindActionBtns =function($anch,confObj){
				if(confObj.filter == true)
					tbl.bindFilterBtns($anch,confObj);
				if(confObj.groupby == true)
					tbl.bindGrpBtns($anch,confObj);
			};
			tbl.bindFilterBtns = function($anch,confObj){
				var tableId = confObj.table_name;
				var table = $anch;
				$anch.find('#add_filter_link_btn_'+tableId).bind('click',{tableId:tableId,table:table,confObj:confObj},applyTblFilter);
				$anch.find('#clr_filter_link_btn_'+tableId).bind('click',{tableId:tableId,table:table,confObj:confObj},clearTblFilter);
				$anch.find('#clr_filter_link_btn_'+tableId).bind('change',{tableId:tableId,table:table,confObj:confObj},clearTblFilter);
			};
			tbl.bindGrpBtns = function($anch,confObj){
				var tableId = confObj.table_name;
				var table = $anch;
				$anch.find('#add_grp_link_btn_'+tableId).bind('click',{tableId:tableId,table:table,confObj:confObj},applyGroupBy);
				$anch.find('#clr_grp_link_btn_'+tableId).bind('click',{tableId:tableId,table:table,confObj:confObj},removeGroupBy);
				$anch.find('.groupbyColumns').bind('change',{tableId:tableId,table:$anch.find('#'+tableId+'_table'),confObj:confObj},tbl.grouptTrigger);
			};
			tbl.buildTableOverAllHeader = function(confObj){
				return getConfTblHead(confObj);
			};
			tbl.loadInfo = function(confObj,$tblHold){
				tbl.bindData(confObj,$tblHold);
				tbl.initPage(confObj,$tblHold);
				tbl.initSort(confObj,$tblHold);
				tbl.initFilter(confObj,$tblHold);
			};
			tbl.initSort = function(confObj,$tblHold){
				var $thead = $tblHold.find('thead');
				if(confObj.sort)
					return tbl.setsorthdr(confObj,$thead);
				else
					return false;
			};
			tbl.initFilter = function(confObj,$tblHold){
				var $thead = $tblHold.find('thead');
				if(confObj.filter)
					return tbl.setFilter(confObj,$thead,$tblHold);
				else
					return false;
			};
			tbl.bindData = function (confObj,$tblHold){
				$tblHold.find('table').data('confObj',confObj);
				return true;
			};
			tbl.initPage = function (confObj,$tblHold){
				$pageElem = $tblHold.find('.paginationWrapper');
				if($pageElem == undefined || $pageElem.length ==0){
					return false;
				}
				var isFilter = ((confObj.applyFilter||'') != '' && confObj.applyFilter == true);
				var isGroup = ((confObj.applyGroup||'') != '' && confObj.applyGroup == true);
				var cont = isGroup ? confObj.groupedCont : (isFilter  ? confObj.filterCont : confObj.content);
				tbl.pagetrigger($pageElem,cont.length,confObj.recordPerPage,tbl.pageTrigEvent,1);
			};
			tbl.bindTrEvent  = function($tr,eventObj){
				return $tr.unbind('click').bind('click',{tr:$tr},eventObj.click).unbind('change').bind('change',eventObj.change).unbind('keypress').bind('keypress',eventObj.keypress);
			};
			tbl.pageTrigEvent = function (pageNumber,event,$elem){
				var contId = $elem!=undefined ? $elem.attr('table_title')+btable : btable;
				var $tbl = $('#'+contId);
				var confObj= $tbl.data('confObj');
				confObj.curr_page =pageNumber;
				tbl.updateTblCont(confObj,$tbl);
				confObj.page_done!= undefined && confObj.page_done!= '' ? confObj.page_done.page_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl) :'';
			};
			tbl.tableTrigger = function ($tbl){
				if($tbl==undefined){ return false; }
				var confObj = $tbl.data('confObj');
				tbl.updateTblCont(confObj,$tbl);
				confObj.page_done!= undefined && confObj.page_done!= '' ? confObj.page_done.page_done($tbl.find('#thead_'+confObj.table_name+' tr')) :'';
				//confObj.sort_done!= undefined && confObj.sort_done!= '' ? confObj.sort_done.sort_done($tbl.find('#thead_'+confObj.table_name+' tr')) :'';
			};
			tbl.updateTblCont = function(confObj,$tbl){
				$tbl.find('tbody').remove();
				$tbl.append(tbl.loadTblContent(confObj));
			};
			tbl.loadTblHdr = function (confObj){
				var keyobj =confObj.key;
				var cont =confObj.content; 
				if(cont == undefined || cont.length == 0) return '';
				//var eventObj ='';
				var $thead = $('<thead id="thead_'+confObj.table_name+'"></thead>');
				var $td ='';
				var td ='';
				var tr ='';
				tr ='<tr></tr>';
				var $tr = $(tr);
				var $sub =$('<tr class="subHeader"></tr>');
				var $filter = $('<tr class="filterRow drillsOpenDefault" id="filter_row_'+confObj.table_name+'"></tr>');
				var flag = false;
				var colspan ='';
				var filterKey = false;
				var array = [];
				
				for(var i= 0;i<keyobj.length;i++){
					td ='';
					key = baseKey(keyobj[i]);
					
					if(cont[0].hasOwnProperty(key)){
						name = confObj.header_name[key]!= undefined  ? confObj.header_name[key] :'';
					}else{
						name = confObj.header_td_label[key]!= undefined  ? confObj.header_td_label[key] :'';
					}

					row_type = (confObj.header_row_type[key]||'');
					row_type_span = row_type!= main  ? 1 : 2;
					
					title = confObj.header_title[key]!= undefined  ? confObj.header_title[key] :'';
					data_type = confObj.header_data_type[key]!= undefined  ? confObj.header_data_type[key] :'';
					cls = confObj.content_class[key] != undefined  ? confObj.content_class[key] : '';
					if(data_type!='' && data_type!=undefined && confObj.sort) cls+=' actionrows'; else cls+=' remove-sort ';
					width = confObj.header_width[key] != undefined  ? confObj.header_width[key] : '';
					filterKey = (confObj['filterbyColumn'] != undefined ? ((confObj['filterbyColumn'][key]||'') != '' ? true :false) : false);
					if(row_type == 'sub'){
						flag =true;
						colspan = ((confObj.header_sub_rows[key]||'')!= '' ? confObj.header_sub_rows[key].subKeys.length : 1);
						td+='<th rowspan="'+row_type_span+'" colspan="'+colspan+'"  data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+' header" data_key="'+key+'" >'+name+'</th>';
						//$filter.append('<td rowspan="'+row_type_span+'" colspan="'+colspan+'"  data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+' '+(data_type||'' == 'date' ? ' inputDate date-pic-col ' : '')+' "  data_key="'+key+'">'+( (filterKey ==true) ?'<input type="#" id="filter_input_'+key+'"class="textbox Filter textboxDefaultText" data_attr="'+data_type+'"  data_key="'+key+'">': '')+'</td>');
						tbl.loadTblSubHdr(confObj,key,$sub,$filter);
					}else{
						td+='<th rowspan="'+row_type_span+'" data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+' header" data_key="'+key+'" >'+name+'</th>';
						$filter.append('<td rowspan="'+row_type_span+'" colspan="'+colspan+'"  data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+'  " data_key="'+key+'">'+( (filterKey ==true) ?'<input type="#" id="filter_input_'+key+'"class="textbox Filter textboxDefaultText '+((data_type||'') == 'date' ? ' date-pic-col inputDate ' : '')+'" data_attr="'+data_type+'"  data_key="'+key+'">': '')+'</td>');
					}
					if((confObj.header_td_addon!=undefined)){
						eventObj = confObj.header_td_addon[key]; eventObj = eventObj!= undefined ? eventObj : '';
						$td = (tbl.bindTdAddOn($(td),eventObj,cont[i]));
					}else{
						$td = ($(td));
					}
					$td.tooltip({position : {my : "left-50 center",at : "right+60 bottom"}});
					$tr.append($td);
				}
				(confObj.header_tr_class!=undefined && confObj.header_tr_class!= '')? $tr.addClass(confObj.header_tr_class) : ''; 
				$thead.append($tr);
				if(flag){
					$thead.append($sub);
				}
				array.push($thead);
				$filter = $('<thead class="hideBlock tfilter" id="filter_head_'+confObj.table_name+'"></thead>').append($filter);
				array.push($filter);
				return array;
			};
			tbl.setFilter = function(confObj,$thead,$tblHold){
				var $tbl = $tblHold.find('table');
				$thead.find('input').bind('keyup',{confObj: confObj,table: $tbl},tbl.filterTrigger).bind('change',{confObj: confObj,table: $tbl},tbl.filterTrigger);
				$thead.find('input.inputDate').datepicker({ zIndex : 50 });
			};
			tbl.filterTrigger = function(e){
				$elem = $(this);
				var $tbl = e.data.table;
				var confObj = e.data.confObj;
				confObj=tbl.fliterContent(confObj,$tbl,$elem);
				if(confObj.applyGroup == true){
					tbl.groupContObj(confObj,confObj.default_groupbyColumn,confObj.filterCont);
				}
				confObj.curr_page = 1;
				tbl.updateTblCont(confObj,$tbl);
				if(confObj.pagination == true){
					tbl.initPage(confObj,confObj.contHold);
				}
				confObj.filter_done!= undefined && confObj.filter_done!= '' ? confObj.filter_done.filter_done($tbl.find('#thead_'+confObj.table_name+' tr')) :''; 
			};
			tbl.grouptTrigger = function(e){
				$elem = $(this);
				var $tbl = e.data.table;
				var confObj = e.data.confObj;
				var groupbyopt = $elem.attr('data_key');
				var default_groupbyColumnn = groupbyopt != undefined ? [groupbyopt] : confObj.default_groupbyColumn;
				confObj.applyGroup = true;
				tbl.groupContObj(confObj,default_groupbyColumnn,confObj.content);
				tbl.updateTblCont(confObj,$tbl);
				confObj.group_done!= undefined && confObj.group_done!= '' ? confObj.group_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl) :''; 
			};
			tbl.fliterContent = function (confObj,$tbl,$elem){
				tbl.getFillteredCont($tbl,$elem,confObj);
				return confObj;
			};
			tbl.getFillteredCont = function($tbl,$elem,confObj){
				var content = confObj.content;
				var filterColumn = $tbl.find('thead.tfilter').find('input');
				var filterCont = [];
				var value = '';
				var tempElem = '';
				var objVal = '';
				var flag = true;
				var obj = {};
				var data_key ='';
				confObj.applyFilter = true;
				for(var i = 0;i<content.length;i++){
					obj = content[i];
					flag = true;
					for(var j =0;j<filterColumn.length;j++){
						tempElem = filterColumn[j];
						tempElem = $(tempElem);
						value = tempElem.val().trim();
						data_key = tempElem.attr('data_key');
						if(!obj.hasOwnProperty(data_key))
							data_key =confObj.cont_sort_function[data_key]();
							
						objVal = (obj[data_key] != undefined && obj[data_key] != null  ? obj[data_key] : '');
						objVal = tbl.formatKey(confObj,data_key,objVal);
						if(value!= '' && (objVal.toString().toLowerCase()).indexOf(value.toString().toLowerCase()) < 0){
							flag =false;
							break;
						}
					};
					if(flag){
						obj.cont_index = i;
						filterCont.push(obj);
					}else{
						obj.cont_index = '';
					}
				}
				confObj.filterCont = filterCont;
			};
			tbl.loadTblSubHdr = function (confObj,tempKey,$sub,$filter){
				var keyobj =confObj.header_sub_rows[tempKey].subKeys;
				var cont =confObj.content; 
				var td ='';
				var $td = '';
				var name = '';
				
				var title ='';
				var data_type ='';
				var cls ='';
				var width ='';
				var key = '';
				var filterKey = false;
				for(var i= 0;i<keyobj.length;i++){
					key =keyobj[i];
					td ='';
					if(cont[0].hasOwnProperty(key)){
						name = confObj.header_name[key]!= undefined  ? confObj.header_name[key] :'';
					}else{
						name = confObj.header_td_label[key]!= undefined  ? confObj.header_td_label[key] :'';
					}
					
					filterKey = (confObj['filterbyColumn'] != undefined ? ((confObj['filterbyColumn'][key]||'') != '' ? true :false) : false);
					
					title = confObj.header_title[key]!= undefined  ? confObj.header_title[key] :'';
					data_type = confObj.header_data_type[key]!= undefined  ? confObj.header_data_type[key] :'';
					cls = confObj.content_class[key] != undefined  ? confObj.content_class[key] : '';
					if(data_type!='' && data_type!=undefined && confObj.sort) cls+=' actionrows '; else cls+=' remove-sort ';
					width = confObj.header_width[key] != undefined  ? confObj.header_width[key] : '';
					
					td +='<th data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+' header" data_key="'+key+'" >'+name+'</th>';
					$filter.append('<td data_attr="'+data_type+'" width="'+width+'" title="'+title+'" class="'+cls+' " data_key="'+key+'">'+( (filterKey ==true) ?'<input type="#" id="filter_input_'+key+'"class="textbox Filter textboxDefaultText '+((data_type||'') == 'date' ? ' date-pic-col inputDate ' : '')+'" data_attr="'+data_type+'"  data_key="'+key+'">': '')+'</td>');
					if((confObj.header_td_addon!=undefined)){
						eventObj = confObj.header_td_addon[key]; eventObj = eventObj!= undefined ? eventObj : '';
						$td = (tbl.bindTdAddOn($(td),eventObj,cont[i]));
					}else{
						$td = ($(td));
					}
					$td.tooltip({position : {my : "left-50 center",at : "right+60 bottom"}});
					$sub.append($td);
				}
			};
			tbl.setsorthdr = function(confObj,$thead){
				$thead.find('.header.actionrows').bind('click',tbl.sortTrigger);
			};
			tbl.sortTrigger = function(){
				$elem = $(this);
				var $tbl = $elem.closest('table');
				var confObj = $tbl.data('confObj');
				confObj.applyGroup = false;
				removeGrpBtn(confObj.contHold,confObj.table_name);
				tbl.sortContent(confObj,$elem,tbl.updatesorthdr(confObj,$elem));
				tbl.updateTblCont(confObj,$tbl);
				confObj.sort_done!= undefined && confObj.sort_done!= '' ? 
						(confObj.sort_done.sort_done != undefined && confObj.sort_done.sort_done != '')?
								confObj.sort_done.sort_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl)
								: confObj.sort_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl):''; 
			};
			tbl.sortContent = function (confObj,$elem,sortOrder){
				var data_key = $elem.attr('data_key');
				var isFilter = ((confObj.applyFilter||'') != '' && confObj.applyFilter == true);
				var content = isFilter  ? confObj.filterCont : confObj.content;
				var data_func = '';
				var sort_func = '';
				//var formatter = (confObj.content_format[data_key]||'' !='') ? tbl.dataparse[confObj.content_format[data_key]] : confObj.cont_sort_function[data_key];
				if(!content[0].hasOwnProperty(data_key))
					data_key =confObj.cont_sort_function[data_key]();
				if(confObj.cont_data_function !=undefined && confObj.cont_data_function[data_key] !=undefined ){
					data_func = confObj.cont_data_function[data_key];
				}
				if(confObj.column_sort_function !=undefined && confObj.column_sort_function[data_key] !=undefined ){
					sort_func = confObj.column_sort_function[data_key];
				}
				$.fn.sortArrOfObjectsByParam(content,data_key,sortOrder,tbl.dataparse[confObj.content_format[data_key]],data_func,sort_func);
				isFilter  ? (confObj.filterCont = content) : (confObj.content = content);confObj.data_key = data_key;
				return confObj;
			};
			tbl.updatesorthdr = function(confObj,$elem){
				var flag = true;
				var $thead = $elem.closest('thead');
				if(!($elem.hasClass(sorted))) {
					$thead.find('th').removeClass(sorted).removeClass(ascending).removeClass(descending);
					$elem.addClass(ascending).addClass(sorted);
				}else if($elem.hasClass(ascending)){
					$thead.find('th').removeClass(sorted).removeClass(ascending).removeClass(descending);
					$elem.removeClass(ascending).addClass(descending).addClass(sorted);
					flag=false; 
				}else{
					$elem.removeClass(descending).addClass(ascending).addClass(sorted);
				}
				return flag;
			};
			tbl.subarray = function (confObj){
				var isFilter = ((confObj.applyFilter||'') != '' && confObj.applyFilter == true);
				var isGroup = ((confObj.applyGroup||'') != '' && confObj.applyGroup == true);
				var currarray =  isGroup ? confObj.groupedCont : (isFilter  ? confObj.filterCont : confObj.content);
				var currpage = confObj.curr_page;
				var itemsOnPage = confObj.recordPerPage;
				var newarray = [];
				var sindex = (currpage-1)*itemsOnPage;
				var eindex = (sindex + itemsOnPage < currarray.length) ? (sindex+itemsOnPage) : (currarray.length);
				for(var i= sindex;i<eindex;i++){newarray.push(currarray[i]);}
				//console.log('sindex ='+sindex +' eindex ='+eindex);
				return newarray;
			};
			tbl.loadTblContent = function(confObj){
				var keyobj =confObj.key; 
				var isFilter = ((confObj.applyFilter||'') != '' && confObj.applyFilter == true);
				var isGroup = ((confObj.applyGroup||'') != '' && confObj.applyGroup == true);
				var cont = isGroup ? confObj.groupedCont : (isFilter  ? confObj.filterCont : confObj.content);
				var cont_index = '';
				var data_key = confObj.data_key;
				var tr ='';
				var $td ='';
				var td='';
				$tbody =$('<tbody></tbody>');
				var grp_dat= '';
				cont = (confObj.pagination) ? tbl.subarray(confObj) : cont;
				if(cont == undefined || cont.length == 0) return '';
				var row_type ='';
				//var row_type_span ='';
				var fkey = '';
				var tkey = '';
				for( var i = 0;i<cont.length;i++){
					td = '';
					tr =$('<tr></tr>');
					td ='';
					for(var j= 0;j<keyobj.length;j++){
						key = keyobj[j];
						row_type = (confObj.header_row_type[key]||'');
						row_type_span = row_type!= main  ? 1 : 2;
						if(row_type == 'sub'){
							tbl.loadTblSubCont(confObj,key,tr,cont[i]);
						}else{
							if(isCompKey(key)){
								name = tbl.key_parse[confObj.comp_key_parser[key.split(':')[0]]](confObj,key,cont[i]);
								key =baseKey(key);
							}else if(confObj.cont_data_function!=undefined && confObj.cont_data_function[key]!=undefined){
								name = confObj.cont_data_function[key](cont[i]);
							}else if(!cont[i].hasOwnProperty(key)){
								if(typeof confObj.content_label[key] == "function"){
									name = confObj.content_label[key](cont[i]);					
								}else{
									name = confObj.content_label[key];
								}	
							}else{
								name = cont[i][key];name= name!= undefined && name!=null ? name :'';
								name = tbl.formatKey(confObj,key,name);
							}
							cont_index = (cont[i]['cont_index']||'');
							title = confObj.content_title[key]; title = title!= undefined ? title :'';
							cls = confObj.content_class[key]; cls = cls!= undefined ? cls : ''; data_key == key ? cls+= ' sorted ' : ' ';
							width = confObj.content_width[key]; width = width!= undefined ? width : '';
							eventObj = confObj.content_td_addon[key]; eventObj = eventObj!= undefined ? eventObj : '';
							td ='<td width="'+width+'" title="'+title+'" class="'+cls+' header" cont_index="'+cont_index+'" data_index="'+(confObj.curr_page-1)+i+'" data_key="'+key+'" id="'+key+'_tr_'+confObj.curr_page+'_'+i+'">'+name+'</td>';
							$td = (tbl.bindTdAddOn($(td),eventObj,cont[i]));
							(confObj.data_td_class!=undefined && confObj.data_td_class[key]!=undefined ) ? confObj.data_td_class[key](cont[i],$td) :'';
							$td.tooltip({position : {my : "left-50 center",at : "right+60 bottom"}});
							tr.append($td);
						}
					}
					//tr +='<tr></tr>';
					eventObj = confObj.content_bind_event;
					$tr = tr.data('obj',cont[i]); 
					(confObj.content_tr_class!=undefined && confObj.content_tr_class!= '')? $tr.addClass(confObj.content_tr_class) : '';
					(confObj.data_tr_class!=undefined && confObj.data_tr_class.func_class!=undefined) ? confObj.data_tr_class.func_class(cont[i],$td,$tr) :'';
					$tr = tbl.bindTrEvent($tr,eventObj);
					$tr = tbl.getTrId($tr,confObj,cont[i]);
					if(isGroup){
						if(fkey== '' || fkey!= cont[i].group_key){
							//if(fkey == ''){
								fkey = cont[i].group_key;
							//}
							grp_dat = confObj.group_cont_function[cont[i].grp_col_key];
							if(grp_dat ==undefined || grp_dat ==''){
								grp_dat = confObj.group_cont_function[confObj.default_groupbyColumn];
							}
							if(grp_dat!=undefined && grp_dat!=''){
								$tbody.append(grp_dat(cont[i],confObj));
							}else{
								$tbody.append('<td class="rowSection rowHighlight" colspan="10"  id ="def_tr_grop_'+cont[i].grp_col_key+'"><td  id ="def_td_grop'+fkey+'">'+ (cont[i].grp_col_key)+'</tr>');
							}
						}
					}
					$tbody.append($tr);
					if(isGroup && confObj.grp_tot){
						var actIndex = confObj.pagination ? (confObj.curr_page == 1 ? i: (((confObj.curr_page-1)*confObj.recordPerPage)+i)) : i;
						if(actIndex == (confObj.groupedCont.length-1) || (i < cont.length-1 && cont[i].group_key!= cont[i+1].group_key)){
							grp_dat = confObj.group_tot_cont_function[cont[i].grp_col_key];
								if(grp_dat ==undefined || grp_dat ==''){
									grp_dat = confObj.group_cont_function[confObj.default_groupbyColumn];
								}
								if(grp_dat!=undefined && grp_dat!=''){
									$tbody.append(grp_dat(cont[i],confObj));
								}else{
									$tbody.append('<td class="rowSection rowHighlight" colspan="10"  id ="def_tr_grop_'+cont[i].grp_col_key+'"><td  id ="def_td_grop'+tkey+'"></tr>');
								}
						}
					}
				}
				return $tbody;
			};
			tbl.groupContObj = function(confObj,columns,cont){
				var key = '';
				var groupedCont = [];
				var groupedContObj = {};
				var tempArray = [];
				var obj ={};
				for(var i =0;i<cont.length;i++){
					tbl.getGrpKey(columns,cont[i],confObj);
					obj = cont[i];
					key = obj.group_key+' ';
					if(groupedContObj.hasOwnProperty(key)){
						tempArray = groupedContObj[key];
						tempArray.push(obj);
					}else{
						tempArray = [];
						tempArray.push(obj);
					}
					groupedContObj[key] = tempArray;
				}
				for(key in groupedContObj){
					groupedCont = groupedCont.concat(groupedContObj[key]);
					//console.log(key + ' ' +groupedContObj[key]);
				}
				confObj.groupedCont = groupedCont;
				confObj.groupedContObj = groupedContObj;
				confObj.cur_gru_col = columns[0];
			}; 
			tbl.getGrpKey = function(columns,obj,confObj){
			var tempKey = '';
			var key ='';
			var grp_column_key =  '';
				for(var i = 0;i<columns.length;i++){
					tempKey = columns[i];
					if(obj[tempKey]!=undefined){
						key+= obj[tempKey];
					}else if(confObj.cont_group_data_function != undefined && confObj.cont_group_data_function[tempKey]!=undefined){
						key+= confObj.cont_group_data_function[tempKey];
					}else{
						key+= 'NONE';
					}
					obj.grp_col_key = tempKey;
				}
				obj.group_key = key;
			};
			tbl.loadTblSubCont = function (confObj,tempKey,$tr,obj){
				var keyobj =confObj.header_sub_rows[tempKey].subKeys;
				//var cont =confObj.content; 
				var td ='';
				var $td = '';
				var name = '';
				var title ='';
				//var data_type ='';
				var data_key = confObj['data_key'];
				var cls ='';
				var width ='';
				var key = '';
				var eventObj ='';
				for(var i= 0;i<keyobj.length;i++){
					key = keyobj[i];
					if(isCompKey(key)){
						name = tbl.key_parse[confObj.comp_key_parser[key.split(':')[0]]](confObj,key,obj);
						key =baseKey(key);
					}else if(confObj.cont_data_function!=undefined && confObj.cont_data_function[key]!=undefined){
						name = confObj.cont_data_function[key](obj);
					}else if(!obj.hasOwnProperty(key)){
						name = confObj.content_label[key];
					}else{
						name = obj[key];name= name!= undefined && name!=null ? name :'';
						name = tbl.formatKey(confObj,key,name);
					}
					title = confObj.content_title[key]; title = title!= undefined ? title :'';
					cls = confObj.content_class[key]; cls = cls!= undefined ? cls : ''; data_key == key ? cls+= ' sorted ' : '';
					width = confObj.content_width[key]; width = width!= undefined ? width : '';
					eventObj = confObj.content_td_addon[key]; eventObj = eventObj!= undefined ? eventObj : '';
					td ='<td width="'+width+'" title="'+title+'" class="'+cls+' header" data_index="'+(confObj.curr_page-1)+i+'" data_key="'+key+'" id="'+key+'_tr_'+confObj.curr_page+'_'+i+'">'+name+'</td>';
					$td = (tbl.bindTdAddOn($(td),eventObj,obj));
					$td.tooltip({position : {my : "left-50 center",at : "right+60 bottom"}});
					$tr.append($td);
				}
			};
			tbl.getTrId = function($tr,confObj,obj){
				if(confObj.tr_id == undefined){ 
					$tr.attr('id',Math.random().toFixed(10).substr(2,5));
				}else{
					var id='';
					var keyObj = confObj.tr_id;
					for(var i=0;i<keyObj.length;i++){
						if(id ==''){id = obj[keyObj[i]];}
						else{ id+= '_'+obj[keyObj[i]];}
					}
					$tr.attr('id',id);
				}
				return $tr;
			};
			tbl.bindTdAddOn= function ($td,obj,cont){
				for(key in obj){
					tbl.bindTrEvent($td.find(key),obj[key].event);
					(obj[key].display($td.find(key),cont));
				}
				return $td;
			};
			tbl.formatKey= function (confObj,key,name){
				(confObj.content_format[key]!= undefined && confObj.content_format[key]!= '') ? name = tbl.dataparse[confObj.content_format[key]](name): name;
				return name;
			};
			tbl.pagetrigger = function($elem,recCount, itemsOnPage, pageTrigEvent,currPage){
				$elem.pagination({items: recCount,itemsOnPage: itemsOnPage, cssStyle: 'compact-theme', 
					currentPage: currPage, selectOnClick: true,onPageClick: tbl.pageTrigEvent
				  });
				//return $elem;
			}; 
			tbl.buildPage = function (confObj,currPage){
				var $pageCont ='';
				var recOnPage = confObj.recordPerPage;
				var recCnt = 0;
				if(confObj.content!=undefined && recOnPage !=undefined){
					recCnt = confObj.content.length;
					if(recCnt>recOnPage){
						$pageCont = $(tbl.pagination);
					}
				}
				return $pageCont; 
			};
			tbl.loadSorting = function(cont,confObj){};
			tbl.updateTbl = function(confObj){};
		}
	});
	var tbl = $.tablebuild;
	$.fn.extend({loadtbl : function(confObj){
		$tblHold =$(this);
		var flag = false;
		if(confObj.option === undefined){
			return flag;
		}
		switch(confObj.option){
			case build : {
				confObj.contHold = $tblHold;
				flag = tbl.buildTbl(confObj,$tblHold);
				break;
			}case update: {
				confObj.contHold = $tblHold;
				flag = tbl.updateTbl(confObj,$tblHold);
				break;
			}default : {
				flag = false;
			}
		}
		return flag;
	}}
	);
	
	$.fn.checkMobiResult = function (data,key){
		var  msg =mobiSerErrCode;
		 if(data!=null && data!=undefined){
			 if(data.length == 0){
				 msg =nodata;
			 }else if(data[0].ErrorMsg!=undefined){
				 msg =frameMobiMsg(data[0]);
			 }else if(data[0][key]!=undefined && data[0][key]!=''){
				 msg ='';
			 }
		 }
		 return msg;
	};
	$.fn.loadArticlePopUp = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticle(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticlePopUpNew = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleNew(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticlePopUpNewLkpUom = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleNewLkpUom(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadContentPopUp = function (tblObj,obj,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(tblObj);
		$popUp.find('#'+obj.tblName+'_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},obj.onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticlePopUpForStkAdj = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleForStkAdj(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	$.fn.loadArticlePopUpForStkAdjNew = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleForStkAdjNew(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticlePopUpForStkAdjReport = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleForStkAdjReport(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticlePopUpForStkAdjReportST = function (data,onSelect,onArticleTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(articleDescPopUp));
			$popUp = $('#dialog-mulipleArticles');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleArticles .popupData');
		$popupCont.loadtbl(new tblConfArticleForStkAdjReportST(searchtext,data,option,onArticleTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(articleDescActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadOrdersForStkAdj = function (data,onSelect,onOrderSearchTrClick,onArticleTdCheck,option,searchtext,area,formData,param){
		// need to improve this with build table
		var $popUp = $('#dialog-mulipleOrders');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(stkAdjOrdersPopUp));
			$popUp = $('#dialog-mulipleOrders');
			triggerarticleDialog($popUp);
		}
		$popupCont = $('#dialog-mulipleOrders .popupData');
		$popupCont.loadtbl(new tblConfOrderSearchForStkAdj(searchtext,data,option,onOrderSearchTrClick,onArticleTdCheck));
		$popUp.find('#article_search_result_head_page').addClass('paddingtop10');
		$popUp.find('table').parent().wrap(poptable);
		$popUp.find('.tableFooter').addClass('hideBlock');
		$popupCont.append(stkAdjOrdersActionButton);
		$popupCont.find('#addtolist').addClass('hideBlock').unbind('click').bind('click',{reqArea:area,searchData:formData,param:param},onSelect);
		$popUp.dialog('open').parent().addClass('popupWrapper');
		return true;
	};
	
	$.fn.loadArticleSooPopUp = function (obj){
		var $popUp = $('#dialog-com-openOrders');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_open_orders));
			$popUp = $('#dialog-com-openOrders');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 200,maxHeight: 600,width: 800});
		}
		$popupCont = $('#dialog-com-openOrders .popupData');
		getSOOContent(obj,$popupCont,$popUp);
		return true;
	};

	$.fn.loadArticleAllocationPopUp = function (obj){
		var $popUp = $('#dialog-com-allocation');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_allocation));
			$popUp = $('#dialog-com-allocation');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,width: 920});
		}
		$popupCont = $('#dialog-com-allocation .popupData');
		getAllocContent(obj,$popupCont,$popUp);
		return true;
	};
	$.fn.loadArticlePromoPopUp = function (obj){
		var $popUp = $('#dialog-com-openPromo');
		var $body = $('body');
		//var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_promotion));
			$popUp = $('#dialog-com-openPromo');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 200,maxHeight: 600,width: 800});
		}
		//$popupCont = $('#dialog-com-openPromo .popupData');
		frameArtPromoContent(obj,$popUp);
		return true;
	};
	$.fn.loadArticleAlternatePricePopUp = function (article){
		var $popUp = $('#dialog-com-alt-pricing');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_alter_price));
			$popUp = $('#dialog-com-alt-pricing');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 110,maxHeight: 600,width: 800});
		}
		$popupCont = $('#dialog-com-alt-pricing .otherPriceInfoInPop');
		getAlterPriceInfo(article,$popupCont,$popUp);
		return true;
	};
	
	//Defect_12700
	$.fn.warnPopup = function (option,msg,title,yes,no,ok,$elem,buttonName,onCloseEvent){
		// need to improve this with build table
		var $popUp = $('#dialog-alert-conf');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(confirmationBox));
			$popUp = $('#dialog-alert-conf');
			$popUp.attr('title',title);
			triggerWarn($popUp);
		}else{
			$popUp.parent().find('.ui-dialog-title').text(title);
		}
		$popupCont = $('#dialog-alert-conf #message');
		$popupCont.html(msg);
		if(option == 'warn'){
			$popUp.find('#yes').removeClass('hideBlock').unbind('click').bind('click',{msg: $popUp ,cache : $elem},yes);
			$popUp.find('#no').removeClass('hideBlock').unbind('click').bind('click',{msg: $popUp ,cache : $elem},no);
			if(buttonName!=undefined && buttonName =='ok/cancel')
			{
				$popUp.find('#yes label').text('Ok');
				$popUp.find('#no label').text('Cancel');
			}else if(buttonName!=undefined && buttonName =='Discard/Back'){
				$popUp.find('#yes label').text('Discard');
				$popUp.find('#no label').text('Back');
			}else if(buttonName!=undefined && buttonName =='Proceed/Back'){
				$popUp.find('#yes label').text('Proceed');
				$popUp.find('#no label').text('Back');
			}
			else
				{
				$popUp.find('#yes label').text('Yes');
				$popUp.find('#no label').text('No');
				}
			$popUp.find('#ok').addClass('hideBlock');
		}else{
			$popUp.find('#ok').removeClass('hideBlock').unbind('click').bind('click',{msg: $elem,dialog:$popUp},ok);
			$popUp.find('#yes').addClass('hideBlock');
			$popUp.find('#no').addClass('hideBlock');
		}
		$popUp.dialog('open').parent().addClass('popupWrapper');
		//Defect_12700
		if((onCloseEvent||'')!='' && typeof onCloseEvent === 'function'){
			$popUp.closest('.popupWrapper').find('.closePopUp').unbind('click').bind('click',{msg: $popUp ,cache : $elem},onCloseEvent);
		}else{
			$popUp.closest('.popupWrapper').find('.closePopUp').unbind('click').bind('click',{msg: $popUp ,cache : $elem},function(e){e.data.msg.dialog('close');});
		}
		return true;
	};
	
}(jQuery));


var alternatePriceParam = function(article){
    this.iv_site = siteNo;
    this.iv_sales_org = salesOrg;
    this.iv_article = article||'';
    this.iv_ranged = 'Y';
    this.iv_session_id = '';
};

function getAlterPriceInfo(article,$hold,$dialog){
	var param = new alternatePriceParam(article);
	console.log(getOtherPriceInfoUrl + ' ' + JSON.stringify(param));
	$.ajax({
	    type: "POST",
	    url: getOtherPriceInfoUrl,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	}).done(function(response) {
		if(checkResult(response,'price_type')){
		  $hold.html(getOtherPrcCont(response));
		  $dialog.dialog('open').parent().addClass('popupWrapper');
		}
		stopLoading();
	}).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	}).always(function() {
		  populateWarehouse();
		  stopLoading();
	});
};

function getOtherPrcCont(otherPriceArray) {
  var otherPriceContent = '';
  if (otherPriceArray != null && otherPriceArray != undefined && otherPriceArray.length > 0 && otherPriceArray[0].price_type_desc != undefined) {
	var content = '';
	otherPriceContent += '<tr class="lastRow">';
	for (var i = 0; i < otherPriceArray.length; i++) {
	  if (i == 2) {
		content += '<td width="20%" class="noDivider">' + (otherPriceArray[i].price_type_desc == null ? '' : otherPriceArray[i].price_type_desc) + '(' + (otherPriceArray[i].price_type == null ? '' : otherPriceArray[i].price_type) + '):</td><td width="13%" class="lastColumn ">' + (otherPriceArray[i].sell_price == null ? '' : Number(otherPriceArray[i].sell_price).toFixed(2)) + '</td>';
	  } else {
		content += '<td width="20%">' + (otherPriceArray[i].price_type_desc == null ? '' : otherPriceArray[i].price_type_desc) + '(' + (otherPriceArray[i].price_type == null ? '' : otherPriceArray[i].price_type) + '):</td>' + '<td width="13%" class="valueInfo" id="mhdPRC">' + (otherPriceArray[i].sell_price == null ? '' : Number(otherPriceArray[i].sell_price).toFixed(2)) + '</td>';
	  }
	  if (i == 1 && i == otherPriceArray.length - 1) {
		content += '<td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td>';
	  }
	}
	var newContent = otherPriceContent + content + '</tr>';
	return newContent;
  }
}

var getArtPromoContent = function(param,$hold,$dialog){
	console.log(getOfferDetails  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url: getOfferDetails,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(data) {
		  loadPromoCont(param,data,$hold,$dialog);
		  stopLoading();
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  populateWarehouse();
		  stopLoading();
	  });
};

var loadPromoCont = function(param,data,$hold,$dialog){
	if(data!=undefined){
		if(data.length == 0){
			$hold.html('<div class="warningMessage"><h4>'+nodata+'</h4></div>');
		}else if(data[0]['ErrorID'] ==  undefined){
			var confObj = new tblConfObjPromo(data,param.flag);
			$hold.loadtbl(confObj);
		}else{
			$.fn.showCustomMsg([frameMobiMsg(data[0])],error);
		}
		$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');
		(!$dialog.dialog('isOpen')) ? $dialog.dialog('open').parent().addClass('popupWrapper') :'';
	}else{
		$.fn.showCustomMsg([mobiSerErrCode],error);
	}

};

var frameArtPromoContent = function(obj,$dialog){
	var tabs = $dialog.find('#promo-tabs');
	if(!(tabs.hasClass('ui-tabs'))){
		tabs.tabs();
	}
	var $active = tabs.find('#active');
	var $future = tabs.find('#future'); 

	$active.unbind('click').bind('click',{option:'C',obj:obj,hold:tabs.find('#promo-1'),dialog:$dialog},triggerGetPromo).removeClass(loaded);
	$future.unbind('click').bind('click',{option:'F',obj:obj,hold:tabs.find('#promo-2'),dialog:$dialog},triggerGetPromo).removeClass(loaded);
	if(obj.option == 'C') {$active.trigger('click');tabs.tabs({'active':'0'});}else {$future.trigger('click');tabs.tabs({'active':'1s'});}
};

var triggerGetPromo = function(e){
	if($(this).hasClass(loaded)){
		return false;
	}
	$(this).addClass(loaded);
	var option = e.data.option;
	var obj = e.data.obj;
	var hold = e.data.hold;
	var dialog = e.data.dialog;
	var param = new articlePromoParam(obj.article,obj.dept,obj.cat,obj.subcat,obj.seg,option);
	getArtPromoContent(param,hold,dialog);
};

var articlePromoParam = function(article,dept,cat,subcat,seg,flag){
    this.iv_site = siteNo;
    this.iv_article = article;
    this.iv_ranged = 'Y';
    this.iv_promo_start_date ='';
    this.iv_promo_end_date ='';
    this.iv_sales_org = salesOrg;
    this.iv_department_no= dept||'';
    this.iv_category_no= cat||'';
    this.iv_sub_category_no= subcat||'';
    this.iv_segment_no= seg||'';
    this.iv_promo_flag = flag; 
    this.iv_session_id = '';
	this.iv_complex_pbd_flag = '';
};
function tblConfObjPromo(data,option){
	this.option = 'build';
	this.key = ['promo_type','promo_start_date','promo_end_date','promo_off_no','promo_desc','uom','promo_price','promo_price_type'];
	this.table_name = (option+'_promo_order_tbl');
	this.table_title = '';
	this.table_class = ' ContentTable ';
	this.header_name = {promo_type:'Type',promo_desc: 'Description',promo_start_date:'Start Date',promo_end_date:'End Date',promo_off_no:'Promo #',uom:'UOM',promo_price:'Promo Price',promo_price_type:'Price Type'},
	this.header_data_type = {promo_type:'',promo_desc: '',promo_start_date:'',promo_end_date:'',promo_off_no:'',uom:'',promo_price:'',promo_price_type:''},
	this.header_row_type = {promo_type:'main',promo_desc: '',promo_start_date:'main',promo_end_date:'main',promo_off_no:'main',uom:'main',promo_price:'main',promo_price_type:'main'},
	this.header_class = {promo_type:'centerValue',promo_desc: '',promo_start_date:'centerValue',promo_end_date:' centerValue ',promo_off_no:'',uom:'centerValue',promo_price:'centerValue',promo_price_type:'centerValue lastColumn '},
	this.header_title = {},
	this.header_width = {promo_type:'',promo_desc: '',promo_start_date:'',promo_end_date:'',promo_off_no:'',uom:'',promo_price:'',promo_price_type:'',total_pallets:'',showTime:''},
	this.content_class = {promo_type:'centerValue',promo_desc: '',promo_start_date:'centerValue',promo_end_date:' centerValue ',promo_off_no:'',uom:'centerValue',promo_price:'centerValue',promo_price_type:'centerValue lastColumn '},
	this.content_title = {},
	this.content_format = {promo_type:'removeNull',promo_desc: 'removeNull',promo_start_date:'mobi_date',promo_end_date:'mobi_date',promo_off_no:'removeNull',uom:'removeNull',promo_price:'toFix2',promo_price_type:'removeNull'},
	this.content_width =  {promo_type:'',promo_desc: '',promo_start_date:'',promo_end_date:'  ',promo_off_no:'',uom:'',promo_price:'',promo_price_type:''},
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
}

var getSOOContent = function(param,$hold,$dialog){
	console.log(getOrderHdrBasicInfoUrl  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url: getOrderHdrBasicInfoUrl,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(response) {
		  if(checkResult(response,'order_no')){
			  frameSOOContent(response,$hold,$dialog);
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

var frameSOOContent = function(data,$hold,$dialog){
	var confObj = new tblConfObjSOO(data);
	$hold.loadtbl(confObj);$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');
	$dialog.dialog('open').parent().addClass('popupWrapper');$hold.find('#soo_open_order_tbl_head_page').addClass('paddingtop10');
};

function tblConfObjSOO(data){
	this.option = 'build';
	this.key = ['order_no','total_cartons','delivery_date','supplier_name:supplier_no','source','order_status'];
	this.table_name = 'soo_open_order_tbl';
	this.table_title = 'List of orders';
	this.table_class = ' ContentTable ';
	this.header_name = {order_no:'Order #',total_cartons:'Order Qty.',delivery_date:'Delivery Date',supplier_name:'Supplier',order_type:'Type',source:'Source',order_status:'Status'},
	this.header_data_type = {order_no:'',delivery_date:'',order_status:'',supplier_name:'',order_type:'',source:'',total_cartons:''},
	this.header_row_type = {order_no:'main',delivery_date:'main',order_status:'main',supplier_name:'main',order_type:'main',source:'main',total_cartons:'main'},
	this.header_class = {order_no:'',delivery_date:'centerValue',order_status:' centerValue lastColumn ',supplier_name:'',order_type:'',source:'',total_cartons:'centerValue',total_pallets:''},
	this.header_title = {},
	this.header_width = {order_no:'',delivery_date:'',order_status:'',supplier_name:'',order_type:'',source:'',total_cartons:'',total_pallets:'',showTime:''},
	this.content_class = {order_no:'',delivery_date:'centerValue',order_status:' centerValue lastColumn ',supplier_name:'',order_type:'',source:'',total_cartons:'centerValue',total_pallets:''},
	this.content_title = {},
	this.content_format = {order_no:'trim',delivery_date:'',order_status:'removeNull',supplier_name:'removeNull',order_type:'removeNull',source:'removeNull',total_cartons:'removeNull'},
	this.content_width =  {order_no:'',delivery_date:'',order_status:'',supplier_name:'',order_type:'',source:'',total_cartons:'',total_pallets:'',showTime:''},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
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
}

var getAllocContent = function(param,$hold,$dialog){
	console.log(getAllocationOrderFromSAPURL  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url: getAllocationOrderFromSAPURL,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(data) {
		  if(data != undefined && data.result!=undefined){
			  var obj =data.result[0];
			  if(obj.MSG!=undefined && obj.MSG!=null && (!isNaN(obj.MSG.trim()))){
				  var list = data.result;
				  frameAllocContent(list,$hold,$dialog);
			  }else if(obj.MSG!=undefined && obj.MSG!=null && obj.MSG.trim().indexOf(' ')>-1){
				  $.fn.showCustomMsg([obj.MSG],error);
			  }else{
				  $.fn.showCustomMsg([mobiSerErrCode],error);
			  }
		  }else{
			  checkResult(data,'ARTICLE');
		  }
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
	  }).always(function() {
		  populateWarehouse();
		  stopLoading();
	  });
};

function checkResult(data,key,title){
	var errorMsg = '';
	errorMsg = $.fn.checkMobiResult(data,key);
	  if(errorMsg ==''){
		  return true;
	  }else{
		   if(title == undefined)
		  $.fn.showCustomMsg([errorMsg],error);
		  if(title != undefined)
		  $.fn.showCustomMsg([errorMsg],error,title);
	  }
	  return false;
}

var frameAllocContent = function(data,$hold,$dialog){
	var confObj = new tblConfComAlloc(data);
	$hold.loadtbl(confObj);$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');
	$dialog.dialog('open').parent().addClass('popupWrapper');
};

var showAllocOrderNo = function(obj){
	var finalOrder = (obj.ORDER_NO||obj.WAREHOUSE_ORDER);
	obj.finalOrder = finalOrder;
	return '<a>'+finalOrder+'</a>';
};

var getAllocOrderNo = function(){
	return 'finalOrder';
};

function tblConfComAlloc(data){
	this.option = 'build';
	this.key = ['SHOW_DATE','ALLOCATION_NO','ALLOCATION_DESC','ALLOC_REASON','ALLOCATION_QTY','ALLOCATION_STATUS','showAllocOrderNo','ORDER_STATUS'];
	this.table_name = 'allocation_tab';
	this.table_title = 'Total <strong>'+data.length+'</strong> allocations';
	this.table_class = ' ContentTable  ';
	this.header_tr_class = 'collapsed';
	this.header_name = {SHOW_DATE:'On Show Date',ALLOCATION_NO:'Allocation #',ALLOCATION_DESC:'Description',ALLOC_REASON:'Reason',ALLOCATION_QTY:'Total Qty',ALLOCATION_STATUS:'Allocation Status',ORDER_STATUS:'Order Status'},
	this.header_data_type = {SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',ALLOCATION_QTY:'',ALLOCATION_STATUS:'',ORDER_STATUS:'',showAllocOrderNo:''};
	this.header_row_type = {SHOW_DATE:'main',ALLOCATION_NO:'main',ALLOCATION_DESC:'main',ALLOC_REASON:'main',ALLOCATION_QTY:'main',ALLOCATION_STATUS:'main',showAllocOrderNo:'main',ORDER_STATUS:'main'};
	this.header_class = {SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',ALLOCATION_QTY:' centerValue ',ALLOCATION_STATUS:' centerValue ',showAllocOrderNo:' centerValue ',ORDER_STATUS:' centerValue lastColumn '};
	this.header_title = {},
	this.header_width = {SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',ALLOCATION_QTY:'',ALLOCATION_STATUS:'',showAllocOrderNo:'',ORDER_STATUS:''};
	this.content_tr_class = '';
	this.content_class = {SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',ALLOCATION_QTY:' centerValue ',ALLOCATION_STATUS:' centerValue ',showAllocOrderNo:' centerValue ',ORDER_STATUS:' centerValue lastColumn '};
	this.content_title = {};
	this.content_format = {SHOW_DATE:'dotdate',ALLOCATION_NO:'removeNull',ALLOCATION_DESC:'removeNull',ALLOC_REASON:'removeNull',ALLOCATION_QTY:'removeNull',ALLOCATION_STATUS:'removeNull',ORDER_STATUS:'removeNull'};
	this.content_width =  {SHOW_DATE:'',ALLOCATION_NO:'',ALLOCATION_DESC:'',ALLOC_REASON:'',ALLOCATION_QTY:'',ALLOCATION_STATUS:'',showAllocOrderNo:'',ORDER_STATUS:''};
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;
	this.sort_done = {sort_done:'' };
	this.page_done = {page_done: ''};
	this.cont_data_function = {showAllocOrderNo:showAllocOrderNo};
	this.cont_sort_function = {showAllocOrderNo:getAllocOrderNo};
	this.header_td_label = {showAllocOrderNo:'Order #'};
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {};
	this.header_td_addon = {};
	this.content_label = {};
}

var padzero = function (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    s = s.substr(s.length - size,s.length);
    return s;
};
var formatTime = function (time) {
	if(time.length ==  6)
    	time = time.substr(0,2)+':'+time.substr(2,2)+':'+time.substr(4,2);
    return time;
};
function triggerWarn($popUp){
	//Defect_12700
	return $popUp.dialog({autoOpen: false, modal: true, resizable: false,maxHeight: 800,width: 400,closeOnEscape: false});
}

function triggerarticleDialog($popUp){
	return $popUp.dialog({ autoOpen : false, modal : true, resizable : false, maxHeight : 1000, width : 800 });
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

function tblConfArticle(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	this.option = 'build';
	this.key = ['article','article_desc','article_uom','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article:'Article',article_desc:'Description',article_uom:'Uom',article_uom_st:'Uom',label:'Select'},
	this.header_data_type = {article:'char',article_desc:'char',article_uom:'char',label:''},
	this.header_row_type = {article:'main',article_desc:'main',article_uom:'main',label:'',article_uom_st:'main'},
	this.header_class = {article:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.content_title = {},
	this.content_format = {article:'removeNull',article_desc:'removeNull',article_uom:'removeNull',label:'',article_uom_st:'removeNull'},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' ',article_uom_st:'Uom'};
}

function tblConfArticleNew(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	this.option = 'build';
	this.key = ['article_no','article_desc','article_uom','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article_no:'Article',article_desc:'Description',article_uom:'Uom',article_uom_st:'Uom',label:'Select'},
	this.header_data_type = {article_no:'char',article_desc:'char',article_uom:'char',label:''},
	this.header_row_type = {article_no:'main',article_desc:'main',article_uom:'main',label:'',article_uom_st:'main'},
	this.header_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',article_uom:'removeNull',label:'',article_uom_st:'removeNull'},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' ',article_uom_st:'Uom'};
}

function tblConfArticleNewLkpUom(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	this.option = 'build';
	this.key = ['article_no','article_desc','pack_size','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = '<strong>Please select the Article</strong>';
	this.header_name = {article_no:'Article',article_desc:'Description',pack_size:'Pack Size',article_uom_st:'Uom',label:'Select'},
	this.header_data_type = {article_no:'char',article_desc:'char',pack_size:'char',label:''},
	this.header_row_type = {article_no:'main',article_desc:'main',pack_size:'main',label:'',article_uom_st:'main'},
	this.header_class = {article_no:'centerValue',article_desc:'',pack_size:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_no:'centerValue',article_desc:'',pack_size:'centerValue',label:'lastColumn centerValue',article_uom_st:'centerValue'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',pack_size:'removeNull',label:'',article_uom_st:'removeNull'},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' ',article_uom_st:'Uom'};
}


var verifyPopUp = function(tblName,searchtext,data,option,onArticleTrClick,onArticleTdCheck,onSelect){
	this.tblName = tblName;
	this.searchtext = searchtext;
	this.data = data;
	this.option = option;
	this.onArticleTrClick = onArticleTrClick;
	this.onArticleTdCheck = onArticleTdCheck;
	this.onSelect = onSelect;
};

function tblConfStore(obj){
	this.option = 'build';
	this.key = ['supplier_no','supplier_name','label'];
	this.table_name = obj.tblName;
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+obj.data.length+'</strong> results found for <strong class="searchString">\''+obj.searchtext+'\'</strong>';
	this.header_name = {supplier_no:'Article',supplier_name:'Description',article_uom:'Uom',label:'Select'},
	this.header_data_type = {supplier_no:'char',supplier_name:'char',article_uom:'char',label:''},
	this.header_row_type = {supplier_no:'main',supplier_name:'main',article_uom:'main',label:''},
	this.header_class = {supplier_no:'centerValue',supplier_name:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {supplier_no:'centerValue',supplier_name:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {supplier_no:'removeNull',supplier_name:'removeNull',article_uom:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  obj.data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(obj.option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : obj.onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : obj.onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
}

function tblConfArticleForStkAdj(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	
	this.option = 'build';
	this.key = ['article_no','article_desc','pbd_uom','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article_no:'Article',article_desc:'Description',pbd_uom:'Uom',label:'Select'},
	this.header_data_type = {article_no:'number',article_desc:'char',pbd_uom:'char',label:''},
	this.header_row_type = {article_no:'main',article_desc:'main',pbd_uom:'main',label:''},
	this.header_class = {article_no:'centerValue',article_desc:'',pbd_uom:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_no:'centerValue',article_desc:'',pbd_uom:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',pbd_uom:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
}

function tblConfArticleForStkAdjNew(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	
	this.option = 'build';
	this.key = ['article_no','article_desc','article_uom','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article_no:'Article',article_desc:'Description',article_uom:'Uom',label:'Select'},
	this.header_data_type = {article_no:'number',article_desc:'char',article_uom:'char',label:''},
	this.header_row_type = {article_no:'main',article_desc:'main',article_uom:'main',label:''},
	this.header_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',article_uom:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
}


function tblConfArticleForStkAdjReport(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	
	this.option = 'build';
	this.key = ['article_no','article_desc','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article_no:'Article',article_desc:'Description',article_uom:'Uom',label:'Select'},
	this.header_data_type = {article_no:'number',article_desc:'char',article_uom:'char',label:''},
	this.header_row_type = {article_no:'main',article_desc:'main',article_uom:'main',label:''},
	this.header_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_no:'centerValue',article_desc:'',article_uom:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',article_uom:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
	this.cont_data_function = {article_no:showArticleNumberStockAdjReport};
}
var showArticleNumberStockAdjReport = function(obj){	
		 return '<label std_sell_price="'+obj.standard_sell_price+'">'+obj.article_no+'</label>'; 
	
};

function tblConfArticleForStkAdjReportST(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	
	this.option = 'build';
	this.key = ['article_number','article_description','label'];
	this.table_name = 'article_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchArticleCount">'+data.length+'</strong> articles found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {article_number:'Article',article_description:'Description',uom:'Uom',label:'Select'},
	this.header_data_type = {article_number:'number',article_description:'char',uom:'char',label:''},
	this.header_row_type = {article_number:'main',article_description:'main',uom:'main',label:''},
	this.header_class = {article_number:'centerValue',article_description:'',uom:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {article_number:'centerValue',article_description:'',uom:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {article_number:'removeNull',article_description:'removeNull',uom:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
	this.cont_data_function = {article_number:showArticleNumberStockAdjReportST};
}
var showArticleNumberStockAdjReportST = function(obj){	
		 return '<label std_sell_price="'+obj.sell_price+'">'+obj.article_number+'</label>'; 
	
};

function tblConfOrderSearchForStkAdj(searchtext,data,option,onArticleTrClick,onArticleTdCheck){
	
	this.option = 'build';
	this.key = ['order_no','seg_no','received_date_t','supplier_name','label'];
	this.table_name = 'order_search_result';
	this.table_class = ' ContentTable';
	this.table_title = 'Total <strong id="searchOrderCount">'+data.length+'</strong> orders found for <strong class="searchString">\''+searchtext+'\'</strong>';
	this.header_name = {seg_no:'Segment Number',order_no:'Order Number',received_date_t:'Received Date',supplier_name:'Supplier',label:'Select'},
	this.header_data_type = {seg_no:'number',order_no:'char',received_date_t:'date',supplier_name:'number',label:''},
	this.header_row_type = {seg_no:'main',order_no:'main',received_date_t:'main',supplier_name:'main',label:''},
	this.header_class = {seg_no:'centerValue',order_no:'centerValue',received_date_t:'centerValue',supplier_name:'centerValue',label:'lastColumn centerValue'},
	this.header_title = {},
	this.header_width = {},
	this.content_class = {seg_no:'centerValue',order_no:'centerValue',received_date_t:'centerValue',supplier_name:'centerValue',label:'lastColumn centerValue'},
	this.content_title = {},
	this.content_format = {seg_no:'removeNull',order_no:'removeNull',received_date_t:'removeNull',supplier_name:'removeNull',label:''},
	this.content_width =  {},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=true;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.cont_data_function = {order_no:showStockAdjOrderNumber,received_date_t:showNewDateFormat};
	this.cont_sort_function = {received_date_t:getNewDateFormat};
	if(option == checkboxOption){
		this.content_td_addon = {label:{'input':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<input type="checkbox" name="articlecheckbox">'};
	}else{
		this.content_td_addon = {label:{'.selectItem':{event:{click : onArticleTdCheck},display: retainCheck}}};
		this.content_label = {label:'<label class="linkBtn linkBtn1" id="0"><label class="selectItem">Select</label></label>'};
	}
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' ',received_date_t: 'Received Date'};
}
var showStockAdjOrderNumber = function(obj){	
		 return '<label dispatched_qty="'+obj.dispatched_qty+'" dispatched_qty_uom="'+obj.dispatched_qty_uom+'" dispatched_om="'+obj.dispatched_om+'">'+obj.order_no+'</label>'; 	
};
 
var showNewDateFormat = function(obj) {
	var newDate = '';
	var received_date=obj.received_date;
	if (received_date != null && received_date != '' && received_date != undefined) {
		if(received_date.split('/').length > 2){
			newDate = received_date.split('/')[1] + '/' + received_date.split('/')[0] + '/'
					+ received_date.split('/')[2];
		}
		obj.received_date_t = newDate;
	}
	return newDate;
}; 
var getNewDateFormat = function(){
	return "received_date_m"
}
function retainCheck($elem,obj){
	(obj.checked!= undefined && obj.checked==true) ? $elem.prop('checked',true) :$elem.prop('checked',false);
}

function buildCustomMsg(codeList){
	var msgcode ='';
	var finalMsg = [];
	for(var i = 0;i< codeList.length;i++){
		msgcode = codeList[i];
		if(typeof  msgcode =='object'){
			finalMsg.push(frameMobiMsg(mobiSerErrMsg));
		}else if(msgcode == mobiSerErrCode){
			finalMsg.push(mobiSerErrMsg);
		}else if(msgcode == scsSerErrCode){
			finalMsg.push(scsSerErrMsg);
		}else if(msgcode == repSerErrCode){
			finalMsg.push(repSerErrMsg);
		}else if(msgcode == sapSerErrCode){
			finalMsg.push(sapSerErrMsg);
		}else if(msgcode == ngboSessErrCode){
			finalMsg.push(ngboSessErrMsg);
		}else{
			finalMsg.push('<li>'+ msgcode +'</li>');
		}
	}
	return finalMsg.join('');
}

function frameMobiMsg(obj){
	var error='';
	if(obj != undefined && obj != null && obj.Parameter1 != undefined){
		error = ('Technical issue occured in SQLA, while calling the service <strong>'+obj.Parameter1+'</strong>, Reason for failure <Strong>'+(obj.Parameter3!=null && obj.Parameter3!=undefined ? obj.Parameter3 : (obj.ErrorID!=undefined && obj.ErrorID!='' ? obj.ErrorID : 'SQLA'))+'</storng> ');
	}
	return error;
}
function addtooltip(obj, msg) {
	obj.addClass('tooltip').attr('title', msg);
}

function removetooltip(obj, msg) {
	obj.removeClass(errorFieldClass);
	obj.removeClass('tooltip').removeAttr('title');
}

function hasDecimalPlace(value, x) {
	var pointIndex = value.indexOf('.');
	return pointIndex >= 0 && pointIndex < value.length - x;
}
function toMobilinkDate(date) {
	var dd = date.split("/")[0];
	var mm = date.split("/")[1];
	var yy = date.split("/")[2];
	return yy + '-' + mm + '-' + dd;
}

function fromMobilinkDate(date) {
	var dd = date.split("-")[2];
	var mm = date.split("-")[1];
	var yy = date.split("-")[0];
	return dd + '/' + mm + '/' + yy;
}

function bindArticleSuggest(elem) {
	elem.autocomplete({
		source : function(request, response) {
			var param = {
				ARTICLE_INFO : request.term,
				AUTOSTOCK_IND : "N"
			};
			$.post(searchArticleURL, JSON.stringify(param), function(data) {
				if (data != '') {
					response($.map(data.slice(0, maxAutoListSize), function(
							item) {
						return {
							value : item.MATNR + '-' + item.MEINS + '-'
									+ item.MATKX,
							text : item.MATNR + '-' + item.MEINS + '-'
									+ item.MATKX
						};
					}));
				}
			});

		},
		select : function(event, ui) {

			$(':hidden[id=hdnmedicineid]').val(ui.item.text.toString());
			$(':hidden[id=hdnmedicinenm]').val(ui.item.value.toString());

		},
		minLength : 1,
		autoFocus : true
	});
}

// used to group by key element
var $groupBy = function(array, predicate) {
	var grouped = {};
	for ( var i = 0; i < array.length; i++) {
		var groupKey = predicate(array[i]);
		if (typeof (grouped[groupKey]) === "undefined")
			grouped[groupKey] = [];
		grouped[groupKey].push(array[i]);
	}

	return grouped;
};

var currDate = function(){
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	var presentDate = '';
	
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	return presentDate;
};

var getDesiredFutureDate = function(count) {
	var desiredDate = '';
	var thatDay = new Date(new Date().getTime() + 86400000 * count);
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

function getDesiredPastDate(count) {
	var desiredDate = '';
	var thatDay = new Date(new Date().getTime() - 86400000 * count);
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
function increaseNumberOfDays(date, count) {
	var desiredDate = '';
	var thatDay = new Date(getDate(date).getTime() + 86400000 * count);
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

function createAutoSuggest(elem,elemToBeTriggered) {
	// code for article auto suggest in the text box
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							var maxAutoListSize = 10;

							var param = {
								iv_article : request.term,
								iv_auto_stockr_flag : 'N',
								iv_ranged : 'Y',
								iv_session_id : ''
							};
							//changed search length 2 as 3 for better performance
							if (request.term.length == 3) {
								console.log(getarticleguggestions + ' '
										+ JSON.stringify(param));
								// $.ajaxSetup({async: false});
								
								$
										.post(
												getarticleguggestions,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {																								// auto validation
																			if(item.article_no != undefined || item.article_no !=undefined && item.article_desc != undefined){
																			return {
																				
																				value : item.article_no
																						+ '-'
																						// +
																						// item.article_uom
																						// +
																						// '-'
																						+ item.article_desc,
																				text : item.article_no
																						+ '-'
																						+ item.article_desc
																				};}
																		}));
													}
												});
							
								// $.ajaxSetup({async: true});
							} else {
								setTimeout(function(){	
								if (suggestionList != null
										&& suggestionList != undefined && suggestionList.length >0) {
									
									response(sliceFilteredList(request,
											suggestionList, maxAutoListSize));
								}
								},50);
							}

						},
						select : function(event, ui) {

							$(':hidden[id=hdnmedicineid]').val(
									ui.item.text.toString());
							$(':hidden[id=hdnmedicinenm]').val(
									ui.item.value.toString());
							if(elemToBeTriggered != undefined)
								{
							setTimeout(function(){
							$(elemToBeTriggered).trigger('click');
							},10);
								}
						},
						minLength : 2,
						autoFocus : true
					});

}

function createAutoSuggest(elem, elemToBeTriggered,maxAutoListSize) {
	  // code for article auto suggest in the text box
	 var maxAutoListSize = 10;
	 var param = {};
	  $(elem)
	    .autocomplete({
	      delay: 0,
	      source: function(request, response) {
	    	param = {iv_article: request.term, iv_auto_stockR: 'N', iv_ranged: 'Y',  iv_session_id: '', iv_auto_stockr_flag: ''};
	    	//changed search length 2 as 3 for better perfomance
	        if (request.term.length == 3) {
	          console.log(getarticleguggestions + ' ' + JSON.stringify(param));
	          // $.ajaxSetup({async: false});
	          $.post(getarticleguggestions, JSON.stringify(param), function(data) {
	            if (data != '') {
	              suggestionList = data;
	              response($.map(data.slice(0, maxAutoListSize), function(item) {
	            	  if(item.article_no != undefined || item.article_no !=undefined && item.article_desc != undefined){
						             return {
	                	
	                  value: item.article_no + '-' + item.article_desc,
	                  text: item.article_no + '-' + item.article_desc
	                };}
	              }));
	            }
	          });
	        } else {
	          setTimeout(function() {
	            if (suggestionList != null && suggestionList != undefined && suggestionList.length > 0) {
	              response(sliceFilteredList(request, suggestionList, maxAutoListSize));
	            }
	          }, 50);
	        }
	      },
	      select: function(event, ui) {
	        $(':hidden[id=hdnmedicineid]')
	          .val(ui.item.text.toString());
	        $(':hidden[id=hdnmedicinenm]')
	          .val(ui.item.value.toString());
	        if (elemToBeTriggered != undefined) {
	          setTimeout(function() {
	            $(elemToBeTriggered)
	              .trigger('click');
	          }, 10);
	        }
	      },
	      minLength: 2,
	      autoFocus: true
	    });
}
var orderSmartCache =[];
var vendorSmartCache =[];

var orderResult = function(item) {
   return {value: item.order_no, text: item.order_no};
};

var vendorResult = function(item) {
	return {value: item.supplier_no + '-' + item.supplier_name, text: item.supplier_no + '-' + item.supplier_name};
};

var articleResult = function(item) {
	 var desc = trimNull(item.article_desc);
	 return {value: item.article_no + '-' + desc, text: item.article_no + '-' + desc };
};

var trimNull = function(data){
	return (data == null || data == undefined) ? '' : data.replace(/\s+/g, " ");
};

function callOrderSmartService(url,param,text,size,searchCat,response){
	console.log('text ='+text+' url = '+url+' param =' + JSON.stringify(param));
    $.post(url, JSON.stringify(param), function(data) {
      if (data != '') {
    	orderSmartCache = data;
        response(filterOrderSmartList(text,data,size,searchCat));
      }
    });
}

function callVendorSmartService(url,param,text,size,searchCat,response){
	console.log('text ='+text+' url = '+url+' param =' + JSON.stringify(param));
    $.post(url, JSON.stringify(param), function(data) {
      if (data != '') {
    	vendorSmartCache = data;
        response(filterVendorSmartList(text,data,size,searchCat));
      }
    });
}

function showOrderSmartCache(text,size,searchCat,response){
	setTimeout(function() {
    if (orderSmartCache != null && orderSmartCache != undefined && orderSmartCache.length > 0) {
        response(filterOrderSmartList(text,orderSmartCache, size,searchCat));
      }
    }, 50);
}

function showVendorSmartCache(text,size,searchCat,response){
	setTimeout(function() {
    if (vendorSmartCache != null && vendorSmartCache != undefined && vendorSmartCache.length > 0) {
        response(filterVendorSmartList(text,vendorSmartCache, size,searchCat));
      }
    }, 50);
}

function filterOrderSmartList(text,list, size,searchCat) {
	var searchTerm = '';
	var filteredList = [];
	filteredList = $.map(list, function(item) {
		  searchTerm = searchCat != order ? (item.article_no + item.article_desc) : (item.order_no) ;
		  if (searchTerm.indexOf(text)>-1){ 
			  if(searchCat == order){return orderResult(item);}else{return articleResult(item);}
		  }
	});
	return filteredList.slice(0,size);
}

function filterVendorSmartList(text,list, size,searchCat) {
	var searchTerm = '';
	var filteredList = [];
	filteredList = $.map(list, function(item) {
		  searchTerm = (item.supplier_no + item.supplier_name);
		  if ((searchTerm||'').toLowerCase().indexOf(text)>-1){ 
			 return vendorResult(item);
		  }
	});
	return filteredList.slice(0,size);
}

function callOrderNumberSearch(searchText,size,searchCat,response){
	var param ={};
	var url = '';
	if(searchCat == order){
		url = getSmartOrderNumbers ;
	}else{
		url = getarticleguggestions ;
	}
	param = {iv_search_text : searchText, iv_user_id:'', iv_session_id:'',iv_article: searchText, iv_auto_stockR: 'N', iv_ranged: 'Y',iv_auto_stockr_flag: ''};
    if (searchText.length == 3) {
    	callOrderSmartService(url,param,searchText,size,searchCat,response);
    } else {
    	showOrderSmartCache(searchText,size,searchCat,response);
    }
};

function callVendorNumberSearch(searchText,size,searchCat,response){
	var param ={};
	var url = '';
	/*if(searchCat == order){
		url = getSmartOrderNumbers ;
	}else{*/
		url = getSupplierSuggestionsLookupUrl ;
	/*}*/
	param = {iv_vendor : searchText, iv_sales_org : $('#salesOrg').val()};
    if (searchText.length == 2) {
    	callVendorSmartService(url,param,searchText,size,searchCat,response);
    } else {
    	showVendorSmartCache(searchText,size,searchCat,response);
    }
};

function triggerClick($elem,elemToBeTriggered){
    if (elemToBeTriggered != undefined) {
      setTimeout(function() { 
    	  $(elemToBeTriggered).trigger('click');
      }, 100);
    }
}
var orderSmart = function triggAutoSuggForOrders($elem,elemToBeTriggered,searchCat,maxAutoListSize,trigger) {
	if(maxAutoListSize==undefined || maxAutoListSize == '' || maxAutoListSize== null){
		maxAutoListSize = 10;
	}
	if($elem.hasClass('ui-autocomplete-input')){
		$elem.autocomplete('destroy');
	}
	  $elem.autocomplete({
	      delay: 0,
	      source: function(request, response) {
	    	  callOrderNumberSearch(request.term,maxAutoListSize,searchCat,response);
	      },
	      select: function(event, ui) {
			if(trigger== true){
				triggerClick($elem,elemToBeTriggered);
			 }
	      },
	      minLength: 2,
	      autoFocus: true
	    });
};

var vendorSmart = function triggAutoSuggForVendor($elem,elemToBeTriggered,searchCat,maxAutoListSize,trigger) {
	if(maxAutoListSize==undefined || maxAutoListSize == '' || maxAutoListSize== null){
		maxAutoListSize = 10;
	}
	if($elem.hasClass('ui-autocomplete-input')){
		$elem.autocomplete('destroy');
	}
	  $elem.autocomplete({
	      delay: 0,
	      source: function(request, response) {
	    	  callVendorNumberSearch(request.term,maxAutoListSize,searchCat,response);
	      },
	      select: function(event, ui) {
			if(trigger== true){
				//triggerClick($elem,elemToBeTriggered);
			 }
	      },
	      minLength: 2,
	      autoFocus: true
	    });
};

var getConfTblHead = function(confObj){
	var $cont ='';
	var subCont ='';
	var tableId = confObj.table_name;
	var addArticle = confObj['add_option'];
	var filter = confObj.filter;
	var groupBy = confObj.groupby;
	var def_opt = (confObj.default_groupbyColumn!=undefined && confObj.default_groupbyColumn.length> 0 );
	
	var def_grp_col = '';
	if(def_opt){
		def_grp_col = confObj.default_groupbyColumn[0];
	}
	var content ='<div class="tableActionsBtnsWrapper" id="action_btn_wrap_'+tableId+'"><div class="lookupActionWrapper">';
	if(addArticle){
		content += '<label class="linkBtn addActionBtn hideBlock" id="add_art_link_btn_'+tableId+'" onclick="$(\'#add_table_'+tableId+'\').toggleClass(\'hideBlock\');$(\'#add_article_input_'+tableId+'\').focus();"><a><label class="addRow">Add Article</label></a></label>';
		subCont += getAddArtSubCont(tableId);
	}
	if(filter){
		content += '<label class="linkBtn" id="add_filter_link_btn_'+tableId+'"><label class="filter">Filters</label></label><label class="linkBtn hideBlock" id="clr_filter_link_btn_'+tableId+'"><label class="negativeFlag">Clear Filters</label></label>';
		subCont += getFilterSubCont(tableId);
	}
	if(groupBy){
		content += '<label class="linkBtn groupByOpen '+(def_opt ? 'hideBlock' :'' )+'" id="add_grp_link_btn_'+tableId+'"><a><label class="group">Group By</label></a></label><label class="linkBtn groupByClear '+(def_opt ? '' :'hideBlock' )+'" id="clr_grp_link_btn_'+tableId+'"><a><label class="negativeFlag">Clear Group By</label></a></label>';
		subCont += getGrpBySubCont(tableId,confObj,def_opt,def_grp_col);
	}

	content  += '<div class="errorDiv hideBlock"><label></label><label class="closeMessage">&nbsp;</label></div>';
	content  += '</div></div>';
	
	$cont = $(content+ subCont);
	if(addArticle){
		bindAddArticleCont($cont, tableId,confObj);
	}
	return $cont;
};

var applyTblFilter = function(e){
	var $tbl =  e.data.table; 
	var tableId = e.data.tableId;
	var confObj = e.data.confObj;
	$tbl.find('#clr_filter_link_btn_'+tableId).removeClass('hideBlock');
	$tbl.find('#add_filter_link_btn_'+tableId).addClass('hideBlock');
	$tbl.find('#filter_head_'+tableId).removeClass('hideBlock');
	$.fn.showInformationMsg();
};

var clearTblFilter = function(e){
	var $tbl =  e.data.table; 
	var tableId = e.data.tableId;
	var confObj = e.data.confObj;
	var default_groupbyColumn = confObj.cur_gru_col;
	confObj.applyFilter = false;
	$tbl.find('#add_filter_link_btn_'+tableId).removeClass('hideBlock');
	$tbl.find('#clr_filter_link_btn_'+tableId).addClass('hideBlock');
	$tbl.find('#filter_head_'+tableId).addClass('hideBlock').find('input').val('');
	if(confObj.applyGroup && default_groupbyColumn!=undefined){
		$.tablebuild.groupContObj(confObj,[default_groupbyColumn],confObj.content);
	}
	$.tablebuild.tableTrigger($tbl.find('table'));
	if(confObj.pagination == true){
		confObj.curr_page = 1;
		$.tablebuild.initPage(confObj,confObj.contHold);
	}
};

var bindAddArticleCont =function($cont, tableId,confObj){
	var contObj = $('#order_detail').data('contObj');
	var hdrObj = contObj.hdrObj;
	orderSmart($cont.find('#add_article_input_'+tableId),$cont.find('#search_and_add_btn_'+tableId),article,10,false);
	$cont.find('#src_vn_drop_dwn_'+tableId).html($('#warehouseDrpdwn').html());
	$cont.find('#src_vn_cont_'+tableId).find('.advancedSearch').unbind('click').bind('click',{msg:tableId,cacheElem:$('#s'),inputElem:('#src_vn_cont_'+tableId+' input')},function(e){
		var elem =$(e.data.inputElem);
		getVendorLookup(elem.val().split('-')[0],elem,e.data.cacheElem,'');
	});
	$cont.find('#search_and_add_btn_'+tableId).unbind('click').bind('click',{hdrObj:hdrObj,elem:('#add_table_'+tableId),tableId:tableId},genArticleSearch);
	$cont.find('#add_qty_'+tableId).bind('keypress',onlyNumber);
	  if(isSTO(hdrObj.order_type)){
		  $cont.find('#src_all_radio_'+tableId+',#src_wh_radio_'+tableId+',#src_vn_radio_'+tableId).attr('disabled',true);
		  $cont.find('#src_wh_radio_'+tableId).attr('checked',true);
		  $cont.find('#src_wh_cont_'+tableId).removeClass('hideBlock').find('select').val(hdrObj.supplier_no).attr('disabled',true);
		  $cont.find("#src_all_cont_"+tableId).addClass('hideBlock');
		  $cont.find("#src_vn_cont_"+tableId).addClass('hideBlock');
	  }else if(isPO(hdrObj.order_type)){
		  $cont.find('#src_all_radio_'+tableId+',#src_wh_radio_'+tableId+',#src_vn_radio_'+tableId).attr('disabled',true);
		  $cont.find('#src_vn_radio_'+tableId).attr('checked',true);
		  $cont.find('#src_vn_cont_'+tableId).find('input').val(hdrObj.supplier_no+'-'+hdrObj.supplier_name).attr('readonly',true);
		  $cont.find('#src_vn_cont_'+tableId).removeClass('hideBlock').find('.advancedSearch').unbind('click'); 
		  $cont.find("#src_wh_cont_"+tableId).addClass('hideBlock');
		  $cont.find("#src_all_cont_"+tableId).addClass('hideBlock');
	  }else{
		$cont.find('#src_wh_radio_open_item_tab').unbind('click').bind('click',{msg:tableId,elem:$cont},function(e){
			var $elem = e.data.elem;
			var tableId =e.data.msg;
			  $elem.find("#src_wh_cont_"+tableId).removeClass('hideBlock');
			  $elem.find("#src_all_cont_"+tableId).addClass('hideBlock');
			  $elem.find("#src_vn_cont_"+tableId).addClass('hideBlock').find('input').val('');
			});
		  $cont.find('#src_vn_radio_open_item_tab').unbind('click').bind('click',{msg:tableId,elem:$cont},function(e){
			var $elem = e.data.elem;
			var tableId =e.data.msg;
			  $elem.find("#src_wh_cont_"+tableId).addClass('hideBlock').find('select').val('');;
			  $elem.find("#src_vn_cont_"+tableId).removeClass('hideBlock').find('input').focus();
			  $elem.find("#src_all_cont_"+tableId).addClass('hideBlock');
			});
		  $cont.find('#src_all_radio_open_item_tab').unbind('click').bind('click',{msg:tableId,elem:$cont},function(e){
			var $elem = e.data.elem;
			var tableId =e.data.msg;
			  $elem.find("#src_wh_cont_"+tableId).addClass('hideBlock').find('select').val('');
			  $elem.find("#src_vn_cont_"+tableId).addClass('hideBlock').find('input').val('');
			  $elem.find("#src_all_cont_"+tableId).removeClass('hideBlock');
			});
	  }
};

var getAddArtSubCont = function(tableId){
	var cont ='<div class="tableActionsWrapper hideBlock" id="add_table_'+tableId+'">'
		+'<div class="formWrapper">'
		+'<div class="parameter"><label class="" for="searchBox">Article</label><input type="#"  tabindex="1" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="add_article_input_'+tableId+'"></div>'
		+'<div class="parameter"><label class="" for="qty">Order Qty.</label><input type="#"  maxlength="16" tabindex="2" id="add_qty_'+tableId+'" class="textbox  numberBox"></div>'
		//+'<div class="parameter"><label class="" for="delDate">Delivery Date</label><input type="#" class="textbox textboxDefaultText inputDate" placeholder="dd/mm/yyyy" id="delDate"></div>'
		+'<div class="parameter"><label for="sourceOfSupply" class="">Source of Supply</label><input type="radio" name="sourceSupply" value="all" id="src_all_radio_'+tableId+'" checked="" tabindex="3"><label for="src_all_radio_'+tableId+'" class="labelText">All</label><input type="radio" name="sourceSupply" value="warehouse" id="src_wh_radio_'+tableId+'" tabindex="4"><label for="src_wh_radio_'+tableId+'" class="labelText">Warehouse</label><input type="radio" name="sourceSupply" value="vendor" id="src_vn_radio_'+tableId+'" tabindex="5"><label for="src_vn_radio_'+tableId+'" class="labelText">Direct Vendor</label>'
		+'<div class="parameter supplierSource"><span id="src_all_cont_'+tableId+'" class="options"><label>Both warehouse and direct vendor</label></span><span id="src_vn_cont_'+tableId+'" class="hideBlock"><input type="#" class="textbox mediumbox" placeholder="Type number or name "><label class="linkBtn" id="src_vn_verify_btn_'+tableId+'"><label class="advancedSearch">Verify</label></label></span><span id="src_wh_cont_'+tableId+'" class="hideBlock"><select class="selectOptions supplyDrop" id="src_vn_drop_dwn_'+tableId+'"></select></span></div></div>'
		+'<div class="formActions"><label class="actionBtn" id="search_and_add_btn_'+tableId+'"><a>Search &amp; Add</a></label><label onclick="$(\'#add_table_'+tableId+'\').addClass(\'hideBlock\');" class="secondaryActionBtn closeLink" id="close_btn_'+tableId+'"><a>Close</a></label></div>'
		+'</div></div>';
	return cont;
};

var getFilterSubCont = function(tableId){
	return '';
};

var getGrpBySubCont = function(tableId,confObj,def_opt,def_grp_col){
	var groupbyColumn= confObj.groupbyColumn;
	var cont = '<div class="tableActionsWrapper group_cont_table '+(def_opt ? '' :' hideBlock ' )+'" id="grou_cont_'+confObj.table_name+'"><div class="formWrapper"><div class="parameter">';
        cont+= '<label for="" class="">Group By</label>';
    var k =0;
		if(groupbyColumn!=undefined){
			for(key in groupbyColumn){
				cont+='<input data_key="'+key+'" type="radio" class="groupbyColumns userOption"  '+((def_opt && def_grp_col == key) ? ' checked ' : (((!def_opt) && (k == 0)) ? ' checked ' : ''))+'id="'+confObj.table_name+'_'+key+'_'+'_grp_radio" value="user" name="groupByOptions">'
				  +'<label class="labelText userOption"  for="'+confObj.table_name+'_'+key+'_'+'_grp_radio">'+groupbyColumn[key]+'</label>';
			}
		}
     cont+='</div></div></div>';
	return cont;
};
var addGrpBtn = function($hold,tableId){
	$hold.find('#clr_grp_link_btn_'+tableId).removeClass('hideBlock');
	$hold.find('#add_grp_link_btn_'+tableId).addClass('hideBlock');
	$hold.find('#grou_cont_'+tableId).removeClass('hideBlock');
};
var removeGrpBtn = function($hold,tableId){
	$hold.find('#clr_grp_link_btn_'+tableId).addClass('hideBlock');
	$hold.find('#add_grp_link_btn_'+tableId).removeClass('hideBlock');
	$hold.find('#grou_cont_'+tableId).addClass('hideBlock');
};
var applyGroupBy = function(e){
	var $hold =  e.data.table; 
	var tableId = e.data.tableId;
	var confObj = e.data.confObj;
	var $tbl =  $hold.find('#'+confObj.table_name+'_table');
	var default_groupbyColumn = confObj['default_groupbyColumn'];
	confObj.applyGroup = true;
	addGrpBtn($hold,tableId);
	if(default_groupbyColumn ==undefined && default_groupbyColumn.length ==0){
		default_groupbyColumn =Object.keys(confObj.groupbyColumn)[0];
	}else{
		$hold.find('#grou_cont_'+tableId).find("input[data_key='"+default_groupbyColumn[0]+"']").prop("checked",true);
	}
	var isFilter = ((confObj.applyFilter||'') != '' && confObj.applyFilter == true);
	var cont =  isFilter  ? confObj.filterCont : confObj.content;
	$.tablebuild.groupContObj(confObj,default_groupbyColumn,cont);
	$.tablebuild.tableTrigger($tbl);
	confObj.group_done!= undefined && confObj.group_done!= '' ? confObj.group_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl) :'';
};
var removeGroupBy = function(e){
	var $hold =  e.data.table; 
	var tableId = e.data.tableId;
	var confObj = e.data.confObj;
	$tbl = $hold.find('#'+confObj.table_name+'_table');
	confObj.applyGroup = false;
	removeGrpBtn($hold,tableId);
	$.tablebuild.tableTrigger($tbl);
	confObj.group_done!= undefined && confObj.group_done!= '' ? confObj.group_done($tbl.find('#thead_'+confObj.table_name+' tr'),$tbl) :'';
};
function isValidTime(elem) {
	if ($(elem).val().split(':')[1] == undefined) {
		$(elem).val($(elem).val().split(':')[0] + ':00');
	}

	var hour = Number($(elem).val().split(':')[0]);
	var min = Number($(elem).val().split(':')[1]);

	if (isNaN(hour) || Number(hour) > 23 || isNaN(min) || Number(min) > 55) {
		return false;
	} else {
		return true;
	}
}
function formatDateMobi(date) {
	var newDate = '';
	if (date != null && date != '' && date != undefined) {
		if(date.split('/').length > 2){
			newDate = date.split('/')[1] + '/' + date.split('/')[0] + '/'
					+ date.split('/')[2];
		}
	}
	return newDate;
}
function formatDateMobiDelimiter(date,delimiter) {
	var newDate = '';
	if (date != null && date != '' && date != undefined) {
		if(date.split('/').length > 2){
			newDate = date.split('/')[1] + delimiter + date.split('/')[0] + delimiter
					+ date.split('/')[2];
		}
	}
	return newDate;
}
function formatDateToMDY(toBeChanged) {
	var newDate = toBeChanged.split('/');
	var changedDate = newDate[1] + '/' + newDate[0] + '/' + newDate[2];
	return changedDate;
}
function convertDateToString(someDate) {
	var dd = someDate.getDate();
	var mm = someDate.getMonth() + 1;
	var y = someDate.getFullYear();
	return (dd<10?'0'+dd:dd)+"/"+(mm<10?'0'+mm:mm)+"/"+y;
}
function n(n) {
	return n > 9 ? "" + n : "0" + n;
}

$.fn.temperatureChk = function() {
	this.each(function() {
		$(this).keypress(
				function(e) {
					var el = $(this).get(0);
					var pos = '0';
					
					if (el.selectionStart || el.selectionStart == '0')
		                pos = el.selectionStart;
					
					// '-' (minus) can only be in first position
					if (Number(pos) != 0 && e.which == 45) {
						return false;
					}
					
					// '-' and '.' are given next to each other then dont allow
					
					if(($(this).val().indexOf(
					'-') != -1) && ($(this).val().indexOf(
					'-') == 0) && (e.which == 46) && ($(this).val().length == 1))
						{
						return false;
						}
					// if the letter is not digit then
					// don't type anything
					if (e.which != 45 && e.which != 8 && e.which != 0
							&& (e.which < 48 || e.which > 57) && (e.which != 46 || $(this).val().indexOf(
							'.') != -1)) {
						return false;
					}
				});
	});

};
function formConfObjForTabs(){
	this.option = '';
	this.key = '';
	this.table_name = '';
	this.table_title = '';
	this.header_name = '';
	this.header_data_type = '';
	this.header_row_type = '';
	this.header_class ='';
	this.header_title = '';
	this.header_width = '';
	this.content_class = '';
	this.content_title = '';
	this.content_format = '';
	this.content_width =  '';
	this.content =  '';
	this.pagination = '';
	this.groupby= '';
	this.recordPerPage= '';
	this.groupbyColumn ='';
	this.filter= '';
	this.curr_page= '';
	this.sort='';
	this.content_bind_event = '';
	this.content_tr_addon = '';
	this.content_td_addon = '';
}
function sliceFilteredList(request, suggestionList, maxAutoListSize) {
	var filteredList = $.map(suggestionList, function(item) {
		// Defect
		// 257
		if ((item.article_no).indexOf(request.term) > -1
				|| ((item.article_desc).toLowerCase()).indexOf((request.term)
						.toLowerCase()) > -1)
			return {
				value : item.article_no + '-'
				// +
				// item.article_uom
				// +
				// '-'
				+ item.article_desc,
				text : item.article_no + '-' + item.article_desc
			};
	});

	return filteredList.slice(0, maxAutoListSize);
}
function sentenceCase(str)
{
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function liesBetweenDateRange(dateFrom,dateTo,dateCheck)
{

	var d1 = dateFrom.split("/");
	var d2 = dateTo.split("/");
	var c = dateCheck.split("/");

	var from = new Date(d1[2], d1[1]-1, d1[0]);  // -1 because months are from 0 to 11
	var to   = new Date(d2[2], d2[1]-1, d2[0]);
	var check = new Date(c[2], c[1]-1, c[0]);

	return (check >= from && check <= to);
}
function isEmptyMap(obj) {
	  for (var o in obj) if (o) return false;
	  return true;
}
function getSelectionStart(o) {
    var el = $(o).get(0);
    var pos = 0;
    if('selectionStart' in el) {
        pos = el.selectionStart;
    } else if('selection' in document) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    return pos;
}

function getUniqueList(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1)
			result.push(e);
	});
	return result;
}

//newly added
$.fn.eachval = function() {
	var result=[];
	this.each(function() {
		result.push($(this).val());
	});
	return result;
};
$.fn.eachlabelval = function() {
	var result=[];
	this.each(function() {
		result.push($(this).find('label').text());
	});
	return result;
};

function createSupplierAutoSuggest(elem,elemToBeTriggered) {
	// code for supplier auto suggest in the text box
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							var maxAutoListSize = 10;

							var param = {
								iv_vendor : request.term,
								iv_sales_org : $('#salesOrg').val()
							};
							//changed search length 2 as 3 for better perfomance
							if (request.term.length == 3) {
								console.log(getSupplierSuggestionsUrl + ' '
										+ JSON.stringify(param));
								// $.ajaxSetup({async: false});
								
								$
										.post(
												getSupplierSuggestionsUrl,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			return {
																				value : item.supplier_no
																						+ '-'
																						// +
																						// item.article_uom
																						// +
																						// '-'
																						+ item.supplier_name,
																				text : item.supplier_no
																						+ '-'
																						+ item.supplier_name
																			};
																		}));
													}
												});
							
								// $.ajaxSetup({async: true});
							} else {
								setTimeout(function(){	
								if (suggestionList != null
										&& suggestionList != undefined && suggestionList.length >0) {
									
									response(sliceFilteredVendorList(request,
											suggestionList, maxAutoListSize));
								}
								},50);
							}

						},
						select : function(event, ui) {

							$(':hidden[id=hdnmedicineid]').val(
									ui.item.text.toString());
							$(':hidden[id=hdnmedicinenm]').val(
									ui.item.value.toString());
							if(elemToBeTriggered != undefined)
								{
							setTimeout(function(){
							$(elemToBeTriggered).trigger('click');
							},10);
								}
						},
						minLength : 2,
						autoFocus : true
					});

}

function downloadDGReportPDF(){
	
	window.open('../dgReport/printReportDGPDF.htm?host='+host+'&port='+port,'_blank');
} 
	/*var obj ={};
	$.ajax({
		url: "../dgReport/printReportDGPDF.htm?host="+host+'&port='+port,
		type: "GET",
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
			$('#inventoryReportForm').attr("action", "downloadInventoryReportPdf.pdf");
			$('#inventoryReportForm').attr('target','_blank');
			$('#inventoryReportForm').attr('method','get');
			$('#inventoryReportForm').submit();
			window.open('../dgReport/downloadDGReportPdf.pdf');
			stopLoading();
			}else if(response.data == 'noData'){
				stopLoading();
				$.fn.showCustomMsg(['Sorry, No records found.'],success,'DG Report');
			}
		//console.log("success");
		},
		error: function(xhr, textStatus, errorThrown){
		console.log('request failed'+errorThrown);
		}
		});*/

/*function downloadStockFillReportPDF(){
	window.open( "" + '../stockFillReport/printReportStockFillPDF.htm' );
	var obj ={};
	$.ajax({
		url: "../stockFillReport/printReportStockFillPDF.htm",
		type: "GET",
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
			$('#inventoryReportForm').attr("action", "downloadInventoryReportPdf.pdf");
			$('#inventoryReportForm').attr('target','_blank');
			$('#inventoryReportForm').attr('method','get');
			$('#inventoryReportForm').submit();
	
			//window.open('../stockFillReport/downloadStockFillReportPdf.pdf');
			
			stopLoading();
			
			
			}else if(response.data == 'noData'){
				stopLoading();
				$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stock Fill Report');
			}
		//console.log("success");
		},
		error: function(xhr, textStatus, errorThrown){
		console.log('request failed'+errorThrown);
		}
		});
}*/


function downloadStockFillReportPDF(){
window.open('../stockFillReport/printReportStockFillPDF.htm' ,'_blank');
}

function sliceFilteredVendorList(request, suggestionList, maxAutoListSize) {
	var filteredList = $.map(suggestionList, function(item) {
		// Defect
		// 257
		if ((item.supplier_no).indexOf(request.term) > -1
				|| ((item.supplier_name).toLowerCase()).indexOf((request.term)
						.toLowerCase()) > -1)
			return {
				value : item.supplier_no + '-'
				// +
				// item.article_uom
				// +
				// '-'
				+ item.supplier_name,
				text : item.supplier_no + '-' + item.supplier_name
			};
	});

	return filteredList.slice(0, maxAutoListSize);
}

function createCarrierAutoSuggest(elem,elemToBeTriggered) {
	// code for Carrier auto suggest in the text box
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							var maxAutoListSize = 10;

							var param = {
									   iv_user_id: "100046",
									   iv_pwd: "",
									   iv_session_id: "111",
									   iv_site_no: $('#posSite').val(),
									   iv_carr_no: request.term,
									   iv_sales_org: $('#salesOrg').val()
							};
							//changed search length 2 as 3 for better perfomance
							if (request.term.length == 3) {
								console.log(getCarrierSuggestionsUrl + ' '
										+ JSON.stringify(param));
								// $.ajaxSetup({async: false});
								
								$
										.post(
												getCarrierSuggestionsUrl,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														carrSuggList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			return {
																				value : item.carr_no
																						+ '-'
																						// +
																						// item.article_uom
																						// +
																						// '-'
																						+ item.carr_name,
																				text : item.carr_no
																						+ '-'
																						+ item.carr_name
																			};
																		}));
													}
												});
							
								// $.ajaxSetup({async: true});
							} else {
								setTimeout(function(){	
								if (carrSuggList != null
										&& carrSuggList != undefined && carrSuggList.length >0) {
									
									response(sliceFilteredCarrierList(request,
											carrSuggList, maxAutoListSize));
								}
								},50);
							}

						},
						select : function(event, ui) {

							$(':hidden[id=hdnmedicineid]').val(
									ui.item.text.toString());
							$(':hidden[id=hdnmedicinenm]').val(
									ui.item.value.toString());
							if(elemToBeTriggered != undefined)
								{
							setTimeout(function(){
							$(elemToBeTriggered).trigger('click');
							},10);
								}
						},
						minLength : 2,
						autoFocus : true
					});

}


function sliceFilteredCarrierList(request, carrSuggList, maxAutoListSize) {
	var filteredList = $.map(carrSuggList, function(item) {
		// Defect
		// 257
		if ((item.carr_no).indexOf(request.term) > -1
				|| ((item.carr_name).toLowerCase()).indexOf((request.term)
						.toLowerCase()) > -1)
			return {
				value : item.carr_no + '-'
				// +
				// item.article_uom
				// +
				// '-'
				+ item.carr_name,
				text : item.carr_no + '-' + item.carr_name
			};
	});

	return filteredList.slice(0, maxAutoListSize);
}
function deciValues(rndWgt,WgtFlg,lnkdFlg,pbdFlg,soh,piSoh,artlType,artlUOM,stockAdjFlag,from,piUom) {;//defect no 6066
	

	if ((lnkdFlg != null
			&& lnkdFlg != undefined && lnkdFlg == 'Y')
			|| (WgtFlg != null
					&& WgtFlg != undefined && WgtFlg == 'Y')
			|| (rndWgt != null
					&& rndWgt != undefined && rndWgt == 'Y')) {
		piSoh = piSoh != null && piSoh != undefined ? Number(piSoh).toFixed(0) : piSoh;
		if(rndWgt == 'Y' && stockAdjFlag == true){
			
			return (soh == null || soh == undefined ? '0'
					: (artlUOM == 'KG') ? (piSoh != null && piSoh != undefined ? piSoh + ' '+ 'EA' +" & "+ (Number(soh).toFixed(3)+ ' '+ artlUOM)  : Number(0).toFixed(3) + ''+ 'EA' +" & "+ (Number(soh).toFixed(3)+ ' '+ artlUOM) )
							: (piSoh != null && piSoh != undefined ? piSoh + ' '+ 'EA' +" & "+ (Number(soh).toFixed(0)+ ' '+ artlUOM)  : Number(0).toFixed(0) + ''+ 'EA' +" & "+ (Number(soh).toFixed(0)+ ' '+ artlUOM) ));
		}
		else if (artlType == 'ZBAK') {
			return (soh == null || soh == undefined ? '0' : (artlUOM == 'ZKG' || artlUOM == 'ZEA') ? Number(soh).toFixed(2)
							: (artlUOM == 'KG') ? Number(soh).toFixed(3) :  Number(soh).toFixed(0));
		}
		else if(rndWgt == 'Y' && stockAdjFlag == false && piSoh != undefined && from != undefined && piUom == undefined){
			
			return (piSoh != null && piSoh != undefined ? piSoh : '0');
		}else if(rndWgt == 'Y' && stockAdjFlag == false && piSoh != undefined && from != undefined && piUom != undefined && piUom != null){
			
			return (piSoh != null && piSoh != undefined ? piSoh+' '+piUom : '0');
		}else if(rndWgt == 'Y' && piSoh != undefined){
			
			return (piSoh == null || piSoh == undefined) ? '0' : Number(piSoh);
		}else if(lnkdFlg == 'Y' || artlUOM == 'L' ){
			
			return (soh == null || soh == undefined) ? '0' : Number(soh).toFixed(3);
		}else {
			return (soh == null || soh == undefined ? '0'
					: (artlUOM == 'KG') ? Number(soh).toFixed(3)
							:correctDecimalPostion(soh));
		}
	} else if (artlType == 'ZBAK') {
		return (soh == null || soh == undefined ? '0'
				: (artlUOM == 'ZKG' || artlUOM == 'ZEA') ? Number(soh).toFixed(2)
						: (artlUOM == 'KG') ? Number(soh).toFixed(3) :  correctDecimalPostion(soh));
	} else if (pbdFlg != null
			&& pbdFlg != undefined && pbdFlg == 'Y') {
		return (soh == null || soh == undefined ? '0'
				: (artlUOM == 'KG') ? Number(soh).toFixed(1)
						: correctDecimalPostion(soh));

	} else {
		return (soh == null || soh == undefined ? '0'
				: (artlUOM == 'KG') ? Number(soh).toFixed(3)
						: correctDecimalPostion(soh));
	}

}
var correctDecimalPostion = function(val){
	if(val != null && val != '' && val != undefined){
		if(Number(val)%1>0){
			val = Number(val).toFixed(3);
		}else{
			val = Number(val).toFixed(0);
		}
	}
	return val;
}
var gotoHomeScreenSessionExpired = function(){
	window.location.href= '../../logginOut.htm';
} 
/*
function getSalesOrgConfigService() { 
  var param = {
    "IV_SALES_ORG": $('#salesOrg').val(),
    "iv_order_type": "PO"
  };
  $.ajax({
    type: "post",
    url: getLimitQty,
    data: JSON.stringify(param),
    beforeSend: function() {},
    success: function(response) {
      if (response != null && response != undefined       
        && response.result != undefined && response.result[0] != undefined) {          	
    		  salesOrgConfigMap['update_recvd_qty'] = response.result[0].update_recvd_qty;    		 
    		  salesOrgConfigMap['order_limit_qty'] = response.result[0].order_limit_qty;  		
    		  salesOrgConfigMap['rtv_max_article_range'] = response.result[0].rtv_max_article_range;
    		  //response.result[0].temp_disable_flag ='Y';
    		  salesOrgConfigMap['temp_disable_flag'] =  response.result[0].temp_disable_flag;
      } else {
    	  salesOrgConfigMap['update_recvd_qty'] = 28;    		 
		  salesOrgConfigMap['order_limit_qty'] = 99;
      }
      stopLoading();
    },
    error: function() {
    	//showAllErrors([mobiSerErrMsg]);
    	salesOrgConfigMap['update_recvd_qty'] = 28;    		 
		salesOrgConfigMap['order_limit_qty'] = 99;
      stopLoading();
    },
  });
}*/
Number.prototype.toFixedDown = function(digits) {
   /* var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();*/	
	return Math.trunc(Number(this)* 1000) / 1000;
};
