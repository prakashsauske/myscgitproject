<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html lang="en">
<head>
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
<link rel="stylesheet" href="../styles/jquery-ui.css?version=${properties.version}" />
<link rel="stylesheet" href="../styles/loginPage1.css?version=${properties.version}" />
<script src="../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../scripts/hoverIntent.js?version=${properties.version}"></script>
<script src="../scripts/superfish.js?version=${properties.version}"></script>
<script src="../scripts/customJquery1.js?version=${properties.version}"></script>
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
	width: 228px;
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
	left: 50%;
	margin-top: 40px;
	width: 250px;
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
<script type="text/javascript">
// Detect if details tag is supported or not
$(document).ready(function(){
	document.forms[0].autocomplete="off";
	setTimeout(function() {
		$('#articleNo').attr('value',$('#articleNo').val()/1);
	}, 100);
	//localStorage.advSearchFlag="false";
setTimeout(function(){
	if(localStorage.setArticleFlag=="true"){
	$('.firstTrigger').trigger('click');
	localStorage.setArticleFlag="false";}	
},1000);
	

}); 
var isDetailsSupported = (function(doc) {
	  var el = doc.createElement('details'),
	      fake,
	      root,
	      diff;
	  if (!('open' in el)) {
	    return false;
	  }
	  root = doc.body || (function() {
	    var de = doc.documentElement;
	    fake = true;
	    return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
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
</script>
<script type="text/javascript">
	var i=0;	
	function doAjax(siteno,articleno,ival) {
		//var articleNo = $('#articleNo').val();
		//var siteNo = $('#siteNo').val();
		//alert(siteno);
		//alert(articleno);
		//alert(ival);
		$.ajax({
			type : "POST",
			url : "callServiceforEachSite.htm",
			data : "articleNo=" + articleno + "&siteNo=" + siteno,
			success : function(response) {
				// Display the SOH info
				document.getElementById(ival).innerHTML = response;
				// Delete the link to fetch SOH
				
				//alert(response);
				//alert(document.getElementById("divSohDetails").innerHTML);
				
				document.getElementById("divSohLink").innerHTML = "";
			},
		});
	}

	function populateSOH(siteno,articleno,ival) {
		//alert("inside soh");
		// Proceed only if article number is there and not already fetched
		    //alert(ival);
			//document.getElementById(ival).innerHTML = "Please wait, fetching sell price info...";
			var id = 'divSohDetails' + ival;
			$('div#divSohDetails').each(function() {
			   $(this).attr('id', id);
			   //idCount++;
			});
			if(ival==0)
				{
				i++;
				//alert(i);
				}
			//alert(id);
			else if (document.getElementById(id).innerHTML == "")
			{
			 	
		    document.getElementById(id).innerHTML = "Please wait, fetching sell price info...";
			doAjax(siteno,articleno,id);
			}
	}


	 var i=0;
	function populateId(siteno) {
           
			var id = '#storeTab' + siteno;
			var down='#dnArrow'+siteno;
			var up='#upArrow'+siteno;
		   
			if(i==0)
			{
			i++;
			$(id).tabs();
			$(id).show();
			$(up).show();
			$(down).hide();
			}
		else
		{

			$(id).tabs();
					$(id).show();
					$(down).hide();
					$(up).show();
		}
		
	}
	function show(siteno) {

		  
			//document.getElementById(ival).innerHTML = "Please wait, fetching sell price info...";
			var id = '#storeTab' + siteno;
			var down='#dnArrow'+siteno;
			var up='#upArrow'+siteno;

			  
					$(id).hide();
					$(down).show();
					$(up).hide();
		
			
		   
			
	}
	function onSearch() {
	localStorage.setArticleFlag="true";	
	}
</script>
</head>
<body>

	<form action="requestNearbySiteSearch.htm" method="post">
		<div id="logo1">
			<img id="logoImg" src="${user.imgLocation}" alt="logo"
				style="height: 60px; width: auto;" />
			<div id="userIcon">
				<img id="userIcon1" src="../images/dropDown_icon.png" alt="User" /><img
					id="highlight" src="../images/darkuser.png" alt="User"
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
						<li><a href="../login/logout.htm">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="nav-bar">
			<ul class="sf-menu" id="example">
				<li id="home" class="text-color"><a
					href="../login/goingHome.htm">Home</a></li>
				<li class="text-color"><a href="#">Orders</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="#" class="text-color">Enquiry</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Receive</a>
						</li>
						<li class="reportBtmBrdr"><a href="#" class="text-color">Produce
								Load List</a></li>
						<li class="reportBtmBrdr"><a
							href="../ibtOrder/onPageLoad.htm" class="text-color">Inter
								Branch Transfer</a></li>
					</ul></li>
				<li class="text-color"><a href="#" style="color: white;">Lookup</a>
					<ul id="roprtUl">
						<li class="reportBtmBrdr"><a href="../article/onPageLoad.htm"
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
						<li class="reportBtmBrdr"><a
							href="../sohAdjustLog/onPageLoad.htm" class="text-color">Stock
								Adjustment Log </a></li>
						<li class="reportBtmBrdr"><a href="../report/onPageLoad.htm">DGMS</a></li>
						<li class="reportBtmBrdr"><a
							href="../edgms/onPageLoadEDGMS.htm">eDGMS</a></li>
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


		<!-- <div id="nav-bar1" >
			<ul class="sf-menu" id="example1">
			<li class="text-color" ><a href="#" onclick="location.href='article.htm';">Product Search</a></li>
				<li class="current text-color" id="prodSrch" style="background:white;"><a href="#" style="color:#00501f">Nearby Site Search</a></li>
				
			</ul>
		</div> ----
	-->

		<div class="content" id="padBttm">
			<div>
				<a href="javascript:history.back()">
					<table border="0">
						<tr>
							<td style="padding-left: 0px"><img src="../images/arw.png"
								width="17" height="27" /></td>
							<td>Back to Lookup</td>
						</tr>
					</table>
				</a>

			</div>



			<h1 id="searchHeading" style="margin-top: -30px;">Nearby Site
				Search</h1>

			<table id="articleTable1">
				<tr>
					<td class="tdLabel">Article Number:</td>
					<td class="tdValue"><input
						class="inputStyles marginInput placeHolder" required type="text"
						value="${model.param.articleNo}" name="articleNo" id="articleNo" /></td>

				</tr>
				<tr class="tdHeight">
				</tr>
				<tr>
					<td class="tdLabel">Site Number :</td>
					<td class="tdValue"><input
						class="inputStyles placeHolder marginInput" type="text"
						name="siteNo" id="siteNo" required value="${model.param.siteNo}" /></td>
					<td class="tdWidth"></td>
					<td class="tdLabel">Sales Org:</td>
					<td class="tdValue"><input
						class="inputStyles placeHolder marginInput" type="text"
						name="salesOrg" id="salesOrg" value="${model.param.salesOrg}"
						style="margin-left: 0px;" /></td>

				</tr>
				<tr class="tdHeight">
				</tr>
				<tr>
					<td class="tdLabel">Distance :</td>
					<td class="tdValue"><input
						class="inputStyles placeHolder marginInput" type="number" required
						min="1" max="999" placeholder="5km - 100 km" name="distance"
						id="distance" value="${model.param.distance}" /></td>
					<td class="tdWidth"></td>
					<td class="tdLabel">Max No of Stores :</td>
					<td class="tdValue"><input class="inputStyles placeHolder"
						type="number" min="1" required max="99" placeholder="1 to 50"
						name="maxStores" id="maxStores" value="${model.param.maxStores}" /></td>
				</tr>





			</table>

			<div id="searchDIvStyle1">

				<input type="submit" value="Search Products" id="search_pro"
					onclick="onSearch()">
			</div>




			<div style="margin-top: 100px;">
				<%int i=0;%>
				<%int j=0;%>
				<%int k=0;%>
				<c:forEach items="${model.displayInventoryList}" var="list"
					varStatus="list1">
					<c:set var="iVal" value="${list.siteNo}" />
					<c:set var="iVal1" value="<%=i++%>" />


					<div class="divMargin">
						<img class="imgWidth" src="../images/orderResultDivider.png" />
					</div>

					<h1>
						<table class="tableMargin">
							<tr>
								<td>
									<%
				if(k==0)
				{
					
				%> <img id="dnArrow<c:out value="${iVal}"/>"
									class="cursorpoint firstTrigger" src="../images/dn_arw.png"
									width="32" height="29"
									onclick="javascript:populateId(${list.siteNo});populateSOH(${list.siteNo},${articleNo},${iVal1});" />

									<c:set var="kVal" value="<%=k++%>" /> <%
				
                }
				else
				{
				
				%> <img id="dnArrow<c:out value="${iVal}"/>" class="cursorpoint"
									src="../images/dn_arw.png" width="32" height="29"
									onclick="javascript:populateId(${list.siteNo});populateSOH(${list.siteNo},${articleNo},${iVal1});" />
									<%
				
                }
				
				%> <img id="upArrow<c:out value="${iVal}"/>" class="cursorpoint"
									src="../images/up_arw.png" width="32" height="29"
									style="display: none"
									onclick="javascript:show(${list.siteNo});" />
								</td>
								<td class="headingtable">${list.siteNo}&nbsp;|&nbsp;${list.siteName}&nbsp;|&nbsp;Proximity:&nbsp;${list.distance}
									km</td>
							</tr>
						</table>
					</h1>

					<div id="storeTab<c:out value="${iVal}"/>" class="tabDiv"
						style="display: none;">
						<ul class="tabUl">
							<li class="tabLi"><a href="#tabs-1">Article Sell Price</a></li>
							<li class="tabLi"><a href="#tabs-2">Stock on Hand</a></li>
							<li class="tabLi"><a href="#tabs-3">Stock In Transit</a></li>
							<li class="tabLi"><a href="#tabs-4">Stock On Order</a></li>
						</ul>


						<div id="tabs-1">

							<%
				if(j==0)
				{
					
				%>
							<c:set var="iVal" value="<%=j++%>" />

							<div id="infoDiv1" class="tabtableDiv">
								<table id="tab1table" border="0">
									<tr class="trBtm">
										<th id="tableHeading1">Sales Price:</th>
										<td style="text-align: left; color: #00501f;">$
											${list.salePriceView.salesPrice}</td>
										<td></td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Sell Effective GP:</th>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.sellEffectiveGP}%</td>
										<td></td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Promotion:</th>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoId}</td>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoDesc}</td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Promotion Type:</th>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoType}</td>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoTypeDesc}</td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Promo Sales Price:</th>
										<td style="text-align: left; color: #00501f;">$
											${list.salePriceView.promoSalesPrice}</td>
										<td></td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Promo Effective GP:</th>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoEffectiveGP}%</td>
										<td></td>
									</tr>
									<tr class="trBtm">
										<th id="tableHeading1">Promotion Validity:</th>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoFromDate}
											<c:if
												test="${list.salePriceView.promoFromDate && articleSellPriceViewList.promoToDate}"> to </c:if>
										</td>
										<td style="text-align: left; color: #00501f;">${list.salePriceView.promoToDate}</td>
									</tr>
								</table>

							</div>
							<%
				
                }
				
				%>

							<div id="divSohDetails<c:out value="${iVal1}"/>"
								class="tabtableDiv"></div>
						</div>

						<div id="tabs-2">
							<div id="infoDiv1" class="tabtableDiv">

								<table id="tab1table" border="0">
									<tr
										style="background-color: #d4cbc0; font-weight: bold; font-size: 16px; text-align: left;">

										<td width="216" style="white-space: normal;">Stock On
											Hand</td>
										<td width="216" style="white-space: normal;">Stock in
											Quality Inspection</td>
										<td width="216" style="white-space: normal;">Total Stock
											of All Restricted Batches</td>
										<td width="216" style="white-space: normal;">Stock in
											transfer</td>
										<td width="216" style="white-space: normal;">Blocked
											Stock</td>
										<td width="216" style="white-space: normal;">Blocked
											Stock Returns</td>


									</tr>


									<tr style="text-align: left; color: #009a3d;" class="trBtm">

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


									</tr>

								</table>

							</div>
						</div>

						<div id="tabs-3">
							<div id="infoDiv1" class="tabtableDiv">

								<table id="tab1table" border="0">
									<tr
										style="background-color: #d4cbc0; font-weight: bold; font-size: 16px; text-align: left;">
										<td width="216" style="white-space: normal;">Stock in
											Transfer (Site to Site)</td>
										<td width="216" style="white-space: normal;">Stock in
											Transit</td>
										<td width="216" style="white-space: normal;">Tied Empties
											Stock</td>
										<td width="216" style="white-space: normal;">Valuated
											Goods Receipt Blocked Stock</td>


									</tr>


									<tr style="text-align: left; color: #009a3d;" class="trBtm">
										<td>${list.sitView.stockinTransfer}
											${list.sitView.baseUnitofMeasure}</td>
										<td>${list.sitView.stockinTransit}
											${list.sitView.baseUnitofMeasure}</td>
										<td>${list.sitView.tiedEmptiesStock}
											${list.sitView.baseUnitofMeasure}</td>
										<td>${list.sitView.valuatedGoodsReceiptBlockedStock}</td>


									</tr>

								</table>
							</div>
						</div>

						<div id="tabs-4">
							<div id="infoDiv1" class="tabtableDiv">
								<table id="tab1table" border="0">
									<tr
										style="background-color: #d4cbc0; font-weight: bold; font-size: 16px; text-align: left;">

										<td width="216" style="white-space: normal;">Stock On
											Order</td>
										<td width="216" style="white-space: normal;">On-Order
											Stock Quantity for Consignment</td>
										<td width="216" style="white-space: normal;">GR Blocked
											Stock</td>
										<td width="216" style="white-space: normal;">Release
											Quantity from Stock Transport Orders</td>
										<td width="216" style="white-space: normal;">Transit
											Stock for Cross-Company Code Stock Transfer</td>


									</tr>


									<tr style="text-align: left; color: #009a3d;" class="trBtm">

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


									</tr>
								</table>

							</div>
						</div>

					</div>

				</c:forEach>


			</div>










			<!-- end .container -->
		</div>
	</form>
	<div id="footerDiv">
		Copyright Woolworths 2013<span id="terms"><a>Privacy policy</a><span
			id="pipeLine" class="margin-left20">|</span><a class="margin-left20">Terms
				of Use</a></span>
	</div>

</body>
</html>
