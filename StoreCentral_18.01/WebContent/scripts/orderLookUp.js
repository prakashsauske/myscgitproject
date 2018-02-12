$(function() {
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
	
	$( "#dialog-tableSettings" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 600
	});
	
	$( "#dialog-savedSearch" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 500
	});
	// popup for saved searches	
	$("#dialog-savedSearch").parent().addClass("popupWrapper");			
		
	$( "#savedSearch" ).click(function() {
		$("#dialog-savedSearch").parent().addClass("popupWrapper");			
		$( "#dialog-savedSearch" ).dialog( "open" );				
	});

	
	$( "#dialog-saveSearch" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 120,
		maxHeight: 600,
		width: 350
	});
	// popup for save new search	
	$("#dialog-saveSearch").parent().addClass("popupWrapper");			
		
	$( "#saveSearch" ).click(function() {
		$("#dialog-saveSearch").parent().addClass("popupWrapper");			
		$( "#dialog-saveSearch" ).dialog( "open" );				
	});
	
	
	$("#dialog-siteSearchPop").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 750
	});
	$("#dialog-siteSearchPop").parent().addClass(
			"popupWrapper");
	$( "#dialog-hierarchy" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 800
	});
	$("#dialog-modal").parent().addClass("popupWrapper");
	
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	$( "#deptHie" ).click(function() {
		$("#dialog-hierarchy").parent().addClass("popupWrapper");			
		$( "#dialog-hierarchy" ).dialog( "open" );				
	});

	$(".inputDate").datepicker({
		zIndex : 50
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

	$('.textbox').focus(function() {
		if ($(this).val() == $(this).attr('defaultVal')) {
			$(this).val('');
			$(this).removeClass("textboxDefaultText");
		}
	});
	$("#verifySupplier")
	.click(
			function() {

				var radioSelected = getRadioValue('sourceSupply');
				if (radioSelected == "vendor"
						|| radioSelected == "warehouse"
						|| radioSelected == "store") {
					var vendorNo = $('#supplier')
							.val().split("-")[0];
					var vendorName = $('#supplier')
							.val().split("-")[1];
					var sourceSupply = $(
							'input:radio[name=sourceSupply]:checked')
							.val();
					if (sourceSupply == 'store') {

						nearbyStore(vendorNo,
								vendorName,
								sourceSupply);
					}

					else if (($('#supplier').val() != '' && $(
							'#supplier').val() != 'Enter supplier no. or name')) {
						$
								.ajax({
									type : "GET",
									url : "autocomplete.htm",
									beforeSend : function() {

										$(
												'#statusImg')
												.removeClass(
														'loading hideBlock');
										$(
												'#statusImg')
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
											$(
													'#okBtn')
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
										$(
												'#statusImg')
												.addClass(
														'loading hideBlock');
										$(
												'#statusImg')
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

var click = true;
$('#vendor').click(function() {
if (click) {
	$('#supplier').val('');
	click = false;
}
});
$('#warehouse').click(function() {
if (click == false) {
	$('#supplier').val('');
	click = true;
}
});
if ($('#retain-radioBtnArtType').val() == 'number') {
$('#number').click();
retainValues();
/*
 * if($('#retain-dropdownStatus')!="" ||
 * $('#retain-fromDate')!="" ||
 * $('#retain-rosterFromDate')!="" ||
 * $('#retain-supplierNo')!="")
 * $('#advLink1').click();
 */
$('#fromDate').val($('#retain-fromDate').val());
$('#toDate').val($('#retain-toDate').val());
clear();
}
if ($('#retain-radioBtnArtType').val() == 'PReq') {
$('#PReq').click();
retainValues();

$('#fromDate').val($('#retain-fromDate').val());
$('#toDate').val($('#retain-toDate').val());
clear();
} else if ($('#retain-radioBtnArtType').val() == 'type') {
$('#type').click();
$("#typeInputs").removeClass('hideBlock');
$("#numberInputs").addClass('hideBlock');
if ($('#retain-paramRetain').val() == 'true') {
	$('#deliveryFromDate').val(
			$('#retain-fromDate').val());
	$('#fromDate').val('');
	$('#toDate').val('');
} else {
	$('#fromDate').val($('#retain-fromDate').val());
	$('#toDate').val($('#retain-toDate').val());
}
retainValues();
clear();
} else if ($('#retain-radioBtnArtType').val() == 'refNumber') {
$('#refNumber').click();
retainValues();
$('#fromDate').val($('#retain-fromDate').val());
$('#toDate').val($('#retain-toDate').val());
clear();
}
	$('.textbox').blur(function() {
		if ($(this).val() == '') {
			$(this).val($(this).attr('defaultVal'));
			$(this).addClass("textboxDefaultText");
		}
	});

	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$('.goButton').click();
		}
	});
	// popup for customize columns	
	
	
	$( ".tableSettings" ).click(function() {
		
	loadPreferenceSettings();
		
		
	});
	if($('#userList').val()!=undefined && $('#userList').val()!=null && $('#userList').val()!=''){
	var userList=$.parseJSON($('#userList').val());
	if(userList.userList.length>0){
	
	$.each(userList.userList,function(i,item){
			$('th.'+item.lableId+',td.'+item.lableId).addClass('hideBlock');
		});
	}
	}
	function loadPreferenceSettings(){
		$.ajax({
			type : "get",
			url : "getPreferenceDetails.htm",
			data : "",
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				iterateResult(response);
				stopLoading();
			},
			error : function() {
				// goToLogin();
			},
		});
	}
	
	function updatePreferenceSettings(value){
		$.ajax({
			type : "get",
			url : "updatePreferenceDetails.htm",
			data : {unselectedVal:value},
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				
			if(response!=undefined && response!='')
			$('.settingsMsg').removeClass('popupError').removeClass('popupWarning').addClass('popupWarning').text(response);
			else
			$('.settingsMsg').removeClass('popupError').removeClass('popupWarning').addClass('popupError').text('UpdateFailed.');
			
			var masterList=$.parseJSON($('#masterList').val());
			if(masterList.masterList.length>0){
			
			$.each(masterList.masterList,function(i,item){
					$('th.'+item.lableId+',td.'+item.lableId).removeClass('hideBlock');
				});
			}
			if(value.trim()!='' && value.split(':').length>0){
			for(var i=0;i<value.split(':').length;i++){
				$('th.'+value.split(':')[i].split('-')[0]+',td.'+value.split(':')[i].split('-')[0]).addClass('hideBlock');
				}
			}
			
			stopLoading();
			calculateScrollWindow();
			},
			error : function() {
				// goToLogin();
			},
		});
	}
	
	$('.applyColumnStng').click(function(){
		
		var value='';
		$('#dialog-tableSettings .ContentTable input:not(:checked)').filter(function(){if(value=='')value=$(this).val(); else value+=':'+$(this).val();});
		console.log(value);
		
		updatePreferenceSettings(value);
		
	});
	function iterateResult(response){
		
		var output = $.parseJSON(response);
		var content='';
		if (output.msg != null && output.msg.length > 0) {
			content=output.msg;
			$('#dialog-tableSettings .ContentTable').html('');
			$('.settingsMsg').removeClass('popupError').removeClass('popupWarning').addClass('popupError').text(content);
			$('.applyColumnStng,.cancelColumnStng,#dialog-tableSettings .ContentTableWrapper,#dialog-tableSettings .alertText').addClass('hideBlock');
		} else if (output.masterList!= null && output.masterList.length > 0) {
			var descList = output.masterList;
			content='<tr><th>Default</th><th class="lastColumn">Allocation</th></tr>';
			var rows='';
			var def=new Array();
			var all=new Array();
			var j=0,k=0;
			$.each(descList, function(i, item) {
				if(item.orderType=='DEF')
				{
					def[j]='<td><input type="checkbox" checked="checked" name="defaultList" class="'+item.lableId+'" value="'+item.lableId+'-'+item.orderType+'" id="'+item.lableId+'"><label for="'+item.lableId+'">'+item.lableDesc+'</label></td>';
					j++;
				}
				if(item.orderType=='ALOC')
				{
					all[k]='<td><input type="checkbox" checked="checked" name="defaultList" class="'+item.lableId+'" value="'+item.lableId+'-'+item.orderType+'" id="'+item.lableId+'"><label for="'+item.lableId+'">'+item.lableDesc+'</label></td>';
					k++;
				}
			});
			if(def.length>all.length)
				j=def.length;
			else 
				j=all.length;
			for(k=0;k<j;k++){
				rows+='<tr>';
				if(k<def.length)
					rows+=def[k];
				else
					rows+='<td></td>';
				if(k<all.length)
					rows+=all[k];
				else
					rows+='<td></td>';
				
				rows+='</tr>';
			}
			if(rows!=''){
				content+=rows;
			}
			//console.log(content);
			if (output.userList!= null && output.userList.length > 0) {
				uncheckItems(output.userList);
			}
			$('#dialog-tableSettings .ContentTable').html('');
			$('#dialog-tableSettings .ContentTable').html(content);
			$('.applyColumnStng,.cancelColumnStng,#dialog-tableSettings .ContentTableWrapper,#dialog-tableSettings .alertText').removeClass('hideBlock');
		}
		stopLoading();
		
		
		$('.settingsMsg').removeClass('popupError').removeClass('popupWarning').text('');
		$("#dialog-tableSettings").parent().addClass("popupWrapper");	
		//console.log(content);
		if (output.userList!= null && output.userList.length > 0) {
			uncheckItems(output.userList);
		}
		$( "#dialog-tableSettings" ).dialog( "open" );	
		

}
	$('.cancelColumnStng').click(function(){
	$( "#dialog-tableSettings" ).dialog( "close" );
	});
	function uncheckItems(userList){
		$.each(userList,function(i,item){
			$('.'+item.lableId).removeAttr('checked');
		});
	}
	function startLoading(){
		$('#statusImg')
		.removeClass(
				'loading hideBlock');
$('#statusImg')
		.addClass(
				'loading');
	}
	function stopLoading(){
		$('#statusImg')
		.addClass(
				'loading hideBlock');
$('#statusImg')
		.removeClass(
				'loading');
	}
	$("#samplePopupTest").click(
			function() {
				$("#dialog-modal").parent().addClass(
						"popupWrapper");
				$("#dialog-modal").dialog("open");
			});
	setTimeout(function() {
		$('#orderNo').focus();
	}, 300);
	

	calculateScrollWindow();

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$(".sortTable").tablesort();
	// added
	$("#All").click(function() {
		$('#supplier').val('');
		$("#supplier").attr('readonly', 'readonly');
	});

	$("#warehouse,#vendor").click(function() {
		// $('#supplier').val('');
		$("#supplier").removeAttr('readonly');
	});

	$('#orderType')
			.change(
					function() {
						if ($('#orderType').val() == 'ZUB'
								|| $('#orderType').val() == 'ZUBIN'
								|| $('#orderType').val() == 'ZUBOUT') {
							$('#supplier').val('');
							$('#vendorText').text('Store');
							$('#vendor').val('store');
						} else {
							$('#vendorText').text('Vendor');
							$('#vendor').val('vendor');
						}
						if ($('#orderType').val() == 'ZNB')
						$('#vendor').click();
						else if($('#orderType').val() == 'WOD')
							$('#warehouse').click();
						else
							$('#All').click();
						
						if($('#orderType').val() != 'ALC'){
							$('.allocation').addClass('hideBlock');
							$('.normal').removeClass('hideBlock');
						}else{
							$('.allocation').removeClass('hideBlock');
							$('.normal').addClass('hideBlock');
						}
					
					});

	var recordCount = $('#listCount').val();
	var currentPage = $('#pageNumber').val();

	$('#paginationDiv1').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getArticlesForPage(pageNumber);

		}

	});

	$('#paginationDiv2').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getArticlesForPage(pageNumber);

		}

	});
	deptFlag = "Null";
	var nodeDesc = 0;
	$('.department')
			.on(
					'click',
					function() {
						
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

						if (deptFlag != selectedValue) {
							var deptHierarchyId = parseInt($(selectedValueId)
									.attr('data-tt-id'));
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

						}

						/*----------------******  End Department Click function   *****--------------- */

						

						/*
						 * if($('#paramRetain').val()=="true"){
						 * $('#deliveryFromDate').val($('#fromDate').val());
						 * $('#fromDate').val(''); $('#toDate').val('');
						 * $('#type').click();
						 * $("#typeInputs").removeClass('hideBlock');
						 * $("#numberInputs").addClass('hideBlock'); }
						 */
						function nearbyStore(vendorNo, vendorName, srcOfSupply) {
							$('#validMsg').text('');
							var vendorDesc = vendorNo;
							var vendorName = vendorName;
							var sourceSupply = srcOfSupply;
							// $('input:radio[name=ibtSiteType]:checked').val();
							if (vendorDesc == '') {
								$('#siteError').text('');
								$("#dialog-siteSearchPop").dialog("open");
								$("#resSize").val('20');
								$("#distance").val('25');
								$("#popupData3").html('');

							} else if (vendorDesc != '') {
								$
										.ajax({
											type : "GET",
											url : "storeNoValidation.htm",
											beforeSend : function() {
												$('#statusImg').removeClass(
														'loading hideBlock');
												$('#statusImg').addClass(
														'loading');
											},
											data : "vendorDesc=" + vendorDesc
													+ "&ibtSiteType="
													+ sourceSupply
													+ "&vendorName="
													+ vendorName,
											success : function(response) {
												$('#statusImg').addClass(
														'loading hideBlock');
												$('#statusImg').removeClass(
														'loading');
												var responseData = response
														.split("-");
												if (responseData[0] == 'true') {
													$('#supplier')
															.val(
																	responseData[1]
																			+ "-"
																			+ responseData[2]);
												} else if (responseData[0] == 'multiple') {
													var distance = 10;
													var maxResults = 20;
													var salesOrg = $(
															"#userSalesOrg")
															.val();
													$
															.ajax({
																type : "GET",
																url : "nearByStoreValidation.htm",
																beforeSend : function() {
																	$(
																			'#statusImg')
																			.removeClass(
																					'loading hideBlock');
																	$(
																			'#statusImg')
																			.addClass(
																					'loading');
																},
																data : "distance="
																		+ distance
																		+ "&maxResults="
																		+ maxResults
																		+ "&salesOrg="
																		+ salesOrg,
																success : function(
																		response) {
																	$(
																			'#statusImg')
																			.addClass(
																					'loading hideBlock');
																	$(
																			'#statusImg')
																			.removeClass(
																					'loading');
																	$(
																			'#siteError')
																			.text(
																					'');
																	$(
																			"#dialog-siteSearchPop")
																			.dialog(
																					"open");
																	$(
																			"#resSize")
																			.val(
																					'20');
																	$(
																			"#distance")
																			.val(
																					'25');
																	$(
																			"#popupData3")
																			.html(
																					'');
																	$(
																			"#popupData3")
																			.html(
																					response);

																},
																error : function(
																		data) {
																	$(
																			'#validMsg')
																			.text(
																					"Some problem in with service call");
																	$(
																			'#statusImg')
																			.addClass(
																					'loading hideBlock');
																	$(
																			'#statusImg')
																			.removeClass(
																					'loading');
																}
															});
												} else {
													$('#alertBox').text(
															'Invalid store');
													$("#dialog-modal").dialog(
															"open");
													$('#okBtn')
															.click(
																	function(e) {
																		$(
																				"#dialog-modal")
																				.dialog(
																						"close");
																	});
													;
												}
											},
											error : function(data) {
												$('#validMsg')
														.text(
																"Some problem in with service call");
												$('#statusImg').addClass(
														'loading hideBlock');
												$('#statusImg').removeClass(
														'loading');
											}
										});
							}

						}
						$("#vendorbtn")
								.click(
										function() {

											$('#siteError').text('');
											$('#popupData3').html('');
											/*
											 * if(($( "#distance").val() == "") &&
											 * $.trim($("#distance").val()).length ==
											 * 0){ $('.siteError').html('Please
											 * enter the distance');
											 * $('#distance').focus();
											 * $('#siteDet').html(''); }else
											 * if(($( "#resSize").val() == "") &&
											 * $.trim($("#resSize").val()).length ==
											 * 0){ $('.siteError').html('Please
											 * enter the result size');
											 * $('#resSize').focus();
											 * $('#siteDet').html(''); } else
											 * if($('.ui-multiselect
											 * span').text()=="Select options") {
											 * $('.siteError').html('Please
											 * select the sales org');
											 * $('#siteDet').html(''); } else
											 */{

												var distance = $("#distance")
														.val();
												var resSize = $("#resSize")
														.val();
												var optionsList = $(
														"#selectHeight").val();
												;

												$
														.ajax({
															type : "GET",
															url : "siteSearch.htm",
															data : "distance="
																	+ distance
																	+ "&resSize="
																	+ resSize
																	+ "&optionsList="
																	+ optionsList,
															success : function(
																	response) {

																$("#popupData3")
																		.html(
																				response);

															},
														});
											}
										});




						/*
						 * $('#vendor').click(function(){ var
						 * sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
						 * if(sourceSupply=='vendor'){ $('#supplier').val(''); }
						 * }); $('#warehouse').click(function(){ var
						 * sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
						 * if(sourceSupply=='vendor'){ $('#supplier').val(''); }
						 * });
						 */

						
						/*$(selector).pagination({
							items : 100,
							itemsOnPage : 10,
							cssStyle : 'compact-theme'
						});*/

					});

	//<!-- shows advanced search box when advanced search link is clicked-->
	$("#advLink1")
			.click(
					function() {
						$('#errorMsg').text('');
						var scroll = $(window).scrollTop();

	//					var lookupHeight = $('#lookupContainer').height();

						document.getElementById("advWrapper").style.marginTop = '60px';
						document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");

//						var lookupBgheight = $("#advDiv").outerHeight() + 20
	//							+ "px";
						$("#advWrapper").css("height", "265px");

						$("#advDiv").removeClass('advancedParam hideBlock');
						$("#advDiv").addClass('advancedParam');

						$("#advWrapper").removeClass(
								'advancedSearchFormatWrapper hideBlock');
						$("#advWrapper")
								.addClass('advancedSearchFormatWrapper');

						$("#closeLink").removeClass('linkBtn hideBlock');
						$("#closeLink").addClass('linkBtn');

						$("#advLink1").hide();
						$("#value").val("");

					});

	//<!-- closes advanced search when close is clicked -->
	$("#closeLink").click(function() {
		$('#errorMsg').text('');
		closeAdvSearchClasses();
	});

	//<!-- closes advanced search box when windowed are scrolled unless in popup menu -->
	$(window)
			.scroll(
					function() {
						if ($('#dialog-modal').dialog("isOpen") == true) {
							var scroll = $(window).scrollTop();
							var lookupHeight = $('#lookupContainer').height();
							document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
							document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
						} else {
							closeAdvSearchClasses();
						}
					});

	//<!-- closes advanced search box when cotent out side of the box is clicked -->
	$('.mainWrapper').click(function() {
		closeAdvSearchClasses();
	});

	//<!-- disable close box function when lookup box is clicked -->
	$('#lookupContainer').click(function(event) {
		event.stopPropagation();
	});

	//<!-- disable close box function when lookup box is clicked -->
	$('.popupWrapper').click(function(event) {
		event.stopPropagation();
	});

	//$(".secondaryActionBtn").click(function(e) {
		//window.history.back();
	//});

	$('#PReq').click(function() {
		$("#numberInputs").removeClass('hideBlock');
		$("#typeInputs").addClass('hideBlock');
	});

	$('#number').click(function() {

		$('#orderType').val('0');
		$('#deliveryFromDate').val('');
		setTimeout(function() {
			$('#orderNo').focus();
		}, 200);
	});
	$('#PReq').click(function() {

		$('#orderType').val('0');
		$('#deliveryFromDate').val('');
		setTimeout(function() {
			$('#orderNo').focus();
		}, 200);
	});

	$('#type').click(function() {

		$('#orderNo').val('');

	});

	

	

	$("#goButtonSample1")
			.click(
					function() {

						var vendorNo = $('#vendorDesc')
								.val().split("-")[0];
						var vendorName = $('#vendorDesc')
								.val().split("-")[1];
						// var
						// vendorDesc=$('#vendorDesc').val();
						var sourceSupply = $(
								'input:radio[name=sourceSupply]:checked')
								.val();

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
									// data : "vendorDesc="
									// + vendorDesc +
									// "&sourceSupply="+sourceSupply
									// ,
									// data : "vendorNo=" +
									// vendorNo +
									// "&sourceSupply="+sourceSupply
									// +
									// "&vendorName="+vendorName
									// ,
									data : {
										vendorNo : vendorNo,
										sourceSupply : sourceSupply,
										vendorName : vendorName
									},
									success : function(
											response) {
										$('#popupDataDiv')
												.html(
														response);
										$('#statusImg')
												.addClass(
														'loading hideBlock');
										$('#statusImg')
												.removeClass(
														'loading');
									},
								});

					}

			);



	$(".goButton")
	.click(
			function() {
				$('#resultContent').text('');
				if ($('#advDiv').css('display') == 'block') {
					$('#advanceFlag').val('true');
				} else if ($('#advDiv').css(
						'display') == 'none') {
					$('#advanceFlag').val('false');
				}
				var sourceSupply = $(
						'input:radio[name=sourceSupply]:checked')
						.val();
				var flag = true;
				var flag1 = true;
				var flag2 = true;
				var flag3 = true;
				var flag4 = true;
				if (sourceSupply == 'warehouse') {
					$('#wareHouseFlag').val('Y');
					if ($('#vendor').val() == 'vendor') {
						$('#storeOrVendor').val(
								'Vendor');
					} else if ($('#vendor').val() == 'store') {
						$('#storeOrVendor').val(
								'Store');
					}

					sourceSupply = '2';
				} else if (sourceSupply == 'vendor')

				{
					$('#wareHouseFlag').val('N');
					$('#storeOrVendor').val(
							'Vendor');
					sourceSupply = '1';
				} else if (sourceSupply == 'store') {
					// $('#storeCheck').val('true');
					$('#wareHouseFlag').val('N');
					sourceSupply = '2';
					$('#storeOrVendor')
							.val('Store');
				} else if (sourceSupply == 'all') {
					if ($('#vendor').val() == 'vendor') {
						$('#storeOrVendor').val(
								'Vendor');
					} else if ($('#vendor').val() == 'store') {
						$('#storeOrVendor').val(
								'Store');
					}
				}
				$('#dropdown').val(sourceSupply);
				var vendorDesc = $('#supplier')
						.val().split('-')[0];
				$('#suppNo').val(vendorDesc);
				$('#suppName').val(
						$('#supplier').val().split(
								'-')[1]);

				if ($('#fromDate').val() != ''
						&& $('#fromDate').val() != 'dd/mm/yyyy') {
					if (validateDate($('#fromDate')
							.val(), 'fromDate',
							'delivery')) {
						flag = true;
					} else {
						flag = false;
					}
				}
				if ($('#deliveryFromDate').val() != ''
						&& $('#deliveryFromDate')
								.val() != 'dd/mm/yyyy') {
					if (validateDate($(
							'#deliveryFromDate')
							.val(),
							'deliveryFromDate',
							'delivery')) {
						flag2 = true;
					} else {
						flag2 = false;
					}
				}

				if ($('#toDate').val() != ''
						&& $('#toDate').val() != 'dd/mm/yyyy') {
					if (validateDate($('#toDate')
							.val(), 'toDate',
							'delivery')) {
						flag = true;
					} else {
						flag = false;
					}
				}

				if ($('#fromDate').val() != ''
						&& $('#fromDate').val() != 'dd/mm/yyyy'
						&& $('#toDate').val() != ''
						&& $('#toDate').val() != 'dd/mm/yyyy') {
					if (validateDate1(
							$('#fromDate').val(),
							$('#toDate').val(),
							'fromDate', 'toDate',
							'delivery')) {
						flag = true;
					} else {
						flag = false;
					}
				}
				// ($('#deliveryFromDate').val()!=''
				// &&
				// $('#deliveryFromDate').val()!='dd/mm/yyyy')
				// &&
				if (($('#fromDate').val() == '' || $(
						'#fromDate').val() == 'dd/mm/yyyy')
						&& $('#toDate').val() != ''
						&& $('#toDate').val() != 'dd/mm/yyyy') {
					if (validateDate1(
							$('#fromDate').val(),
							$('#toDate').val(),
							'fromDate', 'toDate',
							'delivery')) {
						flag = true;
					} else {
						flag = false;
					}
				}
				/*
				 * if(($('#fromDate').val()!='' &&
				 * $('#fromDate').val()!='dd/mm/yyyy') &&
				 * ($('#toDate').val()=='' ||
				 * $('#toDate').val()=='dd/mm/yyyy')) {
				 * $('#alertBox').text('Please enter
				 * a delivery to date'); $(
				 * "#dialog-modal1" ).dialog( "open" );
				 * $('#okBtn').click(function(e){ $(
				 * "#dialog-modal1" ).dialog(
				 * "close" ); $("#toDate").focus();
				 * }); flag=false; }
				 */
				// &&
				// ($('#deliveryFromDate').val()==''
				// ||
				// $('#deliveryFromDate').val()=='dd/mm/yyyy')
				if ((($('#fromDate').val() == '' || $(
						'#fromDate').val() == 'dd/mm/yyyy'))
						&& ($('#toDate').val() != '' && $(
								'#toDate').val() != 'dd/mm/yyyy')) {
					$('#alertBox')
							.text(
									'Please enter a delivery from date');
					$("#dialog-modal1").dialog(
							"open");
					$('#okBtn')
							.click(
									function(e) {
										$(
												"#dialog-modal1")
												.dialog(
														"close");
										$(
												"#fromDate")
												.focus();
									});
					flag = false;
				}

				/*
				 * if($('#rosterToDate').val()!=''&&$('#rosterToDate').val()!='dd/mm/yyyy') {
				 * if(checkTodayDate($('#rosterToDate').val(),'rosterToDate','roster')) {
				 * flag3=true; } else{ flag3=false; } }
				 */

				if ($('#rosterFromDate').val() != ''
						&& $('#rosterFromDate')
								.val() != 'dd/mm/yyyy') {
					if (validateDate($(
							'#rosterFromDate')
							.val(),
							'rosterFromDate',
							'roster')) {
						flag1 = true;
					} else {
						flag1 = false;
					}
				}
				if ($('#rosterToDate').val() != ''
						&& $('#rosterToDate').val() != 'dd/mm/yyyy') {
					if (validateDate($(
							'#rosterToDate').val(),
							'rosterToDate',
							'roster')) {
						flag1 = true;
					} else {
						flag1 = false;
					}
				}
				/*
				 * if($('#rosterFromDate').val()!=''&&$('#rosterFromDate').val()!='dd/mm/yyyy') {
				 * if(checkTodayDate($('#rosterFromDate').val(),'rosterFromDate','roster')) {
				 * flag4=true; } else{ flag4=false; } }
				 */

				if ($('#rosterFromDate').val() != ''
						&& $('#rosterFromDate')
								.val() != 'dd/mm/yyyy'
						&& $('#rosterToDate').val() != ''
						&& $('#rosterToDate').val() != 'dd/mm/yyyy') {
					if (validateDateRoster($(
							'#rosterFromDate')
							.val(), $(
							'#rosterToDate').val(),
							'rosterFromDate',
							'rosterToDate',
							'roster')) {
						flag1 = true;
					} else {
						flag1 = false;
					}
				}

				/*
				 * if($('#rosterFromDate').val()!='' &&
				 * $('#rosterFromDate').val()!='dd/mm/yyyy'&&
				 * ($('#rosterToDate').val()=='' ||
				 * $('#rosterToDate').val()=='dd/mm/yyyy')) {
				 * $('#alertBox').text('Please enter
				 * a roster to date'); $(
				 * "#dialog-modal1" ).dialog( "open" );
				 * $('#okBtn').click(function(e){ $(
				 * "#dialog-modal1" ).dialog(
				 * "close" );
				 * $("#rosterToDate").focus(); });
				 * flag=false; }
				 */
				if (($('#rosterFromDate').val() == '' || $(
						'#rosterFromDate').val() == 'dd/mm/yyyy')
						&& $('#rosterToDate').val() != ''
						&& $('#rosterToDate').val() != 'dd/mm/yyyy') {
					$('#alertBox')
							.text(
									'Please enter a roster from date');
					$("#dialog-modal1").dialog(
							"open");
					$('#okBtn')
							.click(
									function(e) {
										$(
												"#dialog-modal1")
												.dialog(
														"close");
										$(
												"#rosterFromDate")
												.focus();
									});
					flag1 = false;
				}
				if ($('#fromDate').val() != ''
						|| $('#fromDate').val() != 'dd/mm/yyyy') {

					var fromDate = formateDate($(
							"#fromDate").val());
					var currentDate = new Date();
					var splittedFromDate = fromDate
							.split('/');
					var actualFromDate = new Date();
					var monthFrom = splittedFromDate[1] - 1;
					actualFromDate.setFullYear(
							splittedFromDate[2],
							monthFrom,
							splittedFromDate[0]);

					var toDate = formateDate($(
							'#toDate').val());
					var splittedToDate = toDate
							.split('/');
					var temp=true;
					
					if (toDate != ''
							&& toDate != 'dd/mm/yyyy'
							&& ((splittedToDate[0] > 31
									|| splittedToDate[1] > 12 || splittedToDate[2] > 9999) || (splittedToDate.length != 8 && splittedToDate.length != 6))) {
						temp = false;
					} else {
						var rosDate = formateDate($(
								"#fromDate").val());
						var splittedRosDate = rosDate
								.split('/');
						var actualRosDate = new Date();
						var month1 = splittedRosDate[1] - 1;
						actualRosDate.setFullYear(
								splittedRosDate[2],
								month1,
								splittedRosDate[0]);
						var splittedOne = splittedRosDate[0]
								+ splittedRosDate[1]
								+ splittedRosDate[2];

						if ((splittedRosDate[0] > 31
								|| splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
								|| (splittedOne.length != 8 && splittedOne.length != 6)) {
							/*
							 * $('#alertBox').text('Please
							 * enter a valid date'); $(
							 * "#dialog-modal1"
							 * ).dialog( "open" );
							 * $('#okBtn').click(function(e){ $(
							 * "#dialog-modal1"
							 * ).dialog( "close" );
							 * 
							 * $("#fromDate").focus();
							 * });
							 */
							temp = false;

						}

						else {
							if (currentDate
									.getTime() > actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(currentDate
												.getTime() + (2592000000));
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#toDate").val(
										newDelDate);
							} else if (currentDate
									.getTime() <= actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(actualFromDate
												.getTime() + (2592000000));
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#toDate").val(
										newDelDate);
							}
						}

					}
				}
				if ($('#deliveryFromDate').val() != ''
						|| $('#deliveryFromDate')
								.val() != 'dd/mm/yyyy') {

					var fromDate = formateDate($(
							"#deliveryFromDate")
							.val());
					var currentDate = new Date();
					var splittedFromDate = fromDate
							.split('/');
					var actualFromDate = new Date();
					var monthFrom = splittedFromDate[1] - 1;
					actualFromDate.setFullYear(
							splittedFromDate[2],
							monthFrom,
							splittedFromDate[0]);

					var toDate = formateDate($(
							'#deliveryToDate')
							.val());
					var splittedToDate = toDate
							.split('/');
					var temp;
					temp = true;
					if (toDate != ''
							&& toDate != 'dd/mm/yyyy'
							&& ((splittedToDate[0] > 31
									|| splittedToDate[1] > 12 || splittedToDate[2] > 9999) || (splittedToDate.length != 8 && splittedToDate.length != 6))) {
						temp = false;
					} else {
						var rosDate = formateDate($(
								"#deliveryFromDate")
								.val());
						var splittedRosDate = rosDate
								.split('/');
						var actualRosDate = new Date();
						var month1 = splittedRosDate[1] - 1;
						actualRosDate.setFullYear(
								splittedRosDate[2],
								month1,
								splittedRosDate[0]);
						var splittedOne = splittedRosDate[0]
								+ splittedRosDate[1]
								+ splittedRosDate[2];

						if ((splittedRosDate[0] > 31
								|| splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
								|| (splittedOne.length != 8 && splittedOne.length != 6)) {
							/*
							 * $('#alertBox').text('Please
							 * enter a valid date'); $(
							 * "#dialog-modal1"
							 * ).dialog( "open" );
							 * $('#okBtn').click(function(e){ $(
							 * "#dialog-modal1"
							 * ).dialog( "close" );
							 * 
							 * $("#fromDate").focus();
							 * });
							 */
							temp = false;

						}

						else {
							if (currentDate
									.getTime() > actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(currentDate
												.getTime() + (2592000000));
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#deliveryToDate")
										.val(
												newDelDate);
							} else if (currentDate
									.getTime() <= actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(actualFromDate
												.getTime() + (2592000000));
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#deliveryToDate")
										.val(
												newDelDate);
							}
						}

					}
				}
				if ($("#rosterFromDate").val() != ''
						&& $("#rosterFromDate")
								.val() != 'dd/mm/yyyy') {

					var fromDate = formateDate($(
							"#rosterFromDate")
							.val());
					var currentDate = new Date();
					var splittedFromDate = fromDate
							.split('/');
					var actualFromDate = new Date();
					var monthFrom = splittedFromDate[1] - 1;
					actualFromDate.setFullYear(
							splittedFromDate[2],
							monthFrom,
							splittedFromDate[0]);

					var toDate = formateDate($(
							'#rosterToDate').val());
					var splittedToDate = toDate
							.split('/');
					var temp = true;
					
					if (toDate != ''
							&& toDate != 'dd/mm/yyyy'
							&& ((splittedToDate[0] > 31
									|| splittedToDate[1] > 12 || splittedToDate[2] > 9999) || (splittedToDate.length != 8 && splittedToDate.length != 6))) {

						temp = false;

					}

					else {

						var rosDate = formateDate($(
								"#rosterFromDate")
								.val());
						var splittedRosDate = rosDate
								.split('/');
						var actualRosDate = new Date();
						var month1 = splittedRosDate[1] - 1;
						actualRosDate.setFullYear(
								splittedRosDate[2],
								month1,
								splittedRosDate[0]);
						var splittedOne = splittedRosDate[0]
								+ splittedRosDate[1]
								+ splittedRosDate[2];

						if ((splittedRosDate[0] > 31
								|| splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
								|| (splittedOne.length != 8 && splittedOne.length != 6)) {
							/*
							 * $('#alertBox').text('Please
							 * enter a valid date'); $(
							 * "#dialog-modal1"
							 * ).dialog( "open" );
							 * $('#okBtn').click(function(e){ $(
							 * "#dialog-modal1"
							 * ).dialog( "close" );
							 * 
							 * $("#rosterFromDate").focus();
							 * });
							 */

						}

						else {
							if (currentDate
									.getTime() > actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(currentDate
												.getTime() + (2592000000));
								// date1.setTime(currentDate.getTime());
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#rosterToDate")
										.val(
												newDelDate);

							} else if (currentDate
									.getTime() <= actualFromDate
									.getTime()) {
								var date1 = new Date();
								date1
										.setTime(actualFromDate
												.getTime() + (2592000000));
								// date1.setTime(actualFromDate.getTime());
								month3 = (date1
										.getMonth() + 1) < 10 ? "0"
										+ (date1
												.getMonth() + 1)
										: (date1
												.getMonth() + 1);
								var newDate = date1
										.getDate() < 10 ? "0"
										+ date1
												.getDate()
										: date1
												.getDate();
								var newDelDate = newDate
										+ "/"
										+ month3
										+ "/"
										+ date1
												.getFullYear();
								$("#rosterToDate")
										.val(
												newDelDate);
							}
						}

					}

				}

				// if(flag && flag1 && flag2 &&
				// (((($('#deliveryFromDate').val()!=''
				// &&
				// $('#deliveryFromDate').val()!='dd/mm/yyyy')
				// &&
				// ($('#deliveryToDate').val()!=''
				// &&
				// $('#deliveryToDate').val()!='dd/mm/yyyy'))
				// || (($('#fromDate').val()!='' &&
				// $('#fromDate').val()!='dd/mm/yyyy')
				// && ($('#toDate').val()!='' &&
				// $('#toDate').val()!='dd/mm/yyyy'))
				// || $('#orderNo').val()!=''))){
				// if(flag && flag1 && flag2 &&
				// ((($('#rosterFromDate').val()!=''
				// &&
				// $('#rosterFromDate').val()!='dd/mm/yyyy'
				// )&& ($('#rosterToDate').val()!=''
				// &&
				// $('#rosterToDate').val()!='dd/mm/yyyy')
				// ||
				// (($('#deliveryFromDate').val()!=''
				// &&
				// $('#deliveryFromDate').val()!='dd/mm/yyyy')
				// &&
				// ($('#deliveryToDate').val()!=''
				// &&
				// $('#deliveryToDate').val()!='dd/mm/yyyy'))
				// || (($('#fromDate').val()!='' &&
				// $('#fromDate').val()!='dd/mm/yyyy')
				// && ($('#toDate').val()!='' &&
				// $('#toDate').val()!='dd/mm/yyyy'))
				// || $('#orderNo').val()!=''))){
				if ($('#advanceFlag').val() == 'true') {

					if (flag
							&& flag1
							&& flag2
							&& flag3
							&& flag4
							&& ((($(
									'#rosterFromDate')
									.val() != '' && $(
									'#rosterFromDate')
									.val() != 'dd/mm/yyyy')
									&& ($(
											'#rosterToDate')
											.val() != '' && $(
											'#rosterToDate')
											.val() != 'dd/mm/yyyy')
									|| (($(
											'#deliveryFromDate')
											.val() != '' && $(
											'#deliveryFromDate')
											.val() != 'dd/mm/yyyy') && ($(
											'#deliveryToDate')
											.val() != '' && $(
											'#deliveryToDate')
											.val() != 'dd/mm/yyyy'))
									|| (($(
											'#fromDate')
											.val() != '' && $(
											'#fromDate')
											.val() != 'dd/mm/yyyy') && ($(
											'#toDate')
											.val() != '' && $(
											'#toDate')
											.val() != 'dd/mm/yyyy')) || $(
									'#orderNo')
									.val() != ''))) {

						var supplierRadio = $(
								'input:radio[name=sourceSupply]:checked')
								.val();

						if (supplierRadio != 'all'
								&& $('#supplier')
										.val()
										.trim() == "") {

							$('#alertBox')
									.text(
											'Please enter warehouse/vendor');
							$("#dialog-modal1")
									.dialog("open");
							$('#okBtn')
									.click(
											function(
													e) {
												$(
														"#dialog-modal1")
														.dialog(
																"close");
											});
							$('#supplier').focus();

						} else {

							$('#errorMsg').text('');
							$('#statusImg')
									.removeClass(
											'statusWrapper hideBlock');
							$('#statusImg')
									.addClass(
											'statusWrapper');
							$('#orderSearchSubmit')
									.attr('action',
											'advancedOrderSearch.htm');
							$('#orderSearchSubmit')
									.submit();
						}
					}
					// else
					// if($('#orderNo').val()=='' &&
					// ((($('#fromDate').val()==''
					// ||
					// $('#fromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#toDate').val()=='dd/mm/yyyy'
					// || $('#toDate').val()==''))
					// &&
					// (($('#deliveryFromDate').val()==''
					// ||
					// $('#deliveryFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#deliveryToDate').val()=='dd/mm/yyyy'
					// ||
					// $('#deliveryToDate').val()=='')))){
					// else
					// if($('#orderNo').val()=='' &&
					// ((($('#rosterFromDate').val()==''
					// ||
					// $('#rosterFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#rosterToDate').val()==''
					// ||
					// $('#rosterToDate').val()=='dd/mm/yyyy'))
					// && (($('#fromDate').val()==''
					// ||
					// $('#fromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#toDate').val()=='dd/mm/yyyy'
					// || $('#toDate').val()==''))
					// &&
					// (($('#deliveryFromDate').val()==''
					// ||
					// $('#deliveryFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#deliveryToDate').val()=='dd/mm/yyyy'
					// ||
					// $('#deliveryToDate').val()=='')))){
					else if ($('#orderNo').val() == ''
							&& ((($(
									'#rosterFromDate')
									.val() == '' || $(
									'#rosterFromDate')
									.val() == 'dd/mm/yyyy') && ($(
									'#rosterToDate')
									.val() == '' || $(
									'#rosterToDate')
									.val() == 'dd/mm/yyyy'))
									&& (($(
											'#fromDate')
											.val() == '' || $(
											'#fromDate')
											.val() == 'dd/mm/yyyy') && ($(
											'#toDate')
											.val() == 'dd/mm/yyyy' || $(
											'#toDate')
											.val() == '')) && (($(
									'#deliveryFromDate')
									.val() == '' || $(
									'#deliveryFromDate')
									.val() == 'dd/mm/yyyy') && ($(
									'#deliveryToDate')
									.val() == 'dd/mm/yyyy' || $(
									'#deliveryToDate')
									.val() == '')))) {
						var srchOption = $(
								'input:radio[name=searchByOptions]:checked')
								.val();
						$("#errorMsgDiv")
								.removeClass(
										'tableTitle nodataMessage');
						$("#errorMsgDiv")
								.addClass(
										'tableTitle errorDiv');
						if (srchOption == 'number'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter a keyword to lookup.');
						} else if (srchOption == 'number'
								&& $('#advDiv')
										.css(
												'display') == 'block') {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either order number/delivery date/roster date.');
						} else if (srchOption == 'type'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter delivery date');
						} else if (srchOption == 'type'
								&& $('#advDiv')
										.css(
												'display') == 'block') {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either delivery date/roster date.');
						} else if (srchOption == 'refNumber'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter a keyword to lookup.');
						} else {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either order reference number/delivery date/roster date.');
						}

						/*
						 * $( "#dialog-modal1"
						 * ).dialog( "open" );
						 * $('#okBtn').click(function(e){ $(
						 * "#dialog-modal1"
						 * ).dialog( "close" ); });
						 */
					}
				} else {
					if (flag2
							&& (((($(
									'#deliveryFromDate')
									.val() != '' && $(
									'#deliveryFromDate')
									.val() != 'dd/mm/yyyy') && ($(
									'#deliveryToDate')
									.val() != '' && $(
									'#deliveryToDate')
									.val() != 'dd/mm/yyyy')) || $(
									'#orderNo')
									.val() != ''))) {

						var supplierRadio = $(
								'input:radio[name=sourceSupply]:checked')
								.val();

						if (supplierRadio != 'all'
								&& $('#supplier')
										.val()
										.trim() == "") {

							$('#alertBox')
									.text(
											'Please enter warehouse/vendor');
							$("#dialog-modal1")
									.dialog("open");
							$('#okBtn')
									.click(
											function(
													e) {
												$(
														"#dialog-modal1")
														.dialog(
																"close");
											});
							$('#supplier').focus();

						} else {

							$('#errorMsg').text('');
							$('#statusImg')
									.removeClass(
											'statusWrapper hideBlock');
							$('#statusImg')
									.addClass(
											'statusWrapper');
							$('#orderSearchSubmit')
									.attr('action',
											'advancedOrderSearch.htm');
							$('#orderSearchSubmit')
									.submit();
						}
					}
					// else
					// if($('#orderNo').val()=='' &&
					// ((($('#fromDate').val()==''
					// ||
					// $('#fromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#toDate').val()=='dd/mm/yyyy'
					// || $('#toDate').val()==''))
					// &&
					// (($('#deliveryFromDate').val()==''
					// ||
					// $('#deliveryFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#deliveryToDate').val()=='dd/mm/yyyy'
					// ||
					// $('#deliveryToDate').val()=='')))){
					// else
					// if($('#orderNo').val()=='' &&
					// ((($('#rosterFromDate').val()==''
					// ||
					// $('#rosterFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#rosterToDate').val()==''
					// ||
					// $('#rosterToDate').val()=='dd/mm/yyyy'))
					// && (($('#fromDate').val()==''
					// ||
					// $('#fromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#toDate').val()=='dd/mm/yyyy'
					// || $('#toDate').val()==''))
					// &&
					// (($('#deliveryFromDate').val()==''
					// ||
					// $('#deliveryFromDate').val()=='dd/mm/yyyy')
					// &&
					// ($('#deliveryToDate').val()=='dd/mm/yyyy'
					// ||
					// $('#deliveryToDate').val()=='')))){
					else if ($('#orderNo').val() == ''
							&& (($(
									'#deliveryFromDate')
									.val() == '' || $(
									'#deliveryFromDate')
									.val() == 'dd/mm/yyyy') && ($(
									'#deliveryToDate')
									.val() == 'dd/mm/yyyy' || $(
									'#deliveryToDate')
									.val() == ''))) {
						var srchOption = $(
								'input:radio[name=searchByOptions]:checked')
								.val();
						$("#errorMsgDiv")
								.removeClass(
										'tableTitle nodataMessage');
						$("#errorMsgDiv")
								.addClass(
										'tableTitle errorDiv');
						if (srchOption == 'number'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter a keyword to lookup.');
						} else if (srchOption == 'number'
								&& $('#advDiv')
										.css(
												'display') == 'block') {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either order number/delivery date/roster date.');
						} else if (srchOption == 'type'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter delivery date');
						} else if (srchOption == 'type'
								&& $('#advDiv')
										.css(
												'display') == 'block') {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either delivery date/roster date.');
						} else if (srchOption == 'refNumber'
								&& $('#advDiv')
										.css(
												'display') == 'none') {
							$('#errorMsg')
									.text(
											'Please enter a keyword to lookup.');
						} else {
							closeAdvSearch();
							$('#errorMsg')
									.text(
											'Please enter either order reference number/delivery date/roster date.');
						}

						/*
						 * $( "#dialog-modal1"
						 * ).dialog( "open" );
						 * $('#okBtn').click(function(e){ $(
						 * "#dialog-modal1"
						 * ).dialog( "close" ); });
						 */
					}
				}

			});
});

//<!-- method called to close advanced search box in css -->
function closeAdvSearchClasses() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();
	$('#supplier').val('');
	$('#all').click();
	$("#suppName").val("");
	$("#suppName").val("");
	$("#suppNo").val("");
	$('#orderStatus').val('Select');
	$("#fromDate").val("");
	$("#toDate").val("");
	$("#rosterFromDate").val("");
	$("#rosterToDate").val("");
}

function closeAdvSearch() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();

}

function navigateToDetail(index, type) {

	$('#index').val(index);

	$('#statusImg').removeClass('statusWrapper hideBlock');
	$('#statusImg').addClass('statusWrapper');
	if (type == 'PO')
		$('#orderSearchSubmit').attr('action', 'requestOrderDetail.htm');
	else
		$('#orderSearchSubmit').attr('action', 'requestPReqDetail.htm');
	$('#orderSearchSubmit').attr('method', 'POST');
	$('#orderSearchSubmit').submit();

}
function category() {
	catFlag = "Null";
	$(".category")
			.click(
					function() {
						/*----------------******  Category Click function   *****--------------- */
						

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
						if (catFlag != selectedValue) {
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

						}

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
						if (subCatFlag != selectedValue) {
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
											});

						}
					});// subcat
	/*----------------******  End SubCategory Click function   *****--------------- */
}

function validateDateRoster(rosDate, delDate, id1, id2, msg) {
	var currentDate = new Date();
	var splittedRosDate = formateDate(rosDate).split('/');
	var splittedDelDate = formateDate(delDate).split('/');
	var actualRosDate = new Date();
	var actualDelDate = new Date();
	var month1 = splittedRosDate[1] - 1;
	var month2 = splittedDelDate[1] - 1;
	actualRosDate.setFullYear(splittedRosDate[2], month1, splittedRosDate[0]);
	actualDelDate.setFullYear(splittedDelDate[2], month2, splittedDelDate[0]);
	var splittedOne = splittedRosDate[0] + splittedRosDate[1]
			+ splittedRosDate[2];
	var splittedTwo = splittedDelDate[0] + splittedDelDate[1]
			+ splittedDelDate[2];

	if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
			|| (splittedOne.length != 8 && splittedOne.length != 6)) {
		$('#alertBox').text(
				'Please enter a ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id1).val();
			$("#dialog-modal1").dialog("close");

			$("#" + id1).focus();
			$("#" + id1).val(temp);
			return false;
		});
		;
	} else if ((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999)
			|| (splittedTwo.length != 8 && splittedTwo.length != 6)) {
		$('#alertBox').text(
				'Please enter ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");

		$('#okBtn').click(function(e) {
			var temp = $("#" + id2).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id2).focus();
			$("#" + id2).val(temp);
			return false;
		});
		;
	}/* 
	else if(actualRosDate.getTime()>currentDate.getTime()){
	$('#alertBox').text('Roster date must be current or past date.');
	$( "#dialog-modal1" ).dialog( "open" );
	$('#okBtn').click(function(e){
	var temp=$("#"+id1).val();
	$( "#dialog-modal1" ).dialog( "close" );
	$("#"+id1).focus();
	$("#"+id1).val(temp);
	return false;
	});
	} */
	else if (actualRosDate.getTime() > actualDelDate.getTime()) {
		$('#alertBox').text(
				'Please enter valid date range for ' + msg
						+ '. To date can not be before ' + rosDate + '.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id2).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id2).focus();
			$("#" + id2).val(temp);
			return false;
		});
	} else
		return true;
}
function validateDate1(rosDate, delDate, id1, id2, msg) {
	var currentDate = new Date();
	var splittedRosDate = formateDate(rosDate).split('/');
	var splittedDelDate = formateDate(delDate).split('/');
	var actualRosDate = new Date();
	var actualDelDate = new Date();
	var month1 = splittedRosDate[1] - 1;
	var month2 = splittedDelDate[1] - 1;
	actualRosDate.setFullYear(splittedRosDate[2], month1, splittedRosDate[0]);
	actualDelDate.setFullYear(splittedDelDate[2], month2, splittedDelDate[0]);
	var splittedOne = splittedRosDate[0] + splittedRosDate[1]
			+ splittedRosDate[2];
	var splittedTwo = splittedDelDate[0] + splittedDelDate[1]
			+ splittedDelDate[2];

	if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
			|| (splittedOne.length != 8 && splittedOne.length != 6)) {
		$('#alertBox').text(
				'Please enter a ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id1).val();
			$("#dialog-modal1").dialog("close");

			$("#" + id1).focus();
			$("#" + id1).val(temp);
			return false;
		});
		;
	} else if ((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999)
			|| (splittedTwo.length != 8 && splittedTwo.length != 6)) {
		$('#alertBox').text(
				'Please enter ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");

		$('#okBtn').click(function(e) {
			var temp = $("#" + id2).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id2).focus();
			$("#" + id2).val(temp);
			return false;
		});
		;
	} else if (actualRosDate.getTime() > actualDelDate.getTime()) {
		$('#alertBox').text(
				'Please enter valid date range for ' + msg
						+ '. To date can not be before ' + rosDate + '.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id2).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id2).focus();
			$("#" + id2).val(temp);
			return false;
		});
	} else
		return true;
}
function validateDate(rosDate, id1, msg) {
	var currentDate = new Date();
	if (rosDate.split('/').length == 3) {
		var splittedRosDate = formateDate(rosDate).split('/');
		var actualRosDate = new Date();
		var month1 = splittedRosDate[1] - 1;
		actualRosDate.setFullYear(splittedRosDate[2], month1,
				splittedRosDate[0]);
		var splittedOne = splittedRosDate[0] + splittedRosDate[1]
				+ splittedRosDate[2];

		if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
				|| (splittedOne.length != 8 && splittedOne.length != 6)) {
			$('#alertBox').text(
					'Please enter ' + msg + ' date in dd/mm/yyyy format.');
			$("#dialog-modal1").dialog("open");
			$('#okBtn').click(function(e) {
				var temp = $("#" + id1).val();
				$("#dialog-modal1").dialog("close");
				$("#" + id1).focus();
				$("#" + id1).val(temp);
				return false;
			});
			;
		} else
			return true;
	} else {

		$('#alertBox').text(
				'Please enter ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id1).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id1).focus();
			$("#" + id1).val(temp);
			return false;
		});
		;
	}
}

function checkTodayDate(rosDate, id1, msg) {
	var currentDate = new Date();
	var splittedRosDate = formateDate(rosDate).split('/');
	var actualRosDate = new Date();
	var month1 = splittedRosDate[1] - 1;
	actualRosDate.setFullYear(splittedRosDate[2], month1, splittedRosDate[0]);
	var splittedOne = splittedRosDate[0] + splittedRosDate[1]
			+ splittedRosDate[2];

	if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
			|| (splittedOne.length != 8 && splittedOne.length != 6)) {
		$('#alertBox').text(
				'Please enter ' + msg + ' date in dd/mm/yyyy format.');
		$("#dialog-modal1").dialog("open");
		$('#okBtn').click(function(e) {
			var temp = $("#" + id1).val();
			$("#dialog-modal1").dialog("close");
			$("#" + id1).focus();
			$("#" + id1).val(temp);
			return false;
		});
		;
	}
	/*else if(actualRosDate.getTime()>currentDate.getTime()){
	 $('#alertBox').text('Roster date must be current or past date.');
	 $( "#dialog-modal1" ).dialog( "open" );
	 $('#okBtn').click(function(e){
	 var temp=$("#"+id1).val();
	 $( "#dialog-modal1" ).dialog( "close" );
	 $("#"+id1).focus();
	 $("#"+id1).val(temp);
	 return false;
	 });
	 }*/
	else
		return true;
}

function retainValues() {
	$('#orderNo').val($('#retain-orderNo').val());
	if ($('#retain-ibtFlag').val() == 'IN') {
		$('#orderType').val("ZUBIN");
	} else if ($('#retain-ibtFlag').val() == 'OUT') {
		$('#orderType').val("ZUBOUT");
	} else {
		$('#orderType').val($('#retain-dropdownType').val());
	}
	/*if($('#retain-paramRetain').val()=='true'){
		$('#deliveryFromDate').val($('#retain-fromDate').val());
		$('#fromDate').val('');
		$('#toDate').val('');
		}
	else{
		$('#fromDate').val($('#retain-fromDate').val());
		$('#toDate').val($('#retain-fromDate').val());
		}*/
	$('#rosterFromDate').val($('#retain-rosterFromDate').val());
	$('#rosterToDate').val($('#retain-rosterToDate').val());
	$('#orderStatus').val($('#retain-dropdownStatus').val());

	if ($('#retain-supplierNo').val() != '') {
		if ($('#retain-radioBtnSupplier').val() == 1) {
			$('#vendor').click();
			$('#vendorText').text($('#retain-storeOrVendor').val());
			click = false;
		} else if ($('#retain-radioBtnSupplier').val() == 2
				&& $('#retain-storeOrVendor').val() == 'Store'
				&& $('#retain-wareHouseFlag').val() == 'N') {
			$('#vendor').val('store');
			$('#vendor').click();
			$('#vendorText').text($('#retain-storeOrVendor').val());
			click = false;
		} else {
			if ($('#retain-dropdownType').val() == 'ZUB') {
				$('#vendor').val('store');
				$('#vendorText').text($('#retain-storeOrVendor').val());
			}
			$('#warehouse').click();
			click = true;
		}
	} else {
		$('#supplier').val('');
		$('#retain-supplierNo').val('');
		$("#supplier").attr('readonly', 'readonly');
		if ($('#retain-dropdownType').val() == 'ZUB') {
			$('#vendor').val('store');
			$('#vendorText').text($('#retain-storeOrVendor').val());
		}
	}
	if ($('#retain-supplierName').val() != '') {
		$('#supplier').val(
				$('#retain-supplierNo').val() + '-'
						+ $('#retain-supplierName').val());
	} else {
		$('#supplier').val($('#retain-supplierNo').val());
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
function getArticlesForPage(pageNumber) {

	$('#statusImg').removeClass('statusWrapper hideBlock');
	$('#statusImg').addClass('statusWrapper');

	$('#pageNumber').val(pageNumber);
	$('#orderSearchSubmit').attr('action', 'requestSearchForPagination.htm');
	$('#orderSearchSubmit').submit();

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

function clear() {
	$('#retain-orderNo').val('');
	$('#retain-dropdownType').val('');
	$('#retain-dropdownStatus').val('');
	$('#retain-fromDate').val('');
	$('#retain-toDate').val('');
	$('#retain-rosterFromDate').val('');
	$('#retain-rosterToDate').val('');
	$('#retain-supplierNo').val('');
	$('#retain-supplierName').val('');
	$('#retain-radioBtnArtType').val('');
	$('#retain-radioBtnSupplier').val('');
	$('#retain-storeOrVendor').val('');
	$('#storeOrVendor').val('');
	$('#retain-wareHouseFlag').val('');
	$('#wareHouseFlag').val('');
}
function calculateScrollWindow(){
	var tableCols =$('.sortTable thead tr th:visible').length;

	var width = 0;
	width = (tableCols * 100) - 100;
	if($('.sortTable thead tr .VNM').is(':visible'))
		width=width+200;
	if(width<1004)
		width=1004;
	$("#scrollWindow").css('width',width);
	
	if (width <=1004) {
		$("#scrollTable").removeClass(
				'scrollTableContainer');
		$("#scrollWindow").removeClass('scrollWindow');
		$("#scrollBtns").addClass('hideBlock');
	}
	else {
		$("#scrollTable").addClass(
		'scrollTableContainer');
$("#scrollWindow").addClass('scrollWindow');
$("#scrollBtns").removeClass('hideBlock');
	}

	
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

	$('#next-column1').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#previous-column1').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
}
