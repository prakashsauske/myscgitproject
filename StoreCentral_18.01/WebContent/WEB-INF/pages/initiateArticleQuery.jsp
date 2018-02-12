<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Submit Article Query</title>



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
	src="../../scripts/initiateArticleQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/descriptionPopup.js?version=${properties.version}"></script>



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
						<!-- <li><a href='#'>Stock Management</a></li>
						<li><a href='#'>Query Management</a></li> -->
						<li class="currentPage">Submit Article Query</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form id="submitQuery" modelAttribute="submitQuery">

			<div class="contentWrapper orderDetails">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">Submit Query</h4>
						</div>
						<!-- End of table title -->

					</div>
					<!-- End of table info -->
					<div class="subSectionWrapper">
						<!--<div class="subSectionTitle">
							<h5 class="subSection">Comments</h5>
						</div>-->
						<!-- End of sub section title -->
						<div class="subSectionContent">
							<textarea class="aqmComment" id="comments" maxlength="220"
								name="storeComment" placeholder="Enter your query here"></textarea>
						</div>
						<!-- End of sub section Content -->
					</div>

					<c:choose>
						<c:when test="${user.salesOrg =='1005'}">
							<div class="tableInfo">

								<div class="instructionalText instructionalTextLong">
									<label>Add Articles for Liquor Dept. or for Zero MPL
										and Exclusion Requests.</label>
								</div>

							</div>
						</c:when>
						<c:otherwise>
							<div class="tableInfo">&nbsp;</div>
						</c:otherwise>
					</c:choose>

					<div class="tableActionsBtnsWrapper">
						<div class="lookupActionWrapper">
							<label class="linkBtn" id="addActionBtn"><label
								class="addRow">Add Article</label></label>
							<div class="errorDiv errorMsgDiv hideBlock">
								<label id="errorMsg"></label> <label class="closeMessage">&nbsp;</label>
							</div>
						</div>
						<!-- End of lookup action wrapper -->


					</div>
					<!-- End of table actions btn wrapper -->

					<div class="tableActionsWrapper" id="tableAddAction">


						<div class="formWrapper">

							<div class="parameter">
								<label for="article">Article</label> <input type="#"
									class="textbox articleSearchText" id="article" name="articleNo"
									placeholder="Search article by" maxlength="20" tabindex="1">
								<div class="searchByOptions">
									<input type="radio" checked="" id="number"
										value="ArticleNumber" name="searchByOptions"><label
										class="labelText" for="number">Number</label> <input
										type="radio" id="description" value="Description"
										name="searchByOptions"><label class="labelText"
										for="description">Description</label> <input type="radio"
										id="reference" value="EAN" name="searchByOptions"><label
										class="labelText" for="reference">EAN</label>
								</div>
							</div>
							<!-- End of parameter -->
							<div class="parameter hideBlock">
								<h3>&nbsp;</h3>
								<input type="checkbox" name="rangedFlag" id="rangedFlag"
									value="Y" checked=""><label for="rangedFlag"
									class="labelText">Ranged Articles Only</label>

							</div>

							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd">Search & Add</label>
								<label class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of table Actions Wrapper -->

					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="defaultTable">
						<tbody>
							<tr>

								<th>Article #</th>
								<th>Description</th>
								<th>UOM</th>
								<th width="25%">Reason</th>
								<th width="20%">Comments</th>
								<th class="lastColumn centerValue" width="70px">Actions</th>
							</tr>

							<tr id="row-1">
								<td colspan="6">No articles added in the query</td>

							</tr>



						</tbody>
					</table>

				</div>
				<!-- End of content table wrapper -->

				<!-- End of sub section wrapper -->
				<div class="pageActions">
					<label class="actionBtn" id="submitQueryBtn"><label
						class="thumbUp">Submit Query</label></label> <label
						class="secondaryActionBtn" id="cancel">Cancel</label>
				</div>
				<!-- End of page actions-->


			</div>
		</form:form>

		<!-- End of content wrapper -->
		<div id="dialog-cancelOrder" title="Submit Article Query">
			<div class="popupContent">

				<div class="popupData">
					<h4 class="alertText" id="cancelId">Are you sure you want to
						cancel the order?</h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="confirmYES">Yes</label> <label class="secondaryActionBtn"
							id="confirmNO">No</label>
						</span>
					</div>
					<!-- End of popup actions-->
				</div>
				<!-- End of pop up data -->

			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End Cancel order popup -->
		<div id="dialog-modal2" class="dialog-modal2"
			title="Article Description"></div>
		<div id="dialog-modal" title="Submit Article Query">
			<div class="popupContent">

				<div class="popupData">

					<h4 class="alertText" id="alertBox"></h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							onclick="$('#dialog-modal').dialog('close')" id="okBtn">OK</label>
						</span>
					</div>
					<!-- End of popup actions-->



				</div>
			</div>
			<!-- End of popupContent -->
		</div>



		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>
	<%@include file="footer.jsp"%>

</body>
</html>
