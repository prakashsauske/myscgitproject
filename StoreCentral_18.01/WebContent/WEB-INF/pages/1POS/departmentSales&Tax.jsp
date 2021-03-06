<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Department Sales Tax Report</title>



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
	src="../../scripts//1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts//1POS/script/departmentSalesTax.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<!-- <script type="text/javascript" src="../../scripts/jquery-latest.js?${properties.CachedCssAndJsFilesVersion}"></script> -->
<!-- <script type="text/javascript" src="../../scripts/jquery.tablesorter.min.js?${properties.CachedCssAndJsFilesVersion}"></script> -->
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript" src="../../scripts/date-formatter.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">Department Sales & Tax Report</li>
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
		<form action="onPageLoad.htm" id="departmentSalestax" method="get">
<input type="hidden" id="deptSaleTaxBanner" name="deptSaleTaxBanner" value="${user.imgLocation}"/>


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Department Sales & Tax
							Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" name="dateFrom"
											id="dateFrom"> to <input type="#" name="dateTo"
											class="textbox defaultTextbox inputDate" id="dateTo">
										<input id="headerSort" name="headerSort" type="hidden"
											value="" /> <input id="headerDesc" name="headerDesc"
											type="hidden" value="" /> <input type="hidden"
											id="dateFromHide" name="dateFromHide" /> <input
											type="hidden" id="dateToHide" name="dateToHide" />
									</div><br/><br/><br/>
									<!-- End of parameter -->
									
									<div class=" parameterColoumn ">
										<label>Remove Liquor sales from Main Report  &nbsp; &nbsp; &nbsp; &nbsp;</label> <span>
											<input type="radio"  name="yes" value="Yes" id="yes" checked><label
											for="all" class="labelText">Yes</label> 
											<input type="radio"	name="yes" value="No" id="no" ><label for="single"
											class="labelText">No</label> <span>
									</div>
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


						<input type="hidden" id="deptSaleTaxAttr" name="deptSaleTaxAttr" />
						<div class="ContentTableWrapper" style="overflow-y: unset;">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Department Sales and Tax Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="deptSalesTaxPrintJasper();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
							</div>
							<!-- End of table info -->

								<!-- scroller functions -->
										<div id="scrollBtns" class="tableScroller">
											<ul>
												<li id="previous-column" class="scrollLeft"><a href="#">
												</a></li>
												<li id="next-column" class="scrollRight"><a href="#">
												</a></li>
											</ul>
										</div>
										<!-- End scroller functions -->
							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindow" class="scrollWindow">
							<table cellspacing="0"
								class="sortTable ContentTable tableSorter treeTable"
								id="sortTable">

								<thead>


									<tr>
										<th class="leftValue sorting" scope="col" sortAttr="department" sortDataType="string" nulls="first">Department</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="countSiteDayDept" sortDataType="int" nulls="first"><label
											class="toolTip"
											title="Customer transactions that include items from multiple departments will result in an increase to the transaction count for all relevant departments."></label>Transaction</br>Count</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="noOfReceiptItems" sortDataType="int" nulls="first">Articles
											Sold</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="avgArticlePrice" sortDataType="double" nulls="first">Avg.
											Article Price</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="avgTransactionPurchase" sortDataType="double" nulls="first">Avg.
											Transaction <br />Purchase
										</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="salesTaxRetailIncl" sortDataType="double" nulls="first">Sales</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="totalTaxAmount" sortDataType="double" nulls="first">GST
											Amount</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="netSalesExlTax" sortDataType="double" nulls="first">Net
											Sales</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="deferedLoyalty" sortDataType="double" nulls="first">Deferred </br>Loyalty ($)</th>
										<th class="numberColumn  centerValue sorting" scope="col" sortAttr="totalAftrDfrdLylt" sortDataType="double" nulls="first">Net Sales after</br> deferred loyalty</th>
										<th class="numberColumn lastColumn leftValue sorting" scope="col" sortAttr="onlineSales" sortDataType="double" nulls="first">Online</br>Net Sales</th>
									</tr>

								</thead>
								<tbody></tbody>
								<tfoot></tfoot>



							</table>
								</div>
							</div>
							<div id="nonFuelNotAsgndLgnd" class="hideBlock"><br><br>* Not Assigned represents any items sold not linked to a valid trading department.</div>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<!-- end of report info -->
					<!-- Departmemnt Sales tax Fuel report -->
					<div id="reportContentFuel" class="hideBlock">
						<!-- <input type="hidden" id="deptSaleTaxAttr" name="deptSaleTaxAttr" /> -->
						<div class="ContentTableWrapper" style="overflow-y: unset;">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Department Sales and Tax Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="deptSalesTaxPrintJasper();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
							</div>
							<!-- End of table info -->

								<!-- scroller functions -->
										<div id="scrollBtns" class="tableScroller">
											<ul>
												<li id="previous-columnFuel" class="scrollLeft"><a href="#">
												</a></li>
												<li id="next-columnFuel" class="scrollRight"><a href="#">
												</a></li>
											</ul>
										</div>
										<!-- End scroller functions -->
							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindowFuel" class="scrollWindow">
							<table cellspacing="0"
								class="sortTableFuel ContentTable tableSorter treeTableFuel"
								id="sortTableFuel">
								<thead>
									<tr>
										<th class="leftValue sorting" scope="col" sortAttr="department" sortDataType="string" nulls="first">Department</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="countSiteDayDept" sortDataType="int" nulls="first"><label
											class="toolTip"
											title="Customer transactions that include items from multiple departments will result in an increase to the transaction count for all relevant departments.">&nbsp;</label>Transaction</br>Count</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="noOfReceiptItems" sortDataType="int" nulls="first">Articles</br>
											Sold</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="avgArticlePrice" sortDataType="double" nulls="none">Avg.
											Article Price</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="avgTransactionPurchase" sortDataType="double" nulls="first">Avg.
											Transaction <br />Purchase
										</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="salesTaxRetailIncl" sortDataType="double" nulls="first">Sales</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="totalTaxAmount" sortDataType="double" nulls="first">GST
											Amount</th>
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="netSalesExlTax" sortDataType="double" nulls="first">Net
											Sales</th>
										<th class="numberColumn lastColumn centerValue sorting" scope="col" sortAttr="litersSold" sortDataType="double" nulls="first">Litres Sold</th>
										<!-- <th class="numberColumn lastColumn centerValue sorting" scope="col" sortAttr="netSalesExlTax" sortDataType="double" nulls="first">Net Sales after</br> deferred loyalty</th> -->
							
										<th class="numberColumn centerValue sorting" scope="col" sortAttr="deferedLoyalty" sortDataType="double" nulls="first">Deferred </br>Loyalty ($)</th>
										<th class="numberColumn  centerValue sorting" scope="col" sortAttr="totalAftrDfrdLylt" sortDataType="double" nulls="first">Net Sales after</br> deferred loyalty</th>
										<th class="numberColumn lastColumn leftValue sorting" scope="col" sortAttr="onlineSales" sortDataType="double" nulls="first">Online</br>Net Sales</th>
									
									</tr>
								</thead>
								<tbody></tbody>
								<tfoot></tfoot>
							</table>
						</div>
							<div id="fuelNotAsgndLgnd" class="hideBlock"><br><br>* Not Assigned represents any items sold not linked to a valid trading department.</div>
						</div>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<!-- end of report info -->
					<!--  -->

				</div>
				<!-- End of article Additional Info -->

			</div>
			<!-- End of content wrapper -->

		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%-- <%@include file="pages/footer.jsp"%> --%>
	<%@include file="jasperPrintValidate.jsp"%>
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
