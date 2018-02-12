<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

	<title>Not Authorised</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>

	
	<script src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>	
	
</head>
<body>

	<div class="mainWrapper">
	
		<div class="headWrapper">
			<input id="navBarHighlight" type="hidden" value="admin"/>

	<%@include file="header.jsp" %>
		
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label> 
					<ul>
						<li><a id="homeLinkNoAccess">Home</a></li>						
						<li class="currentPage">No Access</li>					
					</ul>
				</div> <!-- End of breadcrumbs -->
				
				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data, please wait</label>
					<label class="secondaryActionBtn" id="backButtonNoAccessLink">Back</label>
				</div> <!-- End of status wrapper -->
				
			</div>	<!-- End of breadcrumb wrapper -->
			
			
			
			
			
		
		
		</div> <!-- End of head wrapper -->
		
		
	<div class="contentWrapper">
	<div class="errorDiv" style="
    font-size: 17px;
    text-align: center;" >
		<label>You are not authorised to view this page.</label>
	</div>
	</div>	
	</div>	<!-- End of main wrapper -->
			
	<div class="footerWrapper">
		<div class="footer">
			<div class="copyrightsInfo">
				Copyright &copy Woolworths 2013
			</div>
			<div class="policyInfo">
				<a href="#">Privacy Policy</a>
				<label class="divider">|</label>
				<a href="#">Terms of Use</a>
			</div>
		</div>
		
	</div>
	
	

</body>
</html>