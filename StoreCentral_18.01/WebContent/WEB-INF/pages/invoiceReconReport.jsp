<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<title>Invoice Reconciliation Report</title>
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

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/invoiceReconReport.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>


</head>
</head>
<body>
<input type="hidden" class="textbox" value="${properties.version}" name="jsVersion" id="jsVersion" />
 <input type="hidden" class="textbox" value="true" name="ineDGMSscreen" id="ineDGMSscreen" />
	<div class="mainWrapper woolworths" id="orderLookUpWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="hideBlock dtl"><a href="#">Invoice
								Reconciliation Report</a></li>
						<li class="navigate currentPage" onclick="navigate('enq')" id="brud_order_lookup" >Invoice Reconciliation Report</li>
						<li class="navigate currentPage hideBlock" onclick="navigate('dtl')"  data_back="enq" id="brud_order_detail" >Order Details</li>
						<!-- <li class="hideBlock vari"><a href="#">Order Details</a></li>
						<li class="currentPage hideBlock vari">Warehouse Variance
							Report</li> commenting out as there will be no warehouse orders -->
						<li class="navigate currentPage hideBlock" id="brud_update_order"  data_back="dtl">Update Received Qty.</li>	
							
					</ul>

				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label id="statusImg" class="loading hideBlock">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form name="reconReport" id="reconReport"
			modelAttribute="hierachyParam" action="reconReport.htm" method="GET">

			<div class="contentWrapper reportWrapper orders">


				<div class="articleAdditionalInfo">



					<div id="accordion">
						<h3>Generate Invoice Reconciliation Report</h3>
						<div>
							<div class="formWrapper">

								<div class="parameter">
									<label for="department" class="deptLbl">Department</label> <select
										class="selectOptions DGMSDepartmentOptions" id="department"
										name="dept">
										<option value="All">All</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>
									</select>
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="store" class="grnLbl">GR Date</label> <input
										type="#" class="textbox defaultTextbox inputDate"
										name="fromDateGrn" id="fromDateGrn"
										value="${model.param.fromDateGrn}" maxlength="10"
										placeholder="dd/mm/yyyy"> to <input type="#"
										class="textbox defaultTextbox inputDate" name="toDateGrn"
										id="toDateGrn" value="${model.param.toDateGrn}" maxlength="10"
										placeholder="dd/mm/yyyy">
								</div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label class="ordLbl">Order #</label> <input type="#"
										class="textbox" placeholder="Enter Order no."
										value="${model.param.orderNo}" name="orderNo" id="orderNo"
										maxlength="20">
								</div>
								<!-- End of parameter -->
								<div class="parameter"></div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label for="transactionType" class="disLbl">Discrepancy
										($)</label> <input type="#" class="textbox" placeholder="Enter Amount"
										value="${model.param.discrpAmt}" name="discrpAmt"
										id="discrpAmt" value="20"
										onkeypress="return isNumberKeyTemp(event)" maxlength="20">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label class="recLbl">Receipt with</label> <span> <input
										type="checkbox" name="invFlag" value="invoice" id="invoice"><label
										for="invoice" class="labelText paramCheckBox noiLbl">No
											Invoice</label> <input type="checkbox" name="adjFlag"
										value="adjustment" id="ranged"><label for="ranged"
										class="labelText adjLbl">Adjustment</label> <span>
								</div>
								<!-- End of parameter -->



								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->

						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->


					<!-- For displaying report results -->
					<div class="ContentTableWrapper hideBlock ContentTableWrapperError">


						<div class="tableInfo tableInfoError  tableStart">


							<div class="tableTitle  errorDiv" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
						</div>
					</div>
					<div id="reportContent" class="hideBlock ContentTableWrapper">

						<div class="tableInfo">

							<div class="tableTitle">
								<h4>
									Total <strong>50</strong> Orders with Discrepancies
								</h4>
							</div>
							<!-- End of table title -->

							<div class="tableActionBtns hideBlock">
								<label class="actionBtn" onclick="zeromplPrint();"><label
									class="print">Print</label></label>
							</div>
							<div class="paginationWrapper  paginationDiv" id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of table info -->

						<table cellspacing="0"
							class="ContentTable treetable drilldownTable actionRows extraHighlightRow">
						</table>


						<div class="paginationWrapper bottomPagination paginationDiv"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</div>
					<!-- End of Content Table Wrapper-->
				</div>
				<!-- End of article Additional Info -->
			</div>
			<!-- End of content wrapper -->
		</form:form>

		<%@include file="tabedOrderDetail.jsp"%>

		<input id="navBarHighlight" type="hidden" value="reports" />
		<div id="dialog-cancelOrder" title="Invoice">


			<div class="popupContent">

				<div class="popupData">
					<h4 class="alertText">Discrepancy amount will be defaulted
						before submit</h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="confirmYES">Ok</label> <label class="secondaryActionBtn"
							id="confirmNO"
							onclick="$('#dialog-cancelOrder').dialog('close');">Cancel</label>
						</span>
					</div>
					<!-- End of popup actions-->
				</div>
				<!-- End of pop up data -->
			</div>

			<!-- End of popupContent -->
		</div>

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
	<div id="printData" class="hideBlock">
		<div id="printbody"></div>

	</div>
	<div class="hideBlock">
		<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
			class="depPrint"></label><label class="catPrint"></label><label
			class="scPrint"></label><label class="segPrint"></label>
	</div>
</body>
</html>