function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
/**
 * validates from date and to date
 * @param dateFrom
 * @param dateTo
 * @returns {Boolean}
 */
function validateDates(dateFrom,dateTo,reportName){
	var rtnFlag = true;
	
	if(dateFrom == undefined || dateFrom == '' || dateFrom.length <= 0){
		$.fn.showCustomMsg(['Date From is mandatory.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if(dateTo == undefined || dateTo == '' || dateTo.length <= 0){
		$.fn.showCustomMsg(['Date To is mandatory.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	
	var jDateFromArray = dateFrom.split("/");
	var jDateToArray = dateTo.split("/");
	
	
	if(jDateFromArray.length != 3 || jDateFromArray[0] <= 0 || jDateFromArray[0] > 31 || jDateFromArray[1] <= 0 || jDateFromArray[1] > 12 
			|| jDateFromArray[2] < 0 || jDateFromArray[2] > 9999){
		$.fn.showCustomMsg(['Date From is not valid.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if(jDateToArray.length != 3 || jDateToArray[0] <= 0 || jDateToArray[0] > 31 || jDateToArray[1] <= 0 || jDateToArray[1] > 12 
			|| jDateToArray[2] < 0 || jDateToArray[2] > 9999){
		$.fn.showCustomMsg(['Date To is not valid.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}

	var jDateFrom =  new Date(jDateFromArray[2],jDateFromArray[1]-1,jDateFromArray[0]);
	var jDateTo =  new Date(jDateToArray[2],jDateToArray[1]-1,jDateToArray[0]);	

			
	if(jDateFrom > jDateTo){
		$.fn.showCustomMsg(['From date should be lesser than To date.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
	}
	if(reportName == 'RTC report'){
		if(isFutureDate(dateTo))
		{
		$.fn.showCustomMsg(['To Date should not be Current Date / Future Date.'],error,reportName);
		rtnFlag = false;
		return rtnFlag;
		}
	}
	
	return rtnFlag;
}
/**
 * Validates a single date
 * @param date
 * @returns {Boolean}
 */
function validateDate(date,reportName){
	var rtnFlag = true;
	var dateArray = date.split("/");
	if(dateArray.length != 3 || dateArray[0] <= 0 || dateArray[0] > 31 || dateArray[1] <= 0 || dateArray[1] > 12 
			|| dateArray[2] < 0 || dateArray[2] > 9999){
		$.fn.showCustomMsg(['Please enter a valid date.'],error,reportName);
		rtnFlag = false;		
	}
	return rtnFlag;
}
function validateStartDate(date,reportName){
	var rtnFlag = true;
	var dateArray = date.split("/");
	if(dateArray.length != 3 || dateArray[0] <= 0 || dateArray[0] > 31 || dateArray[1] <= 0 || dateArray[1] > 12 
			|| dateArray[2] < 0 || dateArray[2] > 9999){
		$.fn.showCustomMsg(['Please enter a valid Start Date.'],error,reportName);
		rtnFlag = false;		
	}
	return rtnFlag;
}
function validateEndDate(date,reportName){
	var rtnFlag = true;
	var dateArray = date.split("/");
	if(dateArray.length != 3 || dateArray[0] <= 0 || dateArray[0] > 31 || dateArray[1] <= 0 || dateArray[1] > 12 
			|| dateArray[2] < 0 || dateArray[2] > 9999){
		$.fn.showCustomMsg(['Please enter a valid End Date.'],error,reportName);
		rtnFlag = false;		
	}
	return rtnFlag;
}
function validateAddCrit(fieldValues,addCritArray,reportName){
	var rtnFlag = true;
	for (var f = 0; f < fieldValues.length; f++) { 			 
		var equalToFound = false;
		var greaterFound = false;
		var lesserFound = false;
		var greaterThanVal = '';
		var lesserThanVal = '';
		var noValueFound = false;
		for (var i = 0; i < addCritArray.length; i++) {
			if(addCritArray[i].iv_field == fieldValues[f]){
				if(addCritArray[i].iv_criteria == "ET" && addCritArray[i].iv_value != ''){
					equalToFound = true;
				}else if(addCritArray[i].iv_criteria == "GT" && addCritArray[i].iv_value != ''){
					greaterFound = true;
					greaterThanVal = addCritArray[i].iv_value;
				}else if(addCritArray[i].iv_criteria == "LT" && addCritArray[i].iv_value != ''){
					lesserFound = true;
					lesserThanVal = addCritArray[i].iv_value;
				}
				if(addCritArray[i].iv_value == ''){
					noValueFound = true;
					$.fn.showCustomMsg(['Please enter values for Additional Criteria.'],error,reportName);
					rtnFlag = false;
				}
			}
			
		}
		if(equalToFound && (greaterThanVal != '' ||lesserThanVal != '')){
			rtnFlag = false;
		}else if((greaterFound && lesserFound )&& greaterThanVal > lesserThanVal){
			rtnFlag = false;
		}
	}
	return rtnFlag;
}

function convertDatetoYYYYMMDD(inDate){
	var dateArr = inDate.split("/");
	
	return dateArr[2]+dateArr[1]+dateArr[0];
}

/**
 * This method returns true if the date range exceeds the maxDateRange 
 * 
 * @param fromDate
 * @param toDate
 * @param maxDateRange
 * @returns {Boolean}
 */
function isDateRangeExceed(fromDate, toDate, maxDateRange) {
	  var flag = false;
	  var fromDateArr = fromDate.split('/');
	  var toDateArr = toDate.split('/');
	  var date1 = new Date(fromDateArr[1] + '/' + fromDateArr[0] + '/' + fromDateArr[2]);
	  var date2 = new Date();
	  date2.setDate(Number(toDateArr[0]));
	  date2.setMonth(Number(toDateArr[1]) - 1);
	  date2.setYear(Number(toDateArr[2]));
	  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	  var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
	  if (diffDays > maxDateRange) {
	    flag = true;
	  }
	  return flag;
	}
function isPastDate(enteredDateString){
	var rtnFlag = false;
	var todayDate = new Date();
	var enteredDateArray = enteredDateString.split("/");//dd/mm/yyyy
	var enteredDate = new Date(enteredDateArray[2]+"-"+enteredDateArray[1]+"-"+enteredDateArray[0]);//YYYY-MM-DD
	if(enteredDate < todayDate){
		rtnFlag = true;
	}
	return rtnFlag;
}
function isFutureDate(enteredDateString){
	var rtnFlag = false;
	var todayDate = new Date();
	var enteredDateArray = enteredDateString.split("/");//dd/mm/yyyy
	var enteredDate = new Date(enteredDateArray[2]+"-"+enteredDateArray[1]+"-"+enteredDateArray[0]);//YYYY-MM-DD
	if(enteredDate > todayDate){
		rtnFlag = true;
	}
	return rtnFlag;
}
function convertSECtoHHMMSS(secondsInputString){
	if(secondsInputString!=undefined && secondsInputString != ''){
		var durationInSec = Number(secondsInputString);
		var hour = durationInSec/(60*60);
		var secRemaining = durationInSec%(60*60);
		var minutes = "00";
		var seconds = "00";
		if(secRemaining >= 60){
			minutes = parseInt(secRemaining/60);			
			seconds = Math.round(secRemaining%60);
		}else{
			seconds = secRemaining;
		}
		if(hour >= 1){
			hour =parseInt(hour);
		}else{
			hour = "00";
		}
		return ("0" + hour).slice(-2)+":"+("0" + minutes).slice(-2)+":"+("0" + seconds).slice(-2);
	}else{
		return '';
	}
}
