<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Nearby Stores</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/nearByStoreSearch.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">

			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="lookUp" />


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li><a href="../article/onPageLoadArticleScreen.htm">Lookup
								Articles</a></li>
						<li><a href='../article/onPageLoadArticleDetail.htm'>Article
								Details</a></li>
						<li class="currentPage">Nearby Stores</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn secondaryActionBtnBack">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->




		</div>
		<!-- End of head wrapper -->




		<div class="contentWrapper lookup">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4>
							Nearby Stores for '<strong>${model.param.articleNo} -
								${model.param.articleName}</strong>'
						</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->


				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label
							class="filter">Refine Search</label></label>
						<div class="errorDiv" id="errorMsgDiv">
							<c:if test="${not empty msg}">
								<label id="msg">${msg} </label>
							</c:if>
						</div>

					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form action="requestNearbyStoreSearch.htm" method="POST"
						id="NearbyStoreSearchForm">
						<input type="hidden" id="index" name="index" /> <input
							type="hidden" value="${model.param.articleNo}" name="articleNo"
							id="articleNo" /> <input type="hidden"
							value="${model.param.articleName}" name="articleName"
							id="articleName" /> <input type="hidden" id="articleBaseUom"
							name="articleBaseUom" value="${model.articleBaseUom}" /> <input
							type="hidden" id="checkedValues" name="checkedValues"
							value="${model.param.checkedValues}" /> <input type="hidden"
							id="retainSalesOrg" name="retainSalesOrg"
							value="${user.salesOrg}" />
						<div class="formWrapper">

							<div class="parameter">
								<label for="store">Store #</label> <input type="#"
									class="textbox  siteNoField"
									placeholder="Enter store no or name" name="siteNo" id="siteNo"
									value="${model.param.siteNo}" maxlength="10">

							</div>
							<!-- End of parameter -->

							<div class="parameter dropdownAlign">
								<%
									int j = 1;
								%>
								<label for="salesOrg">Sales Org.</label>

								<div id="dropdown" class="selectDropdown">

									<label id="dropdownSelect" class="selectLabel">${model.param.salesOrgLabel}</label>


									<ul class="dropdown">


										<c:forEach items="${salesOrgTypes}" var="salesOrgTypes">




											<li><input type="checkbox" id="store-<%= j %>"
												name="salesOrg" style="right: 3px;" value="${salesOrgTypes.salesOrgNO}"
												<c:if test="${salesOrgTypes.checked=='Y'}">checked</c:if>>
												<label class="dropdownLabel" style="padding-right: 15px;padding-left: 10px!important;" for="=" store-<%=j++%>">${salesOrgTypes.salesOrgNO}
													| ${salesOrgTypes.salesOrgName}</label></li>
										</c:forEach>
										<li style="float:right; ">
										<label
											id="dropdownDoneBtn" class="actionBtn dropdownActions">Done</label>
										<label class="secondaryActionBtn dropdownActions"
											id="dropdownCancelBtn" style="display:inline-block;">Cancel</label> 


										</li>
									</ul>
								</div>

							</div>
							<!-- End of parameter -->
							<!-- End of parameter -->



							<div class="parameter">
								<label for="distance">Distance</label> <select
									class="selectOptions" name="distance" id="distance"
									value="${model.param.distance}">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
									<option value="80">80</option>
									<option value="100">100</option>
								</select> <label for="">KM</label>
							</div>

							<div class="parameter">
								<label for="numStores">Max No. of Stores</label> <select
									class="selectOptions" name="maxStores" id="maxStores"
									value="${model.param.maxStores}">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
									<option value="80">80</option>
									<option value="100">100</option>
								</select>
							</div>

							<div class="formActions">
								<label class="actionBtn" id="search">Search</label> <label
									class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>

						<!-- End of content table wrapper -->
						<input type="hidden" value="${model.param.salesOrg}"
							id="dropretainSalesOrg" /> <input type="hidden"
							value="${model.param.maxStores}" id="dropretainMaxStore" /> <input
							type="hidden" value="${model.param.distance}"
							id="dropretainDistance" />
					</form>

				</div>


				<!-- End of table Actions Wrapper -->
				<%
					int i = 0;
				%>
				<c:if test="${not empty nearbyStoreSearchInfo}">


					<table cellspacing="0" class="ContentTable sortTable actionRows  ">
						<thead>
							<tr class="collapsed">
								<th data-sort="int">Store #</th>
								<th data-sort="string">Store Name</th>
								<th data-sort="float"
									class="numberColumn ${properties.ViewSOHofotherstores}">Stock
									on Hand</th>
								<th data-sort="float"
									class="numberColumn ${properties.ViewSellPriceofotherstores}">Sell
									Price</th>
								<th data-sort="float" class="numberColumn">Promo Price</th>
								<th class="numberColumn ${properties.ViewRangingofotherstores}">Ranged</th>
								<th data-sort="float" class="numberColumn">Distance KM</th>
							</tr>
						</thead>
						<tbody>

							<!-- onclick="navigateToDetail();"-->
							<c:forEach items="${nearbyStoreSearchInfo}"
								var="nearbyStoreSearchInfo">
								<tr>
									<td>${nearbyStoreSearchInfo.siteNo}</td>
									<td>${nearbyStoreSearchInfo.siteName}</td>
									<td
										class="${properties.ViewSOHofotherstores} numberColumn <c:if test="${model.articleBaseUom!='KG'}">trimDecimalForSoh</c:if>">${nearbyStoreSearchInfo.stockOnHand}</td>
									<td
										class="numberColumn ${properties.ViewSellPriceofotherstores}">${nearbyStoreSearchInfo.stdSellPrice}</td>
									<td class="numberColumn">${nearbyStoreSearchInfo.promoSellPrice}</td>
									<c:if test="${nearbyStoreSearchInfo.rangedFlag == 'Y'}">
										<td
											class="numberColumn ${properties.ViewRangingofotherstores}"><label
											class="positiveStatus">&nbsp;</label></td>
									</c:if>
									<c:if
										test="${nearbyStoreSearchInfo.rangedFlag == 'N' || nearbyStoreSearchInfo.rangedFlag == ''}">
										<td
											class="numberColumn ${properties.ViewRangingofotherstores}"><label
											class="negativeStatus">&nbsp;</label></td>
									</c:if>
									<td class="numberColumn lastColumn">${nearbyStoreSearchInfo.proximity}</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</c:if>
			</div>
			<!-- End of content table wrapper -->



		</div>
		<!-- End of content wrapper -->




	</div>
	<%@include file="footer.jsp"%>
	<%@include file="storeVerifyPopUp.jsp"%>

</body>
</html>
