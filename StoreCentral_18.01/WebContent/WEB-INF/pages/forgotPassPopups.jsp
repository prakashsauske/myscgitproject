<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- Password expiry reminder popup -->
<div id="dialog-passwordReminder" title="Forgot Password"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<form method="POST" action="" id="">
				<div class="ContentTableWrapper formWrapper">

					<div class="parameter">
						<label for="dDate">User Name</label> <input type="text"
							class="textbox forgotUserName">
					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of content table wrapper -->
			</form>
			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn getQues">Get Question</label> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-passwordReminder').dialog('close');">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->




<!-- Password expired popup -->
<div id="dialog-passwordExpired" title="Password Expired"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">Your password has expired. Please change
				your password.</h4>

			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn passwordExpiredOkBtn">Ok</label> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-passwordExpired').dialog('close');">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->

<!-- Password expired popup -->
<div id="dialog-secretQuestion" title="Set Secret Question"
	class="visible-hide secretQuestPopup">
	<div class="popupContent">

		<div class="popupData">

			<form method="POST" action="" id="">
				<div class="ContentTableWrapper formWrapper">

					<div class="parameter">
						<label for="dDate ">User Name</label> <label for="dDate"
							class="userNm">xpsn7</label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label for="dDate">Secret Question</label> <label for="dDate"
							class="secQues">What's your pet name?</label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label for="dDate">Answer</label> <input type="text"
							class="textbox secretAnswer">
					</div>
					<!-- End of parameter -->



				</div>
				<!-- End of content table wrapper -->
			</form>


			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn validateAns">Validate</label> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-secretQuestion').dialog('close');">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->


<!-- Password expired popup -->
<div id="dialog-passwordSuccess" title="Successful Password Change"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">Your password has been updated
				successfully.</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					onclick="$('#dialog-passwordSuccess').dialog('close');">Ok</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->









<!-- Change password popup -->
<div id="dialog-changePassword" title="Change Password"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<div class="tableInfo">


				<div class="alertText">
					<h4>
						<strong>Please enter the details:</strong>
					</h4>
					<ul class="orderList">
						<!--<li>8 - 16 characters </li>
							 <li>A combination of upper and lower case letters </li>
							<li>At least one number and one symbol </li> -->
					</ul>


				</div>
				<!-- End of table title -->


			</div>
			<!-- End of table info -->


			<input type="hidden" value="${Key}" id="Key" /> <input type="hidden"
				value="${changePwd}" id="changePwd" />

			<form method="POST" action="" id="">
				<div class="ContentTableWrapper formWrapper">


					<div class="parameter">
						<label for="dDate">New Password</label> <input type="password"
							class="textbox newPass">
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label for="dDate">Confirm New Password</label> <input
							type="password" class="textbox conNewPass">
					</div>
					<!-- End of parameter -->

					<div class="errorDiv parameter">
						<label></label>
					</div>

				</div>
				<!-- End of content table wrapper -->
			</form>
		</div>
		<!-- End of pop up data -->


		<div class="popupActionsWrapper">
			<label class="secretPopMsg"></label> <span class="popupActions">
				<label class="actionBtn changePwd">Change Password</label> <label
				class="secondaryActionBtn"
				onclick="$('#dialog-changePassword').dialog('close');">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-forgotWizard" title="Forgot Password"
	class="visible-hide">
	<div class="popupContent wizardContent">



		<div class="popupData">

			<h4 class="alertText">Please provide following information to
				reset your password.</h4>


			<form method="POST" action="" id="wizard">
				<div class="formWrapper" title="Provide Username">
					<h2 class="wizardTitle">Provide username</h2>



					<div class="parameter">
						<label for="username">Username</label> <input type="#"
							class="textbox" id="username">
					</div>
					<!-- End of parameter -->


					<div class="errorDiv parameter">
						<label style="width:90%;"></label>
					</div>

				</div>
				<!-- End of content table wrapper -->

				<div class="formWrapper" title="Security Questions">
					<h2 class="wizardTitle">Answer following security questions</h2>



					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="q1">What is your first school Name?</label></td>
								<td><input type="#" class="textbox" id="q1"></td>
							</tr>
							<tr>
								<td><label for="q2">What is your Pet name?</label></td>
								<td><input type="#" class="textbox" id="q2"></td>
							</tr>
						</table>


					</div>
					<!-- End of parameter -->

					<div class="errorDiv parameter">
						<label style="width:90%;"></label>
					</div>

				</div>
				<!-- End of content table wrapper -->


				<div class="formWrapper" title="Change Password">
					<h2 class="wizardTitle">Change Password</h2>

					<div class="parameter">
						<label for="dDate">New Password</label> <input type="password"
							class="textbox newPwd">
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label for="dDate">Confirm New Password</label> <input
							type="password" class="textbox confirmNewPwd">
					</div>
					<!-- End of parameter -->

					<div class="errorDiv parameter">
						<label style="width:90%;"></label>
					</div>

					<!-- <div class="tableInfo">
				
												
							<div class="alertText">
								<br />	
								<h4>New password must conform to the following rules:</h4>
								<ul class="orderList">
									<li>Must not contain your username </li>
									<li>Last 15 passwords cannot be reused</li>
									<li>Must be at least 8 characters long</li>
									<li>Must contain at least 4 letters and 1 number </li>
									<li>Must not contain more than 2 repeated characters</li>
									<li>Must not have '?' or '!' as the first character</li>
								</ul>
							</div> End of table title					
							
						
						</div> End of table info -->



				</div>
				<!-- End of content table wrapper -->


			</form>
		</div>
		<!-- End of pop up data -->


		<div class="popupActionsWrapper hideBlock">
			<span class="popupInfo"> <label class="mandatory">mandatory</label>
			</span> <span class="popupActions"> <label class="actionBtn">Proceed</label>
				<label class="secondaryActionBtn">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-confirm" title="For Your Information"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText information">
				You have selected <strong>'1105 - Baulkham Hills'</strong> <br/ >
				<br /> Do you want to continue?

			</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id="yes">Yes</label>
					<label class="secondaryActionBtn" id="no">No</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End confirmation popup -->

<input type="hidden" id="menuBarOptions"
	value="<c:forEach items="${menuBarOptions}" var="menuBarOptions">${menuBarOptions},</c:forEach>">
<script>
	$(document).ready(function() {

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
		
		
		$( "#dialog-forgotWizard" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 430
		});

		$("#dialog-forgotWizard").parent().addClass("popupWrapper");
		if(!$('#wizard').hasClass('ui-widget'))
			$("#wizard").jWizard();
		
		$("#dialog-passwordSuccess").parent().addClass("popupWrapper");


		$( "#dialog-secretQuestion" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 100,
			maxHeight: 600,
			width: 400
		});
		
		$("#dialog-secretQuestion").parent().addClass("popupWrapper");
		
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

		$( "#dialog-confirm" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 400,
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide();}
		});
		$("#dialog-confirm").parent().addClass("popupWrapper");
		
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
			$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
			}
		else if(dateToday>expDate){
			//$('#dialog-passwordReminder .alertText').('Your password expires today. Would you like to change it now?');
			$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
			$('#dialog-passwordExpired').dialog('open').removeClass('visible-hide');}
		else if(dateToday==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password expires today. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');}
		else if(dateOne==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password will expire in 1 day. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');}
		else if(dateTwo==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password will expire in 2 days. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');}
		else if(dateThree==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password will expire in 3 days. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');} 
		else if(dateFour==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password will expire in 4 days. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');}
		else if(dateFive==expDate){
			$('#dialog-passwordReminder .alertText').text('Your password will expire in 5 days. Would you like to change it now?');
			$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');}
			
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
									$('#dialog-passwordReminder .alertText').text('Your password has been updated successfully');
									$('#dialog-passwordSuccess').dialog('open').removeClass('visible-hide');
								}else if(response.split(':')[0]='partiallyTrue'){
									$('#dialog-changePassword').dialog('close');
									$('.closePopUp').show();
									$('#dialog-passwordReminder .alertText').text('System is currently offline. Password change will be valid for Store Central only until the system is back online.<br>'+response.split(':')[1]);
									$('#dialog-passwordSuccess').dialog('open').removeClass('visible-hide');
								}
								else{
									$('.errorDiv label').text("Password updation failed.");
									
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
	
</script>