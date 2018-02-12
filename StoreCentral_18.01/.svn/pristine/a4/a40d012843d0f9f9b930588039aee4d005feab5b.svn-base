var siteMap = {};
var shortCutMsg = 'You are assigned multiple roles, so select a role to define role specific shortcuts';
var platform='B';
var avalableSCMap = {};
var userprefSCMap = {};
$(document).ready(
		function() {
			$("#menu").menu({
				position : {
					my : "right top",
					at : "right top+20"
				}
			});
			// Popup formatting
			$("#dialog-modal-userPreview").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 200,
				maxHeight : 900,
				width : 830
			});

			$("#dialog-modal").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 100,
				maxHeight : 600,
				width : 400
			});
			
			
			
			
			var siteListJson = $('#siteList').val();
			var siteListObj = '';
			var list = '';
			if (siteListJson != '' && siteListJson != undefined
					&& siteListJson != null) {
				siteListObj = $.parseJSON(siteListJson);
				list = siteListObj.data;
				var tempList = '';
				for ( var i = 0; i < list.length; i++) {
					if (siteMap.hasOwnProperty(list[i].roleId)) {
						tempList = $(siteMap).attr(list[i].roleId);
						// list[k].cnt=id;
						tempList.push(list[i]);
					} else {
						tempList = [];
						// list[k].cnt=id;
						tempList.push(list[i]);
					}
					siteMap[list[i].roleId] = tempList;

				}
				//console.log(siteMap);
			}

			var html = shortCutMsg;
			$('.role-dropdown').change(
					function() {
						if ($(this).val() != '' && $(this).val()!=null && $(this).val() != undefined
								&& $(this).val().toLowerCase() != 'select') {
							if (siteMap.hasOwnProperty($(this).val().trim())) {
								var list = $(siteMap)
										.attr($(this).val().trim());
								var str = '';
								
								for ( var i = 0; i < list.length; i++) {
									if(list[i].salesOrg==$('#salesOrg').val()){
										if (str == '') {
											str += list[i].siteNo + ' - '
													+ list[i].siteName;
										} else {
											str += ',' + list[i].siteNo + ' - '
													+ list[i].siteName;
										}
									}
								}
								html = '<strong>Stores:</strong> ' + str;
							} else {
								html = shortCutMsg;
							}
						} else {
							html = shortCutMsg;
						}
						$('#selectRole').html(html);

						loadAvailableShortCuts();
						bindContent();
					});
			$('.role-dropdown').val($('#roleId').val());
			$('.role-dropdown').trigger('change');
			
			$('[name="platform"]').change(function(){
				console.log($(this).val());
				platform=$(this).val();
				$('.role-dropdown').val($('#roleId').val());
				$('.role-dropdown').trigger('change');
				if(platform=='M'){
					$('#preview').addClass('hideBlock');
				}else{
					$('#preview').removeClass('hideBlock');
				}
			});
			
			$("#dialog-modal").parent().addClass("popupWrapper");
			
			

			// code to apply custom class to popup
			$("#dialog-modal-userPreview").parent().addClass("popupWrapper");

			// back button click function
			$('.backBtn').click(function() {
				window.location.href = "../login/goingHome.htm";
			});

			// save button click function
			$('.saveBtn').click(
					function() {
						var i = 1;
						var string = "";
						$("input:checkbox[name=selected-checkbox]:visible")
								.filter(function() {
									$(this).attr('id', i++);
								});
						$("input:checkbox[name=selected-checkbox]:visible")
								.filter(function() {
									if (string == "")
										string = $(this).val();
									else
										string = string + "," + $(this).val();
									//console.log(string);
								});
						callAjax("savePreferences.htm", {
							"userSelectedPreference" : string,"roleId":$('.role-dropdown').val(),platform:platform
						}, "get");
					});

			// cancel button click function
			$('.cancelBtn').click(function() {
				window.location.href = '../login/goingHome.htm';
			});
			bindSelectedList();

			//added for primary Departments
			
			$('.tabs').tabs();
			$('#myDepartments').attr('style','display:none;height:370px!important')
			var sapDepList=$.parseJSON($('#deptInfoList').text());
			var usrDepList=$.parseJSON($('#usrDeptInfoList').text());
			var style='style="padding: 0px;"';
			var departmentStr='<ul>';
			for(var i in  sapDepList.data){
				var itm=sapDepList.data[i];
				//departmentStr+='<li><label class="titleText">'+i+'</label></li>';
				for(var j in itm){
					var item=itm[j];
					departmentStr+='<li><label for="' + item.node + '" class="labelText" '+style+'><input type="checkbox" name="dept" sales_org="'+i.split('-')[0]+'" value="' + item.node + '-'+item.node_desc+'" id="' + item.node + '">' + item.node_desc + '</label></li>';
				}
			}	
			departmentStr+='</ul>';
			$('#myDepartments #deptAll').prop('disabled',false);
			$('#myDepartments #deptAll').prop('checked',false);
			$('#myDepartments #deptList').html('');
			$('#myDepartments #deptList').html(departmentStr);
			bindEventsForCheckBox($('.hierarchyContent'));
			if($('#myDepartments #deptList').find('input').length<=0){
				$('#myDepartments #deptList').html('Failed to load department lists.');
			}else{
				for(var i in  usrDepList.data){
					var item=usrDepList.data[i];
					$('#myDepartments #deptList').find('#'+item.node).attr('onloadChecked',true);
					$('#myDepartments #deptList').find('#'+item.node).trigger('click');
				}
			}
			
			$('#savePrimaryDepts').click(function(){
				if(validatePrimDeps()){
					savePriamryDepartments();
				}else{
					$('.myDepError').removeClass('hideBlock');
				}			
			});
			
			//end of added for primary Departments
			
			$("#dialog-info-alert").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 120,
				maxHeight : 600,
				width : 350
			});
			
			$("#dialog-info-alert").parent().addClass("popupWrapper");
			

		});
function savePriamryDepartments(){
	console.log('Save Primary deps');
	var toDeleteList='';
	var toAddList='';
	var flag=false;
	$('[onloadChecked]').each(function(){
		if(!$(this).is(':checked')){
			toDeleteList+=$(this).val()+":";
			flag=true;
		}
	});
	if(flag) {
		toDeleteList=toDeleteList.substr(0,toDeleteList.length-1);
		flag=false;
	}
	$('#myDepartments #deptList input:checked').each(function(){
		
			if($(this).attr('onloadChecked')==undefined){
				toAddList+=$(this).val()+":";
				flag=true;
			}
		
	});
	
	if(flag) {
		toAddList=toAddList.substr(0,toAddList.length-1);
		flag=false;
	}
	
//	if(flag) toDeleteList=toDeleteList.substr(0,toDeleteList.length-1);
	console.log(toDeleteList,toAddList);
	callAjaxToSavePrimaryDpt(toDeleteList,toAddList);
	
}
function callAjaxToSavePrimaryDpt(toDeleteList,toAddList){
		$
				.ajax({
					data : {toDeleteList:toDeleteList,toAddList:toAddList,platform:platform},
					url : "savePrimaryDepartments.htm",
					type : "get",

					beforeSend : function() {
						startLoading();
					},
					success : function(response) {
						// var option =
						// $("<h4>").html(response).find("#option").val();
						if (response.trim() == "success") {
							showInformation('User Primary departments selection has been saved successfully.',undefined,'Success');
							if($('#myDepartments #deptList').find('input').length<=0){
								$('#myDepartments #deptList').html('Failed to load department lists.');
							}else{
								$('#myDepartments #deptList').find('input').each(function(){
									if($(this).is(':checked')){
										$(this).attr('onloadChecked',true);
									}else{
										$(this).removeAttr('onloadChecked');
									}
								});
	
								}
							
						} else {
							showInformation(response.trim(),true,'Failed');
							
						}
						stopLoading();
					},
					error : function() {
						showInformation("Technical issue occured,Please contact java support.",true,'Failed');
						stopLoading();
					}
				});
	
}

function validatePrimDeps(){
	var flag=true;
	if($('#myDepartments #deptList').find('input:checked').length<=0){
		flag=false;
	}
	return flag;
}
function bindEventsForCheckBox(pr){
	pr.find('#deptAll').click(function(){
		if($(this).is(':checked')){
			pr.find('[name="dept"]').prop('checked',true);
			
		}else{
			pr.find('[name="dept"]').prop('checked',false);
		}
		
		if(pr.find('[name="dept"]:checked').length<=0){
			$('.myDepError').removeClass('hideBlock');
		}else{
			$('.myDepError').addClass('hideBlock');
		}
		
	});
	
	pr.find('[name="dept"]').click(function(){
		if(pr.find('[name="dept"]').length==pr.find('[name="dept"]:checked').length){
			pr.find('#deptAll').prop('checked',true);
		}else{
			pr.find('#deptAll').prop('checked',false);
		}
		
		if(pr.find('[name="dept"]:checked').length<=0){
			$('.myDepError').removeClass('hideBlock');
		}else{
			$('.myDepError').addClass('hideBlock');
		}
	});
}
function bindContent() {
	// add button click function
	// preview button click function
	$('.previewBtn').unbind('click');
	$('.previewBtn').click(
			function() {
				var i = 1;
				var string = "";
				$("input:checkbox[name=selected-checkbox]:visible").filter(
						function() {
							$(this).attr('id', i++);
						});
				$("input:checkbox[name=selected-checkbox]:visible").filter(
						function() {
							if (string == "")
								string = $(this).val() + ':'
										+ $(this).next().text().trim();
							else
								string = string + "," + $(this).val() + ':'
										+ $(this).next().text().trim();
							//console.log(string);
						});
				$('#iframeData').prop(
						'src',
						'showHomePreview.htm?userSelectedPreference='
								+ string.trim()+'&platform='+platform);
				console.log('showHomePreview.htm?userSelectedPreference='
						+ string.trim()+'&platform='+platform);
				if(platform=='M'){
					$('.iFrameWrapper').attr('style','width: 529px;');
					$("#dialog-modal-userPreview").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 900,
						width : 562
					});
				}else{
					$('.iFrameWrapper').removeAttr('style');
					$("#dialog-modal-userPreview").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 900,
						width : 830
					});
				}
				$("#dialog-modal-userPreview").dialog('open');
				
				// var
				// data=$('#userPreferences').serialize();
				// callAjax('showHomePreview.htm',data,'get');
			});
	$('.addBtn').parent().unbind('click');
	$('.addBtn')
			.parent().click(
					function() {
						if ($('#userPreferenceSize').val() != $("input:radio[name=selected-checkbox]:visible").length
								&& ($('.un-selected-list input:checkbox[name=unselected-checkbox]:checked').length - $('.un-selected-list input:checkbox[name=unselected-checkbox]:checked:disabled').length)
										+ $("input:checkbox[name=selected-checkbox]:visible").length <= $(
										'#userPreferenceSize').val()) {
							$(
									'.un-selected-list input:checkbox[name=unselected-checkbox]:checked')
									.filter(
											function() {
												addedClass = $(this).val();
												addedDesc = $(this).next()
														.text().trim();
												if ($(this).attr('disabled') != 'disabled')
													$('#sortable')
															.append(
																	'<li id="'
																			+ ($('.selected-list').length + 1)
																			+ '" class="selected-list '
																			+ addedClass
																			+ '"><input type="checkbox" name="selected-checkbox" value="'
																			+ addedClass
																			+ '" id="'
																			+ addedClass
																			+ '_selected1'
																			+ '"><label for="'
																			+ addedClass
																			+ '_selected'
																			+ '" class="labelText">'
																			+ addedDesc
																			+ '</label></li>');
											});

							$(
									".un-selected-list input:checkbox[name=unselected-checkbox]:checked")
									.attr('disabled', 'disabled').parent()
									.addClass('alreadyAddedRow');
							bindSelectedList();
							$('.selected-count').text(
									$('.selected-list:visible').length);
						} else {
							$('.alertText').text(
									'Sorry! Cannot select more than '
											+ $('#userPreferenceSize').val()
											+ ' shortcuts.');
							$('#dialog-modal').dialog('open');
						}
					});
	$('.removeBtn').parent().unbind('click');
	$('.removeBtn').parent().click(
			function() {

				$('.rowHighlight').filter(
						function() {
							removedClass = $(this).find(':checkbox').val();
							$('.un-selected-list').filter(
									function() {
										if ($(this).hasClass(removedClass))
											$(this).removeClass(
													'alreadyAddedRow').find(
													':checkbox').removeAttr(
													'disabled').removeAttr(
													'checked').prop('checked',
													false);
									});
						});
				$('.rowHighlight').remove();
				$('.selected-count').text($('.selected-list:visible').length);
			});
	$('.upBtn').parent().unbind('click');
	// up button click function
	$('.upBtn').parent().click(function() {
		up();
		bindSelectedList();
	});
	$('.downBtn').parent().unbind('click');
	// down button click function
	$('.downBtn').parent().click(function() {
		down();
		bindSelectedList();
	});
	$('.selected-list').unbind('click');
	$('.selected-list').click(
			function(e) {
				e.stopPropagation();
				// $('.selected-list').removeClass('rowHighlight');
				if (!$(this).hasClass('rowHighlight'))
					$(this).addClass('rowHighlight').find(':checkbox').prop(
							'checked', true);
				else
					$(this).removeClass('rowHighlight').find(':checkbox').prop(
							'checked', false);
			});
	$("#sortable").sortable({
		placeholder : "highlight-placeholder"
	});
	$('.hierarchyList li').removeClass('hideBlock').show();
	$('.selected-list').filter(
			function() {
				var id = $(this).find(':radio').val();
				$('.un-selected-list').filter(
						function() {
							if ($(this).hasClass(id))
								$(this).addClass('alreadyAddedRow').find(
										':checkbox').prop('checked', true)
										.attr('disabled', 'disabled');
						});
			});
	if($('.un-selected-list')!=undefined)
		$('.totalCount:first strong').text($('.un-selected-list').length);
	if($('.selected-list')!=undefined)
		$('.totalCount:last strong').text($('.selected-list').length);
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function bindSelectedList() {
	$('.selected-list').unbind('click');
	$('.selected-list').click(
			function(e) {
				e.stopPropagation();
				// $('.selected-list').removeClass('rowHighlight');
				if (!$(this).hasClass('rowHighlight'))
					$(this).addClass('rowHighlight').find(':checkbox').prop(
							'checked', true);
				else
					$(this).removeClass('rowHighlight').find(':checkbox').prop(
							'checked', false);
			});
}

function callAjax(url, data, type) {
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
					if (response.trim() == "success") {
						
						if(platform=='M'){
							$('.alertText')
							.text(
									'User Preferences for mobile has been saved successfully.');
							$('#dialog-modal').dialog('open');
							$('.okBtn').unbind('click');
							$('.okBtn')
							.click(
									function() {
										$('#dialog-modal').dialog('close');
									});
						}else{
							$('.alertText')
							.text(
									'Shortcuts saved.');// Changed msg for UAT defect no 2125
							$('#dialog-modal').dialog('open');
							$('.okBtn').unbind('click');
							$('.okBtn')
							.click(
									function() {
										window.location.href = '../login/goingHome.htm?disableKey=disableKey';
									});
						}
						
					} else {
						$('.alertText').text(response.trim());
						$('#dialog-modal').dialog('open');
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
				}
			});
}
function up() {
	$('.hierarchyList:last li input:checked').parent().insertAfter(
			$('.hierarchyList:last li input:checked:first').parent());
	var elm = $('.hierarchyList:last li input:checked:first').parent().prev();
	var remove = $('.hierarchyList:last li input:checked').parent();
	if (elm != '' && elm != undefined && elm != null && elm.length > 0)
		$('.hierarchyList:last li input:checked').parent().remove();
	$(remove).insertBefore($(elm));
}
function down() {
	$('.hierarchyList:last li input:checked').parent().insertBefore(
			$('.hierarchyList:last li input:checked:last').parent());
	var elm = $('.hierarchyList:last li input:checked:last').parent().next();
	var remove = $('.hierarchyList:last li input:checked').parent();
	if (elm != '' && elm != undefined && elm != null && elm.length > 0)
		$('.hierarchyList:last li input:checked').parent().remove();
	$(remove).insertAfter($(elm));
}
function loadAvailableShortCuts() {
	var roleId = $('.role-dropdown').val();
	var tempMap = {};
	var tempList = [];
	var defaultPrf = '';
	var userPrf = '';
	var siteNo= $(siteMap).attr(roleId)[0].siteNo;

	if (roleId != 'Select') {
		if (avalableSCMap != '' && avalableSCMap != undefined
				&& avalableSCMap != null
				&& $(avalableSCMap).attr(roleId) != null
				&& $(avalableSCMap).attr(roleId) != ''
				&& $(avalableSCMap).attr(roleId) != undefined
				&& $(avalableSCMap).attr(roleId).length > 0) {
			tempMap = $(avalableSCMap).attr(roleId);
			//console.log(tempMap);
		} else {
			defaultPrf = 'Y';
		}

		if (userprefSCMap != '' && userprefSCMap != undefined
				&& userprefSCMap != null
				&& $(userprefSCMap).attr(roleId) != null
				&& $(userprefSCMap).attr(roleId) != ''
				&& $(userprefSCMap).attr(roleId) != undefined
				&& $(userprefSCMap).attr(roleId).length > 0) {
			tempList = $(userprefSCMap).attr(roleId);
			//console.log(tempList);
		} else {
			userPrf = 'Y';
		}
		if (userPrf != '' || defaultPrf != '') {
			getPreference(defaultPrf, userPrf, roleId,siteNo);
		} else {
			loadAvailList(tempMap);
			loaduserList(tempList);

		}
	}

}
function loadAvailList(tempMap) {
	var content = '';
	var tempList = [];
	for ( var m in tempMap) {
		tempList = tempMap[m];
		content += '<li><label class="titleText">' + tempList[0].rootCodeDesc
				+ '</label></li>';
		for ( var i = 0; i < tempList.length; i++) {
			content += '<li class="un-selected-list '
					+ tempList[i].code
					+ ' "><input type="checkbox" name="unselected-checkbox" value="'
					+ tempList[i].code + '" id="' + tempList[i].code + '" ">'
					+ '<label for="' + tempList[i].code
					+ '" class="labelText">' + tempList[i].description
					+ '</label></li>';
		}
	}
	//console.log(content);
	return content;
}

function loaduserList(tempMap) {
	var content = '';
	var obj = '';
	for ( var m in tempMap) {
		obj = tempMap[m];
		content += '<li class="selected-list  ' + obj.code
				+ ' "><input type="checkbox" name="selected-checkbox" value="'
				+ obj.code + '" id="' + obj.code + '_up" ">' + '<label for="'
				+ obj.code + '"_d class="labelText">' + obj.description
				+ '</label></li>';
		$('.hierarchyList:first li.' + obj.code).addClass('alreadyAddedRow');
		$('.hierarchyList:first li.' + obj.code).find('input').attr('checked',
				'checked').attr('disabled', 'disabled').prop('checked',
				'checked');
	}
	//console.log(content);
	return content;
}
function getPreference(defaultPrf, userPrf, roleId) {
	var data = {
		defaultPrf : defaultPrf,
		userPrf : userPrf,
		roleId : roleId,
		siteNo:siteNo,
		platform:platform
	};
	$
			.ajax({
				data : data,
				url : 'getDefaultAndUserPreferences.htm',
				type : 'GET',

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					if (response.trim() == "false") {
						$('.alertText')
								.text(
										'Technical issue occurred. Please contact technical support.');
						$('#dialog-modal').dialog('open');
					} else {
						var json = $.parseJSON(response);
						var userPrfJson = json.userPrfJson;
						var defaultPrfJson = json.defaultPrfJson;

						if (defaultPrf == 'Y') {
							if (defaultPrfJson != ''
									&& defaultPrfJson != undefined
									&& defaultPrfJson != null) {
								avalableSCMap[roleId] = defaultPrfJson;
								$('.hierarchyList:first ul').html(
										loadAvailList(defaultPrfJson));
							}
						}
						if (userPrf == 'Y') {
							if (userPrfJson != '' && userPrfJson != undefined
									&& userPrfJson != null) {
								userprefSCMap[roleId] = userPrfJson;
								$('.hierarchyList:last ul').html(
										loaduserList(userPrfJson));
							}
						}
						bindContent();
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
				}
			});
}

function showInformation(txt,warn,title){
	$("#dialog-info-alert").parent().addClass('popupWrapper');
	$("#dialog-info-alert").dialog('open');
	$("#dialog-info-alert").find('#alertInfoText').html(txt);
	if(title!=undefined)
		$("#dialog-info-alert").parent().find('.ui-dialog-title').text(title);
	else
		$("#dialog-info-alert").parent().find('.ui-dialog-title').text("Information");
//	if(warn!=undefined && warn==true)
//	$("#dialog-info-alert").find('#alertInfoText').addClass('errorDiv');
	
	$("#dialog-info-alert").unbind('click');
	$("#dialog-info-alert").click(function(){
		$("#dialog-info-alert").dialog('close');
	});
}