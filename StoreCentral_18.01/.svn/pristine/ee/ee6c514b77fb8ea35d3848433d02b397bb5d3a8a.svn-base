<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<title>Order Details</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/jquery.jWizard.css?version=${properties.version}" rel="stylesheet">
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>
<script src="../../scripts/ibtSendLaterTempCheck.js?version=${properties.version}"></script>
<script src="../../scripts/delivery-date.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/descriptionPopup.js?version=${properties.version}"></script>

</head>
<body>
	<form method="POST" action="deletePReqArticle.htm" id="pReqForm"
		style="height: 100%;">
		<input type="hidden" value="" id="articleIndex" name="articleIndex" />
		<input type="hidden" value="" id="desIndex" name="desIndex" /> <input
			type="hidden" value="${invalidQty}" id="invalidQty" name="invalidQty" />
		<input type="hidden" name="index1" id="index1" value="" />
		<div class="mainWrapper woolworths">

			<div class="headWrapper">
				<%@include file="header.jsp"%>
				<input type="hidden" id="navBarHighlight" value="orders" /> <input
					type="hidden" id="recSite" value="${order.recvSite}" /> <input
					type="hidden" id="suppNo" value="${order.suppNo}" /> <input
					type="hidden" id="sendSite" value="${user.siteNo}" /> <input
					type="hidden" id="sendingStr" value="${order.suppNo}" />




				<div class="breadcrumbWrapper">
					<div class="breadcrumbs">
						<label class="breadcrumbLabel"> You are here: </label>
						<ul>
							<li><a href="../login/goingHome.htm">Home</a></li>
							<li class="orderDet"><a
								href="../order/backToOrderSearch.htm">Lookup Orders</a></li>
							<li class="orderDet"><a
								href="../order/backToOrderSearch.htm">Order Results</a></li>
							<li style="display: none;" class="reconFlag"><a
								href="../order/backToRecon.htm">Reconciliation Report</a></li>

							<li class="currentPage">Order Details</li>
						</ul>
					</div>
					<!-- End of breadcrumbs -->

					<div class="statusWrapper">
						<label class="loading hideBlock" id="statusImg">We are
							getting data, please wait</label> <label class="secondaryActionBtn"
							id="backBtnId">Back</label>
					</div>
					<!-- End of status wrapper -->

				</div>
				<!-- End of breadcrumb wrapper -->







			</div>
			<!-- End of head wrapper -->




			<div class="contentWrapper">

				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">
							Order #${order.orderNo} <span>
								<!-- (Order Ref. #${order.orderRefNo}) -->
							</span>
						</h2>
						<input type="hidden" value="${orderdet.suppNo}"
							id="supplier-no-ibt" name="supplier-no-ibt" />
						<p>
							<label class="articlePriceLabel"> <c:if
									test="${not empty orderdet.suppName}"> ${orderdet.suppName}</c:if>
								<c:if test="${not empty orderdet.suppNo}">(</c:if>${orderdet.suppNo}<c:if
									test="${not empty orderdet.suppNo}">)</c:if>
							</label> <label class="articlePriceLabel"><c:if
									test="${not empty orderdet.suppNo}">|</c:if></label> <label
								class="articlePriceLabel">Delivery Date: <strong
								id="deliDate">${order.deliveryDate}</strong> <c:if
									test="${order.orderStatus!='Cancelled'}">
									<label class="editRecord" id="editdDate">&nbsp;</label>
								</c:if></label>

						</p>
					</div>
					<div class="articleActionBtns">
						<label class="orderStatus">Status: <strong
							id="change-status">${order.orderStatus}</strong></label>
						<c:if
							test="${order.orderStatus!='Fully Received' && order.orderStatus!='Closed' && order.orderStatus!='Fully Invoiced'}">
							<label class="actionBtn hideContent" id="receiveOrder"><label
								class="notepad">Receive Order</label></label>
						</c:if>
						<c:if
							test="${order.orderStatus=='Fully Received' || order.orderStatus=='Closed' || order.orderStatus=='Fully Invoiced'}">
							<label class="actionBtn hideContent"><label
								class="notepad">Receive Order</label></label>
						</c:if>
						<label class="actionBtn hideContent" id="sendIBTLabel"
							style="display: none;"><label class="notepad"
							id="sendIBT">Send IBT</label></label>
						<c:if test="${order.orderStatus!='Cancelled'}">
							<label class="actionBtn hideContent" id="cancelOrder"
								style="display: none;"><label class="notepadCross"
								id="cancelLink">Cancel Order</label></label>
						</c:if>
					</div>
				</div>


				<div class="articleContent orderDetails">


					<div class="articleContentInner">

						<div class="articleDetails">

							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo">Total Cartons:</td>
									<td class="valueInfo">${order.totalCartons}</td>
									<td class="keyInfo">Total Pallets:</td>
									<td class="valueInfo">${order.totalPallets}</td>
									<td class="keyInfo">Delivery status:</td>
									<td class="valueInfo lastColumn">${order.deliveryStatus}</td>
								</tr>

								<tr>
									<td class="keyInfo">Department:</td>
									<td class="valueInfo">${order.tradDeptNo}<c:if
											test="${not empty order.tradDeptNo and not empty order.tradingDepName}"> | ${order.tradingDepName}</c:if></td>
									<td class="keyInfo">Roster Date:</td>
									<td class="valueInfo">${order.rosterDate}</td>
									<td class="keyInfo">Creation Date:</td>
									<td class="valueInfo lastColumn">${orderdet.dateCreated}</td>
								</tr>
								<c:if test="${order.orderType=='ZUB'}">
									<tr class="lastRow hideRow">

										<td class="keyInfo"><c:if
												test="${order.orderType=='ZUB'}">Receiving Store:</c:if></td>
										<td class="valueInfo"><c:if
												test="${order.orderType=='ZUB'}">${order.recvSite} | ${order.recvSiteName}</c:if></td>
										<td class="keyInfo hideStore"><c:if
												test="${order.orderType=='ZUB'}"> Sending Store:</c:if></td>
										<td class="valueInfo hideStore"><c:if
												test="${order.orderType=='ZUB'}"> ${order.suppNo} | ${orderdet.suppName}</c:if></td>
										<td class="keyInfo"><c:if
												test="${order.orderType=='ZUB'}">Value ($):</c:if></td>
										<td class="valueInfo lastColumn"><c:if
												test="${order.orderType=='ZUB'}">
												<%-- ${order.orderValue} --%>
											</c:if></td>
									</tr>
								</c:if>
								<c:if
									test="${order.orderType=='ZUB' && order.orderStatus=='Received'}">
									<tr class="lastRow hideRow">
										<td class="keyInfo">Temperature:</td>
										<td class="valueInfo"><c:if
												test="${(not empty order.grTemp1 && order.grTemp1!='null')}">
									${order.grTemp1}
									</c:if></td>

									</tr>
								</c:if>
							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->









				</div>
				<!-- End of article content -->

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">List of Articles</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->
					<c:if
						test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">
						<div class="tableActionsBtnsWrapper hideContent hideForOpenIBT"
							id="addDiv1">
							<div class="lookupActionWrapper">
								<label class="linkBtn" id="addActionBtn"><label
									id="addRowClass" class="addRow">Add</label></label>




								<div class="errorDiv hideBlock" id="divMsg">
									<label id="msgLabel"></label> <label
										class="closeMessage msgClose">&nbsp;</label>
								</div>
								<c:if test="${not empty msg}">
									<div class="errorDiv" id="statusMsg">
										<label>${msg}</label> <label class="closeMessage msgClose">&nbsp;</label>
									</div>
								</c:if>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->
						<div
							class="tableActionsWrapper hideBlock hideContent hideForOpenIBT"
							id="tableAddAction">

							<div class="formWrapper">

								<div class="parameter">
									<label for="article" class="mandatory">Article</label> <input
										type="#" class="textbox" maxlength="20"
										placeholder="Enter article number / EAN" id="artEan"
										value="${receiveParam.artEAN}" name="artEAN">
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

								<div class="parameter">
									<label for="qty" class="mandatory">Order Qty.</label> <input
										type="#" maxlength="20" class="textbox numberBox" id="recQty"
										value="" name="recqty">
								</div>
								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn" id="addArticle">Search & Add</label> <label
										class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->



							</div>
							<!-- End of content table wrapper -->


						</div>
						<!-- End of table Actions Wrapper -->
					</c:if>

					<%
								int i = 1;
							%>

					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th width="15px">&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>Vendor Ref. #</th>
							<th class="numberColumn">Order Qty.</th>
							<c:if
								test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">
								<th width="90px" class="hideForOpenIBT">UOM Type</th>
							</c:if>
							<th class="numberColumn">Dispatch Qty.</th>
							<!-- <th class="lastColumn numberColumn centerValue" >Actions</th> -->
							<c:choose>
								<c:when
									test="${!(order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo))}">
									<th class="lastColumn numberColumn">Received Qty.</th>
								</c:when>
								<c:otherwise>
									<th class="numberColumn" id="showRecQty">Received Qty.</th>
									<th class="lastColumn centerValue hideForOpenIBT" width="70px">Actions</th>
								</c:otherwise>
							</c:choose>

						</tr>
						<%int j=1; %>
						<c:forEach items="${orderDetails}" var="orderDetails">
							<c:if test="${orderDetails.operation!='D'}">
								<tr data-tt-id="<%= i %>">
									<td></td>
									<td class="article-no">${orderDetails.article}</td>
									<td>${orderDetails.articleDesc}</td>
									<td>${orderDetails.vendorRefNo}</td>
									<td id="received-<%=j%>"
										class="numberColumn showContent removeHide <c:if test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">hideBlock</c:if>">${orderDetails.orderQty}
										<c:if
											test="${!(order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo))}">
											<c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if>
										</c:if>
									</td>
									<td id="receivedEdit-<%=j%>"
										class="numberColumn  hideContent dateCheck  <c:if test="${!(order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo))}">hideBlock</c:if> hideForOpenIBT popupHide">
										<input type="#" maxlength="20"
										value="${orderDetails.orderQty}"
										class="editNumCell textbox textboxDefaultText inputQty"
										id="receivedTxt-<%=j%>">
									</td>
									<c:if
										test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">
										<td id="uom-<%=j%>"
											class="numberColumn showContent hideBlock hideForOpenIBT">${orderDetails.UOMFlag}</td>
										<td id="uomEdit-<%=j%>" class="numberColumn  uomValue "><select
											id="uomValue-<%=j%>" class="selectOptions editSelectCell">
												<option id="<%=j%>1" value="<%=j%>1">${orderDetails.ordUOMDesc}</option>
												<option id="<%=j%>2" value="<%=j%>2">${orderDetails.baseUOMDesc}</option>
										</select></td>
									</c:if>
									<input type="hidden" value="${orderDetails.baseUom}"
										id="baseUom-<%=j%>" />
									<input type="hidden" value="${orderDetails.saveUOMFlag}"
										id="saveUOMFlag-<%=j%>" />
									<input type="hidden" value="${orderDetails.editFlag}"
										id="UomEditFlag-<%=j%>" />

									<td class="numberColumn popupHide">${orderDetails.despatchQty}</td>

									<td class="numberColumn" id="orderedQty-<%=j%>">${orderDetails.receivedQty}
										<c:if
											test="${!(order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo))}">
											<c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if>
										</c:if>
									</td>
									<input type="hidden" value="${orderDetails.article}"
										id="articleIndex-<%=j%>" />
									<input type="hidden" class="saveFlagCheck"
										value="${orderDetails.saveFlag}" id="saveFlag-<%=j%>" />
									<c:if
										test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">
										<td
											class="lastColumn centerValue hideContent popupHide showContent hideForOpenIBT">
											<label class="linkBtn editBtn hideBlock"
											id="editRecord-<%=j%>"> <label class="editRecord">Edit</label>
										</label> <label class="linkBtn saveBtn " id="saveRecord-<%=j%>">
												<label class="saveRecord">Save</label>
										</label> <%-- <input type="hidden" value="${orderDetails.baseUOMDesc}" id="baseUom-<%=i%>"/> --%>
											<label class="linkBtn deleteBtn" id="DeleteRecord-<%=j++%>">
												<label class="deleteRecord">Delete</label>
										</label>
										</td>
									</c:if>
									<%-- <td class="numberColumn">${orderDetails.orderQty} <c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if></td>
							<td class="numberColumn">${orderDetails.despatchQty}</td>
							<td class="lastColumn numberColumn">${orderDetails.receivedQty} <c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if></td> --%>
								</tr>
								<tr data-tt-id="<%= i+1 %>" data-tt-parent-id="<%= i %>">
									<c:choose>
										<c:when
											test="${!(order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo))}">
											<td colspan="7">
										</c:when>
										<c:otherwise>
											<td colspan="9" id="colSpan">
										</c:otherwise>
									</c:choose>

									<table cellspacing="0" class="ContentTable" width="100%">

										<tr>
											<td class="keyInfo" width="20%">Unsupplied Quantity:</td>
											<td class="valueInfo">${orderDetails.unsupplied}</td>
											<td class="keyInfo" width="20%">SOH:</td>
											<td
												class="valueInfo <c:if test="${orderDetails.baseUom!='KG'}"> trimDecimalForSoh</c:if>">${orderDetails.SOH}</td>
											<td class="keyInfo" width="20%">SIT:</td>
											<td
												class="valueInfo <c:if test="${orderDetails.baseUom!='KG'}"> trimDecimalForSoh</c:if> lastColumn">${orderDetails.SIT}</td>
										</tr>

										<tr class="lastRow">
											<td class="keyInfo">Allocated Quantity:</td>
											<td class="valueInfo">${orderDetails.allocated}</td>
											<td class="keyInfo">SOO:</td>
											<td
												class="valueInfo <c:if test="${orderDetails.baseUom!='KG'}"> trimDecimalForSoh</c:if> ">${orderDetails.SOO}</td>
											<td class="keyInfo">OM:</td>
											<td class="valueInfo">${orderDetails.OM}</td>
										</tr>
									</table>
									</td>
									<%i++;%>
								</tr>
							</c:if>
						</c:forEach>

					</table>




				</div>
				<!-- End of content table wrapper -->
				<c:if
					test="${order.orderStatus=='Open' && order.orderType=='ZUB' && (user.siteNo==order.suppNo)}">
					<div class="pageActions hideForOpenIBT" id="con-final">
						<label class="actionBtn" id="confirmAndFinalise"> <label
							class="thumbUp">Update IBT</label></label>
						<!-- <label
						class="secondaryActionBtn" id="clear">Clear</label> -->
					</div>
				</c:if>

			</div>
			<!-- End of content wrapper -->


		</div>
		<%@include file="footer.jsp"%>

		<!-- below div is for ibt send later temperature check -->
		<%@include file="descpopup.jsp"%>
		<div id="dialog-modalTemperature" title="Send IBT Order">
			<div class="popupContent wizardContent">



				<div class="popupData ui-widget">

					<h4 class="alertText">Please provide the temperature to
						proceed to send the IBT order.</h4>


					<form method="POST" action=""
						class="jw-widget jw-hasmenu jw-hasprogress">
						<div class="jw-content ui-widget-content ui-helper-clearfix">
							<div class="jw-menu-wrap">
								<ol
									class="jw-menu ui-menu ui-widget ui-widget-content ui-corner-all">
									<li class="ui-menu-item ui-state-highlight ui-state-disabled">
										<a href="javascript:void(0);">Temperature Information</a>
									</li>
								</ol>
							</div>
						</div>


						<div class="formWrapper" title="Temperature Information">
							<h2 class="wizardTitle">Enter Temperature Information</h2>
							<div class="parameter">
								<label for="temperature" class="mandatory">Temperature</label> <input
									type="#" class="textbox" id="temperatureIBT"
									placeholder="Enter temperature" maxlength="5"
									onkeypress="return isNumberKeyTemp(event)" autocomplete="off">
							</div>
							<!-- End of parameter -->

							<div class="warningMessage">
								<h4>Warning message should be added in case input
									temperature is less or greater than the range......</h4>
							</div>

							<div class="parameter formQuestion">

								<p class="question">Question goes here... on selection of
									'Yes' Or 'No' Give message about what will happen</p>
								<input type="radio" name="questionibt" value="yes" id="ansyes"
									checked><label for="ansyes" class="labelText">Yes</label>
								<input type="radio" name="questionibt" value="no" id="ansno"><label
									for="ansno" class="labelText">No</label>
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of content table wrapper -->



						<div
							class="jw-footer ui-widget-header ui-corner-bottom popupActionsWrapper">
							<div class="jw-buttons ui-helper-clearfix">

								<label
									class="ui-state-highlight actionBtn jw-button-finish ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
									id="proceedInTemp"> <span class="ui-button-text">Proceed</span>
								</label> <label
									class="secondaryActionBtn jw-button-cancel ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
									id="cancelInTemp"> <span class="ui-button-text">Cancel</span>
								</label>
							</div>
						</div>
				</div>
				<!-- End of pop up data -->


				<!--  
			
		<input type="hidden" value="(-3 to 6)" id="tempFromServiceIBT" />
			<input type="hidden" value="" id="deptFromServiceIBT" /> 
			 -->
				<input type="hidden" value="${tempFromServiceIbtCreate}"
					id="tempFromServiceIBT" /> <input type="hidden"
					value="${deptFromServiceIbtCreate}" id="deptFromServiceIBT" />

			</div>
			<!-- End of popupContent -->
		</div>


		<div id="dialog-temperature" title="Temperature check">
			<div class="popupContent">

				<div class="popupData">

					<div class="ContentTableWrapper popMessage popMessagetemp">

						<label>Are you sure you want to save the changes?</label>

					</div>
					<!-- End of content table wrapper -->

					<div class="popMessageBtnWrapper">
						<label class="actionBtn confirmYesTemp" id="confirmYES" onclick="">Yes</label>
						<label class="secondaryActionBtn confirmNoTemp" id="confirmNO"
							onclick="$('#dialog-temperature').dialog('close');">No</label>
					</div>

				</div>
				<!-- End of pop up data -->

			</div>
			<!-- End of popupContent -->
		</div>
		<div id="dialog-modal1" title="Order Detail">
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
						<span class="popupActions"> <!-- onclick='$("#dialog-modal1" ).dialog( "close" );' -->
							<label class="actionBtn" id="okBtn">OK</label>
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


		<div id="dialog-modal-delivery" title="Change Delivery Date">
			<div class="popupContent">

				<div class="popupData">

					<h4 class="alertText">
						Current delivery date is <strong>dd/mm/yyyy</strong>.
					</h4>


					<form method="POST" action="" id="">
						<div class="ContentTableWrapper formWrapper">
							<input type="hidden" value="${order.orderType}" id="idStatus" />
							<input type="hidden" value="${order.orderStatus}"
								id="sendIBTStatus" /> <input type="hidden"
								value="${cancelStatus}" id="cancelStatus" /> <input
								type="hidden" name="receiveStatus" id="receiveStatus"
								value="${receiveStatus}" /> <input type="hidden"
								name="updateRights" id="updateRights" value="${updateRights}" />

							<input type="hidden" value="${order.orderNo}" id="orderNo-update" />
							<input type="hidden" name="olddelDate-update"
								id="olddelDate-update" value="${orderdet.deliveryDate}" /> <input
								type="hidden" name="openOrder" id="openOrder"
								value="${openOrder}" /> <input type="hidden"
								value="${order.orderNo}" id="orderNo" name="orderNo" /> <input
								type="hidden" value="${model.param.reconFlag}"
								id="brudCrumCheck" name="brudCrumCheck" /> <input type="hidden"
								id="storeNoForCancel" name="storeNoForCancel"
								value="${order.recvSite}" /> <input type="hidden" id="hideAll"
								name="hideAll" value="${hideAll}" />
							<!-- Need to change here once 529 fixed -->
							<input type="hidden" id="hideDetail" name="hideDetail"
								value="${model.param.storeOrderFlag}" />

							<div class="parameter">
								<label for="dDate" class="mandatory">New Delivery Date</label> <input
									type="text" class="textbox inputDate" maxlength="20" id="dDate"
									autocomplete="off">
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of content table wrapper -->
					</form>
				</div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="changeDate">Change</label> <label class="secondaryActionBtn"
						id="delCancel">Cancel</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of popupContent -->
		</div>

		<!-- Cancel order popup message -->
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


		<!-- Cancel order popup message -->

		<div id="dialog-cancelOrder" title="Cancel Order">
			<div class="popupContent">

				<div class="popupData">
					<h4 class="alertText" id="cancelId">Are you sure you want to
						cancel the order?</h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="confirmYES1">Yes</label> <label class="secondaryActionBtn"
							id="confirmNO1">No</label>
						</span>
					</div>
					<!-- End of popup actions-->
				</div>
				<!-- End of pop up data -->

			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End Cancel order popup -->
		<%-- <div id="dialog-modal" title="Provide Invoice Information">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">Please provide following information to
					proceed to finalise the order.</h4>
				<form action="receiveOrder.htm" id="wizard" method="GET">
					<input type="hidden" value="${order.orderType}" id="idStatus" />
					<input type="hidden" value="${order.orderStatus}" id="sendIBTStatus" />
					<input type="hidden" value="${cancelStatus}" id="cancelStatus" />
					<input type="hidden" name="receiveStatus" id="receiveStatus" value="${receiveStatus}"/>
					<input type="hidden" name="updateRights" id="updateRights" value="${updateRights}"/>
					
					<input type="hidden" value="${order.orderNo}" id="orderNo-update" />
					<input type="hidden" name="olddelDate-update" id="olddelDate-update" value="${orderdet.deliveryDate}"/>
					<input type="hidden" name="openOrder" id="openOrder" value="${openOrder}"/>
					<div class="ContentTableWrapper formWrapper">

						<div class="errorDiv hideBlock" id="popupErrorDiv">
							<label> </label>
						</div>
						<!-- End of error div -->
						
						<div class="parameter">
							<label for="invoice" class="mandatory">Invoice #</label> <input
								 class="textbox alphaNumeric"
								maxlength="20" id="invoiceNo" placeholder="Enter invoice number" value="${receiveParam.invoiceNo}"
								name="invoiceNo">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="amount" class="mandatory">Total Amount ($)</label> <input
								 class="textbox"
								placeholder="Enter invoice total" id="invoiceTotal" onkeypress="return isDecimalNumber(this)" maxlength="20" value="${receiveParam.invoiceTotal}"
								name="invoiceTotal">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="gst" class="mandatory">GST ($)</label> <input
								 class="textbox" id="gst"
								placeholder="Enter gst" maxlength="20" onkeypress="return isDecimalNumber(this)" value="${receiveParam.gst}" name="gst">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="docket" class="mandatory">Delivery Docket</label> <input
								 class="textbox alphaNumeric"
								placeholder="Enter delivery docket" maxlength="20" id="delDock" value="${receiveParam.delDock}" name="delDock">
						</div>
						 <!-- End of parameter -->	
						<div class="parameter" id="temperatureDiv">
							<label for="temperature" class="mandatory">Temperature</label>
							<input placeholder="Enter temperature" type="#" class="textbox" value="${receiveParam.temperature}" onkeypress="return isNumberKeyTemp(event)" maxlength="4" id="temperature" name="temperature">
						</div>
					</div>
					<!-- End of content table wrapper -->
	 				
<input type="hidden" value="${orderdet.temperature}" id="tempFromService" />
<input type="hidden" value="${orderdet.tradingDepNo}" id="deptFromService" />

 <!--
 <input type="hidden" value="(-3 to 5)" id="tempFromService" />
<input type="hidden" value="111,006,003" id="deptFromService" />
 -->
<input type="hidden" value="${order.orderNo}" id="orderNo" name="orderNo" />
				</form>
			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupInfo"> <label class="mandatory">mandatory</label>
				</span> <span class="popupActions"> <label class="actionBtn"
					id="proceed">Proceed</label> <label class="secondaryActionBtn"
					id="cancel">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div> --%>
		<div id="dialog-modal" title="Receive an Order">
			<div class="popupContent wizardContent">



				<div class="popupData">

					<h4 class="alertText">Please provide following information to
						proceed to Receive and finalize the order.</h4>


					<form method="GET" action="receiveOrder.htm" id="wizard">

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
										placeholder="" maxlength="15" type="#"
										class="textbox alphaNumeric" id="invoice" name="invoiceNo"
										autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="amount" class="mandatory">Total Amount ($)</label>
									<input placeholder="" maxlength="11" type="#"
										class="textbox maxLen" id="amount"
										onkeypress="return isDecimalAmt(event,'amount')"
										name="invoiceTotal" autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="gst" class="mandatory">GST ($)</label> <input
										placeholder="" maxlength="11" type="#" class="textbox maxLen"
										id="gst" onkeypress="return isDecimalAmt(event,'gst')"
										name="gst" autocomplete="off">
								</div>
								<!-- End of parameter -->
							</div>

							<div class="parameter hideBlock" id="docketEntry">
								<label for="docket" class="mandatory">Delivery Docket</label> <input
									placeholder="" maxlength="25" type="#"
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
										type="#" placeholder="" maxlength="15"
										class="textbox alphaNumeric" id="invoiceConfirm"
										autocomplete="off">
								</div>
								<!-- End of parameter -->



								<div class="parameter">
									<label for="amount" class="mandatory">Total Amount ($)</label>
									<input placeholder="" maxlength="11" type="#"
										class="textbox maxLen" id="amountConfirm"
										onkeypress="return isDecimalAmt(event,'amountConfirm')"
										autocomplete="off">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="gst" class="mandatory">GST ($)</label> <input
										type="#" placeholder="" maxlength="11" class="textbox maxLen"
										id="gstConfirm"
										onkeypress="return isDecimalAmt(event,'gstConfirm')"
										autocomplete="off">
								</div>
								<!-- End of parameter -->
							</div>

							<div class="parameter hideBlock" id="docketEntryConfirm">
								<label for="docket" class="mandatory">Delivery Docket</label> <input
									placeholder="" maxlength="25" type="#"
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
							<input type="hidden" value="${tempFromServiceIbtCreate}"
								id="tempFromService" /> <input type="hidden"
								value="${deptFromServiceIbtCreate}" id="deptFromService" /> <input
								type="hidden" value="${user.salesOrg}" id="userSalesOrg"
								name="userSalesOrg" />

							<div class="errorDiv parameter">
								<h4></h4>
							</div>
							<!--
<input type="hidden" value="(-3 to 6)" id="tempFromService" />
<input type="hidden" value="" id="deptFromService" /> 
-->

						</div>
						<!-- End of content table wrapper -->
					</form>
				</div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper hideBlock">
					<span class="popupInfo"> <label class="mandatory">mandatory</label>
					</span> <span class="popupActions"> <label class="actionBtn">Proceed</label>
						<label class="secondaryActionBtn" id="cancelBtn">Cancel</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of popupContent -->
		</div>




		<script>
		
	function isNumberKey(evt)
    {
       var charCode = (evt.which) ? evt.which : event.keyCode;
       if (charCode > 31 && (charCode< 48 || charCode >57))
          return false;

       return true;
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
					
		
		
		
		$(function() {
			document.forms[0].autocomplete="off";
			fromSave=false;
			$('.trimDecimalForSoh').filter(function(){
				var value=$(this).text().trim();
				//alert(value.split(".")[0]);
				$(this).text(value.split(".")[0]);
				});
			//<!-- Need to change here once 529 fixed -->
if($('#hideDetail').val()=='B'){
	$('#hideRow').hide();
}
$('.saveFlagCheck').filter(function()
		{
	if($(this).val()=='Y')
	{
		var id = (this.id).split('-')[1];
		var saveUom=$(("#saveUOMFlag-").concat(id)).val();
		$(("#receivedEdit-").concat(id)).addClass('hideBlock');
		$(("#received-").concat(id)).removeClass('hideBlock');
	
			$(("#packOMEdit-").concat(id)).addClass('hideBlock');
		$(("#packOM-").concat(id)).removeClass('hideBlock');
			
		$(("#uom-").concat(id)).text($('#'+id+saveUom).text());
		 $(("#uomValue-").concat(id)).val(id+saveUom);
		 
		 $(("#uomEdit-").concat(id)).addClass('hideBlock');
		$(("#uom-").concat(id)).removeClass('hideBlock'); 
		
		
		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).removeClass('hideBlock');					
			
	}
	
	}
);

 $('.inputQty').filter(function()
{
var id = (this.id).split('-')[1];


if($(("#baseUom-").concat(id)).val()=='EA')
{
//onkeyup="isNumber1('#ordqty')"
$(("#receivedTxt-").concat(id)).attr('onkeypress','return isNumberKey(event)');
}	
else
{
//var id1=$(("#qtyValue-").concat(id));
//var id1='#qtyValue-'+id;
$(("#receivedTxt-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
}
}
); 
$(".saveBtn").click(function(){
	$('#divMsg').hide();
	 $('#statusMsg').hide();
	$(this).parent().parent().removeClass('saveFlag');
	var flag=true;
	var id = (this.id).split('-')[1];
	var receiveQty=$(("#receivedTxt-").concat(id)).val();
	var orderedQty=$(("#orderedQty-").concat(id)).text();
	var uom=$(("#uomValue-").concat(id)).val();
	if(receiveQty=='')
	{
	$('#alertBox').text('Please provide quantity to be ordered.');
	$(("#qtyValue-").concat(id)).focus();
	$( "#dialog-modal1" ).dialog( "open" );
	$('#okBtn').click(function(e){
		$( "#dialog-modal1" ).dialog( "close" );
		});
	}
	else if((receiveQty<0)||isNaN(receiveQty)||receiveQty==0){
	/* $('#alertBox').text('please enter a valid quantity');
	$(("#qtyValue-").concat(id)).val('');
	$(("#qtyValue-").concat(id)).focus();
	$( "#dialog-modal" ).dialog( "open" );
	$('#okBtn').click(function(e){
		$( "#dialog-modal" ).dialog( "close" );
		}); */
	fromSave=true;
	$(("#DeleteRecord-").concat(id)).click();
	}
	/* if(Number(receiveQty)<Number(orderedQty)){
		$('#confirmMsg').text('Are you sure you want to confirm?');
	}
	else if(Number(receiveQty)>Number(orderedQty))
		{
		$('#confirmMsg').text('Are you sure you want to confirm?');
		}
	if(Number(receiveQty)<0 && isNAN(receiveQty) ){
		flag=false;
		$('#alertBox').text('please enter valid qunatity');
		$( "#dialog-modal" ).dialog( "open" );
		$('#okBtn').click(function(e){
			$( "#dialog-modal" ).dialog( "close" );
			});
		} */
	/* if(flag){
		$( "#dialog-cancelOrder" ).dialog( "open" );
						
		 
		 $("#confirmYES").click(function(e) { */
		 else{
			 $(("#row-").concat(id)).removeClass('rowHighlight');
				$(("#receivedEdit-").concat(id)).addClass('hideBlock');
				$(("#received-").concat(id)).removeClass('hideBlock');
				
				$(("#packOMEdit-").concat(id)).addClass('hideBlock');
				$(("#packOM-").concat(id)).removeClass('hideBlock');

				$(("#uomEdit-").concat(id)).addClass('hideBlock');
				$(("#uom-").concat(id)).removeClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');

				$(("#uomEdit-").concat(id)).addClass('hideBlock');
				$(("#uom-").concat(id)).removeClass('hideBlock');
				var idVal=$(("#uomValue-").concat(id)).val();
				$(("#uom-").concat(id)).text($("#"+idVal).text());

				var recQty=$(("#receivedTxt-").concat(id)).val();

				if(recQty!=null &&  $.trim(recQty).length != 0)
				$(("#received-").concat(id)).text(recQty);
				var packOm=$(("#packOMTxt-").concat(id)).val();

				if(packOm!=null &&  $.trim(packOm).length != 0)
				$(("#packOM-").concat(id)).text(packOm);
				var index=id;
				var articleIndex=$(("#articleIndex-").concat(id)).val().trim();
				//var receiveQty=$(("#receivedEdit-").concat(id)).val();
				
				//$( "#dialog-cancelOrder" ).dialog( "close" );
				$.ajax({
					type : "GET",
					url : "savePoReceiveQty.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "index=" + index + "&recQty=" + recQty + "&packOm=" + packOm + "&uom=" + uom + "&articleIndex=" + articleIndex,
					success : function(response) {
						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');		
					},
				});
		 }
				
			
		// });
/* 
		 $("#confirmNO").click(function(e) {
			 $( "#dialog-cancelOrder" ).dialog( "close" );				
		 });  */

//	}
	
	
});
$("#addActionBtn").click(function(){ 
	$("#tableAddAction").removeClass('hideBlock');
});
$(".msgClose").click(function(e) {

	  $('#divMsg').hide();
		$('#divMsg').addClass('errorDiv hideBlock');

		  $('#statusMsg').hide();
			$('#statusMsg').addClass('errorDiv hideBlock');
});
$("#closeLink").click(function(){ 
	$('#divMsg').hide();
	$("#tableAddAction").addClass('hideBlock');
});
$(".deleteBtn").click(function(){
	
	var id = (this.id).split('-')[1];


	 $( "#dialog-cancelOrder" ).dialog( "open" );				
	 if( fromSave==false)
	 {
		 $('#cancelId').text('Are you sure you want to delete the article?');
		 $("#confirmYES1").text('Yes');
		 $("#confirmNO1").text('No');
	 }	
 else
	 {
		 $('#cancelId').text('Setting Quantity to zero will remove this item');	
		 $("#confirmYES1").text('Ok');
		 $("#confirmNO1").text('Cancel');
	 }
	 fromSave=false;

	 
	 $("#confirmYES1").click(function(e) {
		 $( "#dialog-cancelOrder" ).dialog( "close" );
		 $("#index1" ).val(id);
		 $("#articleIndex" ).val($(("#articleIndex-").concat(id)).val().trim());
		 $("#pReqForm").attr('action','deletePoArticle.htm');
		 $("#pReqForm").attr('method','GET');
		 $("#pReqForm").submit();
		
		
	 });

	 $("#confirmNO1").click(function(e) {
		 $( "#dialog-cancelOrder" ).dialog( "close" );				
	 });  			
	
});
$("#confirmAndFinalise").click(function(){
	
	var flag=false;
	var flag1=false;
var supplier=$('#supplier').val();
var wareHouse=$('#warehouseDropdown').val();
var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
var srcSupply=$('input:radio[name=sourceSupply]:checked').val();
$('.nullCheck').filter(function()
		{
	if($(this).text()==0)
	{
		$('#alertBox').text('Please provide quantity to be ordered.');
		$( "#dialog-modal1" ).dialog( "open" );
		$('#okBtn').click(function(e){
			$( "#dialog-modal1" ).dialog( "close" );
			});;
			flag=true;/* 
			var temp=$(this).attr('id');
			$('#'+temp+'').focus(); */
			
			}	
	}
);
$('.dateCheck').filter(function()
		{
	if($(this).css('display')=='table-cell')
	{
		var id = (this.id).split('-')[1];
		$('#alertBox').text('Please save the articles before you update the purchase requisition.');
		$( "#dialog-modal1" ).dialog( "open" );
		$('#okBtn').click(function(e){
			$( "#dialog-modal1" ).dialog( "close" );
			$(("#rosterDateValue-").concat(id)).focus();
			});;
			flag1=true;/* 
			var temp=$(this).attr('id');
			$('#'+temp+'').focus(); */
			
			}
	
	}
);
/*  if($('.row-1').text()=='')
	{
	//alert("list is empty");
	$('#alertBox').text('There is no article to be received. Cannot finalize the order');
	$( "#dialog-modal1" ).dialog( "open" );
	$('#okBtn').click(function(e){
		$( "#dialog-modal1" ).dialog( "close" );
		});;
	}
else */ if(flag)
	{
	$('#alertBox').text('Please provide quantity to be ordered.');
	$( "#dialog-modal1" ).dialog( "open" );
	$('#okBtn').click(function(e){
		$( "#dialog-modal1" ).dialog( "close" );
		});;
	}
else if(flag1)
{
$('#alertBox').text('Please save the articles before you update the purchase requisition.');
$( "#dialog-modal1" ).dialog( "open" );
$('#okBtn').click(function(e){
	$( "#dialog-modal1" ).dialog( "close" );
	});;
}
else{
	var prNo=$("#prNo").val();
	var dept=$("#deptNo").val();

	$("#updateStatus").val('true');
	
	$.ajax({
		type : "GET",
		url : "updatePurchaseOrder.htm",
		
		beforeSend: function(){
			$('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
			},
		data : "prNo=" + prNo+"&dept="+dept,
		success : function(response) {
			$('#statusImg').addClass('loading hideBlock');
		    $('#statusImg').removeClass('loading');

			var data=response.split('^');
			var status=data[0];
			var message=data[1];
			if(status=='true'){
				$('#alertBox').text("IBT updated successfully");
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					window.location.href="../order/updatePoOrderDetails.htm";
					});;
			}
			else{
				$('#alertBox').text(message);
			$( "#dialog-modal1" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				});;

				}		
		},
	});
	
	}

	});
$(".editBtn").click(function(){
	$('#divMsg').hide();
	 $('#statusMsg').hide();
	var id = (this.id).split('-')[1];

	$(("#row-").concat(id)).addClass('rowHighlight');
	$(("#receivedEdit-").concat(id)).removeClass('hideBlock');
	$(("#received-").concat(id)).addClass('hideBlock');
		if($(("#UomEditFlag-").concat(id)).val().trim()!='Y'){
	$(("#uomEdit-").concat(id)).removeClass('hideBlock');
	$(("#uom-").concat(id)).addClass('hideBlock');
	}
	if($(("#baseUom-").concat(id)).val().trim()=='EA')
	{
	$(("#receivedTxt-").concat(id)).val($(("#receivedTxt-").concat(id)).val()/1);
	}	
	else
	{
	$(("#receivedTxt-").concat(id)).val($(("#receivedTxt-").concat(id)).val());
	}
	
	$(("#packOMEdit-").concat(id)).removeClass('hideBlock');
	$(("#packOM-").concat(id)).addClass('hideBlock');
	
	$(("#saveRecord-").concat(id)).removeClass('hideBlock');
	$(("#editRecord-").concat(id)).addClass('hideBlock');
	//$(("#receivedTxt-").concat(id)).val("");
	$(("#packOMTxt-").concat(id)).val("");
	
});
			$("#gstChange").click(function(e) {			
			$( "#dialog-modalGST" ).dialog( "close" );
			setTimeout(function(){$('#gst').focus();},500);
			});

			// new
			$('#temperature').change(function() {
				if($('#temperature').val().trim()!=""){
				$('#temperature').val(parseFloat($('#temperature').val()).toFixed(1));
				}
			});
			$('#temperatureIBT').change(function() {
				if($('#temperatureIBT').val().trim()!=""){
				$('#temperatureIBT').val(parseFloat($('#temperatureIBT').val()).toFixed(1));
				}
			});
			

			$("#sendIBT").click(function(e) {
				if($('#tempFromServiceIBT').val()!="" && $.trim($("#tempFromServiceIBT").val()).length != 0){

					//$("#dialog-IBTSitePop" ).dialog( "close" );
					$('.warningMessage h4').addClass('hideBlock');
					$('.formQuestion').addClass('hideBlock');		
					$( "#dialog-modalTemperature" ).dialog( "open" );
					$('#temperatureIBT').val('');
					$('#temperatureIBT').focus();


					}else{
						var vendorDesc='';
						var sourceSupply='';
						var temperatureForRecord=$('#temperatureIBT').val();
						$.ajax({
							type : "GET",
							url : "sendIBT.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
							data : "vendorDesc=" + vendorDesc + "&temperatureForRecord="+temperatureForRecord  ,
							success : function(response) {
								var status=response.split(':')[0];
								if(status=='true'){
									$('#alertBox').text(response.split(':')[1]);
									$('.hideForOpenIBT').addClass('hideBlock');
									$('#showRecQty').addClass('lastColumn');
									$('#colSpan').attr('colspan','7');
										
									$( "#dialog-modal1" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal1" ).dialog( "close" );
										$('#change-status').text('Authorised');
										$('#sendIBTLabel').hide();
										if($('#recSite').val()==$('#sendSite').val()){
										$('#receiveOrder').show();
										}
										/* if($('#sendSite').val()==$('#recSite').val()){
										$('#cancelOrder').show();
										}else{
											$('#cancelOrder').hide();
											} */
											$('#cancelOrder').hide();
										$('#editdDate').hide();
										//$('#msg').val('');
										});
									$(".closePopUp").click(function(e) {
										//$( "#dialog-modal1" ).dialog( "close" );
										$('#change-status').text('Authorised');
										$('#sendIBTLabel').hide();
										if($('#recSite').val()==$('#sendSite').val()){
										$('#receiveOrder').show();
										}
										/* if($('#sendSite').val()==$('#recSite').val()){
										$('#cancelOrder').show();
										}else{
											$('#cancelOrder').hide();
											} */
											$('#cancelOrder').hide();
										$('#editdDate').hide();
									
														 
										  });
									}
								else{
									$('#alertBox').text(response.split(':')[1]);
									$( "#dialog-modal1" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal1" ).dialog( "close" );
										
										//$('#msg').val('');
										});;
									}
								
							
								 //$('#popupDataDiv').html(response);
								 $('#statusImg').addClass('loading hideBlock');
						         $('#statusImg').removeClass('loading');
							},
						});

						
					}

			});
			//ibt temp check
			$( "#dialog-modalTemperature" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 430
			});
		
		$("#dialog-modalTemperature").parent().addClass("popupWrapper");
		$( "#dialog-modalGST" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 430
		});
	
	$("#dialog-modalGST").parent().addClass("popupWrapper");

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
			
			
			
			if($('#recSite').val()==$('#sendSite').val())
				{
				$('#receiveOrder').show();
				}
			else{
				$('#receiveOrder').hide();
				}
			if($('#idStatus').val()=='ZNB')
				{
				$('.hideStore').text('');
				}
			
			if($('#brudCrumCheck').val()=='true'){
				$('.orderDet').hide();
				$('.reconFlag').show();
				}
			if($('#sendIBTStatus').val()=='Open' && $('#idStatus').val()=='ZUB'){
				if($('#suppNo').val()==$('#sendSite').val())
				$('#sendIBTLabel').show();
				}
		/*	$('#sendIBT').click(function(){
				var vendorDesc='';
				var sourceSupply='';
				$.ajax({
					type : "GET",
					url : "sendIBT.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
					success : function(response) {
						var status=response.split(':')[0];
						if(status=='true'){
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$('#change-status').text('Authorised');
								$('#sendIBTLabel').hide();
								if($('#recSite').val()==$('#sendSite').val()){
								$('#receiveOrder').show();
								}
								$('#cancelOrder').hide();
								$('#editdDate').hide();
								//$('#msg').val('');
								});
							}
						else{
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								
								//$('#msg').val('');
								});;
							}
						
					
						 //$('#popupDataDiv').html(response);
						 $('#statusImg').addClass('loading hideBlock');
				         $('#statusImg').removeClass('loading');
					},
				});
				});*/
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
			if($('#updateRights').val()=='true'){
			$('#editdDate').show();
			}
			else{
			$('#editdDate').hide();
			}
			//note need to check for authorised order whether rec
			//if($('#openOrder').val()=='true' )
			if($('#openOrder').val()=='true')
			{
				/* if($('#recSite').val()==$('#sendSite').val()){
					$('#receiveOrder').hide();
							} */
			$('#receiveOrder').hide();
			if($('#idStatus').val()=='ZUB'){
			if($('#sendingStr').val()==$('#sendSite').val())
			{
			$('#cancelOrder').show();
			}
			}
			else{
				$('#cancelOrder').show();
				}
			}
			else{
				$('#cancelOrder').hide();
				}
			
			
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

			$(".inputDate").datepicker({
				zIndex:50
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
											
			$("#cancelLink").click(function(e) {
				

				 $( "#dialog-cancelOrder" ).dialog( "open" );				


				 
				 $("#confirmYES1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );
					// window.location.href= "../order/backToOrderDetails.htm";
					  var receivingSite=$('#recSite').val();
					 $.ajax({
							type : "GET",
							url : "cancelGoodsOrder.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
							data : "goodsSite=" + receivingSite + "&recQty=" + "" ,
							success : function(response) {
								//$('#tempValue').val(response);
								$('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading');	
								if(response=="true"){
									$('#change-status').text('Cancelled');
									$('.hideForOpenIBT').addClass('hideBlock');
									$('#showRecQty').addClass('lastColumn');
									$('#colSpan').attr('colspan','7');
									$('#cancelOrder').hide();
									$('#sendIBTLabel').hide();
									$('#receiveOrder').hide();
									$('#editdDate').hide();
								$('#alertBox').text("Request for cancelling the Order is successfully submitted");
								$( "#dialog-modal1" ).dialog( "open" );
								$('#okBtn').click(function(e){
									$( "#dialog-modal1" ).dialog( "close" );
									
									//$('#msg').val('');
									});;
									
									//window.location.href= "../order/backToOrderDetails.htm";
								}
								else if(response){
									$('#alertBox').text(response);
									$( "#dialog-modal1" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal1" ).dialog( "close" );
										$('#msg').val('');
										});;
										
									}
										
							},
							
						}); 
					
				 });

				 $("#confirmNO1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });  
				  
				 
				 //window.history.back();
			  }); 
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
			function formateDate1(v){
				if(v.length==8)
				{
				var finalDate=parseDate(v).getFullYear();
				var splitDate=v.split(".");
				finalDate =splitDate[0]+"."+splitDate[1]+"."+finalDate;
				return finalDate;
				}
				else{
					return v;	
					}
				}
			
			$( "#editdDate" ).click(function() {
				$( "#dialog-modal-delivery" ).dialog( "open" );	
			});
			$( "#delCancel" ).click(function() {
				$( "#dialog-modal-delivery" ).dialog( "close" );	
			});
			
			$( "#changeDate" ).click(function()
				{
				var flag=true;
				var orderNo=$('#orderNo-update').val();
				if($('#dDate').val().split('/').length==3){
				var delDate=formateDate1($('#olddelDate-update').val());
				var changedDelDate=formateDate($('#dDate').val());
				var currentDate=new Date();
				
				var splitteddelDate=delDate.split('/');
				var month1=splitteddelDate[1]-1;
				var actualdelDate=new Date();
				actualdelDate.setFullYear(splitteddelDate[2],month1,splitteddelDate[0]);
				
				var splittedchangedDelDate=changedDelDate.split('/');
				var month2=splittedchangedDelDate[1]-1;
				var actualChangedDelDate=new Date();
				actualChangedDelDate.setFullYear(splittedchangedDelDate[2],month2,splittedchangedDelDate[0]);

				if(validateDate(changedDelDate,dDate,"delivery"))
				{
				flag=false;
				}
				if(actualChangedDelDate.getTime()<currentDate.getTime())
				{
				flag=false;
				$('#alertBox').text('Delivery date must be later than today.');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					});
				
				}
				if(actualChangedDelDate.getTime()==actualdelDate.getTime()){
					flag=false;
					$( "#dialog-modal-delivery" ).dialog( "close" );
					 $('#alertBox').text('Request for updating the order is successfully submitted');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							});
				}
				
				
				if(flag)
				{
					$( "#dialog-modal-delivery" ).dialog( "close" );
				$.ajax({
					type : "GET",
					url : "updateDeliveryDate.htm",
					beforeSend: function(){

						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "orderNo=" + orderNo + "&delDate="+changedDelDate ,
					success : function(response) {
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');
						 if(response=="true")
						 {
							// $('#alertBox').text('Order delivery date updated successfully');
							//$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								});
							$('#deliDate').html(changedDelDate);
							 }
						 else{
							 $('#alertBox').text(response);
								$( "#dialog-modal1" ).dialog( "open" );
								$('#okBtn').click(function(e){
									$( "#dialog-modal1" ).dialog( "close" );
									});
						 }
						
						 }
						 /*else{
								$("#supplier").val($("#suppNo0").text()+"-"+$("#suppName0").text());
							 }
						 $('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading'); 
					},*/
				});
				}
				}
					
			else{
				$('#alertBox').text('Please enter delivery date in dd/mm/yyyy format.');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$("#dialog-modal1").dialog( "close" );
				
				});
				return true;
				}
		});/*
			
				}
				else{
					$('#alertBox').text('Please fill the supplier field');
					$( "#dialog-modal1" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal1" ).dialog( "close" );
						});
					$('#supplier').focus();
					}*/


			function validateDate(rosDate,id1,msg)
			{
			var currentDate=new Date();
			if(rosDate.split('/').length==3){
			var splittedRosDate=formateDate(rosDate).split('/');
			var actualRosDate=new Date();
			var month1=splittedRosDate[1]-1;
			actualRosDate.setFullYear(splittedRosDate[2],month1,splittedRosDate[0]);
			var splittedOne=splittedRosDate[0]+splittedRosDate[1]+splittedRosDate[2];

			if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || (splittedOne.length!=8 && splittedOne.length!=6))
			{
			$('#alertBox').text('Please enter a '+msg+' date in dd/mm/yyyy format.');
			$( "#dialog-modal1" ).dialog( "open" );
			$('#okBtn').click(function(e){
			$("#dialog-modal1").dialog( "close" );
			
			});
			return true;
			}
			else {
			return false;
			}
			}
			else{
				
				$('#alertBox').text('Please enter a '+msg+' date in dd/mm/yyyy format.');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$("#dialog-modal1").dialog( "close" );
				
				});
				return true;
				}
			
			}

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
					 question6="Do you wish to receive  every item in this order as ZERO Qty?";
					
					 
					 
					 
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
			/*$('.yesButton').click(function(){	
				callNextPopup();
			});
			$('.noButton').click(function(){	
				$('#confirm-popup,#overlay-back').fadeOut(500);
				$('#invoiceNo').focus();
			});

			$('#cancel').click(function(){
				$( "#dialog-modal" ).dialog( "close" );
				$( ".textbox" ).val('');
				quesLevel=1;
			});*/

			
			
			
			
		if($('#cancelStatus').val()=="true" || $('#receiveStatus').val()=="true"){
			$('.hideContent').hide();
			}
			if($('#change-status').text()=='Authorised'){
				
				if($('#idStatus').val()=='ZUB'){
					/* if($('#sendSite').val()==$('#recSite').val())
					{
						$('#cancelOrder').show();
					}
					else{
						$('#cancelOrder').hide();
						} */
					$('#cancelOrder').hide();
				}
				else{
					$('#cancelOrder').show();
					}
			}

			// change for ibt receive
			if($('#hideAll').val()=='Y'){
				$( "#receiveOrder" ).hide();
				$( "#editdDate" ).hide();
				$( "#sendIBTLabel" ).hide();
				$( "#cancelOrder" ).hide();
				}
			//$("#wizard").jWizard();
			
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 430
			});
			$("#dialog-modal").parent().addClass("popupWrapper");
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
		$("#dialog-temperature").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 120,
			maxHeight : 600,
			width : 350
		});
		$("#dialog-temperature").parent().addClass("popupWrapper");
			
			
			
			// Delivery date
			$( "#dialog-modal-delivery" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 150,
				maxHeight: 600,
				width: 350
			});
			
			$("#dialog-modal-delivery").parent().addClass("popupWrapper");
			$( "#dialog-modal2" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
			$("#dialog-modal2").parent().addClass("popupWrapper");
			$( "#dialog-modal1" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal1").parent().addClass("popupWrapper"); 
			//cancell order
			$( "#dialog-cancelOrder" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-cancelOrder").parent().addClass("popupWrapper");
			
			// code to open popup on Receive Order
			$( "#receiveOrder" ).click(function() {
				if($('#idStatus').val()=='ZUB' && $('#hideDetail').val()!='B'){
					$('#wizard').submit();
					}
				else{
					$('#ui-id-2,#receiveAmount').click();
					$('.textbox').val('');	
					
					$('.formQuestion').addClass('hideBlock');		
				$( "#dialog-modal" ).dialog( "open" );	
				setTimeout(function(){$('#invoice').focus();},500);
				}			
			});
			if($('#invalidQty').val()=='true')
			{
			$('#alertBox').text('Article quantity cannot be decimal value. It is truncated to whole number');
			$( "#dialog-modal1" ).dialog("open");
			$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog("close");
				});;
				$('#invalidQty').val('');
			}
			
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
				
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

				
			
		});
				

		
		$('.aiphaNumericCheck').keypress(function(e) 
				{ 
				var code = e.keyCode ? e.keyCode:e.which;
				var pressedKey = String.fromCharCode(code); 
				if(pressedKey.match(/[a-zA-Z0-9]/g)) 
				{ 
				e.preventDefault(); 
				} 
				});
		  $("#proceed")
			.click(

					function() {
						var invoiceNo=$('#invoiceNo').val();
						var invoiceTotal=$('#invoiceTotal').val();
						var delDock=$('#delDock').val();
						var gst=$('#gst').val();
						var tempr=$("#temperature").val();
						
						 
							if($("#tempFromService").val()!="" && $.trim(tempr).length == 0){
								$('#alertBox').text('Please fill the temperature');
								$( "#dialog-modal1" ).dialog( "open" );
								$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$("#invoiceNo").focus();
								});

								}else if ((($.trim(invoiceNo).length != 0
							&& $.trim(invoiceTotal).length != 0
							
							&& $.trim(gst).length != 0)&&
							 $.trim(delDock).length == 0)||(($.trim(invoiceNo).length == 0
										&& $.trim(invoiceTotal).length == 0
										
										&& $.trim(gst).length == 0)&&
										 $.trim(delDock).length != 0)) {
						$('#wizard').submit();
					}else if(($.trim(invoiceNo).length != 0
							&& $.trim(delDock).length != 0)||($.trim(invoiceTotal).length != 0
									&& $.trim(delDock).length != 0)||($.trim(gst).length != 0
											&& $.trim(delDock).length != 0)){
						$('#alertBox').text('Please fill either Invoice details or Delivery Docket details to proceed');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
						$( "#dialog-modal1" ).dialog( "close" );
						$("#invoiceNo").focus();
						});
					}else{
				$('#alertBox').text('Please fill the mandatory fields to proceed');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				$("#invoiceNo").focus();
				});
				}
					});

		$("#treetable").treetable({
			expandable : true
		});

		
		
		 $("#backBtnId").click(function(e) {
			 if($('#brudCrumCheck').val()=='true'){
				 window.location.href="../order/backToRecon.htm";
				 }
			 else{
			 
			 window.location.href="../order/backToOrderSearch.htm";}
			//window.history.back();
		  }); 
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
		 		
		 		//alert("call cancel");
		 			 
		 			$( "#dialog-modal" ).dialog( "close" );
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
		 						$('.hideForOpenIBT').addClass('hideBlock');
								$('#showRecQty').addClass('lastColumn');
								$('#colSpan').attr('colspan','7');
		 						$( "#dialog-modal1" ).dialog( "open" );
		 						$('#okBtn').click(function(e){
		 							$( "#dialog-modal1" ).dialog( "close" );
		 							$('#msg').val('');
		 							});;
		 							window.location.href= "../order/backToOrderDetails.htm";
		 						}
		 						else {
		 							$('#alertBox').text(response);
		 							$( "#dialog-modal1" ).dialog( "open" );
		 							$('#okBtn').click(function(e){
		 								$( "#dialog-modal1" ).dialog( "close" );
		 								$('#msg').val('');
		 								});;
		 								
		 							}
		 								
		 					},
		 					
		 				}); 
		 			
		 		 
		 		
		 	}
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
		    function isDecimal(evt)
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
		    $(function() {

		    	 $("#cancelBtn").click(function(e) {
						$( "#dialog-modal" ).dialog( "close" );
				  }); 

		    	 $("#cancel").click(function(e) {
						$( "#dialog-modal" ).dialog( "close" );
				  });
		    	 $('#addArticle').click(function() {
		    			
						var suppName=$('#suppNo').val();
						var sourceSupply=$('#sos').val();;
						var warehouse='';
						var artType=$('input:radio[name=articleType]:checked').val();
						var articleNo = $('#artEan').val();
						var ordQty=$('#recQty').val();
						if (articleNo == "" || $.trim(articleNo).length == 0) {
							$('#msgLabel').text('Please enter article number.');
							$('#statusMsg').hide();
							$('#artEan').focus();
							$('#divMsg').removeClass('hideBlock');
						}
						else if(artType=="ArticleNumber" && isNaN(articleNo)){
							$('#msgLabel').text('Please enter a valid article number');
							$('#statusMsg').hide();
							$('#artEan').focus();
							$('#divMsg').removeClass('hideBlock');
							}
						else if (ordQty == "" || $.trim(ordQty).length == 0) {
							$('#msgLabel').text('Please enter quantity.');
							$('#statusMsg').hide();
							$('#recQty').focus();
							$('#divMsg').removeClass('hideBlock');
						}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
							$('#msgLabel').text('Please enter valid quantity');
							$('#statusMsg').hide();
							$('#divMsg').removeClass('hideBlock');
							$('#recQty').focus();
							}
						else if(artType=="description" && articleNo!=''){
							
							$.ajax({
								type : "GET",
								url : "getPoDescription.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									$('#statusMsg').hide();
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
										 $("#artEan").val($("#artNo0").text());
										 $('#desIndex').val('0');
										 	$('#statusImg').removeClass('loading hideBlock');
											$('#statusImg').addClass('loading');
											$("#flag" ).val('Finalize');
											$("#pReqForm").attr('action','addPoArticleDescriptionDetail.htm');
											$('#pReqForm').attr('method','GET');
											$('#divMsg').removeClass('errorDiv');
											$('#divMsg').addClass('errorDiv hideBlock');

											  $('#statusMsg').removeClass('errorDiv');
												$('#statusMsg').addClass('errorDiv hideBlock');

												
											$('#pReqForm').submit();
										 }
									 }else{
										 $('#msgLabel').text('Sorry no results returned for your search criteria. Please try again');
											$('#statusMsg').hide();
											$('#recQty').focus();
											$('#divMsg').removeClass('hideBlock');
										 
										/*  if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
											 
												 //$("#nodataMsg").addClass('tableTitle nodataMessage');
												$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
												$('.dialog-modal2').html('');
												$("#dialog-modal2").parent().addClass("popupWrapper");			
												$("#dialog-modal2" ).dialog( "open" );
												$("#searchWarning").addClass('hideBlock');
												$("#popupSearch").removeClass('hideBlock');
												} */
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
							$("#flag" ).val('Add');
							$("#pReqForm").attr('method','GET');
							$("#pReqForm").attr('action','addPoArticle.htm');
							
							$('#divMsg').removeClass('errorDiv');
							$('#divMsg').addClass('errorDiv hideBlock');

							  $('#statusMsg').removeClass('errorDiv');
								$('#statusMsg').addClass('errorDiv hideBlock');



									
								$('#pReqForm').submit();

					}
						//
					});  
		    	 

			if($('#receiveStatus').val()=="true"){

				//$( "#dialog-modal1" ).dialog( "open" );

				$('#alertBox').text("Order is received successfully.");
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				//$("#invoiceNo").focus();
				});
			}
		    });
	</script>
	</form>
</body>
</html>
