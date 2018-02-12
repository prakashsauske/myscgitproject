<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script src="../../scripts/table.js"></script>
<script type="text/javascript">
//added for sorting defect 14590
	$(".sortTable").tablesort();
</script>
<input type="hidden" id="option" value="${model.param.option}">
<input type="hidden" id="givenMsg" value="${model.param.msg}">
<c:choose>
	<c:when test="${model.param.option=='1' || model.param.option=='2'}">

		<table cellspacing="0" class="sortTable ContentTable actionRows" id="newContent">
<thead>
			<tr>
				<th data-sort="int" class="sorted ascending">Query ID</th>
				<th data-sort="string" >Submitted By</th>
				<th data-sort="date">Submitted Date</th>
				<th data-sort="string" >Status</th>
				<th class="lastColumn noSort">Store Comments</th>
			</tr>
</thead>
			<c:set value="${viewArticleQueryList.size()}" var="size"></c:set>
			<c:set value="0" var="count"></c:set>
			<input type="hidden" id="totalResult"
				value="${size}-${model.param.pageNo}-${viewArticleQueryList.get(0).totalSize}">
			<c:forEach items="${viewArticleQueryList}" var="viewArticleQueryList">
				<%-- <tr onclick="navigateToDetail(<c:out value="${count}"></c:out>)" --%>
				<tr class="records-list"
					onclick="navigateToDetail(${viewArticleQueryList.queryId},<c:out value="${count}"></c:out>)"
					class="<c:if test="${size==(count-1)}">  lastRow </c:if>">
					<td class="sorted">${viewArticleQueryList.queryId}</td>
					<td>
					
					<c:if test="${fn:contains(viewArticleQueryList.submitBy, ' - ')}">
					${fn:replace(viewArticleQueryList.submitBy,' - ', ' | ')}
					</c:if>
					 
					<c:if test="${not fn:contains(viewArticleQueryList.submitBy, ' - ')}">
					${viewArticleQueryList.submitBy}
					<c:if test="${not empty viewArticleQueryList.userName && not empty viewArticleQueryList.submitBy}"> | 
					</c:if>${viewArticleQueryList.userName}
					</c:if>
					</td>
					<td>${viewArticleQueryList.submitDate}</td>
					<td>${viewArticleQueryList.queryStatus}</td>
					<td class="lastColumn">${viewArticleQueryList.storeComment}</td>
				</tr>
				<c:set value="${count+1}" var="count"></c:set>
			</c:forEach>

		</table>
		<!-- End of table footer -->
	</c:when>
</c:choose>