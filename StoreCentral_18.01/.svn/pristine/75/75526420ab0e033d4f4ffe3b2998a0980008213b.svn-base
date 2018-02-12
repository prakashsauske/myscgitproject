<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Promotion Article Review</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/articleReview.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.btechco.excelexport.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.base64.js?version=${properties.version}"></script>
</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="price" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Promotion Article Review</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn backButton"
						onclick="javascript:window.location.href='../login/goingHome.htm'">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->


		<form:form id="promArticleReview" modelAttribute="promArticleReview">

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">
						<h3 class="mainAccordion">Generate Article Review Report</h3>
						<div>


							<div class="formWrapper">
								<!-- 	<div class="parameter">
									<label for="department">Store</label> <select
										class="selectOptions">
										<option>All</option>
										<option>Store 1</option>
										<option>Store 2</option>
										<option>(list of all stores user has access)</option>
									</select>
								</div> -->
								<!-- End of parameter -->


								<div class="hierarchyWrapper clearfix" id="articleHierarchy">

									<div class="hierarchyContent" id="deptDiv">

										<div class="hierarchyTitle">
											<h3>Banner</h3>
										</div>
										<!-- End of hierarchy Title -->

										<div class="hierarchyList">

											<ul id="deptlst">
												<c:forEach items="${salesOrgMap}" var="salesOrgMap">
													<%-- <option id="${salesOrgMap.key}" value="${salesOrgMap.key}">${salesOrgMap.value}</option> --%>
													<li><input class="department" type="radio"
														name="departmentList" value="${salesOrgMap.key}"
														data-tt-id="1" id="${salesOrgMap.key}"> <label
														for="${salesOrgMap.key}" class="labelText">${salesOrgMap.value}</label></li>
												</c:forEach>
												<%-- <li><input class="department" type="radio"
													name="departmentList" value="${user.salesOrg}" data-tt-id="1" id="${user.salesOrg}">
													<label for="${user.salesOrg}" class="labelText">${user.salesOrg}</label></li> --%>
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
											<h3>State</h3>
										</div>
										<!-- End of hierarchy Title -->

										<div class="hierarchyList">

											<div class="noSelection" id="noSelectionCat">
												<label>Please select a Banner</label>
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
											<h3>Region</h3>
										</div>
										<!-- End of hierarchy Title -->

										<div class="hierarchyList">

											<div class="noSelection" id="subCat">
												<label>Please select a State</label>
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
											<h3>Area</h3>
										</div>
										<!-- End of hierarchy Title -->



										<div class="hierarchyList">

											<div class="noSelection" id="segment">
												<label>Please select a Region</label>
											</div>
											<!-- End of -->

											<label class="loading hideBlock">&nbsp;</label>
											<div id="segMentDiv">
												<ul class="hideBlock" id="segmentLst">
	
												</ul>
											</div>
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

								<br />
								<div class="parameter">
									<label for="article" class="mandatory">Article</label> <input
										type="#" class="textbox articleSearchText" name="articleNo"
										id="article" placeHolder="Search article by" tabindex="1">
									<div class="searchByOptions">
										<input type="radio" checked="" id="number" value="number"
											name="searchByOptions"><label class="labelText"
											for="number">Number</label> <input type="radio"
											id="description" value="description" name="searchByOptions"><label
											class="labelText" for="description">Description</label> <input
											type="radio" id="reference" value="reference"
											name="searchByOptions"><label class="labelText"
											for="reference">EAN</label>
										<!-- <input type="hidden" id="articleNumber" value="" name="articleNo" />
											<input type="hidden" id="articleUom" value="" name="uom" /> -->
									</div>
								</div>
								<!-- End of parameter -->


								<div class="parameter">
									<label for="date">Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="startDate"
										id="from" placeholder="dd/mm/yyyy">
								</div>
								<!-- End of parameter -->




								<div class="formActions">

									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
							<!-- End of content table wrapper -->


						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->

					<!-- <div class="ContentTableWrapper" id="errorContent">
					</div> -->


					<!-- For displaying report results --><!-- /* Fix for defect no 14637 added promArticleReview*/ -->
					<div class="ContentTableWrapper promArticleReview" id="reportContent">


						<div class="tableInfo tableStart">

							<div class="tableTitle nodataMessage hideBlock" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
							<div class="tableTitle totalRecord hideBlock width100">
								<h4 class="inlineBlock">
									Total <strong id="totalRecord"></strong> results found for '<strong
										class="searchString"></strong>'
								</h4>
								<label class="btnExport floatRight actionBtn"
									id="generateReport">Export</label>
								<div
									class="paginationWrapper hideBlock ar-page ptop5 paginationDiv"
									id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
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
						<div id="scrollTable" class="scrollTableContainer">
							<div id="scrollWindow" class="scrollWindow">
								<table id="tblExport" cellspacing="0"
									class="ContentTable resultContent hideBlock">
									<tr>
										<th class="columnDivider" rowspan="2">Store</th>
										<th class="columnDivider centerValue" colspan="4">Promotion</th>
										<th class="columnDivider centerValue" colspan="2">Advertising</th>
										<th class="columnDivider centerValue" colspan="2">Unit
											Info</th>
										<th class="columnDivider centerValue" colspan="1">Promotion</th>
										<th class="columnDivider centerValue" colspan="3">Store</th>
										<th class="lastColumn centerValue" colspan="2">Supply</th>
									</tr>

									<tr class="subHeader auditContent">
										<th>Week</th>
										<th>Days</th>
										<th class="numberColumn">Price</th>
										<th class="numberColumn">Saving</th>
										<!-- <th class="columnDivider">Details</th> -->
										<th class="centerValue">Display</th>
										<th class="columnDivider centerValue">Media</th>
										<th class="centerValue">UOM</th>
										<th class="columnDivider centerValue">OM</th>
										<th class="columnDivider centerValue">Forecast</th>
										<th class="centerValue">Demand</th>
										<th class="centerValue">Display</th>
										<th class="centerValue columnDivider">Build</th>
										<th>Source</th>
										<th class="lastColumn">Delivery Date</th>

									</tr>

								</table>
							</div>
						</div>
						<div class="tableFooter">
							<!-- 	<div class="legend legentClass hideBlock">
								<label> Legend: <label class="GLindicator">Greenline
										Indicator </label>
								</label>
							</div> -->
							<div
								class="paginationWrapper bottomPagination ar-page hideBlock paginationDiv"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
					</div>


					<!-- End of Content Table Wrapper-->



				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

		</form:form>

	</div>
	<%@include file="footer.jsp"%>
	<div id="dialog-modal" title="Promotion Article Review">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox"></h4>



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						onmousedown="$( '#dialog-modal' ).dialog( 'close' );" id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->



			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modal2" class="dialog-modal2"
		title="Article Description">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning hideBlock">
					Selected supplier: <strong class="vend-name"></strong>
				</h4>

				<label class="linkBtn"><label class="unselect hideBlock">Unselect
						Supplier</label></label>

			</div>
			<!-- End of pop up data -->

			<label id="nodataMsg"></label>
			<div class="popupData" id="popupDataDiv2">
				<div class="tableInfo">

					<div class="">
						<h4>
							Total <strong class="total-count-list"></strong> results found
							for '<strong class="searchString"></strong>'
						</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->
			</div>
			<!-- End of pop up data -->

			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr class="descContent">
						<th>Article #</th>
						<th>Description</th>
						<th>UOM</th>
						<th width="40px" class="centerValue lastColumn">Select</th>
					</tr>
				</table>
			</div>
			<!-- End of content table wrapper -->
			<div class="popupActionsWrapper">
				<label><strong>Note:</strong> You need to create an order
					for single supplier.</label> <span class="popupActions"> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-modal2').dialog('close');">Cancel</label> <label
					class="actionBtn addToList hideBlock linkBtn2"
					onclick="$('#dialog-modal2').dialog('close');addToList();">Add
						to Order List <span class="list-count hideBlock"></span>
				</label>

				</span>
			</div>
			<!-- End of popup actions-->
		</div>
	</div>
	<!-- End of footer wrapper -->

</body>
</html>