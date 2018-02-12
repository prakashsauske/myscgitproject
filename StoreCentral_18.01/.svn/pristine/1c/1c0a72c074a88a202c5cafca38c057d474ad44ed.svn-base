

<!DOCTYPE html>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
<meta name="format-detection" content="telephone=no">
<title>Order Details</title>
<link rel="stylesheet" href="../../styles/jquery-ui.css?version=${properties.version}" />
<link rel="stylesheet" href="../../styles/common_new.css?version=${properties.version}" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<style>
.noData {
	color: #f37821;
	position: absolute;
}

.divHeightOrder {
	height: 44px;
	margin-top: 8px;
}

.orderSearchBg {
	background: white;
	border: 1px solid #a1a1a1;
	border-radius: 7px;
}

.labelTextMargin {
	margin-top: 8px;
}

.errorPara {
	position: relative;
	margin-left: 10px;
}

label {
	color: #00501F;
	font-size: 16px;
	font-weight: bold;
	margin-left: 15px;
	margin-top: 0px;
	font-family: Arial;
}
</style>
<script>
			$(function() {
				$("#deliveryDate").datepicker();
			});

			$(document)
			.ready(
					function() {document.forms[0].autocomplete="off";
						if($('#confirmed').val() == "confirmed"){
								$('#buttonVal').val('Remove');
							}else{
								$('#buttonVal').val('Cancel');
								}

						if($('#orderedQty').val() != null
							|| $.trim($('#orderedQty').val()).length > 0){
							$('#orderedMultiple').text($('#orderedQty').val());								
							}
							$('#uom').val($('#uomTypeVal').val());	
						$('#orderQty').keyup(function(){
							
							var orderMultiple = Number($('#orderMultiple').text());
							var qty = Number($('#orderQty').val());
							var uomType = $('#uom').val();
							var orderedMultiple = orderMultiple*qty;
							if(uomType=="base"){
								$('#orderedMultiple').text($('#orderQty').val());
								$('#orderedQty').val($('#orderQty').val());
								}else{
									$('#orderedMultiple').text(orderedMultiple);
									$('#orderedQty').val(orderedMultiple);
									}
						
							});

						$('#uom').change(function(){
						
							var orderMultiple = Number($('#orderMultiple').text());
							var qty = Number($('#orderQty').val());
							var uomType = $('#uom').val();
							$('#uomTypeVal').val(uomType);
							var orderedMultiple = orderMultiple*qty;
							if(uomType=="base"){
								$('#orderedMultiple').text($('#orderQty').val());
								$('#orderedQty').val($('#orderQty').val());
								}else{
									$('#orderedMultiple').text(orderedMultiple);
									$('#orderedQty').val(orderedMultiple);
									}
						
							});
					});
			
			function validateForm() {
				$('.SshMsg').text("");
				$('#orderQty').css('border', '');
				$('#orderDate').css('border', '');
				$('#deliveryDate').css('border', '');
				$('.noData').html('');
				$('.error').html('');
				var orderQty = $('#orderQty').val();
				var deliveryDate = $('#deliveryDate').val().split('/');
				var baseUom = $('#baseUom').val();
				if (orderQty == "" || $.trim(orderQty).length == 0) {
					$('.error').html('Please enter value for the Transfer Quantity field');
					$("#innerData").html('');
					$("#innerData").hide();
					$('#orderQty').focus();
				} else if (isNaN(orderQty)) {
					$('.error').html('Please enter a number for Transfer Quantity field');
					$("#innerData").html('');
					$("#innerData").hide();
					$('#orderQty').focus();

				} else if (baseUom.toLowerCase() == "ea" && ($('#orderQty').val().indexOf('.') != -1)){

						$('.error').html('Please enter a whole number for Transfer Quantity field');
						$("#innerData").html('');
						$("#innerData").hide();
						$('#orderQty').focus();
		
				}else if ($('#deliveryDate').val() == ""
						|| $.trim($('#deliveryDate').val()).length == 0) {
					$('.error').html('Please enter Delivery date');
					$("#innerData").html('');
					$("#innerData").hide();
					$('#deliveryDate').focus();

				} else if (deliveryDate[0] > 31 || deliveryDate[1] > 12
						|| deliveryDate[2] > 9999) {
					$('.error').html('Please enter valid Delivery date');
					$("#innerData").html('');
					$("#innerData").hide();
					$('#deliveryDate').focus();

				} 
				 else {
					 if (baseUom.toLowerCase() == "kg" && ($('#orderQty').val().indexOf('.') != -1)){
							$('#orderQty').val(adjustFloat.toFixed(3));
				}
					 $('#buttonValue').val($('#confirm').val());
					 $('#confirmOrder').submit();
			}
			}
			function submitForm(){
				$('.SshMsg').text("");
				$('#buttonValue').val($('#buttonVal').val());
				$('#confirmOrder').submit();

				}
			function SshSubmit(){
				$('.SshMsg').text("");
				$('#buttonValue').val($('#sshButton').val());
				$('#confirmOrder').submit();
				}
			
			
		</script>
<style>
.divMargin {
	margin: 10px 40px 20px 40px;
}
</style>
</head>
<body>
	<form action="confirmOrder.htm" method="post" id="confirmOrder">
		<div id="order" class="page-bg">
			<div id="head-section">
				<img id="logoImg" src="${user.imgLocation}" alt="logo"
					style="height: 60px; width: auto;" />
				<div id="userIcon">
					<img id="userIcon1" src="../../images/dropDown_icon.png" alt="User" /><img
						id="highlight" src="../../images/darkuser.png" alt="User"
						style="display: none;" />
				</div>
				<!-- 
				<div id="header_right">
					<input data-role="none" id="searchInput" type="text" size="40" maxlength="40"
						placeholder="Enter store or article number..." />
				</div>
				 -->
				<div id="popupBasic">
					<div id="userProfile" style="display: none;">
						<ul>
							<li><a>User Profile</a></li>
							<li><a>Account Settings</a></li>
							<li><a href="../login/logout.htm">Logout</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div id="myStore">Store: &nbsp; ${user.siteNo} &nbsp;
				${user.siteName}</div>
			<div id="navigation-section" class="">
				<div id="nav-bar">
					<ul class="sf-menu" id="example">
						<li id="home" class="text-color-header"><a
							href="../login/goingHome.htm">Home</a></li>
						<li class="text-color-header"><a class="text-color-page"
							href="#">Orders</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr"><a href="../order/onPageLoad.htm"
									class="text-color">Enquiry</a></li>
								<li class="reportBtmBrdr "><a
									href="../produce/onPageLoadProduceLoadListSearch.htm"
									class="text-color">Produce Load List</a></li>
								<li class="reportBtmBrdr"><a
									href="../order/onPageLoadCreateManualOrder.htm"
									class="text-color">Create Manual Order</a></li>
								<li class=""><a href="../ibtOrder/onPageLoad.htm"
									class="text-color">Inter Branch Transfer</a></li>
							</ul></li>
						<li class="text-color-header"><a href="#">Lookup</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr"><a
									href="../article/onPageLoad.htm" class="text-color">Articles</a></li>
								<li class="reportBtmBrdr last-row"><a href="#"
									class="text-color">Stores</a></li>
							</ul></li>
						<li class="text-color-header" id="reportLi"><a href="#">Reports</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr"><a href="#" class="text-color">Order</a>
								</li>
								<li class="reportBtmBrdr"><a href="#">Sales</a></li>
								<li class="reportBtmBrdr"><a href="#">Audit</a></li>
								<li class="reportBtmBrdr"><a href="#">Stock Management</a></li>
								<li class="reportBtmBrdr"><a href="#">Stocktaker</a></li>
								<li class="reportBtmBrdr"><a href="#">Financial</a></li>
								<li class="reportBtmBrdr"><a
									href="../sohAdjustLog/onPageLoad.htm" class="text-color">Stock
										Adjustment Log </a></li>
								<li class="reportBtmBrdr"><a
									href="../report/onPageLoad.htm">DGMS</a></li>
								<li class=""><a href="../edgms/onPageLoadEDGMS.htm">eDGMS</a></li>
							</ul></li>
						<li class="text-color-header"><a href="#">Stock
								Management</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr last-row"><a
									href="../article/stockAdjustFromHome.htm" class="text-color">Stock
										Adjustment</a></li>
							</ul></li>
						<li class="text-color-header"><a href="#">Pricing</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr last-row"><a href="#"
									class="text-color">Promotions</a></li>
							</ul></li>
						<li class="text-color-header"><a href="#">Ticketing</a>
							<ul id="roprtUl">
								<li class="reportBtmBrdr"><a href="#" class="text-color">Maintenance</a>
								</li>
								<li class="reportBtmBrdr last-row"><a href="#"
									class="text-color">Promotions</a></li>
							</ul></li>
					</ul>
				</div>
			</div>
			<div class="order-content content-bg">
				<div id="bck-btn" class="margin-top30">
					<c:set var="statusVal" value='${ibtDetailsParam.status}' />
					<c:set var="articleNo" value='${articleOrderDetails.articleNo}' />


					<img src="../../images/arw.png" class="left back-arrow" />
					<div class="backText"
						<c:set var="prevPage" value="'../ibtOrder/backToIBTSite.htm?status=${statusVal}&articleNo=${articleNo}'" />
						onclick="javascript:window.location.href=${prevPage}">Back
						to IBT</div>
				</div>
				<div class="head-text margin-top6 font-bold">Order Details</div>
				<div id="orderDetails" class="margin-top20 font-bold">
					<div id="details-rowOne" class="details-row details-border-bottom">
						<div class="width50 left">
							<div class="labelText width30 left text-align-right">Article:</div>
							<div class="divValue width70 right text-align-left" id="order-no">${articleOrderDetails.articleNo}
								| ${articleOrderDetails.description}</div>
							<input type="hidden" name="articleNumber" id="articleNumber"
								value="${articleOrderDetails.articleNo}" /> <input
								type="hidden" name="listIndex" id="listIndex"
								value="${listIndex}" />

						</div>
					</div>
					<c:if test="${not empty articleOrderDetails.promoFromDate}">
						<div id="details-rowThree"
							class="details-row  details-border-bottom">


							<input type="hidden" name="baseUom" id="baseUom"
								value="${articleOrderDetails.baseUom}" />
							<div class="width50 left">
								<div class="labelText width30 left text-align-right">On
									Promotion From date :</div>
								<div class="divValue width70 right text-align-left" id="vendor">${articleOrderDetails.promoFromDate}</div>
							</div>
							<div class="width50 right">
								<div class="labelText width30 left text-align-right">To
									Date :</div>
								<div class="divValue width70 right text-align-left"
									id="trade-dept">${articleOrderDetails.promoToDate}</div>
							</div>
						</div>
					</c:if>
					<div id="details-rowFour"
						class="details-row  details-border-bottom">
						<div class="width50 left">
							<div class="labelText width30 left text-align-right">Carton
								Quantity :</div>
							<div class="divValue width70 right text-align-left" id="vendor">${articleOrderDetails.OM}</div>
						</div>
						<div class="width50 right">
							<div class="labelText width30 left text-align-right">Unit
								Cost :</div>
							<div class="divValue width70 right text-align-left"
								id="trade-dept">${articleOrderDetails.purChasePrice}</div>
						</div>
					</div>

					<div id="details-rowFive" class="details-row">
						<div class="width50 left">
							<div class="labelText width30 left text-align-right">Stock
								On Hand :</div>
							<div class="divValue width70 right text-align-left" id="vendor">${articleOrderDetails.SOH}</div>
						</div>
						<div class="width50 right">
							<div class="labelText width30 left text-align-right">Order
								Multiple :</div>
							<div class="divValue width70 right text-align-left"
								id="orderMultiple">${articleOrderDetails.OM}</div>
						</div>
					</div>
					<div id="details-rowSix" class="details-row last-row">
						<div class="width50 left">
							<div class="labelText width30 left text-align-right">Sell
								Out Days :</div>
							<div class="divValue width70 right text-align-left" id="vendor"></div>
						</div>
						<div class="width50 right">
							<div class="labelText width30 left text-align-right">Vendor
								:</div>
							<div class="divValue width70 right text-align-left" id="order-no">
								${articleOrderDetails.vendorNo}
								<c:if test="${not empty articleOrderDetails.vendorName}"> | ${articleOrderDetails.vendorName}
								</c:if>
							</div>

						</div>
					</div>
				</div>

				<div id="searchOrder" class="margin-top20 font-bold">
					<%-- <div id="search-rowOne" class="search-row last-row">
						<div class="width50 left">
							<div class="labelText width30 left text-align-right">Vendor :
							</div>
							<div class="divValue width70 right text-align-left" id="order-no">
								${articleOrderDetails.vendorNo} | ${articleOrderDetails.vendorName}
							</div>
						</div>
					</div> --%>
					<div id="search-rowTwo"
						class="search-row divHeightOrder margin-top20 last-row">
						<div class="width50 left">
							<div
								class="labelText width30 left text-align-right labelTextMargin">Creation
								Date :</div>
							<div class="divValue width70 right text-align-left"
								id="total-cartons">
								<input id="orderDate" name="orderDate"
									class="select-box  placeHolder inputStyles margin-top7"
									type="text" size="40" maxlength="40" readonly="readonly"
									placeholder="Enter roster date"
									value="${model.ibtDetailsParam.orderDate}" />
							</div>
						</div>
						<div class="width50 left">
							<div
								class="labelText width30 left text-align-right labelTextMargin">Delivery
								Date :</div>
							<div class="divValue width70 right text-align-left"
								id="total-pallets">
								<input id="deliveryDate" name="deliveryDate"
									class="select-box  placeHolder inputStyles  margin-top7"
									type="text" size="40" maxlength="40"
									placeholder="Enter roster date"
									value="${model.ibtDetailsParam.deliveryDate}" />

							</div>
						</div>
					</div>
					<input type="hidden" name="baseUom" id="baseUom"
						value="${articleOrderDetails.baseUom}" />


					<div id="search-rowThree"
						class="search-row divHeightOrder margin-top20 last-row">
						<div class="width50 left">
							<div
								class="labelText width30 left text-align-right labelTextMargin">Transfer
								Quantity :</div>
							<div class="divValue width70 right text-align-left"
								id="total-cartons">
								<input id="orderQty" name="orderQty"
									class="select-box  placeHolder inputStyles  margin-top7"
									type="text" size="40" maxlength="40"
									placeholder="Enter order quantity"
									value="${model.ibtDetailsParam.transferQty}" /> <select
									class="select-box placeHolder inputStyles ibtSelect margin-left10"
									name="uom" id="uom" tabindex="1">
									<option value="order">${articleOrderDetails.ordUOMDesc}</option>
									<option value="base">${articleOrderDetails.baseUOMDesc}</option>

								</select> <label id="orderedMultiple">
									${articleOrderDetails.orderedQuantity}</label> <label>
									${articleOrderDetails.baseUom}</label>
							</div>

						</div>
					</div>
					<div class="margin-top20 font-bold ">
						<p class="error noData errorPara">
							<c:if test="${not empty errorMsg}">
								<b class="SshMsg">${errorMsg}</b>
							</c:if>
						</p>

					</div>

					<div id="orderList-div" class="margin-top20">
						<!-- 	<h3>Future Orders</h3> -->
						<ul id="orderList" class="list">
							<li class="list-li list-head lineheight40">
								<div
									class="list-head-text width8 margin-left10 line-height12 list-head-text-marg">Order
									No</div>

								<div class="list-head-text width21 line-height12">Delivery
									Date</div>
								<div class="list-head-text width21 line-height12">Quantity
									(${articleOrderDetails.baseUom})</div>
								<div class="list-head-text width21 line-height12">Order
									Multiple</div>
								<div class="list-head-text width21 line-height12">Status</div>
							</li>
							<c:forEach items="${orderList}" var="orderDetails">
								<li class="list-li list-content">
									<div
										class="list-content-text width8 margin-left10 line-height12">${orderDetails.orderNo}</div>

									<div class="list-content-text width21 line-height12">${orderDetails.deliveryDate}</div>
									<div class="list-content-text width21 line-height12">${orderDetails.orderQty}</div>
									<div class="list-content-text width21 line-height12">${orderDetails.OM}</div>
									<div class="list-content-text width21 line-height12">${orderDetails.orderStatus}</div>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>
				<!-- <div id="searchDIvStyle">
				<a href="receiveOrder.htm">
			<input type="button" value="Receive Order" id="search_pro" >
			</a>
			</div> -->
			</div>
			<div class="divMargin">

				<input type="button" name="buttonVal" value="Show Sales History"
					id="sshButton" class="search-button" onclick="SshSubmit();" /> <input
					type="button" name="buttonVal" value="Remove" id="buttonVal"
					class="search-button" onclick="submitForm();" /> <input
					type="button" name="buttonVal" value="Confirm" id="confirm"
					class="search-button" onclick="validateForm();" /> <input
					type="hidden" value="" name="buttonValue" id="buttonValue" /> <input
					type="hidden" value="${ibtDetailsParam.status}" name="status"
					id="status" /> <input type="hidden"
					value="${ibtDetailsParam.uomValType}" name="uomTypeVal"
					id="uomTypeVal" />

			</div>
			<input type="hidden" name="orderedQty" id="orderedQty"
				value="${model.ibtDetailsParam.orderedQty}" /> <input type="hidden"
				id="confirmed" value="${model.confirmed}" />
			<div id="foot-section" class="min-width">
				<div id="footer-text">
					<div id="footer-left"
						class="left width40 text-align-left font-bold">Copyright
						Woolworths 2013</div>
					<div id="footer-right" class="right width40 text-align-right">
						<label id="terms" class="link font-bold">Privacy policy</label><label
							id="pipeLine" class="link margin-left20 font-bold">|</label><label
							class="link margin-left20 font-bold">Terms of Use</label>
					</div>
				</div>
			</div>
		</div>

	</form>
</body>

</html>