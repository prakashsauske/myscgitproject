var formData;
var hdrMap = {};
var itemInfo=[];
$(document)
		.ready(
				function() {

					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});

					$("#dialog-modal1").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-modal1").parent().addClass("popupWrapper");
					$('#searchBox').focus();
					$('.detailContent.brud').click(function() {
						showLookup();
					});
					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							/*
							 * if ($("#dialog-editFunctions").dialog('isOpen')) {
							 * $('.verifyStore').click(); }
							 */
							$(".goButton").trigger('click');
						}
					});
					$("#verifySupplier")
							.click(
									function() {

										var radioSelected = getRadioValue('sourceSupply');
										if (radioSelected == "vendor") {
											var vendorNo = $('#supplier').val()
													.split("-")[0];
											var vendorName = $('#supplier')
													.val().split("-")[1];
											var sourceSupply = $(
													'input:radio[name=sourceSupply]:checked')
													.val();

											if (($('#supplier').val() != '' && $(
													'#supplier').val() != 'Type number or name and click verify')) {
												$
														.ajax({
															type : "GET",
															url : "autocomplete.htm",
															beforeSend : function() {

																$('#statusImg')
																		.removeClass(
																				'loading hideBlock');
																$('#statusImg')
																		.addClass(
																				'loading');
															},
															data : {
																vendorNo : vendorNo,
																sourceSupply : sourceSupply,
																vendorName : vendorName
															},
															// data :
															// "vendorNo=" +
															// vendorNo +
															// "&sourceSupply="+sourceSupply
															// +
															// "&vendorName="+vendorName
															// ,
															success : function(
																	response) {
																$(
																		'#popupDataDiv')
																		.html(
																				response);
																if ($(
																		'#sizeCheck')
																		.val() == 0) {
																	$(
																			'#alertBox')
																			.text(
																					'Invalid supplier');
																	$(
																			"#dialog-modal1")
																			.dialog(
																					"open");
																	$('#okBtn')
																			.click(
																					function(
																							e) {
																						$(
																								"#dialog-modal1")
																								.dialog(
																										"close");
																					});
																	$(
																			'#supplier')
																			.focus();
																} else if ($(
																		'#sizeCheck')
																		.val() > 1) {
																	if (!$(
																			"#dialog-modal")
																			.dialog(
																					"isOpen")) {
																		$(
																				'#vendorDesc')
																				.val(
																						$(
																								'#supplier')
																								.val());
																		$(
																				"#dialog-modal")
																				.parent()
																				.addClass(
																						"popupWrapper");
																		$(
																				"#dialog-modal")
																				.dialog(
																						"open");
																		$(
																				"#searchWarning")
																				.addClass(
																						'hideBlock');
																		$(
																				"#popupSearch")
																				.removeClass(
																						'hideBlock');
																	}
																} else {
																	$(
																			"#supplier")
																			.val(
																					$(
																							"#suppNo0")
																							.text()
																							+ "-"
																							+ $(
																									"#suppName0")
																									.text());
																}
																$('#statusImg')
																		.addClass(
																				'loading hideBlock');
																$('#statusImg')
																		.removeClass(
																				'loading');
															},
														});
											} else {
												$('#alertBox')
														.text(
																'Please fill supplier field');
												$("#dialog-modal1").dialog(
														"open");
												$('#okBtn')
														.click(
																function(e) {
																	$(
																			"#dialog-modal1")
																			.dialog(
																					"close");
																});
												$('#supplier').focus();
											}
										}

									});

					$("#deptLstCnt").text($("#deptlst li").size());
					deptFlag = "Null";
					var nodeDesc = 0;
					$('.department')
							.on(
									'click',
									function() {
										$('#segmentLst li input').removeProp(
												'checked');
										$('#categoryLst li input').removeProp(
												'checked');
										$('#subCategoryLst li input')
												.removeProp('checked');

										$("#segmentLst").addClass('hideBlock');
										$("#segmentBtn").addClass('hideBlock');
										$("#subCategoryLst").addClass(
												'hideBlock');
										$("#segment").removeClass('hideBlock');
										$("#subCat").removeClass('hideBlock');
										$("#noSelectionCat").addClass(
												'hideBlock');
										$("#segmentLst").addClass('hideBlock');
										$("#subCategoryLst").addClass(
												'hideBlock');
										// my line
										$("#subCatTotal").addClass('hideBlock');
										$("#segmentTotal")
												.addClass('hideBlock');

										$("#categoryLst").removeClass(
												'hideBlock');
										$("#categoryLst").empty();
										$("#categoryLstCnt").text('');
										$("#subTotal").text('');
										$("#segmentTotalCnt").text('');
										var selectedValue = this.id.toString();
										var selectedValueId = "#" + this.id;
										var departmentStr = "";
										var i = 1;

										// if (deptFlag != selectedValue) {
										var deptHierarchyId = parseInt($(
												selectedValueId).attr(
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
																				function(
																						item) {
																					nodeID = deptHierarchyId
																							+ "."
																							+ i;
																					nodeIdTemp = nodeID
																							+ ".1";
																					departmentStr = '<li class="listitem"><input type="radio" name="category" class="category" data-tt-id="'
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

					function category() {
						catFlag = "Null";
						$(".category")
								.click(
										function() {
											/*----------------******  Category Click function   *****--------------- */
											$('#segmentLst li input')
													.removeProp('checked');
											// $('#categoryLst li
											// input').removeProp('checked');
											$('#subCategoryLst li input')
													.removeProp('checked');

											$("#segmentLst").addClass(
													'hideBlock');
											$("#segmentBtn").addClass(
													'hideBlock');
											$("#segment").removeClass(
													'hideBlock');
											// my line
											$("#segmentTotal").addClass(
													'hideBlock');

											$("#subCategoryLst").empty();
											$("#subTotal").text('');
											$("#segmentTotalCnt").text('');
											$('#subCat').addClass('hideBlock');
											$('#subCategoryLst').removeClass(
													'hideBlock');
											var selectedValue = this.id
													.toString();
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
																					function(
																							item) {
																						nodeID = catHierarchyId
																								+ "."
																								+ i;
																						nodeIdTemp = nodeID
																								+ ".1";
																						categoryStr = '<li class="listitem"><input type="radio" name="subCat" class="subCat" data-tt-id="'
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
																	$(
																			'#segmentBtn')
																			.removeClass(
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
											$('#segmentLst').removeClass(
													'hideBlock');
											$("#segmentBtn").addClass(
													'hideBlock');
											$("#segmentTotalCnt").text('');
											$("#segmentLst").empty();

											var selectedValue = this.id
													.toString();
											var selectedValueId = "#" + this.id;
											var subCatStr = "";
											var i = 1;
											// if (subCatFlag != selectedValue)
											// {
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

																						subCatStr = '<li class="listitem"><input type="radio" name="segme" class="segment" data-tt-id="" data-tt-parent-id="'
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

																	$(
																			'#segmentBtn')
																			.removeClass(
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
						$("#errorMsgDiv").addClass('hideBlock');
					}

					$('.createByActionBtn').click(
							function() {
								if ($(this).parent().parent().next().find('td')
										.hasClass('hideBlock'))
									$(this).parent().parent().next().find('td')
											.removeClass('hideBlock');
								else
									$(this).parent().parent().next().find('td')
											.addClass('hideBlock');

							});
					// Code to show and hide group By
					$('#groupByOpen1').click(function() {
						if ($(".groupByForm").hasClass("hideBlock")) {
							$("#tableAddAction").removeClass("hideBlock");
							$(".groupByForm").removeClass("hideBlock");
							$(".articleForm").addClass("hideBlock");
						} else {
							$(".groupByForm").addClass("hideBlock");
							$("#tableAddAction").addClass("hideBlock");
						}
						$("#filterOpen").removeClass('hideBlock');
						$(".filterRow").addClass('hideBlock');
						$("#filterClear").addClass('hideBlock');
						// $("#tableAddAction").addClass('hideBlock');
						$(".quickHelpWrapper").addClass('hideBlock');

					});

					$('.addActionBtn').click(function() {
						if ($(".articleForm").hasClass("hideBlock")) {
							$("#tableAddAction").removeClass("hideBlock");
							$(".groupByForm").addClass("hideBlock");
							$(".articleForm").removeClass("hideBlock");
						} else {
							$(".articleForm").addClass("hideBlock");
							$("#tableAddAction").addClass("hideBlock");
						}

						$("#filterOpen").removeClass('hideBlock');
						$(".filterRow").addClass('hideBlock');
						$("#filterClear").addClass('hideBlock');
						// $("#tableAddAction").addClass('hideBlock');
						$(".quickHelpWrapper").addClass('hideBlock');

					});

					$('.addActionBtn2').click(
							function() {
								$(".groupByForm2,#tableGroupAction").addClass(
										"hideBlock");
								$(".articleForm2,#tableGroupAction")
										.removeClass("hideBlock");
							});

					$('#groupByOpen2').click(function() {
						$(".groupByForm2").removeClass("hideBlock");
						$(".articleForm2").addClass("hideBlock");
					});
					// Code to apply group by
					$("#supp").click(function() {
						$(".groupBy1,#groupByClear1").removeClass('hideBlock');
						$("#groupByOpen1").addClass('hideBlock');
					});

					$('#groupByClear1').click(function() {
						$(".groupBy1,#groupByClear1").addClass('hideBlock');
						$('#groupByOpen1').removeClass("hideBlock");
						$('#supp').removeAttr('checked');
					});

					$("#dialog-hierarchy").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-delete").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						width : 600
					});

					// code for Open orders requirement

					// $("#openOrders").tabs();

					$("#dialog-openOrders").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});

					$("#dialog-openPromo").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$(".inputDate").datepicker({
						firstDay : 1,
						zIndex : 50
					});

					$(".newWindowAfter").click(
							function() {
								$("#dialog-openOrders").parent().addClass(
										"popupWrapper");
								$("#dialog-openOrders").dialog("open");
							});
					$(".promotionsLink").click(
							function() {
								$("#dialog-openPromo").parent().addClass(
										"popupWrapper");
								$("#dialog-openPromo").dialog("open");
							});

					// checks radio buttons in IBT Site
					$('#warehouse').click(function() {
						$("#warehouseField").removeClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
					});

					$('#vendor').click(function() {
						$("#vendorField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
					});

					$('#all').click(function() {
						$("#allField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
					});

					// checks radio buttons in IBT Site
					$('#warehouse2').click(function() {
						$("#warehouseField2").removeClass('hideBlock');
						$("#vendorField2").addClass('hideBlock');
						$("#allField2").addClass('hideBlock');
					});

					$('#vendor2').click(function() {
						$("#vendorField2").removeClass('hideBlock');
						$("#warehouseField2").addClass('hideBlock');
						$("#allField2").addClass('hideBlock');
					});

					$('#all2').click(function() {
						$("#allField2").removeClass('hideBlock');
						$("#warehouseField2").addClass('hideBlock');
						$("#vendorField2").addClass('hideBlock');
					});

					// checks radio buttons in IBT Site
					$('#warehouse1').click(function() {
						$("#warehouseField1").removeClass('hideBlock');
						$("#vendorField1").addClass('hideBlock');
						$("#allField1").addClass('hideBlock');
					});

					$('#vendor1').click(function() {
						$("#vendorField1").removeClass('hideBlock');
						$("#warehouseField1").addClass('hideBlock');
						$("#allField1").addClass('hideBlock');
					});

					$('#all1').click(function() {
						$("#allField1").removeClass('hideBlock');
						$("#warehouseField1").addClass('hideBlock');
						$("#vendorField1").addClass('hideBlock');
					});

					$('.groupByExpand1 .collapseAll').click(
							function() {
								$('.groupByTr2,.groupByExpand2 .collapseAll')
										.addClass('hideBlock');
								$('.groupByExpand2 .expandAll').removeClass(
										'hideBlock');
								$(this).addClass('hideBlock');
								$(this).parent().parent().parent().parent()
										.find('.groupByTr1').addClass(
												'hideBlock');
								$(this).parent().find('.expandAll')
										.removeClass('hideBlock');
							});
					$('.groupByExpand1 .expandAll').click(
							function() {
								$(this).addClass('hideBlock');
								$('.groupByTr2,.groupByExpand2 .collapseAll')
										.addClass('hideBlock');
								$('.groupByExpand2 .expandAll').removeClass(
										'hideBlock');
								$(this).parent().parent().parent().parent()
										.find('.groupByTr1').removeClass(
												'hideBlock');
								$(this).parent().find('.collapseAll')
										.removeClass('hideBlock');
							});

					$('.groupByExpand2 .collapseAll').click(
							function() {
								$(this).addClass('hideBlock');
								$('.groupByTr1,.groupByExpand1 .collapseAll')
										.addClass('hideBlock');
								$('.groupByExpand1 .expandAll').removeClass(
										'hideBlock');
								$(this).parent().parent().parent().parent()
										.find('.groupByTr2').addClass(
												'hideBlock');
								$(this).parent().find('.expandAll')
										.removeClass('hideBlock');
							});
					$('.groupByExpand2 .expandAll').click(
							function() {
								$(this).addClass('hideBlock');
								$('.groupByTr1,.groupByExpand1 .collapseAll')
										.addClass('hideBlock');
								$('.groupByExpand1 .expandAll').removeClass(
										'hideBlock');
								$(this).parent().parent().parent().parent()
										.find('.groupByTr2').removeClass(
												'hideBlock');
								$(this).parent().find('.collapseAll')
										.removeClass('hideBlock');
							});

					// checks radio buttons in lookup
					$('#type').click(function() {
						$("#typeInputs").removeClass('hideBlock');
						$("#numberInputs").addClass('hideBlock');
					});
					$('#number').click(function() {
						$("#numberInputs").removeClass('hideBlock');
						$("#typeInputs").addClass('hideBlock');
					});
					$('#refNumber').click(function() {
						$("#numberInputs").removeClass('hideBlock');
						$("#typeInputs").addClass('hideBlock');
					});

					$('#mainTabs-7').tabs();

					// popup for department hierarchy

					$("#deptHie").click(
							function() {
								$("#dialog-hierarchy").parent().addClass(
										"popupWrapper");
								$("#dialog-hierarchy").dialog("open");
							});

					$(".deleteRecord").click(function() {
						$("#dialog-delete").parent().addClass("popupWrapper");
						$("#dialog-delete").dialog("open");
					});

					// $(".tabs").tabs();

					// code to initialise tree table
					$(".treetable").treetable({
						expandable : true
					});

					// Code for Expand and Collapse all
					$('#expandAll').click(function() {
						$("#allocations").treetable('expandAll');
						$("#expandAll").addClass('hideBlock');
						$("#collapseAll").removeClass('hideBlock');
						$('#allocations tr:even').removeClass('expanded');
					});

					$('#collapseAll').click(function() {
						$("#allocations").treetable('collapseAll');
						$("#expandAll").removeClass('hideBlock');
						$("#collapseAll").addClass('hideBlock');
					});

					// code for table sorter
					$(".actionRows").tablesorter();

					$(".actionRows th").click(function() {
						$('.actionRows tr td').each(function() {
							$(this).removeClass("sorted");
						});

						col = $(this).parent().children().index($(this));

						$('.actionRows tr').each(function() {
							$(this).find('td').eq(col).addClass("sorted");
						});

					});

					// Code to show and hide filter
					$('#filterOpen').click(function() {
						$("#filterClear").removeClass('hideBlock');
						$(".filterRow").removeClass('hideBlock');
						$(".quickHelpWrapper").removeClass('hideBlock');
						$(this).addClass('hideBlock');
						$("#tableAddAction").addClass('hideBlock');
						$(".groupBy1,#groupByClear1").addClass('hideBlock');
						$('#groupByOpen1').removeClass("hideBlock");
						$('#supp').removeAttr('checked');
					});

					$('#filterClear').click(function() {
						$("#filterOpen").removeClass('hideBlock');
						$(".filterRow").addClass('hideBlock');
						$(this).addClass('hideBlock');
						// $(".tableActionsWrapper").addClass('hideBlock');
						$(".quickHelpWrapper").addClass('hideBlock');
					});

					// Code to close
					$(".close").click(function() {
						$(".quickHelpWrapper").addClass('hideBlock');
					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					/*
					 * $(selector).pagination({ items: 100, itemsOnPage: 10,
					 * cssStyle: 'compact-theme' });
					 */

					$("#advLink1")
							.click(
									function() {

										var scroll = $(window).scrollTop();

										var lookupHeight = $('#lookupContainer')
												.height();

										document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
										document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");

										var lookupBgheight = $("#advDiv")
												.outerHeight()
												+ 20 + "px";
										$("#advWrapper").css("height", "290px");

										$("#advDiv").removeClass(
												'advancedParam hideBlock');
										$("#advDiv").addClass('advancedParam');

										$("#advWrapper")
												.removeClass(
														'advancedSearchFormatWrapper hideBlock');
										$("#advWrapper").addClass(
												'advancedSearchFormatWrapper');

										$("#closeLink").removeClass(
												'linkBtn hideBlock');
										$("#closeLink").addClass('linkBtn');

										$("#advLink1").hide();
										$("#value").val("");

									});

					/*
					 * $("#tabs-6") .click( function(){
					 * 
					 * getOrderEnquiryResultsBasedOnTabCode($('#searchForm').serialize(),
					 * 'Overdue'); });
					 */

					$(".goButton")
							.click(
									function() {
										var hasError = "false";
										var radioSelected = getRadioValue('sourceSupply');
										if (radioSelected == "vendor"
												|| radioSelected == "warehouse"
												|| radioSelected == "store") {

											if (radioSelected == "vendor") {

												if (($('#supplier').val() == '' || $(
														'#supplier').val() == 'Type number or name and click verify')) {
													hasError = "true";
													$('#alertBox')
															.text(
																	'Please fill supplier field');
													$("#dialog-modal1").dialog(
															"open");
													$('#okBtn')
															.click(
																	function(e) {
																		$(
																				"#dialog-modal1")
																				.dialog(
																						"close");
																	});
													$('#supplier').focus();
												} else {

												}
											} else if (radioSelected == "warehouse") {
												if (($('#wareHouseDrop').val() == '' || $(
														'#wareHouseDrop').val() == 'Select Warehouse')) {
													hasError = "true";
													$('#alertBox')
															.text(
																	'Please select a warehouse');
													$("#dialog-modal1").dialog(
															"open");
													$('#okBtn')
															.click(
																	function(e) {
																		$(
																				"#dialog-modal1")
																				.dialog(
																						"close");
																	});
													$('#supplier').focus();
												}
											}

										}

										if ((($('#fromDate').val() == '' || $(
												'#fromDate').val() == 'dd/mm/yyyy'))
												&& ($('#toDate').val() != '' && $(
														'#toDate').val() != 'dd/mm/yyyy')) {
											hasError = "true";
											$("#dialog-modal1").removeClass(
													'hideBlock');
											$('#alertBox')
													.text(
															'Please enter a delivery from date');
											$("#dialog-modal1").dialog("open");
											$('#okBtn')
													.click(
															function(e) {
																$(
																		"#dialog-modal1")
																		.dialog(
																				"close");
																$("#fromDate")
																		.focus();
															});

										}
										if (hasError == "false") {
											callOrderEnquiryService($(
													'#searchForm').serialize());
											closeAdvSearchClasses();
										}
									});

					// //<!-- closes advanced search when close is clicked -->
					$("#closeLink").click(function() {
						closeAdvSearchClasses();
					});

					$('#okBtn').click(function(e) {

						$("#dialog-modal1").dialog("close");
					});

					function getRadioValue(name) {
						var group = document.getElementsByName(name);

						for ( var i = 0; i < group.length; i++) {
							if (group[i].checked) {
								return group[i].value;
							}
						}

						return '';
					}
					// //<!-- closes advanced search box when windowed are
					// scrolled unless in popup
					// menu -->
					$(window)
							.scroll(
									function() {
										if ($('#dialog-modal').dialog("isOpen") == true) {
											var scroll = $(window).scrollTop();
											var lookupHeight = $(
													'#lookupContainer')
													.height();
											document
													.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
											document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
										} else {
											closeAdvSearchClasses();
										}
									});

					// //<!-- closes advanced search box when cotent out side of
					// the box is clicked
					// -->
					$('.mainWrapper').click(function() {
						closeAdvSearchClasses();
					});

					// <!-- disable close box function when lookup box is
					// clicked -->
					$('#lookupContainer').click(function(event) {
						event.stopPropagation();
					});

					// <!-- disable close box function when lookup box is
					// clicked -->
					$('.popupWrapper').click(function(event) {
						event.stopPropagation();
					});

					// <!-- method called to close advanced search box in css
					// -->
					function closeAdvSearchClasses() {
						$("#advDiv").removeClass('advancedParam');
						$("#advDiv").addClass('advancedParam hideBlock');

						$("#advWrapper").removeClass(
								'advancedSearchFormatWrapper');
						$("#advWrapper").addClass(
								'advancedSearchFormatWrapper hideBlock');

						$("#closeLink").removeClass('linkBtn');
						$("#closeLink").addClass('linkBtn hideBlock');

						$("#advLink1").show();

						$("#suppName").val("");
						$("#suppNo").val("");
					}

					/* Code for hierarchy */

					$("input[name='departmentList']").click(
							function() {
								$("#catDiv").find(".noSelection").addClass(
										'hideBlock');
								$("#catDiv").find("ul")
										.removeClass('hideBlock');
								$("#catDiv").find(".totalCount").removeClass(
										'hideBlock');

								$("#subCatDiv").find(".noSelection")
										.removeClass('hideBlock');
								$("#subCatDiv").find("ul")
										.addClass('hideBlock');
								$("#subCatDiv").find(".totalCount").addClass(
										'hideBlock');
								$("#subCatDiv").find(".heirachyAction")
										.addClass('hideBlock');

								$("#segDiv").find(".noSelection").removeClass(
										'hideBlock');
								$("#segDiv").find("ul").addClass('hideBlock');
								$("#segDiv").find(".totalCount").addClass(
										'hideBlock');

							});

					$("input[name='categoryList']").click(
							function() {
								$("#subCatDiv").find(".noSelection").addClass(
										'hideBlock');
								$("#subCatDiv").find("ul").removeClass(
										'hideBlock');
								$("#subCatDiv").find(".totalCount")
										.removeClass('hideBlock');
								// $("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
								$("#subCatDiv").find(".heirachyAction")
										.fadeOut(300);

								$("#segDiv").find(".noSelection").removeClass(
										'hideBlock');
								$("#segDiv").find("ul").addClass('hideBlock');
								$("#segDiv").find(".totalCount").addClass(
										'hideBlock');
							});

					$("input[name='subCatList']").click(
							function() {
								// $("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
								$("#subCatDiv").find(".heirachyAction").fadeIn(
										400);

								$("#segDiv").find(".noSelection").addClass(
										'hideBlock');
								$("#segDiv").find("ul")
										.removeClass('hideBlock');
								$("#segDiv").find(".totalCount").removeClass(
										'hideBlock');
							});

					// Code for Auto Complete

					var searchList = [ "1234 - Warehouse Order (ORD)",
							"1235 - Vendor Order (ORD)",
							"12345 - T-shirt for kids small",
							"12347 - T-shirt for kids Med",
							"12348 - T-shirt for kids Large",
							"12349 - T-shirt for boys small" ];
					$("#searchBox").autocomplete({
						source : searchList
					});

					// My list and store list change
					$("#listOption").change(function() {

						$("#myDrafts").toggleClass('hideBlock');
						$("#allDrafts").toggleClass('hideBlock');

					});

					// Code to show and hide filter
					$('#filterOpen').click(function() {
						$("#filterClear").removeClass('hideBlock');
						$(".filterRow").removeClass('hideBlock');
						$(this).addClass('hideBlock');
						// $("#groupByClear").trigger( "click" );
					});

					$('#filterClear').click(function() {
						$("#filterOpen").removeClass('hideBlock');
						$(".filterRow").addClass('hideBlock');
						$(this).addClass('hideBlock');
						$(".tableActionsWrapper").addClass('hideBlock');
					});
					
					bindOnloadEventsForCreateOrders();
				});
function callOrderEnquiryService(data) {
	console.log(data);
	var start_dt = '';
	var end_dt = '';
	var category = '';
	var lookup = '';
	var order_type = '';
	var status = '';
	var source_of_supply = '';
	var dept_no = '';
	var sub_dept_no = '';
	var cat_no = '';
	var sub_cat_no = '';

	if ($('#fromDate').val() != '' && $('#fromDate').val() != null
			&& $('#fromDate').val() != undefined) {
		start_dt = $('#fromDate').val().split('/')[2]+'-'+$('#fromDate').val().split('/')[1]+'-'+$('#fromDate').val().split('/')[0];
	}
	if ($('#toDate').val() != '' && $('#toDate').val() != null
			&& $('#toDate').val() != undefined) {
		end_dt = $('#toDate').val().split('/')[2]+'-'+$('#toDate').val().split('/')[1]+'-'+$('#toDate').val().split('/')[0];
	}
	if ($('#searchBox').val() != '' && $('#searchBox').val() != null
			&& $('#searchBox').val() != undefined) {
		lookup = $('#searchBox').val().trim();
	}
	if ($('[name="iv_order_type"]').val() != ''
			&& $('[name="iv_order_type"]').val() != null
			&& $('[name="iv_order_type"]').val() != undefined
			&& $('[name="iv_order_type"]').val() != 'All') {
		order_type = $('[name="iv_order_type"]').trim();
	}
	if ($('[name="iv_order_status"]').val() != ''
			&& $('[name="iv_order_status"]').val() != null
			&& $('[name="iv_order_status"]').val() != undefined
			&& $('[name="iv_order_status"]').val() != 'All') {
		status = $('[name="iv_order_status"]').val();
	}
	/*
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ source_of_supply=$('#fromDate').val(); }
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ dept_no=$('#fromDate').val(); }
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ sub_dept_no=$('#fromDate').val(); }
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ cat_no=$('#fromDate').val(); }
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ sub_cat_no=$('#fromDate').val(); }
	 * if($('#fromDate').val()!='' && $('#fromDate').val()!=null &&
	 * $('#fromDate').val()!=undefined){ category=$('#fromDate').val(); }
	 */

	var data = '[{' + '"category":"' + category + '",' + '"lookup":"' + lookup
			+ '",' + '"start_dt":"' + start_dt + '",' + '"end_dt":"' + end_dt
			+ '",' + '"order_type":"' + order_type + '",' + '"status":"'
			+ status + '",' + '"source_of_supply":"' + source_of_supply + '",'
			+ '"dept_no":"' + dept_no + '",' + '"sub_dept_no":"' + sub_dept_no
			+ '",' + '"cat_no":"' + cat_no + '",' + '"sub_cat_no":"'
			+ sub_cat_no + '"' + '}]';
	$('.tabs tbody').html('');
	$('.fullyTab,.readyTab,.overdueTab,.openTab').addClass('hideBlock').hide();
	console.log(data);
	formData = data;
	$
			.post(
					getTabCodeInfo,
					data,
					function(response) {

						var output = response;
						var list = output;
						var tabCode = '';
						var tab_count = '';
						if (list != null && list != undefined && list != ''
								&& list.length > 0) {
							var content = '';
							for ( var i = 0; i < list.length; i++) {
								tabCode = list[i].tab_code;
								tab_count = list[i].tab_count;
								console.log(tabCode);
								if (tabCode == 'Overdue' && tab_count > 0) {
									content += '<li id="'
											+ 'OVERDUE-12'
											+ '" ><a href="#tabs-6"><label class="hideblock"></label>Overdue (<label class="total">'
											+ tab_count + '</label>)</a></li>';
								} else if (tabCode == 'Ready to Receive'
										&& tab_count > 0) {
									content += '<li id="'
											+ 'READY_TO_RECEIVE-13'
											+ '" ><a href="#tabs-1">Ready to Receive (<label class="total">'
											+ tab_count + '</label>)</a></li>';
								} else if (tabCode == 'FULLY_RECEIVED'
										&& tab_count > 0) {
									content += '<li id="'
											+ 'FULLY_RECEIVED-99'
											+ '" ><a href="#tabs-4"><label class=""></label>Fully Received (<label class="total">'
											+ tab_count + '</label>)</a></li>';
								} else if (tabCode == 'Open Orders'
										&& tab_count > 0) {
									content += '<li id="'
											+ 'OPEN_ORDERS-88'
											+ '" ><a href="#tabs-2">Open Orders (<label class="total">'
											+ tab_count + '</label>)</a></li>';
								}
							}
							$('#listOfTabs').html('');
							$('#listOfTabs').append(content);
							$('.mainTableWrapper ').removeClass('hideBlock');
							bindClickEventForTabs();
							if ($('.tabs #listOfTabs li:visible') != null
									&& $('.tabs #listOfTabs li:visible') != undefined) {
								$('.tabs #listOfTabs li:visible').trigger(
										'click');
							}
						}
						stopLoading();
					});
}
function fetchScreenData(orderNo, startDate, endDate, orderType, status,
		source, dept_no, sub_dept_no, cat_no, sub_cat_no) {
	if ($('#warehouse').is(':checked')) {
		srcOfSupply = "warehouse";
		if ($('#warehouseDrpdwn').val() != 'Select'
				&& $('#warehouseDrpdwn').val() != '') {
			source = $('#warehouseDrpdwn').val().split('-')[0].trim();
		}
	} else if ($('#vendor').is(':checked')) {
		srcOfSupply = "vendor";
		if ($('#vendorNo').val() != 'Select' && $('#vendorNo').val() != '') {
			source = $('#vendorNo').val().split('-')[0].trim();
		}
	}
	if ($('#fromDate').val() != null && $('#fromDate').val() != undefined
			&& $('#fromDate').val() != '') {
		startDate = $('#fromDate').val();
	}
	if ($('#toDate').val() != null && $('#toDate').val() != undefined
			&& $('#toDate').val() != '') {
		endDate = $('#toDate').val();
	}
	if ($('#department').val() != 'Select' && $('#department').val() != '') {
		dept_no = $('#department').val().split('-')[0].trim();
	} else if ($('#depH').is(':checked')) {
		if ($('[name="departmentList"]:checked').length > 0) {
			dept_no = $('[name="departmentList"]:checked').val();
			if ($('[name="category"]:checked').length > 0) {
				cat_no = $('[name="category"]:checked').val();
				if ($('[name="sub-category"]:checked').length > 0) {
					sub_cat_no = $('[name="sub-category"]:checked').val();
				}
			}
		}
	}
	if ($('#status').val() != 'Select' && $('#status').val() != '') {
		status = $('#status').val();
	}
	if ($('#type').val() != 'Select' && $('#type').val() != '') {
		status = $('#type').val();
	}
	if ($('#searchBox').val() != null && $('#searchBox').val() != undefined
			&& $('#searchBox').val() != '') {
		orderNo = $('#searchBox').val();
	}
}

function formMapFromList(list) {
	var hdrMap = {};
	for ( var i = 0; i < list.length; i++) {
		var key = list[i].order_no;
		var value = list[i];
		var newList = [];
		if ($(hdrMap).attr(key) != undefined) {
			newList = $(hdrMap).attr(key);
		}
		newList.push(value);
		hdrMap[key] = newList;
	}

	return hdrMap;
}
function formListFromMap(hdrMap) {
	var newList = [];
	for (m in hdrMap) {
		var list = hdrMap[m];
		newList.push(list[0]);
	}
	return newList;
}

function getOrderEnquiryResultsBasedOnTabCode(tabCode, lookupCode) {

	/*
	 * var orderNo = ''; var startDate = ''; var endDate = ''; var orderType =
	 * ''; var status = ''; var source = ''; var dept_no = ''; var sub_dept_no =
	 * ''; var cat_no = ''; var sub_cat_no = ''; if
	 * ($('#warehouse').is(':checked')) { if ($('#warehouseDrpdwn').val() !=
	 * 'Select' && $('#warehouseDrpdwn').val() != '') { source =
	 * $('#warehouseDrpdwn').val().split('-')[0].trim(); } } else if
	 * ($('#vendor').is(':checked')) { if ($('#vendorNo').val() != 'Select' &&
	 * $('#vendorNo').val() != '') { source =
	 * $('#vendorNo').val().split('-')[0].trim(); } } if ($('#fromDate').val() !=
	 * null && $('#fromDate').val() != undefined && $('#fromDate').val() != '') {
	 * startDate = $('#fromDate').val(); } if ($('#toDate').val() != null &&
	 * $('#toDate').val() != undefined && $('#toDate').val() != '') { endDate =
	 * $('#toDate').val(); } if ($('#department').val() != 'Select' &&
	 * $('#department').val() != '') { dept_no =
	 * $('#department').val().split('-')[0].trim(); } else if
	 * ($('#depH').is(':checked')) { if
	 * ($('[name="departmentList"]:checked').length > 0) { dept_no =
	 * $('[name="departmentList"]:checked').val(); if
	 * ($('[name="category"]:checked').length > 0) { cat_no =
	 * $('[name="category"]:checked').val(); if
	 * ($('[name="sub-category"]:checked').length > 0) { sub_cat_no =
	 * $('[name="sub-category"]:checked').val(); } } } } if ($('#status').val() !=
	 * 'Select' && $('#status').val() != '' && $('#status').val() != 'All') {
	 * status = $('#status').val(); } if ($('#type').val() != 'Select' &&
	 * $('#type').val() != '' && $('#type').val() != 'All') { orderType =
	 * $('#type').val(); } if ($('#searchBox').val() != null &&
	 * $('#searchBox').val() != undefined && $('#searchBox').val() != '') {
	 * orderNo = $('#searchBox').val(); }
	 */

	// console.log("Order no " + orderNo);
	/*
	 * var draft = [ { "category" : tabCode, "LOOKUP" : lookupCode, "order_no" :
	 * orderNo, "start_dt" : startDate, "end_dt" : endDate, "order_type" : '',
	 * "status" : '', "source_of_supply" : source, "dept_no" : dept_no,
	 * "sub_dept_no" : sub_dept_no, "cat_no" : cat_no, "sub_cat_no" : sub_cat_no } ];
	 */
	if (formData != null && formData != '' && formData != undefined
			&& formData.length > 0) {
		var data = $.parseJSON(formData);
		data[0].category = tabCode;
		$.post(getTabResults, JSON.stringify(data), function(response) {

			var output = response;
			var list = output;
			console.log(output);
			var tempHdrMap = formMapFromList(list);
			list = formListFromMap(tempHdrMap);
			hdrMap = tempHdrMap;
			if (tabCode == 'OVERDUE') {
				if (response.length == 0) {
					$('#alertBox').text('No records found');
					$("#dialog-modal1").dialog("open");
					$('#okBtn').click(function(e) {
						$("#dialog-modal1").dialog("close");
					});
				} else {
					formOverdueContent(list);
				}

			} else if (tabCode == 'READY_TO_RECEIVE') {
				if (response.length == 0) {
					$('#alertBox').text('No records found');
					$("#dialog-modal1").dialog("open");
					$('#okBtn').click(function(e) {
						$("#dialog-modal1").dialog("close");
					});
				} else {
					formReadyToReceiveContent(list);
				}

			} else if (tabCode == 'FULLY_RECEIVED') {
				if (response.length == 0) {
					$('#alertBox').text('No records found');
					$("#dialog-modal1").dialog("open");
					$('#okBtn').click(function(e) {
						$("#dialog-modal1").dialog("close");
					});
				} else {
					formFullyReceivedContent(list);
				}

			} else if (tabCode == 'OPEN_ORDERS') {
				if (response.length == 0) {
					$('#alertBox').text('No records found');
					$("#dialog-modal1").dialog("open");
					$('#okBtn').click(function(e) {
						$("#dialog-modal1").dialog("close");
					});
				} else {
					formOpenContent(list);
				}

			}
			bindOrderHdrContent();
			stopLoading();
		});

	}

	/*
	 * console.log(JSON.stringify(draft)); $.ajax({ type : "POST", url :
	 * getTabResults, data : JSON.stringify(draft), beforeSend : function() {
	 * startLoading(); }, success : function(response) {
	 * 
	 * var output = response; var list = output; console.log(output);
	 * 
	 * if (tabCode == 'OVERDUE') { if (response.length == 0) {
	 * $('#alertBox').text('No records found');
	 * $("#dialog-modal1").dialog("open"); $('#okBtn').click(function(e) {
	 * $("#dialog-modal1").dialog("close"); }); } else {
	 * formOverdueContent(list); } } else if (tabCode == 'READY_TO_RECEIVE') {
	 * if (response.length == 0) { $('#alertBox').text('No records found');
	 * $("#dialog-modal1").dialog("open"); $('#okBtn').click(function(e) {
	 * $("#dialog-modal1").dialog("close"); }); } else {
	 * formReadyToReceiveContent(list); } ; } else if (tabCode ==
	 * 'FULLY_RECEIVED') { if (response.length == 0) { $('#alertBox').text('No
	 * records found'); $("#dialog-modal1").dialog("open");
	 * $('#okBtn').click(function(e) { $("#dialog-modal1").dialog("close"); }); }
	 * else { formFullyReceivedContent(list); } } else if (tabCode ==
	 * 'OPEN_ORDERS') { if (response.length == 0) { $('#alertBox').text('No
	 * records found'); $("#dialog-modal1").dialog("open");
	 * $('#okBtn').click(function(e) { $("#dialog-modal1").dialog("close"); }); }
	 * else { formOpenContent(list); } } stopLoading(); }, error : function() {
	 * console.log('Error'); }, });
	 */
}
function bindOrderHdrContent() {
	$('.tabs .parentTr').unbind('click');
	$('.tabs .parentTr').click(function() {
		var elem = $(this);
		var order_no = $(this).find('td:first').text().trim();
		console.log(order_no);
		getOrderDetail(elem, order_no);
	});
}
function getAllocationOrders(data) {
	var response = '';

	response = '{"data":[{"msg" : "","onshow_date":"15/02/2015","allocation_no":"1","page_no":"1","record_count":"10",'
			+ '"allocation_desc":"TESTING","reason":"to check ","department_no":"15","department_desc":"GENERAL MERCHANDISE",'
			+ '"article_no":"120044","article_desc":"APPLE FUJI 12 KG","allocation_qty":"25","allocation_status":"Completed",'
			+ '"order_no":"24","order_status":"OPEN"}]}';
	var output = $.parseJSON(response);
	var list = output.data;
	console.log(output.data);

	formAllocationContent(list);
}

function formOverdueContent(list) {
	var content = '';
	var k = 1;
	var j = 1;
	var recordCount = '';
	for ( var i = 0; i < list.length; i++) {

		list[i].order_no = (list[i].order_no != null && list[i].order_no != undefined) ? list[i].order_no
				: '';
		list[i].delivery_date = (list[i].delivery_date != null && list[i].delivery_date != undefined) ? list[i].delivery_date
				: '';
		list[i].order_status = (list[i].order_status != null && list[i].order_status != undefined) ? list[i].order_status
				: '';
		list[i].supplier_name = (list[i].supplier_name != null && list[i].supplier_name != undefined) ? list[i].supplier_name
				: '';
		list[i].supplier_no = (list[i].supplier_no != null && list[i].supplier_no != undefined) ? list[i].supplier_no
				: '';
		list[i].order_type = (list[i].order_type != null && list[i].order_type != undefined) ? list[i].order_type
				: '';
		list[i].source = (list[i].source != null && list[i].source != undefined) ? list[i].source
				: '';
		list[i].total_cartons = (list[i].total_cartons != null && list[i].total_cartons != undefined) ? list[i].total_cartons
				: '';
		list[i].total_pallets = (list[i].total_pallets != null && list[i].total_pallets != undefined) ? list[i].total_pallets
				: '';

		content += '<tr id="' + list[i].order_no + '" class="parentTr page-'
				+ k;
		if (j > 10)
			content += ' hideBlock "';

		content += '" >';
		content += '<td data_order_no="' + list[i].order_no + '">'
				+ list[i].order_no + '</td><td class="centerValue">'
				+ list[i].delivery_date + '</td><td class="centerValue">'
				+ list[i].order_status + '</td><td>' + list[i].supplier_name
				+ '(' + list[i].supplier_no + ')' + '</td><td class="">'
				+ list[i].order_type + '</td><td class="">' + list[i].source
				+ '</td><td class="numberColumn">' + list[i].total_cartons
				+ '</td><td class="lastColumn numberColumn">'
				+ list[i].total_pallets + '</td></tr>';

		if (j % 10 == 0) {
			k++;
		}
		j++;
	}

	recordCount = list.length;
	var curPage = 1;
	if (recordCount > 10) {

		$('.paginationDivOverdue').pagination({
			items : recordCount,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : curPage,
			onPageClick : function(pageNo) {

				// closeAccordian();
				curPage = pageNo;
				var pageClass = 'page-' + pageNo;
				$('.parentTr').filter(function() {

					if ($(this).hasClass(pageClass)) {
						$(this).removeClass('hideBlock');
					} else {
						$(this).addClass('hideBlock');
					}
				});

			}

		});

		$(' .paginationDivOverdue').removeClass('hideBlock');

	} else {

		$(' .paginationDivOverdue').addClass('hideBlock');
	}

	$('.mainTableWrapper ').removeClass('hideBlock');
	$('.overdueTableWrapper').removeClass('hideBlock');
	$('.overdueTab').removeClass('hideBlock');
	$('#overdueTable tbody').html('');
	$('#overdueTable tbody').append(content);

}
function showDetail() {
	$('.lookup').addClass('hideBlock');
	$('.detailContent ').removeClass('hideBlock');
}
function showLookup() {
	$('.lookup').removeClass('hideBlock');
	$('.detailContent ').addClass('hideBlock');
	$('.receive').addClass('hideBlock');
}
function getOrderDetail(elem, order_no) {
	var tempList = [];
	if (hdrMap != null && hdrMap != undefined && hdrMap != '') {
		tempList = hdrMap[order_no];
		formOrderDetailContent(tempList);
	}
}

function formOrderDetailContent(tempList) {
	if (tempList != null && tempList != '' && tempList != undefined) {

		$('.order-dtl-order-no').text('Order #' + tempList[0].order_no);
		$('.order-dtl-supplier-no')
				.text(
						tempList[0].supplier_name + '('
								+ tempList[0].supplier_no + ')');
		$('.order-dtl-disp-date').text('');
		$('.order-dtl-delv-date').text(tempList[0].delivery_date);
		$('.order-dtl-order-status').text(tempList[0].order_status);
		$('.order-dtl-tot-carton').text(tempList[0].total_cartons);
		var content = '';
		itemInfo=tempList;
		for ( var i = 0; i < tempList.length > 0; i++) {
			content = '<tr id="row-1" class="rowHighlight">'
					+ '<td>'+tempList[i].article_no+'</td>'
					+ '<td>'+''+'</td><td>'+tempList[i].article_desc+'</td>'
					+ '<td class="centerValue columnDivider">'+'1'+'</td>'
					+ '<td class="centerValue ">'+''+'</td>'
					+ '<td class="centerValue columnDivider"><strong>'+''+'</strong></td>'
					+ '<td class="centerValue ">'+''+'</td>'
					+ '<td class="centerValue columnDivider"><strong>'+''+'</strong></td>'
					+'<td id="receivedEdit-1" class="centerValue receive hideBlock">'
					+ '<input type="#" value="" class="editNumCell textbox textboxDefaultText">'
					+ '</td><td id="received-1" class="centerValue receive columnDivider hideBlock"></td>'
					+ '<td id="packOMEdit-1" class="centerValue  columnHide hideBlock">'
					+ '<input type="#" value="" class="editNumCell textbox textboxDefaultText">'
					+ '</td><td id="expiryEdit-1" class="centerValue  columnHide hideBlock">'
					+ '<input type="#" placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell" id="dp1426811764510">'
					+ '</td><td class="centerValue receive lastColumn hideBlock"><input checked type="checkbox"></td></tr>';
			
		}
		if(content!='')
			{
			$('#groupByOpen').parent().parent().addClass('hideBlock');
			$('#viewMode .sectionTitle').text('List of Articles ('+tempList.length+')');
			$('.order-dtl-item-info tbody').html(content);
			}
		bindDetailContent();
		showDetail();
	}

}
function bindDetailContent(){
	$('.receive-order').unbind('click');
	$('.receive-order').click(function(){
		$('.receive').removeClass('hideBlock');
		});
	$('#confirmOrder').unbind('click');
	$('#confirmOrder').click(function(){
		var orderNo='';
		var itemNo='';
		var qty='';
		var vendor_no='';
		if(itemInfo!=null && itemInfo!=undefined && itemInfo!=''){
			orderNo=itemInfo[0].order_no;
			itemNo=itemInfo[0].article_no;
			qty=$('#receivedEdit-1 input').val();
			vendor_no=itemInfo[0].supplier_no;
		}
		var data= '{"status":"OP","ref_doc_no":"'+'0000'+'", "cashier":"12",'
		    +'"authorized_by":"","ASN":"","ref_order_no":"'+orderNo+'","gst_total":"11.11",'
		    +'"invoice_total":"10.10","action_code":"I","delivery_no":"1","message_variant":"a",'
		    +'"posting_date":"20150320","document_date":"20150320",'
		    +'"items":[{"status":"OP","ref_order_no":"'+orderNo+'","ref_order_item":"0001","qualartnr":"1",'
		    +'"sales_unit":"A", "catch_weight":"15","reason_code":"a","ad_reason":"b","article_no":"'+itemNo+'",'
		    +'"movement_type":"313","quantity":"'+qty+'","completed_ind":"1","vendor_no":"'+vendor_no+'"}]}';
		$.post(receiveOrders, data, function(response) {
			$('#alertBox').text('Received Successfully');
			$("#dialog-modal1").dialog("open");
			$('#okBtn').click(function(e) {
				$("#dialog-modal1").dialog("close");
				showLookup();
			});
		});
	});
}
function formReadyToReceiveContent(list) {
	if (list.length > 0 && list != null && list != undefined) {
		var content = '';
		var k = 1;
		var j = 1;
		var recordCount = '';
		for ( var i = 0; i < list.length; i++) {

			list[i].order_no = (list[i].order_no != null && list[i].order_no != undefined) ? list[i].order_no
					: '';
			list[i].delivery_date = (list[i].delivery_date != null && list[i].delivery_date != undefined) ? list[i].delivery_date
					: '';
			list[i].order_status = (list[i].order_status != null && list[i].order_status != undefined) ? list[i].order_status
					: '';
			list[i].supplier_name = (list[i].supplier_name != null && list[i].supplier_name != undefined) ? list[i].supplier_name
					: '';
			list[i].supplier_no = (list[i].supplier_no != null && list[i].supplier_no != undefined) ? list[i].supplier_no
					: '';
			list[i].order_type = (list[i].order_type != null && list[i].order_type != undefined) ? list[i].order_type
					: '';
			list[i].source = (list[i].source != null && list[i].source != undefined) ? list[i].source
					: '';
			list[i].total_cartons = (list[i].total_cartons != null && list[i].total_cartons != undefined) ? list[i].total_cartons
					: '';
			list[i].total_pallets = (list[i].total_pallets != null && list[i].total_pallets != undefined) ? list[i].total_pallets
					: '';

			content += '<tr id="' + list[i].order_no
					+ '" class="parentTr page-' + k;
			if (j > 10)
				content += ' hideBlock "';

			content += '" >';
			content += '<td>' + list[i].order_no
					+ '</td><td class="centerValue">' + list[i].delivery_date
					+ '</td><td class="centerValue">' + list[i].order_status
					+ '</td><td>' + list[i].supplier_name + '('
					+ list[i].supplier_no + ')' + '</td><td class="">'
					+ list[i].order_type + '</td><td class="">'
					+ list[i].source + '</td><td class="numberColumn">'
					+ list[i].total_cartons
					+ '</td><td class="lastColumn numberColumn">'
					+ list[i].total_pallets + '</td></tr>';

			if (j % 10 == 0) {
				k++;
			}
			j++;

		}

		recordCount = list.length;
		var curPage = 1;
		if (recordCount > 10) {

			$('.paginationDivReady').pagination({
				items : recordCount,
				itemsOnPage : 10,
				cssStyle : 'compact-theme',
				currentPage : curPage,
				onPageClick : function(pageNo) {

					// closeAccordian();
					curPage = pageNo;
					var pageClass = 'page-' + pageNo;
					$('.parentTr').filter(function() {

						if ($(this).hasClass(pageClass)) {
							$(this).removeClass('hideBlock');
						} else {
							$(this).addClass('hideBlock');
						}
					});

				}

			});

			$(' .paginationDivReady').removeClass('hideBlock');

		} else {

			$(' .paginationDivReady').addClass('hideBlock');
		}

		$('.mainTableWrapper ').removeClass('hideBlock');
		$('.readyTableWrapper').removeClass('hideBlock');
		$('.readyTab').removeClass('hideBlock');
		$('#readyTable tbody').html('');
		$('#readyTable tbody').append(content);
	} else if (list.length == 0) {
		showError('No Data Found.', 'readyErrorMsgDiv');
	}
}

function formFullyReceivedContent(list) {

	var content = '';
	var k = 1;
	var j = 1;
	var recordCount = '';
	for ( var i = 0; i < list.length; i++) {

		list[i].order_no = (list[i].order_no != null && list[i].order_no != undefined) ? list[i].order_no
				: '';
		list[i].delivery_date = (list[i].delivery_date != null && list[i].delivery_date != undefined) ? list[i].delivery_date
				: '';
		list[i].order_status = (list[i].order_status != null && list[i].order_status != undefined) ? list[i].order_status
				: '';
		list[i].supplier_name = (list[i].supplier_name != null && list[i].supplier_name != undefined) ? list[i].supplier_name
				: '';
		list[i].supplier_no = (list[i].supplier_no != null && list[i].supplier_no != undefined) ? list[i].supplier_no
				: '';
		list[i].order_type = (list[i].order_type != null && list[i].order_type != undefined) ? list[i].order_type
				: '';
		list[i].source = (list[i].source != null && list[i].source != undefined) ? list[i].source
				: '';
		list[i].total_cartons = (list[i].total_cartons != null && list[i].total_cartons != undefined) ? list[i].total_cartons
				: '';
		list[i].total_pallets = (list[i].total_pallets != null && list[i].total_pallets != undefined) ? list[i].total_pallets
				: '';

		content += '<tr id="' + list[i].order_no + '" class="parentTr page-'
				+ k;
		if (j > 10)
			content += ' hideBlock "';

		content += '" >';
		content += '<td>' + list[i].order_no + '</td><td class="centerValue">'
				+ list[i].delivery_date + '</td><td class="centerValue">'
				+ list[i].order_status + '</td><td>' + list[i].supplier_name
				+ '(' + list[i].supplier_no + ')' + '</td><td class="">'
				+ list[i].order_type + '</td><td class="">' + list[i].source
				+ '</td><td class="numberColumn">' + list[i].total_cartons
				+ '</td><td class="lastColumn numberColumn">'
				+ list[i].total_pallets + '</td></tr>';

		if (j % 10 == 0) {
			k++;
		}
		j++;

	}

	recordCount = list.length;
	var curPage = 1;
	if (recordCount > 10) {

		$('.paginationDivFully').pagination({
			items : recordCount,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : curPage,
			onPageClick : function(pageNo) {

				// closeAccordian();
				curPage = pageNo;
				var pageClass = 'page-' + pageNo;
				$('.parentTr').filter(function() {

					if ($(this).hasClass(pageClass)) {
						$(this).removeClass('hideBlock');
					} else {
						$(this).addClass('hideBlock');
					}
				});

			}

		});

		$(' .paginationDivFully').removeClass('hideBlock');

	} else {

		$(' .paginationDivFully').addClass('hideBlock');
	}

	$('.mainTableWrapper ').removeClass('hideBlock');
	$('.fullyTableWrapper').removeClass('hideBlock');
	$('.fullyTab').removeClass('hideBlock');
	$('#fullyTable tbody').html('');
	$('#fullyTable tbody').append(content);
}

function formOpenContent(list) {
	var k = 1;
	var j = 1;
	var recordCount = '';
	var content = '';
	for ( var i = 0; i < list.length; i++) {

		list[i].order_no = (list[i].order_no != null && list[i].order_no != undefined) ? list[i].order_no
				: '';
		list[i].delivery_date = (list[i].delivery_date != null && list[i].delivery_date != undefined) ? list[i].delivery_date
				: '';
		list[i].order_status = (list[i].order_status != null && list[i].order_status != undefined) ? list[i].order_status
				: '';
		list[i].supplier_name = (list[i].supplier_name != null && list[i].supplier_name != undefined) ? list[i].supplier_name
				: '';
		list[i].supplier_no = (list[i].supplier_no != null && list[i].supplier_no != undefined) ? list[i].supplier_no
				: '';
		list[i].order_type = (list[i].order_type != null && list[i].order_type != undefined) ? list[i].order_type
				: '';
		list[i].source = (list[i].source != null && list[i].source != undefined) ? list[i].source
				: '';
		list[i].total_cartons = (list[i].total_cartons != null && list[i].total_cartons != undefined) ? list[i].total_cartons
				: '';
		list[i].total_pallets = (list[i].total_pallets != null && list[i].total_pallets != undefined) ? list[i].total_pallets
				: '';
		list[i].cut_off_time = (list[i].cut_off_time != null && list[i].cut_off_time != undefined) ? list[i].cut_off_time
				: '';

		content += '<tr id="' + list[i].order_no + '" class="parentTr page-'
				+ k;
		if (j > 10)
			content += ' hideBlock "';

		content += '" >';
		content += '<td>' + list[i].order_no + '</td><td class="centerValue">'
				+ list[i].delivery_date + '</td><td class="centerValue">'
				+ list[i].order_status + '</td><td>' + list[i].supplier_name
				+ '(' + list[i].supplier_no + ')' + '</td><td class="">'
				+ list[i].order_type + '</td><td class="">' + list[i].source
				+ '</td><td class="numberColumn">' + list[i].total_cartons
				+ '</td><td class="numberColumn">' + list[i].total_pallets
				+ '</td><td class="lastColumn centerValue">'
				+ list[i].cut_off_time + '</td></tr>';

		if (j % 10 == 0) {
			k++;
		}
		j++;

	}

	recordCount = list.length;
	var curPage = 1;
	if (recordCount > 10) {

		$('.paginationDivOpen').pagination({
			items : recordCount,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : curPage,
			onPageClick : function(pageNo) {

				// closeAccordian();
				curPage = pageNo;
				var pageClass = 'page-' + pageNo;
				$('.parentTr').filter(function() {

					if ($(this).hasClass(pageClass)) {
						$(this).removeClass('hideBlock');
					} else {
						$(this).addClass('hideBlock');
					}
				});

			}

		});

		$(' .paginationDivOpen').removeClass('hideBlock');

	} else {

		$(' .paginationDivOpen').addClass('hideBlock');
	}

	$('.mainTableWrapper ').removeClass('hideBlock');
	$('.openTableWrapper').removeClass('hideBlock');
	$('.openTab').removeClass('hideBlock');
	$('#openTable tbody').html('');
	$('#openTable tbody').append(content);

}

function formAllocationContent(list) {
	var content = '';
	for ( var i = 0; i < list.length; i++) {
		content += '<tr data-tt-id="'
				+ i
				+ '"><td></td><td>'
				+ list[i].onshow_date
				+ '</td><td>'
				+ list[i].allocation_no
				+ '</td><td>'
				+ list[i].allocation_desc
				+ '</td><td>'
				+ list[i].reason
				+ '</td><td class="lastColumn">'
				+ list[i].department_desc
				+ '('
				+ list[i].department_no
				+ ')'
				+ '<!--<a href="#" class="moreNumber">+2 more</a>--></td></tr>'
				+ '<tr data-tt-id="'
				+ (i + 1)
				+ '" data-tt-parent-id="'
				+ i
				+ '" class="noChild"><td colspan="6"><table class="secondaryTable" cellspacing="0" width="100%">'
				+ '<tr><th width="5%">Article #</th><th>Description</th><th width="20%">Department</th>'
				+ '<th class="centerValue" width="5%">Total Qty</th><th class="centerValue" width="10%">Allocation Status</th>'
				+ '<th class="centerValue " width="5%">Order #</th><th class="centerValue lastColumn" width="5%">Order Status</th>'
				+ '</tr><tr><td>' + list[i].article_no + '</td><td>'
				+ list[i].article_desc + '</td><td>' + list[i].department_desc
				+ '(' + list[i].department_no + ')'
				+ '</td><td class="centerValue">' + list[i].allocation_qty
				+ '</td><td class="centerValue">' + list[i].allocation_status
				+ '</td><td class="centerValue"><a class="navigate" href="#">'
				+ list[i].order_no
				+ '</a></td><td class="centerValue lastColumn">'
				+ list[i].order_status + '</td></tr></table></td></tr>';
	}
	$('.mainTableWrapper ').removeClass('hideBlock');
	$('.allocationTableWrapper').removeClass('hideBlock');
	$('.allocationTab').removeClass('hideBlock');
	$('#allocationTable tbody').html('');
	$('#allocationTable tbody').append(content);
}
function bindClickEventForTabs() {
	if ($(".tabs").hasClass('ui-tabs-anchor') || $(".tabs").hasClass('ui-tabs'))
		$(".tabs").tabs('destroy');
	$(".tabs").tabs();
	$('#listOfTabs li').unbind('click');
	$('#listOfTabs li ').click(function() {
		var tabCode = (this.id).split('-')[0].trim();
		var lookupCode = (this.id).split('-')[1].trim();
		var divId = $(this).find('a').attr('href');
		if ($(divId + ' table tbody tr').length == 0)
			getOrderEnquiryResultsBasedOnTabCode(tabCode, lookupCode);

	});
}
function showError(msg, id) {
	$('#' + id).removeClass('hideBlock');
	$('#' + id).addClass('errorDiv').find('.errorMsg').text(msg);
}
function hideError(id) {
	$('#' + id).addClass('hideBlock');
}