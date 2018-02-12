<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/articleDtls.js?version=${properties.version}"></script>


<title>Article Details</title>
</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">

			<input id="navBarHighlight" type="hidden" value="lookUp" />

			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li><a href="../article/onPageLoadArticleScreen.htm">Lookup
								Articles</a></li>
						<li class="currentPage">Article Details</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn">Back</label>
				</div>

				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form id="articleDetail" method="GET" action="../preq/orderCreate.htm">
			<input type="hidden" value="${model.articleSearchResutls.articleNo}"
				id="article-articleNo" name="article-articleNo" /> <input
				type="hidden" value="${model.articleSearchResutls.vendorNo}"
				id="article-suppNo" name="article-suppNo" /> <input type="hidden"
				value="${model.articleSearchResutls.vendorName}"
				id="article-suppName" name="article-suppName" /> <input
				type="hidden" value="${model.articleSearchResutls.srcOfSupply}"
				id="article-srcsupply" name="article-srcsupply" /> <input
				type="hidden" value="${model.articleSearchResutls.packBrkFlag}"
				id="article-packBrkFlag" name="article-packBrkFlag" /> <input
				type="hidden" value="${articleSearchResutls.compPriceUnit}"
				id="article-cup" name="article-cup" /> <input type="hidden"
				value="${articleSearchResutls.sellPricegrp}" id="article-sellGrp"
				name="article-sellGrp" /> <input type="hidden"
				value="${articleSearchResutls.sellPricegrpDesc}"
				id="article-sellGrpDesc" name="article-sellGrpDesc" /> <input
				type="hidden" value="${articleSearchResutls.cupUnit}"
				id="article-compPriceUnit" name="article-compPriceUnit" /> <input
				type="hidden" value="${articleSearchResutls.gst}" id="article-gst"
				name="article-gst" /> <input type="hidden"
				value="${articleSearchResutls.linked_art_flag}" id="linked_art_flag"
				name="linked_art_flag" /> <input type="hidden"
				value="${articleSearchResutls.promoTypeDesc}" id="promoTypeDesc"
				name="promoTypeDesc" /> <input type="hidden"
				value="${articleSearchResutls.future_plan_reason}" id="future-plan"
				name="future-plan" /> <input type="hidden"
				value="${articleSearchResutls.reason_valid_from}" id="valid-from"
				name="valid-from" /> <input type="hidden"
				value="${articleSearchResutls.reason_valid_to}" id="valid-to"
				name="valid-to" />


			<div class="contentWrapper">
				<div class="articleHead">
					<div class="articleHeaderWrapper">

						<input type="hidden" name="siteNo" id="siteNo"
							value="${user.siteNo}" /> <input type="hidden" name="articleNo"
							id="articleNo" value="${model.articleSearchResutls.articleNo}" />

						<input type="hidden" name="articleName" id="articleName"
							value="${model.articleSearchResutls.description}" />


						<h2 class="articleTitle">${model.articleSearchResutls.articleNo}
							- ${model.articleSearchResutls.description}</h2>
						<p>
							<label class="articlePriceLabel">Standard Sell Price: <strong>$
									${articleSearchResutls.salesPrice}</strong></label>

							<!-- Parse promo price to number -->
							<fmt:parseNumber var="promoPrice" type="number"
								value="${articleSearchResutls.promoSalesPrice}" />
							<c:if test="${promoPrice != 0}">
								<label class="articlePriceLabel">|</label>
								<label class="articlePriceLabel">Promo Sell Price: <strong>$
										${articleSearchResutls.promoSalesPrice}</strong></label>
								<label class="articleDate">(${articleSearchResutls.promoFromDate}
									- ${articleSearchResutls.promoToDate})</label>
							</c:if>
						</p>
					</div>
					<div class="articleActionBtns">
						<c:if test="${model.articleSearchResutls.rangedFlag=='Y'}">
							<label class="positiveStatus">Ranged</label>
						</c:if>

						<c:if test="${model.articleSearchResutls.rangedFlag!='Y'}">
							<label class="negativeStatus">Not-Ranged</label>
						</c:if>

						<c:if test="${model.articleSearchResutls.forSaleFlag=='N'}">
							<label class="highlightStatus">Not for Sale</label>
						</c:if>
						<c:if test="${model.articleSearchResutls.recallFlag=='Y'}">
							<label class="highlightStatus">Product Recall</label>
						</c:if>
						<c:if test="${articleSearchResutls.deleteInd=='Y'}">
							<label class="highlightStatus">Deleted</label>
						</c:if>

						<label class="actionBtn"><label class="nearbyBtn">Nearby
								Store</label></label> <label class="actionBtn hideBlock"><label
							class="editBtn">Edit</label></label>
					<!-- 	<c:if test="${model.articleSearchResutls.rangedFlag=='Y'}">
							 
					<label class="actionBtn"><label class="createBtn" id="createOrderBtn">Create Order</label></label>
					-->
							<!-- <span id="dropdown" class="selectDropdown"> <label
								class="actionBtn" id="dropdownSelect"><label
									class="createBtn">Create</label></label>

								<ul class="dropdown">
									<%-- Commenting LCOR functioncode properties for 
									<li><label
										class="dropdownLabel ${properties.LCreateOrderOnReceipt}"
										id="createOrderOnRecipt">Order on Receipt</label></li> --%>
									<li><label
									class="dropdownLabel"
										id="createOrderBtn">Vendor Order</label>
										<!-- class="dropdownLabel ${properties.LCreateVendorOrder}" applicationSettings CR-->
									<!-- 	</li>
								</ul>
							</span> 

						</c:if>--> 
					</div>
				</div>

				<div class="articleContent">
					<div class="articleContentInner">

						<div class="articleDetails" id="articleTable0">




							<div class="articleInfoTop">
								<label class="articleName">${model.articleSearchResutls.scanDescription}</label>
							</div>
							<div class="articleImg">
								<img width="213px" src="../../images/product1.jpg">
							</div>

							<div class="articleInfoBottom">
								<label class="articleLocation"></label>

							</div>


						</div>
						<!-- End of article details -->

					</div>
					<!-- End of article content inner -->

					<div class="articleContentInner">

						<div class="articleDetails" id="articleTable1">


							<c:set var="sohAdjust" value="" />
							<c:set var="color" value="#00501f" />

							<%-- <c:if test="${not empty articleSearchResutls.SOH}"></c:if> --%>
							<c:choose>
								<c:when
									test="${articleSearchResutls.rangedFlag=='Y' && not empty articleSearchResutls.SOH}">

									<c:set var="sohAdjust"
										value="'../article/stockAdjustFromArticleDetail.htm'" />
									<c:set var="color" value="#F37821" />
									<c:set var="hand" value="link" />
								</c:when>
							</c:choose>

							<c:choose>
								<c:when
									test="${articleSearchResutls.rangedFlag=='N' && articleSearchResutls.isSohGreaterThanZero=='true'}">

									<c:set var="sohAdjust"
										value="'../article/stockAdjustFromArticleDetail.htm'" />
									<c:set var="color" value="#F37821" />
									<c:set var="hand" value="link" />
								</c:when>
							</c:choose>

							<table cellspacing="0" class="ContentTable">
								<th colspan='2'>Stock <c:if
										test="${model.articleSearchResutls.rangedFlag=='Y'}">
										<label class="history"
											onclick="showHistoryPopUp('${model.articleSearchResutls.articleNo}','${model.articleSearchResutls.description}','${model.articleSearchResutls.OM}')"
											id="salesHistory">Sales History</label>
									</c:if>

								</th>
								<tr>
									<td class="keyInfo">On Hand:</td>
									<!-- applicationSettings CR -->
									<td class="valueInfo ${properties.StockAdjustmentLocal}">
		                               <a href="#" id="sohField" class="trimDecimalForSoh" style="cursor: default; color: rgb(34, 34, 34);">${articleSearchResutls.SOH}</a></td>
<!-- defect 14659  fixed -->

								</tr>
								<tr>
									<td class="keyInfo">In Transit:</td>
									<td class="valueInfo" id="sitField">${articleSearchResutls.SIT}</td>
								</tr>
								<tr>
									<td class="keyInfo">On Order:</td>
									<td class="valueInfo"><label class="linkBtn"> <label
											id="sooField"
											class="newWindowAfter ${properties.ShowOnOrder}">${articleSearchResutls.SOO}
										</label>
									</label></td>
								</tr>
								<tr>
									<td class="keyInfo">Min. Pres. Level:</td>
									<td class="valueInfo">${articleSearchResutls.current_mpl}</td>
								</tr>
								<tr>
									<td class="keyInfo">Shelf Capacity:</td>
									<td class="valueInfo">${articleSearchResutls.cur_shelf_capacity}

									</td>
								</tr>
							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->


					<div class="articleContentInner">

						<div class="articleDetails" id="articleTable2">

							<table cellspacing="0" class="ContentTable">
								<tr>
									<th colspan='2'>Supply Info</th>
								</tr>
								<tr>
									<td class="keyInfo">OM:</td>
									<td class="valueInfo">${articleSearchResutls.OM}</td>
								</tr>
								<tr>
									<td class="keyInfo">Source:</td>
									<td class="valueInfo"><c:choose>
											<c:when test="${articleSearchResutls.srcOfSupply=='1'}">Vendor </c:when>
											<c:when test="${articleSearchResutls.srcOfSupply=='2'}">Warehouse</c:when>
											<c:otherwise>No Supplier Found</c:otherwise>
										</c:choose></td>
								</tr>
								<tr>
									<td class="keyInfo">Supply No:</td>
									<td class="valueInfo"><c:choose>
											<c:when test="${articleSearchResutls.srcOfSupply=='1'}">${articleSearchResutls.vendorNo} </c:when>
											<c:when test="${articleSearchResutls.srcOfSupply=='2'}">${articleSearchResutls.vendorNo} </c:when>
											<c:otherwise>No Supplier Found</c:otherwise>
										</c:choose></td>
								</tr>
								<tr>
									<td class="keyInfo">Supply Name:</td>
									<td class="valueInfo"><c:choose>
											<c:when test="${articleSearchResutls.srcOfSupply=='1'}">${articleSearchResutls.vendorName} </c:when>
											<c:when test="${articleSearchResutls.srcOfSupply=='2'}">${articleSearchResutls.vendorName} </c:when>
											<c:otherwise>No Supplier Found</c:otherwise>
										</c:choose></td>
								</tr>

								<tr>
									<td class="keyInfo" colspan="2"><c:if
											test="${articleSearchResutls.perpetualFlag=='Y'}">
											<label class="positiveFlag">Perpetual</label>
										</c:if> <c:if test="${articleSearchResutls.perpetualFlag!='Y'}">
											<label class="negativeFlag">Perpetual</label>
										</c:if> <c:if test="${articleSearchResutls.autostockr=='Y'}">
											<label class="positiveFlag">AutoStockR</label>
										</c:if> <c:if test="${articleSearchResutls.autostockr!='Y'}">
											<label class="negativeFlag">AutoStockR</label>
										</c:if></td>
								</tr>

							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->


					<div class="articleContentInner articleContentInnerLast">

						<div class="articleDetails" id="articleTable3">

							<table cellspacing="0" class="ContentTable">
								<tr>
									<th colspan='2'><label class="articleDetailHeading">Unit
											Info</label></th>
								</tr>
								<tr>
									<td class="keyInfo">EAN:</td>
									<td class="valueInfo">${articleSearchResutls.ean11}</td>
								</tr>
								<tr>
									<td class="keyInfo">UOM:</td>
									<td id="articleBaseUom" class="valueInfo">${articleSearchResutls.baseUom}</td>
								</tr>
								<tr>
									<td class="keyInfo">PLU:</td>
									<td class="valueInfo">${articleSearchResutls.plu}</td>
								</tr>
								<tr>
									<td class="keyInfo">Brand:</td>
									<td class="valueInfo">${articleSearchResutls.brandName}</td>
								</tr>
								<tr>
									<td class="keyInfo" colspan="2"><c:choose>
											<c:when test="${model.articleSearchResutls.packBrkFlag=='Y'}">
												<label class="positiveFlag">Pack Breakdown</label>
											</c:when>
											<c:when
												test="${model.articleSearchResutls.linked_art_flag=='Y'}">
												<label class="positiveFlag">Linked Article</label>
											</c:when>
											<c:otherwise>
												<!--   <label class="negativeFlag">Pack Breakdown</label> -->
											</c:otherwise>
										</c:choose></td>
								</tr>
							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->

				</div>
				<!-- End of article content -->


				<div class="articleAdditionalInfo">

					<!-- Accordion code picked up from this -->

					<div id="accordion-1" class="accordionWrapper">

						<h3 id="ArtHier">
							Article Hierarchy <span class="summaryInfo"></span>
						</h3>
						<div>

							<div class="ContentTableWrapper articleDiv">
								<table class="ContentTable" cellspacing="0">
									<thead>
										<tr>
											<th width="25%">Department</th>
											<th width="25%">Category</th>
											<th width="25%">Sub-category</th>
											<th width="25%" class="lastColumn">Segment</th>
										</tr>
									</thead>
									<tbody></tbody>

								</table>
							</div>
							<!-- End of content table wrapper -->
						</div>
					</div>

					<div id="accordion-2" class="accordionWrapper">

						<h3 id="Rep">
							Replenishment <span class="summaryInfo"></span>
						</h3>
						<div>
							<div class="ContentTableWrapper replenishmentDiv">
								<table class="ContentTable" cellspacing="0" id="repTable1">
									<tbody></tbody>
								</table>
								<div class="tableInfo ">
									<!--<div class="tableTitle">
									<h4 class="sectionTitle">&nbsp; Unit of Measure:
		
											<input type="radio" name="searchByOptions" value="EA" id="EA" checked=""><label for="EA" class="labelText">EA</label>
											<input type="radio" name="searchByOptions" value="MPK" id="MPK"><label for="MPK" class="labelText">MPK</label> 
											<input type="radio" name="searchByOptions" value="CAR" id="CAR"><label for="CAR" class="labelText">CAR</label> 

									</h4>	
								</div>  -->
								</div>
								<c:if test="${model.articleSearchResutls.packBrkFlag!='Y'}">
									<table class="ContentTable " cellspacing="0">

										<tr>
											<td width="20%">Default MPL:</td>
											<td width="13%" class="valueInfo" id="defaultMpl">${model.articleSearchResutls.default_mpl}</td>
											<td width="20%">Default Shelf Capacity:</td>
											<td width="13%" class="valueInfo" id="defaultShelf">${model.articleSearchResutls.default_shelf_capacity}</td>
											<td width="33%" class="lastColumn">&nbsp;</td>
										</tr>
										<tr class="lastRow">
											<td width="20%">Current MPL:</td>
											<td width="13%" class="valueInfo">
												<!-- <a title="Adjust MPL" class="navigate" href="#"> -->${model.articleSearchResutls.current_mpl}<!-- </a> -->
											</td>
											<td width="20%">Current Shelf Capacity:</td>
											<td width="13%" class="valueInfo">
												<!-- <a title="Adjust SC" class="navigate" href="#"> -->${model.articleSearchResutls.cur_shelf_capacity}<!-- </a> -->
											</td>
											<td width="33%" class="lastColumn">&nbsp;</td>
										</tr>

									</table>
								</c:if>
							</div>
							<!-- End of content table wrapper -->
						</div>
					</div>

					<div id="accordion-2" class="accordionWrapper">

						<h3 id="PriInfo">
							Price / Unit Information
							<%-- <span class="summaryInfo">Std.
							Gross Profit: <strong>${articleSearchResutls.gp_percent}<c:if test="${not empty articleSearchResutls.gp_percent}"> %</c:if></strong>
						</span> --%>
						</h3>
						<div id="PriceDetailsDiv"></div>
					</div>

					<div id="accordion-2" class="accordionWrapper">

						<h3 id="AddiItem" class="${properties.ViewAdditionalItemDetails}">
							Additional Item Information <span class="summaryInfo">Country
								of Origin: <strong>${articleSearchResutls.countryOfOrigin}</strong>
							</span>
						</h3>
						<div id="AddiItemDiv"></div>
					</div>
					<!-- End of ui-accordion -->
				</div>
				<!-- End of article additional details -->

			</div>
			<input type="hidden" id="baseUom"
				value="${articleSearchResutls.baseUom}" />
		</form>
		<!-- End of content wrapper -->



		<!-- End of Footer -->

	</div>
	<!-- End of main -->
	<%@include file="footer.jsp"%>
	<!-- History Popup-->
	<div id="dialog-modal" title="Sales History">
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
	<%@include file="openOrderPopUp.jsp"%>

	<script type="text/javascript">

$(document).ready(function(){ 

	if($('#baseUom').val()!='KG'){

		$('#sohField').addClass("trimDecimalForSoh");
		$('#sitField').addClass("trimDecimalForSoh");
		$('#sooField').addClass("trimDecimalForSoh");
		
		} 

		$('.trimDecimalForSoh').filter(function(){
			var value=$(this).text();
			$(this).text(value.split(".")[0]);
			});
	
	var articleTable0Height = $('#articleTable0').height();
	var articleTable1Height = $('#articleTable1').height();
	var articleTable2Height = $('#articleTable2').height();
	var articleTable3Height = $('#articleTable3').height();
	
	var tableHeight = Math.max(articleTable0Height, articleTable1Height, articleTable2Height, articleTable3Height);
	
	document.getElementById("articleTable0").style.height= tableHeight+"px";
	document.getElementById("articleTable1").style.height= tableHeight+"px";
	document.getElementById("articleTable2").style.height= tableHeight+"px";
	document.getElementById("articleTable3").style.height= tableHeight+"px";
});

$(document).ready(function(){

	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
}); 
$(function() {
	$('#createOrderBtn').click(function(e){
	$('#articleDetail').submit();	
	});

	$('#createOrderOnRecipt').click(function(e){
		
		$('#articleDetail').attr('action','../poReceipt/orderCreate.htm');	
		$('#articleDetail').submit();	
		});

	

	
	$(".accordionWrapper").accordion({
		header:"h3",
		collapsible: true, 
		active: false,
		heightStyle: "content" 
	});
	
	$("#PriceDetails").tabs();
	 


	 $(".nearbyBtn").click(function(e) {
		 $('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
		 var articleNo= $("#articleNo").val();
		 var articleName=$("#articleName").val();
		 var articleBaseUom=$("#articleBaseUom").text();

		 window.location.href="../inventory/onPageLoadNearbyStoreSearch.htm?articleNo="+articleNo+"&articleName="+articleName+"&articleBaseUom="+articleBaseUom;
     }); 
	 
	 $(".secondaryActionBtn").click(function(e) {
			// window.history.back();
			 window.location.href="../article/onPageLoadArticleScreen.htm";
		  });  
	 
});

$( "#dialog-modal" ).dialog({				
	autoOpen: false,
	modal: true,
	resizable: false,
	minHeight: 200,
	maxHeight: 600,
	width: 800
});

$("#dialog-modal").parent().addClass("popupWrapper");	

$("#salesHistory").click(function() {
					
	//$("#dialog-modal" ).dialog("open");
});
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
			$("#dialog-modal" ).dialog("open");
			
			$('#statusImg').addClass('loading hideBlock');
			$('#statusImg').removeClass('loading');	
		},
		error: function(response){
			$('#salesHistoryPopupData').html('');
			$("#dialog-SalesHistoryPop").parent().addClass("popupWrapper");	
			
			$('#salesHistoryPopupData').html(response);

			$("#historyArticleInfo").html("Showing sales history for Article"+articleNo+"-"+articleName);
			$("#omVal").html(om);
			$("#dialog-modal" ).dialog("open");
			
			$('#statusImg').addClass('loading hideBlock');
			$('#statusImg').removeClass('loading');	},
	});		
	
}
$("#historyClose").click(function() {
	//$("#dialog-modal").parent().addClass("popupWrapper");					
	$("#dialog-modal" ).dialog("close");
});


$("#dropdownSelect").click(function(){ 
	if( $('#dropdown').hasClass('active')){
		$("#dropdown").removeClass('active');
	} else {
		$("#dropdown").addClass('active');
	}
});
</script>
</body>
</html>
