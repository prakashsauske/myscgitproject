<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/daterangepicker.jQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/orderLookUp.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>



<title>Order Lookup</title>
</head>
<body>

	<div class="mainWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="orders" />



			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Lookup Orders</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper hideBlock" id="statusImg">
					<label class="loading">We are getting data, please wait</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->




		<div class="contentWrapper order">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">
					<form action="basicOrderSearch.htm" id="orderSearchSubmit"
						method="post">
						<input type="hidden" value="${user.salesOrg}" id="userSalesOrg"
							name="userSalesOrg" /> <input type="hidden" value='${userList}'
							id="userList" name="userList" /> <input type="hidden"
							value='${masterList}' id="masterList" name="masterList" /> <input
							type="hidden" id="index" name="index" /> <input type="hidden"
							id="dropdown" name="dropdown" /> <input type="hidden"
							id="suppName" name="suppName" /> <input type="hidden"
							id="suppNo" name="suppNo" /> <input type="hidden"
							id="storeCheck" name="storeCheck" /> <input type="hidden"
							id="deliveryToDate" name="deliveryToDate" value="" /> <input
							type="hidden" id="paramRetain" name="paramRetain"
							value="${paramRetain}" /> <input type="hidden" id="listCount"
							name="listCount" value="${model.param.recordCount}" /> <input
							type="hidden" id="pageNumber" name="pageNumber"
							value="${model.param.pageNo}" />


						<div class="searchBox">

							<span id="numberInputs"> <input type="#"
								class="textbox textboxDefaultText" name="orderNo"
								placeholder="Search order by" maxlength="20" id="orderNo"
								value="${model.param.orderNo}">
							</span> <span class="hideBlock" id="typeInputs"> <select
								class="selectOptions" name="orderType" id="orderType">
									<option value="0">Select</option>
									<c:if test="${not empty orderTypes}">
										<c:forEach items="${orderTypes}" var="orderVal">
											<option value="${orderVal.orderType}">${orderVal.orderDescription}</option>
										</c:forEach>
									</c:if>
							</select> <input type="#" class="textbox textboxDefaultText inputDate"
								placeholder="Delivery date" name="deliveryFromDate"
								maxlength="20" id="deliveryFromDate">
							</span>

						</div>
						<!-- End of main search box -->
						<label class="actionBtn goButton" id="normalSearch">Go</label>


						<div class="searchByOptions">
							<input type="radio" name="searchByOptions" value="number"
								id="number" checked><label for="number"
								class="labelText">Number</label>

							<!-- <input type="radio" name="searchByOptions" value="refNumber" id="refNumber" name="refNumber"><label for="refNumber" class="labelText">Order Ref.#</label> -->


							<input type="radio" name="searchByOptions" value="type" id="type"><label
								for="type" class="labelText">Type</label> <input type="radio"
								name="searchByOptions" value="PReq" id="PReq"><label
								for="PReq" class="labelText">PReq#</label>
						</div>
						<!-- End of search by options -->

						<div class="advancedParam hideBlock advancedSearchFormat"
							id="advDiv">

							<div class="parameter">
								<h3>Status:</h3>
								<select class="selectOptions" name="orderStatus"
									id="orderStatus" value="${model.param.orderStatus}">

									<option value="All">All</option>
									<option class="normal" value="Open">Open</option>
									<option class="normal" value="Authorised">Authorised</option>
									<option class="normal" value="Cancelled">Cancelled</option>
									<option class="normal" value="Received">Received</option>
									<option class="normal" value="Closed">Closed</option>

									<!-- 	<option class="allocation" value="Completed">Completed</option>
									<option class="allocation" value="Released">Released</option>
									<option class="allocation" value="Scheduled">Scheduled</option> -->
								</select>
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3>Delivery Date:</h3>
								<input type="#" class="textbox textboxDefaultText inputDate"
									maxlength="20" placeholder="dd/mm/yyyy" id="fromDate"
									name="fromDate" value=""> to <input type="#"
									class="textbox textboxDefaultText inputDate" id="toDate"
									name="toDate" value="" maxlength="20" placeholder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3>Roster Date:</h3>
								<input type="#" class="textbox textboxDefaultText inputDate"
									id="rosterFromDate" name="rosterFromDate" value=""
									maxlength="20" placeholder="dd/mm/yyyy"> to <input
									type="#" class="textbox textboxDefaultText inputDate"
									id="rosterToDate" name="rosterToDate" value="" maxlength="20"
									placeholder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->
							<%-- <div class="parameter">
								<h3>Department:</h3>
								<select class="selectOptions" id="department" name="department">
									<option value="Select">Select</option>
									<c:forEach items="${model.deptInfoList}" var="deptInfo">
										<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
									</c:forEach>

								</select> <label id="selectSubCat" class="linkBtn"> <label
									class="newWindow" id="deptHie">Hierarchy</label>
								</label>


							</div> --%>
							<div class="parameter">
								<h3>Source of Supply:</h3>
								<input type="radio" value="all" name="sourceSupply" id="All"
									checked><label for="All" class="labelText">All</label>
								<input type="radio" name="sourceSupply" value="warehouse"
									id="warehouse"><label for="warehouse" class="labelText">Warehouse</label>
								<input type="radio" name="sourceSupply" value="vendor"
									id="vendor"><label for="vendor" class="labelText"
									id="vendorText">Vendor</label>
							</div>

							<!-- End of parameter -->

							<div class="parameter">
								<h3>Supplier:</h3>
								<input type="#" class="textbox"
									placeholder="Enter supplier no. or name" maxlength="20"
									id="supplier" readonly="readonly"> <label
									class="linkBtn"><label class="advancedSearch"
									id="verifySupplier">Verify</label></label>
							</div>
							<!-- End of parameter -->

							<div class="parameter hideBlock">
								<h3>Supplier Name:</h3>
								<input type="#" class="textbox" id="samplePopupTest">
							</div>
							<!-- End of parameter -->

							<label class="actionBtn goButton" id="goButtonSample">Go</label>

						</div>
						<!-- End of Advanced Param -->
						<input type="hidden" id="retain-orderNo" name="retain-orderNo"
							value="${model.param.orderNo}" /> <input type="hidden"
							id="retain-dropdownType" name="retain-dropdown"
							value="${model.param.orderType}" /> <input type="hidden"
							id="retain-dropdownStatus" name="retain-dropdown"
							value="${model.param.orderStatus}" /> <input type="hidden"
							id="retain-fromDate" name="retain-fromDate"
							value="${model.param.fromDate}" /> <input type="hidden"
							id="retain-toDate" name="retain-toDate"
							value="${model.param.toDate}" /> <input type="hidden"
							id="retain-rosterFromDate" name="retain-rosterFromDate"
							value="${model.param.rosterFromDate}" /> <input type="hidden"
							id="retain-rosterToDate" name="retain-rosterToDate"
							value="${model.param.rosterToDate}" /> <input type="hidden"
							id="retain-supplierNo" name="retain-supplierNo"
							value="${model.param.suppNo}" /> <input type="hidden"
							id="retain-supplierName" name="retain-supplierName"
							value="${model.param.suppName}" /> <input type="hidden"
							id="retain-radioBtnArtType" name="retain-radioBtnArtType"
							value="${model.param.searchByOptions}" /> <input type="hidden"
							id="retain-radioBtnSupplier" name="retain-radioBtnSupplier"
							value="${model.param.srcOfSuppliy}" /> <input type="hidden"
							id="retain-paramRetain" name="retain-radioBtnSupplier"
							value="${model.param.paramRetain}" /> <input type="hidden"
							id="advanceFlag" name="advanceFlag" value="" /> <input
							type="hidden" id="storeOrVendor" name="storeOrVendor" value="" />
						<input type="hidden" id="retain-storeOrVendor"
							name="retain-storeOrVendor" value="${model.param.storeOrVendor}" />

						<input type="hidden" id="wareHouseFlag" name="wareHouseFlag"
							value="" /> <input type="hidden" id="retain-wareHouseFlag"
							name="retain-wareHouseFlag" value="${model.param.wareHouseFlag}" />
						<input type="hidden" id="retain-ibtFlag" name="retain-ibtFlag"
							value="${model.param.ibtFlag}" />

					</form>

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
				<div id="advWrapper" class="hideBlock">
					<label class="linkBtn hideBlock"> <a href="#"
						class="more bookmark" id="savedSearch">My saved search</a>
					</label>
				</div>




			</div>
			<%-- <c:if test="${not empty noResults}"> --%>
			<div class="ContentTableWrapper">
				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">
						<h4 id="errorMsg">
							<c:if test="${not empty noResults}">${noResults}</c:if>
						</h4>

						<!-- End of table title -->



					</div>
				</div>
				<%-- <div class="tableInfo">
			
					<div class="tableTitle nodataMessage">

						<h4 id="errorMsg" >${noResults}</h4>

					</div>
			</div> --%>
			</div>
			<!-- <div class="ContentTableWrapper" id="errorId" style="display:none">
			<div class="tableInfo">
			
					<div class="tableTitle nodataMessage" id="errorMsgDiv">

						<h4 id="errorMsg">
							
						</h4>

					</div>
			</div>
			</div> -->


			<!-- End of lookup wrapper -->
			<c:if test="${not empty orderList}">
				<div class="ContentTableWrapper" id="resultContent">

					<div class="tableInfo">
						<div class="tableTitle hideBlock">
							<h4>
								Total <strong>${model.param.recordCount}</strong> records found
								<label class="linkBtn hideBlock"> <a id="saveSearch"
									class="bookmark hideBlock" href="#">Save search</a>
								</label>
							</h4>
						</div>

						<div class="tableActionBtns">
							<label class="linkBtn"> <label
								class="tableSettings hideBlock">&nbsp;</label>
							</label>
						</div>
						<c:if test="${not empty orderList}">
							<c:if test="${model.param.recordCount >20}">
								<div class="paginationWrapper" id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</c:if>
						</c:if>
						<!-- End of pagination Wrapper -->


					</div>
					<!-- End of table info -->


					<div id="scrollBtns" class="tableScroller">
						<ul>
							<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a>
							</li>
							<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a>
							</li>
						</ul>
					</div>
					<!-- End scroller functions -->
					<div id="scrollTable" class="scrollTableContainer">
						<div id="scrollWindow" class="scrollWindow">

							<%
								int i = 0;
							%>

							<table cellspacing="0" class="sortTable ContentTable actionRows">
								<thead>
									<tr>
										<th data-sort="int" class="sorted ascending ORDR">Order/PReq
											#</th>
										<th data-sort="string " class="RDT">Roster Date</th>
										<th data-sort="string " class="DDT">Delivery Date</th>
										<th data-sort="string " class="OST">Status</th>
										<th data-sort="string " class="VNM">Vendor</th>
										<th data-sort="string " class="DEP">Department</th>
										<th data-sort="string " class="SEG">Segment</th>
										<th data-sort="string  " class="SRC">Source</th>
										<th data-sort="string " class="OTY">Type</th>
										<th data-sort="int" class="numberColumn TTC">Total
											Cartons</th>
										<th data-sort="int" class="lastColumn numberColumn TTP">Total
											Pallets</th>
									</tr>
								</thead>
								<tbody>
									<c:forEach items="${orderList}" var="orderDetail">

										<c:if
											test="${not empty orderDetail.pReqNo || not empty orderDetail.orderNo}">
											<c:if test="${orderDetail.type=='PR'}">
												<tr onclick="navigateToDetail(<%=i++%>,'PR');"
													class=""><!--${properties.ViewOrderDetails}">-->
													<td class="sorted ORDR">${orderDetail.pReqNo}</td>
													<td class="RDT">${orderDetail.rosterDate}</td>
													<td class="DDT">${orderDetail.deliveryDate}</td>
													<td class="OST">${orderDetail.orderStatus}</td>
													<td class="VNM">${orderDetail.suppNo}<c:if
															test="${not empty orderDetail.suppName}">| ${orderDetail.suppName}</c:if></td>
													<td class="DEP">${orderDetail.tradDeptNo}<c:if
															test="${not empty orderDetail.tradDeptNo and not empty orderDetail.tradingDepName}"> | ${orderDetail.tradingDepName}</c:if></td>
													<td class="SEG"><c:if
															test="${orderDetail.stoType =='B'}">${orderDetail.segmentNo}<c:if
																test="${not empty orderDetail.segmentNo and not empty orderDetail.segmentName}"> | ${orderDetail.segmentName}</c:if>
														</c:if></td>
													<td class="SRC">${orderDetail.orderSource}</td>
													<td class="OTY">${orderDetail.pReqTypeDesc}</td>
													<td class="numberColumn TTC">${orderDetail.totalCartons}</td>
													<td class="lastColumn numberColumn TTP">${orderDetail.totalPallets}</td>

												</tr>
											</c:if>
											<c:if test="${orderDetail.type!='PR'}">
												<tr onclick="navigateToDetail(<%=i++%>,'PO');"
													class=""><!--${properties.ViewOrderDetails}">-->
													<td class="sorted ORDR">${orderDetail.orderNo}</td>
													<td class="RDT">${orderDetail.rosterDate}</td>
													<td class="DDT">${orderDetail.deliveryDate}</td>
													<td class="OST">${orderDetail.orderStatus}</td>
													<td class="VNM">${orderDetail.suppNo}<c:if
															test="${not empty orderDetail.suppName}">| ${orderDetail.suppName}</c:if></td>
													<td class="DEP">${orderDetail.tradDeptNo}<c:if
															test="${not empty orderDetail.tradDeptNo and not empty orderDetail.tradingDepName}"> | ${orderDetail.tradingDepName}</c:if></td>
													<td class="SEG"><c:if
															test="${orderDetail.stoType =='B'}">${orderDetail.segmentNo}<c:if
																test="${not empty orderDetail.segmentNo and not empty orderDetail.segmentName}"> | ${orderDetail.segmentName}</c:if>
														</c:if></td>
													<td class="SRC">${orderDetail.orderSource}</td>
													<td class="OTY">${orderDetail.orderTypeDesc}</td>
													<td class="numberColumn TTC">${orderDetail.totalCartons}</td>
													<td class="lastColumn numberColumn TTP">${orderDetail.totalPallets}</td>

												</tr>
											</c:if>
										</c:if>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>


					<c:if test="${model.param.recordCount >20}">
						<div class="paginationWrapper bottomPagination"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</c:if>

				</div>
			</c:if>

			<!-- End of article details -->



		</div>
		<!-- End of content wrapper -->


	</div>
	<%@include file="footer.jsp"%>

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
	</div>
	<!-- End of footer wrapper -->









	<script>	

			  	      
	</script>


</body>
</html>
