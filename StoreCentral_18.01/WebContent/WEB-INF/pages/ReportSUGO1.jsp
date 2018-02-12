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
<script type="text/javascript" src="../../scripts/reportSUGO1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>SUGO-1 Report</title>
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
						<li>Operations</li>
						<li class="currentPage">Reduced to Clear Label Report</li>
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
					<h3>
						Generate SUGO Review Report 
					</h3>
					<div>
						
						<form method="POST" action="" id="">
							<div class="formWrapper">
							
								<div class="parameter ">
									<label for="store" class="mandatory">Delivery Date</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="date1" placeholder="dd/mm/yy">
														
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix">
									<label for="department" class="mandatory">Department</label>
									
									<select class="selectOptions DGMSDepartmentOptions" id="deptSelectOptions">
										<option id="allDeptSelect">All Department</option>
									</select>
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix">
									<label class="mandatory" for="on">Order #</label>
									<input type="#" class="textbox smallbox" placeholder="Order number" id="on">
								</div> <!-- End of parameter -->
								
								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate Report</label>
									<label class="secondaryActionBtn" id="closeLink">Close</label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->	
				
				<!-- For displaying report results -->
				<div class="ContentTableWrapper hideBlock">
			
					<div class="tableInfo">
					
						<div class="articleHead">
							<div class="articleHeaderWrapper">
								<h2 class="articleTitle">Order 12345</h2>
								
								<p>
									<label class="articlePriceLabel">Delivery Date: <strong id="deliveryDateVal">23/09/2013</strong> </label>
									<label class="articlePriceLabel">|</label>
									<label class="articlePriceLabel">Review by Time: <strong id="revByTimeVal">05:00 pm</strong> </label>
									<label class="articlePriceLabel">|</label>
									<label class="articlePriceLabel">Roster Date: <strong id="roasterDateValue">dd/mm/yy</strong> </label>
									<label class="articlePriceLabel">|</label>
									<label class="articlePriceLabel">Supplier: <strong id="supplierValue">Sydeny RDC - Produce (1234)</strong> </label>
								</p>
							</div>
						
						</div><br/> <!-- End of artocle head ---->
					
						<div class="tableTitle">
							<h4>Total <strong id="noRecords">#</strong> articles </h4>
						</div> <!-- End of table title -->	
						
						<div id="reportContent"></div>
						
					</div> <!-- End of table info -->
				
				
				</div>  <!-- End of Content Table Wrapper-->	
			
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
			
		
	
	</div>	
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
	<div id="printDataForReport" class="hideBlock">
		<div id="printbodyForReport" class="printbody"></div>
	</div>
		<!-- History Popup-->	

</body>
</html>
