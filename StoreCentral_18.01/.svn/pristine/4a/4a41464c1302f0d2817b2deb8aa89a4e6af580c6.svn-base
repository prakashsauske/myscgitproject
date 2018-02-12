var redoHide= false;
var headerDesc;
var headerSort;
var headIndex;
var filterFlag;
var reportGenerated = false;
var paramsChanged = false;
var visibleCtrls;
var hiddentCtrls;
var allInputCtrls;
//var printRptValidMsg = "Generate and Print Report parameters should be in synch.<br/>The below parameters has been modified.<br/>Either revert the parameters modified and Print or <br/>Generate report for the modified parameters and then Print<br/>";
var printRptValidMsg = "Please Re-generate your selected Report";

function bindTableHeaderClickEvent(inputElementAttribute, tableClass) {
	//var tableObject = $("table.tablesorter tr th.tablesorter-header" ).closest("table");
	 $("table.tablesorter tr th.tablesorter-header" ).click(function(e) {
		  var sortType = deriveSortTypeBeforeTblUpdate($(this));
		  var sortColVal = $(this).attr('sortAttr')+","+$(this).attr('sortDataType')+","+sortType;
		  var tableHeaderObject = $(this).closest( "table" );
		  if(e.shiftKey) {
			  	shiftKeyCallbackFunction(getTableIdName(tableHeaderObject), $(this), sortColVal);
		  }
		  else if(e.ctrlKey) {
			  	ctrlKeyCallbackFunction(getTableIdName(tableHeaderObject), $(this), sortColVal);
		  }
		  else {
			  clickCallbackFunction(getTableIdName(tableHeaderObject), $(this), sortColVal);
		  }
	   });
}
function bindTableSortEndEvent(tableObject, inputElementAttribute) {
	 tableObject.bind("sortEnd",function() {
		 var obj = tableObject.children("thead").children("tr");
		 obj.children('th').each(function () {
			 if($(this).attr("aria-sort")=="ascending" || $(this).attr("aria-sort")=="descending") {
				 updateSortAtrDtlAfterSortEnd($(this), inputElementAttribute);
			 }
			 //console.log($(this).attr("sortAttr"));
		 });
		 //console.log("nth child index "+obj.children("th:nth-child("+2+")").attr("sortAttr"));
	 });

}
function updateSortAtrDtl(headerObj, obj, sortType) {
	  var arr = obj.val().split(',');
	  var arrayLength = arr.length;
	  //console.log("arrayLength :: "+arrayLength+">"+arr[0]+"<");
	  var columnAlreadySorted = false;
	  for (var i = 0; i < arrayLength; i=i+4) {
		  if(headerObj.attr('sortAttr')=='transNoRange' && (arr[i]=='startOfTransaction' || arr[i]=='endOfTransaction')) {
			  arr[i+1] = headerObj.attr('sortDataType');
			  arr[i+2] = deriveSortTypeBeforeTblUpdate(headerObj);
			  arr[i+3] = ((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls'));
			  columnAlreadySorted = true;
		  }
		  else if(arr[i]==headerObj.attr('sortAttr')) {
			  arr[i] = headerObj.attr('sortAttr');
			  arr[i+1] = headerObj.attr('sortDataType');
			  arr[i+2] = deriveSortTypeBeforeTblUpdate(headerObj);
			  arr[i+3] = ((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls'));
			  columnAlreadySorted = true;
		  }
	  }
	  var str = "";
	  if(arrayLength>1 && arrayLength%4==0) {
		  str = obj.val()+",";
	  }
	  if(columnAlreadySorted==false) {
		  obj.val(str+headerObj.attr('sortAttr')+","+headerObj.attr('sortDataType')+","+deriveSortTypeBeforeTblUpdate(headerObj)+","+((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls')));
	  }
	  else {
		  obj.val(arr.join(","));
	  }	
}
function updateSortAtrDtlAfterSortEnd(headerObj, obj, sortType) {
	  var arr = obj.val().split(',');
	  var arrayLength = arr.length;
	  //console.log("arrayLength :: "+arrayLength+">"+arr[0]+"<");
	  var columnAlreadySorted = false;
	  for (var i = 0; i < arrayLength; i=i+4) {
		  if(headerObj.attr('sortAttr')=='transNoRange' && (arr[i]=='startOfTransaction' || arr[i]=='endOfTransaction')) {
			  arr[i+1] = headerObj.attr('sortDataType');
			  arr[i+2] = sortTypeAfterTblUpdate(headerObj);
			  arr[i+3] = ((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls'));
			  columnAlreadySorted = true;
		  }
		  else if(arr[i]==headerObj.attr('sortAttr')) {
			  //arr[i] = headerObj.attr('sortAttr');
			  arr[i+1] = headerObj.attr('sortDataType');
			  arr[i+2] = sortTypeAfterTblUpdate(headerObj);
			  arr[i+3] = ((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls'));
			  columnAlreadySorted = true;
		  }
	  }
	  var str = "";
	  if(arrayLength>1 && arrayLength%4==0) {
		  str = obj.val()+",";
	  }
	  if(columnAlreadySorted==false) {
		  obj.val(str+headerObj.attr('sortAttr')+","+headerObj.attr('sortDataType')+","+sortTypeAfterTblUpdate(headerObj)+","+((headerObj.attr('nulls')==undefined || headerObj.attr('nulls')==null)?'last':headerObj.attr('nulls')));
	  }
	  else {
		  obj.val(arr.join(","));
	  }
	  //console.log("after Sort end : "+obj.val());
}
function sortTypeAfterTblUpdate(obj) {
	  var sortType;
	  if(obj.attr('aria-sort')=='ascending') {
		  sortType="asc";
	  }
	  else {
		  sortType="dsc";
	  }
	  return sortType;
}
function deriveSortTypeBeforeTblUpdate(obj) {
	  var sortType;
	  if(obj.attr('aria-sort')=='none'||obj.attr('aria-sort')=='descending') {
		  //console.log("update to asc!!!! "+obj.attr('aria-sort'));
		  sortType="asc";
	  }
	  else {
		  //console.log("update to dsc!!!!"+obj.attr('aria-sort'));
		  sortType="dsc";
	  }
	  return sortType;
}
function getTableIdName(tableHeaderObject) {
	var idAttrName = "";
	if(tableHeaderObject.attr('id')!=undefined && tableHeaderObject.attr('id')!=null && tableHeaderObject.attr('id')!="") {
		idAttrName = tableHeaderObject.attr('id');
	}
	else if(tableHeaderObject.attr('Id')!=undefined && tableHeaderObject.attr('Id')!=null && tableHeaderObject.attr('Id')!="") {
		idAttrName = tableHeaderObject.attr('Id');
	}
	else if(tableHeaderObject.attr('iD')!=undefined && tableHeaderObject.attr('iD')!=null && tableHeaderObject.attr('iD')!="") {
		idAttrName = tableHeaderObject.attr('iD');
	}
	else if(tableHeaderObject.attr('ID')!=undefined && tableHeaderObject.attr('ID')!=null && tableHeaderObject.attr('ID')!="") {
		idAttrName = tableHeaderObject.attr('ID');
	}
	return idAttrName;
}
function shiftKeyFunction(tableHeaderObj, inputAttrObj, sortColVal) {
	updateSortAtrDtl(tableHeaderObj, inputAttrObj);
}
function ctrlKeyFunction(inputAttrObj, sortColVal) {
	inputAttrObj.val('');
}
function clickFunction(tableHeaderObj, inputAttrObj, sortColVal) {
	if(tableHeaderObj.attr('sortAttr')=="transNoRange") {
		var srtDtTyp = tableHeaderObj.attr('sortDataType');
		var drvdSrtType = deriveSortTypeBeforeTblUpdate(tableHeaderObj);
		inputAttrObj.val("startOfTransaction,"+srtDtTyp+","+drvdSrtType+",none,endOfTransaction,"+srtDtTyp+","+drvdSrtType+",none");
	}
	else {
		inputAttrObj.val(tableHeaderObj.attr('sortAttr')+","+tableHeaderObj.attr('sortDataType')+","+deriveSortTypeBeforeTblUpdate(tableHeaderObj)+","+((tableHeaderObj.attr('nulls')==undefined || tableHeaderObj.attr('nulls')==null)?'last':tableHeaderObj.attr('nulls')));
	}
}
function convertDate(val) {

	var temp = val;
	try {
		if (temp != '') {
			var time = temp.replace('/', '').replace('/', '').replace('(', '')
					.replace(')', '').split('Date')[1];
			var today = new Date();
			today.setTime(time);
			// var today = new Date();
			var newDate = today.getDate();
			var newMonth = today.getMonth() + 1;
			if (newDate < 10) {
				newDate = '0' + newDate;
			}
			if (newMonth < 10) {
				newMonth = '0' + newMonth;
			}
			return newDate + "/" + (newMonth) + "/" + today.getFullYear();
		}
		else {
			return '';
		}
	} catch (error) {
		return '';
	}

}
function convertTime(val) {

	var newHour = '';
	var newMinu = '';
	var temp = val;
	var padding = "";
	try {
		if (temp.trim() != '' && temp.trim() != '#') {
			if (temp.length == 5) {
				padding = "0";
			}
			else if(temp.length == 4) {
				padding = "00";
			}
			else if(temp.length == 3) {
				padding = "000";
			}
			else if(temp.length == 2) {
				padding = "0000";
			}
			else if(temp.length == 1) {
				padding = "00000";
			}
			else if(temp.length == 0) {
				padding = "000000";
			}
			temp = padding + temp;
			newHour = temp.slice(0, 2);
			newMinu = temp.slice(2, 4);

			return ((newHour + ":" + newMinu));
		}
		else if(temp.trim() == '#') {
			return temp.trim();
		}
		return '';
	} catch (error) {
		return '';
	}

}
function storeInHidden(visibleCtrls, hiddenCtrls) {
	var visibleCtrlsAry = visibleCtrls.split(",");
	var hiddentCtrlsAry = hiddentCtrls.split(",");
	var visAryLen = visibleCtrlsAry.length;
	for(var i=0;i<visAryLen;i++) {
		var visCtrlObj = $(visibleCtrlsAry[i]);
		var hdnCtrlObj = $(hiddentCtrlsAry[i]);
		if(visCtrlObj!=undefined && visCtrlObj!=null && hdnCtrlObj!=undefined && hdnCtrlObj!=null) {
			hdnCtrlObj.val(visCtrlObj.val());
		}
	}
}
function checkForInputChange(visibleFileds, hiddenFields) {
	//console.log("visibleCtrls : "+visibleCtrls);
	//console.log("hiddentCtrls : "+hiddentCtrls);
	paramsChanged = false;
	var visibleCtrlsAry = visibleCtrls.split(",");
	var hiddentCtrlsAry = hiddentCtrls.split(",");
	var visAryLen = visibleCtrlsAry.length;
	//var hdnAryLen = hiddentCtrlsAry.length;
	for(var i=0;i<visAryLen;i++) {
		var visCtrlObj = $(visibleCtrlsAry[i]);
		var hdnCtrlObj = $(hiddentCtrlsAry[i]);
		if(visCtrlObj!=undefined && visCtrlObj!=null && hdnCtrlObj!=undefined && hdnCtrlObj!=null) {
			var visCtrlVal = visCtrlObj.val();
			var hdnCtrlVal = hdnCtrlObj.val();
			if(visCtrlVal==undefined || visCtrlVal==null) {
				visCtrlVal = '';
			}
			if(hdnCtrlVal==undefined || hdnCtrlVal==null) {
				hdnCtrlVal = '';
			}
			if(hdnCtrlVal!=visCtrlVal) {
				paramsChanged = true;
				break;
			}
		}
	}
}
function getAllModifiedParams() {
	var visibleCtrlsAry = visibleCtrls.split(",");
	var hiddentCtrlsAry = hiddentCtrls.split(",");
	var visAryLen = visibleCtrlsAry.length;
	var modifedParams ='<br/>';
	//paramsChanged = false;
	for(var i=0;i<visAryLen;i++) {
		var visCtrlObj = $(visibleCtrlsAry[i]);
		var hdnCtrlObj = $(hiddentCtrlsAry[i]);
		if(visCtrlObj!=undefined && visCtrlObj!=null && hdnCtrlObj!=undefined && hdnCtrlObj!=null) {
			var visCtrlVal = visCtrlObj.val();
			var hdnCtrlVal = hdnCtrlObj.val();
			if(visCtrlVal==undefined || visCtrlVal==null) {
				visCtrlVal = '';
			}
			if(hdnCtrlVal==undefined || hdnCtrlVal==null) {
				hdnCtrlVal = '';
			}
			if(hdnCtrlVal!=visCtrlVal) {
				modifedParams += visCtrlObj.attr('name') + " : '"+hdnCtrlVal+"' -> '"+visCtrlVal+"'<br/>";
			}
		}
	}
	return modifedParams;
}

function backupInputParams() {
	storeInHidden(visibleCtrls, hiddentCtrls);
}
function setReportGenerationFlags() {
	reportGenerated = true;
	paramsChanged = false;
}
function printJasperValMsg() {
	$("#printJasperLbl").html(printRptValidMsg);//+getAllModifiedParams()
	$('#dialog-VerifyJasperPrint').dialog('open').removeClass('visible-hide');
}
function isNotJasperPrintValid() {
	return reportGenerated && paramsChanged;
}
$(document).ready(function(){
	 $( "#dialog-VerifyJasperPrint" ).dialog({
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 100,
			maxHeight: 600,
			width: 400,
			closeOnEscape: true,
			open: function(event, ui) { //$(".ui-dialog-titlebar-close").hide();
			}
		});
	$("#dialog-VerifyJasperPrint").parent().addClass("popupWrapper");
	$(".closeJasperPrint").click(function() {
		$("#dialog-VerifyJasperPrint").dialog('close');
	});
	$(allInputCtrls).change(function() {
		//var visibleFileds = $(visibleCtrls);
		//var hiddenFields = $(hiddentCtrls);
		checkForInputChange(/*visibleFileds, hiddenFields*/);
	});
});
function bindDynaCtrlInputChange(inputCtrl, visCtrl, hdnCtrl) {
	if(visCtrl==undefined || visCtrl==null) {
		visCtrl = '';
	}
	if(hdnCtrl==undefined || hdnCtrl==null) {
		hdnCtrl = '';
	}
	if(visibleCtrls!=undefined && visibleCtrls!=null && visibleCtrls.toLowerCase().indexOf(visCtrl.toLowerCase()) == -1) {
		visibleCtrls = visibleCtrls +','+visCtrl;
	}
	if(hiddentCtrls!=undefined && hiddentCtrls!=null && hiddentCtrls.toLowerCase().indexOf(hdnCtrl.toLowerCase()) == -1) {
		hiddentCtrls = hiddentCtrls +','+hdnCtrl;
	}
	//$(inputCtrl).change(function() {
		//var visibleFileds = $(visibleCtrls);
		//var hiddenFields = $(hiddentCtrls);
		checkForInputChange(/*visibleFileds, hiddenFields*/);
	//});
}
function getDateObj(date, format) {
	var dateTmp = null;
	if(dateFormatddmmyyyy(format)!=undefined && dateFormatddmmyyyy(format)!=null && dateFormatddmmyyyy(format).length==6) {
		dateTmp = new Date(date[5], date[3]-1, date[1]);
	}
	else if(dateFormatmmddyyyy(format)!=undefined && dateFormatmmddyyyy(format)!=null && dateFormatmmddyyyy(format).length==6) {///^dd(\/|-)mm(\/|-)yyyy$/
		dateTmp = new Date(date[5], date[1]-1, date[3]);
	}
	return dateTmp;
}
function getDateFormat(format) {
	  if(format==undefined || format==null || format=='') {
		  format='dd/mm/yyyy';
	  }
	  else {
		  format = format.toLowerCase();
	  }
	  return format;
}
function dateRegEx(currVal) {
	  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //   'dd/mm/yyyy'.match(/^([dD]{2})(\/|-)([mM]{2})(\/|-)([yY]{4})$/)
	  return currVal.match(rxDatePattern); // is format OK?
}
function dateFormatddmmyyyy(fmtVal) {
	  var rxDatePattern = /^([dD]{2})(\/|-)([mM]{2})(\/|-)([yY]{4})$/; //   'dd/mm/yyyy'.match(/^([dD]{2})(\/|-)([mM]{2})(\/|-)([yY]{4})$/)
	  return fmtVal.match(rxDatePattern); // is format OK?
}
function dateFormatmmddyyyy(fmtVal) {
	  var rxDatePattern = /^([mM]{2})(\/|-)([dD]{2})(\/|-)([yY]{4})$/; //   'dd/mm/yyyy'.match(/^([dD]{2})(\/|-)([mM]{2})(\/|-)([yY]{4})$/)
	  return fmtVal.match(rxDatePattern); // is format OK?
}
function diffDates(dateStr, format) {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	format = getDateFormat(format);
	var firstDate = new Date();
	var dateTmp =  dateRegEx(dateStr);
	var secondDate = getDateObj(dateTmp, format);
	return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}
function isValidDate(txtDate, format)
{
	//console.log('txtDate : '+txtDate);
  var currVal = txtDate;
  if(currVal == '')
    return false;
  
  var dtArray = dateRegEx(currVal);

  if(dtArray == undefined || dtArray == null)
     return false;

/*  for(var jj=0;jj<dtArray.length;jj++) {
	  console.log(jj+'--'+dtArray[jj]);
  }*/
  //Checks for dd/mm/yyyy format.
  format = getDateFormat(format);
  if(dateFormatddmmyyyy(format)!=undefined && dateFormatddmmyyyy(format)!=null && dateFormatddmmyyyy(format).length==6) {
	  dtDay= dtArray[1];
	  dtMonth = dtArray[3];
	  dtYear = dtArray[5];
  }
  else if(dateFormatmmddyyyy(format)!=undefined && dateFormatmmddyyyy(format)!=null && dateFormatmmddyyyy(format).length==6) {
	  dtDay= dtArray[3];
	  dtMonth = dtArray[1];
	  dtYear = dtArray[5];
  }

  if (dtMonth < 1 || dtMonth > 12)
      return false;
  else if (dtDay < 1 || dtDay> 31)
      return false;
  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
      return false;
  else if (dtMonth == 2)
  {
     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
     if (dtDay> 29 || (dtDay ==29 && !isleap))
          return false;
  }
  return true;
}
function isFutureDate(date, format) {
	format = getDateFormat(format);
	var dateTmp =  dateRegEx(date);
	var currDate = new Date((new Date()).setHours(0,0,0,0));
	var dateObj = getDateObj(dateTmp, format);
	try {
		return dateObj.getTime() > currDate.getTime();
	}
	catch (e) {
		return false;
	}
}
function isFromDateLessOrEqToDate(fromDate, toDate, format) {
	format = getDateFormat(format);
	var fromDateAry =  dateRegEx(fromDate);
	var toDateAry =  dateRegEx(toDate);
	var frmDate = getDateObj(fromDateAry, format);
	var toDate = getDateObj(toDateAry, format);
	try {
		return frmDate.getTime() <= toDate.getTime();
	}
	catch (e) {
		return false;
	}
}
function absDaysBetween(fromDate, toDate, format) {
	return Math.abs(daysBetween(fromDate, toDate, format));
}
function daysBetween(fromDate, toDate, format) {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	format = getDateFormat(format);
	var fromDateAry =  dateRegEx(fromDate);
	var toDateAry =  dateRegEx(toDate);
	var frmDate = getDateObj(fromDateAry, format);
	var toDate = getDateObj(toDateAry, format);
	return Math.round((toDate.getTime() - frmDate.getTime())/(oneDay));
}
function absDaysPastCurrDate(date, format) {
	return Math.abs(daysPastCurrDate(date, format));
}
function daysPastCurrDate(date, format) {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	format = getDateFormat(format);
	var dateAry =  dateRegEx(date);
	var frmDate = getDateObj(dateAry, format);
	var currDate = new Date((new Date()).setHours(0,0,0,0));
	return Math.round((currDate.getTime() - frmDate.getTime())/(oneDay));
}
function timeRegEx(currVal) {
	  var rxDatePattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;// /^([0-2]{1}\d{1})(:)([0-5]{1}\d{1})$/;
	  return currVal.match(rxDatePattern); // is format OK?
}
function timeHrMnScRegEx(currVal) {
	if(currVal!=undefined || currVal!=null) {
	  var rxDatePattern = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;// /^([0-2]{1}\d{1})(:)([0-5]{1}\d{1})$/;
	  return currVal.match(rxDatePattern); // is format OK?
	}
}
function timeHrMnScRegExNeg(currVal) {
	if(currVal!=undefined || currVal!=null) {
	  var rxDatePattern = /^-?([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;// /^([0-2]{1}\d{1})(:)([0-5]{1}\d{1})$/;
	  return currVal.match(rxDatePattern); // is format OK?
	}
}
function timeAnyHrMnScRegEx(currVal) {
	if(currVal!=undefined || currVal!=null) {
	  var rxDatePattern = /^-?(\d+):?([0-5]\d):?([0-5]\d)$/;// /^([0-2]{1}\d{1})(:)([0-5]{1}\d{1})$/;
	  return currVal.match(rxDatePattern); // is format OK?
	}
}
function  isValidTime_1pos(time) {
	if(time == '')
		return false;
	var timeArray = timeRegEx(time);

	if(timeArray == undefined || timeArray == null) {
	     return false;
	}
	else {
		return true;
	}
}
function  isFromTimeGreaterThanTotime(fromTime, toTime) {
	if(fromTime == '' || toTime == '')
		return false;
	var fromTimeArray = timeRegEx(fromTime);
	var toTimeArray = timeRegEx(toTime);

	if(fromTimeArray == undefined || fromTimeArray == null || toTimeArray == undefined || toTimeArray == null) {
	     return false;
	}
	else {
		var fromTimeStr = fromTimeArray[1] + fromTimeArray[2];
		var toTimeStr = toTimeArray[1] + toTimeArray[2];
		return parseInt(fromTimeStr) > parseInt(toTimeStr);
	}
}
function setScrollerPosition(tabName, leftScroller, rightScroller) {
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
		
		//console.log("What is this height---->> : "+tabName.height()+", "+ht+", Doc height "+$(window).height()+", "+tabName.offset().top);
		leftScroller.css( { marginTop : ht+"px"} );
		rightScroller.css( { marginTop : ht+"px"} );
	}, 500);
}
function isValidNumeric(val) {
	return val==null || val== undefined? false :/^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(val);
}