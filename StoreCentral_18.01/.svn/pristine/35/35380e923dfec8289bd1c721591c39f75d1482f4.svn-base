<!DOCTYPE html>
<html>
<head>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title id="titleChange">Claims Lookup</title>



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
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/autoComplete.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreationAngular.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/claimsLookup.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printRepairs.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script>
	var globalUserImgLoc = "${user.imgLocation}";
</script>


</head>
<body ng-app="myapp">
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" value="${isbigw}" id="isBigw" /> <input
				type="hidden" value="${newClaim}" id="newClaimFlag" /> <input
				type="hidden" value="${user.imgLocation}" id="currentBanner" /> <input
				type="hidden" value="${newClaim}" id="newClaimFlag" /> <input
				type="hidden" value="${articleNo}" id="articleNoFromStkAdj" /> <input
				type="hidden" value="${from}" id="fromScreen" />
			<c:forEach items="${addedArticles}" var="element">
				<input type="hidden" value="${element}" name="addedArticleList" />
			</c:forEach>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul id="lookupLink">
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">RTV and Claims</li>
					</ul>
					<ul id="detailLink" class="hideBlock">
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li ><a href="#" onclick="$('#mainBackBtn').trigger('click');">RTV
								and Claims</a></li>
						<li class="currentPage">Claim Details</li>
					</ul>
					<ul id="createLink" class="hideBlock">
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="hideBlock"><a href="#"
							onclick="$('#mainBackBtn').trigger('click');">RTV and Claims</a></li>
						<li class="currentPage">Raise a Claim</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<span> <label class="secondaryActionBtn" id="mainBackBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form method="POST" action="" id="claimsPrintForm"><input type="hidden" name="cartonCnt" id="cartonCnt"
				value=""></form>
		<form id="redirectClaimForm" method="GET">
			<input type="hidden" name="claimArticle" id="claimArticle"
				value=""> <input type="hidden" name="claimFlag"
				id="claimFlag" value="Y"><input type="hidden" name="param"
				id="param" value="navigate">
		</form>
		<form:form id="submitQuery" modelAttribute="InstoreSearchParam">

			<div class="contentWrapper lookup">

				<div class="lookupWrapper" id="lookupContainer">

					<div class="lookupTitleWrapper">
						<h2>Lookup</h2>
					</div>
					<!-- End of lookup title wrapper -->

					<div class="lookupParamWrapper">

						<div id="searchArea">
							<div class="searchBox">
								<input type="#" class="textbox textboxDefaultText"
									placeholder="Search claims" id="searchBox" name="claimNo">
							</div>
							<!-- End of main search box -->
							<label class="actionBtn goButton" id="goButton">Go</label>

							<div class="searchByOptions">
								<label for="searchBox" class="labelText" id="preSearchText">Type
									Claim No. and press Enter</label>


							</div>
							<!-- End of search by options -->


							<div class="advancedParam hideBlock advancedSearchFormat"
								id="advDiv">

								<div class="parameter">
									<h3>Create Date:</h3>
									<input type="#" class="textbox defaultTextbox inputDate"
										id="dateFrom" placeholder="dd/mm/yyyy" name="fromDate">
									to <input type="#" class="textbox defaultTextbox inputDate"
										id="dateTo" placeholder="dd/mm/yyyy" name="toDate">
								</div>
								<div class="parameter">
									<h3>Created By:</h3>
									<input type="#" class="textbox" name="userId" id="userID"
										placeholder="Enter User's Name or Number" tabindex="0">
									<label class="linkBtn" id="verifyUser"><label
										class="advancedSearch verifyUser">Verify</label></label> <label
										class="linkBtn hideBlock" id="verifyLabel"><label
										class="verified">Verified</label></label>
								</div>

								<div class="parameter">
									<h3 for="conNum">Supplier</h3>
									<input type="hidden" id="vendorVerify" /> <input type="#"
										class="textbox textboxDefaultText mediumbox"
										placeholder="Enter Supplier no or name" id="supplier"
										name="supplier"> <label class="linkBtn"
										id="verifySupplier"><label class="advancedSearch">Search</label></label>
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<h3 for="custName">Order Status:</h3>
									<select class="selectOptions mediumbox " name="status" id="lookupOdrStatus">
										<option value="">Select Status</option>
										<option value="DRAFT">Draft</option>
										<option value="FINALISED">Finalised</option>
										<option value="CANCELLED">Cancelled</option>
									</select>
								</div>
								<!-- End of parameter -->
								<div class="parameter">
									<h3 for="custName">Source:</h3>
									<select class="selectOptions mediumbox " name="source">
										<option value="">Select Source</option>
										<option value="CENTRAL">Central</option>
										<option value="STORE">Store</option>
									</select>
								</div>
								<!-- End of parameter -->

								<label class="actionBtn goButton" id="advGoButton">Go</label>


							</div>
							<!-- End of Advanced Param -->




						</div>

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
					<div id="advWrapper" class="hideBlock" style="height: 55px;">

					</div>



				</div>
				<!-- End of lookup wrapper -->
				<div class="errorDiv" id="errorMsgDiv">
					<label id="errorMsg">Date difference should not be greater
						than 3 months</label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>

				<div class="ContentTableWrapper" id="todaysOrders">



					<div class="tableInfo">

						<div class="tableTitle">
							<h4>
								<strong>List of Claims</strong>
							</h4>
						</div>
						<!-- End of table title -->


					</div>
					<!-- End of table info -->


					<div id="tabs" class="tabs">
						<ul>
							<li><a href="#tabs-2" id="titleDraft">Draft (3)</a></li>
							<li><a href="#tabs-3" id="titleFinalised">Finalised (3)</a></li>
							<li><a href="#tabs-4" id="titleCancelled">Cancelled (3)</a></li>
						</ul>
						<div id="tabs-4">
							<div class="ContentTableWrapper" id="todaysCancelled">

								<div class="tableInfo">

									<div class="tableTitle">
										<h5 class="sectionTitle">
											<strong>List of Cancelled Claims </strong>
										</h5>

									</div>
									<!-- End of table title -->
								</div>
								<!-- End of table info -->




								<table cellspacing="0" class="ContentTable actionRows"
									id="beforeSubmit">
									<thead>
										<tr>
											<!--<th width="20px" class="noSort {sorter: false}"></th>-->
											<th width="100px">Return Order #</th>
											<th class="centerValue" width="100px">Claim #</th>
											<th>Supplier</th>
											<th>Source</th>
											<th>Reason</th>
											<th class="centerValue">Create Date</th>
											<th class="lastColumn centerValue" width="100px">Status</th>
											<!-- <th class=" centerValue" width="100px">Article
												Count</th> -->
										</tr>
									</thead>
									<tbody>
										<tr class="filterRow hideBlock drillsOpenDefault">
											<td>&nbsp;</td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox inputDate"
												placeHolder="dd/mm/yyyy"></td>
											<td><input type="#" class="textbox inputDate"
												placeHolder="dd/mm/yyyy"></td>

											<td><input type="#" class="textbox"></td>
										</tr>
										<tr>
											<td colspan="8" class="groupBy1 rowSection rowHighlight">
												Supplied By: xxxxx xxxxx xxxxxx</td>
										</tr>
										<tr>
											<td>3223</td>
											<td class="centerValue">76434</td>
											<td>Tip Top Bakeries (71816001)</td>
											<td>Central</td>
											<td>xxxx xxxx</td>

											<td class="centerValue">13/11/2014</td>
											<td class="centerValue">Finalised</td>
											<td class="lastColumn centerValue">12</td>
										</tr>
										<tr>
											<td>6756</td>
											<td class="centerValue">23435</td>

											<td>Tip Top Bakeries (71816001)</td>
											<td>Central</td>
											<td>xxxx xxxx</td>
											<td class="centerValue">13/11/2014</td>
											<td class=" centerValue">Finalised</td>
											<td class="lastColumn centerValue">33</td>
										</tr>
										<tr>
											<td colspan="8" class="groupBy1 rowSection rowHighlight">
												Supplied By: xxxxx xxxxx xxxxxx</td>
										</tr>
										<tr>
											<td>987</td>
											<td class="centerValue">564</td>
											<td>Sydney Limited (65735426)</td>
											<td>Store</td>
											<td>xxxx xxxx</td>

											<td class="centerValue">13/11/2014</td>
											<td class=" centerValue">Finalised</td>
											<td class="lastColumn centerValue">45</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
						<div id="tabs-3">
							<div class="ContentTableWrapper" id="todaysOrders">

								<div class="tableInfo">

									<div class="tableTitle">
										<h5 class="sectionTitle">
											<strong>List of Finalised Claims </strong>
										</h5>

									</div>
									<!-- End of table title -->
								</div>
								<!-- End of table info -->




								<table cellspacing="0" class="ContentTable actionRows"
									id="beforeSubmit">
									<thead>
										<tr>
											<!--<th width="20px" class="noSort {sorter: false}"></th>-->
											<th width="100px">Return Order #</th>
											<th class="centerValue" width="100px">Claim #</th>
											<th>Supplier</th>
											<th>Source</th>
											<th>Reason</th>
											<th class="centerValue">Create Date</th>
											<th class="lastColumn centerValue" width="100px">Status</th>
											<!-- <th class=" centerValue" width="100px">Article
												Count</th> -->
										</tr>
									</thead>
									<tbody>
										<tr class="filterRow hideBlock drillsOpenDefault">
											<td>&nbsp;</td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox"></td>
											<td><input type="#" class="textbox inputDate"
												placeHolder="dd/mm/yyyy"></td>
											<td><input type="#" class="textbox inputDate"
												placeHolder="dd/mm/yyyy"></td>

											<td><input type="#" class="textbox"></td>
										</tr>
										<tr>
											<td colspan="8" class="groupBy1 rowSection rowHighlight">
												Supplied By: xxxxx xxxxx xxxxxx</td>
										</tr>
										<tr>
											<td>3223</td>
											<td class="centerValue">76434</td>
											<td>Tip Top Bakeries (71816001)</td>
											<td>Central</td>
											<td>xxxx xxxx</td>

											<td class="centerValue">13/11/2014</td>
											<td class="centerValue">Finalised</td>
											<td class="lastColumn centerValue">12</td>
										</tr>
										<tr>
											<td>6756</td>
											<td class="centerValue">23435</td>

											<td>Tip Top Bakeries (71816001)</td>
											<td>Central</td>
											<td>xxxx xxxx</td>
											<td class="centerValue">13/11/2014</td>
											<td class=" centerValue">Finalised</td>
											<td class="lastColumn centerValue">33</td>
										</tr>
										<tr>
											<td colspan="8" class="groupBy1 rowSection rowHighlight">
												Supplied By: xxxxx xxxxx xxxxxx</td>
										</tr>
										<tr>
											<td>987</td>
											<td class="centerValue">564</td>
											<td>Sydney Limited (65735426)</td>
											<td>Store</td>
											<td>xxxx xxxx</td>

											<td class="centerValue">13/11/2014</td>
											<td class=" centerValue">Finalised</td>
											<td class="lastColumn centerValue">45</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
						<div id="tabs-2">
							<div class="tableInfo">

								<div class="tableTitle">
									<h5 class="sectionTitle">
										<strong>List of Draft Claims </strong>
									</h5>

								</div>
								<!-- End of table title -->



							</div>

							<div class="tableActionsBtnsWrapper">
								<div class="lookupActionWrapper">
									<label class="linkBtn" id="createNewClaimBtn"> <a><label
											class="addRow">Create New Claim</a></label> </label> <label
										class="linkBtn hideBlock" id="groupByOpen"> <a><label
											class="group">Group By</label> </a>
									</label>

								</div>
								<!-- End of lookup action wrapper -->


							</div>
							<!-- End of table actions btn wrapper -->




							<table cellspacing="0" class="ContentTable actionRows"
								id="beforeSubmit">
								<thead>
									<tr>
										<!--<th width="20px" class="noSort {sorter: false}"></th>-->
										<th width="100px">Return Order #</th>
										<th class="centerValue" width="100px">Claim #</th>
										<th>Supplier</th>
										<th>Source</th>
										<th>Reason</th>
										<th class="centerValue">Create Date</th>
										<th class=" lastColumn centerValue" width="100px">Status</th>
										<!-- <th class=" centerValue" width="100px">Article
											Count</th> -->
									</tr>
								</thead>
								<tbody>
									<tr class="filterRow hideBlock drillsOpenDefault">
										<td>&nbsp;</td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox"></td>
										<td><input type="#" class="textbox inputDate"
											placeHolder="dd/mm/yyyy"></td>
										<td><input type="#" class="textbox inputDate"
											placeHolder="dd/mm/yyyy"></td>

										<td><input type="#" class="textbox"></td>
									</tr>
									<tr>
										<td colspan="8" class="groupBy1 rowSection rowHighlight">
											Supplied By: xxxxx xxxxx xxxxxx</td>
									</tr>
									<tr>
										<td>1234</td>
										<td class="centerValue">234562</td>
										<td>Tip Top Bakeries (71816001)</td>
										<td>Central</td>
										<td>xxxx xxxx</td>

										<td class="centerValue">13/11/2014</td>
										<td class="centerValue">Draft</td>
										<td class="lastColumn centerValue">12</td>
									</tr>
									<tr>
										<td colspan="8" class="groupBy1 rowSection rowHighlight">
											Supplied By: xxxxx xxxxx xxxxxx</td>
									</tr>
									<tr>
										<td>2662</td>
										<td class="centerValue">12734</td>

										<td>Tip Top Bakeries (71816001)</td>
										<td>Store</td>
										<td>xxxx xxxx</td>
										<td class="centerValue">13/11/2014</td>
										<td class=" centerValue">Draft</td>
										<td class="lastColumn centerValue">34</td>
									</tr>
									<tr>
										<td>2454</td>
										<td class="centerValue">7452</td>
										<td>Sydney Limited (65735426)</td>
										<td>Central</td>
										<td>xxxx xxxx</td>

										<td class="centerValue">13/11/2014</td>
										<td class=" centerValue">Draft</td>
										<td class="lastColumn centerValue">88</td>
									</tr>

								</tbody>
							</table>


							<div class="tableFooter">


								<div class="pageActions hideBlock" id="afterSubmit">
									<label class="secondaryActionBtn"><a>Cancel</a></label> <label
										class="actionBtn" id=""><a><label class="thumbUp">Complete
												(01)</label></a></label>
								</div>
								<!-- End of page actions-->


							</div>
							<!-- End of table footer -->
						</div>
					</div>
				</div>
				<!-- End of article details -->

			</div>
			<!-- End of content table wrapper -->

			<div class="contentWrapper claimDetail hideBlock">

				<div class="articleHead">

					<div class="articleHeaderWrapper">
						<h2 class="articleTitle hdr_claimId">Draft Claim #11</h2>
					</div>
					<div class="articleActionBtns headerActionBtns ">
						<label class="orderStatus">Status: Draft <strong></strong></label>
						<label class="actionBtn ${properties.returnCreateClaims} finaliseElem"
							id="editAction"><a><label class="editBtn ">Edit</label></a></label>
							<!--class="actionBtn ${properties.RtvEdit} finaliseElem" applicationSettings CR -->
						<!--<label class="actionBtn" id=""><a ><label class="notepad">Save as Draft</a></label>	-->
						<label
							class="actionBtn ${properties.RtvFinalise} finalise-btn finaliseElem"
							id="finaliseElem"><a><label class="thumbUp">Finalise</label></a></label>
						<label id="deleteOrder"
							class="actionBtn ${properties.returnCreateClaims} finaliseElem">
							<!--class="actionBtn ${properties.RtvDelete} finaliseElem"applicationSettings CR -->
							<a><label
								class="notepadCross">Delete</label></a></label>

						<ul id="buttonMenu" class="selectDropdown buttonMenu">
							<li><label class="actionBtn PRNT" id="printBtnLocal"><a
									id=""><label class="print">Print</label></a></label>

								<ul class="dropdown">
									<li><a id="claimNotePrint"><label
											class="dropdownLabel">Claim Note</label></a></li>
									<li><a id="cartonLabelPrint"><label
											class="dropdownLabel ">Carton Labels</label></a></li>

								</ul></li>
						</ul>
						<!--  ${properties.RtvPrintCentral} -->
					</div>

					<div class="articleInfoWrapper">
						<p class="secondaryInfo">
							<label class="articlePriceLabel">Supplier: <strong
								class="hdr_supplier">71816001-Tip Top Bakeries </strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Source: <strong
								class="hdr_store">Store</strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel"><label class="submitBy">Created
									By: </label><strong class="hdr_createdby"></strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel"><label class="submitDate">Create
									Date: </label><strong class="hdr_createdDate"></strong></label> <!-- <label
								class="articlePriceLabel hdr_submittedby">|</label> <label
								class="articlePriceLabel"><label class="hdr_submittedby" id="finalisedBy">Finalised
									By: </label><strong class="hdr_submittedby" id="submitted_user"></strong></label> <label
								class="articlePriceLabel hdr_submittedDate">|</label> <label
								class="articlePriceLabel"><label class="hdr_submittedDate"  id="finalisedDate">Finalised
									Date: </label><strong class="hdr_submittedDate" id="submitted_date"></strong></label> -->


						</p>
					</div>
					<div class="articleInfoWrapper">
						<p class="secondaryInfo">
							<!-- <label class="articlePriceLabel">Supplier: <strong
								class="hdr_supplier">71816001-Tip Top Bakeries </strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Source: <strong
								class="hdr_store">Store</strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel"><label class="submitBy">Created
									By: </label><strong class="hdr_createdby"></strong></label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel"><label class="submitDate">Create
									Date: </label><strong class="hdr_createdDate"></strong></label> <label
								class="articlePriceLabel hdr_submittedby">|</label> --> <label
								class="articlePriceLabel"><label class="hdr_submittedby" id="finalisedBy">Finalised
									By: </label><strong class="hdr_submittedby" id="submitted_user"></strong></label> <label
								class="articlePriceLabel hdr_submittedDate">|</label> <label
								class="articlePriceLabel"><label class="hdr_submittedDate"  id="finalisedDate">Finalised
									Date: </label><strong class="hdr_submittedDate" id="submitted_date"></strong></label>


						</p>
					</div>


				</div>
				<!-- End of article head -->


				<div class="articleContent orderDetails editClaimDiv">


					<div class="articleContentInner">

						<div class="articleDetails">


							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo" width="15%">Total Articles:</td>
									<td class="valueInfo hdr_articleCount" width="20%"></td>
									<td class="keyInfo" width="15%">Total Units:</td>
									<td class="valueInfo" width="15%"><label
										class="totalUnitsInHeader"></label><label class="totalUnitsUomInHdr">EA</label></td>
									<td class="keyInfo" width="15%">Authorisation Code</td>
									<td class="valueInfo authorisation-code lastColumn" width="20%"><label
										class="hdr_authCode onViewOnly"></label> <input
										type="#"
										class="textbox onEditOnly authCodeInput hideBlock smallbox hdr_authCode"
										value="xxx" placeholder="Enter Code"></td>

									<!-- <td class="keyInfo" width="15%"></td>
									<td class="valueInfo lastColumn" width="20%"><label
										class="hdr_deliveryregNo hideBlock"></label> <input
										type="#" class="textbox smallbox hdr_deliveryregNo hideBlock"
										value="xxx"></td> -->


								</tr>

								<tr class="onlyForFinalise">

									<!-- <td class="keyInfo" width="15%">Total Units:</td>
									<td class="valueInfo" width="20%"><label
										class="totalUnitsInHeader"></label> EA</td> -->
									<td class="keyInfo" width="15%">Reason:</td>
									<td class="valueInfo" width="20%"><label
										class="hdr_reason onViewOnly">Out of Date</label> <select
										class="selectOptions hideBlock onEditOnly supplyDrop hdr_reason">
											<option value="">Select Reason</option>
											<option>Returns Damaged(10)</option>
											<option>Returns Not Ordered(20)</option>
											<option>General Returns(30)</option>
											<option>General Claim(40)</option>
											<option>STOCK WRITE OFF(91)</option>
											<option>OUT OF DATE(52)</option>
											<option>Ullage(63)</option>
											<option>Central Withdrawals / Recalls(95)</option>
											<option>Stock Loss - Insurance Claim(99)</option>
									</select>
									<td class="keyInfo" width="15%">Authorisation Date</td>
									<td class="valueInfo " width="15%"><label
										class="hdr_authorisedDate onViewOnly"></label> <input
										type="#"
										class="textbox textboxDefaultText inputDate editDateCell  onEditOnly hideBlock hdr_authorisedDate"
										placeholder="dd/mm/yyyy"></td>
									<td class="keyInfo" width="15%">Carton Pick Up Qty</td>
									<td class="valueInfo  lastColumn"
										width="20%"><label
										class="cartonCountViewOnly onViewOnly"></label> <input type="#"
										class="textbox onEditOnly carrCountInput hideBlock smallbox hdr_carrCountcode"
										placeholder="Enter Carton Qty" tabindex="32" maxlength="5"
										value="" id="com7"></td>
								</tr>

								<tr class=" onlyForDraft">
									<td class="keyInfo" width="15%">Reason:</td>
									<td class="valueInfo" width="20%"><label
										class="hdr_reason onViewOnly">Out of Date</label> <select
										class="selectOptions hideBlock onEditOnly supplyDrop hdr_reason">
											<option value="">Select Reason</option>
											<option>Returns Damaged(10)</option>
											<option>Returns Not Ordered(20)</option>
											<option>General Returns(30)</option>
											<option>General Claim(40)</option>
											<option>STOCK WRITE OFF(91)</option>
											<option>OUT OF DATE(52)</option>
											<option>Ullage(63)</option>
											<option>Central Withdrawals / Recalls(95)</option>
											<option>Stock Loss - Insurance Claim(99)</option>
									</select><input type="#" style="margin-top:5px" class="textbox mediumbox otherReasonEdit hideBlock" value="" id="com1" placeholder="Enter Reason" tabindex="69" maxlength="50"></td>
									<td class="keyInfo" width="15%">Authorisation Date</td>
									<td class="valueInfo " width="15%"><label
										class="hdr_authorisedDate onViewOnly">24/12/2014</label> <input
										type="#"
										class="textbox textboxDefaultText inputDate editDateCell  onEditOnly hideBlock hdr_authorisedDate"
										placeholder="dd/mm/yyyy" id="dp1423706448624cdv"></td>
									<td class="keyInfo" width="15%">Carton Pick Up Qty</td>
									<td class="valueInfo lastColumn" width="20%"><label
										class="cartonCountViewOnly onViewOnly"></label> <input
										type="#"
										class="textbox  carrCountInput hideBlock smallbox hdr_carrCountcode onEditOnly"
										placeholder="Enter Carton Qty" tabindex="2" maxlength="5"
										value="" id="com7"></td>
								</tr>
								<tr class="lastRow onlyForDraft">
									<td class="keyInfo" width="15%">Carrier Name:</td>
									<td class="valueInfo" width="20%"><label
										class="carrierNameViewOnly onViewOnly"></label><input type="#"
										class="textbox  smallbox carrierNameInput hdr_carrierNamecode onEditOnly"
										value="" id="com6" placeholder="Enter Carrier Name"
										tabindex="70" maxlength="50" maxlength="5"></td>


									<td class="keyInfo" width="15%">Vehicle Rego No</td>
									<td class="valueInfo " width="15%"><label
										class="vehicleViewOnly onViewOnly"></label><input type="#"
										class="textbox  smallbox  vehicleInput hdr_vehiclecode onEditOnly"
										value="" id="com6" placeholder="Enter Registration Number"
										tabindex="70" maxlength="15"></td>

									<td class="keyInfo " width="15%" >Consignment
										Note No</td>
									<td class="valueInfo lastColumn" width="20%"><label
										class="consignViewOnly onViewOnly"></label><input
										type="#"
										class="textbox  smallbox  consignInput hdr_consigncode onEditOnly"
										value="" id="com7" placeholder="Enter Consignment Note Number"
										tabindex="70" maxlength="50"></td>
								</tr>
								<!-- <tr class=" onlyForFinalise">
									<td class="keyInfo" width="15%">Reason:</td>
									<td class="valueInfo" width="20%"><label
										class="hdr_reason onViewOnly">Out of Date</label> <select
										class="selectOptions hideBlock onEditOnly supplyDrop hdr_reason">
											<option value="">Select Reason</option>
											<option>Returns Damaged(10)</option>
											<option>Returns Not Ordered(20)</option>
											<option>General Returns(30)</option>
											<option>General Claim(40)</option>
											<option>STOCK WRITE OFF(91)</option>
											<option>OUT OF DATE(52)</option>
											<option>Ullage(63)</option>
											<option>Central Withdrawals / Recalls(95)</option>
											<option>Stock Loss - Insurance Claim(99)</option>
									</select></td>
									<td class="keyInfo" width="15%"></td>
									<td class="valueInfo " width="20%"></td>
									<td class="keyInfo" width="15%"></td>
									<td class="valueInfo lastColumn" width="20%"></td>
								</tr> -->
								<tr class="lastRow onlyForFinalise">

									<td class="keyInfo" width="15%">Carrier Name:</td>
									<td class="valueInfo" width="20%"><label
										class="carrierNameViewOnly onViewOnly"></label><input type="#"
										class="textbox  smallbox  carrierNameInput hdr_carrierNamecode onEditOnly"
										value="" id="com6" placeholder="Enter Carrier Name"
										tabindex="70" maxlength="50" maxlength="5"></td>


									<td class="keyInfo" width="15%">Vehicle Rego No</td>
									<td class="valueInfo " width="15%"><label
										class="vehicleViewOnly onViewOnly"></label><input type="#"
										class="textbox  smallbox  vehicleInput hdr_vehiclecode onEditOnly"
										value="" id="com6" placeholder="Enter Registration Number"
										tabindex="70" maxlength="15"></td>

									<td class="keyInfo " width="15%">Consignment
										Note No</td>
									<td class="valueInfo lastColumn" width="20%"><label
										class="consignViewOnly onViewOnly"></label><input
										type="#"
										class="textbox  smallbox  consignInput hdr_consigncode onEditOnly"
										value="" id="com7" placeholder="Enter Consignment Note Number"
										tabindex="70" maxlength="50"></td>
								</tr>

							</table>


						</div>
						<!-- End of article details -->




					</div>
					<!-- End of article content inner -->




				</div>
				<!-- End of article content -->




				<div class="ContentTableWrapper claimEnqAddDiv">



					<div id="searchBoxArea">
						<div class="tableActionsBtnsWrapper onEditOnly">
							<div class="lookupActionWrapper">

								<label class="linkBtn" id="addActionBtn"> <a><label
										class="addRow">Add Article</label></a>
								</label> <label class="linkBtn hideBlock" id="groupByOpen"> <a><label
										class="group">Group By</label> </a>
								</label>
								<div class="tableActionsExtra hideBlock">
									<span> <input type="checkbox" id="checkboxActive"><label
										for="checkboxActive">Change order multiple</label>
									</span>
								</div>
								<div class="errorDiv hideBlock" id="errorDiv">
									<label id="errorMsg">No article found for '<strong>3234</strong>'.
										Please try a different number.
									</label> <label class="closeMessage">&nbsp;</label>
								</div>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<div class="tableActionsWrapper onEditOnly" id="tableAddAction">

							<form method="Get" action="" id="articleForm">

								<!-- End of table info -->
								<div class="formWrapper">

									<div class="parameter">
										<label class="" for="searchBox">Article</label> <input
											type="#" class="textbox textboxDefaultText searchbox"
											placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
											id="searchBox">
									</div>

									<div class="parameter">
										<label class="" for="qty">Return Quantity</label> <input
											type="#" tabindex="2" id="qty" class="textbox  numberBox"
											maxlength="5">

									</div>

									<div class="parameter hideBlock">
										<label for="sourceOfSupply" class="">Supplier</label> <span
											id="vendorField" class="disabled"> <input type="#"
											readonly="readonly" class="textbox mediumbox disabled"
											placeholder="Tip Top Bakeries (71816001)" id="supplier"
											style="background: rgb(217, 217, 217)"> <label
											class="linkBtn disabled" id="verifySupplier"><label
												class="advancedSearch">Search</label></label>
										</span>
									</div>
									<!-- End of parameter -->
									<div class="formActions">
										<label class="actionBtn" id="searchAndAdd"><a>Search
												& Add</a></label> <label class="secondaryActionBtn closeLink"
											id="closeLink"><a>Close</a></label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>



						</div>
					</div>
					<!-- End of table Actions Wrapper -->
					<div id="editClaimTable">

						<table cellspacing="0"
							class="ContentTable treetable drilldownTable tableSorter">
							<tr>
								<th>Article #</th>
								<th>Description</th>
								<th class="centerValue">Return Qty.</th>
								<!--<th class="centerValue title" title="Order Multiple">Cost Price ($)</th>
						<th class="centerValue">Claim Value ($)</th>-->
								<th class="lastColumn centerValue noSort">Actions</th>
							</tr>
							<tr data-tt-id="11">
								<td>2001</td>
								<td>Article Description One</td>


								<td class="centerValue "><input type="#" value="5"
									class="editNumCell textbox textboxDefaultText"></td>

								<!--<td class="centerValue ">
							5
						</td>
						<td class="centerValue ">30.55</td>-->

								<td class="lastColumn centerValue"><label class="linkBtn">
										<a><label class="deleteRecord">&nbsp;</label></a>
								</label></td>

							</tr>



							<tr data-tt-id="13">
								<td>2002</td>
								<td>Article Description Two</td>

								<td class="centerValue "><input type="#" value="5"
									class="editNumCell textbox textboxDefaultText"></td>

								<!--<td class="centerValue ">
							5
						</td>
						<td class="centerValue ">23.12</td>		-->

								<td class="lastColumn centerValue"><label class="linkBtn">
										<a><label class="deleteRecord">&nbsp;</label></a>
								</label></td>

							</tr>



						</table>

					</div>


					<div class="pageActions onEditOnly">
						<label class="actionBtn" id="editUpdate"><a><label
								class="">Save</label></a></label> <label class="secondaryActionBtn"
							id="editCancel"><a>Cancel</a></label>
					</div>
					<!-- End of page actions-->


				</div>
				<!-- End of ContentTableWrapper -->




			</div>
			<!-- end of content wrapper -->
			<div class="contentWrapper claimCreate hideBlock">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">Raise a Claim</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->

					<div id="searchBoxArea">
						<div class="tableActionsBtnsWrapper onEditOnly">
							<div class="lookupActionWrapper">

								<label class="linkBtn" id="addActionBtn"> <a><label
										class="addRow">Add Article</label></a>
								</label> <label class="linkBtn hideBlock" id="groupByOpen"> <a><label
										class="group">Group By</label> </a>
								</label>
								<div class="tableActionsExtra hideBlock">
									<span> <input type="checkbox" id="checkboxActive_edit"><label
										for="checkboxActive">Change order multiple</label>
									</span>
								</div>
								<div class="errorDiv hideBlock" id="errorDiv">
									<label id="errorMsg">No article found for '<strong>3234</strong>'.
										Please try a different number.
									</label> <label class="closeMessage">&nbsp;</label>
								</div>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<div class="tableActionsWrapper onEditOnly" id="tableAddAction">

							<form method="POST" action="" id="articleFormInEdit">
								<div class="formWrapper">

									<div class="parameter">
										<label class="" for="searchBox">Article</label> <input
											type="#"
											class="textbox textboxDefaultText searchboxInEdit searchbox"
											placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
											id="searchBox">
									</div>

									<div class="parameter">
										<label class="" for="qty">Return Quantity</label> <input
											type="#" tabindex="2" id="qty"
											class="textbox searchboxInEdit numberBox" maxlength="5">

									</div>

									<div class="parameter hideBlock">
										<label for="sourceOfSupply" class="">Supplier</label> <span
											id="vendorField"> <input type="hidden"
											id="vendorVerify" value="" tabindex="22"> <input
											type="#" class="textbox mediumbox disabled"
											placeholder="Tip Top Bakeries (71816001)" id="supplier">
											<label class="linkBtn" id="verifySupplier"><label
												class="advancedSearch">Search</label></label>
										</span>
									</div>
									<!-- End of parameter -->
									<div class="formActions">
										<label class="actionBtn" id="searchAndAdd"><a>Search
												& Add</a></label> <label class="secondaryActionBtn closeLink"
											id="closeLink"><a>Close</a></label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>



						</div>
					</div>
					<!-- End of table Actions Wrapper -->

					<div id="editClaimTable"></div>


					<div class="pageActions onEditOnly saveActionArea">
						<label><strong>Total Units: <label
								class="pageTotalUnits">0</label><label class="pageTotalUom">
									EA</label></strong></label> <label class="actionBtn draft-btn" id="saveNewDraft"><a><label
								class="notepad">Save as Draft</label></a></label> <label
							class="actionBtn ${properties.RtvFinalise} finalise-btn" id="finaliseNewDraft"><a><label
								class="thumbUp">Finalise</label></a></label>
					</div>
					<!-- End of page actions-->


				</div>
				<!-- End of ContentTableWrapper -->




			</div>
			<!-- end of content wrapper -->
		</form:form>

		<!-- End of content wrapper -->
		<%@include file="printerPopUp.jsp"%>
		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
			aria-labelledby="ui-id-1" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-mulipleArticles"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning">
							Total <strong id="searchArticleCount">3</strong> articles found
							for search criteria.
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="ContentTableWrapper">
						<table class="ContentTable" cellspacing="0">
							<tbody id="articleSearchTbody">
								<tr>
									<th>Article</th>
									<th>Description</th>
									<th class="centerValue">UOM</th>
									<th width="40px" class="centerValue lastColumn">Select</th>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- End of content table wrapper -->

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label
							class="secondaryActionBtn">Cancel</label> <label
							class="actionBtn" id="addtolist">Add to List</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>


		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
			aria-labelledby="ui-id-2" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-confirmation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="message">
							Please note that In-store Promotions will be available in
							Promotions Planning screens after <strong>approximately
								2 hours</strong>, once it is successfully created.
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions" id="ok"> <label
							class="actionBtn">Ok </label>

						</span><span class="popupActions" id="cancel"> <label
							class="secondaryActionBtn">Cancel </label>
						</span><span class="popupActions hideBlock confirmation-yesbtn"
							id="yesbtn"> <label class="actionBtn">Yes </label>
						</span><span class="popupActions hideBlock confirmation-nobtn" id="nobtn">
							<label class="actionBtn">No</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="errorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title" id="header">Errors</h4>
				<a class="close" title="Close"
					onclick="$('#errorWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="titleContent">Creation failed for few
					supplier.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ul id="errorContent">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageStatusWrapper hideBlock temp-fix-pop-up"
		id="warningWrapper">
		<div class="pageStatusContent">
			<div class="pageStatusTitle">
				<h4 class="title" id=''>STATUS</h4>
				<a class="close" title="Close"
					onclick="$('#warningWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="st_titleContent">Creation failed for
					few supplier.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">
				<h4 class="title">List of supplier and status</h4>
				<ul id="st_errorContent">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog"
		aria-describedby="dialog-mulipleArticlesCONFIRM"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-mulipleArticlesCONFIRM"
			class="ui-dialog-content ui-widget-content">
			<div class="popupContent">

				<div class="popupData popupTitle">

					<h4 class="warning">Articles are already on an In-store
						Display during the selected period.</h4>

				</div>
				<!-- End of pop up data -->


				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tbody id="articleTbody">
							<tr>
								<th>Article</th>
								<th>Description</th>
								<th class="centerValue">UOM</th>
								<th width="40px" class="centerValue lastColumn">Select</th>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="secondaryActionBtn">Cancel</label> <label class="actionBtn"
						id="addanyway">Add anyway</label>
					</span>
				</div>
				<!-- End of popup actions-->


			</div>
			<!-- End of popupContent -->
		</div>
	</div>

	<!-- Promotion Sales history Popup -->
	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog" aria-describedby="dialog-salesHistory"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Sales History</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-salesHistory" title="Promotion Sales History">
			<div class="popupContent">

				<div class="popupSearchWrapper" id="popupSearch">
					<h3>No. of Month:</h3>
					<select class="selectOptions months">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
					</select>


					<h3 class="hideBlock">Promotion Type:</h3>
					<select class="selectOptions promoType hideBlock">
						<option value='I'>Instore</option>
						<option value='C'>Central</option>
						<option value='A'>All</option>
					</select> <label id="apply" class="actionBtn popupSearchBtn">Apply</label>

				</div>
				<!-- End of popup search wrapper -->


				<div class="popupData">

					<div class="tableInfo">

						<div class="tableTitle filtered-count">
							<h4>
								Total <strong class="saleTotalCount">1</strong> results found
							</h4>
						</div>
						<!-- End of table title -->

					</div>
					<!-- End of table info -->
				</div>
				<!-- End of pop up data -->


				<div class="ContentTableWrapper">
					<!-- <table class="ContentTable" cellspacing="0">
						<tr class="promoSaleHistoryPopupTr">
							<th class="centerValue">From</th>
							<th class="centerValue">To</th>
							<th class="numberColumn">Promo Price</th>
							<th class="numberColumn">Saving</th>
							<th class="centerValue">Sub-type</th>
							<th>Media</th>
							<th class="centerValue">Avg. Qty. Sold</th>
							<th>Store Info</th>
							<th width="150px">Store Feedback</th>
							<th class="lastColumn centerValue" width="25px">&nbsp;</th>
						</tr>						
						
						
					</table> -->
				</div>
				<!-- End of content table wrapper -->

				<!-- <div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="actionBtn saleHistorySaveBtn">Save</label> <label
						class="actionBtn closeBtn">Close</label>
					</span>
				</div> -->
				<!-- End of popup actions-->



			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End of Promotion Sales history popup -->
	</div>
	<div id="dialog-alertBox" title="Order Enquiry">
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

	<div id="dialog-verifySupplier" title="Verify Supplier">
		<div class="popupContent">
			<%--<div class="popupSearchWrapper" id="popupSearch">
				 <h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDescEnq"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>--%>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDivEnq"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
	</div>


	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
		aria-labelledby="ui-id-2" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-confirmation"
			class="ui-dialog-content ui-widget-content">
			<div class="popupContent">

				<div class="popupData popupTitle">

					<h4 class="warning" id="message">
						Please note that In-store Promotions will be available in
						Promotions Planning screens after <strong>approximately 2
							hours</strong>, once it is successfully created.
					</h4>

				</div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupActions" id="ok"> <label class="actionBtn">Ok
					</label>

					</span><span class="popupActions" id="cancel"> <label
						class="secondaryActionBtn">Cancel </label>

					</span>
				</div>
				<!-- End of popup actions-->


			</div>
			<!-- End of popupContent -->
		</div>
	</div>

	<div id="dialog-promptFinalise" class="dialog-promptFinalize"
		title="Finalise the Claim">
		<div class="popupContent">


			<div class="popupData">
				<form action="" id="claimsFinalisePopUpForm">
					<div class="formWrapper">

						<div class="parameter">

							<table width="100%" class="plainTable">

								<tbody>
									<tr>
										<td><label for="com4">Reason</label></td>
										<td><select class="selectOptions supplyDrop reason">
												<option>Select Reason</option>
												<option>Returns Damaged(10)</option>
												<option>Returns Not Ordered(20)</option>
												<option>General Returns(30)</option>
												<option>General Claim(40)</option>
												<option>STOCK WRITE OFF(91)</option>
												<option>OUT OF DATE(52)</option>
												<option>Ullage(63)</option>
												<option>Central Withdrawals / Recalls(95)</option>
												<option>Stock Loss - Insurance Claim(99)</option>
										</select>&nbsp;&nbsp;<input type="#" class="textbox mediumbox otherReasonEdit hideBlock" value="" id="com1" placeholder="Enter Reason" tabindex="69" maxlength="50"></td></td>
									</tr>

									<tr class="hideBlock">
										<td><label for="com1">Delivery Control Reg No: </label></td>
										<td><input type="#" class="textbox smallbox  delregno"
											value="" id="com1" placeholder="Type reference number"></td>
									</tr>
									<tr>
										<td><label for="com2">Authorisation Code</label></td>
										<td><input type="#"
											class="textbox authCodeInput smallbox  authcode" value=""
											id="com1" placeholder="Type authorisation code"></td>
									</tr>
									<tr>
										<td><label for="com2">Authorisation Date</label></td>
										<td><input type="#"
											class="textbox textboxDefaultText inputDate  authdate"
											placeholder="dd/mm/yyyy" id="dp14zxc23706448624"></td>
									</tr>
									<tr>
										<td><label for="com2">Carrier Name</label></td>
										<td><input type="#"
											class="textbox  mediumbox  carrierNameInput carrierNamecode"
											value="" id="com6" placeholder="Enter Carrier Name"
											tabindex="70" maxlength="50" maxlength="5"></td>
									</tr>

									<tr>
										<td><label for="com2">Vehicle Rego No.</label></td>
										<td><input type="#"
											class="textbox  mediumbox  vehicleInput vehiclecode" value=""
											id="com6" placeholder="Enter Registration Number"
											tabindex="70" maxlength="15"></td>
									</tr>

									<tr>
										<td><label for="com2">Consignment Note No.</label></td>
										<td><input type="#"
											class="textbox  mediumbox  consignInput consigncode" value=""
											id="com7" placeholder="Enter Consignment Note Number"
											tabindex="70" maxlength="50"></td>
									</tr>

									<tr>
										<td><label for="com2">Carton Pick Up Qty</label></td>
										<td><input type="#"
											class="textbox  cartonCountInput mediumbox carrCountcode" value=""
											id="com8" placeholder="Enter Carton Qty" tabindex="2"
											maxlength="5"></td>
									</tr>


								</tbody>
							</table>

						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of form wrapper  -->
				</form>
			</div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><a>Finalise</a></label>
					<label class="secondaryActionBtn"><a>Cancel</a></label>




				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
	
	<div id="dialog-cartonCount" class="dialog-cartonCount"
		title="Enter Carton Count">
		<div class="popupContent">


			<div class="popupData">
				<form action="" id="claimsCartonCountPopUpForm">
					<div class="formWrapper">

						<div class="parameter">

							<table width="100%" class="plainTable">

								<tbody>
									<tr>
										<td><label for="com1">Carton Pick Up Qty: </label></td>
										<td><input type="#" class="textbox smallbox cartonCount"
											value="" id="cartonCount" placeholder="Enter Carton Qty" maxlength="5"></td>
									</tr>
								</tbody>
							</table>

						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of form wrapper  -->
				</form>
			</div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><a>Ok</a></label>
					<label class="secondaryActionBtn"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

	<div class="quickHelpWrapper hideBlock">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title">
					<!-- <strong id="noOfDrafts"></strong> -->
					Results only contain claims within the last 2 weeks. Please use
					advanced search for Older Claims
				</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">
					<strong id="noOfDrafts"></strong> &nbsp;
				</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">What next?</h4>
				<ul>
					<li>Click on the draft tab and the claims to edit and submit</li>

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper hideBlock" id="errorWrapperClaimlookup">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Claims Enquiry.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ol id="validateErrorsClaimlookup">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="noDataWarningWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Warning</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Claims Enquiry.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<!-- <h4 class="title">Reason for failure</h4>  -->
				<ul id="noDataWarning">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<%@include file="footer.jsp"%>
	<div id="dialog-verify" title="Verify User">
		<div class="popupContent">

			<div class="tableInfo warningMessage" style="padding-bottom: 5px">
				<h4>
					Too many search results for '<strong>James Smith</strong>'. Please
					select a user from the list below.
				</h4>
				<div class="paginationWrapper verifyPagination bottomPagination">
					<div class="pagination-holder clearfix">
						<div id="compact-pagination"
							class="compact-theme simple-pagination">
							<ul>
								<li class="active"><span class="disabled prev">Prev</span></li>
								<li class="active"><span class="current">1</span></li>
								<li><a class="page-link" href="#page-2">2</a></li>
								<li><a class="page-link" href="#page-3">3</a></li>
								<li><a class="page-link next" href="#page-2">Next</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- End of table info -->

			<%-- <div class="popupSearchWrapper" id="popupSearch">

				<!-- <div class="searchWrapper">
					<h3>Search:</h3>
					<input type="#" class="textbox textboxDefaultText"
						placeholder="Enter store no. or name">
				</div> -->
				<!-- End of search wrapper -->

				<!-- <div class="filterWrapper">
					<h3>Sales Organisation:</h3>
					<select class="selectOptions">
						<option>All</option>
						<option>BigW</option>
						<option>BWS</option>
						<option>Woolworths</option>


					</select>
				</div> -->
				<!-- End of search wrapper -->


			</div>--%>
			<!-- End of popup search wrapper -->

			<div class="popupData">



				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">


					</table>









				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of changeStore -->
	<div id="printDataForFinClaim" class="hideBlock">
		<div id="printbodyForFinClaim" class="printbody claimcontent"></div>
	</div>
	<div id="printDataForCtnLbl" class="hideBlock">
		<div id="printbodyForCtnLbl" class="printbody cartonMid cartonLabel"></div>
	</div>
</body>
</html>
