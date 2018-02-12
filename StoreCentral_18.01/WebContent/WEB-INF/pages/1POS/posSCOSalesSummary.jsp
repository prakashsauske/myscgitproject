<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>POS / SCO Sales Summary Report</title>





<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/posSCOSalesSummary.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.min.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>




</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">POS / SCO Sales Summary Report</li>
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
		<form action="onPageLoad.htm" id="posSCOSalesSummary" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate POS / SCO Sales Summary
							Report</h3>
						<div>


							<div class="formWrapper">

								<div class="parameter parameterRow">
									<label for="store">Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="dateFrom"
										id="dateFrom"> to <input type="#" name="dateTo"
										class="textbox defaultTextbox inputDate" id="dateTo">
									<input type="hidden" id="dateFromHide" name="dateFromHide" /> <input
										type="hidden" id="dateToHide" name="dateToHide" />
								</div>


								<!-- <div class="parameter clearfix parameterRow selectType">
									<label>Select</label> <span> <input type="radio"
										name="selectType" value="POS" id="pos"><label
										for="pos" class="labelText paramCheckBox">POS </label> <input
										type="radio" name="selectType" value="SCO" id="sales"><label
										for="sales" class="labelText">SCO</label> <input type="radio"
										name="selectType" value="Both" id="both" checked><label
										for="both" class="labelText">Both</label> <span>
								</div> -->
								<!-- End of parameter -->


								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->


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

					<div id="reportContentBoth" class="hideBlock">


						<div class="ContentTableWrapper hideBlock">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle"></h4>
								</div>
								<!-- End of table title -->


								<div class="tableActionBtns">
									<label class="actionBtn" onclick="salesSummayPrintJasper();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->


							</div>
							<!-- End of table info -->




							<div class="tableActionsBtnsWrapper filterBoth">
								<div class="lookupActionWrapper">
									<!-- <label class="linkBtn">Filter</label>
								<input type="search" id="posFilter" onsearch="showPOSSearch()"
								 class="textbox textboxDefaultText filterText" placeholder="Enter some keyword"> -->
									<label class="linkBtn " id="posFilterOpenBoth"> <label
										class="filterBoth filter">Apply Filters</label>
									</label> <label class="linkBtn hideBlock" id="posFilterClearBoth">
										<label class="negativeFlag">Clear Filters</label>
									</label>

								<!-- <div class="parameter clearfix parameterRow selectType">
									<label>Select</label> <span> <input type="radio"
										name="selectType" value="POS" id="pos"><label
										for="pos" class="labelText paramCheckBox">POS </label> <input
										type="radio" name="selectType" value="SCO" id="sales"><label
										for="sales" class="labelText">SCO</label> <input type="radio"
										name="selectType" value="Both" id="both" checked><label
										for="both" class="labelText">Both</label> <span>
								</div> -->
									<div class="void-type-radio">
										<label>Select :</label><span> <input type="radio"
											name="selectType" value="POS" id="pos"><label
											for="item" class="labelText paramCheckBox">POS</label>
											<input type="radio" name="selectType" value="SCO" id="sales"><label
											for="tra" class="labelText">SCO</label> <input
											type="radio" name="selectType" value="Both" id="both"
											checked><label for="all" class="labelText">Both</label>
										</span>
									</div>

									<div class="paginationWrapper  paginationDiv paginationDivBoth"
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

							<input type="hidden" id="scoSalesSummaryAttr" name="scoSalesSummaryAttr" />
							<table cellspacing="0"
								class="sortTable ContentTable pagenationCallbackClass tableSorter tbl-print typeBoth"
								id="treeTableBothType" data-user_id="paginationDivBoth">

								<thead>


									<tr>
										<th class="centerValue" style="padding-right: 30px;" sortAttr="posNumber" sortDataType="int" nulls="first">POS ID#</th>
										<th class="centerValue" sortAttr="transactionCount" sortDataType="int" nulls="first">Transaction <br />Count
										</th>
										<th class="centerValue" sortAttr="itemSoldCount" sortDataType="int" nulls="first">Articles Sold</th>
										<th class="centerValue" sortAttr="netSalesTaxExcl" sortDataType="double" nulls="first">Net Sales<!-- <br />(Tax Excl) -->
										</th>
										<th class="centerValue" sortAttr="avgTransacSize" sortDataType="double" nulls="first">Avg. <br />Transaction <br/>Size
										</th>
										<th class="centerValue" sortAttr="avgSalesPerTransac" sortDataType="double" nulls="first">Avg. Sale per<br /> Transaction
										</th>
										<th class="centerValue" sortAttr="cashTransaction" sortDataType="double" nulls="first">% of Cash <br />Transaction
										</th>
										<th class="centerValue" sortAttr="ofeftTransaction" sortDataType="double" nulls="first">% of EFT <br />Transaction
										</th>
										<th class="centerValue lastColumn" sortAttr="otherTenderTransaction" sortDataType="double" nulls="first">% of Other Tender <br />Transaction
										</th>
									</tr>

								</thead>
								<tbody>

								</tbody>
								
								<tr class="totVal hideBlock">
									<td class="columnDivider valueInfo storeNdsub " >Store
										Total</td>
								<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo netSalesExcl"></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn lastColumn valueInfo "></td>
								</tr>
							</table>
							<!-- </div>
					</div> -->
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivBoth"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

					</div>
					<!-- End of Tabs -->
				</div>
				<!-- End of content table wrapper -->


			</div>
			<!-- end of report info -->
	</div>
	<!-- End of article Additional Info -->


	</div>
	<!-- End of content wrapper -->

	</form>
	<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
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
