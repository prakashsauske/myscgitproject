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
<script type="text/javascript" src="../../scripts/reportInventory.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportUtils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/reportHierachy.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>Inventory Report</title>
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
						<li class="currentPage">Inventory Report</li>
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
						Generate Inventory Level Report 
					</h3>
					<div>						
						<form method="POST" action="" id="inventoryReportForm">
							<div class="formWrapper">
							
								<div class="parameter parameterRow">
									<label for="override"  class="">Include Values of</label>
									<span class="reportRadio">
										<input type="checkbox" name="overrideOptions" value="SOH - Stock on Hand" id="all" ><label for="all" class="labelText">SOH - Stock on Hand</label>
										<input type="checkbox" name="overrideOptions" value="MPL - Min. Presentation Level (MPL) & Shelf Capacity" id="standard"><label for="standard" class=" standardMPL labelText">MPL - Min. Presentation Level (MPL) & Shelf Capacity</label>
										<input type="checkbox" name="overrideOptions" value="Facings" id="facings"><label for="facings" class="facings labelText">Facings</label>
									</span>
								</div> <!-- End of parameter -->								
								
								<div class="parameter clearfix articleHierarchy">
									<label for="dept">Departments</label>
									<div id="pds" class="selectDropdown selectDropdownFix">
										<label id="ds" class="selectLabel"><a href="#" id="deptDropDwnLabel">Select Departments</a></label>
										<ul class="dropdown selectDepDropdownFix " id="depDropDwnList">
											<li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li>
											
										</ul>
									</div>			
								
									<div class="searchByOptions onlyCheckbox">
										<input type="checkbox" name="depH" value="depH" id="depH"><label for="depH" class="labelText">Select multiple departments or sub-categories</label>
									</div> <!-- End of search options -->
									
									
								</div> <!-- End of parameter -->
								<div class="parameter  ">
									<label for="sa">Seasonal Activity</label>
									<select class="combobox seasonalActivity" id="sa">																			
									</select>
								</div>
								<!-- <div class="parameter  ">
									<label for="sa">Seasonal Activity</label>
									<select class="combobox" id="sa">
									<option value="">Type or select</option>
										<option>All seasonal activities</option>										
									</select>
								</div> --> <!-- End of parameter -->
								
								
													
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
							
							
							<div class="parameter parameterRow parameterOptions clearfix">
								<label for="LocOp">Source of Supply</label>
								
									<span class="parameterOptionsRadio">											
										<input type="radio" name="ssso" value="" id="ssa" checked><label for="ssa" class="labelText">All</label>
										<input type="radio" name="ssso" value="2" id="ssm"><label for="ssm" class="labelText">Warehouse</label>
										<input type="radio" name="ssso" value="1" id="sss"><label for="sss" class="labelText">Direct Vendor</label>
									</span>
									
									<div class="searchByOptions onlyCheckbox">
										<span id="comboBoth">
											<label >Both warehouse and direct vendor</label>
											<select id="" style="visibility:hidden">
												<option value="">for alignment</option>
											</select>
										</span>	
										<span id="comboWarehouse" class="hideBlock">
											 <select id="warehouseID" class="selectOptions">																	
											</select>
										</span>
										<span id="comboDirect" class="hideBlock">
											<input
												type="#" class="textbox" id='supplier'
												placeholder="Type number or name and click verify"> <label
												class="linkBtn" id="verifySupplier"> <label
													class="advancedSearch"> Verify </label>
											</label>
										</span>	
									</div>
									
									
							</div> <!-- End of parameter -->
								
							<div id="addParameter">
							<div class="parameterOptionsInputBox articleList" id="">
					
								<div class="parameter parameterRow clearfix ">
									<label for="addi" id="addCriteriaLabel">Additional Criteria</label>
									<span class="multipleOptions filterValues">
										<select class="selectOptions filter">								
											<option>Select filter</option>											
											<option value="SOH">SOH</option>
											<option value="DAYS_SOH">Days SOH</option>
											<option value="MPL" class="mplV">MPL</option>
											<option value="SHELF_CAPACITY" class="scap">Shelf Capacity</option>
										 	<option value="FACINGS" class="facing">Facings</option>										
											<option value="INVENTORY_VALUE">Inventory Value</option>						
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
										<input type="#" class="textbox numberBox valueCrit" >
									</span>
									<label id="addActionBtn" class="linkBtn addActionBtn">
										  <a href="#"><label class="addRow">Add more</label></a>
										 </label>	
								</div> <!-- End of parameter -->
								</div>						
									 
								
								</div>
								
								
								<hr class="sectionDivider clearfix">
								
								<div class="parameter parameterRow clearfix">
									<label for="override"  class="">Include Articles</label>
									<span class="reportRadio">
										<input type="checkbox" name="articlesOop" value="Deleted" id="del" checked><label for="del" class="labelText">Deleted</label>
										<input type="checkbox" name="articlesOop" value="On Promotion" id="onp" checked><label for="onp" class="labelText">On Promotion</label>
										<input type="checkbox" name="articlesOop" value="Pack Breakdown" id="pb" checked><label for="pb" class="labelText">Pack Breakdown</label> 
										<input type="checkbox" name="articlesOop" value="Non-Perpetual Inventory" id="pi"><label for="pi" class="labelText">Non-Perpetual Inventory</label> 
									</span>
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix parameterRow">
									
									<span class="multipleOptions">
										<span class="option">
											<label>Only show articles <strong>not sold</strong> in the last <input id="nonSoldArt" type="#" class="textbox textboxDefaultText numberBox" maxlength="2"> days</label>
																	
										</span> <!-- End of options -->										
									</span> <!-- End of multiple options -->
									
								
								</div> <!-- End of parameter -->
								<div class="formActions">
									
									<label class="actionBtn" id="generateReport"><a href="#">Generate Report</a></label>								
									<label class="secondaryActionBtn" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
																					
							</div> <!-- End of form wrapper -->
						</form>	
						
					</div> <!-- End of div for jQuery handling -->				
				
						
				</div> <!-- End of ui-accordion -->
			
		
					</br>
					<div class="ContentTableWrapper hideBlock">
			
					
					
					
					<div class="tableActionsBtnsWrapper hideBlock showAllOptions" id="">
					   <div class="lookupActionWrapper">
						  
						  <label class="">Showing all unit of measures</label>
						
						  <div class="tableActionsExtra" class="hideBlock">
							  <span class="check-mpl-sc"><strong>Show:</strong>
								<input type="radio" name="searchByMPLSC" value="All" id="all" checked=""><label for="all" class="labelText">All</label>
								<input type="radio" name="searchByMPLSC" value="EA" id="ea"><label for="ea" class="labelText">EA</label>
								<input type="radio" name="searchByMPLSC" value="MPK" id="mpk"><label for="mpk" class="labelText">MPK</label> 
								<input type="radio" name="searchByMPLSC" value="CAR" id="car"><label for="car" class="labelText">CAR</label>
								<input type="radio" name="searchByMPLSC" value="CA1" id="ca1"><label for="car1" class="labelText">CA1</label> 											
							</span>
						</div>
					   </div> <!-- End of lookup action wrapper -->					  
					</div> <!-- End of table action wrapper -->
				
					<div id="reportContent"></div>
						
						
					</div> <!-- End of table info -->
				
				</div>  <!-- End of Content Table Wrapper-->		
		
			</div>  <!-- End of article Additional Info -->			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->		
		
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

	<%@include file="footer.jsp" %>
	<div id="printDataForReport" class="hideBlock">
		<div id="printbodyForReport" class="printbody"></div>
	</div>
		<!-- History Popup-->
	
	<div id="newParameter">
			<div class="parameterOptionsInputBox articleList hideBlock">
					
								<div class="parameter parameterRow clearfix ">
									<!-- <label for="addi" id="addCriteriaLabel">Additional Criteria</label> -->
									<span class="multipleOptions filterValues">
										<select class="selectOptions filter">								
											<option>Select filter</option>											
											<option value="SOH">SOH</option>
											<option value="DAYS_SOH">Days SOH</option>
											<option value="MPL" class="mplV">MPL</option>
											<option value="SHELF_CAPACITY" class="scap">Shelf Capacity</option>
											<option value="FACINGS" class="facing">Facings</option>											
											<option value="INVENTORY_VALUE">Inventory Value</option>							
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
										<input type="#" class="textbox numberBox valueCrit" >
									</span>
									<label id="addActionBtn" class="linkBtn addActionBtn">
										  <a href="#"><label class="addRow">Add more</label></a>
										 </label>	
								</div> <!-- End of parameter -->
								</div>	
		</div>
		<div id="dialog-verifySupplier" class="visible-hide" title="Verify Supplier">
			<div class="popupContent">
				<div class="popupSearchWrapper" id="popupSearchVendor">
					<h3>Supplier Name:</h3>
					<input placeholder="Enter supplier name"
						class="textbox textboxDefaultText" id="vendorDesc"> <label
						class="actionBtn" id="vendorPopUpGo">Go</label>
				</div>
				<div class="popupData" id="popupDataDiv"></div>
				<!-- End of pop up data -->
				<div class="popupActions hideBlock">
					<label class="actionBtn">Select & Close</label> <label
						class="actionBtn">Cancel</label>
				</div>
			</div>
	`	</div>
	</body>
</html>
