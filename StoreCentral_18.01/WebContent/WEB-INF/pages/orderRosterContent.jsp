<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<input type="hidden" id="option" value="${model.param.option}">
<c:choose>
	<c:when test="${model.param.option=='1' || model.param.option=='2'}">
		<table cellspacing="0" class="ContentTable" id="newContent">
			<tr>
				<th class="noSort columnDivider" rowspan="2">Source</th>
				<th class="noSort columnDivider centerValue" rowspan="2">Indicator</th>
				<th class="noSort columnDivider" colspan="3">Order</th>
				<th class="noSort columnDivider" colspan="2">Delivery</th>
				<th class="noSort columnDivider lastColumn" colspan="2">On Show</th>
			</tr>
			<tr class="subHeader">
				<th>Day</th>
				<th>Date</th>
				<th class="columnDivider">Time</th>
				<th>Day</th>
				<th class="columnDivider">Date</th>
				<th>Day</th>
				<th class="lastColumn">Date</th>

			</tr>

			<c:set value="${orderRosterReportList.size()}" var="size"></c:set>
			<c:set value="1" var="count"></c:set>
			<input type="hidden" id="totalResult"
				value="${size}-${model.param.pageNo}-${orderRosterReportList.get(0).msg}">
			<c:forEach items="${orderRosterReportList}"
				var="orderRosterReportList">
				<tr class=" timezone <c:if test="${size==count}"> lastRow  </c:if>">
					<td class="columnDivider"
						<c:if test="${orderRosterReportList.greenLineInd=='Y'}"> title="AutoStockR will split order across two rosters." </c:if>>${orderRosterReportList.supplierNo}<c:if
							test="${not empty orderRosterReportList.supplierNo && not empty orderRosterReportList.supplierName}"> | </c:if>${orderRosterReportList.supplierName}
					</td>
					<td class="centerValue"><c:if
							test="${orderRosterReportList.greenLineInd=='G'}">
							<label class="
							GLindicator 
							">${orderRosterReportList.greenLineInd}</label>
						</c:if> <c:if test="${orderRosterReportList.advertLineInd=='A'}">
							<label class="
							 advert 
							">${orderRosterReportList.advertLineInd}</label>
						</c:if> <c:if test="${orderRosterReportList.restrictLineInd=='R'}">
							<label class="
							 restricted
							">${orderRosterReportList.restrictLineInd}</label>
						</c:if></td>
					<td>${orderRosterReportList.orderDay}</td>
					<td>${orderRosterReportList.orderDate}</td>
					<td class="columnDivider">${orderRosterReportList.orderTime}</td>
					<td>${orderRosterReportList.deliverDay}</td>
					<td class="columnDivider">${orderRosterReportList.deliverDate}</td>
					<td>${orderRosterReportList.onShowDay}</td>
					<td class="lastColumn">${orderRosterReportList.onShowDate}</td>
				</tr>

				<c:set value="${count+1}" var="count"></c:set>
			</c:forEach>

		</table>
		<!-- End of table footer -->
	</c:when>
</c:choose>