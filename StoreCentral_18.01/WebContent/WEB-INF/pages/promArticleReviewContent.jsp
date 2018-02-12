<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<input type="hidden" id="option" value="${model.param.option}">
<c:choose>
	<c:when test="${model.param.option=='1' || model.param.option=='2'}">
		<table cellspacing="0" id="tblExport" class="ContentTable">
			<tr>
				<th class="columnDivider" rowspan="2">Store</th>
				<th class="columnDivider centerValue" colspan="5">Promotion</th>
				<th class="columnDivider centerValue" colspan="2">Advertising</th>
				<th class="columnDivider centerValue" colspan="2">Unit Info</th>
				<th class="columnDivider centerValue" colspan="1">Promotion</th>
				<th class="columnDivider centerValue" colspan="3">Store</th>
				<th class="lastColumn centerValue" colspan="2">Supply</th>
			</tr>

			<tr class="subHeader">
				<th>Week</th>
				<th>Days</th>
				<th class="numberColumn">Price</th>
				<th class="numberColumn">Saving</th>
				<th class="columnDivider">Details</th>
				<th class="centerValue">Display</th>
				<th class="columnDivider centerValue">Media</th>
				<th class="centerValue">UOM</th>
				<th class="columnDivider centerValue">OM</th>
				<th class="columnDivider centerValue">Forecast</th>
				<th class="centerValue">Demand</th>
				<th class="centerValue">Display</th>
				<th class="centerValue columnDivider">Build</th>
				<th>Source</th>
				<th class="lastColumn">Delivery Date</th>

			</tr>
			<c:set value="${dailyStoreProfileReportList.size()}" var="size"></c:set>
			<c:set value="1" var="count"></c:set>
			<input type="hidden" id="totalResult"
				value="${size}-${model.param.pageNo}-${promoArticleReviewList.get(0).msg}">

			<c:forEach items="${promoArticleReviewList}"
				var="promoArticleReviewList">

				<tr class="<c:if test="${size==count}"> lastRow </c:if>">
					<td>${promoArticleReviewList.storeNo}<c:if
							test="${not empty promoArticleReviewList.storeName && not empty promoArticleReviewList.storeNo}"> | </c:if>${promoArticleReviewList.storeName}

					
					<td>1 of 1</td>
					<td class="centerValue">5</td>
					<td class="numberColumn">1.29</td>
					<td class="numberColumn">1.15</td>
					<td class="columnDivider">Price</td>
					<td class="centerValue">FGE</td>
					<td class="centerValue columnDivider">Brochure</td>
					<td class="centerValue">EA</td>
					<td class="centerValue columnDivider">12</td>

					<td class="centerValue columnDivider">425</td>
					<td class="centerValue">450</td>
					<td class="centerValue">48</td>
					<td class="centerValue columnDivider">48</td>
					<td>1979</td>
					<td class="lastColumn">12/11/2013</td>
				</tr>
				<c:set value="${count+1}" var="count"></c:set>
			</c:forEach>
		</table>
		<!-- End of table footer -->
	</c:when>
</c:choose>