<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Article Void Refund</title>
<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<%-- <link href="../../styles/NewScroll.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" /> --%>
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider_1POS.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/articleRefund.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">Article Void Refund Report</li>
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
		<form action="onPageLoad.htm" id="articleRefund" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Articles Void / Refund
							Report</h3>
						<div>

							<form method="POST" action="" id="articleVoidRefund">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" name="dateFrom"
											id="dateFrom"> to <input type="#" name="dateTo"
											class="textbox defaultTextbox inputDate" id="dateTo">
										<input type="hidden" id="dateFromHide" name="dateFromHide" />
										<input type="hidden" id="dateToHide" name="dateToHide" />

									</div>

									<div class="parameter parameterRow transactionType">
										<label>Transaction Type</label> <span> <input
											type="radio" name="transactionType" value="Voids" id="pos"><label
											for="pos" class="labelText paramCheckBox">Voids </label> <input
											type="radio" name="transactionType" value="Refunds"
											id="sales"><label for="sales" class="labelText">Refunds</label>
											<input type="radio" name="transactionType" value="Both"
											id="both" checked><label for="both" class="labelText">Both</label>
											<input type="hidden" id="transactionTypeHdn" name="transactionTypeHdn" />
											<span>
									</div>
											<input type="hidden" id="hidCallFrm" name="hidCallFrm" value="<%=request.getParameter("callFrm")%>"/>
											<input type="hidden" id="dtFrmHdn" name="dtFrmHdn" value="<%=request.getParameter("dtFrm")%>"/>
											<input type="hidden" id="dtToHdn" name="dtToHdn" value="<%=request.getParameter("dtTo")%>"/>
											<input type="hidden" id="repNamHdn" name="repNamHdn" value="<%=request.getParameter("repNam")%>"/>
											<input type="hidden" id="voidTypeHdn" name="voidTypeHdn" value="<%=request.getParameter("voidType")%>"/>
									<!-- End of parameter -->


									<!-- <div class="parameter clearfix">
									<label for="article" class="">Article</label>
									<input type="#" class="textbox articleSearchText" name="articleNo" id="article" placeHolder="Search article by" tabindex="1">
									<div class="searchByOptions">
										<input type="radio" checked="" id="number" value="number" name="searchByOptions"><label class="labelText" for="number">Number</label>
										<input type="radio" id="description" value="description" name="searchByOptions"><label class="labelText" for="description">Description</label>
										<input type="radio" id="reference" value="reference" name="searchByOptions"><label class="labelText" for="reference">EAN</label> 
									 </div>
								</div> End of parameter -->





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


					<div id="reportContent" class="hideBlock">


						<!-- For displaying report results -->
						<div class="ContentTableWrapper hideBlock">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4>
										<strong>Article Void and Refund Report</strong>
									</h4>
								</div>
								<!-- End of table title -->


							</div>
							<!-- End of table info -->


							<div id="mainTabs">

								<div class="tableActionBtns">
									<label class="actionBtn" id="printBtn"
										onclick="voidsRefundsPrintJasper();"><label class="print">Print</label></label>
									<!-- <label class="actionBtn" id="emailBtn"
										onclick="voidsRefundsPrintJasper();"><label class="email">Email</label></label> -->
								</div>


								<ul>
									<li><a href="#mainTabs-1" class="tab1 ">Voids</a></li>
									<li><a href="#mainTabs-2" class="tab2 ">Refunds</a></li>
								</ul>




								<div id="mainTabs-1">




									<div class="tableActionsBtnsWrapper" id="tableSearchActions">
										<div class="lookupActionWrapper">
											<label class="linkBtn " id="voidFilterOpen"> <label
												class="filter">Apply Filters</label>
											</label> <label class="linkBtn hideBlock" id="voidFilterClear">
												<label class="negativeFlag">Clear Filters</label>
											</label>
											<div class="void-type-radio">
												<label>Void Type :</label><span> <input type="radio"
													name="filterRadio" value="art" id="item"><label
													for="item" class="labelText paramCheckBox">Article</label>
													<input type="radio" name="filterRadio" value="tra" id="tra"><label
													for="tra" class="labelText">Transaction</label> <input
													type="radio" name="filterRadio" value="all" id="all"
													checked><label for="all" class="labelText">All</label>
												</span>
											</div>
											<div
												class="paginationWrapper  paginationDiv  paginationDivVoid"
												id="paginationDiv1">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination"></div>
												</div>
											</div>
											<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


										</div>
										<!-- End of lookup action wrapper -->

									</div>
									<!-- end of tableActionsBtnsWrapper -->

									<div id="scrollBtns" class="tableScroller voidtableScroller">
										<ul>
											<li id="previous-column_void" class="scrollLeft"><a href="#">&nbsp;</a>
											</li>
											<li id="next-column_void" class="scrollRight"><a href="#">&nbsp;</a>
											</li>
										</ul>
									</div>
									<!-- End scroller functions -->
									<div id="scrollTable"
										class="scrollTableContainer voidscrollTableContainer">
										<div id="scrollWindow" class="scrollWindow voidscrollWindow">
										<input type="hidden" id="voidTblSortAttr" name="voidTblSortAttr" />
											<table cellspacing="0"
												class="voidTbl tableSorter pagenationCallbackClass ContentTable  "
												style="width: 1270px;" id="treetable"
												data-user_id="paginationDivVoid">

												<thead>
													<tr>
														<th class="centerValue" sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
														<th class="centerValue" sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
														<th class="centerValue" sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
														<th class="centerValue" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator<br>Name</th>
														<th class="centerValue" sortAttr="posAuthoriser" sortDataType="string" nulls="first">Authorised By</th>
														<th class="centerValue" sortAttr="article" sortDataType="double" nulls="first">Article #</th>
														<!-- <th class="centerValue">EAN</th> -->
														<th class="centerValue" sortAttr="article_T" sortDataType="string" nulls="first">Article Description</th>
														<th class="centerValue" sortAttr="voidItem" sortDataType="string" nulls="first">Void Type</th>
														<th class="centerValue" sortAttr="reason" sortDataType="string" nulls="first">Reason</th>
														<th class="centerValue" sortAttr="department" sortDataType="string" nulls="first">Department</th>
														<th class="numberColumn lastColumn" sortAttr="salesRetailIncT" sortDataType="double" nulls="first">Total</th>
													</tr>
												</thead>
												<tbody></tbody>
												<tr class="totVal voidTotal hideBlock">
													<td class="leftValue valueInfo">Store Total</td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td	class="numberColumn valueInfo rightValue lastColumn netSales2"></td>
												</tr>
											</table>
										</div>
									</div>
									<div
										class="paginationWrapper bottomPagination paginationDiv paginationDivVoid"
										id="paginationDiv2">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
								<div id="mainTabs-2">
									<div class="tableActionsBtnsWrapper">
										<div class="lookupActionWrapper">
											<label class="linkBtn " id="refunfFilterOpen"> <label
												class="filter">Apply Filters</label>
											</label> <label class="linkBtn hideBlock" id="refundFilterClear">
												<label class="negativeFlag">Clear Filters</label>
											</label>

											<div class="paginationWrapper  paginationDiv"
												id="paginationDiv3">
												<div class="pagination-holder clearfix paginationDivRefund" style="padding: 0 0 0 0">
													<div id="compact-pagination"
														class="compact-theme simple-pagination"></div>
												</div>
											</div>
										</div>
										<!-- End of lookup action wrapper -->

									</div>
									<!-- end of tableActionsBtnsWrapper -->

									<div id="scrollBtns" class="tableScroller">
										<ul>
											<li id="previous-column_refund" class="scrollLeft"><a href="#">&nbsp;</a>
											</li>
											<li id="next-column_refund" class="scrollRight"><a href="#">&nbsp;</a>
											</li>
										</ul>
									</div>
									<!-- End scroller functions -->
									<div id="scrollTable" class="scrollTableContainer">
										<div id="scrollWindow" class="scrollWindow">
										<input type="hidden" id="refundTblSortAttr" name="refundTblSortAttr" />

											<table cellspacing="0"
												class="sortTable refundTbl  tableSorter pagenationCallbackClass  ContentTable  "
												id="sortTable" data-user_id="paginationDivRefund">
												<thead>
													<tr>
														<th class="centerValue" sortAttr="calendarDayTo" sortDataType="date" nulls="first">Date</th>
														<th class="centerValue" sortAttr="posTransactionTime" sortDataType="time" nulls="first">Time</th>
														<th class="centerValue" sortAttr="transactionNumber" sortDataType="long" nulls="first">Trans. #</th>
														<th class="centerValue" sortAttr="posNumber" sortDataType="int" nulls="first">POS ID #</th>
														<th class="centerValue" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
														<th class="centerValue" sortAttr="posAuthoriser" sortDataType="string" nulls="first">Authorised By</th>
														<th class="centerValue" sortAttr="article" sortDataType="string" nulls="first">Article #</th>
														<th class="centerValue" sortAttr="article_T" sortDataType="string" nulls="first">Article Description</th>
														<th class="centerValue" sortAttr="refundType" sortDataType="string" nulls="first">Refund Type</th>
														<th class="centerValue" sortAttr="reason" sortDataType="string" nulls="first">Reason</th>
														<th class="numberColumn centerValue lastColumn" sortAttr="totalValue" sortDataType="double" nulls="first">Total</th>
													</tr>
												</thead>
												<tbody></tbody>
												<tr class="totVal refundTotal hideBlock">
													<td class="leftValue valueInfo">Store Total</td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<!-- <th class="centerValue">Article No.</th> -->
													<td class="centerValue valueInfo"></td>
													<!-- <th class="centerValue">Department</th> -->
													<td class="centerValue valueInfo"></td>
													<td class="centerValue valueInfo"></td>
													<td
														class="numberColumn valueInfo rightValue lastColumn netSales"></td>
												</tr>
											</table>
										</div>
									</div>

									<div
										class="paginationWrapper bottomPagination paginationDiv paginationDivRefund"
										id="paginationDiv4">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
							</div>
							<!-- End of tabs -->
						</div>
						<!-- End of Content Table Wrapper-->
					</div>
					<!-- end of report info -->
				</div>
				<!-- End of article Additional Info -->
			</div>
		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%@include file="jasperPrintValidate.jsp"%>
	<%-- <%@include file="pages/footer.jsp"%> --%>
	<%@include file="../footer.jsp"%>
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
