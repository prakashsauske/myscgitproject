<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Store Weekly Markdown Report</title>



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
	src="../../scripts/1POS/script/storeWeeklyMarkdown.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">Store Weekly Markdown Report</li>
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
		<form action="onPageLoad.htm" id="storeWeeklyMarkdown" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Store Weekly Markdown
							Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<!-- <label for="store">Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="weekStartDate"
										id="weekStartDate"> -->
										<label for="store">Trading Week</label> <input type="#"
											class="textbox defaultTextbox inputDate" id="dateFrom" name="dateFrom">
										<label id="week" class="week"></label><input type="hidden"
											value="" id="weekYear" /> <input type="hidden"
											id="dateFromHide" /> <input type="hidden" id="weekHide" /> <input
											type="hidden" id="weekSunday" /> <input type="hidden"
											id="weekFromDateHide" name="weekFromDateHide" /> <input
											type="hidden" id="weekToDateHide" name="weekToDateHide" />
										<input type="hidden" id="weekFromDateHide2" name="weekFromDateHide2" />
										<input type="hidden" id="weekToDateHide2" name="weekToDateHide2" />

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
					<input type="hidden" id="storeWeeklyMrkDwnAttr" name="storeWeeklyMrkDwnAttr" />
					<div id="reportContent" class="hideBlock">


						<div class="ContentTableWrapper" style="overflow-y: unset;">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Store Weekly Markdown Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="storeWeeklyMarkDwnPrintJasper();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
								<div
									class="paginationWrapper  paginationDiv paginationDivWeekly"
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
							<div id="scrollBtns" class="tableScroller">
								<ul>
									<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a>
									</li>
									<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a>
									</li>
								</ul>
							</div>
							<!-- End scroller functions -->

							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindow" class="scrollWindow">

									<table cellspacing="0"
										class="sortTable ContentTable tbl-print tableSorter treeTable pagenationCallbackClass"
										data-user_id="paginationDivWeekly" id="sortTable">

										<thead>


											<tr>
												<th class="columnDivider centerValue" sortAttr="departmentNumber" sortDataType="double" nulls="none">Department</th>

												<th class="numberColumn centerValue" sortAttr="staffDiscount" sortDataType="double" nulls="first">Team <br />Discount <font size="3">*</font>
												</th>
												<th class="numberColumn centerValue" sortAttr="loyalty" sortDataType="double" nulls="first">Loyalty <font size="3">*</font></th>
												<th class="numberColumn centerValue" sortAttr="promotions" sortDataType="double" nulls="first">Promotions <font size="3">*</font></th>
												<th class="numberColumn centerValue" sortAttr="priceOverrideRTC" sortDataType="double" nulls="first">Price <br />Override/RTC<font size="3">*</font>
												</th>
												<th class="numberColumn centerValue" sortAttr="clearance" sortDataType="double" nulls="first">Clearance</th>
												<th class="numberColumn centerValue" sortAttr="advertisements" sortDataType="double" nulls="first">Advert</th>
												 <th class="numberColumn centerValue" sortAttr="scanningPolicy" sortDataType="double" nulls="first">Scanning Policy<font size="3">*</font></th> 
												<th class="numberColumn centerValue" sortAttr="deleted" sortDataType="double" nulls="first">Deleted</th>
												<th class="numberColumn centerValue" sortAttr="outOfDate" sortDataType="double" nulls="first">Out of Date</th>
												<th class="numberColumn centerValue" sortAttr="theft" sortDataType="double" nulls="first">Theft</th>
												<th class="numberColumn centerValue" sortAttr="stockWriteOff" sortDataType="double" nulls="first">Stock Write <br />Off
												</th>
												<th class="numberColumn centerValue" sortAttr="damagedStock" sortDataType="double" nulls="first">Damaged Stock</th>
												<th class="numberColumn centerValue" sortAttr="comp" sortDataType="double" nulls="first">Comp</th>
												<th class="numberColumn centerValue" sortAttr="specialActivity" sortDataType="double" nulls="first">Special Activity</th>
												<th
													class="numberColumn centerValue" sortAttr="total" sortDataType="double" nulls="first">Total</th>
												<th
													class="numberColumn centerValue" sortAttr="deferredLoyalty" sortDataType="double" nulls="first">Deferred </br>Loyalty ($)</th>
												<th
													class="numberColumn columnDivider centerValue lastColumn" sortAttr="totalAftrDfrdLylt" sortDataType="double" nulls="first">Total after </br>Deferred Loyalty ($)</th>
											</tr>

										</thead>
										<tbody></tbody>
										<tr class="totVal">
											<td class="columnDivider  leftValue valueInfo">Store Total
											</td>
											<td class="numberColumn rightValue valueInfo staff1"></td>
											<td class="numberColumn rightValue valueInfo loyalty1"></td>
											<td class="numberColumn rightValue valueInfo promo1"></td>
											<td class="numberColumn rightValue valueInfo priceOver1"></td>

											<td class="numberColumn rightValue valueInfo clear1"></td>
											 <td class="numberColumn rightValue valueInfo advertisement1">
											</td> 
											 <td class="numberColumn rightValue valueInfo scanningPolicy1">
											</td>  
											<td
												class="numberColumn rightValue  valueInfo delete1"></td>
											<td class="rightValue valueInfo outDate1"></td>
											<td class="rightValue valueInfo theft1"></td>
											<td class="rightValue valueInfo stock1"></td>
											<td
												class="numberColumn rightValue columnDivider valueInfo damaged1"></td>
											<td class="numberColumn rightValue valueInfo comp1"></td>
											<td
												class="numberColumn rightValue valueInfo  specialActivity1"></td>
											<td
												class="numberColumn rightValue valueInfo total1"></td>
											<td
												class="numberColumn rightValue valueInfo dfrdLylt"></td>
											<td
												class="numberColumn rightValue lastColumn valueInfo totAftrLylt"></td>
										</tr>

									</table>
									<br/>
									<div class="inline-block hideBlock margin5 staredMarkLgnd">* Indicates GST Inclusive</div>
								</div>
							</div>
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivWeekly"
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
	<%-- <%@include file="pages/footer.jsp"%> --%>

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
