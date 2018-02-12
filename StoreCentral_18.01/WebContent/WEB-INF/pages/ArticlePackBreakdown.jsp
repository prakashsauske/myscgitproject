<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
<div class="quantityDetails">
	<table class="GlobalTradeTable">
		<tr class="tableHeader1">
			<td>Child Article</td>
			<td>Article Description</td>
			<td>Scan Description</td>
		</tr>
		<c:forEach items="${packBreakdown}" var="packBreakdown">
			<tr class="tableTdHeight">
				<td class="tdmdstyl">${packBreakdown.breakdown}</td>
				<td class="tdmdstyl">${packBreakdown.description}</td>
				<td class="tdmdstyl">${packBreakdown.scanDesc}</td>
			</tr>
		</c:forEach>

	</table>
</div>

