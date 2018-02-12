<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Store Performance Report</title>




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

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/storePerformance.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
			<%@include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Store Performance Report</li>
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
		<form action="onPageLoad.htm" id="storePerformance" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Store Performance Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> 
										<input type="#" class="textbox defaultTextbox inputDate" name="dateFrom" id="dateFrom"> 
										<input type="#"	class="textbox defaultTextbox inputTime" id="timeFrom" name="fromTime" value="00:00"> to 
										<input type="#"	name="dateTo" class="textbox defaultTextbox inputDate" id="dateTo"> 
										<input type="#"	class="textbox defaultTextbox inputTime" id="timeTo" name="toTime" value="23:59"> 
										<input type="hidden" id="dateFromHide" name="dateFromHide" /> 
										<input type="hidden" id="dateToHide" name="dateToHide" /> 
										<input type="hidden" id="timeFromHide" name="timeFromHide" /> 
										<input type="hidden" id="timeToHide" name="timeToHide" />
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

					<input type="hidden" id="storePerformanceAttr" name="storePerformanceAttr" />
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


						<div class="ContentTableWrapper">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Store Performance Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="storePerformancePrintJasper()"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
								<div
									class="paginationWrapper  paginationDiv paginationDivStorePerform"
									id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</div>
							<!-- End of table info -->

							<!-- <div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn">Filter</label>
								 <input type="search" id="filter" onsearch="showOldSearch()" class="textbox textboxDefaultText" placeholder="Enter some keyword">
								<label class="linkBtn " id="deptFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="deptFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>
								Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html

								
							</div> End of lookup action wrapper	
						 </div> end of tableActionsBtnsWrapper -->

							<table cellspacing="0"
								class="sortTable ContentTable tableSorter treeTable pagenationCallbackClass"
								data-user_id="paginationDivStorePerform" id="treeTableBothType">

								<thead>
									<tr class="">
										<th class="columnDivider noSort sorter-false">&nbsp;</th>
										<th colspan="3" class="centerValue columnDivider noSort sorter-false">Sales</th>
										<th colspan="4" class="centerValue columnDivider noSort sorter-false">Performance</th>
										<th colspan="3" class="centerValue lastColumn noSort sorter-false">Counts</th>
									</tr>

									<tr class="subHeader">
										<th class="centerValue columnDivider" scope="col"
											style="width: 62px;" sortAttr="timeField" sortDataType="string" nulls="first">Time</th>
										<th class="centerValue" scope="col" sortAttr="activePOSTerminal" sortDataType="int" nulls="first"># of Active<br />POS
										</th>
										<th class="centerValue" scope="col" sortAttr="salesRetailincT" sortDataType="double" nulls="first">Total<br />Value
										</th>
										<th class="columnDivider centerValue" scope="col" sortAttr="avgTrans" sortDataType="java_double" nulls="first"><label
											class="toolTip"
											title="Average is reflective of the activity within the specific time period">&nbsp;</label>Avg.<br />Transaction
										</th>
										<th class="centerValue" scope="col" sortAttr="articlesScannedPerRegPerMin" sortDataType="double" nulls="first"><label
											class="toolTip"
											title="Average is reflective of the activity within the specific time period">&nbsp;</label>Articles<br />P/Reg.
											P/min</th>
										<th class="centerValue" scope="col" sortAttr="tenderP_CustFormatted" sortDataType="string" nulls="first"><label
											class="toolTip"
											title="Average is reflective of the activity within the specific time period">&nbsp;</label>Tender<br />P/Cust</th>
										<th class="centerValue" scope="col" sortAttr="idleTimeFormatted" sortDataType="string" nulls="first"><label
											class="toolTip"
											title="Average is reflective of the activity within the specific time period">&nbsp;</label>Idle<br />P/Cust</th>
										<th class="columnDivider centerValue" scope="col" sortAttr="sercureTimeFormatted" sortDataType="string" nulls="first">Total<br />Secure
										</th>
										<th class="centerValue" scope="col" sortAttr="transCount" sortDataType="int" nulls="first"><label
											class="toolTip" title="Includes voided transactions">&nbsp;</label>Transaction</th>
										<th class="centerValue" scope="col" sortAttr="itemScannedCount" sortDataType="int" nulls="first"><label
											class="toolTip"
											title="Includes voided, subtracted and cancelled articles">&nbsp;</label>Articles</th>
										<th class="centerValue lastColumn" scope="col" sortAttr="avgPrice" sortDataType="java_double" nulls="first"><label
											class="toolTip"
											title="Average is reflective of the activity within the specific time period">&nbsp;</label>Avg.<br />Price</th>
									</tr>

								</thead>
								<tbody></tbody>




								<tr class="totVal">
									<td class="columnDivider valueInfo">Total</td>
									<td class="numberColumn valueInfo">&nbsp;</td>
									<td class="numberColumn centerValue valueInfo hourOfDayNSW">
									</td>
									<td
										class="numberColumn centerValue columnDivider valueInfo test avgTransValue"></td>
									<td class="centerValue valueInfo articlesScannedPerRegPerMin"></td>
									<td class="centerValue valueInfo tenderP_Cust"></td>
									<td class="centerValue valueInfo idleTime"></td>
									<td
										class="numberColumn centerValue columnDivider valueInfo secureTime"></td>
									<td class="numberColumn centerValue valueInfo transCount"></td>
									<td class="numberColumn centerValue valueInfo itemScannedCount"></td>
									<td
										class="numberColumn centerValue lastColumn valueInfo avgPrice"></td>
								</tr>




							</table>



							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivStorePerform"
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
