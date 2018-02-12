<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Unknown or Unranged Articles Report</title>




<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/unKnownunRangedArticle.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?version=${properties.version}"></script>





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
						<li class="currentPage">Unknown or Unranged Articles Report</li>
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
		<form action="onPageLoad.htm" id="unknownArticle" method="get">


			<div class="contentWrapper reportWrapper">



				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Unknown or Unranged
							Articles Report</h3>
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
								<!-- End of parameter -->

								<div class="ContentTableWrapper">



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

						<div
							class="ContentTableWrapper hideBlock ContentTableWrapperError">


							<div class="tableInfo tableInfoError  tableStart">


								<div class="tableTitle  errorDiv" id="errorMsgDiv">
									<h4 id="errorMsg">
										<c:if test="${not empty noResults}">${noResults}</c:if>
									</h4>

									<!-- End of table title -->



								</div>
							</div>
						</div>
						<div id="reportContent" class="hideBlock ContentTableWrapper">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle">Unknown or Unranged Articles
										Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="UnkUnraggedPrint()"><label
										class="print">Print</label></label>
								</div>


								<div
									class="paginationWrapper  paginationDiv paginationDivNosales"
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
									<label class="linkBtn">Filter</label> <input type="search"
										id="filter" class="textbox textboxDefaultText"
										placeholder="Enter Department Name">
									<label class="linkBtn " id="markFilterOpen"> <label
										class="filter">Apply Filters</label>
									</label> <label class="linkBtn hideBlock" id="markFilterClear">
										<label class="negativeFlag">Clear Filters</label>
									</label>

								</div>
								End of lookup action wrapper
							</div>
							end of tableActionsBtnsWrapper -->
							<table cellspacing="0"
								class="ContentTable tableSorter  sortTable actionRows treetable drilldownTable "
								data-user_id="paginationDivNosales">
								<thead>

									<tr>
										<th class="leftValue">Date</th>
										<th class="centerValue">Article #</th>
										<th class="centerValue">EAN</th>
										<th class="centerValue">Article Description</th>
										<th class="numberColumn centerValue">Total($)(Article)</th>
										<th class="centerValue">Sold Through</th>
										<th class="centerValue lastColumn " scope="col">View
											stores with <br> this unknown or unranged article
										</th>
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

					</div>
					<!-- End of article Additional Info -->



				</div>
			</div>
			<!-- End of content wrapper -->

		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
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
