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
<script type="text/javascript" src="../../scripts/pilotStrategy.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<title>Pilot Strategy</title>
</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">
			
<input id="navBarHighlight" type="hidden" value="admin"/>

	<%@include file="header.jsp" %>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li>Admin</li>
						<li class="currentPage">Pilot Strategy</li>
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
						Replicate Application Access to Pilot Store 
					</h3>
					<div>
						<form method="POST" action="" id="">
							<div class="formWrapper">
							
								<div class="parameter clearfix">
									<label for="override">Copy From</label>
									<span class="reportRadio">
										<input type="text" name="copyFrom"  id="copyFrom" class="textbox"/>										
									</span>
								</div>
								<div class="parameter clearfix">
									<label for="override">Copy To</label>
									<span class="reportRadio">
										<input type="text" name="copyTo"  id="copyTo" class="textbox"/>										
									</span>
								</div>
								<div class="parameter clearfix">
									<label for="override">Access Type</label>
									<span class="reportRadio">
										<input type="checkbox" name="accessType"  id="accessTypeInclude" ><label for="accessTypeInclude" class="labelText">Include</label>
										<input type="checkbox" name="accessType"  id="accessTypeEcclude" ><label for="accessTypeEcclude" class="labelText">Exclude</label>										
									</span>
								</div> 
								
								<div class="formActions">
								    <label class="actionBtn hideBlock" id="checkpoint"><a href="#">Checkpoint</a></label>
									<label class="actionBtn" id="backupTable"><a href="#">Backup Settings</a></label>
									<label class="actionBtn" id="generateReport"><a href="#">Review Access</a></label>								
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> 
																					
							</div> <!-- End of form wrapper -->
						</form>	
						
					</div> 							
				</div> <!-- End of ui-accordion -->
				<div id="noRecFoundDiv" class="hideBlock"></br><p>Sorry, No records found.</p></div>
				<!-- For displaying report results -->
				<div class="ContentTableWrapper hideBlock" id="searchResultsHold">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4>Total <strong id="noRecords">#</strong> records found </h4>
						</div> <!-- End of table title -->	
						
						<div id="reportDeviceLogContent"></div>
						
					</div> <!-- End of table info -->
				
				
				</div>  <!-- End of Content Table Wrapper-->
				<div class="pageActions">
						<label class="actionBtn"><label class="thumbUp" id="multipleStore">Multi-store Replicate</label></label><label class="actionBtn"><label class="thumbUp" id="export">Export SQL</label></label><label class="actionBtn"><label class="thumbUp" id="replicate">Replicate</label></label>
				</div>
		
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
	<!-- All Edit functions -->
<div id="dialog-editFunctions" title="Add or Edit">
	<div class="popupContent">
		<div class="popupData">
			<h4 class="alertText">Select what you want to add</h4>
			<div class="ContentTableWrapper">
				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label
							class="addRow">Add Store</label></label>
					</div>
					<!-- End of lookup action wrapper -->
				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form method="POST" action="" id="articleForm">
						<div class="formWrapper">

							<div class="parameter">
								<label for="store" class="">Store</label> <input type="text"
									placeholder="Enter store no." class="textbox verifyNm"  /> <label
									class="linkBtn"><label
									class="advancedSearch verifyStore">Verify &amp; Add</label></label>
							</div>
							<!-- End of parameter -->
							<div class="errorDiv parameter hideBlock">
								<label>Invalid Store no.</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
					</form>


				</div>
				<!-- End of table Actions Wrapper -->

				<table class="ContentTable" cellspacing="0">
				<thead>
					<tr>
						<th class="">Store</th>

						<th class="centerValue" width="45px">Actions</th>
					</tr>
					</thead>
					<tbody>
					</tbody>
					<!-- <tr id="rowExpiry-1">
						<td>1111 - Bella Vista</td>
						<td class="centerValue"><label class="linkBtn"
							id="DeleteExpiryRecord-1"> <label class="deleteRecord">Delete</label>
						</label></td>
					</tr> -->
				</table>
			</div>
			<!-- End of ContentTableWrapper -->


		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"
				id="exportmultistoreButton"><a ><label
						class="thumbUp addstore-popup-export-btn">Export SQL</label></a></label><label class="actionBtn"
				id="createOrderButton"><a ><label
						class="thumbUp addstore-popup-save-btn">Replicate</label></a></label> <label class="secondaryActionBtn addstore-popup-cancel-btn"><a
					>Cancel</a></label>
			</span>
		</div>
		<!-- End of popup actions-->
	</div>
	<!-- End of popupContent -->
</div>
<!-- End of popup -->
	<%@include file="footer.jsp" %>
	<div id="printDataForDeviceLog" class="hideBlock">
		<div id="printbodyForDeviceLog" class="printbody"></div>
	</div>
		<!-- History Popup-->	

</body>
</html>
