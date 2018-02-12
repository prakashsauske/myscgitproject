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
<script type="text/javascript" src="../../scripts/reportOOC.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportHierachy.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../script/jquery.filtertable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>


<title>OOC Report</title>
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
						<li class="currentPage">Out of Code</li>
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
						Generate an Out of Code Report
					</h3>
					<div>
						
						<form method="POST" action="" id="OOCReportForm">
							<div class="formWrapper">
							
								<div class="parameter parameterRow">
									<label for="store">Date</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="dateFrom" value="28/03/2014">									
									to
									<input type="#" class="textbox defaultTextbox inputDate" id="dateTo" value="29/03/2014">
																	
								</div> <!-- End of parameter -->
								
								
								<div class="parameter clearfix articleHierarchy">
									<label for="dept">Departments</label>
									
									<div id="pds" class="selectDropdown selectDropdownFix">
										<label id="ds" class="selectLabel"><a href="#" id="deptDropDwnLabel">Select Departments</a></label>
										<ul class="dropdown depDropDown selectDepDropdownFix" id="depDropDwnList">
											<div class="inner-drop-down-ooc" id="hierDrp"><li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li></div>
											
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
									<label class="actionBtn" id="generateReport">Generate Report</label>
								
									<label class="secondaryActionBtn" id="closeLink">Close</label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
				<div class="hideBlock1 reportContent " style= "margin-top:20px" >
				
									
						<div class="ContentTableWrapper">
							
								
								
								<div id="tabs" class="hideBlock">
										<br/>
										<div class="tableInfo">
							
											<div class="tableTitle">
												<h4><strong>Out of Code Articles</strong></h4>
											</div> <!-- End of table title -->					
											
										
										</div> <!-- End of table info -->			
						
										<div class="tableActionBtns">							
											<label class="actionBtn"><label id="printReport" class="print">Print</label></label>					
										</div>
						
						
									<ul>										
										<li><a href="#tabs-1" id="tab1">Today (5)</a></li>
										<li><a href="#tabs-2" id="tab2">dd/mm - dd/yy (#)</a></li>																
									</ul>					
									
									
									
									<div id="tabs-1">
							
										<div class="ContentTableWrapper">
								
											<div class="tableInfo">				
												<div class="tableTitle">
													<h5 class="sectionTitle"><strong id="todayTabLbl">List of articles expiring today </strong></h5>
												</div> <!-- End of table title -->
											</div>
									
										<div id="reportContent1"></div>
										</div> <!-- End of content table wrapper -->
							
									</div> <!-- End of tabs - 1 -->
									
									<div id="tabs-2">
							
										<div class="ContentTableWrapper">
								
											<div class="tableInfo">				
												<div class="tableTitle">
													<h5 class="sectionTitle"><strong id="secondTabLbl">List of articles expiring dd/mm - dd/yy</strong></h5>
												</div> <!-- End of table title -->
											</div>
									
											<div id="reportContent2"></div>
										</div> <!-- End of content table wrapper -->
							
									</div> <!-- End of tabs - 2 -->
							
					
								</div> <!-- End of tabs -->

					</div> <!-- End of content table wrapper -->
						
				
				</div> <!-- end of report info -->
				
				
				
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
		
	
		
		
	</div>	<!-- End of main wrapper -->
		
	<%@include file="footer.jsp" %>
	<div id="printDataForReport" class="hideBlock">
		<div id="printbodyForReport" class="printbody oocPrint"></div>
	</div>
	

</body>
</html>
