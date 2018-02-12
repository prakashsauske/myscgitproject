var prevRes = '';
var recordCount;
var currentPage;
var NDF = "Sorry, no results found for your search criteria. Please try again.";
var materialArticle = '';
var supplierArticle = '';
var srcSupplyOption = '';
var optionSearchBy = '';
var data = '';
var extraInfo = '';
var convertList = [];
var totPages = 0;
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],select[name="department"],input[name="articleNo"],input[name="supplier"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="departmentHide"],input[name="artNoHide"],input[name="vendorNoHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"],select[name="department"],input[name="departmentList"],input[name="artNoHide"],input[name="supplier"]';
$(function() {

	// custom sort
	$.tablesorter.addParser({
		// set a unique id
		id : 'markdowns',
		is : function(s) {
			// return false so this parser is not auto detected
			// console.log("is column value : "+s);
			return false;
		},
		format : function(s, table, cell) {
			// format your data for normalization
			// var re = /<span class="right">(.*?)<\/span>/;
			// var re = /\d+(\.\d{1,2})?<span class="right">/;
			var re = /-?\d+(\.\d+)?/g;
			if (!$(cell).hasClass('exclSort')) {
				return Number($(cell).html().match(re)[0]);
			} else {
				return 0;
			}
		},
		// set type, either numeric or text
		type : 'numeric'
	});
	$.tablesorter.addParser({
		// set a unique id
		id : 'markdownsCurrency',
		is : function(s) {
			// return false so this parser is not auto detected
			// console.log("is column value : "+s);
			return false;
		},
		format : function(s, table, cell) {
			// format your data for normalization
			// var re = /<span class="right">(.*?)<\/span>/;
			// var re = /\d+(\.\d{1,2})?<span class="right">/;
			var re = /-?\d+(\.\d+)?/g;
			if (!$(cell).hasClass('exclSort')) {
				return Number($(cell).html().match(re)[0]);
			} else {
				return 0;
			}
		},
		// set type, either numeric or text
		type : 'numeric'
	});
	$('input[name="depH"]')
			.click(
					function() {
						if ($(this).is(':checked')) {
							visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="departmentList"]:checked,input[name="articleNo"],input[name="supplier"]';
							hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="departmentHide"],input[name="artNoHide"],input[name="vendorNoHide"]';
							// console.log("Checked");
						} else {
							visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],select[name="department"],input[name="articleNo"],input[name="supplier"]';
							hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="departmentHide"],input[name="artNoHide"],input[name="vendorNoHide"]';
							// console.log("Unchecked");
						}
					});
	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
	/*
	 * onClose : function(selectedDate) { $("#timeFrom").focus(); }
	 */

	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
	/*
	 * onClose : function(selectedDate) { $("#timeTo").focus(); }
	 */

	});
	//$('.print').parent().css('float', 'right').css('margin-top', '32px');
	/*
	 * $('#markFilterOpen').click(function() {
	 * $('#markFilterOpen').addClass('hideBlock');
	 * $('#markFilterClear').removeClass('hideBlock'); showmarkFilter(); });
	 * $('#markFilterClear').click(function() {
	 * $('#markFilterOpen').removeClass('hideBlock');
	 * $('#markFilterClear').addClass('hideBlock'); hidemarkFillter(); });
	 */

	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	$('#dateTo').val(presentDate);

	var previousDate = new Date();
	previousDate.setTime(previousDate.getTime() - (60 * 60 * 24 * 1000));

	var newPrevDate = previousDate.getDate();
	var newPrevMonth = previousDate.getMonth() + 1;

	if (newPrevDate < 10) {
		newPrevDate = '0' + newPrevDate;
	}
	if (newPrevMonth < 10) {
		newPrevMonth = '0' + newPrevMonth;
	}

	var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate
			.getFullYear());
	$('#dateFrom').val(oneDayBefCurDate);
	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		/* sortList: [ [ 0, 1 ]], */
		emptyTo : 'top',
		headers : {
			1 : {
				sorter : 'markdowns'
			},
			2 : {
				sorter : 'markdowns'
			},
			3 : {
				sorter : 'markdowns'
			},
			4 : {
				sorter : 'markdowns'
			},
			5 : {
				sorter : 'markdowns'
			},
			6 : {
				sorter : 'markdowns'
			},
			7 : {
				sorter : 'markdowns'
			},
			8 : {
				sorter : 'markdowns'
			},
			9 : {
				sorter : 'markdowns'
			},
			10 : {
				sorter : 'markdowns'
			},
			11 : {
				sorter : 'markdownsCurrency'
			},
			12 : {
				sorter : 'markdownsCurrency'
			}
		}
	});

	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if ($("#dialog-supplier-verify").dialog("isOpen")) {
				$('#goButtonSample1').click();
			} else {
				$('#generateReport').click();
			}

		}
	});

	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modal").parent().addClass("popupWrapper");
	$("#dialog-supplier-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

	$("#dialog-supplier-verify").parent().addClass("popupWrapper");

	$("#dialog-article-search").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});

	$("#dialog-article-search").parent().addClass("popupWrapper");

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$("#dialog-modal1").parent().addClass("popupWrapper");
	$('.department').click(
			function() {
				$('#department_1pos option[value="' + $(this).val() + '"]')
						.prop('selected', true);
			});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});
	$('#depH').click(function() {

		$('.catPrint').val('');
		$('.scPrint').val('');
		$('.segPrint').val('');
		$('.depPrint').text($('#department_1pos').val());
		$('#hiddenArticleNo').val('');
	});

	// Code to show and hide article heirarchy
	$('#department_1pos').change(
			function() {
				$(".hierarchyname").val(
						$(
								'#department_1pos option[value="'
										+ $("#department_1pos").val() + '"]')
								.text());

			});
	$('#depH').click(function() {
		if ($(this).is(':checked')) {
			$("#articleHierarchy").removeClass('hideBlock');
			$('#' + $('#department_1pos').val()).click();
			// $('#department_1pos').val('Select');
			$('#department_1pos').attr('disabled', 'disabled');
		} else {
			$("#articleHierarchy").addClass('hideBlock');
			$('#department_1pos').removeAttr('disabled');
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

	// code to initialise tree table
	$(".treetable").treetable({
		expandable : true
	});
	/*
	 * $("#searchArticle").click(function() { articleSearch(); });
	 */

	$("#generateReport")
			.click(
					function() {
						hideError();
						var dep = ($('#' + $('#department_1pos').val()).next() != undefined && $(
								'#' + $('#department_1pos').val()).next()
								.text() != undefined) ? $(
								'#' + $('#department_1pos').val()).next()
								.text().trim() : '';

						/* var dep = 'W1'+$('#department_1pos').val(); */
						var cat = ($(
								'#' + $('#categoryLst input:checked').val())
								.next() != undefined && $(
								'#' + $('#categoryLst input:checked').val())
								.next().text() != undefined) ? $(
								'#' + $('#categoryLst input:checked').val())
								.next().text().trim() : '';
						var sub = ($(
								'#' + $('#subCategoryLst  input:checked').val())
								.next() != undefined && $(
								'#' + $('#subCategoryLst  input:checked').val())
								.next().text() != undefined) ? $(
								'#' + $('#subCategoryLst  input:checked').val())
								.next().text().trim()
								: '';
						var seg = ($('#' + $('#segmentLst input:checked').val())
								.next() != undefined && $(
								'#' + $('#segmentLst input:checked').val())
								.next().text() != undefined) ? $(
								'#' + $('#segmentLst input:checked').val())
								.next().text().trim() : '';

						data = '';
						/*
						 * extraInfo = '&dep=' + dep + '&cat=' + cat + '&sub=' +
						 * sub + '&seg=' + seg;
						 */
						$("#dep").val(dep);
						$("#cat").val(cat);
						$("#sub").val(sub);
						$("#seg").val(seg);
						// console.log(extraInfo);
						optionSearchBy = $(
								'input:radio[name=searchByOptions]:checked')
								.val();

						$('.dept').val("");
						$('.cat').val("");
						$('.subCate').val("");
						$('.seg').val("");
						$("#hiddenArticleNo").val("");
						$("#artNoHide").val("");
						$("#vendorNoHide").val("");
						var fromDate = formateDate($('#dateFrom').val());
						var toDate = formateDate($('#dateTo').val());
						var start = $("#dateFrom").datepicker("getDate");
				        var end = $("#dateTo").datepicker("getDate");
				        var days = (end - start) / (1000 * 60 * 60 * 24);
						$('#dateToHide').text(toDate);
						$('#dateFromHide').text(fromDate);
						var today = new Date();
						var newDate = today.getDate();
						var newMonth = today.getMonth();
						var newYear = today.getFullYear();
						var curDate = new Date(newYear, newMonth, newDate);
						var date1 = new Date();

						var parts = fromDate.split('/');
						var partsLen = parts.length;
						var date1Len = fromDate.length;
						date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
						var newTime = Number(date1.getTime());

						var dateComFrom = new Date(fromDate.split('/')[2],
								fromDate.split('/')[1], fromDate.split('/')[0]);
						var dateComTo = new Date(toDate.split('/')[2], toDate
								.split('/')[1], toDate.split('/')[0]);
						var toYear = dateComTo.getFullYear();
						var fromYear = dateComFrom.getFullYear();
						var toMonth = dateComTo.getMonth();
						var fromMonth = dateComFrom.getMonth();
						var toDay = dateComTo.getDate();
						var fromDay = dateComFrom.getDate();
						var rangeDate = new Date(toDate.split('/')[2], toDate
								.split('/')[1] - 1, toDate.split('/')[0]);

						var date2 = new Date();
						var part = toDate.split('/');
						var partLen = part.length;
						var date2Len = toDate.length;
						date2.setFullYear(part[2], part[1] - 1, part[0]);

						var splittedDate = formateDate($('#dateTo').val(),
								$('#dateTo').val().split('/').length)
								.split('/');
						var splittedTwo = splittedDate[0] + splittedDate[1]
								+ splittedDate[2];

						newTime = Number(newTime)
								+ Number(24 * 60 * 60 * 1000 * 90);

						$('.catPrint').val('');
						$('.scPrint').val('');
						$('.segPrint').val('');
						$('.depPrint').text($('#department_1pos').val());
						if (fromDate == "") {
							showError('Please enter From Date.');
							callFrom();
						} else if (toDate == "") {
							showError('Please enter To Date.');
							callTo();
						} else if (partsLen != 3 || date1Len != 10
								|| fromDate.split('/')[0] > 31
								|| fromDate.split('/')[1] > 12
								|| fromDate.split('/')[2].length != 4) {
							showError('Invalid From Date.');
							callFrom();
						} else if (partLen != 3 || date2Len != 10
								|| toDate.split('/')[0] > 31
								|| toDate.split('/')[1] > 12
								|| toDate.split('/')[2].length != 4) {
							showError('Invalid To Date.');
							callTo();
						} else if (date1.getTime() > date2.getTime()) {
							showError('To Date should not be lesser than the From Date');
							callTo();
						}
						else if(days >6){
							showError('Date Range is more than one week.');
							callFrom();
						}
						else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
								|| isNaN(splittedTwo)) {

							showError("Invalid Date Format");
						}
						
						else if (rangeDate > curDate) {
							showError("Future Dates are not allowed for To Date.");
							callTo();
						}
						
						else if ((toYear - fromYear) == 1) {
							if (((toMonth - fromMonth) + 12) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ((((toMonth - fromMonth) + 12) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ($('#department_1pos').val() == 'Select') {
								showError('Please select a Department');
							} else {
								/*
								 * data = $('#markdownDetails').serialize() +
								 * encodeURI(extraInfo);
								 * markdownDetailsData(data);
								 */
								/* data = $('#articleNo').val(); */
								if ($('input:radio[name=sourceSupply]:checked')
										.val() == 'all') {
									supplierArticle = '';
								} else {
									supplierArticle = $('#supplier').val();
								}

								if (check()) {
									articleSearch();

								} else if ($('#articleNo').val().trim() != ""
										&& $('#number').is(':checked')
										&& isNaN($('#articleNo').val().trim())) {
									showAlert("Invalid Article No.");
								} else if ($('#articleNo').val().trim() != ""
										&& $('#number').is(':checked')
										&& !isNaN($('#articleNo').val().trim())) {
									articleSearch();
								} else if ($('#articleNo').val().trim() != ""
										&& $('#description').is(':checked')
										&& !isNaN($('#articleNo').val().trim())) {
									showAlert("Invalid Article No.");
								} else if ($('#articleNo').val().trim() != ""
										&& $('#description').is(':checked')
										&& isNaN($('#articleNo').val().trim())) {
									articleSearch();
								}

								else if ($('#articleNo').val().trim() != ""
										&& $('#reference').is(':checked')) {

									articleSearch();
								} else if ($("#supplier").val() != ""
										&& $('#verifyLabel').hasClass(
												'hideBlock')) {
									showAlert("Please click the verify button and verify the valid vendor no.");
								} else {
									if (!$('#dialog-modal').dialog("isOpen")) {
										materialArticle = $('#articleNo').val();
										data = $('#markdownDetails')
												.serialize()
												+ encodeURI(extraInfo);
										markdownDetailsData(data);
										$('#hiddenArticleNo').val(
												$('#articleNo').val());
										hiddenVar();
									}
								}

							}
						} else if (toYear - fromYear == 0) {
							if ((toMonth - fromMonth) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if (((toMonth - fromMonth) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ($('#department_1pos').val() == 'Select') {
								showError('Please select a Department');
							} else {
								/*
								 * data = $('#markdownDetails').serialize() +
								 * encodeURI(extraInfo);
								 * markdownDetailsData(data);
								 */
								/* data = $('#articleNo').val(); */
								if ($('input:radio[name=sourceSupply]:checked')
										.val() == 'all') {
									supplierArticle = '';
								} else {
									supplierArticle = $('#supplier').val();
								}

								if (check()) {
									articleSearch();

								} else if ($('#articleNo').val().trim() != ""
										&& $('#number').is(':checked')
										&& isNaN($('#articleNo').val().trim())) {
									showAlert("Invalid Article No.");
								} else if ($('#articleNo').val().trim() != ""
										&& $('#number').is(':checked')
										&& !isNaN($('#articleNo').val().trim())) {
									articleSearch();
								} else if ($('#articleNo').val().trim() != ""
										&& $('#description').is(':checked')
										&& !isNaN($('#articleNo').val().trim())) {
									showAlert("Invalid Article No.");
								} else if ($('#articleNo').val().trim() != ""
										&& $('#description').is(':checked')
										&& isNaN($('#articleNo').val().trim())) {
									articleSearch();
								} else if ($('#articleNo').val().trim() != ""
										&& $('#reference').is(':checked')) {
									// flag=false;
									articleSearch();
								} else if ($("#supplier").val() != ""
										&& $('#verifyLabel').hasClass(
												'hideBlock')) {
									showAlert("Please click the verify button and verify the valid vendor no.");
								} else {
									if (!$('#dialog-modal').dialog("isOpen")) {

										materialArticle = $('#articleNo').val();
										data = $('#markdownDetails')
												.serialize()
												+ encodeURI(extraInfo);
										markdownDetailsData(data);
										$('#hiddenArticleNo').val(
												$('#articleNo').val());
										hiddenVar();
									}

								}

							}
						} else if ((toYear - fromYear) >= 2) {
							showError('Date difference should not be greater than 3 months');
							callFrom();
						} else if ($('#department_1pos').val() == 'Select') {
							showError('Please select a Department');
						}

						else {

							/*
							 * data = $('#markdownDetails').serialize() +
							 * encodeURI(extraInfo); markdownDetailsData(data);
							 */
							if ($('input:radio[name=sourceSupply]:checked')
									.val() == 'all') {
								supplierArticle = '';
							} else {
								supplierArticle = $('#supplier').val();
							}

							if (check()) {
								articleSearch();

							} else if ($('#articleNo').val().trim() != ""
									&& $('#number').is(':checked')
									&& isNaN($('#articleNo').val().trim())) {
								showAlert("Invalid Article No.");
							} else if ($('#articleNo').val().trim() != ""
									&& $('#number').is(':checked')
									&& !isNaN($('#articleNo').val().trim())) {
								articleSearch();
							} else if ($('#articleNo').val().trim() != ""
									&& $('#description').is(':checked')
									&& !isNaN($('#articleNo').val().trim())) {
								showAlert("Invalid Article No.");
							} else if ($('#articleNo').val().trim() != ""
									&& $('#description').is(':checked')
									&& isNaN($('#articleNo').val().trim())) {
								articleSearch();
							} else if ($('#articleNo').val().trim() != ""
									&& $('#reference').is(':checked')) {
								// flag=false;
								articleSearch();
							} else if ($("#supplier").val() != ""
									&& $('#verifyLabel').hasClass('hideBlock')) {
								showAlert("Please click the verify button and verify the valid vendor no.");
							} else {
								if (!$('#dialog-modal').dialog("isOpen")) {
									materialArticle = $('#articleNo').val();
									data = $('#markdownDetails').serialize()
											+ encodeURI(extraInfo);
									markdownDetailsData(data);
									$('#hiddenArticleNo').val(
											$('#articleNo').val());
									hiddenVar();
								}
							}
						}// hideError();

					});

	$("#closeLink").click(function() {
		$('#accordion').accordion({
			active : true
		});

	});

	$(".backBtn").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	/* $("#supplier").attr('readonly', 'readonly'); */
	/*
	 * $("#all").click(function() { $('#supplier').val('');
	 * $("#supplier").attr('readonly', 'readonly');
	 * $('#verifyLabel').addClass('hideBlock'); });
	 * 
	 * $("#warehouse,#vendor").click(function() { $('#supplier').val('');
	 * $("#supplier").removeAttr('readonly'); $('#supplier').focus();
	 * $('#verifyLabel').addClass('hideBlock'); });
	 */
	$("#verifySupplier")
			.click(
					function() {
						hideError();
						var radioSelected = "vendor";
						/*
						 * var radioSelected = getRadioValue('sourceSupply'); if
						 * (radioSelected == "vendor" || radioSelected ==
						 * "warehouse" || radioSelected == "store") {
						 */
						var vendorNo = $('#supplier').val().split("-")[0];
						var vendorName = $('#supplier').val().split("-")[1];
						var sourceSupply = "vendor";
						/*
						 * if (sourceSupply == 'store') {
						 * 
						 * nearbyStore(vendorNo, vendorName, sourceSupply); }
						 */

						if (($('#supplier').val() != '' && $('#supplier').val() != 'Enter supplier no. or name')) {
							$
									.ajax({
										type : "GET",
										url : "autocompletePOS.htm",
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
											$(".total-count-list-vendr").text(
													$("#sizeCheck").val());
											$(".searchStringVendr").text(
													$('#supplier').val());
											if ($('#sizeCheck').val() == 0) {
												showAlert('Invalid Supplier.',
														'supplier');
												$('#verifyLabel').addClass(
														'hideBlock');
											} else if ($('#sizeCheck').val() > 0) {
												if (!$(
														"#dialog-supplier-verify")
														.dialog("isOpen")) {
													$('#vendorDesc').val(
															$('#supplier')
																	.val());
													$("#dialog-supplier-verify")
															.parent()
															.addClass(
																	"popupWrapper");
													$("#dialog-supplier-verify")
															.removeClass(
																	'hideBlock')
															.dialog("open");
													$("#searchWarning")
															.addClass(
																	'hideBlock');
													$("#popupSearch")
															.removeClass(
																	'hideBlock');
												}
											} else {
												if (radioSelected == "vendor") {
													$("#supplier")
															.val(
																	Number($(
																			"#suppNo0")
																			.text()));
													$('#verifyLabel')
															.removeClass(
																	'hideBlock');
												} else {
													$("#supplier").val(
															$("#suppNo0")
																	.text());
													$('#verifyLabel')
															.removeClass(
																	'hideBlock');
												}
											}
											stopLoading();
										}
									});
						} else {
							showAlert('Please fill supplier field. ',
									'supplier');
							$('#verifyLabel').addClass('hideBlock');
						}
						// }

					});
	$("#goButtonSample1").click(function() {
		hideError();
		var vendorNo = $('#vendorDesc').val().split("-")[0];
		var vendorName = $('#vendorDesc').val().split("-")[1];
		var sourceSupply = $('input:radio[name=sourceSupply]:checked').val();

		$.ajax({
			type : "GET",
			url : "autocompletePOS.htm",
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
			}
		});

	});

	$('#closeLink').click(function() {
		// hideContent();
		closeAccordian();
	});
	$('.hierarchyWrapper input[type=radio]').click(function() {
		$('.hierarchyname').val($(this).next().text());
	});
	// Code to show and hide article heirarchy
	$('#department_1pos').change(
			function() {
				$(".hierarchyname").val(
						$(
								'#department_1pos option[value="'
										+ $("#department_1pos").val() + '"]')
								.text());

			});
	$('#depH').click(function() {
		if ($(this).is(':checked')) {
			$("#articleHierarchy").removeClass('hideBlock');
			// $('#' + $('#department_1pos').val()).click();
			// $('#department_1pos').val('Select');
			$('#department_1pos').attr('disabled', 'disabled');
		} else {
			$("#articleHierarchy").addClass('hideBlock');
			$('#department_1pos').removeAttr('disabled');
		}
		hideError();
	});

	/*----------------******  Department Click function   *****--------------- */
	$("#deptLstCnt").text($("#deptlst li").size());
	deptFlag = "Null";
	var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {

						$('.depPrint').text($(this).next().text());
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

						bindDynaCtrlInputChange('input[name="category"]',
								'input[name="category"]:checked',
								'input[name="categoryListHdn"]');

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

	$('#supplier').keyup(function() {
		hideError();
		$("#verifyLabel").addClass('hideBlock');
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
							var categoryValuePrint = $(selectedValueId).attr(
									'id');
							// console.log($('#' + categoryValuePrint).val());
							$('.catPrint').text(
									$('#' + categoryValuePrint).val());
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
																	function(
																			item) {
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
													$('#segmentBtn')
															.removeClass(
																	'hideBlock');
												}
												subCategory();
											});

							// }
							bindDynaCtrlInputChange('input[name="subCat"]',
									'input[name="subCat"]:checked',
									'input[name="subCategoryListHdn"]');
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
							var subCatPrint = $(selectedValueId).attr('id');
							$('.scPrint').text($('#' + subCatPrint).val());
							// console.log($('#' + subCatPrint).val());
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
																	function(
																			item) {

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

													$('#segmentBtn')
															.removeClass(
																	'hideBlock');

												}
												segment();
											});

							// }

							bindDynaCtrlInputChange('input[name="segme"]',
									'input[name="segme"]:checked',
									'input[name="segmentListHdn"]');
						});// subcat
		/*----------------******  End SubCategory Click function   *****--------------- */
	}

	$(".sortTable .hdrMain th")
			.click(
					function() {
						if ($(".sortTable thead th").hasClass(
								'tablesorter-headerAsc')) {
							updateSortPlugin();

							setTimeout(function() {

								var sorting = [ [ 0, 0 ] ];
								// sort on the first column
								$(".sortTable")
										.trigger("sortList", [ sorting ]);

							}, 30);
						} else if ($(".sortTable thead th").hasClass(
								'tablesorter-headerDesc')) {
							updateSortPlugin();

							setTimeout(function() {

								var sorting2 = [ [ 1, 1 ] ];
								// sort on the first column
								$(".sortTable").trigger("sortList",
										[ sorting2 ]);

							}, 30);
						}

					});

});
function segment() {
	$(".segment")

	.click(function() {

		var selectedValueId = "#" + this.id;

		var segmentPrint = $(selectedValueId).attr('id');
		$('.segPrint').text($('#' + segmentPrint).val());
		// console.log($('#' + segmentPrint).val());
		bindDynaCtrlInputChange();
	});
}
function hiddenVar() {
	$("#artNoHide").val($('#articleNo').val());
	$("#vendorNoHide").val($('#supplier').val());

}

function markdownDetailsData(data) {

	backupInputParams();
	$
			.ajax({
				type : "get",
				url : "getMarkdownDetails.htm",
				data : {
					dateFrom : $('#dateFrom').val(),
					dateTo : $('#dateTo').val(),
					departmentList : ($('#departmentList input:checked').val() != undefined ? $(
							'#departmentList input:checked').val()
							: ''),
					category : ($('#categoryLst input:checked').val() != undefined ? $(
							'#categoryLst input:checked').val()
							: ''),
					subCat : ($('#subCategoryLst input:checked').val() != undefined ? $(
							'#subCategoryLst input:checked').val()
							: ''),
					segme : ($('#segmentLst input:checked').val() != undefined ? $(
							'#segmentLst input:checked').val()
							: ''),
					depH : ($('#depH').is(':checked') ? 'deph' : null),
					department : ($('#department_1pos').val()),
					dep : (($('#' + $('#department_1pos').val()).next() != undefined && $(
							'#' + $('#department_1pos').val()).next().text() != undefined) ? $(
							'#' + $('#department_1pos').val()).next().text()
							.trim()
							: ''),
					cat : (($('#' + $('#categoryLst input:checked').val())
							.next() != undefined && $(
							'#' + $('#categoryLst input:checked').val()).next()
							.text() != undefined) ? $(
							'#' + $('#categoryLst input:checked').val()).next()
							.text().trim() : ''),
					sub : (($('#' + $('#subCategoryLst  input:checked').val())
							.next() != undefined && $(
							'#' + $('#subCategoryLst  input:checked').val())
							.next().text() != undefined) ? $(
							'#' + $('#subCategoryLst  input:checked').val())
							.next().text().trim() : ''),
					seg : (($('#' + $('#segmentLst input:checked').val())
							.next() != undefined && $(
							'#' + $('#segmentLst input:checked').val()).next()
							.text() != undefined) ? $(
							'#' + $('#segmentLst input:checked').val()).next()
							.text().trim() : ''),
					materialArticle : materialArticle,
					supplierArticle : supplierArticle
				},
				beforeSend : function() {
					// startLoading();
					fullScreenLoader();
					// hideAllocationTbl();
				},
				success : function(response) {

					formMarkdownDetailsContent(response, '');
					prevRes = convertList;
					// printResult(response);

					// stopLoading();
					$.loader('close');
					setScrollerPosition($("#sortTable"), $("#previous-column"),
							$("#next-column"));
				},
				error : function(response) {
					showError('Technical issue occured.');
					// stopLoading();
					$.loader('close');
				}
			});
}
function check() {
	var depFlag = false;
	if ($('#depH').is(':checked')) {
		$('#deptlst li .department').each(function() {
			if ($(this).prop('checked'))
				depFlag = true;
		});
	}
	if (($('#articleNo').val().trim() == '' && ($('#department_1pos').val() == 'Select' && (!($('#depH')
			.is(':checked')) || ($('#depH').is(':checked') && !depFlag))))) {
		// $('#next').removeClass('jw-button-next');
		// flag=false;
		showAlert('Article/Department required, please select valid article/department');
		return false;
	} else if ($('#articleNo').val().trim() != ""
			&& $('#number').is(':checked')
			&& isNaN($('#articleNo').val().trim())) {
		// flag=false;
		showAlert('Please enter a valid article number.');
		$('#articleNo').focus();
		return false;

	}
}

function articleSearch() {

	var articleSearchValue = $('#articleNo').val();
	// console.log($('#articleNo').val());
	var flagRef = false;
	// $('#hiddenArticleNo').val($('#articleNo').val());

	var optionsArticle = $('input:radio[name=searchByOptions]:checked').val();
	$
			.ajax({
				type : "GET",
				url : "articleSearch.htm",
				data : {
					articleSearchValue : articleSearchValue,
					optionsArticle : optionsArticle
				},

				beforeSend : function() {
					// startLoading();
					fullScreenLoader();

					// hideAllocationTbl();
				},
				success : function(response) {

					$('#popupDataDivArticle').html(response);
					if (response == null && response == undefined
							&& response != "") {
						showAlert('Invalid Article No.', 'supplier');
						$('#hiddenVerified').val("");
					}
					$(".total-count-list").text($("#sizeCheckArticle").val());
					$(".searchString").text(articleSearchValue);
					if ($('#sizeCheckArticle').val() == 0) {
						showAlert('Invalid Article No.', 'supplier');
						$('#hiddenVerified').val("");
					} else if ($('#sizeCheckArticle').val() > 1) {
						if (!$("#dialog-article-search").dialog("isOpen")) {
							$('#vendorDesc').val($('#articleNo').val());
							$("#dialog-article-search").parent().addClass(
									"popupWrapper");
							$("#dialog-article-search")
									.removeClass('hideBlock').dialog("open");
							$("#searchWarning").addClass('hideBlock');
							$("#popupSearch").removeClass('hideBlock');
							$.loader('close');
						}

					} else if ($('#reference').is(':checked')
							&& $('#sizeCheckArticle').val() == 1) {
						if (!$("#dialog-article-search").dialog("isOpen")) {
							$('#vendorDesc').val($('#articleNo').val());
							$("#dialog-article-search").parent().addClass(
									"popupWrapper");
							$("#dialog-article-search")
									.removeClass('hideBlock').dialog("open");
							$("#searchWarning").addClass('hideBlock');
							$("#popupSearch").removeClass('hideBlock');

							$.loader('close');
						}
						flagRef = true;
					}

					else if ($('#sizeCheckArticle').val() == 1) {
						// $('#hiddenVerified').val("Verfied");
						if ($('#description').is(':checked')
								&& !$("#dialog-article-search")
										.dialog("isOpen")
								&& !$('#dialog-modal').dialog('isOpen')) {// &&
							// !$('#dialog-modal').dialog('isOpen')
							$('#vendorDesc').val($('#articleNo').val());
							$("#dialog-article-search").parent().addClass(
									"popupWrapper");
							$("#dialog-article-search")
									.removeClass('hideBlock').dialog("open");
							$("#searchWarning").addClass('hideBlock');
							$("#popupSearch").removeClass('hideBlock');
							$.loader('close');
							/*
							 * materialArticle = $('#articleNo').val(); data =
							 * $('#markdownDetails').serialize() +
							 * encodeURI(extraInfo); markdownDetailsData(data);
							 */
							hiddenVar();
						} else if ($('#number').is(':checked')
								&& !$("#dialog-article-search")
										.dialog("isOpen")) {
							materialArticle = $('#articleNo').val();
							data = $('#markdownDetails').serialize()
									+ encodeURI(extraInfo);
							markdownDetailsData(data);
							hiddenVar();
						}
					}
					if ($('#reference').is(':checked')
							&& $('#sizeCheckArticle').val() == 1
							&& flagRef == true) {
						if (!$("#dialog-article-search").dialog("isOpen")
								&& !$('#dialog-modal').dialog('isOpen')) {
							fullScreenLoader();
							materialArticle = $('#hiddenArticleNo').val();
							data = $('#markdownDetails').serialize()
									+ encodeURI(extraInfo);
							markdownDetailsData(data);
							hiddenVar();
						} else if ($("#dialog-article-search").dialog("isOpen")) {
							$(".linkBtn1").click(
									function() {

										var id = $(this).attr("id");
										$("#hiddenArticleNo").val(
												$("#artNo" + id + "").text());
										fullScreenLoader();
										materialArticle = $('#hiddenArticleNo')
												.val();
										data = $('#markdownDetails')
												.serialize()
												+ encodeURI(extraInfo);
										markdownDetailsData(data);
										hiddenVar();

									});
						}
					}
					if (($('#description').is(':checked') && $(
							"#dialog-article-search").dialog("isOpen"))
							|| ($('#number').is(':checked')
									&& $('#sizeCheckArticle').val() > 1 && $(
									"#dialog-article-search").dialog("isOpen"))
							|| ($('#reference').is(':checked')
									&& $('#sizeCheckArticle').val() > 1 && $(
									"#dialog-article-search").dialog("isOpen"))) {
						$(".linkBtn1").click(
								function() {
									var id = $(this).attr("id");
									$("#hiddenArticleNo").val(
											$("#artNo" + id + "").text());
									fullScreenLoader();
									materialArticle = $('#hiddenArticleNo')
											.val();
									data = $('#markdownDetails').serialize()
											+ encodeURI(extraInfo);
									markdownDetailsData(data);
									hiddenVar();

								});
					}

					/*
					 * else { $("#articleNo").val( $("#suppNo").text() + "-" +
					 * $("#suppName").text()); }
					 */

				},
				error : function(response) {
					showAlert('Invalid Article No.', 'supplier');
					// stopLoading();
					$('hiddenVerified').val("");
					$.loader('close');
				}
			});
}
function formMarkdownDetailsContent(response, value) {

	$('#hiddenVerified').val('');
	var output = $.parseJSON(response);
	var markdownDetails = output.data;
	var msg = output.msg;

	var priceTot = 0;
	var staffTot = 0;
	var loyaltyTot = 0;
	var promoTot = 0;
	var adverTot = 0;
	var scanPTot = 0;
	var compTot = 0;
	var splActvtyTot = 0;
	var clearTot = 0;
	var totMark = 0;
	var dfrdLyltTot = 0;
	var totAftrDfrdLylt = 0;
	

	convertList = [];
	var flag = false;
	var noRec = 0;
	if (msg == '' && markdownDetails != null && markdownDetails != undefined) {
		var content = '';

		setReportGenerationFlags();
		if (markdownDetails != null) {
			var k = 1;
			var j = 1;
			var s = 0;

			var totMarkdownCount;
			var totMarkdownTotal;
			var totDfrdMarkdownCount;
			var totDfrdMarkdownTotal;
			/*
			 * for ( var m in markdownDetails) {
			 * 
			 * var listForm = markdownDetails[m]; convertList.push(listForm[0]);
			 * console.log(convertList); }
			 */
			convertList = markdownDetails;
			for ( var i = 0; i < convertList.length; i++) {

				list = convertList;
				totMarkdownCount = 0;
				totMarkdownTotal = 0;
				totDfrdMarkdownCount = 0;
				totDfrdMarkdownTotal = 0;
				noRec++;

				list[i].priceOverrideRTC = (list[i].priceOverrideRTC != null && list[i].priceOverrideRTC != undefined) ? Number(
						list[i].priceOverrideRTC).toFixed(2)
						: '';
				list[i].clearance = (list[i].clearance != null && list[i].clearance != undefined) ? Number(
						list[i].clearance).toFixed(2)
						: '';
				list[i].advertisements = (list[i].advertisements != null && list[i].advertisements != undefined) ? Number(
						list[i].advertisements).toFixed(2)
						: '0.00';
					list[i].scanningPolicy = (list[i].scanningPolicy != null && list[i].advertisements != undefined) ? Number(
								list[i].scanningPolicy).toFixed(2)
								: '0.00';
				list[i].staffDiscount = (list[i].staffDiscount != null && list[i].staffDiscount != undefined) ? Number(
						list[i].staffDiscount).toFixed(2)
						: '';
				list[i].loyalty = (list[i].loyalty != null && list[i].loyalty != undefined) ? Number(
						list[i].loyalty).toFixed(2)
						: '';

				list[i].promotions = (list[i].promotions != null && list[i].promotions != undefined) ? Number(
						list[i].promotions).toFixed(2)
						: '';
			    list[i].comp = (list[i].comp != null && list[i].comp != undefined) ? Number(
								list[i].comp).toFixed(2)
								: '';
				list[i].splActivity = (list[i].splActivity != null && list[i].splActivity != undefined) ? Number(
										list[i].splActivity).toFixed(2)
										: '';

				list[i].priceOverrideQty = (list[i].priceOverrideQty != null && list[i].priceOverrideQty != undefined) ? Number(
						list[i].priceOverrideQty).toFixed(2)
						: '';

				list[i].deferedLoyalty = (list[i].deferedLoyalty != null && list[i].deferedLoyalty != undefined) ? Number(
						list[i].deferedLoyalty).toFixed(2)
						: '';

				flag = true;
				totMarkdownCount = Number(list[i].priceTransSet)
						+ Number(list[i].clearTransSet)+ Number(list[i].adverTransSet)
						+ Number(list[i].scanPTransSet)
						+ Number(list[i].loyaltyTransSet)
						+ Number(list[i].promotionsTransSet)
						+ Number(list[i].compTransSet)
						+ Number(list[i].splActivityTransSet)
						+ Number(list[i].staffTransSet);
				totMarkdownTotal = Number(list[i].priceOverrideRTC)
						+ Number(list[i].clearance)+ Number(list[i].advertisements)+ Number(list[i].scanningPolicy)
						+ Number(list[i].staffDiscount) + Number(list[i].comp)
						+ Number(list[i].splActivity)
						+ Number(list[i].loyalty) + Number(list[i].promotions);
				totDfrdMarkdownCount = totMarkdownCount
						+ Number(list[i].deferedLoyaltySet);
				totDfrdMarkdownTotal = totMarkdownTotal
						+ Number(list[i].deferedLoyalty);

				s = s + 1;
				content += '<tr id="' + i + '" class="collapsed parentTr page-'
						+ k;
				if (j > 10)
					content += ' hideBlock ';
				content += ' ">' + '<td  class="">' + list[i].mapKey + '</td>'
						+ '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].priceTransSet
						+ '<span class="right">' + list[i].priceOverrideRTC
						+ '</span></td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].clearTransSet
						+ '<span class="right">' + list[i].clearance + '</td>'
						+ '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].adverTransSet
						+ '<span class="right">' + list[i].advertisements
						+ '</td>' +  '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].scanPTransSet
						+ '<span class="right">' + list[i].scanningPolicy
						+ '</td>' +'<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].staffTransSet
						+ '<span class="right">' + (list[i].staffDiscount)
						+ '</span></td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].loyaltyTransSet
						+ '<span class="right">' + (list[i].loyalty) + '</td>'
						+ '</span><td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].promotionsTransSet
						+ '<span class="right">' + (list[i].promotions)
						+ '</span><td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].compTransSet
						+ '<span class="right">' + (list[i].comp)
						+ '</span><td>&nbsp;&nbsp;&nbsp;&nbsp;' + list[i].splActivityTransSet
						+ '<span class="right">' + (list[i].splActivity)
						+ '</span></td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;' + totMarkdownCount
						+ '<span class="right">' + totMarkdownTotal.toFixed(2)
						+ '</span></td>' + '<td>' + '<span class="right">'
						+ (list[i].deferedLoyalty) + '</span></td>';

				content += '<td class="lastColumn">' + '<span class="right">'
						+ totDfrdMarkdownTotal.toFixed(2) + '</span></td></tr>';

				priceTot += Number(list[i].priceOverrideRTC);
				clearTot += Number(list[i].clearance);
				adverTot += Number(list[i].advertisements);
				scanPTot += Number(list[i].scanningPolicy);
				staffTot += Number(list[i].staffDiscount);
				loyaltyTot += Number(list[i].loyalty);
				promoTot += Number(list[i].promotions);
				compTot += Number(list[i].comp);
				splActvtyTot += Number(list[i].splActivity);
				totMark += Number(totMarkdownTotal);
				dfrdLyltTot += Number(list[i].deferedLoyalty);
				totAftrDfrdLylt += Number(totDfrdMarkdownTotal);
				
				
				if (j % 10 == 0) {
					k++;
				}
				j++;
				// }

				// content += '</tbody>';
				// printResult(convertList);
			}
			totPages = Math.ceil(noRec / 10);
			$('#sortTable tbody:first').html('');
			$('#sortTable tbody:first').html(content);

			showContentMarkdownDetailsBlock();
			// $('.pric').text(priceTot);
			closeAccordian();
			recordCount = s;
			currentPage = 1;
			if (recordCount > 10) {

				$('.paginationDiv').pagination({
					items : recordCount,
					itemsOnPage : 10,
					cssStyle : 'compact-theme',
					currentPage : currentPage,
					onPageClick : function(pageNo) {

						closeAccordian();
						currentPage = pageNo;
						var pageClass = 'page-' + pageNo;
						$('.parentTr').filter(function() {
							if ($(this).hasClass(pageClass)) {
								$(this).removeClass('hideBlock');
								// $('.parentTr').removeClass('hideBlock');
							} else
								$(this).addClass('hideBlock');

						});

						$('.childTr').addClass('hideBlock');
						$('.parentTr').removeClass('expanded');
						pagenationCallbackMethod(pageNo);
					}

				});

				$(' .paginationWrapper').removeClass('hideBlock');

			} else {
				$(' .paginationWrapper').addClass('hideBlock');
				pagenationCallbackMethod(1);
			}

		}

		// pagenationCallbackMethod();
		$('.pric').text(priceTot.toFixed(2));
		$('.clea').text(clearTot.toFixed(2));
		$('.adver').text(adverTot.toFixed(2));
		$('.scanp').text(scanPTot.toFixed(2));
		$('.staf').text(staffTot.toFixed(2));
		$('.loya').text(loyaltyTot.toFixed(2));
		$('.prom').text(promoTot.toFixed(2));
		$('.comp').text(compTot.toFixed(2));
		$('.splActivity').text(splActvtyTot.toFixed(2));
		$('.tota').text(totMark.toFixed(2));
		
		
		$('.dfrdLylt').text(dfrdLyltTot.toFixed(2));
		$('.totAftrDfrdLylt').text(totAftrDfrdLylt.toFixed(2));

		if (flag) {
			updateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ] ];
				// sort on the first column
				$(".sortTable").trigger("sorton", [ sorting ]);
			}, 30);

		} else {
			$('.paginationDiv ').addClass('hideBlock');
		}
		/*
		 * updateSortPlugin(); var sorting = [ [ 0, 0 ] ];
		 * 
		 * $(".sortTable").trigger("sorton", [ sorting ]);
		 */

	} else {
		if (msg == null) {
			showError('Technical issue occurred. Please contact technical support.');
		} else if (msg == 'No Data Found.' || msg == NDF) {
			showWarning(NDF);
		} else if (msg == '') {
			showWarning(NDF);
		} else {
			showError(msg);
		}
	}

}
function pagenationCallbackMethod(pageNo) {

	if (pageNo == undefined || pageNo == null) {
		pageNo = 1;
	}
	var pricFtr = 0;
	var cleaFtr = 0;
	var adverFtr = 0;
	var scanPFtr = 0;
	var stafFtr = 0;
	var loyaFtr = 0;
	var compFtr = 0;
	var splActivityFtr = 0;
	var promFtr = 0;
	var totaFtr = 0;
	
	var pricFtrCount = 0;
	var cleaFtrCount = 0;
	var adverFtrCount = 0;
	var scanPFtrCount = 0;
	var stafFtrCount = 0;
	var loyaFtrCount = 0;
	var compFtrCount = 0;
	var splActivityFtrCount = 0;
	var promFtrCount = 0;
	var totaFtrCount = 0;
	
	
	var dfrdLyltFtr = 0;
	var totAftrDfrdLyltFtr = 0;
	var re = /-?\d+(\.\d+)?/g;
	$('.parentTr').filter(
			function() {
				// console.log($(this).children(':nth-child(2)').html());
				pricFtr += Number($(this).children(':nth-child(2)').html()
						.match(re)[1]);
				cleaFtr += Number($(this).children(':nth-child(3)').html()
						.match(re)[1]);
				adverFtr += Number($(this).children(':nth-child(4)').html()
						.match(re)[1]);
				scanPFtr += Number($(this).children(':nth-child(5)').html()
						.match(re)[1]);
				stafFtr += Number($(this).children(':nth-child(6)').html()
						.match(re)[1]);
				loyaFtr += Number($(this).children(':nth-child(7)').html()
						.match(re)[1]);
				promFtr += Number($(this).children(':nth-child(8)').html()
						.match(re)[1]);
				compFtr += Number($(this).children(':nth-child(9)').html()
						.match(re)[1]);
				splActivityFtr += Number($(this).children(':nth-child(10)').html()
						.match(re)[1]);
				totaFtr += Number($(this).children(':nth-child(11)').html()
						.match(re)[1]);
				dfrdLyltFtr += Number($(this).children(':nth-child(12)').html()
						.match(re)[0]);
				totAftrDfrdLyltFtr += Number($(this).children(':nth-child(13)')
						.html().match(re)[0]);
			});
	
	$('.parentTr').filter(
			function() {
				// console.log($(this).children(':nth-child(2)').html());
				pricFtrCount += Number($(this).children(':nth-child(2)').html()
						.match(re)[0]);
				cleaFtrCount += Number($(this).children(':nth-child(3)').html()
						.match(re)[0]);
				adverFtrCount += Number($(this).children(':nth-child(4)').html()
						.match(re)[0]);
				scanPFtrCount += Number($(this).children(':nth-child(5)').html()
						.match(re)[0]);
				stafFtrCount += Number($(this).children(':nth-child(6)').html()
						.match(re)[0]);
				loyaFtrCount += Number($(this).children(':nth-child(7)').html()
						.match(re)[0]);
				promFtrCount += Number($(this).children(':nth-child(8)').html()
						.match(re)[0]);
				compFtrCount += Number($(this).children(':nth-child(9)').html()
						.match(re)[0]);
				splActivityFtrCount += Number($(this).children(':nth-child(10)').html()
						.match(re)[0]);
				totaFtrCount += Number($(this).children(':nth-child(11)').html()
						.match(re)[0]);
				
			});
	
	
	
	/*$('.pricFtr').text(pricFtr.toFixed(2));

	$('.cleaFtr').text(cleaFtr.toFixed(2));
	$('.adverFtr').text(adverFtr.toFixed(2));
	$('.scanPFtr').text(scanPFtr.toFixed(2));
	$('.stafFtr').text(stafFtr.toFixed(2));
	$('.loyaFtr').text(loyaFtr.toFixed(2));
	$('.promFtr').text(promFtr.toFixed(2));
	$('.compFtr').text(compFtr.toFixed(2));
	$('.splActivityFtr').text(splActivityFtr.toFixed(2));
	$('.totaFtr').text(totaFtr.toFixed(2));*/
	$('.dfrdLyltFtr').text(dfrdLyltFtr.toFixed(2));
	$('.totAftrDfrdLyltFtr').text(totAftrDfrdLyltFtr.toFixed(2));
	
	
	
	$('.pricFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+pricFtrCount.toFixed(0)+'<span class="right">'+pricFtr.toFixed(2)+'</span>');
	
	$('.cleaFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+cleaFtrCount.toFixed(0)+'<span class="right">'+cleaFtr.toFixed(2)+'</span>');
	$('.adverFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+adverFtrCount.toFixed(0)+'<span class="right">'+adverFtr.toFixed(2)+'</span>');
	$('.scanPFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+scanPFtrCount.toFixed(0)+'<span class="right">'+scanPFtr.toFixed(2)+'</span>');
	$('.stafFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+stafFtrCount.toFixed(0)+'<span class="right">'+stafFtr.toFixed(2)+'</span>');
	$('.loyaFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+loyaFtrCount.toFixed(0)+'<span class="right">'+loyaFtr.toFixed(2)+'</span>');
	$('.promFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+promFtrCount.toFixed(0)+'<span class="right">'+promFtr.toFixed(2)+'</span>');
	$('.compFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+compFtrCount.toFixed(0)+'<span class="right">'+compFtr.toFixed(2)+'</span>');
	$('.splActivityFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+splActivityFtrCount.toFixed(0)+'<span class="right">'+splActivityFtr.toFixed(2)+'</span>');
	$('.totaFtrCount').html('&nbsp;&nbsp;&nbsp;&nbsp;'+totaFtrCount.toFixed(0)+'<span class="right">'+totaFtr.toFixed(2)+'</span>');
	
	//$(".pricFtrCount").append('<span class="right">'+pricFtr.toFixed(2)+'</span>');
/*	$(".cleaFtrCount").append('<span class="right">'+cleaFtr.toFixed(2)+'</span>');
	$(".adverFtrCount").append('<span class="right">'+adverFtr.toFixed(2)+'</span>');
	$(".scanPFtrCount").append('<span class="right">'+scanPFtr.toFixed(2)+'</span>');
	$(".stafFtrCount").append('<span class="right">'+stafFtr.toFixed(2)+'</span>');
	$(".loyaFtrCount").append('<span class="right">'+loyaFtr.toFixed(2)+'</span>');
	$(".promFtrCount").append('<span class="right">'+promFtr.toFixed(2)+'</span>');
	$(".compFtrCount").append('<span class="right">'+compFtr.toFixed(2)+'</span>');
	$(".splActivityFtrCount").append('<span class="right">'+splActivityFtr.toFixed(2)+'</span>');
	$(".totaFtrCount").append('<span class="right">'+totaFtr.toFixed(2)+'</span>');*/
	
	if (totPages == pageNo) {
		if ($('.totVal').hasClass('hideBlock')) {
			$('.totVal').removeClass('hideBlock');
		}
	} else {
		if (!$('.totVal').hasClass('hideBlock')) {
			$('.totVal').addClass('hideBlock');
		}
	}
}

function showContentMarkdownDetailsBlock() {
	$('#reportContent').removeClass('hideBlock');

	$('.ContentTableWrapperError').addClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');

}

function updateSortPlugin() {
	$(".sortTable").trigger("update");
	$(".sortTable").trigger("updateRows");

}

function updateList(oldList) {

	var deptSalesTax = oldList;
	var newList = [];
	var i = 0;
	if ($('#sortTable .parentTr').length > 0) {
		$('#sortTable .parentTr').each(function() {
			newList.push(deptSalesTax[Number($(this).prop('id'))]);
			i++;
		});
	}
	return newList;

}

function markdownDetailsJasperPrint() {

	if (isNotJasperPrintValid()) {
		printJasperValMsg();
	} else {
		$("#hdnDepLst").val($('#department_1pos').val());
		$('#markdownDetails').attr("action", "getMarkdownDetailsPdf.pdf");
		$('#markdownDetails').attr('target', '_blank');
		$('#markdownDetails').submit();
	}
}

function mardkownDetailsPrintReport(data, pageNumber) {

	// var selectOptions = $('#reportType option:selected').text();
	materialArticle = $('#articleNo').val();
	$
			.ajax({
				type : "get",
				url : "getMarkdownDetailsPdf.pdf",
				data : "",
				beforeSend : function() {
					// startLoading();
					fullScreenLoader();
					// hideAllocationTbl();
				},
				success : function(response) {
					// prevRes=response;
					// formOpeartorLocationContent(response, '');
					// bindOpertorLocFilter();
					// stopLoading();
					// console.log(response+"Print");
					$.loader('close');
					var a = window.open();
					a.document.write(response);
					a.focus();
				},
				error : function() {
					showError('Technical issue occurred. Due to service unavailability.');
					$.loader('close');
					// stopLoading();// goToLogin();
				}
			});

}
function printResult() {
}

function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}

function showContent(count) {
	$('.reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').addClass('hideBlock');
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function callFrom() {
	setTimeout(function() {
		$('#dateFrom').focus();
	}, 200);
}
function callTo() {
	setTimeout(function() {
		$('#dateTo').focus();
	}, 200);
}

function convertTime() {
	$('.time').filter(
			function() {
				var temp = $(this).text().trim();
				/* var date = new Date(parseInt(temp.substr(6))); */

				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
					var newHour = today.getHours();
					var newMinu = today.getMinutes();
					if (newHour < 10) {
						newHour = '0' + newHour;
					}
					if (newMinu < 10) {
						newMinu = '0' + newMinu;
					}
					$(this).text((newHour + ":" + newMinu));

				}
			});

}

/*
 * function showmarkFilter() { var markHead = '<thead class="markFillterHdr ">' + '<tr class="filterRow"><td class="centerValue"><input
 * type="#" class="textbox markDept"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markPric"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markClea"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markStaf"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markLoya"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markProm"></td>' + '<td class="centerValue"><input
 * type="#" class="textbox markTota"></td>' + '</tr></thead>';
 * 
 * $(markHead).insertAfter('.sortTable thead:first'); bindFilter(); } function
 * hidemarkFillter() { $('.markFillterHdr').remove();
 * formMarkdownDetailsContent(prevRes, ''); }
 */
function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.paginationDiv').addClass('hideBlock');
	$.loader('close');
}

function showAlert(msg) {
	$(".errorMsgDiv").addClass('hideBlock');
	$('#dialog-modal').dialog('open');
	$('#alertBox').text(msg);
	$("#reportContent").addClass("hideBlock");
	$.loader('close');
}

function getArticlesForPage(pageNumber) {
	$('#statusImg').addClass('loading');
	$('#statusImg').removeClass('hideBlock');
	// $('#statusImg').addClass('statusWrapper');

	$('#pageNumber').val(pageNumber);
	$('#generateReport').attr('action', 'requestSearchForPagination.htm');
	$('#generateReport').submit();
}

$(document).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#sortTable"), $("#markdownAttr"));

});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if (tableIdName == 'sortTable') {
		shiftKeyFunction(tableHeaderObj, $("#markdownAttr"));
	}

}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if (tableIdName == 'sortTable') {
		ctrlKeyFunction($("#markdownAttr"));
	}

}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if (tableIdName == 'sortTable') {
		clickFunction(tableHeaderObj, $("#markdownAttr"));
	}

}
$(document).ready(
		function() {
			//$('#scrollWindow').css('width', '1300px');
			$('#next-column').click(function(event) {
				event.preventDefault();
				$('.scrollTableContainer').animate({
					scrollLeft : '+=150'
				}, 'fast');
			});
			$('#previous-column').click(function(event) {
				event.preventDefault();
				$('.scrollTableContainer').animate({
					scrollLeft : '-=150'
				}, 'fast');
			});
			setScrollerPosition($("#sortTable"), $("#previous-column"),
					$("#next-column"));
			$(window).resize(
					function() {
						setScrollerPosition($("#sortTable"),
								$("#previous-column"), $("#next-column"));
					});
			$(window).scroll(
					function() {
						setScrollerPosition($("#sortTable"),
								$("#previous-column"), $("#next-column"));
					});
		});
