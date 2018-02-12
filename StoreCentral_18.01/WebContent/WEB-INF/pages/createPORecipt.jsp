<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Create Order On Receipt</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/jquery.jWizard.css?version=${properties.version}" rel="stylesheet">
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/daterangepicker.jQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/jWizard.js?version=${properties.version}"></script>
<script src="../../scripts/delivery-date.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/descriptionPopup.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="orders" /> <input
				type="hidden" value="" id="tempFromService" /> <input type="hidden"
				value="" id="deptFromService" /> <input type="hidden" value=""
				id="poNoToCancel" name="poNoToCancel" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage"><a href='#'>Create Order On
								Receipt</a></li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="back">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->




		<div class="contentWrapper orderDetails">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4 class="sectionTitle">To create order on receipt, you need
							to create, Step 1.Purchase Requisition Step 2.Purchase Order
							3.Receive Purchase Order</h4>
						<h4 class="sectionTitle">Create Order On Receipt with
							Articles</h4>

					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->


				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label class="">Add
								Article</label></label>


					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form method="POST" action="" id="manualOrderSearchSubmit">
						<input type="hidden" name="index" id="index" value="" /> <input
							type="hidden" name="buttonRetain" id="buttonRetain"
							value="${buttonRetain}" /> <input type="hidden"
							name="vendorValidity" id="vendorValidity"
							value="${vendorValidity}" /> <input type="hidden" value=""
							id="desIndex" name="desIndex" /> <input type="hidden"
							value="${invalidQty}" id="invalidQty" name="invalidQty" /> <input
							type="hidden" value="" id="warehouseValue" name="warehouseValue" />
						<input type="hidden" value="${listSize}" id="listSize"
							name="listSize" /> <input type="hidden" value="${articleNo}"
							id="article-articleNo" /> <input type="hidden"
							value="${articlesuppNo}" id="article-suppNo" /> <input
							type="hidden" value="${articlesuppName}" id="article-suppName" />
						<input type="hidden" value="${articlesrcsupply}"
							id="article-srcsupply" />




						<div class="formWrapper">

							<div class="parameter">
								<label for="article" class="mandatory">Article</label> <input
									type="#" class="textbox articleSearchText" tabindex="1"
									id="articleNo" name="articleNo" maxlength="20"
									placeholder="Search by">
								<div class="searchByOptions">
									<input type="radio" checked="" id="article"
										value="ArticleNumber" name="articleType"><label
										class="labelText" for="article">Number</label> <input
										type="radio" id="description" value="description"
										name="articleType"><label class="labelText"
										for="description">Description</label> <input type="radio"
										id="article-Ean" value="EAN" name="articleType"><label
										class="labelText" for="article-Ean">EAN/TUN/PLU</label>
								</div>
							</div>
							<!-- End of parameter -->

							<div class="parameter hideBlock">
								<label for="qty" class="mandatory">Qty.</label> <input type="#"
									class="textbox  numberBox" name="ordqty" tabindex="2"
									id="ordqty" maxlength="20" placeholder="Quantity"
									onkeypress="return isDecimalNumber(this)">

							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<label for="sourceOfSupply" class="">Source of Supply</label>
								<!--
									<input type="radio" name="sourceSupply" value="2" id="warehouse" checked><label for="warehouse" class="labelText">Warehouse</label>
									-->
								<input type="radio" name="sourceSupply" value="1" id="vendor"
									checked><label for="vendor" class="labelText">Vendor</label>


								<div class="parameter IBTSource supplierSource">
									<!--
										<span id="warehouseField"> <select
										class="selectOptions" id="warehouseDropdown" name="warehouseDropdown">
											<option value="0">Select</option>
											<c:forEach items="${whList}" var="whVal">
												<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo} |
													${whVal.siteName}</option>
											</c:forEach>
									</select>
									</span> 
									-->

									<span id="vendorField"> <input type="#" class="textbox"
										name="suppName" value="" id="supplier" maxlength="20"
										placeholder="Enter supplier no. or name"> <label
										class="linkBtn" id="verifySupplier"><label
											class="advancedSearch">Verify</label></label>
									</span>
								</div>



							</div>
							<!-- End of parameter -->



							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd">Search & Add</label>
								<label class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
						<input type="hidden" name="supplierNumber" id="supplierNumber"
							value="${manualOrderParam.supplierDesc}" /> <input type="hidden"
							name="dropDownVal" id="dropDownVal"
							value="${manualOrderParam.warehouseDropdown}" /> <input
							type="hidden" value="${user.salesOrg}" id="userSalesOrg"
							name="userSalesOrg" />
					</form>

				</div>
				<!-- End of table Actions Wrapper -->

				<%int nodeId=1; %>
				<%int j=1; %>
				<c:if test="${not empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Qty.</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="70px">Actions</th>
						</tr>


						<c:forEach items="${articleList}" var="articleSearchResults">
							<tr id="row-1" class="row-1" data-tt-id="<%=nodeId%>">
								<%nodeId++; %>
								<td>&nbsp;</td>
								<td class="article-no">${articleSearchResults.articleNo}</td>
								<td>${articleSearchResults.description}</td>
								<td
									class="<c:if test="${articleSearchResults.baseUom!='KG'}">trimDecimalForSoh</c:if>">${articleSearchResults.SOH}</td>

								<td id="qty-<%=j%>" class="numberColumn nullCheck hideBlock">${articleSearchResults.inputQty}</td>
								<td id="qtyEdit-<%=j%>" class="numberColumn "><input
									id="qtyValue-<%=j%>" maxlength="20" placeholder="" type="#"
									value="${articleSearchResults.inputQty}"
									class="editNumCell textbox textboxDefaultText qtyValue inputQty"
									autocomplete="off"></td>

								<td class="numberColumn" id="om-<%=j%>">${articleSearchResults.OM}</td>

								<td class="numberColumn" id="totalOrder-<%=j%>">${articleSearchResults.totalOrdered}</td>

								<td id="rosterDate-<%=j%>"
									class="numberColumn hideBlock roster-date-saved">${articleSearchResults.orderDate}</td>
								<td id="rosterDateEdit-<%=j%>" class="numberColumn  dateCheck">
									<input type="#" value="${articleSearchResults.orderDate}"
									id="rosterDateValue-<%=j%>"
									class="roster-date textbox textboxDefaultText inputDate editDateCell">
								</td>
								<td id="deliverDate-<%=j%>"
									class="numberColumn hideBlock delivery-date-saved">${articleSearchResults.deliveryDate}</td>
								<td id="deliverDateEdit-<%=j%>" class="numberColumn  "><input
									id="deliverDateValue-<%=j%>" maxlength="20" type="#"
									value="${articleSearchResults.deliveryDate}"
									class="delivery-date textbox textboxDefaultText inputDate editDateCell">
								</td>
								<td class="lastColumn centerValue"><label
									class="linkBtn editRowBtn hideBlock" id="editRecord-<%=j%>">
										<label class="editRecord">Edit</label>
								</label> <label class="linkBtn saveRowBtn " id="saveRecord-<%=j%>">
										<label class="saveRecord">Save</label>
								</label> <input type="hidden" class="saveFlagCheck"
									value="${articleSearchResults.saveFlag}" id="saveFlag-<%=j%>" />
									<input type="hidden"
									value="${articleSearchResults.baseUOMDesc}" id="baseUom-<%=j%>" />
									<label class="linkBtn deleteBtn" id="DeleteRecord-<%=j%>">
										<label class="deleteRecord ">Delete</label>
										<%j++;%>
								</label></td>
							</tr>

							<tr data-tt-id="<%=nodeId%>" data-tt-parent-id="<%=nodeId-1%>">
								<td colspan="10">
									<table cellspacing="0" class="ContentTable" width="100%">

										<tr>
											<td class="keyInfo">Vendor:</td>
											<td class="valueInfo" colspan="5">
												${articleSearchResults.vendorNo}<c:if
													test="${not empty articleSearchResults.vendorName}"> | ${articleSearchResults.vendorName}</c:if>
											</td>
										</tr>

										<tr>
											<td width="20%" class="keyInfo">Carton Qty.:</td>
											<td width="13%" class="valueInfo">
												${articleSearchResults.OM}</td>
											<td width="20%" class="keyInfo">Unit Cost:</td>
											<td class="valueInfo" width="13%">
												${articleSearchResults.purChasePrice}</td>
											<td width="20%" class="keyInfo">Sell Out Days:</td>
											<td class="valueInfo lastColumn" width="13%"></td>
										</tr>
										<tr class="lastRow">
											<td colspan="6" class="lastColumn"><label
												class="history"
												onclick="showHistoryPopUp('${articleSearchResults.articleNo}','${articleSearchResults.description}','${articleSearchResults.OM}')">Sales
													History</label> <label class="notpadLink"
												id="${articleSearchResults.articleNo}">Open Orders</label></td>
										</tr>
									</table>
								</td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Qty.</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="80px">Actions</th>
						</tr>
						<tr id="row-1" data-tt-id="1">
							<td colspan="11">No articles added in the order.</td>

						</tr>


					</table>
				</c:if>
			</div>
			<!-- End of content table wrapper -->
			<c:if test="${not empty articleList}">
				<div class="pageActions " id="con-final">
					<label class="actionBtn" id="confirmAndFinalise"> <label
						class="thumbUp">Confirm & Finalise</label></label> <label
						class="secondaryActionBtn" id="clear">Clear</label>
				</div>
				<!-- End of page actions-->
			</c:if>
			<%-- <c:if test="${not empty msg}"> --%>
			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">

						<h4 id="validMsg">${msg}</h4>
					</div>




				</div>
			</div>
			<%-- </c:if> --%>
			<!-- End of content wrapper -->
			<div id="dialog-PReqPop"
				title="Purchase Requisition Created Successfully">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText">
							<strong id="message"></strong>
						</h4>

						<h4 class="alertText">
							Do you want to create a purchase order now?<br />
						</h4>
						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="confirmYES1">Yes</label> <label class="secondaryActionBtn"
								id="confirmNO1">No, later</label>
							</span>
						</div>
						<!-- End of popup actions-->

					</div>
					<!-- End of pop up data -->

				</div>
				<!-- End of popupContent -->
			</div>


			<div id="dialog-PoReceipt" title="Create Order On Receipt">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText">
							<strong id="message1"></strong>
						</h4>
						<h4 class="alertText" id="message2"></h4>
						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="createBtn">Create Purchase Order</label>
							</span>
						</div>
						<!-- End of popup actions-->



					</div>
				</div>
				<!-- End of popupContent -->
			</div>


			<div id="dialog-PoRecevie" title="Create Order On Receipt">
				<div class="popupContent">

					<div class="popupData">
						<h4 class="alertText">
							<strong id=recvMessage></strong>
						</h4>
						<h4 class="alertText" id="message2">You are almost done.
							Click on Receive Order to proceed</h4>
						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="recvBtn">Receive Order</label>
							</span>
						</div>
						<!-- End of popup actions-->



					</div>
				</div>
				<!-- End of popupContent -->
			</div>

			<div id="dialog-modal" title="Create Order On Receipt">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText" id="alertBox"></h4>

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="okBtn">OK</label>
							</span>
						</div>
						<!-- End of popup actions-->



					</div>
				</div>
				<!-- End of popupContent -->
			</div>
			<!-- End of popup -->


		</div>
		<div id="dialog-modal1" title="Verify Supplier">
			<div class="popupContent">
				<div class="popupSearchWrapper" id="popupSearch">
					<h3>Supplier Name:</h3>
					<input type="#" placeholder="Enter supplier name"
						class="textbox textboxDefaultText" id="vendorDesc"> <label
						class="actionBtn" id="goButtonSample">Go</label>
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
		<div id="dialog-modal-orders" title="Open Orders">
			<div class="popupContent">
				<div class="popupData" id="ordersWithOpenStatus"></div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="closePopup">OK</label>
					</span>
				</div>



			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End of popup -->


		<div id="dialog-modalGST" title="Order Detail">
			<div class="popupContent">

				<div class="popupData">


					<h4 class="alertText" id="GstText"></h4>

					<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

					<div class="popupActionsWrapper">
						<span class="popupActions"> <!-- onclick='$("#dialog-modal1" ).dialog( "close" );' -->
							<label class="actionBtn" id="gstChange">OK</label>
						</span>
					</div>
					<!-- End of popup actions-->

					<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

				</div>
			</div>
		</div>

		<div id="dialog-cancelOrder" title="Create Purchase Requisition">
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

		<%@include file="descpopup.jsp"%>
		<div id="dialog-PoWithReceive" title="Receive an Order">
			<div class="popupContent wizardContent">



				<div class="popupData">

					<h4 class="alertText">Please provide following information to
						proceed to Receive and finalize the order.</h4>


					<form method="GET" action="" id="wizard">

						<div class="formWrapper" title="Basic Information">
							<h2 class="wizardTitle">Enter Basic Information</h2>

							<div class="parameter">
								<label for="amount">Provide</label>
								<div class="selectOptions">
									<input type="radio" name="receiveOptions" value="receiveamount"
										id="receiveAmount" checked><label for="receiveAmount"
										class="labelText">Invoice</label> <input type="radio"
										name="receiveOptions" value="receivedocket" id="receiveDocket"><label
										for="receiveDocket" class="labelText">Docket</label>
								</div>
							</div>
							<!-- End of parameter -->

							<div id="invoiceEntry">
								<div class="parameter">
									<label for="invoice" class="mandatory">Invoice #</label> <input
										placeholder="Enter invoice number" maxlength="15" type="#"
										class="textbox alphaNumeric" id="invoice" name="invoiceNo"
										autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="amount" class="mandatory">Total Amount ($)</label>
									<input placeholder="Enter total amount" maxlength="11" type="#"
										class="textbox" id="amount"
										onkeypress="return isDecimalAmt(event,'amount')"
										name="invoiceTotal" autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="gst" class="mandatory">GST ($)</label> <input
										placeholder="Enter gst" maxlength="11" type="#"
										class="textbox" id="gst"
										onkeypress="return isDecimalAmt(event,'gst')" name="gst"
										autocomplete="off">
								</div>
								<!-- End of parameter -->
							</div>

							<div class="parameter hideBlock" id="docketEntry">
								<label for="docket" class="mandatory">Delivery Docket</label> <input
									placeholder="Enter delivery docket" maxlength="25" type="#"
									class="textbox alphaNumeric" id="docket" name="delDock"
									autocomplete="off">
							</div>
							<!-- End of parameter -->
							<div class="errorDiv parameter">
								<h4></h4>
							</div>
						</div>
						<!-- End of content table wrapper -->

						<div class="formWrapper" title="Confirm Information">
							<h2 class="wizardTitle">Re-enter Information</h2>


							<div id="invoiceEntryConfirm">
								<div class="parameter">
									<label for="invoice" class="mandatory">Invoice #</label> <input
										type="#" placeholder="Re-enter invoice number" maxlength="15"
										class="textbox alphaNumeric" id="invoiceConfirm"
										autocomplete="off">
								</div>
								<!-- End of parameter -->



								<div class="parameter">
									<label for="amount" class="mandatory">Total Amount ($)</label>
									<input placeholder="Re-enter total amount" maxlength="11"
										type="#" class="textbox" id="amountConfirm"
										onkeypress="return isDecimalAmt(event,'amountConfirm')"
										autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="gst" class="mandatory">GST ($)</label> <input
										type="#" placeholder="Re-enter gst" maxlength="11"
										class="textbox" id="gstConfirm"
										onkeypress="return isDecimalAmt(event,'gstConfirm')"
										autocomplete="off">
								</div>
								<!-- End of parameter -->
							</div>

							<div class="parameter hideBlock" id="docketEntryConfirm">
								<label for="docket" class="mandatory">Delivery Docket</label> <input
									placeholder="Re-enter delivery docket" maxlength="25" type="#"
									class="textbox alphaNumeric" id="docketConfirm"
									autocomplete="off">
							</div>
							<!-- End of parameter -->
							<div class="errorDiv parameter">
								<h4></h4>
							</div>
						</div>
						<!-- End of content table wrapper -->


						<div class="formWrapper temperatureExist"
							title="Temperature Information">
							<h2 class="wizardTitle">Enter Temperature Information</h2>
							<div class="parameter">
								<label for="temperature" class="mandatory">Temperature</label> <input
									type="#" placeholder="Enter temperature" maxlength="5"
									class="textbox" id="temperature"
									onkeypress="return isNumberKeyTemp(event)" name="temperature"
									autocomplete="off">
							</div>
							<!-- End of parameter -->

							<div class="warningMessage">
								<h4></h4>
							</div>

							<div class="parameter formQuestion hideBlock">

								<p class="question"></p>
								<span class="radioHide"> <input type="radio"
									name="question" value="yes" id="ansyes" checked><label
									for="ansyes" class="labelText">Yes</label> <input type="radio"
									name="question" value="no" id="ansno"><label
									for="ansno" class="labelText">No</label></span>
							</div>
							<!-- End of parameter -->
							<!--   <input type="hidden" value="${orderdet.temperature}" id="tempFromService" />
						<input type="hidden" value="${orderdet.tradingDepNo}" id="deptFromService" />
						 -->

							<div class="errorDiv parameter">
								<h4></h4>
							</div>

						</div>
						<!-- End of content table wrapper -->
					</form>
				</div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper hideBlock">
					<span class="popupInfo"> <label class="mandatory">mandatory</label>
					</span> <span class="popupActions"> <label class="actionBtn"
						id="proccedBtn">Proceed</label> <label class="secondaryActionBtn"
						id="cancelBtn">Cancel</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of popupContent -->
		</div>
		<div id="dialog-SalesHistoryPop" title="Sales History">
			<div class="popupContent">


				<div class="popupData" id="salesHistoryPopupData"></div>
				<!-- End of pop up data -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="historyClose">OK</label>
					</span>
				</div>



			</div>
			<!-- End of popupContent -->
		</div>
	</div>
	<%@include file="footer.jsp"%>


	<div id="dialog-back" title="Create Order">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">Are you sure you want to discard the
					changes?</h4>
				<!-- Commented by Haresh
					<div class="ContentTableWrapper popMessage">

						<label>Are you sure you want to save the changes?</label>

					</div>
					 End of content table wrapper -->



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="confirmYES"
						onclick="window.location.href= '../login/goingHome.htm'">Yes</label>
						<label class="secondaryActionBtn" id="confirmNO"
						onclick="$('#dialog-back').dialog('close');">No</label>
					</span>
				</div>
				<!-- End of popup actions-->


				<!--  commented by Haresh
					<div class="popMessageBtnWrapper">
						<label class="actionBtn popMessageBtn" id="confirmYES"
							onclick="$('#sohSubmit').submit();">Yes</label> <label
							class="actionBtn popMessageBtn" id="confirmNO"
							onclick="$('#dialog-cancelOrder').dialog('close');">No</label>
					</div>  -->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>


	<script type="text/javascript">
/* Autocomplete Off */
 fromSave=false;
$(document).ready(function(){
	document.forms[0].autocomplete="off";
	$('.trimDecimalForSoh').filter(function(){
		var value=$(this).text();
		$(this).text(value.split(".")[0]);
		});
 });

</script>
	<script>

				//new
				$('#gst').change(function() {
					if($('#gst').val()!="")
					$('#gst').val(parseFloat($('#gst').val()).toFixed(2));
				});
				$('#gstConfirm').change(function() {
					if($('#gstConfirm').val()!="")
					$('#gstConfirm').val(parseFloat($('#gstConfirm').val()).toFixed(2));
				});
				$('#amount').change(function() {
					if($('#amount').val()!="")
						
					$('#amount').val(parseFloat($('#amount').val()).toFixed(2));
				});
				$('#amountConfirm').change(function() {
					if($('#amountConfirm').val()!="")
						
					$('#amountConfirm').val(parseFloat($('#amountConfirm').val()).toFixed(2));
				});

				//new
				$('#temperature').change(function() {
					if($('#temperature').val().trim()!=""){
				$('#temperature').val(parseFloat($('#temperature').val()).toFixed(1));
						}
			});
				
				function isNumberKeyTemp(evt)
			    {
			       var charCode = (evt.which) ? evt.which : event.keyCode;
			       if ((charCode > 31 && (charCode< 48 || charCode >57))){
			    	   if(charCode==45 || charCode==46){
			    		   return true;
			    	   }
			    	   return false;
			       }
			          
					
			       return true;
			    }
				 function callNextPopup(){
					 	

					 	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

					 	//$('.callCancel').attr('onclick','callCancelOrder();');
					 			$('.formQuestion p').text('');
								$('.warningMessage h4').text(question3);
								quesLevel=2;
								$('.formQuestion').removeClass('hideBlock');
								$('.warningMessage h4').removeClass('hideBlock');
								
					 			//$('.popMessagetemp').text(question3);
					 			//$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");$("#temperature").focus()');
					 			//$('.confirmYesTemp').attr('onclick','callCancelOrder();');
					 			

					 	}

				 function callCancelOrder(){
				 		var poNoToCancel=$('#poNoToCancel').val();
				 		//alert("call cancel");
				 			 
				 			$( "#dialog-PoWithReceive" ).dialog( "close" );
				 			  $.ajax({
				 					type : "GET",
				 					url : "cancelGoodsOrder.htm",
				 					beforeSend: function(){
				 						$('#statusImg').removeClass('loading hideBlock');
				 						$('#statusImg').addClass('loading');
				 						},
				 					data : "poNoToCancel=" +poNoToCancel+ "&recQty=" + "" ,
				 					success : function(response) {
				 						//$('#tempValue').val(response);
				 						$('#statusImg').addClass('loading hideBlock');
				 						$('#statusImg').removeClass('loading');	
				 						if(response=="true"){
				 						$('#alertBox').text("Request for cancelling the Order is successfully submitted");
				 						$( "#dialog-modal" ).dialog( "open" );
				 						$('#okBtn').click(function(e){
				 							$( "#dialog-modal" ).dialog( "close" );
				 							$('#msg').val('');
				 							window.location.href= "../poReceipt/onPageLoadPORecipt.htm";
				 							});;
				 							
				 						}
				 						else {
				 							$('#alertBox').text(response);
				 							$( "#dialog-modal" ).dialog( "open" );
				 							$('#okBtn').click(function(e){
				 								$( "#dialog-modal" ).dialog( "close" );
				 								$('#msg').val('');
				 								});;
				 								
				 							}
				 								
				 					},
				 					
				 				}); 
				 			
				 		 
				 		
				 	}
			    
		$(function() {
			//enter key press
			 $(document).keypress(function(event) {
				    if (event.which == 13) {
				        event.preventDefault();	
				        $('#searchAndAdd').click();
				        }
			 });
			$('.saveFlagCheck').filter(function()
					{
				if($(this).val()=='Y')
				{
					var id = (this.id).split('-')[1];
					$(("#qtyEdit-").concat(id)).addClass('hideBlock');
					$(("#qty-").concat(id)).removeClass('hideBlock');
				
 					$(("#rosterDateEdit-").concat(id)).addClass('hideBlock');
					$(("#rosterDate-").concat(id)).removeClass('hideBlock');	

					$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
					$(("#deliverDate-").concat(id)).removeClass('hideBlock');

					$(("#saveRecord-").concat(id)).addClass('hideBlock');
					$(("#editRecord-").concat(id)).removeClass('hideBlock');					
						
				}
				
				}
			);
			setTimeout(function(){
							$(("#qtyValue-").concat($('#listSize').val())).focus(function() { 
							    var elem = $(this);
							    elem.val(elem.val());
							});

							$(("#qtyValue-").concat($('#listSize').val())).focus();
						
						},200);
					
			

			$(".inputDate").datepicker({
				zIndex:50
			});

			$("#gstChange").click(function(e) {			
			$( "#dialog-modalGST" ).dialog( "close" );
			setTimeout(function(){$('#gst').focus();},500);
			});
			
			$(".alphaNumeric").bind("keypress", function (event) {
			    if (event.charCode!=0) {
			        var regex = new RegExp("^[a-zA-Z0-9]+$");
			        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			        if (!regex.test(key)) {
			            event.preventDefault();
			            return false;
			        }
			    }
			});
			$('#ui-id-2,#ui-id-3,#prev,#next,#receiveAmount,#receiveDocket').click(function(){
				$('#next').addClass('jw-button-next');
				if(tempChange==false)
				$('.errorDiv h4').text('');
		});
		$('#ui-id-2,#ui-id-3').click(function(){
			$('#next').addClass('jw-button-next');
			$('.errorDiv h4').text('');
			$('.formQuestion').addClass('hideBlock');
			$('#temperature').val('');
	});
		$("#temperature").keyup(function(){
			$('.formQuestion').addClass('hideBlock');
			$('.warningMessage h4').addClass('hideBlock');
			$('.errorDiv h4,.formQuestion p').text('');
			$('#ui-id-2,#ui-id-3,#prev,#next,#receiveAmount,#receiveDocket').click(function(){
				$('#next').addClass('jw-button-next');
				if(tempChange==false)
				$('.errorDiv h4').text('');
			});
			if ($('#temperature').val() != "" && $.trim($('#temperature').val()).length > 0 && !(isNaN($('#temperature').val()))){
			//alert("temp blur func");
			//var dept=$('#deptFromService').val();
			tempChange=true;
			//alert("dept"+dept);
			//dept="005,006";
			//alert("dept"+dept);
			//var deptArray=dept.split(",");
		var salesOrg=$('#userSalesOrg').val();
			var range=$('#tempFromService').val();
			if(salesOrg==1020){
				range="(-15 to 5)";
				}
			var slicedRange=range.slice(1,-1);
			var tempValArray=slicedRange.split(" to ");
			
			var rank=$('#deptFromService').val();
			/* for(var i=0;i<deptArray.length;i++){
				if(deptArray[i]=="003" || deptArray[i]=="004" || deptArray[i]=="008" || deptArray[i]=="070" || deptArray[i]=="012"){
					rank=1;
				//	alert("rank=1");
					break;
				}else if(deptArray[i]=="006"){
					if(rank>2){
						rank=2;
					}
					
				}else if(deptArray[i]=="005"){
					if(rank>3){
						rank=3;
					}
						
				}
			} */
			if(rank==4){
				/* if(tempValArray[0]<0){
					rank=1;
				}else if(tempValArray[0]>=0 && tempValArray[0]<=5){
					rank=2;
				}else{
					rank=3;
				} */
				rank=3;
				
			}
			//alert("rank ="+rank);
			var question1="";
			var question2="";
			if(rank=="1"){
				//alert("rank==1");
				question1="Are the frozen products not frozen?";
				question2="Temperature is too high. Will load be rejected?";
			}else if(rank=="2"){
				//alert("rank==2");
				question1="Is this delivery high risk produce?";
				question2="Incorrect temperature. Will load be rejected?";
			}else if(rank=="3"){
				//alert("rank==3");
				question1="Is the delivery carcass meat?";
				question2="Incorrect temperature. Will load be rejected?";
			}
			if((Number($('#temperature').val())<-99.9 || Number($('#temperature').val())>99.9))
			{
			
				$('.formQuestion p').text('');
				$('.warningMessage h4').text('Please enter the temperature within the range "-99.9 to 99.9"');
				quesLevel=10;
				$('.radioHide').addClass('hideBlock');
				$('.warningMessage h4').removeClass('hideBlock');
				$('.formQuestion').addClass('hideBlock');
				
			
				
				
				
			}
			else if(salesOrg==1020){

				$('.warningMessage h4').addClass('hideBlock');
				 $('.radioHide').removeClass('hideBlock');
				 
				 question1="Does this order contain frozen items?";
				 question2="Are products hard frozen?";
				 question3="Temperature too high. Will entire order be rejected/cancelled?";
				 question4="Temperature too high.Refer to Food Safety Guide and receive rejected items as zero QTY. Ok?";
				 question5="Entire load is being rejected/cancelled due to incorrect temperature. Is this correct?";
				 //question6="Do you wish to receive  every item in this order as ZERO Qty?";
				
				 
				 
				 
				 if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
					{
							

						
						$('.formQuestion p').text(question1);
						$('.errorDiv h4').text('');
						quesLevel=4;
						$('.formQuestion').removeClass('hideBlock');
						$('.formQuestion p').removeClass('hideBlock');
						
						
						
					}else if(Number($('#temperature').val())>=tempValArray[1]){
						focus="temperature";
						$('.errorDiv h4').text('');
						$('.formQuestion p').text(question3);
						quesLevel=5;
						$('.formQuestion').removeClass('hideBlock');
						$('.formQuestion p').removeClass('hideBlock');
						
					}
					else{
						$('.errorDiv h4').text('');
						$('.formQuestion p').text('');
						quesLevel=3;
						}
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
			}else{
				
				$('.warningMessage h4').addClass('hideBlock');
				 $('.radioHide').removeClass('hideBlock');
				 
			if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
			{
				//alert("temp in range");
				//alert("question1"+question1);
				
				
				//*******
				//$('.popMessagetemp').text(question1);
				//$( "#dialog-temperature" ).dialog( "open" );	
				$('.formQuestion p').text(question1);
				$('.errorDiv h4').text('');
				quesLevel=1;
				$('.formQuestion').removeClass('hideBlock');
				$('.formQuestion p').removeClass('hideBlock');
				
				
				
			}else if(Number($('#temperature').val())>=tempValArray[1]){
				//alert("temp above range");
				//alert(question2);
				focus="temperature";
				//$('.popMessagetemp').text(question2);
				//$( "#dialog-temperature" ).dialog( "open" );	
				$('.errorDiv h4').text('');
				$('.formQuestion p').text(question2);
				quesLevel=1;
				$('.formQuestion').removeClass('hideBlock');
				$('.formQuestion p').removeClass('hideBlock');
				
			}
			else{
				$('.errorDiv h4').text('');
				$('.formQuestion p').text('');
				quesLevel=3;
				}	
			$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );$("#invoiceNo").focus();');
			$('.confirmYesTemp').attr('onclick','callNextPopup()');
			}
		}
		});
		
		 function callNextPopup(){
			 	

			 	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

			 	//$('.callCancel').attr('onclick','callCancelOrder();');
			 			$('.formQuestion p').text('');
						$('.warningMessage h4').text(question3);
						quesLevel=2;
						$('.formQuestion').removeClass('hideBlock');
						$('.formQuestion p').removeClass('hideBlock');
						
			 			//$('.popMessagetemp').text(question3);
			 			//$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");$("#temperature").focus()');
			 			//$('.confirmYesTemp').attr('onclick','callCancelOrder();');
			 			

			 	}

			 	/* function callCancelOrder(){
			 		
			 		//alert("call cancel");
			 			 
			 			$( "#dialog-PoWithReceive" ).dialog( "close" );
			 			  $.ajax({
			 					type : "GET",
			 					url : "cancelGoodsOrder.htm",
			 					beforeSend: function(){
			 						$('#statusImg').removeClass('loading hideBlock');
			 						$('#statusImg').addClass('loading');
			 						},
			 					data : "index=" + "" + "&recQty=" + "" ,
			 					success : function(response) {
			 						//$('#tempValue').val(response);
			 						$('#statusImg').addClass('loading hideBlock');
			 						$('#statusImg').removeClass('loading');	
			 						if(response=="true"){
			 						$('#alertBox').text("Request for cancelling the Order is successfully submitted");
			 						$( "#dialog-modal" ).dialog( "open" );
			 						$('#okBtn').click(function(e){
			 							$( "#dialog-modal" ).dialog( "close" );
			 							$('#msg').val('');
			 							});;
			 							window.location.href= "../poReceipt/onPageLoadPORecipt.htm";
			 						}
			 						else {
			 							$('#alertBox').text(response);
			 							$( "#dialog-modal" ).dialog( "open" );
			 							$('#okBtn').click(function(e){
			 								$( "#dialog-modal" ).dialog( "close" );
			 								$('#msg').val('');
			 								});;
			 								
			 							}
			 								
			 					},
			 					
			 				}); 
			 			
			 		 
			 		
			 	} */
			$( "#dialog-modal1" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
			$( "#dialog-modal2" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
				$( "#dialog-modal" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 350
				});
				$("#dialog-modal").parent().addClass("popupWrapper");
				$( "#dialog-cancelOrder" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 350
				});
			 $("#dialog-cancelOrder").parent().addClass("popupWrapper");
				$( "#dialog-PoReceipt" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 400
				});
				$("#dialog-PoReceipt").parent().addClass("popupWrapper");


				$( "#dialog-PoRecevie" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 400
				});
				$("#dialog-PoRecevie").parent().addClass("popupWrapper");
				
				 //checks radio buttons in Invoice Info
				$('#receiveAmount').click(function(){
					$("#invoiceEntry").removeClass('hideBlock');
					$("#docketEntry").addClass('hideBlock');
					$("#invoiceEntryConfirm").removeClass('hideBlock');
					$("#docketEntryConfirm").addClass('hideBlock');
					setTimeout(function(){$('#invoice').focus();},500);
					$('#docket,#docketConfirm').val('');
					
				});
				
				$('#receiveDocket').click(function(){
					$("#docketEntry").removeClass('hideBlock');
					$("#invoiceEntry").addClass('hideBlock');
					$("#docketEntryConfirm").removeClass('hideBlock');
					$("#invoiceEntryConfirm").addClass('hideBlock');
					setTimeout(function(){$('#docket').focus();},500);
					$('#gst,#gstConfirm,#amount,#amountConfirm,#invoice,#invoiceConfirm').val('');
				});
				
				 $( "#dialog-PReqPop" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 120,
						maxHeight: 600,
						width: 400
					});
				 $( "#dialog-modal-orders" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 800
					});
					
					$("#dialog-modal-orders").parent().addClass("popupWrapper");
					$( "#dialog-modalGST" ).dialog({				
								autoOpen: false,
								modal: true,
								resizable: false,
								minHeight: 120,
								maxHeight: 600,
								width: 430
							});
						
						$("#dialog-modalGST").parent().addClass("popupWrapper");
					
					
					$("#dialog-PReqPop").parent().addClass("popupWrapper");



					$( "#dialog-SalesHistoryPop" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 800
					});


					$( "#dialog-PoWithReceive" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 430
					});
					$("#dialog-PoWithReceive").parent().addClass("popupWrapper");

					$( "#dialog-IBTSitePop" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 400
					});
					$("#dialog-IBTSitePop").parent().addClass("popupWrapper")
		
			 //checks radio buttons in IBT Site
			$(".notpadLink").click(function() {		
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				var articleNo = (this.id);
				
				$.ajax({
					type : "GET",
					url : "getOrderWithOpenStatus.htm",
					
					data : "articleNo=" + articleNo,
					success : function(response) {
						$('#ordersWithOpenStatus').html('');
						$("#dialog-modal-orders" ).dialog("open");
						$('#ordersWithOpenStatus').html(response);
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');	
					},
				});							
					
				});
				
				$("#closePopup").click(function() {									
					$("#dialog-modal-orders" ).dialog("close");
				});
					
			$('#warehouse').click(function(){
				if($('.row-1').text()==''){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				$('#supplier').val('');
				}
				//$("#storeLabel").text("To Warehouse");
			});
			
			$('#vendor').click(function(){
				if($('.row-1').text()==''){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$('#warehouseDropdown').val("0");
				}
				//$("#storeLabel").text("To Store");
			});
			
			
			if($('#article-articleNo').val()!=''){
			$('#articleNo').val($('#article-articleNo').val());
			
			if($('#article-srcsupply').val()=='1')
				{
				
				$('#vendor').click();
				if($('#article-suppName').val()!='No Supplier Found' && $('#article-suppName').val()!='' && $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
					$('#supplier').val($('#article-suppNo').val()+'-'+$('#article-suppName').val());
					}
					else if( $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
						$('#supplier').val($('#article-suppNo').val());
						}
				}
			else{
				$('#warehouse').click();
				 if( $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
					 $('#warehouseDropdown').val($('#article-suppNo').val());
						}
				
				}	
				}
			if($('#invalidQty').val()=='true')
				{
				$('#alertBox').text('Article quantity cannot be decimal value. It is truncated to whole number');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});;
					$('#invalidQty').val('');
				}
			//onkeypress="return isNumberKey(event)"
			//
			function formateDate(v){
				if(v.length==8)
				{
				var finalDate=parseDate(v).getFullYear();
				var splitDate=v.split("/");
				finalDate =splitDate[0]+"/"+splitDate[1]+"/"+finalDate;
				return finalDate;
				}
				else{
					return v;	
					}
				}
			
			$('.inputQty').filter(function()
				{
				var id = (this.id).split('-')[1];
				
				
			if($(("#baseUom-").concat(id)).val()=='each')
				{
				//onkeyup="isNumber1('#ordqty')"
				$(("#qtyValue-").concat(id)).attr('onkeypress','return isNumberKey(event)');
				}	
			else
				{
				//var id1=$(("#qtyValue-").concat(id));
				//var id1='#qtyValue-'+id;
				$(("#qtyValue-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
				}
			}
			);
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
			});
			
			
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
			
			if($('.row-1').text()=='')
				{
				$('#supplier').removeAttr('readonly');
				$('#warehouseDropdown').removeAttr('disabled','disabled');
				
				}
			else{
				$('#supplier').attr('readonly','readonly');
				$('#warehouseDropdown').attr('disabled','disabled');
				}
			
			/*when edit button is clicked displays input box in editable cells*/
		
			$(".editRowBtn").click(function(){
				$('#validMsg').text('');
				var id = (this.id).split('-')[1];
								
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#qtyEdit-").concat(id)).removeClass('hideBlock');
				$(("#qty-").concat(id)).addClass('hideBlock');
				
				$(("#rosterDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#rosterDate-").concat(id)).addClass('hideBlock');
				
				$(("#deliverDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliverDate-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			var retainFlag=true;

			if($("#buttonRetain").val()==1)
			{
			$('#vendor').click();
			if($('.row-1').text()!=''){
			$('#warehouse').click(function(){
			    return false;
			});
			$("#warehouseField").addClass('hideBlock');
			$("#vendorField").removeClass('hideBlock');
			$('#supplier').val($("#supplierNumber").val());
			retainFlag=false;
			}
			}	
			else if($("#buttonRetain").val()==2)
			{
			$('#warehouse').click();
			if($('.row-1').text()!=''){
			$('#vendor').click(function(){
			    return false;
			});
			$("#vendorField").addClass('hideBlock');
			$("#warehouseField").removeClass('hideBlock');
			$('#warehouseDropdown').val($("#dropDownVal").val());
			retainFlag=false;
			}
			}
			
			$('#vendor').click(function(e){
			if(retainFlag)
				$('#supplier').val('');
			});
			$('#warehouse').click(function(e){
				if(retainFlag)
			$('#supplier').val('');
			});
			$("#closeLink").click(function(){ 
				
				$("#tableAddAction").addClass('hideBlock');
			});
		/*$(".rosDate").change(function(){
							var id = (this.id).split('-')[1];
						var currentDate=new Date();
						var rosDate=$(("#rosterDateValue-").concat(id)).val();
						var delDate=$(("#deliverDateValue-").concat(id)).val();
						var splittedRosDate=rosDate.split('/');
						var splittedDelDate=delDate.split('/');
						var actualRosDate=new Date();
						var actualDelDate=new Date();
						var month1=splittedRosDate[1]-1;
						var month2=splittedDelDate[1]-1;
						actualRosDate.setFullYear(splittedRosDate[2],month1,splittedRosDate[0]);
						actualDelDate.setFullYear(splittedDelDate[2],month2,splittedDelDate[0]);
						var splittedOne=splittedRosDate[0]+splittedRosDate[1]+splittedRosDate[2];
						var splittedTwo=splittedDelDate[0]+splittedDelDate[1]+splittedDelDate[2];				
						if(splittedOne=="")
						{
							$('#alertBox').text('Please fill the roster date');
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								});;
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
						}
						else if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || splittedOne.length!=8)
						{
							$('#alertBox').text('Please enter a valid date');
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								});;
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
						}
						else if(currentDate.getTime()>actualRosDate.getTime()){
							
								$('#alertBox').text('Please enter today date or future date');
								$( "#dialog-modal" ).dialog( "open" );
								$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
								});;
								
							}
						else {
							var date1=new Date();
							date1.setTime(actualRosDate.getTime() + (86400000));
							month3=(date1.getMonth()+1)<10?"0"+(date1.getMonth()+1):(date1.getMonth()+1);
							var newDate=date1.getDate()<10?"0"+date1.getDate():date1.getDate();
							var newDelDate=newDate+"/"+month3+"/"+date1.getFullYear();
							$(("#deliverDateValue-").concat(id)).val(newDelDate);
							
							}
						
						});*/
		$(".saveRowBtn").click(function(){
			$('#validMsg').text('');
			var id = (this.id).split('-')[1];
			var currentDate=new Date();
			var index=id;
			var delDate=formateDate($(("#deliverDateValue-").concat(id)).val());
			var rosDate=formateDate($(("#rosterDateValue-").concat(id)).val());
			var splittedRosDate=rosDate.split('/');
			var splittedDelDate=delDate.split('/');
			var actualRosDate=new Date();
			var actualDelDate=new Date();
			var month1=splittedRosDate[1]-1;
			var month2=splittedDelDate[1]-1;
			actualRosDate.setFullYear(splittedRosDate[2],month1,splittedRosDate[0]);
			actualDelDate.setFullYear(splittedDelDate[2],month2,splittedDelDate[0]);
			var splittedOne=splittedRosDate[0]+splittedRosDate[1]+splittedRosDate[2];
			var splittedTwo=splittedDelDate[0]+splittedDelDate[1]+splittedDelDate[2];	
			var qty=$(("#qtyValue-").concat(id)).val();
			var totalOrdered=$(("#totalOrder-").concat(id)).text();
			if(qty=='')
				{
				$('#alertBox').text('Please provide quantity to be ordered.');
				$(("#qtyValue-").concat(id)).focus();
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});
				}
			else if((qty<0)||isNaN(qty)||qty==0){
				//$('#alertBox').text('please enter a valid quantity');
				//$(("#qtyValue-").concat(id)).val('');
				//$(("#qtyValue-").concat(id)).focus();
				//$( "#dialog-modal" ).dialog( "open" );
				/* $('#okBtn').click(function(e){
					
					$( "#dialog-modal" ).dialog( "close" );
					}); */
				fromSave=true;
				$(("#DeleteRecord-").concat(id)).click();
				}
			else if(splittedOne=="")
			{
				$('#alertBox').text('Please fill roster date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#rosterDateValue-").concat(id)).focus();
					});;
				
					
			}
			else if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || splittedOne.length!=8)
			{
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$(("#rosterDateValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "close" );
					});;
				
					
			}
			else if(currentDate.getTime()>actualRosDate.getTime()){
				
					$('#alertBox').text('Roster date must be later than today.');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
			
					$(("#rosterDateValue-").concat(id)).focus();
					});;
					
				}
			else if(splittedTwo=="")
			{
				$('#alertBox').text('Please fill roster date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$(("#deliverDateValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "close" );
					});;
				
					
			}
			else if((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999) || splittedTwo.length!=8)
			{
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
			}
			else if(currentDate.getTime()>actualDelDate.getTime()){
				
				$('#alertBox').text('Delivery date shoud not be less than current date.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				$(("#deliverDateValue-").concat(id)).focus();
				});;
				
			}
			else if(actualRosDate.getTime()>actualDelDate.getTime()){
				
					$('#alertBox').text('Delivery date shoud not be less than roster date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
				}
			
			else{
				// $( "#dialog-cancelOrder" ).dialog( "open" );
				 $('#cancelId').text('Are you sure you want to confirm?');				
				
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$.ajax({
							type : "GET",
							url : "saveDetail.htm",
							
							data : "index=" + index + "&orderDate=" + rosDate + "&deliveryDate=" + delDate + "&inputQty=" + qty  + "&totalOrdered=" + totalOrdered,
							success : function(response) {
								$('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading');	
							},
						});
									
						$(("#row-").concat(id)).removeClass('rowHighlight');
						$(("#qtyEdit-").concat(id)).addClass('hideBlock');
						$(("#qty-").concat(id)).removeClass('hideBlock');
						$(("#qty-").concat(id)).text($(("#qtyValue-").concat(id)).val());
						
						$(("#rosterDateEdit-").concat(id)).addClass('hideBlock');
						$(("#rosterDate-").concat(id)).removeClass('hideBlock');
						$(("#rosterDate-").concat(id)).text($(("#rosterDateValue-").concat(id)).val());
						
						$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
						$(("#deliverDate-").concat(id)).removeClass('hideBlock');
						$(("#deliverDate-").concat(id)).text($(("#deliverDateValue-").concat(id)).val());
						$('#articleNo').focus();
						$(("#saveRecord-").concat(id)).addClass('hideBlock');
						$(("#editRecord-").concat(id)).removeClass('hideBlock');
						 $( "#dialog-cancelOrder" ).dialog( "close" );
					
				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });
			}
		});
		$("#confirmAndFinalise").click(function(){
			$('#validMsg').text('');
			var flag=false;
			var flag1=false;
		var supplier=$('#supplier').val();
		var wareHouse=$('#warehouseDropdown').val();
		var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
		var srcSupply=$('input:radio[name=sourceSupply]:checked').val();
		$('.dateCheck').filter(function()
				{
			if($(this).css('display')=='table-cell')
			{
				var id = (this.id).split('-')[1];
				$('#alertBox').text('Please save the articles before you finalise the order.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					//$(this).focus();
					$(("#qtyValue-").concat(id)).focus();
					});;
					flag1=true;/* 
					var temp=$(this).attr('id');
					$('#'+temp+'').focus(); */
					
					}
			
			}
		);
		$('.nullCheck').filter(function()
				{
			if($(this).text()==0)
			{
				$('#alertBox').text('Please provide quantity to be ordered.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					//$(("#qtyValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "close" );
					$(this).focus();
					});;
					flag=true;/* 
					var temp=$(this).attr('id');
					$('#'+temp+'').focus(); */
					
					}	
			}
		);
		
		/* if(srcSupply=='' || srcSupply=='Enter supplier no. or name' )
			{
			
			$('#alertBox').text('Please enter enter source of suppy to finalize');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
			
		else  */if($('.row-1').text()=='')
			{
			//alert("list is empty");
			$('#alertBox').text('There is no article to be received. Cannot finalize the order');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
		else if(flag1)
		{
		$('#alertBox').text('Please save the articles before you finalise the order.');
		$( "#dialog-modal" ).dialog( "open" );
		$('#okBtn').click(function(e){
			$( "#dialog-modal" ).dialog( "close" );
			});;
		}
		else if(flag)
			{
			$('#alertBox').text('Please provide quantity to be ordered.');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$(("#qtyValue-").concat(id)).focus();
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
		
		else{
			$.ajax({
				type : "GET",
				url : "finalizePOWithReceipt.htm",
				
				beforeSend: function(){
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					},
				data : "srcSupply=" + srcSupply,
				success : function(response) {

					var data=response.split(':');
					var status=data[0];
					var message=data[1];
					if(status=='true'){

						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');
					$("#message1").text('Your purchase requisition reference number #'+message);
					$("#message2").text('The next step is to create a purchase order');
					$( "#dialog-PoReceipt" ).dialog( "open" );
							$('#createBtn').click(function(e){
								$( "#dialog-PoReceipt" ).dialog( "close" );
								 sendOrder(message);
								});;
								$('.closePopUp').click(function(e){
									//$( "#dialog-modal" ).dialog( "close" );
									$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
									$("#manualOrderSearchSubmit").attr('method','GET');
									$("#manualOrderSearchSubmit").submit();
									});;
					}
					else{
						$('#alertBox').text(message);
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});;

						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');	}		
				},
			});
			
			}

			});




			
			

			$( ".deleteBtn" ).click(function(){
				$('#validMsg').text('');
				var index=(this.id).split('-')[1];
				$("#index").val(index);
				 $( "#dialog-cancelOrder" ).dialog( "open" );
				 if( fromSave==false)
					 {
						 $('#cancelId').text('Are you sure you want to delete the article?');
						 $("#confirmYES").text('Yes');
						 $("#confirmNO").text('No');
					 }	
				 else
					 {
						 $('#cancelId').text('Setting Quantity to zero will remove this item');	
						 $("#confirmYES").text('Ok');
						 $("#confirmNO").text('Cancel');
					 }
					 fromSave=false;			
				 $("#confirmYES").click(function(e) {
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$("#manualOrderSearchSubmit").attr('action','deleteItem.htm');
						$("#manualOrderSearchSubmit").attr('method','GET');
						$("#manualOrderSearchSubmit").submit();
					  }); 
				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });
				/* $('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				 */
				
			});

			$( ".qtyValue" ).change(function(){
				var id=(this.id).split('-')[1];
				
				//parseFloat(25.777777777).toFixed(2)
				if(($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text())%1==0){
				$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
				}
				else{
					var quantity=$(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text();
					$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
					}
			});
			
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			$("#treetable").treetable({
			expandable: true
		});
			 $(".secondaryActionBtn").click(function(e) {
				// window.history.back();
			  });

			 $( "#dialog-back" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 350
				});
			 $("#dialog-back").parent().addClass("popupWrapper");

			 
			 $("#back").click(function(e) {
				 $('#validMsg').text('');
				 if($('.ContentTable .indenter').parent().text()=="No articles added in the order.")
					 window.location.href= "../login/goingHome.htm";		// window.history.back();'
					 else
						$("#dialog-back").dialog("open");	// window.history.back();'
				  });
			 $("#clear").click(function(e) {
				 $('#validMsg').text('');
				 $('#cancelId').text('Are you sure you want to clear the order?');
					 $( "#dialog-cancelOrder" ).dialog( "open" );				
					 $("#confirmYES").click(function(e) {
						 $('#manualOrderSearchSubmit').attr('action','onPageLoadPORecipt.htm');
							$('#manualOrderSearchSubmit').attr('method','GET');
							$('#manualOrderSearchSubmit').submit();
						  }); 
					 });

					 $("#confirmNO").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });  
					  

			 $("#goButtonSample")
				.click(
						function() {
							$('#validMsg').text('');
							var vendorNo=$('#vendorDesc').val().split("-")[0];
							var vendorName=$('#vendorDesc').val().split("-")[1];
							//var vendorDesc=$('#vendorDesc').val();
							 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
							
							$.ajax({
								type : "GET",
								url : "autocomplete.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
								//data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
								data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
								//data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
								success : function(response) {
									 $('#popupDataDiv').html(response);
									 $('#statusImg').addClass('loading hideBlock');
										$('#statusImg').removeClass('loading');
								},
							});



							}
						
						);	
			 

				$( "#verifySupplier" ).click(function() {
					$('#validMsg').text('');
					if($('.row-1').text()==''){
						
						var vendorNo=$('#supplier').val().split("-")[0];
						var vendorName=$('#supplier').val().split("-")[1];
						 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
						if(($('#supplier').val()!='' && $('#supplier').val()!='Enter supplier no. or name')){
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend: function(){

								$('#statusImg').removeClass('loading hideBlock');
																$('#statusImg').addClass('loading');
								},
								data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
						//	data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
										success : function(response) {
											 $('#popupDataDiv').html(response);
											 if($('#sizeCheck').val()==0){
												 if(sourceSupply=='2'){
												 $('#alertBox').text('Invalid warehouse');
												 }
												 else{
												 $('#alertBox').text('Invalid vendor');
												 }
													$( "#dialog-modal" ).dialog( "open" );
													$('#okBtn').click(function(e){
														$( "#dialog-modal" ).dialog( "close" );
														});
													$('#supplier').focus();												 
												 }
											 else if($('#sizeCheck').val()>1){
												 if(!$( "#dialog-modal1" ).dialog( "isOpen" )){
													$('#vendorDesc').val($('#supplier').val());
													$("#dialog-modal1").parent().addClass("popupWrapper");			
													$("#dialog-modal1" ).dialog( "open" );
													$("#searchWarning").addClass('hideBlock');
													$("#popupSearch").removeClass('hideBlock');
													}
											 }
											 else{
													$("#supplier").val($("#suppNo0").text()+"-"+$("#suppName0").text());
												 }
											 $('#statusImg').addClass('loading hideBlock');
												$('#statusImg').removeClass('loading'); 
										},
									});}
									else{
										$('#alertBox').text('Please fill supplier field');
										$( "#dialog-modal" ).dialog( "open" );
										$('#okBtn').click(function(e){
											$( "#dialog-modal" ).dialog( "close" );
											});
										$('#supplier').focus();
										}

					
					/* if(!$( "#dialog-modal1" ).dialog( "isOpen" )){
						$('#vendorDesc').val($('#supplier').val());
					$("#dialog-modal1").parent().addClass("popupWrapper");			
					$("#dialog-modal1" ).dialog( "open" );
					$("#searchWarning").addClass('hideBlock');
					$("#popupSearch").removeClass('hideBlock'); 
					}*/
					}
				});
				$("#goButtonSample2")
				.click(
						
						function() {
							$('#validMsg').text('');
							
							var vendorDesc=$('#vendorDesc2').val();
							var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
							var suppName=$('#supplier').val().split('-')[0];
							var warehouse=$('#warehouseDropdown').val();
							if(vendorDesc!=''){
							$.ajax({
								type : "GET",
								url : "getDescription.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
								data : "vendorDesc=" + vendorDesc + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName + "&warehouse=" +warehouse,
								success : function(response) {
									$('#nodataMsg').text('');
									 $('.dialog-modal2').html(response);
									 if($('#nodata').val()=='N'){
									 if($('#sizeCheck1').val()>1){
										 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
											 $('#nodataMsg').text('');
											 //$("#nodataMsg").removeClass('tableTitle nodataMessage');
											$('#vendorDesc2').val(articleNo);
											$("#dialog-modal2").parent().addClass("popupWrapper");			
											$("#dialog-modal2" ).dialog( "open" );
											$("#searchWarning").addClass('hideBlock');
											$("#popupSearch").removeClass('hideBlock');
											}
									 }
									 else{
										 $("#articleNo").val($("#artNo0").text());
										 $('#desIndex').val('0');
										 	$('#statusImg').removeClass('loading hideBlock');
											$('#statusImg').addClass('loading');
											$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
											$('#manualOrderSearchSubmit').attr('method','GET');
											$('#manualOrderSearchSubmit').submit();
										 }
									 }
									 else{
										
											 //$("#nodataMsg").addClass('tableTitle nodataMessage');
												$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
												$('.dialog-modal2').html('');
												//$("#dialog-modal2").parent().addClass("popupWrapper");			
												//$("#dialog-modal2" ).dialog( "open" );
												//$("#searchWarning").addClass('hideBlock');
												//$("#popupSearch").removeClass('hideBlock');
												
										 }
									 $('#statusImg').addClass('loading hideBlock');
										$('#statusImg').removeClass('loading');
								},
							});
							}
							else{
								 
								//$("#nodataMsg").addClass('tableTitle nodataMessage'); 
								$('#nodataMsg').text('Please enter article description.');
								$('.dialog-modal2').html('');
								}



							}
						
						);
		$('#searchAndAdd').click(function() {
			$('#warehouseValue').val($('#warehouseDropdown').val());
					//$('.noData').html('');
					//$('.error').html('');
					$('#validMsg').text('');
					var articleNo = $('#articleNo').val();
					var vendorDesc=$('#supplier').val();
					var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
					var suppName=$('#supplier').val().split('-')[0];
				    /*var article = $('#article').val();
					var article_Ean=$('#article-Ean').val(); */
					var warehouse=$('#warehouseDropdown').val();
					var artType=$('input:radio[name=articleType]:checked').val();
					var ordQty=$('#ordqty').val();
					if (articleNo == "" || $.trim(articleNo).length == 0 || $('#articleNo').val()=='Search by') {
						/* $('#alertBox').text('Please enter the article to add');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
						$('#validMsg').text('Please enter all mandatory details to search and add an article.');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						$('#articleNo').focus();
					}
					else if(artType=="ArticleNumber" && isNaN(articleNo)){
						/* $('#alertBox').html('Please enter a valid article number');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							$('#validMsg').text('Please enter a valid article number');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						$('#articleNo').focus();
						}
					//else if (vendorDesc == "" || $.trim(vendorDesc).length == 0 || vendorDesc=='Enter supplier no. or name') {
						/* $('#alertBox').text('Please enter the article to add');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
						//	$('#validMsg').text('Please provide supplier information.');
						/* 	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#supplier').focus();
					//}
					//else if (ordQty == "" || $.trim(ordQty).length == 0) {
						/* $('#alertBox').html('Please enter the quantity');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							//$('#validMsg').text('Please provide quantity to be ordered.');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#ordqty').focus();
					//}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
						/* $('#alertBox').html('Please enter a valid quantity');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							//$('#validMsg').text('Please enter a valid quantity');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#ordqty').focus();
						//} 
					
					else if(artType=="description" && articleNo!=''){
						
						$.ajax({
							type : "GET",
							url : "getDescription.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
								data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName + "&warehouse=" +warehouse,
							//data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName,
							success : function(response) {
								$('#nodataMsg').text('');
								 $('.dialog-modal2').html(response);
								 if($('#nodata').val()=='N'){
								 if($('#sizeCheck1').val()>1){
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 //$("#nodataMsg").removeClass('tableTitle nodataMessage');
											$('#nodataMsg').html('');
										$('#vendorDesc2').val(articleNo);
										$("#dialog-modal2").parent().addClass("popupWrapper");			
										$("#dialog-modal2" ).dialog( "open" );
										$("#searchWarning").addClass('hideBlock');
										$("#popupSearch").removeClass('hideBlock');
										}
								 }
								 else{
									 $("#articleNo").val($("#artNo0").text());
									 $('#desIndex').val('0');
									 	$('#statusImg').removeClass('loading hideBlock');
										$('#statusImg').addClass('loading');
										$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
										$('#manualOrderSearchSubmit').attr('method','GET');
										$('#manualOrderSearchSubmit').submit();
									 }
								 }else{
									 
									 
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 $('#validMsg').text('Sorry no results returned for your search criteria. Please try again');
											 //$("#nodataMsg").addClass('tableTitle nodataMessage');
											//$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
											//$('.dialog-modal2').html('');
											//$("#dialog-modal2").parent().addClass("popupWrapper");			
											$("#dialog-modal2" ).dialog( "close" );
											//$("#searchWarning").addClass('hideBlock');
											//$("#popupSearch").removeClass('hideBlock');
											}
									 }
								 $('#statusImg').removeClass('loading');
								 $('#statusImg').addClass('loading hideBlock');
								 bindMultipleSelect();		
							},
						});
						}
					else {

						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$('#manualOrderSearchSubmit').attr('action','createManualOrder.htm');
						$('#manualOrderSearchSubmit').attr('method','POST');
						$('#manualOrderSearchSubmit').submit();
				}
				}); 
			
			
		});
		
				$(".inputDate").datepicker({
					zIndex:50
				});
				function isNumber(id)
				{
					if(!$.isNumeric($(id).val()))	
					var str = $(id).val();
					$(id).val(str.substring(0, str.length - 1));	
				}
				function isDecimalNumber(evt)
				{
				var charCode = (evt.which) ? evt.which : event.keyCode
				var str=evt.value;
				if ((str.indexOf('.')>=0) && (event.keyCode==46)) return false;
				 
				          if (charCode != 46 && charCode >31
				            && (charCode< 48 || charCode >57))
				             return false;
				 
				          return true;
				 
				}
				function isDecimalAmt(evt,id)
			    {
			    		if($("#"+id).val().split('.').length==1)
			    			 $("#"+id).attr('maxlength','11');
			       var charCode = (evt.which) ? evt.which : event.keyCode;
			         if ((charCode > 31 && (charCode< 48 || charCode >57))){
			    	   if(charCode==46){
			    		   $("#"+id).attr('maxlength','14');
				    		if($("#"+id).val().split('.').length==2)
					    		return false;
			    		   return true;
			    	   }
			    	   
			    	   return false;
			       }
			          
					
			       return true;
			    }
				function isNumber1(id)
				{
					id="#"+id;
					if(!$.isNumeric($(id).val()))	
					var str = $(id).val();
					$(id).val(str.substring(0, str.length - 1));	
				}
				function isNumberKey(evt)
			    {
			       var charCode = (evt.which) ? evt.which : event.keyCode;
			       if (charCode > 31 && (charCode< 48 || charCode >57))
			          return false;

			       return true;
			    }


				
				
				
				function showHistoryPopUp(articleNo,articleName,om){
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					$.ajax({
						type : "GET",
						url : "getSalesHistory.htm",
						
						data : "articleNo=" + articleNo,
						success : function(response) {
							$('#salesHistoryPopupData').html('');
							$("#dialog-SalesHistoryPop").parent().addClass("popupWrapper");	

							$('#salesHistoryPopupData').html(response);

							$("#historyArticleInfo").html("Showing sales history for Article"+articleNo+"-"+articleName);
							$("#omVal").html(om);
							$('.salesRow').filter(function(){
								
								if($(this).find('.salesMonday').text().trim()=="" || $(this).find('.salesMonday').text().trim()==null)
									mon=0;
								else
									mon=parseFloat($(this).find('.salesMonday').text().trim());

								if($(this).find('.salesTuesday').text().trim()=="" || $(this).find('.salesTuesday').text().trim()==null)
									tue=0;
								else
									tue=parseFloat($(this).find('.salesTuesday').text().trim());

								if($(this).find('.salesWednesday').text().trim()=="" || $(this).find('.salesWednesday').text().trim()==null)
									wed=0;
								else
									wed=parseFloat($(this).find('.salesWednesday').text().trim());

								if($(this).find('.salesThursday').text().trim()=="" || $(this).find('.salesThursday').text().trim()==null)
									thu=0;
								else
									thu=parseFloat($(this).find('.salesThursday').text().trim());

								if($(this).find('.salesFriday').text().trim()=="" || $(this).find('.salesFriday').text().trim()==null)
									fri=0;
								else
									fri=parseFloat($(this).find('.salesFriday').text().trim());

								if($(this).find('.salesSaturday').text().trim()=="" || $(this).find('.salesSaturday').text().trim()==null)
									sat=0;
								else
									sat=parseFloat($(this).find('.salesSaturday').text().trim());

								if($(this).find('.salesSunday').text().trim()=="" || $(this).find('.salesSunday').text().trim()==null)
									sun=0;
								else
									sun=parseFloat($(this).find('.salesSunday').text().trim());

								$(this).find('.totalHistory').text((mon+tue+wed+thu+fri+sat+sun).toFixed(3));

								});
							var date1 = new Date();
							var parts = (date1.getDate()+"/"+(date1.getMonth()+1)+"/"+date1.getFullYear()).split('/');
							date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
							if(date1.getDay()=='0'){
								date1.setTime(date1.getTime() + (86400000));
							}else if(date1.getDay()=='1'){
								date1.setTime(date1.getTime());
								}
							else if(date1.getDay()=='2'){
								date1.setTime(date1.getTime() - (86400000));
							}
							else if(date1.getDay()=='3'){
								date1.setTime(date1.getTime() - (86400000*2));
							}
							else if(date1.getDay()=='4'){
								date1.setTime(date1.getTime() - (86400000*3));
							}
							else if(date1.getDay()=='5'){
								date1.setTime(date1.getTime() - (86400000*4));
							}
							else if(date1.getDay()=='6'){
								date1.setTime(date1.getTime() - (86400000*5));
							}
							var time=date1.getTime();
							var fristWeek=new Date();
							var secondWeek=new Date();
							fristWeek.setTime(time - (86400000*14));
							secondWeek.setTime(time - (86400000*21));

							var newDate1=fristWeek.getDate();
							var newMonth1=fristWeek.getMonth()+1;
							if(newDate1<10)
								{
								newDate1='0'+newDate1;
								}
							if(newMonth1<10)
							{
								newMonth1='0'+newMonth1;
							}
							var dateOne=(newDate1+"/"+(newMonth1)+"/"+fristWeek.getFullYear());
							$('.firstWeek').text(dateOne);

							var newDate1=secondWeek.getDate();
							var newMonth1=secondWeek.getMonth()+1;
							if(newDate1<10)
								{
								newDate1='0'+newDate1;
								}
							if(newMonth1<10)
							{
								newMonth1='0'+newMonth1;
							}
							var dateTwo=(newDate1+"/"+(newMonth1)+"/"+secondWeek.getFullYear());
							$('.secondWeek').text(dateTwo);
							$("#dialog-SalesHistoryPop" ).dialog("open");
							
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');	
						},
						error: function(response){
							$('#salesHistoryPopupData').html('');
							$("#dialog-SalesHistoryPop").parent().addClass("popupWrapper");	
							
							$('#salesHistoryPopupData').html(response);

							$("#historyArticleInfo").html("Showing sales history for Article"+articleNo+"-"+articleName);
							$("#omVal").html(om);
							$("#dialog-SalesHistoryPop" ).dialog("open");
							
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');	},
					});		
					
				}



				$("#historyClose").click(function() {
					$('#validMsg').text('');			
					$("#dialog-SalesHistoryPop" ).dialog("close");
				});

				function sendOrder(prNo){
					$.ajax({
						type : "GET",
						url : "sendOrder.htm",
						
						beforeSend: function(){
							
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							},
						data : "prNo=" + prNo,
						success : function(response) {

							var data=response.split(':');
							var status=data[0];
							var message=data[1];
							$('#poNoToCancel').val(message);
							var temperature=data[2];
							var department=data[3];
							$('#tempFromService').val(temperature);
							$('#deptFromService').val(department);
							if($("#tempFromService").val()!="" && $("#temperature").val()==""){
								//$("#temperatureDiv").show();
								$(".temperatureExist").show();
								temperatureFlag=true;
								$("#wizard").jWizard();
								
							}else if($("#tempFromService").val()!="" ){
								$(".temperatureExist").show();
								temperatureFlag=true;
								$("#wizard").jWizard();
								}
								else{
									$(".temperatureExist").remove();
									temperatureFlag=false;
									$("#wizard").jWizard();
								//$("#temperature").attr("disabled","disabled");
								}
							if(status=='true'){
						
							
							$("#recvMessage").text('Your purchase order reference number is #'+message);
							
							
							$( "#dialog-PoRecevie" ).dialog( "open" );
									$('#recvBtn').click(function(e){
										$("#dialog-PoRecevie" ).dialog( "close" );
										setTimeout(function(){$('#invoice').focus();},500);
										$("#dialog-PoWithReceive" ).dialog( "open" );
										$('.closePopUp').click(function(e){
											//$( "#dialog-modal" ).dialog( "close" );
											$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
											$("#manualOrderSearchSubmit").attr('method','GET');
											$("#manualOrderSearchSubmit").submit();
											});;
										});;
							$('.closePopUp').click(function(e){
							//$( "#dialog-modal" ).dialog( "close" );
							$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
							$("#manualOrderSearchSubmit").attr('method','GET');
							$("#manualOrderSearchSubmit").submit();
							});;
							
							}
							else{
								$('#alertBox').text(message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
								$("#manualOrderSearchSubmit").attr('method','GET');
								$("#manualOrderSearchSubmit").submit();
							     });;
							     $('.closePopUp').click(function(e){
										//$( "#dialog-modal" ).dialog( "close" );
										$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
										$("#manualOrderSearchSubmit").attr('method','GET');
										$("#manualOrderSearchSubmit").submit();
									     });;

								
						}
						},
					});
					
										

			   }
				
				function receiveOrder(){

					
					$( "#dialog-PoWithReceive" ).dialog( "close" );
					var invoice=$('#invoice').val();
					var amount=$('#amount').val();
					var gst=$('#gst').val();
					var delDock=$('#docket').val();
					var temperature=$('#temperature').val();
					
					$.ajax({
						type : "GET",
						url : "receiveOrder.htm",
						
						beforeSend: function(){
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							},
						data : "invoiceNo=" + invoice+"&temperature="+temperature+"&invoiceTotal="+amount+"&gst="+gst+"&delDock="+delDock,
						success : function(response) {
  
							var data=response.split(':');
							var status=data[0];
							var message=data[1];
							if(status=='true'){
							$('#alertBox').text("Your order received  successfully");
							$( "#dialog-modal" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$("#dialog-modal" ).dialog( "close" );
										$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
										$("#manualOrderSearchSubmit").attr('method','GET');
										$("#manualOrderSearchSubmit").submit();

										});;
										
										$('#statusImg').addClass('loading hideBlock');
										$('#statusImg').removeClass('loading');			
							
							}
							else{
								$('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading');
								$('#alertBox').text(message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$("#manualOrderSearchSubmit").attr('action','onPageLoadPORecipt.htm');
								$("#manualOrderSearchSubmit").attr('method','GET');
								$("#manualOrderSearchSubmit").submit();
							     });

								
						}

							
						},
					});
					
										

				}


				$(".deleteBtn").click(function(){
					
					var id = (this.id).split('-')[1];


					 $( "#dialog-cancelOrder" ).dialog( "open" );				


					 
					 $("#confirmYES1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );
						 $( "#index1" ).val(id);
						 
						 $("#manualOrderSearchSubmit").attr('action','deleteItem.htm');
							$("#manualOrderSearchSubmit").attr('method','GET');
							$("#manualOrderSearchSubmit").submit();
						
						
					 });

					 $("#confirmNO1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });  			
					
				});
	</script>
</body>
</html>
