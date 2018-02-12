<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Promotions Planning</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/promotions_jWizard.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/promotionsPlanning.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>

</head>
<body>


	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<input type="hidden" id="navBarHighlight" value="price" />
			<%@include file="header.jsp"%>


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>

						<li class="currentPage">Promotions Management</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn backBtn"
						onclick="javascript:window.location.href='../login/goingHome.htm'">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>

		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper directContent reportWrapper wizardPage">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4 class="sectionTitle">Plan your store promotions in 2
							steps!</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->

			</div>
			<!-- End of Content Table wrapper -->


			<div class="wizardContent">


				<form:form id="promotionsPlanning"
					modelAttribute="promotionsPlanning">
					<%@include file="promotionsLookup.jsp"%>
					<%@include file="promotionsDetails.jsp"%>

				</form:form>

				<!-- defect 14600 -->
				<div class="tableTitle errorDiv" id="newerrorMsgDiv"
					style="display: inline-block; float: left;">

					<h4 id="errorMsgText"></h4>
				</div>

			</div>

			<!-- End of wizard content -->




		</div>

		<!-- End of content wrapper -->
	</div>
	<%@include file="footer.jsp"%>

	<%@include file="promotionsPopup.jsp"%>



</body>
</html>
