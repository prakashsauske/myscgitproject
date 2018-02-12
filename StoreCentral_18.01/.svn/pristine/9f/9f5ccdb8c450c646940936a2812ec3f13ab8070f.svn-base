var articleSearchResult;
var promoList;
var adType;
var isBigw;
var isSupers;
var isMetro;
var isLiqure;
var isThomas;
var isShrunked = true;
var  toFilerList;
var activePromotionList;
var verified='<label class="success">Verified</label>';
var failed='<label class="failed">Failed</label>';
var confirmmsg='Article will be removed.';
var confirmDeActivateMsg = 'Deactivating will end this promotion';
var presentDate = '';
var popUpErrorMsgDiv = '<h4 class="errorAddtnlDtls" style="padding-left:15px;/* margin-top:20px; */color:red;background:url(../../images/iconError.png) 0 3px no-repeat;/* display: inline; */display: inline-block;float: left;">Please select atleast one article to add.</h4>';
var roleMap={'MA':'MA'};
var roleId;
var currentPageInPast = 1;
var currentPageInActive = 1;
$(document).ready(
		function() {
			roleId = $('#roleId').val();
			createAutoSuggest($('#article'));
			createAutoSuggest($('#articleSearch'));
			
			
			$('#article').focus();
			$('[name="sr_searchOption"]').click(function() {
				$('#article').focus();
				$('#article').removeClass('errorField');
				$('#article').attr('title', '');
			});
			
			$('#price').parent('ul').find('li').removeClass('selectedMenu');
			$('#price').addClass('selectedMenu');

			isBigw = $('#isBigw').val();
			
			if (isBigw == 'true'){
				buildLimit=buildBigwLimit;
			}else{
				buildLimit=buildOtherLimit;
			}
			
			if($("#currentBanner").val()=='woolworths' || $("#currentBanner").val()=='thomasdux' || $("#currentBanner").val()=='countdown'){
				isSupers=true;
				isLiqure=false;
			}else if($("#currentBanner").val()=='metro'){
				isSupers=false;
				isLiqure=false;
				isMetro=true;
			} else if($("#currentBanner").val()=='danmurphy' || $("#currentBanner").val()=='bws' ){
				isSupers=false;
				isLiqure=true;				
			}else if( $("#currentBanner").val() == 'thomasdux'){
				isThomas=true;
				isBigw == true;
			}
			else{
				isSupers=false;
				isLiqure=false;	
			}
			
			//set default date as today in start date and end date
			
			var today = new Date();
			var newDate = today.getDate();
			var newMonth = today.getMonth() + 1;
			
			if (newDate < 10) {
				newDate = '0' + newDate;
			}
			if (newMonth < 10) {
				newMonth = '0' + newMonth;
			}
			presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
			$('#start').val(presentDate);
			$("#end").val(presentDate);
			
			
//for past clearance promotions set default date as 30 days before for start date
			
			var prevMonthDate = getDesiredDate(14); 
			
			$('#startSearch').val(prevMonthDate);
			
			//for past clearance promotions set default date as 1 day before for end date
			
			var yesterday  =  getDesiredDate(1); 
			
			$('#endSearch').val(yesterday);
			
			//code for enter key event
			$('body').on('keypress',function(e){
			     var p = e.which;
			     if(p==13){
						e.preventDefault();
						/*
						 * if
						 * (!$('#PublishButton').hasClass(
						 * 'disabled') &&
						 * $('#PublishButton:visible').length ==
						 * 1) { $('#PublishButton').trigger(
						 * 'click'); } else if
						 * ($('#validateButton:visible').length ==
						 * 1) {
						 * $('#validateButton').trigger(
						 * 'click'); } else if
						 * ($('#beforePublishBtn:visible').length ==
						 * 1) {
						 * $('#beforePublishBtn').trigger(
						 * 'click'); } else {
						 */
						if ($('#dialog-confirmation')
								.dialog('isOpen')
								&& $(
										'#dialog-confirmation #ok')
										.is(':visible')) {
							$('#dialog-confirmation #ok')
									.trigger('click');
						} else if ($('#dialog-confirmation')
								.dialog('isOpen')
								&& $(
										'#dialog-confirmation .confirmation-yesbtn')
										.is(':visible')) {
							$(
									'#dialog-confirmation .confirmation-yesbtn')
									.trigger('click');
						} else if ($(
								'#dialog-mulipleArticles')
								.dialog('isOpen')) {
							$('#addtolist')
									.trigger('click');
						}else if ($('#searchAndAdd').is(
								':visible')) {
							$('#searchAndAdd').trigger(
									'click');
						} else if ($('#PublishButton')
								.hasClass('disabled')
								&& !($('#validateButton')
										.hasClass('disabled'))
								&& $('#validateButton').is(
										':visible')) {
							$('#validateButton').trigger(
									'click');
						} else if (!($('#PublishButton')
								.hasClass('disabled'))
								&& $('#PublishButton').is(
										':visible')) {
							$('#PublishButton').trigger(
									'click');
						}
						else if ($('#searchAndAddPast').is(
						':visible')) {
					$('#searchAndAddPast').trigger(
							'click');
				}
						// }
					}
			 });
			
			
			adType = $('#adType').html();
			// code for setting default parameters for popups
			$("#dialog-mulipleArticles").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				maxHeight : 800,
				width : 515
			});
			
			$("#dialog-mulipleArticlesCONFIRM").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				maxHeight : 800,
				width : 515
			});
			
			//dialogue for sales history
			$("#dialog-salesHistory").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			maxHeight : 800,
			width : 950
		});

			$("#dialog-confirmation").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				maxHeight : 800,
				width : 480
			});

			$('#addtolist').click(function(event) {
				if ($('input[name="articlecheckbox"]:checked').length >= 1) {
					addArticleToPromoList();
				} else {
					showError('Please select atleast one article to add.');
					event.preventDefault();
				}

			});

			// (Temp - Dev team need to change it) Code to show multiple
			// articles popup

			$("#searchAndAdd")
			.click(
					function() {
						$('#errorMsgDiv').removeClass(
								'hideBlock').addClass(
								'hideBlock');
						var articleNo = $('#article').val()
								.trim();
						if (!$('#article').required()) {
							showError('Please enter article to search.');
							$('#article').focus();
						}else if (articleNo != ''
							&& isNaN(articleNo) && !(articleNo.length > 2)
						) {
						showError('Please input a minimum of 3 characters.');
					$('#article').focus();
						} else {
							$('#article').removeClass('errorField');
							if (validateStartandEndDateInSearch()) {
								$('#start').removeClass('errorField');
								$('#end').removeClass('errorField');
								getArticleSearchResult($(
										submitQuery)
										.serialize());
							} else {
								showError('Please check the date range.');
								// $('#start').focus();
							}

						}
						$(".tooltip").tooltip({
							position : {
								my : "left center",
								at : "right+10 center"
							}
						});
					});
			
			$("#searchAndAddPast").click(
					function() {
						hideErrorClr();
						var streq=$('#startSearch').required();
						var enreq=$('#endSearch').required();
						
						if (streq && enreq) {
							if($('#startSearch').noFutureValidation() && $('#startSearch').noCurrentDayValidation() && $('#endSearch').noCurrentDayValidation() &&
									$('#endSearch').noFutureValidation() )
									if(compareDate($('#startSearch').val(), $('#endSearch').val()) == 'lt'||compareDate($('#startSearch').val(), $('#endSearch').val()) == 'eq')
										if($('#articleSearch').val() != '')
										{
											 if ($('#articleSearch').val() != ''
													&& isNaN($('#articleSearch').val()) && !($('#articleSearch').val().length > 2)
													) {
												 showErrorClr('Please input a minimum of 3 characters.');
													$('#articleSearch').focus();
											}
											 else
										getArticleSearchResultInPast();
										}
									else
										{
									getArticleSearchResultPast($('#searchForm')
											.serialize(),1);
										}
									else{
										////Defect 253
										showErrorClr('Start date should not be greater than end date.');
									}
						}else{
							showErrorClr('Please check start date and end date.');
						}

						
						$(".tooltip").tooltip({
							position : {
								my : "left center",
								at : "right+10 center"
							}
						});
					});

			// (Temp - Dev team need to change it) Code to show a message once
			// Create is clicked

			$("#createButton").click(function() {
				$("#dialog-create").parent().addClass("popupWrapper");
				$("#dialog-create").dialog("open");
			});

			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn")
					.click(function() {
						$("#dialog-mulipleArticles").dialog("close");
						$("#dialog-create").dialog("close");
					});

			$("#addActionBtn").click(function() {
				$("#tableAddAction").toggleClass('hideBlock');
			});
			$("#closeLink").click(function() {
				$("#tableAddAction").addClass('hideBlock');
			});

			$("#dialog-create").click(function() {
				$("#beforeCreate").addClass('hideBlock');
				$("#afterCreate").removeClass('hideBlock');
			});

			$('.textbox').focus(function() {
				if ($(this).val() == $(this).attr('defaultVal')) {
					$(this).val('');
					$(this).removeClass("textboxDefaultText");
				}
			});

			$('.textbox').blur(function() {
				if ($(this).val() == '') {
					$(this).val($(this).attr('defaultVal'));
					$(this).addClass("textboxDefaultText");
				}
			});

			Date.format = 'dd/mm/yy';
			$(".inputDateInput").datepicker({
				zIndex : 50
			});

			$(".inputDate").datepicker({
				zIndex : 50
			});

			// Code to show and hide fi

			$('#filterOpen').click(
					function() {
						if ($('#promoList #promoListTbody').find('tr').length > 1) {
							$("#filterClear").removeClass('hideBlock');
							$(".filterRow").removeClass('hideBlock');
							showTips();
							if (isShrunked) {
								$('#promoList').find('td[data-addonfilter]').removeClass(
										'hideBlock').addClass('hideBlock');
							} else {
								$('#promoList').find('td[data-addonfilter]').removeClass(
										'hideBlock');
							}
							$(this).addClass('hideBlock');
							$('.Filter').trigger('change');
						}
					});

			$('#filterClear').click(function() {
				$('.Filter').val('');
				if(isShrunked){
					$('#promoList').find('#promoListTbody tr[data-om]').removeClass('hideBlock');
				}else{
					if(toFilerList != undefined)
						{

						toFilerList.prev('tr.headRow').removeClass('hideBlock');
						toFilerList.removeClass('hideBlock');
				
						}
				}
				
				$("#filterOpen").removeClass('hideBlock');
				$(".filterRow").addClass('hideBlock');
				$(this).addClass('hideBlock');
				hideTips();
			});

			
			$(".tooltip").tooltip({
				position : {
					my : "left center",
					at : "right+10 center"
				}
			});

			$("#menu").menu({
				position : {
					my : "right top",
					at : "right top+20"
				}
			});

			$("#beforeCreate, #afterCreate").treetable({
				expandable : true
			});

			// Code to close
			$(".close").click(function() {
				$(".quickHelpWrapper").addClass('hideBlock');
				$(".pageErrorsWrapper").addClass('hideBlock');
			});

			$("#promolistcheckboxall").click(function() {
				if ($("#promolistcheckboxall:checked").length == 1) {
					$(".promolistcheckbox").prop('checked', true);
				} else {
					$(".promolistcheckbox").prop('checked', false);
				}
				checkOrUncheckAll();
				if($('#listOption').val()=='allDrafts')
					{
					if($("#promolistcheckboxall").is(':checked'))
						{
						$('.userCheckBox').prop('checked',true);
						}
					else
						{
						$('.userCheckBox').prop('checked',false);
						}
					}
				
			});
			
			$("#dialog-salesHistory").find(".popupActions .closeBtn").click(function() {				
				$("#dialog-salesHistory").dialog("close");
			});

			// beforeCreate button event
			$("#beforePublishBtn").click(
					function() {
						if($(this).hasClass('disabled')){
							return false;
						}
						hideError();

						if ($(".promolistcheckbox:checked").length == 0) {
							showError('Please Select any article to proceed.');
							$(".tooltip").tooltip({
								position : {
									my : "left center",
									at : "right+10 center"
								}
							});
							return false;
						}

						if(validateDraft($('#promoList tr[data-om]'))){							
							var formData=getPostDataObj4ArticleInfoStr($('#promoList'));
//							$('.saveRecord').trigger('click');
//							$('#listOption').prop('disabled',true);
						//	getArticleInfo(formData);
							generateList(formData);
						 }else{
							 $(".tooltip").tooltip({
									position : {
										my : "left center",
										at : "right+10 center"
									}
								});
							 return false;
						 }

					});

			$('#backBtn').click(
					function() {
						
						if(isShrunked){
							window.location.replace("../login/goingHome.htm");
						}
						else 
							{
						
						resetSearchFields();
						$('#instructionalText2').removeClass('hideBlock')
								.addClass('hideBlock');
						$('#instructionalText1').removeClass('hideBlock');
						if($('#listOption').val()!='allDrafts'){
							$('#addActionBtn').removeClass('hideBlock');
							$('#tableAddAction').removeClass('hideBlock');
						}
						$('#beforePublish').removeClass('hideBlock');
						$('#afterPublishDiv').removeClass('hideBlock')
								.addClass('hideBlock');
					//	$('.saveRecord').trigger('click');
//						$('#listOption').prop('disabled',false);
						$('#promoList .status').text('Draft');
						checkOrUncheckAll();
						shrunkTable();
						hidePromoList();
						
						
							}
					});

			// NEW selector
			jQuery.expr[':'].Contains = function(a, i, m) {
				return jQuery(a).text().toUpperCase().indexOf(
						m[3].toUpperCase()) >= 0;
			};

			// OVERWRITES old selecor
			jQuery.expr[':'].contains = function(a, i, m) {
				return jQuery(a).text().toUpperCase().indexOf(
						m[3].toUpperCase()) >= 0;
			};

			var filterinput=$('.Filter');
			//$('.Filter').trigger('change');
			filterinput.each(
					function() {
						var filterfor = $(this).attr('data-filterfor');
						//console.log('for filter :' + filterfor);
						
						var event='keyup';
						if($(this).hasClass('inputDate')||$(this).hasClass('inputDateInput')){
							event='change';
						}						
						
						$(this).unbind(event);
						$(this).on(
								event,
								function() {
														var visible = false;

														if (isShrunked) {
															toFilerList = $('#promoList #promoListTbody tr[data-om]');
														} else {
														}// get rows from
														// globally;

														filterinput
																.each(function() {
																	var trList;
																	var elem = $(this);
																	console
																			.log("elem"
																					+ elem
																							.val());
																	if (elem.val()
																			.trim() != '') {
																		filterfor = elem
																				.attr('data-filterfor');
																		filtertext = $(
																				this)
																				.val();
																		console
																				.log('for filter :'
																						+ filterfor);
																		if (!visible) {
																			toFilerList
																					.addClass('hideBlock');
																			$('#promoList #promoListTbody').find('.expandsubrow ').hide();
																			if($('#listOption').is(':disabled'))
																			{
																				$('#promoList #promoListTbody tr.headRow').addClass('hideBlock');
																			}
																			var toShow=toFilerList
																					.find(
																							'.'
																									+ filterfor
																									+ ':contains('
																									+ filtertext
																									+ ')')
																					.parent(
																							'tr');
																			toShow.removeClass(
																							'hideBlock');
																			toShow.each(function(){
																				if($('#listOption').is(':disabled'))
																				{
																				$(this).prev('tr').removeClass('hideBlock');
																				}
																				var id=$(this).attr('data-tt-id');
																				if($(this).find('.collapsed').length==1)
																				$('tr[data-tt-parent-id="'+id+'"]').show();
																			});

																		} else {
																			trList = $(
																					'#promoList #promoListTbody tr[data-om]:visible .'
																							+ filterfor
																							+ ':contains('
																							+ filtertext
																							+ ')')
																					.parent(
																							'tr');
																			$('#promoList #promoListTbody').find('.expandsubrow:visible').hide();
																			
																			if($('#listOption').is(':disabled'))
																			{
																				$('#promoList #promoListTbody tr.headRow').addClass('hideBlock');
																			}
																			
																			$(
																					'#promoList #promoListTbody tr[data-om]')
																					.addClass(
																							'hideBlock');
																			console
																					.log(trList.length);
																			trList
																					.removeClass('hideBlock');
																			trList.each(function(){
																				if($('#listOption').is(':disabled'))
																				{
																					$(this).prev('tr').removeClass('hideBlock');
																				}
																				var id=$(this).attr('data-tt-id');
																				if($(this).find('.collapsed').length==1)
																				$('tr[data-tt-parent-id="'+id+'"]').show();
																			});
																		}

																		visible = true;
																	}
																	if (!visible) {
																		toFilerList
																				.removeClass('hideBlock');
																		toFilerList.each(function(){
																			if($('#listOption').is(':disabled'))
																			{
																				$(this).prev('tr').removeClass('hideBlock');
																			}
																			var id=$(this).attr('data-tt-id');
																			if($(this).find('.collapsed').length==1)
																			$('tr[data-tt-parent-id="'+id+'"]').show();
																		});
																	}
																});
								});
					});
			
			$("#validateButton").click(function(){
				if (!$(this).hasClass('disabled')) 
				{
				var allSavedFlag=true;
				//###have to uncomment below
	//			$('#promoArticleList tr[data-om]:visible').each(function() {
	//				var obj = $(this);
	//				if(!obj.find('label.saveRowBtn').hasClass('hideBlock')){
	//					allSavedFlag=false;
	//				}
	//			});		
				//###have to uncomment above
				if(allSavedFlag){
					validatebeforeCreatePromotion($('#promoList tr[data-om]:visible'));
				}else{
					flag=false;
					showError("Please save the changes before you proceed.");
				}
				}
			});
			
			$("#PublishButton").click(function(){
				if(!$(this).hasClass('disabled')){
					callServiceForCreate();
				}
			});
			
			$('input[name="addedArticleList"]').each(function(){
				
				var articleNo=$(this).val().split("_")[0];
				var uom=$(this).val().split("_")[1];
				var description=$(this).val().split("_")[2];
				var id=articleNo+"_"+uom;
				
						
				if ($('#row-' + id).length == 0){
				$('#promoList #promoListTbody').append(
						getPromoItemAsHTML(articleNo, description, uom, id,
								'', '', '', '', '',
									'','','','','',$('#loginUserId').val(),''));
									
				$("#row-" + id).find("#dispType").val('');
				bindSaveAndDelete(id);
				}
				showPromoList();
				shrunkTable();
			
			});
			$("#actives").addClass('hideBlock');
			$("#pasts").addClass('hideBlock');

			
			//status radio buttons
			$('#MM').click(function(){
				/*$("#drafts").removeClass('hideBlock');
				$("#actives").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');*/
				
				var $sruc = $('#promoListTbody td[data-addon]');
				if($('#listOption').is(':disabled') && ($sruc != undefined && $sruc.length !=0 && !($sruc.hasClass('shrunked'))))
					{
					isShrunked=false;
					$('#instructionalText1').removeClass('hideBlock').addClass('hideBlock');
					$('#instructionalText2').removeClass('hideBlock');
					}

				if(isShrunked){
					$('#listOption').prop('disabled',false);
					$('#instructionalText1').removeClass('hideBlock');
					$('#instructionalText2').removeClass('hideBlock').addClass('hideBlock');
				}
				$("#drafts").removeClass('hideBlock');
				$("#actives").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				
				/*if($('#tableAddAction').hasClass('hideBlock'))
					{
					$("#beforePublish").addClass('hideBlock');	
					$("#afterPublishDiv").removeClass('hideBlock');	
					} */
				/*else */
				$('#instructionalText1').removeClass('hideBlock');
				$('#instructionalText2').addClass('hideBlock');
				if($('#promoList #promoListTbody tr').length > 1 && !$('#listOption').is(':disabled')){
					//$("#beforePublish").removeClass('hideBlock');
					$("#beforePublish").removeClass('hideBlock');	
					$("#afterPublishDiv").addClass('hideBlock');
					$('#instructionalText1').removeClass('hideBlock');
					$('#instructionalText2').addClass('hideBlock');
				}
				else if($('#promoList #promoListTbody tr').length > 1 && $('#listOption').is(':disabled'))
					{
					$("#beforePublish").addClass('hideBlock');	
					$("#afterPublishDiv").removeClass('hideBlock');
					$('#instructionalText1').addClass('hideBlock');
					$('#instructionalText2').removeClass('hideBlock');
					}
				$('#filterClear').trigger('click');
			
				
			});
			
			$('#MF').click(function(){
				/*$("#actives").removeClass('hideBlock');
				$("#drafts").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');
				$("#afterPublish").addClass('hideBlock');	*/			
				$('#instructionalText1,#instructionalText2').addClass('hideBlock');
				$('#listOption').prop('disabled',true);
				$("#actives").removeClass('hideBlock');
				$("#drafts").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');
				$("#afterPublish").addClass('hideBlock');	
				$("#afterPublishDiv").addClass('hideBlock');	
				$('#expandAll_active').removeClass('hideBlock');
				$('#collapseAll_active').addClass('hideBlock');
				$('#instructionalText1').removeClass('hideBlock').addClass('hideBlock');
				$('#instructionalText2').removeClass('hideBlock').addClass('hideBlock');
				getActiveAndFuturePromotions(1);
				$('#filterClearSearch').trigger('click');
				
			});
			
			$('#MR').click(function(){
				$('#instructionalText1,#instructionalText2').addClass('hideBlock');
				$('#listOption').prop('disabled',true);
				$("#pasts").removeClass('hideBlock');
				$("#drafts").addClass('hideBlock');
				$("#actives").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');
				$("#afterPublish").addClass('hideBlock');
				$("#afterPublishDiv").addClass('hideBlock');
				$('#instructionalText1').removeClass('hideBlock').addClass('hideBlock');
				$('#instructionalText2').removeClass('hideBlock').addClass('hideBlock');
				var prevMonthDate = getDesiredDate(14); 
				
				$('#startSearch').val(prevMonthDate);
				
				//for past clearance promotions set default date as 1 day before for end date
				
				var yesterday  =  getDesiredDate(1); 
				
				$('#endSearch').val(yesterday);
				
				if(!$('#errorMsgDivClr').hasClass('hideBlock'))
					$('#errorMsgDivClr').addClass('hideBlock');
				
				
				
//Defect 252
				$('[NAME="department"]').val('Select');
				$('[NAME="createdBy"]').val('');
				$('[NAME="article"]').val('');
				$('#filterClearSearchPast').trigger('click');
				$('#searchAndAddPast').trigger('click');
				//for past clearance promotions set default date as 30 days before for start date
				var prevMonthDate = getDesiredDate(30); 
				
				$('#startSearch').val(prevMonthDate);
				
			});
			
			$('#advancedSearch').click(function(){
				$('#pastSearchArea').toggle();
			});
			$('#closeAdvanceSearch').click(function(){
				$('#pastSearchArea').hide();
			});
			
			
			$('#listOption').on('change',function()
					{
				var option = $(this).val();
				if(option == 'myDrafts')
					{
					$('#addActionBtn').addClass('hideBlock').removeClass('hideBlock');
					$('#tableAddAction').addClass('hideBlock').removeClass('hideBlock');
					callServiceForMyDraft();
					}
				else if(option =='allDrafts')
					{
					$('#addActionBtn').removeClass('hideBlock').addClass('hideBlock');
					$('#tableAddAction').removeClass('hideBlock').addClass('hideBlock');
					callServiceForAllDraft();
					}
				hideError();
					});
			$('#listOption').trigger("change");
			
			$('#filterOpenSearch').click(
					function() {
						if ($('#promoArticleListSearch').find('tr').length > 3) {
							$("#filterClearSearch").removeClass('hideBlock');
							$(".filterRowSearch").removeClass('hideBlock');
							showTips();
							$(this).addClass('hideBlock');
						}
					});
			
			$('#filterClearSearch').click(function() {
				$('.FilterSearch').val('');				
			//	$('#promoArticleListSearch tr[data-om]').removeClass('hideBlock');
				if(toFilerList != undefined)
				toFilerList.removeClass('hideBlock');
				$('#promoArticleListSearch tr.headRow').removeClass('hideBlock');

				$("#filterOpenSearch").removeClass('hideBlock');
				$(".filterRowSearch").addClass('hideBlock');
				$(this).addClass('hideBlock');
				hideTips();
			});
			
			$('#filterOpenSearchPast').click(
					function() {
						if ($('#promoArticleListSearchPast').find('tr').length > 3) {
							$("#filterClearSearchPast").removeClass('hideBlock');
							$(".filterRowSearchPast").removeClass('hideBlock');
							showTips();													
							$(this).addClass('hideBlock');
						}
					});
			
			$('#filterClearSearchPast').click(function() {
				$('.FilterSearchPast').val('');				
			//	$('#promoArticleListSearchPast tr[data-om]').removeClass('hideBlock');
				if(toFilerList != undefined)
				toFilerList.removeClass('hideBlock');
				$('#promoArticleListSearchPast tr.headRow').removeClass('hideBlock');

				$("#filterOpenSearchPast").removeClass('hideBlock');
				$(".filterRowSearchPast").addClass('hideBlock');
				$(this).addClass('hideBlock');
				hideTips();
			});
			
			var filterinputPast=$('.FilterSearchPast');
			filterinputPast.each(
					function() {
						var filterfor = $(this).attr('data-filterfor');
						console.log('for filter :' + filterfor);

						var event = 'keyup';
						if ($(this).hasClass('inputDate')
								|| $(this).hasClass('inputDateInput')) {
							event = 'change';
						}

						$(this).unbind(event);
						$(this)
								.on(
										event,
										function() {
											var visible = false;

											if (isShrunked) {
												toFilerList = $('#promoArticleListSearchPast tr[data-om]');
											} else {
											}// get rows from
											// globally;

											filterinputPast
													.each(function() {
														var trList;
														var elem = $(this);
														console
																.log("elem"
																		+ elem
																				.val());
														if (elem.val()
																.trim() != '') {
															filterfor = elem
																	.attr('data-filterfor');
															filtertext = $(
																	this)
																	.val();
															console
																	.log('for filter :'
																			+ filterfor);
															if (!visible) {
																toFilerList
																		.addClass('hideBlock');
																$('#promoArticleListSearchPast tr.headRow').addClass('hideBlock');
																$('#promoArticleListSearchPast').find('.expandsubrow ').hide();
																
																var toShow=toFilerList
																		.find(
																				'.'
																						+ filterfor
																						+ ':contains('
																						+ filtertext
																						+ ')')
																		.parent(
																				'tr');
																toShow.removeClass(
																				'hideBlock');
																toShow.each(function(){
																	$(this).prev('tr').removeClass('hideBlock');
																	var id=$(this).attr('data-tt-id');
																	if($(this).find('.collapsed').length==1)
																	$('tr[data-tt-parent-id="'+id+'"]').show();
																});

															} else {
																trList = $(
																		'#promoArticleListSearchPast tr[data-om]:visible .'
																				+ filterfor
																				+ ':contains('
																				+ filtertext
																				+ ')')
																		.parent(
																				'tr');
																$('#promoArticleListSearchPast').find('.expandsubrow:visible').hide();
																$('#promoArticleListSearchPast tr.headRow').addClass('hideBlock');
																
																$(
																		'#promoArticleListSearchPast tr[data-om]')
																		.addClass(
																				'hideBlock');
																console
																		.log(trList.length);
																trList
																		.removeClass('hideBlock');
																trList.each(function(){
																	$(this).prev('tr').removeClass('hideBlock');
																	var id=$(this).attr('data-tt-id');
																	if($(this).find('.collapsed').length==1)
																	$('tr[data-tt-parent-id="'+id+'"]').show();
																});
															}

															visible = true;
														}
														if (!visible) {
															toFilerList
																	.removeClass('hideBlock');
															toFilerList.each(function(){
																$(this).prev('tr').removeClass('hideBlock');
																var id=$(this).attr('data-tt-id');
																if($(this).find('.collapsed').length==1)
																$('tr[data-tt-parent-id="'+id+'"]').show();
															});
														}
													});
										});
					});
			
			var filterinputSearch=$('.FilterSearch');
			filterinputSearch.each(
					function() {
						var filterfor = $(this).attr('data-filterfor');
						console.log('for filter :' + filterfor);

						var event = 'keyup';
						if ($(this).hasClass('inputDate')
								|| $(this).hasClass('inputDateInput')) {
							event = 'change';
						}

						$(this).unbind(event);
						$(this)
								.on(
										event,
										function() {
											var visible = false;

											if (isShrunked) {
												toFilerList = $('#promoArticleListSearch tr[data-om]');
											} else {
											}// get rows from
											// globally;

											filterinputSearch
													.each(function() {
														var trList;
														var elem = $(this);
														console
																.log("elem"
																		+ elem
																				.val());
														if (elem.val()
																.trim() != '') {
															filterfor = elem
																	.attr('data-filterfor');
															filtertext = $(
																	this)
																	.val();
															console
																	.log('for filter :'
																			+ filterfor);
															if (!visible) {
																toFilerList
																		.addClass('hideBlock');
																 $('#promoArticleListSearch tr.headRow').addClass('hideBlock');
																$('#promoArticleListSearch').find('.expandsubrow ').hide();
																
																var toShow=toFilerList
																		.find(
																				'.'
																						+ filterfor
																						+ ':contains('
																						+ filtertext
																						+ ')')
																		.parent(
																				'tr');
																toShow.removeClass(
																				'hideBlock');
																toShow.each(function(){
																	$(this).prev('tr').removeClass('hideBlock');
																	var id=$(this).attr('data-tt-id');
																	if($(this).find('.collapsed').length==1)
																	$('tr[data-tt-parent-id="'+id+'"]').show();
																});

															} else {
																trList = $(
																		'#promoArticleListSearch tr[data-om]:visible .'
																				+ filterfor
																				+ ':contains('
																				+ filtertext
																				+ ')')
																		.parent(
																				'tr');
																$('#promoArticleListSearch').find('.expandsubrow:visible').hide();
																
																$(
																		'#promoArticleListSearch tr[data-om]')
																		.addClass(
																				'hideBlock');
																 $('#promoArticleListSearch tr.headRow').addClass('hideBlock');
																console
																		.log(trList.length);
																trList
																		.removeClass('hideBlock');
																trList.each(function(){
																	$(this).prev('tr').removeClass('hideBlock');
																	var id=$(this).attr('data-tt-id');
																	if($(this).find('.collapsed').length==1)
																	$('tr[data-tt-parent-id="'+id+'"]').show();
																});
															}

															visible = true;
														}
														if (!visible) {
															toFilerList
																	.removeClass('hideBlock');
															toFilerList.each(function(){
																$(this).prev('tr').removeClass('hideBlock');
																var id=$(this).attr('data-tt-id');
																if($(this).find('.collapsed').length==1)
																$('tr[data-tt-parent-id="'+id+'"]').show();
															});
														}
													});
										});
					});
			
			populateDepartment();
			getConfigData();
			securityMatrix();
		});






function getArticleSearchResult() {
var articleInfo='';
	
	articleInfo = $('#article').val().split('-')[0];
	
	//var param= { "ARTICLE_INFO":articleInfo,"AUTOSTOCK_IND":"N"};

	var articleNoFlag = "";
	var descFlag = "";
	var gtinFlag = "";
	var srcOfSupplyInd;
	var supplierNo;

		srcOfSupplyInd = "";
		supplierNo = "";

	if (isNaN((articleInfo).split('-')[0]))
		descFlag = "Y";
	else if (!isNaN((articleInfo).split('-')[0])
			&& (articleInfo).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((articleInfo).split('-')[0])
			&& (articleInfo).split('-')[0].length > 7)
		gtinFlag = "Y";
		nodeLevel = "";
		nodeId = "";
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" : articleNoFlag,
		"iv_gtin" : gtinFlag,
		"iv_article" : articleInfo,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : supplierNo,
		"iv_src_supply" : srcOfSupplyInd,
		"iv_ranged" : "Y",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : $('#posSite').val(),
		"iv_node_id" : nodeId,
		"iv_node_level" : nodeLevel,
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : "",
		"iv_auto_stockr_flag" : "N",
		"iv_delisted_flag" : "N",
		"iv_uom_flag" : "Y"
	};
	console.log(articleSearchInISPUrl + ' ' + JSON.stringify(param));

	
	$.ajax({
		type : "post",
		url : articleSearchInISPUrl,
		data : JSON.stringify(param),
		
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
		    if (response.length > 1) {
				$('#searchText').text($('#article').val());
				$('#searchArticleCount').text(response.length);
				$('#articleSearchTbody').html(
						populateSearchResult(response));
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text(
				'Select Articles');
				$('#addtolist').parent().parent().removeClass('hideBlock');
				$('#addtolist').text("Add To List");
				$("#dialog-mulipleArticles").dialog("open");
				bindCheckboxevent();
			} else if (response.length == 1 && response[0].article != undefined) {
				if(response[0].alc_status != '' &&(response[0].alc_status =='ES' || response[0].alc_status == 'EC' ))
				{
				var content='Article ';
				content+=response[0].article;
				content+=' is blocked and cannot be added to this promotion';
				showInformation(content);
			}else if(response[0].ps_article_status != '' &&(response[0].ps_article_status == '08' || response[0].ps_article_status == 'ZA' ))
			{
				if($('#start').val() != '' && $('#end').val() != '')
					{
					var from=formatDateMobi(response[0].ps_stat_start_date);
					var to=formatDateMobi(response[0].ps_stat_end_date);
					var check1=$('#start').val();
					var check2=$('#end').val();
					var articleStatus='';
					if(response[0].ps_article_status == 'ZA')
						{
						articleStatus='Archived';
						}
					else if(response[0].ps_article_status == '08')
						{
						articleStatus='Recalled';
						}
					if(liesBetweenDateRange(from,to,check1) ||  liesBetweenDateRange(from,to,check2))
						{
						var content='Article ';
						content+=response[0].article;
						content+=' is '+articleStatus
						+' for the date range from '+from
						+' to '+to;
						showInformation(content);
						}
					else
					{

					addSingleArticleToPromoList(response[0]);
					showPromoList();
						
					}
					}
				}
				else
					{
				addSingleArticleToPromoList(response[0]);
				showPromoList();
					}
				resetSearchFields();
			} else {
				showError("No Data Found.");
				stopLoading();
			}
		    
			stopLoading();
		},
		error : function() {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});


}

function getArticleInfo(data) {

	var param={"inStorePromoArticleInfoList":$.parseJSON(data)};
	//console.log(param);
	$.ajax({
		type :"post",
		url  :"moreArticleInfoForClearance.htm",
		contentType :"application/json",
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			if (message == 'success' && dataObj!=undefined && dataObj.inStorePromoArticleInfoList!=undefined) {	
				if(validateNextDeliveryDate(dataObj)){
					generateList(dataObj);
				}
			} else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			}
			else {
				if(message==undefined){
					message="Technical issue occured.Please contact java support.";
				}else if(message == 'success'){
					message="Technical issue occured in services.Please contact java support.";
				}
				//console.log(message);
				showError(message);
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}

function validateNextDeliveryDate(dataObj){
//	var errors='';
//	var flag=false;
//	
//	for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
//		obj=dataObj.inStorePromoArticleInfoList[i];
//		if(null!=obj.deliveryDate && obj.deliveryDate.trim()!=''&& obj.deliveryDate.trim()!=undefined){
//			
//		}else{
//			errors+=getError(obj.articleNo, 'No vaild delivery is available for the selected start date');
//			flag=true;
//		}
//	}	
//
//	if(flag){
//		showWarning(errors);
//		return true;
//	}
	return true;
}

function generateList(dataObj){
	loadMoreInfoFromService($.parseJSON(dataObj));
	//addToMyDrafts($.parseJSON(dataObj));
	$('#instructionalText1').removeClass('hideBlock')
	.addClass('hideBlock');
	$('#instructionalText2').removeClass('hideBlock');
	$('#addActionBtn').removeClass('hideBlock').addClass('hideBlock');
	$('#tableAddAction').removeClass('hideBlock').addClass('hideBlock');
	$('#beforePublish').removeClass('hideBlock').addClass('hideBlock');
	$('#afterPublishDiv').removeClass('hideBlock');
	$("#PublishButton").addClass('disabled');
	$("#validateButton").removeClass('disabled');
	expandTable($.parseJSON(dataObj));
}

function populateSearchResult(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn"><!--<input type="checkbox" name="articlecheckboxSelectAll" >-->Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTr(list[i]);
	}
	return content;
}

function getTr(obj) {
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var tr = '<tr data-om="'
			+ (obj.om != null && obj.om != undefined ? obj.om : '1')
			+ '" data-supplier="'
			+ obj.supplier
			+ '" data-stdPrice="'
			+ (obj.standard_sell_price != null && obj.standard_sell_price != undefined ? 
					Number(obj.standard_sell_price).toFixed(2) : '0')
			+ '" data-promoPrice="0'
			+'" data-alcStatus="'
			+ (obj.alc_status  != null && obj.alc_status  != undefined ? 
							obj.alc_status  : '')
			+'" data-articleStatus="'
			+ (obj.ps_article_status  != null && obj.ps_article_status  != undefined ? 
							obj.ps_article_status  : '')
			+'" data-psStartDate="'
			+ (obj.ps_stat_start_date  != null && obj.ps_stat_start_date  != undefined ? 
							obj.ps_stat_start_date  : '')
			+'" data-psEndDate="'
			+ (obj.ps_stat_end_date  != null && obj.ps_stat_end_date  != undefined ? 
							obj.ps_stat_end_date  : '')
			+'" data-freshFoodFlag="'
			+ (obj.fresh_food_flag  != null && obj.fresh_food_flag  != undefined ? 
							obj.fresh_food_flag  : '')
			+'" data-department="'
			+ (obj.department  != null && obj.department  != undefined ? 
							obj.department  : '')
			+ '" data-ParentNo="'
			+  articleNo
			//+
			+ '" ><td id="articleNo">'
			+  articleNo
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ (obj.article_uom != null && obj.article_uom != undefined ? obj.article_uom : '')
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
	return tr;
}

function showError(msg) {
	$('#errorMsgDiv').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}

function showErrorClr(msg) {
	$('#errorMsgDivClr').removeClass('hideBlock');
	$('#errorMsgDivClr').addClass('errorDiv').find('#errorMsg').text(msg);
}

function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}
function hideErrorClr() {
	$('#errorMsgDivClr').addClass('hideBlock');
}
function hideErrors(){
	$('.ContentTableWrapperError').addClass('hideBlock');
}

function bindCheckboxevent() {
	$('#addtolist').addClass('hideBlock');
	$('input[name="articlecheckbox"]').change(
			function() {
				var size = $('input[name="articlecheckbox"]:checked').length;
				if (size > 0) {
					$('#addtolist').text("Add To List(" + size + ")")
							.removeClass('hideBlock');
				} else {
					$('#addtolist').text("Add To List").addClass('hideBlock');
				}
				if($('input[name="articlecheckbox"]').length==size){
					$('input[name="articlecheckboxSelectAll"]').prop('checked',true);
				}else{
					$('input[name="articlecheckboxSelectAll"]').prop('checked',false);
				}
			});
	$('input[name="articlecheckboxSelectAll"]').change(function(){
		if($(this).is(':checked')){
			$('input[name="articlecheckbox"]').prop('checked',true);
		}else{
			$('input[name="articlecheckbox"]').prop('checked',false);
		}
		$('input[name="articlecheckbox"]').trigger('change');
	});
}
function addArticleToPromoList() {
	var drafts=[];
	var alcFailedItems=[];
	var psArticleMap={};
	$('input[name="articlecheckbox"]:checked').each(
			function() {
				var rowObj = $(this).parent().parent();
				var articleNo = rowObj.find('#articleNo').text();
				var description = rowObj.find('#description').text();
				var uom = rowObj.find('#uom').text();
				var supplier = rowObj.attr('data-supplier');
				var stdPrice = rowObj.attr('data-stdPrice');
				var promoPrice=rowObj.attr('data-promoPrice');
				var parentNo = rowObj.attr('data-ParentNo');
				var om = rowObj.attr('data-om');
				var startDate = $('#start').val();
				var endDate = $('#end').val();
				var dispType = $('#adType').val();
				var dispText = $('#adType').find(
						'option[value="' + dispType + '"]').text();
				var id = articleNo.trim() + '_' + uom.trim();
				var alcStatus = rowObj.attr('data-alcStatus');
				var articleStatus = rowObj.attr('data-articleStatus');
				var psStartDate = rowObj.attr('data-psStartDate');
				var psEndDate = rowObj.attr('data-psEndDate');
				var freshFoodFlag = rowObj.attr('data-freshFoodFlag');
				var department = rowObj.attr('data-department');
				var psArtcleArray=[];
				var flag =true;
				if(alcStatus!='' &&(alcStatus =='ES' || alcStatus == 'EC'))
				{
				alcFailedItems.push(getDraftObj(articleNo, description, uom, id, supplier,
						om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag));
				flag= false;
				}
				else if(articleStatus == '08' || articleStatus == 'ZA' )
				{
				if($('#start').val() != '' && $('#end').val() != '')
					{
					var from=formatDateMobi(psStartDate);
					var to=formatDateMobi(psEndDate);
					var check1=$('#start').val();
					var check2=$('#end').val();
					if(liesBetweenDateRange(from,to,check1) ||  liesBetweenDateRange(from,to,check2))
						{
						psArtcleArray["articleNo"]=articleNo;
						psArtcleArray["uom"]=uom;
						psArtcleArray["from"]=from;
						psArtcleArray["to"]=to;
						psArtcleArray["articleStatus"]=articleStatus;
						psArticleMap[id]=psArtcleArray;
						flag = false;
						}
					}
				
				}
				if(flag)
					{
				if ($('#row-' + id).length == 0) {
					$('#promoList #promoListTbody').append(
							getPromoItemAsHTML(articleNo, description, uom, id,
									supplier, om, startDate, endDate, dispType,
									dispText,stdPrice,promoPrice,parentNo,status,$('#loginUserId').val(),department,freshFoodFlag));
					$("#row-" + id).find("#dispType").val(dispType);
					bindSaveAndDelete(id);
					showPromoList();
					shrunkTable();
					drafts.push(getDraftObj(articleNo, description, uom, id, supplier,
							om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag));
					
				} else {
					//console.log('Article already exist:' + articleNo);

					//console.log('overwrite date :' + articleNo);
					if(startDate!=''){
						$("#startDateEdit-"+id).find('input').val(startDate);
						$("#startDate-"+id).text(startDate);
					}
					
					if(endDate!=''){
						$("#endDateEdit-"+id).find('input').val(endDate);
						$("#endDate-"+id).text(endDate);
					}
					
					if(dispType!=''){
						$("#advDisplayEdit-"+id).find('input').val(dispType);
						$("#advDisplay-"+id).text(dispText);
					}
				
					
				}
				$(("#row-").concat(id)).find('input,select').trigger('change');
					}
			});
	resetSearchFields();
	checkOrUncheckAll();
	modifyDraft(drafts);
	if(alcFailedItems.length > 0 || !isEmptyMap(psArticleMap))
	{

	var content='Articles ';
	for(var i=0;i<alcFailedItems.length;i++)
		{
			content+=alcFailedItems[i].MATNR;
			if(i != alcFailedItems.length - 1)
				content+=', ';
			else if(i == alcFailedItems.length - 1)
				content+=' ';
		}
	content+='are blocked and cannot be added to this promotion';
	if(alcFailedItems.length == 0)
		content='';
	showInformation(content,getPSArticleStatusMessage(psArticleMap));		
	
	}
	 // calendar autoformatting
				    $('input.inputDate.hasDatepicker').change(function()
					  {
				  $(this).val(formateDate($(this).val()));
					  });
	
}

function getPSArticleStatusMessage(psArticleMap)
{
	
var objectExists = false;	
var content ='';
	for(var m in psArticleMap)
		{
		objectExists = true;
		var articleStatus= '';
			if(psArticleMap[m].articleStatus == 'ZA' )
				{
				articleStatus='Archived';
				}
			else if(psArticleMap[m].articleStatus == '08')
				{
				articleStatus='Recalled';
				}
		content+= 'Article '+psArticleMap[m].articleNo+' is '+articleStatus+' for the date rage from '
		+psArticleMap[m].from+' to '+psArticleMap[m].to+'.' ;
		}
	if(objectExists)
	{
	return content;		
	
	}
	else
		return '';
	
}


function addSingleArticleToPromoList(obj) {

	var articleNo = obj.article;
	var description = obj.article_desc;
	var uom = (obj.article_uom != null && obj.article_uom != undefined ? obj.article_uom : '');
	var supplier = '';
	var om = (obj.om != null && obj.om!= undefined ? obj.om : '');
	var parentNo = obj.article;
	var startDate = $('#start').val();
	var endDate = $('#end').val();
	var dispType = $('#adType').val();
	var dispText = $('#adType').find('option[value="' + dispType + '"]').text();
	var stdPrice = (obj.standard_sell_price != "" && obj.standard_sell_price != null 
			&& obj.standard_sell_price != undefined)? Number(obj.standard_sell_price).toFixed(2) :"0";
	var promoPrice = 0;
	var freshFoodFlag = (obj.fresh_food_flag || '') ;
	var department = (obj.department || '');
	var id = articleNo.trim() + '_' + uom.trim();

	if ($('#row-' + id).length == 0) {
		$('#promoList #promoListTbody').append(
				getPromoItemAsHTML(articleNo, description, uom, id, supplier,
						om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,$('#loginUserId').val(),department,freshFoodFlag));
		$("#row-" + id).find("#dispType").val(dispType);
		bindSaveAndDelete(id);
		checkOrUncheckAll();
		showPromoList();
		shrunkTable();
		var drafts=[];
		drafts.push(getDraftObj(articleNo, description, uom, id, supplier,
				om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag));
		modifyDraft(drafts);
	} else {
		//console.log('Article already exist:' + articleNo);
		if (startDate != '') {
			$("#startDateEdit-" + id).find('input').val(startDate);
			$("#startDate-" + id).text(startDate);
			$("#startDate-" + id).removeClass('errorField').attr('title', '');
		}

		if (endDate != '') {
			$("#endDateEdit-" + id).find('input').val(endDate);
			$("#endDate-" + id).text(endDate);
			$("#endDate-" + id).removeClass('errorField').attr('title', '');
		}
	}
	$(("#row-").concat(id)).find('input,select').trigger('change');
 // calendar autoformatting
				    $('input.inputDate.hasDatepicker').change(function()
					  {
				  $(this).val(formateDate($(this).val()));
					  });
}

function getPromoItemAsHTML(articleNo, description, uom, id, supplier, om,
		startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,user,department,freshFoodFlag) {
	status = status !="" && status != null && status != undefined ? status : 'Draft';
	om=(om=='0'?'1':om);
	if(stdPrice == null || stdPrice == '' || stdPrice == '0.00' || stdPrice == '0' || isNaN(stdPrice))
		stdPrice = promoPrice;
	var header = '<tr class=" hideBlock drillsOpenDefault collapsed rowHighlight defaultExpanded headRow row row-'
		+ id
		+ '"><td colspan="18"><strong>'
		+ articleNo
		+' '
		+ '-'
		+ ' '
		+ description + '</strong></td></tr>';
	var checkbox = '<td data-addon-sh><input type="checkbox"  class="promolistcheckbox" checked/></td>';
	var newelemt = '<td class="centerValue columnDivider standardPrice" data-addon data-bind="standardPrice" >'+stdPrice+'</td>'
			+'<td class="centerValue columnDivider promoPrice" data-addon data-bind="promoPrice" >'+promoPrice+'</td>'
			+'<td id="newPrice-'
			+ id
			+ '" class="centerValue newPrice" data-addon></td> <td data-bind="newPrice" id="newPriceEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable> <input type="text" value="" class="editNumCell textbox textboxDefaultText">'
			+ '<span class="radioOptions"> <input type="radio" class="dol" name="newprice'
			+id
			+'" id="dol" checked=""><label for="dol">$</label>'
			+'<input type="radio" class="per" name="newprice'
			+id
			+'" id="per"><label for="per">%</label></span>'
			+' </td><!-- <td id="limitQty-'
			+ id
			+ '" class="centerValue limitQty"  data-addon></td> <td id="limitQtyEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable data-bind="limitQty"> <input type="text" value="" class="editNumCell textbox textboxDefaultText"> </td> -->';
	var diptype = '<td id="advDisplay-'
				+ id
				+ '" class="centerValue columnDivider advDisplay" data-addon>'
				+ dispText
				+ '</td> <td id="advDisplayEdit-'
				+ id
				+ '" class="centerValue columnDivider hideBlock" data-addon-editable data-bind="competitor"><select class="combobox editSelectCell" style="width: 78px;" id="dispType" style="white-space: nowrap;">'
				+ adType + '</select></td>';
	var row = header 
			+'<tr id="row-'
			+ id
			+ '" data-tt-id="'
			+ id
			+ '" class="drillsOpenDefault editRow collapsed innerRow" data-om="'
			+ om
			+ '" data-supplier="'
			+ supplier
			+ '" data-addedBy="'
			+ user
			+ '" '
			+' data-freshFoodFlag="'
			+freshFoodFlag
			+'"'
			+' data-department="'
			+department
			+'"'
			+'>'
			+ checkbox
			+ ' <td data-addon class="draftRow expanded"><span class="indenter" style="padding-left: 0px;"><a class="creatdArticle" title="Expand">&nbsp;</a></span>&nbsp;</td> <td class="articleNo headH" data-bind="articleNo" >'
			+ articleNo
			+ '</td> <td class="description headH " style="white-space: nowrap;" data-bind="desc">'
			+ description
			+ '</td> <td class="centerValue columnDivider uom  " data-bind="articleUom">'
			+ uom
			+ '</td>'
			+ '<td id="startDate-'
			+ id
			+ '" class="centerValue startDate">'
			+ startDate
			+ '</td> <td data-bind="promoStartDate" id="startDateEdit-'
			+ id
			+ '" class="centerValue hideBlock"><input type="text" maxlength="10" class="textbox textboxDefaultText inputDate editDateCell " maxlength="10" placeholder="dd/mm/yyyy" id="start-'+id+'" value="'
			+ startDate
			+ '"></td> <td id="endDate-'
			+ id
			+ '" class="centerValue endDate">'
			+ endDate
			+ '</td> '
			
			+'<td data-bind="promoEndDate" id="endDateEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock"><input maxlength="10" type="text" class="textbox textboxDefaultText inputDate editDateCell " maxlength="10" placeholder="dd/mm/yyyy" id="end-'+id+'" value="'
			+ endDate
			+ '" ><label class="hideBlock parentNo" data-parentNo="'+parentNo+'" ></label></td> '
			+ newelemt
			+ diptype
			+ ' <td class="centerValue columnDivider status">'+status+'</td> <td class="lastColumn center-align"><label class="linkBtn editRowBtn" id="editRecord-'
			+ id
			+ '"> <label class="editRecord" id="editRecordBtn-'
			+ id
			+ '">Edit</label> </label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-'
			+ id
			+ '"> <label class="saveRecord" id="saveRecordBtn-'
			+ id
			+ '">Save</label> </label> <label class="linkBtn" id="DeleteRecord-'
			+ id + '"> <label class="deleteRecord" id="deleteRecordBtn-' + id
			+ '">Delete</label> </label></td> </tr>';
	var expand = '<tr data-tt-id="2" data-tt-parent-id="'
			+ id
			+ '" class="expandsubrow collapsed row-'
			+ id
			+ '" style="display: none;" d> <td colspan="15"><span class="indenter" style="padding-left: 19px;"></span> <table cellspacing="0" class="ContentTable" width="100%"> <tbody id="promoSecondTbody"> <tr> <td class="keyInfo" width="10%"> Supplier: </td> <td class="valueInfo lastColumn" colspan="5"> '
			+ supplier
			+ ' </td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"> <label class="history">Sales History</label> <!-- <label class="notes tooltip" title="Sample text for notes" id="notes-'
			+ id
			+ '">Notes</label> <label class="notes hideBlock" id="notesEdit-'
			+ id
			+ '"><input type="textbox" class="textbox articleSearchText" placeholder="Enter notes"></label> --></td> </tr> </tbody> </table> </td> </tr>';
	row += expand;
	return row;
}
function bindSaveAndDelete(id) {
	//bind event for sales history click
	$('tr[data-tt-parent-id="'+id+'"]').find('.history').click(function(){
		getPromoAddtionalDtls(id.split('_')[0], $("#startDateEdit-"+id).find('input').val(), id
				.split('_')[1], $(this));
	});
	
	//bind datepick event
	Date.format = 'dd/mm/yy';
	$(("#row-").concat(id)).find(".inputDateInput").datepicker({
		zIndex : 50
	});

	$(("#row-").concat(id)).find(".inputDate").datepicker({
		zIndex : 50
	});
	
	/* when edit button is clicked displays input box in editable cells */
	$(("#editRecordBtn-").concat(id)).click(function() {

	//	$(("#row-").concat(id)).addClass('rowHighlight');
		//console.log("***"+id);

		// $(("#UOMEdit-").concat(id)).removeClass('hideBlock');
		// $(("#UOM-").concat(id)).addClass('hideBlock');

		$(("#startDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#startDate-").concat(id)).addClass('hideBlock');

		$(("#endDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#endDate-").concat(id)).addClass('hideBlock');

		$(("#notesEdit-").concat(id)).removeClass('hideBlock');
		$(("#notes-").concat(id)).addClass('hideBlock');

		$(("#saveRecord-").concat(id)).removeClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');

		if ($(".standardPrice").hasClass('expanded')) {
			
			//$(("#limitQtyEdit-").concat(id)).find('input').attr('value','0');
			$(("#newPriceEdit-").concat(id)).removeClass('hideBlock');
			$(("#newPrice-").concat(id)).addClass('hideBlock');

			//$(("#limitQtyEdit-").concat(id)).removeClass('hideBlock');
			//$(("#limitQty-").concat(id)).addClass('hideBlock');
			
			$(("#advDisplayEdit-").concat(id)).removeClass('hideBlock');
			$(("#advDisplay-").concat(id)).addClass('hideBlock');

		}
		
		//###to uncomment code
		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');
		//###end

	});
	
	//added records should be editable as default
	$(("#editRecordBtn-").concat(id)).trigger('click');

	/* when save button is clicked displays input box is disabled */
	$(("#saveRecordBtn-").concat(id)).click(function() {
		
		$(("#row-").concat(id)).find('input,select').parent().each(function(){
			try{
				var labelid=$(this).attr('id').split('-')[0].replace('Edit','');
				$(("#"+labelid+'-').concat(id)).text($(this).find('input').val());
			}catch(err){
				
			}
		});	
		

	//	$(("#row-").concat(id)).removeClass('rowHighlight');

		// $(("#UOMEdit-").concat(id)).addClass('hideBlock');
		// $(("#UOM-").concat(id)).removeClass('hideBlock');

		$(("#startDateEdit-").concat(id)).addClass('hideBlock');
		$(("#startDate-").concat(id)).removeClass('hideBlock');

		$(("#endDateEdit-").concat(id)).addClass('hideBlock');
		$(("#endDate-").concat(id)).removeClass('hideBlock');

		

		$(("#notesEdit-").concat(id)).addClass('hideBlock');
		$(("#notes-").concat(id)).removeClass('hideBlock');

		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).removeClass('hideBlock');

		if ($(".standardPrice").hasClass('expanded')) {

			$(("#newPriceEdit-").concat(id)).addClass('hideBlock');
			$(("#newPrice-").concat(id)).removeClass('hideBlock');

		//	$(("#limitQtyEdit-").concat(id)).addClass('hideBlock');
			//$(("#limitQty-").concat(id)).removeClass('hideBlock');
			
			$(("#advDisplayEdit-").concat(id)).addClass('hideBlock');
			$(("#advDisplay-").concat(id)).removeClass('hideBlock');

		}
		
		
		
		//###to uncomment code
		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');
		//###end

	});

	// for expand event
	$("tr[data-tt-id='" + id + "']").find('a[title="Expand"]').click(
			function() {
				$("tr[data-tt-parent-id='" + id + "']").toggle();
				
				if($(this).parent().parent().hasClass('expanded')){
					$(this).parent().parent().removeClass('expanded');
					$(this).parent().parent().addClass('collapsed');					
				}else{
					$(this).parent().parent().removeClass('collapsed');
					$(this).parent().parent().addClass('expanded');
				}
				checkExpandAllorCollapseAll();
			});

	// for delete event
	$("#deleteRecordBtn-" + id).click(function() {
		confirmation(confirmmsg,id);
	});
	$(".promolistcheckbox").unbind('click');
	$(".promolistcheckbox").click(
			function() {
				var size = $(".promolistcheckbox:checked").length;
				checkOrUncheckAll();
				if (size == $(".promolistcheckbox").length) {
					$("#promolistcheckboxall").prop('checked', true);
					if($('#listOption').val()=='allDrafts')
					{
						$('.userCheckBox').prop('checked',true);
					}
				} else {
					$("#promolistcheckboxall").prop('checked', false);
				}
				console.log('in here ');
				var $headerRow = $(this).closest('tr','.groupHeader').prev(':visible');
				if($headerRow.length == 0)
					$headerRow =  $(this).closest('tr').prevUntil('.groupHeader').last().prev();
				var $rowsBetween = $headerRow.nextUntil('.groupHeader');
				var rowLength = $rowsBetween.length/3;
				var checkedLength = $rowsBetween.find('.promolistcheckbox:checked').length;
				if($('#listOption').val()=='allDrafts')
				{
				if($(this).is(':checked'))
					{
					if(rowLength == checkedLength)
					$headerRow.find('.userCheckBox').prop('checked',true);
					}
				else
					{
					$headerRow.find('.userCheckBox').prop('checked',false);
					}
				}

	});
	
	$(("#row-").concat(id)).find('input,select').change(function(){
		$(("#row-").concat(id)).find('.status').text('Draft');
		$("#PublishButton").addClass('disabled');
		$("#validateButton").removeClass('disabled');
		var $newPrice= $(("#row-").concat(id)).find('td[data-bind="newPrice"] .textbox');
		if($newPrice.hasClass('errorField')){
			$newPrice.removeClass('errorField').prop('title','');
				}
		$(("#row-").concat(id)).find('input,select').parent().each(
				function() {
					try {
						var labelid = $(this).attr('id').split('-')[0]
								.replace('Edit', '');
						$(("#" + labelid + '-').concat(id)).text(
								$(this).find('input').val());
					} catch (err) {

					}
		});
	});

	$(".combobox").combobox({ 
	    select: function (event, ui) {
	    	var obj = $(ui.item).parent().closest('tr');
	    	obj.find('td[data-bind="competitor"] input').removeClass(errorFieldClass);
			removetooltip(obj.find('td[data-bind="competitor"] input'));
			obj.find('td.advDisplay').text($(this).val());
			obj.find('.status').text('Draft');
			$("#PublishButton").addClass('disabled');
			$("#validateButton").removeClass('disabled');
	    }
	});
	
	//$("#row-" + id).find(".editNumCell").numbersonly();
	
	//$("#row-" + id).find('#limitQtyEdit-'+id+' .editNumCell').within999();
	
	$("#row-" + id).find('#newPriceEdit-'+id+' .editNumCell').isNumberOrDecimal();
	
	//change start date on delivery date chage && build enable and disable
	$("#deliveryDateEdit-" + id).find('input').change(function(){
		if(isValidDate($(this).val())){
			$("#startDateEdit-" + id).find('input').val($(this).val());
			
			// build is readonly if Today's Date is up to 48hours prior to Delivery Date
			if(Number(diff(getCurentDateTxt(),$(this).val()))<=2){
				$(("#build-").concat(id)).text('');
				$(("#buildEdit-").concat(id)).find('input').val('');
				$(("#buildEdit-").concat(id)).find('input').attr('readonly','readonly').attr('style','background: rgb(217, 217, 217);');
				$(("#buildEdit-").concat(id)).find('input').addmsg('Field is readonly if Today\'s Date is up to 48hours prior to Delivery Date');
			}else{
				$(("#buildEdit-").concat(id)).find('input').removeAttr('readonly').removeAttr('style');
				$(("#buildEdit-").concat(id)).find('input').removemsg();
			}
		}
	});
	
	//
	$("#startDateEdit-" + id).find('input').change(function(){
		setTimeout(function(){ 
			var flag=validateStartAndEndDate($('#row-'+id));		
			
			if(flag && !$("#startDateEdit-" + id).find('input').hasClass('errorField') && $('#listOption').is(':disabled'))
			{
			var item=$.parseJSON(getRowAsJSONStr($("#row-" + id)));
			var itemArray = [];
			itemArray.push(item);
			loadMoreInfoFromService(itemArray);
			}
		}, 100);
		
	});
	
	$("#endDateEdit-" + id).find('input').change(function(){
		setTimeout(function(){ 
			var flag = validateStartAndEndDate($('#row-'+id));
			if(flag && !$("#endDateEdit-" + id).find('input').hasClass('errorField') && $('#listOption').is(':disabled'))
			{
			var item=$.parseJSON(getRowAsJSONStr($("#row-" + id)));
			var itemArray = [];
			itemArray.push(item);
			loadMoreInfoFromService(itemArray);
			}
			
		}, 100);
	});
	
	//for Limit qty change
	
	/*$("#limitQtyEdit-" + id).find('input').change(function(){
//		setTimeout(function(){ 
			validateLimitQty($('#row-'+id));
//		}, 100);
	});*/
	
	// for new price change
	//$("#newPriceEdit-" + id).find('input[type="text"]').unbind('change');
	$("#newPriceEdit-" + id).find('input[type="text"]').change(function(){
		if(($('#row-'+id).find('.per').is(':checked') || $('#row-'+id).find('.dol').is(':checked'))&& $("#newPriceEdit-" + id).find('input[type="text"]').val() != '')
		{
		setTimeout(function(){ 
			validateNewPrice($('#row-'+id));
		}, 10);
	
		}
});
	
	
	$('.expandAll_drafts').unbind('click');
	//for expand all event in drafts
	$('.expandAll_drafts').click(function()
			{
		if(!$('#expandAll').hasClass('hideBlock'))
			{
		$('#expandAll').addClass('hideBlock');
		$('#collapseAll').removeClass('hideBlock');
		$('#promoListTbody .draftRow:visible').removeClass('expanded').addClass('collapsed');
		$('#promoListTbody .draftRow:visible').closest('tr').next('tr').css('display','table-row');
			}
		else
			{
			$('#expandAll').removeClass('hideBlock');
			$('#collapseAll').addClass('hideBlock');
			
			$('#promoListTbody .draftRow:visible').addClass('expanded').removeClass('collapsed');
			$('#promoListTbody .draftRow:visible').closest('tr').next('tr').css('display','none');
			}
		//$('.draftRow:visible').find('a[title="Expand"]').trigger('click');
		
			});
	
	$('.per').unbind('click');
	$('.per').click(function(){
		if($('.per').is(':checked'))
		{
		$(this).parent().prev('input').val('');
		}
		});
	
	$('.dol').unbind('click');
	$('.dol').click(function(){
		if($('.dol').is(':checked'))
		{
		$(this).parent().prev('input').val('');
		}
		});
	$('.dol').trigger('click');
}

function showPromoList() {
	if ($('#promoList #promoListTbody').find('tr').length > 1) {
		$("#promoList").removeClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock");
	} else {
		hidePromoList();
	}
}

function hidePromoList() {
	if ($('#promoList #promoListTbody').find('tr:visible').length <= 0) {
		$("#promoList").removeClass("hideBlock").addClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock").addClass("hideBlock");
		isShrunked = true;
		$("#afterPublishDiv").removeClass("hideBlock").addClass("hideBlock");
		$("#tableAddAction").removeClass("hideBlock");
		$("#addActionBtn").removeClass("hideBlock");
		
		$('#instructionalText2').removeClass('hideBlock')
		.addClass('hideBlock');
		$('#instructionalText1').removeClass('hideBlock');
		
	}
	var checkboxLength = $(".promolistcheckbox:checked").length;
	var size = ('0' + checkboxLength).slice(-2) ;
	if (size == 0) {
		$('#beforePublish').find('.thumbUp').text(
				'Proceed to Create');
		
	} else {
		$('#beforePublish').find('.thumbUp').text(
				'Proceed to Create(' + size + ')');
	}
	checkOrUncheckAll();
}

function hidePromoListOnDelete() {
	
	var size = $(".promolistcheckbox:checked").length;
	if (size == 0 && $('#promoList tbody').find('tr:visible').length < 1) {
		$('#backBtn').trigger('click');
		//$('#submitQuery')[0].reset();
	}else{
		hidePromoList();
	} 
	
	if($('#promoList tbody').find('tr').length < 1){
		$('#listOption').prop('disabled',false);
	}
}

function shrunkTable() {	
	
	
	$('#listOption').removeAttr('disabled');
	$('td[data-addon-sh]').removeClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('expanded').addClass('shrunked');
	$('td[data-addon-editable]').removeClass('expanded').addClass('shrunked');
	$('td[data-addon-editable]').removeClass('hideBlock').addClass('hideBlock');
	$('th[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('.expandsubrow').hide();
	$('th[data-changeColspan]').attr('colspan', '2');
	////******///// Muthu fix
	$('tr[data-om]').removeClass('hideBlock');
	isShrunked = true;
	$('#filterClear').trigger('click');
	
	// added for header on expand
	$('.headRow').addClass('hideBlock');
	$('.headH').removeClass('hideBlock');
	// end
}

function expandTable(dataObj) {	
	$('#listOption').prop('disabled','disabled');
	$('td[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('shrunked').addClass('expanded');
	$('td[data-addon-editable]').removeClass('shrunked').removeClass('collapsed').addClass('expanded');
	$('th[data-addon]').removeClass('hideBlock');
	$('th[data-changeColspan]').attr('colspan', '3');
	$('#filterClear').trigger('click');
	
	// added for header on expand
	$('.headRow').addClass('hideBlock');
	$('.headH').addClass('hideBlock');
	// end
	
	$('tr[data-om]').addClass('hideBlock');
	for(var i=0;i<dataObj.length;i++){
		var item=dataObj[i];
		var id=Number(item.articleNo)+'_'+item.articleUom;		
		
		if ($('#row-' + id).find('.promolistcheckbox').is(':checked') == false)
			continue;

		$('#row-' + id).removeClass('hideBlock');
		$('.row-' + id).each(function() {
			if ($(this).hasClass('headRow')) {
				$(this).removeClass('hideBlock');
			}
		});
		
		
		/*if(null!=item.standardPrice && item.standardPrice!=''&& item.standardPrice!=undefined){
			$('#row-'+id).find('td[data-bind="standardPrice"]').text(item.standardPrice);
		}
		else{
			$('#row-'+id).find('td[data-bind="standardPrice"]').text('0');
		}
		
		if(null!=item.promoPrice && item.promoPrice!=''&& item.promoPrice!=undefined){
			$('#row-'+id).find('td[data-bind="promoPrice"]').text(item.promoPrice);
		}
		else{
			$('#row-'+id).find('td[data-bind="promoPrice"]').text('0');
		}
		
		if(null!=item.om && ""!=item.om && item.om!=undefined){
			$('#row-'+id).attr('data-om',dataObj.om);
		}
		else{
			$('#row-'+id).attr('data-om','0');
		}*/
		
		
	}
	toFilerList=$('tr[data-om]:visible');
	$('.editRecord').trigger('click');
	
	isShrunked = false;
	checkExpandAllorCollapseAll();
}

function showAllErrors(content) {
	$('#errorWrapper').removeClass('hideBlock');
	$('#validateErrors').html(content);
}
function showWarning(content) {
	$('#warningWrapper').removeClass('hideBlock');
	$('#warningList').html(content);
}

function showTips() {
	$('.quickHelpWrapper').removeClass('hideBlock');
}
function hideTips() {
	$('.quickHelpWrapper').removeClass('hideBlock').addClass('hideBlock');
}

function validateDraft(rowList) {
	var flag=true;	
	var allSavedFlag=true;
	
//	rowList.find('.promolistcheckbox:checked').each(function() {
//		var obj = $(this).parent().parent();
//		if(!obj.find('label.saveRowBtn').hasClass('hideBlock')){
//			allSavedFlag=false;
//		}
//	});
	
	if(allSavedFlag){	
		rowList.find('.promolistcheckbox:checked:visible').each(function() {
			var obj = $(this).parent().parent();
			var streq=obj.find('td[data-bind="promoStartDate"] input').required();
			var endreq=obj.find('td[data-bind="promoEndDate"] input').required();
			var streqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
			var endreqvalid=obj.find('td[data-bind="promoEndDate"] input').isValidDate();
		
			if(streq && endreq && streqvalid && endreqvalid){
				if(!validateStartAndEndDate(obj)){
					flag=false;
					obj.find('.editRecord').trigger('click');
				}
			}else{
				flag=false;
				obj.find('.editRecord').trigger('click');
			}
		});
	}else{
		flag=false;
		showError("Please save the changes before you proceed.");
	}
	
	return flag;
}

function validateStartAndEndDate(obj) {
		var flag=true;
		var streq=obj.find('td[data-bind="promoStartDate"] input').required();
		var endreq=obj.find('td[data-bind="promoEndDate"] input').required();
		var streqvalid;
		var endreqvalid;
		var strNoPast;
		var endNoPast;
		var freshFoodFlag = obj.attr('data-freshFoodFlag');
		if(endreq && streq)
			{
		 streqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
		 endreqvalid=obj.find('td[data-bind="promoEndDate"] input').isValidDate();
			}
		if(endreqvalid && streqvalid)
			{
		 strNoPast = obj.find('td[data-bind="promoStartDate"] input').noPastValidation();
		 endNoPast = obj.find('td[data-bind="promoEndDate"] input').noPastValidation();
			}
		if(streq && endreq && streqvalid && endreqvalid && strNoPast && endNoPast){
			
				/*if(isSupers || isLiqure)
					{
					flag = obj.find('td[data-bind="promoEndDate"] input').sameDateValidation(obj.find('td[data-bind="promoStartDate"] input'));
					}
				else if (isBigw)
					{
					if (isThomas){
						var fl1=obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'));
						if(!fl1){
							return fl1;
						}
					}
					flag = obj.find('td[data-bind="promoEndDate"] input').oneMonthDateValidation(obj.find('td[data-bind="promoStartDate"] input'));
					}
				else
					{
					flag = obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'));
					}*/	
			if(freshFoodFlag == 'Y' && freshFoodDayLimit != null && freshFoodDayLimit != '')
				{
				flag = obj.find('td[data-bind="promoStartDate"] input').freshFoodDateValidation(obj.find('td[data-bind="promoEndDate"] input'));
				}
			else
			{
				flag = obj.find('td[data-bind="promoStartDate"] input').startEndValidationForOtherPromo(obj.find('td[data-bind="promoEndDate"] input'));
				if(flag){
					flag = obj.find('td[data-bind="promoEndDate"] input').oneMonthDateValidation(obj.find('td[data-bind="promoStartDate"] input'));					
				}
		}
				
		}else{
			flag=false;			
		}
	return flag;
}

function validateStartAndEndDateForSearch($start,$end) {
	var flag=true;
	if($start.val()!=''&&$end!=''){
		var streq=$start.required();
		var endreq=$end.required();
		var streqvalid=$start.isValidDate();
		var endreqvalid=$end.isValidDate();
			flag = $start.startEndValidationForOtherPromo($end);
			if(flag){
				flag = $end.oneMonthDateValidation($start);					
			}			
			
	}else if($start.val()!=''){
		flag=$start.noPastValidation();
	}else if($end.val()!=''){
		flag=$end.noPastValidation();
	}else{
		flag=false;			
	}
return flag;
}

function validateStartAndDlvry(obj) {
	var flag=true;
		var streq=obj.find('td[data-bind="deliveryDate"] input').required();
		var endreq=obj.find('td[data-bind="promoStartDate"] input').required();
		var streqvalid=obj.find('td[data-bind="deliveryDate"] input').isValidDate();
		var endreqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
		if(streq && endreq && streqvalid && endreqvalid){
			if(!obj.find('td[data-bind="deliveryDate"] input').dlvryDateValidation(obj.find('td[data-bind="promoStartDate"] input'))){
				flag=false;
			}
		}else{
			flag=false;			
		}
	return flag;
}

/*function validateLimitQty(obj) {
	var flag=true;
		var limitQtyRequired=obj.find('td[data-bind="limitQty"] input').required();
		var limitQtyValid=obj.find('td[data-bind="limitQty"] input').within999();
		
		if(!limitQtyValid || !limitQtyRequired){
			flag=false;			
		}
	return flag;
}*/

function validateCostPrice(obj){
	var costPrice = 0;
	var nprice = 0;
	
	//validation for cost price in local start xgsaa
	costPrice = obj.find('td[data-bind="standardPrice"]').attr('data_cost_price');
	nprice = parseFloat(obj.find('td[data-bind="newPrice"] input[type="text"]').val());
	obj.find('td[data-bind="newPrice"] input[type="text"]').removeClass('errorField');
	if((costPrice||'')!='' && Number(nprice)<Number(costPrice)){
		/*obj.find('td[data-bind="newPrice"] input[type="text"]').addClass('errorField');
		addtooltip(obj.find('td[data-bind="newPrice"] input[type="text"]'),
		"Promotional Price is less than Cost Price.");
		obj.find('td .tooltip').tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});*/
		return false;
	}
	//validation for cost price in local end xgsaa
	
	return true;
}

function validateNewPrice(obj) {
	if($(obj).find(".dol").is(':checked'))
		obj.find('td[data-bind="newPrice"] input[type="text"]').val(Number(obj.find('td[data-bind="newPrice"] input[type="text"]').val()).toFixed(2));
	var flag=true;
	var range = 0;
	if(isDesiredRole(roleMap,roleId))
		range = maxRangeValue;
	else
		range = minRangeValue;
		var newPriceValid=false;
		obj.find('td[data-bind="newPrice"] input[type="text"]').removeClass('errorField');
		/*if(!validateCostPrice(obj)){
			return false;
		}*/
		obj.find('td[data-bind="newPrice"] input[type="text"]').newPriceValidation(obj.find('td[data-bind="standardPrice"]')
				,obj.find('td[data-bind="promoPrice"]'),range);
		if(!obj.find('td[data-bind="newPrice"] input[type="text"]').hasClass('errorField') && !$(obj).find(".dol").is(':checked')
&& $(obj).find(".per").is(':checked'))
			{
			$(obj).find(".dol").prop('checked',true);
			}
		if(!newPriceValid){
			flag=false;			
		}
	return flag;
}

function validateNewPriceBeforeCreate(obj) {
	if($(obj).find(".dol").is(':checked'))
		obj.find('td[data-bind="newPrice"] input[type="text"]').val(Number(obj.find('td[data-bind="newPrice"] input[type="text"]').val()).toFixed(2));
	var flag=true;
	var range = 0;
	var roleId = $('#roleId').val();
	if(isDesiredRole(roleMap,roleId))
		range = maxRangeValue;
	else
		range = minRangeValue;
	obj.find('td[data-bind="newPrice"] input[type="text"]').removeClass('errorField');
	/*if(!validateCostPrice(obj)){
		return false;
	}*/
		flag = obj.find('td[data-bind="newPrice"] input[type="text"]').newPriceValidation(obj.find('td[data-bind="standardPrice"]'),obj.find('td[data-bind="promoPrice"]'),range);
		if(!obj.find('td[data-bind="newPrice"] input[type="text"]').hasClass('errorField') && !$(obj).find(".dol").is(':checked'))
		{
	$(obj).find(".dol").trigger('click');
		}
	return flag;
}

function getPostDataObj4ArticleInfo(rowList){
	var paramData=[];
	rowList.find('.promolistcheckbox:checked:visible').each(function() {
		var obj = $(this).parent().parent();
		if(obj.find('td[data-bind="promoStartDate"] input').startEndValidationForOtherPromo(obj.find('td[data-bind="promoEndDate"] input'))){
			var itemData=getRowAsJSON(obj);
			paramData.push(itemData);
		}
	});
	return paramData;
}

function getPostDataObj4ArticleInfoStr(rowList){
	var paramData='[';
	var i=1;
	var draftArray=[];
	rowList.find('.promolistcheckbox:checked').each(function() {
		var obj = $(this).parent().parent();
		var articleNo = obj.find('#articleNo').text();
		var description = obj.find('#description').text();
		var uom = obj.find('#uom').text();
		var parentNo = obj.attr('data-ParentNo');
		var startDate = obj.find('td[data-bind="promoStartDate"] input').val();
		var endDate =obj.find('td[data-bind="promoEndDate"] input').val();
		var dispType = obj.find('#adType').val();
		
		if(obj.find('td[data-bind="promoStartDate"] input').startEndValidationForOtherPromo(obj.find('td[data-bind="promoEndDate"] input'))){
			var itemData=getRowAsJSONStr(obj);
			paramData+=itemData;
		}
		i++;
		if(i!=rowList.find('.promolistcheckbox:checked').length+1){
			paramData+=",";
		}	
	});
	paramData+=']';

	//console.log(paramData);
	//paramData='[{"articleNo":"375287","desc":"HE Kitchen Meat Thermometer","articleUom":"EA","promoStartDate":"05/03/2015","promoEndDate":"05/03/2015","standardPrice":"0","promoPrice":"0","newPrice":"0","limitQty":"0","competitor":"Select"}]';
	return paramData;
}

function formProceedToCreateArticleContent(rowList){
	/*var paramData='[';
	var i=1;*/
	var draftArray=[];
	rowList.find('.promolistcheckbox:checked:visible').each(function() {
		var obj = $(this).parent().parent();
		var articleNo = obj.find('td[data-bind="articleNo"]').text();
		var description = obj.find('td[data-bind="desc"]').text();
		var uom = obj.find('td[data-bind="articleUom"]').text();
		var startDate =obj.find('td[data-bind="promoStartDate"] input').val();
		var endDate = obj.find('td[data-bind="promoEndDate"] input').val();
		var dispType = obj.find('#adType').val();

		var draft={
				"MATNR":articleNo,
				"MAKTX":description,
				"USER_ID":$('#loginUserId').val(),
				"MEINH":uom,
				"START_DATE":toMobilinkDate(startDate),
				"END_DATE":toMobilinkDate(endDate),
				"DISPLAY_TYPE":(dispType==undefined || dispType=='')?'F':dispType,
				"JOB_MODE":"I"
				};
		
		draftArray.push(draft);
		
	/*	if(obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'))){
			var itemData=getRowAsJSONStr(obj);
			paramData+=itemData;
		}
		i++;
		if(i!=rowList.find('.promolistcheckbox:checked').length+1){
			paramData+=",";
		}	*/
	});
	modifyDraft(draftArray);
	/*paramData+=']';
	//console.log(paramData);*/
	return draftArray;
}

function getRowAsJSON(obj){
	obj.find('td[data-bind]').each(function(){
		var name=$(this).attr('data-bind');
		var value;
		if($(this).find('input').length==1){
			value=$(this).find('input').val();
		}else{
			value=$(this).text();
		}
		$("body").data(name,value);
	});
	return $("body").data();
}

function getRowAsJSONStr(obj){
	var result='{';
	var i=1;
	obj.find('td[data-bind]').each(function(){
		var name=$(this).attr('data-bind');
		var value;
				if($(this).find('select').length == 1){
					value = $(this).find('select').val().trim();
				}else if ($(this).find('input[type="text"]').length == 1) {
					value = $(this).find('input[type="text"]').val().trim();
		}else{
			value=$(this).text().trim();
		}
		result+='"'+name+'":"'+value+'"';
		i++;
		if(i!=obj.find('td[data-bind]').length+1){
			result+=",";
		}
	});
	result+='}';
	//console.log(result);
	return result;
}


function validatebeforeCreatePromotion(rowList){
	var flag=true;
	clearAllErrors();
	var count=0;
	rowList.each(function() {
		var obj = $(this);
		var streq=obj.find('td[data-bind="promoStartDate"] input').required();
		var endreq=obj.find('td[data-bind="promoEndDate"] input').required();
		var newPriceReq=obj.find('td[data-bind="newPrice"] input[type="text"]').required("New price is mandatory.");
		var streqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
		var endreqvalid=obj.find('td[data-bind="promoEndDate"] input').isValidDate();
		
		var streqvalidpast=obj.find('td[data-bind="promoStartDate"] input').noPastValidation();
		var endreqvalidpast=obj.find('td[data-bind="promoEndDate"] input').noPastValidation();
		var newPriceValidate=false;
		if(newPriceReq){
			newPriceValidate= validateNewPriceBeforeCreate(obj);
		}
		var dateMonth=validateStartAndEndDate(obj);
		var competitorValue= obj.find('td[data-bind="competitor"] select').val();
		var comments = obj.find('td[data-bind="competitor"]').closest('tr').next().find('.notes input').val();
		var commentsValidate=true;
		var competitorValidate=true;
		//var limitQtyReq = obj.find('td[data-bind="limitQty"] input').required("Limit Qty is mandatory.");
		var freshFoodFlag = obj.attr('data-freshFoodFlag');
		if(isBigw == 'true')
			{
			if(competitorValue == 'Select')
				{
				obj.find('td[data-bind="competitor"] input').addClass(errorFieldClass);
				addtooltip(obj.find('td[data-bind="competitor"] input'),
						"Mandatory Field.");
				obj.find('td[data-bind="competitor"] select').change(function() {
					obj.find('td[data-bind="competitor"] input').removeClass(errorFieldClass);
					removetooltip(obj.find('td[data-bind="competitor"] input'));
				});
				competitorValidate=false;
				}
			}
					
		if(streq && endreq &&  streqvalid && endreqvalid && streqvalidpast && endreqvalidpast && newPriceReq && newPriceValidate && commentsValidate &&competitorValidate && dateMonth ){
			if(freshFoodFlag == 'Y' && freshFoodDayLimit != null && freshFoodDayLimit != '')
				{
				flag = obj.find('td[data-bind="promoStartDate"] input').freshFoodDateValidation(obj.find('td[data-bind="promoEndDate"] input'));
				}
			else
			{
			if(!obj.find('td[data-bind="promoStartDate"] input').startEndValidationForOtherPromo(obj.find('td[data-bind="promoEndDate"] input'))){
				flag=false;
				obj.find('.editRecord').trigger('click');
				count++;
			}
		}
		}else{
			flag=false;
			obj.find('.editRecord').trigger('click');
			count++;
		}
	});
	if(count!=0)
		flag=false;
	if(flag){
		data=getPostDataObj4ArticleInfoStr(rowList);
		callServiceForValidation(data);
	}else{
		var error = '';
		if($(this).find('.errorField').length==0){
			$(this).find('.status').html(verified);
		}else{
			$(this).find('.status').html(failed);
		}
		rowList.each(function() {
			var article = $(this).find('[data-bind="articleNo"]').text() + '('
					+ $(this).find('[data-bind="articleUom"]').text() + ') ';
			$(this).find('.errorField').each(function() {
				error += getError(article, $(this).attr('title'));
			});
			$(this).closest('tr').next().find('.errorField').each(function() {
				error += getError(article, $(this).attr('title'));
			});

		});

		if (error != '') {
			showAllErrors(error);
		}
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function callServiceForValidation(data) {

	var param={"inStorePromoArticleInfoList":$.parseJSON(data)};
	//console.log(param);
	$.ajax({
		type :"post",
		url  :"compValidate.htm",
		contentType :"application/json",
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			if (message == 'success' && dataObj!=undefined && dataObj.inStorePromoArticleInfoList!=undefined) {		
				if(validateNextDeliveryDateNExistance(dataObj)){
				updateList(dataObj);
				}
			}else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			} 
			else {
				if(message==undefined||message=='failed'){
					message="Technical issue occured.Please contact java support.";
				}else if(message == 'success'){
					message="Technical issue occured in services.Please contact java support.";
				}
				//console.log(message);
				showError(message);
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});
}

function updateList(dataObj){
	
	var errors='';
	var nullflag=false;
	if(null==dataObj){
		nullflag=true;
		errors='Store Cental Service failed.';
	}
	var idArr=[];
	if(dataObj.inStorePromoArticleInfoList != null && dataObj.inStorePromoArticleInfoList != undefined){
	for(var i=0;i<dataObj.inStorePromoArticleInfoList.length && !nullflag;i++){
		var itemerror='';
		var item=dataObj.inStorePromoArticleInfoList[i];
		var id=item.articleNo+'_'+item.articleUom;		
		var article=" "+item.articleNo;
		if(item.msg!=undefined && item.msg!='')
			{
			if(!((item.msg).toLowerCase().indexOf("less than cost price") > -1))
		itemerror+=getError(article,item.msg);
			/*else
				idArr.push(id);*/
			}
		if(!validateCostPrice($('#row-'+id))){
			idArr.push(id);
		}
//		//console.log("==== deliveryDateValidateStatusFlag"+item.deliveryDateValidateStatusFlag);
//		if(item.deliveryDateValidateStatusFlag!=null&& item.deliveryDateValidateStatusFlag!=undefined && item.deliveryDateValidateStatusFlag.trim()!=''&&item.deliveryDateValidateStatusFlag!='Y'){
//			itemerror+=getError(article,item.deliveryDateValidateStatusFlag);
//			$("#deliveryDateEdit-"+id).find('input').error(item.deliveryDateValidateStatusFlag);
//		}else{
//			$("#deliveryDateEdit-"+id).find('input').val(item.deliveryDate);
//			$("#deliveryDate-"+id).text(item.deliveryDate);
//		}
//		//console.log("===="+item.buildValidateStatusFlag);
//		if(item.buildValidateStatusFlag!=null&& item.buildValidateStatusFlag!=undefined && item.buildValidateStatusFlag.trim()!='' &&item.buildValidateStatusFlag!='Y'){
//			itemerror+=getError(article,item.buildValidateStatusFlag);
//			$("#buildEdit-"+id).find('input').error(item.buildValidateStatusFlag);
//		}
//		//console.log("==== displayValidateStatusFlag"+item.displayValidateStatusFlag);
//		if(item.displayValidateStatusFlag!=null && item.displayValidateStatusFlag!=undefined && item.displayValidateStatusFlag.trim()!='' && item.displayValidateStatusFlag!='Y'){
//			itemerror+=getError(article,item.displayValidateStatusFlag);
//			$("#displayEdit-"+id).find('input').error(item.displayValidateStatusFlag);
//		}
//		//console.log("====demandValidateStatusFlag "+item.demandValidateStatusFlag);
//		if(item.demandValidateStatusFlag!=null&& item.demandValidateStatusFlag!=undefined && item.demandValidateStatusFlag.trim()!='' &&item.demandValidateStatusFlag!='Y'){
//			itemerror+=getError(article,item.demandValidateStatusFlag);
//			$("#demandEdit-"+id).find('input').error(item.displayValidateStatusFlag);
//		}
		
		if(itemerror==''){
			$('#row-'+id).find('.status').html(verified);
		}else{
			$('#row-'+id).find('.status').html(failed);
			errors+=itemerror;
			$('#row-'+id).find('.editRecord').trigger('click');
		}
		
	}
}
	if(errors==''){
		var content='Competition Price is excessive for article ';
		for(var i=0;i<idArr.length;i++)
			{
			content+=idArr[i].split('_')[0]+' - ' + idArr[i].split('_')[1];
			if(i != idArr.length - 1)
				content+=', ';
		/*	else if(roleId != 'MA' && i == idArr.length - 1)
				content+='. ';
			else if(roleId == 'MA' && i == idArr.length - 1)
				content+=', ';*/
			else if(i == idArr.length - 1)
				content+=', ';
		}
		//if(roleId == 'MA')
		content+='Continue ?';
		if(idArr.length >= 1)
		newPriceConfirmation(content,idArr);
		$('#PublishButton').removeClass('disabled');
		$("#validateButton").addClass('disabled');
	}else{
		showAllErrors(errors);
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function callServiceForCreate() {
	$.ajax({
		type :"post",
		url  :"compCreate.htm",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			if (message == 'success') {				
				updateFailedList(dataObj);
			} 
			else {
				if(message==undefined){
					message="Technical issue occured.Please contact java support.";
				}else if(message == 'logout'){
					gotoHomeScreenSessionExpired();
				}else{
				//console.log(message);
				showError(message);
				}
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}

function updateFailedList(dataObj){
	
	var errors='';
	if(dataObj.msg!=null&&dataObj.msg.trim()!=''&&dataObj.msg!=undefined && dataObj.msg!='success'){
		errors=dataObj.msg;
	}else{
		var draftArray = [];
		for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
			var item=dataObj.inStorePromoArticleInfoList[i];
			var id=item.articleNo+'_'+item.articleUom;		
			var article=item.articleNo;
			
			if(item.promoCreateStatus=='Y'){
				var parentNo = $("#row-" + id).find('.parentNo').attr('data-parentno');
				var addedBy = '';
				addedBy= $("#row-" + id).attr('data-addedBy').trim();
				if(addedBy == '')
					addedBy= $('#loginUserId').val();
				var draft={
						"MATNR":id.split('_')[0],
						"MAKTX":"",
						"USER_ID":addedBy,
						"MEINH":id.split('_')[1],
						"START_DATE":"",
						"END_DATE":"",
						"DISPLAY_TYPE":"F",
						"JOB_MODE":"D",
						"ISIS_MATNR":parentNo,
						"PROMO_TYPE":"ZCOM",
						"STATUS":"Draft",
						"STATUS_MESSAGE":" "
						};
				
				draftArray.push(draft);
				$('#row-'+id).prev().remove();
				$('#row-'+id).next().remove();
				$('#row-'+id).remove();
			}else{
				$('#row-'+id).find('.status').html(failed);
				var parentNo = $("#row-" + id).attr('data-parentNo');
				var addedBy = '';
				addedBy= $("#row-" + id).attr('data-addedBy').trim();
				if(addedBy == '')
					addedBy= $('#loginUserId').val();
				errors+=getError(article,"Failed to create promotion.");
				draft={
						"MATNR":id.split('_')[0],
						"MAKTX":"",
						"USER_ID":addedBy,
						"MEINH":id.split('_')[1],
						"START_DATE":"",
						"END_DATE":"",
						"DISPLAY_TYPE":"F",
						"JOB_MODE":"I",
						"ISIS_MATNR":parentNo,
						"PROMO_TYPE":"ZCOM",
						"STATUS":"Failed",
						"STATUS_MESSAGE":"Failed"
							
						};
				
				draftArray.push(draft);
			}
			
		}
		modifyDraft(draftArray);
		removeEmptyGroup();
		if($(".promolistcheckbox:checked").length==0){
			hidePromoListOnDelete();
			removeEmptyGroup();
			showInformation("Promotion(s) created successfully.");
			$('#listOption').removeAttr('disabled');
			if ($('#promoListTbody').find('tr:visible').length < 1) {
				$('#listOption').val('myDrafts');
				hidePromoList();
			}
			resetSearchFields();
		}
		
		checkOrUncheckAll();
	}
	
	if(errors==''){
		$('#PublishButton').removeClass('disabled');
		$("#validateButton").addClass('disabled');
	}else{
		$('#validateButton').removeClass('disabled');
		$("#PublishButton").addClass('disabled');
		showAllErrors(errors);
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function getError(article,msg){
	return "<li>Article "+article+":"+msg+"</li>";
}


function confirmation(msg,id) {
	
	$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
	 $("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
	'Confirmation');
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);

	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function(){
		var parentNo = $("#row-" + id).find('.parentNo').attr('data-parentno');
		var addedBy = '';
		addedBy= $("#row-" + id).attr('data-addedBy').trim();
		if(addedBy == '')
			addedBy= $('#loginUserId').val();	
		var draft={
				"MATNR":id.split('_')[0],
				"MAKTX":"",
				"USER_ID":addedBy,
				"MEINH":id.split('_')[1],
				"START_DATE":"",
				"END_DATE":"",
				"DISPLAY_TYPE":"F",
				"JOB_MODE":"D",
				"ISIS_MATNR":parentNo,
				"PROMO_TYPE":"ZCOM",
				"STATUS":"Draft",
				"STATUS_MESSAGE":" "
				};
			
		var draftArray = [];
		draftArray.push(draft);
		modifyDraft(draftArray);
		$("#row-" + id).remove();
		$(".row-" + id).remove();
		checkOrUncheckAll();
		if(isShrunked){
			hidePromoList();
		}else{
			hidePromoListOnDelete();
		}	
		
		if ($('#promoListTbody').find('tr').length < 1) {
			$('#listOption').val('myDrafts');
		}
		
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
		removeEmptyGroup();
	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function(){
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
	
}


function showInformation(msg,anotherMsg) {
	if(msg != '')
	{
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").find('#ok').find('label').text('Ok');
	$("#dialog-confirmation").find('#ok').removeClass('hideBlock');
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Information');
	$("#dialog-confirmation").find('#ok').click(function(){

		if(anotherMsg == undefined || anotherMsg == '')
		{
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	}
		else if(anotherMsg != '')
			{
			showInformation(anotherMsg,'');
			}
	});
	$("#dialog-confirmation").find('#ok').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
	}
	else
		{
		if(anotherMsg != '')
		showInformation(anotherMsg,'');
		}
}

function getPromoAddtionalDtls(articleNo, date, uom, item) {
	id = 'history';
	flag = true;
	$
			.ajax({
				type : "get",
				url : "getPromoAddtionalDtls.htm",
				data : {
					"articleNo" : articleNo,
					"uom" : uom,
					"weekStartDate" : date
				},
				// dataType:"json",
				// async:false,
				beforeSend : function() {
					// startLoading();
					startLoading();
				},
				success : function(response) {
					addDtls = articleNo;
					var msg;
					var om = 1;
					try {
						om = $(item).closest('table').closest('tr').prev()
								.attr('data-om');
					} catch (err) {
						console.log(err);
					}
					om = (om != null && om != '' && om != undefined) ? Number(om)
							: 1;
					var promoSaleList = null;
					var output = $.parseJSON(response);
					var promoArticlelist = output.data;
					if (promoArticlelist != null
							&& promoArticlelist != undefined) {
						promoSaleList = promoArticlelist[0].promoSalesHistList;
						promoOfferList = promoArticlelist[0].promoOfferList;
						promoAllocation = promoArticlelist[0].promoAllocation;
					}
					$('.appended').remove();
					if (promoSaleList != null && promoSaleList != undefined
							&& promoSaleList != '' && promoSaleList.length > 0
							&& promoSaleList[0].msg != null
							&& promoSaleList[0].msg.trim() == '') {
						var list = promoSaleList;
						var content = '<table class="ContentTable" cellspacing="0"><tr class="">'
								+ '<th class="centerValue ">Display from</th>'
								+ '<th class="centerValue ">Display To</th>'
								+ '<th class="centerValue">Promo Price</th>'
								+ '<th class="centerValue ">Savings</th>'
								+ '<th class="centerValue ">Display Type</th>'
								+ '<th class="centerValue ">Display No</th>'
								+ '<th class="centerValue">Media</th>'
								+ '<th class="centerValue">Avg. Qty. Sold</th>'
								+ '<th class="centerValue">Store Info</th>'
								+ '</tr>';
						var i = 0;
						for ( var j = 0; j < list.length; j++) {

							list[j].qtySold = list[j].qtySold != null ? list[j].qtySold
									: "";
							list[j].qtySold = (list[j].qtySold != "" && list[j].qtySold != undefined) ? (Number(list[j].qtySold) / Number(om))
									.toFixed(0)
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

							content += '<tr class="histParent  '
									+ list[j].promoTypeInd;
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
									+ '<td class="centerValue">'
									+ list[j].promoDisplay + '</td>'
									+ '<td class="centerValue ">'
									+ list[j].promoDisplayNo + '</td>'
									+ '<td class="centerValue">'
									+ list[j].promoMedia + '</td>'
									+ '<td class="centerValue">'
									+ list[j].qtySold + '</td>'
									+ '<td class="centerValue">'
									+ list[j].additionalInfo + '</td></tr>'
							// + '<td id="feedback-' + i + '">';
							// if (list[j].feedback != null)
							// content = content + list[j].feedback;
							// else
							// content = content + '';
							// content += '</td>'
							// + '<td id="feedbackEdit-'
							// + i
							// + '" class="hideBlock"><textarea
							// id="feedbackValue-'
							// + i + '">';
							// if (list[j].feedback != null)
							// content = content + list[j].feedback;
							// else
							// content = content + '';
							// content += '</textarea></td>'
							// + '<td class="centerValue"><label class="linkBtn
							// editRowBtn" id="editRecord-'
							// + i
							// + '">'
							// + '<label
							// class="editRecord">Edit</label></label>'
							// + '<label class="linkBtn saveRowBtn hideBlock"
							// id="saveRecord-'
							// + i
							// + '">'
							// + '<label
							// class="saveRecord">Save</label></label></td><td
							// class="hideBlock article">'
							// + list[j].articleNo + '-'
							// + list[j].articleUom + '</td></tr>';
							i++;
						}
						content += '</table>';
						$(
								'#dialog-salesHistory .popupActionsWrapper .saleHistorySaveBtn,#dialog-salesHistory .ContentTableWrapper, #dialog-salesHistory .filtered-count')
								.show();
						$('#dialog-salesHistory .ContentTableWrapper').html('')
								.html(content);
						$('#dialog-salesHistory .errorAddtnlDtls').remove();
						// bindSalesHistory();
						$('.months').val(13);
						$('#dialog-salesHistory .saleTotalCount').text(i);
					} else {
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

					$("#dialog-salesHistory").parent().addClass("popupWrapper");
					$("#dialog-salesHistory").dialog("open");
					try {
						/*$('#dialog-salesHistory').closest('.popupWrapper')
								.css(
										'top',
										($(window).height() - $(
												'#dialog-salesHistory')
												.closest('.popupWrapper')
												.height()) / 2);*/
					} catch (err) {
						console.log(err);
					}

				},
				error : function() {
					// goToLogin();
					showError('Technical Issue Occured.');
				},
			});

}

function bindPopUpContent() {
	$('#apply')
	.click(
			function() {
				$('.histParent a span').text('+');
				$('.histChild').parent().parent().parent().addClass(
						'hideBlock');

				var month = $('.months').val();
				promoType = $('.selectOptions.promoType').val();
//				promoType='A';
				var now = new Date();
				nowTime = now.getTime();
				beforeTime = now.setTime(nowTime
						- (86400000 * 30 * month));
				$('.appended').removeClass('hideBlock');
				$('.appended')
						.filter(
								function() {
									startDate = $(this).find(
											'.start-date').text().substring(0,10)
											.trim();
									endDate = $(this).find('.end-date')
											.text().trim();
									crntPromoType = $('.crntPromoType')
											.val();
									var tempDateOne = new Date();
									var tempDateTwo = new Date();
									startDateObj = tempDateOne
											.setFullYear(
													startDate
															.split('/')[2],
													startDate
															.split('/')[1] - 1,
													startDate
															.split('/')[0]);
									endDateObj = tempDateTwo
											.setFullYear(
													endDate.split('/')[2],
													endDate.split('/')[1] - 1,
													endDate.split('/')[0]);

									// crntPromoType = 'A';

									if ((beforeTime > startDateObj || nowTime < endDateObj)
									// || (crntPromoType != promoType &&
									// promoType != 'A')
									)
										$(this).addClass('hideBlock');
									else
										$(this)
												.removeClass(
														'hideBlock');
								});

				/*$('.histParent').filter(function() {
					// //console.log('c');
					if ($(this).hasClass('C') && promoType == 'C')
						$(this).removeClass('hideBlock');
					else if ($(this).hasClass('I') && promoType == 'I')
						$(this).removeClass('hideBlock');
					else if (promoType == 'A')
						$(this).removeClass('hideBlock');
					else
						$(this).addClass('hideBlock');
				});*/

				/*
				 * $('.histParent') .filter( function() { var cnt =
				 * ($(this).next().find( 'td .histChild').length - $(
				 * this).next().find( 'td
				 * .histChild.hideBlock').length);
				 * $(this).find('a').html( '<span>+</span> ' + cnt);
				 * 
				 * if (cnt == 0) { $(this).addClass('hideBlock'); } else {
				 * $(this) .removeClass( 'hideBlock'); } });
				 */

				$('.filtered-count h4 strong').text(
						$('.appended:visible').length);
			});
}

function checkOrUncheckAll(){
	var checkboxLength = $(".promolistcheckbox:checked").length;
	var size = ('0' + checkboxLength).slice(-2) ;
	if (size == 0) {
		$('#beforePublish').find('.thumbUp').text('Proceed to Create');
		$('#beforePublishBtn').addClass('disabled');
	} else {
		$('#beforePublish').find('.thumbUp').text(
				'Proceed to Create(' + size + ')');
		$('#beforePublishBtn').removeClass('disabled');
	}
	if (size == $(".promolistcheckbox").length) {
		$("#promolistcheckboxall").prop('checked', true);
	} else {
		$("#promolistcheckboxall").prop('checked', false);
	}
}


function loadMyDraft(myDraftArrayList){
	
	
	var myDraftArray=[];
	var duplicatesArr=[];
	for ( var i = 0; i < myDraftArrayList.length; i++) {
		if (myDraftArrayList[i].PROMO_TYPE == 'ZCOM') {
			myDraftArray.push(myDraftArrayList[i]);
		}
	}
	var tempArr= myDraftArray; 
	for( var i = 0; i < tempArr.length; i++){
		for( var x = i+1; x < tempArr.length; x++){
			if( (tempArr[x].MATNR == tempArr[i].MATNR)  && (tempArr[x].MEINH == tempArr[i].MEINH ) ){
				duplicatesArr.push(tempArr[x]);
				tempArr.splice(x,1);
				--x;
			}
		}
	}
	
	if(duplicatesArr.length > 0){
	
	for( var i = 0; i < duplicatesArr.length; i++){
		for( var x = 0; x < tempArr.length; x++){
			if( (tempArr[x].MATNR == duplicatesArr[i].MATNR) ){
				duplicatesArr.push(tempArr[x]);
				tempArr.splice(x,1);
				//--x;
			}
		}
	}
	}
	
	if (myDraftArray != undefined) {
		$('#promoList #promoListTbody').html('');
		var myDraftGrp = $groupBy(myDraftArray, function(obj) {
			return obj.CREATE_USER;
		});
		if(duplicatesArr.length > 0){
		var commonArticlesGrp = $groupBy(duplicatesArr, function(obj) {
			return obj.MATNR;
		});
		}
		
		for ( var user in myDraftGrp) {
			var myDraft = myDraftGrp[user];
			if($('#listOption').val()=='allDrafts' && myDraft.length >0){
			var header = '<tr data-om class="drillsOpenDefault collapsed rowHighlight defaultExpanded groupHeader"><td data-addon-sh><input type="checkbox"  class="userCheckBox" checked/></td><td colspan="17">Added By: <strong>'
			+ '&nbsp;'+(myDraft[0].USER_NAME || '')
			+ '</strong></td></tr>';
			$('#promoList #promoListTbody').append(header);
			
			}
		for(var i=0;i<myDraft.length;i++)
		{
			if(myDraft[i].PROMO_TYPE=='ZCOM')
			{
			var articleNo = myDraft[i].MATNR;
			var uom = myDraft[i].MEINH;
			var description = myDraft[i].MAKTX;
			var dispType=myDraft[i].DISPLAY_TYPE;
			var startDate=(myDraft[i].START_DATE!=null&&myDraft[i].START_DATE!='')?fromMobilinkDate(myDraft[i].START_DATE):'';
			var endDate=(myDraft[i].END_DATE!=null&&myDraft[i].END_DATE!='')?fromMobilinkDate(myDraft[i].END_DATE):'';
			var id = Number(articleNo) + "_" + uom;
			var parentNo = myDraft[i].ISIS_MATNR;
			var status = myDraft[i].STATUS;
			var department = myDraft[i].DEPARTMENT;
			var freshFoodFlag = (myDraft[i].FRESH_FOOD_FLAG || '');
			if ($('#row-' + id).length == 0){
			$('#promoList #promoListTbody').append(
					getPromoItemAsHTML(articleNo,
							description, uom, id, '', '',
							startDate, endDate, dispType, '', '','',parentNo,status,user,department,freshFoodFlag));
			$("#row-" + id).find("#dispType").val(dispType);
			bindSaveAndDelete(id);
			}
			}
		}
	}
		if(duplicatesArr.length > 0){
		for ( var article in commonArticlesGrp) {
			var myDraft = commonArticlesGrp[article];
			
			if($('#listOption').val()=='allDrafts' && myDraft.length >0){
				var createdUsersList = [];
				for(var i=0;i<myDraft.length;i++)
				{
					createdUsersList.push(myDraft[i].USER_NAME);
				}
				createdUsersList = unique(createdUsersList);
			var header = '<tr data-om class="drillsOpenDefault collapsed rowHighlight defaultExpanded groupHeader"><td data-addon-sh><input type="checkbox"  class="userCheckBox" checked/></td><td colspan="17">Added By: <strong>';
			for(var i=0;i<createdUsersList.length;i++)
			{
			header+= '&nbsp;'+createdUsersList[i];
			if(i>=0 && i!= createdUsersList.length-1)
				header+=',';
			}
			header+= '</strong></td></tr>';
			$('#promoList #promoListTbody').append(header);
			
			}
		for(var i=0;i<myDraft.length;i++)
		{
			if(myDraft[i].PROMO_TYPE=='ZCOM')
			{
			var articleNo = myDraft[i].MATNR;
			var uom = myDraft[i].MEINH;
			var description = myDraft[i].MAKTX;
			var dispType=myDraft[i].DISPLAY_TYPE;
			var startDate=(myDraft[i].START_DATE!=null&&myDraft[i].START_DATE!='')?fromMobilinkDate(myDraft[i].START_DATE):'';
			var endDate=(myDraft[i].END_DATE!=null&&myDraft[i].END_DATE!='')?fromMobilinkDate(myDraft[i].END_DATE):'';
			var id = Number(articleNo) + "_" + uom;
			var parentNo = myDraft[i].ISIS_MATNR;
			var status = myDraft[i].STATUS;
			var userName=myDraft[i].CREATE_USER;
			var department = myDraft[i].DEPARTMENT;
			var freshFoodFlag = myDraft[i].FRESH_FOOD_FLAG;
			if ($('#row-' + id).length == 0){
			$('#promoList #promoListTbody').append(
					getPromoItemAsHTML(articleNo,
							description, uom, id, '', '',
							startDate, endDate, dispType, '', '','',parentNo,status,userName,department,freshFoodFlag));
			$("#row-" + id).find("#dispType").val(dispType);
			bindSaveAndDelete(id);
			}
			}
		}
	}
	}
		
		bindAllDraftCheckBoxEvent();
		showPromoList();
		shrunkTable();
		checkOrUncheckAll();
		$('#promolistcheckboxall').trigger('click');
	}
}

function getDraftObj(articleNo, description, uom, id, supplier,
		om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag){
		var draft={
				"MATNR":articleNo,
				"ISIS_MATNR":articleNo,
				"MAKTX":description,
				"USER_ID":$('#loginUserId').val(),
				"MEINH":uom,
				"START_DATE":(startDate!=''&&startDate!=undefined)?toMobilinkDate(startDate):null,
				"END_DATE":(endDate!=''&&endDate!=undefined)?toMobilinkDate(endDate):null,
				"DISPLAY_TYPE":(dispType==undefined || dispType=='')?'F':dispType,
				"JOB_MODE":"I",
				"PROMO_TYPE":"ZCOM",
				"PROMO_REASON":"",
				"STATUS":"DRAFT",
				"DEPARTMENT" : department,
				"FRESH_FOOD_FLAG" : freshFoodFlag,
				"STATUS_MESSAGE":" "					
				};
	
	return draft;
}


function addToMyDrafts(listObj){
	console.log("To add List:"+JSON.stringify(listObj));
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var id=listObj[i].articleNo+'_'+listObj[i].articleUom;
		console.log(listObj[i]);
		var draft={
				"MATNR":listObj[i].articleNo,
				"ISIS_MATNR":listObj[i].articleNo,
				"MAKTX":$('#row-'+id).find('td[data-bind="desc"]').text(),
				"USER_ID":$('#loginUserId').val(),
				"MEINH":listObj[i].articleUom,
				"START_DATE":toMobilinkDate(listObj[i].promoStartDate),
				"END_DATE":toMobilinkDate(listObj[i].promoEndDate),
				"DISPLAY_TYPE":(listObj[i].dispType==undefined || listObj[i].dispType=='')?'F':listObj[i].dispType,
				"JOB_MODE":"I",
				"PROMO_TYPE":"ZCOM",
				"STATUS":"DRAFT",
				"STATUS_MESSAGE":" "					
				};
		console.log('add draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}	
	console.log("To add draft:"+draftArray);
	modifyDraft(draftArray);
}

function removeFromDraft(listObj){
	console.log("To add List:"+JSON.stringify(listObj));
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var id=listObj[i].articleNo+'_'+listObj[i].articleUom;
		var draft={
				"MATNR":listObj[i].articleNo,
				"ISIS_MATNR":listObj[i].articleNo,
				"MAKTX":$('#row-'+id).find('td[data-bind="desc"]').text(),
				"USER_ID":$('#loginUserId').val(),
				"MEINH":listObj[i].articleUom,
				"START_DATE":toMobilinkDate(listObj[i].promoStartDate),
				"END_DATE":toMobilinkDate(listObj[i].promoEndDate),
				"DISPLAY_TYPE":(listObj[i].dispType==undefined || listObj[i].dispType=='')?'F':listObj[i].dispType,
				"JOB_MODE":"D",
				"PROMO_TYPE":"ZCOM",
				"STATUS":"DRAFT",
				"STATUS_MESSAGE":" "					
				};
		console.log('delete draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}	
	console.log("To remove draft:"+draftArray);
	modifyDraft(draftArray);
}

function modifyDraft(dataObj){
	//service call to put my draft list 
	var param= {"ItemArray":dataObj};
	console.log('',JSON.stringify(param));
	$.post( modifyMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
	    console.log('Added to My draft:'+data);
	});
}

function callServiceForMyDraft()
{
	//service call to get my draft list 
	startLoading();
	var param= { "USER_ID":$('#loginUserId').val()};
	$.post( getMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
		  var response = data;
		  loadMyDraft(response);
		 stopLoading(); 
	  });

}
function callServiceForAllDraft()
{
	//service call to get All draft list 
	startLoading();
	var param= { "USER_ID":"ALL"};
	$.post( getMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
		  var response = data;
		  loadMyDraft(response);
		  stopLoading();  
	  });	

}

function loadMoreInfoFromService(listObj){
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var draft={
				"iv_article_no":listObj[i].articleNo,
			    "iv_child_article_no":listObj[i].articleNo,
			    "iv_promo_start_date":formatDateToMDY(listObj[i].promoStartDate),
			    "iv_promo_end_date":formatDateToMDY(listObj[i].promoEndDate),
			    "iv_article_uom":listObj[i].articleUom				
				};
		console.log('draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}
	startLoading();
	var param= { "Article_dtls":draftArray};
	console.log(loadMoreInfo + JSON.stringify(param));
	$.post( loadMoreInfo,JSON.stringify(param))
	  .done(function( result ) {
	    if(result!=undefined){			
			for(var i=0;i<result.length;i++){				
				var articleNo = result[i].article_no;
				var uom = result[i].base_uom;
				var id=articleNo+'_'+uom;				
				$('.row-'+id).find('.valueInfo').text(result[i].supplier_no+'-'+result[i].supplier_name);	
				$('#row-'+id).find('[data-bind="standardPrice"]').text((result[i].standard_price==null||result[i].standard_price==undefined)?'0':result[i].standard_price.toFixed(2));
				$('#row-'+id).find('[data-bind="promoPrice"]').text((result[i].promo_price==null||result[i].promo_price==undefined)?'':result[i].promo_price.toFixed(2));
				$('#row-'+id).find('[data-bind="standardPrice"]').attr('data_cost_price',((result[i].cost_price==null||result[i].cost_price==undefined)?'':result[i].cost_price.toFixed(2)));
//				$('#row-'+id).find('[data-bind="promoPrice"]').text((result[i].standard_price==null||result[i].standard_price==undefined)?'0':result[i].standard_price.toFixed(2));
				
			}
			stopLoading();
	    }
	});
	
}
function clearAllErrors() {
	$('#errorWrapper').addClass('hideBlock');
	$('#warningWrapper').addClass('hideBlock');
	$('#errorMsgDiv').addClass('hideBlock');
	$('.' + errorFieldClass).each(function() {
		$(this).removeAttr('title');
		$(this).removeClass(errorFieldClass);
	});

}
function resetSearchFields() {
	$('#article').val('');
	//$('#start,#end').val(presentDate);
	$('#article,#start,#end').removeClass('errorField');
	$('#article').focus();
}
function bindAllDraftCheckBoxEvent()
{
	$('.userCheckBox').unbind('click');
	$('.userCheckBox').click(function(){
		var $rowsBetween = $(this).closest('tr').nextUntil('.groupHeader');
		if($(this).is(":checked"))
		{
		$rowsBetween.find('.promolistcheckbox').prop('checked',true);
		}
		else
		{
		$rowsBetween.find('.promolistcheckbox').prop('checked',false);
		}
		checkOrUncheckAll();
		});
	removeEmptyGroup();
	
}
function removeEmptyGroup()
{
var allGroup = $('.userCheckBox').closest('tr');
if($('#listOption').val()=='allDrafts' && !$('#listOption').is(':disabled'))		
	allGroup.each(function(){
		var childRows = $(this).nextUntil('.groupHeader').length;
		if(childRows == 0)
		$(this).addClass('hideBlock');
		else
		$(this).removeClass('hideBlock');
		});
}
function newPriceConfirmation(msg,idArr)
{

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").find('#ok').find('label').text('Yes');
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Information');
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function(){
		
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').find('label').text('No');
	/*if(roleId != 'MA')
	{
	$("#dialog-confirmation").find('#ok').addClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').find('label').text('Ok');
	}*/
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function(){
		if($("#dialog-confirmation").find('#cancel').find('label').text() == 'No')
		{
	for(var i=0;i<idArr.length;i++)
		{
	$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').val('');
	$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').trigger('change');
	setTimeout(function(){
		$("#newPriceEdit-" + idArr[0]).find('input[type="text"]').focus();
	},300);
		}
		}
	else
		{
		setTimeout(function(){
		for(var i=0;i<idArr.length;i++)
		{
		$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').addClass('errorField');
		}
		},700);
		for(var i=0;i<idArr.length;i++)
			{
			$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').trigger('change');
			}
		}
	$("#dialog-confirmation").parent().removeClass("popupWrapper");
	$("#dialog-confirmation").dialog("close");
});
	
	$("#dialog-confirmation").parent().find('.closePopUp').click(function()
			{
		if($("#dialog-confirmation").find('#cancel').find('label').text() == 'No')
		{
	for(var i=0;i<idArr.length;i++)
		{
	$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').val('');
	$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').trigger('change');
	setTimeout(function(){
		$("#newPriceEdit-" + idArr[0]).find('input[type="text"]').focus();
	},300);
		}
		}
	else
		{
		setTimeout(function(){
		for(var i=0;i<idArr.length;i++)
		{
		$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').addClass('errorField');
		}
		},700);
		for(var i=0;i<idArr.length;i++)
			{
			$("#newPriceEdit-" + idArr[i]).find('input[type="text"]').trigger('change');
			}
		}
});
	
}
function validateNextDeliveryDateNExistance(dataObj) {
	var errors = '';
	var flag = false;
	var existList = [];
if(dataObj.inStorePromoArticleInfoList != null && dataObj.inStorePromoArticleInfoList != undefined){
	for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length; i++) {
		obj = dataObj.inStorePromoArticleInfoList[i];
		var id = obj.articleNo + "_" + obj.articleUom;
		console.log('To remove item ' + id);
		if (obj.promoOfferNo != "" && obj.promoOfferNo != null && obj.promoOfferNo != undefined) {
			existList.push(obj);
			//$('#row-' + id).find('.promolistcheckbox').removeAttr('checked');
			//$('#row-' + id).find('.promolistcheckbox').trigger('change');

		}
	}
}
	
	console.log(existList);
	/*if (isBigw == 'true' && existList.length > 0) {
		var message = '';
		// var articleList = [];
		for ( var i = 0; i < existList.length; i++) {
			// articleList.push(existList[i].articleNo);
			message += ''
					+ existList[i].articleNo
					+ "-"
					+ $(
							'#row-' + existList[i].articleNo + '_'
									+ existList[i].articleUom).find(
							'.description').text()
					+ "("
					+ existList[i].articleUom
					+ ")"
					// + JSON.stringify(articleList)
					+ " cannot be added as it already on an promotion during the selected period.";
		}
		message += '';
		showInformation(message);
		return false;
	} else {*/
		if (existList.length > 0) {
			showPopUpConfirmation(existList, dataObj);
			stopLoading();
			return false;
		}
	//}

	return true;
}
function showPopUpConfirmation(existList, actualList) {
	$("#dialog-mulipleArticlesCONFIRM").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		maxHeight : 800,
		width : 515
	});
	$('#articleTbody').html(populateArticles(existList));
	hideErrorinPopup($("#dialog-mulipleArticlesCONFIRM"));
	$("#dialog-mulipleArticlesCONFIRM").parent().addClass("popupWrapper");
	$("#dialog-mulipleArticlesCONFIRM").dialog("open");
	$("#dialog-mulipleArticlesCONFIRM").parent().find('.ui-dialog-title').text(
			'Select article to proceed');
	checkOrUncheckAll();
	$('#addanyway').unbind('click');
	$('#addanyway').click(
			function() {
				if ($("#dialog-mulipleArticlesCONFIRM").find(
						'input[type="checkbox"]:checked').length > 0) {
					var selectedArticles= [];
					var promoArticlesList=actualList.inStorePromoArticleInfoList;
					$("#dialog-mulipleArticlesCONFIRM").find(
							'input[type="checkbox"]').each(
							function() {
								if ($(this).is(':checked')) {
									var id = $(this).attr('data-referid');
									console.log('=== id' + id);
									$('#row-' + id).find('.promolistcheckbox')
											.prop('checked', 'checked');
									$('#row-' + id).find('.promolistcheckbox')
									.trigger('change');
									selectedArticles.push(id);
								}
							});
					
					for(var i=0;i<promoArticlesList.length;i++)
					{
					for(var j=0;j<selectedArticles.length;j++)
						{
						if(promoArticlesList[i].articleNo==selectedArticles[j].split('_')[0])
						{
						if( promoArticlesList[i].articleUom == selectedArticles[j].split('_')[1])
						promoArticlesList[i].promoOfferNo='';
						}
					}
					}
				
				updateList(actualList);
					
				//	generateList(actualList);
					
//					showWarningAfterConfirmation(actualList);
					$("#dialog-mulipleArticlesCONFIRM").dialog("close");
				} else {
					showErrorinPopup($("#dialog-mulipleArticlesCONFIRM"), '');
				}
			});

	$("#dialog-mulipleArticlesCONFIRM").find('.secondaryActionBtn').click(
			function() {
				$('.editRecord').trigger('click');
				$("#dialog-mulipleArticlesCONFIRM").dialog("close");
			});
	$("#dialog-mulipleArticlesCONFIRM").parent().find('.closePopUp').click(
			function() {
				$('.editRecord').trigger('click');
				// $("#dialog-mulipleArticlesCONFIRM").dialog("close");
			});
}
function populateArticles(list) {
	var content = '<tr><th>Article</th><th class="centerValue">UOM</th><th class="centerValue">Start Date</th><th class="centerValue">End Date</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getRow(list[i]);
	}
	return content;
}
function getRow(obj) {
	var tr = '<tr ';
	tr += 'data-referId="'
			+ obj.articleNo
			+ '_'
			+ obj.articleUom
			+ '" ><td id="articleNo">'
			+ obj.articleNo
			+ '</td><td >'
			+ obj.articleUom
			+ '</td><td class="centerValue">'
			+ obj.promoStartDate
			+ '</td><td class="centerValue">'
			+ obj.promoEndDate
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" data-referId="'
			+ obj.articleNo + '_' + obj.articleUom + '" checked></td></tr>';
	return tr;
}
function hideErrorinPopup(elem) {
	$(elem).find('.popupActionsWrapper .errorAddtnlDtls').remove();
}
function showErrorinPopup(elem, msg) {
	$(elem).find('.popupActionsWrapper .errorAddtnlDtls').remove();
	$(elem).find('.popupActionsWrapper').append(popUpErrorMsgDiv);
}
function getActiveAndFuturePromotions(pageNo)
{
	$('#actives').addClass('hideBlock');
	$('.searchRow').remove();
	currentPageInActive = pageNo;
	$.ajax({
		type : "get",
		url : "getActiveAndFutureCompPromotions.htm",
		data : 
		{
		pageNo : pageNo,
		records : 10
		},
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			message = output.data.msg;
			//console.log(message);
			if (message == 'success') {
				$('#actives').removeClass('hideBlock');
				addSearchResultItem(output.data.instorePromoSearchRes);
			} 
			else if(message== 'noData')
			{
				$('.activesResultTitle ').addClass('hideBlock');
				message='No active or future competition promotion exists.';
				//console.log(message);
				showInformation(message);
				stopLoading();
			}else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			}else {
				$('.activesResultTitle ').addClass('hideBlock');
				//console.log(message);
				showInformation(message);
				stopLoading();
			}
			stopLoading();
				showPromotionListClr($('#promoListSearch'));			
		},
		error : function() {
			showInformation('Sorry, Some technical issue occured.');
			stopLoading();
				$('.searchRow').remove();
				showPromotionListClr($('#promoListSearch'));			
		},
	});

}
function callServiceForDeactivate(id,elem){
	var toDeactivate=activePromotionList[id];

	$.ajax({
		type :"post",
		url  :"deactivateCompPromo.htm",
		contentType :"application/json",
		data : JSON.stringify(toDeactivate),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			
			if (message == 'success') {				
				$("#searchRow-" + id).find('.lastColumn').text('').html('<label class="deactive">De-activated</label>');
				$("#dialog-confirmation").parent().removeClass("popupWrapper");
				$("#dialog-confirmation").dialog("close");
			} else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			}
			else {
				if(message==undefined||message=='failed'){
					message="Technical issue occured.Please contact java support.";
				}
				//console.log(message);
				showInformation("Deactivate Failed.");
				stopLoading();
			}
			stopLoading();
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
		},
		error : function() {
			showInformation('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
		},
	});
	return false;


}
function addSearchResultItem(itemList,data){
	$('#promoArticleListSearchPast ').html('');
	$('#expandAll_pasts').removeClass('hideBlock');
	$('#collapseAll_pasts').addClass('hideBlock');
	
	$('#filterClearSearch,#filterClearSearchPast').trigger('click');
	
	//  For active promotions
	$('#expandAll_active').removeClass('hideBlock');
	$('#collapseAll_active').addClass('hideBlock');
	
	$('#promoArticleListSearch ').html('');
	
	
	activePromotionList=itemList;
	
	for(var index=0;index<itemList.length;index++){
		addSingleArticleToPromoListSearch(itemList[index],index);
	}
	
	if($('#MR:checked').length==1)
	{
	$('#pastPagination').pagination({
		items : itemList[0].msg,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPageInPast,
		onPageClick : function(pageNumber) {
			getArticleSearchResultPast(data, pageNumber);
		}
	});
	
	$('.pastsResultTitle ').removeClass('hideBlock');
	
	if(itemList[0].msg > 10)
		{
		$('#pastPagination').removeClass('hideBlock');
		}
	else
		{
		$('#pastPagination').addClass('hideBlock');
		}
}
	else
		{

		$('#activePagination').pagination({
			items : itemList[0].msg,
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : currentPageInActive,
			onPageClick : function(pageNumber) {
				getActiveAndFuturePromotions(pageNumber);
			}
		});
		
		$('.activesResultTitle ').removeClass('hideBlock');
		
		if(itemList[0].msg > 10)
			{
			$('#activePagination').removeClass('hideBlock');
			}
		else
			{
			$('#activePagination').addClass('hideBlock');
			}

		}
	
	// Code for tool tips
	$(".title").tooltip({
		position: { my: "left bottom", at: "left top" }
	});
	isShrunked = true;
}

function addSingleArticleToPromoListSearch(obj,id) {

	var articleNo = Number(obj.article);
	var description = obj.article_desc;
	var uom = obj.uom;
	var supplier = obj.supplierNo;
	var om = obj.om;
	var startDate = obj.start_date.replace('.','/').replace('.','/');
	var endDate = obj.end_date.replace('.','/').replace('.','/');
	var stdPrice=obj.std_price;
	var promo_price=obj.promo_price;
	//var limitQty=obj.limit_qty !=undefined ? obj.limit_qty : '';
	var newPrice=obj.new_price !=undefined ? obj.new_price : '';
	var status=obj.status !=undefined ? obj.status : '';
	if($('#MR:checked').length==1){
		
		$('#promoArticleListSearchPast').append(
				getPromoItemAsHTML4Search(articleNo, description, uom, id, supplier,
						om, startDate, endDate,stdPrice,promo_price,newPrice,status));
		
	bindSaveAndDeleteForSearchRes(id,$('#promoListSearchPast'));
	}else{
			$('#promoArticleListSearch').append(
					getPromoItemAsHTML4Search(articleNo, description, uom, id, supplier,
							om, startDate, endDate,stdPrice,promo_price,newPrice,status));

		bindSaveAndDeleteForSearchRes(id,$('#promoListSearch'));
}
}

function getPromoItemAsHTML4Search(articleNo, description, uom, id, supplier,
		om, startDate, endDate,stdPrice,promo_price,newPrice,status) {
	var checkbox = '';
	var notesElem='';
	var deactivateStr='';
	var rowId='searchPastRow';
	var deactivateProperty = '';
	
	deactivateProperty = createCompetition;
	
	if(stdPrice == null || stdPrice == '' || stdPrice == '0.00' || stdPrice == '0' || isNaN(stdPrice))
		stdPrice = promo_price;
	if($('#MF:checked').length==1)
	{
	if((isPastDate(startDate) || startDate == presentDate) && (isFutureDate(endDate) || endDate == presentDate))
		status = 'Active';
	else
		status='Future';
	}
	else if(status == 'D' && $('#MR:checked').length==1 )
		{
		status='De-activated';
		}
	var header = '<tr class=" drillsOpenDefault collapsed rowHighlight defaultExpanded headRow row row-'
		+ id
		+ '"><td colspan="18"><strong>'
		+ articleNo
		+ ' '
		+ '-'
		+ ' '
		+ description + '</strong></td></tr>';
	
	var newelemt = '<td class="centerValue  standardPrice" data-addon data-bind="standardPrice" >'+stdPrice+'</td>'
			+'<td class="centerValue columnDivider promoPrice" data-addon data-bind="promoPrice" >'+promo_price+'</td>'
			+'<!--<td id="newPrice-'
			+ id
			+ '" class="centerValue newPrice" data-addon>'+newPrice+'</td> <td data-bind="newPrice" id="newPriceEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable> <input type="text" value="'+newPrice+'" class="editNumCell textbox textboxDefaultText title" title="Type new price in AUD or in % value ">'
			+ '<span class="radioOptions"> <input type="radio" class="dol" name="newprice'
			+rowId+id
			+'" id="dol" checked=""><label for="dol">$</label>'
			+'<input type="radio" class="per" name="newprice'
			+rowId+id
			+'" id="per"><label for="per">%</label></span>'
			+' </td> --><!--<td id="limitQty-'
			+ id
			+ '" class="centerValue limitQty"  data-addon>'+'</td> <td id="limitQtyEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable data-bind="limitQty"> <input type="#" value="'+newPrice+'" class="editNumCell textbox textboxDefaultText"> </td>-->';
	var diptype = '';
	if($('#MR:checked').length==0){
	
	rowId='searchRow';
	
	notesElem='<!-- <label class="notes tooltip" title="Sample text for notes" id="notes-'
		+ id
		+ '">Notes</label> <label class="notes hideBlock" id="notesEdit-'
		+ id
		+ '"><input type="textbox" class="textbox articleSearchText" placeholder="Enter notes"></label> -->';
	/*if(instoreCompDeactivateFlag){
		deactivateStr='<td class="centerValue columnDivider status">'+status+'</td> <td class="lastColumn centerValue  "><label class="linkBtn editRowBtn" id="editRecord-'
		+ id
		+ '"> <label class="editRecord hideBlock" title="Edit" id="editRecordBtn-'
		+ id
		+ '">Edit</label> </label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-'
		+ id
		+ '"> <label class="saveRecord" title="Save" id="saveRecordBtn-'
		+ id
		+ '">Save</label> </label></td> ';
	}else{*/
		deactivateStr='<td class="centerValue columnDivider status">'+status+'</td> <td class="lastColumn centerValue  "><label class="linkBtn editRowBtn" id="editRecord-'
			+ id
			+ '"> <label class="editRecord hideBlock" title="Edit" id="editRecordBtn-'
			+ id
			+ '">Edit</label> </label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-'
			+ id
			+ '"> <label class="saveRecord" title="Save" id="saveRecordBtn-'
			+ id
			+ '">Save</label> </label> <label class="linkBtn '+deactivateProperty+' " id="deactivateRecord-'
			+ id + '"> <label class="deactivateRecord" title="De-activate" id="deactivateRecord-' + id
			+ '">Deactivate</label> </label></td> ';
//	}
	}
	else 
	{
	if(status=='De-activated')
	deactivateStr='<td class="centerValue columnDivider status">'+status+'</td>';
	else
		deactivateStr='<td class="centerValue columnDivider status"></td>';
	}
	var row = header + '<tr id="'+rowId+'-'
			+ id
			+ '" data-tt-id="'
			+ id
			+ '" class="drillsOpenDefault editRow collapsed '+rowId+'" data-om="'
			+ om
			+ '" data-supplier="'
			+ supplier
			+ '">'
			+ checkbox
			+ ' <td data-addon class="searchResultRow expanded"><span class="indenter" style="padding-left: 0px;"><a  title="Expand">&nbsp;</a></span>&nbsp;</td><td class="articleNo hideBlock" data-bind="articleNo" >'
			+ articleNo
			+ '</td><!--  <td class="description" style="white-space: nowrap;" data-bind="desc">'
			+ description
			+ '</td>--> <td class="centerValue columnDivider uom" data-bind="articleUom">'
			+ uom
			+ '</td>'
			+ '<td id="startDate-'
			+ id
			+ '" class="centerValue startDate">'
			+ startDate
			+ '</td> <td data-bind="promoStartDate" id="startDateEdit-'
			+ id
			+ '" class="centerValue hideBlock"><input type="#" class="textbox textboxDefaultText inputDate editDateCell " placeholder="dd/mm/yyyy" id="start-'+id+'" value="'
			+ startDate
			+ '"></td> <td id="endDate-'
			+ id
			+ '" class="centerValue columnDivider endDate">'
			+ endDate
			+ '</td> '
			
			+'<td data-bind="promoEndDate" id="endDateEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock"><input type="#" class="textbox textboxDefaultText inputDate editDateCell " placeholder="dd/mm/yyyy" id="end-'+id+'" value="'
			+ endDate
			+ '" ></td> '
			+ newelemt
			+ diptype
			+ deactivateStr
			+ '</tr>';
	var expand = '<tr data-tt-id="2" data-tt-parent-id="'
			+ id
			+ '" class="expandsubrow collapsed '+rowId+' row-'
			+ id
			+ '" style="display: none;" d> <td colspan="15"><span class="indenter" style="padding-left: 19px;"></span> <table cellspacing="0" class="ContentTable" width="100%"> <tbody> <!--<tr> <td class="keyInfo" width="10%"> Supplier: </td> <td class="valueInfo lastColumn" colspan="5"> '
			+ supplier
			+ ' </td> </tr>--> <tr class="lastRow"> <td colspan="6" class="lastColumn"> <label class="history">Sales History</label> '+notesElem+'</td> </tr> </tbody> </table> </td> </tr>';
	row += expand;
	return row;
}
function showPromotionListClr(obj) {
	if (obj.find('tr').length <= 3) {
		obj.removeClass("hideBlock").addClass("hideBlock");
//		$("#beforePublish").removeClass("hideBlock").addClass("hideBlock");
//		isShrunked = true;
//		$("#afterPublishDiv").removeClass("hideBlock").addClass("hideBlock");
//		$("#tableAddAction").removeClass("hideBlock");
//		$("#addActionBtn").removeClass("hideBlock");
	}else{
		obj.removeClass("hideBlock");
	}
}
function bindSaveAndDeleteForSearchRes(id,parentElem) {
	var rowId='searchPastRow';
	
	if($('#MR:checked').length==0){
		rowId='searchRow';
		
		/* when edit button is clicked displays input box in editable cells */
		parentElem.find(("#editRecordBtn-").concat(id)).click(function() {
			
			parentElem.find(("#"+rowId+"-").concat(id)).addClass('rowHighlight');
		
			parentElem.find(("#saveRecord-").concat(id)).removeClass('hideBlock');
			parentElem.find(("#editRecord-").concat(id)).addClass('hideBlock');		
			parentElem.find(("#newPriceEdit-").concat(id)).removeClass('hideBlock');
			parentElem.find(("#newPrice-").concat(id)).addClass('hideBlock');

			

		});
		
		/* when save button is clicked displays input box is disabled */
		parentElem.find(("#saveRecordBtn-").concat(id)).click(function() {
			if(validateNewPriceBeforeCreate(parentElem.find(("#searchRow-").concat(id)))){
				callServiceForUpdate(id,parentElem,rowId);	
			}	
			

		});

		

		// for delete event
		parentElem.find("#deactivateRecord-" + id).click(function() {
			deActivateConfirmation(confirmDeActivateMsg,id,parentElem);
		});
		
		parentElem.find("#"+rowId+"-" + id).find('#newPriceEdit-'+id+' .editNumCell').isNumberOrDecimal();
		
		
		// for new price change
		parentElem.find("#newPriceEdit-" + id).find('input[type="text"]').change(function(){
			console.log('inside hover');
			if((parentElem.find('#'+rowId+'-'+id).find('.per').is(':checked') || parentElem.find('#'+rowId+'-'+id).find('.dol').is(':checked'))&& parentElem.find("#newPriceEdit-" + id).find('input[type="text"]').val() != '')
			{
			setTimeout(function(){ 
				validateNewPrice(parentElem.find('#'+rowId+'-'+id));
			}, 100);
			}
		});
	}

	//bind event for sales history click
	parentElem.find('tr[data-tt-parent-id="'+id+'"]').find('.history').click(function(){
		getPromoAddtionalDtls(parentElem.find('#'+rowId+'-'+id).find("[data-bind='articleNo']").text(), parentElem.find('#'+rowId+'-'+id).find(("#startDateEdit-").concat(id)).find('input').val(),parentElem.find('#'+rowId+'-'+id).find("[data-bind='uom']").text());
	});
	
	$('.expandAll_active').unbind('click');
	
	//for expand all event in active or future promotions
	$('.expandAll_active').click(function()
			{
		if(!$('#expandAll_active').hasClass('hideBlock'))
			{
		$('#expandAll_active').addClass('hideBlock');
		$('#collapseAll_active').removeClass('hideBlock');
		$('#promoArticleListSearch .searchRow:visible .searchResultRow:visible').removeClass('expanded').addClass('collapsed');
		$('#promoArticleListSearch .searchRow:visible .searchResultRow:visible').closest('tr').next('tr').css('display','table-row');
			}
		else
			{
			$('#expandAll_active').removeClass('hideBlock');
			$('#collapseAll_active').addClass('hideBlock');
			$('#promoArticleListSearch .searchRow:visible .searchResultRow:visible').addClass('expanded').removeClass('collapsed');
			$('#promoArticleListSearch .searchRow:visible .searchResultRow:visible').closest('tr').next('tr').css('display','none');
			}
		//$('.searchResultRow:visible').find('a[title="Expand"]').trigger('click');
		
			});
	
	// for expand event
	parentElem.find("tr[data-tt-id='" + id + "']").find('a[title="Expand"]').click(
			function() {
				$("tr[data-tt-parent-id='" + id + "']").toggle();
				
				if($(this).parent().parent().hasClass('expanded')){
					$(this).parent().parent().removeClass('expanded');
					$(this).parent().parent().addClass('collapsed');					
				}else{
					$(this).parent().parent().removeClass('collapsed');
					$(this).parent().parent().addClass('expanded');
				}
				checkExpandAllorCollapseAll();
			});
	
	
	$('.expandAll_pasts').unbind('click');
	
	//for expand all event in past promotions
	$('.expandAll_pasts').click(function()
			{
		if(!$('#expandAll_pasts').hasClass('hideBlock'))
			{
		$('#expandAll_pasts').addClass('hideBlock');
		$('#collapseAll_pasts').removeClass('hideBlock');
		$('#promoArticleListSearchPast .searchPastRow:visible .searchResultRow:visible').removeClass('expanded').addClass('collapsed');
		$('#promoArticleListSearchPast .searchPastRow:visible .searchResultRow:visible').closest('tr').next('tr').css('display','table-row');
			}
		else
			{
			$('#expandAll_pasts').removeClass('hideBlock');
			$('#collapseAll_pasts').addClass('hideBlock');
			$('#promoArticleListSearchPast .searchPastRow:visible .searchResultRow:visible').addClass('expanded').removeClass('collapsed');
			$('#promoArticleListSearchPast .searchPastRow:visible .searchResultRow:visible').closest('tr').next('tr').css('display','none');
			}
		//$('.searchResultRow:visible').find('a[title="Expand"]').trigger('click');
		
			});
	
	$('.per').unbind('click');
	$('.per').click(function(){
		if($('.per').is(':checked'))
		{
		$(this).parent().prev('input').val('');
		}
		});
	
	$('.dol').unbind('click');
	$('.dol').click(function(){
		if($('.dol').is(':checked'))
		{
		$(this).parent().prev('input').val('');
		}
		});
	parentElem.find('.dol').trigger('click');
	securityMatrix();
	$("#beforePublish").addClass('hideBlock'); // added for application settings issue
}
function callServiceForUpdate(id,elem,rowId){
	var toDeactivate=activePromotionList[id];
	toDeactivate.promo_price=elem.find('#newPriceEdit-'+id).find('input[type="text"]').val();
	$.ajax({
		type :"post",
		url  :"updatePromo.htm",
		contentType :"application/json",
		data : JSON.stringify(toDeactivate),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj;
			}
			
			if (message == 'success') {
				elem.find(("#newPrice-").concat(id)).text(elem.find(("#newPriceEdit-").concat(id)).find('input').val());
				elem.find(("#"+rowId+"-").concat(id)).removeClass('rowHighlight');			

				elem.find(("#saveRecord-").concat(id)).addClass('hideBlock');
				elem.find(("#editRecord-").concat(id)).removeClass('hideBlock');
				elem.find(("#newPriceEdit-").concat(id)).addClass('hideBlock');
				elem.find(("#newPrice-").concat(id)).removeClass('hideBlock');
			} else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			}
			else {
				elem.find(("#newPriceEdit-").concat(id)).find('input').val(elem.find(("#newPrice-").concat(id)).text());
				
				if(message==undefined||message=='failed'){
					message="Technical issue occured.Please contact java support.";
				}
				//console.log(message);
				showInformation("Update Failed.");
				stopLoading();
				
			}
			stopLoading();
		},
		error : function() {
			showInformation('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		}
	});
	return false;
}
function deActivateConfirmation(msg,id,elem) {
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').find('label').text('Ok');
	$("#dialog-confirmation").find('#cancel').find('label').text('Cancel');
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Confirmation');
	$("#dialog-confirmation").find('#ok').click(function(){
		
		callServiceForDeactivate(id,elem);		
		//need to remove the item from the list
		$("#searchRow-" + id).find('.lastColumn').text('').html('<label class="deactive">De-activated</label>');
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function(){
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
}
function getDesiredDate(count)
{
var desiredDate ='';
var thatDay = new Date(new Date().getTime() - 86400000* count);
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
function getArticleSearchResultPast(data,pageNo) {
	var originalData = data;
	currentPageInPast=pageNo;
	
	data = data+'&pageNo='+pageNo+'&records=10';
	$('#promoArticleListSearchPast').html('');
	$.ajax({
		type : "post",
		url  : "searchArticleCompetitionPast.htm",
		data : data,
		
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//console.log(response);
			var message = '';
			output = $.parseJSON(response);
			message = output.data.msg;
			$('.pastsResultTitle').addClass('hideBlock');
			//console.log(message);
			if (message == 'success') {
				addSearchResultItem(output.data.instorePromoSearchRes,originalData);
				stopLoading();
				
			} 
			else if(message== 'noData')			{
				message='No Competition promotion found for search criteria.';
				//console.log(message);
				showErrorClr(message);
				stopLoading();
			}else if(message == 'logout'){
				gotoHomeScreenSessionExpired();
			}else {
				//console.log(message);
				showErrorClr(message);
				stopLoading();
			}
			
			if($('#MR:checked').length==1){
				
				showPromotionListClr($('#promoListSearchPast'));
			}else{
				
				showPromotionListClr($('#promoListSearch'));			
			}
		},
		error : function() {
			showErrorClr('Sorry, Some technical issue occured.');
			stopLoading();
			if($('#MR:checked').length==1){
				$('.searchPastRow').remove();
				showPromotionListClr($('#promoListSearchPast'));
			}else{
				
				showPromotionListClr($('#promoListSearch'));			
			}
			// stopLoading();// goToLogin();
		},
	});

}
function isDesiredRole(obj,key)
{
    return obj.hasOwnProperty(key);
}

function populateDepartment() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						departmentList = temList;
						departmentMap = $groupBy(departmentList, function(obj) {
							return obj.node_id;
						});
						var selectContent;
						selectContent = '<option value="Select">Select</option>';
						for ( var j = 0; j < temList.length; j++) {
							selectContent += '<option value="'
									+ temList[j].node_id + '">'
									+ temList[j].node_desc + '</option>';
						}
						$('#departmentDrpDwn').html(selectContent);
					}
				},
				error : function(response) {
				},
			});

}
function checkExpandAllorCollapseAll()
{
	if($('#promoListSearch').find('td.searchResultRow:visible').length == $('#promoListSearch').find('td.expanded:visible').length)
	{
	$('#expandAll_active').removeClass('hideBlock');
	$('#collapseAll_active').addClass('hideBlock');
	}
else if($('#promoListSearch').find('td.searchResultRow:visible').length == $('#promoListSearch').find('td.collapsed:visible').length)
	{
	$('#expandAll_active').addClass('hideBlock');
	$('#collapseAll_active').removeClass('hideBlock');
	}
	
	if($('#promoArticleListSearchPast').is(':visible'))
	{
	if($('#promoArticleListSearchPast').find('.searchResultRow.collapsed:visible ').length == $('#promoArticleListSearchPast').find('.row:visible').length)
	{
$('#expandAll_pasts').addClass('hideBlock');
$('#collapseAll_pasts').removeClass('hideBlock');
	}
else if($('#promoArticleListSearchPast').find('.searchResultRow.expanded:visible ').length == $('#promoArticleListSearchPast').find('.row:visible').length)
	{
	
		$('#expandAll_pasts').removeClass('hideBlock');
		$('#collapseAll_pasts').addClass('hideBlock');
	}
	}
	
	if($('#promoListTbody').is(':visible') && $('#MM').is(':checked') && $('#listOption').is(':disabled'))
	{
	if($('#promoListTbody').find('.draftRow.collapsed:visible ').length == $('#promoListTbody').find('.row:visible').length)
	{
$('#expandAll').addClass('hideBlock');
$('#collapseAll').removeClass('hideBlock');
	}
else if($('#promoListTbody').find('.draftRow.expanded:visible ').length == $('#promoListTbody').find('.row:visible').length)
	{
	
		$('#expandAll').removeClass('hideBlock');
		$('#collapseAll').addClass('hideBlock');
	}
	}
	
}
function unique(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1)
			result.push(e);
	});
	return result;
}
function validateStartandEndDateInSearch()
{
	var flag = true;
	if($('#start').val() != '' && $('#end').val() != '')
	{
	var streq;
	var endreq;
	var streqvalid;
	var endreqvalid;
	var strNoPast;
	var endNoPast;
 streq=$('#start').required();
 endreq=$('#end').required();
 if(streq && endreq)
	 {
 streqvalid=$('#start').isValidDate();
 endreqvalid=$('#end').isValidDate();
	 }
if(streqvalid && endreqvalid )
	{
 strNoPast = $('#start').noPastValidation();
 endNoPast = $('#end').noPastValidation();
	}
	if(streq && endreq && streqvalid && endreqvalid && strNoPast  && endNoPast ){
	flag = $('#start').startEndValidationForOtherPromo($('#end'),0);
	if(flag){
		flag = $('#end').oneMonthDateValidation($('#start'),0);				
	}
	}
	else
		{
		return false;
		}
}
	else if(($('#start').val() == '' && $('#end').val() != '') || ($('#start').val() != '' && $('#end').val() == ''))
	{
		showError('Please check the date range.');
		if($('#start').val() == '')
		$('#start').addClass(errorFieldClass);
		if($('#end').val() == '')
		$('#end').addClass(errorFieldClass);
		flag = false;
	}
	return flag;
}
function getArticleSearchResultInPast() {
	var articleInfo='';
		
		articleInfo = $('#articleSearch').val().split('-')[0];
			//console.log("articleInfo****"+articleInfo);
		//var param= { "ARTICLE_INFO":articleInfo,AUTOSTOCK_IND:"N"};
		
		var articleNoFlag = "";
		var descFlag = "";
		var gtinFlag = "";
		var srcOfSupplyInd;
		var supplierNo;

			srcOfSupplyInd = "";
			supplierNo = "";

		if (isNaN((articleInfo).split('-')[0]))
			descFlag = "Y";
		else if (!isNaN((articleInfo).split('-')[0])
				&& (articleInfo).split('-')[0].length <= 7)
			articleNoFlag = "Y";
		else if (!isNaN((articleInfo).split('-')[0])
				&& (articleInfo).split('-')[0].length > 7)
			gtinFlag = "Y";
			var nodeLevel = "";
			var nodeId = "";
			
			var departmentNo=$('#departmentDrpDwn').val();
			if(departmentNo!='Select')
				{
				nodeLevel = "2";
				nodeId = departmentNo;
				}
			
		var param = {
			"iv_desc" : descFlag,
			"iv_article_no" : articleNoFlag,
			"iv_gtin" : gtinFlag,
			"iv_article" : articleInfo,
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_supplier" : supplierNo,
			"iv_src_supply" : srcOfSupplyInd,
			"iv_ranged" : "Y",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_site" : $('#posSite').val(),
			"iv_node_id" : nodeId,
			"iv_node_level" : nodeLevel,
			"iv_barcode_flag" : "",
			"iv_prime_vendor" : "",
			"iv_auto_stockr_flag" : "N",
			"iv_delisted_flag" : "N",
			"iv_uom_flag" : "N"
		};
		console.log(articleSearchInISPUrl + ' ' + JSON.stringify(param));
		$.ajax({
			type : "post",
			url  : articleSearchInISPUrl,
			data : JSON.stringify(param),
			
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
			
				if (response.length > 1) {
					$('#searchText').text($('#articleSearch').val());
					$('#searchArticleCount').text(response.length);
					$('#articleSearchTbody').html(
							populateSearchResultInPast(response));
					$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
					$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text(
					'Select Articles');
					$('#addtolist').parent().parent().addClass('hideBlock');
					$("#dialog-mulipleArticles").dialog("open");
					bindSelectevent();
				} else if (response.length == 1 && response[0].article != undefined) {
					$('#articleSearch').val(response[0].article+'-'+response[0].article_desc);	
					getArticleSearchResultPast($('#searchForm')
							.serialize(),1);	
				} else {
					$('#promoArticleListSearchPast').html('');
					showErrorClr("Article not found. Please try again.");
					showPromotionListClr($('#promoListSearchPast'));
					stopLoading();
				}
				stopLoading();
			},
			error : function() {
				showErrorClr('Sorry, Some technical issue occured.');
				stopLoading();
				// stopLoading();// goToLogin();
			},
		});

	}

function populateSearchResultInPast(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTrInPast(list[i]);
	}
	return content;
}

function getTrInPast(obj) {
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var tr = '<tr data-om="'
			+ (obj.om != null && obj.om != undefined ? obj.om : '1')
			+ '" data-supplier="'
			+ obj.supplier
			+ '" data-stdPrice="'
			+ (obj.standard_sell_price != null && obj.standard_sell_price != undefined ? obj.standard_sell_price : '0')
			+ '" data-promoPrice="0'
			+ '" data-ParentNo="'
			+  articleNo
			+ '" ><td id="articleNo">'
			+ articleNo
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ (obj.article_uom != null && obj.article_uom != undefined ? obj.article_uom : '')
			+ '</td><td widtd="40px" class="centerValue lastColumn"><label class="linkBtn"><label class="selectItem selectArticle">Select</label></label></td></tr>';
	return tr;
}
function bindSelectevent()
{
	$('.selectArticle').unbind('click');
	$('.selectArticle').click(
			function() {
				var selectedArticleNo = $(this).parent().parent().parent().find('#articleNo').text().trim();
				var selectedArticleDesc = $(this).parent().parent().parent().find('#description').text().trim();
				$('#articleSearch').val(selectedArticleNo+'-'+selectedArticleDesc);	
				getArticleSearchResultPast($('#searchForm')
						.serialize(),1);	
				$("#dialog-mulipleArticles").dialog("close");
			});	
}
function getConfigData()
{

	var param = {
			iv_sales_org : salesOrgVal,
			iv_role_id : roleId,
			iv_promo_type : 'ZCOM'
			
	};
	console.log(getPromoConfigurationURL+' '+ JSON.stringify(param));
	$.ajax({
		type : "post",
		url  : getPromoConfigurationURL,
		data : JSON.stringify(param),
		
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if(response!=null && response!=undefined && response.length > 0 
					&& response[0].ErrorID==undefined){
				freshFoodDayLimit = response[0].range_days;
				var inPromotionConstants = response[0].isp_constants;
				console.log(freshFoodDayLimit + ' '+ inPromotionConstants);
				var otherConstants = inPromotionConstants.split(',');	
				var constantsMap = {};
				for(var i=0 ;i<otherConstants.length;i++ )
					{
					var optionName = otherConstants[i].split(':')[0].trim();
					if(isNaN(optionName))
					{
					var optionValue = otherConstants[i].split(':')[1].trim();
					constantsMap[optionName] = optionValue;
					}
					}
				console.log(constantsMap);
				if(!isEmptyMap(constantsMap))
					{
					demandLimit = constantsMap["ZDIS_DEMAND_LIMIT"];
					buildBigwLimit = constantsMap["ZDIS_BIGW_BUILD_LIMIT"];
					displayLimit = constantsMap["ZDIS_DISPLAY_LIMIT"];
					maxlimit = constantsMap["ZDIS_MAX_LIMIT"];
					maxRangeValue=constantsMap["MAX_RANGE_VALUE"];
					minRangeValue=constantsMap["MIN_RANGE_VALUE"];
					bigwdaylimit = constantsMap["BIGW_DAY_LIMIT"];
					supersdaylimit = constantsMap["SUPERS_DAY_LIMIT"];
					supersotherpromodaylimit =constantsMap["SUPERS_OTHER_PROMO_DAY_LIMIT"];
					}
			}else{
				
				if(response!=undefined && response.length > 0 && response[0].ErrorID!=undefined){
					showAllErrors('Technical issue occured in SQL Anywhere, While getting promotion configuration data');
				}else{
					//showAllErrors('Sorry, Some technical issue occured');
				}
			}
			stopLoading();
		},
		error : function () {
			stopLoading();
		}
	});

	
}