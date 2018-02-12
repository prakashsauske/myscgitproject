<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Application Settings</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<!-- <link href="../../styles/home.css?version=${properties.version}" rel="stylesheet" type="text/css" /> -->
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/manageMenu.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/manageRole.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/manageFunction.js?version=${properties.version}"></script>
</head>
<body>


	<div class="mainWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Application Settings</li>
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

		</div>
		<!-- End of head wrapper -->
		<form id="applicationSettings" method="get" action="#">

			<div class="contentWrapper directContent settings">



				<!-- For displaying report results -->
				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4>
								<strong>Application Settings</strong>
							</h4>
						</div>
						<!-- End of table title -->


					</div>
					<!-- End of table info -->


					<div id="tabs">

						<ul>
							<c:forEach items="${salesOrgMap}" var="salesOrgMap">
								<li><a href="#tabs-${salesOrgMap.key}"
									onclick="deselectCheckBoxes(${salesOrgMap.key});">${salesOrgMap.value}</a></li>
							</c:forEach>
						</ul>

						<c:forEach items="${salesOrgMap}" var="salesOrgMap">
							<%-- <div id="tabs-${salesOrgMap.key}"></div> --%>

							<div id="tabs-${salesOrgMap.key}">
								<div class="innerSection">
									<h4 class="sectionTitle">

										<input type="radio" checked="checked" id="MM-${salesOrgMap.key}" value="MM-${salesOrgMap.key}"
											name="searchByOptions-${salesOrgMap.key}"><label class="labelText"
											for="MM-${salesOrgMap.key}">Manage Menu</label> <input type="radio" id="MF-${salesOrgMap.key}"
											value="MF-${salesOrgMap.key}" name="searchByOptions-${salesOrgMap.key}"><label
											class="labelText" for="MF-${salesOrgMap.key}">Manage Functions</label> <input
											type="radio" id="MR-${salesOrgMap.key}" value="MR-${salesOrgMap.key}" name="searchByOptions-${salesOrgMap.key}"><label
											class="labelText" for="MR-${salesOrgMap.key}">Manage Roles</label>

									</h4>
								</div>
								<%@include file="manageMenu.jsp"%>
								<%@include file="manageFunction.jsp"%>
								<%@include file="manageRoles.jsp"%>


							</div>
						</c:forEach>
					</div>
					<!-- End of tabs -->
				</div>
				<!-- End of Content Table Wrapper-->
			</div>
		</form>
		<!-- End of content wrapper -->



	</div>
	<%@include file="footer.jsp"%>
	<%@include file="applicationSettingsPopUp.jsp"%>
	<%@include file="applicationSettingsData.jsp"%>



</body>
</html>