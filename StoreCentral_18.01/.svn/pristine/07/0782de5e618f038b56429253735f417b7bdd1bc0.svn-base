<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/articleDtls.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportDeviceLog.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<title>Device Log Report</title>
</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">
			
<input id="navBarHighlight" type="hidden" value="reports"/>

	<%@include file="header.jsp" %>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li>Reports</li>
						<li>Admin</li>
						<li class="currentPage">Device Log Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper" >
					<label class="loading hideBlock" id="statusImg">We are getting data,
						please wait</label> <label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>

				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
	
	
	
		<div class="contentWrapper reportWrapper">
			
			<div class="articleAdditionalInfo">
				
				<div id="accordion">
					
					<h3 class="mainAccordion">
						Generate Device Log Report 
					</h3>
					<div>
						<form method="POST" action="" id="">
							<div class="formWrapper">
							
								<div class="parameter clearfix">
									<label for="override">Device Type</label>
									<span class="reportRadio">
										<input type="checkbox" name="overrideOptions"  id="rfGunCheckBox" ><label for="rfGunCheckBox" class="labelText">RF Gun</label>
										<input type="checkbox" name="overrideOptions"  id="mobileCheckBox" ><label for="mobileCheckBox" class="labelText">Mobile</label>										
									</span>
								</div> 
								
								<div class="formActions">
									
									<label class="actionBtn" id="generateReport"><a href="#">Generate Report</a></label>								
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> 
																					
							</div> <!-- End of form wrapper -->
						</form>	
						
					</div> 							
				</div> <!-- End of ui-accordion -->
				<div id="noRecFoundDiv" class="hideBlock"></br><p>Sorry, No records found.</p></div>
				<!-- For displaying report results -->
				
				<div class="ContentTableWrapper hideBlock">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4>Total <strong id="noRecords">#</strong> records found </h4>
						</div> <!-- End of table title -->	
						
						<div id="reportDeviceLogContent"></div>
						
					</div> <!-- End of table info -->
				
				
				</div>  <!-- End of Content Table Wrapper-->
		
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->
	
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="reportErrorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title" id="header">Errors</h4>
				<a class="close" title="Close"
					onclick="$('#reportErrorWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="titleContent">Creation failed for few
					supplier.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ul id="errorContent">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
		</div>

	<%@include file="footer.jsp" %>
	<div id="printDataForDeviceLog" class="hideBlock">
		<div id="printbodyForDeviceLog" class="printbody"></div>
	</div>
		<!-- History Popup-->	

</body>
</html>
