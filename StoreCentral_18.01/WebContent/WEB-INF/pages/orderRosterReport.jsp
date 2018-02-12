<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Order Roster</title>
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
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/orderRosterReport.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
	
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
			<input type="hidden" id="navBarHighlight" value="reports" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Order Roster</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn backButton">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->



		<form:form id="orderRosterForm" modelAttribute="orderRosterReport">

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3>Generate Order Roster Report</h3>
						<div>


							<div class="formWrapper">


								<div class="parameter">
									<label for="sourceOfSupply" class="mandatory">Source of
										Supply</label> <span class="reportRadio"> <input type="radio"
										name="sourceSupply" value="all" id="all" checked tabindex="3"><label
										for="all" class="labelText">All</label> <input type="radio"
										name="sourceSupply" value="warehouse" id="warehouse"
										tabindex="4"><label for="warehouse" class="labelText">Warehouse</label>
										<input type="radio" name="sourceSupply" value="vendor"
										id="vendor" tabindex="5"><label for="vendor"
										class="labelText">Vendor</label>
									</span>
									<!-- End of report radio -->



									<div class="parameter supplierSource IBTSource">

										<span id="allField"> <input type="#" class="textbox"
											style="visibility: hidden;">
										</span> <span id="warehouseField" class="hideBlock"> <input
											id="supplier" name="supplier" type="#"
											class="textbox verifySupplierWarehouse"
											placeholder="Enter warehouse no. or name"> <label
											class="linkBtn verifySupplier" id="verifySupplier"><label
												class="advancedSearch">Verify</label></label>
										</span>

									</div>
									<!-- End of parameter -->

								</div>
								<!-- End of parameter -->




								<div class="parameter">
									<label for="store" class="mandatory">Order Date</label> <input
										type="#" class="textbox defaultTextbox inputDate"
										name="fromDate" id="from" placeholder="dd/mm/yyyy"> to
									<input type="#" class="textbox defaultTextbox inputDate"
										name="toDate" id="to" placeholder="dd/mm/yyyy">
								</div>
								<!-- End of parameter -->



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

					<!-- <div class="ContentTableWrapper" id="errorContent">
					</div> -->


					<!-- For displaying report results -->
					<div class="ContentTableWrapper" id="reportContent">


						<div class="tableInfo hideBlock tableStart">

							<div class="tableTitle nodataMessage hideBlock" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
							<div class="tableTitle totalRecord hideBlock">
								<h4>
									Total <strong id="totalRecord"></strong> records found
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
							<div class="legend legentClass hideBlock">
								<label> Legend: <label class="advert">A</label><label
									class="" style="padding-right: 3px;">Advert </label><label
									class="restricted">R</label><label class="">Restricted
								</label><label class="GLindicator">Greenline Indicator </label>
								</label>
							</div>
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

	<div id="dialog-modal" title="Order Roster Report">
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
	<div id="dialog-supplier-verify" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of footer wrapper -->
</body>
</html>