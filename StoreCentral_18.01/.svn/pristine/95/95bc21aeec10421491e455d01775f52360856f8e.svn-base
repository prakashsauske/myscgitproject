var currentPage = '';
var currPage = '';
var userNumber = '';
var saleOrg = '';
var department = '';
var value = '';
var roles = '';
var mappedStores = [];
var isStoreManager = false;
var isItAdmin = false;
var isStockTakeManager = false;
var isSalesOrgManager = false;
var verifiedUserElem = undefined;
var currentStore = '';
var searchData = undefined;
var currentRow = undefined;
var sortedIndex=-1;
var expandedRow=undefined;
var activeFlag = "";
$(document)
		.ready(
				function() {

					if ($('#isStoreManager').val() == 'Y') {
						isStoreManager = true;
					} else {
						isStoreManager = false;
					}

					if ($('#isItAdmin').val() == 'Y') {
						isItAdmin = true;
					} else {
						isItAdmin = false;
					}

					if ($('#isSalesOrgManager').val() == 'Y'
							|| $('#roleId').val() == 'SS') {
						isSalesOrgManager = true;
					} else {
						isSalesOrgManager = false;
					}

					if ($('#isStockTakeManager').val() == 'Y') {
						isStockTakeManager = true;
					} else {
						isStockTakeManager = false;
					}

					currentStore = $('#posSite').val();

					// $('.footerWrapper').css('margin','0 auto');
					$('.legendDiv').addClass('hideBlock');
					$("#dialog-verify").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-verify").parent().addClass("popupWrapper");
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					// Popup formatting

					$("#dialog-modalDeactive").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-modalDeactive").parent()
							.addClass("popupWrapper");

					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 400
					});

					$("#dialog-confirmation").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 480
					});

					$('.salesOrgFil,.salesOrgPopup').addClass("hideBlock");
					// $('.popUpSales-'+$(this).val()).removeClass('hideBlock');
					$("#dialog-modal").parent().addClass("popupWrapper");

					var json = $('#roleListJson').val();

					if (json != null && json != '' && json != undefined) {
						var output = $.parseJSON(json);
						roles = output.data;
					}
					$(document)
							.keypress(
									function(event) {
										if (event.which == 13) {
											event.preventDefault();
											hideError();
											setTimeout(
													function() {
														if ($(
																'#tableAddAction .formActions .actionBtn:visible')
																.text().length > 0
																&& $('.ui-dialog:visible').length == 0) {
															if (!$(
																	'#verifyLabel')
																	.hasClass(
																			'hideBlock'))
																$(
																		'#tableAddAction .formActions .actionBtn')
																		.click();
															else
																$('#verifyUser')
																		.click();
														} else if ($(
																'.searchLink:visible')
																.text().length > 0
																&& $('.ui-dialog:visible').length == 0) {

															$('.searchLink')
																	.click();
														} else if ($(
																'.popupActions')
																.is(':visible')
																&& $('.ui-dialog:visible').length == 0) {
															$('.popupActions')
																	.find(
																			'.actionBtn:visible:first')
																	.trigger(
																			'click');
														} else if ($(document.activeElement).parent().is('visible') && $(document.activeElement).parent().attr('id')=='multiplePOS' && $('.ui-dialog:visible').length == 0) {
																$('.verifyStore')
															.trigger(
																	'click');
														}else if ($('.ui-dialog:visible').length > 0) {
															if ($(
																	'.ui-dialog:visible')
																	.find(
																			'.confirmation-yesbtn:visible').length == 1) {
																$(
																		'.ui-dialog:visible')
																		.find(
																				'.confirmation-yesbtn:visible')
																		.trigger(
																				'click');
															} else {
																$(
																		'.ui-dialog:visible')
																		.find(
																				'.actionBtn:visible:first')
																		.trigger(
																				'click');
															}
														} else if ($(
																document.activeElement)
																.hasClass(
																		'actionBtn')
																&& $(
																		document.activeElement)
																		.parent()
																		.is(
																				':visible')) {
															$(
																	document.activeElement)
																	.parent()
																	.trigger(
																			'click');
														} else {
															if ($('.ui-dialog:visible').length == 0)
																$('#serachUser')
																		.click();
														}
													}, 50)

										}

									});

					// Receive Order popup attributes
					$("#dialog-modal-Edit").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 600,
						maxHeight : 700,
						width : 550,
						open : function(event, ui) {
							// $('#fromDte').datepicker();

						},
						close : function(event, ui) {
							// $('#fromDte').datepicker('destroy');
						}
					});

					$("#dialog-modal-Edit").parent().addClass("popupWrapper");

					$("#tabs").tabs({
						collapsible : true,
						active : false
					});

					deactivate();

					bindAccordian();

					$('.salesOrgMap').change(
							function() {
								startLoading();
								bindSalesOrgChange(true, $('.salesOrgMap')
										.val());
								// $('.salesOrgFil').addClass("hideBlock");
								// $('.sales-'+$('.salesOrgMap').val()).removeClass('hideBlock');
								$('.storeList li').remove();
								if (roles != null && roles != undefined
										&& roles != '') {
									formRoleOptions($(roles).attr(
											$('.salesOrgMap').val()),
											$('.roleList'));
								}
							});

					$('.roleList')
							.change(
									function() {
										if ($('#verifyLabel').is(':visible')) {
											if (isAdminRole($(this).val())/*
																			 * $(this).val() ==
																			 * Its ||
																			 * $(this).val() ==
																			 * Ss ||
																			 * $(this).val() ==
																			 * Adm ||
																			 * $(this).val() ==
																			 * Br ||
																			 * $(this).val() ==
																			 * POSRP ||
																			 * $(this).val() ==
																			 * STOTM ||
																			 * $(this).val() ==
																			 * STTM ||
																			 * $(this).val() ==
																			 * RDOU ||
																			 * $(this).val() ==
																			 * ITS1 ||
																			 * $(this).val() ==
																			 * ITS2 ||
																			 * $(this).val() ==
																			 * ITUA ||
																			 * $(this).val() ==
																			 * SLM
																			 */) {
												var isAdminActive = false;
												verifiedUserElem
														.find('[storerole]')
														.each(
																function() {
																	if ($(this)
																			.hasClass(
																					'success'))
																		isAdminActive = true;
																});

												var isAdminRoleMapped = false;
												var isAdminRoleMappedActive = false;
												if (verifiedUserElem
														.find('[adminrole]').length > 0){
													if(verifiedUserElem
															.find('[adminrole]').hasClass('success')){
														isAdminRoleMapped = true;
													}else{
														isAdminRoleMappedActive = true;
													}
												}

												if (isAdminRoleMapped) {
													$('.roleList')
															.val('select');
													showInformation('User is already mapped to admin role('
															+ verifiedUserElem
																	.find(
																			'[adminrole]')
																	.text()
															+ ')');
												}  else if(isAdminRoleMappedActive){
													$('.roleList').val('select');
													showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
												}else if (isAdminActive) {
													$('.roleList')
															.val('select');
													showInformation('User is already mapped to some other store(s).Please deactivate all other stores to assign special role.');
												} else {
													$('#multiplePOS input')
															.attr('disabled',
																	'disabled')
															.attr('style',
																	'background: rgb(217, 217, 217)');
													if (!isStoreManager) {
														$('#multiplePOS input')
																.val('');// Clears
																			// the
																			// stores
																			// value
																			// on
																			// change
																			// of
																			// Role
														$('.storeList')
																.html('');// Clears
																			// the
																			// selected
																			// store
																			// value
																			// on
																			// change
																			// of
																			// Role
													}
												}
											} else {

												$('#multiplePOS input')
														.removeAttr('disabled')
														.removeAttr('style');
											}
										} else {
											if ($(this).val() != 'Select'
													&& $(this).val() != ''
													&& $(this).val() != 'select') {
												showError('Please verify user to select role.');
												$('.roleList').val('select');
											}
										}

									});

					$('.popUpSalesOrg').change(
							function() {
								startLoading();
								bindSalesOrgChange(false, $(this).val());
								// $('.salesOrgPopup').addClass("hideBlock");
								// $('.popUpSales-'+$(this).val()).removeClass('hideBlock');
								if (roles != null && roles != undefined
										&& roles != '') {
									formRoleOptions($(roles)
											.attr($(this).val()),
											$('.popUpRoles'));
								}
							});

					$("#dateFrom").datepicker({
						dateFormat : "dd/mm/yy",
						zIndex : 50,

					});

					$("#dateTo,#toDte").datepicker({
						dateFormat : "dd/mm/yy",
						zIndex : 50

					});
					setDefaultDate();

					/*
					 * $('.salesOrgMap').change(function(){
					 * 
					 * });
					 */
					// $('option[value="ITS"]').addClass('hideBlock');
					$('#dialog-modal-Edit #saveBtn')
							.click(
									function() {
										hideErrorInPopup('dialog-forgotWizard');
										var role = $('.popUpRoles');

										var fromDate = formateDate($('#fromDte')
												.val());
										var prevSOrgName=$('.userDtlSalesOrg').text();
										var prevSalesOrg=prevSOrgName.split('|')[0].trim();
										var date1 = new Date(fromDate
												.split('/')[1]
												+ '/'
												+ fromDate.split('/')[0]
												+ '/' + fromDate.split('/')[2]);

										var toDate = formateDate($('#toDte')
												.val());
										var date2 = new Date(
												toDate.split('/')[1] + '/'
														+ toDate.split('/')[0]
														+ '/'
														+ toDate.split('/')[2]);

										if (!isValidDate(fromDate)) {
											date1 = 'Invalid Date'
										}

										if (toDate.trim() != ''
												&& !isValidDate(toDate)) {
											date2 = 'Invalid Date'
										}

										var curDate = new Date();
										var today = new Date((Number(curDate
												.getMonth()) + 1)
												+ '/'
												+ curDate.getDate()
												+ '/'
												+ curDate.getFullYear());

										var maxStartDate = new Date(
												'31/12/2099');

										var dept = '';
										$('#dialog-modal-Edit')
												.find('[name="dept"]:checked')
												.each(
														function() {
															dept += ":"
																	+ $(this)
																			.val();
														});

										var siteId = '';// $('#dialog-modal-Edit
										// #singlePOS
										// input').val().split('-')[0].trim();
										var salesOrg = $('.popUpSalesOrg')
												.val();

										if (fromDate == "") {
											showErrorInPopup(
													'Please enter From Date.',
													'dialog-forgotWizard');
											$('#fromDte').focus();
										} /*
											 * else if (toDate == "") {
											 * showErrorInPopup( 'Please enter
											 * To Date.',
											 * 'dialog-forgotWizard');
											 * $('toDte').focus(); }
											 */else if (date1 == 'Invalid Date'
												&& !$('#fromDte').prop(
														'disabled')) {
											showErrorInPopup(
													'Invalid From Date.',
													'dialog-forgotWizard');
											$('#fromDte').focus();
										} else if (!$('#fromDte').prop(
												'disabled')
												&& date1 < today) {
											showErrorInPopup(
													'From Date should not be past.',
													'dialog-forgotWizard');
											$('#fromDte').focus();
										} else if (date1 > maxStartDate) {
											showErrorInPopup(
													'From Date should not be greater than 31/12/2099',
													'dialog-forgotWizard');
											$('#fromDte').focus();
										} else if (toDate.trim() != ''
												&& date2 == 'Invalid Date') {
											showErrorInPopup(
													'Invalid To Date.',
													'dialog-forgotWizard');
											$('#toDte').focus();
										} else if (toDate.trim != ''
												&& today > date2) {
											showErrorInPopup(
													'To Date should not be lesser than the current Date',
													'dialog-forgotWizard');
											$('#toDte').focus();
										} else if (toDate.trim != ''
												&& date1 > date2) {
											showErrorInPopup(
													'To Date should not be lesser than the From Date',
													'dialog-forgotWizard');
											$('#toDte').focus();
										} else if (salesOrg == 'Select') {
											showErrorInPopup(
													'Please select a salesOrg.',
													'dialog-forgotWizard');
											// role.mousedown();
										} else if (role.val() == 'Select') {
											showErrorInPopup(
													'Please select a role.',
													'dialog-forgotWizard');
											// role.mousedown();
										}/*
											 * else
											 * if($('#dialog-modal-Edit').find('[name="dept"]:checked').length ==
											 * 0){//Validation for department on
											 * save showErrorInPopup('Please
											 * select a
											 * department.','dialog-forgotWizard'); }
											 */
										/*
										 * else if(dept=='Select'){
										 * showErrorInPopup('Please select a
										 * department.','dialog-forgotWizard');
										 * //role.mousedown(); } else
										 * if(siteId==''){ } else
										 * if($('#dialog-modal-Edit').find('.hierarchyList').find('input:checked').length<=0){ }
										 * else
										 * if($('#dialog-modal-Edit').find('.hierarchyList').find('input:checked').length<=0){ }
										 * else
										 * if($('#dialog-modal-Edit').find('.hierarchyList').find('input:checked').length<=0){
										 * showErrorInPopup('Please select a
										 * department.','dialog-forgotWizard');} //
										 * role.mousedown(); } else /*
										 * if(siteId==''){
										 * showErrorInPopup('Please select a
										 * store.','dialog-forgotWizard');
										 * //role.mousedown();
										 * $('#dialog-modal-Edit #singlePOS
										 * input').focus(); }
										 */
										else {
											console
													.log(($(
															'.articleActionBtns')
															.find(
																	'.positiveStatus').length == 1 ? 'Y'
															: 'N'));
											updateUser({
												userId : userNumber,
												dateFrom : fromDate,
												dateTo : toDate,
												prev_dateFrom : $('.activeFrom')
														.text(),
												prev_dateTo : $('.activeTo')
														.text(),
												roleId : role.val(),
												prev_roleId : $('.usrRole')
														.text(),
												newSiteNo : siteId,
												dept : null,
												deptList : dept,
												siteNo : siteNo,
												saleOrg : salesOrg,
												prev_saleOrg : prevSalesOrg,
												isPrimary : ($(
														'.articleActionBtns')
														.find('.positiveStatus').length == 1 ? 'Y'
														: 'N'),
												isUpdate : "true"
											});
										}

									});

					$('#verifyUser,#copyUser')
							.click(
									function() {
										hideError();
										if ($(this).attr('id') != 'copyUser') {
											hideError();
											if ($('#tableAddAction input:first')
													.val().trim() == '') {
												$('#tableAddAction input:first')
														.focus();
												showError('Please fill user Id or Name.');

											} else {

												verityUser(
														{
															userId : $(
																	'#tableAddAction input:first')
																	.val()
																	.trim()
																	.split('-')[0]
																	.trim()
														}, 'user');
											}
										} else {
											hideError();
											if (($('#tableAddAction #userID1')
													.val().trim() == '' || ($(
													'#tableAddAction #userID1')
													.val().indexOf('-') != -1))) {
												$('#tableAddAction #userID1')
														.focus();
												showError('Please fill user Id/Name.');

											} else {

												verityUser(
														{
															userId : $(
																	'#tableAddAction #userID1')
																	.val()
																	.trim()
																	.split('-')[0]
																	.trim()
														}, 'copy');
											}
										}

									});

					$('.verifyStore,.verifyPopupStore')
							.click(
									function() {
										hideError();
										// hideError();

										if ($(this).hasClass('verifyStore')
												&& !($('#multiplePOS input')
														.is(':disabled'))) {
											/*
											 * if ($('.storeList li').length >
											 * 0) { showError('Store is
											 * selected.'); } else
											 */if ($(
													'#multiplePOS input:first')
													.val().trim() == '') {
												$('#multiplePOS input:first')
														.focus();
												showError('Please enter a valid store number');

											} else if ($('.salesOrgMap').val() == 'Select') {
												// $('#tableAddAction
												// input:first').focus();
												showError('Please Select a sales Org.');

											} else if (!$('#verifyLabel').is(
													':visible')
													&& !isStoreManager) {
												showError('Please verify user to map a store.');
											}/*
												 * else if
												 * (mappedStores!=undefined &&
												 * mappedStores.indexOf($('#multiplePOS
												 * input:first').val().trim())>=0) {
												 * 
												 * showError('Entered store is
												 * already mapped to the
												 * user.'); $('#multiplePOS
												 * input:first').val('').focus();
												 *  }
												 */else {

												verifyStore(
														{
															storeId : $(
																	'#multiplePOS input:first')
																	.val()
																	.trim()
																	.split('-')[0]
																	.trim(),
															salesOrg : $(
																	'.salesOrgMap')
																	.val()
														}, true);
											}
										} else {
											hideErrorInPopup('dialog-forgotWizard');
											if ($(
													'#dialog-modal-Edit #singlePOS input')
													.val().trim() == '') {
												showErrorInPopup(
														'Please enter a valid store number',
														'dialog-forgotWizard');
												$(
														'#dialog-modal-Edit #singlePOS input')
														.focus();
											} else if ($('.popUpSalesOrg')
													.val() == 'Select') {
												// $('#tableAddAction
												// input:first').focus();
												showErrorInPopup(
														'Please Select a sales Org.',
														'dialog-forgotWizard');

											} else {
												verifyStore(
														{
															storeId : $(
																	'#dialog-modal-Edit #singlePOS input')
																	.val()
																	.trim()
																	.split('-')[0]
																	.trim(),
															salesOrg : $(
																	'.popUpSalesOrg')
																	.val()
														}, false);
											}

										}

									});

					$('#tableAddAction .formActions .actionBtn')
							.click(
									function() {
										hideError();
										var flag = false;

										var fromDate = formateDate($(
												'#dateFrom').val());
										var date1 = new Date(fromDate
												.split('/')[1]
												+ '/'
												+ fromDate.split('/')[0]
												+ '/' + fromDate.split('/')[2]);

										var toDate = formateDate($('#dateTo')
												.val());
										var date2 = new Date(
												toDate.split('/')[1] + '/'
														+ toDate.split('/')[0]
														+ '/'
														+ toDate.split('/')[2]);
										var maxStartDate = new Date(
												'31/12/2099');

										if (!isValidDate(fromDate)) {
											date1 = 'Invalid Date';
										}

										if (toDate.trim() != ''
												&& !isValidDate(toDate)) {
											date2 = 'Invalid Date';
										}

										var curDate = new Date();
										var today = new Date((Number(curDate
												.getMonth()) + 1)
												+ '/'
												+ curDate.getDate()
												+ '/'
												+ curDate.getFullYear());

										if ($('#tableAddAction input:first')
												.val().trim() == '') {
											showError('Please fill user Id or Name.');
											$('#tableAddAction input:first')
													.focus();
										} else if (($('#verifyLabel')
												.hasClass('hideBlock'))) {
											showError('Please Verify the user before create.');
											$('#tableAddAction input:first')
													.focus();
										} else if (flag) {
											showError('User already added to your store.');
											$('#tableAddAction input:first')
													.focus();
										} else if (fromDate == "") {
											showError('Please enter From Date.');
											$('#dateFrom').focus();
										} /*
											 * else if (toDate == "") {
											 * showError('Please enter To
											 * Date.'); $('dateTo').focus(); }
											 */else if (date1 == 'Invalid Date') {
											showError('Invalid From Date.');
											$('#dateFrom').focus();
											$('#dateFrom').focus();
										} else if (date1 > maxStartDate) {
											showErrorInPopup(
													'From Date should not be greater than 31/12/2099',
													'dialog-forgotWizard');
											$('#toDte').focus();
										} else if (toDate.trim() != ''
												&& date2 == 'Invalid Date') {
											showError('Invalid To Date.');
											$('#dateTo').focus();
										} else if (today > date1) {
											showError('From Date should not be lesser than Today Date');
											$('#dateFrom').focus();
										} else if (toDate.trim() != ''
												&& date1 > date2) {
											showError('To Date should not be lesser than the From Date');
											$('#dateTo').focus();
										}

										else if ($('.salesOrgMap').val() == 'Select') {
											showError('Please select a SalesOrg.');
											$('.salesOrgMap').focus();
										}

										else if ($('.roleList').val() == 'Select') {
											showError('Please select a role.');
											$('.roleList').focus();
										}
										/*
										 * else if($('#tableAddAction
										 * .hierarchyContent').find('[name="dept"]:checked').length ==
										 * 0 && !($('.roleList').val() == Its ||
										 * $('.roleList').val() == Ss ||
										 * $('.roleList').val() == Adm ||
										 * $('.roleList').val() == Br ||
										 * $('.roleList').val() == POSRP ||
										 * $('.roleList').val() == STOTM ||
										 * $('.roleList').val() == STTM ||
										 * $('.roleList').val() == RDOU ||
										 * $('.roleList').val() == ITS1 ||
										 * $('.roleList').val() == ITS2 ||
										 * $('.roleList').val() == ITUA ||
										 * $('.roleList').val() ==
										 * SLM)){//Validation to select atleast
										 * one department showError('Please
										 * select a Departmet.');
										 * $('.selectOptions').mousedown(); }
										 */

										else if ($('.storeList').children().length == 0
												&& !($('#multiplePOS input')
														.is(':disabled'))) {
											showError('Please select Store.');
											$('#multiplePOS input:first')
													.focus();
										}

										else {
											var stor = '';
											$
													.when(
															$('.contentRow')
																	.each(
																			function() {
																				for ( var m = 1; m <= $(
																						'.storeList')
																						.children().length; m++)
																					if (($(
																							'.storeList')
																							.children(
																									':nth-child('
																											+ m
																											+ ')')
																							.text()
																							.split(
																									'|')[0]
																							.trim() == $(
																							this)
																							.children(
																									':nth-child(5)')
																							.text()
																							.trim())
																							&& ($(
																									this)
																									.children(
																											':nth-child(1)')
																									.text()
																									.trim() == $(
																									'#tableAddAction input:first')
																									.val()
																									.split(
																											'-')[0]
																									.trim())) {
																						flag = true;
																						stor = $(
																								this)
																								.children(
																										':nth-child(5)')
																								.text()
																								.trim();
																					}
																			}))
													.done(
															function() {
																if (!flag) {
																	var date = new Date();
																	var month = '';
																	if (date
																			.getMonth() + 1 < 10) {
																		month = date
																				.getMonth() + 1;
																		month = '0'
																				+ month;
																	} else
																		month = date
																				.getMonth() + 1;
																	var day = '';
																	if (date
																			.getDate() < 10) {
																		day = date
																				.getDate();
																		day = '0'
																				+ day;
																	} else
																		day = date
																				.getDate();
																	var curDate = day
																			+ '/'
																			+ month
																			+ '/'
																			+ date
																					.getFullYear();
																	var newRow = '';
																	var str = [];
																	var l = 1;
																	$(
																			'.storeList')
																			.children()
																			.each(
																					function() {
																						str
																								.push($(
																										'.storeList')
																										.children(
																												':nth-child('
																														+ l
																														+ ')')
																										.text()
																										.split(
																												'|')[0]
																										.trim());
																						newRow += '<tr class="contentRow hideBlock"><td class="hideBlock">'
																								+ $(
																										'#tableAddAction input:first')
																										.val()
																										.split(
																												'-')[0]
																										.trim()
																								+ '</td>'
																								+ '<td class="hideBlock">'
																								+ $(
																										'#tableAddAction input:first')
																										.val()
																										.split(
																												'-')[1]
																										.trim()
																								+ '</td><td>'
																								+ $(
																										'#'
																												+ $(
																														'.roleList')
																														.val())
																										.text()
																								+ '</td>'
																								+ '<td>Dept</td>'
																								+ '<td>'
																								+ $(
																										'.storeList')
																										.children(
																												':nth-child('
																														+ l
																														+ ')')
																										.text()
																										.split(
																												'|')[0]
																										.trim()
																								+ '</td>'
																								+ '<td>Active</td>'
																								+ '<td>'
																								+ curDate
																								+ '</td>'
																								+ '<td class="lastColumn centerValue"><label class="linkBtn">'
																								
																								+ '<label class="changePassword" title="Reset Password">Reset Password</label></label>'
																								+ '<label class="linkBtn"><label class="deactivateUser" title="Deactivate User">Inactivate </label>'
																								+ '</label></td></tr>';
																						l++;
																					});
																	console
																			.log(str);
																	var st = '';
																	if (($('#multiplePOS input')
																			.is(':disabled'))) {
																		str
																				.push('NONE');
																		st = 'NONE';
																	} else {
																		st = $(
																				'.storeList li:first')
																				.children()
																				.text()
																				.split(
																						'|')[0]
																				.trim();
																	}
																	var data = $(
																			'#usrRoleMgt')
																			.serialize();
																	data += '&storeList='
																			+ str;

																	var isPrimary = 'N';

																	if (mappedStores.length == 0) {
																		isPrimary = 'Y';
																	}

																	data += '&isPrimary='
																			+ isPrimary;
																	var dept = '';
																	$(
																			'#tableAddAction .hierarchyContent')
																			.find(
																					'[name="dept"]:checked')
																			.each(
																					function() {
																						dept += ":"
																								+ $(
																										this)
																										.val();
																					});
																	data += '&deptList='
																			+ dept;
																	data += '&isUpdate=false';
																	console
																			.log(data);
																	if(validateUserOnCreate()){
																		createUser(
																				data,
																				newRow,
																				$(
																						'#tableAddAction input:first')
																						.val()
																						.split(
																								'-')[0]
																						.trim(),
																				st);
																	}
																} else {
																	showError('User is already mapped to the store '
																			+ stor
																			+ '.');
																	// $('#multiplePOS
																	// input:first').focus();
																}
															});
										}

									});

					$('.closeMessage').click(
							function() {
								$('.lookupActionWrapper .errorDiv').addClass(
										'hideBlock');
								$('.lookupActionWrapper .warnDiv').addClass(
										'hideBlock');
							});

					$("#addUser").click(function() {
						hideError();
						$("#tableSearchAction").addClass('hideBlock');
						$("#tableAddAction").toggleClass('hideBlock');
						$('#tableSearchAction input').val('');
						$('#tableSearchAction input').keyup();
						$('#tableAddAction input:first').focus();
						$('#userList').addClass('hideBlock');
						// $('#userList tbody').remove();
						$('.legendDiv').addClass('hideBlock');
						// $('#tableAddAction #deptAll').prop('checked',true);
					});

					$("#serachUser").click(function() {
						hideError();
						$("#tableAddAction").addClass('hideBlock');
						$("#tableSearchAction").toggleClass('hideBlock');
						$('#tableSearchAction input').focus();
						if ($('#userList tbody').find('tr').length > 0) {
							$('#userList,#table-legend').removeClass('hideBlock');
						}
						$('#tableAddAction #userID1').val('');
						$('#tableAddAction input:first').val('');
						if (!isStoreManager) {
							$('.storeList').html('');
							$('#multiplePOS input:first').val('');
						}
						$('#verifyLabel').addClass('hideBlock');
						deactivate();
						
					});

					$(".closeLink").click(function() {
						/*
						 * $("#tableAddAction").addClass('hideBlock');
						 * $("#tableSearchAction").addClass('hideBlock');
						 * window.location.href =
						 * '../itAdmin/itAdminUserMgt.htm';
						 */
						$('#serachUser').trigger('click');
					});

					// checks radio buttons in all, single or multiple

					/*
					 * $('#single').click(function(){
					 * $("#multiplePOS").addClass('hideBlock'); });
					 */

					$('#multiple').click(function() {
						$("#multiplePOS").removeClass('hideBlock');
						$("#singlePOS").addClass('hideBlock');
					});

					if ($('.contentTr:visible').length == 0) {
						$('#userList').find('tr :first').addClass('hideBlock');
					} else {
						$('#userList').find('tr :first').removeClass(
								'hideBlock');
					}

					$('#userList').addClass('hideBlock');
					$('.searchLink').click(
							function() {
								hideError();
								var userTxt = $('#tableSearchAction input')
										.val().trim();
								sortedIndex=-1;
								expandedRow=undefined;
								var data = {
									option : userTxt,
									searchStatus : $('#searchStatus').val()
								};
								if (userTxt == '') {
									// default search
									searchUserDtl(data);
								} else {
									searchUserDtl(data);
									// $('#userList').removeClass('hideBlock');
								}

							});

					$('.resetLink').click(function() {

						$('#tableSearchAction input').val('').focus();

					});

					/*
					 * var value=''; $('#tableSearchAction
					 * input').keyup(function(){ closeAccordian();
					 * value=$(this).val();
					 * 
					 * $('.contentTr').filter(function(){
					 * 
					 * if( value!=''){
					 * if(($(this).find(':nth-child(1)').text().trim().toLowerCase().indexOf(value) !=
					 * -1 ||
					 * $(this).find(':nth-child(2)').text().trim().toLowerCase().indexOf(value) !=
					 * -1)) { $(this).removeClass('hideBlock');
					 * ////console.log(i++); } else{
					 * $(this).addClass('hideBlock'); } } else {
					 * $(this).removeClass('hideBlock'); }
					 * 
					 * if($('.contentTr:visible').length==0){
					 * $('#userList').find('tr :first').addClass('hideBlock'); }
					 * else{ $('#userList').find('tr
					 * :first').removeClass('hideBlock'); } }); var
					 * recCnt=$('.contentTr:visible').length; currentPage=1;
					 * if(recCnt>10){
					 * $('.searchPagination').removeClass('hideBlock');
					 * $('.searchPagination').pagination({ items : recCnt,
					 * itemsOnPage : 10, cssStyle : 'compact-theme', currentPage :
					 * currentPage, onPageClick : function(pageNumber) {
					 * showPage(pageNumber); }
					 * 
					 * }); } else{ $('.searchPagination').addClass('hideBlock'); }
					 * 
					 * var i =1; var cnt=1; $('.contentTr:visible
					 * ').each(function(){ var flag=false;
					 * if($(this).hasClass('actionrows')){ flag=true; }
					 * $(this).attr('class','');
					 * $(this).addClass('contentTr').addClass('pageNo-'+cnt);
					 * if(flag){
					 * $(this).addClass('actionrows').addClass('contentRow'); }
					 * if(cnt>1) $(this).addClass('hideBlock'); if(i%10==0){
					 * cnt++; } i++; ////console.log(i++); }); });
					 */
					$('#dialog-verify .textbox ').val('');
					$('#dialog-verify .textbox ')
							.keyup(
									function() {
										value = $(this).val().trim()
										.toLowerCase();

										$('.verifyContent')
												.filter(
														function() {

															if (value != '') {
																if (($(this)
																		.children(
																				':nth-child(1)')
																		.text()
																		.trim()
																		.toLowerCase()
																		.indexOf(
																				value) != -1 || $(
																		this)
																		.children(
																				':nth-child(2)')
																		.text()
																		.trim()
																		.toLowerCase()
																		.indexOf(
																				value) != -1)) {
																	$(this)
																			.removeClass(
																					'hideBlock');
																	// //console.log(i++);
																} else
																	$(this)
																			.addClass(
																					'hideBlock');
															} else {
																$(this)
																		.removeClass(
																				'hideBlock');
															}
														});
										var recCnt = $('.verifyContent:visible').length;
										currentPage = 1;
										if (recCnt > 9) {
											$('.verifyPagination').removeClass(
													'hideBlock');
											$('.verifyPagination')
													.pagination(
															{
																items : recCnt,
																itemsOnPage : 9,
																cssStyle : 'compact-theme',
																currentPage : currentPage,
																onPageClick : function(
																		pageNumber) {
																	showVerifyPage(pageNumber);

																}

															});
										} else {
											$('.verifyPagination').addClass(
													'hideBlock');
										}

										var i = 1;
										var cnt = 1;
										$('.verifyContent:visible ')
												.each(
														function() {
															$(this)
																	.attr(
																			'class',
																			'');
															$(this)
																	.addClass(
																			'verifyContent')
																	.addClass(
																			'pagNo-'
																					+ cnt);
															if (cnt > 1)
																$(this)
																		.addClass(
																				'hideBlock');
															if (i % 9 == 0) {
																cnt++;
															}
															i++;
															// //console.log(i++);
														});
										if (recCnt <= 0) {
											$('#dialog-verify thead').addClass(
													'hideBlock');
										} else {
											$('#dialog-verify thead')
													.removeClass('hideBlock');
										}
									});
					// back button click function
					$('#backBtn').click(function() {
						if (!$('.adminWrapper').hasClass('hideBlock'))
							window.location.href = "../login/goingHome.htm";
						else
							showSearchPage(currentPage);
					});

					$('#tableAddAction input:first').on('input',function() {
						$('#verifyLabel').addClass('hideBlock');
					});
					// cancel button click function
					$('.cancelBtn').click(function() {
						window.location.href = '../login/goingHome.htm';
					});

					$("#sortable").sortable({
						placeholder : "highlight-placeholder"
					});
					if ($('#recordCnt').val() > 10) {
						$('.searchPagination').pagination({
							items : $('#recordCnt').val(),
							itemsOnPage : 10,
							cssStyle : 'compact-theme',
							currentPage : 1,
							onPageClick : function(pageNumber) {
								showPage(pageNumber);
							}

						});
						// $('.footerWrapper').css('margin-right','184px');
						// setTimeout(function(){$('.footerWrapper').css('margin','auto');},500);

					}
					$('#dialog-verify #popupSearch .filterWrapper').addClass(
							'hideBlock');

					// load All store user which logged in

					searchUserDtl({
						option : '',
						searchStatus : 'Active'
					});

					if (isStoreManager) {
						$('.salesOrgMap,.popUpSalesOrg').val(
								$('#salesOrg').val());
						$('.salesOrgMap,.popUpSalesOrg').trigger('change');
						$('#multiplePOS').find('input')
								.val($('#posSite').val());
						$('.verifyStore').trigger('click');
						$('.hideIfSM').addClass('hideBlock');

						$('option#ITS').remove();
						$('option#SS').remove();
						$('option#BR').remove();
						$('option#ADM').remove();
						$('option#POSRP').remove();
						$('option#STOTM').remove();
						$('option#STTM').remove();
						$('option#RDOU').remove();
						$('option#ITS1').remove();
						$('option#ITS2').remove();
						$('option#ITUA').remove();
					} else if (isSalesOrgManager) {
						$('.salesOrgMap,.popUpSalesOrg').val(
								$('#salesOrg').val());
						$('.salesOrgMap,.popUpSalesOrg').trigger('change');
						// $('#multiplePOS').find('input').val($('#posSite').val());
						// $('.verifyStore').trigger('click');
						$('.hideIfSM').addClass('hideBlock');
						$('.showIfSOM').removeClass('hideBlock');

						$('option#BR').remove();
						$('option#ITS').remove();
						$('option#SS').remove();
						$('option#ADM').remove();
						$('option#POSRP').remove();
						$('option#STOTM').remove();
						$('option#STTM').remove();
						$('option#RDOU').remove();
						$('option#ITS1').remove();
						$('option#ITS2').remove();
						$('option#ITUA').remove();
					} else if (isStockTakeManager) {

					}

					$('#filterOpen').click(function() {

						$("#filterClear").removeClass('hideBlock');
						$(".filterRowHead").removeClass('hideBlock');

						$(this).addClass('hideBlock');
					});

					$('#filterClear').click(function() {
						$('.Filter').val('');
						$("#filterOpen").removeClass('hideBlock');
						$(".filterRowHead").addClass('hideBlock');
						$(this).addClass('hideBlock');
					});

				});

function showVerifyPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function showStoreNoPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function verifyStore(data, flag) {
	$
			.ajax({
				data : data,
				url : "verifyStore.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = $.parseJSON(response);
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</th><th data-sort="string" class="sorted ascending" >Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
					// myMap
					if (res.data != null && res.data != undefined
							&& res.data.length > 0 && res.msg == 'true') {
						var list = res.data;
						var j = 0;
						var k = 1;
						var siteNo = '';
						var siteName = '';
						siteNo = list[0].siteNo;
						siteName = list[0].siteName;
						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>' + list[i].siteNo
									+ '</td><td>' + list[i].siteName + '</td>';
							tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectStore">Select</label></label></td></tr>';

							if (j % 9 == 0) {
								k++;
							}

						}
						if (j > 1) {
							currPage = 1;
							// $('#dialog-verify h4
							// strong').text($('#tableAddAction
							// input:first').val().trim());
							$('#dialog-verify h4')
									.html(
											'Too many search results for <strong>'
													+ $('#multiplePOS input')
															.val().trim()
													+ '</strong>. Please select a store from the list below.');
							// $('#dialog-verify h4
							// strong').text($('#tableAddAction
							// input:first').val().trim());
							$('#dialog-verify').parent().find(
									'.ui-dialog-titlebar .ui-dialog-title')
									.text('Verify Store');
							$('#dialog-verify .ContentTable').html('');
							$('#dialog-verify .ContentTable').html(tblHdr);
							$('#dialog-verify .noteLbl').remove();
							$("#dialog-verify").dialog("open");
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
							if (flag) {

								var isAlreadyMappedStore = false;
								var isAlreadyMappedStoreInactive = false;
								if (!isStoreManager) {
									verifiedUserElem
											.find('[storerole]')
											.each(
													function() {
														if ($(this).attr(
																'siteno') == siteNo){
																isAlreadyMappedStore = true;
																if($(this).hasClass('deactive')){
																	isAlreadyMappedStoreInactive = true;
																}
														}
													});
								}

								if (isAlreadyMappedStore) {
									if(isAlreadyMappedStoreInactive){
										showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
									}else{
										showInformation('User is already mapped to the store.');
									}
									$('#multiplePOS input:first').val('')
											.focus();
								} else if (siteNo != '' && siteName != '') {

									if ($('.storeList').find('#' + siteNo).length > 0) {
										showError('Store already exist.');
									} else {

										if ($('.storeList').children().length == 0)
											$('.storeList')
													.removeClass('hideBlock')
													.html(
															'<li><label class="verifiedStore" id="'
																	+ siteNo
																	+ '">'
																	+ siteNo
																	+ ' | '
																	+ siteName
																	+ ' </label><label class="closeMessage removeStore">&nbsp;</label></li>');
										else
											$('.storeList')
													.removeClass('hideBlock')
													.children(':last')
													.after(
															'<li><label class="verifiedStore" id="'
																	+ siteNo
																	+ '">'
																	+ siteNo
																	+ ' | '
																	+ siteName
																	+ ' </label><label class="closeMessage removeStore">&nbsp;</label></li>');

										removeStore();
									}
								} else {
									showError('Please enter a valid store number');
								}
							} else {
								$('#dialog-modal-Edit #singlePOS input').val(
										siteNo + ' - ' + siteName);
							}
						}
						$('#multiplePOS input:first').val('');

					} else if (res.msg == 'no_sales_org_map') {
						if (flag) {
							showError('Store does not belong to selected Sales Org');
						} else {
							showErrorInPopup(
									'IStore does not belong to selected Sales Org',
									'dialog-forgotWizard');
						}
						// $('#dialog-modal').dialog('open');
					} else {
						if (flag) {
							showError('Please enter a valid store number');
						} else {
							showErrorInPopup(
									'Please enter a valid store number',
									'dialog-forgotWizard');
						}
						// $('#dialog-modal').dialog('open');
					}
					stopLoading();
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					stopLoading();
				}
			});
}
function verityUser(data, flag) {
	mappedStores = [];
	$
			.ajax({
				data : data,
				url : "verifyUser.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = $.parseJSON(response);
					var tblHdr = '<thead><tr><th data-sort="string">User ID</th><th data-sort="string" class="sorted ascending" >User Name</th><th data-sort="string" class="hideBlock">Role </th><th data-sort="int" >Sales Organisation</th><th>Stores & Role</th><th width="15%" class="lastColumn">&nbsp;</th></tr></thead>';
					// myMap
					var activeFlag = false;
					if (res.data != null && res.msg == 'true') {
						var storeMap = res.data;
						var j = 0;
						var k = 1;
						var userId = '';
						var role = '';
						var saleOrg = '';
						var salesOrgContent = '';
						var siteContent = '';
						var selectContent = '';
						var activeStore = '';

						for ( var m in storeMap) {
							// console.log(j++);
							j++;
							var list = storeMap[m];
							list[0].userId = ((list[0].userId != null
									&& list[0].userId != undefined && list[0].userId != '') ? list[0].userId
									: '');
							list[0].userName = ((list[0].userName != null
									&& list[0].userName != undefined && list[0].userName != '') ? list[0].userName
									: '');
							list[0].roleId = ((list[0].roleId != null
									&& list[0].roleId != undefined && list[0].roleId != '') ? list[0].roleId
									: '');
							list[0].roleDesc = ((list[0].roleDesc != null
									&& list[0].roleDesc != undefined && list[0].roleDesc != '') ? list[0].roleDesc
									: '');

							userId = list[0].userId + ' - ' + list[0].userName;
							role = list[0].roleId;
							saleOrg = list[0].salesOrg;
							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '" masterRow="' + m
									+ '"><td class="userId">' + list[0].userId
									+ '</td><td class="userName">'
									+ list[0].userName + '</td>'
									+ '<td class="hideBlock">' + list[0].roleId
									+ '</td><td class="hideBlock">'
									+ list[0].roleDesc + '</td>';

							for ( var f = 0; f < list.length; f++) {
								list[f].salesOrg = ((list[f].salesOrg != null
										&& list[f].salesOrg != undefined && list[f].salesOrg != '') ? list[f].salesOrg
										: '');
								list[f].salesOrgName = ((list[f].salesOrgName != null
										&& list[f].salesOrgName != undefined && list[f].salesOrgName != '') ? list[f].salesOrgName
										: '');
								list[f].siteName = ((list[f].siteName != null
										&& list[f].siteName != undefined && list[f].siteName != '') ? list[f].siteName
										: '');
								list[f].siteId = ((list[f].siteId != null
										&& list[f].siteId != undefined
										&& list[f].siteId != '' && list[f].siteId
										.toLowerCase() != 'none') ? list[f].siteId
										: '');
								if (list[f].salesOrg != '') {
									salesOrgContent += '<label class="multiSalesOrg">'
											+ list[f].salesOrg;
									if (list[f].salesOrg != ''
											&& list[f].salesOrgName != '')
										salesOrgContent += ' | ';
									salesOrgContent += list[f].salesOrgName
											+ '</label></br>';
								}
								// siteContent+='<label
								// class="multi">'+list[f].siteId; +' | '+
								// list[f].siteName +'</label>';
								var activeClass = 'deactive hideBlock';
								if (list[f].activeFlag == 'Y')
									activeClass = 'success';
								else if (list[f].activeFlag == 'P')
									activeClass = 'pending';

								if (list[f].siteId != ''
										&& list[f].siteId != null
										&& list[f].siteId != undefined) {
									siteContent += '<label class="multiSalesOrg multiStore '
											+ activeClass
											+ '" storeRole role="'
											+ list[f].roleId
											+ '" siteNo="'
											+ list[f].siteId
											+ '">'
											+ list[f].siteId;
									if (list[f].siteId != ''
											&& list[f].siteName != '')
										siteContent += ' | ';
									siteContent += list[f].siteName
									siteContent += '(' + list[f].roleDesc + ')';
									siteContent += '</label></br>';
								} else if (isAdminRole(list[f].roleId)) {
									siteContent += '<label class="multiSalesOrg multiStore '
											+ activeClass
											+ '" adminRole role="'
											+ list[f].roleId
											+ '">'
											+ list[f].roleDesc
											+ '</label></br>';
								}

								// if (list[f].linkedFlag == 'Y') {
								// activeFlag = true;
								// if (selectContent == '') {
								// selectContent += 'User is active in store '
								// + list[f].siteId;
								// activeStore += 'User <B> '
								// + userId
								// + ' </b> is already active in store <b><i>'
								// + list[f].siteId+' | '+list[f].siteName;
								// } else {
								// selectContent += ',' + list[f].siteId;
								// activeStore += ',' + list[f].siteId+' |
								// '+list[f].siteName;
								// }
								// mappedStores.push(list[f].siteId);
								// }

							}
							tblHdr += '<td>' + salesOrgContent + '</td>';

							tblHdr += '<td>' + siteContent
									+ '</td><td class="sorted lastColumn">';
							tblHdr += '<label class="linkBtn"><label class="selectItem verifyItem" selectFor="'
									+ m + '">Select</label></label>';

							tblHdr += '</td></tr>';

							salesOrgContent = '';
							siteContent = '';
							selectContent = '';
							if (j % 9 == 0) {
								k++;
							}

						}
						if (j > 1) {
							currPage = 1;
							$('#dialog-verify h4')
									.html(
											'Too many search results for <strong>'
													+ $(
															'#tableAddAction input:first')
															.val().trim()
													+ '</strong>. Please select a user from the list below.');

							$('#dialog-verify').parent().find(
									'.ui-dialog-titlebar .ui-dialog-title')
									.text('Verify User');
							$('#dialog-verify .ContentTable').html('');
							$('#dialog-verify .ContentTable').html(tblHdr);
							$('#dialog-verify .noteLbl').remove();
							$("#dialog-verify").dialog("open");
							if (j > 9) {
								$('.verifyPagination').removeClass('hideBlock');
								$('.verifyPagination').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPage,
									onPageClick : function(pageNumber) {
										showVerifyPage(pageNumber);

									}

								});
							} else {
								$('.verifyPagination').addClass('hideBlock');
							}
							bindVerifyContent(flag);
						} else {
							if (flag == 'user') {

								$('#dialog-verify .ContentTable').html('');
								$('#dialog-verify .ContentTable').html(tblHdr);
								bindVerifyContent(flag);
								var m = undefined;
								for (m in storeMap) {
								}
								console.log('to trigger click:' + m);
								$('[selectfor="' + m + '"]').trigger('click');
								// if (!activeFlag) {
								// $('#tableAddAction input:first')
								// .val(userId);
								// $('#saleOrg').val(saleOrg);
								// $('#verifyLabel').removeClass('hideBlock');
								// } else {
								// if(mappedStores[0]==''){
								// showInformation('User <b>'+userId+'</b> is
								// already active in Admin role,Please
								// deactivate user to assign new role.');
								// }else{
								// if(isStoreManager){
								// if(mappedStores.indexOf($('#posSite').val())!=-1){
								// showInformation('User <b>'+userId+'</b> is
								// already active in logged in store.');
								// }else{
								// showWarningMsg(activeStore+"</i></b><br>Would
								// you like to
								// continue?",userId,salesOrg,mappedStores);
								// }
								// }else{
								// showWarningMsg(activeStore+"</i></b><br>Would
								// you like to
								// continue?",userId,salesOrg,mappedStores);
								// }
								//										
								// // showError(activeStore);
								// }
								// }
							} else {
								$('#tableAddAction #userID1').val(userId);
								$('.roleList').val(role);
							}
						}

					} else {
						showError('Invalid User Id/Name');
						// $('#dialog-modal').dialog('open').removeClass('visible-hide');
					}
					stopLoading();
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					stopLoading();
				}
			});
}

function showError(text) {

	$('.errorDivition').removeClass('warnDiv').removeClass('errorDiv')
			.addClass('errorDiv').removeClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text(text);
}

function hideError() {
	$('.errorDivition').removeClass('warnDiv').removeClass('errorDiv')
			.addClass('errorDiv').addClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text('');
}

function showWarn(text) {
	$('.errorDivition').removeClass('errorDiv').removeClass('warnDiv')
			.addClass('warnDiv').removeClass('hideBlock');
	$('.errorDivition label:first').text(text);
}

function bindVerifyContent(flag) {
	// if(flag=='user')
	// $(".sortPopUpTbl").tablesort();
	$('#dialog-verify .textbox').attr('placeholder', 'Enter user id or name');
	$('#dialog-verify .textbox').val('');
	$('#userID').val('');
	$('.verifyItem').unbind('click');

	$('.verifyItem')
			.click(
					function() {
						hideError();

						var userId = $(this).attr('selectfor');
						verifiedUserElem = $('[masterrow="' + userId + '"]');
						$('#userVerifiedContent').html(verifiedUserElem.html());
						verifiedUserElem = $('#userVerifiedContent');
						var userId = verifiedUserElem.find('.userId').text()
								+ ' - '
								+ verifiedUserElem.find('.userName').text();
						if (flag == 'user') {
							var adminElem = verifiedUserElem
									.find('[adminrole]');
							var storeElems = verifiedUserElem
									.find('[storerole]');

							if (adminElem.hasClass('success')) {
							    showInformation('User <b>' + userId + '</b> is already active(Future active) as <B>' + adminElem.first().text() + '</b>,Please deactivate user to assign new role.');
							} else if (storeElems.length > 0) {
							    if (isStoreManager && verifiedUserElem.find('[siteno="' + $('#posSite').val() + '"]').length > 0) {
							        if (verifiedUserElem.find('[siteno="' + $('#posSite').val() + '"]').hasClass('deactive')) {
							            showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
							        } else {
							            showInformation('User <B> ' + userId + ' </b> is already mapped to logged in store. <b><i>');
							        }
							    } else if (storeElems.hasClass('success')) {
							        activeStore = 'User <B> ' + userId + ' </b> is currently active in store(s) <b><i> ';
							        var stores = '';
							        for (var i = 0; i < storeElems.length; i++) {
							            if (storeElems.eq(i).hasClass('success')) {
							                if (stores == '') {
							                    stores += storeElems.eq(i).text();
							                } else {
							                    stores += ',' + storeElems.eq(i).text();
							                }
							            }
							        }
							        activeStore += stores;
							        showWarningMsg(
							            activeStore + "</i></b><br>Would you like to continue?",
							            userId, '', verifiedUserElem);
							    } else {
							        $('#tableAddAction input:first').val(
							            userId.trim());
							        $('#verifyLabel').removeClass('hideBlock');
							        $("#dialog-verify").dialog("close");
							    }
							} else {
							    $('#tableAddAction input:first').val(
							        userId.trim());
							    $('#verifyLabel').removeClass('hideBlock');
							    $("#dialog-verify").dialog("close");
							}
							}
					});

	// $('.verifyItem').click(
	// function() {
	// hideError();
	// if (flag == 'user') {
	//					
	//					
	// if($(this).parent().parent().parent().find('.multiStore').length>0)
	// {
	// var mapStores=[];
	// var
	// userId=$(this).parent().parent().parent().find('td:first').text().trim()+
	// ' - '
	// +
	// $(this).parent().parent().parent().find('td:nth-child(2)').text().trim();
	//					
	// var activeStore = 'User <B> '
	// + userId
	// + ' </b> is already mapped in store <b><i>';
	// var firstFlag=true;
	// $(this).parent().parent().parent().find('.multiStore').each(function(){
	// if(!firstFlag) activeStore+=',';firstFlag=false;
	// activeStore+=$(this).text();
	// mapStores.push($(this).text().split('|')[0].trim());
	// });
	//						
	//						
	// if(isStoreManager){
	// console.log(mapStores);
	// if(mapStores.indexOf($('#posSite').val())!=-1){
	// showInformation('User <B> '+ userId+ ' </b> is already mapped to logged
	// in store. <b><i>');
	// }else{
	// showWarningMsg(activeStore+"</i></b><br>Would you like to
	// continue?",userId,'',mapStores);
	// }
	// }else{
	// showWarningMsg(activeStore+"</i></b><br>Would you like to
	// continue?",userId,'',mapStores);
	// }
	//						
	// }else{
	// var
	// userId=$(this).parent().parent().parent().find('td:first').text().trim()+
	// ' - '
	// +
	// $(this).parent().parent().parent().find('td:nth-child(2)').text().trim();
	// var
	// role=$(this).parent().parent().parent().find('td:nth-child(3)').text();
	// console.log("role :"+role);
	// if(isAdminRole(role) && role!=''){
	// showInformation('User <b>'+userId+'</b> is already active in Admin
	// role,Please deactivate user to assign new role.');
	// }else{
	// $('#tableAddAction input:first').val(
	// $(this).parent().parent().parent().find('td:first')
	// .text().trim()
	// + ' - '
	// + $(this).parent().parent().parent().find(
	// 'td:nth-child(2)').text().trim());
	// $('#verifyLabel').removeClass('hideBlock');
	// $("#dialog-verify").dialog("close");
	// }
	// }
	//					
	//					
	// } else {
	// $('#tableAddAction #userID1').val(
	// $(this).parent().parent().parent().find('td:first')
	// .text().trim()
	// + ' - '
	// + $(this).parent().parent().parent().find(
	// 'td:nth-child(2)').text().trim());
	// $('.roleList').val(
	// $(this).parent().parent().parent().find(
	// 'td:nth-child(3)').text());
	// $('.salesOrgMap').val(
	// $(this).parent().parent().parent().find(
	// 'td:nth-child(6)').text().split('|')[0]
	// .trim());
	// bindSalesOrgChange(true);
	// $('.storeList').html('');
	// $('#multiplePOS input').val(
	// $(this).parent().parent().parent().find(
	// 'td:nth-child(7)').text().split('|')[0]
	// .trim());
	// department = $(this).parent().parent().parent().find(
	// 'td:nth-child(5)').text().split('|')[0].trim();
	// setTimeout(function() {
	// $('.verifyStore').click();
	// }, 500);
	// $("#dialog-verify").dialog("close");
	// }
	//				
	// });

}
function bindStoreContent(flag) {
	// $(".sortPopUpTbl").tablesort();
	$('#dialog-verify .textbox').attr('placeholder', 'Enter store no or name');
	$('#dialog-verify .textbox').val('');
	if (flag) {
		$('.selectStore')
				.click(
						function() {
							hideError();
							var siteNoTmp = $(this).parent().parent().parent()
									.find('td:first').text().trim();
							var isAlreadyMappedStore = false;
							var isAlreadyMappedStoreInactive = false;
							if (!isStoreManager) {
								verifiedUserElem
										.find('[storerole]')
										.each(
												function() {
													if ($(this).attr('siteno') == siteNoTmp)
														isAlreadyMappedStore = true;
														if($(this).hasClass('deactive')){
															isAlreadyMappedStoreInactive = true;
														}
												});
							}

							if (isAlreadyMappedStore) {
								if(isAlreadyMappedStoreInactive){
									showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
								}else{
									showInformation('User is already mapped to the store.');
								}
								$('#multiplePOS input:first').val('').focus();
							} else {
								var storeNo = $(this).parent().parent()
										.parent().find('td:first').text()
										.trim();
								if ($('.storeList').find('#' + storeNo).length > 0) {
									showError('Store already exist.');
								} else {
									if ($('.storeList').children().length == 0)
										$('.storeList')
												.removeClass('hideBlock')
												.html(
														'<li><label class="verifiedStore" id="'
																+ storeNo
																+ '">'
																+ $(this)
																		.parent()
																		.parent()
																		.parent()
																		.find(
																				'td:first')
																		.text()
																		.trim()
																+ ' | '
																+ $(this)
																		.parent()
																		.parent()
																		.parent()
																		.find(
																				'td:nth-child(2)')
																		.text()
																		.trim()
																+ ' </label><label class="closeMessage removeStore">&nbsp;</label></li>');
									else
										$('.storeList')
												.removeClass('hideBlock')
												.children(':last')
												.after(
														'<li><label class="verifiedStore" id="'+$(this).parent().parent().parent().find('td:first').text().trim()+'">'
																+ $(this)
																		.parent()
																		.parent()
																		.parent()
																		.find(
																				'td:first')
																		.text()
																		.trim()
																+ ' | '
																+ $(this)
																		.parent()
																		.parent()
																		.parent()
																		.find(
																				'td:nth-child(2)')
																		.text()
																		.trim()
																+ ' </label><label class="closeMessage removeStore">&nbsp;</label></li>');
									// $('#verifyLabel').removeClass('hideBlock');
									removeStore();
									$("#dialog-verify").dialog("close");
								}
							}
						});
	} else {
		$('.selectStore').click(
				function() {
					hideError();
					$('#dialog-modal-Edit #singlePOS input').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim()
									+ ' - '
									+ $(this).parent().parent().parent().find(
											'td:nth-child(2)').text().trim());
					$("#dialog-verify").dialog("close");
				});
	}
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

function createUser(data, newRow, user, store) {
	data += "&siteNo=" + store;
	$.ajax({
		data : data,
		url : "updateUser.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
			if (response == 'true') {
				arrangeRow(newRow);
				userNumber = user;
				siteNo = store;
				showAlertAndDtl('User created successfully and may take up to 5 minutes to become active.',
						'../itAdmin/itAdminUserMgt.htm', 'User Management',
						true, user, store);
				resetFields();
			} else if (response == 'false') {
				showError('User creation Failed.');
			} else {
				showError(response);
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.');
			stopLoading();
		}
	});

}

function arrangeRow(newRow) {
	// setTimeout(function(){window.location.href='../itAdmin/itAdminUserMgt.htm'};,500);
	$('#userList tbody').children(':first').before(newRow);
	var recCnt = $('.contentTr').length;
	currentPage = 1;
	if (recCnt > 10) {
		$('.searchPagination').removeClass('hideBlock');
		$('.searchPagination').pagination({
			items : recCnt,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			onPageClick : function(pageNumber) {
				showPage(pageNumber);

			}

		});
	} else {
		$('.searchPagination').addClass('hideBlock');
	}

	var i = 1;
	var cnt = 1;
	$('.contentTr ').each(function() {
		$(this).attr('class', '');
		$(this).addClass('contentTr').addClass('pageNo-' + cnt);
		if (cnt > 1)
			$(this).addClass('hideBlock');
		if (i % 10 == 0) {
			cnt++;
		}
		i++;
		// //console.log(i++);
	});
	$('.contentTr').click(function() {
		hideError();
		var user = $(this).find('td:first').text().trim();
		userNumber = $(this).find('td:first').text().trim();
		var store = $(this).find('td:nth-child(5)').text().split(' ').trim();
		if (store == '') {
			store = 'NONE';
		}
		getUserDtl({
			userId : user,
			storeId : store
		});
		// console.log('content');
	});
}

function resetFields() {
	$('#tableAddAction #userID1').val('');
	$('#tableAddAction input:first').val('');
	if (isStoreManager) {

	} else if (isSalesOrgManager) {
		$('.roleList,.department').val('Select');
		$('.roleList,.department').trigger('change');
		$('.storeList').html('');
		$('#multiplePOS input:first').val('');
	} else {
		$('.roleList,.department,.salesOrgMap').val('Select');
		$('.roleList,.department,.salesOrgMap').trigger('change');
		$('.storeList').html('');
		$('#multiplePOS input:first').val('');
	}
	$('.roleList,.department').val('Select');
	$('.roleList,.department').trigger('change');
	$('#verifyLabel').addClass('hideBlock');
	setDefaultDate();
	deactivate();
}

function deactivateUser(data, event) {
	$
			.ajax({
				data : data,
				url : "deActivateUser.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = response .split("+");	
					if (res[0] == 'true' || res[0] == 'true+true') {
						
						/*getUserDtl({
							userId : data.userId,
							storeId : data.siteNo
						});*/
						
						event.addClass('hideBlock');
						event
								.parent()
								.parent()
								.parent()
								.find('.statusFlag')
								.html(
										'<label class="deactive">Inactive</label>');
						/*event
						.parent()
						.parent()
						.parent()
						.find('.changePassword').addClass('hideBlock');*/
						
						event.parent().parent().parent().find('.primaryFlag')
								.next().html(getYesterdaysDate());
						var child = event.parent().parent().parent().children(
								':nth-child(5)').text().split('|')[0];
						var parent = event.parent().parent().parent().prev()
								.parent().parent().parent().parent().prev()
								.children(':nth-child(5)').text().split('|')[0];
						if (child != null && child != undefined
								&& child.trim() != '' && parent != null
								&& parent != undefined && parent.trim() != ''
								&& parent.trim() == child.trim()) {
							event
									.parent()
									.parent()
									.parent()
									.prev()
									.parent()
									.parent()
									.parent()
									.parent()
									.prev()
									.children(':nth-child(6)')
									.html(
											'<label class="deactive">Inactive</label>'
									);

							// Added for on detail page deactivate

						}
						$('.deactivateBtn').remove();
						$('.changePwd ').remove();
						
						$('.dtlStatus').html(
								'<label class="pending">Pending</label>');
						$('.activeTo').html(getYesterdaysDate());
						$('.orderDetails .lastRow .lastColumn').html(
								getTodayDate());
						$('.orderDetails tr .lastColumn:first').html('TIM');
						// event.parent().parent().parent().find('td:nth-child(4)').text('Deactive');
						activeFlag='N';					
						$('.additionalAccess').click();
						$('.additionalAccess').parent().addClass('hideBlock');
						
						//if (res[1] == 'true')
						//{
						//window.location.href = "../itAdmin/itAdminUserMgt.htm";
						//}
						
						}
					else if (res[0] == 'false') {
						// showError('User Deactivation Failed.');
						showAlert('User Deactivation Failed',
								'../itAdmin/itAdminUserMgt.htm',
								'User Management', false);
					} else {
						showAlert('User Deactivation Failed<br><b>' + response,
								'../itAdmin/itAdminUserMgt.htm',
								'User Management', false);
					}
					stopLoading();
					$("#dialog-modalDeactive").dialog('close');
				},
				error : function() {
					showAlert(
							'Technical issue occured,Please contact java support.',
							'../itAdmin/itAdminUserMgt.htm', 'User Management',
							false);
					stopLoading();
				}
			});
}

function deactivateUserOnDetail(data, event) {
	$.ajax({
		data : data,
		url : "deActivateUser.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response == 'true' || response == 'true+true') {
				
				showAlertAndDtl('User deactivation request submitted for process and may take up to 5 minutes to become inactive.',
								'../itAdmin/itAdminUserMgt.htm',
								'User Management', true,data.userId,
								data.siteNo);
				
				/*getUserDtl({
					userId : data.userId,
					storeId : data.siteNo
				});*/
				/*$('.deactivateBtn').parent().remove();
				$('.dtlStatus')
						.html('<label class="deactive">Inactive</label>');
				$('.activeTo').html(getYesterdaysDate());
				$('.orderDetails .lastRow .lastColumn').html(getTodayDate());
				$('.orderDetails tr .lastColumn:first').html('TIM');*/

			} else if (response == 'false') {
				// showError('User Deactivation Failed.');
				showAlert('User Deactivation Failed',
						'../itAdmin/itAdminUserMgt.htm', 'User Management',
						false);
			} else {
				showAlert('User Deactivation Failed<br><b>' + response,
						'../itAdmin/itAdminUserMgt.htm', 'User Management',
						false);
			}
			stopLoading();
			$("#dialog-modalDeactive").dialog('close');
		},
		error : function() {
			showAlert('Technical issue occured,Please contact java support.',
					'../itAdmin/itAdminUserMgt.htm', 'User Management', false);
			stopLoading();
		}
	});
}

function restPwd(data, userId, e) {
	$.ajax({
		type : "get",
		url : "resetPwd.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log('Reset password :' + response);
			response=$.parseJSON(response);
			if (response!=undefined && response!=null && response.typ=='success' && response != '') {
				
				if(response.timOffline==true || response.timOffline=='true'){
					showAlert('Password has been successfully reset to user ID followed by r'+response.msg+'<br><br><div class="errorDivition errorDiv" style="display: inline-table;"><label class="warnin">System is currently offline. Password reset will be valid for Store Central only until the system is back online.</label> </div>',
							'../itAdmin/itAdminUserMgt.htm', 'User Management',
							false);
				}else{
					showAlert('Password has been successfully reset to user ID followed by r'+response.msg+'',
							'../itAdmin/itAdminUserMgt.htm', 'User Management',
							false);
				}
				updatePwdInLocalDB(data);
				try {
					currentRow.parent().parent().parent().find(
							'.locedStatusClass')
							.removeClass('locedStatusClass');
				} catch (err) {
					console.log(err);
				}
				
			} else {
				showAlert(/*'Password reset failed <br><b>' +*/ response.msg,
						'../itAdmin/itAdminUserMgt.htm', 'User Management',
						false);
				//resetPasswordToLocalDb(userId,data.newPwd,"Y",$('#posSite').val());
			}
			
			stopLoading();
		},
		error : function() {
			showAlert('Technical issue occured,Please contact java support.',
					'../itAdmin/itAdminUserMgt.htm', 'User Management', false);
			showError('Technical issue occured,Please contact java support.',
					'dialog-forgotWizard');
			stopLoading();
		}
	});

}

function updatePwdInLocalDB(param){
	if(isStoreManager && $('#ngboPilotStore').val() == 'Y'){
		var data = {"user_id":param.userNo,"pwd":param.newPwd,"expiry_flag":"Y"};
		console.log("changePwdLocalURL = "+changePwdLocalURL+ "  "+ JSON.stringify(data));
		$.ajax({
			type : "post",
			url : changePwdLocalURL,
			data : JSON.stringify(data),
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				console.log('Reset password :' + response);
				stopLoading();
			},
			error : function(err) {
				console.log('Reset password :' + err);
				stopLoading();
			}
		});
	}
}
function showErrorInPopup(msg, id) {

	//
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg);
	else {
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').addClass('popupError').text(msg);
		$('#' + id + ' .popupActions').parent().removeClass('hideBlock');
	}
}

function showWarningInPopup(msg, id) {
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg).removeClass(
				'popupWarning').addClass('popupWarning').text(msg);
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').addClass('popupWarning').text(msg);
	// $('#'+id+' .popupActions').parent().removeClass('hideBlock');
}

function hideErrorInPopup(id) {
	// $('#'+id+'
	// .popupActions').prev().removeClass('popupError,popupWarning').addClass('popupError').text('');
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text('');
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').text('');
}

function changePwd(e, user) {
	var userId = user;
	$('.newPass').val('');
	$('.conNewPass').val('');
	hideErrorInPopup('dialog-forgotWizard');
	/*
	 * $('.changePass') .click( function() {
	 */
	hideErrorInPopup('dialog-forgotWizard');
	$('.errorDiv label').text('');

	var newPassword = user;// $('.newPass').val();
	// var currPass = $('.currPass').val();
	var conNewPass = user;// $('.conNewPass').val();
	// var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;
	if (newPassword == "" || newPassword == null) {
		showErrorInPopup('Please enter New Password', 'dialog-forgotWizard');
	} else if (conNewPass == "" || conNewPass == null) {
		showErrorInPopup('Please enter Confirm Password', 'dialog-forgotWizard');
	} else if (conNewPass != newPassword) {
		showErrorInPopup('Passwords does not match.', 'dialog-forgotWizard');
	} else {
		restPwd({
			oldPwd : "",
			newPwd : newPassword,// $('.newPass').val(),
			userNo : userId
		}, userId, e);
	}

	// });

}
var deptList = [];

function getUserDtl(data) {

	$
			.ajax({
				data : data,
				url : "userDtls.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = $.parseJSON(response);
					if (res.data != null && res.msg == 'true') {
						var storeMap = res.data;
						var j = 0;
						var content = '';

						for ( var m in storeMap) {
							// console.log(j++);
							j++;
							var list = storeMap[m];

							userId = list[0].userId;
							role = list[0].roleId;
							saleOrg = list[0].salesOrg;
							siteNo = list[0].siteId;
							siteName = list[0].siteName;
							deptList = list[0].deptList;
							list[0].updatedDate = (list[0].updatedDate != null) ? list[0].updatedDate
									: '';
							list[0].updatedUserId = (list[0].updatedUserId != null) ? list[0].updatedUserId
									: '';
							list[0].dept = (list[0].dept != null) ? list[0].dept
									: '';
							list[0].deptName = (list[0].deptName != null) ? list[0].deptName
									: '';
							content += '<div class="contentWrapper detailsContent"><div class="articleHead"><div class="articleHeaderWrapper" style="width: 100%;"><h2 class="articleTitle">'
									+ list[0].userName
									+ ' ('
									+ list[0].userId
									+ ') </h2>';

							content += '<div class="articleActionBtns" style="margin-top: -27px;" >';
							if (list[0].primary_strore == 'Y')
								content += '<label class="positiveStatus hideBlock"></label>';
							else
								content += '<label class="negativeStatus hideBlock"></label>';

							content += '<label class="orderStatus">Status: <strong class="dtlStatus">';
							if (list[0].activeFlag == 'Y')
								content += '<label class="success">Active</label>';
							else if (list[0].activeFlag == 'P')
								content += '<label class="">Pending</label>';
							else
								content += '<label class="deactive">Inactive</label>';
							content += '</label>';
							activeFlag=list[0].activeFlag ;
							if (list[0].activeFlag != 'P') {
								content += '</strong></label><label class="actionBtn editButton '+updateUserDtl+'"><label class="editBtn ">Edit</label></label>';
							}else{
								content += '</strong>';
							}
							if (list[0].activeFlag == 'P') {
								content += '<label class="actionBtn refreshUserDtl '+updateUserDtl+'"><label class="refresh">Refresh</label></label>';
							}
							//if (list[0].activeFlag != 'P') {
							content += '<label class="actionBtn changePwd '+updateUserDtl+'"><label class="key">Reset Password</label></label>';
							//}
							
							if (list[0].activeFlag == 'Y' && role!='D' && role!='P') {
								content +=
								'<label class="actionBtn deactivateBtn '+updateUserDtl+'"><label class="deactivate ">Deactivate</label></label>'
								 ;
							}
							//6715 defect rectification in above two lines
							content += '</div>';

							content += '<p style="padding-top: 15px;"><label class="articlePriceLabel">Role: <strong class="usrRole hideBlock">'
									+ list[0].roleId
									+ '</strong><strong class="roleDesc">'
									+ list[0].roleDesc
									+ '</strong></label>'
									+ '<label class="articlePriceLabel">|</label><label class="articlePriceLabel">Primary Dept:';

							if (list[0].deptList.length > 0) {
								content += '<strong class="deptDtl">'
										+ list[0].deptList[0].replace('-', '|')
										+ '</strong>';

								if (list[0].deptList.length > 1) {
									content += '<a class="moreNumber moredept" title="';
									for ( var k = 1; k < list[0].deptList.length; k++) {
										content += '&#13;'
												+ list[0].deptList[k].replace(
														'-', '|');
									}
									content += '" > + '
											+ (list[0].deptList.length - 1)
											+ 'more</a>'
								}
							}

							content += '</label>'
									+ '<label class="articlePriceLabel">|</label><label class="articlePriceLabel">Last Login: <strong class="deptDtl">'
									+ (list[0].lastLoggedinTime != null ? list[0].lastLoggedinTime
											: '') + '</strong></label>'
									+ '</p></div>';
							
							if(list[0].updatedUserId=='TIM'){
								list[0].updatedUserId='System';
							}

							content += '</div><div class="articleContent orderDetails"><div class="articleContentInner">'
									+ '<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr><td class="keyInfo">Active From:</td>'
									+ '<td class="valueInfo activeFrom">'
									+ list[0].acticeStartDate
									+ '</td><td class="keyInfo">Sales Organisation:</td><td class="valueInfo dSales userDtlSalesOrg">'
									+ list[0].salesOrg
									+ ' | '
									+ list[0].salesOrgName
									+ '</td><td class="keyInfo">'
									+ 'Updated By:</td><td title="'+(list[0].updatedUserName != null && list[0].updatedUserName != undefined ? list[0].updatedUserName : (list[0].updatedUserId == 'System' ? 'System' : ''))+'" class="valueInfo moredept lastColumn">'
									+ list[0].updatedUserId
									+ '</td></tr><tr class="lastRow"><td class="keyInfo">Active To:</td><td class="valueInfo activeTo">'
									+ list[0].acticeEndDate
									+ '</td><td class="keyInfo">Stores:</td><td class="valueInfo">';
							for ( var i = 0; i < list.length; i++) {

								if (list[i].siteId == null
										|| list[i].siteId == undefined
										|| list[i].siteId.toLowerCase() == 'none')
									list[i].siteId = 'All';
								if (list[i].siteName == null
										|| list[i].siteName == undefined
										|| list[i].siteName.toLowerCase() == 'none')
									list[i].siteName = '';

								content += '<label class="multi userDtlStore">'
										+ list[i].siteId;
								if (list[i].siteId != ''
										&& list[i].siteName != '')
									content += ' | ';
								content += list[i].siteName + '</label>';

								if (i == list.length - 1) {
									content += '</td><td class="keyInfo">Updated On:</td><td class="valueInfo lastColumn">'
											+ list[0].updatedDate
											+ '</td></tr></tbody></table></div></div></div>'
											+ '<div class="ContentTableWrapper" ><div class="tableInfo tempPadding"><div class="tableTitle"><h4 class="sectionTitle adTitle hideBlock">Access to various functions</h4>'
											+ '</div><div class="tableActionBtns"><label class="actionBtn"><label class="notepad additionalAccess">Additional Access</label></label></div></div></div></div>';
								}
							}
						}

						showDetailsPage(content, userId, deptList);
						deactivateOnDetails();
						$('.moredept').tooltip({
							tooltipClass : 'tmptooltipClass'
						});
					} else {
						showError('Sorry no results found.');

					}
					//stopLoading();
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					stopLoading();
				}
			});
}

function showDetailsPage(content, userId) {
	// siteNo=
	$('.adminWrapper').addClass('hideBlock');
	$('.detailsContent').remove();
	$('.adminWrapper').after(content);
	$('.breadcrumbWrapper li:nth-child(2)').addClass('hideBlock');
	$('.breadcrumbWrapper li:nth-child(3),.breadcrumbWrapper li:nth-child(4)')
			.removeClass('hideBlock');
	$('.detailsContent .ContentTableWrapper').css('overflow-y', 'visible');
	$('.detailsContent .ContentTableWrapper .tableInfo').css('overflow',
			'visible');
	$('.moreNumber').tooltip({
		tooltipClass : 'tmptooltipClass'
	});
	$('.refreshUserDtl').click(function(){
		var store='';
		try{
			store=$('.userDtlStore').text().split('|')[0].trim();
		}catch(err){
			store='';
		}
		if (store == '' || store == 'All') {
			store = 'NONE';
		}
		getUserDtl({
			userId : userId,
			storeId : store
		});
	});
	$('.editButton')
			.click(
					function() {
						
						// console.log('edit');
						$('#fromDte').removeAttr('disabled')
								.removeAttr('style');
						$('#dialog-modal-Edit .selectOptions').val('Select');
						$('.popUpDept').html('<option>Select</option>');
						$('#singlePOS input').val('');
						hideErrorInPopup('dialog-forgotWizard');
						$('#fromDte').val($('.activeFrom').text());
						$('#toDte').val($('.activeTo').text());

						$('#singlePOS input').val(
								$('.multi').text().replace('|', '-').trim());

						$('.popUpSalesOrg').val(
								$('.dSales').text().split('|')[0].trim());
						;

						$('.popUpSalesOrg').trigger('change');
						$('.popUpSalesOrg').attr('disabled', 'disabled');
						/*
						 * if(roles!=null && roles!=undefined && roles!='') {
						 * formRoleOptions($(roles).attr($('.popUpSalesOrg').val()),$('.popUpRoles')); }
						 */

						if (isAdminRole($('.usrRole').text().trim())) {
							$('.popUpRoles option')
									.attr('disabled', 'disabled');
							$('.popUpRoles option#ITS').removeAttr('disabled');
							$('.popUpRoles option#SS').removeAttr('disabled');
							$('.popUpRoles option#ADM').removeAttr('disabled');
							$('.popUpRoles option#POSRP')
									.removeAttr('disabled');
							$('.popUpRoles option#BR').removeAttr('disabled');

							$('.popUpRoles option#STOTM')
									.removeAttr('disabled');
							$('.popUpRoles option#STTM').removeAttr('disabled');
							$('.popUpRoles option#RDOU').removeAttr('disabled');
							$('.popUpRoles option#ITS1').removeAttr('disabled');
							$('.popUpRoles option#ITS2').removeAttr('disabled');
							$('.popUpRoles option#ITUA').removeAttr('disabled');
							$('.popUpSalesOrg').removeAttr('disabled');
							$('.popUpRoles').unbind('change');

						} else{ /*
								 * if ($('.usrRole').text().trim() == MA ||
								 * $('.usrRole').text().trim() == TL ||
								 * $('.usrRole').text().trim() == STM ||
								 * $('.usrRole').text().trim() == OA ||
								 * $('.usrRole').text().trim() == OS ||
								 * $('.usrRole').text().trim() == TM)
								 */
							$('.popUpRoles option')
									.attr('disabled', 'disabled');
							$('.popUpRoles option#MA').removeAttr('disabled');
							$('.popUpRoles option#TL').removeAttr('disabled');
							$('.popUpRoles option#STM').removeAttr('disabled');
							$('.popUpRoles option#OA').removeAttr('disabled');
							$('.popUpRoles option#OS').removeAttr('disabled');
							$('.popUpRoles option#TM').removeAttr('disabled');
							$('.popUpRoles option#SSA').removeAttr('disabled');//Defect no 2609
							$('.popUpRoles option#SC').removeAttr('disabled');
							$('.popUpRoles option#CO').removeAttr('disabled');
							$('.popUpRoles option#SDA').removeAttr('disabled');
							$('.popUpRoles').unbind('change');
							$('.popUpRoles')
									.change(
											function() {
												if ($('.usrRole').text().trim() != $(
														this).val()) {
													if($('[userchecked]').length>0){
														showWarningMsgForRoleChange('<B>'
																+ $('.articleTitle')
																		.text()
																+ '</b> has created shortcuts which will be lost as a result of the role change. Continue?  <br> Note: Pos Functions will also be deactivated accordingly.');
													}else{
														showWarningMsgForRoleChange('<B>'
																+ $('.articleTitle')
																		.text()
																+ '</b> has created shortcuts which will be lost as a result of the role change. Continue?');
													}
												}
											});
						}
						$('.popUpRoles').val($('.usrRole').text().trim());

						setTimeout(function() {
							$('.popUpDept').val(
									$('.deptDtl').text().split('-')[0].trim());
						}, 500);
						$('.formWrapper .errorDiv label:first').text('');
						hideErrorInPopup('dialog-forgotWizard');
						$('#dialog-modal-Edit').dialog('open');
						// $("#fromDte").datepicker("destroy");

						// setTimeout(function(){$("#fromDte").datepicker();},10000);
						// $('#singlePOS input').focus();
						// $('#fromDte').focus();
						$("#fromDte,#toDte").datepicker("destroy");						
						$("#fromDte").not('.hasDatePicker').datepicker();
						$("#toDte").not('.hasDatePicker').datepicker();
						if ($('.usrRole').text().trim()=='D') {
							$('#fromDte').val('');
							$('#toDte').val('');
						} else if ($('.dtlStatus').text().trim() == 'Active') {
							$('#fromDte').attr('disabled', 'disabled').attr(
									'style', 'background: rgb(217, 217, 217)');
							//$('#toDte').focus();
						} else {
							//$("#fromDte").focus();
						}
						
						
					});

	$('.breadcrumbWrapper li:nth-child(3)').click(function() {
		showSearchPage();
	});
	$('.additionalAccess')
			.click(
					function() {
						$('.adTitle').removeClass('hideBlock');
						$('.detailsContent .ContentTableWrapper .tableInfo')
								.css('overflow', 'auto');
						getAdditionalAccess({
							userNo : userNumber,
							sOrg : saleOrg,
							userRole : $('.usrRole').text(),
							userStore : ($('.userDtlStore').text().trim() != '' ? $(
									'.userDtlStore').text().split('|')[0]
									.trim()
									: ''),
							userDtlSalesOrg : $('.userDtlSalesOrg').text()
									.split('|')[0].trim()
						});
					});

	$('.changePwd').click(
			function() {
				currentRow = $(this);
				hideError();
				// e.stopPropagation();
				$('#dialog-changePassword .ContentTableWrapper.formWrapper ')
						.children(':first').addClass('hideBlock');
				// $('#dialog-changePassword').dialog('open');
				changePwd($(this), userId);
			});
	$('.additionalAccess').trigger('click');
	$('.additionalAccess').parent().addClass('hideBlock');
	
}

function showSearchPage(currentPagetmp) {
	$('.adminWrapper').removeClass('hideBlock');
	$('.adminWrapper').next().remove();
	$('.breadcrumbWrapper li:nth-child(2)').removeClass('hideBlock');
	$('.breadcrumbWrapper li:nth-child(3),.breadcrumbWrapper li:nth-child(4)')
			.addClass('hideBlock');
	searchUserDtl(tmpdata, currentPagetmp);
}

var userUpdateData = undefined;
function updateUser(data) {
	userUpdateData = data;
	$
			.ajax({
				data : data,
				url : "updateUser.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if (response == 'true') {
						showAlertAndDtl('User details submitted for update and may take up to 5 minutes to become active.',
								'../itAdmin/itAdminUserMgt.htm',
								'User Management', true, userUpdateData.userId,
								userUpdateData.siteNo);
						$('[data_row="' + userUpdateData.userId + userUpdateData.siteNo + '"]').attr('roleCode', userUpdateData.roleId);
						//6755 defect is rectified  
						setTimeout(function() {
							$('#dialog-modal-Edit').dialog('close');
						}, 100);
						
						// $('.additionalAccess').click();
						// $('.additionalAccess').parent().addClass('hideBlock');
						// updateDtsAndSearch();
					} else if (response == 'false') {
						showErrorInPopup('User creation Failed.',
								'dialog-forgotWizard');
					} else {
						showErrorInPopup(response, 'dialog-forgotWizard');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
					showErrorInPopup('User detail update Failed.',
							'dialog-forgotWizard');
				}
			});

}

function updateDtsAndSearch() {
	var fromDt = $('#fromDte').val();
	var toDt = $('#toDte').val();
	var role = $('#' + $('#dialog-modal-Edit .popUpRoles').val()).text();
	var store = $('#dialog-modal-Edit #singlePOS input').val().trim().replace(
			'-', '|');
	var dept = ($('.popUpDept').val() == 'Select') ? '' : $('.popUpDept').val()
			+ ' | ' + $('#' + $('.popUpDept').val()).text();
	var salesOrg = $('.popUpSalesOrg').val() + ' | '
			+ $('#' + $('.popUpSalesOrg').val()).text();
	var status = '';
	var flag = true;

	var date2 = new Date();
	var part = toDt.split('/');
	date2.setFullYear(part[2], part[1] - 1, part[0]);

	var curDate = new Date();
	var today = new Date();
	curDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());

	if (curDate.getTime() > date2.getTime()) {
		status = 'Inactive';
		flag = false;
	} else {
		status = 'Active';
		flag = true;
	}

	$('.activeFrom').text(fromDt);
	$('.activeTo').text(toDt);
	$('.roleDesc').text(role);
	$('.usrRole').text($('#dialog-modal-Edit .popUpRoles').val());
	$('.dtlStatus').text(status);
	$('.multi').text(store);
	$('.deptDtl').text(dept);
	$('.salesOrgDtl').text(salesOrg);

	// NEED TO CHANGE

	// $('.contentTd').filter(function(){
	// if($(this).text().split('-')[0].trim()==userNumber)
	// {
	$('.contentRow')
			.filter(
					function() {

						if ($(this).children(':nth-child(5)').text().trim()
								.split('|')[0].trim() == siteNo
								&& $(this).children(':nth-child(1)').text()
										.trim() == userNumber) {
							console.log(role);
							$(this).children(':nth-child(3)').text(role);
							$(this).children(':nth-child(4)').text(dept);
							$(this).children(':nth-child(5)').text(store);
							$(this).children(':nth-child(6)').text(status);

							if (flag) {
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').parent()
										.removeClass('hideBlock');
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').removeClass(
										'hideBlock');
							} else {
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').parent().addClass(
										'hideBlock');
								$(this).children(':nth-child(8)').find(
										'.deactivateUser')
										.addClass('hideBlock');
							}
						}

						// });
						// }
					});
	$('.contentTr')
			.filter(
					function() {

						if ($(this).children(':nth-child(5)').text().trim()
								.split('|')[0].trim() == siteNo
								&& $(this).children(':nth-child(1)').text()
										.trim() == userNumber) {
							console.log(role);
							$(this).children(':nth-child(3)').text(role);
							$(this).children(':nth-child(4)').text(dept);
							$(this).children(':nth-child(5)').text(store);
							$(this).children(':nth-child(6)').text(status);

							if (flag) {
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').parent()
										.removeClass('hideBlock');
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').removeClass(
										'hideBlock');
							} else {
								$(this).children(':nth-child(8)').find(
										'.deactivateUser').parent().addClass(
										'hideBlock');
								$(this).children(':nth-child(8)').find(
										'.deactivateUser')
										.addClass('hideBlock');
							}
						}

						// });
						// }
					});

}
function getAdditionalAccess(data) {
	$.ajax({
		data : data,
		url : "userRoleMgt.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			var option = $("<h4>").html(response).find(
					'#tabs .hierarchyWrapper.settingsWrapper');
			var salesOrgExcludeMap = $("<h4>").html(response).find(
					'#salesOrgExcludeMap').val();
			var saveContent = $("<h4>").html(response).find(
					'#tabs .pageActions');
			var additionalAccess = $("<h4>").html(response).find(
					'#additionalAccess').val();

			if (option != '' && option != undefined) {
				$('.detailsContent .ContentTableWrapper .tableInfo').next()
						.remove();
				$('.detailsContent .ContentTableWrapper .tableInfo').after(
						option);
				bindAddtionalAcces(salesOrgExcludeMap, saveContent,
						additionalAccess);
			} else {
				// showError('Invalid User Id/Name');
				// $('#dialog-modal').dialog('open').removeClass('visible-hide');
			}
			
			if ( activeFlag=='N' || activeFlag=='P')
			{
		     $('.1posroles_'+ saleOrg).removeAttr('checked');
		     $('.1posroles_' + saleOrg).prop('disabled',true);
			}
			
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.',
					'dialog-forgotWizard');
			stopLoading();
		}
	});
}
function bindAddtionalAcces(salesOrgExcludeMap, saveContent, additionalAccess) {
	$('.hierarchyWrapper.settingsWrapper .tableInfo').addClass('hideBlock');
	$('.hierarchyWrapper.settingsWrapper').next().remove();
	$('.hierarchyWrapper.settingsWrapper').after(saveContent);
	// $('.thumbUp').parent().addClass('hideBlock');
	thumUpbind();

	// $('input[type="checkBox"]').prop('checked', true).prop('disabled',
	// 'disabled').next().addClass('lable-disable');
	// ;
	// if (salesOrgExcludeMap != '') {
	// var id = '';
	for ( var i = 0; i <= salesOrgExcludeMap.split(',').length; i++) {
		var id;
		if (salesOrgExcludeMap.split(',')[i] != undefined
				&& salesOrgExcludeMap.split(',')[i] != '') {
			id = salesOrgExcludeMap.split(',')[i].split(':')[0].trim();
			var code = salesOrgExcludeMap.split(',')[i].split(':')[1]
					.split('-')[1].trim();
			var role = salesOrgExcludeMap.split(',')[i].split(':')[1]
					.split('-')[0].trim();
			var type = salesOrgExcludeMap.split(',')[i].split(':')[1]
					.split('-')[2].trim();
			// if (role == $('.usrRole').text().trim()
			// || role.toLowerCase() == 'all') {
			/*
			 * $('#orderList_' + id + '_' + code + '_' + type+'[checked]').prop(
			 * 'checked', true).prop('disabled', 'disabled')
			 * .next().addClass('lable-disable'); $('#lookupList_' + id + '_' +
			 * code + '_' + type+'[checked]').prop( 'checked',
			 * true).prop('disabled', 'disabled')
			 * .next().addClass('lable-disable'); $('#reportsList_' + id + '_' +
			 * code + '_' + type+'[checked]').prop( 'checked',
			 * true).prop('disabled', 'disabled')
			 * .next().addClass('lable-disable'); $('#stockManagementList_' + id +
			 * '_' + code + '_' + type+'[checked]') .prop('checked', true)
			 * .prop('disabled', 'disabled').next().addClass( 'lable-disable');
			 * $('#pricingList_' + id + '_' + code + '_' +
			 * type+'[checked]').prop( 'checked', true).prop('disabled',
			 * 'disabled') .next().addClass('lable-disable');
			 * $('#ticketingList_' + id + '_' + code + '_' +
			 * type+'[checked]').prop( 'checked', true).prop('disabled',
			 * 'disabled') .next().addClass('lable-disable'); $('#adminList_' +
			 * id + '_' + code + '_' + type+'[checked]').prop( 'checked',
			 * true).prop('disabled', 'disabled')
			 * .next().addClass('lable-disable'); $('#promoList_' + id + '_' +
			 * code + '_' + type+'[checked]').prop( 'checked',
			 * true).prop('disabled', 'disabled')
			 * .next().addClass('lable-disable');
			 */

			$('#orderList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#lookupList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#reportsList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#stockManagementList_' + id + '_' + code + '_' + type + '')
					.prop('checked', true).prop('disabled', 'disabled').next()
					.addClass('lable-disable');
			$('#pricingList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#ticketingList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#adminList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#promoList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#otherToolsList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#routinesList_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			$('#alertListTotal_' + id + '_' + code + '_' + type + '').prop(
					'checked', true).prop('disabled', true).next().addClass(
					'lable-disable');
			// }
			// }
		}

		deselectCheckBoxes(saleOrg);
	}
	if (additionalAccess != '') {
		for ( var i = 0; i <= additionalAccess.split(',').length; i++) {
			if (additionalAccess.split(',')[i] != undefined)
				$('input[type="checkBox"]:not(:checked)')
						.filter(
								function() {
									console
											.log($(this).attr('id').split('_')[2]
													+ '__'
													+ additionalAccess
															.split(',')[i]
															.trim());
									if ($(this).attr('id').split('_')[2] == additionalAccess
											.split(',')[i].trim())
										$(this).prop('checked', true);
								});
		}
		deselectCheckBoxes(id);
	}
	$('.labelText').click(
			function() {
				$(
						'.' + $(this).attr('id').split('_')[0] + 'Total_'
								+ $(this).attr('id').split('_')[1])
						.text(
								$('.' + $(this).attr('id').split('_')[0] + '_'
										+ $(this).attr('id').split('_')[1]
										+ ':checked').length);
			});

	$('.settingsWrapper').find('.defaultChecked').prop('disabled', true);

//	$('.hierarchyContent').tooltip();
	securityMatrix();
}
function deselectCheckBoxes(id) {
	$('.orderListTotal_' + id).text(
			$(('.orderList_' + id).concat(':checked')).length);
	$('.lookupListTotal_' + id).text(
			$(('.lookupList_' + id).concat(':checked')).length);
	$('.reportsListTotal_' + id).text(
			$(('.reportsList_' + id).concat(':checked')).length);
	$('.stockManagementListTotal_' + id).text(
			$(('.stockManagementList_' + id).concat(':checked')).length);
	$('.pricingListTotal_' + id).text(
			$(('.pricingList_' + id).concat(':checked')).length);
	$('.ticketingListTotal_' + id).text(
			$(('.ticketingList_' + id).concat(':checked')).length);
	$('.adminListTotal_' + id).text(
			$(('.adminList_' + id).concat(':checked')).length);
	$('.promoListTotal_' + id).text(
			$(('.promoList_' + id).concat(':checked')).length);
	$('.repairListMenuTotal_' + id).text(
			$(('.repairListMenu_' + id).concat(':checked')).length);
	$('.1posrolesTotal_' + id).text(
			$(('.1posroles_' + id).concat(':checked')).length);
	$('.otherToolsListTotal_' + id).text(
			$(('.otherToolsList_' + id).concat(':checked')).length);
	$('.routinesListTotal_' + id).text(
			$(('.routinesList_' + id).concat(':checked')).length);
	$('.alertListTotal_' + id).text(
			$(('.alertList_' + id).concat(':checked')).length);
}
function thumUpbind() {
	$('.hierarchyWrapper.settingsWrapper').next().find('.secondaryActionBtn')
			.addClass('hideBlock');
	$('.thumbUp').click(
			function() {
				var string = "";

				$(
						'.orderList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							// console.log(string);
						});
				$(
						'.lookupList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							// console.log(string);
						});
				$(
						'.reportsList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							// console.log(string);
						});
				$(
						'.stockManagementList_'
								+ $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							// console.log(string);
						});
				$(
						'.pricingList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							// console.log(string);
						});
				$(
						'.ticketingList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});

				$(
						'.repairListMenu_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});

				$(
						'.adminList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});
				$(
						'.otherToolsList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});
				$(
						'.alertList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});
				$(
						'.routinesList_' + $(this).attr('id').split('_')[1]
								+ ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (string == "")
								string = $(this).attr('id').split('_')[1] + ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								string = string + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});

				var sorg = $('.userDtlSalesOrg').text().split('|')[0].trim();
				console.log('Add Func ' + string);
				console.log($(this).attr('id').split('_')[1]);
				var posroles_str = '';
				$('.1posroles_' + sorg + ':checked:not(:disabled)').filter(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (posroles_str == "")
								posroles_str = $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
							else
								posroles_str = posroles_str + ","
										+ $(this).attr('id').split('_')[1]
										+ ':'
										+ $(this).attr('id').split('_')[2]
										+ ':'
										+ $(this).attr('id').split('_')[3];
						});

				var remove_posroles_str = '';
				$('.1posroles_' + sorg + '[userchecked]').each(
						function() {
							// console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
							if (!$(this).prop('checked')) {
								if (remove_posroles_str == "")
									remove_posroles_str = $(this).attr('id')
											.split('_')[1]
											+ ':'
											+ $(this).attr('id').split('_')[2]
											+ ':'
											+ $(this).attr('id').split('_')[3];
								else
									remove_posroles_str = remove_posroles_str
											+ ","
											+ $(this).attr('id').split('_')[1]
											+ ':'
											+ $(this).attr('id').split('_')[2]
											+ ':'
											+ $(this).attr('id').split('_')[3];
							}
						});
				console.log(remove_posroles_str);

				if (string.trim() == '') {
					string = $(this).attr('id').split('_')[1] + ':' + 'empty'
							+ ':' + 'empty';
				}

				if (remove_posroles_str.trim() == '') {
					remove_posroles_str = $(this).attr('id').split('_')[1]
							+ ':' + 'empty' + ':' + 'empty';
				}

				if (posroles_str.trim() == '') {
					posroles_str = $(this).attr('id').split('_')[1] + ':'
							+ 'empty' + ':' + 'empty';
				}
				callAjax('saveRolePrflSettings.htm', {
					"selectedApllicationSettings" : string,
					"userId" : userNumber,
					"userStore" : ($('.userDtlStore').text().trim() != '' ? $(
							'.userDtlStore').text().split('|')[0].trim() : ''),
					"posroles_str" : posroles_str,
					"remove_posroles_str" : remove_posroles_str,
					"activeStartDate" : $('.activeFrom').text(),
					"activeEndDate" : $('.activeTo').text()
				}, 'get', sorg);

			}).parent().addClass(updateUserDtl);

}
function callAjax(url, data, type, elemStr) {
	$
			.ajax({
				data : data,
				url : url,
				type : type,

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					console.log(response);
					if (response.trim() == "success") {
						$('.alertText').text(
								'Settings has been saved successfully.');
						$('#dialog-modal').dialog('open');
						$('.okBtn').click(function() {
							$('#dialog-modal').dialog('close');
						});
						update1POSList();
					} else if (response.trim().split(':')[0] == "success") {
						$('.alertText')
								.html(
										'Additional application access settings has been saved successfully.<br>Addtional 1POS roles update failed<br><b>'
												+ response.trim().split(':')[1]
												+ '</b>');
						$('#dialog-modal').dialog('open');
						$('.okBtn').click(function() {
							$('#dialog-modal').dialog('close');
						});
					} else {
						$('.alertText').text(response.trim());
						$('#dialog-modal').dialog('open');
						$('.okBtn').click(function() {
							$('#dialog-modal').dialog('close');
						});
					}
					stopLoading();
				},
				error : function() {
					$('.alertText')
							.text(
									'Technical issue occured,Please contact java support.');
					$('#dialog-modal').dialog('open');
					$('.okBtn').click(function() {
						$('#dialog-modal').dialog('close');
					});
					stopLoading();
				}
			});
}

function update1POSList() {
	var sorg = $('.userDtlSalesOrg').text().split('|')[0].trim();
	$('.1posroles_' + sorg + '').each(function() {

		if (!$(this).prop('checked') && $(this).attr('userchecked') == '') {
			$(this).removeAttr('userchecked').attr('nochecked', '');
		} else if ($(this).prop('checked') && $(this).attr('nochecked') == '') {
			$(this).removeAttr('nochecked').attr('userchecked', '');
		}

	});
}

function removeStore() {
	$('.removeStore').click(function() {
		$(this).parent().remove();
	});
}
function bindAccordian() {
	// $('.moreNumber').click(function() {
	// if ($(this).parent().parent().next().hasClass('hideBlock')) {
	// $(this).find('span').text('- ');
	// $(this).parent().parent().next().removeClass('hideBlock');
	// } else {
	// $(this).find('span').text('+ ');
	// $(this).parent().parent().next().addClass('hideBlock');
	// }
	// });
}
function deactivate() {
	$(".deactivateUser").unbind('click');
	$(".deactivateUser").click(
			function(e) {
				hideError();
				e.stopPropagation();
				var $tr = $(this).closest('tr');
				var fromDate = $tr.attr('data_from');
				var toDate = $tr.attr('data_to');
				var sales_org = $tr.attr('data_sales');
				var userId = $(this).parent().parent().parent()
						.find('td:first').text();
				var siteId = $(this).parent().parent().parent().find(
						'td:nth-child(5)').text().split('|')[0].trim();
				var roleId = $(this).parent().parent().parent()
						.attr('roleCode');
				if (siteId == '') {
					siteId = 'NONE';
				}
				var event = $(this);
				//Added to apply proper message
				$.ajax({
					data : {
						userId : userId,
						siteNo : siteId,
						roleId : roleId,
						dateFrom : fromDate,
						dateTo : toDate,
						saleOrg : sales_org
					},
					url : "checkIfAdditionalRolesExist.htm",
					type : 'get',

					beforeSend : function() {
						startLoading();
					},
					success : function(response) {
						stopLoading();
						console.log(response);
						var res=$.parseJSON(response);
						if(res!=undefined && res!=null && res.data!=undefined && res.data!=null && res.data.length>0){
							$('#dialog-modalDeactive #alertBox').html(
							'Are you sure you want to Deactivate the user? <br> Note:The Pos Functions roles mapped to the user will also be deactivated. ');
						}else{
							$('#dialog-modalDeactive #alertBox').html(
							'Are you sure you want to Deactivate the user?');
						}
						
						$("#dialog-modalDeactive").dialog('open');
						$("#dialog-modalDeactive #yes").unbind('click');
						$("#dialog-modalDeactive #yes").click(function() {
							hideError();
							deactivateUser({
								userId : userId,
								siteNo : siteId,
								roleId : roleId,
								dateFrom : fromDate,
								dateTo : toDate,
								saleOrg : sales_org
							}, event);

						});
						
					},error : function() {
						showAlert(
								'Technical issue occured,Please contact java support.',
								'../itAdmin/itAdminUserMgt.htm', 'User Management',
								false);
						stopLoading();
					}
				});
				// console.log('deactivateUser');
			});
			}

				




function deactivateOnDetails() {
	$(".deactivateBtn").unbind('click');
	$(".deactivateBtn").click(
			function(e) {
				hideError();
				e.stopPropagation();

				var fromDate = $('.activeFrom').text();
				var toDate = $('.activeTo').text();
				var sales_org = $('.userDtlSalesOrg').text().split('|')[0];
				var userId = userNumber;
				var siteId = $('.userDtlStore').text().split('|')[0].trim();
				var roleId = $('.usrRole').text().split('|')[0].trim();
				if (siteId.trim() == '') {
					siteId = 'All';
				}
				if($('[userchecked]').length>0){
					$('#dialog-modalDeactive #alertBox').html(
					'Are you sure you want to Deactivate the user?<br> Note:The Pos Functions roles mapped to the user will also be deactivated. ');
				}else{
					$('#dialog-modalDeactive #alertBox').html(
					'Are you sure you want to Deactivate the user?');
				}
				
				//if ($('[data_row="' + userId + siteId + '"]').length == 0) {
					var event = $(this);
					$("#dialog-modalDeactive").dialog('open');
					$("#dialog-modalDeactive #yes").unbind('click');
					$("#dialog-modalDeactive #yes").click(function() {
						hideError();
						deactivateUserOnDetail({
							userId : userId,
							siteNo : siteId,
							roleId : roleId,
							dateFrom : fromDate,
							dateTo : toDate,
							saleOrg : sales_org
						}, event);

					});
				//} else {
				//	$('[data_row="' + userId + siteId + '"]').find(
				//			'.deactivateUser').trigger('click');
				//}
			});
}

function closeAccordian() {
	$('.accord').addClass('hideBlock');
	$('.moreNumber').find('span').text('+ ');
	$('.moreNumber:contains(" - hide")').trigger('click');
}
function setDefaultDate() {
	var date = new Date();
	var month = '';
	if (date.getMonth() + 1 < 10) {
		month = date.getMonth() + 1;
		month = '0' + month;
	} else
		month = date.getMonth() + 1;
	var day = '';
	if (date.getDate() < 10) {
		day = date.getDate();
		day = '0' + day;
	} else
		day = date.getDate();
	$('#dateFrom,#fromDte').val(day + '/' + month + '/' + date.getFullYear());
	var totalDys = 365;
	var totalMonth = 12;
	var time = date.getTime() + (60 * 60 * 24 * 1000 * totalDys);
	// var time = date.getTime() + (60 * 60 * 24 * 1000 * 30 * totalMonth);
	date.setTime(time);
	var month = '';
	if (date.getMonth() + 1 < 10) {
		month = date.getMonth() + 1;
		month = '0' + month;
	} else
		month = date.getMonth() + 1;
	var day = '';
	if (date.getDate() < 10) {
		day = date.getDate();
		day = '0' + day;
	} else
		day = date.getDate();
	$('#dateTo,#toDte').val(day + '/' + month + '/' + date.getFullYear());

}
function bindSalesOrgChange(flag, salesOrg) {
	// $('.salesOrgMap')
	// .change(function() {
	hideError();
	var departmentStr = '<ul>';
	if (salesOrg != 'Select') {

		var servletUrl = 'fetchDept.htm?iv_parent_node=' + 'ALL DEPARTMENTS'
				+ '&salesOrg=' + salesOrg;

		$
				.getJSON(
						servletUrl,
						function(options) {

							if (options) {
								$
										.map(
												options.categoryInfoList,
												function(item) {
													var style = 'style="padding: 0px;"';
													if (!flag) {
														style = 'style="padding: 0px;width:100%!important"';
													}
													departmentStr += '<li><label for="'
															+ item.node
															+ '" class="labelText" title="'
															+ item.nodeDesc
															+ '" '
															+ style
															+ '><input type="checkbox" name="dept" value="'
															+ item.node
															+ '-'
															+ item.nodeDesc
															+ '" id="'
															+ item.node
															+ '">'
															+ item.nodeDesc
															+ '</label></li>';
												});
							}
							departmentStr += '</ul>';
							if (flag) {
								$('#tableAddAction #deptAll').prop('disabled',
										false);
								$('#tableAddAction #deptAll').prop('checked',
										false);
								$('#tableAddAction .hierarchyList').html('');
								$('#tableAddAction .hierarchyList').html(
										departmentStr);
								// $('.hierarchyList').val(department);
								bindEventsForCheckBox($('#tableAddAction .hierarchyContent'));
								$('#tableAddAction #deptAll').trigger('click');
							} else {
								$('#dialog-modal-Edit #deptAll').prop(
										'disabled', false);
								$('#dialog-modal-Edit #deptAll').prop(
										'checked', false);
								$('#dialog-modal-Edit .hierarchyList').html('');
								$('#dialog-modal-Edit .hierarchyList').html(
										departmentStr);
								bindEventsForCheckBox($('#dialog-modal-Edit .hierarchyContent'));

								if (deptList.length > 0) {
									for ( var i in deptList) {
										$('#dialog-modal-Edit .hierarchyList')
												.find(
														'[value="'
																+ deptList[i]
																+ '"]')
												.trigger('click');
									}
								}
							}
							stopLoading();
						});
	} else {
		if (flag) {
			$('#tableAddAction .hierarchyList').html('');
			$('#tableAddAction .hierarchyList').html(
					"Please select sales org to show departments.");
		} else {

			$('#dialog-modal-Edit .hierarchyList').html('');
			$('#dialog-modal-Edit .hierarchyList').html(
					"Please select sales org to show departments.");
			// $('.department').val(department);
		}
		stopLoading();
	}
	// });
}

function bindEventsForCheckBox(pr) {

	pr.find('#deptAll').unbind('click');
	pr.find('#deptAll').click(function() {
		if ($(this).is(':checked')) {
			pr.find('[name="dept"]').prop('checked', true);
		} else {
			pr.find('[name="dept"]').prop('checked', false);
		}
	});

	pr.find('[name="dept"]').unbind('click');
	pr.find('[name="dept"]').click(
			function() {
				if (pr.find('[name="dept"]').length == pr
						.find('[name="dept"]:checked').length) {
					pr.find('#deptAll').prop('checked', true);
				} else {
					pr.find('#deptAll').prop('checked', false);
				}
			});

//	pr.find('input[type="checkbox"]').parent().tooltip();
}
function showAlert(msg, url, title, flag) {
	$('#dialog-modal .popupData h4').html(msg);
	$('#dialog-modal').parent().find('.ui-dialog-title').text(title);
	$('#dialog-modal').dialog('open');
	$('#dialog-modal .okBtn').attr('onclick',
			'$("#dialog-modal").dialog("close");');
	if (flag) {
		$('#dialog-modal .okBtn').attr('onclick',
				'window.location.href="' + url + '"');
		$('.closePopUp').click(function() {
			window.location.href = url;
		});
	}

}

function showAlertAndDtl(msg, url, title, flag, user, store) {
	if(store=='All') store='NONE';
	$('#dialog-modal .popupData h4').text(msg);
	$('#dialog-modal').parent().find('.ui-dialog-title').text(title);
	$('#dialog-modal').dialog('open');
	// $('#dialog-modal
	// .okBtn').attr('onclick','$("#dialog-modal").dialog("close");');
	$('#dialog-modal .okBtn').unbind('click');
	$('#dialog-modal .okBtn').click(function() {
		$("#dialog-modal").dialog("close");
		getUserDtl({
			userId : user,
			storeId : store
		});

		$('#dialog-modal .okBtn').unbind('click');
		$('#dialog-modal .okBtn').click(function() {
			$("#dialog-modal").dialog("close");
		});
		$("#dialog-modal").parent().find(".closePopUp").unbind('click');
		$("#dialog-modal").parent().find(".closePopUp").click(function() {
			$("#dialog-modal").dialog("close");
		});
	});
	$("#dialog-modal").parent().find(".closePopUp").unbind('click');
	$("#dialog-modal").parent().find(".closePopUp").click(function() {
		$("#dialog-modal").dialog("close");
		getUserDtl({
			userId : user,
			storeId : store
		});

		$("#dialog-modal").parent().find(".closePopUp").unbind('click');
		$("#dialog-modal").parent().find(".closePopUp").click(function() {
			$("#dialog-modal").dialog("close");
		});
		$('#dialog-modal .okBtn').unbind('click');
		$('#dialog-modal .okBtn').click(function() {
			$("#dialog-modal").dialog("close");
		});
	});

	// $('#dialog-modal .okBtn').attr('onclick',);
	/*
	 * $('.closePopUp').click(function(){
	 * getUserDtl({userId:user,storeId:store}); });
	 */

}
var tmpdata = undefined
function searchUserDtl(data, currentPageTmp) {
	tmpdata = data;
	$
			.ajax({
				data : data,
				url : "serarchUser.htm",
				type : 'get',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {

					var res = $.parseJSON(response);
					var tblHdr = '<thead><tr><th data-sort="string-ins" class="" tableHeader>User ID</th><th class="" data-sort="string-ins" tableHeader>User Name</th><th  class="" data-sort="string-ins" tableHeader>Role</th><th class="noSort" tableHeader>Primary Dept.</th>'
							+ '<th data-sort="string-ins" tableHeader>Store</th><th style="width: 55px;" data-sort="string-ins" tableHeader>Primary</th><th class="" data-sort="date" tableHeader>Expiry</th><th data-sort="string-ins" tableHeader>Status</th><th  class="" data-sort="date" tableHeader>Last Login</th><!--<th data-sort="string">Created on</th>--><th class="lastColumn centerValue noSort" width="70px" tableHeader>Actions</th></tr>'
							+ '<tr id="filterRowHead" class="hideBlock"> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="userId"></td> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="userName"></td> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="role"></td> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="primaryDpt"></td> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="store"></td> <th data-sort="string">Primary</th> <td class="headH"><input type="#" class="textbox Filter" data-filterfor="status"></td> <td data-sort="string"></td> <td class="lastColumn centerValue" data-sort="string" width="70px"></td> </tr></thead>';
					var k = 1;
					var j = 1;
					if (res.data != null && res.data != undefined
							&& res.msg == 'true') {
						var storeMap = res.data;
						var resetonly = false;
						for ( var m in storeMap) {

							var list = storeMap[m];
							list[0].siteName = list[0].siteName != null
									&& list[0].siteName != undefined ? list[0].siteName
									: '';
							list[0].dept = (list[0].dept != null
									&& list[0].dept != undefined ? list[0].dept
									: '');
							list[0].deptName = (list[0].deptName != null
									&& list[0].deptName != undefined ? list[0].deptName
									: '');
							list[0].siteId = (list[0].siteId != null
									&& list[0].siteId != undefined
									&& list[0].siteId.toLowerCase() != 'none' ? list[0].siteId
									: 'All');
							list[0].siteName = (list[0].siteName != null
									&& list[0].siteName != undefined ? list[0].siteName
									: '');
							list[0].roleDesc = (list[0].roleDesc != null
									&& list[0].roleDesc != undefined ? list[0].roleDesc
									: '');
							// list[0].roleId= (list[0].deptName!=null ?
							// list[0].deptName : '');
							list[0].reset_only = (list[0].reset_only != undefined && list[0].reset_only != '') ? list[0].reset_only
									: 'N';
							list[0].createdDate = (list[0].createdDate != null
									&& list[0].createdDate != undefined ? list[0].createdDate
									: '');
							resetonly = false;
							if (list[0].reset_only == 'N') {
								resetonly = true;
							}
							tblHdr += '<tr data_row="' + list[0].userId
									+ list[0].siteId + '" data_from="'
									+ list[0].acticeStartDate
									+ '" data_sales="' + list[0].salesOrg
									+ '"   data_to="' + list[0].acticeEndDate
									+ '"  roleCode="' + list[0].roleId
									+ '" class=" pageNo-' + j + ' contentTr '
									+ '';
							if (k > 10)
								tblHdr += 'hideBlock';
							if (resetonly)
								tblHdr += ' contentRow ';
							var lockedClass = '';
							if (list[0].isLocked == 'Y')
								lockedClass = 'locedStatusClass';

							console.log(isStoreManager, currentStore,
									list[0].siteId);

							if (isStockTakeManager
									|| isItAdmin
									|| (isStoreManager && currentStore == list[0].siteId)) {
								if (($('#roleId').val() == 'SS' || $('#roleId')
										.val() == 'SLM')
										&& $('#salesOrg').val() != list[0].salesOrg)
									tblHdr += ' "><td class="' + lockedClass
											+ '">' + list[0].userId + '</td>';
								else
									tblHdr += ' "><td class="'
											+ lockedClass
											+ '"><a class="navigate '+viewUserDtl+' userMainRow ">'
											+ list[0].userId + '</a></td>';
							} else {
								tblHdr += ' "><td class="' + lockedClass + '">'
										+ list[0].userId + '</td>';
							}

							tblHdr += '<td>' + list[0].userName + '</td>'
									+ '<td>' + list[0].roleDesc + '</td>';
							/*
							 * + '<td>' + list[0].dept; if (list[0].dept != '' &&
							 * list[0].deptName != '') tblHdr += ' | '; tblHdr +=
							 * list[0].deptName + '</td>'
							 */

							if (list[0].deptList.length > 0) {
								tblHdr += '<td>'
										+ list[0].deptList[0].replace('-', '|');
								if (list[0].deptList.length > 1) {
									tblHdr += ' and <a class="moreNumber moredept" title="';
									for ( var index = 1; index < list[0].deptList.length; index++) {
										tblHdr += '&#13;'
												+ list[0].deptList[index]
														.replace('-', '|');
									}
									tblHdr += '">+'
											+ (list[0].deptList.length - 1)
											+ ' more</a></td>';
								} else {
									tblHdr += '</td>';
								}

							} else {
								tblHdr += '<td></td>';
							}

							if(list[0].storeStatus == 'Closed'){
								tblHdr += '<td><label class= "moreNumber  navigateClosedMain" title="Closed Store">'+list[0].siteId;
								if (list[0].siteId != '' && list[0].siteName != '')
									tblHdr += ' | ';
								tblHdr += list[0].siteName+'</label>';
							}else{
								tblHdr += '<td>' + list[0].siteId;
								if (list[0].siteId != '' && list[0].siteName != '')
									tblHdr += ' | ';
								tblHdr += list[0].siteName;
							}
							if (list.length > 1) {
								tblHdr += ' and <a class="moreNumber extentStore">+'
										+ (list.length - 1) + '</a>';
							}

							tblHdr += '</td><td class="primaryFlag centerValue"><label class="hideBlock">'+list[0].primary_strore+'</label>';

							if (list[0].primary_strore == 'Y')
								tblHdr += '<label class="positiveStatus"></label>';
							else
								tblHdr += '<label class="negativeStatus"></label>';

							tblHdr += '</td><td>'
									+ (list[0].acticeEndDate != null ? list[0].acticeEndDate
											: '')
									+ '</td><td class="statusFlag centerValue"><label class="hideBlock">'+list[0].activeFlag+'</label>';
							if (list[0].activeFlag == 'Y' || !resetonly)
								tblHdr += '<label class="success">Active</label>';
							else if (list[0].activeFlag == 'P')
								tblHdr += '<label class="pending">Pending</label>';
							else
								tblHdr += '<label class="deactive">Inactive</label>';
							tblHdr += '</td><td>'
									+ (list[0].lastLoggedinTime != null ? list[0].lastLoggedinTime
											: '') + '</td>'
									// +'<td>' + list[0].createdDate+ '</td>'
									+ '<td class="lastColumn centerValue">';
							// if(list.length==1)
							// {
							
							
							tblHdr += '<label class="linkBtn ';
								
								//if (list[0].activeFlag == 'P')
								//tblHdr += ' hideBlock';
							
								tblHdr +=	'" ><label	class="changePassword '+updateUserDtl+' "'
								+ ' title="Reset Password">Reset Password</label></label><label	class="linkBtn';
								// defect 6717 rectified  in above code 
							/*
							 * if (list[0].activeFlag == 'N') tblHdr += '
							 * hideBlock'; else
							 */
							if (list[0].activeFlag == 'N' || list[0].activeFlag == 'P'
									|| !(isStockTakeManager || isItAdmin || (isStoreManager && currentStore == list[0].siteId)))
								tblHdr += ' hideBlock';
							else if (($('#roleId').val() == 'SS' || $('#roleId')
									.val() == 'SLM')
									&& $('#salesOrg').val() != list[0].salesOrg) {
								tblHdr += ' hideBlock';
							}else if (list[0].roleId == 'D') {
								tblHdr += ' hideBlock';
							}

							tblHdr += ' "><label class="deactivateUser '+updateUserDtl+'" '
									+ 'title="Deactivate User">Inactivate </label></label>';
							// }
							/*
							 * else{ tblHdr+='<a class="moreNumber
							 * moreDisplayBtn"><span>+ </span>'+list.length+'</a>';
							 *  }
							 */
							tblHdr += '</td></tr>';

							tblHdr += ' <tr class="accord hideBlock" style=""><td colspan="11"><div class="tableInfo"><div class="tableTitle"><h5 class=""><strong>Access to other stores</strong></h5></div></div><table class="secondaryTable" style="width: 100%;">'
									+ '<thead><th data-sort="string" class="hideBlock tableSortHeader">User ID</th><th data-sort="string" class="hideBlock tableSortHeader">User Name</th>'
									+ '<th data-sort="string-ins" class="tableSortHeader">Role</th><th>Primary Dept.</th><th data-sort="string-ins" class="tableSortHeader">Store</th><th class="noSort">Primary</th>'
									+ '<th data-sort="date" class="tableSortHeader">Access Expiry</th><th class="centerValue noSort">Status</th><th data-sort="date" class="tableSortHeader">Last Login</th><!--<th data-sort="string">Created on</th>--><th class="lastColumn centerValue"'
									+ '	width="70px">Actions</th></thead>';
							if (k % 10 == 0)
								j++;
							k++;
							for ( var i = 1; i < list.length; i++) {
								list[i].siteName = list[i].siteName != null ? list[i].siteName
										: '';
								list[i].dept = (list[i].dept != null ? list[i].dept
										: '');
								list[i].deptName = (list[i].deptName != null ? list[i].deptName
										: '');

								if (list[i].primary_strore != null) {

									tblHdr += '<tr data_row="'
											+ list[i].userId
											+ list[i].siteId
											+ '" data_from="'
											+ list[i].acticeStartDate
											+ '" data_sales="'
											+ list[i].salesOrg
											+ '"   data_to="'
											+ list[i].acticeEndDate
											+ '" class=" contentRow " roleCode="'
											+ list[i].roleId
											+ '" ><td class="hideBlock">'
											+ list[i].userId + '</td>'
											+ '<td class="hideBlock">'
											+ list[i].userName + '</td><td>'
											+ list[i].roleDesc + '</td>';

									if (list[i].deptList.length > 0) {
										tblHdr += '<td>'
												+ list[i].deptList[0].replace(
														'-', '|');
										if (list[i].deptList.length > 1) {
											tblHdr += ' and <a class="moreNumber moredept" title="';
											for ( var index = 1; index < list[i].deptList.length; index++) {
												tblHdr += '&#009;'
														+ list[i].deptList[index]
																.replace('-',
																		'|')
														+ '&#013;&#010;';
											}
											tblHdr += '"> + '
													+ (list[i].deptList.length - 1)
													+ ' more</a></td>';
										} else {
											tblHdr += '</td>';
										}

									} else {
										tblHdr += '<td></td>';
									}
									if (isItAdmin || isStockTakeManager
											|| (isStoreManager && currentStore == list[i].siteId)) {
										if (($('#roleId').val() == 'SS' || $(
												'#roleId').val() == 'SLM')
												&& $('#salesOrg').val() != list[i].salesOrg) {
											if(list[i].storeStatus == 'Closed'){
												tblHdr += '<td><label class= "navigateClosedMain" title="Closed Store">' + list[i].siteId;
												if (list[i].siteId != ''
														&& list[i].siteName != '')
													tblHdr += ' | ';
												tblHdr += list[i].siteName
														+ '</label></td>';
											
											}else{											
											tblHdr += '<td>' + list[i].siteId;
											if (list[i].siteId != ''
													&& list[i].siteName != '')
												tblHdr += ' | ';
											tblHdr += list[i].siteName
													+ '</td>';
											}
										} else {
											
											if(list[i].storeStatus == 'Closed'){
												tblHdr += '<td><a title="Closed Store" class="navigate navigateClosed '+viewUserDtl+' storeLink">'
												+ list[i].siteId;
											}else{
												tblHdr += '<td><a class="navigate '+viewUserDtl+' storeLink">'
												+ list[i].siteId;
											}
											if (list[i].siteId != ''
													&& list[i].siteName != '')
												tblHdr += ' | ';
											tblHdr += list[i].siteName
													+ '</a></td>';

										}
									} else {
										if(list[i].storeStatus == 'Closed'){
											tblHdr += '<td><label class= "navigateClosedMain" title="Closed Store">' + list[i].siteId;
											if (list[i].siteId != ''
													&& list[i].siteName != '')
												tblHdr += ' | ';
											tblHdr += list[i].siteName
													+ '</label></td>';
										
										}else{
										tblHdr += '<td>' + list[i].siteId;
										if (list[i].siteId != ''
												&& list[i].siteName != '')
											tblHdr += ' | ';
										tblHdr += list[i].siteName + '</td>';
										}
									}

									tblHdr += '<td class="primaryFlag centerValue">';

									if (list[i].primary_strore == 'Y')
										tblHdr += '<label class="positiveStatus"></label>';
									else
										tblHdr += '<label class="negativeStatus"></label>';

									tblHdr += '</td><td>'
											+ (list[i].acticeEndDate != null ? list[i].acticeEndDate
													: '')
											+ '</td><td class="statusFlag centerValue">';

									if (list[i].activeFlag == 'Y')
										tblHdr += '<label class="success">Active</label>';
									else if (list[i].activeFlag == 'P')
										tblHdr += '<label class="pending">Pending</label>';
									else
										tblHdr += '<label class="deactive">Inactive</label>';

									tblHdr += '</td><td>'
											+ (list[i].lastLoggedinTime != null ? list[i].lastLoggedinTime
													: '')
											+ '</td>'
											// +'<td>'+list[i].createdDate+'</td>'
											+ '<td class="lastColumn centerValue"> '
											// +'<label class="linkBtn"> <label
											// class="changePassword
											// '+updateUserDtl+' "
											// title="Reset Password">Reset
											// Password</label></label> '
											+ ' <label	class="linkBtn ';

									
									if (list[i].activeFlag == 'N' || list[i].activeFlag == 'P'
											|| !(isItAdmin || (isStoreManager && currentStore == list[i].siteId)))
										tblHdr += 'hideBlock';
									else if (($('#roleId').val() == 'SS' || $(
											'#roleId').val() == 'SLM')
											&& $('#salesOrg').val() != list[i].salesOrg) {
										tblHdr += 'hideBlock';
									}else if (list[i].roleId == 'D'){
										tblHdr += 'hideBlock';
									}
									tblHdr += ' "><label class="deactivateUser '+updateUserDtl+' ';
									tblHdr += '" title="Deactivate User">Inactivate </label>'
											+ '</label></td></tr>';
								}

							}
							tblHdr += '</table></td></tr>';
						}
						$('#userList').html('');
						$('#userList').html(tblHdr);
						$('.moredept').tooltip({
							tooltipClass : 'tmptooltipClass'
						});
						$('.legendDiv').removeClass('hideBlock');
						bindSearchContent(currentPageTmp);
						$('#userList').removeClass('hideBlock');
					} else {
						if (tmpdata.option == '') {
							if (!$('#searchStatus').is(':visible')) {
								$('#serachUser').trigger('click');
							} else {
								showError('Sorry no results found.');
							}
						} else {
							showError('Sorry no results found.');
						}
						$('#userList tbody').remove();
						$('.legendDiv').addClass('hideBlock');
						$('#userList').addClass('hideBlock');
					}
					stopLoading();
					securityMatrix();
					if ($("#tableAddAction").is(':visible')) {
						hideError();
						$("#tableSearchAction").addClass('hideBlock');
						$("#tableAddAction").removeClass('hideBlock');
						$('#tableSearchAction input').val('');
						$('#tableSearchAction input').keyup();
						$('#tableAddAction input:first').focus();
						$('#userList').addClass('hideBlock');
						// $('#userList tbody').remove();
						$('.legendDiv').addClass('hideBlock');
					}
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					$('#userList tbody').remove();
					$('.legendDiv').addClass('hideBlock');
					$('#userList').addClass('hideBlock');
					stopLoading();
				}
			});

}
function bindSearchContent(currentPageTmp) {

	$('.changePassword').click(
			function(e) {
				hideError();
				currentRow = $(this);
				e.stopPropagation();
				$('#dialog-changePassword .ContentTableWrapper.formWrapper ')
						.children(':first').addClass('hideBlock');
				// $('#dialog-changePassword').dialog('open');
				changePwd('', $(this).parent().parent().parent().find(
						'td:first').text().trim());
			});

	$("#dialog-modalDeactive #no").click(function() {
		hideError();
		$("#dialog-modalDeactive").dialog('close');

	});

	$('.locedStatusClass').attr('title', 'User account is locked.');
	$('.locedStatusClass').tooltip();
	destroyCrappyPlugin($('.sortTable'));
	$(".sortTable").customtablesort();
	destroyCrappyPlugin($(".secondaryTable"));
	$(".secondaryTable").tablesort();

	// $(".sortTable").find('th:first').trigger('click');
	// $('.contentRow .navigate')
	// .click(
	// function() {
	// hideError();
	// var user = $(this).find('td:first').text().trim();
	// userNumber = $(this).find('td:first').text().trim();
	// var store = $(this).find('td:nth-child(5)').text()
	// .split('|')[0].trim();
	// if(store==''){
	// store='NONE';
	// }
	// getUserDtl({
	// userId : user,
	// storeId : store
	// });
	// //console.log('content');
	// });

	$('.contentRow ').each(
			function() {
				var row = $(this);
				//for defect 2094 whole row click instead of Id alone removed   .find('.navigate')
				row.click( 
						function(e) {
							e.stopPropagation();
							if($(this).find('.navigate').length>0){
								hideError();
								var user = row.find('td:first').text().trim();
								userNumber = row.find('td:first').text().trim();
								var store = row.find('td:nth-child(5)').text()
										.split('|')[0].trim().split(' ')[0].trim();
								if (store == '' || store == 'All') {
									store = 'NONE';
								}
								getUserDtl({
									userId : user,
									storeId : store
								});
							}
						});
				// console.log('content');
				row.find('.extentStore').click(function(e) {
					e.stopPropagation();
					if ($(this).html() != ' - hide') {
						row.addClass('expanded');
						row.next().removeClass('hideBlock');
						$(this).html(' - hide');
						expandedRow=row.attr('data_row');
					} else {
						row.removeClass('expanded');
						row.next().addClass('hideBlock');
						$(this).html('+');
						$(this).append(row.next().find('tr').length - 1);
					}
				});

			});

	bindAccordian();
	deactivate();

	var recCnt = $('.contentTr').length;
	if (currentPageTmp == undefined) {
		currentPage = 1;
	} else {
		currentPage = currentPageTmp;
	}

	if (recCnt > 10) {
		$('.searchPagination').removeClass('hideBlock');
		$('.searchPagination').pagination({
			items : recCnt,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			onPageClick : function(pageNo) {

				console.log(pageNo);
				closeAccordian();
				currentPage = pageNo;
				var pageClass = 'pageNo-' + pageNo;
				$('.contentTr').filter(function() {
					if ($(this).hasClass(pageClass))
						$(this).removeClass('hideBlock');
					else
						$(this).addClass('hideBlock');

				});
			}
		});

		var pageClass = 'pageNo-' + currentPage;
		$('.contentTr').filter(function() {
			if ($(this).hasClass(pageClass))
				$(this).removeClass('hideBlock');
			else
				$(this).addClass('hideBlock');

		});

	} else {
		$('.searchPagination').addClass('hideBlock');
	}
	
	$('#userList').find('th').click(function(e){
		sortedIndex=$('#userList').find('th').index(this);
	});
	
	setTimeout(function() {
		showPage(currentPage);
		/*if(sortedIndex!=-1 && sortedIndex !=undefined){
			$('#userList').find('th').eq(sortedIndex).trigger('click');
		}
		if(expandedRow!=undefined){
			$('#userList').find('tr[data_row="'+expandedRow+'"]').find('.extentStore').trigger('click');
		}*/
	}, 40);
	
}

function showPage(pageNo) {
	console.log(pageNo);
	closeAccordian();
	currentPage = pageNo;
	var pageClass = 'pageNo-' + pageNo;
	$('.contentTr').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');

	});
}
function formRoleOptions(list, element) {
	var admin = ($('#roleId').val().toUpperCase() == 'ADM');
	if (list != null && list != undefined && list.length > 0) {
		element.children().remove();
		element.append('<option>Select</option>');
		for ( var i = 0; i < list.length; i++) {
			if((list[i].code =='ADM')){
				element.append(admin ? ('<option id="' + list[i].code + '" value="'
						+ list[i].code + '">' + list[i].desc + '</option>') :'');
			}else{
				element.append(('<option id="' + list[i].code + '" value="'
						+ list[i].code + '">' + list[i].desc + '</option>'));
			}
			
		}
	}
	if (isAdminRole($('.usrRole').text().trim())) {
		$('.popUpRoles option')
				.attr('disabled', 'disabled');
		$('.popUpRoles option#ITS').removeAttr('disabled');
		$('.popUpRoles option#SS').removeAttr('disabled');
		$('.popUpRoles option#ADM').removeAttr('disabled');
		$('.popUpRoles option#POSRP').removeAttr('disabled');
		$('.popUpRoles option#BR').removeAttr('disabled');
	
		$('.popUpRoles option#STOTM')
				.removeAttr('disabled');
		$('.popUpRoles option#STTM').removeAttr('disabled');
		$('.popUpRoles option#RDOU').removeAttr('disabled');
		$('.popUpRoles option#ITS1').removeAttr('disabled');
		$('.popUpRoles option#ITS2').removeAttr('disabled');
		$('.popUpRoles option#ITUA').removeAttr('disabled');
		$('.popUpSalesOrg').removeAttr('disabled');
		$('.popUpRoles').unbind('change');
	}
	else{ /*
								 * if ($('.usrRole').text().trim() == MA ||
								 * $('.usrRole').text().trim() == TL ||
								 * $('.usrRole').text().trim() == STM ||
								 * $('.usrRole').text().trim() == OA ||
								 * $('.usrRole').text().trim() == OS ||
								 * $('.usrRole').text().trim() == TM)
								 */
							$('.popUpRoles option')
									.attr('disabled', 'disabled');
							$('.popUpRoles option#MA').removeAttr('disabled');
							$('.popUpRoles option#TL').removeAttr('disabled');
							$('.popUpRoles option#STM').removeAttr('disabled');
							$('.popUpRoles option#OA').removeAttr('disabled');
							$('.popUpRoles option#OS').removeAttr('disabled');
							$('.popUpRoles option#TM').removeAttr('disabled');
							$('.popUpRoles option#SSA').removeAttr('disabled');//defect no 2609
							$('.popUpRoles option#SC').removeAttr('disabled');
							$('.popUpRoles option#SDA').removeAttr('disabled');
							$('.popUpRoles option#CO').removeAttr('disabled');
							$('.popUpRoles').unbind('change');
							$('.popUpRoles')
									.change(
											function() {
												if ($('.usrRole').text().trim() != $(
														this).val()) {
													showWarningMsgForRoleChange('<B>'
															+ $('.articleTitle')
																	.text()
															+ '</b> has created shortcuts which will be lost as a result of the role change. Continue?');
												}
											});
						}

}

function showWarningMsgForRoleChange(msg) {
	$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
	$("#dialog-confirmation").find('#ok').addClass("hideBlock");
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Warning');
	$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');

	$("#dialog-confirmation").find('.confirmation-yesbtn').click(function() {
		$("#dialog-confirmation").dialog('close');
	});

	$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
	// $("#dialog-confirmation").parent().find('.closePopUp').unbind('click');

	$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
		$('.popUpRoles').val($('.usrRole').text().trim());
		$("#dialog-confirmation").dialog('close');
	});
	$("#dialog-confirmation").parent().find('.closePopUp').click(function() {

	});
}

function showWarningMsg(msg, userId, salesOrg, mapStores) {
	$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
	$("#dialog-confirmation").find('#ok').addClass("hideBlock");
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Warning');
	$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');

	$("#dialog-confirmation").find('.confirmation-yesbtn').click(function() {
		$('#tableAddAction input:first').val(userId);
		$('#saleOrg').val(saleOrg);
		$('#verifyLabel').removeClass('hideBlock');
		$("#dialog-confirmation").dialog("close");
		mappedStores = mapStores;
		$("#dialog-verify").dialog("close");
		if (isStoreManager) {
			// should not reset when user is store org manager
		} else if (isSalesOrgManager) {
			$('.roleList,.department').val('Select');
			$('.roleList,.department').trigger('change');
			$('.storeList').html('');
			$('#multiplePOS input:first').val('');
		} else {
			$('.roleList,.department,.salesOrgMap').val('Select');
			$('.roleList,.department,.salesOrgMap').trigger('change');
			$('.storeList').html('');
			$('#multiplePOS input:first').val('');
		}
	});

	$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
	// $("#dialog-confirmation").parent().find('.closePopUp').unbind('click');

	$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
		warningData = '';
		$("#dialog-confirmation").dialog("close");
	});
	$("#dialog-confirmation").parent().find('.closePopUp').click(function() {
		warningData = '';
		// $("#dialog-confirmation").dialog("close");
	});
}
function confirmation(msg, id) {
	$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
	$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
			'Confirmation');
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function() {

	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function() {

		$("#dialog-confirmation").dialog("close");
	});
}

function showInformation(msg) {
	$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
	$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
			'Information');
	$("#dialog-confirmation").find('#ok').unbind('click');

	$("#dialog-confirmation").find('#ok').click(function() {
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
		$('.editRecord').trigger('click');
	});

	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function isAdminRole(role) {

	if (role == '' || role == null || role == undefined)
		return false;

	if (role.trim() == Its || role.trim() == Ss || role.trim() == Adm
			|| role.trim() == Br || role.trim() == POSRP
			|| role.trim() == STOTM || role.trim() == STTM
			|| role.trim() == RDOU || role.trim() == ITS1
			|| role.trim() == ITS2 || role.trim() == ITUA) {
		return true;
	} else {
		return false;
	}
}

function sortPagination() {
	var recCnt = $('.contentTr').length;
	if (recCnt > 10) {
		var noOfPages = Math.floor(recCnt / 10);
		if (recCnt % 10 > 0)
			noOfPages++;
		for ( var i = 1; i <= noOfPages; i++) {
			var pageClass = 'pageNo-' + i;
			$('.contentTr').removeClass(pageClass);
		}
		var index = 1;
		var page = 1;
		$('.contentTr').each(function() {
			var pageClass = 'pageNo-' + page;
			$(this).addClass(pageClass);
			if (index >= 10) {
				page++;
				index = 1;
			} else {
				index++;
			}

		});
	}

	if (recCnt > 10) {
		$('.searchPagination').removeClass('hideBlock');
		$('.searchPagination').pagination({
			items : recCnt,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			onPageClick : function(pageNo) {

				console.log(pageNo);
				closeAccordian();
				currentPage = pageNo;
				var pageClass = 'pageNo-' + pageNo;
				$('.contentTr').filter(function() {
					if ($(this).hasClass(pageClass))
						$(this).removeClass('hideBlock');
					else
						$(this).addClass('hideBlock');

				});
			}
		});

		var pageClass = 'pageNo-' + currentPage;
		$('.contentTr').filter(function() {
			if ($(this).hasClass(pageClass))
				$(this).removeClass('hideBlock');
			else
				$(this).addClass('hideBlock');

		});

	} else {
		$('.searchPagination').addClass('hideBlock');
	}
}

function leftPad(number, targetLength) {
	var output = number + '';
	while (output.length < targetLength) {
		output = '0' + output;
	}
	return output;
}

function shrunkSub() {
	$('.extentStore')
			.each(
					function() {
						if ($(this).html() == ' - hide') {
							$(this).parent().parent().removeClass('expanded');
							$(this).parent().parent().next().addClass(
									'hideBlock');
							$(this).html('+');
							$(this)
									.append(
											$(this).parent().parent().next()
													.find('tr').length - 1);
						}
					});
}

function validateUserOnCreate() {	
	var userId=$('#userID').val().split('-')[0].trim();
	var adminElem = verifiedUserElem.find('[adminrole]');
	var storeElems = verifiedUserElem.find('[storerole]');
	var isAdmin = isAdminRole($('.roleList').val());

	if (adminElem.length > 0) {
		if(adminElem.hasClass('success')){
			showInformation('User <b>' + userId
					+ '</b> is already active(Future active) as <B>'
					+ adminElem.first().text()
					+ '</b>,Please deactivate user to assign new role.');
			return false;
		}else if(isAdmin){
			showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
			return false;
		}
	} 
	if (storeElems.length > 0) {
		if (isStoreManager
				&& verifiedUserElem.find('[siteno="' + $('#posSite').val()
						+ '"]').length > 0) {
			if (verifiedUserElem.find('[siteno="' + $('#posSite').val() + '"]')
					.hasClass('deactive')) {
				showInformation('Add User function not allowed for inactive user. Use search function to edit inactive employee');
			} else {
				showInformation('User <B> ' + userId
						+ ' </b> is already mapped to logged in store. <b><i>');
			}
			return false;
		}
	} 
	return true;
}
