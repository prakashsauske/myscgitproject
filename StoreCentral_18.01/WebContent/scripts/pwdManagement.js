var recordCount;
var minimumCount=3;


/*----------------******  Department change function   *****--------------- */



$(document)
		.ready(
				function() {
					var count=0;
					$('.forgotPassword')
							.click(
									function() {
										$('#username').val('').focus();
										$(
												'#dialog-forgotWizard .jw-menu-wrap li:first')
												.click();
										$('.formWrapper:visible .errorDiv label:first').text('');
									});

					$("#setSecQues")
					.click(
							function() {
								hideError('dialog-forgotWizard');
//								var count=0;
								

								var ques = '', ans = '';
								var answer=[],questions=[];
								var flag = false;
								var secQuesFilledFlag=true;
								
								$('.quesRow').each(function(){
									if($(this).find('input')
											.val().trim()!=''){
										if (ques == '' && $(this).find('input')
												.val().trim() !='') {
											ques += $(this)
													.find('select').val()
													.trim();
										} else {
											if($(this).find('input')
													.val().trim() ==''){

													}else{
														ques += ':'
													+ $(this).find('select').val()
															.trim();
													}
											
										}
										questions.push($(this)
												.find('select').val()
												.trim());
										if (ans == '') {
											ans += $(this).find(
															'input')
													.val().trim();
											
										} else {
											if($(this)
													.find(
															'input')
													.val().trim() ==''){

													}else{
														ans += ':'
											+ $(
													this)
													.find(
															'input')
													.val().trim();
													}
									
								}
										answer.push($(this)
												.find(
														'input')
												.val());
									}
									
									if($(this).find('select').val()=='')
							    		secQuesFilledFlag=false;
							    	if($(this).find('input').val()=='')
							    		flag=true;
									
								});
								
//								$('.secQues')
//										.filter(
//												function() {
//													
////													if($(this)
////															.parent()
////															.parent()
////															.find(
////																	'input')
////															.val().trim() != ''){
////														count++;
////														
////													}
//													
//													/*if ($(this)
//															.parent()
//															.parent()
//															.find(
//																	'input')
//															.val() == '') {
//														$(this)
//																.parent()
//																.parent()
//																.find(
//																		'input')
//																.focus();
//														flag = true;
//														return false;
//													}*/
//												if($(this)
//														.parent()
//														.parent()
//														.find(
//																'input')
//														.val().trim()!=''){
//													if (ques == '' && $(this)
//															.parent()
//															.parent()
//															.find(
//																	'input')
//															.val().trim() !='') {
//														ques += $(this)
//																.find('select').val()
//																.trim();
//													} else {
//														if($(this)
//																.parent()
//																.parent()
//																.find(
//																		'input')
//																.val().trim() ==''){
//
//																}else{
//																	ques += ':'
//																+ $(this)
//																		.find('select').val()
//																		.trim();
//																}
//														
//													}
//													questions.push($(this)
//															.find('select').val()
//															.trim());
//													if (ans == '') {
//														ans += $(this)
//																.parent()
//																.parent()
//																.find(
//																		'input')
//																.val().trim();
//														
//													} else {
//														if($(this)
//																.parent()
//																.parent()
//																.find(
//																		'input')
//																.val().trim() ==''){
//
//																}else{
//																	ans += ':'
//														+ $(
//																this)
//																.parent()
//																.parent()
//																.find(
//																		'input')
//																.val().trim();
//																}
//												
//											}
//													answer.push($(this)
//															.parent()
//															.parent()
//															.find(
//																	'input')
//															.val());
//												}
//
//										});
								console.log(ques, '----', ans);
								var isdup = false,isdupQ = false;
								var lengthArry=getDistinctArray(answer);
								var lengthArryQ=getDistinctArray(questions);	
									
							    if (lengthArry.length!=ans.split(':').length) {
							    	isdup=true;
							    }
							    if (lengthArryQ.length!=ques.split(':').length) {
							    	isdupQ=true;
							    }
							    
							    if(!secQuesFilledFlag){
							    	showError(
											'Please select security question(s).',
											'dialog-forgotWizard');
							    }else if (flag) {
							    	showInformation('Please answer all 3 security questions',
										'dialog-forgotWizard');//Changed msg for UAT defect 2117
								}else 
								if(ans.split(':').length<minimumCount){		
									showInformation('Please answer all 3 security questions',
									'dialog-forgotWizard');//Changed msg for UAT defect 2117
								}else if(ans.split(':').length>minimumCount){
									showInformation('You must have a maximum of 3 security questions completed to use this facility.',
									'dialog-forgotWizard');
								}else if(isdupQ){
									showError('Security questions should not be same.',
									'dialog-forgotWizard');
								}else if(isdup){
									showError('Secret answers cannot be the same.',
											'dialog-forgotWizard');//Changed msg for UAT defect 2117
								}
								/*
								 * if ($('.selectOptions').val() ==
								 * 'Select') { showError( 'Please select
								 * the secret question.',
								 * 'dialog-secretQuestion'); }else if
								 * ($('.secretAnswer').val() .trim() ==
								 * '') { showError( 'Please fill the
								 * answer.', 'dialog-secretQuestion'); }
								 */else {
									updateSecQues({
										ques : ques,
										ans : ans
									});
								}
							});
					// NEED TO UNCOMMENT FOR NGBO SERVICES
					$('.changePass')
							.click(
									function() {
										hideError('dialog-forgotWizard');
										$('.errorDiv label').text('');

										var newPassword = $('.newPass').val();
										var currPass = $('.currPass').val();
										var conNewPass = $('.conNewPass').val();
										var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;
										var alphaNum = /^[a-zA-Z0-9]+$/;
										var letters = /^[a-zA-Z]+$/;
										var numbers = /^[0-9]+$/;

										if (currPass.trim() == "" || currPass == null) {
											showError(
													'Please enter Current Password.',
													'dialog-forgotWizard');
										} else if (newPassword.trim() == ""
												|| newPassword == null) {
											showError(
													'Please enter New Password.',
													'dialog-forgotWizard');
										} else if (conNewPass.trim() == ""
												|| conNewPass == null) {
											showError(
													'Please enter Confirm Password.',
													'dialog-forgotWizard');
										} else if (conNewPass != newPassword) {
											showError(
													'Passwords do not match. Please re-enter.',
													'dialog-forgotWizard');
											$('.newPass').val('').focus();
											$('.conNewPass').val('');
											
										}else if (newPassword.length < 7) {
											showError(
													'New password must contain at least 7 characters.',
													'dialog-forgotWizard');//Changed msg for UAT defect no 2111
										} else if (newPassword.length > 20) {
											showError(
													'New password length should not exceed 20 character.',
													'dialog-forgotWizard');
										}else if (!(alphaNum.test(newPassword) &&(!letters.test(newPassword) && !numbers.test(newPassword)))) {
											showError(
													'New password should have a minimum one alphabet- upper or lower case and a number(0-9), No special characters allowed.',
													'dialog-forgotWizard');
										}
										//R18.01 TIM Dev
										else if(newPassword.toLowerCase() == $('#loginUserId').val().toLowerCase()){
											showError(
													'New password should not be same as the user Id',
													'dialog-forgotWizard');
										}
										else {
											restPwd({
												oldPwd : $('.currPass').val(),
												newPwd : $('.newPass').val()
											});
										}

									});
					// NO ------------ NEED TO UNCOMMENT FOR NGBO SERVICES
					/*
					 * $(".getQues").click( function() {
					 * hideError('dialog-passwordReminder'); if
					 * ($('#username').val().trim() == '') { showError('Please
					 * enter user id.', 'dialog-passwordReminder'); } else {
					 * getSecQues({ userId : $('#username').val() });
					 *  } });
					 */
					// NEED TO UNCOMMENT FOR NGBO SERVICES
					$(".validateAns").click(
							function() {
								hideError('dialog-secretQuestion');
								if ($('.secretAnswer').val().trim() == '') {
									showError('Please enter the answer.',
											'dialog-secretQuestion');
								} else {
									validateAns({
										userId : $('.userNm').text().trim(),
										ques : $('.secQues').text().trim(),
										ans : $('.secretAnswer').val().trim()
									});

								}
							});

					// NEED TO UNCOMMENT FOR NGBO SERVICES
					$('.changePwd')
							.click(
									function() {
										$('.errorDiv label').text('');

										var newPassword = $('.newPass').val();
										// var currPass = $('.currPass').val();
										var conNewPass = $('.conNewPass').val();
										// var regex =
										// /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;

										if (newPassword == ""
												|| newPassword == null)
											showError(
													'Please enter New Password',
													'dialog-changePassword');
										else if (conNewPass == ""
												|| conNewPass == null)
											showError(
													'Please enter Confirm Password',
													'dialog-changePassword');
										else if (conNewPass != newPassword)
											showError(
													'Passwords does not match.',
													'dialog-changePassword');
										//R18.01 TIM Dev
										else if(newPassword.toLowerCase() == $('#loginUserId').val().toLowerCase()){
											showError(
													'New password should not be same as the user Id',
													'dialog-changePassword');
										}
										else {
											changePwd({
												newPwd : $('.newPass').val(),
												userId : $('.userNm').text()
														.trim()
											});
										}

									});
					$("#dialog-confirmation_forPrimary").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 600,
						width : 350
					});
					var confimForPopUp=$('#confirmSecondaryLogin').val();
					if(confimForPopUp=='yes'){
						confirmationForPrimary("Your don't have access to this(primary) Store.<br>Continue login to secondary store?");
					}
					
				});
function confirmationForPrimary(msg) {
	$("#dialog-confirmation_forPrimary").find('#ok').removeClass("hideBlock");
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
	$("#dialog-confirmation_forPrimary").parent().addClass("popupWrapper");
	$("#dialog-confirmation_forPrimary").dialog("open");
	$("#dialog-confirmation_forPrimary").find('#message').html(msg);
	$("#dialog-confirmation_forPrimary").parent().find('.ui-dialog-title').text(
			'Confirmation');
	$("#dialog-confirmation_forPrimary").find('#ok').unbind('click');
	$("#dialog-confirmation_forPrimary").find('#ok').click(function() {
		$("#dialog-confirmation_forPrimary").parent().removeClass("popupWrapper");
		$("#dialog-confirmation_forPrimary").dialog("close");
		startLoading();
		window.location.href=$('#userSalesOrg').val()+'/login/homepage.htm'
	});
	$("#dialog-confirmation_forPrimary").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation_forPrimary").find('#cancel').unbind('click');
	$("#dialog-confirmation_forPrimary").find('#cancel').click(function() {
		$("#dialog-confirmation_forPrimary").parent().removeClass("popupWrapper");
		$("#dialog-confirmation_forPrimary").dialog("close");
		startLoading();
		window.location.href='logginOut.htm'
	});
}
function updateSecQues(data) {

	$.ajax({
		type : "get",
		url : "updateSecQues.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			if (response == '') {
				showInformation('Security Questions have been updated successfully.',undefined,'Set Security question');//Changed msg for UAT defect no 2121
				$('#dialog-secretQuestion').dialog('close');
			} else {
				showError('Security question update failed:'+response,
						'dialog-forgotWizard');
				$('#dialog-secretQuestion').find('.closePopUp,.secondaryActionBtn').removeClass('hideBlock');	
				$(".ui-dialog-titlebar-close").show();	
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.',
			'dialog-forgotWizard');
			stopLoading();
		},
	});

}
function restPwd(data) {

	$.ajax({
		type : "get",
		url : "resetPwd.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			console.log(response);
			if (response == 'true') {
				$('#dialog-changePassword').dialog('close');
				selectStore();
				showInformation('Password changed successfully and may take up to 5 minutes to become active.',
						false);
				
			}else if(response.split(':')[0] == 'partiallyTrue'){
				$('#dialog-changePassword').dialog('close');
				selectStore();
				showInformation('System is currently offline. Password change will be valid for Store Central only until the system is back online.<br><b>'+response.split(':')[1]+'</b>',
				true);
			}else if(response.split(':')[0] == 'false'){
				$('#dialog-changePassword').dialog('close');
				selectStore();
				showInformation('Technical issue occured,Please contact java support.',
				true);
			}else {
				showError(''+response,
						'dialog-forgotWizard');
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.', 'dialog-forgotWizard');
			stopLoading();
		},
	});

}
function changePwd(data) {

	$.ajax({
		type : "get",
		url : "restPwd.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			if (response == 'true') {
				$('#dialog-changePassword').dialog('close');
				$('#dialog-passwordSuccess').dialog('open').removeClass(
						'visible-hide');
				$('#dialog-passwordSuccess').find('.alertText').html('Password reset successfully and may take up to 5 minutes to become active.');
				$('#dialog-passwordSuccess').dialog('open').removeClass(
				'visible-hide');
			}else if(response.split(':')[0] == 'partiallyTrue'){
				$('#dialog-changePassword').dialog('close');
				$('#dialog-passwordSuccess').find('.alertText').html('System is currently offline. Password change will be valid for Store Central only until the system is back online.<br><b>'+response.split(':')[1]+'</b>');
				$('#dialog-passwordSuccess').dialog('open').removeClass(
				'visible-hide');
			}else {
				showError('Update Failed.', 'dialog-changePassword');
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.', 'dialog-changePassword');
			stopLoading();
		},
	});

}

function getSecQues(data) {

	$.ajax({
		type : "get",
		url : "getSecrQues.htm",
		data : data,
		async : false,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			if (response != 'false') {
				$('.secQues').text(response);
				$('.userNm').text($('#username').val());
				// $('#dialog-passwordReminder').dialog('close');
				// $('#dialog-secretQuestion').dialog('open').removeClass('visible-hide');
				// $('#next').addClass('jw-button-next');
				return true;
			} else {
				showError('Username invalid', 'dialog-passwordReminder');
				return false;
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.', 'dialog-passwordReminder');
			stopLoading();
			return false;
		},
	});

}

function validateAns(data) {

	$.ajax({
		type : "get",
		url : "validateAns.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			if (response != 'false') {
				$('#dialog-secretQuestion').dialog('close');
				$('#dialog-changePassword').dialog('open').removeClass(
						'visible-hide');
			} else {
				showError(response, 'dialog-secretQuestion');
			}
			stopLoading();
		},
		error : function() {
			showError('Technical issue occured,Please contact java support.', 'dialog-secretQuestion');
			stopLoading();
		},
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
function showError(msg, id) {

	//
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg);
	else {
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').addClass('popupError').text(msg);
		$('#' + id + ' .popupActions').parent().removeClass('hideBlock');
	}
}
function showWarning(msg, id) {
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg).removeClass(
				'positiveFlag').addClass('positiveFlag').text(msg);
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('positiveFlag').addClass('positiveFlag').text(msg);
	// $('#'+id+' .popupActions').parent().removeClass('hideBlock');
}
function hideError(id) {
	// $('#'+id+'
	// .popupActions').prev().removeClass('popupError,popupWarning').addClass('popupError').text('');
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text('');
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').text('');
}

function showInformation(txt,warn,title){
	$("#dialog-info-alert").parent().addClass('popupWrapper');
	$("#dialog-info-alert").dialog('open');
	$("#dialog-info-alert").find('#alertInfoText').html(txt);
	if(title!=undefined)
		$("#dialog-info-alert").parent().find('.ui-dialog-title').text(title);
	else
		$("#dialog-info-alert").parent().find('.ui-dialog-title').text("Information");
	if(warn!=undefined && warn==true)
	$("#dialog-info-alert").find('#alertInfoText').addClass('warning');
}

function getDistinctArray(arr) {
    var compareArray = new Array();
    if (arr.length > 1) {
        for (var i = 0;i < arr.length;i++) {
            if (compareArray.indexOf(arr[i]) == -1) {
                compareArray.push(arr[i]);
            }
        }
    }
    return compareArray;
}
