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
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/goodsMovementSummary.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>

<title>Goods Movement Summary</title>
</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">
			
<input id="navBarHighlight" type="hidden" value="stockManage"/>

	<%@include file="header.jsp" %>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li>Stock Management</li>
						<li class="currentPage">Goods Movement Summary</li>
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
						Generate Goods Movement Summary 
					</h3>
					<div>
						
						<form method="POST" action="" id="GoodsMovementSummaryForm" class="">
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
											
											<input type="radio" name="pos" value="artList" id="artList" checked><label for="artList" class="labelText">Specific Articles</label>
											<input type="radio" name="pos" value="depHier" id="depHier" ><label for="depHier" class="labelText">Department</label>
											
										</span>
								</div> <!-- End of parameter -->

							
								<div class="parameterOptionsInputBox articleListInput" id="">
									<div class="parameterOptions clearfix">
													
									<span>
										<input type="#" id="searchBaiscBox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" class="textbox textboxDefaultText searchbox">
										<ul class="parameterOptionsListBlock" id="searchBaiscBoxList"></ul>
									</span>	
								
										</div> <!-- End of parameter -->
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix articleHierarchy">
									<label for="dept" class="hideBlock">Departments</label>
									
									<div id="pds" class="selectDropdown selectDropdownFix hideBlock">
										<label id="ds" class="selectLabel"><a href="#" id="deptDropDwnLabel">Select Departments</a></label>
										<ul class="dropdown depDropDown selectDepDropdownFix" id="depDropDwnList">
											<div class="inner-drop-down" id="hierDrp"><li><input type="checkbox" id="allDeptChkBox" name="allDeptChkBox"><label class="dropdownLabel" for="allDeptChkBox">All departments</label></li></div>
											
										</ul>									
									</div>	
								
									<div class="searchByOptions onlyCheckbox hideBlock">
										<!-- <input type="checkbox" name="depH" value="depH" id="depH"><label for="depH" class="labelText">Select multiple departments or sub-categories</label>-->
									</div> <!-- End of search options -->
									
									
								</div> <!-- End of parameter -->
								
								<div class="hierarchyWrapper clearfix hideBlock" id="articleHierarchy">
																		
										<!-- Department -->
										<div class="hierarchyContent" id="deptDiv">				
											
											
											
											<div class="hierarchyTitle">
															<h3>Department</h3> 
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
												<h3>Category</h3>
											</div>
											<!-- End of hierarchy Title -->
											<div class="hierarchyList">
												<div class="noSelection" id="noSelectionCat">
													<label> Please select any department to see categories. </label>
												</div>
												<!-- End of no selection -->
												<label class="loading hideBlock"> &nbsp; </label>
												<ul id="categoryLst"  class="hideBlock"></ul>
											</div>
											<!-- End of hierarchy Title -->
											<div class="heirachyBottom">
												<span id="categoryLstTotal" class="totalCount hideBlock">
													<label> Total: <strong id="categoryLstCnt">1</strong>
												</label>
												</span>
											</div>
											<!-- End of heirachy bottom -->
										</div>
										
										<!-- Sub-category -->
										<div class="hierarchyContent" id="subCatDiv">
											<div class="hierarchyTitle">
												<h3>Sub-category</h3>
											</div>
											<!-- End of hierarchy Title -->
											<div class="hierarchyList">
												<div class="noSelection" id="subCat">
													<label> Please select any category to see
														sub-categories. </label>
												</div>
												<!-- End of -->
												<label class="loading hideBlock"> &nbsp; </label>
												<ul class="hideBlock" id="subCategoryLst">
												</ul>
											</div>
											<!-- End of hierarchy Title -->
											<div class="heirachyBottom">
												<span id="subCatTotal" class="totalCount hideBlock"> <label>
														Total: <strong id="subTotal"></strong>
												</label>
												</span> <span class="heirachyAction hideBlock"> </span>
											</div>
											<!-- End of heirachy bottom -->
										</div> <!-- End of hierarchy Content --> 
															
										<!-- Segment -->
										<div class="hierarchyContent lastContent" id="segDiv">
											<div class="hierarchyTitle">
												<h3>Segment</h3>
											</div>
											<!-- End of hierarchy Title -->
											<div class="hierarchyList">
												<div class="noSelection" id="segment">
													<label> Please select any sub-category to see segments.
													</label>
												</div>
												<!-- End of -->
												<label class="loading hideBlock"> &nbsp; </label>
												<ul class="hideBlock" id="segmentLst">
												</ul>
											</div>
											<!-- End of hierarchy Title -->
											<div class="heirachyBottom">
												<span id="segmentTotal" class="totalCount hideBlock"> <label>
														Total: <strong id="segmentTotalCnt"></strong>
												</label>
												</span> <span id="segmentBtn" class="heirachyAction hideBlock"> </span>
											</div>
											<!-- End of heirachy bottom -->
										</div> <!-- End of hierarchy Title -->
											
										
								</div> <!-- end of hierarchy Wrapper -->
															
								<div class="parameter parameterRow clearfix">
									<label for="override"  class="">Include</label>
									<span class="reportRadio">										 
										<input type="checkbox" name="articlesOop" value="Non-Perpetual Inventory" id="pi" checked><label for="pi" class="labelText">Non-Perpetual Inventory</label>
										<input type="checkbox" name="articlesOop" value="Sales" id="sales" checked><label for="sales" class="labelText">Sales</label> 
										<input type="checkbox" name="articlesOop" value="Goods Receipt" id="goodsReceipt" checked><label for="goodsReceipt" class="labelText">Goods Receipt</label>
									</span>
								</div> <!-- End of parameter -->
								
							
									
								
								<div class="formActions">
									
									<label class="actionBtn" id="generateReport"><a>Generate Report</a></label>								
									<label class="secondaryActionBtn" id="closeLink"><a>Close</a></label>						
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
						
						<div id="goodsMovementSummaryContent"></div>
						
					</div> <!-- End of table info -->
					
					

				
					
				
				
				</div>  <!-- End of Content Table Wrapper-->	
				
				
		
		
			</div>  <!-- End of article Additional Info -->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->

	<%@include file="footer.jsp" %>
	<div id="printDataForStockAdj" class="hideBlock">
		<div id="printbodyForStockAdj" class="printbody"></div>
	</div>
</body>
</html>
