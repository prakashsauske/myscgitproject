$( document ).ready(function() {
	
	$( "#dialog-passwordReminder" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-passwordReminder").parent().addClass("popupWrapper");
	$( "#dialog-passwordSuccess" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-passwordSuccess").parent().addClass("popupWrapper");


	$( "#dialog-passwordExpired" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-passwordExpired").parent().addClass("popupWrapper");





	$( "#dialog-changePassword" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-changePassword").parent().addClass("popupWrapper");		
	$("#dialog-changePassword").dialog({
		  closeOnEscape: false,
		  modal: true
		});
	$("#dialog-passwordExpired").parent().addClass("popupWrapper");		
	$("#dialog-passwordExpired").dialog({
		  closeOnEscape: false,
		  modal: true
		});
	
	if($('#Key').val().trim()=="Key"){
	var date=new Date();
	var mydate=$('#passExpDate').val().split(' ')[0].split('-');
	var mydate=mydate[2]+"/"+mydate[1]+"/"+mydate[0];
	//var mydate='15/10/2013';
	var dateExp = new Date();
	var parts = mydate.split('/');
	
	var expDate=dateExp.setFullYear(parts[2], parts[1]-1, parts[0]); 
	
	var dateToday= dateExp.setTime(date.getTime());
	var dateOne= dateExp.setTime(date.getTime() + (86400000));
	var dateTwo= dateExp.setTime(date.getTime() + (86400000*2));
	var dateThree= dateExp.setTime(date.getTime() + (86400000*3));
	var dateFour= dateExp.setTime(date.getTime() + (86400000*4));
	var dateFive= dateExp.setTime(date.getTime() + (86400000*5));

	if($('#changePwd').val()=='true'){
		//$('#dialog-passwordReminder .alertText').('Your password expires today. Would you like to change it now?');
		$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
		$('#dialog-changePassword').dialog('open');
		}
	else if(dateToday>expDate){
		//$('#dialog-passwordReminder .alertText').('Your password expires today. Would you like to change it now?');
		$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
		$('#dialog-passwordExpired').dialog('open');}
	else if(dateToday==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password expires today. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');}
	else if(dateOne==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password will expire in 1 day. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');}
	else if(dateTwo==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password will expire in 2 days. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');}
	else if(dateThree==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password will expire in 3 days. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');} 
	else if(dateFour==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password will expire in 4 days. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');}
	else if(dateFive==expDate){
		$('#dialog-passwordReminder .alertText').text('Your password will expire in 5 days. Would you like to change it now?');
		$('#dialog-passwordReminder').dialog('open');}
		
	}
	

	$('.changePass').click(function(){
		$('.errorDiv label').text('');
		
		var newPassword=$('.newPass').val();
		var currPass=$('.currPass').val();
		var conNewPass=$('.conNewPass').val();
		var regex= /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;
		/*if($('.oldPass').val()!=$('.userPass').val())
			$('.errorDiv label').text("Wrong password");
		else*/ 
		if(currPass=="" || currPass==null)
			$('.errorDiv label').text("Please enter Current Password");
		else if(newPassword=="" || newPassword==null)
			$('.errorDiv label').text("Please enter New Password");
		else if(conNewPass=="" || conNewPass==null)
			$('.errorDiv label').text("Please enter Confirm Password");
		else{
		$.ajax({
			type : "GET",
			url : "validateOldPwd.htm",
			
			//data : "oldPwd=" + currPass,
			data: {oldPwd: currPass, newPass: newPassword },
			success : function(response) {
				if(response.split('~')[0]=='true'){
				if(response.split('~')[1]=='false') 
					$('.errorDiv label').text("New password cannot be same as the old password.");
				else if($('.newPass').val()!=$('.conNewPass').val())
					$('.errorDiv label').text("Passwords doesn't match");
				else{
					
					$.ajax({
						type : "GET",
						url : "updateNewPwd.htm",
						
						//data : "newPassword=" + newPassword,
						data: {newPassword: newPassword},
						success : function(response) {
							if(response=='true'){
								$('#dialog-changePassword').dialog('close');
								$('.closePopUp').show();
								//$('#dialog-passwordReminder .alertText').text('Your password has been updated successfully');
								$('#dialog-passwordSuccess').dialog('open');
							}
							else{
								$('.errorDiv label').text("Password updation failed");
								
							}
						},
					});
					
				}
				
				}else{
					$('.errorDiv label').text("Current password is incorrect.");
					//$('#dialog-changePassword').dialog('close');
					/*	form submit code goes here*/
					}
			},
		});	}
		
		});
	
	  });