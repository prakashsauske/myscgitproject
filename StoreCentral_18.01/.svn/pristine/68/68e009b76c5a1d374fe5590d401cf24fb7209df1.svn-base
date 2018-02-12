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
	<c:forEach items="${productNotesList}" var="productNotesList">
		<table class="dataContent" style="width: 50%">
			<tr class="dataRow">
				<td class="dataField" rowspan="2">Article Number</td>
				<td class="dataField" colspan="2">Product Note</td>
				<td class="dataField" colspan="5">Tasting Note</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Note 1</td>
				<td class="dataField">Note 2</td>
				<td class="dataField">Note 1</td>
				<td class="dataField">Note 2</td>
				<td class="dataField">Note 3</td>
				<td class="dataField">Note 4</td>
				<td class="dataField">Note 5</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${productNotesList.article}</td>
				<td class="subDataField">${productNotesList.productNote1}</td>
				<td class="subDataField">${productNotesList.productNote2}</td>
				<td class="subDataField">${productNotesList.tastingNote1}</td>
				<td class="subDataField">${productNotesList.tastingNote2}</td>
				<td class="subDataField">${productNotesList.tastingNote3}</td>
				<td class="subDataField">${productNotesList.tastingNote4}</td>
				<td class="subDataField">${productNotesList.tastingNote5}</td>

			</tr>
		</table>
	</c:forEach>


</form:form>