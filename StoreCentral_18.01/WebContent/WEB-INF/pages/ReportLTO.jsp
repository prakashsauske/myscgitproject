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
<script type="text/javascript" src="../../scripts/reportLTO.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../script/jquery.filtertable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>


<title>LTO Report</title>
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
						<li class="currentPage">LTO Report</li>
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
						Generate LTO Report 
					</h3>
					<div>
						
						<!-- <form  action="" id=""> -->
							<div class="formWrapper">
							
								<div class="parameter">
									<label for="override"  class="mandatory">Report Type</label>
									<span class="reportRadio">
										<input type="radio" name="overrideOptions" value="LTOcount" id="all" checked><label for="all" class="labelText">LTO Count</label>
										<input type="radio" name="overrideOptions" value="LTOaudit" id="standard"><label for="standard" class="labelText">LTO Audit</label>
										<input type="radio" name="overrideOptions" value="LTOlogs" id="override"><label for="override" class="labelText">LTO Logs</label> 
									</span>
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix">
									<label for="date" class="">Date</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="from" placeholder="dd/mm/yyyy">
									to
									<input type="#" class="textbox defaultTextbox inputDate" id="to" placeholder="dd/mm/yyyy">									
								</div> <!-- End of parameter -->
								
								
								<div class="parameter parameterRow clearfix">
									<div class="parameterOptions clearfix">
									<label class="" for="searchBox">Article</label>	
									<span>						
										<input type="#" id="searchBaiscBox" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter">
										<ul class="parameterOptionsListBlock" id="searchBaiscBoxList" style="padding-left: 120px"></ul>
									</span>
									</div>
								</div>	
								
								<div class="parameter clearfix" id="groupById">
									<label>Group by</label>
									<span>
										<input type="checkbox" name="invoice" value="invoice" id="invoice" checked><label for="invoice" class="labelText paramCheckBox">Department</label>										
									</span>
								
								</div>
								
								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate Report</label>
									<label class="secondaryActionBtn" id="closeLink">Close</label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						<!-- </form> -->	
						
					</div> <!-- End of div for jQuery handling -->					
						
				</div> <!-- End of ui-accordion -->
				
				<!-- For displaying report results -->
				<div class="ContentTableWrapper hideBlock reportContent" id="LTOcount">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4>LTO Count report for '<strong class="dateText">dd/mm/yy - dd/mm/yy</strong>'</h4>
						</div> <!-- End of table title -->	
						
					</div> <!-- End of table info -->
					
					<div id="reportContentCount"></div>		
								
				</div>  <!-- End of Content Table Wrapper-->
				
				<div class="ContentTableWrapper hideBlock reportContent" id="LTOaudit">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4>LTO Audit report for '<strong class="dateText">dd/mm/yy - dd/mm/yy</strong>'</h4>
						</div> <!-- End of table title -->	
						
					</div> <!-- End of table info -->
					
					<div id="reportContentAudit"></div>		
					
					
				</div>  <!-- End of Content Table Wrapper-->	
				
				<!-- For displaying report results -->
				<div class="ContentTableWrapper hideBlock reportContent" id="LTOlogs">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4>LTO Logs report for '<strong class="dateText">dd/mm/yy - dd/mm/yy</strong>'</h4>
						</div> <!-- End of table title -->		
						
					</div> <!-- End of table info -->
					
					<div id="reportContentLogs"></div>		
				
				</div>  <!-- End of Content Table Wrapper-->			
				
			
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div> <!-- End of main wrapper -->
		
		
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
	

</body>
</html>
