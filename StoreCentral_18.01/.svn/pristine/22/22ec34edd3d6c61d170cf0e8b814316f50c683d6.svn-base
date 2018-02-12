var demandLimit = 99999;//demand limit changes
var buildBigwLimit = 400;
var buildOtherLimit = 500;
var buildLimit = 100;
var displayLimit = 200;
var maxlimit = 9999;

// var BUILD_MAX_LIMT_OTHER_BANNER = 400;
// var BUILD_MAX_LIMT_BIGW_BANNER = 500;
// var DISPLAY_MAX_LIMT_OTHER_BANNER = 200;
// var DISPLAY_MAX_LIMT_BIGW_BANNER = 200;
// var DEMAND_MAX_LIMT_OTHER_BANNER = 500;
// var DEMAND_MAX_LIMT_BIGW_BANNER = 500;
// var END_DATE_MAX_LIMT_OTHER_BANNER = 31;
// var END_DATE_MAX_LIMT_BIGW_BANNER = 183;

function validateDisplayQty(value, om,bigwFlag,bigwDisplayMaxLimit,bigwDisplayMaxPercentage) {

	var error = '';
	if (!bigwFlag && value * Number(om) > maxlimit) {
		error = 'Display quantity for article cannot exceed ' + maxlimit
				+ ' units.';
	}else if( bigwFlag && bigwDisplayMaxLimit != undefined && bigwDisplayMaxLimit != 0 && (value * om) > bigwDisplayMaxLimit){
		error = 'Store Display quantity in OM is not valid, Please enter a value under "' + bigwDisplayMaxLimit + '" units';
	}else	if( bigwFlag && bigwDisplayMaxPercentage != undefined && bigwDisplayMaxPercentage != 0 && (value * om) > bigwDisplayMaxPercentage){
		error = 'Store Display quantity in OM is not valid, Please enter a value under "' + bigwDisplayMaxPercentage + '" units';
	}

	/*if (value * Number(om) > maxlimit) {
		error = 'Display quantity*OM for article cannot exceed ' + displayLimit
				+ '.';
	}*/

	return error;
}

function validateDemandQty(value, baseFrcst, wtd, om,bigwFlag ,bigwDemandMaxlimitPercentage) {

	var error = '';
	if (value < baseFrcst) {
		error = 'Demand Quantity cannot be set below the Base Forecast value.';
	} else if (value < wtd) {
		error = 'Demand Quantity cannot be set below the WTD sales.';
	} else if (!bigwFlag && value * Number(om) > demandLimit) {      //demand limit changes
		error = 'Store demand for article cannot exceed ' + demandLimit + ' units.';
	}else if( bigwFlag && bigwDemandMaxlimitPercentage != undefined && bigwDemandMaxlimitPercentage != 0 && (value * om) > bigwDemandMaxlimitPercentage){
		error = 'Store Demand quantity in OM is not valid, Please enter a value under "'+ bigwDemandMaxlimitPercentage + '" units';
	}
	/*
	 * if(value*Number(om)>maxlimit){ error='Demand quantity*OM for article
	 * cannot exceed '+maxlimit+ '.'; }
	 */

	return error;
}

function validateBuildQty(value, baseFrcst, om ,bigwFlag,bigwBuildMaxLimit,bigwBuildMaxPercentage) {
	var error = '';
	// Commented first check as per UAT defect said by Tracy 
	/*if (value < baseFrcst) {
		error = 'Build Quantity cannot be set below the Base Forecast value.';
	} else
		*/if (!bigwFlag && value * Number(om) > maxlimit) {
		error = 'Build Quantity for article cannot exceed ' + maxlimit + ' units.';
	}else if( bigwFlag && bigwBuildMaxLimit != undefined && bigwBuildMaxLimit != 0 && (value * om) > bigwBuildMaxLimit){
		error = 'Store Build quantity in OM is not valid, Please enter a value under "'+ bigwBuildMaxLimit+ '" units';
	}else	if( bigwFlag && bigwBuildMaxPercentage != undefined && bigwBuildMaxPercentage != 0 && (value * om) > bigwBuildMaxPercentage){
		error = 'Store Build quantity in OM is not valid, Please enter a value under "'+ bigwBuildMaxPercentage+ '" units';
	}

	/*if (value * Number(om) > maxlimit) {
		error = 'Build quantity*OM for article cannot exceed ' + maxlimit + '.';
	}*/

	return error;
}