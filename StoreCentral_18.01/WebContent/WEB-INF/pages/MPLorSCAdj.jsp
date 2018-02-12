<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>MPL / SC Adjustment</title>
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
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/MPLorSCAdj.js?version=${properties.version}"></script>


</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="showBrudcrum brudcrumHide" onclick="showLookup();"><a
							href="#">MPL / SC Adjustment</a></li>
						<li class="currentPage showBrudcrum brudcrumHide">MPL / SC
							Update</li>
						<li class="currentPage hideBrudcrum">MPL / SC Adjustment</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn showHome" id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<form:form id="sohSubmit" action="" modelAttribute="MPorSCAdj">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Search</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">


					<div class="searchBox">

						<span id="numberInputs"> <input type="#"
							class="textbox textboxDefaultText"
							placeholder="Search article by" name="articleNo" id="articleNo"
							maxlength="20" value="">
						</span>


					</div>
					<!-- End of main search box -->
					<label class="actionBtn" id="sohSearch">Go</label>
					<div class="searchByOptions">
						<input type="radio" name="articleType" value="ArticleNumber"
							id="ArticleNumber" checked="checked"><label
							for="ArticleNumber" class="labelText">Number</label> <input
							type="radio" name="articleType" value="Description"
							id="Description"><label for="Description"
							class="labelText">Description</label> <input type="radio"
							name="articleType" value="EAN" id="EAN"><label for="EAN"
							class="labelText">EAN / TUN / PLU</label>
					</div>
				</div>
			</div>


			<div class="contentWrapper ContentTableWrapper " id="content">
				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">
						<h4 id="msg">
							<c:if test="${not empty noDataFound}">${noDataFound}</c:if>
						</h4>

						<!-- End of table title -->
					</div>
				</div>
			</div>
			<!-- End of content wrapper -->
		</form:form>

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
		<div id="dialog-modal2" title="Article Description">
			<div class="popupContent">
				<div class="popupSearchWrapper" id="popupSearch">
					<h3>Article Description:</h3>
					<input type="#" placeholder="Enter supplier name"
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
		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>
	<%@include file="footer.jsp"%>

</body>
</html>