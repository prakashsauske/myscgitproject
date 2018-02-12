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
<!-- <script src="../../scripts/articleDtls.js?version=${properties.version}"></script>-->
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportRTC.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportHierachy.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>RTC Report</title>
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
					
					<h3 class="mainAccordion">
						Generate Reduced to Clear Label Report 
					</h3>
					<div>
						
						<form method="POST" action="" id="rtcReportForm">
							<div class="formWrapper">
								
								<div class="parameter clearfix">
									<label for="store">Date</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="dateFrom" placeholder="dd/mm/yy">									
									to
									<input type="#" class="textbox defaultTextbox inputDate" id="dateTo" placeholder="dd/mm/yy">
																	
								</div> <!-- End of parameter -->
								
								
								<div class="parameter parameterRow parameterOptions clearfix">
									<label for="LocOp">Choose</label>
										<span class="parameterOptionsRadio">
											<input type="radio" name="pos" value="single" id="single" checked><label for="single" class="labelText">Specific Article</label>
											<input type="radio" name="pos" value="multiple" id="multiple"><label for="multiple" class="labelText">Departments</label>
										</span>
								</div> <!-- End of parameter -->		
											
							
								<div class="parameterOptionsInputBox hideBlock1 articleList" id="">
									<div class="parameterOptions clearfix">
											<span>
												<input type="#" id="searchBaiscBox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" class="textbox textboxDefaultText searchbox">
												<ul class="parameterOptionsListBlock" id="searchBaiscBoxList"></ul>
											</span>	
									</div> <!-- End of parameter -->
								</div> <!-- End of parameter -->
									 
								
								
								<div class="parameter clearfix articleHierarchy hideBlock">
									<label for="department">&nbsp;</label>
									
								
									<div id="pds" class="selectDropdown"><label id="ds" class="selectLabel"><a href="#">Select departments</a></label>
										<ul class="dropdown" id="depDropDwnList">
											<li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li>
											
										</ul>
									</div>	
								
									<div class="searchByOptions onlyCheckbox">
										<input type="checkbox" name="depH" value="depH" id="depH"><label for="depH" class="labelText">Select multiple departments or sub-categories</label>
									</div> <!-- End of search options -->
																		
								</div> <!-- End of parameter -->
								
																							
												<div class="hierarchyWrapper clearfix hideBlock " id="articleHierarchy">
																		
													<!-- Department -->
													<div class="hierarchyContent" id="deptDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="deptSelectAll">Department</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul id="deptlst">
							
															</ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong id="deptLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Category -->
													<div class="hierarchyContent" id="catDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="catSelectAll">Category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="noSelectionCat">
																<label>Please select any department to see it's associated categories.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															<div id="parentCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="categoryLstTotal" class="totalCount hideBlock">
																<label>Total Selected:<strong id="catLstCnt">0</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
													<!-- Sub-category -->
													<div class="hierarchyContent" id="subCatDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="sCatSelectAll">Sub-category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="noSelectionSub">
																<label>Please select any category to see sub-categories.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div id="parentSCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="subCatTotal" class="totalCount hideBlock">
																<label>Total Selected:<strong id="sCatLstCnt">0</strong></label>
															</span>			
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Segment -->
													<div class="hierarchyContent lastContent" id="segDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="segSelectAll">Segment</h3>
														</div> <!-- End of hierarchy Title -->								
														
														<div class="hierarchyList">
															
															<div class="noSelection" id="noSelectionSeg">
																<label>Please select any sub-category to see segments.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
														
															<div id="parentSegDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="segmentTotal"  class="totalCount hideBlock">
																<label>Total Selected:<strong id="segLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 

												
											</div> <!-- end of hierarchy Wrapper -->
								
								<div class="formActions">
									
									<label class="actionBtn" id="generateReport"><a href="#">Generate Report</a></label>								
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of form wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
				<div id="noRecFoundDiv" class="hideBlock"></br><p>Sorry, No records found.</p></div>
				<!-- For displaying report results -->
				<div class="ContentTableWrapper hideBlock clearfix" id="main-content">
			
					<div class="tableInfo">					
						<div class="tableTitle">
							<h4>Total <strong id="noRecords"></strong> articles found </h4>
						</div> <!-- End of table title -->					
						
						<div class="tableActionBtns">							
							<label class="actionBtn" id="printReport" ><a href="#"><label class="print">Print</label></a></label>										
						</div>
					</div> <!-- End of table info -->
				   
				<div id="reportContent"></div>					
				</div>  <!-- End of Content Table Wrapper-->
				
				
				<div id="oldDataDiv" class="ContentTableWrapper clearfix hideBlock">
					<div class="tableInfo">
					
						<div class="tableTitle warningMessage">
							<h4 class="warning">You are trying to access very old data! Select one of the pdf to view it.  </h4>
						</div> <!-- End of table title -->					
						
							
						<table cellspacing="0" class="ContentTable" id="">
							
							<thead> 
							<tr class="">					
								<th>Filename</th>
							</tr>	
							</thead> 
							<tbody>
							<tr class="oldDates">
								<td class=" lastColumn">
									<ul><label class="linkBtn olderDates">
										<li><a href="#"><label class="newWindowAfter" id="openOrdersLink"></label></a></li>
									</label></ul>
								</td>
							</tr>	
							
							</tbody>
														
						</table>
					
							
						
					</div> <!-- End of table info -->
				
				</div> <!-- End of content table wrapper -->
		
		
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
	<div id="printDataForReport" class="hideBlock">
		<div id="printbodyForReport" class="printbody"></div>
	</div>
		<!-- History Popup-->	

</body>
</html>
