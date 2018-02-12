<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Investigate Transactions Report</title>

<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider_1POS.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/investigateTransaction.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>

</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%-- <%@include file="header.jsp"%> --%>

			<%@include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Investigate Transaction Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form action="onPageLoad.htm" id="investigateTransaction" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Investigate Transactions
							Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" name="dateFrom"
											id="dateFrom"> to <input type="#" name="dateTo"
											class="textbox defaultTextbox inputDate" id="dateTo">
										<input type="hidden" id="dateFromHide" name="dateFromHide" />
										<input type="hidden" id="dateToHide" name="dateToHide" /> <input
											type="hidden" id="investypeDropDown" name="investypeDropDown" />
									</div>
									<!-- End of parameter -->


									<div class="parameter clearfix">
										<label for="report">Investigate</label> <input type="hidden"
											id="invesDrop" name="investigateDropDwnVal"
											value="<%=request.getParameter("dropDown")%>" /> <select
											class="selectOptions closeDropdown" id="reportType"
											style="width: 240px;" name="investigateTypeDrop">

											<option value="noReport">Select</option>
											<option value="deptSales">Article Sold By Department</option>
											<option value="operatorHistory">Operator and
												Location History</option>
											<option value="noSales">No Sale Transactions</option>
											<option value="priceMarkdown">Manual Price Override
												/RTC Transactions</option>
											<option value="savedTrans">Unrecalled Saved
												Transactions</option>
											<option value="soldOver">Sold Over Restricted
												Quantity</option>
											<option value="priceInquiry">Price Inquiry</option>
										</select>
<input type="hidden" name="hidCallFrm" id="hidCallFrm" value="<%=request.getParameter("callFrm") %>"/>
<input type="hidden" name="hidDateFrmPassd" id="hidDateFrmPassd" value="<%=request.getParameter("dtFrm") %>"/>
<input type="hidden" name="hidDateToPassd" id="hidDateToPassd" value="<%=request.getParameter("dtTo") %>"/>
<input type="hidden" name="hidDrpDwnVal" id="hidDrpDwnVal" value="<%=request.getParameter("dropDown")%>"/>
									</div>
									<!-- End of parameter -->


									<div class="formActions">
										<label class="actionBtn" id="generateReport">Generate
											Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>

						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->
					<div class="ContentTableWrapper hideBlock ContentTableWrapperError">


						<div class="tableInfo tableInfoError  tableStart">


							<div class="tableTitle  errorDiv" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
						</div>
					</div>

					<div class=" deptSales reportContent ContentTableWrapper hideBlock">



						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle">Article Sold By Department</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="articleSoldByDeptJasper();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->


							<div
								class="paginationWrapper  paginationDiv paginationDivDepSales"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of table info -->
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<!-- <label class="linkBtn">Filter</label> <input type="search"
									id="deptSalesFilter" onsearch="showDeptSalesSearch()"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword">
 -->
								<label class="linkBtn " id="deptFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="deptFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>
								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->

						<input type="hidden" id="deptSaleTranAttr" name="deptSaleTranAttr" />

						<table cellspacing="0"
							class="sortTable ContentTable tableSorter tbl-print pagenationCallbackClass deptSalesTable"
							id="treeTable" data-user_id="paginationDivDepSales">

							<thead>


								<tr>
									<th class="centerValue" sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
									<th class="centerValue" sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
									<th class="centerValue" sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>

									<th class="centerValue" sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
									<th class="centerValue" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
									<th class="centerValue" sortAttr="posAuthoriser" sortDataType="string" nulls="first">Authorised By</th>
									<th class="centerValue" sortAttr="department" sortDataType="string" nulls="first">Department</th>
									<th class="numberColumn centerValue lastColumn" sortAttr="departmentSale" sortDataType="double" nulls="first">Total</th>
								</tr>

							</thead>
							<tbody>

							</tbody>
								<tr class="totVal deptSaleTot hideBlock">
									<td class="columnDivider valueInfo storeNdsub " colspan="7">Store
										Total</td>
								<!-- 	<td class="numberColumn valueInfo transacCount"></td>
									<td class="numberColumn valueInfo articleSold"></td>
									<td class="numberColumn valueInfo avgArticlePrice"></td>
									<td class="numberColumn valueInfo avgTransactionPrice"></td>
									<td class="numberColumn valueInfo sales"></td>
									<td class="numberColumn valueInfo gstAmt"></td> -->
									<td class="numberColumn lastColumn valueInfo total"></td>
								</tr>
						</table>
						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivDepSales"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>




					</div>
					<!-- End of content table wrapper -->





					<input type="hidden" id="operatorLocAttr" name="operatorLocAttr" />
					<div
						class="hideBlock operatorHistory ContentTableWrapper reportContent">



						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle">Operator and Location History</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="operatorLocationHistoryJasper();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->
							<div class="paginationWrapper  paginationDiv paginationDivOsHis"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn " id="operatorLocOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="operatorLocClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>

								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->


						<table cellspacing="0"
							class=" sortTable ContentTable tableSorter tbl-print operatorTable"
							id="sortTableOperatorLocation" data-user_id="paginationDivOsHis">

							<thead>

								<tr>
									<th class="centerValue" sortAttr="calendarDayTo" sortDataType="date" nulls="first">Start Date</th>
									<th class="centerValue" sortAttr="cashierSignInTime" sortDataType="time" nulls="first">Start Time</th>
									<th class="centerValue" sortAttr="calendarDayTo" sortDataType="date" nulls="first">End Date</th>
									<th class="centerValue" sortAttr="cashierSignOutTime" sortDataType="time" nulls="first">End Time</th>
									<th class="centerValue" sortAttr="posNumber" sortDataType="int" nulls="first">POS ID #</th>
									<th class="centerValue" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
									<th class="centerValue" sortAttr="transNoRange" sortDataType="double" nulls="none">Transaction Number <br> Range
									</th>
									<!-- <th class=" centerValue lastColumn">Sign Off Type</th> -->
								</tr>

							</thead>
							<tbody>

							</tbody>

						</table>


						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivOsHis"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>


					</div>
					<!-- End of content table wrapper -->



					<div
						class="hideBlock priceMarkdown ContentTableWrapper reportContent" style="overflow-y: unset;">



						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle">Manual Price Override /RTC
									Transactions</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="priceMarkdownPrintJasper();"><label
									class="print">Print</label></label>
									<input id="headerDesc" name="headerDesc" type="hidden" value="" />
									<input id="headerSort" name="headerSort" type="hidden" value="" />
							</div>
							<!-- End of table action buttons -->
							<div class="paginationWrapper  paginationDiv paginationDivMark"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>


						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<!-- <label class="linkBtn">Filter</label> <input type="search"
									id="priceMarkdownFilter"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword"> -->
								<label class="linkBtn " id="priceFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="priceFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>

								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->


						<!-- scroller functions -->
						<div id="scrollBtns" class="tableScroller">
							<ul>
								<li id="previous-column" class="scrollLeft"><a href="#">
								</a></li>
								<li id="next-column" class="scrollRight"><a href="#"> </a></li>
							</ul>
						</div>
						<!-- End scroller functions -->

	<input type="hidden" id="priceMarkAttr" name="priceMarkAttr" />	
						<div id="scrollTable" class="scrollTableContainer">
							<div id="scrollWindow" class="scrollWindow">
								
								<table cellspacing="0"
									class="sortTable ContentTable tableSorter priceMarkdownTabl tbl-print pagenationCallbackClass"
									id="sortTableMarkDown" data-user_id="paginationDivMark">

									<thead>
					
										<tr>
										
										
											<th class="centerValue " sortAttr="calendarDayT" sortDataType="date" nulls="first">Date</th>
											<th class="centerValue " sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
											<th class="centerValue " sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
											<th class="centerValue " sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
											<th class="centerValue " sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
											<th class="centerValue " sortAttr="posAuthoriser" sortDataType="string" nulls="first">Authorised By</th>
											<th class="centerValue " sortAttr="article" sortDataType="long" nulls="first">Article #</th>
											<!-- <th class="centerValue ">EAN</th> -->
											<th class="centerValue " sortAttr="articleT" sortDataType="string" nulls="first">Article Description</th>
											<th class="centerValue " sortAttr="markdownQtySuom" sortDataType="integer" nulls="first">QTY</th>
											<th class="centerValue " sortAttr="reason" sortDataType="string" nulls="first">Reason</th>

											<th class="numberColumn centerValue " sortAttr="salesRetailInc" sortDataType="double" nulls="first">Retail Price</th>
											<th class="numberColumn centerValue " sortAttr="actualSalePrice" sortDataType="double" nulls="first">Total
											</th>
											<th class="numberColumn centerValue " sortAttr="priceDifference" sortDataType="double" nulls="first">Price <br />Difference
											</th>
											<th class="numberColumn lastColumn centerValue " sortAttr="perOfMarkdown" sortDataType="double" nulls="first">% of <br />Markdown
											</th>
										</tr>

									</thead>
									<tbody></tbody>

								</table>

							</div>
							<!-- End of scroll Window -->
						</div>
						<!-- End of scroll Table Container -->
						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivMark"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>


					</div>
					<!-- End of content table wrapper -->



					<div class="hideBlock noSales ContentTableWrapper reportContent">



						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle">No Sale Transactions</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="noSalesTransPrint();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->
							<div
								class="paginationWrapper  paginationDiv paginationDivNosales"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<!-- <label class="linkBtn">Filter</label> <input type="search"
									id="noSalesFilter" onsearch="showNoSalesTransSearch()"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword"> -->
								<label class="linkBtn " id="nosalesFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="nosalesFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>

								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->
								<input type="hidden" id="noSalesAttr" name="noSalesAttr" />	
								
						<table cellspacing="0"
							class="sortTable ContentTable tableSorter tbl-print noSalestrans"
							id="treeTableNoSalesTransaction"
							data-user_id="paginationDivNosales">

							<thead>

								<tr>
									<th class="centerValue " sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
											<th class="centerValue " sortAttr="posTransactionTime_T" sortDataType="time" nulls="first">Time</th>
											<th class="centerValue " sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
											<th class="centerValue " sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
											<th class="centerValue " sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
									<th class="lastColumn centerValue" sortAttr="reason" sortDataType="string" nulls="first">Reason</th>
								</tr>

							</thead>
							<tbody>

							</tbody>

						</table>

						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivNosales"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>



					</div>
					<!-- End of content table wrapper -->




					<div
						class=" savedTrans reportContent ContentTableWrapper hideBlock">



						<div class="tableInfo">
								<input type="hidden" class="filterFlag" name="filterFlag" value=""/>	
							<div class="tableTitle">
								<h4 class="sectionTitle">Unrecalled Saved Transactions</h4>
							</div>
							<!-- End of table title -->
					<input type="hidden" id="savedAttr" name="savedAttr" />
							<div class="tableActionBtns">
								<label class="actionBtn" onclick="savedTransPrint();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->
							<div
								class="paginationWrapper  paginationDiv paginationDivSavedTrans"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<!-- <label class="linkBtn">Filter</label> <input type="search"
									id="savedTransFilter" onsearch="showSavedTransSearch()"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword"> -->
								<label class="linkBtn " id="saveTraFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="saveTraFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>
								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->


						<table cellspacing="0"
							class="savedTransac sortTable ContentTable tbl-print tableSorter"
							id="treeTablesavedTransac" data-user_id="paginationDivSavedTrans">

							<thead>

								<tr>
								
								<th class="centerValue " sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
											<th class="centerValue " sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
											<th class="centerValue " sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
											<th class="centerValue " sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
											<th class="centerValue " sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
									
									<th class="numberColumn lastColumn centerValue" sortAttr="savedTransAmount" sortDataType="double" nulls="first">Total</th>
								</tr>

							</thead>
							<tbody>

							</tbody>

						</table>


						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivSavedTrans"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>


					</div>
					<!-- End of content table wrapper -->





					<div class=" soldOver reportContent ContentTableWrapper hideBlock">



						<div class="tableInfo">
						<input type="hidden" id="soldOverAttr" name="soldOverAttr" />
					
							<div class="tableTitle">
								<h4 class="sectionTitle ">Sold Over Restricted Quantity
									Transactions</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="soldOverRestrictedJasper();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->
							<div class="paginationWrapper  paginationDiv paginationDivSo"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

						<!-- <div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn">Filter</label> <input type="search"
									id="soldFilter" onsearch="showSoldSearch()"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword">
								<label class="linkBtn " id="soldFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="soldFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>

								Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html


							</div>
							End of lookup action wrapper
						</div> -->
						<!-- end of tableActionsBtnsWrapper -->
						<!--  <div id="scrollBtns" class="tableScroller">
										<ul>
											<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a>
											</li>
											<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a>
											</li>
										</ul>
									</div>
									
									<div id="scrollTable" class="scrollTableContainer">
										<div id="scrollWindow" class="scrollWindow">  -->

						<table cellspacing="0"
							class="sortTable ContentTable tableSorter soldOverTable tbl-print"
							id="treeTablesoldQty" data-user_id="paginationDivSo">

							<thead>


								<tr>
								<th class="centerValue " sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
											<th class="centerValue " sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
											<th class="centerValue " sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
											<th class="centerValue " sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
											<th class="centerValue " sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator<br/> Name</th>
									<th class="centerValue" sortAttr="posAuthoriser" sortDataType="string" nulls="first">Authorised By</th>
									<th class="centerValue" sortAttr="article" sortDataType="integer" nulls="first">Article #
									</th>
									<!-- <th class="centerValue">EAN</th> -->
									<th class="centerValue" sortAttr="article_T" sortDataType="string" nulls="first">Article <br />Description
									</th>
									<th class="numberColumn centerValue" sortAttr="soldOverQty" sortDataType="double" nulls="first">Total Sold <br />Quantity
									</th>
									<th class="numberColumn centerValue lastColumn" sortAttr="soldOverAmount" sortDataType="double" nulls="first">Total</th>
								</tr>

							</thead>
							<tbody>
							</tbody>
							<tr class="totVal">
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>
								<td class="centerValue valueInfo"></td>

								<!-- <td class="centerValue valueInfo"></td> -->

								<td class="centerValue valueInfo"></td>
								<td class="leftValue valueInfo">Total</td>
								<td
									class="numberColumn valueInfo rightValue lastColumn soldOverTot"></td>
							</tr>

						</table>
						<!--  </div>
							</div>  -->

						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivSo"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>


					</div>
					<!-- End of content table wrapper -->
					<div class=" priceInquiry reportContent ContentTableWrapper hideBlock">



						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle">Price Inquiry</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="priceInquiryJasper();"><label
									class="print">Print</label></label>
							</div>
							<!-- End of table action buttons -->


							<div
								class="paginationWrapper  paginationDiv paginationDivPriceInquiry"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of table info -->
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<!-- <label class="linkBtn">Filter</label> <input type="search"
									id="deptSalesFilter" onsearch="showDeptSalesSearch()"
									class="textbox textboxDefaultText filterText"
									placeholder="Enter some keyword">
 -->
								<label class="linkBtn " id="priceInquiryFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="priceInquiryFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>
								<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


							</div>
							<!-- End of lookup action wrapper -->
						</div>
						<!-- end of tableActionsBtnsWrapper -->
						<input type="hidden" id="priceInquiryAttr" name="priceInquiryAttr" />
						<table cellspacing="0"
							class="sortTable ContentTable tableSorter tbl-print pagenationCallbackClass priceInquiryTable"
							id="priceInquiryTable" data-user_id="paginationDivPriceInquiry">

							<thead>
								<tr>
									<th class="centerValue" sortAttr="date" sortDataType="date" nulls="first">Date</th>
									<th class="centerValue" sortAttr="time" sortDataType="time" nulls="first">Time</th>
									<th class="centerValue" sortAttr="transNo" sortDataType="long" nulls="first">Trans. #</th>

									<th class="centerValue" sortAttr="posNumber" sortDataType="integer" nulls="first">POS ID #</th>
									<th class="centerValue" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
									<th class="centerValue" sortAttr="article" sortDataType="long" nulls="first">Article #</th>
									<th class="centerValue" sortAttr="articleT" sortDataType="string" nulls="first">Article Description</th>
									<th class="numberColumn centerValue lastColumn" sortAttr="articleStatus" sortDataType="string" nulls="first">Article Status</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<div
							class="paginationWrapper bottomPagination paginationDiv paginationDivPriceInquiry"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>




					</div>
					<!-- End of content table wrapper -->


				</div>
				<!-- end of report info -->


			</div>
			<!-- End of article Additional Info -->


			<!-- End of content wrapper -->

		</form>
	</div>
	<input id="navBarHighlight" type="hidden" value="reports" />
	<%@include file="jasperPrintValidate.jsp"%>

	<%@include file="../footer.jsp"%>






	<!-- <script>
	//document.forms[0].autocomplete="off";
	$( "#dialog-modal2" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 700
	});
	$("#tabs").tabs();
	$(".secondaryActionBtn").click(function(e) {

		
		window.location.href="../login/goingHome.htm";
	});
	//$("#dialog-modal2").parent().addClass("popupWrapper");
	
	
	</script> -->



	<div id="printData" class="hideBlock">
		<div id="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
				class="depPrint"></label><label class="catPrint"></label><label
				class="scPrint"></label><label class="segPrint"></label>
		</div>
	</div>
</body>
</html>
