<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>POS Declaration Report</title>





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
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/posDeclarationResults.js?${properties.CachedCssAndJsFilesVersion}"></script>
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
						<li class="currentPage">POS Declaration Report</li>
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
		<form action="onPageLoad.htm" id="posDeclaration" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate POS Declaration Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter">
										<label for="store">Trading Week</label> <input type="#"
											class="textbox defaultTextbox inputDate" id="dateFrom" name="dateFrom">
										<label id="week" class="week"></label><input type="hidden"
											value="" id="weekYear" /> <input type="hidden"
											id="dateFromHide" /> <input type="hidden" id="weekHide" /> <input
											type="hidden" id="weekFromDateHide" name="weekFromDateHide" />
										<input type="hidden" id="weekToDateHide" name="weekToDateHide" />
										<input type="hidden" id="posOperatorType"
											name="posOperatorType" />
										<input type="hidden" id="weekFromDateHide2" name="weekFromDateHide2" />
										<input type="hidden" id="weekToDateHide2" name="weekToDateHide2" />
									</div>
									<!-- End of parameter -->

									<div class=" parameterRow ">
										<label>POS Operator Name &nbsp; &nbsp; &nbsp; &nbsp;</label> <span>
											<input type="radio" name="yes" value="Yes" id="yes" checked><label
											for="all" class="labelText">Yes</label> 
											<input type="radio"	name="yes" value="No" id="no"><label for="single"
											class="labelText">No</label> <span>
									</div>
									<!-- End of parameter -->

									<div class="parameter parameterRow parameterOptions clearfix">
										<label for="pos">POS Operator</label> <span
											class="parameterOptionsRadio"> <input type="radio"
											name="pos" value="All" id="all" checked><label
											for="all" class="labelText">All</label> <input type="radio"
											name="pos" value="Single" id="single"><label
											for="single" class="labelText">Single</label> <!-- <input type="radio" name="pos" value="Multiple" id="multiple"><label for="multiple" class="labelText">Multiple</label> -->
										</span>


										<div class="parameter parameterOptionsInputBox">

											<span id="singlePOS"> <input type="#" class="textbox"
												name="userID" id="userID" placeholder="Enter username or ID">
												<label class="linkBtn" id="verifyUser"><label
													class="advancedSearch verifyUser">Verify</label></label> <label
												class="linkBtn hideBlock" id="verifyLabel"><label
													class="verified">Verified</label></label>
											</span> <span id="multiplePOS" class="hideBlock"> <input
												type="#" class="textbox" name="manyUserId" id="manyUserId"
												placeholder="Enter username or ID"> <label
												class="linkBtn" id="verifyAddUser"><label
													class="advancedSearch">Verify & Add</label></label>

												<ul class="userList parameterOptionsListInline"
													id="usersList">

												</ul>

											</span>
										</div>
										<!-- End of parameter -->
<input type="hidden" name="hdnPosOperatr" id="hdnPosOperatr"/>
<input type="hidden" name="hdnPos" id="hdnPos"/>
<input type="hidden" name="hdnPosIdSingle" id="hdnPosIdSingle"/>
<input type="hidden" name="posIdSingle" id="posIdSingle"/>


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
									<h4 class="sectionTitle">POS Declaration Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="posDeclarationJasper()"><label
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
								class="sortTable ContentTable tbl-print  treeTable pagenationCallbackClass"
								data-user_id="paginationDivRefund" id="sortTable">

								<thead>


									<tr>
										<th class="centerValue">Date</th>
										<th class="centerValue">Time</th>
										<!-- <th class="centerValue">Transaction Number</th> -->
										<th class="centerValue">Authorised By</th>
										<th class="centerValue posName">POS Operator</th>
										<th class="numberColumn centerValue">Declared Result</th>
										<th class="numberColumn centerValue">Discrepancy (+/-)</th>
										<th class="centerValue lastColumn">Comments / Action
											taken</th>
										<th class="centerValue lastColumn hideBlock">Sorting Date</th>
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

			<div class="popupSearchWrapper" id="popupSearch">

				<div class="searchWrapper">
					<!-- <h3>Search:</h3>
					<input type="#" class="textbox textboxDefaultText"
						placeholder="Enter User Id or name"> -->
				</div>
				<!-- End of search wrapper -->
				<div
					class="paginationWrapper verifyPagination bottomPagination paginationDivDeclr"
					style="padding-top: 5px;">
					<div class="pagination-holder clearfix">
						<div id="compact-pagination"
							class="compact-theme simple-pagination">
							<ul>
								<!-- <li class="active"><span class="disabled prev">Prev</span></li>
								<li class="active"><span class="current">1</span></li>
								<li><a class="page-link" href="#page-2">2</a></li>
								<li><a class="page-link" href="#page-3">3</a></li>
								<li><a class="page-link next" href="#page-2">Next</a></li> -->
							</ul>
						</div>
					</div>
				</div>

				<!-- <div class="filterWrapper">
					<h3>Sales Organisation:</h3>
					<select class="selectOptions">
						<option>All</option>
						<option>BigW</option>
						<option>BWS</option>
						<option>Woolworths</option>


					</select>
				</div> -->
				<!-- End of search wrapper -->


			</div>
			<!-- End of popup search wrapper -->

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
