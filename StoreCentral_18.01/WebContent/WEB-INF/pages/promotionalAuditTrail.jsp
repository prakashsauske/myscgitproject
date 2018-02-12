<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Promotional Audit Trail</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/auditTrail.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/timezone/moment.js?version=${properties.version}"></script>
	<script type="text/javascript"
	src="../../scripts/timezone/moment-timezone-with-data.min.js?version=${properties.version}"></script>
	
</head>
<body>
	<input type="hidden" name="latitude" id="latitude"	value="${user.latitude}" />
	<input type="hidden" name="longitude" id="longitude"	value="${user.longitude}" />
	
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="price" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Promotional Audit Trail</li>
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


		<form:form id="auditTrail" modelAttribute="auditTrail">

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3>Generate Promotional Audit Trail Report</h3>
						<div>


							<div class="formWrapper">


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
											type="radio" id="reference" value="EAN"
											name="searchByOptions"><label class="labelText"
											for="reference">EAN</label>
									</div>
								</div>
								<!-- End of parameter -->


								<div class="parameter">
									<label for="date">Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="startDate"
										id="from" placeholder="dd/mm/yyyy"> to <input type="#"
										class="textbox defaultTextbox inputDate" name="endDate"
										id="to" placeholder="dd/mm/yyyy">
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


					<!-- For displaying report results -->
					<div class="ContentTableWrapper" id="reportContent">


						<div class="tableInfo tableStart">

							<div class="tableTitle nodataMessage hideBlock" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
							<div class="tableTitle totalRecord hideBlock">
								<h4>
									Total <strong id="totalRecord"></strong> results found for '<strong
										class="searchString"></strong>'
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
						<table cellspacing="0"
							class="ContentTable resultContent hideBlock">
							<tr>
								<th class="columnDivider" rowspan="2">Week Start Date</th>
								<th class="columnDivider centerValue" colspan="2">Store
									Demand</th>
								<th class="columnDivider centerValue" colspan="2">Display
									Qty.</th>
								<th class="columnDivider centerValue" colspan="2">Build
									Qty.</th>
								<th rowspan="2">User ID</th>
								<th rowspan="2" class="columnDivider">User Name</th>
								<th class="lastColumn" rowspan="2">Modifled On</th>
							</tr>
							<tr class="subHeader auditContent">
								<th>Old</th>
								<th class="columnDivider">New</th>
								<th>Old</th>
								<th class="columnDivider">New</th>
								<th>Old</th>
								<th class="columnDivider">New</th>

							</tr>
						</table>

						<div class="tableFooter">
							<!-- 	<div class="legend legentClass hideBlock">
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

					<!-- End of Content Table Wrapper-->



				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

		</form:form>

	</div>
	<%@include file="footer.jsp"%>
	<div id="dialog-modal" title="Promotional Audit Trail Report">
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