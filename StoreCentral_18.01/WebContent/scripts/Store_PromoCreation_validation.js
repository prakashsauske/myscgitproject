var articleSearchResult;
var promoList;
var adType;
var isBigw;
var isShrunked = true;
var  toFilerList;
var verified='<label class="success">Verified</label>';
var failed='<label class="failed">Failed</label>';
$(document).ready(
		function() {
			
			$('#price').parent('ul').find('li').removeClass('selectedMenu');
			$('#price').addClass('selectedMenu');

			isBigw = $('#isBigw').val();
			adType = $('#adType').html();
			// code for setting default parameters for popups
			$("#dialog-mulipleArticles").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				maxHeight : 800,
				width : 515
			});

			$("#dialog-create").dialog({
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

			$("#searchAndAdd").click(
					function() {
						$('#errorMsgDiv').removeClass('hideBlock').addClass(
								'hideBlock');
						if (!$('#article').required()) {
							showError('Please enter article to search.');
						} else {
							if ($('#start').startEndValidation($('#end'))) {
								getArticleSearchResult($(submitQuery)
										.serialize());
							}else{
								showError('Please check start date and end date.');
							}

						}
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

			// Code to show and hide filter

			$('#filterOpen').click(
					function() {
						if ($('#promoArticleList').find('tr').length > 3) {
							$("#filterClear").removeClass('hideBlock');
							$(".filterRow").removeClass('hideBlock');
							showTips();
							if (isShrunked) {
								$('td[data-addonfilter]').removeClass(
										'hideBlock').addClass('hideBlock');
							} else {
								$('td[data-addonfilter]').removeClass(
										'hideBlock');
							}
							$(this).addClass('hideBlock');
						}
					});

			$('#filterClear').click(function() {
				$('.Filter').val('');
				$('#promoArticleList tr[data-om]').removeClass('hideBlock');
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
				var size = $(".promolistcheckbox:checked").length;
				if (size == 0) {
					$('#beforePublish').find('.thumbUp').text(
							'Proceed to Create');
				} else {
					$('#beforePublish').find('.thumbUp').text(
							'Proceed to Create(' + size + ')');
				}
				
			});

			// beforeCreate button event
			$("#beforePublish").click(
					function() {
						hideError();

						if ($(".promolistcheckbox:checked").length == 0) {
							showError('Please Select any article to proceed.');
							return false;
						}

						if(validateDraft($('#promoArticleList tr[data-om]'))){							
							var formData=getPostDataObj4ArticleInfoStr($('#promoArticleList tr[data-om]'));
							$('.saveRecord').trigger('click');
							getArticleInfo(formData);							
						 }else{
							 return false;
						 }

					});

			$('#backBtn').click(
					function() {
						$('#instructionalText2').removeClass('hideBlock')
								.addClass('hideBlock');
						$('#instructionalText1').removeClass('hideBlock');
						$('#addActionBtn').removeClass('hideBlock');
						$('#tableAddAction').removeClass('hideBlock');
						$('#beforePublish').removeClass('hideBlock');
						$('#afterPublishDiv').removeClass('hideBlock')
								.addClass('hideBlock');
						$('.saveRecord').trigger('click');
						shrunkTable();
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
			filterinput.each(
					function() {
						var filterfor = $(this).attr('data-filterfor');
						console.log('for filter :' + filterfor);
						$(this).unbind('keyup');
						$(this).on(
								'keyup',
								function() {
									var visible=false;					
									
									
									if(isShrunked){  
										toFilerList=$('#promoArticleList tr[data-om]');
									}									
									else {  }//get rows from globally;
									
									filterinput.each(
											function() {
												var trList;
												var elem=$(this);
												console.log("elem"+elem.val());
												if(elem.val().trim()!=''){
													filterfor = elem.attr('data-filterfor');
													filtertext = $(this).val();
													console.log('for filter :' + filterfor);
													if(!visible){
														toFilerList.addClass('hideBlock');
														toFilerList.find('.'
															+ filterfor + ':contains('
															+ filtertext + ')').parent('tr').removeClass('hideBlock');
										
													}else{
														trList=$('#promoArticleList tr[data-om]:visible .'
														+ filterfor + ':contains('
														+ filtertext + ')').parent('tr');
														$('#promoArticleList tr[data-om]')
														.addClass('hideBlock');
														console.log(trList.length);
														trList.removeClass('hideBlock');
													}							
													
													
													visible=true;
												}
												if(!visible){
													toFilerList.removeClass('hideBlock');
												}
											});
								});
					});
			
			$("#validateButton").click(function(){
				validatebeforeCreatePromotion($('#promoArticleList tr[data-om]:visible'));
			});
			$("#PublishButton").click(function(){
				if(!$(this).hasClass('disabled')){
					callServiceForCreate();
				}
			});
			
		});

function getArticleSearchResult(data) {

	$.ajax({
		type : "get",
		url : "searchArticle.htm",
		data : data,
		
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
			var message = '';
			output = $.parseJSON(response);
			message = output.data.message;
			console.log(message);
			if (message == 'success') {
				$('#searchText').text($('#article').val());
				$('#searchArticleCount').text(output.data.articleList.length);
				$('#articleSearchTbody').html(
						populateSearchResult(output.data.articleList));
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				$("#dialog-mulipleArticles").dialog("open");
				bindCheckboxevent();
			} else if (message == 'directadd') {
				addSingleArticleToPromoList(output.data.articleList[0]);
				showPromoList();
			} else {
				console.log(message);
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

function getArticleInfo(data) {

	var param={"inStorePromoArticleInfoList":$.parseJSON(data)};
	console.log(param);
	$.ajax({
		type :"post",
		url  :"moreArticleInfo.htm",
		contentType :"application/json",
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			if (message == 'success') {	
				if(validateNextDeliveryDate(dataObj)){
					generateList(dataObj);
				}
			} 
			else {
				if(message==undefined){
					message="Technical issue occured.Please contact java support.";
				}
				console.log(message);
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
	var errors='';
	var flag=false;
	
	for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
		obj=dataObj.inStorePromoArticleInfoList[i];
		if(null!=obj.deliveryDate && obj.deliveryDate.trim()!=''&& obj.deliveryDate.trim()!=undefined){
			
		}else{
			errors+=getError(obj.articleNo, 'No vaild delivery is available for the selected start date');
			flag=true;
		}
	}	

	if(flag){
		showWarning(errors);
		return true;
	}
	return true;
}

function generateList(dataObj){
	
	$('#instructionalText1').removeClass('hideBlock')
	.addClass('hideBlock');
	$('#instructionalText2').removeClass('hideBlock');
	$('#addActionBtn').removeClass('hideBlock').addClass('hideBlock');
	$('#tableAddAction').removeClass('hideBlock').addClass('hideBlock');
	$('#beforePublish').removeClass('hideBlock').addClass('hideBlock');
	$('#afterPublishDiv').removeClass('hideBlock');
	expandTable(dataObj);
}

function populateSearchResult(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTr(list[i]);
	}
	return content;
}

function getTr(obj) {
	var tr = '<tr data-om="'
			+ obj.om
			+ '" data-supplier="'
			+ obj.srcOfSupplyDesc
			+ '" ><td id="articleNo">'
			+ obj.articleNo
			+ '</td><td id="description">'
			+ obj.description
			+ '</td><td class="centerValue" id="uom" >'
			+ obj.uom
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
	return tr;
}

function showError(msg) {
	$('#errorMsgDiv').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}
function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}
function hideErrors(){
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

function bindCheckboxevent() {
	$('input[name="articlecheckbox"]').change(function() {
		var size = $('input[name="articlecheckbox"]:checked').length;
		if (size > 0) {
			$('#addtolist').text("Add To List(" + size + ")");
		} else {
			$('#addtolist').text("Add To List");
		}
	});
}
function addArticleToPromoList() {
	$('input[name="articlecheckbox"]:checked').each(
			function() {
				var rowObj = $(this).parent().parent();
				var articleNo = rowObj.find('#articleNo').text();
				var description = rowObj.find('#description').text();
				var uom = rowObj.find('#uom').text();
				var supplier = rowObj.attr('data-supplier');
				var om = rowObj.attr('data-om');
				var startDate = $('#start').val();
				var endDate = $('#end').val();
				var dispType = $('#adType').val();
				var dispText = $('#adType').find(
						'option[value="' + dispType + '"]').text();

				var id = articleNo.trim() + '_' + uom.trim();

				if ($('#row-' + id).length == 0) {
					$('#promoArticleList').append(
							getPromoItemAsHTML(articleNo, description, uom, id,
									supplier, om, startDate, endDate, dispType,
									dispText));
					$("#row-" + id).find("#dispType").val(dispType);
					bindSaveAndDelete(id);
					showPromoList();
					shrunkTable();
				} else {
					console.log('Article already exist:' + articleNo);
				}

			});
}

function addSingleArticleToPromoList(obj) {

	var articleNo = obj.articleNo;
	var description = obj.description;
	var uom = obj.uom;
	var supplier = obj.supplier;
	var om = obj.om;
	var startDate = $('#start').val();
	var endDate = $('#end').val();
	var dispType = $('#adType').val();
	var dispText = $('#adType').find('option[value="' + dispType + '"]').text();

	var id = articleNo.trim() + '_' + uom.trim();

	if ($('#row-' + id).length == 0) {
		$('#promoArticleList').append(
				getPromoItemAsHTML(articleNo, description, uom, id, supplier,
						om, startDate, endDate, dispType, dispText));
		$("#row-" + id).find("#dispType").val(dispType);
		bindSaveAndDelete(id);
		showPromoList();
		shrunkTable();
	} else {
		console.log('Article already exist:' + articleNo);
	}

}

function getPromoItemAsHTML(articleNo, description, uom, id, supplier, om,
		startDate, endDate, dispType, dispText) {
	var checkbox = '<td data-addon-sh><input type="checkbox"  class="promolistcheckbox" /></td>';
	var delvryDte = '<td id="deliveryDate-'
			+ id
			+ '" class="centerValue deliveryDate" data-addon ></td> <td data-bind="deliveryDate" id="deliveryDateEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable> <input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker" placeholder="dd/mm/yyyy" id="dp1418303194011"> </td>';
	var newelemt = '<td class="centerValue columnDivider base" data-addon data-bind="baseFrct" ></td><td id="demand-'
			+ id
			+ '" class="centerValue demand" data-addon></td> <td data-bind="demandQty" id="demandEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable> <input type="#" value="" class="editNumCell textbox textboxDefaultText"> </td> <td id="display-'
			+ id
			+ '" class="centerValue display"  data-addon></td> <td id="displayEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable data-bind="displayQty"> <input type="#" value="" class="editNumCell textbox textboxDefaultText"> </td> <td id="build-'
			+ id
			+ '" class="centerValue columnDivider build" data-addon></td> <td data-bind="buildQty" id="buildEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock" data-addon-editable> <input type="#" value="" class="editNumCell textbox textboxDefaultText"> </td>';
	var diptype = '';
	if (isBigw == 'true')
		diptype = '<td id="advDisplay-'
				+ id
				+ '" class="centerValue columnDivider advDisplay">'
				+ dispText
				+ '</td> <td data-bind="displayType" id="advDisplayEdit-'
				+ id
				+ '" class="centerValue columnDivider hideBlock"><select class="combobox editSelectCell" style="width: 78px;" id="dispType" style="white-space: nowrap;">'
				+ adType + '</select></td>';
	var row = '<tr id="row-'
			+ id
			+ '" data-tt-id="'
			+ id
			+ '" class="drillsOpenDefault collapsed" data-om="'
			+ om
			+ '" data-supplier="'
			+ supplier
			+ '">'
			+ checkbox
			+ ' <td data-addon><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td> <td class="articleNo" data-bind="articleNo" >'
			+ articleNo
			+ '</td> <td class="description" style="white-space: nowrap;" data-bind="desc">'
			+ description
			+ '</td> <td class="centerValue columnDivider uom" data-bind="articleUom">'
			+ uom
			+ '</td>'
			+ delvryDte
			+ '<td id="startDate-'
			+ id
			+ '" class="centerValue startDate">'
			+ startDate
			+ '</td> <td data-bind="promoStartDate" id="startDateEdit-'
			+ id
			+ '" class="centerValue hideBlock"><input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker" placeholder="dd/mm/yyyy" id="dp1416904039564" value="'
			+ startDate
			+ '"></td> <td id="endDate-'
			+ id
			+ '" class="centerValue columnDivider endDate">'
			+ endDate
			+ '</td> <td data-bind="promoEndDate" id="endDateEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock"><input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker" placeholder="dd/mm/yyyy" id="dp1416904039565" value="'
			+ endDate
			+ '" ></td> '
			+ newelemt
			+ diptype
			+ ' <td class="centerValue columnDivider status">Draft</td> <td class="lastColumn rightAlign"><label class="linkBtn editRowBtn" id="editRecord-'
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
			+ '" class="collapsed row-'
			+ id
			+ '" style="display: none;" d> <td colspan="15"><span class="indenter" style="padding-left: 19px;"></span> <table cellspacing="0" class="ContentTable" width="100%"> <tbody> <tr> <td class="keyInfo" width="10%"> Supplier: </td> <td class="valueInfo lastColumn" colspan="5"> '
			+ supplier
			+ ' </td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"> <label class="history">Sales History</label> <label class="notes tooltip" title="Sample text for notes" id="notes-'
			+ id
			+ '">Notes</label> <label class="notes hideBlock" id="notesEdit-'
			+ id
			+ '"><input type="textbox" class="textbox articleSearchText" placeholder="Enter notes"></label> </td> </tr> </tbody> </table> </td> </tr>';
	row += expand;
	return row;
}
function bindSaveAndDelete(id) {
	/* when edit button is clicked displays input box in editable cells */
	$(("#editRecordBtn-").concat(id)).click(function() {

		$(("#row-").concat(id)).addClass('rowHighlight');

		// $(("#UOMEdit-").concat(id)).removeClass('hideBlock');
		// $(("#UOM-").concat(id)).addClass('hideBlock');

		$(("#startDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#startDate-").concat(id)).addClass('hideBlock');

		$(("#endDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#endDate-").concat(id)).addClass('hideBlock');

		$(("#advDisplayEdit-").concat(id)).removeClass('hideBlock');
		$(("#advDisplay-").concat(id)).addClass('hideBlock');

		$(("#notesEdit-").concat(id)).removeClass('hideBlock');
		$(("#notes-").concat(id)).addClass('hideBlock');

		$(("#saveRecord-").concat(id)).removeClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');

		if ($("#deliveryDateEdit-" + id).hasClass('expanded')) {

			$(("#deliveryDateEdit-").concat(id)).removeClass('hideBlock');
			$(("#deliveryDate-").concat(id)).addClass('hideBlock');

			$(("#demandEdit-").concat(id)).removeClass('hideBlock');
			$(("#demand-").concat(id)).addClass('hideBlock');

			$(("#displayEdit-").concat(id)).removeClass('hideBlock');
			$(("#display-").concat(id)).addClass('hideBlock');

			$(("#buildEdit-").concat(id)).removeClass('hideBlock');
			$(("#build-").concat(id)).addClass('hideBlock');
		}

	});

	/* when save button is clicked displays input box is disabled */
	$(("#saveRecordBtn-").concat(id)).click(function() {
		
		$(("#row-").concat(id)).find('input,select').parent().each(function(){
			try{
				var labelid=$(this).attr('id').split('-')[0].replace('Edit','');
				$(("#"+labelid+'-').concat(id)).text($(this).find('input').val());
			}catch(err){
				
			}
		});	
		

		$(("#row-").concat(id)).removeClass('rowHighlight');

		// $(("#UOMEdit-").concat(id)).addClass('hideBlock');
		// $(("#UOM-").concat(id)).removeClass('hideBlock');

		$(("#startDateEdit-").concat(id)).addClass('hideBlock');
		$(("#startDate-").concat(id)).removeClass('hideBlock');

		$(("#endDateEdit-").concat(id)).addClass('hideBlock');
		$(("#endDate-").concat(id)).removeClass('hideBlock');

		$(("#advDisplayEdit-").concat(id)).addClass('hideBlock');
		$(("#advDisplay-").concat(id)).removeClass('hideBlock');

		$(("#notesEdit-").concat(id)).addClass('hideBlock');
		$(("#notes-").concat(id)).removeClass('hideBlock');

		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).removeClass('hideBlock');

		if ($("#deliveryDateEdit-" + id).hasClass('expanded')) {

			$(("#deliveryDate-").concat(id)).removeClass('hideBlock');
			$(("#deliveryDateEdit-").concat(id)).addClass('hideBlock');

			$(("#demand-").concat(id)).removeClass('hideBlock');
			$(("#demandEdit-").concat(id)).addClass('hideBlock');

			$(("#display-").concat(id)).removeClass('hideBlock');
			$(("#displayEdit-").concat(id)).addClass('hideBlock');

			$(("#build-").concat(id)).removeClass('hideBlock');
			$(("#buildEdit-").concat(id)).addClass('hideBlock');
		}

	});

	// for expand event
	$("tr[data-tt-id='" + id + "']").find('a[title="Expand"]').click(
			function() {
				$("tr[data-tt-parent-id='" + id + "']").toggle();
			});

	// for delete event
	$("#deleteRecordBtn-" + id).click(function() {
		$("#row-" + id).remove();
		$(".row-" + id).remove();
		hidePromoList();
	});
	$(".promolistcheckbox").unbind('click');
	$(".promolistcheckbox").click(
			function() {
				var size = $(".promolistcheckbox:checked").length;
				if (size == 0) {
					$('#beforePublish').find('.thumbUp').text(
							'Proceed to Create');
				} else {
					$('#beforePublish').find('.thumbUp').text(
							'Proceed to Create(' + size + ')');
				}
				if (size == $(".promolistcheckbox").length) {
					$("#promolistcheckboxall").prop('checked', true);
				} else {
					$("#promolistcheckboxall").prop('checked', false);
				}

	});
	
	$(("#row-").concat(id)).find('input,select').change(function(){
		$(("#row-").concat(id)).find('.status').text('Draft');
		$("#PublishButton").addClass('disabled');
	});

	$(".combobox").combobox();
	
	$("#row-" + id).find(".editNumCell").numbersonly();
	
	
	//change start date on delivery date chage
	$("#deliveryDateEdit-" + id).find('input').change(function(){
		if(isValidDate($(this).val())){
			$("#startDateEdit-" + id).find('input').val($(this).val());
		}
	});

}

function showPromoList() {
	if ($('#promoArticleList').find('tr').length > 3) {
		$("#promoList").removeClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock");
	} else {
		hidePromoList();
	}
}

function hidePromoList() {
	if ($('#promoArticleList').find('tr').length <= 3) {
		$("#promoList").removeClass("hideBlock").addClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock").addClass("hideBlock");
	}
}

function shrunkTable() {
	$('td[data-addon-sh]').removeClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('expanded').addClass('shrunked');
	$('td[data-addon-editable]').removeClass('expanded').addClass('shrunked');
	$('th[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('th[data-changeColspan]').attr('colspan', '2');
	$('#filterClear').trigger('click');
	isShrunked = true;
}

function expandTable(dataObj) {	
	
	$('td[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('shrunked').addClass('expanded');
	$('td[data-addon-editable]').removeClass('shrunked').addClass('expanded');
	$('th[data-addon]').removeClass('hideBlock');
	$('th[data-changeColspan]').attr('colspan', '3');
	$('#filterClear').trigger('click');
	
	
	$('tr[data-om]').addClass('hideBlock');
	for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
		var item=dataObj.inStorePromoArticleInfoList[i];
		var id=item.articleNo+'_'+item.articleUom;		
		$('#row-'+id).removeClass('hideBlock');
//		$('#row-'+id).find('td[data-bind="deliveryDate"] input').val($('#row-'+id).find('td[data-bind="promoStartDate"] input').val());
		
		if(null!=item.deliveryDate && item.deliveryDate.trim()!=''&& item.deliveryDate.trim()!=undefined){
			$('#deliveryDate-'+id).text(item.deliveryDate);
			$('#deliveryDateEdit-'+id).find('input').val(item.deliveryDate);
		}
		
		if(null!=item.wtdQty && item.wtdQty.trim()!=''&& item.wtdQty.trim()!=undefined){
			$('#row-'+id).attr('data-wtd',item.wtdQty);
		}else{
			$('#row-'+id).attr('data-wtd','0');
		}
		
		if(null!=item.baseFrct && item.baseFrct.trim()!=''&& item.baseFrct.trim()!=undefined){
			$('#row-'+id).find('td[data-bind="baseFrct"]').text(item.baseFrct);
		}
		else{
			$('#row-'+id).find('td[data-bind="baseFrct"]').text('0');
		}
		
		if(null!=item.om && ""!=item.om.trim() && item.om!=undefined){
			$('#row-'+id).attr('data-om',dataObj.om);
		}
		else{
			$('#row-'+id).attr('data-om','0');
		}
		
		if(parseInt($('#row-'+id).attr('data-wtd'))<parseInt($('#row-'+id).find('td[data-bind="baseFrct"]').text()))
		{
			$('#demand-'+id).text(parseInt($('#row-'+id).find('td[data-bind="baseFrct"]').text()));
			$('#demandEdit-'+id).find('input').val(parseInt($('#row-'+id).find('td[data-bind="baseFrct"]').text()));
		}else{
			$('#demand-'+id).text(parseInt($('#row-'+id).attr('data-wtd')));
			$('#demandEdit-'+id).find('input').val(parseInt($('#row-'+id).attr('data-wtd')));
		}
		
	}
	toFilerList=$('tr[data-om]:visible');
	
	isShrunked = false;
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
	rowList.find('.promolistcheckbox:checked').each(function() {
		var obj = $(this).parent().parent();
		var streq=obj.find('td[data-bind="promoStartDate"] input').required();
		var endreq=obj.find('td[data-bind="promoEndDate"] input').required();
		var streqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
		var endreqvalid=obj.find('td[data-bind="promoEndDate"] input').isValidDate();
		if(streq && endreq && streqvalid && endreqvalid){
			if(!obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'))){
				flag=false;
				obj.find('.editRecord').trigger('click');
			}
		}else{
			flag=false;
			obj.find('.editRecord').trigger('click');
		}
	});
	
	return flag;
}

function getPostDataObj4ArticleInfo(rowList){
	var paramData=[];
	rowList.find('.promolistcheckbox:checked').each(function() {
		var obj = $(this).parent().parent();
		if(obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'))){
			var itemData=getRowAsJSON(obj);
			paramData.push(itemData);
		}
	});
	return paramData;
}

function getPostDataObj4ArticleInfoStr(rowList){
	var paramData='[';
	var i=1;
	rowList.find('.promolistcheckbox:checked').each(function() {
		var obj = $(this).parent().parent();
		if(obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'))){
			var itemData=getRowAsJSONStr(obj);
			paramData+=itemData;
		}
		i++;
		if(i!=rowList.find('.promolistcheckbox:checked').length+1){
			paramData+=",";
		}		
	});
	paramData+=']';
	console.log(paramData);
	return paramData;
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
		if($(this).find('input').length==1){
			value=$(this).find('input').val();
		}else{
			value=$(this).text();
		}
		result+='"'+name+'":"'+value+'"';
		i++;
		if(i!=obj.find('td[data-bind]').length+1){
			result+=",";
		}
	});
	result+='}';
	console.log(result);
	return result;
}


function validatebeforeCreatePromotion(rowList){
	var flag=true;
	rowList.each(function() {
		var obj = $(this);
		var streq=obj.find('td[data-bind="promoStartDate"] input').required();
		var endreq=obj.find('td[data-bind="promoEndDate"] input').required();
		var delreq=obj.find('td[data-bind="deliveryDate"] input').required();
		var streqvalid=obj.find('td[data-bind="promoStartDate"] input').isValidDate();
		var endreqvalid=obj.find('td[data-bind="promoEndDate"] input').isValidDate();
		var deliveryDatereqvalid=obj.find('td[data-bind="deliveryDate"] input').isValidDate();
		var streqvalidpast=obj.find('td[data-bind="promoStartDate"] input').noPastValidation();
		var endreqvalidpast=obj.find('td[data-bind="promoEndDate"] input').noPastValidation();
		var deliveryDatereqvalidpast=obj.find('td[data-bind="deliveryDate"] input').noPastValidation();
		var displayreq=obj.find('td[data-bind="displayQty"] input').required();
		var demandreq=obj.find('td[data-bind="demandQty"] input').required();

		
		if(!displayreq || !demandreq ){
			flag=false;
			obj.find('.editRecord').trigger('click');
		}
		
		if(streq && endreq && delreq && streqvalid && endreqvalid && deliveryDatereqvalid && streqvalidpast && endreqvalidpast && deliveryDatereqvalidpast){
			if(!obj.find('td[data-bind="promoStartDate"] input').startEndValidation(obj.find('td[data-bind="promoEndDate"] input'))){
				flag=false;
				obj.find('.editRecord').trigger('click');
			}
			if(!obj.find('td[data-bind="deliveryDate"] input').dlvryDateValidation(obj.find('td[data-bind="promoStartDate"] input'))){
				flag=false;
				obj.find('.editRecord').trigger('click');
			}
			
		}else{
			flag=false;
			obj.find('.editRecord').trigger('click');
		}
	});
	if(flag){
		data=getPostDataObj4ArticleInfoStr(rowList);
		callServiceForValidation(data);
	}
}

function callServiceForValidation(data) {

	var param={"inStorePromoArticleInfoList":$.parseJSON(data)};
	console.log(param);
	$.ajax({
		type :"post",
		url  :"displayvalidate.htm",
		contentType :"application/json",
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
			var message = '';
			output = $.parseJSON(response);
			dataObj = output.data;
			if(dataObj==null){
				message="Service call failed.";
			}else{
				message=dataObj.msg;
			}
			if (message == 'success') {				
				updateList(dataObj);
			} 
			else {
				if(message==undefined){
					message="Technical issue occured.Please contact java support.";
				}
				console.log(message);
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
	
	for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
		var itemerror='';
		var item=dataObj.inStorePromoArticleInfoList[i];
		var id=item.articleNo+'_'+item.articleUom;		
		var article=" "+item.articleNo;
		
		console.log("==== deliveryDateValidateStatusFlag"+item.deliveryDateValidateStatusFlag);
		if(item.deliveryDateValidateStatusFlag!=null&& item.deliveryDateValidateStatusFlag!=undefined && item.deliveryDateValidateStatusFlag.trim()!=''&&item.deliveryDateValidateStatusFlag!='Y'){
			itemerror+=getError(article,item.deliveryDateValidateStatusFlag);
			$("#deliveryDateEdit-"+id).find('input').error(item.deliveryDateValidateStatusFlag);
		}else{
			$("#deliveryDateEdit-"+id).find('input').val(item.deliveryDate);
			$("#deliveryDate-"+id).text(item.deliveryDate);
		}
		console.log("===="+item.buildValidateStatusFlag);
		if(item.buildValidateStatusFlag!=null&& item.buildValidateStatusFlag!=undefined && item.buildValidateStatusFlag.trim()!='' &&item.buildValidateStatusFlag!='Y'){
			itemerror+=getError(article,item.buildValidateStatusFlag);
			$("#buildEdit-"+id).find('input').error(item.buildValidateStatusFlag);
		}
		console.log("==== displayValidateStatusFlag"+item.displayValidateStatusFlag);
		if(item.displayValidateStatusFlag!=null && item.displayValidateStatusFlag!=undefined && item.displayValidateStatusFlag.trim()!='' && item.displayValidateStatusFlag!='Y'){
			itemerror+=getError(article,item.displayValidateStatusFlag);
			$("#displayEdit-"+id).find('input').error(item.displayValidateStatusFlag);
		}
		console.log("====demandValidateStatusFlag "+item.demandValidateStatusFlag);
		if(item.demandValidateStatusFlag!=null&& item.demandValidateStatusFlag!=undefined && item.demandValidateStatusFlag.trim()!='' &&item.demandValidateStatusFlag!='Y'){
			itemerror+=getError(article,item.demandValidateStatusFlag);
			$("#demandEdit-"+id).find('input').error(item.displayValidateStatusFlag);
		}
		
		if(itemerror==''){
			$('#row-'+id).find('.status').html(verified);
		}else{
			$('#row-'+id).find('.status').html(failed);
			errors+=itemerror;
		}
		
	}
	if(errors==''){
		$('#PublishButton').removeClass('disabled');
	}else{
		showAllErrors(errors);
	}
}

function callServiceForCreate() {
	$.ajax({
		type :"post",
		url  :"displaycreate.htm",
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
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
				}
				console.log(message);
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

function updateFailedList(dataObj){
	
	var errors='';
	if(dataObj.msg!=null&&dataObj.msg.trim()!=''&&dataObj.msg!=undefined){
		errors=dataObj.msg;
	}else{
		for(var i=0;i<dataObj.inStorePromoArticleInfoList.length;i++){
			var item=dataObj.inStorePromoArticleInfoList[i];
			var id=item.articleNo+'_'+item.articleUom;		
			var article=item.articleNo;
			
			if(item.promoCreateStatus=='Y'){
				$('#row-'+id).remove();
			}else{
				$('#row-'+id).find('.status').html(failed);
				errors+=getError(article,"Failed to create promotion.");
			}
			
		}
	}
	
	if(errors==''){
		$('#PublishButton').removeClass('disabled');
	}else{
		showAllErrors(errors);
	}
}

function getError(article,msg){
	return "<li>Article "+article+":"+msg+"</li>";
}

