<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Produce Load List</title>
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
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/produceLoadList.js?version=${properties.version}"></script>

</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="reports" /> <input
				type="hidden" id="listCount" name="listCount"
				value='<c:if test="${not empty produceLoadListInfo}">${produceLoadListInfo.size()}</c:if>' />


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Produce Load List</li>
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




		<div class="contentWrapper reportWrapper">





			<div class="articleAdditionalInfo">



				<div id="accordion">

					<h3>Generate a Load List Report</h3>
					<div>

						<form action="requestProduceLoadListSearch.htm"
							id="produceLoadListForm" method="post">
							<input type="hidden" id="index" name="index" /> <input
								type="hidden" id="currPage" name="currPage"
								value="${currentPage}" />

							<div class="formWrapper">

								<div class="parameter">
									<label for="article">Warehouse</label> <input type="#"
										class="textbox" placeholder="Enter supplier no. or name"
										name="suppNo" value="${produceParam.warehouseNo}"
										maxlength="20" id="supplier"> <label class="linkBtn"><label
										class="advancedSearch" id="verifySupplier">Verify</label></label>
								</div>

								<div class="parameter hideBlock">
									<h3>Source of Supply:</h3>
									<input type="radio" value="all" name="sourceSupply" id="All"><label
										for="All" class="labelText">All</label> <input type="radio"
										name="sourceSupply" checked value="warehouse" id="warehouse"><label
										for="warehouse" class="labelText">Warehouse</label> <input
										type="radio" name="sourceSupply" value="vendor" id="vendor"><label
										for="vendor" class="labelText" id="vendorText">Vendor</label>
								</div>

								<!-- End of parameter -->

								<%-- <div class="parameter">
									<h3>Supplier:</h3>
									<input type="#" class="textbox"
										placeholder="Enter supplier no. or name" name="suppNo" value="${produceParam.warehouseNo}" maxlength="20"
										id="supplier" readonly="readonly"> <label
										class="linkBtn"><label class="advancedSearch"
										id="verifySupplier">Verify</label></label>
								</div> --%>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="store">Roster Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" id="rosterDate"
										placeholder="dd/mm/yyyy" value="${produceParam.rosterDate}"
										maxlength="10" name="rosterDate">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="store">Store</label> <input type="#"
										class="textbox" id="storeNo" value="${produceParam.storeNo}"
										maxlength="20" name="storeNo" placeholder="Enter store number"
										onkeypress="return isNumberKey(event)">
								</div>
								<!-- End of parameter -->




								<div class="parameter">
									<label for="store">Order #</label> <input type="#"
										class="textbox defaultTextbox numberBox" id="storeOrder"
										placeholder="Enter order number" name="storeOrder"
										maxlength="20" value="${produceParam.storeOrder}"
										style="text-align: left;"
										onkeypress="return isNumberKey(event)">
								</div>
								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form>

					</div>
					<!-- End of div for jQuery handling -->


				</div>
				<!-- End of ui-accordion -->

				<div class="ContentTableWrapper">
					<div class="tableInfo">
						<div class="tableTitle nodataMessage" id="errorMsgDiv">

							<h4 id="msg" style="">
								<c:if test="${empty produceLoadListInfo}">
									<c:if test="${not empty noData}">${noData}</c:if>
								</c:if>
							</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->
				</div>
				<!-- End of Content Table Wrapper -->

				<div class="ContentTableWrapper clearfix" id="data">
					<div class="tableInfo">

						<div class="tableTitle">
							<h4>
								<c:if test="${not empty produceLoadListInfo}">
									Total <strong>${produceLoadListInfo.size()}</strong> orders found
								</c:if>
							</h4>
						</div>
						<!-- End of table title -->
						<div class="paginationWrapper paginationDiv">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>

						</div>
						<!-- End of pagination Wrapper -->



					</div>
					<!-- For displaying report results -->


					<%
						int i = 0;
					%>
					<c:if test="${not empty produceLoadListInfo}">


						<!-- End of table info -->

						<table cellspacing="0" class="ContentTable actionRows noTableSort">
							<tr>
								<th class="sorted">Order #</th>
								<th>Load List #</th>
								<th>Warehouse</th>
								<th>Store</th>
								<th>Roster Date</th>
								<th class="lastColumn ">Delivery Date</th>
							</tr>
							<c:set var="pageNo" value="1"></c:set>
							<c:set var="record" value="1"></c:set>
							<c:forEach items="${produceLoadListInfo}"
								var="produceLoadListInfo">
								<c:set var="key" value="${ produceLoadListInfo.key}"></c:set>
								<c:set var="value" value="${produceLoadListInfo.value}"></c:set>
								<tr onclick="navigateToDetail('${key}');"
									class="contentTr pageNo-${pageNo} <c:if test="${pageNo>1}">hideBlock</c:if>">
									<td class="sorted">${key}</td>
									<td>${value.get(0).loadlistNo}</td>
									<td>${value.get(0).warehouseNo} -
										${value.get(0).warehouseName}</td>
									<td>${value.get(0).storeNo}- ${value.get(0).storeName}</td>
									<td>${value.get(0).rosterDate}</td>
									<td class="lastColumn">${value.get(0).deliveryDate}</td>
								</tr>
								<c:if test="${record%10==0}">
									<c:set var="pageNo" value="${pageNo+1}"></c:set>
								</c:if>
								<c:set var="record" value="${record+1}"></c:set>
							</c:forEach>
						</table>




						<div class="paginationWrapper bottomPagination paginationDiv">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<!-- End of bottom pagination -->

					</c:if>
				</div>
				<!-- End of Content Table Wrapper-->







			</div>
			<!-- End of article Additional Info -->


		</div>
		<!-- End of content wrapper -->

	</div>
	<%@include file="footer.jsp"%>
	<%@include file="alertBox.jsp"%>
	<%@include file="verifyVendor.jsp"%>


</body>
</html>