<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
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
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/allocationOrderSearch.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<!--  <script type="text/javascript" src="../../scripts/orderDtl.js?version=${properties.version}"></script> -->

<script type="text/javascript">
var fromDate = '<c:out value="${delvFromDate}" />';
var toDate = '<c:out value="${delvToDate}" />';
</script>

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
						<li class="hideBlock dtl"><a href="#">Order Enquiry</a></li>
						<li class="currentPage enq">Order Enquiry</li>
						<li class="currentPage hideBlock dtl">Order Details</li>
						<li class="hideBlock vari"><a href="#">Order Details</a></li>
						<li class="currentPage hideBlock vari">Warehouse Variance
							Report</li>

					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn hideBlock" id="backBtnId">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->


		<!-- <form name="updateForecast" id="updateForecast" method="post"  action="convertToExcel.htm">
							<input type="hidden" name="convertToExcel" id="convertToExcel"/>
							<input type="hidden" name="groupId" id="groupId"/>
							<input type="hidden" name="others" id="others"/>
							<input type="hidden" name="outCnt" id="outCnt"/>
							<input type="hidden" name="bannerId" id="bannerId"/>
							<button id="exportBtn" tabindex="5" class="exportBtn">Export</button></form> -->

		<div class="contentWrapper order">
			<form id="orderEnq">
				<div class="lookupWrapper" id="lookupContainer">

					<div class="lookupTitleWrapper">
						<h2>Lookup</h2>
					</div>
					<!-- End of lookup title wrapper -->

					<div class="lookupParamWrapper">




						<div class="searchBox">

							<span id="numberInputs"> <input type="#"
								class="textbox textboxDefaultText" name="orderNo"
								placeholder="Enter Order Number or Click Advanced Search"
								maxlength="20" id="orderNo" value="">
							</span> <span class="hideBlock" id="typeInputs"> <%-- <select
									class="selectOptions" name="orderType" id="orderType">
										<option value="0">Select</option>
										<c:if test="${not empty orderTypes}">
											<c:forEach items="${orderTypes}" var="orderVal">
												<option value="${orderVal.orderType}">${orderVal.orderDescription}</option>
											</c:forEach>
										</c:if>
								</select>  <input type="#" class="textbox textboxDefaultText inputDate"
									placeholder="Delivery date" name="deliveryFromDate"
									maxlength="20" id="deliveryFromDate">--%>
							</span>

						</div>
						<!-- End of main search box -->
						<label class="actionBtn goButton" id="normalSearch">Go</label>


						<div class="searchByOptions hideBlock">
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
								<h3>Type & Status:</h3>
								<select class="selectOptions" name="orderType" id="orderType"
									value="">
									<option value="ALL">All</option>
									<c:forEach items="${orderTypes}" var="orderTyp">
										<option id="${orderTyp.orderType}"
											value="${orderTyp.orderType}"
											class="orederType-${orderTyp.orderType}">
											${orderTyp.orderDescription}</option>
									</c:forEach>
								</select> <select class="selectOptions" name="orderStatus"
									id="orderStatus" value="">

									<option value="ALL">All</option>
									<option class="normal" value="OPEN">Open</option>
									<option class="normal" value="AUTHORISED">Authorised</option>
									<option class="normal" value="PARTIALLY RECEIVED">Partially
										Received</option>
									<option class="normal" value="RECEIVED">Received</option>
									<option class="normal" value="CANCELLED">Cancelled</option>
									<option class="allocation" value="COMPLETED">Completed</option>
									<option class="allocation" value="PLANNED">Planned</option>
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

							<div class="parameter hideBlock">
								<h3>Roaster Date:</h3>
								<input type="#" class="textbox textboxDefaultText inputDate"
									id="rosterFromDate" name="rosterFromDate" value=""
									maxlength="20" placeholder="dd/mm/yyyy"> to <input
									type="#" class="textbox textboxDefaultText inputDate"
									id="rosterToDate" name="rosterToDate" value="" maxlength="20"
									placeholder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->
							<div class="parameter hideBlock">
								<h3>Department:</h3>
								<select class="selectOptions" id="department" name="department">
									<option value="Select">Select</option>
									<%-- <c:forEach items="${model.deptInfoList}" var="deptInfo">
										<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
									</c:forEach> --%>

								</select> <label id="selectSubCat" class="linkBtn"> <label
									class="newWindow" id="deptHie">Hierarchy</label>
								</label>


							</div>
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

							<div id="sos" class="parameter">
							<input type="hidden" id="vnVendorNumber" value="" name="vnSuppNo">
								<h3>Supplier:</h3>
								<input type="#" class="textbox"
									placeholder="Enter supplier no. or name" name="suppNo"
									maxlength="20" id="supplier" readonly="readonly"> <label
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
						<label class="linkBtn"> <a href="#"
							class="more hideBlock bookmark" id="savedSearch">My saved
								search</a>
						</label>
					</div>

				</div>
				<%-- <c:if test="${not empty noResults}"> --%>
				<div class="ContentTableWrapper errorDivWrapper">
					<div class="tableInfo">

						<div class="tableTitle nodataMessage" id="errorMsgDiv">
							<h4 id="errorMsg">
								<c:if test="${not empty noResults}">${noResults}</c:if>
							</h4>

							<!-- End of table title -->

						</div>
					</div>

				</div>



				<!-- End of lookup wrapper -->
				<div class="ContentTableWrapper" id="resultContent">

					<div class="tableInfo allocationTbl hideBlock">
						<div class="tableTitle hideBlock">
							<h4>
								<span>Total <strong></strong> records found
								</span><label class="linkBtn hideBlock"> <a id="saveSearch"
									class="bookmark" href="#">Save search</a>
								</label>
							</h4>
						</div>

						<div class="tableActionBtns hideBlock">
							<label class="linkBtn"> <label class="tableSettings">&nbsp;</label>
							</label>
						</div>
						<div class="paginationWrapper hideBlock allocationPage"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<!-- End of pagination Wrapper -->



						<!-- End of table info -->
						<div class="tableScroller" id="scrollBtns-alloc">
							<ul>
								<li class="scrollLeft" id="previous-column-alloc"><a
									href="#">&nbsp;</a></li>
								<li class="scrollRight" id="next-column-alloc"><a href="#">&nbsp;</a>
								</li>
							</ul>
						</div>
						<!-- End of table scroller -->


						<div id="scrollTable-alloc" class="scrollTableContainer">
							<div id="scrollWindow-alloc" class="scrollWindow">



								<table cellspacing="0"
									class="ContentTable treetable drilldownTable sortTable allocationTbl hideBlock"
									id="treetable">
									<tbody>
										<tr>
											<th width="15px"><span class="indenter"> <a
													href="#" title="Expand All" class="expandAll"
													id="expandAll">&nbsp;</a> <a href="#" title="Collapse All"
													class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
											</span></th>
											<th>On Show Date</th>
											<th>Allocation #</th>
											<th class="lastColumn">Allocation Description</th>
										</tr>
										<tr data-tt-id="1" class="collapsed">
											<!-- <td><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span></td> -->
											<td class="DDT">12/04/2014</td>
											<td class="ORD">800392312</td>
											<td class="OST">woolworths</td>
										</tr>
										<tr data-tt-id="2" data-tt-parent-id="1"
											class="noChild collapsed" style="display: none;">
											<td colspan="4"><span class="indenter"
												style="padding-left: 19px;"></span>

												<table class="secondaryTable" cellspacing="0" width="100%">
													<tbody>
														<tr>
															<th width="5%">Article #</th>
															<th>Description</th>
															<th class="centerValue" width="5%">Total Qty</th>
															<th class="centerValue" width="10%">Allocation
																Status</th>
															<th class="centerValue" width="5%">Delivery Date</th>
															<th class="centerValue" width="5%">Order #</th>
															<th class="centerValue" width="5%">Segment</th>
															<th class="centerValue lastColumn" width="10%">Order
																Status</th>
														</tr>
														<c:forEach items="${orderList}" var="orderDetail">

															<tr>
																<td class="ARTICLE">15311</td>
																<td class="ARTICLEDESC">woolwo</td>
																<td class="TOTQTY">1</td>
																<td class="ALLSTATUS">open</td>
																<td class="DELVRY">12/01/14</td>
																<td class="ORDRNO">80001763}</td>
																<td class="SEG">70</td>
																<td class="ORDRSTATUS">open</td>
															</tr>
														</c:forEach>
													</tbody>
												</table></td>
										</tr>
								</table>








							</div>
							<!-- End of scroll Table Container -->
						</div>
						<!-- End of scroll Window -->


						<div class="paginationWrapper hideBlock bottomPagination"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>

					</div>

					<!-- End of article details -->


					<div class="tableInfo orderTitle hideBlock">

						<div class="tableTitle">
							<h4>List of Orders and PReqs</h4>
						</div>
						<!-- End of table title -->


					</div>
					<!-- End of table info -->
					<div id="tabs" class="filterTabs hideBlock">
						<ul>
							<li><a href="#tabs-1" class="tab1">Orders </a></li>
							<li><a href="#tabs-2" class="tab2">PReq</a></li>
						</ul>
						<div id="tabs-1">
							<div class="paginationWrapper hideBlock orderPagination"
								id="orderPagination">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
							<div class="recordsfound hideBlock">
								<h4>
									<span>Total <strong></strong> orders found
									</span>

								</h4>
							</div>

							<div class="tableScroller" id="scrollBtns-orders">
								<ul>
									<li class="scrollLeft" id="previous-column-orders"><a
										href="#">&nbsp;</a></li>
									<li class="scrollRight" id="next-column-orders"><a
										href="#">&nbsp;</a></li>
								</ul>
							</div>
							<!-- End of table scroller -->


							<div id="scrollTable-orders" class="scrollTableContainer">
								<div class="scrollTableContainer orderErrorDiv">
									<div class="tableInfo">

										<div class="tableTitle nodataMessage" id="orderErrorDiv">
											<h4 id="orderErrorMsg">
												<c:if test="${not empty noResults}">${noResults}</c:if>
											</h4>

											<!-- End of table title -->

										</div>
									</div>

								</div>
								<div id="scrollWindow-orders" class="scrollWindow">
									<table cellspacing="0"
										class="ContentTableWrapper sortTable ContentTable actionRows  contentRow drilldownTable hideBlock"
										id="orderTreeTable">
										<thead>
											<tr>
												<th class="centerValue header">Order #</th>
												<th class="centerValue header">Delivery Date</th>
												<th class="centerValue header">Status</th>
												<th class="centerValue header">Supplier</th>
												<th class="centerValue header">Order Type</th>
												<!-- <th class="centerValue header">Department</th> -->
												<th class="centerValue header">Source</th>
												<th class="centerValue header">Total Cartons</th>
												<th class="lastColumn centerValue header">Total Pallets</th>
											</tr>
										</thead>
										<tbody class="contentRow">
										</tbody>
									</table>
								</div>
							</div>

							<div
								class="paginationWrapper hideBlock bottomPagination orderPagination"
								id="">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>

							</div>
							<!-- End of tabs -1 -->
						</div>




						<div id="tabs-2">
							<div class="paginationWrapper hideBlock preqPagination"
								id="preqPagination">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
							<div class="preqrecords hideBlock">
								<h4>
									<span>Total <strong></strong> preq orders found
									</span>
								</h4>
							</div>
							<div class="tableScroller" id="scrollBtns-preq">
								<ul>
									<li class="scrollLeft" id="previous-column-preq"><a
										href="#">&nbsp;</a></li>
									<li class="scrollRight" id="next-column-preq"><a href="#">&nbsp;</a>
									</li>
								</ul>
							</div>
							<!-- End of table scroller -->


							<div id="scrollTable-preq" class="scrollTableContainer">
								<div class="scrollTableContainer preqErrorDiv">
									<div class="tableInfo">

										<div class="tableTitle nodataMessage" id="preqErrorDiv">
											<h4 id="preqErrorMsg">
												<c:if test="${not empty noResults}">${noResults}</c:if>
											</h4>

											<!-- End of table title -->

										</div>
									</div>

								</div>
								<div id="scrollWindow-preq" class="scrollWindow">
									<table cellspacing="0"
										class="ContentTableWrapper ContentTable sortTable contentRow actionRows drilldownTable hideBlock"
										id="preqTreeTable">

										<thead>
											<tr class="contentRow">
												<th class="centerValue header">PReq #</th>
												<th class="centerValue header">Delivery Date</th>
												<th class="centerValue header">Status</th>
												<th class="centerValue header">Supplier</th>
												<th class="centerValue header">Order Type</th>
												<!-- <th class="centerValue header">Department</th> -->
												<th class="centerValue header">Source</th>

												<th class="centerValue header">Total Cartons</th>
											</tr>
										</thead>
										<tbody></tbody>

									</table>
								</div>
							</div>
							<div
								class="paginationWrapper hideBlock bottomPagination preqPagination"
								id="">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
							<!-- End of tabs - 2 -->


						</div>
						<!-- End of tabs -->

					</div>
				</div>
			</form>

		</div>
		<%@include file="tabedOrderDetail.jsp"%>
	</div>




	<%@include file="footer.jsp"%>


	<%@include file="alertBox.jsp"%>
	<%@include file="vendorClaims.jsp"%>
	<%@include file="verifyVendor.jsp"%>

</body>
</html>
