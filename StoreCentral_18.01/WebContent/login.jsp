<!DOCTYPE html>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<link href="styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="styles/common_new.css?vertion=${properties.version}" rel="stylesheet" type="text/css" />
<link href="styles/<%=(null==request.getAttribute("img")?"woolworths":request.getAttribute("img"))%>.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="styles/login.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="scripts/pwdManagement.js?vertion=${properties.version}"></script>
<script src="scripts/jWizardLogin.js?vertion=${properties.version}"></script>
<!-- Defect_12074 -->
<script src="scripts/moment.js?vertion=${properties.version}"></script>
<script src="scripts/moment-timezone.min.js?vertion=${properties.version}"></script>
<script src="scripts/moment-timezone-with-data.js?vertion=${properties.version}"></script>
<script src="scripts/login.js?vertion=${properties.version}"></script>


<title>Login to Store Central</title>


<script type="text/javascript">
$(document).ready(function() {
	
	$('#salesOrgFromURL').val($('.mainWrapper').attr('class').split(' ')[1]);
$(document).keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();	

        if($('#dialog-forgotWizard').dialog('isOpen')){
            if($('#finish').is(':visible')){
            	$('#finish').trigger('click');
                }else if($('#next').is(':visible')){
                	$('#next').trigger('click');
                    }
        }else        
        if($('#dialog-VerifyStore').dialog('isOpen')){
        $('.verify').click();
        }else if($( "#dialog-confirm").dialog('isOpen')){
        	$( "#dialog-confirm #yes").click();
        }else{
        validate();
        }
        }
});
});
$(function() {
    $(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});
function changeDivSize()
		{
			//x=document.getElementById("pageHeightID");
			//x.style.padding = ((window.innerHeight - 512)/2) + "px 0 "+((window.innerHeight - 270)/2)+"px 0";
		}

		function loginLoad() {
			document.forms[0].autocomplete="off";
			localStorage.clear();
			setTimeout(function(){
				$('.usernameInput').focus();
			if($('#error').val()=="Please enter username")
			{
				$('#username').focus();
				$("#errorDiv").removeClass("errorDiv hideBlock");
				$("#errorDiv").addClass("errorDiv");

				
				}
			
			if($('#error').val()=="Please enter username & password")
			{
				$('#username').focus();
				$("#errorDiv").removeClass("errorDiv hideBlock");
				$("#errorDiv").addClass("errorDiv");
				}
			if($('#error').val()=="Please enter password")
			{
				$('#password').focus();
				$("#errorDiv").removeClass("errorDiv hideBlock");
				$("#errorDiv").addClass("errorDiv");
				}

			if($('#error').val()=="Sorry, not authorized to access Store Central")
			{
				
				$("#errorDiv").removeClass("errorDiv hideBlock");
				$("#errorDiv").addClass("errorDiv");
				}

			if($('#error').val()=="Unable to login,please try after some time")
			{
				
				$("#errorDiv").removeClass("errorDiv hideBlock");
				$("#errorDiv").addClass("errorDiv");
				}
			
		if($('#error').val()=="Username and/or password is incorrect")
		{
			$('.login-error').html('');
			$("#errorDiv").removeClass("errorDiv hideBlock");
			$("#errorDiv").addClass("errorDiv");
			$('#overlay-back,#confirm-popup').fadeIn(500);
			
			}
		if($('#error').val().trim()!=''){
			$("#errorDiv").removeClass("errorDiv hideBlock");
			$("#errorDiv").addClass("errorDiv");
			}
			},500);
			
		}

		function validate()
		{
			if(!isNaN(parseInt(document.URL.split('/')[(document.URL.split('/').length)-1])))
			$('#salesOrgFromURL').val(parseInt(document.URL.split('/')[(document.URL.split('/').length)-1]));
			$('#loginForm').submit();
		}
	</script>


</head>
<body onload="changeDivSize();loginLoad();">
<!-- HostName :  <%=java.net.InetAddress.getLocalHost().getHostName()%> -->
	<form:form method="post" id="loginForm" action="home.htm">

		<div
			class="mainWrapper <%= (null==request.getAttribute("img")?"woolworths":request.getAttribute("img"))%>">
			<div class="loginWrapper" id="pageHeightID">
				<div id="pageHeightID"></div>
				<%if(request.getAttribute("img")!=null) {%>
				<div class="loginHeader <%=request.getAttribute("img")%>">&nbsp;</div>
				<%-- <img src="<%=request.getAttribute("img")%>" alt="logo" style="height: 60px; width: auto;"/> --%>
				<%}else{ %>
				<div class="loginHeader">&nbsp;</div>
				<!-- <img src="images/logo1.png" alt="logo" style="height: 60px; width: auto;"/> -->
				<%} %>
				<div class="signinBox">
					<h2 class="signinTitle woolworthsTitle">Login to Woolworths
						Store Central</h2>
					<h2 class="signinTitle petrolTitle">Login to Woolworths Petrol
						Store Central</h2>
					<h2 class="signinTitle countdownTitle">Login to Countdown
						Store Central</h2>
					<h2 class="signinTitle bwsTitle">Login to BWS Store Central</h2>
					<h2 class="signinTitle bigwTitle">
						Login to BIG<strong>W</strong> Store Central
					</h2>
					<h2 class="signinTitle danmurphyTitle">Login to Dan Murphy's
						Store Central</h2>
					<h2 class="signinTitle thomasduxTitle">Login to Thomas Dux
						Store Central</h2>

					<input type="hidden" name="verify" id="verify" value='${verify}'>
					<input type="hidden" name="error" id="error" value='${validity}'>
					<input type="hidden" name="timeZoneOffSet" id="timeZoneOffSet" >
					<input type="hidden" name="salesOrgFromURL" id="salesOrgFromURL"
						value="">
					<div class="errorDiv hideBlock" id="errorDiv">
						<label>${validity}</label>
					</div>
					<div class="userDiv">
						<label for="Username"><strong class="usernameLabel">Username</strong></label>
						<input type="#"
							value="<%=request.getAttribute("userName")!=null? request.getAttribute("userName") : ""  %>"
							class="usernameInput" name="username" spellcheck="false"
							maxlength="20">
					</div>
					<div class="passwdDiv">
						<label for="Passwd"><strong class="passwdLabel">Password</strong></label>
						<input type="password" class="passwdInput" name="password"
							maxlength="20">
					</div>
					<input type="button" onclick="validate();" value="Login"
						id="signIn" name="signIn" class="loginButton">
					<label onclick="$('#dialog-forgotWizard').dialog('open').removeClass('visible-hide');" class="forgotPassword"><a
						href="#">Forgot your password?</a></label> 
					<div class="login-error" style="display: none">${validity}</div>
				</div>


			</div>

			<div class="footerWrapper">
				<div class="footer">
					<div class="copyrightsInfo woolworthsTitle">Copyright &copy
						Woolworths 2013</div>
					<div class="copyrightsInfo petrolTitle">Copyright &copy
						Woolworths Petrol 2013</div>
					<div class="copyrightsInfo countdownTitle">Copyright &copy
						Countdown 2013</div>
					<div class="copyrightsInfo bwsTitle">Copyright &copy BWS 2013</div>
					<div class="copyrightsInfo bigwTitle">
						Copyright &copy BIG<strong>W</strong> 2013
					</div>
					<div class="copyrightsInfo danmurphyTitle">Copyright &copy
						Dan Murphy's 2013</div>
					<div class="copyrightsInfo thomasduxTitle">Copyright &copy
						Thomas Dux 2013</div>

					<div class="policyInfo">
						<a href="#">Privacy Policy</a> <label class="divider">|</label> <a
							href="#">Terms of Use</a>
					</div>
				</div>

			</div>
		</div>
		
	</form:form>
	<%@include file="WEB-INF/pages/forgotPassPopups.jsp"%>
	<%@include file="WEB-INF/pages/verifyStore.jsp"%>
	<div class="overlay d hideBlock" id="statusImg">
	<div class="loaderImage new-loader">
		<div>Please wait, your request is being processed ...</div>
	</div>
</div>
</body>
</html>