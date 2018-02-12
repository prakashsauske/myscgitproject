var errorFieldClass = 'errorField';
var tooltipClass = '';
var bigwdaylimit = 31;
var supersdaylimit = 183;

function isValidDate(input) {
	// var validformat=/^\d{2}\/\d{2}\/\d{4}$/ ;// Basic check for format
	// validity
	var returnval = false;
	if (input == undefined || input == '' || input == null) {
		console.log('empty input');
	} else if (input.split('/').length != 3) {
		console.log('empty input');
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
				|| yearfield == "") {
			return false;
		}

		input = formateDate(input);
		dayfield = input.split("/")[0];
		monthfield = Number(input.split("/")[1]);
		yearfield = input.split("/")[2];
		var dayobj = new Date(yearfield, monthfield - 1, dayfield);
		if (dayobj == 'Invalid Date') {
			return false;
		} else {
			return true;
		}
	}
	return returnval;
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
function getCurentDateTxt() {
	try {
		var dateTxt = new Date();
		var dd = dateTxt.getDate();
		var mm = dateTxt.getMonth() + 1;
		var yy = dateTxt.getFullYear();
		var date = '' + dd + '/' + mm + '/' + yy + '';
		console.log(date);
		return date;
	} catch (err) {
		console.log(err);
		return null;
	}
}

function compareDate(from, to) {
	var dtfrom = getDate(from);
	var dto = getDate(to);
	console.log('from' + dtfrom + 'to' + dto);
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
		if (isPastDate($(this).val())) {
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


	$.fn.startEndValidation = function(endDate) {
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
				if (isBigw == 'true') {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Number(diff($(this).val(), endDate.val())) > bigwdaylimit-1) {
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
				} else if (isSupers || isLiqure) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Number(diff($(this).val(), endDate.val())) > supersdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ supersdaylimit + " days from Start Date.");
						endDate.change(function() {
							endDate.removeClass(errorFieldClass);
							removetooltip(endDate);
						});
						flag = false;
					}
				} else if (isMetro) {
					//R18.01 INC01811283, Defect_12204 - Fix
					if (Number(diff($(this).val(), endDate.val())) > supersdaylimit-1) {
						endDate.addClass(errorFieldClass);
						/*
						 * addtooltip(endDate, "Cannot be greater than " +
						 * supersdaylimit + " days (" + Number(supersdaylimit /
						 * 30) + " months) from Start Date.");
						 */
						addtooltip(endDate, "Cannot be greater than "
								+ supersdaylimit + " days from Start Date.");
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
				$(this).change(function() {
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
				&& promoPrice.text().trim() != '') {
			if ($(this).val().indexOf('%') >= 0
					&& $(this).val().indexOf('.') >= 0) {
				$(this).addClass(errorFieldClass);
				addtooltip($(this), "Invalid New Price.");
				$(this).change(function() {
					$(this).removeClass(errorFieldClass);
					removetooltip($(this));
				});
				flag = false;
			} else if ($(this).val().indexOf('%') >= 0) {
				if (parseInt($(this).val()) > range) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New Price Percentage range till "
							+ range + "%");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseInt($(this).val()) < range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseInt(standardPrice.text());
						var promoPriceInt = parseInt(promoPrice.text());
						var newPricePercent = parseInt($(this).val());
						var newPrice = stdPriceInt
								- (stdPriceInt * newPricePercent / 100);
						if (newPrice > stdPriceInt) {
							$(this).val('');
							try {
								showInformation("New Price cannot exceed the Standard Price");
								console
										.log("New Price cannot exceed the Standard Price("
												+ stdPriceInt + ")");
								$(this).addClass(errorFieldClass);
								addtooltip($(this),
										"New Price cannot exceed the Standard Price("
												+ stdPriceInt + ")");
								$(this).change(function() {
									$(this).removeClass(errorFieldClass);
									removetooltip($(this));
								});
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

						} else {
							$(this).val(newPrice);
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
			} else if ($(this).val().indexOf('.') >= 0) {
				if (parseFloat($(this).val()) < 0.04) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "Invalid New Price.");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				}
			} else {
				var stdPriceInt = parseInt(standardPrice.text());
				if (((parseInt($(this).val()) * 100) / stdPriceInt) > range) {
					$(this).addClass(errorFieldClass);
					addtooltip($(this), "New Price Percentage range till "
							+ range + "%");
					$(this).change(function() {
						$(this).removeClass(errorFieldClass);
						removetooltip($(this));
					});
					flag = false;
				} else if (parseInt($(this).val()) < range) {
					if (standardPrice.text().trim() != '') {
						var stdPriceInt = parseInt(standardPrice.text());
						var promoPriceInt = parseInt(promoPrice.text());
						var newPricePercent = parseInt($(this).val());
						var newPrice = newPricePercent;
						if (newPrice > stdPriceInt) {
							$(this).val('');
							try {
								showInformation("New Price cannot exceed the Standard Price");
								console
										.log("New Price cannot exceed the Standard Price("
												+ stdPriceInt + ")");
								$(this).addClass(errorFieldClass);
								addtooltip($(this),
										"New Price cannot exceed the Standard Price("
												+ stdPriceInt + ")");
								$(this).change(function() {
									$(this).removeClass(errorFieldClass);
									removetooltip($(this));
								});
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

						} else {
							$(this).val(newPrice);
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
			return flag;
		}

	};

	$.fn.sameDateValidation = function(startDate) {
		if ($(this).val().trim() != '' && startDate.val().trim() != '') {
			var dateDifference = diff(startDate.val(), $(this).val());
			if (dateDifference > 0) {
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
		}
		return true;
	};

	$.fn.oneMonthDateValidation = function(startDate) {
		if ($(this).val().trim() != '' && startDate.val().trim() != '') {
			var dateDifference = diff(startDate.val(), $(this).val());
			if (dateDifference > 31) {
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

	$.fn.required = function() {
		if ($(this).val().trim() == '') {
			$(this).addClass(errorFieldClass);
			addtooltip($(this), "Mandatory field.");
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
						if (e.which != 8 && e.which != 0
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

	$.fn.isValidPercentOrDecimal = function() {
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
												.indexOf('.') != -1)
										&& e.which != 37) {
									// display error message
									return false;
								}
								// should not allow percentage as well as dot
								// for same no and allow only two digits after
								// decimal
								if (hasDecimalPlace($(this).val(), 2)) {
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
								if (hasDecimalPlace($(this).val(), 2)) {
									return false;
								}

								if (parseInt($(this).val()) > 999) {
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

	$.fn.getJSON = function() {
		var isopenobj = false;
		isopenarray = false;
		var result = '';
		if (this.length > 1) {
			result = '[';
			isopenarray = true;
		}

		this.each(function() {
			if ($(this).attr("data-map") == 'obj') {
				result += '{';
				isopenobj = true;
			}
			var size = $(this).find('[data-item]').length;
			var i = 0;
			$(this).find('[data-item]').each(function() {
				i++;
				var val = '';
				if ($(this).is('input')) {
					val = $(this).val();
				} else if ($(this).find('input').length == 1) {
					val = $(this).find('input').val();
				} else if ($(this).is('select')) {
					val = $(this).val();
				} else if ($(this).find('select').length == 1) {
					val = $(this).find('select').val();
				} else {
					val = $(this).text();
				}
				result += '"' + $(this).attr('data-item') + '":"' + val + '"';
				if (i != size)
					result += ',';
			});
			if (isopenobj) {
				isopenobj = false;
				result += '}';
			}

		});
		if (isopenarray) {
			isopenarray = false;
			result += ']';
		}

		return $.parseJSON(result);

	};

}(jQuery));

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