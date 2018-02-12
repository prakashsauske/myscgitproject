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
<form:form id="form">

	<table class="dataContent" style="width: 50%">
		<tr class="dataRow">

			<td class="dataField">Article</td>
			<td class="dataField">Measure Unit Code</td>
			<td class="dataField">Measure Unit Name</td>

		</tr>
		<c:forEach items="${measurementUnitList}" var="measurementUnitList">
			<tr class="dataRow">
				<td class="dataField">${measurementUnitList.articleNo}</td>
				<td class="dataField">${measurementUnitList.measureUnitCode}</td>
				<td class="dataField">${measurementUnitList.measureUnitName}</td>
			</tr>
		</c:forEach>

	</table>


</form:form>
