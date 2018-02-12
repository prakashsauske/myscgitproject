<!doctype html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
<head>
<!-- articleDetails.jsp -->
<meta charset="utf-8" />
<title>Article Lookup</title>
<link rel="stylesheet" href="../../styles/jquery-ui.css?version=${properties.version}" />
<link rel="stylesheet" href="../../styles/loginPage1.css?version=${properties.version}" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/hoverIntent.js?version=${properties.version}"></script>
<script src="../../scripts/superfish.js?version=${properties.version}"></script>
<script src="../../scripts/customJquery1.js?version=${properties.version}"></script>
<!-- This script is used to position the footer based on the page height -->
<script>
	//localStorage.advSearchFlag="false";
	/*$(document).ready(function(){
	 var ht = $(window).height();
	 var contentHt = (parseFloat(ht)-160)*0.94;
	 var footerHt = (parseFloat(ht)-160)*0.06;
	
	 $('#mainArticleContent').css("height",Math.ceil(contentHt));
	 $('#footerDiv').css("height",Math.ceil(footerHt));
	 }); */
	 /*
	setTimeout(function() {
		$('#ordNum').text(($('#ordNum').text() / 10) * 10);
	}, 100);

	window.onresize = function() {
		if ($(document).height() != $(window).height())
			$('#footerDiv').css('position', 'relative');
		else
			$('#footerDiv').css('position', 'absolute');

	}*/
</script>
<script type="text/javascript">
/* Autocomplete Off */
 $(document).ready(function(){
	document.forms[0].autocomplete="off";
 });
</script>
</head>
<body>
	<div id="logo1">
		<img id="logoImg" src="../../images/logo1.png" alt="logo" />
		<div id="userIcon">
			<img id="userIcon1" src="../../images/dropDown_icon.png" alt="User" /><img
				id="highlight" src="../../images/darkuser.png" alt="User"
				style="display: none;" />
			<!-- <a href="#popupBasic" data-rel="popup"><img id="arrow" src="images/arrow.bmp" alt="User"/></a> -->
		</div>
		<!-- <div id="header_right">
			<input id="searchInput" type="text" size="40" maxlength="40"
				placeholder="Enter store or article number..." />
		</div> -->
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

	<!-- GN: 08-06-2013: Added My Store -->
	<input type="hidden" name="siteNo" id="siteNo"
		value="${model.param.siteNo}" />
	<input type="hidden" name="strno" id="strno"
		value="${model.param.siteNo}" />
	<!-- 
	<div id="myStore">Store: ${model.param.siteNo} &nbsp; Wentworthville</div>
	 -->
	<!-- GN: 08-06-2013: Added My Store -->
	<div id="myStore">Store: &nbsp; ${user.siteNo} &nbsp;
		${user.siteName}</div>
	<div id="nav-bar">
		<ul class="sf-menu" id="example">
			<li id="home" class="text-color"><a
				href="../login/goingHome.htm">Home</a></li>
			<li class="text-color"><a href="#">Orders</a>
				<ul id="roprtUl">
					<li class="reportBtmBrdr"><a href="../order/onPageLoad.htm"
						class="text-color">Enquiry</a></li>

					<li class="reportBtmBrdr"><a
						href="../produce/onPageLoadProduceLoadListSearch.htm"
						class="text-color">Produce Load List</a></li>
					<li class="reportBtmBrdr"><a
						href="../order/onPageLoadCreateManualOrder.htm" class="text-color">Create
							Manual Order</a></li>
				</ul></li>
			<li class="text-color"><a href="#" style="color: white;">Lookup</a>
				<ul id="roprtUl">
					<li class="reportBtmBrdr"><a href="onPageLoad.htm"
						class="text-color">Articles</a></li>
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
					<li class="reportBtmBrdr"><a href="stockAdjustFromHome.htm"
						class="text-color">Stock Adjustment</a></li>
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


	<div class="content" id="mainArticleContent1">
		<div
			<c:set var="prevPage" value="'../article/onPageLoadArticleScreen.htm'" />
			onclick="javascript:window.location.href=${prevPage}"
			style="margin-top: 0px; clear: both;">


			<a href="#">
				<table border="0">
					<tr>
						<td style="padding-left: 0px"><img src="../../images/arw.png"
							width="17" height="27" /></td>
						<td>Back to Lookup</td>
					</tr>
				</table>
			</a>
		</div>



		<div
			style="float: right; margin-right: 50px; cursor: pointer; margin-top: -25px;">
			<a
				href="../inventory/onPageLoadNearbyStoreSearch.htm?articleNo=${model.articleSearchResutls.articleNo}&articleName=${model.articleSearchResutls.description}">
				Nearby Store Search</a> <a href="#"><img
				src="../../images/editDetailIcon.png" alt="edit" /> Edit Details</a>
		</div>

		<div style="margin-top: -25px;">
			<h1
				style="color: #00501f; margin-top: 0px; font-size: 25px; display: inline;">Article
				Detail</h1>

			<div id="artTable">
				<table width="100%" class="artclTable articleBrderBtm">
					<tr class="articleBasicTR">
						<!-- Article Image -->
						<td
							style="text-align: left; vertical-align: top; padding-top: 5px; padding-right: 0px; width: 175px;"
							rowspan="4" colspan="2"><img src="../../images/bln_logo.png"
							width="171" height="167" /></td>

						<td class="articleBasicTDLabel">Article Number :</td>
						<td class="articleBasicTDValue" id="ordNum"
							style="font-size: 18px;">${model.articleSearchResutls.articleNo}</td>

						<td class="articleBasicTDLabel">Article Description :</td>
						<td colspan="3" class="articleBasicTDValue">${model.articleSearchResutls.description}</td>
					</tr>
					<tr class="articleBasicTR">
						<td class="articleBasicTDLabel">Scan Description :</td>
						<td class="articleBasicTDValue">${model.articleSearchResutls.scanDescription}</td>

						<td class="articleBasicTDLabel">Brand :</td>
						<td class="articleBasicTDValue">${model.articleSearchResutls.brandName}</td>

						<td class="articleBasicTDLabel">EAN :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.ean11}
							&nbsp;</td>
					</tr>
					<tr class="articleBasicTR">
						<td class="articleBasicTDLabel">Standard Sell Price :</td>
						<td class="articleBasicTDValue">$
							${articleSearchResutls.salesPrice}</td>

						<td class="articleBasicTDLabel">Promo Sell Price :</td>
						<td class="articleBasicTDValue">$
							${articleSearchResutls.promoSalesPrice}</td>

						<td colspan="2" class="articleBasicTDValue">
							${articleSearchResutls.promoFromDate} <c:if
								test="${not empty articleSearchResutls.promoToDate}"> to </c:if>
							${articleSearchResutls.promoToDate}
						</td>
					</tr>
					<tr class=articleBasicTR>
						<td class="articleBasicTDLabel">Source of Supply :</td>

						<td class="articleBasicTDValue" colspan="3"><c:choose>

								<c:when test="${articleSearchResutls.srcOfSupply=='1'}">${articleSearchResutls.vendorNo} | ${articleSearchResutls.vendorName}</c:when>
								<c:when test="${articleSearchResutls.srcOfSupply=='2'}">Warehouse</c:when>
								<c:otherwise>No Supplier Found</c:otherwise>
							</c:choose></td>


						<td class="articleBasicTDLabel">Proof of Age Required :</td>
						<c:set var="ageProof" value="No" />
						<c:if test="${not empty articleSearchResutls.checkAgeProof}">
							<c:set var="ageProof"
								value="${articleSearchResutls.checkAgeProof}" />
						</c:if>
						<td class="articleBasicTDValue">${ageProof}</td>
					</tr>

					<!-- 		
					<tr class=articleBasicTR>
						<td class="articleBasicTDLabel" onclick="javascript:window.location.href='../article/stockAdjustFromArticleDetail.htm'">Stock On Hand :</td>
						<td class="articleBasicTDValue" onclick="javascript:window.location.href='../article/stockAdjustFromArticleDetail.htm'">${articleSearchResutls.SOH}
							${articleSearchResutls.baseUom}</td>
			-->
					<c:set var="sohAdjust" value="" />
					<c:if test="${not empty articleSearchResutls.SOH}">
						<c:set var="sohAdjust"
							value="'../article/stockAdjustFromArticleDetail.htm'" />
						<c:set var="color" value="#F37821" />
					</c:if>
					<tr class=articleBasicTR>
						<td class="articleBasicTDLabel">Stock On Hand :</td>
						<td class="articleBasicTDValue"><a href="#"
							style="margin-left: 0px; color:${color};"
							onclick="javascript:window.location.href=${sohAdjust}">${articleSearchResutls.SOH}
								${articleSearchResutls.baseUom}</a></td>
						<td class="articleBasicTDLabel">Stock In Transit :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.SIT}
							${articleSearchResutls.baseUom}</td>

						<td class="articleBasicTDLabel">Stock On Order :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.SOO}
							${articleSearchResutls.baseUom}</td>

						<td class="articleBasicTDLabel">Days On Hand :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.DOH}</td>
					</tr>
					<tr class=articleBasicTR>
						<td class="articleBasicTDLabel">Unit Of Measure :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.baseUom}</td>

						<td class="articleBasicTDLabel">Order Multiple :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.OM}</td>

						<td class="articleBasicTDLabel">Alt Unit :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.altUom}</td>
						<td class="articleBasicTDLabel">Security Tag :</td>
						<c:set var="securityTag" value="No" />
						<!-- TODO: Get Security Tag from Site View / 10-Jun-2013: Vijay to update the service -->
						<td class="articleBasicTDValue">${securityTag}</td>
					</tr>
					<tr class=articleBasicTR>
						<td class="articleBasicTDLabel">Perpetual Flag :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.perpetualFlag}</td>

						<td class="articleBasicTDLabel">PI UOM :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.PIUOM}</td>

						<td class="articleBasicTDLabel">PI OM :</td>
						<td class="articleBasicTDValue">${articleSearchResutls.PIOM}</td>
						<td class="articleBasicTDLabel"></td>
						<td class="articleBasicTDValue"></td>
					</tr>

					<c:choose>
						<c:when
							test="${articleSearchResutls.recallFlag=='Y' || articleSearchResutls.forSaleFlag=='N'}">
							<tr class="articleBasicTR">
						</c:when>
						<c:otherwise>
							<tr class="articleBasicTRLast">
						</c:otherwise>
					</c:choose>
					<td class="articleBasicTDLabel">Range Flag :</td>
					<td class="articleBasicTDValue">${articleSearchResutls.rangedFlag}</td>

					<td class="articleBasicTDLabel">Delete Indicator :</td>
					<td class="articleBasicTDValue">${articleSearchResutls.deleteInd}</td>

					<td class="articleBasicTDLabel">Store Location:</td>
					<td class="articleBasicTDValue">${articleSearchResutls.storeLocation}</td>

					<td class="articleBasicTDLabel">Shelf Ready Tray:</td>
					<td class="articleBasicTDValue">${articleSearchResutls.srt}</td>
					</tr>
					<c:if
						test="${articleSearchResutls.recallFlag=='Y' || articleSearchResutls.forSaleFlag=='N'}">
						<tr class="articleBasicTRLast">
							<c:choose>
								<c:when test="${articleSearchResutls.recallFlag=='Y'}">
									<td class="articleBasicTDLabel">Product Recall</td>
								</c:when>
							</c:choose>

							<c:choose>
								<c:when test="${articleSearchResutls.forSaleFlag=='N'}">
									<td class="articleBasicTDLabel">Not for Sale</td>
								</c:when>
							</c:choose>
						</tr>
					</c:if>
				</table>
			</div>
		</div>
		<c:choose>
			<c:when test="${isSellPrice=='false'}">
				<div id="isSellPrice">
					<p style="margin-top: 33px;">
						<b>Article not available in your store</b>
					</p>
				</div>
			</c:when>
		</c:choose>
		<div class="divMargin">
			<img class="imgWidth" src="../../images/orderResultDivider.png" />
		</div>

		<h1 class="articleSearchH1">
			<table class="tableMargin">
				<tr>
					<td><img id="dnArrow2" src="../../images/dn_arw.png"
						width="32" height="29" /> <img id="upArrow2"
						src="../../images/up_arw.png" width="32" height="29"
						style="display: none" /></td>
					<td class="headingtable">Global Trade Item Number</td>
				</tr>
			</table>
		</h1>
		<div id="GlobalTrade" class="tabDiv" style="display: none;"></div>
		<div id="GlobalTradelink"></div>

		<c:choose>
			<c:when test="${isSellPrice=='true'}">
				<div class="divMargin">
					<img class="imgWidth" src="../../images/orderResultDivider.png" />
				</div>
				<h1 class="articleSearchH1 tableMargin">
					<table width="400" border="0">
						<tr>
							<td class="wdth ${properties.ViewAdditionalItemDetails}"><img
								id="dnArrow3" src="../../images/dn_arw.png" width="32"
								height="29" /> <img id="upArrow3" src="../../images/up_arw.png"
								width="32" height="29" style="display: none" /></td>
							<td class="headingtable">Additional Price Information</td>
						</tr>
					</table>

				</h1>

				<div id="storeTab" class="tabDiv"
					style="display: none; margin-top: 0px; margin-bottom: 0px;">
					<ul class="tabUl">
						<li class="tabLi"><a href="#tabs1"
							style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Price
								View</a></li>
						<li class="tabLi"><a href="#tabs2"
							style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Comparitive
								Price Unit</a></li>
					</ul>
					<div id="tabs1">
						<div id="comparitiveView" class="tabtableDiv">
							<div class="quantityDetails"
								style="margin-right: -10px; font-family: arial;">
								<table id="tab1table" border="0" class="GlobalTradeTable">
									<tr class="tableHeader1">
										<td style="width: 20%;">Sell GP</td>
										<td style="width: 20%;">Promotional GP</td>
										<td style="width: 20%;">Promotion Type</td>
										<td style="width: 20%;">Promotion Description</td>
										<td style="width: 20%;">Purchase Price</td>

									</tr>
									<tr class="tableTdHeight">
										<td class="tdmdstyl">${articleSearchResutls.sellEffectiveGP}</td>
										<td class="tdmdstyl">${articleSearchResutls.promoEffectiveGP}</td>
										<td class="tdmdstyl">${articleSearchResutls.promoType}
											${articleSearchResutls.promoTypeDesc}</td>
										<td class="tdmdstyl">${articleSearchResutls.promoId}
											${articleSearchResutls.promoDesc}</td>
										<td class="tdmdstyl">${articleSearchResutls.purChasePrice}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div id="tabs2">
						<div id="priceView" class="tabtableDiv">
							<div class="quantityDetails"
								style="margin-right: -10px; font-family: arial;">
								<table id="tab1table" border="0" class="GlobalTradeTable">
									<tr class="tableHeader1">
										<td style="width: 20%;">Comparitive Unit Price</td>
										<td style="width: 20%;">Comparitive Size</td>
										<td style="width: 20%;">Comparitive Size UOM</td>
									</tr>
									<tr class="tableTdHeight">
										<td class="tdmdstyl"></td>
										<td class="tdmdstyl"></td>
										<td class="tdmdstyl"></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div class="divMargin">
					<img class="imgWidth" src="../../images/orderResultDivider.png" />
				</div>

				<h1 class="tableMargin articleSearchH1">
					<table width="400" border="0">
						<tr>
							<td class="wdth"><img id="dnArrow13"
								src="../../images/dn_arw.png" width="32" height="29" /> <img
								id="upArrow13" src="../../images/up_arw.png" width="32"
								height="29" style="display: none" /></td>
							<td class="headingtable">Article Hierarchy</td>
						</tr>
					</table>

				</h1>
				<div id="articleHierarchy" class="tabDiv"
					style="display: none; margin-left: -20px; margin-top: 14px; margin-bottom: 10px;"></div>
				<div id="articleHierarchylink"></div>
				<!--  
				<div class="divMargin">
					<img class="imgWidth" src="../../images/orderResultDivider.png" />
				</div>
 
				<h1 class="tableMargin articleSearchH1">
					<table width="400" border="0">
						<tr>
							<td id="quantityImg" class="wdth"><img id="dnArrow4"
								src="../../images/dn_arw.png" width="32" height="29" /> <img
								id="upArrow4" src="../../images/up_arw.png" width="32"
								height="29" style="display: none" /></td>
							<td class="headingtable">Article Purchase View</td>
						</tr>
					</table>
				</h1>
				<div id="quantityDetails" style="display: none;" class="quantityDetails">
					<table class="GlobalTradeTable">
						<tr class="tableHeader1">
							<th>Store</th>
							<th>Vendor Number</th>
							<th>Vendor Name</th>

						</tr>
						<tr class="tableTdHeight">
							<td class="tdmdstyl">${articleSearchResutls.siteNo}</td>
							<td class="tdmdstyl">${articleSearchResutls.vendorNo}</td>
							<td class="tdmdstyl">${articleSearchResutls.vendorName}</td>
						</tr>
					</table>
				</div>
				<div id="quantityDetailslink"></div>
				-->
			</c:when>
		</c:choose>

		<!-- PackBreakDown: ${articleSearchResutls.packBrkFlag} -->
		<c:if test="${articleSearchResutls.packBrkFlag=='Y'}">

			<div class="divMargin">
				<img class="imgWidth" src="../../images/orderResultDivider.png" />
			</div>



			<h1 class="tableMargin articleSearchH1">
				<table width="400" border="0">

					<tr>
						<td class="wdth"><img id="dnArrow8"
							src="../../images/dn_arw.png" width="32" height="29" /> <img
							id="upArrow8" src="../../images/up_arw.png" width="32"
							height="29" style="display: none" /></td>
						<td class="headingtable">Pack Break Down</td>
					</tr>
				</table>
			</h1>

			<div id="packBreakDown"
				style="display: none; margin-top: 10px; margin-bottom: 10px;"></div>
			<div id="packBreakDownlink"></div>
		</c:if>
		<div class="divMargin">
			<img class="imgWidth" src="../../images/orderResultDivider.png" />
		</div>

		<c:choose>
			<c:when test="${isSellPrice=='true'}">
				<h1 class="tableMargin articleSearchH1">
					<table width="400" border="0">

						<tr>
							<td class="wdth"><img id="dnArrow5"
								src="../../images/dn_arw.png" width="32" height="29" /> <img
								id="upArrow5" src="../../images/up_arw.png" width="32"
								height="29" style="display: none" /></td>
							<td class="headingtable">Store View</td>
						</tr>
					</table>
				</h1>
				<div id="ArticleSite" class="tabDiv" style="display: none;"></div>
				<div id="ArticleSitelink"></div>

				<div class="divMargin">
					<img class="imgWidth" src="../../images/orderResultDivider.png" />
				</div>
			</c:when>
		</c:choose>


		<h1 class="tableMargin articleSearchH1">
			<table width="400" border="0">

				<tr>
					<td class="wdth"><img id="dnArrow15"
						src="../../images/dn_arw.png" width="32" height="29" /> <img
						id="upArrow15" src="../../images/up_arw.png" width="32"
						height="29" style="display: none" /></td>
					<td class="headingtable">Article Additional Information</td>
				</tr>
			</table>
		</h1>

		<div id="ArticleAdditional" class="tabDiv" style="display: none;"></div>
		<div id="ArticleAdditionallink"></div>


	</div>

	<div id="footerDiv">
		<div id="footer-text">
			Copyright Woolworths 2013<span id="terms"><a>Privacy
					policy</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="pipeLine">|</span><a>Terms
					of Use</a></span>
		</div>
	</div>

	<div id="indicator" style="display: none">
		<div id="loaderMsg">Loading</div>
		<img id="indicatorImg" src="../../images/indicator.gif" alt="logo" />
		<div id="loaderText">Please Wait ...</div>
	</div>
	<div id="overlay-indicator" style="display: none"></div>
</body>
</html>