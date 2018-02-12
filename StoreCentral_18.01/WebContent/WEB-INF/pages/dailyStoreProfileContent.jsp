<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<input type="hidden" id="option" value="${model.param.option}">
<c:choose>
	<c:when test="${model.param.option=='1' || model.param.option=='2'}">
		<table cellspacing="0" class="ContentTable">
			<tr>
				<th class="noSort" rowspan="2">Department</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day1}
					(%)</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day2}
					(%)</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day3}
					(%)</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day4}
					(%)</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day5}
					(%)</th>
				<th class="noSort centerValue" rowspan="2">${dailyStoreProfileReportList.get(0).day6}
					(%)</th>
				<th class="noSort centerValue columnDivider" rowspan="2">${dailyStoreProfileReportList.get(0).day7}
					(%)</th>
				<th class="noSort centerValue" colspan="4">Profile Details</th>
				<input type="hidden" class="dates" value="${startDate}_${endDate}" />


			</tr>
			<tr class="subHeader">
				<th class="centerValue">Indicator</th>
				<th class="noSort">Start Date</th>
				<th class="noSort">End Date</th>
				<th class="lastColumn noSort">Description</th>
			</tr>
			<c:set value="${dailyStoreProfileReportList.size()}" var="size"></c:set>
			<c:set value="1" var="count"></c:set>
			<input type="hidden" id="totalResult"
				value="${size}-${model.param.pageNo}-${dailyStoreProfileReportList.get(0).msg}">

			<c:forEach items="${dailyStoreProfileReportList}"
				var="dailyStoreProfileReportList">

				<tr class="<c:if test="${size==count}"> lastRow </c:if>">
					<td>${dailyStoreProfileReportList.deptNo}<c:if
							test="${not empty dailyStoreProfileReportList.deptName && not empty dailyStoreProfileReportList.deptNo}"> | </c:if>${dailyStoreProfileReportList.deptName}

					</td>
					<td class="centerValue">${dailyStoreProfileReportList.day1Val}</td>
					<td class="centerValue">${dailyStoreProfileReportList.day2Val}</td>
					<td class="centerValue">${dailyStoreProfileReportList.day3Val}</td>
					<td class="centerValue">${dailyStoreProfileReportList.day4Val}</td>
					<td class="centerValue">${dailyStoreProfileReportList.day5Val}</td>
					<td class="centerValue">${dailyStoreProfileReportList.day6Val}</td>
					<td class="centerValue columnDivider valueInfo">${dailyStoreProfileReportList.day7Val}</td>
					<td class="centerValue"><c:if
							test="${dailyStoreProfileReportList.profileType=='S' || dailyStoreProfileReportList.profileType=='s'}">
							<label class="standard">s</label>
						</c:if> <c:if
							test="${dailyStoreProfileReportList.profileType=='O' || dailyStoreProfileReportList.profileType=='o'}">
							<label class="promotion">o</label>
						</c:if></td>

					<td>${dailyStoreProfileReportList.startDate}</td>
					<td>${dailyStoreProfileReportList.endDate}</td>
					<td class="lastColumn">${dailyStoreProfileReportList.ovrdSplEvenrDesc}</td>
				</tr>
				<c:set value="${count+1}" var="count"></c:set>
			</c:forEach>
		</table>
		<!-- End of table footer -->
	</c:when>
</c:choose>