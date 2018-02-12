<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>In-Store Display Report</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet"
type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />


<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/promotions_jWizard.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStorePromotionDisplay-BigW.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%-- <%@include file="header.jsp"%> --%>

			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">In-store Display Report</li>
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




		<div class="contentWrapper reportWrapper">


			<div class="articleAdditionalInfo">



				<div id="accordion">

					<h3 class="mainAccordion">Generate In-Store Display Report</h3>
					<div>
					<form method="POST" action="" id="instoreDisplayReportPdf"></form>
						<form:form id="inStoreDisplay" modelAttribute="inStoreDisplay"
							method="get">
							<input type="hidden"  id="depName" class="depName" name="depName">
						<input type="hidden"  id="catName" class="catName" name="catName">
						<input type="hidden"  id="subCatName" class="subCatName" name="subCatName">
						
						<input type="hidden"  id="segName" class="segName" name="segName">
							<div class="formWrapper">

								<div class="parameter">
									<label for="department" class=""
										title="${properties.PromotionsFor}">Promotions For</label> <select
										class="selectOptions" id="promotionWeek" name="promotionWeek">
										<option value="Select">Select Promotional Week</option>
										<%-- <option value="0" title="${properties.CurrentWeek}">Current
												Week</option>
											<option value="1" title="${properties.NextWeek}">Next
												Week</option>
											<option value="2" title="${properties.TwoWeeksOut}">Two
												Weeks Out</option>
											<option value="3" title="${properties.ThreeWeeksOut}">Three
												Weeks Out</option> --%>
										<c:forEach items="${promotionWeekDropdownList}" var="weeks">
											<option value="${weeks.weekCode}" title="${weeks.title}">${weeks.weekDesc}</option>
										</c:forEach>
									</select>
								</div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label for="department" title="${properties.Department}">Department</label>
									<select class="selectOptions" id="departmentInDisplayReport" name="department">
										<option value="Select">Select</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>

									</select>
									<div class="searchByOptions onlyCheckbox">
										<input type="checkbox" name="depH" value="depH" id="depH"><label
											for="depH" class="labelText">Select Sub-Category from
											Hierarchy</label>
									</div>
									<!-- End of search options -->


								</div>
								<!-- End of parameter -->


								<input type="hidden" class="hierarchyname" id="hierarchyname"
									value="" />
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
											<span id="subCatTotal" class="totalCount hideBlock"> <label>Total:<strong
													id="subTotal"></strong></label>
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



								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
							
						</form:form>

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

					<div class="articleHead">
						<div class="articleHeaderWrapper">
							<h2 class="articleTitle">In-Store Display Report</h2>
							<p>
								<label class="articlePriceLabel todayDate">Today's Date:
									<strong></strong>
								</label> <label class="articlePriceLabel">|</label> <label
									class="articlePriceLabel promotionFor">Promotions For:
									<strong></strong>
								</label><br> <br> <label class="articlePriceLabel deptPage">Department:
									<strong></strong>
								</label> <label class="articlePriceLabel catPage hideBlock">|</label> <label
									class="articlePriceLabel catPage hideBlock">Category: <strong></strong>
								</label> <label class="articlePriceLabel subCatPage hideBlock">|</label>
								<label class="articlePriceLabel subCatPage hideBlock">Sub-Category:
									<strong></strong>
								</label> <label class="articlePriceLabel segPage hideBlock">|</label> <label
									class="articlePriceLabel segPage hideBlock">Segment: <strong></strong>
								</label>
							</p>
							<input type="hidden" id="promStartDate"> <input
								type="hidden" id="promEndDate">
						</div>
						<div class="articleActionBtns">

							<!-- <label onclick="inStoreDisplayReportPrint();" class="actionBtn">  -->
							<label onclick="instoreDisplayReportPrintPDF();" class="actionBtn">
							
							<label
								class="print">Print</label></label>
						</div>
					</div>
					<div class="ContentTableWrapper" id="instoreReport">

						<div class="tableInfo">

							<div class="tableTitle">
								<h4 class="sectionTitle totalRecCount">
									Total <strong> </strong> records found
								</h4>
							</div>
							<!-- End of table title -->
							<div class="paginationWrapper  paginationDivRefund paginationDiv"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of table info -->

						<div id="scrollBtns" class="tableScroller">
							<ul>
								<li id="previous-column" class="scrollLeft"><a href="#"></a></li>
								<li id="next-column" class="scrollRight"><a href="#"></a></li>
							</ul>
						</div>
						<div id="scrollTable" class="scrollTableContainer">
							<div id="scrollWindow" class="scrollWindow">
								<table cellspacing="0" class="ContentTable"
									id="instorePromoReportTable">

									<thead>
										<tr>
											<th rowspan="2" class="">Article #</th>
											<th rowspan="2" class="" colspan="4" >Description</th>
											<th rowspan="2" class="centerValue columnDivider">UOM</th>
											<th colspan="4" class="centerValue columnDivider">Promotion</th>
											<th rowspan="2" class="centerValue columnDivider">Display</th>
											<th class="centerValue columnDivider">Forecast</th>


											<th colspan="3" class="centerValue columnDivider">Store</th>
											<th colspan="1" class="centerValue columnDivider">Source</th>
											<th rowspan="2" class="centerValue lastColumn" >Delivery
												Date</th>

										</tr>

										<tr class="subHeader">


											<th class="centerValue">Week</th>
											<th class="centerValue">Days</th>
											<th class="numberColumn">Price</th>
											<th class="numberColumn columnDivider">Savings</th>

											<th class="centerValue columnDivider">Promo</th>

											<th class="centerValue">Demand</th>
											<th class="centerValue">Display</th>
											<th class="centerValue columnDivider">Build</th>

											<th class="centerValue lastColumn">Supplier</th>
										</tr>

									</thead>
									<tbody>

									</tbody>


								</table>
							</div><!-- end of scroll window -->
						</div><!-- end of scroll table -->



					</div>
					<!-- end of report info -->

				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->
		</div>

		<input id="navBarHighlight" type="hidden" value="price" />
	</div>

	<%@include file="footer.jsp"%>

	<div id="printData" class="hideBlock">
		<div id="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
				class="depPrint"></label><label class="catPrint"></label><label
				class="scPrint"></label><label class="segPrint"></label> <label
				class="artPrint"></label><label class="artPrint"></label> <label
				class="supPrint"></label><label class="supPrint"></label>
		</div>
	</div>
</body>
</html>
