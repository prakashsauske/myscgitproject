<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="ContentTableWrapper" id="PriceDetails">
	<table class="ContentTable" cellspacing="0">
		<tr>
			<td width="20%">Promo Type:</td>
			<td width="13%" class="valueInfo">${articleSearchResutls.promoType}<c:if
					test="${not empty articleSearchResutls.promoType && not empty articleSearchResutls.promoTypeDesc}">-</c:if>${articleSearchResutls.promoTypeDesc}
			</td>
			<td width="20%">Promo Price:</td>
			<td width="13%" class="valueInfo"><c:if
					test="${not empty articleSearchResutls.promoSalesPrice && articleSearchResutls.promoSalesPrice!='0.00'}">$ ${articleSearchResutls.promoSalesPrice}</c:if></td>
			<td width="20%">
				<!-- Promo GP: -->
			</td>
			<td width="13%" class="lastColumn valueInfo">
				<%-- <c:if test="${not empty articleSearchResutls.promoEffectiveGP && articleSearchResutls.promoEffectiveGP!='0.00'}">${articleSearchResutls.promoEffectiveGP} %</c:if> --%>
			</td>
		</tr>
		<tr class="lastRow">
			<td>Std CUP Price:</td>
			<td class="valueInfo"><c:if
					test="${not empty articleSearchResutls.compPriceUnit && articleSearchResutls.compPriceUnit!='0.00'}">$ ${articleSearchResutls.compPriceUnit}<c:if
						test="${not empty articleSearchResutls.compPriceUnit}"> ${articleSearchResutls.cupUnit}</c:if>
				</c:if></td>
			<td>GST Rate:</td>
			<td class="valueInfo">${articleSearchResutls.gst}<c:if
					test="${not empty articleSearchResutls.gst}"> %</c:if></td>
			<td>Sell Price group:</td>
			<td class="lastColumn valueInfo">${articleSearchResutls.sellPricegrp}<c:if
					test="${(not empty articleSearchResutls.sellPricegrp)&&(not empty articleSearchResutls.sellPricegrpDesc)}">-</c:if>${articleSearchResutls.sellPricegrpDesc}
			</td>
		</tr>
	</table>

	<div id="tabs">
		<ul>
			<li><a href="#tabs-1">TUN</a></li>
			<li><a href="#tabs-2">EAN</a></li>

			<c:if test="${articleSearchResutls.packBrkFlag=='Y'}">
				<li><a href="#tabs-3">Pack Breakdown</a></li>
			</c:if>
		</ul>
		<div id="tabs-1">
			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th width="30%">TUN</th>
						<th width="35%">Unit of Measure (UOM)</th>
						<th width="35%" class="lastColumn">Base UOM</th>
					</tr>
					<c:forEach items="${articleGtinList}" var="articleGtin"
						varStatus="articleGtinInfo">

						<c:if
							test="${articleGtin.mainTUN=='X' || articleGtin.altTUN=='X'}">
							<tr class="lastRow">
								<td>${articleGtin.ean11}</td>
								<td>${articleGtin.altUomDesc}</td>
								<td class="lastColumn">${articleGtin.baseUom}</td>
							</tr>
						</c:if>
					</c:forEach>
				</table>
			</div>
			<!-- End of content table wrapper -->
		</div>
		<div id="tabs-2">
			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th width="30%">EAN</th>
						<th width="35%">Unit of Measure (UOM)</th>
						<th width="35%" class="lastColumn">Base UOM</th>
					</tr>
					<c:forEach items="${articleGtinList}" var="articleGtin"
						varStatus="articleGtinInfo">

						<c:if
							test="${(articleGtin.mainEAN=='X' || articleGtin.altEAN=='X') 
											&& !(articleGtin.mainTUN=='X' || articleGtin.altTUN=='X')}">
							<tr class="lastRow">
								<td>${articleGtin.ean11}</td>
								<td>${articleGtin.altUomDesc}</td>
								<td class="lastColumn">${articleGtin.baseUom}</td>
							</tr>
						</c:if>
					</c:forEach>
				</table>
			</div>
			<!-- End of content table wrapper -->
		</div>
		<c:if test="${articleSearchResutls.packBrkFlag=='Y'}">
			<div id="tabs-3">
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tr>
							<th width="25%">Description</th>
							<th width="25%">Article No</th>
							<th width="25%">EAN</th>
							<th width="25%" class="lastColumn">Pack Size</th>

						</tr>
						<c:forEach items="${packBreakdown}" var="packBreakdown"
							varStatus="packBreakdownInfo">

							<tr>
								<td>${packBreakdown.description}</td>
								<td>${packBreakdown.breakdown}</td>
								<td>${packBreakdown.ean}</td>
								<td class="lastColumn">${packBreakdown.packSize}</td>
							</tr>
						</c:forEach>
					</table>
				</div>
				<!-- End of content table wrapper -->
			</div>
		</c:if>

	</div>
</div>
<!-- End of content table wrapper -->


<script type="text/javascript">
							$(function() {
								$("#tabs").tabs();
								document.forms[0].autocomplete="off";
							});
						</script>