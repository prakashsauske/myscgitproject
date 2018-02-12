var loadDeptAndRoleUrl = "loadDeptAndRole.htm";
var createBroadcastUrl = "createBroadcast.htm";
var updateBroadcastUrl = "updateBroadcast.htm";
var getAllMessages = "getAllMessages.htm";
var getEditContentUrl = "getMessageDetail.htm";
var deactivateBroadcastUrl="deactivate.htm";
var deleteBroadcastUrl="delete.htm";
var currentPageNo=1;
var limit=10;

var currPage = 1;
$(document).ready(function() {
	$('#createBrodcastBtnHdr').click(function() {
		$('#createBrodcastContainer').toggleClass('hideBlock');
	});

	$('#cancelBrodcastBtn').click(function() {
		$('#createBrodcastContainer').addClass('hideBlock');
	});

	$("#dialog-verify").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 800
	});
	
	$("#dialog-confirmation").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 350
	});

	$("#dialog-verify").parent().addClass("popupWrapper");

	$("#dialog-verify").find('.filterWrapper').addClass('hideBlock');

	bindEventsForCreateContent($('#createBrodcastContainer'));

	bindVerifyFiler();

	$('#createBrodcastBtn').unbind('click');
	$('#createBrodcastBtn').click(function() {
		if (validateCreate($('#createBrodcastContainer'))) {
			var data = getDataFromContainer($('#createBrodcastContainer'));
			console.log(data);
			createBrodcast($('#createBrodcastContainer'), data);
		}
	});
	$('#backBtn').click(function(){
		window.location.href = "../login/goingHome.htm";
	});
	loadAllBroadcastMessages();
	
});

var searchData=[];
function loadAllBroadcastMessages() {
	$.ajax({
		url : getAllMessages,
		type : 'get',
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

			if (response == 'sessionout') {
				$.fn.showCustomMsg([ 'Session time out,Please login.' ], error,
						'Brodcast create');
				// setTimeout(function(){ window.location.href='../../' },500);
			} else if (response == 'failed') {
				$.fn.showCustomMsg(
						[ 'Failed to load all broadcast messages.' ], error,
						'Brodcast create');
			} else {
				var res = $.parseJSON(response);
				currentPage=1;
				searchData=res.data;
				loadSearchResult(res.data);
				showPaginatedContent()
				// bindSearchContent();
			}
			stopLoading();
		},
		error : function() {
			stopLoading();
			showError('Technical issue occured,Please contact java support.');
		}
	});
}

function showPaginatedContent() {
	if(searchData.length>limit){
		$("#paginationArea").removeClass('hideBlock');
	}else{
		$("#paginationArea").addClass('hideBlock');
	}
	$("#paginationArea").pagination({
		items : searchData.length,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNo) {
			//callClaimsSummaryService(pageNo, 10, 'DRAFT');
			currentPage=pageNo;
			loadSearchResult(searchData);
		}

	});
}

function loadSearchResult(list) {
	$('#searchResultContent').html('');
	var lb=(currentPage*limit)-10;
	var ub=(lb+10)<list.length?lb+10:list.length;
	if (list.length > 0 && list.length>=(lb+1) ) {
		for ( var i=lb;i<ub;i++) {
			var itm = list[i];
			var content = '<tr data-tt-id="" class="collapsed" id="'
					+ itm.message_id
					+ '"> <td style="white-space: pre-wrap;width: 40%!important;word-wrap: break-word;max-width: 23px;">'
					+ itm.broadcastMessage 
					+ '</td> <td class="centerValue ">'
					+ itm.startDate
					+ '</td> <td class="centerValue ">'
					+ itm.endDate
					+ '</td> <td class="centerValue ">'
					+ itm.ackRequired
					+ '</td> <td class="centerValue "> ';
			if(isPastDate(itm.endDate.split(' ')[0])|| (isCurrentDate(itm.endDate.split(' ')[0])&& isPastTime(to24Hrs(itm.endDate.split(' ')[1]+' '+itm.endDate.split(' ')[2])))){
				if(isPastDate(itm.startDate.split(' ')[0])|| (isCurrentDate(itm.startDate.split(' ')[0])&& isPastTime(to24Hrs(itm.startDate.split(' ')[1]+' '+itm.startDate.split(' ')[2])))){
					content+='</td></tr>';
				}else{
					content+='<label style="cursor: pointer;" class="deactivate"></label> <label class="linkBtn editRowBtn hideBlock" id="editRecord-1"> <a><label class="editRecord">&nbsp;</label></a> </label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1"> <a><label class="saveRecord">&nbsp;</label></a> </label></td></tr>';
				}
			}else{
				if(isPastDate(itm.startDate.split(' ')[0])|| (isCurrentDate(itm.startDate.split(' ')[0])&& isPastTime(to24Hrs(itm.startDate.split(' ')[1]+' '+itm.startDate.split(' ')[2])))){
					content+='<label style="cursor: pointer;" class="deactivate"></label> <label class="linkBtn editRowBtn hideBlock" id="editRecord-1"> <a><label class="editRecord">&nbsp;</label></a> </label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1"> <a><label class="saveRecord">&nbsp;</label></a> </label></td></tr>';
				}else{
					content+='<label style="cursor: pointer;" class="deactivate hideBlock "></label> <label class="linkBtn editRowBtn " id="editRecord-1"> <a><label class="editRecord">&nbsp;</label></a> </label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1"> <a><label class="saveRecord">&nbsp;</label></a> </label><label class="deleteRecord" id="editRecord-1"> <a><label class="editRecord">&nbsp;</label></a> </label></td></tr>';
				}
			}
					
				content+=''
					+ '<tr child-id="'
					+ itm.message_id
					+ '" class="editable hideBlock"><td colspan="8"><div class="tableActionsWrapper" id="createBrodcastContainerSub"></div></td></tr>';
			$('#searchResultContent').append(content);
			$('#searchResultContent').find('#' + itm.message_id).data('obj',
					itm);
			bindEditContent($('#searchResultContent')
					.find('#' + itm.message_id));
		}
		$('#broadcastTable').removeClass('hideBlock');
	} else {
		$('#broadcastTable').addClass('hideBlock');
	}
}
function addNewMessage(itm){
		var content = '<tr data-tt-id="" class="collapsed" id="'
				+ itm.message_id
				+ '"> <td>'
				+ itm.broadcastMessage
				+ '</td> <td class="centerValue ">'
				+ itm.startDate
				+ '</td> <td class="centerValue ">'
				+ itm.endDate
				+ '</td> <td class="centerValue ">'
				+ itm.ackRequired
				+ '</td> <td class="centerValue "><label class="deactivate' ;
				if(isPastDate(itm.endDate.split(' ')[0])|| (isCurrentDate(itm.endDate.split(' ')[0])&& isPastTime(to24Hrs(itm.endDate.split(' ')[1]+' '+itm.endDate.split(' ')[2])))){
					content+='hideBlock';
				}
			content+='"></label> <label class="linkBtn editRowBtn " id="editRecord-1"> <a><label class="editRecord">&nbsp;</label></a> </label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1"> <a><label class="saveRecord">&nbsp;</label></a> </label></td></tr>'
				+ '<tr child-id="'
				+ itm.message_id
				+ '" class="editable hideBlock"><td colspan="8"><div class="tableActionsWrapper" id="createBrodcastContainerSub"></div></td></tr>';
		$('#searchResultContent').prepend(content);
		$('#searchResultContent').find('#' + itm.message_id).data('obj',
				itm);
		bindEditContent($('#searchResultContent')
				.find('#' + itm.message_id));
		$('#broadcastTable').removeClass('hideBlock');	
}
function bindEditContent(row) {
	var parentRow = row;
	var childRow = $('[child-id="' + row.attr('id') + '"]');
	row.find('.editRowBtn').unbind('click');
	row.find('.editRowBtn').click(
			function() {
				
				$('.secondaryActionBtn.closeLink:visible').trigger('click');
				
				if(childRow.is(':visible')){
					childRow.addClass('hideBlock');
				}else{
					childRow.find('#createBrodcastContainerSub').html(
							$('#createBrodcastContainer').html());
					bindEventsForCreateContent(childRow
							.find('#createBrodcastContainerSub'));
					resetContainer(childRow.find('#createBrodcastContainerSub'));
					setEditData(childRow.find('#createBrodcastContainerSub'),
							childRow, parentRow);
					childRow.removeClass('hideBlock');
					$(this).addClass('hideBlock');
					row.find('.saveRowBtn').removeClass('hideBlock');
				}
			});
	row.find('.saveRowBtn').unbind('click');
	row.find('.saveRowBtn').click(
			function() {
				updateBrodcastMessage(childRow.find('#createBrodcastContainerSub'));
//				$(this).addClass('hideBlock');
//				row.find('.editRowBtn').removeClass('hideBlock');
//				childRow.addClass('hideBlock');
			});
	row.find('.deactivate').unbind('click');
	row.find('.deactivate').click(
			function() {
				confirmationDelete('Please confirm to deactivate broadcast message?',row.attr('id'));
			});
	
	row.find('.deleteRecord').unbind('click');
	row.find('.deleteRecord').click(
			function() {
				confirmationHardDelete('Please confirm to delete broadcast message?',row.attr('id'));
			});
}
function updateBrodcastMessage(childRow){
	if (validateCreate(childRow)) {
		var data = getDataFromContainer(childRow);
		data.message_id = childRow.parent().parent().prev().data('obj').message_id;
		console.log('update Data',data);
		updateBrodcast($('#createBrodcastContainer'), data);
	}
}
function setEditData(container, childRow, parentRow) {
	$.ajax({
		data : {
			message_id : parentRow.data('obj').message_id
		},
		url : getEditContentUrl,
		type : 'get',
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response == 'sessionout') {
				$.fn.showCustomMsg([ 'Session time out,Please login.' ], error,
						'Brodcast create');
			} else if (response == 'failed') {
				$.fn.showCustomMsg(
						[ 'Failed to load all broadcast messages.' ], error,
						'Brodcast create');
			} else {
				var res = $.parseJSON(response);
				setDefaultValue(res.data, container,childRow);
			}
			
//			parentRow.find('.editRowBtn').addClass('hideBlock');
//			parentRow.find('.saveRowBtn').removeClass('hideBlock');
			stopLoading();
		},
		error : function() {
			stopLoading();
			showError('Technical issue occured,Please contact java support.');
		}
	});
}

function setDefaultValue(obj, container,row) {
	container.find('.messageTxtBx').val(obj.broadcastMessage);
	
	container.find('.dateFromTxtBx').val(obj.startDate);
	container.find('.dateToTxtBx').val(obj.endDate);
	container.find('.timeFromTxtBx').val(obj.startTime);
	container.find('.timeToTxtBx').val(obj.endTime);
	
	if(isPastDate(obj.startDate)||(isCurrentDate(obj.startDate)&& isPastTime(obj.startTime))){
		container.find('.dateFromTxtBx').prop('disabled',true).attr('style',
		'background: rgb(217, 217, 217)');
		container.find('.timeFromTxtBx').prop('disabled',true).attr('style',
		'background: rgb(217, 217, 217)');
	}
	
	container.find('input[value="' + obj.ackRequired + '"]').prop('checked',
			true);
	if (obj.salesOrg == 'All') {
		container.find('#salesOrgSelectBx').val('All');
	} else {
		container.find('#salesOrgSelectBx').val(obj.salesOrg);
		container.find('#salesOrgSelectBx').trigger('change');
		for ( var i in obj.departmentList) {
			container.find('#deptDiv').find(
					'[value="' + obj.departmentList[i] + '"]').trigger('click');
		}

		for ( var i in obj.rolesList) {
			container.find('#rolesDiv').find(
					'[value="' + obj.rolesList[i] + '"]').trigger('click');
		}

		if (obj.siteOrRegion == 'S') {
			container.find('#multiple').prop('checked', true);
			container.find('#multiple').trigger('change');
			for ( var i in obj.siteList) {
				container
						.find('#multiplePOSBlock')
						.append(
								'<li id="'
										+ obj.siteList[i].split('|')[0].trim()
										+ '"><label>'
										+ obj.siteList[i]
										+ '</label> <label class="closeMessage" onclick="$(this).parent().remove();">&nbsp;</label></li>');
			}
		} else if (obj.siteOrRegion == 'R'){
			container.find('#single').prop('checked', true);
			container.find('#single').trigger('change');
			container.find('#searchAreaSelect').val(
					obj.siteList[0].split('|')[0].trim());
		}else{
			container.find('#all').prop('checked', true);
			
		}
	}
	
	container.find('#cancelBrodcastBtn').unbind('click');
	container.find('#cancelBrodcastBtn').click(function(){
		row.addClass('hideBlock');
		row.prev().find('.saveRowBtn').addClass('hideBlock');
		row.prev().find('.editRowBtn').removeClass('hideBlock');
//		container.parent().prev().find('.saveRowBtn').addClass('hideBlock');
//		container.parent().prev().find('.editRowBtn').removeClass('hideBlock');
	});
	container.find('#createBrodcastBtn').unbind('click');
	container.find('#createBrodcastBtn').click(function(){
		updateBrodcastMessage(container);
	});
	
}
function updateBrodcast(container, data) {
	$
			.ajax({
				data : data,
				url : updateBroadcastUrl,
				type : 'post',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = $.parseJSON(response);
					if (res.data != undefined && res.data.msg == 'success') {
						$.fn
								.showCustomMsg(
										[ 'Broadcast message has been updated Successfully.' ],
										success, 'Brodcast update');
						resetContainer(container);
						loadAllBroadcastMessages();
						loadBroadcastMessage();
					} else {
						$.fn
						.showCustomMsg(
								[ 'Failed to update broadcast message.' ],
								error, 'Brodcast update');
//						showError('Failed to create new broadcast message.');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
					$.fn
					.showCustomMsg(
							[ 'Technical issue occured,Please contact java support.' ],
							error, 'Brodcast update');
//					showError('Technical issue occured,Please contact java support.');
				}
			});
}
function createBrodcast(container, data) {
	$
			.ajax({
				data : data,
				url : createBroadcastUrl,
				type : 'post',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = $.parseJSON(response);
					if (res.data != undefined && res.data.msg == 'success') {
						$.fn
								.showCustomMsg(
										[ 'New broadcast message has been created Successfully.' ],
										success, 'Brodcast create');
						resetContainer(container);
						loadAllBroadcastMessages();
						loadBroadcastMessage();
					} else {
						showError('Failed to create new broadcast message.');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
					showError('Technical issue occured,Please contact java support.');
				}
			});
}
function resetContainer(container) {
	container.find('input[type="#"],textarea').val('');
	container.find('.inputTime').val('00:00');
	container.find('#salesOrgSelectBx').val('All');
	container.find('#salesOrgSelectBx').trigger('change');

}

function validateCreate(container) {
	var flag = true;
	var errors = [];
	// empty check
	if (container.find('.messageTxtBx').val().trim() == '') {
		errors.push('Please enter broadcast message.');
		flag = false;
	}
	

	if (!container.find('.dateFromTxtBx').prop('disabled')) {
		if (container.find('.dateFromTxtBx').val().trim() == '') {
			errors.push('Please enter start date.');
			flag = false;
		} else {
			if (!isValidDate(container.find('.dateFromTxtBx').val())) {
				errors.push('Please enter valid start date.');
				flag = false;
			} else if (isPastDate(container.find('.dateFromTxtBx').val())) {
				errors.push('Start date should not be past.');
				flag = false;
			}
		}
	}

	if (container.find('.dateToTxtBx').val().trim() == '') {
		errors.push('Please enter end date.');
		flag = false;
	} else {
		if (!isValidDate(container.find('.dateToTxtBx').val())) {
			errors.push('Please enter valid end date.');
			flag = false;
		} else if (isPastDate(container.find('.dateToTxtBx').val())) {
			errors.push('End date should not be past.');
			flag = false;
		} else if (compareDate(container.find('.dateToTxtBx').val(), container
				.find('.dateFromTxtBx').val()) == 'lt') {
			errors.push('Start date should be less than end date');
			flag = false;
		}
	}

	if (container.find('.timeFromTxtBx').val().trim() == '') {
		errors.push('Please enter start time.');
		flag = false;
	} else {
		if (!isValidTimeX(container.find('.timeFromTxtBx'))) {
			errors.push('Please enter valid start time.');
			flag = false;
		}
	}

	if (container.find('.timeToTxtBx').val().trim() == '') {
		errors.push('Please enter end time.');
		flag = false;
	} else {
		if (!isValidTimeX(container.find('.timeToTxtBx'))) {
			errors.push('Please enter valid end time.');
			flag = false;
		} else if (flag
				&& (isCurrentDate(container.find('.dateToTxtBx').val()))) {
			var dt=new Date();
			var str=dt.getHours()+":"+dt.getMinutes();
			if (!compareTime(str, container
					.find('.timeToTxtBx').val())) {
				errors
						.push('End date time should not be past time or current time.');
				flag = false;
			}
		}
		
		if (flag
				&& (compareDate(container.find('.dateToTxtBx').val(), container
						.find('.dateFromTxtBx').val()) == 'eq')) {
			if (!compareTime(container.find('.timeFromTxtBx').val(), container
					.find('.timeToTxtBx').val())) {
				errors
				.push('Start date time should be less than the end date time.');
						//.push('Start date time should be less than or same to end date time.');
				flag = false;
			}
		}
	}

	if (container.find('#salesOrgSelectBx').val() != 'All') {
		if (container.find('[name="departmentList"]:checked').length == 0) {
			errors.push('Please select department(s).');
			flag = false;
		}
		if (container.find('[name="rolesList"]:checked').length == 0) {
			errors.push('Please select role(s).');
			flag = false;
		}
		if (container.find('[name="pos"]:checked').val() == 'single') {
			if (container.find('#searchAreaSelect').val() == 'Select'
					|| container.find('#searchAreaSelect').val() == '') {
				errors.push('Please select a region.');
				flag = false;
			}
		} else if(container.find('[name="pos"]:checked').val() == 'multiple') {
			if (container.find('#multiplePOSBlock').find('li').length == 0) {
				errors.push('Please add site(s).');
				flag = false;
			}
		}
	}

	if (!flag)
		$.fn.showCustomMsg(errors, error, 'Brodcast create');
	return flag;
}

function getDataFromContainer(container) {
	var obj = {};
	obj.broadcastMessage = container.find('.messageTxtBx').val().trim();
	obj.startDate = container.find('.dateFromTxtBx').val().trim();
	obj.endDate = container.find('.dateToTxtBx').val().trim();
	obj.startTime = to12Hrs(container.find('.timeFromTxtBx').val().trim());
	obj.endTime = to12Hrs(container.find('.timeToTxtBx').val().trim());
	obj.salesOrg = container.find('#salesOrgSelectBx').val();
	obj.departmentListStr = container.find('[name="departmentList"]:checked')
			.eachval().toString();
	obj.rolesListStr = container.find('[name="rolesList"]:checked').eachval()
			.toString();
	obj.region = container.find('#searchAreaSelect').val();
	obj.siteListStr = container.find('#multiplePOSBlock').find('li')
			.eachlabelval().toString();
	obj.siteOrRegion = ((container.find('[name="pos"]:checked').val() == 'single') ? 'region': ((container.find('[name="pos"]:checked').val() == 'multiple') ? 'site': 'all'));
	obj.ackRequired = container.find('[name="ackReqRd"]:checked').val();
	return obj;
}

function compareTime(stTm, enTm) {
	var sth = Number(stTm.split(':')[0]);
	var eth = Number(enTm.split(':')[0]);
	var sm = Number(stTm.split(':')[1]);
	var em = Number(enTm.split(':')[1]);
	if(sth>eth){
		return false;
	}else{
		if(sth==eth){
			if(sm>=em){
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}
}

function bindEventsForCreateContent(container) {
	container.find('#salesOrgSelectBx').unbind('change');
	container.find('#salesOrgSelectBx').change(function() {
		if ($(this).val() == 'All') {
			$(this).parent().parent().find('.hideIf').addClass('hideBlock');
		} else {
			console.log($(this).val());
			loadDeptAndRole(container, $(this).val());
			$(this).parent().parent().find('.hideIf').removeClass('hideBlock');
		}
	});
	container.find('#multiple').unbind('change');
	container.find('#multiple').change(function() {
		container.find('#multiplePOS').removeClass('hideBlock');
		container.find('#singlePOS').addClass('hideBlock');
		container.find('#searchStoreTxt').focus();
	});
	container.find('#single').unbind('change');
	container.find('#single').change(function() {
		container.find('#singlePOS').removeClass('hideBlock');
		container.find('#multiplePOS').addClass('hideBlock');
		container.find('#searchAreaSelect').focus();

	});
	container.find('#all').unbind('change');
	container.find('#all').change(function() {
		container.find('#singlePOS').addClass('hideBlock');
		container.find('#multiplePOS').addClass('hideBlock');

	});
	container.find('#all').trigger('change');
	container.find('#multiplePOSBlock').html('');
	container.find('#singlePOSBlock').html('');

	container.find('#verifyStoreBtn').unbind('click');
	container.find('#verifyStoreBtn').click(
			function() {
				if (container.find('#searchStoreTxt').val().trim() == '') {
					showError('Please enter site to verify and add.');
				} else {
					verifyStore({
						storeId : container.find('#searchStoreTxt').val()
								.split('-')[0].trim(),
						salesOrg : container.find('#salesOrgSelectBx').val()
					}, container)
				}
			});

	container.find('#searchAreaSelect').unbind('change');
	container.find('#searchAreaSelect').change(function() {
		container.find('#singlePOSBlock').html('');
	});

	container.find('#showStoresBtn').unbind('click');
	container
			.find('#showStoresBtn')
			.click(
					function() {
						if (container.find('#searchAreaSelect').val() == ''
								|| container.find('#searchAreaSelect').val() == 'Select') {
							showError('Please select region.');
						} else {
							showStoresOnRegion(container, {
								region : container.find('#searchAreaSelect')
										.val().split('-')[0].trim(),
								salesOrg : container.find('#salesOrgSelectBx')
										.val()
							});
						}
					});
	container.find('.inputTime').removeClass('hasTimepicker').removeAttr('id');
	container.find('.inputTime').timepicker({
		hours : {
			starts : 0,
			ends : 23
		},
		minutes : {
			interval : 5
		},
		rows : 4,
		showPeriodLabels : true,
		minuteText : 'Min'
	});

	container.find('.inputDate').removeClass('hasDatepicker').removeAttr('id');
	container.find('.inputDate').datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,

	});
}

function loadDeptAndRole(container, salesOrg) {
	$.ajax({
		data : {
			salesOrg : salesOrg
		},
		url : loadDeptAndRoleUrl,
		type : "get",
		async : false,

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

			var res = $.parseJSON(response);
			if (res.rolesList != undefined && res.rolesList.data != undefined
					&& res.rolesList.data.length > 0) {
				bindRolesCheckboxEvent(container, res.rolesList.data);
			}
			if (res.deptList != undefined && res.deptList.data != undefined
					&& res.deptList.data.length > 0) {
				bindDeptCheckboxEvent(container, res.deptList.data);
			}
			if (res.regionList != undefined && res.regionList.data != undefined
					&& res.regionList.data.length > 0) {
				bindRegionEvent(container, res.regionList.data);
			}
			stopLoading();
		},
		error : function() {
			showError("Technical issue occured,Please contact java support.");
			stopLoading();
		}
	});
}

function bindRegionEvent(container, regions) {
	var con = '<option value="">Select</option>';
	for ( var i in regions) {
		con += '<option value="' + regions[i].code + '">' + regions[i].desc
				+ '</option>';
	}
	container.find('#singlePOS').find('.selectOptions').html(con);
}

function bindDeptCheckboxEvent(container, deptList) {

	container
			.find('#deptDiv')
			.find('ul')
			.html(
					'<li style="display: flex;WIDTH: 176PX;"><input type="checkbox" name="departmentListAll"  value="deptAll" id="deptAll"><label for="deptAll" class="labelText">All</label></li>');
	for ( var i in deptList) {
		container
				.find('#deptDiv')
				.find('ul')
				.append(
						'<li style="display: flex;WIDTH: 176PX;" title="'
								+ deptList[i].node_desc
								+ '"><input type="checkbox" name="departmentList"  value="'
								+ deptList[i].node + '" id="'
								+ deptList[i].node + '"><label for="'
								+ deptList[i].node + '" class="labelText">'
								+ deptList[i].node_desc + '</label></li>');
	}
	container.find('[name="departmentListAll"]').unbind('change');
	container.find('[name="departmentListAll"]').change(function() {
		if ($(this).prop('checked')) {
			container.find('[name="departmentList"]').prop('checked', true);
		} else {
			container.find('[name="departmentList"]').prop('checked', false);
		}
	});

	container.find('[name="departmentList"]').unbind('change');
	container
			.find('[name="departmentList"]')
			.change(
					function() {
						if (container.find('[name="departmentList"]').length == container
								.find('[name="departmentList"]:checked').length) {
							container.find('[name="departmentListAll"]').prop(
									'checked', true);
						} else {
							container.find('[name="departmentListAll"]').prop(
									'checked', false);
						}
					});

}

function bindRolesCheckboxEvent(container, deptList) {

	container
			.find('#rolesDiv')
			.find('ul')
			.html(
					'<li style="display: flex;WIDTH: 176PX;"><input type="checkbox" name="rolesListAll"  value="deptAll" id="deptAll"><label for="deptAll" class="labelText">All</label></li>');
	for ( var i in deptList) {
		container.find('#rolesDiv').find('ul').append(
				'<li style="display: flex;WIDTH: 176PX;" title="'
						+ deptList[i].desc
						+ '"><input type="checkbox" name="rolesList" value="'
						+ deptList[i].code + '" id="' + deptList[i].code
						+ '"><label for="' + deptList[i].code
						+ '" class="labelText">' + deptList[i].desc
						+ '</label></li>');
	}
	container.find('[name="rolesListAll"]').unbind('change');
	container.find('[name="rolesListAll"]').change(function() {
		if ($(this).prop('checked')) {
			container.find('[name="rolesList"]').prop('checked', true);
		} else {
			container.find('[name="rolesList"]').prop('checked', false);
		}
	});

	container.find('[name="rolesList"]').unbind('change');
	container.find('[name="rolesList"]').change(
			function() {
				if (container.find('[name="rolesList"]').length == container
						.find('[name="rolesList"]:checked').length) {
					container.find('[name="rolesListAll"]').prop('checked',
							true);
				} else {
					container.find('[name="rolesListAll"]').prop('checked',
							false);
				}
			});

}

function showError(msg) {
	// $('#searchCreateErrorDivLbl').text(msg);
	// $('#searchCreateErrorDivLbl').parent().removeClass('hideBlock');
	$.fn.showCustomMsg([ msg ], error, 'Brodcast create');
}

function callAjax(url, data, type) {
	$.ajax({
		data : data,
		url : url,
		type : type,

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

		},
		error : function() {
			stopLoading();
		}
	});
}

function verifyStore(data, container) {
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
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</th><th data-sort="string">Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
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
							tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectStore" data-store="'
									+ list[i].siteNo
									+ ' | '
									+ list[i].siteName
									+ '">Select</label></label></td></tr>';

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
							bindStoreContent(container);
						} else {
							if (container.find('#multiplePOSBlock').find(
									'#' + list[0].siteNo).length > 0) {
								// Store already exist
								showError('Store already exist.');
							} else {
								container
										.find('#multiplePOSBlock')
										.append(
												'<li id="'
														+ list[0].siteNo
														+ '"><label>'
														+ list[0].siteNo
														+ ' | '
														+ list[0].siteName
														+ '</label> <label class="closeMessage" onclick="$(this).parent().remove();">&nbsp;</label></li>');
							}
						}
						container.find('#searchStoreTxt').val('');

					} else if (res.msg == 'no_sales_org_map') {
						showError('Store does not belong to selected Sales Org');
					} else {
						showError('Please enter a valid store number');
					}
					stopLoading();
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					stopLoading();
				}
			});
}

function bindStoreContent(container) {
	$('#dialog-verify').find('.selectStore').unbind('click');
	$('#dialog-verify')
			.find('.selectStore')
			.click(
					function() {
						if (container.find('#multiplePOSBlock')
								.find(
										'#'
												+ $(this).attr('data-store')
														.split('|')[0].trim()).length > 0) {
							// Store already exist
							showError('Store already exist.');
							$('#dialog-verify').dialog('close');
						} else {
							container
									.find('#multiplePOSBlock')
									.append(
											'<li id="'
													+ $(this)
															.attr('data-store')
															.split('|')[0]
															.trim()
													+ '"><label>'
													+ $(this)
															.attr('data-store')
													+ '</label> <label class="closeMessage" onclick="$(this).parent().remove();">&nbsp;</label></li>');
							$('#dialog-verify').dialog('close');
						}
					});

	$('#dialog-verify .textbox').attr('placeholder', 'Enter store no or name');
	$('#dialog-verify .textbox').val('');
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

function bindVerifyFiler() {
	$('#dialog-verify .textbox ')
			.keyup(
					function() {
						value = $(this).val().trim().toLowerCase();

						$('.verifyContent')
								.filter(
										function() {

											if (value != '') {
												if (($(this).children(
														':nth-child(1)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1 || $(
														this).children(
														':nth-child(2)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1)) {
													$(this).removeClass(
															'hideBlock');
													// //console.log(i++);
												} else
													$(this).addClass(
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
							$('.verifyPagination').removeClass('hideBlock');
							$('.verifyPagination').pagination({
								items : recCnt,
								itemsOnPage : 9,
								cssStyle : 'compact-theme',
								currentPage : currentPage,
								onPageClick : function(pageNumber) {
									showVerifyPage(pageNumber);

								}

							});
						} else {
							$('.verifyPagination').addClass('hideBlock');
						}

						var i = 1;
						var cnt = 1;
						$('.verifyContent:visible ').each(
								function() {
									$(this).attr('class', '');
									$(this).addClass('verifyContent').addClass(
											'pagNo-' + cnt);
									if (cnt > 1)
										$(this).addClass('hideBlock');
									if (i % 9 == 0) {
										cnt++;
									}
									i++;
									// console.log(i++);
								});
						if (recCnt <= 0) {
							$('#dialog-verify thead').addClass('hideBlock');
						} else {
							$('#dialog-verify thead').removeClass('hideBlock');
						}
					});
}

function showStoresOnRegion(container, data) {
	$
			.ajax({
				data : data,
				url : "districtStores.htm",
				type : 'get',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = $.parseJSON(response);
					if (res.data != null && res.data != undefined
							&& res.data.length > 0 && res.msg == 'true') {
						var list = res.data;
						for ( var i = 0; i < list.length; i++) {
							container
									.find('#singlePOSBlock')
									.append(
											'<li id="'
													+ list[i].siteNo
													+ '"><label>'
													+ list[i].siteNo
													+ ' | '
													+ list[i].siteName
													+ '</label> <label class="closeMessage hideBlock" onclick="$(this).parent().remove();">&nbsp;</label></li>');
						}
						stopLoading();
					} else {
						showError('No stores found in selected region.');
						stopLoading();
					}
				},
				error : function() {
					showError('Technical issue occured,Please contact java support.');
					stopLoading();
				}
			});
}
function isValidTimeX(elem) {

	var hour = Number($(elem).val().split(':')[0]);
	var min = Number($(elem).val().split(':')[1]);

	if (isNaN(hour) || Number(hour) > 23 || isNaN(min) || Number(min) > 55) {
		return false;
	} else {
		return true;
	}
}
function showSuccessAlert(msg) {
	console.log(msg);
}

function to12Hrs(str) {
	var hr = str.split(':')[0];
	var mn = str.split(':')[1];
	var amOrpm = (hr / 12 < 1 || hr == 24) ? 'AM' : 'PM';
	hr = (hr % 12 == 0 ? 12 : (hr % 12));
	return r(hr) + r(mn) + amOrpm;
}
function to24Hrs(str) {
	var amorpm = str.split(' ')[1];
	var time = str.split(' ')[0];
	var hr;
	var min = time.split(':')[1];
	if (amorpm == 'AM') {
		if (time.split(':')[0] == 12) {
			hr = '00';
		} else {
			hr = time.split(':')[0];
		}
	} else {
		if (time.split(':')[0] != 12) {
			hr = Number(time.split(':')[0]) + 12;
		} else {
			hr = '12';
		}
	}
	return r(hr) + ':' + r(min);
}
function r(str) {
	if (str <= 9)
		return '0' + Number(str);
	else
		return str;
}

function isPastTime(str){
	var date=new Date();
	var hrs=str.split(':')[0];
	var mins=str.split(':')[1];
	if(hrs<date.getHours() ||(hrs==date.getHours() && mins<date.getMinutes())){
		return true;
	}
	return false;
}

function confirmationDelete(msg, id) {
	try {
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		 $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-yesbtn').click(function() {
			$("#dialog-confirmation").dialog("close");
			deactivate(id);

		});
		$("#dialog-confirmation").find('.confirmation-nobtn').removeClass('hideBlock');
		$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmationDelete(msg, id);
	}
}

function confirmationHardDelete(msg, id) {
	try {
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		 $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-yesbtn').click(function() {
			$("#dialog-confirmation").dialog("close");
			deleteRecord(id);

		});
		$("#dialog-confirmation").find('.confirmation-nobtn').removeClass('hideBlock');
		$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmationHardDelete(msg, id);
	}
}
function deleteRecord(id) {
	$
			.ajax({
				data : {message_id:id},
				url : deleteBroadcastUrl,
				type : 'post',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = $.parseJSON(response);
					if (res.data != undefined && res.data.msg == 'success') {
						$.fn
								.showCustomMsg(
										[ 'Broadcast message has been deleted Successfully.' ],
										success, 'Brodcast update');
						$('[data-tt-id]#'+res.data.message_id).find('.deactivate').addClass('hideBlock');
						loadAllBroadcastMessages();
						loadBroadcastMessage();
					} else {
						$.fn
						.showCustomMsg(
								[ 'Failed to delete broadcast message.' ],
								error, 'Brodcast update');
//						showError('Failed to create new broadcast message.');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
					$.fn
					.showCustomMsg(
							[ 'Technical issue occured,Please contact java support.' ],
							error, 'Brodcast update');
//					showError('Technical issue occured,Please contact java support.');
				}
			});
}
function deactivate(id) {
	$
			.ajax({
				data : {message_id:id},
				url : deactivateBroadcastUrl,
				type : 'post',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					var res = $.parseJSON(response);
					if (res.data != undefined && res.data.msg == 'success') {
						$.fn
								.showCustomMsg(
										[ 'Broadcast message has been deactivated Successfully.' ],
										success, 'Brodcast update');
						$('[data-tt-id]#'+res.data.message_id).find('.deactivate').addClass('hideBlock');
						loadAllBroadcastMessages();
						loadBroadcastMessage();
					} else {
						$.fn
						.showCustomMsg(
								[ 'Failed to deactivate broadcast message.' ],
								error, 'Brodcast update');
//						showError('Failed to create new broadcast message.');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
					$.fn
					.showCustomMsg(
							[ 'Technical issue occured,Please contact java support.' ],
							error, 'Brodcast update');
//					showError('Technical issue occured,Please contact java support.');
				}
			});
}