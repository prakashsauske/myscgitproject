<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Age Verification Summary Report</title>



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
	src="../../scripts/1POS/script/ageVerificationSummaryReport.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">Age Verification Summary Report</li>
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
		<form action="onPageLoad.htm" id="ageVerificationSummary" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Age Verification Summary
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
										<input type="hidden" id="dateToHide" name="dateToHide" />
										<input id="headerSort"  name="headerSort"  type="hidden" value="" />
												<input id="headerDesc" name="headerDesc" type="hidden" value="" />
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
					<div id="reportContent" class="hideBlock">


						<div class="ContentTableWrapper" style="overflow-y: unset;">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Age Verification Summary Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn"
										onclick="ageVerificationJasperPrint();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
								<div
									class="paginationWrapper  paginationDiv paginationDivSummary"
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
								
								<label class="linkBtn " id="deptFilterOpen"> <label
									class="filter">Apply Filters</label>
								</label> <label class="linkBtn hideBlock" id="deptFilterClear">
									<label class="negativeFlag">Clear Filters</label>
								</label>
								
								
							</div>
						 </div> 
							<div id="scrollBtns" class="tableScroller">
								<ul>
									<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a>
									</li>
									<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a>
									</li>
								</ul>
							</div>
							<!-- End scroller functions -->

							<input type="hidden" id="ageVerificationSummaryAttr" name="ageVerificationSummaryAttr" />
							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindow" class="scrollWindow">
										<input type="hidden" class="filterFlag" name="filterFlag"
										value="" />
									<table cellspacing="0"
										class="sortTable ContentTable tbl-print tableSorter treeTable "
										data-user_id="paginationDivWeekly" id="sortTable">

										<thead>


											<tr>
												<th scope="col" class="sorting" sortAttr="cashierName" sortDataType="string" nulls="first">POS Operator Name</th>
												<th class="centerValue sorting" scope="col" sortAttr="totalAgeVerification" sortDataType="int" nulls="first">Total Age <br>Verification<br>
													Transaction
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="approvedAgeVerifitn" sortDataType="int" nulls="first">Approved Age <br>Verification
													<br>Transaction
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="approvedAgeVerifTransPer" sortDataType="int" nulls="first">Approved Age <br>Verification
													Transaction <br>%
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="rejectedAgeVerifTrans" sortDataType="int" nulls="first">Rejected Age <br>Verification
													Transaction
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="rejectedAgeVerificationPer" sortDataType="int" nulls="first">Rejected Age <br>Verification
													Transaction <br> %
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="keyedAgeVerifTrans" sortDataType="int" nulls="first">Keyed Aged
													Verification <br> Transaction
												</th>
												<th class="centerValue sorting" scope="col" sortAttr="keyedAgedVerificationTransactionPer" sortDataType="int" nulls="first">Keyed Aged <br>Verification
													<br>Transaction %
												</th>

											</tr>


										</thead>
										<tbody></tbody>
										<tr class="totVal hideBlock">


											<td class="columnDivider valueInfo">Store Total</td>
											<td class="numberColumn valueInfo totalAge"></td>
											<td class="numberColumn valueInfo approvedAge"></td>
											<td class="numberColumn valueInfo approvedAgePer"></td>
											<td class="numberColumn valueInfo rejectedAge"></td>
											<td class="numberColumn valueInfo rejectedAgePer"></td>
											<td class="numberColumn valueInfo keyedAge"></td>
											<td class="numberColumn lastColumn valueInfo keyedAgePer"></td>

										</tr>

									</table>
								</div>
							</div>
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivSummary"
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
