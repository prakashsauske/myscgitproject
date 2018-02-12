<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<h4 id="historyArticleInfo"></h4>

<div class="tableTitle">
	<h4>
		Values displayed in: <strong>Units/Carton</strong> | Carton Qty. (OM):
		<strong id="omVal"></strong>
	</h4>
</div>
<c:if test="${not empty salesHistoryList}">
	<div class="ContentTableWrapper">
		<table class="ContentTable" cellspacing="0">
			<tr>
				<th>&nbsp;</th>
				<th>Monday</th>
				<th>Tuesday</th>
				<th>Wednesday</th>
				<th>Thursday</th>
				<th>Friday</th>
				<th>Saturday</th>
				<th>Sunday</th>
				<th class="lastColumn">Total</th>
			</tr>
			<tr class="salesRow">
				<td>This Week</td>
				<td class="salesMonday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Monday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesTuesday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Tuesday'&& salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesWednesday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Wednesday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesThursday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Thursday' && salesHistoryList.totaledProperties==''}">${salesHistoryLis.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesFriday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Friday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesSaturday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Saturday' && salesHistoryList.totaledProperties==''}">${salesHistoryList5.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="salesSunday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Sunday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyThisWeek}</c:if>
					</c:forEach></td>
				<td class="sorted lastColumn totalHistory"></td>
			</tr>
			<tr class="salesRow">
				<td>Last Week</td>
				<td class="salesMonday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Monday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesTuesday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Tuesday'&& salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesWednesday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Wednesday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesThursday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Thursday' && salesHistoryList.totaledProperties==''}">${salesHistoryLis.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesFriday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Friday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesSaturday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Saturday' && salesHistoryList.totaledProperties==''}">${salesHistoryList5.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="salesSunday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Sunday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek}</c:if>
					</c:forEach></td>
				<td class="sorted lastColumn totalHistory"></td>
			</tr>
			<tr class="salesRow">
				<td>W/C <span class="firstWeek"></span></td>
				<td class="salesMonday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Monday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesTuesday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Tuesday'&& salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesWednesday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Wednesday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesThursday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Thursday' && salesHistoryList.totaledProperties==''}">${salesHistoryLis.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesFriday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Friday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesSaturday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Saturday' && salesHistoryList.totaledProperties==''}">${salesHistoryList5.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="salesSunday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Sunday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek1}</c:if>
					</c:forEach></td>
				<td class="sorted lastColumn totalHistory"></td>
			</tr>
			<tr class="salesRow">
				<td>W/C <span class="secondWeek"></span></td>
				<td class="salesMonday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Monday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesTuesday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Tuesday'&& salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesWednesday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Wednesday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesThursday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Thursday' && salesHistoryList.totaledProperties==''}">${salesHistoryLis.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesFriday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Friday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesSaturday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Saturday' && salesHistoryList.totaledProperties==''}">${salesHistoryList5.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="salesSunday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Sunday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQtyLastWeek2}</c:if>
					</c:forEach></td>
				<td class="sorted lastColumn totalHistory"></td>
			</tr>

			<tr class="lastRow salesRow">
				<td>15 Week Avg.</td>
				<td class="salesMonday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Monday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesTuesday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Tuesday'&& salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesWednesday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Wednesday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesThursday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Thursday' && salesHistoryList.totaledProperties==''}">${salesHistoryLis.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesFriday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Friday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesSaturday"><c:forEach
						items="${salesHistoryList}" var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Saturday' && salesHistoryList.totaledProperties==''}">${salesHistoryList5.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="salesSunday"><c:forEach items="${salesHistoryList}"
						var="salesHistoryList">
						<c:if
							test="${salesHistoryList.dayOfWeek=='Sunday' && salesHistoryList.totaledProperties==''}">${salesHistoryList.salesQty15WeekAvg}</c:if>
					</c:forEach></td>
				<td class="sorted lastColumn totalHistory"></td>
			</tr>

		</table>
	</div>
	<!-- End of content table wrapper -->
</c:if>
<c:if test="${empty salesHistoryList}">
	<h4>Sorry no result found.</h4>
</c:if>
