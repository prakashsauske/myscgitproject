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
<link href="../../styles/slider_NGBO.css?version=${properties.version}" rel="stylesheet" type="text/css" />
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
<script type="text/javascript" src="../../scripts/reportStockAdj.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/sohFullLogCommon.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportHierachy.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>Adjustment Log Report</title>
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
						<li class="currentPage">Adjustment Log Report</li>
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
						Generate Adjustment Log Report 
					</h3>
					<div>
						
						<form method="POST" action="" id="stockAdjReportForm" class="">
							<div class="formWrapper alignParameter ">
							
								
								<div class="parameter parameterRow">
									<label for="override"  class="">Adjustments for</label>
									<span class="reportRadio">
										<input type="radio" onclick="toggleAdditionalFilter('SOH')" name="overrideOptions" value="SOH" id="all" checked><label for="all" class="labelText">SOH - Stock on Hand</label>
										<input type="radio" onclick="toggleAdditionalFilter('M')" name="overrideOptions" value="M" id="standard"><label for="standard" class="labelText">MPL - Min. Presentation Level (MPL) & Shelf Capacity</label>
										
										<input type="radio" onclick="toggleAdditionalFilter('F')" class="hideBlock" name="overrideOptions" value="F" id="facings"><label for="facings" class="labelText hideBlock">Facings</label> 
									</span>
								</div> <!-- End of parameter -->
							
								
								<div class="parameter clearfix">
									<label for="store">Date</label>
									<input type="#" class="textbox defaultTextbox inputDate" id="dateFrom" placeholder="dd/mm/yy">									
									to
									<input type="#" class="textbox defaultTextbox inputDate" id="dateTo" placeholder="dd/mm/yy">
																	
								</div> <!-- End of parameter -->	
								
								<div class="parameter parameterRow parameterOptions clearfix">
									<label for="LocOp">Choose</label>
									
										<span class="parameterOptionsRadio">											
											
											<input type="radio" name="pos" value="depHier" id="depHier" checked><label for="multiple" class="labelText">Departments</label>
											<input type="radio" name="pos" value="artList" id="artList" ><label for="single" class="labelText">Specific Articles</label>
											
										</span>
								</div> <!-- End of parameter -->

							
								<div class="parameterOptionsInputBox hideBlock articleListInput" id="">
									<div class="parameterOptions clearfix">
													
									<span>
										<input type="#" id="searchBaiscBox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" class="textbox textboxDefaultText searchbox">
										<ul class="parameterOptionsListBlock" id="searchBaiscBoxList"></ul>
									</span>	
								
										</div> <!-- End of parameter -->
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix articleHierarchy">
									<label for="dept">Departments</label>
									
									<div id="pds" class="selectDropdown selectDropdownFix">
										<label id="ds" class="selectLabel"><a href="#" id="deptDropDwnLabel">Select Departments</a></label>
										<ul class="dropdown depDropDown selectDepDropdownFix" id="depDropDwnList">
											<div class="inner-drop-down" id="hierDrp"><li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li></div>
											
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
								<div class="parameter clearfix" id="reasonCodeDiv">
									<label for="article">Reason Code</label>
									<div id="pas" class="selectDropdown"><label id="as" class="selectLabel"><a href="#" id="reasonDropDwnLabel">All reasons</a></label>
										<ul class="dropdown reasonDropDwn" id="reasonDropDwnList">
											<div class="inner-drop-down"><li><input type="checkbox" id="allReasonChckBox"><label class="dropdownLabel">All reason</label></li></div>
											
										</ul>
									</div>									
								</div> <!-- End of parameter -->
								
								
								<div class="parameter">
									<label for="article">Users</label>
									<div id="pus" class="selectDropdown"><label id="us" class="selectLabel"><a href="#" id="userDropDwnLabel">All users</a></label>
										<ul class="dropdown userDropDwn" id="userDropDwnList">
											<div class="inner-drop-down"></div>
										</ul>
									</div>
								</div> <!-- End of parameter -->
									
								
							<div id="addParameter">
					
								<div class="parameterOptionsInputBox articleList" id="">
									<div class="parameter parameterRow clearfix ">
										<label for="addi" id="addCriteriaLabel">Additional Criteria</label>
										<span class="multipleOptions">
											<select class="selectOptions filter">								
												<option>Select filter</option>											
												<option  value="QTY_ADJUSTED">Qty. Adjusted</option>
												<option  value="VALUE_ADJUSTED">Value Adjusted</option>
												<option  value="SELL_PRICE">Sell Price</option>	
												<option value="NEW_SOH">New SOH</option>
												<option value="MPL" class="onlyPlanOGram hideBlock">MPL</option>
												<option value="CAP" class="onlyPlanOGram hideBlock">Shelf Capacity</option>
												<option value="FACINGS" class=" onlyFacing hideBlock">Facings</option>																		
											</select>		
										</span>
										<span class="multipleOptions">
											<select class="selectOptions criteria">								
												<option value="LT">Less than</option>	
												<option value="GT">Greater than</option>											
												<option value="ET">Equal to</option>															
											</select>	
										</span>
										<span class="multipleOptions">
											<input type="#" class="textbox numberBox valueCrit">
										</span>
										<label id="addActionBtn" class="linkBtn addActionBtn">
										  <a href="#"><label class="addRow">Add more</label></a>
										 </label>	
										
									</div> 
									</div>
										</div>
									
									
								
							
									
								<div id="newParameter">
									<div class="parameterOptionsInputBox articleList hideBlock" >
										<div class="parameter parameterRow clearfix">
										
											<span class="multipleOptions filterValues">
												<select class="selectOptions filter">								
												<option>Select filter</option>											
												<option  value="QTY_ADJUSTED">Qty. Adjusted</option>
													<option  value="VALUE_ADJUSTED">Value Adjusted</option>
													<option  value="SELL_PRICE">Sell Price</option>	
													<option value="NEW_SOH">New SOH</option>
													<option value="MPL" class="onlyPlanOGram hideBlock">MPL</option>
													<option value="CAP" class="onlyPlanOGram hideBlock">Shelf Capacity</option>
													<option value="FACINGS" class=" onlyFacing hideBlock">Facings</option>											
												</select>		
											</span>
											<span class="multipleOptions">
												<select class="selectOptions criteria">								
													<option value="LT">Less than</option>	
													<option value="GT">Greater than</option>											
													<option value="ET">Equal to</option>													
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
				<div class="ContentTableWrapper hideBlock">
			
					<div class="tableInfo">
					
						<!-- <div class="tableTitle">
							<h4>Total <strong id="noRecords">#</strong> articles found </h4>
						</div> End of table title	 -->				
						
						<div id="reportStockAdjContent"></div>
						
					</div> <!-- End of table info -->
					
					

				
					
				
				
				</div>  <!-- End of Content Table Wrapper-->	
				
				
		
		
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->
	<%@include file="sohFullLogCommon.jsp" %>
		
		
	</div>	 <!-- End of main wrapper -->
				
	</div>

	<%@include file="footer.jsp" %>
	<div id="printDataForStockAdj" class="hideBlock">
		<div id="printbodyForStockAdj" class="printbody"></div>
	</div>
</body>
</html>
