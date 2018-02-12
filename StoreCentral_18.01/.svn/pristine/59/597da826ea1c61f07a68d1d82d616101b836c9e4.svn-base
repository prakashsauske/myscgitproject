<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>eDGMS Discrepancies Report</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
	<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/edgmsDiscrepanciesReport.js?version=${properties.version}"></script>												
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<script src="../../scripts/basicSort.js?version=${properties.version}">
	
</script>
</head>
<body>
 <input type="hidden" class="textbox" value="${properties.version}" name="jsVersion" id="jsVersion" />
 <input type="hidden" class="textbox" value="true" name="ineDGMSscreen" id="ineDGMSscreen" />
	<div class="NoPrint mainWrapper woolworths" id="orderLookUpWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input id="navBarHighlight" type="hidden" value="reports" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel" id="brudCrumCont"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="navigate currentPage" onclick="navigate('enq')" id="brud_order_lookup" >eDGMS Discrepancies Report</li>
						<li class="navigate currentPage hideBlock" onclick="navigate('dtl')"  data_back="enq" id="brud_order_detail">Order Detail</li>
						<li class="navigate currentPage hideBlock" id="brud_update_order"  data_back="dtl">Update Received Qty.</li>
					
					</ul>
				</div>

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>

			</div>
		</div>

		<div class="contentWrapper reportWrapper orders">
			<div class="articleAdditionalInfo">

				<div id="accordion">
					<h3>Generate eDGMS Discrepancies Report</h3>
					<div>
					<form method="POST" action="" id="edgmsDiscrepanciesReportPdf"></form>
						<form id="edgmsDiscrepanciesForm" method="get"
							action="edgmsDiscrepanciesSearch.htm" modelAttribute="model">

							<div class="formWrapper">

								<div class="parameter">
									<label for="department">Report for</label> <select
										name="weekParam" class="selectOptions DGMSDepartmentOptions"
										id="reportDate">
										<c:forEach items="${weekMap}" var="map">
											<option value="${map.key}">${map.value}</option>
										</c:forEach>
									</select>

								</div>
								<div class="parameter ">
									<label for="transactionType">Discrepancy ($)</label> <label
										type="#">20</label> <input type="hidden" class="textbox"
										placeholder="Enter Amount excl GST"
										value="${model.param.discrpAmt}" name="discrpAmt"
										id="discrpAmt" onkeypress="return isNumberKeyTemp(event)"
										maxlength="20" />
								</div>
								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate Report</label> <label
										class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
							</div>

							<!-- Generate Report button added  -->





							<input name="siteNo" type="hidden" value="${user.siteNo}" /> <input
								type="hidden" value="${model.param.inputDate}" id="dropretain" />
							<input type="hidden" id="reportFetchStatus" value="${msg}" /> <input
								type="hidden" id="salesOrgUsr" value="${user.salesOrg}" />
						</form>
					</div>
				</div>

				<div class="ContentTableWrapper ">
					<div class="tableInfo">
						<c:if test="${ empty edgmsDiscrepancyMap}">
							<div class="tableTitle nodataMessage" id="errorMsgDiv">
								<h4 id="msg">${noData}</h4>
							</div>
						</c:if>

						<c:if test="${not empty edgmsDiscrepancyMap}">
							<div class="tableActionBtns">
								<label class="actionBtn" onclick="discrepancyReportPrint();"><!--  discrepancyPrint(); --><label
									class="print">Print</label></label>
							</div>
							<div class="tableTitle" id="errorMsgDiv">
								<h4 id="msg">
									Report for Previous Day Receipts as of <strong>${model.param.prevInputDate}</strong>
									<label class="secondaryText hideBlock">(Last modified
										on Mon, 13 Aug, 8:00pm) </label>
								</h4>
							</div>
						</c:if>
						<!-- End of table title -->



					</div>

					<c:if test="${not empty edgmsDiscrepancyMap}">
						<table cellspacing="0" class="ContentTable" id="fullTable">
							<!-- <tr>					
						
						<th colspan="2" class="centerValue columnDivider">No. #</th>
						<th colspan="3" class="centerValue columnDivider">Qty. </th>
						<th colspan="4" class="centerValue lastColumn">Amount ($)</th>
					</tr> -->
							<tr class="subHeader">
								<th>PO #</th>
								<th class="columnDivider">GR #</th>
								<th class="centerValue">PO Qty.</th>
								<th class="centerValue">GR Qty.</th>
								<th class="centerValue columnDivider">Difference in Qty.</th>
								<th class="numberColumn">PO Amount</th>
								<th class="numberColumn">GR Amount</th>
								<!--  <th class="numberColumn">Invoice Amount</th> CR modifications--> 
								<th class="numberColumn lastColumn">Difference in Amount</th>
							</tr>

							<c:forEach items="${edgmsDiscrepancyMap}" var="entry">

								<tr>
									<td colspan="10" class="lastColumn valueInfo">${entry.key}</td>
								</tr>
								<c:set var="poNo" value=""></c:set>
								<c:forEach items="${entry.value}" var="edgmsDiscrepancy">


									<tr>
										<td><c:if
												test="${poNo!=edgmsDiscrepancy.poNo && edgmsDiscrepancy.ngboStoreFlag !='Y'}"><a href="#"  onclick="getOrdersList('${edgmsDiscrepancy.poNo}')" class="navigate detail">
					${edgmsDiscrepancy.poNo}</a></c:if>
										<c:if
												test="${poNo!=edgmsDiscrepancy.poNo && edgmsDiscrepancy.ngboStoreFlag == 'Y'}"><a href="#"  onclick="navigateToNGBOOrderDetail(parseInt('${edgmsDiscrepancy.poNo}'))" class="navigate detail"><!-- fix for defect 14722 -->
					${edgmsDiscrepancy.poNo}</a></c:if>
										
					 </td>
										<td>${edgmsDiscrepancy.grNo}</td>
										<td class="centerValue"><c:if
												test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poTotalQty}</c:if></td>
										<td class="centerValue"><c:choose>
												<c:when test="${poNo==edgmsDiscrepancy.poNo}">
													<c:if test="${edgmsDiscrepancy.grnTotalqty!='0.000'}">
									${edgmsDiscrepancy.grnTotalqty}</c:if>
												</c:when>
												<c:otherwise>${edgmsDiscrepancy.grnTotalqty}</c:otherwise>
											</c:choose></td>
										<td class="centerValue cellHighlight"><c:if
												test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.qtyDiff}</c:if></td>
										<td class="numberColumn columnDivider"><c:if
												test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poAmt}</c:if></td>
										<td class="numberColumn columnDivider grnAmt"><c:choose>
												<c:when test="${poNo==edgmsDiscrepancy.poNo}">
													<c:if test="${edgmsDiscrepancy.grnAmt!='0.00'}">
									${edgmsDiscrepancy.grnAmt}</c:if>
												</c:when>
												<c:otherwise>${edgmsDiscrepancy.grnAmt}</c:otherwise>
											</c:choose></td>
										<!--<td class="numberColumn invAmt"><c:choose>
												<c:when test="${poNo==edgmsDiscrepancy.poNo}">
													<c:if test="${edgmsDiscrepancy.invAmt!='0.00'}">
									${edgmsDiscrepancy.invAmt}</c:if>
												</c:when>
												<c:otherwise>${edgmsDiscrepancy.invAmt}</c:otherwise>
											</c:choose></td> CR modifications-->
										<td class="lastColumn numberColumn cellHighlight"><c:if
												test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.amtDiff}</c:if></td>
									</tr>
									<c:set var="poNo" value="${edgmsDiscrepancy.poNo}"></c:set>
								</c:forEach>

							</c:forEach>

						</table>
					</c:if>

				</div>


			</div>











			<!-- For displaying report results -->


		</div>
	<%@include file="tabedOrderDetail.jsp"%>
	</div>
	<%@include file="footer.jsp"%>
	<%@include file="alertBox.jsp"%>
	<%@include file="vendorClaims.jsp"%>
	<%@include file="verifyStorePopUp.jsp"%>
	
	<!-- vendor authorization number popup -->
			<div id="dialog-modal-autho-ngbo" title="Edit Vendor Authorisation Number">
				<div class="popupContent">
					<div class="popupData">
						<div class="ContentTableWrapper formWrapper">

							<div class="parameter">
								<label for="dDate">Authorisation #</label> <input type="#"
									class="textbox" id="vendorAuthNoInNGBO" name="vendorAuthNoInNGBO"
									placeholder="Enter authorisation number"
									onkeypress="return isNumberKey(event)" maxlength="15" />
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="saveVendorAuthNoInNGBO">Save</label> <label
							class="secondaryActionBtn" id="cancelVendorAuthNoInNGBO">Cancel</label>
						</span>
					</div>
					<!-- End of popup actions-->

				</div>
				<!-- End of popupContent -->
				</div>
	

<div id="dialog-editSitePop" title="Select a Target site">
		<div class="popupContent">
			<div class="formWrapper  twoColumn ">
			<form id="transferPopUpForm">
				<input type="hidden" id="isVerified" value="false">
				<div class="parameter parameterSingle clearfix">
					<label for="pos1">Target Site</label>
					<input type="#" class="textbox searchbox" placeholder="Type target site number or name " id="pos1">
					<label class="linkBtn" id="verifysite"><label class="advancedSearch">Verify</label></label>						
				 
				</div> <!-- End of parameter -->	
				
	
				<div class="parameter parameterRow parameterOptions clearfix">
					<label>Select from</label>
					
						<span class="parameterOptionsRadio">
							
							<input type="radio" name="targetSiteOpt" value="nearby" id="pnearby"><label for="nearby" class="labelText">Nearby Stores</label>
							<input type="radio" name="targetSiteOpt" value="wh" id="pwh"><label for="wh" class="labelText">My Warehouses</label>
						</span>
						

						
						<div class="parameter parameterOptionsInputBox">
							
									
							<span id="pmywhlist" class="hideBlock">
								<select id="warehouseInPopup" class="selectOptions">
									<option>Select</option>
									<option>Warehouse 1</option>
									<option>Warehouse 2</option>
									
								</select>
								
								
							</span>	
						
						
						</div> <!-- End of parameter -->
					 
				</div> <!-- End of parameter -->	
				
	</form>
							
			</div> <!-- End of form wrapper -->
			
												
						
			<div class="popupSearchWrapper hideBlock" id="popupSearch">
				<h3>Sales Orgs:</h3>
				
					<select class="selectOptions salesOrgMap" id="selectHeight" name="selectHeight" > 			
						<option value="1010">1010 | BWS</option>
						<option value="1015">1015 | Dan Murphy's</option>
						<option value="1020">1020 | Woolworths Petrol</option>
						<option value="1025">1025 | Thomas Dux</option>
						<option value="1030">1030 | New Small Stores</option>
						<option value="2010">2010 | Countdown</option>
						<option value="2015">2015 | Gull Petrol</option>
						<option value="2030">2030 | NZ Distribution Centres</option>
						<option value="9050">9050 | SuperValue</option>
						<option value="9060">9060 | Fresh Choice</option>
						<option value="1005">1005 | Supermarket</option>
					</select>
					
				
				<h3>Distance(km):</h3>
				<select class="selectOptions" id="near-by-distance">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				<h3>Max Results:</h3>
				<select class="selectOptions" id="near-by-max">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				
				<label class="actionBtn nearbyStoreSearchBtn" id="goButtonSample">Search Stores</label>
				
			</div> <!-- End of popup search wrapper -->
			

		
		
			<div class="popupData hideBlock" id="siteResults">
			
				<div class="tableInfo">
				
					<div class="warningMessage hideBlock" id="searchWarning" style="padding-top: 13px;padding-bottom: 26px;">
						<h4>
							Too many search results for '<strong>supplier name</strong>'.
							Please select a supplier from the list below.
						</h4>
					</div>
				
					<div class="paginationWrapper nearby-pagination bottomPagination"
						style="padding-top: 5px;">
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
											
					<div class="tableTitle">
						<h4>Total <strong>2</strong> sites found  </h4>
					</div> <!-- End of table title -->					
					
				
				</div> <!-- End of table info -->
				
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tr>
							<th>Site No</th>
							<th>Site Name</th>
							
						
							<th width="100px" class="lastColumn centerValue">Select</th>
						</tr>
						<tr>							
							<td>5571</td>
							<td>New - Chester Hill</td>
							
							
							<td class="sorted lastColumn centerValue"><input type="radio" name="siteSelect"></td>							
						</tr>
						
						<tr class="lastRow">							
							<td>5571</td>
							<td>New - Chester Hill</td>
							
							
							<td class="sorted lastColumn centerValue">
								<input type="radio" name="siteSelect">
							</td>
						</tr>
						
					</table>
				</div> <!-- End of content table wrapper -->
				
				
			
				
			
			</div> <!-- End of pop up data -->
			
			<div class="errorDiv hideBlock" style="padding-top:10px">
				<label>Unable to stock transfer due to incorrect temperature. </label>
			</div>
			
				<div class="popupActionsWrapper ">
								
					<span class="popupActions">
						<label class="secondaryActionBtn" id="ibtCancel"><a href="#">Cancel</a></label>
						<label class="actionBtn" id="ibtProceed"><a href="#"><label class="thumbUp">Proceed</label></a></label>
							
						
					</span>
				</div> <!-- End of popup actions-->
			
		</div> <!-- End of popupContent -->
	</div>

	<div id="printData" style="display: none">
		<div id="printbody">
			<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />
			<span style="display: none" class="print-head-date">${model.param.prevInputDate}</span>
			<div class="width100" style="">
				<div class="width70   reportName bold inline-block">
					eDGMS Discrepancies for Previous Day Receipt as of <label
						class="date-from-input"></label>
				</div>
				<div style="width: 25%" class="width25  right">
					<div class="  margin5 text-align-right ">${user.siteNo} |
						${user.siteName}</div>
				</div>
				<div class="width70 margin5 margontopnone inline-block">
					<label class="">Created on: </label><label class="currentDate"></label>
				</div>
			</div>

			<table border="0" cellspacing="0" cellpadding="1"
				class="printtabledis text-align-left font11 width100">

				<tr class="height30 bold border-bottom" id="tableHeader">
					<th>PO #</th>
					<th class="columnDivider">GR #</th>
					<th class="centerValue">PO Qty.</th>
					<th class="centerValue">GR Qty.</th>
					<th class="centerValue columnDivider">Difference in Qty.</th>
					<th class="numberColumn">PO Amount</th>
					<th class="numberColumn">GR Amount</th>
					<!--  <th class="numberColumn">Invoice Amount</th> CR modifications-->
					<th class="numberColumn ">Difference in Amount</th>
					<th class="numberColumn text-align-center">Act</th>
					<th class="numberColumn lastColumn">Sign.off</th>
				</tr>
				<%int recCount=0,pageNo=0; %>
				<c:forEach items="${edgmsDiscrepancyMap}" var="entry">
					<%if(recCount==15){recCount=1;pageNo++;%>
					<tr class="" style="height: 30px !important">
						<td style="padding: 0px;" colspan="5"><label class="bold">Printed
								on: </label><label class="currentDate"></label> <label class="separator">|</label>
							<label class="currentTime"></label></td>
						<td style="padding: 0px" colspan="4"><div
								class=" lineheight15 margin5 text-align-right ">
								Page <label class="pageno"></label> of <label class="totalpage"></label>
							</div></td>
					</tr>
			</table>
			<table cellspacing="0" cellpadding="1" id=""
				class="printtabledis text-align-left font11  width100" border="0"
				style="page-break-before: always; width: 100%">
				<tr>
					<td colspan="11" style="padding: 0px;">
						<div style="" id="contentDiv" class="width100 ">

							<div class="width70   reportName bold inline-block">
								eDGMS Discrepancies for Previous Day Receipt as of <label
									class="date-from-input"></label>
							</div>
							<div style="width: 25%" class="width25  right">
								<div class="  margin5 text-align-right ">${user.siteNo} |
									${user.siteName}</div>
							</div>
							<div class="width70 margin5 margontopnone inline-block">
								<label class="">Created on: </label><label class="currentDate"></label>
							</div>
						</div>
					</td>
				</tr>

				<tr class="height30 bold border-bottom-main" id="tableHeader">
					<th>PO #</th>
					<th class="columnDivider">GR #</th>
					<th class="centerValue">PO Qty.</th>
					<th class="centerValue">GR Qty.</th>
					<th class="centerValue columnDivider">Difference in Qty.</th>
					<th class="numberColumn">PO Amount</th>
					<th class="numberColumn">GR Amount</th>
					<!-- <th class="numberColumn">Invoice Amount</th> CR modifications-->
					<th class="numberColumn ">Difference in Amount</th>
					<th class="numberColumn text-align-center">Act</th>
					<th class="numberColumn lastColumn">Sign.off</th>
				</tr>

				<tr>
					<td class="bold height30" colspan="11">Vendor: ${entry.key}</td>
				</tr>
				<%}else{%>

				<tr>
					<td class="bold height30" colspan="11">Vendor: ${entry.key}</td>
				</tr>
				<%}recCount++; %>
				<c:set var="poNo" value=""></c:set>
				<c:forEach items="${entry.value}" var="edgmsDiscrepancy">
					<%if(recCount!=15){ %>

					<tr>
						<td class="normal">${edgmsDiscrepancy.poNo}</td>
						<td class="normal">${edgmsDiscrepancy.grNo}</td>
						<td class="centerValue"><c:if
								test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poTotalQty}</c:if></td>
						<td class="centerValue"><c:choose>
								<c:when test="${poNo==edgmsDiscrepancy.poNo}">
									<c:if test="${edgmsDiscrepancy.grnTotalqty!='0.000'}">
									${edgmsDiscrepancy.grnTotalqty}</c:if>
								</c:when>
								<c:otherwise>${edgmsDiscrepancy.grnTotalqty}</c:otherwise>
							</c:choose></td>
						<td class="centerValue cellHighlight"><c:if
								test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.qtyDiff}</c:if></td>
						<td class="numberColumn columnDivider text-align-right"><c:if
								test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poAmt}</c:if></td>
						<td class="numberColumn columnDivider text-align-right grnAmt">
							<c:choose>
								<c:when test="${poNo==edgmsDiscrepancy.poNo}">
									<c:if test="${edgmsDiscrepancy.grnAmt!='0.00'}">
									${edgmsDiscrepancy.grnAmt}</c:if>
								</c:when>
								<c:otherwise>${edgmsDiscrepancy.grnAmt}</c:otherwise>
							</c:choose>
						</td>
						<!--  <td class="numberColumn text-align-right invAmt"><c:choose>
								<c:when test="${poNo==edgmsDiscrepancy.poNo}">
									<c:if test="${edgmsDiscrepancy.invAmt!='0.00'}">
									${edgmsDiscrepancy.invAmt}</c:if>
								</c:when>
								<c:otherwise>${edgmsDiscrepancy.invAmt}</c:otherwise>
							</c:choose></td> CR modifications-->
						<td class="lastColumn numberColumn cellHighlight text-align-right"><c:if
								test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.amtDiff}</c:if></td>
						<td class="lastColumn numberColumn cellHighlight text-align-right"></td>
						<td class="lastColumn numberColumn cellHighlight text-align-right"></td>
					</tr>
					<%recCount++;}else{ ++pageNo;recCount=2; %>
					<tr class="" style="height: 30px !important">
						<td style="padding: 0px;" colspan="5"><label
							class="margin5 bold">Printed on: </label><label
							class="currentDate"></label> <label class="separator">|</label> <label
							class="currentTime"></label></td>
						<td style="padding: 0px" colspan="6"><div
								class=" lineheight15 margin5 text-align-right ">
								Page <label class="pageno"></label> of <label class="totalpage"></label>
							</div></td>
					</tr>
			</table>
			<table cellspacing="0" cellpadding="1" id=""
				class="printtabledis text-align-left font11  width100" border="0"
				style="page-break-before: always; width: 100%">
				<tr>
					<td colspan="11" style="padding: 0px;">
						<div style="" id="contentDiv" class="width100 ">

							<div class="width70   reportName bold inline-block">
								eDGMS Discrepancies for Previous Day Receipt as of <label
									class="date-from-input"></label>
							</div>
							<div style="width: 25%" class="width25  right">
								<div class="  margin5 text-align-right ">${user.siteNo} |
									${user.siteName}</div>
							</div>
							<div class="width70 margin5 margontopnone inline-block">
								<label class="">Created on: </label><label class="currentDate"></label>
							</div>
						</div>
					</td>
				</tr>

				<tr class="height30 bold border-bottom-main" id="tableHeader">
					<th>PO #</th>
					<th class="columnDivider">GR #</th>
					<th class="centerValue">PO Qty.</th>
					<th class="centerValue">GR Qty.</th>
					<th class="centerValue columnDivider">Difference in Qty.</th>
					<th class="numberColumn">PO Amount</th>
					<th class="numberColumn">GR Amount</th>
					<!--  <th class="numberColumn">Invoice Amount</th>CR modifications-->
					<th class="numberColumn ">Difference in Amount</th>
					<th class="numberColumn text-align-center">Act</th>
					<th class="numberColumn lastColumn">Sign.off</th>


				</tr>
				<tr>
					<td class="normal">${edgmsDiscrepancy.poNo}</td>
					<td class="normal">${edgmsDiscrepancy.grNo}</td>
					<td class="centerValue"><c:if
							test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poTotalQty}</c:if></td>
					<td class="centerValue"><c:choose>
							<c:when test="${poNo==edgmsDiscrepancy.poNo}">
								<c:if test="${edgmsDiscrepancy.grnTotalqty!='0.000'}">
									${edgmsDiscrepancy.grnTotalqty}</c:if>
							</c:when>
							<c:otherwise>${edgmsDiscrepancy.grnTotalqty}</c:otherwise>
						</c:choose></td>
					<td class="centerValue cellHighlight"><c:if
							test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.qtyDiff}</c:if></td>
					<td class="numberColumn columnDivider text-align-right"><c:if
							test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.poAmt}</c:if></td>
					<td class="numberColumn columnDivider grnAmt text-align-right"><c:choose>
							<c:when test="${poNo==edgmsDiscrepancy.poNo}">
								<c:if test="${edgmsDiscrepancy.grnAmt!='0.00'}">
									${edgmsDiscrepancy.grnAmt}</c:if>
							</c:when>
							<c:otherwise>${edgmsDiscrepancy.grnAmt}</c:otherwise>
						</c:choose></td>
					<!--  <td class="numberColumn text-align-right invAmt"><c:choose>
							<c:when test="${poNo==edgmsDiscrepancy.poNo}">
								<c:if test="${edgmsDiscrepancy.invAmt!='0.00'}">
									${edgmsDiscrepancy.invAmt}</c:if>
							</c:when>
							<c:otherwise>${edgmsDiscrepancy.invAmt}</c:otherwise>
						</c:choose></td>CR modifications-->
					<td class="lastColumn numberColumn cellHighlight text-align-right"><c:if
							test="${poNo!=edgmsDiscrepancy.poNo}">${edgmsDiscrepancy.amtDiff}</c:if></td>
					<td class="lastColumn numberColumn cellHighlight text-align-right"></td>
					<td class="lastColumn numberColumn cellHighlight text-align-right"></td>
				</tr>
				<%} %>
				<c:set var="poNo" value="${edgmsDiscrepancy.poNo}"></c:set>
				</c:forEach>

				</c:forEach>
			</table>
			<div style="height: 30px !important; margin-top: 10px" id="foot"
				class="width98">
				<div class="width35 margin5 inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="inline-block margin5 hideBlock endOfReport">End of
					Report</div>
				<div class="width35  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="pageno"></label> of <label class="totalpage"></label>
					</div>
				</div>
			</div>
		</div>

	</div>

	<script>
		$(function() {
			
			/*$('.DGMSDepartmentOptions').change(function(){
					$('.date-from-input').text($('.DGMSDepartmentOptions').val());
				});*/
			$(".ContentTableWrapper ").css('width','100%');
		
			//Code for accordion
			$("#accordion").accordion({
				header:"h3",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			// Code for profile menu
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			//Code for input box default text handling
			$('.textbox').focus(function(){
				if ( $(this).val() == $(this).attr('defaultVal') ){
				  $(this).val('');
				  $(this).removeClass("textboxDefaultText"); 				 
				}
			});
			
			$('.textbox').blur(function(){
				if ( $(this).val() == '' ){
				  $(this).val($(this).attr('defaultVal'));
				  $(this).addClass("textboxDefaultText"); 
				}
			});
			
			//Code for calndar control
			$(".inputDate").datepicker({
				zIndex:50
			});
			
			/* Code to 
				- Close accordion when report is generated
				- Show results
				
				Need to write a code by developer to handle a case when there is no data. The accordion in this case should remain open */
			
		/*	$("#generateReport").click(function(){
				$(".ContentTableWrapper").removeClass('hideBlock'); 
					
			});
			*/
			
			$("#tabs").tabs();
			

			$('.grnAmt').filter(function(){
				if($(this).text().trim()>0 && $(this).parent().find('.invAmt').text().trim()>0 )
				{
				$(this).addClass('cellHighlight').css('font-weight','bold');
				$(this).parent().find('.invAmt').addClass('cellHighlight').css('font-weight','bold');;
				}
				});

						
		});


$("#generateReport").click(function(e){
			$('#statusImg').removeClass(
			'loading hideBlock');
	$('#statusImg').addClass('loading');
			
			$('#edgmsDiscrepanciesForm').submit();
			});

		/*$("#backBtn").click(function(e) {
			window.location.href="../login/goingHome.htm";
		});*/
		$("#closeLink").click(function(e) {
			$('#accordion').accordion({active : true });	
		});

		var deptVal = $('#dropretain').val();
		$("#reportDate option[value='" + deptVal + "']").prop('selected',
				true);
		function isNumberKeyTemp(evt)
	    {
	       var charCode = (evt.which) ? evt.which : event.keyCode;
	       if ((charCode > 31 && (charCode< 48 || charCode >57))){
	    	   if(charCode==46){
	    		   return true;
	    	   }
	    	   return false;
	       }
	          
			
	       return true;
	       
	    }
	</script>

</body>
</html>
