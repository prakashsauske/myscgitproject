<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<form:form id="form">
	<div id="infoDiv1" class="tabtableDiv"
		style="margin-top: 2px; margin-left: 1px;">
		<table id="tab1table" border="0">
			<c:forEach items="${articleSellPriceViewList}"
				var="articleSellPriceViewList">
				<tr class="trBtm">
					<th id="tableHeading1">Sell Price:</th>
					<td style="text-align: left; color: #00501f;">$
						${articleSellPriceViewList.salesPrice}</td>
					<td></td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Sell Effective GP:</th>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.sellEffectiveGP}%</td>
					<td></td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Promotion:</th>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoId}</td>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoDesc}</td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Promotion Type:</th>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoType}</td>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoTypeDesc}</td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Promo Sales Price:</th>
					<td style="text-align: left; color: #00501f;">$
						${articleSellPriceViewList.promoSalesPrice}</td>
					<td></td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Promo Effective GP:</th>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoEffectiveGP}%</td>
					<td></td>
				</tr>
				<tr class="trBtm">
					<th id="tableHeading1">Promotion Validity:</th>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoFromDate}
						<c:if test="${not empty articleSellPriceViewList.promoFromDate}">
													to
												</c:if>
					</td>
					<td style="text-align: left; color: #00501f;">${articleSellPriceViewList.promoToDate}</td>
				</tr>
		</table>
		</c:forEach>
	</div>




</form:form>