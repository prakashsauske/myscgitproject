<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<!-- ArticleInventory.jsp -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Inventory - Other Stores</title>
<script type="text/javascript" src="scripts/jquery-1.9.1.min.js?version=${properties.version}"></script>
<link rel="stylesheet" href="styles/jquery-ui.css?version=${properties.version}" />
<script src="scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="scripts/customJquery.js?version=${properties.version}"></script>
<link rel="stylesheet" type="text/css" href="styles/wow_style.css?version=${properties.version}" />
<script type="text/javascript">
	var isDetailsSupported = (function(doc) {
		var el = doc.createElement('details'), fake, root, diff;
		if (!('open' in el)) {
			return false;
		}
		root = doc.body
				|| (function() {
					var de = doc.documentElement;
					fake = true;
					return de.insertBefore(doc.createElement('body'),
							de.firstElementChild || de.firstChild);
				}());
		el.innerHTML = '<summary>a</summary>b';
		el.style.display = 'block';
		root.appendChild(el);
		diff = el.offsetHeight;
		el.open = true;
		diff = diff != el.offsetHeight;
		root.removeChild(el);
		if (fake) {
			root.parentNode.removeChild(root);
		}
		return diff;
	}(document));

	//Article inventory
	function doAjax() {
		var articleNo = $('#articleNo').val();
		var siteNo = $('#siteNo').val();
		alert(articleNo);
		alert(siteNo);
		$.ajax({
			type : "POST",
			url : "ArticleInventory.htm",
			data : "articleNo=" + articleNo + "&siteNo=" + siteNo,
			success : function(response) {
				// Display the SOH info
				document.getElementById("divSohDetails").innerHTML = response;
				// Delete the link to fetch SOH
				document.getElementById("divSohLink").innerHTML = "";
			},
		});
	}

	//Article Inventory
	function populateSOH() {
		alert('inside populateSOH');
		// Proceed only if article number is there and not already fetched
		if (document.getElementById("divSohDetails").innerHTML == "") {
			document.getElementById("divSohDetails").innerHTML = "Please wait, fetching inventory info...";
			alert('before calling doAjax');
			doAjax();
		}
	}

	function populateSiteView() {
		if (null != $('#articleNo').val()
				&& $('#articleNo').val().trim() != ""
				&& document.getElementById("divSiteViewDetails").innerHTML == "") {
			document.getElementById("divSiteViewDetails").innerHTML = "Please wait, fetching SiteView info...";
			doAjaxSiteView();
		}
	}

	function populatePurchasingView() {

		if (null != $('#articleNo').val()
				&& $('#articleNo').val().trim() != ""
				&& document.getElementById("divPurchasingViewDetails").innerHTML == "") {
			document.getElementById("divPurchasingViewDetails").innerHTML = "Please wait, fetching PurchasingView info...";
			doAjaxPurchasingView();
		}
	}

	function doAjaxSiteView() {
		var articleNo = $('#articleNo').val();
		var siteNo = $('#siteNo').val();
		var salesOrg = $('#salesOrg').val();
		$
				.ajax({
					type : "POST",
					url : "ArticleSiteView.htm",
					data : "articleNo=" + articleNo + "&salesOrg=" + salesOrg
							+ "&siteNo=" + siteNo,
					success : function(response) {

						document.getElementById("divSiteViewDetails").innerHTML = response;

						document.getElementById("divSiteViewLink").innerHTML = "";
					},
				});
	}

	function doAjaxPurchasingView() {
		var articleNo = $('#articleNo').val();
		var siteNo = $('#siteNo').val();
		var salesOrg = $('#salesOrg').val();

		$
				.ajax({
					type : "POST",
					url : "ArticlePurchasingView.htm",
					data : "articleNo=" + articleNo + "&salesOrg=" + salesOrg
							+ "&siteNo=" + siteNo,
					success : function(response) {
						// Display the SOH info
						document.getElementById("divPurchasingViewDetails").innerHTML = response;
						// Delete the link to fetch SOH
						document.getElementById("divPurchasingViewLink").innerHTML = "";
					},
				});
	}
</script>
<style>
#search {
	width: 75%;
	margin-top: 3px;
}

#listTable {
	border: 1px solid #999;
	border-radius: 5px;
	height: 100%;
	width: 97%;
	background: #D4CBC0;
}

#tableHeader {
	text-align: left;
	padding: 0px;
	height: 40px;
}

.trTable {
	height: 45px;
	text-align: center;
	background-color: white;
}

tr.border_bottom td {
	
}

.fltLeft {
	float: left;
}

.txtAlign {
	text-align: left;
}

.fltRight {
	float: right;
}

.cursorpoint {
	cursor: pointer;
}

input {
	height: 25px;
	width: 150px;
	border-radius: 5px;
}

.borderRight {
	border-right: 2px solid #d4cbc0;
	height: 100%;
	width: 50%;
}
</style>
</head>
<body>

	<div class="container" style="background-color: #f2f2f0;">

		<div class="header" style="background-color: #FFF;">
			<a href="#" class="header"><img src="images/logo.png"
				alt="Insert Logo Here" name="Insert_logo" width="299" height="93"
				id="Insert_logo" style="background-color: #FFFFFF; display: block;" /></a>
			<!-- end .header -->
		</div>

		<div id="header_right">

			<table width="450" border="0" height="50">
				<tr>
					<td width="362"
						style="background: url(images/search.png) no-repeat 0 0;"><input
						type="text" size="40" maxlength="40" style="margin-left: 20px;" /></td>
					<td width="78"><a href="#"><img src="images/icon_drop.png"
							width="53" height="42" /></a></td>
				</tr>
			</table>

		</div>

		<div style="background-color: #3b3b3b; height: 50px;">

			<br>
				<table width="900" border="0"
					style="color: #77c250; font-weight: bold; font-size: 14px; margin-left: 18px;">
					<tr>
						<td width="81">Home</td>
						<td width="97">Orders</td>
						<td width="101">Lookup</td>
						<td width="108">Reports</td>
						<td width="181">Stock Management</td>
						<td width="104">Pricing</td>
						<td width="198">Ticketing</td>
					</tr>
				</table>
		</div>
		<div style="background-color: #d4cbc0; height: 50px;">

			<table width="274" height="53" border="0"
				style="font-size: 14px; font-weight: bold; margin-left: 15px;">
				<tr>
					<td width="115"><a href="#"
						onclick="location.href='article.htm';">Store Search</td>
					<td width="149" style="background-color: #FFF; text-align: centre;"><strong>Nearby
							Store Search</strong></td>
				</tr>
			</table>


		</div>
		<div class="content">



			<h1 style="color: #00501f; font-size: 25px">Search Nearby Stores</h1>


			<form:form action="requestSearchInventory.htm" method="POST"
				modelAttribute="model">
				<table width="900" border="0"
					style="color: #00501f; font-size: 14px; font-weight: bold; margin-left: 15px;">
					<tr>
						<td width="249">Article Number:</td>
						<td width="249"><input type="number" required min="1"
							max="999999999999999999" placeholder="1 - 18 digits"
							id="articleNo" name="articleNo" value="${model.param.articleNo}"
							style="width: 100"></td>
						<td width="178">&nbsp;</td>
						<td width="312">&nbsp;</td>
					</tr>
					<tr>
						<td width="249">Site Number :</td>
						<td width="249"><c:set var="pageSiteNo"
								value="${user.siteNo}" /> <c:if
								test="${not empty model.param.siteNo}">
								<c:set var="pageSiteNo" value="${model.param.siteNo}" />
							</c:if> <input type="number" required min="1000" max="9999"
							placeholder="4 digits " name="siteNo" id="siteNo"
							value="${pageSiteNo}" style="width: 50"></td>
						<td width="249">Sales Org :</td>
						<td width="249"><input type="number" min="1000" max="9999"
							placeholder="4 digits " name="salesOrg" id="salesOrg"
							value="${model.param.salesOrg}" style="width: 50"></td>

						<input type="hidden" value="10" name="distributionChannel"
							id="distributionChannel">
					</tr>
					<tr>
						<td width="249">Distance :</td>
						<td width="249"><input type="number" required min="1"
							max="999" placeholder="5km - 100 km" name="distance"
							id="distance" value="${model.param.distance}" style="width: 100"></td>
						<td width="249">Max.No of stores :</td>
						<td width="249"><input type="number" min="1" required
							max="99" placeholder="1 to 50" name="maxStores" id="maxStores"
							value="${model.param.maxStores}" style="width: 50"></td>
					</tr>
				</table>
				<br />
				<br />
				<table width="900" border="0" style="margin-left: 65px;">
					<tr>
						<td width="509" style="color: #ee294d; font-size: 16px"><em><strong>
									* Providing Sales,Inventory,Promotional&Site view based on
									distance</strong></em></td>
						<td width="509"><input type="submit" value="Search"></td>
					</tr>
				</table>

				<br> <!-- 
<div style="height: 100%; width: 920px; border: 2px solid #a1a1a1; border-radius: 7px; margin-left: 15px; background-color: #FFF;">
				
				<table width="505" border="0"
					style="color: #009a3d; font-weight: bold;">
					
				<tr>
						<td width="176" height="49" style="text-align: left">Article Number / TUN / EAN (GTIN):</td>
						<td width="319" style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.articleNo}</td>
					</tr>
					<tr>
						<td width="176" height="49" style="text-align: left">Description:</td>
						<td width="319" style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.description}</td>
					</tr>
					<tr>
						<td width="176" height="49" style="text-align: left">Scan
							Description:</td>
						<td width="319" style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.scanDescription}</td>
					</tr>
					<tr>
						<td height="48" style="text-align: left">Brand:</td>
						<td style="text-align: left; color: #00501f;">
							${model.articleBasicViewDetails.brandId} |
							${model.articleBasicViewDetails.brandName}</td>

					</tr>

					<tr>
						<td height="55" style="text-align: left">Comparitive Size
							(New Zealand):</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.compSizeNz}
							| ${model.articleBasicViewDetails.compSizeNzUom}</td>
					</tr>
					<tr>
						<td height="68" style="text-align: left">Maximum Value:</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.maxValue}</td>
					</tr>

					<tr>
						<td height="68" style="text-align: left">Minimum Value:</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.minValue}</td>
					</tr>

					<tr>
						<td height="68" style="text-align: left">Expiry Period:</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.expiryPeriodType}
							| ${model.articleBasicViewDetails.expiryPeriod}</td>
					</tr>
					<tr>
						<td height="68" style="text-align: left">Maximum Value:</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.maxValue}</td>
					</tr>
					<tr>
						<td height="68" style="text-align: left">Maximum Value:</td>
						<td style="text-align: left; color: #00501f;">${model.articleBasicViewDetails.maxValue}</td>
					</tr>
				</table>
			</div>
<div id="GlobalTrade"
						style="min-height: 180px; width: 920px; border: 2px solid #a1a1a1; border-radius: 7px; margin-left: 15px; background-color: #FFF; display: none;">

						<table width="920" border="0"
							style="border-collapse: collapse; font-weight: bold;"
							height="100%">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td width="216" height="47">Global Trade Item Number</td>
								<td width="254">Alternate UOM</td>
								<td width="316">Product Standard Main Indicator</td>
							</tr>
							<c:forEach items="${articleGtinList}" var="articleGtin"
								varStatus="articleGtinInfo">
								<tr style="text-align: left; color: #009a3d;">
									<td height="56">${articleGtin.ean11}</td>
									<td>${articleGtin.altUom}</td>
									<td>${articleGtin.numtp}</td>
								</tr>
							</c:forEach>

						</table>


					</div> --> <!-- ------ Search Results -------- --> <details
						open="open"> <summary>
					<b>Article Inventory</b></summary> <c:set var="firstDetailOpen" value="open" />
					<c:forEach items="${displayInventoryList}" var="list"
						varStatus="list1">
						<details ${firstDetailOpen}> <c:set
							var="firstDetailOpen" value="" /> <summary> <span
							style="white-space: nowrap;"> <b>${list.siteNo}</b>
						</span> </summary> <!--  ---------- SALES VIEW  ------- -->
						<p>Sales View</p>
						<table id="tab1table" border="0">
							<tr>
								<th id="tableHeading">Department</th>
								<td style="text-align: left; color: #009a3d;">${list.saleView.department}</td>
								<td style="text-align: left; color: #009a3d;">${list.saleView.deptName}</td>
							</tr>
							<tr>
								<th id="tableHeading">Category</th>
								<td style="text-align: left; color: #009a3d;">${list.saleView.category}</td>
								<td style="text-align: left; color: #009a3d;">${list.saleView.catName}</td>
							</tr>
							<tr>
								<th id="tableHeading">Sub Category</th>
								<td style="text-align: left; color: #009a3d;">${list.saleView.subCategory}</td>
								<td style="text-align: left; color: #009a3d;">${list.saleView.subCatName}</td>
							</tr>
							<tr>
								<th id="tableHeading">Segment</th>
								<td style="text-align: left; color: #009a3d;">${list.saleView.segment}</td>
								<td style="text-align: left; color: #009a3d;">${list.saleView.segmentName}</td>
							</tr>
							<tr>
								<th id="tableHeading">EAS Indicator</th>
								<td style="text-align: left; color: #009a3d;">${list.saleView.easIndicator}</td>
							</tr>

						</table>

						<p>Sell Price View</p>

						<table id="tab1table" border="0">
							<tr>
								<th id="tableHeading">Sales Price</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.sellEffectiveGP}</td>
							</tr>
							<tr>
								<th id="tableHeading">Promotion</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoId}</td>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoDesc}</td>
							</tr>
							<tr>
								<th id="tableHeading">Promotion Type</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoType}</td>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoTypeDesc}</td>
							</tr>
							<tr>
								<th id="tableHeading">Promo Sales Price</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoSalesPrice}</td>

							</tr>
							<tr>
								<th id="tableHeading">PromoEffectiveGP</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoEffectiveGP}</td>
							</tr>
							<tr>
								<th id="tableHeading">Promotion Validity</th>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoFromDate}
									<c:if
										test="${list.salePriceView.promoFromDate && articleSellPriceViewList.promoToDate}"> to </c:if>
								</td>
								<td style="text-align: left; color: #009a3d;">${list.salePriceView.promoToDate}</td>
							</tr>


						</table>
						<!--  ---------- SOH ------- -->

						<p>Stock On Hand</p>
						<table id="tab1table" border="0">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td width="216" style="white-space: normal;">Storage
									Location</td>
								<td width="216" style="white-space: normal;">Stock On Hand</td>
								<td width="216" style="white-space: normal;">Stock in
									Quality Inspection</td>
								<td width="216" style="white-space: normal;">Total Stock of
									All Restricted Batches</td>
								<td width="216" style="white-space: normal;">Stock in
									transfer</td>
								<td width="216" style="white-space: normal;">Blocked Stock</td>
								<td width="216" style="white-space: normal;">Blocked Stock
									Returns</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-General</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-Structural</td>
								<td width="216" style="white-space: normal;">Origin from
									ERP or POS or Combined</td>
								<td width="216" style="white-space: normal;">Aggregation
									level</td>
							</tr>


							<tr style="text-align: left; color: #009a3d;">
								<td>${list.sohView.storageLocation}</td>
								<td>${list.sohView.stockOnHand}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.stockinQualityInspection}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.totalStockofAllRestBatches}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.stockinTransfer}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.blockedStock}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.blockedStockReturns}
									${list.sohView.baseUnitofMeasure}</td>
								<td>${list.sohView.crossSiteConfigurableArticleGen}</td>
								<td>${list.sohView.crossSiteConfigurableArticleStruct}</td>
								<td>${list.sohView.sourceErpPos}</td>
								<td>${list.sohView.aggrLevel}</td>
							</tr>

						</table>




						<!-- ---------- SOO -------- -->

						<p>Stock On Order</p>
						<table id="tab1table" border="0">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td width="216" style="white-space: normal;">Storage
									Location</td>
								<td width="216" style="white-space: normal;">Stock On Order</td>
								<td width="216" style="white-space: normal;">On-Order Stock
									Quantity for Consignment</td>
								<td width="216" style="white-space: normal;">GR Blocked
									Stock</td>
								<td width="216" style="white-space: normal;">Release
									Quantity from Stock Transport Orders</td>
								<td width="216" style="white-space: normal;">Transit Stock
									for Cross-Company Code Stock Transfer</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-General</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-Structural</td>
								<td width="216" style="white-space: normal;">Origin from
									ERP or POS or Combined</td>
								<td width="216" style="white-space: normal;">Aggregation
									level</td>
							</tr>


							<tr style="text-align: left; color: #009a3d;">
								<td>${list.sooView.storageLocation}</td>
								<td>${list.sooView.stockOnOrder}
									${list.sooView.baseUnitofMeasure}</td>
								<td>${list.sooView.onOrderConsign}
									${list.sooView.baseUnitofMeasure}</td>
								<td>${list.sooView.grBlockedStock}
									${list.sooView.baseUnitofMeasure}</td>
								<td>${list.sooView.transportOrders}
									${list.sooView.baseUnitofMeasure}</td>
								<td>${list.sooView.transitCrossCompany}
									${list.sooView.baseUnitofMeasure}</td>
								<td>${list.sooView.crossSiteConfigurableArticleGen}</td>
								<td>${list.sooView.crossSiteConfigurableArticleStruct}</td>
								<td>${list.sooView.sourceErpPos}</td>
								<td>${list.sooView.aggrLevel}</td>
							</tr>
						</table>



						<!-- ---------- SIT -------- -->

						<p>Stock In Transit</p>
						<table id="tab1table" border="0">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td width="216" style="white-space: normal;">Stock in
									Transfer (Site to Site)</td>
								<td width="216" style="white-space: normal;">Stock in
									Transit</td>
								<td width="216" style="white-space: normal;">Tied Empties
									Stock</td>
								<td width="216" style="white-space: normal;">Valuated Goods
									Receipt Blocked Stock</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-General</td>
								<td width="216" style="white-space: normal;">Cross-Site
									Configurable Article-Structural</td>
								<td width="216" style="white-space: normal;">Origin from
									ERP or POS or Combined</td>
								<td width="216" style="white-space: normal;">Aggregation
									level</td>
							</tr>

							<c:if test="${inventorySITInfo.siteNo == sitsitenos}">
								<tr style="text-align: left; color: #009a3d;">
									<td>${list.sitView.stockinTransfer}</td>
									<td>${list.sitView.stockinTransit}
										${list.sitView.baseUnitofMeasure}</td>
									<td>${list.sitView.tiedEmptiesStock}
										${list.sitView.baseUnitofMeasure}</td>
									<td>${list.sitView.valuatedGoodsReceiptBlockedStock}</td>
									<td>${list.sitView.crossSiteConfigurableArticleGen}</td>
									<td>${list.sitView.crossSiteConfigurableArticleStruct}</td>
									<td>${list.sitView.sourceErpPos}</td>
									<td>${list.sitView.aggrLevel}</td>
								</tr>
							</c:if>
						</table>


						<!-- ---------- SITE VIEW -------- -->

						<p>Site View</p>
						<table id="tab1table" border="0">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">

								<td rowspan="2">Store</td>
								<td rowspan="2" colspan="2">Storage Location</td>
								<td rowspan="2">SRT</td>
								<td rowspan="2" colspan="2">Source Of Supply</td>
								<td rowspan="2">Check Age Proof</td>
								<td rowspan="2">EFT Group Id</td>
								<td rowspan="2">Last Received Qty</td>
								<td colspan="2">Last Delete Qty</td>
								<td colspan="2">Last Order Qty</td>
								<td colspan="2">PO</td>
								<td colspan="2">PO Item</td>
							</tr>
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td>Last</td>
								<td>Next</td>
								<td>Last</td>
								<td>Next</td>
								<td>Last</td>
								<td>Next</td>
								<td>Last</td>
								<td>Next</td>
							</tr>


							<tr style="text-align: left; color: #009a3d;">
								<td>${list.siteView.siteNo}</td>
								<td>${list.siteView.storageLocation}</td>
								<td>${list.siteView.storageLocationDesc}</td>
								<td>${list.siteView.srt}</td>
								<td>${list.siteView.srcOfSupply}</td>
								<td>${list.siteView.srcOfSupplyDesc}</td>
								<td>${list.siteView.checkAgeProof}</td>
								<td>${list.siteView.eftGroupId}</td>
								<td>${list.siteView.lastRcvQty}</td>
								<td>${list.siteView.lastDelDate}</td>
								<td>${list.siteView.nextDelDate}</td>
								<td>${list.siteView.lastOrdQty}</td>
								<td>${list.siteView.nextOrdQty}</td>
								<td>${list.siteView.lastPo}</td>
								<td>${list.siteView.nextPo}</td>
								<td>${list.siteView.lastPoItem}</td>
								<td>${list.siteView.nextPoItem}</td>
							</tr>
						</table>




						<!--  -------- PURCHASE VIEW --------- -->

						<p>Purchase View</p>
						<table id="tab1table" border="0">
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td rowspan="2" width="10%"">Site</td>
								<td rowspan="2" colspan="2" width="10%"">Vendor</td>
								<td colspan="2" width="10%">Validity</td>
								<td rowspan="2" width="10%">Fixed Vendor</td>
							</tr>
							<tr
								style="background-color: #d4cbc0; font-weight: bold; font-size: 12px; text-align: left;">
								<td width="10%">From</td>
								<td width="10%">To</td>

							</tr>

							<tr style="text-align: left; color: #009a3d;">
								<td>${list.purchaseView.siteNo}</td>
								<td>${list.purchaseView.vendor}</td>
								<td>${list.purchaseView.vendorDesc}</td>
								<td>${list.purchaseView.validFrom}</td>
								<td>${list.purchaseView.validTo}</td>
								<td>${list.purchaseView.fixedVendor}</td>

							</tr>

						</table>

						</details>
						<br>
					</c:forEach> </details> <br>
		</div>


		<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
		<br /> <br />


		<!-- end .content -->
	</div>
	<div class="footer">
		<p style="color: #00582d; font-weight: bold; float: left;">Copyright
			Woolworths 2013</p>

		<p style="color: #f37821; float: right;">Privacy Policy | Terms of
			Use</p>

		<br /> <br /> <br /> <br /> <br /> <br />
		<!-- end .footer -->
	</div>




	<!-- end .container -->
	</div>
	</form:form>
	<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
	<script type="text/javascript">
		function toggle(obj) {
	alert('in togggle');

var ele = 'tabUI' + obj;


ele.style.display = (ele.style.display != 'none' ? 'none' : 'block' );


		}

	</script>

</body>
</html>
