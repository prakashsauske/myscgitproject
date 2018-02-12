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
<link href="../../styles/reportPrintStyle.css?version=${properties.version}" rel="stylesheet" type="text/css" />
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
<script type="text/javascript" src="../../scripts/reportDailyStock.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>Daily Stock Check</title>

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
						<li>Stock Management</li>
						<li class="currentPage">Daily Stock Check</li>
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
						Generate a Daily Stock Check Report
					</h3>
					<div>
						
						<form method="POST" action="" id="dailyStockCheckReportForm">
							<div class="formWrapper">
							
							
															
								<div class="hierarchyWrapper clearfix hideBlock1 " id="articleHierarchy">
															
										<!-- Department -->
										<div class="hierarchyContent lastContent" id="deptDiv">				
											
											<div class="hierarchyTitle">
												<h3>Select Department</h3>
											</div> <!-- End of hierarchy Title -->
											
											<div class="hierarchyList">
												<ul id="deptlst">

												</ul>
											</div> <!-- End of hierarchy Title -->
											
										</div> <!-- End of hierarchy Content --> 
										
									
								</div> <!-- end of hierarchy Wrapper -->
							
								
								
								
								<div class="formActions">
									<label class="actionBtn" id="generateDSCReport"><a href="#">Generate Report</a></label>
									<label class="actionBtn" id="printDSC"><a href="#">Print</a></label>
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
			
				<div class="hideBlock reportContent">
				
									
						<div class="ContentTableWrapper">
							
							<div class="tableInfo">
				
								<div class="tableTitle">
									<h4><strong>List of articles to check (<strong id="noRecords">#</strong>)</strong></h4>
								</div> <!-- End of table title -->					
								
								<div class="tableActionBtns">							
									<label class="actionBtn" id="printReportDSC"><label class="print">Print</label></label>					
								</div>
							
							</div> <!-- End of table info -->
								
			
							<div id="reportDSCContent"></div>
							
							
							
								
								
					</div> <!-- End of content table wrapper -->
						
				
				</div> <!-- end of report info -->
				
				
				
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->		


	<%@include file="footer.jsp" %>
	<div id="printDataForDSCReport" class="hideBlock">
		<div id="printbodyForDSCReport" class="printbody"></div>
	</div>
	<div id="dialog-modal-alertBox" title="Report Generated">
	<div class="popupContent">

		<div class="popupData">


			<h4 class="alertText" id="alertBox"></h4>



			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					onmousedown="printConfirmed();"
					id="okBtn">OK</label>
					<label class="actionBtn hideBlock yesBtn"
					id="okBtn">Yes</label>
					<label class="actionBtn hideBlock noBtn"
					id="okBtn">No</label>
				</span>
			</div>
			<!-- End of popup actions-->



		</div>
	</div>
	<!-- End of popupContent -->
	</div>
		<!-- History Popup-->	

</body>
</html>
