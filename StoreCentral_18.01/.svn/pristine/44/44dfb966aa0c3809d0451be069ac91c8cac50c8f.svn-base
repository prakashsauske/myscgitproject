<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Load List Report</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/print.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/produceLoadList.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper NoPrint woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="reports" />


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li><a href='../produce/backToProduceList.htm'>Produce
								Load List</a></li>
						<li class="currentPage">Load List Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->




		<div class="contentWrapper produce">

			<div class="articleHead">
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle">
						Order #${model.somOrder} <span>(Load List
							#${model.loadListNo})</span>
					</h2>
					<p>
						<label class="articlePriceLabel">Roster Date: <strong>${model.rosterDate}</strong>
						</label> <label class="articlePriceLabel">|</label> <label
							class="articlePriceLabel">Delivery Date: <strong>${model.deliveryDate}</strong>
						</label>

					</p>
					<c:if test="${not empty produceLoadListDet }">
						<p>
							<label class="articlePriceLabel">Total Issue Cost: <strong
								class="totalIssueCost">${produceLoadListDet.get(0).tot_cost
									}</strong>
							</label> <label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Potential Sell Incl.GST: <strong
								class="totalSellPriceInclGst">${produceLoadListDet.get(0).tot_sp_inc_gst
									}</strong>
							</label> <label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Potential Sell Excl.GST: <strong
								class="totalSellPrice">${produceLoadListDet.get(0).tot_sp_exc_gst
									}</strong>
							</label>
						</p>
						<p>
							<label class="articlePriceLabel">Potential Gross Profit
								(%): <strong class="grossProfit">${produceLoadListDet.get(0).tot_gross_profit
									}</strong>
							</label> <label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Total OMs: <strong
								class="totalOMs"></strong></label>

						</p>
					</c:if>
				</div>
				<div class="articleActionBtns" onclick="produceDetailsPrint();">

					<label class="actionBtn"><label class="print">Print</label></label>
				</div>
			</div>


			<div class="articleContent orderDetails">


				<div class="articleContentInner">

					<div class="articleDetails">

						<table cellspacing="0" class="ContentTable" width="100%">

							<tr>
								<td class="keyInfo" width="10%">Warehouse:</td>
								<td class="valueInfo">${model.warehouseNo} -
									${model.warehouseName}</td>
							</tr>

							<tr class="lastRow">
								<td class="keyInfo">Store:</td>
								<td class="valueInfo">${model.storeNo} - ${model.storeName}
								</td>
							</tr>
						</table>
					</div>
					<!-- End of article details -->
				</div>
				<!-- End of article content inner -->









			</div>
			<!-- End of article content -->

			<c:if test="${not empty produceLoadListDet}">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">List of Articles</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->



					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th rowspan="2">Article #</th>
							<th rowspan="2">Description</th>
							<th colspan="5" class="centerValue">Quantity</th>
							<th rowspan="2">OM</th>
							<th rowspan="2">Unit</th>
							<th rowspan="2">GP%</th>
							<th colspan="2" class="centerValue">GST</th>
							<th rowspan="2">PRC CHG</th>
							<!-- <th rowspan="2" class="numberColumn">Price Change</th> 
						<th rowspan="2" class="numberColumn">Total Issue Cost</th>
						<th rowspan="2" class="numberColumn">Potential Sell</th>
						<th rowspan="2" class="lastColumn">Potential Gross Profit</th>-->
						</tr>
						<tr class="subHeader">
							<th class="numberColumn">Ordered</th>
							<th class="numberColumn">Demand</th>
							<th class="numberColumn">Allocation</th>
							<th class="numberColumn">Sub</th>
							<th class="numberColumn">UNAV</th>
							<th class="numberColumn">Sell Price</th>
							<th class="numberColumn">Rate</th>

						</tr>

						<c:forEach items="${produceLoadListDet}" var="produceLoadDetails">


							<tr>

								<td>${produceLoadDetails.article}</td>
								<td>${produceLoadDetails.artDesc}</td>
								<td class="numberColumn qty">${produceLoadDetails.qty}</td>
								<td class="numberColumn">${produceLoadDetails.qtyDemand}</td>
								<td class="numberColumn">${produceLoadDetails.qtyAllocation}</td>
								<td class="numberColumn">${produceLoadDetails.qtySubstitution}</td>
								<td class="numberColumn">${produceLoadDetails.qtyUnavailable}</td>
								<td class="numberColumn">${produceLoadDetails.om}</td>
								<td class="numberColumn">${produceLoadDetails.unit}</td>
								<td class="numberColumn">${produceLoadDetails.gpPercent}</td>
								<td class="numberColumn sellPrice">${produceLoadDetails.sellPrice}</td>
								<td class="numberColumn">${produceLoadDetails.gstRate}</td>
								<td class="numberColumn hideBlock issueCost">${produceLoadDetails.issueCost}</td>
								<td class="numberColumn">${produceLoadDetails.price_chng_flag}</td>
								<!-- <td class="numberColumn"></td>
								<td class="numberColumn"></td>
								<td class="lastColumn numberColumn"></td> -->
							</tr>
						</c:forEach>




					</table>




				</div>
				<!-- End of content table wrapper -->

			</c:if>
		</div>
		<!-- End of content wrapper -->

		<div class="footerWrapper">
			<div class="footer">
				<div class="copyrightsInfo">Copyright &copy Woolworths 2013</div>
				<div class="policyInfo">
					<a href="#">Privacy Policy</a> <label class="divider">|</label> <a
						href="#">Terms of Use</a>
				</div>
			</div>

		</div>

	</div>






	<div id="dialog-modal" title="Provide Invoice Information">
		<div class="popupContent">

			<div class="popupData">

				<form method="POST" action="" id="">
					<div class="ContentTableWrapper formWrapper">

						<div class="parameter">
							<label for="invoice" class="mandatory">Invoice #</label> <input
								type="#" class="textbox" id="invoice">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="amount" class="mandatory">Total Amount ($)</label> <input
								type="#" class="textbox" id="amount">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="gst" class="mandatory">GST ($)</label> <input
								type="#" class="textbox" id="gst">
						</div>
						<!-- End of parameter -->

						<div class="parameter">
							<label for="docket" class="mandatory">Delivery Docket</label> <input
								type="#" class="textbox" id="docket">
						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of content table wrapper -->
				</form>
			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupInfo"> <label class="mandatory">mandatory</label>
				</span> <span class="popupActions"> <label class="actionBtn">Proceed</label>
					<label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>


	<!-- Print section  -->

	<div id="printData" style="display: none">
		<div id="printbody">

			<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />

			<div class="width100  ">

				<div class="width70 reportName bold inline-block">Loadlist
					Report - Reprint</div>
				<div class="width25  right">
					<div class="  margin5 text-align-right ">${storeNo} |
						${storeName}</div>
				</div>
				<div class="width70 margin5 margontopnone inline-block">
					<label class="">Created on: </label><label class="currentDate"></label>
				</div>
			</div>
			<div class="width100  border">
				<div class="width70 margin5 bold ">Report for:</div>
				<div class="margin5 margontopnone">
					<label class="">From Warehouse: </label><label class="">${model.warehouseNo}</label><label
						class="separator">|</label><label class="">Load List No: </label><label
						class="">${model.loadListNo}</label><label class="separator">|</label><label
						class="">To Store: </label><label class="">${model.storeNo}</label><label
						class="separator">|</label><label class="">SOM Order: </label><label
						class="">${model.somOrder}</label><label class="separator">|</label><label
						class="">Roster Date: </label><label class="">${model.rosterDate}</label><label
						class="separator">|</label><label class="">Delivery Date:
					</label><label class="">${model.deliveryDate}</label> <label
						class="separator">|</label><label class="">Store Order: </label><label
						class="">${model.storeOrder}</label></br>
					<c:if test="${not empty produceLoadListDet}">
						<!-- <label class="separator">|</label> -->
						<label class="">Total Issue Cost: </label>
						<label class="totalIssueCost">${produceLoadListDet.get(0).tot_cost
							}</label>
						<label class="separator">|</label>
						<label class="">Potential Sell Incl.GST: </label>
						<label class="totalSellPriceInclGst">${produceLoadListDet.get(0).tot_sp_inc_gst
							}</label>
						<label class="separator">|</label>
						<label class="">Potential Sell Excl.GST: </label>
						<label class="totalSellPriceExclGst">${produceLoadListDet.get(0).tot_sp_exc_gst
							}</label>
						<label class="separator">|</label>
						<label class="">Potential Gross Profit (%): </label>
						<label class="grossProfit">${produceLoadListDet.get(0).tot_gross_profit
							}</label>
						<label class="separator">|</label>
						<label class="">Total OMs: </label>
						<label class="totalOMs"></label>
					</c:if>
				</div>
			</div>


			<c:if test="${not empty produceLoadListDet}">

				<div id="record" class="quantityDetails">


					<table cellspacing="0" cellpadding="1" id=""
						class="text-align-left font11 printtableprod width100" border="1">
						<tr class="bold height30" id="tableHeader">
							<th>Quantity</th>
							<th style="text-align: center">Item</th>
							<th class="desc">Description</th>
							<th><div style="width: 60px">
									Quantity<br> Demand
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> Allocation
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> Sub
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> UNAV
								</div></th>
							<th>OM</th>
							<th>Unit</th>
							<th>GP %</th>
							<th class=" text-align-right" style="width: 6%">Inc GST<br>
								Sell Price
							</th>
							<th class=" text-align-right"><div style="width: 60px">
									GST<br> Rate
								</div></th>
							<th>PRC CHG</th>
							<!-- <th class=" text-align-right"><div style="width: 60px">Price <br>Change</div></th> 
						<th><div style="width: 80px">Warehouse <br>Article</div></th>-->


						</tr>

						<%int recCount=1,pageNo=1; %>

						<c:forEach items="${produceLoadListDet}" var="produceLoadDetails">
							<%if(recCount%11!=0){ %>
							<tr class="normal height25">
								<td style="text-align: center;" class="td1">${produceLoadDetails.qty}</td>
								<td class="td2">${produceLoadDetails.article}</td>
								<td class="td3">${produceLoadDetails.artDesc}</td>
								<td class="td4">${produceLoadDetails.qtyDemand}</td>
								<td class="td5">${produceLoadDetails.qtyAllocation}</td>
								<td class="td6">${produceLoadDetails.qtySubstitution}</td>
								<td class="td7">${produceLoadDetails.qtyUnavailable}</td>
								<td class="td8">${produceLoadDetails.om}</td>
								<td class="td9">${produceLoadDetails.unit}</td>
								<td class="td10">${produceLoadDetails.gpPercent}</td>
								<td class="td11  text-align-right">${produceLoadDetails.sellPrice}</td>
								<td class="td12  text-align-right">${produceLoadDetails.gstRate}</td>
								<td class="td13">${produceLoadDetails.price_chng_flag}</td>
								<!-- <td class="td14  text-align-right"></td>
							<td class="td15"></td> -->
							</tr>
							<%}else{ pageNo++;%>
							<tr>
								<td style="padding: 0px" colspan="14">
									<div id="foot" class="margintop20 width98"
										style="page-break-after: always;">
										<div class="width48 margin5 inline-block">
											<label class="bold">Printed on: </label><label
												class="currentDate"></label> <label class="separator">|</label>
											<label class="currentTime"></label>
										</div>
										<div class="width48  inline-block right">
											<div class=" lineheight15 margin5 text-align-right ">
												Page <label class="pageno"></label> of <label
													class="totalpage"></label>
											</div>
										</div>
									</div>
								</td>
							</tr>
					</table>
					<table cellspacing="0" cellpadding="1" id="printtableprod"
						class="text-align-left printtableprod font11 margintop20 width100"
						border="0" style="page-break-before: always; width: 100%">
						<tr>
							<td colspan="14" style="padding: 0px">
								<div class="width100  " style="page-break-before: always;">

									<div class="width70  reportName bold inline-block">Loadlist
										Report - Reprint</div>
									<div class="width25  right">
										<div class="  margin5 text-align-right ">${storeNo} |
											${storeName}</div>
									</div>
									<div class="width70 margin5 margontopnone inline-block">
										<label class="">Created on: </label><label class="currentDate"></label>
									</div>
								</div>
								<div class="width100  border">
									<div class="width70 margin5 bold ">Report for:</div>
									<div class="margin5 margontopnone">
										<label class="">From Warehouse: </label><label class="">${model.warehouseNo}</label><label
											class="separator">|</label><label class="">Load List
											No: </label><label class="">${model.loadListNo}</label><label
											class="separator">|</label><label class="">To Store:
										</label><label class="">${model.storeNo}</label><label
											class="separator">|</label><label class="">SOM Order:
										</label><label class="">${model.somOrder}</label><label
											class="separator">|</label><label class="">Roster
											Date: </label><label class="">${model.rosterDate}</label><label
											class="separator">|</label><label class="">Delivery
											Date: </label><label class="">${model.deliveryDate}</label> <label
											class="separator">|</label><label class="">Store
											Order: </label><label class="">${model.storeOrder}</label></br>
										<c:if test="${not empty produceLoadListDet}">
											<!-- <label class="separator">|</label> -->
											<label class="">Total Issue Cost: </label>
											<label class="totalIssueCost">${produceLoadListDet.get(0).tot_cost
												}</label>
											<label class="separator">|</label>
											<label class="">Potential Sell Incl.GST: </label>
											<label class="totalSellPriceInclGst">${produceLoadListDet.get(0).tot_sp_inc_gst
												}</label>
											<label class="separator">|</label>
											<label class="">Potential Sell Excl.GST: </label>
											<label class="totalSellPriceExclGst">${produceLoadListDet.get(0).tot_sp_exc_gst
												}</label>
											<label class="separator">|</label>
											<label class="">Potential Gross Profit (%): </label>
											<label class="grossProfit">${produceLoadListDet.get(0).tot_gross_profit
												}</label>
											<label class="separator">|</label>
											<label class="">Total OMs: </label>
											<label class="totalOMs"></label>
										</c:if>
									</div>
								</div>
							</td>
						</tr>
						<tr class="bold height30" id="tableHeader">
							<th>Quantity</th>
							<th style="text-align: center">Item</th>
							<th class="desc">Description</th>
							<th><div style="width: 60px">
									Quantity<br> Demand
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> Allocation
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> Sub
								</div></th>
							<th><div style="width: 60px">
									Quantity<br> UNAV
								</div></th>
							<th>OM</th>
							<th>Unit</th>
							<th>GP %</th>
							<th class=" text-align-right" style="width: 6%">Inc GST<br>
								Sell Price
							</th>
							<th class=" text-align-right"><div style="width: 60px">
									GST<br> Rate
								</div></th>
							<th>PRC CHG</th>
							<!-- <th class=" text-align-right"><div style="width: 60px">Price <br>Change</div></th> 
						<th><div style="width: 80px">Warehouse <br>Article</div></th>-->


						</tr>
						<%}recCount++; %>
						</c:forEach>
					</table>

				</div>
			</c:if>
			<div id="foot" class=" width98">
				<div class="width48 margin5 inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="width48  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="pageno"></label> of <label class="totalpage"></label>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- End of print section  -->
	<script>
	
		$(function() {		
			document.forms[0].autocomplete="off";	
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 350
			});
			
			$("#dialog-modal").parent().addClass("popupWrapper");
			
			// code to open popup on Receive Order
			$( "#receiveOrder" ).click(function() {
							
				$( "#dialog-modal" ).dialog( "open" );				
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
				
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

				
			
		});
		$("#treetable").treetable({
			expandable: true
		});
		 $(".secondaryActionBtn").click(function(e) {
			 window.location.href='backToProduceList.htm'
		  }); 		
			
		
	</script>

</body>
</html>
