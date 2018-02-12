<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Paid In &amp; Paid Out Report</title>





<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/paidInPaidOut.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">Paid In &amp; Paid Out Report</li>
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
		<form action="onPageLoad.htm" id="paidInPaidOut" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Paid In &amp; Paid Out Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter">
										<label for="store">Trading Week</label> <input name="dateFrom" type="#"
											class="textbox defaultTextbox inputDate" id="dateFrom">
										<label id="week" class="week"></label><input type="hidden"
											value="" id="weekYear" /> <input type="hidden"
											id="dateFromHide" /> <input type="hidden" id="weekHide" /> <input
											type="hidden" id="weekFromDateHide" name="weekFromDateHide" />
										<input type="hidden" id="weekToDateHide" name="weekToDateHide" />
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
					<div id="reportContent" class="hideBlock">


						<div class="ContentTableWrapper">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Paid In &amp; Paid Out Report</h4>
								</div>
								<!-- End of table title -->
									<div class="void-type-radio">
										<label>Select :</label><span> <input type="radio"
											name="selectType" value="PaidIn" id="PaidIn"><label
											for="item" class="labelText paramCheckBox">Paid In</label>
											<input type="radio" name="selectType" value="PaidOut" id="PaidOut"><label
											for="tra" class="labelText">Paid Out</label> <input
											type="radio" name="selectType" value="Both" id="Both"
											checked><label for="all" class="labelText">Both</label>
										</span>
									</div>

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="paidInPaidOutPrintJasper()"><label
										class="print">Print</label></label>
										
								</div>
								<!-- End of table action buttons -->
								<div class="paginationWrapper  paginationDiv paginationDivDeclr"
									id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</div>
							<!-- End of table info -->

							<table cellspacing="0"
								class="sortTable ContentTable treeTable pagenationCallbackClass"
								data-user_id="paginationDivDeclr" id="sortTable">

								<thead>
									<tr>
										<th class="centerValue">Performed By</th>
										<th class="centerValue">Authorised By</th>
										<th class="centerValue">Date</th>
										<th class="centerValue">Reference</th>
										<th class="numberColumn centerValue">Code</th>
										<th class="centerValue">Code Description</th>
										<th class="centerValue">Type</th>
										<th class="centerValue">Tender Type</th>
										<th class="numberColumn centerValue lastColumn">Total</th>
									</tr>

								</thead>
								<tbody></tbody>
						
							</table>
							
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivDeclr"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
										
								</div>
							</div>
							
						<br><br><div>* Indicates the Paid In or Paid Out was performed at the POS.</div>
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

	<div id="dialog-verify" title="Verify User">
		<div class="popupContent">

			<div class="tableInfo warningMessage">
				<h4></h4>
			</div>
			<!-- End of table info -->


			<div class="popupData">



				<div class="ContentTableWrapper">
					<table class="ContentTable sortPopUpTbl" cellspacing="0">


					</table>






			

				</div>
				<!-- End of content table wrapper -->
			
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>



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
