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
<script type="text/javascript" src="../../scripts/reportOverstock.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../script/jquery.filtertable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>


<title>Overstock Report</title>
</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">
			
<input id="navBarHighlight" type="hidden" value="reports"/>
<input id="salesorgName" type="hidden" value="${user.imgLocation}"/>

	<%@include file="header.jsp" %>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li>Reports</li>
						<li>Stock Management</li>
						<li class="currentPage">Overstock Investigation Report</li>
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
						Generate Overstock Investigation Report 
					</h3>
					<div>
						
						<form method="POST" action="" id="overstockReportForm">
							<div class="formWrapper alignParameter ">
								
								<div class="parameter clearfix wdtypeRadio">
									<label for="override">Type</label>
									<span class="reportRadio" id="typeRadio">
										<input type="radio" name="overrideOptions" value="W" id="all" checked><label for="all" class="labelText">Weekly (Summary)</label>
										<input type="radio" name="overrideOptions" value="D" id="standard" ><label for="standard" class="labelText">Daily (Detailed)</label>										
									</span>
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix datePicker">
									<label for="store" class="">Date</label>
									<span class="reportRadio" id="dateRadio">
										<input type="radio" name="dateOptions" value="CW" id="currentWeekRadio" checked><label for="currentWeekRadio" class="labelText">Current Week</label>
										<input type="radio" name="dateOptions" value="LW" id="lastWeekRadio" ><label for="lastWeekRadio" class="labelText">Last Week</label>										
									</span>							
									
								</div> 
								<div class="parameter clearfix dateDropDwn hideBlock">
									<label for="date">Date</label>									
									<select class="selectOptions" id="dateSelectOptions" style="width: 22%;"></select>	
								</div><!-- End of parameter -->
								
								
								
								
								
								
								
								
									
								
								<div class="parameter clearfix articleHierarchy">
									<label for="dept">Departments</label>
									<div id="pds" class="selectDropdown"><label id="ds" class="selectLabel"><a href="#" id="deptDropDwnLabel">Select Departments</a></label>
										<ul class="dropdown" id="depDropDwnList">
											<div class="inner-drop-down" id="hierDrp"><li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li></div>
											
										</ul>
									</div>	
								
									
								</div> <!-- End of parameter -->
								
								
							
									
								
								

								
							
								
								<div class="formActions">
									<label class="actionBtn" id="generateReport"><a href="#">Generate Report</a></label>
								
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
			
		
				<div id="reportContent" class="hideBlock1">
				
					
					<div class="ContentTableWrapper hideBlock " id="weeklyRptDiv">
					
						<div class="tableInfo">
						
							<div class="tableTitle">
								<h4 class="">Overstocks report for <strong id="weeklyRpLbl">dd/mm/yy - dd/mm/yy </strong> </h4>
							</div> <!-- End of table title -->			

							<div class="tableActionBtns">							
								<label class="actionBtn"><a href="#"><label class="print" id="printReportWeekly">Print</label></a></label>					
							</div> <!-- End of table action buttons -->
							
						</div> <!-- End of table info -->
						
						
						<div id="reportContentWeekly"></div><!-- To display the contents of Weekly report -->	
						
						
						
						
					</div>  <!-- End of content table wrapper -->	
					
					<div id="noRecFoundDiv" class="hideBlock"></br><p>Sorry, No records found.</p></div>
					<div class="ContentTableWrapper hideBlock " id="dailyRptDiv">
					
						<div class="tableInfo">
						
							<div class="tableTitle">
								<h4 class="">Overstocks report for <strong id="dailyRpLbl">dd/mm/yy</strong> </h4>
							</div> <!-- End of table title -->			

							<div class="tableActionBtns">							
								<label class="actionBtn"><a href="#"><label class="print" id="printReportDaily">Print</label></a></label>					
							</div> <!-- End of table action buttons -->
							
						</div> <!-- End of table info -->
						
						
						
						<div id="reportContentDaily"></div><!-- To display the contents of daily report -->						
						
					</div>  <!-- End of content table wrapper -->	
					
				</div> <!-- end of report info -->
				
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
		</div><div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="reportErrorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title" id="header">Errors</h4>
				<a class="close" title="Close"
					onclick="$('#reportErrorWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="titleContent">Additional criteria</p>
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

</body>
</html>
