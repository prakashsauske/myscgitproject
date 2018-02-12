<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- Password expiry reminder popup -->
<div id="dialog-passwordReminder" title="Notification"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">Your password will expire in 5 days. Would
				you like to change it now?</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					onclick="$('#dialog-passwordReminder').dialog('close');$('#dialog-changePassword').dialog('open').removeClass('visible-hide');">Yes</label>
					<label class="secondaryActionBtn"
					onclick="$('#dialog-passwordReminder').dialog('close');selectStore();">No</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->
<input type="hidden" id="changePasswordMandatory" value="${changePasswordMandatory}">



<!-- Password expired popup -->
<div id="dialog-passwordExpired" title="Password Expired"
	class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">Your password has expired. Please change
				your password.</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					onclick="$('#dialog-passwordExpired').dialog('close');$('#dialog-changePassword').dialog('open').removeClass('visible-hide');">Ok</label>
					<label class="secondaryActionBtn"
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
<div id="dialog-secretQuestion" title="Security Question"
	class="visible-hide">
	<div class="popupContent">
		<div class="tableInfo">
			<h4>
				
				<B>Choose your security questions below.</B><br><!-- changed msg for UAT defetc no 2117 -->
				<br>
			</h4>
		</div>
		<div class="popupData">

			<form method="POST" action="" id="">
				<div class="ContentTableWrapper formWrapper">
					<div class="parameter">
					<input type="hidden" id="limtSecretQues" value="${SQlimit}" />
						<table width="100%" class="plainTable">							
							<c:forEach var="i" begin="1" end="${SQlimit}">
								<tr class="quesRow">
									<td><label class="secQuesSelect" for="q-${i}">
									<select class="selectOptions">
										<option value="" class="secretQues">Select question</option><!-- Changed for UAT defect no 2117 -->
										<c:forEach items="${secretQuesList}" var="secretQuesItm">
										<option value="${secretQuesItm}">${secretQuesItm}</option>
										</c:forEach>
									</select>
									</label></td>
									<td><input placeholder="Type answer..." type="#" class="secAns textbox" id="q-${i}"></td><!-- Changed for UAT defect no 2117 -->
								</tr>								
							</c:forEach>
						</table>
						<%-- <div class="parameter">
							<label for="dDate">Security Question</label>
							<select class="selectOptions">
								<option>Select</option>
								<c:forEach items="${secretQuesList}" var="secretQues">
								<option>${secretQues}</option>
								</c:forEach>
								</select>
						</div> <!-- End of parameter -->	

						<div class="parameter">
							<label for="dDate">Answer</label>
							<input type="text" class="textbox secretAnswer" >
						</div> <!-- End of parameter -->	 --%>
					</div>
					<div class="errorDiv parameter">
						<label></label>
					</div>

				</div>
				<!-- End of content table wrapper -->
			</form>


			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn" id="setSecQues">Submit</label> <label
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
				<span class="popupActions"> <label
					class="actionBtn updateSuccess"
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
					<div class="tableTitle warnDiv parameter" id="offlineWarning">
						<label class="warning">System is currently offline. Password change will be valid for Store Central only until the system is back online.</label>
					</div>
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
						<label for="dDate">Current Password</label> <input type="password"
							class="textbox currPass">
					</div>
					<!-- End of parameter -->

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
						<label style="width: 90%;"></label>
					</div>

				</div>
				<!-- End of content table wrapper -->
			</form>
		</div>
		<!-- End of pop up data -->


		<div class="popupActionsWrapper">

			<span class="popupActions"> <label
				class="actionBtn changePass" id="changePassword">Change
					Password</label> <label class="secondaryActionBtn"
				onclick="$('#dialog-changePassword').dialog('close');">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-pass-alert" title="User Management" class="visible-hide1">
	<div class="popupContent">

		<div class="popupData">


			<h4 class="alertText" id="userAlertBox">There is no article to
				be received. Cannot finalize the order.</h4>

			<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id=""
					onclick="$('#dialog-pass-alert').dialog('close');">OK</label>
				</span>
			</div>
			<!-- End of popup actions-->

			<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

		</div>
	</div>
	<!-- End of popupContent -->
</div>
<!-- verify supplier pop up-->
<div id="dialog-changeStore" title="Change Store"
	class="store-change hideBlock">
	<div class="popupContent">

		<div class="tableInfo">
			<h4>You have access to following stores. Click on 'Select' to
				change a store.</h4>
		</div>
		<!-- End of table info -->

		<div class="popupSearchWrapper" id="popupSearch">

			<div class="searchWrapper">
				<h3>Search:</h3>
				<input type="#" class="textbox searchBoxStore textboxDefaultText"
					placeholder="Enter store no. or name">
			</div>
			<!-- End of search wrapper -->

			<div class="filterWrapper hideBlock">
				<h3>Sales Organisation:</h3>
				<select class="selectOptions">
					<option value="All">All</option>
					<option value="BigW">BigW</option>
					<option value="BWS">BWS</option>
					<option value="Woolworths">Woolworths</option>


				</select>
			</div>
			<!-- End of search wrapper -->


		</div>
		<!-- End of popup search wrapper -->

		<div class="popupData">



			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>Site #</th>
						<th>Site Name</th>
						<th>Address</th>
						<th>Phone #</th>
						<th>Sales Organisation</th>
						<th width="25px" class="lastColumn">&nbsp;</th>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">BigW</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">Woolworths</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">BWS</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">Woolworths</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">BWS</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1090</td>
						<td>Rouse Hill</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">BigW</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="appendedStore">
						<td>1105</td>
						<td>Baulkham Hills</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">Woolworths</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="lastRow appendedStore">
						<td>1141</td>
						<td>Norwest Circa</td>
						<td>1 Woolworths Way, Bella Vista, NSW 2153</td>
						<td>(88) 8888 8888</td>
						<td class="salesOrg-filter">Woolworths</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
				</table>



				<div class="tableFooter">
					<div class="paginationWrapper bottomPagination">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination">
								<ul>

								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- End of table footer -->



			</div>
			<!-- End of content table wrapper -->

		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of changeStore -->

<div id="dialog-selectStore" title="Select a Store to Continue"
	class="visible-hide">
	<div class="popupContent">

		<div class="tableInfo">
			<h4>
				You have access to multiple stores, so please 'Select' a store to
				continue.<br /> <br />
			</h4>
		</div>
		<!-- End of table info -->

		<div class="popupData">



			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>Store</th>
						<th width="25px" class="lastColumn">&nbsp;</th>
					</tr>
					<tr>
						<td>1090 - Rouse Hill</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr>
						<td>1105 - Baulkham Hills</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
					<tr class="lastRow">
						<td>1141 - Norwest Circa</td>
						<td class="sorted lastColumn"><label class="linkBtn"><label
								class="selectItem">Select</label></label></td>
					</tr>
				</table>





			</div>
			<!-- End of content table wrapper -->

		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of changeStore -->

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

<div id="dialog-VerifyUser" title="Verify User" class="visible-hide">
	<div class="popupContent">

		<div class="popupData">
			<form method="POST" action="" id="">
				<div class="ContentTableWrapper formWrapper">

					<div class="parameter">
						<label for="dDate">Store No</label> <input type="text"
							class="textbox verifyNm">
					</div>
					<!-- End of parameter -->
					<div class="errorDiv hideBlock parameter">
						<label></label>
					</div>

				</div>
				<!-- End of content table wrapper -->
			</form>
			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn verify">Verify</label>

				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->

<div id="dialog-info-alert" title="User Management">
	<div class="popupContent">

		<div class="popupData">


			<h4 class="alertText" id="alertInfoText">There is no article to
			
				be received. Cannot finalize the order.</h4>

			<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id=""
					onclick="$('#dialog-info-alert').dialog('close');">OK</label>
				</span>
			</div>
			<!-- End of popup actions-->

			<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

		</div>
	</div>
	<!-- End of popupContent -->
</div>


<input type="hidden" id="menuBarOptions"
	value="<c:forEach items="${menuBarOptions}" var="menuBarOptions">${menuBarOptions},</c:forEach>">

<script>
var siteNo='';
var siteName='';
var salesOrg='';
var roleId='';
var salesNm='';
var district='';
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
				closeOnEscape: false,			
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 400
			});
			
			$("#dialog-passwordSuccess").parent().addClass("popupWrapper");


			$( "#dialog-secretQuestion" ).dialog({	
				closeOnEscape: false,			
				autoOpen: true,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 605
			});
			
			$("#dialog-secretQuestion").parent().addClass("popupWrapper");

			$("#dialog-pass-alert").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 120,
				maxHeight : 600,
				width : 350
			}).removeClass('visible-hide1');

			$("#dialog-info-alert").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 120,
				maxHeight : 600,
				width : 350
			});
			
			$("#dialog-info-alert").parent().addClass("popupWrapper");
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
				width: 400,
				open: function(event, ui) {
			          setTimeout(function(){$('.currPass').focus();},500);
			             
			     },
			});

			$( "#dialog-selectStore" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 400,
				dismissible: false,
				closeOnEscape: false,
				//open: function(event, ui) { $(".ui-dialog-titlebar-close").hide();}
			});
			
			$("#dialog-selectStore").parent().addClass("popupWrapper");	
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

			
			$( "#dialog-VerifyUser" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 400,
				closeOnEscape: false,
				open: function(event, ui) { $(".ui-dialog-titlebar-close").hide();}
				
			});
			
			$("#dialog-VerifyUser").parent().addClass("popupWrapper");
			/* $(".selectItem").click(function(){	
				$('#dialog-selectStore').dialog( "close" );
				$('#dialog-confirm').dialog( "open" );			
			}); */

			$('body').removeClass('popupWrapper');

			
		//End		
		
		/* $('.verify').click(function(){
			$( "#dialog-VerifyUser .errorDiv ").addClass('hideBlock');
			$( "#dialog-VerifyUser .errorDiv label").text('');
			$.ajax({
				type : "get",
				url : "verifyStore.htm",
				data : {site:$('.verifyNm').val().trim()},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if(response!='false'){
						$( "#dialog-VerifyUser" ).dialog('close');
						$('.store .globalLinkLabel').text('Store: '+response.split('-')[0]+' | '+response.split('-')[1]);
						}
					else{
						$( "#dialog-VerifyUser .errorDiv ").removeClass('hideBlock');
						$( "#dialog-VerifyUser .errorDiv label").text('Invalid Store no.');
						$('.verifyNm').focus();
						}
				},
				error : function() {
					// goToLogin();
				},
			});
			}); */
		
		
		// code to open change password
		/* $( "#changeStore, .store" ).click(function() {							
			$( "#dialog-changeStore" ).dialog( "open" );				
		}); */	
		
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


			$('.filterWrapper .selectOptions').change(function(){
				var salesOrgName=$(this).val().trim();

				$('.salesOrg-filter').each(function(){
					if(salesOrgName!="All"){
					if($(this).text().trim()==salesOrgName)
						$(this).parent().removeClass('hideBlock');
					else
						$(this).parent().addClass('hideBlock');
					}
					else
						$(this).parent().removeClass('hideBlock');
				});
				
				});
			$('.store-change .paginationWrapper').pagination({
				items : 20,
				itemsOnPage : 3,
				cssStyle : 'compact-theme',
				currentPage : 1,
				onPageClick : function(pageNumber) {
					//getArticlesForPage(pageNumber);

				}

			});
			
			if($('#Key').val().trim()=="Key"){
			var date=new Date();
			//var mydate=$('#passExpDate').val().split(' ')[0].split('-');
			var mydate=$('#passExpDate').val();
			//var mydate=mydate[2]+"/"+mydate[1]+"/"+mydate[0];
			//var mydate='15/10/2013';
			var dateExp = new Date();
			var parts = mydate.split('/');
			var expIn=$('#pwdExpIn').val();
			
			/*var expDate=dateExp.setFullYear(parts[2], parts[1]-1, parts[0]); 
			
			var dateToday= dateExp.setTime(date.getTime());
			var dateOne= dateExp.setTime(date.getTime() + (86400000));
			var dateTwo= dateExp.setTime(date.getTime() + (86400000*2));
			var dateThree= dateExp.setTime(date.getTime() + (86400000*3));
			var dateFour= dateExp.setTime(date.getTime() + (86400000*4));
			var dateFive= dateExp.setTime(date.getTime() + (86400000*5));*/
			if($('#changePasswordMandatory').val()=='Y' && expIn<0 ){
				$('#dialog-passwordExpired .alertText').text('Your password  has expired.Please change your password');
				$('#dialog-passwordExpired').dialog('open').removeClass('visible-hide');
				$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
				$('.closePopUp').addClass('hideBlock'); 
				if($('#timOffline').val()=='Y'){				  
				  	$('#offlineWarning').removeClass('hideBlock');
				}else{
					$('#offlineWarning').addClass('hideBlock');
				}				  
				//$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
			}else if ($('#changePasswordMandatory').val()=='R')
			{
				$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
				$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
				$('.closePopUp').addClass('hideBlock'); 
				if($('#timOffline').val()=='Y'){				  
				  	$('#offlineWarning').removeClass('hideBlock');
				}else{
					$('#offlineWarning').addClass('hideBlock');
				}
			}else if($('#changePwd').val()=='true'){		
				if($('#timOffline').val()=='Y'){				  
				  	$('#offlineWarning').removeClass('hideBlock');
				}else{
					$('#offlineWarning').addClass('hideBlock');
				}				
				 if(expIn<0){
					$('#dialog-changePassword .secondaryActionBtn,.closePopUp,#dialog-passwordExpired .secondaryActionBtn').hide();
					$('#dialog-passwordExpired').dialog('open').removeClass('visible-hide');
					}else if(expIn==0){
					$('#dialog-passwordReminder .alertText').text('Your password expires today. Would you like to change it now?');
					$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');
					}else if(expIn==1){
						$('#dialog-passwordReminder .alertText').text('Your password will expire in 1 day. Would you like to change it now?');
						$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');
						}else{
							$('#dialog-passwordReminder .alertText').text('Your password will expire in '+(Number(expIn))+' days. Would you like to change it now?');
							$('#dialog-passwordReminder').dialog('open').removeClass('visible-hide');
						}
				}else{
				selectStore();
				}

			/*if($('#changePwd').val()=='true'){
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
			else{
				selectStore();
				}*/
				
			}
			

			
			 if($('#option').val()=='reset'){				 
				 
				  if($('#timOffline').val()=='Y'){
					    $('#dialog-secretQuestion').dialog('close');
					  	$('#offlineWarning').removeClass('hideBlock');
					  	if($('#timMessage').val()==''){
						showInformation('System is offline, Change password is unavailable, please try again later.',undefined,'Change Password');
					  	}else{
					  		showInformation('System is offline, Change password is unavailable, please try again later.<br> <b>'+$('#timMessage').val()+'</b>',undefined,'Change Password');
						  	}
					}else{
						$('#offlineWarning').addClass('hideBlock');
						$('#dialog-secretQuestion').dialog('close');
						$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
					}
				 
			  }
			  else if($('#option').val()=='setQues' || $('#secQues').val()=='Y')
				  {
				  
				  if($('#timOffline').val()=='Y'){
					   $('#dialog-secretQuestion').dialog('close');
						showInformation(
								'System is offline, you cannot set Secret Question now, please try again later.',
								'dialog-forgotWizard','Set Security Questions');//<!-- changed msg for UAT defetc no 2117 , 2071-->
						if($('#timMessage').val()==''){
							showInformation(
									'System is offline, you cannot set Secret Question now, please try again later.',
									'dialog-forgotWizard','Set Security Questions');//<!-- changed msg for UAT defetc no 2117 ,2071-->
						  	}else{
						  		showInformation('System is offline, you cannot set Secret Question now, please try again later.',undefined,'Set Security Questions');//<!-- changed msg for UAT defetc no 2117,2071 -->
						  		//showInformation('Set security question is unavailable as <I>'+$('#timMessage').val()+'<i>, please try again later.',undefined,'Set Security Question');
							  	}
						if($('#secQues').val()=='Y'){
							$(".closePopUp").addClass('hideBlock');
						//	$("#dialog-info-alert").find('.actionBtn').click(function(){ window.location.href="../../";});
							}
								
					}else{
						hideError('dialog-forgotWizard');
						$('#dialog-secretQuestion').dialog('open').removeClass('visible-hide');
						if($('#secQues').val()=='Y'){
							//$('#dialog-secretQuestion').find('.closePopUp,.secondaryActionBtn').addClass('hideBlock');
							//$(".ui-dialog-titlebar-close").hide();
							$('#dialog-secretQuestion').find('.closePopUp,.secondaryActionBtn').removeClass('hideBlock');	
							$('#dialog-secretQuestion').parent().find(".ui-dialog-titlebar-close").show();
							$('#dialog-secretQuestion').parent().find('.closePopUp,.secondaryActionBtn').click(function(){
									$.ajax({
										url : "destoySecFlag.htm",
										type : 'get',
										success : function(response) {
										}
									});
								});
							//$('#dialog-secretQuestion').parent().find('.closePopUp').cl
						}else{
							$('#dialog-secretQuestion').find('.closePopUp,.secondaryActionBtn').removeClass('hideBlock');	
							$(".ui-dialog-titlebar-close").show();												
							}
					}
				  }
			  else {
				  if($('#dialog-secretQuestion').dialog('isOpen'))
				  $('#dialog-secretQuestion').dialog('close');
				  /*if($('#dialog-changePassword').dialog('isOpen'))
					  $('#dialog-changePassword').dialog('close');*/
					  
				  }
			// $('#dialog-secretQuestion').dialog('close');

			
			/* <tr>							
				<td></td>							
				<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem">Select</label></label></td>							
			</tr> */
				/*if(){
					$('#dialog-secretQuestion').dialog('open').removeClass('visible-hide');
					} */

			$( "#dialog-confirm #yes" ).click(function(){
				//var val=$( "#dialog-confirm strong").text().trim();
				console.log('Yes');
				$.ajax({
					type : "get",
					url : "setStore.htm",
					data : {siteNo:siteNo,siteName:siteName,salesOrg:salesOrg,roleId:roleId,disableKey:"disableKey",district:district},
					beforeSend : function() {
						startLoading();
					},
					success : function(response) {
						
						if(response!='false'){
							$( "#dialog-confirm ").dialog('close');
							$('.store .globalLinkLabel').text('Store: '+siteNo+' | '+siteName);
							window.location.href='../login/goingHome.htm?disableKey=disableKey';
							}
						else{
							$( "#dialog-pass-alert .alertText" ).text('Sorry some technical issue occured while updating store.');
							$( "#dialog-pass-alert .alertText" ).dialog('open').removeClass('visible-hide');
							stopLoading();
							}
						
					},
					error : function() {
						stopLoading();
						// goToLogin();
					},
				});
				
			});

			$( "#dialog-confirm #no" ).click(function(){
				if(isAdminRole($('#roleId').val())){
					$( "#dialog-VerifyITAdminStore").dialog('open').removeClass('visible-hide');
					$( "#dialog-VerifyITAdminStore").parent().find('.closePopUp').show();
					$( "#dialog-confirm").dialog('close');
					$('.verifyNm').focus();
				}else{
					$( "#dialog-selectStore").dialog('open').removeClass('visible-hide');
					//$( "#dialog-selectStore").parent().find('.closePopUp').show();
					$( "#dialog-confirm ").dialog('close');
				}
				//window.location.href='';
			});
			
					
		});
	function bindItem()
	{
		$('#dialog-selectStore .selectItem').click(function(){
			siteNo=$(this).parent().parent().parent().find('td :first').text().trim().split('(')[0].split('|')[0].trim();
			siteName=$(this).parent().parent().parent().find('td :first').text().trim().split('(')[0].split('|')[1].trim();
			salesOrg=$(this).parent().parent().parent().find('td :first').text().trim().split('(')[1].split(')')[0].trim().substr(0,4);
			salesNm=$(this).parent().parent().parent().find('td :first .salesNm').text().trim();
			roleId=$(this).attr('id');
			district=$(this).attr('data_district');
			$( "#dialog-confirm h4").html('You have selected <strong>'+ $(this).parent().parent().parent().find('td :first').text().trim().split('(')[0]+'</strong> ('+salesNm+')<br><br>Do you want to continue?');
			$( "#dialog-selectStore").dialog('close');
			$( "#dialog-confirm ").dialog('open').removeClass('visible-hide');
			
		});
		
		}
	function openVerifyPopup(){
		$( "#dialog-VerifyUser" ).dialog('open').removeClass('visible-hide');
		$( "#dialog-VerifyUser .errorDiv ").addClass('hideBlock');
		$( "#dialog-VerifyUser .errorDiv label").text('');
		$('.verifyNm').focus();
		}
	
	  /* $('.changePass').click(function(){
		$('.errorDiv label').text('');
		
		var newPassword=$('.newPass').val();
		var currPass=$('.currPass').val();
		var conNewPass=$('.conNewPass').val();
		var regex= /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;
		 
		if(currPass=="" || currPass==null)
			{
			$('.errorDiv label').text("Please enter Current Password");
			$('.currPass').val('').focus();
			}
		else if(newPassword=="" || newPassword==null)
			{
			$('.errorDiv label').text("Please enter New Password");
			$('.newPass').val('').focus();
			}
		else if(conNewPass=="" || conNewPass==null)
			{
			$('.errorDiv label').text("Please enter Confirm Password");
			$('.conNewPass').val('').focus();
			}
		else{
		$.ajax({
			type : "GET",
			url : "validateOldPwd.htm",
			
			//data : "oldPwd=" + currPass,
			data: {oldPwd: currPass, newPass: newPassword },
			success : function(response) {
				if(response.split('~')[0]=='true'){
				if(response.split('~')[1]=='false') 
					{
					$('.errorDiv label').text("New password cannot be same as the old password.");
					$('.newPass,.conNewPass').val('');
					$('.newPass').focus();
					}
				else if($('.newPass').val().length<5)
					{
					$('.errorDiv label').text("New password must contain atleast 5 character");
					$('.newPass,.conNewPass').val('');
					$('.newPass').focus();
					}
				else if($('.newPass').val()!=$('.conNewPass').val())
					{
					$('.errorDiv label').text("Passwords do not match, please re-enter");
					$('.newPass,.conNewPass').val('');
					$('.newPass').focus();
					}
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
								$('#dialog-passwordSuccess').dialog('open').removeClass('visible-hide');
								$('.updateSuccess').unbind('click');
								$('.updateSuccess').click(function(){
									selectStore();
								});
								
							}
							else{
								$('.errorDiv label').text("Password updation failed");
								$('.currPass,.newPass,.conNewPass').val('');
								$('.currPass').focus();
							}
						},
					});
					
				}
				
				}else{
					$('.errorDiv label').text("Current password is incorrect, please re-enter");
					$('.currPass,.newPass,.conNewPass').val('');
					$('.currPass').focus();
					
					}
			},
		});}
		
		});  */
 
	function selectStore(){
		var siteList=$('#siteList').val();
		if(siteList!=null && siteList!=undefined && siteList.trim()!=''){
		var val=$.parseJSON($('#siteList').val());
		if($('#siteList').val()!='' &&  val.data!=undefined  && val.data!=null && $('#loginFlag').val()=='Y' && $('#inStore').val()!='Y'){
			var content=' <tr><th>Store</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
			//var val=$.parseJSON($('#siteList').val());
			if(val.data.length>1)
				{
				$.each(val.data,function(i,item){
					content+='<tr><td>'+item.siteNo+' | '+item.siteName+' ('+item.salesOrg+'<p class="hideBlock salesNm">'+item.salesOrgNm+'</p>) '+'</td><td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem" data_district="'+item.district+'" id="'+item.roleId+'">Select</label></label></td></tr>';
					});
				$( "#dialog-selectStore .ContentTable" ).html('');
				$( "#dialog-selectStore .ContentTable" ).html(content);
				if($("#inStore").val() == "N"){
					$( "#dialog-selectStore .popupContent .tableInfo h4" ).text('Select a store to continue.');//Changed msg for UAT defect no 2120
				}else {
					$( "#dialog-selectStore .popupContent .tableInfo h4" ).text('You have access to multiple stores, so please select a store to continue.');
				}
				$( "#dialog-selectStore").dialog('open').removeClass('visible-hide');
				$( "#dialog-selectStore").parent().find(".closePopUp").addClass('hideBlock');
				
				}
			else if(val.data.length!=0 && $('#roleId').val()==StoreSupport){
				$("#dialog-VerifyITAdminStore").dialog("open");
				$("#dialog-VerifyITAdminStore").parent().find(".closePopUp").addClass('hideBlock');
				}
			/*else if(val.data.length!=1){
				openVerifyPopup();
				}
			
			  else if(val.data!=null && val.data.length==0){
				$( "#dialog-pass-alert .alertText" ).text('Sorry some technical issue occured while loading store.');
				$( "#dialog-pass-alert .alertText" ).dialog('open').removeClass('visible-hide');
				} */ 
			bindItem();
			}
		
		/*else if($('#loginFlag').val()=='Y'){
			openVerifyPopup();
			}*/
		}}
	
</script>