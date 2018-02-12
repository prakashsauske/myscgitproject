<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html lang="en">
<head>
<!-- articleInventoryOdata.jsp -->
<META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
<meta charset="utf-8" />
<title>WOW Store Central</title>
<meta name="HandheldFriendly" content="True" />
<meta name="MobileOptimized" content="320" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta http-equiv="cleartype" content="on" />
<link rel="stylesheet" href="styles/jquery-ui.css?version=${properties.version}" />
<link rel="stylesheet" href="styles/loginPage1.css?version=${properties.version}" />
<script src="scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="scripts/hoverIntent.js?version=${properties.version}"></script>
<script src="scripts/superfish.js?version=${properties.version}"></script>
<script src="scripts/customJquery1.js?version=${properties.version}"></script>
<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
<style>
.marginInput {
	margin-left: 13px;
}

.tdWidth {
	width: 70px;
}

.tdHeight {
	height: 20px
}

#search_pro {
	height: 45px;
	width: 320px;
	background: -webkit-linear-gradient(top, #51B848, #119A49);
	background: -moz-linear-gradient(top, #51B848, #119A49);
	background: -ms-linear-gradient(top, #51B848, #119A49);
	background: -o-linear-gradient(top, #51B848, #119A49);
	border-radius: 8px;
	color: white;
	font-weight: bold;
	font-size: 18px;
}

#searchDIvStyle1 {
	position: absolute;
	left: 63%;
	margin-top: 40px;
}

.tdLabel {
	color: #009a3d;
	text-align: right;
}

.tdValue {
	color: #00501f;
}

#record {
	margin-top: 80px
}

#sampleDiv {
	padding-top: 80px;
}

#padBttm {
	margin-bottom: 80px;
}
</style>
</head>
<body onload="getDetails();">

	<form action="requestSearchInventory.htm" method="post">
		<div id="logo1">
			<img id="logoImg" src="images/logo1.png" alt="logo" />
			<div id="userIcon">
				<img id="userIcon1" src="images/dropDown_icon.png" alt="User" /><img
					id="highlight" src="images/darkuser.png" alt="User"
					style="display: none;" />
				<!-- <a href="#popupBasic" data-rel="popup"><img id="arrow" src="images/arrow.bmp" alt="User"/></a> -->
			</div>
			<!--<div id="header_right">
				<input id="searchInput" type="text" size="40" maxlength="40"
					placeholder="Enter store or product number..." />
			</div>  -->
			<div id="popupBasic">
				<div id="userProfile" style="display: none;">
					<ul>
						<li><a>User Profile</a></li>
						<li><a>Account Settings</a></li>
						<li><a href="loginPage.html">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="nav-bar">
			<ul class="sf-menu" id="example">
				<li id="home" class="text-color"><a href="goingHome.htm">Home</a>
				</li>
				<li class="text-color"><a href="#">Orders</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Enquiry</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Receive</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Produce
								Load List</a></li>
					</ul></li>
				<li class="text-color"><a href="#" style="color: white;">Lookup</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Articles</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Stores</a>
						</li>
					</ul></li>
				<li class="text-color" id="reportLi"><a href="#">Reports</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Order</a>
						</li>
						<li class="reportBtmBrdr"><a href="#">Sales</a></li>
						<li class="reportBtmBrdr"><a href="#">Audit</a></li>
						<li class="reportBtmBrdr"><a href="#">Stock Management</a></li>
						<li class="reportBtmBrdr"><a href="#">Stocktake</a></li>
						<li class="reportBtmBrdr"><a href="#">Financial</a></li>
					</ul></li>
				<li class="text-color"><a href="#">Stock Management</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Stock
								Adjustment</a></li>
					</ul></li>
				<li class="text-color"><a href="#">Pricing</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Promotions</a>
						</li>
					</ul></li>
				<li class="text-color"><a href="#">Ticketing</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Maintenance</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Promotions</a>
						</li>
					</ul></li>
			</ul>
		</div>



		<div id="nav-bar1">
			<ul class="sf-menu" id="example1">
				<li class="text-color"><a href="#" style="line-height: 16px"
					onclick="location.href='article.htm';">Product Search</a></li>
				<li class="current text-color" id="prodSrch"
					style="background: white;"><a href="#"
					style="color: #999999; line-height: 16px">Nearby Site Search</a></li>

			</ul>
		</div>

		<div class="content" id="padBttm">



			<h1 id="searchHeading" style="color: #00501f;">Nearby Site
				Search</h1>

			<table id="articleTable1">
				<tr>
					<td class="tdLabel">Article Number:<span id="astrik">*</span></td>
					<td class="tdValue"><label for="textfield"></label> <input
						class="inputStyles placeHolder" placeholder="Enter article number"
						type="text" name="articleNo" id="articleNo" /></td>

				</tr>
				<tr class="tdHeight">
				</tr>
				<tr>
					<td class="tdLabel">Site Number :</td>
					<td class="tdValue"><input required
						placeholder="Enter site number"
						class="inputStyles marginInput placeHolder" type="text"
						name="siteNo" id="siteNo" /></td>
					<td class="tdWidth"></td>
					<td class="tdLabel">Sales Org:</td>
					<td class="tdValue"><input
						class="inputStyles marginInput placeHolder" type="text"
						name="salesOrg" placeholder="Enter Sales Org" id="salesOrg" /></td>

				</tr>
				<tr class="tdHeight">
				</tr>
				<tr>
					<td class="tdLabel">Distance :</td>
					<td class="tdValue"><input placeholder="Enter distance"
						class="placeHolder inputStyles marginInput" type="number" required
						min="1" max="999" placeholder="5km - 100 km" name="distance"
						id="distance" /></td>
					<td class="tdWidth"></td>
					<td class="tdLabel">Max No of Stores:</td>
					<td class="tdValue"><input type="number" min="1" required
						max="99" placeholder="1 to 50"
						class="inputStyles marginInput placeHolder" name="maxStores"
						id="maxStores" /></td>
				</tr>





			</table>
			<div id="searchDIvStyle1">

				<input type="submit" value="Search Products" id="search_pro"
					onclick="onSearch()">
			</div>



			<br>
			<br>
			<br>
			<br>
			<c:set var="firstDetailOpen" value="open" />
			<c:forEach items="${displayInventoryList}" var="list"
				varStatus="list1">
				<details ${firstDetailOpen}>
					<c:set var="firstDetailOpen" value="" />
					<summary>
						<span style="white-space: nowrap;"> <b>${list.siteNo}&nbsp;-&nbsp;${list.siteName}</b>
						</span>
					</summary>

					<!--  ---------- SALES VIEW  ------- -->


					<p>Sell Price</p>

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
							<td width="216" style="white-space: normal;">Origin from ERP
								or POS or Combined</td>
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
							<td width="216" style="white-space: normal;">Origin from ERP
								or POS or Combined</td>
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
							<td width="216" style="white-space: normal;">Origin from ERP
								or POS or Combined</td>
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



				</details>
				<br>
			</c:forEach>

			<br>
		</div>

		<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
		<br /> <br />


		<!-- end .content -->
		</div>
		<div id="sampleDiv"></div>


		<div id="footerDiv">
			Copyright Woolworths 2013.<span id="terms"><a>Privacy
					policy</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="pipeLine">|</span><a>Terms
					of Use</a></span>
		</div>




		<!-- end .container -->
		</div>
	</form>


</body>
</html>
