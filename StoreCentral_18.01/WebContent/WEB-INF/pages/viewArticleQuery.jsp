<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>View Article Query</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/viewArticleQuery.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>


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
						<li class="detailsContent backButton brudcrumHide"><a
							href='#'>Article Query</a></li>
						<li class="detailsContent currentPage brudcrumHide">Query
							Details</li>
						<li class="currentPage lookupContent">Article Query</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label>
					<c:choose>
						<c:when test="${option == 'Y'}">
							<label class="secondaryActionBtn detailsContent brudcrumHide"
								onclick="backToSubmitQueryPage();">Back</label>
						</c:when>
						<c:otherwise>
							<label
								class="secondaryActionBtn backButton detailsContent brudcrumHide">Back</label>
						</c:otherwise>
					</c:choose>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form id="viewQuery" modelAttribute="viewQuery">

			<div class="contentWrapper lookup">

				<div class="lookupWrapper" id="lookupContainer">

					<div class="lookupTitleWrapper">
						<h2>Lookup</h2>
					</div>
					<!-- End of lookup title wrapper -->

					<div class="lookupParamWrapper">
						<input type="hidden" id="queryNo" value="${queryNo}" /> <input
							type="hidden" name="searchMode" value="N" id="advanceTab">
						<div class="searchBox AQMquery">
							<span> <input type="#" id="article" name="articleNo"
								class="textbox textboxDefaultText"
								placeholder="Search article by"> <input type="hidden"
								id="articleUom" value="" name="uom" />
							</span> <span> <input id="queryId" type="#" name="queryId"
								class="textbox textboxDefaultText secondCriteria"
								placeholder="Query ID">
							</span>
						</div>
						<!-- End of main search box -->
						<label class="actionBtn advanceSearchGo"
							onclick="javascript:advanceSearchGo();" id="articleGo">Go</label>

						<div class="searchByOptions">
							<input type="radio" name="searchByOptions" value="number"
								id="number" checked><label for="number"
								class="labelText">Number</label> <input type="radio"
								name="searchByOptions" value="description" id="description"><label
								for="description" class="labelText">Description</label> <input
								type="radio" name="searchByOptions" value="reference"
								id="reference"><label for="reference" class="labelText">EAN
								/ TUN / PLU</label>
						</div>
						<!-- End of search by options -->

						<div class="advancedParam hideBlock advancedSearchFormat"
							id="advDiv">


							<div class="parameter">
								<h3>Status:</h3>
								<select class="selectOptions supplyDrop" id="queryStatus"
									name="queryStatus">
									<option value="Select">Select</option>
									<c:forEach items="${articleQueryStatusList}"
										var="articleQueryStatusList">
										<option id="${articleQueryStatusList.id}"
											value="${articleQueryStatusList.id}">${articleQueryStatusList.description}</option>
									</c:forEach>
								</select>
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3>Submitted By:</h3>
								<input type="#" id="submitBy" class="textbox textboxDefaultText"
									placeholder="" name="submitBy"> <label class="linkBtn"
									id="verifyUser"><label class="advancedSearch">Verify</label></label>

							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3>Submission Date:</h3>

								<input type="#" class="textbox textboxDefaultText inputDate"
									id="from" name="submitFromDate" value="" maxlength="10"
									placeholder="dd/mm/yyyy"> to <input type="#"
									class="textbox textboxDefaultText inputDate" id="to"
									name="submitToDate" value="" maxlength="20"
									placeholder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->





							<label class="actionBtn advanceSearchGo"
								onclick="javascript:advanceSearchGo();" id="advanceSearchGo">Go</label>

						</div>
						<!-- End of Advanced Param -->



					</div>
					<!-- End of lookup param wrapper -->


					<div class="lookupActionWrapper">
						<label class="linkBtn" id="advLink1"><label
							class="advancedSearch">Advanced Search</label></label> <label
							class="linkBtn hideBlock" id="closeLink"><label
							class="closeWindow">Close</label></label>
					</div>
					<!-- End of lookup action wrapper -->

					<!-- wrapper that handles the box under the advanced search form -->
					<div id="advWrapper"></div>

				</div>
				<!-- End of lookup wrapper -->

				<div class="ContentTableWrapper" id="reportContent">


					<div class="tableInfo no-data-message hideBlock tableStart">

						<div class="tableTitle nodataMessage hideBlock" id="errorMsgDiv">
							<h4 id="errorMsg">
								<c:if test="${not empty noResults}">${noResults}</c:if>
							</h4>

							<!-- End of table title -->



						</div>
						<div class="tableTitle totalRecord hideBlock">
							<h4>
								Total <strong id="totalRecord"></strong> queries found
							</h4>
						</div>
						<div class="paginationWrapper hideBlock paginationDiv"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>

					</div>


					<div class="tableFooter hideBlock">
						<!-- <div class="legend legentClass hideBlock">
							<label> Legend: <label class="GLindicator">Greenline
									Indicator </label>
							</label>
						</div> -->
						<div
							class="paginationWrapper bottomPagination hideBlock paginationDiv"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<!-- End of contentWrapper -->
			<div class="contentWrapper queryDetailsContent"></div>
		</form:form>

		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>

	<%@include file="footer.jsp"%>



	<div id="dialog-modalUser" title="View Article Query">
		<div class="popupContent">
			<div class="popupData">
				<h4 class="alertText" id="alertBox"></h4>
			</div>
			<!-- End of pop up data -->
			<div class="popupData">
				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modal2" title="Article Description">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Article Description:</h3>
				<input type="#" placeholder="Enter Article Description"
					class="textbox textboxDefaultText" id="vendorDesc2"> <label
					class="actionBtn" id="goButtonSample2">Go</label>
			</div>
			<!-- End of popup search wrapper -->
			<label id="nodataMsg"></label>
			<div class="popupData" id="popupDataDiv2"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>
		</div>
		<!-- End of popupContent -->

	</div>
	<div id="dialog-modal-user" title="User Details">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>User Details:</h3>
				<input type="#" placeholder="Enter user id/name"
					class="textbox textboxDefaultText" id="userField"> <label
					class="actionBtn" id="user_goBtn">Go</label>
			</div>
			<!-- End of popup search wrapper -->
			<label id="nodataMsg"></label>
			<div class="popupData" id="popupUserData"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>
		</div>
		<!-- End of popupContent -->

	</div>

</body>
</html>
