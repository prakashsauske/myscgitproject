<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Sales By Article Report</title>



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
	src="../../scripts//1POS/script/salesByArticle.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<!-- <script type="text/javascript"
	src="../../scripts/jquery.tablesorter.min.js?${properties.CachedCssAndJsFilesVersion}"></script> -->
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>

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
						<li class="currentPage">Sales By Article Report</li>
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
		<form action="onPageLoad.htm" id="salesByArticle" method="get">



			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Sales By Article Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" name="dateFrom"
											id="dateFrom"> to <input type="#"
											class="textbox defaultTextbox inputDate" name="dateTo"
											id="dateTo"> <input type="hidden" id="dateFromHide"
											name="dateFromHide" /> <input type="hidden" id="dateToHide"
											name="dateToHide" /> <input type="hidden"
											id="departmentHide" name="departmentHide" /> <input
											type="hidden" id="categoryHide" name="categoryHide" /> <input
											type="hidden" id="subCategoryHide" name="subCategoryHide" />
										<input type="hidden" id="segmentHide" name="segmentHide" /> <input
											type="hidden" id="promotionButtonCheck"
											name="promotionButtonCheck" />
											<input id="headerSort"  name="headerSort"  type="hidden" value="" />
												<input id="headerDesc" name="headerDesc" type="hidden" value="" />
									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix">
										<label for="department" title="${properties.Department}">Department</label>
										<select class="selectOptions" id="department_1pos"
											name="department">
											<option value="Select">Select Department</option>
											<c:forEach items="${model.deptInfoList}" var="deptInfo">
												<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
											</c:forEach>

										</select>
										<div class="searchByOptions onlyCheckbox">
											<input type="checkbox" name="depH" value="depH" id="depH"><label
												for="depH" class="labelText">Select Sub-Category
												from Hierarchy</label>
										</div>
										<!-- End of search options -->


									</div>
									<!-- End of parameter -->

									<input type="hidden" class="filterFlag" name="filterFlag"
										value="" /> <input type="hidden" class="hierarchyname"
										id="hierarchyname" value="" />
									<div class="hierarchyWrapper clearfix hideBlock"
										id="articleHierarchy">

										<div class="hierarchyContent" id="deptDiv">

											<div class="hierarchyTitle">
												<h3>Department</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<ul id="deptlst">
													<c:if test="${not empty model.deptInfoList}">
														<%
															int j = 1;
														%>
														<c:forEach items="${model.deptInfoList}" var="deptInfo">

															<input type="hidden" id="child<%=j%>"
																value="${deptInfo.childExists}">
															<c:if test="${deptInfo.level=='1'}">


																<li><input class="department" type="radio"
																	name="departmentList" value="${deptInfo.node}"
																	data-tt-id="<%=j%>" id="${deptInfo.node}"> <label
																	for="${deptInfo.node}" class="labelText">${deptInfo.nodeDesc}</label></li>



															</c:if>
															<%
																j++;
															%>
														</c:forEach>
													</c:if>
												</ul>
											</div>
<input type="hidden" name="categoryListHdn" value="" id="categoryListHdn"/>
<input type="hidden" name="subCategoryListHdn" value="" id="subCategoryListHdn"/>
<input type="hidden" name="segmentListHdn" value="" id="segmentListHdn"/>
											<!-- End of hierarchy Title -->
											<div class="heirachyBottom">
												<span class="totalCount"> <label>Total:<strong
														id="deptLstCnt"></strong></label>
												</span>

											</div>
											<!-- End of hierarchy bottom -->

										</div>
										<!-- End of hierarchy Content -->


										<!-- Category -->
										<div class="hierarchyContent" id="catDiv">

											<div class="hierarchyTitle">
												<h3>Category</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<div class="noSelection" id="noSelectionCat">
													<label>Please select any department to see it's
														associated categories.</label>
												</div>
												<!-- End of no selection -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul id="categoryLst" class="hideBlock">
													<li class="category"></li>
												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="categoryLstTotal" class="totalCount hideBlock">
													<label>Total:<strong id="categoryLstCnt"></strong></label>
												</span>
											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->
										<!-- Sub-category -->
										<div class="hierarchyContent" id="subCatDiv">

											<div class="hierarchyTitle">
												<h3>Sub-category</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<div class="noSelection" id="subCat">
													<label>Please select any category to see
														sub-categories.</label>
												</div>
												<!-- End of -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul class="hideBlock" id="subCategoryLst">
												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="subCatTotal" class="totalCount hideBlock">
													<label>Total:<strong id="subTotal"></strong></label>
												</span> <span class="heirachyAction hideBlock"> <!-- 	<label class="actionBtn">Go</label> -->
												</span>
											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->
										<!-- Segment -->
										<div class="hierarchyContent lastContent" id="segDiv">

											<div class="hierarchyTitle">
												<h3>Segment</h3>
											</div>
											<!-- End of hierarchy Title -->



											<div class="hierarchyList">

												<div class="noSelection" id="segment">
													<label>Please select any sub-category to see
														segments.</label>
												</div>
												<!-- End of -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul class="hideBlock" id="segmentLst">

												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="segmentTotal" class="totalCount hideBlock">
													<label>Total:<strong id="segmentTotalCnt"></strong></label>
												</span> <span id="segmentBtn" class="heirachyAction hideBlock">
													<!-- <label class="actionBtn">Go</label> -->
												</span>

											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->


									</div>
									<!-- end of hierarchy Wrapper -->

									<div class="parameter clearfix onlyCheckbox">
										<input type="checkbox" name="promo" value="promo" id="promo"><label
											for="promo" class="labelText">Only show articles on
											promotion</label>
									</div>
<input type="hidden" name="promoHdn" value="" id="promoHdn"/>
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
									<h4 class="sectionTitle">Sales By Article Report</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="salesByArticlePrintJapser();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->
								<div class="paginationWrapper  paginationDiv paginationDivSales"
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
										id="filter" onsearch="showOldSearch()"
										class="textbox textboxDefaultText"
										placeholder="Enter some keyword"> -->
									<label class="linkBtn " id="deptFilterOpen"> <label
										class="filter">Apply Filters</label>
									</label> <label class="linkBtn hideBlock" id="deptFilterClear">
										<label class="negativeFlag">Clear Filters</label>
									</label>

									<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


								</div>
								<!-- End of lookup action wrapper -->
							</div>
							<!-- end of tableActionsBtnsWrapper  -->




							<input type="hidden" id="saleByArtSortAttr" name="saleByArtSortAttr" />
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
										class="sortTable ContentTable tbl-print pagenationCallbackClass tableSorter "
										id="sortTable"  data-user_id="paginationDivSales">
									
										<thead>
										
											<tr>
							
										

												<th class="leftValue sorting" sortAttr="article" sortDataType="double" nulls="first">Article #</th>

												<th class="leftValue sorting" sortAttr="articleT" sortDataType="string" nulls="first">Article Description</th>
												<th class="leftValue sorting" sortAttr="category" sortDataType="string" nulls="first">Category</th>
												<th class="leftValue sorting" sortAttr="subCategory" sortDataType="string" nulls="first">Sub-Category</th>
												<th class="leftValue sorting" sortAttr="segment" sortDataType="string" nulls="first">Segment</th>
												<th class="leftValue sorting" sortAttr="retailPrice" sortDataType="double" nulls="first">Retail Price</th>
												<th class="leftValue sorting" sortAttr="qtyOfArticleSold" sortDataType="double" nulls="first">QTY</th>
												<th class="leftValue sorting" sortAttr="salesRetailexcT" sortDataType="double" nulls="first">Total</th>
												<th class="leftValue  sorting" sortAttr="salesUnit" sortDataType="string" nulls="first">Unit of
													Measure</th>
												<th class="centerValue  sorting lastColumn" sortAttr="totDeferdLylty" sortDataType="double" nulls="first">Deferred <br/>Loyalty ($)
													</th>
											</tr>

										</thead>
										
										<tbody></tbody>

										<tr class="totVal hideBlock">
											<td class="columnDivider valueInfo storeNdsub ">Store
												Total</td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn valueInfo rightValue storeValue"></td>
											<td class="numberColumn valueInfo "></td>
											<td class="numberColumn lastColumn valueInfo dfrdLyltTot"></td>
										</tr>
									</table>
								</div>
							</div>
							<div class="legend"><label> Legend: <label class="plannerThisPromo">On Promotion</label></label></div>
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivSales"
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
