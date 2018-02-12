
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>


<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/daterangepicker.jQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/allocationOrderSearch.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>



<title>Insert title here</title>
</head>
<body>
	<div id="dialog-modal1" title="Order Enquiry">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order.</h4>

				<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->

				<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-siteSearchPop" title="Site Search Results">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Sales Orgs:</h3>
				<select class="selectOptions" name="selectHeight" id="selectHeight">
					<c:forEach items="${salesOrgTypes}" var="salesOrgTypes">
						<option value="${salesOrgTypes.salesOrgNO}"
							<c:if test="${salesOrgTypes.salesOrgNO==user.salesOrg}">selected</c:if>>${salesOrgTypes.salesOrgNO}
							| ${salesOrgTypes.salesOrgName}</option>
					</c:forEach>
				</select>
				<h3>Distance(km):</h3>
				<select class="selectOptions" id="distance">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				<h3>Max Results:</h3>
				<select class="selectOptions" id="resSize">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select> <label class="actionBtn popupSearchBtn" id="vendorbtn">Search
					Stores</label>
			</div>
			<!-- End of popup search wrapper -->

			<label id="siteError"></label>
			<div class="popupData" id="popupData3">
				<!-- End of content table wrapper -->
			</div>
			<!-- End of pop up data -->
		</div>
		<!-- End of popupContent -->
	</div>
	<%@include file="hierachyPopUp.jsp"%>
	<div id="dialog-modal" title="Verify Supplier">
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
</body>
</html>