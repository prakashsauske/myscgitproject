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
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script src="../../scripts/articleLookUpNew.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/sohFullLogCommon.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/stockAdjustment.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/localSohLogHistorySummary.js?version=${properties.version}"></script>
<title>Article Lookup</title>
</head>
<body>

	<div class="mainWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" value="${isbigw}" id="isBigw" />
			<input type="hidden" value="${fromScreen}" id="fromScreen" />
			 <input type="hidden" value="${claimArticle}" id="claimArticle" />
			 <input
				type="hidden" id="navBarHighlight" value="lookUp" />
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs" id='topLink'>
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage"><a>Lookup Articles<a></a></li>
					</ul>
				</div>
				<div class="breadcrumbs hideBlock" id='topLink1'>
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li id="searchPageLink"><a>Lookup Articles</a></li>
						<li class="currentPage"><a>Article Details</a></li>
					</ul>
				</div>
				<div class="breadcrumbs hideBlock" id='topLink2'>
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li id="searchPageLink"><a>Lookup Articles</a></li>
						<li id="detailsPageLink"><a>Article Details</a></li>
						<li class="currentPage"><a>Nearby Stores</a></li>
					</ul>
				</div>
				<div class="breadcrumbs hideBlock" id='topLink3'>
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li id="searchPageLink"><a>Lookup Articles</a></li>
						<li id="detailsPageLink"><a>Article Details</a></li>
						<li class="currentPage"><a>Stock Adjustment</a></li>
					</ul>
				</div>
				<div class="breadcrumbs hideBlock" id='topLink4'>
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li>Stock Management</li>
						<li class="currentPage sadjDetail"><a>Stock Adjustment</a></li>
						<li class="currentPage sadjMain hideBlock">Stock Adjustment</li>
					</ul>
				</div>
				<div class="statusWrapper" id="clearDiv">
					<a href=""><label class="secondaryActionBtn">Reset 
					search</label></a>
				</div>
				<div class="statusWrapper hideBlock" id="backDiv">
					<label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label>

					<c:if test="${not empty articleSearchResutlsList}">
						<label class="secondaryActionBtn" onclick="">Clear Results</label>
					</c:if>
					<!-- End of status wrapper -->

				</div>

				<!-- End of breadcrumb wrapper -->

			</div>


		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper lookup" id="lookUpDivision">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">

					<form id="search" >
						<div class="searchBox">
							<input class="textbox textboxDefaultText  articleSearch"
								placeholder="Search article" id="searchBox">
						</div>
						<!-- End of main search box -->
						<label class="actionBtn"
							id="articleGO">Go</label>
							<!-- class="actionBtn ${properties.Reviewlookupresults}"applicationSettings CR-->

						<div class="searchByOptions tempFix">
							<label for="searchBox" class="labelText" id="preSearchText">Type
								number, description, or EAN / TUN / PLU and press Enter</label>
						</div>
						<!-- End of search by options -->

						<div class="advancedParam hideBlock advancedSearchFormat"
							id="advDiv">

							<div class="parameter hasOptions">
								<h3>Source of Supply:</h3>
								<input type="radio" name="sourceSupply" value="all" id="all"
									checked><label for="all" class="labelText">All</label>
								<input type="radio" name="sourceSupply" value="warehouse"
									id="warehouse"><label for="warehouse" class="labelText">Warehouse</label>
								<input type="radio" name="sourceSupply" value="vendor"
									id="vendor"><label for="vendor" class="labelText">Direct
									Vendor</label>


							</div>
							<!-- End of parameter -->


							<div class="parameter ">
								<h3>&nbsp;</h3>
								<span id="allField" class="options"> <label>Both
										warehouses and direct vendor</label> <input class="textbox"
									style="visibility: hidden">
								</span> <span id="vendorField" class="hideBlock"> <input
									class="textbox"
									placeholder="Type number or name and click verify"
									id="vendorText"> <label class="linkBtn"
									id="verifySupplier"><label class="advancedSearch">Verify</label></label>
									<input type="hidden" id='vendorCheck' value="false"></input>
								</span> <span id="warehouseField" class="hideBlock"> <select
									class="selectOptions supplyDrop" id="warehouseID">
										<!-- <option value="0">Select</option>
											<c:forEach items="${whList}" var="whVal">
												<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo} |	${whVal.siteName}</option>
											</c:forEach> -->
								</select>
								</span>													        
						                           								
							</div>
							
							<div class="parameter hideBlock " id="hideStyle">
							<h3>Style:</h3>
							<span id="styleFeild" > <input
									class="textbox"
									placeholder="Type style and click verify"
									id="styleInput"> <label class="linkBtn"
									id="verifyStyle"><label class="advancedSearch">Verify</label></label>
									<input type="hidden" id='vendorCheck' value="false"></input>
								</span> 
						    </div>
						    <div class="parameter hideBlock" id="hideSize">
							<h3>Size:</h3>
							<span id="sizeField" class="size"> <select
									class="selectOptions supplyDrop" id="size">
								</select>
								</span>
								</div>	
								<div class="parameter hideBlock" id="hideColor">
							<h3>Colour:</h3>
							<span id="colorFeild" class="color"> <select
									class="selectOptions supplyDrop" id="color">
								</select>
								</span>
							</div>
							<!-- End of parameter -->


							<div class="parameter">
								<h3>&nbsp;</h3>
								<input type="checkbox" name="ranged" value="ranged" id="ranged"
									checked><label for="ranged" class="labelText">Show
									only ranged articles</label>

							</div>
							<!-- End of parameter -->

							<label class="actionBtn"
								id="tooManysupplier">Go</label>
								<!-- class="actionBtn ${properties.Reviewlookupresults}"applicationSettings CR-->

						</div>
						<!-- End of Advanced Param -->
                

					</form>

				</div>
				<!-- End of lookup param wrapper -->


				<div class="lookupActionWrapper">
					<label class="linkBtn" id="advLink1"><label
						class="advancedSearch ${properties.Advancedarticlesearch}">Advanced
							Search</label></label> <label class="linkBtn hideBlock" id="closeLink"><label
						class="closeWindow">Close</label></label>
				</div>
				<!-- End of lookup action wrapper -->

				<!-- wrapper that handles the box under the advanced search form -->
				<div id="advWrapper"></div>




			</div>
			<!-- End of lookup wrapper -->

			<div class="ContentTableWrapper">
				<div class="ContentTableWrapper hideblock records-section">
					<div class="tableInfo">
						<div class="tableTitle nodataMessage">
							<h4 id="noData">Sorry no results returned for your search
								criteria. Please try again</h4>
						</div>
						<div class="tableTitle"></div>
					</div>
				</div>
				<div class="errorDiv hideBlock" id="errorMsgDiv"
					style="padding-top: 20px;">
					<label id="errorMsg"> </label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>

				<div class="tableInfo" id="hierarchyDiv1">

					<div class="tableTitle">
						<h4>Select Department Hierarchy to include in Lookup</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->

				<div class="hierarchyWrapper" id="hierarchyDiv2">
					<form class="searchByDept">
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
								<span class="totalCount"> <label>Total:<strong
										id="deptLstCnt"></strong></label>
								</span> <span class="heirachyAction hideBlock" id="deptGo"> <label
									class="actionBtn" id="deptBtn">Go</label>
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
									<label>Please select any department to see it's
										associated categories.</label>
								</div>
								<!-- End of no selection -->

								<label class="loading hideBlock">&nbsp;</label>

								<ul id="categoryLst" class="hideBlock">
									<li class="category"></li>
								</ul>
							</div>
							<!-- End of hierarchy Title -->

							<div class="heirachyBottom">
								<span id="categoryLstTotal" class="totalCount hideBlock">
									<label>Total:<strong id="categoryLstCnt"></strong></label>
								</span> <span class="heirachyAction hideBlock" id="catGo"> <label
									class="actionBtn" id="catBtn">Go</label>
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
									<label>Please select any category to see
										sub-categories.</label>
								</div>
								<!-- End of -->

								<label class="loading hideBlock">&nbsp;</label>

								<ul class="hideBlock" id="subCategoryLst">
								</ul>
							</div>
							<!-- End of hierarchy Title -->

							<div class="heirachyBottom">
								<span id="subCatTotal" class="totalCount hideBlock"> <label>Total:<strong
										id="subTotal"></strong></label>
								</span> <span class="heirachyAction hideBlock" id="subCatGo"> <label
									class="actionBtn" id="subCatBtn">Go</label>
								</span>
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
									<label>Please select any sub-category to see segments.</label>
								</div>
								<!-- End of -->

								<label class="loading hideBlock">&nbsp;</label>
								<ul class="hideBlock" id="segmentLst">
								</ul>
							</div>
							<!-- End of hierarchy Title -->

							<div class="heirachyBottom">
								<span id="segmentTotal" class="totalCount hideBlock"> <label>Total:<strong
										id="segmentTotalCnt"></strong></label>
								</span> <span id="segmentBtn" class="heirachyAction hideBlock">
									<label class="actionBtn">Go</label>
								</span>
							</div>
							<!-- End of heirachy bottom -->

						</div>
						<!-- End of hierarchy Content -->




					</form>

				</div>
				<!-- end of hierarchy Wrapper -->

				<div class="ContentTableWrapper hideBlock" id="instoreReport_t">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class=" totalRecCount">
								Total <strong> </strong> records found '<strong
									class="searchString"> </strong>'
							</h4>
						</div>
						<!-- End of table title -->
						<div
							class="paginationWrapper  lookupPagination paginationDivRefund paginationDiv hideBlock"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</div>
					<!-- End of table info -->

					<div id="scrollBtns" class="tableScroller">
						<ul>
							<li id="previous-column" class="scrollLeft"><a></a></li>
							<li id="next-column" class="scrollRight"><a></a></li>
						</ul>
					</div>
					<div id="scrollTable" class="scrollTableContainer">
						<div id="scrollWindow" class="scrollWindow">
							<table cellspacing="0"
								class="ContentTable sortTableArticleLookupTable tableSorter actionRows"
								id="instorePromoReportTable">
								<thead class="table-sort-hdr">
									<tr>
										<th data_prop="article_no" rowspan="2" class="leftValue">Article</th>
										<th data_prop="article_desc" rowspan="2" class="leftValue">Article
											Description</th>
										<th data_prop="standard_sell_price" rowspan="2"
											class="rightValue">Sell Price ($)</th>
										<th data_prop="promo_sell_price" rowspan="2"
											class="rightValue">Promo Price ($)</th>
										<th data_prop="soh" rowspan="2" class="leftValue">Stock</th>
										<th data_prop="ranged_flag" rowspan="2" class="rightValue lastColumn ">Ranged</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							<div class="tableFooter">
								<div class="legend">
									<label> Legend: <label class="positiveStatus">Ranged</label><label
										class="negativeStatus">Not Ranged</label><label>
								</div>

								<div
									class="paginationWrapper bottomPagination  lookupPagination paginationDivRefund paginationDiv hideBlock"
									id="paginationDiv2">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</div>

						</div>
						<!-- end of scroll window -->
					</div>
					<!-- end of scroll table -->



				</div>
				<!-- end of report info -->


			</div>
			<!-- End of article details -->



		</div>
		<!-- End of content wrapper -->

		<!-- End of content wrapper -->
		<%@include file="articleDetailsNew.jsp"%>
		<%@include file="NearByStoreSearchNew.jsp"%>
		<%@include file="stockAdjustment.jsp"%>
		<a href="#" class="scrollup" style="display: inline;">Top</a>
	</div>
	<%@include file="footer.jsp"%>
	<div id="nodata-error-warn-wrapper" style ="display: none;" onclick="hideNoDataError();">
	<div class="pageErrorsWrapper hideBlock1 hideBlock" id="pageErrors">
			<div class="pageErrorsContent">
				<div class="pageErrorsTitle">
					<h4 class="title">Article not found</h4>
					<a class="close" title="Close">Close</a>
					<p class="description">Article 12345 - article description  </p>
				</div> <!-- End of quick help title -->
				<div class="content">
					
					<h4 class="title">What next?</h4>
					<ol>
						<li>Call support if you need more information</li>
					</ol>
				</div> <!-- End of content -->
			</div> <!-- End of quick help content -->	
	</div>
</div>
	<!-- Multiple article pop up-->
	<div id="dialog-modal" title="Choose Article">
		<div class="popupContent">
			<div class="popupData">
				<div class="tableInfo">
					<div class="tableTitle">
						<h4>
							Total <strong id="articleCount">0</strong> results found for '<strong
								id="searchText"></strong>'
						</h4>
					</div>
					<!-- End of table title -->
				</div>
				<!-- End of table info -->
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0" id="articleSearchTbody">
					</table>
				</div>
				<!-- End of content table wrapper -->
			</div>
			<!-- End of pop up data -->
		</div>
		<!-- End of popupContent -->
	</div>
	<!-- verify vendor pop up-->

	<div id="dialog-supplier-modal1" title="Article Lookup">
		<div class="popupContent">
			<div class="popupData">
				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order.</h4>

				<span class="popupActions"> <label class="actionBtn"
					id="okBtn">OK</label>
				</span>

			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-soh-adjust-modal" title="Stock Adjustment" class="visible-hide contentWrapper ">
		<div class="popupContent">
			<!-- <div class="popupSearchWrapper" id="popupSearchVendor">
				<h3>Supplier Name:</h3>
				<input placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div> -->
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popup-soh-DataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<!-- <label class="actionBtn">Select & Close</label> --> <label
					class="actionBtn" id="soh-adj-cancel" onclick="$('#dialog-soh-adjust-modal').dialog('close');">Cancel</label>
			</div>
		</div>
	</div>
	<!-- verify supplier pop up-->
	<div id="dialog-supplier-modal" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearchVendor">
				<h3>Supplier Name:</h3>
				<input placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>
		</div>
	</div>
	<!-- verify vendor pop up-->

	<!--  Pop Up for details screen xagh9 -->

	<!-- History Popup-->


	<!-- open Orders Popup-->
	<div id="dialog-openOrders" title="Orders for this Article">
		<div class="popupContent ">


			<div class="popupData contentWrapper ">

				<div id="openOrders">
					<ul id="OnOrdersTabInPopUp">

						<li id="orderTabInPopUp"><a href="#tabs-2">Orders</a></li>
						<!-- <li id="frcstTabInPopUp"><a href="#tabs-3">Forecast
								Orders</a></li> -->
					</ul>

					<div id="tabs-2">


						<div class="ContentTableWrapper">

							<div class="tableInfo ">

								<div class="tableTitle topTitle">
									<h4 class="onOrderTitle">Total <strong><label id="onOrderCount"></label></strong> Orders found</h4>
								</div>
								<!-- End of table title -->
<div class="paginationWrapper  onOrderPaginationDiv paginationDiv hideBlock" id="paginationDiv11">
			<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>
								</div></div>


							</div>
							<!-- End of table info -->
							<div id="orderPopUpCntnt"></div>
	<div class="tableFooter"><div class="paginationWrapper bottomPagination  onOrderPaginationDiv paginationDiv hideBlock"
									id="paginationDiv12"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>
									</div></div></div>
						</div>
						<!-- End of Content Table Wrapper -->


					</div>
					<!-- End of tab 2 -->
					<!-- <div id="tabs-3">

						<div class="ContentTableWrapper">

							<div class="tableInfo ">

								<div class="tableTitle topTitle">
									<h4>
										AutoStockR planned forecast for <strong>next 7 days</strong>
									</h4>
								</div>
								End of table title



							</div>
							End of table info
							<div id="frcstOrdersPopUpCntnt"></div>

						</div>
						End of Content Table Wrapper

					</div> -->
					<!-- End of tab 3 -->
				</div>
				<!-- end of tabs -->



			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">OK</label>
				</span>
			</div>



		</div>
		<!-- End of popupContent -->
	</div>

	<!-- Add to display list -->
	<div id="dialog-listDisplay" title="Added to Display">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">The article has been added the Display
					List.</h4>

				<h4 class="alertText">Please note that you need to Publish the
					list once you are finished with the entire list. Click 'View List'
					to navigate to the list.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Ok
					</label> <label class="secondaryActionBtn" id="redirectDisplay">View
							List</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->

	<!-- Add to Clearance list -->
	<div id="dialog-listClearance" title="Added to Clearance">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">The article has been added the Clearance
					List.</h4>

				<h4 class="alertText">Please note that you need to Publish the
					list once you are finished with the entire list. Click 'View List'
					to navigate to the list.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Ok
					</label> <label class="secondaryActionBtn" id="redirectClearance">View
							List</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->

	<!-- Add to Competition list -->
	<div id="dialog-listCompetition" title="Added to Competition">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">The article has been added the
					Competition List.</h4>

				<h4 class="alertText">Please note that you need to Publish the
					list once you are finished with the entire list. Click 'View List'
					to navigate to the list.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Ok
					</label> <label class="secondaryActionBtn" id="redirectCompetition">View
							List</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->


<!-- Add to Special activity list -->
	<div id="dialog-listSpecial" title="Added to Other Markdown">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">The article has been added the
					Other Markdown List.</h4>

				<h4 class="alertText">Please note that you need to Publish the
					list once you are finished with the entire list. Click 'View List'
					to navigate to the list.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Ok
					</label> <label class="secondaryActionBtn" id="redirectSpecial">View
							List</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->

	<!-- create Display -->
	<div id="dialog-display" title="Create In-store Display">
		<div class="popupContent">

			<div class="popupData">

				<div class="formWrapper">

					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="q1">Start Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="d1"
									value="11/11/2014"></td>
							</tr>
							<tr>
								<td><label for="q2">End Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="d2"></td>
							</tr>
							<tr>
								<td><label>Base Forecast</label></td>
								<td><input class="textbox numberBox" id="d4" value="32"
									disabled></td>
							</tr>
							<tr>
								<td><label for="q4">Store Demand</label></td>
								<td><input class="textbox numberBox" id="d4"></td>
							</tr>
							<tr>
								<td><label for="q5">Store Display</label></td>
								<td><input class="textbox numberBox" id="d5"></td>
							</tr>
							<tr>
								<td><label for="q6">Store Build</label></td>
								<td><input class="textbox numberBox" id="d6"></td>
							</tr>
							<tr>
								<td><label for="q7">Advertising Display</label></td>
								<td><select class="selectOptions" id="d7">
										<option>Select</option>
										<option>Option</option>
										<option>Option</option>
								</select></td>
							</tr>
							<tr>
								<td><label for="q3">Delivery Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="d3"
									value="11/11/2014"></td>
							</tr>
							<tr>
								<td><label for="q8">Store Feedback</label></td>
								<td><input class="textbox longTextbox"
									placeholder="Type feedback or notes" id="d8"></td>
							</tr>
						</table>

					</div>
					<!-- End of parameter -->

					<p class="notes hideBlock">
						Please note that In-store Promotions will be available in
						Promotions Planning screens <strong>after approximately 2
							hours</strong>.
					</p>

				</div>
				<!-- End of form wrapper  -->

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><label
						class="thumbUp">Create</label></label> <label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of display -->

	<!-- create Clearance -->
	<div id="dialog-clearance" title="Create In-store Clearance Promotion">
		<div class="popupContent">

			<div class="popupData">

				<div class="formWrapper">

					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="cl1">Start Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="cl1"
									value="11/11/2014"></td>
							</tr>
							<tr>
								<td><label for="cl2">End Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="cl2"></td>
							</tr>
							<tr>
								<td><label for="cl4">New Price</label></td>
								<td><input class="textbox numberBox" id="cl4"></td>
							</tr>
							<tr>
								<td><label for="cl5">Limit Qty.</label></td>
								<td><input class="textbox numberBox" id="cl5"></td>
							</tr>

							<tr>
								<td><label for="cl8">Store Feedback</label></td>
								<td><input class="textbox longTextbox"
									placeholder="Type feedback or notes" id="cl8"></td>
							</tr>
						</table>

					</div>
					<!-- End of parameter -->

					<p class="notes hideBlock">
						Please note that In-store Promotions will be available in
						Promotions Planning screens <strong>after approximately 2
							hours</strong>.
					</p>

				</div>
				<!-- End of form wrapper  -->

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><label
						class="thumbUp">Create</label></label> <label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Clearance -->

	<!-- create Display -->
	<div id="dialog-competition"
		title="Create In-store Competition Promotion">
		<div class="popupContent">

			<div class="popupData">

				<div class="formWrapper">

					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="co1">Start Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="co1"
									value="11/11/2014"></td>
							</tr>
							<tr>
								<td><label for="co2">End Date</label></td>
								<td><input placeholder="dd/mm/yyyy"
									class="textbox defaultTextbox inputDate" id="co2"></td>
							</tr>
							<tr>
								<td><label for="co3">New Price</label></td>
								<td><input class="textbox numberBox" id="co4"></td>
							</tr>

							<tr>
								<td><label for="co4">Store Demand</label></td>
								<td><input class="textbox numberBox" id="co4"></td>
							</tr>
							<tr>
								<td><label for="co5">Store Display</label></td>
								<td><input class="textbox numberBox" id="co5"></td>
							</tr>
							<tr>
								<td><label for="co6">Store Build</label></td>
								<td><input class="textbox numberBox" id="co6"></td>
							</tr>
							<tr>
								<td><label for="co61">Limit Qty.</label></td>
								<td><input class="textbox numberBox" id="co6"></td>
							</tr>
							<tr>
								<td><label for="co7">Competitor</label></td>
								<td><select class="selectOptions" id="co7">
										<option>Select</option>
										<option>Option</option>
										<option>Option</option>
								</select></td>
							</tr>
							<tr>
								<td><label for="co7">Advertising Display</label></td>
								<td><select class="selectOptions" id="co7">
										<option>Select</option>
										<option>Option</option>
										<option>Option</option>
								</select></td>
							</tr>
							<tr>
								<td><label for="co8">Store Feedback</label></td>
								<td><input class="textbox longTextbox"
									placeholder="Type feedback or notes" id="co8"></td>
							</tr>
						</table>

					</div>
					<!-- End of parameter -->

					<p class="notes hideBlock">
						Please note that In-store Promotions will be available in
						Promotions Planning screens <strong>after approximately 2
							hours</strong>.
					</p>

				</div>
				<!-- End of form wrapper  -->

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><label
						class="thumbUp">Create</label></label> <label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Competition -->


	<!-- All Edit functions -->
	<div id="dialog-editFunctions" title="Edit">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">Select what you want to Edit</h4>

				<div id="editTabs" class="ui-tabs-vertical">
					<ul>
						<li id="expireTab" class="${properties.LookUpEditExpiryDate}" ><a href="#editTabsPopUp-1">Expiry Date</a></li>
						<li id="mplAndScTab" class="${properties.LookUpEditMPL}" ><a href="#editTabsPopUp-2">MPL / SC
								/ Facing</a></li>
						<li id="securityTAG" class="${properties.LookUpEditSecurityTag}" ><a href="#editTabsPopUp-3">Security
								Tag</a></li>
						<li class="hideBlock"><a href="#editTabs-4">Default
								Ticket</a></li>
					</ul>

					<div class="expireTab" id="editTabsPopUp-1">
						<h4 class="sectionTitle">Edit Expiry Date</h4>
						<div class="innerSectionContent formWrapper" id="SCcontent">

							<div class="ContentTableWrapper">



								<div
									class="tableActionsBtnsWrapper ">
									<div class="lookupActionWrapper">
										<label class="linkBtn" id="addActionBtnPopUp"><label
											class="addRow">Add Expiry</label></label>
									</div>
									<!-- End of lookup action wrapper -->


								</div>
								<!-- End of table actions btn wrapper -->

								<div class="tableActionsWrapper hideBlock"
									id="tableAddActionPopUp">

									<form method="POST" action="" id="articleExpireDateForm">
										<div class="formWrapper">

											<!-- <div class="parameter">
												<label for="aisle" class="">Aisle</label> <input
													class="textbox defaultTextbox numberBox" name="aisle"
													id="aisle" placeHolder="">
											</div>-->
											<!-- End of parameter -->



											<div class="parameter">
												<label for="store" class="">Expiry Date</label> <input
													class="textbox defaultTextbox inputDate" name="expiryDate"
													id="start" maxlength="10" placeHolder="dd/mm/yyyy">
											</div>
											<!-- End of parameter -->

											<div class="parameter" id="uomForExpirePopUp">
												
											</div>
											<!-- End of parameter -->


											<div class="formActions">
												<label class="actionBtn" id="searchAndAdd">Add</label> <label
													class="secondaryActionBtn closeLink" id="closeLinkPopUp">Close</label>
											</div>
											<!-- End of form actions -->

										</div>
										<!-- End of content table wrapper -->
									</form>



								</div>
								<!-- End of table Actions Wrapper -->


								<div class="tableInfo"><div class="tableTitle">
									<h4 class="sectionTitle" id="expDateRadioUOM">
									</h4></div><!-- End of table title -->
									<!-- code for pagination -->
									<div
												class="paginationWrapper  expirePopUpResultsPagination  paginationDiv hideBlock"
												id="paginationDiv1">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination"></div>
												</div>
											</div>
									
									</div>
			
								<table class="ContentTable" cellspacing="0">
									<thead>
										<tr>
											<!-- <th class="centerValue" width="90px">Aisle</th> -->

											<th class="centerValue" width="160px">Expiry Date</th>
											<th class="centerValue" width="160px">UOM</th>
											<th class="centerValue" width="45px">Actions</th>
										</tr>
									</thead>
									<tbody id="expireDatePopUpTable"></tbody>
								</table>
								<div id="expireDateCompleteData" class="hideBlock"></div>
							</div>
							<!-- End of ContentTableWrapper -->




						</div>
						<!-- End of form wrapper -->

					</div>
					<div class="mplAndScTab" id="editTabsPopUp-2">
					
						<h4 class="sectionTitle othersEditTitle">Edit Min. Pres. Level (MPL) & Shelf
							Capacity (SC)</h4>
							
						<h4 class="sectionTitle bigwEditTitle hideBlock">Edit Facing</h4>

						<div class="innerSectionContent formWrapper" id="SCcontent">
							<div id="uomRadio"></div>
							<div id="mplAndScTable"></div>
							<div class="ContentTableWrapper">
								<div id="beforeHistory">
									<p class="notes" id="">
										<strong>&nbsp;</strong> <label id="fullHistory"
											class="linkBtn tableActionBtns"> <a><label
												class="history">Full History</label></a>
										</label>
									</p>

									<%-- <div id="last2Hstry"></div> --%>


								</div>
								<!-- Temp div before history -->

								<div id="afterHistory" class="hideBlock">

									<p class="notes paraNotes nonPBDNotes  notesPaddingFix" id="">
										<strong>Changes in last 28 days</strong> 
										<span
											class="check-mpl-sc" id="fullHstryRadioCntnt"> </span>
									</p>
									<div class="notes PBDNotes">
									
									<p class="notes " id=""><label class="">
										<strong>Changes in last 28 days</strong> 
										</label>
										
										<span
											class="check-mpl-sc" style="padding-top: 15px;" id="fullHstryMplRadioCntnt"> </span>
										
										<span
											class="pbd-uom" id="fullHstryUomRadioCntnt" ></span>
										
									</p>
										
										</div> 
									<input type="hidden" id="MPLCallFlag" value="false" /> <input
										type="hidden" id="SCCallFlag" value="false" /> <input
										type="hidden" id="FacingCallFlag" value="false" />

									<table cellspacing="0" class="ContentTable">
										<thead>
											<tr>
												<th>&nbsp;</th>
												<th>UOM</th>
												<th>Date & Time</th>
												<th>User</th>
												<th class="centerValue">Old Value</th>
												<th class="centerValue lastColumn">New Value</th>
											</tr>
										</thead>
										<tbody id="fullHstryCntnt"></tbody>

									</table>
								</div>
								<!-- Temp div afterHistory -->

							</div>
							<!-- End of content table wrapper -->

						</div>
						<!-- End of form wrapper -->

					</div>


					<div class="securityTab " id="editTabsPopUp-3">
						<h4 class="sectionTitle">Edit Security Tag</h4>
						<div class="innerSectionContent formWrapper" id="STcontent">
							<div class="parameter">
								<table class="plainTable">
									<tr>
										<td><label for="newST">Security Tag</label></td>
										<td><input type="checkbox" id="yST" value="yST"
											name="SToptions"><label class="labelText" for="yST">Yes</label>
										</td>
									</tr>
								</table>
							</div>
							<!-- End of parameter -->

						</div>
						
						<div class="innerSectionContent formWrapper" id="STcontentForCPBD">
							<div class="" id="cPBDTable">
								
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of form wrapper -->
					</div>
					<div id="editTabs-4">
						<h4 class="sectionTitle">Edit Default Ticket</h4>
						<div class="innerSectionContent formWrapper" id="STcontent">

							<div class="ContentTableWrapper">


								<table class="ContentTable" cellspacing="0">
									<tr>
										<th class="">Template</th>
										<th class="centerValue">Default</th>
									</tr>
									<tr>
										<td class="">Template Name One</td>
										<td class="centerValue"><input type="checkbox"
											name="templateName"></td>
									</tr>
									<tr>
										<td class="">Template Name Two</td>
										<td class="centerValue"><input type="checkbox"
											name="templateName"></td>
									</tr>
									<tr>
										<td class="">Template Name Three</td>
										<td class="centerValue"><input type="checkbox"
											name="templateName" checked="checked"></td>
									</tr>
								</table>

							</div>
							<!-- End of ContentTableWrapper -->

						</div>
						<!-- End of form wrapper -->
					</div>
				</div>


			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<div class="errorDiv hideBlock" id="errorMsgDivEditPop"
					style="padding-top: 0px; float: left;">
					<label id='errorMsgEditPop'> </label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
				<span class="popupActions"> <label class="actionBtn"
					id="createOrderButton"><a><label class="thumbUp">Save</label></a></label>
					<label class="secondaryActionBtn editArticleDetails"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->
<!-- <div id="dialog-conformation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="message">
							Save the changes
						</h4>

					</div>				


					<div class="popupActionsWrapper">
						
						 <span class="popupActions conformation-yesbtn"
							id="yesbtn"> <label class="actionBtn">Yes </label>
						</span>
						<span class="popupActions conformation-nobtn" id="nobtn">
							<label class="actionBtn">No</label></span>
					</div>					

				</div>
				
			</div> 
 -->
	<!-- Print -->
	<div id="dialog-copies" title="Print Template Name">
		<div class="popupContent">
			<div class="popupData">
				<div class="formWrapper">					
					<div class="notes" id="ticketUomDiv">
					</div>
					<div class="parameter">			
						<table width="100%" class="plainTable">
							<tr>
								<td><label for="co5">Number of copies</label></td>
								<td><input class="textbox numberBox" id="ticketCopies" value=""></td>
							</tr>
						</table>

					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of form wrapper  -->

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn printTicket"><a><label
							class="print">Print</label></a></label> <label class="secondaryActionBtn cancelTicket"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Competition -->


	<!-- Email -->
	<div id="dialog-email" title="Email Informtion to Customer">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">Capture customer's email to send
					nutritional / ingredients information, product notes, and tasting
					notes.</h4>

				<div class="formWrapper">

					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="emailinner">Email</label></td>
								<td><input class="textbox  largebox" value=""
									id="customerEmailId"></td>
							</tr>
						</table>


					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of form wrapper  -->
			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<div class="errorDiv hideBlock" id="errorMsgDivEmailPop"
					style="padding-top: 0px; display: inline-block; float: left;">
					<label id='errorMsgEmailPop'> </label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
				<span class="popupActions"> <label id="emailSend"
					class="actionBtn"><a><label class="thumbUp">Send</label></a></label>
					<label id="cancelBtn" class="secondaryActionBtn"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Competition -->


	<!-- Price History Popup-->
	<div id="dialog-priceHistory" title="Price History">
		<div class="popupContent">


			<div class="popupData">
				<h4 class="alertText">
					Showing price history for <strong>last 28 days</strong>
				</h4>
				<div class="price-type-select">
					Select Price Type: <select class="selectOptions" id="prcHstrySlct"></select>
				</div>
				<div class="ContentTableWrapper">
					<div id="prcHstryContnt"></div>
				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">OK</label>
				</span>
			</div>
			<!-- end of  popupActionsWrapper -->



		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of price history -->

	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
		aria-labelledby="ui-id-2" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-confirmation"
			class="ui-dialog-content ui-widget-content">
			<div class="popupContent">

				<div class="popupData popupTitle">

					<h4 class="warning" id="message">
						Please note that In-store Promotions will be available in
						Promotions Planning screens after <strong>approximately 2
							hours</strong>, once it is successfully created.
					</h4>

				</div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupActions" id="ok"> <label class="actionBtn">Ok
					</label>

					</span><span class="popupActions" id="cancel"> <label
						class="secondaryActionBtn">Cancel </label>

					</span>
				</div>
				<!-- End of popup actions-->


			</div>
			<!-- End of popupContent -->
		</div>
	</div>

	<div id="dialog-modal-his" title="Sales History">
		<div class="popupContent">


			<div class="popupData">

				<div class="warningMessage">
					<h4>Please note that Sales History for yesterday could be inaccurate and it will be updated after next data refresh.</h4>
				</div>

			<!-- Fix For Defect - 6510 SMKT_Product Lookup_Browser _UI  Issue in the sales history tab  -->
				<!--  <div class="tableTitle" >
					<h4><strong>Promotional Week</strong></h4>
				</div>  -->
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
				<!-- Fix For Defect - 6510 SMKT_Product Lookup_Browser _UI  Issue in the sales history tab  -->
					<!-- <p class="notes"><strong>Average Sales:</strong> <strong>Daily</strong> <label id="dailyAvgSales">- 3 EA or 0.4 CAR</label>  |   <strong>Weekly</strong><label id="weeklyAvgSales"> 3 EA or 0.4 CAR </label>  |  <strong>15 Week</strong><label id="avgSales15Week">3 EA or 0.4 CAR</label> </p> -->
					<h4> Order Multiple: <label id="packSizeValue"></label></h4>
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
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="errorWrapper1" style="">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Article Lookup.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ol id="validateErrors">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper temp-fix-pop-up hideBlock"
		id="errorWrapperForEdit" style="margin-left: 184px; z-index: 1030;">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Article Lookup</h4>
				<a class="close" title="Close">Close</a>
				<!-- <p class="description">Article Lookup.</p> -->
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title"></h4>
				<ul id="validateErrorsForEdit">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper temp-fix-pop-up hideBlock"
		id="errorMsgDivEmailPop" style="margin-left: 184px; z-index: 1030;">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Article Lookup</h4>
				<a class="close" title="Close">Close</a>
				<!-- <p class="description">Article Lookup.</p> -->
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title"></h4>
				<ul id="errorMsgEmailPop">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageStatusWrapper pageStatusWrapperFix hideBlock temp-fix-pop-up"
		id="warningWrapper" style="margin-left: 184px; z-index: 1030;background-repeat: no-repeat;height: 104px;">
		<div class="pageStatusContent pageStatusContentFix">
			<div class="pageStatusTitle">
				<h4 class="title" id=''>Article Lookup</h4>
				<a class="close" title="Close"
					onclick="$('#warningWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="st_titleContent">Article LookUp</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">
				<h4 class="title"></h4>
				<ul id="st_errorContent">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>


	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="noDataWarningWrapper" style="margin-left: 184px;">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Warning</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Article Lookup.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<!-- <h4 class="title">Reason for failure</h4>  -->
				<ul id="noDataWarning">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	
	<div id="dialog-pos-price" title="POS Price">
		<div class="popupContent">
			<div class="popupData" id="pos_pop_cont">
			</div>
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" onclick="$('#dialog-pos-price').dialog('close');">Ok</label>
				</span>
			</div>
		</div>
	</div>
	<div id="dialog-blocking-reason" title="Blocking Reason">
		<div class="popupContent">
			<div class="popupData" id="blocking_reason_content">
			</div>
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" onclick="$('#dialog-blocking-reason').dialog('close');">Ok</label>
				</span>
			</div>
		</div>
	</div>

	<div id="dialog-blocking-reason" title="Blocking Reason">
		<div class="popupContent">
			<div class="popupData" id="blocking_reason_content">
			</div>
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" onclick="$('#dialog-blocking-reason').dialog('close');">Ok</label>
				</span>
			</div>
		</div>
	</div>
	
	<%@include file="storeVerifyPopUp.jsp"%>
	<%@include file="printerPopUp.jsp"%>
	<div id="printDataForNutrition" class="hideBlock">
		<div id="printbodyForNutrition" class="printEmailAndNutribody"></div>
	</div>
	<div id="emailDataForNutrition" class="hideBlock">
		<div id="emailbodyForNutrition" class="printEmailAndNutribody"></div>
	</div>
	<div id="dialog-printall" class="ui-dialog-content ui-widget-content" style="width: auto; min-height: 43px; max-height: 543px; height: auto;">
		<div class="popupContent">
		
			<div class="popupData">
				
					<div class="formWrapper">
					<div class="notes" id="allticketUomDiv">
					</div>						
						<div id="printallcntnt">
								
						</div>
					</div> <!-- End of form wrapper  -->
		
			</div> <!-- End of pop up data -->
			
			<div class="popupActionsWrapper">
				<span class="popupActions">
					<label class="actionBtn" id="printAllTemp" ><a href="#"><label class="print">Print</label></a></label>
					<label id="cancelPrintAll" class="secondaryActionBtn"><a href="#">Cancel</a></label>
				</span>
			</div> <!-- End of popup actions-->
			
		</div> <!-- End of popupContent -->
	</div>
	<%@include file="sohFullLogCommon.jsp" %>
	<!-- <div id="dialog-Confirmation" title="Comformation">
			<div class="popupContent">
			
				<div class="popupData popupTitle">
					
					<h4 class="warning">Save new values. </h4>
					
					There are few articles in this order are <strong>received by <span class='recei'>James Smith</strong> in previous session. 
				</div> End of pop up data				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						
						<label class="actionBtn" id="YesBtn"><a>Yes</a></label>
						<label class="secondaryActionBtn" id="NoBtn"><a>No</a></label>
					</span>
				</div> End of popup actions
		
				
			</div> End of popupContent
		</div> -->
	
	
	
<form method="get" action="downloadStockAdjReportPdf.pdf" id="stockAdjReportForm" class="" target="_blank">
</form>
</body>

</html>


