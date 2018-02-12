<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<title>Order Enquiry</title>
</head>

<body>
 <input type="hidden" class="textbox" value="false" name="ineDGMSscreen" id="ineDGMSscreen" />
	<div class="mainWrapper" id="orderLookUpWrapper">
		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="orders" />
			<!-- Need to change the below code for performance -->
			<div class="breadcrumbWrapper" id="brudCrumWrap">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul class="brudCrumWrap" id="brudCrumCont">
						<li><a href="../login/goingHome.htm" id="homeIcon">Home</a></li>
						<li class="navigate currentPage" onclick="navigate('enq')" id="brud_order_lookup">Order Enquiry</li>
						<li class="navigate hideBlock" onclick="navigate('dtl')"  data_back="enq" id="brud_order_detail">Order Detail</li>
						<li class="navigate hideBlock" onclick="navigate('rec')" data_back="dtl" id="brud_receive_order">Receive Order</li>
						<li class="navigate hideBlock" id="brud_update_order"  data_back="dtl">Update Received Qty.</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->
				<div class="statusWrapper">
					<span> <label class="secondaryActionBtn" id="mainBackBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->

		<!-- End of content wrapper -->
		<div class="contentWrapper orderWrappers order lookup" id="orderLookUp">
			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div>
				<!-- End of lookup title wrapper -->
				<div class="lookupParamWrapper">

					<form id="orderEnq" method="POST">
						<input type="hidden" id="multipleArticlesSelected">
						<div class="searchBox">
							<input type="text" class="textbox textboxDefaultText"
								name="orderNo"
								placeholder="Search order by number or article details"
								id="orderNo">
						</div>
						<!-- End of main search box -->
						<label class="actionBtn goButton"> Go </label>
						<div class="searchByOptions">
							<input type="radio" name="searchByOptions" value="number"
								id="number" checked=""> <label for="number"
								class="labelText"> Order Number </label> <input type="radio"
								name="searchByOptions" value="description" id="description">
							<label for="description" class="labelText"> Article
								Details </label>
						</div>
						<!-- End of search by options -->

						<div class="advancedParam hideBlock advancedSearchFormat"
							id="advDiv">

							<div class="parameter">
								<h3>Delivery Date:</h3>
								<input name="fromDate" type="#"
									class="textbox textboxDefaultText inputDate"
									placeHolder="dd/mm/yyyy" id="fromDate"> to <input
									type="#" id="toDate" name="toDate"
									class="textbox textboxDefaultText inputDate"
									placeHolder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->
						<!-- <div class="parameter">
							<h3>New Search:</h3>
							<div class="searchBox">
							<input type="text" class="textbox textboxDefaultText"
								name="newSearch"
								placeholder="Search order by SSCC Carton ID or ASN or ERA "
								id="newSearch">
						    </div>
						 </div> -->
							<div class="parameter">
								<h3>Type:</h3>
								<select name="orderType" id="orderType" class="selectOptions">
									<option value="">All</option>
									<option value="VENDOR">Direct Vendor</option>
									<option value="STOCK_TRANSFER">Stock Transfer IN</option>
									<option value="STOCK_TRANSFER_OUT">Stock Transfer OUT</option>
									<option value="STOCK_TRANSFER_ALL">Stock Transfer IN / Stock Transfer OUT</option>
									<option value="WAREHOUSE">Warehouse</option>

								</select>
							</div>
							<!-- End of parameter -->



							<div class="parameter">
								<h3>Status:</h3>
								<select name="orderStatus" id="orderStatus"
									class="selectOptions">
									<option value="">All</option>
									<option value="OPEN_ORDERS">Open</option>
									<option value="READY_TO_RECEIVE">Ready to Receive</option>
									<option value="FULLY_RECEIVED">Received</option>
									<option value="OVERDUE">Overdue</option>
									<option value="CANCELLED">Cancelled</option>

								</select>
							</div>
							<!-- End of parameter -->
							<div class="parameter departmentDiv">
								<h3>Department:</h3>
								<select class="selectOptions" id="departmentInEnq" name="department">
								</select>
								<div class="searchByOptions departmentDiv onlyCheckbox" id="deptHie">
									<input type="checkbox" name="depH" value="depH" id="depH">
									<label for="depH" class="labelText"> Select
										Sub-category from Hierarchy </label>
								</div>
								<div>
									<ul id="articleHierarchy" class="hideBlock">
										<li id="selectedCat" style="display: inline;"></li>
										<label class="selectedSubCat hideBlock"> &nbsp;&gt; </label>
										<li id="selectedSubCat" style="display: inline;"></li>
										<label class="selectedSeg hideBlock"> &nbsp;&gt; </label>
										<li id="selectedSeg" style="display: inline;"></li>
									</ul>
								</div>
								<!-- End of search options -->

								<label id="" class="linkBtn hideBlock"> <label
									class="newWindow" id=""> Hierarchy </label>
								</label>


							</div>
							<!-- End of parameter -->

							<div class="parameter hasOptions">
								<h3>Source of Supply:</h3>
								<input type="radio" name="sourceSupply" value="all" id="all"
									checked> <label for="all" class="labelText">
									All </label> <input type="radio" name="sourceSupply" value="warehouse"
									id="warehouse"> <label for="warehouse"
									class="labelText"> Warehouse </label> <input type="radio"
									name="sourceSupply" value="vendor" id="vendor"> <label
									for="vendor" class="labelText"> Direct Vendor </label>
							</div>
							<!-- End of parameter -->


							<div class="parameter ">
								<h3>&nbsp;</h3>
								<span id="allField" class="options"> <label> Both
										warehouse and direct vendor </label> <input type="#" class="textbox"
									style="visibility: hidden">
								</span> <span id="vendorField" class="hideBlock"> <input
									type="#" class="textbox" id='supplier'
									placeholder="Type number or name and click verify"> <label
									class="linkBtn" id="verifySupplier"> <label
										class="advancedSearch"> Verify </label>
								</label>
								</span> <span id="warehouseField" class="hideBlock"> <select
									class="selectOptions" id="warehouseDrpdwn"
									name="warehouseDropdown">
										<option value="0">Select Warehouse</option>
										<c:forEach items="${whList}" var="whVal">
											<option value="${whVal.siteNo}" id="${whVal.siteNo}">
												${whVal.siteNo} | ${whVal.siteName}</option>
										</c:forEach>
								</select>
								</span> <input type="hidden" id="vendorVerify">
							</div>
							<label class="actionBtn goButton" id="goButtonSample"> Go
							</label>
						</div>
						<!-- End of Advanced Param -->


					</form>
					<form id="redirectOrderEnq" method="GET">
						<input type="hidden" name="delvFromDate" id="delvFromDate"
							value=""> <input type="hidden" name="delvToDate"
							id="delvToDate" value="">
					</form>
				</div>
				<!-- End of lookup param wrapper -->
<div id="dialog-modal-his" title="Sales History">
		<div class="popupContent">


			<div class="popupData">

				<div class="warningMessage">
					<h4>Please note that Sales History for yesterday could be inaccurate and it will be updated after next data refresh.</h4>
				</div>

				
	<div id="uomRadio_salesHist"></div>

				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<thead>
							<tr>
								<th>&nbsp;</th>
								<th>Monday</th>
								<th>Tuesday</th>
								<th>Wednesday</th>
								<th>Thursday</th>
								<th>Friday</th>
								<th>Saturday</th>
								<th>Sunday</th>
								<th class="lastColumn">Total</th>
							</tr>
						</thead>
						<tbody id="salesHistContent"></tbody>


					</table>
				</div>
				<!-- End of content table wrapper -->
				
				<div class="tableTitle">
					
					<h4>Order Multiple: <label id="packSizeValueHist"></label></h4>
				</div>

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">OK</label>
				</span>
			</div>



		</div>
		<!-- End of popupContent -->
	</div>
				<div class="lookupActionWrapper">
					<label class="linkBtn" id="advLink1"> <label
						class="advancedSearch"> Advanced Search </label>
					</label> <label class="linkBtn hideBlock" id="closeLink"> <label
						class="closeWindow"> Close </label>
					</label>
				</div>
				<!-- End of lookup action wrapper -->

				<!-- wrapper that handles the box under the advanced search form -->
				<div id="advWrapper" class="hideBlock" style="height: 65px;">

				</div>




			</div>

			<div class="ContentTableWrapper hideBlock" id="order-head">
				<div class="tableInfo">
					<div class="tableTitle">
						<h4>
							<strong>List of Orders</strong>
						</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->

				<div id="tabs" class="tabs">
					<ul>
						<li id="over-due-tab-link" class="order-tabs" tab_ind="0"><a href="#over-due-tab"><label class=""></label>Overdue
								(1)</a></li>
						<li id="fully-rece-tab-link" class="order-tabs" tab_ind="1"><a href="#fully-rece-tab">Fully Received (3)</a></li>
						<li id="ready-rece-tab-link" class="order-tabs" tab_ind="2"><a href="#ready-rece-tab">Ready to Receive (3)</a></li>
						<li id="open-tab-link" class="order-tabs" tab_ind="3"><a href="#open-tab">Open Orders (1)</a></li>
						<li id="noti-tab-link" class="order-tabs" tab_ind="4"><a href="#noti-tab">Notifications (2)</a></li>
						<li class="highlightTab high-tab" id="alloc-tab-link" tab_ind="5"><a href="#alloc-tab">Check
								Allocations</a></li>
						<li class="${properties.CreateOrders} highlightTab high-tab" id="create-tab-link" tab_ind="6"><a href="#create-tab" class="">Create
								Orders</a></li><!-- Fixed defect 9968 -->
						<li id="dummy-tab-link" class="hideBlock" tab_ind="7"><a href="#dummy-tab"></a></li>
					</ul>
					<div id="over-due-tab" class="order-tabs-cont"></div>
					<div id="fully-rece-tab" class="order-tabs-cont"></div>
					<div id="ready-rece-tab" class="order-tabs-cont"></div>
					<div id="open-tab" class="order-tabs-cont"></div>
					<div id="noti-tab" class="order-tabs-cont"></div>
					<div id="alloc-tab"></div>
					<div id="create-tab"></div>
					<div id="dummy-tab" class="hideBlock"></div>
				</div>
				<div id="order-no-res-cont"></div>
			</div>
		
		</div>
		
	</div>
	<%@include file="footer.jsp"%>
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
	</div>

	<div id="dialog-hierarchy" class="visible-hide"
		title="Select Department Hierarchy">
		<div class="popupContent">
			<div class="popupData contentWrapper">
				<div class="hierarchyWrapper clearfix" id="articleHierarchy">
					<!-- Department -->
					<div class="hierarchyContent" id="deptDiv">
						<div class="hierarchyTitle">
							<h3>Department</h3>
						</div>
						<!-- End of hierarchy Title -->
						<div class="hierarchyList">
							<ul id="deptlst">
							</ul>
						</div>
						<!-- End of hierarchy Title -->
						<div class="heirachyBottom">
							<span class="totalCount"> <label> Total: <strong
									id="deptLstCnt"> </strong>
							</label>
							</span>
						</div>
						<!-- End of hierarchy bottom -->
					</div>
					<!-- End of hierarchy Content -->
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
							<ul id="categoryLst" class="hideBlock">
								<li class="category"></li>
							</ul>
						</div>
						<!-- End of hierarchy Title -->
						<div class="heirachyBottom">
							<span id="categoryLstTotal" class="totalCount hideBlock">
								<label> Total: <strong id="categoryLstCnt"> </strong>
							</label>
							</span>
						</div>
						<!-- End of heirachy bottom -->
					</div>
					<!-- End of hierarchy Content -->
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
									Total: <strong id="subTotal"> </strong>
							</label>
							</span> <span class="heirachyAction hideBlock"> </span>
						</div>
						<!-- End of heirachy bottom -->
					</div>
					<!-- End of hierarchy Content -->
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
									Total: <strong id="segmentTotalCnt"> </strong>
							</label>
							</span> <span id="segmentBtn" class="heirachyAction hideBlock"> </span>
						</div>
						<!-- End of heirachy bottom -->
					</div>
					<!-- End of hierarchy Content -->
				</div>
				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="deptHieSelect"> Select </label> <label
						class="secondaryActionBtn" id="deptHieCancel"> Cancel </label>
					</span>
				</div>
			</div>
		</div>
	</div>

<!-- vendor authorization number popup -->
			<div id="dialog-modal-autho-ngbo" title="Edit Vendor Authorisation Number">
				<div class="popupContent">

					<div class="popupData">





						<div class="ContentTableWrapper formWrapper">

							<div class="parameter">
								<label for="dDate">Authorisation #</label> <input type="#"
									class="textbox" id="vendorAuthNoInNGBO" name="vendorAuthNoInNGBO"
									placeholder="Enter authorisation number"
									onkeypress="return isNumberKey(event)" maxlength="15" />
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="saveVendorAuthNoInNGBO">Save</label> <label
							class="secondaryActionBtn" id="cancelVendorAuthNoInNGBO">Cancel</label>
						</span>
					</div>
					<!-- End of popup actions-->

				</div>
				<!-- End of popupContent -->
				</div>
				
				
<div id="dialog-sessionRCV" title="Receiving">
			<div class="popupContent">
			
				<div class="popupData popupTitle">
				
					<!-- <h4 class="warning warningName">There are few articles in this order are <strong>captured as received</strong> in the system.</h4> --> 
					<h4 class="warning">Previous receiving session exists. Resume previous session or start again? </h4>
					
					<!-- There are few articles in this order are <strong>received by <span class='recei'>James Smith</strong> in previous session. --> 
				</div> <!-- End of pop up data -->				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						
						<label class="actionBtn" id="resumeSessRCV"><a>Resume Session</a></label>
						<label class="secondaryActionBtn" id="newSessRCV"><a>New Session</a></label>
					</span>
				</div> <!-- End of popup actions-->
		
				
			</div> <!-- End of popupContent -->
		</div>

<div id="dialog-editSitePop" title="Select a Target site">
		<div class="popupContent">
			<div class="formWrapper  twoColumn ">
			<form id="transferPopUpForm">
				<input type="hidden" id="isVerified" value="false">
				<div class="parameter parameterSingle clearfix">
					<label for="pos1">Target Site</label>
					<input type="#" class="textbox searchbox" placeholder="Type target site number or name " id="pos1">
					<label class="linkBtn" id="verifysite"><label class="advancedSearch">Verify</label></label>						
				 
				</div> <!-- End of parameter -->	
				
	
				<div class="parameter parameterRow parameterOptions clearfix">
					<label>Select from</label>
					
						<span class="parameterOptionsRadio">
							
							<input type="radio" name="targetSiteOpt" value="nearby" id="pnearby"><label for="nearby" class="labelText">Nearby Stores</label>
							<input type="radio" name="targetSiteOpt" value="wh" id="pwh"><label for="wh" class="labelText">My Warehouses</label>
						</span>
						

						
						<div class="parameter parameterOptionsInputBox">
							
									
							<span id="pmywhlist" class="hideBlock">
								<select id="warehouseInPopup" class="selectOptions">
									<option>Select</option>
									<option>Warehouse 1</option>
									<option>Warehouse 2</option>
									
								</select>
								
								
							</span>	
						
						
						</div> <!-- End of parameter -->
					 
				</div> <!-- End of parameter -->	
				
	</form>
							
			</div> <!-- End of form wrapper -->
			
												
						
			<div class="popupSearchWrapper hideBlock" id="popupSearch">
				<h3>Sales Orgs:</h3>
				
					<select class="selectOptions salesOrgMap" id="selectHeight" name="selectHeight" > 			
						<option value="1010">1010 | BWS</option>
						<option value="1015">1015 | Dan Murphy's</option>
						<option value="1020">1020 | Woolworths Petrol</option>
						<option value="1025">1025 | Thomas Dux</option>
						<option value="1030">1030 | New Small Stores</option>
						<option value="2010">2010 | Countdown</option>
						<option value="2015">2015 | Gull Petrol</option>
						<option value="2030">2030 | NZ Distribution Centres</option>
						<option value="9050">9050 | SuperValue</option>
						<option value="9060">9060 | Fresh Choice</option>
						<option value="1005">1005 | Supermarket</option>
					</select>
					
				
				<h3>Distance(km):</h3>
				<select class="selectOptions" id="near-by-distance">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				<h3>Max Results:</h3>
				<select class="selectOptions" id="near-by-max">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				
				<label class="actionBtn nearbyStoreSearchBtn" id="goButtonSample">Search Stores</label>
				
			</div> <!-- End of popup search wrapper -->
			

		
		
			<div class="popupData hideBlock" id="siteResults">
			
				<div class="tableInfo">
				
					<div class="warningMessage hideBlock" id="searchWarning" style="padding-top: 13px;padding-bottom: 26px;">
						<h4>
							Too many search results for '<strong>supplier name</strong>'.
							Please select a supplier from the list below.
						</h4>
					</div>
				
					<div class="paginationWrapper nearby-pagination bottomPagination"
						style="padding-top: 5px;">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination">
								<ul>
									<li class="active"><span class="disabled prev">Prev</span></li>
									<li class="active"><span class="current">1</span></li>
									<li><a class="page-link" href="#page-2">2</a></li>
									<li><a class="page-link" href="#page-3">3</a></li>
									<li><a class="page-link next" href="#page-2">Next</a></li>
								</ul>
							</div>
						</div>
					</div>
											
					<div class="tableTitle">
						<h4>Total <strong>2</strong> sites found  </h4>
					</div> <!-- End of table title -->					
					
				
				</div> <!-- End of table info -->
				
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tr>
							<th>Site No</th>
							<th>Site Name</th>
							
						
							<th width="100px" class="lastColumn centerValue">Select</th>
						</tr>
						<tr>							
							<td>5571</td>
							<td>New - Chester Hill</td>
							
							
							<td class="sorted lastColumn centerValue"><input type="radio" name="siteSelect"></td>							
						</tr>
						
						<tr class="lastRow">							
							<td>5571</td>
							<td>New - Chester Hill</td>
							
							
							<td class="sorted lastColumn centerValue">
								<input type="radio" name="siteSelect">
							</td>
						</tr>
						
					</table>
				</div> <!-- End of content table wrapper -->
				
				
			
				
			
			</div> <!-- End of pop up data -->
			
			<div class="errorDiv hideBlock" style="padding-top:10px">
				<label>Unable to stock transfer due to incorrect temperature. </label>
			</div>
			
				<div class="popupActionsWrapper ">
								
					<span class="popupActions">
						<label class="secondaryActionBtn" id="ibtCancel"><a href="#">Cancel</a></label>
						<label class="actionBtn" id="ibtProceed"><a href="#"><label class="thumbUp">Proceed</label></a></label>
							
						
					</span>
				</div> <!-- End of popup actions-->
			
		</div> <!-- End of popupContent -->
	</div> 
<%@include file="verifyStorePopUp.jsp"%>
<div id="printDataForIBTOrder" class="hideBlock">
		<div id="printbodyForIBTOrder" class="printbody ibtOrderPrintcontent"></div>
	</div>
</body>

<head>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}">
	
</script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}">
	
</script>
<script src="../../scripts/table.js?version=${properties.version}">
	
</script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}">
	
</script>
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script src="../../scripts/instoreMobilinkServices.js?version=${properties.version}">
	
</script>
<script src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}">
	
</script>
<script src="../../scripts/basicSort.js?version=${properties.version}">
	
</script>
<script src="../../scripts/OrderEnquiryNew.js?version=${properties.version}">
	
</script>
<script src="../../scripts/articleValidation.js?version=${properties.version}">
	
</script>
<script src="../../scripts/jWizard.js?version=${properties.version}">
	
</script>
<script src="../../scripts/common.js?version=${properties.version}">
	
</script>
<script type="text/javascript" src="../../scripts/commonObjects.js?version=${properties.version}">
	
</script>
<title>Order Enquiry</title>
</head>
</html>
