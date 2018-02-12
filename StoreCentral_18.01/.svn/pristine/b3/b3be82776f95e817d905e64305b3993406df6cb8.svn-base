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
<script type="text/javascript" src="../../scripts/reportGapScan.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../script/jquery.filtertable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>


<title>Gap Scan Report</title>
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
						<li class="currentPage">Gap Scan Report</li>
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
						Generate Gap Scan Report 
					</h3>
					<div>
						<form method="POST" action="" id="GapScanReportPdf"></form>
						<form method="POST" action="" id="">
							<div class="formWrapper alignParameter ">
								
								<div class="parameter clearfix">
									<label for="override">Reason Type</label>
									<span class="reportRadio" id="reasonTypeRadio">
										<input type="radio" name="reportTypeOptions" value="actionReq" id="actionReq" checked><label for="actionReq" class="labelText">Action Required</label>
										<input type="radio" name="reportTypeOptions" value="revOnly" id="revOnly" ><label for="revOnly" class="labelText">Review Only</label>
										<input type="radio" name="reportTypeOptions" value="both" id="both"><label for="both" class="labelText">Both</label> 
									</span>
								</div> <!-- End of parameter -->
								
								
								<div class="parameter ">
									<label for="dept">Departments</label>
									<div id="pds" class="selectDropdown"><label id="ds" class="selectLabel"><a  id="deptDropDwnLabel">All Departments</a></label>
										<ul class="dropdown depdropdown" id="depDropDwnList" style="overflow: visible; z-index: 200">
											<div class="inner-drop-down" id="hierDrp"><li><input type="checkbox"  id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li></div>
										</ul>
									</div>									
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix">
									<label for="store" class="">Date &  Time</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="dateFrom" value="28/03/2014">
									<span class="reportRadio" id="timeRadio">
										<input type="radio" name="timeOptions" value="AM" id="am" checked><label for="am" class="labelText">AM</label>
										<input type="radio" name="timeOptions" value="PM" id="pm" ><label for="pm" class="labelText">PM</label>
										<input type="radio" name="timeOptions" value="AM/PM" id="ampm"><label for="ampm" class="labelText">Both</label> 
									</span>
									
								</div> <!-- End of parameter -->
								
								
								<div class="parameter">
									<label for="article">Employees</label>
									<div id="pus" class="selectDropdown"><label id="us" class="selectLabel"><a  id="empDropDwnLabel">All employees</a></label>
										<ul class="dropdown empdropdown" id="empChkBox" style="overflow: visible; z-index: 200">
											<div class="inner-drop-down" id="hierDrp"><li><input type="checkbox"  id="allEmpchkBox" name="allEmpchkBox"><label class="dropdownLabel" for="allEmpchkBox">All employees</label></li></div>
											
										</ul>
									</div>	
									
																				
								</div> <!-- End of parameter -->
								
								
								
								<div class="formActions">
									<label class="actionBtn" id="generateReport"><a >Generate Report</a></label>
									<label class="secondaryActionBtn" id="closeLink"><a >Close</a></label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
						
					
					<div class="ContentTableWrapper">
						
						<div id="mainTabs" class="hideBlock">
							<div class="tableInfo">	
								<div class="tableTitle">
								<!-- 	<h4 class="" style="padding-top:15px">Gap Scan report for <strong id="dateTimeLbl">dd/mm/yy, AM / PM </strong> </h4> -->
								</div> <!-- End of table title -->
								<div class="tableActionBtns" id="printReportDiv" style="padding-top:5px">							
								<label id="printReport"  class="actionBtn"><label class="print"><a target="_blank">Print</a></label></label>					
							</div>	
							</div> <!-- End of table info -->
							
							
							
							
							<ul>
								<li><a id="actionReqLink" href="#mainTabs-1">Action Required</a></li>
								<li><a id="revOnlyLink" href="#mainTabs-2">Review Only</a></li>
							</ul>
							
							<div id="mainTabs-1" class="hideBlock">
								<div class="tableActionsBtnsWrapper" id="actionReqLbl">
									<div class="lookupActionWrapper">
										<label class="linkBtn"><strong>Action Required</strong> </label>
									</div> <!-- End of lookup action wrapper -->
								</div> <!-- End of table actions btn wrapper -->
								<div id="reportContent1"></div>									
								
							</div> <!-- end of main tabs 1 -->
							
							<div id="mainTabs-2" class="hideBlock">
								<div class="tableActionsBtnsWrapper" id="reviewOnlyLbl">
									<div class="lookupActionWrapper">
										<label class="linkBtn"><strong>Review Only</strong></label>
									</div> <!-- End of lookup action wrapper -->
								</div> <!-- End of table actions btn wrapper -->

								<div id="reportContent2"></div>							
								
									
							</div> <!-- end of main tabs 2 -->
							
						</div> <!-- End of main tabs -->						
						
					</div>  <!-- End of content table wrapper -->	
					
				
				</div> <!-- end of report info -->
				
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->		
	
	<%@include file="footer.jsp" %>
	<div id="printDataForReport" class="hideBlock">
		<div id="printbodyForReport" class="printbody"></div>
	</div>
		<!-- History Popup-->
	
	<div id="newParameter">
			<div class="parameterOptionsInputBox articleList hideBlock" >
				<div class="parameterOptions clearfix">
				
					<span class="multipleOptions">
				<select class="selectOptions filter">								
					<option>Select filter</option>											
					<option value="soh">SOH</option>
					<option value="daysSoh">Days SOH</option>
					<option value="mpl">MPL</option>
					<option value="sc">Shelf Capacity</option>
					<option value="facings">Facings</option>						
				</select>		
			</span>
			<span class="multipleOptions">
				<select class="selectOptions criteria">								
					<option title="Less than" value="LT">Less than</option>	
					<option title="Greater than" value="GT">Greater than</option>											
					<option title="Equal to" value="ET">Equal to</option>															
				</select>	
			</span>
			<span class="multipleOptions">
				<input type="#" class="textbox numberBox valueCrit">
			</span>
					<label id="addActionBtn" class="linkBtn addActionBtn">
					  <a ><label class="addRow">Add more</label></a>
					 </label>
				
				</div> <!-- End of parameter -->
			</div> <!-- End of parameter -->
		</div>

</body>
</html>
