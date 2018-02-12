<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<title>AUTOSTOCKR Planned Forecast</title>
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
	src="../../scripts/plannedOrdersReport.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>

</head>
</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Planned Forecast Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label id="statusImg" class="loading hideBlock">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form name="plannedOrder" id="plannedOrder"
			modelAttribute="hierachyParam" action="zeroMPLReport.htm"
			method="GET">

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion" class="ui-accordion ui-widget ui-helper-reset"
						role="tablist">

						<h3
							class="mainAccordion ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active ui-corner-top"
							role="tab" id="ui-accordion-accordion-header-0"
							aria-controls="ui-accordion-accordion-panel-0"
							aria-selected="true" tabindex="0">
							<span
								class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>
							Generate Planned Forecast Report
						</h3>
						<div
							class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
							id="ui-accordion-accordion-panel-0"
							aria-labelledby="ui-accordion-accordion-header-0" role="tabpanel"
							aria-expanded="true" aria-hidden="false" style="display: block;">

							<div class="formWrapper">



								<div class="hierarchyWrapper clearfix" id="articleHierarchy">

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


						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->


					<!-- For displaying report results -->
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
					<div id="reportContent" class="hideBlock ContentTableWrapper">

						<div class="tableInfo">

							<div class="tableTitle">
								<h4>
									Total <strong>50</strong> articles with no. of planned
									forecast.
								</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="zeromplPrint();"><label
									class="print">Print</label></label>
							</div>
							<div class="paginationWrapper  paginationDiv" id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of table info -->

						<table cellspacing="0" class="ContentTable actionRows">
						</table>
						<div class="paginationWrapper bottomPagination paginationDiv"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</div>
					<!-- End of Content Table Wrapper-->
				</div>
				<!-- End of article Additional Info -->
			</div>
			<!-- End of content wrapper -->
		</form:form>


		<input id="navBarHighlight" type="hidden" value="reports" />


	</div>
	<%@include file="footer.jsp"%>
	<div id="printData" class="hideBlock">
		<div id="printbody">
			<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />

			<div class="width100" style="">
				<div class="width70   reportName bold inline-block">Zero MPL
					Report</div>
				<div style="width: 25%" class="width25  right">
					<div class="  margin5 text-align-right ">${user.siteNo} |
						${user.siteName}</div>
				</div>
				<div class="width70 margin5 margontopnone inline-block">
					<label class="">Created on: </label><label class="currentDate"></label>
				</div>
			</div>
			<table cellspacing="0" class="ContentTable actionRowPrint">
			</table>

			<div style="height: 30px !important" id="foot" class=" width98">
				<div class="width48 margin5 inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="width48  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="totalpage"></label> of <label class="totalpage"></label>
					</div>
				</div>
			</div>
		</div>

	</div>

</body>
</html>